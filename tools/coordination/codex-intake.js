#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const TASK_SCHEMA_PATH = path.resolve(__dirname, "../../schemas/codex-task.schema.json");
const TASK_SCHEMA = JSON.parse(fs.readFileSync(TASK_SCHEMA_PATH, "utf8"));
const TASK_PROPERTIES = TASK_SCHEMA.properties;
const ALLOWED_CATEGORIES = new Set(TASK_PROPERTIES.category.enum);
const ALLOWED_RISKS = new Set(TASK_PROPERTIES.risk.enum);
const ALLOWED_EXECUTION_MODES = new Set(TASK_PROPERTIES.execution_mode.enum);

const CANONICAL_BOOTSTRAP = [
  "Read `AGENTS.md`, `docs/current/00-START-HERE.md`, and",
  "`docs/current/CODEX-ISSUE-WORKFLOW.md` in full. Before creating a claim, branch,",
  "or edit, self-screen this task against the ChatGPT-first and Codex eligibility",
  "rules. If it is misrouted or requires an unresolved decision, report",
  "`needs-chatgpt` and stop without changing the repository. Otherwise inspect",
  "current `main`, open pull requests, intake issues, and work claims; create the",
  "required semantic work claim and exact branch; complete the bounded outcome;",
  "run every applicable check; open one coherent pull request; notify the user when",
  "it is ready; and stop without merging.",
].join(" ");

const PROHIBITED_DIRECTIVES = [
  {
    name: "direct write to main",
    pattern: /\b(?:write|commit|push|apply|land)\b.{0,50}\b(?:to|into|on)\s+(?:the\s+)?main\b/i,
  },
  {
    name: "merge or auto-merge authorization",
    pattern: /\b(?:merge(?:\s+the)?\s+(?:pull request|pr|changes?)|enable\s+auto-?merge|auto-?merge)\b/i,
  },
  {
    name: "release publication",
    pattern: /\b(?:publish|cut|ship)\b.{0,40}\b(?:a\s+|the\s+)?release\b/i,
  },
  {
    name: "survey deployment",
    pattern: /\b(?:deploy|launch|publish)\b.{0,40}\b(?:survey|instrument)\b/i,
  },
  {
    name: "construction status decision",
    pattern: /\b(?:promote|downgrade|park|unpark)\b/i,
  },
  {
    name: "governance decision",
    pattern: /\b(?:(?:decide|change|set|define|rewrite|override)\b.{0,60}\b(?:governance|project policy|repository policy)|(?:make|take)\b.{0,30}\bgovernance decision)\b/i,
  },
  {
    name: "invented linguistic evidence",
    pattern: /\b(?:invent|fabricate|manufacture|assume)\b.{0,50}\b(?:linguistic\s+)?evidence\b/i,
  },
];

const LABEL_STYLES = {
  "codex-ready": {
    color: "1D76DB",
    description: "Bounded task eligible for Codex self-screening",
  },
  category: {
    color: "5319E7",
    description: "Codex intake task category",
  },
  "risk:low": {
    color: "0E8A16",
    description: "Low-risk Codex intake",
  },
  "risk:medium": {
    color: "FBCA04",
    description: "Medium-risk Codex intake",
  },
  "risk:high": {
    color: "D93F0B",
    description: "High-risk Codex intake",
  },
  "findings-only": {
    color: "C5DEF5",
    description: "Task produces findings without repairs",
  },
};

class IntakeValidationError extends Error {
  constructor(errors) {
    super(`invalid Codex intake:\n- ${errors.join("\n- ")}`);
    this.name = "IntakeValidationError";
    this.errors = errors;
  }
}

function text(value) {
  return String(value == null ? "" : value).trim();
}

