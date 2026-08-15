# Cifu ranks 1751–2000 lexical adjudication

Status: **expert adjudication in progress; research authority only; no runtime implementation authorized by this file alone**

Parent intake: #899  
Work claim: #900  
Mechanical evidence packet: #799 / #827 / merged PR #828

## Evidence firewall

- Cifu rank and exact written surface are discovery/frequency evidence only.
- Cifu English definitions have zero independent Cantonese lexical-semantic/POS authority.
- Cifu Jyutping is pronunciation-candidate metadata only unless independently corroborated.
- HKCanCor raw tags/readings and concordances are occurrence/context evidence, not final lexical truth.
- PyCantonese UD projections are navigation aids only.
- Runtime/tests are implementation evidence only and cannot decide Cantonese lexical facts.
- Zero HKCanCor hits do not imply non-Cantonese status.
- Shared-with-Mandarin forms are not contamination merely because they also occur in Mandarin.
- Mandarin-only senses/functions must not leak into a retained Cantonese surface.
- Transparent strings are `blocked_atomic` unless independent evidence establishes a lexicalized whole form.
- Independently established lexicalized MWEs may coexist with productive internal parses.

## Decision codes

- `reviewed_selection` — one secure lexical category/family for this pass.
- `multiple` — independently supported polyfunctionality/categories that must remain distinct.
- `reading_split` — distinct reviewed readings/categories that must remain reading-sensitive.
- `blocked_atomic` — no typed whole-surface lexeme from this rank; preserve component/construction analysis.
- `research_required` — evidence remains insufficient for final unrestricted whole-surface typing.

Runtime-consequence shorthand for later implementation:

- `T` — broad reviewed lexical entry may be implemented conservatively.
- `A` — preserve stable alternatives/readings/categories.
- `B` — do not band-promote as an atomic whole surface.
- `H` — hold band-specific typing pending more evidence.
- `M` — lexicalized MWE may coexist with productive component analysis.

## Progress accounting

The final 250-row count is not frozen until every rank has been reviewed. Current completed tranches:

| Range | reviewed_selection | multiple | reading_split | blocked_atomic | research_required | Total |
|---|---:|---:|---:|---:|---:|---:|
| 1751–1800 | 27 | 13 | 2 | 8 | 0 | 50 |
| 1801–1850 | 30 | 9 | 4 | 7 | 0 | 50 |
| **1751–1850 subtotal** | **57** | **22** | **6** | **15** | **0** | **100** |

## Authoritative ledger

