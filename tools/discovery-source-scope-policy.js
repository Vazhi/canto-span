"use strict";

function gate(status, evidence, detail = "") {
  return { status, evidence, ...(detail ? { detail } : {}) };
}

function sourceScopeGate(frontmatter = {}, allVerified = false) {
  const complete = frontmatter.current_standard_reaudit_complete === true;
  const explicit = frontmatter.source_scope_matches_claim;

  if (complete && explicit === false) {
    return gate("fail", "completed_reaudit_found_claim_scope_mismatch");
  }

  if (complete && explicit === true) {
    return allVerified
      ? gate("pass", "completed_reaudit_explicitly_matches_verified_source_scope")
      : gate("unresolved", "explicit_scope_match_without_all_sources_verified");
  }

  // Backward compatibility for already-reviewed records that predate the explicit
  // audit-outcome field. Preserve the exact prior gate/evidence bytes until those
  // records opt into an explicit true/false outcome.
  if (complete && allVerified) {
    return gate("pass", "current_standard_reaudit_complete_with_verified_sources");
  }

  if (allVerified) {
    return gate("partial", "verified_sources_but_scope_reaudit_incomplete");
  }

  return gate("unresolved", "source_scope_not_closed");
}

function sourceStageCandidateState(gates = {}) {
  if (gates.independent_source_support?.status !== "pass") return "research_candidate";
  if (gates.source_scope_matches_claim?.status === "fail") return "narrowing_candidate";
  return "source_supported";
}

module.exports = {
  sourceScopeGate,
  sourceStageCandidateState,
};
