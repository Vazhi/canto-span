"use strict";

function createResultFramePartClone(dependencies = {}) {
  const { firstToken, flattenSurface, parserInactiveTokenClone, token } = dependencies;

function resultFramePartClone(node, overrides = {}) {
  const surface = overrides.surface || flattenSurface(node);
  const base = firstToken(node) || token(surface);
  return parserInactiveTokenClone(base, {
    label: overrides.label || base.label || "func",
    pos: overrides.pos || (overrides.label === "doing" ? "verb" : overrides.label === "particle" ? "particle" : overrides.label === "when" ? "adverbial" : "function"),
    syntax: overrides.syntax || base.syntax || "result_frame_part",
    slots: overrides.slots || [],
    reason: overrides.reason || "Token is parser-inactive inside a bounded v0.5.34 change/result frame; the parent exposes the result relation while child tokens stay visible.",
  });
}

  return resultFramePartClone;
}

function createResultComplementDetectors(dependencies = {}) {
  const {
    categorySubspanFor, construction, flattenSurface, isToken, nodeCanFillSlot,
    nominalComplementFromNodes, resultFramePartClone, templateDerivedSlots, traceInfo,
    withoutIgnorableSpaceText,
  } = dependencies;

function resultTopicFromNodes(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  if (compact.length === 1 && (nodeCanFillSlot(compact[0], "topic") || nodeCanFillSlot(compact[0], "subject") || nodeCanFillSlot(compact[0], "location") || nodeCanFillSlot(compact[0], "np") || nodeCanFillSlot(compact[0], "head_noun"))) return compact[0];
  const templated = categorySubspanFor(compact, ["OvertHeadDemonstrativeClassifierNP", "QuantifiedClassifierNP", "DiMarkedNP", "OrdinalClassifierNP", "NominalHeadSpan", "CoordinatedNP"]);
  if (templated && (nodeCanFillSlot(templated, "topic") || nodeCanFillSlot(templated, "subject") || nodeCanFillSlot(templated, "np") || nodeCanFillSlot(templated, "head_noun"))) return templated;
  return null;
}

function resultComplementFromNodes(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  const nominal = nominalComplementFromNodes(compact);
  if (nominal) return nominal;
  if (compact.length === 1 && (nodeCanFillSlot(compact[0], "object") || nodeCanFillSlot(compact[0], "np") || nodeCanFillSlot(compact[0], "head_noun") || nodeCanFillSlot(compact[0], "location"))) return compact[0];
  return null;
}

function makeChangeIntoPredicate(changeNode, complement) {
  // AA11 is the exact reviewed 變成 + 點 result-state/outcome wh profile.
  // Keep this guard here, not only in the caller, so this helper cannot later be
  // reused as a generic 變成 + complement constructor by accident.
  if (!isToken(changeNode, "變成") || !isToken(complement, "點")) return null;
  const children = [
    resultFramePartClone(changeNode, {
      label: "doing",
      pos: "verb",
      syntax: "change_into_verb result_change_verb",
      slots: ["change_verb", "action_verb", "main_verb", "predicate"],
      reason: "變成 is the overt lexical change head in the exact AA11 變成 + 點 result-state/outcome wh profile.",
    }),
    complement,
  ];
  return construction("ChangeIntoPredicate", "變成", children, {
    note: "AA11 exact result-state/outcome wh predicate: adjacent 變成 + 點 only. Other 變成 complements remain outside this identity.",
    slots: templateDerivedSlots("ChangeIntoPredicate", children),
    trace: traceInfo("generative_template", {
      construction_type: "ChangeIntoPredicate",
      template_family: "construction_template",
      structural_scope: "vp",
      rule: "exact adjacent 變成 + 點",
      template: ["change_verb!", "result_complement!"],
      constraints: {
        slot_surface_in: {
          change_verb: ["變成"],
          result_complement: ["點"],
        },
        exact_adjacent_surface: true,
      },
      result_profile: "dim_result_state_or_outcome_wh",
      assigned_slots: ["change_verb", "result_complement"],
      surfaces: children.map((node) => flattenSurface(node)),
      subspan: true,
      reason: "The reviewed AA11 identity is only exact adjacent 變成 + 點. Generic lexical 變成 valency, 點樣/乜嘢, nominal results, aspectual results, and other change/result families do not inherit this construction identity.",
      not_claims: [
        "not_generic_change_into_complement",
        "not_binsing_dimjoeng",
        "not_binsing_matje",
        "not_nominal_result",
        "not_aspectual_result",
        "not_hidden_result_argument",
      ],
    }),
  });
}

function wrapChangeIntoPredicateSubspans(nodes) {
  const result = [];
  let i = 0;
  while (i < nodes.length) {
    if (isToken(nodes[i], "變成") && isToken(nodes[i + 1], "點")) {
      const exactAa11 = makeChangeIntoPredicate(nodes[i], nodes[i + 1]);
      if (exactAa11) {
        result.push(exactAa11);
        i += 2;
        continue;
      }
    }
    result.push(nodes[i]);
    i += 1;
  }
  return result;
}

  return {
    resultTopicFromNodes, resultComplementFromNodes, makeChangeIntoPredicate,
    wrapChangeIntoPredicateSubspans,
  };
}

module.exports = { createResultFramePartClone, createResultComplementDetectors };
