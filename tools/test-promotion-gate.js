#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { evaluatePromotion, sourceRecordSummary } = require("./promotion-gate-lib");

const root = path.resolve(__dirname, "..");
const cases = JSON.parse(fs.readFileSync(path.join(root, "test-data", "promotion-gate-v3.json"), "utf8"));
const base = cases[0].fields;
const results = [];
let failed = 0;

function record(name, pass, result) {
  if (!pass) failed += 1;
  results.push({ name, pass, result });
}

for (const item of cases) {
  const fm = { construction: item.name, status: item.status, ...base, ...(item.fields || {}), ...(item.overrides || {}) };
  const note = { frontmatter: fm, body: "## Plain-language claim\n\nA concrete checked claim.\n" };
  const result = evaluatePromotion(note);
  const checks = [result.eligible === item.expected_eligible];
  if (item.expected_blocker) checks.push(result.blockers.includes(item.expected_blocker));
  if (item.expected_blocker_prefix) checks.push(result.blockers.some((value) => value.startsWith(item.expected_blocker_prefix)));
  if (item.expected_gate_class) checks.push(result.gate_class === item.expected_gate_class);
  record(item.name, checks.every(Boolean), result);
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "canto-span-promotion-gate-"));
try {
  const ledgerDir = path.join(tempRoot, "docs", "research");
  fs.mkdirSync(ledgerDir, { recursive: true });
  fs.writeFileSync(
    path.join(ledgerDir, "valid.tsv"),
    "source_id\tverification\tcitation\nSRC-ONE\tVERIFIED_FULL_TEXT\tOne\nSRC-TWO\tPENDING_REVIEW\tTwo\n"
  );
  fs.writeFileSync(
    path.join(ledgerDir, "incomplete-header.tsv"),
    "source_id\tcitation\nSRC-ONE\tOne\n"
  );
  fs.writeFileSync(
    path.join(ledgerDir, "malformed-row.tsv"),
    "source_id\tverification\nSRC-ONE\tVERIFIED_FULL_TEXT\textra\n"
  );

  const ledgerSummary = sourceRecordSummary({
    frontmatter: { source_verification_file: "docs/research/valid.tsv" },
    text: "### SRC-INLINE-IGNORED\n\n- Verification: `VERIFIED_FULL_TEXT`\n",
  }, tempRoot);
  record(
    "declared TSV ledger owns source counts",
    ledgerSummary.error === null && ledgerSummary.mode === "ledger" &&
      ledgerSummary.source_count === 2 && ledgerSummary.verified_source_count === 1,
    ledgerSummary
  );

  const inlineSummary = sourceRecordSummary({
    frontmatter: {},
    text: "### SRC-ONE\n\n- Verification: `VERIFIED_FULL_TEXT`\n\n### SRC-TWO\n\n- Verification: `PENDING_REVIEW`\n",
  }, tempRoot);
  record(
    "inline source sections remain supported",
    inlineSummary.error === null && inlineSummary.mode === "inline" &&
      inlineSummary.source_count === 2 && inlineSummary.verified_source_count === 1,
    inlineSummary
  );

  const unsafeSummary = sourceRecordSummary({
    frontmatter: { source_verification_file: "../outside.tsv" },
    text: "",
  }, tempRoot);
  record(
    "repository traversal ledger path fails closed",
    unsafeSummary.error === "invalid_source_verification_file_path:../outside.tsv",
    unsafeSummary
  );

  const absolutePath = path.join(tempRoot, "absolute.tsv");
  const absoluteSummary = sourceRecordSummary({
    frontmatter: { source_verification_file: absolutePath },
    text: "",
  }, tempRoot);
  record(
    "absolute ledger path fails closed",
    absoluteSummary.error === `invalid_source_verification_file_path:${absolutePath}`,
    absoluteSummary
  );

  const missingSummary = sourceRecordSummary({
    frontmatter: { source_verification_file: "docs/research/missing.tsv" },
    text: "",
  }, tempRoot);
  record(
    "missing ledger file fails closed",
    missingSummary.error === "missing_source_verification_file:docs/research/missing.tsv",
    missingSummary
  );

  const incompleteSummary = sourceRecordSummary({
    frontmatter: { source_verification_file: "docs/research/incomplete-header.tsv" },
    text: "",
  }, tempRoot);
  record(
    "incomplete ledger header fails closed",
    incompleteSummary.error === "incomplete_source_verification_header:docs/research/incomplete-header.tsv",
    incompleteSummary
  );

  const malformedSummary = sourceRecordSummary({
    frontmatter: { source_verification_file: "docs/research/malformed-row.tsv" },
    text: "",
  }, tempRoot);
  record(
    "malformed ledger row fails closed",
    malformedSummary.error === "malformed_source_verification_row:docs/research/malformed-row.tsv:2",
    malformedSummary
  );
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

const report = {
  schema: "canto-span-promotion-gate-tests-v3",
  total: results.length,
  passed: results.filter((result) => result.pass).length,
  failed,
  status: failed ? "FAIL" : "PASS",
  results,
};
const outDir = path.join(root, "validation", "current");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "promotion-gate-tests.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failed) process.exit(1);
