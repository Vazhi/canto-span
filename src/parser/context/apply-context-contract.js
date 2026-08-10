"use strict";

module.exports = function createContextContractApplication(dependencies = {}) {
  const {
    compatibleContextQuestion,
    contextRequiredTrace,
    contextualConventionalZiDurationBoundary,
    contextualPositiveExistentialAcknowledgementRepetition,
    contextualQuantifiedClassifierNPBoundary,
    flattenNodes,
    flattenSurface,
    hasSentencePunctuation,
    licensedContextConventionalCognitionStatement,
    licensedContextEllipticalExistentialQuestion,
    licensedContextFragmentQuestion,
    licensedContextHaveOrNotEventQuestion,
    licensedContextNegatedExistentialFragment,
    licensedContextOpinionStanceFrame,
    licensedContextQuantifiedTimeNP,
    licensedContextShortExperientialQuestion,
    licensedContextStancePredicateAnswer,
    licensedFragmentAnswer,
    needsContextAroundExisting,
    saturatedCompletionBoundary,
    splitTerminalContextNodes,
    targetDescriptorForContext,
    typedContextDependentFragmentBoundary,
    withoutIgnorableSpaceText,
  } = dependencies;

  function sentenceContextGroups(nodes = []) {
    const groups = [];
    let current = [];
    for (const node of nodes || []) {
      current.push(node);
      if (node && node.kind === "text" && hasSentencePunctuation(node.text)) {
        if (withoutIgnorableSpaceText(current).length) groups.push(current);
        current = [];
      }
    }
    if (withoutIgnorableSpaceText(current).length) groups.push(current);
    return groups;
  }

  function applyExplicitContextContract(nodes, explicitContext) {
    const sentenceGroups = sentenceContextGroups(nodes || []);
    if (sentenceGroups.length > 1) {
      const noCrossSentenceContext = { turns: [], public: { supplied: false, turns: [] } };
      const applied = sentenceGroups.map((group) => applyExplicitContextContract(group, noCrossSentenceContext));
      const resolutions = applied.map((item) => item.resolution).filter(Boolean);
      const unresolved = resolutions.find((trace) => ["context_required", "context_incompatible"].includes(trace.context_requirement_status));
      return {
        nodes: applied.flatMap((item) => item.nodes || []),
        resolution: unresolved || resolutions[resolutions.length - 1] || null,
      };
    }
    const { structural, terminal } = splitTerminalContextNodes(nodes || []);
    if (!structural.length) return { nodes, resolution: null };
    const completionBoundary = saturatedCompletionBoundary(structural);
    if (completionBoundary) {
      const top = structural[0];
      top.trace = {
        ...(top.trace || {}),
        context_requirement_status: "context_not_required",
        missing_argument_slots: [],
        antecedent_status: "not_applicable",
        completion_boundary_status: completionBoundary.completion_boundary_status,
        completion_boundary_type: completionBoundary.boundary_type,
        activity_domain_status: completionBoundary.activity_domain_status,
        ...(completionBoundary.particle_contribution ? { particle_contribution: completionBoundary.particle_contribution } : {}),
        completion_boundary_reason: completionBoundary.reason,
        not_claims: Array.from(new Set([...(top.trace && top.trace.not_claims || []), ...completionBoundary.not_claims])),
      };
      return { nodes: [...structural, ...terminal], resolution: null };
    }
    const licensedQuestionFragment = licensedContextFragmentQuestion(structural, explicitContext);
    if (licensedQuestionFragment) {
      return { nodes: [licensedQuestionFragment, ...terminal], resolution: licensedQuestionFragment.trace };
    }
    const licensedShortExperientialQuestion = licensedContextShortExperientialQuestion(structural, explicitContext);
    if (licensedShortExperientialQuestion) {
      return { nodes: [licensedShortExperientialQuestion, ...terminal], resolution: licensedShortExperientialQuestion.trace };
    }
    const licensedNegatedExistentialFragment = licensedContextNegatedExistentialFragment(structural, explicitContext);
    if (licensedNegatedExistentialFragment) {
      return { nodes: [licensedNegatedExistentialFragment, ...terminal], resolution: licensedNegatedExistentialFragment.trace };
    }
    const contextualPositiveExistentialRepetition = contextualPositiveExistentialAcknowledgementRepetition(structural, explicitContext);
    if (contextualPositiveExistentialRepetition) {
      return { nodes: [contextualPositiveExistentialRepetition, ...terminal], resolution: contextualPositiveExistentialRepetition.trace };
    }
    const typedFragmentBoundary = typedContextDependentFragmentBoundary(structural, explicitContext);
    if (typedFragmentBoundary) {
      return { nodes: [typedFragmentBoundary, ...terminal], resolution: typedFragmentBoundary.trace };
    }
    const licensedEllipticalExistentialQuestion = licensedContextEllipticalExistentialQuestion(structural, explicitContext);
    if (licensedEllipticalExistentialQuestion) {
      return { nodes: [licensedEllipticalExistentialQuestion, ...terminal], resolution: licensedEllipticalExistentialQuestion.trace };
    }
    const licensedHaveOrNotEventQuestion = licensedContextHaveOrNotEventQuestion(structural, explicitContext);
    if (licensedHaveOrNotEventQuestion) {
      return { nodes: [licensedHaveOrNotEventQuestion, ...terminal], resolution: licensedHaveOrNotEventQuestion.trace };
    }
    const licensedConventionalCognition = licensedContextConventionalCognitionStatement(structural, explicitContext);
    if (licensedConventionalCognition) {
      return { nodes: [licensedConventionalCognition, ...terminal], resolution: licensedConventionalCognition.trace };
    }
    const licensedStanceAnswer = licensedContextStancePredicateAnswer(structural, explicitContext);
    if (licensedStanceAnswer) {
      return { nodes: [licensedStanceAnswer, ...terminal], resolution: licensedStanceAnswer.trace };
    }
    const licensedOpinionStance = licensedContextOpinionStanceFrame(structural, explicitContext);
    if (licensedOpinionStance) {
      return { nodes: [licensedOpinionStance, ...terminal], resolution: licensedOpinionStance.trace };
    }
    const conventionalZiDurationBoundary = contextualConventionalZiDurationBoundary(structural, explicitContext);
    if (conventionalZiDurationBoundary) {
      return {
        nodes: [...conventionalZiDurationBoundary.nodes, ...terminal],
        resolution: conventionalZiDurationBoundary.resolution,
      };
    }
    const quantifiedClassifierBoundary = contextualQuantifiedClassifierNPBoundary(structural, explicitContext);
    if (quantifiedClassifierBoundary) {
      const boundaryNodes = Array.isArray(quantifiedClassifierBoundary.nodes)
        ? quantifiedClassifierBoundary.nodes
        : [quantifiedClassifierBoundary];
      const resolution = quantifiedClassifierBoundary.resolution
        || (quantifiedClassifierBoundary.trace || null);
      return { nodes: [...boundaryNodes, ...terminal], resolution };
    }
    const licensedQuantifiedTime = licensedContextQuantifiedTimeNP(structural, explicitContext);
    if (licensedQuantifiedTime) {
      return { nodes: [licensedQuantifiedTime, ...terminal], resolution: licensedQuantifiedTime.trace };
    }
    const target = targetDescriptorForContext(structural);
    const only = structural.length === 1 && structural[0].kind === "construction" ? structural[0] : null;
    if (only && only.type === "ClauseRelationGraph" && only.trace && only.trace.topic_chain_status) {
      return { nodes: [...structural, ...terminal], resolution: only.trace };
    }
    const targetTokens = flattenNodes(structural).filter((row) => row.kind === "token");
    const targetHasOvertObject = targetTokens.some((row) => {
      const slots = row.slots || [];
      return !slots.includes("subject") && slots.some((slot) => ["object", "theme", "head_noun"].includes(slot));
    });
    const targetNeedsObjectDomain = Boolean(target && (target.missing_argument_slots || []).some((slot) => slot.includes("object") || slot.includes("domain")));
    const unsaturatedPerfective = only
      && target
      && target.has_perfective_structure
      && (targetNeedsObjectDomain || target.subject_status !== "explicit")
      && !targetHasOvertObject;
    if (unsaturatedPerfective) {
      target.missing_argument_slots = Array.from(new Set([
        ...(target.missing_argument_slots || []),
        ...(target.subject_status === "explicit" ? [] : ["subject"]),
      ]));
    }
    const ineligibleMultiSpan = structural.some((node) => node.kind === "text" && hasSentencePunctuation(node.text))
      || (only && ["ClauseSequence", "ClauseRelationGraph"].includes(only.type));
    const contextMatch = ineligibleMultiSpan
      ? { descriptor: null, supplied: (explicitContext.turns || []).length > 0, sawQuestion: false }
      : compatibleContextQuestion(target, explicitContext.turns || []);

    if (target && contextMatch.descriptor && contextMatch.descriptor.question_domain_surface && !target.has_overt_object) {
      if (target.predicate_family === "action") {
        target.missing_argument_slots = Array.from(new Set([...(target.missing_argument_slots || []), "object_or_activity_domain"]));
      }
    }
    if (target && contextMatch.descriptor && target.subject_status !== "explicit" && target.predicate_family !== "stative") {
      target.missing_argument_slots = Array.from(new Set([...(target.missing_argument_slots || []), "subject"]));
    }

    if (target && target.missing_argument_slots.length && contextMatch.descriptor) {
      const fragment = licensedFragmentAnswer(structural, target, contextMatch.descriptor);
      return {
        nodes: [fragment, ...terminal],
        resolution: fragment.trace,
      };
    }

    const trace = only && only.trace ? only.trace : {};
    const traceRequiresContext = trace.context_requirement_status === "context_required";
    const shouldWrapExisting = traceRequiresContext
      && only
      && only.type !== "NeedsContext";
    const shouldWrapPerfective = Boolean(unsaturatedPerfective);

    if (shouldWrapExisting || shouldWrapPerfective) {
      const missing = traceRequiresContext ? trace.missing_argument_slots : target.missing_argument_slots;
      const status = contextMatch.supplied ? "context_incompatible" : "context_required";
      const wrapper = needsContextAroundExisting(structural, {
        context_requirement_status: status,
        missing_argument_slots: missing || [],
        antecedent_status: contextMatch.supplied ? "incompatible" : "not_observed",
        discourse_license_not_observed: true,
        overt_head: trace.overt_head !== undefined ? trace.overt_head : (target && target.legacy_context_metadata_active ? target.head_surface : null),
        subject_status: trace.subject_status !== undefined ? trace.subject_status : (target && target.legacy_context_metadata_active ? target.subject_status : null),
        particle_contribution: trace.particle_contribution !== undefined ? trace.particle_contribution : (target && target.legacy_context_metadata_active ? target.particle_contribution : null),
        aspect: trace.aspect !== undefined ? trace.aspect : (target && target.legacy_context_metadata_active ? target.aspect : null),
        embedded_construction: only.type,
        reason: contextMatch.supplied
          ? "Explicit context was supplied, but it does not contain a compatible question/antecedent for the target's missing slots."
          : "The internal construction is valid, but its omitted argument/domain requires explicit compatible context.",
        not_claims: ["not_fabricated_antecedent", "not_clean_context_free_clause"],
      });
      return { nodes: [wrapper, ...terminal], resolution: wrapper.trace };
    }

    if (only && only.type === "NeedsContext" && contextMatch.supplied && !contextMatch.descriptor) {
      only.trace = contextRequiredTrace({
        ...(only.trace || {}),
        context_requirement_status: "context_incompatible",
        antecedent_status: "incompatible",
        discourse_license_not_observed: true,
        reason: "Explicit context was supplied, but it does not license the target's typed missing slot.",
      });
      return { nodes: [...structural, ...terminal], resolution: only.trace };
    }

    return {
      nodes: [...structural, ...terminal],
      resolution: only && only.trace && only.trace.context_requirement_status ? only.trace : null,
    };
  }

  return {
    sentenceContextGroups,
    applyExplicitContextContract,
  };
};
