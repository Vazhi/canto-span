#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");
const {
  ARCHITECTURE_AUDIT_SCHEMA,
  auditArchitecture,
  buildExecutableCorpus,
  createFailureCollector,
  unexplainedMatcherSplits,
} = require("../../../tools/parser-architecture-audit");

const root = path.resolve(__dirname, "../../..");

test("canonical executable corpus is deduplicated and broad", () => {
  const corpus = buildExecutableCorpus(root);
  assert(corpus.length >= 800);
  const keys = corpus.map((row) => `${row.context_source || ""}\u0000${row.source}`);
  assert.equal(new Set(keys).size, corpus.length);
  assert(corpus.some((row) => row.origins.includes("regression")));
  assert(corpus.some((row) => row.origins.includes("np")));
  assert(corpus.some((row) => row.origins.some((origin) => origin.startsWith("construction:"))));
});

test("permanent architecture audit is clean on the canonical executable corpus", () => {
  const report = auditArchitecture({ root });
  assert.equal(report.schema, ARCHITECTURE_AUDIT_SCHEMA);
  assert.equal(report.status, "PASS");
  assert.equal(report.blocking_count, 0);
  assert.equal(report.corpus.parse_failures, 0);
  assert(report.corpus.analyzed >= 800);
  assert(report.corpus.construction_rows > 1000);
  assert(report.corpus.semantic_bindings > 3000);
  assert.equal(report.failure_groups.length, 0);
  assert.equal(report.unexplained_matcher_split_count, 0);
});

test("coverage gaps remain informational rather than architecture blockers", () => {
  const report = auditArchitecture({ root });
  const informationalTotal = Object.values(report.informational.coverage_status_counts)
    .reduce((sum, count) => sum + count, 0);
  assert.equal(informationalTotal, report.corpus.analyzed);
  assert.equal(report.blocking_count, 0);
});

test("matcher split gate distinguishes authored variants from unexplained splits", () => {
  const base = {
    construction: "ExampleConstruction",
    rule_descriptor: "subject! + predicate!",
    surface: "例子",
  };
  const unexplained = unexplainedMatcherSplits([
    { ...base, matcher_fingerprint: "fp-a", matcher_variant_id: "" },
    { ...base, matcher_fingerprint: "fp-b", matcher_variant_id: "" },
  ]);
  assert.equal(unexplained.length, 1);

  const explained = unexplainedMatcherSplits([
    { ...base, matcher_fingerprint: "fp-a", matcher_variant_id: "Example.variant_a" },
    { ...base, matcher_fingerprint: "fp-b", matcher_variant_id: "Example.variant_b" },
  ]);
  assert.equal(explained.length, 0);
});

test("grouped blocker collector reports root causes instead of sentence-level noise", () => {
  const failures = createFailureCollector(2);
  failures.add("trace_taxonomy_invalid", { source: "甲" });
  failures.add("trace_taxonomy_invalid", { source: "乙" });
  failures.add("trace_taxonomy_invalid", { source: "丙" });
  failures.add("vp_scope_binds_clause_level_slot", { source: "丁" });
  const groups = failures.report();
  assert.equal(failures.count(), 4);
  assert.deepEqual(groups.map((row) => [row.code, row.count]), [
    ["trace_taxonomy_invalid", 3],
    ["vp_scope_binds_clause_level_slot", 1],
  ]);
  assert.equal(groups[0].examples.length, 2);
});
