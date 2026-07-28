"use strict";

module.exports = function createTerminalDiscourseParticles(dependencies = {}) {
  const {
    applyConstructionPatterns, cleanSlots, construction, flattenSurface, fullSpanSingleConstruction,
    hasSurface, isToken, nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots, traceInfo,
    withoutIgnorableSpaceText,
  } = dependencies;

function isQuestionLikeScopeHost(node) {
  if (!node || node.kind !== "construction") return false;
  if (/Question$/.test(String(node.type || ""))) return true;
  return [
    "question_fragment",
    "question_marker",
    "yes_no_question_marker",
    "wh_object",
    "wh_determiner",
    "identity_question",
    "location_question",
    "time_question",
  ].some((slot) => nodeCanFillSlot(node, slot));
}

function propositionLikeHostForScopedDiscourseParticle(nodes) {
  if (!nodes || !nodes.length) return null;
  const wrapped = applyConstructionPatterns(nodes);
  const host = fullSpanSingleConstruction(wrapped, nodes);
  if (!host) return null;
  if ([
    "NeedsContext",
    "MalformedCandidate",
    "FragmentQuestion",
    "FragmentAnswer",
    "ComplementEllipsisFragment",
    "NominalHeadSpan",
    "FormulaDiscourseUnit",
    "ClauseSequence",
    "ClauseRelationGraph",
  ].includes(host.type)) return null;
  if (isQuestionLikeScopeHost(host)) return null;
  const trace = host.trace || {};
  if (["context_required", "context_incompatible"].includes(trace.context_requirement_status)) return null;
  if (!nodeCanFillSlot(host, "predicate")
      && !nodeCanFillSlot(host, "clause")
      && !nodeCanFillSlot(host, "vp")
      && !nodeCanFillSlot(host, "modal_vp")) return null;
  return host;
}

function epistemicScopeParticleClone(node) {
  return parserInactiveTokenClone(node, {
    label: "particle",
    pos: "particle",
    syntax: "sentence_final_particle epistemic_uncertainty_particle",
    slots: ["particle", "epistemic_scope_particle", "discourse_scope_particle"],
    jyutping: "gwaa3",
    note: "probably / perhaps; marks uncertainty or probability over the preceding proposition",
    reason: "Final 啩 scopes epistemic uncertainty over a complete proposition-like host and does not supply a missing proposition.",
  });
}

function scopedEpistemicDiscourseParticleFallback(segment, terminalText = "") {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 2) return null;
  const finalNode = compact[compact.length - 1];
  if (!nodeCanFillSlot(finalNode, "epistemic_scope_particle")) return null;
  const host = propositionLikeHostForScopedDiscourseParticle(compact.slice(0, -1));
  if (!host) return null;
  const particle = epistemicScopeParticleClone(finalNode);
  const children = [host, particle];
  return construction("DiscourseParticleFrame", "Uncertain", children, {
    note: "Proposition-like host plus a sentence-final discourse particle carrying epistemic uncertainty or probability.",
    slots: templateDerivedSlots("DiscourseParticleFrame", children),
    trace: traceInfo("generative_template", {
      construction_type: "DiscourseParticleFrame",
      template_family: "generative_template",
      template: ["proposition_host!", "epistemic_scope_particle!"],
      assigned_slots: ["proposition_host", "epistemic_scope_particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      discourse_particle_family: "epistemic_stance",
      particle_subtype: "uncertainty_probability_gwaa3",
      epistemic_scope: "uncertainty_or_probability",
      proposition_host_construction: host.type,
      proposition_host_surface: flattenSurface(host),
      punctuation_hint: /[？?]/u.test(String(terminalText || "")) ? "question_marked" : "declarative_or_unmarked",
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      antecedent_status: "not_applicable",
      not_claims: [
        "not_fragment_licensor",
        "not_noun_host",
        "not_question_host",
        "not_fabricated_proposition",
        "not_tone_specific_beyond_gwaa3",
      ],
      reason: "A complete non-question proposition-like host licenses final 啩 as an epistemic uncertainty/probability particle. Bare particles, noun hosts, unresolved hosts, and question hosts remain outside this wrapper.",
    }),
  });
}

function evidentialScopeParticleClone(node) {
  return parserInactiveTokenClone(node, {
    label: "particle",
    pos: "particle",
    syntax: "sentence_final_particle evidential_noteworthiness_particle",
    slots: ["particle", "evidential_scope_particle", "discourse_scope_particle"],
    jyutping: "wo3",
    note: "reported / noteworthy / reminder stance; exact subtype depends on tone and context",
    reason: "Final 喎 scopes broad evidential/noteworthiness stance over a complete proposition-like host. Written form alone does not select an exact tone-specific subtype.",
  });
}

function scopedEvidentialDiscourseParticleFallback(segment, terminalText = "") {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 2 || !isToken(compact[compact.length - 1], "喎")) return null;
  const host = propositionLikeHostForScopedDiscourseParticle(compact.slice(0, -1));
  if (!host) return null;
  const particle = evidentialScopeParticleClone(compact[compact.length - 1]);
  const children = [host, particle];
  return construction("DiscourseParticleFrame", "Notice", children, {
    note: "Proposition-like host plus a sentence-final discourse particle carrying broad evidential or noteworthiness stance.",
    slots: templateDerivedSlots("DiscourseParticleFrame", children),
    trace: traceInfo("generative_template", {
      construction_type: "DiscourseParticleFrame",
      template_family: "generative_template",
      template: ["proposition_host!", "evidential_scope_particle!"],
      assigned_slots: ["proposition_host", "evidential_scope_particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      discourse_particle_family: "evidential_noteworthiness",
      broad_particle_class: "EvidentialDiscourseParticle",
      particle_subtype: "written_wo_family_underdetermined",
      evidential_subtype: "not_selected_without_tone_or_context",
      evidential_scope: "reportative_noteworthiness_reminder_or_counterexpectation",
      tone_source: "canonical_written_form_reading_only",
      tone_certainty: "underdetermined_from_character_alone",
      proposition_host_construction: host.type,
      proposition_host_surface: flattenSurface(host),
      punctuation_hint: /[？?]/u.test(String(terminalText || "")) ? "question_marked_surface_without_tone_inference" : "declarative_or_unmarked",
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      antecedent_status: "not_applicable",
      not_claims: [
        "not_fragment_licensor",
        "not_noun_host",
        "not_question_host",
        "not_fabricated_proposition",
        "not_exact_tone_inference",
        "not_exact_evidential_subtype",
      ],
      reason: "A complete non-question proposition-like host licenses final 喎 as a broad evidential/noteworthiness discourse particle. The written character and canonical wo3 display reading do not justify selecting a narrower tone-specific function.",
    }),
  });
}

function protectedFullSpanFormulaForParticleFallback(ordinaryWrapped, sourceNodes) {
  const top = fullSpanSingleConstruction(ordinaryWrapped, sourceNodes);
  return !!(top && top.type === "FormulaDiscourseUnit");
}

function directiveLikeHostForFinalLaa1(nodes) {
  if (!nodes || !nodes.length) return null;
  const wrapped = applyConstructionPatterns(nodes);
  const host = fullSpanSingleConstruction(wrapped, nodes);
  if (!host) return standaloneWalkHostForFinalLaaParticle(nodes);
  if (![
    "LexicalGiveRelation",
    "PostThemeParticipantRelation",
    "SubjectPredicateClause",
    "DirectionalMotionVP",
    "MotionGoalVP",
    "ProhibitiveImperative",
    "PriorityMarkerClause",
    "SerialVerbPurposeChain",
    "MotionPurposeChain",
  ].includes(host.type)) return null;
  if (isQuestionLikeScopeHost(host)) return null;
  const trace = host.trace || {};
  if (["context_required", "context_incompatible"].includes(trace.context_requirement_status)) return null;
  return host;
}

function standaloneWalkMotionVp(node, reason = "") {
  if (!isToken(node, "走")) return null;
  const movement = parserInactiveTokenClone(node, {
    label: "doing",
    pos: "verb",
    syntax: "intransitive_motion_verb transition_motion_predicate",
    slots: ["action_verb", "main_verb", "movement_verb", "predicate"],
    jyutping: "zau2",
    note: "leave / go away",
    reason: reason || "Standalone 走 is the independent movement predicate 'leave/go away', not a postverbal result complement.",
    active_affordance_match: "standalone_motion_predicate",
  });
  return construction("DirectionalMotionVP", "MotionVP", [movement], {
    slots: ["directional_motion_vp", "vp", "action_vp", "predicate", "movement_verb", "motion_predicate"],
    note: "One-word transition motion predicate headed by standalone 走.",
    trace: traceInfo("generative_template", {
      construction_type: "DirectionalMotionVP",
      template_family: "generative_template",
      template: ["transition_motion_verb!"],
      assigned_slots: ["transition_motion_verb"],
      surfaces: ["走"],
      contextual_role_resolution: "standalone_motion_predicate_not_result_complement",
      subspan: true,
      reason: reason || "Standalone 走 is an independent motion predicate announcing departure.",
    }),
  });
}

function locativeFragmentFromWrappedPlacePhrase(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length !== 1) return null;
  const only = compact[0];
  let phrase = null;
  if (only && only.kind === "construction" && only.type === "LocativePlacePhrase") {
    phrase = only;
  } else if (
    only
    && only.kind === "construction"
    && only.type === "NominalHeadSpan"
    && Array.isArray(only.children)
    && only.children.length === 1
    && only.children[0].kind === "construction"
    && only.children[0].type === "LocativePlacePhrase"
  ) {
    phrase = only.children[0];
  }
  if (!phrase) return null;
  if (hasSurface([phrase], "邊度") || nodeCanFillSlot(phrase, "location_question")) return null;
  const phraseChildren = withoutIgnorableSpaceText(phrase.children || []);
  if (!phraseChildren.length || !isToken(phraseChildren[0], "喺")) return null;
  return construction("LocativeFragment", "Location", [phrase], {
    slots: cleanSlots(["locative_fragment", "location", "clause"]),
    note: "Locative fragment: 喺 + overt place, with the located figure understood from discourse.",
    trace: traceInfo("generative_template", {
      construction_type: "LocativeFragment",
      template_family: "generative_template",
      template: ["locative_place_phrase!"],
      assigned_slots: ["locative_place_phrase"],
      surfaces: [flattenSurface(phrase)],
      fragment_subtype: "locative_answer_or_predicate_fragment",
      omitted_element_description: "located figure or subject understood from discourse",
      reason: "The location is overt; only the person or thing located there is understood from context.",
      not_claims: ["not_missing_location", "not_full_subject_predicate_clause"],
    }),
  });
}

