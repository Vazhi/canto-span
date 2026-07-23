# Active-label evidence and ontology closure — research handoff R1

**Prepared:** 2026-07-23  
**Required starting baseline:** `fee239474e758213d51bad1c77dbca497ef533ef` or a later descendant containing the PR #12 grammar-note guidance  
**Scope:** the original 37 `unsupported_generalization` labels and 15 `parser_heuristic` labels listed below

## Purpose

This is the repository-local decision handoff for the active-label evidence and ontology closure track.

The 52 labels are not a deletion queue. Every affected grammar note now contains an `Evidence and ontology closure guidance` section recording the relevant research finding, likely ontology role, recommended disposition, and a retirement safeguard. Those note sections are the primary label-specific decision material.

The dominant expected operations are narrowing, renaming, decomposition, migration to shared parser subsystems, internalization, and quarantine. Retirement is appropriate only when a label adds no defensible linguistic, structural, diagnostic, or compatibility value after migration.

## Original frozen inventory

### Language-status records: 37

- `AcceptabilityANotA`
- `AcceptabilityClause`
- `ApproximateQuantity`
- `AssociativeNP`
- `ClassifierObjectNP`
- `CognitionStatementClause`
- `ConditionalClause`
- `CoordinatedNP`
- `CopularANotAQuestion`
- `DelimitedVP`
- `ExistentialQuestion`
- `ExperientialClause`
- `ExperientialYesNoQuestion`
- `IntransitiveVP`
- `LocativePlacePhrase`
- `LocativeWhQuestion`
- `MotionGoalVP`
- `MotionPurposeChain`
- `NegatedExistentialClause`
- `NegatedVP`
- `NegativePotentialComplement`
- `NegativePotentialDirectionalVP`
- `OpinionQuestion`
- `OpinionStanceFrame`
- `OrdinalClassifierNP`
- `PathPhrase`
- `PerfectiveDirectionalVP`
- `PoliteImperativeClause`
- `ProgressiveDirectionalVP`
- `ProgressiveWhObjectQuestion`
- `QuantifiedPersonNP`
- `RepetitiveComplementVP`
- `RestorativeComplementVP`
- `SourceMotionClause`
- `StativePredicate`
- `SuggestionQuestion`
- `WhClassifierQuestion`

### Internal/parser records: 15

- `ClauseRelationEdge`
- `ClauseRelationGraph`
- `ClauseRelationMemberSpan`
- `ClauseSpan`
- `CopularIdentificationFrame`
- `CopularRelationFrame`
- `DemonstrativeClassifierNP`
- `DiscourseParticleFrame`
- `FocusParticleFrame`
- `MalformedCandidate`
- `MeasureExpression`
- `NeedsContext`
- `NominalHeadSpan`
- `PolarQuestionFrame`
- `TopicComment`

Later status moves do not change this original track inventory. Every original label requires a final recorded disposition.

## Required reading before changes

- `docs/current/DOCTRINE.md`
- `docs/current/GOVERNANCE.md`
- `docs/current/DEFINITION-OF-DONE.md`
- `docs/current/PROJECT-STATE.md`
- `docs/current/NOUN-PHRASE-SUBSYSTEM.md`
- `data/retirement-review-state.json`
- the affected grammar note
- its `tests/constructions/<Label>.json`
- every exact runtime path in `main.js`
- every research, collision, source-verification, native-conflict, or focused-evaluation record named by the note
- relevant A1/context/status fixtures and regression snapshots

Do not infer the current implementation from the note alone. Runtime heuristics are the implementation ground truth; sources determine what may be claimed linguistically.

## Mandatory preflight

1. Start from the required baseline or a clean descendant. Do not reuse an older branch.
2. Run and record the unchanged baseline:
   - `npm test`
   - `npm run verify`
   - `npm run verify:release`
   - `git diff --check`
3. Use the repository's existing release-baseline mechanism before the first status, runtime, or A1 contract change.
4. Confirm that no other active branch is changing the same grammar family.
5. Keep this as a governance reconciliation track. The affected notes may remain workflow-archived; do not change workflow state merely to make them visible to the track.

## Binding decision rules

