"use strict";

// Expert-reviewed lexical decisions for Cifu SpokenAdult ranks 1-250.
//
// This module is intentionally separate from frequency-gap-fill-r7.js. Cifu rank and
// exact surface remain useful discovery/frequency evidence, but Cifu definitions and
// Jyutping are not independent Cantonese lexical evidence. The decisions below come
// from the final #792 adjudication chain, including its later provenance and Rime
// corrections. Whole-form blocked_atomic/research_required surfaces are deliberately
// absent from `entries`; neutral exact-surface coverage remains in the generated R7
// fallback for those items.

function provenance(rank, decisionComment) {
  return Object.freeze({
    kind: "expert_lexical_adjudication",
    source: "github_issue_792",
    rank,
    decision_comment: String(decisionComment),
  });
}

function reviewed(rank, decisionComment, surface, entry) {
  return Object.freeze([
    surface,
    Object.freeze({
      ...entry,
      review: "reviewed_cifu_r1_250",
      provenance: provenance(rank, decisionComment),
    }),
  ]);
}

function analysis(rank, decisionComment, surface, key, entry) {
  const senses = entry.gloss ? Object.freeze([{ gloss: entry.gloss }]) : Object.freeze([]);
  const out = {
    id: `lex:${surface}:${key}`,
    label: entry.label,
    pos: entry.pos,
    jyutping: entry.jyutping,
    syntax: entry.syntax,
    senses,
    provenance: provenance(rank, decisionComment),
  };
  if (entry.note) out.note = entry.note;
  return Object.freeze(out);
}

const entries = Object.freeze([
  reviewed(25, 5269628216, "哋", {
    label: "func", pos: "suffix", jyutping: "dei6", syntax: "plural_suffix",
    note: "Plural suffix after pronouns/人; separate reviewed attenuative dei2 analysis is preserved.",
  }),
  reviewed(27, 5275366660, "即", {
    label: "func", pos: "function", jyutping: "zik1", syntax: "formal_connective discourse_marker",
    note: "Formal connective/discourse function: namely/that is; immediate/even-if family where independently licensed.",
  }),
  reviewed(39, 5275502334, "喀", {
    label: "func", pos: "interjection", jyutping: "kaa1", syntax: "onomatopoeic_interjection",
    note: "Reviewed reading families are preserved explicitly; HKCanCor haak6 is corpus provenance only, not a promoted lexical reading.",
  }),
  reviewed(56, 5275407171, "真係", {
    label: "how", pos: "adverb", jyutping: "zan1 hai6", syntax: "discourse_adverb degree_adverb",
    note: "really / indeed",
  }),
  reviewed(58, 5275934145, "誒", {
    label: "func", pos: "interjection", jyutping: "e6", syntax: "answering_calling_interjection",
    note: "Ordinary answering/calling interjection; e6 is the reviewed main reading.",
  }),
  reviewed(69, 5275934145, "哦", {
    label: "func", pos: "interjection", jyutping: "o4", syntax: "acknowledgement_interjection",
    note: "Acknowledgement o4 is the default reviewed family; other independently supported particle/readings are preserved as analyses.",
  }),
  reviewed(72, 5276378161, "咁樣", {
    label: "how", pos: "proform", jyutping: "gam2 joeng2", syntax: "demonstrative_manner_proform",
    note: "like this/that; this/that way",
  }),
  reviewed(73, 5275407171, "噉樣", {
    label: "how", pos: "proform", jyutping: "gam2 joeng2", syntax: "demonstrative_manner_proform",
    note: "this/that way; orthographic family with 咁樣",
  }),
  reviewed(78, 5275476920, "兜", {
    label: "doing", pos: "verb", jyutping: "dau1", syntax: "verb motion_or_circling_verb",
    note: "go around / circle / solicit; reviewed container-noun family is preserved separately.",
  }),
  reviewed(90, 5275934145, "來", {
    label: "doing", pos: "verb", jyutping: "lai4", syntax: "movement_verb",
    note: "Colloquial come-family; written/bound loi4 remains a separate reviewed family.",
  }),
  reviewed(91, 5275476920, "然", {
    label: "neutral", pos: "morpheme", jyutping: "jin4", syntax: "bound_written_morpheme",
    note: "Bound/written thus/so/-ly morpheme; not promoted as an unrestricted free spoken word.",
  }),
  reviewed(94, 5276160895, "時", {
    label: "neutral", pos: "morpheme", jyutping: "si4", syntax: "bound_time_morpheme",
    note: "Bound time/period/day morpheme by default; separate alternating conjunction and written classifier analyses are preserved.",
  }),
  reviewed(109, 5275934145, "嘛", {
    label: "func", pos: "particle", jyutping: "maa5", syntax: "sentence_final_modal_particle",
    note: "Reviewed ordinary sentence-final reading maa5; Cifu maa4 is not used as the default.",
  }),
  reviewed(116, 5275934145, "嗯", {
    label: "func", pos: "interjection", jyutping: "m6", syntax: "backchannel_interjection",
    note: "Backchannel/hesitation/agreement family; m3 and m2 functions are preserved as reviewed alternatives.",
  }),
  reviewed(125, 5275934145, "方", {
    label: "like", pos: "adjective", jyutping: "fong1", syntax: "formal_square_property",
    note: "Reviewed fong1 lexical families include square property, prescription noun, side/party morpheme, formal only-then adverb, and surname use.",
  }),
  reviewed(126, 5275634464, "陣", {
    label: "measure_word", pos: "classifier", jyutping: "zan6", syntax: "classifier_short_event_state",
    note: "Classifier for short events/states; packet zam6 is treated as a reading anomaly.",
  }),
  reviewed(136, 5275934145, "嘩", {
    label: "func", pos: "interjection", jyutping: "waa3", syntax: "surprise_interjection",
    note: "wow; waa1 is retained separately as a bound noise/hubbub morpheme.",
  }),
  reviewed(140, 5275634464, "個人", {
    label: "who", pos: "noun", jyutping: "go3 jan4", syntax: "person_noun individual_noun",
    note: "individual/person; personal/individual modifier use is preserved as a separate analysis.",
  }),
  reviewed(149, 5275634464, "揾", {
    label: "doing", pos: "verb", jyutping: "wan2", syntax: "verb search_find_verb orthographic_variant_wan2",
    note: "find/search; orthographic variant of 搵 sharing the reviewed wan2 family.",
  }),
  reviewed(151, 5275934145, "哩個", {
    label: "what", pos: "pronoun", jyutping: "ni1 go3", syntax: "demonstrative_np_or_topic orthographic_alias_呢個",
    note: "this / this one; reviewed as an orthographic/annotation alias of 呢個.",
  }),
  reviewed(162, 5275707047, "埋", {
    label: "doing", pos: "verb", jyutping: "maai4", syntax: "verb bury_hide_verb",
    note: "bury/hide; inclusion/addition suffix and close/intimate property uses are preserved separately.",
  }),
  reviewed(170, 5275934145, "成日", {
    label: "when", pos: "adverb", jyutping: "seng4 jat6", syntax: "temporal_frequency_adverb",
    note: "always / very often; both seng4 jat6 and sing4 jat6 are independently supported.",
  }),
  reviewed(174, 5275707047, "裏", {
    label: "where", pos: "localizer", jyutping: "leoi5", syntax: "spatial_localizer inside_localizer",
    note: "inside/interior; reviewed written localizer reading leoi5.",
  }),
  reviewed(185, 5275768052, "過去", {
    label: "doing", pos: "verb", jyutping: "gwo3 heoi3", syntax: "motion_event_verb",
    note: "pass/go over; temporal past/formerly use is preserved as a separate analysis.",
  }),
  reviewed(190, 5275768052, "而", {
    label: "func", pos: "conjunction", jyutping: "ji4", syntax: "formal_clause_linker",
    note: "formal conjunction/linker",
  }),
  reviewed(204, 5276160895, "善", {
    label: "neutral", pos: "morpheme", jyutping: "sin6", syntax: "formal_bound_lexical_root",
    note: "Formal/bound Cantonese lexical root; unrestricted free adjective/verb analyses remain research_required.",
  }),
  reviewed(205, 5276160895, "港", {
    label: "neutral", pos: "morpheme", jyutping: "gong2", syntax: "bound_place_root",
    note: "Bound harbour/port root and Hong Kong abbreviation; not promoted as an unrestricted free common noun.",
  }),
  reviewed(211, 5275809822, "場", {
    label: "measure_word", pos: "classifier", jyutping: "coeng4", syntax: "event_activity_classifier",
    note: "Classifier for events/activities; venue/site/field noun use is preserved separately.",
  }),
  reviewed(212, 5275809822, "台", {
    label: "measure_word", pos: "classifier", jyutping: "toi4", syntax: "machine_equipment_performance_classifier",
    note: "Classifier for machines/equipment/performances; platform/stage noun and Taiwan bound abbreviation are preserved separately.",
  }),
  reviewed(214, 5275809822, "番", {
    label: "measure_word", pos: "classifier", jyutping: "faan1", syntax: "event_iteration_classifier",
    note: "event/iteration classifier/suffix: a time/round; foreign/non-Chinese bound morpheme is preserved separately.",
  }),
  reviewed(221, 5276160895, "個位", {
    label: "what", pos: "noun", jyutping: "go3 wai2", syntax: "mathematical_digit_position_noun",
    note: "ones/units digit position; reviewed mathematical reading is go3 wai2, not Cifu go3 wai6.",
  }),
  reviewed(222, 5275809822, "比較", {
    label: "doing", pos: "verb", jyutping: "bei2 gaau3", syntax: "comparison_verb",
    note: "compare; adverbial comparatively/rather and nominal comparison uses are preserved separately.",
  }),
  reviewed(227, 5275852412, "點鐘", {
    label: "when", pos: "classifier", jyutping: "dim2 zung1", syntax: "time_measure_expression",
    note: "o'clock; reviewed time-measure/classifier expression.",
  }),
  reviewed(229, 5275852412, "死", {
    label: "doing", pos: "verb", jyutping: "sei2", syntax: "verb die_verb",
    note: "die; dead/rigid property and intensifying/bound functions are preserved separately.",
  }),
  reviewed(231, 5276160895, "韻", {
    label: "what", pos: "noun", jyutping: "wan5", syntax: "rhyme_noun phonological_rhyme_noun",
    note: "Ordinary free noun uses wan5; wan6 is preserved as a formal/original reading family.",
  }),
  reviewed(238, 5276160895, "廟", {
    label: "where", pos: "noun", jyutping: "miu2", syntax: "temple_place_noun",
    note: "Standalone temple/shrine noun miu2; non-final bound miu6 is preserved separately.",
  }),
  reviewed(239, 5276160895, "戀", {
    label: "neutral", pos: "morpheme", jyutping: "lyun2", syntax: "bound_formal_lexical_morpheme",
    note: "Bound/formal modern lyun2 morpheme in compounds; lyun5 remains alternate-reading research/provenance, not a promoted free verb.",
  }),
  reviewed(242, 5275852412, "右面", {
    label: "where", pos: "localizer", jyutping: "jau6 min6", syntax: "spatial_locality_noun right_side",
    note: "right side / on the right",
  }),
  reviewed(245, 5275852412, "左面", {
    label: "where", pos: "localizer", jyutping: "zo2 min6", syntax: "spatial_locality_noun left_side",
    note: "left side / on the left",
  }),
  reviewed(247, 5275852412, "成", {
    label: "doing", pos: "verb", jyutping: "sing4", syntax: "completion_success_verb",
    note: "Success/completion verb family by default; reviewed quantificational, result-suffix, and one-tenth measure families are preserved separately.",
  }),
  reviewed(249, 5275852412, "幾多", {
    label: "how", pos: "pronoun", jyutping: "gei2 do1", syntax: "interrogative_quantifier",
    note: "how much / how many",
  }),
]);

