# Canto Span

This repository is the canonical project working tree for the Cantonese parser and its evidence records.

## Current state

- runtime: **v0.5.193**
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
- per-construction assertions: **1,194**
- construction test files: **168**

v0.5.193 audits four nominal wrappers. Two zero-weight direct reachability probes and one compatibility-alias probe were added; `DemonstrativeHeadNP` was retired as a constructorless known misanalysis. No recognized parser span or retained linguistic status changed.

Read [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md), then [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md).
