"use strict";

// General lexical coverage discovered while auditing ranked lexical ingestions.
// These are independently sourced lexemes, not promotions merely because a
// longer frequency-list surface contains them.
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
];
