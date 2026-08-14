"use strict";

const SOURCE_R1 = "docs/research/ISSUE-866-CIFU-R501-750-LEXICAL-ADJUDICATION-R1.md";
const SOURCE_R2 = "docs/research/ISSUE-866-CIFU-R501-750-LEXICAL-ADJUDICATION-R2.md";

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
  copula: ["func", "verb", "copula"],
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
  "加": lexicalSpec(507, "verb", "add; plus-related verbal family"),
  "受": lexicalSpec(508, "verb", "receive / accept / suffer"),
  "能夠": lexicalSpec(510, "modal", "ability / possibility modal", "", "ability_modal"),
  "信心": lexicalSpec(515, "noun", "confidence", "", "abstract_noun"),
  "繞": lexicalSpec(520, "verb", "go around / wind / detour", "jiu5", "motion_path_verb"),
  "是": lexicalSpec(525, "copula", "formal/written copula or affirmative verb", "", "formal_copula"),
  "完成": lexicalSpec(532, "verb", "complete / finish", "", "completion_verb"),
  "男仔": lexicalSpec(533, "person", "boy / male person"),
  "任何": lexicalSpec(537, "determiner", "any / whichever", "", "indefinite_determiner"),
  "緊要": lexicalSpec(542, "adjective", "important"),
  "一係": lexicalSpec(558, "function", "or else / either alternative connector", "", "alternative_connector"),
  "提": lexicalSpec(563, "verb", "raise / mention / carry"),
  "養": lexicalSpec(564, "verb", "raise / support / keep"),
  "穿": lexicalSpec(581, "verb", "pierce / pass through / wear"),
  "從": lexicalSpec(584, "coverb", "from / via", "", "source_coverb"),
  "揸": lexicalSpec(589, "verb", "hold / drive"),
  "發覺": lexicalSpec(599, "verb", "discover / notice", "", "cognition_perception_verb"),
  "以": lexicalSpec(604, "coverb", "by / with / according to", "", "formal_instrument_manner_coverb"),
  "未必": lexicalSpec(606, "adverb", "not necessarily", "", "epistemic_adverb"),
  "拍": lexicalSpec(607, "verb", "pat / shoot / photograph"),
  "某": lexicalSpec(619, "determiner", "a certain / some", "", "indefinite_determiner"),
  "射": lexicalSpec(621, "verb", "shoot / emit"),
  "會話": lexicalSpec(622, "noun", "conversation", "wui6 waa2", "conversation_noun"),
  "其中": lexicalSpec(631, "pronoun", "among them / among these", "", "referential_pronoun"),
  "山路": lexicalSpec(637, "place", "mountain road / mountain path", "saan1 lou6"),
  "公共": lexicalSpec(638, "adjective", "public / communal", "", "attributive_modifier"),
  "者": lexicalSpec(643, "suffix", "nominalizer / person-forming suffix", "", "nominalizer_suffix"),
  "賺": lexicalSpec(653, "verb", "earn / profit"),
  "同一": lexicalSpec(655, "determiner", "same / identical", "", "identity_determiner"),
  "接受": lexicalSpec(660, "verb", "accept / receive"),
  "分鐘": lexicalSpec(668, "measure", "minute time-unit measure", "fan1 zung1", "time_measure"),
  "平時": lexicalSpec(671, "temporal", "ordinary times / normally", "", "temporal_expression"),
  "起碼": lexicalSpec(681, "adverb", "at least", "", "minimum_adverb"),
  "反而": lexicalSpec(686, "adverb", "instead / on the contrary", "", "contrastive_adverb"),
  "女人": lexicalSpec(699, "person", "woman"),
  "所有": lexicalSpec(703, "determiner", "all / every member of", "", "universal_determiner"),
  "敢": lexicalSpec(708, "modal", "dare", "", "modal_predicate"),
  "水平線": lexicalSpec(712, "noun", "horizon / horizontal line", "seoi2 ping4 sin3", "geometric_noun"),
  "例如": lexicalSpec(713, "function", "for example", "", "exemplification_marker"),
  "直程": lexicalSpec(716, "adverb", "simply / straight-up", "", "degree_discourse_adverb"),
  "個個": lexicalSpec(717, "pronoun", "every one / each one", "", "distributive_pronoun"),
  "包括": lexicalSpec(732, "verb", "include", "", "inclusion_verb"),
  "始終": lexicalSpec(737, "adverb", "all along / in the end", "", "temporal_stance_adverb"),
  "港人": lexicalSpec(743, "person", "Hong Kong person / people", "gong2 jan4"),
  "公務員": lexicalSpec(748, "person", "civil servant"),
});

