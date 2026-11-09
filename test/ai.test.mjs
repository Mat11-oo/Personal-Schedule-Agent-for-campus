import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import { webcrypto } from 'node:crypto';

const source=fs.readFileSync(new URL('../dist/ai.js',import.meta.url),'utf8');
const fixtures=fs.readFileSync(new URL('../dist/data.js',import.meta.url),'utf8');
function environment(fetchImpl=async()=>{throw new Error('Unexpected network request');},storage=new Map()){
  const form={id:'ai-config-form',elements:{name:{value:'My model'},baseUrl:{value:'https://model.example/v1'},model:{value:'test-model'},apiKey:{value:'test-only-key-never-real'}}};
  const status={textContent:'',className:''};
  const document={querySelector:s=>s==='#ai-config-form'?form:s==='#ai-form-status'?status:null};
  const sandbox={window:{},document,URL,AbortController,crypto:webcrypto,fetch:fetchImpl,setTimeout,clearTimeout,requestAnimationFrame:fn=>fn(),localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)}};
  vm.createContext(sandbox);vm.runInContext(fixtures,sandbox);vm.runInContext(source,sandbox);
  const state={route:'ai-settings',schoolId:'qinghe'};
  const ctx={state,school:()=>sandbox.window.CAMPUS_DATA.schools.find(s=>s.id===state.schoolId),esc:v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),icon:()=>'',heading:()=>'',btn:()=>'',footer:()=>'',showModal:()=>{},closeModal:()=>{},navigate:r=>state.route=r,renderPage:()=>{},toast:()=>{},currentCourses:()=>[],isAuthenticated:()=>false};
  return {sandbox,form,status,state,ctx,storage,transport:sandbox.window.CampusAITransport,create:()=>sandbox.window.createCampusAI(ctx)};
}

test('normalizes a completion URL and rejects credential-bearing or insecure URLs',()=>{
  const {transport:t}=environment();
  assert.equal(t.normalizeBase('https://model.example/v1/chat/completions/'),'https://model.example/v1');
  assert.equal(t.normalizeBase('http://127.0.0.1:4181/v1'),'http://127.0.0.1:4181/v1');
  for(const value of ['http://remote.example/v1','https://user:password@model.example/v1','https://model.example/v1?api_key=secret','https://model.example/v1#secret','file:///tmp/model'])assert.throws(()=>t.normalizeBase(value));
});

test('uses the chosen model and credential only in a direct API request',async()=>{
  let call;
  const {transport}=environment(async(url,options)=>{call={url,options};return new Response(JSON.stringify({choices:[{message:{content:'reply with test-only-key'}}]}),{headers:{'Content-Type':'application/json'}});});
  const answer=await transport.request({baseUrl:'https://custom.example/api/v1',apiKey:'test-only-key',model:'chosen-model',messages:[{role:'user',content:'Hello'}]});
  assert.equal(call.url,'https://custom.example/api/v1/chat/completions');
  assert.equal(call.options.headers.Authorization,'Bearer test-only-key');
  assert.equal(call.options.credentials,'omit');
  assert.equal(call.options.redirect,'error');
  assert.equal(call.options.referrerPolicy,'no-referrer');
  assert.equal(JSON.parse(call.options.body).model,'chosen-model');
  assert.equal(JSON.parse(call.options.body).stream,false);
  assert.ok(!answer.includes('test-only-key'));
});

test('distinguishes unauthorized, incompatible responses and network failures',async()=>{
  const unauthorized=environment(async()=>new Response('{}',{status:401,headers:{'Content-Type':'application/json'}}));
  await assert.rejects(unauthorized.transport.request({baseUrl:'https://example.test',model:'a',messages:[]}),/401/);
  const wrongFormat=environment(async()=>new Response('<html>Login</html>',{headers:{'Content-Type':'text/html'}}));
  await assert.rejects(wrongFormat.transport.request({baseUrl:'https://example.test',model:'a',messages:[]}),/JSON/);
  const unreachable=environment(async()=>{throw new TypeError('Network failure');});
  await assert.rejects(unreachable.transport.request({baseUrl:'https://example.test',model:'a',messages:[]}),/CORS/);
});

test('saving preferences never persists keys or triggers a request; reload forgets the key',()=>{
  let requests=0;
  const env=environment(async()=>{requests++;throw new Error('No automatic requests');});
  const app=env.create();app.onSubmit({target:env.form,preventDefault(){}});
  assert.equal(requests,0);
  const preferences=JSON.parse(env.storage.get('xueyu-ai-preferences-v1'));
  assert.equal(preferences.profiles[0].model,'test-model');
  assert.ok(!JSON.stringify(preferences).includes('test-only-key-never-real'));
  assert.ok(!JSON.stringify(preferences).includes('apiKey'));
  assert.ok(app.pages['ai-settings']().includes('本页已设置密钥'));
  const reloaded=environment(undefined,env.storage).create();
  assert.ok(!reloaded.pages['ai-settings']().includes('本页已设置密钥'));
});

test('request context excludes student identifiers, courses and private messages by default',async()=>{
  let body;
  const env=environment(async(url,options)=>{body=JSON.parse(options.body);return new Response(JSON.stringify({choices:[{message:{content:'A campus answer'}}]}),{headers:{'Content-Type':'application/json'}});});
  const app=env.create();app.onSubmit({target:env.form,preventDefault(){}});
  env.state.route='ai';
  app.onSubmit({target:{id:'ai-chat-form',elements:{question:{value:'校园卡怎么补办？'}}},preventDefault(){}});
  await new Promise(resolve=>setImmediate(resolve));
  assert.ok(JSON.stringify(body).includes('青禾大学'));
  assert.ok(!JSON.stringify(body).includes('2024001086'));
  assert.ok(!JSON.stringify(body).includes('用户主动允许附带的课表'));
  assert.ok(!JSON.stringify(body).includes('你好，想约周三下午一起自习。'));
  app.onChange({target:{id:'ai-campus-context',checked:false}});
  app.onSubmit({target:{id:'ai-chat-form',elements:{question:{value:'你好'}}},preventDefault(){}});
  await new Promise(resolve=>setImmediate(resolve));
  assert.ok(!JSON.stringify(body).includes('青禾大学'));
});

test('changing the API destination starts a fresh conversation',async()=>{
  const env=environment(async()=>new Response(JSON.stringify({choices:[{message:{content:'Old destination answer'}}]}),{headers:{'Content-Type':'application/json'}}));
  const app=env.create();app.onSubmit({target:env.form,preventDefault(){}});
  env.state.route='ai';app.onSubmit({target:{id:'ai-chat-form',elements:{question:{value:'Hello old destination'}}},preventDefault(){}});
  await new Promise(resolve=>setImmediate(resolve));
  assert.ok(app.pages.ai().includes('Old destination answer'));
  env.state.route='ai-settings';env.form.elements.baseUrl.value='https://another.example/v1';
  app.onSubmit({target:env.form,preventDefault(){}});
  assert.ok(!app.pages.ai().includes('Old destination answer'));
  assert.ok(!app.pages.ai().includes('Hello old destination'));
});
