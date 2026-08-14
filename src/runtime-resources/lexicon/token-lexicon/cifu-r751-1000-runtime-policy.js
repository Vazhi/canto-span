"use strict";

const reviewed = require("./cifu-r751-1000-reviewed");

function applyRuntimePolicy(entries) {
  return reviewed.applyReviewedEntries(entries);
}

module.exports = Object.freeze({
  SOURCE: reviewed.SOURCE,
  CANDIDATE_ONLY_SURFACES: reviewed.CANDIDATE_ONLY_SURFACES,
  BLOCKED_ATOMIC_SURFACES: reviewed.BLOCKED_ATOMIC_SURFACES,
  RESEARCH_REQUIRED_SURFACES: reviewed.RESEARCH_REQUIRED_SURFACES,
  DEFAULT_READING_OVERRIDES: reviewed.DEFAULT_READING_OVERRIDES,
  applyRuntimePolicy,
});
