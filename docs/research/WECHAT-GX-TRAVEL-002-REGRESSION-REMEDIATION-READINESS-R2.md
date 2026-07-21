# WECHAT-GX-TRAVEL-002 — Regression and remediation readiness R2

Date: 2026-07-20  
Status: **specification-only; no regression or parser changes**

## Result

All 16 queue-R units now have explicit future fixture classes, preconditions, positive assertions, and forbidden analyses.

| Fixture class | Count |
|---|---:|
| `BLOCKED_CONTEXT_BOUNDARY_FIXTURE_READY_NOW` | 1 |
| `DURABLE_FIXTURE_READY_NOW` | 2 |
| `POST_LEXICON_AND_RESEARCH_FIXTURE` | 3 |
| `POST_LEXICON_FIXTURE` | 1 |
| `REMEDIATION_RESEARCH_CONFIRMATION_NEEDED` | 1 |
| `REMEDIATION_SPEC_READY` | 2 |
| `RESEARCH_BLOCKED_FUTURE_FIXTURE` | 5 |
| `REVIEW_BOUNDARY_FIXTURE_READY_NOW` | 1 |


## Safe to absorb after the current candidate cycle

The following surfaces already have stable current behavior and can become natural-speech fixtures after v0.5.181 is resolved:

- `U010` `係啊係啊。` — strict repetition/surface-preservation fixture;
- `U012` `琴日上嚟㗎喇。` — deictic motion plus particle-cluster fixture;
- `U017` `我話畀你聽吓。` — review-bearing reported-speech boundary;
- `U047` `因為我要上班啊。` — blocked standalone causal-fragment boundary.

They are not added to the frozen candidate’s aggregate suite while held-out evaluation is sealed.

## Remediation specifications

- `U018` `唔係啊。`: restore established negative-copular response coverage without hidden content.
- `U023` `唔使自己開咁辛苦。`: verify negative-necessity scope and preserve manner/degree material.
- `U042` `一樣㗎咋。`: prevent numeral-classifier misselection and preserve the particle cluster.

## Research-blocked contrasts

- duration: `開咗五個鐘頭車左右` must remain outside simple V咗O;
- completion: objectless `食完` must insert no hidden object and supplies no V完咗O evidence;
- attainment/opportunity: `冇去到`, `去唔到`, `冇得去`, `冇去` remain distinct;
- lexical additions may repair tokenization but cannot authorize coordination, resumption, conditional linkage, or stative clause structure.

## Freeze boundary

No specification in this packet is absorbed into `regression-snapshots.json`, implemented in `main.js`, or counted as productive evidence before v0.5.181 is resolved.
