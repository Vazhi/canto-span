# Architecture

## Audit interpretation

> **CP020R2-RA1 state — 2026-07-17:** The indefinite new-grammar freeze and replacement-only rule remain retired. Legacy Cantonese-language claims remain non-promotable until reconstructed from screened external evidence; future grammar must follow the authority-origin lifecycle. Parser `v0.5.174` is accepted after full rendered review; there is no active candidate.

Architecture records what the parser does and how it represents output. It does not independently validate Cantonese grammar. Research can record an architectural remediation candidate, but a language-driven runtime change requires the authority-origin lifecycle and a separate implementation batch.


## Package type

Canto Span is a standalone Obsidian plugin with no build step. Obsidian loads `main.js` directly through CommonJS.

```text
manifest.json
main.js
styles.css
data/slot-model.json
test-data/
tools/
validation/
docs/
```

Manifest boundary:

```text
id:               canto-span
version:          0.5.174
minimum Obsidian: 1.5.0
desktop-only:     false
```

## Runtime responsibilities

`main.js` contains plugin lifecycle, the `canto-span` Markdown processor, lexical/Jyutping registries, parser-shadow normalization, tokenization, construction generation, context and ambiguity resolution, learner rendering, diagnostics, dual JSON export, and settings.

`styles.css` controls learner roles, nested constructions, diagnostics, and accessibility markers. `data/slot-model.json` is the controlled slot/label registry.

## Processing pipeline

```text
1. raw note source
2. parser-shadow normalization
3. tokenization
4. lexical affordance generation
5. construction matching and wrapping
6. context and ambiguity resolution
7. contextual learner-role resolution
8. root-span and wrapper-coverage analysis
9. learner rendering
10. diagnostic rendering and export
```

## Core architectural rules

### Raw-first normalization

Learner-visible source is authoritative. Parser-shadow changes must be narrow, high-confidence, and traceable. Every repair is diagnosed; raw display replacement fails validation.

### Token/construction separation

Tokens retain visible roles and Jyutping. Parent constructions express phrase/clause structure without erasing child roles. Contextual overrides preserve lexical defaults and provenance.

### Broad constructions, internal subtypes

Public labels name stable learner-relevant structures. Fine distinctions belong in trace metadata or internal subtype fields unless they change span, attachment, scope, argument roles, context status, or learner interpretation.

### Transparency

Every overt token, particle, classifier, linker, separator, and content clause remains represented. Wrappers may organize overt material but may not hide holes or fabricate semantic tokens.

## Accepted construction systems

### Fragments and context

The parser distinguishes complete clauses, elliptical clauses, predicate-only units, fragment answers/questions, topics, particle/discourse units, `NeedsContext`, malformed candidates, and true failure. Missing relations are typed and context licensing is explicit.

### Topic chains and omitted objects

Within a punctuation-linked sequence, an overt topic or prior nominal domain may license multiple later object-selecting predicates only when semantic compatibility and parser-active valency support the relation. Diagnostics record chain ID, antecedent provenance, linked predicates, and unresolved predicates. Overt objects, motion predicates, full-stop boundaries, incompatibility, and unverified profiles block automatic linkage.

### Overt-object compatibility review

High-confidence literal predicate–object incompatibility produces a transparent `NeedsContext` decorator around the already-resolved grammatical root. It preserves question/clause/VP hierarchy, marks possible coercion as context-dependent, and never relabels the overt object or inserts a repair token.

### Topic and relational frames

`關於` and `對於` can provide overt topic-frame provenance. Bare `對` is accounted as a separate relational-coverb linker without automatically receiving the stronger topic-frame license. The linker, domain NP, separator, and following clause remain visible.

### Predicate omission and response matching

Data-driven omission profiles type modal, volitional, acceptability, desire, cognition, stance, belief, speech, and epistemic content. Compatible A-not-A questions can license positive/negative fragment answers. Incompatible or absent context remains review-bearing. Conventional cognition statements and bounded formulas are distinguished from incomplete selectors.

### Aspect, potential, particles, and formulas

The runtime distinguishes aspect/result/potential structures where accepted, including productive `V + 得 + result` and negative potential forms. Incomplete `V得` remains underdetermined. Bounded formulas, final discourse particles, restrictive focus, and ordered particle clusters preserve every visible host and particle with internal scope/provenance.

