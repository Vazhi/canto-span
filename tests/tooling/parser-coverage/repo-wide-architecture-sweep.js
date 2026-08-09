#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi } = require("../../../tools/lib/runtime-api");
const { enhanceCoverageRecord, aggregateCoverage, canonicalJson } = require("../../../tools/parser-coverage-enhanced");

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

const records = [];
const parseFailures = [];
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
    parseFailures.push({ source: item.source, context_source: item.context_source, error: error.message || String(error) });
  }
}

const aggregate = aggregateCoverage(records, { sampleLimit: 20 });
const observedLabels = new Set();
const traceKindCounts = {};
const familyCounts = {};
const sanityCounts = {};
const scopeCandidates = new Map();
const missingFamilies = new Map();
const constructionMatchers = new Map();
const labelRuleMatchers = new Map();
const matcherConstructionLabels = new Map();
const matcherExamples = new Map();
const matcherDefinitions = new Map();
const ruleSourceCounts = {};

function bump(obj, key) { obj[key] = (obj[key] || 0) + 1; }
function addMapSet(map, key, value) { if (!map.has(key)) map.set(key, new Set()); map.get(key).add(value); }
function addExample(map, key, source, limit = 5) {
  if (!map.has(key)) map.set(key, []);
  const list = map.get(key);
  if (!list.includes(source) && list.length < limit) list.push(source);
}

for (const record of records) {
  for (const finding of record.sanity_findings || []) bump(sanityCounts, finding.code || "unknown");
  for (const trace of record.construction_traces || []) {
    const label = trace.construction || trace.internal_construction || "unknown";
    observedLabels.add(label);
    bump(traceKindCounts, trace.trace_kind || "unknown");
    bump(familyCounts, trace.template_family || "(missing)");
    bump(ruleSourceCounts, trace.rule_descriptor_source || "unknown");
    const matcher = trace.matcher_id || "unavailable";
    addMapSet(constructionMatchers, label, matcher);
    addMapSet(matcherConstructionLabels, matcher, label);
    addExample(matcherExamples, matcher, record.source);
    if (trace.matcher_definition) matcherDefinitions.set(matcher, trace.matcher_definition);
    const rule = trace.rule_descriptor || "unavailable";
    addMapSet(labelRuleMatchers, `${label}\u0000${rule}`, matcher);

    const slots = (trace.slot_bindings || []).map((binding) => binding.slot).filter(Boolean);
    let reason = "";
    if (/VP$/.test(label) && slots.some((slot) => ["subject", "overt_subject", "topic"].includes(slot))) {
      reason = "VP_label_binds_clause_level_subject_or_topic";
    } else if (/NP$/.test(label) && slots.some((slot) => ["subject", "overt_subject", "predicate", "vp", "clause"].includes(slot))) {
      reason = "NP_label_binds_clause_or_predicate_slot";
    } else if (/Phrase$/.test(label) && slots.some((slot) => ["subject", "overt_subject"].includes(slot))) {
      reason = "Phrase_label_binds_subject";
    }
    if (reason) {
      const key = `${label}\u0000${reason}`;
      if (!scopeCandidates.has(key)) scopeCandidates.set(key, { construction: label, reason, count: 0, slots: new Set(), matchers: new Set(), examples: [] });
      const row = scopeCandidates.get(key);
      row.count += 1;
      slots.forEach((slot) => row.slots.add(slot));
      row.matchers.add(matcher);
      if (!row.examples.includes(record.source) && row.examples.length < 8) row.examples.push(record.source);
    }

    if (trace.trace_kind === "generative_template" && !trace.template_family) {
      if (!missingFamilies.has(label)) missingFamilies.set(label, { construction: label, count: 0, matchers: new Set(), examples: [] });
      const row = missingFamilies.get(label);
      row.count += 1;
      row.matchers.add(matcher);
      if (!row.examples.includes(record.source) && row.examples.length < 8) row.examples.push(record.source);
    }
  }
}

