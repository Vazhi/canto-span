"use strict";

const CIFU_R1_250_REVIEWED = require("./cifu-r1-250-reviewed");

const TYPED_AND_REVIEWED_ENTRIES = [
  ...require("./people-and-address"),
  ...require("./referents-and-boundaries"),
  ...require("./things"),
  ...require("./places-and-times"),
  ...require("./verbs"),
  ...require("./statives"),
  ...require("./function-words-and-particles"),
  ...require("./degree-and-formulas"),
  ...require("./study-suite"),
  ...CIFU_R1_250_REVIEWED.entries,
];
const TYPED_AND_REVIEWED_SURFACES = new Set(TYPED_AND_REVIEWED_ENTRIES.map(([surface]) => surface));
const NEUTRAL_FREQUENCY_COVERAGE = require("./frequency-gap-fill-r7")
  .filter(([surface]) => !TYPED_AND_REVIEWED_SURFACES.has(surface));

module.exports = [
  // The generated frequency layer is genuinely fill-only: it preserves exact
  // top-2,000 surface coverage only where no typed/reviewed runtime entry exists.
  // Existing intentional duplicates inside the typed modules remain unchanged.
  ...NEUTRAL_FREQUENCY_COVERAGE,
  ...TYPED_AND_REVIEWED_ENTRIES,
];
