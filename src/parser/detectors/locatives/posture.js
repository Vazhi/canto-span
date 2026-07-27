"use strict";

module.exports = function createLocativePostureDetectors(dependencies = {}) {
  const {
    bridgeFramePartClone,
    cleanSlots,
    construction,
    flattenSurface,
    isToken,
    nodeCanFillSlot,
    templateDerivedSlots,
    traceInfo,
    withoutIgnorableSpaceText,
    withoutTrailingParticles,
  } = dependencies;

function locativePostureVPFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length !== 4 || !nodeCanFillSlot(compact[0], "subject")) return null;
  const [subject, posture, locative, followingEvent] = compact;
  if (!isToken(posture, "坐") || !isToken(locative, "喺度") || !isToken(followingEvent, "等")) return null;

  const locativeChild = bridgeFramePartClone(locative, {
    label: "where",
    pos: "location",
    syntax: "locative_deictic locative_posture_complement",
    slots: ["locative_phrase", "location"],
    reason: "After a posture verb, 喺度 supplies the posture location rather than progressive aspect.",
  });
  const followingEventChild = bridgeFramePartClone(followingEvent, {
    label: "doing",
    pos: "verb",
    syntax: "following_event_predicate",
    slots: ["following_event", "action_verb", "predicate", "vp"],
    reason: "The overt following event remains visible and is not reclassified as an object of the posture predicate.",
  });
  const vpChildren = [posture, locativeChild, followingEventChild, ...particles];
  const vp = construction("LocativePostureVP", "PostureLoc", vpChildren, {
    note: "Source-linked posture-location profile: 坐 + 喺度 with the overt following event preserved.",
    slots: cleanSlots(["locative_posture_vp", "posture_verb", "locative_phrase", "location", "vp", "action_vp", "predicate", ...templateDerivedSlots("LocativePostureVP", vpChildren)]),
    trace: traceInfo("generative_template", {
      construction_type: "LocativePostureVP",
      template_family: "generative_template",
      template: ["posture_verb!", "locative_phrase!", "following_event!"],
      assigned_slots: ["posture_verb", "locative_phrase", "following_event", ...particles.map(() => "particle")],
      surfaces: vpChildren.map((node) => flattenSurface(node)),
      reason: "Retains the exact attested 坐喺度等 sequence without licensing a posture-verb cross-product.",
      not_claims: ["not_progressive_aspect", "not_preverbal_coverb_frame", "not_general_posture_verb_class", "not_following_event_object"],
    }),
  });

  const children = [subject, vp];
  return construction("SubjectPredicateClause", "SubjPred", children, {
    note: "Subject-led locative posture clause preserving the LocativePostureVP predicate child.",
    slots: cleanSlots(["subject_predicate_clause", "subject", "predicate", "clause", "location", ...templateDerivedSlots("SubjectPredicateClause", children)]),
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      predicate_subtype: "locative_posture",
      template: ["subject!", "locative_posture_vp!"],
      assigned_slots: ["subject", "locative_posture_vp"],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "Attach the subject without flattening the locative posture predicate.",
    }),
  });
}

  return {
    locativePostureVPFallback,
  };
};
