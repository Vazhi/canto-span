# Top-2000 spoken Cantonese lexical coverage audit

## Outcome

This audit builds a reproducible 2,000-form spoken-Cantonese frequency list, compares every ranked surface against the current Canto Span token lexicon, distinguishes direct lexical coverage from structural handling and uncertain matches, and fills clear lexical gaps without using frequency to broaden grammar.

The task added **184 independently supportable lexical entries** to runtime v0.5.227. All accepted batches passed the standard regression suite, runtime-build verification, core verification, runtime verification, research verification, and `git diff --check` before being committed.

## Frequency source

The ranking uses Lai & Winterstein's **Cifu v1** lexicon, pinned at commit `8d5e4903e419193f903823880a7815712072cc80`, and ranks unique non-empty forms by integer `SpokenAdult` frequency. Exactly the 2,000 highest-frequency forms with positive adult-spoken counts are retained.

Cifu is a Hong Kong Cantonese frequency lexicon with separate adult-spoken, child-spoken, child-directed, and written measures. This audit uses only `SpokenAdult`. The resulting ranking is therefore a reproducible **Cifu adult-spoken top 2,000**, not a claim that one universal Cantonese top-2,000 list exists.

Cifu supplies frequency, Jyutping, definitions, and structure metadata. Wiktionary was used as secondary lexical verification for selected forms/readings where an independent check was useful, including examples such as `中間`, `頭先`, `知道`, `繼續`, `其實`, `譬如`, `方向`, `泳池`, `經過`, `需要`, and `煙`.

## Runtime coverage classes

- `covered_main`: exact runtime token surface with a compatible reading.
- `covered_variant`: reserved for explicitly reviewed variant crosswalks. R1–R6 did not infer broad Traditional/Simplified or spelling equivalence automatically.
- `handled_structurally`: the complete Cifu surface can be segmented into existing runtime lexical tokens. This does **not** prove that the parser has the correct construction analysis.
- `surface_covered_sense_uncertain`: exact runtime surface exists, but the reading correspondence is not clean enough to treat the Cifu sense as securely matched.
- `manual_review`: Cifu-generated/undefined forms such as entries with generated Jyutping markers or `NO DEF` require manual lexical/corpus review.
- `missing`: no direct, reviewed-variant, structural, or uncertain-surface coverage was found. This is a candidate bucket, not an automatic import queue.

## Coverage change

| Class | Baseline before same-task additions | Final after 184 additions | Change |
|---|---:|---:|---:|
| `covered_main` | 439 | 623 | +184 |
| `covered_variant` | 0 | 0 | 0 |
| `handled_structurally` | 154 | 179 | +25 |
| `surface_covered_sense_uncertain` | 24 | 24 | 0 |
| `missing` | 1,041 | 833 | -208 |
| `manual_review` | 342 | 341 | -1 |
| **Total** | **2,000** | **2,000** | — |

Direct exact-surface coverage rose from **21.95%** to **31.15%**. Direct plus structurally segmentable coverage rose from **29.65%** to **40.10%**. These percentages describe this audit's surface-classification scheme only; they are not parser-accuracy scores.

## Accepted lexical additions

### R1 — 35 initial high-frequency gaps

`中間`, `下面`, `沙漠`, `終點`, `山`, `園`, `池`, `茅屋`, `頭先`, `右邊`, `一路`, `一直`, `左邊`, `港`, `湖`, `洞`, `點鐘`, `廟`, `線`, `樹`, `政府`, `塔`, `馬戲`, `角`, `韻`, `知道`, `繼續`, `恨`, `交叉`, `香`, `善`, `其實`, `譬如`, `但`, `亦`.

### R2 — 35 additional high-frequency gaps

`即係`, `或者`, `梗係`, `冇錯`, `另外`, `根本`, `枉`, `以前`, `之間`, `方向`, `泳池`, `位置`, `路`, `機場`, `迷宮`, `起點`, `南`, `工廠`, `城`, `球場`, `宅`, `蛇`, `葡萄`, `腰`, `科技`, `社會`, `方面`, `煙`, `經過`, `需要`, `搞`, `希望`, `滑雪`, `明白`, `感覺`.

