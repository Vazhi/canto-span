"use strict";

const SOURCE = "GitHub issue #792 authoritative expert adjudication chain (final audit 5275934145 plus named later corrections)";

const PROTECTED_NEUTRAL_SURFACES = Object.freeze({
  "一個": "blocked_atomic",
  "係咪": "blocked_atomic",
  "哩": "research_required",
  "落去": "blocked_atomic",
  "穿過": "research_required",
  "兩個": "blocked_atomic",
  "上去": "blocked_atomic",
  "有個": "blocked_atomic",
  "唔到": "blocked_atomic",
  "第一": "blocked_atomic",
  "兜過": "blocked_atomic",
  "冇乜": "blocked_atomic",
  "出嚟": "blocked_atomic",
  "返去": "blocked_atomic",
});

const CANDIDATE_ONLY_SURFACES = new Set([
  "唔係",
  "喀",
  "真係",
  "咁樣",
  "噉樣",
  "個人",
  "哩個",
  "過去",
  "一樣",
  "唔見",
  "個位",
  "都會",
  "幾多",
]);

const NEUTRAL_READING_OVERRIDES = Object.freeze({
  "喀": "kaa1",
  "哩個": "ni1 go3",
  "個位": "go3 wai2",
  "幾多": "gei2 do1",
  "係咪": "hai6 mai6",
  "唔係": "m4 hai6",
});

const PROMOTIONS = Object.freeze({
  "哋": Object.freeze({ label: "func", pos: "function", syntax: "plural_suffix", gloss: "plural suffix for personal pronouns", jyutping: "dei6" }),
  "即": Object.freeze({ label: "func", pos: "function", syntax: "formal_connective discourse_linker", gloss: "formal connective / discourse linker", jyutping: "zik1" }),
  "誒": Object.freeze({ label: "particle", pos: "interjection", syntax: "interjection", gloss: "interjection / attention or reaction call", jyutping: "e6" }),
  "哦": Object.freeze({ label: "particle", pos: "interjection", syntax: "interjection", gloss: "acknowledgement interjection", jyutping: "o4" }),
  "兜": Object.freeze({ label: "doing", pos: "verb", syntax: "verb motion_or_solicit_verb", gloss: "go around / circle / solicit", jyutping: "dau1" }),
  "然": Object.freeze({ label: "func", pos: "bound", syntax: "bound_written_morpheme", gloss: "formal/bound thus/so/-ly morpheme", jyutping: "jin4" }),
  "嘛": Object.freeze({ label: "particle", pos: "particle", syntax: "sentence_final_particle", gloss: "modal/final particle", jyutping: "maa5" }),
  "嗯": Object.freeze({ label: "particle", pos: "interjection", syntax: "backchannel_interjection", gloss: "backchannel / acknowledgement interjection", jyutping: "m6" }),
  "方": Object.freeze({ label: "like", pos: "adjective", syntax: "stative_predicate shape_property", gloss: "square / rectangular", jyutping: "fong1" }),
  "嘩": Object.freeze({ label: "particle", pos: "interjection", syntax: "interjection", gloss: "wow / exclamatory interjection", jyutping: "waa3" }),
  "揾": Object.freeze({ label: "doing", pos: "verb", syntax: "verb find_verb", gloss: "find / search; orthographic variant of 搵", jyutping: "wan2" }),
  "埋": Object.freeze({ label: "doing", pos: "verb", syntax: "verb bury_hide_verb", gloss: "bury / hide", jyutping: "maai4" }),
  "裏": Object.freeze({ label: "where", pos: "noun", syntax: "spatial_localizer locality_np", gloss: "inside / interior localizer", jyutping: "leoi5" }),
  "而": Object.freeze({ label: "func", pos: "conjunction", syntax: "formal_linker conjunction", gloss: "formal conjunction/linker", jyutping: "ji4" }),
  "台": Object.freeze({ label: "what", pos: "noun", syntax: "platform_stage_noun", gloss: "platform / stage", jyutping: "toi4" }),
  "番": Object.freeze({ label: "measure_word", pos: "classifier", syntax: "event_iteration_classifier", gloss: "event/iteration classifier: a time / round", jyutping: "faan1" }),
  "比較": Object.freeze({ label: "doing", pos: "verb", syntax: "verb compare_verb", gloss: "compare", jyutping: "bei2 gaau3" }),
  "死": Object.freeze({ label: "doing", pos: "verb", syntax: "verb die_verb", gloss: "die", jyutping: "sei2" }),
  "右面": Object.freeze({ label: "where", pos: "noun", syntax: "spatial_localizer locality_np", gloss: "right side", jyutping: "jau6 min6" }),
  "左面": Object.freeze({ label: "where", pos: "noun", syntax: "spatial_localizer locality_np", gloss: "left side", jyutping: "zo2 min6" }),
  "成": Object.freeze({ label: "doing", pos: "verb", syntax: "verb success_completion_verb", gloss: "succeed / accomplish / become", jyutping: "sing4" }),
  "戀": Object.freeze({ label: "func", pos: "bound", syntax: "bound_formal_love_root", gloss: "formal/bound love or attachment root", jyutping: "lyun2" }),
});

const CORRECTIONS = Object.freeze({
  "時": Object.freeze({ label: "when", pos: "bound", syntax: "bound_temporal_root", gloss: "bound/formal temporal root", jyutping: "si4" }),
  "善": Object.freeze({ label: "like", pos: "bound", syntax: "bound_formal_evaluative_root", gloss: "formal/bound good/virtuous/skilled root", jyutping: "sin6" }),
  "港": Object.freeze({ label: "where", pos: "bound", syntax: "bound_place_root", gloss: "bound place root / Hong Kong abbreviation", jyutping: "gong2" }),
  "韻": Object.freeze({ label: "what", pos: "noun", syntax: "linguistic_term_np rhyme_noun", gloss: "rhyme / phonological rime", jyutping: "wan5" }),
  "廟": Object.freeze({ label: "where", pos: "noun", syntax: "place_np temple_noun", gloss: "temple / shrine", jyutping: "miu2" }),
});

function reviewedAnalysis(surface, key, label, pos, syntax, gloss, jyutping, kind = "reviewed_lexical_analysis") {
  return Object.freeze({
    id: `lex:${surface}:${key}`,
    label,
    pos,
    jyutping: jyutping || "",
    syntax,
    senses: Object.freeze([{ gloss }]),
    provenance: Object.freeze({ kind, source: SOURCE }),
  });
}

