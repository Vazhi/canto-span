# Parser construction source coverage (CP021B-R4)

Date: 2026-07-18  
Status: consolidated research provenance; no parser behavior change

| Measure | Count |
|---|---:|
| Parser construction labels | 182 |
| External source records | 24 |
| Internal provenance records | 4 |
| Cumulative claim-source rows | 83 |
| Claim-level mapped labels | 13 |
| Unmapped labels | 169 |
| Unmapped language labels | 144 |

## Consolidated mapped labels

| Runtime label | Origin batch | Mapping status | Disposition | Matrix rows | External sources |
|---|---|---|---|---:|---:|
| `LexicalGiveRelation` | CP021B-R1 | COMPLETE_WITH_BOUNDARIES | SOURCE_LINKED_PROVISIONAL | 10 | 6 |
| `PostThemeParticipantRelation` | CP021B-R1 | COMPLETE_WITH_BOUNDARIES | SOURCE_LINKED_PROVISIONAL_THEORY_NEUTRAL | 10 | 5 |
| `PassivePermissiveRelation` | CP021B-R1 | COMPLETE_WITH_BOUNDARIES | SOURCE_RECONSTRUCTED_PROVISIONAL | 11 | 6 |
| `MotionGoalVP` | CP021B-R2 | COMPLETE_WITH_BOUNDARIES | SOURCE_LINKED_PROVISIONAL | 8 | 3 |
| `SourceMotionClause` | CP021B-R2 | COMPLETE_WITH_BOUNDARIES | SOURCE_LINKED_PROVISIONAL | 5 | 3 |
| `MotionPurposeChain` | CP021B-R2 | COMPLETE_WITH_BOUNDARIES | SOURCE_LINKED_REVIEW_BOUNDARY | 5 | 2 |
| `PathPhrase` | CP021B-R2 | PARTIAL_SPLIT_REQUIRED | PARTIAL_SOURCE_LINK_SPLIT_REQUIRED | 5 | 2 |
| `LocativePlacePhrase` | CP021B-R2 | PARTIAL_SPLIT_REQUIRED | PARTIAL_SOURCE_LINK_SPLIT_REQUIRED | 8 | 2 |
| `DirectionalMotionVP` | CP021B-R3 | PARTIAL_SPLIT_REQUIRED | SOURCE_LINKED_SPLIT_REQUIRED | 5 | 2 |
| `CompoundDirectionalMotionVP` | CP021B-R3 | REPRESENTATION_REALIGNMENT_REQUIRED | SOURCE_LINKED_REPRESENTATION_REALIGNMENT_REQUIRED | 4 | 3 |
| `DirectedMannerMotionVP` | CP021B-R3 | NARROWING_SPLIT_REQUIRED | SOURCE_LINKED_NARROWING_REQUIRED | 4 | 3 |
| `GoalAttainmentMotionVP` | CP021B-R3 | NARROWING_REQUIRED | SOURCE_LINKED_NARROWING_REQUIRED | 4 | 2 |
| `NegatedDirectionalMotionVP` | CP021B-R3 | LANGUAGE_CLAIM_RETIRED_INTERNAL_ONLY | LANGUAGE_CLAIM_RETIRE_KEEP_INTERNAL_COMPOSITION | 4 | 3 |

## Interpretation

CP021B-R4 makes the user-supplied revised CP021B-R2 checkpoint authoritative and reapplies the CP021B-R3 directional-motion delta. External bibliography and internal project provenance are now separate registers. Every matrix row resolves to exactly one of those registers.

A claim-level mapping is not productive-grammar acceptance. Split, narrowing, realignment, retirement, and review-boundary dispositions remain binding until a separately frozen implementation-design event is authorized.
