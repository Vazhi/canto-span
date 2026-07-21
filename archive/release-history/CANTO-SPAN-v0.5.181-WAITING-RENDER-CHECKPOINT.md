# Canto Span v0.5.181 — waiting-render checkpoint

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
- runtime behavior changed during waiting-period research: **no**
- candidate evidence/scoring changed during waiting-period research: **no**
- grammar-status changes during waiting-period research: **none**

## Completed while waiting for render

### Native-corpus adjudication

`WECHAT-GX-TRAVEL-002` now has 52/52 high-confidence units adjudicated with overlapping queues:

- regression/remediation: **16**
- lexicon/Jyutping: **32**
- context/disfluency: **40**
- grammar research requiring external evidence: **46**

The corpus has zero productive-promotion weight.

### Five-cluster grammar research packet

Research-only dispositions were completed for:

1. object-topic negation;
2. `早知…咪仲好` hindsight/regret;
3. `冇去到` versus `冇得去`;
4. `開咗五個鐘頭車左右` activity duration;
5. contextual objectless `食完`.

Main boundaries:

- no dedicated object-topic-negation construction is justified;
- the general `早知` regret frame is linked, but exact `咪仲好` remains unresolved;
- `冇去到`, `冇得去`, `冇去`, and `去唔到` must not be merged;
- activity-duration examples remain outside simple accepted `V咗O`;
- objectless `食完` inserts no hidden object and provides no evidence for `V完咗O`.

### Lexicon and Jyutping readiness

The 32 lexicon-queue units produced **39 distinct candidates**:

- bounded immediate repair candidates: **9**;
- corpus-local names/nicknames: **5**;
- compositional/component-only items: **2**;
- grammar-dependent or polysemous deferred items: **5**;
- remaining ordinary terms require item-level dictionary or regional verification.

No lexicon entry was installed in the runtime during this research-only batch.

## Final validation

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
- native-conflict burden: **13/13 PASS**
- research-only boundary audit: **22/22 PASS**
- lexicon/Jyutping readiness audit: **16/16 PASS**
- claim provenance: **231/231 PASS**
- source accounting: **PASS; 179 active labels, 503 retained research records**
- documentation consistency: **PASS; 0 broken local links**

## Resume instructions

1. Install `canto-span-plugin-v0.5.181.zip`.
2. Render `CANTO-SPAN-v0.5.181-RENDER-REVIEW.md` in Obsidian.
3. Return the acceptance-summary and full-diagnostics JSON exports.
4. Inspect all 12 rows and freeze the exact candidate only after a clean render.
5. Open the seven-case evaluator custody once, only after freeze.

Do not implement any corpus-derived grammar or lexicon changes before the current v0.5.181 acceptance cycle is resolved.

### Item-level lexicon verification R2

The R1 triage has now been advanced to 39/39 item-level dispositions:

- bounded post-v0.5.181 patch targets: **16** (15 direct entries plus component-only `啖`);
- exact-source or regional-scope deferrals: **7**;
- polysemy/grammar-dependent deferrals: **4**;
- existing-entry audit/sense-gap rows: **4**;
- corpus-local names/nicknames: **5**;
- compositional non-entries: **2**;
- unresolved kinship-scope row: **1** (`姨甥`).

Material corrections:

- `姨甥`: R1 `ji4 saang1` corrected to **`ji4 sang1`**; gloss remains blocked by conflicting kinship-scope descriptions.
- `廣州`: an accurate runtime entry already exists; no duplicate patch target.
- `跟住`: the existing runtime entry covers temporal “then/next,” not accompaniment in `唔跟住去`.

The post-acceptance patch blueprint contains 16 targets and 32 planned positive/boundary probes. Verification audit: **22/22 PASS**. Blueprint audit: **20/20 PASS**. Runtime files remain byte-identical and evaluator custody remains sealed.

