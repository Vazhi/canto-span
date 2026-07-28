"use strict";

module.exports = function createBoundaryFragmentDetectors(dependencies = {}) {
  const {
    cleanSlots,
    construction,
    firstToken,
    flattenSurface,
    isToken,
    nodeCanFillSlot,
    nodeSurfaceMatches,
    parserInactiveTokenClone,
    templateDerivedSlots,
    traceInfo,
    withoutTrailingParticles,
  } = dependencies;

  function possessiveFragmentAnswerCandidate(core) {
    if (!core || core.length !== 2) return null;
    const possessor = core[0];
    const linker = core[1];
    if (!nodeSurfaceMatches(linker, ["嘅"])) return null;
    if (!nodeCanFillSlot(possessor, "subject") && !nodeCanFillSlot(possessor, "np") && !nodeCanFillSlot(possessor, "topic")) return null;
    if (!nodeCanFillSlot(linker, "nominal_linker") && !nodeCanFillSlot(linker, "particle")) return null;
    return construction("FragmentAnswer", "fragment answer", core, {
      slots: ["fragment_answer", "possessive_fragment", "answer_fragment", "np", "subject", "nominal_linker"],
      note: "Possessive answer fragment: possessor + 嘅 is valid as a short answer whose head noun comes from context.",
      trace: traceInfo("special_ambiguity_rule", {
        construction_type: "FragmentAnswer",
        fragment_subtype: "possessive_answer",
        template: ["possessor!", "nominal_linker!"],
        assigned_slots: ["possessor", "nominal_linker"],
        surfaces: core.map((node) => flattenSurface(node)),
        reason: "Treat possessor + 嘅 as a context-dependent answer fragment, not a full clean NominalHeadSpan.",
        context_requirement_status: "context_required",
        missing_argument_slots: ["nominal_head"],
        missing_slot_details: [{ slot: "nominal_head", license_status: "unresolved" }],
        antecedent_status: "not_observed",
        discourse_license_not_observed: true,
        antecedent_required: true,
        overt_head: "嘅",
        omission_analysis_candidates: ["nominal_head_ellipsis"],
        semantic_review_flags: ["fragment_answer_parse", "context_dependent_possessive_fragment"],
        not_claims: ["not_full_np_without_context", "not_silent_head_noun_insertion"]
      })
    });
  }

  function fragmentQuestionFallback(core) {
    const { core: bareCore, particles } = withoutTrailingParticles(core);
    if (!bareCore.length || bareCore.length > 2) return null;
    const marker = bareCore[bareCore.length - 1];
    if (!isToken(marker, "呢")) return null;
    const topic = bareCore.length === 2 ? bareCore[0] : null;
    if (topic && !nodeCanFillSlot(topic, "subject") && !nodeCanFillSlot(topic, "topic") && !nodeCanFillSlot(topic, "np")) return null;
    const markerChild = parserInactiveTokenClone(marker, {
      label: "func", pos: "function", syntax: "discourse_fragment_question",
      jyutping: "ne1",
      note: "what about…? / and…?",
      slots: ["question_fragment", "discourse_fragment"],
      reason: "Standalone 呢 is interpreted as a context-dependent 'what about...?' fragment question, not as a demonstrative determiner.",
    });
    const topicChildren = topic ? [parserInactiveTokenClone(topic, {
      label: (firstToken(topic) && firstToken(topic).label) || "who",
      pos: "np",
      syntax: "topic_return_fragment",
      slots: ["topic", "np"],
      reason: "The overt NP/pronoun is the visible topic returned to the prior discourse question.",
    })] : [];
    const children = [...topicChildren, markerChild, ...particles];
    return construction("FragmentQuestion", "FragmentQ", children, {
      note: "Context-dependent fragment question headed by standalone 呢.",
      slots: cleanSlots(["fragment_question", "question_fragment", "discourse_fragment", "clause", ...templateDerivedSlots("FragmentQuestion", children)]),
      trace: traceInfo("special_ambiguity_rule", {
        construction_type: "FragmentQuestion", template_family: "generative_template",
        template: ["topic_return?", "fragment_question_marker!", "particle?"], assigned_slots: [...topicChildren.map(() => "topic_return"), "fragment_question_marker", ...particles.map(() => "particle")],
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Standalone 呢 conventionally asks for a context-supplied topic or alternative.",
        context_requirement_status: "context_required",
        missing_argument_slots: [topic ? "contrast_set_or_predicate" : "topic_or_alternative"],
        missing_slot_details: [{ slot: topic ? "contrast_set_or_predicate" : "topic_or_alternative", license_status: "unresolved" }],
        antecedent_status: "not_observed",
        discourse_license_not_observed: true,
        antecedent_required: true,
        topic_return: true,
        topic_return_surface: topic ? flattenSurface(topic) : "",
        omission_analysis_candidates: ["fragment_question", "topic_return_ellipsis"],
        semantic_review_flags: ["needs_context_parse", "fragment_question_context_required"],
        not_claims: ["not_complete_polar_question", "not_demonstrative_np"],
      }),
    });
  }

  return {
    possessiveFragmentAnswerCandidate,
    fragmentQuestionFallback,
  };
};