function neutralDefaultAnalysis(surface) {
  return reviewedAnalysis(surface, "default", "lex", "lexical_item", "lexical_item", "neutral exact-surface coverage; preserve productive/component segmentation by default", NEUTRAL_READING_OVERRIDES[surface] || "", "neutral_frequency_fallback_preserved");
}

const REVIEWED_ANALYSES = Object.freeze({
  "呢": Object.freeze([
    reviewedAnalysis("呢", "default", "func", "determiner", "demonstrative_determiner", "this; demonstrative before a classifier", "ni1"),
    reviewedAnalysis("呢", "sentence_final_particle", "particle", "particle", "sentence_final_particle thematic_question_particle", "thematic/question particle", "ne1"),
  ]),
  "嘅": Object.freeze([
    reviewedAnalysis("嘅", "default", "func", "function", "genitive_modifier_linker", "genitive/attributive linker", "ge3"),
    reviewedAnalysis("嘅", "nominalizer", "func", "function", "nominalizer headless_modifier_marker", "nominalizer / headless modifier marker", "ge3"),
    reviewedAnalysis("嘅", "sentence_final_particle", "particle", "particle", "sentence_final_particle", "sentence-final assertion particle", "ge3"),
  ]),
  "就": Object.freeze([
    reviewedAnalysis("就", "default", "how", "adverb", "focus_sequence_adverb", "then / just / exactly / already", "zau6"),
    reviewedAnalysis("就", "conjunction", "func", "conjunction", "clause_linker", "then / in that case / as soon as", "zau6"),
    reviewedAnalysis("就", "accommodate_verb", "doing", "verb", "verb accommodate_yield_verb", "accommodate / yield / suit", "zau6"),
    reviewedAnalysis("就", "relational", "func", "preposition", "relational_preposition", "regarding / in light of", "zau6"),
    reviewedAnalysis("就", "bound", "func", "bound", "bound_morpheme", "bound/formal 就 family", "zau6"),
  ]),
  "咁": Object.freeze([
    reviewedAnalysis("咁", "default", "how", "adverb", "manner_demonstrative_adverb", "so / like that / in that way", "gam2"),
    reviewedAnalysis("咁", "degree", "how", "adverb", "degree_adverb", "so / to such a degree", "gam3"),
  ]),
  "好": Object.freeze([
    reviewedAnalysis("好", "default", "like", "adjective", "stative_predicate evaluative_property", "good / fine", "hou2"),
    reviewedAnalysis("好", "degree", "how", "adverb", "degree_adverb", "very / quite", "hou2"),
    reviewedAnalysis("好", "like_verb", "doing", "verb", "verb preference_verb", "like / be fond of", "hou3"),
  ]),
  "啲": Object.freeze([
    reviewedAnalysis("啲", "default", "how", "quantifier", "quantity_quantifier", "some / a few", "di1"),
    reviewedAnalysis("啲", "degree", "how", "function", "comparative_degree_function", "a little more / comparative degree", "di1"),
  ]),
  "喺": Object.freeze([
    reviewedAnalysis("喺", "default", "func", "preposition", "locative_coverb", "at / in / on", "hai2"),
    reviewedAnalysis("喺", "locative_predicate", "where", "verb", "locative_predicate", "be located at", "hai2"),
  ]),
  "去": Object.freeze([
    reviewedAnalysis("去", "default", "doing", "verb", "verb motion_verb", "go", "heoi3"),
    reviewedAnalysis("去", "directional", "func", "function", "directional_complement", "away / thither directional", "heoi3"),
  ]),
  "到": Object.freeze([
    reviewedAnalysis("到", "default", "doing", "verb", "verb arrival_verb", "arrive / reach", "dou3"),
    reviewedAnalysis("到", "relation", "func", "preposition", "goal_relation", "to / until", "dou3"),
    reviewedAnalysis("到", "resultative", "func", "function", "result_complement", "result/extent complement", "dou2"),
    reviewedAnalysis("到", "approx", "how", "function", "approximation_function", "approximately / up to", "dou2"),
  ]),
  "哋": Object.freeze([
    reviewedAnalysis("哋", "default", "func", "function", "plural_suffix", "plural suffix for personal pronouns", "dei6"),
    reviewedAnalysis("哋", "attenuative", "func", "function", "attenuative_suffix", "attenuative/collective suffix", "dei2"),
  ]),
  "話": Object.freeze([
    reviewedAnalysis("話", "default", "doing", "verb", "verb speech_verb", "say / tell / opine", "waa6"),
    reviewedAnalysis("話", "noun_waa2", "what", "noun", "speech_words_noun", "speech / words", "waa2"),
    reviewedAnalysis("話", "noun_waa6", "what", "noun", "speech_words_noun", "speech / words", "waa6"),
  ]),
  "跟住": Object.freeze([
    reviewedAnalysis("跟住", "default", "func", "function", "sequence_connector discourse_marker", "then / next / following that", "gan1 zyu6"),
    reviewedAnalysis("跟住", "verb", "doing", "verb", "verb follow_continue_verb", "follow / continue following", "gan1 zyu6"),
  ]),
  "會": Object.freeze([
    reviewedAnalysis("會", "default", "func", "function", "modal_future_or_capability", "will / can / know how", "wui5"),
    reviewedAnalysis("會", "meeting_noun", "what", "noun", "meeting_association_noun", "meeting / association", "wui6"),
    reviewedAnalysis("會", "assemble_verb", "doing", "verb", "verb assemble_meet_verb", "assemble / meet", "wui6"),
  ]),
  "要": Object.freeze([
    reviewedAnalysis("要", "default", "doing", "verb", "verb want_need_verb", "want / need / demand", "jiu3"),
    reviewedAnalysis("要", "modal", "func", "function", "modal_necessity_or_future", "must / need to / will", "jiu3"),
  ]),
  "喀": Object.freeze([
    reviewedAnalysis("喀", "haak3_retch", "particle", "interjection", "onomatopoeic_interjection", "retch / vomiting sound", "haak3"),
    reviewedAnalysis("喀", "kaa1_sound", "particle", "interjection", "onomatopoeic_interjection", "click / crack / laugh sound", "kaa1"),
    reviewedAnalysis("喀", "kaa3_transliteration", "func", "bound", "transliteration_onomatopoeic_character", "transliteration / onomatopoeic character reading", "kaa3"),
    reviewedAnalysis("喀", "kak1_bound", "func", "bound", "restricted_historical_bound_reading", "restricted historical/bound use", "kak1"),
  ]),
  "一": Object.freeze([
    reviewedAnalysis("一", "default", "how", "numeral", "quantity numeral_one", "one", "jat1"),
    reviewedAnalysis("一", "conjunction", "func", "conjunction", "once_as_soon_as_linker", "once / as soon as", "jat1"),
    reviewedAnalysis("一", "reduplication_affix", "func", "bound", "reduplication_affix", "bound affix/infix in reduplicative patterns", "jat1"),
  ]),
  "喎": Object.freeze([
    reviewedAnalysis("喎", "default", "particle", "particle", "sentence_final_particle", "reportative / hearsay particle", "wo3"),
    reviewedAnalysis("喎", "wo5_particle", "particle", "particle", "sentence_final_particle", "marked final-particle family", "wo5"),
    reviewedAnalysis("喎", "wo4_particle", "particle", "particle", "sentence_final_particle", "marked final-particle family", "wo4"),
    reviewedAnalysis("喎", "wo5_failed", "like", "adjective", "stative_predicate", "failed / ruined", "wo5"),
  ]),
  "㗎": Object.freeze([
    reviewedAnalysis("㗎", "default", "particle", "particle", "sentence_final_particle", "sentence-final particle", "gaa3"),
    reviewedAnalysis("㗎", "gaa4_particle", "particle", "particle", "sentence_final_particle", "sentence-final particle variant", "gaa4"),
  ]),
  "度": Object.freeze([
    reviewedAnalysis("度", "default", "what", "noun", "degree_measure_noun", "degree / measure", "dou6"),
    reviewedAnalysis("度", "locative", "where", "function", "locative_bound_function", "place / locality bound function", "dou6"),
    reviewedAnalysis("度", "measure_verb", "doing", "verb", "verb measure_estimate_verb", "measure / estimate", "dok6"),
    reviewedAnalysis("度", "textile_noun", "what", "noun", "textile_length_noun", "textile-length unit/use", "dou2"),
  ]),
  "得": Object.freeze([
    reviewedAnalysis("得", "default", "doing", "verb", "verb obtain_possible_verb", "get / obtain / be possible", "dak1"),
    reviewedAnalysis("得", "modal", "func", "function", "modal_permission_ability", "may / can / be allowed", "dak1"),
    reviewedAnalysis("得", "postverbal", "func", "particle", "postverbal_complement_marker", "postverbal complement / structural marker", "dak1"),
  ]),
  "上": Object.freeze([
    reviewedAnalysis("上", "default", "doing", "verb", "verb upward_motion_verb", "go up / get on", "soeng5"),
    reviewedAnalysis("上", "localizer", "where", "noun", "spatial_localizer upper_location", "up / above / upper", "soeng6"),
  ]),
  "因為": Object.freeze([
    reviewedAnalysis("因為", "default", "func", "conjunction", "causal_clause_linker", "because", "jan1 wai6"),
    reviewedAnalysis("因為", "coverb", "func", "preposition", "causal_coverb", "because of / due to", "jan1 wai6"),
  ]),
  "下": Object.freeze([
    reviewedAnalysis("下", "default", "where", "noun", "spatial_localizer lower_location", "below / under", "haa6"),
    reviewedAnalysis("下", "event_classifier", "measure_word", "classifier", "event_classifier", "a time / brief event classifier", "haa5"),
    reviewedAnalysis("下", "postverbal_suffix", "func", "particle", "postverbal_delimitative_suffix", "delimitative/continuative postverbal suffix", "haa5"),
  ]),
  "囉": Object.freeze([
    reviewedAnalysis("囉", "default", "particle", "particle", "sentence_final_particle", "sentence-final particle", "lo1"),
    reviewedAnalysis("囉", "lo4_particle", "particle", "particle", "sentence_final_particle", "sentence-final particle variant", "lo4"),
  ]),
  "咩": Object.freeze([
    reviewedAnalysis("咩", "default", "func", "pronoun", "wh_pronoun_or_determiner", "what / which", "me1"),
    reviewedAnalysis("咩", "sentence_final_particle", "particle", "particle", "sentence_final_particle interrogative_surprise", "interrogative / surprise final particle", "me1"),
  ]),
  "嚟": Object.freeze([
    reviewedAnalysis("嚟", "default", "doing", "verb", "verb motion_verb", "come / bring", "lai4"),
    reviewedAnalysis("嚟", "lei4_verb", "doing", "verb", "verb motion_verb", "come / bring; pronunciation variant", "lei4"),
    reviewedAnalysis("嚟", "grammaticalized", "func", "function", "copular_emphatic_or_recent_event_function", "grammaticalized copular/emphatic/recent-event function", "lai4"),
  ]),
  "哦": Object.freeze([
    reviewedAnalysis("哦", "default", "particle", "interjection", "acknowledgement_interjection", "acknowledgement", "o4"),
    reviewedAnalysis("哦", "realization_particle", "particle", "particle", "realization_particle", "realization / recognition", "o5"),
    reviewedAnalysis("哦", "aha_particle", "particle", "particle", "aha_rule_breaking_particle", "aha / realization / rule-breaking reaction", "o3"),
    reviewedAnalysis("哦", "surprise", "particle", "interjection", "surprise_interjection", "surprise", "o2"),
    reviewedAnalysis("哦", "nag_verb", "doing", "verb", "verb nag_verb", "nag / chant", "ngo4"),
  ]),
  "吓": Object.freeze([
    reviewedAnalysis("吓", "default", "particle", "interjection", "interjection", "huh? / what?", "haa2"),
    reviewedAnalysis("吓", "final_particle", "particle", "particle", "sentence_final_particle", "confirmation/final particle", "haa2"),
    reviewedAnalysis("吓", "postverbal_suffix", "func", "particle", "postverbal_delimitative_suffix", "postverbal aspectual/delimitative suffix", "haa5"),
  ]),
  "咪": Object.freeze([
    reviewedAnalysis("咪", "prohibitive_marker", "func", "function", "prohibitive_marker", "don't; prohibitive marker", "mai5", "existing_runtime_contextual_override"),
    reviewedAnalysis("咪", "discourse_focus_marker", "func", "function", "discourse_focus_marker", "discourse / focus marker", "mai6", "existing_runtime_contextual_override"),
    reviewedAnalysis("咪", "study_verb", "doing", "verb", "verb study_cram_verb", "study / cram", "mai1"),
  ]),
  "同": Object.freeze([
    reviewedAnalysis("同", "default", "like", "adjective", "same_property", "same", "tung4"),
    reviewedAnalysis("同", "relation", "func", "preposition", "co_participant_relation", "with / to / for", "tung4"),
    reviewedAnalysis("同", "conjunction", "func", "conjunction", "coordination_linker", "and / with", "tung4"),
  ]),
  "好似": Object.freeze([
    reviewedAnalysis("好似", "default", "doing", "verb", "verb resemblance_predicate", "resemble / be like", "hou2 ci5"),
    reviewedAnalysis("好似", "adverb", "how", "adverb", "epistemic_resemblance_adverb", "apparently / seemingly", "hou2 ci5"),
    reviewedAnalysis("好似", "conjunction", "func", "conjunction", "comparison_linker", "such as / like", "hou2 ci5"),
  ]),
  "可能": Object.freeze([
    reviewedAnalysis("可能", "default", "how", "adverb", "epistemic_adverb", "possibly / probably", "ho2 nang4"),
    reviewedAnalysis("可能", "noun", "what", "noun", "possibility_noun", "possibility", "ho2 nang4"),
  ]),
  "來": Object.freeze([
    reviewedAnalysis("來", "default", "doing", "verb", "verb motion_verb", "come", "lai4"),
    reviewedAnalysis("來", "lei4_verb", "doing", "verb", "verb motion_verb", "come; pronunciation variant", "lei4"),
    reviewedAnalysis("來", "grammaticalized", "func", "function", "grammaticalized_motion_function", "grammaticalized directional/copular function", "lai4"),
    reviewedAnalysis("來", "loi4_bound", "func", "bound", "written_bound_reading", "written/bound reading", "loi4"),
  ]),
  "經過": Object.freeze([
    reviewedAnalysis("經過", "default", "doing", "verb", "verb motion_path_verb", "pass / go through", "ging1 gwo3"),
    reviewedAnalysis("經過", "noun", "what", "noun", "process_course_noun", "process / course", "ging1 gwo3"),
  ]),
  "時": Object.freeze([
    reviewedAnalysis("時", "default", "when", "bound", "bound_temporal_root", "bound/formal temporal root", "si4"),
    reviewedAnalysis("時", "conjunction", "func", "conjunction", "temporal_correlative_linker", "when / at times in 時…時… and written linking", "si4"),
    reviewedAnalysis("時", "classifier", "measure_word", "classifier", "written_time_classifier", "written classifier/o'clock use", "si4"),
  ]),
  "邊": Object.freeze([
    reviewedAnalysis("邊", "default", "func", "determiner", "wh_determiner", "which / where", "bin1"),
    reviewedAnalysis("邊", "locality_bin1", "where", "noun", "spatial_localizer side_edge", "side / edge", "bin1"),
    reviewedAnalysis("邊", "locality_bin6", "where", "noun", "restricted_positional_localizer", "restricted/contextual positional side reading", "bin6"),
  ]),
  "或者": Object.freeze([
    reviewedAnalysis("或者", "default", "func", "conjunction", "alternative_linker", "or", "waak6 ze2"),
    reviewedAnalysis("或者", "adverb", "how", "adverb", "epistemic_adverb", "perhaps / maybe", "waak6 ze2"),
  ]),
  "唔好": Object.freeze([
    reviewedAnalysis("唔好", "default", "func", "function", "prohibitive_modal", "don't / should not", "m4 hou2"),
    reviewedAnalysis("唔好", "not_good", "like", "adjective", "negated_stative_predicate", "not good", "m4 hou2"),
  ]),
  "俾": Object.freeze([
    reviewedAnalysis("俾", "default", "doing", "verb", "verb give_allow_verb", "give / allow", "bei2"),
    reviewedAnalysis("俾", "passive_agent", "func", "function", "passive_agent_introducer", "passive / agent-introducing function", "bei2"),
  ]),
  "少少": Object.freeze([
    reviewedAnalysis("少少", "default", "like", "adjective", "quantificational_property", "a little / a few", "siu2 siu2"),
    reviewedAnalysis("少少", "degree", "how", "adverb", "degree_adverb", "slightly / a little", "siu2 siu2"),
  ]),
  "面": Object.freeze([
    reviewedAnalysis("面", "default", "what", "noun", "face_surface_noun", "face / reputation / plane", "min2"),
    reviewedAnalysis("面", "side_location", "where", "noun", "side_location_noun", "side / aspect / location", "min6"),
    reviewedAnalysis("面", "classifier", "measure_word", "classifier", "surface_side_classifier", "classifier for sides/surfaces", "min6"),
  ]),
  "幾": Object.freeze([
    reviewedAnalysis("幾", "default", "func", "quantifier", "wh_quantity_quantifier", "how many / several", "gei2"),
    reviewedAnalysis("幾", "degree", "how", "adverb", "degree_adverb", "how / quite", "gei2"),
  ]),
  "畀": Object.freeze([
    reviewedAnalysis("畀", "default", "doing", "verb", "verb give_allow_verb", "give / allow", "bei2"),
    reviewedAnalysis("畀", "passive_agent", "func", "function", "passive_agent_introducer", "passive / agent-introducing function", "bei2"),
  ]),
  "過": Object.freeze([
    reviewedAnalysis("過", "default", "doing", "verb", "verb cross_pass_verb", "cross / pass / spend", "gwo3"),
    reviewedAnalysis("過", "experiential", "func", "particle", "experiential_aspect_marker", "experiential aspect marker", "gwo3"),
    reviewedAnalysis("過", "degree", "func", "function", "degree_excessive_function", "too / excessive / degree function", "gwo3"),
  ]),
  "聽": Object.freeze([
    reviewedAnalysis("聽", "default", "doing", "verb", "verb hear_listen_verb", "hear / listen", "teng1"),
    reviewedAnalysis("聽", "ting3_bound", "func", "bound", "bound_reading", "bound/register-specific reading", "ting3"),
    reviewedAnalysis("聽", "ting3_wait", "doing", "verb", "verb wait_for_inevitable_verb", "wait for an inevitable outcome", "ting3"),
    reviewedAnalysis("聽", "ting1_temporal", "func", "bound", "temporal_prefix", "temporal prefix reading", "ting1"),
  ]),
  "返": Object.freeze([
    reviewedAnalysis("返", "default", "doing", "verb", "verb return_affiliated_place_verb", "return / go to one's regular or affiliated place", "faan1"),
    reviewedAnalysis("返", "restitutive", "func", "function", "postverbal_restitutive_function", "back / again / restitutive-repetitive function", "faan1"),
    reviewedAnalysis("返", "faan2_bound", "func", "bound", "written_bound_reading", "written/bound return reading", "faan2"),
  ]),
  "嗯": Object.freeze([
    reviewedAnalysis("嗯", "default", "particle", "interjection", "backchannel_interjection", "mm / yes / okay", "m6"),
    reviewedAnalysis("嗯", "m3_backchannel", "particle", "interjection", "backchannel_interjection", "acknowledgement/backchannel variant", "m3"),
    reviewedAnalysis("嗯", "m2_uncertainty", "particle", "interjection", "uncertainty_interjection", "uncertainty / hesitation", "m2"),
  ]),
  "對": Object.freeze([
    reviewedAnalysis("對", "default", "func", "preposition", "relational_coverb", "toward / to", "deoi3"),
    reviewedAnalysis("對", "verb", "doing", "verb", "verb face_answer_verb", "face / answer / match", "deoi3"),
    reviewedAnalysis("對", "classifier", "measure_word", "classifier", "pair_classifier", "pair / set classifier", "deoi3"),
    reviewedAnalysis("對", "property", "like", "adjective", "correct_right_property", "correct / right", "deoi3"),
  ]),
  "方": Object.freeze([
    reviewedAnalysis("方", "default", "like", "adjective", "shape_property", "square", "fong1"),
    reviewedAnalysis("方", "prescription_noun", "what", "noun", "prescription_method_noun", "prescription / formula / method", "fong1"),
    reviewedAnalysis("方", "side_bound", "func", "bound", "side_party_bound_root", "side / party / direction bound root", "fong1"),
    reviewedAnalysis("方", "formal_adverb", "how", "adverb", "formal_only_then_adverb", "only then", "fong1"),
    reviewedAnalysis("方", "surname", "who", "proper_noun", "surname", "surname Fang", "fong1"),
  ]),
  "喂": Object.freeze([
    reviewedAnalysis("喂", "default", "particle", "interjection", "attention_call_interjection", "hello / hey", "wai3"),
    reviewedAnalysis("喂", "feed_verb", "doing", "verb", "verb feed_verb", "feed", "wai3"),
  ]),
  "不過": Object.freeze([
    reviewedAnalysis("不過", "default", "func", "conjunction", "adversative_linker", "but / however", "bat1 gwo3"),
    reviewedAnalysis("不過", "restrictive_adverb", "how", "adverb", "restrictive_adverb", "only / merely", "bat1 gwo3"),
  ]),
  "樣": Object.freeze([
    reviewedAnalysis("樣", "default", "what", "noun", "appearance_form_noun", "appearance / form", "joeng2"),
    reviewedAnalysis("樣", "classifier", "measure_word", "classifier", "kind_type_classifier", "kind / type classifier", "joeng6"),
  ]),
  "嘩": Object.freeze([
    reviewedAnalysis("嘩", "default", "particle", "interjection", "interjection", "wow", "waa3"),
    reviewedAnalysis("嘩", "waa1_bound", "func", "bound", "hubbub_noise_bound_root", "hubbub / noise bound family", "waa1"),
  ]),
  "個人": Object.freeze([
    reviewedAnalysis("個人", "noun", "who", "noun", "individual_person_noun", "individual / person", "go3 jan4"),
    reviewedAnalysis("個人", "personal_property", "like", "adjective", "personal_individual_modifier", "personal / individual", "go3 jan4"),
  ]),
  "哩個": Object.freeze([
    reviewedAnalysis("哩個", "pronoun", "who", "pronoun", "demonstrative_pronoun", "this / this one; orthographic alias of 呢個", "ni1 go3"),
    reviewedAnalysis("哩個", "determiner", "func", "determiner", "demonstrative_determiner", "this; demonstrative determiner alias of 呢個", "ni1 go3"),
  ]),
  "間": Object.freeze([
    reviewedAnalysis("間", "default", "measure_word", "classifier", "classifier_building_shop", "classifier for rooms/buildings", "gaan1"),
    reviewedAnalysis("間", "gaan3_verb", "doing", "verb", "verb divide_partition_verb", "draw/divide/partition", "gaan3"),
    reviewedAnalysis("間", "gaan3_classifier", "measure_word", "classifier", "architectural_bay_classifier", "architectural bay classifier", "gaan3"),
    reviewedAnalysis("間", "gaan3_noun", "what", "noun", "stripe_noun", "stripe", "gaan3"),
  ]),
  "啱": Object.freeze([
    reviewedAnalysis("啱", "default", "like", "adjective", "correct_suitable_property", "correct / suitable", "aam1"),
    reviewedAnalysis("啱", "ngaam1_property", "like", "adjective", "correct_suitable_property", "correct / suitable; initial-ng variant", "ngaam1"),
    reviewedAnalysis("啱", "fit_verb", "doing", "verb", "verb fit_suit_verb", "fit / suit", "aam1"),
    reviewedAnalysis("啱", "just_adverb", "when", "adverb", "temporal_exactness_adverb", "just now / exactly", "aam1"),
  ]),
  "落": Object.freeze([
    reviewedAnalysis("落", "default", "doing", "verb", "verb downward_motion_verb", "go down / fall", "lok6"),
    reviewedAnalysis("落", "directional", "func", "function", "directional_result_complement", "downward directional/result complement", "lok6"),
  ]),
  "埋": Object.freeze([
    reviewedAnalysis("埋", "default", "doing", "verb", "verb bury_hide_verb", "bury / hide", "maai4"),
    reviewedAnalysis("埋", "suffix", "func", "function", "postverbal_inclusion_addition_suffix", "inclusion/addition postverbal suffix", "maai4"),
    reviewedAnalysis("埋", "property", "like", "adjective", "close_intimate_property", "close / intimate", "maai4"),
  ]),
  "一定": Object.freeze([
    reviewedAnalysis("一定", "default", "how", "adverb", "modal_epistemic_adverb", "certainly / must", "jat1 ding6"),
    reviewedAnalysis("一定", "property", "like", "adjective", "fixed_given_property", "certain / fixed / given", "jat1 ding6"),
  ]),
  "成日": Object.freeze([
    reviewedAnalysis("成日", "default", "when", "adverb", "temporal_frequency_adverb", "all day / always", "seng4 jat6"),
    reviewedAnalysis("成日", "sing4_variant", "when", "adverb", "temporal_frequency_adverb", "all day / always; pronunciation variant", "sing4 jat6"),
  ]),
  "點": Object.freeze([
    reviewedAnalysis("點", "default", "func", "pronoun", "wh_manner_pronoun", "how", "dim2"),
    reviewedAnalysis("點", "verb", "doing", "verb", "verb point_count_order_verb", "point / count / order / indicate", "dim2"),
    reviewedAnalysis("點", "noun", "what", "noun", "point_dot_degree_noun", "point / dot / degree", "dim2"),
    reviewedAnalysis("點", "time_classifier", "measure_word", "classifier", "time_oclock_classifier", "o'clock / time classifier", "dim2"),
  ]),
  "塔": Object.freeze([
    reviewedAnalysis("塔", "default", "what", "noun", "tower_pagoda_noun", "tower / pagoda", "taap3"),
    reviewedAnalysis("塔", "lock_verb", "doing", "verb", "verb lock_handcuff_verb", "lock / handcuff", "taap3"),
    reviewedAnalysis("塔", "lock_noun", "what", "noun", "lock_noun", "lock", "taap3"),
  ]),
  "錢": Object.freeze([
    reviewedAnalysis("錢", "default", "what", "noun", "money_noun", "money / coin", "cin2"),
    reviewedAnalysis("錢", "surname", "who", "proper_noun", "surname", "surname reading", "cin4"),
  ]),
  "用": Object.freeze([
    reviewedAnalysis("用", "default", "doing", "verb", "verb use_verb", "use", "jung6"),
    reviewedAnalysis("用", "instrumental", "func", "preposition", "instrumental_coverb", "with / by means of", "jung6"),
  ]),
  "過去": Object.freeze([
    reviewedAnalysis("過去", "motion_verb", "doing", "verb", "verb motion_pass_verb", "pass / go over", "gwo3 heoi3"),
    reviewedAnalysis("過去", "past_noun", "when", "noun", "past_time_np", "the past", "gwo3 heoi3"),
    reviewedAnalysis("過去", "past_adverb", "when", "adverb", "past_time_adverb", "formerly / in the past", "gwo3 heoi3"),
  ]),
  "叫做": Object.freeze([
    reviewedAnalysis("叫做", "default", "doing", "verb", "verb naming_copular_verb", "be called / be known as", "giu3 zou6"),
    reviewedAnalysis("叫做", "approx_adverb", "how", "adverb", "approximation_evaluation_adverb", "sort of / quite / can be considered", "giu3 zou6"),
  ]),
  "右邊": Object.freeze([
    reviewedAnalysis("右邊", "default", "where", "noun", "spatial_localizer locality_np", "right side", "jau6 bin1"),
    reviewedAnalysis("右邊", "bin6_variant", "where", "noun", "spatial_localizer locality_np", "right side; localizer reading variant", "jau6 bin6"),
  ]),
  "一樣": Object.freeze([
    reviewedAnalysis("一樣", "property", "like", "adjective", "equative_same_property", "same / alike", "jat1 joeng6"),
    reviewedAnalysis("一樣", "adverb", "how", "adverb", "equative_adverb", "in the same way / likewise", "jat1 joeng6"),
  ]),
  "香": Object.freeze([
    reviewedAnalysis("香", "default", "like", "adjective", "fragrance_property", "fragrant / appetizing", "hoeng1"),
    reviewedAnalysis("香", "noun", "what", "noun", "incense_fragrance_noun", "incense / perfume / fragrance", "hoeng1"),
  ]),
  "緊": Object.freeze([
    reviewedAnalysis("緊", "default", "like", "adjective", "tight_urgent_property", "tight / urgent", "gan2"),
    reviewedAnalysis("緊", "progressive", "func", "particle", "progressive_durative_marker", "progressive/durative aspect marker", "gan2"),
  ]),
  "三": Object.freeze([
    reviewedAnalysis("三", "default", "how", "numeral", "quantity numeral_three", "three", "saam1"),
    reviewedAnalysis("三", "saam3_bound", "func", "bound", "bound_lexicalized_reading", "bound/lexicalized reading only", "saam3"),
  ]),
  "張": Object.freeze([
    reviewedAnalysis("張", "default", "measure_word", "classifier", "flat_object_classifier", "classifier for flat objects/furniture", "zoeng1"),
    reviewedAnalysis("張", "surname", "who", "proper_noun", "surname", "surname Cheung/Zhang", "zoeng1"),
  ]),
  "由": Object.freeze([
    reviewedAnalysis("由", "default", "func", "preposition", "source_cause_coverb", "from / by / because of", "jau4"),
    reviewedAnalysis("由", "verb_function", "doing", "verb", "verb leave_to_determine_verb", "be up to / leave to / allow to be determined by", "jau4"),
  ]),
  "識": Object.freeze([
    reviewedAnalysis("識", "default", "doing", "verb", "verb cognition_acquaintance_verb", "know / recognize / be acquainted with", "sik1"),
    reviewedAnalysis("識", "skill", "func", "function", "skill_ability_function", "know how to / can", "sik1"),
  ]),
  "畫": Object.freeze([
    reviewedAnalysis("畫", "default", "doing", "verb", "verb draw_paint_verb", "draw / paint", "waak6"),
    reviewedAnalysis("畫", "noun", "what", "noun", "picture_drawing_noun", "picture / drawing / painting", "waa2"),
  ]),
  "左邊": Object.freeze([
    reviewedAnalysis("左邊", "default", "where", "noun", "spatial_localizer locality_np", "left side", "zo2 bin1"),
    reviewedAnalysis("左邊", "bin6_variant", "where", "noun", "spatial_localizer locality_np", "left side; localizer reading variant", "zo2 bin6"),
  ]),
  "善": Object.freeze([
    reviewedAnalysis("善", "default", "like", "bound", "bound_formal_evaluative_root", "formal/bound good/virtuous/skilled root", "sin6"),
  ]),
  "港": Object.freeze([
    reviewedAnalysis("港", "default", "where", "bound", "bound_place_root", "bound place root", "gong2"),
    reviewedAnalysis("港", "hong_kong_abbrev", "where", "proper_noun", "hong_kong_abbreviation", "Hong Kong abbreviation", "gong2"),
  ]),
  "場": Object.freeze([
    reviewedAnalysis("場", "default", "measure_word", "classifier", "event_activity_classifier", "classifier for events/activities", "coeng4"),
    reviewedAnalysis("場", "noun", "where", "noun", "site_venue_field_noun", "site / venue / field", "coeng4"),
  ]),
  "台": Object.freeze([
    reviewedAnalysis("台", "default", "what", "noun", "platform_stage_noun", "platform / stage", "toi4"),
    reviewedAnalysis("台", "classifier", "measure_word", "classifier", "machine_performance_classifier", "classifier for machines/equipment/performances", "toi4"),
    reviewedAnalysis("台", "taiwan_bound", "where", "proper_noun", "taiwan_abbreviation", "Taiwan abbreviation", "toi4"),
  ]),
  "番": Object.freeze([
    reviewedAnalysis("番", "default", "measure_word", "classifier", "event_iteration_classifier", "a time / round", "faan1"),
    reviewedAnalysis("番", "foreign_bound", "func", "bound", "foreign_non_chinese_bound_root", "foreign / non-Chinese bound morpheme", "faan1"),
  ]),
  "唔見": Object.freeze([
    reviewedAnalysis("唔見", "missing_verb", "doing", "verb", "verb missing_lost_verb", "be missing / lost / disappear from view", "m4 gin3"),
  ]),
  "正": Object.freeze([
    reviewedAnalysis("正", "default", "like", "adjective", "correct_main_property", "correct / proper / positive / main", "zing3"),
    reviewedAnalysis("正", "zing3_adverb", "how", "adverb", "exactness_adverb", "just / exactly", "zing3"),
    reviewedAnalysis("正", "zeng3_property", "like", "adjective", "excellent_property", "great / excellent", "zeng3"),
    reviewedAnalysis("正", "zing1_bound", "func", "bound", "formal_bound_reading", "formal/bound reading as in 正月", "zing1"),
  ]),
  "個位": Object.freeze([
    reviewedAnalysis("個位", "math_noun", "what", "noun", "mathematical_units_place_noun", "units / ones place", "go3 wai2"),
  ]),
  "比較": Object.freeze([
    reviewedAnalysis("比較", "default", "doing", "verb", "verb compare_verb", "compare", "bei2 gaau3"),
    reviewedAnalysis("比較", "adverb", "how", "adverb", "comparative_degree_adverb", "comparatively / relatively / rather", "bei2 gaau3"),
    reviewedAnalysis("比較", "noun", "what", "noun", "comparison_noun", "comparison", "bei2 gaau3"),
  ]),
  "紙": Object.freeze([
    reviewedAnalysis("紙", "default", "what", "noun", "paper_noun", "paper", "zi2"),
    reviewedAnalysis("紙", "classifier", "measure_word", "classifier", "document_letter_classifier", "formal classifier for documents/letters", "zi2"),
  ]),
  "交叉": Object.freeze([
    reviewedAnalysis("交叉", "default", "what", "noun", "intersection_crossing_noun", "intersection / crossing", "gaau1 caa1"),
    reviewedAnalysis("交叉", "verb", "doing", "verb", "verb cross_intersect_verb", "cross / intersect", "gaau1 caa1"),
  ]),
  "死": Object.freeze([
    reviewedAnalysis("死", "default", "doing", "verb", "verb die_verb", "die", "sei2"),
    reviewedAnalysis("死", "property", "like", "adjective", "dead_rigid_property", "dead / rigid / inflexible", "sei2"),
    reviewedAnalysis("死", "intensifier", "how", "function", "bound_intensifier", "damned / extremely; intensifying bound function", "sei2"),
  ]),
  "年": Object.freeze([
    reviewedAnalysis("年", "default", "when", "noun", "year_noun", "year", "nin4"),
    reviewedAnalysis("年", "classifier", "measure_word", "classifier", "temporal_measure_classifier", "year as temporal measure/classifier", "nin4"),
  ]),
  "韻": Object.freeze([
    reviewedAnalysis("韻", "default", "what", "noun", "linguistic_term_np rhyme_noun", "rhyme / phonological rime", "wan5"),
    reviewedAnalysis("韻", "wan6_bound", "func", "bound", "formal_bound_reading", "formal/original bound reading", "wan6"),
  ]),
  "驚": Object.freeze([
    reviewedAnalysis("驚", "default", "like", "verb", "cognition_stative_verb", "fear / be afraid / worry", "geng1"),
    reviewedAnalysis("驚", "ging1_bound", "func", "bound", "shock_surprise_bound_root", "shock / surprise formal/bound family", "ging1"),
    reviewedAnalysis("驚", "game_noun", "what", "noun", "slang_game_noun", "game; slang noun", "geng1"),
  ]),
  "日": Object.freeze([
    reviewedAnalysis("日", "default", "when", "noun", "day_noun", "day / date", "jat6"),
    reviewedAnalysis("日", "classifier", "measure_word", "classifier", "temporal_measure_classifier", "day as temporal measure/classifier", "jat6"),
    reviewedAnalysis("日", "japan_bound", "where", "bound", "japan_abbreviation", "Japan abbreviation/bound use", "jat6"),
  ]),
  "位": Object.freeze([
    reviewedAnalysis("位", "default", "measure_word", "classifier", "polite_person_classifier", "polite classifier for people", "wai2"),
    reviewedAnalysis("位", "noun", "what", "noun", "position_seat_digit_noun", "position / seat / role / digit", "wai2"),
    reviewedAnalysis("位", "wai6_classifier", "measure_word", "classifier", "rank_position_classifier", "rank/position classifier", "wai6"),
  ]),
  "廟": Object.freeze([
    reviewedAnalysis("廟", "default", "where", "noun", "place_np temple_noun", "temple / shrine", "miu2"),
    reviewedAnalysis("廟", "miu6_bound", "func", "bound", "nonfinal_bound_reading", "non-final/bound reading", "miu6"),
  ]),
  "戀": Object.freeze([
    reviewedAnalysis("戀", "default", "func", "bound", "bound_formal_love_root", "formal/bound love or attachment root", "lyun2"),
    reviewedAnalysis("戀", "lyun5_provenance", "func", "bound", "alternate_reading_provenance", "alternate reading retained as provenance, not a free lexical verb", "lyun5"),
  ]),
  "完": Object.freeze([
    reviewedAnalysis("完", "default", "doing", "verb", "verb finish_end_verb", "finish / end", "jyun4"),
    reviewedAnalysis("完", "completive", "func", "function", "postverbal_completive_result", "postverbal completive/result complement", "jyun4"),
  ]),
  "都會": Object.freeze([
    reviewedAnalysis("都會", "metropolis_noun", "what", "noun", "metropolis_city_noun", "metropolis / metropolitan area", "dou1 wui6"),
  ]),
  "需要": Object.freeze([
    reviewedAnalysis("需要", "default", "doing", "verb", "verb need_require_verb", "need / require", "seoi1 jiu3"),
    reviewedAnalysis("需要", "noun", "what", "noun", "need_requirement_noun", "need / requirement", "seoi1 jiu3"),
  ]),
  "成": Object.freeze([
    reviewedAnalysis("成", "default", "doing", "verb", "verb success_completion_verb", "succeed / accomplish / become", "sing4"),
    reviewedAnalysis("成", "seng4_quantifier", "how", "adverb", "whole_amount_quantifier", "whole / all / as much as / nearly", "seng4"),
    reviewedAnalysis("成", "seng4_result_suffix", "func", "function", "completion_result_suffix", "completion/result suffix", "seng4"),
    reviewedAnalysis("成", "tenth_measure", "measure_word", "classifier", "fraction_measure", "one tenth / 10%", "sing4"),
  ]),
  "幾多": Object.freeze([
    reviewedAnalysis("幾多", "quantifier", "func", "quantifier", "wh_quantity_quantifier", "how much / how many", "gei2 do1"),
  ]),
  "等": Object.freeze([
    reviewedAnalysis("等", "default", "doing", "verb", "verb wait_leave_task_verb", "wait / leave for someone to do", "dang2"),
    reviewedAnalysis("等", "noun", "what", "noun", "rank_class_grade_noun", "rank / class / grade", "dang2"),
    reviewedAnalysis("等", "etc_suffix", "func", "function", "list_continuation_suffix", "etc.; list-continuation suffix", "dang2"),
    reviewedAnalysis("等", "conjunction", "func", "conjunction", "formal_clause_linker", "formal conjunction/linker where independently supported", "dang2"),
  ]),
});

