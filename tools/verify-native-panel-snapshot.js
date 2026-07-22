#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const panelDir = path.join(root, "review-packets/native-speaker/active-v1/completed/RUL01-SPEAKER-B-PUBLIC-R1");
const snapshotPath = path.join(panelDir, "RUL01-PUBLIC-PANEL-SNAPSHOT-R1.json");
const matrixPath = path.join(panelDir, "RUL01-PUBLIC-PANEL-ANONYMIZED-MATRIX-R1.tsv");
const summaryPath = path.join(panelDir, "RUL01-PUBLIC-PANEL-ITEM-SUMMARY-R1.tsv");
const statePath = path.join(root, "review-packets/native-speaker/active-v1/active-review-state.json");
const resultPath = path.join(root, "docs/research/CP026-P1-RUL01-PUBLIC-PANEL-R1-RESULT.md");

const checks = [];
const failures = [];
function check(name, condition, details = null) {
  const row = { name, pass: Boolean(condition) };
  if (details !== null) row.details = details;
  checks.push(row);
  if (!row.pass) failures.push(row);
}
function parseTsv(file) {
  const lines = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return { headers, rows: lines.filter(Boolean).map((line) => Object.fromEntries(line.split("\t").map((value, index) => [headers[index], value]))) };
}

for (const file of [snapshotPath, matrixPath, summaryPath, statePath, resultPath]) check(`required file exists: ${path.relative(root, file)}`, fs.existsSync(file));
if (failures.length) {
  console.error(JSON.stringify({ status: "FAIL", failures }, null, 2));
  process.exit(1);
}

const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
const matrix = parseTsv(matrixPath);
const summary = parseTsv(summaryPath);
const note = loadConstructionNotes(root, "active").find((entry) => entry.frontmatter.construction === "ResourceUseLaiFunctionRelation");
const matrixHash = crypto.createHash("sha256").update(fs.readFileSync(matrixPath)).digest("hex");
const itemHeaders = matrix.headers.slice(6);

check("snapshot schema", snapshot.schema === "canto-span-native-panel-snapshot-v1", snapshot.schema);
check("snapshot response count is 23", snapshot.response_count === 23, snapshot.response_count);
check("matrix has 23 anonymized rows", matrix.rows.length === 23, matrix.rows.length);
check("matrix has 21 item columns", itemHeaders.length === 21, itemHeaders.length);
check("respondent ids are unique", new Set(matrix.rows.map((row) => row.respondent_id)).size === matrix.rows.length);
check("all matrix screening fields pass", matrix.rows.every((row) => row.native_cantonese_confirmed === "true" && row.usage_frequency === "daily" && row.consent_confirmed === "true" && row.independence_confirmed === "true"));
check("all matrix judgments are controlled", matrix.rows.every((row) => itemHeaders.every((header) => ["natural_or_acceptable", "unnatural"].includes(row[header]))));
check("snapshot matrix hash matches", snapshot.matrix_sha256 === matrixHash, { snapshot: snapshot.matrix_sha256, actual: matrixHash });
check("summary has 21 item rows", summary.rows.length === 21, summary.rows.length);
check("snapshot has 21 item records", snapshot.items.length === 21, snapshot.items.length);
check("summary item ids match matrix", summary.rows.every((row, index) => row.item_id === itemHeaders[index]));

for (let index = 0; index < itemHeaders.length; index += 1) {
  const itemId = itemHeaders[index];
  const natural = matrix.rows.filter((row) => row[itemId] === "natural_or_acceptable").length;
  const unnatural = matrix.rows.length - natural;
  const row = summary.rows[index];
  const record = snapshot.items[index];
  check(`${itemId} summary natural count`, Number(row.natural_or_acceptable) === natural, `${row.natural_or_acceptable} != ${natural}`);
  check(`${itemId} summary unnatural count`, Number(row.unnatural) === unnatural, `${row.unnatural} != ${unnatural}`);
  check(`${itemId} snapshot natural count`, Number(record.natural_or_acceptable) === natural, `${record.natural_or_acceptable} != ${natural}`);
  check(`${itemId} snapshot response total`, Number(record.natural_or_acceptable) + Number(record.unnatural) === 23);
}

const rulState = state.constructions.find((entry) => entry.construction === "ResourceUseLaiFunctionRelation");
const exception = (state.protocol_exceptions || []).find((entry) => entry.exception_id === "RUL01-PUBLIC-PILOT-EXCEPTION-2026-07-21");
check("RUL state exists", Boolean(rulState));
check("protocol exception exists", Boolean(exception));
check("RUL public panel state is counted exception", rulState?.speaker_b?.state === "pilot_panel_counted_exception", rulState?.speaker_b?.state);
check("RUL state counts 23 panel speakers", Number(rulState?.counted_independent_speakers) === 23, rulState?.counted_independent_speakers);
check("RUL state promotion-eligible count remains zero", Number(rulState?.promotion_eligible_independent_speakers) === 0, rulState?.promotion_eligible_independent_speakers);
check("construction note records 23 total panel responses", Number(note?.frontmatter?.panel_response_count_total) === 23, note?.frontmatter?.panel_response_count_total);
check("construction note records 23 eligible pilot respondents", Number(note?.frontmatter?.eligible_panel_response_count) === 23, note?.frontmatter?.eligible_panel_response_count);
check("construction note does not convert pilot count into clean item coverage", Number(note?.frontmatter?.minimum_usable_judgments_per_critical_item) === 0, note?.frontmatter?.minimum_usable_judgments_per_critical_item);
check("construction note preserves pilot instrument limitation", note?.frontmatter?.survey_instrument_status === "pilot_limited", note?.frontmatter?.survey_instrument_status);
check("construction note uses panel evidence model v2", note?.frontmatter?.panel_evidence_model_version === "v2", note?.frontmatter?.panel_evidence_model_version);
check("construction returns to research pending", note?.frontmatter?.status === "research_pending", note?.frontmatter?.status);
check("exception does not authorize automatic promotion", exception?.scope === "count_as_external_panel_evidence_without_waiving_instrument_limitations_or_promotion_gate", exception?.scope);

const report = {
  schema: "canto-span-native-panel-snapshot-audit-v2",
  construction: "ResourceUseLaiFunctionRelation",
  response_count: matrix.rows.length,
  item_count: itemHeaders.length,
  check_count: checks.length,
  passed: checks.filter((row) => row.pass).length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const outDir = path.join(root, "validation", "current");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "native-panel-snapshot.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
