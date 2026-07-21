# Canto Span

This repository is the canonical project working tree for the Cantonese parser and its evidence records.

## Current state

- runtime: **v0.5.189**
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
- per-construction assertions: **1,171**
- construction test files: **170**

v0.5.189 adds 15 explicitly zero-weight implementation reachability probes for labels that previously had no direct standardized case. Fifty-three labels remain unobserved in the bounded structured-material scan. No parser span behavior or linguistic status changed.

Read [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md), then [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md).
