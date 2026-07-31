"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const {
  extractPortfolioRouting,
  intakeRoutingCounts,
  validatePortfolioOwnershipBinding,
  validatePortfolioRouting,
} = require("../../../tools/coordination/portfolio-routing");
const { resolveIntakeRouting } = require("../../../tools/coordination/check-pr");

function validRouting(overrides = {}) {
  return {
    schema: "canto-span-portfolio-routing-v2",
    track: "T2-identity",
    kind: "identity-batch",
    research_mode: "decision-support",
    priority: "P2",
    priority_reason: "The bounded identity package resolves a current registry gap.",
    decision_question: "What permanent identity disposition is justified?",
    dependencies: [],
    informs: ["T5-evidence"],
    read_scope: ["identity registry", "accepted neighboring decisions"],
    write_locks: ["identity:example"],
    prohibited_parallel_writes: ["runtime:example"],
    acceptable_null_outcome: "The record remains retired with no successor UUID.",
    completion_endpoint: "The permanent identity disposition and evidence home are recorded.",
    ...overrides,
  };
}

function fenced(label, value) {
  return `\`\`\`${label}\n${JSON.stringify(value, null, 2)}\n\`\`\``;
}

function validClaim(overrides = {}) {
  return {
    schema: "canto-span-work-claim-v2",
    intake_issue: 370,
    active_worker: "chatgpt",
    ownership_revision: 1,
    branch: "agent/example",
    write_locks: ["identity:example"],
    ...overrides,
  };
}

function validPr(overrides = {}) {
  return {
    number: 500,
    body: "Active worker: chatgpt\nOwnership revision: 1",
    head: { ref: "agent/example" },
    ...overrides,
  };
}

test("extracts exactly one portfolio-routing block", () => {
  const routing = validRouting();
  assert.deepEqual(extractPortfolioRouting(fenced("portfolio-routing", routing)), routing);
});

test("rejects missing and duplicate portfolio-routing blocks", () => {
  assert.throws(() => extractPortfolioRouting("no block"), /exactly one/);
  const body = `${fenced("portfolio-routing", validRouting())}\n${fenced("portfolio-routing", validRouting())}`;
  assert.throws(() => extractPortfolioRouting(body), /exactly one/);
});

test("validates current portfolio-routing fields and enums", () => {
  assert.deepEqual(validatePortfolioRouting(validRouting()), []);

  const errors = validatePortfolioRouting(validRouting({
    track: "identity",
    priority: "urgent",
    unsupported: true,
    read_scope: ["identity registry", "identity registry"],
  }));
  assert.ok(errors.some((error) => error.includes("track must match")));
  assert.ok(errors.some((error) => error.includes("priority must")));
  assert.ok(errors.some((error) => error.includes("unsupported portfolio-routing field")));
  assert.ok(errors.some((error) => error.includes("read_scope must contain unique")));
});

test("resolves exactly one supported intake mode", () => {
  const portfolioBody = fenced("portfolio-routing", validRouting());
  assert.equal(resolveIntakeRouting(portfolioBody).mode, "portfolio-routing");
  assert.deepEqual(intakeRoutingCounts(portfolioBody), { taskIntake: 0, portfolioRouting: 1 });

  const taskBody = fenced("task-intake", { schema: "canto-span-task-intake-v2" });
  assert.equal(resolveIntakeRouting(taskBody).mode, "task-intake");

  assert.throws(
    () => resolveIntakeRouting(`${portfolioBody}\n${taskBody}`),
    /exactly one supported routing block/,
  );
});

test("portfolio routing accepts a coherent v2 claim binding", () => {
  const errors = validatePortfolioOwnershipBinding(
    validClaim(),
    373,
    validRouting(),
    370,
    validPr(),
    { activeWorker: "chatgpt", ownershipRevision: 1 },
  );
  assert.deepEqual(errors, []);
});

test("portfolio routing rejects mismatched ownership, branch, and locks", () => {
  const errors = validatePortfolioOwnershipBinding(
    validClaim({
      intake_issue: 999,
      active_worker: "human",
      ownership_revision: 2,
      branch: "agent/other",
      write_locks: ["runtime:example"],
    }),
    373,
    validRouting(),
    370,
    validPr(),
    { activeWorker: "chatgpt", ownershipRevision: 1 },
  );

  assert.ok(errors.some((error) => error.includes("claim intake_issue")));
  assert.ok(errors.some((error) => error.includes("claim branch")));
  assert.ok(errors.some((error) => error.includes("PR worker")));
  assert.ok(errors.some((error) => error.includes("PR ownership revision")));
  assert.ok(errors.some((error) => error.includes("does not preserve portfolio write lock")));
  assert.ok(errors.some((error) => error.includes("acquires prohibited parallel write")));
});

test("portfolio routing requires a v2 claim", () => {
  const errors = validatePortfolioOwnershipBinding(
    validClaim({ schema: "canto-span-work-claim-v1" }),
    373,
    validRouting(),
    370,
    validPr(),
    { activeWorker: "chatgpt", ownershipRevision: 1 },
  );
  assert.ok(errors.includes("portfolio routing requires a v2 work claim"));
});
