#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadJson, validateChangeSet } = require("./coordination/lib");

const root = path.resolve(__dirname, "..");
const errors = [];

function read(relativePath) {
  const absolute = path.join(root, relativePath);
  if (!fs.existsSync(absolute)) {
    errors.push({ type: "missing_file", file: relativePath });
    return "";
  }
  return fs.readFileSync(absolute, "utf8");
}

function requireText(relativePath, expected, label) {
  const normalized = read(relativePath).replace(/\s+/g, " ");
  const normalizedExpected = expected.replace(/\s+/g, " ");
  if (!normalized.includes(normalizedExpected)) {
    errors.push({ type: "missing_contract_text", file: relativePath, label, expected });
  }
}

const requiredFiles = [
  ".github/ISSUE_TEMPLATE/work-claim.yml",
  ".github/pull_request_template.md",
  ".github/workflows/coordination-check.yml",
  "changes/pending/README.md",
  "config/coordination-targets.json",
  "docs/current/MULTI-AGENT-COORDINATION.md",
  "docs/current/USER-MERGE-REVIEW.md",
  "schemas/change-set.schema.json",
  "schemas/work-claim.schema.json",
  "tools/coordination/change-set.js",
  "tools/coordination/check-pr.js",
  "tools/coordination/lib.js",
  "tests/tooling/coordination/coordination.test.js",
];
for (const file of requiredFiles) read(file);

for (const file of [
  "config/coordination-targets.json",
  "schemas/change-set.schema.json",
  "schemas/work-claim.schema.json",
]) {
  try {
    JSON.parse(read(file));
  } catch (error) {
    errors.push({ type: "invalid_json", file, detail: error.message });
  }
}

let config = null;
try {
  config = loadJson(path.join(root, "config/coordination-targets.json"));
  if (config.schema !== "canto-span-coordination-targets-v1") {
    errors.push({ type: "invalid_schema", file: "config/coordination-targets.json" });
  }
  for (const field of ["exclusive_files", "integration_owned_files"]) {
    if (!Array.isArray(config[field])) {
      errors.push({ type: "invalid_config", file: "config/coordination-targets.json", detail: `${field} must be an array` });
    }
  }
  if (!config.regeneration_targets || typeof config.regeneration_targets !== "object") {
    errors.push({ type: "invalid_config", file: "config/coordination-targets.json", detail: "regeneration_targets must be an object" });
  }
} catch (error) {
  errors.push({ type: "invalid_config", file: "config/coordination-targets.json", detail: error.message });
}

requireText(".github/ISSUE_TEMPLATE/work-claim.yml", "coordination-claim", "issue template claim block");
requireText(".github/pull_request_template.md", "coordination-claim: #ISSUE_NUMBER", "PR claim marker");
requireText(".github/pull_request_template.md", "Closes #ISSUE_NUMBER", "automatic claim closure");
requireText(".github/pull_request_template.md", "PENDING_USER_REVIEW", "human review pending state");
requireText(".github/pull_request_template.md", "Do not merge or enable auto-merge", "PR merge stop");
requireText(".github/pull_request_template.md", "Any new commit invalidates the approval", "head-specific approval");

// The current coordination workflow performs validation only, so read permissions
// are the least-privilege configuration. This does not prohibit separately claimed,
// preconditioned write-capable workflows for bounded non-main targets.
requireText(".github/workflows/coordination-check.yml", "issues: read", "least-privilege issue access");
requireText(".github/workflows/coordination-check.yml", "pull-requests: read", "least-privilege PR access");
requireText(".github/workflows/coordination-check.yml", "contents: read", "least-privilege contents access");
requireText(".github/workflows/coordination-check.yml", "node tools/coordination/check-pr.js", "online coordination check");

requireText("AGENTS.md", "work-claim issue", "agent work claim bootstrap");
requireText("AGENTS.md", "MULTI-AGENT-COORDINATION.md", "agent coordination pointer");
requireText("AGENTS.md", "USER-MERGE-REVIEW.md", "mandatory merge review pointer");
requireText("AGENTS.md", "There is no read-only research role", "agent research autonomy");
requireText("AGENTS.md", "inform the user and stop before merge", "agent user notification stop");
requireText("AGENTS.md", "merge only after the user explicitly approves", "agent explicit approval rule");
requireText("AGENTS.md", "Any new commit after approval requires fresh review", "agent head-change review rule");
requireText("AGENTS.md", "least privilege", "agent automation policy");

requireText("docs/current/USER-MERGE-REVIEW.md", "canonical owner of per-pull-request merge authorization", "merge review authority");
requireText("docs/current/USER-MERGE-REVIEW.md", "inform the user that the pull request is ready for review", "ready notification");
requireText("docs/current/USER-MERGE-REVIEW.md", "stop without merging", "mandatory merge stop");
requireText("docs/current/USER-MERGE-REVIEW.md", "explicitly approves that specific pull request", "specific PR approval");
requireText("docs/current/USER-MERGE-REVIEW.md", "Approval applies only to the reviewed head commit", "head-specific approval");
requireText("docs/current/USER-MERGE-REVIEW.md", "may not merge or enable auto-merge before explicit user approval", "automation merge boundary");

requireText("docs/current/00-START-HERE.md", "Semantic work claims", "Start Here claim policy");
requireText("docs/current/00-START-HERE.md", "integration-owned", "Start Here integration ownership");
requireText("docs/current/00-START-HERE.md", "changes/pending/", "Start Here pending changeset rule");
requireText("docs/current/00-START-HERE.md", "There is no read-only research role", "Start Here research autonomy");
requireText("docs/current/00-START-HERE.md", "least privilege", "Start Here automation policy");

requireText("docs/current/MULTI-AGENT-COORDINATION.md", "same physical file", "same-file concurrency rule");
requireText("docs/current/MULTI-AGENT-COORDINATION.md", "must not survive a ready-to-merge pull request", "pending changeset cleanup rule");
requireText("docs/current/MULTI-AGENT-COORDINATION.md", "There is no read-only research role", "coordination research autonomy");
requireText("docs/current/MULTI-AGENT-COORDINATION.md", "Automation follows least privilege", "coordination automation policy");

const pendingDirectory = path.join(root, "changes/pending");
if (fs.existsSync(pendingDirectory) && config) {
  for (const name of fs.readdirSync(pendingDirectory)) {
    if (name === "README.md" || !name.endsWith(".json")) continue;
    const relative = `changes/pending/${name}`;
    try {
      const changeSet = JSON.parse(read(relative));
      const changeErrors = validateChangeSet(changeSet, config);
      for (const detail of changeErrors) {
        errors.push({ type: "invalid_pending_changeset", file: relative, detail });
      }
    } catch (error) {
      errors.push({ type: "invalid_pending_changeset", file: relative, detail: error.message });
    }
  }
}

const result = {
  schema: "canto-span-coordination-system-validation-v3",
  status: errors.length ? "FAIL" : "PASS",
  required_files: requiredFiles.length,
  automation_policy: "least_privilege_claim_scoped",
  merge_policy: "explicit_user_approval_per_pr_and_head",
  errors,
};
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
process.exitCode = errors.length ? 1 : 0;
