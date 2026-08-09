#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi } = require("./lib/runtime-api");

const root = path.resolve(__dirname, "..");

function replaceOnce(text, oldBlock, newBlock, label) {
  if (!text.includes(oldBlock)) throw new Error(`Missing AA84 replacement target: ${label}`);
  return text.replace(oldBlock, newBlock);
}

const enhancedPath = path.join(root, "tests/tooling/parser-coverage/enhanced.test.js");
let enhanced = fs.readFileSync(enhancedPath, "utf8");
const oldArchitectureBlock = `test("subject-binding public VP identities expose clause structural scope without renaming", () => {
  const cases = [
    ["我要飲水。", "ModalVP"],
    ["我想睇電視。", "DesiderativeVP"],
    ["佢慢慢噉食飯。", "MannerAdverbialVP"],
    ["我鍾意食飯。", "PreferenceVP"],
  ];
  for (const [source, construction] of cases) {
    const [record] = recordsForSentences([source]);
    const trace = record.construction_traces.find((item) => item.construction === construction);
    assert(trace, \`missing \${construction} for \${source}\`);
    assert.equal(trace.structural_scope, "clause");
    assert.equal(trace.structural_scope_source, "clause_level_slot");
    assert(!record.sanity_findings.some((finding) => finding.code === "vp_scope_binds_clause_level_slot"));
  }
});`;
const newArchitectureBlock = `test("subject-binding public VP identities expose clause structural scope without renaming", () => {
  const cases = [
    ["我要飲水。", "ModalVP"],
    ["我想睇電視。", "DesiderativeVP"],
    ["我鍾意食飯。", "PreferenceVP"],
  ];
  for (const [source, construction] of cases) {
    const [record] = recordsForSentences([source]);
    const trace = record.construction_traces.find((item) => item.construction === construction);
    assert(trace, \`missing \${construction} for \${source}\`);
    assert.equal(trace.structural_scope, "clause");
    assert.equal(trace.structural_scope_source, "clause_level_slot");
    assert(!record.sanity_findings.some((finding) => finding.code === "vp_scope_binds_clause_level_slot"));
  }
});

test("AA84 keeps the subject in an outer clause while the marked manner construction stays VP-scoped", () => {
  const [record] = recordsForSentences(["佢慢慢噉食飯。"]);
  const outer = record.construction_traces.find((item) => item.construction === "SubjectPredicateClause" && item.depth === 0);
  const manner = record.construction_traces.find((item) => item.construction === "MannerAdverbialVP");
  assert(outer);
  assert(manner);
  assert.equal(outer.structural_scope, "clause");
  assert.equal(manner.structural_scope, "vp");
  assert.equal(manner.structural_scope_source, "reviewed_mixed_clause_vp_definition");
  assert.equal(manner.surface, "慢慢噉食飯");
  assert.equal(manner.assigned_slots.includes("subject"), false);
  assert.equal((manner.matcher_definition.template || []).some((slot) => String(slot).startsWith("subject")), false);
  assert(!record.sanity_findings.some((finding) => finding.code === "vp_scope_binds_clause_level_slot"));
});`;
enhanced = replaceOnce(enhanced, oldArchitectureBlock, newArchitectureBlock, "enhanced architecture test");
fs.writeFileSync(enhancedPath, enhanced);

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

const fixturePath = path.join(root, "tests/fixtures/regression-snapshots.json");
const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const target = fixture.cases.find((row) => row.source === "佢慢慢噉食飯。" && !(row.context_source || ""));
if (!target) throw new Error("REG-0546 source not found for AA84 transition");
const api = loadRuntimeApi();
target.expected = JSON.parse(JSON.stringify(signature(api, target.source, target.context_source || null)));
target.accepted_transition = "aa84_overt_marked_manner_boundary_repair";
target.transition_reason = "AA84 now begins at the typed reduplicated manner constituent; overt subject is preserved by an outer SubjectPredicateClause instead of being absorbed into the VP identity.";
fixture.runtime_version = api.runtimeVersion;
fixture.last_intentional_transition = "aa84_overt_marked_manner_boundary_repair";
fs.writeFileSync(fixturePath, `${JSON.stringify(fixture, null, 2)}\n`);

console.log(JSON.stringify({
  updated_architecture_test: true,
  updated_regression_sources: [target.source],
  runtime_version: api.runtimeVersion,
}, null, 2));
