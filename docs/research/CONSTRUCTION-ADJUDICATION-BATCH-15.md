# Construction adjudication — Batch 15

**Adjudication date:** 2026-07-25  
**Authority:** project expert systematic review  
**Records:** `AA98`, `AA99`, `AB01`, `AB03`, `AB04`

## Integration state

The expert decisions are recorded in
`data/construction-adjudication-batches/batch-15.json` and applied to the canonical
identity registry, label sweep, discovery registry, generated research reports,
and current documentation in the same pull request state.

This batch changes identity and ontology metadata only. It does not authorize or
perform a runtime-label migration, status-path migration, matcher change, fixture
change, new UUID allocation, lifecycle restoration, survey change, release
change, promotion, or merge.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Action |
|---|---|---|---|---|
| `AA98` | `NegatedExistentialClause` | `Mou5NominalExistentialPossessiveClause` | `language_construction` | `rename_retain_narrow` |
| `AA99` | `NegatedExistentialFragment` | `Mou5EllipticalResponse` | `language_construction` | `rename_retain_narrow` |
| `AB01` | `NegatedLexicalizedStative` | `LexicalAndCompositionalNegativeStativeComposite` | `parser_representation` | `retain_retired_reclassify` |
| `AB03` | `NegatedVP` | `OvertNegatorPredicateWrapper` | `parser_representation` | `internalize_and_decompose` |
| `AB04` | `NegativeCognitionFragment` | `SubjectlessM4Zi1ResponseFragment` | `language_construction` | `rename_retain_narrow` |

No UUID, permanent code, lifecycle state, runtime label, or status path changes.

## AA98 — Mou5NominalExistentialPossessiveClause

- UUID: `ac726450-9058-50a9-afc4-245f275a739a`
- Family: `ExistentialAndPossessiveNegation`
- Profile: `OvertMou5WithNominalComplement`
- Alignment: `overlapping`; sources support the overt nominal profile but not one undifferentiated semantic class.
- Status recommendation: retain `unsupported_generalization`.

The two executable positives are `冇書` and `我冇書`. Lam distinguishes nominal
existential or possessive complements from event and perfective-predicate
negation. Yip and Yip–Matthews identify `冇` as the suppletive negative of `有`
and contrast it with `*唔有`.

The retained UUID is limited to overt `冇` plus a visible nominal complement,
optionally with an overt possessor or subject. It does not insert a hidden `有`,
and it excludes bare responses, event or aspect negation, and other negators.
Possession and existence may require later subtype separation.

## AA99 — Mou5EllipticalResponse

- UUID: `91631984-b603-5f26-9cca-fa66ef43b44f`
- Family: `FragmentAndEllipsisResponses`
- Profile: `BareOrSubjectMarkedMou5WithRecoverableComplement`
- Alignment: `overlapping`; the discourse dependency is real but the old existential-fragment name is too specific.
- Status recommendation: retain `research_pending`.

The eleven executable positives include bare `冇`, repeated `冇`, sentence-final
particle variants, and subject- or `都`-marked forms such as `我冇啊` and
`我都冇`. Yip and Matthews directly show `有` or `冇` as dialogue answers with
recoverable predicate material. Lam cautions that isolated `冇` does not by
itself determine existential, possessive, or event scope.

The retained identity therefore requires recoverable discourse content. Bare
responses and subject-marked elliptical clauses remain distinguishable subtypes.
Overt nominal complements belong under `AA98`, not this response profile.

## AB01 — LexicalAndCompositionalNegativeStativeComposite

- UUID: `4f727771-b271-5037-a264-fd52bbd35d71`
- Lifecycle: remains retired.
- Family: `NegativePropertyRepresentation`
- Profile: `LexicalNanXCompositionalM4PropertyAndM4HouAggregate`
- Alignment: `disjoint`; the legacy label joined three independently motivated profiles.
- Status recommendation: remain retired.

The v0.5.212 runtime history records retirement of the label while preserving
lexical `難X`, compositional `唔` plus property predicates, and prohibitive or
ambiguous `唔好`. The permanent identity description independently records the
same conflation.

The retired UUID remains permanently resolvable as historical parser
representation only. Evidence from lexical `難X`, compositional property
negation, or `唔好` cannot transfer through the obsolete composite.

## AB03 — OvertNegatorPredicateWrapper

- UUID: `83a4a474-5fdf-5d25-a021-49966d1be6fd`
- Family: `NegationRepresentation`
- Profile: `OvertNegatorPlusTypedPredicateAggregate`
- Alignment: `disjoint`; marker-specific research does not support one uniform negative-VP construction.
- Status recommendation: migrate to `parser_heuristic` only through a separate compatibility change.

The only executable positive is `唔做完`. The mapped sources distinguish
ordinary `唔`, existential or possessive `冇`, not-yet `未`, and aspect-related
negation. The current grammar note already recommends replacing the broad
umbrella with typed negative profiles or keeping it strictly internal.

The wrapper may preserve an overt negative marker and independently typed
predicate span for compatibility. It must not erase marker identity, infer a
hidden positive structure, or compete as a direct Cantonese construction.

## AB04 — SubjectlessM4Zi1ResponseFragment

- UUID: `574b740d-b288-59ef-a1ec-2f90a8950d5c`
- Family: `CognitionResponseFragments`
- Profile: `SubjectlessM4Zi1WithOptionalFinalParticle`
- Alignment: runtime narrower and defensible.
- Status recommendation: retain `research_pending`.

The only executable positive is subjectless `唔知呀`; a focused boundary excludes
subjectful `我唔知`. Yap, Wong, and Chor place related `唔知` forms on a
lexical-to-attitudinal continuum, so no single stance meaning can be assumed.

The retained UUID covers subjectless `唔知` as a context-dependent response,
optionally with a sentence-final particle. Subjectful cognition clauses,
complement-taking predicates, and clause-medial or grammaticalized stance uses
remain separate.

## Evidence boundary

The adjudication uses the immutable identity registry, current grammar notes,
current executable construction files, the retired-construction archive, verified
source records, and the runtime release history already present in the repository.

Implementation reachability and test success carry zero independent linguistic
evidence weight. Evidence does not transfer across existential, possessive,
event, aspectual, elliptical, lexicalized, prohibitive, marker-specific,
subjectful, stance, or future successor profiles.

## Resulting inventory

After deterministic application:

- expert-adjudicated identities: **74 / 181**;
- pending adjudications: **107**;
- accepted batches: **15**;
- `boundary_ready`: **1**;
- `source_supported`: **63**;
- `narrowing_candidate`: **33**;
- `excluded_nonlanguage`: **34**;
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
- survey instruments, responses, and deployment state;
- corpus decisions;
- release version, tags, and packages;
- merge authorization.
