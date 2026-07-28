"use strict";

module.exports = function createOpinionDetectors(dependencies = {}) {
  const {
    applyConstructionPatterns,
    categorySubspanFor,
    cleanSlots,
    construction,
    contextualOpinionPlaceholderChildren,
    copulaClone,
    firstToken,
    flattenSurface,
    hasSurface,
    isToken,
    modalVPFromNodes,
    nodeCanFillSlot,
    nodeSlots,
    nominalComplementFromNodes,
    parserInactiveTokenClone,
    phase4OpinionStanceActiveTokenClone,
    predicateOmissionProfileForHead,
    subjectStativePredicateClauseFallback,
    templateConstructionFor,
    templateDerivedSlots,
    traceInfo,
    withoutTrailingParticles,
    wrapCategorySubspans,
  } = dependencies;

function opinionSeemingFallback(core) {
  if (!(hasSurface(core, "覺得") || hasSurface(core, "我覺得")) || !hasSurface(core, "好似")) return null;
  const opinionChildren = contextualOpinionPlaceholderChildren(core);
  return construction("OpinionStanceFrame", "Opinion/Stance", opinionChildren, {
    note: "Opinion/seeming fallback: 覺得 + 好似 + predicate.",
    trace: traceInfo("legacy_surface_rule", {
      rule: "has 覺得/我覺得 and 好似",
      reason: "Fallback only; generative OpinionStanceFrame should normally catch this.",
    }),
  });
}

function splitOpinionTrailingParticles(core) {
  const split = withoutTrailingParticles(core);
  const bareCore = split.core.slice();
  const particles = split.particles.slice();

  // In 係真嘅, final 嘅 nominalizes the visible stative complement; it is not
  // a sentence-final particle. Restore it before opinion-content analysis.
  if (
    particles.length &&
    isToken(particles[0], "嘅") &&
    bareCore.some((node) => isToken(node, "係"))
  ) {
    bareCore.push(particles.shift());
  }
  return { core: bareCore, particles };
}

function isOpinionFrameFocusModifier(node) {
  return Boolean(node) && node.kind !== "text" && nodeCanFillSlot(node, "focus_adverb");
}

function splitLeadingOpinionContentModifiers(nodes) {
  const modifiers = [];
  let index = 0;
  while (index < nodes.length && isOpinionFrameFocusModifier(nodes[index])) {
    modifiers.push(nodes[index]);
    index += 1;
  }
  return { modifiers, core: nodes.slice(index) };
}

function opinionComplementTokenClone(node, subtype) {
  if (!node || node.kind !== "token") return node;
  const surface = flattenSurface(node);
  if (["係", "唔係"].includes(surface)) {
    return parserInactiveTokenClone(node, {
      label: "func",
      pos: "function",
      syntax: `${surface === "唔係" ? "negated_copula" : "copula"} complement_ellipsis_predicate`,
      slots: cleanSlots([
        surface === "唔係" ? "negated_copula" : "copula",
        surface === "唔係" ? "negator" : "",
        "predicate",
        "reported_content",
        "content_clause",
      ]),
      reason: `The visible ${surface} predicate is retained inside a ${subtype} complement-ellipsis fragment; no missing complement words are fabricated.`,
    });
  }
  if (["有", "冇"].includes(surface)) {
    return parserInactiveTokenClone(node, {
      label: "func",
      pos: "function",
      syntax: `${surface === "冇" ? "negated_existential" : "existential"} complement_ellipsis_predicate`,
      slots: cleanSlots([
        surface === "冇" ? "negated_existential" : "existential",
        "predicate",
        "reported_content",
        "content_clause",
      ]),
      reason: `The visible ${surface} predicate is retained inside an existential-domain complement-ellipsis fragment; no missing domain is fabricated.`,
    });
  }
  return node;
}

function opinionComplementEllipsisFragment(nodes, subtype, missingSlot) {
  const children = nodes.map((node) => opinionComplementTokenClone(node, subtype));
  return construction("ComplementEllipsisFragment", "ComplementEllipsis", children, {
    slots: cleanSlots([
      "complement_ellipsis_fragment",
      "fragment_answer",
      "reported_content",
      "content_clause",
      "predicate",
      "clause",
      ...children.flatMap((node) => nodeSlots(node)),
    ]),
    note: "Visible opinion content with a typed complement/domain omitted and recoverable only from discourse.",
    trace: traceInfo("generative_template", {
      construction_type: "ComplementEllipsisFragment",
      template_family: "generative_template",
      template: subtype === "existential_domain_ellipsis"
        ? ["existential_predicate!"]
        : nodes.length > 1
          ? ["subject?", "copular_predicate!"]
          : ["copular_predicate!"],
      assigned_slots: nodes.map((node, index) => {
        if (index === 0 && nodes.length > 1 && nodeCanFillSlot(node, "subject")) return "subject";
        return subtype === "existential_domain_ellipsis" ? "existential_predicate" : "copular_predicate";
      }),
      fragment_subtype: subtype,
      context_requirement_status: "context_required",
      missing_argument_slots: [missingSlot],
      missing_slot_details: [{ slot: missingSlot, license_status: "unresolved" }],
      antecedent_status: "not_observed",
      discourse_license_not_observed: true,
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "The overt predicate is structurally valid, but its selected complement/domain is absent and must remain linked to discourse rather than being invented.",
      not_claims: ["not_context_free_complete_clause", "not_fabricated_complement", "not_lexicalized_whole_sentence"],
    }),
  });
}

function nominalizedStativeComplementForOpinion(nodes) {
  if (!nodes || nodes.length !== 2) return null;
  const stative = nodes[0];
  const linker = nodes[1];
  if (!nodeCanFillSlot(stative, "stative_predicate") || !isToken(linker, "嘅")) return null;
  const nominalizer = parserInactiveTokenClone(linker, {
    label: "func",
    pos: "function",
    syntax: "nominalizer nominal_linker",
    slots: ["nominal_linker"],
    reason: "嘅 nominalizes the visible stative predicate inside a copular opinion complement; it is not treated as a sentence-final particle.",
  });
  const children = [stative, nominalizer];
  return construction("StativeNominalComplement", "AdjNP", children, {
    slots: cleanSlots([
      "stative_nominal_complement",
      "copular_complement",
      "np",
      "predicate",
      "stative_predicate",
      "nominal_linker",
      ...children.flatMap((node) => nodeSlots(node)),
    ]),
    note: "Headless nominalized stative complement such as 真嘅 in 係真嘅.",
    trace: traceInfo("generative_template", {
      construction_type: "StativeNominalComplement",
      template_family: "generative_template",
      template: ["stative_predicate!", "nominal_linker!"],
      assigned_slots: ["stative_predicate", "nominal_linker"],
      complement_subtype: "headless_nominalized_stative",
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "A visible stative predicate plus nominalizer forms the copular complement without inventing a silent noun head.",
      not_claims: ["not_overt_head_noun", "not_sentence_final_particle_use"],
    }),
  });
}

function opinionCopularContentNode(nodes) {
  if (!nodes || nodes.length < 2 || !isToken(nodes[0], "係")) return null;
  const complementNodes = nodes.slice(1);
  const complement = nominalizedStativeComplementForOpinion(complementNodes)
    || nominalComplementFromNodes(complementNodes)
    || categorySubspanFor(complementNodes, ["DegreeStativePredicate", "NegatedStativePredicate", "StativePredicate"]);
  if (!complement) return null;
  const copula = copulaClone(
    nodes[0],
    "copula subordinate_opinion_copula",
    ["copula"],
    "係 heads a visible copular proposition inside the opinion complement. Its understood proposition subject is licensed by the embedding stance frame, not fabricated as a token."
  );
  const children = [copula, complement];
  return construction("CopularRelationFrame", "Relation", children, {
    slots: cleanSlots([
      "copular_relation_frame",
      "copular_clause",
      "copula",
      "copular_complement",
      "reported_content",
      "content_clause",
      "predicate",
      "clause",
      ...children.flatMap((node) => nodeSlots(node)),
    ]),
    note: "Subordinate copular proposition used as visible opinion content.",
    trace: traceInfo("generative_template", {
      construction_type: "CopularRelationFrame",
      template_family: "generative_template",
      template: ["copula!", "copular_complement!"],
      assigned_slots: ["copula", "copular_complement"],
      subject_status: "null_licensed_by_opinion_content",
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      antecedent_status: "not_applicable",
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "Inside a stance complement, 係 plus a visible nominalized/stative complement forms a complete proposition without requiring an invented overt subject.",
      not_claims: ["not_standalone_context_free_subject_claim", "not_complement_ellipsis"],
    }),
  });
}

function contentNodeForOpinionStanceFrame(contentCore) {
  if (!contentCore.length) return null;
  const split = splitLeadingOpinionContentModifiers(contentCore);
  const leadingModifiers = split.modifiers;
  const core = split.core;
  if (!core.length) return null;
  if (core.length === 1 && core[0].kind === "construction" && core[0].type === "ClauseRelationEdge") {
    return { leadingModifiers, contentNode: core[0] };
  }

  // Typed ellipsis: 有/冇 omit an existential domain; 係/唔係 and subject+係
  // omit the selected copular complement. Keep the visible material transparent.
  if (core.length === 1 && ["有", "冇"].includes(flattenSurface(core[0]))) {
    return {
      leadingModifiers,
      contentNode: opinionComplementEllipsisFragment(core, "existential_domain_ellipsis", "existential_domain"),
    };
  }
  const finalSurface = flattenSurface(core[core.length - 1]);
  const copularEllipsis = ["係", "唔係"].includes(finalSurface)
    && (core.length === 1 || (core.length === 2 && nodeCanFillSlot(core[0], "subject")));
  if (copularEllipsis) {
    return {
      leadingModifiers,
      contentNode: opinionComplementEllipsisFragment(core, "copular_complement_ellipsis", "copular_complement"),
    };
  }

  const copularContent = opinionCopularContentNode(core);
  if (copularContent) return { leadingModifiers, contentNode: copularContent };

  const modalContent = modalVPFromNodes(core);
  if (modalContent) return { leadingModifiers, contentNode: modalContent };

  const stativeContent = categorySubspanFor(core, [
    "DegreeStativePredicate",
    "NegatedStativePredicate",
    "DegreeModifiedLexicalStative",
    "StativePredicate",
  ]);
  if (stativeContent) return { leadingModifiers, contentNode: stativeContent };

  const fullyWrappedContent = applyConstructionPatterns(core);
  if (
    fullyWrappedContent.length === 1 &&
    fullyWrappedContent[0].kind === "construction" &&
    [
      "ClauseSpan",
      "TopicComment",
      "CopularRelationFrame",
      "CopularIdentificationFrame",
      "ExistentialClause",
      "NegatedExistentialClause",
      "DesiderativeVP",
      "ModalVP",
      "CompletionQuestion",
      "ANotAQuestion",
      "PotentialResultVP",
      "PerfectiveVP",
      "PostverbalZoPerfectiveVP",
      "DirectionalMotionVP",
      "DegreeStativePredicate",
      "NegatedStativePredicate",
      "StativePredicate",
      "ComplementEllipsisFragment",
      "ClauseRelationEdge"
    ].includes(fullyWrappedContent[0].type)
  ) {
    return { leadingModifiers, contentNode: fullyWrappedContent[0] };
  }

  const wrappedContent = wrapCategorySubspans(core);
  const subjectStative = subjectStativePredicateClauseFallback(wrappedContent);
  if (subjectStative) return { leadingModifiers, contentNode: subjectStative };

  if (
    wrappedContent.length === 1 &&
    wrappedContent[0].kind === "construction" &&
    [
      "ClauseSpan",
      "TopicComment",
      "CopularRelationFrame",
      "CopularIdentificationFrame",
      "ExistentialClause",
      "NegatedExistentialClause",
      "DesiderativeVP",
      "ModalVP",
      "CompletionQuestion",
      "DegreeStativePredicate",
      "NegatedStativePredicate",
      "StativePredicate",
      "ComplementEllipsisFragment",
      "ClauseRelationEdge",
    ].includes(wrappedContent[0].type)
  ) {
    return { leadingModifiers, contentNode: wrappedContent[0] };
  }

  const generatedContent = templateConstructionFor(wrappedContent, [
    "ExistentialClause",
    "NegatedExistentialClause",
    "DesiderativeVP",
    "ModalVP",
    "CompletionQuestion",
  ]);
  if (generatedContent) return { leadingModifiers, contentNode: generatedContent };

  return null;
}

function opinionStanceFrameFallback(core) {
  const split = splitOpinionTrailingParticles(core);
  const bareCore = split.core;
  const particles = split.particles;
  if (bareCore.length < 3) return null;

  let cursor = 0;
  const subject = nodeCanFillSlot(bareCore[cursor], "subject") ? bareCore[cursor++] : null;
  const preStanceModifiers = [];
  while (cursor < bareCore.length && isOpinionFrameFocusModifier(bareCore[cursor])) {
    preStanceModifiers.push(bareCore[cursor]);
    cursor += 1;
  }

  const stancePredicate = bareCore[cursor];
  const stanceToken = firstToken(stancePredicate);
  if (!stanceToken || !nodeCanFillSlot(stancePredicate, "stance_predicate")) return null;
  const profile = predicateOmissionProfileForHead(stanceToken.surface);
  cursor += 1;
  if (cursor >= bareCore.length) return null;

  const rawStanceContent = bareCore.slice(cursor);
  const contentAnalysis = rawStanceContent.length === 1
    && rawStanceContent[0].kind === "construction"
    && rawStanceContent[0].type === "ClauseRelationEdge"
    ? { leadingModifiers: [], contentNode: rawStanceContent[0] }
    : contentNodeForOpinionStanceFrame(rawStanceContent);
  if (!contentAnalysis || !contentAnalysis.contentNode) return null;
  const contentNode = contentAnalysis.contentNode;
  const postStanceModifiers = contentAnalysis.leadingModifiers || [];

  const promotedStance = phase4OpinionStanceActiveTokenClone(stancePredicate, {
    label: stancePredicate.label || "doing",
    syntax: `${stanceToken.syntax || "cognition_opinion_predicate"} opinion_stance_predicate`,
    slots: ["opinion_stance_frame"],
    reason: "A1 broad stance architecture: a registered stance or belief predicate is parser-active when it licenses visible reviewed content.",
  });

  const children = [
    ...(subject ? [subject] : []),
    ...preStanceModifiers,
    promotedStance,
    ...postStanceModifiers,
    contentNode,
    ...particles,
  ];

  const assignedSlots = [
    ...(subject ? ["subject"] : []),
    ...preStanceModifiers.map(() => "focus_adverb"),
    "stance_predicate",
    ...postStanceModifiers.map(() => "focus_adverb"),
    "reported_content",
    ...particles.map(() => "particle"),
  ];
  const contentTrace = contentNode.trace || {};
  const contextRequirementStatus = contentTrace.context_requirement_status || "context_not_required";
  const missingArgumentSlots = Array.isArray(contentTrace.missing_argument_slots)
    ? contentTrace.missing_argument_slots.slice()
    : [];
  const missingSlotDetails = Array.isArray(contentTrace.missing_slot_details)
    ? contentTrace.missing_slot_details.map((item) => ({ ...item }))
    : missingArgumentSlots.map((slot) => ({ slot, license_status: "unresolved" }));

  return construction("OpinionStanceFrame", "Opinion/Stance", children, {
    note: "Opinion, evaluation, or belief frame with a visible transparent proposition or typed complement ellipsis.",
    slots: cleanSlots([
      ...templateDerivedSlots("OpinionStanceFrame", children),
      "opinion_stance_frame",
      "stance_predicate",
      "reported_content",
      "content_clause",
      "predicate",
      "clause",
    ]),
    trace: traceInfo("generative_template", {
      construction_type: "OpinionStanceFrame",
      template_family: "generative_template",
      template: ["subject?", "focus_adverb?", "stance_predicate!", "focus_adverb?", "reported_content!", "particle?"],
      constraints: {
        visible_reviewed_content: true,
        stance_predicate_surfaces: [stanceToken.surface],
        focus_modifier_slot: "focus_adverb",
      },
      assigned_slots: assignedSlots,
      content_construction: contentNode.type,
      pre_stance_modifier_surfaces: preStanceModifiers.map((node) => flattenSurface(node)),
      post_stance_modifier_surfaces: postStanceModifiers.map((node) => flattenSurface(node)),
      context_requirement_status: contextRequirementStatus,
      missing_argument_slots: missingArgumentSlots,
      missing_slot_details: missingSlotDetails,
      antecedent_status: contextRequirementStatus === "context_required" ? "not_observed" : "not_applicable",
      discourse_license_not_observed: contextRequirementStatus === "context_required",
      attached_particles: particles.map((node) => flattenSurface(node)),
      surfaces: children.map((node) => flattenSurface(node)),
      predicate_omission_profile: profile ? profile.id : "opinion_evaluation",
      reason: "The reusable stance frame is keyed by registered stance-predicate affordance, not one hard-coded surface. It wraps—but does not replace—the visible content construction.",
      not_claims: ["not_reported_speech", "not_action_stative_vp_overcapture", "not_fabricated_opinion_content"],
    }),
  });
}


  return { opinionSeemingFallback, opinionStanceFrameFallback };
};
