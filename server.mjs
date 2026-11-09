import http from 'node:http';
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

async function proxyAgent(req, res, route) {
  const reply = (status, body) => {
    res.writeHead(status, {'Content-Type':'application/json', 'Cache-Control':'no-store'});
    res.end(JSON.stringify(body));
  };
  if (req.method !== 'POST') return reply(405, {error:'只支持 POST。'});
  if (req.headers.origin !== `http://${req.headers.host}` || req.headers['sec-fetch-site'] === 'cross-site') {
    return reply(403, {error:'请求必须来自当前学屿页面。'});
  }

  try {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 8192) {
        reply(413, {error:'请求过长。'});
        return;
      }
      chunks.push(chunk);
    }
    const session = req.headers.cookie?.split(';').map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith(agentCookieName + '='));
    const upstream = await fetch(`http://127.0.0.1:${agentPort}${route}`, {
      method:'POST',
      headers:{'Content-Type':'application/json', ...(session ? {Cookie:'ja_session=' + session.slice(agentCookieName.length + 1)} : {})},
      body:Buffer.concat(chunks),
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
  if (agentRoutes.has(pathname)) return void proxyAgent(req, res, agentRoutes.get(pathname));
  const target = path.resolve(root, '.' + pathname + (pathname.endsWith('/')?'index.html':''));
  if (!target.startsWith(root)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(target, (error, data) => {
    if (error) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type':types[path.extname(target)] || 'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log(`Local: http://localhost:${port}`));