const EXPLICIT_ANALYSES = Object.freeze(Object.fromEntries(
  Object.entries(REVIEWED_ANALYSES).map(([surface, rows]) => [
    surface,
    CANDIDATE_ONLY_SURFACES.has(surface)
      ? Object.freeze([neutralDefaultAnalysis(surface), ...rows])
      : rows,
  ])
));

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

function reviewedNeutralEntry(surface, entry, status) {
  const hasOverride = Object.prototype.hasOwnProperty.call(NEUTRAL_READING_OVERRIDES, surface);
  return {
    ...entry,
    label: "lex",
    pos: "lexical_item",
    syntax: "lexical_item",
    jyutping: hasOverride ? NEUTRAL_READING_OVERRIDES[surface] : (entry.jyutping || ""),
    senses: [{ gloss: `neutral exact-surface coverage; ${status}` }],
    note: `Reviewed ranks 1–250 adjudication: Exact surface retained as neutral lexical coverage; ${status}.`,
    provenance: { kind: "reviewed_neutral_surface", source: SOURCE, status },
  };
}

function reviewedTypedEntry(entry, review, kind) {
  return {
    ...entry,
    label: review.label,
    pos: review.pos,
    syntax: review.syntax,
    jyutping: review.jyutping || "",
    senses: [{ gloss: review.gloss }],
    note: `Reviewed ranks 1–250 lexical adjudication: ${review.gloss}.`,
    provenance: { kind, source: SOURCE, pronunciation_status: review.jyutping ? "reviewed_in_final_adjudication" : "not_promoted" },
  };
}

