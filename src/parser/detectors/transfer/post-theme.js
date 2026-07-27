"use strict";

module.exports = function createPostThemeDetectors(dependencies = {}) {
  const {
    bridgeFramePartClone,
    cleanSlots,
    construction,
    cp020NodeIsPredicateEvidence,
    cp021bArgumentSpan,
    cp021bIsBei2Marker,
    cp021bSpanIsPersonNP,
    cp021bSpanIsThingNP,
    firstToken,
    flattenSurface,
    isToken,
    traceInfo,
    withoutIgnorableSpaceText,
    withoutTrailingParticles,
  } = dependencies;

const CP021B_POST_THEME_PREDICATE_PROFILES = Object.freeze({
  "借": {
    profile: "predicate_profile_borrow_lend",
    candidates: ["goal_or_lend_to_candidate"],
    final_predicate_required: false,
  },
  "交": {
    profile: "predicate_profile_transfer",
    candidates: ["goal_or_recipient_candidate"],
    final_predicate_required: false,
  },
  "織": {
    profile: "predicate_profile_creation",
    candidates: ["beneficiary_or_intended_user_candidate"],
    final_predicate_required: false,
  },
  "買": {
    profile: "predicate_profile_acquisition",
    candidates: ["beneficiary_or_intended_recipient_candidate"],
    final_predicate_required: false,
  },
  "攞": {
    profile: "predicate_profile_final_predicate",
    candidates: ["final_predicate_participant_or_beneficiary_candidate"],
    final_predicate_required: true,
  },
});

function cp021bMakePostThemeRelation(fields) {
  const marker = bridgeFramePartClone(fields.marker, {
    label: "func",
    pos: "function",
    syntax: "post_theme_link_marker",
    slots: ["post_theme_link_marker"],
    reason: "畀/俾 links an overt upstream predicate-theme VP to a following person; no fixed marker category or participant role is selected.",
  });
  const participant = cp021bArgumentSpan(fields.participantNodes, {
    parent_type: "PostThemeParticipantRelation",
    label: "who",
    role: "post_theme_participant",
    slots: ["post_theme_participant", "person_np", "np"],
    reason: "The overt post-theme person remains structurally visible; recipient, goal, beneficiary, agent, and source are candidate readings only, never asserted slots.",
  });
  const following = fields.followingPredicate ? bridgeFramePartClone(fields.followingPredicate, {
    label: "doing",
    pos: "verb",
    syntax: `${(firstToken(fields.followingPredicate) || fields.followingPredicate).syntax || "verb"} following_predicate`,
    slots: ["following_predicate", "action_verb", "predicate"],
    reason: "The overt final predicate remains visible; no hidden shared participant is inserted.",
  }) : null;
  const children = [fields.upstreamVP, marker, participant, following].filter(Boolean);
  return construction("PostThemeParticipantRelation", "For / to", children, {
    note: "Links the preceding action and thing to a following person. The exact link depends on the verb and context.",
    slots: cleanSlots([
      "post_theme_participant_relation", "post_theme_link_marker", "post_theme_participant", "person_np", "np", "predicate", "vp", "action_vp",
      ...(following ? ["following_predicate"] : []),
    ]),
    trace: traceInfo("generative_template", {
      construction_type: "PostThemeParticipantRelation",
      template_family: "construction_template",
      cp021b_design_family: "frozen_post_theme_participant",
      template: ["upstream_predicate_theme_vp!", "post_theme_link_marker!", "post_theme_participant!", "following_predicate?"],
      assigned_slots: ["upstream_vp", "post_theme_link_marker", "post_theme_participant", ...(following ? ["following_predicate"] : [])],
      relation_profile: "theory_neutral_post_theme_participant",
      upstream_predicate_surface: fields.upstreamPredicateSurface,
      upstream_theme_surface: fields.upstreamThemeSurface,
      marker_surface: flattenSurface(fields.marker),
      postmarker_participant_surface: fields.participantNodes.map(flattenSurface).join(""),
      following_predicate_surface: following ? flattenSurface(fields.followingPredicate) : "",
      participant_role_candidates: fields.profile.candidates,
      participant_role_status: "unresolved_or_context_dependent",
      marker_category_status: "not_selected",
      upstream_predicate_profile: fields.profile.profile,
      orthographic_parity: "畀=俾",
      hidden_participants_inserted: false,
      semantic_review_flags: ["post_theme_participant_role_context_dependent"],
      learner_gloss_lines: ["for / to", "Links the preceding action and thing to a following person. The exact link depends on the verb and context."],
      not_claims: ["not_lexical_give", "not_passive_or_permissive", "not_unified_recipient_or_beneficiary", "not_fixed_marker_category", "not_supported_productive"],
      surfaces: children.map(flattenSurface),
      reason: "This bounded CP021B relation preserves the overt predicate, theme, marker, person, and optional final predicate while leaving the exact participant role and marker category unresolved.",
    }),
  });
}

function postThemeParticipantRelationFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (particles.length) return null;
  const compact = withoutIgnorableSpaceText(bareCore);
  const markerIndexes = compact
    .map((node, index) => cp021bIsBei2Marker(node) ? index : -1)
    .filter((index) => index >= 0);
  if (markerIndexes.length !== 1) return null;
  const markerIndex = markerIndexes[0];
  if (markerIndex < 2 || markerIndex >= compact.length - 1) return null;

  const profileCandidates = [];
  for (let predicateIndex = 0; predicateIndex < markerIndex; predicateIndex += 1) {
    const predicateSurface = flattenSurface(compact[predicateIndex]);
    const profile = CP021B_POST_THEME_PREDICATE_PROFILES[predicateSurface];
    if (!profile) continue;
    const subjectNodes = compact.slice(0, predicateIndex);
    if (subjectNodes.length && !cp021bSpanIsPersonNP(subjectNodes)) continue;
    let themeStart = predicateIndex + 1;
    let aspect = null;
    if (isToken(compact[themeStart], "咗")) {
      aspect = compact[themeStart];
      themeStart += 1;
    }
    const themeNodes = compact.slice(themeStart, markerIndex);
    if (!cp021bSpanIsThingNP(themeNodes)) continue;
    profileCandidates.push({ predicateIndex, predicateSurface, profile, subjectNodes, aspect, themeNodes });
  }
  if (profileCandidates.length !== 1) return null;
  const candidate = profileCandidates[0];
  const afterMarker = compact.slice(markerIndex + 1);
  let participantNodes = afterMarker;
  let followingPredicate = null;
  if (candidate.profile.final_predicate_required) {
    if (afterMarker.length < 2) return null;
    followingPredicate = afterMarker[afterMarker.length - 1];
    participantNodes = afterMarker.slice(0, -1);
    if (!cp020NodeIsPredicateEvidence(followingPredicate)) return null;
  } else if (afterMarker.some(cp020NodeIsPredicateEvidence)) {
    return null;
  }
  if (!cp021bSpanIsPersonNP(participantNodes)) return null;

  const predicateNode = compact[candidate.predicateIndex];
  const predicateChild = bridgeFramePartClone(predicateNode, {
    label: "doing",
    pos: "verb",
    syntax: `${(firstToken(predicateNode) || predicateNode).syntax || "verb"} cp021b_upstream_predicate`,
    slots: ["action_verb", "main_verb", "predicate"],
    reason: "The reviewed upstream lexical predicate supplies the valency profile; the later marker alone does not determine the relation.",
  });
  const aspectChild = candidate.aspect ? bridgeFramePartClone(candidate.aspect, {
    label: "func",
    pos: "aspect",
    syntax: "perfective_aspect",
    slots: ["perfective_aspect", "aspect_marker"],
    reason: "The overt aspect remains inside the upstream predicate-theme VP.",
  }) : null;
  const theme = cp021bArgumentSpan(candidate.themeNodes, {
    parent_type: candidate.aspect ? "PerfectiveVP" : "TransitiveVP",
    label: "what",
    role: "theme",
    slots: ["theme", "object", "np"],
    reason: "The overt theme remains inside the upstream VP; its presence is required before post-theme linking can be considered.",
  });
  const upstreamChildren = [predicateChild, aspectChild, theme].filter(Boolean);
  const upstreamType = candidate.aspect ? "PerfectiveVP" : "TransitiveVP";
  const upstreamVP = construction(upstreamType, candidate.aspect ? "PerfectiveVP" : "VP", upstreamChildren, {
    note: "Overt upstream predicate and theme retained as one VP before the post-theme link marker.",
    slots: cleanSlots(["vp", "action_vp", "predicate", "theme", "object", ...(candidate.aspect ? ["perfective_aspect"] : [])]),
    trace: traceInfo("generative_template", {
      construction_type: upstreamType,
      template_family: "construction_template",
      cp021b_design_family: "upstream_predicate_theme_vp",
      template: ["action_verb!", "perfective_aspect?", "theme!"],
      assigned_slots: ["action_verb", ...(candidate.aspect ? ["perfective_aspect"] : []), "theme"],
      surfaces: upstreamChildren.map(flattenSurface),
      subspan: true,
      reason: "C02 requires an overt non-GIVE predicate and overt local theme before the marker.",
    }),
  });
  const relation = cp021bMakePostThemeRelation({
    upstreamVP,
    upstreamPredicateSurface: candidate.predicateSurface,
    upstreamThemeSurface: candidate.themeNodes.map(flattenSurface).join(""),
    marker: compact[markerIndex],
    participantNodes,
    followingPredicate,
    profile: candidate.profile,
  });
  if (!candidate.subjectNodes.length) return relation;
  const subject = cp021bArgumentSpan(candidate.subjectNodes, {
    parent_type: "SubjectPredicateClause",
    label: "who",
    role: "subject",
    slots: ["subject", "person_np", "np"],
    reason: "The overt subject is kept outside PostThemeParticipantRelation, as required by the frozen predicate-level design.",
  });
  return construction("SubjectPredicateClause", "Clause", [subject, relation], {
    note: "Subject plus the bounded post-theme participant predicate relation.",
    slots: cleanSlots(["subject_predicate_clause", "subject", "predicate", "clause"]),
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "construction_template",
      cp021b_design_family: "subject_wrapper",
      template: ["subject!", "post_theme_participant_relation!"],
      assigned_slots: ["subject", "predicate"],
      surfaces: [flattenSurface(subject), flattenSurface(relation)],
      reason: "The optional overt subject is outside the new predicate-level relation.",
    }),
  });
}

