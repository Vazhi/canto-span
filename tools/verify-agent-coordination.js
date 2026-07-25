#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

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

function normalize(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function requireText(file, text, label) {
  const content = normalize(read(file));
  const expected = normalize(text);
  if (!content.includes(expected)) {
    errors.push({ type: "missing_contract_text", file, label, expected: text });
  }
}

function forbidText(file, text, label) {
  const content = normalize(read(file));
  const forbidden = normalize(text);
  if (content.includes(forbidden)) {
    errors.push({ type: "stale_contract_text", file, label, forbidden: text });
  }
}

function requireAll(file, values, labelPrefix) {
  for (const value of values) requireText(file, value, `${labelPrefix} ${value}`);
}

const agentsPath = "AGENTS.md";
const startPath = "docs/current/00-START-HERE.md";
const reviewPath = "docs/current/USER-MERGE-REVIEW.md";
const statePath = "docs/current/PROJECT-STATE.md";
const doctrinePath = "docs/current/DOCTRINE.md";
const governancePath = "docs/current/GOVERNANCE.md";
const coordinationPath = "docs/current/MULTI-AGENT-COORDINATION.md";
const gitWorkflowPath = "docs/current/GIT-WORKFLOW.md";
const testingPath = "docs/current/TESTING.md";
const parkedPath = "data/parked-constructions.json";
const coordinationConfigPath = "config/coordination-targets.json";
const issueTemplatePath = ".github/ISSUE_TEMPLATE/work-claim.yml";
const prTemplatePath = ".github/pull_request_template.md";
const coordinationWorkflowPath = ".github/workflows/coordination-check.yml";
const readmePath = "README.md";
const coreWorkflowPath = ".github/workflows/supported-productive-discovery.yml";
const researchWorkflowPath = ".github/workflows/research-provenance.yml";

requireText(agentsPath, "docs/current/00-START-HERE.md", "mandatory Start Here pointer");
requireText(agentsPath, "MULTI-AGENT-COORDINATION.md", "mandatory coordination pointer");
requireText(agentsPath, "USER-MERGE-REVIEW.md", "mandatory user review pointer");
requireText(agentsPath, "inspect current `main`, open pull requests, and open work-claim issues", "multi-agent overlap check");
requireText(agentsPath, "create or update one work-claim issue", "work claim requirement");
requireText(agentsPath, "There is no read-only research role", "research and implementation autonomy");
requireText(agentsPath, "inform the user and stop before merge", "ready notification and stop");
requireText(agentsPath, "merge only after the user explicitly approves", "per-PR user approval");
requireText(agentsPath, "Any new commit after approval requires fresh review", "head-specific reapproval");
requireText(agentsPath, "least privilege", "automation permission model");

const requiredHeadings = [
  "## Current baseline",
  "## Mandatory agent contract",
  "## Authority and state ownership",
  "## Non-negotiable standards",
  "## Task routing and required reading",
  "## Multi-agent coordination workflow",
  "## Verification matrix",
  "## Forbidden patterns",
  "## Reusable agent task prompt",
  "## Canonical reading order",
];
for (const heading of requiredHeadings) requireText(startPath, heading, heading);

const requiredPointers = [
  "PROJECT-STATE.md",
  "DOCTRINE.md",
  "GOVERNANCE.md",
  "CONSTRUCTION-IDENTITY.md",
  "CONSTRUCTION-ADJUDICATION.md",
  "DEFINITION-OF-DONE.md",
  "TESTING.md",
  "GIT-WORKFLOW.md",
  "MULTI-AGENT-COORDINATION.md",
  "CURRENT-RESEARCH-PROVENANCE.md",
  "review-packets/native-panel/active-v2",
  "tools/corpus-review/README.md",
  "data/construction-identities.json",
  "data/construction-candidate-readiness.json",
  "data/parked-constructions.json",
  "config/coordination-targets.json",
  "schemas/work-claim.schema.json",
  "schemas/change-set.schema.json",
  "changes/pending/",
];
for (const pointer of requiredPointers) requireText(startPath, pointer, `canonical pointer ${pointer}`);

const requiredRules = [
  "zero independent linguistic evidence weight",
  "Use `construction_code + canonical_name`",
  "No spouse",
  "`deployment_allowed: false`",
  "Do not create repeated `validation/vX.Y.Z/` trees",
  "There is no read-only research role",
  "least privilege",
  "no active-note whitelist",
  "no repository-wide grammar freeze",
  "recommend unpark",
  "Semantic work claims",
  "semantic regions",
  "integration-owned",
  "changes/pending/",
];
for (const rule of requiredRules) requireText(startPath, rule, `mandatory rule ${rule}`);

requireText(reviewPath, "canonical owner of per-pull-request merge authorization", "merge review canonical owner");
requireText(reviewPath, "specific current user decision", "specific user decision priority");
requireText(reviewPath, "inform the user that the pull request is ready for review", "ready review notice");
requireText(reviewPath, "stop without merging", "mandatory merge stop");
requireText(reviewPath, "explicitly approves that specific pull request", "specific PR approval");
requireText(reviewPath, "Approval applies only to the reviewed head commit", "head-specific approval");
requireText(reviewPath, "Standing authority to manage pull requests", "standing authority exclusion");
requireText(reviewPath, "may not merge or enable auto-merge before explicit user approval", "automation merge boundary");

requireText(startPath, "current AB30 candidate packet: **5 reviewed; 2 genuine; 3 false positives**", "AB30 reviewed packet");
requireText(startPath, "AB30 corpus-readiness effect: **`partial_only`**", "AB30 partial-only readiness");
requireText(startPath, "`YUE-JUDGMENT-PILOT-01` remains in collection", "active survey state");
requireText(startPath, "`followup-draft-v1` is non-deployable", "follow-up deployment state");
requireText(startPath, "133 available / 0 parked", "default-available workflow count");

requireText(statePath, "`readiness_effect: partial_only`", "project-state corpus effect");
requireText(statePath, "`YUE-JUDGMENT-PILOT-01` remains the active SoSci collection instrument", "project-state live survey");
requireText(statePath, "`review-packets/native-panel/active-v2/followup-draft-v1-*` is a non-deployable", "project-state follow-up state");
requireText(statePath, "The repository has no active-note whitelist", "project-state blacklist policy");
requireText(statePath, "There is no repository-wide grammar freeze", "project-state grammar policy");

requireText(doctrinePath, "There is no repository-wide grammar freeze and no active-note whitelist", "doctrine grammar and workflow policy");
requireText(doctrinePath, "recommend unpark", "doctrine unpark recommendation");
requireText(governancePath, "There is no active-note whitelist, repository-wide grammar freeze, or read-only", "governance research autonomy");
requireText(governancePath, "Automation follows least privilege", "governance automation policy");
requireText(parkedPath, "\"default_state\": \"available\"", "parked registry default state");

requireText(coordinationPath, "same physical file", "same-file concurrency rule");
requireText(coordinationPath, "semantic target regions", "semantic claim rule");
requireText(coordinationPath, "must not survive a ready-to-merge", "pending cleanup rule");
requireText(coordinationPath, "There is no read-only research role", "coordination research autonomy");
requireText(coordinationPath, "Automation follows least privilege", "coordination automation policy");
requireText(gitWorkflowPath, "There is no read-only research branch type", "git research autonomy");
requireText(testingPath, "There is no read-only research role", "testing research autonomy");
requireText(testingPath, "Repository automation follows least privilege", "testing automation policy");

const mergeReviewCurrentDocs = [
  agentsPath,
  startPath,
  reviewPath,
  coordinationPath,
  gitWorkflowPath,
  governancePath,
  testingPath,
  readmePath,
  "HANDOFF.md",
];
for (const file of mergeReviewCurrentDocs) {
  requireText(file, "USER-MERGE-REVIEW.md", "current merge-review pointer");
}

const staleMergeRules = [
  "without a separate per-PR user request",
  "does not require a separate per-PR user request",
  "then may merge the passing PR",
  "manual per-PR merge approval after an authorized integrator",
];
for (const file of mergeReviewCurrentDocs) {
  for (const stale of staleMergeRules) forbidText(file, stale, "obsolete autonomous merge rule");
}

requireText(coordinationConfigPath, "\"integration_owned_files\"", "integration ownership config");
requireText(issueTemplatePath, "coordination-claim", "work claim issue form");
requireText(prTemplatePath, "coordination-claim: #ISSUE_NUMBER", "PR claim marker");
requireText(prTemplatePath, "Closes #ISSUE_NUMBER", "automatic claim closure");
requireText(prTemplatePath, "PENDING_USER_REVIEW", "pending user review state");
requireText(prTemplatePath, "Explicit approval for this pull request and exact head", "specific approval field");
requireText(prTemplatePath, "Do not merge or enable auto-merge", "template merge stop");
requireText(readmePath, "AGENTS.md", "root agent bootstrap pointer");
requireText(readmePath, "docs/current/00-START-HERE.md", "root Start Here pointer");

// Current validation-only workflows should keep least-privilege read permissions.
requireText(coreWorkflowPath, "permissions: contents: read", "core validation permissions");
requireText(researchWorkflowPath, "permissions: contents: read", "research validation permissions");
requireText(coordinationWorkflowPath, "contents: read", "coordination validation contents");
requireText(coordinationWorkflowPath, "issues: read", "coordination validation issues");
requireText(coordinationWorkflowPath, "pull-requests: read", "coordination validation PRs");
requireText(coordinationWorkflowPath, "node tools/coordination/check-pr.js", "coordination workflow checker");

const requiredCoreWorkflowInputs = [
  "AGENTS.md", "README.md", "HANDOFF.md", "main.js", "manifest.json", "package.json",
  "data/**", "grammar/**", "tests/**", "tools/**", "config/**", "schemas/**",
  "changes/**", "docs/current/**", ".github/**",
];
requireAll(coreWorkflowPath, requiredCoreWorkflowInputs, "core workflow trigger");

const requiredResearchWorkflowInputs = [
  "data/construction-identities.json",
  "data/construction-adjudications.json",
  "data/construction-adjudication-batches/**",
  "data/construction-candidate-readiness.json",
  "docs/current/**",
  "docs/research/**",
  "external-evidence/**",
  "grammar/**",
  "main.js",
  "review-packets/**",
  "tests/constructions/**",
  "tests/tooling/corpus-review/**",
  "tests/tooling/native-panel/**",
  "tools/corpus-review/**",
  "tools/verify-active-panel-snapshot-links.js",
  "tools/verify-active-review-workflow.js",
  "tools/verify-native-followup-draft.js",
  "tools/verify-native-panel-snapshot.js",
  "tools/verify-pfv-panel-snapshot.js",
  "tools/verify-rul-survey-readiness.js",
  "config/verification-profiles.json",
];
requireAll(researchWorkflowPath, requiredResearchWorkflowInputs, "research workflow trigger");

const result = {
  schema: "canto-span-agent-coordination-contract-v6",
  status: errors.length === 0 ? "PASS" : "FAIL",
  checked_files: [
    agentsPath, startPath, reviewPath, statePath, doctrinePath, governancePath,
    coordinationPath, gitWorkflowPath, testingPath, parkedPath,
    coordinationConfigPath, issueTemplatePath, prTemplatePath,
    coordinationWorkflowPath, readmePath, coreWorkflowPath, researchWorkflowPath,
  ],
  required_headings: requiredHeadings.length,
  required_pointers: requiredPointers.length,
  required_rules: requiredRules.length,
  required_core_workflow_inputs: requiredCoreWorkflowInputs.length,
  required_research_workflow_inputs: requiredResearchWorkflowInputs.length,
  merge_policy: "explicit_user_approval_per_pr_and_head",
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
process.exitCode = errors.length === 0 ? 0 : 1;
