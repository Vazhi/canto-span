# Issue #892 — Cifu ranks 1501–1750 lexical adjudication authority

Status: **authoritative lexical adjudication; runtime implementation not authorized by this file alone**

This document consolidates the mechanical packet from closed #798 / merged PR #826 and the later expert comments on #798 into one implementation-safe authority for Cifu SpokenAdult ranks 1501–1750. It supersedes the use of those issue comments as an implementation specification. The comments remain provenance.

## Evidence firewall

- Cifu SpokenAdult rank and exact written surface are discovery/frequency evidence.
- Cifu English definitions have zero independent Cantonese lexical-semantic/POS weight.
- Cifu Jyutping is candidate pronunciation metadata only.
- HKCanCor raw tags and concordance are occurrence/context evidence; UD projections are derived navigation aids.
- Frozen Rime-Cantonese may corroborate exact surface/readings only; it has zero POS/semantic/atomicity/frequency authority.
- Runtime/tests are implementation evidence only and cannot decide Cantonese lexical facts.
- `blocked_atomic` means no fabricated typed whole-surface lexeme. It does not mean delete a genuine Cantonese surface.
- Lexicalized multiword expressions may coexist with productive compositional parses. Internal analyzability alone is not a deletion criterion.

## Provenance codes

- `P1` — #798 comments 5269660396, 5275214033, and final closure 5275509106 (ranks 1501–1525).
- `P2` — 5275386892 (1526–1550).
- `P3` — 5275421896 (1551–1575).
- `P4` — 5275485541 (1576–1600).
- `P5` — 5275604662 (1601–1625).
- `P6` — 5275645723 (1626–1650).
- `P7` — 5275714952 (1651–1675).
- `P8` — 5275774646 (1676–1700).
- `P9` — 5275821195 (1701–1725).
- `P10` — 5275859524 (1726–1750).
- `B` — broad band-completion comment 5275392749; retained only where consistent with the later/fresh evidence.
- `R892` — targeted independent recheck performed during #892 consolidation.

## Decision and implementation codes

- `reviewed_selection`: one secure lexical category/family for this implementation pass.
- `multiple`: independently supported polyfunctionality/categories that must not be collapsed.
- `reading_split`: distinct readings/categories or an explicit reading correction that implementation must preserve.
- `blocked_atomic`: do not create a typed whole-surface lexeme from this rank; preserve ordinary component/construction analysis.
- `research_required`: secure evidence is insufficient for a final unrestricted whole-surface category; do not band-promote it.

Implementation consequence codes:

- `T` — typed broad lexical analysis is allowed; if a richer typed runtime analysis already exists, preserve it rather than flattening it.
- `A` — preserve stable alternatives/readings/categories; keep the effective default first unless the authority explicitly corrects it.
- `B` — no band-specific typed whole-surface analysis; neutral/exact surface coverage may remain where independently justified.
- `H` — hold band-specific typing pending stronger evidence.
- `M` — a lexicalized/conventional MWE analysis is allowed while the productive internal parse must remain available.

`—` in the Reading column means this consolidation establishes no independent pronunciation override. It does **not** promote a Cifu candidate reading to reviewed status.

## Final mutually exclusive accounting

| Class | Count |
|---|---:|
| `reviewed_selection` | 139 |
| `multiple` | 42 |
| `reading_split` | 16 |
| `blocked_atomic` | 45 |
| `research_required` | 8 |
| **Total** | **250** |

## Authoritative ledger

### Ranks 1501–1525

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Prov. | Runtime consequence |
|---:|---|---|---|---|---|---|
|1501|削|reviewed_selection|verb: cut/pare/sharpen|—|P1|T|
|1502|屋企人|reviewed_selection|person/kin noun: family member|—|P1|T|
|1503|架構|multiple|noun framework/structure + verb construct/structure|—|P1|A|
|1504|查|reviewed_selection|verb: check/investigate/search|—|P1|T|
|1505|要講|blocked_atomic|modal/verb + 講 sequence|—|P1|B|
|1506|重複|multiple|verb repeat/do again + adverbial again/repeatedly; no fabricated adjective|`cung4 fuk1`|P1|A|
|1507|倒|reading_split|fall/topple family vs reverse/invert/backwards family|`dou2` vs `dou3`|P1|A|
|1508|剛才|reviewed_selection|temporal expression/adverb: just now|—|P1|T|
|1509|容許|reviewed_selection|verb: allow/permit|—|P1|T|
|1510|效率|reviewed_selection|abstract/mass noun: efficiency|—|P1|T|
|1511|根據|multiple|relational coverb according to + noun basis/evidence + verb base on where syntax supports it|—|P1|A|
|1512|特登|reviewed_selection|manner/purpose adverb: deliberately/on purpose|—|P1|T|
|1513|假|reading_split|false/fake stative/property vs leave/holiday noun|`gaa2` vs `gaa3`|P1|A|
|1514|唪|reviewed_selection|verb/bound verbal lexeme: recite/chant loudly|`fung2`; reject Cifu `baa6` for this sense|P1|T|
|1515|從來|reviewed_selection|temporal/polarity-sensitive adverb: ever/always/from the beginning|—|P1|T|
|1516|教授|multiple|verb teach/instruct + person noun professor|—|P1|A|
|1517|焗|multiple|verb bake/heat/force/restrict + adjective stuffy|`guk6`|P1|A|
|1518|貨|reviewed_selection|mass/count noun: goods/merchandise|—|P1|T|
|1519|郭富城|reviewed_selection|proper person noun/name: Aaron Kwok|`gwok3 fu3 sing4`|P1|T|
|1520|幾咁|blocked_atomic|compositional degree construction|—|P1|B|
|1521|牌|reading_split|nominal family with independently supported reading variation|`paai4` / `paai2`|P1|A|
|1522|牌子|reviewed_selection|count noun: brand/sign/label|—|P1|T|
|1523|等於|reviewed_selection|predicate/verb: equal/be equivalent to|—|P1|T|
|1524|費事|multiple|spoken adverb/function not bother/so as to avoid + separate written adjectival troublesome use|`fai3 si6`|P1|A|
|1525|貼|reading_split|native stick/paste/keep-close/subsidize verb vs loan-derived tip/prediction verb|`tip3` vs `tip1`|P1|A|

