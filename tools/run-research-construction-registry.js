#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { loadConstructionNotes } = require("./construction-notes-lib");
const root = path.resolve(__dirname, "..");
function parseTsv(file) { const text = fs.readFileSync(file, "utf8").trimEnd(); if (!text) return []; const lines = text.split(/\r?\n/), h = lines.shift().split("\t"); return lines.filter(Boolean).map((line) => Object.fromEntries(h.map((k, i) => [k, line.split("\t")[i] ?? ""]))); }
class Plugin {} class PluginSettingTab {} class Setting {} class Notice {}
const m = { exports: {} }, c = { module: m, exports: m.exports, require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id), console, setTimeout, clearTimeout, Buffer };
const file = path.join(root, "main.js");
vm.runInNewContext(fs.readFileSync(file, "utf8") + "\nmodule.exports.__a={runtimeVersion:CANTO_SPAN_RUNTIME_VERSION,labels:[...CONSTRUCTION_LABEL_REGISTRY]};", c, { filename: file });
const api = m.exports.__a;
const notes = loadConstructionNotes(root);
const retired = parseTsv(path.join(root, "docs", "research", "RETIRED-CONSTRUCTION-ARCHIVE-v0.5.186-R1.tsv"));
const active = new Map(notes.map((n) => [n.frontmatter.construction, n.frontmatter.status]));
const retiredSet = new Set(retired.map((r) => r.runtime_label));
const missing = [...active.keys()].filter((x) => !api.labels.includes(x));
const unknown = api.labels.filter((x) => !active.has(x) && !retiredSet.has(x));
const mismatched = [];
const counts = {};
for (const status of active.values()) counts[status] = (counts[status] || 0) + 1;
const result = { runtime_version: api.runtimeVersion, registry_owner: "grammar/active/*.md + grammar/archived/*.md", status: (!missing.length && !unknown.length && !mismatched.length && active.size === 170 && retiredSet.size === 11) ? "PASS" : "FAIL", runtime_registry_labels: api.labels.length, active_construction_notes: active.size, retired_labels: retiredSet.size, status_counts: counts, missing_active_labels: missing, unclassified_runtime_labels: unknown, runtime_status_mismatches_not_applicable: mismatched };
console.log(JSON.stringify(result, null, 2));
if (result.status !== "PASS") process.exit(1);
