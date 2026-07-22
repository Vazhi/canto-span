# CP055-P1 NegativeExperiential reconciliation R1

Date: 2026-07-22

Checkpoint: `v0.5.211-negative-experiential-reconciliation`

## Decision

Retain `NegativeExperiential` as `research_pending` for the narrow,
independently attested preverbal `未/冇 + V過` statement profile. Keep final
`未` experiential questions, `有冇` questions, non-experiential `未V`, and
general `唔` or prohibitive `咪` outside this construction.

This is not a productive promotion. Verb/object productivity, particles,
discourse conditions, corpus frequency, and speaker judgments remain unresolved.

## External evidence

- The 2021 Hong Kong Cantonese coursebook gives exact `我冇睇過今日嘅報紙`,
  `我未去過美國`, and `我未見過王小姐` statements on printed p. 192.
- The same coursebook separately gives `你有冇去過澳門呀` as a polar
  question on printed p. 188.
- Lam's analysis distinguishes aspect-sensitive `冇` from general `唔` in
  Hong Kong Cantonese's split negation system.
- The CUHK-hosted Matthews and Yip supplement presents `V過...未` as an
  experiential-question strategy, confirming that final `未` is a separate
  word-order profile.
- Zhang's account ties experiential semantics to `過`; negation alone does not
  license this construction.

## Runtime comparison

Before v0.5.211, short `我未見過` and `我冇睇過` reached the label, but the
exact longer source statements did not behave consistently. `我未見過王小姐`
was mislabeled as `ExperientialQuestion`; `我冇睇過今日嘅報紙` lost the
negative-experiential wrapper; and `我未去過美國` allowed `未` into a template
documented specifically for `唔` directional-motion negation.

v0.5.211 constrains the two generic negation templates to their documented
markers and makes the compatibility fallback word-order-sensitive. A preverbal
`未` or `冇` must precede a VP containing experiential `過`; final `未`
remains question structure.

## Executable evidence

Focused positives:

- `我未見過王小姐。`
- `我冇睇過今日嘅報紙。`
- `我未去過美國。`

Focused boundaries:

- `今日嘅報紙我仲未睇完。` has no experiential `過`.
- `你飲過茶未？` has final question `未`.
- `你有冇去過澳門呀？` is a separate `有冇` question.
- `我唔見過。` and `我咪見過。` do not receive `NegativeExperiential`.

The two historical short implementation probes remain at zero linguistic
evidence weight and are not converted into external evidence.

## Status result

- `NegativeExperiential`: `unsupported_generalization` → `research_pending`;
- no active or retired label count changes;
- one implementation-only label gains positive-and-boundary coverage;
- no panel, productive, provisional, or supported status is claimed.

## Open boundaries

- productive verb and object inventories;
- particles and register;
- focus adverbs and overt versus recovered subjects;
- interaction with motion and other VP wrappers;
- complete `未/冇 + V過` contrast inventory;
- internal NP parsing for longer objects such as `今日嘅報紙`.
