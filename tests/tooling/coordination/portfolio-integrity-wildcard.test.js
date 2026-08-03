"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const {
  evaluateWip,
} = require("../../../tools/coordination/portfolio-integrity");

function claim(issue, track, lock) {
  return {
    issue_number: issue,
    status: "active",
    claim_mode: "shared",
    track,
    research_mode: null,
    broad_discovery: false,
    passive_collection: false,
    external_human_action: false,
    write_locks: [lock],
  };
}

test("WIP audit reports only compatible multi-segment wildcard overlaps", () => {
  const report = evaluateWip([
    claim(901, "T1-closure", "runtime:*:read"),
    claim(902, "T2-identity", "runtime:AA82:write"),
    claim(903, "T7-ingress", "runtime:AA82:read"),
  ]);
  const overlaps = report.violations.filter(
    (violation) => violation.invariant === "active_write_lock_overlap",
  );

  assert.ok(overlaps.some((violation) => violation.claims.join(",") === "901,903"));
  assert.ok(!overlaps.some((violation) => violation.claims.join(",") === "901,902"));
  assert.ok(!overlaps.some((violation) => violation.claims.join(",") === "902,903"));
});
