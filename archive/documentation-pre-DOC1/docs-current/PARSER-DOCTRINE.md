# Parser Doctrine

## Binding research-audit override

> **CP021B-IM1 state — 2026-07-18:** The indefinite new-grammar freeze and replacement-only rule remain retired. Parser `v0.5.174` remains accepted. The later v0.5.175 CP021B candidate received `REVISE` after frozen one-shot heldout evaluation and is not accepted.

The accepted parser doctrines below describe behavior and representation obligations. They are themselves audit targets wherever they imply a Cantonese language claim. Preserve behavior as a stability default, but do not infer linguistic legitimacy from these doctrines or from regression. Apply `AUTHORITY-ORIGIN-AND-CLAIM-PROVENANCE.md`; record legacy mismatches for quarantine or retirement, and require a separate evidence/implementation batch for any grammar change.

**Accepted parser behavior baseline:** `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`
**A1 closure baseline:** `v0.5.158-a1-final-live-families-broad-closure`
**Historical accepted-governance record:** `v0.5.165-native-speaker-naturalness-evidence-ingestion`
**Active candidate:** none (latest candidate v0.5.175 disposition: `REVISE`)
**Status:** active candidate is v0.5.179 over accepted v0.5.178; all 177 active labels are legitimacy- and provenance-inventoried; no language claim is currently `supported_productive`.


## 0. Legitimacy before completeness

A parse label is not proof of a Cantonese grammar category. The parser must expose the language claim, representation decision, and heuristic separately. Prefer unresolved output over an unsupported clean analysis. Regression stability and linguistic legitimacy are independent acceptance dimensions.

## 1. Product goal

Expose useful Cantonese structure for learners without flattening grammar, inventing hidden material, hiding child errors, or replacing learner input.

A successful parse is not merely a top-level label. It must have correct:

- token boundaries;
- construction boundaries;
- attachment and scope;
- learner roles;
- internal slots;
- context status;
- Jyutping;
- trace doctrine;
- root-span coverage.

## 2. Broad-label rule

Use the broadest real grammar category that remains effective. Specialize only when the distinction changes boundary, attachment, argument structure, scope, context licensing, or learner interpretation.

Preferred stable categories include:

```text
SubjectPredicateClause
TransitiveVP
VerbComplementVP
ModalVP
CoverbFrame
TopicCommentClause
OpinionStanceFrame
ReportedSpeech
ClauseLinkingSequence
QuantifiedTimeNP
QuantifiedClassifierNP
ApproximateQuantity
FormulaDiscourseUnit
NegatedExistentialFragment
FragmentQuestion
NeedsContext
MalformedCandidate
```

Do not create sentence-specific public labels.

## 3. Layer separation

Keep these independent:

### Learner roles

```text
who
doing
what
where
when
why
how
like
measure_word
particle
func
```

### Internal slots

Examples:

```text
subject
object
recipient
theme
classifier
quantity
modal
negator
predicate
reported_content
negative_response_domain
```

### Construction labels

Phrase/clause/formula/fragment structure.

### Trace detail

Semantic subtype, theory-dependent alternatives, rule provenance, and diagnostic explanations.

A classifier is learner-visible as `measure_word` but remains internal slot `classifier`.

### Learner-role maintenance

Learner-role adjustments are display/analysis corrections, not grammar evidence. Fold cosmetic changes into a substantive batch where practical. A role-only batch is justified when an actively misleading assignment creates material learner harm and cannot responsibly wait for an owning semantic batch.

A learner role is a broad pedagogical contribution, not a substitute for syntax, internal slots, trace provenance, or construction analysis. `neutral` is a conservative non-claim for unanalyzed material, not a claim that the token lacks meaning.

### Overt-object selection compatibility

A structurally complete VP may still require semantic review. When a predicate has a high-confidence selection profile and the overt nominal head has a known incompatible domain, preserve the VP and learner roles but block clean clause promotion under `NeedsContext`. Treat coerced or metonymic readings as context-dependent possibilities, not as hidden repairs or absolute prohibitions. Learner role and internal argument slot remain separate: a place nominal may remain learner-visible as `where` while occupying an internal object relation that is under semantic review.


### Hierarchical clause relations

When visible linker evidence, temporal morphology, or a licensed asyndetic pattern identifies a local relation, represent that relation with a typed local node rather than a flat sequence of siblings. The outer discourse wrapper may remain, but it cannot substitute for conditional, causal, concessive, sequential, temporal, or asyndetic hierarchy.

Each overt linker is owned once. Paired-linker status, semantic side roles, and shared-subject provenance are explicit. Shared-subject analysis never licenses a hidden subject token. Relations may recurse under cognition, stance, belief, and reported-content parents without escaping those content boundaries. Standalone linkers lacking a required side remain full-span and review-bearing.

## 4. Transparency

Parent constructions must not erase visible children. Every overt token, particle, classifier, separator, and linker must remain represented.

A full-span wrapper is not acceptable when:

- child roles are wrong;
- a token is hidden;
- an attachment is false;
- wrapper coverage has holes;
- the wrapper wins only because a shorter accepted prefix exists.

## 5. Context and fragments

Distinguish:

1. complete saturated construction;
2. conventional formula;
3. typed fragment;
4. valid structure with unresolved argument;
5. genuinely subjectless structure;
6. malformed input.

Context states:

```text
context_not_required
context_required
context_licensed
context_incompatible
```

Never fabricate a subject, object, nominal head, complement, location, content clause, or discourse antecedent.

A typed fragment can remain a specific construction while also requiring context. Do not replace every context-dependent form with generic `NeedsContext`.

## 6. Malformed boundary

