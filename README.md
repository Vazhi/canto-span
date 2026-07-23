# Canto Span

This repository is the canonical project working tree for the Cantonese parser
and its evidence records.

## Current state

- runtime: **v0.5.216**
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
- per-construction assertions: **1,518**
- construction test files: **133**

v0.5.216 records a final evidence-and-ontology disposition for each of the
original 37 `unsupported_generalization` and 15 `parser_heuristic` labels.
Statuses and parser recognition remain unchanged; 13 added invariant probes
make the retained internal JSON semantics executable.

Read [`grammar/README.md`](grammar/README.md), then
[`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md).

## Research documentation

Completed research records are indexed in
[`docs/research/CURRENT-RESEARCH-PROVENANCE.md`](docs/research/CURRENT-RESEARCH-PROVENANCE.md).
Those records preserve evidence and decisions; they do not change current
grammar status or authorize parser work.
