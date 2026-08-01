#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { verifyProjectState } = require("./verify-project-state");

const root = path.resolve(__dirname, "..");
const outputIndex = process.argv.indexOf("--output");
const outputPath = outputIndex >= 0
  ? path.resolve(process.cwd(), process.argv[outputIndex + 1] || "")
  : null;
if (outputIndex >= 0 && !process.argv[outputIndex + 1]) {
  console.error("--output requires a file path");
  process.exit(2);
}

const currentAuthorityFiles = [
  "README.md",
  "AGENTS.md",
  "HANDOFF.md",
  "docs/current/00-START-HERE.md",
  "docs/current/PROJECT-STATE.md",
  "docs/current/GOVERNANCE.md",
  "docs/current/DEFINITION-OF-DONE.md",
  "docs/current/CODEX-ISSUE-WORKFLOW.md",
  "docs/current/AGENT-WORKFLOW-SETTINGS.md",
  "docs/current/MULTI-AGENT-COORDINATION.md",
  "docs/current/USER-MERGE-REVIEW.md",
  "docs/current/TESTING.md",
  "tools/corpus-review/README.md",
];
const errors = [];

function read(relativePath) {
  const absolute = path.join(root, relativePath);
  if (!fs.existsSync(absolute)) {
    errors.push({ type: "missing_current_document", file: relativePath });
    return "";
  }
  return fs.readFileSync(absolute, "utf8");
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function requirePattern(relativePath, pattern, detail) {
  if (!pattern.test(read(relativePath))) {
    errors.push({ type: "missing_current_contract", file: relativePath, detail });
  }
}

function forbidPattern(relativePath, pattern, detail) {
  const match = read(relativePath).match(pattern);
  if (match) {
    errors.push({
      type: "contradictory_current_text",
      file: relativePath,
      detail: `${detail}: ${JSON.stringify(match[0])}`,
    });
  }
}

function requireSingleOwner(pattern, ownerPath, detail) {
  const occurrences = currentAuthorityFiles.flatMap((relativePath) =>
    [...read(relativePath).matchAll(pattern)].map(() => relativePath),
  );
  if (occurrences.length !== 1 || occurrences[0] !== ownerPath) {
    errors.push({
      type: "duplicate_current_authority",
      file: ownerPath,
      detail: `${detail}: ${occurrences.join(", ") || "none"}`,
    });
  }
}

const projectStateResult = verifyProjectState(root);
if (projectStateResult.status !== "PASS") {
  errors.push({
    type: "project_state_contract_failed",
    file: "docs/current/PROJECT-STATE.md",
    detail: projectStateResult.failures,
  });
}

const laterBatches = fs
  .readdirSync(path.join(root, "data", "construction-adjudication-batches"))
  .map((name) => name.match(/^batch-(\d+)\.json$/))
  .filter(Boolean)
  .map((match) => Number(match[1]))
  .filter((number) => number > 1)
  .sort((left, right) => left - right);
const batchNumbers = [1, ...laterBatches];
const acceptedBatchCount = batchNumbers.at(-1) || 1;
const expectedBatchNumbers = Array.from(
  { length: acceptedBatchCount },
  (_unused, index) => index + 1,
);
if (JSON.stringify(batchNumbers) !== JSON.stringify(expectedBatchNumbers)) {
  errors.push({
    type: "noncontiguous_adjudication_batches",
    file: "data/construction-adjudication-batches",
    detail: { actual: batchNumbers, expected: expectedBatchNumbers },
  });
}
requirePattern(
  "docs/current/PROJECT-STATE.md",
  new RegExp(`\\| Accepted adjudication batches \\|\\s*${acceptedBatchCount}\\s*\\|`),
  `accepted adjudication batch count must be ${acceptedBatchCount}`,
);

const settings = readJson("config/agent-workflow-settings.json");
const codexEnabled = settings?.codex?.enabled === true;
requirePattern(
  "docs/current/PROJECT-STATE.md",
  new RegExp(`\\| Codex \\|\\s*${codexEnabled ? "Available" : "Disabled"}\\s*\\|`),
  "Codex availability must match the checked-in setting",
);
requirePattern(
  "docs/current/AGENT-WORKFLOW-SETTINGS.md",
  new RegExp(`codex\\.enabled:\\s*${codexEnabled}`),
  "documented codex.enabled must match the checked-in setting",
);
forbidPattern("README.md", /^## Current state$/m, "README must not own a state ledger");
forbidPattern("HANDOFF.md", /^## Binding state$/m, "HANDOFF must not own a state ledger");
forbidPattern(
  "docs/current/00-START-HERE.md",
  /^## Current baseline$/m,
  "durable contract must not own volatile counts",
);
requireSingleOwner(
  /\| Expert-adjudicated UUIDs \| \d+ \|/g,
  "docs/current/PROJECT-STATE.md",
  "adjudicated identity count",
);
requireSingleOwner(
  /\| Pending UUID adjudications \| \d+ \|/g,
  "docs/current/PROJECT-STATE.md",
  "pending identity count",
);
requireSingleOwner(
  /\| Accepted adjudication batches \| \d+ \|/g,
  "docs/current/PROJECT-STATE.md",
  "accepted batch count",
);

const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
for (const relativePath of currentAuthorityFiles) {
  const text = read(relativePath);
  for (const match of text.matchAll(linkPattern)) {
    let target = match[1].trim();
    if (
      !target
      || target.startsWith("#")
      || /^(https?:|mailto:|sandbox:)/i.test(target)
    ) continue;
    if (target.startsWith("<") && target.endsWith(">")) {
      target = target.slice(1, -1);
    }
    target = target.split("#")[0];
    if (!target) continue;
    const absolute = target.startsWith("/")
      ? path.join(root, target.replace(/^\/+/, ""))
      : path.resolve(path.dirname(path.join(root, relativePath)), target);
    if (!fs.existsSync(absolute)) {
      errors.push({ type: "broken_current_link", file: relativePath, detail: target });
    }
  }
}

const result = {
  schema: "canto-span-documentation-consistency-v5",
  status: errors.length ? "FAIL" : "PASS",
  reason: "Protect current authority ownership, canonical dynamic state, current links, agent availability, and accepted-batch accounting without policing policy prose.",
  current_documents_checked: currentAuthorityFiles.length,
  delegated_project_state: projectStateResult.status,
  accepted_adjudication_batches: acceptedBatchCount,
  codex_enabled: codexEnabled,
  errors,
};

if (outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
