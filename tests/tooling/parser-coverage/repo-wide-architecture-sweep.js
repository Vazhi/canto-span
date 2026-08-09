#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi } = require("../../../tools/lib/runtime-api");
const { enhanceCoverageRecord, aggregateCoverage } = require("../../../tools/parser-coverage-enhanced");
const traceMetadata = require("../../../src/runtime-resources/diagnostics/trace-metadata");

const root = path.resolve(__dirname, "../../..");
const api = loadRuntimeApi({ apiNames: ["analyzeLine", "diagnosticSummary", "diagnosticFinalRows"] });
function readJson(relativePath) { return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8")); }
function bump(obj, key, amount = 1) { obj[key] = (obj[key] || 0) + amount; }
function addSet(map, key, value) { if (!map.has(key)) map.set(key, new Set()); map.get(key).add(value); }
function example(map, key, value, limit = 4) { if (!map.has(key)) map.set(key, []); const a = map.get(key); if (!a.includes(value) && a.length < limit) a.push(value); }

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
for (const file of fs.readdirSync(constructionDir).filter((n) => n.endsWith(".json")).sort()) {
  const spec = JSON.parse(fs.readFileSync(path.join(constructionDir, file), "utf8"));
  for (const group of ["snapshot_cases", "focused_cases", "implementation_probe_cases", "np_cases"]) {
    for (const row of spec[group] || []) add(row.source, row.context_source, `construction:${spec.construction}:${group}`);
  }
}

const records = [];
const failures = [];
for (const item of corpus.values()) {
  try {
    const analysis = api.analyzeLine(item.source, item.context_source || null);
    const record = enhanceCoverageRecord(api.diagnosticSummary(analysis), api.diagnosticFinalRows(analysis), {
      source: item.source,
      source_artifact: [...item.origins].sort().join(","),
    });
    record.context_source = item.context_source;
    records.push(record);
  } catch (error) {
    failures.push({ source: item.source, context_source: item.context_source, error: error.message || String(error) });
  }
}
const aggregate = aggregateCoverage(records, { sampleLimit: 10 });

const observedLabels = new Set();
const traceKindCounts = {};
const familyCounts = {};
const sanityCounts = {};
const scope = new Map();
const missingFamily = new Map();
const countMismatch = new Map();
const emptySurface = new Map();
const outsideSurface = new Map();
const constructionMatchers = new Map();
const labelRuleMatchers = new Map();
const matcherLabels = new Map();
const matcherDefs = new Map();
const matcherExamples = new Map();
const ruleSourceCounts = {};

function groupRow(map, key, construction, reason, source, matcher, extra = {}) {
  if (!map.has(key)) map.set(key, { construction, reason, count: 0, matchers: new Set(), examples: [], ...extra });
  const row = map.get(key);
  row.count += 1;
  if (matcher) row.matchers.add(matcher);
  if (!row.examples.includes(source) && row.examples.length < 5) row.examples.push(source);
  return row;
}

for (const record of records) {
  for (const finding of record.sanity_findings || []) bump(sanityCounts, finding.code || "unknown");
  for (const trace of record.construction_traces || []) {
    const label = trace.construction || trace.internal_construction || "unknown";
    const matcher = trace.matcher_id || "unavailable";
    const rule = trace.rule_descriptor || "unavailable";
    const kind = trace.trace_kind || "unknown";
    const family = trace.template_family || "(missing)";
    observedLabels.add(label);
    bump(traceKindCounts, kind);
    bump(familyCounts, family);
    bump(ruleSourceCounts, trace.rule_descriptor_source || "unknown");
    addSet(constructionMatchers, label, matcher);
    addSet(labelRuleMatchers, `${label}\u0000${rule}`, matcher);
    addSet(matcherLabels, matcher, label);
    matcherDefs.set(matcher, trace.matcher_definition || null);
    example(matcherExamples, matcher, record.source);

    const slots = (trace.slot_bindings || []).map((b) => b.slot).filter(Boolean);
    if (/VP$/.test(label) && slots.some((s) => ["subject", "overt_subject", "topic"].includes(s))) {
      const row = groupRow(scope, label, label, "VP_label_binds_clause_level_subject_or_topic", record.source, matcher, { slots: new Set() });
      slots.forEach((s) => row.slots.add(s));
    } else if (/NP$/.test(label) && slots.some((s) => ["subject", "overt_subject", "predicate", "vp", "clause"].includes(s))) {
      const row = groupRow(scope, label, label, "NP_label_binds_clause_or_predicate_slot", record.source, matcher, { slots: new Set() });
      slots.forEach((s) => row.slots.add(s));
    } else if (/Phrase$/.test(label) && slots.some((s) => ["subject", "overt_subject"].includes(s))) {
      const row = groupRow(scope, label, label, "Phrase_label_binds_subject", record.source, matcher, { slots: new Set() });
      slots.forEach((s) => row.slots.add(s));
    }

    if (kind === "generative_template" && !trace.template_family) {
      groupRow(missingFamily, label, label, "generative_trace_missing_template_family", record.source, matcher);
    }

    const assigned = Array.isArray(trace.assigned_slots) ? trace.assigned_slots : [];
    const surfaces = Array.isArray(trace.slot_surfaces) ? trace.slot_surfaces : [];
    if (assigned.length !== surfaces.length) {
      const row = groupRow(countMismatch, label, label, "assigned_slot_surface_count_mismatch", record.source, matcher, { shapes: new Set() });
      row.shapes.add(`${assigned.length}:${surfaces.length}`);
    }
    for (const binding of trace.slot_bindings || []) {
      if (!binding.surface) {
        const row = groupRow(emptySurface, label, label, "empty_assigned_slot_surface", record.source, matcher, { slots: new Set() });
        if (binding.slot) row.slots.add(binding.slot);
      }
      if (binding.surface && trace.surface && !trace.surface.includes(binding.surface)) {
        const row = groupRow(outsideSurface, label, label, "slot_surface_not_contained_in_construction_surface", record.source, matcher, { slots: new Set() });
        if (binding.slot) row.slots.add(binding.slot);
      }
    }
  }
}

function compactGroup(map, setKeys = []) {
  return [...map.values()].map((row) => {
    const out = { ...row, matchers: [...row.matchers].sort() };
    for (const key of setKeys) if (out[key] instanceof Set) out[key] = [...out[key]].sort();
    return out;
  }).sort((a, b) => b.count - a.count || a.construction.localeCompare(b.construction));
}
const hiddenVariants = [...labelRuleMatchers.entries()].filter(([, s]) => s.size > 1).map(([key, ids]) => {
  const [construction, rule_descriptor] = key.split("\u0000");
  return {
    construction,
    rule_descriptor,
    matcher_count: ids.size,
    variants: [...ids].sort().map((id) => ({ matcher_id: id, constraints: matcherDefs.get(id)?.constraints || {}, template_family: matcherDefs.get(id)?.template_family || "", examples: matcherExamples.get(id) || [] })),
  };
}).sort((a, b) => b.matcher_count - a.matcher_count || a.construction.localeCompare(b.construction));
const multiMatcher = [...constructionMatchers.entries()].filter(([, s]) => s.size > 1).map(([construction, s]) => ({ construction, matcher_count: s.size })).sort((a, b) => b.matcher_count - a.matcher_count || a.construction.localeCompare(b.construction));
const collisions = [...matcherLabels.entries()].filter(([, s]) => s.size > 1).map(([matcher_id, s]) => ({ matcher_id, constructions: [...s].sort() }));

const registeredKinds = new Set((traceMetadata.parserDecisionTraceKindRegistry || []).map(([name]) => name));
const registeredFamilies = new Set((traceMetadata.templateFamilyRegistry || []).map(([name]) => name));
const unregisteredKinds = Object.entries(traceKindCounts).filter(([name]) => !registeredKinds.has(name)).map(([trace_kind, count]) => ({ trace_kind, count }));
const unregisteredFamilies = Object.entries(familyCounts).filter(([name]) => name !== "(missing)" && !registeredFamilies.has(name)).map(([template_family, count]) => ({ template_family, count }));

const policyText = fs.readFileSync(path.join(root, "src/runtime-resources/diagnostics/trace-metadata.js"), "utf8");
const staticPolicyHits = [
  "eventual_target: \"all productive grammar should become generative_template once the parser can target POS/slots rather than individual vocabulary\"",
  "preserve_construction_template_vs_generative_template_until_all_grammar_is_generative",
  "eventually be promoted to fully generative POS-targeting templates",
  "Move construction-function fallback into a governed template or classify it as intentionally non-template",
].filter((text) => policyText.includes(text));

const output = {
  schema: "canto-span-repo-wide-parser-architecture-sweep-compact-v2",
  runtime_version: api.runtimeVersion,
  corpus: { regression_cases: (regression.cases || []).length, np_cases: (np.cases || []).length, unique_source_context_pairs: corpus.size, analyzed: records.length, parse_failures: failures.length },
  aggregate: {
    coverage_status_counts: aggregate.coverage_status_counts,
    sanity_finding_counts: sanityCounts,
    unresolved_slot_span_count: aggregate.unresolved_slot_span_count,
    slot_span_resolution_counts: aggregate.slot_span_resolution_counts,
    observed_construction_count: observedLabels.size,
    trace_kind_counts: traceKindCounts,
    template_family_counts: familyCounts,
    rule_descriptor_source_counts: ruleSourceCounts,
    architectural_debt_trace_counts: aggregate.architectural_debt_trace_counts,
  },
  grouped: {
    scope_mismatches: compactGroup(scope, ["slots"]),
    slot_surface_count_mismatches: compactGroup(countMismatch, ["shapes"]),
    empty_slot_surfaces: compactGroup(emptySurface, ["slots"]),
    slot_surfaces_outside_construction: compactGroup(outsideSurface, ["slots"]),
    missing_template_family: compactGroup(missingFamily),
    same_label_same_visible_rule_multiple_matchers: hiddenVariants,
    labels_with_multiple_matchers: multiMatcher,
    matcher_id_cross_label_collisions: collisions,
    unregistered_trace_kinds: unregisteredKinds,
    unregistered_template_families: unregisteredFamilies,
  },
  static_diagnostic_policy_hits: staticPolicyHits,
  parse_failures: failures.slice(0, 10),
};
console.log(JSON.stringify(output, null, 2));
process.exit(1);
