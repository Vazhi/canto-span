---
title: UC-RQ-035 — jat1-zau6 immediate-anteriority research
research_id: UC-RQ-035
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-035 — `jat1 … zau6 …` immediate-anteriority research

## Research decision

Promote paired `一 jat1 … 就 zau6 …` to a dedicated immediate-anteriority
correlative research unit. Direct Cantonese scholarship describes a subordinate
clause marked by `一` “as soon as” and a main clause marked by `就` “then.”
Contemporary exact examples corroborate the order with arrival, birth, and overt
completion predicates.

This construction is not a generic conditional merely because conditional
consequents may also contain `就`. It is also not identical to ordinary
`V完…就…` narrative sequence: completion can occur inside the first member, but
the paired `一` supplies the immediate-anteriority relation.

This note does **not** authorize a parser label, automatic event typing,
productive acceptance, temporal inference, or status changes.

## Safest checked profile

```text
(subject1) + jat1 + event1, (subject2) + zau6 + event2
    -> event2 begins/holds immediately upon or after the relevant boundary of event1
```

Checked exact forms include:

- `佢一返嚟就鬧人` — event 2 follows the arrival;
- `佢一講完就走` — event 2 follows an overt completion boundary;
- `一出世就冇好事發生過` — the birth boundary anchors the following interval;
- project control `一見到佢，我就笑` — retained as internal evidence only.

The sources support a temporal dependency, not a universal lexical entailment of
causation. Subjects may appear on either side in the observed schema, but the
complete subject-sharing and switch-reference matrix remains open.

## Checked source findings

The source-verification ledger is:

`UC-RQ-035-JAT1-ZAU6-IMMEDIATE-ANTERIORITY-SOURCE-VERIFICATION-R1.tsv`

### Lui 2025

Lui's peer-reviewed article uses the `一…就…` construction as a Cantonese
subordination comparison. It explicitly says the subordinate clause is marked by
`一` “as soon as” and the main clause by `就` “then,” citing Lui's earlier work on
the construction. Its exact corpus example begins `一出世就…`.

Because the article's main topic is counterfactual regret rather than a complete
study of immediate anteriority, it supports construction identity and clause
roles but not a full aspectual or discourse grammar.

### Wong 2002

Wong's official repository full text independently lists simple adverb `一` with
the meaning “as soon as” and `就` with “very soon; then.” This corroborates the
overt marker meanings while preserving their other lexical functions.

### Words.hk

The public contemporary lexicographic records classify `一` as an “as soon as;
once” conjunction and `就` as a conjunction marking consecutive actions, usually
with `一`. Exact examples include `佢一返嚟就鬧人` and `佢一講完就走`.

## Exact collision audit

The collision ledger is:

`UC-RQ-035-JAT1-ZAU6-IMMEDIATE-ANTERIORITY-COLLISION-AUDIT-R1.tsv`

### `ConditionalClause`

Keep separate. Checked conditionals use markers such as `如果`, bare conditional
`嘅`, or `嘅話`; `就` can occur in their consequent. In the immediate-anteriority
correlative, `一` overtly marks a temporal subordinate event. Shared `就` does not
make the relations identical.

### `CompletionThenClause`

`佢一講完就走` shows that overt completion may supply the relevant boundary,
but `一…就…` also occurs without `完`. Conversely, sourced `佢講完我就話唔係噉`
is an ordinary completion-followed-by-response sequence with no `一`. Keep
completion composition and the paired temporal relation visible as separate
layers.

### `TemporalClause`

The current runtime label conflates simple time framing and overt temporal
subordination. It is too broad to serve as a semantic merger. A typed
clause-relation container may carry the two members only if it preserves both
markers and the immediate-anteriority subtype.

## Quarantined boundaries

Future research must establish:

- activity, accomplishment, achievement, state, change-state, and punctual-event
  selection in the first and second members;
- whether the relevant boundary is onset, culmination, completion, or contextual
  transition for each predicate class;
- compatibility with `咗`, `完`, `到`, `過`, `緊`, `住`, negation, modals, and
  quantification;
- episodic immediate succession versus habitual/generic “whenever” readings;
- temporal succession, causal inference, conditional inference, and discourse
  expectation;
- same-subject, different-subject, overt, and recovered-subject profiles;
- comma/prosody, marker omission, focus, questions, particles, and embedding;
- lexical `一`, numeral `一`, delimitative `V一V`, and noncorrelative uses of
  `就`;
- speaker, register, corpus frequency, and regional variation.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is paired `一…就…` directly described in Cantonese? | **Yes.** |
| Does `一` mark the subordinate event and `就` the following main event? | **Yes, in the checked analysis.** |
| Is immediate anteriority distinct from ordinary conditional marking? | **Yes.** |
| Can the first event contain overt `完`? | **Yes.** |
| Does every first event require overt completion? | **No.** |
| Is every first predicate proven telic? | **No; quarantined.** |
| Can current generic `TemporalClause` preserve the subtype? | **No.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-035 may leave active research only after event class, boundary, aspect,
habituality, subject, marker-omission, scope, and discourse judgments support
typed constructions, lossless compositional mergers, continued quarantine, or
evidence-based retirement.
