#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MANIFEST_PATH = path.join(ROOT, "test-data", "review-only-readiness.tsv");
const CURRENT_DOCS = [
  "docs/current/PROJECT-STATE.md",
  "docs/current/DOCTRINE.md",
  "docs/current/WORKFLOW.md",
  "docs/current/EVIDENCE-AND-PROVENANCE.md",
  "docs/current/VALIDATION-AND-ACCEPTANCE.md",
];

function parseTsv(filePath) {
  const text = fs.readFileSync(filePath, "utf8").trim();
  if (!text) return [];
  const lines = text.split(/\r?\n/).map((line) => line.split("\t"));
  const header = lines.shift();
  return lines.map((fields) => Object.fromEntries(header.map((name, index) => [name, fields[index] || ""])));
}

function expectedUnits() {
  const units = [];
  const inventories = [
    ["w17-functional-corpus", "w17-functional-corpus.tsv", "id", "traditional"],
    ["w17-lexicon", "w17-lexicon.tsv", "id", "surface"],
    ["w17-grammar-phrases", "w17-grammar-phrases.tsv", "id", "traditional"],
    ["w17-phonics-pairs", "w17-phonics-pairs.tsv", "id", null],
  ];
  for (const [inventory, filename, idKey, surfaceKey] of inventories) {
    for (const row of parseTsv(path.join(ROOT, "test-data", filename))) {
      const surface = surfaceKey ? row[surfaceKey] : `${row.word_a} / ${row.word_b}`;
      units.push({ inventory, id: row[idKey], surface, lifecycle_status: row.lifecycle_status || "REVIEW_ONLY" });
    }
  }
  parseTsv(path.join(ROOT, "test-data", "w17-naturalized-alternatives.tsv")).forEach((row, index) => {
    units.push({ inventory: "w17-naturalized-alternatives", id: `ALT-W17-${String(index + 1).padStart(3, "0")}`, surface: row.traditional, lifecycle_status: row.lifecycle_status || "REVIEW_ONLY" });
  });
  return units;
}

function expectedWindow(score, blocker) {
  if (blocker) return "HOLD_EXTERNAL_EVIDENCE";
  if (score >= 75) return "AUDIT_NOW";
  if (score >= 60) return "AUDIT_WITH_OWNER_OR_NEXT_MILESTONE";
  if (score >= 40) return "AUDIT_AFTER_DEPENDENCY";
  return "DEFER_LOW_READINESS";
}

const manifest = parseTsv(MANIFEST_PATH);
const expected = expectedUnits();
const checks = [];
const failures = [];

function check(name, pass, details = {}) {
  const item = { name, pass: Boolean(pass), ...details };
  checks.push(item);
  if (!pass) failures.push(item);
}

check("manifest tracks all 97 original review-only units", manifest.length === 97, { observed: manifest.length, expected: 97 });
for (const rel of CURRENT_DOCS) check(`current doctrine file exists: ${rel}`, fs.existsSync(path.join(ROOT, rel)), { path: rel });
check("obsolete IMPACT-BACKLOG is not required", !fs.existsSync(path.join(ROOT, "docs/current/IMPACT-BACKLOG.json")), { policy: "readiness history is canonical in review-only-readiness.tsv; current workflow is canonical in docs/current" });

