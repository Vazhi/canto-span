# WECHAT-GX-TRAVEL-002 — Lexicon and Jyutping verification R2

Date: 2026-07-20  
Candidate runtime observed: **v0.5.181**  
Status: **research-only; no runtime patch applied**

## Purpose

This packet advances the R1 lexicon triage to item-level verification and a bounded post-acceptance patch plan. It does not alter the render-ready v0.5.181 candidate, open evaluator custody, change grammar status, or use the conversation as productive evidence.

## Result

- candidates adjudicated: **39/39**
- bounded post-v0.5.181 patch targets, including one component-only target: **16**
- exact-source or regional-scope deferrals: **7**
- polysemy/grammar-dependent deferrals: **4**
- existing-entry audit or sense-gap rows: **4**
- corpus-local names/nicknames: **5**
- productive-promotion weight: **0**
- runtime files changed: **no**

## Material corrections

1. `姨甥` is corrected from the R1 proposal `ji4 saang1` to **`ji4 sang1`**. The reading is supported independently at the compound and character levels. The kinship definition remains blocked because available descriptions conflict over the precise relationship and speaker-relative scope. No broad “niece/nephew” gloss is approved for installation.
2. `廣州` already has a correct runtime proper-place entry with `gwong2 zau1`; no duplicate patch is needed.
3. `跟住` already has a temporal runtime entry (“then / next”). That entry does **not** cover the accompaniment use in `唔跟住去`.

## Bounded patch targets after v0.5.181 is resolved

| Candidate | Verified Jyutping | Installation scope |
|---|---|---|
| 大伯 | daai6 baak3 | ELIGIBLE_BOUNDED: father’s elder/eldest brother; kinship-style address term |
| 廣西 | gwong2 sai1 | ELIGIBLE_PROPER_NAME_ONLY: Guangxi proper place name |
| 旅遊 | leoi5 jau4 | ELIGIBLE_BOUNDED: leisure travel; tourism (noun) |
| 嘛 | maa3 | ELIGIBLE_TOKEN_READING_ONLY: sentence-final particle; explanatory/obviousness functions remain context-sensitive |
| 酒 | zau2 | ELIGIBLE_BOUNDED: alcohol; alcoholic drink |
| 千祈 | cin1 kei4 | ELIGIBLE_LEXICAL_ANCHOR_ONLY: by all means / absolutely, especially in warnings |
| 一啖 | jat1 daam6 | ELIGIBLE_COMPONENT_ONLY: add 啖 daam6 as sip/mouthful classifier; keep 一啖 compositional |
| 尋晚黑 | cam4 maan5 hak1|cam4 maan5 haak1 | ELIGIBLE_BOUNDED: last night |
| 桂林 | gwai3 lam4 | ELIGIBLE_PROPER_NAME_ONLY: Guilin proper place name |
| 陽朔 | joeng4 sok3 | ELIGIBLE_PROPER_NAME_ONLY: Yangshuo proper place name |
| 公里 | gung1 lei5 | ELIGIBLE_BOUNDED: kilometre |
| 揸 | zaa1 | ELIGIBLE_SENSE_TAGGED: hold/control; vehicle-control “drive” sense retained separately |
| 周圍 | zau1 wai4 | ELIGIBLE_SENSE_TAGGED: surrounding area; around; everywhere |
| 差唔多 | caa1 m4 do1 | ELIGIBLE_SENSE_TAGGED: approximately/almost; similar/nearly the same |
| 阿妹 | aa3 mui6 | ELIGIBLE_SENSE_TAGGED: younger sister; affectionate address to a girl/young woman |
| 慣 | gwaan3 | ELIGIBLE_BOUNDED: be/get accustomed to |


These are patch-plan targets only. A later release must run lexical topology, Jyutping, generated-vocabulary, learner-role, and aggregate regression gates. Place-name entries remain proper-name-only; particle entries remain token/reading-only unless separately researched.

## Existing entries: preserve or audit

| Candidate | Disposition |
|---|---|
| 附近 | Audit current senses; do not add a duplicate entry. |
| 廣州 | Existing proper-place entry already has gwong2 zau1; audit/preserve it and do not add a duplicate or motion relation. |
| 單位 | Audit existing entry and contextual sense; avoid duplicate. |
| 跟住 | Existing runtime entry covers temporal “then/next”; it must not be reused to analyze accompaniment 唔跟住去. |


## Deferred: exact source or regional/register scope

| Candidate | Reason |
|---|---|
| 摩托車 | Do not install globally until a second exact lexical source and regional label are recorded. |
| 遊覽區 | Component plausibility is not an item-level lexical verification. |
| 景點 | Needs an exact lexical source; related 觀光/風景 references are insufficient. |
| 必要 | Needs exact Cantonese item-level source and sense/category split. |
| 風景 | 風景區 corroborates components but is not direct atomic verification. |
| 上班 | Needs a direct exact entry and explicit register label before installation. |
| 放暑假 | Needs exact item-level verification before atomic MWE entry. |


## Deferred: polysemy or grammar dependency

| Candidate | Reason |
|---|---|
| 早知 | Lexical installation waits for frame-aware design; exact 早知…咪仲好 remains unresolved. |
| 加加埋埋 | Needs direct lexical and reduplication evidence before atomic entry. |
| 兜 | Reading is verified, but route sense and valency are not independently established. |
| 跟 | Needs sense/valency split; lexical repair must not create accompaniment grammar. |


## Important sense boundaries

- `旅遊` is verified here as a **noun**; this source does not authorize an unrestricted verb sense.
- `周圍` may denote the surrounding area or distributive “around/everywhere,” but `周圍兜` remains compositional.
- `揸` requires sense metadata: “hold/control” and vehicle-control “drive” must not be collapsed indiscriminately.
- `差唔多` requires separate approximation and similarity uses.
- `阿妹` requires distinct kinship and address senses.
- direct dictionary evidence for temporal `跟住` cannot validate accompaniment `唔跟住去`.
- `慣` may be added, but `唔慣` in the corpus retains an unresolved complement; no hidden complement may be inserted.
- `千祈` is a lexical anchor only. It cannot by itself promote the larger `千祈唔好…` prohibition frame.

## Corpus-local proper names

- `阿豬仔[proper_name]`
- `豬伯[proper_name]`
- `方子[proper_name]`
- `阿拉[proper_name]`
- `吳蘇陽[proper_name]`


## Files

- `test-data/WECHAT-GX-TRAVEL-002-LEXICON-JYUTPING-VERIFICATION-R2.tsv`
- `test-data/WECHAT-GX-TRAVEL-002-LEXICON-JYUTPING-VERIFICATION-R2.json`
- `test-data/WECHAT-GX-TRAVEL-002-LEXICON-SOURCE-REGISTER-R2.tsv`
- `tools/audit-wechat-gx-travel-002-lexicon-verification-r2.py`

## Acceptance boundary

This packet is not a parser or lexicon acceptance. Installation must occur only in a new post-v0.5.181 release after the current render and held-out cycle is resolved. No entry in this packet supplies evidence for a surrounding construction, argument structure, omitted element, motion relation, topic structure, or aspectual analysis.
