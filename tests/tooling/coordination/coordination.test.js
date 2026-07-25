"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const test = require("node:test");
const {
  legacyIntakeRequiresMigration,
  validateOwnershipBinding,
} = require("../../../tools/coordination/check-pr");
const {
  applyChangeSet,
  extractClaim,
  findClaimConflicts,
  pathMatches,
  targetsOverlap,
  validateChangedFiles,
  validateClaim,
} = require("../../../tools/coordination/lib");

function claim(overrides = {}) {
  return {
    schema: "canto-span-work-claim-v2",
    work_id: "CS-WORK-0001",
    status: "active",
    claim_mode: "shared",
    integration_role: "worker",
    branch: "agent/example",
    expires_at: "2099-01-01T00:00:00Z",
    intake_issue: 57,
    active_worker: "codex",
    ownership_revision: 2,
    targets: [{ type: "file", path: "data/example.json", region: "/records/AA80" }],
    generated_outputs: [],
    protected_state: [],
    dependencies: [],
    summary: "Example",
    ...overrides,
  };
}

function intake(overrides = {}) {
  return {
    schema: "canto-span-task-intake-v2",
    created_by: "chatgpt",
    pickup_target: "codex",
    pickup_status: "active",
    category: "verification-audit",
    risk: "low",
    execution_mode: "implementation",
    dependencies: [],
    protected_state: [],
    active_pickup_owner: "codex",
    ownership_revision: 2,
    previous_pickup_target: "codex",
    ownership_reason: "handoff",
    ownership_updated_at: "2026-07-25T01:00:00Z",
    pickup_allowed: true,
    handoff_status: "no-handoff",
    active_claim_issue: 58,
    active_branch: "agent/example",
    active_pr: 59,
    work_claim_required: true,
    user_merge_approval_required: true,
    codex_self_screen_required: true,
    ...overrides,
  };
}

test("extracts both supported coordination claim fence styles", () => {
  const first = extractClaim("```coordination-claim\n{\"work_id\":\"A\"}\n```");
  const second = extractClaim("```json coordination-claim\n{\"work_id\":\"B\"}\n```");
  assert.equal(first.work_id, "A");
  assert.equal(second.work_id, "B");
});

test("validates a complete claim", () => {
  assert.deepEqual(validateClaim(claim()), []);
});

test("keeps legacy claims valid but requires migration for ownership binding", () => {
  const legacy = claim({
    schema: "canto-span-work-claim-v1",
  });
  delete legacy.intake_issue;
  delete legacy.active_worker;
  delete legacy.ownership_revision;
  assert.deepEqual(validateClaim(legacy), []);
  assert.ok(validateClaim(legacy, { requireOwnershipBinding: true }).some((error) => error.includes("must migrate")));
});

test("binds a PR to the live intake owner, revision, claim, and branch", () => {
  const currentClaim = claim({ intake_issue: 57 });
  const currentIntake = intake();
  const pr = {
    number: 59,
    body: "- Active worker: `codex`\n- Ownership revision: 2",
    head: { ref: "agent/example" },
  };
  assert.deepEqual(validateOwnershipBinding(currentClaim, 58, currentIntake, 57, pr), []);
  assert.ok(validateOwnershipBinding(currentClaim, 58, {
    ...currentIntake,
    ownership_revision: 3,
    previous_pickup_target: "codex",
    ownership_reason: "user-directed",
    ownership_updated_at: "2026-07-25T02:00:00Z",
    handoff_status: "claim-released",
  }, 57, pr).some((error) => error.includes("does not match claim revision")));
  assert.ok(validateOwnershipBinding(currentClaim, 58, {
    ...currentIntake,
    pickup_target: "chatgpt",
    active_pickup_owner: "chatgpt",
    codex_self_screen_required: false,
  }, 57, pr).some((error) => error.includes("does not match claim worker")));
  assert.ok(validateOwnershipBinding(currentClaim, 58, {
    ...currentIntake,
    pickup_allowed: false,
  }, 57, pr).some((error) => error.includes("does not permit pickup")));
  assert.ok(validateOwnershipBinding(currentClaim, 58, {
    ...currentIntake,
    active_claim_issue: 60,
  }, 57, pr).some((error) => error.includes("does not match work claim")));
  assert.ok(validateOwnershipBinding(currentClaim, 58, {
    ...currentIntake,
    active_branch: "agent/taken-over",
  }, 57, pr).some((error) => error.includes("does not match PR head")));
  assert.ok(validateOwnershipBinding(currentClaim, 58, {
    ...currentIntake,
    active_pr: 60,
  }, 57, pr).some((error) => error.includes("does not match PR 59")));
  assert.ok(validateOwnershipBinding(currentClaim, 58, {
    ...currentIntake,
    active_pr: null,
  }, 57, pr).some((error) => error.includes("live intake PR null does not match PR 59")));
  assert.ok(validateOwnershipBinding(
    currentClaim,
    58,
    currentIntake,
    57,
    { ...pr, body: "- Active worker: `chatgpt`\n- Ownership revision: 2" },
  ).some((error) => error.includes("PR worker chatgpt does not match live intake owner codex")));
  assert.ok(validateOwnershipBinding(
    currentClaim,
    58,
    currentIntake,
    57,
    { ...pr, body: "- Active worker: `codex`\n- Ownership revision: 1" },
  ).some((error) => error.includes("PR ownership revision 1 does not match live revision 2")));
  assert.ok(validateOwnershipBinding(
    currentClaim,
    58,
    currentIntake,
    57,
    {
      ...pr,
      body: "- Active worker: `codex`, `chatgpt`, or `human`\n- Ownership revision: 2",
    },
  ).some((error) => error.includes("PR worker null does not match live intake owner codex")));
});

