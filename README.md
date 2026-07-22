# Canto Span

This repository is the canonical project working tree for the Cantonese parser
and its evidence records.

## Current state

- runtime: **v0.5.211**
- active runtime labels / construction notes: **164 / 164**
- construction workflow: **2 active / 162 workflow-archived**
- retired labels: **17**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **64**
- standard parser tests: **`npm test`**
- stable repository verification: **`npm run verify`**

Current validation targets:

- aggregate regression: **551** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,246**
- construction test files: **164**

v0.5.211 retains `NegativeExperiential` as `research_pending` for sourced
preverbal `未/冇 + V過` statements. Final-`未` questions, `有冇` questions,
non-experiential `未V`, and general `唔/咪` negation remain separate.

Read [`grammar/README.md`](grammar/README.md), then
[`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md).
