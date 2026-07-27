"use strict";

module.exports = function createCompletionExperientialQuestionDetectors(dependencies = {}) {
  const {
    construction, flattenSurface, hasConstruction, hasSurface, isParticle,
    isProductiveVo, isToken, nodeCanFillSlot, optionalSubjectOffset, traceInfo,
  } = dependencies;

function completionQuestionFallback(core) {
  const offset = optionalSubjectOffset(core);
  if (core.length - offset < 2) return null;
  const meiIndex = core.findIndex((node, index) => index >= offset && isToken(node, "未"));
  if (meiIndex <= offset) return null;
  const predicateNodes = core.slice(offset, meiIndex);
  if (!predicateNodes.length) return null;
  const hasCompletionLike = predicateNodes.some((node) => {
    if (!node) return false;
    if (node.kind === "construction" && (node.slots || []).some((slot) => ["completion_vp", "perfective_vp", "productive_vo", "vp"].includes(slot))) return true;
    return isToken(node, "完") || isToken(node, "咗") || isProductiveVo(node);
  });
  if (!hasCompletionLike) return null;
  return construction("CompletionQuestion", "CompletionQ", core, {
    note: "Completion/not-yet question with 完, 咗, or a bare reviewed VO followed by 未.",
    trace: traceInfo("generative_or_heuristic_slot_rule", {
      rule: "subject? + completed/perfective/productive VP + 未 + particle?",
      reason: "A1 completion-question heuristic covering 咗 and bare VO variants."
    })
  });
}


function experientialYesNoQuestionFallback(core) {
  if (!hasSurface(core, "有冇") || !hasConstruction(core, "ExperientialVP")) return null;
  return construction("ExperientialYesNoQuestion", "Exp?", core, {
    note: "Have-or-not experiential question, e.g. 有冇聽過.",
    trace: traceInfo("legacy_surface_rule", {
      rule: "has 有冇 and ExperientialVP",
      reason: "Fallback construction/surface rule.",
    }),
  });
}

function interestDomainExistentialQuestionFallback(core) {
  if (!hasSurface(core, "有冇興趣") && !(hasSurface(core, "有冇") && hasSurface(core, "興趣"))) return null;
  return construction("ExistentialQuestion", "Have?", core, {
    note: "Existential question over the abstract object/domain 興趣. Interest is metadata, not the active construction label.",
    slots: ["existential_question", "question_fragment", "possessive_question", "predicate", "object", "abstract_object"],
    trace: traceInfo("generative_template", {
      construction_type: "ExistentialQuestion",
      retired_label_alias: "InterestQuestion",
      existential_subtype: "abstract_object",
      abstract_object_domain: "interest",
      template: ["subject?", "existential_question_or_interest_frame!", "abstract_object?", "vp?", "particle?"],
      assigned_slots: core.map((node) => flattenSurface(node) === "有冇興趣" ? "interest_question_frame" : nodeCanFillSlot(node, "subject") ? "subject" : nodeCanFillSlot(node, "abstract_object") ? "abstract_object" : nodeCanFillSlot(node, "vp") ? "vp" : nodeCanFillSlot(node, "particle") ? "particle" : "existential_question"),
      surfaces: core.map((node) => flattenSurface(node)),
      reason: "Compatibility fallback for lexicalized 有冇興趣; active construction remains broad ExistentialQuestion.",
    }),
  });
}

function experientialQuestionBoundaryFallback(core) {
  const experientialIndex = core.findIndex((node) => nodeCanFillSlot(node, "experiential_vp"));
  const negativeExperientialIndex = core.findIndex((node, index) =>
    index < experientialIndex && ["未", "冇"].includes(flattenSurface(node))
  );
  if (experientialIndex >= 0 && negativeExperientialIndex >= 0) {
    const negatorSurface = flattenSurface(core[negativeExperientialIndex]);
    return construction("NegativeExperiential", "NegExp", core, {
      note: "Source-linked preverbal experiential negation: 未/冇 precedes a VP containing experiential 過.",
      trace: traceInfo("generative_template", {
        construction_type: "NegativeExperiential",
        template_family: "generative_template",
        template: ["subject?", "focus_adverb?", "negator!", "experiential_vp!", "topic_or_object?", "particle?"],
        constraints: { slot_surface_in: { negator: ["未", "冇"] }, marker_precedes_experiential_vp: true },
        assigned_slots: core.map((node, index) => index === negativeExperientialIndex ? "negator" : index === experientialIndex ? "experiential_vp" : nodeCanFillSlot(node, "subject") ? "subject" : nodeCanFillSlot(node, "topic_or_object") ? "topic_or_object" : "retained_material"),
        polarity_profile: negatorSurface === "未" ? "not_yet" : "aspectual_negative",
        surfaces: core.map((node) => flattenSurface(node)),
        reason: "Order-sensitive fallback preserves source-attested preverbal negation when an overt object is not fully grouped.",
      }),
    });
  }
  const finalMeiIndex = core.findIndex((node, index) => index > experientialIndex && flattenSurface(node) === "未");
  const finalMeiTailIsOnlyParticles = finalMeiIndex >= 0 && core.slice(finalMeiIndex + 1).every((node) => node.kind === "text" || isParticle(node));
  if (experientialIndex >= 0 && finalMeiIndex >= 0 && finalMeiTailIsOnlyParticles) {
    return construction("ExperientialQuestion", "Exp未", core, {
      note: "Source-linked final-未 experiential question: overt experiential VP followed by final 未 and optional particle.",
      trace: traceInfo("generative_template", {
        construction_type: "ExperientialQuestion",
        template_family: "generative_template",
        template: ["subject?", "experiential_vp!", "topic_or_object?", "question_marker!", "particle?"],
        constraints: { final_mei_after_experiential_material: true },
        surfaces: core.map((node) => flattenSurface(node)),
        reason: "The final 未 profile is distinct from preverbal 未 negative experiential statements and 有冇 experiential questions.",
      }),
    });
  }
  return null;
}

function completionQuestionWithPerfectiveMarkerFallback(core) {
  const meiIndex = core.findIndex((node) => isToken(node, "未"));
  if (meiIndex <= 0 || !core.some((node) => isToken(node, "完"))) return null;
  return construction("CompletionQuestion", "CompletionQ", core, {
    note: "Completion / not-yet question.",
    trace: traceInfo("generative_or_heuristic_slot_rule", {
      rule: "verb + 完 + object? + 未",
      reason: "Structural completion-question heuristic.",
    }),
  });
}

  return {
    completionQuestionFallback,
    completionQuestionWithPerfectiveMarkerFallback,
    experientialQuestionBoundaryFallback,
    experientialYesNoQuestionFallback,
    interestDomainExistentialQuestionFallback,
  };
};
