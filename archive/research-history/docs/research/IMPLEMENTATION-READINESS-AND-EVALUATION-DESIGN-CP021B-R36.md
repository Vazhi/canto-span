# Implementation readiness and evaluation design (CP021B-R36)

Date: 2026-07-19  
Parent: CP021B-R35  
Scope: prioritization and evaluation design only. **No parser, lexicon, Jyutping, fixture, manifest, or held-out behavior changed.**

## Result

All **53 canonical target families** now have:

- evidence and exactness scores;
- negative-boundary maturity;
- non-held-out development-seed reach;
- cleanup reversibility;
- architecture and competing-analysis risk;
- native-review need;
- learner-harm priority;
- a readiness status;
- a primary CP022 work package;
- a frozen evaluation-packet blueprint.

The scores are ordinal engineering triage. They are **not** linguistic confidence, naturalness, productivity, or acceptance.

## Readiness statuses

- `ARCHITECTURE_PROGRAM`: **3** families
- `PACKET_REQUIRED_STRUCTURAL_REALIGNMENT`: **27** families
- `PARTIAL_CLEANUP_BLOCKED_SUBTYPES`: **5** families
- `READY_AFTER_PACKET`: **8** families
- `READY_SAFE_CLEANUP`: **5** families
- `RESEARCH_GAP_BEFORE_FULL_IMPLEMENTATION`: **5** families

## Highest remediation priorities

| Rank | Family | Readiness | Priority | Status | Package |
|---:|---|---:|---:|---|---|
| 1 | `ParserDiagnosticDisposition` | 17 | 18 | `READY_SAFE_CLEANUP` | `CP022-I1A_INTERNAL_WRAPPER_CLEANUP` |
| 2 | `DirectionalMotion` | 10 | 18 | `PACKET_REQUIRED_STRUCTURAL_REALIGNMENT` | `CP022-I3_LOCATIVE_MOTION_SERIAL_RELATIONS` |
| 3 | `FragmentsAndEllipsis` | 5 | 18 | `PARTIAL_CLEANUP_BLOCKED_SUBTYPES` | `CP022-I5_VALENCY_COMPLEMENTS_STANCE_ARCHITECTURE` |
| 4 | `StativePredication` | 5 | 18 | `ARCHITECTURE_PROGRAM` | `CP022-I5_VALENCY_COMPLEMENTS_STANCE_ARCHITECTURE` |
| 5 | `ValencyAndArgumentStructure` | 6 | 17 | `ARCHITECTURE_PROGRAM` | `CP022-I5_VALENCY_COMPLEMENTS_STANCE_ARCHITECTURE` |
| 6 | `ClauseSpan` | 16 | 16 | `READY_SAFE_CLEANUP` | `CP022-I1A_INTERNAL_WRAPPER_CLEANUP` |
| 7 | `GoalSourceAndPath` | 11 | 16 | `PACKET_REQUIRED_STRUCTURAL_REALIGNMENT` | `CP022-I3_LOCATIVE_MOTION_SERIAL_RELATIONS` |
| 8 | `NominalModificationAndRelatives` | 9 | 16 | `PACKET_REQUIRED_STRUCTURAL_REALIGNMENT` | `CP022-I2B_NOMINAL_MEASURE_AND_SCALAR_BOUNDARIES` |
| 9 | `ExistentialAndPresentationalClauses` | 9 | 16 | `PACKET_REQUIRED_STRUCTURAL_REALIGNMENT` | `CP022-I3_LOCATIVE_MOTION_SERIAL_RELATIONS` |
| 10 | `PurposeSerialRelations` | 8 | 16 | `PACKET_REQUIRED_STRUCTURAL_REALIGNMENT` | `CP022-I3_LOCATIVE_MOTION_SERIAL_RELATIONS` |
| 11 | `TypedWhAndStanceQuestions` | 5 | 16 | `PARTIAL_CLEANUP_BLOCKED_SUBTYPES` | `CP022-I2A_PARTICLE_QUESTION_NEGATION_NARROWING` |
| 12 | `DiscourseRoleStructure` | 3 | 16 | `PARTIAL_CLEANUP_BLOCKED_SUBTYPES` | `CP022-I1A_INTERNAL_WRAPPER_CLEANUP` |

## Evaluation packet freeze

R36 freezes `canto-span-focused-evaluation-packet-v1` and creates **53 blueprints**. It does not populate hidden expected outputs and does not select or open held-out examples.

Every populated packet must separately contain:

- external exact positives;
- positive variants;
- negative near misses;
- ambiguity pairs;
- context pairs where relevant;
- expected structures and forbidden analyses;
- native naturalness rows where required;
- learner-facing render targets;
- automated gates;
- a prospective held-out manifest selected before implementation.

Accepted regression examples may seed behavior-preservation tests but are not independent language evidence.

## First implementation boundary

The first candidate waves contain only merge/retire targets whose intended semantic change is **none**. Even these remain unauthorized until their packets are populated and compatibility behavior is specified.

## Files

- `IMPLEMENTATION-READINESS-MATRIX-CP021B-R36.tsv`
- `EVALUATION-PACKET-SCHEMA-CP021B-R36.json`
- `EVALUATION-PACKET-MANIFEST-CP021B-R36.tsv`
- `EVALUATION-PACKET-BLUEPRINTS-CP021B-R36.json`
- `CP022-IMPLEMENTATION-BACKLOG-CP021B-R36.tsv`
- `CP022-I1-CANDIDATE-WAVES-CP021B-R36.tsv`
- `CP022-IMPLEMENTATION-SEQUENCE-CP021B-R36.tsv`
- `CP022-IMPLEMENTATION-SEQUENCE-CP021B-R36.md`
