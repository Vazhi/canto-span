#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const {
  sha256,
  validateRegistry,
  verifyProtectedTests,
} = require("../../../tools/verify-protected-tests");
const {
  REGISTRY_PATH,
  REVIEW_SCHEMA,
  OVERRIDE_SCHEMA,
  analyzeProtectedChanges,
  evaluateReviewGate,
  evaluateUserOverride,
} = require("../../../tools/verify-protected-test-review");

function registry(entries) {
  return {
    schema: "canto-span-protected-tests-v1",
    tests: entries.map((entry) => ({
      path: entry.path,
      sha256: entry.sha256,
      reason: entry.reason || "Protect a repository-wide doctrine whose expectation should not drift during ordinary feature work.",
      scope: entry.scope || "governance",
      protection_class: "constitutional_doctrine",
      expected_change_frequency: "rare-to-never",
      normal_growth_requires_edit: false,
      review_required_on_change: true,
    })),
  };
}

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "canto-span-protected-tests-"));
  const relative = "tests/doctrine.test.js";
  const absolute = path.join(root, relative);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, "doctrine\n");
  return {
    root,
    path: relative,
    registry: registry([{ path: relative, sha256: sha256(Buffer.from("doctrine\n")) }]),
  };
}

function reviewBody({ paths, registryChanged = true, basis = "doctrine_review", authorizationIssue = null }) {
  const record = {
    schema: REVIEW_SCHEMA,
    decision: "approve",
    basis,
    paths,
    registry_changed: registryChanged,
    reason: "The doctrine itself was explicitly reviewed rather than changed to make a test pass.",
  };
  if (authorizationIssue) record.authorization_issue = authorizationIssue;
  return `\`\`\`protected-test-review\n${JSON.stringify(record)}\n\`\`\``;
}

test("working-tree verifier rejects changed or deleted protected content", () => {
  const item = fixture();
  try {
    assert.equal(verifyProtectedTests(item.root, item.registry).status, "PASS");

    fs.writeFileSync(path.join(item.root, item.path), "weakened\n");
    const changed = verifyProtectedTests(item.root, item.registry);
    assert.equal(changed.status, "FAIL");
    assert.equal(changed.failures[0].code, "PROTECTED_TEST_REVIEW_REQUIRED");
    assert.equal(changed.failures[0].path, item.path);

    fs.rmSync(path.join(item.root, item.path));
    const deleted = verifyProtectedTests(item.root, item.registry);
    assert.equal(deleted.status, "FAIL");
    assert.equal(deleted.failures[0].code, "protected_test_missing");
    assert.equal(deleted.failures[0].path, item.path);
  } finally {
    fs.rmSync(item.root, { recursive: true, force: true });
  }
});

test("registry rejects scalable tests as SHA-protection candidates", () => {
  const item = fixture();
  const bad = structuredClone(item.registry);
  bad.tests[0].normal_growth_requires_edit = true;
  assert.ok(validateRegistry(bad).some((failure) => failure.code === "scalable_test_not_eligible"));
  fs.rmSync(item.root, { recursive: true, force: true });
});

test("base/head union prevents laundering a protected change by rewriting its registry entry", () => {
  const oldEntry = registry([{ path: "tests/doctrine.test.js", sha256: "a".repeat(64) }]);
  const newEntry = registry([{ path: "tests/doctrine.test.js", sha256: "b".repeat(64) }]);
  const analysis = analyzeProtectedChanges({
    baseRegistry: oldEntry,
    headRegistry: newEntry,
    files: [
      { filename: "tests/doctrine.test.js", status: "modified" },
      { filename: REGISTRY_PATH, status: "modified" },
    ],
  });
  assert.equal(analysis.status, "PASS");
  assert.deepEqual(analysis.affected_protected_paths, ["tests/doctrine.test.js"]);
  assert.deepEqual(analysis.required_paths, [REGISTRY_PATH, "tests/doctrine.test.js"]);
  assert.equal(analysis.registry_changed, true);
});

test("removing a registry entry still requires review of the removed protection", () => {
  const base = registry([{ path: "tests/doctrine.test.js", sha256: "a".repeat(64) }]);
  const head = registry([]);
  const analysis = analyzeProtectedChanges({
    baseRegistry: base,
    headRegistry: head,
    files: [{ filename: REGISTRY_PATH, status: "modified" }],
  });
  assert.deepEqual(analysis.affected_protected_paths, ["tests/doctrine.test.js"]);
  assert.deepEqual(analysis.required_paths, [REGISTRY_PATH, "tests/doctrine.test.js"]);
});

test("renaming a protected path requires review of both old and new identities", () => {
  const base = registry([{ path: "tests/old-doctrine.test.js", sha256: "a".repeat(64) }]);
  const head = registry([{ path: "tests/new-doctrine.test.js", sha256: "b".repeat(64) }]);
  const analysis = analyzeProtectedChanges({
    baseRegistry: base,
    headRegistry: head,
    files: [
      {
        filename: "tests/new-doctrine.test.js",
        previous_filename: "tests/old-doctrine.test.js",
        status: "renamed",
      },
      { filename: REGISTRY_PATH, status: "modified" },
    ],
  });
  assert.equal(analysis.status, "PASS");
  assert.deepEqual(analysis.affected_protected_paths, [
    "tests/new-doctrine.test.js",
    "tests/old-doctrine.test.js",
  ]);
  assert.deepEqual(analysis.required_paths, [
    REGISTRY_PATH,
    "tests/new-doctrine.test.js",
    "tests/old-doctrine.test.js",
  ]);
});

