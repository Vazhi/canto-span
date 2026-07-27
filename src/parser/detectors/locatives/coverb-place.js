"use strict";

module.exports = function createCoverbPlaceDetectors(dependencies = {}) {
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

function locativeCoverbPhraseFromNodes(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length < 2 || compact.length > 3) return null;
  const [marker, location, postposition] = compact;
  if (!isToken(marker, "喺") && !nodeCanFillSlot(marker, "locative_marker")) return null;
  if (!nodeCanFillSlot(location, "location") && !nodeCanFillSlot(location, "goal")) return null;
  if (postposition && !isToken(postposition, "度")) return null;
  const markerChild = bridgeFramePartClone(marker, {
    label: "func",
    pos: "function",
    syntax: "locative_coverb coverb_marker",
    slots: ["coverb_marker", "locative_marker"],
    reason: "喺 introduces a preverbal locative coverb phrase before the main predicate.",
  });
  const children = [markerChild, location];
  if (postposition) children.push(bridgeFramePartClone(postposition, {
    label: "func",
    pos: "function",
    syntax: "locative_postposition coverb_phrase_postposition",
    slots: ["locative_postposition"],
    reason: "度 closes the locative phrase inside a preverbal coverb frame.",
  }));
  return construction("LocativePlacePhrase", "Location", children, {
    note: "Locative coverb phrase: 喺 + location before a main predicate.",
    slots: templateDerivedSlots("LocativePlacePhrase", children),
    trace: traceInfo("generative_template", {
      construction_type: "LocativePlacePhrase",
      template_family: "generative_template",
      template: ["coverb_marker!", "location!", ...(postposition ? ["locative_postposition?"] : [])],
      assigned_slots: ["coverb_marker", "location", ...(postposition ? ["locative_postposition"] : [])],
      surfaces: children.map((node) => flattenSurface(node)),
      subspan: true,
      coverb_subtype: "locative",
    }),
  });
}

function locativePredicatePhraseFromNodes(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length < 2 || compact.length > 3) return null;
  const [marker, location, postposition] = compact;
  if (!isToken(marker, "喺") && !nodeCanFillSlot(marker, "locative_marker")) return null;
  if (!nodeCanFillSlot(location, "location") && !nodeCanFillSlot(location, "goal")) return null;
  if (postposition && !isToken(postposition, "度")) return null;
  const markerChild = bridgeFramePartClone(marker, {
    label: "func",
    pos: "function",
    syntax: "locative_predicate_marker locative_marker",
    slots: ["locative_marker"],
    reason: "喺 introduces a locative predicate in a subject-led location clause, not a preverbal coverb frame.",
  });
  const children = [markerChild, location];
  if (postposition) children.push(bridgeFramePartClone(postposition, {
    label: "func",
    pos: "function",
    syntax: "locative_postposition",
    slots: ["locative_postposition"],
    reason: "度 closes the locative predicate phrase.",
  }));
  return construction("LocativePlacePhrase", "Location", children, {
    note: "Locative predicate phrase: 喺 + location as the predicate of a subject-led clause.",
    slots: cleanSlots(["locative_phrase", "locative_predicate", "predicate", "location", "goal", ...templateDerivedSlots("LocativePlacePhrase", children)]),
    trace: traceInfo("generative_template", {
      construction_type: "LocativePlacePhrase",
      template_family: "generative_template",
      template: ["locative_marker!", "location!", ...(postposition ? ["locative_postposition?"] : [])],
      assigned_slots: ["locative_marker", "location", ...(postposition ? ["locative_postposition"] : [])],
      surfaces: children.map((node) => flattenSurface(node)),
      subspan: true,
      predicate_subtype: "locative",
      not_claims: ["not_coverb_frame_without_following_predicate"],
    }),
  });
}

function subjectLocativePredicateClauseFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length < 3 || compact.length > 4) return null;
  const subject = compact[0];
  if (!nodeCanFillSlot(subject, "subject")) return null;
  const locPhrase = locativePredicatePhraseFromNodes(compact.slice(1));
  if (!locPhrase) return null;
  const children = [subject, locPhrase, ...particles];
  return construction("SubjectPredicateClause", "SubjPred", children, {
    note: "Subject-led locative predicate clause: subject + 喺 location. This is not a CoverbFrame because there is no following main predicate for the locative phrase to modify.",
    slots: cleanSlots(["subject_predicate_clause", "subject", "predicate", "clause", "location", "locative_phrase", ...templateDerivedSlots("SubjectPredicateClause", children)]),
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      predicate_subtype: "locative",
      template: ["subject!", "locative_predicate!", "particle?"],
      assigned_slots: ["subject", "locative_predicate", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "Direct diagnostic review rejected the previous false positive where 我喺屋企 rendered only as LocativePlacePhrase. The subject must be preserved at clause level, and the assigned slot must match the locative_predicate template.",
      not_claims: ["not_coverb_frame", "not_bare_locative_phrase"],
    }),
  });
}

  return {
    locativeCoverbPhraseFromNodes,
    locativePredicatePhraseFromNodes,
    subjectLocativePredicateClauseFallback,
  };
};
