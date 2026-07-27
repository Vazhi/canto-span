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
  const children = [
    resultFramePartClone(changeNode, {
      label: "doing",
      pos: "verb",
      syntax: "change_into_verb result_change_verb",
      slots: ["change_verb", "action_verb", "main_verb", "predicate"],
      reason: "變成 is the change-into predicate head inside a bounded change-result frame.",
    }),
    complement,
  ];
  return construction("ChangeIntoPredicate", "變成", children, {
    note: "Bounded change-into predicate: 變成 + result complement.",
    slots: templateDerivedSlots("ChangeIntoPredicate", children),
    trace: traceInfo("generative_template", {
      construction_type: "ChangeIntoPredicate",
      template: ["change_verb!", "result_complement!"],
      assigned_slots: ["change_verb", "result_complement"],
      surfaces: children.map((node) => flattenSurface(node)),
      subspan: true,
    }),
  });
}

function wrapChangeIntoPredicateSubspans(nodes) {
  const result = [];
  let i = 0;
  while (i < nodes.length) {
    if (isToken(nodes[i], "變成") && isToken(nodes[i + 1], "點")) {
      result.push(makeChangeIntoPredicate(nodes[i], nodes[i + 1]));
      i += 2;
      continue;
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
