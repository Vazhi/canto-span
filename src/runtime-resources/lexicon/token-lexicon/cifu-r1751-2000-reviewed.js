"use strict";

const SOURCE = "docs/research/CIFU-R1751-2000-LEXICAL-ADJUDICATION.md";
const KIND = Object.freeze({
  noun: ["what", "noun", "common_noun"], person: ["who", "noun", "person_noun"], place: ["where", "noun", "place_noun"],
  verb: ["doing", "verb", "verb"], adjective: ["like", "adjective", "stative_predicate"], adverb: ["how", "adverb", "adverb"],
  function: ["func", "function", "function"], classifier: ["what", "classifier", "classifier"], measure: ["what", "measure", "measure_word"],
  bound: ["func", "bound", "bound_morpheme"], coverb: ["func", "coverb", "coverb"], proper: ["what", "proper_noun", "proper_name"],
  localizer: ["where", "localizer", "localizer"], temporal: ["when", "noun", "temporal_expression"], interjection: ["func", "interjection", "interjection"],
});
function lexicalSpec(rank, kind, gloss, jyutping = "", syntax = "") { const meta = KIND[kind]; if (!meta) throw new Error("unknown lexical kind " + kind); return Object.freeze({ rank, kind, gloss, jyutping, label: meta[0], pos: meta[1], syntax: syntax || meta[2] }); }
const PROMOTION_ROWS = Object.freeze([
  [
    1751,
    "司長",
    "person",
    "person/title noun: director, department/bureau head",
    "si1 zoeng2"
  ],
  [
    1753,
    "本地",
    "localizer",
    "locality/common noun “the local area; locality”",
    "bun2 dei6"
  ],
  [
    1755,
    "正版",
    "noun",
    "noun “authorized/genuine edition or copy”",
    "zing3 baan2"
  ],
  [
    1756,
    "甩",
    "verb",
    "verb: come off / detach / lose / get rid of / escape",
    "lat1"
  ],
  [
    1759,
    "在",
    "coverb",
    "formal/written locative relation/existential material; exclude Mandarin progressive `在 + VP`",
    "zoi6"
  ],
  [
    1765,
    "忙",
    "adjective",
    "stative/predicate “busy”",
    "mong4"
  ],
  [
    1766,
    "成年",
    "verb",
    "verb/predicate “come of age; be legally adult”",
    "sing4 nin4"
  ],
  [
    1767,
    "老細",
    "person",
    "person/role noun “boss; proprietor”",
    "lou5 sai3"
  ],
  [
    1768,
    "自從",
    "function",
    "temporal relational/connective “since; ever since”",
    "zi6 cung4"
  ],
  [
    1769,
    "初頭",
    "temporal",
    "temporal expression “at first; initially”",
    "co1 tau4"
  ],
  [
    1772,
    "足夠",
    "adjective",
    "stative/predicate “enough; sufficient”",
    "zuk1 gau3"
  ],
  [
    1774,
    "事業",
    "noun",
    "noun “career; undertaking; cause/enterprise”",
    "si6 jip6"
  ],
  [
    1778,
    "忽然",
    "adverb",
    "adverb “suddenly”",
    "fat1 jin4"
  ],
  [
    1781,
    "東面",
    "localizer",
    "spatial/locality noun “east side”",
    "dung1 min6"
  ],
  [
    1782,
    "欣賞",
    "verb",
    "verb “appreciate; admire; enjoy”",
    "jan1 soeng2"
  ],
  [
    1783,
    "股價",
    "noun",
    "finance noun “share/stock price”",
    "gu2 gaa3"
  ],
  [
    1785,
    "長遠",
    "adjective",
    "stative/property “long-term; far-reaching”",
    "coeng4 jyun5"
  ],
  [
    1788,
    "重心",
    "noun",
    "noun “centre of gravity; central focus”",
    "zung6 sam1"
  ],
  [
    1789,
    "哲學",
    "noun",
    "domain noun “philosophy”",
    "zit3 hok6"
  ],
  [
    1790,
    "家人",
    "person",
    "person/kin collective noun “family member(s)”",
    "gaa1 jan4"
  ],
  [
    1791,
    "晏晝",
    "temporal",
    "temporal expression “afternoon”",
    "aan3 zau3"
  ],
  [
    1793,
    "窄",
    "adjective",
    "stative “narrow”",
    "zaak3"
  ],
  [
    1794,
    "粉",
    "noun",
    "noun “powder; flour/starch food/noodles; cosmetic powder”",
    "fan2"
  ],
  [
    1795,
    "做法",
    "noun",
    "noun “method; way of doing; practice”",
    "zou6 faat3"
  ],
  [
    1797,
    "唯一",
    "adjective",
    "exclusive property/modifier “only; sole”",
    "wai4 jat1"
  ],
  [
    1798,
    "唱片",
    "noun",
    "noun “record; music album”",
    "coeng3 pin2"
  ],
  [
    1799,
    "婚姻",
    "noun",
    "noun “marriage; matrimony”",
    "fan1 jan1"
  ],
  [
    1804,
    "現象",
    "noun",
    "noun “phenomenon”",
    "jin6 zoeng6"
  ],
  [
    1808,
    "粗口",
    "noun",
    "noun “swear words; obscene language”",
    "cou1 hau2"
  ],
  [
    1809,
    "細妹",
    "person",
    "kin noun “younger sister”",
    "sai3 mui2"
  ],
  [
    1811,
    "規則",
    "noun",
    "noun “rule; regulation”",
    "kwai1 zak1"
  ],
  [
    1814,
    "創意",
    "noun",
    "noun “creativity; creative idea”",
    "cong3 ji3"
  ],
  [
    1818,
    "換",
    "verb",
    "verb “change; exchange; replace”",
    "wun6"
  ],
  [
    1819,
    "普通話",
    "noun",
    "language-name noun “Putonghua; Mandarin”",
    "pou2 tung1 waa2"
  ],
  [
    1820,
    "普遍",
    "adjective",
    "stative “general; widespread; common”",
    "pou2 pin3"
  ],
  [
    1821,
    "評價",
    "verb",
    "verb “evaluate; assess”; no noun promoted from Cifu gloss alone",
    "ping4 gaa3"
  ],
  [
    1822,
    "意義",
    "noun",
    "noun “meaning; significance”",
    "ji3 ji6"
  ],
  [
    1823,
    "愛情",
    "noun",
    "noun “romantic love; love relationship”",
    "oi3 cing4"
  ],
  [
    1824,
    "業",
    "noun",
    "noun/bound nominal “business; occupation; profession; field”",
    "jip6"
  ],
  [
    1825,
    "業主",
    "person",
    "person/role noun “owner; proprietor”",
    "jip6 zyu2"
  ],
  [
    1828,
    "罪行",
    "noun",
    "legal noun “crime; offence”",
    "zeoi6 hang4"
  ],
  [
    1830,
    "遊戲",
    "noun",
    "noun “game; play”",
    "jau4 hei3"
  ],
  [
    1831,
    "電訊",
    "noun",
    "domain noun “telecommunications”",
    "din6 seon3"
  ],
  [
    1832,
    "鼓勵",
    "verb",
    "verb “encourage”",
    "gu2 lai6"
  ],
  [
    1833,
    "嘔",
    "verb",
    "verb “vomit; retch”",
    "au2"
  ],
  [
    1834,
    "實際上",
    "adverb",
    "lexical adverbial “in fact; in reality; in practice”",
    "sat6 zai3 soeng6"
  ],
  [
    1836,
    "樓下",
    "localizer",
    "locality noun “downstairs; area below”",
    "lau4 haa6"
  ],
  [
    1837,
    "瘦",
    "adjective",
    "stative “thin; lean”",
    "sau3"
  ],
  [
    1838,
    "賭",
    "verb",
    "verb “gamble; bet”",
    "dou2"
  ],
  [
    1839,
    "踩",
    "verb",
    "verb “step/tread/stamp/pedal”",
    "caai2"
  ],
  [
    1840,
    "燕梳",
    "noun",
    "Cantonese loan noun “insurance/insurance policy”",
    "jin3 so1"
  ],
  [
    1841,
    "遲",
    "adjective",
    "stative “late; delayed; slow”",
    "ci4"
  ],
  [
    1843,
    "戲院",
    "place",
    "place noun “cinema; theatre”",
    "hei3 jyun2"
  ],
  [
    1844,
    "擦紙膠",
    "noun",
    "noun “eraser; rubber”; independently lexicalized Cantonese compound",
    "caat3 zi2 gaau1"
  ],
  [
    1846,
    "聯絡",
    "verb",
    "verb “contact; get in touch with”; no noun promoted without direct lexical evidence",
    "lyun4 lok3"
  ],
  [
    1847,
    "講法",
    "noun",
    "noun “way of saying; formulation; account/claim”",
    "gong2 faat3"
  ],
  [
    1850,
    "禮拜三",
    "temporal",
    "temporal expression “Wednesday”",
    "lai5 baai3 saam1"
  ],
  [
    1851,
    "禮拜六",
    "temporal",
    "temporal expression “Saturday”",
    "lai5 baai3 luk6"
  ],
  [
    1854,
    "轉頭",
    "temporal",
    "lexical Cantonese temporal adverb “soon; shortly afterwards”; literal turn-head structure remains productive",
    "zyun3 tau4"
  ],
  [
    1855,
    "額",
    "noun",
    "noun/bound nominal “forehead; amount/quota/limit”",
    "ngaak6"
  ],
  [
    1856,
    "鯉",
    "noun",
    "noun “carp”",
    "lei5"
  ],
  [
    1857,
    "穩定",
    "adjective",
    "stative/property “stable; steady”",
    "wan2 ding6"
  ],
  [
    1859,
    "嚴重",
    "adjective",
    "stative/property “serious; severe”",
    "jim4 zung6"
  ],
  [
    1860,
    "屬於",
    "verb",
    "relational verb “belong to; be classified as”",
    "suk6 jyu1"
  ],
  [
    1863,
    "顯示",
    "verb",
    "verb “show; display; demonstrate”; noun not promoted from corpus VN tagging alone",
    "hin2 si6"
  ],
  [
    1864,
    "一模一樣",
    "adjective",
    "lexicalized stative/idiomatic expression “exactly the same; identical”",
    "jat1 mou4 jat1 joeng6"
  ],
  [
    1867,
    "人生",
    "noun",
    "abstract noun “human life; a person's life”",
    "jan4 sang1"
  ],
  [
    1869,
    "上堂",
    "verb",
    "lexical verb “attend class; give a lesson”; productive internal structure remains available",
    "soeng5 tong4"
  ],
  [
    1872,
    "中國人",
    "person",
    "person/demonym noun “Chinese person/people”",
    "zung1 gwok3 jan4"
  ],
  [
    1873,
    "五月",
    "temporal",
    "temporal noun/month name “May”",
    "ng5 jyut6"
  ],
  [
    1874,
    "內心",
    "noun",
    "abstract noun “inner feelings/thoughts; inner self”",
    "noi6 sam1"
  ],
  [
    1875,
    "反映",
    "verb",
    "verb “reflect; reveal; report/represent”",
    "faan2 jing2"
  ],
  [
    1876,
    "天堂",
    "place",
    "place/abstract noun “heaven; paradise”",
    "tin1 tong4"
  ],
  [
    1877,
    "太陽",
    "noun",
    "celestial noun “the sun”",
    "taai3 joeng4"
  ],
  [
    1878,
    "心態",
    "noun",
    "abstract noun “mindset; mentality; attitude”",
    "sam1 taai3"
  ],
  [
    1882,
    "仙人掌",
    "noun",
    "plant noun “cactus”",
    "sin1 jan4 zoeng2"
  ],
  [
    1883,
    "以往",
    "temporal",
    "temporal expression/adverb “in the past; previously”",
    "ji5 wong5"
  ],
  [
    1885,
    "出席",
    "verb",
    "verb “attend; be present”",
    "ceot1 zik6"
  ],
  [
    1886,
    "出邊",
    "localizer",
    "spatial/locality noun “outside”",
    "ceot1 bin6"
  ],
  [
    1888,
    "可憐",
    "adjective",
    "stative/property “pitiful; pitiable; miserable”",
    "ho2 lin4"
  ],
  [
    1889,
    "失",
    "verb",
    "verb/bound verbal family “lose; miss; fail; lapse”",
    "sat1"
  ],
  [
    1890,
    "民主",
    "noun",
    "abstract/political noun “democracy”",
    "man4 zyu2"
  ],
  [
    1891,
    "民建聯",
    "proper",
    "proper organization abbreviation: Democratic Alliance for the Betterment and Progress of Hong Kong",
    "man4 gin3 lyun4"
  ],
  [
    1892,
    "生物",
    "noun",
    "count/domain noun “living organism; biological entity”",
    "sang1 mat6"
  ],
  [
    1894,
    "全名",
    "noun",
    "noun “full name”",
    "cyun4 meng2"
  ],
  [
    1896,
    "合法",
    "adjective",
    "stative/property “legal; lawful”",
    "hap6 faat3"
  ],
  [
    1897,
    "吋",
    "measure",
    "measure/classifier “inch”",
    "cyun3"
  ],
  [
    1898,
    "同時",
    "temporal",
    "temporal/additive adverbial “simultaneously; at the same time; additionally”",
    "tung4 si4"
  ],
  [
    1900,
    "地球",
    "proper",
    "celestial/common proper noun “Earth; the planet Earth”",
    "dei6 kau4"
  ],
  [
    1901,
    "好人",
    "person",
    "person noun “good/decent person”",
    "hou2 jan4"
  ],
  [
    1902,
    "好味",
    "adjective",
    "lexicalized stative “tasty; delicious”",
    "hou2 mei6"
  ],
  [
    1905,
    "年青",
    "adjective",
    "stative/property “young; youthful”",
    "nin4 cing1"
  ],
  [
    1906,
    "年齡",
    "noun",
    "abstract/count noun “age”",
    "nin4 ling4"
  ],
  [
    1907,
    "式",
    "noun",
    "noun/bound nominal “form; type; style; pattern”",
    "sik1"
  ],
  [
    1908,
    "攰",
    "adjective",
    "stative/predicate “tired”",
    "gui6"
  ],
  [
    1912,
    "老公",
    "person",
    "kin noun “husband”",
    "lou5 gung1"
  ],
  [
    1915,
    "行路",
    "verb",
    "lexical verb expression “walk; travel on foot”",
    "haang4 lou6"
  ],
  [
    1919,
    "別人",
    "noun",
    "formal person/pronominal noun “other person/people; others”",
    "bit6 jan4"
  ],
  [
    1920,
    "完整",
    "adjective",
    "stative/property “complete; intact”",
    "jyun4 zing2"
  ],
  [
    1922,
    "使錢",
    "verb",
    "lexical verb expression “spend money”",
    "sai2 cin2"
  ],
  [
    1923,
    "依然",
    "adverb",
    "adverb “still; as before”",
    "ji1 jin4"
  ],
  [
    1926,
    "呢邊",
    "localizer",
    "deictic/locality expression “this side; here”",
    "ni1 bin1"
  ],
  [
    1931,
    "板",
    "noun",
    "noun/bound nominal “board; plank; plate; slab; panel”",
    "baan2"
  ],
  [
    1933,
    "侮辱",
    "verb",
    "verb “insult; humiliate”",
    "mou5 juk6"
  ],
  [
    1934,
    "保護",
    "verb",
    "verb “protect; safeguard”",
    "bou2 wu6"
  ],
  [
    1935,
    "哈哈",
    "interjection",
    "interjection/onomatopoeic laughter expression",
    "haa1 haa1"
  ],
  [
    1938,
    "星",
    "noun",
    "noun “star; celestial body”",
    "sing1"
  ],
  [
    1939,
    "洲",
    "noun",
    "geographic noun/bound nominal “continent; island/land mass”",
    "zau1"
  ],
  [
    1942,
    "耶穌",
    "proper",
    "proper person/religious name “Jesus”",
    "je4 sou1"
  ],
  [
    1943,
    "背後",
    "localizer",
    "spatial/locality expression “behind; at the back”",
    "bui3 hau6"
  ],
  [
    1945,
    "飛碟",
    "noun",
    "noun “flying saucer; frisbee”",
    "fei1 dip2"
  ],
  [
    1946,
    "個案",
    "noun",
    "count/abstract noun “case; individual case”",
    "go3 on3"
  ],
  [
    1949,
    "唔知幾",
    "adverb",
    "lexical Cantonese degree adverbial “very; extremely”",
    "m4 zi1 gei2"
  ],
  [
    1950,
    "孭",
    "verb",
    "verb “carry on the back/shoulder”",
    "me1"
  ],
  [
    1952,
    "特色",
    "noun",
    "noun “distinctive feature/characteristic”",
    "dak6 sik1"
  ],
  [
    1953,
    "特殊",
    "adjective",
    "stative/property “special; unusual; particular”",
    "dak6 syu4"
  ],
  [
    1954,
    "狹窄",
    "adjective",
    "stative/property “narrow; cramped”",
    "haap6 zaak3"
  ],
  [
    1955,
    "退",
    "verb",
    "verb “retreat; withdraw; recede; decline”",
    "teoi3"
  ],
  [
    1956,
    "針對",
    "verb",
    "relational/transitive verb “target; direct at; address specifically”",
    "zam1 deoi3"
  ],
  [
    1960,
    "唯有",
    "adverb",
    "adverb/function “can only; have no choice but”",
    "wai4 jau5"
  ],
  [
    1962,
    "得滯",
    "function",
    "Cantonese excessive-degree function/suffix “too; excessively” following a predicate",
    "dak1 zai6"
  ],
  [
    1963,
    "梳打",
    "noun",
    "Cantonese loan noun “soda”",
    "so1 daa2"
  ],
  [
    1965,
    "清晰",
    "adjective",
    "stative/property “clear; distinct”",
    "cing1 sik1"
  ],
  [
    1967,
    "船",
    "noun",
    "count noun “boat; ship; vessel”",
    "syun4"
  ],
  [
    1968,
    "規定",
    "verb",
    "formal verb “stipulate; prescribe; set/fix”",
    "kwai1 ding6"
  ],
  [
    1969,
    "貨櫃",
    "noun",
    "count noun “freight/shipping container”",
    "fo3 gwai6"
  ],
  [
    1970,
    "責任",
    "noun",
    "abstract/count noun “responsibility; duty; liability”",
    "zaak3 jam6"
  ],
  [
    1971,
    "連埋",
    "function",
    "lexical/constructional inclusion expression “together with; including; add/include as well”",
    "lin4 maai4"
  ],
  [
    1973,
    "單位",
    "noun",
    "count/abstract noun “unit; work unit; apartment/unit of measure”",
    "daan1 wai2"
  ],
  [
    1975,
    "期間",
    "temporal",
    "temporal noun “period; during the period”",
    "kei4 gaan1"
  ],
  [
    1976,
    "無謂",
    "adjective",
    "stative/property “pointless; needless; not worthwhile”",
    "mou4 wai6"
  ],
  [
    1980,
    "開會",
    "verb",
    "lexical verb expression “hold/attend a meeting”",
    "hoi1 wui2"
  ],
  [
    1982,
    "傳媒",
    "noun",
    "collective/domain noun “media; mass media”",
    "cyun4 mui4"
  ],
  [
    1987,
    "運動",
    "verb",
    "noun/event “exercise; sport; movement/campaign”; no free verb promoted without direct Cantonese verbal syntax",
    "wan6 dung6"
  ],
  [
    1988,
    "圖標",
    "noun",
    "count/domain noun “icon; graphical symbol”",
    "tou4 biu1"
  ],
  [
    1990,
    "監察",
    "verb",
    "formal verb “monitor; supervise; inspect”",
    "gaam1 caat3"
  ],
  [
    1992,
    "網球",
    "noun",
    "sport noun “tennis”",
    "mong5 kau4"
  ],
  [
    1994,
    "價",
    "noun",
    "noun/bound nominal “price; value; cost”",
    "gaa3"
  ],
  [
    1995,
    "嘴",
    "noun",
    "noun “mouth; beak; spout”; **exclude Cifu's Mandarin classifier `張` analysis**",
    "zeoi2"
  ],
  [
    1997,
    "數學",
    "noun",
    "domain noun “mathematics”",
    "sou3 hok6"
  ],
  [
    1998,
    "擁有",
    "verb",
    "verb “possess; own; have”",
    "jung2 jau5"
  ],
  [
    1999,
    "輸",
    "verb",
    "verb “lose; transport/transmit” family, with ordinary free Cantonese default “lose”",
    "syu1"
  ],
  [
    2000,
    "隨時",
    "adverb",
    "adverb “at any time; possibly/liable to at any time”",
    "ceoi4 si4"
  ]
]);
const PROMOTIONS = Object.freeze(Object.fromEntries(PROMOTION_ROWS.map(([rank,surface,kind,gloss,jyutping="",syntax=""]) => [surface, lexicalSpec(rank,kind,gloss,jyutping,syntax)])));
const RESEARCH_REQUIRED_SURFACES = new Set(["山個","猷"]);
const BLOCKED_ATOMIC_SURFACES = new Set(["正上方","再行","好多人","好快","好近","好遠","我問","兩點","第二個韻","就講","幾日","當你","當我","幫到","講開","轉右","邊間","聽到","九十度","十一點","下畫","加返","由個","好靚","有位","考到","行返","你明","你識","我明","兩位","定下","返番","要畫","哩件","兜個","會有"]);
const MULTI_SURFACES = new Set(["必要","光","妄想","局","邪","咀","定義","杯","表現","保險","活動","健康","接觸","清","笪","終","通","通知","創新","較","慳","營","翻譯","黐","一邊","止","火星","安全","曲","味","指示","故","原","旅遊","偈","副","專業","現實","陰","悶","發達","煩","實際","端","齊"]);
const READING_SPLIT_SURFACES = new Set(["拃","校","梗","率","第時","黏","文","凹","合","同樣","有份","判斷","兔仔","和","姊妹","界定","紅籌","淨","硬係","量","傳","傾計","撈"]);
const RAW_ALTERNATIVE_SPECS = Object.freeze({
  "必要": [
    {
      "rank": 1752,
      "suffix": "reviewed_proper_1",
      "kind": "proper",
      "gloss": "stative/property “necessary” + abstract noun “necessity/need”",
      "jyutping": "bit1 jiu3"
    },
    {
      "rank": 1752,
      "suffix": "reviewed_adjective_2",
      "kind": "adjective",
      "gloss": "stative/property “necessary” + abstract noun “necessity/need”",
      "jyutping": "bit1 jiu3"
    },
    {
      "rank": 1752,
      "suffix": "reviewed_noun_3",
      "kind": "noun",
      "gloss": "stative/property “necessary” + abstract noun “necessity/need”",
      "jyutping": "bit1 jiu3"
    }
  ],
  "光": [
    {
      "rank": 1757,
      "suffix": "reviewed_adjective_1",
      "kind": "adjective",
      "gloss": "stative “bright” + noun “light” + independently lexical adverbial/bare family",
      "jyutping": "gwong1"
    },
    {
      "rank": 1757,
      "suffix": "reviewed_adverb_2",
      "kind": "adverb",
      "gloss": "stative “bright” + noun “light” + independently lexical adverbial/bare family",
      "jyutping": "gwong1"
    },
    {
      "rank": 1757,
      "suffix": "reviewed_verb_3",
      "kind": "verb",
      "gloss": "stative “bright” + noun “light” + independently lexical adverbial/bare family",
      "jyutping": "gwong1"
    },
    {
      "rank": 1757,
      "suffix": "reviewed_noun_4",
      "kind": "noun",
      "gloss": "stative “bright” + noun “light” + independently lexical adverbial/bare family",
      "jyutping": "gwong1"
    }
  ],
  "妄想": [
    {
      "rank": 1764,
      "suffix": "reviewed_verb_1",
      "kind": "verb",
      "gloss": "verb “fantasize unrealistically” + noun “delusion/unrealistic idea”",
      "jyutping": "mong5 soeng2"
    },
    {
      "rank": 1764,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "verb “fantasize unrealistically” + noun “delusion/unrealistic idea”",
      "jyutping": "mong5 soeng2"
    }
  ],
  "局": [
    {
      "rank": 1770,
      "suffix": "reviewed_classifier_1",
      "kind": "classifier",
      "gloss": "noun “bureau/office; situation/round” + classifier for games/matches/rounds",
      "jyutping": "guk6"
    },
    {
      "rank": 1770,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "noun “bureau/office; situation/round” + classifier for games/matches/rounds",
      "jyutping": "guk6"
    }
  ],
  "邪": [
    {
      "rank": 1773,
      "suffix": "reviewed_adjective_1",
      "kind": "adjective",
      "gloss": "stative “evil/heretical/strange” + noun/bound “evil influence/misfortune”",
      "jyutping": "ce4"
    },
    {
      "rank": 1773,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "stative “evil/heretical/strange” + noun/bound “evil influence/misfortune”",
      "jyutping": "ce4"
    },
    {
      "rank": 1773,
      "suffix": "reviewed_bound_3",
      "kind": "bound",
      "gloss": "stative “evil/heretical/strange” + noun/bound “evil influence/misfortune”",
      "jyutping": "ce4"
    }
  ],
  "咀": [
    {
      "rank": 1776,
      "suffix": "reviewed_verb_1",
      "kind": "verb",
      "gloss": "noun spelling variant of `嘴` + slang verb “kiss”",
      "jyutping": "zeoi2"
    },
    {
      "rank": 1776,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "noun spelling variant of `嘴` + slang verb “kiss”",
      "jyutping": "zeoi2"
    }
  ],
  "定義": [
    {
      "rank": 1777,
      "suffix": "reviewed_verb_1",
      "kind": "verb",
      "gloss": "noun “definition” + verb “define”",
      "jyutping": "ding6 ji6"
    },
    {
      "rank": 1777,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "noun “definition” + verb “define”",
      "jyutping": "ding6 ji6"
    }
  ],
  "拃": [
    {
      "rank": 1779,
      "suffix": "reviewed_zaa6_classifier_1",
      "kind": "classifier",
      "gloss": "`zaa6` classifier for handfuls/groups + obstruction verb; `zaa3` handspan measure",
      "jyutping": "zaa6"
    },
    {
      "rank": 1779,
      "suffix": "reviewed_zaa6_verb_2",
      "kind": "verb",
      "gloss": "`zaa6` classifier for handfuls/groups + obstruction verb; `zaa3` handspan measure",
      "jyutping": "zaa6"
    },
    {
      "rank": 1779,
      "suffix": "reviewed_zaa3_measure_1",
      "kind": "measure",
      "gloss": "`zaa6` classifier for handfuls/groups + obstruction verb; `zaa3` handspan measure",
      "jyutping": "zaa3"
    }
  ],
  "杯": [
    {
      "rank": 1780,
      "suffix": "reviewed_classifier_1",
      "kind": "classifier",
      "gloss": "noun “cup/glass” + classifier/measure for cupfuls/drinks",
      "jyutping": "bui1"
    },
    {
      "rank": 1780,
      "suffix": "reviewed_measure_2",
      "kind": "measure",
      "gloss": "noun “cup/glass” + classifier/measure for cupfuls/drinks",
      "jyutping": "bui1"
    },
    {
      "rank": 1780,
      "suffix": "reviewed_noun_3",
      "kind": "noun",
      "gloss": "noun “cup/glass” + classifier/measure for cupfuls/drinks",
      "jyutping": "bui1"
    }
  ],
  "表現": [
    {
      "rank": 1784,
      "suffix": "reviewed_verb_1",
      "kind": "verb",
      "gloss": "verb “show/manifest” + noun “performance/manifestation”",
      "jyutping": "biu2 jin6"
    },
    {
      "rank": 1784,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "verb “show/manifest” + noun “performance/manifestation”",
      "jyutping": "biu2 jin6"
    }
  ],
  "保險": [
    {
      "rank": 1786,
      "suffix": "reviewed_adjective_1",
      "kind": "adjective",
      "gloss": "noun “insurance” + stative “safe/cautious”",
      "jyutping": "bou2 him2"
    },
    {
      "rank": 1786,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "noun “insurance” + stative “safe/cautious”",
      "jyutping": "bou2 him2"
    }
  ],
  "活動": [
    {
      "rank": 1787,
      "suffix": "reviewed_verb_1",
      "kind": "verb",
      "gloss": "noun “activity” + verb “move/operate/be active”",
      "jyutping": "wut6 dung6"
    },
    {
      "rank": 1787,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "noun “activity” + verb “move/operate/be active”",
      "jyutping": "wut6 dung6"
    }
  ],
  "校": [
    {
      "rank": 1792,
      "suffix": "reviewed_haau6_noun_1",
      "kind": "noun",
      "gloss": "`haau6` school family vs `gaau3` proofread/check and field-officer family; exclude Mandarin classifier gloss",
      "jyutping": "haau6"
    },
    {
      "rank": 1792,
      "suffix": "reviewed_gaau3_verb_1",
      "kind": "verb",
      "gloss": "`haau6` school family vs `gaau3` proofread/check and field-officer family; exclude Mandarin classifier gloss",
      "jyutping": "gaau3"
    },
    {
      "rank": 1792,
      "suffix": "reviewed_gaau3_bound_2",
      "kind": "bound",
      "gloss": "`haau6` school family vs `gaau3` proofread/check and field-officer family; exclude Mandarin classifier gloss",
      "jyutping": "gaau3"
    }
  ],
  "健康": [
    {
      "rank": 1796,
      "suffix": "reviewed_adjective_1",
      "kind": "adjective",
      "gloss": "noun “health” + stative “healthy”",
      "jyutping": "gin6 hong1"
    },
    {
      "rank": 1796,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "noun “health” + stative “healthy”",
      "jyutping": "gin6 hong1"
    }
  ],
  "接觸": [
    {
      "rank": 1800,
      "suffix": "reviewed_verb_1",
      "kind": "verb",
      "gloss": "verb “contact/touch” + noun/event “contact”",
      "jyutping": "zip3 zuk1"
    },
    {
      "rank": 1800,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "verb “contact/touch” + noun/event “contact”",
      "jyutping": "zip3 zuk1"
    }
  ],
  "梗": [
    {
      "rank": 1801,
      "suffix": "reviewed_gang2_adjective_1",
      "kind": "adjective",
      "gloss": "`gang2` fixed/rigid property and certainty adverb vs `kwaang2` stem/stalk noun; reject Cifu `gang2 = stem` pairing",
      "jyutping": "gang2"
    },
    {
      "rank": 1801,
      "suffix": "reviewed_gang2_adverb_2",
      "kind": "adverb",
      "gloss": "`gang2` fixed/rigid property and certainty adverb vs `kwaang2` stem/stalk noun; reject Cifu `gang2 = stem` pairing",
      "jyutping": "gang2"
    },
    {
      "rank": 1801,
      "suffix": "reviewed_kwaang2_noun_1",
      "kind": "noun",
      "gloss": "`gang2` fixed/rigid property and certainty adverb vs `kwaang2` stem/stalk noun; reject Cifu `gang2 = stem` pairing",
      "jyutping": "kwaang2"
    }
  ],
  "清": [
    {
      "rank": 1802,
      "suffix": "reviewed_adjective_1",
      "kind": "adjective",
      "gloss": "stative “clear/clean/pure” + verb “clear/clean/set straight”",
      "jyutping": "cing1"
    },
    {
      "rank": 1802,
      "suffix": "reviewed_verb_2",
      "kind": "verb",
      "gloss": "stative “clear/clean/pure” + verb “clear/clean/set straight”",
      "jyutping": "cing1"
    }
  ],
  "率": [
    {
      "rank": 1803,
      "suffix": "reviewed_seot1_verb_1",
      "kind": "verb",
      "gloss": "`seot1` lead/command/frank/general family vs `leot6` rate/ratio noun/measure root",
      "jyutping": "seot1"
    },
    {
      "rank": 1803,
      "suffix": "reviewed_seot1_adjective_2",
      "kind": "adjective",
      "gloss": "`seot1` lead/command/frank/general family vs `leot6` rate/ratio noun/measure root",
      "jyutping": "seot1"
    },
    {
      "rank": 1803,
      "suffix": "reviewed_seot1_adverb_3",
      "kind": "adverb",
      "gloss": "`seot1` lead/command/frank/general family vs `leot6` rate/ratio noun/measure root",
      "jyutping": "seot1"
    },
    {
      "rank": 1803,
      "suffix": "reviewed_leot6_noun_1",
      "kind": "noun",
      "gloss": "`seot1` lead/command/frank/general family vs `leot6` rate/ratio noun/measure root",
      "jyutping": "leot6"
    },
    {
      "rank": 1803,
      "suffix": "reviewed_leot6_measure_2",
      "kind": "measure",
      "gloss": "`seot1` lead/command/frank/general family vs `leot6` rate/ratio noun/measure root",
      "jyutping": "leot6"
    }
  ],
  "笪": [
    {
      "rank": 1805,
      "suffix": "reviewed_classifier_1",
      "kind": "classifier",
      "gloss": "Cantonese classifier for a patch/plot/area + noun “rough bamboo mat”",
      "jyutping": "daat3"
    },
    {
      "rank": 1805,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "Cantonese classifier for a patch/plot/area + noun “rough bamboo mat”",
      "jyutping": "daat3"
    }
  ],
  "第時": [
    {
      "rank": 1807,
      "suffix": "reviewed_dai6_si4_temporal_1",
      "kind": "temporal",
      "gloss": "temporal noun “future; later; next time” with recorded reading variation",
      "jyutping": "dai6 si4"
    },
    {
      "rank": 1807,
      "suffix": "reviewed_dai6_si2_temporal_1",
      "kind": "temporal",
      "gloss": "temporal noun “future; later; next time” with recorded reading variation",
      "jyutping": "dai6 si2"
    }
  ],
  "終": [
    {
      "rank": 1810,
      "suffix": "reviewed_adverb_1",
      "kind": "adverb",
      "gloss": "formal noun/bound “end” + verb “end/finish” + adverbial “finally”",
      "jyutping": "zung1"
    },
    {
      "rank": 1810,
      "suffix": "reviewed_verb_2",
      "kind": "verb",
      "gloss": "formal noun/bound “end” + verb “end/finish” + adverbial “finally”",
      "jyutping": "zung1"
    },
    {
      "rank": 1810,
      "suffix": "reviewed_noun_3",
      "kind": "noun",
      "gloss": "formal noun/bound “end” + verb “end/finish” + adverbial “finally”",
      "jyutping": "zung1"
    },
    {
      "rank": 1810,
      "suffix": "reviewed_bound_4",
      "kind": "bound",
      "gloss": "formal noun/bound “end” + verb “end/finish” + adverbial “finally”",
      "jyutping": "zung1"
    }
  ],
  "通": [
    {
      "rank": 1812,
      "suffix": "reviewed_proper_1",
      "kind": "proper",
      "gloss": "verb “pass/connect/communicate/understand” + property/bound “through/general” + communication measure family",
      "jyutping": "tung1"
    },
    {
      "rank": 1812,
      "suffix": "reviewed_measure_2",
      "kind": "measure",
      "gloss": "verb “pass/connect/communicate/understand” + property/bound “through/general” + communication measure family",
      "jyutping": "tung1"
    },
    {
      "rank": 1812,
      "suffix": "reviewed_adjective_3",
      "kind": "adjective",
      "gloss": "verb “pass/connect/communicate/understand” + property/bound “through/general” + communication measure family",
      "jyutping": "tung1"
    },
    {
      "rank": 1812,
      "suffix": "reviewed_verb_4",
      "kind": "verb",
      "gloss": "verb “pass/connect/communicate/understand” + property/bound “through/general” + communication measure family",
      "jyutping": "tung1"
    },
    {
      "rank": 1812,
      "suffix": "reviewed_bound_5",
      "kind": "bound",
      "gloss": "verb “pass/connect/communicate/understand” + property/bound “through/general” + communication measure family",
      "jyutping": "tung1"
    }
  ],
  "通知": [
    {
      "rank": 1813,
      "suffix": "reviewed_verb_1",
      "kind": "verb",
      "gloss": "verb “notify/inform” + noun “notification/notice”",
      "jyutping": "tung1 zi1"
    },
    {
      "rank": 1813,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "verb “notify/inform” + noun “notification/notice”",
      "jyutping": "tung1 zi1"
    }
  ],
  "創新": [
    {
      "rank": 1815,
      "suffix": "reviewed_adjective_1",
      "kind": "adjective",
      "gloss": "stative “innovative/pioneering” + verb “innovate”",
      "jyutping": "cong3 san1"
    },
    {
      "rank": 1815,
      "suffix": "reviewed_verb_2",
      "kind": "verb",
      "gloss": "stative “innovative/pioneering” + verb “innovate”",
      "jyutping": "cong3 san1"
    }
  ],
  "較": [
    {
      "rank": 1829,
      "suffix": "reviewed_function_1",
      "kind": "function",
      "gloss": "comparative degree/relation function + formal compare/contest verb family",
      "jyutping": "gaau3"
    },
    {
      "rank": 1829,
      "suffix": "reviewed_verb_2",
      "kind": "verb",
      "gloss": "comparative degree/relation function + formal compare/contest verb family",
      "jyutping": "gaau3"
    }
  ],
  "慳": [
    {
      "rank": 1835,
      "suffix": "reviewed_adjective_1",
      "kind": "adjective",
      "gloss": "verb “save/economize” + stative “thrifty/frugal”",
      "jyutping": "haan1"
    },
    {
      "rank": 1835,
      "suffix": "reviewed_verb_2",
      "kind": "verb",
      "gloss": "verb “save/economize” + stative “thrifty/frugal”",
      "jyutping": "haan1"
    }
  ],
  "營": [
    {
      "rank": 1845,
      "suffix": "reviewed_verb_1",
      "kind": "verb",
      "gloss": "noun/bound “camp/barracks/battalion” + formal verb “operate/manage”",
      "jyutping": "jing4"
    },
    {
      "rank": 1845,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "noun/bound “camp/barracks/battalion” + formal verb “operate/manage”",
      "jyutping": "jing4"
    },
    {
      "rank": 1845,
      "suffix": "reviewed_bound_3",
      "kind": "bound",
      "gloss": "noun/bound “camp/barracks/battalion” + formal verb “operate/manage”",
      "jyutping": "jing4"
    }
  ],
  "黏": [
    {
      "rank": 1849,
      "suffix": "reviewed_nim4_verb_1",
      "kind": "verb",
      "gloss": "`nim4` verb “stick/adhere” vs `nim1` stative “sticky/glutinous”; packet `zim1` unpromoted",
      "jyutping": "nim4"
    },
    {
      "rank": 1849,
      "suffix": "reviewed_nim1_adjective_1",
      "kind": "adjective",
      "gloss": "`nim4` verb “stick/adhere” vs `nim1` stative “sticky/glutinous”; packet `zim1` unpromoted",
      "jyutping": "nim1"
    }
  ],
  "翻譯": [
    {
      "rank": 1852,
      "suffix": "reviewed_verb_1",
      "kind": "verb",
      "gloss": "noun “translation; translator/interpreter” + verb “translate/interpret”",
      "jyutping": "faan1 jik6"
    },
    {
      "rank": 1852,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "noun “translation; translator/interpreter” + verb “translate/interpret”",
      "jyutping": "faan1 jik6"
    }
  ],
  "黐": [
    {
      "rank": 1862,
      "suffix": "reviewed_adjective_1",
      "kind": "adjective",
      "gloss": "verb “stick/adhere/cling” + stative “sticky”",
      "jyutping": "ci1"
    },
    {
      "rank": 1862,
      "suffix": "reviewed_verb_2",
      "kind": "verb",
      "gloss": "verb “stick/adhere/cling” + stative “sticky”",
      "jyutping": "ci1"
    }
  ],
  "一邊": [
    {
      "rank": 1865,
      "suffix": "reviewed_localizer_1",
      "kind": "localizer",
      "gloss": "locality noun “one side” + constructional/adverbial member of paired simultaneous `一邊…一邊…` pattern",
      "jyutping": "jat1 bin1"
    },
    {
      "rank": 1865,
      "suffix": "reviewed_adverb_2",
      "kind": "adverb",
      "gloss": "locality noun “one side” + constructional/adverbial member of paired simultaneous `一邊…一邊…` pattern",
      "jyutping": "jat1 bin1"
    },
    {
      "rank": 1865,
      "suffix": "reviewed_verb_3",
      "kind": "verb",
      "gloss": "locality noun “one side” + constructional/adverbial member of paired simultaneous `一邊…一邊…` pattern",
      "jyutping": "jat1 bin1"
    },
    {
      "rank": 1865,
      "suffix": "reviewed_noun_4",
      "kind": "noun",
      "gloss": "locality noun “one side” + constructional/adverbial member of paired simultaneous `一邊…一邊…` pattern",
      "jyutping": "jat1 bin1"
    }
  ],
  "文": [
    {
      "rank": 1879,
      "suffix": "reviewed_man4_noun_1",
      "kind": "noun",
      "gloss": "`man4` noun/property family “writing, language, literature, culture” + Cantonese changed-tone money/classifier family + `man6` cover/paint-over verb",
      "jyutping": "man4"
    },
    {
      "rank": 1879,
      "suffix": "reviewed_man4_adjective_2",
      "kind": "adjective",
      "gloss": "`man4` noun/property family “writing, language, literature, culture” + Cantonese changed-tone money/classifier family + `man6` cover/paint-over verb",
      "jyutping": "man4"
    },
    {
      "rank": 1879,
      "suffix": "reviewed_man1_classifier_1",
      "kind": "classifier",
      "gloss": "`man4` noun/property family “writing, language, literature, culture” + Cantonese changed-tone money/classifier family + `man6` cover/paint-over verb",
      "jyutping": "man1"
    },
    {
      "rank": 1879,
      "suffix": "reviewed_man1_measure_2",
      "kind": "measure",
      "gloss": "`man4` noun/property family “writing, language, literature, culture” + Cantonese changed-tone money/classifier family + `man6` cover/paint-over verb",
      "jyutping": "man1"
    },
    {
      "rank": 1879,
      "suffix": "reviewed_man6_verb_1",
      "kind": "verb",
      "gloss": "`man4` noun/property family “writing, language, literature, culture” + Cantonese changed-tone money/classifier family + `man6` cover/paint-over verb",
      "jyutping": "man6"
    }
  ],
  "止": [
    {
      "rank": 1880,
      "suffix": "reviewed_proper_1",
      "kind": "proper",
      "gloss": "formal verb “stop/halt/prohibit” + property/adverbial “still/calm/only” family; “until” belongs to larger forms such as `為止`",
      "jyutping": "zi2"
    },
    {
      "rank": 1880,
      "suffix": "reviewed_adjective_2",
      "kind": "adjective",
      "gloss": "formal verb “stop/halt/prohibit” + property/adverbial “still/calm/only” family; “until” belongs to larger forms such as `為止`",
      "jyutping": "zi2"
    },
    {
      "rank": 1880,
      "suffix": "reviewed_adverb_3",
      "kind": "adverb",
      "gloss": "formal verb “stop/halt/prohibit” + property/adverbial “still/calm/only” family; “until” belongs to larger forms such as `為止`",
      "jyutping": "zi2"
    },
    {
      "rank": 1880,
      "suffix": "reviewed_verb_4",
      "kind": "verb",
      "gloss": "formal verb “stop/halt/prohibit” + property/adverbial “still/calm/only” family; “until” belongs to larger forms such as `為止`",
      "jyutping": "zi2"
    }
  ],
  "火星": [
    {
      "rank": 1881,
      "suffix": "reviewed_proper_1",
      "kind": "proper",
      "gloss": "proper/celestial noun “Mars” + common noun “spark”",
      "jyutping": "fo2 sing1"
    },
    {
      "rank": 1881,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "proper/celestial noun “Mars” + common noun “spark”",
      "jyutping": "fo2 sing1"
    }
  ],
  "凹": [
    {
      "rank": 1884,
      "suffix": "reviewed_nap1_adjective_1",
      "kind": "adjective",
      "gloss": "ordinary stative “concave/sunken” plus restricted alternate lexical/placename readings; packet `lap1` not adopted as general default",
      "jyutping": "nap1"
    },
    {
      "rank": 1884,
      "suffix": "reviewed_aau3_adjective_1",
      "kind": "adjective",
      "gloss": "ordinary stative “concave/sunken” plus restricted alternate lexical/placename readings; packet `lap1` not adopted as general default",
      "jyutping": "aau3"
    },
    {
      "rank": 1884,
      "suffix": "reviewed_waa1_adjective_1",
      "kind": "adjective",
      "gloss": "ordinary stative “concave/sunken” plus restricted alternate lexical/placename readings; packet `lap1` not adopted as general default",
      "jyutping": "waa1"
    }
  ],
  "合": [
    {
      "rank": 1895,
      "suffix": "reviewed_hap6_verb_1",
      "kind": "verb",
      "gloss": "`hap6` combine/fit/whole family; `ho4` musical-note noun; `gap3` grain measure",
      "jyutping": "hap6"
    },
    {
      "rank": 1895,
      "suffix": "reviewed_hap6_adjective_2",
      "kind": "adjective",
      "gloss": "`hap6` combine/fit/whole family; `ho4` musical-note noun; `gap3` grain measure",
      "jyutping": "hap6"
    },
    {
      "rank": 1895,
      "suffix": "reviewed_ho4_noun_1",
      "kind": "noun",
      "gloss": "`hap6` combine/fit/whole family; `ho4` musical-note noun; `gap3` grain measure",
      "jyutping": "ho4"
    },
    {
      "rank": 1895,
      "suffix": "reviewed_gap3_measure_1",
      "kind": "measure",
      "gloss": "`hap6` combine/fit/whole family; `ho4` musical-note noun; `gap3` grain measure",
      "jyutping": "gap3"
    }
  ],
  "同樣": [
    {
      "rank": 1899,
      "suffix": "reviewed_tung4_joeng6_adjective_1",
      "kind": "adjective",
      "gloss": "same/similar/equal property-adverbial family with independently recorded changed-tone “same type” reading",
      "jyutping": "tung4 joeng6"
    },
    {
      "rank": 1899,
      "suffix": "reviewed_tung4_joeng6_adverb_2",
      "kind": "adverb",
      "gloss": "same/similar/equal property-adverbial family with independently recorded changed-tone “same type” reading",
      "jyutping": "tung4 joeng6"
    },
    {
      "rank": 1899,
      "suffix": "reviewed_tung4_joeng2_noun_1",
      "kind": "noun",
      "gloss": "same/similar/equal property-adverbial family with independently recorded changed-tone “same type” reading",
      "jyutping": "tung4 joeng2"
    }
  ],
  "安全": [
    {
      "rank": 1904,
      "suffix": "reviewed_adjective_1",
      "kind": "adjective",
      "gloss": "abstract noun “safety/security” + stative “safe/secure”",
      "jyutping": "on1 cyun4"
    },
    {
      "rank": 1904,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "abstract noun “safety/security” + stative “safe/secure”",
      "jyutping": "on1 cyun4"
    }
  ],
  "曲": [
    {
      "rank": 1909,
      "suffix": "reviewed_proper_1",
      "kind": "proper",
      "gloss": "noun “song/tune” + stative/property “bent/crooked” family",
      "jyutping": "kuk1"
    },
    {
      "rank": 1909,
      "suffix": "reviewed_adjective_2",
      "kind": "adjective",
      "gloss": "noun “song/tune” + stative/property “bent/crooked” family",
      "jyutping": "kuk1"
    },
    {
      "rank": 1909,
      "suffix": "reviewed_noun_3",
      "kind": "noun",
      "gloss": "noun “song/tune” + stative/property “bent/crooked” family",
      "jyutping": "kuk1"
    }
  ],
  "有份": [
    {
      "rank": 1910,
      "suffix": "reviewed_jau5_fan2_verb_1",
      "kind": "verb",
      "gloss": "lexical expression “have a share/part; participate/be involved” with Cantonese changed tone",
      "jyutping": "jau5 fan2"
    }
  ],
  "判斷": [
    {
      "rank": 1918,
      "suffix": "reviewed_pun3_dyun3_verb_1",
      "kind": "verb",
      "gloss": "verb “judge/determine” and nominal judgment family with corrected second-syllable reading",
      "jyutping": "pun3 dyun3"
    },
    {
      "rank": 1918,
      "suffix": "reviewed_pun3_dyun6_noun_1",
      "kind": "noun",
      "gloss": "verb “judge/determine” and nominal judgment family with corrected second-syllable reading",
      "jyutping": "pun3 dyun6"
    }
  ],
  "兔仔": [
    {
      "rank": 1924,
      "suffix": "reviewed_tou3_zai2_noun_1",
      "kind": "noun",
      "gloss": "animal noun “rabbit/bunny” with corrected suffix reading",
      "jyutping": "tou3 zai2"
    }
  ],
  "味": [
    {
      "rank": 1927,
      "suffix": "reviewed_classifier_1",
      "kind": "classifier",
      "gloss": "noun “taste/smell/flavour” + verb “taste/savour” + classifier/measure family",
      "jyutping": "mei6"
    },
    {
      "rank": 1927,
      "suffix": "reviewed_measure_2",
      "kind": "measure",
      "gloss": "noun “taste/smell/flavour” + verb “taste/savour” + classifier/measure family",
      "jyutping": "mei6"
    },
    {
      "rank": 1927,
      "suffix": "reviewed_verb_3",
      "kind": "verb",
      "gloss": "noun “taste/smell/flavour” + verb “taste/savour” + classifier/measure family",
      "jyutping": "mei6"
    },
    {
      "rank": 1927,
      "suffix": "reviewed_noun_4",
      "kind": "noun",
      "gloss": "noun “taste/smell/flavour” + verb “taste/savour” + classifier/measure family",
      "jyutping": "mei6"
    }
  ],
  "和": [
    {
      "rank": 1928,
      "suffix": "reviewed_wo4_function_1",
      "kind": "function",
      "gloss": "formal conjunction/noun/property family plus distinct reading-sensitive respond-in-song and mahjong/mixing families",
      "jyutping": "wo4"
    },
    {
      "rank": 1928,
      "suffix": "reviewed_wo4_noun_2",
      "kind": "noun",
      "gloss": "formal conjunction/noun/property family plus distinct reading-sensitive respond-in-song and mahjong/mixing families",
      "jyutping": "wo4"
    },
    {
      "rank": 1928,
      "suffix": "reviewed_wo4_adjective_3",
      "kind": "adjective",
      "gloss": "formal conjunction/noun/property family plus distinct reading-sensitive respond-in-song and mahjong/mixing families",
      "jyutping": "wo4"
    },
    {
      "rank": 1928,
      "suffix": "reviewed_wo6_verb_1",
      "kind": "verb",
      "gloss": "formal conjunction/noun/property family plus distinct reading-sensitive respond-in-song and mahjong/mixing families",
      "jyutping": "wo6"
    },
    {
      "rank": 1928,
      "suffix": "reviewed_wu2_verb_1",
      "kind": "verb",
      "gloss": "formal conjunction/noun/property family plus distinct reading-sensitive respond-in-song and mahjong/mixing families",
      "jyutping": "wu2"
    }
  ],
  "姊妹": [
    {
      "rank": 1929,
      "suffix": "reviewed_zi2_mui6_person_1",
      "kind": "person",
      "gloss": "kin/social noun “sisters; close female friends” with ordinary and changed-tone second-syllable readings",
      "jyutping": "zi2 mui6"
    },
    {
      "rank": 1929,
      "suffix": "reviewed_zi2_mui2_person_1",
      "kind": "person",
      "gloss": "kin/social noun “sisters; close female friends” with ordinary and changed-tone second-syllable readings",
      "jyutping": "zi2 mui2"
    }
  ],
  "指示": [
    {
      "rank": 1936,
      "suffix": "reviewed_verb_1",
      "kind": "verb",
      "gloss": "verb “indicate/instruct” + noun “instruction/directive”",
      "jyutping": "zi2 si6"
    },
    {
      "rank": 1936,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "verb “indicate/instruct” + noun “instruction/directive”",
      "jyutping": "zi2 si6"
    }
  ],
  "故": [
    {
      "rank": 1937,
      "suffix": "reviewed_adverb_1",
      "kind": "adverb",
      "gloss": "formal noun “reason/cause/event” + modifier “former/deceased/old” + connective/adverbial/verb families where independently licensed",
      "jyutping": "gu3"
    },
    {
      "rank": 1937,
      "suffix": "reviewed_function_2",
      "kind": "function",
      "gloss": "formal noun “reason/cause/event” + modifier “former/deceased/old” + connective/adverbial/verb families where independently licensed",
      "jyutping": "gu3"
    },
    {
      "rank": 1937,
      "suffix": "reviewed_verb_3",
      "kind": "verb",
      "gloss": "formal noun “reason/cause/event” + modifier “former/deceased/old” + connective/adverbial/verb families where independently licensed",
      "jyutping": "gu3"
    },
    {
      "rank": 1937,
      "suffix": "reviewed_noun_4",
      "kind": "noun",
      "gloss": "formal noun “reason/cause/event” + modifier “former/deceased/old” + connective/adverbial/verb families where independently licensed",
      "jyutping": "gu3"
    },
    {
      "rank": 1937,
      "suffix": "reviewed_bound_5",
      "kind": "bound",
      "gloss": "formal noun “reason/cause/event” + modifier “former/deceased/old” + connective/adverbial/verb families where independently licensed",
      "jyutping": "gu3"
    }
  ],
  "界定": [
    {
      "rank": 1940,
      "suffix": "reviewed_gaai3_deng6_verb_1",
      "kind": "verb",
      "gloss": "verb “define; delimit” with independently corrected reading",
      "jyutping": "gaai3 deng6"
    }
  ],
  "紅籌": [
    {
      "rank": 1941,
      "suffix": "reviewed_hung4_cau2_noun_1",
      "kind": "noun",
      "gloss": "finance noun “red chip/red-chip stock” with Cantonese changed-tone standalone reading",
      "jyutping": "hung4 cau2"
    },
    {
      "rank": 1941,
      "suffix": "reviewed_hung4_cau4_noun_1",
      "kind": "noun",
      "gloss": "finance noun “red chip/red-chip stock” with Cantonese changed-tone standalone reading",
      "jyutping": "hung4 cau4"
    }
  ],
  "原": [
    {
      "rank": 1947,
      "suffix": "reviewed_proper_1",
      "kind": "proper",
      "gloss": "formal modifier/property “original/former/raw” + noun “source/origin” + verb/bound family",
      "jyutping": "jyun4"
    },
    {
      "rank": 1947,
      "suffix": "reviewed_adjective_2",
      "kind": "adjective",
      "gloss": "formal modifier/property “original/former/raw” + noun “source/origin” + verb/bound family",
      "jyutping": "jyun4"
    },
    {
      "rank": 1947,
      "suffix": "reviewed_verb_3",
      "kind": "verb",
      "gloss": "formal modifier/property “original/former/raw” + noun “source/origin” + verb/bound family",
      "jyutping": "jyun4"
    },
    {
      "rank": 1947,
      "suffix": "reviewed_noun_4",
      "kind": "noun",
      "gloss": "formal modifier/property “original/former/raw” + noun “source/origin” + verb/bound family",
      "jyutping": "jyun4"
    },
    {
      "rank": 1947,
      "suffix": "reviewed_bound_5",
      "kind": "bound",
      "gloss": "formal modifier/property “original/former/raw” + noun “source/origin” + verb/bound family",
      "jyutping": "jyun4"
    }
  ],
  "旅遊": [
    {
      "rank": 1951,
      "suffix": "reviewed_verb_1",
      "kind": "verb",
      "gloss": "verb “travel/tour” + noun/event “travel/tourism”",
      "jyutping": "leoi5 jau4"
    },
    {
      "rank": 1951,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "verb “travel/tour” + noun/event “travel/tourism”",
      "jyutping": "leoi5 jau4"
    }
  ],
  "偈": [
    {
      "rank": 1957,
      "suffix": "reviewed_noun_1",
      "kind": "noun",
      "gloss": "Cantonese `gai2` noun/bound lexical families, including conventional conversational and engine/condition material; formal Buddhist-gāthā material remains category/reading-sensitive and is not inferred from Cifu alone",
      "jyutping": "gai2"
    },
    {
      "rank": 1957,
      "suffix": "reviewed_bound_2",
      "kind": "bound",
      "gloss": "Cantonese `gai2` noun/bound lexical families, including conventional conversational and engine/condition material; formal Buddhist-gāthā material remains category/reading-sensitive and is not inferred from Cifu alone",
      "jyutping": "gai2"
    }
  ],
  "副": [
    {
      "rank": 1959,
      "suffix": "reviewed_classifier_1",
      "kind": "classifier",
      "gloss": "modifier/bound “secondary/deputy/vice-” + noun “deputy/assistant” + classifier for pairs/sets",
      "jyutping": "fu3"
    },
    {
      "rank": 1959,
      "suffix": "reviewed_noun_2",
      "kind": "noun",
      "gloss": "modifier/bound “secondary/deputy/vice-” + noun “deputy/assistant” + classifier for pairs/sets",
      "jyutping": "fu3"
    },
    {
      "rank": 1959,
      "suffix": "reviewed_bound_3",
      "kind": "bound",
      "gloss": "modifier/bound “secondary/deputy/vice-” + noun “deputy/assistant” + classifier for pairs/sets",
      "jyutping": "fu3"
    }
  ],
  "專業": [
    {
      "rank": 1961,
      "suffix": "reviewed_proper_1",
      "kind": "proper",
      "gloss": "stative/property “professional” + abstract noun “professional expertise/profession”; Mainland university-major sense does not drive ordinary Cantonese typing",
      "jyutping": "zyun1 jip6"
    },
    {
      "rank": 1961,
      "suffix": "reviewed_adjective_2",
      "kind": "adjective",
      "gloss": "stative/property “professional” + abstract noun “professional expertise/profession”; Mainland university-major sense does not drive ordinary Cantonese typing",
      "jyutping": "zyun1 jip6"
    },
    {
      "rank": 1961,
      "suffix": "reviewed_noun_3",
      "kind": "noun",
      "gloss": "stative/property “professional” + abstract noun “professional expertise/profession”; Mainland university-major sense does not drive ordinary Cantonese typing",
      "jyutping": "zyun1 jip6"
    }
  ],
  "淨": [
    {
      "rank": 1964,
      "suffix": "reviewed_zing6_adjective_1",
      "kind": "adjective",
      "gloss": "formal/literary `zing6` and colloquial `zeng6` property/adverb/verb families “clean/pure/net; only; cleanse”",
      "jyutping": "zing6"
    },
    {
      "rank": 1964,
      "suffix": "reviewed_zing6_adverb_2",
      "kind": "adverb",
      "gloss": "formal/literary `zing6` and colloquial `zeng6` property/adverb/verb families “clean/pure/net; only; cleanse”",
      "jyutping": "zing6"
    },
    {
      "rank": 1964,
      "suffix": "reviewed_zing6_verb_3",
      "kind": "verb",
      "gloss": "formal/literary `zing6` and colloquial `zeng6` property/adverb/verb families “clean/pure/net; only; cleanse”",
      "jyutping": "zing6"
    },
    {
      "rank": 1964,
      "suffix": "reviewed_zeng6_adjective_1",
      "kind": "adjective",
      "gloss": "formal/literary `zing6` and colloquial `zeng6` property/adverb/verb families “clean/pure/net; only; cleanse”",
      "jyutping": "zeng6"
    },
    {
      "rank": 1964,
      "suffix": "reviewed_zeng6_verb_2",
      "kind": "verb",
      "gloss": "formal/literary `zing6` and colloquial `zeng6` property/adverb/verb families “clean/pure/net; only; cleanse”",
      "jyutping": "zeng6"
    }
  ],
  "現實": [
    {
      "rank": 1966,
      "suffix": "reviewed_proper_1",
      "kind": "proper",
      "gloss": "abstract noun “reality” + stative/property “real; realistic; actual”",
      "jyutping": "jin6 sat6"
    },
    {
      "rank": 1966,
      "suffix": "reviewed_adjective_2",
      "kind": "adjective",
      "gloss": "abstract noun “reality” + stative/property “real; realistic; actual”",
      "jyutping": "jin6 sat6"
    },
    {
      "rank": 1966,
      "suffix": "reviewed_noun_3",
      "kind": "noun",
      "gloss": "abstract noun “reality” + stative/property “real; realistic; actual”",
      "jyutping": "jin6 sat6"
    }
  ],
  "陰": [
    {
      "rank": 1972,
      "suffix": "reviewed_proper_1",
      "kind": "proper",
      "gloss": "noun/bound “yin/shade/negative side” + stative/property “overcast/dark/hidden” + verb “trick/set up” family",
      "jyutping": "jam1"
    },
    {
      "rank": 1972,
      "suffix": "reviewed_adjective_2",
      "kind": "adjective",
      "gloss": "noun/bound “yin/shade/negative side” + stative/property “overcast/dark/hidden” + verb “trick/set up” family",
      "jyutping": "jam1"
    },
    {
      "rank": 1972,
      "suffix": "reviewed_verb_3",
      "kind": "verb",
      "gloss": "noun/bound “yin/shade/negative side” + stative/property “overcast/dark/hidden” + verb “trick/set up” family",
      "jyutping": "jam1"
    },
    {
      "rank": 1972,
      "suffix": "reviewed_noun_4",
      "kind": "noun",
      "gloss": "noun/bound “yin/shade/negative side” + stative/property “overcast/dark/hidden” + verb “trick/set up” family",
      "jyutping": "jam1"
    },
    {
      "rank": 1972,
      "suffix": "reviewed_bound_5",
      "kind": "bound",
      "gloss": "noun/bound “yin/shade/negative side” + stative/property “overcast/dark/hidden” + verb “trick/set up” family",
      "jyutping": "jam1"
    }
  ],
  "悶": [
    {
      "rank": 1974,
      "suffix": "reviewed_adjective_1",
      "kind": "adjective",
      "gloss": "stative “bored/stuffy/depressed” + verb “cover/smother/keep shut” family",
      "jyutping": "mun6"
    },
    {
      "rank": 1974,
      "suffix": "reviewed_verb_2",
      "kind": "verb",
      "gloss": "stative “bored/stuffy/depressed” + verb “cover/smother/keep shut” family",
      "jyutping": "mun6"
    }
  ],
  "發達": [
    {
      "rank": 1977,
      "suffix": "reviewed_proper_1",
      "kind": "proper",
      "gloss": "verb “develop/prosper/get rich” + stative/property “developed/prosperous”",
      "jyutping": "faat3 daat6"
    },
    {
      "rank": 1977,
      "suffix": "reviewed_adjective_2",
      "kind": "adjective",
      "gloss": "verb “develop/prosper/get rich” + stative/property “developed/prosperous”",
      "jyutping": "faat3 daat6"
    },
    {
      "rank": 1977,
      "suffix": "reviewed_verb_3",
      "kind": "verb",
      "gloss": "verb “develop/prosper/get rich” + stative/property “developed/prosperous”",
      "jyutping": "faat3 daat6"
    }
  ],
  "硬係": [
    {
      "rank": 1978,
      "suffix": "reviewed_ngaang2_hai6_adverb_1",
      "kind": "adverb",
      "gloss": "Cantonese emphatic adverb “definitely; always/insistently” with independently attested changed-tone pronunciation",
      "jyutping": "ngaang2 hai6"
    },
    {
      "rank": 1978,
      "suffix": "reviewed_ngaang6_hai6_adverb_1",
      "kind": "adverb",
      "gloss": "Cantonese emphatic adverb “definitely; always/insistently” with independently attested changed-tone pronunciation",
      "jyutping": "ngaang6 hai6"
    }
  ],
  "量": [
    {
      "rank": 1979,
      "suffix": "reviewed_loeng4_verb_1",
      "kind": "verb",
      "gloss": "`loeng4` verb “measure/consider” vs `loeng6` noun “amount/capacity” and estimate/quantity family",
      "jyutping": "loeng4"
    },
    {
      "rank": 1979,
      "suffix": "reviewed_loeng6_noun_1",
      "kind": "noun",
      "gloss": "`loeng4` verb “measure/consider” vs `loeng6` noun “amount/capacity” and estimate/quantity family",
      "jyutping": "loeng6"
    }
  ],
  "傳": [
    {
      "rank": 1981,
      "suffix": "reviewed_cyun4_verb_1",
      "kind": "verb",
      "gloss": "`cyun4` verb “transmit/spread/pass on” vs `zyun6` noun “biography/account/commentary” family",
      "jyutping": "cyun4"
    },
    {
      "rank": 1981,
      "suffix": "reviewed_zyun6_noun_1",
      "kind": "noun",
      "gloss": "`cyun4` verb “transmit/spread/pass on” vs `zyun6` noun “biography/account/commentary” family",
      "jyutping": "zyun6"
    }
  ],
  "傾計": [
    {
      "rank": 1983,
      "suffix": "reviewed_king1_gai2_verb_1",
      "kind": "verb",
      "gloss": "lexical verb “chat; talk” with corrected final changed-tone reading",
      "jyutping": "king1 gai2"
    }
  ],
  "煩": [
    {
      "rank": 1985,
      "suffix": "reviewed_adjective_1",
      "kind": "adjective",
      "gloss": "stative “annoying/troublesome/fed up” + verb “bother/annoy/trouble”",
      "jyutping": "faan4"
    },
    {
      "rank": 1985,
      "suffix": "reviewed_verb_2",
      "kind": "verb",
      "gloss": "stative “annoying/troublesome/fed up” + verb “bother/annoy/trouble”",
      "jyutping": "faan4"
    }
  ],
  "實際": [
    {
      "rank": 1989,
      "suffix": "reviewed_proper_1",
      "kind": "proper",
      "gloss": "abstract noun “reality/practice” + stative/property “actual; practical; realistic”",
      "jyutping": "sat6 zai3"
    },
    {
      "rank": 1989,
      "suffix": "reviewed_adjective_2",
      "kind": "adjective",
      "gloss": "abstract noun “reality/practice” + stative/property “actual; practical; realistic”",
      "jyutping": "sat6 zai3"
    },
    {
      "rank": 1989,
      "suffix": "reviewed_noun_3",
      "kind": "noun",
      "gloss": "abstract noun “reality/practice” + stative/property “actual; practical; realistic”",
      "jyutping": "sat6 zai3"
    }
  ],
  "端": [
    {
      "rank": 1991,
      "suffix": "reviewed_proper_1",
      "kind": "proper",
      "gloss": "noun/bound “end/extremity/item/side” + formal verb “hold/carry level” + property/bound “upright/regular” family",
      "jyutping": "dyun1"
    },
    {
      "rank": 1991,
      "suffix": "reviewed_adjective_2",
      "kind": "adjective",
      "gloss": "noun/bound “end/extremity/item/side” + formal verb “hold/carry level” + property/bound “upright/regular” family",
      "jyutping": "dyun1"
    },
    {
      "rank": 1991,
      "suffix": "reviewed_verb_3",
      "kind": "verb",
      "gloss": "noun/bound “end/extremity/item/side” + formal verb “hold/carry level” + property/bound “upright/regular” family",
      "jyutping": "dyun1"
    },
    {
      "rank": 1991,
      "suffix": "reviewed_noun_4",
      "kind": "noun",
      "gloss": "noun/bound “end/extremity/item/side” + formal verb “hold/carry level” + property/bound “upright/regular” family",
      "jyutping": "dyun1"
    },
    {
      "rank": 1991,
      "suffix": "reviewed_bound_5",
      "kind": "bound",
      "gloss": "noun/bound “end/extremity/item/side” + formal verb “hold/carry level” + property/bound “upright/regular” family",
      "jyutping": "dyun1"
    }
  ],
  "齊": [
    {
      "rank": 1993,
      "suffix": "reviewed_proper_1",
      "kind": "proper",
      "gloss": "stative/property “complete/even/aligned” + adverb “together/all at once” + proper-name family",
      "jyutping": "cai4"
    },
    {
      "rank": 1993,
      "suffix": "reviewed_adjective_2",
      "kind": "adjective",
      "gloss": "stative/property “complete/even/aligned” + adverb “together/all at once” + proper-name family",
      "jyutping": "cai4"
    },
    {
      "rank": 1993,
      "suffix": "reviewed_adverb_3",
      "kind": "adverb",
      "gloss": "stative/property “complete/even/aligned” + adverb “together/all at once” + proper-name family",
      "jyutping": "cai4"
    },
    {
      "rank": 1993,
      "suffix": "reviewed_verb_4",
      "kind": "verb",
      "gloss": "stative/property “complete/even/aligned” + adverb “together/all at once” + proper-name family",
      "jyutping": "cai4"
    }
  ],
  "撈": [
    {
      "rank": 1996,
      "suffix": "reviewed_lou1_verb_1",
      "kind": "verb",
      "gloss": "colloquial `lou1` “mix; earn/make a living, often opportunistically” vs `laau4` “scoop/dredge/fish out”; reject Cifu `lou4`",
      "jyutping": "lou1"
    },
    {
      "rank": 1996,
      "suffix": "reviewed_laau4_verb_1",
      "kind": "verb",
      "gloss": "colloquial `lou1` “mix; earn/make a living, often opportunistically” vs `laau4` “scoop/dredge/fish out”; reject Cifu `lou4`",
      "jyutping": "laau4"
    }
  ]
});
const ALTERNATIVE_SPECS = Object.freeze(Object.fromEntries(Object.entries(RAW_ALTERNATIVE_SPECS).map(([surface,specs]) => [surface, Object.freeze(specs.map((spec) => Object.freeze({ ...lexicalSpec(spec.rank,spec.kind,spec.gloss,spec.jyutping,spec.syntax || ""), suffix: spec.suffix })))])));
const CANDIDATE_ONLY_SURFACES = new Set(Object.keys(ALTERNATIVE_SPECS));
const DEFAULT_READING_OVERRIDES = Object.freeze({
  "司長": "si1 zoeng2",
  "必要": "bit1 jiu3",
  "本地": "bun2 dei6",
  "正版": "zing3 baan2",
  "甩": "lat1",
  "光": "gwong1",
  "在": "zoi6",
  "妄想": "mong5 soeng2",
  "忙": "mong4",
  "成年": "sing4 nin4",
  "老細": "lou5 sai3",
  "自從": "zi6 cung4",
  "初頭": "co1 tau4",
  "局": "guk6",
  "足夠": "zuk1 gau3",
  "邪": "ce4",
  "事業": "si6 jip6",
  "咀": "zeoi2",
  "定義": "ding6 ji6",
  "忽然": "fat1 jin4",
  "拃": "zaa6",
  "杯": "bui1",
  "東面": "dung1 min6",
  "欣賞": "jan1 soeng2",
  "股價": "gu2 gaa3",
  "表現": "biu2 jin6",
  "長遠": "coeng4 jyun5",
  "保險": "bou2 him2",
  "活動": "wut6 dung6",
  "重心": "zung6 sam1",
  "哲學": "zit3 hok6",
  "家人": "gaa1 jan4",
  "晏晝": "aan3 zau3",
  "校": "haau6",
  "窄": "zaak3",
  "粉": "fan2",
  "做法": "zou6 faat3",
  "健康": "gin6 hong1",
  "唯一": "wai4 jat1",
  "唱片": "coeng3 pin2",
  "婚姻": "fan1 jan1",
  "接觸": "zip3 zuk1",
  "梗": "gang2",
  "清": "cing1",
  "率": "seot1",
  "現象": "jin6 zoeng6",
  "笪": "daat3",
  "第時": "dai6 si4",
  "粗口": "cou1 hau2",
  "細妹": "sai3 mui2",
  "終": "zung1",
  "規則": "kwai1 zak1",
  "通": "tung1",
  "通知": "tung1 zi1",
  "創意": "cong3 ji3",
  "創新": "cong3 san1",
  "換": "wun6",
  "普通話": "pou2 tung1 waa2",
  "普遍": "pou2 pin3",
  "評價": "ping4 gaa3",
  "意義": "ji3 ji6",
  "愛情": "oi3 cing4",
  "業": "jip6",
  "業主": "jip6 zyu2",
  "罪行": "zeoi6 hang4",
  "較": "gaau3",
  "遊戲": "jau4 hei3",
  "電訊": "din6 seon3",
  "鼓勵": "gu2 lai6",
  "嘔": "au2",
  "實際上": "sat6 zai3 soeng6",
  "慳": "haan1",
  "樓下": "lau4 haa6",
  "瘦": "sau3",
  "賭": "dou2",
  "踩": "caai2",
  "燕梳": "jin3 so1",
  "遲": "ci4",
  "戲院": "hei3 jyun2",
  "擦紙膠": "caat3 zi2 gaau1",
  "營": "jing4",
  "聯絡": "lyun4 lok3",
  "講法": "gong2 faat3",
  "黏": "nim4",
  "禮拜三": "lai5 baai3 saam1",
  "禮拜六": "lai5 baai3 luk6",
  "翻譯": "faan1 jik6",
  "轉頭": "zyun3 tau4",
  "額": "ngaak6",
  "鯉": "lei5",
  "穩定": "wan2 ding6",
  "嚴重": "jim4 zung6",
  "屬於": "suk6 jyu1",
  "黐": "ci1",
  "顯示": "hin2 si6",
  "一模一樣": "jat1 mou4 jat1 joeng6",
  "一邊": "jat1 bin1",
  "人生": "jan4 sang1",
  "上堂": "soeng5 tong4",
  "中國人": "zung1 gwok3 jan4",
  "五月": "ng5 jyut6",
  "內心": "noi6 sam1",
  "反映": "faan2 jing2",
  "天堂": "tin1 tong4",
  "太陽": "taai3 joeng4",
  "心態": "sam1 taai3",
  "文": "man4",
  "止": "zi2",
  "火星": "fo2 sing1",
  "仙人掌": "sin1 jan4 zoeng2",
  "以往": "ji5 wong5",
  "凹": "nap1",
  "出席": "ceot1 zik6",
  "出邊": "ceot1 bin6",
  "可憐": "ho2 lin4",
  "失": "sat1",
  "民主": "man4 zyu2",
  "民建聯": "man4 gin3 lyun4",
  "生物": "sang1 mat6",
  "全名": "cyun4 meng2",
  "合": "hap6",
  "合法": "hap6 faat3",
  "吋": "cyun3",
  "同時": "tung4 si4",
  "同樣": "tung4 joeng6",
  "地球": "dei6 kau4",
  "好人": "hou2 jan4",
  "好味": "hou2 mei6",
  "安全": "on1 cyun4",
  "年青": "nin4 cing1",
  "年齡": "nin4 ling4",
  "式": "sik1",
  "攰": "gui6",
  "曲": "kuk1",
  "有份": "jau5 fan2",
  "老公": "lou5 gung1",
  "行路": "haang4 lou6",
  "判斷": "pun3 dyun3",
  "別人": "bit6 jan4",
  "完整": "jyun4 zing2",
  "使錢": "sai2 cin2",
  "依然": "ji1 jin4",
  "兔仔": "tou3 zai2",
  "呢邊": "ni1 bin1",
  "味": "mei6",
  "和": "wo4",
  "姊妹": "zi2 mui6",
  "板": "baan2",
  "侮辱": "mou5 juk6",
  "保護": "bou2 wu6",
  "哈哈": "haa1 haa1",
  "指示": "zi2 si6",
  "故": "gu3",
  "星": "sing1",
  "洲": "zau1",
  "界定": "gaai3 deng6",
  "紅籌": "hung4 cau2",
  "耶穌": "je4 sou1",
  "背後": "bui3 hau6",
  "飛碟": "fei1 dip2",
  "個案": "go3 on3",
  "原": "jyun4",
  "唔知幾": "m4 zi1 gei2",
  "孭": "me1",
  "旅遊": "leoi5 jau4",
  "特色": "dak6 sik1",
  "特殊": "dak6 syu4",
  "狹窄": "haap6 zaak3",
  "退": "teoi3",
  "針對": "zam1 deoi3",
  "偈": "gai2",
  "副": "fu3",
  "唯有": "wai4 jau5",
  "專業": "zyun1 jip6",
  "得滯": "dak1 zai6",
  "梳打": "so1 daa2",
  "淨": "zing6",
  "清晰": "cing1 sik1",
  "現實": "jin6 sat6",
  "船": "syun4",
  "規定": "kwai1 ding6",
  "貨櫃": "fo3 gwai6",
  "責任": "zaak3 jam6",
  "連埋": "lin4 maai4",
  "陰": "jam1",
  "單位": "daan1 wai2",
  "悶": "mun6",
  "期間": "kei4 gaan1",
  "無謂": "mou4 wai6",
  "發達": "faat3 daat6",
  "硬係": "ngaang2 hai6",
  "量": "loeng4",
  "開會": "hoi1 wui2",
  "傳": "cyun4",
  "傳媒": "cyun4 mui4",
  "傾計": "king1 gai2",
  "煩": "faan4",
  "運動": "wan6 dung6",
  "圖標": "tou4 biu1",
  "實際": "sat6 zai3",
  "監察": "gaam1 caat3",
  "端": "dyun1",
  "網球": "mong5 kau4",
  "齊": "cai4",
  "價": "gaa3",
  "嘴": "zeoi2",
  "撈": "lou1",
  "數學": "sou3 hok6",
  "擁有": "jung2 jau5",
  "輸": "syu1",
  "隨時": "ceoi4 si4"
});
function isNeutralLexicalEntry(entry) { return Boolean(entry) && entry.label === "lex" && entry.pos === "lexical_item" && entry.syntax === "lexical_item"; }
function applyReviewedEntries(entries) {
  if (!Array.isArray(entries)) throw new TypeError("ranks 1751–2000 reviewed overlay requires an entry array");
  return entries.map(([surface, entry]) => {
    const promotion = PROMOTIONS[surface]; let next = entry;
    if (promotion && isNeutralLexicalEntry(next)) next = { ...next, label: promotion.label, pos: promotion.pos, syntax: promotion.syntax, note: "Reviewed Cifu ranks 1751–2000 lexical selection: " + promotion.gloss, provenance: { kind: "reviewed_lexical_promotion", source: SOURCE, rank: promotion.rank, pronunciation_status: promotion.jyutping ? "reviewed_explicit_reading" : "inherited_runtime_candidate_not_independently_promoted", prior_provenance: next.provenance || null } };
    const reviewedReading = DEFAULT_READING_OVERRIDES[surface];
    if (reviewedReading && next && next.jyutping !== reviewedReading) next = { ...next, jyutping: reviewedReading, provenance: { kind: isNeutralLexicalEntry(next) ? "reviewed_candidate_default_pronunciation" : "reviewed_default_pronunciation_correction", source: SOURCE, pronunciation_status: "reviewed_explicit_reading", prior_provenance: next.provenance || null } };
    return [surface, next];
  });
}
function defaultAnalysis(surface, entry) { return Object.freeze({ id: "lex:" + surface + ":default", label: entry.label || "neutral", pos: entry.pos || "lexical_item", jyutping: entry.jyutping || "", syntax: entry.syntax || "lexical_candidate", senses: Object.freeze([{ gloss: entry.note || "existing runtime default preserved" }]), provenance: Object.freeze({ kind: "existing_runtime_default_preserved", source: "v0.5.236 token lexicon before ranks 1751–2000 alternatives", prior_provenance: entry.provenance || null }) }); }
function reviewedAlternative(surface, spec, defaultEntry) { return Object.freeze({ id: "lex:" + surface + ":r" + spec.rank + ":" + spec.suffix, label: spec.label, pos: spec.pos, jyutping: spec.jyutping || defaultEntry.jyutping || "", syntax: spec.syntax, senses: Object.freeze([{ gloss: spec.gloss }]), provenance: Object.freeze({ kind: "reviewed_lexical_analysis", source: SOURCE, rank: spec.rank, pronunciation_status: spec.jyutping ? "reviewed_explicit_reading" : "inherited_runtime_candidate_not_independently_promoted" }) }); }
function buildExplicitAnalyses(entries) { const defaults = new Map(entries || []); const out = Object.create(null); for (const [surface, specs] of Object.entries(ALTERNATIVE_SPECS)) { const entry = defaults.get(surface); if (!entry) throw new Error("ranks 1751–2000 explicit analyses reference missing runtime surface: " + surface); const rows = [defaultAnalysis(surface, entry), ...specs.map((spec) => reviewedAlternative(surface, spec, entry))]; const seen = new Set(); for (const row of rows) { if (!row.jyutping) throw new Error(row.id + ": explicit lexical analysis requires non-empty jyutping"); if (seen.has(row.id)) throw new Error(row.id + ": duplicate ranks 1751–2000 stable analysis ID"); seen.add(row.id); } out[surface] = Object.freeze(rows); } return Object.freeze(out); }
module.exports = Object.freeze({ SOURCE, PROMOTIONS, RESEARCH_REQUIRED_SURFACES, BLOCKED_ATOMIC_SURFACES, MULTI_SURFACES, READING_SPLIT_SURFACES, ALTERNATIVE_SPECS, CANDIDATE_ONLY_SURFACES, DEFAULT_READING_OVERRIDES, isNeutralLexicalEntry, applyReviewedEntries, buildExplicitAnalyses });
