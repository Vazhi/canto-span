"use strict";

module.exports = function createDetectors(dependencies = {}) {
  const {
    categorySubspanFor, construction, flattenSurface, isToken, nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles
  } = dependencies;

function interiorExistentialFrameFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length < 6) return null;
  const yauIndex = compact.findIndex((node) => isToken(node, "有"));
  if (yauIndex < 0) return null;
  const locationIndex = compact.findIndex((node) => isToken(node, "入面") || isToken(node, "入邊"));
  if (locationIndex <= 0 || locationIndex >= yauIndex) return null;
  const topicNodes = compact.slice(0, locationIndex);
  const between = compact.slice(locationIndex + 1, yauIndex);
  if (between.length < 1 || between.length > 2) return null;
  const topic = categorySubspanFor(topicNodes, ["OvertHeadDemonstrativeClassifierNP", "OrdinalClassifierNP", "ModifiedNP", "NominalHeadSpan"]) || (topicNodes.length === 1 ? topicNodes[0] : null);
  if (!topic || !nodeCanFillSlot(topic, "topic")) return null;
  const wh = between[0];
  const focus = between.length === 2 ? between[1] : null;
  if (!nodeCanFillSlot(wh, "wh_object") && !nodeCanFillSlot(wh, "head_noun") && !nodeCanFillSlot(wh, "object")) return null;
  if (focus && !nodeCanFillSlot(focus, "focus_adverb") && !nodeCanFillSlot(focus, "how")) return null;
  const existential = parserInactiveTokenClone(compact[yauIndex], {
    label: "func",
    pos: "function",
    syntax: "existential interior_existential",
    slots: ["existential", "predicate"],
    reason: "有 is interpreted as the existential predicate inside a bounded interior-existential frame.",
  });
  const children = [topic, compact[locationIndex], wh, ...(focus ? [focus] : []), existential, ...particles];
  return construction("LocativeExistentialClause", "LocExist", children, {
    note: "v0.5.33 interior existential frame: topic + 入面/入邊 + 乜嘢 + 都 + 有.",
    slots: templateDerivedSlots("LocativeExistentialClause", children),
    trace: traceInfo("generative_template", {
      construction_type: "LocativeExistentialClause",
      template: ["topic!", "location!", "wh_object!", ...(focus ? ["focus_adverb?"] : []), "existential!", "particle?"],
      assigned_slots: ["topic", "location", "wh_object", ...(focus ? ["focus_adverb"] : []), "existential", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "Promotes the bounded corpus pattern for 'has everything inside' without creating broad 有 existential grammar.",
    }),
  });
}

  return {
    interiorExistentialFrameFallback
  };
};