### Ranks 1526–1550

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Prov. | Runtime consequence |
|---:|---|---|---|---|---|---|
|1526|媽咪|reviewed_selection|person/kin noun: mum/mummy|—|P2|T|
|1527|搞掂|reviewed_selection|lexicalized resultative verb/predicate: finish/settle/fix successfully|—|P2|M|
|1528|經常|reviewed_selection|frequency adverb: often/regularly|—|P2|T|
|1529|聖誕|reviewed_selection|holiday/time noun/expression: Christmas|—|P2|T|
|1530|預|multiple|verb anticipate/reserve/prepare/include in advance + bound/preposed pre-/in-advance function|—|P2|A|
|1531|認識|multiple|cognition verb know/recognize + abstract/event noun knowledge/awareness where instantiated|—|P2|A|
|1532|罷|research_required|secure formal/bound `baa6` stop/dismiss family; Cifu mixes unrelated Mandarin-style final-particle material; no unrestricted free category selected|`baa6` secure only as formal/bound family|P2+B+R892|H|
|1533|舖頭|reading_split|place/count noun shop/store with corrected ordinary reading|`pou3 tau2`; reject ordinary `tau4`|P2|A|
|1534|養魚|blocked_atomic|transparent verb-object raise/keep fish|—|P2|B|
|1535|錄音|multiple|verb record sound + noun sound recording|—|P2|A|
|1536|講講|blocked_atomic|productive verb reduplication|—|P2|B|
|1537|醫院|reviewed_selection|institution/place noun: hospital|—|P2|T|
|1538|離婚|reviewed_selection|verb/predicate: divorce/be divorced|—|P2|T|
|1539|壞|reading_split|ordinary bad/spoiled/broken stative and change-of-state uses share secure reading; packet `waai2` is not a free ordinary variant|`waai6`; do not promote `waai2` here|P2+B|A|
|1540|羅|research_required|secure proper surname `羅` plus formal/bound verbal material in compounds; no unrestricted free gauze/collect-gather inventory established for this surface|`lo4` secure; category breadth held|P2+B+R892|H|
|1541|辭典|reviewed_selection|count noun: dictionary|—|P2|T|
|1542|邊緣|reviewed_selection|spatial/abstract noun: edge/periphery/margin; no separate adjective from gloss alone|—|P2|T|
|1543|類|multiple|noun kind/type + classifier/category function; bound similarity uses remain linked rather than a free adjective by default|—|P2|A|
|1544|讓|reviewed_selection|formal/written verb: let/allow/yield|—|P2|T|
|1545|一件|blocked_atomic|numeral + classifier phrase|—|P2|B|
|1546|一部份|blocked_atomic|numeral + noun/measure phrase|—|P2|B|
|1547|一棵|blocked_atomic|numeral + plant classifier phrase|—|P2|B|
|1548|十年|blocked_atomic|numeral + temporal measure phrase|—|P2|B|
|1549|叉|multiple|noun fork/prong + lexical verb fork/pierce/cross + bound food-name use|—|P2|A|
|1550|中心|reviewed_selection|spatial/abstract noun: centre/core|—|P2|T|

