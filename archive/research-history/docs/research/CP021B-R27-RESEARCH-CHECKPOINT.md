# Canto Span research checkpoint — CP021B-R27

Date: 2026-07-19

## Result

Claim-level source mapping is complete for directives, suggestions, postverbal priority, polite requests, and the unsupported time-to-action wrapper. No parser behavior changed.

### Dispositions

- `ProhibitiveImperative`: `SOURCE_LINKED_PROHIBITIVE_MARKER_SPLIT_WITH_LEXICAL_AMBIGUITY_AND_MAI5_COVERAGE_REQUIRED`
- `SuggestionQuestion`: `SOURCE_LINKED_SUGGESTION_UTTERANCE_REALIGNMENT_AND_PARTICLE_CONTEXT_SPLIT_REQUIRED`
- `PriorityMarkerClause`: `SOURCE_LINKED_POSTVERBAL_SIN1_PRIORITY_WITH_PARTICLEIZED_AND_PREPARATORY_SUBTYPE_SPLIT_REQUIRED`
- `PoliteImperativeClause`: `GENERIC_REQUEST_COMPONENTS_SOURCE_LINKED_EXACT_QING2_ADDRESSEE_PATH_TEMPLATE_GAP_AND_REALIGNMENT_REQUIRED`
- `TimeToActionFrame`: `COMPONENTS_LINKED_EXACT_HAI6_SI4HAU6_ACTION_FRAME_SOURCE_GAP_AND_QUARANTINE_OR_MERGE_REQUIRED`

The evidence supports specialized `咪/唔好` prohibitives, `不如` suggestions, postverbal priority `先`, and marker-specific polite requests. It also establishes that these families require lexical, particle, scope, and speech-act splits. The exact polite-path cross-product and fixed `係時候 + action` wrapper remain direct-source gaps.

## Counts

- external source records: **82**
- internal provenance records: **27**
- cumulative claim-source rows: **864**
- new R27 rows: **40**
- mapped labels: **121 / 182**
- remaining unmapped labels: **61**
- remaining unmapped language labels: **36**
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

Continue from `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R27.tsv`. Rank the **36** remaining unmapped language labels by runtime and non-held-out fixture impact, select one coherent family, and perform claim-level source mapping before any parser change.
