"use strict";

module.exports = function createAvailabilityDetectors(dependencies = {}) {
  const {
    construction,
    constructionSlotsByType,
    flattenSurface,
    nodeCanFillSlot,
    parserInactiveTokenClone,
    templateConstructionFor,
    traceInfo,
    withoutIgnorableSpaceText,
    withoutTrailingParticles,
  } = dependencies;

  const LEXICAL_QUARANTINE = new Set([
    "冇得頂",
    "冇得講",
    "冇得計",
    "冇得搞",
    "有得諗",
  ]);

  function surfaceIs(node, values) {
    return values.includes(flattenSurface(node));
  }

  function availabilityHeadPlan(nodes) {
    if (!nodes.length) return null;
    if (surfaceIs(nodes[0], ["有得"])) {
      return { end: 1, polarity: "affirmative", headSurface: "有得", questionStrategy: "none" };
    }
    if (surfaceIs(nodes[0], ["冇得"])) {
      return { end: 1, polarity: "negative", headSurface: "冇得", questionStrategy: "none" };
    }
    if (surfaceIs(nodes[0], ["有冇得"])) {
      return { end: 1, polarity: "interrogative", headSurface: "有冇得", questionStrategy: "suppletive_jau_mou" };
    }
    if (nodes.length >= 2 && surfaceIs(nodes[0], ["有"]) && surfaceIs(nodes[1], ["得"])) {
      return { end: 2, polarity: "affirmative", headSurface: "有+得", questionStrategy: "none" };
    }
    if (nodes.length >= 2 && surfaceIs(nodes[0], ["冇"]) && surfaceIs(nodes[1], ["得"])) {
      return { end: 2, polarity: "negative", headSurface: "冇+得", questionStrategy: "none" };
    }
    if (nodes.length >= 2 && surfaceIs(nodes[0], ["有冇"]) && surfaceIs(nodes[1], ["得"])) {
      return { end: 2, polarity: "interrogative", headSurface: "有冇+得", questionStrategy: "suppletive_jau_mou" };
    }
    if (nodes.length >= 3 && surfaceIs(nodes[0], ["有"]) && surfaceIs(nodes[1], ["冇"]) && surfaceIs(nodes[2], ["得"])) {
      return { end: 3, polarity: "interrogative", headSurface: "有+冇+得", questionStrategy: "suppletive_jau_mou" };
    }
    return null;
  }

  function predicateFromNodes(nodes) {
    if (!nodes.length) return null;
    if (nodes.length === 1 && (
      nodeCanFillSlot(nodes[0], "predicate")
      || nodeCanFillSlot(nodes[0], "vp")
      || nodeCanFillSlot(nodes[0], "action_verb")
      || nodeCanFillSlot(nodes[0], "stative_predicate")
    )) return nodes[0];
    const templated = templateConstructionFor(nodes, [
      "ActionStativeVP",
      "DegreeMannerModifiedVP",
      "DirectionalMotionVP",
      "IntransitiveVP",
      "MannerAdverbialVP",
      "MotionGoalVP",
      "MotionPurposeChain",
      "ProductiveVO",
      "SerialVerbPurposeChain",
      "StativePredicate",
      "TransitiveVP",
      "VerbComplementVP",
    ]);
    if (templated && nodeCanFillSlot(templated, "predicate")) return templated;
    if (nodes.length >= 2
        && nodeCanFillSlot(nodes[0], "action_verb")
        && nodes.slice(1).some((node) =>
          nodeCanFillSlot(node, "object")
          || nodeCanFillSlot(node, "np")
          || nodeCanFillSlot(node, "head_noun")
        )) {
      return construction("TransitiveVP", "VP", nodes, {
        slots: constructionSlotsByType("TransitiveVP", nodes),
        trace: traceInfo("generative_template", {
          construction_type: "TransitiveVP",
          template_family: "generative_template",
          template: ["action_verb!", "object!"],
          assigned_slots: ["action_verb", "object"],
          surfaces: nodes.map((node) => flattenSurface(node)),
          subspan: true,
          reason: "Provides an independently typed object-bearing predicate child for the 有得／冇得 availability relation.",
        }),
      });
    }
    return null;
  }

  function availabilityHeadToken(node, plan, index) {
    const surface = flattenSurface(node);
    return parserInactiveTokenClone(node, {
      label: "func",
      syntax: "availability_opportunity_marker",
      slots: ["availability_marker", "polarity_marker"],
      note: `${surface} marks the 有得／冇得 availability relation.`,
      reason: "有得／冇得 is active as the overt availability head, not ordinary possessive/existential 有／冇 plus independent 得.",
      trace_detail: {
        relation_subtype: "availability_opportunity",
        availability_polarity: plan.polarity,
        head_surface: plan.headSurface,
        question_strategy: plan.questionStrategy,
        head_index: index,
      },
    });
  }

  function lexicalQuarantineApplies(headNodes, predicate) {
    const headSurface = headNodes.map((node) => flattenSurface(node)).join("");
    const predicateSurface = flattenSurface(predicate);
    return LEXICAL_QUARANTINE.has(`${headSurface}${predicateSurface}`);
  }

  function availabilityPredicateFromNodes(nodes) {
    const { core, particles } = withoutTrailingParticles(nodes || []);
    const compact = withoutIgnorableSpaceText(core);
    if (!compact.length) return null;
    const plan = availabilityHeadPlan(compact);
    if (!plan) return null;
    const predicateNodes = compact.slice(plan.end);
    const predicate = predicateFromNodes(predicateNodes);
    if (!predicate) return null;
    const headNodes = compact.slice(0, plan.end);
    if (lexicalQuarantineApplies(headNodes, predicate)) return null;
    const children = [
      ...headNodes.map((node, index) => availabilityHeadToken(node, plan, index)),
      predicate,
    ];
    return {
      span: construction("JauDakMouDakAvailabilityPredicate", "Availability", children, {
        slots: constructionSlotsByType("JauDakMouDakAvailabilityPredicate", children),
        note: "Preverbal 有得／冇得 marks whether the following overt predicate event is available, possible, unavailable, or impossible.",
        trace: traceInfo("source_linked_runtime_matcher", {
          construction_type: "JauDakMouDakAvailabilityPredicate",
          relation_subtype: "availability_opportunity",
          polarity: plan.polarity,
          head_surface: plan.headSurface,
          question_strategy: plan.questionStrategy,
          predicate_surface: flattenSurface(predicate),
          lexical_quarantine_checked: true,
          hidden_material_inserted: false,
          source_specification: "docs/research/JAU-MOU-DAK-AVAILABILITY-IDENTITY-SPECIFICATION-R1.md",
          reason: "Matches the accepted source-first 有得／冇得 + overt predicate availability identity while preserving the predicate as an independently typed child.",
        }),
      }),
      particles,
    };
  }

  function availabilityPredicateWrapCoreFallback(core) {
    const compact = withoutIgnorableSpaceText(core || []);
    for (let index = 0; index < compact.length; index += 1) {
      const planned = availabilityPredicateFromNodes(compact.slice(index));
      if (!planned) continue;
      return [
        ...compact.slice(0, index),
        planned.span,
        ...planned.particles,
      ];
    }
    return null;
  }

  return {
    availabilityPredicateWrapCoreFallback,
  };
};
