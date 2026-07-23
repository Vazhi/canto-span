---
title: UC-RQ-030 — saai3 totality quantification research
research_id: UC-RQ-030
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-030 — `saai3` totality quantification research

## Research decision

A dedicated research unit is justified for postverbal `晒 saai3`. Direct
experimental and descriptive sources analyze it as universal or totality
quantification over a definite nominal, not as ordinary completive aspect.

The safest checked structure is:

```text
NP1 + V-saai3 + NP2
    -> saai3 universally quantifies a licensed definite plural nominal
       associated with the event; the quantified nominal may be NP1 or NP2
```

With an incremental-theme object, exhausting every member or all of the theme can
make an event non-completion continuation contradictory. That entailment does not
erase the distinction between nominal totality and completive `完 jyun4`.

This note does **not** authorize a parser label, a scope-resolution algorithm,
productive lexical acceptance, hidden nominal recovery, or changes to the current
`CompletionVP` path.

## Safest checked profiles

The checked direct evidence supports:

- object totality: `Anna maai5 saai3 di1 daan6gou1` “Anna bought all the
  cakes”;
- subject totality: `di1 hok6saang1 maai5 saai3 daan6gou1` “all the students
  bought cakes”;
- whole-container/theme interpretation: `jam2 saai3 zi1 caang2zap1` “drink
  the whole bottle of orange juice”;
- object totality in a natural larger clause: `買晒嗰堆嘢`;
- subject/distributed-participant totality in `個個都走晒`.

The sources condition scope on nominal definiteness, plurality, position, and verb
semantics. Linear adjacency alone is not a sufficient scope rule.

## Checked source findings

The source-verification ledger is:

`UC-RQ-030-SAAI3-TOTALITY-QUANTIFICATION-SOURCE-VERIFICATION-R1.tsv`

### Lei and Lee 2017

The official BUCLD proceedings paper explicitly calls `saai3` a universal
quantifier affix. In `NP1 V-saai3 NP2`, it reports object scope when the object is
the relevant plural definite nominal and subject scope when the subject is. The
paper contrasts `saai3` with perfective `zo2`: `zo2` permits partial readings in
the tested profiles, while `saai3` requires definiteness and exhaustivity.

For reading and eating predicates with plural classifier objects, a continuation
stating that the action was not finished is rejected after `saai3`. This is an
interaction of quantification, nominal structure, and incremental-theme verb
semantics, not evidence that `saai3` and `jyun4` are interchangeable.

The experiments include 99 children and 105 adults across two tasks. Their main
result is that children distinguish `saai3` totality from `zo2` perfectivity from
age three, reinforcing a semantic split rather than one generic completion node.

### Lei and Lee 2019

The publisher abstract explicitly contrasts universal quantification marked by
`saai3` with completive aspect marked by `jyun4`. Its child and adult experiment
uses completion and non-completion readings and reports systematic distinction,
though children sometimes assign the incorrect aspectual reading to `saai3`.

### Matthews and Yip 2011

The official CUHK grammar companion places `晒` under “Quantifying particles” and
gives `如果個個都走晒，邊個理我呀？` “If everyone leaves, who will take care
of me?” This independently supports totality over the subject/distributed
participants rather than requiring an overt postverbal object.

### Chor 2018

Chor's research monograph directly contains `啲錢我用嚟買晒嗰堆嘢`, which
provides a modern object-totality occurrence inside a larger purposive clause. It
attests the form but does not by itself supply a full scope or negation analysis.

## Exact collision audit

The collision ledger is:

`UC-RQ-030-SAAI3-TOTALITY-QUANTIFICATION-COLLISION-AUDIT-R1.tsv`

### `CompletionVP`

The current runtime groups `完` and `晒` as completion markers and labels
objectless `V晒` “totality-completion.” This preserves the overt surface but loses
the decisive semantic distinction established by Lei and Lee. The existing node
may remain a frozen carrier, but it is not a lossless merger target.

### `ResultComplementVP`

A result complement predicates or encodes an overt resulting state. `晒` instead
quantifies a nominal associated with the event in the checked core. Exhaustion of
an incremental theme can entail a completed event without introducing an overt
result-state predicate.

### `QuantityNP`

The current node represents a visible quantity plus noun head. It can package part
of the quantified nominal, but it neither contributes postverbal totality nor
chooses subject versus object scope. NP structure is a component, not a merger.

## Quarantined boundaries

Future research must establish:

- precise subject-versus-object scope diagnostics when both nominals are plural;
- scope with mass, singular classifier, collective, distributive, and generic NPs;
- verbs without incremental themes and predicates lacking an overt object;
- whether objectless `V晒` requires a discourse-recoverable affected domain;
- `V唔晒` potential/inability, ordinary negation, and modal interactions;
- `未 V晒`, final-`未` questions, perfective stacking, and particle order;
- event plurality, participant plurality, scalar maximality, and intensifying uses;
- separable compounds and lexical selection;
- graph variants `晒/曬/嗮` and regional/register variation.

Lexical `曬` “sun/dry,” formulaic `唔該晒/多謝晒`, and any degree intensifier
use remain separate lexical or discourse profiles.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is postverbal `saai3` directly analyzed as universal/totality quantification? | **Yes.** |
| Can it quantify either subject or object? | **Yes, under reported nominal conditions.** |
| Can object totality entail event completion? | **Yes, with tested incremental-theme predicates.** |
| Is it equivalent to completive `jyun4` or perfective `zo2`? | **No.** |
| Does current `CompletionVP` preserve its scope relation? | **No.** |
| Is a full negation/objectless scope matrix established? | **No; quarantined.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-030 may leave active research only after nominal eligibility, scope choice,
verb/event interaction, objectless domains, negation, and aspect stacking support a
typed construction, lossless composition, continued quarantine, or
evidence-based retirement.
