"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "../../..");
const runner = path.join(root, "tools", "verify-current-state.js");
const canonicalManifest = JSON.parse(
  fs.readFileSync(path.join(root, "config", "verification-profiles.json"), "utf8"),
);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function withManifest(manifest, callback) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "canto-span-verification-"));
  const manifestPath = path.join(directory, "profiles.json");
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  try {
    return callback({ directory, manifestPath });
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

function runManifest(manifest, args = ["--profile", "all", "--validate-only"], env = {}) {
  return withManifest(manifest, ({ manifestPath, directory }) => {
    const result = spawnSync(
      process.execPath,
      [runner, ...args, "--manifest", manifestPath],
      {
        cwd: root,
        encoding: "utf8",
        env: { ...process.env, ...env },
      },
    );
    return { ...result, directory };
  });
}

function assertConfigFailure(manifest, pattern, args) {
  const result = runManifest(manifest, args);
  assert.equal(result.status, 2, result.stdout || result.stderr);
  assert.match(result.stderr, pattern);
}

test("canonical verification manifest validates", () => {
  const result = runManifest(canonicalManifest);
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.deepEqual(report.included_profiles, canonicalManifest.profile_order);
  const expectedCount = canonicalManifest.profile_order.reduce(
    (count, profileName) => count + canonicalManifest.profiles[profileName].length,
    0,
  );
  assert.equal(report.registered_command_count, expectedCount);
  assert.equal(report.configured_command_count, expectedCount);
  assert.equal(report.executed_command_count, 0);
});

test("duplicate command IDs fail closed", () => {
  const manifest = clone(canonicalManifest);
  manifest.profiles.research[0].id = manifest.profiles.core[0].id;
  assertConfigFailure(manifest, /Duplicate verification command ID/);
});

test("duplicate command payloads fail closed even with different IDs", () => {
  const manifest = clone(canonicalManifest);
  manifest.profiles.research[0].command = [...manifest.profiles.core[0].command];
  assertConfigFailure(manifest, /Duplicate verification command/);
});

test("canonical profile names cannot be redefined", () => {
  const manifest = clone(canonicalManifest);
  manifest.profile_order = ["core", "research", "release"];
  delete manifest.profiles.runtime;
  delete manifest.profile_requests.runtime;
  manifest.profile_requests.all = ["core", "research", "release"];
  assertConfigFailure(manifest, /profile_order must exactly equal/);
});

test("missing canonical profiles fail closed", () => {
  const manifest = clone(canonicalManifest);
  delete manifest.profiles.release;
  assertConfigFailure(manifest, /profiles keys must exactly match/);
});

test("extra canonical profiles fail closed", () => {
  const manifest = clone(canonicalManifest);
  manifest.profiles.unknown = clone(manifest.profiles.research);
  assertConfigFailure(manifest, /profiles keys must exactly match/);
});

test("empty canonical profiles fail closed", () => {
  const manifest = clone(canonicalManifest);
  manifest.profiles.research = [];
  assertConfigFailure(manifest, /profiles\.research must be a non-empty array/);
});

test("non-canonical all selection fails closed", () => {
  const manifest = clone(canonicalManifest);
  manifest.profile_requests.all = ["core", "research", "release"];
  assertConfigFailure(manifest, /profile_requests\.all must exactly equal profile_order/);
});

test("empty profile selections fail closed", () => {
  const manifest = clone(canonicalManifest);
  manifest.profile_requests.research = [];
  assertConfigFailure(manifest, /profile_requests\.research must be a non-empty array/);
});

test("missing profile selections fail closed", () => {
  const manifest = clone(canonicalManifest);
  delete manifest.profile_requests.research;
  assertConfigFailure(manifest, /profile_requests keys must exactly match/);
});

test("unknown requested profiles fail closed", () => {
  assertConfigFailure(
    canonicalManifest,
    /Unknown verification profile request: unknown/,
    ["--profile", "unknown", "--validate-only"],
  );
});

test("all profile executes every registered command exactly once", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "canto-span-execution-"));
  const logPath = path.join(directory, "executions.log");
  const manifest = {
    schema: "canto-span-verification-profiles-v3",
    profile_order: ["core", "research", "runtime", "release"],
    profile_requests: {
      core: ["core"],
      research: ["research"],
      runtime: ["runtime"],
      release: ["core", "release"],
      all: ["core", "research", "runtime", "release"],
    },
    profiles: {},
  };
  for (const profileName of manifest.profile_order) {
    manifest.profiles[profileName] = [{
      id: `${profileName}-probe`,
      command: [
        process.execPath,
        "-e",
        `require('node:fs').appendFileSync(process.env.CANTO_SPAN_VERIFY_TEST_LOG, '${profileName}\\n')`,
      ],
      reason: `Exercise ${profileName} execution integrity.`,
      run_when: "The verification orchestrator changes.",
    }];
  }

  try {
    const result = runManifest(
      manifest,
      ["--profile", "all", "--keep-going"],
      { CANTO_SPAN_VERIFY_TEST_LOG: logPath },
    );
    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.equal(report.configured_command_count, 4);
    assert.equal(report.executed_command_count, 4);
    assert.deepEqual(report.execution_integrity, {
      duplicate_executions: [],
      missing_executions: [],
    });
    assert.deepEqual(
      fs.readFileSync(logPath, "utf8").trim().split("\n"),
      manifest.profile_order,
    );
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
