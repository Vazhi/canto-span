"use strict";

// Reviewed lexical consequences of the finalized #858 ranks 251–500 adjudication.
// Cifu rank/surface are discovery provenance only. Cifu definitions/Jyutping
// and Rime POS/semantics are not treated as independent lexical authority here.
const SOURCE = "docs/research/ISSUE-858-CIFU-R251-500-LEXICAL-ADJUDICATION-R1.md";

const BLOCKED_ATOMIC_SURFACES = Object.freeze(new Set([
  "一條",
  "你講",
  "係噉",
  "出來",
  "右行",
  "大樹",
  "尚健",
  "幾好",
  "我講",
  "扮汗",
  "提碑",
  "杏堂",
  "條線",
  "條路線",
  "畫到",
  "行到",
  "講呢",
  "貧大宅",
]));

const CANDIDATE_ONLY_SURFACES = Object.freeze(new Set([
  "今次",
  "仲有",
  "入去",
  "出去",
  "唔記得",
  "得到",
  "讀書",
]));

const PROMOTIONS = Object.freeze({
  "啱啱": Object.freeze({ label: "when", pos: "adverb", jyutping: "ngaam1 ngaam1", syntax: "temporal_adverb", gloss: "just now" }),
  "唉": Object.freeze({ label: "particle", pos: "interjection", jyutping: "aai1", syntax: "interjection", gloss: "sigh / response / regret interjection" }),
  "哎": Object.freeze({ label: "particle", pos: "interjection", jyutping: "aai1", syntax: "interjection", gloss: "attention / surprise / disapproval interjection" }),
  "擰": Object.freeze({ label: "doing", pos: "verb", jyutping: "ning6", syntax: "verb", gloss: "twist / wring / turn with force" }),
  "丸": Object.freeze({ label: "what", pos: "noun", jyutping: "jyun2", syntax: "object_np nominal_root", gloss: "pellet / ball / pill" }),
  "隔離": Object.freeze({ label: "doing", pos: "verb", jyutping: "gaak3 lei4", syntax: "verb", gloss: "isolate / separate" }),
  "往": Object.freeze({ label: "func", pos: "function", syntax: "directional_relation motion_coverb", gloss: "towards / in the direction of" }),
  "淨係": Object.freeze({ label: "func", pos: "adverb", syntax: "focus_adverb restrictive_focus", gloss: "only / merely" }),
  "底": Object.freeze({ label: "where", pos: "noun", syntax: "spatial_localizer spatial_nominal", gloss: "bottom / base / underlying part" }),
  "為": Object.freeze({ label: "func", pos: "function", syntax: "coverb relation_function", gloss: "for / because of / as" }),
  "車站": Object.freeze({ label: "where", pos: "noun", syntax: "place_or_goal place_np", gloss: "station / stop" }),
  "差唔多": Object.freeze({ label: "like", pos: "adjective", syntax: "stative_predicate approximation_predicate", gloss: "similar / about the same" }),
  "魚排": Object.freeze({ label: "what", pos: "noun", jyutping: "jyu4 paai4", syntax: "object_np mariculture_raft_np", gloss: "mariculture raft / fish-farm raft" }),
  "唔同": Object.freeze({ label: "like", pos: "adjective", syntax: "stative_predicate difference_property", gloss: "different / not the same" }),
  "會見": Object.freeze({ label: "doing", pos: "verb", jyutping: "wui6 gin3", syntax: "verb formal_meeting_verb", gloss: "meet / interview formally" }),
  "吔": Object.freeze({ label: "particle", pos: "interjection", jyutping: "jaa3", syntax: "interjection_or_particle", gloss: "interjection / pragmatic particle" }),
  "等等": Object.freeze({ label: "func", pos: "function", syntax: "list_continuation_marker", gloss: "etcetera / and so on" }),
  "盛": Object.freeze({ label: "like", pos: "adjective", jyutping: "sing6", syntax: "stative_predicate", gloss: "flourishing / prosperous / grand / abundant" }),
  "燕": Object.freeze({ label: "what", pos: "noun", jyutping: "jin3", syntax: "object_np animal_np", gloss: "swallow (bird)" }),
  "同學": Object.freeze({ label: "who", pos: "noun", syntax: "person_np", gloss: "classmate / fellow student" }),
  "只": Object.freeze({ label: "func", pos: "adverb", jyutping: "zi2", syntax: "restrictive_focus_adverb", gloss: "only / merely" }),
  "可": Object.freeze({ label: "func", pos: "function", syntax: "modal_or_property_function", gloss: "can / may / permissible" }),
  "有時": Object.freeze({ label: "when", pos: "adverb", syntax: "frequency_adverb temporal_adjunct", gloss: "sometimes" }),
  "唧": Object.freeze({ label: "particle", pos: "particle", jyutping: "zek1", syntax: "discourse_particle", gloss: "particle use" }),
  "老": Object.freeze({ label: "like", pos: "adjective", syntax: "stative_or_prefix", gloss: "old / familiar-prefix family" }),
  "依": Object.freeze({ label: "doing", pos: "verb", syntax: "verb relational_verb", gloss: "depend on / according to" }),
  "咦": Object.freeze({ label: "particle", pos: "interjection", jyutping: "ji2", syntax: "interjection", gloss: "surprise interjection" }),
  "扮": Object.freeze({ label: "doing", pos: "verb", jyutping: "baan6", syntax: "verb", gloss: "pretend / dress up" }),
  "擁": Object.freeze({ label: "doing", pos: "verb", syntax: "verb", gloss: "embrace / support / surround" }),
  "本身": Object.freeze({ label: "func", pos: "pronoun", syntax: "reflexive_pronoun emphatic_modifier", gloss: "itself / in itself" }),
  "另": Object.freeze({ label: "how", pos: "adverb", syntax: "separative_modifier_adverb", gloss: "other / another / separately" }),
  "彭": Object.freeze({ label: "who", pos: "proper_noun", jyutping: "paang4", syntax: "surname_element", gloss: "surname Peng" }),
  "像": Object.freeze({ label: "doing", pos: "verb", jyutping: "zoeng6", syntax: "verb resemblance_predicate", gloss: "resemble / appear like" }),
  "仔": Object.freeze({ label: "who", pos: "noun", jyutping: "zai2", syntax: "person_or_young_animal_noun diminutive_suffix", gloss: "boy / child / young animal; diminutive suffix" }),
  "風車": Object.freeze({ label: "what", pos: "noun", syntax: "object_np artifact_np", gloss: "windmill / pinwheel" }),
  "越": Object.freeze({ label: "func", pos: "function", jyutping: "jyut6", syntax: "correlative_degree_marker", gloss: "the more…; degree/correlative function" }),
  "考": Object.freeze({ label: "doing", pos: "verb", syntax: "verb", gloss: "test / examine / take an exam" }),
  "引": Object.freeze({ label: "doing", pos: "verb", syntax: "verb", gloss: "draw / pull / lead / attract" }),
  "前": Object.freeze({ label: "where", pos: "noun", syntax: "spatial_or_temporal_localizer", gloss: "front / before / ago" }),
  "完全": Object.freeze({ label: "how", pos: "adverb", syntax: "degree_adverb manner_adverb", gloss: "completely / totally" }),
  "股": Object.freeze({ label: "what", pos: "noun", syntax: "object_np nominal_or_measure_root", gloss: "share / portion / thigh" }),
  "所": Object.freeze({ label: "func", pos: "function", syntax: "nominalizer_or_classifier_function", gloss: "nominalizing/passive function; institutional classifier" }),
  "所謂": Object.freeze({ label: "func", pos: "function", syntax: "so_called_modifier", gloss: "so-called / alleged" }),
  "首先": Object.freeze({ label: "when", pos: "adverb", syntax: "sequence_adverb discourse_adverb", gloss: "first of all" }),
  "全部": Object.freeze({ label: "func", pos: "quantifier", syntax: "universal_quantifier pronoun_like_quantifier", gloss: "all / the whole" }),
  "服務": Object.freeze({ label: "doing", pos: "verb", syntax: "verb service_verb", gloss: "serve / provide service" }),
  "理": Object.freeze({ label: "doing", pos: "verb", syntax: "verb management_attention_verb", gloss: "manage / handle / pay attention to" }),
  "種": Object.freeze({ label: "what", pos: "noun", syntax: "kind_seed_noun", gloss: "kind / species / seed" }),
  "堂": Object.freeze({ label: "what", pos: "noun", syntax: "room_or_hall_noun", gloss: "hall / room" }),
  "后": Object.freeze({ label: "who", pos: "noun", syntax: "title_noun", gloss: "empress / queen" }),
  "呃": Object.freeze({ label: "doing", pos: "verb", jyutping: "aak1", syntax: "verb deception_verb", gloss: "cheat / deceive" }),
  "就算": Object.freeze({ label: "func", pos: "function", syntax: "concessive_conjunction", gloss: "even if / granted that" }),
  "怨": Object.freeze({ label: "doing", pos: "verb", syntax: "verb psych_verb", gloss: "blame / complain / resent" }),
  "起": Object.freeze({ label: "doing", pos: "verb", syntax: "verb rise_start_verb", gloss: "rise / start / set out" }),
  "打橫": Object.freeze({ label: "how", pos: "adverb", syntax: "manner_adverb orientation_property", gloss: "horizontally / crosswise" }),
  "揀": Object.freeze({ label: "doing", pos: "verb", jyutping: "gaan2", syntax: "verb", gloss: "choose / pick" }),
  "項": Object.freeze({ label: "measure_word", pos: "classifier", jyutping: "hong6", syntax: "general_classifier item_classifier", gloss: "classifier for items / projects / clauses / sums" }),
  "嶺": Object.freeze({ label: "where", pos: "noun", jyutping: "leng5", syntax: "natural_place_np ridge_np", gloss: "ridge / mountain range" }),
  "之": Object.freeze({ label: "func", pos: "function", jyutping: "zi1", syntax: "structural_genitive_nominal_linker", gloss: "formal structural/genitive linker" }),
  "出現": Object.freeze({ label: "doing", pos: "verb", jyutping: "ceot1 jin6", syntax: "verb appearance_verb", gloss: "appear / emerge" }),
  "直情": Object.freeze({ label: "how", pos: "adverb", jyutping: "zik6 cing4", syntax: "discourse_adverb emphatic_adverb", gloss: "simply / outright / actually" }),
  "掂": Object.freeze({ label: "like", pos: "adjective", jyutping: "dim6", syntax: "stative_predicate evaluative_property", gloss: "okay / satisfactory / capable / successful" }),
  "頂": Object.freeze({ label: "doing", pos: "verb", jyutping: "ding2", syntax: "verb support_endure_verb", gloss: "support / withstand / endure / substitute" }),
  "裏邊": Object.freeze({ label: "where", pos: "noun", jyutping: "leoi5 bin6", syntax: "spatial_localizer locality_np", gloss: "inside / interior" }),
  "不": Object.freeze({ label: "func", pos: "function", jyutping: "bat1", syntax: "formal_negator", gloss: "formal/written negator" }),
  "收": Object.freeze({ label: "doing", pos: "verb", syntax: "verb", gloss: "receive / accept / collect" }),
  "愁": Object.freeze({ label: "like", pos: "adjective", syntax: "psych_stative_or_verb", gloss: "worried / troubled" }),
  "忍": Object.freeze({ label: "doing", pos: "verb", syntax: "verb", gloss: "endure / tolerate" }),
  "重": Object.freeze({ label: "how", pos: "adverb", jyutping: "zung6", syntax: "additive_continuative_adverb", gloss: "still / furthermore" }),
  "望": Object.freeze({ label: "doing", pos: "verb", syntax: "verb perception_or_desire_verb", gloss: "look / gaze / hope / expect" }),
  "共": Object.freeze({ label: "func", pos: "bound_morpheme", syntax: "bound_formal_root", gloss: "common / together / total (bound/formal root)" }),
});

