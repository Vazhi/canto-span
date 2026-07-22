# Canto Span

This repository is the canonical project working tree for the Cantonese parser and its evidence records.

## Current state

- runtime: **v0.5.200**
- active runtime labels / construction notes: **166 / 166**
- construction workflow: **2 active / 164 workflow-archived**
- retired labels: **15**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **61**, including both active constructions
- standard parser tests: **`npm test`**
- stable repository verification: **`npm run verify`**

Current validation targets:

- aggregate regression: **548** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,226**
- construction test files: **166**

v0.5.200 reconciles the independently documented permissive and passive 畀 frames with `PassivePermissiveRelation`. The permissive example preserves `打籃球` as a nested activity VP instead of a retained patient; status remains `research_pending` and no survey-dependent work changed.

Read [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md), then [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md).
