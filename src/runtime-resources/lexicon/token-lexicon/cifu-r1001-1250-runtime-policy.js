"use strict";

const reviewed = require("./cifu-r1001-1250-reviewed");

function applyRuntimePolicy(entries) {
  return reviewed.applyReviewedEntries(entries);
}

module.exports = Object.freeze({
  SOURCE: reviewed.SOURCE,
  PROMOTIONS: reviewed.PROMOTIONS,
  SOURCE_ONLY_SURFACES: reviewed.SOURCE_ONLY_SURFACES,
  INDEPENDENT_ZERO_HIT_SURFACES: reviewed.INDEPENDENT_ZERO_HIT_SURFACES,
  BLOCKED_ATOMIC_SURFACES: reviewed.BLOCKED_ATOMIC_SURFACES,
  CANDIDATE_ONLY_SURFACES: reviewed.CANDIDATE_ONLY_SURFACES,
  DEFAULT_READING_OVERRIDES: reviewed.DEFAULT_READING_OVERRIDES,
  applyRuntimePolicy,
});
