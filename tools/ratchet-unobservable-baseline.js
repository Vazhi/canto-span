#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const {
  constructionContractFromSpecs,
  npContract,
  regressionContract,
} = require("./verify-regression-ratchet");

const SUITES = new Set(["regression", "np_subsystem", "construction_files"]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), "utf8"));
}

function readConstructionSpecs(directoryPath) {
  const absolute = path.resolve(directoryPath);
  return fs.readdirSync(absolute)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => readJson(path.join(absolute, name)));
}

function contractForSuite(suite, universePath) {
  if (suite === "regression") return regressionContract(readJson(universePath));
  if (suite === "np_subsystem") return npContract(readJson(universePath));
  if (suite === "construction_files") return constructionContractFromSpecs(readConstructionSpecs(universePath));
  throw new Error(`unsupported debt suite ${suite}`);
}

function materializeUnobservableBaseline({ suite, universePath, reason = "" }) {
  if (!SUITES.has(suite)) throw new Error(`unsupported debt suite ${suite}`);
  const cases = contractForSuite(suite, universePath);
  const failures = [...cases.values()].map(({ display }) => ({
    ...display,
    error: "baseline_suite_unobservable",
  }));
  return {
    schema: "canto-span-unobservable-baseline-result-v1",
    runtime_version: "",
    synthetic_unobservable_baseline: true,
    failure_reason: String(reason || "baseline suite exited nonzero before producing a result").slice(0, 2000),
    total: cases.size,
    passed: 0,
    failed: cases.size,
    status: "FAIL",
    failures,
  };
}

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function main() {
  const suite = argValue("--suite");
  const universePath = argValue("--universe");
  const outputPath = argValue("--output");
  const reasonFilePath = argValue("--reason-file");
  const missing = [
    ["--suite", suite],
    ["--universe", universePath],
    ["--output", outputPath],
  ].filter(([, value]) => !value).map(([name]) => name);
  if (missing.length) {
    console.error(`Missing required arguments: ${missing.join(", ")}`);
    process.exit(2);
  }

  try {
    const reason = reasonFilePath && fs.existsSync(path.resolve(reasonFilePath))
      ? fs.readFileSync(path.resolve(reasonFilePath), "utf8")
      : "baseline suite exited nonzero before producing a result";
    const report = materializeUnobservableBaseline({ suite, universePath, reason });
    const serialized = JSON.stringify(report, null, 2) + "\n";
    fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
    fs.writeFileSync(path.resolve(outputPath), serialized);
    process.stdout.write(serialized);
  } catch (error) {
    console.error(error && error.stack ? error.stack : String(error));
    process.exit(2);
  }
}

if (require.main === module) main();

module.exports = { materializeUnobservableBaseline };
