"use strict";

module.exports = function createCompletionExperientialQuestionDetectors(dependencies = {}) {
  const {
    construction, firstToken, flattenSurface, hasConstruction, hasSurface, isParticle,
    isProductiveVo, isToken, nodeCanFillSlot, optionalSubjectOffset, traceInfo,
  } = dependencies;

function objectlessExperientialFinalMeiNeedsContext(core) {
  const offset = optionalSubjectOffset(core);
  const experientialIndex = core.findIndex((node, index) => index >= offset && nodeCanFillSlot(node, "experiential_vp"));
  if (experientialIndex !== offset) return null;
  const meiIndex = core.findIndex((node, index) => index > experientialIndex && isToken(node, "未"));
  if (meiIndex !== experientialIndex + 1) return null;
  if (!core.slice(meiIndex + 1).every((node) => node.kind === "text" || isParticle(node))) return null;
  const experiential = core[experientialIndex];
  if (["object", "goal", "location"].some((slot) => nodeCanFillSlot(experiential, slot))) return null;
  const head = firstToken(experiential);
  if (!head || !nodeCanFillSlot(head, "action_verb")) return null;
  return construction("NeedsContext", "needs context", core, {
    slots: ["needs_context", "review_candidate", "problem_span"],
    note: "Objectless V過未 is not accepted as AA61 without an explicit compatible discourse antecedent.",
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "NeedsContext",
      candidate_construction_type: "ExperientialQuestion",
      candidate_profile: "objectless_experiential_final_mei",
      context_requirement_status: "context_required",
      missing_argument_slots: ["object_or_experiential_domain"],
      antecedent_status: "not_observed",
      discourse_license_not_observed: true,
      event_head_surface: flattenSurface(head),
      question_marker_surface: "未",
      source_backed_contextual_short_head_surfaces: ["食"],
      hidden_object_insertion: false,
      reason: "The overt V過 + final 未 sequence is structurally compatible with AA61, but the reviewed objectless short profile is discourse-dependent. Only separately licensed context may resolve it.",
      not_claims: ["not_context_free_aa61", "not_fabricated_object", "not_generalized_object_omission"],
    }),
  });
}

function completionQuestionFallback(core) {
  const objectlessExperiential = objectlessExperientialFinalMeiNeedsContext(core);
  if (objectlessExperiential) return objectlessExperiential;
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
  const finalMeiIndex = core.findIndex((node, index) => index > experientialIndex && isToken(node, "未"));
  const finalMeiTailIsOnlyParticles = finalMeiIndex >= 0 && core.slice(finalMeiIndex + 1).every((node) => node.kind === "text" || isParticle(node));
  const prefix = experientialIndex >= 0 ? core.slice(0, experientialIndex) : [];
  const prefixIsOnlyOptionalSubject = prefix.length === 0 || (prefix.length === 1 && nodeCanFillSlot(prefix[0], "subject"));
  const intervening = experientialIndex >= 0 && finalMeiIndex >= 0 ? core.slice(experientialIndex + 1, finalMeiIndex) : [];
  const interveningIsTypedDomain = intervening.every((node) => ["object", "goal", "location"].some((slot) => nodeCanFillSlot(node, slot)));
  const experientialCarriesTypedDomain = experientialIndex >= 0 && ["object", "goal", "location"].some((slot) => nodeCanFillSlot(core[experientialIndex], slot));
  const hasOvertTypedDomain = experientialCarriesTypedDomain || intervening.length > 0;
  if (experientialIndex >= 0 && finalMeiIndex >= 0 && finalMeiTailIsOnlyParticles
      && prefixIsOnlyOptionalSubject && interveningIsTypedDomain && hasOvertTypedDomain) {
    const assignedSlots = core.map((node, index) => {
      if (index < experientialIndex) return "subject";
      if (index === experientialIndex) return "experiential_vp";
      if (index > experientialIndex && index < finalMeiIndex) return "topic_or_object";
      if (index === finalMeiIndex) return "question_marker";
      return isParticle(node) ? "particle" : "retained_terminal_text";
    });
    return construction("ExperientialQuestion", "Exp未", core, {
      note: "Source-linked final-未 experiential question with typed overt experiential domain and controlled final-particle tail.",
      trace: traceInfo("construction_template", {
        construction_type: "ExperientialQuestion",
        template_family: "construction_template",
        template: ["subject?", "experiential_vp!", "topic_or_object?", "question_marker!", "particle?"],
        constraints: {
          slot_surface_in: { question_marker: ["未"] },
          typed_experiential_domain_required: true,
          unrelated_intervening_material_disallowed: true,
        },
        assigned_slots: assignedSlots,
        surfaces: core.map((node) => flattenSurface(node)),
        reason: "AA61 requires a typed experiential child plus overt typed domain material and final 未; unrelated interveners and context-free object omission remain outside this matcher.",
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
