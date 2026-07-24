# Project state

This file is the concise present-tense project snapshot. Historical release
narratives remain in Git history and research records and do not define current
policy or ontology.

## Baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.216 |
| Runtime labels | 133 |
| Current construction notes | 133 |
| Active working notes | 2 |
| Workflow-archived notes | 131 |
| Retired labels | 48 |
| Permanent UUID records | 181 |
| Expert-adjudicated UUIDs | 49 |
| Pending UUID adjudications | 132 |

## Linguistic-status inventory

| Status | Records |
|---|---:|
| `supported_productive` | 0 |
| `provisional_reaudit` | 0 |
| `provisional` | 0 |
| `research_pending` | 79 |
| `unsupported_generalization` | 37 |
| `lexicalized_only` | 2 |
| `parser_heuristic` | 15 |

These counts describe status-note placement. Expert adjudication may recommend a
rename, narrowing, split, internalization, or future status migration without
silently moving a note or changing parser behavior.

## Identity and adjudication

The permanent registry covers all 133 current and 48 retired records. UUID and
short code are immutable; canonical name, family, profile, claim layer, and
learner label may be revised through accepted UUID-keyed adjudication.

Ten accepted batches have adjudicated 49 records. Important consequences
include:

- `AB30 ZoMarkedPerfectiveObjectVP` is the nearest direct candidate;
- `AB53 ResourceInitialJungLaiFunctionClause` is the canonical identity for the
  legacy runtime note `ResourceUseLaiFunctionRelation`;
- broad or composite labels such as `AB05 PreverbalNegativeExperientialWrapper`,
  `AB16 BeiPassivePermissiveAmbiguityWrapper`, `AB23 PoliteRequestWrapper`,
  `AA04 ActionQuantityDurationWrapper`, and `AA23 CognitionShortComplementWrapper`
  no longer compete as direct language-construction candidates;
- Batch 08 narrows the legacy labels `CompletionVP`, `CoverbFrame`,
  `DegreeMannerAdverbial`, `DegreeStativePredicate`, and `DesiderativeVP` to
  `AA26 WanMarkedCompletionVP`, `AA34 PreverbalCoverbNPClause`,
  `AA37 PostverbalDiMannerAdjustmentVP`, `AA40 HouMarkedPropertyPredicate`, and
  `AA45 SoengVPComplementClause`;
- Batch 09 reclassifies `AA47 MannerMotionDirectionalWrapper` as an internal
  representation and narrows `AA46`, `AA49`, `AA53`, and `AA55` to
  `DiMarkedNounNP`, `IndependentMotionPredicateVP`,
  `ZyuMarkedContinuativeObjectVP`, and `SubjectJauPossessiveClause`;
- Batch 10 reclassifies `AA66 ContextLinkedAnswerUtteranceWrapper` as an internal
  discourse representation and narrows `AA58`, `AA62`, `AA67`, and `AA68` to
  `JauMeNounWhQuestion`, `GwoMarkedExperientialObjectVP`,
  `NeMarkedThematicContinuationQuestion`, and `MotionVerbDouGoalVP`;
- true splits require new UUIDs. Evidence is never transferred automatically from
  an umbrella, retired record, or parser representation.

The active runtime-note working set remains:

1. `AB53 ResourceInitialJungLaiFunctionClause` — legacy runtime label
   `ResourceUseLaiFunctionRelation`;
2. `AB30 ZoMarkedPerfectiveObjectVP` — legacy runtime label
   `PostverbalZoPerfectiveVP`.

Workflow activity is independent of linguistic status and adjudication priority.

## Discovery and corpus state

| Candidate state | Records |
|---|---:|
| `boundary_ready` | 1 |
| `source_supported` | 67 |
| `narrowing_candidate` | 36 |
| `excluded_nonlanguage` | 27 |
| `lexicalized_review` | 2 |
| `retired_evidence_rehome_candidate` | 42 |
| `retired_research_gap` | 6 |

