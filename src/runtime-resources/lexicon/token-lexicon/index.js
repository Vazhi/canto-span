"use strict";

const { applyReviewedEntries } = require("./cifu-r251-500-reviewed");

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

module.exports = applyReviewedEntries(baseEntries);
