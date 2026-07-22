#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");
const { loadRuntimeApi, internalConstruction } = require("../tests/lib/runtime-api");

const root = path.resolve(__dirname, "..");
const mainPath = path.join(root, "main.js");
const mainText = fs.readFileSync(mainPath, "utf8");
const api = loadRuntimeApi(mainPath);
const fastMode = process.argv.includes("--fast");
function sha256(file) { return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"); }
if (fastMode) {
  const cachedPath = path.join(root, "validation", `v${api.runtimeVersion}`, "low-reference-wrapper-audit.json");
  const probePath = path.join(root, "test-data", "constructor-specific-reachability-probes-v1.json");
  const inventoryPath = path.join(root, "docs", "research", "CP034-P1-LOW-REFERENCE-WRAPPER-INVENTORY-R1.tsv");
  const failures = [];
  let cached = null;
  try { cached = JSON.parse(fs.readFileSync(cachedPath, "utf8")); } catch (error) { failures.push(`missing_or_invalid_cached_audit:${error.message}`); }
  if (cached) {
    if (cached.status !== "PASS") failures.push(`cached_audit_not_pass:${cached.status}`);
    if (cached.runtime_version !== api.runtimeVersion) failures.push(`cached_runtime_mismatch:${cached.runtime_version}`);
    if (cached.main_sha256 !== sha256(mainPath)) failures.push("cached_main_hash_mismatch");
    if (cached.probe_file_sha256 !== sha256(probePath)) failures.push("cached_probe_hash_mismatch");
    if (cached.inventory_sha256 !== sha256(inventoryPath)) failures.push("cached_inventory_hash_mismatch");
  }
  const result = { schema: "canto-span-low-reference-wrapper-fast-verification-v1", runtime_version: api.runtimeVersion, cached_audit: path.relative(root, cachedPath), failed: failures.length, status: failures.length ? "FAIL" : "PASS", failures };
  console.log(JSON.stringify(result, null, 2));
  if (failures.length) process.exit(1);
  process.exit(0);
}

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
vm.runInNewContext(mainText + `
module.exports.__lowRefApi = {
  CONSTRUCTION_LABEL_REGISTRY,
  RETIRED_CONSTRUCTION_LABEL_REGISTRY,
  TOKEN_LEXICON,
  token,
  wrapCore,
  flattenNodes,
};`, context, { filename: mainPath });
const internal = moduleRecord.exports.__lowRefApi;

function parseTsv(file) {
  const lines = fs.readFileSync(file, "utf8").trimEnd().split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.filter(Boolean).map((line) => {
    const fields = line.split("\t");
    return Object.fromEntries(headers.map((header, index) => [header, fields[index] || ""]));
  });
}
function finalLabels(source) {
  return api.diagnosticFinalRows(api.analyzeLine(source, null))
    .filter((row) => row.kind === "construction")
    .map(internalConstruction)
    .filter(Boolean);
}
function rawLabels(nodes) {
  return internal.flattenNodes(nodes).filter((node) => node.kind === "construction").map((node) => node.type);
}

const inventory = parseTsv(path.join(root, "docs/research/CP034-P1-LOW-REFERENCE-WRAPPER-INVENTORY-R1.tsv"));
const probes = JSON.parse(fs.readFileSync(path.join(root, "test-data/constructor-specific-reachability-probes-v1.json"), "utf8"));
const index = JSON.parse(fs.readFileSync(path.join(root, "tests/construction-test-index.json"), "utf8"));
const indexByLabel = new Map(index.files.map((row) => [row.construction, row]));
const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail ? { detail: String(detail) } : {}) });
  if (!pass) failures.push({ name, detail: String(detail) });
}

check("runtime version is 0.5.194", api.runtimeVersion === "0.5.194", api.runtimeVersion);
check("inventory has five labels", inventory.length === 5, inventory.length);
check("probe schema", probes.schema === "canto-span-constructor-specific-reachability-probes-v1", probes.schema);
check("all three probes have zero evidence weight", probes.cases.length === 3 && probes.cases.every((row) => row.linguistic_evidence_weight === 0 && row.purpose === "runtime_reachability_only"), probes.cases.length);

