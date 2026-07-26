"use strict";

module.exports = [  // Demonstratives / referents
  ["呢個", { label: "what", jyutping: "ni1 go3", syntax: "demonstrative_np_or_topic", note: "this one" }],
  ["嗰個", { label: "what", jyutping: "go2 go3", syntax: "demonstrative_np_or_topic", note: "that one" }],
  ["嗰", { label: "func", pos: "determiner", jyutping: "go2", syntax: "demonstrative_determiner", note: "that; specifier/determiner, not a head noun" }],
  ["邊", { label: "func", pos: "determiner", jyutping: "bin1", syntax: "wh_determiner", note: "which; wh-determiner, not a head noun" }],
  ["間", { label: "measure_word", jyutping: "gaan1", syntax: "classifier_building_shop", note: "measure word / classifier for rooms, shops, restaurants, buildings" }],
  ["張", { label: "measure_word", jyutping: "zoeng1", syntax: "classifier_flat_surface_table", note: "measure word / classifier for flat objects and tables" }],
  ["杯", { label: "measure_word", jyutping: "bui1", syntax: "classifier_container_cup", note: "measure word / cup classifier for drinks" }],
  ["套", { label: "measure_word", jyutping: "tou3", syntax: "classifier_set_media", note: "measure word / classifier for films, shows, sets, and series" }],
  ["首", { label: "measure_word", jyutping: "sau2", syntax: "classifier_song_poem", note: "measure word / classifier for songs and poems" }],
  ["件", { label: "measure_word", jyutping: "gin6", syntax: "classifier_clothing_item", note: "measure word / classifier for clothing/items" }],
  ["隻", { label: "measure_word", jyutping: "zek3", syntax: "classifier_animal_body_part_one_of_pair", note: "measure word / classifier for animals, body parts, and one of a pair" }],
  ["幅", { label: "measure_word", jyutping: "fuk1", syntax: "classifier_picture_flat_work", note: "measure word / classifier for pictures and flat works" }],
  ["呢間", { label: "what", jyutping: "ni1 gaan1", syntax: "demonstrative_classifier_np", note: "this one/building/shop; long restaurant NPs render transparently when possible." }],
  ["邊間", { label: "what", jyutping: "bin1 gaan1", syntax: "wh_classifier_np", note: "which one/shop/building; 邊間呀 renders transparently when possible." }],
  ["嗰間", { label: "what", jyutping: "go2 gaan1", syntax: "demonstrative_classifier_np", note: "that one/shop/building; long restaurant NPs render transparently when possible." }],
  ["呢間餐廳", { label: "what", jyutping: "ni1 gaan1 caan1 teng1", syntax: "topic_or_object_np", note: "this restaurant" }],
  ["嗰間餐廳", { label: "what", jyutping: "go2 gaan1 caan1 teng1", syntax: "topic_or_object_np", note: "that restaurant" }],
  ["嗰間新開嘅意大利餐廳", { label: "what", jyutping: "go2 gaan1 san1 hoi1 ge3 ji3 daai6 lei6 caan1 teng1", syntax: "modified_np", note: "that newly opened Italian restaurant" }],
  ["呢啲", { label: "what", jyutping: "ni1 di1", syntax: "demonstrative_np_or_topic", note: "these" }],
  ["嗰啲", { label: "what", jyutping: "go2 di1", syntax: "demonstrative_np_or_topic", note: "those" }],
  ["呢度", { label: "where", jyutping: "ni1 dou6", syntax: "place", note: "here" }],
  ["嗰度", { label: "where", jyutping: "go2 dou6", syntax: "place", note: "there" }],
  ["邊個", { label: "who", jyutping: "bin1 go3", syntax: "wh_person", note: "who" }],
  ["邊度", { label: "where", jyutping: "bin1 dou6", syntax: "wh_place", note: "where" }],
  ["咩", { label: "what", jyutping: "me1", syntax: "wh_thing direct_nominal_wh_determiner question_particle wh_or_particle", note: "what / what-kind-of / question particle; construction context decides whether it directly modifies a noun, fills a wh-object/complement, or functions as a sentence-final surprise particle." }],
  ["乜嘢", { label: "what", jyutping: "mat1 je5", syntax: "wh_thing", note: "what" }],
  ["幾時", { label: "when", jyutping: "gei2 si4", syntax: "wh_time", note: "when" }],
  ["點解", { label: "why", jyutping: "dim2 gaai2", syntax: "wh_reason", note: "why" }],
  ["點", { label: "how", jyutping: "dim2", syntax: "wh_manner", note: "how" }],
  ["點樣", { label: "how", jyutping: "dim2 joeng2", syntax: "evaluation_wh_predicate", note: "how / what kind; asks for evaluation" }],
  ["幾錢", { label: "how", jyutping: "gei2 cin2", syntax: "wh_price scalar_value money_amount", note: "how much money; asks about price/value on a scale" }],
  ["邊間呀", { label: "what", jyutping: "bin1 gaan1 aa3", syntax: "wh_fragment", note: "which one?" }],

  // v0.5.153: Extend broad MotionGoalVP to transparent perfective motion-to-destination predicates
  // such as 去咗香港. Reuse the existing public label; perfective aspect remains an internal
  // relation, and wh-place expressions retain LocativeWhQuestion precedence.
  // v0.5.152: Broad perfective locative-wh question support is implemented in the
  // generated construction templates below; lexical entries remain unchanged.
  // v0.5.151: W17 lexical-boundary blockers. These multi-character lexical items
  // prevent valid words from being split into independently productive grammar material.
  ["正題", { label: "what", jyutping: "zing3 tai4", syntax: "topic_np object_np discourse_topic", note: "main topic / main point; lexical boundary blocks the false 正 stative parse in 講返正題." }],
  ["最近", { label: "when", jyutping: "zeoi3 gan6", syntax: "temporal_adjunct time_expression", note: "recently / lately; lexical boundary blocks the false 最 + 近 modifier parse." }],

  // v0.5.150-r1: W17 lexicon import after learner-role/internal-slot review.
  // Learner roles are sentence-facing display defaults; syntax strings carry lexical/internal affordances.
  // Negative stative/preference phrases and large numerals remain registered but tokenize compositionally.
  ["唔開心", { label: "like", jyutping: "m4 hoi1 sam1", syntax: "negative_stative_phrase compositional_lexicon_entry", note: "unhappy; registered from W17 but forced to tokenize as 唔 + 開心 so the negator remains visible." }],
  ["攰", { label: "like", jyutping: "gui6", syntax: "stative_predicate emotion_state_stative", note: "tired; W17 lexicon expansion." }],
  ["嬲", { label: "like", jyutping: "nau1", syntax: "stative_predicate emotion_state_stative", note: "angry; W17 lexicon expansion." }],
  ["驚", { label: "like", jyutping: "geng1", syntax: "stative_predicate emotion_state_stative", note: "scared/startled/surprised; W17 lexicon expansion." }],
  ["擔心", { label: "doing", jyutping: "daam1 sam1", syntax: "mental_state_verb cognition_predicate", note: "worry / be worried; learner-visible verb role remains doing while cognition is internal metadata." }],
  ["悶", { label: "like", jyutping: "mun6", syntax: "stative_predicate emotion_state_stative", note: "bored; W17 lexicon expansion." }],
  ["緊張", { label: "like", jyutping: "gan2 zoeng1", syntax: "stative_predicate emotion_state_stative", note: "nervous/tense; W17 lexicon expansion." }],
  ["壓力", { label: "what", jyutping: "aat3 lik6", syntax: "abstract_noun object_np topic_np", note: "pressure/stress; W17 lexicon expansion." }],
  ["辛苦", { label: "like", jyutping: "san1 fu2", syntax: "stative_predicate emotion_state_stative", note: "tough/tiring/laborious; W17 lexicon expansion." }],
  ["感動", { label: "like", jyutping: "gam2 dung6", syntax: "stative_predicate emotion_state_stative", note: "emotionally moved/touched; W17 lexicon expansion." }],
  ["激動", { label: "like", jyutping: "gik1 dung6", syntax: "stative_predicate emotion_state_stative", note: "emotionally excited/agitated; W17 lexicon expansion." }],
  ["失望", { label: "like", jyutping: "sat1 mong6", syntax: "stative_predicate emotion_state_stative", note: "disappointed; W17 lexicon expansion." }],
  ["放鬆", { label: "doing", jyutping: "fong3 sung1", syntax: "verb action_verb", note: "relax; W17 lexicon expansion." }],
  ["傷心", { label: "like", jyutping: "soeng1 sam1", syntax: "stative_predicate emotion_state_stative", note: "sad/heartbroken; W17 lexicon expansion." }],
  ["唔鍾意", { label: "like", jyutping: "m4 zung1 ji3", syntax: "negative_preference_phrase compositional_lexicon_entry", note: "dislike/not like; registered from W17 but forced to tokenize as 唔 + 鍾意 so negation and preference remain transparent." }],
  ["興奮", { label: "like", jyutping: "hing1 fan5", syntax: "stative_predicate emotion_state_stative", note: "excited; W17 lexicon expansion." }],
  ["孤獨", { label: "like", jyutping: "gu1 duk6", syntax: "stative_predicate emotion_state_stative", note: "lonely; W17 lexicon expansion." }],
  ["滿足", { label: "like", jyutping: "mun5 zuk1", syntax: "stative_predicate emotion_state_stative", note: "satisfied; W17 lexicon expansion." }],
  ["驕傲", { label: "like", jyutping: "giu1 ngou6", syntax: "stative_predicate emotion_state_stative", note: "proud/arrogant depending on context; W17 lexicon expansion." }],
  ["嫉妒", { label: "doing", jyutping: "zat6 dou3", syntax: "mental_state_verb cognition_predicate", note: "be jealous/envious; learner-visible verb role doing, with mental-state class internal." }],
  ["焦慮", { label: "like", jyutping: "ziu1 leoi6", syntax: "stative_predicate emotion_state_stative", note: "anxious; W17 lexicon expansion." }],
  ["感激", { label: "doing", jyutping: "gam2 gik1", syntax: "mental_state_verb cognition_predicate", note: "feel grateful/appreciative; learner-visible verb role doing." }],
  ["慚愧", { label: "like", jyutping: "caam4 kwai5", syntax: "stative_predicate emotion_state_stative", note: "ashamed; W17 lexicon expansion." }],
  ["害怕", { label: "doing", jyutping: "hoi6 paa3", syntax: "mental_state_verb cognition_predicate", note: "fear/be afraid of; learner-visible verb role doing." }],
  ["感恩", { label: "doing", jyutping: "gam2 jan1", syntax: "mental_state_verb cognition_predicate", note: "feel thankful/grateful; learner-visible verb role doing." }],
  ["好奇", { label: "like", jyutping: "hou2 kei4", syntax: "stative_predicate emotion_state_stative", note: "curious; W17 source reading retained for review." }],
  ["樂觀", { label: "like", jyutping: "lok6 gun1", syntax: "stative_predicate emotion_state_stative", note: "optimistic; W17 lexicon expansion." }],

  // Authorized Glossika Week 16 hobbies/free-time lexical slice. These entries add lexical
  // and pronunciation coverage only; they license no new construction or productivity claim.
  ["游", { label: "doing", jyutping: "jau4", syntax: "verb swimming_verb action_verb", note: "swim; component of 游水." }],
  ["跑", { label: "doing", jyutping: "paau2", syntax: "verb running_verb action_verb", note: "run; component of 跑步." }],
  ["步", { label: "what", jyutping: "bou6", syntax: "step_noun activity_object", note: "step / running activity element in 跑步." }],
  ["影", { label: "doing", jyutping: "jing2", syntax: "verb photographing_verb transitive_affordance", note: "photograph / take a photo." }],
  ["相", { label: "what", jyutping: "soeng2", syntax: "photograph_noun object_np", note: "photograph / photo." }],
  ["唱", { label: "doing", jyutping: "coeng3", syntax: "verb singing_verb transitive_affordance", note: "sing." }],
  ["K", { label: "what", jyutping: "kei1", syntax: "code_switched_karaoke_object latin_abbreviation", note: "pronounced letter name in 唱K / karaoke." }],
  ["街", { label: "where", jyutping: "gaai1", syntax: "place_np street_noun", note: "street; part of the conventional activity 行街." }],
  ["行街", { label: "doing", jyutping: "haang4 gaai1", syntax: "verb activity_predicate shopping_browsing_activity", note: "go shopping / browse shops." }],
  ["沙灘", { label: "where", jyutping: "saa1 taan1", syntax: "place_np destination_np beach_place", note: "beach; preserves 去 + 沙灘 as transparent motion plus destination." }],
  ["踢", { label: "doing", jyutping: "tek3", syntax: "verb kicking_verb transitive_affordance", note: "kick / play a kicking sport." }],
  ["波", { label: "what", jyutping: "bo1", syntax: "ball_or_sport_noun object_np", note: "ball / ball game depending on context." }],
  ["彈", { label: "doing", jyutping: "taan4", syntax: "verb instrument_playing_verb transitive_affordance", note: "play a musical instrument." }],
  ["琴", { label: "what", jyutping: "kam4", syntax: "musical_instrument_noun object_np", note: "piano or stringed keyboard instrument depending on context." }],
  ["釣", { label: "doing", jyutping: "diu3", syntax: "verb fishing_verb transitive_affordance", note: "fish / angle for." }],
  ["旅行", { label: "doing", jyutping: "leoi5 hang4", syntax: "verb activity_predicate travel_activity", note: "travel / take a trip." }],
  ["瑜伽", { label: "what", jyutping: "jyu4 gaa1", syntax: "activity_noun exercise_activity", note: "yoga; nominal activity entry, not silently converted into a verb." }],
  ["露營", { label: "doing", jyutping: "lou6 jing4", syntax: "verb activity_predicate camping_activity", note: "camp / go camping." }],
  ["棋", { label: "what", jyutping: "kei2", syntax: "board_game_noun object_np", note: "chess / board-game piece or game depending on context." }],
  ["行公園", { label: "doing", jyutping: "haang4 gung1 jyun2", syntax: "verb activity_predicate park_walking_activity", note: "walk in the park; kept as the source-listed conventional activity rather than a literal object relation." }],

  // Glossika Week 16 million expressions are registered but remain compositionally visible.
  ["一百萬", { label: "how", jyutping: "jat1 baak3 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "1 million; authorized Glossika Week 16 number lexicon." }],
  ["二百萬", { label: "how", jyutping: "ji6 baak3 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "2 million; authorized Glossika Week 16 number lexicon." }],
  ["三百萬", { label: "how", jyutping: "saam1 baak3 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "3 million; authorized Glossika Week 16 number lexicon." }],
  ["四百萬", { label: "how", jyutping: "sei3 baak3 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "4 million; authorized Glossika Week 16 number lexicon." }],
  ["五百萬", { label: "how", jyutping: "ng5 baak3 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "5 million; authorized Glossika Week 16 number lexicon." }],
  ["六百萬", { label: "how", jyutping: "luk6 baak3 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "6 million; authorized Glossika Week 16 number lexicon." }],
  ["七百萬", { label: "how", jyutping: "cat1 baak3 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "7 million; authorized Glossika Week 16 number lexicon." }],
  ["八百萬", { label: "how", jyutping: "baat3 baak3 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "8 million; authorized Glossika Week 16 number lexicon." }],
  ["九百萬", { label: "how", jyutping: "gau2 baak3 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "9 million; authorized Glossika Week 16 number lexicon." }],

  // W17 large-number entries are registered as lexical data but forced to remain compositionally visible.
  ["一千萬", { label: "how", jyutping: "jat1 cin1 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "10 million; W17 number lexicon." }],
  ["二千萬", { label: "how", jyutping: "ji6 cin1 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "20 million; W17 number lexicon." }],
  ["三千萬", { label: "how", jyutping: "saam1 cin1 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "30 million; W17 number lexicon." }],
  ["四千萬", { label: "how", jyutping: "sei3 cin1 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "40 million; W17 number lexicon." }],
  ["五千萬", { label: "how", jyutping: "ng5 cin1 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "50 million; W17 number lexicon." }],
  ["六千萬", { label: "how", jyutping: "luk6 cin1 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "60 million; W17 number lexicon." }],
  ["七千萬", { label: "how", jyutping: "cat1 cin1 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "70 million; W17 number lexicon." }],
  ["八千萬", { label: "how", jyutping: "baat3 cin1 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "80 million; W17 number lexicon." }],
  ["九千萬", { label: "how", jyutping: "gau2 cin1 maan6", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "90 million; W17 number lexicon." }],
  ["一億", { label: "how", jyutping: "jat1 jik1", syntax: "quantity count_value large_numeral compositional_lexicon_entry", note: "100 million; W17 number lexicon." }],
  ["千", { label: "how", jyutping: "cin1", syntax: "quantity numeric_unit thousand_unit", note: "thousand; numeric unit added for transparent W17 large-number tokenization." }],
  ["萬", { label: "how", jyutping: "maan6", syntax: "quantity numeric_unit ten_thousand_unit", note: "ten thousand; numeric unit added for transparent W17 large-number tokenization." }],
  ["億", { label: "how", jyutping: "jik1", syntax: "quantity numeric_unit hundred_million_unit", note: "hundred million; numeric unit added for transparent W17 large-number tokenization." }],

  // First bounded functional-corpus lexical slice.
  ["離題", { label: "doing", jyutping: "lei4 tai4", syntax: "verb topic_management_verb", note: "go off topic; W17 COR-002 lexical coverage." }],
  ["關於", { label: "func", jyutping: "gwaan1 jyu1", syntax: "relational_topic_coverb discourse_topic_marker", note: "regarding/about; W17 COR-003 lexical coverage." }],
  ["對於", { label: "func", jyutping: "deoi3 jyu1", syntax: "relational_topic_coverb discourse_topic_marker", note: "regarding/concerning; formal explicit topic-frame linker distinct from bare 對." }],
  ["OT", { label: "doing", jyutping: "ou1 ti1", syntax: "borrowed_verb overtime_verb code_switched", note: "work overtime; W17 COR-016 Hong Kong code-switching." }],
  ["夜", { label: "like", jyutping: "je6", syntax: "stative_predicate late_time_property", note: "late in degree-predicate uses such as 好夜; broader time-noun readings remain context-dependent." }],

  // W17 coverb/preposition additions not already present in the authoritative core lexicon.
  ["對", { label: "func", jyutping: "deoi3", syntax: "relational_coverb", note: "toward/regarding; construction determines the following participant/domain relation." }],
  ["除咗", { label: "func", jyutping: "ceoi4 zo2", syntax: "complex_preposition exclusion_marker", note: "except/apart from; W17 coverb/preposition expansion." }],

  // W17 phonics additions. Ambiguous noun/verb items keep one conservative lexical default; sentence constructions may override it.
  ["蘇", { label: "who", jyutping: "sou1", syntax: "surname_proper_name verb_ambiguous", note: "Su as a surname; verb sense 'revive' remains context-dependent." }],
  ["祖", { label: "who", jyutping: "zou2", syntax: "kinship_ancestor_noun person_np", note: "ancestor; W17 phonics expansion." }],
  ["全", { label: "like", jyutping: "cyun4", syntax: "stative_predicate completeness_property", note: "whole/complete; W17 phonics expansion." }],
  ["存", { label: "doing", jyutping: "cyun4", syntax: "verb existence_storage_verb", note: "store/exist; W17 phonics expansion." }],
  ["如", { label: "func", jyutping: "jyu4", syntax: "verb_conjunction comparison_or_condition_marker", note: "if/like/as; multifunctional and context-dependent." }],
  ["油", { label: "what", jyutping: "jau4", syntax: "object_np substance_noun", note: "oil; W17 phonics expansion." }],
  ["血", { label: "what", jyutping: "hyut3", syntax: "object_np substance_noun", note: "blood; W17 phonics expansion." }],
  ["闊", { label: "like", jyutping: "fut3", syntax: "stative_predicate width_property", note: "wide; W17 reading corrected to fut3." }],
  ["聯", { label: "doing", jyutping: "lyun4", syntax: "verb connection_verb", note: "connect/unite; W17 phonics expansion." }],
  ["論", { label: "what", jyutping: "leon6", syntax: "noun_verb discussion_or_theory", note: "theory/discussion; verb sense 'discuss' remains context-dependent." }],
];
