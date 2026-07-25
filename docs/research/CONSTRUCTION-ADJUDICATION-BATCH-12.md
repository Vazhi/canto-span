# Construction adjudication — Batch 12

**Adjudication date:** 2026-07-25  
**Authority:** project expert systematic review  
**Records:** `AA80`, `AA82`, `AA83`, `AA85`, `AA86`

## Integration state

The expert decisions are recorded in
`data/construction-adjudication-batches/batch-12.json` and applied to the canonical
identity, label-sweep, discovery, and generated research records in the same pull
request state.

This batch changes identity and ontology metadata only. It does not authorize or
perform a runtime-label migration, status-path migration, matcher change, fixture
change, new UUID allocation, retirement, survey change, release change, promotion,
or merge.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Action |
|---|---|---|---|---|
| `AA80` | `LocativePlacePhrase` | `OvertPlaceExpressionWrapper` | `parser_representation` | `internalize_and_decompose` |
| `AA82` | `LocativeWhQuestion` | `BinDouWhPlaceQuestion` | `language_construction` | `rename_retain_narrow` |
| `AA83` | `MalformedCandidate` | `MalformedStructureDiagnostic` | `parser_representation` | `rename_retain_narrow` |
| `AA85` | `MeasureExpression` | `OvertMeasureChildSpan` | `parser_representation` | `rename_retain_narrow` |
| `AA86` | `ModalANotAQuestion` | `ModalM4ModalInterrogative` | `language_construction` | `rename_retain_narrow` |

No UUID or permanent code changes.

## AA80 — OvertPlaceExpressionWrapper

- UUID: `d3c2e159-8bd7-5f57-a8f8-8deb4a12ad86`
- Family: `SpatialExpressionRepresentation`
- Profile: `OvertHaiLocalizerAndPlaceExpressionAggregate`
- Alignment: `disjoint`; legacy terminology is misleading.
- Status recommendation: migrate to `parser_heuristic` only through a separate compatibility change.
- Discovery disposition after deterministic regeneration: `excluded_nonlanguage`.

The current positives label spatial material in structurally different
environments: static `喺` predication, preverbal event location, postverbal or
existential locative codas, place-initial localizer expressions, overt `喺邊度`, and
positioning clauses. Kwan distinguishes preverbal event location from postverbal
resulting location, while Yip and Matthews preserve locative/progressive ambiguity
for `喺度`. The UUID therefore preserves only an overt spatial-span wrapper.

The wrapper must not decide that the place expression is a subject, topic, adjunct,
predicate, goal, result, or coda without a typed parent analysis. Successor work must
separately preserve static location predicates, event-location phrases, result/coda
locations, localizer expressions, place-initial existential or positioning
structures, and wh-place material.

## AA82 — BinDouWhPlaceQuestion

- UUID: `4593e90d-b923-54af-a9ac-533409c38355`
- Family: `WhPlaceInterrogatives`
- Profile: `OvertBinDouLocationGoalOrHeadlessQuestion`
- Alignment: runtime broader than any one role; form-based terminology preferred.
- Status recommendation: retain `unsupported_generalization` until role decomposition and runtime reconciliation are complete.
- Discovery disposition after deterministic regeneration: `narrowing_candidate`.

All positives contain overt `邊度`, but they divide into motion-goal `去咗邊度`,
overt locative `喺邊度`, and headless `邊度呀` questions. Four verified sources
directly support in-situ wh-place expressions, overt `喺邊度`, and destination
`去邊度`, while warning against hidden-`喺` insertion and unrestricted role
generalization.

The UUID remains attached to overt `邊度` question material. Location, goal, source,
and headless behavior must remain explicit composition or successor profiles.
Evidence does not automatically transfer to alternative wh forms or a hidden
preposition.

## AA83 — MalformedStructureDiagnostic

- UUID: `1d8b01f9-0139-5fb1-af4b-07f842b87c72`
- Family: `DiagnosticRepresentation`
- Profile: `ExplicitMalformedOrderOrCompositionDisposition`
- Alignment: no language-construction alignment; legacy name is opaque.
- Status recommendation: retain `parser_heuristic`.
- Discovery disposition after deterministic regeneration: `excluded_nonlanguage`.

The record covers several deterministic diagnostic families rather than one
linguistic pattern. The runtime contract serializes a `malformed_family`,
`malformed_subtype`, overt problem span, and repair information with zero linguistic
evidence weight.

The diagnostic must not silently repair input, invent omitted material, or compete
as a Cantonese construction. It remains distinct from `NeedsContext`, unknown input,
and ordinary parse failure. Downstream migration must preserve explicit problem and
repair metadata before the legacy label changes.

## AA85 — OvertMeasureChildSpan

- UUID: `c7a597a8-1684-5aaf-aafc-278dc6e0d897`
- Family: `NominalPredicateRepresentation`
- Profile: `QuantityUnitOrDimensionChildOfNominalPredicate`
- Alignment: runtime narrower and defensible; legacy name overstates autonomy.
- Status recommendation: retain `parser_heuristic` as a nonlicensing child span.
- Discovery disposition after deterministic regeneration: `excluded_nonlanguage`.

The executable cases are nominal-predicate measures for age, price, area, and
length. The contract probe identifies the node as an `overt_measure_child_span`,
assigns `NominalPredicateClause` as its licensing parent, and sets independent
grammar licensing to false.

The node may record overt quantity, unit or dimension, measure domain, and parent.
It must not infer a hidden unit, become the whole predicate, or collapse sortal
classifiers with mensural units.

## AA86 — ModalM4ModalInterrogative

- UUID: `93a1df83-8655-5da7-bd9f-4ff7e2cf1b9b`
- Family: `ANotAInterrogatives`
- Profile: `RepeatedModalM4ModalWithFollowingPredicate`
- Alignment: overlapping; narrower form-based terminology preferred.
- Status recommendation: retain `research_pending`.
- Discovery disposition after deterministic regeneration: `source_supported`.

The executable positives are `使唔使去` and `會唔會落雨`. Law directly analyzes
Cantonese A-not-A formation through repetition of verbs or modal auxiliaries around
negation and provides modal examples including `會唔會`, `使唔使`, `要唔要`, and
reduced disyllabic forms. Li distinguishes A-not-A, A-not-AB, a-not-AB, and a-not-A
patterns.

The retained profile covers overt repeated-modal `唔` questions. It excludes
ordinary lexical V-not-V, suppletive `有冇`, copular `係唔係`, and reduced
disyllabic patterns such as `可唔可以` unless a separate record explicitly covers
them. Modal readings, quantifier interactions, embedding, and sentence-final-particle
boundaries remain unresolved.

## Evidence boundary

The adjudication uses current immutable identity records, active grammar notes,
current executable construction files, verified source records already mapped by
the repository, and direct review of Law’s Cantonese A-not-A analysis.

Implementation reachability and test success carry zero independent linguistic
evidence weight. Evidence does not transfer across a wrapper, spatial role,
wh-place role, malformed repair, measure domain, modal reading, lexical subtype, or
future successor.

## Resulting inventory

After deterministic application:

- expert-adjudicated identities: **59 / 181**;
- pending adjudications: **122**;
- accepted batches: **12**;
- `excluded_nonlanguage`: **31**;
- `narrowing_candidate`: **34**;
- `source_supported`: **65**;
- promotion-ready: **0**.

## Explicitly unchanged

- `main.js` and runtime behavior;
- emitted legacy labels;
- grammar-note paths and linguistic statuses;
- executable fixtures;
- UUIDs and permanent codes;
- survey instruments, responses, and deployment state;
- corpus decisions;
- release version, tags, and packages;
- merge authorization.