const BLOCKED_ATOMIC_SURFACES = new Set([
  "憂", "一次", "成病", "我話", "憂店", "左上", "第二個", "點啊", "我會", "上行",
  "哩樣", "右上", "落到", "繞過", "一種", "講到", "唔夠", "我見", "貧大", "有陣",
  "三個", "行過", "直落", "點呀", "直上", "畫個", "左行", "下行", "個韻", "試過",
]);

const TRANSPARENT_SINGLE_CANDIDATES = new Set([
  "細個", "打電話", "返工", "轉彎", "最好", "打開", "一半", "食飯", "大個",
]);

const MULTI_OR_SPLIT_CANDIDATES = new Set([
  "地", "領", "後尾", "當", "返來", "樂", "班", "成個", "說話", "呵", "着", "包", "要求", "影響",
  "考慮", "攬", "水平", "教", "磅", "代表", "好過", "段", "發展", "偏", "人工", "除", "剪", "袋", "慢慢",
  "後", "因", "計", "原本", "連", "化",
]);

const CANDIDATE_ONLY_SURFACES = new Set([...MULTI_OR_SPLIT_CANDIDATES, ...TRANSPARENT_SINGLE_CANDIDATES]);

const DEFAULT_READING_OVERRIDES = Object.freeze({
  "後尾": "hau6 mei1",
  "返來": "faan1 lei4",
  "樂": "lok6",
  "成個": "seng4 go3",
  "呵": "ho1",
  "攬": "laam2",
  "磅": "bong6",
  "袋": "doi2",
  "慢慢": "maan6 maan2",
});

