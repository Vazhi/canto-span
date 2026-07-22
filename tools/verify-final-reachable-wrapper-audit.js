#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { loadRuntimeApi, internalConstruction } = require("../tests/lib/runtime-api");

const root = path.resolve(__dirname, "..");
const mainPath = path.join(root, "main.js");
const api = loadRuntimeApi(mainPath);
const probes = JSON.parse(fs.readFileSync(path.join(root, "test-data", "final-reachable-wrapper-reachability-probes-v1.json"), "utf8"));
const index = JSON.parse(fs.readFileSync(path.join(root, "tests", "construction-test-index.json"), "utf8"));
const indexByLabel = new Map(index.files.map((row) => [row.construction, row]));
const inventoryPath = path.join(root, "docs", "research", "CP040-P1-FINAL-REACHABLE-WRAPPER-INVENTORY-R1.tsv");
const inventoryLines = fs.readFileSync(inventoryPath, "utf8").trimEnd().split(/\r?\n/);
const headers = inventoryLines.shift().split("\t");
const inventory = inventoryLines.filter(Boolean).map((line) => Object.fromEntries(headers.map((h, i) => [h, line.split("\t")[i] || ""])));

function rowsFor(source) {
  return api.diagnosticFinalRows(api.analyzeLine(source, null)).filter((row) => row.kind === "construction");
}
function labelsFor(source) {
  return rowsFor(source).map(internalConstruction).filter(Boolean);
}
function loadInternalApi() {
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
  vm.runInNewContext(fs.readFileSync(mainPath, "utf8") + `
module.exports.__internalAuditApi = {
  analyzeLine,
  diagnosticFinalRows,
  CONSTRUCTION_LABEL_REGISTRY,
  RETIRED_CONSTRUCTION_LABEL_REGISTRY,
  RETIRED_CONSTRUCTION_LABEL_ALIASES,
};`, context, { filename: mainPath });
  return moduleRecord.exports.__internalAuditApi;
}
const internal = loadInternalApi();

const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail !== "" ? { detail: String(detail) } : {}) });
  if (!pass) failures.push({ name, detail: String(detail) });
}

check("runtime version is 0.5.197", api.runtimeVersion === "0.5.197", api.runtimeVersion);
check("inventory has thirteen labels", inventory.length === 13, inventory.length);
check("inventory records eleven reachable labels", inventory.filter((row) => row.complete_parser_output_observed === "yes").length === 11, inventory.filter((row) => row.complete_parser_output_observed === "yes").length);
check("inventory records two shadowed labels", inventory.filter((row) => row.complete_parser_output_observed === "no").length === 2, inventory.filter((row) => row.complete_parser_output_observed === "no").length);
check("probe schema", probes.schema === "canto-span-final-reachable-wrapper-reachability-probes-v1", probes.schema);
check("probe file has eleven cases", probes.cases.length === 11, probes.cases.length);
check("probe file has eleven unique target labels", new Set(probes.cases.map((row) => row.construction)).size === 11);
check("all probes have zero evidence weight", probes.linguistic_evidence_weight === 0 && probes.cases.every((row) => row.linguistic_evidence_weight === 0 && row.purpose === "runtime_reachability_only"));

for (const probe of probes.cases) {
  const labels = labelsFor(probe.source);
  check(`${probe.case_id} reaches ${probe.construction}`, labels.includes(probe.construction), `${probe.source}: ${labels.join(",")}`);
  const row = indexByLabel.get(probe.construction);
  check(`${probe.construction} coverage is implementation only`, row && row.state === "implementation_positive_only", row && row.state);
  check(`${probe.construction} has one implementation probe`, row && row.implementation_probe_count === 1, row && row.implementation_probe_count);
  check(`${probe.construction} keeps zero direct positives`, row && row.positive_case_count === 0, row && row.positive_case_count);
  const notePath = [path.join(root, "grammar", "active", `${probe.construction}.md`), path.join(root, "grammar", "archived", `${probe.construction}.md`)].find(fs.existsSync);
  const note = notePath ? fs.readFileSync(notePath, "utf8") : "";
  check(`${probe.construction} note records CP040 zero-weight reachability`, note.includes("CP040 final reachable-wrapper audit") && note.includes(`\`${probe.case_id}\``) && note.includes("linguistic evidence weight is **0**"), notePath ? path.relative(root, notePath) : "missing");
}

