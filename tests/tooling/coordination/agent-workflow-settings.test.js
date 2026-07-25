"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const test = require("node:test");

const {
  AgentWorkflowSettingsError,
  allowedPickupTargets,
  assertPickupTargetEnabled,
  blockedCodexAssignees,
  codexWorkflowsEnabled,
  extractSingleTaskIntake,
  isBlockedCodexAssignee,
  loadSettings,
  reassignDisabledCodexIntake,
  validateSettings,
} = require("../../../tools/coordination/agent-workflow-settings");

function settings(enabled = false, overrides = {}) {
  return {
    schema: "canto-span-agent-workflow-settings-v1",
    codex: {
      enabled,
      disabled_pickup_fallback: "chatgpt",
      blocked_assignee_logins: ["codex", "codex[bot]", "copilot-swe-agent[bot]"],
      ...overrides,
    },
  };
}

function intake(overrides = {}) {
  const metadata = {
    schema: "canto-span-task-intake-v2",
    created_by: "chatgpt",
    pickup_target: "codex",
    pickup_status: "manual-pickup-required",
    category: "corpus-tooling",
    risk: "medium",
    execution_mode: "implementation",
    dependencies: [],
    protected_state: [],
    active_pickup_owner: "codex",
    ownership_revision: 1,
    previous_pickup_target: null,
    ownership_reason: "initial-routing",
    ownership_updated_at: "2026-07-25T00:00:00Z",
    pickup_allowed: true,
    handoff_status: "no-handoff",
    active_claim_issue: null,
    active_branch: null,
    active_pr: null,
    work_claim_required: true,
    user_merge_approval_required: true,
    codex_self_screen_required: true,
    ...overrides,
  };
  return `# Task\n\nCodex instructions.\n\n\`\`\`task-intake\n${JSON.stringify(metadata, null, 2)}\n\`\`\``;
}

test("checked-in toggle is valid and disabled", () => {
  const loaded = loadSettings();
  assert.deepEqual(validateSettings(loaded), []);
  assert.equal(codexWorkflowsEnabled(loaded), false);
  assert.deepEqual([...allowedPickupTargets(loaded)], ["chatgpt", "human"]);
});

test("enabled setting permits all three pickup targets", () => {
  const enabled = settings(true);
  assert.deepEqual([...allowedPickupTargets(enabled)], ["codex", "chatgpt", "human"]);
  assert.doesNotThrow(() => assertPickupTargetEnabled("codex", enabled));
});

test("disabled setting rejects Codex and permits only ChatGPT or human", () => {
  const disabled = settings(false);
  assert.throws(
    () => assertPickupTargetEnabled("codex", disabled),
    (error) => error instanceof AgentWorkflowSettingsError
      && error.message.includes("allowed targets are: chatgpt, human"),
  );
  assert.doesNotThrow(() => assertPickupTargetEnabled("chatgpt", disabled));
  assert.doesNotThrow(() => assertPickupTargetEnabled("human", disabled));
});

test("disabled setting identifies configured and Codex-named assignees", () => {
  const disabled = settings(false);
  assert.equal(isBlockedCodexAssignee("codex[bot]", disabled), true);
  assert.equal(isBlockedCodexAssignee("My-Codex-Agent", disabled), true);
  assert.equal(isBlockedCodexAssignee("copilot-swe-agent[bot]", disabled), true);
  assert.equal(isBlockedCodexAssignee("Vazhi", disabled), false);
  assert.deepEqual(blockedCodexAssignees([
    { login: "Vazhi" },
    { login: "codex[bot]" },
    "openai-codex",
  ], disabled), ["codex[bot]", "openai-codex"]);
  assert.equal(isBlockedCodexAssignee("codex[bot]", settings(true)), false);
});

test("disabled setting monotonically reassigns v2 Codex intake to ChatGPT", () => {
  const result = reassignDisabledCodexIntake(intake(), {
    settings: settings(false),
    timestamp: "2026-07-25T01:00:00Z",
  });
  assert.equal(result.changed, true);
  assert.equal(result.metadata.pickup_target, "chatgpt");
  assert.equal(result.metadata.active_pickup_owner, "chatgpt");
  assert.equal(result.metadata.pickup_status, "chatgpt-pickup-required");
  assert.equal(result.metadata.ownership_revision, 2);
  assert.equal(result.metadata.previous_pickup_target, "codex");
  assert.equal(result.metadata.ownership_reason, "reassignment");
  assert.equal(result.metadata.handoff_status, "no-active-work");
  assert.equal(result.metadata.codex_self_screen_required, false);
  assert.match(result.body, /Workflow-toggle reassignment/);
  assert.deepEqual(extractSingleTaskIntake(result.body).metadata, result.metadata);

  const second = reassignDisabledCodexIntake(result.body, {
    settings: settings(false),
    timestamp: "2026-07-25T02:00:00Z",
  });
  assert.equal(second.changed, false);
  assert.equal(second.body, result.body);
});

test("active Codex work is released when the toggle disables pickup", () => {
  const result = reassignDisabledCodexIntake(intake({
    active_claim_issue: 98,
    active_branch: "agent/aa76-hkcancor-bei-give",
    active_pr: 99,
  }), {
    settings: settings(false),
    timestamp: "2026-07-25T01:00:00Z",
  });
  assert.equal(result.metadata.handoff_status, "claim-released");
  assert.equal(result.metadata.active_claim_issue, null);
  assert.equal(result.metadata.active_branch, null);
  assert.equal(result.metadata.active_pr, null);
});

test("enabled setting never transfers an existing issue", () => {
  const body = intake();
  const result = reassignDisabledCodexIntake(body, { settings: settings(true) });
  assert.equal(result.changed, false);
  assert.equal(result.body, body);
});

test("legacy records are blocked without being silently rewritten", () => {
  const body = "```task-intake\n{\"schema\":\"canto-span-codex-task-v1\"}\n```";
  const result = reassignDisabledCodexIntake(body, { settings: settings(false) });
  assert.equal(result.changed, false);
  assert.equal(result.legacyBlocked, true);
  assert.equal(result.body, body);
});

test("malformed settings fail closed", () => {
  assert.ok(validateSettings({}).length);
  assert.ok(validateSettings(settings(false, { enabled: "false" })).length);
  assert.ok(validateSettings(settings(false, { disabled_pickup_fallback: "codex" })).length);
  assert.ok(validateSettings(settings(false, { blocked_assignee_logins: ["Codex", "codex"] })).length);

  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "canto-span-agent-settings-"));
  const file = path.join(directory, "settings.json");
  fs.writeFileSync(file, "{bad json", "utf8");
  assert.throws(() => loadSettings(file), AgentWorkflowSettingsError);
});
