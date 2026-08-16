#!/usr/bin/env node
"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const REGISTRY_SCHEMA = "canto-span-protected-tests-v1";
const DEFAULT_REGISTRY_PATH = "config/protected-tests.json";
const ALLOWED_SCOPES = new Set(["runtime", "research", "governance", "release"]);

function sha256(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function isSafeTestPath(filePath) {
  if (typeof filePath !== "string" || !filePath) return false;
  if (path.posix.isAbsolute(filePath) || filePath.includes("\\")) return false;
  const normalized = path.posix.normalize(filePath);
  return normalized === filePath
    && !normalized.startsWith("../")
    && /^tests\/.+\.test\.(?:js|py)$/u.test(normalized);
}

function validateRegistry(registry) {
  const failures = [];
  if (!registry || typeof registry !== "object" || Array.isArray(registry)) {
    return [{ code: "registry_not_object", path: DEFAULT_REGISTRY_PATH }];
  }
  if (registry.schema !== REGISTRY_SCHEMA) {
    failures.push({ code: "registry_schema_invalid", actual: registry.schema || null });
  }
  if (!Array.isArray(registry.tests)) {
    failures.push({ code: "registry_tests_not_array" });
    return failures;
  }

  const seen = new Set();
  for (let index = 0; index < registry.tests.length; index += 1) {
    const entry = registry.tests[index];
    const prefix = `tests[${index}]`;
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      failures.push({ code: "registry_entry_not_object", entry: prefix });
      continue;
    }
    const allowedKeys = new Set([
      "path",
      "sha256",
      "reason",
      "scope",
      "protection_class",
      "expected_change_frequency",
      "normal_growth_requires_edit",
      "review_required_on_change",
    ]);
    for (const key of Object.keys(entry)) {
      if (!allowedKeys.has(key)) failures.push({ code: "registry_entry_unknown_field", entry: prefix, field: key });
    }
    if (!isSafeTestPath(entry.path)) failures.push({ code: "protected_path_invalid", entry: prefix, path: entry.path || null });
    if (seen.has(entry.path)) failures.push({ code: "protected_path_duplicate", path: entry.path });
    seen.add(entry.path);
    if (!/^[0-9a-f]{64}$/u.test(String(entry.sha256 || ""))) failures.push({ code: "sha256_invalid", path: entry.path || null });
    if (typeof entry.reason !== "string" || !entry.reason.trim()) failures.push({ code: "reason_missing", path: entry.path || null });
    if (!ALLOWED_SCOPES.has(entry.scope)) failures.push({ code: "scope_invalid", path: entry.path || null, scope: entry.scope || null });
    if (entry.protection_class !== "constitutional_doctrine") failures.push({ code: "protection_class_invalid", path: entry.path || null });
    if (entry.expected_change_frequency !== "rare-to-never") failures.push({ code: "expected_change_frequency_invalid", path: entry.path || null });
    if (entry.normal_growth_requires_edit !== false) failures.push({ code: "scalable_test_not_eligible", path: entry.path || null });
    if (entry.review_required_on_change !== true) failures.push({ code: "review_requirement_invalid", path: entry.path || null });
  }
  return failures;
}

function loadRegistry(root, registryPath = DEFAULT_REGISTRY_PATH) {
  const absolute = path.resolve(root, registryPath);
  return JSON.parse(fs.readFileSync(absolute, "utf8"));
}

function verifyProtectedTests(root, registry = loadRegistry(root)) {
  const failures = validateRegistry(registry);
  const checks = [];
  if (failures.length) {
    return { schema: REGISTRY_SCHEMA, status: "FAIL", protected_count: Array.isArray(registry.tests) ? registry.tests.length : 0, checks, failures };
  }

  for (const entry of registry.tests) {
    const absolute = path.resolve(root, entry.path);
    const relative = path.relative(root, absolute);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      failures.push({ code: "protected_path_escapes_root", path: entry.path });
      continue;
    }
    if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
      failures.push({ code: "protected_test_missing", path: entry.path });
      checks.push({ path: entry.path, expected_sha256: entry.sha256, actual_sha256: null, status: "MISSING" });
      continue;
    }
    const actual = sha256(fs.readFileSync(absolute));
    const status = actual === entry.sha256 ? "PASS" : "MISMATCH";
    checks.push({ path: entry.path, expected_sha256: entry.sha256, actual_sha256: actual, status });
    if (status !== "PASS") {
      failures.push({ code: "PROTECTED_TEST_REVIEW_REQUIRED", path: entry.path, expected_sha256: entry.sha256, actual_sha256: actual });
    }
  }

  return {
    schema: REGISTRY_SCHEMA,
    status: failures.length ? "FAIL" : "PASS",
    protected_count: registry.tests.length,
    checks,
    failures,
  };
}

function main() {
  const root = path.resolve(__dirname, "..");
  let report;
  try {
    report = verifyProtectedTests(root);
  } catch (error) {
    report = { schema: REGISTRY_SCHEMA, status: "FAIL", protected_count: 0, checks: [], failures: [{ code: "registry_load_failed", message: error.message }] };
  }
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (report.status !== "PASS") process.exitCode = 1;
}

if (require.main === module) main();

module.exports = {
  ALLOWED_SCOPES,
  DEFAULT_REGISTRY_PATH,
  REGISTRY_SCHEMA,
  isSafeTestPath,
  loadRegistry,
  sha256,
  validateRegistry,
  verifyProtectedTests,
};