### Ranks 1751–1800

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Runtime consequence |
|---:|---|---|---|---|---|
|1751|司長|reviewed_selection|person/title noun: director, department/bureau head|`si1 zoeng2`|T|
|1752|必要|multiple|stative/property “necessary” + abstract noun “necessity/need” where nominal syntax is independently present|`bit1 jiu3`|A|
|1753|本地|reviewed_selection|locality/common noun “the local area; locality”; attributive “local” use does not require a separate adjective by default|`bun2 dei6`|T|
|1754|正上方|blocked_atomic|transparent degree/orientation `正 + 上方` “directly above”|—|B|
|1755|正版|reviewed_selection|count/mass noun “authorized/genuine edition or copy”; attributive use remains nominal modification unless independent predicative evidence requires more|`zing3 baan2` independently observed in HKCanCor|T|
|1756|甩|reviewed_selection|verb family: come off / detach / lose / get rid of / escape|`lat1`|T|
|1757|光|multiple|stative/property “bright” + noun “light” + independently lexical adverbial/bare sense where supported; do not flatten these into one POS|`gwong1`|A|
|1758|再行|blocked_atomic|productive `再 + 行` sequence; no opaque whole lexical item established|—|B|
|1759|在|reviewed_selection|formal/written locative relation function “at/in/on; be present/exist” retained as Cantonese-compatible written/formal material; **do not import Mandarin progressive-marker `在 + VP` as a Cantonese lexical function**|`zoi6`|T|
|1760|好多人|blocked_atomic|productive degree/quantity nominal phrase `好 + 多 + 人`|—|B|
|1761|好快|blocked_atomic|productive degree + property phrase|—|B|
|1762|好近|blocked_atomic|productive degree + property phrase|—|B|
|1763|好遠|blocked_atomic|productive degree + property phrase|—|B|
|1764|妄想|multiple|verb “indulge in vain/wild hope; fantasize unrealistically” + noun “delusion/unrealistic idea”|`mong5 soeng2`|A|
|1765|忙|reviewed_selection|stative/predicate “busy”|`mong4`|T|
|1766|成年|reviewed_selection|verb/predicate “come of age; be legally adult”|`sing4 nin4`|T|
|1767|老細|reviewed_selection|person/role noun “boss; proprietor”|`lou5 sai3`|T|
|1768|自從|reviewed_selection|temporal relational/connective function “since; ever since”|`zi6 cung4`|T|
|1769|初頭|reviewed_selection|temporal noun/expression “at first; initially; the beginning”; adverbial placement is distributional|`co1 tau4`|T|
|1770|局|multiple|common/bound noun family “bureau/office; situation/round” + classifier/measure for games, matches, rounds|`guk6` ordinary nominal/classifier family; candidate `guk2` not promoted without independent evidence|A|
|1771|我問|blocked_atomic|pronoun + verb clause fragment `我 + 問`|—|B|
|1772|足夠|reviewed_selection|stative/predicate “enough; sufficient”|`zuk1 gau3`|T|
|1773|邪|multiple|stative/property “evil/heretical/strange” + noun/bound nominal “evil influence/misfortune” where nominal syntax is supported|`ce4`|A|
|1774|事業|reviewed_selection|abstract/count noun “career; undertaking; cause/enterprise”|`si6 jip6`|T|
|1775|兩點|blocked_atomic|ordinary numeral + time/point unit; exact string is productive rather than an opaque lexeme|—|B|
|1776|咀|multiple|noun spelling variant of `嘴` “mouth/spout/protruding landform” + slang verb “kiss”|`zeoi2`|A|
|1777|定義|multiple|noun “definition” + verb “define”|`ding6 ji6`|A|
|1778|忽然|reviewed_selection|adverb “suddenly”|`fat1 jin4`|T|
|1779|拃|reading_split|Cantonese `zaa6` classifier for handfuls/groups plus obstruction verb; distinct `zaa3` handspan measure family|`zaa6` classifier/verb vs `zaa3` handspan measure; Cifu unknown reading is superseded|A|
|1780|杯|multiple|count noun “cup/glass” + classifier/measure for cupfuls/drinks|`bui1`|A|
|1781|東面|reviewed_selection|spatial/locality noun “east side”|`dung1 min6`|T|
|1782|欣賞|reviewed_selection|verb “appreciate; admire; enjoy”|`jan1 soeng2`|T|
|1783|股價|reviewed_selection|finance noun “share/stock price”|`gu2 gaa3`|T|
|1784|表現|multiple|verb “show/manifest/display” + noun/event/result “performance; manifestation”|`biu2 jin6`|A|
|1785|長遠|reviewed_selection|stative/property “long-term; far-reaching”|`coeng4 jyun5`|T|
|1786|保險|multiple|noun “insurance” + stative/property “safe; cautious; on the safe side”|`bou2 him2`|A|
|1787|活動|multiple|noun/event “activity” + verb “move about; operate/be active”|`wut6 dung6`|A|
|1788|重心|reviewed_selection|abstract/spatial noun “centre of gravity; central core/focus”|`zung6 sam1`|T|
|1789|哲學|reviewed_selection|abstract/domain noun “philosophy”|`zit3 hok6`|T|
|1790|家人|reviewed_selection|person/kin collective noun “family member(s)”|`gaa1 jan4`|T|
|1791|晏晝|reviewed_selection|temporal noun/expression “afternoon”|`aan3 zau3`|T|
|1792|校|reading_split|school bound/nominal family vs proofread/check and military-rank bound family|`haau6` school family vs `gaau3` proofread/check and field-officer family; Mandarin classifier `所` material is excluded|A|
|1793|窄|reviewed_selection|stative/property “narrow”|`zaak3`|T|
|1794|粉|reviewed_selection|mass/count noun family “powder; flour/starch-derived food/noodles; cosmetic powder”|`fan2`|T|
|1795|做法|reviewed_selection|count/abstract noun “method; way of doing; practice”|`zou6 faat3`|T|
|1796|健康|multiple|abstract noun “health” + stative/property “healthy”|`gin6 hong1`|A|
|1797|唯一|reviewed_selection|exclusive property/determiner-like modifier “only; sole”|`wai4 jat1`|T|
|1798|唱片|reviewed_selection|count noun “record; music album”|`coeng3 pin2`|T|
|1799|婚姻|reviewed_selection|abstract/social noun “marriage; matrimony”|`fan1 jan1`|T|
|1800|接觸|multiple|verb “contact; touch; be in contact” + noun/event “contact”|`zip3 zuk1`|A|

