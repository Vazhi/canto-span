---
title: UC-RQ-039 — jat1bin1 simultaneous-event correlative research
research_id: UC-RQ-039
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-039 — `jat1bin1 … jat1bin1 …` simultaneous-event correlative research

## Research decision

Promote paired `一邊 jat1bin1 … 一邊 jat1bin1 …` to a dedicated
simultaneous-event correlative research unit. The checked academic source calls it
a conjunction linking two actions, while the CUHK teaching record presents the
paired form with two concurrent activity predicates.

The safest representation is a relation over two overt event descriptions, not a
purpose serial chain. Same-subject examples can contain two predicate-like
members, but an exact checked example also gives each member its own overt
subject. The construction therefore cannot impose categorical subject sharing or
be restricted to VP coordination.

```text
(subject1) + jat1bin1 + event1, (subject2) + jat1bin1 + event2
    -> event1 and event2 overlap in time
```

This note does **not** authorize parser work, a fixed constituency analysis,
hidden subjects, productive acceptance, or status changes.

## Safest checked profiles

Exact checked profiles include:

- same subject before the first member: `我一邊晒住太陽，一邊睇女仔`;
- same subject with aspect inside the first member: `我一邊食住雪條，一邊寄信`;
- distinct overt subjects: `我一邊食(住)飯，你一邊等小明`;
- paired activity predicates in CUHK teaching examples: `一邊睇電視，一邊食飯`
  and `一邊食一邊傾`.

These establish paired marking, event overlap, and both subject-sharing profiles.
They do not determine whether the coordinated constituents have one invariant
syntactic category across all examples.

## Checked source findings

The source-verification ledger is:

`UC-RQ-039-JAT1BIN1-SIMULTANEOUS-EVENT-CORRELATIVE-SOURCE-VERIFICATION-R1.tsv`

Au Yeung's 2001 Linguistic Society of Hong Kong workshop abstract states that the
two actions can be connected with the conjunction `一邊…一邊…`. Its same-subject
examples combine a `住`-marked first activity with a second event. Crucially, its
explicit comparison says that the `住` complex sentence requires identical
subjects but the `一邊…一邊…` sentence can have `我` in the first member and `你`
in the second.

CUHK's Cantonese Express records `一便／邊／面` with readings
`jat1 bin6/bin1/min6` and gives exact paired activity examples. This corroborates
the learner-visible simultaneous profile, but its variant display does not prove
that all forms, tones, or registers are freely interchangeable.

Wong's 2023 GACS framework separately lists `一路…一路…` among temporal
conjunctions and gives `妹妹一路睇電視一路做功課`. That establishes a close
Cantonese sibling, not a lossless merger with `一邊…一邊…`.

## Exact collision audit

The collision ledger is:

`UC-RQ-039-JAT1BIN1-SIMULTANEOUS-EVENT-CORRELATIVE-COLLISION-AUDIT-R1.tsv`

### `SerialVerbPurposeChain`

The runtime construction encodes visible actions in an ordered action-purpose
relation. `一邊…一邊…` overtly pairs two overlapping event descriptions, permits
distinct subjects in a checked profile, and does not make the second event the
purpose of the first. Keep these structures separate.

### `ClauseRelationGraph`

The graph may carry two overt members, paired markers, and punctuation, but its
policy supplies no independent relation semantics. Simultaneity must come from
the paired construction, not the neutral wrapper.

### `住` background and `一路…一路…`

`住` can mark an ongoing background action, but the checked contrast imposes a
same-subject requirement on that complex-sentence profile which does not hold for
paired `一邊`. `一路…一路…` is a closer temporal-conjunction sibling; merger into
a broader simultaneous-correlative family remains possible but is not yet
lossless because comparative distribution and register evidence is absent.

## Quarantined boundaries

Future research must establish:

- the exact constituency of same-subject and different-subject members;
- event overlap requirements, duration, agentivity, stativity, achievements, and
  accidental versus intentional simultaneity;
- aspect, negation, modality, questions, imperatives, and sentence particles;
- omission of the first or second marker and bare `邊…邊…` profiles;
- distribution and register of `一便`, `一邊`, `一面`, their tone variants, and
  punctuation;
- comparative behavior of `一路…一路…`, `一頭…一頭…`, `V住…V`, and ordinary
  coordination;
- discourse order, scope, prosody, frequency, speaker, and regional variation.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is paired `一邊…一邊…` directly analyzed as linking simultaneous actions? | **Yes.** |
| Is strict subject sharing required? | **No; a different-subject profile is explicitly attested.** |
| Is it necessarily VP coordination? | **No; overt subjects in both members require at least a clause/event-level profile.** |
| Is it an action-purpose serial chain? | **No.** |
| Can it merge losslessly with `一路…一路…` now? | **Not yet; comparative distribution is quarantined.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-039 may leave active research only after constituency, event-type and
aspect compatibility, marker variants, omission, subject realization, and sibling
constructions support typed profiles, a lossless merger, continued quarantine, or
evidence-based retirement.
