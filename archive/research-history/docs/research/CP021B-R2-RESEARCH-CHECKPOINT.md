# CP021B-R2 research checkpoint

Date: 2026-07-18  
Checkpoint: Lane 09 motion and locative construction-to-source mapping

## Completed

- Mapped `MotionGoalVP`, `SourceMotionClause`, `MotionPurposeChain`, `PathPhrase`, and `LocativePlacePhrase` claim by claim.
- Added 7 verified research/reference sources with exact locators and limitations.
- Added 31 new claim-source rows, producing a cumulative 62-row matrix across 8 parser labels.
- Added a 12-row source-search log that records both successful mappings and unresolved research gaps.
- Rebuilt the complete 182-label coverage inventory.
- Added a strict R2 audit; all 24 checks pass.

## Expert disposition

| Label | Disposition | Reason |
|---|---|---|
| `MotionGoalVP` | `SOURCE_LINKED_PROVISIONAL` | Overt goal forms, perfective order, lexicalized 返學, and 到 boundaries are sourced. |
| `SourceMotionClause` | `SOURCE_LINKED_PROVISIONAL` | Preverbal 由-source and overt source-to-goal motion are sourced. |
| `MotionPurposeChain` | `SOURCE_LINKED_REVIEW_BOUNDARY` | Immediate motion-plus-purpose is sourced; adjacency or shared subject alone is insufficient. |
| `PathPhrase` | `PARTIAL_SOURCE_LINK_SPLIT_REQUIRED` | 向 direction is sourced; the current 沿住 route subtype is not structurally mapped. |
| `LocativePlacePhrase` | `PARTIAL_SOURCE_LINK_SPLIT_REQUIRED` | The literature distinguishes event-location, result-location, locative-predicate, localizer, and 喺度 uses; the presentational coda remains unmapped. |

## Runtime freeze

This is a research-only checkpoint. No implementation was authorized from the evidence map alone.

- `main.js` SHA-256: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`
- `manifest.json` SHA-256: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`

Both hashes match the accepted baseline.

## Verification

Run:

```bash
node tools/build-parser-construction-source-mapping-r2.js
node tools/audit-parser-construction-source-mapping-r2.js
```

Expected audit result: `strict_ready: true`, 24 passed, 0 failed.

## Natural next checkpoint

After confirmation, the next step is an implementation-design pass, not immediate code mutation:

1. Specify the proposed `PathPhrase` split between direction/orientation and route.
2. Specify the proposed `LocativePlacePhrase` subtype hierarchy.
3. Convert the sourced `MotionPurposeChain` boundary into explicit positive and negative fixtures.
4. Review those proposals against accepted snapshots before changing runtime code.

Stop here pending confirmation.
