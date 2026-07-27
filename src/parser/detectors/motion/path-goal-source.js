"use strict";

module.exports = function createMotionPathGoalSourceDetectors(dependencies = {}) {
  const {
    applyConstructionPatterns, categorySubspanFor, cleanSlots, construction, constructionSlotsByType,
    CP021B_POST_THEME_PREDICATE_PROFILES, cp021bMakePostThemeRelation, firstToken, flattenSurface,
    motionOrderingReviewCandidate, nodeCanFillSlot, nodeSurfaceMatches, parserInactiveTokenClone,
    templateDerivedSlots, token, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles,
  } = dependencies;

function pathMarkerClone(node) {
  return parserInactiveTokenClone(node, {
    label: "func",
    pos: "function",
    syntax: "path_coverb path_marker",
    slots: ["path_marker"],
    reason: "沿住 is interpreted as the path marker inside a bounded polite path imperative.",
  });
}

function pathPhraseFromParts(marker, path) {
  const children = [pathMarkerClone(marker), path];
  return construction("PathPhrase", "Path", children, {
    note: "Path phrase: 沿住 + path/location.",
    slots: templateDerivedSlots("PathPhrase", children),
    trace: traceInfo("generative_template", {
      construction_type: "PathPhrase",
      template: ["path_marker!", "location!"],
      assigned_slots: ["path_marker", "location"],
      surfaces: children.map((node) => flattenSurface(node)),
      subspan: true,
    }),
  });
}






function sourceMotionClauseFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const offset = bareCore.length >= 4 && nodeCanFillSlot(bareCore[0], "subject") ? 1 : 0;
  if (bareCore.length - offset < 3) return null;
  const sourceMarker = bareCore[offset];
  const sourceLocation = bareCore[offset + 1];
  const motionCore = bareCore.slice(offset + 2);
  if (!nodeSurfaceMatches(sourceMarker, ["由"]) || !nodeCanFillSlot(sourceLocation, "location")) return null;

  const treeCanFillSlot = (node, slot) => {
    if (!node) return false;
    if (nodeCanFillSlot(node, slot)) return true;
    return node.kind === "construction" && (node.children || []).some((child) => treeCanFillSlot(child, slot));
  };
  const wrappedMotion = applyConstructionPatterns(motionCore);
  if (wrappedMotion.length !== 1) return null;
  let motionNode = wrappedMotion[0];

  // Conventional institutional destinations such as 返學 may be stored in the
  // inherited lexicon as a transparent V–O unit. Inside an overt source-motion
  // frame, reinterpret only the visible roles: 返 remains the motion verb and
  // 學 is the conventional destination/domain. No hidden school/place token is
  // inserted, and unrelated ProductiveVO compounds keep their accepted parse.
  if (motionNode.kind === "construction"
      && motionNode.type === "ProductiveVO"
      && flattenSurface(motionNode) === "返學"
      && (motionNode.children || []).length === 2) {
    const [movement, destination] = motionNode.children;
    const motionChildren = [
      motionEventPartClone(movement, {
        label: "doing",
        syntax: "conventional_motion_goal_verb",
        slots: ["movement_verb"],
        reason: "返 is the overt motion predicate in the conventional destination expression 返學.",
      }),
      motionEventPartClone(destination, {
        label: "where",
        syntax: "conventional_institutional_destination schooling_destination",
        slots: ["goal", "location", "np", "head_noun"],
        reason: "學 denotes the overt conventional schooling destination/domain after motion 返 in this source-motion frame; no hidden 學校 token is inserted.",
      }),
    ];
    motionNode = construction("MotionGoalVP", "MotionGoal", motionChildren, {
      slots: constructionSlotsByType("MotionGoalVP", motionChildren),
      trace: traceInfo("generative_template", {
        construction_type: "MotionGoalVP",
        template_family: "generative_template",
        template: ["movement_verb!", "conventional_institutional_destination!"],
        assigned_slots: ["movement_verb", "goal"],
        surfaces: motionChildren.map(flattenSurface),
        motion_goal_subtype: "conventional_institutional_destination",
        not_claims: ["not_productive_transitive_object", "not_hidden_school_location", "not_lexicalized_whole_clause"],
      }),
    });
  }

  if (!treeCanFillSlot(motionNode, "directional_motion_vp")
      && !treeCanFillSlot(motionNode, "movement_verb")) return null;
  const sourceChild = parserInactiveTokenClone(sourceMarker, {
    label: "func", pos: "function", syntax: "source_coverb source_marker",
    slots: ["source_marker", "coverb_marker"], reason: "由 introduces the source location of the motion event.",
  });
  const locationChild = parserInactiveTokenClone(sourceLocation, {
    label: "where", pos: "location", syntax: `${sourceLocation.syntax || "place_np"} source_location`,
    slots: ["source", "location", "np"], reason: "Place NP interpreted as the source of motion after 由.",
  });
  const children = [...bareCore.slice(0, offset), sourceChild, locationChild, motionNode, ...particles];
  return construction("SourceMotionClause", "SourceMotion", children, {
    note: "Source-motion clause: optional subject + 由 + source location + motion predicate.",
    slots: cleanSlots(["source_motion_clause", "source", "source_marker", "location", "movement_verb", "directional_motion_vp", "vp", "predicate", "clause", offset ? "subject" : "", ...templateDerivedSlots("SourceMotionClause", children)]),
    trace: traceInfo("generative_template", {
      construction_type: "SourceMotionClause", template_family: "generative_template",
      template: ["subject?", "source_marker!", "source_location!", "motion_predicate!", "particle?"],
      assigned_slots: [...bareCore.slice(0, offset).map(() => "subject"), "source_marker", "source_location", "motion_predicate", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "The source coverb phrase is attached to the motion predicate so the full clause span remains visible and the location keeps its where role.",
    }),
  });
}


function motionEventPartClone(node, { label = "doing", syntax = "motion_event_part", slots = [], reason = "Visible motion-event material is assigned by its position and event-semantic role." } = {}) {
  const surface = flattenSurface(node);
  const base = firstToken(node) || token(surface, { jyutping: "" });
  return parserInactiveTokenClone(base, {
    label,
    pos: label === "where" ? "location" : label === "when" ? "time" : label === "func" ? "function" : "verb",
    syntax,
    slots,
    reason,
  });
}

function motionSubjectPredicateClause(subject, predicate, particles = [], detail = {}) {
  if (!subject) return predicate;
  const children = [subject, predicate, ...particles];
  return construction("SubjectPredicateClause", "SubjPred", children, {
    slots: templateDerivedSlots("SubjectPredicateClause", children),
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!", "particle?"],
      assigned_slots: ["subject", "predicate", ...particles.map(() => "particle")],
      surfaces: children.map(flattenSurface),
      ...detail,
    }),
  });
}

