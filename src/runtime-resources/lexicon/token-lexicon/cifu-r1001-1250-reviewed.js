"use strict";

const SOURCE = "docs/research/ISSUE-878-CIFU-R1001-1250-LEXICAL-ADJUDICATION-R1.md";

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
  determiner: ["what", "determiner", "determiner"],
  pronoun: ["what", "pronoun", "pronoun"],
  bound: ["func", "bound", "bound_morpheme"],
  suffix: ["func", "suffix", "derivational_suffix"],
  formula: ["func", "formula", "discourse_formula"],
  coverb: ["func", "coverb", "coverb"],
  proper: ["what", "proper_noun", "proper_name"],
  localizer: ["where", "localizer", "localizer"],
  temporal: ["when", "noun", "temporal_expression"],
  interjection: ["func", "interjection", "interjection"],
  particle: ["func", "particle", "particle"],
  numeral: ["what", "numeral", "numeral"],
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
  [1003, "改", "verb", "change / correct"],
  [1004, "其", "pronoun", "formal referential pronoun / determiner"],
  [1005, "拖", "verb", "drag / pull"],
  [1006, "後來", "temporal", "later / afterwards"],
  [1011, "婆", "person", "grandmother / matron kinship noun"],
  [1012, "得意", "adjective", "cute / complacent"],
  [1015, "曾經", "adverb", "once / ever"],
  [1016, "答", "verb", "answer / reply"],
  [1017, "搬", "verb", "move / transport"],
  [1020, "態度", "noun", "attitude"],
  [1021, "慘", "adjective", "miserable / serious"],
  [1024, "緊張", "adjective", "tense / nervous"],
  [1025, "價值", "noun", "value / worth"],
  [1035, "八月", "temporal", "August"],
  [1037, "大部份", "determiner", "the greater part / majority", "", "quantity_expression"],
  [1039, "尤其", "adverb", "especially / particularly"],
  [1043, "而且", "function", "moreover / in addition", "", "additive_connector"],
  [1044, "抑或", "function", "or / alternatively", "", "alternative_connector"],
  [1045, "到時", "temporal", "at that time"],
  [1051, "凍", "adjective", "cold"],
  [1052, "馬", "noun", "horse"],
  [1057, "暑假", "noun", "summer vacation"],
  [1058, "發現", "verb", "discover / find"],
  [1059, "睇法", "noun", "viewpoint / opinion"],
  [1060, "程度", "noun", "degree / extent"],
  [1063, "嘥", "verb", "waste"],
  [1064, "澳洲", "proper", "Australia"],
  [1067, "聽日", "temporal", "tomorrow"],
  [1068, "聽講", "verb", "hear that / be told", "", "evidential_verb"],
  [1070, "力", "noun", "strength / force"],
  [1071, "冇事", "adjective", "be all right / nothing is wrong", "", "stative_expression"],
  [1072, "功課", "noun", "homework / assignment"],
  [1075, "本來", "adverb", "originally / at first"],
  [1076, "生日", "noun", "birthday"],
  [1079, "年紀", "noun", "age"],
  [1080, "百", "numeral", "hundred"],
  [1081, "男", "adjective", "male", "", "relational_modifier"],
  [1082, "事實", "noun", "fact"],
  [1085, "於是", "function", "thereupon / as a result", "", "result_connector"],
  [1099, "舊年", "temporal", "last year"],
  [1101, "醫生", "person", "doctor"],
  [1103, "大約", "adverb", "approximately / about", "", "approximation_adverb"],
  [1104, "分開", "verb", "separate / part"],
  [1110, "形狀", "noun", "shape / form"],
  [1116, "底下", "localizer", "below / underneath"],
  [1121, "捱", "verb", "endure / suffer"],
  [1122, "終於", "adverb", "finally / eventually"],
  [1125, "幾耐", "pronoun", "how long", "", "wh_duration_expression"],
  [1129, "資產", "noun", "assets / property"],
  [1132, "維持", "verb", "maintain / preserve"],
  [1134, "機構", "noun", "institution / organization"],
  [1135, "離開", "verb", "leave / depart"],
  [1138, "七月", "temporal", "July"],
  [1140, "仍然", "adverb", "still / yet"],
  [1143, "以後", "temporal", "after / later"],
  [1149, "地產", "noun", "real estate"],
  [1150, "年代", "temporal", "era / decade"],
  [1153, "身邊", "localizer", "at one's side"],
  [1154, "例子", "noun", "example"],
  [1155, "咖啡", "noun", "coffee"],
  [1156, "怕", "verb", "fear / be afraid"],
  [1159, "盈利", "noun", "profit / gain"],
  [1160, "值得", "adjective", "be worth / deserve", "", "worth_predicate"],
  [1169, "結婚", "verb", "marry / get married"],
  [1177, "對唔住", "formula", "sorry / apology"],
  [1180, "賠", "verb", "compensate / indemnify"],
  [1181, "擔心", "verb", "worry / be anxious"],
  [1182, "整個", "determiner", "whole / entire", "", "whole_determiner"],
  [1188, "只要", "function", "so long as / provided that", "", "conditional_subordinator"],
  [1194, "地鐵", "noun", "metro / subway"],
  [1195, "好話", "noun", "praise / good words; related discourse sense"],
  [1197, "形式", "noun", "form / shape"],
  [1199, "到底", "adverb", "after all / in the end", "", "discourse_adverb"],
  [1201, "的", "particle", "written possessive / nominalizing particle", "dik1", "written_possessive_nominalizer"],
  [1205, "媽媽", "person", "mother / mama"],
  [1210, "電視機", "noun", "television set"],
  [1212, "歌", "noun", "song"],
  [1213, "銀行", "place", "bank"],
  [1214, "價錢", "noun", "price"],
  [1215, "噏", "verb", "babble / mutter"],
  [1217, "變成", "verb", "become / turn into"],
  [1225, "市民", "person", "city resident"],
  [1228, "有人", "pronoun", "someone / there is someone", "", "referential_existential_expression"],
  [1232, "性格", "noun", "personality / temperament"],
  [1233, "放假", "verb", "take / have a holiday"],
  [1234, "直頭", "adverb", "simply / straight-up"],
  [1237, "是但", "adverb", "whatever / casually", "", "indefinite_choice_adverb"],
  [1239, "英國", "proper", "United Kingdom"],
  [1245, "旁邊", "localizer", "beside / at the side"],
  [1246, "留", "verb", "remain / keep / retain"],
  [1247, "記住", "verb", "remember"],
  [1248, "追", "verb", "chase / pursue"],
  [1250, "得罪", "verb", "offend"],
]);

