# CP021B-R12 research checkpoint

Date: 2026-07-18  
Parent: `CP021B-R11`  
Lifecycle event: **claim-level research mapping without runtime change**

## Completed family

Temporal noun phrases and temporal clauses:

- `TimeNP`
- `QuantifiedTimeNP`
- `TemporalClause`
- `TemporalAdverbialClause`

## Material conclusions

1. Cantonese time words may function adverbially while remaining nominal; lexical category, NP structure, and clause-level temporal role must be represented separately.
2. Classifier realization in calendar, deictic, duration, and distributive time expressions is head-specific rather than one freely optional `個` slot.
3. Numeral durations, `每`-based distributive/frequency expressions, and conventional `個字` time measures require distinct subtypes.
4. `個字` can carry a conventional five-minute-unit interpretation, but the parser must retain the overt form and insert no hidden `分鐘` token.
5. A simple time expression before a subject or predicate is ordinary temporal framing, not automatically a subordinate temporal clause.
6. Explicit Cantonese temporal adverbial clauses include distinct `喺`- and `當`-headed types with different time-head requirements; their formal operator analysis remains theory-specific.

## Cumulative provenance state

- External sources: **52**
- Internal provenance records: **12**
- Claim-source rows: **334**
- New R12 rows: **27**
- Mapped labels: **58 / 182**
- Remaining unmapped labels: **124**
- Remaining unmapped language labels: **99**
- `supported_productive`: **0**

## Frozen runtime

- `main.js`: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`
- Accepted parser baseline: `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`
- Packaged manifest version preserved from R11: `0.5.175`
- `manifest.json`: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`
- Parser code changed: **no**
- Fixtures changed: **no**
- Manifest changed: **no**
- Held-out data opened: **no**

## Resume rule

Continue from `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R12.tsv`. Rank the remaining 99 unmapped language labels by runtime and fixture impact, but select a coherent construction family rather than a broad residual umbrella. Research exact parser claims before any code change.
