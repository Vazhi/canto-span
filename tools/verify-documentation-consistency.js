#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { verifyProjectState } = require("./verify-project-state");

const root = path.resolve(__dirname, "..");
const outputIndex = process.argv.indexOf("--output");
const requestedOutputPath = outputIndex !== -1
  ? path.resolve(process.cwd(), process.argv[outputIndex + 1])
  : null;
const ignoredDirectories = new Set([".git", "node_modules", "archive"]);
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
  "tools/corpus-review/README.md",
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignoredDirectories.has(entry.name)) return [];
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function acceptedBatchNumbers() {
  const initial = readJson("data/construction-adjudications.json");
  const numbers = Array.isArray(initial.records) && initial.records.length > 0 ? [1] : [];
  const later = fs.readdirSync(path.join(root, "data", "construction-adjudication-batches"))
    .map((name) => name.match(/^batch-(\d+)\.json$/))
    .filter(Boolean)
    .map((match) => Number(match[1]))
    .filter((number) => number > 0);
  return numbers.concat(later).sort((left, right) => left - right);
}

const files = walk(root).filter(
  (file) => !requestedOutputPath || path.resolve(file) !== requestedOutputPath,
);
const markdownFiles = files.filter((file) => file.endsWith(".md"));
const jsonFiles = files.filter((file) => file.endsWith(".json"));
const errors = [];

function fail(type, file, detail) {
  errors.push({ type, file, detail });
}

function requirePattern(relativePath, pattern, label) {
  const text = read(relativePath);
  if (!pattern.test(text)) {
    fail("missing_current_contract", relativePath, label);
  }
}

function forbidPattern(relativePath, pattern, label) {
  const text = read(relativePath);
  const match = text.match(pattern);
  if (match) {
    fail(
      "contradictory_current_text",
      relativePath,
      `${label}: found ${JSON.stringify(match[0])}`,
    );
  }
}

function requireSingleOwner(pattern, ownerPath, label) {
  const occurrences = currentAuthorityFiles.flatMap((relativePath) => {
    const text = read(relativePath);
    return [...text.matchAll(pattern)].map((match) => ({
      file: relativePath,
      value: match[0],
    }));
  });
  const outsideOwner = occurrences.filter((item) => item.file !== ownerPath);
  const ownerOccurrences = occurrences.filter((item) => item.file === ownerPath);
  if (ownerOccurrences.length !== 1 || outsideOwner.length) {
    fail(
      "duplicate_current_authority",
      ownerPath,
      `${label}: owner occurrences=${ownerOccurrences.length}; outside owner=${outsideOwner.map((item) => item.file).join(", ") || "none"}`,
    );
  }
}

for (const file of jsonFiles) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail("invalid_json", path.relative(root, file), error.message);
  }
}

const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
for (const file of markdownFiles) {
  const text = fs.readFileSync(file, "utf8");
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
      : path.resolve(path.dirname(file), target);
    if (!fs.existsSync(absolute)) {
      fail("broken_local_link", path.relative(root, file), target);
    }
  }
}

const projectStateResult = verifyProjectState(root);
if (projectStateResult.status !== "PASS") {
  fail(
    "project_state_contract_failed",
    "docs/current/PROJECT-STATE.md",
    projectStateResult.failures,
  );
}

const batches = acceptedBatchNumbers();
const acceptedBatchCount = batches.at(-1) || 0;
const expectedBatchSequence = Array.from(
  { length: acceptedBatchCount },
  (_unused, index) => index + 1,
);
if (JSON.stringify(batches) !== JSON.stringify(expectedBatchSequence)) {
  fail(
    "noncontiguous_adjudication_batches",
    "data/construction-adjudications.json and data/construction-adjudication-batches",
    { declared_sequence: batches, expected_sequence: expectedBatchSequence },
  );
}
requirePattern(
  "docs/current/PROJECT-STATE.md",
  new RegExp(`\\| Accepted adjudication batches \\|\\s*${acceptedBatchCount}\\s*\\|`),
  `accepted adjudication batch count must be ${acceptedBatchCount}`,
);

const agentSettings = readJson("config/agent-workflow-settings.json");
const codexEnabled = agentSettings?.codex?.enabled === true;
const codexState = codexEnabled ? "Available" : "Disabled";
requirePattern(
  "docs/current/PROJECT-STATE.md",
  new RegExp(`\\| Codex \\|\\s*${codexState}\\s*\\|`),
  `Codex workflow state must be ${codexState}`,
);
requirePattern(
  "docs/current/AGENT-WORKFLOW-SETTINGS.md",
  new RegExp(`codex\\.enabled:\\s*${codexEnabled}`),
  `documented codex.enabled must be ${codexEnabled}`,
);

