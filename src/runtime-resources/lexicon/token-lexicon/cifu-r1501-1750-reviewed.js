"use strict";

const SOURCE = "docs/research/ISSUE-892-CIFU-R1501-1750-LEXICAL-ADJUDICATION.md";

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
});

function lexicalSpec(rank, kind, gloss, jyutping = "", syntax = "") {
  const meta = KIND[kind];
  if (!meta) throw new Error(`unknown lexical kind ${kind}`);
  return Object.freeze({ rank, kind, gloss, jyutping, label: meta[0], pos: meta[1], syntax: syntax || meta[2] });
}

function alt(rank, suffix, kind, gloss, jyutping = "", syntax = "") {
  return Object.freeze({ ...lexicalSpec(rank, kind, gloss, jyutping, syntax), suffix });
}

const PROMOTION_ROWS = Object.freeze([
  [1501,"削","verb","cut / pare / sharpen"], [1502,"屋企人","person","family member"], [1504,"查","verb","check / investigate / search"],
  [1508,"剛才","temporal","just now"], [1509,"容許","verb","allow / permit"], [1510,"效率","noun","efficiency"], [1512,"特登","adverb","deliberately / on purpose"],
  [1514,"唪","verb","recite / chant loudly","fung2"], [1515,"從來","adverb","ever / always / from the beginning"], [1518,"貨","noun","goods / merchandise"],
  [1519,"郭富城","proper","Aaron Kwok","gwok3 fu3 sing4"], [1522,"牌子","noun","brand / sign / label"], [1523,"等於","verb","equal / be equivalent to"],
  [1526,"媽咪","person","mum / mummy"], [1527,"搞掂","verb","finish / settle / fix successfully"], [1528,"經常","adverb","often / regularly"], [1529,"聖誕","temporal","Christmas"],
  [1537,"醫院","place","hospital"], [1538,"離婚","verb","divorce / be divorced"], [1541,"辭典","noun","dictionary"], [1542,"邊緣","noun","edge / periphery / margin"],
  [1544,"讓","verb","let / allow / yield"], [1550,"中心","noun","centre / core"], [1551,"中醫","noun","Traditional Chinese Medicine / practitioner"],
  [1552,"之中","localizer","inside / among / within"], [1553,"互相","adverb","mutually / each other","","reciprocal_function"], [1555,"太太","person","wife / Mrs. / madam"],
  [1556,"日後","temporal","later / in the future"], [1557,"主角","person","leading role / protagonist"], [1558,"主題","noun","theme / topic"], [1559,"出聲","verb","make a sound / speak up"],
  [1560,"台灣","proper","Taiwan"], [1564,"目的","noun","purpose / aim / goal"], [1567,"好笑","adjective","funny / laughable"], [1569,"扣","verb","fasten / deduct / detain / arrest"],
  [1570,"收埋","verb","put away / hide / conceal"], [1571,"自信","noun","self-confidence","zi6 seon3"], [1572,"作","verb","make / do / compose / write / pretend"],
  [1577,"身體","noun","body / health"], [1579,"咁滯","adverb","almost / nearly / roughly"], [1582,"金融","noun","finance / banking"], [1584,"政治","noun","politics"],
  [1586,"為止","function","up to / until","","temporal_boundary_function"], [1587,"界","noun","boundary / domain / sphere"], [1588,"閂","verb","shut / close / switch off","saan1"],
  [1589,"面前","localizer","in front of / in the presence of"], [1592,"唔錯","adjective","not bad / pretty good"], [1593,"庭","noun","court / courtyard"], [1594,"秘書","person","secretary"],
  [1597,"茶","noun","tea"], [1598,"骨折","verb","suffer / have a fracture","gwat1 zit3","medical_event_predicate"], [1600,"接","verb","receive / connect / take over / answer"],
  [1601,"痕","noun","mark / scar / trace"], [1603,"速度","noun","speed / rate / velocity"], [1604,"部門","noun","department / division"], [1609,"幾點","temporal","what time","gei2 dim2","interrogative_time_expression"],
  [1612,"琴日","temporal","yesterday"], [1614,"稅","noun","tax / duty"], [1615,"黑色","noun","black / black color","","color_expression"], [1616,"傷害","verb","injure / harm"],
  [1617,"傾偈","verb","chat / talk"], [1621,"照顧","verb","take care of / look after"], [1626,"網","noun","net / network"], [1628,"增加","verb","increase / add"],
  [1629,"數字","noun","digit / number / figure"], [1632,"燈","noun","lamp / light"], [1633,"牆","noun","wall"], [1635,"嚮","coverb","at / toward / in the direction of","","directional_relation_coverb"],
  [1637,"一刻","temporal","an instant / the moment"], [1641,"十分","adverb","very / extremely","","degree_adverb"], [1642,"中學","place","secondary school"],
  [1643,"之內","localizer","within / inside"], [1644,"今","temporal","now / current / this"], [1645,"內容","noun","content / details"], [1646,"水草","noun","aquatic plants"], [1647,"牙","noun","tooth"],
  [1651,"合理","adjective","reasonable / rational"], [1653,"好食","adjective","tasty / good to eat"], [1655,"好聽","adjective","pleasant to hear / sound good"], [1656,"成熟","adjective","mature / ripe"],
  [1657,"早餐","noun","breakfast"], [1660,"西面","localizer","west side"], [1661,"佔","verb","occupy / account for / constitute"], [1662,"判","verb","judge / sentence / decide"],
  [1663,"即將","function","about to","","prospective_function"], [1664,"形象","noun","image / figure"], [1666,"私家","adjective","private / privately owned","","relational_modifier"],
  [1671,"居民","person","resident / inhabitant"], [1672,"直角","noun","right angle"], [1674,"股份","noun","share / stock"], [1675,"門口","localizer","doorway / entrance"],
  [1676,"既然","function","since / as, this being the case","","causal_subordinator"], [1677,"珍惜","verb","treasure / value / cherish"], [1678,"相處","verb","get along / interact"],
  [1680,"音","noun","sound / tone / syllable / reading"], [1682,"員","person","member / person nominal"], [1684,"時效","noun","timeliness / validity over time"], [1685,"校長","person","headmaster / principal"],
  [1686,"核突","adjective","ugly / disgusting"], [1687,"案件","noun","legal case"], [1689,"財務","noun","financial affairs / finance"], [1691,"乾淨","adjective","clean / neat"],
  [1692,"唱","verb","sing"], [1693,"商業","noun","commerce / business"], [1695,"國內","localizer","within the country / domestic sphere"], [1699,"提到","verb","mention / refer to"],
  [1700,"插","verb","insert / stick / pierce / interpose"], [1701,"琴晚","temporal","last night","kam4 maan5"], [1702,"痛","adjective","painful / hurt / ache","tung3"],
  [1703,"睇住","verb","watch / keep an eye on / watch out","tai2 zyu6"], [1704,"窗","noun","window","coeng1"], [1708,"溜","verb","slip away / escape / skate","lau6"],
  [1709,"溫暖","adjective","warm","wan1 nyun5"], [1710,"罪","noun","crime / guilt / sin / fault","zeoi6"], [1712,"詳細","adjective","detailed","coeng4 sai3"],
  [1714,"遇到","verb","encounter / come across","jyu6 dou2"], [1715,"電芯","noun","battery cell","din6 sam1"], [1716,"嘉賓","person","honoured guest","gaa1 ban1"],
  [1717,"對面","localizer","opposite / across from","deoi3 min6"], [1718,"製造","verb","manufacture / make","zai3 zou6"], [1720,"黎明","temporal","dawn / daybreak","lai4 ming4"],
  [1721,"橫線","noun","horizontal line","waang4 sin3"], [1722,"澳門","proper","Macau","ou3 mun2"], [1723,"燒","verb","burn / cook / roast","siu1"], [1725,"龜","noun","turtle / tortoise","gwai1"],
  [1726,"尷尬","adjective","awkward / embarrassed"], [1727,"闊","adjective","wide / broad / lavish"], [1732,"廳","place","hall / reception room / office"],
  [1734,"一號","noun","Hong Kong No. 1 typhoon signal","jat1 hou6","typhoon_signal_noun"], [1735,"九月","temporal","September"], [1736,"人話","noun","human / intelligible / sensible speech","jan4 waa6","speech_expression"],
  [1737,"千祈","adverb","by all means / whatever you do / definitely not","","emphatic_adverb"], [1738,"工人","person","worker"], [1739,"工業","noun","industry"],
  [1743,"巴士","noun","bus"], [1744,"心胸","noun","breadth of mind / disposition"], [1745,"比例","noun","proportion / ratio / scale"], [1746,"牛肉","noun","beef"], [1747,"冬天","temporal","winter"],
]);

