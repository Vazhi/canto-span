# Construction adjudication — Batch 18

**Adjudication date:** 2026-07-25  
**Authority:** project expert systematic review  
**Records:** `AB18`, `AB19`, `AB20`, `AB21`, `AB22`

## Integration state

The expert decisions are recorded in
`data/construction-adjudication-batches/batch-18.json` and applied to the canonical
identity registry, label sweep, discovery registry, generated research reports,
and current documentation in the same pull request state.

This batch changes identity and ontology metadata only. It does not authorize or
perform a runtime-label migration, status-path migration, matcher change, fixture
change, new UUID allocation, lifecycle change, survey change, corpus decision,
release change, promotion, or merge.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Action |
|---|---|---|---|---|
| `AB18` | `PerfectiveDirectionalVP` | `DirectionalZoDeicticCompositeWrapper` | `parser_representation` | `internalize_and_decompose` |
| `AB19` | `PerfectiveObjectResultPredicate` | `WeatherPerfectiveObjectCompositeWrapper` | `parser_representation` | `retain_retired_reclassify` |
| `AB20` | `PerfectiveResultPredicate` | `LexicalResultPerfectiveCompositeWrapper` | `parser_representation` | `retain_retired_reclassify` |
| `AB21` | `PerfectiveVP` | `ZoMarkedPerfectivePredicateWrapper` | `parser_representation` | `internalize_and_decompose` |
| `AB22` | `PolarQuestionFrame` | `FinalMe1BiasedPolarQuestionFrame` | `parser_representation` | `rename_retain_narrow` |

No UUID, permanent code, lifecycle state, runtime label, or status path changes.

## AB18 — DirectionalZoDeicticCompositeWrapper

- UUID: `c0ce4694-44c9-58ff-ac8a-fb7043e7b064`
- Family: `DirectionalAndAspectRepresentation`
- Profile: `DirectionalHeadZoDeicticAggregate`
- Alignment: `overlapping`, but not one atomic construction.
- Status recommendation: migrate to `parser_heuristic` only through a separate compatibility change.

The two executable positives are exact `入咗嚟` and `落咗去`. The sources
independently motivate aspect attachment, directional ordering, motion structure,
and deictic contrasts, but do not establish one atomic
`PerfectiveDirectionalVP`. The wrapper remains useful only if it preserves the
overt directional head, `咗`, final deictic, exact order, and independently typed
children.

## AB19 — WeatherPerfectiveObjectCompositeWrapper

- UUID: `883784c2-da51-5353-a201-13f166a3527f`
- Lifecycle: remains retired.
- Family: `ResultAndChangeStateRepresentation`
- Profile: `TingZoRainWeatherAggregate`
- Alignment: `disjoint`.

The retirement archive records a weather-specific `停咗雨` fallback with no
accepted fixture and no independent reusable boundary. The historical wrapper
duplicated ordinary perfective transitive structure and cannot transfer evidence
across weather semantics, object structure, perfectivity, and result state.

## AB20 — LexicalResultPerfectiveCompositeWrapper

- UUID: `fa3f2789-8037-50de-9cd7-cac3d13a5d80`
- Lifecycle: remains retired.
- Family: `ResultAndChangeStateRepresentation`
- Profile: `LexicalResultVerbPlusZoAggregate`
- Alignment: `disjoint`.

The dedicated `解決咗` path was shadowed by ordinary perfective composition,
produced no complete parser output, and contributed no independently evidenced
result boundary. The retired UUID preserves provenance only; lexical result
meaning, productive result complementation, and perfective aspect remain separate.

## AB21 — ZoMarkedPerfectivePredicateWrapper

- UUID: `352e92ab-f193-53d2-a2ec-851f4c435458`
- Family: `PerfectiveAspectRepresentation`
- Profile: `OvertZoPredicateAggregate`
- Alignment: `overlapping`, but broader than one construction.
- Status recommendation: migrate to `parser_heuristic` only through a separate compatibility change.

The twenty-one executable positives span null-object `V咗`, overt-object `V咗O`,
inner-aspect or result-plus-`咗`, motion predicates, embedded clauses,
topic-linked omissions, and particle-bearing forms. The sources support multiple
subprofiles, including `V完(咗)O` and verb-plus-`咗` questions and answers, but do
not make the broad runtime aggregate indivisible.

The approved wrapper preserves overt `咗` and independently analyzed child
structure without inserting a hidden object or equating completion, result,
motion, embedding, and discourse interpretations. `AB30
ZoMarkedPerfectiveObjectVP` remains a distinct narrower language identity.

## AB22 — FinalMe1BiasedPolarQuestionFrame

- UUID: `5187ba31-988b-538d-bd4a-705dc31dab4a`
- Family: `QuestionRepresentation`
- Profile: `OvertPropositionPlusFinalMe1`
- Alignment: `runtime_narrower_defensible`.
- Status recommendation: retain `parser_heuristic`.

All six executable positives contain sentence-final biased `咩`, optionally in a
particle cluster such as `㗎咩`. The explicit boundaries exclude A-not-A and
scalar wh questions, while the ontology probe records subtype
`biased_sentence_final_me1` and an overt proposition host.

The approved name therefore replaces the generic polar-question umbrella with
the actual internal subtype. A-not-A, `有冇`, `係咪`, final-`未`, wh, scalar, and
other particle-question strategies remain independently typed.

## Evidence boundary

The adjudication uses the immutable identity registry, current grammar notes,
current executable construction files, verified source records, and the retired
construction archive already present in the repository.

Implementation reachability and test success carry zero independent linguistic
evidence weight. Evidence does not transfer across perfective subtypes,
directional and deictic relations, lexical result meaning, weather semantics,
object realization, inner aspect, embedding, final particles, A-not-A, `有冇`,
`係咪`, final-`未`, or wh-question profiles.

## Resulting inventory

After deterministic application:

- expert-adjudicated identities: **89 / 181**;
- pending adjudications: **92**;
- accepted batches: **18**;
- `boundary_ready`: **1**;
- `source_supported`: **62**;
- `narrowing_candidate`: **30**;
- `excluded_nonlanguage`: **38**;
- `lexicalized_review`: **2**;
- `retired_evidence_rehome_candidate`: **42**;
- `retired_research_gap`: **6**;
- promotion-ready: **0**.

## Explicitly unchanged

- `main.js` and runtime behavior;
- emitted legacy labels;
- grammar-note paths and linguistic statuses;
- executable fixtures;
- lifecycle state, UUIDs, and permanent codes;
- corpus classifications and readiness decisions beyond deterministic consequences;
- survey instruments, responses, and deployment state;
- release version, tags, and packages;
- merge authorization.
