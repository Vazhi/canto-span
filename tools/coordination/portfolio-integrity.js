#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { locksOverlap } = require("./portfolio-routing");

const WIP_LIMITS = Object.freeze({
  exclusive_claims: 4,
  "T1-closure": 1,
  "T2-identity": 1,
  "T3-survey": 1,
  "T4-T5-substantive": 2,
  broad_discovery: 1,
  "T6-runtime": 1,
  "T7-ingress": 2,
  "T8-release": 1,
});
const KNOWN_TRACKS = new Set([
  "T1-closure",
  "T2-identity",
  "T3-survey",
  "T4-corpus",
  "T5-evidence",
  "T6-runtime",
  "T7-ingress",
  "T8-release",
]);

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeClaim(record, index) {
  if (!isObject(record)) throw new Error(`claim ${index} must be an object`);
  const issue = Number(record.issue_number);
  if (!Number.isInteger(issue) || issue < 1) {
    throw new Error(`claim ${index} issue_number must be a positive integer`);
  }
  const status = record.status || "active";
  if (!["active", "stale", "complete"].includes(status)) {
    throw new Error(`claim #${issue} has unsupported status ${status}`);
  }
  const claimMode = record.claim_mode || "exclusive";
  if (!["exclusive", "shared"].includes(claimMode)) {
    throw new Error(`claim #${issue} has unsupported claim_mode ${claimMode}`);
  }
  if (record.track != null && !KNOWN_TRACKS.has(record.track)) {
    throw new Error(`claim #${issue} has unsupported track ${record.track}`);
  }
  const locks = record.write_locks || [];
  if (!Array.isArray(locks) || locks.some((lock) => typeof lock !== "string" || !lock.trim())) {
    throw new Error(`claim #${issue} write_locks must contain non-empty strings`);
  }
  return {
    issue_number: issue,
    status,
    claim_mode: claimMode,
    track: record.track ?? null,
    research_mode: record.research_mode ?? null,
    broad_discovery: Boolean(record.broad_discovery),
    passive_collection: Boolean(record.passive_collection),
    external_human_action: Boolean(record.external_human_action),
    write_locks: [...new Set(locks)],
  };
}

function limitViolation(key, claims, limit) {
  return {
    invariant: "wip_limit",
    category: key,
    limit,
    actual: claims.length,
    claims: claims.map((claim) => claim.issue_number).sort((a, b) => a - b),
  };
}

function evaluateWip(records, limits = WIP_LIMITS) {
  if (!Array.isArray(records)) throw new Error("portfolio snapshot must be an array");
  const claims = records.map(normalizeClaim);
  const active = claims.filter((claim) => claim.status === "active");
  const counted = active.filter(
    (claim) => !claim.passive_collection && !claim.external_human_action,
  );
  const violations = [];

  const unknownTrack = counted.filter((claim) => claim.track === null);
  for (const claim of unknownTrack) {
    violations.push({
      invariant: "active_claim_track_required",
      claim: claim.issue_number,
      detail: "active in-progress work cannot be evaluated against track WIP limits without a track",
    });
  }

  const exclusive = counted.filter((claim) => claim.claim_mode === "exclusive");
  if (exclusive.length > limits.exclusive_claims) {
    violations.push(limitViolation("exclusive_claims", exclusive, limits.exclusive_claims));
  }

  for (const [track, limitKey] of [
    ["T1-closure", "T1-closure"],
    ["T2-identity", "T2-identity"],
    ["T3-survey", "T3-survey"],
    ["T6-runtime", "T6-runtime"],
    ["T7-ingress", "T7-ingress"],
    ["T8-release", "T8-release"],
  ]) {
    const matching = counted.filter((claim) => claim.track === track);
    if (matching.length > limits[limitKey]) {
      violations.push(limitViolation(limitKey, matching, limits[limitKey]));
    }
  }

  const substantive = counted.filter((claim) => ["T4-corpus", "T5-evidence"].includes(claim.track));
  if (substantive.length > limits["T4-T5-substantive"]) {
    violations.push(limitViolation(
      "T4-T5-substantive",
      substantive,
      limits["T4-T5-substantive"],
    ));
  }
  const broadDiscovery = substantive.filter(
    (claim) => claim.research_mode === "decision-discovery" && claim.broad_discovery,
  );
  if (broadDiscovery.length > limits.broad_discovery) {
    violations.push(limitViolation("broad_discovery", broadDiscovery, limits.broad_discovery));
  }

  for (let leftIndex = 0; leftIndex < active.length; leftIndex += 1) {
    const left = active[leftIndex];
    for (let rightIndex = leftIndex + 1; rightIndex < active.length; rightIndex += 1) {
      const right = active[rightIndex];
      for (const leftLock of left.write_locks) {
        for (const rightLock of right.write_locks) {
          if (!locksOverlap(leftLock, rightLock)) continue;
          violations.push({
            invariant: "active_write_lock_overlap",
            claims: [left.issue_number, right.issue_number].sort((a, b) => a - b),
            locks: [leftLock, rightLock],
          });
        }
      }
    }
  }

  return {
    schema: "canto-span-portfolio-integrity-report-v1",
    status: violations.length ? "FAIL" : "PASS",
    active_claims: active.length,
    counted_in_progress_claims: counted.length,
    exclusive_claims: exclusive.length,
    track_counts: Object.fromEntries(
      [...KNOWN_TRACKS].map((track) => [track, counted.filter((claim) => claim.track === track).length]),
    ),
    violations,
  };
}

function optionValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index < 0) return null;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
  return value;
}

function main() {
  const input = optionValue("--input");
  if (!input) throw new Error("--input SNAPSHOT.json is required");
  const snapshotPath = path.resolve(process.cwd(), input);
  const records = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  const report = evaluateWip(records);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (process.argv.includes("--strict") && report.status !== "PASS") process.exit(1);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`portfolio integrity failed: ${error.message}\n`);
    process.exit(2);
  }
}

module.exports = {
  KNOWN_TRACKS,
  WIP_LIMITS,
  evaluateWip,
  normalizeClaim,
};
