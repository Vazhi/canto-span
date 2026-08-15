# Cifu ranks 1751–2000 lexical adjudication

Status: **expert adjudication in progress; research authority only; no runtime implementation authorized by this file alone**

Current intake: #899  
Current work claim: #900  
Mechanical evidence packet: merged PR #828

## Evidence firewall

- Cifu rank and exact surface are discovery/frequency evidence only.
- Cifu English definitions have zero independent Cantonese lexical-semantic/POS authority.
- Cifu Jyutping is candidate pronunciation metadata unless independently corroborated.
- HKCanCor raw tags/readings/concordances are occurrence evidence, not final lexical truth.
- PyCantonese UD projections are navigation aids only.
- Runtime/tests cannot decide Cantonese lexical facts.
- Zero HKCanCor hits do not imply non-Cantonese status.
- Shared-with-Mandarin forms are not contamination merely because they also occur in Mandarin.
- Mandarin-only senses/functions must not leak into a retained Cantonese surface.
- Transparent strings are `blocked_atomic` unless independent evidence establishes a lexicalized whole form.
- Independently established lexicalized MWEs may coexist with productive internal parses.

## Decision codes

- `reviewed_selection` — one secure lexical category/family for this pass.
- `multiple` — independently supported polyfunctionality/categories that must remain distinct.
- `reading_split` — reviewed reading-sensitive distinctions or pronunciation corrections that must remain explicit.
- `blocked_atomic` — no typed whole-surface lexeme from this rank; preserve component/construction analysis.
- `research_required` — evidence remains insufficient for unrestricted whole-surface typing.

Later runtime shorthand: `T` broad reviewed entry; `A` stable alternatives/readings; `B` no atomic band promotion; `H` hold; `M` lexicalized MWE plus productive parse.

## Progress accounting

| Range | reviewed_selection | multiple | reading_split | blocked_atomic | research_required | Total |
|---|---:|---:|---:|---:|---:|---:|
| 1751–1800 | 27 | 13 | 2 | 8 | 0 | 50 |
| 1801–1850 | 30 | 9 | 4 | 7 | 0 | 50 |
| 1851–1900 | 32 | 5 | 4 | 8 | 1 | 50 |
| **1751–1900 subtotal** | **89** | **27** | **10** | **23** | **1** | **150** |

## Authoritative ledger