function completionThenStandaloneWalkResolution(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  const completionIndex = compact.findIndex((node) => node && node.kind === "construction" && node.type === "CompletionVP");
  if (completionIndex < 0 || completionIndex > 1) return nodes;
  if (completionIndex === 1 && !nodeCanFillSlot(compact[0], "subject")) return nodes;
  if (!isToken(compact[completionIndex + 1], "就") || !isToken(compact[completionIndex + 2], "走")) return nodes;
  const trailing = compact.slice(completionIndex + 3);
  if (trailing.length > 1 || (trailing.length === 1 && !nodeCanFillSlot(trailing[0], "particle"))) return nodes;
  const target = compact[completionIndex + 2];
  const motion = standaloneWalkMotionVp(
    target,
    "After a completed VP plus 就, standalone 走 is the follow-up movement predicate 'leave/go away'; it is not the result complement of the earlier verb."
  );
  if (!motion) return nodes;
  return (nodes || []).map((node) => node === target ? motion : node);
}

function standaloneWalkHostForFinalLaaParticle(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length !== 2 || !nodeCanFillSlot(compact[0], "subject") || !isToken(compact[1], "走")) return null;
  const subject = compact[0];
  const motion = standaloneWalkMotionVp(
    compact[1],
    "Standalone 走 after an overt subject is the movement predicate 'leave/go away'; the final discourse particle contributes scope separately and does not determine the verb's category."
  );
  const children = [subject, motion];
  return construction("SubjectPredicateClause", "SubjPred", children, {
    slots: templateDerivedSlots("SubjectPredicateClause", children),
    note: "Subject plus an independent transition-motion predicate.",
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!"],
      assigned_slots: ["subject", "predicate"],
      surfaces: children.map((node) => flattenSurface(node)),
      predicate_subtype: "transition_motion",
      reason: "The subject and standalone movement predicate form a proposition host before final 啦 or 喇 adds its own discourse scope.",
    }),
  });
}

