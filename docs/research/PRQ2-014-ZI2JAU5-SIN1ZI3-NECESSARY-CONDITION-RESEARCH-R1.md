---
title: PRQ2-014 — zi2 jau5 sin1 zi3 necessary-condition research
research_id: PRQ2-014
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: true
status_change_authorized: false
---

# PRQ2-014 — `只有 … 先／先至 …` necessary condition

## Research decision

Promote Cantonese `只有 A，先／先至 B` to a dedicated **research-only marker
family within the necessary-condition domain**:

```text
(DOMAIN / SUBJECT) + 只有 + REQUIRED-ENTITY-OR-CONDITION，
                     (SUBJECT) + 先 / 先至 / 先可以 + RESULT
```

Checked lexicographic evidence supports two linked profiles:

- **participant/domain restriction**: only the identified entity or location
  satisfies the result;
- **propositional necessary condition**: B can hold only if A holds.

This family is the logical inverse of PRQ2-005 `只要 A，(就) B`. It shares
necessary-condition semantics with UC-RQ-038 but not the `除非` exception/default
profile. It is also distinct from temporal-sequential `先至`, bare conditional
`A 至 B`, existential/quantity `只有`, and written `才` without Cantonese
evidence.

The evidence does not settle marker omission, equivalence among `先`, `先至`,
and `至`, focus prosody, negation, constituent scope, or when participant
restriction should be represented separately from a clausal condition.

Implementation authorization granted on 2026-07-23 is limited to the overt
comma-delimited `只有 A，先／先至／先可以 B` core, internal
necessary-condition profile metadata, and temporal/empty-member guards. It
does not authorize a construction-status change, lexical merger of `只有`,
marker omission, bare condition-plus-`先至`, or a broader automatic
acceptance rule.

## Sources

See
`PRQ2-014-ZI2JAU5-SIN1ZI3-NECESSARY-CONDITION-SOURCE-VERIFICATION-R1.tsv`.

- Jyut Dictionary reproduces the Words.hk necessary-condition definition and
  exact `先`/`先至` examples, plus participant and locative restrictions.
- Words.hk separately defines conditional `至` as marking a result achievable
  only when the preceding condition is met.
- CantoDict identifies Cantonese `先至`, its shorter `先`/`至` variants, and
  temporal/conditional examples.
- Local HKCanCor extraction naturally attests condition-plus-`先至` without
  overt `只有`, which remains a boundary rather than automatic core expansion.

## Runtime collision result

See
`PRQ2-014-ZI2JAU5-SIN1ZI3-NECESSARY-CONDITION-COLLISION-AUDIT-R1.tsv`.

Runtime 0.5.213 has no dedicated necessary-condition analysis for this marker
family. Most sourced examples are unwrapped or retain only local nominal/modal
children. `只要`, `除非`, and temporal `先至` controls confirm that lexical
overlap or generic clause linking cannot identify the target relation.

The companion collision audit is a frozen pre-implementation observation.
The authorized first slice now records `necessary_condition` on overt paired
cores while retaining the underlying `conditional` relation type. It requires
adjacent `只`+`有` in the left member, `先` or `先至` in the right member, and
overt content on both sides; participant restrictions without punctuation,
bare conditions, short `至`, and temporal profiles remain deferred.

## Open boundaries

- participant/domain restriction versus propositional necessary condition;
- `先`, `先至`, `至`, `先可以`, and omission profiles;
- overt `只有` versus context-licensed bare condition-plus-`先至`;
- subject placement, focus, negation, modality, particles, and scope;
- contrast with `只要`, `除非`, temporal `先至`, and existential `只有`;
- prosody, ellipsis, register, and written `才`.

## Disposition

**Dedicated research unit; the narrow overt paired core is implemented, while
status changes and broader profiles remain unauthorized.**
