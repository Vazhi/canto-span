#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi } = require("../../lib/runtime-api");
const { enhanceCoverageRecord } = require("../../../tools/parser-coverage-enhanced");
const { structuralScopeRegistry } = require("../../../src/runtime-resources/diagnostics/trace-metadata");

const root = path.resolve(__dirname, "../../..");
const api = loadRuntimeApi({ apiNames: ["analyzeLine", "diagnosticSummary", "diagnosticFinalRows"] });
const registeredScopes = new Set(structuralScopeRegistry.map(([scope]) => scope));
const clauseSlots = new Set(["subject", "overt_subject", "topic"]);
const targetLabels = new Set(["ModalVP", "DesiderativeVP", "MannerAdverbialVP", "PreferenceVP"]);

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

const scopeCounts = {};
const scopeSourceCounts = {};
const targetCounts = {};
const targetClauseCapableCounts = {};
const targetUnspecifiedNonClauseCounts = {};
const targetClauseCapableWrongScope = [];
const vpViolations = [];
const historicalNameScopeMismatches = [];
const sanityCounts = {};
const parseFailures = [];
let constructionRows = 0;

function bump(target, key) { target[key] = (target[key] || 0) + 1; }
function templateSlotName(item) { return String(item || "").replace(/[!?+*]+$/g, ""); }
function declaresClauseSlot(trace) {
  const assigned = Array.isArray(trace.assigned_slots) ? trace.assigned_slots : [];
  const template = Array.isArray(trace.template) ? trace.template.map(templateSlotName) : [];
  return [...assigned, ...template].some((slot) => clauseSlots.has(slot));
}

for (const item of corpus.values()) {
  try {
    const analysis = api.analyzeLine(item.source, item.context_source || null);
    const rows = api.diagnosticFinalRows(analysis);
    const record = enhanceCoverageRecord(api.diagnosticSummary(analysis), rows, { source: item.source });
    for (const trace of record.construction_traces || []) {
      constructionRows += 1;
      const clauseCapable = declaresClauseSlot(trace);
      bump(scopeCounts, trace.structural_scope || "missing");
      bump(scopeSourceCounts, trace.structural_scope_source || "missing");
      if (!registeredScopes.has(trace.structural_scope)) {
        vpViolations.push({ source: item.source, construction: trace.construction, reason: "unregistered_scope", scope: trace.structural_scope || "" });
      }
      if (trace.structural_scope === "vp" && clauseCapable) {
        vpViolations.push({ source: item.source, construction: trace.construction, reason: "vp_binds_clause_slot" });
      }
      if (targetLabels.has(trace.construction)) {
        bump(targetCounts, trace.construction);
        if (clauseCapable) {
          bump(targetClauseCapableCounts, trace.construction);
          if (trace.structural_scope !== "clause") {
            targetClauseCapableWrongScope.push({
              source: item.source,
              construction: trace.construction,
              scope: trace.structural_scope || "",
              slots: trace.assigned_slots,
              template: trace.template,
            });
          }
        } else if (trace.structural_scope === "unspecified") {
          bump(targetUnspecifiedNonClauseCounts, trace.construction);
        }
      }
      // Historical cross-check only: prove the old suffix-based symptom is gone.
      // Production sanity logic does not use construction names or /VP$/.
      if (/VP$/.test(trace.construction) && clauseCapable && trace.structural_scope !== "clause") {
        historicalNameScopeMismatches.push({ source: item.source, construction: trace.construction, scope: trace.structural_scope || "" });
      }
    }
    for (const finding of record.sanity_findings || []) bump(sanityCounts, finding.code || "unknown");
  } catch (error) {
    parseFailures.push({ source: item.source, context_source: item.context_source, error: error.message || String(error) });
  }
}

const blockingCount = parseFailures.length + vpViolations.length + targetClauseCapableWrongScope.length
  + historicalNameScopeMismatches.length + Number(sanityCounts.vp_scope_binds_clause_level_slot || 0);

console.log(JSON.stringify({
  schema: "canto-span-structural-scope-acceptance-v2",
  runtime_version: api.runtimeVersion,
  corpus: {
    unique_source_context_pairs: corpus.size,
    analyzed: corpus.size - parseFailures.length,
    parse_failures: parseFailures.length,
    construction_rows: constructionRows,
  },
  structural_scope_counts: scopeCounts,
  structural_scope_source_counts: scopeSourceCounts,
  target_construction_counts: targetCounts,
  target_clause_capable_counts: targetClauseCapableCounts,
  target_unspecified_non_clause_counts: targetUnspecifiedNonClauseCounts,
  target_clause_capable_wrong_scope_count: targetClauseCapableWrongScope.length,
  explicit_vp_violation_count: vpViolations.length,
  historical_name_scope_mismatch_count: historicalNameScopeMismatches.length,
  sanity_finding_counts: sanityCounts,
  blocking_count: blockingCount,
  target_clause_capable_wrong_scope: targetClauseCapableWrongScope.slice(0, 20),
  vp_violations: vpViolations.slice(0, 20),
  historical_name_scope_mismatches: historicalNameScopeMismatches.slice(0, 20),
  parse_failures: parseFailures.slice(0, 20),
  note: "Target-label occurrences without authored/realized clause-level slots may remain unspecified; they are informational and are not the subject-binding structural defect addressed by #682.",
}, null, 2));

process.exit(1);
