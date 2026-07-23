---
title: PRQ2-009 — gei3 jin4 premise-response research
research_id: PRQ2-009
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# PRQ2-009 — `既然` premise and response

## Research decision

Promote Cantonese `既然 A，B` to a dedicated **research-only
premise-response family**:

```text
(SUBJECT) + 既然 + ESTABLISHED-PREMISE，
            (SUBJECT) + RESPONSE
```

The response presents an opinion, inference, suggestion, decision, request, or
question as relevant given the accepted premise. Checked sources attest
responses introduced by `噉`, `不如`, `等我`, and a bare imperative. `就` is
therefore a compatible but not obligatory response marker; the construction
must not be reduced to an adjacent `既然 … 就 …` pair.

This family is distinct from hypothetical `如果 A，就 B`, causal `因為
A，所以 B`, UC-RQ-038 `除非`, UC-RQ-035 temporal `一 A 就 B`, discourse
`反正 A，B`, and empty marker sequences. The evidence does not settle factivity
under disagreement, subject placement, response-marker inventory, ellipsis,
interrogative scope, register, prosody, or all response speech acts.

This note authorizes no parser change, construction-status change, lexical
installation, test promotion, or automatic acceptance rule.

## Sources

See
`PRQ2-009-GEI3JIN4-PREMISE-RESPONSE-SOURCE-VERIFICATION-R1.tsv`.

- Words.hk defines conjunction `既然` as introducing an objective description
  followed by a related opinion, suggestion, or question.
- An Education Bureau-hosted Hong Kong School Drama Festival script naturally
  attests `既然` with `等我` and bare imperative responses.
- Wenlin Dictionaries supplies a romanized Cantonese example with `噉`.
- CantoDict independently records `gei3 jin4` and “since/as this is the case.”

## Runtime collision result

See
`PRQ2-009-GEI3JIN4-PREMISE-RESPONSE-COLLISION-AUDIT-R1.tsv`.

Runtime 0.5.213 has no dedicated premise-response analysis. Examples may receive
generic `ClauseLink` or `ClauseRel` coverage and useful member-internal
analyses, but no row identifies `既然`, the premise, the response, or their
discourse relation. Conditional and causal controls receive the same generic
substrate.

## Open boundaries

- factual, accepted, accommodated, and challenged premises;
- optional `就`, `噉`, `咁`, `不如`, `等我`, and unmarked responses;
- inference, advice, request, decision, imperative, and question responses;
- subject placement, negation, modality, particles, and interrogative scope;
- ellipsis, discourse recovery, prosody, register, and written variants.

## Disposition

**Dedicated research unit; implementation and status changes remain
unauthorized.**
