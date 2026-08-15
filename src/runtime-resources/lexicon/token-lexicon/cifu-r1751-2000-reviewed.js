"use strict";

const SOURCE = "docs/research/CIFU-R1751-2000-LEXICAL-ADJUDICATION.md";

const KIND = Object.freeze({
  noun: ["what", "noun", "common_noun"],
  person: ["who", "noun", "person_noun"],
  place: ["where", "noun", "place_noun"],
  verb: ["doing", "verb", "verb"],
  adjective: ["like", "adjective", "stative_predicate"],
  adverb: ["how", "adverb", "adverb"],
  function: ["func", "function", "function"],
  classifier: ["what", "classifier", "classifier"],
  measure: ["what", "measure", "measure_word"],
  bound: ["func", "bound", "bound_morpheme"],
  coverb: ["func", "coverb", "coverb"],
  proper: ["what", "proper_noun", "proper_name"],
  localizer: ["where", "localizer", "localizer"],
  temporal: ["when", "noun", "temporal_expression"],
  interjection: ["func", "interjection", "discourse_interjection"],
});

function lexicalSpec(rank, kind, gloss, jyutping = "", syntax = "") {
  const meta = KIND[kind];
  if (!meta) throw new Error(`unknown lexical kind ${kind}`);
  return Object.freeze({ rank, kind, gloss, jyutping, label: meta[0], pos: meta[1], syntax: syntax || meta[2] });
}

function alt(rank, suffix, kind, gloss, jyutping = "", syntax = "") {
  return Object.freeze({ ...lexicalSpec(rank, kind, gloss, jyutping, syntax), suffix });
}

