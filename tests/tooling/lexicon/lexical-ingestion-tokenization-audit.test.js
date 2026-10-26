#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const tokenLexicon = Object.fromEntries(require("../../../src/runtime-resources/lexicon/token-lexicon"));
const {
  lexicalIngestions,
  blockedAtomicSurfaces,
  collectBlockedAtomicSurfaces,
  blockedAtomicRuntimeDisposition,
  ingestionForcedCompositionalSurfaces,
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

test("ingestion specs use functional coverage rather than source-specific exclusions or exact-match quotas", () => {
  for (const spec of lexicalIngestions) {
    assert.equal(spec.require_functional_runtime_coverage, true, `${spec.id}: functional coverage gate`);
    assert.equal(spec.require_exact_runtime_coverage, undefined, `${spec.id}: no exact-surface quota`);
    assert.equal(spec.removed_surfaces, undefined, `${spec.id}: no named removed-surface ledger`);
    assert.equal(spec.contamination_ledger, undefined, `${spec.id}: no source-specific contamination ledger`);
  }
});

test("only neutral multi-character blocked rows become automatic tokenizer guardrails", () => {
  const forced = ingestionForcedCompositionalSurfaces(tokenLexicon);
  assert.ok(blockedAtomicSurfaces.size > 0);
  assert.ok(forced.size > 0);
  for (const surface of forced) {
    assert.ok(blockedAtomicSurfaces.has(surface), `${surface}: force-compositional surface came from a blocked ingestion decision`);
    assert.equal(blockedAtomicRuntimeDisposition(surface, tokenLexicon), "force_compositional_neutral_fallback");
    assert.ok(compositionalLexicalPhrases.has(surface), `${surface}: neutral blocked surface must be parser-forced compositional`);
  }

  assert.equal(blockedAtomicRuntimeDisposition("憂", tokenLexicon), "promotion_only_single_character");
  assert.equal(blockedAtomicRuntimeDisposition("畫畫", tokenLexicon), "promotion_only_independent_runtime_authority");
  assert.ok(!compositionalLexicalPhrases.has("畫畫"), "independently reviewed atomic 畫畫 must retain waak6 waa2 lexical authority");
});

test("all registered lexical ingestions pass source integrity, functional coverage, pronunciation, and architecture gates", () => {
  const report = auditAllLexicalIngestions();
  assert.equal(report.schema, AUDIT_SCHEMA);
  assert.equal(report.ingestion_count, lexicalIngestions.length);
  assert.equal(report.status, "PASS", JSON.stringify(report, null, 2));

  for (const item of report.reports) {
    assert.equal(item.functional_runtime_coverage_required, true, `${item.id}: functional coverage required`);
    assert.equal(item.functional_runtime_gap_count, 0, `${item.id}: no functional runtime gaps`);
    assert.equal(item.functional_runtime_covered, item.source_rows, `${item.id}: every source row is functionally usable`);
    assert.ok(item.exact_runtime_surface_count <= item.source_rows, `${item.id}: exact coverage is informational only`);
    assert.ok(item.blocked_atomic_surfaces >= item.forced_compositional_surfaces);
    assert.equal(item.architecture.status, "PASS");
    assert.equal(item.architecture.blocking_count, 0);
  }
});