### Ranks 1751–1800

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Consequence |
|---:|---|---|---|---|---|
|1751|司長|reviewed_selection|person/title noun: director, department/bureau head|`si1 zoeng2`|T|
|1752|必要|multiple|stative/property “necessary” + abstract noun “necessity/need”|`bit1 jiu3`|A|
|1753|本地|reviewed_selection|locality/common noun “the local area; locality”|`bun2 dei6`|T|
|1754|正上方|blocked_atomic|transparent degree/orientation `正 + 上方`|—|B|
|1755|正版|reviewed_selection|noun “authorized/genuine edition or copy”|`zing3 baan2`|T|
|1756|甩|reviewed_selection|verb: come off / detach / lose / get rid of / escape|`lat1`|T|
|1757|光|multiple|stative “bright” + noun “light” + independently lexical adverbial/bare family|`gwong1`|A|
|1758|再行|blocked_atomic|productive `再 + 行`|—|B|
|1759|在|reviewed_selection|formal/written locative relation/existential material; exclude Mandarin progressive `在 + VP`|`zoi6`|T|
|1760|好多人|blocked_atomic|productive degree/quantity nominal phrase|—|B|
|1761|好快|blocked_atomic|productive degree + property phrase|—|B|
|1762|好近|blocked_atomic|productive degree + property phrase|—|B|
|1763|好遠|blocked_atomic|productive degree + property phrase|—|B|
|1764|妄想|multiple|verb “fantasize unrealistically” + noun “delusion/unrealistic idea”|`mong5 soeng2`|A|
|1765|忙|reviewed_selection|stative/predicate “busy”|`mong4`|T|
|1766|成年|reviewed_selection|verb/predicate “come of age; be legally adult”|`sing4 nin4`|T|
|1767|老細|reviewed_selection|person/role noun “boss; proprietor”|`lou5 sai3`|T|
|1768|自從|reviewed_selection|temporal relational/connective “since; ever since”|`zi6 cung4`|T|
|1769|初頭|reviewed_selection|temporal expression “at first; initially”|`co1 tau4`|T|
|1770|局|multiple|noun “bureau/office; situation/round” + classifier for games/matches/rounds|`guk6`; `guk2` not promoted|A|
|1771|我問|blocked_atomic|pronoun + verb clause fragment|—|B|
|1772|足夠|reviewed_selection|stative/predicate “enough; sufficient”|`zuk1 gau3`|T|
|1773|邪|multiple|stative “evil/heretical/strange” + noun/bound “evil influence/misfortune”|`ce4`|A|
|1774|事業|reviewed_selection|noun “career; undertaking; cause/enterprise”|`si6 jip6`|T|
|1775|兩點|blocked_atomic|productive numeral + time/point unit|—|B|
|1776|咀|multiple|noun spelling variant of `嘴` + slang verb “kiss”|`zeoi2`|A|
|1777|定義|multiple|noun “definition” + verb “define”|`ding6 ji6`|A|
|1778|忽然|reviewed_selection|adverb “suddenly”|`fat1 jin4`|T|
|1779|拃|reading_split|`zaa6` classifier for handfuls/groups + obstruction verb; `zaa3` handspan measure|`zaa6` vs `zaa3`|A|
|1780|杯|multiple|noun “cup/glass” + classifier/measure for cupfuls/drinks|`bui1`|A|
|1781|東面|reviewed_selection|spatial/locality noun “east side”|`dung1 min6`|T|
|1782|欣賞|reviewed_selection|verb “appreciate; admire; enjoy”|`jan1 soeng2`|T|
|1783|股價|reviewed_selection|finance noun “share/stock price”|`gu2 gaa3`|T|
|1784|表現|multiple|verb “show/manifest” + noun “performance/manifestation”|`biu2 jin6`|A|
|1785|長遠|reviewed_selection|stative/property “long-term; far-reaching”|`coeng4 jyun5`|T|
|1786|保險|multiple|noun “insurance” + stative “safe/cautious”|`bou2 him2`|A|
|1787|活動|multiple|noun “activity” + verb “move/operate/be active”|`wut6 dung6`|A|
|1788|重心|reviewed_selection|noun “centre of gravity; central focus”|`zung6 sam1`|T|
|1789|哲學|reviewed_selection|domain noun “philosophy”|`zit3 hok6`|T|
|1790|家人|reviewed_selection|person/kin collective noun “family member(s)”|`gaa1 jan4`|T|
|1791|晏晝|reviewed_selection|temporal expression “afternoon”|`aan3 zau3`|T|
|1792|校|reading_split|`haau6` school family vs `gaau3` proofread/check and field-officer family; exclude Mandarin classifier gloss|`haau6` vs `gaau3`|A|
|1793|窄|reviewed_selection|stative “narrow”|`zaak3`|T|
|1794|粉|reviewed_selection|noun “powder; flour/starch food/noodles; cosmetic powder”|`fan2`|T|
|1795|做法|reviewed_selection|noun “method; way of doing; practice”|`zou6 faat3`|T|
|1796|健康|multiple|noun “health” + stative “healthy”|`gin6 hong1`|A|
|1797|唯一|reviewed_selection|exclusive property/modifier “only; sole”|`wai4 jat1`|T|
|1798|唱片|reviewed_selection|noun “record; music album”|`coeng3 pin2`|T|
|1799|婚姻|reviewed_selection|noun “marriage; matrimony”|`fan1 jan1`|T|
|1800|接觸|multiple|verb “contact/touch” + noun/event “contact”|`zip3 zuk1`|A|

