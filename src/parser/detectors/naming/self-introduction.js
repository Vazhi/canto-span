"use strict";

module.exports = function createNamingDetectors(dependencies = {}) {
  const {
    construction,
    firstToken,
    flattenSurface,
    isToken,
    nameTokenClone,
    nodeCanFillSlot,
    parserInactiveTokenClone,
    templateDerivedSlots,
    traceInfo,
    withoutIgnorableSpaceText,
    withoutTrailingParticles,
  } = dependencies;

function namingVerbClone(node) {
  return parserInactiveTokenClone(node, {
    label: "doing",
    pos: "verb",
    syntax: "naming_verb personal_name_predicate",
    slots: ["naming_verb", "main_verb", "predicate"],
    reason: "叫 is the source-linked personal naming predicate in this bounded clause.",
  });
}

function namingSelfIntroductionFrameFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length !== 3) return null;
  const [subject, naming, name] = compact;
  if (!nodeCanFillSlot(subject, "subject")) return null;
  if (!isToken(naming, "叫")) return null;
  if (!nodeCanFillSlot(name, "np") && !nodeCanFillSlot(name, "head_noun") && !nodeCanFillSlot(name, "subject")) return null;
  const children = [subject, namingVerbClone(naming), nameTokenClone(firstToken(name) || name), ...particles];
  return construction("NamingClause", "Called", children, {
    note: "Source-linked personal naming clause: subject + 叫 + visible personal name.",
    slots: templateDerivedSlots("NamingClause", children),
    trace: traceInfo("generative_template", {
      construction_type: "NamingClause",
      template: ["subject!", "naming_verb!", "name!", "particle?"],
      assigned_slots: ["subject", "naming_verb", "name", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "Retains the sourced personal 叫 + name relation while keeping 叫做 definition/category-label uses separate.",
    }),
  });
}

  return {
    namingSelfIntroductionFrameFallback,
  };
};
