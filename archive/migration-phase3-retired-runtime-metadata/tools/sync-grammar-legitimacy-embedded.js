#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const mainPath = path.join(root, "main.js");
const auditPath = path.join(root, "test-data", "grammar-legitimacy-audit.json");
const audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));
const embedded = Object.fromEntries((audit.patterns || []).map((row) => {
  const {
    audit_trigger,
    audit_note,
    native_naturalness_sentence_ids,
    ...runtimeFields
  } = row;
  return [row.pattern, runtimeFields];
}));

const source = fs.readFileSync(mainPath, "utf8");
const replacement = `const GRAMMAR_LEGITIMACY_BY_CONSTRUCTION = Object.freeze(${JSON.stringify(embedded)});`;
const pattern = /^const GRAMMAR_LEGITIMACY_BY_CONSTRUCTION = Object\.freeze\(.+\);$/m;
if (!pattern.test(source)) throw new Error("embedded grammar-legitimacy registry declaration not found");
const updated = source.replace(pattern, replacement);
const apply = process.argv.includes("--apply-runtime-metadata");
if (apply) fs.writeFileSync(mainPath, updated);
console.log(JSON.stringify({
  runtime_version: audit.runtime_version,
  embedded_pattern_count: Object.keys(embedded).length,
  main_path: path.relative(root, mainPath),
  mode: apply ? "APPLIED" : "DRY_RUN_NO_WRITE",
  instruction: apply ? "Runtime metadata updated; rerun all runtime and package gates." : "No file changed. Pass --apply-runtime-metadata only in a new runtime candidate after freezing the intended metadata change.",
}, null, 2));
