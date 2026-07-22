# Documentation authority map

## Authority order

1. `PROJECT-STATE.md` — current runtime, results, blockers, and next action.
2. `DOCTRINE.md` — binding linguistic and parser principles.
3. `DEFINITION-OF-DONE.md` — construction and release completion requirements.
4. `NOUN-PHRASE-SUBSYSTEM.md` — current shared NP implementation boundary.
5. `STATUS-AND-CONFIDENCE.md` — linguistic, implementation, and NP-licensing states.
6. `EVIDENCE-AND-PROVENANCE.md` — source, corpus, and speaker requirements.
7. `NATIVE-SPEAKER-REVIEW.md` — role-neutral panel screening and adjudication workflow.
8. `SURVEY-BATCHING.md` — survey release milestones, batching, instrument quality, and item-level thresholds.
9. `WORKFLOW.md` — execution sequence.
10. `VALIDATION-AND-ACCEPTANCE.md` — validation and dispositions.
11. `GIT-WORKFLOW.md` — repository, export, and restore rules.
12. `TESTING.md` — standard executable test directory, command, and coverage states.
13. `CONSTRUCTION-NOTES.md` — construction-note schema and ownership rules.
14. `INFRASTRUCTURE-MIGRATION.md` — migration phases and current phase state.
15. `grammar/<linguistic-status>/*.md`, `grammar/README.md`, and root `GRAMMAR-INDEX.md` — current construction status, evidence, and workflow records.
16. Root `README.md` and `HANDOFF.md` — concise entry and resume pointers.
17. `docs/research/`, `test-data/`, and `tests/` — supporting evidence, research data, and executable records.
18. top-level `archive/` — historical material only; workflow archiving is now frontmatter-only and does not create a separate grammar directory.

## Current machine-readable owners

- construction status and evidence: the union of `grammar/<linguistic-status>/*.md`
- construction index: `GRAMMAR-INDEX.md`
- historical pre-note governance snapshot used by legacy audits: `test-data/grammar-legitimacy-audit.json`
- active linguistic-status authority: the union of `grammar/<linguistic-status>/*.md`
- standard construction tests: `tests/constructions/*.json`
- NP matrix: `tests/fixtures/np-subsystem.json`
- regression snapshots: `tests/fixtures/regression-snapshots.json`
- active native-panel state: `review-packets/native-panel/active-v2/panel-review-state.json`
- active native-panel policy: `review-packets/native-panel/active-v2/panel-policy.json`
- historical reviewer/form provenance: `review-packets/native-speaker/active-v1/`
- frozen pre-migration wide registry: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`

## Conflict rules

- newer current doctrine overrides historical plans;
- code is ground truth for current behavior;
- documentation must not describe cleaner or broader behavior than code;
- a code/document mismatch blocks release;
- historical acceptance never grandfathers a construction.
