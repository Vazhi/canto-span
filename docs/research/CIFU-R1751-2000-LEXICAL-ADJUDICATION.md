# Cifu ranks 1751–2000 lexical adjudication

Status: **authoritative lexical adjudication; no runtime implementation authorized by this file alone**

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

## Final accounting

| Class | Count |
|---|---:|
| `reviewed_selection` | 143 |
| `multiple` | 45 |
| `reading_split` | 23 |
| `blocked_atomic` | 37 |
| `research_required` | 2 |
| **Total** | **250** |

Mechanical integrity check: ranks 1751–2000 are represented exactly once with no gaps or duplicate ranks.

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
|1861|聽到|blocked_atomic|productive `聽 + 到` result/complement structure|—|B|
|1862|黐|multiple|verb “stick/adhere/cling” + stative “sticky”|`ci1`|A|
|1863|顯示|reviewed_selection|verb “show; display; demonstrate”; noun not promoted from corpus VN tagging alone|`hin2 si6`|T|
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
|1879|文|reading_split|`man4` noun/property family “writing, language, literature, culture” + Cantonese changed-tone money/classifier family + `man6` cover/paint-over verb|`man4`, changed-tone `man4*1`, `man6`|A|
|1880|止|multiple|formal verb “stop/halt/prohibit” + property/adverbial “still/calm/only” family; “until” belongs to larger forms such as `為止`|`zi2`|A|
|1881|火星|multiple|proper/celestial noun “Mars” + common noun “spark”|`fo2 sing1`|A|
|1882|仙人掌|reviewed_selection|plant noun “cactus”|`sin1 jan4 zoeng2`|T|
|1883|以往|reviewed_selection|temporal expression/adverb “in the past; previously”|`ji5 wong5`|T|
|1884|凹|reading_split|ordinary stative “concave/sunken” plus restricted alternate lexical/placename readings; packet `lap1` not adopted as general default|`nap1` ordinary; restricted `aau3` / `waa1`|A|
|1885|出席|reviewed_selection|verb “attend; be present”|`ceot1 zik6`|T|
|1886|出邊|reviewed_selection|spatial/locality noun “outside”|`ceot1 bin6`; packet `bin1` corrected|T|
|1887|加返|blocked_atomic|productive `加 + 返`|—|B|
|1888|可憐|reviewed_selection|stative/property “pitiful; pitiable; miserable”|`ho2 lin4`|T|
|1889|失|reviewed_selection|verb/bound verbal family “lose; miss; fail; lapse”|`sat1`|T|
|1890|民主|reviewed_selection|abstract/political noun “democracy”|`man4 zyu2`|T|
|1891|民建聯|reviewed_selection|proper organization abbreviation: Democratic Alliance for the Betterment and Progress of Hong Kong|`man4 gin3 lyun4`|T|
|1892|生物|reviewed_selection|count/domain noun “living organism; biological entity”|`sang1 mat6`|T|
|1893|由個|blocked_atomic|productive relation/function + classifier fragment|—|B|
|1894|全名|reviewed_selection|noun “full name”|`cyun4 meng2`; unresolved packet reading corrected|T|
|1895|合|reading_split|`hap6` combine/fit/whole family; `ho4` musical-note noun; `gap3` grain measure|`hap6` / `ho4` / `gap3`|A|
|1896|合法|reviewed_selection|stative/property “legal; lawful”|`hap6 faat3`|T|
|1897|吋|reviewed_selection|measure/classifier “inch”|`cyun3`|T|
|1898|同時|reviewed_selection|temporal/additive adverbial “simultaneously; at the same time; additionally”|`tung4 si4`|T|
|1899|同樣|reading_split|same/similar/equal property-adverbial family with independently recorded changed-tone “same type” reading|`tung4 joeng6` / changed-tone `tung4 joeng2`|A|
|1900|地球|reviewed_selection|celestial/common proper noun “Earth; the planet Earth”|`dei6 kau4`|T|

