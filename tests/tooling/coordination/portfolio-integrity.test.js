"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const {
  WIP_LIMITS,
  evaluateWip,
} = require("../../../tools/coordination/portfolio-integrity");

function claim(issue, track, overrides = {}) {
  return {
    issue_number: issue,
    status: "active",
    claim_mode: "exclusive",
    track,
    research_mode: null,
    broad_discovery: false,
    passive_collection: false,
    external_human_action: false,
    write_locks: [`claim:${issue}`],
    ...overrides,
  };
}

test("accepted WIP portfolio passes", () => {
  const report = evaluateWip([
    claim(1, "T1-closure"),
    claim(2, "T2-identity"),
    claim(3, "T7-ingress"),
    claim(4, "T7-ingress"),
    claim(5, "T3-survey", { passive_collection: true }),
    claim(6, "T6-runtime", { claim_mode: "shared" }),
  ]);
  assert.equal(report.status, "PASS", JSON.stringify(report.violations));
  assert.equal(report.exclusive_claims, 4);
  assert.equal(report.track_counts["T7-ingress"], 2);
});

test("exclusive and T7 WIP limits fail with exact claim lists", () => {
  const records = Array.from({ length: 10 }, (_, index) =>
    claim(100 + index, "T7-ingress")
  );
  const report = evaluateWip(records);
  assert.equal(report.status, "FAIL");
  const exclusive = report.violations.find(
    (violation) => violation.category === "exclusive_claims",
  );
  const ingress = report.violations.find(
    (violation) => violation.category === "T7-ingress",
  );
  assert.deepEqual(exclusive, {
    invariant: "wip_limit",
    category: "exclusive_claims",
    limit: 4,
    actual: 10,
    claims: Array.from({ length: 10 }, (_, index) => 100 + index),
  });
  assert.equal(ingress.limit, 2);
  assert.equal(ingress.actual, 10);
});

test("the observed 17-claim and 10-T7 shape is reported, not silently accepted", () => {
  const records = [
    ...Array.from({ length: 10 }, (_, index) => claim(200 + index, "T7-ingress")),
    claim(210, "T1-closure"),
    claim(211, "T2-identity"),
    claim(212, "T3-survey"),
    claim(213, "T4-corpus", { research_mode: "decision-discovery", broad_discovery: true }),
    claim(214, "T5-evidence", { research_mode: "decision-support" }),
    claim(215, "T6-runtime"),
    claim(216, "T8-release"),
  ];
  const report = evaluateWip(records);
  assert.equal(report.active_claims, 17);
  assert.equal(report.exclusive_claims, 17);
  assert.equal(report.track_counts["T7-ingress"], 10);
  assert.ok(report.violations.some(
    (violation) => violation.category === "exclusive_claims" && violation.actual === 17,
  ));
  assert.ok(report.violations.some(
    (violation) => violation.category === "T7-ingress" && violation.actual === 10,
  ));
});

test("every track and broad-discovery limit is enforced", () => {
  const cases = [
    ["T1-closure", WIP_LIMITS["T1-closure"]],
    ["T2-identity", WIP_LIMITS["T2-identity"]],
    ["T3-survey", WIP_LIMITS["T3-survey"]],
    ["T6-runtime", WIP_LIMITS["T6-runtime"]],
    ["T7-ingress", WIP_LIMITS["T7-ingress"]],
    ["T8-release", WIP_LIMITS["T8-release"]],
  ];
  for (const [track, limit] of cases) {
    const records = Array.from({ length: limit + 1 }, (_, index) =>
      claim(300 + index, track, { claim_mode: "shared" })
    );
    const report = evaluateWip(records);
    assert.ok(report.violations.some((violation) => violation.category === track), track);
  }

  const substantive = evaluateWip([
    claim(401, "T4-corpus", { claim_mode: "shared" }),
    claim(402, "T5-evidence", { claim_mode: "shared" }),
    claim(403, "T5-evidence", { claim_mode: "shared" }),
  ]);
  assert.ok(substantive.violations.some(
    (violation) => violation.category === "T4-T5-substantive",
  ));

  const broad = evaluateWip([
    claim(404, "T4-corpus", {
      claim_mode: "shared",
      research_mode: "decision-discovery",
      broad_discovery: true,
    }),
    claim(405, "T5-evidence", {
      claim_mode: "shared",
      research_mode: "decision-discovery",
      broad_discovery: true,
    }),
  ]);
  assert.ok(broad.violations.some((violation) => violation.category === "broad_discovery"));
});

test("passive collection and external human action are excluded from numerical WIP", () => {
  const report = evaluateWip([
    ...Array.from({ length: 8 }, (_, index) =>
      claim(500 + index, "T3-survey", { passive_collection: true })
    ),
    ...Array.from({ length: 8 }, (_, index) =>
      claim(600 + index, "T7-ingress", { external_human_action: true })
    ),
  ]);
  assert.equal(report.status, "PASS");
  assert.equal(report.active_claims, 16);
  assert.equal(report.counted_in_progress_claims, 0);
});

test("active claims without a track fail closed", () => {
  const report = evaluateWip([claim(700, null)]);
  assert.ok(report.violations.some(
    (violation) => violation.invariant === "active_claim_track_required"
      && violation.claim === 700,
  ));
});

test("overlapping exact, hierarchical, namespace-global, and universal locks are reported", () => {
  const report = evaluateWip([
    claim(801, "T7-ingress", { claim_mode: "shared", write_locks: ["corpus-source:ABC"] }),
    claim(802, "T7-ingress", { claim_mode: "shared", write_locks: ["corpus-source:ABC:files"] }),
    claim(803, "T6-runtime", { claim_mode: "shared", write_locks: ["runtime-bundle:global"] }),
    claim(804, "T6-runtime", { claim_mode: "shared", write_locks: ["runtime-bundle:main"] }),
    claim(805, "T4-corpus", { claim_mode: "shared", write_locks: ["*:global"] }),
  ]);
  const overlaps = report.violations.filter(
    (violation) => violation.invariant === "active_write_lock_overlap",
  );
  assert.ok(overlaps.some((violation) => violation.claims.join(",") === "801,802"));
  assert.ok(overlaps.some((violation) => violation.claims.join(",") === "803,804"));
  assert.ok(overlaps.some((violation) => violation.claims.includes(805)));
});

test("malformed normalized snapshots fail before policy evaluation", () => {
  assert.throws(() => evaluateWip({}), /must be an array/);
  assert.throws(() => evaluateWip([claim(1, "T9-unknown")]), /unsupported track/);
  assert.throws(
    () => evaluateWip([{ ...claim(1, "T1-closure"), write_locks: [""] }]),
    /write_locks must contain non-empty strings/,
  );
});
