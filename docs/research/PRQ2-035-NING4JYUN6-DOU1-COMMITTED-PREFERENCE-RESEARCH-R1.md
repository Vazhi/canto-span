---
title: PRQ2-035 — ning4 jyun6 dou1 committed-preference research
research_id: PRQ2-035
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: true
status_change_authorized: false
---

# PRQ2-035 — `寧願 … 都 …` committed preference

## Research decision

Retain Cantonese `寧願 A，都 B` as a dedicated **research-only committed
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
negation.

The evidence does not settle marker omission, the full range of complements,
equivalence among `寧願`, `情願`, and `寧可`, the analysis of positive
continuations other than `都要`, or register and prosodic constraints.

## Existing implementation status

Implementation authorization granted on 2026-07-23 is limited to the overt,
comma-delimited rejection profile with `寧願 A` and
`都唔想／都唔肯／都唔好 B`. It does not authorize the positive `都要`
continuation, marker omission, lexical installation, a construction-status
change, or a broader automatic acceptance rule.

This package remains a Step 4 evidence-grade repair target. The current ledger
is still pre-grade and the implementation must not be treated as proof of the
linguistic analysis.

## Sources

See
`PRQ2-035-NING4JYUN6-DOU1-COMMITTED-PREFERENCE-SOURCE-VERIFICATION-R1.tsv`.

- Jyut Dictionary supplies romanized Cantonese rejection examples with
  `都唔想` and `都唔肯`, a positive `都要` commitment example, and lone
  `寧願` controls.
- Education Bureau drama material attests colloquial `寧願…都唔好…`.
- CantoneseClass101 attests `寧願…都唔想…` with a shared subject.
- CantoDict confirms pronunciation and the lexical “would rather” sense.
- HKCanCor supplies an independent lone-preference boundary.

These are currently attestation, lexical, and corpus sources rather than a
completed graded direct-analysis package. Promotion-style claims remain subject
to the evidence gate.

## Runtime collision result

See
`PRQ2-035-NING4JYUN6-DOU1-COMMITTED-PREFERENCE-COLLISION-AUDIT-R1.tsv`.

The companion audit is a frozen pre-implementation observation. Runtime
0.5.213 originally had no paired committed-preference analysis: one long surface
received generic `ClauseLink` and a truncated local `Preference`, while other
paired probes reduced to member-internal rows. The current narrow rejection
slice was added later.

Runtime observations carry zero linguistic-evidence weight.

## Open boundaries

- rejection versus accepted-cost/committed-goal interpretations;
- VP, NP, property, and full-clause complements;
- shared versus different subjects and subject placement;
- marker omission, particles, modality, and polarity;
- contrast with `與其…不如…`, lone `寧願`, `情願`, and `寧可`;
- prosody, colloquial frequency, register, and written variants.

## Disposition

**Dedicated research unit under corrected ID PRQ2-035. The narrow overt
rejection profile is implemented, while the positive continuation, broader
profiles, status changes, and any stronger evidence disposition remain
unauthorized pending graded evidence repair.**
