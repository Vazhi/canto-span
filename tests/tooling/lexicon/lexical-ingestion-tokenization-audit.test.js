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
  assert.ok(cifu.blocked_atomic_surfaces > cifu.forced_compositional_surfaces);
  assert.ok(cifu.forced_compositional_surfaces > 0);
  assert.ok(cifu.promotion_only_blocked_surfaces > 0);
  assert.equal(cifu.architecture.status, "PASS");
  assert.equal(cifu.architecture.blocking_count, 0);
});
