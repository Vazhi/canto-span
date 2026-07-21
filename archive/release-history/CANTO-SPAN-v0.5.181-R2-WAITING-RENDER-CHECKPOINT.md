# Canto Span v0.5.181 — R2 waiting-render checkpoint

Date: 2026-07-20

## Stop state

Work stopped at a natural checkpoint. The v0.5.181 parser candidate remains **render-ready and unaccepted**.

- accepted baseline: **v0.5.180**
- active candidate: **v0.5.181**
- candidate target: `ResourceUseLaiFunctionRelation`
- public compatibility label: `IntendedFunctionRelation`
- render status: **pending, 12 rows**
- prospective held-out: **7 cases, sealed and unopened**
- `supported_productive`: **1**
- runtime changes during the R2 research batch: **none**
- candidate evidence, scoring, and grammar-status changes during R2: **none**

## R2 work completed

### Lexicon and Jyutping verification

All 39 corpus-derived candidates now have item-level dispositions.

- future bounded patch targets: **16**
- planned positive/boundary probes: **32**
- exact-source or regional-scope deferrals: **7**
- polysemy or grammar-dependent deferrals: **4**
- existing-entry audit/sense-gap rows: **4**
- corpus-local names and nicknames: **5**
- compositional non-entries: **2**
- unresolved kinship-scope row: **1**

Important correction: `姨甥` is recorded as **`ji4 sang1`**. Its English kinship scope remains quarantined because references conflict.

No lexical target was installed in the frozen v0.5.181 runtime.

### Future lexical patch blueprint

A post-v0.5.181 blueprint now specifies 16 bounded targets and 32 positive/boundary probes. It excludes duplicate `廣州`, does not misuse temporal `跟住` as accompaniment, and does not let polysemous lexical entries authorize grammar.

### Regression and remediation readiness

All 16 queue-R units now have explicit fixture classes, preconditions, positive assertions, and forbidden analyses.

Safe to absorb only after the v0.5.181 cycle is resolved:

- `U010` `係啊係啊。` — durable repetition and surface-preservation fixture;
- `U012` `琴日上嚟㗎喇。` — deictic motion and particle-cluster fixture;
- `U017` `我話畀你聽吓。` — review-bearing reported-speech boundary;
- `U047` `因為我要上班啊。` — blocked causal-fragment boundary.

Remediation specifications were prepared for:

- `U018` `唔係啊。`;
- `U023` `唔使自己開咁辛苦。`;
- `U042` `一樣㗎咋。`.

Research-blocked units remain unabsorbed, including activity duration, objectless completion, `冇去到` versus `冇得去`, coordinated-subject locatives, and resumed reported speech.

## Validation

- current focused candidate: **19/19 PASS**
- packet lock: **21/21 PASS**
- visible evaluation: **83/83 PASS**
- implementation audit: **24/24 PASS**
- aggregate regression: **545/545 PASS**
- accepted-baseline topology: **545/545 PASS**
- native-speaker naturalness: **33/33 PASS**
- I02 preservation: **24/24 PASS**
- grammar legitimacy: **1100/1100 PASS**
- semantic acceptance: **15/15 PASS**
- pre-intermediate corpus: **80/80 PASS**
- claim provenance: **231/231 PASS**
- source accounting: **PASS; 179 active labels, 503 retained research records**
- documentation consistency: **PASS; 0 broken links**
- R2 lexicon/Jyutping verification: **22/22 PASS**
- R2 lexical patch blueprint: **20/20 PASS**
- R2 regression/remediation readiness: **16/16 PASS**

## Resume instructions

1. Install `canto-span-plugin-v0.5.181.zip`.
2. Render `CANTO-SPAN-v0.5.181-RENDER-REVIEW.md` in Obsidian.
3. Return both diagnostic JSON exports.
4. Inspect all 12 rows and freeze the exact candidate only after a clean render.
5. Open the seven-case evaluator custody once, only after freeze.
6. Do not install the R2 lexical blueprint or absorb the R2 natural-speech fixtures until v0.5.181 is accepted or rejected.