const PROMOTIONS = Object.freeze(Object.fromEntries(
  PROMOTION_ROWS.map(([rank, surface, kind, gloss, jyutping = "", syntax = ""]) => [surface, lexicalSpec(rank, kind, gloss, jyutping, syntax)])
));

const SOURCE_ONLY_SURFACES = new Set([
  "如", "添", "欣", "帳", "陶", "尚", "直到", "空白", "要點", "談", "聯", "長方形", "航", "預算案", "墓", "一方面", "乎", "北面", "仲要", "健", "煙海", "圖形", "闆", "叢", "民", "例", "頹", "三角形", "分手", "南方", "要好", "原則"
]);

const INDEPENDENT_ZERO_HIT_SURFACES = new Set(["兆", "整個", "好話"]);

const BLOCKED_ATOMIC_SURFACES = new Set([
  "有條", "條路", "講呀", "點呢", "一段", "一張", "下個", "皮池", "南行", "重係", "講啦", "點算", "左下角", "左畫", "白紙", "兩間", "冤墓", "畫條", "講返", "九點", "打個", "行去", "我想問", "兩個韻", "受山", "東行", "兜返", "三年", "手面", "同個", "即話", "我同", "唔肯", "做咩", "講乜", "右下角", "正下方", "先算", "你點", "張紙", "畫畫", "想講", "一個韻", "右下", "右手邊", "返上", "俾人", "埋個", "做過"
]);

