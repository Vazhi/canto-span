---
title: PRQ2-013 — jyu5 kei4 bat1 jyu4 ordered-preference research
research_id: PRQ2-013
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# PRQ2-013 — `與其 … 不如 …` ordered preference

## Research decision

Promote Cantonese `與其 A，(倒)不如 B` to a dedicated **research-only ordered
preference family**:

```text
(SUBJECT) + 與其 + DISFAVORED-OPTION，
            (倒)不如 + PREFERRED-OPTION
```

The construction weighs alternatives, rejects or disfavors A, and presents B as
preferable. Checked sources attest different subjects, shared subjects,
repeated predicates, activity alternatives, and optional `倒`.

This family is distinct from lone suggestion `不如 B`, ordinary comparison
`A 不如 B`, `寧願 A 都唔 B`, and lexical/coordinating uses of `與`. The runtime
currently labels paired `不如` members—and even a comparison control—as
`Suggest`, making this boundary especially important.

The evidence does not settle omission of either marker, constituent symmetry,
strength of rejection, subject placement, negation, particles, prosody,
colloquial frequency, or equivalence with `倒不如` and other preference forms.

This note authorizes no parser change, construction-status change, lexical
installation, test promotion, or automatic acceptance rule.

## Sources

See
`PRQ2-013-JYU5KEI4-BAT1JYU4-ORDERED-PREFERENCE-SOURCE-VERIFICATION-R1.tsv`.

- Words.hk defines conjunction `與其` as marking the rejected option while
  weighing alternatives and states that it combines with `不如`.
- Jyut Dictionary supplies romanized Cantonese examples with `不如` and
  `倒不如`.
- Education Bureau course material explicitly drills the paired construction
  with activity, preparation, purchase, and inquiry alternatives.
- CantoDict separates suggestion and “not as good as” senses of unpaired
  `不如`.

## Runtime collision result

See
`PRQ2-013-JYU5KEI4-BAT1JYU4-ORDERED-PREFERENCE-COLLISION-AUDIT-R1.tsv`.

Runtime 0.5.213 has no ordered-preference analysis. Some paired surfaces receive
generic `ClauseLink`; each `不如` continuation may be labeled `Suggest`, while
the rejected option and preference ordering are lost. Lone suggestion and
ordinary comparison require separate analyses.

## Open boundaries

- VP, NP, property, and full-clause alternatives;
- shared versus different subjects and repeated predicates;
- optional `倒`, marker omission, negation, modality, and particles;
- strength of preference, rejection, advice, and counterfactual implication;
- contrast with suggestion `不如`, comparison `A 不如 B`, and `寧願`;
- prosody, colloquial frequency, register, and written variants.

## Disposition

**Dedicated research unit; implementation and status changes remain
unauthorized.**
