"use strict";

const SOURCE = "docs/research/ISSUE-872-CIFU-R751-1000-LEXICAL-ADJUDICATION-R1.md";

const KIND = Object.freeze({
  noun: ["what", "noun", "common_noun"],
  person: ["who", "noun", "person_noun"],
  place: ["where", "noun", "place_noun"],
  verb: ["doing", "verb", "verb"],
  adjective: ["like", "adjective", "stative_predicate"],
  adverb: ["how", "adverb", "adverb"],
  function: ["func", "function", "function"],
  modal: ["func", "modal", "modal"],
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

const PROMOTIONS = Object.freeze({
  "放棄": lexicalSpec(755, "verb", "give up / abandon"),
  "笨": lexicalSpec(759, "adjective", "stupid / clumsy"),
  "尊重": lexicalSpec(760, "verb", "respect / value"),
  "棚": lexicalSpec(762, "noun", "shed / canopy / shack"),
  "大學": lexicalSpec(767, "place", "university"),
  "害": lexicalSpec(774, "verb", "harm / cause trouble"),
  "當時": lexicalSpec(778, "temporal", "at that time / then"),
  "路線": lexicalSpec(779, "noun", "route / line / itinerary"),
  "餐室": lexicalSpec(781, "place", "dining room"),
  "黐線": lexicalSpec(782, "adjective", "crazy / insane"),
  "表達": lexicalSpec(791, "verb", "express / convey"),
  "甚至": lexicalSpec(792, "adverb", "even / even to the extent that"),
  "秩序": lexicalSpec(795, "noun", "order / sequence / social order"),
  "能力": lexicalSpec(796, "noun", "ability / capability"),
  "廣告": lexicalSpec(798, "noun", "advertisement / commercial"),
  "靠": lexicalSpec(799, "verb", "lean on / rely on / depend on"),
  "永遠": lexicalSpec(804, "adverb", "forever / always"),
  "生意": lexicalSpec(805, "noun", "business / trade"),
  "字典": lexicalSpec(807, "noun", "dictionary"),
  "飛機": lexicalSpec(812, "noun", "airplane"),
  "接近": lexicalSpec(814, "verb", "approach / be near"),
  "短": lexicalSpec(815, "adjective", "short"),
  "機會": lexicalSpec(816, "noun", "opportunity / chance"),
  "制度": lexicalSpec(824, "noun", "system / institution"),
  "面對": lexicalSpec(826, "verb", "face / confront"),
  "案": lexicalSpec(828, "noun", "case / file / incident"),
  "無論": lexicalSpec(830, "function", "regardless / no matter", "", "concessive_subordinator"),
  "圓形": lexicalSpec(831, "noun", "circle / round shape"),
  "鼻": lexicalSpec(834, "noun", "nose"),
  "數碼": lexicalSpec(837, "noun", "digital data / technology / numerals"),
  "誰": lexicalSpec(838, "pronoun", "formal/written who"),
  "大佬": lexicalSpec(841, "person", "boss / big brother / big shot"),
  "女朋友": lexicalSpec(842, "person", "girlfriend / female friend"),
  "小學": lexicalSpec(843, "place", "primary school"),
  "拎": lexicalSpec(851, "verb", "carry / hold / take"),
  "法院": lexicalSpec(852, "place", "court of law"),
  "城市": lexicalSpec(854, "place", "city"),
  "原因": lexicalSpec(857, "noun", "cause / reason"),
  "純": lexicalSpec(859, "adjective", "pure / unmixed"),
  "眼": lexicalSpec(860, "noun", "eye"),
  "發生": lexicalSpec(863, "verb", "happen / occur"),
  "塘": lexicalSpec(865, "place", "pond"),
  "形容": lexicalSpec(872, "verb", "describe"),
  "身": lexicalSpec(873, "noun", "body / person / self"),
  "法官": lexicalSpec(874, "person", "judge"),
  "厘米": lexicalSpec(876, "measure", "centimeter", "", "length_measure"),
  "跌": lexicalSpec(878, "verb", "fall / drop / tumble"),
  "撞": lexicalSpec(882, "verb", "hit / bump / run into"),
  "成為": lexicalSpec(891, "verb", "become"),
  "成績": lexicalSpec(892, "noun", "result / grade / performance record"),
  "明明": lexicalSpec(894, "adverb", "obviously / plainly"),
  "非常": lexicalSpec(897, "adverb", "very / extremely"),
  "送": lexicalSpec(901, "verb", "send / deliver / give / see off"),
  "郵票": lexicalSpec(909, "noun", "postage stamp"),
  "景點": lexicalSpec(923, "place", "scenic spot / tourist attraction"),
  "過程": lexicalSpec(928, "noun", "process / course"),
  "薯": lexicalSpec(932, "noun", "potato / yam"),
  "互聯網": lexicalSpec(935, "noun", "Internet"),
  "公仔": lexicalSpec(936, "noun", "doll / toy"),
  "正常": lexicalSpec(939, "adjective", "normal / regular"),
  "利益": lexicalSpec(944, "noun", "benefit / interest"),
  "法庭": lexicalSpec(948, "place", "court of law"),
  "留意": lexicalSpec(949, "verb", "pay attention / take care"),
  "等如": lexicalSpec(953, "verb", "equal to"),
  "開支": lexicalSpec(956, "noun", "expenditure / expenses"),
  "腳": lexicalSpec(959, "noun", "foot / leg"),
  "旗": lexicalSpec(960, "noun", "flag / banner"),
  "上市": lexicalSpec(964, "verb", "go public / be listed / go on the market"),
  "公約": lexicalSpec(965, "noun", "convention / agreement"),
  "方式": lexicalSpec(967, "noun", "way / method / mode"),
  "日子": lexicalSpec(969, "temporal", "day / date / days of one's life"),
  "奶茶": lexicalSpec(970, "noun", "milk tea"),
  "受害": lexicalSpec(978, "verb", "suffer harm / be victimized"),
  "無聊": lexicalSpec(989, "adjective", "bored / boring / senseless"),
  "頭髮": lexicalSpec(991, "noun", "hair"),
  "類似": lexicalSpec(992, "adjective", "similar / analogous"),
  "鐘頭": lexicalSpec(993, "temporal", "hour"),
  "手指": lexicalSpec(996, "noun", "finger"),
  "在乎": lexicalSpec(1000, "verb", "care about / mind / depend on"),
});

const BLOCKED_ATOMIC_SURFACES = new Set([
  "我個", "我想", "幾個", "一份", "忍依", "一年", "我知", "講下", "講得", "講過", "我要", "一間", "去邊", "知點", "包住", "問下", "一日", "右手面", "左手", "好難", "返到", "點講", "一下", "見過", "個樣", "北行", "兩年", "幾年", "四個"
]);

const RESEARCH_REQUIRED_SURFACES = new Set([
  "○", "陣時", "嬋", "喥", "經", "行行", "彭銅", "頹餐", "沿住", "同人"
]);

const TRANSPARENT_SINGLE_CANDIDATES = new Set([
  "勇", "會堂", "之外", "堡", "右手", "外", "有錢", "上方", "好玩", "於", "嘍", "嘿", "一陣", "最多", "開頭", "講真", "下方", "返學", "今晚", "周圍", "國際", "之下", "教書", "透過", "幣", "體", "手邊", "起身", "掛住", "第日", "遲啲", "左手面", "好彩", "咸", "唔通", "停低"
]);

const MULTI_OR_SPLIT_NEUTRAL_CANDIDATES = new Set([
  "神", "講話", "礦", "介紹", "行為", "投資", "令", "至", "美", "棵", "只不過", "型", "盆", "晚", "感受", "中文", "井", "立法", "判決", "病", "搞笑", "實", "平衡", "肥", "科", "圈", "無", "絕對", "經歷", "未來", "衰", "結果", "圓", "橢圓", "作為", "努力", "改革", "私營化", "愛", "支持", "方便", "正話", "決定", "英", "真正", "選擇"
]);

const CONSTRUCTIONAL_CANDIDATES = new Set(["來講", "令到"]);

const CANDIDATE_ONLY_SURFACES = new Set([
  ...TRANSPARENT_SINGLE_CANDIDATES,
  ...MULTI_OR_SPLIT_NEUTRAL_CANDIDATES,
  ...CONSTRUCTIONAL_CANDIDATES,
]);

const DEFAULT_READING_OVERRIDES = Object.freeze({
  "勇": "jung5",
  "外": "ngoi6",
  "嘍": "lo3",
  "嘿": "hei3",
  "礦": "kwong3",
  "行為": "hang4 wai4",
  "棵": "po1",
  "只不過": "zi2 bat1 gwo3",
  "井": "zeng2",
  "圈": "hyun1",
  "衰": "seoi1",
  "愛": "oi3",
});

const ALTERNATIVE_SPECS = Object.freeze({
  "比": Object.freeze([
    alt(751, "compare_verb", "verb", "compare / contrast", "bei2"),
    alt(751, "comparative_function", "function", "comparative / ratio marker", "bei2", "comparative_marker"),
  ]),
  "車": Object.freeze([
    alt(754, "vehicle_noun", "noun", "vehicle / car", "ce1"),
    alt(754, "vehicle_work_verb", "verb", "vehicle/machine-related verbal family", "ce1"),
    alt(754, "chariot_chess_noun", "noun", "archaic chariot / Chinese-chess rook", "geoi1"),
  ]),
  "神": Object.freeze([
    alt(757, "spirit_noun", "noun", "deity / spirit / soul", "san4"),
    alt(757, "figurative_stative", "adjective", "mysterious / extraordinary / figurative property", "san4"),
  ]),
  "講話": Object.freeze([
    alt(764, "speak_verb", "verb", "speak / talk / address", "gong2 waa6"),
    alt(764, "speech_event_noun", "noun", "speech / utterance event", "gong2 waa6"),
  ]),
  "礦": Object.freeze([
    alt(765, "ore_noun_kwong3", "noun", "mine / mineral / ore", "kwong3"),
    alt(765, "ore_noun_kong3", "noun", "mine / mineral / ore reading variant", "kong3"),
    alt(765, "ore_noun_gwong3", "noun", "older attested mine / mineral reading", "gwong3"),
  ]),
  "介紹": Object.freeze([
    alt(769, "introduce_verb", "verb", "introduce", "gaai3 siu6"),
    alt(769, "introduction_noun", "noun", "introduction", "gaai3 siu6"),
  ]),
  "行為": Object.freeze([alt(770, "behaviour_noun", "noun", "act / behaviour / conduct", "hang4 wai4")]),
  "投資": Object.freeze([
    alt(772, "invest_verb", "verb", "invest", "tau4 zi1"),
    alt(772, "investment_noun", "noun", "investment", "tau4 zi1"),
  ]),
  "架": Object.freeze([
    alt(773, "frame_noun", "noun", "frame / rack / stand", "gaa2"),
    alt(773, "vehicle_classifier", "classifier", "classifier for vehicles / machines", "gaa3"),
    alt(773, "erect_support_verb", "verb", "erect / support", "gaa3"),
  ]),
  "魚": Object.freeze([
    alt(776, "fish_noun", "noun", "fish", "jyu2"),
    alt(776, "fish_bound", "bound", "bound/non-final fish morpheme", "jyu4"),
  ]),
  "令": Object.freeze([
    alt(785, "cause_order_verb", "verb", "cause / order / command", "ling6"),
    alt(785, "order_honorific_bound", "bound", "order/decree and honorific 令- family", "ling6"),
  ]),
  "至": Object.freeze([
    alt(789, "endpoint_function", "coverb", "to / until endpoint relation", "zi3", "endpoint_relation"),
    alt(789, "degree_adverb", "adverb", "most / utmost degree", "zi3", "degree_adverb"),
  ]),
  "美": Object.freeze([
    alt(793, "beautiful_stative", "adjective", "beautiful", "mei5"),
    alt(793, "america_bound", "proper", "America / USA bound-name abbreviation", "mei5", "proper_name_bound"),
  ]),
  "棵": Object.freeze([alt(797, "plant_classifier", "classifier", "classifier for plants", "po1", "plant_classifier")]),
  "只不過": Object.freeze([
    alt(803, "merely_adverb", "adverb", "merely / only", "zi2 bat1 gwo3"),
    alt(803, "adversative_connector", "function", "but / it is just that", "zi2 bat1 gwo3", "adversative_connector"),
  ]),
  "房": Object.freeze([
    alt(808, "room_noun", "noun", "room", "fong2"),
    alt(808, "surname_bound", "proper", "surname / literary-bound family", "fong4", "proper_name_family"),
  ]),
  "型": Object.freeze([
    alt(810, "stylish_stative", "adjective", "stylish / cool / handsome", "jing4"),
    alt(810, "type_noun", "noun", "type / model", "jing4"),
  ]),
  "盆": Object.freeze([
    alt(811, "basin_noun", "noun", "basin / pot", "pun4"),
    alt(811, "basin_classifier", "classifier", "classifier / measure use", "pun4"),
  ]),
  "聲": Object.freeze([
    alt(817, "sound_noun", "noun", "sound / voice / noise", "seng1"),
    alt(817, "sound_classifier", "classifier", "classifier for sounds / utterances", "seng1"),
    alt(817, "literary_sound_bound", "bound", "literary/bound sound family", "sing1"),
  ]),
  "出面": Object.freeze([
    alt(820, "outside_localizer", "localizer", "outside", "ceot1 min6", "spatial_localizer"),
    alt(820, "appear_verb", "verb", "appear personally / intervene", "ceot1 min2"),
    alt(820, "overt_stative", "adjective", "overt / obvious", "ceot1 min2"),
  ]),
  "來講": Object.freeze([alt(823, "topic_perspective", "function", "in terms of / regarding", "loi4 gong2", "topic_perspective_construction")]),
  "套": Object.freeze([
    alt(827, "set_classifier", "classifier", "classifier for sets / collections", "tou3"),
    alt(827, "cover_noun", "noun", "cover / case / sheath", "tou3"),
    alt(827, "encase_apply_verb", "verb", "encase / apply a set or formula", "tou3"),
  ]),
  "晚": Object.freeze([
    alt(829, "evening_temporal", "temporal", "evening / night", "maan5"),
    alt(829, "late_stative", "adjective", "late", "maan5"),
  ]),
  "感受": Object.freeze([
    alt(832, "feel_verb", "verb", "feel / experience", "gam2 sau6"),
    alt(832, "feeling_noun", "noun", "feeling / impression / experience", "gam2 sau6"),
  ]),
  "中文": Object.freeze([
    alt(844, "chinese_spoken", "noun", "Chinese language, spoken reading", "zung1 man2"),
    alt(844, "chinese_formal", "noun", "Chinese language, formal reading", "zung1 man4"),
  ]),
  "井": Object.freeze([
    alt(845, "well_zeng2", "noun", "well", "zeng2"),
    alt(845, "well_zing2", "noun", "well reading variant", "zing2"),
  ]),
  "令到": Object.freeze([alt(846, "causative_construction", "function", "cause / make", "ling6 dou3", "causative_construction")]),
  "句": Object.freeze([
    alt(848, "sentence_noun", "noun", "sentence / clause / phrase", "geoi3"),
    alt(848, "utterance_classifier", "classifier", "classifier for utterances / lines", "geoi3"),
  ]),
  "立法": Object.freeze([
    alt(849, "legislate_verb", "verb", "legislate", "laap6 faat3"),
    alt(849, "legislation_noun", "noun", "legislation", "laap6 faat3"),
  ]),
  "判決": Object.freeze([
    alt(850, "judge_decide_verb", "verb", "judge / decide", "pun3 kyut3"),
    alt(850, "judgment_noun", "noun", "judgment / decision", "pun3 kyut3"),
  ]),
  "相": Object.freeze([
    alt(855, "photograph_noun", "noun", "photograph / picture", "soeng2"),
    alt(855, "reciprocal_bound", "bound", "mutual / each-other morpheme", "soeng1"),
  ]),
  "飛": Object.freeze([
    alt(856, "fly_dump_verb", "verb", "fly / dump a partner", "fei1"),
    alt(856, "hooligan_noun", "noun", "hoodlum / hooligan", "fei1"),
  ]),
  "病": Object.freeze([
    alt(858, "illness_noun", "noun", "illness / disease", "beng6"),
    alt(858, "ill_stative", "adjective", "ill / sick", "beng6"),
    alt(858, "fall_ill_verb", "verb", "fall ill", "beng6"),
  ]),
  "搞笑": Object.freeze([
    alt(879, "funny_stative", "adjective", "funny / hilarious", "gaau2 siu3"),
    alt(879, "joke_verb", "verb", "joke / play around / make fun", "gaau2 siu3"),
  ]),
  "實": Object.freeze([
    alt(881, "solid_real_stative", "adjective", "solid / firm / real", "sat6"),
    alt(881, "certainly_adverb", "adverb", "certainly / actually", "sat6"),
  ]),
  "平衡": Object.freeze([
    alt(889, "balance_noun", "noun", "balance / equilibrium", "ping4 hang4"),
    alt(889, "balance_verb", "verb", "balance", "ping4 hang4"),
    alt(889, "balanced_stative", "adjective", "balanced", "ping4 hang4"),
  ]),
  "肥": Object.freeze([
    alt(895, "fat_stative", "adjective", "fat", "fei4"),
    alt(895, "fertilizer_noun", "noun", "fertilizer / manure", "fei4"),
  ]),
  "科": Object.freeze([
    alt(899, "field_noun", "noun", "subject / branch / field / section", "fo1"),
    alt(899, "field_classifier", "classifier", "classifier / measure use", "fo1"),
  ]),
  "圈": Object.freeze([
    alt(902, "loop_classifier", "classifier", "classifier for loops / laps", "hyun1"),
    alt(902, "circle_noun", "noun", "circle / ring / social circle", "hyun1"),
    alt(902, "circle_verb", "verb", "circle / mark with a circle", "hyun1"),
  ]),
  "無": Object.freeze([
    alt(906, "formal_negative", "function", "formal/written negative or bound family", "mou4", "formal_negative"),
    alt(906, "spoken_existential_negator", "function", "spoken existential/possessive negator", "mou5", "existential_negator"),
  ]),
  "絕對": Object.freeze([
    alt(907, "absolute_stative", "adjective", "absolute", "zyut6 deoi3"),
    alt(907, "absolutely_adverb", "adverb", "absolutely / certainly", "zyut6 deoi3"),
  ]),
  "經歷": Object.freeze([
    alt(910, "experience_noun", "noun", "experience / history", "ging1 lik6"),
    alt(910, "experience_verb", "verb", "experience / go through", "ging1 lik6"),
  ]),
  "整": Object.freeze([
    alt(911, "make_fix_verb", "verb", "make / fix / repair / do", "zing2"),
    alt(911, "whole_orderly_bound", "adjective", "whole / complete / orderly property family", "zing2"),
  ]),
  "未來": Object.freeze([
    alt(916, "future_temporal", "temporal", "the future", "mei6 loi4"),
    alt(916, "future_modifier", "adjective", "future / upcoming", "mei6 loi4", "relational_modifier"),
  ]),
  "衰": Object.freeze([
    alt(920, "bad_weak_stative", "adjective", "bad / annoying / weak", "seoi1"),
    alt(920, "decline_verb", "verb", "decline / wane / fail", "seoi1"),
  ]),
  "結果": Object.freeze([
    alt(924, "result_noun", "noun", "result / outcome", "git3 gwo2"),
    alt(924, "result_discourse_adverb", "adverb", "as a result / in the end", "git3 gwo2", "discourse_adverb"),
  ]),
  "圓": Object.freeze([
    alt(925, "round_stative", "adjective", "round / circular", "jyun4"),
    alt(925, "circle_unit_noun", "noun", "circle / round unit / yuan", "jyun4"),
  ]),
  "橢圓": Object.freeze([
    alt(930, "ellipse_noun", "noun", "ellipse / oval", "to5 jyun4"),
    alt(930, "oval_stative", "adjective", "oval / elliptical", "to5 jyun4"),
  ]),
  "小心": Object.freeze([
    alt(934, "careful_stative", "adjective", "careful", "siu2 sam1"),
    alt(934, "take_care_verb", "verb", "take care / be careful", "siu2 sam1"),
  ]),
  "作為": Object.freeze([
    alt(943, "serve_as_verb", "verb", "act / serve as"),
    alt(943, "as_coverb", "coverb", "as / in the capacity of", "", "relational_coverb"),
    alt(943, "conduct_noun", "noun", "conduct / deed / accomplishment"),
  ]),
  "努力": Object.freeze([
    alt(945, "hardworking_stative", "adjective", "hard-working / effortful", "nou5 lik6"),
    alt(945, "strive_verb", "verb", "strive / work hard", "nou5 lik6"),
    alt(945, "effort_noun", "noun", "effort", "nou5 lik6"),
  ]),
  "改革": Object.freeze([
    alt(946, "reform_verb", "verb", "reform", "goi2 gaak3"),
    alt(946, "reform_noun", "noun", "reform", "goi2 gaak3"),
  ]),
  "私營化": Object.freeze([
    alt(947, "privatize_verb", "verb", "privatize"),
    alt(947, "privatization_noun", "noun", "privatization"),
  ]),
  "亂": Object.freeze([
    alt(957, "chaotic_stative", "adjective", "chaotic / disordered", "lyun6"),
    alt(957, "randomly_adverb", "adverb", "randomly / disorderly", "lyun6"),
  ]),
  "愛": Object.freeze([
    alt(958, "love_verb", "verb", "love / be fond of", "oi3"),
    alt(958, "love_noun", "noun", "love / affection", "oi3"),
  ]),
  "支持": Object.freeze([
    alt(966, "support_verb", "verb", "support / back", "zi1 ci4"),
    alt(966, "support_noun", "noun", "support / backing", "zi1 ci4"),
  ]),
  "方便": Object.freeze([
    alt(968, "convenient_stative", "adjective", "convenient / suitable", "fong1 bin6"),
    alt(968, "facilitate_verb", "verb", "facilitate / help out", "fong1 bin6"),
    alt(968, "convenience_noun", "noun", "convenience", "fong1 bin6"),
  ]),
  "正話": Object.freeze([
    alt(973, "just_now_zing3", "temporal", "just now", "zing3 waa6"),
    alt(973, "just_now_zeng3", "temporal", "just now reading variant", "zeng3 waa6"),
  ]),
  "決定": Object.freeze([
    alt(976, "decide_verb", "verb", "decide / determine", "kyut3 ding6"),
    alt(976, "decision_noun", "noun", "decision", "kyut3 ding6"),
  ]),
  "門": Object.freeze([
    alt(981, "door_noun", "noun", "door / gate / category", "mun4"),
    alt(981, "subject_classifier", "classifier", "classifier for lessons / subjects / large guns", "mun4"),
  ]),
  "英": Object.freeze([
    alt(984, "england_bound", "proper", "England / English bound-name root", "jing1", "proper_name_bound"),
    alt(984, "heroic_bound", "adjective", "heroic / outstanding property root", "jing1", "bound_property"),
  ]),
  "真正": Object.freeze([
    alt(986, "genuine_stative", "adjective", "real / genuine", "zan1 zing3"),
    alt(986, "truly_adverb", "adverb", "truly / genuinely", "zan1 zing3"),
  ]),
  "選擇": Object.freeze([
    alt(990, "choose_verb", "verb", "choose / select", "syun2 zaak6"),
    alt(990, "choice_noun", "noun", "choice / option", "syun2 zaak6"),
  ]),
  "勇": Object.freeze([alt(756, "reviewed_whole_form", "adjective", "brave / courageous", "jung5", "stative_or_bound_property")]),
  "會堂": Object.freeze([alt(763, "reviewed_whole_form", "place", "hall / auditorium", "", "place_noun")]),
  "之外": Object.freeze([alt(768, "reviewed_whole_form", "localizer", "outside / beyond / besides", "", "relational_localizer")]),
  "堡": Object.freeze([alt(777, "reviewed_whole_form", "noun", "fort / castle / stronghold", "", "bound_or_count_noun")]),
  "右手": Object.freeze([alt(786, "reviewed_whole_form", "noun", "right hand", "", "body_part_noun")]),
  "外": Object.freeze([alt(787, "reviewed_whole_form", "localizer", "outside / external", "ngoi6", "spatial_localizer")]),
  "有錢": Object.freeze([alt(788, "reviewed_whole_form", "adjective", "rich / wealthy", "", "stative_expression")]),
  "上方": Object.freeze([alt(802, "reviewed_whole_form", "localizer", "above / area above", "", "spatial_localizer")]),
  "好玩": Object.freeze([alt(806, "reviewed_whole_form", "adjective", "fun / enjoyable", "", "stative_expression")]),
  "於": Object.freeze([alt(809, "reviewed_whole_form", "coverb", "in / at / to / from / by / than", "", "formal_relational_coverb")]),
  "嘍": Object.freeze([alt(833, "reviewed_whole_form", "particle", "final particle", "lo3", "final_particle")]),
  "嘿": Object.freeze([alt(835, "reviewed_whole_form", "interjection", "hey / interjection", "hei3", "interjection")]),
  "一陣": Object.freeze([alt(839, "reviewed_whole_form", "temporal", "a while / for a moment", "", "temporal_expression")]),
  "最多": Object.freeze([alt(861, "reviewed_whole_form", "adverb", "at most / the most", "", "quantity_degree_adverb")]),
  "開頭": Object.freeze([alt(864, "reviewed_whole_form", "temporal", "beginning / at first", "", "temporal_expression")]),
  "講真": Object.freeze([alt(868, "reviewed_whole_form", "formula", "frankly / honestly speaking", "", "discourse_formula")]),
  "下方": Object.freeze([alt(869, "reviewed_whole_form", "localizer", "below / underneath", "", "spatial_localizer")]),
  "返學": Object.freeze([alt(875, "reviewed_whole_form", "verb", "go to / attend school", "", "lexicalized_motion_activity")]),
  "今晚": Object.freeze([alt(886, "reviewed_whole_form", "temporal", "tonight", "gam1 maan5", "temporal_expression")]),
  "周圍": Object.freeze([alt(893, "reviewed_whole_form", "localizer", "surroundings / all around", "", "spatial_localizer")]),
  "國際": Object.freeze([alt(903, "reviewed_whole_form", "adjective", "international", "", "relational_modifier")]),
  "之下": Object.freeze([alt(915, "reviewed_whole_form", "localizer", "under / beneath", "", "relational_localizer")]),
  "教書": Object.freeze([alt(921, "reviewed_whole_form", "verb", "teach as an occupation", "", "lexicalized_activity")]),
  "透過": Object.freeze([alt(922, "reviewed_whole_form", "coverb", "through / via", "", "relational_coverb")]),
  "幣": Object.freeze([alt(929, "reviewed_whole_form", "bound", "currency / coin", "bai6", "bound_or_noun")]),
  "體": Object.freeze([alt(933, "reviewed_whole_form", "bound", "body / form / style / system", "tai2", "bound_or_noun")]),
  "手邊": Object.freeze([alt(937, "reviewed_whole_form", "localizer", "at hand / by one's hand", "", "spatial_localizer")]),
  "起身": Object.freeze([alt(950, "reviewed_whole_form", "verb", "get up / rise / leave", "", "lexicalized_motion_verb")]),
  "掛住": Object.freeze([alt(951, "reviewed_whole_form", "verb", "miss / keep thinking about", "gwaa3 zyu6", "idiomatic_cognition_verb")]),
  "第日": Object.freeze([alt(952, "reviewed_whole_form", "temporal", "another day / later / some other day", "dai6 jat6", "temporal_expression")]),
  "遲啲": Object.freeze([alt(962, "reviewed_whole_form", "temporal", "later", "ci4 di1", "temporal_adverbial")]),
  "左手面": Object.freeze([alt(971, "reviewed_whole_form", "localizer", "left-hand side", "zo2 sau2 min6", "spatial_localizer")]),
  "好彩": Object.freeze([alt(974, "reviewed_whole_form", "adjective", "lucky / fortunate", "hou2 coi2", "stative_expression")]),
  "咸": Object.freeze([alt(983, "reviewed_whole_form", "function", "all / every", "haam4", "formal_quantificational_function")]),
  "唔通": Object.freeze([alt(985, "reviewed_whole_form", "adverb", "could it be...?", "m4 tung1", "rhetorical_epistemic_adverb")]),
  "停低": Object.freeze([alt(987, "reviewed_whole_form", "verb", "stop / halt", "ting4 dai1", "lexicalized_resultative_verb")]),
});

function isNeutralLexicalEntry(entry) {
  return Boolean(entry)
    && entry.label === "lex"
    && entry.pos === "lexical_item"
    && entry.syntax === "lexical_item";
}

function applyReviewedEntries(entries) {
  if (!Array.isArray(entries)) throw new TypeError("ranks 751–1000 reviewed overlay requires an entry array");
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
        note: `${entry.note || "Exact surface retained as neutral lexical coverage."} Reviewed whole-form analyses remain alternatives; default tokenization stays neutral.`,
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
      source: "v0.5.231 token lexicon before ranks 751–1000 alternatives",
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
    if (!entry) throw new Error(`ranks 751–1000 explicit analyses reference missing runtime surface: ${surface}`);
    const rows = [defaultAnalysis(surface, entry), ...specs.map((spec) => reviewedAlternative(surface, spec, entry))];
    const seen = new Set();
    for (const row of rows) {
      if (!row.jyutping) throw new Error(`${row.id}: explicit lexical analysis requires non-empty jyutping`);
      if (seen.has(row.id)) throw new Error(`${row.id}: duplicate ranks 751–1000 stable analysis ID`);
      seen.add(row.id);
    }
    out[surface] = Object.freeze(rows);
  }
  return Object.freeze(out);
}

module.exports = Object.freeze({
  SOURCE,
  PROMOTIONS,
  BLOCKED_ATOMIC_SURFACES,
  RESEARCH_REQUIRED_SURFACES,
  TRANSPARENT_SINGLE_CANDIDATES,
  MULTI_OR_SPLIT_NEUTRAL_CANDIDATES,
  CONSTRUCTIONAL_CANDIDATES,
  CANDIDATE_ONLY_SURFACES,
  DEFAULT_READING_OVERRIDES,
  ALTERNATIVE_SPECS,
  isNeutralLexicalEntry,
  applyReviewedEntries,
  buildExplicitAnalyses,
});