1. A status name is not a retirement instruction.
2. Missing panel evidence blocks promotion; it does not prove nonexistence.
3. An attested narrow subtype must not promote a broad wrapper.
4. A redundant wrapper may retire only after all valid surfaces, semantic roles, boundaries, ambiguity, and learner-visible information are preserved under the replacement.
5. Parser representations and diagnostic states do not require construction-level promotion. They require stable contract semantics, invariants, and explicit nonlicensing behavior.
6. Preserve overt token identity. Do not insert hidden subjects, objects, nouns, propositions, resources, connectives, or positive counterparts.
7. Preserve ambiguity where sources do not determine one analysis.
8. Prefer decomposition over retirement when supported child structures already exist.
9. Do not create a parallel status ledger or a new verification framework. Update the existing canonical notes, tests, archive, baseline, documentation, and release audit.
10. Do not count generated fixtures, implementation reachability, raw corpus hits, or regression success as linguistic evidence.
11. Do not promote a retained language profile beyond `research_pending` unless all existing source and role-neutral panel thresholds are independently met.
12. A survey is not required for internal infrastructure. For disputed language judgments, finish source narrowing first and then use a clean role-neutral panel instrument.

## Retirement gate

A label may retire only when all applicable answers are yes:

1. Is its exact runtime behavior known?
2. Have all mapped sources been reopened and checked against the implemented proposition?
3. Have relevant `UC-RQ-*`, `PRQ2-*`, source-verification, collision, and native-conflict records been inspected?
4. Is the label absent from required A1 output, or is a compatibility migration explicitly versioned?
5. Can every valid positive surface be represented without losing meaning, role boundaries, ambiguity, or learner-visible information?
6. Are all negative and absence boundaries preserved after migration?
7. Is it neither useful infrastructure nor a diagnostic state?
8. Is the replacement more truthful and maintainable than the current label?
9. Is the retirement reason about the label or implementation rather than merely incomplete research?
10. Is provenance preserved in the retirement archive and related notes?

Any `no` or `not checked` result requires retain, revise, internalize, quarantine, or further research—not retirement.

## Family order

### 1. Contract-critical infrastructure

`ClauseSpan`, `ClauseRelationMemberSpan`, `ClauseRelationEdge`, `ClauseRelationGraph`, `NominalHeadSpan`, `MeasureExpression`, `NeedsContext`, `MalformedCandidate`, and the `DemonstrativeClassifierNP` compatibility alias.

Define stable JSON roles and invariants before public-label migrations depend on them.

### 2. Noun-phrase ontology

`AssociativeNP`, `ClassifierObjectNP`, `CoordinatedNP`, `OrdinalClassifierNP`, `QuantifiedPersonNP`, `WhClassifierQuestion`, `DemonstrativeClassifierNP`, `NominalHeadSpan`, and `MeasureExpression`.

Likely endpoint: fewer public wrappers over a stronger shared NP subsystem. Do not delete classifier, modification, coordination, ordinal, quantified, or wh-nominal phenomena.

### 3. Questions and copular ontology

`AcceptabilityANotA`, `CopularANotAQuestion`, `ExistentialQuestion`, `ExperientialYesNoQuestion`, `LocativeWhQuestion`, `OpinionQuestion`, `ProgressiveWhObjectQuestion`, `SuggestionQuestion`, `WhClassifierQuestion`, `PolarQuestionFrame`, `CopularIdentificationFrame`, and `CopularRelationFrame`.

Resolve full `係唔係`, contracted `係咪`, terminal tags, `有冇`, final `未`, particle questions, and wh-in-situ composition separately.

### 4. Negation, potential, and aspect

`NegatedExistentialClause`, `NegatedVP`, `NegativePotentialComplement`, `NegativePotentialDirectionalVP`, `DelimitedVP`, `ExperientialClause`, `PerfectiveDirectionalVP`, `ProgressiveDirectionalVP`, `RepetitiveComplementVP`, and `RestorativeComplementVP`.

Preserve marker identity and distinguish viewpoint aspect, inner/postverbal aspect, potentiality, existential negation, and contextual restoration/repetition.

### 5. Motion and spatial ontology

`LocativePlacePhrase`, `MotionGoalVP`, `MotionPurposeChain`, `PathPhrase`, `SourceMotionClause`, and directional/aspect composites.

Use typed roles for event location, predicate location, result/goal, source, route, orientation, deixis, and purpose.

### 6. Cognition, stance, discourse, and particles

