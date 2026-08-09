#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi } = require("./lib/runtime-api");

const COVERAGE_SCHEMA = "canto-span-parser-coverage-report-v1";
const RECORD_SCHEMA = "canto-span-parser-coverage-record-v1";

const ACTIONABLE_TRACE_KINDS = Object.freeze([
  "unknown_atomic",
  "legacy_surface_rule",
  "surface_specific_phrase_rule",
  "generative_or_heuristic_slot_rule",
  "predicate_heuristic",
]);

const NEUTRAL_SPECIALIZED_TRACE_KINDS = Object.freeze([
  "construction_function",
  "governed_discourse_wrapper",
  "protected_formula_table",
  "special_ambiguity_rule",
]);

function countFor(counts, key) {
  return Number(counts && counts[key] || 0);
}

function mergeCounts(target, source) {
  for (const [key, rawValue] of Object.entries(source || {})) {
    const value = Number(rawValue || 0);
    if (!value) continue;
    target[key] = (target[key] || 0) + value;
  }
  return target;
}

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function constructionTraceRows(finalRows = []) {
  return (finalRows || [])
    .filter((row) => row && row.kind === "construction")
    .map((row) => {
      const detail = row.trace_detail || {};
      return {
        surface: row.display_surface || row.surface || "",
        construction: row.construction || row.internal_construction || row.type || "",
        depth: Number(row.depth || 0),
        parent: row.parent || "",
        trace_kind: detail.kind || row.trace || "unspecified",
        template_family: detail.template_family || "",
      };
    });
}

function categoriesForSummary(summary = {}) {
  const trace = summary.trace_summary || {};
  const templateFamilies = summary.template_family_summary || {};
  const categories = [];
  const unknownCount = countFor(trace, "unknown_atomic");
  const rootStatus = summary.root_span_coverage_status || "";
  const rootCount = Number(summary.root_top_construction_count || 0);

  if (Number(summary.construction_count || 0) > 0) categories.push("matched_construction");
  if (countFor(trace, "generative_template") > 0) categories.push("template_match");
  if (countFor(templateFamilies, "construction_template") > 0) categories.push("bounded_template_match");
  if (countFor(templateFamilies, "generative_template") > 0) categories.push("generative_template_match");
  if (countFor(trace, "generative_or_heuristic_slot_rule") + countFor(trace, "predicate_heuristic") > 0) {
    categories.push("heuristic_decision");
  }
  if (countFor(trace, "surface_specific_phrase_rule") > 0) categories.push("surface_specific_decision");
  if (countFor(trace, "legacy_surface_rule") > 0) categories.push("legacy_fallback_decision");
  if (countFor(trace, "construction_function") > 0) categories.push("hand_coded_construction");
  if (countFor(trace, "governed_discourse_wrapper") > 0) categories.push("governed_wrapper");
  if (countFor(trace, "protected_formula_table") > 0) categories.push("protected_formula");
  if (countFor(trace, "special_ambiguity_rule") > 0) categories.push("ambiguity_guard");
  if (unknownCount > 0) categories.push("unknown_lexicon");

  if (!unknownCount && ["NO_TOP_CONSTRUCTION", "PARTIAL"].includes(rootStatus)) {
    categories.push("known_lexicon_unresolved_structure");
  }
  if (rootStatus === "MULTIPLE_ROOT_CONSTRUCTIONS" || rootCount > 1) categories.push("competing_structure");

  const contextStatus = summary.context_requirement_status || "context_not_required";
  if (contextStatus !== "context_not_required" || (summary.missing_argument_slots || []).length) {
    categories.push("context_dependent_or_incomplete");
  }
  if (summary.semantic_acceptance_status === "BLOCKED") categories.push("semantic_guard_blocked");
  if (summary.semantic_acceptance_status === "REVIEW_REQUIRED") categories.push("semantic_review_required");

  return unique(categories);
}

function coverageStatusForSummary(summary = {}, categories = categoriesForSummary(summary)) {
  const has = (category) => categories.includes(category);
  if (has("unknown_lexicon")) return "UNKNOWN_LEXICON";
  if (has("known_lexicon_unresolved_structure")) return "UNRESOLVED_STRUCTURE";
  if (has("competing_structure")) return "COMPETING_STRUCTURE";
  if (summary.root_span_coverage_status && summary.root_span_coverage_status !== "PASS") return "PARTIAL_STRUCTURE";
  if (has("semantic_guard_blocked") || has("semantic_review_required")) return "REVIEW_REQUIRED";
  if (has("matched_construction")) return "COVERED";
  return "NO_CONSTRUCTION_COVERAGE";
}

