#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "validation", "v0.5.183-cp024-p1-demo01-r1");
fs.mkdirSync(outDir, { recursive: true });

function parseTsv(file) {
  const text = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd();
  if (!text) return [];
  const lines = text.split(/\r?\n/);
  const headers = lines[0].split("\t");
  return lines.slice(1).filter(Boolean).map((line) => {
    const values = line.split("\t");
    const row = {};
    headers.forEach((h, i) => { row[h] = values[i] ?? ""; });
    return row;
  });
}

function writeTsv(file, rows, headers) {
  const clean = (v) => String(v ?? "").replace(/[\t\r\n]+/g, " ");
  const lines = [headers.join("\t"), ...rows.map((r) => headers.map((h) => clean(r[h])).join("\t"))];
  fs.writeFileSync(file, lines.join("\n") + "\n");
}

function loadRegistry() {
  class Plugin {} class PluginSettingTab {} class Setting {} class Notice {}
  const moduleRecord = { exports: {} };
  const context = {
    module: moduleRecord,
    exports: moduleRecord.exports,
    require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id),
    console, setTimeout, clearTimeout, Buffer,
  };
  const mainPath = path.join(root, "main.js");
  vm.runInNewContext(fs.readFileSync(mainPath, "utf8") + `
module.exports.__sourceAccountingApi = {
  labels: [...CONSTRUCTION_LABEL_REGISTRY],
  retired: [...RETIRED_CONSTRUCTION_LABEL_REGISTRY.keys()],
  runtimeVersion: CANTO_SPAN_RUNTIME_VERSION,
};`, context, { filename: mainPath });
  return moduleRecord.exports.__sourceAccountingApi;
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

const api = loadRegistry();
const legitimacyRows = parseTsv(path.join(root, "test-data", "grammar-legitimacy-audit.tsv"));
const coverageRows = parseTsv(path.join(root, "docs", "research", "PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R37.tsv"));
const matrixRows = parseTsv(path.join(root, "docs", "research", "PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R37.tsv"));
const retentionRows = parseTsv(path.join(root, "archive", "RESEARCH-RETENTION-MANIFEST.tsv"));

const legitimacy = new Map(legitimacyRows.map((r) => [r.pattern, r]));
const coverage = new Map(coverageRows.map((r) => [r.runtime_label, r]));

const internalProvenance = {
  ClauseSpan: "EP-CP022-I1A-I01-D1; docs/research/CP022-I1A-I01-A1-ACCEPTANCE.md",
  ClauseRelationGraph: "EP-CP022-I1A-I02-D1; docs/research/CP022-I1A-I02-A1-ACCEPTANCE.md",
  ClauseRelationEdge: "EP-CP022-I1A-I02-D1; docs/research/CP022-I1A-I02-A1-ACCEPTANCE.md",
  ClauseRelationMemberSpan: "EP-CP022-I1A-I02-D1; docs/research/CP022-I1A-I02-A1-ACCEPTANCE.md",
  NominalHeadSpan: "EP-R37-I04; docs/research/CP022-I1A-I04-A1-ACCEPTANCE.md",
};

const accountingRows = [];
const failures = [];
let languageCount = 0;
let externallyMappedCount = 0;
let explicitGapCount = 0;
let internalCount = 0;

for (const label of [...api.labels].sort()) {
  const leg = legitimacy.get(label) || {};
  const cov = coverage.get(label) || {};
  const coverageLayer = cov.claim_layer || "";
  const primary = leg.primary_claim_type || "";
  const isLanguage = coverageLayer === "language" || primary === "cantonese_language_claim" || primary === "lexicalized_language_claim";
  const mappedCount = Number(cov.mapped_external_source_count || leg.pattern_specific_external_source_count || 0);
  let accountingClass = "";
  let promotionEligible = leg.status === "supported_productive";
  let note = "";
  let designProvenance = internalProvenance[label] || "";

  if (isLanguage) {
    languageCount += 1;
    if (mappedCount > 0) {
      externallyMappedCount += 1;
      accountingClass = "external_source_mapped";
      note = "External mapping is retained; exact productivity still depends on pattern-specific evidence and acceptance.";
    } else if (label === "ScalarRangeFragment") {
      explicitGapCount += 1;
      accountingClass = "explicit_source_gap_quarantined";
      note = "No inspected source establishes the exact standalone wrapper; dormant merge-or-retire candidate; non-promotable.";
    } else {
      accountingClass = "unaccounted_language_gap";
      note = "Active language label lacks external mapping or an approved explicit source-gap disposition.";
      failures.push(`unaccounted active language label: ${label}`);
    }
  } else {
    internalCount += 1;
    accountingClass = "internal_representation_or_heuristic";
    if (!designProvenance && cov.mapping_batch) {
      designProvenance = [cov.mapping_batch, cov.cumulative_mapping, cov.mapping_disposition].filter(Boolean).join("; ");
    }
    if (!designProvenance && leg.action) {
      designProvenance = [leg.lane, leg.action, leg.audit_note].filter(Boolean).join("; ");
    }
    if (!designProvenance) failures.push(`internal label lacks design provenance: ${label}`);
    note = "Internal representation or heuristic; cannot independently license Cantonese grammar.";
  }

  accountingRows.push({
    runtime_label: label,
    accounting_class: accountingClass,
    claim_layer: isLanguage ? "language" : "internal",
    legitimacy_claim_type: primary || (isLanguage ? "language_from_coverage" : "internal_representation"),
    legitimacy_status: leg.status || cov.current_status || "representation_only",
    mapped_external_source_count: mappedCount,
    mapped_external_source_ids: cov.mapped_external_source_ids || "",
    source_mapping_batch: cov.mapping_batch || "",
    source_mapping_status: cov.mapping_status || "",
    design_provenance: designProvenance,
    productive_acceptance_eligible: promotionEligible,
    note,
  });
}

