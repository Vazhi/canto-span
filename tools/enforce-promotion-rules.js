#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadConstructionNotes } = require("./construction-notes-lib");
const {
  evaluatePromotion,
  sourceRecordSummary,
  requiresPromotionMetadata,
} = require("./promotion-gate-lib");

const root = path.resolve(__dirname, "..");
const outputIndex = process.argv.indexOf("--output");
const outputPath = outputIndex >= 0
  ? path.resolve(process.cwd(), process.argv[outputIndex + 1] || "")
  : null;
if (outputIndex >= 0 && !process.argv[outputIndex + 1]) {
  console.error("--output requires a file path");
  process.exit(2);
}
const notes = loadConstructionNotes(root);
const results = notes.map(evaluatePromotion);
const failures = [];

for (let index = 0; index < notes.length; index += 1) {
  const note = notes[index];
  const fm = note.frontmatter;
  const result = results[index];
  const promotionMetadataRequired = requiresPromotionMetadata(fm.status);

  if (promotionMetadataRequired) {
    const sourceSummary = sourceRecordSummary(note, root);
    if (sourceSummary.error) {
      result.blockers.push(sourceSummary.error);
    } else {
      if (Number(fm.source_count) !== sourceSummary.source_count) {
        result.blockers.push(`source_count_mismatch:${fm.source_count}!=${sourceSummary.source_count}`);
      }
      if (Number(fm.verified_source_count) !== sourceSummary.verified_source_count) {
        result.blockers.push(`verified_source_count_mismatch:${fm.verified_source_count}!=${sourceSummary.verified_source_count}`);
      }
    }

    const testFile = path.join(root, String(fm.standard_test_file || ""));
    if (!fs.existsSync(testFile)) {
      result.blockers.push(`missing_standard_test_file:${String(fm.standard_test_file)}`);
    } else {
      const testData = JSON.parse(fs.readFileSync(testFile, "utf8"));
      const coverage = testData.coverage || {};
      const boundaryCount = Number(coverage.boundary_case_count);
      const positiveCount = Number(coverage.positive_case_count);
      const executableCount = Number(coverage.executable_case_count);
      if (!Number.isFinite(boundaryCount)) result.blockers.push("missing_test_coverage_boundary_count");
      if (!Number.isFinite(positiveCount)) result.blockers.push("missing_test_coverage_positive_count");
      if (!Number.isFinite(executableCount)) result.blockers.push("missing_test_coverage_executable_count");
      if (Number(fm.standard_boundary_test_count) !== boundaryCount) result.blockers.push(`standard_boundary_test_count_mismatch:${fm.standard_boundary_test_count}!=${boundaryCount}`);
      if (Number(fm.standard_positive_test_count) !== positiveCount) result.blockers.push(`standard_positive_test_count_mismatch:${fm.standard_positive_test_count}!=${positiveCount}`);
      if (Number(fm.standard_executable_test_count) !== executableCount) result.blockers.push(`standard_executable_test_count_mismatch:${fm.standard_executable_test_count}!=${executableCount}`);
      if (fm.status === "supported_productive" && boundaryCount < 1) result.blockers.push("supported_productive_without_executable_boundary_cases");
    }
  }

  if (Number(fm.verified_source_count) > Number(fm.source_count)) result.blockers.push("verified_sources_exceed_cited_sources");
  if (fm.promotion_gate_version !== "v3") result.blockers.push(`unsupported_promotion_gate_version:${String(fm.promotion_gate_version)}`);

  result.eligible = result.blockers.length === 0 && requiresPromotionMetadata(fm.status);
  if (result.blockers.length) failures.push(result);
}

const statusCounts = {};
const gateCounts = {};
for (const result of results) {
  statusCounts[result.status] = (statusCounts[result.status] || 0) + 1;
  gateCounts[result.gate_class] = (gateCounts[result.gate_class] || 0) + 1;
}
const promoted = results.filter((result) => result.gate_class !== "quarantined");
const report = {
  schema: "canto-span-promotion-gate-v3",
  construction_notes: notes.length,
  status_counts: statusCounts,
  gate_counts: gateCounts,
  promoted_status_records: promoted.length,
  eligible_promoted_status_records: promoted.filter((result) => result.eligible).length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};
if (outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n");
}
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
