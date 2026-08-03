"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const {
  locksOverlap,
  validatePortfolioRouting,
} = require("../../../tools/coordination/portfolio-routing");

function routing(overrides = {}) {
  return {
    schema: "canto-span-portfolio-routing-v2",
    track: "T2-identity",
    kind: "identity-batch",
    research_mode: "decision-support",
    priority: "P2",
    priority_reason: "The bounded identity package resolves a current registry gap.",
    decision_question: "What permanent identity disposition is justified?",
    dependencies: [],
    informs: [],
    read_scope: ["identity registry"],
    write_locks: ["runtime:*:read"],
    prohibited_parallel_writes: ["runtime:AA82:write"],
    acceptable_null_outcome: "The record remains unchanged.",
    completion_endpoint: "The bounded decision is recorded.",
    ...overrides,
  };
}

test("multi-segment wildcards continue through later segments", () => {
  assert.equal(locksOverlap("runtime:*:read", "runtime:AA82:read"), true);
  assert.equal(locksOverlap("runtime:*:read", "runtime:AA82:write"), false);
  assert.equal(locksOverlap("runtime:*:read", "runtime-bundle:AA82:read"), false);
  assert.equal(locksOverlap("runtime:AA82:*", "runtime:AA82:write"), true);
  assert.equal(locksOverlap("runtime:*:read", "runtime:global"), true);
});

test("routing prohibited-lock validation distinguishes wildcard suffixes", () => {
  assert.deepEqual(validatePortfolioRouting(routing()), []);

  const errors = validatePortfolioRouting(routing({
    prohibited_parallel_writes: ["runtime:AA82:read"],
  }));
  assert.ok(errors.includes(
    "write lock runtime:*:read overlaps prohibited parallel write runtime:AA82:read",
  ));
});
