#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const { loadRuntimeApi } = require("../../lib/runtime-api");

const api = loadRuntimeApi({
  apiNames: [
    "analyzeLine",
    "labelTransitionTracePolicy",
    "labelTransitionAuditSummary",
  ],
});

function policy(kind, extra = {}) {
  return api.labelTransitionTracePolicy({ trace: { kind, ...extra } });
}

test("bounded and reusable templates are accepted architectures rather than debt", () => {
  const reusable = policy("generative_template", { template_family: "generative_template" });
  const bounded = policy("generative_template", { template_family: "construction_template" });
  const directBounded = policy("construction_template", { template_family: "construction_template" });

  assert.equal(reusable.status, "accepted_reusable_template");
  assert.equal(reusable.debt, false);
  assert.equal(bounded.status, "accepted_bounded_template");
  assert.equal(bounded.debt, false);
  assert.equal(directBounded.status, "accepted_bounded_template");
  assert.equal(directBounded.debt, false);
});

test("governed specialized implementations are not automatically migration debt", () => {
  for (const kind of [
    "construction_function",
    "governed_discourse_wrapper",
    "source_linked_runtime_matcher",
  ]) {
    const row = policy(kind);
    assert.equal(row.status, "accepted_specialized_implementation", kind);
    assert.equal(row.debt, false, kind);
  }

  assert.equal(policy("special_ambiguity_rule").status, "accepted_guardrail");
  assert.equal(policy("protected_formula_table").status, "accepted_closed_table");
  assert.equal(policy("construction_internal_parser_inactive_clone").status, "accepted_internal_support");
  assert.equal(policy("phase4_controlled_grammar_promotion").status, "transition_review");
  assert.equal(policy("phase4_controlled_grammar_promotion").debt, false);
});

test("legacy, surface-specific, and heuristic lanes remain actionable debt", () => {
  for (const kind of [
    "legacy_surface_rule",
    "surface_specific_phrase_rule",
    "generative_or_heuristic_slot_rule",
    "predicate_heuristic",
  ]) {
    const row = policy(kind);
    assert.equal(row.status, "migration_candidate", kind);
    assert.equal(row.debt, true, kind);
  }
});

test("unknown construction trace kinds still fail classification closed", () => {
  const unknown = policy("future_unclassified_trace_kind");
  assert.equal(unknown.status, "needs_registry_decision");
});

test("live bounded and specialized examples do not become migration candidates merely for architecture shape", () => {
  for (const source of [
    "我食咗飯。",
    "你好。",
    "我有得去。",
  ]) {
    const summary = api.labelTransitionAuditSummary(api.analyzeLine(source));
    assert.equal(summary.status, "PASS", source);
    assert.equal(summary.migration_candidate_count, 0, source);
    assert.equal(summary.needs_registry_decision_count, 0, source);
  }

  const bounded = api.labelTransitionAuditSummary(api.analyzeLine("我食咗飯。"));
  assert(bounded.accepted_template_count > 0);
  const specialized = api.labelTransitionAuditSummary(api.analyzeLine("我有得去。"));
  assert(specialized.accepted_specialized_count > 0);
});
