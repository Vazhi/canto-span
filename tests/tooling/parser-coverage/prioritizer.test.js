"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  PRIORITY_SCHEMA,
  actionClassForReadiness,
  buildPriorityReport,
  formatHuman,
  gapPointsForCounts,
  unknownLexiconQueue,
} = require("../../../tools/parser-work-prioritizer");

const readiness = [
  {
    construction_uuid: "uuid-a",
    construction_code: "AA01",
    canonical_name: "ReadyForRuntimeRepair",
    legacy_label: "RuntimeGap",
    lifecycle_state: "current",
    linguistic_status: "research_pending",
    candidate_state: "source_supported",
    readiness_score: 70,
    nearest_missing_gate: "runtime_research_alignment",
    next_best_action: "reconcile accepted research with runtime behavior",
  },
  {
    construction_uuid: "uuid-b",
    construction_code: "AA02",
    canonical_name: "PanelPending",
    legacy_label: "PanelGap",
    lifecycle_state: "current",
    linguistic_status: "research_pending",
    candidate_state: "boundary_ready",
    readiness_score: 90,
    nearest_missing_gate: "role_neutral_panel_threshold",
    next_best_action: "collect panel judgments",
  },
  {
    construction_uuid: "uuid-c",
    construction_code: "AA03",
    canonical_name: "ExcludedInternal",
    legacy_label: "ExcludedGap",
    lifecycle_state: "current",
    linguistic_status: "parser_heuristic",
    candidate_state: "excluded_nonlanguage",
    readiness_score: 0,
    nearest_missing_gate: "language_claim_defined",
    next_best_action: "keep excluded",
  },
];

function coverageRecord(source, status, labels = [], options = {}) {
  return {
    source,
    context_source: options.context_source || "",
    coverage_status: status,
    categories: options.categories || [],
    top_constructions: labels,
    construction_traces: labels.map((construction) => ({ construction, internal_construction: construction })),
    token_provenance: options.tokens || [],
    unwrapped_root_surfaces: options.unwrapped_root_surfaces || [],
  };
}

const records = [
  coverageRecord("A one", "REVIEW_REQUIRED", ["RuntimeGap"]),
  coverageRecord("A two", "REVIEW_REQUIRED", ["RuntimeGap"], { categories: ["context_dependent_or_incomplete"] }),
  coverageRecord("B partial", "PARTIAL_STRUCTURE", ["PanelGap"]),
  coverageRecord("excluded", "REVIEW_REQUIRED", ["ExcludedGap"]),
  coverageRecord("unknown one", "UNKNOWN_LEXICON", [], {
    tokens: [{ surface: "罕字", lexical_status: "unknown" }],
    unwrapped_root_surfaces: ["罕字"],
  }),
  coverageRecord("unknown two", "UNKNOWN_LEXICON", [], {
    tokens: [{ surface: "罕字", lexical_status: "unknown" }, { surface: "另字", lexical_status: "unknown" }],
  }),
  coverageRecord("known but unresolved", "UNRESOLVED_STRUCTURE", [], {
    categories: ["known_lexicon_unresolved_structure"],
  }),
];

const debtRows = [
  { construction: "RuntimeGap", transition_status: "migration_candidate", transition_bucket: "slot_heuristic", source: "A one" },
  { construction: "RuntimeGap", transition_status: "migration_candidate", transition_bucket: "slot_heuristic", source: "A two" },
  { construction: "RuntimeGap", transition_status: "migration_candidate", transition_bucket: "legacy_surface_rule", source: "A three" },
  { construction: "PanelGap", transition_status: "accepted_bounded_template", transition_bucket: "construction_template", source: "B partial" },
];

