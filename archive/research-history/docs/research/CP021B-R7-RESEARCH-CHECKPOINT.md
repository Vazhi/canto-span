# CP021B-R7 research checkpoint

Date: 2026-07-18  
Branch: `CP021B-R7-lane07-a-not-a-polar-question-source-mapping`  
Parent: `CP021B-R6`

## Scope completed

Four high-impact Lane 07 labels now have claim-level source mappings:

- `ANotAQuestion`
- `ModalANotAQuestion`
- `CopularANotAQuestion`
- `AcceptabilityANotA`

The batch adds **29** claim-source rows and five external source records. All **137** inherited R6 matrix rows are preserved exactly.

## Material conclusions

1. Exact lexical `A唔A` is a supported narrow subtype, not the complete Cantonese A-not-A family.
2. Reduced disyllabic forms such as `可唔可以` require separate representation and cannot be derived by arbitrary token equality.
3. `有冇 + VP` belongs to the broad A-not-A polar-question domain but is a suppletive have-or-not subtype with separate possession/existence/event/experiential profiles.
4. Modal A-not-A is lexically restricted; category membership alone does not authorize every runtime modal.
5. `係唔係` is surface-supported, can take clausal complements, and has a contested theoretical analysis.
6. Broad evaluative A-not-A is supported, but the distinct `AcceptabilityANotA` node and its `得唔得` template remain an exact-construction source gap.

## Cumulative state

- External source records: **38**
- Internal provenance records: **7**
- Claim-source rows: **166**
- Mapped labels: **27 / 182**
- Remaining unmapped labels: **155**
- Remaining unmapped language labels: **130**
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

1. Read `LANE-07-A-NOT-A-QUESTIONS-SOURCE-MAP-CP021B-R7.md`.
2. Treat `PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R7.tsv` as the cumulative claim-source graph.
3. Rank the remaining 130 unmapped language labels by runtime and accepted-fixture impact.
4. Choose one coherent family; do not expand this batch into all interrogatives.
5. Keep parser behavior frozen unless the user explicitly authorizes a separate implementation phase.

Strict audit: `validation/cp021b-r7/a-not-a-source-audit.json`.
