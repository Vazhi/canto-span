#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadRuntimeApi, internalConstruction } = require("../tests/lib/runtime-api");

const root = path.resolve(__dirname, "..");
const api = loadRuntimeApi(path.join(root, "main.js"));
const CJK = /[\u3400-\u9fff]/;
const allowedKeys = new Set([
  "source", "surface", "cantonese", "target_sentence", "sentence", "source_surface",
  "traditional", "positive_probe", "boundary_probe", "minimal_context", "context_source",
  "raw_or_normalized_surface", "preceding_unit", "target", "current_unwrapped_surfaces",
  "top_construction_surfaces", "expected_target_surfaces",
]);
const excludedRelativePaths = new Set([
  "test-data/runtime-reachability-probes-v1.json",
  "test-data/constructor-specific-reachability-probes-v1.json",
]);

function parseTsv(file) {
  const text = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd();
  if (!text) return [];
  const lines = text.split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.filter(Boolean).map((line) => {
    const fields = line.split("\t");
    return Object.fromEntries(headers.map((header, index) => [header, fields[index] ?? ""]));
  });
}

const candidates = new Map();
function addCandidate(value, provenance) {
  if (typeof value !== "string") return;
  const source = value.trim();
  if (!source || !CJK.test(source) || source.length > 120 || source.includes("\n")) return;
  if ((source.match(/\|/g) || []).length > 3) return;
  if (!candidates.has(source)) candidates.set(source, []);
  if (candidates.get(source).length < 8) candidates.get(source).push(provenance);
}
function walkJson(value, key, provenance) {
  if (Array.isArray(value)) return value.forEach((item, index) => walkJson(item, key, `${provenance}[${index}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).forEach(([childKey, child]) => walkJson(child, childKey, `${provenance}.${childKey}`));
  }
  if (allowedKeys.has(key)) addCandidate(value, provenance);
}
function walkFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(absolute) : [absolute];
  });
}

for (const base of ["test-data", "review-packets", "external-evidence"]) {
  for (const file of walkFiles(path.join(root, base))) {
    const relative = path.relative(root, file);
    if (excludedRelativePaths.has(relative)) continue;
    try {
      if (file.endsWith(".json")) {
        walkJson(JSON.parse(fs.readFileSync(file, "utf8")), "", relative);
      } else if (file.endsWith(".tsv")) {
        const rows = parseTsv(file);
        rows.forEach((row, rowIndex) => {
          for (const [key, value] of Object.entries(row)) {
            if (allowedKeys.has(key)) addCandidate(value, `${relative}:${rowIndex + 2}:${key}`);
          }
        });
      }
    } catch (_) {
      // Unreadable historical material is outside this bounded structured scan.
    }
  }
}

const observed = new Map();
const parseErrors = [];
for (const [source, provenance] of candidates) {
  try {
    const labels = [...new Set(api.diagnosticFinalRows(api.analyzeLine(source, null))
      .filter((row) => row.kind === "construction")
      .map(internalConstruction)
      .filter(Boolean))];
    for (const label of labels) {
      if (!observed.has(label)) observed.set(label, []);
      if (observed.get(label).length < 20) observed.get(label).push({ source, provenance: provenance[0] || "" });
    }
  } catch (error) {
    parseErrors.push({ source, error: error.message || String(error) });
  }
}

const inventoryPath = path.join(root, "docs", "research", "CP033-P1-RUNTIME-REACHABILITY-INVENTORY-R1.tsv");
const inventory = parseTsv(inventoryPath);
const probes = JSON.parse(fs.readFileSync(path.join(root, "test-data", "runtime-reachability-probes-v1.json"), "utf8"));
const laterProbes = JSON.parse(fs.readFileSync(path.join(root, "test-data", "constructor-specific-reachability-probes-v1.json"), "utf8"));
const testIndex = JSON.parse(fs.readFileSync(path.join(root, "tests", "construction-test-index.json"), "utf8"));
const indexByLabel = new Map(testIndex.files.map((item) => [item.construction, item]));
const probeByLabel = new Map(probes.cases.map((item) => [item.construction, item]));
const laterProbeByLabel = new Map(laterProbes.cases.map((item) => [item.construction, item]));
const laterRetiredLabels = new Set(["TemporalAdverbialClause"]);
const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail ? { detail: String(detail) } : {}) });
  if (!pass) failures.push({ name, detail: String(detail) });
}

check("runtime version is 0.5.190", api.runtimeVersion === "0.5.190", api.runtimeVersion);
check("structured candidate count is frozen", candidates.size === 1885, candidates.size);
check("structured scan has no parser errors", parseErrors.length === 0, JSON.stringify(parseErrors.slice(0, 5)));
check("117 runtime labels observed somewhere in structured materials", observed.size === 117, observed.size);
check("inventory has 68 baseline no-direct labels", inventory.length === 68, inventory.length);
check("probe schema", probes.schema === "canto-span-runtime-reachability-probes-v1", probes.schema);
check("probe file has zero linguistic evidence weight", probes.linguistic_evidence_weight === 0, probes.linguistic_evidence_weight);
check("probe file has 15 unique labels", probeByLabel.size === 15 && probes.cases.length === 15, probes.cases.length);

let observedInventory = 0;
let unobservedInventory = 0;
for (const row of inventory) {
  const label = row.construction;
  const isObserved = observed.has(label);
  if (isObserved) observedInventory += 1; else unobservedInventory += 1;
  check(`${label} baseline coverage recorded`, row.baseline_standard_test_coverage === "no_direct_cases", row.baseline_standard_test_coverage);
  check(`${label} runtime referenced`, Number(row.runtime_code_references) > 0, row.runtime_code_references);
  check(`${label} not retirement eligible`, row.retirement_eligible === "false", row.retirement_eligible);
  check(`${label} observation classification matches scan`,
    (isObserved && row.structured_material_observation === "observed") ||
    (!isObserved && row.structured_material_observation === "not_observed_in_1885_candidate_strings"),
    `${isObserved}:${row.structured_material_observation}`);
  const probe = probeByLabel.get(label);
  const index = indexByLabel.get(label);
  if (laterRetiredLabels.has(label)) {
    check(`${label} later retirement removes current test index`, !index);
    check(`${label} later retirement is absent from runtime`, !api.labels.includes(label));
    continue;
  }
  check(`${label} exists in construction test index`, Boolean(index));
  if (isObserved) {
    check(`${label} has one zero-weight probe`, Boolean(probe) && probe.linguistic_evidence_weight === 0 && probe.purpose === "runtime_reachability_only", probe?.case_id || "missing");
    if (probe) {
      const labels = api.diagnosticFinalRows(api.analyzeLine(probe.source, probe.context_source || null))
        .filter((item) => item.kind === "construction")
        .map(internalConstruction);
      check(`${label} probe reaches target`, labels.includes(label), probe.source);
    }
    check(`${label} current coverage is implementation-only`, index?.state === "implementation_positive_only", index?.state || "missing");
    check(`${label} current implementation probe count is one`, Number(index?.implementation_probe_count) === 1, index?.implementation_probe_count);
    check(`${label} direct positive evidence count remains zero`, Number(index?.positive_case_count) === 0, index?.positive_case_count);
    const noteFiles = [path.join(root, "grammar", "active", `${label}.md`), path.join(root, "grammar", "archived", `${label}.md`)];
    const noteFile = noteFiles.find((file) => fs.existsSync(file));
    const noteText = noteFile ? fs.readFileSync(noteFile, "utf8") : "";
    check(`${label} note records zero-weight reachability`, noteText.includes(`Implementation-only reachability: \`${probe.case_id}\``) && noteText.includes("linguistic evidence weight is **0**"), noteFile ? path.relative(root, noteFile) : "missing");
  } else {
    check(`${label} has no baseline v0.5.189 probe`, !probe, probe?.case_id || "");
    const laterProbe = laterProbeByLabel.get(label);
    if (laterProbe) {
      const labels = api.diagnosticFinalRows(api.analyzeLine(laterProbe.source, laterProbe.context_source || null))
        .filter((item) => item.kind === "construction")
        .map(internalConstruction);
      check(`${label} later constructor-specific probe has zero evidence weight`, laterProbe.linguistic_evidence_weight === 0 && laterProbe.purpose === "runtime_reachability_only", laterProbe.case_id);
      check(`${label} later constructor-specific probe reaches target`, labels.includes(label), laterProbe.source);
      check(`${label} current coverage is implementation-only after later audit`, index?.state === "implementation_positive_only", index?.state || "missing");
      check(`${label} current implementation probe count is one after later audit`, Number(index?.implementation_probe_count) === 1, index?.implementation_probe_count);
      check(`${label} direct positive evidence count remains zero after later audit`, Number(index?.positive_case_count) === 0, index?.positive_case_count);
    } else {
      check(`${label} remains no-direct`, index?.state === "no_direct_cases", index?.state || "missing");
      check(`${label} current implementation probe count is zero`, Number(index?.implementation_probe_count || 0) === 0, index?.implementation_probe_count || 0);
    }
  }
}
check("15 baseline labels observed", observedInventory === 15, observedInventory);
check("53 baseline labels not observed", unobservedInventory === 53, unobservedInventory);
check("test index has 18 implementation-positive-only labels", testIndex.files.filter((item) => item.state === "implementation_positive_only").length === 18, testIndex.files.filter((item) => item.state === "implementation_positive_only").length);
check("test index has 49 no-direct labels", testIndex.files.filter((item) => item.state === "no_direct_cases").length === 49, testIndex.files.filter((item) => item.state === "no_direct_cases").length);

const result = {
  schema: "canto-span-runtime-reachability-audit-v1",
  runtime_version: api.runtimeVersion,
  checkpoint: "v0.5.190-low-reference-wrapper-audit",
  parser_behavior_changed: false,
  linguistic_status_changed: false,
  structured_candidate_count: candidates.size,
  runtime_labels_observed: observed.size,
  baseline_no_direct_labels: inventory.length,
  implementation_probes_added: probes.cases.length,
  baseline_implementation_positive_only_labels: observedInventory,
  baseline_no_direct_labels: unobservedInventory,
  current_implementation_positive_only_labels: testIndex.files.filter((item) => item.state === "implementation_positive_only").length,
  current_no_direct_labels_remaining: testIndex.files.filter((item) => item.state === "no_direct_cases").length,
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
fs.writeFileSync(path.join(outDir, "runtime-reachability.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