function validateTextField(name, value, options = {}) {
  const errors = [];
  const normalized = text(value);
  if (options.required && !normalized) errors.push(`${name} is required`);
  if (normalized.length > (options.maxLength || 12000)) {
    errors.push(`${name} exceeds ${options.maxLength || 12000} characters`);
  }
  if (options.singleLine && /[\r\n]/.test(normalized)) {
    errors.push(`${name} must be one line`);
  }
  if (/```/.test(normalized)) {
    errors.push(`${name} must not contain a Markdown code fence`);
  }
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
  const clauses = values
    .map(text)
    .join("\n")
    .split(/\r?\n|[.;!?]+|,\s*|\b(?:but|however|then)\b/i)
    .map((clause) => clause.trim())
    .filter(Boolean);
  for (const clause of clauses) {
    for (const rule of PROHIBITED_DIRECTIVES) {
      const flags = rule.pattern.flags.includes("g") ? rule.pattern.flags : `${rule.pattern.flags}g`;
      const pattern = new RegExp(rule.pattern.source, flags);
      let match = pattern.exec(clause);
      while (match) {
        if (!directiveIsGuarded(clause, match)) {
          hits.push(`${rule.name}: ${clause}`);
        }
        match = pattern.exec(clause);
      }
    }
  }
  return hits;
}

function parseList(value) {
  const items = text(value)
    .split(/\r?\n|,/)
    .map((item) => item.trim().replace(/^[-*]\s+/, ""))
    .filter(Boolean);
  return [...new Set(items)];
}

function normalizeInput(input) {
  const normalized = {
    category: text(input.category),
    title: text(input.title),
    outcome: text(input.outcome),
    acceptanceCriteria: text(input.acceptanceCriteria),
    relevantContext: text(input.relevantContext),
    protectedStateText: text(input.protectedState),
    risk: text(input.risk || "medium"),
    executionMode: text(input.executionMode || "implementation"),
  };
  const errors = [
    ...validateTextField("title", normalized.title, { required: true, singleLine: true, maxLength: 256 }),
    ...validateTextField("outcome", normalized.outcome, { required: true, maxLength: 8000 }),
    ...validateTextField("acceptance criteria", normalized.acceptanceCriteria, { required: true, maxLength: 12000 }),
    ...validateTextField("relevant context", normalized.relevantContext, { maxLength: 12000 }),
    ...validateTextField("protected state", normalized.protectedStateText, { maxLength: 8000 }),
  ];
  if (!ALLOWED_CATEGORIES.has(normalized.category)) {
    errors.push(`category must be one of: ${[...ALLOWED_CATEGORIES].join(", ")}`);
  }
  if (!ALLOWED_RISKS.has(normalized.risk)) {
    errors.push(`risk must be one of: ${[...ALLOWED_RISKS].join(", ")}`);
  }
  if (!ALLOWED_EXECUTION_MODES.has(normalized.executionMode)) {
    errors.push(`execution mode must be one of: ${[...ALLOWED_EXECUTION_MODES].join(", ")}`);
  }
  for (const hit of findProhibitedDirectives([
    normalized.title,
    normalized.outcome,
    normalized.acceptanceCriteria,
    normalized.relevantContext,
    normalized.protectedStateText,
  ])) {
    errors.push(`prohibited authorization (${hit})`);
  }
  if (errors.length) throw new IntakeValidationError(errors);
  normalized.protectedState = parseList(normalized.protectedStateText);
  return normalized;
}

function buildMetadata(input) {
  return {
    schema: TASK_PROPERTIES.schema.const,
    category: input.category,
    risk: input.risk,
    execution_mode: input.executionMode,
    dependencies: [],
    protected_state: input.protectedState,
    dispatch_status: TASK_PROPERTIES.dispatch_status.const,
    chatgpt_routing_complete: true,
    codex_self_screen_required: true,
    work_claim_required: true,
    user_merge_approval_required: true,
  };
}

function validateTaskMetadata(metadata) {
  const errors = [];
  const expectedKeys = Object.keys(TASK_PROPERTIES).sort();
  const actualKeys = metadata && typeof metadata === "object" && !Array.isArray(metadata)
    ? Object.keys(metadata).sort()
    : [];
  if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) {
    errors.push("metadata keys do not match the checked-in schema");
  }
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return errors;
  for (const [name, property] of Object.entries(TASK_PROPERTIES)) {
    const value = metadata[name];
    if (Object.hasOwn(property, "const") && value !== property.const) {
      errors.push(`${name} must equal ${JSON.stringify(property.const)}`);
    }
    if (property.enum && !property.enum.includes(value)) {
      errors.push(`${name} must be one of: ${property.enum.join(", ")}`);
    }
  }
  for (const name of ["dependencies", "protected_state"]) {
    const value = metadata[name];
    if (!Array.isArray(value)) {
      errors.push(`${name} must be an array`);
    } else if (new Set(value.map((item) => JSON.stringify(item))).size !== value.length) {
      errors.push(`${name} must contain unique items`);
    }
  }
  if (Array.isArray(metadata.protected_state)) {
    if (metadata.protected_state.some((item) => typeof item !== "string" || !item.trim())) {
      errors.push("protected_state items must be non-empty strings");
    }
  }
  if (Array.isArray(metadata.dependencies)) {
    if (metadata.dependencies.some((item) => !((Number.isInteger(item) && item >= 1) || (typeof item === "string" && item.trim())))) {
      errors.push("dependencies items must be positive integers or non-empty strings");
    }
  }
  return errors;
}

function markdownList(value) {
  return text(value)
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^[-*]\s+/, ""))
    .filter(Boolean)
    .map((line) => `- ${line}`)
    .join("\n");
}

function labelDefinitions(input) {
  const names = ["codex-ready", `codex:${input.category}`, `risk:${input.risk}`];
  if (input.executionMode === "findings-only") names.push("findings-only");
  return names.map((name) => ({
    name,
    ...(name.startsWith("codex:") ? LABEL_STYLES.category : LABEL_STYLES[name]),
  }));
}

function buildIntakeIssue(rawInput) {
  const input = normalizeInput(rawInput);
  const metadata = buildMetadata(input);
  const metadataErrors = validateTaskMetadata(metadata);
  if (metadataErrors.length) throw new IntakeValidationError(metadataErrors);
  const acceptance = markdownList(input.acceptanceCriteria);
  const context = input.relevantContext || "No additional context provided.";
  const protectedState = input.protectedState.length
    ? input.protectedState.map((item) => `- ${item}`).join("\n")
    : "No additional protected state declared.";
  const body = [
    CANONICAL_BOOTSTRAP,
    "",
    "## Outcome",
    "",
    input.outcome,
    "",
    "## Acceptance criteria",
    "",
    acceptance,
    "",
    "## Relevant context",
    "",
    context,
    "",
    "## Protected state",
    "",
    protectedState,
    "",
    "```codex-task",
    JSON.stringify(metadata, null, 2),
    "```",
  ].join("\n");
  if (body.length > 60000) throw new IntakeValidationError(["generated issue body exceeds 60000 characters"]);
  return {
    title: input.title,
    body,
    metadata,
    labels: labelDefinitions(input),
  };
}

