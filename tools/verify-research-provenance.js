#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { auditResearchProvenance } = require("./research-provenance-lib");
const { currentValidationPath } = require("./validation-paths");

const root = path.resolve(__dirname, "..");
const report = auditResearchProvenance(root);
fs.writeFileSync(currentValidationPath(root, "research-provenance.json"), JSON.stringify(report, null, 2) + "\n");
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
