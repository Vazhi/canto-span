#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi } = require("../../lib/runtime-api");

const root = path.resolve(__dirname, "../../..");
const api = loadRuntimeApi({ apiNames: ["analyzeLine", "labelTransitionAuditRows", "labelTransitionAuditSummary"] });

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

const corpus = new Map();
function add(source, contextSource, origin) {
  if (!source || typeof source !== "string") return;
  const context = contextSource || "";
  const key = `${context}\u0000${source}`;
  if (!corpus.has(key)) corpus.set(key, { source, context_source: context, origins: new Set() });
  corpus.get(key).origins.add(origin);
}

const regression = readJson("tests/fixtures/regression-snapshots.json");
for (const row of regression.cases || []) add(row.source, row.context_source, "regression");
const np = readJson("tests/fixtures/np-subsystem.json");
for (const row of np.cases || []) add(row.surface, "", "np");
const constructionDir = path.join(root, "tests", "constructions");
for (const file of fs.readdirSync(constructionDir).filter((name) => name.endsWith(".json")).sort()) {
  const spec = JSON.parse(fs.readFileSync(path.join(constructionDir, file), "utf8"));
  for (const group of ["snapshot_cases", "focused_cases", "implementation_probe_cases", "np_cases"]) {
    for (const row of spec[group] || []) add(row.source, row.context_source, `construction:${spec.construction}:${group}`);
  }
}

const allowedDebtBuckets = new Set([
  "legacy_surface_rule",
  "surface_specific_rule",
  "slot_heuristic",
  "predicate_heuristic",
]);
const statusCounts = {};
const bucketCounts = {};
const parseFailures = [];
const unexpectedDebtRows = [];
const unclassifiedRows = [];
let constructionRows = 0;
let migrationCandidateCount = 0;
let acceptedTemplateCount = 0;
let acceptedSpecializedCount = 0;
let transitionReviewCount = 0;

function bump(target, key) { target[key] = (target[key] || 0) + 1; }

for (const item of corpus.values()) {
  try {
    const analysis = api.analyzeLine(item.source, item.context_source || null);
    const summary = api.labelTransitionAuditSummary(analysis);
    acceptedTemplateCount += summary.accepted_template_count || 0;
    acceptedSpecializedCount += summary.accepted_specialized_count || 0;
    transitionReviewCount += summary.transition_review_count || 0;
    migrationCandidateCount += summary.migration_candidate_count || 0;
    for (const row of api.labelTransitionAuditRows(analysis)) {
      constructionRows += 1;
      bump(statusCounts, row.transition_status || "missing");
      bump(bucketCounts, row.transition_bucket || "missing");
      if (row.transition_status === "needs_registry_decision" && unclassifiedRows.length < 30) {
        unclassifiedRows.push({ source: item.source, construction: row.construction, bucket: row.transition_bucket });
      }
      if (row.transition_status === "migration_candidate" && !allowedDebtBuckets.has(row.transition_bucket) && unexpectedDebtRows.length < 30) {
        unexpectedDebtRows.push({
          source: item.source,
          construction: row.construction,
          bucket: row.transition_bucket,
          action: row.transition_action,
        });
      }
    }
  } catch (error) {
    parseFailures.push({ source: item.source, context_source: item.context_source, error: error.message || String(error) });
  }
}

const blockingCount = parseFailures.length + unclassifiedRows.length + unexpectedDebtRows.length;
console.log(JSON.stringify({
  schema: "canto-span-label-transition-policy-acceptance-v1",
  runtime_version: "0.5.218",
  corpus: {
    unique_source_context_pairs: corpus.size,
    analyzed: corpus.size - parseFailures.length,
    parse_failures: parseFailures.length,
    construction_rows: constructionRows,
  },
  accepted_template_count: acceptedTemplateCount,
  accepted_specialized_count: acceptedSpecializedCount,
  transition_review_count: transitionReviewCount,
  migration_candidate_count: migrationCandidateCount,
  allowed_debt_buckets: [...allowedDebtBuckets],
  transition_status_counts: statusCounts,
  transition_bucket_counts: bucketCounts,
  unclassified_row_count: unclassifiedRows.length,
  unexpected_debt_row_count: unexpectedDebtRows.length,
  blocking_count: blockingCount,
  unclassified_rows: unclassifiedRows,
  unexpected_debt_rows: unexpectedDebtRows,
  parse_failures: parseFailures.slice(0, 20),
  note: "Diagnostic architecture only. Migration debt here is implementation debt, not linguistic evidence or construction status. This temporary probe deliberately exits nonzero after printing results.",
}, null, 2));

process.exit(1);
