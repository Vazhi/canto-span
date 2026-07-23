# Canto Span

This repository is the canonical project working tree for the Cantonese parser
and its evidence records.

## Current state

- runtime: **v0.5.213**
- active runtime labels / construction notes: **161 / 161**
- construction workflow: **2 active / 159 workflow-archived**
- retired labels: **20**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **65**
- standard parser tests: **`npm test`**
- stable repository verification: **`npm run verify`**

Current validation targets:

- aggregate regression: **551** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,278**
- construction test files: **161**

v0.5.213 retains `NegatedStativePredicate` as `research_pending` for narrow
copula-less `唔 + property predicate`. Negative nominal predicates with `唔係`,
other negators, and productive lexical scope remain separate.

Read [`grammar/README.md`](grammar/README.md), then
[`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md).

## Research documentation

Completed research records are indexed in
[`docs/research/CURRENT-RESEARCH-PROVENANCE.md`](docs/research/CURRENT-RESEARCH-PROVENANCE.md).
Those records preserve evidence and decisions; they do not change current
grammar status or authorize parser work.