forbidPattern("README.md", /^## Current state$/m, "README must not own a state ledger");
forbidPattern("HANDOFF.md", /^## Binding state$/m, "HANDOFF must not own a state ledger");
forbidPattern("docs/current/00-START-HERE.md", /^## Current baseline$/m, "durable contract must not own volatile counts");
forbidPattern("README.md", /expert-adjudicated identities:\s*\*\*\d+/i, "README adjudication count");
forbidPattern("HANDOFF.md", /research_pending`:\s*\*\*\d+/i, "HANDOFF status count");
forbidPattern("docs/current/00-START-HERE.md", /completed expert adjudications:\s*\*\*\d+/i, "START-HERE adjudication count");

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

for (const [relativePath, pattern, label] of [
  ["README.md", /docs\/current\/PROJECT-STATE\.md/, "README project-state link"],
  ["README.md", /docs\/current\/00-START-HERE\.md/, "README contract link"],
  ["AGENTS.md", /config\/agent-workflow-settings\.json/, "agent settings link"],
  ["HANDOFF.md", /docs\/current\/PROJECT-STATE\.md/, "handoff project-state link"],
  ["docs/current/00-START-HERE.md", /PROJECT-STATE\.md/, "contract project-state link"],
  ["docs/current/00-START-HERE.md", /AGENT-WORKFLOW-SETTINGS\.md/, "contract agent-settings link"],
  ["docs/current/00-START-HERE.md", /USER-MERGE-REVIEW\.md/, "contract merge-gate link"],
  ["docs/current/CODEX-ISSUE-WORKFLOW.md", /config\/agent-workflow-settings\.json/, "routing availability link"],
]) {
  requirePattern(relativePath, pattern, label);
}

if (!codexEnabled) {
  requirePattern(
    "AGENTS.md",
    /may not be targeted, assigned, reassigned, claimed, or resumed by Codex/,
    "disabled Codex assignment rule",
  );
  requirePattern(
    "docs/current/CODEX-ISSUE-WORKFLOW.md",
    /While Codex workflows are disabled/,
    "disabled routing section",
  );
  requirePattern(
    "docs/current/CODEX-ISSUE-WORKFLOW.md",
    /may target only ChatGPT or human action/,
    "allowed disabled targets",
  );
  requirePattern(
    "docs/current/PROJECT-STATE.md",
    /may target only ChatGPT or human action/,
    "project-state disabled targets",
  );
}

requirePattern(
  "docs/current/GOVERNANCE.md",
  /one anonymized native-Cantonese panel/,
  "role-neutral panel",
);
requirePattern(
  "docs/current/DEFINITION-OF-DONE.md",
  /No respondent receives special status or weight/,
  "equal respondent weight",
);
requirePattern(
  "docs/current/00-START-HERE.md",
  /No named person, relationship, private reviewer, expert title, or recruitment channel receives special status/,
  "no special reviewer role",
);

const staleCurrentPatterns = [
  { pattern: /\bSpeaker A\b/i, label: "fixed Speaker A role" },
  { pattern: /\bSpeaker B\b/i, label: "fixed Speaker B role" },
  { pattern: /two[- ]speaker system/i, label: "fixed two-speaker system" },
  { pattern: /named reviewer receives special/i, label: "named reviewer special status" },
  { pattern: /spouse reviewer/i, label: "spouse reviewer role" },
];
for (const relativePath of currentAuthorityFiles) {
  for (const { pattern, label } of staleCurrentPatterns) {
    forbidPattern(relativePath, pattern, label);
  }
}

requirePattern(
  "docs/current/CODEX-ISSUE-WORKFLOW.md",
  /parent repository intake remains ChatGPT-owned/,
  "local corpus execution preserves parent ownership",
);
requirePattern(
  "tools/corpus-review/README.md",
  /Keep the parent repository intake owned by ChatGPT/,
  "corpus guide preserves parent ownership",
);
requirePattern(
  "tools/corpus-review/README.md",
  /without transferring the parent issue, expert\s+classification, PR readiness, or merge authority/,
  "human corpus step does not transfer authority",
);

const result = {
  schema: "canto-span-documentation-consistency-v4",
  checkpoint: `v${readJson("package.json").version}-current`,
  status: errors.length === 0 ? "PASS" : "FAIL",
  json_files: jsonFiles.length,
  markdown_files: markdownFiles.length,
  broken_local_links: errors.filter((error) => error.type === "broken_local_link").length,
  canonical_owners: {
    volatile_project_state: "docs/current/PROJECT-STATE.md",
    agent_availability: "config/agent-workflow-settings.json",
    task_routing: "docs/current/CODEX-ISSUE-WORKFLOW.md",
    merge_authorization: "docs/current/USER-MERGE-REVIEW.md",
  },
  canonical_counts: {
    accepted_adjudication_batches: acceptedBatchCount,
    codex_enabled: codexEnabled,
  },
  delegated_checks: {
    project_state: projectStateResult.status,
  },
  errors,
};

if (requestedOutputPath) {
  fs.mkdirSync(path.dirname(requestedOutputPath), { recursive: true });
  fs.writeFileSync(requestedOutputPath, `${JSON.stringify(result, null, 2)}\n`);
}

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
process.exitCode = errors.length === 0 ? 0 : 1;