### Ranks 1801–1850

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Runtime consequence |
|---:|---|---|---|---|---|
|1801|梗|reading_split|`gang2` stative/property “fixed/rigid” and certainty adverb “certainly”; distinct nominal `kwaang2` “stem/stalk” family|`gang2` property/adverb/bound vs `kwaang2` noun; Cifu `gang2` “stem” pairing rejected|A|
|1802|清|multiple|stative/property “clear/clean/pure” + verb “clear/clean/set straight”|`cing1`|A|
|1803|率|reading_split|formal `seot1` lead/command, frank/hasty and general-adverbial family vs `leot6` rate/ratio noun/measure-root family|`seot1` vs `leot6`|A|
|1804|現象|reviewed_selection|abstract/count noun “phenomenon”|`jin6 zoeng6`|T|
|1805|笪|multiple|Cantonese classifier/measure for a patch/plot/area + noun “rough bamboo mat”|`daat3`; Cifu surname material does not drive the runtime category|A|
|1806|第二個韻|blocked_atomic|transparent ordinal + classifier + noun phrase|—|B|
|1807|第時|reading_split|lexical temporal noun/expression “future; later; next time” with independently recorded colloquial reading variation|`dai6 si4` / `dai6 si2`; `第二時 dai6 ji6 si4` is a recorded variant form|A|
|1808|粗口|reviewed_selection|mass/count noun “swear words; obscene language”|`cou1 hau2`|T|
|1809|細妹|reviewed_selection|person/kin noun “younger sister”|`sai3 mui2`; packet candidate `mui6` is not promoted|T|
|1810|終|multiple|formal noun/bound “end/conclusion” + verb “end/finish” + adverbial “finally/in the end” family|`zung1`|A|
|1811|規則|reviewed_selection|count/abstract noun “rule; regulation”|`kwai1 zak1`|T|
|1812|通|multiple|verb “pass/connect/communicate/understand/clear” + property/bound “through/general” + classifier/measure for communications where independently licensed|`tung1`|A|
|1813|通知|multiple|verb “notify/inform” + noun “notification/notice”|`tung1 zi1`|A|
|1814|創意|reviewed_selection|abstract/count noun “creativity; creative idea”|`cong3 ji3`; no separate adjective promoted from attribution alone|T|
|1815|創新|multiple|stative/property “innovative/pioneering” + verb “innovate; introduce something new”|`cong3 san1`|A|
|1816|就講|blocked_atomic|productive focus/adverb + verb sequence|—|B|
|1817|幾日|blocked_atomic|productive interrogative/indefinite quantity + temporal noun phrase|—|B|
|1818|換|reviewed_selection|verb “change; exchange; replace”|`wun6`|T|
|1819|普通話|reviewed_selection|language-name noun “Putonghua; Mandarin”|`pou2 tung1 waa2`|T|
|1820|普遍|reviewed_selection|stative/property “general; widespread; common”|`pou2 pin3`|T|
|1821|評價|reviewed_selection|verb “evaluate; assess”|`ping4 gaa3`; noun is not promoted from the Cifu gloss without direct lexical evidence|T|
|1822|意義|reviewed_selection|abstract noun “meaning; significance”|`ji3 ji6`|T|
|1823|愛情|reviewed_selection|abstract/social noun “romantic love; love relationship”|`oi3 cing4`|T|
|1824|業|reviewed_selection|noun/bound nominal family “business; occupation; profession; field/study”|`jip6`|T|
|1825|業主|reviewed_selection|person/role noun “owner; proprietor; property owner”|`jip6 zyu2`|T|
|1826|當你|blocked_atomic|productive `當 + 你` sequence; interpretation depends on the ordinary lexical/constructional value of `當`|—|B|
|1827|當我|blocked_atomic|productive `當 + 我` sequence|—|B|
|1828|罪行|reviewed_selection|count/abstract legal noun “crime; offence”|`zeoi6 hang4`|T|
|1829|較|multiple|comparative degree/relation function “comparatively/rather” + formal verb “compare/contest/haggle”; other bound senses remain category-sensitive|`gaau3`|A|
|1830|遊戲|reviewed_selection|count/mass noun “game; play”|`jau4 hei3`|T|
|1831|電訊|reviewed_selection|domain/mass noun “telecommunications”|`din6 seon3`|T|
|1832|鼓勵|reviewed_selection|verb “encourage; support and motivate”|`gu2 lai6`|T|
|1833|嘔|reviewed_selection|verb “vomit; retch”|`au2`|T|
|1834|實際上|reviewed_selection|lexical adverbial expression “in fact; in reality; in practice”|`sat6 zai3 soeng6`; productive internal history does not erase the conventional adverbial|M|
|1835|慳|multiple|verb “save/economize” + stative/property “thrifty/frugal”|`haan1`|A|
|1836|樓下|reviewed_selection|spatial/locality noun “downstairs; area below”|`lau4 haa6`|T|
|1837|瘦|reviewed_selection|stative/property “thin; lean”|`sau3`|T|
|1838|賭|reviewed_selection|verb “gamble; bet”|`dou2`|T|
|1839|踩|reviewed_selection|verb family “step/tread/stamp/pedal; cross into”|`caai2`|T|
|1840|燕梳|reviewed_selection|Cantonese loan noun “insurance policy/insurance”, especially vehicle insurance|`jin3 so1`; packet alternative initial readings are not promoted|T|
|1841|遲|reviewed_selection|stative/property “late; delayed; slow”|`ci4`|T|
|1842|幫到|blocked_atomic|productive verb + result/potential complement sequence|—|B|
|1843|戲院|reviewed_selection|place/institution noun “cinema; theatre”|`hei3 jyun2`|T|
|1844|擦紙膠|reviewed_selection|count noun “eraser; rubber”|`caat3 zi2 gaau1`; independently established Cantonese lexical compound despite internal transparency|T|
|1845|營|multiple|noun/bound nominal “camp/barracks/battalion” + formal verb “operate/manage/run; seek”|`jing4`|A|
|1846|聯絡|reviewed_selection|verb “contact; get in touch with”|`lyun4 lok3`; nominal “contact” is not promoted without direct lexical evidence|T|
|1847|講法|reviewed_selection|count/abstract noun “way of saying; formulation; account/claim”|`gong2 faat3`|T|
|1848|講開|blocked_atomic|productive `講 + 開` sequence that participates in larger conventional discourse formulae such as `講開又講`; standalone opaque whole-lexeme status is not established by those larger formulae|—|B|
|1849|黏|reading_split|verb “stick/adhere” vs stative/property “sticky/glutinous” with independently distinguished readings|`nim4` verb vs `nim1` stative; packet `zim1` candidate not promoted without independent support|A|
|1850|禮拜三|reviewed_selection|temporal noun/expression “Wednesday”|`lai5 baai3 saam1`|T|

