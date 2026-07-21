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
9. `PACKAGING-AND-RECOVERY.md` — package boundaries.
10. Root state pointers.
11. `docs/research/` and `test-data/` — evidence and executable records.
12. `archive/` — historical material only.

## Current machine-readable owners

- combined status: `docs/research/CONSTRUCTION-STATUS-REGISTRY-v0.5.184-R2.tsv`
- status summary: `docs/research/CONSTRUCTION-STATUS-SUMMARY-v0.5.184-R2.json`
- grammar governance: `test-data/grammar-legitimacy-audit.json`
- NP matrix: `test-data/np-subsystem-v0.5.184.json`
- regression snapshots: `test-data/regression-snapshots.json`

## Conflict rules

- newer current doctrine overrides historical plans;
- code is ground truth for current behavior;
- documentation must not describe cleaner or broader behavior than code;
- a code/document mismatch blocks release;
- historical acceptance never grandfathers a construction.
