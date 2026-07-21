#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { normalizeResponses, responsesToTsv } = require("./native-review-lib");

function argument(name) {
  const position = process.argv.indexOf(name);
  return position >= 0 ? process.argv[position + 1] : null;
}

const formId = argument("--form");
const csvPath = argument("--csv");
const outPath = argument("--out");
if (!formId || !csvPath || !outPath) {
  console.error("Usage: node tools/import-native-review-csv.js --form FORM_ID --csv RESPONSES.csv --out OUTPUT_DIR");
  process.exit(2);
}

const root = path.resolve(__dirname, "..");
const csvText = fs.readFileSync(path.resolve(csvPath), "utf8").replace(/^\uFEFF/, "");
const normalized = normalizeResponses(root, formId, csvText);
const outputDir = path.resolve(outPath);
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "responses.json"), JSON.stringify(normalized, null, 2) + "\n");
fs.writeFileSync(path.join(outputDir, "responses.tsv"), responsesToTsv(normalized));
const summary = {
  schema: "canto-span-native-review-response-summary-v1",
  form_id: normalized.form_id,
  construction: normalized.construction,
  response_count: normalized.response_count,
  eligible_for_manual_adjudication_count: normalized.eligible_for_manual_adjudication_count,
  counted_independent_speaker_count: 0,
  note: "Normalization never counts a speaker automatically. Duplicate screening and manual adjudication remain required.",
};
fs.writeFileSync(path.join(outputDir, "summary.json"), JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));