const MULTI_SPECS = Object.freeze({
  "研究": Object.freeze([alt(1007, "research_noun", "noun", "research / study"), alt(1007, "research_verb", "verb", "study / research")]),
  "限制": Object.freeze([alt(1009, "restriction_noun", "noun", "restriction / limit"), alt(1009, "restrict_verb", "verb", "restrict / limit")]),
  "值": Object.freeze([alt(1010, "value_noun", "noun", "value"), alt(1010, "worth_predicate", "adjective", "be worth / have value", "", "worth_predicate")]),
  "經驗": Object.freeze([alt(1019, "experience_noun", "noun", "experience"), alt(1019, "experience_verb", "verb", "experience")]),
  "盡量": Object.freeze([alt(1022, "as_much_as_possible", "adverb", "as much as possible"), alt(1022, "full_extent_verb_family", "verb", "to the full / exhaust an amount", "", "lexical_verb_family")]),
  "影": Object.freeze([alt(1027, "image_noun", "noun", "image / shadow / photograph"), alt(1027, "photograph_verb", "verb", "photograph / film")]),
  "餐": Object.freeze([alt(1029, "meal_noun", "noun", "meal"), alt(1029, "meal_classifier", "classifier", "classifier for meals")]),
  "一般": Object.freeze([alt(1033, "ordinary_stative", "adjective", "ordinary / general"), alt(1033, "generally_adverb", "adverb", "generally / in general")]),
  "女性": Object.freeze([alt(1038, "female_noun", "noun", "female / woman"), alt(1038, "female_modifier", "adjective", "female", "", "relational_modifier")]),
  "外圍": Object.freeze([alt(1040, "periphery_noun", "noun", "periphery / surrounding area"), alt(1040, "surrounding_localizer", "localizer", "around / surrounding")]),
  "刑事": Object.freeze([alt(1042, "criminal_matter_noun", "noun", "criminal matter"), alt(1042, "penal_modifier", "adjective", "criminal / penal", "", "relational_modifier")]),
  "常": Object.freeze([alt(1054, "common_stative", "adjective", "common / constant"), alt(1054, "often_adverb", "adverb", "often / frequently")]),
  "麻煩": Object.freeze([alt(1056, "troublesome_stative", "adjective", "troublesome / inconvenient"), alt(1056, "bother_verb", "verb", "bother / trouble")]),
  "塊": Object.freeze([alt(1061, "piece_noun", "noun", "piece / lump"), alt(1061, "piece_classifier", "classifier", "classifier for pieces")]),
  "尖": Object.freeze([alt(1078, "point_noun", "noun", "point / tip"), alt(1078, "sharp_stative", "adjective", "sharp / pointed")]),
  "版": Object.freeze([alt(1086, "edition_noun", "noun", "edition / page / version"), alt(1086, "edition_classifier", "classifier", "classifier for editions / pages")]),
  "指": Object.freeze([alt(1089, "finger_noun", "noun", "finger"), alt(1089, "point_verb", "verb", "point / indicate / refer")]),
  "負責": Object.freeze([alt(1091, "take_responsibility_verb", "verb", "take responsibility / be in charge"), alt(1091, "responsible_stative", "adjective", "responsible")]),
  "電子": Object.freeze([alt(1094, "electron_noun", "noun", "electron"), alt(1094, "electronic_modifier", "adjective", "electronic", "", "relational_modifier")]),
  "標": Object.freeze([alt(1095, "mark_bid_noun", "noun", "mark / sign / bid"), alt(1095, "mark_bid_verb", "verb", "mark / bid")]),
  "升": Object.freeze([alt(1105, "rise_verb", "verb", "rise / raise"), alt(1105, "litre_measure", "measure", "litre", "", "volume_measure")]),
  "白色": Object.freeze([alt(1108, "white_noun", "noun", "white color"), alt(1108, "white_stative", "adjective", "white")]),
  "改變": Object.freeze([alt(1112, "change_noun", "noun", "change"), alt(1112, "change_verb", "verb", "change / alter")]),
  "私人": Object.freeze([alt(1113, "private_person_noun", "person", "private citizen"), alt(1113, "private_modifier", "adjective", "private", "", "relational_modifier")]),
  "單": Object.freeze([alt(1124, "form_bill_noun", "noun", "form / bill / list"), alt(1124, "sheet_classifier", "classifier", "classifier for forms / bills"), alt(1124, "single_stative", "adjective", "single / sole")]),
  "準備": Object.freeze([alt(1127, "preparation_noun", "noun", "preparation"), alt(1127, "prepare_verb", "verb", "prepare / get ready")]),
  "抵": Object.freeze([alt(1157, "worth_cheap_stative", "adjective", "worthwhile / cheap"), alt(1157, "resist_support_verb", "verb", "resist / support / offset")]),
  "夠": Object.freeze([alt(1165, "reach_enough_verb", "verb", "reach / be enough"), alt(1165, "sufficient_stative", "adjective", "sufficient / enough"), alt(1165, "enough_adverb", "adverb", "enough / sufficiently")]),
  "控制": Object.freeze([alt(1166, "control_noun", "noun", "control"), alt(1166, "control_verb", "verb", "control / contain")]),
  "報": Object.freeze([alt(1168, "report_newspaper_noun", "noun", "report / newspaper / recompense"), alt(1168, "report_verb", "verb", "report / announce / recompense")]),
  "順": Object.freeze([alt(1170, "smooth_favourable_stative", "adjective", "smooth / favourable"), alt(1170, "follow_obey_verb", "verb", "follow / obey")]),
  "聖經": Object.freeze([alt(1172, "bible_proper", "proper", "the Bible"), alt(1172, "classics_noun", "noun", "scripture / classics")]),
  "補習": Object.freeze([alt(1173, "extra_lessons_noun", "noun", "extra lessons / tutoring"), alt(1173, "tutor_study_verb", "verb", "take or give extra lessons")]),
  "解釋": Object.freeze([alt(1174, "explanation_noun", "noun", "explanation"), alt(1174, "explain_verb", "verb", "explain / interpret")]),
  "實在": Object.freeze([alt(1176, "real_concrete_stative", "adjective", "real / concrete"), alt(1176, "really_adverb", "adverb", "really / honestly")]),
  "精神": Object.freeze([alt(1178, "spirit_mind_noun", "noun", "spirit / mind"), alt(1178, "energetic_mental_stative", "adjective", "energetic / mental")]),
  "暫時": Object.freeze([alt(1179, "temporary_stative", "adjective", "temporary"), alt(1179, "for_now_adverb", "adverb", "for now / temporarily")]),
  "競爭": Object.freeze([alt(1186, "competition_noun", "noun", "competition"), alt(1186, "compete_verb", "verb", "compete")]),
  "公": Object.freeze([alt(1187, "public_fair_stative", "adjective", "public / fair"), alt(1187, "title_male_noun", "noun", "title / male-animal / kinship nominal family")]),
  "失業": Object.freeze([alt(1190, "unemployment_noun", "noun", "unemployment"), alt(1190, "unemployed_predicate", "adjective", "be unemployed", "", "stative_predicate")]),
  "保障": Object.freeze([alt(1202, "safeguard_noun", "noun", "safeguard / guarantee"), alt(1202, "ensure_verb", "verb", "ensure / safeguard")]),
  "溝通": Object.freeze([alt(1207, "communication_noun", "noun", "communication"), alt(1207, "communicate_verb", "verb", "communicate")]),
  "道": Object.freeze([alt(1208, "way_principle_noun", "noun", "way / principle / path"), alt(1208, "utterance_classifier", "classifier", "classifier / measure use"), alt(1208, "say_literary_verb", "verb", "say / speak, literary")]),
  "預備": Object.freeze([alt(1211, "preparation_noun", "noun", "preparation"), alt(1211, "prepare_verb", "verb", "prepare / make ready"), alt(1211, "preparatory_modifier", "adjective", "preparatory", "", "relational_modifier")]),
  "反應": Object.freeze([alt(1221, "reaction_noun", "noun", "reaction / response"), alt(1221, "react_verb", "verb", "react / respond")]),
  "支": Object.freeze([alt(1222, "branch_support_noun", "noun", "branch / support"), alt(1222, "rod_classifier", "classifier", "classifier for rods / songs / units"), alt(1222, "support_verb", "verb", "support / sustain")]),
  "回歸": Object.freeze([alt(1226, "return_noun", "noun", "return / reversion"), alt(1226, "return_verb", "verb", "return / revert")]),
  "成功": Object.freeze([alt(1227, "success_noun", "noun", "success"), alt(1227, "successful_stative", "adjective", "successful"), alt(1227, "succeed_verb", "verb", "succeed")]),
  "自然": Object.freeze([alt(1229, "nature_noun", "noun", "nature"), alt(1229, "natural_stative", "adjective", "natural"), alt(1229, "naturally_adverb", "adverb", "naturally")]),
  "男性": Object.freeze([alt(1231, "male_noun", "noun", "male"), alt(1231, "male_modifier", "adjective", "male", "", "relational_modifier")]),
  "相當": Object.freeze([alt(1238, "equivalent_stative", "adjective", "equivalent / appropriate"), alt(1238, "fairly_adverb", "adverb", "fairly / considerably")]),
});

