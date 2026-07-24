#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const {
  buildSummary,
  extractLedger,
  mergeHumanReviews,
  readJson,
  renderTsv,
  sourceInventory,
  validateLedger,
  validateManifest,
  validateReproducible,
  writeJson,
  writeTextAtomic,
} = require("./lib.js");

const REPO_ROOT = path.resolve(__dirname, "../..");
const PACKET_ROOT = path.join(REPO_ROOT, "review-packets", "corpus-review", "AB30");
const DEFAULTS = Object.freeze({
  manifest: path.join(PACKET_ROOT, "source-allowlist.json"),
  ledger: path.join(PACKET_ROOT, "candidate-ledger.json"),
  inventory: path.join(PACKET_ROOT, "excluded-sources.json"),
  json: path.join(PACKET_ROOT, "candidates.json"),
  tsv: path.join(PACKET_ROOT, "candidates.tsv"),
  summary: path.join(PACKET_ROOT, "summary.json"),
});

function usage() {
  return `AB30 corpus-candidate review workbench

Usage:
  node tools/corpus-review/cli.js inventory [--manifest PATH] [--output PATH]
  node tools/corpus-review/cli.js extract [--manifest PATH] [--ledger PATH]
  node tools/corpus-review/cli.js validate [--manifest PATH] [--ledger PATH]
  node tools/corpus-review/cli.js render [--manifest PATH] [--ledger PATH]
       [--json PATH] [--tsv PATH] [--summary PATH]
`;
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  if (!command || command === "--help" || command === "-h") return { command: "help", options: {} };
  const options = {};
  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (!token.startsWith("--")) throw new Error(`Unexpected argument: ${token}`);
    const name = token.slice(2);
    const value = rest[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for --${name}`);
    options[name] = path.resolve(process.cwd(), value);
    index += 1;
  }
  return { command, options };
}

function loadManifest(manifestPath) {
  const raw = fs.readFileSync(manifestPath, "utf8");
  let manifest;
  try {
    manifest = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Malformed source allowlist ${manifestPath}: ${error.message}`);
  }
  validateManifest(manifest, REPO_ROOT);
  return { manifest, raw };
}

function runInventory(options) {
  const manifestPath = options.manifest || DEFAULTS.manifest;
  const outputPath = options.output || DEFAULTS.inventory;
  const { manifest } = loadManifest(manifestPath);
  const inventory = sourceInventory(manifest, REPO_ROOT);
  writeJson(outputPath, inventory);
  process.stdout.write(
    `Inventoried ${inventory.includedSources.length} included and ${inventory.excludedSources.length} excluded source files.\n`,
  );
}

function runExtract(options) {
  const manifestPath = options.manifest || DEFAULTS.manifest;
  const ledgerPath = options.ledger || DEFAULTS.ledger;
  const { manifest, raw } = loadManifest(manifestPath);
  let ledger = extractLedger(manifest, REPO_ROOT, raw);
  if (fs.existsSync(ledgerPath)) {
    const existingLedger = readJson(ledgerPath, "existing candidate ledger");
    ledger = mergeHumanReviews(ledger, existingLedger);
    ledger.summary = buildSummary(ledger.candidates, manifest);
  }
  validateLedger(ledger, manifest);
  writeJson(ledgerPath, ledger);
  process.stdout.write(
    `Extracted ${ledger.summary.totalExtracted} candidates; all new classifications are unreviewed.\n`,
  );
}

function runValidate(options) {
  const manifestPath = options.manifest || DEFAULTS.manifest;
  const ledgerPath = options.ledger || DEFAULTS.ledger;
  const { manifest, raw } = loadManifest(manifestPath);
  const ledger = readJson(ledgerPath, "candidate ledger");
  validateLedger(ledger, manifest);
  validateReproducible(ledger, manifest, REPO_ROOT, raw);
  process.stdout.write(
    `Valid AB30 ledger: ${ledger.candidates.length} traceable candidates with deterministic IDs and exact summary totals.\n`,
  );
}

function runRender(options) {
  const manifestPath = options.manifest || DEFAULTS.manifest;
  const ledgerPath = options.ledger || DEFAULTS.ledger;
  const jsonPath = options.json || DEFAULTS.json;
  const tsvPath = options.tsv || DEFAULTS.tsv;
  const summaryPath = options.summary || DEFAULTS.summary;
  const { manifest } = loadManifest(manifestPath);
  const ledger = readJson(ledgerPath, "candidate ledger");
  validateLedger(ledger, manifest);
  writeJson(jsonPath, ledger);
  writeTextAtomic(tsvPath, renderTsv(ledger));
  writeJson(summaryPath, ledger.summary);
  process.stdout.write(
    `Rendered ${ledger.candidates.length} candidates to JSON and TSV from the canonical ledger.\n`,
  );
}

function main(argv = process.argv.slice(2)) {
  const { command, options } = parseArgs(argv);
  switch (command) {
    case "help":
      process.stdout.write(usage());
      return;
    case "inventory":
      runInventory(options);
      return;
    case "extract":
      runExtract(options);
      return;
    case "validate":
      runValidate(options);
      return;
    case "render":
      runRender(options);
      return;
    default:
      throw new Error(`Unknown command: ${command}\n\n${usage()}`);
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`corpus-review: ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = { DEFAULTS, main, parseArgs };