const PROMOTION_GROUPS = Object.freeze({
  person: Object.freeze([
    [1751,"司長","director / bureau head"], [1767,"老細","boss / proprietor","lou5 sai3"], [1790,"家人","family member(s)"], [1809,"細妹","younger sister","sai3 mui2"],
    [1825,"業主","owner / proprietor"], [1872,"中國人","Chinese person / people"], [1901,"好人","good / decent person"], [1912,"老公","husband"], [1919,"別人","other person / people"],
  ]),
  proper: Object.freeze([
    [1891,"民建聯","Democratic Alliance for the Betterment and Progress of Hong Kong"], [1942,"耶穌","Jesus"],
  ]),
  place: Object.freeze([
    [1843,"戲院","cinema / theatre"], [1876,"天堂","heaven / paradise"],
  ]),
  localizer: Object.freeze([
    [1781,"東面","east side"], [1836,"樓下","downstairs / area below"], [1886,"出邊","outside","ceot1 bin6"], [1926,"呢邊","this side / here","ni1 bin1"], [1943,"背後","behind / at the back"],
  ]),
  temporal: Object.freeze([
    [1769,"初頭","at first / initially","co1 tau4"], [1791,"晏晝","afternoon","aan3 zau3"], [1850,"禮拜三","Wednesday","lai5 baai3 saam1"], [1851,"禮拜六","Saturday","lai5 baai3 luk6"],
    [1873,"五月","May"], [1975,"期間","period / during the period"],
  ]),
  adverb: Object.freeze([
    [1778,"忽然","suddenly"], [1834,"實際上","in fact / in reality / in practice","sat6 zai3 soeng6"], [1854,"轉頭","soon / shortly afterwards","zyun3 tau4"],
    [1883,"以往","in the past / previously"], [1898,"同時","simultaneously / at the same time"], [1923,"依然","still / as before"], [1949,"唔知幾","very / extremely","m4 zi1 gei2","degree_adverb"],
    [1960,"唯有","can only / have no choice but"], [2000,"隨時","at any time / possibly at any time"],
  ]),
  function: Object.freeze([
    [1768,"自從","since / ever since","","temporal_relation_function"], [1962,"得滯","too / excessively","dak1 zai6","excessive_degree_function"], [1971,"連埋","together with / including","lin4 maai4","inclusion_function"],
  ]),
  coverb: Object.freeze([
    [1759,"在","formal locative relation at / in / on","zoi6","locative_relation_coverb"],
  ]),
  adjective: Object.freeze([
    [1765,"忙","busy"], [1772,"足夠","enough / sufficient"], [1785,"長遠","long-term / far-reaching"], [1793,"窄","narrow"], [1797,"唯一","only / sole"], [1820,"普遍","general / widespread / common"],
    [1837,"瘦","thin / lean"], [1841,"遲","late / delayed / slow"], [1857,"穩定","stable / steady"], [1859,"嚴重","serious / severe"], [1864,"一模一樣","exactly the same / identical"],
    [1888,"可憐","pitiful / pitiable"], [1896,"合法","legal / lawful"], [1902,"好味","tasty / delicious","hou2 mei6"], [1905,"年青","young / youthful"], [1908,"攰","tired"],
    [1920,"完整","complete / intact"], [1953,"特殊","special / unusual"], [1954,"狹窄","narrow / cramped"], [1965,"清晰","clear / distinct"], [1976,"無謂","pointless / needless"],
  ]),
  verb: Object.freeze([
    [1756,"甩","come off / detach / lose / get rid of"], [1766,"成年","come of age / become adult"], [1782,"欣賞","appreciate / admire / enjoy"], [1818,"換","change / exchange / replace"],
    [1821,"評價","evaluate / assess"], [1832,"鼓勵","encourage"], [1833,"嘔","vomit / retch"], [1838,"賭","gamble / bet"], [1839,"踩","step / tread / pedal"], [1846,"聯絡","contact / get in touch with"],
    [1860,"屬於","belong to / be classified as"], [1863,"顯示","show / display / demonstrate"], [1869,"上堂","attend class / give a lesson","soeng5 tong4"], [1875,"反映","reflect / reveal / report"],
    [1885,"出席","attend / be present"], [1889,"失","lose / miss / fail"], [1915,"行路","walk / travel on foot","haang4 lou6"], [1922,"使錢","spend money","sai2 cin2"],
    [1933,"侮辱","insult / humiliate"], [1934,"保護","protect / safeguard"], [1950,"孭","carry on the back / shoulder","me1"], [1955,"退","retreat / withdraw / recede"],
    [1956,"針對","target / direct at / address specifically"], [1968,"規定","stipulate / prescribe / set"], [1980,"開會","hold / attend a meeting"], [1990,"監察","monitor / supervise"],
    [1998,"擁有","possess / own"], [1999,"輸","lose / transport / transmit"],
  ]),
  measure: Object.freeze([
    [1897,"吋","inch"],
  ]),
  interjection: Object.freeze([
    [1935,"哈哈","laughter / ha-ha","haa1 haa1"],
  ]),
  noun: Object.freeze([
    [1753,"本地","the local area / locality"], [1755,"正版","authorized / genuine edition or copy","zing3 baan2"], [1774,"事業","career / undertaking / cause"], [1783,"股價","share / stock price"],
    [1788,"重心","centre of gravity / central focus"], [1789,"哲學","philosophy"], [1794,"粉","powder / flour-derived food / cosmetic powder"], [1795,"做法","method / way of doing / practice"],
    [1798,"唱片","record / music album"], [1799,"婚姻","marriage / matrimony"], [1804,"現象","phenomenon"], [1808,"粗口","swear words / obscene language"], [1811,"規則","rule / regulation"],
    [1814,"創意","creativity / creative idea"], [1819,"普通話","Putonghua / Mandarin"], [1822,"意義","meaning / significance"], [1823,"愛情","romantic love / love relationship"], [1824,"業","business / occupation / profession / field"],
    [1828,"罪行","crime / offence"], [1830,"遊戲","game / play"], [1831,"電訊","telecommunications"], [1840,"燕梳","insurance / insurance policy","jin3 so1"], [1844,"擦紙膠","eraser / rubber","caat3 zi2 gaau1"],
    [1847,"講法","way of saying / formulation / account"], [1855,"額","forehead / amount / quota / limit"], [1856,"鯉","carp"], [1867,"人生","human life / a person's life"], [1874,"內心","inner feelings / inner self"],
    [1877,"太陽","the sun"], [1878,"心態","mindset / mentality / attitude"], [1882,"仙人掌","cactus"], [1890,"民主","democracy"], [1892,"生物","living organism / biological entity"],
    [1894,"全名","full name","cyun4 meng2"], [1900,"地球","Earth / planet Earth"], [1906,"年齡","age"], [1907,"式","form / type / style / pattern"], [1931,"板","board / plank / plate / slab"],
    [1938,"星","star / celestial body"], [1939,"洲","continent / island / land mass"], [1945,"飛碟","flying saucer / frisbee"], [1946,"個案","case / individual case"], [1952,"特色","distinctive feature / characteristic"],
    [1963,"梳打","soda","so1 daa2"], [1967,"船","boat / ship / vessel"], [1969,"貨櫃","freight / shipping container"], [1970,"責任","responsibility / duty / liability"], [1973,"單位","unit / work unit / apartment / unit of measure"],
    [1982,"傳媒","media / mass media"], [1987,"運動","exercise / sport / movement / campaign"], [1988,"圖標","icon / graphical symbol"], [1992,"網球","tennis"], [1994,"價","price / value / cost"],
    [1995,"嘴","mouth / beak / spout","zeoi2"], [1997,"數學","mathematics"],
  ]),
});

