---
title: PRQ2-033 — jau6 jau6 coexistent-predicate research
research_id: PRQ2-033
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# PRQ2-033 — paired `又 … 又 …` coexistence

## Research decision

Promote paired Cantonese `又 A 又 B` to a dedicated **research-only
coexistence/correlative family**. The strongest checked profile places two
properties, states, obligations, or activities under one subject or discourse
domain:

```text
(SUBJECT / DOMAIN) + 又 + PREDICATE-A + 又 + PREDICATE-B
```

Words.hk directly defines this use as several situations coexisting, identifies
the paired form, and gives `佢又聰明又靚`. CUHK CANCORP documentation
independently assigns `又 … 又` to a correlative annotation category. Verified
HKCanCor material naturally attests repeated modal/action members, including
`八千蚊又要交稅，又要還錢` and `又要俾人情又要買兩份禮物`.

This paired family is not interchangeable with the other checked uses of one
`又`: recurrence (“again”), additive response (“me too”), rationale, or
counter-expectation with `喎/噃`. Repetition across different overt subjects or
separate discourse turns also does not automatically establish a shared-domain
paired construction.

The current evidence supports property and modal/action cores. Nominal-list
uses, more than two members, negated members, subject sharing, punctuation,
prosody, and member-parallelism remain open.

This note authorizes no parser change, construction-status change, lexical
installation, test promotion, or automatic acceptance rule.

## Sources

See
`PRQ2-033-JAU6-JAU6-COEXISTENT-PREDICATE-SOURCE-VERIFICATION-R1.tsv`.

- Words.hk supplies pronunciation `jau6`, distinguishes five meanings, defines
  the paired coexistence sense, and gives property, nominal-list, and extended
  examples.
- CUHK CANCORP documentation treats `又 … 又` as a correlative category,
  independently supporting conventional paired status but not a full grammar.
- Local HKCanCor extraction provides natural repeated-modal/action examples and
  useful different-subject and iterative controls.

## Runtime collision result

See
`PRQ2-033-JAU6-JAU6-COEXISTENT-PREDICATE-COLLISION-AUDIT-R1.tsv`.

Runtime 0.5.213 has no dedicated paired analysis. Property examples are
unwrapped or retain only an unrelated NP child. A modal/action example becomes
one broad `ModalVP`, which hides the two marked members. A longer corpus example
receives generic `ClauseRelationGraph` coverage without a coexistence relation.
The runtime correctly produces ordinary structure for some single-`又`
controls, confirming that token presence alone cannot license the target.

## Open boundaries

- property, state, action, modal, and nominal-list member types;
- one shared subject versus separately overt subjects;
- two versus three or more paired members;
- negation, aspect, modality, and final particles inside each member;
- semantic compatibility and whether contradictory properties are possible;
- `又 A 又 B` versus unpaired `A 又 B`;
- recurrence, additive, rationale, and counter-expectation readings of one `又`;
- register and interaction with written `既 … 又 …`.

## Disposition

**Dedicated research unit; implementation and status changes remain
unauthorized.**
