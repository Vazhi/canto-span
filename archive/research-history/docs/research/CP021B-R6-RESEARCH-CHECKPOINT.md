# CP021B-R6 research checkpoint: Lane 05 perfective and completion

Date: 2026-07-18  
Lifecycle event: **CLAIM_LEVEL_RESEARCH_MAPPING_WITHOUT_RUNTIME_CHANGE**  
Accepted parser: `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`

## Completed batch

Three coherent Lane 05 labels were mapped from current runtime claims to verified Cantonese sources before any parser design or code change:

- `PerfectiveVP`
- `CompletionVP`
- `CompletionQuestion`

The batch adds 21 claim-source rows and three external sources to the authoritative R5 graph. All 116 inherited R5 rows are preserved exactly. The existing Yip and Matthews source record is expanded with verified aspect and final-`未` locators.

## Material conclusions

1. `咗` is source-linked as overt perfective/viewpoint aspect, not as a simple past-tense or uniform completion marker.
2. Simple `V-咗-O` and `V完咗O` are supported, but the current `PerfectiveVP` label spans several argument and event profiles and must split before future implementation.
3. `完` can supply an endpoint and precede outer `咗`; three independent publications attest `V完咗O`.
4. `CompletionVP` improperly combines `完`, `晒`, result-state, overt/objectless, and outer-perfective composition profiles; the `晒` branch remains unmapped.
5. Final `未` is supported after visible completion/result material or aspect markers. The broad bare-reviewed-VO fallback lacks equivalent authorization and must narrow.
6. No hidden object, completion marker, or aspect marker is justified.

## Cumulative state

- External sources: **33**
- Internal provenance records: **6**
- Claim-source rows: **137**
- Mapped labels: **23 / 182**
- Unmapped labels: **159**
- Unmapped language labels: **134**
- `supported_productive`: **0**

## Validation

- Strict R6 research-provenance audit: **44/44 PASS**
- Inherited R5 claim-source rows preserved exactly: **116/116**
- All project JSON files parse: **PASS**
- `supported_productive` promotions: **0**

## Runtime integrity

- `main.js` SHA-256: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`
- `manifest.json` SHA-256: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`
- Parser behavior changed: **no**
- Accepted fixtures changed: **no**
- Held-out partition opened: **no**

## Continuation rule

Continue claim-first research from the remaining unmapped queue. Treat `晒` totality, experiential/progressive/durative aspect, and result/potential complements as separate families unless a source establishes a justified common boundary. Do not implement any R6 remediation without explicit user authorization.

## Primary artifacts

- `LANE-05-PERFECTIVE-COMPLETION-SOURCE-MAP-CP021B-R6.md`
- `PARSER-CONSTRUCTION-SOURCE-REGISTER-CP021B-R6.tsv`
- `PARSER-CONSTRUCTION-INTERNAL-PROVENANCE-REGISTER-CP021B-R6.tsv`
- `PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R6.tsv`
- `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R6.tsv`
- `CP021B-R6-SOURCE-SEARCH-LOG.tsv`
- `validation/cp021b-r6/perfective-completion-source-audit.json`
