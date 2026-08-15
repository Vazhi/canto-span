"use strict";

const reviewed = require("./cifu-r1751-2000-reviewed");

// No whole-surface removal is authorized in this band. The explicit Mandarin
// contamination attached to 校 and 嘴 is analysis-level metadata only; both
// surfaces have independently reviewed Cantonese lexical analyses. 在 likewise
// retains only the reviewed formal locative relation, not Mandarin progressive 在+VP.
const MANDARIN_ONLY_SURFACES = new Set();

function applyRuntimePolicy(entries) {
  return reviewed.applyReviewedEntries(entries)
    .filter(([surface]) => !MANDARIN_ONLY_SURFACES.has(surface));
}

module.exports = Object.freeze({
  SOURCE: reviewed.SOURCE,
  PROMOTIONS: reviewed.PROMOTIONS,
  RESEARCH_REQUIRED_SURFACES: reviewed.RESEARCH_REQUIRED_SURFACES,
  BLOCKED_ATOMIC_SURFACES: reviewed.BLOCKED_ATOMIC_SURFACES,
  CANDIDATE_ONLY_SURFACES: reviewed.CANDIDATE_ONLY_SURFACES,
  DEFAULT_READING_OVERRIDES: reviewed.DEFAULT_READING_OVERRIDES,
  MANDARIN_ONLY_SURFACES,
  applyRuntimePolicy,
});