### Ranks 1551–1575

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Prov. | Runtime consequence |
|---:|---|---|---|---|---|---|
|1551|中醫|reviewed_selection|noun: Traditional Chinese Medicine / practitioner|—|P3|T|
|1552|之中|reviewed_selection|spatial/abstract localizer expression: inside/among/within|—|P3|T|
|1553|互相|reviewed_selection|reciprocal adverb/function: mutually/each other|—|P3|T|
|1554|今個|blocked_atomic|productive temporal/determiner fragment `今 + 個`|—|P3|B|
|1555|太太|reviewed_selection|person/kin/title noun: wife/Mrs./madam|—|P3|T|
|1556|日後|reviewed_selection|temporal noun/localizer expression: later/in the future|—|P3|T|
|1557|主角|reviewed_selection|person/role noun: leading role/protagonist|—|P3|T|
|1558|主題|reviewed_selection|abstract/count noun: theme/topic|—|P3|T|
|1559|出聲|reviewed_selection|lexicalized verb expression: make a sound/speak up; internal VO structure remains visible|—|P3|M|
|1560|台灣|reviewed_selection|geographic proper noun: Taiwan|—|P3|T|
|1561|司|research_required|formal bound morphology/proper-name component is secure; no unrestricted free lexical POS selected|`si1` secure bound family|P3+B+R892|H|
|1562|犯|reading_split|verb offend/violate/commit offence + offender/criminal nominal family|`faan6` verb vs `faan2` nominal family|P3+R892|A|
|1563|白|multiple|stative white/clear/plain + adverbial/bound in-vain/free-of-charge families + surname|—|P3|A|
|1564|目的|reviewed_selection|abstract/count noun: purpose/aim/goal|—|P3|T|
|1565|先得|blocked_atomic|constructional `先 + 得` conditional/clause-final sequence|—|P3|B|
|1566|好少|blocked_atomic|degree `好` + quantity/property `少`|—|P3|B|
|1567|好笑|reviewed_selection|lexicalized stative/property expression: funny/laughable|—|P3|M|
|1568|好煩|blocked_atomic|ordinary degree `好` + property `煩`|—|P3|B|
|1569|扣|reviewed_selection|verb family: fasten/deduct/detain/arrest/button/spike|—|P3|T|
|1570|收埋|reviewed_selection|lexicalized complex verb: put away/hide/conceal; preserve internal structure|—|P3+B|M|
|1571|自信|reviewed_selection|secure abstract noun self-confidence; predicative property use does not justify a separate adjective without syntax|`zi6 seon3`|P3+R892|T|
|1572|作|reviewed_selection|formal verb: make/do/compose/write/pretend; nominal writings family not promoted as free noun here|—|P3+B|T|
|1573|你畫|blocked_atomic|pronoun + verb clause fragment|—|P3|B|
|1574|即要|blocked_atomic|connective/temporal `即` + modal/lexical `要`|—|P3|B|
|1575|夾|reading_split|verbal sandwich/wedge/mix/cooperate family vs noun clip/folder|`gaap3` verb vs `gaap2` noun; packet `gap3` normalized/reviewed, not auto-promoted|P3+B|A|

### Ranks 1576–1600

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Prov. | Runtime consequence |
|---:|---|---|---|---|---|---|
|1576|我識|blocked_atomic|pronoun + cognition/ability verb fragment|—|P4|B|
|1577|身體|reviewed_selection|body/health noun|—|P4|T|
|1578|兩條|blocked_atomic|numeral + classifier phrase|—|P4|B|
|1579|咁滯|reviewed_selection|degree/approximation adverbial: almost/nearly/roughly|—|P4|T|
|1580|拗|reading_split|bend/break family vs argue/obstinate family|`aau2` vs `aau3`|P4+B|A|
|1581|返轉頭|blocked_atomic|normal return/reversal sequence remains compositionally parsed; independent recheck did not establish an opaque whole-surface lexeme|—|P4+B+R892|B|
|1582|金融|reviewed_selection|domain noun: finance/banking; attributive financial use derives from nominal family unless independent predicative evidence appears|—|P4+B|T|
|1583|封|multiple|verb seal/bestow + classifier for letters/sealed items|—|P4|A|
|1584|政治|reviewed_selection|abstract/domain noun: politics; attributive political use is nominal modification by default|—|P4+B|T|
|1585|柱|reading_split|count noun pillar/column with corrected ordinary reading|`cyu5`; do not promote packet `zyu5` as standard|P4+B|A|
|1586|為止|reviewed_selection|relational/temporal boundary function: up to/until|—|P4|T|
|1587|界|reviewed_selection|noun/bound root: boundary/domain/sphere|—|P4|T|
|1588|閂|reviewed_selection|verb: shut/close/switch off; no independent free noun promoted|`saan1`|P4+B+R892|T|
|1589|面前|reviewed_selection|locative noun/localizer: in front of/in the presence of|—|P4|T|
|1590|食到|blocked_atomic|verb + result/potential complement sequence|—|P4|B|
|1591|個萍|research_required|classifier + opaque `萍` sequence; no definition/corpus support for a whole lexeme|—|P4+B|H|
|1592|唔錯|reviewed_selection|lexicalized stative/evaluative predicate: not bad/pretty good|—|P4|M|
|1593|庭|reviewed_selection|noun/bound nominal root: court/courtyard|—|P4|T|
|1594|秘書|reviewed_selection|person/occupation noun: secretary|—|P4|T|
|1595|站|multiple|noun station/site/branch + verb stand/halt|—|P4|A|
|1596|能|multiple|formal modal/function can/be able + bound nominal ability/energy family; no accidental AUX ontology|—|P4+B|A|
|1597|茶|reviewed_selection|mass/count noun: tea|—|P4|T|
|1598|骨折|reviewed_selection|medical result/event predicate: suffer/have a fracture; no separate free noun required by this authority|`gwat1 zit3`|P4+B+R892|T|
|1599|參考|multiple|verb consult/refer to + noun reference/basis for comparison|—|P4|A|
|1600|接|reviewed_selection|verb: receive/connect/take over/answer|—|P4|T|