test("forces legacy claims with takeover signals to migrate", () => {
  const legacyClaim = claim({ schema: "canto-span-work-claim-v1" });
  delete legacyClaim.intake_issue;
  delete legacyClaim.active_worker;
  delete legacyClaim.ownership_revision;
  const takeover = {
    schema: "canto-span-task-intake-v1",
    pickup_status: "active-chatgpt-takeover",
    active_pickup_owner: "chatgpt",
    ownership_revision: 2,
    active_work_claim: 48,
  };
  assert.equal(legacyIntakeRequiresMigration(takeover), true);
  assert.ok(validateOwnershipBinding(
    legacyClaim,
    48,
    takeover,
    50,
    { number: 49, head: { ref: "agent/adjudication-batch-12" } },
  ).some((error) => error.includes("must migrate")));
});

test("allows the same physical file with disjoint semantic regions", () => {
  const left = { type: "file", path: "data/example.json", region: "/records/AA80" };
  const right = { type: "file", path: "data/example.json", region: "/records/AA86" };
  assert.equal(targetsOverlap(left, right), false);
});

test("detects same-region and exclusive overlaps", () => {
  const left = claim();
  const right = claim({
    work_id: "CS-WORK-0002",
    branch: "agent/other",
    targets: [{ type: "file", path: "data/example.json", region: "/records/AA80" }],
  });
  assert.equal(findClaimConflicts(left, right).length, 1);
  right.targets[0].region = "/records/AA86";
  assert.equal(findClaimConflicts(left, right).length, 0);
  right.claim_mode = "exclusive";
  right.targets[0].region = "whole-file";
  assert.equal(findClaimConflicts(left, right).length, 1);
});

test("matches repository glob patterns", () => {
  assert.equal(pathMatches("tools/coordination/**", "tools/coordination/lib.js"), true);
  assert.equal(pathMatches(".github/workflows/**", ".github/workflows/check.yml"), true);
  assert.equal(pathMatches("README.md", "docs/README.md"), false);
});

test("enforces exclusive and integration-owned paths", () => {
  const config = {
    exclusive_files: [{ path: "AGENTS.md" }],
    integration_owned_files: [{ path: "README.md" }],
  };
  const worker = claim({
    targets: [
      { type: "file", path: "AGENTS.md", region: "whole-file" },
      { type: "file", path: "README.md", region: "whole-file" },
    ],
  });
  const result = validateChangedFiles(worker, ["AGENTS.md", "README.md"], config, { isDraft: true });
  assert.equal(result.errors.length, 2);
  const integrator = { ...worker, claim_mode: "exclusive", integration_role: "integrator" };
  assert.equal(validateChangedFiles(integrator, ["AGENTS.md", "README.md"], config, { isDraft: true }).errors.length, 0);
});

test("pending changesets are allowed only while draft", () => {
  const config = { exclusive_files: [], integration_owned_files: [] };
  const pending = claim({ targets: [{ type: "file", path: "changes/pending/**", region: "whole-file" }] });
  assert.equal(validateChangedFiles(pending, ["changes/pending/CS-WORK-0001.json"], config, { isDraft: true }).errors.length, 0);
  assert.equal(validateChangedFiles(pending, ["changes/pending/CS-WORK-0001.json"], config, { isDraft: false }).errors.length, 1);
});

test("applies a JSON record merge only when preconditions match", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "canto-span-coordination-"));
  fs.mkdirSync(path.join(root, "data"));
  fs.writeFileSync(path.join(root, "data/example.json"), JSON.stringify({ records: [{ construction_code: "AA80", record_revision: 1, name: "Old" }] }, null, 2));
  const changeSet = {
    schema: "canto-span-change-set-v1",
    work_id: "CS-WORK-0001",
    claim_issue: 31,
    base_commit: "a".repeat(40),
    operations: [{
      type: "json_record_merge",
      file: "data/example.json",
      array_pointer: "/records",
      key_field: "construction_code",
      key_value: "AA80",
      expected: { record_revision: 1, name: "Old" },
      changes: { record_revision: 2, name: "New" },
    }],
    regenerate: [],
  };
  applyChangeSet(changeSet, root, { config: { regeneration_targets: {} }, write: true });
  const output = JSON.parse(fs.readFileSync(path.join(root, "data/example.json"), "utf8"));
  assert.equal(output.records[0].name, "New");
  assert.throws(() => applyChangeSet(changeSet, root, { config: { regeneration_targets: {} }, write: false }), /precondition failed/);
});
