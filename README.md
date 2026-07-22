# Canto Span

This repository is the canonical project working tree for the Cantonese parser and its evidence records.

## Current state

- runtime: **v0.5.199**
- active runtime labels / construction notes: **166 / 166**
- construction workflow: **2 active / 164 workflow-archived**
- retired labels: **15**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **61**, including both active constructions
- standard parser tests: **`npm test`**
- stable repository verification: **`npm run verify`**

Current validation targets:

- aggregate regression: **546** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,223**
- construction test files: **166**

v0.5.199 reconciles the source-attested repeated-manner + overt `咁／噉` pattern with `MannerAdverbialVP`. The construction remains `research_pending`; the bare repeated-manner route remains implementation-only, and no survey-dependent work changed.

Read [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md), then [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md).