### Ranks 1601–1625

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Prov. | Runtime consequence |
|---:|---|---|---|---|---|---|
|1601|痕|reviewed_selection|noun: mark/scar/trace; possible itchy stative remains unpromoted|—|P5|T|
|1602|細路仔|reading_split|person noun child/kid with corrected ordinary reading|`sai3 lou6 zai2`; reject Cifu final `zi2` for this word|P5+B|A|
|1603|速度|reviewed_selection|abstract noun: speed/rate/velocity|—|P5|T|
|1604|部門|reviewed_selection|organization/section noun: department/division|—|P5|T|
|1605|雀|reading_split|bird noun with independently supported standard and colloquial readings|`zoek3` standard; `zoek2` independent variant|P5+B|A|
|1606|單仲佳|research_required|zero-hit/no-definition probable proper-name or source artifact; no atomic category selected|—|P5+B|H|
|1607|就會|blocked_atomic|compositional focus/adverb + modal sequence|—|P5|B|
|1608|幾靚|blocked_atomic|compositional degree phrase|—|P5|B|
|1609|幾點|reviewed_selection|conventional interrogative time expression/pronominal MWE “what time”; preserve internal `幾 + 點` analysis|`gei2 dim2`|P5+B+R892|M|
|1610|掣|reading_split|noun button/switch/brake with corrected ordinary reading|`zai3`; do not promote Cifu `cit3` into this analysis|P5+B|A|
|1611|期|multiple|temporal/count noun period/term + classifier/measure for issues/courses/periods|—|P5|A|
|1612|琴日|reviewed_selection|temporal noun/expression: yesterday|—|P5|T|
|1613|畫一個|blocked_atomic|verb + numeral-classifier phrase|—|P5|B|
|1614|稅|reviewed_selection|abstract/count noun: tax/duty|—|P5|T|
|1615|黑色|reviewed_selection|color noun/property expression: black; ordinary attributive use does not require separate POS|—|P5|T|
|1616|傷害|reviewed_selection|verb: injure/harm|—|P5|T|
|1617|傾偈|reviewed_selection|lexical verb: chat/talk|—|P5|T|
|1618|感|research_required|secure noun/bound feeling/sense root; free written verbal feel/affect family requires separate evidence before band typing|—|P5+B|H|
|1619|損失|multiple|noun loss + verb lose/suffer a loss|—|P5|A|
|1620|會會|research_required|zero-hit reduplicated form without stable lexical evidence|—|P5+B|H|
|1621|照顧|reviewed_selection|verb: take care of/look after|—|P5|T|
|1622|運|multiple|verb move/transport/use + noun luck/fortune/fate|—|P5|A|
|1623|嘗試|multiple|verb try/attempt + noun/event attempt|—|P5|A|
|1624|監管|multiple|verb supervise/regulate + noun supervision/regulation where instantiated; no adjective from attribution alone|—|P5+B|A|
|1625|碧|research_required|secure jade-green/blue-green bound/property root; free noun vs stative syntax unresolved|—|P5+B|H|

### Ranks 1626–1650

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Prov. | Runtime consequence |
|---:|---|---|---|---|---|---|
|1626|網|reviewed_selection|count/mass noun: net/network|—|P6|T|
|1627|認真|multiple|stative serious/earnest + manner adverb seriously; verb take-seriously only where independently instantiated|—|P6|A|
|1628|增加|reviewed_selection|verb: increase/add|—|P6|T|
|1629|數字|reviewed_selection|count/abstract noun: digit/number/figure; numerical/digital attribution is not a separate adjective by default|—|P6+B|T|
|1630|熱|multiple|stative/adjective hot + noun heat; verbal change/causative remains unpromoted without syntax|—|P6+B|A|
|1631|鋪|reading_split|verb spread/lay/pave vs noun shop/store/classifier family|`pou1` vs `pou3`|P6+B|A|
|1632|燈|reviewed_selection|count noun: lamp/light|—|P6|T|
|1633|牆|reviewed_selection|count noun: wall|—|P6|T|
|1634|講多次|blocked_atomic|verb + quantity/repetition phrase|—|P6|B|
|1635|嚮|reviewed_selection|directional/relational coverb-preposition; orthographic variant of 向 in this use|—|P6|T|
|1636|關|multiple|verb close/turn off/concern + noun pass/barrier + surname Kwan|—|P6|A|
|1637|一刻|reviewed_selection|lexical temporal expression/pronominal time noun: an instant/the moment; compositional history does not erase the conventional entry|`jat1 hak1` / `jat1 haak1`|P6+B+R892|M|
|1638|一套|blocked_atomic|numeral + classifier phrase|—|P6|B|
|1639|一部|blocked_atomic|numeral + classifier phrase|—|P6|B|
|1640|十二點|blocked_atomic|compositional time expression|—|P6|B|
|1641|十分|reviewed_selection|lexicalized degree adverb: very/extremely; literal ten parts remains compositional|—|P6+B|T|
|1642|中學|reviewed_selection|institution/place noun: secondary school|—|P6|T|
|1643|之內|reviewed_selection|spatial/abstract localizer: within/inside|—|P6|T|
|1644|今|reviewed_selection|temporal deictic/bound function: now/current/this|—|P6|T|
|1645|內容|reviewed_selection|abstract/count noun: content/details|—|P6|T|
|1646|水草|reviewed_selection|mass/count noun: aquatic plants|—|P6|T|
|1647|牙|reviewed_selection|body-part/count noun: tooth|—|P6|T|
|1648|去過|blocked_atomic|verb 去 + experiential 過|—|P6|B|
|1649|正面|multiple|noun front/front side + property/manner positive/direct/front-facing|—|P6|A|
|1650|生產|multiple|verb produce/manufacture/give birth + event/mass noun production/childbirth|—|P6|A|