const PROMOTION_ROWS = Object.freeze(Object.entries(PROMOTION_GROUPS).flatMap(([kind, rows]) => rows.map(([rank, surface, gloss, jyutping = "", syntax = ""]) => [rank, surface, kind, gloss, jyutping, syntax])));
const PROMOTIONS = Object.freeze(Object.fromEntries(PROMOTION_ROWS.map(([rank,surface,kind,gloss,jyutping="",syntax=""]) => [surface, lexicalSpec(rank,kind,gloss,jyutping,syntax)])));

const RESEARCH_REQUIRED_SURFACES = new Set(["山個","猷"]);
const BLOCKED_ATOMIC_SURFACES = new Set([
  "正上方","再行","好多人","好快","好近","好遠","我問","兩點","第二個韻","就講","幾日","當你","當我","幫到","講開","轉右","邊間","聽到","九十度","十一點","下畫","加返","由個",
  "好靚","有位","考到","行返","你明","你識","我明","兩位","定下","返番","要畫","哩件","兜個","會有"
]);

const ALTERNATIVE_SPECS = Object.freeze({
  "必要": Object.freeze([alt(1752,"necessary_stative","adjective","necessary / essential"),alt(1752,"necessity_noun","noun","necessity / need")]),
  "光": Object.freeze([alt(1757,"bright_stative","adjective","bright"),alt(1757,"light_noun","noun","light"),alt(1757,"only_adverb","adverb","only / merely")]),
  "妄想": Object.freeze([alt(1764,"fantasize_verb","verb","fantasize unrealistically"),alt(1764,"delusion_noun","noun","delusion / unrealistic idea")]),
  "局": Object.freeze([alt(1770,"office_round_noun","noun","bureau / office / round / situation"),alt(1770,"game_classifier","classifier","classifier for games / matches / rounds")]),
  "邪": Object.freeze([alt(1773,"evil_stative","adjective","evil / heretical / strange"),alt(1773,"evil_influence_noun","noun","evil influence / misfortune")]),
  "咀": Object.freeze([alt(1776,"mouth_noun","noun","mouth / spout variant of 嘴","zeoi2"),alt(1776,"kiss_verb","verb","kiss","zeoi2")]),
  "定義": Object.freeze([alt(1777,"definition_noun","noun","definition"),alt(1777,"define_verb","verb","define")]),
  "杯": Object.freeze([alt(1780,"cup_noun","noun","cup / glass"),alt(1780,"cupful_classifier","classifier","classifier for cupfuls / drinks")]),
  "表現": Object.freeze([alt(1784,"show_verb","verb","show / manifest"),alt(1784,"performance_noun","noun","performance / manifestation")]),
  "保險": Object.freeze([alt(1786,"insurance_noun","noun","insurance"),alt(1786,"safe_stative","adjective","safe / cautious")]),
  "活動": Object.freeze([alt(1787,"activity_noun","noun","activity"),alt(1787,"move_verb","verb","move about / operate / be active")]),
  "健康": Object.freeze([alt(1796,"health_noun","noun","health"),alt(1796,"healthy_stative","adjective","healthy")]),
  "接觸": Object.freeze([alt(1800,"contact_verb","verb","contact / touch"),alt(1800,"contact_noun","noun","contact / interaction")]),
  "清": Object.freeze([alt(1802,"clear_stative","adjective","clear / clean / pure"),alt(1802,"clear_verb","verb","clear / clean / set straight")]),
  "笪": Object.freeze([alt(1805,"patch_classifier","classifier","classifier for a patch / plot / area","daat3"),alt(1805,"mat_noun","noun","rough bamboo mat","daat3")]),
  "終": Object.freeze([alt(1810,"end_noun","noun","end / conclusion"),alt(1810,"end_verb","verb","end / finish"),alt(1810,"finally_adverb","adverb","finally / in the end")]),
  "通": Object.freeze([alt(1812,"connect_verb","verb","pass / connect / communicate / understand"),alt(1812,"through_stative","adjective","through / general / unobstructed"),alt(1812,"communication_classifier","classifier","measure family for communications")]),
  "通知": Object.freeze([alt(1813,"notify_verb","verb","notify / inform"),alt(1813,"notice_noun","noun","notification / notice")]),
  "創新": Object.freeze([alt(1815,"innovative_stative","adjective","innovative / pioneering"),alt(1815,"innovate_verb","verb","innovate / introduce something new")]),
  "較": Object.freeze([alt(1829,"comparative_adverb","adverb","comparatively / rather","gaau3","comparative_degree_adverb"),alt(1829,"compare_verb","verb","compare / contest / haggle","gaau3")]),
  "慳": Object.freeze([alt(1835,"save_verb","verb","save / economize","haan1"),alt(1835,"thrifty_stative","adjective","thrifty / frugal","haan1")]),
  "營": Object.freeze([alt(1845,"camp_noun","noun","camp / barracks / battalion","jing4"),alt(1845,"operate_verb","verb","operate / manage / run","jing4")]),
  "翻譯": Object.freeze([alt(1852,"translate_verb","verb","translate / interpret"),alt(1852,"translation_noun","noun","translation / interpreter")]),
  "黐": Object.freeze([alt(1862,"stick_verb","verb","stick / adhere / cling","ci1"),alt(1862,"sticky_stative","adjective","sticky","ci1")]),
  "一邊": Object.freeze([alt(1865,"one_side_localizer","localizer","one side","jat1 bin1"),alt(1865,"simultaneous_member","function","member of paired 一邊…一邊… simultaneous construction","jat1 bin1","simultaneous_pair_member")]),
  "止": Object.freeze([alt(1880,"stop_verb","verb","stop / halt / prohibit","zi2"),alt(1880,"only_adverb","adverb","only / still / calm formal family","zi2")]),
  "火星": Object.freeze([alt(1881,"mars_proper","proper","Mars","fo2 sing1"),alt(1881,"spark_noun","noun","spark","fo2 sing1")]),
  "安全": Object.freeze([alt(1904,"safety_noun","noun","safety / security","on1 cyun4"),alt(1904,"safe_stative","adjective","safe / secure","on1 cyun4")]),
  "曲": Object.freeze([alt(1909,"song_noun","noun","song / tune","kuk1"),alt(1909,"crooked_stative","adjective","bent / crooked","kuk1")]),
  "味": Object.freeze([alt(1927,"taste_noun","noun","taste / smell / flavour","mei6"),alt(1927,"taste_verb","verb","taste / savour","mei6"),alt(1927,"taste_classifier","classifier","classifier / measure family for tastes or kinds","mei6")]),
  "指示": Object.freeze([alt(1936,"indicate_verb","verb","indicate / instruct","zi2 si6"),alt(1936,"instruction_noun","noun","instruction / directive","zi2 si6")]),
  "故": Object.freeze([alt(1937,"reason_noun","noun","reason / cause / event","gu3"),alt(1937,"former_modifier","adjective","former / deceased / old","gu3"),alt(1937,"therefore_function","function","therefore / hence formal connective","gu3","causal_relation_function")]),
  "原": Object.freeze([alt(1947,"original_stative","adjective","original / former / raw","jyun4"),alt(1947,"source_noun","noun","source / origin","jyun4"),alt(1947,"formal_bound","bound","formal verbal / bound family","jyun4")]),
  "旅遊": Object.freeze([alt(1951,"travel_verb","verb","travel / tour","leoi5 jau4"),alt(1951,"travel_noun","noun","travel / tourism","leoi5 jau4")]),
  "偈": Object.freeze([alt(1957,"gai2_noun","noun","Cantonese gai2 noun family: engine / condition / related conventional senses","gai2"),alt(1957,"gai2_bound","bound","Cantonese gai2 bound / conversational lexical family","gai2")]),
  "副": Object.freeze([alt(1959,"secondary_modifier","adjective","secondary / deputy / vice-","fu3"),alt(1959,"deputy_noun","noun","deputy / assistant","fu3"),alt(1959,"pair_classifier","classifier","classifier for pairs / sets","fu3")]),
  "專業": Object.freeze([alt(1961,"professional_stative","adjective","professional","zyun1 jip6"),alt(1961,"expertise_noun","noun","professional expertise / profession","zyun1 jip6")]),
  "現實": Object.freeze([alt(1966,"reality_noun","noun","reality","jin6 sat6"),alt(1966,"real_stative","adjective","real / realistic / actual","jin6 sat6")]),
  "陰": Object.freeze([alt(1972,"yin_noun","noun","yin / shade / negative side","jam1"),alt(1972,"dark_stative","adjective","overcast / dark / hidden","jam1"),alt(1972,"trick_verb","verb","trick / set up","jam1")]),
  "悶": Object.freeze([alt(1974,"bored_stative","adjective","bored / stuffy / depressed","mun6"),alt(1974,"smother_verb","verb","cover / smother / keep shut","mun6")]),
  "發達": Object.freeze([alt(1977,"develop_verb","verb","develop / prosper / get rich","faat3 daat6"),alt(1977,"developed_stative","adjective","developed / prosperous","faat3 daat6")]),
  "煩": Object.freeze([alt(1985,"annoying_stative","adjective","annoying / troublesome / fed up","faan4"),alt(1985,"bother_verb","verb","bother / annoy / trouble","faan4")]),
  "實際": Object.freeze([alt(1989,"reality_noun","noun","reality / practice","sat6 zai3"),alt(1989,"practical_stative","adjective","actual / practical / realistic","sat6 zai3")]),
  "端": Object.freeze([alt(1991,"end_noun","noun","end / extremity / item / side","dyun1"),alt(1991,"hold_verb","verb","hold / carry level","dyun1"),alt(1991,"upright_stative","adjective","upright / regular","dyun1")]),
  "齊": Object.freeze([alt(1993,"complete_stative","adjective","complete / even / aligned","cai4"),alt(1993,"together_adverb","adverb","together / all at once","cai4"),alt(1993,"qi_proper","proper","Qi proper-name family","cai4")]),

  "拃": Object.freeze([alt(1779,"handful_classifier","classifier","classifier for handfuls / groups","zaa6"),alt(1779,"obstruct_verb","verb","obstruct / block","zaa6"),alt(1779,"handspan_measure","measure","handspan measure","zaa3")]),
  "校": Object.freeze([alt(1792,"school_noun","noun","school / school bound family","haau6"),alt(1792,"proofread_verb","verb","proofread / check / compare","gaau3"),alt(1792,"officer_bound","bound","field-officer bound family","gaau3")]),
  "梗": Object.freeze([alt(1801,"fixed_stative","adjective","fixed / rigid","gang2"),alt(1801,"certainly_adverb","adverb","certainly / definitely","gang2"),alt(1801,"stem_noun","noun","stem / stalk","kwaang2")]),
  "率": Object.freeze([alt(1803,"lead_verb","verb","lead / command","seot1"),alt(1803,"frank_stative","adjective","frank / hasty formal family","seot1"),alt(1803,"rate_noun","noun","rate / ratio / frequency","leot6")]),
  "第時": Object.freeze([alt(1807,"future_si4","temporal","future / later / next time","dai6 si4"),alt(1807,"future_si2","temporal","future / later / next time variant","dai6 si2")]),
  "黏": Object.freeze([alt(1849,"stick_nim4","verb","stick / adhere","nim4"),alt(1849,"sticky_nim1","adjective","sticky / glutinous","nim1")]),
  "文": Object.freeze([alt(1879,"writing_man4","noun","writing / language / literature / culture","man4"),alt(1879,"literary_man4","adjective","literary / civil","man4"),alt(1879,"money_changed_tone","classifier","changed-tone money / classifier family","man1"),alt(1879,"cover_man6","verb","cover / paint over formal family","man6")]),
  "凹": Object.freeze([alt(1884,"concave_nap1","adjective","concave / sunken","nap1"),alt(1884,"restricted_aau3","adjective","restricted alternate concave reading","aau3"),alt(1884,"placename_waa1","bound","restricted placename / bound reading","waa1")]),
  "合": Object.freeze([alt(1895,"combine_hap6","verb","combine / fit / join","hap6"),alt(1895,"music_ho4","noun","musical-note noun","ho4"),alt(1895,"grain_gap3","measure","grain measure","gap3")]),
  "同樣": Object.freeze([alt(1899,"same_joeng6","adjective","same / similar / equal","tung4 joeng6"),alt(1899,"similarly_joeng6","adverb","similarly / in the same way","tung4 joeng6"),alt(1899,"same_type_joeng2","noun","changed-tone same-type family","tung4 joeng2")]),
  "有份": Object.freeze([alt(1910,"have_share_fan2","verb","have a share / participate / be involved","jau5 fan2")]),
  "判斷": Object.freeze([alt(1918,"judge_dyun3","verb","judge / determine","pun3 dyun3"),alt(1918,"judgment_dyun6","noun","judgment / determination","pun3 dyun6")]),
  "兔仔": Object.freeze([alt(1924,"rabbit_zai2","noun","rabbit / bunny","tou3 zai2")]),
  "和": Object.freeze([alt(1928,"and_wo4","function","formal and / with / harmony family","wo4","coordination_relation"),alt(1928,"respond_wo6","verb","respond in singing / blend family","wo6"),alt(1928,"mahjong_wu2","verb","complete / win a mahjong hand","wu2")]),
  "姊妹": Object.freeze([alt(1929,"sisters_mui6","person","sisters","zi2 mui6"),alt(1929,"close_friends_mui2","person","changed-tone sisters / close female friends","zi2 mui2")]),
  "界定": Object.freeze([alt(1940,"define_deng6","verb","define / delimit","gaai3 deng6")]),
  "紅籌": Object.freeze([alt(1941,"red_chip_cau2","noun","red chip / red-chip stock","hung4 cau2"),alt(1941,"compound_cau4","bound","base / compound red-chip reading","hung4 cau4")]),
  "淨": Object.freeze([alt(1964,"clean_zing6","adjective","clean / pure / net formal family","zing6"),alt(1964,"only_zing6","adverb","only / merely / net","zing6"),alt(1964,"cleanse_zing6","verb","cleanse / make clean","zing6"),alt(1964,"clean_zeng6","adjective","colloquial clean / pure","zeng6")]),
  "硬係": Object.freeze([alt(1978,"emphatic_changed","adverb","definitely / insistently","ngaang2 hai6"),alt(1978,"emphatic_base","adverb","base-linked emphatic variant","ngaang6 hai6")]),
  "量": Object.freeze([alt(1979,"measure_loeng4","verb","measure / consider","loeng4"),alt(1979,"amount_loeng6","noun","amount / capacity / quantity","loeng6"),alt(1979,"estimate_loeng6","verb","estimate / gauge","loeng6")]),
  "傳": Object.freeze([alt(1981,"transmit_cyun4","verb","transmit / spread / pass on","cyun4"),alt(1981,"biography_zyun6","noun","biography / account / commentary","zyun6")]),
  "傾計": Object.freeze([alt(1983,"chat_gai2","verb","chat / talk","king1 gai2")]),
  "撈": Object.freeze([alt(1996,"mix_earn_lou1","verb","mix / earn a living / make money","lou1"),alt(1996,"scoop_laau4","verb","scoop / dredge / fish out","laau4")]),
});

