#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const CLAIM_SCHEMA = "canto-span-work-claim-v1";
const CHANGE_SET_SCHEMA = "canto-span-change-set-v1";
const TARGET_TYPES = new Set([
  "file",
  "construction",
  "state_dimension",
  "survey",
  "corpus_packet",
  "schema",
  "workflow",
  "generated_output",
]);
const PATH_TARGET_TYPES = new Set(["file", "schema", "workflow", "generated_output"]);
const CLAIM_MODES = new Set(["shared", "exclusive"]);
const INTEGRATION_ROLES = new Set(["worker", "integrator"]);
const CLAIM_STATUSES = new Set(["active", "stale", "complete"]);
const OPERATION_TYPES = new Set([
  "json_record_merge",
  "json_pointer_set",
  "text_replace",
  "markdown_section_replace",
]);

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (isObject(value)) {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function deepEqual(left, right) {
  return stableStringify(left) === stableStringify(right);
}

function extractClaim(body) {
  const text = String(body || "");
  const fence = text.match(/```[^\n`]*coordination-claim[^\n`]*\n([\s\S]*?)```/i);
  if (!fence) throw new Error("missing fenced coordination-claim JSON block");
  try {
    return JSON.parse(fence[1]);
  } catch (error) {
    throw new Error(`invalid coordination-claim JSON: ${error.message}`);
  }
}

function normalizeRepoPath(value) {
  const normalized = String(value || "").replace(/\\/g, "/").replace(/^\.\//, "");
  if (!normalized || normalized.startsWith("/") || normalized.split("/").includes("..")) {
    throw new Error(`unsafe repository path: ${value}`);
  }
  return normalized;
}

function normalizeRegion(value) {
  const region = String(value || "whole-file").trim();
  return region || "whole-file";
}

function normalizeTarget(target) {
  if (!isObject(target)) throw new Error("target must be an object");
  const type = String(target.type || "");
  if (!TARGET_TYPES.has(type)) throw new Error(`unsupported target type: ${type}`);
  const region = normalizeRegion(target.region);
  if (PATH_TARGET_TYPES.has(type)) {
    const targetPath = normalizeRepoPath(target.path);
    return { type, category: "path", path: targetPath, region };
  }
  const id = String(target.id || "").trim();
  if (!id) throw new Error(`${type} target requires id`);
  return { type, category: type, id, region };
}

function validateClaim(claim, options = {}) {
  const errors = [];
  const now = options.now instanceof Date ? options.now : new Date(options.now || Date.now());
  if (!isObject(claim)) return ["claim must be an object"];
  if (claim.schema !== CLAIM_SCHEMA) errors.push(`schema must be ${CLAIM_SCHEMA}`);
  if (!/^CS-WORK-\d{4,}$/.test(String(claim.work_id || ""))) errors.push("work_id must match CS-WORK-####");
  if (!CLAIM_STATUSES.has(claim.status)) errors.push("status must be active, stale, or complete");
  if (!CLAIM_MODES.has(claim.claim_mode)) errors.push("claim_mode must be shared or exclusive");
  const role = claim.integration_role || "worker";
  if (!INTEGRATION_ROLES.has(role)) errors.push("integration_role must be worker or integrator");
  if (!/^agent\/[a-z0-9][a-z0-9._/-]*$/.test(String(claim.branch || ""))) errors.push("branch must use agent/<description>");
  const expiry = new Date(claim.expires_at);
  if (!claim.expires_at || Number.isNaN(expiry.getTime())) {
    errors.push("expires_at must be an ISO-8601 timestamp");
  } else if (options.requireUnexpired !== false && claim.status === "active" && expiry <= now) {
    errors.push("active claim is expired");
  }
  if (!Array.isArray(claim.targets) || claim.targets.length === 0) {
    errors.push("targets must contain at least one semantic target");
  } else {
    const seen = new Set();
    for (let index = 0; index < claim.targets.length; index += 1) {
      try {
        const normalized = normalizeTarget(claim.targets[index]);
        const key = stableStringify(normalized);
        if (seen.has(key)) errors.push(`duplicate target at index ${index}`);
        seen.add(key);
      } catch (error) {
        errors.push(`target ${index}: ${error.message}`);
      }
    }
  }
  for (const field of ["generated_outputs", "protected_state", "dependencies"]) {
    if (!Array.isArray(claim[field])) errors.push(`${field} must be an array`);
  }
  if (Array.isArray(claim.generated_outputs)) {
    for (const output of claim.generated_outputs) {
      try {
        normalizeRepoPath(output);
      } catch (error) {
        errors.push(`generated output: ${error.message}`);
      }
    }
  }
  if (typeof claim.summary !== "string" || !claim.summary.trim()) errors.push("summary must be a non-empty string");
  return errors;
}

function wildcardToRegExp(pattern) {
  let source = "^";
  for (let i = 0; i < pattern.length; i += 1) {
    const char = pattern[i];
    if (char === "*" && pattern[i + 1] === "*") {
      source += ".*";
      i += 1;
    } else if (char === "*") {
      source += "[^/]*";
    } else if (char === "?") {
      source += "[^/]";
    } else {
      source += char.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
    }
  }
  return new RegExp(`${source}$`);
}

function pathMatches(pattern, candidate) {
  const normalizedPattern = normalizeRepoPath(pattern);
  const normalizedCandidate = normalizeRepoPath(candidate);
  return wildcardToRegExp(normalizedPattern).test(normalizedCandidate);
}

function targetIdentity(target) {
  const normalized = normalizeTarget(target);
  if (normalized.category === "path") return `path:${normalized.path}`;
  return `${normalized.category}:${normalized.id}`;
}

function targetsOverlap(left, right) {
  const a = normalizeTarget(left);
  const b = normalizeTarget(right);
  if (a.category !== b.category) return false;
  if (a.category === "path") {
    const pathOverlap = pathMatches(a.path, b.path) || pathMatches(b.path, a.path);
    if (!pathOverlap) return false;
  } else if (a.id !== b.id) {
    return false;
  }
  return a.region === "whole-file" || b.region === "whole-file" || a.region === b.region;
}

function findClaimConflicts(leftClaim, rightClaim) {
  if (leftClaim.status !== "active" || rightClaim.status !== "active") return [];
  const conflicts = [];
  for (const left of leftClaim.targets || []) {
    for (const right of rightClaim.targets || []) {
      if (!targetsOverlap(left, right)) continue;
      conflicts.push({
        left: normalizeTarget(left),
        right: normalizeTarget(right),
        reason: leftClaim.claim_mode === "exclusive" || rightClaim.claim_mode === "exclusive"
          ? "exclusive target overlap"
          : "shared claims use the same semantic region",
      });
    }
  }
  return conflicts;
}

function targetCoversPath(target, filePath) {
  const normalized = normalizeTarget(target);
  if (normalized.category !== "path") return false;
  return pathMatches(normalized.path, filePath);
}

function configEntries(config, field) {
  const value = config[field];
  if (!Array.isArray(value)) throw new Error(`${field} must be an array`);
  return value.map((entry) => {
    if (typeof entry === "string") return { path: normalizeRepoPath(entry) };
    if (!isObject(entry)) throw new Error(`${field} entry must be a string or object`);
    return { ...entry, path: normalizeRepoPath(entry.path) };
  });
}

function matchingConfigEntry(config, field, filePath) {
  return configEntries(config, field).find((entry) => pathMatches(entry.path, filePath)) || null;
}

function claimCoversChangedFile(claim, filePath) {
  if ((claim.targets || []).some((target) => targetCoversPath(target, filePath))) return true;
  return (claim.generated_outputs || []).some((output) => pathMatches(output, filePath));
}

function validateChangedFiles(claim, changedFiles, config, options = {}) {
  const errors = [];
  const warnings = [];
  const isDraft = Boolean(options.isDraft);
  const role = claim.integration_role || "worker";
  for (const rawPath of changedFiles) {
    const filePath = normalizeRepoPath(rawPath);
    if (!claimCoversChangedFile(claim, filePath)) {
      errors.push(`${filePath} is not covered by the work claim`);
    }
    const exclusive = matchingConfigEntry(config, "exclusive_files", filePath);
    if (exclusive && claim.claim_mode !== "exclusive") {
      errors.push(`${filePath} requires an exclusive claim`);
    }
    const integrationOwned = matchingConfigEntry(config, "integration_owned_files", filePath);
    if (integrationOwned && role !== "integrator") {
      errors.push(`${filePath} is integration-owned and requires integration_role=integrator`);
    }
    if (filePath.startsWith("changes/pending/") && filePath !== "changes/pending/README.md") {
      if (isDraft) warnings.push(`${filePath} is a draft-only pending changeset`);
      else errors.push(`${filePath} must be applied and removed before the PR is ready`);
    }
  }
  return { errors, warnings };
}

function decodePointerToken(token) {
  return token.replace(/~1/g, "/").replace(/~0/g, "~");
}

function resolvePointer(document, pointer, createMissing = false) {
  if (pointer === "") return { parent: null, key: null, value: document };
  if (!String(pointer).startsWith("/")) throw new Error(`invalid JSON pointer: ${pointer}`);
  const parts = String(pointer).slice(1).split("/").map(decodePointerToken);
  let current = document;
  for (let index = 0; index < parts.length - 1; index += 1) {
    const key = parts[index];
    if (current[key] === undefined) {
      if (!createMissing) throw new Error(`JSON pointer does not exist: ${pointer}`);
      current[key] = {};
    }
    current = current[key];
    if (!isObject(current) && !Array.isArray(current)) throw new Error(`JSON pointer traverses scalar: ${pointer}`);
  }
  const key = parts[parts.length - 1];
  return { parent: current, key, value: current[key] };
}

function expectedSubsetMatches(record, expected) {
  if (!isObject(expected)) return deepEqual(record, expected);
  return Object.entries(expected).every(([key, value]) => deepEqual(record[key], value));
}

function validateChangeSet(changeSet, config = null) {
  const errors = [];
  if (!isObject(changeSet)) return ["changeset must be an object"];
  if (changeSet.schema !== CHANGE_SET_SCHEMA) errors.push(`schema must be ${CHANGE_SET_SCHEMA}`);
  if (!/^CS-WORK-\d{4,}$/.test(String(changeSet.work_id || ""))) errors.push("work_id must match CS-WORK-####");
  if (!Number.isInteger(changeSet.claim_issue) || changeSet.claim_issue <= 0) errors.push("claim_issue must be a positive integer");
  if (typeof changeSet.base_commit !== "string" || !/^[0-9a-f]{40}$/.test(changeSet.base_commit)) errors.push("base_commit must be a 40-character commit SHA");
  if (!Array.isArray(changeSet.operations) || changeSet.operations.length === 0) {
    errors.push("operations must contain at least one operation");
  } else {
    changeSet.operations.forEach((operation, index) => {
      if (!isObject(operation)) {
        errors.push(`operation ${index} must be an object`);
        return;
      }
      if (!OPERATION_TYPES.has(operation.type)) errors.push(`operation ${index} has unsupported type ${operation.type}`);
      try {
        normalizeRepoPath(operation.file);
      } catch (error) {
        errors.push(`operation ${index}: ${error.message}`);
      }
      if (operation.type === "json_record_merge") {
        if (!operation.array_pointer || !operation.key_field || operation.key_value === undefined) errors.push(`operation ${index} missing record selector`);
        if (!isObject(operation.expected) || !isObject(operation.changes)) errors.push(`operation ${index} requires expected and changes objects`);
      }
      if (operation.type === "json_pointer_set") {
        if (typeof operation.pointer !== "string" || !Object.prototype.hasOwnProperty.call(operation, "expected") || !Object.prototype.hasOwnProperty.call(operation, "value")) errors.push(`operation ${index} requires pointer, expected, and value`);
      }
      if (operation.type === "text_replace") {
        if (typeof operation.expected !== "string" || typeof operation.replacement !== "string") errors.push(`operation ${index} requires string expected and replacement`);
      }
      if (operation.type === "markdown_section_replace") {
        if (!/^#{1,6}\s+\S/.test(String(operation.heading || "")) || typeof operation.content !== "string") errors.push(`operation ${index} requires a Markdown heading and content`);
        if (operation.expected_sha256 && !/^[0-9a-f]{64}$/.test(operation.expected_sha256)) errors.push(`operation ${index} expected_sha256 is invalid`);
      }
    });
  }
  if (!Array.isArray(changeSet.regenerate)) errors.push("regenerate must be an array");
  if (config && Array.isArray(changeSet.regenerate)) {
    const allowed = new Set(Object.keys(config.regeneration_targets || {}));
    for (const target of changeSet.regenerate) if (!allowed.has(target)) errors.push(`unknown regeneration target: ${target}`);
  }
  return errors;
}

function sectionBounds(text, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(`^${escaped}\\s*$`, "m").exec(text);
  if (!match) throw new Error(`Markdown heading not found: ${heading}`);
  const level = heading.match(/^#+/)[0].length;
  const start = match.index;
  const afterHeading = match.index + match[0].length;
  const tail = text.slice(afterHeading);
  const nextPattern = new RegExp(`^#{1,${level}}\\s+`, "m");
  const next = nextPattern.exec(tail);
  const end = next ? afterHeading + next.index : text.length;
  return { start, end };
}

function applyChangeSet(changeSet, root, options = {}) {
  const config = options.config || null;
  const validationErrors = validateChangeSet(changeSet, config);
  if (validationErrors.length) throw new Error(validationErrors.join("; "));
  const files = new Map();
  const load = (relativePath) => {
    const safePath = normalizeRepoPath(relativePath);
    if (!files.has(safePath)) files.set(safePath, fs.readFileSync(path.join(root, safePath), "utf8"));
    return files.get(safePath);
  };
  const store = (relativePath, value) => files.set(normalizeRepoPath(relativePath), value);

  for (const operation of changeSet.operations) {
    const relativePath = normalizeRepoPath(operation.file);
    const currentText = load(relativePath);
    if (operation.type === "json_record_merge") {
      const document = JSON.parse(currentText);
      const resolved = resolvePointer(document, operation.array_pointer);
      if (!Array.isArray(resolved.value)) throw new Error(`${relativePath}${operation.array_pointer} is not an array`);
      const record = resolved.value.find((item) => isObject(item) && deepEqual(item[operation.key_field], operation.key_value));
      if (!record) throw new Error(`record not found in ${relativePath}: ${operation.key_field}=${operation.key_value}`);
      if (!expectedSubsetMatches(record, operation.expected)) throw new Error(`record precondition failed in ${relativePath}`);
      Object.assign(record, operation.changes);
      store(relativePath, `${JSON.stringify(document, null, 2)}\n`);
    } else if (operation.type === "json_pointer_set") {
      const document = JSON.parse(currentText);
      const resolved = resolvePointer(document, operation.pointer, false);
      if (!deepEqual(resolved.value, operation.expected)) throw new Error(`JSON pointer precondition failed in ${relativePath}${operation.pointer}`);
      if (resolved.parent === null) throw new Error("replacing the JSON root is not supported");
      resolved.parent[resolved.key] = operation.value;
      store(relativePath, `${JSON.stringify(document, null, 2)}\n`);
    } else if (operation.type === "text_replace") {
      const occurrences = currentText.split(operation.expected).length - 1;
      if (occurrences !== 1) throw new Error(`text precondition must match exactly once in ${relativePath}; found ${occurrences}`);
      store(relativePath, currentText.replace(operation.expected, operation.replacement));
    } else if (operation.type === "markdown_section_replace") {
      const bounds = sectionBounds(currentText, operation.heading);
      const currentSection = currentText.slice(bounds.start, bounds.end).trimEnd();
      if (operation.expected_sha256) {
        const digest = crypto.createHash("sha256").update(currentSection).digest("hex");
        if (digest !== operation.expected_sha256) throw new Error(`Markdown section precondition failed in ${relativePath}: ${operation.heading}`);
      }
      const replacement = `${operation.heading}\n\n${operation.content.trim()}\n\n`;
      store(relativePath, `${currentText.slice(0, bounds.start)}${replacement}${currentText.slice(bounds.end).replace(/^\n+/, "")}`);
    }
  }

  if (options.write) {
    for (const [relativePath, content] of files) fs.writeFileSync(path.join(root, relativePath), content);
  }
  return {
    work_id: changeSet.work_id,
    changed_files: [...files.keys()],
    regenerate: changeSet.regenerate,
    write: Boolean(options.write),
  };
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

module.exports = {
  CHANGE_SET_SCHEMA,
  CLAIM_SCHEMA,
  applyChangeSet,
  claimCoversChangedFile,
  deepEqual,
  extractClaim,
  findClaimConflicts,
  loadJson,
  matchingConfigEntry,
  normalizeRepoPath,
  normalizeTarget,
  pathMatches,
  stableStringify,
  targetCoversPath,
  targetIdentity,
  targetsOverlap,
  validateChangeSet,
  validateChangedFiles,
  validateClaim,
};