### Ranks 1651–1675

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Prov. | Runtime consequence |
|---:|---|---|---|---|---|---|
|1651|合理|reviewed_selection|stative/adjectival property: reasonable/rational|—|P7|T|
|1652|多過|blocked_atomic|transparent comparative `多 + 過`|—|P7|B|
|1653|好食|reviewed_selection|lexicalized stative/adjective: tasty/good to eat|—|P7|M|
|1654|好悶|blocked_atomic|ordinary degree + property phrase|—|P7|B|
|1655|好聽|reviewed_selection|lexicalized stative/adjective: pleasant to hear/sound good|—|P7|M|
|1656|成熟|reviewed_selection|stative/adjective: mature/ripe|—|P7|T|
|1657|早餐|reviewed_selection|meal/count noun: breakfast|—|P7|T|
|1658|曲線|multiple|noun curve/curved line + property/figurative indirect/roundabout use|—|P7|A|
|1659|西行|blocked_atomic|direction + motion expression westbound/go west|—|P7|B|
|1660|西面|reviewed_selection|spatial/localizer noun expression: west side|—|P7|T|
|1661|佔|reviewed_selection|verb: occupy/account for/constitute|—|P7|T|
|1662|判|reviewed_selection|verb: judge/sentence/decide|—|P7|T|
|1663|即將|reviewed_selection|prospective temporal/modal function: about to|—|P7|T|
|1664|形象|reviewed_selection|abstract/count noun: image/figure|—|P7|T|
|1665|投訴|multiple|verb complain/file complaint + noun/event complaint|—|P7|A|
|1666|私家|reviewed_selection|attributive/adjectival modifier: private/privately owned|—|P7|T|
|1667|兩日|blocked_atomic|numeral + temporal measure|—|P7|B|
|1668|兩樣|blocked_atomic|numeral + classifier/type expression|—|P7|B|
|1669|制|multiple|colloquial verb agree/accept/be willing + formal/bound system/control/regulate family; no accidental AUX category|—|P7|A|
|1670|呢種|blocked_atomic|demonstrative + classifier/type phrase|—|P7|B|
|1671|居民|reviewed_selection|person noun: resident/inhabitant|—|P7|T|
|1672|直角|reviewed_selection|count noun: right angle|—|P7|T|
|1673|空|multiple|stative empty/vacant + noun/bound air/sky/space + verb empty/make vacant|—|P7|A|
|1674|股份|reviewed_selection|count/abstract noun: share/stock|—|P7|T|
|1675|門口|reviewed_selection|place/localizer noun: doorway/entrance|—|P7|T|

### Ranks 1676–1700

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Prov. | Runtime consequence |
|---:|---|---|---|---|---|---|
|1676|既然|reviewed_selection|causal/concessive conjunction: since/as, this being the case|—|P8|T|
|1677|珍惜|reviewed_selection|verb: treasure/value/cherish|—|P8|T|
|1678|相處|reviewed_selection|reciprocal/social verb: get along/interact|—|P8|T|
|1679|相對|multiple|relational/stative relative/opposite + adverb relatively + verb face/oppose where syntax supports it|—|P8|A|
|1680|音|reviewed_selection|noun/bound noun: sound/tone/syllable/reading|—|P8|T|
|1681|個頭|blocked_atomic|classifier + noun phrase|—|P8|B|
|1682|員|reviewed_selection|person/member noun or bound nominal morpheme|—|P8|T|
|1683|唔多|blocked_atomic|negator + quantity predicate not much/not very|—|P8|B|
|1684|時效|reviewed_selection|abstract noun: timeliness/validity over time|—|P8|T|
|1685|校長|reviewed_selection|person/title noun: headmaster/principal|—|P8|T|
|1686|核突|reviewed_selection|stative adjective: ugly/disgusting|—|P8|T|
|1687|案件|reviewed_selection|legal noun: case|—|P8|T|
|1688|破壞|multiple|verb damage/destroy + event/result noun destruction/damage|—|P8|A|
|1689|財務|reviewed_selection|noun/bound nominal: financial affairs/finance|—|P8|T|
|1690|高過|blocked_atomic|comparative predicate `高 + 過`|—|P8|B|
|1691|乾淨|reviewed_selection|stative adjective: clean/neat|—|P8|T|
|1692|唱|reviewed_selection|verb: sing; figurative gossip use remains verbal|—|P8|T|
|1693|商業|reviewed_selection|domain noun/bound nominal: commerce/business|—|P8|T|
|1694|問吓|blocked_atomic|verb + delimitative particle/suffix|—|P8|B|
|1695|國內|reviewed_selection|locality noun/localizer: within the country/domestic sphere|—|P8|T|
|1696|最右|blocked_atomic|superlative + right-side localizer|—|P8|B|
|1697|最底|blocked_atomic|superlative + bottom/localizer|—|P8|B|
|1698|報告|multiple|noun report + verb report/inform/present|—|P8|A|
|1699|提到|reviewed_selection|verb: mention/refer to|—|P8|T|
|1700|插|reviewed_selection|verb: insert/stick/pierce/interpose|—|P8|T|

