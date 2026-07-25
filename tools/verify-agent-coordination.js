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

function requireAll(file, values, labelPrefix) {
  for (const value of values) {
    requireText(file, value, `${labelPrefix} ${value}`);
  }
}

const agentsPath = "AGENTS.md";
const startPath = "docs/current/00-START-HERE.md";
const statePath = "docs/current/PROJECT-STATE.md";
const doctrinePath = "docs/current/DOCTRINE.md";
const governancePath = "docs/current/GOVERNANCE.md";
const coordinationPath = "docs/current/MULTI-AGENT-COORDINATION.md";
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
requireText(agentsPath, "inspect current `main`, open pull requests, and open work-claim issues", "multi-agent overlap check");
requireText(agentsPath, "create or update one work-claim issue", "work claim requirement");
requireText(agentsPath, "draft pull request", "draft PR handoff");

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

for (const heading of requiredHeadings) {
  requireText(startPath, heading, heading);
}

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

for (const pointer of requiredPointers) {
  requireText(startPath, pointer, `canonical pointer ${pointer}`);
}

const requiredRules = [
  "zero independent linguistic evidence weight",
  "Use `construction_code + canonical_name`",
  "No spouse",
  "`deployment_allowed: false`",
  "Do not create repeated `validation/vX.Y.Z/` trees",
  "GitHub Actions is read-only verification",
  "Do not merge the PR",
  "no active-note whitelist",
  "no repository-wide grammar freeze",
  "recommend unpark",
  "Semantic work claims",
  "semantic regions",
  "integration-owned",
  "changes/pending/",
];

for (const rule of requiredRules) {
  requireText(startPath, rule, `mandatory rule ${rule}`);
}

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
requireText(governancePath, "Workflow availability is blacklist-based", "governance blacklist policy");
requireText(governancePath, "The construction remains parked until a reviewed change removes its entry", "governance unpark boundary");
requireText(parkedPath, "\"default_state\": \"available\"", "parked registry default state");

requireText(coordinationPath, "same physical file", "same-file concurrency rule");
requireText(coordinationPath, "semantic target regions", "semantic claim rule");
requireText(coordinationPath, "must not survive a ready-to-merge pull request", "pending cleanup rule");
requireText(coordinationConfigPath, "\"integration_owned_files\"", "integration ownership config");
requireText(issueTemplatePath, "coordination-claim", "work claim issue form");
requireText(prTemplatePath, "coordination-claim: #ISSUE_NUMBER", "PR claim marker");
requireText(prTemplatePath, "Closes #ISSUE_NUMBER", "automatic claim closure");

requireText(readmePath, "AGENTS.md", "root agent bootstrap pointer");
requireText(readmePath, "docs/current/00-START-HERE.md", "root Start Here pointer");

requireText(coreWorkflowPath, "permissions: contents: read", "core workflow read-only permissions");
requireText(researchWorkflowPath, "permissions: contents: read", "research workflow read-only permissions");
requireText(coordinationWorkflowPath, "contents: read", "coordination workflow read-only contents");
requireText(coordinationWorkflowPath, "issues: read", "coordination workflow read-only issues");
requireText(coordinationWorkflowPath, "pull-requests: read", "coordination workflow read-only PRs");
requireText(coordinationWorkflowPath, "node tools/coordination/check-pr.js", "coordination workflow checker");

const requiredCoreWorkflowInputs = [
  "AGENTS.md",
  "README.md",
  "HANDOFF.md",
  "main.js",
  "manifest.json",
  "package.json",
  "data/**",
  "grammar/**",
  "tests/**",
  "tools/**",
  "config/**",
  "schemas/**",
  "changes/**",
  "docs/current/**",
  ".github/**",
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
  schema: "canto-span-agent-coordination-contract-v4",
  status: errors.length === 0 ? "PASS" : "FAIL",
  checked_files: [
    agentsPath,
    startPath,
    statePath,
    doctrinePath,
    governancePath,
    coordinationPath,
    parkedPath,
    coordinationConfigPath,
    issueTemplatePath,
    prTemplatePath,
    coordinationWorkflowPath,
    readmePath,
    coreWorkflowPath,
    researchWorkflowPath,
  ],
  required_headings: requiredHeadings.length,
  required_pointers: requiredPointers.length,
  required_rules: requiredRules.length,
  required_core_workflow_inputs: requiredCoreWorkflowInputs.length,
  required_research_workflow_inputs: requiredResearchWorkflowInputs.length,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
process.exitCode = errors.length === 0 ? 0 : 1;
