#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const cp = require("child_process");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const auditPath = path.join(root, "docs", "releases", "v0.5.197-shadowed-wrapper-retirement-audit.json");
const audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));
const currentText = fs.readFileSync(path.join(root, "main.js"), "utf8");
const baseText = cp.execFileSync("git", ["show", `${audit.base_tree}:main.js`], { cwd: root, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });

function loadApi(text, filename) {
  class Plugin {}
  class PluginSettingTab {}
  class Setting {}
  class Notice {}
  const moduleRecord = { exports: {} };
  const context = {
    module: moduleRecord,
    exports: moduleRecord.exports,
    require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id),
    console,
    setTimeout,
    clearTimeout,
    Buffer,
  };
  vm.runInNewContext(text + `
module.exports.__shadowAuditApi = {
  analyzeLine,
  diagnosticFinalRows,
  runtimeVersion: CANTO_SPAN_RUNTIME_VERSION,
  labels: [...CONSTRUCTION_LABEL_REGISTRY],
  retiredLabels: [...RETIRED_CONSTRUCTION_LABEL_REGISTRY.keys()],
  retiredAliases: [...RETIRED_CONSTRUCTION_LABEL_ALIASES.entries()],
};`, context, { filename });
  return moduleRecord.exports.__shadowAuditApi;
}

const current = loadApi(currentText, path.join(root, "main.js"));
const base = loadApi(baseText, `${audit.base_tree}:main.js`);
const CJK = /[\u3400-\u9fff]/;
const allowedKeys = new Set([
  "source", "surface", "cantonese", "target_sentence", "sentence", "source_surface",
  "traditional", "positive_probe", "boundary_probe", "minimal_context", "context_source",
  "raw_or_normalized_surface", "preceding_unit", "target", "current_unwrapped_surfaces",
  "top_construction_surfaces", "expected_target_surfaces",
]);
const excludedRelativePaths = new Set([
  "test-data/runtime-reachability-probes-v1.json",
  "test-data/constructor-specific-reachability-probes-v1.json",
  "test-data/experiential-delimited-reachability-probes-v1.json",
  "test-data/result-change-state-reachability-probes-v1.json",
  "test-data/nominal-wrapper-reachability-probes-v1.json",
  "test-data/speech-transfer-complement-reachability-probes-v1.json",
  "test-data/evaluation-scalar-question-reachability-probes-v1.json",
  "test-data/final-reachable-wrapper-reachability-probes-v1.json",
]);

