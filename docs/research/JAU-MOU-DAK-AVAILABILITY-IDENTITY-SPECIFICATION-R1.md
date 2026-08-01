# 有得／冇得 availability identity and parser specification R1

Date: 2026-08-01  
Parent issue: #406  
Work claim: #417  
Pull request: #420

## Decision

A **new language-construction UUID is required** for the recurring preverbal
availability/opportunity relation expressed by `有得／冇得 + predicate`.

The collision-checked candidate is reserved as:

| Field | Decision |
|---|---|
| Candidate UUID | `4e176fe2-a147-47c7-86c8-6778a379beb2` |
| Candidate state | `candidate` |
| Construction code | `null` until canonicalization |
| Canonical name at creation | `JauDakMouDakAvailabilityPredicate` |
| Claim layer | `language_construction` |
| Family | `AvailabilityAndOpportunityPredication` |
| Profile | `PreverbalJauDakOrMouDakWithPredicate` |
| Intended note path | `grammar/research_pending/JauDakMouDakAvailabilityPredicate.md` |

This package does **not** canonicalize the candidate. Canonicalization would require a
current grammar note, executable construction test, runtime label, and matcher, which are
explicitly outside this specification-only package. A later runtime package must create
those artifacts and invoke the allocation tool; the short code must be assigned
mechanically at that time and is not preclaimed here.

## Why existing identities are insufficient

### AA89 `ModalAuxiliaryComplementVP`

AA89 can remain a generic structural parent for an auxiliary followed by a visible
predicate. It cannot serve as the durable identity here because its accepted scope does not
preserve the lexeme-specific `有得／冇得` relation, the affirmative-negative paradigm,
the suppletive-polar profile, or the lexicalized `冇得 X` boundaries. Generic structural
overlap does not transfer identity or evidence.

### AA01 `M4MarkedANotAInterrogative`

AA01 requires overt lexical `V-唔-V` and explicitly excludes suppletive `有冇`. The
five `有冇得` corpus questions therefore cannot inherit AA01's UUID or evidence.

### AA55 and AA57

AA55 represents overt-subject possession or nominal availability with lexical `有 + NP`.
AA57 is a broad unsupported `ExistentialQuestion` identity. Neither represents the
affirmative and negative predicate-selecting relation, and AA57 cannot account for the
declarative profiles.

### AB32 `PotentialResultVP`

Postverbal result potential has a different overt order and dependency. `冇得去` must not
be derived from, rewritten as, or assigned the identity of `去唔到` or another
verb-result potential form.

### Why a lexical entry alone is insufficient

The strongest source treats `有得` and `冇得` as units, but the evidence supports more
than a dictionary gloss: an overt head selects a predicate, carries polarity, embeds under
other material, interacts with objects and complements, participates in suppletive-polar
questions, and has bounded ellipsis and lexicalization behavior. This recurrent
form-meaning relation warrants its own candidate identity.

## Evidence endpoint

The accepted evidence is already terminal for identity specification:

- a verified primary source directly analyzes affirmative `有得` and negative `冇得` as
  preverbal units expressing possibility versus unavailability or impossibility of the
  following event;
- the exhaustive HKCanCor inventory contains 95 spans in 89 utterances across 38 files;
- complete review found 63 transparent compositional rows: 31 affirmative and 32 negative;
- five `有冇得` questions include matrix, quoted, embedded, and location-bearing uses;
- two rows support narrowly recoverable omission, not a general zero-predicate rule;
- fifteen lexicalized or idiomatic rows, seven ambiguous boundaries, and three repairs
  define explicit noncore material;
- confidence totals are 78 high, 16 medium, and one low.

Corpus attestation establishes recurrence and distribution in context. It does not by
itself establish unrestricted predicate productivity or satisfy later panel and held-out
gates.

## Surface profiles

### Affirmative

```text
有得 + overt predicate
```

