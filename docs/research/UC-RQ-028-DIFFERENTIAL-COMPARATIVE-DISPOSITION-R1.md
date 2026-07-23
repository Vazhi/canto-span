---
title: UC-RQ-028 — differential comparative disposition
research_id: UC-RQ-028
status: resolved_mixed_disposition
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-028 — differential comparative disposition

## Research decision

Do **not** promote an independent differential-comparative construction. The
checked direct source treats the differential measure as an optional argument
inside the Cantonese `過 gwo3` surpass comparative already recorded under
UC-RQ-005. The abstract relation therefore merges into that research unit:

```text
comparee + scalar predicate + gwo3 + standard + optional differential measure
```

The differential states the degree gap; it does not introduce another comparee,
standard, or comparison relation. It must be compatible with the predicate's
scale.

The exact backlog surface `高過佢兩吋` and its variants remain **quarantined**.
The checked source says that Cantonese `gwo3` comparatives permit an optional
measure phrase and assumes right adjunction in the degree phrase, but it does not
give a numerical Cantonese paradigm establishing the position of `兩吋`, possible
alternative orders, or the licensed predicate/unit inventory.

This disposition does **not** authorize a parser change, a new measure subtype,
productive numerical acceptance, or changes to UC-RQ-005's status.

## Checked evidence

The source-verification ledger is:

`UC-RQ-028-DIFFERENTIAL-COMPARATIVE-SOURCE-VERIFICATION-R1.tsv`

### Lam 2014

The official ACL Anthology paper analyzes the Cantonese surpass comparative as a
degree structure containing a scalar predicate, comparison standard, and optional
measure phrase. It explicitly contrasts a scale-compatible differential such as
centimetres on a height scale with an incompatible pairing of centimetres and
weight. Its footnote says measure phrases adjoin on the right in the degree phrase.

The paper later gives a direct Cantonese bare-comparative paradigm:
`Mary gou1 (Peter) (jat1) di1`. It identifies `(一)啲` as the measure phrase and
requires it to follow the optional standard. This proves that comparison standard
and differential measure are distinct roles. It also directly supports a
post-standard differential in that bare profile.

However, the numerical illustration in the formal discussion is English, and no
checked Cantonese example establishes `高過佢兩吋` or another numerical
`gwo3 + standard + measure` string. The formal assumption is evidence for the
argument's place in the comparative analysis, not an implementation-ready surface
grammar.

### Yiu 2024

The official metadata and abstract classify comparative `gwo3` among five
polysemous functions. Abstract-level access supplies no numerical differential
example or placement diagnostic. It corroborates the comparative-marker boundary
only and cannot close the quarantined numerical questions.

## Exact collision audit

The collision ledger is:

`UC-RQ-028-DIFFERENTIAL-COMPARATIVE-COLLISION-AUDIT-R1.tsv`

### UC-RQ-005 `gwo3` surpass comparative

UC-RQ-005 already owns the comparee, scalar predicate, `gwo3`, and overt standard
relation. Its research note records Lam's statement that a differential measure is
optional. UC-RQ-028 therefore adds a typed optional argument and an evidence gap,
not a separate construction.

### `MeasureExpression`

The current runtime node is a non-licensing child span of a restricted copula-less
nominal predicate for age, price, area, or length. It packages a visible number and
unit, sometimes with a dimension predicate. It does not attach a degree difference
to a comparative predicate or preserve a comparison standard.

### `QuantityNP`

The current template is `quantity + visible noun head`. A differential number and
unit is not thereby a noun phrase serving as a comparee or standard. Surface
quantity recognition cannot replace the differential role.

### UC-RQ-026 `(一)啲`

Lam directly identifies `(一)啲` as a differential measure in a bare comparative,
and UC-RQ-026 records its property-comparison and adjustment profiles. That lexical
profile may realize a differential, but it does not establish numerical units or
the `gwo3` order in the backlog example.

## Quarantined boundaries

Direct Cantonese evidence is still required for:

- `predicate + gwo3 + standard + numerical measure` order;
- any `predicate + numerical measure + gwo3 + standard` or other variant;
- length, height, weight, age, time, price, quantity, and abstract-degree units;
- classifier, measure-word, and bare-unit requirements;
- the difference between a differential and an absolute measure predicate;
- which scalar predicates accept exact versus vague differentials;
- negation, questions, omitted standards, particles, and information structure;
- whether standard weight or complexity changes differential placement;
- modern Hong Kong usage and speaker/register variation.

The string `高過佢兩吋` remains a research prompt, not a verified example in this
ledger.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is an optional differential part of the Cantonese surpass-comparative analysis? | **Yes.** |
| Is the differential distinct from the comparison standard? | **Yes.** |
| Must the unit match the predicate scale? | **Yes, in the checked analysis.** |
| Does this justify a separate comparison construction? | **No; merge into UC-RQ-005.** |
| Do current `MeasureExpression` or `QuantityNP` preserve the differential role? | **No.** |
| Is the exact numerical `高過佢兩吋` order directly verified? | **No; quarantined.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-028 is resolved as an independent backlog candidate. Numerical order,
predicate/unit selection, and clause-level diagnostics remain research tasks under
UC-RQ-005 rather than grounds for another construction family.
