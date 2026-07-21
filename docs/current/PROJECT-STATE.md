# Project state

## Current baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.187 |
| Runtime labels | 170 |
| Current construction notes | 170 |
| Active working notes | 2 |
| Workflow-archived notes | 168 |
| Retired labels | 11 |
| `supported_productive` | 0 |
| `provisional_reaudit` | 0 |
| `provisional` | 0 |
| `research_pending` | 60 |
| `unsupported_generalization` | 87 |
| `lexicalized_only` | 3 |
| `parser_heuristic` | 20 |

The canonical registry is the union of `grammar/active/*.md` and `grammar/archived/*.md`; it matches the 170 runtime labels exactly.

## v0.5.187 panel-model migration

The fixed Speaker A / Speaker B model is retired. Every qualified respondent,
including the user's wife, now uses the same survey instrument and inclusion
criteria and receives no special status or weight. Promotion depends on usable
adjudicated judgments per critical item.

### `PostverbalZoPerfectiveVP` — research pending

Four checked sources and eleven historical response records remain preserved.
Those responses came from mixed legacy instruments and provide zero usable
critical-item judgments under the clean role-neutral panel standard. PFV was
therefore downgraded from `provisional` to `research_pending`. Its parser logic,
boundary tests, and code/document reconciliation remain unchanged.

### `ResourceUseLaiFunctionRelation` — research pending

The committed snapshot contains 23 eligible responses from the same public
pilot. The user reports 50 live responses, but rows beyond the committed
snapshot remain uncounted until exported, screened, and adjudicated. The pilot
is still limited by its binary scale, fixed order, missing fillers, ambiguous
context-free items, and late global comment field. Its minimum promotion-grade
critical-item sample remains zero.

## Panel thresholds

- pilot: 5–10 usable judgments per item;
- `provisional`: 10 usable judgments per critical positive and boundary item
  from a clean role-neutral instrument;
- `supported_productive`: 30 per critical item from a locked clean instrument,
  plus every other Definition-of-Done requirement.

## Validation baseline

- regression: **545 cases**;
- NP subsystem: **43 cases**;
- construction assertions: **1,156**;
- construction test files: **170**;
- no parser span behavior changed in this migration.

## Next milestone

Build and pilot one role-neutral mixed-construction survey wave containing PFV
and RUL as the two focal constructions plus unrelated fillers. Lock the revised
instrument only after a 5–10 response-per-item pilot shows no material defect.
Do not reopen the broad archived backlog until that wave reaches an adjudicated
disposition.
