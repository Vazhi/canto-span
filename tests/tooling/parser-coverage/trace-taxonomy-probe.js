#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi } = require("../../lib/runtime-api");
const {
  TRACE_TAXONOMY_SCHEMA,
  parserDecisionTraceKindRegistry,
  templateFamilyRegistry,
  templateTraceKinds,
} = require("../../../src/runtime-resources/diagnostics/trace-metadata");

const root = path.resolve(__dirname, "../../..");
const api = loadRuntimeApi({ apiNames: ["analyzeLine", "diagnosticFinalRows"] });

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

const registeredKinds = new Set(parserDecisionTraceKindRegistry.map(([kind]) => kind));
const registeredFamilies = new Set(templateFamilyRegistry.map(([family]) => family));
const kindCounts = {};
const familyCounts = {};
const familySourceCounts = {};
const subtypeCounts = {};
const taxonomyStatusCounts = {};
const issueCounts = {};
const failures = [];
const parseFailures = [];
let constructionRows = 0;

function bump(target, key) {
  target[key] = (target[key] || 0) + 1;
}

function sample(kind, payload) {
  if (failures.length < 30) failures.push({ kind, ...payload });
}

for (const item of corpus.values()) {
  try {
    const analysis = api.analyzeLine(item.source, item.context_source || null);
    if ((analysis.trace_taxonomy_provenance || {}).invalid_count) {
      sample("analysis_taxonomy_invalid", {
        source: item.source,
        summary: analysis.trace_taxonomy_provenance,
      });
    }
    const rows = api.diagnosticFinalRows(analysis);
    for (const row of rows || []) {
      if (!row || row.kind !== "construction") continue;
      constructionRows += 1;
      const detail = row.trace_detail || {};
      const construction = row.construction || row.internal_construction || detail.construction_type || "";
      const kind = detail.kind || row.trace || "unspecified";
      const family = detail.template_family || "";
      const subtype = detail.template_subtype || "";
      const taxonomyStatus = detail.taxonomy_status || "missing";
      const applicability = detail.template_family_applicability || "missing";

      bump(kindCounts, kind);
      bump(familyCounts, family || "(missing)");
      bump(familySourceCounts, detail.template_family_source || "missing");
      bump(taxonomyStatusCounts, taxonomyStatus);
      if (subtype) bump(subtypeCounts, subtype);
      for (const issue of detail.taxonomy_issues || []) bump(issueCounts, issue.code || "unknown");

      if (detail.trace_taxonomy_schema !== TRACE_TAXONOMY_SCHEMA) {
        sample("missing_or_wrong_schema", { source: item.source, construction, schema: detail.trace_taxonomy_schema || "" });
      }
      if (!registeredKinds.has(kind)) sample("unregistered_trace_kind", { source: item.source, construction, trace_kind: kind });
      if (family && !registeredFamilies.has(family)) {
        sample("unregistered_template_family", { source: item.source, construction, trace_kind: kind, template_family: family });
      }
      if (templateTraceKinds.has(kind)) {
        if (applicability !== "required") sample("template_family_applicability", { source: item.source, construction, trace_kind: kind, applicability });
        if (!family) sample("template_family_missing", { source: item.source, construction, trace_kind: kind });
      } else if (applicability !== "not_applicable") {
        sample("non_template_family_applicability", { source: item.source, construction, trace_kind: kind, applicability });
      }
      if (taxonomyStatus !== "valid") {
        sample("taxonomy_invalid", { source: item.source, construction, trace_kind: kind, template_family: family, taxonomy_issues: detail.taxonomy_issues || [] });
      }
    }
  } catch (error) {
    parseFailures.push({ source: item.source, context_source: item.context_source, error: error.message || String(error) });
  }
}

const output = {
  schema: "canto-span-trace-taxonomy-acceptance-v2",
  runtime_version: api.runtimeVersion,
  corpus: {
    unique_source_context_pairs: corpus.size,
    analyzed: corpus.size - parseFailures.length,
    parse_failures: parseFailures.length,
    construction_rows: constructionRows,
  },
  observed: {
    trace_kind_counts: kindCounts,
    template_family_counts: familyCounts,
    template_family_source_counts: familySourceCounts,
    template_subtype_counts: subtypeCounts,
    taxonomy_status_counts: taxonomyStatusCounts,
    taxonomy_issue_counts: issueCounts,
  },
  blocking_count: failures.length + parseFailures.length,
  failures,
  parse_failures: parseFailures.slice(0, 20),
};

console.log(JSON.stringify(output, null, 2));
// Temporary branch-only acceptance probe. Deliberate nonzero exit keeps the full report in Actions logs; delete before PR readiness.
process.exit(1);