for (const probe of probes.cases) {
  check(`${probe.case_id} reaches ${probe.construction}`, finalLabels(probe.source).includes(probe.construction), probe.source);
  const row = indexByLabel.get(probe.construction);
  check(`${probe.construction} coverage is implementation only`, row && row.state === "implementation_positive_only", row && row.state);
  check(`${probe.construction} has one implementation probe`, row && row.implementation_probe_count === 1, row && row.implementation_probe_count);
  check(`${probe.construction} keeps zero direct positives`, row && row.positive_case_count === 0, row && row.positive_case_count);
}

check("Definition frame exposes internal complement", finalLabels("圖書館係乜嘢嚟㗎。").includes("DefinitionComplement"));
check("Comparative fallback remains distinct on probe", finalLabels("客氣啲。").includes("ComparativeStative"));

const topicCandidates = ["呢個", "嗰個", "呢啲", "嗰啲", "呢間", "嗰間", "呢間餐廳", "嗰間餐廳"];
let completeCommentHits = 0;
for (const topic of topicCandidates) {
  for (const term of Object.keys(internal.TOKEN_LEXICON)) {
    if (finalLabels(`${topic}${term}`).includes("Comment")) completeCommentHits += 1;
  }
}
check("single-lexeme topic scan has no complete Comment output", completeCommentHits === 0, completeCommentHits);
const directComment = rawLabels(internal.wrapCore([internal.token("呢個"), internal.token("未")]));
check("Comment fallback still exists at constructor level", directComment.includes("Comment"), JSON.stringify(directComment));
check("Comment remains current but no-direct", internal.CONSTRUCTION_LABEL_REGISTRY.has("Comment") && indexByLabel.get("Comment")?.state === "no_direct_cases");

check("TemporalAdverbialClause absent from active registry", !internal.CONSTRUCTION_LABEL_REGISTRY.has("TemporalAdverbialClause"));
check("TemporalAdverbialClause present in retired registry", internal.RETIRED_CONSTRUCTION_LABEL_REGISTRY.has("TemporalAdverbialClause"));
check("TemporalAdverbialClause constructor absent", !mainText.includes('construction("TemporalAdverbialClause"'));
check("TemporalAdverbialClause removed from context support", !mainText.includes('"TemporalClause", "TemporalAdverbialClause"'));
check("TemporalAdverbialClause current note absent", !fs.existsSync(path.join(root, "grammar/archived/TemporalAdverbialClause.md")));
check("TemporalAdverbialClause test file absent", !fs.existsSync(path.join(root, "tests/constructions/TemporalAdverbialClause.json")));
check("TemporalAdverbialClause archived note preserved", fs.existsSync(path.join(root, "archive/retired-labels/v0.5.190-low-reference-wrapper-audit/TemporalAdverbialClause.md")));

check("current registry has 168 labels", internal.CONSTRUCTION_LABEL_REGISTRY.size === 168, internal.CONSTRUCTION_LABEL_REGISTRY.size);
check("test index has 168 labels", index.active_construction_count === 168 && index.files.length === 168, index.files.length);
check("42 labels are implementation positive only", index.files.filter((row) => row.state === "implementation_positive_only").length === 42, index.files.filter((row) => row.state === "implementation_positive_only").length);
check("23 labels remain no-direct", index.files.filter((row) => row.state === "no_direct_cases").length === 23, index.files.filter((row) => row.state === "no_direct_cases").length);

const result = {
  schema: "canto-span-low-reference-wrapper-audit-v1",
  runtime_version: api.runtimeVersion,
  checkpoint: "v0.5.190-low-reference-wrapper-audit",
  parser_recognized_span_behavior_changed: false,
  retained_linguistic_status_changed: false,
  labels_audited: inventory.length,
  implementation_probes_added: probes.cases.length,
  labels_retired: 1,
  complete_comment_single_lexeme_hits: completeCommentHits,
  linguistic_evidence_weight_added: 0,
  main_sha256: sha256(mainPath),
  probe_file_sha256: sha256(path.join(root, "test-data", "constructor-specific-reachability-probes-v1.json")),
  inventory_sha256: sha256(path.join(root, "docs", "research", "CP034-P1-LOW-REFERENCE-WRAPPER-INVENTORY-R1.tsv")),
  total: checks.length,
  passed: checks.length - failures.length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  checks,
  failures,
};
const outDir = path.join(root, "validation", `v${api.runtimeVersion}`);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "low-reference-wrapper-audit.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
