---
title: PRQ2-010 — ceoi4 zo2 zi1 ngoi6 exclusion-addition research
research_id: PRQ2-010
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# PRQ2-010 — `除咗 … (之外)` exclusion and addition

## Research decision

Promote Cantonese `除咗 A (之外)，B` to a dedicated **research-only
exclusion/addition family**. The strongest checked schema is:

```text
(CONTEXT / SUBJECT) + 除咗 + BASE-OR-EXCEPTION + (之外)，
                      RESIDUE-OR-ADDITION
```

The continuation determines two related profiles:

- **additive**: `仲`, additive `都`, or equivalent continuation includes A and
  adds B (“besides A, also B”);
- **restrictive/exclusive**: negative or totalizing continuation sets A apart
  from the remaining domain (“except A, the rest / nobody / nothing B”).

Checked sources independently attest nominal and predicative A constituents,
overt and omitted `之外`, and `仲`, `都`, negative, totalizing, declarative, and
interrogative continuations. Local HKCanCor evidence naturally attests both an
additive offer contrast and an exclusive comparison profile.

This family is distinct from:

- `除非` exception conditionals researched under UC-RQ-038;
- removal verb `除` plus perfective `咗`;
- formal written `除 A 外` and related variants, which are not automatically
  equivalent here;
- spatial or lexical uses of `之外` without the exclusion frame;
- bare `除咗 A` or `之外 B` fragments without a licensed continuation.

The evidence does not support collapsing additive and restrictive
interpretations into one fixed English gloss. It also does not establish every
omission pattern, constituent type, polarity interaction, prosodic boundary,
register variant, or discourse-licensed fragment.

This note authorizes no parser change, construction-status change, lexical
installation, test promotion, or automatic acceptance rule.

## Sources

See
`PRQ2-010-CEOI4ZO2-ZI1NGOI6-EXCLUSION-ADDITION-SOURCE-VERIFICATION-R1.tsv`.

- Jyut Dictionary reproduces the Words.hk prepositional definition and examples
  spanning additive and restrictive readings, with Jyutping `ceoi4 zo2`.
- Carnegie Mellon Elementary Cantonese supplies an institutional teaching
  example with `除咗 … 之外` and additive `仲`.
- Hong Kong Vision explicitly contrasts `都` and `仲` continuations, gives
  positive and negative examples, and states that `之外` may be omitted.
- Cantowords separates formal prepositional `除` from removal/division senses.
- Local HKCanCor extraction supplies two natural adult-corpus boundary cases.

## Runtime collision result

See
`PRQ2-010-CEOI4ZO2-ZI1NGOI6-EXCLUSION-ADDITION-COLLISION-AUDIT-R1.tsv`.

Runtime 0.5.213 has no dedicated exclusion/addition analysis. Some complete
examples receive generic `ClauseLink` or `ClauseRel` coverage and preserve
member-internal analyses, while other sourced and corpus examples remain
unwrapped. No row identifies the paired frame, A as base/exception, the
continuation domain, or the additive-versus-restrictive profile.

## Open boundaries

- nominal, verbal, adjectival, and full-clause A constituents;
- optionality and register of `之外`;
- `仲`, `都`, `亦`, `又`, `就`, totalizers, and polarity licensing;
- additive inclusion versus restrictive exclusion and context dependence;
- topic/subject placement and shared versus repeated subjects;
- declarative, interrogative, imperative, and fragment uses;
- formal `除 A 外`, `除 A 之外`, and written-Mandarin-adjacent variants;
- prosody and discourse recovery when one frame segment is omitted.

## Disposition

**Dedicated research unit; implementation and status changes remain
unauthorized.**