The relation says that circumstances, access, entitlement, qualification, or practical
conditions make the predicate event available or possible.

### Negative

```text
冇得 + overt predicate
```

The relation says that circumstances, access, entitlement, qualification, or practical
conditions make the predicate event unavailable or impossible.

The transparent positive and negative cores belong to one identity. The greater number of
lexicalized negative expressions does not justify splitting the core polarity paradigm.

### Suppletive-polar question

```text
有 + 冇得 + overt predicate
有冇得 + overt predicate
```

This asks which availability alternative holds. It uses the same candidate identity plus
separately represented suppletive question force. It does **not** require a second language
UUID.

The parser must preserve the overt sequence and may record semantic alternatives, but it
must not fabricate a repeated `得`, hidden `唔`, or ordinary lexical-verb copying.

## Composition contract

The language node is `JauDakMouDakAvailabilityPredicate` with at least these features:

```text
polarity = affirmative | negative | interrogative
head_surface = 有得 | 有+得 | 冇得 | 冇+得 | 有+冇得
question_strategy = none | suppletive_jau_mou
```

A polar profile represents two availability alternatives and question force while retaining
the same identity. An implementation may use a same-span question wrapper, typed metadata,
or another transparent composition, but it must expose both the availability relation and
the question relation independently.

Generic `ModalAuxiliaryComplementVP`, clause, quotation, or question parents may coexist
as parser structure. They must not replace the candidate UUID or donate linguistic evidence.

## Predicate contract

The context-free core requires an overt predicate. Reviewed transparent examples support:

- simple verbal predicates;
- predicates with overt objects or complements;
- motion and larger VP material;
- an intervening adverb plus predicate;
- adjectival or property predicates where lexical category is independently recoverable;
- code-switched predicates where the category and relation are clear.

The specification does not authorize a rule that consumes the arbitrary remainder of the
clause. Predicate boundaries must come from independently typed child structure.

Material that can precede the core includes:

- overt subject or experiencer;
- topic;
- location;
- temporal or conditional frame;
- focus or restriction such as `先／先至`;
- higher modal or epistemic material;
- quotation or embedding predicate.

Such material scopes over or contextualizes the availability relation and normally remains
outside its narrow span.

## Span contract

### Start

The first overt token of the availability head sequence.

### End

The end of the maximal independently licensed predicate phrase.

### Included

- the overt availability head sequence;
- the predicate;
- overt objects, complements, adverbs, motion material, and other children belonging to
  that predicate phrase.

### Excluded

- premarker subject, topic, location, temporal frame, condition, focus, or higher modal;
- quotation frame or embedding predicate;
- clause-final particles, unless a separate question or particle wrapper spans them.

### Tokenization

Identity cannot depend on corpus whitespace or single-token annotation. The core may be
written or tokenized as fused `有得／冇得` or split `有 + 得／冇 + 得` when the overt
structural relation is otherwise satisfied. Conversely, a fused token such as `冇得頂`
does not become productive availability merely because its initial characters match.

## Ellipsis and context

The context-free identity does not license a zero predicate.

The packet contains one clear topic-supported affirmative example, `BBQ呢又有得`, and
one incomplete negative form immediately paraphrased with `唔可以`. These support a
separate context-linked fragment or ellipsis analysis only when the omitted event is
uniquely recoverable from adjacent discourse.

A later implementation should route such rows through context diagnostics, potentially in
coordination with issue #393. It must not create an unrestricted `有得／冇得 + Ø`
construction or silently fabricate the predicate.

## Lexical and discourse quarantine

The productive detector must not accept every graph sequence beginning with `冇得`.
Quarantine includes:

- fused evaluative `冇得頂`;
- formulaic or evaluative `冇得講`;
- conventionalized `冇得計`;
- conventionalized `冇得搞`;
- conventionalized `有得諗`;
- repair or interrupted `冇得-` starts;
- nominal, code-switched, or category-ambiguous complements until independently resolved.

