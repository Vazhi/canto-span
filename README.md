# Canto Span

This repository is the canonical project working tree for the Cantonese parser
and its evidence records.

## Current state

- runtime: **v0.5.214**
- active runtime labels / construction notes: **133 / 133**
- construction workflow: **2 active / 131 workflow-archived**
- retired labels: **48**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **79**
- standard parser tests: **`npm test`**
- stable repository verification: **`npm run verify`**

Current validation targets:

- aggregate regression: **551** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,297**
- construction test files: **133**

v0.5.214 closes the implementation-only backlog: every active label now has
linguistic positive/boundary coverage or an explicit compatibility-only scope.

Read [`grammar/README.md`](grammar/README.md), then
[`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md).

## Research documentation

Completed research records are indexed in
[`docs/research/CURRENT-RESEARCH-PROVENANCE.md`](docs/research/CURRENT-RESEARCH-PROVENANCE.md).
Those records preserve evidence and decisions; they do not change current
grammar status or authorize parser work.
