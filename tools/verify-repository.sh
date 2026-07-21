#!/usr/bin/env bash
set -euo pipefail

repo=$(git rev-parse --show-toplevel 2>/dev/null) || {
  echo "FAIL: not inside a Git repository" >&2
  exit 1
}
cd "$repo"

git fsck --full --no-dangling >/dev/null

required=(
  main.js
  manifest.json
  styles.css
  docs/current/00-START-HERE.md
  docs/current/DEFINITION-OF-DONE.md
  docs/current/GIT-WORKFLOW.md
  docs/research/CONSTRUCTION-STATUS-REGISTRY-v0.5.184-R2.tsv
)

for path in "${required[@]}"; do
  [[ -f "$path" ]] || {
    echo "FAIL: missing $path" >&2
    exit 1
  }
done

printf 'repository=%s\nbranch=%s\ncommit=%s\ntracked_files=%s\nstatus_lines=%s\n' \
  "$repo" \
  "$(git branch --show-current)" \
  "$(git rev-parse HEAD)" \
  "$(git ls-files | wc -l | tr -d ' ')" \
  "$(git status --porcelain | wc -l | tr -d ' ')"