function reviewedAnalysis(surface, key, label, pos, syntax, gloss, jyutping, provenanceKind = "reviewed_lexical_analysis") {
  return Object.freeze({
    id: `lex:${surface}:${key}`,
    label,
    pos,
    jyutping,
    syntax,
    senses: Object.freeze([{ gloss }]),
    provenance: Object.freeze({ kind: provenanceKind, source: SOURCE }),
  });
}

const EXPLICIT_ANALYSES = Object.freeze({
  "團": Object.freeze([
    reviewedAnalysis("團", "default", "what", "noun", "collective_np object_np", "group / collective", "tyun4"),
    reviewedAnalysis("團", "classifier", "measure_word", "classifier", "classifier_collective_or_mass", "classifier / measure for groups or round masses", "tyun4"),
  ]),
  "啱啱": Object.freeze([
    reviewedAnalysis("啱啱", "default", "when", "adverb", "temporal_adverb", "just now", "ngaam1 ngaam1"),
    reviewedAnalysis("啱啱", "aam1_variant", "when", "adverb", "temporal_adverb", "just now; pronunciation variant", "aam1 aam1"),
  ]),
  "唉": Object.freeze([
    reviewedAnalysis("唉", "default", "particle", "interjection", "interjection", "sigh / response interjection", "aai1"),
    reviewedAnalysis("唉", "oi1_interjection", "particle", "interjection", "interjection", "sigh / disapproval interjection", "oi1"),
    reviewedAnalysis("唉", "aai6_regret", "particle", "interjection", "interjection", "regret / pity interjection", "aai6"),
  ]),
  "哎": Object.freeze([
    reviewedAnalysis("哎", "default", "particle", "interjection", "interjection", "attention / surprise / disapproval interjection", "aai1"),
    reviewedAnalysis("哎", "ai1_variant", "particle", "interjection", "interjection", "rarer interjection reading", "ai1"),
  ]),
  "蛇": Object.freeze([
    reviewedAnalysis("蛇", "default", "what", "noun", "object_np animal_np", "snake / serpent", "se4"),
    reviewedAnalysis("蛇", "slack_off_verb", "doing", "verb", "verb work_avoidance_verb", "slack off / shirk at work", "se4"),
  ]),
  "擰": Object.freeze([
    reviewedAnalysis("擰", "default", "doing", "verb", "verb", "twist / turn with force; screw", "ning6"),
    reviewedAnalysis("擰", "wring_verb", "doing", "verb", "verb", "wring", "ning4"),
    reviewedAnalysis("擰", "carry_hold_family", "doing", "verb", "verb", "carry / hold; colloquial 拎-type family", "ning1"),
  ]),
  "打": Object.freeze([
    reviewedAnalysis("打", "default", "doing", "verb", "verb", "hit / play / call", "daa2"),
    reviewedAnalysis("打", "dozen_classifier", "measure_word", "classifier", "quantity_classifier dozen_measure", "dozen", "daa1"),
  ]),
  "丸": Object.freeze([
    reviewedAnalysis("丸", "default", "what", "noun", "object_np nominal_root", "pellet / ball / pill", "jyun2"),
    reviewedAnalysis("丸", "jyun4_literary", "what", "noun", "object_np nominal_root", "pellet / ball / pill; literary reading", "jyun4"),
  ]),
  "玩": Object.freeze([
    reviewedAnalysis("玩", "default", "doing", "verb", "verb", "play / have fun", "waan2"),
    reviewedAnalysis("玩", "wun6_bound", "func", "bound_morpheme", "bound_morpheme", "bound reading in forms such as 玩具 / 玩意", "wun6"),
  ]),
  "幫": Object.freeze([
    reviewedAnalysis("幫", "default", "doing", "verb", "verb help_benefactive_verb", "help / assist", "bong1"),
    reviewedAnalysis("幫", "benefactive_coverb", "func", "function", "benefactive_coverb", "for / on behalf of", "bong1"),
  ]),
  "往": Object.freeze([
    reviewedAnalysis("往", "default", "func", "function", "directional_relation motion_coverb", "towards / in the direction of", "wong5"),
    reviewedAnalysis("往", "motion_verb", "doing", "verb", "verb motion_directional_verb", "go / proceed toward", "wong5"),
  ]),
  "份": Object.freeze([
    reviewedAnalysis("份", "default", "measure_word", "classifier", "general_classifier document_task_classifier", "classifier / measure for units or portions", "fan6"),
    reviewedAnalysis("份", "fan2_noun", "what", "noun", "abstract_np", "share / participation / role / entitlement", "fan2"),
  ]),
  "為": Object.freeze([
    reviewedAnalysis("為", "default", "func", "function", "coverb", "for / because of / for the sake of", "wai6"),
    reviewedAnalysis("為", "wai4_relation", "func", "function", "relation_function", "as / become / be treated as", "wai4"),
    reviewedAnalysis("為", "wai4_tally_verb", "doing", "verb", "verb formal_tally_verb", "calculate / tally", "wai4"),
  ]),
  "差唔多": Object.freeze([
    reviewedAnalysis("差唔多", "default", "like", "adjective", "stative_predicate approximation_predicate", "similar / about the same", "caa1 m4 do1"),
    reviewedAnalysis("差唔多", "approximation_adverb", "how", "adverb", "approximation_adverb", "almost / about / nearly", "caa1 m4 do1"),
  ]),
  "開": Object.freeze([
    reviewedAnalysis("開", "default", "doing", "verb", "verb_or_modifier_head", "open / start / turn on", "hoi1"),
    reviewedAnalysis("開", "result_directional_complement", "func", "function", "resultative_or_directional_complement", "productive resultative / directional complement use", "hoi1"),
  ]),
  "另外": Object.freeze([
    reviewedAnalysis("另外", "default", "how", "adverb", "additive_adverb discourse_adverb", "besides / in addition / separately", "ling6 ngoi6"),
    reviewedAnalysis("另外", "determiner", "func", "determiner", "determiner_like_modifier", "another / other", "ling6 ngoi6"),
  ]),
  "希望": Object.freeze([
    reviewedAnalysis("希望", "default", "doing", "verb", "verb desire_verb", "hope / wish", "hei1 mong6"),
    reviewedAnalysis("希望", "noun", "what", "noun", "abstract_np", "hope / prospect", "hei1 mong6"),
  ]),
  "其他": Object.freeze([
    reviewedAnalysis("其他", "default", "func", "determiner", "nominal_modifier determiner_like_modifier", "other", "kei4 taa1"),
    reviewedAnalysis("其他", "pronoun", "what", "pronoun", "pronoun", "the others", "kei4 taa1"),
  ]),
  "吔": Object.freeze([
    reviewedAnalysis("吔", "default", "particle", "interjection", "interjection", "interjection", "jaa3"),
    reviewedAnalysis("吔", "sentence_particle", "particle", "particle", "sentence_final_particle", "pragmatic sentence particle", "jaa3"),
  ]),
  "明白": Object.freeze([
    reviewedAnalysis("明白", "default", "doing", "verb", "verb cognition_verb", "understand / realize", "ming4 baak6"),
    reviewedAnalysis("明白", "clear_stative", "like", "adjective", "stative_predicate clarity_state", "clear / understood", "ming4 baak6"),
  ]),
  "等等": Object.freeze([
    reviewedAnalysis("等等", "default", "func", "function", "list_continuation_marker", "etcetera / and so on", "dang2 dang2"),
    reviewedAnalysis("等等", "wait_verb", "doing", "verb", "verb", "wait / hold on", "dang2 dang2"),
  ]),
  "中": Object.freeze([
    reviewedAnalysis("中", "default", "what", "noun", "nominal_or_bound_middle_family", "middle / central / China-related family", "zung1"),
    reviewedAnalysis("中", "zung3_verb", "doing", "verb", "verb", "hit / be hit / win / suffer", "zung3"),
  ]),
  "根本": Object.freeze([
    reviewedAnalysis("根本", "default", "how", "adverb", "emphatic_adverb discourse_adverb", "fundamentally / simply / at all", "gan1 bun2"),
    reviewedAnalysis("根本", "noun", "what", "noun", "abstract_np", "root / foundation / basis", "gan1 bun2"),
  ]),
  "盛": Object.freeze([
    reviewedAnalysis("盛", "default", "like", "adjective", "stative_predicate", "flourishing / prosperous / grand / abundant", "sing6"),
    reviewedAnalysis("盛", "sing4_verb", "doing", "verb", "verb", "fill / contain / ladle / accommodate", "sing4"),
  ]),
  "燕": Object.freeze([
    reviewedAnalysis("燕", "default", "what", "noun", "object_np animal_np", "swallow (bird)", "jin3"),
    reviewedAnalysis("燕", "jin1_proper", "who", "proper_noun", "proper_name_family", "Yan historical / proper-name family", "jin1"),
  ]),
  "請": Object.freeze([
    reviewedAnalysis("請", "default", "func", "function", "politeness_imperative_marker request_function", "please / request", "cing2"),
    reviewedAnalysis("請", "ceng2_spoken_verb", "doing", "verb", "verb request_invite_verb", "ask / invite / request", "ceng2"),
  ]),
  "仲有": Object.freeze([
    reviewedAnalysis("仲有", "default", "lex", "lexical_item", "lexical_item", "neutral exact-surface coverage; retain productive 仲 + 有 segmentation by default", "zung6 jau5", "neutral_frequency_fallback_preserved"),
    reviewedAnalysis("仲有", "additive_discourse", "func", "function", "additive_discourse_marker", "also / furthermore", "zung6 jau5"),
  ]),
  "唧": Object.freeze([
    reviewedAnalysis("唧", "default", "particle", "particle", "discourse_particle", "particle use", "zek1"),
    reviewedAnalysis("唧", "zit1_verb", "doing", "verb", "verb", "squeeze / tickle", "zit1"),
    reviewedAnalysis("唧", "zik1_verb_variant", "doing", "verb", "verb", "squeeze / tickle; reading variant", "zik1"),
  ]),
  "老": Object.freeze([
    reviewedAnalysis("老", "default", "like", "adjective", "stative_predicate", "old", "lou5"),
    reviewedAnalysis("老", "familiar_prefix", "func", "bound_morpheme", "familiar_or_ordinal_prefix", "familiar / ordinal prefix", "lou5"),
  ]),
  "咦": Object.freeze([
    reviewedAnalysis("咦", "default", "particle", "interjection", "interjection", "surprise interjection", "ji2"),
    reviewedAnalysis("咦", "ji4_variant", "particle", "interjection", "interjection", "surprise interjection; pronunciation variant", "ji4"),
    reviewedAnalysis("咦", "ji6_variant", "particle", "interjection", "interjection", "surprise interjection; pronunciation variant", "ji6"),
  ]),
  "感覺": Object.freeze([
    reviewedAnalysis("感覺", "default", "doing", "verb", "verb perception_verb", "feel / perceive", "gam2 gok3"),
    reviewedAnalysis("感覺", "noun", "what", "noun", "abstract_np perception_noun", "feeling / sensation", "gam2 gok3"),
  ]),
  "定": Object.freeze([
    reviewedAnalysis("定", "decide_fix_verb", "doing", "verb", "verb decide_fix_schedule_verb", "decide / settle / fix / schedule", "ding6"),
    reviewedAnalysis("定", "alternative_connector", "func", "function", "alternative_question_connector", "or; alternative-question connector", "ding6"),
    reviewedAnalysis("定", "steady_stative", "like", "adjective", "stative_predicate", "steady / calm", "ding6"),
    reviewedAnalysis("定", "advance_adverb", "how", "adverb", "advance_adverb", "in advance / beforehand", "ding6"),
  ]),
  "本身": Object.freeze([
    reviewedAnalysis("本身", "default", "func", "pronoun", "reflexive_pronoun", "itself / oneself", "bun2 san1"),
    reviewedAnalysis("本身", "emphatic_modifier", "how", "adverb", "emphatic_modifier", "in itself / per se", "bun2 san1"),
  ]),
  "格": Object.freeze([
    reviewedAnalysis("格", "default", "what", "noun", "abstract_or_object_np pattern_np", "square / grid / compartment / pattern", "gaak3"),
    reviewedAnalysis("格", "classifier", "measure_word", "classifier", "classifier_grid_or_compartment", "classifier / measure for grid or compartment units", "gaak3"),
    reviewedAnalysis("格", "formal_verb", "doing", "verb", "formal_or_bound_verb", "formal/bound verbal family", "gaak3"),
  ]),
  "不如": Object.freeze([
    reviewedAnalysis("不如", "default", "func", "function", "suggestion_marker", "better to / how about", "bat1 jyu4"),
    reviewedAnalysis("不如", "comparative_predicate", "like", "adjective", "comparative_predicate", "not as good as / inferior to", "bat1 jyu4"),
  ]),
  "今次": Object.freeze([
    reviewedAnalysis("今次", "default", "lex", "lexical_item", "lexical_item", "neutral exact-surface coverage; retain productive 今 + 次 segmentation by default", "gam1 ci3", "neutral_frequency_fallback_preserved"),
    reviewedAnalysis("今次", "this_time_noun", "when", "noun", "temporal_np", "this time", "gam1 ci3"),
  ]),
  "汗": Object.freeze([
    reviewedAnalysis("汗", "default", "what", "noun", "object_np substance_np", "sweat / perspiration", "hon6"),
    reviewedAnalysis("汗", "hon4_proper", "who", "proper_noun", "proper_title_family", "Khan / proper-title family", "hon4"),
    reviewedAnalysis("汗", "hong6_proper", "who", "proper_noun", "proper_title_family", "Khan / proper-title family", "hong6"),
  ]),
  "莊": Object.freeze([
    reviewedAnalysis("莊", "default", "where", "noun", "settlement_or_estate_np", "village / manor / estate family", "zong1"),
    reviewedAnalysis("莊", "organization_noun", "what", "noun", "organization_or_business_noun", "organization / dealer / business family", "zong1"),
    reviewedAnalysis("莊", "surname", "who", "proper_noun", "surname_element", "surname Zhuang/Chong family", "zong1"),
  ]),
  "名": Object.freeze([
    reviewedAnalysis("名", "default", "what", "noun", "object_np", "name", "meng2"),
    reviewedAnalysis("名", "ming4_written", "what", "noun", "written_or_bound_nominal classifier_person", "written/bound name family; person-classifier use where licensed", "ming4"),
  ]),
  "即刻": Object.freeze([
    reviewedAnalysis("即刻", "default", "when", "adverb", "temporal_adjunct immediate_time_adverb", "immediately / instantly", "zik1 hak1"),
    reviewedAnalysis("即刻", "kak1_variant", "when", "adverb", "temporal_adjunct immediate_time_adverb", "immediately / instantly", "zik1 kak1"),
    reviewedAnalysis("即刻", "haak1_variant", "when", "adverb", "temporal_adjunct immediate_time_adverb", "immediately / instantly", "zik1 haak1"),
    reviewedAnalysis("即刻", "kaak1_variant", "when", "adverb", "temporal_adjunct immediate_time_adverb", "immediately / instantly", "zik1 kaak1"),
  ]),
  "勁": Object.freeze([
    reviewedAnalysis("勁", "default", "like", "adjective", "stative_predicate scalar_property", "strong / excellent", "ging6"),
    reviewedAnalysis("勁", "degree_adverb", "how", "adverb", "degree_adverb", "very / strongly", "ging6"),
    reviewedAnalysis("勁", "ging3_noun", "what", "noun", "abstract_np", "vigor / vitality / aura", "ging3"),
  ]),
  "將": Object.freeze([
    reviewedAnalysis("將", "default", "func", "function", "disposal_coverb future_or_incipent_function", "disposal / future / incipient function", "zoeng1"),
    reviewedAnalysis("將", "zoeng3_general_noun", "who", "noun", "title_or_role_noun", "general / commander", "zoeng3"),
    reviewedAnalysis("將", "zoeng3_command_verb", "doing", "verb", "verb command_lead_verb", "command / lead", "zoeng3"),
  ]),
  "像": Object.freeze([
    reviewedAnalysis("像", "default", "doing", "verb", "verb resemblance_predicate", "resemble / appear like", "zoeng6"),
    reviewedAnalysis("像", "image_noun", "what", "noun", "object_np image_or_statue_noun", "image / portrait / statue", "zoeng6"),
  ]),
  "仔": Object.freeze([
    reviewedAnalysis("仔", "default", "who", "noun", "person_or_young_animal_noun", "boy / child / young animal", "zai2"),
    reviewedAnalysis("仔", "diminutive_suffix", "func", "bound_morpheme", "diminutive_nominal_suffix", "diminutive / nominal suffix", "zai2"),
    reviewedAnalysis("仔", "zi2_written_bound", "func", "bound_morpheme", "written_bound_morpheme", "written/bound reading in independently supported forms", "zi2"),
  ]),
  "越": Object.freeze([
    reviewedAnalysis("越", "default", "func", "function", "correlative_degree_marker", "the more…; degree/correlative function", "jyut6"),
    reviewedAnalysis("越", "cross_exceed_verb", "doing", "verb", "verb", "cross / exceed / surpass", "jyut6"),
    reviewedAnalysis("越", "proper_bound_family", "what", "proper_noun", "proper_or_bound_nominal", "Yue / Vietnam / historical proper-name family", "jyut6"),
  ]),
  "前": Object.freeze([
    reviewedAnalysis("前", "default", "where", "noun", "spatial_or_temporal_localizer", "front / before / ago", "cin4"),
    reviewedAnalysis("前", "localizer_function", "func", "function", "spatial_temporal_localizer_function", "before / ago / in front of", "cin4"),
  ]),
  "頭": Object.freeze([
    reviewedAnalysis("頭", "default", "what", "noun", "object_np body_part_np", "head / top / end", "tau4"),
    reviewedAnalysis("頭", "localizer", "where", "noun", "spatial_or_temporal_localizer", "top / end / beginning locality family", "tau4"),
    reviewedAnalysis("頭", "classifier", "measure_word", "classifier", "classifier_family", "classifier use", "tau4"),
  ]),
  "股": Object.freeze([
    reviewedAnalysis("股", "default", "what", "noun", "object_np nominal_or_measure_root", "share / portion / thigh", "gu2"),
    reviewedAnalysis("股", "classifier", "measure_word", "classifier", "classifier_current_smell_strand", "classifier for currents / smells / strands / portions", "gu2"),
  ]),
  "部": Object.freeze([
    reviewedAnalysis("部", "default", "measure_word", "classifier", "classifier_vehicle_machine", "classifier for machines / films / works", "bou6"),
    reviewedAnalysis("部", "noun", "what", "noun", "part_department_noun", "part / department / division", "bou6"),
  ]),
  "信": Object.freeze([
    reviewedAnalysis("信", "default", "doing", "verb", "belief_verb", "believe / trust", "seon3"),
    reviewedAnalysis("信", "letter_noun", "what", "noun", "object_np message_or_evidence_noun", "letter / message / evidence", "seon3"),
  ]),
  "所": Object.freeze([
    reviewedAnalysis("所", "default", "func", "function", "nominalizer_or_passive_marker", "nominalizing / relative / passive function", "so2"),
    reviewedAnalysis("所", "institution_classifier", "measure_word", "classifier", "classifier_institution_building", "classifier for institutions / buildings", "so2"),
  ]),
  "帶": Object.freeze([
    reviewedAnalysis("帶", "default", "doing", "verb", "verb take_bring_verb", "carry / bring / lead", "daai3"),
    reviewedAnalysis("帶", "daai2_noun", "what", "noun", "object_np band_belt_noun", "band / belt / zone", "daai2"),
  ]),
  "全部": Object.freeze([
    reviewedAnalysis("全部", "default", "func", "quantifier", "universal_quantifier pronoun_like_quantifier", "all / the whole", "cyun4 bou6"),
    reviewedAnalysis("全部", "adverb", "how", "adverb", "degree_adverb", "entirely / altogether", "cyun4 bou6"),
  ]),
  "服務": Object.freeze([
    reviewedAnalysis("服務", "default", "doing", "verb", "verb service_verb", "serve / provide service", "fuk6 mou6"),
    reviewedAnalysis("服務", "noun", "what", "noun", "abstract_or_event_noun", "service", "fuk6 mou6"),
  ]),
  "覺": Object.freeze([
    reviewedAnalysis("覺", "default", "what", "noun", "object_in_vo sleep_noun", "sleep / nap", "gaau3"),
    reviewedAnalysis("覺", "gok3_verb", "doing", "verb", "verb cognition_perception_verb", "feel / think / notice", "gok3"),
  ]),
  "本": Object.freeze([
    reviewedAnalysis("本", "default", "measure_word", "classifier", "classifier_book", "classifier for books / files", "bun2"),
    reviewedAnalysis("本", "basis_noun", "what", "noun", "abstract_np", "root / source / basis", "bun2"),
    reviewedAnalysis("本", "current_bound", "func", "bound_morpheme", "determiner_like_bound_morpheme", "this / current", "bun2"),
  ]),
  "特別": Object.freeze([
    reviewedAnalysis("特別", "default", "like", "adjective", "modifier_or_stative", "special / unusual", "dak6 bit6"),
    reviewedAnalysis("特別", "adverb", "how", "adverb", "degree_or_focus_adverb", "especially / particularly", "dak6 bit6"),
  ]),
  "得到": Object.freeze([
    reviewedAnalysis("得到", "default", "lex", "lexical_item", "lexical_item", "neutral exact-surface coverage; retain productive 得 + 到 resultative segmentation by default", "dak1 dou2", "neutral_frequency_fallback_preserved"),
    reviewedAnalysis("得到", "obtain_verb", "doing", "verb", "verb obtain_receive_verb", "obtain / receive", "dak1 dou3"),
  ]),
  "理": Object.freeze([
    reviewedAnalysis("理", "default", "doing", "verb", "verb management_attention_verb", "manage / handle / pay attention to", "lei5"),
    reviewedAnalysis("理", "noun", "what", "noun", "abstract_or_bound_noun", "reason / principle / science", "lei5"),
  ]),
  "種": Object.freeze([
    reviewedAnalysis("種", "default", "what", "noun", "kind_seed_noun", "kind / species / seed", "zung2"),
    reviewedAnalysis("種", "classifier", "measure_word", "classifier", "kind_type_classifier", "classifier for kinds / types", "zung2"),
    reviewedAnalysis("種", "plant_verb", "doing", "verb", "verb plant_cultivate_verb", "plant / cultivate", "zung3"),
  ]),
  "堂": Object.freeze([
    reviewedAnalysis("堂", "default", "what", "noun", "room_or_hall_noun", "hall / room", "tong4"),
    reviewedAnalysis("堂", "classifier", "measure_word", "classifier", "class_or_set_classifier", "classifier for classes / sets", "tong4"),
    reviewedAnalysis("堂", "kinship_bound", "func", "bound_morpheme", "kinship_clan_bound_modifier", "paternal-clan / kinship bound modifier", "tong4"),
  ]),
  "呃": Object.freeze([
    reviewedAnalysis("呃", "default", "doing", "verb", "verb deception_verb", "cheat / deceive", "aak1"),
    reviewedAnalysis("呃", "ngaak1_verb", "doing", "verb", "verb deception_verb", "cheat / deceive", "ngaak1"),
    reviewedAnalysis("呃", "aak3_particle", "particle", "particle", "sentence_final_particle", "sentence particle", "aak3"),
  ]),
  "少": Object.freeze([
    reviewedAnalysis("少", "default", "like", "adjective", "stative_or_quantity", "few / little", "siu2"),
    reviewedAnalysis("少", "siu3_young_bound", "func", "bound_morpheme", "young_bound_morpheme", "young; bound reading in compounds", "siu3"),
  ]),
  "出去": Object.freeze([
    reviewedAnalysis("出去", "default", "lex", "lexical_item", "lexical_item", "neutral exact-surface coverage; retain productive 出 + 去 segmentation by default", "ceot1 heoi3", "neutral_frequency_fallback_preserved"),
    reviewedAnalysis("出去", "motion_verb", "doing", "verb", "verb outward_motion_verb", "go out / leave", "ceot1 heoi3"),
    reviewedAnalysis("出去", "directional_function", "func", "function", "postverbal_directional_function", "outward directional function", "ceot1 heoi3"),
  ]),
  "唔記得": Object.freeze([
    reviewedAnalysis("唔記得", "default", "lex", "lexical_item", "lexical_item", "neutral exact-surface coverage; retain productive negation + 記得 segmentation by default", "m4 gei3 dak1", "neutral_frequency_fallback_preserved"),
    reviewedAnalysis("唔記得", "forget_verb", "doing", "verb", "verb cognition_memory_verb", "forget / not remember", "m4 gei3 dak1"),
  ]),
  "起": Object.freeze([
    reviewedAnalysis("起", "default", "doing", "verb", "verb rise_start_verb", "rise / start / set out", "hei2"),
    reviewedAnalysis("起", "inchoative_complement", "func", "function", "inchoative_or_complement_function", "inchoative / complement / start-point function", "hei2"),
    reviewedAnalysis("起", "instance_classifier", "measure_word", "classifier", "instance_case_classifier", "classifier for cases / instances", "hei2"),
  ]),
  "項": Object.freeze([
    reviewedAnalysis("項", "default", "measure_word", "classifier", "general_classifier item_classifier", "classifier for items / projects / clauses / sums", "hong6"),
    reviewedAnalysis("項", "noun", "what", "noun", "item_term_noun", "item / term", "hong6"),
  ]),
  "蚊": Object.freeze([
    reviewedAnalysis("蚊", "default", "what", "noun", "currency_unit", "dollar / buck", "man1"),
    reviewedAnalysis("蚊", "mosquito_noun", "what", "noun", "object_np animal_np", "mosquito", "man1"),
  ]),
  "印": Object.freeze([
    reviewedAnalysis("印", "default", "what", "noun", "object_np mark_or_artifact_np", "stamp / seal / mark", "jan3"),
    reviewedAnalysis("印", "print_verb", "doing", "verb", "verb print_stamp_verb", "print / stamp / impress", "jan3"),
    reviewedAnalysis("印", "india_bound", "func", "bound_morpheme", "proper_name_bound_abbreviation", "India abbreviation in formal compounds", "jan3"),
  ]),
  "直": Object.freeze([
    reviewedAnalysis("直", "default", "like", "adjective", "stative_predicate orientation_property", "straight / direct / upright", "zik6"),
    reviewedAnalysis("直", "adverb", "how", "adverb", "manner_or_continuative_adverb", "straight on / directly / continuously", "zik6"),
  ]),
  "嶺": Object.freeze([
    reviewedAnalysis("嶺", "default", "where", "noun", "natural_place_np ridge_np", "ridge / mountain range", "leng5"),
    reviewedAnalysis("嶺", "ling5_variant", "where", "noun", "natural_place_np ridge_np", "ridge / mountain range; literary/variant reading", "ling5"),
  ]),
  "入去": Object.freeze([
    reviewedAnalysis("入去", "default", "lex", "lexical_item", "lexical_item", "neutral exact-surface coverage; retain productive 入 + 去 segmentation by default", "jap6 heoi3", "neutral_frequency_fallback_preserved"),
    reviewedAnalysis("入去", "motion_verb", "doing", "verb", "verb inward_motion_verb", "enter / go inside", "jap6 heoi3"),
    reviewedAnalysis("入去", "directional_function", "func", "function", "postverbal_directional_function", "inward directional function", "jap6 heoi3"),
  ]),
  "掂": Object.freeze([
    reviewedAnalysis("掂", "default", "like", "adjective", "stative_predicate evaluative_property", "okay / satisfactory / capable / successful", "dim6"),
    reviewedAnalysis("掂", "dim3_touch_verb", "doing", "verb", "verb contact_verb", "touch", "dim3"),
    reviewedAnalysis("掂", "dim1_heft_verb", "doing", "verb", "verb weighing_estimation_verb", "heft / weigh / estimate weight", "dim1"),
  ]),
  "頂": Object.freeze([
    reviewedAnalysis("頂", "default", "doing", "verb", "verb support_endure_verb", "support / withstand / endure / substitute", "ding2"),
    reviewedAnalysis("頂", "ding2_interjection", "particle", "interjection", "interjection", "exclamation", "ding2"),
    reviewedAnalysis("頂", "deng2_noun", "what", "noun", "top_roof_noun", "top / roof", "deng2"),
    reviewedAnalysis("頂", "deng2_classifier", "measure_word", "classifier", "hat_classifier", "classifier for hats", "deng2"),
  ]),
  "裏邊": Object.freeze([
    reviewedAnalysis("裏邊", "default", "where", "noun", "spatial_localizer locality_np", "inside / interior", "leoi5 bin6"),
    reviewedAnalysis("裏邊", "localizer_function", "func", "function", "spatial_localizer_function", "inside / within", "leoi5 bin6"),
  ]),
  "讀書": Object.freeze([
    reviewedAnalysis("讀書", "default", "lex", "lexical_item", "lexical_item", "neutral exact-surface coverage; retain productive 讀 + 書 segmentation by default", "duk6 syu1", "neutral_frequency_fallback_preserved"),
    reviewedAnalysis("讀書", "study_verb", "doing", "verb", "verb study_read_verb", "study / read", "duk6 syu1"),
  ]),
  "件": Object.freeze([
    reviewedAnalysis("件", "default", "measure_word", "classifier", "classifier_clothing_item", "classifier for events / things / clothing", "gin6"),
    reviewedAnalysis("件", "noun", "what", "noun", "item_component_noun", "item / component", "gin6"),
  ]),
  "八": Object.freeze([
    reviewedAnalysis("八", "default", "how", "numeral", "quantity count_value numeral_eight", "eight", "baat3"),
    reviewedAnalysis("八", "gossip_verb", "doing", "verb", "verb slang_gossip_verb", "gossip / be nosy", "baat3"),
  ]),
  "重": Object.freeze([
    reviewedAnalysis("重", "default", "how", "adverb", "additive_continuative_adverb", "still / furthermore", "zung6"),
    reviewedAnalysis("重", "zung6_importance", "like", "adjective", "importance_or_seriousness_property", "important / weighty / serious", "zung6"),
    reviewedAnalysis("重", "cung4_repeat", "how", "adverb", "repeat_again_function", "repeat / again", "cung4"),
    reviewedAnalysis("重", "cung5_heavy", "like", "adjective", "stative_predicate weight_property", "heavy", "cung5"),
  ]),
  "將來": Object.freeze([
    reviewedAnalysis("將來", "default", "when", "noun", "future_time_np", "the future", "zoeng1 loi4"),
    reviewedAnalysis("將來", "temporal_adverb", "when", "adverb", "temporal_adjunct future_time_adverb", "in the future", "zoeng1 loi4"),
  ]),
  "斜": Object.freeze([
    reviewedAnalysis("斜", "default", "like", "adjective", "stative_predicate orientation_property", "slanted / oblique", "ce4"),
    reviewedAnalysis("斜", "ce3_variant", "like", "adjective", "stative_predicate orientation_property", "slanted / oblique; pronunciation variant", "ce3"),
  ]),
  "工作": Object.freeze([
    reviewedAnalysis("工作", "default", "what", "noun", "work_noun activity_noun", "work / job / task", "gung1 zok3"),
    reviewedAnalysis("工作", "verb", "doing", "verb", "verb work_verb", "work", "gung1 zok3"),
  ]),
});

