"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const {
  acceptedSnapshotFailures,
  uncommittedLiveReportFailures,
  validateEntry,
} = require("../../../tools/verify-active-panel-snapshot-links.js");

function acceptedEntry() {
  return {
    construction_uuid: "06c9f3b1-f243-588d-8a6e-bddf9a94c871",
    construction_code: "AB53",
    canonical_name: "ResourceInitialJungLaiFunctionClause",
    legacy_runtime_label: "ResourceUseLaiFunctionRelation",
    panel_response_count_total: 23,
    eligible_panel_response_count: 23,
    committed_response_snapshot: "snapshots/rul.json",
  };
}

function acceptedSnapshot() {
  return {
    construction: "ResourceUseLaiFunctionRelation",
    response_count: 23,
    screening: { native_cantonese_confirmed: 23 },
    exception: {
      counted_as_native_panel_evidence: true,
      counted_independent_speaker_responses: 23,
    },
  };
}

test("accepted responses require a committed snapshot independently of live-report state", () => {
  const entry = acceptedEntry();
  delete entry.committed_response_snapshot;
  assert.match(
    acceptedSnapshotFailures(entry, null, { snapshotExists: false }).join("\n"),
    /require committed_response_snapshot/,
  );
  assert.deepEqual(uncommittedLiveReportFailures(entry), []);
});

test("committed snapshot file must exist", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "canto-span-snapshot-"));
  const failures = validateEntry(root, acceptedEntry()).accepted_snapshot_failures.join("\n");
  assert.match(failures, /file is missing or unreadable/);
});

test("snapshot identity and applicable eligibility totals must match", () => {
  const entry = acceptedEntry();
  const snapshot = acceptedSnapshot();
  assert.deepEqual(acceptedSnapshotFailures(entry, snapshot), []);

  const wrong = structuredClone(snapshot);
  wrong.construction = "PostverbalZoPerfectiveVP";
  wrong.response_count = 24;
  wrong.screening.native_cantonese_confirmed = 22;
  wrong.exception.counted_independent_speaker_responses = 21;
  const failures = acceptedSnapshotFailures(entry, wrong).join("\n");
  assert.match(failures, /construction identity mismatches/);
  assert.match(failures, /response total mismatches/);
  assert.match(failures, /screening.native_cantonese_confirmed mismatches/);
  assert.match(failures, /exception.counted_independent_speaker_responses mismatches/);
});

test("zero accepted responses do not require a committed snapshot", () => {
  const entry = {
    panel_response_count_total: 11,
    eligible_panel_response_count: 0,
  };
  assert.deepEqual(acceptedSnapshotFailures(entry, null, { snapshotExists: false }), []);
});

test("optional uncommitted report is validated separately", () => {
  const entry = acceptedEntry();
  assert.deepEqual(uncommittedLiveReportFailures(entry), []);

  entry.uncommitted_live_response_report = {
    reported_count: 22,
    accepted_as_evidence: true,
    reason: "",
  };
  const failures = uncommittedLiveReportFailures(entry).join("\n");
  assert.match(failures, /must not be accepted/);
  assert.match(failures, /cannot reduce/);
  assert.match(failures, /requires a reason/);
});