const analyses = Object.freeze({
  "呢": Object.freeze([
    analysis(2, 5269628216, "呢", "demonstrative", { label: "func", pos: "determiner", jyutping: "ni1", syntax: "demonstrative_determiner", gloss: "this / these" }),
    analysis(2, 5269628216, "呢", "demonstrative_nei1", { label: "func", pos: "determiner", jyutping: "nei1", syntax: "demonstrative_determiner", gloss: "this / these; supported variant reading" }),
    analysis(2, 5269628216, "呢", "sentence_final_particle", { label: "func", pos: "particle", jyutping: "ne1", syntax: "sentence_final_particle", gloss: "topic-linked / interrogative sentence-final particle" }),
  ]),
  "嘅": Object.freeze([
    analysis(3, 5269628216, "嘅", "attributive_linker", { label: "func", pos: "particle", jyutping: "ge3", syntax: "attributive_genitive_linker nominalizer", gloss: "attributive/genitive linker; nominalizer" }),
    analysis(3, 5269628216, "嘅", "sentence_final_particle", { label: "func", pos: "particle", jyutping: "ge3", syntax: "sentence_final_particle", gloss: "sentence-final particle" }),
  ]),
  "就": Object.freeze([
    analysis(6, 5276039667, "就", "adverb", { label: "how", pos: "adverb", jyutping: "zau6", syntax: "focus_sequence_adverb", gloss: "almost/soon; precisely/exactly; emphatic/determined" }),
    analysis(6, 5276039667, "就", "conjunction", { label: "func", pos: "conjunction", jyutping: "zau6", syntax: "clause_linker consequent_linker", gloss: "then; sequential/contrastive/conditional-consequent linker" }),
    analysis(6, 5276039667, "就", "verb", { label: "doing", pos: "verb", jyutping: "zau6", syntax: "accommodation_yield_verb", gloss: "accommodate / yield to / suit someone" }),
    analysis(6, 5276039667, "就", "preposition", { label: "func", pos: "preposition", jyutping: "zau6", syntax: "relational_preposition", gloss: "regarding / in light of / with respect to" }),
    analysis(6, 5276039667, "就", "bound_morpheme", { label: "neutral", pos: "morpheme", jyutping: "zau6", syntax: "bound_morpheme", gloss: "bound family in 成就 / 就近 / 就職" }),
  ]),
  "咁": Object.freeze([
    analysis(10, 5269628216, "咁", "manner_discourse", { label: "func", pos: "function", jyutping: "gam2", syntax: "discourse_marker demonstrative_manner", gloss: "then/so/like that; demonstrative manner" }),
    analysis(10, 5269628216, "咁", "degree", { label: "how", pos: "adverb", jyutping: "gam3", syntax: "degree_adverb", gloss: "so / that [degree]" }),
  ]),
  "好": Object.freeze([
    analysis(12, 5269628216, "好", "property", { label: "like", pos: "adjective", jyutping: "hou2", syntax: "stative_predicate", gloss: "good / well" }),
    analysis(12, 5269628216, "好", "degree", { label: "how", pos: "adverb", jyutping: "hou2", syntax: "degree_adverb", gloss: "very / quite; degree use" }),
    analysis(12, 5269628216, "好", "fond_of", { label: "doing", pos: "verb", jyutping: "hou3", syntax: "preference_verb", gloss: "like / be fond of" }),
  ]),
  "啲": Object.freeze([
    analysis(13, 5269628216, "啲", "quantity", { label: "measure_word", pos: "quantifier", jyutping: "di1", syntax: "plural_mass_quantifier", gloss: "some / plural or mass quantity" }),
    analysis(13, 5269628216, "啲", "degree", { label: "how", pos: "suffix", jyutping: "di1", syntax: "comparative_degree_suffix", gloss: "a bit / more; comparative degree" }),
  ]),
  "喺": Object.freeze([
    analysis(17, 5269628216, "喺", "coverb", { label: "func", pos: "preposition", jyutping: "hai2", syntax: "locative_coverb", gloss: "at / in / on; locative coverb" }),
    analysis(17, 5269628216, "喺", "predicate", { label: "doing", pos: "verb", jyutping: "hai2", syntax: "locative_predicate", gloss: "be located at" }),
  ]),
  "去": Object.freeze([
    analysis(21, 5269628216, "去", "motion_verb", { label: "doing", pos: "verb", jyutping: "heoi3", syntax: "movement_verb", gloss: "go" }),
    analysis(21, 5269628216, "去", "directional", { label: "func", pos: "function", jyutping: "heoi3", syntax: "directional_complement", gloss: "away/thither directional-complement function" }),
  ]),
  "到": Object.freeze([
    analysis(22, 5269628216, "到", "arrive_reach", { label: "doing", pos: "verb", jyutping: "dou3", syntax: "arrival_reach_verb", gloss: "arrive / reach" }),
    analysis(22, 5269628216, "到", "relational", { label: "func", pos: "function", jyutping: "dou3", syntax: "temporal_spatial_relation", gloss: "to / until / up to; temporal/spatial relation" }),
    analysis(22, 5269628216, "到", "result_attainment", { label: "func", pos: "particle", jyutping: "dou2", syntax: "result_attainment_complement", gloss: "result/attainment complement" }),
    analysis(22, 5269628216, "到", "approximation", { label: "how", pos: "function", jyutping: "dou2", syntax: "approximation_function", gloss: "approximately / up to where independently licensed" }),
  ]),
  "哋": Object.freeze([
    analysis(25, 5269628216, "哋", "plural_suffix", { label: "func", pos: "suffix", jyutping: "dei6", syntax: "plural_suffix", gloss: "plural suffix after pronouns/人" }),
    analysis(25, 5269628216, "哋", "attenuative_suffix", { label: "func", pos: "suffix", jyutping: "dei2", syntax: "attenuative_suffix", gloss: "attenuative suffix after reduplicated adjectives" }),
  ]),
  "話": Object.freeze([
    analysis(28, 5275366660, "話", "verb", { label: "doing", pos: "verb", jyutping: "waa6", syntax: "speech_reporting_verb", gloss: "say / tell / opine" }),
    analysis(28, 5275366660, "話", "noun_waa2", { label: "what", pos: "noun", jyutping: "waa2", syntax: "speech_words_noun", gloss: "speech / words / language" }),
    analysis(28, 5275366660, "話", "noun_waa6", { label: "what", pos: "noun", jyutping: "waa6", syntax: "speech_words_noun", gloss: "speech / words / what was said" }),
  ]),
  "跟住": Object.freeze([
    analysis(30, 5275366660, "跟住", "connective", { label: "func", pos: "conjunction", jyutping: "gan1 zyu6", syntax: "temporal_sequence_connective", gloss: "then / next" }),
    analysis(30, 5275366660, "跟住", "verb", { label: "doing", pos: "verb", jyutping: "gan1 zyu6", syntax: "follow_continue_verb", gloss: "follow / continue following" }),
  ]),
  "會": Object.freeze([
    analysis(31, 5275366660, "會", "modal", { label: "func", pos: "auxiliary", jyutping: "wui5", syntax: "modal_future_ability", gloss: "will / can / know how" }),
    analysis(31, 5275366660, "會", "association", { label: "what", pos: "noun", jyutping: "wui6", syntax: "meeting_association_noun", gloss: "meeting / association / group" }),
    analysis(31, 5275366660, "會", "wui6_bound", { label: "neutral", pos: "morpheme", jyutping: "wui6", syntax: "bound_lexical_family", gloss: "wui6 lexical/bound family" }),
  ]),
  "要": Object.freeze([
    analysis(37, 5275366660, "要", "modal", { label: "func", pos: "auxiliary", jyutping: "jiu3", syntax: "modal_need_or_want", gloss: "must / will / be going to; modal need/want" }),
    analysis(37, 5275366660, "要", "verb", { label: "doing", pos: "verb", jyutping: "jiu3", syntax: "want_need_demand_verb", gloss: "want / need / demand" }),
  ]),
  "喀": Object.freeze([
    analysis(39, 5275502334, "喀", "onomatopoeic_kaa1", { label: "func", pos: "interjection", jyutping: "kaa1", syntax: "onomatopoeic_interjection", gloss: "click/crack/laugh sound" }),
    analysis(39, 5275502334, "喀", "retch_haak3", { label: "func", pos: "interjection", jyutping: "haak3", syntax: "retching_interjection", gloss: "retch/vomit/vomiting sound" }),
    analysis(39, 5275502334, "喀", "transliteration_kaa3", { label: "neutral", pos: "morpheme", jyutping: "kaa3", syntax: "transliteration_onomatopoeic_character", gloss: "transliteration/onomatopoeic character reading" }),
    analysis(39, 5275502334, "喀", "historical_kak1", { label: "neutral", pos: "morpheme", jyutping: "kak1", syntax: "restricted_historical_bound_morpheme", gloss: "restricted historical/bound use such as 肋喀" }),
  ]),
  "一": Object.freeze([
    analysis(40, 5276039667, "一", "numeral", { label: "how", pos: "numeral", jyutping: "jat1", syntax: "cardinal_numeral", gloss: "one" }),
    analysis(40, 5276039667, "一", "conjunction", { label: "func", pos: "conjunction", jyutping: "jat1", syntax: "once_as_soon_as_linker", gloss: "once / as soon as, especially 一…就…" }),
    analysis(40, 5276039667, "一", "reduplication_affix", { label: "func", pos: "affix", jyutping: "jat1", syntax: "reduplication_infix_or_affix", gloss: "reduplication/delimitative affix function as in 睇一睇" }),
  ]),
  "喎": Object.freeze([
    analysis(41, 5275934145, "喎", "particle_wo3", { label: "func", pos: "particle", jyutping: "wo3", syntax: "sentence_final_particle", gloss: "sentence-final particle wo3" }),
    analysis(41, 5275934145, "喎", "particle_wo5", { label: "func", pos: "particle", jyutping: "wo5", syntax: "sentence_final_particle reported_information_particle", gloss: "sentence-final particle wo5" }),
    analysis(41, 5275934145, "喎", "particle_wo4", { label: "func", pos: "particle", jyutping: "wo4", syntax: "sentence_final_particle", gloss: "sentence-final particle wo4" }),
    analysis(41, 5275934145, "喎", "ruined_adjective", { label: "like", pos: "adjective", jyutping: "wo5", syntax: "stative_predicate", gloss: "failed / ruined" }),
  ]),
  "㗎": Object.freeze([
    analysis(42, 5275934145, "㗎", "particle_gaa3", { label: "func", pos: "particle", jyutping: "gaa3", syntax: "sentence_final_particle", gloss: "sentence-final particle gaa3" }),
    analysis(42, 5275934145, "㗎", "particle_gaa4", { label: "func", pos: "particle", jyutping: "gaa4", syntax: "sentence_final_particle", gloss: "sentence-final particle gaa4" }),
  ]),
  "度": Object.freeze([
    analysis(43, 5275366660, "度", "locative_degree", { label: "func", pos: "function", jyutping: "dou6", syntax: "locative_or_degree_function", gloss: "locative/degree/measure dou6 family" }),
    analysis(43, 5275366660, "度", "measure_verb", { label: "doing", pos: "verb", jyutping: "dok6", syntax: "measure_estimate_verb", gloss: "measure / estimate" }),
    analysis(43, 5275366660, "度", "textile_length_noun", { label: "what", pos: "noun", jyutping: "dou2", syntax: "textile_length_noun", gloss: "textile-length unit/use" }),
  ]),
  "得": Object.freeze([
    analysis(53, 5275407171, "得", "lexical_permission", { label: "doing", pos: "verb", jyutping: "dak1", syntax: "obtain_possible_allowed_verb", gloss: "get/obtain; be possible/allowed" }),
    analysis(53, 5275407171, "得", "modal", { label: "func", pos: "auxiliary", jyutping: "dak1", syntax: "ability_permission_modal", gloss: "can / be able or allowed" }),
    analysis(53, 5275407171, "得", "postverbal_complement", { label: "func", pos: "particle", jyutping: "dak1", syntax: "postverbal_structural_complement_marker", gloss: "productive postverbal complement/structural marker" }),
  ]),
  "上": Object.freeze([
    analysis(55, 5275407171, "上", "motion_verb", { label: "doing", pos: "verb", jyutping: "soeng5", syntax: "upward_motion_verb", gloss: "go up / get on" }),
    analysis(55, 5275407171, "上", "spatial_localizer", { label: "where", pos: "localizer", jyutping: "soeng6", syntax: "spatial_localizer", gloss: "up / above / upper" }),
  ]),
  "下": Object.freeze([
    analysis(60, 5275407171, "下", "spatial_localizer", { label: "where", pos: "localizer", jyutping: "haa6", syntax: "spatial_localizer", gloss: "below / under" }),
    analysis(60, 5275407171, "下", "event_classifier", { label: "measure_word", pos: "classifier", jyutping: "haa5", syntax: "event_classifier", gloss: "event/action classifier" }),
    analysis(60, 5275407171, "下", "postverbal_suffix", { label: "func", pos: "suffix", jyutping: "haa5", syntax: "postverbal_delimitative_continuative_suffix", gloss: "delimitative/continuative postverbal function" }),
  ]),
  "囉": Object.freeze([
    analysis(63, 5275934145, "囉", "particle_lo1", { label: "func", pos: "particle", jyutping: "lo1", syntax: "sentence_final_particle", gloss: "sentence-final lo1 function" }),
    analysis(63, 5275934145, "囉", "particle_lo4", { label: "func", pos: "particle", jyutping: "lo4", syntax: "sentence_final_particle", gloss: "sentence-final lo4 function" }),
  ]),
  "咩": Object.freeze([
    analysis(67, 5275407171, "咩", "wh", { label: "what", pos: "pronoun", jyutping: "me1", syntax: "wh_pronoun_determiner", gloss: "what / what kind" }),
    analysis(67, 5275407171, "咩", "particle", { label: "func", pos: "particle", jyutping: "me1", syntax: "sentence_final_interrogative_surprise_particle", gloss: "sentence-final interrogative/surprise particle" }),
  ]),
  "嚟": Object.freeze([
    analysis(68, 5275407171, "嚟", "motion_lai4", { label: "doing", pos: "verb", jyutping: "lai4", syntax: "movement_verb", gloss: "come / bring" }),
    analysis(68, 5275407171, "嚟", "motion_lei4", { label: "doing", pos: "verb", jyutping: "lei4", syntax: "movement_verb", gloss: "come; supported reading variant" }),
    analysis(68, 5275407171, "嚟", "grammaticalized", { label: "func", pos: "particle", jyutping: "lai4", syntax: "grammaticalized_copular_emphatic_recent_event_function", gloss: "grammaticalized copular/emphatic/recent-event function" }),
  ]),
  "哦": Object.freeze([
    analysis(69, 5275934145, "哦", "acknowledgement_o4", { label: "func", pos: "interjection", jyutping: "o4", syntax: "acknowledgement_interjection", gloss: "acknowledgement utterance" }),
    analysis(69, 5275934145, "哦", "realization_o5", { label: "func", pos: "particle", jyutping: "o5", syntax: "realization_particle", gloss: "realization particle" }),
    analysis(69, 5275934145, "哦", "aha_o3", { label: "func", pos: "particle", jyutping: "o3", syntax: "aha_rule_breaking_particle", gloss: "aha / rule-breaking particle" }),
    analysis(69, 5275934145, "哦", "surprise_o2", { label: "func", pos: "interjection", jyutping: "o2", syntax: "surprise_interjection", gloss: "surprise interjection" }),
    analysis(69, 5275934145, "哦", "nag_ngo4", { label: "doing", pos: "verb", jyutping: "ngo4", syntax: "nag_verb", gloss: "nag" }),
  ]),
  "吓": Object.freeze([
    analysis(74, 5275407171, "吓", "interjection", { label: "func", pos: "interjection", jyutping: "haa2", syntax: "surprise_query_interjection", gloss: "huh? / what?" }),
    analysis(74, 5275407171, "吓", "confirmation_particle", { label: "func", pos: "particle", jyutping: "haa2", syntax: "sentence_final_confirmation_particle", gloss: "sentence-final confirmation particle" }),
    analysis(74, 5275407171, "吓", "postverbal_suffix", { label: "func", pos: "suffix", jyutping: "haa5", syntax: "postverbal_delimitative_suffix", gloss: "postverbal aspectual/delimitative suffix" }),
  ]),
  "咪": Object.freeze([
    analysis(77, 5275476920, "咪", "prohibitive_marker", { label: "func", pos: "function", jyutping: "mai5", syntax: "prohibitive_marker", gloss: "don't; prohibitive marker" }),
    analysis(77, 5275476920, "咪", "discourse_focus_marker", { label: "func", pos: "function", jyutping: "mai6", syntax: "discourse_focus_marker conditional_result_adverbial", gloss: "discourse/focus or conditional-result marker" }),
    analysis(77, 5275476920, "咪", "study_cram_verb", { label: "doing", pos: "verb", jyutping: "mai1", syntax: "study_cram_verb", gloss: "study / cram" }),
  ]),
  "兜": Object.freeze([
    analysis(78, 5275476920, "兜", "verb", { label: "doing", pos: "verb", jyutping: "dau1", syntax: "motion_or_circling_verb", gloss: "go around / circle / solicit" }),
    analysis(78, 5275476920, "兜", "container_noun", { label: "what", pos: "noun", jyutping: "dau1", syntax: "container_noun measure_affordance", gloss: "container / receptacle" }),
  ]),
  "同": Object.freeze([
    analysis(80, 5275476920, "同", "same_adjective", { label: "like", pos: "adjective", jyutping: "tung4", syntax: "same_property", gloss: "same" }),
    analysis(80, 5275476920, "同", "coverb", { label: "func", pos: "preposition", jyutping: "tung4", syntax: "comitative_interpersonal_coverb", gloss: "with / to / for" }),
    analysis(80, 5275476920, "同", "conjunction", { label: "func", pos: "conjunction", jyutping: "tung4", syntax: "additive_conjunction", gloss: "and / with" }),
  ]),
  "好似": Object.freeze([
    analysis(83, 5276160895, "好似", "verb", { label: "doing", pos: "verb", jyutping: "hou2 ci5", syntax: "seeming_comparison_predicate", gloss: "seem / be like" }),
    analysis(83, 5276160895, "好似", "adverb", { label: "how", pos: "adverb", jyutping: "hou2 ci5", syntax: "seeming_adverb", gloss: "apparently / as if" }),
    analysis(83, 5276160895, "好似", "conjunction", { label: "func", pos: "conjunction", jyutping: "hou2 ci5", syntax: "comparison_conjunction", gloss: "as if / like" }),
  ]),
  "可能": Object.freeze([
    analysis(87, 5275476920, "可能", "adverb", { label: "how", pos: "adverb", jyutping: "ho2 nang4", syntax: "epistemic_possibility_adverb", gloss: "possibly / probably" }),
    analysis(87, 5275476920, "可能", "noun", { label: "what", pos: "noun", jyutping: "ho2 nang4", syntax: "possibility_noun", gloss: "possibility" }),
  ]),
  "來": Object.freeze([
    analysis(90, 5275934145, "來", "come_lai4", { label: "doing", pos: "verb", jyutping: "lai4", syntax: "movement_verb", gloss: "come" }),
    analysis(90, 5275934145, "來", "come_lei4", { label: "doing", pos: "verb", jyutping: "lei4", syntax: "movement_verb", gloss: "come; supported colloquial variant" }),
    analysis(90, 5275934145, "來", "written_loi4", { label: "neutral", pos: "morpheme", jyutping: "loi4", syntax: "written_bound_prefix_morpheme", gloss: "written/bound coming/next family" }),
  ]),
  "經過": Object.freeze([
    analysis(93, 5275476920, "經過", "verb", { label: "doing", pos: "verb", jyutping: "ging1 gwo3", syntax: "pass_through_verb", gloss: "pass / go through" }),
    analysis(93, 5275476920, "經過", "noun", { label: "what", pos: "noun", jyutping: "ging1 gwo3", syntax: "process_course_noun", gloss: "process / course" }),
  ]),
  "時": Object.freeze([
    analysis(94, 5276160895, "時", "bound_morpheme", { label: "neutral", pos: "morpheme", jyutping: "si4", syntax: "bound_time_morpheme", gloss: "time/period/day material in compounds" }),
    analysis(94, 5276160895, "時", "alternating_conjunction", { label: "func", pos: "conjunction", jyutping: "si4", syntax: "alternating_time_conjunction", gloss: "sometimes…, other times… in 時…時…" }),
    analysis(94, 5276160895, "時", "written_clock_classifier", { label: "measure_word", pos: "classifier", jyutping: "si4", syntax: "written_clock_classifier", gloss: "written-register o'clock classifier" }),
  ]),
  "邊": Object.freeze([
    analysis(97, 5275934145, "邊", "wh_determiner", { label: "func", pos: "determiner", jyutping: "bin1", syntax: "wh_determiner", gloss: "which / where" }),
    analysis(97, 5275934145, "邊", "locality", { label: "where", pos: "noun", jyutping: "bin1", syntax: "locality_side_edge_noun", gloss: "side / edge" }),
  ]),
  "或者": Object.freeze([
    analysis(99, 5275476920, "或者", "conjunction", { label: "func", pos: "conjunction", jyutping: "waak6 ze2", syntax: "alternative_connector", gloss: "or" }),
    analysis(99, 5275476920, "或者", "adverb", { label: "how", pos: "adverb", jyutping: "waak6 ze2", syntax: "epistemic_possibility_adverb", gloss: "perhaps / maybe" }),
  ]),
  "唔好": Object.freeze([
    analysis(102, 5275596314, "唔好", "prohibitive", { label: "func", pos: "function", jyutping: "m4 hou2", syntax: "prohibitive_marker", gloss: "don't" }),
    analysis(102, 5275596314, "唔好", "not_good", { label: "like", pos: "adjective", jyutping: "m4 hou2", syntax: "negative_stative_predicate", gloss: "not good" }),
  ]),
  "俾": Object.freeze([
    analysis(103, 5275596314, "俾", "give", { label: "doing", pos: "verb", jyutping: "bei2", syntax: "ditransitive_verb", gloss: "give / allow" }),
    analysis(103, 5275596314, "俾", "passive", { label: "func", pos: "function", jyutping: "bei2", syntax: "passive_agent_introducer", gloss: "passive/agent-introducing function" }),
  ]),
  "面": Object.freeze([
    analysis(106, 5275934145, "面", "noun_min2", { label: "what", pos: "noun", jyutping: "min2", syntax: "face_reputation_surface_noun", gloss: "face/reputation; plane/surface" }),
    analysis(106, 5275934145, "面", "noun_min6", { label: "where", pos: "noun", jyutping: "min6", syntax: "side_location_noun", gloss: "face/side/location" }),
    analysis(106, 5275934145, "面", "classifier_min6", { label: "measure_word", pos: "classifier", jyutping: "min6", syntax: "side_surface_classifier", gloss: "classifier/measure use" }),
  ]),
  "幾": Object.freeze([
    analysis(107, 5275596314, "幾", "quantity", { label: "how", pos: "quantifier", jyutping: "gei2", syntax: "interrogative_indefinite_quantity", gloss: "how many / several" }),
    analysis(107, 5275596314, "幾", "degree", { label: "how", pos: "adverb", jyutping: "gei2", syntax: "degree_adverb", gloss: "how / quite" }),
  ]),
  "畀": Object.freeze([
    analysis(108, 5275596314, "畀", "give", { label: "doing", pos: "verb", jyutping: "bei2", syntax: "ditransitive_verb", gloss: "give / allow" }),
    analysis(108, 5275596314, "畀", "passive", { label: "func", pos: "function", jyutping: "bei2", syntax: "passive_agent_introducer", gloss: "passive/agent-introducing function" }),
  ]),
  "嗯": Object.freeze([
    analysis(116, 5275934145, "嗯", "backchannel_m6", { label: "func", pos: "interjection", jyutping: "m6", syntax: "backchannel_interjection", gloss: "mm/yes/okay; agreement/backchannel" }),
    analysis(116, 5275934145, "嗯", "hesitation_m3", { label: "func", pos: "interjection", jyutping: "m3", syntax: "hesitation_interjection", gloss: "hesitation/backchannel realization" }),
    analysis(116, 5275934145, "嗯", "uncertainty_m2", { label: "func", pos: "interjection", jyutping: "m2", syntax: "uncertainty_query_interjection", gloss: "what? / uncertainty" }),
  ]),
  "過": Object.freeze([
    analysis(111, 5275596314, "過", "verb", { label: "doing", pos: "verb", jyutping: "gwo3", syntax: "cross_pass_spend_verb", gloss: "cross / pass / spend" }),
    analysis(111, 5275596314, "過", "experiential", { label: "func", pos: "particle", jyutping: "gwo3", syntax: "experiential_aspect", gloss: "experiential aspect marker" }),
    analysis(111, 5275596314, "過", "degree_excessive", { label: "func", pos: "function", jyutping: "gwo3", syntax: "degree_excessive_function", gloss: "degree/excessive grammatical family" }),
  ]),
  "聽": Object.freeze([
    analysis(113, 5275934145, "聽", "ordinary_teng1", { label: "doing", pos: "verb", jyutping: "teng1", syntax: "hear_listen_verb", gloss: "hear / listen / obey" }),
    analysis(113, 5275934145, "聽", "ting3_family", { label: "doing", pos: "verb", jyutping: "ting3", syntax: "formal_bound_or_inevitable_wait_verb", gloss: "formal/bound reading; lexical wait-for-the-inevitable use where licensed" }),
    analysis(113, 5275934145, "聽", "ting1_temporal_prefix", { label: "neutral", pos: "morpheme", jyutping: "ting1", syntax: "temporal_prefix", gloss: "temporal prefix in 聽日 / 聽朝 / 聽晚" }),
  ]),
  "返": Object.freeze([
    analysis(115, 5275596314, "返", "motion", { label: "doing", pos: "verb", jyutping: "faan1", syntax: "movement_verb", gloss: "return / go to an affiliated or regular place" }),
    analysis(115, 5275596314, "返", "restitutive", { label: "func", pos: "function", jyutping: "faan1", syntax: "postverbal_restitutive_repetitive_function", gloss: "restitutive/repetitive postverbal function" }),
    analysis(115, 5275596314, "返", "written_faan2", { label: "neutral", pos: "morpheme", jyutping: "faan2", syntax: "written_bound_morpheme", gloss: "written/bound reading family" }),
  ]),
  "對": Object.freeze([
    analysis(122, 5275596314, "對", "coverb", { label: "func", pos: "preposition", jyutping: "deoi3", syntax: "relational_coverb", gloss: "toward / to" }),
    analysis(122, 5275596314, "對", "verb", { label: "doing", pos: "verb", jyutping: "deoi3", syntax: "face_answer_verb", gloss: "face / answer" }),
    analysis(122, 5275596314, "對", "classifier", { label: "measure_word", pos: "classifier", jyutping: "deoi3", syntax: "pair_set_classifier", gloss: "pair / set" }),
    analysis(122, 5275596314, "對", "correct_property", { label: "like", pos: "adjective", jyutping: "deoi3", syntax: "correct_property", gloss: "correct / right" }),
  ]),
  "方": Object.freeze([
    analysis(125, 5275934145, "方", "square_property", { label: "like", pos: "adjective", jyutping: "fong1", syntax: "formal_square_property", gloss: "square / rectangular" }),
    analysis(125, 5275934145, "方", "prescription_noun", { label: "what", pos: "noun", jyutping: "fong1", syntax: "prescription_noun", gloss: "prescription" }),
    analysis(125, 5275934145, "方", "side_party_morpheme", { label: "neutral", pos: "morpheme", jyutping: "fong1", syntax: "bound_side_party_morpheme", gloss: "side / party bound family" }),
    analysis(125, 5275934145, "方", "only_then_adverb", { label: "how", pos: "adverb", jyutping: "fong1", syntax: "formal_only_then_adverb", gloss: "only then" }),
    analysis(125, 5275934145, "方", "surname", { label: "who", pos: "proper_noun", jyutping: "fong1", syntax: "surname", gloss: "surname Fang/Fong" }),
  ]),
  "喂": Object.freeze([
    analysis(133, 5275634464, "喂", "interjection", { label: "func", pos: "interjection", jyutping: "wai3", syntax: "calling_interjection", gloss: "hey / hello; calling interjection" }),
    analysis(133, 5275634464, "喂", "feed_verb", { label: "doing", pos: "verb", jyutping: "wai3", syntax: "feed_verb", gloss: "feed" }),
  ]),
  "不過": Object.freeze([
    analysis(134, 5275634464, "不過", "conjunction", { label: "func", pos: "conjunction", jyutping: "bat1 gwo3", syntax: "adversative_conjunction", gloss: "but / however" }),
    analysis(134, 5275634464, "不過", "restrictive_adverb", { label: "how", pos: "adverb", jyutping: "bat1 gwo3", syntax: "restrictive_adverb", gloss: "only / merely" }),
  ]),
  "樣": Object.freeze([
    analysis(135, 5275634464, "樣", "noun", { label: "what", pos: "noun", jyutping: "joeng2", syntax: "appearance_form_noun", gloss: "appearance / form" }),
    analysis(135, 5275634464, "樣", "classifier", { label: "measure_word", pos: "classifier", jyutping: "joeng6", syntax: "classifier_kind_item", gloss: "kind / type classifier" }),
  ]),
  "嘩": Object.freeze([
    analysis(136, 5275934145, "嘩", "wow_waa3", { label: "func", pos: "interjection", jyutping: "waa3", syntax: "surprise_interjection", gloss: "wow" }),
    analysis(136, 5275934145, "嘩", "noise_waa1", { label: "neutral", pos: "morpheme", jyutping: "waa1", syntax: "bound_noise_morpheme", gloss: "hubbub / noise bound family" }),
  ]),
  "個人": Object.freeze([
    analysis(140, 5275634464, "個人", "individual_noun", { label: "who", pos: "noun", jyutping: "go3 jan4", syntax: "individual_person_noun", gloss: "individual / person" }),
    analysis(140, 5275634464, "個人", "personal_modifier", { label: "like", pos: "adjective", jyutping: "go3 jan4", syntax: "personal_individual_modifier", gloss: "personal / individual" }),
  ]),
  "行": Object.freeze([
    analysis(145, 5275634464, "行", "walk_haang4", { label: "doing", pos: "verb", jyutping: "haang4", syntax: "walking_verb", gloss: "walk / go" }),
    analysis(145, 5275634464, "行", "industry_hong4", { label: "what", pos: "noun", jyutping: "hong4", syntax: "industry_profession_noun", gloss: "industry / profession" }),
    analysis(145, 5275634464, "行", "row_classifier_hong4", { label: "measure_word", pos: "classifier", jyutping: "hong4", syntax: "row_line_classifier", gloss: "row / line classifier" }),
    analysis(145, 5275634464, "行", "licensed_hong2", { label: "like", pos: "adjective", jyutping: "hong2", syntax: "licensed_perfunctory_property", gloss: "licensed / perfunctory" }),
    analysis(145, 5275634464, "行", "bound_hang4", { label: "neutral", pos: "morpheme", jyutping: "hang4", syntax: "bound_action_trip_morpheme", gloss: "bound action/trip family" }),
  ]),
  "條": Object.freeze([
    analysis(148, 5275634464, "條", "classifier", { label: "measure_word", pos: "classifier", jyutping: "tiu4", syntax: "classifier_long_thin", gloss: "classifier for long/thin entities" }),
    analysis(148, 5275634464, "條", "noun", { label: "what", pos: "noun", jyutping: "tiu4", syntax: "strip_article_clause_noun", gloss: "strip / article / clause" }),
  ]),
  "間": Object.freeze([
    analysis(152, 5275707047, "間", "classifier_gaan1", { label: "measure_word", pos: "classifier", jyutping: "gaan1", syntax: "classifier_building_shop", gloss: "classifier for rooms/buildings" }),
    analysis(152, 5275707047, "間", "divide_gaan3", { label: "doing", pos: "verb", jyutping: "gaan3", syntax: "divide_partition_verb", gloss: "draw/divide/partition" }),
    analysis(152, 5275707047, "間", "bay_classifier_gaan3", { label: "measure_word", pos: "classifier", jyutping: "gaan3", syntax: "architectural_bay_classifier", gloss: "architectural-bay classifier" }),
    analysis(152, 5275707047, "間", "stripe_noun_gaan3", { label: "what", pos: "noun", jyutping: "gaan3", syntax: "stripe_noun", gloss: "stripe" }),
  ]),
  "啱": Object.freeze([
    analysis(155, 5275707047, "啱", "property", { label: "like", pos: "adjective", jyutping: "ngaam1", syntax: "correct_suitable_property", gloss: "correct / suitable" }),
    analysis(155, 5275707047, "啱", "fit_verb", { label: "doing", pos: "verb", jyutping: "ngaam1", syntax: "fit_suit_verb", gloss: "fit / suit" }),
    analysis(155, 5275707047, "啱", "temporal_adverb", { label: "when", pos: "adverb", jyutping: "ngaam1", syntax: "just_now_exactly_adverb", gloss: "just now / exactly" }),
    analysis(155, 5275707047, "啱", "aam1_variant", { label: "like", pos: "adjective", jyutping: "aam1", syntax: "correct_suitable_property", gloss: "correct / suitable; initial-ng-loss variant" }),
  ]),
  "落": Object.freeze([
    analysis(160, 5275707047, "落", "motion_verb", { label: "doing", pos: "verb", jyutping: "lok6", syntax: "downward_motion_verb", gloss: "go down / descend" }),
    analysis(160, 5275707047, "落", "directional_result", { label: "func", pos: "function", jyutping: "lok6", syntax: "directional_result_complement", gloss: "productive directional/result-complement function" }),
  ]),
  "埋": Object.freeze([
    analysis(162, 5275707047, "埋", "bury_hide", { label: "doing", pos: "verb", jyutping: "maai4", syntax: "bury_hide_verb", gloss: "bury / hide" }),
    analysis(162, 5275707047, "埋", "inclusion_suffix", { label: "func", pos: "suffix", jyutping: "maai4", syntax: "postverbal_inclusion_addition_suffix", gloss: "include/add as well; postverbal function" }),
    analysis(162, 5275707047, "埋", "close_property", { label: "like", pos: "adjective", jyutping: "maai4", syntax: "close_intimate_property", gloss: "close / intimate" }),
  ]),
  "一定": Object.freeze([
    analysis(166, 5275707047, "一定", "epistemic_adverb", { label: "how", pos: "adverb", jyutping: "jat1 ding6", syntax: "certainty_modal_adverb", gloss: "certainly / must" }),
    analysis(166, 5275707047, "一定", "property", { label: "like", pos: "adjective", jyutping: "jat1 ding6", syntax: "fixed_given_property", gloss: "certain / fixed / given" }),
  ]),
  "成日": Object.freeze([
    analysis(170, 5275934145, "成日", "seng4_jat6", { label: "when", pos: "adverb", jyutping: "seng4 jat6", syntax: "temporal_frequency_adverb", gloss: "always / very often" }),
    analysis(170, 5275934145, "成日", "sing4_jat6", { label: "when", pos: "adverb", jyutping: "sing4 jat6", syntax: "temporal_frequency_adverb", gloss: "always / very often; supported reading variant" }),
  ]),
  "點": Object.freeze([
    analysis(172, 5275707047, "點", "wh", { label: "how", pos: "pronoun", jyutping: "dim2", syntax: "wh_manner_pronoun", gloss: "how" }),
    analysis(172, 5275707047, "點", "verb", { label: "doing", pos: "verb", jyutping: "dim2", syntax: "count_point_order_verb", gloss: "count / point / order / mislead" }),
    analysis(172, 5275707047, "點", "noun", { label: "what", pos: "noun", jyutping: "dim2", syntax: "dot_point_degree_noun", gloss: "dot / point / degree" }),
    analysis(172, 5275707047, "點", "clock_classifier", { label: "measure_word", pos: "classifier", jyutping: "dim2", syntax: "clock_time_classifier", gloss: "o'clock / time classifier" }),
  ]),
  "塔": Object.freeze([
    analysis(173, 5275934145, "塔", "tower_noun", { label: "what", pos: "noun", jyutping: "taap3", syntax: "tower_pagoda_noun", gloss: "tower / pagoda" }),
    analysis(173, 5275934145, "塔", "lock_verb", { label: "doing", pos: "verb", jyutping: "taap3", syntax: "lock_handcuff_verb", gloss: "lock / handcuff" }),
    analysis(173, 5275934145, "塔", "lock_noun", { label: "what", pos: "noun", jyutping: "taap3", syntax: "lock_noun", gloss: "lock" }),
  ]),
  "錢": Object.freeze([
    analysis(176, 5275768052, "錢", "money", { label: "what", pos: "noun", jyutping: "cin2", syntax: "money_noun", gloss: "money / coin" }),
    analysis(176, 5275768052, "錢", "surname", { label: "who", pos: "proper_noun", jyutping: "cin4", syntax: "surname", gloss: "surname Chin/Qian" }),
  ]),
  "用": Object.freeze([
    analysis(184, 5275768052, "用", "verb", { label: "doing", pos: "verb", jyutping: "jung6", syntax: "use_verb", gloss: "use" }),
    analysis(184, 5275768052, "用", "instrumental_coverb", { label: "func", pos: "preposition", jyutping: "jung6", syntax: "instrumental_coverb", gloss: "with / by means of" }),
  ]),
  "過去": Object.freeze([
    analysis(185, 5275768052, "過去", "motion_event", { label: "doing", pos: "verb", jyutping: "gwo3 heoi3", syntax: "motion_event_verb", gloss: "pass / go over" }),
    analysis(185, 5275768052, "過去", "temporal_past", { label: "when", pos: "noun", jyutping: "gwo3 heoi3", syntax: "past_temporal_expression", gloss: "the past / formerly" }),
  ]),
  "右邊": Object.freeze([
    analysis(189, 5276378161, "右邊", "bin1", { label: "where", pos: "localizer", jyutping: "jau6 bin1", syntax: "spatial_locality_noun right_side", gloss: "right side / to the right" }),
    analysis(189, 5276378161, "右邊", "bin6", { label: "where", pos: "localizer", jyutping: "jau6 bin6", syntax: "spatial_locality_noun right_side", gloss: "right side / to the right; supported reading variant" }),
  ]),
  "一樣": Object.freeze([
    analysis(192, 5276016704, "一樣", "adjective", { label: "like", pos: "adjective", jyutping: "jat1 joeng6", syntax: "same_alike_property", gloss: "same / alike" }),
    analysis(192, 5276016704, "一樣", "adverb", { label: "how", pos: "adverb", jyutping: "jat1 joeng6", syntax: "equally_likewise_adverb", gloss: "equally / likewise" }),
  ]),
  "香": Object.freeze([
    analysis(193, 5275768052, "香", "property", { label: "like", pos: "adjective", jyutping: "hoeng1", syntax: "fragrant_appetizing_property", gloss: "fragrant / appetizing" }),
    analysis(193, 5275768052, "香", "noun", { label: "what", pos: "noun", jyutping: "hoeng1", syntax: "incense_fragrance_noun", gloss: "incense / perfume / fragrance" }),
  ]),
  "緊": Object.freeze([
    analysis(194, 5275768052, "緊", "property", { label: "like", pos: "adjective", jyutping: "gan2", syntax: "tight_urgent_property", gloss: "tight / urgent" }),
    analysis(194, 5275768052, "緊", "progressive", { label: "func", pos: "particle", jyutping: "gan2", syntax: "progressive_durative_aspect", gloss: "progressive/durative postverbal marker" }),
  ]),
  "張": Object.freeze([
    analysis(196, 5275768052, "張", "classifier", { label: "measure_word", pos: "classifier", jyutping: "zoeng1", syntax: "classifier_flat_surface_table", gloss: "classifier for flat objects/furniture" }),
    analysis(196, 5275768052, "張", "surname", { label: "who", pos: "proper_noun", jyutping: "zoeng1", syntax: "surname", gloss: "surname Cheung/Zhang" }),
  ]),
  "由": Object.freeze([
    analysis(198, 5275768052, "由", "coverb", { label: "func", pos: "preposition", jyutping: "jau4", syntax: "source_cause_coverb", gloss: "from / by / because of" }),
    analysis(198, 5275768052, "由", "verb", { label: "doing", pos: "verb", jyutping: "jau4", syntax: "leave_to_determine_verb", gloss: "be up to / leave to / allow to be determined by" }),
  ]),
  "識": Object.freeze([
    analysis(199, 5275768052, "識", "cognition", { label: "doing", pos: "verb", jyutping: "sik1", syntax: "know_recognize_verb", gloss: "know / recognize / be acquainted with" }),
    analysis(199, 5275768052, "識", "ability", { label: "func", pos: "auxiliary", jyutping: "sik1", syntax: "modal_know_how", gloss: "know how to / can" }),
  ]),
  "畫": Object.freeze([
    analysis(201, 5275809822, "畫", "verb", { label: "doing", pos: "verb", jyutping: "waak6", syntax: "draw_paint_verb", gloss: "draw / paint" }),
    analysis(201, 5275809822, "畫", "noun", { label: "what", pos: "noun", jyutping: "waa2", syntax: "picture_drawing_noun", gloss: "picture / drawing / painting" }),
  ]),
  "左邊": Object.freeze([
    analysis(203, 5276378161, "左邊", "bin1", { label: "where", pos: "localizer", jyutping: "zo2 bin1", syntax: "spatial_locality_noun left_side", gloss: "left side / on the left" }),
    analysis(203, 5276378161, "左邊", "bin6", { label: "where", pos: "localizer", jyutping: "zo2 bin6", syntax: "spatial_locality_noun left_side", gloss: "left side / on the left; supported reading variant" }),
  ]),
  "場": Object.freeze([
    analysis(211, 5275809822, "場", "classifier", { label: "measure_word", pos: "classifier", jyutping: "coeng4", syntax: "event_activity_classifier", gloss: "classifier for events/activities" }),
    analysis(211, 5275809822, "場", "noun", { label: "what", pos: "noun", jyutping: "coeng4", syntax: "venue_site_field_noun", gloss: "site / venue / field" }),
  ]),
  "台": Object.freeze([
    analysis(212, 5275809822, "台", "classifier", { label: "measure_word", pos: "classifier", jyutping: "toi4", syntax: "machine_equipment_performance_classifier", gloss: "classifier for machines/equipment/performances" }),
    analysis(212, 5275809822, "台", "noun", { label: "what", pos: "noun", jyutping: "toi4", syntax: "platform_stage_noun", gloss: "platform / stage" }),
    analysis(212, 5275809822, "台", "taiwan_abbreviation", { label: "where", pos: "morpheme", jyutping: "toi4", syntax: "proper_bound_place_abbreviation", gloss: "Taiwan abbreviation" }),
  ]),
  "番": Object.freeze([
    analysis(214, 5275809822, "番", "iteration_classifier", { label: "measure_word", pos: "classifier", jyutping: "faan1", syntax: "event_iteration_classifier", gloss: "a time / round" }),
    analysis(214, 5275809822, "番", "iteration_suffix", { label: "func", pos: "suffix", jyutping: "faan1", syntax: "event_iteration_suffix", gloss: "iteration suffix after an event/action" }),
    analysis(214, 5275809822, "番", "foreign_morpheme", { label: "neutral", pos: "morpheme", jyutping: "faan1", syntax: "bound_foreign_morpheme", gloss: "foreign / non-Chinese bound family" }),
  ]),
  "唔見": Object.freeze([
    analysis(217, 5275934145, "唔見", "lexicalized_verb", { label: "doing", pos: "verb", jyutping: "m4 gin3", syntax: "lexicalized_not_see_loss_verb", gloss: "not see; lose/misplace; suffer loss; conventional rhetorical uses", note: "Ordinary compositional 唔 + 見 remains independently analyzable; this analysis records the attested whole-form lexical family without forcing all contexts atomic." }),
  ]),
  "正": Object.freeze([
    analysis(220, 5275809822, "正", "proper_zing3", { label: "like", pos: "adjective", jyutping: "zing3", syntax: "correct_proper_main_property", gloss: "correct / proper / positive / main" }),
    analysis(220, 5275809822, "正", "exactly_zing3", { label: "how", pos: "adverb", jyutping: "zing3", syntax: "just_exactly_adverb", gloss: "just / exactly" }),
    analysis(220, 5275809822, "正", "excellent_zeng3", { label: "like", pos: "adjective", jyutping: "zeng3", syntax: "excellent_property", gloss: "great / excellent" }),
    analysis(220, 5275809822, "正", "formal_zing1", { label: "neutral", pos: "morpheme", jyutping: "zing1", syntax: "formal_bound_morpheme", gloss: "formal/bound reading as in 正月" }),
  ]),
  "比較": Object.freeze([
    analysis(222, 5275809822, "比較", "verb", { label: "doing", pos: "verb", jyutping: "bei2 gaau3", syntax: "comparison_verb", gloss: "compare" }),
    analysis(222, 5275809822, "比較", "adverb", { label: "how", pos: "adverb", jyutping: "bei2 gaau3", syntax: "comparative_degree_adverb", gloss: "comparatively / relatively / rather" }),
    analysis(222, 5275809822, "比較", "noun", { label: "what", pos: "noun", jyutping: "bei2 gaau3", syntax: "comparison_noun", gloss: "comparison" }),
  ]),
  "紙": Object.freeze([
    analysis(226, 5275852412, "紙", "noun", { label: "what", pos: "noun", jyutping: "zi2", syntax: "paper_noun", gloss: "paper" }),
    analysis(226, 5275852412, "紙", "formal_classifier", { label: "measure_word", pos: "classifier", jyutping: "zi2", syntax: "formal_document_letter_classifier", gloss: "formal classifier for documents/letters" }),
  ]),
  "交叉": Object.freeze([
    analysis(228, 5275852412, "交叉", "noun", { label: "what", pos: "noun", jyutping: "gaau1 caa1", syntax: "intersection_crossing_noun", gloss: "intersection / crossing" }),
    analysis(228, 5275852412, "交叉", "verb", { label: "doing", pos: "verb", jyutping: "gaau1 caa1", syntax: "cross_intersect_verb", gloss: "cross / intersect" }),
  ]),
  "死": Object.freeze([
    analysis(229, 5275852412, "死", "verb", { label: "doing", pos: "verb", jyutping: "sei2", syntax: "die_verb", gloss: "die" }),
    analysis(229, 5275852412, "死", "property", { label: "like", pos: "adjective", jyutping: "sei2", syntax: "dead_rigid_property", gloss: "dead / rigid / inflexible" }),
    analysis(229, 5275852412, "死", "intensifier", { label: "func", pos: "morpheme", jyutping: "sei2", syntax: "intensifying_bound_function", gloss: "damned / extremely; negative intensifying function" }),
  ]),
  "年": Object.freeze([
    analysis(230, 5275852412, "年", "noun", { label: "when", pos: "noun", jyutping: "nin4", syntax: "year_noun temporal", gloss: "year" }),
    analysis(230, 5275852412, "年", "measure", { label: "measure_word", pos: "classifier", jyutping: "nin4", syntax: "temporal_year_measure", gloss: "year temporal measure/classifier" }),
  ]),
  "韻": Object.freeze([
    analysis(231, 5276160895, "韻", "free_noun_wan5", { label: "what", pos: "noun", jyutping: "wan5", syntax: "rhyme_noun phonological_rhyme_noun", gloss: "rhyme / pleasing sound / phonological rhyme" }),
    analysis(231, 5276160895, "韻", "formal_wan6", { label: "neutral", pos: "morpheme", jyutping: "wan6", syntax: "formal_original_reading_family", gloss: "formal/original reading family" }),
  ]),
  "驚": Object.freeze([
    analysis(232, 5275934145, "驚", "fear_geng1", { label: "like", pos: "verb", jyutping: "geng1", syntax: "fear_worry_stative_verb", gloss: "fear / be afraid / worry" }),
    analysis(232, 5275934145, "驚", "shock_ging1", { label: "neutral", pos: "morpheme", jyutping: "ging1", syntax: "formal_bound_shock_surprise_morpheme", gloss: "formal/bound shock/surprise family" }),
    analysis(232, 5275934145, "驚", "game_slang", { label: "what", pos: "noun", jyutping: "geng1", syntax: "slang_game_noun", gloss: "game; independently attested slang noun" }),
  ]),
  "日": Object.freeze([
    analysis(235, 5275852412, "日", "day_noun", { label: "when", pos: "noun", jyutping: "jat6", syntax: "day_noun temporal", gloss: "day" }),
    analysis(235, 5275852412, "日", "day_measure", { label: "measure_word", pos: "classifier", jyutping: "jat6", syntax: "temporal_day_measure", gloss: "day temporal measure/classifier" }),
    analysis(235, 5275852412, "日", "japan_abbreviation", { label: "where", pos: "morpheme", jyutping: "jat6", syntax: "proper_bound_place_abbreviation", gloss: "Japan abbreviation in bound/proper-name material" }),
  ]),
  "位": Object.freeze([
    analysis(236, 5275934145, "位", "human_classifier_wai2", { label: "measure_word", pos: "classifier", jyutping: "wai2", syntax: "respectful_human_classifier", gloss: "respectful classifier for people" }),
    analysis(236, 5275934145, "位", "place_noun_wai2", { label: "what", pos: "noun", jyutping: "wai2", syntax: "seat_place_role_digit_position_noun", gloss: "seat / place / role / digit position" }),
    analysis(236, 5275934145, "位", "rank_classifier_wai6", { label: "measure_word", pos: "classifier", jyutping: "wai6", syntax: "rank_position_classifier", gloss: "rank/placing classifier" }),
    analysis(236, 5275934145, "位", "bound_wai6", { label: "neutral", pos: "morpheme", jyutping: "wai6", syntax: "bound_original_tone_morpheme", gloss: "bound/original-tone morpheme family" }),
  ]),
  "廟": Object.freeze([
    analysis(238, 5276160895, "廟", "free_noun_miu2", { label: "where", pos: "noun", jyutping: "miu2", syntax: "temple_place_noun", gloss: "temple / shrine" }),
    analysis(238, 5276160895, "廟", "bound_miu6", { label: "neutral", pos: "morpheme", jyutping: "miu6", syntax: "nonfinal_bound_morpheme", gloss: "non-final bound family in 廟祝 / 廟宇" }),
  ]),
  "完": Object.freeze([
    analysis(240, 5275852412, "完", "verb", { label: "doing", pos: "verb", jyutping: "jyun4", syntax: "finish_end_verb", gloss: "finish / end" }),
    analysis(240, 5275852412, "完", "result_complement", { label: "func", pos: "function", jyutping: "jyun4", syntax: "completive_result_complement", gloss: "postverbal completive/result complement" }),
  ]),
  "都會": Object.freeze([
    analysis(241, 5275852412, "都會", "metropolis_noun", { label: "where", pos: "noun", jyutping: "dou1 wui6", syntax: "metropolis_noun", gloss: "metropolis / city", note: "Compositional 都 dou1 + 會 wui5 remains a separate sequence; this analysis does not force every surface occurrence atomic." }),
  ]),
  "需要": Object.freeze([
    analysis(244, 5275852412, "需要", "verb", { label: "doing", pos: "verb", jyutping: "seoi1 jiu3", syntax: "need_require_verb", gloss: "need / require" }),
    analysis(244, 5275852412, "需要", "noun", { label: "what", pos: "noun", jyutping: "seoi1 jiu3", syntax: "need_requirement_noun", gloss: "need / requirement" }),
  ]),
  "成": Object.freeze([
    analysis(247, 5275852412, "成", "completion_sing4", { label: "doing", pos: "verb", jyutping: "sing4", syntax: "completion_success_verb", gloss: "succeed / complete / accomplish / become" }),
    analysis(247, 5275852412, "成", "quantifier_seng4", { label: "how", pos: "quantifier", jyutping: "seng4", syntax: "whole_all_quantifier", gloss: "whole / all / as much as / nearly" }),
    analysis(247, 5275852412, "成", "quantifier_sing4", { label: "how", pos: "quantifier", jyutping: "sing4", syntax: "whole_all_quantifier", gloss: "whole / all; supported reading family" }),
    analysis(247, 5275852412, "成", "result_suffix_seng4", { label: "func", pos: "suffix", jyutping: "seng4", syntax: "completion_result_suffix", gloss: "completion/result suffix" }),
    analysis(247, 5275852412, "成", "tenth_measure", { label: "measure_word", pos: "classifier", jyutping: "sing4", syntax: "one_tenth_measure", gloss: "one tenth / 10%" }),
    analysis(247, 5275852412, "成", "surname", { label: "who", pos: "proper_noun", jyutping: "sing4", syntax: "surname", gloss: "surname Shing/Cheng" }),
  ]),
  "等": Object.freeze([
    analysis(250, 5276160895, "等", "conjunction", { label: "func", pos: "conjunction", jyutping: "dang2", syntax: "temporal_condition_conjunction", gloss: "when / after a condition is met" }),
    analysis(250, 5276160895, "等", "verb", { label: "doing", pos: "verb", jyutping: "dang2", syntax: "wait_delegate_verb", gloss: "wait; leave a task to someone" }),
    analysis(250, 5276160895, "等", "noun", { label: "what", pos: "noun", jyutping: "dang2", syntax: "rank_class_grade_noun", gloss: "class / rank / level / grade" }),
    analysis(250, 5276160895, "等", "list_suffix", { label: "func", pos: "suffix", jyutping: "dang2", syntax: "list_continuation_suffix", gloss: "etc. / and so on" }),
  ]),
});

module.exports = Object.freeze({ entries, analyses });
