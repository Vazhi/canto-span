"use strict";

module.exports = function createContextTurns(dependencies = {}) {
  const {
    analyzeLine,
    diagnosticSummary,
    normalizeSurface,
  } = dependencies;

  function explicitContextTurns(input) {
    if (!input) return [];
    const rawTurns = typeof input === "string"
      ? [{ source: input }]
      : Array.isArray(input)
        ? input
        : Array.isArray(input.turns)
          ? input.turns
          : input.source
            ? [input]
            : [];
    return rawTurns
      .map((turn) => typeof turn === "string" ? { source: turn } : (turn || {}))
      .filter((turn) => normalizeSurface(turn.source))
      .map((turn, index) => ({
        id: String(turn.id || `context-${index + 1}`),
        source: String(turn.source || ""),
        directive_line_index: Number.isInteger(turn.directive_line_index) ? turn.directive_line_index : null,
        target_source_line_index: Number.isInteger(turn.target_source_line_index) ? turn.target_source_line_index : null,
        raw_directive: turn.raw_directive ? String(turn.raw_directive) : "",
        directive_kind: turn.directive_kind ? String(turn.directive_kind) : "explicit_context_next_source",
      }));
  }

  function analyzedExplicitContext(input) {
    const turns = explicitContextTurns(input).map((turn) => {
      const analysis = analyzeLine(turn.source);
      return { ...turn, analysis };
    });
    return {
      turns,
      public: {
        supplied: turns.length > 0,
        turns: turns.map((turn) => ({
          id: turn.id,
          source: turn.source,
          directive_kind: turn.directive_kind,
          directive_line_index: turn.directive_line_index,
          target_source_line_index: turn.target_source_line_index,
          raw_directive: turn.raw_directive,
          parser_shadow_source: turn.analysis.parser_shadow_source,
          top_constructions: diagnosticSummary(turn.analysis).top_constructions || [],
        })),
      },
    };
  }

  return {
    explicitContextTurns,
    analyzedExplicitContext,
  };
};
