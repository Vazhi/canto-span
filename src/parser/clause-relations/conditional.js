"use strict";

module.exports = function createConditionalClauseRelations(dependencies = {}) {
  const { cleanSlots, construction, flattenSurface, isToken, nodeSlots, parserInactiveTokenClone, token, traceInfo, withoutTrailingParticles } = dependencies;

function protectedConditionalMarkerToken() {
  return token("嘅話", {
    label: "func",
    pos: "function",
    jyutping: "ge3 waa6",
    syntax: "conditional_marker protected_formula",
    slots: ["conditional_marker"],
    note: "if / in the case that",
    review: "protected_formula",
    trace: traceInfo("protected_formula_table", {
      surface: "嘅話",
      formula_type: "conditional_marker",
      reason: "嘅話 is a conventional two-character conditional marker. It stays grouped for learner display while the preceding predicate and the full ConditionalClause remain productive and transparent.",
      not_claims: ["not_formula_discourse_unit", "not_reported_speech", "not_whole_clause_lexicalization"],
    }),
  });
}

function conditionalGeWaaClauseFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (bareCore.length < 2) return null;

  let predicateNodes = [];
  let markerChildren = [];
  const finalNode = bareCore[bareCore.length - 1];
  if (isToken(finalNode, "嘅話")) {
    predicateNodes = bareCore.slice(0, -1);
    markerChildren = [protectedConditionalMarkerToken()];
  } else if (bareCore.length >= 3) {
    const ge = bareCore[bareCore.length - 2];
    const waa = bareCore[bareCore.length - 1];
    if (!isToken(ge, "嘅") || !isToken(waa, "話")) return null;
    predicateNodes = bareCore.slice(0, -2);
    markerChildren = [protectedConditionalMarkerToken()];
  } else {
    return null;
  }

  if (predicateNodes.length !== 1) return null;
  const predicate = predicateNodes[0];
  const predicateSurface = flattenSurface(predicate);
  const predicateSlots = nodeSlots(predicate);
  const licensedPredicate = ["有", "冇", "得"].includes(predicateSurface)
    || predicateSlots.some((slot) => ["predicate", "vp", "action_vp", "stative_predicate", "existential", "negated_existential", "acceptability_predicate"].includes(slot));
  if (!licensedPredicate) return null;

  const predicateChild = predicate.kind === "token"
    ? parserInactiveTokenClone(predicate, {
      label: predicate.label || "func",
      pos: (predicate.features && predicate.features.pos) || "function",
      syntax: `${predicate.syntax || "predicate"} conditional_antecedent_predicate`,
      slots: cleanSlots([...(predicate.slots || []), "conditional_antecedent", "conditional_antecedent_predicate", "predicate"]),
      reason: "The predicate is the overt antecedent inside a predicate + 嘅話 conditional clause.",
    })
    : predicate;
  const children = [predicateChild, ...markerChildren, ...particles];
  return construction("ConditionalClause", "IfClause", children, {
    slots: cleanSlots(["conditional_clause", "condition_clause", "conditional_antecedent", "conditional_marker", "predicate", "clause"]),
    note: "Conditional antecedent clause formed by a productive predicate plus the protected marker 嘅話. A following result clause is required unless discourse supplies it.",
    trace: traceInfo("generative_template", {
      construction_type: "ConditionalClause",
      template_family: "generative_template",
      template: ["conditional_antecedent_predicate!", "protected_conditional_marker!", "particle?"],
      assigned_slots: ["conditional_antecedent_predicate", "conditional_marker", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      conditional_marker_surface: "嘅話",
      conditional_marker_trace: "protected_formula_table",
      context_requirement_status: "context_required",
      missing_argument_slots: ["result_clause"],
      missing_slot_details: [{ slot: "result_clause", license_status: "unresolved" }],
      antecedent_status: "not_applicable",
      reason: "Predicate + 嘅話 is productive. The marker is protected as one learner-visible functional unit so its internal 話 cannot leak the unrelated speech-verb gloss.",
      not_claims: ["not_reported_speech", "not_sentence_final_particle_use", "not_complete_condition_result_without_result", "not_whole_clause_protected_formula"],
    }),
  });
}

  return { protectedConditionalMarkerToken, conditionalGeWaaClauseFallback };
};
