#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { currentValidationPath } = require("./validation-paths");

const root = path.resolve(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "config", "verification-profiles.json"), "utf8"));
const profileIndex = process.argv.indexOf("--profile");
const requested = profileIndex >= 0 ? process.argv[profileIndex + 1] : "core";
const valid = new Set(["core", "research", "release", "all"]);
if (!valid.has(requested)) {
  console.error(`Unknown verification profile: ${requested}`);
  process.exit(2);
}

const selectedNames = requested === "all"
  ? ["core", "research", "release"]
  : requested === "release"
    ? ["core", "release"]
    : [requested];
const commands = [];
const seen = new Set();
for (const name of selectedNames) {
  for (const item of manifest.profiles[name] || []) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    commands.push({ ...item, profile: name });
  }
}

const results = [];
let failed = false;
for (const item of commands) {
  const [program, ...args] = item.command;
  const run = spawnSync(program, args, { cwd: root, encoding: "utf8" });
  const result = {
    id: item.id,
    profile: item.profile,
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
}

const runtime = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8")).version;
const output = {
  schema: "canto-span-verification-summary-v1",
  runtime_version: runtime,
  requested_profile: requested,
  included_profiles: selectedNames,
  command_count: results.length,
  passed: results.filter((item) => item.status === "PASS").length,
  failed: results.filter((item) => item.status === "FAIL").length,
  status: failed ? "FAIL" : "PASS",
  results,
};
fs.writeFileSync(currentValidationPath(root, `${requested}-verification-summary.json`), JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify(output, null, 2));
if (failed) process.exit(1);