const sourceIds = new Set(matrixRows.map((r) => r.source_id).filter(Boolean));
const sourceMapCount = fs.readdirSync(path.join(root, "docs", "research")).filter((n) => /SOURCE-MAP.*\.md$/i.test(n)).length;
const retentionStatuses = retentionRows.reduce((acc, r) => {
  acc[r.status] = (acc[r.status] || 0) + 1;
  return acc;
}, {});

const checks = [
  [api.labels.length === 181, `CP024 candidate active registry is 181 (${api.labels.length})`],
  [new Set(api.labels).size === api.labels.length, "active registry labels are unique"],
  [accountingRows.length === api.labels.length, "every active label has an accounting row"],
  [failures.length === 0, `unaccounted active labels = ${failures.length}`],
  [languageCount === 160, `CP024 candidate language/lexical labels = 160 (${languageCount})`],
  [externallyMappedCount === 159, `CP024 candidate externally mapped language labels = 159 (${externallyMappedCount})`],
  [explicitGapCount === 1, `explicit source-gap quarantines = 1 (${explicitGapCount})`],
  [internalCount === 21, `CP024 candidate internal labels = 21 (${internalCount})`],
  [matrixRows.length === 1090, `cumulative source matrix rows = 1090 (${matrixRows.length})`],
  [sourceIds.size === 118, `cumulative source identifiers = 118 (${sourceIds.size})`],
  [sourceMapCount === 31, `current source-map dossiers = 31 (${sourceMapCount})`],
  [retentionRows.length === 511, `research-retention manifest rows = 511 (${retentionRows.length})`],
  [retentionRows.every((r) => r.status !== "MISSING"), "research-retention manifest has no missing file"],
  [fs.existsSync(path.join(root, "archive", "research-history")), "historical research archive exists"],
];

const failedChecks = checks.filter(([pass]) => !pass).map(([, detail]) => detail);
failures.push(...failedChecks);

const accountingPath = path.join(root, "docs", "research", "ACTIVE-SOURCE-ACCOUNTING-v0.5.183-cp024-p1-demo01-r1.tsv");
writeTsv(accountingPath, accountingRows, [
  "runtime_label", "accounting_class", "claim_layer", "legitimacy_claim_type", "legitimacy_status",
  "mapped_external_source_count", "mapped_external_source_ids", "source_mapping_batch", "source_mapping_status",
  "design_provenance", "productive_acceptance_eligible", "note",
]);

const result = {
  schema: "canto-span-source-accounting-and-research-retention-audit-v1",
  checkpoint: "v0.5.183-cp024-p1-demo01-r1",
  runtime_version: api.runtimeVersion,
  status: failures.length ? "FAIL" : "PASS",
  summary: {
    active_registry_labels: api.labels.length,
    active_language_or_lexical_labels: languageCount,
    externally_mapped_active_language_labels: externallyMappedCount,
    explicit_source_gap_quarantines: explicitGapCount,
    explicit_source_gap_labels: accountingRows.filter((r) => r.accounting_class === "explicit_source_gap_quarantined").map((r) => r.runtime_label),
    active_internal_representation_or_heuristic_labels: internalCount,
    unaccounted_active_labels: accountingRows.filter((r) => r.accounting_class.startsWith("unaccounted")).map((r) => r.runtime_label),
    cumulative_source_matrix_rows: matrixRows.length,
    cumulative_source_identifiers: sourceIds.size,
    current_source_map_dossiers: sourceMapCount,
    research_retention_manifest_rows: retentionRows.length,
    research_retention_status_counts: retentionStatuses,
    supported_productive: accountingRows.filter((r) => r.legitimacy_status === "supported_productive").length,
  },
  interpretation: {
    all_active_labels_research_accounted: failures.length === 0,
    all_active_language_labels_positively_source_supported: false,
    reason: "ScalarRangeFragment is intentionally recorded as an unsupported source-gap quarantine rather than falsely source-supported.",
    internal_labels_are_language_claims: false,
  },
  runtime_hashes: {
    "main.js": sha256(path.join(root, "main.js")),
    "manifest.json": sha256(path.join(root, "manifest.json")),
    "styles.css": sha256(path.join(root, "styles.css")),
  },
  checks: checks.map(([pass, detail]) => ({ pass, detail })),
  failures,
};

fs.writeFileSync(path.join(outDir, "source-accounting-and-research-retention-audit.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
