#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");

function parseTsv(file) {
  const text = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd();
  if (!text) return [];
  const lines = text.split(/\r?\n/), headers = lines.shift().split("\t");
  return lines.filter(Boolean).map((line) => Object.fromEntries(headers.map((h, i) => [h, line.split("\t")[i] ?? ""])));
}
function loadRuntime() {
  class Plugin {} class PluginSettingTab {} class Setting {} class Notice {}
  const m = { exports: {} };
  const c = { module: m, exports: m.exports, require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id), console, setTimeout, clearTimeout, Buffer };
  const file = path.join(root, "main.js");
  vm.runInNewContext(fs.readFileSync(file, "utf8") + "\nmodule.exports.__api={runtimeVersion:CANTO_SPAN_RUNTIME_VERSION,labels:[...CONSTRUCTION_LABEL_REGISTRY]};", c, { filename: file });
  return m.exports.__api;
}
const api = loadRuntime();
const notes = loadConstructionNotes(root);
const retired = parseTsv(path.join(root, "docs", "research", "RETIRED-CONSTRUCTION-ARCHIVE-v0.5.186-R1.tsv"));
const noteMap = new Map(notes.map((n) => [n.frontmatter.construction, n]));
const runtime = new Set(api.labels), retiredSet = new Set(retired.map((r) => r.runtime_label));
const checks = [], failures = [];
function check(name, condition, detail = "") { const pass = !!condition; checks.push({ name, pass, ...(detail ? { detail } : {}) }); if (!pass) failures.push({ name, detail }); }
check("runtime registry has 170 labels", runtime.size === 170, String(runtime.size));
check("construction notes have 170 labels", noteMap.size === 170, String(noteMap.size));
check("runtime exactly equals construction notes", runtime.size === noteMap.size && [...runtime].every((x) => noteMap.has(x)));
check("eleven labels are archived as retired", retiredSet.size === 11, String(retiredSet.size));
check("retired labels are absent from runtime", [...retiredSet].every((x) => !runtime.has(x)));
check("all notes are marked runtime active", notes.every((n) => n.frontmatter.runtime_active === true));
check("all source counts match source IDs", notes.every((n) => Number(n.frontmatter.source_count) === n.frontmatter.source_ids.length));
check("every mapped source has a note section", notes.every((n) => n.frontmatter.source_ids.every((id) => n.body.includes(`### ${id}`))));
check("supported_productive remains zero", notes.filter((n) => n.frontmatter.status === "supported_productive").length === 0);
check("no rows remain provisional_reaudit", notes.filter((n) => n.frontmatter.status === "provisional_reaudit").length === 0);
check("no construction is provisional", notes.filter((n) => n.frontmatter.status === "provisional").length === 0);
check("no note claims productive eligibility", notes.every((n) => /Productive acceptance eligible: \*\*no\*\*/.test(n.body)));
check("frozen wide registry exists", fs.existsSync(path.join(root, "archive", "registry-pre-obsidian-v0.5.184", "full-construction-registry.json")));
const outDir = path.join(root, "validation", `v${api.runtimeVersion}`);
fs.mkdirSync(outDir, { recursive: true });
const result = { schema: "canto-span-source-accounting-audit-v6", checkpoint: "v0.5.188-rul-survey-readiness", runtime_registry_labels: runtime.size, construction_notes: noteMap.size, retired_labels: retiredSet.size, total: checks.length, passed: checks.length - failures.length, failed: failures.length, status: failures.length ? "FAIL" : "PASS", checks, failures };
fs.writeFileSync(path.join(outDir, "source-accounting.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