const READING_SPECS = Object.freeze({
  "衫": Object.freeze([alt(1008, "clothing_saam1", "noun", "clothing / shirt", "saam1")]),
  "會考": Object.freeze([alt(1018, "exam_wui6haau2", "noun", "public examination", "wui6 haau2")]),
  "網絡": Object.freeze([alt(1023, "network_lok6", "noun", "network", "mong5 lok6"), alt(1023, "network_lok3", "noun", "network reading variant", "mong5 lok3")]),
  "噉樣樣": Object.freeze([alt(1026, "demonstrative_discourse", "pronoun", "like this / in this way", "gam2 joeng2 joeng2", "demonstrative_discourse_expression")]),
  "橋": Object.freeze([alt(1028, "bridge_kiu4", "noun", "bridge", "kiu4"), alt(1028, "idea_kiu2", "noun", "idea / plan", "kiu2")]),
  "拉": Object.freeze([alt(1046, "pull_laai1", "verb", "pull / drag", "laai1")]),
  "咯": Object.freeze([alt(1049, "particle_lok3", "particle", "final particle", "lok3", "final_particle"), alt(1049, "particle_lo3", "particle", "final particle reading variant", "lo3", "final_particle")]),
  "試": Object.freeze([alt(1062, "try_si3", "verb", "try / test", "si3"), alt(1062, "test_si5", "noun", "test / examination", "si5")]),
  "入邊": Object.freeze([alt(1069, "inside_bin6", "localizer", "inside", "jap6 bin6"), alt(1069, "inside_bin1", "localizer", "inside reading variant", "jap6 bin1")]),
  "覆": Object.freeze([alt(1100, "reply_fuk1", "verb", "reply / cover / overturn family", "fuk1")]),
  "廿": Object.freeze([alt(1106, "twenty_jaa6", "numeral", "twenty", "jaa6")]),
  "處理": Object.freeze([alt(1123, "handle_cyu5lei5", "verb", "handle / process / deal with", "cyu5 lei5")]),
  "新聞": Object.freeze([alt(1126, "news_man4", "noun", "news", "san1 man4"), alt(1126, "news_man2", "noun", "news reading variant", "san1 man2")]),
  "解": Object.freeze([alt(1128, "solve_gaai2", "verb", "solve / explain / untie", "gaai2"), alt(1128, "separate_haai6_family", "bound", "separate haai6 lexical reading family", "haai6", "separate_reading_family")]),
  "舖": Object.freeze([alt(1133, "shop_pou3", "noun", "shop / store", "pou3"), alt(1133, "shop_changed_tone_pou2", "noun", "shop / store changed-tone use", "pou2")]),
  "聽眾": Object.freeze([alt(1136, "audience_ting3", "noun", "audience / listeners", "ting3 zung3")]),
  "兆": Object.freeze([alt(1146, "omen_noun_siu6", "noun", "omen / sign / large-number family", "siu6"), alt(1146, "portend_verb_siu6", "verb", "portend / indicate", "siu6"), alt(1146, "large_number_siu6", "numeral", "large-number value", "siu6")]),
  "地下": Object.freeze([alt(1148, "underground_dei6haa6", "adjective", "underground / subterranean", "dei6 haa6", "relational_modifier"), alt(1148, "ground_dei6haa2", "noun", "ground / floor", "dei6 haa2")]),
  "爭": Object.freeze([alt(1158, "strive_zaang1", "verb", "strive / compete / argue", "zaang1"), alt(1158, "bound_zang1", "bound", "bound compound reading", "zang1")]),
  "哩度": Object.freeze([alt(1161, "here_ni1", "pronoun", "here", "ni1 dou6", "locative_pronoun"), alt(1161, "here_nei1", "pronoun", "here reading variant", "nei1 dou6", "locative_pronoun")]),
  "被": Object.freeze([alt(1167, "passive_bei6", "coverb", "passive marker / by", "bei6", "passive_coverb"), alt(1167, "quilt_pei5", "noun", "quilt / blanket", "pei5")]),
  "抹": Object.freeze([alt(1200, "wipe_maat3", "verb", "wipe", "maat3"), alt(1200, "erase_mut3", "verb", "wipe / erase reading family", "mut3")]),
  "零": Object.freeze([alt(1209, "zero_ling4", "numeral", "zero", "ling4"), alt(1209, "remainder_leng4", "suffix", "approximate-remainder suffix", "leng4", "approximate_remainder_suffix"), alt(1209, "remainder_leng2", "suffix", "approximate-remainder suffix reading", "leng2", "approximate_remainder_suffix"), alt(1209, "remainder_leng1", "suffix", "approximate-remainder suffix reading", "leng1", "approximate_remainder_suffix")]),
  "估": Object.freeze([alt(1230, "estimate_gu2", "verb", "estimate / guess", "gu2")]),
  "拿": Object.freeze([alt(1244, "take_naa4", "verb", "take / hold / grasp, written/formal", "naa4"), alt(1244, "discourse_laa4", "interjection", "discourse utterance / particle in the 嗱 family", "laa4", "discourse_utterance")]),
});

