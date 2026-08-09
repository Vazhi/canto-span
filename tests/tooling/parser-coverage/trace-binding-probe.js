#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi } = require("../../lib/runtime-api");
const { enhanceCoverageRecord } = require("../../../tools/parser-coverage-enhanced");

const root = path.resolve(__dirname, "../../..");
const api = loadRuntimeApi({ apiNames: ["analyzeLine", "diagnosticSummary", "diagnosticFinalRows"] });

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

const counts = {
  construction_rows: 0,
  semantic_bindings: 0,
  compatibility_array_count_mismatches: 0,
  missing_binding_schema: 0,
  missing_binding_status: 0,
  semantic_slot_trace_not_complete: 0,
  unresolved_structured_bindings: 0,
  invalid_structured_binding_spans: 0,
  source_binding_containment_mismatches: 0,
  parser_binding_containment_mismatches: 0,
  parser_alignment_warnings: 0,
  source_alignment_warnings: 0,
  legacy_slot_surface_sanity_findings: 0,
  structured_binding_sanity_findings: 0,
  slot_surface_outside_sanity_findings: 0,
};
const statusCounts = {};
const resolutionCounts = {};
const scopeCounts = {};
const errors = [];
const parseFailures = [];

function bump(target, key) {
  target[key] = (target[key] || 0) + 1;
}

function sample(kind, item, limit = 20) {
  if (errors.length >= limit) return;
  errors.push({ kind, ...item });
}

function debugNode(node) {
  if (!node || typeof node !== "object") return null;
  const trace = node.trace || {};
  return {
    kind: node.kind || "",
    type: node.type || "",
    surface: node.surface || "",
    raw_surface: node.raw_surface || "",
    display_surface: node.display_surface || "",
    raw_display_surface: node.raw_display_surface || "",
    binding_status: trace.binding_contract_status || "",
    construction_provenance: trace.construction_provenance || null,
    components: Array.isArray(trace.components) ? trace.components : [],
    children: (node.children || []).map(debugNode),
  };
}