Some quarantined forms may receive lexical or discourse identities later. Their historical
or semantic relation to possibility is insufficient for automatic inheritance.

## Required boundary matrix

### Positive core cells

- affirmative `有得 + simple predicate`;
- negative `冇得 + simple predicate`;
- object-bearing and complement-bearing predicates;
- motion or complex VP predicates;
- adverb-intervening predicates;
- higher modal, condition, focus, location, quotation, and embedding hosts;
- suppletive-polar matrix and embedded questions;
- fused and split head tokenization.

### Negative or quarantined cells

- AA55 possession or nominal availability: subject + `有 + NP`;
- AA77 place existence: place + `有／冇 + NP`;
- AA57 or question fallback with nominal `有冇 + NP`;
- ordinary event-occurrence `有冇 + VP` without `得`;
- lexical `V-唔-V` AA01 questions;
- postverbal potential such as `V到／V唔到`;
- bare predicate-less availability without a recoverable antecedent;
- fused `冇得頂` and formulaic `冇得講`;
- interrupted repairs and unresolved lexical-category cases.

## Runtime ordering for the later package

A future implementation should:

1. classify fused lexical quarantine before productive availability matching;
2. recognize `有得／冇得` and valid split tokenization before broad existential,
   generic modal, or fragment fallbacks can erase the relation;
3. recognize `有 + 冇得` as a suppletive-polar profile of the same identity, not AA01;
4. build the predicate from already typed child structure rather than a rest-of-clause
   wildcard;
5. preserve outer subjects, locations, conditions, higher modals, quotations, embedding,
   and particles as separate structure;
6. permit generic modal or question parents only as transparent additional structure;
7. emit context-required diagnostics rather than a context-free construction for licensed
   ellipsis candidates.

These are implementation requirements, not an authorization to edit runtime source in this
package.

## Canonicalization plan

The later runtime package must perform one atomic sequence:

1. create `grammar/research_pending/JauDakMouDakAvailabilityPredicate.md` with the accepted
   evidence and boundaries;
2. create `tests/constructions/JauDakMouDakAvailabilityPredicate.json` with positive and
   negative boundary cases;
3. add the runtime label and source-first matcher;
4. canonicalize candidate UUID `4e176fe2-a147-47c7-86c8-6778a379beb2` through
   `tools/allocate-construction-identity.js`;
5. let the allocator assign the next unused short code mechanically;
6. regenerate identity, lock, status, test-index, discovery, and deployment outputs;
7. stop for review before merge.

No short code is reserved by this specification.

## Later evidence gates

### Role-neutral panel

Test:

- `有得／冇得` against `可以／唔可以` and postverbal potential;
- affirmative, negative, and suppletive-polar profiles;
- verbal, adjectival, motion, object-bearing, and complex predicates;
- context-free core against recoverable ellipsis;
- transparent predicates against lexicalized `冇得 X` controls.

### Held-out validation

Use cases not employed to design the matcher, including:

- unseen predicate classes and host orders;
- fused and split tokenization;
- embedded and quoted questions;
- lexicalized negative and discourse formulas;
- collisions with nominal `有／冇`, existential questions, ordinary event-occurrence
  `有冇 + VP`, and postverbal potential.

## Protected state and stop rule

This package changes only the candidate identity ledger, the machine-readable decision,
the specification, and current identity documentation. It changes no permanent registry
record, short code, runtime behavior, executable fixture, linguistic-status placement,
corpus classification, survey or panel state, held-out state, runtime version, release,
deployment, or merge authority.

The package is complete when:

- the candidate UUID is collision-checked and reserved;
- the new-identity decision is explicit;
- affirmative, negative, and suppletive-polar composition is specified;
- span, predicate, ellipsis, lexical, and collision boundaries are terminal;
- the later canonicalization, panel, and held-out gates are explicit;
- all repository verification passes;
- the temporary snapshot exporter is absent from the final diff.
