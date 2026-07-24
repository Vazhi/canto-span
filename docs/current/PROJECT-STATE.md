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
| Expert-adjudicated UUIDs | 39 |
| Pending UUID adjudications | 142 |

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

Eight accepted batches have adjudicated 39 records. Important consequences
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
- true splits require new UUIDs. Evidence is never transferred automatically from
  an umbrella, retired record, or parser representation.

The active runtime-note working set remains:

1. `AB53 ResourceInitialJungLaiFunctionClause` — legacy runtime label
   `ResourceUseLaiFunctionRelation`;
2. `AB30 ZoMarkedPerfectiveObjectVP` — legacy runtime label
   `PostverbalZoPerfectiveVP`.

Workflow activity is independent of linguistic status and adjudication priority.

## Discovery state

| Candidate state | Records |
|---|---:|
| `boundary_ready` | 1 |
| `source_supported` | 69 |
| `narrowing_candidate` | 36 |
| `excluded_nonlanguage` | 25 |
| `lexicalized_review` | 2 |
| `retired_evidence_rehome_candidate` | 42 |
| `retired_research_gap` | 6 |

Promotion-ready remains **0**. `AB30` is `boundary_ready` but still lacks reviewed
corpus evidence, clean role-neutral panel closure, held-out validation, and final
promotion review. Discovery scores rank research effort only.

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

1. Keep documentation, identity metadata, status notes, runtime behavior, and
   generated readiness reports mutually consistent.
2. Continue expert adjudication with Batch 09: `AA46 DiMarkedNP`,
   `AA47 DirectedMannerMotionVP`, `AA49 DirectionalMotionVP`,
   `AA53 DurativeVP`, and `AA55 ExistentialClause`.
3. Implement a status-path or runtime-label migration only in an explicit scoped
   change after its adjudication decision is accepted.
4. Advance `AB30` by reviewing and classifying diverse corpus candidates before
   designing a new role-neutral panel instrument.
5. Do not create release-specific verifier families, duplicate current-state
   ledgers, or automatic writer workflows that commit intermediate generated
   states.

## Historical-material rule

A dated release note, adjudication-batch report, retired ledger, or generated
baseline is provenance for what was known at that time. It may be cited, but it
must not be used as the current name, claim layer, status, runtime description,
or work order when a newer canonical record exists.
