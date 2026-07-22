# Canto Span

This repository is the canonical project working tree for the Cantonese parser and its evidence records.

## Current state

- runtime: **v0.5.198**
- active runtime labels / construction notes: **166 / 166**
- construction workflow: **2 active / 164 workflow-archived**
- retired labels: **15**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **60**, including both active constructions
- standard parser tests: **`npm test`**
- stable repository verification: **`npm run verify`**

Current validation targets:

- aggregate regression: **545** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,221**
- construction test files: **166**

v0.5.198 consolidates verification into one profile runner, one current validation directory, and one zero-weight implementation-reachability inventory. Historical release-specific scripts and repeated generated outputs were removed from the active tree. Parser behavior and linguistic status are unchanged.

Read [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md), then [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md).
