#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadRuntimeApi, internalConstruction } = require("../tests/lib/runtime-api");

const root = path.resolve(__dirname, "..");
const api = loadRuntimeApi(path.join(root, "main.js"));
const probes = JSON.parse(fs.readFileSync(path.join(root, "test-data", "speech-transfer-complement-reachability-probes-v1.json"), "utf8"));
const index = JSON.parse(fs.readFileSync(path.join(root, "tests", "construction-test-index.json"), "utf8"));
const indexByLabel = new Map(index.files.map((row) => [row.construction, row]));
const inventoryPath = path.join(root, "docs", "research", "CP038-P1-SPEECH-TRANSFER-COMPLEMENT-WRAPPER-INVENTORY-R1.tsv");
const inventoryLines = fs.readFileSync(inventoryPath, "utf8").trimEnd().split(/\r?\n/);
const headers = inventoryLines.shift().split("\t");
const inventory = inventoryLines.filter(Boolean).map((line) => Object.fromEntries(headers.map((h, i) => [h, line.split("\t")[i] || ""])));

function labelsFor(source) {
  return api.diagnosticFinalRows(api.analyzeLine(source, null))
    .filter((row) => row.kind === "construction")
    .map(internalConstruction)
    .filter(Boolean);
}

const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail ? { detail: String(detail) } : {}) });
  if (!pass) failures.push({ name, detail: String(detail) });
}

check("runtime version is 0.5.197", api.runtimeVersion === "0.5.197", api.runtimeVersion);
check("inventory has six labels", inventory.length === 6, inventory.length);
check("probe schema", probes.schema === "canto-span-speech-transfer-complement-reachability-probes-v1", probes.schema);
check("probe file has six cases", probes.cases.length === 6, probes.cases.length);
check("probe file has six unique target labels", new Set(probes.cases.map((row) => row.construction)).size === 6);
check("all probes have zero evidence weight", probes.linguistic_evidence_weight === 0 && probes.cases.every((row) => row.linguistic_evidence_weight === 0 && row.purpose === "runtime_reachability_only"));

for (const probe of probes.cases) {
  const labels = labelsFor(probe.source);
  check(`${probe.case_id} reaches ${probe.construction}`, labels.includes(probe.construction), `${probe.source}: ${labels.join(",")}`);
  const row = indexByLabel.get(probe.construction);
  check(`${probe.construction} coverage is implementation only`, row && row.state === "implementation_positive_only", row && row.state);
  check(`${probe.construction} has one implementation probe`, row && row.implementation_probe_count === 1, row && row.implementation_probe_count);
  check(`${probe.construction} keeps zero direct positives`, row && row.positive_case_count === 0, row && row.positive_case_count);
  const notePath = [path.join(root, "grammar", "active", `${probe.construction}.md`), path.join(root, "grammar", "archived", `${probe.construction}.md`)].find(fs.existsSync);
  const note = notePath ? fs.readFileSync(notePath, "utf8") : "";
  check(`${probe.construction} note records CP038 zero-weight reachability`, note.includes("CP038 speech/transfer/complement wrapper audit") && note.includes(`\`${probe.case_id}\``) && note.includes("linguistic evidence weight is **0**"), notePath ? path.relative(root, notePath) : "missing");
}

const negativeSpeech = labelsFor("我唔話你知。");
const positiveSpeech = labelsFor("我話你知。");
check("negative speech route contains outer and inner wrappers", negativeSpeech.includes("SpeechTransferClause") && negativeSpeech.includes("DitransitiveSpeechVP"), negativeSpeech.join(","));
check("positive speech route differs", !positiveSpeech.includes("SpeechTransferClause") && !positiveSpeech.includes("DitransitiveSpeechVP") && positiveSpeech.includes("ReportedSpeech"), positiveSpeech.join(","));
check("subjectless intention does not reach IntentionFrame", !labelsFor("諗住返屋企。").includes("IntentionFrame"), labelsFor("諗住返屋企。").join(","));
check("source-style personal 叫 does not reach NamingClause", !labelsFor("我叫大文。").includes("NamingClause"), labelsFor("我叫大文。").join(","));
check("exact ASCII 叫做 fallback reaches NamingClause", labelsFor("我叫做 Chris。").includes("NamingClause"), labelsFor("我叫做 Chris。").join(","));

check("test index has 63 implementation-positive-only labels", index.files.filter((row) => row.state === "implementation_positive_only").length === 63, index.files.filter((row) => row.state === "implementation_positive_only").length);
check("test index has one compatibility-alias-only label", index.files.filter((row) => row.state === "compatibility_alias_only").length === 1, index.files.filter((row) => row.state === "compatibility_alias_only").length);
check("test index has zero no-direct labels", index.files.filter((row) => row.state === "no_direct_cases").length === 0, index.files.filter((row) => row.state === "no_direct_cases").length);
check("test index has 166 active labels", index.active_construction_count === 166 && index.files.length === 166, index.files.length);

const result = {
  schema: "canto-span-speech-transfer-complement-wrapper-audit-v1",
  runtime_version: api.runtimeVersion,
  checkpoint: "v0.5.197-speech-transfer-complement-wrapper-audit",
  parser_recognized_span_behavior_changed: false,
  linguistic_status_changed: false,
  labels_audited: inventory.length,
  implementation_probes_added: probes.cases.length,
  linguistic_evidence_weight_added: 0,
  total: checks.length,
  passed: checks.length - failures.length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  checks,
  failures,
};
const outDir = path.join(root, "validation", `v${api.runtimeVersion}`);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "speech-transfer-complement-wrapper-audit.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
