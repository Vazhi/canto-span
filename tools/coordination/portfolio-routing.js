"use strict";

const PORTFOLIO_SCHEMA = "canto-span-portfolio-routing-v2";
const TRACKS = new Set([
  "T1-closure",
  "T2-identity",
  "T3-survey",
  "T4-corpus",
  "T5-evidence",
  "T6-runtime",
  "T7-ingress",
  "T8-release",
]);
const KINDS = new Set([
  "decision",
  "research",
  "identity-batch",
  "corpus-review",
  "survey-audit",
  "implementation",
  "source-ingress",
  "human-action",
  "release",
  "coordination",
]);
const RESEARCH_MODES = new Set(["decision-support", "decision-discovery"]);
const PRIORITIES = new Set(["P0", "P1", "P2", "P3"]);
const KIND_RESEARCH_MODES = Object.freeze({
  decision: new Set(["decision-support"]),
  research: new Set(["decision-support", "decision-discovery"]),
  "identity-batch": new Set(["decision-support"]),
  "corpus-review": new Set(["decision-support", "decision-discovery"]),
  "survey-audit": new Set(["decision-support"]),
  implementation: new Set([null]),
  "source-ingress": new Set([null]),
  "human-action": new Set([null]),
  release: new Set([null]),
  coordination: new Set([null]),
});
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
const OPTIONAL_FIELDS = [
  "discovery_scope",
  "discovery_prompts",
  "readiness_gaps",
  "cancellation_condition",
];
const ALLOWED_FIELDS = new Set([...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]);

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractFencedBlocks(body, label) {
  const exactLabel = escapeRegExp(label);
  const pattern = new RegExp(
    `^\\x60\\x60\\x60${exactLabel}[ \\t]*\\r?\\n([\\s\\S]*?)^\\x60\\x60\\x60[ \\t]*$`,
    "gmi",
  );
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

function validateStringArray(name, value, { required = true, nonEmpty = false } = {}) {
  const errors = [];
  if (value == null && !required) return errors;
  if (!Array.isArray(value)) return [`${name} must be an array`];
  if (nonEmpty && value.length === 0) errors.push(`${name} must contain at least one item`);
  if (new Set(value).size !== value.length) errors.push(`${name} must contain unique items`);
  if (value.some((item) => !isNonEmptyString(item))) {
    errors.push(`${name} items must be non-empty strings`);
  }
  return errors;
}

function lockParts(lock) {
  return String(lock || "").trim().split(/[:/]/u).filter(Boolean);
}

function isUniversalLock(parts) {
  return (parts.length === 1 && parts[0] === "*")
    || (parts.length === 2 && parts[0] === "*" && parts[1] === "global");
}

function locksOverlap(left, right) {
  const a = lockParts(left);
  const b = lockParts(right);
  if (!a.length || !b.length) return false;
  if (isUniversalLock(a) || isUniversalLock(b)) return true;

  const length = Math.min(a.length, b.length);
  for (let index = 0; index < length; index += 1) {
    const leftPart = a[index];
    const rightPart = b[index];
    if (leftPart === rightPart) {
      if (leftPart === "global") return true;
      continue;
    }
    if (leftPart === "global" || rightPart === "global") {
      return index > 0;
    }
    if (leftPart === "*" || rightPart === "*") continue;
    return false;
  }
  return true;
}

function modeLabel(mode) {
  return mode === null ? "null" : mode;
}

function validateKindResearchMode(kind, mode) {
  if (!KINDS.has(kind)) return [];
  const allowed = KIND_RESEARCH_MODES[kind];
  if (allowed && allowed.has(mode)) return [];
  return [
    `kind=${kind} requires research_mode to be one of: ${[...allowed].map(modeLabel).join(", ")}`,
  ];
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
  if (!TRACKS.has(routing.track)) errors.push(`track must be one of: ${[...TRACKS].join(", ")}`);
  if (!KINDS.has(routing.kind)) errors.push(`kind must be one of: ${[...KINDS].join(", ")}`);
  if (!(routing.research_mode === null || RESEARCH_MODES.has(routing.research_mode))) {
    errors.push("research_mode must be null, decision-support, or decision-discovery");
  }
  if (!PRIORITIES.has(routing.priority)) errors.push("priority must be P0, P1, P2, or P3");
  errors.push(...validateKindResearchMode(routing.kind, routing.research_mode));

  for (const field of ["priority_reason", "acceptable_null_outcome", "completion_endpoint"]) {
    if (!isNonEmptyString(routing[field])) errors.push(`${field} must be a non-empty string`);
  }
  if (!(routing.decision_question === null || isNonEmptyString(routing.decision_question))) {
    errors.push("decision_question must be null or a non-empty string");
  }
  if (Object.hasOwn(routing, "discovery_scope")
      && !(routing.discovery_scope === null || isNonEmptyString(routing.discovery_scope))) {
    errors.push("discovery_scope must be null or a non-empty string");
  }
  if (Object.hasOwn(routing, "cancellation_condition")
      && !(routing.cancellation_condition === null || isNonEmptyString(routing.cancellation_condition))) {
    errors.push("cancellation_condition must be null or a non-empty string");
  }

  errors.push(...validateReferenceArray("dependencies", routing.dependencies));
  errors.push(...validateReferenceArray("informs", routing.informs));
  errors.push(...validateStringArray("read_scope", routing.read_scope));
  errors.push(...validateStringArray("write_locks", routing.write_locks));
  errors.push(...validateStringArray("prohibited_parallel_writes", routing.prohibited_parallel_writes));
  errors.push(...validateStringArray("discovery_prompts", routing.discovery_prompts, { required: false }));
  errors.push(...validateStringArray("readiness_gaps", routing.readiness_gaps, { required: false }));

  if (routing.research_mode === "decision-support") {
    if (!isNonEmptyString(routing.decision_question)) {
      errors.push("decision-support requires a non-empty decision_question");
    }
    if (routing.discovery_scope != null) {
      errors.push("decision-support must not declare discovery_scope");
    }
    if (Array.isArray(routing.discovery_prompts) && routing.discovery_prompts.length) {
      errors.push("decision-support must not declare discovery_prompts");
    }
  } else if (routing.research_mode === "decision-discovery") {
    if (routing.decision_question !== null) {
      errors.push("decision-discovery requires decision_question=null");
    }
    if (!isNonEmptyString(routing.discovery_scope)) {
      errors.push("decision-discovery requires a non-empty discovery_scope");
    }
    errors.push(...validateStringArray("discovery_prompts", routing.discovery_prompts, {
      required: true,
      nonEmpty: true,
    }));
  } else {
    if (routing.decision_question !== null) {
      errors.push("research_mode=null requires decision_question=null");
    }
    if (routing.discovery_scope != null) {
      errors.push("research_mode=null must not declare discovery_scope");
    }
    if (Array.isArray(routing.discovery_prompts) && routing.discovery_prompts.length) {
      errors.push("research_mode=null must not declare discovery_prompts");
    }
  }

  if (Array.isArray(routing.write_locks) && Array.isArray(routing.prohibited_parallel_writes)) {
    for (const lock of routing.write_locks) {
      for (const prohibited of routing.prohibited_parallel_writes) {
        if (locksOverlap(lock, prohibited)) {
          errors.push(`write lock ${lock} overlaps prohibited parallel write ${prohibited}`);
        }
      }
    }
  }
  return errors;
}

function validatePortfolioOwnershipBinding() {
  return [
    "portfolio-routing is planning metadata only and cannot authorize ownership; active execution requires exactly one valid task-intake-v2 ownership block",
  ];
}

module.exports = {
  KIND_RESEARCH_MODES,
  KINDS,
  PORTFOLIO_SCHEMA,
  PRIORITIES,
  RESEARCH_MODES,
  TRACKS,
  extractFencedBlocks,
  extractPortfolioRouting,
  intakeRoutingCounts,
  locksOverlap,
  validateKindResearchMode,
  validatePortfolioOwnershipBinding,
  validatePortfolioRouting,
};
