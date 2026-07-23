---
title: PRQ2-008 — zi2 jiu3 zau6 sufficient-condition research
research_id: PRQ2-008
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# PRQ2-008 — `只要 … (就) …` sufficient condition

## Research decision

Promote Cantonese `只要 A，(就) B` to a dedicated **research-only
sufficient-condition family**:

```text
只要 + SUFFICIENT-CONDITION，
(SUBJECT / CONTEXT) + (就) + CONSEQUENCE
```

The first member presents a condition sufficient for the consequence. Checked
teaching material and natural HKCanCor evidence attest overt and omitted `就`,
different subjects, modal and negative consequences, indeterminate-plus-`都`,
and a discourse-spanning continuation.

This family is distinct from hypothetical `如果 A，就 B`, necessary-condition
`只有 A，先至 B`, UC-RQ-038 `除非`, UC-RQ-020 free-choice `wh…都`, and lexical
`只` plus modal `要`. A bare `只要 A` may be discourse-complete or incomplete;
it must not automatically invent a missing consequence.

The evidence does not settle whether every consequence marker is optional,
inferences under negation, clause order, ellipsis, prosody, register, or all
constituent and speech-act types.

This note authorizes no parser change, construction-status change, lexical
installation, test promotion, or automatic acceptance rule.

## Sources

See
`PRQ2-008-ZI2JIU3-ZAU6-SUFFICIENT-CONDITION-SOURCE-VERIFICATION-R1.tsv`.

- Hong Kong Vision teaches the condition/consequence division, several
  continuation profiles, and omission of `就`.
- An Education Bureau-hosted Cantonese drama script uses the full paired form.
- Local HKCanCor extraction supplies overt, omitted, fragmentary, and
  discourse-spanning profiles.
- YellowBridge independently records conjunction `只要` as `zi2 jiu3`.

## Runtime collision result

See
`PRQ2-008-ZI2JIU3-ZAU6-SUFFICIENT-CONDITION-COLLISION-AUDIT-R1.tsv`.

Runtime 0.5.213 has no dedicated sufficient-condition analysis. Some paired
examples receive generic `ClauseRel`; omitted-`就` and corpus examples may be
partially analyzed or unwrapped. The same generic relation covers an `如果`
control, while necessary and exception controls are also untyped.

## Open boundaries

- overt and omitted `就` and alternative consequence markers;
- indeterminate-plus-`都` and free-choice interaction;
- subject placement, negation, modality, particles, and speech act;
- discourse-spanning and fragmentary profiles;
- contrast with `如果`, `只有…先至`, `除非`, and scalar `淨係`;
- clause order, ellipsis, prosody, and register.

## Disposition

**Dedicated research unit; implementation and status changes remain
unauthorized.**