function buildCoverageRecord(summary = {}, finalRows = [], metadata = {}) {
  const categories = categoriesForSummary(summary);
  return {
    schema: RECORD_SCHEMA,
    source: summary.source || metadata.source || "",
    parser_shadow_source: summary.parser_shadow_source || summary.source || metadata.source || "",
    coverage_status: coverageStatusForSummary(summary, categories),
    categories,
    construction_count: Number(summary.construction_count || 0),
    top_constructions: unique(summary.top_constructions || []),
    root_span_coverage_status: summary.root_span_coverage_status || "UNKNOWN",
    unwrapped_root_surfaces: summary.unwrapped_root_surfaces || [],
    semantic_acceptance_status: summary.semantic_acceptance_status || "UNKNOWN",
    semantic_acceptance_blocker_count: Number(summary.semantic_acceptance_blocker_count || 0),
    context_requirement_status: summary.context_requirement_status || "context_not_required",
    missing_argument_slots: summary.missing_argument_slots || [],
    trace_kind_counts: { ...(summary.trace_summary || {}) },
    template_family_counts: { ...(summary.template_family_summary || {}) },
    construction_traces: constructionTraceRows(finalRows),
    source_artifact: metadata.source_artifact || "live_runtime",
    diagnostic_index: metadata.diagnostic_index,
    linguistic_confidence: null,
    evidence_weight: 0,
    policy: "Implementation coverage/provenance only. Parser output, trace frequency, corpus frequency, and repeated matches do not establish linguistic support or confidence.",
  };
}

function recordsFromFullDiagnostics(payload = {}, sourceArtifact = "") {
  if (!payload || !Array.isArray(payload.diagnostics)) {
    throw new Error("Expected a Canto Span full-diagnostics JSON object with a diagnostics array.");
  }
  return payload.diagnostics.map((diagnostic, index) => buildCoverageRecord(
    diagnostic.summary || {},
    diagnostic.final_construction_tree || [],
    {
      source: diagnostic.source || "",
      source_artifact: sourceArtifact || payload.note_path || "full_diagnostics",
      diagnostic_index: diagnostic.diagnostic_index !== undefined ? diagnostic.diagnostic_index : index,
    },
  ));
}

function aggregateCoverage(records = [], options = {}) {
  const sampleLimit = Number.isInteger(options.sampleLimit) ? options.sampleLimit : 3;
  const categoryCounts = {};
  const statusCounts = {};
  const traceKindCounts = {};
  const templateFamilyCounts = {};
  const topConstructionCounts = {};
  const samplesByCategory = {};

  for (const record of records) {
    statusCounts[record.coverage_status] = (statusCounts[record.coverage_status] || 0) + 1;
    mergeCounts(traceKindCounts, record.trace_kind_counts);
    mergeCounts(templateFamilyCounts, record.template_family_counts);
    for (const construction of record.top_constructions || []) {
      topConstructionCounts[construction] = (topConstructionCounts[construction] || 0) + 1;
    }
    for (const category of record.categories || []) {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      if (!samplesByCategory[category]) samplesByCategory[category] = [];
      if (samplesByCategory[category].length < sampleLimit) {
        samplesByCategory[category].push(record.source || record.parser_shadow_source || "");
      }
    }
  }

  const architecturalDebt = ACTIONABLE_TRACE_KINDS
    .map((traceKind) => ({ trace_kind: traceKind, count: traceKindCounts[traceKind] || 0 }))
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count || a.trace_kind.localeCompare(b.trace_kind));

  const specializedImplementation = NEUTRAL_SPECIALIZED_TRACE_KINDS
    .map((traceKind) => ({ trace_kind: traceKind, count: traceKindCounts[traceKind] || 0 }))
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count || a.trace_kind.localeCompare(b.trace_kind));

  const coveredCount = statusCounts.COVERED || 0;
  return {
    schema: COVERAGE_SCHEMA,
    analysis_count: records.length,
    implementation_covered_count: coveredCount,
    implementation_covered_fraction: records.length ? coveredCount / records.length : 0,
    coverage_status_counts: statusCounts,
    category_counts: categoryCounts,
    trace_kind_counts: traceKindCounts,
    template_family_counts: templateFamilyCounts,
    top_construction_counts: topConstructionCounts,
    architectural_debt_trace_counts: architecturalDebt,
    specialized_non_debt_trace_counts: specializedImplementation,
    samples_by_category: samplesByCategory,
    linguistic_confidence: null,
    evidence_weight: 0,
    policy: "Counts describe deterministic parser implementation coverage only. They are prioritization signals, not linguistic evidence, productivity estimates, naturalness evidence, or confidence scores.",
    records,
  };
}

