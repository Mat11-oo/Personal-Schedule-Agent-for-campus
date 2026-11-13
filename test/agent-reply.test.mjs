import test from 'node:test';
import assert from 'node:assert/strict';
import '../dist/agent-reply.js';

const parse = globalThis.parseCampusAgentReply;

test('reads a plain JSON reply', () => {
  const r = parse('{"answer":"今天没有课。","tool":null,"task":null}');
  assert.equal(r.answer, '今天没有课。');
  assert.equal(r.tool, null);
  assert.equal(r.extra, undefined);
});

test('reads a JSON reply wrapped in a code fence', () => {
  const r = parse('```json\n{"answer":"已加入待办","tool":"personal-add"}\n```');
  assert.equal(r.answer, '已加入待办');
  assert.equal(r.tool, 'personal-add');
});

test('keeps prose that follows the JSON block', () => {
  const r = parse('{"answer":"我是小屿。","tool":null,"task":null}\n\n你现在安全吗？可以联系 12356。');
  assert.equal(r.answer, '我是小屿。');
  assert.match(r.extra, /12356/);
});

test('accepts a double-encoded JSON reply', () => {
  const r = parse(JSON.stringify(JSON.stringify({ answer: '双层编码' })));
  assert.equal(r.answer, '双层编码');
});

test('falls back to plain prose without JSON', () => {
  const r = parse('我是「小屿」，你的校园伙伴。');
  assert.equal(r.answer, '我是「小屿」，你的校园伙伴。');
});

test('extracts the answer field when the JSON is malformed', () => {
  const r = parse('{"answer":"先这样\\n再那样","tool":null');
  assert.equal(r.answer, '先这样\n再那样');
});

test('never shows a broken JSON blob to the user', () => {
  const r = parse('{"tool":"news","broken":');
  assert.equal(r.answer, '');
  assert.match(r.raw, /broken/);
});

test('handles empty input', () => {
  const r = parse('');
  assert.equal(r.answer, '');
});
