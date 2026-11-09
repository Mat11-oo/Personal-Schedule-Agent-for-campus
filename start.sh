#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
agent_dir="$PWD/personal-agent"
venv="$agent_dir/.venv"
agent_port="${PERSONAL_AGENT_PORT:-18787}"

if [[ ! -x "$venv/bin/python" ]]; then
  if command -v uv >/dev/null 2>&1; then
    uv venv --python "${PERSONAL_AGENT_PYTHON:-3.12}" "$venv"
  else
    "${PERSONAL_AGENT_PYTHON:-python3.12}" -m venv "$venv"
  fi
fi
if ! cmp -s "$agent_dir/requirements.lock" "$venv/.requirements.lock"; then
  if command -v uv >/dev/null 2>&1; then
    uv pip install --python "$venv/bin/python" -r "$agent_dir/requirements.txt" -c "$agent_dir/requirements.lock"
  else
    "$venv/bin/python" -m pip install -r "$agent_dir/requirements.txt" -c "$agent_dir/requirements.lock"
  fi
  cp "$agent_dir/requirements.lock" "$venv/.requirements.lock"
fi

if [[ ! -f "$agent_dir/.env" ]]; then
  (umask 077; printf 'AUTH_SECRET=%s\n' "$("$venv/bin/python" -c 'import secrets; print(secrets.token_hex(32))')" > "$agent_dir/.env")
fi
if curl -fsS --max-time 1 "http://127.0.0.1:$agent_port/health" >/dev/null 2>&1; then
  printf 'Personal Agent 端口 %s 已在使用，请通过 PERSONAL_AGENT_PORT 指定备用端口。\n' "$agent_port" >&2
  exit 1
fi

(
  cd "$agent_dir"
  exec "$venv/bin/python" -m uvicorn app.main:app --host 127.0.0.1 --port "$agent_port"
) &
agent_pid=$!
web_pid=
cleanup() {
  kill "$agent_pid" ${web_pid:+"$web_pid"} 2>/dev/null || true
  wait "$agent_pid" ${web_pid:+"$web_pid"} 2>/dev/null || true
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

ready=false
for ((attempt=0; attempt<45; attempt++)); do
  kill -0 "$agent_pid" 2>/dev/null || exit 1
  if curl -fsS --max-time 1 "http://127.0.0.1:$agent_port/health" >/dev/null 2>&1; then
    ready=true
    break
  fi
  sleep 1
done
if [[ "$ready" != true ]]; then
  printf 'Personal Agent 未在预期时间内就绪。\n' >&2
  exit 1
fi

PERSONAL_AGENT_PORT="$agent_port" node server.mjs &
web_pid=$!
while kill -0 "$agent_pid" "$web_pid" 2>/dev/null; do sleep 1; done
exit 1
