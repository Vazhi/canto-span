#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { loadRuntimeApi, internalConstruction } = require("../tests/lib/runtime-api");

const root = path.resolve(__dirname, "..");
const mainPath = path.join(root, "main.js");
const mainText = fs.readFileSync(mainPath, "utf8");
const api = loadRuntimeApi(mainPath);
const probes = JSON.parse(fs.readFileSync(path.join(root, "test-data", "result-change-state-reachability-probes-v1.json"), "utf8"));
const index = JSON.parse(fs.readFileSync(path.join(root, "tests", "construction-test-index.json"), "utf8"));
const indexByLabel = new Map(index.files.map((row) => [row.construction, row]));
const inventoryPath = path.join(root, "docs", "research", "CP036-P1-RESULT-CHANGE-STATE-WRAPPER-INVENTORY-R1.tsv");
const inventoryLines = fs.readFileSync(inventoryPath, "utf8").trimEnd().split(/\r?\n/);
const headers = inventoryLines.shift().split("\t");
const inventory = inventoryLines.filter(Boolean).map((line) => Object.fromEntries(headers.map((h, i) => [h, line.split("\t")[i] || ""])));

class Plugin {}
class PluginSettingTab {}
class Setting {}
class Notice {}
const moduleRecord = { exports: {} };
const context = {
  module: moduleRecord,
  exports: moduleRecord.exports,
  require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id),
  console,
  setTimeout,
  clearTimeout,
  Buffer,
};
vm.runInNewContext(mainText + `\nmodule.exports.__resultAuditApi = { CONSTRUCTION_LABEL_REGISTRY, RETIRED_CONSTRUCTION_LABEL_REGISTRY, RETIRED_CONSTRUCTION_LABEL_ALIASES };`, context, { filename: mainPath });
const internal = moduleRecord.exports.__resultAuditApi;

function finalLabels(source) {
  return api.diagnosticFinalRows(api.analyzeLine(source, null))
    .filter((row) => row.kind === "construction")
    .map(internalConstruction)
    .filter(Boolean);
}

const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail ? { detail: String(detail) } : {}) });
  if (!pass) failures.push({ name, detail: String(detail) });
}

check("runtime version is 0.5.197", api.runtimeVersion === "0.5.197", api.runtimeVersion);
check("inventory has eleven labels", inventory.length === 11, inventory.length);
check("probe schema", probes.schema === "canto-span-result-change-state-reachability-probes-v1", probes.schema);
check("probe file has ten cases", probes.cases.length === 10, probes.cases.length);
check("probe file has ten unique target labels", new Set(probes.cases.map((row) => row.construction)).size === 10);
check("all probes have zero evidence weight", probes.linguistic_evidence_weight === 0 && probes.cases.every((row) => row.linguistic_evidence_weight === 0 && row.purpose === "runtime_reachability_only"));

for (const probe of probes.cases) {
  const labels = finalLabels(probe.source);
  check(`${probe.case_id} reaches ${probe.construction}`, labels.includes(probe.construction), `${probe.source}: ${labels.join(",")}`);
  const row = indexByLabel.get(probe.construction);
  check(`${probe.construction} coverage is implementation only`, row && row.state === "implementation_positive_only", row && row.state);
  check(`${probe.construction} has one implementation probe`, row && row.implementation_probe_count === 1, row && row.implementation_probe_count);
  check(`${probe.construction} keeps zero direct positives`, row && row.positive_case_count === 0, row && row.positive_case_count);
  const notePath = [path.join(root, "grammar", "active", `${probe.construction}.md`), path.join(root, "grammar", "archived", `${probe.construction}.md`)].find(fs.existsSync);
  const note = notePath ? fs.readFileSync(notePath, "utf8") : "";
  check(`${probe.construction} note records CP036 zero-weight reachability`, note.includes("CP036-P1 result and change-state wrapper audit") && note.includes(`\`${probe.case_id}\``) && note.includes("linguistic evidence weight is **0**"), notePath ? path.relative(root, notePath) : "missing");
}

const shadowedSource = "解決咗喇。";
const shadowedLabels = finalLabels(shadowedSource);
check("PerfectiveResultPredicate absent from complete output", !shadowedLabels.includes("PerfectiveResultPredicate"), shadowedLabels.join(","));
check("PerfectiveVP consumes the same surface", shadowedLabels.includes("PerfectiveVP"), shadowedLabels.join(","));
check("PerfectiveResultPredicate is absent from the active registry", !internal.CONSTRUCTION_LABEL_REGISTRY.has("PerfectiveResultPredicate"));
check("PerfectiveResultPredicate is present in the retired registry", internal.RETIRED_CONSTRUCTION_LABEL_REGISTRY.has("PerfectiveResultPredicate"));
check("PerfectiveResultPredicate compatibility maps to PerfectiveVP", internal.RETIRED_CONSTRUCTION_LABEL_ALIASES.get("PerfectiveResultPredicate") === "PerfectiveVP");
check("PerfectiveResultPredicate constructor is absent", !mainText.includes("function perfectiveResultPredicateFallback"));
check("PerfectiveResultPredicate test file is absent", !fs.existsSync(path.join(root, "tests/constructions/PerfectiveResultPredicate.json")));
const retiredNote = fs.readFileSync(path.join(root, "archive", "retired-labels", "v0.5.197-shadowed-wrapper-retirement", "PerfectiveResultPredicate.md"), "utf8");
check("PerfectiveResultPredicate retirement note preserves shadowing evidence", retiredNote.includes("complete parser output routes the same surface through `PerfectiveVP`") && retiredNote.includes("Retirement record — v0.5.197"));

check("test index has 63 implementation-positive-only labels", index.files.filter((row) => row.state === "implementation_positive_only").length === 63, index.files.filter((row) => row.state === "implementation_positive_only").length);
check("test index has zero no-direct labels", index.files.filter((row) => row.state === "no_direct_cases").length === 0, index.files.filter((row) => row.state === "no_direct_cases").length);
check("test index has 166 active labels", index.active_construction_count === 166 && index.files.length === 166, index.files.length);

const result = {
  schema: "canto-span-result-change-state-wrapper-audit-v1",
  runtime_version: api.runtimeVersion,
  checkpoint: "v0.5.197-shadowed-wrapper-retirement",
  parser_recognized_span_behavior_changed: false,
  linguistic_status_changed: false,
  labels_audited: inventory.length,
  implementation_probes_added: probes.cases.length,
  shadowed_labels_retained: 0,
  shadowed_labels_retired_later: 1,
  linguistic_evidence_weight_added: 0,
  total: checks.length,
  passed: checks.length - failures.length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  checks,
  failures,
};
const outDir = path.join(root, "validation", `v${api.runtimeVersion}`);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "result-change-state-wrapper-audit.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