### Ranks 1901–1950

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Consequence |
|---:|---|---|---|---|---|
|1901|好人|reviewed_selection|person noun “good/decent person”|`hou2 jan4`|T|
|1902|好味|reviewed_selection|lexicalized stative “tasty; delicious”|`hou2 mei6`|M|
|1903|好靚|blocked_atomic|productive degree + stative phrase|—|B|
|1904|安全|multiple|abstract noun “safety/security” + stative “safe/secure”|`on1 cyun4`|A|
|1905|年青|reviewed_selection|stative/property “young; youthful”|`nin4 cing1`|T|
|1906|年齡|reviewed_selection|abstract/count noun “age”|`nin4 ling4`|T|
|1907|式|reviewed_selection|noun/bound nominal “form; type; style; pattern”|`sik1`|T|
|1908|攰|reviewed_selection|stative/predicate “tired”|`gui6`|T|
|1909|曲|multiple|noun “song/tune” + stative/property “bent/crooked” family|`kuk1`|A|
|1910|有份|reading_split|lexical expression “have a share/part; participate/be involved” with Cantonese changed tone|`jau5 fan2`; packet `fan6` corrected|A|
|1911|有位|blocked_atomic|productive existential/have + person-classifier phrase|—|B|
|1912|老公|reviewed_selection|kin noun “husband”|`lou5 gung1`|T|
|1913|考到|blocked_atomic|productive verb + result/potential complement|—|B|
|1914|行返|blocked_atomic|productive motion verb + directional/return complement|—|B|
|1915|行路|reviewed_selection|lexical verb expression “walk; travel on foot”|`haang4 lou6`|M|
|1916|你明|blocked_atomic|pronoun + predicate clause fragment|—|B|
|1917|你識|blocked_atomic|pronoun + cognition/ability verb fragment|—|B|
|1918|判斷|reading_split|verb “judge/determine” and nominal judgment family with corrected second-syllable reading|`pun3 dyun3` / `pun3 dyun6`; reject packet `tyun5`|A|
|1919|別人|reviewed_selection|formal person/pronominal noun “other person/people; others”|`bit6 jan4`|T|
|1920|完整|reviewed_selection|stative/property “complete; intact”|`jyun4 zing2`|T|
|1921|我明|blocked_atomic|pronoun + predicate clause fragment|—|B|
|1922|使錢|reviewed_selection|lexical verb expression “spend money”|`sai2 cin2`|M|
|1923|依然|reviewed_selection|adverb “still; as before”|`ji1 jin4`|T|
|1924|兔仔|reading_split|animal noun “rabbit/bunny” with corrected suffix reading|`tou3 zai2`; reject packet `zi2`|A|
|1925|兩位|blocked_atomic|productive numeral + respectful/person classifier phrase|—|B|
|1926|呢邊|reviewed_selection|deictic/locality expression “this side; here”|`ni1 bin1`|M|
|1927|味|multiple|noun “taste/smell/flavour” + verb “taste/savour” + classifier/measure family|`mei6`|A|
|1928|和|reading_split|formal conjunction/noun/property family plus distinct reading-sensitive respond-in-song and mahjong/mixing families|`wo4` / `wo6` / `wu2`|A|
|1929|姊妹|reading_split|kin/social noun “sisters; close female friends” with ordinary and changed-tone second-syllable readings|`zi2 mui6` / `zi2 mui2`|A|
|1930|定下|blocked_atomic|productive verb + directional/result sequence|—|B|
|1931|板|reviewed_selection|noun/bound nominal “board; plank; plate; slab; panel”|`baan2`; figurative stiff senses remain bound/extended rather than a separate free stative by default|T|
|1932|返番|blocked_atomic|productive return/repetition sequence; no opaque whole lexeme established|—|B|
|1933|侮辱|reviewed_selection|verb “insult; humiliate”|`mou5 juk6`|T|
|1934|保護|reviewed_selection|verb “protect; safeguard”|`bou2 wu6`|T|
|1935|哈哈|reviewed_selection|interjection/onomatopoeic laughter expression|`haa1 haa1`|T|
|1936|指示|multiple|verb “indicate/instruct” + noun “instruction/directive”|`zi2 si6`|A|
|1937|故|multiple|formal noun “reason/cause/event” + modifier “former/deceased/old” + connective/adverbial/verb families where independently licensed|`gu3`|A|
|1938|星|reviewed_selection|noun “star; celestial body”|`sing1`|T|
|1939|洲|reviewed_selection|geographic noun/bound nominal “continent; island/land mass”|`zau1`|T|
|1940|界定|reading_split|verb “define; delimit” with independently corrected reading|`gaai3 deng6`; packet `ding6` rejected as ordinary reading|A|
|1941|紅籌|reading_split|finance noun “red chip/red-chip stock” with Cantonese changed-tone standalone reading|`hung4 cau2`; bound/compound `cau4` remains distinct|A|
|1942|耶穌|reviewed_selection|proper person/religious name “Jesus”|`je4 sou1`|T|
|1943|背後|reviewed_selection|spatial/locality expression “behind; at the back”|`bui3 hau6`|T|
|1944|要畫|blocked_atomic|modal/verb + verb sequence|—|B|
|1945|飛碟|reviewed_selection|noun “flying saucer; frisbee”|`fei1 dip2`|T|
|1946|個案|reviewed_selection|count/abstract noun “case; individual case”|`go3 on3`|T|
|1947|原|multiple|formal modifier/property “original/former/raw” + noun “source/origin” + verb/bound family|`jyun4`|A|
|1948|哩件|blocked_atomic|demonstrative + classifier fragment; orthographic variation does not create a whole lexeme|—|B|
|1949|唔知幾|reviewed_selection|lexical Cantonese degree adverbial “very; extremely”|`m4 zi1 gei2`|M|
|1950|孭|reviewed_selection|verb “carry on the back/shoulder”|`me1`; packet unknown reading resolved|T|