function changeStateHostForFinalLaa3(nodes) {
  const ordinary = propositionLikeHostForScopedDiscourseParticle(nodes);
  if (ordinary && ![
    "LexicalGiveRelation",
    "PostThemeParticipantRelation",
    "CoverbFrame",
    "FormulaDiscourseUnit",
    "AcceptabilityClause",
  ].includes(ordinary.type)) return ordinary;
  return standaloneWalkHostForFinalLaaParticle(nodes);
}

function directiveScopeParticleClone(node) {
  return parserInactiveTokenClone(node, {
    label: "particle",
    pos: "particle",
    syntax: "sentence_final_particle directive_closure_particle",
    slots: ["particle", "directive_scope_particle", "discourse_scope_particle"],
    jyutping: "laa1",
    note: "directive / suggestion / invitation / interpersonal closure",
    reason: "Final 啦 laa1 scopes directive, suggestion, invitation, or interpersonal closure over a licensed host and does not repair incomplete argument structure.",
  });
}

function scopedDirectiveClosureParticleFallback(segment, terminalText = "", ordinaryWrapped = null) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 2 || !isToken(compact[compact.length - 1], "啦")) return null;
  if (fullSpanSingleConstruction(ordinaryWrapped, compact)) return null;
  const host = directiveLikeHostForFinalLaa1(compact.slice(0, -1));
  if (!host) return null;
  const particle = directiveScopeParticleClone(compact[compact.length - 1]);
  const children = [host, particle];
  return construction("DiscourseParticleFrame", "Prompt", children, {
    note: "Licensed directive-like host plus final 啦 laa1 carrying directive/interpersonal closure scope.",
    slots: templateDerivedSlots("DiscourseParticleFrame", children),
    trace: traceInfo("generative_template", {
      construction_type: "DiscourseParticleFrame",
      template_family: "generative_template",
      template: ["directive_host!", "directive_scope_particle!"],
      assigned_slots: ["directive_host", "directive_scope_particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      discourse_particle_family: "directive_interpersonal_closure",
      broad_particle_class: "DirectiveClosureParticle",
      particle_subtype: "directive_suggestion_invitation_or_closure_laa1",
      tone_source: "canonical_written_form_reading",
      tone_certainty: "canonical_for_written_laa_character_but_real_spelling_varies",
      orthographic_uncertainty: "啦_and_喇_may_be_spelled_inconsistently_in_ordinary_writing",
      scope_host_construction: host.type,
      scope_host_surface: flattenSurface(host),
      punctuation_hint: /[？?]/u.test(String(terminalText || "")) ? "question_marked_surface" : "declarative_or_unmarked",
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      antecedent_status: "not_applicable",
      not_claims: ["not_fragment_licensor", "not_noun_host", "not_unresolved_host", "not_change_state_laa3", "not_exact_illocution_beyond_broad_family"],
      reason: "A licensed directive/clause host permits final 啦 as broad directive, suggestion, invitation, or interpersonal closure. Bare particles, nouns, and unresolved predicates remain outside the wrapper.",
    }),
  });
}

