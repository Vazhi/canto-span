"use strict";

module.exports = function createRelativeClauseDetectors(dependencies = {}) {
  const {
    applyConstructionPatterns, clauseRelationParsedChunk, clauseRelationSurfaceIndex, cleanSlots,
    construction, cp021bIsBei2Marker, flattenSurface, nodeCanFillSlot, parserInactiveTokenClone,
    traceInfo, withoutIgnorableSpaceText,
  } = dependencies;

function relativeClauseGapPredicate(leftNodes = [], headSurface = "") {
  const compact = withoutIgnorableSpaceText(leftNodes || []);
  if (compact.length !== 2 || !nodeCanFillSlot(compact[0], "subject")) return null;
  const verb = compact[1];
  if (!nodeCanFillSlot(verb, "action_verb")) return null;
  const vp = construction("TransitiveVP", "V+O", [verb], {
    note: "Transitive predicate with an overt relative-clause head licensing the object gap; no hidden object token is inserted.",
    trace: traceInfo("generative_template", {
      construction_type: "TransitiveVP",
      template_family: "generative_template",
      template: ["action_verb!", "relative_object_gap!"],
      assigned_slots: ["action_verb"],
      relative_gap_status: "licensed_by_overt_head_noun",
      relative_head_surface: headSurface,
      missing_argument_slots: ["object"],
      reason: "The relative-clause head noun supplies the overt nominal domain for the visible transitive predicate. The parser records the dependency without inserting an object token.",
      not_claims: ["not_fabricated_object_token"],
    }),
  });
  return construction("SubjectPredicateClause", "Clause", [compact[0], vp], {
    note: "Relative modifier clause with overt subject and a head-licensed object gap.",
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!"],
      assigned_slots: ["subject", "predicate"],
      relative_gap_status: "licensed_by_overt_head_noun",
      relative_head_surface: headSurface,
      reason: "The overt subject and visible transitive predicate form the relative modifier clause; the following head noun licenses the object dependency.",
      not_claims: ["not_fabricated_object_token"],
    }),
  });
}

function relativeClauseNPForTerminal(segment = []) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.filter(cp021bIsBei2Marker).length >= 2) return null;
  const linkerIndex = clauseRelationSurfaceIndex(compact, ["嘅"]);
  if (linkerIndex <= 0 || linkerIndex >= compact.length - 1) return null;
  const head = compact[linkerIndex + 1];
  if (!(nodeCanFillSlot(head, "head_noun") || nodeCanFillSlot(head, "time") || nodeCanFillSlot(head, "time_head") || ["時候", "時間"].includes(flattenSurface(head)))) return null;

  const left = compact.slice(0, linkerIndex);
  const headSurface = flattenSurface(head);
  const temporalHead = ["時候", "時間"].includes(headSurface);
  const leftHasActionPredicate = left.some((node) => nodeCanFillSlot(node, "action_verb"));
  if (!temporalHead && !leftHasActionPredicate) return null;
  const leftFinal = left[left.length - 1] || null;
  const leftFinalLooksNominal = leftFinal
    && !nodeCanFillSlot(leftFinal, "action_verb")
    && (nodeCanFillSlot(leftFinal, "np") || nodeCanFillSlot(leftFinal, "head_noun") || nodeCanFillSlot(leftFinal, "location") || nodeCanFillSlot(leftFinal, "object"));
  if (!temporalHead && left.length >= 2 && leftFinalLooksNominal) return null;
  let modifierParsed = applyConstructionPatterns(left);
  let modifierClause = modifierParsed.length === 1 && modifierParsed[0].kind === "construction" ? modifierParsed[0] : null;
  if (!modifierClause) modifierClause = relativeClauseGapPredicate(left, headSurface);
  if (!modifierClause) {
    const chunk = clauseRelationParsedChunk(left, { relative_head_surface: headSurface });
    if (chunk.length === 1 && chunk[0].kind === "construction") modifierClause = chunk[0];
  }
  if (!modifierClause || !(nodeCanFillSlot(modifierClause, "clause") || nodeCanFillSlot(modifierClause, "predicate") || nodeCanFillSlot(modifierClause, "vp"))) return null;

  const linker = parserInactiveTokenClone(compact[linkerIndex], {
    label: "particle",
    pos: "particle",
    syntax: "nominal_linker relative_clause_linker",
    slots: cleanSlots([...(compact[linkerIndex].slots || []), "nominal_linker", "relative_clause_linker"]),
    reason: "嘅 links the visible modifier clause to its overt head noun inside a relative-clause NP.",
  });
  const relativeNP = construction("RelativeClauseNP", "RelNP", [modifierClause, linker, head], {
    note: "Relative-clause noun phrase with a visible modifier clause, overt 嘅 linker, and overt head noun.",
    trace: traceInfo("generative_template", {
      construction_type: "RelativeClauseNP",
      template_family: "generative_template",
      template: ["relative_clause!", "nominal_linker!", "head_noun!"],
      assigned_slots: ["relative_clause", "nominal_linker", "head_noun"],
      relation_subtype: "relative_nominal_modifier",
      relative_clause_construction: modifierClause.type,
      head_noun_surface: headSurface,
      temporal_head: ["時候", "時間"].includes(headSurface),
      reason: "The modifier clause attaches inside the NP before any matrix predicate or temporal-subordinate relation is built.",
      not_claims: ["not_flat_clause_sequence", "not_hidden_head_noun", "not_hidden_relative_gap_token"],
    }),
  });

  const tail = compact.slice(linkerIndex + 2);
  if (!tail.length) return relativeNP;
  const predicate = clauseRelationParsedChunk(tail);
  if (!predicate.length || !predicate.some((node) => node && (node.kind === "construction" || nodeCanFillSlot(node, "predicate") || nodeCanFillSlot(node, "vp")))) return null;
  return construction("SubjectPredicateClause", "Clause", [relativeNP, ...predicate], {
    note: "Matrix clause whose overt subject/topic is a relative-clause NP.",
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!"],
      assigned_slots: ["subject", "predicate"],
      relative_np_subject: true,
      reason: "The relative-clause NP is completed before attachment to the visible matrix predicate.",
    }),
  });
}

  return { relativeClauseNPForTerminal };
};
