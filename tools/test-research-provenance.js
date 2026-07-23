#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { auditResearchProvenance } = require("./research-provenance-lib");

const requiredHeaders = "source_id\tverification\tcitation_and_locator\twhat_it_supports\tlimit\tdisposition\n";

function write(root, relative, content) {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function packageFiles(root, id, slug, options = {}) {
  const main = `${id}-${slug}-RESEARCH-R1.md`;
  const source = `${id}-${slug}-SOURCE-VERIFICATION-R1.tsv`;
  const collision = `${id}-${slug}-COLLISION-AUDIT-R1.tsv`;
  write(root, `docs/research/${main}`, options.main || `---\nresearch_id: ${id}\n---\n# ${id} — test\n\nSee ${source}.\nSee ${collision}.\n`);
  if (!options.omitSource) write(root, `docs/research/${source}`, options.source || `${requiredHeaders}SRC-1\tVERIFIED_PEER_REVIEWED_FULL_TEXT\tPaper 2024, p. 4; https://example.org/paper\tCore\tNarrow\tPROMOTE_CORE\n`);
  if (!options.omitCollision) write(root, `docs/research/${collision}`, "target\tresult\nA\tB\n");
  return main;
}

function fixture(mutator) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "canto-span-prov-"));
  write(root, "config/research-provenance-baseline.json", JSON.stringify({ known_weak_core_ids: [] }));
  const main = packageFiles(root, "PRQ2-001", "TEST");
  write(root, "docs/research/CURRENT-RESEARCH-PROVENANCE.md", `| ID | Main record |\n|---|---|\n| PRQ2-001 | [test](${main}) |\n`);
  if (mutator) mutator(root, main);
  return root;
}

const cases = [
  { name: "valid package", expected: "PASS", build: () => fixture() },
  { name: "duplicate ID", expectedType: "duplicate_index_id", build: () => fixture((root, main) => write(root, "docs/research/CURRENT-RESEARCH-PROVENANCE.md", `| ID | Main record |\n|---|---|\n| PRQ2-001 | [a](${main}) |\n| PRQ2-001 | [b](${main}) |\n`)) },
  { name: "missing source companion", expectedType: "missing_source_ledger", build: () => fixture((root) => fs.unlinkSync(path.join(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv"))) },
  { name: "content ID mismatch", expectedType: "main_content_id_mismatch", build: () => fixture((root) => write(root, "docs/research/PRQ2-001-TEST-RESEARCH-R1.md", `---\nresearch_id: PRQ2-002\n---\n# PRQ2-001 — test\n\nSee PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv.\nSee PRQ2-001-TEST-COLLISION-AUDIT-R1.tsv.\n`)) },
  { name: "malformed ledger header", expectedType: "malformed_source_header", build: () => fixture((root) => write(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv", "source_id\tverification\tcitation\nSRC\tVERIFIED\thttps://example.org\n")) },
  { name: "weak promotion fails", expectedType: "promotion_without_direct_evidence", build: () => fixture((root) => write(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv", `${requiredHeaders}SRC-1\tVERIFIED_CANTONESE_TEACHING_RESOURCE\tLesson p. 4; https://example.org/lesson\tCore\tNarrow\tPROMOTE_CORE\n`)) },
  { name: "known weak promotion is warning", expected: "PASS", expectedWarning: "promotion_without_direct_evidence", build: () => fixture((root) => { write(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv", `${requiredHeaders}SRC-1\tVERIFIED_CANTONESE_TEACHING_RESOURCE\tLesson p. 4; https://example.org/lesson\tCore\tNarrow\tPROMOTE_CORE\n`); write(root, "config/research-provenance-baseline.json", JSON.stringify({ known_weak_core_ids: ["PRQ2-001"] })); }) },
  { name: "runtime cannot promote", expectedType: "runtime_presented_as_linguistic_evidence", build: () => fixture((root) => write(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv", `${requiredHeaders}RUNTIME-1\tVERIFIED_RUNTIME_OBSERVATION\tRuntime probe 2026, rows 1-2\tCore\tNone\tPROMOTE_CORE\n`)) },
];

const results = cases.map((test) => {
  const root = test.build();
  const report = auditResearchProvenance(root);
  const pass = test.expectedType
    ? report.errors.some((item) => item.type === test.expectedType)
    : report.status === test.expected && (!test.expectedWarning || report.warnings.some((item) => item.type === test.expectedWarning));
  fs.rmSync(root, { recursive: true, force: true });
  return { name: test.name, pass, status: report.status, errors: report.errors.map((item) => item.type), warnings: report.warnings.map((item) => item.type) };
});

const failed = results.filter((item) => !item.pass).length;
const output = { schema: "canto-span-research-provenance-tests-v1", total: results.length, passed: results.length - failed, failed, status: failed ? "FAIL" : "PASS", results };
console.log(JSON.stringify(output, null, 2));
if (failed) process.exit(1);
