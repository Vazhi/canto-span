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
  GRAMMAR-INDEX.md
  grammar/PostverbalZoPerfectiveVP.md
  docs/current/00-START-HERE.md
  docs/current/DEFINITION-OF-DONE.md
  docs/current/GIT-WORKFLOW.md
  docs/current/INFRASTRUCTURE-MIGRATION.md
  archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json
  tools/verify-construction-notes.js
  tools/run-construction-registry-audit.js
  tools/verify-phase3-runtime-equivalence.js
  tools/enforce-promotion-rules.js
  tools/test-promotion-gate.js
  tools/promotion-gate-lib.js
  test-data/promotion-gate-v1.json
)

for path in "${required[@]}"; do
  [[ -f "$path" ]] || {
    echo "FAIL: missing $path" >&2
    exit 1
  }
done

node tools/verify-construction-notes.js >/dev/null
node tools/run-construction-registry-audit.js >/dev/null
node tools/test-promotion-gate.js >/dev/null
node tools/enforce-promotion-rules.js >/dev/null

printf 'repository=%s\nbranch=%s\ncommit=%s\ntracked_files=%s\nconstruction_notes=%s\nstatus_lines=%s\n' \
  "$repo" \
  "$(git branch --show-current)" \
  "$(git rev-parse HEAD)" \
  "$(git ls-files | wc -l | tr -d ' ')" \
  "$(find grammar -maxdepth 1 -type f -name '*.md' | wc -l | tr -d ' ')" \
  "$(git status --porcelain | wc -l | tr -d ' ')"
