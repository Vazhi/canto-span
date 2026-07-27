"use strict";

module.exports = function createIntendedFunctionDetectors(dependencies = {}) {
  const {
    construction,
    firstToken,
    flattenSurface,
    isDefinitionCopulaNode,
    isModalToken,
    isToken,
    isVerbLike,
    nodeCanFillSlot,
    nodeSlots,
    parserInactiveTokenClone,
    traceInfo,
    transparentTopicContentFromNodes,
    withoutIgnorableSpaceText,
    withoutTrailingParticles,
  } = dependencies;

function isIntendedFunctionUseNode(node) {
  return isToken(node, "用") && (String(node.syntax || "").includes("use_verb") || nodeCanFillSlot(node, "action_verb"));
}

function isIntendedFunctionLaiNode(node) {
  return node && node.kind === "token" && ["嚟", "來"].includes(flattenSurface(node));
}

function intendedFunctionUseToken(node) {
  return parserInactiveTokenClone(node, {
    label: "func",
    syntax: "intended_function_use_marker",
    slots: ["purpose_use_verb", "intended_function_marker"],
    reason: "用 marks the intended-function relation in a bounded topic/object + 用嚟 + predicate sequence; it is not the ordinary lexical-use verb in this context.",
  });
}

function intendedFunctionLaiToken(node) {
  const writtenForm = flattenSurface(node);
  return parserInactiveTokenClone(node, {
    label: "func",
    syntax: "intended_function_lai_linker purposive_linker",
    slots: ["purpose_lai_marker", "purpose_linker"],
    jyutping: writtenForm === "來" ? "loi4" : (node.jyutping || "lai4"),
    note: "links the object or resource to its intended use / function",
    reason: "嚟/來 is the intended-function linker inside this bounded relation, not a deictic motion predicate.",
    role_resolution_note: "嚟/來 is func only in the intended-function relation; directional-motion contexts keep the motion role.",
    trace_detail: { orthographic_form: writtenForm, relation_subtype: "intended_function" },
  });
}

function intendedFunctionPersonLike(node) {
  if (!node) return false;
  const first = firstToken(node) || node;
  return (first && first.label === "who")
    || (nodeCanFillSlot(node, "subject") && !nodeCanFillSlot(node, "object") && !nodeCanFillSlot(node, "head_noun"));
}

function intendedFunctionNonPersonNominal(node) {
  if (!node || intendedFunctionPersonLike(node)) return false;
  const slots = nodeSlots(node);
  return ["topic", "np", "head_noun", "object", "location", "instrument"].some((slot) => slots.includes(slot));
}

function intendedFunctionWrappedLinkPlan(node) {
  if (!node || node.kind !== "construction" || node.type !== "MotionPurposeChain") return null;
  const children = withoutIgnorableSpaceText(node.children || []);
  if (children.length < 2) return null;
  const link = children[0];
  if (!link || link.kind !== "construction" || link.type !== "VerbComplementVP") return null;
  const linkChildren = withoutIgnorableSpaceText(link.children || []);
  if (linkChildren.length !== 2 || !isIntendedFunctionUseNode(linkChildren[0])) return null;
  const laiWrapper = linkChildren[1];
  if (!laiWrapper || laiWrapper.kind !== "construction" || laiWrapper.type !== "DirectionalMotionVP") return null;
  const laiChildren = withoutIgnorableSpaceText(laiWrapper.children || []);
  if (laiChildren.length !== 1 || !isIntendedFunctionLaiNode(laiChildren[0])) return null;
  return {
    useNode: linkChildren[0],
    laiNode: laiChildren[0],
    predicateNodes: children.slice(1),
    retiredWrapperTypes: ["MotionPurposeChain", "VerbComplementVP", "DirectionalMotionVP"],
  };
}

function intendedFunctionTopicPlan(nodes) {
  let compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  let userSubject = null;

  // Older broad NP wrapping may combine a topicalized resource and an overt user
  // (for example 啲錢我). Recover the transparent children rather than treating
  // the whole sequence as one noun phrase.
  if (compact.length === 1 && compact[0].kind === "construction") {
    const children = withoutIgnorableSpaceText(compact[0].children || []);
    if (children.length >= 2 && intendedFunctionPersonLike(children[children.length - 1])
        && children.slice(0, -1).some(intendedFunctionNonPersonNominal)) {
      userSubject = children[children.length - 1];
      compact = children.slice(0, -1);
    }
  }
  if (!userSubject && compact.length >= 2 && intendedFunctionPersonLike(compact[compact.length - 1])) {
    const resourcePrefix = compact.slice(0, -1);
    const resourcePrefixSurface = resourcePrefix.map((node) => flattenSurface(node)).join("");
    const resourcePrefixHasNominal = resourcePrefix.some(intendedFunctionNonPersonNominal);
    const resourcePrefixHasDemonstrativeClassifierShape = /^[呢嗰].+/u.test(resourcePrefixSurface)
      && resourcePrefix.some((node) => nodeCanFillSlot(node, "classifier") || nodeCanFillSlot(node, "measure_word"));
    if (resourcePrefixHasNominal || resourcePrefixHasDemonstrativeClassifierShape) {
      userSubject = compact[compact.length - 1];
      compact = resourcePrefix;
    }
  }

  // A lone person pronoun in 我用嚟... names the user, not the object whose
  // function is being described. Keep the omitted resource visible as context debt.
  if (!compact.length || compact.every(intendedFunctionPersonLike)) return null;

  const transparent = transparentTopicContentFromNodes(compact);
  const hasDemonstrativeLead = ["呢", "嗰"].includes(flattenSurface(compact[0]));
  const firstSlots = nodeSlots(compact[0]);
  const hasClassifierLead = compact.length >= 2 && (firstSlots.includes("classifier") || firstSlots.includes("measure_word"));
  if (!transparent && !compact.some(intendedFunctionNonPersonNominal) && !hasDemonstrativeLead && !hasClassifierLead) return null;

  const resourceNodes = transparent ? [transparent] : compact;
  if (!userSubject) {
    // A preverbal NP in a direct function statement can be analyzed as subject,
    // topic, or a less theory-specific function-bearing resource. CP019-r2 does
    // not force the learner-visible Topic label when the contrast is unresolved.
    return {
      resourceNodes,
      userSubject: null,
      resourceRelationStatus: "direct_function_resource_subject_topic_underdetermined",
    };
  }

  // With a separate overt user after the resource (啲錢我用嚟...), the resource
  // is transparently left-dislocated relative to that subject and can retain the
  // existing Topic representation.
  const topic = construction("Topic", "Topic", resourceNodes, {
    slots: ["topic", "np", "function_topic"],
    note: "Thing or resource placed before the user to state what it is used for.",
    trace: traceInfo("generative_template", {
      construction_type: "Topic",
      template_family: "generative_template",
      assigned_slots: ["topic"],
      surfaces: resourceNodes.map((node) => flattenSurface(node)),
      relation_subtype: "intended_function",
      learner_gloss_lines: [
        "thing or resource being discussed",
        "Placed before the user to state what the resource is used for.",
      ],
      reason: "An overt user follows the resource, supporting a narrow left-dislocated topic representation without generalizing direct function subjects as topics.",
    }),
  });
  return {
    resourceNodes: [topic],
    userSubject,
    resourceRelationStatus: "overt_resource_topic_with_separate_user",
  };
}

function intendedFunctionRelationFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (!compact.length) return null;

  let useNode = null;
  let laiNode = null;
  let beforeUse = [];
  let predicateNodes = [];
  let inheritedWrapperRetirement = [];

  const useIndex = compact.findIndex(isIntendedFunctionUseNode);
  if (useIndex > 0 && useIndex < compact.length - 2 && isIntendedFunctionLaiNode(compact[useIndex + 1])) {
    useNode = compact[useIndex];
    laiNode = compact[useIndex + 1];
    beforeUse = compact.slice(0, useIndex);
    predicateNodes = compact.slice(useIndex + 2);
  } else {
    const wrapperIndex = compact.findIndex((node) => intendedFunctionWrappedLinkPlan(node));
    if (wrapperIndex <= 0 || wrapperIndex !== compact.length - 1) return null;
    const wrapped = intendedFunctionWrappedLinkPlan(compact[wrapperIndex]);
    useNode = wrapped.useNode;
    laiNode = wrapped.laiNode;
    beforeUse = compact.slice(0, wrapperIndex);
    predicateNodes = wrapped.predicateNodes;
    inheritedWrapperRetirement = wrapped.retiredWrapperTypes;
  }
  if (!predicateNodes.length) return null;
  if (predicateNodes.some((node) => (node.kind === "text" && /[，,；;]/u.test(String(node.text || ""))) || ["同埋", "或者"].includes(flattenSurface(node)))) return null;

  const controls = [];
  const controlSlots = [];
  const lastBefore = () => beforeUse[beforeUse.length - 1];
  if (beforeUse.length && isToken(lastBefore(), "唔係")) {
    const negatedCopula = beforeUse.pop();
    controls.push(parserInactiveTokenClone(negatedCopula, {
      label: "func", syntax: "intended_function_negated_copula", slots: ["negator", "copula"],
      reason: "Fused 唔係 negates the copular intended-function relation and must not be absorbed into the function-bearing topic.",
    }));
    controlSlots.push("negator", "copula");
  } else if (beforeUse.length && isModalToken(lastBefore())) {
    const modal = beforeUse.pop();
    if (beforeUse.length && isToken(lastBefore(), "唔")) {
      const negator = beforeUse.pop();
      controls.push(parserInactiveTokenClone(negator, {
        label: "func", syntax: "intended_function_modal_negator", slots: ["negator"],
        reason: "唔 scopes over the modal in the intended-function statement.",
      }));
      controlSlots.push("negator");
    }
    controls.push(parserInactiveTokenClone(modal, {
      label: "func", syntax: `${modal.syntax || "modal"} intended_function_modal`, slots: ["modal"],
      reason: "The modal scopes over the intended-function relation.",
    }));
    controlSlots.push("modal");
  } else if (beforeUse.length && isDefinitionCopulaNode(lastBefore())) {
    const copula = beforeUse.pop();
    if (beforeUse.length && isToken(lastBefore(), "唔")) {
      const negator = beforeUse.pop();
      controls.push(parserInactiveTokenClone(negator, {
        label: "func", syntax: "intended_function_copular_negator", slots: ["negator"],
        reason: "唔 negates the copular intended-function statement.",
      }));
      controlSlots.push("negator");
    }
    controls.push(parserInactiveTokenClone(copula, {
      label: "func", syntax: "intended_function_copula", slots: ["copula"],
      reason: "Optional 係 introduces a copular intended-function statement but is not required by the relation.",
    }));
    controlSlots.push("copula");
  } else if (beforeUse.length && isToken(lastBefore(), "唔")) {
    // Contrastive/lexical 唔用嚟 is outside the narrow affirmative intended-function replacement.
    return null;
  }

  const plan = intendedFunctionTopicPlan(beforeUse);
  if (!plan) return null;
  const actualUseEventAmbiguity = predicateNodes.some((node) => flattenSurface(node).includes("咗") || nodeCanFillSlot(node, "perfective_aspect"));
  const modalAffordanceAmbiguity = controlSlots.includes("modal");
  const overtActionPredicate = predicateNodes.some((node) => isVerbLike(node) || nodeCanFillSlot(node, "action_vp") || nodeCanFillSlot(node, "action_verb"));
  const directResourceFunctionProfile = !plan.userSubject
    && controlSlots.length === 0
    && plan.resourceRelationStatus === "direct_function_resource_subject_topic_underdetermined"
    && !actualUseEventAmbiguity
    && !modalAffordanceAmbiguity
    && overtActionPredicate;
  const relationConstructionType = directResourceFunctionProfile
    ? "ResourceUseLaiFunctionRelation"
    : "IntendedFunctionRelation";
  const children = [...plan.resourceNodes];
  const assignedSlots = ["function_topic"];
  if (plan.userSubject) {
    children.push(plan.userSubject);
    assignedSlots.push("user_subject");
  }
  children.push(...controls, intendedFunctionUseToken(useNode), intendedFunctionLaiToken(laiNode), ...predicateNodes, ...particles);
  assignedSlots.push(...controlSlots, "purpose_use_verb", "purpose_lai_marker", "purpose_predicate");
  if (particles.length) assignedSlots.push("particle");

  return construction(relationConstructionType, "Use / function", children, {
    slots: ["intended_function_relation", "function_relation", "function_topic", "purpose_use_verb", "purpose_lai_marker", "purpose_predicate", "predicate", "vp", "action_vp", "clause", ...controlSlots, ...(plan.userSubject ? ["topic", "user_subject", "subject"] : [])],
    note: "Connects an overt object, resource, or artifact to a stated use or function. Direct resource NPs remain neutral between subject and topic unless a separate overt user supports topicalization.",
    trace: traceInfo("generative_template", {
      construction_type: relationConstructionType,
      template_family: "generative_template",
      template: ["function_topic!", "user_subject?", "negator?", "copula_or_modal?", "purpose_use_verb!", "purpose_lai_marker!", "purpose_predicate!", "particle?"],
      assigned_slots: assignedSlots,
      surfaces: children.map((node) => flattenSurface(node)),
      relation_subtype: directResourceFunctionProfile ? "direct_resource_use_lai_function" : "intended_function",
      typed_relation: "object_or_resource_to_intended_use",
      evidence_status: directResourceFunctionProfile ? "research_pending_np_infrastructure" : "broad_provisional",
      relation_reading_status: actualUseEventAmbiguity
        ? "ambiguous_intended_function_vs_actual_use_event"
        : (modalAffordanceAmbiguity ? "ambiguous_intended_function_vs_available_use_or_affordance" : "intended_function_candidate"),
      semantic_review_flags: [
        ...(actualUseEventAmbiguity ? ["intended_function_actual_use_event_ambiguity"] : []),
        ...(modalAffordanceAmbiguity ? ["intended_function_vs_affordance_ambiguity"] : []),
      ],
      function_resource_relation_status: plan.resourceRelationStatus,
      learner_gloss_lines: [
        "use or function",
        "Connects a thing or resource to what it is used for.",
      ],
      reason: "CP019-r2 retains one narrow evidence-grounded 用嚟 relation, avoids forcing direct function resources into a public Topic analysis, and keeps perfective-event and modal-affordance readings explicitly review-bearing.",
      inherited_wrapper_retirement: inheritedWrapperRetirement,
      direct_resource_profile: directResourceFunctionProfile,
      overt_resource_required: directResourceFunctionProfile,
      adjacent_use_lai_required: directResourceFunctionProfile,
      overt_action_predicate_required: directResourceFunctionProfile,
      separate_user_subject_allowed: directResourceFunctionProfile ? false : null,
      modal_or_copular_controls_allowed: directResourceFunctionProfile ? false : null,
      actual_use_event_licensing: directResourceFunctionProfile ? false : null,
      affordance_licensing: directResourceFunctionProfile ? false : null,
      hidden_argument_insertion: directResourceFunctionProfile ? false : null,
      ordinary_lexical_use_licensing: directResourceFunctionProfile ? false : null,
      general_purpose_lai_licensing: directResourceFunctionProfile ? false : null,
      resource_subject_topic_status: directResourceFunctionProfile ? "underdetermined" : plan.resourceRelationStatus,
      not_claims: ["not_directional_motion", "not_ordinary_instrumental_use", "not_lexical_transitive_use", "not_general_purpose_serialization", ...(directResourceFunctionProfile ? ["not_actual_use_event", "not_modal_affordance", "not_separate_user_frame", "not_hidden_resource"] : [])],
    }),
  });
}

  return {
    intendedFunctionRelationFallback,
  };
};
