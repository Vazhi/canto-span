"use strict";

const reviewed = require("./cifu-r1751-2000-reviewed");
const MANDARIN_ONLY_SURFACES = new Set();
function applyRuntimePolicy(entries) { return reviewed.applyReviewedEntries(entries).filter(([surface]) => !MANDARIN_ONLY_SURFACES.has(surface)); }
module.exports = Object.freeze({ SOURCE: reviewed.SOURCE, PROMOTIONS: reviewed.PROMOTIONS, RESEARCH_REQUIRED_SURFACES: reviewed.RESEARCH_REQUIRED_SURFACES, BLOCKED_ATOMIC_SURFACES: reviewed.BLOCKED_ATOMIC_SURFACES, CANDIDATE_ONLY_SURFACES: reviewed.CANDIDATE_ONLY_SURFACES, DEFAULT_READING_OVERRIDES: reviewed.DEFAULT_READING_OVERRIDES, MANDARIN_ONLY_SURFACES, applyRuntimePolicy });
