#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const LEGACY_SCHEMA_PATH = path.resolve(__dirname, "../../schemas/codex-task.schema.json");
const TASK_SCHEMA_PATH = path.resolve(__dirname, "../../schemas/task-intake.schema.json");
const LEGACY_SCHEMA = JSON.parse(fs.readFileSync(LEGACY_SCHEMA_PATH, "utf8"));
const TASK_SCHEMA = JSON.parse(fs.readFileSync(TASK_SCHEMA_PATH, "utf8"));
const LEGACY_PROPERTIES = LEGACY_SCHEMA.properties;
const TASK_PROPERTIES = TASK_SCHEMA.properties;
const ALLOWED_CATEGORIES = new Set(TASK_PROPERTIES.category.enum);
const ALLOWED_CREATORS = new Set(TASK_PROPERTIES.created_by.enum);
const ALLOWED_PICKUP_TARGETS = new Set(TASK_PROPERTIES.pickup_target.enum);
const ALLOWED_RISKS = new Set(TASK_PROPERTIES.risk.enum);
const ALLOWED_EXECUTION_MODES = new Set(TASK_PROPERTIES.execution_mode.enum);

const PICKUP_POLICY = {
  codex: {
    status: "manual-pickup-required",
    workClaimRequired: true,
    userMergeApprovalRequired: true,
    codexSelfScreenRequired: true,
  },
  chatgpt: {
    status: "chatgpt-pickup-required",
    codexSelfScreenRequired: false,
  },
  human: {
    status: "human-pickup-required",
    codexSelfScreenRequired: false,
  },
};

const CANONICAL_BOOTSTRAP = [
  "Read `AGENTS.md`, `docs/current/00-START-HERE.md`, and",
  "`docs/current/CODEX-ISSUE-WORKFLOW.md` in full. Before creating a claim, branch,",
  "or edit, self-screen this task against the ChatGPT-first and Codex eligibility",
  "rules. Inspect current `main`, open pull requests, intake issues, and work claims.",
].join(" ");

const PROHIBITED_DIRECTIVES = [
  ["direct write to main", /\b(?:write|commit|push|apply|land)\b.{0,50}\b(?:to|into|on)\s+(?:the\s+)?main\b/i],
  ["merge or auto-merge authorization", /\b(?:merge(?:\s+the)?\s+(?:pull request|pr|changes?)|enable\s+auto-?merge|auto-?merge)\b/i],
  ["release publication", /\b(?:publish|cut|ship)\b.{0,40}\b(?:a\s+|the\s+)?release\b/i],
  ["survey deployment", /\b(?:deploy|launch|publish)\b.{0,40}\b(?:survey|instrument)\b/i],
  ["construction status decision", /\b(?:promote|downgrade|park|unpark)\b/i],
  ["governance decision", /\b(?:(?:decide|change|set|define|rewrite|override)\b.{0,60}\b(?:governance|project policy|repository policy)|(?:make|take)\b.{0,30}\bgovernance decision)\b/i],
  ["invented linguistic evidence", /\b(?:invent|fabricate|manufacture|assume)\b.{0,50}\b(?:linguistic\s+)?evidence\b/i],
].map(([name, pattern]) => ({ name, pattern }));

const LABEL_STYLES = {
  "codex-ready": { color: "1D76DB", description: "Bounded task eligible for Codex self-screening" },
  "chatgpt-pickup-required": { color: "A371F7", description: "Task requires ChatGPT judgment or review" },
  "human-pickup-required": { color: "D4C5F9", description: "Task requires one concrete human action" },
  pickup: { color: "0052CC", description: "Primary intake pickup target" },
  category: { color: "5319E7", description: "Unified intake task category or decision type" },
  "risk:low": { color: "0E8A16", description: "Low-risk intake" },
  "risk:medium": { color: "FBCA04", description: "Medium-risk intake" },
  "risk:high": { color: "D93F0B", description: "High-risk intake" },
  "findings-only": { color: "C5DEF5", description: "Task produces findings without repairs" },
};

