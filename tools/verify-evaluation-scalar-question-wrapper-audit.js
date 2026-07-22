#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadRuntimeApi, internalConstruction } = require("../tests/lib/runtime-api");

const root = path.resolve(__dirname, "..");
const api = loadRuntimeApi(path.join(root, "main.js"));
const probes = JSON.parse(fs.readFileSync(path.join(root, "test-data", "evaluation-scalar-question-reachability-probes-v1.json"), "utf8"));
const index = JSON.parse(fs.readFileSync(path.join(root, "tests", "construction-test-index.json"), "utf8"));
const indexByLabel = new Map(index.files.map((row) => [row.construction, row]));
const inventoryPath = path.join(root, "docs", "research", "CP039-P1-EVALUATION-SCALAR-QUESTION-WRAPPER-INVENTORY-R1.tsv");
const inventoryLines = fs.readFileSync(inventoryPath, "utf8").trimEnd().split(/\r?\n/);
const headers = inventoryLines.shift().split("\t");
const inventory = inventoryLines.filter(Boolean).map((line) => Object.fromEntries(headers.map((h, i) => [h, line.split("\t")[i] || ""])));

function rowsFor(source) {
  return api.diagnosticFinalRows(api.analyzeLine(source, null)).filter((row) => row.kind === "construction");
}
function labelsFor(source) {
  return rowsFor(source).map(internalConstruction).filter(Boolean);
}

const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail ? { detail: String(detail) } : {}) });
  if (!pass) failures.push({ name, detail: String(detail) });
}

check("runtime version is 0.5.196", api.runtimeVersion === "0.5.196", api.runtimeVersion);
check("inventory has ten labels", inventory.length === 10, inventory.length);
check("probe schema", probes.schema === "canto-span-evaluation-scalar-question-reachability-probes-v1", probes.schema);
check("probe file has ten cases", probes.cases.length === 10, probes.cases.length);
check("probe file has ten unique target labels", new Set(probes.cases.map((row) => row.construction)).size === 10);
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
  check(`${probe.construction} note records CP039 zero-weight reachability`, note.includes("CP039 evaluation/scalar/question wrapper audit") && note.includes(`\`${probe.case_id}\``) && note.includes("linguistic evidence weight is **0**"), notePath ? path.relative(root, notePath) : "missing");
}

check("standalone 都得 remains context-only rather than AcceptabilityClause", !labelsFor("都得。").includes("AcceptabilityClause") && labelsFor("都得。").includes("NeedsContext"), labelsFor("都得。").join(","));
check("bare action plus 都得 reaches AcceptabilityClause", labelsFor("返工都得。").includes("AcceptabilityClause"), labelsFor("返工都得。").join(","));
check("plain 都算貴 does not reach EvaluationWithDouSyun", !labelsFor("都算貴。").includes("EvaluationWithDouSyun"), labelsFor("都算貴。").join(","));
check("negative 算 evaluation reaches ScalarEvaluation", labelsFor("唔算貴。").includes("ScalarEvaluation"), labelsFor("唔算貴。").join(","));
check("scalar value label spans multiple wh domains", ["幾錢呀？", "幾長？", "幾遠？", "幾耐？"].every((s) => labelsFor(s).includes("ScalarValueQuestion")));
check("sourced topic identity question does not reach IdentityWhQuestion", !labelsFor("呢個咩嚟㗎？").includes("IdentityWhQuestion"), labelsFor("呢個咩嚟㗎？").join(","));
check("sourced copular identity question does not reach IdentityWhQuestion", !labelsFor("嗰位小姐係邊個呀？").includes("IdentityWhQuestion"), labelsFor("嗰位小姐係邊個呀？").join(","));
check("source-style scheduling question does not reach SchedulingQuestion", !labelsFor("你想約佢幾時呀？").includes("SchedulingQuestion"), labelsFor("你想約佢幾時呀？").join(","));
check("postposed and preverbal existential questions route differently", labelsFor("有書冇？").includes("PostposedExistentialQuestion") && labelsFor("有冇書？").includes("ExistentialQuestion") && !labelsFor("有冇書？").includes("PostposedExistentialQuestion"), `${labelsFor("有書冇？").join(",")} / ${labelsFor("有冇書？").join(",")}`);

check("test index has 63 implementation-positive-only labels", index.files.filter((row) => row.state === "implementation_positive_only").length === 63, index.files.filter((row) => row.state === "implementation_positive_only").length);
check("test index has one compatibility-alias-only label", index.files.filter((row) => row.state === "compatibility_alias_only").length === 1, index.files.filter((row) => row.state === "compatibility_alias_only").length);
check("test index has 2 no-direct labels", index.files.filter((row) => row.state === "no_direct_cases").length === 2, index.files.filter((row) => row.state === "no_direct_cases").length);
check("test index has 168 active labels", index.active_construction_count === 168 && index.files.length === 168, index.files.length);

const result = {
  schema: "canto-span-evaluation-scalar-question-wrapper-audit-v1",
  runtime_version: api.runtimeVersion,
  checkpoint: "v0.5.196-evaluation-scalar-question-wrapper-audit",
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
fs.writeFileSync(path.join(outDir, "evaluation-scalar-question-wrapper-audit.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