const MULTI_SURFACES = new Set(["必要","光","妄想","局","邪","咀","定義","杯","表現","保險","活動","健康","接觸","清","笪","終","通","通知","創新","較","慳","營","翻譯","黐","一邊","止","火星","安全","曲","味","指示","故","原","旅遊","偈","副","專業","現實","陰","悶","發達","煩","實際","端","齊"]);
const READING_SPLIT_SURFACES = new Set(["拃","校","梗","率","第時","黏","文","凹","合","同樣","有份","判斷","兔仔","和","姊妹","界定","紅籌","淨","硬係","量","傳","傾計","撈"]);
const CANDIDATE_ONLY_SURFACES = new Set(Object.keys(ALTERNATIVE_SPECS));

const DEFAULT_READING_OVERRIDES = Object.freeze({
  "正版":"zing3 baan2", "老細":"lou5 sai3", "初頭":"co1 tau4", "晏晝":"aan3 zau3", "細妹":"sai3 mui2", "實際上":"sat6 zai3 soeng6",
  "燕梳":"jin3 so1", "擦紙膠":"caat3 zi2 gaau1", "禮拜三":"lai5 baai3 saam1", "禮拜六":"lai5 baai3 luk6", "轉頭":"zyun3 tau4", "出邊":"ceot1 bin6",
  "全名":"cyun4 meng2", "好味":"hou2 mei6", "呢邊":"ni1 bin1", "唔知幾":"m4 zi1 gei2", "孭":"me1", "梳打":"so1 daa2",
  "拃":"zaa6", "校":"haau6", "梗":"gang2", "率":"leot6", "第時":"dai6 si4", "黏":"nim4", "文":"man4", "凹":"nap1", "合":"hap6", "同樣":"tung4 joeng6",
  "有份":"jau5 fan2", "判斷":"pun3 dyun3", "兔仔":"tou3 zai2", "和":"wo4", "姊妹":"zi2 mui6", "界定":"gaai3 deng6", "紅籌":"hung4 cau2", "淨":"zing6",
  "硬係":"ngaang2 hai6", "量":"loeng4", "傳":"cyun4", "傾計":"king1 gai2", "撈":"lou1"
});

