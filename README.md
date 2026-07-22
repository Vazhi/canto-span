# Canto Span

This repository is the canonical project working tree for the Cantonese parser and its evidence records.

## Current state

- runtime: **v0.5.202**
- active runtime labels / construction notes: **165 / 165**
- construction workflow: **2 active / 163 workflow-archived**
- retired labels: **16**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **61**, including both active constructions
- standard parser tests: **`npm test`**
- stable repository verification: **`npm run verify`**

Current validation targets:

- aggregate regression: **550** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,229**
- construction test files: **165**

v0.5.202 retires the misleading `ComparativeStative` fallback. Source-supported property + `啲` adjustment now uses `DegreeMannerAdverbial`; explicit surpass comparatives remain a separate research question.

Read [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md), then [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md).
