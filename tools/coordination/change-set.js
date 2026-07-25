#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { applyChangeSet, loadJson, validateChangeSet } = require("./lib");

const root = path.resolve(__dirname, "../..");
const config = loadJson(path.join(root, "config/coordination-targets.json"));

function usage() {
  process.stderr.write("Usage:\n  node tools/coordination/change-set.js validate <file...>\n  node tools/coordination/change-set.js apply [--write] <file>\n");
  process.exit(2);
}

const args = process.argv.slice(2);
const command = args.shift();
if (!command) usage();

if (command === "validate") {
  if (!args.length) usage();
  const results = [];
  let failed = false;
  for (const input of args) {
    const absolute = path.resolve(process.cwd(), input);
    let changeSet;
    try {
      changeSet = JSON.parse(fs.readFileSync(absolute, "utf8"));
    } catch (error) {
      results.push({ file: input, status: "FAIL", errors: [error.message] });
      failed = true;
      continue;
    }
    const errors = validateChangeSet(changeSet, config);
    results.push({ file: input, status: errors.length ? "FAIL" : "PASS", errors });
    if (errors.length) failed = true;
  }
  process.stdout.write(`${JSON.stringify({ schema: "canto-span-change-set-validation-v1", status: failed ? "FAIL" : "PASS", results }, null, 2)}\n`);
  process.exitCode = failed ? 1 : 0;
} else if (command === "apply") {
  const writeIndex = args.indexOf("--write");
  const write = writeIndex !== -1;
  if (write) args.splice(writeIndex, 1);
  if (args.length !== 1) usage();
  const changeSet = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), args[0]), "utf8"));
  const result = applyChangeSet(changeSet, root, { config, write });
  process.stdout.write(`${JSON.stringify({ schema: "canto-span-change-set-apply-v1", status: "PASS", ...result }, null, 2)}\n`);
} else {
  usage();
}
