#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { auditResearchProvenance } = require("./research-provenance-lib");

const v1Headers = "source_id\tverification\tcitation_and_locator\twhat_it_supports\tlimit\tdisposition\n";
const v2Headers = "source_id\tevidence_grade\tverification\tcitation_and_locator\twhat_it_supports\tlimit\tdisposition\n";

function write(root, relative, content) {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function gradeConfig(root) {
  write(root, "config/research-evidence-grades.json", JSON.stringify({
    schema: "test",
    canonical_ledger_headers: ["source_id", "evidence_grade", "verification", "citation_and_locator", "what_it_supports", "limit", "disposition"],
    grades: {
      DIRECT_SCHOLARLY_CORE: { core_promotion_qualifying: true },
      REFERENCE_GRAMMAR_CORE: { core_promotion_qualifying: true },
      PRIMARY_CORPUS_ATTESTATION: { core_promotion_qualifying: false },
      CONTROLLED_JUDGMENT_EVIDENCE: { core_promotion_qualifying: true },
      ATTESTATION_ONLY: { core_promotion_qualifying: false },
      LEXICAL_OR_PRONUNCIATION_ONLY: { core_promotion_qualifying: false },
      DISCOVERY_LEAD_ONLY: { core_promotion_qualifying: false },
      RUNTIME_OBSERVATION_ONLY: { core_promotion_qualifying: false },
    },
  }));
}

function packageFiles(root, id, slug, options = {}) {
  const main = `${id}-${slug}-RESEARCH-R1.md`;
  const source = `${id}-${slug}-SOURCE-VERIFICATION-R1.tsv`;
  const collision = `${id}-${slug}-COLLISION-AUDIT-R1.tsv`;
  write(root, `docs/research/${main}`, options.main || `---\nresearch_id: ${id}\n---\n# ${id} — test\n\nSee ${source}.\nSee ${collision}.\n`);
  if (!options.omitSource) {
    write(root, `docs/research/${source}`, options.source || `${v2Headers}SRC-1\tDIRECT_SCHOLARLY_CORE\tVERIFIED_PEER_REVIEWED_FULL_TEXT\tPaper 2024, p. 4; https://example.org/paper\tDirect analysis.\tOne variety only.\tPROMOTE_CORE\n`);
  }
  if (!options.omitCollision) write(root, `docs/research/${collision}`, "target\tresult\nA\tB\n");
  return main;
}

function fixture(mutator) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "canto-span-prov-"));
  gradeConfig(root);
  write(root, "config/research-provenance-baseline.json", JSON.stringify({
    known_weak_core_ids: [],
    known_legacy_ledger_ids: [],
    known_missing_companion_link_ids: [],
    known_ungraded_ledger_ids: [],
  }));
  const main = packageFiles(root, "PRQ2-001", "TEST");
  write(root, "docs/research/CURRENT-RESEARCH-PROVENANCE.md", `| ID | Main record |\n|---|---|\n| PRQ2-001 | [test](${main}) |\n`);
  if (mutator) mutator(root, main);
  return root;
}

