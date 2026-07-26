#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "config", "verification-profiles.json"), "utf8"),
);
const profileIndex = process.argv.indexOf("--profile");
const requested = profileIndex >= 0 ? process.argv[profileIndex + 1] : "core";
const outputIndex = process.argv.indexOf("--output");
const outputPath = outputIndex >= 0
  ? path.resolve(process.cwd(), process.argv[outputIndex + 1] || "")
  : null;
const keepGoing = process.argv.includes("--keep-going");
const valid = new Set(["core", "research", "release", "all"]);

if (!valid.has(requested)) {
  console.error(`Unknown verification profile: ${requested}`);
  process.exit(2);
}
if (outputIndex >= 0 && !process.argv[outputIndex + 1]) {
  console.error("--output requires a file path");
  process.exit(2);
}
if (manifest.schema !== "canto-span-verification-profiles-v2") {
  console.error(`Unsupported verification profile schema: ${manifest.schema}`);
  process.exit(2);
}

const selectedNames = requested === "all"
  ? ["core", "research", "release"]
  : requested === "release"
    ? ["core", "release"]
    : [requested];
const commands = [];
const seen = new Set();
const configurationErrors = [];

for (const name of selectedNames) {
  for (const item of manifest.profiles[name] || []) {
    const validItem = item
      && typeof item.id === "string"
      && item.id.length > 0
      && Array.isArray(item.command)
      && item.command.length > 0
      && item.command.every((part) => typeof part === "string" && part.length > 0)
      && typeof item.reason === "string"
      && item.reason.trim().length > 0
      && typeof item.run_when === "string"
      && item.run_when.trim().length > 0;
    if (!validItem) {
      configurationErrors.push({ profile: name, id: item?.id || null });
      continue;
    }
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    commands.push({ ...item, profile: name });
  }
}

if (configurationErrors.length) {
  console.error(JSON.stringify({
    status: "FAIL",
    reason: "Every permanent verification command requires id, command, reason, and run_when.",
    configuration_errors: configurationErrors,
  }, null, 2));
  process.exit(2);
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

const runtime = JSON.parse(
  fs.readFileSync(path.join(root, "manifest.json"), "utf8"),
).version;
const output = {
  schema: "canto-span-verification-summary-v2",
  runtime_version: runtime,
  requested_profile: requested,
  included_profiles: selectedNames,
  fail_fast: !keepGoing,
  configured_command_count: commands.length,
  executed_command_count: results.length,
  passed: results.filter((item) => item.status === "PASS").length,
  failed: results.filter((item) => item.status === "FAIL").length,
  status: failed ? "FAIL" : "PASS",
  results,
};

if (outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
}
console.log(JSON.stringify(output, null, 2));
if (failed) process.exit(1);