### R3 — 35 noun/place gaps

`北方`, `東`, `碼頭`, `礦場`, `農莊`, `瀑布`, `墳場`, `樹林`, `禮堂`, `地盤`, `市場`, `國`, `西`, `水塘`, `國家`, `世界`, `萍`, `金字塔`, `農`, `情況`, `國旗`, `燈塔`, `纜車`, `效果`, `文字`, `圖`, `銅`, `地標`, `皮`, `鬼`, `電腦`, `英文`, `經濟`, `理由`, `法律`.

### R4 — 35 further nominal gaps

`虛線`, `將來`, `灣`, `室`, `樂園`, `自由`, `直線`, `性`, `林`, `東方`, `貨倉`, `關係`, `生活`, `法`, `方法`, `店`, `圖案`, `尾`, `意見`, `圖片`, `辦法`, `北`, `外國`, `財政`, `碑`, `距離`, `概念`, `人權`, `考試`, `杏`, `格`, `團`, `莊`, `頭`, `意`.

### R5 — 25 person/noun/temporal/discourse gaps

`女仔`, `男朋友`, `男人`, `汗`, `印`, `形`, `海`, `叢林`, `大陸`, `翻版`, `灘`, `西方`, `之前`, `即刻`, `最後`, `今年`, `早`, `當然`, `究竟`, `總之`, `重有`, `更加`, `基本上`, `突然`, `直接`.

### R6 — 19 behavior-tested stative gaps

`傻`, `勁`, `暖`, `濫`, `小`, `斜`, `瑞`, `重要`, `貧`, `彎`, `錯`, `舊`, `似`, `簡單`, `主要`, `怪`, `幼`, `普通`, `直`.

## Behavior boundary discovered during lexical filling

`死 sei2` was a plausible high-frequency lexical candidate, but adding it as a generic intransitive/change-of-state verb caused the existing parser to reinterpret the regression sentence `簽死幾耐啊？` as an `ActionStativeVP`. That parse change was not justified by the lexical evidence, so `死` was **removed from the lexical batch and remains unresolved**. The regression snapshot was not rebaselined.

By contrast, `其實` and later `即係` changed frozen snapshots only by replacing previously unknown character-level tokenization with source-supported lexical tokens. Those exact snapshot transitions were reviewed and accepted; no construction promotion was inferred from them.

This establishes the intended rule for future lexical work: **lexical evidence may justify a token, but a token is not accepted when its runtime affordances introduce an unsupported grammatical analysis.**

## Remaining frontier

The final audit still contains **833 `missing` surfaces** and **341 `manual_review` surfaces**. These numbers must not be interpreted as 1,174 straightforward words to add.

The high-frequency remaining frontier is increasingly dominated by:

- sentence-final or modal particles (`嘛`, `吔`, etc.);
- plural/classifier or classifier-like material (`哋`, `場`, `番`, etc.);
- highly polyfunctional single characters (`即`, `方`, `為`, `地`, etc.);
- motion/result/directional material (`穿過`, `往`, `出來`, etc.);
- multi-reading or sense-sensitive forms (`誒`, `哦`, `戀`, `丸`, `嶺`, etc.);
- predicates whose lexicalization can activate parser templates (`死` is the demonstrated negative case);
- Cifu-generated or undefined corpus strings kept in `manual_review` rather than treated as lexical entries.

These forms require behavior-specific lexical/grammar review, explicit variant work, or corpus adjudication. They should not be bulk-added to improve a coverage percentage.

## Reproducibility

Canonical audit data: `data/lexical-frequency/cifu-spoken-top-2000.tsv`.

Permanent audit tool: `tools/lexical-coverage/top-2000-audit.mjs`.

The tool is intended to reproduce the ranked list and coverage classification from a local copy of the pinned Cifu source. Temporary GitHub Actions acquisition/finalization workflows used during this audit are not part of the final repository state.

## Protected-state result

No construction identity, linguistic status, evidence sufficiency, survey/native-panel state, corpus adjudication, release state, or deployment state was promoted by frequency. Runtime changes are lexical-resource changes only, subject to the behavior boundary above.
