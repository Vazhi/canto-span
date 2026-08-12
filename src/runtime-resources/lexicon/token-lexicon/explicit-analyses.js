"use strict";

// Explicitly polyfunctional lexical analyses already represented by
// bounded contextual behavior in the runtime. This registry preserves
// all supported analyses without forcing one global POS/reading.
module.exports = Object.freeze({
  "住": Object.freeze([
    Object.freeze({
      id: "lex:住:residence_verb",
      label: "doing",
      pos: "verb",
      jyutping: "zyu6",
      syntax: "verb residence_verb",
      senses: Object.freeze([{ gloss: "live / reside / stay" }]),
      provenance: Object.freeze({ kind: "existing_runtime_contextual_override", source: "src/parser/tokenization/contextual-overrides.js" }),
    }),
    Object.freeze({
      id: "lex:住:durative_marker",
      label: "func",
      pos: "particle",
      jyutping: "zyu6",
      syntax: "durative_or_continuing_state_marker",
      senses: Object.freeze([{ gloss: "durative / continuing-state marker" }]),
      provenance: Object.freeze({ kind: "existing_runtime_contextual_override", source: "src/parser/tokenization/contextual-overrides.js" }),
    }),
  ]),
  "定": Object.freeze([
    Object.freeze({
      id: "lex:定:decide_fix_verb",
      label: "doing",
      pos: "verb",
      jyutping: "ding6",
      syntax: "verb decide_fix_schedule_verb",
      senses: Object.freeze([{ gloss: "decide / settle / fix / schedule" }]),
      provenance: Object.freeze({ kind: "existing_runtime_contextual_override", source: "src/parser/tokenization/contextual-overrides.js" }),
    }),
    Object.freeze({
      id: "lex:定:alternative_connector",
      label: "func",
      pos: "function",
      jyutping: "ding6",
      syntax: "alternative_question_connector",
      senses: Object.freeze([{ gloss: "or; alternative-question connector" }]),
      provenance: Object.freeze({ kind: "existing_runtime_contextual_override", source: "src/parser/tokenization/contextual-overrides.js" }),
    }),
  ]),
  "咪": Object.freeze([
    Object.freeze({
      id: "lex:咪:prohibitive_marker",
      label: "func",
      pos: "function",
      jyutping: "mai5",
      syntax: "prohibitive_marker",
      senses: Object.freeze([{ gloss: "don't; prohibitive marker" }]),
      provenance: Object.freeze({ kind: "existing_runtime_contextual_override", source: "src/parser/tokenization/contextual-overrides.js" }),
    }),
    Object.freeze({
      id: "lex:咪:discourse_focus_marker",
      label: "func",
      pos: "function",
      jyutping: "mai6",
      syntax: "discourse_focus_marker",
      senses: Object.freeze([{ gloss: "discourse / focus marker" }]),
      provenance: Object.freeze({ kind: "existing_runtime_contextual_override", source: "src/parser/tokenization/contextual-overrides.js" }),
    }),
  ]),
});
