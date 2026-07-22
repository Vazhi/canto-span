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
  docs/current/SURVEY-BATCHING.md
  review-packets/native-panel/active-v2/panel-policy.json
  review-packets/native-panel/active-v2/panel-review-state.json
  docs/research/SECOND-SPEAKER-WORK-AUTHORIZATION-2026-07-21.md
  review-packets/native-speaker/active-v1/form-specs.json
  review-packets/native-speaker/active-v1/active-review-state.json
  review-packets/native-speaker/active-v1/Code.gs
  review-packets/native-speaker/active-v1/completed/PFV01-SPEAKER-B-PUBLIC-R1/PFV01-PUBLIC-PANEL-SNAPSHOT-R1.json
  review-packets/native-speaker/active-v1/completed/PFV01-SPEAKER-B-PUBLIC-R1/PFV01-PUBLIC-PANEL-ANONYMIZED-MATRIX-R1.tsv
  review-packets/native-speaker/active-v1/completed/PFV01-SPEAKER-B-PUBLIC-R1/PFV01-PUBLIC-PANEL-ITEM-SUMMARY-R1.tsv
  docs/research/CP029-P1-PFV01-PUBLIC-PANEL-R1-RESULT.md
  docs/research/CP029-P1-PFV01-BOUNDARY-INVENTORY-R1.tsv
  docs/research/CP029-P1-PFV01-CODE-DOCUMENT-RECONCILIATION-R2.tsv
  review-packets/native-speaker/active-v1/completed/RUL01-SPEAKER-B-PUBLIC-R1/RUL01-PUBLIC-PANEL-SNAPSHOT-R1.json
  review-packets/native-speaker/active-v1/completed/RUL01-SPEAKER-B-PUBLIC-R1/RUL01-PUBLIC-PANEL-ANONYMIZED-MATRIX-R1.tsv
  review-packets/native-speaker/active-v1/completed/RUL01-SPEAKER-B-PUBLIC-R1/RUL01-PUBLIC-PANEL-ITEM-SUMMARY-R1.tsv
  docs/research/CP026-P1-RUL01-PUBLIC-PANEL-R1-RESULT.md
  tools/build-native-review-form-script.js
  tools/native-review-lib.js
  tools/import-native-review-csv.js
  tools/test-native-review-lib.js
  tools/verify-active-review-workflow.js
  tools/verify-native-panel-snapshot.js
  tools/verify-pfv-panel-snapshot.js
  archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json
  tools/verify-construction-notes.js
  tools/run-construction-registry-audit.js
  tools/verify-phase3-runtime-equivalence.js
  tools/verify-active-working-set.js
  tools/enforce-promotion-rules.js
  tools/test-promotion-gate.js
  docs/research/CP027-DEFINITION-OF-DONE-ENFORCEMENT-R1.md
  data/retirement-review-state.json
  docs/research/CP028-TOPICCOMMENTCLAUSE-RETIREMENT-R1.md
  docs/research/CP030-v0.5.186-ACTIVE-REAUDIT-CLOSURE-R1.md
  docs/research/RETIRED-CONSTRUCTION-ARCHIVE-v0.5.186-R1.tsv
  archive/retired-labels/v0.5.186-active-reaudit-closure/TopicCommentClause.md
  docs/releases/v0.5.186-active-reaudit-closure-audit.json
  docs/research/CP031-v0.5.187-NATIVE-PANEL-MODEL-MIGRATION-R1.md
  docs/releases/v0.5.187-panel-model-migration-audit.json
  docs/research/CP032-P1-RUL01-SURVEY-READINESS-R1.md
  docs/research/CP032-P1-RUL01-CONTRAST-REQUIREMENTS-R1.tsv
  docs/releases/v0.5.188-rul-survey-readiness-audit.json
  docs/research/CP033-P1-RUNTIME-REACHABILITY-AUDIT-R1.md
  docs/research/CP033-P1-RUNTIME-REACHABILITY-INVENTORY-R1.tsv
  docs/releases/v0.5.189-runtime-reachability-audit.json
  test-data/runtime-reachability-probes-v1.json
  tools/verify-runtime-reachability.js
  docs/research/CP034-P1-LOW-REFERENCE-WRAPPER-AUDIT-R1.md
  docs/research/CP034-P1-LOW-REFERENCE-WRAPPER-INVENTORY-R1.tsv
  docs/research/CP034-TEMPORALADVERBIALCLAUSE-RETIREMENT-R1.md
  docs/releases/v0.5.190-low-reference-wrapper-audit.json
  test-data/constructor-specific-reachability-probes-v1.json
  tools/verify-low-reference-wrapper-audit.js
  docs/research/CP035-P1-EXPERIENTIAL-DELIMITED-WRAPPER-AUDIT-R1.md
  docs/research/CP035-P1-EXPERIENTIAL-DELIMITED-WRAPPER-INVENTORY-R1.tsv
  docs/releases/v0.5.191-experiential-delimited-wrapper-audit.json
  test-data/experiential-delimited-reachability-probes-v1.json
  tools/verify-experiential-delimited-wrapper-audit.js
  docs/research/CP036-P1-RESULT-CHANGE-STATE-WRAPPER-AUDIT-R1.md
  docs/research/CP036-P1-RESULT-CHANGE-STATE-WRAPPER-INVENTORY-R1.tsv
  docs/releases/v0.5.192-result-change-state-wrapper-audit.json
  test-data/result-change-state-reachability-probes-v1.json
  tools/verify-result-change-state-wrapper-audit.js
  docs/research/CP037-P1-NOMINAL-WRAPPER-AUDIT-R1.md
  docs/research/CP037-P1-NOMINAL-WRAPPER-INVENTORY-R1.tsv
  docs/research/CP037-DEMONSTRATIVEHEADNP-RETIREMENT-R1.md
  docs/releases/v0.5.193-nominal-wrapper-audit.json
  test-data/nominal-wrapper-reachability-probes-v1.json
  tools/verify-nominal-wrapper-audit.js
  docs/research/CP038-P1-SPEECH-TRANSFER-COMPLEMENT-WRAPPER-AUDIT-R1.md
  docs/research/CP038-P1-SPEECH-TRANSFER-COMPLEMENT-WRAPPER-INVENTORY-R1.tsv
  docs/releases/v0.5.194-speech-transfer-complement-wrapper-audit.json
  test-data/speech-transfer-complement-reachability-probes-v1.json
  tools/verify-speech-transfer-complement-wrapper-audit.js
  docs/research/CP039-P1-EVALUATION-SCALAR-QUESTION-WRAPPER-AUDIT-R1.md
  docs/research/CP039-P1-EVALUATION-SCALAR-QUESTION-WRAPPER-INVENTORY-R1.tsv
  docs/releases/v0.5.195-evaluation-scalar-question-wrapper-audit.json
  test-data/evaluation-scalar-question-reachability-probes-v1.json
  tools/verify-evaluation-scalar-question-wrapper-audit.js
  docs/research/CP040-P1-FINAL-REACHABLE-WRAPPER-AUDIT-R1.md
  docs/research/CP040-P1-FINAL-REACHABLE-WRAPPER-INVENTORY-R1.tsv
  docs/releases/v0.5.196-final-reachable-wrapper-audit.json
  test-data/final-reachable-wrapper-reachability-probes-v1.json
  tools/verify-final-reachable-wrapper-audit.js
  archive/retired-labels/v0.5.193-nominal-wrapper-audit/DemonstrativeHeadNP.md
  archive/retired-labels/v0.5.190-low-reference-wrapper-audit/TemporalAdverbialClause.md
  test-data/rul-survey-readiness-probes-v1.json
  tools/verify-rul-survey-readiness.js
  tools/verify-release-handoff.js
  test-data/release-handoff-gate-v2.json
  tools/test-release-handoff.js
  tools/release-handoff-lib.js
  tools/promotion-gate-lib.js
  test-data/promotion-gate-v3.json
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
node tools/run-research-construction-registry.js >/dev/null
node tools/audit-source-accounting.js >/dev/null
node tools/verify-active-working-set.js >/dev/null
node tools/run-current-focused.js >/dev/null
node tools/verify-active-review-workflow.js >/dev/null
node tools/verify-rul-survey-readiness.js >/dev/null
node tools/verify-runtime-reachability.js >/dev/null
node tools/verify-low-reference-wrapper-audit.js --fast >/dev/null
node tools/verify-experiential-delimited-wrapper-audit.js >/dev/null
node tools/verify-result-change-state-wrapper-audit.js >/dev/null
node tools/verify-nominal-wrapper-audit.js >/dev/null
node tools/verify-speech-transfer-complement-wrapper-audit.js >/dev/null
node tools/verify-evaluation-scalar-question-wrapper-audit.js >/dev/null
node tools/verify-final-reachable-wrapper-audit.js >/dev/null
node tools/audit-native-conflict-burden.js >/dev/null
node tools/verify-native-panel-snapshot.js >/dev/null
node tools/verify-pfv-panel-snapshot.js >/dev/null
node tools/test-promotion-gate.js >/dev/null
node tools/enforce-promotion-rules.js >/dev/null
node tools/test-release-handoff.js >/dev/null
node tools/verify-release-handoff.js >/dev/null
node tools/verify-documentation-consistency.js >/dev/null

printf 'repository=%s\nbranch=%s\ncommit=%s\ntracked_files=%s\nconstruction_notes=%s\nstatus_lines=%s\n' \
  "$repo" \
  "$(git branch --show-current)" \
  "$(git rev-parse HEAD)" \
  "$(git ls-files | wc -l | tr -d ' ')" \
  "$(find grammar/active grammar/archived -maxdepth 1 -type f -name '*.md' | wc -l | tr -d ' ')" \
  "$(git status --porcelain | wc -l | tr -d ' ')"

[[ ! -d render-review ]] || { echo "FAIL: active render-review directory should be archived" >&2; exit 1; }
[[ "$(find grammar/active -maxdepth 1 -type f -name '*.md' | wc -l | tr -d ' ')" == "2" ]] || { echo "FAIL: expected 2 active construction notes" >&2; exit 1; }
[[ "$(find grammar/archived -maxdepth 1 -type f -name '*.md' | wc -l | tr -d ' ')" == "166" ]] || { echo "FAIL: expected 166 archived construction notes" >&2; exit 1; }
[[ "$(find tests/constructions -maxdepth 1 -type f -name '*.json' | wc -l | tr -d ' ')" == "168" ]] || { echo "FAIL: expected 168 construction test files" >&2; exit 1; }
