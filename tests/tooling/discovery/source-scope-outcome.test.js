"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const {
  sourceScopeGate,
  sourceStageCandidateState,
} = require("../../../tools/discovery-source-scope-policy");

function gates(scopeStatus, sourceStatus = "pass") {
  return {
    independent_source_support: { status: sourceStatus },
    source_scope_matches_claim: { status: scopeStatus },
  };
}

test("completed explicit source-scope match passes when all cited sources are verified", () => {
  assert.deepEqual(
    sourceScopeGate({ current_standard_reaudit_complete: true, source_scope_matches_claim: true }, true),
    { status: "pass", evidence: "completed_reaudit_explicitly_matches_verified_source_scope" }
  );
  assert.equal(sourceStageCandidateState(gates("pass")), "source_supported");
});

test("completed explicit source-scope mismatch fails and routes source-backed work to narrowing", () => {
  assert.deepEqual(
    sourceScopeGate({ current_standard_reaudit_complete: true, source_scope_matches_claim: false }, true),
    { status: "fail", evidence: "completed_reaudit_found_claim_scope_mismatch" }
  );
  assert.equal(sourceStageCandidateState(gates("fail")), "narrowing_candidate");
});

test("explicit match cannot pass before all cited sources are verified", () => {
  assert.deepEqual(
    sourceScopeGate({ current_standard_reaudit_complete: true, source_scope_matches_claim: true }, false),
    { status: "unresolved", evidence: "explicit_scope_match_without_all_sources_verified" }
  );
});

test("legacy completed records without explicit outcome remain backward compatible", () => {
  assert.deepEqual(
    sourceScopeGate({ current_standard_reaudit_complete: true }, true),
    { status: "pass", evidence: "legacy_completed_reaudit_without_explicit_scope_outcome" }
  );
  assert.equal(sourceStageCandidateState(gates("pass")), "source_supported");
});

test("verified sources with incomplete re-audit remain partial rather than mismatch", () => {
  assert.deepEqual(
    sourceScopeGate({ current_standard_reaudit_complete: false }, true),
    { status: "partial", evidence: "verified_sources_but_scope_reaudit_incomplete" }
  );
  assert.equal(sourceStageCandidateState(gates("partial")), "source_supported");
});

test("unverified source scope remains unresolved", () => {
  assert.deepEqual(
    sourceScopeGate({ current_standard_reaudit_complete: false }, false),
    { status: "unresolved", evidence: "source_scope_not_closed" }
  );
  assert.equal(sourceStageCandidateState(gates("unresolved", "partial")), "research_candidate");
});