test("all protected control-plane enforcement files require review", () => {
  const unchanged = registry([]);
  for (const protectedControlPath of [
    ".github/workflows/protected-test-review.yml",
    ".github/workflows/full-diagnostic-verification.yml",
    "config/verification-profiles.json",
  ]) {
    const analysis = analyzeProtectedChanges({
      baseRegistry: unchanged,
      headRegistry: unchanged,
      files: [{ filename: protectedControlPath, status: "modified" }],
    });
    assert.deepEqual(analysis.required_paths, [protectedControlPath]);
  }
});

test("a review made before the latest protected change is stale", () => {
  const required = [REGISTRY_PATH, "tests/doctrine.test.js"];
  const commits = [
    { sha: "c1", files: [{ filename: "tests/doctrine.test.js" }] },
    { sha: "c2", files: [{ filename: REGISTRY_PATH }] },
  ];
  const reviews = [{ id: 1, state: "COMMENTED", commit_id: "c1", body: reviewBody({ paths: required }) }];
  const result = evaluateReviewGate({ requiredPaths: required, registryChanged: true, commits, reviews });
  assert.equal(result.status, "FAIL");
  assert.equal(result.code, "PROTECTED_TEST_REVIEW_REQUIRED");
});

test("a fresh structured COMMENTED attestation can pass in the single-author repository", () => {
  const required = [REGISTRY_PATH, "tests/doctrine.test.js"];
  const commits = [
    { sha: "c1", files: [{ filename: "tests/doctrine.test.js" }] },
    { sha: "c2", files: [{ filename: REGISTRY_PATH }] },
  ];
  const partial = [{ id: 1, state: "COMMENTED", commit_id: "c2", body: reviewBody({ paths: ["tests/doctrine.test.js"] }) }];
  assert.equal(evaluateReviewGate({ requiredPaths: required, registryChanged: true, commits, reviews: partial }).status, "FAIL");

  const complete = [{ id: 2, state: "COMMENTED", commit_id: "c2", body: reviewBody({ paths: required }) }];
  const result = evaluateReviewGate({ requiredPaths: required, registryChanged: true, commits, reviews: complete });
  assert.equal(result.status, "PASS");
  assert.equal(result.review.commit_id, "c2");
  assert.equal(result.review.state, "COMMENTED");
  assert.equal(result.review.basis, "doctrine_review");
});

test("pending, dismissed, and changes-requested reviews cannot satisfy the gate", () => {
  const required = [REGISTRY_PATH];
  const commits = [{ sha: "c1", files: [{ filename: REGISTRY_PATH }] }];
  for (const state of ["PENDING", "DISMISSED", "CHANGES_REQUESTED"]) {
    const result = evaluateReviewGate({
      requiredPaths: required,
      registryChanged: true,
      commits,
      reviews: [{ id: 1, state, commit_id: "c1", body: reviewBody({ paths: required }) }],
    });
    assert.equal(result.status, "FAIL");
    assert.equal(result.code, "PROTECTED_TEST_REVIEW_REQUIRED");
  }
});

test("an APPROVED structured review remains valid when a separate reviewer exists", () => {
  const required = [REGISTRY_PATH];
  const result = evaluateReviewGate({
    requiredPaths: required,
    registryChanged: true,
    commits: [{ sha: "c1", files: [{ filename: REGISTRY_PATH }] }],
    reviews: [{ id: 1, state: "APPROVED", commit_id: "c1", body: reviewBody({ paths: required }) }],
  });
  assert.equal(result.status, "PASS");
  assert.equal(result.review.state, "APPROVED");
});

test("ordinary prose or a generic request to make tests pass is never authorization", () => {
  const required = [REGISTRY_PATH, "tests/doctrine.test.js"];
  const result = evaluateReviewGate({
    requiredPaths: required,
    registryChanged: true,
    commits: [{ sha: "c1", files: [{ filename: REGISTRY_PATH }, { filename: "tests/doctrine.test.js" }] }],
    reviews: [{ id: 1, state: "COMMENTED", commit_id: "c1", body: "Please make the tests pass." }],
  });
  assert.equal(result.status, "FAIL");
});

test("user override requires an explicit exact-path authorization record", () => {
  const paths = ["tests/doctrine.test.js"];
  const good = `\`\`\`protected-test-override\n${JSON.stringify({
    schema: OVERRIDE_SCHEMA,
    authorized_by: "user",
    paths,
    reason: "The user explicitly requested changing this protected doctrine expectation.",
  })}\n\`\`\``;
  assert.equal(evaluateUserOverride(good, paths).status, "PASS");

  const overbroad = good.replace("tests/doctrine.test.js", "tests/other.test.js");
  assert.equal(evaluateUserOverride(overbroad, paths).status, "FAIL");
  assert.equal(evaluateUserOverride("make it green", paths).status, "FAIL");
});
