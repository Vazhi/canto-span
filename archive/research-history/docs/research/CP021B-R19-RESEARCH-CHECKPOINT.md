# Canto Span research checkpoint — CP021B-R19

Date: 2026-07-18

## Result

Claim-level research mapping is complete for five measure–scalar labels. No parser behavior changed.

### Dispositions

- `NominalPredicateClause`: `AGE_MEASURE_PROFILE_SOURCE_LINKED_PRICE_AREA_LENGTH_SPLIT_AND_EXACT_TEMPLATE_GAPS`
- `QuantityNP`: `VISIBLE_HEAD_QUANTITY_NP_LINKED_BARE_AMOUNT_REALIGNMENT_REQUIRED`
- `ApproximateQuantity`: `APPROXIMATION_MARKER_AND_POSITION_SPLIT_WITH_POSTCLASSIFIER_DOU6_SOURCE_GAP`
- `ScalarRangeFragment`: `LEXICAL_PRICE_RANGE_WRAPPER_UNEXERCISED_MERGE_OR_RETIRE`
- `ScalarValueQuestion`: `PRICE_AMOUNT_AND_SCALAR_DIMENSION_QUESTION_SPLIT_REQUIRED`


The supported core is narrower than the runtime umbrellas: overt-subject age predicates, transparent quantity+head-noun material, marker-specific postposed approximation with `左右/咁上下`, exact price questions such as `幾錢呀`, and compositional `幾`+dimension questions. The evidence does not validate generalized price/area/length copula omission, bare amounts as QuantityNP, post-classifier approximation `度`, lexical `價位` fragment status, or one unified scalar-question template.

## Counts

- external source records: **68**
- internal provenance records: **19**
- cumulative claim-source rows: **588**
- new R19 rows: **37**
- mapped labels: **92 / 182**
- remaining unmapped labels: **90**
- remaining unmapped language labels: **65**
- `supported_productive`: **0**

## Integrity

- accepted parser baseline: `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`
- packaged manifest version: `0.5.175`
- `main.js` SHA-256: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`
- `manifest.json` SHA-256: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`
- parser code changed: **no**
- fixtures changed: **no**
- held-out files changed: **no**
- held-out data opened in R19: **no**
- inherited R18 held-out incident: **preserved; not used as evidence**

## Resume

Continue from `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R19.tsv`. Rank the **65** remaining unmapped language labels by runtime and accepted-fixture impact, select one coherent family, and complete claim-level source mapping before any parser change.
