# Canto Span

This repository is the canonical project working tree for the Cantonese parser and its evidence records.

## Current state

- runtime: **v0.5.187**
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

v0.5.187 replaces named reviewer roles with one role-neutral native-Cantonese panel. Promotion depends on usable adjudicated judgments per critical item: 10 for `provisional` and 30 from a locked clean instrument for `supported_productive`. Parser span behavior is unchanged.

Read [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md), then [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md).
