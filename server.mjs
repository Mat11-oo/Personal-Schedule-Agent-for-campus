import http from 'node:http';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./dist/', import.meta.url));
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json; charset=utf-8'};
const port = Number(process.env.PORT || 4173);
const agentPort = Number(process.env.PERSONAL_AGENT_PORT || 8787);
if (!Number.isInteger(agentPort) || agentPort < 1 || agentPort > 65535) {
  throw new Error('PERSONAL_AGENT_PORT must be a valid port');
}
const agentCookieName = `xueyu_agent_session_${port}`;
const agentRoutes = new Map([
  ['/api/personal-agent/session', '/api/session'],
  ['/api/personal-agent/chat', '/api/chat'],
]);

const modelSettingsPath = process.env.XUEYU_MODEL_SETTINGS;
const modelProviders = new Map([
  ['deepseek', {base_url:'https://api.deepseek.com/v1', model:'deepseek-flash'}],
  ['ark', {base_url:'https://ark.cn-beijing.volces.com/api/v3', model:'doubao-seed-1-6-flash-250715'}],
  ['qwen', {base_url:'https://dashscope.aliyuncs.com/compatible-mode/v1', model:'qwen-plus'}],
]);

async function configureModel(body, reply) {
  if (!modelSettingsPath) return reply(503, {error:'请使用 npm start 启动完整的学屿应用。'});
  const {provider, apiKey, model, test} = JSON.parse(body);
  const preset = modelProviders.get(provider);
  if (!preset || typeof apiKey !== 'string' || !/^[!-~]{1,512}$/.test(apiKey) ||
      typeof model !== 'string' || (model && !/^[a-zA-Z0-9_.-]{1,128}$/.test(model))) {
    return reply(400, {error:'请选择服务商，并检查 API Key 和模型名称。'});
  }
  const settings = {...preset, provider, api_key:apiKey, model:model || preset.model};
  if (test === true) {
    try {
      const response = await fetch(settings.base_url + '/chat/completions', {
        method:'POST', redirect:'error', signal:AbortSignal.timeout(20000),
        headers:{'Content-Type':'application/json', Authorization:'Bearer ' + apiKey},
        body:JSON.stringify({model:settings.model, messages:[{role:'user', content:'Reply OK.'}], max_tokens:32}),
      });
      if (!response.ok) return reply(400, {error:`连接测试失败（HTTP ${response.status}）。请检查密钥和模型权限。`});
      const result = await response.json();
      if (!result.choices?.length) return reply(400, {error:'服务商没有返回有效的模型回复。'});
      return reply(200, {ok:true});
    } catch {
      return reply(502, {error:'无法连接模型服务，请检查网络后重试。'});
    }
  }
  const temporary = modelSettingsPath + '.' + randomUUID();
  await fs.promises.mkdir(path.dirname(modelSettingsPath), {recursive:true, mode:0o700});
  try {
    await fs.promises.writeFile(temporary, JSON.stringify(settings), {mode:0o600, flag:'wx'});
    await fs.promises.rename(temporary, modelSettingsPath);
  } finally {
    await fs.promises.rm(temporary, {force:true});
  }
  return reply(200, {ok:true});
}

async function generateLesson(body, reply, signal) {
  const settings = modelSettingsPath && await fs.promises.readFile(modelSettingsPath, 'utf8').then(JSON.parse).catch(error=>{
    if (error.code === 'ENOENT') return null;
    throw error;
  });
  if (!settings) return reply(409, {error:'请先在找学屿的模型设置里保存 API Key。'});
  const preset = modelProviders.get(settings.provider);
  if (!preset) return reply(409, {error:'请重新保存模型配置。'});
  const {messages, maxTokens} = JSON.parse(body);
  if (!Array.isArray(messages) || messages.length !== 2 || !messages.every((m,i)=>m?.role === ['system','user'][i] &&
      typeof m.content === 'string' && m.content.length <= 24000) ||
      !Number.isInteger(maxTokens) || maxTokens < 1 || maxTokens > 10000) {
    return reply(400, {error:'教学资料格式无效或过长。'});
  }
  const upstream = await fetch(preset.base_url + '/chat/completions', {
    method:'POST', redirect:'error', signal,
    headers:{'Content-Type':'application/json', Authorization:'Bearer ' + settings.api_key},
    body:JSON.stringify({model:settings.model, messages, max_tokens:maxTokens}),
  });
  if (!upstream.ok) return reply(502, {error:`模型请求失败（HTTP ${upstream.status}），请检查模型设置。`});
  const result = await upstream.json();
  const content = result.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) return reply(502, {error:'模型没有返回教学内容。'});
  return reply(200, {content, model:settings.model, usage:{
    input:result.usage?.prompt_tokens, output:result.usage?.completion_tokens,
  }});
}

async function proxyAgent(req, res, route) {
  const reply = (status, body) => {
    res.writeHead(status, {'Content-Type':'application/json', 'Cache-Control':'no-store'});
    res.end(JSON.stringify(body));
  };
  if (req.method !== 'POST') return reply(405, {error:'只支持 POST。'});
  if (!['localhost', '127.0.0.1'].includes(req.headers.host?.split(':')[0]) || req.headers.origin !== `http://${req.headers.host}` || req.headers['sec-fetch-site'] === 'cross-site') {
    return reply(403, {error:'请求必须来自当前学屿页面。'});
  }

  try {
    const limit = route === 'lesson' ? 150000 : 8192;
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > limit) {
        reply(413, {error:'请求过长。'});
        return;
      }
      chunks.push(chunk);
    }
    const bodyBuffer = Buffer.concat(chunks);
    if (route === 'lesson') {
      const controller = new AbortController();
      res.once('close', ()=>controller.abort());
      return await generateLesson(bodyBuffer, reply, AbortSignal.any([controller.signal, AbortSignal.timeout(90000)]));
    }
    if (route === 'model-settings') return await configureModel(bodyBuffer, reply);
    const session = req.headers.cookie?.split(';').map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith(agentCookieName + '='));
    const upstream = await fetch(`http://127.0.0.1:${agentPort}${route}`, {
      method:'POST',
      headers:{'Content-Type':'application/json', ...(session ? {Cookie:'ja_session=' + session.slice(agentCookieName.length + 1)} : {})},
      body:bodyBuffer,
      redirect:'error',
      signal:AbortSignal.timeout(20000),
    });
    const body = await upstream.text();
    const cookie = upstream.headers.get('set-cookie');
    res.writeHead(upstream.status, {
      'Content-Type':'application/json',
      'Cache-Control':'no-store',
      ...(cookie?.startsWith('ja_session=') && route === '/api/session' ? {'Set-Cookie':cookie.replace(/^ja_session=/, agentCookieName + '=').replace(/; Path=\//i, '; Path=/api/personal-agent/')} : {}),
    });
    res.end(body);
  } catch {
    reply(502, {error:'暂时无法连接本机 Personal Agent。'});
  }
}

http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400); res.end('Bad request'); return; }
  if (pathname === '/api/personal-agent/lesson') return void proxyAgent(req, res, 'lesson');
  if (pathname === '/api/personal-agent/model-settings') return void proxyAgent(req, res, 'model-settings');
  if (agentRoutes.has(pathname)) return void proxyAgent(req, res, agentRoutes.get(pathname));
  const target = path.resolve(root, '.' + pathname + (pathname.endsWith('/')?'index.html':''));
  if (!target.startsWith(root)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(target, (error, data) => {
    if (error) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type':types[path.extname(target)] || 'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log(`Local: http://localhost:${port}`));