function changeStateScopeParticleClone(node) {
  return parserInactiveTokenClone(node, {
    label: "particle",
    pos: "particle",
    syntax: "sentence_final_particle change_state_current_relevance_particle",
    slots: ["particle", "change_state_scope_particle", "discourse_scope_particle"],
    jyutping: "laa3",
    note: "changed situation / current relevance / transition",
    reason: "Final 喇 laa3 scopes change of situation, current relevance, or transition over a proposition-like host and remains distinct from VP-internal perfective 咗.",
  });
}

function scopedChangeStateParticleFallback(segment, terminalText = "", ordinaryWrapped = null) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 2 || !isToken(compact[compact.length - 1], "喇")) return null;
  if (fullSpanSingleConstruction(ordinaryWrapped, compact)) return null;
  const host = changeStateHostForFinalLaa3(compact.slice(0, -1));
  if (!host) return null;
  const particle = changeStateScopeParticleClone(compact[compact.length - 1]);
  const children = [host, particle];
  return construction("DiscourseParticleFrame", "Change", children, {
    note: "Proposition-like host plus final 喇 laa3 carrying change-of-situation/current-relevance scope.",
    slots: templateDerivedSlots("DiscourseParticleFrame", children),
    trace: traceInfo("generative_template", {
      construction_type: "DiscourseParticleFrame",
      template_family: "generative_template",
      template: ["proposition_host!", "change_state_scope_particle!"],
      assigned_slots: ["proposition_host", "change_state_scope_particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      discourse_particle_family: "change_state_current_relevance",
      broad_particle_class: "ChangeStateDiscourseParticle",
      particle_subtype: "change_of_situation_current_relevance_laa3",
      aspect_relation: "sentence_final_particle_distinct_from_vp_internal_perfective_zo2",
      tone_source: "canonical_written_form_reading",
      tone_certainty: "canonical_for_written_laa_character_but_real_spelling_varies",
      orthographic_uncertainty: "啦_and_喇_may_be_spelled_inconsistently_in_ordinary_writing",
      proposition_host_construction: host.type,
      proposition_host_surface: flattenSurface(host),
      punctuation_hint: /[？?]/u.test(String(terminalText || "")) ? "question_marked_surface" : "declarative_or_unmarked",
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      antecedent_status: "not_applicable",
      not_claims: ["not_fragment_licensor", "not_noun_host", "not_unresolved_host", "not_directive_laa1", "not_perfective_aspect_marker"],
      reason: "A complete proposition-like host permits final 喇 as change-of-situation/current-relevance stance. It remains a separate discourse layer above any visible 咗 perfective event.",
    }),
  });
}

  return {
    completionThenStandaloneWalkResolution,
    propositionLikeHostForScopedDiscourseParticle,
    scopedChangeStateParticleFallback,
    scopedDirectiveClosureParticleFallback,
    scopedEpistemicDiscourseParticleFallback,
    scopedEvidentialDiscourseParticleFallback,
  };
};