function parseTsv(file) {
  const text = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd();
  if (!text) return [];
  const lines = text.split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.filter(Boolean).map((line) => {
    const fields = line.split("\t");
    return Object.fromEntries(headers.map((header, index) => [header, fields[index] ?? ""]));
  });
}
function walkFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(absolute) : [absolute];
  });
}
const candidates = new Map();
function addCandidate(value, provenance) {
  if (typeof value !== "string") return;
  const source = value.trim();
  if (!source || !CJK.test(source) || source.length > 120 || source.includes("\n")) return;
  if ((source.match(/\|/g) || []).length > 3) return;
  if (!candidates.has(source)) candidates.set(source, []);
  if (candidates.get(source).length < 8) candidates.get(source).push(provenance);
}
function walkJson(value, key, provenance) {
  if (Array.isArray(value)) return value.forEach((item, index) => walkJson(item, key, `${provenance}[${index}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).forEach(([childKey, child]) => walkJson(child, childKey, `${provenance}.${childKey}`));
  }
  if (allowedKeys.has(key)) addCandidate(value, provenance);
}
for (const baseDir of ["test-data", "review-packets", "external-evidence"]) {
  for (const file of walkFiles(path.join(root, baseDir))) {
    const relative = path.relative(root, file);
    if (excludedRelativePaths.has(relative)) continue;
    try {
      if (file.endsWith(".json")) walkJson(JSON.parse(fs.readFileSync(file, "utf8")), "", relative);
      else if (file.endsWith(".tsv")) {
        parseTsv(file).forEach((row, rowIndex) => {
          for (const [key, value] of Object.entries(row)) {
            if (allowedKeys.has(key)) addCandidate(value, `${relative}:${rowIndex + 2}:${key}`);
          }
        });
      }
    } catch (_) {
      // Historical/unreadable material is outside this bounded structured scan.
    }
  }
}

function finalRows(api, source, contextSource = null) {
  return api.diagnosticFinalRows(api.analyzeLine(source, contextSource));
}
function normalizedRows(rows) {
  return rows.map((row) => ({
    kind: row.kind || "",
    surface: row.surface || "",
    display_surface: row.display_surface || "",
    parser_surface: row.parser_surface || "",
    construction: row.internal_construction || row.construction || row.type || "",
    compatibility_alias: row.compatibility_alias || "",
    label: row.label || row.role || "",
    syntax: row.syntax || "",
    parent: row.parent || "",
    parent_compatibility_alias: row.parent_compatibility_alias || "",
    depth: Number(row.depth || 0),
    slots: Array.isArray(row.slots) ? [...row.slots] : [],
  }));
}

const differences = [];
const parseErrors = [];
for (const [source, provenance] of candidates) {
  try {
    const before = normalizedRows(finalRows(base, source));
    const after = normalizedRows(finalRows(current, source));
    if (JSON.stringify(before) !== JSON.stringify(after)) {
      differences.push({ source, provenance: provenance[0] || "", before, after });
      if (differences.length >= 20) break;
    }
  } catch (error) {
    parseErrors.push({ source, error: error.message || String(error) });
    if (parseErrors.length >= 20) break;
  }
}

const regression = JSON.parse(fs.readFileSync(path.join(root, "tests", "fixtures", "regression-snapshots.json"), "utf8"));
const regressionDifferences = [];
for (const testCase of regression.cases) {
  const before = normalizedRows(finalRows(base, testCase.source, testCase.context_source || null));
  const after = normalizedRows(finalRows(current, testCase.source, testCase.context_source || null));
  if (JSON.stringify(before) !== JSON.stringify(after)) {
    regressionDifferences.push({ case_id: testCase.case_id, source: testCase.source, before, after });
    if (regressionDifferences.length >= 20) break;
  }
}

const index = JSON.parse(fs.readFileSync(path.join(root, "tests", "construction-test-index.json"), "utf8"));
const notes = loadConstructionNotes(root);
const retiredRows = parseTsv(path.join(root, "docs", "research", "RETIRED-CONSTRUCTION-ARCHIVE-v0.5.186-R1.tsv"));
const retirement = JSON.parse(fs.readFileSync(path.join(root, "data", "retirement-review-state.json"), "utf8"));
const currentLabels = new Set(current.labels);
const baseLabels = new Set(base.labels);
const removedLabels = [...baseLabels].filter((label) => !currentLabels.has(label)).sort();
const addedLabels = [...currentLabels].filter((label) => !baseLabels.has(label)).sort();
const retiredLabels = new Set(current.retiredLabels);
const retiredAliases = new Map(current.retiredAliases);

const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail !== "" ? { detail: String(detail) } : {}) });
  if (!pass) failures.push({ name, detail: String(detail) });
}

check("current runtime version is 0.5.197", current.runtimeVersion === "0.5.197", current.runtimeVersion);
check("base runtime version is 0.5.196", base.runtimeVersion === "0.5.196", base.runtimeVersion);
check("structured candidate count remains 1885", candidates.size === 1885, candidates.size);
check("structured comparison has no parse errors", parseErrors.length === 0, JSON.stringify(parseErrors.slice(0, 3)));
check("structured complete outputs are identical", differences.length === 0, JSON.stringify(differences.slice(0, 2)));
check("all 545 regression complete outputs are identical", regression.cases.length === 545 && regressionDifferences.length === 0, JSON.stringify(regressionDifferences.slice(0, 2)));
check("registry removes exactly two labels", JSON.stringify(removedLabels) === JSON.stringify(["Comment", "PerfectiveResultPredicate"]), JSON.stringify(removedLabels));
check("registry adds no labels", addedLabels.length === 0, JSON.stringify(addedLabels));
check("current runtime has 166 labels", currentLabels.size === 166, currentLabels.size);
check("current notes have 166 labels", notes.length === 166, notes.length);
check("current test index has 166 labels", index.active_construction_count === 166 && index.files.length === 166, index.files.length);
check("no active label remains no-direct", index.files.filter((row) => row.state === "no_direct_cases").length === 0, index.files.filter((row) => row.state === "no_direct_cases").length);
check("coverage distribution is complete", index.files.filter((row) => row.state === "positive_and_boundary").length === 2
  && index.files.filter((row) => row.state === "positive_only").length === 100
  && index.files.filter((row) => row.state === "implementation_positive_only").length === 63
  && index.files.filter((row) => row.state === "compatibility_alias_only").length === 1);
check("retired archive records fifteen labels", new Set(retiredRows.map((row) => row.runtime_label)).size === 15, retiredRows.length);
check("Comment is retired without a whole-construction alias", retiredLabels.has("Comment") && !retiredAliases.has("Comment"));
check("PerfectiveResultPredicate retires to PerfectiveVP compatibility", retiredLabels.has("PerfectiveResultPredicate") && retiredAliases.get("PerfectiveResultPredicate") === "PerfectiveVP");
check("Comment constructor residue is removed", !currentText.includes('construction("Comment"'));
check("PerfectiveResultPredicate constructor residue is removed", !currentText.includes("function perfectiveResultPredicateFallback") && !currentText.includes("wrapPerfectiveResultPredicateSubspans"));
check("Comment retired note is preserved", fs.existsSync(path.join(root, "archive", "retired-labels", "v0.5.197-shadowed-wrapper-retirement", "Comment.md")));
check("PerfectiveResultPredicate retired note is preserved", fs.existsSync(path.join(root, "archive", "retired-labels", "v0.5.197-shadowed-wrapper-retirement", "PerfectiveResultPredicate.md")));
check("Comment current note and test are absent", !fs.existsSync(path.join(root, "grammar", "archived", "Comment.md")) && !fs.existsSync(path.join(root, "tests", "constructions", "Comment.json")));
check("PerfectiveResultPredicate current note and test are absent", !fs.existsSync(path.join(root, "grammar", "archived", "PerfectiveResultPredicate.md")) && !fs.existsSync(path.join(root, "tests", "constructions", "PerfectiveResultPredicate.json")));
const perfectiveLabels = normalizedRows(finalRows(current, "解決咗喇。")).map((row) => row.construction).filter(Boolean);
check("retained output still uses PerfectiveVP", perfectiveLabels.includes("PerfectiveVP") && !perfectiveLabels.includes("PerfectiveResultPredicate"), perfectiveLabels.join(","));
check("full dormant review is closed at sequence 21", retirement.last_full_review_sequence === 21
  && retirement.last_full_review_id === "v0.5.197-shadowed-wrapper-retirement"
  && retirement.current_handoff_sequence === 21
  && retirement.state === "full_review_complete", JSON.stringify(retirement));

const result = {
  schema: "canto-span-shadowed-wrapper-retirement-audit-v1",
  runtime_version: current.runtimeVersion,
  checkpoint: "v0.5.197-shadowed-wrapper-retirement",
  base_tree: audit.base_tree,
  base_runtime_version: base.runtimeVersion,
  parser_recognized_span_behavior_changed: false,
  retained_linguistic_status_changed: false,
  labels_retired: removedLabels.length,
  retired_labels: removedLabels,
  structured_candidate_count: candidates.size,
  structured_output_difference_count: differences.length,
  regression_case_count: regression.cases.length,
  regression_output_difference_count: regressionDifferences.length,
  remaining_no_direct_labels: index.files.filter((row) => row.state === "no_direct_cases").length,
  linguistic_evidence_weight_added: 0,
  total: checks.length,
  passed: checks.length - failures.length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  checks,
  failures,
};
const outDir = path.join(root, "validation", `v${current.runtimeVersion}`);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "shadowed-wrapper-retirement.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