### Ranks 1801–1850

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Consequence |
|---:|---|---|---|---|---|
|1801|梗|reading_split|`gang2` fixed/rigid property and certainty adverb vs `kwaang2` stem/stalk noun; reject Cifu `gang2 = stem` pairing|`gang2` vs `kwaang2`|A|
|1802|清|multiple|stative “clear/clean/pure” + verb “clear/clean/set straight”|`cing1`|A|
|1803|率|reading_split|`seot1` lead/command/frank/general family vs `leot6` rate/ratio noun/measure root|`seot1` vs `leot6`|A|
|1804|現象|reviewed_selection|noun “phenomenon”|`jin6 zoeng6`|T|
|1805|笪|multiple|Cantonese classifier for a patch/plot/area + noun “rough bamboo mat”|`daat3`; surname gloss not promoted|A|
|1806|第二個韻|blocked_atomic|transparent ordinal + classifier + noun phrase|—|B|
|1807|第時|reading_split|temporal noun “future; later; next time” with recorded reading variation|`dai6 si4` / `dai6 si2`|A|
|1808|粗口|reviewed_selection|noun “swear words; obscene language”|`cou1 hau2`|T|
|1809|細妹|reviewed_selection|kin noun “younger sister”|`sai3 mui2`; reject packet `mui6`|T|
|1810|終|multiple|formal noun/bound “end” + verb “end/finish” + adverbial “finally”|`zung1`|A|
|1811|規則|reviewed_selection|noun “rule; regulation”|`kwai1 zak1`|T|
|1812|通|multiple|verb “pass/connect/communicate/understand” + property/bound “through/general” + communication measure family|`tung1`|A|
|1813|通知|multiple|verb “notify/inform” + noun “notification/notice”|`tung1 zi1`|A|
|1814|創意|reviewed_selection|noun “creativity; creative idea”|`cong3 ji3`|T|
|1815|創新|multiple|stative “innovative/pioneering” + verb “innovate”|`cong3 san1`|A|
|1816|就講|blocked_atomic|productive focus/adverb + verb sequence|—|B|
|1817|幾日|blocked_atomic|productive interrogative/indefinite quantity + temporal noun|—|B|
|1818|換|reviewed_selection|verb “change; exchange; replace”|`wun6`|T|
|1819|普通話|reviewed_selection|language-name noun “Putonghua; Mandarin”|`pou2 tung1 waa2`|T|
|1820|普遍|reviewed_selection|stative “general; widespread; common”|`pou2 pin3`|T|
|1821|評價|reviewed_selection|verb “evaluate; assess”; no noun promoted from Cifu gloss alone|`ping4 gaa3`|T|
|1822|意義|reviewed_selection|noun “meaning; significance”|`ji3 ji6`|T|
|1823|愛情|reviewed_selection|noun “romantic love; love relationship”|`oi3 cing4`|T|
|1824|業|reviewed_selection|noun/bound nominal “business; occupation; profession; field”|`jip6`|T|
|1825|業主|reviewed_selection|person/role noun “owner; proprietor”|`jip6 zyu2`|T|
|1826|當你|blocked_atomic|productive `當 + 你`|—|B|
|1827|當我|blocked_atomic|productive `當 + 我`|—|B|
|1828|罪行|reviewed_selection|legal noun “crime; offence”|`zeoi6 hang4`|T|
|1829|較|multiple|comparative degree/relation function + formal compare/contest verb family|`gaau3`|A|
|1830|遊戲|reviewed_selection|noun “game; play”|`jau4 hei3`|T|
|1831|電訊|reviewed_selection|domain noun “telecommunications”|`din6 seon3`|T|
|1832|鼓勵|reviewed_selection|verb “encourage”|`gu2 lai6`|T|
|1833|嘔|reviewed_selection|verb “vomit; retch”|`au2`|T|
|1834|實際上|reviewed_selection|lexical adverbial “in fact; in reality; in practice”|`sat6 zai3 soeng6`|M|
|1835|慳|multiple|verb “save/economize” + stative “thrifty/frugal”|`haan1`|A|
|1836|樓下|reviewed_selection|locality noun “downstairs; area below”|`lau4 haa6`|T|
|1837|瘦|reviewed_selection|stative “thin; lean”|`sau3`|T|
|1838|賭|reviewed_selection|verb “gamble; bet”|`dou2`|T|
|1839|踩|reviewed_selection|verb “step/tread/stamp/pedal”|`caai2`|T|
|1840|燕梳|reviewed_selection|Cantonese loan noun “insurance/insurance policy”|`jin3 so1`|T|
|1841|遲|reviewed_selection|stative “late; delayed; slow”|`ci4`|T|
|1842|幫到|blocked_atomic|productive verb + result/potential complement|—|B|
|1843|戲院|reviewed_selection|place noun “cinema; theatre”|`hei3 jyun2`|T|
|1844|擦紙膠|reviewed_selection|noun “eraser; rubber”; independently lexicalized Cantonese compound|`caat3 zi2 gaau1`|T|
|1845|營|multiple|noun/bound “camp/barracks/battalion” + formal verb “operate/manage”|`jing4`|A|
|1846|聯絡|reviewed_selection|verb “contact; get in touch with”; no noun promoted without direct lexical evidence|`lyun4 lok3`|T|
|1847|講法|reviewed_selection|noun “way of saying; formulation; account/claim”|`gong2 faat3`|T|
|1848|講開|blocked_atomic|productive `講 + 開`; larger discourse formulae do not prove an opaque standalone atom|—|B|
|1849|黏|reading_split|`nim4` verb “stick/adhere” vs `nim1` stative “sticky/glutinous”; packet `zim1` unpromoted|`nim4` vs `nim1`|A|
|1850|禮拜三|reviewed_selection|temporal expression “Wednesday”|`lai5 baai3 saam1`|T|

