"use strict";

const reviewed = require("./cifu-r1501-1750-reviewed");

// Source metadata does not create a runtime exclusion taxonomy. The reviewed
// Cantonese authority decides which analyses are admitted; held rows simply
// receive no band-specific promotion.
function applyRuntimePolicy(entries) {
  return reviewed.applyReviewedEntries(entries);
}

module.exports = Object.freeze({
  SOURCE: reviewed.SOURCE,
  PROMOTIONS: reviewed.PROMOTIONS,
  RESEARCH_REQUIRED_SURFACES: reviewed.RESEARCH_REQUIRED_SURFACES,
  BLOCKED_ATOMIC_SURFACES: reviewed.BLOCKED_ATOMIC_SURFACES,
  CANDIDATE_ONLY_SURFACES: reviewed.CANDIDATE_ONLY_SURFACES,
  DEFAULT_READING_OVERRIDES: reviewed.DEFAULT_READING_OVERRIDES,
  applyRuntimePolicy,
});
