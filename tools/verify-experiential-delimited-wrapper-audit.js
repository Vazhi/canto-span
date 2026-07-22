#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadRuntimeApi, internalConstruction } = require("../tests/lib/runtime-api");

const root = path.resolve(__dirname, "..");
const api = loadRuntimeApi(path.join(root, "main.js"));
const probes = JSON.parse(fs.readFileSync(path.join(root, "test-data", "experiential-delimited-reachability-probes-v1.json"), "utf8"));
const index = JSON.parse(fs.readFileSync(path.join(root, "tests", "construction-test-index.json"), "utf8"));
const indexByLabel = new Map(index.files.map((row) => [row.construction, row]));
const auditedLabels = [
  "NegativeExperiential",
  "ExperientialQuestion",
  "ExperientialMotionGoalVP",
  "MotionDelimitedVP",
  "CognitionDelimitedVP",
  "CognitionDelimitedObjectVP",
];
const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail ? { detail: String(detail) } : {}) });
  if (!pass) failures.push({ name, detail: String(detail) });
}
function labels(source) {
  return api.diagnosticFinalRows(api.analyzeLine(source, null))
    .filter((row) => row.kind === "construction")
    .map(internalConstruction)
    .filter(Boolean);
}

check("runtime version is 0.5.194", api.runtimeVersion === "0.5.194", api.runtimeVersion);
check("probe schema", probes.schema === "canto-span-experiential-delimited-reachability-probes-v1", probes.schema);
check("probe file has seven cases", probes.cases.length === 7, probes.cases.length);
check("all probes have zero evidence weight", probes.linguistic_evidence_weight === 0 && probes.cases.every((row) => row.linguistic_evidence_weight === 0 && row.purpose === "runtime_reachability_only"));
check("six labels audited", new Set(probes.cases.map((row) => row.construction)).size === 6);

for (const probe of probes.cases) {
  const output = labels(probe.source);
  check(`${probe.case_id} reaches ${probe.construction}`, output.includes(probe.construction), `${probe.source}:${output.join(",")}`);
}
for (const label of auditedLabels) {
  const row = indexByLabel.get(label);
  const expectedCount = label === "NegativeExperiential" ? 2 : 1;
  check(`${label} coverage is implementation only`, row?.state === "implementation_positive_only", row?.state || "missing");
  check(`${label} implementation probe count`, Number(row?.implementation_probe_count) === expectedCount, row?.implementation_probe_count);
  check(`${label} direct positive count stays zero`, Number(row?.positive_case_count) === 0, row?.positive_case_count);
  check(`${label} boundary count stays zero`, Number(row?.boundary_case_count) === 0, row?.boundary_case_count);
  const notePaths = [path.join(root, "grammar", "active", `${label}.md`), path.join(root, "grammar", "archived", `${label}.md`)];
  const notePath = notePaths.find((file) => fs.existsSync(file));
  const text = notePath ? fs.readFileSync(notePath, "utf8") : "";
  check(`${label} note records CP035 reachability`, text.includes("CP035-P1 experiential and delimited wrapper audit") && text.includes("linguistic evidence weight is **0**"), notePath ? path.relative(root, notePath) : "missing");
}

const meiObject = labels("我未見過王小姐。");
check("preverbal 未 object statement currently misroutes to ExperientialQuestion", meiObject.includes("ExperientialQuestion") && !meiObject.includes("NegativeExperiential"), meiObject.join(","));
const mouObject = labels("我冇睇過今日嘅報紙。");
check("冇 object statement currently loses NegativeExperiential", mouObject.includes("ExperientialVP") && !mouObject.includes("NegativeExperiential"), mouObject.join(","));
const yauMou = labels("你有冇去過澳門呀？");
check("有冇 experiential question currently misses ExperientialQuestion", !yauMou.includes("ExperientialQuestion"), yauMou.join(","));
const cognitionClause = labels("你諗下係唔係。");
check("source-linked cognition polar continuation currently misses delimited wrappers", !cognitionClause.includes("CognitionDelimitedVP") && !cognitionClause.includes("CognitionDelimitedObjectVP"), cognitionClause.join(","));

check("registry remains 168 labels", api.labels.length === 168, api.labels.length);
check("42 labels are implementation positive only", index.files.filter((row) => row.state === "implementation_positive_only").length === 42, index.files.filter((row) => row.state === "implementation_positive_only").length);
check("23 labels remain no-direct", index.files.filter((row) => row.state === "no_direct_cases").length === 23, index.files.filter((row) => row.state === "no_direct_cases").length);

const result = {
  schema: "canto-span-experiential-delimited-wrapper-audit-v1",
  runtime_version: api.runtimeVersion,
  checkpoint: "v0.5.194-experiential-delimited-wrapper-audit",
  parser_recognized_span_behavior_changed: false,
  retained_linguistic_status_changed: false,
  labels_audited: auditedLabels.length,
  implementation_probes_added: probes.cases.length,
  labels_retired: 0,
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
fs.writeFileSync(path.join(outDir, "experiential-delimited-wrapper-audit.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