const PROMOTIONS = Object.freeze(Object.fromEntries(PROMOTION_ROWS.map(([rank,surface,kind,gloss,jyutping="",syntax=""]) => [surface, lexicalSpec(rank,kind,gloss,jyutping,syntax)])));

const RESEARCH_REQUIRED_SURFACES = new Set(["罷","羅","司","個萍","單仲佳","感","會會","碧"]);
const BLOCKED_ATOMIC_SURFACES = new Set([
  "要講","幾咁","養魚","講講","一件","一部份","一棵","十年","今個","先得","好少","好煩","你畫","即要","我識","兩條","返轉頭","食到","就會","幾靚","畫一個","講多次","一套","一部","十二點","去過","多過","好悶","西行","兩日","兩樣","呢種","個頭","唔多","高過","問吓","最右","最底","貼住","開燈","邊有","聽過","一句","五個","半年"
]);

const ALTERNATIVE_SPECS = Object.freeze({
  "架構": Object.freeze([alt(1503,"framework_noun","noun","framework / structure"),alt(1503,"construct_verb","verb","construct / structure")]),
  "重複": Object.freeze([alt(1506,"repeat_verb","verb","repeat / do again","cung4 fuk1"),alt(1506,"again_adverb","adverb","again / repeatedly","cung4 fuk1")]),
  "根據": Object.freeze([alt(1511,"according_coverb","coverb","according to / on the basis of","","relation_coverb"),alt(1511,"basis_noun","noun","basis / evidence"),alt(1511,"base_on_verb","verb","base on")]),
  "教授": Object.freeze([alt(1516,"teach_verb","verb","teach / instruct"),alt(1516,"professor_noun","person","professor")]),
  "焗": Object.freeze([alt(1517,"bake_force_verb","verb","bake / heat / force / restrict","guk6"),alt(1517,"stuffy_stative","adjective","stuffy / hot of air, room, or weather","guk6")]),
  "費事": Object.freeze([alt(1524,"avoidance_function","function","not bother / so as to avoid / not worth the trouble","fai3 si6","avoidance_function"),alt(1524,"troublesome_stative","adjective","troublesome / time-consuming written-register use","fai3 si6")]),
  "預": Object.freeze([alt(1530,"anticipate_reserve_verb","verb","anticipate / reserve / prepare / include in advance"),alt(1530,"advance_bound","bound","pre- / in-advance bound family")]),
  "認識": Object.freeze([alt(1531,"know_verb","verb","know / recognize"),alt(1531,"knowledge_noun","noun","knowledge / awareness")]),
  "錄音": Object.freeze([alt(1535,"record_sound_verb","verb","record sound"),alt(1535,"recording_noun","noun","sound recording")]),
  "類": Object.freeze([alt(1543,"kind_noun","noun","kind / type"),alt(1543,"category_classifier","classifier","classifier / category function")]),
  "叉": Object.freeze([alt(1549,"fork_noun","noun","fork / prong"),alt(1549,"fork_pierce_verb","verb","fork / pierce / cross"),alt(1549,"food_bound","bound","bound food-name family")]),
  "白": Object.freeze([alt(1563,"white_stative","adjective","white / clear / plain"),alt(1563,"in_vain_free_adverb","adverb","in vain / for free"),alt(1563,"surname","proper","surname Baak")]),
  "封": Object.freeze([alt(1583,"seal_bestow_verb","verb","seal / bestow"),alt(1583,"sealed_item_classifier","classifier","classifier for letters / sealed items")]),
  "站": Object.freeze([alt(1595,"station_noun","noun","station / site / branch"),alt(1595,"stand_halt_verb","verb","stand / halt")]),
  "能": Object.freeze([alt(1596,"ability_function","function","formal can / be able to","","modal_ability"),alt(1596,"ability_energy_bound","bound","ability / energy bound nominal family")]),
  "參考": Object.freeze([alt(1599,"consult_verb","verb","consult / refer to"),alt(1599,"reference_noun","noun","reference / basis for comparison")]),
  "期": Object.freeze([alt(1611,"period_noun","noun","period / term"),alt(1611,"period_classifier","classifier","classifier / measure for issues, courses, or periods")]),
  "損失": Object.freeze([alt(1619,"loss_noun","noun","loss"),alt(1619,"lose_verb","verb","lose / suffer a loss")]),
  "運": Object.freeze([alt(1622,"transport_use_verb","verb","move / transport / use"),alt(1622,"luck_noun","noun","luck / fortune / fate")]),
  "嘗試": Object.freeze([alt(1623,"try_verb","verb","try / attempt"),alt(1623,"attempt_noun","noun","attempt")]),
  "監管": Object.freeze([alt(1624,"supervise_verb","verb","supervise / regulate"),alt(1624,"supervision_noun","noun","supervision / regulation")]),
  "認真": Object.freeze([alt(1627,"serious_stative","adjective","serious / earnest"),alt(1627,"seriously_adverb","adverb","seriously / earnestly")]),
  "熱": Object.freeze([alt(1630,"hot_stative","adjective","hot"),alt(1630,"heat_noun","noun","heat")]),
  "關": Object.freeze([alt(1636,"close_concern_verb","verb","close / turn off / concern"),alt(1636,"pass_barrier_noun","noun","pass / barrier"),alt(1636,"surname","proper","surname Kwan")]),
  "正面": Object.freeze([alt(1649,"front_noun","noun","front / front side"),alt(1649,"positive_front_stative","adjective","positive / direct / front-facing")]),
  "生產": Object.freeze([alt(1650,"produce_verb","verb","produce / manufacture / give birth"),alt(1650,"production_noun","noun","production / childbirth")]),
  "曲線": Object.freeze([alt(1658,"curve_noun","noun","curve / curved line"),alt(1658,"indirect_stative","adjective","indirect / roundabout / figuratively curved")]),
  "投訴": Object.freeze([alt(1665,"complain_verb","verb","complain / file a complaint"),alt(1665,"complaint_noun","noun","complaint")]),
  "制": Object.freeze([alt(1669,"agree_accept_verb","verb","agree / accept / be willing"),alt(1669,"system_control_bound","bound","system / control / regulate formal-bound family")]),
  "空": Object.freeze([alt(1673,"empty_stative","adjective","empty / vacant"),alt(1673,"air_space_noun","noun","air / sky / space"),alt(1673,"empty_verb","verb","empty / make vacant")]),
  "相對": Object.freeze([alt(1679,"relative_stative","adjective","relative / opposite"),alt(1679,"relatively_adverb","adverb","relatively"),alt(1679,"face_oppose_verb","verb","face / oppose where syntax supports it")]),
  "破壞": Object.freeze([alt(1688,"damage_verb","verb","damage / destroy"),alt(1688,"destruction_noun","noun","destruction / damage")]),
  "報告": Object.freeze([alt(1698,"report_noun","noun","report"),alt(1698,"report_verb","verb","report / inform / present")]),
  "結": Object.freeze([alt(1705,"tie_form_verb","verb","tie / bind / form / settle","git3"),alt(1705,"knot_bond_noun","noun","knot / bond","git3")]),
  "補充": Object.freeze([alt(1711,"supplement_verb","verb","replenish / supplement / add","bou2 cung1"),alt(1711,"supplement_noun","noun","supplement / additional comment","bou2 cung1")]),
  "誇張": Object.freeze([alt(1713,"exaggerate_verb","verb","exaggerate","kwaa1 zoeng1"),alt(1713,"exaggerated_stative","adjective","exaggerated / overstated","kwaa1 zoeng1")]),
  "增長": Object.freeze([alt(1719,"grow_increase_verb","verb","grow / increase","zang1 zoeng2"),alt(1719,"growth_noun","noun","growth / increase","zang1 zoeng2")]),
  "響": Object.freeze([alt(1729,"sound_verb","verb","sound / make a sound","hoeng2","sound_verb"),alt(1729,"locative_coverb","coverb","at / in / on","hoeng2","locative_relation_coverb"),alt(1729,"locative_existential_verb","verb","be at / in","hoeng2","locative_existential_verb")]),
  "爛": Object.freeze([alt(1730,"rotten_stative","adjective","rotten / broken / messy"),alt(1730,"utterly_adverb","adverb","utterly / thoroughly as degree intensifier","","degree_adverb")]),
  "及": Object.freeze([alt(1741,"and_function","function","formal and / as well as","kap6","coordination_relation"),alt(1741,"reach_involve_bound","bound","formal reach / involve morpheme family","kap6")]),
  "反對": Object.freeze([alt(1742,"oppose_verb","verb","oppose"),alt(1742,"opposition_noun","noun","opposition")]),
  "出版": Object.freeze([alt(1748,"publish_verb","verb","publish"),alt(1748,"publication_noun","noun","publication / publishing process")]),

  "倒": Object.freeze([alt(1507,"fall_dou2","verb","fall / topple","dou2"),alt(1507,"reverse_dou3","verb","reverse / invert / turn backwards","dou3")]),
  "假": Object.freeze([alt(1513,"false_gaa2","adjective","false / fake","gaa2"),alt(1513,"leave_gaa3","noun","leave / holiday","gaa3")]),
  "牌": Object.freeze([alt(1521,"nominal_paai4","noun","brand / sign / card nominal family","paai4"),alt(1521,"nominal_paai2","noun","brand / sign / card nominal reading variant","paai2")]),
  "貼": Object.freeze([alt(1525,"stick_tip3","verb","stick / paste / keep close / subsidize","tip3"),alt(1525,"tip_prediction_tip1","verb","loan-derived tip / prediction family","tip1")]),
  "舖頭": Object.freeze([alt(1533,"shop","place","shop / store","pou3 tau2","place_noun")]),
  "壞": Object.freeze([alt(1539,"bad_stative","adjective","bad / spoiled / broken","waai6"),alt(1539,"become_bad_verb","verb","break / go bad / become spoiled","waai6","change_of_state_verb")]),
  "犯": Object.freeze([alt(1562,"offend_faan6","verb","offend / violate / commit an offence","faan6"),alt(1562,"offender_faan2","person","offender / criminal nominal family","faan2")]),
  "夾": Object.freeze([alt(1575,"wedge_mix_gaap3","verb","sandwich / wedge / mix / cooperate","gaap3"),alt(1575,"clip_gaap2","noun","clip / folder","gaap2")]),
  "拗": Object.freeze([alt(1580,"bend_aau2","verb","bend / break","aau2"),alt(1580,"argue_aau3","verb","argue / act obstinately","aau3")]),
  "柱": Object.freeze([alt(1585,"pillar_cyu5","noun","pillar / column","cyu5")]),
  "細路仔": Object.freeze([alt(1602,"child","person","child / kid","sai3 lou6 zai2")]),
  "雀": Object.freeze([alt(1605,"bird_zoek3","noun","bird, standard reading","zoek3"),alt(1605,"bird_zoek2","noun","bird, independently supported variant","zoek2")]),
  "掣": Object.freeze([alt(1610,"switch_zai3","noun","button / switch / brake","zai3")]),
  "鋪": Object.freeze([alt(1631,"spread_pou1","verb","spread / lay / pave","pou1"),alt(1631,"shop_pou3","noun","shop / store","pou3"),alt(1631,"classifier_pou3","classifier","classifier family","pou3")]),
  "興": Object.freeze([alt(1724,"flourish_hing1","verb","flourish / become popular","hing1"),alt(1724,"interest_hing3","noun","interest / mood root","hing3")]),
  "卡": Object.freeze([alt(1750,"card_kaat1","noun","card","kaat1"),alt(1750,"classifier_kaa1","classifier","classifier for train compartments / related units","kaa1"),alt(1750,"carat_kaa1","measure","carat / measure family","kaa1")]),
});

