# CP021B-R8 research checkpoint

Date: 2026-07-18  
Branch: `CP021B-R8-lane10-stative-predication-source-mapping`  
Parent: `CP021B-R7`

## Scope completed

Six high-impact stative/property-predication labels now have claim-level source mappings:

- `StativePredicate`
- `DegreeStativePredicate`
- `NegatedStativePredicate`
- `DegreeModifiedLexicalStative`
- `NegatedLexicalizedStative`
- `AdjectivalPredicateClause`

The batch adds **34** claim-source rows, three new external source records, and an expanded verified scope for the existing Lam–Lau–Lee 2024 record. All **166** inherited R7 matrix rows are preserved exactly.

## Material conclusions

1. Copula-less property predication is supported, but the broad runtime stative umbrella is not one homogeneous construction.
2. Degree-marked, negated, lexicalized, fragment-level, and clause-level profiles require explicit boundaries.
3. Overt degree modification is supported; hidden degree, arbitrary second-degree stacking, and the full runtime degree inventory are not established.
4. Ordinary negated property predication is source-linked specifically for `唔`; the generic `negator!` template is too broad.
5. `好食` and `難食` can be opaque lexical units. `難食` is not syntactic negation, while `唔 + 好食` is compositional negation.
6. `唔好 + 食` is a prohibitive structure distinct from `唔 + 好食`; bare `唔好食` remains context-sensitive.
7. `AdjectivalPredicateClause` is a dormant duplicate/theory-loaded label; the language form can be represented under a general subject-predicate clause with a property/stative subtype.

## Cumulative state

- External source records: **41**
- Internal provenance records: **8**
- Claim-source rows: **200**
- Mapped labels: **33 / 182**
- Remaining unmapped labels: **149**
- Remaining unmapped language labels: **124**
- `supported_productive`: **0**

## Integrity and freeze

- `main.js` SHA-256: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`
- `manifest.json` SHA-256: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`
- Parser behavior changed: **no**
- Fixtures changed: **no**
- Held-out data opened: **no**
- Native structural-analysis validation added: **no**
- Independent human-expert validation added: **no**

## Continue from here

1. Read `LANE-10-STATIVE-PREDICATION-SOURCE-MAP-CP021B-R8.md`.
2. Treat `PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R8.tsv` as the cumulative claim-source graph.
3. Rank the remaining 124 unmapped language labels by runtime and accepted-fixture impact.
4. Select one coherent family; keep scalar comparison, result-state, and transitivity families separate unless evidence requires a bounded joint analysis.
5. Keep parser behavior frozen unless the user explicitly authorizes a separate implementation phase.

Strict audit: `validation/cp021b-r8/stative-predication-source-audit.json`.
## Validation

- Strict R8 audit: **64/64 PASS**
- Parent R7 audit: **51/51 PASS**
- Inherited R7 matrix rows preserved exactly: **166/166**
- All project JSON files parse
- `main.js` and `manifest.json` hashes remain unchanged

