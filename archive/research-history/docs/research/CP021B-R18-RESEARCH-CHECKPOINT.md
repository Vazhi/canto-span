# Canto Span research checkpoint — CP021B-R18

Date: 2026-07-18

## Result

Claim-level research mapping is complete for five residual Lane 03 fragment subtypes. No parser behavior changed.

### Dispositions

- `IdentificationFragment`: `COMPONENTS_LINKED_EXACT_FRAGMENT_AND_PARTICLE_SLOT_GAP`
- `LocativeFragment`: `COMPONENTS_LINKED_STANDALONE_FRAGMENT_ELLIPSIS_GAP`
- `PossessiveNominalFragment`: `HEADLESS_POSSESSIVE_NOMINAL_LINKED_DORMANT_LABEL_MERGE_OR_RETIRE`
- `ModalResponseFragment`: `SELECTIVE_AUXILIARY_ELLIPSIS_LINKED_DORMANT_LABEL_MERGE_OR_RETIRE`
- `ProhibitiveFragment`: `PROHIBITIVE_MARKERS_LINKED_DORMANT_DUPLICATE_LABEL_MERGE_OR_RETIRE`

The supported core is compositional: ordinary copular/focus identification, overt locative phrases and predicates, referential possessor+`嘅` and broader headless modifier+`嘅` nominals, lexically selective auxiliary ellipsis, and overt `咪/唔好` prohibitives. The evidence does not validate one general fragment rule, a freely optional identification particle, general bare-locative ellipsis, generic bare-modal answers, or a separate productive prohibitive-fragment category.

## Counts

- external source records: **67**
- internal provenance records: **18**
- cumulative claim-source rows: **551**
- new R18 rows: **32**
- mapped labels: **87 / 182**
- remaining unmapped labels: **95**
- remaining unmapped language labels: **70**
- `supported_productive`: **0**

## Integrity

- accepted parser baseline: `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`
- packaged manifest version: `0.5.175`
- `main.js` SHA-256: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`
- `manifest.json` SHA-256: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`
- parser code changed: **no**
- fixtures changed: **no**
- held-out files changed: **no**
- held-out data opened: **yes — accidental display of three pre-existing locative rows during impact ranking**
- held-out data used as evidence: **no**

## Resume

Continue from `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R18.tsv`. Rank the **70** remaining unmapped language labels by runtime and fixture impact, select one coherent family, and perform claim-level source mapping before any parser change. The held-out partition can no longer be described as wholly unopened; exclude the accidentally displayed rows from future evidence and evaluation reasoning.
