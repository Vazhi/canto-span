# Glossika Yue-HK A1 dialogs 001–020 decision map R1

Date: 2026-07-31
Parent issue: #130
Work claim: #394

## Outcome

The bounded twenty-dialog inventory is complete. Every one of the **821** preserved dialog turns has one exclusive runtime-coverage class, every source record remains linked to its immutable package, and nine substantive findings have a terminal decision-map category.

Three findings independently pass backlog admission and are preserved as Future issues **#391–#393**. The previously routed AA82 correctness defect is complete under **#386 / PR #390**. The remaining findings either require a named evidence acquisition step before admission or require no new project action.

## Source inventory

- Source packages: **20**
- Total preserved records: **1526**
- Dialog turns: **821**
- General lexical entries: **462**
- Vocabulary entries in Dialogs 015–020: **240**
- Stage directions: **3**

| Dialog | Title | Turns | Records | Current construction coverage | NeedsContext | No construction wrapper |
|---:|---|---:|---:|---:|---:|---:|
| 001 | 學跳舞 | 36 | 36 | 26 | 5 | 5 |
| 002 | 讚吓個蛋糕 | 38 | 72 | 27 | 4 | 7 |
| 003 | 同朋友整湯圓慶祝冬至 | 50 | 96 | 29 | 5 | 16 |
| 004 | 想走但唔想失禮 | 41 | 88 | 31 | 3 | 7 |
| 005 | 新年大計同朋友傾 | 56 | 114 | 42 | 4 | 10 |
| 006 | 將來想做乜？ | 40 | 80 | 35 | 1 | 4 |
| 007 | 週末計劃 | 40 | 80 | 31 | 4 | 5 |
| 008 | 借嘢 | 40 | 80 | 27 | 4 | 9 |
| 009 | 辦公室指示 | 40 | 80 | 30 | 2 | 8 |
| 010 | 你覺得呢間餐廳點樣 | 40 | 80 | 36 | 1 | 3 |
| 011 | 知唔知去邊度買嘢 | 40 | 80 | 35 | 2 | 3 |
| 012 | 你識唔識游水？ | 40 | 80 | 28 | 4 | 8 |
| 013 | 唔該借借 | 40 | 40 | 30 | 2 | 8 |
| 014 | 傾計講技能 | 40 | 40 | 24 | 8 | 8 |
| 015 | 信唔信得過？ | 40 | 80 | 35 | 1 | 4 |
| 016 | 佢講咗乜嘢? | 40 | 80 | 34 | 0 | 6 |
| 017 | 更正電話號碼 | 40 | 80 | 30 | 2 | 8 |
| 018 | 邊個好啲? | 40 | 80 | 36 | 1 | 3 |
| 019 | 唔好意思聽到 | 40 | 80 | 34 | 1 | 5 |
| 020 | 問清楚巴士路線 | 40 | 80 | 31 | 5 | 4 |

## Existing review and deduplication inventory

These are source-package review classifications, not linguistic-status decisions.

| Classification | Records |
|---|---:|
| `naturalness_review_candidate` | 628 |
| `new_attestation` | 287 |
| `lexical_only_attestation` | 266 |
| `lexical_review_candidate` | 240 |
| `exact_duplicate` | 98 |
| `normalized_duplicate` | 7 |

## Runtime coverage snapshot

The current generated runtime is used only to locate implementation coverage and gaps. It is not linguistic evidence.

| Coverage class | Turns |
|---|---:|
| Current construction coverage | 631 |
| `NeedsContext` | 59 |
| No construction wrapper | 131 |

Top runtime labels in the bounded collection:

| Label | Turns containing label |
|---|---:|
| `ClauseRelationGraph` | 196 |
| `ModalVP` | 172 |
| `FormulaDiscourseUnit` | 148 |
| `ClauseSpan` | 107 |
| `TransitiveVP` | 90 |
| `DirectionalMotionVP` | 78 |
| `ClauseRelationMemberSpan` | 62 |
| `DegreeStativePredicate` | 59 |
| `NeedsContext` | 59 |
| `ClauseRelationEdge` | 50 |
| `TemporalClause` | 50 |
| `ModifiedNP` | 40 |
| `ProductiveVO` | 35 |
| `TopicComment` | 33 |
| `ModifierNP` | 31 |
| `ReportedSpeech` | 27 |
| `PreferenceVP` | 26 |
| `DegreeMannerAdverbial` | 22 |
| `HeadlessDemonstrativeClassifierNP` | 19 |
| `QuantifiedTimeNP` | 18 |
| `QuantityNP` | 18 |
| `AcceptabilityANotA` | 17 |
| `ActionStativeVP` | 16 |
| `StativePredicate` | 16 |
| `DiMarkedNP` | 15 |
| `FragmentQuestion` | 15 |
| `LocativePlacePhrase` | 15 |
| `VerbComplementVP` | 15 |
| `MotionGoalVP` | 13 |
| `DiscourseParticleFrame` | 11 |

