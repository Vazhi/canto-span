# Canto Span

This repository is the canonical project working tree for the Cantonese parser and its evidence records.

## Current state

- runtime: **v0.5.190**
- active runtime labels / construction notes: **169 / 169**
- construction workflow: **2 active / 167 workflow-archived**
- retired labels: **12**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **60**, including both active constructions
- standard test command: **`npm test`**

Current validation targets:

- aggregate regression: **545** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,174**
- construction test files: **169**

v0.5.190 completes a constructor-specific audit of five low-reference wrappers. Three labels receive zero-weight implementation probes, `TemporalAdverbialClause` is retired because no constructor or parser output used it, and `Comment` remains unresolved pending broader path analysis. No recognized parser span changed.

Read [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md), then [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md).
