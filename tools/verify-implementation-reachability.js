#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadRuntimeApi, internalConstruction } = require("../tests/lib/runtime-api");
const { loadConstructionNotes } = require("./construction-notes-lib");
const { currentValidationPath } = require("./validation-paths");

const root = path.resolve(__dirname, "..");
const api = loadRuntimeApi(path.join(root, "main.js"));
const probes = JSON.parse(fs.readFileSync(path.join(root, "test-data", "implementation-reachability-probes-v1.json"), "utf8"));
const index = JSON.parse(fs.readFileSync(path.join(root, "tests", "construction-test-index.json"), "utf8"));
const notes = loadConstructionNotes(root);
const activeLabels = new Set(notes.map((note) => note.frontmatter.construction));
const indexByLabel = new Map(index.files.map((item) => [item.construction, item]));
const probesByLabel = new Map();
const checks = [];
const failures = [];

function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail !== "" ? { detail: String(detail) } : {}) });
  if (!pass) failures.push({ name, detail: String(detail) });
}

check("probe schema", probes.schema === "canto-span-implementation-reachability-probes-v1", probes.schema);
check("probe runtime matches current runtime", probes.runtime_version === api.runtimeVersion, `${probes.runtime_version} != ${api.runtimeVersion}`);
check("global linguistic evidence weight is zero", probes.linguistic_evidence_weight === 0, probes.linguistic_evidence_weight);
check("construction index matches current notes", index.active_construction_count === activeLabels.size && index.files.length === activeLabels.size, `${index.files.length}/${activeLabels.size}`);

const caseIds = new Set();
for (const probe of probes.cases || []) {
  check(`${probe.case_id} case id is unique`, !caseIds.has(probe.case_id), probe.case_id);
  caseIds.add(probe.case_id);
  check(`${probe.case_id} targets active label`, activeLabels.has(probe.construction), probe.construction);
  check(`${probe.case_id} has zero evidence weight`, probe.linguistic_evidence_weight === 0 && probe.purpose === "runtime_reachability_only", `${probe.linguistic_evidence_weight}/${probe.purpose}`);
  check(`${probe.case_id} uses supported assertion`, ["construction_present", "compatibility_alias_present"].includes(probe.assertion), probe.assertion);
  if (!probesByLabel.has(probe.construction)) probesByLabel.set(probe.construction, []);
  probesByLabel.get(probe.construction).push(probe);

  let rows = [];
  try {
    rows = api.diagnosticFinalRows(api.analyzeLine(probe.source, probe.context_source || null))
      .filter((row) => row.kind === "construction");
  } catch (error) {
    check(`${probe.case_id} parses`, false, error.message || String(error));
    continue;
  }
  if (probe.assertion === "construction_present") {
    check(`${probe.case_id} reaches target`, rows.map(internalConstruction).includes(probe.construction), probe.source);
  } else {
    check(`${probe.case_id} exposes compatibility alias`, Boolean(probe.internal_construction)
      && rows.some((row) => row.compatibility_alias === probe.construction && internalConstruction(row) === probe.internal_construction), probe.source);
  }
}

for (const label of activeLabels) {
  const record = indexByLabel.get(label);
  const labelProbes = probesByLabel.get(label) || [];
  check(`${label} exists in construction index`, Boolean(record));
  if (!record) continue;
  const expectedState = labelProbes.length
    ? (labelProbes.every((item) => item.assertion === "compatibility_alias_present") ? "compatibility_alias_only" : "implementation_positive_only")
    : null;
  if (expectedState) {
    check(`${label} implementation coverage state`, record.state === expectedState, record.state);
    check(`${label} implementation probe count`, Number(record.implementation_probe_count) === labelProbes.length, `${record.implementation_probe_count}/${labelProbes.length}`);
    check(`${label} implementation probes do not count as linguistic positives`, Number(record.positive_case_count) === 0, record.positive_case_count);
  } else {
    check(`${label} needs no implementation probe unless coverage says so`, !["implementation_positive_only", "compatibility_alias_only", "no_direct_cases"].includes(record.state), record.state);
  }
}

check("no active construction remains uncovered", index.files.every((item) => item.state !== "no_direct_cases"), index.files.filter((item) => item.state === "no_direct_cases").map((item) => item.construction).join(","));
check("all probe labels occur in current index", [...probesByLabel.keys()].every((label) => indexByLabel.has(label)), probesByLabel.size);

const result = {
  schema: "canto-span-implementation-reachability-audit-v1",
  runtime_version: api.runtimeVersion,
  probe_case_count: probes.cases.length,
  probed_construction_count: probesByLabel.size,
  implementation_positive_only_labels: index.files.filter((item) => item.state === "implementation_positive_only").length,
  compatibility_alias_only_labels: index.files.filter((item) => item.state === "compatibility_alias_only").length,
  no_direct_labels: index.files.filter((item) => item.state === "no_direct_cases").length,
  linguistic_evidence_weight_added: 0,
  total: checks.length,
  passed: checks.length - failures.length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  checks,
  failures,
};
fs.writeFileSync(currentValidationPath(root, "implementation-reachability.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