## Targeted independent checks

### Ranks 1751–1800

- 粵典 `妄想`: directly separates `mong5 soeng2` verb and noun entries.
- 粵典 `成年`: directly treats `sing4 nin4` as a verb/predicate “come of age; become an adult”.
- 粵典 `嘴 / 咀`: directly records `咀 zeoi2` both as a noun spelling variant of `嘴` and as a slang verb “kiss”.
- 粵典 `校`: directly separates `haau6` school material from `gaau3` proofread/check and military-field-officer bound material.
- 粵典 `保險`: directly records noun “insurance” and adjective/stative “safe/cautious”.
- CantoDict `邪`: records noun and adjective functions for `ce4` and Cantonese examples such as `中邪`.
- CantoDict `接觸`: records both verbal contact and nominal “a contact”.
- CantoDict `在`: supports shared formal locative/existential material, while its own progressive examples distinguish Standard-Chinese-only usage; therefore the Cifu progressive sense is not promoted into Cantonese runtime authority.
- **Corrected provenance for `拃`:** CantoDict directly records `zaa6` as an obstruction verb and Cantonese classifier for handfuls/groups, while 粵音資料集叢 independently records `zaa6` for the same Cantonese obstruction/classifier family and `zaa3` for handspan measurement. Earlier use of `笪` evidence for rank 1779 was erroneous and is superseded here.

