"use strict";

const { applyReviewedEntries: applyReviewedR251500Entries } = require("./cifu-r251-500-reviewed");
const { applyRuntimePolicy: applyReviewedR1250RuntimePolicy } = require("./cifu-r1-250-runtime-policy");
const { applyCandidateDefaultReadings } = require("./cifu-r1-250-candidate-defaults");
const { applyNativeReviewCorrections } = require("./native-review-corrections");
const { applyReviewedEntries: applyReviewedR501750Entries } = require("./cifu-r501-750-reviewed");

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

module.exports = applyReviewedR501750Entries(
  applyNativeReviewCorrections(
    applyCandidateDefaultReadings(
      applyReviewedR1250RuntimePolicy(applyReviewedR251500Entries(baseEntries))
    )
  )
);
