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

function forbidText(relativePath, forbidden, label) {
  const normalized = read(relativePath).replace(/\s+/g, " ");
  const normalizedForbidden = forbidden.replace(/\s+/g, " ");
  if (normalized.includes(normalizedForbidden)) {
    errors.push({ type: "stale_contract_text", file: relativePath, label, forbidden });
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
  "schemas/codex-task.schema.json",
  "schemas/task-intake-v1.schema.json",
  "schemas/task-intake.schema.json",
  "schemas/work-claim-v1.schema.json",
  "schemas/work-claim.schema.json",
  "tools/coordination/codex-intake.js",
  "tools/coordination/change-set.js",
  "tools/coordination/check-pr.js",
  "tools/coordination/lib.js",
  "tests/tooling/coordination/codex-intake.test.js",
  "tests/tooling/coordination/coordination.test.js",
];
for (const file of requiredFiles) read(file);

for (const file of [
  "config/coordination-targets.json",
  "schemas/change-set.schema.json",
  "schemas/codex-task.schema.json",
  "schemas/task-intake-v1.schema.json",
  "schemas/task-intake.schema.json",
  "schemas/work-claim-v1.schema.json",
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
requireText(".github/ISSUE_TEMPLATE/work-claim.yml", "canto-span-work-claim-v2", "current work claim version");
requireText(".github/ISSUE_TEMPLATE/work-claim.yml", "ownership_revision", "claim ownership revision");
requireText(".github/pull_request_template.md", "coordination-claim: #ISSUE_NUMBER", "PR claim marker");
requireText(".github/pull_request_template.md", "Intake issue: #ISSUE_NUMBER", "PR intake marker");
requireText(".github/pull_request_template.md", "Active worker:", "PR active worker");
requireText(".github/pull_request_template.md", "Ownership revision:", "PR ownership revision");
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

requireText(".github/workflows/codex-intake-issue.yml", "workflow_dispatch:", "manual intake trigger");
requireText(".github/workflows/codex-intake-issue.yml", "contents: read", "intake least-privilege contents access");
requireText(".github/workflows/codex-intake-issue.yml", "issues: write", "intake issue write access");
requireText(".github/workflows/codex-intake-issue.yml", "actions/github-script@v8", "Node 24-compatible issue action");
requireText(".github/workflows/codex-intake-issue.yml", "inputFromEnvironment(process.env)", "untrusted input environment boundary");
requireText(".github/workflows/codex-intake-issue.yml", "findExactDuplicate", "bounded exact duplicate check");
requireText(".github/workflows/codex-intake-issue.yml", "ensureRoutingLabels", "idempotent routing labels");
requireText(".github/workflows/codex-intake-issue.yml", "created_by:", "separate intake creator");
requireText(".github/workflows/codex-intake-issue.yml", "pickup_target:", "one primary pickup target");
requireText(".github/workflows/codex-intake-issue.yml", "new Date().toISOString()", "trusted initial ownership timestamp");
forbidText(".github/workflows/codex-intake-issue.yml", "contents: write", "intake content write permission");
forbidText(".github/workflows/codex-intake-issue.yml", "pull-requests: write", "intake PR write permission");
forbidText(".github/workflows/codex-intake-issue.yml", "run:", "intake shell execution");

requireText("docs/current/CODEX-ISSUE-WORKFLOW.md", "manual-issue-generator-implemented", "manual generator status");
requireText("docs/current/CODEX-ISSUE-WORKFLOW.md", "manual-pickup-required", "truthful manual dispatch");
requireText("docs/current/CODEX-ISSUE-WORKFLOW.md", ".github/workflows/codex-intake-issue.yml", "manual generator path");
requireText("docs/current/CODEX-ISSUE-WORKFLOW.md", "chatgpt-pickup-required", "ChatGPT pickup status");
requireText("docs/current/CODEX-ISSUE-WORKFLOW.md", "human-pickup-required", "human pickup status");
requireText("docs/current/CODEX-ISSUE-WORKFLOW.md", "ownership_revision", "routing ownership revision");
requireText("docs/current/CODEX-ISSUE-WORKFLOW.md", "routing result: unavailable", "unavailable ownership stop");
requireText("docs/current/MULTI-AGENT-COORDINATION.md", "Pickup ownership and precedence", "ownership precedence");
requireText("docs/current/MULTI-AGENT-COORDINATION.md", "exact PR number", "live pull-request binding");
requireText("docs/current/00-START-HERE.md", "ownership revision", "Start Here ownership recheck");
requireText("docs/current/00-START-HERE.md", "bind `active_pr`", "Start Here pull-request binding");
requireText("docs/current/USER-MERGE-REVIEW.md", "live ownership revision", "merge ownership recheck");
requireText("tools/coordination/codex-intake.js", "schemas/task-intake.schema.json", "checked-in unified intake schema");
requireText("tools/coordination/codex-intake.js", "schemas/task-intake-v1.schema.json", "legacy unified intake compatibility");
requireText("tools/coordination/codex-intake.js", "schemas/codex-task.schema.json", "legacy intake compatibility");
requireText("tools/coordination/codex-intake.js", "validateInterventionRecord", "ownership intervention validation");
requireText("tools/coordination/codex-intake.js", "CANONICAL_BOOTSTRAP", "canonical intake bootstrap");
requireText("tools/coordination/codex-intake.js", "Re-fetch the canonical intake issue", "generated live ownership recheck");
requireText("tools/coordination/check-pr.js", "validateOwnershipBinding", "online ownership binding");
requireText("tools/coordination/check-pr.js", "live intake ownership does not authorize", "online ownership stop");
requireText("tools/coordination/check-pr.js", "PR ownership revision", "pull-request ownership revision binding");

try {
  const codexTaskSchema = JSON.parse(read("schemas/codex-task.schema.json"));
  if (codexTaskSchema?.properties?.schema?.const !== "canto-span-codex-task-v1") {
    errors.push({ type: "invalid_schema", file: "schemas/codex-task.schema.json", detail: "wrong task schema identifier" });
  }
  const legacyCategories = codexTaskSchema?.properties?.category?.enum;
  if (!Array.isArray(legacyCategories) || legacyCategories.length !== 10 || new Set(legacyCategories).size !== 10) {
    errors.push({ type: "invalid_schema", file: "schemas/codex-task.schema.json", detail: "expected ten unique Codex-ready categories" });
  }
  const taskIntakeSchema = JSON.parse(read("schemas/task-intake.schema.json"));
  const categories = taskIntakeSchema?.properties?.category?.enum;
  const creators = taskIntakeSchema?.properties?.created_by?.enum;
  const pickupTargets = taskIntakeSchema?.properties?.pickup_target?.enum;
  if (taskIntakeSchema?.properties?.schema?.const !== "canto-span-task-intake-v2") {
    errors.push({ type: "invalid_schema", file: "schemas/task-intake.schema.json", detail: "wrong unified intake schema identifier" });
  }
  const legacyTaskIntakeSchema = JSON.parse(read("schemas/task-intake-v1.schema.json"));
  if (legacyTaskIntakeSchema?.properties?.schema?.const !== "canto-span-task-intake-v1") {
    errors.push({ type: "invalid_schema", file: "schemas/task-intake-v1.schema.json", detail: "wrong legacy unified intake schema identifier" });
  }
  for (const field of [
    "ownership_revision",
    "previous_pickup_target",
    "ownership_reason",
    "ownership_updated_at",
    "pickup_allowed",
    "handoff_status",
    "active_claim_issue",
    "active_branch",
    "active_pr",
  ]) {
    if (!taskIntakeSchema.required?.includes(field)) {
      errors.push({ type: "invalid_schema", file: "schemas/task-intake.schema.json", detail: `missing required ownership field ${field}` });
    }
  }
  const workClaimSchema = JSON.parse(read("schemas/work-claim.schema.json"));
  const legacyWorkClaimSchema = JSON.parse(read("schemas/work-claim-v1.schema.json"));
  if (workClaimSchema?.properties?.schema?.const !== "canto-span-work-claim-v2") {
    errors.push({ type: "invalid_schema", file: "schemas/work-claim.schema.json", detail: "wrong current work claim schema identifier" });
  }
  if (legacyWorkClaimSchema?.properties?.schema?.const !== "canto-span-work-claim-v1") {
    errors.push({ type: "invalid_schema", file: "schemas/work-claim-v1.schema.json", detail: "wrong legacy work claim schema identifier" });
  }
  for (const field of ["intake_issue", "active_worker", "ownership_revision"]) {
    if (!workClaimSchema.required?.includes(field)) {
      errors.push({ type: "invalid_schema", file: "schemas/work-claim.schema.json", detail: `missing required claim ownership field ${field}` });
    }
  }
  for (const [field, values, expected] of [
    ["created_by", creators, ["chatgpt", "codex", "human"]],
    ["pickup_target", pickupTargets, ["codex", "chatgpt", "human"]],
  ]) {
    if (JSON.stringify(values) !== JSON.stringify(expected)) {
      errors.push({ type: "invalid_schema", file: "schemas/task-intake.schema.json", detail: `${field} must contain exactly chatgpt, codex, and human` });
    }
  }
  const workflow = read(".github/workflows/codex-intake-issue.yml");
  const categoryBlock = workflow.match(/      category:\n[\s\S]*?        options:\n([\s\S]*?)      title:/);
  const workflowCategories = categoryBlock
    ? [...categoryBlock[1].matchAll(/^\s*-\s+([a-z][a-z-]+)\s*$/gm)].map((match) => match[1])
    : [];
  if (JSON.stringify(workflowCategories) !== JSON.stringify(categories)) {
    errors.push({ type: "invalid_workflow", file: ".github/workflows/codex-intake-issue.yml", detail: "category choices must exactly match the unified task schema" });
  }
  for (const [input, expected] of [["created_by", creators], ["pickup_target", pickupTargets]]) {
    const nextInput = input === "created_by" ? "pickup_target" : "category";
    const block = workflow.match(new RegExp(`      ${input}:\\n[\\s\\S]*?        options:\\n([\\s\\S]*?)      ${nextInput}:`));
    const actual = block
      ? [...block[1].matchAll(/^\s*-\s+([a-z]+)\s*$/gm)].map((match) => match[1])
      : [];
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      errors.push({ type: "invalid_workflow", file: ".github/workflows/codex-intake-issue.yml", detail: `${input} choices must exactly match the unified task schema` });
    }
  }
  if (codexTaskSchema?.properties?.dispatch_status?.const !== "manual-pickup-required") {
    errors.push({ type: "invalid_schema", file: "schemas/codex-task.schema.json", detail: "dispatch status must remain manual-pickup-required" });
  }
  for (const field of [
    "chatgpt_routing_complete",
    "codex_self_screen_required",
    "work_claim_required",
    "user_merge_approval_required",
  ]) {
    if (codexTaskSchema?.properties?.[field]?.const !== true) {
      errors.push({ type: "invalid_schema", file: "schemas/codex-task.schema.json", detail: `${field} must remain true` });
    }
  }
} catch (error) {
  errors.push({ type: "invalid_schema", file: "schemas/codex-task.schema.json", detail: error.message });
}

requireText("AGENTS.md", "work-claim issue", "agent work claim bootstrap");
requireText("AGENTS.md", "human-required", "agent human routing class");
requireText("AGENTS.md", "routing result: unavailable", "agent ownership stop");
requireText("AGENTS.md", "ownership_revision", "agent ownership recheck");
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

const mergeReviewCurrentDocs = [
  "AGENTS.md",
  "docs/current/00-START-HERE.md",
  "docs/current/USER-MERGE-REVIEW.md",
  "docs/current/MULTI-AGENT-COORDINATION.md",
  "docs/current/GIT-WORKFLOW.md",
  "docs/current/GOVERNANCE.md",
  "docs/current/TESTING.md",
  "README.md",
  "HANDOFF.md",
];
for (const file of mergeReviewCurrentDocs) {
  requireText(file, "USER-MERGE-REVIEW.md", "current merge-review pointer");
}
for (const file of mergeReviewCurrentDocs) {
  for (const stale of [
    "without a separate per-PR user request",
    "does not require a separate per-PR user request",
    "then may merge the passing PR",
    "manual per-PR merge approval after an authorized integrator",
  ]) {
    forbidText(file, stale, "obsolete autonomous merge rule");
  }
}

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
