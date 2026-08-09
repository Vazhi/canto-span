#!/usr/bin/env node
"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const base = require("./parser-coverage-report");
const { loadRuntimeApi } = require("./lib/runtime-api");

const ENHANCED_SCHEMA = "canto-span-parser-coverage-enhanced-v1";

function rowSurface(row = {}) {
  return row.display_surface || row.surface || row.parser_surface || "";
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
  );
}

function canonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}

function matcherIdentityForTrace(trace = {}, rawRow = {}) {
  const detail = rawRow.trace_detail || {};
  const constructionType = detail.construction_type || trace.internal_construction || trace.construction || "unknown";
  const traceKind = detail.kind || trace.trace_kind || rawRow.trace || "unspecified";
  const definition = {
    trace_kind: traceKind,
    construction_type: constructionType,
    template_family: detail.template_family || trace.template_family || "",
    template: Array.isArray(detail.template) ? detail.template : (Array.isArray(trace.template) ? trace.template : []),
    constraints: detail.constraints && typeof detail.constraints === "object" ? detail.constraints : {},
    rule: detail.rule || trace.rule || "",
  };
  const fingerprint = crypto.createHash("sha256").update(canonicalJson(definition)).digest("hex");
  const prefix = traceKind === "generative_template" ? "template" : traceKind;
  const ruleDescriptor = definition.rule || (definition.template.length ? definition.template.join(" + ") : traceKind);
  return {
    matcher_id: `${prefix}:${constructionType}:${fingerprint.slice(0, 16)}`,
    matcher_fingerprint: fingerprint,
    matcher_identity_source: "diagnostic_definition_fingerprint",
    matcher_definition: definition,
    rule_descriptor: ruleDescriptor,
    rule_descriptor_source: definition.rule ? "runtime_trace_rule" : (definition.template.length ? "template_signature" : "trace_kind"),
  };
}

function orderedTokenSpans(source = "", tokenRows = []) {
  const text = String(source || "");
  let cursor = 0;
  return (tokenRows || []).map((row, index) => {
    const surface = rowSurface(row);
    if (!surface) {
      return { index, surface, status: "empty_surface", start: null, end: null };
    }
    const start = text.indexOf(surface, cursor);
    if (start < 0) {
      return { index, surface, status: "not_found", start: null, end: null };
    }
    const end = start + surface.length;
    cursor = end;
    return {
      index,
      surface,
      status: "unique",
      start,
      end,
      resolution: "ordered_token_stream",
    };
  });
}

function constructionSourceSpans(traces = [], source = "") {
  const spans = [];
  const stack = [];
  const childCursors = new Map();
  let rootCursor = 0;
  const text = String(source || "");

  for (let index = 0; index < traces.length; index += 1) {
    const trace = traces[index];
    const runtimeSpan = trace && trace.construction_provenance && trace.construction_provenance.source_span;
    if (runtimeSpan && runtimeSpan.status === "unique") {
      const span = {
        status: "unique",
        start: Number(runtimeSpan.start),
        end: Number(runtimeSpan.end),
        resolution: "runtime_construction_provenance",
        unit: runtimeSpan.unit || "utf16_code_unit",
        relative_to: runtimeSpan.relative_to || "raw_source",
      };
      spans.push(span);
      const depth = Number(trace.depth || 0);
      while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop();
      stack.push({ index, depth, trace, span });
      continue;
    }

    const depth = Number(trace.depth || 0);
    while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop();
    const parent = stack.length ? stack[stack.length - 1] : null;
    let span;

    if (!parent) {
      const start = text.indexOf(trace.surface || "", rootCursor);
      if (start >= 0 && trace.surface) {
        span = { status: "unique", start, end: start + trace.surface.length, resolution: "ordered_root_surface" };
        rootCursor = span.end;
      } else {
        span = { status: trace.surface ? "not_found" : "empty_surface", start: null, end: null };
      }
    } else if (
      parent.span && parent.span.status === "unique" &&
      trace.parent_relative_span && trace.parent_relative_span.status === "unique"
    ) {
      span = {
        status: "unique",
        start: parent.span.start + trace.parent_relative_span.start,
        end: parent.span.start + trace.parent_relative_span.end,
        resolution: "parent_relative_span",
      };
    } else if (parent.span && parent.span.status === "unique") {
      const parentSurface = parent.trace.surface || "";
      const cursorKey = parent.index;
      const localCursor = childCursors.get(cursorKey) || 0;
      const localStart = parentSurface.indexOf(trace.surface || "", localCursor);
      if (localStart >= 0 && trace.surface) {
        const localEnd = localStart + trace.surface.length;
        childCursors.set(cursorKey, localEnd);
        span = {
          status: "unique",
          start: parent.span.start + localStart,
          end: parent.span.start + localEnd,
          resolution: "ordered_child_surface",
        };
      } else {
        span = { status: trace.surface ? "not_found" : "empty_surface", start: null, end: null };
      }
    } else {
      span = { status: "parent_unresolved", start: null, end: null };
    }

    spans.push(span);
    stack.push({ index, depth, trace, span });
  }
  return spans;
}