const expectedKeys = new Map(expected.map((row) => [`${row.inventory}\u0000${row.id}`, row]));
const manifestKeys = new Map();
for (const row of manifest) {
  const key = `${row.source_inventory}\u0000${row.source_item_id}`;
  check(`${row.audit_task_id} has unique source key`, !manifestKeys.has(key), { key });
  manifestKeys.set(key, row);
  const source = expectedKeys.get(key);
  check(`${row.audit_task_id} maps to a declared source`, Boolean(source), { key });
  if (source) {
    check(`${row.audit_task_id} preserves source surface`, row.source_surface === source.surface, { observed: row.source_surface, expected: source.surface });
    const promoted = source.lifecycle_status === "PROMOTED_ACCEPTED";
    check(`${row.audit_task_id} manifest lifecycle matches source`, promoted ? row.current_audit_state === "PROMOTED_ACCEPTED" : row.current_audit_state !== "PROMOTED_ACCEPTED", { source_lifecycle: source.lifecycle_status, manifest_state: row.current_audit_state });
  }

  const components = ["promotion_value", "evidence_maturity", "runtime_alignment", "dependency_closure", "staleness_pressure"].map((name) => Number(row[name]));
  const score = Number(row.audit_priority_score);
  check(`${row.audit_task_id} has numeric scoring components`, components.every(Number.isFinite) && Number.isFinite(score));
  check(`${row.audit_task_id} score equals component sum`, components.reduce((a, b) => a + b, 0) === score, { components, score });
  const promoted = source && source.lifecycle_status === "PROMOTED_ACCEPTED";
  const requiredWindow = promoted ? "COMPLETE_PROMOTED" : expectedWindow(score, row.external_blocker);
  check(`${row.audit_task_id} uses the correct lifecycle window`, row.audit_window === requiredWindow, { observed: row.audit_window, expected: requiredWindow });
  check(`${row.audit_task_id} declares a promotion target`, Boolean(row.promotion_target));
  check(`${row.audit_task_id} declares an owner`, Boolean(row.owner_task_id));
  check(`${row.audit_task_id} declares an audit trigger`, Boolean(row.audit_trigger));
  check(`${row.audit_task_id} retains readiness history`, Boolean(row.last_audited_runtime) && Boolean(row.observed_runtime_status) && Boolean(row.notes));
  if (promoted) check(`${row.audit_task_id} records accepted audit runtime`, row.last_audited_runtime === "0.5.161", { observed: row.last_audited_runtime });
}

for (const [key, source] of expectedKeys) check(`tracked source ${source.id} has readiness history`, manifestKeys.has(key), { inventory: source.inventory, source: source.surface });

const promotedRows = manifest.filter((row) => row.current_audit_state === "PROMOTED_ACCEPTED");
const activeRows = manifest.filter((row) => row.current_audit_state !== "PROMOTED_ACCEPTED");
const countsByInventory = {};
const countsByWindow = {};
for (const row of activeRows) {
  countsByInventory[row.source_inventory] = (countsByInventory[row.source_inventory] || 0) + 1;
  countsByWindow[row.audit_window] = (countsByWindow[row.audit_window] || 0) + 1;
}

check("69 units remain promoted after CP021B reopens one bare-GIVE item", promotedRows.length === 69, { observed: promotedRows.length, expected: 69 });
check("28 units remain review-only", activeRows.length === 28, { observed: activeRows.length, expected: 28 });

const output = {
  schema: "canto-span-review-only-readiness-audit-v3",
  policy: "The canonical readiness history is test-data/review-only-readiness.tsv. Current workflow and acceptance doctrine are maintained in docs/current. The deleted IMPACT-BACKLOG.json is historical and must not be restored as an active dependency.",
  tracked_unit_count: manifest.length,
  review_only_unit_count: activeRows.length,
  promoted_accepted_count: promotedRows.length,
  readiness_history_count: manifest.length,
  active_counts_by_inventory: countsByInventory,
  active_counts_by_window: countsByWindow,
  unscored_source_count: expected.filter((row) => !manifestKeys.has(`${row.inventory}\u0000${row.id}`)).length,
  score_validation_status: failures.length ? "FAIL" : "PASS",
  check_count: checks.length,
  passed: checks.filter((row) => row.pass).length,
  failed: failures.length,
  failures,
  audit_now: activeRows
    .filter((row) => row.audit_window === "AUDIT_NOW")
    .sort((a, b) => Number(b.audit_priority_score) - Number(a.audit_priority_score) || a.audit_task_id.localeCompare(b.audit_task_id))
    .map((row) => ({ task_id: row.audit_task_id, score: Number(row.audit_priority_score), source: row.source_surface, promotion_target: row.promotion_target })),
  promoted: promotedRows.map((row) => ({ task_id: row.audit_task_id, source: row.source_surface, promotion_target: row.promotion_target })),
};

fs.writeFileSync(path.join(ROOT, "validation", "review-only-readiness-current.json"), JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify(output, null, 2));
if (failures.length) process.exitCode = 1;
