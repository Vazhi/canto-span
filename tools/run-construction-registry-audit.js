#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const notes = loadConstructionNotes(root);
const retiredFile = path.join(root, "docs", "research", "RETIRED-CONSTRUCTION-ARCHIVE-v0.5.186-R1.tsv");

function parseTsv(file) {
  const text = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd();
  if (!text) return [];
  const lines = text.split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.filter(Boolean).map((line) => {
    const values = line.split("\t");
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
  });
}

function loadRuntime() {
  class Plugin {} class PluginSettingTab {} class Setting {} class Notice {}
  const moduleRecord = { exports: {} };
  const context = {
    module: moduleRecord, exports: moduleRecord.exports,
    require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id),
    console, setTimeout, clearTimeout, Buffer,
  };
  const file = path.join(root, "main.js");
  vm.runInNewContext(
    fs.readFileSync(file, "utf8") + "\nmodule.exports.__registryAudit={runtimeVersion:CANTO_SPAN_RUNTIME_VERSION,registryVersion:RUNTIME_CONSTRUCTION_REGISTRY_VERSION,labels:[...CONSTRUCTION_LABEL_REGISTRY]};",
    context,
    { filename: file }
  );
  return moduleRecord.exports.__registryAudit;
}

const runtime = loadRuntime();
const runtimeLabels = new Set(runtime.labels);
const noteLabels = new Set(notes.map((note) => note.frontmatter.construction));
const retiredLabels = new Set(parseTsv(retiredFile).map((row) => row.runtime_label));
const allowedStatuses = new Set([
  "supported_productive", "provisional", "provisional_reaudit", "research_pending",
  "unsupported_generalization", "lexicalized_only", "parser_heuristic",
]);
const failures = [];
function check(name, condition, detail = "") {
  if (!condition) failures.push({ name, detail });
}

check("runtime label count matches current notes", runtimeLabels.size === noteLabels.size, `${runtimeLabels.size} != ${noteLabels.size}`);
check("runtime labels equal note labels", runtimeLabels.size === noteLabels.size && [...runtimeLabels].every((label) => noteLabels.has(label)));
check("retired archive is nonempty", retiredLabels.size > 0, String(retiredLabels.size));
check("retired labels absent from runtime", [...retiredLabels].every((label) => !runtimeLabels.has(label)));
check("all notes marked runtime_active", notes.every((note) => note.frontmatter.runtime_active === true));
check("all statuses use controlled vocabulary", notes.every((note) => allowedStatuses.has(note.frontmatter.status)));

const statusCounts = {};
const workflowCounts = {};
for (const note of notes) {
  statusCounts[note.frontmatter.status] = (statusCounts[note.frontmatter.status] || 0) + 1;
  workflowCounts[note.frontmatter.workflow_state] = (workflowCounts[note.frontmatter.workflow_state] || 0) + 1;
}
check("workflow has two active notes and all others archived", workflowCounts.active === 2 && workflowCounts.archived === notes.length - 2, JSON.stringify(workflowCounts));
const result = {
  schema: "canto-span-runtime-construction-registry-audit-v1",
  runtime_version: runtime.runtimeVersion,
  registry_version: runtime.registryVersion,
  registry_owner: "grammar/<linguistic-status>/*.md",
  runtime_active_labels: runtimeLabels.size,
  construction_notes: noteLabels.size,
  workflow_counts: workflowCounts,
  retired_labels: retiredLabels.size,
  status_counts_authoring_only: statusCounts,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};
const outDir = path.join(root, "validation", "current");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "runtime-construction-registry.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