### Ranks 1951–2000

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Consequence |
|---:|---|---|---|---|---|
|1951|旅遊|multiple|verb “travel/tour” + noun/event “travel/tourism”|`leoi5 jau4`|A|
|1952|特色|reviewed_selection|noun “distinctive feature/characteristic”|`dak6 sik1`|T|
|1953|特殊|reviewed_selection|stative/property “special; unusual; particular”|`dak6 syu4`|T|
|1954|狹窄|reviewed_selection|stative/property “narrow; cramped”|`haap6 zaak3`|T|
|1955|退|reviewed_selection|verb “retreat; withdraw; recede; decline”|`teoi3`|T|
|1956|針對|reviewed_selection|relational/transitive verb “target; direct at; address specifically”|`zam1 deoi3`|T|
|1957|偈|multiple|Cantonese `gai2` noun/bound lexical families, including conventional conversational and engine/condition material; formal Buddhist-gāthā material remains category/reading-sensitive and is not inferred from Cifu alone|`gai2` secure ordinary Cantonese family; Cifu `gai6/git6` candidates unpromoted absent independent support|A|
|1958|兜個|blocked_atomic|productive verb/preposition-like material + classifier fragment|—|B|
|1959|副|multiple|modifier/bound “secondary/deputy/vice-” + noun “deputy/assistant” + classifier for pairs/sets|`fu3`|A|
|1960|唯有|reviewed_selection|adverb/function “can only; have no choice but”|`wai4 jau5`|T|
|1961|專業|multiple|stative/property “professional” + abstract noun “professional expertise/profession”; Mainland university-major sense does not drive ordinary Cantonese typing|`zyun1 jip6`|A|
|1962|得滯|reviewed_selection|Cantonese excessive-degree function/suffix “too; excessively” following a predicate|`dak1 zai6`|M|
|1963|梳打|reviewed_selection|Cantonese loan noun “soda”|`so1 daa2`; packet `daa1` unpromoted|T|
|1964|淨|reading_split|formal/literary `zing6` and colloquial `zeng6` property/adverb/verb families “clean/pure/net; only; cleanse”|`zing6` / `zeng6`|A|
|1965|清晰|reviewed_selection|stative/property “clear; distinct”|`cing1 sik1`|T|
|1966|現實|multiple|abstract noun “reality” + stative/property “real; realistic; actual”|`jin6 sat6`|A|
|1967|船|reviewed_selection|count noun “boat; ship; vessel”|`syun4`|T|
|1968|規定|reviewed_selection|formal verb “stipulate; prescribe; set/fix”|`kwai1 ding6`; noun not promoted from broad gloss transfer without direct lexical evidence|T|
|1969|貨櫃|reviewed_selection|count noun “freight/shipping container”|`fo3 gwai6`|T|
|1970|責任|reviewed_selection|abstract/count noun “responsibility; duty; liability”|`zaak3 jam6`|T|
|1971|連埋|reviewed_selection|lexical/constructional inclusion expression “together with; including; add/include as well”|`lin4 maai4`|M|
|1972|陰|multiple|noun/bound “yin/shade/negative side” + stative/property “overcast/dark/hidden” + verb “trick/set up” family|`jam1`|A|
|1973|單位|reviewed_selection|count/abstract noun “unit; work unit; apartment/unit of measure”|`daan1 wai2`|T|
|1974|悶|multiple|stative “bored/stuffy/depressed” + verb “cover/smother/keep shut” family|`mun6`|A|
|1975|期間|reviewed_selection|temporal noun “period; during the period”|`kei4 gaan1`|T|
|1976|無謂|reviewed_selection|stative/property “pointless; needless; not worthwhile”|`mou4 wai6`|T|
|1977|發達|multiple|verb “develop/prosper/get rich” + stative/property “developed/prosperous”|`faat3 daat6`|A|
|1978|硬係|reading_split|Cantonese emphatic adverb “definitely; always/insistently” with independently attested changed-tone pronunciation|changed-tone `ngaang2 hai6` alongside base-linked `ngaang6 hai6`|A|
|1979|量|reading_split|`loeng4` verb “measure/consider” vs `loeng6` noun “amount/capacity” and estimate/quantity family|`loeng4` / `loeng6`|A|
|1980|開會|reviewed_selection|lexical verb expression “hold/attend a meeting”|`hoi1 wui2`|M|
|1981|傳|reading_split|`cyun4` verb “transmit/spread/pass on” vs `zyun6` noun “biography/account/commentary” family|`cyun4` / `zyun6`|A|
|1982|傳媒|reviewed_selection|collective/domain noun “media; mass media”|`cyun4 mui4`|T|
|1983|傾計|reading_split|lexical verb “chat; talk” with corrected final changed-tone reading|`king1 gai2`; packet `gai3` rejected|A|
|1984|會有|blocked_atomic|productive modal + existential/have sequence|—|B|
|1985|煩|multiple|stative “annoying/troublesome/fed up” + verb “bother/annoy/trouble”|`faan4`|A|
|1986|猷|research_required|formal/archaic `jau4` plan/scheme root is attested, but free-category breadth and modern Cantonese runtime status remain insufficiently established|`jau4` secure as formal/bound material|H|
|1987|運動|reviewed_selection|noun/event “exercise; sport; movement/campaign”; no free verb promoted without direct Cantonese verbal syntax|`wan6 dung6`|T|
|1988|圖標|reviewed_selection|count/domain noun “icon; graphical symbol”|`tou4 biu1`|T|
|1989|實際|multiple|abstract noun “reality/practice” + stative/property “actual; practical; realistic”|`sat6 zai3`|A|
|1990|監察|reviewed_selection|formal verb “monitor; supervise; inspect”|`gaam1 caat3`; noun not promoted without direct lexical evidence|T|
|1991|端|multiple|noun/bound “end/extremity/item/side” + formal verb “hold/carry level” + property/bound “upright/regular” family|`dyun1`|A|
|1992|網球|reviewed_selection|sport noun “tennis”|`mong5 kau4`|T|
|1993|齊|multiple|stative/property “complete/even/aligned” + adverb “together/all at once” + proper-name family|`cai4`|A|
|1994|價|reviewed_selection|noun/bound nominal “price; value; cost”|`gaa3`|T|
|1995|嘴|reviewed_selection|noun “mouth; beak; spout”; **exclude Cifu's Mandarin classifier `張` analysis**|`zeoi2`|T|
|1996|撈|reading_split|colloquial `lou1` “mix; earn/make a living, often opportunistically” vs `laau4` “scoop/dredge/fish out”; reject Cifu `lou4`|`lou1` / `laau4`|A|
|1997|數學|reviewed_selection|domain noun “mathematics”|`sou3 hok6`|T|
|1998|擁有|reviewed_selection|verb “possess; own; have”|`jung2 jau5`|T|
|1999|輸|reviewed_selection|verb “lose; transport/transmit” family, with ordinary free Cantonese default “lose”|`syu1`|T|
|2000|隨時|reviewed_selection|adverb “at any time; possibly/liable to at any time”|`ceoi4 si4`|T|

