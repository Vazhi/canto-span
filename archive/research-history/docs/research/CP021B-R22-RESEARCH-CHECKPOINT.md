# Canto Span research checkpoint — CP021B-R22

Date: 2026-07-18

## Result

Claim-level source mapping is complete for environmental events, ambient/place frames, locative inversion, and posture-location expressions. No parser behavior changed.

### Dispositions

- `ImpersonalEnvironmentalClause`: `SOURCE_LINKED_ENVIRONMENTAL_EVENT_TRANSITION_AMBIENT_SPLIT_AND_SUBJECTLESS_STATUS_NARROWING_REQUIRED`
- `LocativeFrameClause`: `SOURCE_LINKED_LOCATIVE_INVERSION_PLACE_PROPERTY_AND_AMBIENT_FRAME_SPLIT_REQUIRED`
- `LocativePostureVP`: `POSTURAL_LOCATIVE_STRATEGY_LINKED_EXACT_HAI2DOU6_CROSSPRODUCT_AND_PROGRESSIVE_BOUNDARY_GAP`

The supported core includes exact `落雨喇`, contextualized `打風/落雨`, framed ambient property descriptions, the exact locative-inversion sequence `牆上面擺咗部電話`, exact `坐喺度`, expanded `企晒喺度`, and the spatial/progressive ambiguity of `喺度`. The evidence does not validate one productive environmental umbrella, a settled null/expletive-subject analysis, generic place-initial inversion, free posture-verb cross-product, or token-only resolution of `喺度`.

## Counts

- external source records: **76**
- internal provenance records: **22**
- cumulative claim-source rows: **694**
- new R22 rows: **30**
- mapped labels: **104 / 182**
- remaining unmapped labels: **78**
- remaining unmapped language labels: **53**
- `supported_productive`: **0**

## Integrity

- accepted parser baseline: `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`
- packaged manifest version: `0.5.175`
- `main.js` SHA-256: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`
- `manifest.json` SHA-256: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`
- parser code changed: **no**
- fixtures changed: **no**
- held-out files changed: **no**
- held-out data opened in R22: **no**
- inherited R18 held-out incident: **preserved; not used as evidence**

## Resume

Continue from `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R22.tsv`. Rank the **53** remaining unmapped language labels by runtime and non-held-out accepted-fixture impact, select one coherent family, and complete claim-level source mapping before any parser change.
