"use strict";

const reviewed = require("./cifu-r501-750-reviewed");

const SOURCE_R1 = "docs/research/ISSUE-866-CIFU-R501-750-LEXICAL-ADJUDICATION-R1.md";
const SOURCE_R2 = "docs/research/ISSUE-866-CIFU-R501-750-LEXICAL-ADJUDICATION-R2.md";
const EXTRA_CANDIDATE_ONLY_SURFACES = new Set(["跟"]);
const EFFECTIVE_CANDIDATE_ONLY_SURFACES = new Set([
  ...reviewed.CANDIDATE_ONLY_SURFACES,
  ...EXTRA_CANDIDATE_ONLY_SURFACES,
]);

const DEFAULT_READING_OVERRIDES = Object.freeze({
  "着": Object.freeze({ jyutping: "zoek3", source: SOURCE_R1 }),
  "轉彎": Object.freeze({ jyutping: "zyun3 waan1", source: SOURCE_R2 }),
  "直行": Object.freeze({ jyutping: "zik6 haang4", source: SOURCE_R2 }),
});

function applyRuntimePolicy(entries) {
  const adjudicated = reviewed.applyReviewedEntries(entries);
  return adjudicated.map(([surface, entry]) => {
    const override = DEFAULT_READING_OVERRIDES[surface];
    if (!override || !reviewed.isNeutralLexicalEntry(entry)) return [surface, entry];
    return [surface, {
      ...entry,
      jyutping: override.jyutping,
      note: `${entry.note || "Exact surface retained as neutral lexical coverage."} Reviewed whole-form alternatives remain explicit while default tokenization stays neutral.`,
      provenance: {
        kind: "reviewed_candidate_default_pronunciation",
        source: override.source,
        pronunciation_status: "reviewed_default_reading_without_atomic_pos_promotion",
        prior_provenance: entry.provenance || null,
      },
    }];
  });
}

module.exports = Object.freeze({
  SOURCE_R1,
  SOURCE_R2,
  EXTRA_CANDIDATE_ONLY_SURFACES,
  EFFECTIVE_CANDIDATE_ONLY_SURFACES,
  DEFAULT_READING_OVERRIDES,
  applyRuntimePolicy,
});
