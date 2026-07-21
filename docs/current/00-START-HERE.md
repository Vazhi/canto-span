# Start here

## Current baseline

- runtime: **v0.5.186**
- active labels / construction notes: **170 / 170**
- workflow: **2 active / 168 archived**
- retired labels: **11**
- `supported_productive`: **0**
- `provisional`: **1**
- `provisional_reaudit`: **0**
- standard test command: **`npm test`**

Read in this order:

1. [`PROJECT-STATE.md`](PROJECT-STATE.md)
2. [`DOCTRINE.md`](DOCTRINE.md)
3. [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md)
4. [`PROMOTION-GATE.md`](PROMOTION-GATE.md)
5. [`TESTING.md`](TESTING.md)
6. [`NATIVE-SPEAKER-REVIEW.md`](NATIVE-SPEAKER-REVIEW.md)
7. [`GIT-WORKFLOW.md`](GIT-WORKFLOW.md)
8. [`../../GRAMMAR-INDEX.md`](../../GRAMMAR-INDEX.md)

## Interpretation rule

Code is ground truth for parser behavior. Current construction notes are ground truth for linguistic status and evidence. A mismatch blocks release.

Workflow archiving does not retire a label. Retired labels are preserved separately under `archive/retired-labels/` and removed from the current registry.
