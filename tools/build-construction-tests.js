#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadRuntimeApi, internalConstruction } = require("../tests/lib/runtime-api");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "tests", "constructions");
const regressionPath = path.join(root, "tests", "fixtures", "regression-snapshots.json");
const npPath = path.join(root, "tests", "fixtures", "np-subsystem.json");
const reachabilityPaths = [
  path.join(root, "test-data", "runtime-reachability-probes-v1.json"),
  path.join(root, "test-data", "constructor-specific-reachability-probes-v1.json"),
  path.join(root, "test-data", "experiential-delimited-reachability-probes-v1.json"),
  path.join(root, "test-data", "result-change-state-reachability-probes-v1.json"),
  path.join(root, "test-data", "nominal-wrapper-reachability-probes-v1.json"),
];
const api = loadRuntimeApi(path.join(root, "main.js"));

function readJson(file) { return JSON.parse(fs.readFileSync(file, "utf8")); }
function writeJson(file, value) { fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n"); }

const labels = loadConstructionNotes(root)
  .map((note) => note.frontmatter.construction)
  .sort();

const regression = readJson(regressionPath);
regression.cases.forEach((testCase, index) => {
  if (!testCase.case_id) testCase.case_id = `REG-${String(index + 1).padStart(4, "0")}`;
});
writeJson(regressionPath, regression);

const np = readJson(npPath);
const files = new Map(labels.map((label) => [label, {
  schema: "canto-span-construction-test-file-v1",
  construction: label,
  runtime_active: true,
  migration_phase: 5,
  snapshot_cases: [],
  focused_cases: [],
  np_cases: [],
  implementation_probe_cases: [],
  coverage: {},
}]));

for (const testCase of regression.cases) {
  const present = new Set(api.diagnosticFinalRows(api.analyzeLine(testCase.source, testCase.context_source || null))
    .filter((row) => row.kind === "construction")
    .map(internalConstruction)
    .filter(Boolean));
  for (const construction of present) {
    const target = files.get(construction);
    if (!target) continue;
    target.snapshot_cases.push({
      case_id: testCase.case_id,
      source: testCase.source,
      ...(testCase.context_source ? { context_source: testCase.context_source } : {}),
      origins: testCase.origins || [],
      assertion: "construction_present_in_exact_snapshot",
    });
  }
}

const focusedPacketPaths = [
  "review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/focused-evaluation-packet.json",
  "review-packets/v0.5.182/IFR02-D1/focused-evaluation-packet.json",
];
for (const rel of focusedPacketPaths) {
  const packet = readJson(path.join(root, rel));
  const target = files.get(packet.target_internal_construction);
  if (!target) throw new Error(`Missing active construction note for ${packet.target_internal_construction}`);
  for (const testCase of packet.development_set.cases) {
    const expectedText = String(testCase.expected || "");
    let assertion = "review_only_parse_succeeds";
    if (expectedText.includes("absent")) assertion = "construction_absent";
    else if (expectedText.includes("present") || expectedText.includes("nested")) assertion = "construction_present";
    else if (expectedText.includes("may_parse")) assertion = "review_only_parse_succeeds";
    target.focused_cases.push({
      case_id: `${packet.packet_id}:${testCase.case_id}`,
      source: testCase.surface,
      class: testCase.class || "",
      expected_profile: expectedText,
      assertion,
      provenance: rel,
      ...(testCase.source_ids ? { source_ids: testCase.source_ids } : {}),
      ...(testCase.source_locator ? { source_locator: testCase.source_locator } : {}),
    });
  }
}

const acceptedReachabilitySchemas = new Set([
  "canto-span-runtime-reachability-probes-v1",
  "canto-span-constructor-specific-reachability-probes-v1",
  "canto-span-experiential-delimited-reachability-probes-v1",
  "canto-span-result-change-state-reachability-probes-v1",
  "canto-span-nominal-wrapper-reachability-probes-v1",
]);
for (const reachabilityPath of reachabilityPaths) {
  const reachability = readJson(reachabilityPath);
  if (!acceptedReachabilitySchemas.has(reachability.schema)) {
    throw new Error(`Unexpected reachability schema: ${reachability.schema}`);
  }
  if (reachability.linguistic_evidence_weight !== 0) {
    throw new Error("Runtime reachability probes must have zero linguistic evidence weight");
  }
  for (const testCase of reachability.cases) {
    const target = files.get(testCase.construction);
    if (!target) throw new Error(`Missing construction note for reachability probe ${testCase.construction}`);
    if (testCase.linguistic_evidence_weight !== 0 || testCase.purpose !== "runtime_reachability_only") {
      throw new Error(`Reachability probe ${testCase.case_id} has nonzero or ambiguous evidence weight`);
    }
    target.implementation_probe_cases.push({
      case_id: testCase.case_id,
      source: testCase.source,
      ...(testCase.context_source ? { context_source: testCase.context_source } : {}),
      assertion: testCase.assertion,
      ...(testCase.internal_construction ? { internal_construction: testCase.internal_construction } : {}),
      provenance: testCase.provenance,
      source_role: testCase.source_role,
      linguistic_evidence_weight: 0,
      purpose: "runtime_reachability_only",
    });
  }
}

for (const testCase of np.cases) {
  const targets = new Set();
  if (testCase.expected_internal && files.has(testCase.expected_internal)) targets.add(testCase.expected_internal);
  if ((testCase.expected_pfv_surface || testCase.forbid_narrow_pfv) && files.has("PostverbalZoPerfectiveVP")) {
    targets.add("PostverbalZoPerfectiveVP");
  }
  for (const construction of targets) {
    const assertion = construction === "PostverbalZoPerfectiveVP"
      ? (testCase.forbid_narrow_pfv ? "construction_absent" : "construction_present")
      : "np_matrix_case";
    files.get(construction).np_cases.push({
      case_id: testCase.id,
      source: testCase.surface,
      group: testCase.group,
      assertion,
      ...(testCase.expected_internal ? { expected_internal: testCase.expected_internal } : {}),
      ...(testCase.expected_surface ? { expected_surface: testCase.expected_surface } : {}),
      ...(testCase.expected_license ? { expected_license: testCase.expected_license } : {}),
      ...(testCase.expected_classifier_compatibility ? { expected_classifier_compatibility: testCase.expected_classifier_compatibility } : {}),
      ...(testCase.expected_pfv_surface ? { expected_pfv_surface: testCase.expected_pfv_surface } : {}),
      ...(testCase.expected_object_internal ? { expected_object_internal: testCase.expected_object_internal } : {}),
      ...(testCase.expected_object_surface ? { expected_object_surface: testCase.expected_object_surface } : {}),
      ...(testCase.expected_object_license ? { expected_object_license: testCase.expected_object_license } : {}),
      ...(testCase.forbid_licensed_np ? { forbid_licensed_np: true } : {}),
      ...(testCase.forbid_narrow_pfv ? { forbid_narrow_pfv: true } : {}),
    });
  }
}

fs.mkdirSync(outDir, { recursive: true });
for (const old of fs.readdirSync(outDir)) {
  if (old.endsWith(".json")) fs.unlinkSync(path.join(outDir, old));
}

const summary = {
  schema: "canto-span-construction-test-index-v1",
  active_construction_count: labels.length,
  files: [],
};

for (const label of labels) {
  const record = files.get(label);
  const focusedPositive = record.focused_cases.filter((item) => item.assertion === "construction_present").length;
  const focusedBoundary = record.focused_cases.filter((item) => item.assertion === "construction_absent").length;
  const reviewOnly = record.focused_cases.filter((item) => item.assertion === "review_only_parse_succeeds").length;
  const npPositive = record.np_cases.filter((item) => item.assertion === "construction_present" || item.assertion === "np_matrix_case").length;
  const npBoundary = record.np_cases.filter((item) => item.assertion === "construction_absent").length;
  const positiveCount = record.snapshot_cases.length + focusedPositive + npPositive;
  const implementationProbeCount = record.implementation_probe_cases.length;
  const compatibilityAliasProbeCount = record.implementation_probe_cases.filter((item) => item.assertion === "compatibility_alias_present").length;
  const boundaryCount = focusedBoundary + npBoundary;
  let coverageState = "no_direct_cases";
  if (positiveCount && boundaryCount) coverageState = "positive_and_boundary";
  else if (positiveCount) coverageState = "positive_only";
  else if (boundaryCount) coverageState = "boundary_only";
  else if (implementationProbeCount && compatibilityAliasProbeCount === implementationProbeCount) coverageState = "compatibility_alias_only";
  else if (implementationProbeCount) coverageState = "implementation_positive_only";
  record.coverage = {
    state: coverageState,
    exact_snapshot_positive_count: record.snapshot_cases.length,
    focused_positive_count: focusedPositive,
    focused_boundary_count: focusedBoundary,
    focused_review_only_count: reviewOnly,
    np_case_count: record.np_cases.length,
    implementation_probe_count: implementationProbeCount,
    compatibility_alias_probe_count: compatibilityAliasProbeCount,
    positive_case_count: positiveCount,
    boundary_case_count: boundaryCount,
    executable_case_count: record.snapshot_cases.length + record.focused_cases.length + record.np_cases.length + implementationProbeCount,
  };
  const file = `${label}.json`;
  writeJson(path.join(outDir, file), record);
  summary.files.push({ construction: label, file: `tests/constructions/${file}`, ...record.coverage });
}
writeJson(path.join(root, "tests", "construction-test-index.json"), summary);

const totals = summary.files.reduce((out, item) => {
  out[item.state] = (out[item.state] || 0) + 1;
  out.executable_case_references += item.executable_case_count;
  out.boundary_case_references += item.boundary_case_count;
  return out;
}, { executable_case_references: 0, boundary_case_references: 0 });
console.log(JSON.stringify({ active_constructions: labels.length, ...totals }, null, 2));
