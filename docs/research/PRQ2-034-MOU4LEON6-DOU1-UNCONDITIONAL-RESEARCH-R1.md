---
title: PRQ2-034 — mou4 leon6 dou1 unconditional research
research_id: PRQ2-034
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# PRQ2-034 — `無論 … 都 …` unconditional invariance

## Research decision

Promote Cantonese `無論 A，B 都 C` to a dedicated **research-only
unconditional family**:

```text
(SUBJECT) + 無論 + ALTERNATIVE-DOMAIN，
(SUBJECT / CONTEXT) + 都 + INVARIANT-CONSEQUENCE
```

Checked sources attest domains expressed by wh-indeterminates, degree phrases,
A-not-A predicates, and explicit `定係` alternatives. The `都` consequence holds
across the alternatives introduced by `無論`.

UC-RQ-020 may analyze a wh-plus-`都` member, but does not supply the higher
`無論` relation. This family is also distinct from UC-RQ-037 `就算…都` scalar
concession, ordinary universal `都`, informal `唔理…都`, lexical `無` plus
`論`, and standalone idiom `無論如何`.

The evidence does not settle whether `都` may be omitted, the complete inventory
of alternative-domain forms, negative scope, subject placement, register
differences, or when `無論如何` is internal versus discourse-fixed.

This note authorizes no parser change, construction-status change, lexical
installation, test promotion, or automatic acceptance rule.

## Sources

See
`PRQ2-034-MOU4LEON6-DOU1-UNCONDITIONAL-SOURCE-VERIFICATION-R1.tsv`.

- Words.hk defines `無論` as “no matter what/how” and gives wh-domain examples.
- Hong Kong Vision teaches the paired construction with wh, degree, A-not-A,
  differing-subject, declarative, and question profiles.
- Jyut Dictionary aggregates Cantonese examples with wh, degree, locative, and
  explicit `定係` alternative domains.
- An Education Bureau-hosted Cantonese drama script naturally attests a
  locative wh-domain.

## Runtime collision result

See
`PRQ2-034-MOU4LEON6-DOU1-UNCONDITIONAL-COLLISION-AUDIT-R1.tsv`.

Runtime 0.5.213 has no dedicated unconditional analysis. Some examples retain
generic `ClauseLink` or local modal/motion nodes, but no row identifies the
alternative domain, invariant consequence, or `無論`–`都` scope. Free-choice,
scalar-concessive, and `唔理` controls remain structurally indistinguishable or
unwrapped.

## Open boundaries

- wh, degree, A-not-A, disjunctive, nominal, and clausal domains;
- required versus omitted `都` and `都好` profiles;
- negative and modal scope, subjects, particles, and questions;
- UC-RQ-020 member composition and UC-RQ-037 concession boundary;
- `唔理…都`, `不論…都`, and register differences;
- standalone `無論如何`, ellipsis, prosody, and discourse recovery.

## Disposition

**Dedicated research unit; implementation and status changes remain
unauthorized.**