function findContiguousTokenMatch(tokens, startIndex, target) {
  for (let start = startIndex; start < tokens.length; start += 1) {
    if (tokens[start].source_span.status !== "unique") continue;
    let surface = "";
    for (let end = start; end < tokens.length; end += 1) {
      const token = tokens[end];
      if (token.source_span.status !== "unique") break;
      surface += token.surface;
      if (surface === target) return { start_token: start, end_token: end + 1 };
      if (surface.length >= target.length || !target.startsWith(surface)) break;
    }
  }
  return null;
}

function resolveSlotBindings(trace, sourceSpan, tokenRows = []) {
  if (!trace || !Array.isArray(trace.slot_bindings)) return [];
  const containedTokens = sourceSpan && sourceSpan.status === "unique"
    ? tokenRows.filter((token) => (
      token.source_span.status === "unique" &&
      token.source_span.start >= sourceSpan.start &&
      token.source_span.end <= sourceSpan.end
    ))
    : [];

  let tokenCursor = 0;
  let surfaceCursor = 0;
  return trace.slot_bindings.map((binding) => {
    if (
      binding.relative_span &&
      binding.relative_span.status === "unique" &&
      binding.relative_span.resolution === "runtime_structured_binding"
    ) {
      return { ...binding };
    }

    const target = String(binding.surface || "");
    if (!target) return { ...binding };

    const tokenMatch = findContiguousTokenMatch(containedTokens, tokenCursor, target);
    if (tokenMatch && sourceSpan.status === "unique") {
      const first = containedTokens[tokenMatch.start_token];
      const last = containedTokens[tokenMatch.end_token - 1];
      tokenCursor = tokenMatch.end_token;
      const start = first.source_span.start - sourceSpan.start;
      const end = last.source_span.end - sourceSpan.start;
      surfaceCursor = Math.max(surfaceCursor, end);
      return {
        ...binding,
        relative_span: {
          status: "unique",
          start,
          end,
          resolution: "ordered_token_sequence",
          token_start: first.token_index,
          token_end: last.token_index + 1,
        },
      };
    }

    const constructionSurface = String(trace.surface || "");
    const orderedStart = constructionSurface.indexOf(target, surfaceCursor);
    if (orderedStart >= 0) {
      const orderedEnd = orderedStart + target.length;
      surfaceCursor = orderedEnd;
      return {
        ...binding,
        relative_span: {
          status: "unique",
          start: orderedStart,
          end: orderedEnd,
          resolution: "ordered_surface_fallback",
        },
      };
    }

    return {
      ...binding,
      relative_span: {
        ...(binding.relative_span || { status: "not_found", start: null, end: null }),
        resolution: "base_surface_uniqueness",
      },
    };
  });
}

function enhanceCoverageRecord(summary = {}, finalRows = [], metadata = {}) {
  const record = base.buildCoverageRecord(summary, finalRows, metadata);
  const rawConstructionRows = (finalRows || []).filter((row) => row && row.kind === "construction");
  const rawTokenRows = (finalRows || []).filter((row) => row && row.kind === "token");
  const sourceForOffsets = record.source || record.parser_shadow_source || "";
  const tokenSpans = orderedTokenSpans(sourceForOffsets, rawTokenRows);

  record.token_provenance = record.token_provenance.map((token, index) => ({
    ...token,
    token_index: index,
    source_span: tokenSpans[index] || { status: "unavailable", start: null, end: null },
  }));

  const sourceSpans = constructionSourceSpans(record.construction_traces, sourceForOffsets);
  record.construction_traces = record.construction_traces.map((trace, index) => {
    const rawRow = rawConstructionRows[index] || {};
    const sourceSpan = sourceSpans[index] || { status: "unavailable", start: null, end: null };
    const matcher = matcherIdentityForTrace(trace, rawRow);
    const enhancedTrace = { ...trace, ...matcher, source_span: sourceSpan };
    enhancedTrace.slot_bindings = resolveSlotBindings(enhancedTrace, sourceSpan, record.token_provenance);
    return enhancedTrace;
  });

  record.schema = "canto-span-parser-coverage-record-v3";
  record.provenance_enhancement = {
    schema: ENHANCED_SCHEMA,
    matcher_identity: "deterministic fingerprint over diagnostic matcher definition; not linguistic evidence",
    span_resolution: "runtime structured binding/source provenance first; ordered token/surface reconstruction only for legacy diagnostics",
  };
  record.policy = record.policy + " Matcher fingerprints and ordered offsets identify implementation behavior only.";
  return record;
}

