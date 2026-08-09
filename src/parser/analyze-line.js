"use strict";

const defaultTraceBindingAnnotator = require("./diagnostics/trace-bindings")();

module.exports = function createAnalyzeLine(dependencies = {}) {
  const {
    analyzedExplicitContext,
    annotateRawDisplaySurfaces,
    annotateTraceBindings = defaultTraceBindingAnnotator.annotateTraceBindings,
    applyConstructionPatternsByPunctuation,
    applyExplicitContextContract,
    normalizeInputForParser,
    normalizeSurface,
    tokenizeLine,
  } = dependencies;

function analyzeLine(source, explicitContextInput = null) {
  const warnings = [];
  const explicitContext = analyzedExplicitContext(explicitContextInput);
  const input_normalization = normalizeInputForParser(source);
  const parserSource = input_normalization.parser_shadow_source;
  const normalized = normalizeSurface(parserSource);
  if (normalized === "唔好食") {
    warnings.push("Needs context: 唔好食 can mean 唔 + 好食 = not tasty, or 唔好 + 食 = don't eat.");
  }
  const tokens = annotateRawDisplaySurfaces(tokenizeLine(parserSource), source, parserSource);
  const initialNodes = annotateRawDisplaySurfaces(applyConstructionPatternsByPunctuation(tokens), source, parserSource);
  const contextApplied = applyExplicitContextContract(initialNodes, explicitContext);
  const nodes = annotateRawDisplaySurfaces(contextApplied.nodes, source, parserSource);
  const trace_binding_provenance = annotateTraceBindings(nodes, {
    rawSource: source,
    parserSource,
  });
  return {
    source,
    parser_shadow_source: parserSource,
    input_normalization,
    normalization_trace: input_normalization.normalization_trace,
    normalization_review_suggestions: input_normalization.review_suggestions,
    warnings,
    tokens,
    nodes,
    trace_binding_provenance,
    explicit_context: explicitContext.public,
    context_resolution: contextApplied.resolution,
    diagnostics: true,
  };
}

  return {
    analyzeLine,
  };
};
