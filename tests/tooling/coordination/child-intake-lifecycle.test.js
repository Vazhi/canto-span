"use strict";

const assert = require("assert");
const test = require("node:test");
const { validateTaskMetadata } = require("../../../tools/coordination/codex-intake");
const { validateOwnershipBinding } = require("../../../tools/coordination/check-pr");

function childIntake(overrides = {}) {
  return {
    schema: "canto-span-task-intake-v2",
    created_by: "chatgpt",
    pickup_target: "chatgpt",
    pickup_status: "active",
    category: "ci-repository-tooling",
    risk: "medium",
    execution_mode: "implementation",
    dependencies: [161],
    protected_state: ["merge_authorization"],
    active_pickup_owner: "chatgpt",
    ownership_revision: 1,
    previous_pickup_target: null,
    ownership_reason: "initial-routing",
    ownership_updated_at: "2026-07-26T10:09:30Z",
    pickup_allowed: true,
    handoff_status: "no-handoff",
    active_claim_issue: 174,
    active_branch: "agent/allow-active-child-intakes",
    active_pr: 175,
    work_claim_required: true,
    user_merge_approval_required: true,
    codex_self_screen_required: false,
    ...overrides,
  };
}

function childClaim(overrides = {}) {
  return {
    schema: "canto-span-work-claim-v2",
    work_id: "CS-WORK-0174",
    status: "active",
    claim_mode: "exclusive",
    integration_role: "integrator",
    branch: "agent/allow-active-child-intakes",
    expires_at: "2099-01-01T00:00:00Z",
    intake_issue: 173,
    active_worker: "chatgpt",
    ownership_revision: 1,
    targets: [{ type: "file", path: "tools/coordination/codex-intake.js", region: "lifecycle" }],
    generated_outputs: [],
    protected_state: ["merge_authorization"],
    dependencies: [161, 162, 173],
    summary: "Allow active child intake bindings.",
    ...overrides,
  };
}

function childPr(overrides = {}) {
  return {
    number: 175,
    body: "Active worker: chatgpt\nOwnership revision: 1",
    head: { ref: "agent/allow-active-child-intakes" },
    ...overrides,
  };
}

test("revision-1 child intake may bind its first claim, branch, and PR", () => {
  const intake = childIntake();
  assert.deepEqual(validateTaskMetadata(intake), []);
  assert.deepEqual(validateOwnershipBinding(childClaim(), 174, intake, 173, childPr()), []);
});

test("unclaimed child intake remains valid before work begins", () => {
  assert.deepEqual(validateTaskMetadata(childIntake({
    pickup_status: "chatgpt-pickup-required",
    active_claim_issue: null,
    active_branch: null,
    active_pr: null,
  })), []);
});

test("partial claim bindings fail closed", () => {
  for (const field of ["active_claim_issue", "active_branch", "active_pr"]) {
    assert.ok(validateTaskMetadata(childIntake({ [field]: null }))
      .some((error) => error.includes("must set active_claim_issue, active_branch, and active_pr together")));
  }
});

test("non-active lifecycle states cannot authorize an open PR", () => {
  for (const pickup_status of ["chatgpt-pickup-required", "blocked", "completed"]) {
    assert.ok(validateOwnershipBinding(
      childClaim(),
      174,
      childIntake({ pickup_status }),
      173,
      childPr(),
    ).some((error) => error.includes("does not authorize an active pull request")));
  }
});

test("active intake must remain pickup-enabled", () => {
  assert.ok(validateTaskMetadata(childIntake({ pickup_allowed: false }))
    .some((error) => error.includes("active intake must permit pickup")));
});