for (const item of corpus.values()) {
  let analysis;
  let rows;
  let record;
  try {
    analysis = api.analyzeLine(item.source, item.context_source || null);
    const summary = api.diagnosticSummary(analysis);
    rows = api.diagnosticFinalRows(analysis);
    record = enhanceCoverageRecord(summary, rows, {
      source: item.source,
      source_artifact: [...item.origins].sort().join(","),
    });
  } catch (error) {
    parseFailures.push({
      source: item.source,
      context_source: item.context_source,
      error: error && error.message ? error.message : String(error),
    });
    continue;
  }

  const alignment = analysis.trace_binding_provenance || {};
  if (alignment.parser_alignment_status !== "PASS") {
    counts.parser_alignment_warnings += 1;
    sample("parser_alignment", {
      source: item.source,
      parser_shadow_source: analysis.parser_shadow_source,
      alignment,
      top_level_nodes: (analysis.nodes || []).map(debugNode),
    });
  }
  if (alignment.source_alignment_status !== "PASS") {
    counts.source_alignment_warnings += 1;
    sample("source_alignment", {
      source: item.source,
      parser_shadow_source: analysis.parser_shadow_source,
      alignment,
      top_level_nodes: (analysis.nodes || []).map(debugNode),
    });
  }

  const constructionRows = (rows || []).filter((row) => row && row.kind === "construction");
  counts.construction_rows += constructionRows.length;

  for (const row of constructionRows) {
    const detail = row.trace_detail || {};
    const construction = row.construction || row.internal_construction || detail.construction_type || "";
    const assigned = Array.isArray(detail.assigned_slots) ? detail.assigned_slots : [];
    const surfaces = Array.isArray(detail.surfaces) ? detail.surfaces : [];
    const bindings = Array.isArray(detail.bindings) ? detail.bindings : [];
    if ((assigned.length || surfaces.length) && assigned.length !== surfaces.length) {
      counts.compatibility_array_count_mismatches += 1;
    }
    if (detail.trace_binding_schema !== "canto-span-trace-bindings-v1") {
      counts.missing_binding_schema += 1;
      sample("missing_schema", { source: item.source, construction });
    }
    if (!detail.binding_contract_status) {
      counts.missing_binding_status += 1;
      sample("missing_status", { source: item.source, construction });
    }
    bump(statusCounts, detail.binding_contract_status || "missing");
    bump(resolutionCounts, detail.binding_resolution || "missing");

    if (assigned.length && detail.binding_contract_status !== "complete") {
      counts.semantic_slot_trace_not_complete += 1;
      sample("semantic_slot_trace_not_complete", {
        source: item.source,
        construction,
        status: detail.binding_contract_status || "missing",
        assigned_slots: assigned,
      });
    }
    if (detail.binding_contract_status === "legacy_unresolved") {
      counts.unresolved_structured_bindings += 1;
      sample("legacy_unresolved", { source: item.source, construction, assigned_slots: assigned });
    }

    for (const binding of bindings) {
      counts.semantic_bindings += 1;
      bump(scopeCounts, binding.binding_scope || "missing");
      const relative = binding.relative_display_span || binding.relative_source_span || binding.relative_parser_span || {};
      if (
        !binding.slot || relative.status !== "unique" ||
        !Number.isInteger(relative.start) || !Number.isInteger(relative.end) ||
        relative.start < 0 || relative.end < relative.start
      ) {
        counts.invalid_structured_binding_spans += 1;
        sample("invalid_binding_span", { source: item.source, construction, slot: binding.slot || "", relative });
      }

      const sourceSpan = binding.source_span || {};
      if (sourceSpan.status === "unique") {
        const actual = item.source.slice(sourceSpan.start, sourceSpan.end);
        const expected = String(binding.source_surface || binding.display_surface || "");
        if (actual !== expected) {
          counts.source_binding_containment_mismatches += 1;
          sample("source_containment", { source: item.source, construction, slot: binding.slot || "", expected, actual, source_span: sourceSpan });
        }
      }

      const parserSpan = binding.parser_span || {};
      if (parserSpan.status === "unique") {
        const actual = String(analysis.parser_shadow_source || "").slice(parserSpan.start, parserSpan.end);
        const expected = String(binding.parser_surface || "");
        if (actual !== expected) {
          counts.parser_binding_containment_mismatches += 1;
          sample("parser_containment", { source: item.source, construction, slot: binding.slot || "", expected, actual, parser_span: parserSpan });
        }
      }
    }
  }

  for (const finding of record.sanity_findings || []) {
    if (finding.code === "slot_surface_count_mismatch") counts.legacy_slot_surface_sanity_findings += 1;
    if (finding.code === "slot_surface_outside_construction") counts.slot_surface_outside_sanity_findings += 1;
    if (String(finding.code || "").startsWith("structured_binding")) {
      counts.structured_binding_sanity_findings += 1;
      sample("structured_sanity", { source: item.source, finding });
    }
  }
}

const blockingCount =
  parseFailures.length +
  counts.missing_binding_schema +
  counts.missing_binding_status +
  counts.semantic_slot_trace_not_complete +
  counts.unresolved_structured_bindings +
  counts.invalid_structured_binding_spans +
  counts.source_binding_containment_mismatches +
  counts.parser_binding_containment_mismatches +
  counts.parser_alignment_warnings +
  counts.source_alignment_warnings +
  counts.legacy_slot_surface_sanity_findings +
  counts.structured_binding_sanity_findings +
  counts.slot_surface_outside_sanity_findings;

console.log(JSON.stringify({
  schema: "canto-span-repo-wide-structured-trace-binding-probe-v1",
  runtime_version: api.runtimeVersion,
  corpus: {
    regression_cases: (regression.cases || []).length,
    np_cases: (np.cases || []).length,
    unique_source_context_pairs: corpus.size,
    analyzed: corpus.size - parseFailures.length,
    parse_failures: parseFailures.length,
  },
  counts,
  binding_status_counts: statusCounts,
  binding_resolution_counts: resolutionCounts,
  binding_scope_counts: scopeCounts,
  blocking_count: blockingCount,
  samples: errors,
  parse_failures: parseFailures.slice(0, 20),
  note: "compatibility_array_count_mismatches intentionally measures preserved legacy-array asymmetry; it is informational and is not included in blocking_count",
}, null, 2));

// Temporary branch-only probe: deliberately fail after emitting the report so
// Actions retains it in the standard runtime-test failure output. Remove before PR readiness.
process.exit(1);
