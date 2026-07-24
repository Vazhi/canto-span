#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const registryPath = path.join(root, "data", "construction-identities.json");
const candidatesPath = path.join(root, "data", "construction-identity-candidates.json");
const lockPath = path.join(root, "data", "construction-identity-lock.json");
const claimLayers = new Set([
  "language_construction",
  "parser_representation",
  "compatibility_alias",
  "diagnostic_state",
  "unresolved",
]);

function parseArgs(argv) {
  const result = { command: argv[2] || "" };
  for (let index = 3; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) throw new Error(`Unexpected argument: ${token}`);
    const key = token.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    const value = argv[index + 1];
    if (value === undefined || value.startsWith("--")) throw new Error(`Missing value for ${token}`);
    result[key] = value;
    index += 1;
  }
  return result;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
}

function codeForOrdinal(ordinal) {
  const zero = ordinal - 1;
  const block = Math.floor(zero / 99);
  const number = (zero % 99) + 1;
  const first = Math.floor(block / 26);
  const second = block % 26;
  if (first >= 26) throw new Error("Construction code space exhausted");
  return `${String.fromCharCode(65 + first)}${String.fromCharCode(65 + second)}${String(number).padStart(2, "0")}`;
}

function nextUnusedCode(registry, lock) {
  const used = new Set();
  for (const record of registry.records || []) {
    if (record.construction_code) used.add(record.construction_code);
  }
  for (const entry of lock.entries || []) {
    if (entry.construction_code) used.add(entry.construction_code);
  }
  for (let ordinal = 1; ordinal <= 26 * 26 * 99; ordinal += 1) {
    const code = codeForOrdinal(ordinal);
    if (!used.has(code)) return code;
  }
  throw new Error("No construction codes remain");
}

function runTool(file, args) {
  const run = spawnSync(process.execPath, [path.join(__dirname, file), ...args], {
    cwd: root,
    encoding: "utf8",
  });
  if (run.status !== 0) throw new Error(`${file} failed:\n${run.stdout || ""}${run.stderr || ""}`);
}

const args = parseArgs(process.argv);
if (!fs.existsSync(registryPath)) throw new Error("Missing permanent identity registry");
if (!fs.existsSync(candidatesPath)) throw new Error("Missing candidate identity ledger");
const registry = readJson(registryPath);
const candidates = readJson(candidatesPath);
const today = new Date().toISOString().slice(0, 10);

if (args.command === "create") {
  for (const field of ["name", "claimLayer", "sourcePath", "description"]) {
    if (!args[field]) throw new Error(`create requires --${field.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`);
  }
  if (!claimLayers.has(args.claimLayer)) throw new Error(`Unsupported claim layer: ${args.claimLayer}`);
  const usedNames = new Set([
    ...registry.records.flatMap((record) => [record.canonical_name, ...(record.legacy_labels || [])]),
    ...candidates.records.map((record) => record.canonical_name_at_creation),
  ]);
  if (usedNames.has(args.name)) throw new Error(`Construction name already allocated: ${args.name}`);
  const record = {
    construction_uuid: crypto.randomUUID(),
    canonical_name_at_creation: args.name,
    claim_layer: args.claimLayer,
    source_path: args.sourcePath,
    profile_description: args.description,
    state: "candidate",
    created_at: today,
    canonicalized_at: null,
    abandoned_at: null,
    construction_code: null,
  };
  candidates.records.push(record);
  candidates.record_count = candidates.records.length;
  writeJson(candidatesPath, candidates);
  console.log(JSON.stringify(record, null, 2));
  process.exit(0);
}

if (args.command === "abandon") {
  if (!args.uuid) throw new Error("abandon requires --uuid");
  const candidate = candidates.records.find((record) => record.construction_uuid === args.uuid);
  if (!candidate) throw new Error(`Unknown candidate UUID: ${args.uuid}`);
  if (candidate.state !== "candidate") throw new Error(`Candidate is already ${candidate.state}`);
  candidate.state = "abandoned";
  candidate.abandoned_at = today;
  candidates.record_count = candidates.records.length;
  writeJson(candidatesPath, candidates);
  console.log(JSON.stringify(candidate, null, 2));
  process.exit(0);
}

if (args.command === "canonicalize") {
  if (!args.uuid) throw new Error("canonicalize requires --uuid");
  const candidate = candidates.records.find((record) => record.construction_uuid === args.uuid);
  if (!candidate) throw new Error(`Unknown candidate UUID: ${args.uuid}`);
  if (candidate.state !== "candidate") throw new Error(`Candidate is already ${candidate.state}`);
  const notes = loadConstructionNotes(root);
  const note = notes.find((item) => item.frontmatter.construction === candidate.canonical_name_at_creation);
  if (!note) {
    throw new Error(
      `No canonical grammar note exists for ${candidate.canonical_name_at_creation}. ` +
      "Create the bounded note and pass collision review before canonicalization."
    );
  }
  const lock = fs.existsSync(lockPath)
    ? readJson(lockPath)
    : { schema: "canto-span-construction-identity-lock-v1", entries: [] };
  const code = nextUnusedCode(registry, lock);
  registry.records.push({
    construction_uuid: candidate.construction_uuid,
    construction_code: code,
    canonical_name: candidate.canonical_name_at_creation,
    legacy_labels: [candidate.canonical_name_at_creation],
    claim_layer: candidate.claim_layer,
    linguistic_status: note.frontmatter.status,
    lifecycle_state: "current",
    source_path: path.relative(root, note.file).replace(/\\/g, "/"),
    family_name: null,
    profile_name: null,
    profile_description: candidate.profile_description,
    learner_label: null,
    source_terms: [],
    former_names: [],
    predecessor_uuids: [],
    successor_uuids: [],
    record_revision: 1
  });
  registry.record_count = registry.records.length;
  registry.current_record_count = registry.records.filter((record) => record.lifecycle_state === "current").length;
  registry.retired_record_count = registry.records.filter((record) => record.lifecycle_state === "retired").length;
  writeJson(registryPath, registry);
  candidate.state = "canonicalized";
  candidate.canonicalized_at = today;
  candidate.construction_code = code;
  candidates.record_count = candidates.records.length;
  writeJson(candidatesPath, candidates);
  runTool("generate-construction-identities.js", ["--write"]);
  runTool("build-construction-identity-lock.js", ["--write"]);
  console.log(JSON.stringify({
    construction_uuid: candidate.construction_uuid,
    construction_code: code,
    canonical_name: candidate.canonical_name_at_creation,
    state: "canonicalized"
  }, null, 2));
  process.exit(0);
}

throw new Error(
  "Usage:\n" +
  "  node tools/allocate-construction-identity.js create --name NAME --claim-layer LAYER --source-path PATH --description TEXT\n" +
  "  node tools/allocate-construction-identity.js canonicalize --uuid UUID\n" +
  "  node tools/allocate-construction-identity.js abandon --uuid UUID"
);
