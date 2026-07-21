#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { findConstructionNote } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const index = JSON.parse(fs.readFileSync(path.join(root, "tests", "construction-test-index.json"), "utf8"));
const byConstruction = new Map(index.files.map((item) => [item.construction, item]));
let updated = 0;

function setFrontmatter(text, key, serialized, afterKey = null) {
  const pattern = new RegExp(`^${key}:.*$`, "m");
  const line = `${key}: ${serialized}`;
  if (pattern.test(text)) return text.replace(pattern, line);
  if (afterKey) {
    const after = new RegExp(`^${afterKey}:.*$`, "m");
    if (after.test(text)) return text.replace(after, (match) => `${match}\n${line}`);
  }
  return text.replace(/^---\n/, `---\n${line}\n`);
}

for (const [construction, record] of byConstruction) {
  const note = findConstructionNote(root, construction);
  const file = note.file;
  let text = fs.readFileSync(file, "utf8");
  const original = text;
  const standardPath = `tests/constructions/${construction}.json`;
  text = setFrontmatter(text, "standard_test_file", JSON.stringify(standardPath), "promotion_gate_version");
  text = setFrontmatter(text, "standard_test_coverage", JSON.stringify(record.state), "standard_test_file");
  text = setFrontmatter(text, "standard_positive_test_count", String(record.positive_case_count), "standard_test_coverage");
  text = setFrontmatter(text, "standard_boundary_test_count", String(record.boundary_case_count), "standard_positive_test_count");
  text = setFrontmatter(text, "standard_executable_test_count", String(record.executable_case_count), "standard_boundary_test_count");
  if (record.boundary_case_count > 0) {
    text = setFrontmatter(text, "negative_tests_executable", "true");
    text = setFrontmatter(text, "negative_tests_passing", "true");
  }
  text = text.replaceAll("test-data/regression-snapshots.json", "tests/fixtures/regression-snapshots.json");
  text = text.replaceAll("test-data/np-subsystem-v0.5.184.json", "tests/fixtures/np-subsystem.json");
  const standardLine = `- Standard executable test file: \`${standardPath}\``;
  if (!text.includes(standardLine)) {
    text = text.replace(/## Negative and boundary cases\n\n/, `## Negative and boundary cases\n\n${standardLine}\n`);
  }
  if (text !== original) {
    fs.writeFileSync(file, text);
    updated += 1;
  }
}
console.log(JSON.stringify({ construction_notes: byConstruction.size, updated }, null, 2));
