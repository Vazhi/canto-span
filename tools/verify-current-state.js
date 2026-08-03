#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const CANONICAL_PROFILE_ORDER = Object.freeze(["core", "research", "runtime", "release"]);

function optionValue(flag, fallback = null) {
  const indexes = process.argv
    .map((value, index) => (value === flag ? index : -1))
    .filter((index) => index >= 0);
  if (indexes.length > 1) {
    throw new Error(`${flag} may be supplied at most once`);
  }
  if (!indexes.length) return fallback;
  const value = process.argv[indexes[0] + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value`);
  }
  return value;
}

function assertStringArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must be a non-empty array`);
  }
  if (!value.every((item) => typeof item === "string" && item.trim().length > 0)) {
    throw new Error(`${label} must contain only non-empty strings`);
  }
  if (new Set(value).size !== value.length) {
    throw new Error(`${label} must not contain duplicates`);
  }
}

function assertExactKeys(actualObject, expectedKeys, label) {
  if (!actualObject || typeof actualObject !== "object" || Array.isArray(actualObject)) {
    throw new Error(`${label} must be an object`);
  }
  const actualKeys = Object.keys(actualObject);
  if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) {
    throw new Error(
      `${label} keys must exactly match ${JSON.stringify(expectedKeys)}; got ${JSON.stringify(actualKeys)}`,
    );
  }
}

function validateManifest(manifest) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    throw new Error("Verification profile manifest must be an object");
  }
  if (manifest.schema !== "canto-span-verification-profiles-v3") {
    throw new Error(`Unsupported verification profile schema: ${manifest.schema}`);
  }

  assertStringArray(manifest.profile_order, "profile_order");
  if (JSON.stringify(manifest.profile_order) !== JSON.stringify(CANONICAL_PROFILE_ORDER)) {
    throw new Error(
      `profile_order must exactly equal ${JSON.stringify(CANONICAL_PROFILE_ORDER)}`,
    );
  }
  assertExactKeys(manifest.profiles, manifest.profile_order, "profiles");

  const requestKeys = [...manifest.profile_order, "all"];
  assertExactKeys(manifest.profile_requests, requestKeys, "profile_requests");

  for (const requestName of requestKeys) {
    const selected = manifest.profile_requests[requestName];
    assertStringArray(selected, `profile_requests.${requestName}`);
    for (const profileName of selected) {
      if (!manifest.profile_order.includes(profileName)) {
        throw new Error(`profile_requests.${requestName} references unknown profile: ${profileName}`);
      }
    }
    if (requestName === "all") {
      if (JSON.stringify(selected) !== JSON.stringify(manifest.profile_order)) {
        throw new Error("profile_requests.all must exactly equal profile_order");
      }
    } else if (!selected.includes(requestName)) {
      throw new Error(`profile_requests.${requestName} must include its own profile`);
    }
  }

  const ids = new Set();
  const commandKeys = new Map();
  let registeredCommandCount = 0;

  for (const profileName of manifest.profile_order) {
    const items = manifest.profiles[profileName];
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error(`profiles.${profileName} must be a non-empty array`);
    }
    for (const [index, item] of items.entries()) {
      const label = `profiles.${profileName}[${index}]`;
      const validItem = item
        && typeof item === "object"
        && typeof item.id === "string"
        && item.id.trim().length > 0
        && Array.isArray(item.command)
        && item.command.length > 0
        && item.command.every((part) => typeof part === "string" && part.length > 0)
        && typeof item.reason === "string"
        && item.reason.trim().length > 0
        && typeof item.run_when === "string"
        && item.run_when.trim().length > 0;
      if (!validItem) {
        throw new Error(`${label} requires non-empty id, command, reason, and run_when fields`);
      }
      if (ids.has(item.id)) {
        throw new Error(`Duplicate verification command ID: ${item.id}`);
      }
      ids.add(item.id);

      const commandKey = JSON.stringify(item.command);
      if (commandKeys.has(commandKey)) {
        throw new Error(
          `Duplicate verification command for IDs ${commandKeys.get(commandKey)} and ${item.id}`,
        );
      }
      commandKeys.set(commandKey, item.id);
      registeredCommandCount += 1;
    }
  }

  return { requestKeys, registeredCommandCount };
}

function writeOutput(outputPath, output) {
  if (!outputPath) return;
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
}