function applyReviewedEntries(entries) {
  if (!Array.isArray(entries)) throw new TypeError("ranks 1–250 reviewed lexical overlay requires an entry array");
  return entries.map(([surface, entry]) => {
    if (Object.prototype.hasOwnProperty.call(PROTECTED_NEUTRAL_SURFACES, surface)) {
      return [surface, reviewedNeutralEntry(surface, entry, PROTECTED_NEUTRAL_SURFACES[surface])];
    }
    if (CANDIDATE_ONLY_SURFACES.has(surface)) {
      return [surface, reviewedNeutralEntry(surface, entry, candidate_only_reason(surface))];
    }
    const correction = CORRECTIONS[surface];
    if (correction) return [surface, reviewedTypedEntry(entry, correction, "reviewed_lexical_correction")];
    const promotion = PROMOTIONS[surface];
    if (!promotion || !isNeutralFrequencyFallback(entry)) return [surface, entry];
    return [surface, reviewedTypedEntry(entry, promotion, "reviewed_lexical_promotion")];
  });
}

const CANDIDATE_REASONS = Object.freeze({
  "唔係": "ordinary negative copula remains compositional; preserve reviewed whole-form conjunction candidate",
  "喀": "no single unrestricted default reading; preserve reviewed reading/sense families explicitly",
  "真係": "preserve productive 真 + 係 segmentation while exposing reviewed adverbial expression",
  "咁樣": "preserve compositional segmentation while exposing reviewed manner/demonstrative proform",
  "噉樣": "preserve compositional segmentation while exposing reviewed manner/demonstrative proform",
  "個人": "preserve classifier/noun segmentation while exposing lexical individual/personal analyses",
  "哩個": "preserve phrase segmentation while exposing reviewed 呢個 orthographic-alias analyses",
  "過去": "preserve motion-chain segmentation while exposing reviewed whole-form motion/temporal analyses",
  "一樣": "preserve literal numeral+classifier segmentation while exposing lexical same/alike analyses",
  "唔見": "preserve ordinary negation+見 while exposing lexical missing/lost verb",
  "個位": "preserve component segmentation while exposing lexicalized mathematical units-place noun",
  "都會": "preserve compositional 都 + 會 wui5 while exposing lexical metropolis noun dou1 wui6",
  "幾多": "preserve productive wh-quantity segmentation while exposing reviewed whole-form quantifier",
});

function candidate_only_reason(surface) {
  return CANDIDATE_REASONS[surface] || "reviewed candidate-only surface";
}

module.exports = Object.freeze({
  SOURCE,
  PROTECTED_NEUTRAL_SURFACES,
  CANDIDATE_ONLY_SURFACES,
  PROMOTIONS,
  CORRECTIONS,
  EXPLICIT_ANALYSES,
  isNeutralFrequencyFallback,
  applyReviewedEntries,
});
