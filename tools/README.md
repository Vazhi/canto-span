# Tools

## Current entry points

- `verify-repository.sh` — verifies Git object integrity and required current files after restore.
- `export-git-working-copy.sh` — exports the complete repository including `.git/`.
- `run-np-subsystem-v0.5.184.js` — runs the independent NP subsystem matrix.
- `run-regression-suite.js` — runs aggregate regression tests.
- `run-construction-registry-audit.js` — checks that runtime active labels exactly match the 171 construction notes and exclude retired labels.
- `verify-phase3-runtime-equivalence.js` — compares v0.5.185 with the v0.5.184 Phase 2 commit across all 545 regression cases after removing only the intentionally migrated metadata fields.
- `verify-construction-notes.js` — validates the 171 active Obsidian construction notes.
- `migrate-construction-registry-to-notes.js` — reproducible one-time export from the frozen pre-migration registry snapshot.
- `audit-source-accounting.js` — checks source/status coverage through the construction notes.
- `run-claim-provenance-audit.js` — checks claim provenance.
- `verify-documentation-consistency.js` — checks current Markdown links and JSON validity.

The former embedded-metadata synchronization and legitimacy-audit tools are archived under `archive/migration-phase3-retired-runtime-metadata/`. Version-specific scripts remain as historical reference. To reproduce an old result exactly, check out the commit that originally contained its expected root files; do not treat those scripts or their embedded status wording as current authority.

The former combined runtime/recovery package builder and package-separation audit are archived under `archive/migration-phase1-retired-workflow/tools/`. Git exports now preserve project state. A minimal runtime ZIP may still be built separately for Obsidian installation.

The active construction registry is `grammar/*.md`. The former wide TSV/JSON inputs are frozen under `archive/registry-pre-obsidian-v0.5.184/` and must not be edited as current status records.
