# Documentation authority map

## Authority order

1. `PROJECT-STATE.md` — current runtime, results, blockers, and next action.
2. `DOCTRINE.md` — binding linguistic and parser principles.
3. `DEFINITION-OF-DONE.md` — construction and release completion requirements.
4. `NOUN-PHRASE-SUBSYSTEM.md` — current shared NP implementation boundary.
5. `STATUS-AND-CONFIDENCE.md` — linguistic, implementation, and NP-licensing states.
6. `EVIDENCE-AND-PROVENANCE.md` — source, corpus, and speaker requirements.
7. `WORKFLOW.md` — execution sequence.
8. `VALIDATION-AND-ACCEPTANCE.md` — validation and dispositions.
9. `GIT-WORKFLOW.md` — repository, export, and restore rules.
10. `CONSTRUCTION-NOTES.md` — construction-note schema and ownership rules.
11. `INFRASTRUCTURE-MIGRATION.md` — migration phases and current phase state.
12. `grammar/*.md` and root `GRAMMAR-INDEX.md` — active construction status and evidence records.
13. Root `README.md` and `HANDOFF.md` — concise entry and resume pointers.
14. `docs/research/` and `test-data/` — supporting evidence and executable records.
15. `archive/` — historical material only.

## Current machine-readable owners

- construction status and evidence: `grammar/*.md` frontmatter and body records
- construction index: `GRAMMAR-INDEX.md`
- grammar governance runtime snapshot: `test-data/grammar-legitimacy-audit.json`
- NP matrix: `test-data/np-subsystem-v0.5.184.json`
- regression snapshots: `test-data/regression-snapshots.json`
- frozen pre-migration wide registry: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`

## Conflict rules

- newer current doctrine overrides historical plans;
- code is ground truth for current behavior;
- documentation must not describe cleaner or broader behavior than code;
- a code/document mismatch blocks release;
- historical acceptance never grandfathers a construction.