function cp021bBoundaryReviewFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (particles.length) return null;
  const compact = withoutIgnorableSpaceText(bareCore);
  const markerIndexes = compact
    .map((node, index) => cp021bIsBei2Marker(node) ? index : -1)
    .filter((index) => index >= 0);
  if (!markerIndexes.length) return null;

  const boundaryClause = (subjectNodes, profile, code) => {
    if (!subjectNodes.length || !cp021bSpanIsPersonNP(subjectNodes)) return null;
    const subject = cp021bArgumentSpan(subjectNodes, {
      parent_type: "SubjectPredicateClause",
      label: "who",
      role: "subject",
      slots: ["subject", "person_np", "np"],
      reason: "The overt subject remains visible in a boundary-only wrapper; no participant relation is inferred.",
    });
    const remainder = compact.slice(subjectNodes.length);
    const children = [subject, ...remainder];
    return construction("SubjectPredicateClause", "Clause", children, {
      note: "Overt clause material preserved for review outside the two frozen CP021B relation designs.",
      slots: cleanSlots(["subject_predicate_clause", "subject", "predicate", "clause"]),
      trace: traceInfo("generative_template", {
        construction_type: "SubjectPredicateClause",
        template_family: "construction_template",
        cp021b_design_family: "nonemitting_boundary_wrapper",
        template: ["subject!", "boundary_predicate_material!"],
        assigned_slots: ["subject", "predicate_material"],
        boundary_profile: profile,
        semantic_review_flags: [code],
        hidden_participants_inserted: false,
        semantic_role_assignment: "none",
        surfaces: children.map(flattenSurface),
        reason: "The wrapper preserves every overt token and full root coverage while refusing a new lexical-GIVE or post-theme participant relation.",
      }),
    });
  };

  if (markerIndexes.length >= 2) {
    return boundaryClause(compact.slice(0, markerIndexes[0]), "double_marker_heavy_theme", "lexical_give_double_marker_heavy_theme_unfrozen");
  }
  if (compact.some((node) => isToken(node, "將"))) {
    const zoengIndex = compact.findIndex((node) => isToken(node, "將"));
    return boundaryClause(compact.slice(0, zoengIndex), "zoeng_restructure", "lexical_give_zoeng_restructure_outside_design");
  }

  const markerIndex = markerIndexes[0];
  const beforeMarker = compact.slice(0, markerIndex);
  const afterMarker = compact.slice(markerIndex + 1).filter((node) => !isToken(node, "咗"));
  if (!cp021bSpanIsPersonNP(afterMarker)) return null;
  for (let splitIndex = 1; splitIndex < beforeMarker.length; splitIndex += 1) {
    const frontedNodes = beforeMarker.slice(0, splitIndex);
    const subjectNodes = beforeMarker.slice(splitIndex);
    if (!cp021bSpanIsThingNP(frontedNodes) || !cp021bSpanIsPersonNP(subjectNodes)) continue;
    const topic = cp021bArgumentSpan(frontedNodes, {
      parent_type: "TopicComment",
      label: "what",
      role: "fronted_theme_candidate",
      slots: ["fronted_theme_candidate", "topic", "np"],
      reason: "The overt fronted thing is preserved as topic material; it is not copied into the local GIVE predicate or assigned by a hidden gap.",
    });
    const subject = cp021bArgumentSpan(subjectNodes, {
      parent_type: "SubjectPredicateClause",
      label: "who",
      role: "subject",
      slots: ["subject", "person_np", "np"],
      reason: "The overt subject remains inside the comment clause after the fronted topic.",
    });
    const marker = bridgeFramePartClone(compact[markerIndex], {
      label: "doing",
      pos: "verb",
      syntax: "lexical_give_predicate_fronted_theme_boundary",
      slots: ["transfer_predicate", "action_verb", "predicate"],
      reason: "Lexical GIVE is visible, but the local relation is deliberately not emitted because its theme is fronted outside the candidate span.",
    });
    const aspectNode = compact[markerIndex + 1] && isToken(compact[markerIndex + 1], "咗")
      ? bridgeFramePartClone(compact[markerIndex + 1], {
        label: "func",
        pos: "aspect",
        syntax: "perfective_aspect",
        slots: ["perfective_aspect", "aspect_marker"],
        reason: "Overt perfective aspect retained in the local predicate material.",
      })
      : null;
    const participant = cp021bArgumentSpan(afterMarker, {
      parent_type: "SubjectPredicateClause",
      label: "who",
      role: "post_give_participant",
      slots: ["post_give_participant", "person_np", "np"],
      reason: "The overt post-GIVE person remains visible without an asserted recipient, goal, or beneficiary role.",
    });
    const commentChildren = [subject, marker, aspectNode, participant].filter(Boolean);
    const comment = construction("SubjectPredicateClause", "Clause", commentChildren, {
      note: "Overt local comment material under a fronted-topic boundary.",
      slots: cleanSlots(["subject_predicate_clause", "subject", "predicate", "clause"]),
      trace: traceInfo("generative_template", {
        construction_type: "SubjectPredicateClause",
        template_family: "construction_template",
        cp021b_design_family: "fronted_theme_comment",
        assigned_slots: ["subject", "predicate_material"],
        hidden_participants_inserted: false,
        surfaces: commentChildren.map(flattenSurface),
      }),
    });
    return construction("TopicComment", "TopicComment", [topic, comment], {
      note: "Fronted topic plus overt comment, preserved without a new local lexical-GIVE relation.",
      slots: cleanSlots(["topic_comment", "topic", "comment", "predicate"]),
      trace: traceInfo("generative_template", {
        construction_type: "TopicComment",
        template_family: "construction_template",
        cp021b_design_family: "nonemitting_boundary_wrapper",
        template: ["fronted_topic!", "comment!"],
        assigned_slots: ["topic", "comment"],
        boundary_profile: "fronted_theme",
        semantic_review_flags: ["lexical_give_fronted_theme_outside_design"],
        hidden_participants_inserted: false,
        semantic_role_assignment: "none",
        surfaces: [flattenSurface(topic), flattenSurface(comment)],
        reason: "The fronted theme and discourse link remain overt, but no copied theme or full local relation is introduced.",
      }),
    });
  }
  return null;
}

  return {
    CP021B_POST_THEME_PREDICATE_PROFILES,
    cp021bBoundaryReviewFallback,
    cp021bMakePostThemeRelation,
    postThemeParticipantRelationFallback,
  };
};
