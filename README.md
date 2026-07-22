# Canto Span

This repository is the canonical project working tree for the Cantonese parser and its evidence records.

## Current state

- runtime: **v0.5.204**
- active runtime labels / construction notes: **165 / 165**
- construction workflow: **2 active / 163 workflow-archived**
- retired labels: **16**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **62**, including both active constructions
- standard parser tests: **`npm test`**
- stable repository verification: **`npm run verify`**

Current validation targets:

- aggregate regression: **551** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,230**
- construction test files: **165**

v0.5.204 source-links the narrow `好 + 好食` degree-modification profile under `DegreeModifiedLexicalStative`. The construction is now `research_pending`; productive range and negative boundaries remain unresolved.

Read [`grammar/README.md`](grammar/README.md) for direct status-based review, then [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md) and [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md).
