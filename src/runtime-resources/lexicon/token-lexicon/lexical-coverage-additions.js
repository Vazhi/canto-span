"use strict";

// General lexical coverage discovered while auditing ranked lexical ingestions.
// These are independently sourced component lexemes, not promotions merely
// because a longer frequency-list surface contains them.
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
];
