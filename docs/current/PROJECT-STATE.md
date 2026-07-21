# Project state

## Current baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.188 |
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

## v0.5.188 RUL survey-readiness checkpoint

The checked source record now explicitly preserves the competing analyses of the
RUL surface: Wong 2023 treats `呢個用嚟切嘢` as an instrumental serial-verb
construction, while Cheung 2018 and Chor 2018 place `嚟` in a broader purposive
system. The current runtime label is therefore not treated as a uniquely
established linguistic analysis.

The v0.5.187 runtime was mapped across 30 implementation-only probes and twelve
contrast domains. The probes have zero linguistic evidence weight; they expose
semantic overbreadth, person/ellipsis ambiguity, modal/copular and actual-use
boundaries, coordination undercoverage, and adverb-attachment inconsistency.

No survey instrument was created. The next blocking input is the user prompt
that will guide creation of a mixed RUL/PFV `pilot-v1`.

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

Wait for the user prompt that will guide survey creation, then build a role-neutral
mixed RUL/PFV `pilot-v1` from the frozen CP032 contrast requirements. Release it
only as a pilot, collect 5–10 usable judgments per item, and audit the instrument
before locking any larger collection. Do not reopen the broad archived backlog
until the wave reaches an adjudicated disposition.