### W17 reviewed-data overlay

W17 lexical and corpus inventories remain review-only and separate from the frozen gold corpus. Lexical defaults, syntactic affordances, naturalness, and semantic disposition are separate data fields. No corpus row becomes accepted merely because it has a root or clean audits.

### Review-only readiness lifecycle

Review-only is an evidence state with an explicit exit path. Each independently promotable unit has a readiness-audit task, target, owner, trigger, score, and blocker. Promotion can mean an aggregate regression fixture, accepted lexical overlay, construction example, pronunciation reference, or preferred naturalized alternative; it never means automatic frozen-corpus acceptance.

## Diagnostics architecture

Each diagnostic includes raw/parser-shadow source, tokenization, full final tree, top/child constructions, learner roles, Jyutping, trace provenance, context fields, semantic-review flags, root-span status, wrapper coverage, and normalization/registry/UI audits.

The export layer writes a compact acceptance summary and a complete full-diagnostics companion with shared runtime, timestamp, export ID, note path, row order, and context links.

## Validation architecture

The distributable package contains:

- one current focused gate;
- one aggregate inherited-regression suite;
- eight durable audits/utilities.

Historical patch runners are retired after fixture absorption.

## Hierarchical clause-relation system

The accepted v0.5.159 runtime implements LANE-02 with a broad local `ClauseRelation` node beneath the outer discourse wrapper. Internal subtypes cover conditional, causal, concessive, sequential, temporal-subordinate, asyndetic, and relative-nominal relations. `ClauseRelationMember` children preserve each visible member, side-specific semantic role, and linker ownership.

Paired and optional linkers are represented once, shared subjects are recorded as provenance without token insertion, and relations can occur recursively as visible content under stance, cognition, belief, and reported-speech parents. `ClauseLinkingSequence` remains the outer root/discourse container where useful, but no longer substitutes for a typed local relation.

The candidate also guards immediate-temporal triggers, temporal nominal boundaries, relative-clause NPs, associative NPs, full-stop boundaries, and standalone linker fragments. Accepted topic-chain behavior remains a separate governed use of the outer wrapper.


## Compositional predicate and motion-event layer (accepted v0.5.160-r2)

The predicate layer now composes aspect, result, potential, path, deixis, and spatial roles before broad category wrapping. Result/phase predicates form below perfective aspect; potential markers own overt results; directional complexes preserve path and final deixis; and motion-event frames distinguish source, event location, path/orientation, goal, spatial attainment, main arrival, and nonspatial attainment.

`DirectedMannerMotionVP`, `GoalAttainmentMotionVP`, `MotionGoalVP`, `SourceMotionClause`, `MotionPurposeChain`, and `SerialVerbPurposeChain` preserve visible children and event order. Shared subjects are provenance, not inserted nodes. Context-local path readings do not become unrestricted lexical entries.


## Subject-status layer

Accepted v0.5.161-r1 adds explicit `subject_status`, `subjectless_type`, and `hidden_subject_inserted` provenance for genuinely impersonal environmental clauses. Location and temporal frames compose above the environmental predicate. This layer is distinct from `NeedsContext` omitted-subject analysis and inserts no hidden subject node.


## Restricted measure nominal-predication layer (accepted v0.5.163)

v0.5.163 adds a narrow generative route for supported copula-less age, price, area, and length predication. A visible subject combines with a transparent `MeasureExpression`; the parser records the domain, quantity, unit, optional dimension predicate, overt subject status, and licensed copula omission. It does not create a hidden copula or subject.

```text
佢十歲。          → NominalPredicateClause(age)
本書三十蚊。      → NominalPredicateClause(price)
間房三百呎。      → NominalPredicateClause(area)
張枱三尺長。      → NominalPredicateClause(length)
```

This is not a general NP+NP clause fallback. Bare measures, ordinary identity/classification, incomplete dimensional expressions, and semantically incompatible subject–measure pairings remain outside the construction.


## CP018 semantic-acceptance diagnostic gate

The gate is orthogonal to construction recognition. It recursively inspects final trees and root coverage, then exports `BLOCKED`, `REVIEW_REQUIRED`, or `MANUAL_REVIEW_ELIGIBLE`. It does not mutate the parse tree and never returns automatic grammar acceptance. This preserves regression signatures while preventing clean wrappers from being treated as semantic proof.
