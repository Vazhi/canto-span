# Canto Span

This repository is the canonical project working tree for the Cantonese parser and its evidence records.

## Current state

- runtime: **v0.5.194**
- active runtime labels / construction notes: **168 / 168**
- construction workflow: **2 active / 166 workflow-archived**
- retired labels: **13**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **60**, including both active constructions
- standard test command: **`npm test`**

Current validation targets:

- aggregate regression: **545** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,200**
- construction test files: **168**

v0.5.194 audits six speech, transfer, naming, intention, and VP-complement wrappers. Six zero-weight implementation probes were added, while known routing and lexical-analysis gaps remain explicit. No recognized parser span, runtime label, or linguistic status changed.

Read [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md), then [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md).