## Nontrivial adjudication notes

- `拃`: independent Cantonese sources support `zaa6` obstruction/classifier uses and `zaa3` handspan measurement. Earlier accidental use of `笪` evidence for this row is superseded.
- `在`: retain formal Cantonese-compatible locative/existential material but exclude the Mandarin progressive-marker analysis.
- `校`: retain `haau6` school and `gaau3` proofread/check families; exclude Cifu's Mandarin classifier gloss.
- `梗`: independent Cantonese evidence puts certainty/fixed material under `gang2` and the stem noun under `kwaang2`, rejecting Cifu's `gang2 = stem` pairing.
- `第時`: independently recorded as a Cantonese temporal noun with `dai6 si4` and `dai6 si2`.
- `擦紙膠`: independently attested Cantonese noun `caat3 zi2 gaau1`; internal transparency is not a deletion criterion.
- `轉頭`: independently lexicalized as the Cantonese temporal adverb “soon/shortly afterwards” alongside productive literal structure.
- `文`: independent Cantonese evidence distinguishes `man4`, changed-tone money/classifier material, and `man6` verbal material.
- `全名`: ordinary Cantonese reading is `cyun4 meng2`, resolving the packet candidate uncertainty.
- `有份`: changed-tone `fan2` is retained; packet `fan6` is not the reviewed default for the lexical expression.
- `判斷`: corrected to `pun3 dyun3/dyun6`; packet `tyun5` is rejected.
- `界定`: corrected to `gaai3 deng6` for the ordinary verb.
- `唔知幾`: independently lexicalized Cantonese degree adverb “very/extremely”; it is not blocked merely because its components are transparent.
- `專業`: retain independently supported professional-property and expertise/profession noun uses; do not let a Mainland-specific university-major gloss define ordinary Cantonese typing.
- `運動`: retain secure noun/event uses; a verb is not promoted from English gloss transfer alone without direct Cantonese verbal syntax.
- `嘴`: the Cantonese noun is valid, but the Cifu row's explicitly Mandarin `張` classifier material is contamination and must remain excluded from runtime analyses.
- `猷`: held as formal/bound `jau4` material pending stronger evidence for unrestricted modern runtime typing.

## Runtime implementation boundary

This document changes lexical adjudication only. A later separately claimed runtime reconciliation must:

1. preserve all 250 row decisions exactly;
2. apply reviewed readings only where this authority explicitly establishes them;
3. keep all 37 `blocked_atomic` rows free of new whole-surface band promotion;
4. keep `山個` and `猷` held unless later evidence supersedes this authority;
5. preserve lexicalized-MWE/productive-parse coexistence where marked `M`;
6. apply Mandarin-contamination exclusions at the analysis level, including `在`, `校`, and `嘴`;
7. register the band with the reusable lexical-ingestion audit rather than creating a parallel gate;
8. fill any independently verified component lexical gaps exposed by implementation testing immediately;
9. pass source-first build, focused lexical invariants, the 2,000-surface ingestion audit, parser architecture checks, and the repository regression-debt ratchet before any version synchronization.
