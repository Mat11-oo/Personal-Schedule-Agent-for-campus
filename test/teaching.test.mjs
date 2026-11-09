import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import {webcrypto} from 'node:crypto';

function env(){
  const sandbox={window:{},crypto:webcrypto};vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(new URL('../dist/teaching-core.js',import.meta.url),'utf8'),sandbox);
  const core=sandbox.window.TeachingCore;
  const config={topic:'一次函数',audience:'初中',objectives:'理解参数',material:'教材片段，来源由用户提供',output:'both',minutes:3,blocks:[{id:'concepts',title:'核心概念'},{id:'practice',title:'练习'}]};
  return {core,config};
}
test('PDF-only requests do not ask the model for video scenes',()=>{
  const {core,config}=env();config.output='pdf';const request=JSON.parse(core.messages(config)[1].content);
  assert.deepEqual(request.schema.slides,[]);assert.match(request.requirements,/不生成视频/);
  const lesson=core.parseLesson(JSON.stringify(core.demo(config)),config);assert.equal(lesson.slides.length,0);
});
test('selected custom blocks retain their order and names',()=>{
  const {core,config}=env();config.blocks=[{id:'custom-discuss',title:'课堂讨论'},...config.blocks];
  const lesson=core.parseLesson(JSON.stringify(core.demo(config)),config);
  assert.deepEqual(Array.from(lesson.sections,s=>s.id),['custom-discuss','concepts','practice']);assert.equal(lesson.sections[0].title,'课堂讨论');
});
test('missing blocks and broken scene contracts fail explicitly',()=>{
  const {core,config}=env();const lesson=core.demo(config);lesson.sections.pop();assert.throws(()=>core.parseLesson(JSON.stringify(lesson),config),/遗漏/);
  const complete=core.demo(config);complete.slides[0].narration='';assert.throws(()=>core.parseLesson(JSON.stringify(complete),config),/完整镜头/);
  assert.throws(()=>core.parseLesson('<script>alert(1)</script>',config),/有效的课程结构/);
});
test('untrusted model content remains plain data with bounded fields',()=>{
  const {core,config}=env();const lesson=core.demo(config);lesson.title='<img src=x onerror=alert(1)>';lesson.sections[0].body='x'.repeat(20000);
  const parsed=core.parseLesson(JSON.stringify(lesson),config);assert.equal(parsed.title,lesson.title);assert.equal(parsed.sections[0].body.length,6000);
  const withoutSource=core.parseLesson(JSON.stringify(lesson),{...config,material:''});assert.match(withoutSource.sourceNote,/尚未联网核验/);
});
test('invalid selections do not generate a request',()=>{
  const {core,config}=env();assert.throws(()=>core.messages({...config,topic:''}),/主题/);assert.throws(()=>core.messages({...config,blocks:[]}),/板块/);
  assert.throws(()=>core.messages({...config,minutes:30}),/3 或 5/);assert.throws(()=>core.messages({...config,output:'unknown'}),/请选择/);
  assert.throws(()=>core.messages({...config,blocks:[config.blocks[0],config.blocks[0]]}),/重复/);
});
test('PDF estimate excludes speech and the budget increases with extra material',()=>{
  const {core,config}=env(),prices={input:2,output:8,speech:0.8};const video=core.estimate(config,prices),pdf=core.estimate({...config,output:'pdf'},prices);
  assert.equal(pdf.speech,0);assert.ok(video.total>pdf.total);
  assert.ok(core.estimate({...config,material:'资料'.repeat(5000)},prices).total>video.total);
  assert.equal(video.speech,3*280*2);
});
