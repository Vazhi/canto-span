# Canto Span

This repository is the canonical project working tree for the Cantonese parser and its evidence records.

## Current state

- runtime: **v0.5.188**
- active runtime labels / construction notes: **170 / 170**
- construction workflow: **2 active / 168 workflow-archived**
- retired labels: **11**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **60**, including both active constructions
- standard test command: **`npm test`**

Current validation targets:

- aggregate regression: **545** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,156**
- construction test files: **170**

v0.5.188 freezes the RUL competing-analysis, runtime-profile, and contrast-requirement map. No survey instrument was created and parser span behavior is unchanged. The next blocking input is the user prompt that will guide mixed RUL/PFV pilot creation.

Read [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md), then [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md).