const ALTERNATIVE_SPECS = Object.freeze({
  "地": Object.freeze([
    alt(501, "ground_noun", "noun", "ground / land / place", "dei6"),
    alt(501, "adverb_suffix", "suffix", "written adverb-forming suffix", "dei6", "adverb_forming_suffix"),
    alt(501, "land_bound", "bound", "land / field bound morpheme", "dei2"),
  ]),
  "明": Object.freeze([
    alt(502, "understand_verb", "verb", "understand"),
    alt(502, "clear_bright_stative", "adjective", "clear / bright"),
    alt(502, "name_bound", "proper", "proper-name or morphemic family"),
  ]),
  "鬼": Object.freeze([
    alt(503, "ghost_noun", "noun", "ghost / person-denoting family"),
    alt(503, "intensifier_function", "adverb", "productive intensifier / negation-related adverbial family"),
    alt(503, "pejorative_bound", "bound", "pejorative adjective/affix family"),
  ]),
  "最後": Object.freeze([
    alt(504, "final_stative", "adjective", "final / last"),
    alt(504, "finally_adverb", "adverb", "finally / last in temporal or discourse ordering"),
  ]),
  "肯定": Object.freeze([
    alt(509, "certain_stative", "adjective", "certain / definite"),
    alt(509, "confirm_verb", "verb", "confirm / affirm"),
    alt(509, "certainty_adverb", "adverb", "certainly / stance certainty"),
  ]),
  "領": Object.freeze([
    alt(513, "collar_noun", "noun", "collar / neck family", "leng5"),
    alt(513, "lead_receive_bound", "bound", "literary lead / receive family", "ling5"),
  ]),
  "長": Object.freeze([
    alt(514, "long_stative", "adjective", "long", "coeng4"),
    alt(514, "grow_verb", "verb", "grow", "zoeng2"),
    alt(514, "chief_noun", "noun", "chief / head", "zoeng2"),
  ]),
  "後尾": Object.freeze([
    alt(516, "temporal_hau6", "temporal", "later / afterwards", "hau6 mei1"),
    alt(516, "temporal_hau1", "temporal", "later / afterwards reading variant", "hau1 mei1"),
  ]),
  "當": Object.freeze([
    alt(519, "temporal_function", "function", "temporal / conditional / adverbial function", "dong1"),
    alt(519, "regard_pawn_verb", "verb", "regard as / pawn", "dong3"),
  ]),
  "水": Object.freeze([
    alt(521, "water_money_noun", "noun", "water; money-related noun family"),
    alt(521, "low_quality_stative", "adjective", "low-quality / weak evaluative sense"),
  ]),
  "坐": Object.freeze([
    alt(523, "sit_travel_verb", "verb", "sit / travel by / serve a prison sentence", "co5"),
    alt(523, "literary_sit_verb", "verb", "literary/citation sit family", "zo6"),
    alt(523, "placement_verb", "verb", "place / set", "zo6"),
  ]),
  "英文": Object.freeze([
    alt(526, "spoken_noun", "noun", "English language, common spoken reading", "jing1 man2"),
    alt(526, "formal_noun", "noun", "English language, formal/reading variant", "jing1 man4"),
  ]),
  "真": Object.freeze([
    alt(527, "true_stative", "adjective", "true / real"),
    alt(527, "really_adverb", "adverb", "really / genuinely"),
  ]),
  "彎": Object.freeze([
    alt(530, "bend_verb", "verb", "bend"),
    alt(530, "curved_stative", "adjective", "bent / curved"),
  ]),
  "今年": Object.freeze([
    alt(531, "this_year_nin4", "temporal", "this year", "gam1 nin4"),
    alt(531, "this_year_nin2", "temporal", "this year, changed-tone reading", "gam1 nin2"),
  ]),
  "排": Object.freeze([
    alt(534, "arrange_verb", "verb", "arrange / rank / discharge"),
    alt(534, "row_classifier", "classifier", "classifier/measure for rows"),
    alt(534, "row_platoon_noun", "noun", "row / platoon"),
  ]),
  "跟": Object.freeze([
    alt(535, "follow_verb", "verb", "follow"),
    alt(535, "relational_coverb", "coverb", "with / following relational use"),
    alt(535, "conjunctive_function", "function", "conjunctive/linking use"),
  ]),
  "返來": Object.freeze([
    alt(538, "motion_lai4", "verb", "come back / return", "faan1 lai4", "motion_verb"),
    alt(538, "motion_lei4", "verb", "come back / return", "faan1 lei4", "motion_verb"),
  ]),
  "樂": Object.freeze([
    alt(544, "happy_stative", "adjective", "happy / joyful", "lok6"),
    alt(544, "surname", "proper", "surname", "lok6"),
    alt(544, "music_bound", "bound", "music / musical morpheme", "ngok6"),
    alt(544, "enjoy_bound", "bound", "formal/bound enjoy / appreciate family", "ngaau6"),
  ]),
  "形": Object.freeze([
    alt(548, "shape_noun", "noun", "shape / form"),
    alt(548, "form_verb", "verb", "form / appear"),
    alt(548, "form_bound", "bound", "form/shape morpheme"),
  ]),
  "直接": Object.freeze([
    alt(549, "direct_stative", "adjective", "direct"),
    alt(549, "directly_adverb", "adverb", "directly"),
  ]),
  "班": Object.freeze([
    alt(550, "class_team_noun", "noun", "class / team / group"),
    alt(550, "group_classifier", "classifier", "classifier for groups/classes"),
    alt(550, "group_verb", "verb", "marginal grouping verbal family"),
  ]),
  "細個": Object.freeze([alt(553, "young_age_expression", "adjective", "young / in childhood", "", "age_stative_expression")]),
  "經濟": Object.freeze([
    alt(556, "economy_noun", "noun", "economy"),
    alt(556, "economic_stative", "adjective", "economic / economical"),
  ]),
  "使": Object.freeze([
    alt(560, "use_cause_verb", "verb", "use / cause / spend"),
    alt(560, "necessity_modal", "modal", "necessity modal", "", "necessity_modal"),
  ]),
  "突然": Object.freeze([
    alt(561, "sudden_stative", "adjective", "sudden"),
    alt(561, "suddenly_adverb", "adverb", "suddenly"),
  ]),
  "錯": Object.freeze([
    alt(565, "mistake_noun", "noun", "mistake / fault"),
    alt(565, "wrong_stative", "adjective", "wrong / incorrect"),
  ]),
  "平": Object.freeze([
    alt(569, "cheap_stative", "adjective", "cheap", "peng4"),
    alt(569, "flat_stative", "adjective", "flat / level / even", "ping4"),
  ]),
  "打電話": Object.freeze([alt(570, "telephone_predicate", "verb", "make a telephone call", "", "verb_object_predicate")]),
  "成個": Object.freeze([alt(571, "whole_classifier_phrase", "determiner", "whole / entire", "seng4 go3", "whole_classifier_expression")]),
  "碟": Object.freeze([
    alt(573, "plate_disc_noun", "noun", "plate / disc / album", "dip2"),
    alt(573, "classifier", "classifier", "classifier family", "dip6"),
    alt(573, "bound_reading", "bound", "bound/citation family", "dip6"),
  ]),
  "說話": Object.freeze([
    alt(574, "speech_noun", "noun", "speech / words"),
    alt(574, "speak_verb", "verb", "speak / talk"),
  ]),
  "自由": Object.freeze([
    alt(578, "freedom_noun", "noun", "freedom"),
    alt(578, "free_stative", "adjective", "free / unrestricted"),
  ]),
  "差": Object.freeze([
    alt(583, "difference_stative", "adjective", "difference / shortfall / poor", "caa1"),
    alt(583, "police_dispatch_noun", "noun", "police / dispatch family", "caai1"),
    alt(583, "dispatch_verb", "verb", "dispatch", "caai1"),
  ]),
  "舊": Object.freeze([
    alt(585, "old_stative", "adjective", "old / former"),
    alt(585, "old_item_classifier", "classifier", "classifier/measure-like nominalized family"),
  ]),
  "呵": Object.freeze([
    alt(586, "breathe_verb", "verb", "breathe / puff", "ho1"),
    alt(586, "interjection", "interjection", "ah / oh / wow", "ho1"),
    alt(586, "confirmation_particle", "particle", "confirmation/question tag", "ho2", "question_tag_particle"),
  ]),
  "性": Object.freeze([
    alt(587, "property_noun", "noun", "property / sex / nature"),
    alt(587, "derivational_suffix", "suffix", "derivational -ness/-ity-like morpheme"),
  ]),
  "林": Object.freeze([
    alt(588, "forest_noun", "noun", "forest / woods"),
    alt(588, "surname", "proper", "surname"),
  ]),
  "似": Object.freeze([
    alt(593, "resemble_verb", "verb", "resemble / seem"),
    alt(593, "similar_stative", "adjective", "similar"),
  ]),
  "返工": Object.freeze([alt(595, "go_to_work_predicate", "verb", "go to work", "", "motion_work_predicate")]),
  "着": Object.freeze([
    alt(597, "wear_verb", "verb", "wear / put on", "zoek3"),
    alt(597, "result_suffix", "suffix", "written/result suffix family", "zoek6", "completion_result_suffix"),
    alt(597, "ignite_verb", "verb", "ignite / turn on", "zoek6"),
    alt(597, "correct_stative", "adjective", "correct / right", "zoek6"),
    alt(597, "move_classifier", "classifier", "move / strategy classifier", "zoek6"),
  ]),
  "翻版": Object.freeze([
    alt(602, "copy_noun", "noun", "copy / clone / reprint"),
    alt(602, "copy_verb", "verb", "reprint / copy"),
  ]),
  "包": Object.freeze([
    alt(605, "wrap_include_verb", "verb", "wrap / include / guarantee"),
    alt(605, "bag_package_noun", "noun", "bag / package"),
    alt(605, "package_classifier", "classifier", "classifier-related use"),
  ]),
  "要求": Object.freeze([
    alt(609, "require_verb", "verb", "request / require"),
    alt(609, "requirement_noun", "noun", "request / requirement"),
  ]),
  "旅行": Object.freeze([
    alt(610, "travel_verb", "verb", "travel"),
    alt(610, "trip_noun", "noun", "travel / trip"),
  ]),
  "影響": Object.freeze([
    alt(611, "affect_verb", "verb", "influence / affect"),
    alt(611, "influence_noun", "noun", "influence / effect"),
  ]),
  "關係": Object.freeze([
    alt(614, "relationship_noun", "noun", "relationship"),
    alt(614, "concern_verb", "verb", "concern / have to do with"),
  ]),
  "女": Object.freeze([
    alt(616, "daughter_woman_noun", "person", "daughter / girlfriend / young woman", "neoi2"),
    alt(616, "female_modifier", "adjective", "female modifier/distinction word", "neoi5", "attributive_modifier"),
    alt(616, "female_noun", "person", "female / woman", "neoi5"),
  ]),
  "考慮": Object.freeze([
    alt(617, "consider_verb", "verb", "consider"),
    alt(617, "consideration_noun", "noun", "consideration"),
  ]),
  "男人": Object.freeze([
    alt(618, "man_changed_tone", "person", "man, ordinary lexicalized changed-tone reading", "naam4 jan2"),
    alt(618, "man_base_reading", "person", "man, underlying/base reading relationship", "naam4 jan4"),
  ]),
  "轉彎": Object.freeze([alt(625, "turn_verb", "verb", "turn / turn a corner", "zyun3 waan1", "turning_motion_predicate")]),
  "攬": Object.freeze([
    alt(626, "hug_support_verb", "verb", "hug / shoulder / support", "laam2"),
    alt(626, "gather_monopolize_bound", "bound", "gather / monopolize morphemic family", "laam5"),
  ]),
  "水平": Object.freeze([
    alt(628, "level_noun", "noun", "level / standard"),
    alt(628, "horizontal_stative", "adjective", "horizontal"),
  ]),
  "生活": Object.freeze([
    alt(629, "live_verb", "verb", "live"),
    alt(629, "life_noun", "noun", "life / livelihood"),
  ]),
  "早晨": Object.freeze([
    alt(630, "morning_temporal", "temporal", "morning"),
    alt(630, "greeting_formula", "formula", "good morning greeting"),
  ]),
  "教": Object.freeze([
    alt(634, "teach_verb", "verb", "teach"),
    alt(634, "religion_noun", "noun", "religion / teaching family"),
    alt(634, "teaching_bound", "bound", "teaching/religion morpheme"),
  ]),
  "最好": Object.freeze([alt(635, "best_preference", "adverb", "best / had better", "", "superlative_preference_expression")]),
  "磅": Object.freeze([
    alt(636, "pound_measure", "measure", "pound / weight measure", "bong6"),
    alt(636, "weigh_pay_verb", "verb", "weigh / pay-settle verbal family", "bong6"),
    alt(636, "scales_noun", "noun", "scales / balance device", "bong2"),
  ]),
  "代表": Object.freeze([
    alt(640, "represent_verb", "verb", "represent"),
    alt(640, "representative_noun", "person", "representative / delegate"),
  ]),
  "好過": Object.freeze([
    alt(641, "better_predicate", "adjective", "better than", "", "comparative_predicate"),
    alt(641, "preference_adverb", "adverb", "preference/discourse use"),
  ]),
  "段": Object.freeze([
    alt(644, "segment_noun", "noun", "segment / section"),
    alt(644, "passage_classifier", "classifier", "classifier for passages / stories"),
  ]),
  "早": Object.freeze([
    alt(647, "early_stative", "adjective", "early", "zou2"),
    alt(647, "early_adverb", "adverb", "early", "zou2", "temporal_adverb"),
    alt(647, "morning_temporal", "temporal", "morning / early time", "zou2"),
  ]),
  "發展": Object.freeze([
    alt(650, "develop_verb", "verb", "develop"),
    alt(650, "development_noun", "noun", "development"),
  ]),
  "學": Object.freeze([
    alt(652, "learn_verb", "verb", "learn / study"),
    alt(652, "discipline_bound", "bound", "discipline / school morpheme"),
  ]),
  "尾": Object.freeze([
    alt(656, "tail_end_noun", "noun", "tail / end"),
    alt(656, "end_localizer", "localizer", "at the end / later"),
  ]),
  "近": Object.freeze([
    alt(658, "near_gan6", "adjective", "near / close", "gan6"),
    alt(658, "near_kan5", "adjective", "near / close reading variant", "kan5"),
  ]),
  "最近": Object.freeze([
    alt(663, "recently_adverb", "adverb", "recently"),
    alt(663, "nearest_stative", "adjective", "nearest / most recent"),
  ]),
  "打開": Object.freeze([alt(672, "open_verb", "verb", "open / switch on", "", "resultative_open_predicate")]),
  "步": Object.freeze([
    alt(674, "step_noun", "noun", "step / pace", "bou6"),
    alt(674, "step_measure", "measure", "step/pace measure", "bou6"),
    alt(674, "walk_verb", "verb", "walk / stroll / on foot", "bou6"),
  ]),
  "狗": Object.freeze([
    alt(676, "dog_noun", "noun", "dog"),
    alt(676, "pejorative_stative", "adjective", "pejorative human-characterization use"),
  ]),
  "直行": Object.freeze([
    alt(677, "go_straight_verb", "verb", "go straight", "zik6 haang4", "motion_verb"),
    alt(677, "vertical_column_noun", "noun", "vertical column / line", "zik6 hong4"),
  ]),
  "座": Object.freeze([
    alt(680, "seat_location_bound", "bound", "seat/location morpheme", "zo6"),
    alt(680, "building_classifier", "classifier", "classifier for buildings / mountains", "zo6"),
    alt(680, "placement_verb", "verb", "place / set", "zo6"),
    alt(680, "base_stand_noun", "noun", "base / stand / holder", "zo2"),
  ]),
  "偏": Object.freeze([
    alt(682, "lean_verb", "verb", "lean / deviate"),
    alt(682, "biased_stative", "adjective", "oblique / biased"),
    alt(682, "contrary_adverb", "adverb", "contrary-to-expectation / stubbornly"),
  ]),
  "人工": Object.freeze([
    alt(684, "labor_wages_noun", "noun", "labor / wages / manpower"),
    alt(684, "artificial_stative", "adjective", "artificial / manual"),
  ]),
  "分": Object.freeze([
    alt(685, "divide_verb", "verb", "divide / distinguish", "fan1"),
    alt(685, "unit_measure", "measure", "unit / measure", "fan1"),
    alt(685, "share_noun", "noun", "part / share / fraction", "fan6"),
  ]),
  "主要": Object.freeze([
    alt(687, "main_stative", "adjective", "main / primary"),
    alt(687, "mainly_adverb", "adverb", "mainly"),
  ]),
  "怪": Object.freeze([
    alt(689, "strange_stative", "adjective", "strange"),
    alt(689, "blame_wonder_verb", "verb", "blame / wonder at"),
  ]),
  "除": Object.freeze([
    alt(690, "remove_divide_verb", "verb", "remove / divide"),
    alt(690, "except_function", "function", "except / excluding", "", "exclusion_function"),
  ]),
  "剪": Object.freeze([
    alt(691, "cut_verb", "verb", "cut with scissors"),
    alt(691, "cutting_tool_noun", "noun", "cutting-tool related noun family"),
  ]),
  "袋": Object.freeze([
    alt(693, "bag_noun", "noun", "bag / pocket", "doi2"),
    alt(693, "bag_verb_bound", "verb", "bag / contain verbal family", "doi6"),
    alt(693, "bag_classifier", "classifier", "bag-related classifier family", "doi6"),
  ]),
  "閒": Object.freeze([
    alt(695, "idle_stative", "adjective", "idle / free"),
    alt(695, "leisure_noun", "noun", "leisure / free time"),
  ]),
  "慢慢": Object.freeze([
    alt(696, "slowly_maan2", "adverb", "slowly", "maan6 maan2"),
    alt(696, "slowly_maan1", "adverb", "slowly, changed-tone variant", "maan6 maan1"),
  ]),
  "鐘": Object.freeze([
    alt(697, "clock_bell_noun", "noun", "clock / bell"),
    alt(697, "time_measure", "measure", "time measure / hour-related classifier", "", "time_measure"),
  ]),
  "後": Object.freeze([
    alt(705, "back_noun", "noun", "back / rear"),
    alt(705, "behind_localizer", "localizer", "behind"),
    alt(705, "after_function", "function", "after / later", "", "temporal_function"),
  ]),
  "家": Object.freeze([
    alt(706, "home_family_noun", "noun", "home / family"),
    alt(706, "institution_classifier", "classifier", "classifier for institutions/businesses"),
    alt(706, "person_suffix", "suffix", "person/profession-forming suffix"),
  ]),
  "財政": Object.freeze([
    alt(707, "finance_noun", "noun", "finance / public finances"),
    alt(707, "financial_stative", "adjective", "financial"),
  ]),
  "爸爸": Object.freeze([
    alt(714, "father_baa4baa1", "person", "father", "baa4 baa1"),
    alt(714, "father_baa4baa4", "person", "father reading variant", "baa4 baa4"),
    alt(714, "father_written", "person", "written-language reading", "baa1 baa1"),
  ]),
  "一半": Object.freeze([alt(722, "half_quantity", "measure", "half / one half", "", "fraction_quantity")]),
  "左右": Object.freeze([
    alt(723, "approximately_adverb", "adverb", "approximately", "zo2 jau2"),
    alt(723, "left_right_noun", "noun", "left and right / sides", "zo2 jau6"),
    alt(723, "influence_verb", "verb", "influence / control", "zo2 jau6"),
  ]),
  "食飯": Object.freeze([alt(725, "eat_meal_predicate", "verb", "eat a meal", "", "verb_object_predicate")]),
  "距離": Object.freeze([
    alt(726, "distance_noun", "noun", "distance", "keoi5 lei4"),
    alt(726, "apart_verb", "verb", "be apart / be separated", "keoi5 lei4"),
  ]),
  "生": Object.freeze([
    alt(733, "birth_grow_verb", "verb", "give birth / grow", "saang1"),
    alt(733, "raw_alive_stative", "adjective", "raw / alive", "saang1"),
    alt(733, "address_suffix", "suffix", "address/title suffix", "saang1", "address_suffix"),
    alt(733, "written_bound", "bound", "written/bound morpheme family", "sang1"),
  ]),
  "因": Object.freeze([
    alt(734, "cause_noun", "noun", "cause / reason"),
    alt(734, "because_function", "function", "because / causal connector", "", "causal_connector"),
  ]),
  "考試": Object.freeze([
    alt(735, "exam_noun", "noun", "exam / examination"),
    alt(735, "take_exam_verb", "verb", "take / sit an exam"),
  ]),
  "計": Object.freeze([
    alt(739, "calculate_verb", "verb", "calculate / plan", "gai3"),
    alt(739, "plan_idea_noun", "noun", "plan / idea / account-related family", "gai2"),
  ]),
  "原本": Object.freeze([
    alt(741, "original_noun_stative", "noun", "original / source text"),
    alt(741, "originally_adverb", "adverb", "originally"),
  ]),
  "連": Object.freeze([
    alt(742, "join_verb", "verb", "join / link"),
    alt(742, "even_adverb", "adverb", "even / successively"),
    alt(742, "linking_function", "function", "connector / preposition family", "", "linking_function"),
    alt(742, "proper_family", "proper", "independently supported proper-name family"),
  ]),
  "轉": Object.freeze([
    alt(746, "transfer_turn_verb", "verb", "convey / transfer / turn-shift", "zyun2"),
    alt(746, "revolve_turn_verb", "verb", "revolve / turn / repetition family", "zyun3"),
  ]),
  "大個": Object.freeze([alt(747, "grown_size_expression", "adjective", "grown / big", "", "age_size_stative_expression")]),
  "分別": Object.freeze([
    alt(749, "difference_noun", "noun", "difference / distinction"),
    alt(749, "separately_adverb", "adverb", "separately / respectively"),
  ]),
  "化": Object.freeze([
    alt(750, "transform_verb", "verb", "transform / make into"),
    alt(750, "derivational_suffix", "suffix", "-ize / -ization derivational morpheme"),
  ]),
});

