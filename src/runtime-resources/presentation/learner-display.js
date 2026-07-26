"use strict";

module.exports = {
  learnerRoleLabels: ["who", "doing", "what", "where", "when", "why", "how", "like", "func", "particle", "measure_word", "neutral"],
  slotNameDisallowedPrefixes: [/^phase\d+_/, /^controlled_/],
  learnerDisplaySlotNames: [
  "action_verb",
  "beneficiary",
  "classifier",
  "degree",
  "demonstrative",
  "head_noun",
  "location",
  "main_verb",
  "modal",
  "modifier",
  "negator",
  "nominal_linker",
  "np",
  "object",
  "particle",
  "predicate",
  "quantity",
  "subject",
  "time",
  "topic",
  "vp",
  "wh_determiner",
],
  learnerDisplaySlotLabels: {
  classifier: "measure_word",
  quantity: "how",
},
};
