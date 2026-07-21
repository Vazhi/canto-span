# Canto Span v0.5.181 autonomous research checkpoint

Date: 2026-07-20

## Parser program

- accepted baseline: **v0.5.180**
- active candidate: **v0.5.181**
- candidate state: **render-ready; awaiting diagnostic exports**
- runtime behavior changed in this batch: **no**
- candidate evidence or scoring changed: **no**
- grammar-status changes: **none**
- evaluator custody: **sealed and unopened**

## Research-only work completed

Five natural-speech questions from `WECHAT-GX-TRAVEL-002` were converted into bounded claim/source dispositions and controlled contrasts:

1. object-topic negation;
2. `早知` hindsight/regret and the unresolved exact `咪仲好` consequent;
3. `冇去到` versus `冇得去` and postverbal potential boundaries;
4. activity duration in `開咗五個鐘頭車左右`;
5. context-dependent objectless completion in `食完`.

## Main conclusions

- Object-topic negation is compositionally linked; no dedicated construction is justified.
- `早知` as a regret frame is externally attested, but exact `早知…咪仲好` remains pending.
- `冇去到` and `冇得去` must not be merged; dedicated external evidence for `冇得 + VP` remains a gap.
- The duration surface is explicitly outside accepted simple `V咗O`.
- Objectless `食完` requires unresolved discourse context and supplies no `V完咗O` evidence.

## Files

- `docs/research/WECHAT-GX-TRAVEL-002-PRIORITY-GRAMMAR-RESEARCH-R1.md`
- `docs/research/WECHAT-GX-TRAVEL-002-CLAIM-SOURCE-EDGES-R1.tsv`
- `test-data/WECHAT-GX-TRAVEL-002-CONTROLLED-CONTRASTS-R1.tsv`
- `validation/v0.5.181/WECHAT-GX-TRAVEL-002-RESEARCH-ONLY-AUDIT-R1.json`

## Resume parser program

The next parser action remains unchanged: adjudicate the twelve rendered v0.5.181 rows, freeze the exact candidate after a clean render, and only then open the seven-case prospective evaluator custody.

## Validation after integration

- research-only boundary audit: **22/22 PASS**
- current focused candidate: **19/19 PASS**
- aggregate regression: **545/545 PASS**
- source accounting: **PASS; 179 labels accounted; 503 retained research records**
- claim provenance: **231/231 PASS**
- documentation consistency: **PASS; 0 broken links**
- runtime and render-review hashes: unchanged
- custody SHA-256: unchanged
