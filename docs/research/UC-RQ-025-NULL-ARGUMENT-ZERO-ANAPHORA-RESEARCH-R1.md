---
title: UC-RQ-025 — null arguments and zero anaphora
research_id: UC-RQ-025
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-025 — null arguments and zero anaphora

## Research decision

A dedicated research unit is justified for the directly documented Cantonese
null-NP/zero-anaphora family. The strongest checked core is a transitive predicate
with no overt object whose interpretation is supplied by discourse. Direct sources
also establish that the recovered object need not always be a definite individual:
existential, generic, and attributive readings are documented.

The wider label “topic-drop” is quarantined as an analysis. The checked sources use
null-topic, null-pronoun, argument-ellipsis, and NP-ellipsis analyses; none authorizes
the parser to invent a silent token or treat every omitted argument as one mechanism.

Response fragments, selected complement/domain omission, and licensed VP ellipsis
remain in their existing research families. This note does **not** authorize parser
behavior, hidden arguments, valency changes, or context-free acceptance.

## Safest checked core

The checked sources support:

- a transitive Cantonese predicate with an unpronounced, discourse-recoverable
  object, as in `我鍾意` after a question about a particular dress;
- a definite/specific interpretation referring to an overt discourse antecedent;
- non-specific existential, generic, and attributive object interpretations in
  anaphoric contexts;
- some omitted-pronoun subjects in discourse;
- restrictions on subject omission in a polarity-focus context;
- a strict distinction between null NP arguments and selectively licensed VP
  ellipsis;
- a strict distinction between full clauses with null arguments and short-answer
  fragments.

The sources do not establish that every verb may omit its object, that every missing
subject is topic-bound, or that NP, proposition, domain, and VP omission share one
construction.

## Checked source findings

The source-verification ledger is:

`UC-RQ-025-NULL-ARGUMENT-ZERO-ANAPHORA-SOURCE-VERIFICATION-R1.tsv`

### Yip and Matthews 2000

The official full-text article explicitly contrasts Cantonese, which permits
discourse-recoverable null objects, with English. It treats the adult Cantonese
property as the source of a bilingual transfer pattern. This supports the existence
of null objects, not unrestricted transitivity or the article's complete null-topic
derivation as parser ontology.

### Lee 2018

Lee gives the direct question-answer contrast `你鍾唔鍾意呢件衫呀？` —
`我鍾意呀`, where the dress is the understood object. The paper further documents
specific and non-specific object-drop readings, dividing the latter into
existential, generic, and attributive subtypes. Its novel Cantonese judgments were
checked with 20 Hong Kong-born speakers.

Lee argues for NP ellipsis with a null determiner. That derivation is theory-specific;
the referential contrasts are evidence, but an empty category must not become a
fabricated runtime token.

### Matthews and Yip 2011

The official grammar companion presents omitted pronouns and gives a subjectless
example interpreted with reference to the discourse situation. This establishes an
omitted-subject profile but not a complete person, clause-type, or antecedent matrix.

### Holmberg 2007

Holmberg's Cantonese contrast shows that being a null-subject language does not make
subject omission unrestricted. In the tested polarity-focus second conjunct, the
coreferential subject pronoun must be overt. The theory links this restriction to
ellipsis competition; the empirical restriction is the relevant boundary here.

### Lee and Pan 2024

The official WCCFL proceedings paper shows selective VP-ellipsis licensing in
Cantonese. `jau5/mou5/mei6` and some lexicalized aspectual expressions license
ellipsis, whereas progressive `hai2dou6`, aspectual `hoi1ci2/gai3zuk6`, and
`kip1zyu6` do not in the tested uses. A short predicate therefore cannot be assigned
generic VP ellipsis or null-object structure from surface length alone.

## Exact collision audit

The collision ledger is:

`UC-RQ-025-NULL-ARGUMENT-ZERO-ANAPHORA-COLLISION-AUDIT-R1.tsv`

### `ComplementEllipsisFragment`

The current constructor occurs only inside `OpinionStanceFrame`. It covers bare
`有/冇` as unresolved existential-domain omission and `係/唔係` (optionally with a
subject) as unresolved copular-complement omission. It does not cover an ordinary
transitive clause such as `我鍾意` with a discourse-supplied object.

Those selected complement/domain profiles remain under the existing label pending
their own direct contrasts; they are not a lossless merger target for null NP
arguments.

### `FragmentAnswer`

An answer fragment obtains its full proposition from the question or discourse and
may lack most of a clause. Null-object clauses retain an overt subject and predicate
with only an argument unpronounced, and object drop also occurs outside answer
turns. The two phenomena can co-occur but must remain distinguishable.

### `TopicComment`

The runtime label is an internal representation heuristic requiring overt topic and
comment material. A discourse antecedent may occur outside the parsed span, and the
current node does not independently license an omitted object. A topic-comment node
may carry a source-backed null-argument clause, but cannot replace its valency and
anaphora record.

### Lexical intransitivity

A one-predicate surface cannot decide whether the use is genuinely intransitive,
allows an optional object, or contains a discourse-recoverable null object. The
existing broad `IntransitiveVP` template is therefore not a semantic merger target.

## Required boundaries

Future research must distinguish:

- null subject, direct object, indirect object, oblique, proposition, domain, and VP;
- lexically intransitive, optional-object, and discourse-omission uses of each verb;
- definite/specific, existential, generic, attributive, and deictic interpretation;
- an antecedent in the same sentence, prior turn, broader discourse, or situation;
- argument omission from fragment answers and response particles;
- NP argument omission from VP ellipsis and nominal/head ellipsis;
- topic continuity from a particular null-topic syntactic analysis;
- discourse availability from ambiguity or preferred interpretation;
- polarity-focus, coordination, person, clause-type, register, and regional limits;
- learner-facing indication of understood material from insertion of an overt token.

## Provisional outcome

| Question | Current answer |
|---|---|
| Are discourse-recoverable Cantonese null objects directly documented? | **Yes.** |
| Can a null object have definite and non-specific readings? | **Yes.** |
| Are omitted subjects attested? | **Yes, with an incomplete distribution.** |
| Is subject omission unrestricted? | **No.** |
| Are null arguments equivalent to VP ellipsis or fragments? | **No.** |
| Is one unified “topic-drop” derivation established? | **No; quarantined.** |
| Can current collision labels preserve the full null-NP core? | **No.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-025 may leave active research only after lexeme/use valency, omitted-category,
antecedent, interpretation, clause-type, and competing-ellipsis boundaries support a
typed construction, lossless compositional merge, continued quarantine, or
evidence-based retirement.