`CognitionStatementClause`, `OpinionQuestion`, `OpinionStanceFrame`, `ConditionalClause`, `SuggestionQuestion`, `DiscourseParticleFrame`, `FocusParticleFrame`, and `TopicComment`.

Keep lexical complementation, grammaticalized stance, particle scope, information structure, and clause relations distinct.

### 7. Predicate and directive labels

`IntransitiveVP`, `StativePredicate`, `PoliteImperativeClause`, and `AcceptabilityClause`.

Avoid importing a simple English valency or adjective/verb ontology.

## High-value research leads not to overlook

These are leads for scope verification, not automatic status authorization:

- Marco Wing Yin Lui. 2026. **The associative plural in Cantonese.** DOI `10.1075/lali.00256.lui` — separates `X + (佢)哋` from the current `嘅`-modifier node.
- Francis Bond and Joanna Ut-Seong Sio. 2024. **A Construction-based Approach to Cantonese Classifiers.** DOI `10.21248/hpsg.2024.4`.
- Winterstein et al. 2023. **An empirical, corpus-based approach to Cantonese nominal expressions.** ACL Anthology `2023.paclic-1.43`.
- Hengliang Xia. 2025. **Syntax of Classifiers and Measure Words in Three Chinese Languages.** CLA 2025 proceedings.
- Elaine Francis and Stephen Matthews. 2005. **A multi-dimensional approach to the category verb in Cantonese.** DOI `10.1017/S0022226705003270`.
- Joanna Sio and Francis Bond. 2025. **Inner and outer aspect in Cantonese.** HPSG proceedings.
- Kafai Yip. 2025. **Inner Aspect in Cantonese.** Author manuscript.
- Winnie Chor. 2018. **Directional Particles in Cantonese.** DOI `10.1075/scld.9`.
- J. R. Leung. 2026. **Directional motion event expression in Cantonese.** DOI `10.1075/aplv.25004.leu`.
- S. W. M. Kwan. 2010. **The Placement of Locative Prepositional Phrases in Cantonese.** Taiwan Journal of Linguistics 8(2).
- Ann Law. 2001. **A-not-A questions in Cantonese.** UCL Working Papers in Linguistics.
- Sybesma and Li. 2007. **The dissection and structural mapping of Cantonese sentence-final particles.** DOI `10.1016/j.lingua.2006.10.003`.
- Winnie Chor. 2018. **Sentence-final particles as epistemic modulators in Cantonese conversations.** DOI `10.1016/j.pragma.2018.03.008`.
- Yap, Wong, and Chor. 2014. **Clause-medial particles and stance marking in Cantonese.** PolyU institutional record.
- Fung. 2007. **Topic and focus in Cantonese: an OT-LFG account.** HKU thesis DOI `10.5353/th_b3872511` — mandatory review before any `TopicComment` retirement.
- Winnie Chor. 2013. **From direction to positive evaluation: grammaticalization of `返`.** Language and Linguistics 14(1).
- Cheng and Sybesma. 2004. **Postverbal can in Cantonese and Hakka.** DOI `10.1016/S0024-3841(03)00067-6`.
- Cruschina et al. 2023. **Potential `得` in Cantonese.** DOI `10.1515/flin-2023-2008`.

## Required disposition record

Use the affected grammar note as the canonical record. For each original label, update or add:

- exact runtime locations and complete-output reach;
- learner visibility and serialized role;
- checked source proposition and limitations;
- competing analyses;
- current positives and boundaries;
- ontology class;
- final disposition;
- replacement/migration map;
- A1/schema decision;
- unresolved research or panel needs;
- release files changed.

Do not create a separate per-label truth ledger.

## Endpoint

The track is complete only when:

- all original 52 labels have a recorded evidence-aware disposition;
- no retirement was based merely on missing research or missing panel evidence;
- no learner-visible label claims more than its checked evidence supports;
- every retained language profile has scope-matched sources, executable positives and boundaries, and code/document agreement;
- every retained serialized internal object has documented JSON semantics, invariant tests, and explicit nonlicensing behavior;
- every renamed, decomposed, internalized, quarantined, or retired label has an A1 compatibility decision;
- the current retirement review is unambiguously recorded as complete;
- the grammar index and current documentation match canonical folders;
- `positive_only`, `implementation_positive_only`, and `no_direct_cases` remain zero;
- `npm test`, `npm run verify`, `npm run verify:release`, and `git diff --check` pass.