### Ranks 1701–1725

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Prov. | Runtime consequence |
|---:|---|---|---|---|---|---|
|1701|琴晚|reviewed_selection|temporal noun/adverbial time expression: last night|`kam4 maan5`|P9|T|
|1702|痛|reviewed_selection|stative adjective/predicate: painful/hurt/ache; noun not promoted without nominal syntax|`tung3`|P9+R892|T|
|1703|睇住|reviewed_selection|lexical verb MWE watch/keep an eye on/watch out + ordinary productive `睇 + 住` parse|`tai2 zyu6`|P9+B+R892|M|
|1704|窗|reviewed_selection|noun: window|`coeng1`|P9|T|
|1705|結|multiple|verb tie/bind/form/settle + noun knot/bond where instantiated|`git3`|P9|A|
|1706|貼住|blocked_atomic|ordinary `貼 + 住` sequence; no independent opaque lexeme established|—|P9|B|
|1707|開燈|blocked_atomic|transparent verb-object: turn on the light|—|P9|B|
|1708|溜|reviewed_selection|verb motion family: slip away/escape/skate; alternate candidates not promoted without evidence|`lau6` secure; `lau1/liu1` remain candidates|P9+B|T|
|1709|溫暖|reviewed_selection|stative adjective: warm|`wan1 nyun5`|P9|T|
|1710|罪|reviewed_selection|abstract/count noun: crime/guilt/sin/fault|`zeoi6`|P9|T|
|1711|補充|multiple|verb replenish/supplement/add + noun additional comment/supplement where nominal syntax is independently attested; adjective not separately required from attribution alone|`bou2 cung1`|P9+B+R892|A|
|1712|詳細|reviewed_selection|stative adjective: detailed; adverbial in-detail use is distributional|`coeng4 sai3`|P9|T|
|1713|誇張|multiple|verb exaggerate + stative adjective exaggerated/overstated|`kwaa1 zoeng1`|P9|A|
|1714|遇到|reviewed_selection|lexical verb: encounter/come across; preserve internal `遇 + 到` analysis|`jyu6 dou2`|P9|M|
|1715|電芯|reviewed_selection|noun: battery cell|`din6 sam1`|P9|T|
|1716|嘉賓|reviewed_selection|person/role noun: honoured guest|`gaa1 ban1`|P9|T|
|1717|對面|reviewed_selection|spatial locality noun/localizer: opposite/across from|`deoi3 min6`|P9|T|
|1718|製造|reviewed_selection|verb: manufacture/make; nominalization does not require separate noun|`zai3 zou6`|P9|T|
|1719|增長|multiple|verb grow/increase + abstract noun growth/increase where nominal syntax supports it|`zang1 zoeng2`|P9|A|
|1720|黎明|reviewed_selection|temporal/common noun: dawn/daybreak|`lai4 ming4`|P9|T|
|1721|橫線|reviewed_selection|noun: horizontal line|`waang4 sin3`|P9|T|
|1722|澳門|reviewed_selection|proper place noun: Macau|`ou3 mun2`|P9|T|
|1723|燒|reviewed_selection|primary verb: burn/cook/roast; fever/roast-food extensions do not create extra POS without syntax|`siu1`|P9+B|T|
|1724|興|reading_split|flourish/become-popular family vs interest/mood root|`hing1` vs `hing3`|P9+B|A|
|1725|龜|reviewed_selection|noun: turtle/tortoise; slang nominal senses remain noun family|`gwai1`|P9|T|

