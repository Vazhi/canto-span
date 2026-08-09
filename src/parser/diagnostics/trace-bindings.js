"use strict";

const TRACE_BINDING_SCHEMA = "canto-span-trace-bindings-v1";
const OFFSET_UNIT = "utf16_code_unit";

module.exports = function createTraceBindingAnnotator(dependencies = {}) {
  const {
    nodeCanFillSlot,
    nodeDisplaySurface,
    nodeParserSurface,
  } = dependencies;

  function absoluteSpan(start, end, relativeTo) {
    return {
      status: "unique",
      start,
      end,
      unit: OFFSET_UNIT,
      relative_to: relativeTo,
    };
  }

  function relativeSpan(start, end) {
    return {
      status: "unique",
      start,
      end,
      unit: OFFSET_UNIT,
      relative_to: "construction_start",
    };
  }

  function directComponent(node, index, parserStart, sourceStart, constructionParserStart, constructionSourceStart) {
    const parserSurface = nodeParserSurface(node);
    const displaySurface = nodeDisplaySurface(node);
    return {
      index,
      kind: node && node.kind || "unknown",
      construction: node && node.kind === "construction" ? (node.compatibility_alias || node.type || "") : "",
      internal_construction: node && node.kind === "construction" ? (node.type || "") : "",
      parser_surface: parserSurface,
      display_surface: displaySurface,
      source_surface: displaySurface,
      slots: Array.isArray(node && node.slots) ? [...node.slots] : [],
      parser_span: absoluteSpan(parserStart, parserStart + parserSurface.length, "parser_shadow_source"),
      source_span: absoluteSpan(sourceStart, sourceStart + displaySurface.length, "raw_source"),
      display_span: absoluteSpan(sourceStart, sourceStart + displaySurface.length, "raw_source"),
      relative_parser_span: relativeSpan(parserStart - constructionParserStart, parserStart - constructionParserStart + parserSurface.length),
      relative_source_span: relativeSpan(sourceStart - constructionSourceStart, sourceStart - constructionSourceStart + displaySurface.length),
      relative_display_span: relativeSpan(sourceStart - constructionSourceStart, sourceStart - constructionSourceStart + displaySurface.length),
      _node: node,
    };
  }

  function combinedBinding(slot, components, constructionProvenance, bindingScope, provenance) {
    if (!components.length) {
      return {
        slot,
        binding_kind: "semantic_slot",
        binding_scope: "construction_span",
        child_start: 0,
        child_end: 0,
        parser_surface: constructionProvenance.parser_surface,
        display_surface: constructionProvenance.display_surface,
        source_surface: constructionProvenance.source_surface,
        parser_span: { ...constructionProvenance.parser_span },
        source_span: { ...constructionProvenance.source_span },
        display_span: { ...constructionProvenance.display_span },
        relative_parser_span: relativeSpan(0, constructionProvenance.parser_surface.length),
        relative_source_span: relativeSpan(0, constructionProvenance.display_surface.length),
        relative_display_span: relativeSpan(0, constructionProvenance.display_surface.length),
        provenance,
      };
    }

    const first = components[0];
    const last = components[components.length - 1];
    return {
      slot,
      binding_kind: "semantic_slot",
      binding_scope: bindingScope,
      child_start: first.index,
      child_end: last.index + 1,
      parser_surface: components.map((component) => component.parser_surface).join(""),
      display_surface: components.map((component) => component.display_surface).join(""),
      source_surface: components.map((component) => component.source_surface).join(""),
      parser_span: absoluteSpan(first.parser_span.start, last.parser_span.end, "parser_shadow_source"),
      source_span: absoluteSpan(first.source_span.start, last.source_span.end, "raw_source"),
      display_span: absoluteSpan(first.display_span.start, last.display_span.end, "raw_source"),
      relative_parser_span: relativeSpan(first.parser_span.start - constructionProvenance.parser_span.start, last.parser_span.end - constructionProvenance.parser_span.start),
      relative_source_span: relativeSpan(first.source_span.start - constructionProvenance.source_span.start, last.source_span.end - constructionProvenance.source_span.start),
      relative_display_span: relativeSpan(first.display_span.start - constructionProvenance.display_span.start, last.display_span.end - constructionProvenance.display_span.start),
      provenance,
    };
  }

  function childCanFillSlot(component, slot) {
    if (!component || !component._node || typeof nodeCanFillSlot !== "function") return false;
    try {
      return Boolean(nodeCanFillSlot(component._node, slot));
    } catch (_error) {
      return false;
    }
  }

  function orderedSlotStarts(slots, components) {
    const starts = [];
    let cursor = 0;
    for (const slot of slots) {
      let found = -1;
      for (let index = cursor; index < components.length; index += 1) {
        if (childCanFillSlot(components[index], slot)) {
          found = index;
          break;
        }
      }
      if (found < 0) return null;
      starts.push(found);
      cursor = found + 1;
    }
    return starts;
  }

  function semanticBindingsForConstruction(node, components, constructionProvenance) {
    const trace = node.trace || {};
    const slots = Array.isArray(trace.assigned_slots) ? trace.assigned_slots.filter(Boolean) : [];
    if (!slots.length) {
      return {
        status: "not_applicable",
        bindings: [],
        resolution: "no_semantic_slots_declared",
      };
    }

    if (
      slots.length === 1 &&
      trace.relation_member_role &&
      /_relation_member$/.test(slots[0])
    ) {
      return {
        status: "complete",
        bindings: [combinedBinding(slots[0], components, constructionProvenance, "construction_span", "runtime_construction_span_role")],
        resolution: "construction_span_role",
      };
    }

    if (slots.length === components.length) {
      return {
        status: "complete",
        bindings: slots.map((slot, index) => combinedBinding(
          slot,
          [components[index]],
          constructionProvenance,
          "direct_child",
          "runtime_child_identity",
        )),
        resolution: "direct_child_identity",
      };
    }

    const starts = orderedSlotStarts(slots, components);
    if (starts) {
      const bindings = slots.map((slot, index) => {
        const start = starts[index];
        const end = index + 1 < starts.length ? starts[index + 1] : components.length;
        const range = components.slice(start, Math.max(start + 1, end));
        return combinedBinding(
          slot,
          range,
          constructionProvenance,
          range.length === 1 ? "direct_child" : "contiguous_child_range",
          range.length === 1 ? "runtime_child_affordance" : "runtime_child_range_affordance",
        );
      });
      return {
        status: "complete",
        bindings,
        resolution: "ordered_child_affordance_ranges",
      };
    }

    return {
      status: "legacy_unresolved",
      bindings: [],
      resolution: "no_deterministic_child_binding",
    };
  }

  function publicComponent(component) {
    const { _node, ...rest } = component;
    return rest;
  }

  function annotateNode(node, parserStart, sourceStart) {
    const parserSurface = nodeParserSurface(node);
    const displaySurface = nodeDisplaySurface(node);
    const parserEnd = parserStart + parserSurface.length;
    const sourceEnd = sourceStart + displaySurface.length;

    if (!node || node.kind !== "construction") {
      return { parserEnd, sourceEnd };
    }

    const constructionProvenance = {
      parser_surface: parserSurface,
      display_surface: displaySurface,
      source_surface: displaySurface,
      parser_span: absoluteSpan(parserStart, parserEnd, "parser_shadow_source"),
      source_span: absoluteSpan(sourceStart, sourceEnd, "raw_source"),
      display_span: absoluteSpan(sourceStart, sourceEnd, "raw_source"),
    };

    const components = [];
    let childParserCursor = parserStart;
    let childSourceCursor = sourceStart;
    for (let index = 0; index < (node.children || []).length; index += 1) {
      const child = node.children[index];
      const component = directComponent(
        child,
        index,
        childParserCursor,
        childSourceCursor,
        parserStart,
        sourceStart,
      );
      components.push(component);
      annotateNode(child, childParserCursor, childSourceCursor);
      childParserCursor = component.parser_span.end;
      childSourceCursor = component.source_span.end;
    }

    const semantic = semanticBindingsForConstruction(node, components, constructionProvenance);
    node.trace = {
      ...(node.trace || {}),
      trace_binding_schema: TRACE_BINDING_SCHEMA,
      binding_contract_status: semantic.status,
      binding_resolution: semantic.resolution,
      construction_provenance: constructionProvenance,
      bindings: semantic.bindings,
      components: components.map(publicComponent),
    };

    return { parserEnd, sourceEnd };
  }

  function annotateTraceBindings(nodes = [], options = {}) {
    let parserCursor = 0;
    let sourceCursor = 0;
    for (const node of nodes || []) {
      const result = annotateNode(node, parserCursor, sourceCursor);
      parserCursor = result.parserEnd;
      sourceCursor = result.sourceEnd;
    }
    return {
      nodes,
      schema: TRACE_BINDING_SCHEMA,
      parser_alignment_status: parserCursor === String(options.parserSource || "").length ? "PASS" : "WARN",
      source_alignment_status: sourceCursor === String(options.rawSource || "").length ? "PASS" : "WARN",
      parser_consumed_length: parserCursor,
      parser_source_length: String(options.parserSource || "").length,
      source_consumed_length: sourceCursor,
      raw_source_length: String(options.rawSource || "").length,
    };
  }

  return {
    TRACE_BINDING_SCHEMA,
    annotateTraceBindings,
  };
};
