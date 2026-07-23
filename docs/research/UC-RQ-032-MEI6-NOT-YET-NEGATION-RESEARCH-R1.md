---
title: UC-RQ-032 — mei6 not-yet negation research
research_id: UC-RQ-032
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-032 — `mei6` not-yet negation research

## Research decision

Promote preverbal `未 mei6` to a dedicated temporal-aspectual negation research
unit. Xu directly identifies `未` as a specialized “not yet” negator in Hong
Kong and Guangzhou Cantonese and analyzes its interpretation relative to a
reference time. This contribution cannot be preserved by the current productive
`NegatedVP`, which specifically builds ordinary `唔 + VP`.

The existing `NegativeExperiential` can carry the attested `未 + V過` subtype,
and completion/result composition can carry `仲未 + V完`. Neither subtype alone
is the whole construction: `過` supplies experiential meaning and `完` supplies
the completion endpoint, while `未` supplies the shared not-yet temporal
negation. Final `未` questions are a different word-order and clause-type
profile.

This note does **not** authorize a parser label, productive acceptance, automatic
temporal inference, rejection rules, or status changes.

## Safest checked profiles

The directly checked evidence supports these typed compositions:

```text
mei6 + V-gwo3 (+ object)
    -> no relevant prior experience up to the reference time

zung6 + mei6 + V-jyun4 (+ object)
    -> the relevant completion endpoint has not been reached by the reference time

mei6 + predicate
    -> specialized not-yet negation whose event/state is evaluated relative to a reference time
```

The third line is a research-level semantic family, not a productive surface
template. Xu's abstract explicitly treats event/state predicates and says that
the full distribution depends on situation type, viewpoint aspect, and temporal
adverbials. Exact predicate licensing therefore remains quarantined.

## Checked source findings

The source-verification ledger is:

`UC-RQ-032-MEI6-NOT-YET-NEGATION-SOURCE-VERIFICATION-R1.tsv`

### Xu 2020

The HKUST research portal identifies Xu's work as a peer-reviewed conference
paper. The Linguistic Society of Hong Kong abstract book supplies the substantive
abstract. It calls `未` a specialized “not yet” negator and contrasts it with
`冇`. It also warns that future expectation alone does not predict their
distribution.

The abstract reports three important selection diagnostics. Simple `未` is
incompatible with habitual `開` in the tested example; a frequency-adverbial
example becomes acceptable only when the `未` phrase is embedded before another
event; and a broad past-time noun is degraded while a specific past reference
point licenses the reading. Xu proposes that the reference time is overtly
anchored or defaults to speech time and that the expected event/state boundary
follows that reference time.

These findings justify a temporal-aspectual research unit. Because only the
conference abstract was available, they do not justify an executable rejection
matrix or adoption of the proposed formal analysis as settled fact.

### Zheng, Zhang, and Gao 2021

The checked coursebook gives exact preverbal `我未去過美國` and
`我未見過王小姐`, directly supporting not-yet experiential statements. The
same source gives `今日嘅報紙我仲未睇完`, showing `未` with completion rather
than experiential `過`. It separately distinguishes ordinary `唔` negation.

### Lam 2018 and aspect references

Lam independently establishes a split Cantonese negation system in which
ordinary `唔` and aspect-sensitive/event `冇` are not interchangeable. Zhang and
the Matthews–Yip materials establish that final `V過…未` is an experiential
question strategy. Together these sources make the collision boundaries clear,
but they do not complete the lexical and aspectual distribution of preverbal
`未`.

## Exact collision audit

The collision ledger is:

`UC-RQ-032-MEI6-NOT-YET-NEGATION-COLLISION-AUDIT-R1.tsv`

### `NegativeExperiential`

Keep the current construction as a typed carrier, but split its semantics by
overt negator. `未 + V過` is not-yet experiential; `冇 + V過` is an
aspectual-negative experiential profile. The shared surface slot must not imply
interchangeability, and experiential meaning comes from overt `過`.

### `NegatedVP`

The productive runtime wrapper specifically recognizes `唔 + VP`. Merging `未`
there would erase reference-time semantics and the aspectual selection reported
by Xu. Ordinary `唔`, event/perfective `冇`, and not-yet `未` require distinct
typed licensing even when all occur before predicates.

### Completion and final-`未` questions

`仲未睇完` composes not-yet negation with an overt completion predicate; it does
not turn `未` into a completion marker. Conversely, final `V完/V咗/V過…未`
questions are postpredicate interrogative constructions. They cannot be merged
with preverbal negative statements merely because the same graph is present.

## Quarantined boundaries

Future research must establish:

- the full activity, accomplishment, achievement, semelfactive, and state matrix;
- which event boundary—onset, continuation, or endpoint—is interpreted after the
  reference time;
- exact compatibility with `過`, `完`, `晒`, `咗`, `緊`, `住`, `開`, and other
  aspect/result material;
- the role of `仲`, temporal adverbials, explicit past/future reference points,
  and discourse-supplied reference times;
- whether future expectation is asserted, presupposed, implicated, defeasible,
  or absent in each profile;
- frequency, habitual, iterative, generic, and subordinate-clause environments;
- the complete `未`/`冇`/`唔` distribution across events, states, perfective
  contexts, fragments, and ellipsis;
- negation scope, focus, questions, final particles, omitted arguments, register,
  speaker, and regional variation.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is preverbal `未` directly analyzed as specialized not-yet negation? | **Yes.** |
| Does it evaluate an event/state relative to a reference time? | **Yes, at research level.** |
| Is simple future expectation a sufficient lexical rule? | **No.** |
| Are `未V過` and `仲未V完` directly attested? | **Yes.** |
| Does `未` itself contribute experiential or completion meaning? | **No; overt `過` or `完` contributes that subtype.** |
| Can it merge into productive `唔 + VP`? | **No.** |
| Is final `未` in questions the same construction? | **No.** |
| Is the complete aspectual and three-negator matrix established? | **No; quarantined.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-032 may leave active research only after predicate class, aspect stacking,
reference-time, scope, discourse, and `未`/`冇`/`唔` contrast judgments support
typed constructions, lossless compositional mergers, continued quarantine, or
evidence-based retirement.