test("prioritizer ranks development work from explicit decomposed factors", () => {
  const report = buildPriorityReport({
    coverageRecords: records,
    readinessRecords: readiness,
    debtRows,
    runtimeVersion: "test",
    limit: 10,
    sampleLimit: 3,
  });
  assert.equal(report.schema, PRIORITY_SCHEMA);
  assert.equal(report.policy.evidence_weight, 0);
  assert.equal(report.policy.linguistic_confidence, null);
  assert.equal(report.policy.frequency_is_linguistic_evidence, false);
  assert.equal(report.policy.learner_value_factor, "not_available_in_canonical_inputs_and_not_invented");

  assert.deepEqual(report.ranked_construction_work.map((row) => row.construction_code), ["AA01", "AA02"]);
  const first = report.ranked_construction_work[0];
  assert.equal(first.action_class, "runtime_implementation");
  assert.equal(first.coverage_gap_counts.REVIEW_REQUIRED, 2);
  assert.equal(first.architecture_debt_trace_count, 3);
  assert.equal(first.context_dependent_record_count, 1);
  assert.equal(first.score.total, 64);
  assert.equal(
    first.score.total,
    first.score.components.coverage_gap_points
      + first.score.components.architecture_debt_points
      + first.score.components.candidate_state_points
      + first.score.components.missing_gate_points,
  );
  assert(!report.ranked_construction_work.some((row) => row.construction_code === "AA03"));
});

test("gap/debt frequency is capped and remains development-only", () => {
  const gap = gapPointsForCounts({ REVIEW_REQUIRED: 100 });
  assert.equal(gap.detail.REVIEW_REQUIRED.raw_count, 100);
  assert.equal(gap.detail.REVIEW_REQUIRED.capped_count, 5);
  assert.equal(gap.points, 40);
});

test("unknown lexicon is a separate queue, not construction evidence", () => {
  const queue = unknownLexiconQueue(records, 2);
  assert.deepEqual(queue.map((row) => [row.surface, row.executable_case_count]), [["罕字", 2], ["另字", 1]]);
  assert.equal(queue[0].action_class, "lexicon_work");
  assert.equal(queue[0].evidence_weight, 0);
  assert.equal(queue[0].linguistic_confidence, null);
});

test("unmapped structural gaps remain explicit instead of receiving fabricated construction mappings", () => {
  const report = buildPriorityReport({
    coverageRecords: records,
    readinessRecords: readiness,
    debtRows,
    runtimeVersion: "test",
    limit: 10,
    sampleLimit: 3,
  });
  const unresolved = report.unmapped_gap_buckets.find((row) => row.coverage_status === "UNRESOLVED_STRUCTURE");
  assert(unresolved);
  assert.equal(unresolved.count, 1);
  assert.equal(unresolved.action_class, "manual_review");
  const unknown = report.unmapped_gap_buckets.find((row) => row.coverage_status === "UNKNOWN_LEXICON");
  assert(unknown);
  assert.equal(unknown.action_class, "lexicon_work");
});

test("canonical missing gates determine the next action class without promotion", () => {
  assert.equal(actionClassForReadiness(readiness[0]), "runtime_implementation");
  assert.equal(actionClassForReadiness(readiness[1]), "manual_review");
  assert.equal(actionClassForReadiness(readiness[2]), "excluded");
  assert.equal(actionClassForReadiness({ nearest_missing_gate: "negative_boundaries_complete" }), "test_boundary_work");
  assert.equal(actionClassForReadiness({ nearest_missing_gate: "source_scope_matches_claim" }), "research");
});

test("report is deterministic and human output states the non-evidentiary policy", () => {
  const options = { coverageRecords: records, readinessRecords: readiness, debtRows, runtimeVersion: "test", limit: 10, sampleLimit: 3 };
  const first = buildPriorityReport(options);
  const second = buildPriorityReport(options);
  assert.deepEqual(first, second);
  const human = formatHuman(first);
  assert.match(human, /Frequency\/test counts carry evidence weight 0/);
  assert.match(human, /AA01 ReadyForRuntimeRepair/);
  assert.match(human, /Unknown lexicon work/);
});
