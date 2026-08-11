"use strict";

const POSTPREDICATE_GWO3_COMPARISON_PREDICATES = new Set(
  require("../../runtime-resources/grammar/postpredicate-gwo3-comparison"),
);

module.exports = function createWrapPredicate(dependencies = {}) {
  const {
    categorySubspanFor,
    construction,
    isStativeToken,
    isToken,
    nodeCanFillSlot,
    traceInfo,
  } = dependencies;

function simpleNominalComparisonArgument(node) {
  if (!node || node.kind !== "token") return false;
  if (nodeCanFillSlot(node, "subject") || nodeCanFillSlot(node, "np") || nodeCanFillSlot(node, "object")) return true;
  return ["who", "what"].includes(node.label);
}

function comparisonMarkerClone(node) {
  return {
    ...node,
    label: "func",
    role: "func",
    pos: "function",
    syntax: "comparison_marker surpass_comparative_marker",
    slots: ["comparison_marker"],
    note: "post-predicate comparison marker: surpass / more ... than",
    features: undefined,
    feature_bundle: undefined,
    trace: traceInfo("generative_or_heuristic_slot_rule", {
      surface: node.surface,
      contextual_role_override: "postpredicate_gwo3_comparison_marker",
      original_trace: node.trace && node.trace.kind || "",
      generated_slots: ["comparison_marker"],
      reason: "Inside the bounded stative + 過 + overt-standard behavior, 過 is interpreted as the visible comparison marker rather than experiential aspect.",
    }),
  };
}

function postPredicateGwo3Comparison(nodes) {
  if (nodes.length !== 4) return null;
  const [target, predicate, marker, standard] = nodes;
  if (!simpleNominalComparisonArgument(target) || !simpleNominalComparisonArgument(standard)) return null;
  if (!isStativeToken(predicate) || !POSTPREDICATE_GWO3_COMPARISON_PREDICATES.has(predicate.surface)) return null;
  if (!isToken(marker, "過")) return null;

  const markerChild = comparisonMarkerClone(marker);
  const children = [target, predicate, markerChild, standard];
  return construction("SubjectPredicateClause", "SubjPred", children, {
    slots: [
      "subject_predicate_clause",
      "subject",
      "predicate",
      "clause",
      "stative_predicate",
      "comparison_target",
      "comparison_predicate",
      "comparison_marker",
      "comparison_standard",
    ],
    note: "Behavior-first overt-standard post-predicate 過 comparison. SubjectPredicateClause remains the structural label; the comparison function is exposed through explicit trace bindings.",
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      predicate_subtype: "postpredicate_gwo3_surpass_comparison",
      template: ["comparison_target!", "comparison_predicate!", "comparison_marker!", "comparison_standard!"],
      assigned_slots: ["comparison_target", "comparison_predicate", "comparison_marker", "comparison_standard"],
      surfaces: children.map((node) => node.surface || ""),
      structural_scope: "clause",
      not_claims: [
        "not_experiential_gwo3",
        "not_directional_gwo3",
        "not_quantity_comparison_generalization_yet",
        "not_temporal_comparison_generalization_yet",
        "not_bei2_comparative",
        "not_bare_di1_comparative",
        "not_equative_or_superlative",
        "not_open_class_productivity_claim",
      ],
      reason: "Cycle 1 GREEN behavior: overt simple nominal target + bounded gradable stative predicate + 過 + overt simple nominal comparison standard.",
    }),
  });
}

function wrapPredicate(nodes) {
  if (!nodes.length) return nodes;

  // Behavior-first cycle 1: detect the comparative relation before generic
  // stative fragment wrapping. This is intentionally narrower than the full
  // Cantonese comparative system and does not create a new public label.
  const comparative = postPredicateGwo3Comparison(nodes);
  if (comparative) return [comparative];

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
