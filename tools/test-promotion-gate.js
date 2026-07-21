#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { evaluatePromotion } = require("./promotion-gate-lib");

const root = path.resolve(__dirname, "..");
const cases = JSON.parse(fs.readFileSync(path.join(root, "test-data", "promotion-gate-v2.json"), "utf8"));
const base = cases[0].fields;
const results = [];
let failed = 0;

for (const item of cases) {
  const fm = { construction: item.name, status: item.status, ...base, ...(item.fields || {}), ...(item.overrides || {}) };
  const note = { frontmatter: fm, body: "## Plain-language claim\n\nA concrete checked claim.\n" };
  const result = evaluatePromotion(note);
  const checks = [result.eligible === item.expected_eligible];
  if (item.expected_blocker) checks.push(result.blockers.includes(item.expected_blocker));
  if (item.expected_blocker_prefix) checks.push(result.blockers.some((value) => value.startsWith(item.expected_blocker_prefix)));
  if (item.expected_gate_class) checks.push(result.gate_class === item.expected_gate_class);
  const pass = checks.every(Boolean);
  if (!pass) failed += 1;
  results.push({ name: item.name, pass, result });
}

const report = {
  schema: "canto-span-promotion-gate-tests-v2",
  total: results.length,
  passed: results.filter((result) => result.pass).length,
  failed,
  status: failed ? "FAIL" : "PASS",
  results,
};
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const outDir = path.join(root, "validation", `v${manifest.version}`);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "promotion-gate-tests.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failed) process.exit(1);