### Ranks 1801–1850

- 粵典 `梗`: separates `gang2` fixed/rigid property and certainty-adverb material from `kwaang2` “stem/stalk” noun material; this rejects the Cifu `gang2 = stem` pairing.
- CantoDict `率`: distinguishes `seot1` lead/command/frank/general material from `leot6` rate/frequency/ratio material.
- CantoDict `笪`: directly records Cantonese `daat3` as a patch/plot classifier and bamboo-mat noun; the mechanical HKCanCor classifier evidence agrees.
- 粵典 `第時`: directly records the temporal noun with `dai6 si4` and `dai6 si2`, plus variant `第二時 dai6 ji6 si4`.
- 粵典 `細妹`: directly records younger-sister noun `sai3 mui2`, correcting the packet's final-tone candidate.
- 粵典 `通知`: directly separates noun “notification” and verb “notify/inform”.
- 粵典 `創新` gives a predicative property/adjective “innovative”; CantoDict independently records the verb “innovate”, so both are retained.
- CantoDict `較`: independently records comparative/adverbial and verbal comparison families rather than forcing the lone HKCanCor verb tag to decide the lexeme.
- 粵典/CantoDict `燕梳`: directly record the Cantonese insurance loan noun with ordinary reading `jin3 so1`.
- CantoDict/Wiktionary `擦紙膠`: independently record Cantonese `caat3 zi2 gaau1` “eraser/rubber”; this is lexicalized rather than blocked merely for being internally transparent.
- CantoDict `營`: directly records nominal military/camp material and formal verbal operate/manage material.
- CantoDict `聯絡` supports the verb “contact”; no separate noun is added from English gloss transfer alone.
- Larger Cantonese discourse formulae `講開又講` / `講開至講` establish that `講開` can be a constructional component, but do not by themselves justify an opaque standalone lexical atom.
- 粵典 `黏`: distinguishes `nim4` verb “stick/adhere” from `nim1` stative “sticky/glutinous”; Cifu candidate `zim1` remains unpromoted absent independent support.

## Interim notes

1. Raw HKCanCor POS labels remain useful occurrence evidence but are not final lexical categories: `梗` is a particularly clear example because all 11 packet hits are adverbial `gang2`, while the Cifu English gloss says “stem”; independent Cantonese evidence places the stem noun under a different reading `kwaang2`.
2. The Mandarin-contamination boundary remains analysis-specific rather than surface-wide: `在` retains formal Cantonese-compatible locative material while the Mandarin progressive-marker analysis is excluded; `校` remains a genuine Cantonese surface while the packet's explicitly Mandarin classifier gloss is excluded.
3. Transparent frequency strings (`好多人`, `好快`, `兩點`, `第二個韻`, `幾日`, `幫到`, etc.) remain useful source/provenance surfaces without being promoted into opaque lexical atoms.
4. Internal transparency alone is not a deletion criterion: conventional lexical items such as `擦紙膠` and the adverbial `實際上` are retained when independent Cantonese lexical evidence supports the whole form.

Next ledger tranche: ranks 1851–1900.
