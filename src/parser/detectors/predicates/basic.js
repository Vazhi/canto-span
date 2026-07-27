"use strict";

module.exports = function createBasicPredicateDetectors(dependencies = {}) {
  const {
    categorySubspanFor, construction, flattenSurface, hasSurface, isStativeToken, isToken, nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots, traceInfo
  } = dependencies;

function wrapNegatedVPSubspans(nodes) {
  const result = [];
  let index = 0;
  while (index < nodes.length) {
    const negator = nodes[index];
    const vp = nodes[index + 1];
    if (isToken(negator, "唔")
        && vp
        && vp.kind === "construction"
        && nodeCanFillSlot(vp, "vp")
        && !nodeCanFillSlot(vp, "negated_directional_motion_vp")
        && vp.type !== "NegatedVP") {
      const negatorChild = parserInactiveTokenClone(negator, {
        label: "func",
        pos: "function",
        syntax: "negator m4_negator",
        slots: ["negator", "m4_negator"],
        reason: "唔 is the visible negator of the following VP.",
      });
      const children = [negatorChild, vp];
      result.push(construction("NegatedVP", "NegVP", children, {
        note: "Productive Cantonese negated VP: 唔 + VP, preserving the positive VP as a visible child.",
        slots: templateDerivedSlots("NegatedVP", children),
        trace: traceInfo("generative_template", {
          construction_type: "NegatedVP",
          template_family: "generative_template",
          template: ["m4_negator!", "vp!"],
          assigned_slots: ["m4_negator", "vp"],
          surfaces: children.map((node) => flattenSurface(node)),
          reason: "Negation wraps an already formed VP so the negator cannot detach and the VP's internal object/complement structure remains visible.",
        }),
      }));
      index += 2;
      continue;
    }
    result.push(nodes[index]);
    index += 1;
  }
  return result;
}

function wrapPredicate(nodes) {
  if (!nodes.length) return nodes;

  // Productive degree/manner + 啲 phrase, e.g. 快啲 / 慢啲 / 貴啲 / 大聲啲 / 小心啲.
  // Keep this as one unified generative-template path before comparative/stative
  // fallbacks can split the same surface into unrelated learner roles.
  const degreeMannerIndex = nodes.findIndex((node, index) => nodeCanFillSlot(node, "degree_manner_head") && nodeCanFillSlot(nodes[index + 1], "degree_particle"));
  if (degreeMannerIndex >= 0) {
    const degreeManner = categorySubspanFor(nodes.slice(degreeMannerIndex, degreeMannerIndex + 2), ["DegreeMannerAdverbial"]);
    if (degreeManner) {
      return [
        ...nodes.slice(0, degreeMannerIndex),
        degreeManner,
        ...wrapPredicate(nodes.slice(degreeMannerIndex + 2)),
      ];
    }
  }

  // Existing one-token degree/stative phrases such as 好好食, 好貴, 抵食.
  if (nodes.length === 1 && isStativeToken(nodes[0])) {
    return [construction("StativePredicate", "Stative", nodes, { note: "Stative/property predicate fragment.", trace: traceInfo("generative_template", { construction_type: "StativePredicate", template_family: "generative_template", template: ["stative_predicate!"], assigned_slots: ["stative_predicate"], rule: "single stative token", reason: "Generated label/syntax indicates stative." }) })];
  }

  // Degree/stative: 好 開心, 太 貴, 有啲 貴
  if (nodes.length >= 2 && ["好", "太", "幾", "有啲"].some((s) => isToken(nodes[0], s)) && isStativeToken(nodes[1])) {
    return [construction("StativePredicate", "Stative", nodes, { note: "Degree + stative/property predicate.", trace: traceInfo("generative_template", { construction_type: "StativePredicate", template_family: "generative_template", template: ["degree!", "stative_predicate!"], assigned_slots: ["degree", "stative_predicate"], rule: "degree + stative", reason: "Structural stative predicate template." }) })];
  }

  // Negated stative: 唔 開心 / 唔 好食
  if (nodes.length >= 2 && isToken(nodes[0], "唔") && isStativeToken(nodes[1])) {
    return [construction("StativePredicate", "NegStative", nodes, { note: "Negated stative/property predicate.", trace: traceInfo("generative_template", { construction_type: "StativePredicate", template_family: "generative_template", template: ["negator!", "stative_predicate!"], assigned_slots: ["negator", "stative_predicate"], rule: "唔 + stative", reason: "Structural negated stative predicate template." }) })];
  }

  // Standalone stative.
  if (nodes.length === 1 && isStativeToken(nodes[0])) {
    return [construction("StativePredicate", "Stative", nodes, { note: "Stative/property predicate fragment.", trace: traceInfo("generative_template", { construction_type: "StativePredicate", template_family: "generative_template", template: ["stative_predicate!"], assigned_slots: ["stative_predicate"], rule: "single stative token", reason: "Generated label/syntax indicates stative." }) })];
  }

  return nodes;
}

function scalarEvaluationFallback(core) {
  if (!hasSurface(core, "唔") || !hasSurface(core, "算") || !hasSurface(core, "貴")) return null;
  return construction("ScalarEvaluation", "ValueEval", core, {
    slots: ["scalar_evaluation", "evaluation_clause", "predicate", "stative_predicate", "negator", "evaluation_marker"],
    note: "Negative lexical 算 evaluation with an overt property predicate; visible subject/topic material remains outside the lexical predicate relation.",
    trace: traceInfo("generative_template", {
      construction_type: "ScalarEvaluation",
      template_family: "generative_template",
      template: ["negator!", "evaluation_marker!", "degree?", "stative_predicate!", "particle?"],
      assigned_slots: ["negator", "evaluation_marker", "stative_predicate"],
      polarity_profile: "negative",
      scalar_domain: "price",
      semantic_domain: "price_property",
      rule: "negator + evaluation marker + stative/scalar predicate",
      reason: "Uses the source-linked negative 算 evaluation profile; price is contextual metadata and negative polarity remains trace metadata.",
      surfaces: core.map((node) => flattenSurface(node)),
    })
  });
}

  return {
    wrapNegatedVPSubspans,
    wrapPredicate,
    scalarEvaluationFallback
  };
};
