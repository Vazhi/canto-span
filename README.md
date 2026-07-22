# Canto Span

This repository is the canonical project working tree for the Cantonese parser
and its evidence records.

## Current state

- runtime: **v0.5.213**
- active runtime labels / construction notes: **163 / 163**
- construction workflow: **2 active / 161 workflow-archived**
- retired labels: **18**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **65**
- standard parser tests: **`npm test`**
- stable repository verification: **`npm run verify`**

Current validation targets:

- aggregate regression: **551** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,247**
- construction test files: **163**

v0.5.213 retains `NegatedStativePredicate` as `research_pending` for narrow
copula-less `唔 + property predicate`. Negative nominal predicates with `唔係`,
other negators, and productive lexical scope remain separate.

Read [`grammar/README.md`](grammar/README.md), then
[`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md).