function recordsForSentences(sentences = []) {
  const api = loadRuntimeApi({ apiNames: ["analyzeLine", "diagnosticSummary", "diagnosticFinalRows"] });
  return sentences.map((source) => {
    const analysis = api.analyzeLine(source);
    return buildCoverageRecord(api.diagnosticSummary(analysis), api.diagnosticFinalRows(analysis), {
      source,
      source_artifact: "live_source_runtime",
    });
  });
}

function parseArgs(argv) {
  const options = {
    sentences: [],
    files: [],
    diagnosticFiles: [],
    json: false,
    sampleLimit: 3,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--sentence" || arg === "-s") options.sentences.push(argv[++index] || "");
    else if (arg === "--file" || arg === "-f") options.files.push(argv[++index] || "");
    else if (arg === "--diagnostics" || arg === "-d") options.diagnosticFiles.push(argv[++index] || "");
    else if (arg === "--samples") options.sampleLimit = Number(argv[++index] || 3);
    else if (arg === "--json") options.json = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!Number.isInteger(options.sampleLimit) || options.sampleLimit < 0) {
    throw new Error("--samples must be a non-negative integer.");
  }
  return options;
}

function sentencesFromTextFile(filePath) {
  return fs.readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function formatCountMap(counts = {}, limit = 20) {
  return Object.entries(counts)
    .filter(([, count]) => count)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([key, count]) => `  ${key}: ${count}`)
    .join("\n");
}

function formatHumanReport(report) {
  const percent = report.analysis_count
    ? (100 * report.implementation_covered_fraction).toFixed(1)
    : "0.0";
  const parts = [
    "Canto Span parser coverage/provenance audit",
    `Analyses: ${report.analysis_count}`,
    `Implementation-covered: ${report.implementation_covered_count} (${percent}%)`,
    "",
    "Coverage statuses:",
    formatCountMap(report.coverage_status_counts) || "  (none)",
    "",
    "Coverage categories:",
    formatCountMap(report.category_counts) || "  (none)",
    "",
    "Trace kinds:",
    formatCountMap(report.trace_kind_counts) || "  (none)",
    "",
    "Top constructions:",
    formatCountMap(report.top_construction_counts) || "  (none)",
  ];
  if (report.architectural_debt_trace_counts.length) {
    parts.push("", "Architectural-debt signals:");
    for (const row of report.architectural_debt_trace_counts) parts.push(`  ${row.trace_kind}: ${row.count}`);
  }
  if (report.specialized_non_debt_trace_counts.length) {
    parts.push("", "Specialized implementation (not automatically debt):");
    for (const row of report.specialized_non_debt_trace_counts) parts.push(`  ${row.trace_kind}: ${row.count}`);
  }
  parts.push("", `Policy: ${report.policy}`);
  return parts.join("\n");
}

function usage() {
  return [
    "Usage:",
    "  node tools/parser-coverage-report.js --sentence \"我食咗飯。\" [--sentence ...] [--json]",
    "  node tools/parser-coverage-report.js --file sentences.txt [--json]",
    "  node tools/parser-coverage-report.js --diagnostics note.canto-span-full-diagnostics.json [--json]",
    "",
    "Options:",
    "  -s, --sentence TEXT       Analyze one sentence with the current source runtime (repeatable).",
    "  -f, --file PATH           Analyze nonblank lines from a UTF-8 text file (repeatable).",
    "  -d, --diagnostics PATH    Aggregate an existing full-diagnostics JSON export (repeatable).",
    "      --samples N           Keep up to N source examples per category in JSON output (default 3).",
    "      --json                Emit machine-readable JSON instead of the compact text report.",
    "  -h, --help                Show this help.",
  ].join("\n");
}

function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }

  const sentences = [...options.sentences];
  for (const filePath of options.files) sentences.push(...sentencesFromTextFile(filePath));

  const records = sentences.length ? recordsForSentences(sentences) : [];
  for (const filePath of options.diagnosticFiles) {
    const payload = JSON.parse(fs.readFileSync(filePath, "utf8"));
    records.push(...recordsFromFullDiagnostics(payload, path.resolve(filePath)));
  }

  if (!records.length) throw new Error("No input supplied. Use --sentence, --file, or --diagnostics.");
  const report = aggregateCoverage(records, { sampleLimit: options.sampleLimit });
  process.stdout.write(options.json ? `${JSON.stringify(report, null, 2)}\n` : `${formatHumanReport(report)}\n`);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`parser coverage audit failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = {
  ACTIONABLE_TRACE_KINDS,
  COVERAGE_SCHEMA,
  NEUTRAL_SPECIALIZED_TRACE_KINDS,
  RECORD_SCHEMA,
  aggregateCoverage,
  buildCoverageRecord,
  categoriesForSummary,
  constructionTraceRows,
  coverageStatusForSummary,
  formatHumanReport,
  main,
  parseArgs,
  recordsForSentences,
  recordsFromFullDiagnostics,
};
