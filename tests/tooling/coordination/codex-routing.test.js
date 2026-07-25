#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const test = require("node:test");
const assert = require("node:assert/strict");

const root = path.resolve(__dirname, "../../..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

const agents = read("AGENTS.md");
const routing = read("docs/current/CODEX-ISSUE-WORKFLOW.md");

test("AGENTS requires the ChatGPT/Codex routing contract", () => {
  assert.match(agents, /CODEX-ISSUE-WORKFLOW\.md/);
  assert.match(agents, /classify the work as `ChatGPT-first`, `Codex-ready`, or `hybrid`/);
  assert.match(agents, /ChatGPT must consult `CODEX-ISSUE-WORKFLOW\.md`/);
  assert.match(agents, /without waiting for the user to request delegation again/);
});

test("ChatGPT proactively delegates and reports eligible Codex issues", () => {
  assert.match(routing, /The user does not need to ask ChatGPT/);
  assert.match(routing, /create a Codex intake issue without waiting for a separate user reminder/);
  assert.match(routing, /inform the user immediately after issue creation/);
  assert.match(routing, /report every created issue to the user/);
});

test("Codex self-screens before claim, branch, or edit", () => {
  assert.match(routing, /Codex must read this document before creating a semantic work claim/);
  assert.match(routing, /Codex must independently verify that the intake issue is Codex-ready/);
  assert.match(routing, /stop before creating a work claim, branch, or edit/);
  assert.match(routing, /routing result: `needs-chatgpt`/);
});

test("generated prompts include routing and user review stops", () => {
  assert.match(routing, /docs\/current\/CODEX-ISSUE-WORKFLOW\.md in full/);
  assert.match(routing, /self-screen this task/);
  assert.match(routing, /stop without merging/);
  assert.match(routing, /user_merge_approval_required/);
});

test("dispatch status remains truthful", () => {
  assert.match(routing, /manual-pickup-required/);
  assert.match(routing, /Creating an issue alone does not prove that Codex has begun work/);
  assert.match(routing, /Assignment, labels, mentions, or an `issues: opened` event must not be described as/);
});
