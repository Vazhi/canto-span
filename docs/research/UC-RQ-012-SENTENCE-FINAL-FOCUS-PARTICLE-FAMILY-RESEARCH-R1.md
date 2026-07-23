---
title: UC-RQ-012 — Sentence-final focus-particle family
research_id: UC-RQ-012
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-012 — Sentence-final focus-particle family

## Research decision

A dedicated research unit is justified, with at least two semantic subtypes. Law
2004 analyzes sentence-final `zaa3` “only” as a restrictive focus operator and
`tim1` “also” as an additive focus operator. The two share a proposed syntactic
class and association with identificational focus, but their semantics and some
question-compatibility judgments differ.

Current `FocusParticleFrame` is only an internal wrapper for the narrow runtime
profile `得 + visible scalar/quantity host + 啫/咋`. That profile can remain a
possible restrictive subtype, but it cannot represent Law's clause-wide `zaa3`
scope, subject focus, additive `tim1`, or the reported interactions with questions,
topics, quantifiers, adverbial counterparts, and particle clusters.

This note does **not** authorize a `tim1` lexicon entry, broader `zaa3` matching,
new focus inference, parser behavior, grammar status changes, or productive
acceptance.

## Safest checked core

The official thesis directly supports this contrast:

```text
clause + zaa3
    -> restrictive focus: exclude relevant alternatives

clause + tim1
    -> additive focus: presuppose another relevant true alternative
```

Law argues that both particles:

- associate with identificational focus rather than merely marking new information;
- have clausal syntactic scope and can occur in root or embedded clauses;
- occupy a lower sentence-final-particle position than speech-act, modality, and
  epistemic particles, which therefore follow them in the proposed order;
- combine semantic focus with procedural constraints that yield scalar and
  nonscalar interpretations in context.

For `zaa3`, contextual support and contrastive stress can permit subject focus,
while a higher topic marked by `le1` falls outside its scope. Co-occurring
adverbial `zing6hai6` can narrow the effective focus domain. For `tim1`, the thesis
contrasts its sentence-additive use with adverbial `zung6`.

## Question and variation boundaries

The thesis judges ordinary `zaa3` incompatible with the tested wh and verbal
A-not-A questions and `tim1` as better, though still degraded in the tested A-not-A
case. Both become acceptable in the reported copular `hai6-m4-hai6` frame because
the focus particle is analyzed inside the complement rather than intervening in the
matrix question dependency.

Law explicitly reports divergent judgments for `tim1` particle ordering and right
dislocation and considers an alternative lower position for some speakers. These
facts are research boundaries, not safe categorical parser rules.

## Checked source findings

The source-verification ledger is:

`UC-RQ-012-SENTENCE-FINAL-FOCUS-PARTICLE-SOURCE-VERIFICATION-R1.tsv`

### Law 2004

The official UCL open-access dissertation verifies the restrictive/additive
contrast, proposed shared syntactic class, clause scope, focus association, topic
boundary, quantified-NP readings, question interactions, cluster ordering, and
speaker-variation warnings.

The thesis is primarily a formal analysis based on author and limited informant
judgments. It does not supply a representative speaker sample, corpus-frequency
study, acoustic experiment, or a modern dialect-stratified validation of every
example.

## Exact collision audit

The collision ledger is:

`UC-RQ-012-SENTENCE-FINAL-FOCUS-PARTICLE-COLLISION-AUDIT-R1.tsv`

### Current `FocusParticleFrame`

The runtime wrapper requires overt `得`, a visible scalar or quantity host, and
final `啫/咋`. Law's `zaa3` examples need not contain `得`, can focus a subject or
whole clause in context, and are explicitly contrasted with narrower VP adverbial
focus. `tim1` is not represented at all. The current wrapper is therefore a narrow
internal carrier, not a family-level merge target.

### Current `咋` lexicon and absent `添`

The lexical `咋` entry records restrictive/exhaustive limitation but cannot select
focus scope or question compatibility by itself. No `添 tim1` runtime entry was
found in the targeted audit. Lexical presence or absence does not authorize a
parser change.

### Current copular A-not-A question

The source-attested `你係唔係識講德文咋？` is compatible with Law's explicit
copular exception. It must not be generalized to ordinary verbal A-not-A + `zaa3`,
which the thesis marks unacceptable.

## Required boundaries

Future research must distinguish:

- restrictive `zaa3` from additive `tim1` semantics and presuppositions;
- sentence-final particles from adverbial `zing6hai6` and `zung6`;
- scalar from nonscalar contextual uses;
- whole-clause, subject, predicate, object, and subconstituent focus;
- higher topic material from material inside the particle's scope;
- wh, verbal A-not-A, copular `hai6-m4-hai6`, particle, and declarative clauses;
- root from embedded occurrences;
- cluster co-occurrence and order, including speaker variation;
- contrastive stress and right dislocation from particle-only marking;
- modern Hong Kong, Guangzhou, and other Yue judgments.

## Research tasks before any implementation proposal

1. Extract the thesis's positive, negative, and degraded examples into a structured
   scope/order/question ledger.
2. Recheck disputed `tim1` ordering, right-dislocation, wh, and A-not-A judgments
   with multiple modern speakers.
3. Build matched focus-alternative tasks for subject, object, VP, clause, and topic
   readings.
4. Compare bare `zaa3`, `得 … 咋`, `zing6hai6 … zaa3`, bare `tim1`, and
   `zung6 … tim1` without assuming identical scope.
5. Collect natural audio-backed examples and record stress, intonation, and cluster
   realization.
6. Separate formal semantic entailments/presuppositions from procedural and scalar
   pragmatic effects.
7. Audit runtime behavior only after subtype and speaker-variation boundaries are
   frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Are `zaa3` and `tim1` directly studied as sentence-final focus particles? | **Yes.** |
| Do they share the same meaning? | **No; restrictive versus additive.** |
| Can they have clausal scope in the checked analysis? | **Yes.** |
| Does current `FocusParticleFrame` cover the family? | **No; it covers a narrow restrictive surface only.** |
| Are all question and order judgments stable across speakers? | **No; quarantined.** |
| Is a dedicated family with separate subtypes justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-012 may leave active research only after one of these dispositions is justified:

- **typed focus-particle family:** restrictive/additive semantics, scope, question,
  cluster, prosodic, and speaker boundaries receive stable source-linked profiles;
- **compositional merge:** independently supported focus, alternative, particle,
  clause, and prosodic relations preserve every contrast without loss;
- **quarantine:** scope, question, ordering, speaker, or regional boundaries remain
  inadequate;
- **retire:** a complete collision audit proves existing constructions sufficient.

Until then, current grammar statuses and parser behavior remain unchanged.
