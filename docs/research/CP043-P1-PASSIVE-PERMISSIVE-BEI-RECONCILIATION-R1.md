# CP043-P1 Passive/permissive 畀 reconciliation R1

## Decision

Reconcile one independently documented permissive frame and one independently documented passive frame with the existing transparent `PassivePermissiveRelation`. Keep the construction `research_pending`. Do not infer unrestricted productivity or deterministic interpretation from the surface sequence alone.

## External evidence used

### Chin 2011

Chin distinguishes lexical GIVE, beneficiary, causative/permissive, passive, and instrument uses of Cantonese 畀. Two exact examples are relevant here:

- published p. 538: `我畀佢打籃球` — permissive/allow reading;
- published p. 540: `我畀阿媽鬧` — passive reading.

Repository source ID: `SRC-CHIN-2011-BEI`. The full-text source was previously verified in the project source registry.

### Chan 2021

Chan independently analyzes causative/permissive and passive uses of `bei2` and reports a small six-consultant study. This corroborates the need to preserve distinct reading candidates while avoiding a context-free deterministic classifier.

Repository source ID: `SRC-CHAN-2021-BEI`.

## Runtime mismatch

Before v0.5.200, the runtime recognized `我畀佢打籃球。` as `PassivePermissiveRelation`, but exposed `籃球` as a retained-patient candidate. That analysis ignored the reviewed activity VP `打籃球` and made the permissive example look like an indirect-passive ambiguity.

## Implementation correction

1. Add `打籃球` to the constrained reviewed `ProductiveVO` inventory.
2. In `passivePermissiveRelationFallback`, group a recognized `ProductiveVO` or `TransitiveVP` before searching for a retained patient.
3. Preserve the grouped predicate as a visible nested child.
4. For `我畀佢打籃球。`, select the existing narrow `permissive_candidate` route with reading candidate `permissive_let_allow`.
5. For `我畀阿媽鬧。`, retain the transparent passive/permissive relation and its context-sensitive interpretation warning rather than forcing the source's intended reading as the only possible parse.

## Permanent regression cases

| Case | Surface | Required result | Evidence role |
|---|---|---|---|
| `REG-0547` | `我畀佢打籃球。` | root `PassivePermissiveRelation`; nested `ProductiveVO` `打籃球`; no retained patient candidate | source-linked positive |
| `REG-0548` | `我畀阿媽鬧。` | root `PassivePermissiveRelation`; passive reading remains available; ambiguity remains visible | source-linked positive |

The pre-existing `FRWRAP-006` case `我畀佢打。` remains a zero-weight implementation probe.

## Boundaries retained

This checkpoint does not establish:

- that every `NP1 + 畀/俾 + NP2 + VP` string is passive or permissive;
- that surface form alone always chooses between the readings;
- that every final noun after the embedded verb is part of a lexical activity VP;
- that lexical GIVE, beneficiary, post-theme participant, indirect passive, and permissive relations are one construction;
- productive coverage across arbitrary predicates or argument structures;
- native-panel acceptance thresholds.

## Outcome

- Parser behavior changes only for the reviewed nested activity-VP profile.
- `PassivePermissiveRelation` moves from implementation-only coverage to source-linked positive coverage.
- `ProductiveVO` gains one reviewed source-linked surface.
- No construction status changes.
- No new verifier, validation directory, or audit framework is created.
