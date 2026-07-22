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
  package.json
  styles.css
  README.md
  HANDOFF.md
  GRAMMAR-INDEX.md
  docs/current/00-START-HERE.md
  docs/current/DEFINITION-OF-DONE.md
  docs/current/GIT-WORKFLOW.md
  docs/current/TESTING.md
  config/verification-profiles.json
  test-data/implementation-reachability-probes-v1.json
  tests/run-all.js
  tests/run-regression.js
  tests/run-np-subsystem.js
  tests/run-constructions.js
  tests/fixtures/regression-snapshots.json
  tests/fixtures/np-subsystem.json
  tests/construction-test-index.json
  tools/verify-current-state.js
  tools/verify-implementation-reachability.js
  tools/verify-construction-notes.js
  tools/run-construction-registry-audit.js
  tools/audit-source-accounting.js
  tools/verify-active-working-set.js
  tools/verify-documentation-consistency.js
)

for path in "${required[@]}"; do
  [[ -f "$path" ]] || {
    echo "FAIL: missing $path" >&2
    exit 1
  }
done

npm run verify >/dev/null

[[ ! -d render-review ]] || { echo "FAIL: active render-review directory should be archived" >&2; exit 1; }

printf 'repository=%s\nbranch=%s\ncommit=%s\ntracked_files=%s\nconstruction_notes=%s\nstatus_lines=%s\nverification_profile=core\n' \
  "$repo" \
  "$(git branch --show-current)" \
  "$(git rev-parse HEAD)" \
  "$(git ls-files | wc -l | tr -d ' ')" \
  "$(node -e 'const { loadConstructionNotes } = require("./tools/construction-notes-lib"); process.stdout.write(String(loadConstructionNotes(process.cwd()).length));')" \
  "$(git status --porcelain | wc -l | tr -d ' ')"
