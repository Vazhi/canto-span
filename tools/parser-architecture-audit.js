#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi } = require("./lib/runtime-api");
const {
  aggregateCoverage,
  enhanceCoverageRecord,
} = require("./parser-coverage-enhanced");
const {
  TRACE_TAXONOMY_SCHEMA,
  parserDecisionTraceKindRegistry,
  templateFamilyRegistry,
  structuralScopeRegistry,
} = require("../src/runtime-resources/diagnostics/trace-metadata");
const { TRACE_BINDING_SCHEMA } = require("../src/parser/diagnostics/trace-bindings")();

const ARCHITECTURE_AUDIT_SCHEMA = "canto-span-parser-architecture-audit-v1";
const DEFAULT_SAMPLE_LIMIT = 8;
const ALLOWED_MIGRATION_DEBT_BUCKETS = new Set([
  "legacy_surface_rule",
  "surface_specific_rule",
  "slot_heuristic",
  "predicate_heuristic",
]);
const CLAUSE_LEVEL_SLOTS = new Set(["subject", "overt_subject", "topic"]);

function readJson(root, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function buildExecutableCorpus(root) {
  const corpus = new Map();
  function add(source, contextSource, origin) {
    if (!source || typeof source !== "string") return;
    const context = contextSource || "";
    const key = `${context}\u0000${source}`;
    if (!corpus.has(key)) corpus.set(key, { source, context_source: context, origins: new Set() });
    corpus.get(key).origins.add(origin);
  }

  const regression = readJson(root, "tests/fixtures/regression-snapshots.json");
  for (const row of regression.cases || []) add(row.source, row.context_source, "regression");

  const np = readJson(root, "tests/fixtures/np-subsystem.json");
  for (const row of np.cases || []) add(row.surface, "", "np");

  const constructionDir = path.join(root, "tests", "constructions");
  for (const file of fs.readdirSync(constructionDir).filter((name) => name.endsWith(".json")).sort()) {
    const spec = JSON.parse(fs.readFileSync(path.join(constructionDir, file), "utf8"));
    for (const group of ["snapshot_cases", "focused_cases", "implementation_probe_cases", "np_cases"]) {
      for (const row of spec[group] || []) {
        add(row.source, row.context_source, `construction:${spec.construction}:${group}`);
      }
    }
  }

  return [...corpus.values()].map((item) => ({
    ...item,
    origins: [...item.origins].sort(),
  }));
}

function templateSlotName(item) {
  return String(item || "").replace(/[!?+*]+$/g, "");
}

function traceDeclaresClauseLevelSlot(trace = {}) {
  const assigned = Array.isArray(trace.assigned_slots) ? trace.assigned_slots : [];
  const template = Array.isArray(trace.template) ? trace.template.map(templateSlotName) : [];
  return [...assigned, ...template].some((slot) => CLAUSE_LEVEL_SLOTS.has(slot));
}

function validUniqueSpan(span, maxLength = null) {
  if (!span || span.status !== "unique") return false;
  if (!Number.isInteger(span.start) || !Number.isInteger(span.end)) return false;
  if (span.start < 0 || span.end < span.start) return false;
  if (Number.isInteger(maxLength) && span.end > maxLength) return false;
  return true;
}

function nestedWithin(inner, outer) {
  return validUniqueSpan(inner) && validUniqueSpan(outer)
    && inner.start >= outer.start && inner.end <= outer.end;
}

function createFailureCollector(sampleLimit = DEFAULT_SAMPLE_LIMIT) {
  const groups = new Map();
  return {
    add(code, context = {}) {
      if (!groups.has(code)) groups.set(code, { code, count: 0, examples: [] });
      const group = groups.get(code);
      group.count += 1;
      if (group.examples.length < sampleLimit) group.examples.push(context);
    },
    report() {
      return [...groups.values()].sort((a, b) => b.count - a.count || a.code.localeCompare(b.code));
    },
    count() {
      return [...groups.values()].reduce((sum, group) => sum + group.count, 0);
    },
  };
}

function unexplainedMatcherSplits(traces = []) {
  const groups = new Map();
  for (const trace of traces) {
    if (!trace || !trace.matcher_fingerprint) continue;
    const key = `${trace.construction || ""}\u0000${trace.rule_descriptor || ""}`;
    if (!groups.has(key)) groups.set(key, {
      construction: trace.construction || "",
      rule_descriptor: trace.rule_descriptor || "",
      fingerprints: new Map(),
    });
    const group = groups.get(key);
    if (!group.fingerprints.has(trace.matcher_fingerprint)) {
      group.fingerprints.set(trace.matcher_fingerprint, { count: 0, variant_ids: new Set(), examples: [] });
    }
    const fp = group.fingerprints.get(trace.matcher_fingerprint);
    fp.count += 1;
    if (trace.matcher_variant_id) fp.variant_ids.add(trace.matcher_variant_id);
    if (fp.examples.length < 3) fp.examples.push(trace.surface || "");
  }

  const unexplained = [];
  for (const group of groups.values()) {
    if (group.fingerprints.size <= 1) continue;
    const entries = [...group.fingerprints.entries()].map(([fingerprint, detail]) => ({
      fingerprint,
      count: detail.count,
      variant_ids: [...detail.variant_ids].sort(),
      examples: detail.examples,
    }));
    const ids = entries.map((entry) => entry.variant_ids.length === 1 ? entry.variant_ids[0] : "");
    const explained = ids.every(Boolean) && new Set(ids).size === entries.length;
    if (!explained) {
      unexplained.push({
        construction: group.construction,
        rule_descriptor: group.rule_descriptor,
        fingerprint_count: entries.length,
        fingerprints: entries,
      });
    }
  }
  return unexplained.sort((a, b) => a.construction.localeCompare(b.construction));
}

function auditArchitecture(options = {}) {
  const root = options.root || path.resolve(__dirname, "..");
  const api = options.api || loadRuntimeApi({ apiNames: [
    "analyzeLine",
    "diagnosticSummary",
    "diagnosticFinalRows",
    "labelTransitionAuditRows",
  ] });
  const corpus = options.corpus || buildExecutableCorpus(root);
  const failures = createFailureCollector(options.sampleLimit || DEFAULT_SAMPLE_LIMIT);
  const registeredKinds = new Set(parserDecisionTraceKindRegistry.map(([kind]) => kind));
  const registeredFamilies = new Set(templateFamilyRegistry.map(([family]) => family));
  const registeredScopes = new Set(structuralScopeRegistry.map(([scope]) => scope));
  const records = [];
  const allTraces = [];
  const coverageStatusCounts = {};
  const taxonomyStatusCounts = {};
  const structuralScopeCounts = {};
  const bindingContractStatusCounts = {};
  const transitionStatusCounts = {};
  const transitionBucketCounts = {};
  let constructionRows = 0;
  let semanticBindingCount = 0;

  function bump(target, key) {
    target[key] = (target[key] || 0) + 1;
  }

  for (const item of corpus) {
    let analysis;
    try {
      analysis = api.analyzeLine(item.source, item.context_source || null);
    } catch (error) {
      failures.add("parse_failure", {
        source: item.source,
        context_source: item.context_source,
        error: error.message || String(error),
      });
      continue;
    }

    const bindingSummary = analysis.trace_binding_provenance || {};
    if (bindingSummary.schema !== TRACE_BINDING_SCHEMA) {
      failures.add("trace_binding_summary_schema_invalid", { source: item.source, schema: bindingSummary.schema || "" });
    }
    if (bindingSummary.parser_alignment_status !== "PASS") {
      failures.add("parser_source_alignment_failure", {
        source: item.source,
        consumed: bindingSummary.parser_consumed_length,
        length: bindingSummary.parser_source_length,
      });
    }
    if (bindingSummary.source_alignment_status !== "PASS") {
      failures.add("raw_source_alignment_failure", {
        source: item.source,
        consumed: bindingSummary.source_consumed_length,
        length: bindingSummary.raw_source_length,
      });
    }

    const finalRows = api.diagnosticFinalRows(analysis);
    const record = enhanceCoverageRecord(api.diagnosticSummary(analysis), finalRows, { source: item.source });
    records.push(record);
    bump(coverageStatusCounts, record.coverage_status || "UNKNOWN");

    for (const finding of record.sanity_findings || []) {
      if (finding.severity === "error") {
        failures.add(`sanity:${finding.code || "unknown"}`, {
          source: item.source,
          construction: finding.construction || "",
          surface: finding.surface || "",
        });
      }
    }

    for (const trace of record.construction_traces || []) {
      constructionRows += 1;
      allTraces.push(trace);
      bump(taxonomyStatusCounts, trace.taxonomy_status || "missing");
      bump(structuralScopeCounts, trace.structural_scope || "missing");
      bump(bindingContractStatusCounts, trace.binding_contract_status || "missing");
      semanticBindingCount += (trace.slot_bindings || []).length;

      const context = { source: item.source, construction: trace.construction, surface: trace.surface };
      if (trace.trace_binding_schema !== TRACE_BINDING_SCHEMA) {
        failures.add("trace_binding_schema_missing_or_invalid", { ...context, schema: trace.trace_binding_schema || "" });
      }
      if (!new Set(["complete", "not_applicable"]).has(trace.binding_contract_status)) {
        failures.add("trace_binding_contract_unresolved", { ...context, status: trace.binding_contract_status || "" });
      }
      if (trace.binding_contract_status === "not_applicable" && (trace.slot_bindings || []).length) {
        failures.add("non_slot_trace_has_semantic_bindings", context);
      }

      const provenance = trace.construction_provenance || {};
      if (!validUniqueSpan(provenance.source_span, item.source.length)) {
        failures.add("construction_source_span_invalid", context);
      }
      if (!validUniqueSpan(provenance.display_span, item.source.length)) {
        failures.add("construction_display_span_invalid", context);
      }
      if (!validUniqueSpan(provenance.parser_span)) {
        failures.add("construction_parser_span_invalid", context);
      }

      if (trace.binding_contract_status === "complete") {
        for (const binding of trace.slot_bindings || []) {
          const bindingContext = { ...context, slot: binding.slot || "" };
          if (!validUniqueSpan(binding.source_span, item.source.length)) {
            failures.add("binding_source_span_invalid", bindingContext);
          } else if (!nestedWithin(binding.source_span, provenance.source_span)) {
            failures.add("binding_source_span_outside_construction", bindingContext);
          }
          if (!validUniqueSpan(binding.display_span, item.source.length)) {
            failures.add("binding_display_span_invalid", bindingContext);
          } else if (!nestedWithin(binding.display_span, provenance.display_span)) {
            failures.add("binding_display_span_outside_construction", bindingContext);
          }
          if (!validUniqueSpan(binding.parser_span)) {
            failures.add("binding_parser_span_invalid", bindingContext);
          } else if (!nestedWithin(binding.parser_span, provenance.parser_span)) {
            failures.add("binding_parser_span_outside_construction", bindingContext);
          }
        }
      }

      if (trace.trace_taxonomy_schema !== TRACE_TAXONOMY_SCHEMA) {
        failures.add("trace_taxonomy_schema_missing_or_invalid", { ...context, schema: trace.trace_taxonomy_schema || "" });
      }
      if (trace.taxonomy_status !== "valid") failures.add("trace_taxonomy_invalid", context);
      if (!registeredKinds.has(trace.trace_kind)) failures.add("unregistered_trace_kind", { ...context, trace_kind: trace.trace_kind });
      if (trace.template_family && !registeredFamilies.has(trace.template_family)) {
        failures.add("unregistered_template_family", { ...context, template_family: trace.template_family });
      }
      if (trace.template_family_applicability === "required" && !trace.template_family) {
        failures.add("required_template_family_missing", context);
      }

      if (!registeredScopes.has(trace.structural_scope)) {
        failures.add("unregistered_structural_scope", { ...context, structural_scope: trace.structural_scope || "" });
      }
      if (trace.structural_scope === "vp" && traceDeclaresClauseLevelSlot(trace)) {
        failures.add("vp_scope_binds_clause_level_slot", context);
      }

      if (trace.matcher_variant_applicability === "required" && !trace.matcher_variant_id) {
        failures.add("required_matcher_variant_missing", context);
      }
    }

    for (const row of api.labelTransitionAuditRows(analysis)) {
      bump(transitionStatusCounts, row.transition_status || "missing");
      bump(transitionBucketCounts, row.transition_bucket || "missing");
      if (row.transition_status === "needs_registry_decision") {
        failures.add("label_transition_unclassified", {
          source: item.source,
          construction: row.construction || "",
          transition_bucket: row.transition_bucket || "",
        });
      }
      if (row.transition_status === "migration_candidate" && !ALLOWED_MIGRATION_DEBT_BUCKETS.has(row.transition_bucket)) {
        failures.add("unexpected_architecture_debt_bucket", {
          source: item.source,
          construction: row.construction || "",
          transition_bucket: row.transition_bucket || "",
        });
      }
    }
  }

  const aggregate = aggregateCoverage(records);
  for (const conflict of aggregate.matcher_variant_fingerprint_conflicts || []) {
    failures.add("matcher_variant_maps_to_multiple_fingerprints", conflict);
  }
  for (const conflict of aggregate.matcher_fingerprint_variant_conflicts || []) {
    failures.add("matcher_fingerprint_maps_to_multiple_variants", conflict);
  }
  if (aggregate.required_matcher_variant_missing_count) {
    failures.add("required_matcher_variant_missing_aggregate", { count: aggregate.required_matcher_variant_missing_count });
  }

  const unexplainedSplits = unexplainedMatcherSplits(allTraces);
  for (const split of unexplainedSplits) failures.add("unexplained_matcher_fingerprint_split", split);

  const failureGroups = failures.report();
  return {
    schema: ARCHITECTURE_AUDIT_SCHEMA,
    runtime_version: api.runtimeVersion,
    corpus: {
      unique_source_context_pairs: corpus.length,
      analyzed: records.length,
      parse_failures: failureGroups.find((group) => group.code === "parse_failure")?.count || 0,
      construction_rows: constructionRows,
      semantic_bindings: semanticBindingCount,
    },
    gates: {
      trace_bindings: TRACE_BINDING_SCHEMA,
      trace_taxonomy: TRACE_TAXONOMY_SCHEMA,
      structural_scope: "controlled_runtime_trace_field",
      matcher_variants: "canto-span-matcher-variant-v1",
      label_transition_debt: "explicit_legacy_surface_specific_or_heuristic_only",
    },
    informational: {
      coverage_status_counts: coverageStatusCounts,
      taxonomy_status_counts: taxonomyStatusCounts,
      structural_scope_counts: structuralScopeCounts,
      binding_contract_status_counts: bindingContractStatusCounts,
      transition_status_counts: transitionStatusCounts,
      transition_bucket_counts: transitionBucketCounts,
      matcher_variant_counts: aggregate.matcher_variant_counts || {},
      unresolved_slot_span_count: aggregate.unresolved_slot_span_count || 0,
      architecture_migration_candidate_count: transitionStatusCounts.migration_candidate || 0,
    },
    unexplained_matcher_split_count: unexplainedSplits.length,
    failure_groups: failureGroups,
    blocking_count: failures.count(),
    status: failures.count() ? "FAIL" : "PASS",
    policy: "Architecture contracts are blocking. Linguistic coverage/research gaps such as UNKNOWN_LEXICON or UNRESOLVED_STRUCTURE are informational unless another governance rule explicitly makes them blocking.",
  };
}

function formatHuman(report) {
  const lines = [
    `Parser architecture audit: ${report.status}`,
    `Corpus: ${report.corpus.analyzed}/${report.corpus.unique_source_context_pairs} analyzed; ${report.corpus.construction_rows} construction traces; ${report.corpus.semantic_bindings} semantic bindings`,
    `Blocking findings: ${report.blocking_count}`,
    `Migration candidates (informational architecture debt): ${report.informational.architecture_migration_candidate_count}`,
    "",
  ];
  if (report.failure_groups.length) {
    lines.push("Grouped blockers:");
    for (const group of report.failure_groups) lines.push(`  ${group.code}: ${group.count}`);
  } else {
    lines.push("All permanent architecture gates passed.");
  }
  lines.push("", "Coverage statuses are informational in this gate.");
  return lines.join("\n");
}

if (require.main === module) {
  const report = auditArchitecture();
  if (process.argv.includes("--json")) console.log(JSON.stringify(report, null, 2));
  else console.log(formatHuman(report));
  if (report.blocking_count) process.exit(1);
}

module.exports = {
  ARCHITECTURE_AUDIT_SCHEMA,
  ALLOWED_MIGRATION_DEBT_BUCKETS,
  buildExecutableCorpus,
  createFailureCollector,
  unexplainedMatcherSplits,
  auditArchitecture,
  formatHuman,
};
