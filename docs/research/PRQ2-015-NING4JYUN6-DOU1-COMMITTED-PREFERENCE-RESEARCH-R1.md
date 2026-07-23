---
title: PRQ2-015 — ning4 jyun6 dou1 committed-preference research
research_id: PRQ2-015
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# PRQ2-015 — `寧願 … 都 …` committed preference

## Research decision

Promote Cantonese `寧願 A，都 B` to a dedicated **research-only committed
preference family** with two attested profiles:

```text
(SUBJECT) + 寧願 + CHOSEN-OPTION，
            都 + 唔想／唔肯／唔好 + REJECTED-OPTION

(SUBJECT) + 寧願 + ACCEPTED-COST，
            都要 + COMMITTED-GOAL
```

In the rejection profile, the speaker chooses A over an explicitly rejected B.
In the commitment profile, the speaker accepts cost A in order to pursue B.
Checked Cantonese sources attest both profiles, different negated predicates,
and an optional overt subject before `寧願`.

This family is distinct from lone lexical preference `寧願 A`, ordered
alternatives `與其 A，不如 B`, synonym `情願`, and ordinary `都` followed by
negation. Runtime 0.5.213 recognizes a local `Preference` only in one longer
probe and otherwise preserves at most member-internal analyses; it does not
represent the paired preference relation.

The evidence does not settle marker omission, the full range of complements,
equivalence among `寧願`, `情願`, and `寧可`, the analysis of positive
continuations other than `都要`, or register and prosodic constraints.

This note authorizes no parser change, construction-status change, lexical
installation, test promotion, or automatic acceptance rule.

## Sources

See
`PRQ2-015-NING4JYUN6-DOU1-COMMITTED-PREFERENCE-SOURCE-VERIFICATION-R1.tsv`.

- Jyut Dictionary supplies romanized Cantonese rejection examples with
  `都唔想` and `都唔肯`, a positive `都要` commitment example, and lone
  `寧願` controls.
- Education Bureau drama material attests colloquial `寧願…都唔好…`.
- CantoneseClass101 attests `寧願…都唔想…` with a shared subject.
- CantoDict confirms pronunciation and the lexical “would rather” sense.
- HKCanCor supplies an independent lone-preference boundary.

## Runtime collision result

See
`PRQ2-015-NING4JYUN6-DOU1-COMMITTED-PREFERENCE-COLLISION-AUDIT-R1.tsv`.

Runtime 0.5.213 has no paired committed-preference analysis. One long surface
receives generic `ClauseLink` and a truncated local `Preference`; the other
paired probes reduce to member-internal VP or modal rows or no construction
row. Empty-marker guards remain unrecognized, as desired.

## Open boundaries

- rejection versus accepted-cost/committed-goal interpretations;
- VP, NP, property, and full-clause complements;
- shared versus different subjects and subject placement;
- marker omission, particles, modality, and polarity;
- contrast with `與其…不如…`, lone `寧願`, `情願`, and `寧可`;
- prosody, colloquial frequency, register, and written variants.

## Disposition

**Dedicated research unit; implementation and status changes remain
unauthorized.**
