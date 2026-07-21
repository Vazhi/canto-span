# Parser construction source coverage (CP021B-R3)

Date: 2026-07-18  
Inventory size: **182 labels**

This cumulative inventory adds claim-level mapping for five Lane 09 directional-motion labels without changing parser behavior.

## Lane 09 R3 result

| Label | Source status | Distinct external source units | Disposition |
|---|---|---:|---|
| `DirectionalMotionVP` | claim_level_edges_recorded_split_required | 3 | R3_CLAIM_LEVEL_MAPPING_COMPLETE_SPLIT_REQUIRED |
| `CompoundDirectionalMotionVP` | claim_level_edges_recorded_realignment_required | 3 | R3_CLAIM_LEVEL_MAPPING_COMPLETE_REALIGNMENT_REQUIRED |
| `DirectedMannerMotionVP` | claim_level_edges_recorded_narrowing_and_split_required | 3 | R3_CLAIM_LEVEL_MAPPING_COMPLETE_NARROWING_SPLIT_REQUIRED |
| `GoalAttainmentMotionVP` | claim_level_edges_recorded_narrowing_required | 2 | R3_CLAIM_LEVEL_MAPPING_COMPLETE_NARROWING_REQUIRED |
| `NegatedDirectionalMotionVP` | language_claim_retired_internal_composition_only | 3 | R3_LANGUAGE_CLAIM_RETIRE_KEEP_INTERNAL_COMPOSITION |

`edge_count` is the number of distinct external source units in the R3 mapping, not parser fixtures or matrix rows. Liang and Mai's adapted coding scheme is explicitly corroborative and not independent theoretical authority.

## Important limitation

A source edge does not promote a label to `supported_productive`. Runtime behavior remains frozen. The complete inventory is in `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R3.tsv`.
