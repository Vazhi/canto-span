"use strict";

const model = require("./unit-word-evidence.json");

const rules = Object.fromEntries(
  model.noun_choice_rule_records.map((record) => [
    record.surface,
    Object.freeze(record.current_head_classes.slice()),
  ]),
);

module.exports = Object.freeze(rules);
