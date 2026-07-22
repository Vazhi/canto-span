# Start here

## Current baseline

- runtime: **v0.5.211**
- active labels / construction notes: **164 / 164**
- workflow: **2 active / 162 archived**
- retired labels: **17**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **64**
- standard parser tests: **`npm test`**
- stable verification: **`npm run verify`**

Read in this order:

1. [`PROJECT-STATE.md`](PROJECT-STATE.md)
2. [`DOCTRINE.md`](DOCTRINE.md)
3. [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md)
4. [`GOVERNANCE.md`](GOVERNANCE.md)
5. [`TESTING.md`](TESTING.md)
6. [`GIT-WORKFLOW.md`](GIT-WORKFLOW.md)
7. [`../../grammar/README.md`](../../grammar/README.md)
8. [`../../GRAMMAR-INDEX.md`](../../GRAMMAR-INDEX.md)

## Interpretation rule

Code is ground truth for parser behavior. Current construction notes in the
matching linguistic-status folder are ground truth for linguistic status and
evidence. A mismatch blocks release. Workflow archiving does not retire a
label.
