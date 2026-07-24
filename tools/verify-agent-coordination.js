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

function requireText(file, text, label) {
  const content = read(file);
  if (!content.includes(text)) {
    errors.push({ type: "missing_contract_text", file, label, expected: text });
  }
}

const agentsPath = "AGENTS.md";
const startPath = "docs/current/00-START-HERE.md";
const statePath = "docs/current/PROJECT-STATE.md";
const readmePath = "README.md";

requireText(agentsPath, "docs/current/00-START-HERE.md", "mandatory Start Here pointer");
requireText(agentsPath, "inspect current `main` and open pull requests", "multi-agent overlap check");
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
  "CURRENT-RESEARCH-PROVENANCE.md",
  "review-packets/native-panel/active-v2",
  "tools/corpus-review/README.md",
  "data/construction-identities.json",
  "data/construction-candidate-readiness.json",
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
];

for (const rule of requiredRules) {
  requireText(startPath, rule, `mandatory rule ${rule}`);
}

requireText(startPath, "current AB30 candidate packet: **5 reviewed; 2 genuine; 3 false positives**", "AB30 reviewed packet");
requireText(startPath, "AB30 corpus-readiness effect: **`partial_only`**", "AB30 partial-only readiness");
requireText(startPath, "`YUE-JUDGMENT-PILOT-01` remains in collection", "active survey state");
requireText(startPath, "`followup-draft-v1` is non-deployable", "follow-up deployment state");

requireText(statePath, "`readiness_effect: partial_only`", "project-state corpus effect");
requireText(statePath, "`YUE-JUDGMENT-PILOT-01` remains the active SoSci collection instrument", "project-state live survey");
requireText(statePath, "`review-packets/native-panel/active-v2/followup-draft-v1-*` is a non-deployable", "project-state follow-up state");

requireText(readmePath, "AGENTS.md", "root agent bootstrap pointer");
requireText(readmePath, "docs/current/00-START-HERE.md", "root Start Here pointer");

const result = {
  schema: "canto-span-agent-coordination-contract-v1",
  status: errors.length === 0 ? "PASS" : "FAIL",
  checked_files: [agentsPath, startPath, statePath, readmePath],
  required_headings: requiredHeadings.length,
  required_pointers: requiredPointers.length,
  required_rules: requiredRules.length,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
process.exitCode = errors.length === 0 ? 0 : 1;
