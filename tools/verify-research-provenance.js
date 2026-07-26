#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { auditResearchProvenance } = require("./research-provenance-lib");

const root = path.resolve(__dirname, "..");
const outputIndex = process.argv.indexOf("--output");
const outputPath = outputIndex >= 0
  ? path.resolve(process.cwd(), process.argv[outputIndex + 1] || "")
  : null;
if (outputIndex >= 0 && !process.argv[outputIndex + 1]) {
  console.error("--output requires a file path");
  process.exit(2);
}

const report = auditResearchProvenance(root);
if (outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
}

const terminal = {
  schema: report.schema,
  package_count: report.package_count,
  known_weak_core_count: report.known_weak_core_count,
  error_count: report.error_count,
  warning_count: report.warning_count,
  status: report.status,
  errors: report.errors,
  warnings: report.warnings,
};
console.log(JSON.stringify(terminal, null, 2));
if (report.status !== "PASS") process.exit(1);
