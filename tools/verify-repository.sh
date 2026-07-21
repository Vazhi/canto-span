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
  grammar/README.md
  grammar/active/PostverbalZoPerfectiveVP.md
  grammar/active/ResourceUseLaiFunctionRelation.md
  docs/current/00-START-HERE.md
  docs/current/DEFINITION-OF-DONE.md
  docs/current/GIT-WORKFLOW.md
  docs/current/INFRASTRUCTURE-MIGRATION.md
  docs/current/NATIVE-SPEAKER-REVIEW.md
  docs/research/SECOND-SPEAKER-WORK-AUTHORIZATION-2026-07-21.md
  review-packets/native-speaker/active-v1/form-specs.json
  review-packets/native-speaker/active-v1/active-review-state.json
  review-packets/native-speaker/active-v1/Code.gs
  tools/build-native-review-form-script.js
  tools/native-review-lib.js
  tools/import-native-review-csv.js
  tools/test-native-review-lib.js
  tools/verify-active-review-workflow.js
  archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json
  tools/verify-construction-notes.js
  tools/run-construction-registry-audit.js
  tools/verify-phase3-runtime-equivalence.js
  tools/verify-active-working-set.js
  tools/enforce-promotion-rules.js
  tools/test-promotion-gate.js
  tools/promotion-gate-lib.js
  test-data/promotion-gate-v1.json
  package.json
  tests/README.md
  tests/run-all.js
  tests/run-constructions.js
  tests/fixtures/regression-snapshots.json
  tests/fixtures/np-subsystem.json
  tests/construction-test-index.json
  tests/constructions/PostverbalZoPerfectiveVP.json
  tests/constructions/ResourceUseLaiFunctionRelation.json
  docs/current/TESTING.md
)

for path in "${required[@]}"; do
  [[ -f "$path" ]] || {
    echo "FAIL: missing $path" >&2
    exit 1
  }
done

npm test >/dev/null
node tools/verify-construction-notes.js >/dev/null
node tools/run-construction-registry-audit.js >/dev/null
node tools/verify-active-working-set.js >/dev/null
node tools/verify-active-review-workflow.js >/dev/null
node tools/test-promotion-gate.js >/dev/null
node tools/enforce-promotion-rules.js >/dev/null

printf 'repository=%s\nbranch=%s\ncommit=%s\ntracked_files=%s\nconstruction_notes=%s\nstatus_lines=%s\n' \
  "$repo" \
  "$(git branch --show-current)" \
  "$(git rev-parse HEAD)" \
  "$(git ls-files | wc -l | tr -d ' ')" \
  "$(find grammar/active grammar/archived -maxdepth 1 -type f -name '*.md' | wc -l | tr -d ' ')" \
  "$(git status --porcelain | wc -l | tr -d ' ')"

[[ ! -d render-review ]] || { echo "FAIL: active render-review directory should be archived" >&2; exit 1; }
[[ "$(find grammar/active -maxdepth 1 -type f -name '*.md' | wc -l | tr -d ' ')" == "2" ]] || { echo "FAIL: expected 2 active construction notes" >&2; exit 1; }
[[ "$(find grammar/archived -maxdepth 1 -type f -name '*.md' | wc -l | tr -d ' ')" == "169" ]] || { echo "FAIL: expected 169 archived construction notes" >&2; exit 1; }
[[ "$(find tests/constructions -maxdepth 1 -type f -name '*.json' | wc -l | tr -d ' ')" == "171" ]] || { echo "FAIL: expected 171 construction test files" >&2; exit 1; }
