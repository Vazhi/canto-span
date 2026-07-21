#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadConstructionNotes } = require("./construction-notes-lib");
const { evaluatePromotion, countVerifiedSourceRecords } = require("./promotion-gate-lib");

const root = path.resolve(__dirname, "..");
const notes = loadConstructionNotes(root);
const results = notes.map(evaluatePromotion);
const failures = [];

for (let index = 0; index < notes.length; index += 1) {
  const note = notes[index];
  const fm = note.frontmatter;
  const result = results[index];
  const verificationCount = countVerifiedSourceRecords(note);

  if (Number(fm.verified_source_count) !== verificationCount) {
    result.blockers.push(`verified_source_count_mismatch:${fm.verified_source_count}!=${verificationCount}`);
  }
  if (Number(fm.independent_speaker_count) !== Number(fm.speaker_count)) {
    result.blockers.push(`speaker_count_mismatch:${fm.independent_speaker_count}!=${fm.speaker_count}`);
  }
  if (fm.promotion_gate_version !== "v1") {
    result.blockers.push(`unsupported_promotion_gate_version:${String(fm.promotion_gate_version)}`);
  }

  result.eligible = result.blockers.length === 0 && ["supported_productive", "provisional"].includes(fm.status);
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
  schema: "canto-span-promotion-gate-v1",
  construction_notes: notes.length,
  status_counts: statusCounts,
  gate_counts: gateCounts,
  promoted_status_records: promoted.length,
  eligible_promoted_status_records: promoted.filter((result) => result.eligible).length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};

const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const outDir = path.join(root, "validation", `v${manifest.version}`);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "promotion-gate.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
