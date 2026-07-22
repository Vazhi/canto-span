#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { loadConstructionNotes } = require("./construction-notes-lib");
const { evaluatePromotion } = require("./promotion-gate-lib");
const {
  isSafeRepositoryRelativePath,
  validateStatusBaselineSnapshot,
  validateReleaseAudit,
} = require("./release-handoff-lib");

const root = path.resolve(__dirname, "..");
const auditPath = process.argv[2] || path.join(root, "docs", "releases", "current-release-audit.json");
const audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));
const failures = [];

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}
function baselineStatuses(snapshot) {
  return new Map(snapshot.statuses.map((item) => [item.construction, item.status]));
}
function normalizedChanges(base, current) {
  const labels = [...new Set([...base.keys(), ...current.keys()])].sort();
  const changes = [];
  for (const construction of labels) {
    const oldStatus = base.has(construction) ? base.get(construction) : null;
    const newStatus = current.has(construction) ? current.get(construction) : "retired";
    if (oldStatus !== newStatus) changes.push({ construction, old_status: oldStatus, new_status: newStatus });
  }
  return changes;
}

const baselineRef = audit.base_status_snapshot || {};
let baselineSnapshot = null;
let baselineUsable = false;
if (isSafeRepositoryRelativePath(baselineRef.path) && String(baselineRef.path).startsWith("data/release-baselines/")) {
  const baselinePath = path.resolve(root, baselineRef.path);
  if (!baselinePath.startsWith(root + path.sep)) {
    failures.push("base_status_snapshot_outside_repository");
  } else if (!fs.existsSync(baselinePath)) {
    failures.push(`missing_base_status_snapshot:${baselineRef.path}`);
  } else {
    const bytes = fs.readFileSync(baselinePath);
    const actualHash = sha256(bytes);
    const hashMatches = actualHash === baselineRef.sha256;
    if (!hashMatches) failures.push(`base_status_snapshot_hash_mismatch:${baselineRef.sha256}!=${actualHash}`);
    try {
      baselineSnapshot = JSON.parse(bytes.toString("utf8"));
      const snapshotFailures = validateStatusBaselineSnapshot(baselineSnapshot);
      failures.push(...snapshotFailures);
      const runtimeMatches = baselineSnapshot.runtime_version === baselineRef.runtime_version;
      if (!runtimeMatches) failures.push(`base_status_snapshot_runtime_mismatch:${baselineRef.runtime_version}!=${baselineSnapshot.runtime_version}`);
      baselineUsable = hashMatches && runtimeMatches && snapshotFailures.length === 0;
    } catch (error) {
      failures.push(`invalid_base_status_snapshot_json:${error.message}`);
    }
  }
}

const notes = loadConstructionNotes(root);
const current = new Map(notes.map((note) => [note.frontmatter.construction, note.frontmatter.status]));
const actualChanges = baselineUsable ? normalizedChanges(baselineStatuses(baselineSnapshot), current) : [];

const supported = notes.filter((note) => note.frontmatter.status === "supported_productive");
const pending = [];
for (const note of supported) {
  const gate = evaluatePromotion(note);
  if (!note.frontmatter.current_standard_reaudit_complete || !gate.eligible) pending.push(note.frontmatter.construction);
}
pending.sort();

for (const file of audit.release_documents || []) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`missing_release_document:${file}`);
}
const retirement = JSON.parse(fs.readFileSync(path.join(root, "data", "retirement-review-state.json"), "utf8"));
const auditValidation = validateReleaseAudit({ audit, actualChanges, supportedPending: pending, retirement });
failures.push(...auditValidation.failures);
const gap = auditValidation.gap;

const report = {
  schema: "canto-span-release-handoff-gate-v3",
  release_id: audit.release_id,
  base_status_snapshot: baselineRef,
  actual_status_changes: actualChanges,
  supported_productive_count: supported.length,
  supported_productive_pending_reaudit: pending,
  retirement_review_gap: gap,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};
const outDir = path.join(root, "validation", "current");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "release-handoff-gate.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
