# Construction adjudication — Batch 17

**Adjudication date:** 2026-07-25  
**Authority:** project expert systematic review  
**Records:** `AB11`, `AB12`, `AB13`, `AB14`, `AB17`

## Integration state

The expert decisions are recorded in
`data/construction-adjudication-batches/batch-17.json`. Deterministic application
to the identity registry, label sweep, discovery registry, generated research
reports, and current documentation must occur in the same pull request before
merge readiness.

This batch changes identity and ontology metadata only. It does not authorize or
perform a runtime-label migration, status-path migration, matcher change, fixture
change, new UUID allocation, lifecycle change, survey change, release change,
promotion, or merge.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Action |
|---|---|---|---|---|
| `AB11` | `NominalPredicateClause` | `BareMeasurePredicateClause` | `language_construction` | `rename_retain_narrow` |
| `AB12` | `OpinionQuestion` | `JyutGokReferentDimJoengQuestion` | `language_construction` | `rename_retain_narrow` |
| `AB13` | `OpinionStanceFrame` | `CognitionPredicateContentWrapper` | `parser_representation` | `internalize_and_decompose` |
| `AB14` | `OrdinalClassifierNP` | `TrueOrdinalClassifierNominal` | `language_construction` | `rename_retain_narrow` |
| `AB17` | `PathPhrase` | `Hoeng3OrientationPhrase` | `language_construction` | `rename_retain_narrow` |

No UUID, permanent code, lifecycle state, runtime label, or status path changes.

## AB11 — BareMeasurePredicateClause

- UUID: `d269f68c-b8dd-5b64-8dcc-ac1f2e82baab`
- Family: `MeasureAndNominalPredication`
- Profile: `SubjectNPPlusBareAgePriceOrDimensionMeasure`
- Alignment: `runtime_broader` than direct source support.
- Status recommendation: retain `research_pending`.

All twelve executable positives are copula-less subject-plus-measure clauses:
age, price, area, or dimensional length. The boundaries exclude adjectival
stative predication and overt copular identification. The current sources discuss
related scalar domains and one overt-`係` price example, but do not establish a
general unrestricted nominal-predicate clause or fully prove the copula-less
declarative profile.

The retained identity is therefore limited to bare measure predication. Age,
price, area, length, and other domains may require separate subtype records.

## AB12 — JyutGokReferentDimJoengQuestion

- UUID: `9e9f0ef7-6526-5481-9161-3cb65b3509ab`
- Family: `CognitionAndEvaluationQuestions`
- Profile: `OvertSubjectJyutGokReferentDimJoeng`
- Alignment: `runtime_narrower_defensible`.
- Status recommendation: retain `unsupported_generalization`.

The only executable positive is source-linked `你覺得佢哋點樣`. The matcher and
boundaries require an overt subject, exact predicate `覺得`, an overt evaluated
referent, and exact wh predicate `點樣`; subject/referent omission and lexical
extension to `認為` are excluded.

The old semantic label implied a broad opinion-question family. The approved name
preserves every overt component and leaves other cognition predicates and
question complements to independent composition.

## AB13 — CognitionPredicateContentWrapper

- UUID: `8536ccf8-2f9b-509a-af69-242bc26cc362`
- Family: `CognitionAndStanceRepresentation`
- Profile: `HolderPredicateAndContentAggregate`
- Alignment: `overlapping`, but not one construction.
- Status recommendation: migrate to `parser_heuristic` only through a separate compatibility change.

The fifteen executable positives span `覺得`, `以為`, and `相信`, multiple content
structures, conditional embeddings, and context-licensed short complements. The
sources distinguish lexical cognition complementation from clause-medial,
parenthetical, and grammaticalized stance uses and do not make the predicates
semantically interchangeable.

The wrapper may preserve overt holder, lexical predicate, and independently
analyzed content. It must not infer truth, factivity, speaker endorsement, or a
hidden proposition, and it cannot compete as a direct Cantonese construction.

## AB14 — TrueOrdinalClassifierNominal

- UUID: `26870b6d-1ea8-5015-8d4c-0ac867849535`
- Family: `OrdinalAndClassifierNominals`
- Profile: `HeadedOrdinalClassifierNounPlusBoundedHeadlessOrdinalClassifier`
- Alignment: `overlapping`.
- Status recommendation: retain `unsupported_generalization`.

The source-linked positive `第二隻` is headless and inserts no noun or referent. A
separate zero-evidence-weight implementation probe preserves headed
`第二個故仔`. The executable boundary `問第二個` excludes a source-attested
nonordinal “another/other one” reading.

The approved name covers true ordinal-classifier nominal structure without
claiming every instance is a headed NP. Broader headless classifier compatibility
and nonordinal `第二` senses remain separately bounded.

## AB17 — Hoeng3OrientationPhrase

- UUID: `2ea00575-67ed-5663-8fd1-869fad24d687`
- Family: `SpatialDirectionAndRoute`
- Profile: `PreverbalHoeng3PlusDirectionalGround`
- Alignment: `runtime_narrower_defensible`.
- Status recommendation: retain `unsupported_generalization`.

The only executable positive is `我向前行`. The sources distinguish `向` toward
or orientation from `經` via or route, source relations, and goal relations. Two
boundaries exclude static location and an ordinary action clause but do not
support an interchangeable generic path category.

The retained UUID is limited to preverbal `向` plus an overt directional ground.
Route, source, and goal profiles remain independently typed.

## Evidence boundary

The adjudication uses the immutable identity registry, current grammar notes,
current executable construction files, verified source records, and source-linked
boundary audits already present in the repository.

Implementation reachability and test success carry zero independent linguistic
evidence weight. Evidence does not transfer across measure domains, cognition
lexemes, wh-complement types, lexical versus grammaticalized stance uses, headed
versus headless ordinals, nonordinal `第二` senses, orientation, route, source, or
goal relations.

## Expected inventory after deterministic application

- expert-adjudicated identities: **84 / 181**;
- pending adjudications: **97**;
- accepted batches: **17**;
- promotion-ready remains **0** unless a separately authorized evidence decision changes it.

Exact discovery-state counts must be reported from the deterministic generator
rather than predicted in this expert decision record.

## Explicitly unchanged

- `main.js` and runtime behavior;
- emitted legacy labels;
- grammar-note paths and linguistic statuses;
- executable fixtures;
- lifecycle state, UUIDs, and permanent codes;
- survey instruments, responses, and deployment state;
- corpus decisions;
- release version, tags, and packages;
- merge authorization.
