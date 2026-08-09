#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function replaceFunctionBlock(relativePath, startMarker, endMarker, replacement) {
  const filePath = path.join(root, relativePath);
  const original = fs.readFileSync(filePath, "utf8");
  const start = original.indexOf(startMarker);
  if (start < 0) throw new Error(`${relativePath}: missing start marker ${startMarker}`);
  const end = original.indexOf(endMarker, start);
  if (end < 0) throw new Error(`${relativePath}: missing end marker ${endMarker}`);
  const updated = `${original.slice(0, start)}${replacement.trimEnd()}\n\n${original.slice(end)}`;
  if (updated === original) throw new Error(`${relativePath}: replacement produced no change`);
  fs.writeFileSync(filePath, updated);
}

function replaceExact(relativePath, from, to) {
  const filePath = path.join(root, relativePath);
  const original = fs.readFileSync(filePath, "utf8");
  if (!original.includes(from)) throw new Error(`${relativePath}: exact replacement marker missing`);
  const updated = original.replace(from, to);
  if (updated === original) throw new Error(`${relativePath}: exact replacement produced no change`);
  fs.writeFileSync(filePath, updated);
}

replaceFunctionBlock(
  "tools/parser-coverage-report.js",
  "function slotBindingsForTrace",
  "function constructionTraceRows",
  `function structuredRelativeSpan(binding = {}) {
  const span = binding.relative_display_span || binding.relative_source_span || binding.relative_parser_span || null;
  if (!span || typeof span !== "object") return { status: "unavailable", start: null, end: null };
  if (span.status !== "unique") {
    return {
      status: span.status || "unavailable",
      start: span.start ?? null,
      end: span.end ?? null,
      resolution: "runtime_structured_binding",
    };
  }
  return {
    status: "unique",
    start: Number(span.start),
    end: Number(span.end),
    resolution: "runtime_structured_binding",
    unit: span.unit || "utf16_code_unit",
    relative_to: span.relative_to || "construction_start",
  };
}

function slotBindingsForTrace(detail = {}, constructionSurface = "") {
  if (detail.trace_binding_schema && Array.isArray(detail.bindings)) {
    return detail.bindings.map((binding, index) => ({
      index,
      slot: binding.slot || "",
      surface: String(binding.display_surface || binding.source_surface || binding.parser_surface || ""),
      parser_surface: String(binding.parser_surface || ""),
      source_surface: String(binding.source_surface || binding.display_surface || ""),
      binding_kind: binding.binding_kind || "semantic_slot",
      binding_scope: binding.binding_scope || "",
      provenance: binding.provenance || "",
      parser_span: binding.parser_span || null,
      source_span: binding.source_span || null,
      display_span: binding.display_span || null,
      relative_span: structuredRelativeSpan(binding),
    }));
  }

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
}`,
);

replaceFunctionBlock(
  "tools/parser-coverage-report.js",
  "function constructionTraceRows",
  "function tokenProvenanceRows",
  `function constructionTraceRows(finalRows = []) {
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
      trace_binding_schema: detail.trace_binding_schema || "",
      binding_contract_status: detail.binding_contract_status || "",
      binding_resolution: detail.binding_resolution || "",
      construction_provenance: detail.construction_provenance || null,
      components: Array.isArray(detail.components) ? detail.components : [],
      slot_bindings: slotBindings,
    };
    traces.push(trace);
    constructionStack.push({ depth, surface, construction: trace.construction });
  }
  return traces;
}`,
);

replaceFunctionBlock(
  "tools/parser-coverage-report.js",
  "function structuralSanityFindings",
  "function categoriesForSummary",
  `function structuralSanityFindings(summary = {}, constructionTraces = []) {
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
    const hasStructuredBindings = Boolean(trace.trace_binding_schema);

    if (!hasStructuredBindings && (slotCount || surfaceCount) && slotCount !== surfaceCount) {
      findings.push(sanityFinding(
        "slot_surface_count_mismatch",
        "error",
        "Legacy trace has different assigned-slot and slot-surface counts.",
        {
          construction: trace.construction,
          surface: trace.surface,
          assigned_slot_count: slotCount,
          slot_surface_count: surfaceCount,
        },
      ));
    }

    if (hasStructuredBindings && trace.binding_contract_status === "legacy_unresolved") {
      findings.push(sanityFinding(
        "structured_binding_contract_unresolved",
        "error",
        "A trace declares semantic slots but the runtime structured-binding contract could not resolve them deterministically.",
        { construction: trace.construction, surface: trace.surface, assigned_slots: trace.assigned_slots },
      ));
    }

    if (hasStructuredBindings && trace.binding_contract_status === "complete" && slotCount !== trace.slot_bindings.length) {
      findings.push(sanityFinding(
        "structured_binding_count_mismatch",
        "error",
        "Structured trace binding count does not match its declared semantic slot count.",
        {
          construction: trace.construction,
          surface: trace.surface,
          assigned_slot_count: slotCount,
          structured_binding_count: trace.slot_bindings.length,
        },
      ));
    }

    if (hasStructuredBindings && trace.binding_contract_status === "not_applicable" && trace.slot_bindings.length) {
      findings.push(sanityFinding(
        "structured_binding_schema_violation",
        "error",
        "A non-slot trace exposes semantic bindings despite declaring the binding contract not applicable.",
        { construction: trace.construction, surface: trace.surface },
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
      if (hasStructuredBindings && trace.binding_contract_status === "complete") {
        const span = binding.relative_span || {};
        const invalidStructuredBinding = !binding.slot || span.status !== "unique"
          || !Number.isInteger(span.start) || !Number.isInteger(span.end)
          || span.start < 0 || span.end < span.start || span.end > trace.surface.length;
        if (invalidStructuredBinding) {
          findings.push(sanityFinding(
            "structured_binding_schema_violation",
            "error",
            "A complete structured binding is missing a slot or a valid construction-relative display span.",
            {
              construction: trace.construction,
              surface: trace.surface,
              slot: binding.slot || "",
              slot_surface: binding.surface || "",
              relative_span: span,
            },
          ));
        }
      } else if (binding.surface && binding.relative_span.status === "not_found") {
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
}`,
);

replaceFunctionBlock(
  "tools/parser-coverage-enhanced.js",
  "function constructionSourceSpans",
  "function findContiguousTokenMatch",
  `function constructionSourceSpans(traces = [], source = "") {
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
}`,
);

replaceFunctionBlock(
  "tools/parser-coverage-enhanced.js",
  "function resolveSlotBindings",
  "function enhanceCoverageRecord",
  `function resolveSlotBindings(trace, sourceSpan, tokenRows = []) {
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
}`,
);

replaceFunctionBlock(
  "tools/parser-coverage-enhanced.js",
  "function enhanceCoverageRecord",
  "function recordsForSentences",
  `function enhanceCoverageRecord(summary = {}, finalRows = [], metadata = {}) {
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
  record.policy = `${record.policy} Matcher fingerprints and ordered offsets identify implementation behavior only.`;
  return record;
}`,
);

replaceExact(
  "src/parser/diagnostics/trace-bindings.js",
  "    return {\n      nodes,\n      schema: TRACE_BINDING_SCHEMA,",
  "    return {\n      schema: TRACE_BINDING_SCHEMA,",
);

console.log(JSON.stringify({
  schema: "canto-span-temp-trace-binding-migration-v1",
  updated: [
    "tools/parser-coverage-report.js",
    "tools/parser-coverage-enhanced.js",
    "src/parser/diagnostics/trace-bindings.js"
  ]
}, null, 2));