let requested;
let outputPath;
let manifestPath;
try {
  requested = optionValue("--profile", "core");
  const outputValue = optionValue("--output", null);
  outputPath = outputValue ? path.resolve(process.cwd(), outputValue) : null;
  const manifestValue = optionValue(
    "--manifest",
    path.join(root, "config", "verification-profiles.json"),
  );
  manifestPath = path.resolve(process.cwd(), manifestValue);
} catch (error) {
  console.error(error.message);
  process.exit(2);
}

const keepGoing = process.argv.includes("--keep-going");
const validateOnly = process.argv.includes("--validate-only");

let manifest;
let manifestValidation;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifestValidation = validateManifest(manifest);
  if (!manifestValidation.requestKeys.includes(requested)) {
    throw new Error(`Unknown verification profile request: ${requested}`);
  }
} catch (error) {
  const output = {
    schema: "canto-span-verification-summary-v3",
    requested_profile: requested || null,
    manifest: path.relative(root, manifestPath || "") || ".",
    status: "FAIL",
    reason: error.message,
  };
  writeOutput(outputPath, output);
  console.error(JSON.stringify(output, null, 2));
  process.exit(2);
}

const selectedNames = manifest.profile_requests[requested];
const commands = selectedNames.flatMap((profileName) =>
  manifest.profiles[profileName].map((item) => ({ ...item, profile: profileName }))
);
const selectedIds = commands.map((item) => item.id);
if (new Set(selectedIds).size !== selectedIds.length) {
  console.error("Selected verification commands must have unique IDs");
  process.exit(2);
}

const runtime = JSON.parse(
  fs.readFileSync(path.join(root, "manifest.json"), "utf8"),
).version;

if (validateOnly) {
  const output = {
    schema: "canto-span-verification-summary-v3",
    runtime_version: runtime,
    requested_profile: requested,
    included_profiles: selectedNames,
    manifest_profile_order: manifest.profile_order,
    validation_only: true,
    registered_command_count: manifestValidation.registeredCommandCount,
    configured_command_count: commands.length,
    executed_command_count: 0,
    status: "PASS",
    results: [],
  };
  writeOutput(outputPath, output);
  console.log(JSON.stringify(output, null, 2));
  process.exit(0);
}

const results = [];
let failed = false;
for (const item of commands) {
  const [program, ...args] = item.command;
  const run = spawnSync(program, args, { cwd: root, encoding: "utf8" });
  const result = {
    id: item.id,
    profile: item.profile,
    reason: item.reason,
    run_when: item.run_when,
    command: item.command,
    exit_code: run.status,
    signal: run.signal || "",
    status: run.status === 0 ? "PASS" : "FAIL",
  };
  if (run.status !== 0) {
    failed = true;
    result.stdout = run.stdout || "";
    result.stderr = run.stderr || "";
    process.stderr.write(`\n[${item.id}] failed\n${result.stdout}${result.stderr}`);
  }
  results.push(result);
  if (failed && !keepGoing) break;
}

const executionCounts = new Map();
for (const result of results) {
  executionCounts.set(result.id, (executionCounts.get(result.id) || 0) + 1);
}
const duplicateExecutions = [...executionCounts.entries()]
  .filter(([, count]) => count !== 1)
  .map(([id, count]) => ({ id, count }));
const missingExecutions = requested === "all" && keepGoing
  ? selectedIds.filter((id) => !executionCounts.has(id))
  : [];
if (duplicateExecutions.length || missingExecutions.length) {
  failed = true;
}

const output = {
  schema: "canto-span-verification-summary-v3",
  runtime_version: runtime,
  requested_profile: requested,
  included_profiles: selectedNames,
  manifest_profile_order: manifest.profile_order,
  fail_fast: !keepGoing,
  validation_only: false,
  registered_command_count: manifestValidation.registeredCommandCount,
  configured_command_count: commands.length,
  executed_command_count: results.length,
  execution_integrity: {
    duplicate_executions: duplicateExecutions,
    missing_executions: missingExecutions,
  },
  passed: results.filter((item) => item.status === "PASS").length,
  failed: results.filter((item) => item.status === "FAIL").length,
  status: failed ? "FAIL" : "PASS",
  results,
};

writeOutput(outputPath, output);
console.log(JSON.stringify(output, null, 2));
if (failed) process.exit(1);
