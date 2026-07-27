"use strict";

module.exports = function createPotentialResultDetectors(dependencies = {}) {
  const {
    categorySubspanFor, classifierObjectNPFromNodes, cleanSlots, construction, flattenSurface,
    isToken, isVerbLike, nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots,
    traceInfo, withoutTrailingParticles,
  } = dependencies;

function potentialResultVPFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (!bareCore.length) return null;
  let cursor = 0;
  const subject = nodeCanFillSlot(bareCore[cursor], "subject") ? bareCore[cursor++] : null;
  const action = bareCore[cursor++];
  if (!action || !isVerbLike(action) || !isToken(bareCore[cursor], "得")) return null;
  const markerSource = bareCore[cursor++];
  const resultNodes = bareCore.slice(cursor);
  if (!resultNodes.length) return null;
  if (!resultNodes.some((node) => nodeCanFillSlot(node, "result_complement") || nodeCanFillSlot(node, "completion_marker") || ["完", "到", "掂", "切"].includes(flattenSurface(node)))) return null;
  const resultHead = resultNodes[0];
  const objectSource = resultNodes.slice(1);
  let objectNode = null;
  if (objectSource.length === 1 && (nodeCanFillSlot(objectSource[0], "object") || nodeCanFillSlot(objectSource[0], "np") || nodeCanFillSlot(objectSource[0], "head_noun"))) {
    objectNode = objectSource[0].kind === "construction" ? objectSource[0] : (categorySubspanFor(objectSource, ["NominalHeadSpan"]) || objectSource[0]);
  } else if (objectSource.length > 1) {
    objectNode = classifierObjectNPFromNodes(objectSource) || categorySubspanFor(objectSource, ["OvertHeadDemonstrativeClassifierNP", "QuantifiedClassifierNP", "QuantifiedPersonNP", "OrdinalClassifierNP", "DiMarkedNP", "ModifiedNP", "NominalHeadSpan"]);
  }
  if (objectSource.length && !objectNode) return null;

  const marker = parserInactiveTokenClone(markerSource, {
    label: "func",
    pos: "function",
    syntax: "potential_marker",
    slots: ["potential_marker"],
    reason: "Between an action predicate and an overt result complement, 得 is the productive positive potential linker, not a standalone acceptability response.",
  });
  const children = [action, marker, resultHead, ...(objectNode ? [objectNode] : [])];
  const potential = construction("PotentialResultVP", "Potential", children, {
    slots: cleanSlots(["potential_result_vp", "potential_marker", "result_complement", "vp", "action_vp", "predicate"]),
    note: "Productive positive potential construction: action + 得 + overt result complement.",
    trace: traceInfo("generative_template", {
      construction_type: "PotentialResultVP",
      template_family: "generative_template",
      template: ["action_verb!", "potential_marker!", "result_complement!"],
      assigned_slots: ["action_verb", "potential_marker", "result_complement", ...(objectNode ? ["object"] : [])],
      surfaces: children.map((node) => flattenSurface(node)),
      potential_polarity: "positive",
      not_claims: ["not_acceptability_response", "not_hidden_result_complement"],
    }),
  });
  if (!subject) return potential;
  const clauseChildren = [subject, potential, ...particles];
  return construction("SubjectPredicateClause", "SubjPred", clauseChildren, {
    slots: templateDerivedSlots("SubjectPredicateClause", clauseChildren),
    note: "Subject plus a productive positive potential predicate.",
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!", "particle?"],
      assigned_slots: ["subject", "predicate", ...particles.map(() => "particle")],
      surfaces: clauseChildren.map((node) => flattenSurface(node)),
    }),
  });
}

function incompletePotentialResultCandidate(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  let cursor = 0;
  const subject = nodeCanFillSlot(bareCore[cursor], "subject") ? bareCore[cursor++] : null;
  const action = bareCore[cursor++];
  const marker = bareCore[cursor++];
  if (cursor !== bareCore.length || !action || !isVerbLike(action) || !isToken(marker, "得")) return null;
  const children = [...(subject ? [subject] : []), action, marker, ...particles];
  return construction("NeedsContext", "needs context", children, {
    slots: cleanSlots(["needs_context", "review_candidate", "predicate", "problem_span", subject ? "subject" : ""]),
    note: "Potential/acceptability boundary with no overt result complement.",
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "NeedsContext",
      predicate_omission_profile: "acceptability_possibility",
      omission_status: "potential_result_or_contextual_ellipsis_ambiguous",
      template: ["subject?", "action_verb!", "potential_marker_or_acceptability_predicate!", "particle?"],
      assigned_slots: [...(subject ? ["subject"] : []), "action_verb", "potential_marker_or_acceptability_predicate", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      missing_argument_slots: ["result_or_activity_domain"],
      missing_slot_details: [{ slot: "result_or_activity_domain", license_status: "unresolved" }],
      complement_type: "result_complement_or_contextual_activity",
      context_requirement_status: "context_required",
      antecedent_status: "not_observed",
      selected_alternative: "underdetermined",
      subject_status: subject ? "explicit" : "omitted_unlicensed",
      polarity: "positive",
      conventionality_status: "context_sensitive",
      speech_event_use: "not_applicable",
      semantic_review_flags: ["needs_context_parse", "acceptability_potential_boundary"],
      not_claims: ["not_clean_acceptability_response", "not_fabricated_result_complement", "not_sentence_specific_surface_rule"],
    }),
  });
}

  return { potentialResultVPFallback, incompletePotentialResultCandidate };
};