class IntakeValidationError extends Error {
  constructor(errors) {
    super(`invalid task intake:\n- ${errors.join("\n- ")}`);
    this.name = "IntakeValidationError";
    this.errors = errors;
  }
}

function text(value) {
  return String(value == null ? "" : value).trim();
}

function booleanValue(value) {
  if (typeof value === "boolean") return value;
  return text(value).toLowerCase() === "true";
}

function validateTextField(name, value, options = {}) {
  const errors = [];
  const normalized = text(value);
  if (options.required && !normalized) errors.push(`${name} is required`);
  if (normalized.length > (options.maxLength || 12000)) {
    errors.push(`${name} exceeds ${options.maxLength || 12000} characters`);
  }
  if (options.singleLine && /[\r\n]/.test(normalized)) errors.push(`${name} must be one line`);
  if (/```/.test(normalized)) errors.push(`${name} must not contain a Markdown code fence`);
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(normalized)) {
    errors.push(`${name} contains unsupported control characters`);
  }
  return errors;
}

function directiveIsGuarded(clause, match) {
  const before = clause.slice(0, match.index).toLowerCase();
  const after = clause.slice(match.index + match[0].length).toLowerCase();
  const guardBefore = /\b(?:do not|must not|never|may not|cannot|can't|should not|without|reject(?:s|ed|ing)?|prevent(?:s|ed|ing)?|block(?:s|ed|ing)?|prohibit(?:s|ed|ing)?|forbid(?:s|den|ding)?)\b(?:\W+\w+){0,7}\W*$/i;
  const guardAfter = /^\W*(?:is|are|must be|remains?)?\W*(?:not allowed|prohibited|forbidden|blocked|protected)\b/i;
  return guardBefore.test(before) || guardAfter.test(after);
}

function findProhibitedDirectives(values) {
  const hits = [];
  const clauses = values.map(text).join("\n")
    .split(/\r?\n|[.;!?]+|,\s*|\b(?:but|however|then)\b/i)
    .map((clause) => clause.trim()).filter(Boolean);
  for (const clause of clauses) {
    for (const rule of PROHIBITED_DIRECTIVES) {
      const flags = rule.pattern.flags.includes("g") ? rule.pattern.flags : `${rule.pattern.flags}g`;
      const pattern = new RegExp(rule.pattern.source, flags);
      let match = pattern.exec(clause);
      while (match) {
        if (!directiveIsGuarded(clause, match)) hits.push(`${rule.name}: ${clause}`);
        match = pattern.exec(clause);
      }
    }
  }
  return hits;
}

function parseList(value) {
  return [...new Set(text(value).split(/\r?\n|,/)
    .map((item) => item.trim().replace(/^[-*]\s+/, "")).filter(Boolean))];
}

function normalizeInput(input) {
  const normalized = {
    createdBy: input.createdBy,
    pickupTarget: input.pickupTarget,
    category: text(input.category),
    title: text(input.title),
    outcome: text(input.outcome),
    acceptanceCriteria: text(input.acceptanceCriteria),
    relevantContext: text(input.relevantContext),
    dependenciesText: text(input.dependencies),
    protectedStateText: text(input.protectedState),
    risk: text(input.risk || "medium"),
    executionMode: text(input.executionMode || "implementation"),
    unresolvedQuestion: text(input.unresolvedQuestion),
    mechanicalRemainder: text(input.mechanicalRemainder),
    humanInputRequired: booleanValue(input.humanInputRequired),
    humanAction: text(input.humanAction),
    agentLimitation: text(input.agentLimitation),
    requiredArtifact: text(input.requiredArtifact),
    blockedWork: text(input.blockedWork),
    nextStep: text(input.nextStep),
    completionEvidence: text(input.completionEvidence),
    workClaimRequired: booleanValue(input.workClaimRequired),
    userMergeApprovalRequired: booleanValue(input.userMergeApprovalRequired),
  };
  const errors = [
    ...validateTextField("title", normalized.title, { required: true, singleLine: true, maxLength: 256 }),
    ...validateTextField("outcome", normalized.outcome, { required: true, maxLength: 8000 }),
    ...validateTextField("acceptance criteria", normalized.acceptanceCriteria, { required: true }),
    ...validateTextField("relevant context", normalized.relevantContext),
    ...validateTextField("dependencies", normalized.dependenciesText, { maxLength: 8000 }),
    ...validateTextField("protected state", normalized.protectedStateText, { maxLength: 8000 }),
  ];
  if (typeof normalized.createdBy !== "string" || !ALLOWED_CREATORS.has(normalized.createdBy)) {
    errors.push(`created by must be one of: ${[...ALLOWED_CREATORS].join(", ")}`);
  }
  if (typeof normalized.pickupTarget !== "string" || !ALLOWED_PICKUP_TARGETS.has(normalized.pickupTarget)) {
    errors.push(`pickup target must be one of: ${[...ALLOWED_PICKUP_TARGETS].join(", ")}`);
  }
  if (!ALLOWED_CATEGORIES.has(normalized.category)) {
    errors.push(`category must be one of: ${[...ALLOWED_CATEGORIES].join(", ")}`);
  }
  if (!ALLOWED_RISKS.has(normalized.risk)) {
    errors.push(`risk must be one of: ${[...ALLOWED_RISKS].join(", ")}`);
  }
  if (!ALLOWED_EXECUTION_MODES.has(normalized.executionMode)) {
    errors.push(`execution mode must be one of: ${[...ALLOWED_EXECUTION_MODES].join(", ")}`);
  }
  const targetFields = normalized.pickupTarget === "chatgpt"
    ? [["unresolved question", "unresolvedQuestion"], ["mechanical remainder", "mechanicalRemainder"]]
    : normalized.pickupTarget === "human"
      ? [
        ["human action", "humanAction"], ["agent limitation", "agentLimitation"],
        ["required artifact", "requiredArtifact"], ["blocked work", "blockedWork"],
        ["next step", "nextStep"], ["completion evidence", "completionEvidence"],
      ]
      : [];
  for (const [label, field] of targetFields) {
    errors.push(...validateTextField(label, normalized[field], { required: true }));
  }
  const allText = Object.values(normalized).filter((value) => typeof value === "string");
  for (const value of allText) errors.push(...validateTextField("input", value));
  for (const hit of findProhibitedDirectives(allText)) {
    errors.push(`prohibited authorization (${hit})`);
  }
  if (errors.length) throw new IntakeValidationError(errors);
  normalized.dependencies = parseList(normalized.dependenciesText);
  normalized.protectedState = parseList(normalized.protectedStateText);
  return normalized;
}

function buildMetadata(input) {
  const policy = PICKUP_POLICY[input.pickupTarget];
  return {
    schema: TASK_PROPERTIES.schema.const,
    created_by: input.createdBy,
    pickup_target: input.pickupTarget,
    pickup_status: policy.status,
    category: input.category,
    risk: input.risk,
    execution_mode: input.executionMode,
    dependencies: input.dependencies,
    protected_state: input.protectedState,
    active_pickup_owner: input.pickupTarget,
    work_claim_required: input.pickupTarget === "codex" ? true : input.workClaimRequired,
    user_merge_approval_required: input.pickupTarget === "codex" ? true : input.userMergeApprovalRequired,
    codex_self_screen_required: policy.codexSelfScreenRequired,
  };
}

function validateArrayFields(metadata, errors) {
  for (const name of ["dependencies", "protected_state"]) {
    const value = metadata[name];
    if (!Array.isArray(value)) {
      errors.push(`${name} must be an array`);
    } else if (new Set(value.map((item) => JSON.stringify(item))).size !== value.length) {
      errors.push(`${name} must contain unique items`);
    }
  }
  if (Array.isArray(metadata.protected_state)
      && metadata.protected_state.some((item) => typeof item !== "string" || !item.trim())) {
    errors.push("protected_state items must be non-empty strings");
  }
  if (Array.isArray(metadata.dependencies)
      && metadata.dependencies.some((item) => !((Number.isInteger(item) && item >= 1)
        || (typeof item === "string" && item.trim())))) {
    errors.push("dependencies items must be positive integers or non-empty strings");
  }
}

function validateAgainstProperties(metadata, properties) {
  const errors = [];
  const expectedKeys = Object.keys(properties).sort();
  const actualKeys = metadata && typeof metadata === "object" && !Array.isArray(metadata)
    ? Object.keys(metadata).sort() : [];
  if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) {
    errors.push("metadata keys do not match the checked-in schema");
  }
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return errors;
  for (const [name, property] of Object.entries(properties)) {
    const value = metadata[name];
    if (Object.hasOwn(property, "const") && value !== property.const) {
      errors.push(`${name} must equal ${JSON.stringify(property.const)}`);
    }
    if (property.enum && !property.enum.includes(value)) {
      errors.push(`${name} must be one of: ${property.enum.join(", ")}`);
    }
    if (property.type === "boolean" && typeof value !== "boolean") errors.push(`${name} must be a boolean`);
  }
  validateArrayFields(metadata, errors);
  return errors;
}

function validateTaskMetadata(metadata) {
  if (metadata?.schema === LEGACY_PROPERTIES.schema.const) {
    return validateAgainstProperties(metadata, LEGACY_PROPERTIES);
  }
  const errors = validateAgainstProperties(metadata, TASK_PROPERTIES);
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return errors;
  const target = metadata.pickup_target;
  const policy = PICKUP_POLICY[target];
  if (policy) {
    const expected = {
      pickup_status: policy.status,
      active_pickup_owner: target,
      codex_self_screen_required: policy.codexSelfScreenRequired,
    };
    if (target === "codex") {
      expected.work_claim_required = true;
      expected.user_merge_approval_required = true;
    }
    for (const [field, value] of Object.entries(expected)) {
      if (metadata[field] !== value) errors.push(`${field} conflicts with pickup_target ${target}`);
    }
  }
  return errors;
}

function validateInterventionRecord(record) {
  const errors = [];
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return ["intervention record must be an object"];
  }
  if (!["resolve-blocker", "takeover"].includes(record.mode)) {
    errors.push("mode must be resolve-blocker or takeover");
  }
  if (!["user-directed", "blocking-active-work"].includes(record.reason)) {
    errors.push("reason must be user-directed or blocking-active-work");
  }
  if (record.previous_pickup_target !== "codex") errors.push("previous pickup target must be codex");
  if (!Array.isArray(record.active_overlaps)) errors.push("active overlaps must be an array");
  if (record.mode === "resolve-blocker") {
    if (!text(record.resolved_decision)) errors.push("resolved decision is required");
    if (!text(record.remaining_codex_work)) errors.push("remaining codex work is required");
    if (record.pickup_target_after_intervention !== "codex") errors.push("resolve-blocker must return pickup to codex");
    if (record.active_pickup_owner !== "codex") errors.push("resolve-blocker active owner must be codex");
  }
  if (record.mode === "takeover") {
    if (!text(record.scope_taken_over)) errors.push("scope taken over is required");
    if (record.pickup_target_after_intervention !== "chatgpt") errors.push("takeover must assign pickup to chatgpt");
    if (record.active_pickup_owner !== "chatgpt") errors.push("takeover active owner must be chatgpt");
    const safeHandoffs = ["no-active-codex-work", "claim-released", "claim-narrowed", "disjoint-decision-only"];
    if (!safeHandoffs.includes(record.handoff_status)) errors.push("takeover requires a valid handoff status");
    if (Array.isArray(record.active_overlaps) && record.active_overlaps.length) {
      errors.push("takeover must not authorize parallel edits against active overlapping Codex work");
    }
  }
  return errors;
}

function validateReassignmentRecord(record) {
  const errors = [];
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return ["reassignment record must be an object"];
  }
  for (const field of ["previous_pickup_target", "pickup_target", "active_pickup_owner"]) {
    if (typeof record[field] !== "string" || !ALLOWED_PICKUP_TARGETS.has(record[field])) {
      errors.push(`${field} must be one supported pickup target`);
    }
  }
  if (record.previous_pickup_target === record.pickup_target) {
    errors.push("reassignment must change the pickup target");
  }
  if (record.active_pickup_owner !== record.pickup_target) {
    errors.push("active pickup owner must match the reassigned pickup target");
  }
  if (!text(record.reason)) errors.push("reassignment reason is required");
  return errors;
}

function markdownList(value) {
  return text(value).split(/\r?\n/).map((line) => line.trim().replace(/^[-*]\s+/, ""))
    .filter(Boolean).map((line) => `- ${line}`).join("\n");
}

function labelDefinitions(input) {
  const policy = PICKUP_POLICY[input.pickupTarget];
  const names = [policy.status === "manual-pickup-required" ? "codex-ready" : policy.status,
    `pickup:${input.pickupTarget}`, `task:${input.category}`, `risk:${input.risk}`];
  if (input.executionMode === "findings-only") names.push("findings-only");
  return names.map((name) => ({
    name,
    ...(name.startsWith("pickup:") ? LABEL_STYLES.pickup
      : name.startsWith("task:") ? LABEL_STYLES.category : LABEL_STYLES[name]),
  }));
}

function codexSections() {
  return [
    CANONICAL_BOOTSTRAP,
    "",
    "## Codex start gate",
    "",
    "### BEGIN NOW when all are true",
    "",
    "- The outcome is bounded and the specification is accepted.",
    "- No unresolved ChatGPT or human decision blocks implementation.",
    "- No active claim or pull request overlaps the semantic target.",
    "",
    "### WAIT FOR CHATGPT when any are true",
    "",
    "- The task is misrouted, ambiguous, policy-setting, or evidence-dependent.",
    "- A protected decision is unresolved or live work overlaps the target.",
    "",
    "Before edits, post the routing result, create the semantic work claim and exact branch,",
    "then complete one coherent pull request and stop without merging.",
  ];
}

function targetSections(input) {
  if (input.pickupTarget === "codex") return codexSections();
  if (input.pickupTarget === "chatgpt") {
    return [
      "## ChatGPT pickup",
      "",
      "Do not tell Codex to claim, branch, or implement while this decision remains unresolved.",
      "",
      "### Exact question, decision, or review outcome",
      "", input.unresolvedQuestion,
      "", "### Relevant evidence, repository context, or conflicting authorities",
      "", input.relevantContext || "No additional context provided.",
      "", "### Bounded mechanical remainder",
      "", input.mechanicalRemainder,
      "", "### Human input also required",
      "", input.humanInputRequired ? "Yes." : "No.",
      "", "### Observable completion criteria",
      "", markdownList(input.acceptanceCriteria),
    ];
  }
  return [
    "## Human pickup",
    "",
    "Agents must not simulate completion of this human action.",
    "",
    "### One concrete human action", "", input.humanAction,
    "", "### Why an agent cannot perform it", "", input.agentLimitation,
    "", "### Exact information or artifact needed", "", input.requiredArtifact,
    "", "### Work blocked", "", input.blockedWork,
    "", "### What happens after completion", "", input.nextStep,
    "", "### Safe completion evidence", "", input.completionEvidence,
  ];
}

function buildIntakeIssue(rawInput) {
  const input = normalizeInput(rawInput);
  const metadata = buildMetadata(input);
  const metadataErrors = validateTaskMetadata(metadata);
  if (metadataErrors.length) throw new IntakeValidationError(metadataErrors);
  const commonSections = [
    "## Outcome", "", input.outcome,
    "", "## Acceptance criteria", "", markdownList(input.acceptanceCriteria),
  ];
  if (input.pickupTarget !== "chatgpt") {
    commonSections.push("", "## Relevant context", "", input.relevantContext || "No additional context provided.");
  }
  commonSections.push(
    "", "## Dependencies", "",
    input.dependencies.length ? input.dependencies.map((item) => `- ${item}`).join("\n") : "No declared dependencies.",
    "", "## Protected state", "",
    input.protectedState.length ? input.protectedState.map((item) => `- ${item}`).join("\n") : "No additional protected state declared.",
  );
  const body = [
    ...targetSections(input), "", ...commonSections,
    "", "```task-intake", JSON.stringify(metadata, null, 2), "```",
  ].join("\n");
  if (body.length > 60000) throw new IntakeValidationError(["generated issue body exceeds 60000 characters"]);
  return { title: input.title, body, metadata, labels: labelDefinitions(input) };
}

function inputFromEnvironment(env) {
  return {
    createdBy: env.INPUT_CREATED_BY,
    pickupTarget: env.INPUT_PICKUP_TARGET,
    category: env.INPUT_CATEGORY,
    title: env.INPUT_TITLE,
    outcome: env.INPUT_OUTCOME,
    acceptanceCriteria: env.INPUT_ACCEPTANCE_CRITERIA,
    relevantContext: env.INPUT_RELEVANT_CONTEXT,
    dependencies: env.INPUT_DEPENDENCIES,
    protectedState: env.INPUT_PROTECTED_STATE,
    risk: env.INPUT_RISK,
    executionMode: env.INPUT_EXECUTION_MODE,
    unresolvedQuestion: env.INPUT_UNRESOLVED_QUESTION,
    mechanicalRemainder: env.INPUT_MECHANICAL_REMAINDER,
    humanInputRequired: env.INPUT_HUMAN_INPUT_REQUIRED,
    humanAction: env.INPUT_HUMAN_ACTION,
    agentLimitation: env.INPUT_AGENT_LIMITATION,
    requiredArtifact: env.INPUT_REQUIRED_ARTIFACT,
    blockedWork: env.INPUT_BLOCKED_WORK,
    nextStep: env.INPUT_NEXT_STEP,
    completionEvidence: env.INPUT_COMPLETION_EVIDENCE,
    workClaimRequired: env.INPUT_WORK_CLAIM_REQUIRED,
    userMergeApprovalRequired: env.INPUT_USER_MERGE_APPROVAL_REQUIRED,
  };
}

function findExactDuplicate(issues, intake) {
  return (issues || []).find((issue) => (
    !issue.pull_request && issue.state === "open"
    && text(issue.title) === intake.title && text(issue.body) === intake.body
  )) || null;
}

async function ensureRoutingLabels(github, repository, labels) {
  const { owner, repo } = repository;
  for (const label of labels) {
    try {
      const response = await github.rest.issues.getLabel({ owner, repo, name: label.name });
      const current = response.data;
      if (String(current.color || "").toUpperCase() !== label.color.toUpperCase()
          || String(current.description || "") !== label.description) {
        await github.rest.issues.updateLabel({
          owner, repo, name: label.name, new_name: label.name,
          color: label.color, description: label.description,
        });
      }
    } catch (error) {
      if (error.status !== 404) throw error;
      await github.rest.issues.createLabel({ owner, repo, ...label });
    }
  }
}

module.exports = {
  ALLOWED_CATEGORIES,
  ALLOWED_CREATORS,
  ALLOWED_PICKUP_TARGETS,
  CANONICAL_BOOTSTRAP,
  IntakeValidationError,
  buildIntakeIssue,
  ensureRoutingLabels,
  findExactDuplicate,
  inputFromEnvironment,
  validateInterventionRecord,
  validateReassignmentRecord,
  validateTaskMetadata,
};