Context must not rescue structurally malformed learner input.

Accepted malformed anchors include:

```text
我食一。
我有冇食飯。
```

Bare numerals must not be promoted to objects when classifier/head requirements are unmet.

## 7. Root-span honesty

Root-span status is independent from ordinary audit PASS:

```text
PASS
PARTIAL
NO_TOP_CONSTRUCTION
```

Punctuation and ordinary final particles may be ignored as harmless remainder when the construction doctrine allows it. Nonpunctuation material outside the top construction must be listed explicitly.

## 8. Contextual role provenance

When a construction activates a role different from the lexical default, diagnostics must preserve:

- lexical default;
- whether it was active before wrapping;
- final active role;
- override source;
- activating construction.

Example:

```text
度 in 七杯度
lexical default: func
final role:       how
source:           construction override
activated by:     ApproximateQuantity
```

## 9. Accepted semantic boundaries

### Approximate measured quantity

```text
七杯度
→ ApproximateQuantity
```

`七`, `杯`, and `度` remain separate. `度` is not locative in this construction. The trace must deny bare-classifier head ellipsis, fabricated nominal heads, and exact quantity.

### Quantified classifier NP

```text
兩部。
一個。
```

These preserve quantity and classifier, record a missing nominal head, and require compatible context rather than inventing a noun.

### Quantified time and conventional duration

Time heads outrank generic classifier phrases. Conventional `三個字` duration and literal character count share transparent material but differ through an explicit ambiguity boundary and contextual roles.

### `有冇` questions

NP complements are existential/possessive, dynamic VP complements are event-occurrence questions, and `V過` is experiential. Punctuation alone must not override complement structure.

### Negative existential responses

```text
冇呀。
冇，冇。
我都冇。
```

Use `NegatedExistentialFragment` with typed `negative_response_domain`. Compatible `有冇` context may license the relation. Action negation is not this construction.

### Fragment question

Bare `呢？` remains `FragmentQuestion` with typed missing topic/alternative and context-sensitive pronunciation.

### Opinion and reported content

`OpinionStanceFrame` keeps the proposition transparent. `ReportedSpeech` uses visible subject/speech-verb/content structure when recoverable. Do not invent reported content.

### Conditional marker

`嘅話` may be protected as a functional conditional marker when splitting it would mislead learners. Ordinary speech-verb `話` remains separate.

### Formula discourse units

Single accepted acknowledgement/permission formulae and the accepted bounded acknowledgement-repetition families may be `FormulaDiscourseUnit`. Formula recognition must remain constructionally bounded and must not become a license for arbitrary repeated words. Transparent formula wrappers preserve every overt child and derive their specific slots from those children; a formula without an overt particle must not advertise a `particle` slot merely because the broad construction category can sometimes contain one. Orthographic and particle variants should share one structural pattern when their observable grammar is the same.

### Topic-chain and predicate–object compatibility

An overt topic or prior nominal domain may license later omitted objects only through typed provenance, parser-active valency, and semantic compatibility. High-confidence overt predicate–object incompatibility is review-bearing but preserves the resolved clause/question/VP structure. No hidden repair token is inserted.

### Topic and relational frames

`關於` and `對於` may establish overt topic-frame provenance. Bare `對` is a distinct relational-coverb linker: it must be structurally accounted for but is not automatically granted the stronger topic-frame license. Standalone frames remain incomplete.

### Typed modal and content omission

Modal, volitional, acceptability, cognition, stance, belief, speech, and epistemic predicates use declared omission profiles. Compatible explicit context may license a typed fragment answer; incompatible or absent context remains review-bearing. Conventional `我知 / 我唔知 / 唔知呀` uses may be complete, while bare `我想 / 我覺得 / 我以為 / 佢話` preserve their profile-specific missing content or event/content ambiguity.

### Positive potential and incomplete `V得`

`V + 得 + overt result` may form productive `PotentialResultVP`. Bare or incomplete `V得` must not be treated as a complete potential construction. `得` as an acceptability response remains distinct from potential `得`; restrictive particles without a scalar host remain review-bearing and preserve the full span.

### Clause-relation hierarchy

`ClauseLinkingSequence` remains an outer discourse wrapper, not a substitute for local relation structure. The next architecture must add typed conditional, causal, concessive, sequential, temporal, asyndetic/shared-subject, and recursively embedded relation nodes while preserving every overt linker and clause.

## 10. Hover and Jyutping doctrine

Hover glosses must be plain, construction-appropriate English. Internal raw slots must not leak into learner-facing titles.

Jyutping is a separate quality lane. Audit PASS does not prove contextual reading is correct; context-sensitive readings must be re-resolved after construction wrapping.


## Predicate and motion composition doctrine

1. Compose visible predicate layers in semantic scope order before applying broad fallback wrappers.
2. Distinguish aspect, result, potential, ordinary negation, path, and deixis; do not collapse them into one opaque VP.
3. Assign spatial roles from both position and event semantics: preverbal source/location, postverbal goal, path/orientation, and attainment are not interchangeable.
4. Keep main-verb and complement uses of `到`, `返`, and directional heads distinct.
5. Record shared-subject relations as provenance without hidden subject tokens.
6. Strongly dispreferred or unresolved orders remain review-bearing; never silently reorder learner input.
7. Prefer context-local lexical interpretation when a global entry would regress unrelated accepted behavior.


## Environmental subjectlessness

Do not infer a null referential subject merely because a predicate lacks an overt NP. Conventional weather/environmental events may be genuinely subjectless. Conversely, a bare temperature or action predicate is not automatically impersonal. Require a licensed environmental event/transition or an overt ambient time/location frame.
