"use strict";

const path = require("path");
const { LINGUISTIC_STATUSES } = require("./construction-notes-lib");

function isSafeRepositoryRelativePath(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  if (path.isAbsolute(value)) return false;
  const normalized = path.posix.normalize(value.replace(/\\/g, "/"));
  return normalized === value.replace(/\\/g, "/")
    && normalized !== "."
    && !normalized.startsWith("../")
    && !normalized.includes("/../");
}

function validateStatusBaselineSnapshot(snapshot) {
  const failures = [];
  if (!snapshot || snapshot.schema !== "canto-span-construction-status-baseline-v1") {
    failures.push("invalid_status_baseline_schema");
    return failures;
  }
  if (!/^\d+\.\d+\.\d+$/.test(String(snapshot.runtime_version || ""))) {
    failures.push("invalid_status_baseline_runtime_version");
  }
  if (!Array.isArray(snapshot.statuses)) {
    failures.push("invalid_status_baseline_statuses");
    return failures;
  }

  const seen = new Set();
  const derivedCounts = Object.fromEntries(LINGUISTIC_STATUSES.map((status) => [status, 0]));
  for (const item of snapshot.statuses) {
    const construction = String(item && item.construction || "").trim();
    const status = String(item && item.status || "").trim();
    if (!construction) failures.push("status_baseline_missing_construction");
    else if (seen.has(construction)) failures.push(`status_baseline_duplicate_construction:${construction}`);
    else seen.add(construction);
    if (!LINGUISTIC_STATUSES.includes(status)) failures.push(`status_baseline_invalid_status:${construction}:${status}`);
    else derivedCounts[status] += 1;
  }

  if (Number(snapshot.construction_count) !== snapshot.statuses.length) {
    failures.push(`status_baseline_count_mismatch:${snapshot.construction_count}!=${snapshot.statuses.length}`);
  }
  const recordedCounts = snapshot.status_counts || {};
  for (const status of LINGUISTIC_STATUSES) {
    if (Number(recordedCounts[status] || 0) !== derivedCounts[status]) {
      failures.push(`status_baseline_status_count_mismatch:${status}:${recordedCounts[status] || 0}!=${derivedCounts[status]}`);
    }
  }
  return failures;
}

function validateReleaseAudit({ audit, actualChanges, supportedPending, retirement }) {
  const failures = [];
  if (audit.schema !== "canto-span-release-handoff-audit-v3") failures.push("invalid_schema");

  const baseline = audit.base_status_snapshot || {};
  if (!isSafeRepositoryRelativePath(baseline.path) || !String(baseline.path).startsWith("data/release-baselines/")) failures.push("invalid_base_status_snapshot_path");
  if (!/^[0-9a-f]{64}$/.test(String(baseline.sha256 || ""))) failures.push("invalid_base_status_snapshot_sha256");
  if (!/^\d+\.\d+\.\d+$/.test(String(baseline.runtime_version || ""))) failures.push("invalid_base_status_snapshot_runtime_version");

  const recordedChanges = [...(audit.status_changes || [])].sort((a, b) => a.construction.localeCompare(b.construction));
  const sortedActual = [...actualChanges].sort((a, b) => a.construction.localeCompare(b.construction));
  if (JSON.stringify(sortedActual) !== JSON.stringify(recordedChanges)) failures.push(`status_changes_mismatch:${JSON.stringify(recordedChanges)}!=${JSON.stringify(sortedActual)}`);

  const auditByConstruction = new Map((audit.changed_construction_audit || []).map((item) => [item.construction, item]));
  for (const change of sortedActual) {
    const item = auditByConstruction.get(change.construction);
    if (!item) { failures.push(`missing_changed_construction_audit:${change.construction}`); continue; }
    if (item.old_status !== change.old_status || item.new_status !== change.new_status) failures.push(`changed_construction_status_mismatch:${change.construction}`);
    if (!String(item.plain_language_claim || "").trim()) failures.push(`missing_plain_language_claim:${change.construction}`);
    if (!Array.isArray(item.code_locations) || !item.code_locations.length) failures.push(`missing_code_locations:${change.construction}`);
    if (!Array.isArray(item.sources) || !item.sources.every((source) => source && source.citation && source.locator && source.verification)) failures.push(`missing_verifiable_sources:${change.construction}`);
    for (const field of ["panel_response_count_total", "eligible_panel_response_count", "minimum_usable_judgments_per_critical_item"]) {
      if (!Number.isFinite(Number(item[field]))) failures.push(`missing_panel_field:${change.construction}:${field}`);
    }
    for (const field of ["survey_instrument_version", "survey_instrument_status", "quality_screen_status", "panel_adjudication_status"]) {
      if (!String(item[field] || "").trim()) failures.push(`missing_panel_field:${change.construction}:${field}`);
    }
    if (!Array.isArray(item.unresolved_questions)) failures.push(`missing_unresolved_questions:${change.construction}`);
  }
  if (auditByConstruction.size !== sortedActual.length) failures.push("changed_construction_audit_has_extra_or_missing_records");

  const pending = [...supportedPending].sort();
  const recordedPending = [...(audit.supported_productive_pending_reaudit || [])].sort();
  if (JSON.stringify(pending) !== JSON.stringify(recordedPending)) failures.push(`supported_pending_reaudit_mismatch:${JSON.stringify(recordedPending)}!=${JSON.stringify(pending)}`);
  if (pending.length) failures.push(`supported_productive_not_current_standard:${pending.join(",")}`);

  if (!String(audit.implementation_validation || "").trim()) failures.push("missing_implementation_validation_line");
  if (!String(audit.linguistic_confidence || "").trim()) failures.push("missing_linguistic_confidence_line");
  if (audit.implementation_validation === audit.linguistic_confidence) failures.push("implementation_and_linguistic_reporting_not_separate");
  if (audit.code_analysis_overclaim_review !== true) failures.push("code_analysis_overclaim_review_not_complete");
  if (!String(audit.overclaim_review_scope || "").trim()) failures.push("missing_overclaim_review_scope");
  if (audit.external_audit_ready !== true) failures.push("release_not_marked_external_audit_ready");

  if (!retirement || retirement.schema !== "canto-span-retirement-review-cadence-v1") failures.push("invalid_retirement_cadence_schema");
  const gap = retirement ? Number(audit.handoff_sequence) - Number(retirement.last_full_review_sequence) : NaN;
  if (retirement && Number(audit.handoff_sequence) !== Number(retirement.current_handoff_sequence)) failures.push("handoff_sequence_retirement_state_mismatch");
  if (retirement && gap > Number(retirement.hard_interval_max)) failures.push(`retirement_review_overdue:${gap}>${retirement.hard_interval_max}`);

  return { failures, gap };
}

module.exports = {
  isSafeRepositoryRelativePath,
  validateStatusBaselineSnapshot,
  validateReleaseAudit,
};