function isNeutralFrequencyFallback(entry) {
  return Boolean(
    entry
      && entry.label === "lex"
      && entry.pos === "lexical_item"
      && entry.syntax === "lexical_item"
      && typeof entry.note === "string"
      && entry.note.includes("Exact surface retained as neutral lexical coverage")
  );
}

function applyReviewedEntries(entries) {
  if (!Array.isArray(entries)) throw new TypeError("reviewed lexical overlay requires an entry array");
  return entries.map(([surface, entry]) => {
    const promotion = PROMOTIONS[surface];
    if (!promotion || !isNeutralFrequencyFallback(entry)) return [surface, entry];
    if (BLOCKED_ATOMIC_SURFACES.has(surface) || CANDIDATE_ONLY_SURFACES.has(surface)) {
      throw new Error(`reviewed promotion unexpectedly targets protected neutral surface ${surface}`);
    }
    const pronunciationStatus = promotion.jyutping
      ? "reviewed_in_final_adjudication"
      : "inherited_runtime_candidate_not_independently_promoted";
    const promoted = {
      ...entry,
      label: promotion.label,
      pos: promotion.pos,
      syntax: promotion.syntax,
      senses: [{ gloss: promotion.gloss }],
      note: `Reviewed ranks 251–500 lexical adjudication: ${promotion.gloss}.`,
      provenance: {
        kind: "reviewed_lexical_promotion",
        source: SOURCE,
        pronunciation_status: pronunciationStatus,
      },
    };
    if (promotion.jyutping) promoted.jyutping = promotion.jyutping;
    return [surface, promoted];
  });
}

module.exports = Object.freeze({
  SOURCE,
  BLOCKED_ATOMIC_SURFACES,
  CANDIDATE_ONLY_SURFACES,
  PROMOTIONS,
  EXPLICIT_ANALYSES,
  isNeutralFrequencyFallback,
  applyReviewedEntries,
});