### Ranks 1851–1900

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Consequence |
|---:|---|---|---|---|---|
|1851|禮拜六|reviewed_selection|temporal expression “Saturday”|`lai5 baai3 luk6`|T|
|1852|翻譯|multiple|noun “translation; translator/interpreter” + verb “translate/interpret”|`faan1 jik6`|A|
|1853|轉右|blocked_atomic|productive directional action `轉 + 右`|—|B|
|1854|轉頭|reviewed_selection|lexical Cantonese temporal adverb “soon; shortly afterwards”; literal turn-head structure remains productive|`zyun3 tau4`|M|
|1855|額|reviewed_selection|noun/bound nominal “forehead; amount/quota/limit”|`ngaak6`|T|
|1856|鯉|reviewed_selection|noun “carp”|`lei5`|T|
|1857|穩定|reviewed_selection|stative/property “stable; steady”|`wan2 ding6`; no separate verb promoted from broad gloss transfer|T|
|1858|邊間|blocked_atomic|productive interrogative `邊 + 間` classifier phrase|—|B|
|1859|嚴重|reviewed_selection|stative/property “serious; severe”|`jim4 zung6`|T|
|1860|屬於|reviewed_selection|relational verb “belong to; be classified as”|`suk6 jyu1`|T|
|1861|聽到|blocked_atomic|productive `聽 + 到` result/complement structure; no opaque band atom required|—|B|
|1862|黐|multiple|verb “stick/adhere/cling” + stative “sticky”|`ci1`|A|
|1863|顯示|reviewed_selection|verb “show; display; demonstrate”|`hin2 si6`; noun not promoted from corpus VN tagging alone|T|
|1864|一模一樣|reviewed_selection|lexicalized stative/idiomatic expression “exactly the same; identical”|`jat1 mou4 jat1 joeng6`|M|
|1865|一邊|multiple|locality noun “one side” + constructional/adverbial member of paired simultaneous `一邊…一邊…` pattern|`jat1 bin1`|A|
|1866|九十度|blocked_atomic|productive numeral + degree measure|—|B|
|1867|人生|reviewed_selection|abstract noun “human life; a person's life”|`jan4 sang1`|T|
|1868|十一點|blocked_atomic|productive numeral + time/point expression|—|B|
|1869|上堂|reviewed_selection|lexical verb “attend class; give a lesson”; productive internal structure remains available|`soeng5 tong4`|M|
|1870|下畫|blocked_atomic|direction/localizer + verb fragment; no independent whole lexeme established|—|B|
|1871|山個|research_required|opaque/likely source-fragment string with zero corpus support; neither lexical identity nor intended composition is secure|—|H|
|1872|中國人|reviewed_selection|person/demonym noun “Chinese person/people”|`zung1 gwok3 jan4`|T|
|1873|五月|reviewed_selection|temporal noun/month name “May”|`ng5 jyut6`|T|
|1874|內心|reviewed_selection|abstract noun “inner feelings/thoughts; inner self”|`noi6 sam1`|T|
|1875|反映|reviewed_selection|verb “reflect; reveal; report/represent”|`faan2 jing2`|T|
|1876|天堂|reviewed_selection|place/abstract noun “heaven; paradise”|`tin1 tong4`|T|
|1877|太陽|reviewed_selection|celestial noun “the sun”|`taai3 joeng4`|T|
|1878|心態|reviewed_selection|abstract noun “mindset; mentality; attitude”|`sam1 taai3`|T|
|1879|文|reading_split|`man4` noun/property family “writing, language, literature, culture; literary/civil” + Cantonese changed-tone money/classifier family + `man6` cover/paint-over verb|`man4`, changed-tone `man4*1`, `man6`|A|
|1880|止|multiple|formal verb “stop/halt/prohibit” + property/adverbial “still/calm/only” family; relational “until” belongs to larger forms such as `為止`|`zi2`|A|
|1881|火星|multiple|proper/celestial noun “Mars” + common noun “spark”|`fo2 sing1`|A|
|1882|仙人掌|reviewed_selection|plant noun “cactus”|`sin1 jan4 zoeng2`|T|
|1883|以往|reviewed_selection|temporal expression/adverb “in the past; previously”|`ji5 wong5`|T|
|1884|凹|reading_split|stative “concave/sunken” with standard/colloquial `nap1` and restricted alternate readings; packet `lap1` is not promoted as the ordinary default|`nap1` ordinary; `aau3`/`waa1` limited lexical/placename traditions|A|
|1885|出席|reviewed_selection|verb “attend; be present”|`ceot1 zik6`|T|
|1886|出邊|reviewed_selection|spatial/locality noun “outside”|`ceot1 bin6`; packet `bin1` corrected|T|
|1887|加返|blocked_atomic|productive `加 + 返` sequence|—|B|
|1888|可憐|reviewed_selection|stative/property “pitiful; pitiable; miserable”|`ho2 lin4`|T|
|1889|失|reviewed_selection|verb/bound verbal family “lose; miss; fail; lapse”|`sat1`|T|
|1890|民主|reviewed_selection|abstract/political noun “democracy”|`man4 zyu2`|T|
|1891|民建聯|reviewed_selection|proper organization name/abbreviation for the Democratic Alliance for the Betterment and Progress of Hong Kong|`man4 gin3 lyun4`|T|
|1892|生物|reviewed_selection|count/domain noun “living organism; biological entity”|`sang1 mat6`|T|
|1893|由個|blocked_atomic|productive relation/function + classifier fragment|—|B|
|1894|全名|reviewed_selection|noun “full name”|`cyun4 meng2`; unresolved packet reading corrected|T|
|1895|合|reading_split|`hap6` combine/fit/whole/together family; `ho4` musical-note noun; `gap3` grain measure|`hap6` / `ho4` / `gap3`|A|
|1896|合法|reviewed_selection|stative/property “legal; lawful”|`hap6 faat3`|T|
|1897|吋|reviewed_selection|measure/classifier “inch”|`cyun3`|T|
|1898|同時|reviewed_selection|temporal/additive adverbial “simultaneously; at the same time; additionally”|`tung4 si4`|T|
|1899|同樣|reading_split|same/similar/equal property-adverbial family with independently recorded changed-tone “same type” reading|`tung4 joeng6` / changed-tone `tung4 joeng2`|A|
|1900|地球|reviewed_selection|celestial/common proper noun “Earth; the planet Earth”|`dei6 kau4`|T|

