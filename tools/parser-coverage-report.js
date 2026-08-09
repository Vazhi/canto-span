#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi } = require("./lib/runtime-api");

const COVERAGE_SCHEMA = "canto-span-parser-coverage-report-v1";
const RECORD_SCHEMA = "canto-span-parser-coverage-record-v2";

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

function rowSurface(row = {}) {
  return row.display_surface || row.surface || row.parser_surface || "";
}

function uniqueRelativeSpan(parentSurface = "", childSurface = "") {
  const parent = String(parentSurface || "");
  const child = String(childSurface || "");
  if (!child) return { status: "empty_surface", start: null, end: null };
  if (!parent) return { status: "no_parent_surface", start: null, end: null };

  const first = parent.indexOf(child);
  if (first < 0) return { status: "not_found", start: null, end: null };
  const second = parent.indexOf(child, first + 1);
  if (second >= 0) return { status: "ambiguous", start: null, end: null };
  return { status: "unique", start: first, end: first + child.length };
}

function slotBindingsForTrace(detail = {}, constructionSurface = "") {
  const slots = Array.isArray(detail.assigned_slots) ? detail.assigned_slots : [];
  const surfaces = Array.isArray(detail.surfaces) ? detail.surfaces : [];
  const length = Math.max(slots.length, surfaces.length);
  const bindings = [];
  for (let index = 0; index < length; index += 1) {
    const surface = String(surfaces[index] || "");
    bindings.push({
      index,
      slot: slots[index] || "",
      surface,
      relative_span: uniqueRelativeSpan(constructionSurface, surface),
    });
  }
  return bindings;
}

function constructionTraceRows(finalRows = []) {
  const traces = [];
  const constructionStack = [];

  for (const row of finalRows || []) {
    if (!row || row.kind !== "construction") continue;
    const depth = Number(row.depth || 0);
    while (constructionStack.length && constructionStack[constructionStack.length - 1].depth >= depth) {
      constructionStack.pop();
    }

    const parentRow = constructionStack.length ? constructionStack[constructionStack.length - 1] : null;
    const detail = row.trace_detail || {};
    const surface = rowSurface(row);
    const traceKind = detail.kind || row.trace || "unspecified";
    const slotBindings = slotBindingsForTrace(detail, surface);
    const trace = {
      surface,
      construction: row.construction || row.internal_construction || row.type || "",
      internal_construction: row.internal_construction || row.type || "",
      depth,
      parent: row.parent || "",
      parent_surface: parentRow ? parentRow.surface : "",
      parent_relative_span: parentRow ? uniqueRelativeSpan(parentRow.surface, surface) : {
        status: "root",
        start: 0,
        end: surface.length,
      },
      trace_kind: traceKind,
      template_family: detail.template_family || "",
      rule: detail.rule || "",
      template: Array.isArray(detail.template) ? detail.template : [],
      assigned_slots: Array.isArray(detail.assigned_slots) ? [...detail.assigned_slots] : [],
      slot_surfaces: Array.isArray(detail.surfaces) ? [...detail.surfaces] : [],
      slot_bindings: slotBindings,
    };
    traces.push(trace);
    constructionStack.push({ depth, surface, construction: trace.construction });
  }
  return traces;
}

function tokenProvenanceRows(finalRows = []) {
  return (finalRows || [])
    .filter((row) => row && row.kind === "token")
    .map((row) => {
      const detail = row.trace_detail || {};
      const traceKind = detail.kind || row.trace || "unspecified";
      let lexicalStatus = "other_traced_material";
      if (traceKind === "unknown_atomic") lexicalStatus = "unknown";
      else if (traceKind === "atomic_lexicon") lexicalStatus = "known_lexicon";
      else if (traceKind === "punctuation_or_plain_text") lexicalStatus = "punctuation_or_plain_text";

      return {
        surface: rowSurface(row),
        depth: Number(row.depth || 0),
        parent: row.parent || "",
        label: row.label || "",
        role: row.role || "",
        syntax: row.syntax || "",
        jyutping: row.jyutping || "",
        trace_kind: traceKind,
        lexical_status: lexicalStatus,
        slots: Array.isArray(row.slots) ? [...row.slots] : [],
      };
    });
}

function sanityFinding(code, severity, message, context = {}) {
  return { code, severity, message, ...context };
}

