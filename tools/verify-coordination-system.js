#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
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
  if (!normalized.includes(expected.replace(/\s+/g, " "))) {
    errors.push({ type: "missing_contract_text", file: relativePath, label, expected });
  }
}

function forbidText(relativePath, forbidden, label) {
  const normalized = read(relativePath).replace(/\s+/g, " ");
  if (normalized.includes(forbidden.replace(/\s+/g, " "))) {
    errors.push({ type: "unsafe_contract_text", file: relativePath, label, forbidden });
  }
}

const requiredFiles = [
  ".github/ISSUE_TEMPLATE/work-claim.yml",
  ".github/pull_request_template.md",
  ".github/workflows/codex-intake-issue.yml",
  ".github/workflows/coordination-check.yml",
  "changes/pending/README.md",
  "config/coordination-targets.json",
  "docs/current/MULTI-AGENT-COORDINATION.md",
  "docs/current/USER-MERGE-REVIEW.md",
  "schemas/change-set.schema.json",
  "schemas/task-intake.schema.json",
  "schemas/work-claim.schema.json",
  "tools/coordination/codex-intake.js",
  "tools/coordination/change-set.js",
  "tools/coordination/check-pr.js",
  "tools/coordination/lib.js",
];
for (const file of requiredFiles) read(file);

const jsonFiles = [
  "config/coordination-targets.json",
  "schemas/change-set.schema.json",
  "schemas/task-intake.schema.json",
  "schemas/work-claim.schema.json",
];
const parsed = new Map();
for (const file of jsonFiles) {
  try {
    parsed.set(file, JSON.parse(read(file)));
  } catch (error) {
    errors.push({ type: "invalid_json", file, detail: error.message });
  }
}

const config = parsed.get("config/coordination-targets.json");
if (config) {
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
}

for (const [file, expectedSchema] of [
  ["schemas/task-intake.schema.json", "canto-span-task-intake-v2"],
  ["schemas/work-claim.schema.json", "canto-span-work-claim-v2"],
]) {
  const schema = parsed.get(file);
  if (schema?.properties?.schema?.const !== expectedSchema) {
    errors.push({ type: "invalid_schema", file, detail: `expected ${expectedSchema}` });
  }
}

for (const field of [
  "ownership_revision",
  "active_claim_issue",
  "active_branch",
  "active_pr",
  "user_merge_approval_required",
]) {
  if (!parsed.get("schemas/task-intake.schema.json")?.required?.includes(field)) {
    errors.push({ type: "invalid_schema", file: "schemas/task-intake.schema.json", detail: `missing required field ${field}` });
  }
}
for (const field of ["intake_issue", "active_worker", "ownership_revision"]) {
  if (!parsed.get("schemas/work-claim.schema.json")?.required?.includes(field)) {
    errors.push({ type: "invalid_schema", file: "schemas/work-claim.schema.json", detail: `missing required field ${field}` });
  }
}

requireText(".github/ISSUE_TEMPLATE/work-claim.yml", "coordination-claim", "claim metadata block");
requireText(".github/ISSUE_TEMPLATE/work-claim.yml", "canto-span-work-claim-v2", "current claim schema");
requireText(".github/pull_request_template.md", "coordination-claim: #ISSUE_NUMBER", "PR claim binding");
requireText(".github/pull_request_template.md", "Ownership revision:", "PR ownership revision");
requireText(".github/pull_request_template.md", "PENDING_USER_REVIEW", "pending review state");
requireText(".github/pull_request_template.md", "Do not merge or enable auto-merge", "merge stop");

requireText(".github/workflows/coordination-check.yml", "contents: read", "read-only contents permission");
requireText(".github/workflows/coordination-check.yml", "issues: read", "read-only issue permission");
requireText(".github/workflows/coordination-check.yml", "pull-requests: read", "read-only PR permission");
requireText(".github/workflows/coordination-check.yml", "node tools/coordination/check-pr.js", "online claim checker");

requireText(".github/workflows/codex-intake-issue.yml", "workflow_dispatch:", "manual intake trigger");
requireText(".github/workflows/codex-intake-issue.yml", "issues: write", "bounded issue write permission");
requireText(".github/workflows/codex-intake-issue.yml", "contents: read", "read-only contents permission");
forbidText(".github/workflows/codex-intake-issue.yml", "contents: write", "content write permission");
forbidText(".github/workflows/codex-intake-issue.yml", "pull-requests: write", "PR write permission");

requireText("docs/current/MULTI-AGENT-COORDINATION.md", "USER-MERGE-REVIEW.md", "merge-review pointer");
requireText("docs/current/USER-MERGE-REVIEW.md", "explicitly approves that specific pull request", "specific PR approval");
requireText("docs/current/USER-MERGE-REVIEW.md", "Approval applies only to the reviewed head commit", "head-specific approval");

const pendingDirectory = path.join(root, "changes", "pending");
if (fs.existsSync(pendingDirectory) && config) {
  for (const name of fs.readdirSync(pendingDirectory)) {
    if (name === "README.md" || !name.endsWith(".json")) continue;
    const relativePath = `changes/pending/${name}`;
    try {
      const changeSet = loadJson(path.join(root, relativePath));
      for (const detail of validateChangeSet(changeSet, config)) {
        errors.push({ type: "invalid_pending_changeset", file: relativePath, detail });
      }
    } catch (error) {
      errors.push({ type: "invalid_pending_changeset", file: relativePath, detail: error.message });
    }
  }
}

const result = {
  schema: "canto-span-coordination-system-validation-v4",
  status: errors.length ? "FAIL" : "PASS",
  reason: "Protect claim binding, least-privilege workflows, current schemas, pending changesets, and the explicit per-head merge gate.",
  required_files: requiredFiles.length,
  errors,
};
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
