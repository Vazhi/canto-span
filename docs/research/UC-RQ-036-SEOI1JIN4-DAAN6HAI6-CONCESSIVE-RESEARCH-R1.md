---
title: UC-RQ-036 — seoi1jin4-daan6hai6 concessive research
research_id: UC-RQ-036
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-036 — `seoi1jin4 … daan6hai6 …` concessive research

## Research decision

Promote paired `雖然 seoi1jin4 … 但係 daan6hai6/不過 bat1gwo3 …` to a
dedicated concessive clause-relation research unit. The checked sources directly
support a subordinate concession followed by a counterexpectation clause.

The paired form must remain distinct from an ordinary clause introduced only by
`但係` “but,” which can express simple contrast without an overt concessive
premise. Current evidence does not establish categorical optionality of either
member, so single-marker and zero-marker profiles remain quarantined.

This note does **not** authorize parser changes, hidden-marker insertion,
productive acceptance, automatic discourse inference, or status changes.

## Safest checked profile

```text
seoi1jin4 + clause1, daan6hai6/bat1gwo3 + clause2
    -> clause1 is conceded; clause2 holds contrary to an expectation associated with clause1
```

Exact checked examples include:

- `隻公仔雖然好靚，但係太貴喇`;
- `間睡房雖然細，但係啲設計都唔錯`;
- `雖然呢度嘈咗啲，不過近街市`.

These attest stative/evaluative clauses and two right-linker choices. They do not
establish the full predicate, aspect, polarity, order, or omission inventory.

## Checked source findings

The source-verification ledger is:

`UC-RQ-036-SEOI1JIN4-DAAN6HAI6-CONCESSIVE-SOURCE-VERIFICATION-R1.tsv`

### Wong 2023

Wong's full-text grammatical overview identifies paired conjunctions as a
Cantonese clause-linking strategy and gives exact `隻公仔雖然好靚，但係太貴喇`.
The two overt clauses express an expectation-defeating relation rather than a
condition-result dependency.

### Words.hk

The contemporary lexicographic entry defines `雖然` as introducing a situation
whose expected result fails and says it usually pairs with `但係` or `不過`.
Its exact examples attest both pairings. “Usually” supports a strong paired core,
not a categorical claim that a right marker is always obligatory or freely
omissible.

### Universal Dependencies Cantonese guidelines

The Cantonese annotation guidelines explicitly analyze paired `雖然…但係…`
with `雖然` as the subordinate-clause conjunction and `但係` as the main-clause
adverb. This supports asymmetric clause roles while remaining neutral among
competing formal syntactic theories.

## Exact collision audit

The collision ledger is:

`UC-RQ-036-SEOI1JIN4-DAAN6HAI6-CONCESSIVE-COLLISION-AUDIT-R1.tsv`

### Clause-relation heuristics

The runtime already has a `concessive` `ClauseRelationEdge` subtype and preserves
paired linkers. That internal carrier is structurally compatible with the checked
core. Its broader rule also assigns concessive status when only right-side
`但係/不過` is found; direct sources do not justify that generalization, because
those markers independently introduce ordinary contrast.

### Conditional nodes

`ConditionalClause` and `ConditionResult` relate an antecedent to a consequent.
The concessive pair instead asserts the second clause despite an expectation
associated with the first. Shared two-clause shape is not a merger criterion.

### Contrast

Single `但係` or `不過` can link contrasting propositions without overt
`雖然`. Such forms require a typed contrast analysis unless context independently
licenses a recovered concession; the parser must not fabricate `雖然`.

## Quarantined boundaries

Future research must establish:

- omission of `雖然`, `但係`, or `不過`, including discourse-recoverable members;
- whether `雖然` may stand without a right counterexpectation linker and under
  which prosodic/discourse conditions;
- paired `雖則`, `話雖如此`, `儘管`, and other lexical variants;
- clause order, postposition, interruption, embedding, and coordination;
- stative, eventive, aspectual, modal, negated, questioned, and imperative clauses;
- expected-result source, denial, correction, contrast, and scalar readings;
- subject sharing, topic continuity, particles, prosody, register, speaker, and
  regional variation;
- diagnostics separating concession from ordinary adversative contrast.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is paired `雖然…但係/不過…` directly attested? | **Yes.** |
| Does the first marker introduce the concession and the second the counterexpectation clause? | **Yes.** |
| Is the relation equivalent to condition-result? | **No.** |
| Is single `但係` necessarily concessive? | **No; it also marks ordinary contrast.** |
| Is either marker proven freely omissible? | **No; quarantined.** |
| Can an internal typed clause-relation node carry the paired form? | **Yes, if it preserves both clauses and markers.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-036 may leave active research only after marker omission, linker choice,
clause order, predicate, scope, contrast, prosody, and discourse judgments support
typed constructions, lossless compositional mergers, continued quarantine, or
evidence-based retirement.
