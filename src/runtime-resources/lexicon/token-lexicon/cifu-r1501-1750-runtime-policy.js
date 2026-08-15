"use strict";

const reviewed = require("./cifu-r1501-1750-reviewed");

// No whole-surface removal is authorized in this band. Cifu Mandarin markers at
// 罷 and 響 are source-metadata contamination only; independently valid Cantonese
// coverage remains. The held 罷 row receives no band-specific typing here.
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
