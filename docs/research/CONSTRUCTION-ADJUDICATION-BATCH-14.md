# Construction adjudication — Batch 14

**Adjudication date:** 2026-07-25  
**Authority:** project expert systematic review  
**Records:** `AA92`, `AA93`, `AA94`, `AA96`, `AA97`

## Integration state

The expert decisions are recorded in
`data/construction-adjudication-batches/batch-14.json`. Deterministic application
to the identity registry, label sweep, discovery registry, generated research
reports, and current documentation must occur in the same pull request before
merge readiness.

This batch changes identity and ontology metadata only. It does not authorize or
perform a runtime-label migration, status-path migration, matcher change, fixture
change, new UUID allocation, lifecycle change, restoration, survey change,
release change, promotion, or merge.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Action |
|---|---|---|---|---|
| `AA92` | `MotionDelimitedVP` | `MotionPurposeDelimitedCompositeWrapper` | `parser_representation` | `retain_retired_reclassify` |
| `AA93` | `MotionGoalVP` | `OvertDestinationMotionVP` | `language_construction` | `rename_retain_narrow` |
| `AA94` | `MotionPurposeChain` | `MotionClausePurposeRelation` | `language_construction` | `rename_retain_narrow` |
| `AA96` | `NeedsContext` | `UnresolvedContextDiagnostic` | `parser_representation` | `rename_retain_narrow` |
| `AA97` | `NegatedDirectionalMotionVP` | `NegatedMotionPredicateWrapper` | `parser_representation` | `internalize_and_decompose` |

No UUID, permanent code, lifecycle state, runtime label, or status path changes.

## AA92 — MotionPurposeDelimitedCompositeWrapper

- UUID: `15d06614-d21c-5f48-a72c-4ea66273cc6f`
- Lifecycle: remains retired.
- Family: `PurposeAndAspectRepresentation`
- Profile: `MotionPurposePlusDelimitedActionAggregate`
- Alignment: `disjoint`; the outer frame adds no language-construction boundary.
- Status recommendation: remain retired.

The retirement audit records zero accepted fixtures and no surviving parser
output. The former movement + action + `吓` cross-product fused an inter-event
purpose relation with delimitative aspect. Matthews independently constrains
serial-verb analysis, while the delimitative material belongs under its own VP
profile.

The UUID remains permanently resolvable as a historical parser representation.
Future work must type the motion predicate, purpose relation, action predicate,
and delimitative aspect separately. Evidence cannot transfer from either child to
the retired composite.

## AA93 — OvertDestinationMotionVP

- UUID: `09d2535f-66fa-569c-bee6-f538f39c891c`
- Family: `DirectionalMotionAndGoals`
- Profile: `MotionPredicateWithOvertDestinationExpression`
- Alignment: runtime broader than the retained language profile.
- Status recommendation: retain `unsupported_generalization`.

The forty executable positives include overt destinations, arrival predicates,
wh-place goals, source-linked travel clauses, and clauses that also contain
following purpose predicates. Chor separates locative arrival goals from other
`到` uses, Leung separates spatial displacement from purposive `去/嚟`, and
Szeto supports motion predicate + `咗` + destination order.

The UUID is retained only for overt destination motion such as `去香港`,
`返屋企`, `入房`, `出門口`, `到屋企`, and `去邊度`. Source-initial travel,
purpose chains, bare deictic motion, abstract goals, and result uses require
independent profiles and must not inherit this identity automatically.

## AA94 — MotionClausePurposeRelation

- UUID: `cd8cdacb-c150-5565-b186-4c5e69b088f7`
- Family: `PurposeSerialRelations`
- Profile: `MotionPredicateImmediatelyFollowedByCompatiblePurposeVP`
- Alignment: `overlapping`; the relation is plausible but runtime semantics remain broader.
- Status recommendation: retain `unsupported_generalization`.

The executable inventory contains one positive, `我去餐廳食晏`, and two
nonpurpose boundaries. Leung requires an immediately following purpose phrase in
its annotation and treats purposive-marker `去/嚟` separately. Matthews shows
that two verbs and word order alone do not establish a serial-purpose
construction.

The retained identity is therefore an inter-event relation between two
independently parsed predicates. Immediate position and semantic compatibility
are required; subject sharing, argument structure, and purposive-marker uses must
remain explicit rather than inferred.

## AA96 — UnresolvedContextDiagnostic

- UUID: `73972a79-f52f-5458-95ce-2b2c8c6bc73b`
- Family: `DiagnosticRepresentation`
- Profile: `MissingContextAmbiguityOrIncompleteInterpretationDisposition`
- Alignment: runtime broader than the retained diagnostic profile.
- Status recommendation: retain `parser_heuristic`.

`NeedsContext` has high implementation reach: seventy-three snapshot positives
cover bare quantities, fragmentary predicates, omitted arguments, ambiguous
responses, semantically incompatible strings, and some malformed inputs. Its
useful invariant is narrower: the parser reports an unresolved contextual
requirement or competing interpretation and never invents an antecedent or
missing material.

`UnresolvedContextDiagnostic` preserves that learner-visible uncertainty
contract while separating malformed structure, unknown input, semantic
incompatibility, and ordinary parse failure. The legacy emitted label remains
unchanged until downstream rendering and consumers are explicitly migrated.

## AA97 — NegatedMotionPredicateWrapper

- UUID: `af7743b9-4a3d-50f2-8955-b30f48358f60`
- Family: `NegationAndMotionRepresentation`
- Profile: `M4OrMou5BeforeBasicMotionPredicateAggregate`
- Alignment: `disjoint`; sources support the components and contrasts, not the wrapper.
- Status recommendation: migrate to `parser_heuristic` only through a separate compatibility change.

The ten executable positives reduce to ordinary `唔嚟` and `冇去` patterns
inside larger clauses. Wong treats negators as a closed set preceding adjective
or verb phrases. Liang and Mai keep negation and directional structure as
separate coding categories. Yiu's `V得/唔Directional` forms are a distinct
potential construction with lexical and aspectual restrictions.

The current UUID therefore preserves only an implementation wrapper. `唔`, `冇`,
motion predicates, nonoccurrence or aspectual interpretation, and
potential-directional structure must be typed independently. The wrapper cannot
compete as a direct Cantonese construction.

## Evidence boundary

The adjudication uses the immutable identity registry, current grammar notes,
current executable construction files, the retired-construction archive, and
verified source records already mapped by the repository.

Implementation reachability and test success carry zero independent linguistic
evidence weight. Evidence does not transfer across a retired composite,
destination/source/purpose distinction, diagnostic subtype, negator, motion
predicate, potential-directional construction, or future successor.

## Expected inventory after deterministic application

- expert-adjudicated identities: **69 / 181**;
- pending adjudications: **112**;
- accepted batches: **14**;
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
