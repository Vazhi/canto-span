#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi, internalConstruction } = require("../tests/lib/runtime-api");

const root = path.resolve(__dirname, "..");
const api = loadRuntimeApi(path.join(root, "main.js"));
const specPath = path.join(root, "test-data", "rul-survey-readiness-probes-v1.json");
const requirementsPath = path.join(root, "docs", "research", "CP032-P1-RUL01-CONTRAST-REQUIREMENTS-R1.tsv");
const checkpointPath = path.join(root, "docs", "research", "CP032-P1-RUL01-SURVEY-READINESS-R1.md");
const lifecycleRelativePath = "review-packets/native-panel/active-v2/followup-draft-v1-metadata.json";
const lifecyclePath = path.join(root, lifecycleRelativePath);
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const checkpoint = fs.readFileSync(checkpointPath, "utf8");
const lifecycle = JSON.parse(fs.readFileSync(lifecyclePath, "utf8"));
const requirementLines = fs.readFileSync(requirementsPath, "utf8").trimEnd().split(/\r?\n/);
const headers = requirementLines.shift().split("\t");
const requirements = requirementLines.filter(Boolean).map((line) =>
  Object.fromEntries(headers.map((header, index) => [header, line.split("\t")[index] || ""]))
);
const checks = [];
const failures = [];

function check(name, pass, detail = null) {
  const row = { name, pass: Boolean(pass) };
  if (detail !== null) row.detail = detail;
  checks.push(row);
  if (!row.pass) failures.push(row);
}
function runtimeProfile(surface) {
  const rows = api.diagnosticFinalRows(api.analyzeLine(surface)).filter((row) => row.kind === "construction");
  const labels = rows.map(internalConstruction).filter(Boolean);
  if (labels.includes("ResourceUseLaiFunctionRelation")) return "narrow_target";
  if (labels.includes("IntendedFunctionRelation")) return "broad_relation";
  return "no_relation";
}

check("probe schema exact", spec.schema === "canto-span-rul-survey-readiness-probes-v1");
check("probe construction exact", spec.construction === "ResourceUseLaiFunctionRelation");
check("generated probes have zero linguistic evidence weight", spec.evidence_weight === "none_implementation_mapping_only");
check("thirty implementation probes frozen", spec.cases.length === 30, String(spec.cases.length));
check("probe case ids unique", new Set(spec.cases.map((item) => item.case_id)).size === spec.cases.length);
check("twelve contrast requirements recorded", requirements.length === 12, String(requirements.length));
check("requirement ids unique", new Set(requirements.map((item) => item.requirement_id)).size === requirements.length);
check("every requirement records an unresolved question", requirements.every((item) => item.unresolved_question));
check("every requirement records an instrument requirement", requirements.every((item) => item.instrument_requirement));
check(
  "CP032 preserves its historical user-prompt checkpoint",
  /survey prompt required before instrument creation/i.test(checkpoint) && /user's survey-creation prompt/i.test(checkpoint),
);
check("checkpoint forbids treating probes as linguistic evidence", /zero linguistic\s+evidence weight/i.test(checkpoint));
check("checkpoint records competing instrumental SVC analysis", /Instrumental serial verb constructions/i.test(checkpoint));
check("current lifecycle owner is the follow-up metadata", lifecycle.instrument_id === "YUE-JUDGMENT-FOLLOWUP-01-DRAFT");
check("live pilot remains in collection", lifecycle.current_live_instrument?.status === "collection_in_progress");
check("follow-up remains a non-deployable draft", lifecycle.instrument_status === "draft_followup" && lifecycle.deployment_allowed === false);

const results = [];
for (const item of spec.cases) {
  const actual = runtimeProfile(item.surface);
  const pass = actual === item.expected_runtime_profile;
  results.push({ ...item, actual_runtime_profile: actual, pass });
  check(`${item.case_id} runtime profile`, pass, `${actual} != ${item.expected_runtime_profile}`);
}

const report = {
  schema: "canto-span-rul-survey-readiness-audit-v2",
  runtime_version: api.runtimeVersion,
  record_role: "historical_readiness_provenance",
  historical_checkpoint: path.relative(root, checkpointPath),
  current_lifecycle_owner: lifecycleRelativePath,
  current_lifecycle: {
    live_instrument_id: lifecycle.current_live_instrument?.instrument_id || null,
    live_instrument_status: lifecycle.current_live_instrument?.status || null,
    followup_instrument_id: lifecycle.instrument_id,
    followup_instrument_status: lifecycle.instrument_status,
    followup_deployment_allowed: lifecycle.deployment_allowed,
  },
  current_blocking_transition: "close_live_pilot_and_complete_item_audit_before_followup_revision",
  parser_behavior_changed: false,
  linguistic_status_changed: false,
  probe_count: spec.cases.length,
  contrast_requirement_count: requirements.length,
  check_count: checks.length,
  passed: checks.filter((row) => row.pass).length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  results,
  failures,
};
const outDir = path.join(root, "validation", "current");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "rul-survey-readiness.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
