"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const test = require("node:test");
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
    schema: "canto-span-work-claim-v1",
    work_id: "CS-WORK-0001",
    status: "active",
    claim_mode: "shared",
    integration_role: "worker",
    branch: "agent/example",
    expires_at: "2099-01-01T00:00:00Z",
    targets: [{ type: "file", path: "data/example.json", region: "/records/AA80" }],
    generated_outputs: [],
    protected_state: [],
    dependencies: [],
    summary: "Example",
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
