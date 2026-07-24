#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_ROOT = path.resolve(__dirname, "..");
const PANEL_STATE = "review-packets/native-panel/active-v2/panel-review-state.json";

function numericValue(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function acceptedSnapshotFailures(entry, snapshot, { snapshotExists = Boolean(snapshot) } = {}) {
  const failures = [];
  const total = numericValue(entry?.panel_response_count_total);
  const eligible = numericValue(entry?.eligible_panel_response_count);

  if (total === null || total < 0) failures.push("panel_response_count_total must be a nonnegative number");
  if (eligible === null || eligible < 0) failures.push("eligible_panel_response_count must be a nonnegative number");
  if (total !== null && eligible !== null && eligible > total) {
    failures.push("eligible panel responses cannot exceed total panel responses");
  }

  if (!(eligible > 0)) return failures;

  if (typeof entry.committed_response_snapshot !== "string" || entry.committed_response_snapshot.length === 0) {
    failures.push("accepted panel responses require committed_response_snapshot");
  }
  if (!snapshotExists || !snapshot) {
    failures.push("committed response snapshot file is missing or unreadable");
    return failures;
  }

  if (snapshot.construction !== entry.legacy_runtime_label) {
    failures.push("snapshot construction identity mismatches legacy_runtime_label");
  }
  for (const [snapshotField, entryField] of [
    ["construction_uuid", "construction_uuid"],
    ["construction_code", "construction_code"],
    ["canonical_name", "canonical_name"],
  ]) {
    if (Object.prototype.hasOwnProperty.call(snapshot, snapshotField) && snapshot[snapshotField] !== entry[entryField]) {
      failures.push(`snapshot ${snapshotField} mismatches panel state`);
    }
  }

  if (numericValue(snapshot.response_count) !== total) {
    failures.push("committed response total mismatches snapshot response_count");
  }

  const eligibilityTotals = [
    ["eligible_response_count", snapshot.eligible_response_count],
    ["screening.eligible_response_count", snapshot.screening?.eligible_response_count],
    ["screening.native_cantonese_confirmed", snapshot.screening?.native_cantonese_confirmed],
    ["exception.counted_independent_speaker_responses", snapshot.exception?.counted_independent_speaker_responses],
  ].filter(([, value]) => numericValue(value) !== null);

  if (eligibilityTotals.length === 0) {
    failures.push("snapshot exposes no applicable eligibility total");
  } else {
    for (const [label, value] of eligibilityTotals) {
      if (numericValue(value) !== eligible) {
        failures.push(`${label} mismatches eligible_panel_response_count`);
      }
    }
  }

  if (snapshot.exception && snapshot.exception.counted_as_native_panel_evidence !== true) {
    failures.push("snapshot exception does not authorize counting as native-panel evidence");
  }

  return failures;
}

function uncommittedLiveReportFailures(entry) {
  const failures = [];
  if (Object.prototype.hasOwnProperty.call(entry || {}, "reported_live_response_count_not_yet_snapshotted")) {
    failures.push("deprecated uncommitted-live-count field is forbidden");
  }
  if (!Object.prototype.hasOwnProperty.call(entry || {}, "uncommitted_live_response_report")) {
    return failures;
  }

  const report = entry.uncommitted_live_response_report;
  if (!report || typeof report !== "object" || Array.isArray(report)) {
    return [...failures, "uncommitted_live_response_report must be an object"];
  }
  if (report.accepted_as_evidence !== false) {
    failures.push("uncommitted live responses must not be accepted as evidence");
  }
  const reported = numericValue(report.reported_count);
  if (reported === null || reported < 0) {
    failures.push("uncommitted reported_count must be a nonnegative number");
  }
  const committed = numericValue(entry.panel_response_count_total);
  if (reported !== null && committed !== null && reported < committed) {
    failures.push("uncommitted live report cannot reduce the committed response total");
  }
  if (typeof report.reason !== "string" || report.reason.length === 0) {
    failures.push("uncommitted live report requires a reason");
  }
  return failures;
}

function validateEntry(root, entry) {
  let snapshot = null;
  let snapshotExists = false;
  let snapshotReadError = null;
  if (typeof entry.committed_response_snapshot === "string" && entry.committed_response_snapshot.length > 0) {
    const snapshotPath = path.join(root, entry.committed_response_snapshot);
    snapshotExists = fs.existsSync(snapshotPath);
    if (snapshotExists) {
      try {
        snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
      } catch (error) {
        snapshotReadError = error.message;
      }
    }
  }

  const acceptedSnapshot = acceptedSnapshotFailures(entry, snapshot, {
    snapshotExists: snapshotExists && !snapshotReadError,
  });
  if (snapshotReadError) acceptedSnapshot.push(`committed response snapshot is unreadable: ${snapshotReadError}`);

  return {
    construction_code: entry.construction_code || null,
    legacy_runtime_label: entry.legacy_runtime_label || null,
    accepted_snapshot_failures: acceptedSnapshot,
    uncommitted_live_report_failures: uncommittedLiveReportFailures(entry),
  };
}

function runAudit(root = DEFAULT_ROOT, { writeReport = true } = {}) {
  const state = JSON.parse(fs.readFileSync(path.join(root, PANEL_STATE), "utf8"));
  const entries = (state.constructions || []).map((entry) => validateEntry(root, entry));
  const failures = [];
  for (const entry of entries) {
    for (const failure of entry.accepted_snapshot_failures) {
      failures.push({ construction: entry.legacy_runtime_label, area: "accepted_snapshot", failure });
    }
    for (const failure of entry.uncommitted_live_report_failures) {
      failures.push({ construction: entry.legacy_runtime_label, area: "uncommitted_live_report", failure });
    }
  }

  const report = {
    schema: "canto-span-active-panel-snapshot-link-audit-v1",
    panel_state: PANEL_STATE,
    construction_count: entries.length,
    accepted_response_entries: (state.constructions || []).filter((entry) => Number(entry.eligible_panel_response_count) > 0).length,
    failed: failures.length,
    status: failures.length ? "FAIL" : "PASS",
    entries,
    failures,
  };

  if (writeReport) {
    const outDir = path.join(root, "validation", "current");
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "active-panel-snapshot-links.json"), JSON.stringify(report, null, 2) + "\n");
  }
  return report;
}

if (require.main === module) {
  const report = runAudit();
  console.log(JSON.stringify(report, null, 2));
  if (report.failures.length) process.exit(1);
}

module.exports = {
  PANEL_STATE,
  acceptedSnapshotFailures,
  runAudit,
  uncommittedLiveReportFailures,
  validateEntry,
};
