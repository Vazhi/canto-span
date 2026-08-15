#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const {
  lexicalIngestions,
  blockedAtomicSurfaces,
  collectBlockedAtomicSurfaces,
} = require("../../../src/runtime-resources/lexicon/lexical-ingestion-registry");
const compositionalLexicalPhrases = new Set(require("../../../src/runtime-resources/lexicon/compositional-lexical-phrases"));
const {
  AUDIT_SCHEMA,
  auditAllLexicalIngestions,
} = require("../../../tools/lexical-ingestion-tokenization-audit");

test("lexical ingestion registry exposes reusable blocked-atomic policy extraction", () => {
  const sample = collectBlockedAtomicSurfaces([
    { BLOCKED_ATOMIC_SURFACES: new Set(["甲乙"]) },
    { PROTECTED_NEUTRAL_SURFACES: { "丙丁": "blocked_atomic", "戊己": "research_required" } },
  ]);
  assert.deepEqual(new Set(sample), new Set(["甲乙", "丙丁"]));
  assert.ok(lexicalIngestions.length >= 1);
  assert.ok(lexicalIngestions.every((spec) => spec.id && spec.source_file && spec.surface_column));
});

test("every registered blocked-atomic ingestion surface is parser-forced compositional", () => {
  assert.ok(blockedAtomicSurfaces.size > 0);
  for (const surface of blockedAtomicSurfaces) {
    assert.ok(compositionalLexicalPhrases.has(surface), `${surface}: registered blocked_atomic surface must be forced compositional`);
  }
});

test("all registered lexical ingestions pass contamination, tokenization, coverage, and injected architecture gates", () => {
  const report = auditAllLexicalIngestions();
  assert.equal(report.schema, AUDIT_SCHEMA);
  assert.equal(report.ingestion_count, lexicalIngestions.length);
  assert.equal(report.status, "PASS", JSON.stringify(report, null, 2));

  const cifu = report.reports.find((item) => item.id === "cifu-spoken-top-2000");
  assert.ok(cifu, "Cifu top-2000 ingestion remains registered");
  assert.equal(cifu.source_rows, 2000);
  assert.equal(cifu.effective_runtime_expected, 1999);
  assert.deepEqual(cifu.removed_surfaces, ["多少"]);
  assert.ok(cifu.blocked_atomic_surfaces > 0);
  assert.equal(cifu.architecture.status, "PASS");
  assert.equal(cifu.architecture.blocking_count, 0);
});