const ALTERNATIVE_SPECS = Object.freeze({ ...MULTI_SPECS, ...READING_SPECS });
const CANDIDATE_ONLY_SURFACES = new Set(Object.keys(ALTERNATIVE_SPECS));

const DEFAULT_READING_OVERRIDES = Object.freeze({
  "會考": "wui6 haau2",
  "噉樣樣": "gam2 joeng2 joeng2",
  "咯": "lok3",
  "處理": "cyu5 lei5",
  "聽眾": "ting3 zung3",
  "爭": "zaang1",
  "哩度": "ni1 dou6",
});

function isNeutralLexicalEntry(entry) {
  return Boolean(entry)
    && entry.label === "lex"
    && entry.pos === "lexical_item"
    && entry.syntax === "lexical_item";
}

function applyReviewedEntries(entries) {
  if (!Array.isArray(entries)) throw new TypeError("ranks 1001–1250 reviewed overlay requires an entry array");
  return entries.map(([surface, entry]) => {
    const promotion = PROMOTIONS[surface];
    if (promotion && isNeutralLexicalEntry(entry)) {
      return [surface, {
        ...entry,
        label: promotion.label,
        pos: promotion.pos,
        syntax: promotion.syntax,
        jyutping: promotion.jyutping || entry.jyutping || "",
        note: promotion.gloss,
        provenance: {
          kind: "reviewed_lexical_promotion",
          source: SOURCE,
          rank: promotion.rank,
          pronunciation_status: promotion.jyutping
            ? "reviewed_explicit_reading"
            : "inherited_runtime_candidate_not_independently_promoted",
          prior_provenance: entry.provenance || null,
        },
      }];
    }

    if (CANDIDATE_ONLY_SURFACES.has(surface) && isNeutralLexicalEntry(entry) && DEFAULT_READING_OVERRIDES[surface]) {
      return [surface, {
        ...entry,
        jyutping: DEFAULT_READING_OVERRIDES[surface],
        note: `${entry.note || "Exact surface retained as neutral lexical coverage."} Reviewed analyses remain alternatives; default tokenization stays neutral.`,
        provenance: {
          kind: "reviewed_candidate_default_pronunciation",
          source: SOURCE,
          pronunciation_status: "reviewed_default_reading_without_atomic_pos_promotion",
          prior_provenance: entry.provenance || null,
        },
      }];
    }

    return [surface, entry];
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
    provenance: Object.freeze({
      kind: "existing_runtime_default_preserved",
      source: "v0.5.232 token lexicon before ranks 1001–1250 alternatives",
      prior_provenance: entry.provenance || null,
    }),
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
    provenance: Object.freeze({
      kind: "reviewed_lexical_analysis",
      source: SOURCE,
      rank: spec.rank,
      pronunciation_status: spec.jyutping
        ? "reviewed_explicit_reading"
        : "inherited_runtime_candidate_not_independently_promoted",
    }),
  });
}

