# Documentation authority map

## Authority order

1. `PROJECT-STATE.md` — current runtime, results, blockers, and next action.
2. `DOCTRINE.md` — binding linguistic and parser principles.
3. `DEFINITION-OF-DONE.md` — construction and release completion requirements.
4. `GOVERNANCE.md` — statuses, evidence, native-panel surveys, workflow,
   validation, promotion, and release gates.
5. `NOUN-PHRASE-SUBSYSTEM.md` — current shared NP implementation boundary.
6. `TESTING.md` — executable tests, verification profiles, and generated output.
7. `GIT-WORKFLOW.md` — repository, export, and restore rules.
8. `CONSTRUCTION-NOTES.md` — construction-note schema and ownership rules.
9. `grammar/<linguistic-status>/*.md`, `grammar/README.md`, and root
   `GRAMMAR-INDEX.md` — current construction status, evidence, and workflow.
10. Root `README.md` and `HANDOFF.md` — concise entry and resume pointers.
11. `docs/research/`, `review-packets/`, `test-data/`, and `tests/` — supporting
    evidence, research data, instrument records, and executable cases.
12. top-level `archive/` and Git history — historical material only.

The former current files `STATUS-AND-CONFIDENCE.md`,
`EVIDENCE-AND-PROVENANCE.md`, `NATIVE-SPEAKER-REVIEW.md`,
`SURVEY-BATCHING.md`, `WORKFLOW.md`, `VALIDATION-AND-ACCEPTANCE.md`, and
`PROMOTION-GATE.md` are compatibility pointers to `GOVERNANCE.md` and carry no
independent policy.

## Machine-readable owners

- construction status and evidence: `grammar/<linguistic-status>/*.md`
- construction index: `GRAMMAR-INDEX.md`
- standard construction tests: `tests/constructions/*.json`
- NP matrix: `tests/fixtures/np-subsystem.json`
- regression snapshots: `tests/fixtures/regression-snapshots.json`
- active native-panel state: `review-packets/native-panel/active-v2/panel-review-state.json`
- active native-panel policy: `review-packets/native-panel/active-v2/panel-policy.json`
- frozen historical reviewer/form provenance: `review-packets/native-speaker/active-v1/`
- frozen pre-migration registry: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`

## Conflict rules

- current doctrine and governance override historical plans;
- code is ground truth for current parser behavior;
- construction notes are ground truth for linguistic status and evidence;
- documentation must not describe cleaner or broader behavior than code;
- a code/document mismatch blocks release;
- historical acceptance never grandfathers a construction.