function structuralSanityFindings(summary = {}, constructionTraces = []) {
  const findings = [];

  if (
    summary.root_span_coverage_status === "PASS" &&
    Array.isArray(summary.unwrapped_root_surfaces) &&
    summary.unwrapped_root_surfaces.length
  ) {
    findings.push(sanityFinding(
      "pass_with_unwrapped_root_surface",
      "error",
      "Root coverage is PASS even though unwrapped root surfaces remain.",
      { surfaces: [...summary.unwrapped_root_surfaces] },
    ));
  }

  for (const trace of constructionTraces) {
    const slotCount = trace.assigned_slots.length;
    const surfaceCount = trace.slot_surfaces.length;
    if ((slotCount || surfaceCount) && slotCount !== surfaceCount) {
      findings.push(sanityFinding(
        "slot_surface_count_mismatch",
        "error",
        "Template trace has different assigned-slot and slot-surface counts.",
        {
          construction: trace.construction,
          surface: trace.surface,
          assigned_slot_count: slotCount,
          slot_surface_count: surfaceCount,
        },
      ));
    }

    if (trace.trace_kind === "generative_template" && !trace.template_family) {
      findings.push(sanityFinding(
        "template_family_missing",
        "warning",
        "A generative-template trace does not expose a controlled template_family.",
        { construction: trace.construction, surface: trace.surface },
      ));
    }

    if (trace.depth > 0 && trace.parent_surface && trace.parent_relative_span.status === "not_found") {
      findings.push(sanityFinding(
        "child_surface_outside_parent",
        "error",
        "Construction surface cannot be located inside its parent construction surface.",
        {
          construction: trace.construction,
          surface: trace.surface,
          parent: trace.parent,
          parent_surface: trace.parent_surface,
        },
      ));
    }

    for (const binding of trace.slot_bindings) {
      if (binding.surface && binding.relative_span.status === "not_found") {
        findings.push(sanityFinding(
          "slot_surface_outside_construction",
          "error",
          "A bound slot surface cannot be located inside the construction surface.",
          {
            construction: trace.construction,
            surface: trace.surface,
            slot: binding.slot,
            slot_surface: binding.surface,
          },
        ));
      }
    }

    if (
      trace.depth === 0 &&
      /VP$/.test(trace.construction) &&
      trace.assigned_slots.some((slot) => slot === "subject" || slot === "overt_subject")
    ) {
      findings.push(sanityFinding(
        "root_vp_binds_subject",
        "warning",
        "A root construction named as a VP explicitly binds a subject slot; inspect whether the runtime label or span boundary is clause-sized.",
        {
          construction: trace.construction,
          surface: trace.surface,
          subject_bindings: trace.slot_bindings.filter((binding) => (
            binding.slot === "subject" || binding.slot === "overt_subject"
          )),
        },
      ));
    }
  }

  return findings;
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
  const constructionTraces = constructionTraceRows(finalRows);
  const tokenProvenance = tokenProvenanceRows(finalRows);
  const sanityFindings = structuralSanityFindings(summary, constructionTraces);

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
    construction_traces: constructionTraces,
    token_provenance: tokenProvenance,
    sanity_findings: sanityFindings,
    source_artifact: metadata.source_artifact || "live_runtime",
    diagnostic_index: metadata.diagnostic_index,
    linguistic_confidence: null,
    evidence_weight: 0,
    policy: "Implementation coverage/provenance only. Parser output, trace frequency, corpus frequency, repeated matches, and sanity findings do not establish linguistic support or confidence.",
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
  const sanityFindingCounts = {};
  const sanitySamples = {};

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

    for (const finding of record.sanity_findings || []) {
      sanityFindingCounts[finding.code] = (sanityFindingCounts[finding.code] || 0) + 1;
      if (!sanitySamples[finding.code]) sanitySamples[finding.code] = [];
      if (sanitySamples[finding.code].length < sampleLimit) {
        sanitySamples[finding.code].push({
          source: record.source || record.parser_shadow_source || "",
          construction: finding.construction || "",
          surface: finding.surface || "",
        });
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
    sanity_finding_counts: sanityFindingCounts,
    sanity_samples: sanitySamples,
    architectural_debt_trace_counts: architecturalDebt,
    specialized_non_debt_trace_counts: specializedImplementation,
    samples_by_category: samplesByCategory,
    linguistic_confidence: null,
    evidence_weight: 0,
    policy: "Counts and sanity findings describe deterministic parser implementation behavior only. They are prioritization/debugging signals, not linguistic evidence, productivity estimates, naturalness evidence, or confidence scores.",
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
    details: false,
    sampleLimit: 3,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--sentence" || arg === "-s") options.sentences.push(argv[++index] || "");
    else if (arg === "--file" || arg === "-f") options.files.push(argv[++index] || "");
    else if (arg === "--diagnostics" || arg === "-d") options.diagnosticFiles.push(argv[++index] || "");
    else if (arg === "--samples") options.sampleLimit = Number(argv[++index] || 3);
    else if (arg === "--details") options.details = true;
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

function formatSpan(span = {}) {
  if (span.status === "root") return "root";
  if (span.status === "unique") return `${span.start}:${span.end}`;
  return span.status || "unknown";
}

function formatRecordDetails(record) {
  const parts = [
    `Sentence: ${record.source || record.parser_shadow_source || "(empty)"}`,
    `  coverage: ${record.coverage_status}`,
    `  root span: ${record.root_span_coverage_status}`,
    "  constructions:",
  ];

  if (!record.construction_traces.length) {
    parts.push("    (none)");
  } else {
    for (const trace of record.construction_traces) {
      const indent = "    " + "  ".repeat(trace.depth);
      const provenance = [trace.trace_kind, trace.template_family].filter(Boolean).join("/");
      parts.push(`${indent}${trace.construction} [${trace.surface}] span=${formatSpan(trace.parent_relative_span)} trace=${provenance || "unspecified"}`);
      for (const binding of trace.slot_bindings) {
        parts.push(`${indent}  slot ${binding.slot || "(unlabeled)"} = [${binding.surface}] @ ${formatSpan(binding.relative_span)}`);
      }
    }
  }

  parts.push("  tokens:");
  if (!record.token_provenance.length) {
    parts.push("    (none)");
  } else {
    for (const token of record.token_provenance) {
      parts.push(`    [${token.surface}] ${token.lexical_status} trace=${token.trace_kind}${token.label ? ` label=${token.label}` : ""}`);
    }
  }

  parts.push("  sanity:");
  if (!record.sanity_findings.length) {
    parts.push("    none");
  } else {
    for (const finding of record.sanity_findings) {
      parts.push(`    ${finding.severity.toUpperCase()} ${finding.code}: ${finding.message}`);
    }
  }

  return parts.join("\n");
}

function formatHumanReport(report, options = {}) {
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
    "Structural sanity findings:",
    formatCountMap(report.sanity_finding_counts) || "  (none)",
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
  if (options.details) {
    parts.push("", "Per-sentence provenance:");
    for (const record of report.records) parts.push("", formatRecordDetails(record));
  }
  parts.push("", `Policy: ${report.policy}`);
  return parts.join("\n");
}

function usage() {
  return [
    "Usage:",
    "  node tools/parser-coverage-report.js --sentence \"我食咗飯。\" [--sentence ...] [--details] [--json]",
    "  node tools/parser-coverage-report.js --file sentences.txt [--details] [--json]",
    "  node tools/parser-coverage-report.js --diagnostics note.canto-span-full-diagnostics.json [--details] [--json]",
    "",
    "Options:",
    "  -s, --sentence TEXT       Analyze one sentence with the current source runtime (repeatable).",
    "  -f, --file PATH           Analyze nonblank lines from a UTF-8 text file (repeatable).",
    "  -d, --diagnostics PATH    Aggregate an existing full-diagnostics JSON export (repeatable).",
    "      --samples N           Keep up to N source examples per category/finding in JSON output (default 3).",
    "      --details             Include per-sentence construction tree, slot bindings, token provenance, and sanity findings.",
    "      --json                Emit machine-readable JSON; detailed provenance is always present in records.",
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
  process.stdout.write(
    options.json
      ? `${JSON.stringify(report, null, 2)}\n`
      : `${formatHumanReport(report, { details: options.details })}\n`,
  );
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
  formatRecordDetails,
  main,
  parseArgs,
  recordsForSentences,
  recordsFromFullDiagnostics,
  slotBindingsForTrace,
  structuralSanityFindings,
  tokenProvenanceRows,
  uniqueRelativeSpan,
};
