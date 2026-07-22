# CP054-P1 ScalarEvaluation reconciliation R1

Date: 2026-07-22

Checkpoint: `v0.5.210-scalar-evaluation-reconciliation`

## Decision

Retain `ScalarEvaluation` as `research_pending` for the narrow, independently
attested negative lexical `算` evaluation profile. Remove the unrelated
scalar-value-noun + stative-predicate profile and its semantic-domain aliases.

This is not a productive promotion. Complement productivity, discourse scope,
speaker judgments, and a complete boundary inventory remain unresolved.

## External evidence

- The 2021 Hong Kong Cantonese coursebook directly gives `對皮鞋唔算貴`.
- The Words.hk/CantoWords `價錢` noun entry gives exact `價錢唔算貴` and the
  contrasting nominal expression `中等價錢`.
- The CUHK Cantonese Online Tutorial gives `都唔算貴` in a hotel-price dialogue.
- A 1995 Hong Kong Legislative Council transcript contains `都唔算好差`,
  independently showing a degree-modified non-price property complement.
- Lam's scalar analysis supports keeping property predication distinct from
  price-domain or comparative wrappers; it does not prove this runtime node.

## Runtime comparison

Before v0.5.210, `ScalarEvaluation` combined two different profiles:

1. negative `算` evaluation: negator + evaluation marker + optional degree +
   property predicate;
2. price-noun predication: scalar-value noun + stative predicate, with legacy
   examples `價錢中等` and `中價`.

The second profile was neither source-linked as the same construction nor the
owner of its documented surfaces: the current parser already analyzes
`價錢中等` as `TopicComment`, and `中價` / `中等價錢` as nominal structure.
v0.5.210 removes that stale profile and stops redirecting the retired
price-specific labels to the general evaluation node.

The negative fallback now requires the overt property `貴` rather than firing
from `價錢` or `價位` alone. The category template continues to recognize other
overt property predicates such as `太多`; broader complement coverage remains
research-pending.

## Executable evidence

Focused positives:

- `對皮鞋唔算貴。`
- `價錢唔算貴。`
- `都唔算貴。`

Focused boundary:

- `中等價錢。` must not produce `ScalarEvaluation`; ordinary nominal structure
  remains visible.

The historical `唔算貴。` implementation probe remains at zero linguistic
evidence weight and is not converted into external evidence.

## Status result

- `ScalarEvaluation`: `unsupported_generalization` → `research_pending`;
- no active or retired label count changes;
- one implementation-only label gains positive-and-boundary coverage;
- no panel, corpus-frequency, productive, or supported status is claimed.

## Open boundaries

- the complement inventory after `算`, including degree-modified predicates;
- optional `都` and other scoped adverbs;
- overt topic/subject versus context-recovered profiles;
- particles and register;
- relation to positive `都算` evaluation;
- parser undercoverage of attested `都唔算好差`.
