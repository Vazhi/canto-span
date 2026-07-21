#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { loadConstructionNotes } = require("./construction-notes-lib");
const { REQUIRED_FIELDS, countSourceRecords, countVerifiedSourceRecords, corpusClassificationTotal } = require("./promotion-gate-lib");

const root = path.resolve(__dirname, "..");
const notes = loadConstructionNotes(root);
const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail ? { detail } : {}) });
  if (!pass) failures.push({ name, detail });
}

function loadRuntime() {
  class Plugin {}
  class PluginSettingTab {}
  class Setting {}
  class Notice {}
  const moduleObject = { exports: {} };
  const context = {
    module: moduleObject,
    exports: moduleObject.exports,
    require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id),
    console, setTimeout, clearTimeout, Buffer,
  };
  const file = path.join(root, "main.js");
  vm.runInNewContext(
    fs.readFileSync(file, "utf8") + "\nmodule.exports.__notesAudit={runtimeVersion:CANTO_SPAN_RUNTIME_VERSION,labels:[...CONSTRUCTION_LABEL_REGISTRY]};",
    context,
    { filename: file }
  );
  return moduleObject.exports.__notesAudit;
}

const runtime = loadRuntime();
const byLabel = new Map();
for (const note of notes) {
  const fm = note.frontmatter;
  const label = fm.construction;
  if (byLabel.has(label)) failures.push({ name: "unique construction", detail: label });
  byLabel.set(label, note);
  const filename = path.basename(note.file, ".md");
  check(`filename matches construction: ${filename}`, filename === label, `${filename} != ${label}`);
  for (const field of [...new Set(["title", "type", "construction", "status", "confidence", "claim_layer", "lane", "last_reviewed", ...REQUIRED_FIELDS, "standard_test_file", "standard_test_coverage", "standard_positive_test_count", "standard_boundary_test_count", "standard_executable_test_count", "source_ids", "runtime_active", "workflow_state", "workflow_priority", "workflow_since", "workflow_reason"])]) {
    check(`${label} has ${field}`, Object.prototype.hasOwnProperty.call(fm, field));
  }
  check(`${label} type is construction`, fm.type === "canto-span-construction", String(fm.type));
  check(`${label} workflow state controlled`, ["active", "archived"].includes(fm.workflow_state), String(fm.workflow_state));
  check(`${label} workflow path matches state`, path.dirname(note.file) === path.join(root, "grammar", String(fm.workflow_state)), note.file);
  check(`${label} active priority present`, fm.workflow_state !== "active" || (Number.isInteger(fm.workflow_priority) && fm.workflow_priority > 0), String(fm.workflow_priority));
  check(`${label} archived priority absent`, fm.workflow_state !== "archived" || fm.workflow_priority === null, String(fm.workflow_priority));
  check(`${label} workflow date valid`, /^\d{4}-\d{2}-\d{2}$/.test(String(fm.workflow_since)), String(fm.workflow_since));
  check(`${label} workflow reason present`, typeof fm.workflow_reason === "string" && fm.workflow_reason.length > 0, String(fm.workflow_reason));
  check(`${label} source count matches IDs`, Number(fm.source_count) === (Array.isArray(fm.source_ids) ? fm.source_ids.length : -1));
  const sourceRecordCount = countSourceRecords(note);
  const verificationCount = countVerifiedSourceRecords(note);
  check(`${label} source count matches source records`, Number(fm.source_count) === sourceRecordCount, `${fm.source_count} != ${sourceRecordCount}`);
  check(`${label} verified source count matches source records`, Number(fm.verified_source_count) === verificationCount, `${fm.verified_source_count} != ${verificationCount}`);
  check(`${label} verified sources do not exceed cited sources`, Number(fm.verified_source_count) <= Number(fm.source_count));
  check(`${label} promotion gate version`, fm.promotion_gate_version === "v3", String(fm.promotion_gate_version));
  check(`${label} panel evidence model version`, fm.panel_evidence_model_version === "v2", String(fm.panel_evidence_model_version));
  check(`${label} eligible panel responses do not exceed total`, Number(fm.eligible_panel_response_count) <= Number(fm.panel_response_count_total), `${fm.eligible_panel_response_count} > ${fm.panel_response_count_total}`);
  check(`${label} minimum usable item n does not exceed eligible panel responses`, Number(fm.minimum_usable_judgments_per_critical_item) <= Number(fm.eligible_panel_response_count), `${fm.minimum_usable_judgments_per_critical_item} > ${fm.eligible_panel_response_count}`);
  check(`${label} recruitment channels are an array`, Array.isArray(fm.recruitment_channels));
  check(`${label} respondent role-neutral flag is boolean`, typeof fm.respondent_role_neutral === "boolean", String(fm.respondent_role_neutral));
  check(`${label} panel review state path`, fm.panel_review_state_file === "review-packets/native-panel/active-v2/panel-review-state.json", String(fm.panel_review_state_file));
  check(`${label} panel policy path`, fm.panel_policy_file === "review-packets/native-panel/active-v2/panel-policy.json", String(fm.panel_policy_file));
  check(`${label} panel review state exists`, fs.existsSync(path.join(root, fm.panel_review_state_file)));
  check(`${label} panel policy exists`, fs.existsSync(path.join(root, fm.panel_policy_file)));
  check(`${label} instrument version present when panel evidence exists`, Number(fm.panel_response_count_total) === 0 || typeof fm.survey_instrument_version === "string");
  const classifiedHits = corpusClassificationTotal(fm);
  check(`${label} reviewed corpus hits are fully classified`, fm.corpus_hits_reviewed !== true || classifiedHits === Number(fm.corpus_candidate_hit_count), `${classifiedHits} != ${fm.corpus_candidate_hit_count}`);
  check(`${label} passing boundaries require executable boundaries`, fm.negative_tests_passing !== true || fm.negative_tests_executable === true);
  check(`${label} executable boundaries require drafted boundaries`, fm.negative_tests_executable !== true || fm.negative_cases_drafted === true);
  const standardTestPath = path.join(root, String(fm.standard_test_file || ""));
  check(`${label} standard test file path`, fm.standard_test_file === `tests/constructions/${label}.json`, String(fm.standard_test_file));
  check(`${label} standard test file exists`, fs.existsSync(standardTestPath), String(fm.standard_test_file));
  if (fs.existsSync(standardTestPath)) {
    const testSpec = JSON.parse(fs.readFileSync(standardTestPath, "utf8"));
    check(`${label} standard test construction matches`, testSpec.construction === label, String(testSpec.construction));
    check(`${label} standard coverage matches`, testSpec.coverage?.state === fm.standard_test_coverage, `${testSpec.coverage?.state} != ${fm.standard_test_coverage}`);
    check(`${label} standard positive count matches`, Number(testSpec.coverage?.positive_case_count) === Number(fm.standard_positive_test_count), `${testSpec.coverage?.positive_case_count} != ${fm.standard_positive_test_count}`);
    check(`${label} standard boundary count matches`, Number(testSpec.coverage?.boundary_case_count) === Number(fm.standard_boundary_test_count), `${testSpec.coverage?.boundary_case_count} != ${fm.standard_boundary_test_count}`);
    check(`${label} standard executable count matches`, Number(testSpec.coverage?.executable_case_count) === Number(fm.standard_executable_test_count), `${testSpec.coverage?.executable_case_count} != ${fm.standard_executable_test_count}`);
    check(`${label} executable-boundary flag matches standard cases`, fm.negative_tests_executable !== true || Number(testSpec.coverage?.boundary_case_count) > 0);
  }
  check(`${label} has plain-language claim`, /## Plain-language claim\n\n\S/.test(note.body));
  check(`${label} has boundary section`, /## Negative and boundary cases/.test(note.body));
  check(`${label} has no aliased wiki links`, !/\[\[[^\]]+\|[^\]]+\]\]/.test(note.text));
}