Promotion-ready remains **0**.

The current AB30 extraction packet contains five completely reviewed candidates:
two genuine and three false positives. The expert decision ledger records
`readiness_effect: partial_only` because the two genuine tokens come from only two
small user-supplied conversation sources. The packet establishes natural
attestation and extractor boundaries, but it does not satisfy the broader diverse-
corpus gate or establish productivity. The deterministic discovery registry
therefore remains conservative until canonical readiness inputs support a stronger
transition.

A separate completed HKCanCor claim cross-reference uses PyCantonese 5.0.0 to
exhaust the bounded high-recall `v|v1|xv + 咗 + r` track: all 121 exact tokens
across 118 utterances and 46 source files. Context review classifies 69 as
genuine, 48 as false positives, 4 as ambiguous, and 0 as unusable. This is a
research checkpoint only: it demonstrates natural overt-object attestation and
the limits of token/POS adjacency, but it does not replace the accepted
five-candidate packet, exhaust all `咗` or overt-NP profiles, or change the
`partial_only` readiness effect.

A second completed, disjoint HKCanCor cross-reference exhausts the largest
remaining immediate-post-`咗` POS bucket: all 106 exact
`v|v1|xv + 咗 + m` tokens across 104 utterances and 44 source files. Context
review classifies 52 as genuine, 52 as false positives, 2 as ambiguous, and 0 as
unusable. The result separates quantified-object attestations from duration,
frequency, degree, threshold, predicative, and postverbal-subject boundaries. It
is another research checkpoint only and does not change accepted packet or
readiness state.

## Native-panel and survey state

`YUE-JUDGMENT-PILOT-01` remains the active SoSci collection instrument. The
repository follow-up specification under
`review-packets/native-panel/active-v2/followup-draft-v1-*` is a non-deployable
draft only.

The current pilot must close and receive an item-level audit before the follow-up
draft may be revised, locked, generated as a form, or deployed. The follow-up uses
canonical `G06–G09` and `F011–F018` IDs and retains a complete crosswalk from the
superseded Codex-local aliases.

No panel evidence, corpus packet, pilot count, or readiness score independently
authorizes status promotion.

## Verification baseline

- aggregate regression cases: **551**;
- NP-subsystem cases: **43**;
- per-construction assertions: **1,518** across **133** files;
- current test coverage: 132 positive-and-boundary and 1
  compatibility-alias-only construction file;
- stable verification: `npm run verify`;
- full verification: `npm run verify:all`.

Implementation reachability and test success have zero independent linguistic
evidence weight.

## Current work order

1. Keep documentation, identity metadata, status notes, runtime behavior, survey
   metadata, corpus decisions, and generated readiness reports mutually
   consistent.
2. Continue expert adjudication with Batch 11: `AA72 ImpersonalEnvironmentalClause`,
   `AA75 IntransitiveVP`, `AA76 LexicalGiveRelation`,
   `AA77 LocativeExistentialClause`, and `AA79 LocativeFrameClause`.
3. Keep `YUE-JUDGMENT-PILOT-01` in collection until its stopping rule is met, then
   perform an item-level instrument and response audit before revising any follow-
   up instrument.
4. Expand AB30 corpus diversity through additional independent natural sources
   while preserving mechanical extraction and expert classification as separate
   stages.
5. Revise `followup-draft-v1` only after the current survey closes and its results
   determine which contrasts remain unresolved.
6. Implement a status-path or runtime-label migration only in an explicit scoped
   change after its adjudication decision is accepted.
7. Do not create release-specific verifier families, duplicate current-state
   ledgers, unlinked naming schemes, or automatic writer workflows.

## Historical-material rule

A dated release note, adjudication-batch report, retired ledger, old task prompt,
or generated baseline is provenance for what was known at that time. It may be
cited, but it must not be used as the current name, claim layer, status, runtime
description, survey state, or work order when a newer canonical record exists.
