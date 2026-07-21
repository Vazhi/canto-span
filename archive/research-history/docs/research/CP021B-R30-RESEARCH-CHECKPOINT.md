# Canto Span research checkpoint — CP021B-R30

Date: 2026-07-19

## Result

Claim-level mapping is complete for residual negation, negative-have, acceptability, opinion-question, and scheduling-question labels. No parser behavior changed.

The supported core includes ordinary preverbal `唔`, split `冇` possession/existence/event profiles, postposed `都得`, free-choice `wh + 都得`, exact `你覺得佢哋點樣？`, and ordinary scheduling questions such as `你想約佢幾時？`. The evidence does not support one unrestricted `唔 + VP` wrapper, a separate `NegativeHaveClause`, one uniform `都得` semantics, or dedicated opinion/scheduling wrappers that erase the internal question complement.

## Counts

- external source records: **85**
- internal provenance records: **30**
- cumulative claim-source rows: **994**
- new R30 rows: **30**
- mapped labels: **142 / 182**
- remaining unmapped labels: **40**
- remaining unmapped language labels: **15**
- `supported_productive`: **0**

## Integrity

- accepted parser baseline: `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`
- packaged manifest version: `0.5.175`
- `main.js` SHA-256: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`
- `manifest.json` SHA-256: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`
- parser code changed: **no**
- fixtures changed: **no**
- held-out data opened: **no**

## Resume

Continue from `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R30.tsv`. Rank the **15** remaining unmapped language labels. Broad `ProductiveVO` and `TransitiveVP` still require decomposition rather than direct promotion.
