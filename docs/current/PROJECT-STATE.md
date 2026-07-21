# Project state

## Current baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.190 |
| Runtime labels | 169 |
| Current construction notes | 169 |
| Active working notes | 2 |
| Workflow-archived notes | 167 |
| Retired labels | 12 |
| `supported_productive` | 0 |
| `provisional_reaudit` | 0 |
| `provisional` | 0 |
| `research_pending` | 60 |
| `unsupported_generalization` | 86 |
| `lexicalized_only` | 3 |
| `parser_heuristic` | 20 |

The canonical registry is the union of `grammar/active/*.md` and `grammar/archived/*.md`; it matches the 170 runtime labels exactly.

## v0.5.190 low-reference wrapper audit

Five low-reference labels received constructor-specific review. `ComparativeStative`, `DefinitionExplanatoryFrame`, and internal `DefinitionComplement` now have one executable implementation-only probe each, all with zero linguistic evidence weight. `TemporalAdverbialClause` was retired because the runtime had no constructor, fixture, test, or output for it; its checked source and future subtype question remain archived.

`Comment` remains unresolved. Its late internal fallback can create a `Comment` wrapper when invoked directly, but exhaustive parsing of every current topic-candidate followed by each of the 811 current lexicon terms produced zero complete-parser `Comment` outputs. This is treated as likely shadowing, not proof of total unreachability.

Current construction coverage:

- positive and boundary: **2**;
- positive only: **100**;
- implementation positive only: **18**;
- no direct cases: **49**.

No recognized parser span or retained linguistic status changed.

## v0.5.189 runtime-reachability checkpoint

The 68 labels that had no direct standardized case at v0.5.188 were checked
against 1,885 unique Cantonese-bearing strings extracted from structured project
materials. Fifteen labels were observed and now have one executable
`implementation_positive_only` probe each. Every probe has zero linguistic
evidence weight. Fifty-three labels remain `no_direct_cases` and require
code-specific reachability review.

No label was retired: every audited label still has at least one runtime code
reference. “Not observed” is not treated as “unreachable.” Parser behavior and
linguistic status are unchanged.

Current construction coverage:

- positive and boundary: **2**;
- positive only: **100**;
- implementation positive only: **15**;
- no direct cases: **53**.

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
- construction assertions: **1,174**;
- construction test files: **170**;
- no parser span behavior changed in this migration.

## Next milestone

Continue the 53-label implementation reachability backlog in small related
families. The first family should cover low-reference wrappers and clause labels,
with exact constructor inspection before any probe is added. Survey work remains
blocked until the user supplies the requested survey-guidance prompt; at that
point resume the mixed RUL/PFV `pilot-v1` lifecycle.
