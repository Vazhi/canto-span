# Canto Span

This repository is the canonical project working tree for the Cantonese parser
and its evidence records.

## Current state

- runtime: **v0.5.208**
- active runtime labels / construction notes: **165 / 165**
- construction workflow: **2 active / 163 workflow-archived**
- retired labels: **16**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **62**
- standard parser tests: **`npm test`**
- stable repository verification: **`npm run verify`**

Current validation targets:

- aggregate regression: **551** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,235**
- construction test files: **165**

v0.5.208 reconciles overt full `係唔係` questions with checked
predicate/clause-complement evidence and an executable terminal-tag boundary.
The construction remains `unsupported_generalization`; nominal/possessive
support, contracted `係咪`, broader complement classes, and panel evidence remain
unresolved.

Read [`grammar/README.md`](grammar/README.md), then
[`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md).
