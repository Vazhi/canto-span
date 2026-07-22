# Canto Span

This repository is the canonical project working tree for the Cantonese parser and its evidence records.

## Current state

- runtime: **v0.5.197**
- active runtime labels / construction notes: **166 / 166**
- construction workflow: **2 active / 164 workflow-archived**
- retired labels: **15**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **60**, including both active constructions
- standard test command: **`npm test`**

Current validation targets:

- aggregate regression: **545** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,221**
- construction test files: **166**

v0.5.197 retires the final two constructor-shadowed wrappers, `Comment` and `PerfectiveResultPredicate`, after exact output-equivalence review against v0.5.196. All 166 active labels now have standardized positive/boundary, zero-weight implementation, or compatibility-alias-only coverage; no recognized parser span or retained linguistic status changed.

Read [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md), then [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md).