function recordsForSentences(sentences = []) {
  const api = loadRuntimeApi({ apiNames: ["analyzeLine", "diagnosticSummary", "diagnosticFinalRows"] });
  return sentences.map((source) => {
    const analysis = api.analyzeLine(source);
    return enhanceCoverageRecord(api.diagnosticSummary(analysis), api.diagnosticFinalRows(analysis), {
      source,
      source_artifact: "live_runtime",
    });
  });
}

function recordsFromFullDiagnostics(payload = {}, sourceArtifact = "") {
  if (!payload || !Array.isArray(payload.diagnostics)) {
    throw new Error("Expected a Canto Span full-diagnostics JSON object with a diagnostics array.");
  }
  return payload.diagnostics.map((diagnostic, index) => enhanceCoverageRecord(
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
  const report = base.aggregateCoverage(records, options);
  const matcherCounts = {};
  const matcherVariantCounts = {};
  const matcherVariantFingerprints = new Map();
  const fingerprintVariants = new Map();
  const spanResolutionCounts = {};
  let unresolvedSlotSpanCount = 0;
  let requiredMatcherVariantMissingCount = 0;

  for (const record of records) {
    for (const trace of record.construction_traces || []) {
      if (trace.matcher_id) matcherCounts[trace.matcher_id] = (matcherCounts[trace.matcher_id] || 0) + 1;
      if (trace.matcher_variant_applicability === "required" && !trace.matcher_variant_id) requiredMatcherVariantMissingCount += 1;
      if (trace.matcher_variant_id) {
        matcherVariantCounts[trace.matcher_variant_id] = (matcherVariantCounts[trace.matcher_variant_id] || 0) + 1;
        if (!matcherVariantFingerprints.has(trace.matcher_variant_id)) matcherVariantFingerprints.set(trace.matcher_variant_id, new Set());
        matcherVariantFingerprints.get(trace.matcher_variant_id).add(trace.matcher_fingerprint || "");
        if (!fingerprintVariants.has(trace.matcher_fingerprint || "")) fingerprintVariants.set(trace.matcher_fingerprint || "", new Set());
        fingerprintVariants.get(trace.matcher_fingerprint || "").add(trace.matcher_variant_id);
      }
      for (const binding of trace.slot_bindings || []) {
        const resolution = binding.relative_span && binding.relative_span.resolution || binding.relative_span && binding.relative_span.status || "unknown";
        spanResolutionCounts[resolution] = (spanResolutionCounts[resolution] || 0) + 1;
        if (!binding.relative_span || binding.relative_span.status !== "unique") unresolvedSlotSpanCount += 1;
      }
    }
  }

  const matcherVariantFingerprintConflicts = [...matcherVariantFingerprints.entries()]
    .filter(([, fingerprints]) => fingerprints.size > 1)
    .map(([matcher_variant_id, fingerprints]) => ({ matcher_variant_id, fingerprints: [...fingerprints].sort() }));
  const matcherFingerprintVariantConflicts = [...fingerprintVariants.entries()]
    .filter(([, variants]) => variants.size > 1)
    .map(([matcher_fingerprint, variants]) => ({ matcher_fingerprint, matcher_variant_ids: [...variants].sort() }));

  return {
    ...report,
    schema: ENHANCED_SCHEMA,
    matcher_counts: matcherCounts,
    matcher_variant_counts: matcherVariantCounts,
    matcher_variant_fingerprint_conflicts: matcherVariantFingerprintConflicts,
    matcher_fingerprint_variant_conflicts: matcherFingerprintVariantConflicts,
    required_matcher_variant_missing_count: requiredMatcherVariantMissingCount,
    matcher_variant_consistency_status: (
      !requiredMatcherVariantMissingCount && !matcherVariantFingerprintConflicts.length && !matcherFingerprintVariantConflicts.length
    ) ? "PASS" : "FAIL",
    slot_span_resolution_counts: spanResolutionCounts,
    unresolved_slot_span_count: unresolvedSlotSpanCount,
  };
}

function formatSpan(span = {}) {
  if (span.status === "root") return "root";
  if (span.status === "unique") return `${span.start}:${span.end}${span.resolution ? ` (${span.resolution})` : ""}`;
  return span.status || "unknown";
}

function formatRecordDetails(record) {
  const parts = [
    `Sentence: ${record.source || record.parser_shadow_source || "(empty)"}`,
    `  coverage: ${record.coverage_status}`,
    "  constructions:",
  ];
  for (const trace of record.construction_traces || []) {
    const indent = "    " + "  ".repeat(trace.depth || 0);
    parts.push(`${indent}${trace.construction} [${trace.surface}] source=${formatSpan(trace.source_span)} matcher=${trace.matcher_id || "unavailable"}`);
    parts.push(`${indent}  rule=${trace.rule_descriptor || "unavailable"} (${trace.rule_descriptor_source || "unknown"})`);
    for (const binding of trace.slot_bindings || []) {
      parts.push(`${indent}  slot ${binding.slot || "(unlabeled)"} = [${binding.surface}] @ ${formatSpan(binding.relative_span)}`);
    }
  }
  parts.push("  tokens:");
  for (const token of record.token_provenance || []) {
    parts.push(`    [${token.surface}] @ ${formatSpan(token.source_span)} ${token.lexical_status} parent=${token.parent || "(root)"}`);
  }
  parts.push("  sanity:");
  if (!(record.sanity_findings || []).length) parts.push("    none");
  else for (const finding of record.sanity_findings) parts.push(`    ${finding.severity.toUpperCase()} ${finding.code}: ${finding.message}`);
  return parts.join("\n");
}

function formatHumanReport(report, options = {}) {
  const baseText = base.formatHumanReport(report, { details: false });
  const extra = [
    "",
    "Matcher identities:",
    ...Object.entries(report.matcher_counts || {}).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 20).map(([id, count]) => `  ${id}: ${count}`),
    "",
    "Slot span resolution:",
    ...Object.entries(report.slot_span_resolution_counts || {}).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([kind, count]) => `  ${kind}: ${count}`),
    `  unresolved: ${report.unresolved_slot_span_count || 0}`,
  ];
  if (options.details) {
    extra.push("", "Per-sentence enhanced provenance:");
    for (const record of report.records || []) extra.push("", formatRecordDetails(record));
  }
  return `${baseText}${extra.join("\n")}`;
}