function inputFromEnvironment(env) {
  return {
    category: env.INPUT_CATEGORY,
    title: env.INPUT_TITLE,
    outcome: env.INPUT_OUTCOME,
    acceptanceCriteria: env.INPUT_ACCEPTANCE_CRITERIA,
    relevantContext: env.INPUT_RELEVANT_CONTEXT,
    protectedState: env.INPUT_PROTECTED_STATE,
    risk: env.INPUT_RISK,
    executionMode: env.INPUT_EXECUTION_MODE,
  };
}

function findExactDuplicate(issues, intake) {
  return (issues || []).find((issue) => (
    !issue.pull_request
    && issue.state === "open"
    && text(issue.title) === intake.title
    && text(issue.body) === intake.body
  )) || null;
}

async function ensureRoutingLabels(github, repository, labels) {
  const { owner, repo } = repository;
  for (const label of labels) {
    try {
      const response = await github.rest.issues.getLabel({ owner, repo, name: label.name });
      const current = response.data;
      if (
        String(current.color || "").toUpperCase() !== label.color.toUpperCase()
        || String(current.description || "") !== label.description
      ) {
        await github.rest.issues.updateLabel({
          owner,
          repo,
          name: label.name,
          new_name: label.name,
          color: label.color,
          description: label.description,
        });
      }
    } catch (error) {
      if (error.status !== 404) throw error;
      await github.rest.issues.createLabel({
        owner,
        repo,
        name: label.name,
        color: label.color,
        description: label.description,
      });
    }
  }
}

module.exports = {
  ALLOWED_CATEGORIES,
  CANONICAL_BOOTSTRAP,
  IntakeValidationError,
  buildIntakeIssue,
  ensureRoutingLabels,
  findExactDuplicate,
  inputFromEnvironment,
  validateTaskMetadata,
};
