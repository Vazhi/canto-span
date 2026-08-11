"use strict";

module.exports = function createPostPredicateGwo3ComparativeDetectors(dependencies = {}) {
  const {
    cleanSlots,
    construction,
    firstToken,
    flattenSurface,
    isToken,
    nodeCanFillSlot,
    parserInactiveTokenClone,
    traceInfo,
    withoutIgnorableSpaceText,
    withoutTrailingParticles,
  } = dependencies;

  // GREEN scope is intentionally narrower than the full Cantonese comparative system.
  // These predicates are already represented as gradable/statative lexical items and
  // establish reusable property + 過 + overt nominal-standard behavior.
  const REVIEWED_SCALAR_PREDICATES = new Set([
    "大", "細", "貴", "平", "快", "慢", "忙", "遠", "近", "高", "矮", "耐",
    "熱", "凍", "難", "易", "正", "抵", "靚", "甜", "熟", "開心",
  ]);

  function simpleToken(node) {
    if (!node || node.kind !== "token") return null;
    return firstToken(node) || node;
  }

  function overtNominalComparisonArgument(node) {
    const tokenNode = simpleToken(node);
    if (!tokenNode) return false;
    if (nodeCanFillSlot(node, "subject") || nodeCanFillSlot(node, "np") || nodeCanFillSlot(node, "head_noun") || nodeCanFillSlot(node, "object")) return true;
    return ["who", "what"].includes(tokenNode.label);
  }

  function comparativePartClone(node, overrides) {
    const tokenNode = simpleToken(node);
    return parserInactiveTokenClone(tokenNode, overrides);
  }

  function postPredicateGwo3ComparativeFallback(nodes = []) {
    const { core: bareCore, particles } = withoutTrailingParticles(nodes || []);
    const compact = withoutIgnorableSpaceText(bareCore);
    if (compact.length !== 4) return null;

    const [target, predicate, marker, standard] = compact;
    if (!simpleToken(target) || !simpleToken(predicate) || !simpleToken(marker) || !simpleToken(standard)) return null;
    if (!overtNominalComparisonArgument(target) || !overtNominalComparisonArgument(standard)) return null;
    if (!isToken(marker, "過")) return null;

    const predicateSurface = flattenSurface(predicate);
    if (!REVIEWED_SCALAR_PREDICATES.has(predicateSurface)) return null;
    if (!nodeCanFillSlot(predicate, "stative_predicate")) return null;

    const targetChild = comparativePartClone(target, {
      label: simpleToken(target).label,
      pos: simpleToken(target).pos || "np",
      syntax: `${simpleToken(target).syntax || "np"} comparison_target`,
      slots: cleanSlots([...(simpleToken(target).slots || []), "subject", "comparison_target"]),
      reason: "The overt first nominal argument is the comparison target whose scalar property is being compared.",
    });
    const predicateChild = comparativePartClone(predicate, {
      label: simpleToken(predicate).label || "like",
      pos: simpleToken(predicate).pos || "stative",
      syntax: `${simpleToken(predicate).syntax || "stative_predicate"} comparison_predicate`,
      slots: cleanSlots(["comparison_predicate", "stative_predicate", "predicate"]),
      reason: "The overt gradable predicate supplies the scalar dimension in a bounded post-predicate 過 comparison.",
    });
    const markerChild = comparativePartClone(marker, {
      label: "func",
      pos: "function",
      syntax: "comparison_marker surpass_comparative_marker",
      slots: cleanSlots(["comparison_marker"]),
      reason: "Here 過 is the overt comparison marker between a gradable predicate and its standard, not experiential aspect.",
    });
    const standardChild = comparativePartClone(standard, {
      label: simpleToken(standard).label,
      pos: simpleToken(standard).pos || "np",
      syntax: `${simpleToken(standard).syntax || "np"} comparison_standard`,
      slots: cleanSlots([...(simpleToken(standard).slots || []), "comparison_standard"]),
      reason: "The overt final nominal argument supplies the comparison standard introduced by post-predicate 過.",
    });

    const children = [targetChild, predicateChild, markerChild, standardChild, ...particles];
    return construction("SubjectPredicateClause", "SubjPred", children, {
      slots: cleanSlots([
        "subject_predicate_clause", "subject", "predicate", "clause", "stative_predicate",
        "comparison_target", "comparison_predicate", "comparison_marker", "comparison_standard",
      ]),
      note: "Behavior-first bounded overt-standard post-predicate 過 comparison. The generic SubjectPredicateClause identity is retained while comparative function is represented by explicit behavior bindings.",
      trace: traceInfo("generative_template", {
        construction_type: "SubjectPredicateClause",
        template_family: "generative_template",
        predicate_subtype: "postpredicate_gwo3_surpass_comparison",
        template: ["comparison_target!", "comparison_predicate!", "comparison_marker!", "comparison_standard!", "particle?"],
        assigned_slots: ["subject", "comparison_predicate", "comparison_marker", "comparison_standard", ...particles.map(() => "particle")],
        bindings: [
          { slot: "comparison_target", source_surface: flattenSurface(target) },
          { slot: "comparison_predicate", source_surface: predicateSurface },
          { slot: "comparison_marker", source_surface: "過" },
          { slot: "comparison_standard", source_surface: flattenSurface(standard) },
        ],
        surfaces: children.map((node) => flattenSurface(node)),
        structural_scope: "clause",
        source_specification: "docs/research/BEHAVIOR-GWO3-COMPARATIVE-TDD-R1.md",
        not_claims: [
          "not_experiential_gwo3",
          "not_directional_gwo3",
          "not_temporal_comparison_generalization_yet",
          "not_quantity_comparison_generalization_yet",
          "not_bei2_comparative",
          "not_bare_di1_comparative",
          "not_equative_or_superlative",
          "not_open_class_productivity_claim",
        ],
        reason: "Cycle 1 GREEN implementation: require an overt simple nominal target, reviewed gradable predicate, literal 過 marker, and overt simple nominal comparison standard. Experiential and directional uses fail the predicate/argument contract.",
      }),
    });
  }

  return { postPredicateGwo3ComparativeFallback };
};