### Ranks 1726–1750

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Prov. | Runtime consequence |
|---:|---|---|---|---|---|---|
|1726|尷尬|reviewed_selection|stative adjective/predicate: awkward/embarrassed|—|P10|T|
|1727|闊|reviewed_selection|stative adjective/property: wide/broad/lavish|—|P10|T|
|1728|邊有|blocked_atomic|interrogative/rhetorical construction `邊 + 有`|—|P10|B|
|1729|響|multiple|sound verb + locative preposition at/in/on + locative/existential verb be at/in|all `hoeng2`|P10|A|
|1730|爛|multiple|stative rotten/broken/messy + degree/intensifying adverbial utterly/thoroughly; noun not promoted|—|P10|A|
|1731|聽過|blocked_atomic|verb + experiential 過|—|P10|B|
|1732|廳|reviewed_selection|place/room noun: hall/reception room/office|—|P10|T|
|1733|一句|blocked_atomic|numeral + classifier|—|P10|B|
|1734|一號|reviewed_selection|lexical noun sense: Hong Kong No. 1 typhoon signal; ordinary date/designation uses remain compositional|`jat1 hou6`|P10+B+R892|M|
|1735|九月|reviewed_selection|temporal noun/month name: September|—|P10|T|
|1736|人話|reviewed_selection|noun/expression: human/intelligible speech; sensible words, especially `講人話`|`jan4 waa6`|P10+B+R892|M|
|1737|千祈|reviewed_selection|emphatic adverb: by all means/whatever you do/definitely (not)|—|P10|T|
|1738|工人|reviewed_selection|person/occupation noun: worker|—|P10|T|
|1739|工業|reviewed_selection|noun: industry; industrial attribution is nominal modification by default|—|P10|T|
|1740|五個|blocked_atomic|numeral + classifier|—|P10|B|
|1741|及|multiple|formal conjunction and/as well as + bound/formal reach/involve morpheme family; no unrestricted ordinary free verb|`kap6`|P10+B+R892|A|
|1742|反對|multiple|verb oppose + noun opposition|—|P10|A|
|1743|巴士|reviewed_selection|noun: bus|—|P10|T|
|1744|心胸|reviewed_selection|abstract noun: breadth of mind/disposition|—|P10|T|
|1745|比例|reviewed_selection|noun: proportion/ratio/scale|—|P10|T|
|1746|牛肉|reviewed_selection|noun: beef|—|P10|T|
|1747|冬天|reviewed_selection|temporal noun: winter|—|P10|T|
|1748|出版|multiple|verb publish + nominal event/process publication where instantiated|—|P10|A|
|1749|半年|blocked_atomic|half + temporal measure|—|P10|B|
|1750|卡|reading_split|card noun vs classifier/measure train-compartment/carat family; jam/stuck verb only where context supports it|`kaat1` noun vs `kaa1` classifier/measure|P10|A|

## Conflict and supersession audit

The broad band-completion comment 5275392749 is not used as a blanket “later wins” authority. The following material conflicts are resolved explicitly:

| Rank | Surface | Earlier conflict | Consolidated resolution |
|---:|---|---|---|
|1532|罷|P2 `research_required`; B broad|`research_required`: Cantonese formal/bound `baa6` material is secure, but the Cifu row mixes Mandarin-style particle material and does not establish unrestricted free lexical POS. Words.hk compounds such as `罷工/罷免/罷市` support the bound/formal root, not the broad mixed row.|
|1540|羅|P2 `research_required`; B multiple|`research_required`: `羅 lo4` surname and formal/bound material are secure, but unrestricted free gauze/collect-gather categories are not established strongly enough for band typing.|
|1542|邊緣|P2 noun; B noun+adjective|noun only; attributive marginal/borderline use is not promoted as independent adjective without predicative/category evidence.|
|1561|司|P3 `research_required/bound`; B broad|retain `research_required/bound`; no unrestricted free category.|
|1562|犯|P3 multiple; B broad|reading/category split: `faan6` verbal offence family vs `faan2` offender/criminal nominal family.|
|1571|自信|P3 noun/property note; B broad|secure noun `自信`; do not fabricate separate adjective solely from predicative/attributive behavior.|
|1572|作|P3 formal verb; B verb+noun|formal verb only for this band; writings/works material remains bound/nominal follow-up until independent free syntax is supplied.|
|1581|返轉頭|P4 MWE suggestion; B blocked|`blocked_atomic`: independent examples support the normal return/reversal sequence, but no opaque whole-surface lexical entry was established; keep compositional motion parse.|
|1582|金融|P4 noun; B noun+adjective|noun only; financial attribution is nominal modification by default.|
|1584|政治|P4 noun; B noun+adjective|noun only; political attribution is nominal modification by default.|
|1588|閂|P4 verb+noun; B broad|verb only: Words.hk directly lexicalizes `閂 saan1` as close/shut/switch-off and does not supply a free bolt/latch noun for this graph.|
|1591|個萍|P4 research hold; B blocked|`research_required`, with implementation consequence equivalent to no atomic typing; opaque source string remains unresolved rather than being asserted compositional.|
|1598|骨折|P4 predicate/event with nominal possibility; B noun+verb|reviewed medical predicate/event lexical item; direct Cantonese evidence supports verbal use, and no separate noun analysis is required for this implementation pass.|
|1606|單仲佳|P5 research hold; B blocked|`research_required`: likely proper-name/source artifact; no atomic typing without identity evidence.|
|1609|幾點|P5 blocked; B broad|reviewed conventional interrogative time/pronominal expression `gei2 dim2`; Jyut Dictionary/Words.hk-derived data gives a dedicated `幾點` entry. Preserve the internal `幾 + 點` parse as well.|
|1618|感|P5 research hold; B multiple|`research_required`: noun/bound root is secure, but the free written verbal family is not promoted without stronger category-specific evidence.|
|1620|會會|P5 research hold; B blocked|`research_required`: zero-hit reduplicated source form, not enough evidence even to assert the intended compositional analysis.|
|1625|碧|P5 research hold; B multiple|`research_required`: secure blue-green/jade bound/property root, but free noun vs stative syntax is not settled.|
|1629|數字|P6 noun; B noun+adjective|noun only; numerical/digital attribution does not establish independent adjective POS.|
|1630|熱|P6 adjective+noun, verb pending; B adjective+noun+verb|multiple adjective/stative + noun; no verbal analysis without direct syntax.|
|1637|一刻|P6 provisional blocked; B broad|reviewed lexical temporal expression: Words.hk directly records `一刻` “the moment/an instant” with `jat1 haak1/jat1 hak1`; internal analyzability does not erase lexicalization.|
|1641|十分|P6 lexical degree adverb; B also literal measure|degree adverb only as lexical entry; literal ten-parts reading remains numeral+measure composition.|
|1702|痛|P9 adjective/predicate; B adjective+noun|stative adjective/predicate only; noun is not promoted absent direct nominal syntax.|
|1703|睇住|B blocked; P9 lexical verb + composition|lexical verb MWE plus productive `睇 + 住`: Words.hk directly records `睇住 tai2 zyu6` “watch over/keep an eye on/watch out”.|
|1708|溜|B three-reading split; P9 `lau6` secure|reviewed verb with secure `lau6`; `lau1/liu1` remain unpromoted pronunciation candidates until independent evidence supports their exact families.|
|1711|補充|B noun+verb+adjective; P9 noun+verb|multiple verb+noun; Words.hk directly records the verb, and an independent Cantonese teaching source records N/V use; attributive supplementary use does not force a separate adjective.|
|1723|燒|B verb+noun; P9 verb primary|verb only for free lexical POS in this pass; fever/roast-food extensions remain senses/bound uses unless direct nominal syntax establishes another entry.|
|1730|爛|B adjective/modifier; P10 adjective + degree adverbial|multiple adjective/stative + degree/intensifying adverbial; do not promote the lone noun tag.|
|1734|一號|P10 blocked date/designation; B broad|reviewed lexical noun **only for the Hong Kong No. 1 typhoon-signal sense**; date/designation readings remain compositional.|
|1736|人話|B blocked; P10 noun/expression|reviewed noun/expression “human/intelligible speech; sensible words”; zero HKCanCor hits do not override independent lexical evidence.|
|1741|及|B coordinator + free verb; P10 conjunction + bound/formal root|multiple conjunction + bound/formal reach/involve morpheme; no unrestricted ordinary free verb.|

