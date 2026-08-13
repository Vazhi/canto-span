"use strict";

const CIFU_R1_250_REVIEWED = require("./cifu-r1-250-reviewed");

module.exports = [
  // Neutral frequency-list coverage fills otherwise-missing exact surfaces only.
  // Later typed/reviewed entries must win for an identical surface.
  ...require("./frequency-gap-fill-r7"),
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
