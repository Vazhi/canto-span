# WECHAT-GX-TRAVEL-002 — Post-v0.5.181 lexicon patch blueprint R2

Date: 2026-07-20  
Status: **design-only; not implemented**

## Scope

This blueprint translates the verified R2 lexicon set into a bounded future patch plan. It contains **16 installation targets** and **32 planned probes**. It is deliberately unversioned because v0.5.181 is still waiting for rendered acceptance and sealed held-out evaluation.

No runtime file is changed by this blueprint.

## Installation targets

| Surface | Jyutping | Learner role | Bounded scope |
|---|---|---|---|
| 大伯 | daai6 baak3 | who | eldest/elder paternal uncle; kinship-style address |
| 廣西 | gwong2 sai1 | where | Guangxi |
| 旅遊 | leoi5 jau4 | what | leisure travel / tourism |
| 嘛 | maa3 | particle | sentence-final explanatory/obviousness particle |
| 酒 | zau2 | what | alcohol / alcoholic drink |
| 千祈 | cin1 kei4 | how | by all means / absolutely, especially in warnings |
| 啖 | daam6 | measure_word | classifier for a sip or mouthful |
| 尋晚黑 | cam4 maan5 hak1|cam4 maan5 haak1 | when | last night |
| 桂林 | gwai3 lam4 | where | Guilin |
| 陽朔 | joeng4 sok3 | where | Yangshuo |
| 公里 | gung1 lei5 | measure_word | kilometre |
| 揸 | zaa1 | doing | hold/control; drive a vehicle in the vehicle-control sense |
| 周圍 | zau1 wai4 | where | surrounding area / around / everywhere |
| 差唔多 | caa1 m4 do1 | how | approximately/almost; similar/nearly the same |
| 阿妹 | aa3 mui6 | who | younger sister; affectionate address to a girl/young woman |
| 慣 | gwaan3 | like | be/get accustomed to |


## Mandatory implementation rules

1. Apply the patch only after the v0.5.181 cycle is resolved.
2. Assign a normal semantic version at implementation time.
3. Do not change grammar legitimacy status in a lexicon patch.
4. Do not use any corpus unit as proof of productivity.
5. Keep proper place names restricted to proper-name recognition.
6. Keep `啖` as a classifier; do not lexicalize `一啖` as an indivisible grammar-bearing unit.
7. Preserve the separate senses of `揸`, `周圍`, `差唔多`, and `阿妹`.
8. Keep bare `唔慣` context-dependent and insert no hidden complement.
9. Treat `千祈` as a lexical anchor only.
10. Require a focused rendered review for learner roles, Jyutping, hover glosses, and segmentation.

## Required validation

- lexicon topology and duplicate-surface checks;
- Jyutping format and dictionary-disagreement audit;
- generated-vocabulary coverage;
- learner-role and syntax-tag registry validation;
- semantic-acceptance boundaries;
- aggregate regression;
- focused rendered note containing all positive and boundary probes.

## Deliberately excluded

The blueprint excludes `摩托車`, `上班`, `遊覽區`, `景點`, `必要`, `風景`, `放暑假`, `早知`, `加加埋埋`, `兜`, `跟`, and `姨甥` as installable lexical entries. It also excludes corpus-local names and duplicate entries already present in the runtime.
