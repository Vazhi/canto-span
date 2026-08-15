"use strict";

// General lexical coverage discovered while auditing ranked lexical ingestions.
// These are independently sourced lexemes or attested orthographic variants,
// not promotions merely because a longer frequency-list surface contains them.
module.exports = [
  ["刻", {
    label: "when",
    jyutping: "hak1",
    syntax: "time_head temporal nominal_measure_unit",
    note: "moment / quarter-hour time unit; independently attested by 粵典 (words.hk) and 粵音資料集叢, added because the reviewed lexicalized surface 一刻 exposed a missing component lexeme.",
  }],
  ["遇", {
    label: "doing",
    jyutping: "jyu6",
    syntax: "verb transitive_affordance encounter_verb",
    note: "meet / encounter; independently attested Cantonese verbal root, added because the reviewed lexicalized surface 遇到 exposed a missing component lexeme.",
  }],
  ["爸", {
    label: "who",
    pos: "noun",
    jyutping: "baa4",
    syntax: "kinship_person_np kinship_term",
    note: "dad / father; ordinary vernacular Cantonese reading baa4. The source Sheet's standalone ba1 value is not used as runtime authority.",
  }],
  ["阿爸", {
    label: "who",
    pos: "noun",
    jyutping: "aa3 baa4",
    syntax: "kinship_person_np kinship_term",
    note: "dad / father; independently verified familiar Cantonese kinship term.",
  }],
  ["打算", {
    label: "doing",
    pos: "verb",
    jyutping: "daa2 syun3",
    syntax: "verb intention_verb",
    note: "intend / plan; independently verified Cantonese whole lexical verb. Nominal plan/intention use will be reviewed separately rather than blocking default lexical coverage.",
  }],
  ["由於", {
    label: "func",
    pos: "preposition",
    jyutping: "jau4 jyu1",
    syntax: "causal_relation_preposition causal_connector",
    note: "because of / due to; independently verified fixed Cantonese causal relation expression.",
  }],
  ["我地", {
    label: "who",
    pos: "pronoun",
    jyutping: "ngo5 dei6",
    syntax: "subject_or_topic",
    note: "Informal orthographic variant of 我哋 'we/us'; attested separately in the bounded vernacular source. Canonical spelling remains 我哋.",
  }],
  ["你地", {
    label: "who",
    pos: "pronoun",
    jyutping: "nei5 dei6",
    syntax: "subject_or_topic",
    note: "Informal orthographic variant of 你哋 'you (plural)'; attested in vernacular transcript data. Canonical spelling remains 你哋.",
  }],
  ["佢地", {
    label: "who",
    pos: "pronoun",
    jyutping: "keoi5 dei6",
    syntax: "subject_or_topic",
    note: "Informal orthographic variant of 佢哋 'they/them'; attested separately in the bounded vernacular source. Canonical spelling remains 佢哋.",
  }],
  ["定係", {
    label: "func",
    pos: "conjunction",
    jyutping: "ding6 hai6",
    syntax: "alternative_connector",
    note: "Cantonese disjunctive conjunction 'or', used to connect alternatives; independently verified against 粵典.",
  }],
  ["先至", {
    label: "how",
    pos: "adverb",
    jyutping: "sin1 zi3",
    syntax: "sequence_prerequisite_adverb",
    note: "only then / not until; links a prerequisite event to a following event; independently verified against 粵典.",
  }],
  ["嘅話", {
    label: "func",
    pos: "conjunction",
    jyutping: "ge3 waa2",
    syntax: "conditional_clause_suffix_connector",
    note: "post-clausal Cantonese conditional conjunction 'if'; ge3 waa2 is the default reading and ge3 waa6 is independently attested as a reading variant.",
  }],
];
