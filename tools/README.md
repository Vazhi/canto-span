# Tools

## Current entry points

- `verify-repository.sh` — verifies Git object integrity and required current files after restore.
- `export-git-working-copy.sh` — exports the complete repository including `.git/`.
- `../tests/run-all.js` / `npm test` — canonical standard test command.
- `run-np-subsystem-v0.5.184.js` — compatibility wrapper for the canonical NP runner.
- `run-regression-suite.js` — compatibility wrapper for the canonical regression runner.
- `build-construction-tests.js` — reproducible Phase 5 generator for the 171 standard construction files.
- `sync-construction-test-metadata.js` — synchronizes construction-note test paths and counts after a controlled test-inventory change.
- `run-construction-registry-audit.js` — checks that runtime active labels exactly match the 169 construction notes and exclude retired labels.
- `verify-phase3-runtime-equivalence.js` — compares v0.5.185 with the v0.5.184 Phase 2 commit across all 545 regression cases after removing only the intentionally migrated metadata fields.
- `verify-construction-notes.js` — validates all 171 current Obsidian construction notes across the active and archived workflow collections.
- `verify-active-working-set.js` — enforces the two-note active set, 169-note parked set, path/state agreement, priorities, and no promoted archived notes.
- `test-promotion-gate.js` — proves accepted and rejected status transitions against focused synthetic cases.
- `enforce-promotion-rules.js` — blocks any `provisional` or `supported_productive` status that fails the current Definition of Done.
- `promotion-gate-lib.js` — shared fail-closed promotion rules.
- `audit-source-accounting.js` — checks source/status coverage through the construction notes.
- `run-claim-provenance-audit.js` — checks claim provenance.
- `verify-documentation-consistency.js` — checks current Markdown links and JSON validity.

The former embedded-metadata synchronization and legitimacy-audit tools are archived under `archive/migration-phase3-retired-runtime-metadata/`. Version-specific scripts remain as historical reference. To reproduce an old result exactly, check out the commit that originally contained its expected root files; do not treat those scripts or their embedded status wording as current authority.

The former combined runtime/recovery package builder and package-separation audit are archived under `archive/migration-phase1-retired-workflow/tools/`. Git exports now preserve project state. A minimal runtime ZIP may still be built separately for Obsidian installation.

The current construction registry is the union of `grammar/active/*.md` and `grammar/archived/*.md`. Only the two notes in `grammar/active/` are selected for current work; all 171 records remain runtime-active. The former wide TSV/JSON inputs are frozen under `archive/registry-pre-obsidian-v0.5.184/` and must not be edited as current status records.

The former flat-layout exporter is preserved under `archive/migration-phase6-retired-flat-construction-workflow/` because running it would destroy the Phase 6 triage layout.


## Native panel snapshot

`verify-native-panel-snapshot.js` recomputes the committed RUL01 public-panel aggregates from the anonymized 23 × 21 matrix, verifies its SHA-256, and checks that total panel evidence remains separate from the promotion-eligible speaker count.

## Definition-of-Done gates

- `test-promotion-gate.js` tests promotion gate v2.
- `enforce-promotion-rules.js` validates every construction note against the current evidence schema.
- `test-release-handoff.js` tests release-gate failure behavior.
- `verify-release-handoff.js` derives status changes from Git and validates the release audit slice and retirement cadence.
