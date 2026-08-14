"use strict";

const reviewed = require("./cifu-r501-750-reviewed");

const SOURCE = "docs/research/ISSUE-866-CIFU-R501-750-LEXICAL-ADJUDICATION-R2.md";
const EXTRA_CANDIDATE_ONLY_SURFACES = new Set(["跟"]);
const EFFECTIVE_CANDIDATE_ONLY_SURFACES = new Set([
  ...reviewed.CANDIDATE_ONLY_SURFACES,
  ...EXTRA_CANDIDATE_ONLY_SURFACES,
]);

const DEFAULT_READING_OVERRIDES = Object.freeze({
  "直行": "zik6 haang4",
});

function applyRuntimePolicy(entries) {
  const adjudicated = reviewed.applyReviewedEntries(entries);
  return adjudicated.map(([surface, entry]) => {
    const reading = DEFAULT_READING_OVERRIDES[surface];
    if (!reading || !reviewed.isNeutralLexicalEntry(entry)) return [surface, entry];
    return [surface, {
      ...entry,
      jyutping: reading,
      note: `${entry.note || "Exact surface retained as neutral lexical coverage."} R2 preserves a neutral whole-form default while independently supported reading/function alternatives remain explicit.`,
      provenance: {
        kind: "reviewed_candidate_default_pronunciation",
        source: SOURCE,
        pronunciation_status: "reviewed_default_reading_without_atomic_pos_promotion",
        prior_provenance: entry.provenance || null,
      },
    }];
  });
}

module.exports = Object.freeze({
  SOURCE,
  EXTRA_CANDIDATE_ONLY_SURFACES,
  EFFECTIVE_CANDIDATE_ONLY_SURFACES,
  DEFAULT_READING_OVERRIDES,
  applyRuntimePolicy,
});
