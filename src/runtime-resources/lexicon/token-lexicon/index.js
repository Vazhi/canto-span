"use strict";

const { applyReviewedEntries: applyReviewedR251500Entries } = require("./cifu-r251-500-reviewed");
const { applyReviewedEntries: applyReviewedR1250Entries } = require("./cifu-r1-250-reviewed");
const { applyCandidateDefaultReadings } = require("./cifu-r1-250-candidate-defaults");
const { applyNativeReviewCorrections } = require("./native-review-corrections");

const baseEntries = [
  ...require("./people-and-address"),
  ...require("./referents-and-boundaries"),
  ...require("./things"),
  ...require("./places-and-times"),
  ...require("./verbs"),
  ...require("./statives"),
  ...require("./function-words-and-particles"),
  ...require("./degree-and-formulas"),
  ...require("./study-suite"),
  ...require("./frequency-gap-fill-r7"),
];

module.exports = applyNativeReviewCorrections(
  applyCandidateDefaultReadings(
    applyReviewedR1250Entries(applyReviewedR251500Entries(baseEntries))
  )
);
