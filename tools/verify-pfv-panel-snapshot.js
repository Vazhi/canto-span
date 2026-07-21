#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const panelDir = path.join(root, "review-packets/native-speaker/active-v1/completed/PFV01-SPEAKER-B-PUBLIC-R1");
const snapshotPath = path.join(panelDir, "PFV01-PUBLIC-PANEL-SNAPSHOT-R1.json");
const matrixPath = path.join(panelDir, "PFV01-PUBLIC-PANEL-ANONYMIZED-MATRIX-R1.tsv");
const summaryPath = path.join(panelDir, "PFV01-PUBLIC-PANEL-ITEM-SUMMARY-R1.tsv");
const statePath = path.join(root, "review-packets/native-speaker/active-v1/active-review-state.json");
const resultPath = path.join(root, "docs/research/CP029-P1-PFV01-PUBLIC-PANEL-R1-RESULT.md");

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
const note = loadConstructionNotes(root, "active").find((entry) => entry.frontmatter.construction === "PostverbalZoPerfectiveVP");
const matrixHash = crypto.createHash("sha256").update(fs.readFileSync(matrixPath)).digest("hex");
const itemHeaders = matrix.headers.slice(5);

check("snapshot schema", snapshot.schema === "canto-span-native-panel-snapshot-v1", snapshot.schema);
check("snapshot response count is 10", snapshot.response_count === 10, snapshot.response_count);
check("matrix has 10 anonymized rows", matrix.rows.length === 10, matrix.rows.length);
check("matrix has 14 item columns", itemHeaders.length === 14, itemHeaders.length);
check("respondent ids are unique", new Set(matrix.rows.map((row) => row.respondent_id)).size === matrix.rows.length);
check("all respondents confirmed independent completion", matrix.rows.every((row) => row.independence_confirmed === "true"));
check("legacy native-status limitation is explicit", matrix.rows.every((row) => row.native_cantonese_status === "grandfathered_user_recruitment_plus_cantonese_background_field"));
check("legacy consent limitation is explicit", matrix.rows.every((row) => row.consent_status === "not_explicitly_collected_in_legacy_form"));
check("all matrix judgments are controlled", matrix.rows.every((row) => itemHeaders.every((header) => ["natural_or_acceptable", "unnatural"].includes(row[header]))));
check("snapshot matrix hash matches", snapshot.matrix_sha256 === matrixHash, { snapshot: snapshot.matrix_sha256, actual: matrixHash });
check("summary has 14 item rows", summary.rows.length === 14, summary.rows.length);
check("snapshot has 14 item records", snapshot.items.length === 14, snapshot.items.length);
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
  check(`${itemId} snapshot response total`, Number(record.natural_or_acceptable) + Number(record.unnatural) === 10);
}

const pfvState = state.constructions.find((entry) => entry.construction === "PostverbalZoPerfectiveVP");
const exception = (state.protocol_exceptions || []).find((entry) => entry.exception_id === "PFV01-LEGACY-PANEL-EXCEPTION-2026-07-21");
check("PFV state exists", Boolean(pfvState));
check("protocol exception exists", Boolean(exception));
check("PFV public panel state is counted legacy exception", pfvState?.speaker_b?.state === "legacy_panel_counted_exception", pfvState?.speaker_b?.state);
check("PFV state counts 11 total independent responses", Number(pfvState?.counted_independent_speakers) === 11, pfvState?.counted_independent_speakers);
check("PFV state promotion-eligible count remains one", Number(pfvState?.promotion_eligible_independent_speakers) === 1, pfvState?.promotion_eligible_independent_speakers);
check("construction note counts 11 total responses", Number(note?.frontmatter?.independent_speaker_count) === 11, note?.frontmatter?.independent_speaker_count);
check("construction note records one promotion-eligible speaker", Number(note?.frontmatter?.promotion_eligible_independent_speaker_count) === 1, note?.frontmatter?.promotion_eligible_independent_speaker_count);
check("construction note records one same-contrast clean speaker", Number(note?.frontmatter?.same_contrast_independent_speaker_count) === 1, note?.frontmatter?.same_contrast_independent_speaker_count);
check("construction closes narrowly as provisional", note?.frontmatter?.status === "provisional", note?.frontmatter?.status);
check("exception does not invent clean eligibility", Number(exception?.promotion_eligible_independent_speakers) === 0, exception?.promotion_eligible_independent_speakers);
check("exception scope preserves missing-field limitations", exception?.scope === "count_as_external_same_contrast_panel_evidence_without_inventing_missing_native_confirmation_or_consent_fields", exception?.scope);

const report = {
  schema: "canto-span-native-panel-snapshot-audit-v1",
  construction: "PostverbalZoPerfectiveVP",
  response_count: matrix.rows.length,
  item_count: itemHeaders.length,
  check_count: checks.length,
  passed: checks.filter((row) => row.pass).length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const outDir = path.join(root, "validation", `v${manifest.version}`);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "pfv-native-panel-snapshot.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