### Independent recheck sources used by #892

These targeted checks resolve conflicts; they do not replace the original packet or the evidence contract.

- `閂`: https://words.hk/zidin/%E9%96%82 — verb `saan1` close/shut/switch off.
- `一刻`: https://words.hk/zidin/%E4%B8%80%E5%88%BB — lexical short-time expression with `jat1 haak1/jat1 hak1`.
- `睇住`: https://words.hk/zidin/%E7%9D%87%E4%BD%8F — verb `tai2 zyu6`, “watch over/keep an eye on/watch out”.
- `幾點`: https://jyutdictionary.com/dictionary/entry/%E5%B9%BE%E9%BB%9E — Words.hk-derived Cantonese entry `gei2 dim2`, “what time/when”.
- `補充`: https://words.hk/zidin/%E8%A3%9C%E5%85%85 and https://www.chattycantonese.com/2021/10/1-conversation-what-brings-us-to.html — direct Cantonese verb plus independent N/V attestation.
- `骨折`: https://jyutdictionary.com/dictionary/entry/%E9%AA%A8%E6%8A%98 and https://www.cantonese.sheik.co.uk/dictionary/words/30734/ — direct Cantonese predicate/event use and reading `gwat1 zit3`.
- `犯`: https://words.hk/zidin/%E7%8A%AF%E6%B3%95 and related Cantonese lexical entries support the `faan6` offence family; the distinct offender family is retained reading-sensitively rather than inferred from Cifu glosses.
- `及`: https://words.hk/zidin/%E5%8F%8A — conjunction plus formal/bound reach/involve morpheme family.

## Implementation boundary

This authority makes **no runtime change**. A separate runtime-reconciliation intake must compare these decisions with the then-current runtime and stable analysis IDs.

That implementation must:

1. keep all 250 ranks explicitly accounted for;
2. type `reviewed_selection` rows conservatively without flattening richer existing analyses;
3. preserve `multiple` and `reading_split` distinctions with stable analysis IDs;
4. give `blocked_atomic` rows no new typed whole-surface lexeme merely because they are Cifu-ranked strings;
5. give the eight `research_required` rows no band-specific typed promotion until their listed evidence obligations are resolved;
6. allow lexical MWE analyses and productive component/construction parses to coexist for rows marked `M`;
7. keep pronunciation candidates distinct from independently reviewed readings;
8. apply Mandarin-contamination policy separately and only with positive evidence;
9. run source-first focused lexical invariants, parser architecture checks, and live regression-debt ratchets before any version/state synchronization.

No construction identity/status, survey/native-panel state, corpus classification, release-publication state, or deployment state is changed by this document.