const runtimeLabels = new Set(runtime.labels);
const noteLabels = new Set(byLabel.keys());
check("exactly 170 construction notes", notes.length === 170, String(notes.length));
check("exactly two active working notes", notes.filter((note) => note.frontmatter.workflow_state === "active").length === 2, String(notes.filter((note) => note.frontmatter.workflow_state === "active").length));
check("exactly 168 archived working notes", notes.filter((note) => note.frontmatter.workflow_state === "archived").length === 168, String(notes.filter((note) => note.frontmatter.workflow_state === "archived").length));
check("exactly 170 standard construction test files", fs.readdirSync(path.join(root, "tests", "constructions")).filter((name) => name.endsWith(".json")).length === 170);
check("runtime has 170 active labels", runtimeLabels.size === 170, String(runtimeLabels.size));
check("notes exactly match runtime labels", noteLabels.size === runtimeLabels.size && [...runtimeLabels].every((label) => noteLabels.has(label)));
check("all notes are runtime active", notes.every((note) => note.frontmatter.runtime_active === true));

for (const note of notes) {
  for (const target of [...note.text.matchAll(/\[\[([^\]|]+)\]\]/g)].map((m) => m[1])) {
    check(`${note.frontmatter.construction} link target exists: ${target}`, noteLabels.has(target), target);
  }
}

const snapshotFile = path.join(root, "archive", "registry-pre-obsidian-v0.5.184", "full-construction-registry.json");
check("frozen full-schema snapshot exists", fs.existsSync(snapshotFile));
if (fs.existsSync(snapshotFile)) {
  const snapshot = JSON.parse(fs.readFileSync(snapshotFile, "utf8"));
  check("snapshot has 171 records", snapshot.records?.length === 171, String(snapshot.records?.length));
}

const counts = {};
for (const note of notes) counts[note.frontmatter.status] = (counts[note.frontmatter.status] || 0) + 1;
const expectedCounts = {
  research_pending: 60,
  unsupported_generalization: 87,
  parser_heuristic: 20,
  lexicalized_only: 3,
};
check("status counts match v0.5.187 panel-model migration", Object.entries(expectedCounts).every(([status, count]) => counts[status] === count) && Object.keys(counts).length === Object.keys(expectedCounts).length, JSON.stringify(counts));

const result = {
  schema: "canto-span-construction-notes-validation-v2",
  runtime_version: runtime.runtimeVersion,
  construction_notes: notes.length,
  status_counts: counts,
  total: checks.length,
  passed: checks.filter((c) => c.pass).length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};
const outDir = path.join(root, "validation", `v${runtime.runtimeVersion}`);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "construction-notes.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
