"use strict";

module.exports = function createImperativeDetectors(dependencies = {}) {
  const {
    categorySubspanFor, construction, directPredicateCapableNode, flattenSurface, isToken, mergeUnique, nodeCanFillSlot, parserInactiveTokenClone, pathPhraseFromParts, templateDerivedSlots, traceInfo, transparentDiscourseFormulaFallback, withoutIgnorableSpaceText, withoutTrailingParticles
  } = dependencies;

function politeRequestAdjustmentFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length < 3) return null;
  const formulaSurface = flattenSurface(compact[0]);
  if (formulaSurface !== "唔該") return null;
  const addressee = compact[1];
  if (!nodeCanFillSlot(addressee, "subject")) return null;
  const adjustmentNodes = compact.slice(2);
  const adjustment = adjustmentNodes.length === 1 && adjustmentNodes[0].kind === "construction" && adjustmentNodes[0].type === "DegreeMannerAdverbial"
    ? adjustmentNodes[0]
    : categorySubspanFor(adjustmentNodes, ["DegreeMannerAdverbial"]);
  if (!adjustment || flattenSurface(adjustment) !== adjustmentNodes.map((node) => flattenSurface(node)).join("")) return null;
  const formula = compact[0].kind === "construction" && compact[0].type === "FormulaDiscourseUnit"
    ? compact[0]
    : transparentDiscourseFormulaFallback([compact[0]]);
  if (!formula || formula.type !== "FormulaDiscourseUnit") return null;
  const children = [formula, addressee, adjustment, ...particles];
  return construction("PoliteImperativeClause", "PoliteImperative", children, {
    note: "Source-linked polite adjustment request: 唔該 + addressee + scalar adjustment.",
    slots: mergeUnique(templateDerivedSlots("PoliteImperativeClause", children), ["polite_imperative_clause", "imperative", "politeness_marker", "subject", "modifier", "predicate", "clause"]),
    trace: traceInfo("generative_template", {
      construction_type: "PoliteImperativeClause",
      template: ["politeness_formula!", "addressee!", "scalar_adjustment!", "particle?"],
      assigned_slots: ["politeness_marker", "subject", "modifier", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "A conventional 唔該 request formula addresses a person and scopes over a following scalar adjustment while all overt material remains visible.",
      not_claims: ["not_every_m4_goi1_is_an_imperative", "not_equivalent_to_cing2_in_all_registers", "not_unrestricted_productivity"],
    }),
  });
}

function politePathImperativeFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length < 5) return null;
  if (!isToken(compact[0], "請")) return null;
  if (!nodeCanFillSlot(compact[1], "subject")) return null;
  let index = 2;
  const time = nodeCanFillSlot(compact[index], "time") ? compact[index++] : null;
  const marker = compact[index++];
  const path = compact[index++];
  const predicate = compact[index++];
  if (index !== compact.length) return null;
  if (!isToken(marker, "沿住")) return null;
  if (!nodeCanFillSlot(path, "location") && !nodeCanFillSlot(path, "goal")) return null;
  if (!directPredicateCapableNode(predicate)) return null;
  const polite = parserInactiveTokenClone(compact[0], {
    label: "func",
    pos: "function",
    syntax: "politeness_imperative_marker",
    slots: ["politeness_marker", "imperative_marker"],
    reason: "請 is interpreted as the politeness marker inside a bounded path imperative.",
  });
  const pathPhrase = pathPhraseFromParts(marker, path);
  const children = [polite, compact[1], ...(time ? [time] : []), pathPhrase, predicate, ...particles];
  return construction("PoliteImperativeClause", "PoliteImperative", children, {
    note: "v0.5.32 polite path imperative: 請 + addressee + optional time + 沿住 + path + motion/action predicate.",
    slots: templateDerivedSlots("PoliteImperativeClause", children),
    trace: traceInfo("generative_template", {
      construction_type: "PoliteImperativeClause",
      template: ["politeness_marker!", "subject!", ...(time ? ["time?"] : []), "path_phrase!", "predicate!", "particle?"],
      assigned_slots: ["politeness_marker", "subject", ...(time ? ["time"] : []), "path_phrase", "predicate", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "Promotes the reviewed path-command shape without creating broad imperative grammar.",
    }),
  });
}

function prohibitiveImperativeFallback(core) {
  if (!isToken(core[0], "唔好") || core.length < 2) return null;
  return construction("ProhibitiveImperative", "Prohibitive", core, {
    note: "Negative imperative / command.",
    trace: traceInfo("legacy_surface_rule", {
      rule: "唔好 + predicate",
      reason: "Surface prohibitive marker fallback.",
    }),
  });
}

  return {
    politeRequestAdjustmentFallback,
    politePathImperativeFallback,
    prohibitiveImperativeFallback
  };
};
