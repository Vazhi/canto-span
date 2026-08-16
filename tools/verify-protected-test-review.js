#!/usr/bin/env node
"use strict";

const { validateRegistry } = require("./verify-protected-tests");

const REGISTRY_PATH = "config/protected-tests.json";
const REVIEW_SCHEMA = "canto-span-protected-test-review-v1";
const OVERRIDE_SCHEMA = "canto-span-protected-test-override-v1";
const PR_COMMIT_API_LIMIT = 250;
const PR_FILE_API_LIMIT = 3000;
const CONTROL_PLANE_PATHS = Object.freeze([
  REGISTRY_PATH,
  "config/verification-profiles.json",
  "schemas/protected-test-registry.schema.json",
  "tools/verify-protected-tests.js",
  "tools/verify-protected-test-review.js",
  "tests/tooling/verification/protected-tests.test.js",
  ".github/workflows/protected-test-review.yml",
  ".github/workflows/full-diagnostic-verification.yml",
]);

function stableEntry(entry) {
  return JSON.stringify(entry, Object.keys(entry || {}).sort());
}

function entryMap(registry) {
  return new Map((registry.tests || []).map((entry) => [entry.path, entry]));
}

function protectedPathUnion(baseRegistry, headRegistry) {
  return new Set([
    ...entryMap(baseRegistry).keys(),
    ...entryMap(headRegistry).keys(),
  ]);
}

function registryEntryDeltaPaths(baseRegistry, headRegistry) {
  const base = entryMap(baseRegistry);
  const head = entryMap(headRegistry);
  const changed = new Set();
  for (const path of new Set([...base.keys(), ...head.keys()])) {
    if (!base.has(path) || !head.has(path) || stableEntry(base.get(path)) !== stableEntry(head.get(path))) changed.add(path);
  }
  return changed;
}

function namesForFile(file) {
  return [file && file.filename, file && file.previous_filename].filter(Boolean);
}

function changedCandidates(files, candidates) {
  const changed = new Set();
  for (const file of files || []) {
    for (const name of namesForFile(file)) {
      if (candidates.has(name)) changed.add(name);
    }
  }
  return changed;
}

function validateReviewApiCompleteness({ commitCount, changedFileCount }) {
  const failures = [];
  if (!Number.isInteger(commitCount) || commitCount < 0) {
    failures.push({ code: "pr_commit_count_invalid", actual: commitCount ?? null });
  } else if (commitCount > PR_COMMIT_API_LIMIT) {
    failures.push({
      code: "pr_commit_api_limit_exceeded",
      actual: commitCount,
      limit: PR_COMMIT_API_LIMIT,
    });
  }
  if (!Number.isInteger(changedFileCount) || changedFileCount < 0) {
    failures.push({ code: "pr_changed_file_count_invalid", actual: changedFileCount ?? null });
  } else if (changedFileCount > PR_FILE_API_LIMIT) {
    failures.push({
      code: "pr_file_api_limit_exceeded",
      actual: changedFileCount,
      limit: PR_FILE_API_LIMIT,
    });
  }
  return failures;
}

function analyzeProtectedChanges({ baseRegistry, headRegistry, files }) {
  const baseFailures = validateRegistry(baseRegistry);
  const headFailures = validateRegistry(headRegistry);
  if (baseFailures.length || headFailures.length) {
    return {
      status: "FAIL",
      failures: [
        ...baseFailures.map((failure) => ({ side: "base", ...failure })),
        ...headFailures.map((failure) => ({ side: "head", ...failure })),
      ],
      required_paths: [],
      affected_protected_paths: [],
      registry_changed: false,
    };
  }

  const fileList = files || [];
  const protectedUnion = protectedPathUnion(baseRegistry, headRegistry);
  const changedProtected = changedCandidates(fileList, protectedUnion);
  const entryDeltas = registryEntryDeltaPaths(baseRegistry, headRegistry);
  const affectedProtected = new Set([...changedProtected, ...entryDeltas]);
  const changedControlPlane = changedCandidates(fileList, new Set(CONTROL_PLANE_PATHS));
  const registryChanged = fileList.some((file) => namesForFile(file).includes(REGISTRY_PATH));
  const required = new Set([...affectedProtected, ...changedControlPlane]);
  if (registryChanged) required.add(REGISTRY_PATH);

  return {
    status: "PASS",
    failures: [],
    required_paths: [...required].sort(),
    affected_protected_paths: [...affectedProtected].sort(),
    registry_changed: registryChanged,
  };
}

function latestRelevantCommitIndex(commits, requiredPaths) {
  const required = new Set(requiredPaths || []);
  let latest = -1;
  for (let index = 0; index < (commits || []).length; index += 1) {
    const files = commits[index].files || [];
    if (files.some((file) => namesForFile(file).some((name) => required.has(name)))) latest = index;
  }
  return latest;
}

function extractFencedJson(body, fenceName) {
  const text = String(body || "");
  const escaped = fenceName.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const regex = new RegExp("```" + escaped + "\\s*([\\s\\S]*?)```", "gu");
  const records = [];
  for (const match of text.matchAll(regex)) {
    try {
      records.push(JSON.parse(match[1].trim()));
    } catch (error) {
      records.push({ __parse_error: error.message });
    }
  }
  return records;
}

