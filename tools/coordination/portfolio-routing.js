"use strict";

const PORTFOLIO_SCHEMA = "canto-span-portfolio-routing-v2";
const REQUIRED_FIELDS = [
  "schema",
  "track",
  "kind",
  "research_mode",
  "priority",
  "priority_reason",
  "decision_question",
  "dependencies",
  "informs",
  "read_scope",
  "write_locks",
  "prohibited_parallel_writes",
  "acceptable_null_outcome",
  "completion_endpoint",
];
const ALLOWED_FIELDS = new Set(REQUIRED_FIELDS);
const WORKERS = new Set(["chatgpt", "codex", "human"]);

function extractFencedBlocks(body, label) {
  const pattern = new RegExp(`\\\`\\\`\\\`${label}[^\\n\\\`]*\\n([\\s\\S]*?)\\\`\\\`\\\``, "gi");
  return [...String(body || "").matchAll(pattern)];
}

function intakeRoutingCounts(body) {
  return {
    taskIntake: extractFencedBlocks(body, "task-intake").length,
    portfolioRouting: extractFencedBlocks(body, "portfolio-routing").length,
  };
}

function extractPortfolioRouting(body) {
  const matches = extractFencedBlocks(body, "portfolio-routing");
  if (matches.length !== 1) {
    throw new Error("expected exactly one fenced portfolio-routing JSON block");
  }
  try {
    return JSON.parse(matches[0][1]);
  } catch (error) {
    throw new Error(`invalid portfolio-routing JSON: ${error.message}`);
  }
}

function isNonEmptyString(value) {
  return typeof value === "string" && Boolean(value.trim());
}

function validateReferenceArray(name, value) {
  const errors = [];
  if (!Array.isArray(value)) return [`${name} must be an array`];
  const serialized = value.map((item) => JSON.stringify(item));
  if (new Set(serialized).size !== serialized.length) errors.push(`${name} must contain unique items`);
  for (const item of value) {
    const valid = (Number.isInteger(item) && item > 0) || isNonEmptyString(item);
    if (!valid) errors.push(`${name} items must be positive integers or non-empty strings`);
  }
  return errors;
}

function validateStringArray(name, value) {
  const errors = [];
  if (!Array.isArray(value)) return [`${name} must be an array`];
  if (new Set(value).size !== value.length) errors.push(`${name} must contain unique items`);
  if (value.some((item) => !isNonEmptyString(item))) {
    errors.push(`${name} items must be non-empty strings`);
  }
  return errors;
}

function validatePortfolioRouting(routing) {
  const errors = [];
  if (!routing || typeof routing !== "object" || Array.isArray(routing)) {
    return ["portfolio routing must be an object"];
  }

  const keys = Object.keys(routing);
  for (const field of REQUIRED_FIELDS) {
    if (!Object.hasOwn(routing, field)) errors.push(`${field} is required`);
  }
  for (const field of keys) {
    if (!ALLOWED_FIELDS.has(field)) errors.push(`unsupported portfolio-routing field: ${field}`);
  }

  if (routing.schema !== PORTFOLIO_SCHEMA) errors.push(`schema must equal ${PORTFOLIO_SCHEMA}`);
  if (!isNonEmptyString(routing.track) || !/^T[1-8]-[a-z0-9][a-z0-9-]*$/.test(routing.track)) {
    errors.push("track must match T1- through T8- plus a lowercase hyphenated name");
  }
  if (!isNonEmptyString(routing.kind) || !/^[a-z][a-z0-9-]*$/.test(routing.kind)) {
    errors.push("kind must be a lowercase identifier");
  }
  if (!(routing.research_mode === null
      || (isNonEmptyString(routing.research_mode) && /^[a-z][a-z0-9-]*$/.test(routing.research_mode)))) {
    errors.push("research_mode must be null or a lowercase identifier");
  }
  if (!new Set(["P0", "P1", "P2", "P3"]).has(routing.priority)) {
    errors.push("priority must be P0, P1, P2, or P3");
  }
  for (const field of ["priority_reason", "acceptable_null_outcome", "completion_endpoint"]) {
    if (!isNonEmptyString(routing[field])) errors.push(`${field} must be a non-empty string`);
  }
  if (!(routing.decision_question === null || isNonEmptyString(routing.decision_question))) {
    errors.push("decision_question must be null or a non-empty string");
  }

  errors.push(...validateReferenceArray("dependencies", routing.dependencies));
  errors.push(...validateReferenceArray("informs", routing.informs));
  errors.push(...validateStringArray("read_scope", routing.read_scope));
  errors.push(...validateStringArray("write_locks", routing.write_locks));
  errors.push(...validateStringArray("prohibited_parallel_writes", routing.prohibited_parallel_writes));
  return errors;
}

function validatePortfolioOwnershipBinding(claim, claimIssue, routing, intakeIssue, pr, prOwnership) {
  const errors = validatePortfolioRouting(routing).map((error) => `portfolio: ${error}`);
  if (claim.schema !== "canto-span-work-claim-v2") {
    errors.push("portfolio routing requires a v2 work claim");
    return errors;
  }
  if (claim.intake_issue !== intakeIssue) {
    errors.push(`claim intake_issue ${claim.intake_issue} does not match PR intake issue ${intakeIssue}`);
  }
  if (!WORKERS.has(claim.active_worker)) errors.push("claim active_worker is unsupported");
  if (!Number.isInteger(claim.ownership_revision) || claim.ownership_revision < 1) {
    errors.push("claim ownership_revision must be a positive integer");
  }
  if (claim.branch !== pr.head.ref) {
    errors.push(`claim branch ${claim.branch} does not match PR head ${pr.head.ref}`);
  }
  if (prOwnership.activeWorker !== claim.active_worker) {
    errors.push(`PR worker ${prOwnership.activeWorker} does not match claim worker ${claim.active_worker}`);
  }
  if (prOwnership.ownershipRevision !== claim.ownership_revision) {
    errors.push(
      `PR ownership revision ${prOwnership.ownershipRevision} does not match claim revision ${claim.ownership_revision}`,
    );
  }

  const claimLocks = new Set(Array.isArray(claim.write_locks) ? claim.write_locks : []);
  for (const lock of routing.write_locks || []) {
    if (!claimLocks.has(lock)) errors.push(`claim does not preserve portfolio write lock ${lock}`);
  }
  for (const prohibited of routing.prohibited_parallel_writes || []) {
    if (claimLocks.has(prohibited)) errors.push(`claim acquires prohibited parallel write ${prohibited}`);
  }
  if (claimIssue == null || claimIssue < 1) errors.push("claim issue number is invalid");
  return errors;
}

module.exports = {
  PORTFOLIO_SCHEMA,
  extractPortfolioRouting,
  intakeRoutingCounts,
  validatePortfolioOwnershipBinding,
  validatePortfolioRouting,
};