const MULTI_SURFACES = new Set(["架構","重複","根據","教授","焗","費事","預","認識","錄音","類","叉","白","封","站","能","參考","期","損失","運","嘗試","監管","認真","熱","關","正面","生產","曲線","投訴","制","空","相對","破壞","報告","結","補充","誇張","增長","響","爛","及","反對","出版"]);
const READING_SPLIT_SURFACES = new Set(["倒","假","牌","貼","舖頭","壞","犯","夾","拗","柱","細路仔","雀","掣","鋪","興","卡"]);
const CANDIDATE_ONLY_SURFACES = new Set(Object.keys(ALTERNATIVE_SPECS));

const DEFAULT_READING_OVERRIDES = Object.freeze({
  "重複":"cung4 fuk1", "唪":"fung2", "郭富城":"gwok3 fu3 sing4", "焗":"guk6", "費事":"fai3 si6", "貼":"tip3", "舖頭":"pou3 tau2", "壞":"waai6",
  "犯":"faan6", "自信":"zi6 seon3", "夾":"gaap3", "柱":"cyu5", "閂":"saan1", "骨折":"gwat1 zit3", "細路仔":"sai3 lou6 zai2", "雀":"zoek3", "幾點":"gei2 dim2",
  "掣":"zai3", "琴晚":"kam4 maan5", "痛":"tung3", "睇住":"tai2 zyu6", "窗":"coeng1", "溜":"lau6", "溫暖":"wan1 nyun5", "罪":"zeoi6", "補充":"bou2 cung1",
  "詳細":"coeng4 sai3", "誇張":"kwaa1 zoeng1", "遇到":"jyu6 dou2", "電芯":"din6 sam1", "嘉賓":"gaa1 ban1", "對面":"deoi3 min6", "製造":"zai3 zou6", "增長":"zang1 zoeng2",
  "黎明":"lai4 ming4", "橫線":"waang4 sin3", "澳門":"ou3 mun2", "燒":"siu1", "龜":"gwai1", "一號":"jat1 hou6", "人話":"jan4 waa6", "及":"kap6", "響":"hoeng2"
});

