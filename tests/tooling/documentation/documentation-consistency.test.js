"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "../../..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

function projectStateTable() {
  const values = new Map();
  for (const match of read("docs/current/PROJECT-STATE.md").matchAll(
    /^\|\s*([^|]+?)\s*\|\s*([\d,]+)\s*\|$/gm,
  )) {
    values.set(match[1].trim(), Number(match[2].replaceAll(",", "")));
  }
  return values;
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

test("volatile project facts have one current owner", () => {
  assert.doesNotMatch(read("README.md"), /^## Current state$/m);
  assert.doesNotMatch(read("HANDOFF.md"), /^## Binding state$/m);
  assert.doesNotMatch(read("docs/current/00-START-HERE.md"), /^## Current baseline$/m);

  const projectState = projectStateTable();
  assert.ok(projectState.has("Expert-adjudicated UUIDs"));
  assert.ok(projectState.has("Pending UUID adjudications"));
  assert.ok(projectState.has("Accepted adjudication batches"));
});

test("documented identity counts derive from the permanent registry", () => {
  const registry = readJson("data/construction-identities.json");
  const total = registry.records.length;
  const adjudicated = registry.records.filter(
    (record) => record.label_review?.review_state === "complete",
  ).length;
  const pending = total - adjudicated;
  const projectState = projectStateTable();

  assert.equal(projectState.get("Permanent UUID records"), total);
  assert.equal(projectState.get("Expert-adjudicated UUIDs"), adjudicated);
  assert.equal(projectState.get("Pending UUID adjudications"), pending);
});

test("documented accepted-batch count covers the initial record and later files", () => {
  const batches = acceptedBatchNumbers();
  const acceptedBatchCount = batches.at(-1) || 0;
  const expectedSequence = Array.from(
    { length: acceptedBatchCount },
    (_unused, index) => index + 1,
  );
  const projectState = projectStateTable();

  assert.deepEqual(batches, expectedSequence, "accepted adjudication batch numbers must be contiguous from 1");
  assert.equal(projectState.get("Accepted adjudication batches"), acceptedBatchCount);
});

test("routing applies the checked-in agent availability setting", () => {
  const settings = readJson("config/agent-workflow-settings.json");
  const agents = read("AGENTS.md");
  const routing = read("docs/current/CODEX-ISSUE-WORKFLOW.md");
  const availability = read("docs/current/AGENT-WORKFLOW-SETTINGS.md");
  const projectState = read("docs/current/PROJECT-STATE.md");

  assert.match(routing, /Eligibility never overrides availability\./);
  assert.match(routing, /config\/agent-workflow-settings\.json/);

  if (settings.codex.enabled) {
    assert.match(availability, /codex\.enabled: true/);
    assert.match(projectState, /\| Codex \| Available \|/);
  } else {
    assert.match(availability, /codex\.enabled: false/);
    assert.match(projectState, /\| Codex \| Disabled \|/);
    assert.match(agents, /may not be targeted, assigned, reassigned, claimed, or resumed by Codex/);
    assert.match(routing, /may target only ChatGPT or human action/);
  }
});

test("canonical current documents reject fixed reviewer roles", () => {
  const files = [
    "README.md",
    "AGENTS.md",
    "HANDOFF.md",
    "docs/current/00-START-HERE.md",
    "docs/current/PROJECT-STATE.md",
    "docs/current/GOVERNANCE.md",
    "docs/current/DEFINITION-OF-DONE.md",
    "docs/current/CODEX-ISSUE-WORKFLOW.md",
    "docs/current/AGENT-WORKFLOW-SETTINGS.md",
    "tools/corpus-review/README.md",
  ];
  const stale = /\bSpeaker A\b|\bSpeaker B\b|two[- ]speaker system|spouse reviewer/i;
  for (const file of files) assert.doesNotMatch(read(file), stale, file);

  assert.match(
    read("docs/current/GOVERNANCE.md"),
    /No named person, relationship, private reviewer,\s+expert title, or recruitment channel receives special status/,
  );
});

test("local corpus execution does not transfer parent ownership", () => {
  const routing = read("docs/current/CODEX-ISSUE-WORKFLOW.md");
  const corpus = read("tools/corpus-review/README.md");
  assert.match(routing, /parent repository intake remains ChatGPT-owned/);
  assert.match(corpus, /Keep the parent repository intake owned by ChatGPT/);
  assert.match(corpus, /without transferring the parent issue, expert\s+classification, PR readiness, or merge authority/);
});