check("completion sequence preserves CompletionVP", labelsFor("我做完功課就瞓覺。").includes("CompletionThenClause") && labelsFor("我做完功課就瞓覺。").includes("CompletionVP"), labelsFor("我做完功課就瞓覺。").join(","));
check("three-part and two-part directionals remain distinct", labelsFor("返上嚟。").includes("CompoundDirectionalMotionVP") && labelsFor("返嚟。").includes("DirectionalMotionVP") && !labelsFor("返嚟。").includes("CompoundDirectionalMotionVP"), `${labelsFor("返上嚟。").join(",")} / ${labelsFor("返嚟。").join(",")}`);
check("lexical and productive stative negation remain distinct", labelsFor("難食。").includes("NegatedLexicalizedStative") && !labelsFor("唔好食。").includes("NegatedLexicalizedStative"), `${labelsFor("難食。").join(",")} / ${labelsFor("唔好食。").join(",")}`);
check("polite path command remains narrow", labelsFor("請你沿住馬路行。").includes("PoliteImperativeClause") && !labelsFor("請你行。").includes("PoliteImperativeClause"), `${labelsFor("請你沿住馬路行。").join(",")} / ${labelsFor("請你行。").join(",")}`);
check("progressive place wrapper remains order-sensitive", labelsFor("你做緊嘢喺邊度呀？").includes("ProgressivePlaceQuestion") && !labelsFor("你喺邊度食緊飯？").includes("ProgressivePlaceQuestion"), `${labelsFor("你做緊嘢喺邊度呀？").join(",")} / ${labelsFor("你喺邊度食緊飯？").join(",")}`);
const purposeLabels = labelsFor("佢喺度洗緊菜煮飯。");
check("bounded progressive-purpose route exposes all three wrappers", ["ProgressivePurposeClause", "ProgressiveTransitivePredicate", "PurposePredicate"].every((label) => purposeLabels.includes(label)), purposeLabels.join(","));

check("Comment is absent from active registry", !internal.CONSTRUCTION_LABEL_REGISTRY.has("Comment"));
check("Comment is present in retired registry", internal.RETIRED_CONSTRUCTION_LABEL_REGISTRY.has("Comment"));
check("Comment remains absent from complete output", !labelsFor("呢個好食。").includes("Comment"), labelsFor("呢個好食。").join(","));
check("Comment is absent from current test index", !indexByLabel.has("Comment"));
check("Comment retired note is preserved", fs.existsSync(path.join(root, "archive", "retired-labels", "v0.5.197-shadowed-wrapper-retirement", "Comment.md")));

check("PerfectiveResultPredicate is absent from active registry", !internal.CONSTRUCTION_LABEL_REGISTRY.has("PerfectiveResultPredicate"));
check("PerfectiveResultPredicate is present in retired registry", internal.RETIRED_CONSTRUCTION_LABEL_REGISTRY.has("PerfectiveResultPredicate"));
check("PerfectiveResultPredicate compatibility maps to PerfectiveVP", internal.RETIRED_CONSTRUCTION_LABEL_ALIASES.get("PerfectiveResultPredicate") === "PerfectiveVP");
check("complete output still uses PerfectiveVP", labelsFor("解決咗喇。").includes("PerfectiveVP") && !labelsFor("解決咗喇。").includes("PerfectiveResultPredicate"), labelsFor("解決咗喇。").join(","));
check("PerfectiveResultPredicate is absent from current test index", !indexByLabel.has("PerfectiveResultPredicate"));
check("PerfectiveResultPredicate retired note is preserved", fs.existsSync(path.join(root, "archive", "retired-labels", "v0.5.197-shadowed-wrapper-retirement", "PerfectiveResultPredicate.md")));

check("test index has 63 implementation-positive-only labels", index.files.filter((row) => row.state === "implementation_positive_only").length === 63, index.files.filter((row) => row.state === "implementation_positive_only").length);
check("test index has one compatibility-alias-only label", index.files.filter((row) => row.state === "compatibility_alias_only").length === 1, index.files.filter((row) => row.state === "compatibility_alias_only").length);
check("test index has zero no-direct labels", index.files.filter((row) => row.state === "no_direct_cases").length === 0, index.files.filter((row) => row.state === "no_direct_cases").length);
check("test index has 166 active labels", index.active_construction_count === 166 && index.files.length === 166, index.files.length);

const result = {
  schema: "canto-span-final-reachable-wrapper-audit-v1",
  runtime_version: api.runtimeVersion,
  checkpoint: "v0.5.197-shadowed-wrapper-retirement",
  parser_recognized_span_behavior_changed: false,
  linguistic_status_changed: false,
  labels_audited: inventory.length,
  implementation_probes_added: probes.cases.length,
  constructor_shadowed_labels_retained: 0,
  constructor_shadowed_labels_retired_later: 2,
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
fs.writeFileSync(path.join(outDir, "final-reachable-wrapper-audit.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
