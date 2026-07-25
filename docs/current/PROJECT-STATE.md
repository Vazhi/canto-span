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
| Available construction notes | 133 |
| Parked construction notes | 0 |
| Retired labels | 48 |
| Permanent UUID records | 181 |
| Expert-adjudicated UUIDs | 74 |
| Pending UUID adjudications | 107 |

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

Fifteen accepted batches have adjudicated 74 records. Important consequences
include:

- `AB30 ZoMarkedPerfectiveObjectVP` is the nearest direct candidate;
- `AB53 ResourceInitialJungLaiFunctionClause` is the canonical identity for the
  legacy runtime note `ResourceUseLaiFunctionRelation`;
- broad or composite labels such as `AB05 PreverbalNegativeExperientialWrapper`,
  `AB16 BeiPassivePermissiveAmbiguityWrapper`, `AB23 PoliteRequestWrapper`,
  `AA04 ActionQuantityDurationWrapper`, and `AA23 CognitionShortComplementWrapper`
  no longer compete as direct language-construction candidates;
- Batch 08 narrows the legacy labels `CompletionVP`, `CoverbFrame`,
  `DegreeMannerAdverbial`, `DegreeStativePredicate`, and `DesiderativeVP`;
- Batch 09 reclassifies `AA47 MannerMotionDirectionalWrapper` as an internal
  representation and narrows `AA46`, `AA49`, `AA53`, and `AA55`;
- Batch 10 reclassifies `AA66 ContextLinkedAnswerUtteranceWrapper` as an internal
  discourse representation and narrows `AA58`, `AA62`, `AA67`, and `AA68`;
- Batch 11 reclassifies `AA72 EnvironmentalPredicateClauseWrapper`,
  `AA75 BareActionPredicateRelationMember`, and
  `AA79 PlaceInitialPredicateClauseWrapper` as internal representations and narrows
  `AA76` and `AA77`;
- Batch 12 reclassifies `AA80 OvertPlaceExpressionWrapper`,
  `AA83 MalformedStructureDiagnostic`, and `AA85 OvertMeasureChildSpan` as parser
  representations and narrows `AA82` and `AA86`;
- Batch 13 keeps `AA87 ModalChangePredicateCompositeWrapper` and
  `AA88 ModalEllipsisResponseCompositeWrapper` retired, reclassifies
  `AA90 HeterogeneousNominalStructureWrapper`, and narrows `AA89` and `AA91`;
- Batch 14 keeps `AA92 MotionPurposeDelimitedCompositeWrapper` retired, narrows
  `AA93` and `AA94`, renames `AA96`, and reclassifies `AA97`;
- Batch 15 narrows `AA98` and `AA99` to
  `Mou5NominalExistentialPossessiveClause` and `Mou5EllipticalResponse`, keeps
  `AB01 LexicalAndCompositionalNegativeStativeComposite` retired, reclassifies
  `AB03 OvertNegatorPredicateWrapper` as a parser representation, and narrows
  `AB04` to `SubjectlessM4Zi1ResponseFragment`;
- true splits require new UUIDs. Evidence is never transferred automatically from
  an umbrella, retired record, or parser representation.

## Workflow availability

The canonical blacklist is [`data/parked-constructions.json`](../../data/parked-constructions.json), and it is currently empty. All 133 current construction notes are available for bounded work.

Agents may choose whichever available construction or infrastructure task offers the greatest expected project benefit after checking evidence gaps, learner impact, ontology risk, dependencies, implementation leverage, and open-PR overlap. Discovery rankings inform that decision but do not impose a queue.

There is no repository-wide grammar freeze. New constructions, splits, broadenings, status changes, and runtime changes are permitted when their exact scope satisfies the applicable identity, evidence, boundary, documentation, and verification requirements.

## Discovery and corpus state

| Candidate state | Records |
|---|---:|
| `boundary_ready` | 1 |
| `source_supported` | 63 |
| `narrowing_candidate` | 33 |
| `excluded_nonlanguage` | 34 |
| `lexicalized_review` | 2 |
| `retired_evidence_rehome_candidate` | 42 |
| `retired_research_gap` | 6 |

Promotion-ready remains **0**.

The current AB30 extraction packet contains five completely reviewed candidates: two genuine and three false positives. The expert decision ledger records `readiness_effect: partial_only` because the two genuine tokens come from only two small user-supplied conversation sources. The packet establishes natural attestation and extractor boundaries, but it does not satisfy the broader diverse-corpus gate or establish productivity.

Completed HKCanCor mechanical inventories remain research inputs only. They preserve corpus provenance and candidate coverage without independently classifying construction identity, linguistic status, or promotion readiness.

## Native-panel and survey state

`YUE-JUDGMENT-PILOT-01` remains the active SoSci collection instrument. The repository follow-up specification under `review-packets/native-panel/active-v2/followup-draft-v1-*` is a non-deployable draft only.

The current pilot must close and receive an item-level audit before the follow-up draft may be revised, locked, generated as a form, or deployed.

No panel evidence, corpus packet, pilot count, or readiness score independently authorizes status promotion.

## Verification baseline

- aggregate regression cases: **551**;
- NP-subsystem cases: **43**;
- per-construction assertions: **1,518** across **133** files;
- current test coverage: 132 positive-and-boundary and 1 compatibility-alias-only construction file;
- stable verification: `npm run verify`;
- full verification: `npm run verify:all`.

Implementation reachability and test success have zero independent linguistic evidence weight.

## Current work order

1. Keep documentation, identity metadata, status notes, runtime behavior, survey metadata, corpus decisions, parked-work state, and generated readiness reports mutually consistent.
2. Select the most beneficial bounded non-parked task after inspecting current `main`, open PRs, dependencies, evidence gaps, learner impact, and ontology risk.
3. Continue expert identity adjudication from the 107 pending UUIDs when that work outranks other available tasks; no later batch is a mandatory queue.
4. Keep `YUE-JUDGMENT-PILOT-01` in collection until its stopping rule is met, then perform an item-level instrument and response audit before revising any follow-up instrument.
5. Expand corpus diversity through additional independent natural sources when that work outranks other available tasks, while preserving mechanical extraction and expert classification as separate stages.
6. Recommend unpark when a blacklisted item becomes the highest-benefit target; do not work on it silently.
7. Implement a status-path or runtime-label migration only in an explicit scoped change after its adjudication decision is accepted.
8. Do not create release-specific verifier families, duplicate current-state ledgers, unlinked naming schemes, or automatic writer workflows.

## Historical-material rule

A dated release note, adjudication-batch report, retired ledger, old task prompt, or generated baseline is provenance for what was known at that time. It may be cited, but it must not be used as the current name, claim layer, status, runtime description, survey state, or work order when a newer canonical record exists.
