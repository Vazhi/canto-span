# ISSUE-413 早知 hindsight-regret disposition R1

Parent issue: #413  
Work claim: #539  
Date: 2026-08-04

## Decision

Retain `早知(道)` hindsight-regret as a source-supported research family, but do not allocate a new identity or implement runtime behavior from this issue.

The reviewed evidence supports a Cantonese counterfactual-regret profile marked by `早知(道)` and relating unrealized prior knowledge to a past remedy or alternative. However, the issue’s remaining boundaries are not closed enough for identity or runtime promotion.

This packet therefore gives a terminal blocker/no-runtime disposition for #413: the core is real, but omission, consequent inventory, `咪`, order, and polyfunctionality still require controlled evidence before any implementation package.

## Assumption-level research review

### Assumption A — Cantonese has a `早知(道)` regret profile

Supported.

A recent study titled “Counterfactual Conditionals of Regret in Cantonese” describes a construction marked by `早知(道) zou2zi1(dou3)` and states that it expresses regret over a remedy that could have been undertaken in the past.

Traditional Chinese idiom evidence, such as `早知今日，何必當初` and `早知今日，悔不當初`, independently confirms the wider Chinese regret/hindsight semantics, but this is background only. It is not sufficient by itself for Cantonese construction identity.

### Assumption B — the current issue can settle the complete runtime identity

Not supported.

The issue itself lists unresolved evidence needs: consequent inventory, `咪`, complement and subject omission, canonical versus reverse clause order, temporal and controllability constraints, prosody, and negative controls. Those are not administrative details; they define the construction boundary.

### Assumption C — every `早知` occurrence belongs to the regret construction

Not supported.

CantoDict lists `早知` simply as “know earlier,” and the form can be literal or lexical outside the conventional regret profile. A future classifier must distinguish:

- literal early knowledge;
- idiomatic/hindsight regret;
- generic conditional uses;
- expressions like `早啲 + VP`;
- `咪` profiles unrelated to the consequent of regret.

### Assumption D — runtime gaps can promote the construction

No.

Runtime failure to preserve the relation is only a coverage trigger. It has no linguistic-evidence weight and cannot justify UUID allocation or parser expansion.

## Supported core

The supported core is narrow:

- marker: `早知` or `早知道`;
- semantics: hindsight / counterfactual regret;
- relation: unrealized prior knowledge would have led to a different past remedy or alternative;
- status: source-supported research family, not implementation-ready.

## Boundaries not closed

The following remain blockers before runtime or identity work:

1. whether the consequent must be overt;
2. which consequent markers are licensed, especially `就` and `咪`;
3. whether complement omission is licensed and under what discourse conditions;
4. whether subject omission changes the profile;
5. whether reverse order is the same construction;
6. how to distinguish conventional regret from literal early knowledge;
7. how to distinguish `咪` as regret consequent marker from prohibitive or inferential `咪`;
8. what prosodic or discourse constraints apply.

## Terminal disposition

- `早知(道)` hindsight-regret core: source-supported research family.
- Literal `早知`: separate lexical/cognition profile.
- New UUID: no, not from this issue.
- Runtime change: no.
- Status promotion: no.
- Current terminal state: evidence blocker / no runtime action.
- Later work: only a bounded corpus/contrast packet or controlled-judgment packet should reopen the identity/runtime question.

## Future work retained

Do not open a runtime issue yet. The next ready work, if pursued, should be a non-runtime evidence packet that samples actual `早知(道)` tokens and classifies:

- true hindsight-regret core;
- literal early-knowledge uses;
- overt consequent types;
- `咪` consequent uses;
- omitted consequent or complement uses;
- reverse-order uses;
- false positives.

Only after that evidence packet should a runtime or identity claim be opened.

## Protected-state disposition

This packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- “Counterfactual Conditionals of Regret in Cantonese”: `https://www.researchgate.net/publication/395453813_Counterfactual_Conditionals_of_Regret_in_Cantonese`
- CantoDict `早知`: `https://www.cantonese.sheik.co.uk/dictionary/words/4168/`
- MOE idiom `早知今日，何必當初`: `https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=14590&la=0&webMd=2`
- MOE idiom `早知今日，悔不當初`: `https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=11648`
