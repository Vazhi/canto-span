# CP021B-R5 research checkpoint: Lane 06 classifier noun phrases

Date: 2026-07-18  
Lifecycle event: **CLAIM_LEVEL_RESEARCH_MAPPING_WITHOUT_RUNTIME_CHANGE**  
Accepted parser: `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`

## Completed batch

Seven coherent Lane 06 classifier-NP labels were mapped from current runtime claims to verified Cantonese sources before any parser design or code change:

- `QuantifiedClassifierNP`
- `DemonstrativeClassifierNP`
- `ClassifierObjectNP`
- `BareClassifierNP`
- `DemonstrativeHeadNP`
- `DemonstrativeQuantifiedClassifierNP`
- `PossessiveClassifierNP`

The batch adds 33 claim-source rows and six external sources to the authoritative R4 graph. All 83 inherited R4 rows are preserved exactly.

## Material conclusions

1. Quantified and demonstrative classifier NPs each require an overt-head versus head-ellipsis split.
2. C-N is a general nominal form; `ClassifierObjectNP` wrongly fuses form and clause role.
3. The dormant `BareClassifierNP` name must not be interpreted as classifier-alone ellipsis.
4. `DemonstrativeHeadNP` contains a category-boundary error in its own example and is a retirement candidate.
5. Overt D+Num+CL+N is attested, but hidden or freely insertable `jat1` is not authorized.
6. Possessor+C+N is supported; the current broad possessor+NP result-frame helper is not the sourced boundary.

## Cumulative state

- External sources: **30**
- Internal provenance records: **5**
- Claim-source rows: **116**
- Mapped labels: **20 / 182**
- Unmapped labels: **162**
- Unmapped language labels: **137**
- `supported_productive`: **0**

## Runtime integrity

- `main.js` SHA-256: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`
- `manifest.json` SHA-256: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`
- Parser behavior changed: **no**
- Accepted fixtures changed: **no**
- Held-out partition opened: **no**

## Continuation rule

Continue claim-first research from the remaining unmapped queue. Prefer the highest-impact coherent family; do not select broad abstractions such as all transitivity unless they are decomposed into researchable construction claims. Do not implement any R5 remediation without explicit user authorization.

## Primary artifacts

- `LANE-06-CLASSIFIER-NP-SOURCE-MAP-CP021B-R5.md`
- `PARSER-CONSTRUCTION-SOURCE-REGISTER-CP021B-R5.tsv`
- `PARSER-CONSTRUCTION-INTERNAL-PROVENANCE-REGISTER-CP021B-R5.tsv`
- `PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R5.tsv`
- `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R5.tsv`
- `CP021B-R5-SOURCE-SEARCH-LOG.tsv`
- `validation/cp021b-r5/classifier-np-source-audit.json`
