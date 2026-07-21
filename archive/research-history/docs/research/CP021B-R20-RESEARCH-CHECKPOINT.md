# Canto Span research checkpoint — CP021B-R20

Date: 2026-07-18

## Result

Claim-level source mapping is complete for five identity/reference labels using the new textbook sources together with independent research. No parser behavior changed.

### Dispositions

- `LocativeWhQuestion`: `SOURCE_LINKED_WH_PLACE_SUBTYPE_SPLIT_AND_LOCATIVE_MARKER_BOUNDARY_REQUIRED`
- `WhClassifierQuestion`: `SOURCE_LINKED_WH_NP_SCHEMA_NODE_REALIGNMENT_AND_ELLIPSIS_SPLIT_REQUIRED`
- `IdentityWhQuestion`: `GENERAL_IDENTITY_WH_SOURCE_LINKED_EXACT_BIN1GO3_LAI4_TEMPLATE_GAP_AND_COPULA_SPLIT_REQUIRED`
- `NamingClause`: `PERSONAL_NAMING_RELATION_SOURCE_LINKED_GIU1_VERSUS_GIU3ZOU6_SPLIT_AND_EXACT_TEMPLATE_GAP`
- `VocativeAddressTerm`: `ADDRESS_SYSTEM_SOURCE_LINKED_LEXICAL_SOCIAL_SUBTYPES_AND_GENERATIVE_CROSSPRODUCT_NARROWING_REQUIRED`


The supported core includes wh-place expressions in situ, overt motion and locative-marker questions, `邊+classifier+noun` “which” NPs, ordinary copular identity questions, personal naming with `叫`, distinct surname `姓`, definitional `叫做`, and bounded name/title address patterns. The evidence does not validate one unified where-question wrapper, context-free classifier ellipsis, exact `邊個嚟`, free `叫/叫做` substitution, or the runtime’s generated address cross-product.

## Counts

- external source records: **71**
- internal provenance records: **20**
- cumulative claim-source rows: **628**
- new R20 rows: **40**
- mapped labels: **97 / 182**
- remaining unmapped labels: **85**
- remaining unmapped language labels: **60**
- `supported_productive`: **0**

## Integrity

- accepted parser baseline: `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`
- packaged manifest version: `0.5.175`
- `main.js` SHA-256: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`
- `manifest.json` SHA-256: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`
- parser code changed: **no**
- fixtures changed: **no**
- held-out files changed: **no**
- held-out data opened in R20: **no**
- inherited R18 held-out incident: **preserved; not used as evidence**

## Resume

Continue from `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R20.tsv`. Rank the **60** remaining unmapped language labels by runtime and accepted-fixture impact, select one coherent family, and complete claim-level source mapping before any parser change.
