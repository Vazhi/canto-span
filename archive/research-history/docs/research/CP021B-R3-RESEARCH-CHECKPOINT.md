> **Historical cumulative checkpoint:** CP021B-R4 supersedes the cumulative counts and parent-R2 state in this file. Retain this document for the R3 directional-motion delta and dispositions.

# CP021B-R3 research checkpoint: Lane 09 directional-motion core

Date: 2026-07-18  
Lifecycle event: `RESEARCH_PROVENANCE_LANE09_DIRECTIONAL_MOTION_MAPPING`  
Runtime changes: **none**

## Completed

- Selected the highest-impact remaining coherent Lane 09 family from the 182-label queue.
- Extracted the exact runtime claims and internal conflations for `DirectionalMotionVP`, `CompoundDirectionalMotionVP`, `DirectedMannerMotionVP`, `GoalAttainmentMotionVP`, and `NegatedDirectionalMotionVP`.
- Added three external records plus one internal source-screen record; broadened the existing Wong 2023 locator to the directional and negation sections actually used.
- Added claim-level evidence, restrictions, competing analyses, implementation effects, and forbidden inferences to the cumulative matrix.
- Updated all five coverage rows without promoting any label to `supported_productive`.
- Corrected Shan and Jin's bibliographic issue to **26(2)**; the earlier working-note value 26(3) was wrong.

## Material conclusions

1. `DirectionalMotionVP` is not one source-supported Cantonese construction. It currently merges independent path predicates, complex directionals, manner-directional predicates, and caused-motion directional subspans. Split required.
2. `CompoundDirectionalMotionVP` has source-backed surface patterns but an incoherent runtime boundary: `返上嚟` and `行返過嚟` are assigned inconsistently. Representation realignment required.
3. `DirectedMannerMotionVP` is supported narrowly for manner plus postverbal direction/path, while preverbal `向 + ground + 行` and caused motion require separate structures.
4. `GoalAttainmentMotionVP` is supported narrowly for reviewed spatial-attainment profiles. Main arrival `到`, resultative `到`, nonspatial extent, and ability-related forms must remain distinct.
5. `NegatedDirectionalMotionVP` should be retired as a standalone language claim. Ordinary negative directionals are general VP negation; postverbal potential `V-唔-directional` is a different construction.

## Freeze

Accepted parser behavior remains `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`. `main.js` and `manifest.json` are unchanged. No fixture, grammar status, matching rule, or runtime node was altered.

## Validation

- Strict R3 directional-motion source audit: **27/27 PASS** (`validation/cp021b-r3/directional-motion-source-audit.json`).
- Source register: **25** records; cumulative matrix: **79** rows, including **21** R3 rows; coverage inventory: **182** unique labels.
- Every R3 matrix source ID resolves; every target claim has a locator, implementation effect, and forbidden inference.
- `main.js` syntax, TSV structure, and JSON parsing pass. The parent R2 audit also remains **18/18 PASS**.
- Runtime and manifest hashes remain the accepted hashes.

## Next research event

Rank the remaining 169 labels without an R1/R2/R3 claim-level mapping by runtime impact and accepted fixtures, then select one coherent family. Do not implement the Lane 09 remediation until a separate design freeze explicitly reconciles these R2/R3 dispositions and the open lexical boundaries.
