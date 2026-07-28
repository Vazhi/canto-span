"use strict";

module.exports = function createBasicPredicateDetectors(dependencies = {}) {
  const {
    construction, flattenSurface, hasSurface, isToken, nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots, traceInfo
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
    scalarEvaluationFallback
  };
};
