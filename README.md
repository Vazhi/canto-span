# Canto Span

This repository is the canonical project working tree for the Cantonese parser and its evidence records.

## Current state

- runtime: **v0.5.196**
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
- per-construction assertions: **1,221**
- construction test files: **168**

v0.5.196 audits all thirteen labels that remained uncovered after v0.5.195. Eleven reachable wrappers received zero-weight implementation probes; `Comment` and `PerfectiveResultPredicate` remain explicitly constructor-shadowed. No recognized parser span, runtime label, or linguistic status changed.

Read [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md), then [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md).
