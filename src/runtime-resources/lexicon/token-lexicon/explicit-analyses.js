"use strict";

const { EXPLICIT_ANALYSES: REVIEWED_R251_500_ANALYSES } = require("./cifu-r251-500-reviewed");
const { EXPLICIT_ANALYSES: REVIEWED_R1_250_ANALYSES } = require("./cifu-r1-250-reviewed");
const { EXPLICIT_ANALYSES: REVIEWED_R1_250_CANDIDATE_DEFAULTS } = require("./cifu-r1-250-candidate-defaults");
const { EXPLICIT_ANALYSES: NATIVE_REVIEW_CORRECTIONS } = require("./native-review-corrections");
const { EXPLICIT_ANALYSIS_OVERRIDES: REVIEWED_R1_250_RUNTIME_POLICY } = require("./cifu-r1-250-runtime-policy");

// Explicitly polyfunctional lexical analyses represented by bounded contextual
// runtime behavior or finalized reviewed lexical adjudication. This registry
// preserves supported alternatives without forcing one global POS/reading.
const contextualAnalyses = Object.freeze({
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

const reviewedR1250Polyanalyses = Object.freeze(Object.fromEntries(
  Object.entries(REVIEWED_R1_250_ANALYSES).filter(([, rows]) => Array.isArray(rows) && rows.length >= 2)
));

module.exports = Object.freeze({
  ...contextualAnalyses,
  ...REVIEWED_R251_500_ANALYSES,
  ...reviewedR1250Polyanalyses,
  ...REVIEWED_R1_250_CANDIDATE_DEFAULTS,
  ...NATIVE_REVIEW_CORRECTIONS,
  ...REVIEWED_R1_250_RUNTIME_POLICY,
});