function isNeutralLexicalEntry(entry) {
  return Boolean(entry) && entry.label === "lex" && entry.pos === "lexical_item" && entry.syntax === "lexical_item";
}

function applyReviewedEntries(entries) {
  if (!Array.isArray(entries)) throw new TypeError("ranks 1751–2000 reviewed overlay requires an entry array");
  return entries.map(([surface, entry]) => {
    const promotion = PROMOTIONS[surface];
    let next = entry;
    if (promotion && isNeutralLexicalEntry(next)) {
      next = {
        ...next,
        label: promotion.label,
        pos: promotion.pos,
        syntax: promotion.syntax,
        jyutping: promotion.jyutping || next.jyutping || "",
        note: promotion.gloss,
        provenance: {
          kind: "reviewed_lexical_promotion",
          source: SOURCE,
          rank: promotion.rank,
          pronunciation_status: promotion.jyutping ? "reviewed_explicit_reading" : "inherited_runtime_candidate_not_independently_promoted",
          prior_provenance: next.provenance || null,
        },
      };
    }
    const reviewedReading = DEFAULT_READING_OVERRIDES[surface];
    if (reviewedReading && next && next.jyutping !== reviewedReading) {
      next = {
        ...next,
        jyutping: reviewedReading,
        provenance: {
          kind: isNeutralLexicalEntry(next) ? "reviewed_candidate_default_pronunciation" : "reviewed_default_pronunciation_correction",
          source: SOURCE,
          pronunciation_status: "reviewed_explicit_reading",
          prior_provenance: next.provenance || null,
        },
      };
    }
    return [surface, next];
  });
}

