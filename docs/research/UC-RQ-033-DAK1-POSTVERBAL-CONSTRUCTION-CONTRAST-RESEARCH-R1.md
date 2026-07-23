---
title: UC-RQ-033 — dak1 postverbal construction contrast research
research_id: UC-RQ-033
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-033 — `dak1` postverbal construction contrast research

## Research decision

Promote a dedicated typed contrast research unit for postverbal `得 dak1`.
Direct studies distinguish at least these structurally conditioned profiles:

1. result potential `V-得-R`, where `R` is an overt attainable result;
2. directional potential `V-得-direction(-deixis)`;
3. matrix permission/ability `V-得` with a following argument or no result;
4. descriptive `V-得-DegreeP`, where `得` introduces a manner/degree predicate;
5. restrictive-focus `V-得-cardinal NP` in Tang's analysis.

The first two profiles already have typed potential nodes. The descriptive
profile must not merge into those nodes or into the current `DegreeMannerAdverbial`,
which represents `X + 啲` and contains no `得`. The broad `VerbComplementVP` can
carry some surface material but is an implementation umbrella, not a lossless
linguistic merger.

This note does **not** authorize a parser label, lexical expansion, automatic
disambiguation, productive acceptance, or status changes.

## Safest checked diagnostics

The direct evidence supports the following research diagnostics:

```text
V + dak1 + overt result/directional constituent
    -> positive result potential

V + m4 + overt result/directional constituent
    -> negative result potential; m4 replaces positive dak1

V + dak1 + degree-bounded adjective phrase
    -> descriptive manner/degree predicate

V + dak1 + bare adjective
    -> modal or descriptive reading may remain context-dependent

V + dak1 + indefinite cardinal nominal
    -> restrictive-focus profile in Tang's analysis
```

These are typed evidence profiles, not a complete deterministic decision tree.
In particular, surface adjacency to `得` is never sufficient by itself.

## Checked source findings

The source-verification ledger is:

`UC-RQ-033-DAK1-POSTVERBAL-CONSTRUCTION-CONTRAST-SOURCE-VERIFICATION-R1.tsv`

### Cheng and Sybesma 2004

Cheng and Sybesma distinguish matrix postverbal modal `得` from lower `得` in a
result-denoting structure. Their positive potential examples include `攞得起`
and `行得入去`. The result or directional continuation is overt and semantically
material; bare `V得` must not be assigned an unspoken result.

For result potential, the negative counterpart replaces `得` with postverbal
`唔`, giving `攞唔起` and `行唔入去`. Permission/ability negation instead has
preverbal `唔` before the `V得` predicate. This polarity contrast independently
distinguishes result potential from ordinary negation and matrix modal `得`.

The paper also identifies `行得好快` as a separate descriptive construction.
Its formal account is theory-specific, but the overt examples and contrast
support separate research types.

### Tang 2002

Tang's author-hosted published article directly contrasts `佢行得好快`
(descriptive), `佢食得龍蝦` (modal “can”), and `佢睇得三本書`
(restrictive “only”). It states that descriptive `得` introduces a descriptive
phrase, while focus `得` has scope over following cardinal nominal material.

Tang further reports a useful ambiguity diagnostic. Bare-adjective `佢行得快`
has a salient modal reading but can receive a descriptive reading in context.
With overt degree word `好`, `佢行得好快` is descriptive and not modal in the
reported judgments. A definite cardinal nominal can likewise create a
focus/permission ambiguity, while an indefinite cardinal nominal selects focus
in Tang's analysis.

This directly answers the backlog question: the same `V得X` surface can be
ambiguous, but overt complement type and degree/cardinality structure constrain
the available readings.

## Exact collision audit

The collision ledger is:

`UC-RQ-033-DAK1-POSTVERBAL-CONSTRUCTION-CONTRAST-COLLISION-AUDIT-R1.tsv`

### Potential nodes

Retain `PotentialResultVP` and `PotentialDirectionalVP` as typed carriers for
overt result potential. Their negative counterparts preserve the equally
important `V-唔-R` morphology. The current result-head, verb, direction, deixis,
and object inventories remain narrower research questions and are not promoted
to free productivity.

### Descriptive degree/manner

`DegreeMannerAdverbial` currently builds `X + 啲`, as in `快啲` or `大聲啲`.
It may represent a degree/manner component, but it cannot by itself represent
the `V + 得 + DegreeP` linker construction. A future descriptive node could
reuse independently parsed degree material while keeping `得` overt.

`VerbComplementVP` is a broad runtime wrapper spanning degree/manner,
directional, restorative, and other profiles. It is therefore only a temporary
surface carrier and must not be treated as the semantic merger target.

### Modal, focus, and lexical boundaries

Postverbal modal `得`, standalone acceptability/possibility responses, `都得`,
restrictive-focus `得`, and lexical verb `得` “acquire/get” require distinct
structures. Their shared graph and pronunciation do not authorize one generic
`dak1` rule.

## Quarantined boundaries

Future research must establish:

- the complete verb and result-head inventory for `V得R` and `V唔R`;
- which direction/deixis combinations are licensed and where objects occur;
- which adjectives and degree phrases license descriptive `得`;
- optionality or omission of `得` with `快`, `慢`, and other manner predicates;
- diagnostics for bare-adjective modal/descriptive ambiguity;
- definite, indefinite, cardinal, measure, duration, frequency, and ordinary NP
  complements after `得`;
- permission, acquired ability, circumstantial possibility, result potential,
  descriptive, and restrictive-focus readings;
- negation, aspect, verb copying, questions, final particles, information
  structure, prosody, and discourse context;
- speaker, register, corpus frequency, and regional variation;
- whether Tang's focus analysis and exact judgment pattern generalize to the
  contemporary target variety.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is positive result potential directly attested as overt `V得R`? | **Yes.** |
| Does negative result potential use `V唔R` rather than ordinary preverbal negation? | **Yes.** |
| Is descriptive `V得DegreeP` a separate construction? | **Yes.** |
| Does current `DegreeMannerAdverbial` preserve that construction? | **No; it contains no `得`.** |
| Can `V得Adj` be ambiguous? | **Yes, in Tang's reported bare-adjective profile.** |
| Does overt degree bounding constrain the descriptive reading? | **Yes, in the checked judgments.** |
| Are modal and focus `得` additional collision boundaries? | **Yes.** |
| Is a single generic postverbal-`得` rule justified? | **No.** |
| Is the complete lexical and ambiguity matrix established? | **No; quarantined.** |
| Is a dedicated typed contrast research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-033 may leave active research only after result, direction, polarity,
degree, modal, focus, complement-selection, ambiguity, and discourse judgments
support typed constructions, lossless compositional mergers, continued
quarantine, or evidence-based retirement.
