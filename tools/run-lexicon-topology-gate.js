#!/usr/bin/env node
"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

function loadApi(mainPath) {
  class Plugin {} class PluginSettingTab {} class Setting {} class Notice {}
  const moduleRecord = { exports: {} };
  const context = {
    module: moduleRecord, exports: moduleRecord.exports,
    require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id),
    console, setTimeout, clearTimeout, Buffer,
  };
  vm.runInNewContext(fs.readFileSync(mainPath, "utf8") + `
module.exports.__lexiconTopologyApi = {
  analyzeLine, diagnosticSummary, diagnosticFinalRows,
  runtimeVersion: CANTO_SPAN_RUNTIME_VERSION,
};`, context, { filename: mainPath });
  return moduleRecord.exports.__lexiconTopologyApi;
}

function pick(obj, keys) {
  const out = {};
  for (const key of keys) if (obj && obj[key] !== undefined && obj[key] !== "") out[key] = obj[key];
  return out;
}

function compactTrace(detail) {
  if (!detail) return null;
  return pick(detail, [
    "kind", "construction_type", "template_family", "template", "formula_type", "fragment_subtype",
    "context_requirement_status", "antecedent_status", "missing_argument_slots", "selected_alternative",
    "subject_status", "null_subject", "null_object", "null_object_link", "aspect", "particle_contribution",
    "response_particle", "topic_chain_status", "topic_antecedent_source", "topic_antecedent_surface",
    "topic_frame_status", "topic_frame_linker_surface", "topic_frame_domain_surface",
    "predicate_object_compatibility_status", "predicate_object_compatibility_reason",
    "preserved_root_construction", "structural_preservation_status", "malformed_family", "malformed_subtype",
    "shared_subject_provenance", "not_claims", "nominal_predicate_type", "copula_status", "predicate_surface",
    "measure_domain", "quantity_surface", "unit_surface", "dimension_surface", "subjectless_type",
    "hidden_subject_inserted", "environmental_subtype", "location_relation", "existential_subtype", "polarity",
    "have_relation", "locative_frame_subtype", "introduced_theme_surface", "introduced_participant_surface",
    "presentational_coda_surface",
  ]);
}

function actualTopology(api, source, contextSource) {
  const analysis = api.analyzeLine(source, contextSource || null);
  const summary = api.diagnosticSummary(analysis);
  const rows = api.diagnosticFinalRows(analysis);
  return {
    summary: pick(summary, [
      "top_constructions", "top_child_constructions", "context_requirement_status", "antecedent_status",
      "missing_argument_slots", "selected_alternative", "root_span_coverage_status",
      "root_top_construction_count", "topic_chain_status", "topic_antecedent_source",
      "topic_antecedent_surface", "topic_frame_status", "topic_frame_linker_surface",
      "topic_frame_domain_surface", "linked_null_object_count", "particle_cluster_status",
    ]),
    // Lexical token boundaries may change; the unwrapped character sequence may not.
    unwrapped_text: (summary.unwrapped_root_surfaces || []).join(""),
    constructions: rows
      .filter((row) => row.kind === "construction")
      .map((row) => ({
        kind: row.kind,
        depth: row.depth,
        parent: row.parent || "",
        surface: row.display_surface || row.surface || "",
        construction: row.construction || "",
        trace: row.trace || "",
        trace_detail: compactTrace(row.trace_detail),
      })),
  };
}

const root = path.resolve(__dirname, "..");
const api = loadApi(path.join(root, "main.js"));
const baselinePath = path.join(root, "test-data", "cp021b-lx1-construction-freeze-baseline.json");
const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
const updateV05184Np = process.argv.includes("--update-v05184-np");
if (updateV05184Np) {
  const accepted = new Set(["呢本。", "食咗香港嘅飯。", "呢個係問題。"]) ;
  let updated = 0;
  for (const testCase of baseline.cases || []) {
    if (!accepted.has(testCase.source || "")) continue;
    testCase.expected = JSON.parse(JSON.stringify(actualTopology(api, testCase.source, testCase.context_source || null)));
    testCase.accepted_change = "v0.5.184_compositional_np_subsystem";
    updated++;
  }
  if (updated !== accepted.size) throw new Error(`Expected ${accepted.size} accepted topology updates, found ${updated}`);
  baseline.baseline_runtime_version = "0.5.184";
  baseline.generated_from = "v0.5.184 compositional NP subsystem: three explicit topology corrections";
  fs.writeFileSync(baselinePath, JSON.stringify(baseline, null, 2) + "\n");
}
const regressionPath = path.join(root, "tests", "fixtures", "regression-snapshots.json");
const regression = JSON.parse(fs.readFileSync(regressionPath, "utf8"));
const exclusions = new Set((regression.current_focused_exclusions || []).map((row) => `${row.source || ""}\u0000${row.context_source || ""}`));
const activeCases = [];
const excludedCases = [];
for (const testCase of baseline.cases || []) {
  const key = `${testCase.source || ""}\u0000${testCase.context_source || ""}`;
  if (exclusions.has(key)) excludedCases.push({ source: testCase.source, context_source: testCase.context_source || "", reason: "active_candidate_focused_exclusion" });
  else activeCases.push(testCase);
}
const failures = [];
for (const testCase of activeCases) {
  try {
    const actual = JSON.parse(JSON.stringify(actualTopology(api, testCase.source, testCase.context_source || null)));
    assert.deepStrictEqual(actual, testCase.expected);
  } catch (error) {
    failures.push({
      source: testCase.source,
      context_source: testCase.context_source || "",
      origins: testCase.origins || [],
      error: error.message || String(error),
    });
  }
}

const output = {
  schema: "canto-span-structural-topology-gate-v3",
  runtime_version: api.runtimeVersion,
  baseline_runtime_version: baseline.baseline_runtime_version,
  baseline_checkpoint: baseline.generated_from,
  policy: "Construction topology must match the cumulative accepted baseline. Intentional structural parser changes require an explicit named baseline update and independent regression evidence; ordinary lexicon changes may not alter construction topology.",
  baseline_total: (baseline.cases || []).length,
  excluded_for_active_candidate: excludedCases.length,
  total: activeCases.length,
  passed: activeCases.length - failures.length,
  failed: failures.length,
  strict_ready: failures.length === 0,
  active_candidate: regression.current_focused_candidate || (api.runtimeVersion !== baseline.baseline_runtime_version ? `v${api.runtimeVersion}` : null),
  exclusions: excludedCases,
  failures,
};
const outDir = path.join(root, "validation", `v${api.runtimeVersion}`);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "structural-topology.json"), JSON.stringify(output, null, 2) + "\n");
fs.writeFileSync(path.join(root, "validation", "lexicon-construction-freeze-current.json"), JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify(output, null, 2));
if (failures.length) process.exit(1);