function motionGoalNode(node, reason = "The postverbal place is the overt goal of the motion event, not an ordinary object.") {
  return motionEventPartClone(node, {
    label: "where",
    syntax: `${(firstToken(node) || {}).syntax || "place_or_goal"} motion_goal_location`,
    slots: ["goal", "location", "np", "head_noun"],
    reason,
  });
}


function motionEventSpatialFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length < 3) return null;
  const surfaces = compact.map(flattenSurface);
  let cursor = 0;
  const subject = compact[cursor] && nodeCanFillSlot(compact[cursor], "subject") ? compact[cursor++] : null;
  const rest = compact.slice(cursor);
  const rs = rest.map(flattenSurface);

  // Strong-order controls remain review-bearing rather than being silently repaired.
  if (subject && rs.length >= 4 && rs[0] === "喺" && nodeCanFillSlot(rest[1], "location") && nodeCanFillSlot(rest[2], "time")) {
    return motionOrderingReviewCandidate(
      [...compact, ...particles],
      "post_locative_time_order",
      "The temporal adjunct follows the low preverbal locative phrase before the main event.",
      ["subject_time_locative_predicate", "separate_discourse_or_native_review"],
      {
        family: "clause_adjunct_ordering_or_attachment",
        review_flag: "clause_adjunct_order_or_attachment_review",
        missing_slot: "licensed_clause_adjunct_order_or_attachment",
        note: "Review-bearing clause-adjunct ordering or attachment candidate. Visible learner text is preserved and no repair is inserted.",
        not_claims: ["not_hard_asterisk_judgment", "not_silent_reordering", "not_hidden_time_or_location"],
      }
    );
  }
  if (subject && rs.length === 3 && rs[0] === "行" && nodeCanFillSlot(rest[1], "location") && rs[2] === "去") {
    return motionOrderingReviewCandidate([...compact, ...particles], "goal_before_final_deictic", "The goal NP intervenes between the manner-motion verb and final 去 instead of following the directional predicate.", ["行去_goal", "separate_serial_event"]);
  }
  if (subject && rs.length === 3 && ["返", "行"].includes(rs[0]) && nodeCanFillSlot(rest[1], "location") && rs[2] === "到") {
    return motionOrderingReviewCandidate([...compact, ...particles], "goal_before_attainment_complement", "到 follows an already expressed goal NP instead of forming the motion-goal-attainment predicate before the goal.", ["motion_verb_到_goal"]);
  }
  if (subject && rs.length === 3 && rs[0] === "到" && rs[1] === "返" && nodeCanFillSlot(rest[2], "location")) {
    return motionOrderingReviewCandidate([...compact, ...particles], "arrival_return_order_conflict", "Main arrival 到 precedes return-motion 返 without a licensed compositional relation.", ["到咗_goal", "返到_goal", "返_goal"]);
  }
  if (subject && rs.length === 5 && ["上", "落", "入", "出"].includes(rs[0]) && nodeCanFillSlot(rest[1], "action_verb") && ["嚟", "去"].includes(rs[3]) && nodeCanFillSlot(rest[4], "action_verb")) {
    return motionOrderingReviewCandidate([...compact, ...particles], "unlicensed_motion_action_deictic_order", "A bare directional head is separated from its deictic element by an action-object event.", ["directional_complex_then_action_purpose", "separate_clause_or_native_review"]);
  }

  // Time + source + directed motion: subject + time + 由 + source + manner-motion + 去 + goal.
  if (subject && rs.length === 6 && nodeCanFillSlot(rest[0], "time") && rs[1] === "由" && nodeCanFillSlot(rest[2], "location") && rs[3] === "行" && rs[4] === "去" && nodeCanFillSlot(rest[5], "location")) {
    const directedChildren = [
      motionEventPartClone(rest[3], { label: "doing", syntax: "manner_motion_verb", slots: ["movement_verb", "manner_motion"], reason: "行 supplies the manner of self-motion." }),
      motionEventPartClone(rest[4], { label: "doing", syntax: "directional_path_element", slots: ["movement_direction", "path_component"], reason: "去 forms the postverbal directional component before the overt goal." }),
      motionGoalNode(rest[5]),
    ];
    const directed = construction("DirectedMannerMotionVP", "DirectedMotion", directedChildren, {
      slots: constructionSlotsByType("DirectedMannerMotionVP", directedChildren),
      trace: traceInfo("generative_template", { construction_type: "DirectedMannerMotionVP", template_family: "generative_template", template: ["manner_motion_verb!", "directional_element!", "goal!"], assigned_slots: ["movement_verb", "movement_direction", "goal"], surfaces: directedChildren.map(flattenSurface), not_claims: ["not_purpose_chain", "not_transitive_object"] }),
    });
    const sourceMarker = motionEventPartClone(rest[1], { label: "func", syntax: "source_coverb source_marker", slots: ["source_marker", "coverb_marker"], reason: "由 introduces the overt source of the motion event." });
    const source = motionEventPartClone(rest[2], { label: "where", syntax: "source_location", slots: ["source", "location", "np"], reason: "The place after 由 is the source, not the goal." });
    const children = [subject, rest[0], sourceMarker, source, directed, ...particles];
    return construction("SourceMotionClause", "SourceMotion", children, {
      slots: constructionSlotsByType("SourceMotionClause", children),
      trace: traceInfo("generative_template", { construction_type: "SourceMotionClause", template_family: "generative_template", template: ["subject!", "time?", "source_marker!", "source_location!", "directed_motion_vp!", "particle?"], assigned_slots: ["subject", "time", "source_marker", "source_location", "motion_predicate", ...particles.map(() => "particle")], surfaces: children.map(flattenSurface), spatial_order_status: "time_before_source_before_motion_goal" }),
    });
  }

  // Preverbal orientation/path phrase: 向 + orientation/location + manner-motion verb.
  if (subject && rs.length === 3 && rs[0] === "向" && rs[2] === "行") {
    const orientationSurface = rs[1];
    const orientation = orientationSurface === "前"
      ? token("前", { label: "where", pos: "location", jyutping: "cin4", syntax: "orientation_ground path_direction", slots: ["path", "orientation", "location"], note: "forward / front", trace: traceInfo("construction_internal_parser_inactive_clone", { reason: "前 receives a context-local orientation/path reading after 向; no global nominal lexicon entry is introduced." }) })
      : motionEventPartClone(rest[1], { label: "where", syntax: "orientation_ground path_goal", slots: ["path", "orientation", "location"], reason: "The NP after 向 is the orientation/path ground." });
    const pathChildren = [motionEventPartClone(rest[0], { label: "func", syntax: "orientation_coverb path_marker", slots: ["path_marker", "coverb_marker"], reason: "向 introduces a preverbal orientation/path phrase." }), orientation];
    const path = construction("PathPhrase", "Path", pathChildren, { slots: constructionSlotsByType("PathPhrase", pathChildren), trace: traceInfo("generative_template", { construction_type: "PathPhrase", template_family: "generative_template", template: ["path_marker!", "orientation_ground!"], assigned_slots: ["path_marker", "location"], surfaces: pathChildren.map(flattenSurface), subspan: true }) });
    const motion = motionEventPartClone(rest[2], { label: "doing", syntax: "manner_motion_verb", slots: ["movement_verb", "manner_motion", "predicate"], reason: "行 supplies the manner of motion under the preceding orientation phrase." });
    const predicate = construction("DirectedMannerMotionVP", "DirectedMotion", [path, motion], { slots: constructionSlotsByType("DirectedMannerMotionVP", [path, motion]), trace: traceInfo("generative_template", { construction_type: "DirectedMannerMotionVP", template_family: "generative_template", template: ["path_phrase!", "manner_motion_verb!"], assigned_slots: ["path_phrase", "movement_verb"], surfaces: [flattenSurface(path), flattenSurface(motion)], not_claims: ["not_postverbal_goal", "not_purpose_chain"] }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Manner motion + directional 去 + overt goal.
  if (subject && rs.length === 3 && rs[0] === "行" && rs[1] === "去" && nodeCanFillSlot(rest[2], "location")) {
    const children = [
      motionEventPartClone(rest[0], { label: "doing", syntax: "manner_motion_verb", slots: ["movement_verb", "manner_motion"], reason: "行 supplies manner of motion." }),
      motionEventPartClone(rest[1], { label: "doing", syntax: "directional_path_element", slots: ["movement_direction", "path_component"], reason: "去 is the postverbal directional element; it is not the purpose verb in this frame." }),
      motionGoalNode(rest[2]),
    ];
    const predicate = construction("DirectedMannerMotionVP", "DirectedMotion", children, { slots: constructionSlotsByType("DirectedMannerMotionVP", children), trace: traceInfo("generative_template", { construction_type: "DirectedMannerMotionVP", template_family: "generative_template", template: ["manner_motion_verb!", "directional_element!", "goal!"], assigned_slots: ["movement_verb", "movement_direction", "goal"], surfaces: children.map(flattenSurface), not_claims: ["not_purpose_chain", "not_transitive_object"] }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Manner motion + complex directional path/deixis.
  if (subject && rs.length === 3 && rs[0] === "行" && ["入", "出", "上", "落"].includes(rs[1]) && ["嚟", "去"].includes(rs[2])) {
    const children = [
      motionEventPartClone(rest[0], { label: "doing", syntax: "manner_motion_verb", slots: ["movement_verb", "manner_motion"] }),
      motionEventPartClone(rest[1], { label: "doing", syntax: "movement_direction", slots: ["movement_direction", "path_component"] }),
      motionEventPartClone(rest[2], { label: "doing", syntax: "deictic_motion_marker", slots: ["deictic_motion_marker"] }),
    ];
    const predicate = construction("DirectedMannerMotionVP", "DirectedMotion", children, { slots: constructionSlotsByType("DirectedMannerMotionVP", children), trace: traceInfo("generative_template", { construction_type: "DirectedMannerMotionVP", template_family: "generative_template", template: ["manner_motion_verb!", "movement_direction!", "deictic_motion_marker!"], assigned_slots: ["movement_verb", "movement_direction", "deictic_motion_marker"], surfaces: children.map(flattenSurface), deictic_position_status: "outermost_visible_deictic" }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Main directional verb + final deixis, preserving both overt pieces.
  if (subject && rs.length === 2 && ["上", "落", "入", "出", "返"].includes(rs[0]) && ["嚟", "去"].includes(rs[1])) {
    const children = [motionEventPartClone(rest[0], { label: "doing", syntax: "main_directional_verb", slots: ["movement_verb", "movement_direction"] }), motionEventPartClone(rest[1], { label: "doing", syntax: "deictic_motion_marker", slots: ["deictic_motion_marker"] })];
    const predicate = construction("DirectionalMotionVP", "MotionVP", children, { slots: constructionSlotsByType("DirectionalMotionVP", children), trace: traceInfo("generative_template", { construction_type: "DirectionalMotionVP", template_family: "generative_template", template: ["directional_head!", "deictic_motion_marker!"], assigned_slots: ["movement_direction", "deictic_motion_marker"], surfaces: children.map(flattenSurface), deictic_position_status: "outermost_visible_deictic" }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Motion goal-attainment: 返/行 + 到 + goal.
  if (subject && rs.length === 3 && ["返", "行"].includes(rs[0]) && rs[1] === "到" && nodeCanFillSlot(rest[2], "location")) {
    const children = [motionEventPartClone(rest[0], { label: "doing", syntax: "movement_verb", slots: ["movement_verb", "main_verb"] }), motionEventPartClone(rest[1], { label: "func", syntax: "goal_attainment_complement", slots: ["goal_attainment_complement", "result_marker"], reason: "到 marks successful arrival/attainment before the overt goal." }), motionGoalNode(rest[2])];
    const predicate = construction("GoalAttainmentMotionVP", "GoalAttainment", children, { slots: constructionSlotsByType("GoalAttainmentMotionVP", children), trace: traceInfo("generative_template", { construction_type: "GoalAttainmentMotionVP", template_family: "generative_template", template: ["movement_verb!", "goal_attainment_complement!", "goal!"], assigned_slots: ["movement_verb", "result_marker", "goal"], surfaces: children.map(flattenSurface), attainment_domain: "spatial_goal" }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Main arrival verb 到 + perfective + goal.
  if (subject && rs.length === 3 && rs[0] === "到" && rs[1] === "咗" && nodeCanFillSlot(rest[2], "location")) {
    const children = [motionEventPartClone(rest[0], { label: "doing", syntax: "arrival_motion_verb", slots: ["movement_verb", "main_verb", "predicate"], reason: "到 is the main arrival verb here, not a postverbal result marker." }), motionEventPartClone(rest[1], { label: "func", syntax: "perfective_aspect", slots: ["perfective_aspect", "aspect_marker"] }), motionGoalNode(rest[2])];
    const predicate = construction("MotionGoalVP", "MotionGoal", children, { slots: constructionSlotsByType("MotionGoalVP", children), trace: traceInfo("generative_template", { construction_type: "MotionGoalVP", template_family: "generative_template", template: ["arrival_motion_verb!", "perfective_aspect!", "goal!"], assigned_slots: ["movement_verb", "perfective_aspect", "goal"], surfaces: children.map(flattenSurface), arrival_verb_status: "main_verb_not_complement" }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Nonspatial attainment/result V到 and negative potential V唔到.
  if (subject && rs.length === 3 && nodeCanFillSlot(rest[0], "action_verb") && rs[1] === "到" && nodeCanFillSlot(rest[2], "object") && !nodeCanFillSlot(rest[2], "location")) {
    const children = [rest[0], motionEventPartClone(rest[1], { label: "func", syntax: "nonspatial_attainment_result_complement", slots: ["result_complement", "result_marker"], reason: "到 is a nonspatial attainment/result complement licensed by the action and object." }), rest[2]];
    const predicate = construction("ResultComplementVP", "ResultVP", children, { slots: constructionSlotsByType("ResultComplementVP", children), trace: traceInfo("generative_template", { construction_type: "ResultComplementVP", template_family: "generative_template", template: ["action_verb!", "attainment_result_complement!", "object!"], assigned_slots: ["action_verb", "result_complement", "object"], surfaces: children.map(flattenSurface), attainment_domain: "nonspatial", not_claims: ["not_motion_goal", "not_coverb"] }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }
  if (subject && rs.length === 4 && nodeCanFillSlot(rest[0], "action_verb") && rs[1] === "唔" && rs[2] === "到" && nodeCanFillSlot(rest[3], "object") && !nodeCanFillSlot(rest[3], "location")) {
    const children = [rest[0], motionEventPartClone(rest[1], { label: "func", syntax: "potential_negator", slots: ["negator"] }), motionEventPartClone(rest[2], { label: "func", syntax: "nonspatial_attainment_result_complement", slots: ["result_complement", "result_marker"] }), rest[3]];
    const predicate = construction("NegativePotentialComplement", "NegPotential", children, { slots: constructionSlotsByType("NegativePotentialComplement", children), trace: traceInfo("generative_template", { construction_type: "NegativePotentialComplement", template_family: "generative_template", template: ["action_verb!", "potential_negator!", "attainment_result_complement!", "object!"], assigned_slots: ["action_verb", "negator", "result_complement", "object"], surfaces: children.map(flattenSurface), attainment_domain: "nonspatial", not_claims: ["not_motion_goal", "not_hidden_result"] }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Motion-purpose: motion-to-goal followed by an overt action/object VP.
  if (subject && rs.length === 4 && rs[0] === "去" && (nodeCanFillSlot(rest[1], "location") || /restaurant_np|place_or_goal/.test((firstToken(rest[1]) || {}).syntax || "")) && nodeCanFillSlot(rest[2], "action_verb") && nodeCanFillSlot(rest[3], "object")) {
    const motionChildren = [motionEventPartClone(rest[0], { label: "doing", syntax: "movement_verb", slots: ["movement_verb"] }), motionGoalNode(rest[1])];
    const motion = construction("MotionGoalVP", "MotionGoal", motionChildren, { slots: constructionSlotsByType("MotionGoalVP", motionChildren), trace: traceInfo("generative_template", { construction_type: "MotionGoalVP", template_family: "generative_template", template: ["movement_verb!", "goal!"], assigned_slots: ["movement_verb", "goal"], surfaces: motionChildren.map(flattenSurface), subspan: true }) });
    const purposeChildren = [rest[2], rest[3]];
    const purpose = construction("TransitiveVP", "VP", purposeChildren, { slots: constructionSlotsByType("TransitiveVP", purposeChildren), trace: traceInfo("generative_template", { construction_type: "TransitiveVP", template_family: "generative_template", template: ["action_verb!", "object!"], assigned_slots: ["action_verb", "object"], surfaces: purposeChildren.map(flattenSurface), subspan: true }) });
    const chainChildren = [motion, purpose];
    const chain = construction("MotionPurposeChain", "MotionPurpose", chainChildren, { slots: constructionSlotsByType("MotionPurposeChain", chainChildren), trace: traceInfo("generative_template", { construction_type: "MotionPurposeChain", template_family: "generative_template", template: ["motion_goal_vp!", "purpose_vp!"], assigned_slots: ["motion_goal_vp", "purpose_verb"], surfaces: chainChildren.map(flattenSurface), shared_subject_provenance: { overt_subject_surface: flattenSurface(subject), licensed_members: [flattenSurface(motion), flattenSurface(purpose)], hidden_subject_inserted: false } }) });
    return motionSubjectPredicateClause(subject, chain, particles);
  }

  // Motion + action-object + later purpose event.
  if (subject && rs.length === 6 && rs[0] === "去" && nodeCanFillSlot(rest[1], "location") && nodeCanFillSlot(rest[2], "action_verb") && nodeCanFillSlot(rest[3], "object") && nodeCanFillSlot(rest[4], "action_verb") && nodeCanFillSlot(rest[5], "object")) {
    const motionChildren = [motionEventPartClone(rest[0], { label: "doing", syntax: "movement_verb", slots: ["movement_verb"] }), motionGoalNode(rest[1])];
    const motion = construction("MotionGoalVP", "MotionGoal", motionChildren, { slots: constructionSlotsByType("MotionGoalVP", motionChildren), trace: traceInfo("generative_template", { construction_type: "MotionGoalVP", template_family: "generative_template", template: ["movement_verb!", "goal!"], assigned_slots: ["movement_verb", "goal"], surfaces: motionChildren.map(flattenSurface), subspan: true }) });
    const action1 = construction("TransitiveVP", "VP", [rest[2], rest[3]], { slots: constructionSlotsByType("TransitiveVP", [rest[2], rest[3]]), trace: traceInfo("generative_template", { construction_type: "TransitiveVP", template_family: "generative_template", template: ["action_verb!", "object!"], assigned_slots: ["action_verb", "object"], surfaces: [rs[2], rs[3]], subspan: true }) });
    const action2 = construction("TransitiveVP", "VP", [rest[4], rest[5]], { slots: constructionSlotsByType("TransitiveVP", [rest[4], rest[5]]), trace: traceInfo("generative_template", { construction_type: "TransitiveVP", template_family: "generative_template", template: ["action_verb!", "object!"], assigned_slots: ["action_verb", "object"], surfaces: [rs[4], rs[5]], subspan: true }) });
    const chainChildren = [motion, action1, action2];
    const chain = construction("SerialVerbPurposeChain", "PurposeChain", chainChildren, { slots: constructionSlotsByType("SerialVerbPurposeChain", chainChildren), trace: traceInfo("generative_template", { construction_type: "SerialVerbPurposeChain", template_family: "generative_template", template: ["motion_goal_vp!", "action_object_vp!", "purpose_vp!"], assigned_slots: ["motion_goal_vp", "action_vp", "purpose_verb"], surfaces: chainChildren.map(flattenSurface), shared_subject_provenance: { overt_subject_surface: flattenSurface(subject), licensed_members: chainChildren.map(flattenSurface), hidden_subject_inserted: false } }) });
    return motionSubjectPredicateClause(subject, chain, particles);
  }

  // Caused-motion/action + directional return + recipient-purpose frame.
  if (subject && rs.length === 7 && rs[0] === "攞" && nodeCanFillSlot(rest[1], "object") && rs[2] === "返" && rs[3] === "嚟" && rs[4] === "畀" && nodeCanFillSlot(rest[5], "subject") && nodeCanFillSlot(rest[6], "action_verb")) {
    const action = construction("TransitiveVP", "VP", [rest[0], rest[1]], {
      slots: constructionSlotsByType("TransitiveVP", [rest[0], rest[1]]),
      trace: traceInfo("generative_template", { construction_type: "TransitiveVP", template_family: "generative_template", template: ["action_verb!", "object!"], assigned_slots: ["action_verb", "object"], surfaces: [rs[0], rs[1]], subspan: true }),
    });
    const returnMotionChildren = [motionEventPartClone(rest[2], { label: "doing", syntax: "return_directional_complement", slots: ["return_motion_verb", "movement_direction"] }), motionEventPartClone(rest[3], { label: "doing", syntax: "deictic_motion_marker", slots: ["deictic_motion_marker"] })];
    const returnMotion = construction("DirectionalMotionVP", "MotionVP", returnMotionChildren, { slots: constructionSlotsByType("DirectionalMotionVP", returnMotionChildren), trace: traceInfo("generative_template", { construction_type: "DirectionalMotionVP", template_family: "generative_template", template: ["return_directional_complement!", "deictic_motion_marker!"], assigned_slots: ["return_motion_verb", "deictic_motion_marker"], surfaces: returnMotionChildren.map(flattenSurface), subspan: true }) });
    const causedMotionChildren = [action, returnMotion];
    const causedMotion = construction("VerbComplementVP", "VerbCompVP", causedMotionChildren, { slots: templateDerivedSlots("VerbComplementVP", causedMotionChildren), trace: traceInfo("generative_template", { construction_type: "VerbComplementVP", template_family: "generative_template", template: ["action_object_vp!", "directional_motion_vp!"], assigned_slots: ["action_vp", "directional_motion_vp"], surfaces: causedMotionChildren.map(flattenSurface), caused_motion_status: "overt_theme_plus_return_direction" }) });
    const relation = cp021bMakePostThemeRelation({
      upstreamVP: causedMotion,
      upstreamPredicateSurface: "攞",
      upstreamThemeSurface: flattenSurface(rest[1]),
      marker: rest[4],
      participantNodes: [rest[5]],
      followingPredicate: rest[6],
      profile: CP021B_POST_THEME_PREDICATE_PROFILES["攞"],
    });
    return motionSubjectPredicateClause(subject, relation, particles);
  }

  return null;
}



  return {
    motionEventSpatialFallback,
    pathPhraseFromParts,
    sourceMotionClauseFallback,
  };
};