function defaultAnalysis(surface, entry) {
  return Object.freeze({
    id: `lex:${surface}:default`,
    label: entry.label || "neutral",
    pos: entry.pos || "lexical_item",
    jyutping: entry.jyutping || "",
    syntax: entry.syntax || "lexical_candidate",
    senses: Object.freeze([{ gloss: entry.note || "existing runtime default preserved" }]),
    provenance: Object.freeze({ kind: "existing_runtime_default_preserved", source: "v0.5.236 token lexicon before ranks 1751–2000 alternatives", prior_provenance: entry.provenance || null }),
  });
}

function reviewedAlternative(surface, spec, defaultEntry) {
  return Object.freeze({
    id: `lex:${surface}:r${spec.rank}:${spec.suffix}`,
    label: spec.label,
    pos: spec.pos,
    jyutping: spec.jyutping || defaultEntry.jyutping || "",
    syntax: spec.syntax,
    senses: Object.freeze([{ gloss: spec.gloss }]),
    provenance: Object.freeze({ kind: "reviewed_lexical_analysis", source: SOURCE, rank: spec.rank, pronunciation_status: spec.jyutping ? "reviewed_explicit_reading" : "inherited_runtime_candidate_not_independently_promoted" }),
  });
}

function buildExplicitAnalyses(entries) {
  const defaults = new Map(entries || []);
  const out = Object.create(null);
  for (const [surface, specs] of Object.entries(ALTERNATIVE_SPECS)) {
    const entry = defaults.get(surface);
    if (!entry) throw new Error(`ranks 1751–2000 explicit analyses reference missing runtime surface: ${surface}`);
    const rows = [defaultAnalysis(surface, entry), ...specs.map((spec) => reviewedAlternative(surface, spec, entry))];
    const seen = new Set();
    for (const row of rows) {
      if (!row.jyutping) throw new Error(`${row.id}: explicit lexical analysis requires non-empty jyutping`);
      if (seen.has(row.id)) throw new Error(`${row.id}: duplicate ranks 1751–2000 stable analysis ID`);
      seen.add(row.id);
    }
    out[surface] = Object.freeze(rows);
  }
  return Object.freeze(out);
}

module.exports = Object.freeze({
  SOURCE, PROMOTION_GROUPS, PROMOTIONS, RESEARCH_REQUIRED_SURFACES, BLOCKED_ATOMIC_SURFACES, MULTI_SURFACES, READING_SPLIT_SURFACES,
  ALTERNATIVE_SPECS, CANDIDATE_ONLY_SURFACES, DEFAULT_READING_OVERRIDES, isNeutralLexicalEntry, applyReviewedEntries, buildExplicitAnalyses,
});
