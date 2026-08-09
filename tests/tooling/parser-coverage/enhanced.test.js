#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const {
  aggregateCoverage,
  enhanceCoverageRecord,
  matcherIdentityForTrace,
  recordsForSentences,
} = require("../../../tools/parser-coverage-enhanced");

test("matcher fingerprint ignores instance surfaces but changes with controlled definition", () => {
  const trace = {
    construction: "ExampleConstruction",
    internal_construction: "ExampleConstruction",
    trace_kind: "generative_template",
    template_family: "generative_template",
    template: ["subject!", "predicate!"],
  };
  const rowA = {
    trace_detail: {
      kind: "generative_template",
      construction_type: "ExampleConstruction",
      template_family: "generative_template",
      template: ["subject!", "predicate!"],
      constraints: { first_node_must_have_surface: ["我", "你"] },
      assigned_slots: ["subject", "predicate"],
      surfaces: ["我", "食飯"],
    },
  };
  const rowB = {
    trace_detail: {
      ...rowA.trace_detail,
      surfaces: ["你", "飲水"],
    },
  };
  const rowChanged = {
    trace_detail: {
      ...rowA.trace_detail,
      constraints: { first_node_must_have_surface: ["我"] },
    },
  };

  const a = matcherIdentityForTrace(trace, rowA);
  const b = matcherIdentityForTrace(trace, rowB);
  const changed = matcherIdentityForTrace(trace, rowChanged);
  assert.equal(a.matcher_id, b.matcher_id);
  assert.equal(a.matcher_fingerprint, b.matcher_fingerprint);
  assert.notEqual(a.matcher_id, changed.matcher_id);
  assert.notEqual(a.matcher_fingerprint, changed.matcher_fingerprint);
  assert.equal(a.matcher_identity_source, "diagnostic_definition_fingerprint");
});

test("A-not-A repeated verbs receive distinct ordered token offsets", () => {
  const [record] = recordsForSentences(["你食唔食飯？"]);
  const root = record.construction_traces.find((trace) => trace.construction === "ANotAQuestion");
  const verbs = root.slot_bindings.filter((binding) => binding.slot === "action_verb");
  assert.equal(verbs.length, 2);
  assert.deepEqual(
    verbs.map((binding) => [binding.relative_span.start, binding.relative_span.end]),
    [[1, 2], [3, 4]],
  );
  assert(verbs.every((binding) => binding.relative_span.resolution === "ordered_token_sequence"));
  assert.notEqual(verbs[0].relative_span.token_start, verbs[1].relative_span.token_start);
});

test("nested predicate slots can be reconstructed from contained ordered tokens", () => {
  const [record] = recordsForSentences(["我食飯。"]);
  const root = record.construction_traces.find((trace) => trace.construction === "SubjectPredicateClause");
  const predicate = root.slot_bindings.find((binding) => binding.slot === "predicate");
  assert.equal(predicate.surface, "食飯");
  assert.equal(predicate.relative_span.start, 1);
  assert.equal(predicate.relative_span.end, 3);
  assert.equal(predicate.relative_span.resolution, "ordered_token_sequence");
});

test("live reusable construction matcher identity is stable across vocabulary changes", () => {
  const records = recordsForSentences(["我食飯。", "你食飯。"]);
  const roots = records.map((record) => record.construction_traces.find((trace) => trace.construction === "SubjectPredicateClause"));
  assert(roots[0]);
  assert(roots[1]);
  assert.equal(roots[0].matcher_id, roots[1].matcher_id);
  assert.equal(roots[0].matcher_definition.construction_type, "SubjectPredicateClause");
});

test("ordered surface fallback remains deterministic when token rows are unavailable", () => {
  const record = enhanceCoverageRecord(
    {
      source: "食唔食",
      construction_count: 1,
      top_constructions: ["ANotAQuestion"],
      trace_summary: { generative_template: 1 },
      template_family_summary: { generative_template: 1 },
      root_span_coverage_status: "PASS",
      root_top_construction_count: 1,
      semantic_acceptance_status: "MANUAL_REVIEW_ELIGIBLE",
    },
    [{
      kind: "construction",
      construction: "ANotAQuestion",
      surface: "食唔食",
      depth: 0,
      trace: "generative_template",
      trace_detail: {
        kind: "generative_template",
        construction_type: "ANotAQuestion",
        template_family: "generative_template",
        template: ["action_verb!", "m4_negator!", "action_verb!"],
        constraints: {},
        assigned_slots: ["action_verb", "m4_negator", "action_verb"],
        surfaces: ["食", "唔", "食"],
      },
    }],
  );
  const bindings = record.construction_traces[0].slot_bindings;
  assert.deepEqual(bindings.map((binding) => binding.relative_span.start), [0, 1, 2]);
  assert(bindings.every((binding) => binding.relative_span.resolution === "ordered_surface_fallback"));
});

test("aggregate report counts matcher identities and leaves no unresolved slots for smoke examples", () => {
  const records = recordsForSentences(["我食飯。", "你食唔食飯？", "我要飲水。"]);
  const report = aggregateCoverage(records);
  assert(Object.keys(report.matcher_counts).length > 0);
  assert(report.slot_span_resolution_counts.ordered_token_sequence > 0);
  assert.equal(report.unresolved_slot_span_count, 0);
});
