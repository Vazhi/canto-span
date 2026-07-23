# Canto Span

This repository is the canonical project working tree for the Cantonese parser
and its evidence records.

## Current state

- runtime: **v0.5.213**
- active runtime labels / construction notes: **160 / 160**
- construction workflow: **2 active / 158 workflow-archived**
- retired labels: **21**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **65**
- standard parser tests: **`npm test`**
- stable repository verification: **`npm run verify`**

Current validation targets:

- aggregate regression: **551** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,287**
- construction test files: **160**

v0.5.213-r5 retires `SchedulingQuestion`; sourced scheduling questions retain
ordinary modal, VP, argument, and wh-time composition.

Read [`grammar/README.md`](grammar/README.md), then
[`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md).

## Research documentation

Completed research records are indexed in
[`docs/research/CURRENT-RESEARCH-PROVENANCE.md`](docs/research/CURRENT-RESEARCH-PROVENANCE.md).
Those records preserve evidence and decisions; they do not change current
grammar status or authorize parser work.