function isNeutralLexicalEntry(entry) {
  return Boolean(entry)
    && entry.label === "lex"
    && entry.pos === "lexical_item"
    && entry.syntax === "lexical_item";
}

function applyReviewedEntries(entries) {
  if (!Array.isArray(entries)) throw new TypeError("ranks 501–750 reviewed overlay requires an entry array");
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
          source: promotion.rank >= 501 && promotion.rank <= 750 ? SOURCE_R1 : SOURCE_R1,
          rank: promotion.rank,
          pronunciation_status: promotion.jyutping
            ? "reviewed_in_final_adjudication_or_r2"
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
          source: SOURCE_R1,
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
      source: "v0.5.230 token lexicon before ranks 501–750 alternatives",
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
      source: [544, 636, 677].includes(spec.rank) ? `${SOURCE_R1} + ${SOURCE_R2}` : SOURCE_R1,
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
    if (!entry) throw new Error(`ranks 501–750 explicit analyses reference missing runtime surface: ${surface}`);
    const rows = [defaultAnalysis(surface, entry), ...specs.map((spec) => reviewedAlternative(surface, spec, entry))];
    const seen = new Set();
    for (const row of rows) {
      if (!row.jyutping) throw new Error(`${row.id}: explicit lexical analysis requires non-empty jyutping`);
      if (seen.has(row.id)) throw new Error(`${row.id}: duplicate ranks 501–750 stable analysis ID`);
      seen.add(row.id);
    }
    out[surface] = Object.freeze(rows);
  }
  return Object.freeze(out);
}

module.exports = Object.freeze({
  SOURCE_R1,
  SOURCE_R2,
  PROMOTIONS,
  BLOCKED_ATOMIC_SURFACES,
  TRANSPARENT_SINGLE_CANDIDATES,
  MULTI_OR_SPLIT_CANDIDATES,
  CANDIDATE_ONLY_SURFACES,
  DEFAULT_READING_OVERRIDES,
  ALTERNATIVE_SPECS,
  isNeutralLexicalEntry,
  applyReviewedEntries,
  buildExplicitAnalyses,
});