function readSentenceFile(filePath) {
  return fs.readFileSync(filePath, "utf8").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function usage() {
  return [
    "Usage:",
    "  node tools/parser-coverage-enhanced.js --sentence \"你食唔食飯？\" [--sentence ...] [--details] [--json]",
    "  node tools/parser-coverage-enhanced.js --file sentences.txt [--details] [--json]",
    "  node tools/parser-coverage-enhanced.js --diagnostics note.canto-span-full-diagnostics.json [--details] [--json]",
    "",
    "This is the enhanced development auditor: matcher fingerprints and ordered token-aware slot spans are implementation provenance only, not linguistic evidence.",
  ].join("\n");
}

function main(argv = process.argv.slice(2)) {
  const options = base.parseArgs(argv);
  if (options.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }

  const records = [];
  const sentences = [...options.sentences];
  for (const filePath of options.files) sentences.push(...readSentenceFile(filePath));
  if (sentences.length) records.push(...recordsForSentences(sentences));

  for (const filePath of options.diagnosticFiles) {
    const payload = JSON.parse(fs.readFileSync(filePath, "utf8"));
    records.push(...recordsFromFullDiagnostics(payload, path.basename(filePath)));
  }

  if (!records.length) throw new Error("No input supplied. Use --sentence, --file, or --diagnostics.");
  const report = aggregateCoverage(records, { sampleLimit: options.sampleLimit });
  process.stdout.write(options.json
    ? `${JSON.stringify(report, null, 2)}\n`
    : `${formatHumanReport(report, { details: options.details })}\n`);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
    process.exit(1);
  }
}

module.exports = {
  aggregateCoverage,
  canonicalJson,
  constructionSourceSpans,
  enhanceCoverageRecord,
  findContiguousTokenMatch,
  formatHumanReport,
  formatRecordDetails,
  main,
  matcherIdentityForTrace,
  orderedTokenSpans,
  recordsForSentences,
  recordsFromFullDiagnostics,
  resolveSlotBindings,
};
