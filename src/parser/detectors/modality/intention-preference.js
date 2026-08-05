"use strict";

module.exports = function createIntentionPreferenceDetectors(dependencies = {}) {
  const {
    categorySubspanFor, construction, flattenSurface, hasSurface, isToken,
    nodeCanFillSlot, templateConstructionFor, templateDerivedSlots, traceInfo,
    withoutIgnorableSpaceText, withoutTrailingParticles,
  } = dependencies;

  function sourceLinkedIntentionFrameFallback(core) {
    const { core: bareCore, particles } = withoutTrailingParticles(core);
    const compact = withoutIgnorableSpaceText(bareCore);
    if (compact.length < 3) return null;
    const [subject, intentionPredicate, ...predicateNodes] = compact;
    if (!nodeCanFillSlot(subject, "subject") || !isToken(intentionPredicate, "諗住")) return null;
    const predicate = categorySubspanFor(predicateNodes, [
      "DirectionalMotionVP",
      "CompoundDirectionalMotionVP",
      "VerbComplementVP",
      "TransitiveVP",
      "ProductiveVO",
    ]);
    if (!predicate || !nodeCanFillSlot(predicate, "vp")) return null;
    const children = [subject, intentionPredicate, predicate, ...particles];
    return construction("IntentionFrame", "Intention", children, {
      note: "Source-linked lexical intention profile: overt subject + 諗住 + visible VP.",
      slots: templateDerivedSlots("IntentionFrame", children),
      trace: traceInfo("generative_template", {
        construction_type: "IntentionFrame",
        template: ["subject!", "intention_predicate!", "vp!", "particle?"],
        constraints: { slot_surface_in: { intention_predicate: ["諗住"] } },
        assigned_slots: ["subject", "intention_predicate", "vp", ...particles.map(() => "particle")],
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Runs before broad VP-complement subspan wrapping so the overt subject and lexical intention predicate remain visible.",
      }),
    });
  }

  function sourceLinkedPreferenceVPFallback(core) {
    const { core: bareCore, particles } = withoutTrailingParticles(core);
    const compact = withoutIgnorableSpaceText(bareCore);
    if (compact.length < 3 || !nodeCanFillSlot(compact[0], "subject") || !isToken(compact[1], "鍾意")) return null;
    const complement = categorySubspanFor(compact.slice(2), [
      "TransitiveVP",
      "ProductiveVO",
      "DirectionalMotionVP",
      "CompoundDirectionalMotionVP",
      "VerbComplementVP",
    ]);
    if (!complement || !nodeCanFillSlot(complement, "vp")) return null;
    const children = [compact[0], compact[1], complement, ...particles];
    return construction("PreferenceVP", "Preference", children, {
      note: "Source-linked preference predicate with an overt subject and visible activity VP complement.",
      slots: templateDerivedSlots("PreferenceVP", children),
      trace: traceInfo("generative_template", {
        construction_type: "PreferenceVP",
        template: ["subject!", "preference_predicate!", "vp!", "particle?"],
        constraints: { slot_surface_in: { preference_predicate: ["鍾意"] } },
        assigned_slots: ["subject", "preference_predicate", "vp", ...particles.map(() => "particle")],
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Runs before broad nominal wrapping so the sourced 鍾意 + activity complement remains visible.",
      }),
    });
  }

  function rawPreferenceTemplateFallback(core) {
    return null;
  }

  function desiderativeVPWrapCoreFallback(core) {
    if (!hasSurface(core, "想") || (!hasSurface(core, "好") && !hasSurface(core, "試吓"))) return null;
    return construction("DesiderativeVP", "WantVP", core, {
      note: "Desire/wanting construction, often 好想 + VP.",
      trace: traceInfo("legacy_surface_rule", {
        rule: "has 想 plus degree/VP",
        reason: "Surface modal fallback.",
      }),
    });
  }

  function preferenceVPWrapCoreFallback(core) {
    return null;
  }

  return {
    desiderativeVPWrapCoreFallback,
    preferenceVPWrapCoreFallback,
    rawPreferenceTemplateFallback,
    sourceLinkedIntentionFrameFallback,
    sourceLinkedPreferenceVPFallback,
  };
};