function validateReviewRecord(record) {
  const failures = [];
  if (!record || typeof record !== "object" || Array.isArray(record) || record.__parse_error) return ["review_record_invalid_json"];
  if (record.schema !== REVIEW_SCHEMA) failures.push("review_schema_invalid");
  if (record.decision !== "approve") failures.push("review_decision_not_approve");
  if (!["doctrine_review", "user_override"].includes(record.basis)) failures.push("review_basis_invalid");
  if (!Array.isArray(record.paths) || !record.paths.length || record.paths.some((item) => typeof item !== "string" || !item)) failures.push("review_paths_invalid");
  if (Array.isArray(record.paths) && new Set(record.paths).size !== record.paths.length) failures.push("review_paths_duplicate");
  if (typeof record.registry_changed !== "boolean") failures.push("review_registry_flag_invalid");
  if (typeof record.reason !== "string" || !record.reason.trim()) failures.push("review_reason_missing");
  if (record.basis === "user_override" && (!Number.isInteger(record.authorization_issue) || record.authorization_issue <= 0)) failures.push("user_override_issue_missing");
  return failures;
}

function setEquals(left, right) {
  const a = new Set(left || []);
  const b = new Set(right || []);
  return a.size === b.size && [...a].every((item) => b.has(item));
}

function evaluateReviewGate({ requiredPaths, registryChanged, commits, reviews }) {
  if (!(requiredPaths || []).length) {
    return { status: "PASS", code: "NO_PROTECTED_CHANGE", latest_change_index: -1, review: null };
  }
  const commitShas = (commits || []).map((commit) => commit.sha);
  const latest = latestRelevantCommitIndex(commits, requiredPaths);
  if (latest < 0) {
    return { status: "FAIL", code: "PROTECTED_CHANGE_COMMIT_NOT_FOUND", latest_change_index: -1, review: null };
  }

  const candidates = [];
  for (const review of reviews || []) {
    const reviewState = String(review.state || "").toUpperCase();
    if (!["COMMENTED", "APPROVED"].includes(reviewState)) continue;
    const reviewIndex = commitShas.indexOf(review.commit_id);
    if (reviewIndex < latest) continue;
    for (const record of extractFencedJson(review.body, "protected-test-review")) {
      const failures = validateReviewRecord(record);
      if (failures.length) continue;
      if (!setEquals(record.paths, requiredPaths)) continue;
      if (record.registry_changed !== registryChanged) continue;
      candidates.push({ review, record, review_index: reviewIndex, review_state: reviewState });
    }
  }
  if (!candidates.length) {
    return { status: "FAIL", code: "PROTECTED_TEST_REVIEW_REQUIRED", latest_change_index: latest, review: null };
  }
  candidates.sort((a, b) => b.review_index - a.review_index);
  const selected = candidates[0];
  return {
    status: "PASS",
    code: "PROTECTED_TEST_REVIEW_ACCEPTED",
    latest_change_index: latest,
    review: {
      id: selected.review.id,
      commit_id: selected.review.commit_id,
      state: selected.review_state,
      basis: selected.record.basis,
      authorization_issue: selected.record.authorization_issue || null,
      paths: [...selected.record.paths].sort(),
      reason: selected.record.reason,
    },
  };
}

function validateOverrideRecord(record, affectedProtectedPaths) {
  const failures = [];
  if (!record || typeof record !== "object" || Array.isArray(record) || record.__parse_error) return ["override_record_invalid_json"];
  if (record.schema !== OVERRIDE_SCHEMA) failures.push("override_schema_invalid");
  if (record.authorized_by !== "user") failures.push("override_authorizer_invalid");
  if (!Array.isArray(record.paths) || !record.paths.length || !setEquals(record.paths, affectedProtectedPaths)) failures.push("override_paths_not_exact");
  if (typeof record.reason !== "string" || !record.reason.trim()) failures.push("override_reason_missing");
  return failures;
}

function evaluateUserOverride(issueBody, affectedProtectedPaths) {
  const records = extractFencedJson(issueBody, "protected-test-override");
  for (const record of records) {
    if (!validateOverrideRecord(record, affectedProtectedPaths).length) return { status: "PASS", record };
  }
  return { status: "FAIL", code: "USER_OVERRIDE_NOT_EXPLICIT_OR_EXACT" };
}

module.exports = {
  CONTROL_PLANE_PATHS,
  OVERRIDE_SCHEMA,
  PR_COMMIT_API_LIMIT,
  PR_FILE_API_LIMIT,
  REGISTRY_PATH,
  REVIEW_SCHEMA,
  analyzeProtectedChanges,
  changedCandidates,
  entryMap,
  evaluateReviewGate,
  evaluateUserOverride,
  extractFencedJson,
  latestRelevantCommitIndex,
  protectedPathUnion,
  registryEntryDeltaPaths,
  setEquals,
  validateOverrideRecord,
  validateReviewApiCompleteness,
  validateReviewRecord,
};
