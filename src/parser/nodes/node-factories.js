"use strict";

module.exports = function createNodeFactories(dependencies = {}) {
  const {
    TOKEN_LEXICON,
    TOKEN_LEXICAL_ANALYSES,
    UNKNOWN_CJK_JYUTPING_FALLBACK,
    normalizeLearnerLabel,
    cleanSlots,
    contextualRoleAffordances,
    inferTokenFeatures,
    compactFeatureSummary,
    featureBundleFor,
    generateTokenSlots,
    traceInfo,
    traceKind,
    constructionSlotsByType,
    nodeParserSurface,
    nodeDisplaySurface,
    INTERNAL_CONSTRUCTION_COMPATIBILITY_ALIASES,
    INTERNAL_ONLY_CONSTRUCTION_SCOPES,
    internalConstructionTypeFor,
    clauseSpanProfileForCompatibilityType,
    npLicenseMetadata,
  } = dependencies;

  function pronunciationOnlyJyutpingForUnknown(surface) {
    return UNKNOWN_CJK_JYUTPING_FALLBACK[String(surface || "")] || "";
  }
  function token(surface, overrides = {}) {
    const baseEntry = TOKEN_LEXICON[surface] || {};
    const lexicalAnalyses = TOKEN_LEXICAL_ANALYSES && TOKEN_LEXICAL_ANALYSES[surface] ? TOKEN_LEXICAL_ANALYSES[surface] : [];
    const requestedAnalysisId = overrides.analysis_id || "";
    const selectedAnalysis = requestedAnalysisId
      ? lexicalAnalyses.find((analysis) => analysis.id === requestedAnalysisId) || null
      : (lexicalAnalyses.length === 1 ? lexicalAnalyses[0] : null);
    const entry = selectedAnalysis ? { ...baseEntry, ...selectedAnalysis } : baseEntry;
    const rawLabel = overrides.label || entry.label || "neutral";
    const syntax = overrides.syntax || entry.syntax || "lexical_candidate";
    const label = normalizeLearnerLabel(rawLabel, surface, syntax);
    const features = inferTokenFeatures(surface, { ...entry, label, syntax }, overrides);
    const slots = overrides.slots ? cleanSlots(overrides.slots) : generateTokenSlots(features);
    const featureBundle = featureBundleFor(surface, { ...entry, label, syntax }, features, slots);
    const lexicalAnalysisResolution = {
      status: selectedAnalysis ? "selected" : (lexicalAnalyses.length > 1 ? "unresolved" : (lexicalAnalyses.length === 1 ? "single" : "none")),
      requested_analysis_id: requestedAnalysisId || undefined,
      active_analysis_id: selectedAnalysis ? selectedAnalysis.id : "",
      candidate_analysis_ids: lexicalAnalyses.map((analysis) => analysis.id),
    };
    const traceDetail = {
      surface,
      lexical_analyses: lexicalAnalyses,
      lexical_analysis_resolution: lexicalAnalysisResolution,
      generated_slots: slots,
      feature_summary: compactFeatureSummary(features),
      feature_bundle: featureBundle,
    };
    if (!Object.keys(entry).length && pronunciationOnlyJyutpingForUnknown(surface)) {
      traceDetail.learner_gloss_lines = [
        "meaning not yet confirmed",
        "Pronunciation is shown without assigning this word a grammatical analysis.",
      ];
    }
    const roleAffordances = contextualRoleAffordances({ surface, role: label, label, syntax, slots, features });
    if (roleAffordances.length > 1) traceDetail.contextual_role_affordances = roleAffordances;
    if (overrides.selection_decision) traceDetail.selection_decision = overrides.selection_decision;
    return {
      kind: "token",
      surface,
      display_surface: overrides.display_surface || undefined,
      parser_surface: overrides.parser_surface || surface,
      label,
      jyutping: overrides.jyutping || entry.jyutping || pronunciationOnlyJyutpingForUnknown(surface) || "",
      syntax,
      lexical_analyses: lexicalAnalyses,
      active_lexical_analysis_id: selectedAnalysis ? selectedAnalysis.id : "",
      lexical_analysis_resolution: lexicalAnalysisResolution,
      note: overrides.note || entry.note || (pronunciationOnlyJyutpingForUnknown(surface)
        ? "meaning not yet confirmed"
        : "Neutral lexical item; no reviewed learner role yet."),
      review: overrides.review || entry.review || "reviewed_or_seeded_runtime",
      features,
      feature_bundle: featureBundle,
      slots,
      trace: overrides.trace || traceInfo(entry && Object.keys(entry).length ? "atomic_lexicon" : "unknown_atomic", traceDetail),
    };
  }
  function textNode(text) {
    return { kind: "text", text, trace: traceInfo("punctuation_or_plain_text", { surface: text }) };
  }
  function construction(type, label, children, options = {}) {
    const requestedType = type;
    const internalType = internalConstructionTypeFor(requestedType);
    const baseSlots = options.slots || constructionSlotsByType(requestedType, children);
    const compatibilityAlias = options.compatibility_alias
      || (internalType !== requestedType ? requestedType : INTERNAL_CONSTRUCTION_COMPATIBILITY_ALIASES[internalType] || "");
    const internalRepresentationScope = INTERNAL_ONLY_CONSTRUCTION_SCOPES[internalType] || "";
    const rawTrace = options.trace || traceInfo("construction_function", { construction_type: requestedType });
    const normalizedTrace = internalType === "ClauseSpan"
      ? {
          ...rawTrace,
          construction_type: "ClauseSpan",
          compatibility_construction_type: compatibilityAlias || requestedType,
          clause_span_profile: clauseSpanProfileForCompatibilityType(compatibilityAlias || requestedType),
          clause_span_semantic_status: "neutral_overt_span_accounting_only",
          typed_predicate_child_preserved: true,
          independent_grammar_licensing: false,
          subject_insertion_capability: false,
          topic_insertion_capability: false,
          argument_omission_licensing: false,
          context_resolution_capability: false,
          predicate_subtype_licensing: false,
          modal_licensing: false,
        }
      : rawTrace;
    const npMetadata = npLicenseMetadata(internalType, children, normalizedTrace);
    const finalTrace = npMetadata ? { ...normalizedTrace, ...npMetadata } : normalizedTrace;
    return {
      kind: "construction",
      type: internalType,
      compatibility_alias: compatibilityAlias,
      internal_representation_scope: internalRepresentationScope,
      internal_only: Boolean(internalRepresentationScope),
      label,
      children,
      display_surface: options.display_surface || nodeDisplaySurface({ kind: "construction", children }),
      parser_surface: options.parser_surface || nodeParserSurface({ kind: "construction", children }),
      primary: options.primary || "",
      note: options.note || "Parent construction span. Child tokens keep their own learner roles.",
      slots: cleanSlots(baseSlots),
      trace: finalTrace,
    };
  }
  function parserInactiveTokenClone(node, overrides = {}) {
    if (!node || node.kind !== "token") return node;
    const surface = node.surface;
    const syntax = overrides.syntax || node.syntax || "";
    const label = normalizeLearnerLabel(overrides.label || node.label || "neutral", surface, syntax);
    const slots = cleanSlots(overrides.slots || []);
    const jyutping = Object.prototype.hasOwnProperty.call(overrides, "jyutping")
      ? overrides.jyutping
      : node.jyutping;
    const note = Object.prototype.hasOwnProperty.call(overrides, "note")
      ? overrides.note
      : node.note;
    const features = {
      ...(node.features || {}),
      pos: overrides.pos || (node.features && node.features.pos) || "",
      label,
      syntax,
      semantic: overrides.semantic || [],
      verb_class: overrides.verb_class || [],
      particle_class: overrides.particle_class || "",
    };
    const featureBundle = featureBundleFor(surface, { label, syntax }, features, slots);
    const inheritedAffordanceCandidates = node.trace
      && node.trace.contextual_role_affordance_resolution
      && Array.isArray(node.trace.contextual_role_affordance_resolution.candidate_affordances)
        ? node.trace.contextual_role_affordance_resolution.candidate_affordances.map((item) => ({ ...item }))
        : [];
    const contextualRoleAffordanceResolution = {
      lexical_default_role: node.label || "",
      active_role: label,
      candidate_affordances: overrides.preserve_existing_affordances && inheritedAffordanceCandidates.length
        ? inheritedAffordanceCandidates
        : contextualRoleAffordances({ surface, role: node.label || label, label: node.label || label, syntax: node.syntax || syntax, slots: node.slots || [], features: node.features || {} }),
      active_affordance_source: overrides.reason || "Token is parser-inactive inside a parent construction wrapper.",
      active_affordance_match: overrides.active_affordance_match || undefined,
      note: "Construction context selects the active learner role without deleting other lexical affordances.",
    };
    return {
      ...node,
      label,
      role: label,
      syntax,
      jyutping,
      note,
      slots,
      features,
      feature_bundle: featureBundle,
      trace: traceInfo("construction_internal_parser_inactive_clone", {
        surface,
        original_trace: traceKind(node),
        reason: overrides.reason || "Token is parser-inactive inside a parent construction wrapper.",
        contextual_role_affordance_resolution: contextualRoleAffordanceResolution,
        role_resolution_note: overrides.role_resolution_note || undefined,
        feature_bundle: featureBundle,
        ...(overrides.trace_detail || {}),
      }),
    };
  }
  function learnerDisplayOnlyTokenClone(node, overrides = {}) {
    if (!node || node.kind !== "token") return node;
    const note = Object.prototype.hasOwnProperty.call(overrides, "note") ? overrides.note : node.note;
    const learnerGlossLines = overrides.learner_gloss_lines
      || (note ? [note] : []);
    return {
      ...node,
      note,
      display_surface: overrides.display_surface || node.display_surface,
      trace: {
        ...(node.trace || {}),
        ...(learnerGlossLines.length ? { learner_gloss_lines: learnerGlossLines } : {}),
      },
    };
  }
  function contextualLearnerRoleOnlyTokenClone(node, overrides = {}) {
    if (!node || node.kind !== "token") return node;
    const surface = node.surface;
    const syntax = overrides.syntax || node.syntax || "";
    const label = normalizeLearnerLabel(overrides.label || node.label || "neutral", surface, syntax);
    const note = Object.prototype.hasOwnProperty.call(overrides, "note") ? overrides.note : node.note;
    const learnerGlossLines = overrides.learner_gloss_lines || (overrides.trace_detail && overrides.trace_detail.learner_gloss_lines) || (note ? [note] : []);
    return {
      ...node,
      label,
      role: label,
      syntax,
      note,
      features: { ...(node.features || {}), label, syntax, pos: overrides.pos || (node.features && node.features.pos) || "" },
      trace: {
        ...(node.trace || {}),
        ...(learnerGlossLines.length ? { learner_gloss_lines: learnerGlossLines } : {}),
        contextual_learner_role_override: {
          lexical_default_role: node.label || "",
          active_role: label,
          reason: overrides.reason || "Learner display role is adjusted contextually without changing parser or semantic provenance.",
        },
      },
    };
  }

  return {
    pronunciationOnlyJyutpingForUnknown,
    token,
    textNode,
    construction,
    parserInactiveTokenClone,
    learnerDisplayOnlyTokenClone,
    contextualLearnerRoleOnlyTokenClone,
  };
};
