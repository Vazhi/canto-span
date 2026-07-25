#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const SETTINGS_PATH = path.resolve(__dirname, "../../config/agent-workflow-settings.json");
const SETTINGS_SCHEMA = "canto-span-agent-workflow-settings-v1";
const ALLOWED_DISABLED_FALLBACKS = new Set(["chatgpt", "human"]);
const REASSIGNMENT_NOTICE = [
  "## Workflow-toggle reassignment",
  "",
  "Codex workflows are disabled by `config/agent-workflow-settings.json`.",
  "This issue is assigned to ChatGPT while that setting remains off. Any older Codex",
  "bootstrap text below is inactive historical task context and does not authorize Codex",
  "pickup, assignment, claims, branches, edits, or pull-request work.",
].join("\n");

class AgentWorkflowSettingsError extends Error {
  constructor(errors) {
    super(`invalid agent workflow settings:\n- ${errors.join("\n- ")}`);
    this.name = "AgentWorkflowSettingsError";
    this.errors = errors;
  }
}

function validateSettings(settings) {
  const errors = [];
  if (!settings || typeof settings !== "object" || Array.isArray(settings)) {
    return ["settings must be an object"];
  }
  if (settings.schema !== SETTINGS_SCHEMA) {
    errors.push(`schema must equal ${SETTINGS_SCHEMA}`);
  }
  const codex = settings.codex;
  if (!codex || typeof codex !== "object" || Array.isArray(codex)) {
    errors.push("codex must be an object");
    return errors;
  }
  if (typeof codex.enabled !== "boolean") {
    errors.push("codex.enabled must be a boolean");
  }
  if (!ALLOWED_DISABLED_FALLBACKS.has(codex.disabled_pickup_fallback)) {
    errors.push("codex.disabled_pickup_fallback must be chatgpt or human");
  }
  if (!Array.isArray(codex.blocked_assignee_logins)
      || codex.blocked_assignee_logins.some((login) => typeof login !== "string" || !login.trim())) {
    errors.push("codex.blocked_assignee_logins must contain non-empty strings");
  } else if (new Set(codex.blocked_assignee_logins.map((login) => login.toLowerCase())).size
      !== codex.blocked_assignee_logins.length) {
    errors.push("codex.blocked_assignee_logins must be unique case-insensitively");
  }
  return errors;
}

function loadSettings(settingsPath = SETTINGS_PATH) {
  let settings;
  try {
    settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
  } catch (error) {
    throw new AgentWorkflowSettingsError([`cannot read ${settingsPath}: ${error.message}`]);
  }
  const errors = validateSettings(settings);
  if (errors.length) throw new AgentWorkflowSettingsError(errors);
  return settings;
}

function codexWorkflowsEnabled(settings = loadSettings()) {
  return settings.codex.enabled;
}

function allowedPickupTargets(settings = loadSettings()) {
  return codexWorkflowsEnabled(settings)
    ? new Set(["codex", "chatgpt", "human"])
    : new Set(["chatgpt", "human"]);
}

function assertPickupTargetEnabled(target, settings = loadSettings()) {
  if (!allowedPickupTargets(settings).has(target)) {
    throw new AgentWorkflowSettingsError([
      `pickup target ${JSON.stringify(target)} is disabled; allowed targets are: ${[
        ...allowedPickupTargets(settings),
      ].join(", ")}`,
    ]);
  }
}

function isBlockedCodexAssignee(login, settings = loadSettings()) {
  if (codexWorkflowsEnabled(settings)) return false;
  const normalized = String(login || "").trim().toLowerCase();
  if (!normalized) return false;
  const configured = new Set(settings.codex.blocked_assignee_logins.map((item) => item.toLowerCase()));
  return configured.has(normalized) || normalized.includes("codex");
}

function blockedCodexAssignees(assignees, settings = loadSettings()) {
  return (assignees || [])
    .map((assignee) => typeof assignee === "string" ? assignee : assignee?.login)
    .filter((login) => isBlockedCodexAssignee(login, settings));
}

function extractSingleTaskIntake(body) {
  const matches = [...String(body || "").matchAll(/```task-intake[^\n`]*\n([\s\S]*?)```/gi)];
  if (!matches.length) return null;
  if (matches.length !== 1) {
    throw new AgentWorkflowSettingsError(["expected at most one task-intake block"]);
  }
  try {
    return { match: matches[0], metadata: JSON.parse(matches[0][1]) };
  } catch (error) {
    throw new AgentWorkflowSettingsError([`invalid task-intake JSON: ${error.message}`]);
  }
}

function reassignmentStatus(target) {
  return target === "human" ? "human-pickup-required" : "chatgpt-pickup-required";
}

function reassignDisabledCodexIntake(body, options = {}) {
  const settings = options.settings || loadSettings();
  if (codexWorkflowsEnabled(settings)) return { changed: false, body: String(body || ""), metadata: null };
  const intake = extractSingleTaskIntake(body);
  if (!intake) return { changed: false, body: String(body || ""), metadata: null };
  const metadata = intake.metadata;
  if (metadata.schema !== "canto-span-task-intake-v2") {
    return { changed: false, body: String(body || ""), metadata, legacyBlocked: true };
  }
  if (metadata.pickup_target !== "codex" && metadata.active_pickup_owner !== "codex") {
    return { changed: false, body: String(body || ""), metadata };
  }

  const fallback = settings.codex.disabled_pickup_fallback;
  const timestamp = options.timestamp || new Date().toISOString();
  const hadActiveWork = metadata.active_claim_issue !== null
    || metadata.active_branch !== null || metadata.active_pr !== null;
  const next = {
    ...metadata,
    pickup_target: fallback,
    pickup_status: reassignmentStatus(fallback),
    active_pickup_owner: fallback,
    ownership_revision: Number(metadata.ownership_revision) + 1,
    previous_pickup_target: "codex",
    ownership_reason: "reassignment",
    ownership_updated_at: timestamp,
    pickup_allowed: true,
    handoff_status: hadActiveWork ? "claim-released" : "no-active-work",
    active_claim_issue: null,
    active_branch: null,
    active_pr: null,
    codex_self_screen_required: false,
  };
  if (!Number.isInteger(next.ownership_revision) || next.ownership_revision < 2) {
    throw new AgentWorkflowSettingsError(["Codex reassignment requires a valid prior ownership revision"]);
  }

  const replacement = `\`\`\`task-intake\n${JSON.stringify(next, null, 2)}\n\`\`\``;
  let nextBody = String(body || "").replace(intake.match[0], replacement);
  if (!nextBody.includes(REASSIGNMENT_NOTICE)) {
    nextBody = `${REASSIGNMENT_NOTICE}\n\n${nextBody}`;
  }
  return { changed: true, body: nextBody, metadata: next, previousMetadata: metadata };
}

module.exports = {
  ALLOWED_DISABLED_FALLBACKS,
  AgentWorkflowSettingsError,
  REASSIGNMENT_NOTICE,
  SETTINGS_PATH,
  SETTINGS_SCHEMA,
  allowedPickupTargets,
  assertPickupTargetEnabled,
  blockedCodexAssignees,
  codexWorkflowsEnabled,
  extractSingleTaskIntake,
  isBlockedCodexAssignee,
  loadSettings,
  reassignDisabledCodexIntake,
  validateSettings,
};
