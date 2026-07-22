# Project state

## Current baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.196 |
| Runtime labels | 168 |
| Current construction notes | 168 |
| Active working notes | 2 |
| Workflow-archived notes | 166 |
| Retired labels | 13 |
| `supported_productive` | 0 |
| `provisional_reaudit` | 0 |
| `provisional` | 0 |
| `research_pending` | 60 |
| `unsupported_generalization` | 85 |
| `lexicalized_only` | 3 |
| `parser_heuristic` | 20 |

The canonical registry is the union of `grammar/active/*.md` and `grammar/archived/*.md`; it matches the 168 runtime labels exactly.

## v0.5.196 final reachable-wrapper audit

All thirteen labels that remained `no_direct_cases` after v0.5.195 received exact constructor and complete-output review. Eleven reachable labels now have semantically coherent zero-weight implementation probes: `CompletionThenClause`, `CompoundDirectionalMotionVP`, `ConditionResult`, `DegreeModifiedLexicalStative`, `NegatedLexicalizedStative`, `PassivePermissiveRelation`, `PoliteImperativeClause`, `ProgressivePlaceQuestion`, `ProgressivePurposeClause`, `ProgressiveTransitivePredicate`, and `PurposePredicate`.

`Comment` and `PerfectiveResultPredicate` remain uncovered because their constructors are shadowed in complete output. `Comment` is still planned for merge into `TopicComment` role metadata; the controlled `解決咗` wrapper is consumed by `PerfectiveVP`. No fabricated probes were added for either label.

Current construction coverage:

- positive and boundary: **2**;
- positive only: **100**;
- implementation positive only: **63**;
- compatibility alias only: **1**;
- no direct cases: **2**.

No recognized parser span, runtime label, or linguistic status changed.

## v0.5.195 evaluation, scalar, and question wrapper audit

Ten related labels received constructor-specific review. `AcceptabilityClause`, `EvaluationWithDouSyun`, `ScalarEvaluation`, `ScalarRangeFragment`, `ScalarValueQuestion`, `OpinionQuestion`, `IdentityWhQuestion`, `SchedulingQuestion`, `TimeToActionFrame`, and `PostposedExistentialQuestion` now have semantically coherent zero-weight implementation probes.

The audit preserves rather than resolves the principal mismatches: standalone `都得` routes differently from action-plus-`都得`; checked `算` evidence does not establish the runtime price-domain wrapper; one scalar label spans heterogeneous wh domains; sourced identity and scheduling questions do not reach the dedicated runtime labels; and checked existential evidence supports preverbal `有冇` rather than the postposed wrapper.

Current construction coverage:

- positive and boundary: **2**;
- positive only: **100**;
- implementation positive only: **52**;
- compatibility alias only: **1**;
- no direct cases: **13**.

No recognized parser span, runtime label, or linguistic status changed.

## v0.5.194 speech, transfer, and complement wrapper audit

Six related labels received constructor-specific review. `SpeechTransferClause`, `DitransitiveSpeechVP`, `IntentionFrame`, `PossessiveTransferClause`, `NamingClause`, and internal `VPComplementFrame` now have semantically coherent zero-weight implementation probes.

The audit preserves the mismatches instead of hiding them: positive and negative `話你知` surfaces route differently, subjectless `諗住返屋企` bypasses `IntentionFrame`, the exact possessive-transfer wrapper combines independently sourced components, the naming fallback reaches `叫做` with an ASCII name while checked personal-naming evidence centers on `叫`, and VP-complement licensing remains predicate-specific research debt.

Current construction coverage:

- positive and boundary: **2**;
- positive only: **100**;
- implementation positive only: **42**;
- compatibility alias only: **1**;
- no direct cases: **23**.

No recognized parser span, runtime label, or linguistic status changed.

## v0.5.193 nominal wrapper audit

Four nominal labels received constructor-specific review. `OrdinalClassifierNP` and `PossessiveClassifierNP` now have semantically coherent zero-weight implementation probes. `DemonstrativeClassifierNP` is recorded separately as `compatibility_alias_only`: complete output uses internal `OvertHeadDemonstrativeClassifierNP` and exposes the broad name only as a public alias.

`DemonstrativeHeadNP` was retired because it had no constructor, fixture, standardized case, or output and preserved a demonstrative-plus-head analysis that omitted the overt classifier required by its own checked sources.

Current construction coverage:

- positive and boundary: **2**;
- positive only: **100**;
- implementation positive only: **36**;
- compatibility alias only: **1**;
- no direct cases: **29**.

No recognized parser span or retained linguistic status changed.

## v0.5.192 result and change-state wrapper audit

Eleven related labels received constructor-specific review. Ten labels now have semantically coherent implementation-only probes: `CausativeResultFrame`, `CausativeResultPredicate`, `ChangeIntoPredicate`, `ModalChangeIntoResultFrame`, `DisposalChangeIntoResultFrame`, `ResultStateClause`, `TransformationResultFrame`, `TransformationResultPredicate`, `SeemingPerfectiveResultClause`, and `PerfectiveObjectResultPredicate`. All probes have linguistic evidence weight zero.

`PerfectiveResultPredicate` remains unresolved: its direct `解決咗` fallback exists internally, but complete output is consumed by `PerfectiveVP`. No probe was added merely to improve coverage counts.

Current construction coverage:

- positive and boundary: **2**;
- positive only: **100**;
- implementation positive only: **34**;
- no direct cases: **33**.

No recognized parser span, runtime label, or linguistic status changed.

## v0.5.191 experiential and delimited wrapper audit

Six related labels received constructor-specific review. Seven implementation-only probes now cover `NegativeExperiential`, `ExperientialQuestion`, `ExperientialMotionGoalVP`, `MotionDelimitedVP`, `CognitionDelimitedVP`, and `CognitionDelimitedObjectVP`; all have linguistic evidence weight zero.

The audit records three unresolved runtime gaps rather than hiding them: object-bearing negative experiential statements can lose or change wrappers, `有冇 + V過` questions do not reach `ExperientialQuestion`, and the source-attested `你諗下係唔係` continuation does not reach the cognition-delimited wrappers.

Current construction coverage:

- positive and boundary: **2**;
- positive only: **100**;
- implementation positive only: **24**;
- no direct cases: **43**.

No recognized parser span, runtime label, or linguistic status changed.

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
- construction assertions: **1,200**;
- construction test files: **168**;
- no parser span behavior changed in this migration.

## Next milestone

Continue the 23-label implementation reachability backlog in small related
families, with exact constructor inspection before any probe is added. Survey
collection is proceeding separately; do not integrate results until a frozen
export is supplied and adjudicated.
