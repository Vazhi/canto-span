#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { auditResearchProvenance } = require("./research-provenance-lib");
const { currentValidationPath } = require("./validation-paths");

const root = path.resolve(__dirname, "..");
const report = auditResearchProvenance(root);
fs.writeFileSync(currentValidationPath(root, "research-provenance.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (report.status !== "PASS") process.exit(1);