function serializeScope(row) {
  return { ...row, slots: [...row.slots].sort(), matchers: [...row.matchers].sort() };
}
function serializeMatcherGroup([label, set]) {
  const matcherIds = [...set].sort();
  return {
    construction: label,
    matcher_count: matcherIds.length,
    matcher_ids: matcherIds,
    definitions: matcherIds.map((id) => ({ matcher_id: id, definition: matcherDefinitions.get(id) || null, examples: matcherExamples.get(id) || [] })),
  };
}
function serializeLabelRule([key, set]) {
  const [construction, rule_descriptor] = key.split("\u0000");
  const matcherIds = [...set].sort();
  return {
    construction,
    rule_descriptor,
    matcher_count: matcherIds.length,
    variants: matcherIds.map((id) => ({ matcher_id: id, definition: matcherDefinitions.get(id) || null, examples: matcherExamples.get(id) || [] })),
  };
}

const multiMatcherLabels = [...constructionMatchers.entries()]
  .filter(([, set]) => set.size > 1)
  .map(serializeMatcherGroup)
  .sort((a, b) => b.matcher_count - a.matcher_count || a.construction.localeCompare(b.construction));

const hiddenMatcherVariants = [...labelRuleMatchers.entries()]
  .filter(([, set]) => set.size > 1)
  .map(serializeLabelRule)
  .sort((a, b) => b.matcher_count - a.matcher_count || a.construction.localeCompare(b.construction));

const matcherCollisions = [...matcherConstructionLabels.entries()]
  .filter(([, set]) => set.size > 1)
  .map(([matcher_id, labels]) => ({ matcher_id, constructions: [...labels].sort(), examples: matcherExamples.get(matcher_id) || [] }));

const policyPath = path.join(root, "src", "runtime-resources", "diagnostics", "trace-metadata.js");
const policyText = fs.readFileSync(policyPath, "utf8");
const policyPatterns = [
  /eventual_target:\s*"([^"]+)"/g,
  /eventually be promoted to fully generative POS-targeting templates/g,
  /preserve_construction_template_vs_generative_template_until_all_grammar_is_generative/g,
  /Move construction-function fallback into a governed template or classify it as intentionally non-template/g,
];
const staticPolicyHits = [];
for (const pattern of policyPatterns) {
  for (const match of policyText.matchAll(pattern)) staticPolicyHits.push(match[0]);
}

const output = {
  schema: "canto-span-repo-wide-parser-architecture-sweep-v1",
  runtime_version: api.runtimeVersion,
  corpus: {
    regression_case_count: (regression.cases || []).length,
    np_case_count: (np.cases || []).length,
    unique_source_context_pairs: corpus.size,
    analyzed: records.length,
    parse_failures: parseFailures.length,
  },
  aggregate: {
    coverage_status_counts: aggregate.coverage_status_counts,
    root_span_coverage_status_counts: aggregate.root_span_coverage_status_counts,
    sanity_finding_counts: sanityCounts,
    unresolved_slot_span_count: aggregate.unresolved_slot_span_count,
    slot_span_resolution_counts: aggregate.slot_span_resolution_counts,
    architectural_debt_trace_counts: aggregate.architectural_debt_trace_counts,
    observed_construction_count: observedLabels.size,
    trace_kind_counts: traceKindCounts,
    template_family_counts: familyCounts,
    rule_descriptor_source_counts: ruleSourceCounts,
  },
  strong_scope_mismatch_candidates: [...scopeCandidates.values()].map(serializeScope).sort((a, b) => b.count - a.count || a.construction.localeCompare(b.construction)),
  generative_traces_missing_template_family: [...missingFamilies.values()].map((row) => ({ ...row, matchers: [...row.matchers].sort() })).sort((a, b) => b.count - a.count || a.construction.localeCompare(b.construction)),
  same_label_same_visible_rule_multiple_matchers: hiddenMatcherVariants,
  labels_with_multiple_matchers: multiMatcherLabels,
  matcher_id_cross_label_collisions: matcherCollisions,
  static_diagnostic_policy_hits: [...new Set(staticPolicyHits)],
  parse_failures: parseFailures.slice(0, 20),
};

console.log(JSON.stringify(output, null, 2));
process.exit(1);
