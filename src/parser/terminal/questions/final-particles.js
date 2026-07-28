"use strict";

module.exports = function createFinalParticleQuestions(dependencies = {}) {
  const {
    applyConstructionPatterns, construction, flattenSurface, fullSpanSingleConstruction,
    isToken, nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots, traceInfo,
    withoutIgnorableSpaceText,
  } = dependencies;

function isExplicitWhQuestionConstruction(node) {
  if (!node || node.kind !== "construction") return false;
  if ([
    "ProgressiveWhObjectQuestion",
    "ExistentialWhQuestion",
    "ScalarValueQuestion",
    "PlaceQuestion",
  ].includes(node.type)) return true;
  return (node.children || []).some(isExplicitWhQuestionConstruction);
}

function isProtectedMeReactionFormula(node) {
  return !!(node
    && node.kind === "construction"
    && node.type === "FormulaDiscourseUnit"
    && node.trace
    && node.trace.formula_type === "confirmation_surprise_question");
}

function propositionLikeHostForFinalMe(nodes) {
  if (!nodes || !nodes.length) return null;
  const wrapped = applyConstructionPatterns(nodes);
  const host = fullSpanSingleConstruction(wrapped, nodes);
  if (!host) return null;
  if (["NeedsContext", "MalformedCandidate", "FragmentQuestion", "FragmentAnswer", "NominalHeadSpan"].includes(host.type)) return null;
  const trace = host.trace || {};
  if (["context_required", "context_incompatible"].includes(trace.context_requirement_status)) return null;
  if (!nodeCanFillSlot(host, "predicate")
      && !nodeCanFillSlot(host, "clause")
      && !nodeCanFillSlot(host, "vp")
      && !nodeCanFillSlot(host, "modal_vp")) return null;
  return host;
}

function finalMeQuestionParticleClone(node) {
  return parserInactiveTokenClone(node, {
    label: "particle",
    pos: "particle",
    syntax: "sentence_final_polar_question_particle biased_question_particle",
    slots: ["particle", "yes_no_question_marker", "question_marker"],
    jyutping: "me1",
    note: "sentence-final polar question particle; often conveys surprise or negative expectation",
    reason: "Final 咩 scopes over a complete proposition-like host as a biased polar-question particle, not as a wh object.",
  });
}

function finalMePolarQuestionFallbackForPunctuation(segment, terminalText = "", ordinaryWrapped = null) {
  if (!/[？?]/u.test(String(terminalText || ""))) return null;
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 2 || !isToken(compact[compact.length - 1], "咩")) return null;

  const ordinaryTop = fullSpanSingleConstruction(ordinaryWrapped, compact);
  if (ordinaryTop && (isExplicitWhQuestionConstruction(ordinaryTop) || isProtectedMeReactionFormula(ordinaryTop))) return null;

  const hostNodes = compact.slice(0, -1);
  const host = propositionLikeHostForFinalMe(hostNodes);
  if (!host) return null;
  const particle = finalMeQuestionParticleClone(compact[compact.length - 1]);
  const children = [host, particle];
  return construction("PolarQuestionFrame", "YesNo?", children, {
    note: "Biased polar question formed by a complete proposition-like host plus sentence-final 咩.",
    slots: templateDerivedSlots("PolarQuestionFrame", children),
    trace: traceInfo("generative_template", {
      construction_type: "PolarQuestionFrame",
      template_family: "generative_template",
      template: ["proposition_host!", "polar_question_particle!"],
      assigned_slots: ["proposition_host", "polar_question_particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      question_family: "polar",
      question_subtype: "biased_sentence_final_me1",
      bias: "negative_expectation_or_surprise",
      proposition_host_construction: host.type,
      proposition_host_surface: flattenSurface(host),
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      antecedent_status: "not_applicable",
      not_claims: ["not_wh_object", "not_wh_determiner", "not_a_not_a_question", "not_fabricated_proposition"],
      reason: "A complete proposition-like host licenses sentence-final 咩 as a biased polar particle. Existing explicit wh-question constructions and protected 係咩 reaction formulae retain precedence.",
    }),
  });
}

  return { finalMePolarQuestionFallbackForPunctuation };
};