function isNeutralLexicalEntry(entry) {
  return Boolean(entry) && entry.label === "lex" && entry.pos === "lexical_item" && entry.syntax === "lexical_item";
}

function applyReviewedEntries(entries) {
  if (!Array.isArray(entries)) throw new TypeError("ranks 1501–1750 reviewed overlay requires an entry array");
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
    provenance: Object.freeze({ kind: "existing_runtime_default_preserved", source: "v0.5.234 token lexicon before ranks 1501–1750 alternatives", prior_provenance: entry.provenance || null }),
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
    if (!entry) throw new Error(`ranks 1501–1750 explicit analyses reference missing runtime surface: ${surface}`);
    const rows = [defaultAnalysis(surface, entry), ...specs.map((spec) => reviewedAlternative(surface, spec, entry))];
    const seen = new Set();
    for (const row of rows) {
      if (!row.jyutping) throw new Error(`${row.id}: explicit lexical analysis requires non-empty jyutping`);
      if (seen.has(row.id)) throw new Error(`${row.id}: duplicate ranks 1501–1750 stable analysis ID`);
      seen.add(row.id);
    }
    out[surface] = Object.freeze(rows);
  }
  return Object.freeze(out);
}

module.exports = Object.freeze({
  SOURCE, PROMOTIONS, RESEARCH_REQUIRED_SURFACES, BLOCKED_ATOMIC_SURFACES, MULTI_SURFACES, READING_SPLIT_SURFACES,
  ALTERNATIVE_SPECS, CANDIDATE_ONLY_SURFACES, DEFAULT_READING_OVERRIDES, isNeutralLexicalEntry, applyReviewedEntries, buildExplicitAnalyses,
});
