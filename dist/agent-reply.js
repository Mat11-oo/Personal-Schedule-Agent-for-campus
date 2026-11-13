/* 学屿：解析小屿的回复。模型多数时候按约定返回 JSON，但也会带代码块、前后说明，或直接说人话。 */
(function (root) {
  'use strict';

  function tryParse(text) {
    try { return JSON.parse(text); } catch { return undefined; }
  }

  function unwrap(value, depth) {
    if (typeof value !== 'string' || depth <= 0) return value;
    var inner = tryParse(value.trim());
    return inner === undefined ? value : unwrap(inner, depth - 1);
  }

  function fromObject(value, trailing) {
    if (!value || typeof value !== 'object' || typeof value.answer !== 'string') return null;
    var out = { answer: value.answer, tool: value.tool ?? null, task: value.task ?? null };
    if (trailing) out.extra = trailing;
    return out;
  }

  function parseAgentReply(raw) {
    var text = typeof raw === 'string' ? raw.trim() : '';
    if (!text) return { answer: '', tool: null, task: null, raw: '' };

    var body = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    var direct = unwrap(tryParse(body), 2);
    if (direct !== undefined) {
      var object = fromObject(direct);
      if (object) return object;
      if (typeof direct === 'string' && direct.trim()) return { answer: direct.trim(), tool: null, task: null };
    }

    var start = body.indexOf('{');
    var end = body.lastIndexOf('}');
    if (start >= 0 && end > start) {
      var parsed = fromObject(tryParse(body.slice(start, end + 1)), body.slice(end + 1).trim());
      if (parsed) return parsed;
    }

    // 兜底：从任意文本里抠出 "answer" 字段，避免把 JSON 原文直接展示给用户
    var matched = body.match(/"answer"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    if (matched) {
      try { return { answer: JSON.parse('"' + matched[1] + '"'), tool: null, task: null }; } catch { return { answer: matched[1], tool: null, task: null }; }
    }

    if (/^[{[]/.test(body)) return { answer: '', tool: null, task: null, raw: text };
    return { answer: body, tool: null, task: null };
  }

  root.parseCampusAgentReply = parseAgentReply;
  if (typeof module !== 'undefined' && module.exports) module.exports = { parseAgentReply: parseAgentReply };
})(typeof globalThis !== 'undefined' ? globalThis : this);
