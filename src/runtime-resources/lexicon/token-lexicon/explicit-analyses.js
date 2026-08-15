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
  "咧": Object.freeze([
    Object.freeze({
      id: "lex:咧:proposal_particle_le4",
      label: "func",
      pos: "particle",
      jyutping: "le4",
      syntax: "sentence_final_proposal_or_consent_particle",
      senses: Object.freeze([{ gloss: "sentence-final particle seeking consent / proposing a course of action" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: "Most Common Cantonese Words (Frequency List) + Cantonese dictionary cross-check" }),
    }),
    Object.freeze({
      id: "lex:咧:agreement_particle_le5",
      label: "func",
      pos: "particle",
      jyutping: "le5",
      syntax: "sentence_final_agreement_or_confirmation_particle",
      senses: Object.freeze([{ gloss: "sentence-final particle inviting agreement / confirming an observation" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: "Most Common Cantonese Words (Frequency List) + Cantonese dictionary cross-check" }),
    }),
  ]),
});

const reviewedR1250Polyanalyses = Object.freeze(Object.fromEntries(
  Object.entries(REVIEWED_R1_250_ANALYSES).filter(([, rows]) => Array.isArray(rows) && rows.length >= 2)
));

const VERNACULAR_SOURCE = "Most Common Cantonese Words (Frequency List) + Cantonese dictionary cross-check";
const vernacularSourceAnalyses = Object.freeze({
  "嘅": Object.freeze([
    ...(REVIEWED_R1_250_ANALYSES["嘅"] || []),
    Object.freeze({
      id: "lex:嘅:doubt_question_particle_ge2",
      label: "particle",
      pos: "particle",
      jyutping: "ge2",
      syntax: "sentence_final_doubt_or_question_particle",
      senses: Object.freeze([{ gloss: "sentence-final particle marking doubt, surprise, or a why/how question" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
  ]),
  "呀": Object.freeze([
    Object.freeze({
      id: "lex:呀:softening_particle_aa3",
      label: "particle",
      pos: "particle",
      jyutping: "aa3",
      syntax: "sentence_final_softening_particle",
      senses: Object.freeze([{ gloss: "sentence-final softening / ordinary final particle" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
    Object.freeze({
      id: "lex:呀:surprise_interjection_aa1",
      label: "particle",
      pos: "interjection",
      jyutping: "aa1",
      syntax: "surprise_or_pain_interjection",
      senses: Object.freeze([{ gloss: "ah / oh; interjection expressing surprise or pain" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
  ]),
  "會": Object.freeze((REVIEWED_R1_250_ANALYSES["會"] || []).map((row) => {
    if (row.id !== "lex:會:meeting_noun") return row;
    return Object.freeze({
      ...row,
      jyutping: "wui2",
      provenance: Object.freeze({
        kind: "external_vernacular_reading_correction",
        source: VERNACULAR_SOURCE,
        prior_source: row.provenance && row.provenance.source || "",
      }),
    });
  })),
});

module.exports = Object.freeze({
  ...contextualAnalyses,
  ...REVIEWED_R251_500_ANALYSES,
  ...reviewedR1250Polyanalyses,
  ...REVIEWED_R1_250_CANDIDATE_DEFAULTS,
  ...NATIVE_REVIEW_CORRECTIONS,
  ...REVIEWED_R1_250_RUNTIME_POLICY,
  ...vernacularSourceAnalyses,
});