## Nontrivial evidence notes

- `拃`: CantoDict and 粵音資料集叢 independently support `zaa6` obstruction/classifier uses and `zaa3` handspan measurement. Earlier accidental citation of `笪` for this row is superseded.
- `在`: retain formal Cantonese-compatible locative/existential material but exclude the Mandarin progressive-marker analysis.
- `校`: retain `haau6` school and `gaau3` proofread/check families; exclude Cifu's Mandarin classifier gloss.
- `梗`: independent Cantonese evidence puts certainty/fixed material under `gang2` and the stem noun under `kwaang2`, rejecting Cifu's `gang2 = stem` pairing.
- `第時`: 粵典 records `dai6 si4` and `dai6 si2` for the temporal noun.
- `通知`: 粵典 directly separates noun and verb entries.
- `創新`: 粵典 independently supports the predicative property while CantoDict supports the innovate verb.
- `擦紙膠`: independently attested Cantonese noun `caat3 zi2 gaau1`; internal transparency is not a deletion criterion.
- `轉頭`: 粵典 directly records the Cantonese temporal adverb “soon/shortly afterwards”.
- `穩定`: 粵典 directly classifies the whole form as a stative/property; broader verbal possibilities are not promoted solely from character-level or gloss evidence.
- `黐`: CantoDict directly supports verb and adjective uses for `ci1`.
- `一邊`: CantoDict independently records the locality noun and the paired `一邊…一邊…` construction.
- `文`: CantoDict directly distinguishes `man4` noun/adjective families, a Cantonese changed-tone money/classifier use, and `man6` verbal material.
- `凹`: 粵音資料集叢 gives broad independent support to ordinary `nap1` plus restricted `aau3`/`waa1` traditions; the packet's `lap1` is not adopted as the general default.
- `出邊`: 粵典 directly records `出邊 ceot1 bin6` as a noun/locality variant of `出面`.
- `全名`: CantoDict directly records `cyun4 meng2`.
- `合`: CantoDict directly distinguishes `hap6`, `ho4`, and `gap3` lexical families.
- `火星`: CantoDict independently records both Mars and spark.
- `同樣`: CantoDict records the ordinary `joeng6` family and a changed-tone “same type” reading.

Next ledger tranche: ranks 1901–1950.
