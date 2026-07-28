"use strict";

module.exports = function createWrapPredicate(dependencies = {}) {
  const {
    categorySubspanFor,
    construction,
    isStativeToken,
    isToken,
    nodeCanFillSlot,
    traceInfo,
  } = dependencies;

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

  return {
    wrapPredicate,
  };
};
