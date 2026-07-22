#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { LINGUISTIC_STATUSES, loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const runtimeVersion = process.argv[2] || JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8")).version;
const relativeOutput = process.argv[3] || `data/release-baselines/v${runtimeVersion}-construction-statuses.json`;
if (!/^\d+\.\d+\.\d+$/.test(runtimeVersion)) throw new Error("Runtime version must be plain semantic versioning, e.g. 0.5.207.");
if (path.isAbsolute(relativeOutput) || relativeOutput.split(/[\\/]/).includes("..") || !relativeOutput.replace(/\\/g, "/").startsWith("data/release-baselines/")) {
  throw new Error("Output path must remain under data/release-baselines/ and may not contain '..'.");
}
const outputPath = path.resolve(root, relativeOutput);
if (!outputPath.startsWith(root + path.sep)) throw new Error("Output path resolves outside repository.");

const notes = loadConstructionNotes(root);
const statuses = notes.map((note) => ({
  construction: note.frontmatter.construction,
  status: note.frontmatter.status,
}));
const statusCounts = Object.fromEntries(LINGUISTIC_STATUSES.map((status) => [status, 0]));
for (const item of statuses) statusCounts[item.status] += 1;

const snapshot = {
  schema: "canto-span-construction-status-baseline-v1",
  runtime_version: runtimeVersion,
  construction_count: statuses.length,
  status_counts: statusCounts,
  statuses,
};
const content = JSON.stringify(snapshot, null, 2) + "\n";
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, content);
console.log(JSON.stringify({
  path: relativeOutput.replace(/\\/g, "/"),
  sha256: crypto.createHash("sha256").update(content).digest("hex"),
  runtime_version: runtimeVersion,
  construction_count: statuses.length,
}, null, 2));