function buildExplicitAnalyses(entries) {
  const defaults = new Map(entries || []);
  const out = Object.create(null);
  for (const [surface, specs] of Object.entries(ALTERNATIVE_SPECS)) {
    const entry = defaults.get(surface);
    if (!entry) throw new Error(`ranks 1001–1250 explicit analyses reference missing runtime surface: ${surface}`);
    const rows = [defaultAnalysis(surface, entry), ...specs.map((spec) => reviewedAlternative(surface, spec, entry))];
    const seen = new Set();
    for (const row of rows) {
      if (!row.jyutping) throw new Error(`${row.id}: explicit lexical analysis requires non-empty jyutping`);
      if (seen.has(row.id)) throw new Error(`${row.id}: duplicate ranks 1001–1250 stable analysis ID`);
      seen.add(row.id);
    }
    out[surface] = Object.freeze(rows);
  }
  return Object.freeze(out);
}

module.exports = Object.freeze({
  SOURCE,
  PROMOTIONS,
  SOURCE_ONLY_SURFACES,
  INDEPENDENT_ZERO_HIT_SURFACES,
  BLOCKED_ATOMIC_SURFACES,
  MULTI_SPECS,
  READING_SPECS,
  ALTERNATIVE_SPECS,
  CANDIDATE_ONLY_SURFACES,
  DEFAULT_READING_OVERRIDES,
  isNeutralLexicalEntry,
  applyReviewedEntries,
  buildExplicitAnalyses,
});
