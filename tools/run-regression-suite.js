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
module.exports.__regressionApi = {
  analyzeLine, diagnosticSummary, diagnosticFinalRows,
  normalizationAuditSummary, registryAuditSummary, learnerDisplayAuditSummary,
  learnerUiHoverAuditSummary, wrapperCoverageAuditSummary, jyutpingAuditSummary,
  runtimeVersion: CANTO_SPAN_RUNTIME_VERSION,
};`, context, { filename: mainPath });
  return moduleRecord.exports.__regressionApi;
}

function pick(obj, keys) {
  const out = {};
  for (const key of keys) if (obj && obj[key] !== undefined && obj[key] !== "") out[key] = obj[key];
  return out;
}

function compactTrace(detail) {
  if (!detail) return null;
  const out = pick(detail, [
    "kind", "construction_type", "template_family", "template", "assigned_slots", "surfaces",
    "formula_type", "fragment_subtype", "context_requirement_status", "antecedent_status",
    "missing_argument_slots", "selected_alternative", "subject_status", "null_subject", "null_object",
    "null_object_link", "aspect", "particle_contribution", "response_particle", "topic_chain_status",
    "topic_antecedent_source", "topic_antecedent_surface", "topic_frame_status",
    "topic_frame_linker_surface", "topic_frame_domain_surface", "predicate_object_compatibility_status",
    "predicate_object_compatibility_reason", "preserved_root_construction",
    "structural_preservation_status", "semantic_review_flags",
    "malformed_family", "malformed_subtype", "shared_subject_provenance", "not_claims",
    "nominal_predicate_type", "copula_status", "predicate_surface", "measure_domain",
    "quantity_surface", "unit_surface", "dimension_surface",
  ]);
  if (detail.subjectless_type || detail.hidden_subject_inserted !== undefined) {
    Object.assign(out, pick(detail, [
      "subjectless_type", "hidden_subject_inserted", "environmental_subtype", "location_relation",
      "existential_subtype", "polarity", "have_relation", "locative_frame_subtype",
      "introduced_theme_surface", "introduced_participant_surface", "presentational_coda_surface",
    ]));
  } else if (detail.existential_subtype || detail.locative_frame_subtype) {
    Object.assign(out, pick(detail, [
      "existential_subtype", "polarity", "have_relation", "location_relation",
      "locative_frame_subtype", "subject_status", "hidden_subject_inserted",
      "introduced_theme_surface", "introduced_participant_surface", "presentational_coda_surface",
    ]));
  }
  return out;
}

function signature(api, source, contextSource = null) {
  const analysis = api.analyzeLine(source, contextSource);
  const summary = api.diagnosticSummary(analysis);
  const rows = api.diagnosticFinalRows(analysis);
  const normalization = api.normalizationAuditSummary(analysis);
  const registry = api.registryAuditSummary(analysis);
  const learnerDisplay = api.learnerDisplayAuditSummary(analysis);
  const hover = api.learnerUiHoverAuditSummary(analysis);
  const wrapper = api.wrapperCoverageAuditSummary(analysis);
  const jyutping = api.jyutpingAuditSummary(analysis);
  return {
    summary: pick(summary, [
      "top_constructions", "top_child_constructions", "context_requirement_status", "antecedent_status",
      "missing_argument_slots", "selected_alternative", "root_span_coverage_status",
      "root_top_construction_count", "unwrapped_root_nonpunctuation_count", "unwrapped_root_surfaces",
      "semantic_review_flags", "topic_chain_status", "topic_antecedent_source", "topic_antecedent_surface",
      "topic_frame_status", "topic_frame_linker_surface", "topic_frame_domain_surface",
      "linked_null_object_count", "particle_cluster_status",
    ]),
    tree: rows.filter((row) => row.kind !== "text").map((row) => ({
      kind: row.kind, depth: row.depth, parent: row.parent || "",
      surface: row.display_surface || row.surface || "", construction: row.construction || "",
      role: row.role || "", syntax: row.syntax || "", jyutping: row.jyutping || "",
      slots: row.slots || [],
      contextual_role_affordances: (row.contextual_role_affordances || []).map((affordance) => pick(affordance, [
        "role", "slot", "source", "active_before_construction_wrapping", "active_in_final_construction",
      ])),
      trace: row.trace || "", trace_detail: compactTrace(row.trace_detail),
    })),
    audits: {
      normalization: pick(normalization, ["status", "normalization_trace_count", "parser_shadow_repair_count", "raw_display_preservation_status"]),
      registry: pick(registry, ["status", "invalid_learner_role_count", "invalid_slot_name_count", "invalid_construction_label_count", "invalid_parser_decision_label_count"]),
      learner_display: pick(learnerDisplay, ["status"]),
      hover: pick(hover, ["status", "flagged_hover_target_count", "missing_plain_learner_gloss_count"]),
      wrapper: pick(wrapper, ["status", "wrapper_row_count", "unaccounted_wrapper_token_count"]),
      jyutping: pick(jyutping, ["status", "missing_jyutping_count", "invalid_jyutping_format_count", "syllable_count_mismatch_count", "dictionary_disagreement_count"]),
    },
  };
}

const root = path.resolve(__dirname, "..");
const api = loadApi(path.join(root, "main.js"));
const fixturePath = path.join(root, "test-data", "regression-snapshots.json");
const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const cp021bIntentionalSnapshotSources = new Set([
  "给你水。",
  "畀本書佢。",
  "畀佢本書。",
  "我畀錢你。",
  "畀你",
  "畀我啦。",
  "畀我喇。",
]);
if (process.argv.includes("--update-cp021b")) {
  let updated = 0;
  for (const testCase of fixture.cases) {
    if (!cp021bIntentionalSnapshotSources.has(testCase.source)) continue;
    testCase.expected = JSON.parse(JSON.stringify(signature(api, testCase.source, testCase.context_source || null)));
    testCase.cp021b_transition = "frozen_design_replaces_TransferDitransitiveVP_and_RecipientFrame_or_blocks_omitted_arguments";
    updated += 1;
  }
  fixture.runtime_version = api.runtimeVersion;
  fixture.current_focused_candidate = "v0.5.175-cp021b-frozen-design-implementation";
  fs.writeFileSync(fixturePath, JSON.stringify(fixture, null, 2) + "\n");
  console.log(JSON.stringify({ runtime_version: api.runtimeVersion, updated_cases: updated, authorized_sources: cp021bIntentionalSnapshotSources.size }, null, 2));
  process.exit(updated === cp021bIntentionalSnapshotSources.size ? 0 : 1);
}
const v05184NpIntentionalSnapshotSources = new Set([
  "食咗香港嘅飯。",
]);
if (process.argv.includes("--update-v05184-np")) {
  let updated = 0;
  for (const testCase of fixture.cases) {
    if (!v05184NpIntentionalSnapshotSources.has(testCase.source)) continue;
    testCase.expected = JSON.parse(JSON.stringify(signature(api, testCase.source, testCase.context_source || null)));
    testCase.accepted_transition = "v0.5.184_compositional_associative_np_object_boundary";
    testCase.transition_reason = "The complete licensed associative NP 香港嘅飯 replaces the prior truncated object 香港 plus dangling 嘅飯 analysis.";
    updated += 1;
  }
  fixture.runtime_version = api.runtimeVersion;
  fixture.last_intentional_transition = "v0.5.184_compositional_np_first_slice";
  fs.writeFileSync(fixturePath, JSON.stringify(fixture, null, 2) + "\n");
  console.log(JSON.stringify({ runtime_version: api.runtimeVersion, updated_cases: updated, authorized_sources: v05184NpIntentionalSnapshotSources.size }, null, 2));
  process.exit(updated === v05184NpIntentionalSnapshotSources.size ? 0 : 1);
}
if (process.argv.includes("--abandon-demo01")) {
  const focus = Array.isArray(fixture.current_focused_exclusions) ? fixture.current_focused_exclusions : [];
  let updated = 0;
  for (const testCase of fixture.cases) {
    const selected = focus.some((entry) => entry && entry.source === testCase.source
      && (entry.context_source === undefined || (entry.context_source || "") === (testCase.context_source || "")));
    if (!selected) continue;
    testCase.expected = JSON.parse(JSON.stringify(signature(api, testCase.source, testCase.context_source || null)));
    testCase.accepted_transition = "v0.5.184_demo01_track_abandoned_behavior_rebaselined_without_linguistic_promotion";
    updated += 1;
  }
  fixture.current_focused_exclusions = [];
  fixture.abandoned_candidate = fixture.current_focused_candidate || "v0.5.183-cp024-p1-demo01-r1";
  fixture.current_focused_candidate = "";
  fixture.runtime_version = api.runtimeVersion;
  fs.writeFileSync(fixturePath, JSON.stringify(fixture, null, 2) + "\n");
  console.log(JSON.stringify({ runtime_version: api.runtimeVersion, updated_cases: updated, abandoned_candidate: fixture.abandoned_candidate }, null, 2));
  process.exit(updated === focus.length ? 0 : 1);
}
if (process.argv.includes("--absorb-current-focused")) {
  const focus = Array.isArray(fixture.current_focused_exclusions) ? fixture.current_focused_exclusions : [];
  function selected(testCase) {
    return focus.some((entry) => {
      if (typeof entry === "string") return testCase.source === entry;
      if (!entry || entry.source !== testCase.source) return false;
      if (entry.context_source === undefined) return true;
      return (testCase.context_source || "") === (entry.context_source || "");
    });
  }
  let updated = 0;
  for (const testCase of fixture.cases) {
    if (!selected(testCase)) continue;
    testCase.expected = JSON.parse(JSON.stringify(signature(api, testCase.source, testCase.context_source || null)));
    testCase.accepted_transition = "v0.5.180_PostverbalZoPerfectiveVP_promotion";
    updated += 1;
  }
  const previousCandidate = fixture.current_focused_candidate || "";
  fixture.current_focused_exclusions = [];
  fixture.current_focused_candidate = "";
  fixture.last_absorbed_candidate = previousCandidate;
  fixture.absorbed_current_focused_case_count = updated;
  fixture.runtime_version = api.runtimeVersion;
  fs.writeFileSync(fixturePath, JSON.stringify(fixture, null, 2) + "\n");
  console.log(JSON.stringify({ runtime_version: api.runtimeVersion, updated_cases: updated, previous_candidate: previousCandidate }, null, 2));
  process.exit(focus.length && updated ? 0 : 1);
}
const exclusions = Array.isArray(fixture.current_focused_exclusions) ? fixture.current_focused_exclusions : [];
function isFocusedExclusion(testCase) {
  return exclusions.some((entry) => {
    if (typeof entry === "string") return testCase.source === entry;
    if (!entry || entry.source !== testCase.source) return false;
    if (entry.context_source === undefined) return true;
    return (testCase.context_source || "") === (entry.context_source || "");
  });
}
const inheritedCases = fixture.cases.filter((testCase) => !isFocusedExclusion(testCase));
const excludedCases = fixture.cases.filter((testCase) => isFocusedExclusion(testCase));
const failures = [];
for (const testCase of inheritedCases) {
  try {
    const actual = JSON.parse(JSON.stringify(signature(api, testCase.source, testCase.context_source || null)));
    assert.deepStrictEqual(actual, testCase.expected);
  } catch (error) {
    failures.push({ source: testCase.source, context_source: testCase.context_source || "", origins: testCase.origins, error: error.message || String(error) });
  }
}
const output = {
  schema: "canto-span-aggregate-regression-suite-result-v1",
  runtime_version: api.runtimeVersion,
  fixture_runtime_version: fixture.runtime_version,
  absorbed_historical_runner_count: fixture.generated_from_runner_count,
  fixture_case_count: fixture.cases.length,
  current_focused_exclusion_count: exclusions.length,
  current_focused_excluded_case_count: excludedCases.length,
  current_focused_excluded_sources: excludedCases.map((item) => item.source),
  current_focused_candidate: fixture.current_focused_candidate || "",
  total: inheritedCases.length,
  passed: inheritedCases.length - failures.length,
  failed: failures.length,
  strict_ready: failures.length === 0,
  failures,
};
fs.writeFileSync(path.join(root, "validation", "regression-suite.json"), JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify(output, null, 2));
if (failures.length) process.exit(1);
