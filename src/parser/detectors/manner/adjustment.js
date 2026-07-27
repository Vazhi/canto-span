"use strict";

module.exports = function createMannerAdjustmentDetectors(dependencies = {}) {
  const {
    applyConstructionPatterns, categorySubspanFor, cleanSlots, construction, flattenSurface, isToken, nodeCanFillSlot, nodeSurfaceMatches, parserInactiveTokenClone, templateDerivedSlots, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles
  } = dependencies;

function sourceLinkedDegreeMannerModifiedVPFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  const fusedModifier = isToken(compact[0], "快啲");
  const splitModifier = isToken(compact[0], "快") && isToken(compact[1], "啲");
  if (!fusedModifier && !splitModifier) return null;
  const modifierLength = fusedModifier ? 1 : 2;
  if (compact.length <= modifierLength) return null;
  const modifier = categorySubspanFor(compact.slice(0, modifierLength), ["DegreeMannerAdverbial"]);
  let predicate = categorySubspanFor(compact.slice(modifierLength), [
    "CompoundDirectionalMotionVP",
    "DirectionalMotionVP",
    "VerbComplementVP",
  ]);
  if (!predicate && compact.length === modifierLength + 3) {
    const directional = categorySubspanFor(compact.slice(modifierLength + 1), ["DirectionalMotionVP"]);
    predicate = directional
      ? categorySubspanFor([compact[modifierLength], directional], ["VerbComplementVP"])
      : null;
  }
  if (!modifier || !predicate || !nodeCanFillSlot(predicate, "vp")) return null;
  const children = [modifier, predicate, ...particles];
  return construction("DegreeMannerModifiedVP", "DegMannerVP", children, {
    note: "Source-linked preposed 快啲 modifier over a visible directional VP.",
    slots: templateDerivedSlots("DegreeMannerModifiedVP", children),
    trace: traceInfo("generative_template", {
      construction_type: "DegreeMannerModifiedVP",
      template: ["degree_manner_adverbial!", "directional_motion_vp!", "particle?"],
      constraints: { modifier_surface: "快啲", preserve_inner_directional_vp: true },
      assigned_slots: ["degree_manner_adverbial", "directional_motion_vp", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "Preserves the exact sourced preposed order without conflating postverbal 行快啲 or punctuation-separated material.",
    }),
  });
}

function mannerAdverbialVPFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const offset = bareCore.length >= 4 && nodeCanFillSlot(bareCore[0], "subject") ? 1 : 0;
  const remainder = bareCore.slice(offset);
  if (remainder.length < 3) return null;

  const first = remainder[0];
  const second = remainder[1];
  if (flattenSurface(first) !== flattenSurface(second)) return null;
  if (!nodeCanFillSlot(first, "stative_predicate") || !nodeCanFillSlot(second, "stative_predicate")) return null;

  const overtAdverbializer = remainder.length >= 4 && nodeSurfaceMatches(remainder[2], ["咁", "噉"])
    ? remainder[2]
    : null;
  if (!overtAdverbializer && remainder.length !== 3) return null;
  const predicateCore = remainder.slice(overtAdverbializer ? 3 : 2);
  if (!predicateCore.length) return null;

  const wrappedPredicate = overtAdverbializer ? applyConstructionPatterns(predicateCore) : predicateCore;
  if (wrappedPredicate.length !== 1) return null;
  const predicate = wrappedPredicate[0];
  if (!nodeCanFillSlot(predicate, "action_verb")
      && !nodeCanFillSlot(predicate, "movement_verb")
      && !nodeCanFillSlot(predicate, "vp")) return null;

  const mannerChildren = [first, second].map((node) => parserInactiveTokenClone(node, {
    label: "how", pos: "adverb", syntax: "reduplicated_manner_adverb",
    slots: ["manner", "modifier", "how"],
    reason: "Reduplicated property word functions adverbially as manner before the action predicate.",
  }));
  const adverbializerChildren = overtAdverbializer ? [parserInactiveTokenClone(overtAdverbializer, {
    label: "how", pos: "adverbializer", syntax: "manner_adverbializer",
    slots: ["manner", "modifier", "how"],
    reason: "咁/噉 overtly links the preceding manner expression to the following predicate in this construction.",
  })] : [];
  const predicateChildren = predicate.kind === "construction" ? [predicate] : [parserInactiveTokenClone(predicate, {
    label: predicate.label || "doing", pos: "verb", syntax: `${predicate.syntax || "verb"} manner_modified_predicate`,
    slots: ["action_verb", "main_verb", "predicate", "vp"],
    reason: "Action predicate modified by the preceding reduplicated manner expression.",
  })];
  const children = [...bareCore.slice(0, offset), ...mannerChildren, ...adverbializerChildren, ...predicateChildren, ...particles];
  return construction("MannerAdverbialVP", "MannerVP", children, {
    note: overtAdverbializer
      ? "Manner-modified predicate with a reduplicated manner expression and overt 咁/噉, e.g. 慢慢噉食飯."
      : "Manner-modified predicate with a reduplicated manner expression, e.g. 慢慢行.",
    slots: cleanSlots(["manner_adverbial_vp", "manner", "modifier", "vp", "action_vp", "predicate", offset ? "subject" : "", ...templateDerivedSlots("MannerAdverbialVP", children)]),
    trace: traceInfo("generative_template", {
      construction_type: "MannerAdverbialVP", template_family: "generative_template",
      template: ["subject?", "reduplicated_manner!", "manner_adverbializer?", "predicate!", "particle?"],
      assigned_slots: [
        ...bareCore.slice(0, offset).map(() => "subject"),
        "manner", "manner",
        ...adverbializerChildren.map(() => "manner_adverbializer"),
        "predicate",
        ...particles.map(() => "particle"),
      ],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: overtAdverbializer
        ? "A repeated stative/property form followed by overt 咁/噉 modifies the following action predicate while every surface piece remains visible."
        : "A repeated stative/property form before an action is interpreted as a manner adverbial while every surface piece remains visible.",
      not_claims: ["not_every_reduplicated_stative_is_manner", "not_every_gam_is_manner_adverbializer"],
    }),
  });
}

  return {
    sourceLinkedDegreeMannerModifiedVPFallback,
    mannerAdverbialVPFallback
  };
};