The machine-readable packet records every turn, exact surface, Jyutping, adjacency IDs, runtime labels, coverage class, and discovery tags.

## Terminal decision map

| Finding | Subject | Terminal category | Route |
|---|---|---|---|
| G20-F01 | reliability and standard-bearing V得過 | `bounded_corpus_research_candidate` | #391 |
| G20-F02 | alternative choice plus scalar evaluation | `bounded_corpus_research_candidate` | #392 |
| G20-F03 | context-linked short responses and ellipsis diagnostics | `bounded_corpus_research_candidate` | #393 |
| G20-F04 | matrix locative 邊度 questions | `accepted_runtime_specification_candidate` | #386 |
| G20-F05 | reported speech, repetition, and correction sequences | `no_action_required` | no_issue_admitted |
| G20-F06 | sympathy, apology, and politeness formulae | `no_action_required` | no_issue_admitted |
| G20-F07 | route clarification and ordinary travel questions | `no_action_required` | no_issue_admitted |
| G20-F08 | telephone, contact-detail, and digit-sequence representation | `unresolved_with_named_evidence_requirement` | future_issue_not_admitted |
| G20-F09 | source notes, Jyutping, lexical glosses, and missing turn-level English | `provenance_or_documentation_correction` | handled_by_source_packages_no_new_issue |

### Admission-ready consequences

1. **#391 — 信得過 potential-standard profile.** Independent corpus attestations plus the Glossika cluster justify decision-support research separating lexical, result-potential, evaluative-standard, experiential, and comparative analyses.
2. **#392 — alternative-choice questions with scalar evaluation.** Recurrent `A定B好(啲)` material justifies research into transparent layered composition versus a bounded integrated profile. The retired broad comparative fallback remains excluded.
3. **#393 — context-linked short responses.** The complete bounded set contains **59** `NeedsContext` turns with preserved adjacency, sufficient for a finite classification packet.

### Completed consequence

The collection contributed to the AA82 matrix-locative question investigation. The accepted implementation merged in PR #390 and the present scan creates no new AA82 issue.

### Explicit no-action findings

- Reported-speech, repetition, and correction sequences do not independently establish a missing identity.
- Sympathy, apology, and politeness material remains compatible with lexical or formulaic treatment.
- Route clarification and ordinary transport questions do not survive as a distinct construction after compositional review.
- Provider notes, Jyutping, lexical glosses, and absent turn-level English are already preserved with the correct provenance boundary.

### Unresolved but not admitted

Telephone, contact-detail, and digit-sequence representation needs a broader independent inventory distinguishing digit strings, grouped telephone numbers, quantified noun phrases, address-like sequences, and display-only tokenization. The current small pedagogical cluster does not yet satisfy backlog admission as a separate issue.

## Evidence-strength classification

- Glossika dialog and vocabulary material: **authorized pedagogical attestation**.
- Existing review and crosswalk matches: **deduplication and review metadata**.
- Current runtime labels and coverage classes: **implementation observation only**.
- The accepted AA82 packet and full regression: **implementation-boundary evidence**, not independent grammar proof.
- Any future identity, productivity, status, or broad runtime decision requires the independent evidence named in its routed issue.

## Stop rule satisfied

- all 20 sources inventoried;
- all 1526 preserved records accounted for;
- all 821 dialog turns assigned to one coverage class;
- all nine substantive findings assigned to a terminal category;
- all admission-ready consequences routed to #391–#393;
- completed AA82 consequence linked to #386 / PR #390;
- no-action and unresolved-not-admitted findings retained;
- no runtime, identity, status, survey, release, or deployment state changed.