const cases = [
  { name: "valid graded package", expected: "PASS", build: () => fixture() },
  { name: "duplicate ID", expectedType: "duplicate_index_id", build: () => fixture((root, main) => write(root, "docs/research/CURRENT-RESEARCH-PROVENANCE.md", `| ID | Main record |\n|---|---|\n| PRQ2-001 | [a](${main}) |\n| PRQ2-001 | [b](${main}) |\n`)) },
  { name: "missing source companion", expectedType: "missing_source_ledger", build: () => fixture((root) => fs.unlinkSync(path.join(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv"))) },
  { name: "content ID mismatch", expectedType: "main_content_id_mismatch", build: () => fixture((root) => write(root, "docs/research/PRQ2-001-TEST-RESEARCH-R1.md", `---\nresearch_id: PRQ2-002\n---\n# PRQ2-001 — test\n\nSee PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv.\nSee PRQ2-001-TEST-COLLISION-AUDIT-R1.tsv.\n`)) },
  { name: "malformed ledger header", expectedType: "malformed_source_header", build: () => fixture((root) => write(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv", "source_id\tverification\tcitation\nSRC\tVERIFIED\thttps://example.org\n")) },
  { name: "new ungraded ledger fails", expectedType: "missing_evidence_grade_column", build: () => fixture((root) => write(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv", `${v1Headers}SRC-1\tVERIFIED_PEER_REVIEWED_FULL_TEXT\tPaper p. 4; https://example.org/paper\tCore\tOne variety.\tPROMOTE_CORE\n`)) },
  { name: "baselined ungraded ledger warns", expected: "PASS", expectedWarning: "missing_evidence_grade_column", build: () => fixture((root) => {
      write(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv", `${v1Headers}SRC-1\tVERIFIED_PEER_REVIEWED_FULL_TEXT\tPaper p. 4; https://example.org/paper\tCore\tOne variety.\tPROMOTE_CORE\n`);
      write(root, "config/research-provenance-baseline.json", JSON.stringify({ known_ungraded_ledger_ids: ["PRQ2-001"] }));
    }) },
  { name: "invalid evidence grade", expectedType: "invalid_evidence_grade", build: () => fixture((root) => write(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv", `${v2Headers}SRC-1\tSTRONG_SOURCE\tVERIFIED_FULL_TEXT\tPaper p. 4; https://example.org/paper\tCore\tOne variety.\tPROMOTE_CORE\n`)) },
  { name: "corpus-only promotion fails", expectedType: "promotion_without_direct_evidence", build: () => fixture((root) => write(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv", `${v2Headers}SRC-1\tPRIMARY_CORPUS_ATTESTATION\tVERIFIED_LOCAL_CORPUS_CONTEXT\tCorpus row 4; local/file.tsv\tOccurrence.\tOne occurrence.\tPROMOTE_CORE\n`)) },
  { name: "runtime cannot promote", expectedType: "runtime_presented_as_linguistic_evidence", build: () => fixture((root) => write(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv", `${v2Headers}RUNTIME-1\tRUNTIME_OBSERVATION_ONLY\tVERIFIED_RUNTIME_OBSERVATION\tRuntime probe 2026, rows 1-2\tCoverage.\tZero linguistic weight.\tPROMOTE_CORE\n`)) },
  { name: "runtime must use runtime grade", expectedType: "runtime_evidence_grade_mismatch", build: () => fixture((root) => write(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv", `${v2Headers}RUNTIME-1\tATTESTATION_ONLY\tVERIFIED_RUNTIME_OBSERVATION\tRuntime probe 2026, rows 1-2\tCoverage.\tZero linguistic weight.\tUSE_FOR_COLLISION_AUDIT_ONLY\n`)) },
  { name: "discovery lead cannot promote", expectedType: "discovery_lead_substantive_disposition", build: () => fixture((root) => write(root, "docs/research/PRQ2-001-TEST-SOURCE-VERIFICATION-R1.tsv", `${v2Headers}SRC-LEAD\tDISCOVERY_LEAD_ONLY\tVERIFIED_BIBLIOGRAPHIC_EXISTENCE_ONLY\tAuthor 1996, journal issue 4\tPotential source.\tFull text unavailable.\tPROMOTE_CORE\n`)) },
  { name: "stale ungraded baseline fails", expectedType: "stale_ungraded_ledger_baseline", build: () => fixture((root) => write(root, "config/research-provenance-baseline.json", JSON.stringify({ known_ungraded_ledger_ids: ["PRQ2-001"] }))) },
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
const output = { schema: "canto-span-research-provenance-tests-v2", total: results.length, passed: results.length - failed, failed, status: failed ? "FAIL" : "PASS", results };
console.log(JSON.stringify(output, null, 2));
if (failed) process.exit(1);
