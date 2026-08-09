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

const AA84_MODIFIER_PROFILE = Object.freeze({
  id: "source_linked_maan6_maan6",
  surfaces: ["慢", "慢"],
});

function sourceLinkedReduplicatedMannerModifier(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length !== AA84_MODIFIER_PROFILE.surfaces.length) return null;
  for (let index = 0; index < compact.length; index += 1) {
    const node = compact[index];
    if (flattenSurface(node) !== AA84_MODIFIER_PROFILE.surfaces[index]) return null;
    if (!nodeCanFillSlot(node, "stative_predicate") || !nodeCanFillSlot(node, "modifier")) return null;
  }
  return {
    profile: AA84_MODIFIER_PROFILE.id,
    children: compact.map((node) => parserInactiveTokenClone(node, {
      label: "how", pos: "adverb", syntax: "source_linked_reduplicated_manner_modifier",
      slots: ["manner", "modifier", "how", "reduplicated_manner"],
      reason: "AA84 uses the independently typed, source-linked 慢慢 reduplicated-manner profile; arbitrary adjacent equal surfaces do not license the construction.",
    })),
  };
}

function independentlyTypedFollowingVP(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  const wrapped = applyConstructionPatterns(compact);
  if (wrapped.length !== 1) return null;
  const candidate = wrapped[0];
  if (!candidate || candidate.kind !== "construction" || !nodeCanFillSlot(candidate, "vp")) return null;
  // Object-bearing VPs can inherit topic affordances from nominal children; that
  // does not make the VP clause-sized. Actual clause/subject/time ownership remains excluded.
  if (nodeCanFillSlot(candidate, "clause") || nodeCanFillSlot(candidate, "subject") || nodeCanFillSlot(candidate, "time")) return null;
  return candidate;
}

function markedMannerVPForCore(core) {
  const compact = withoutIgnorableSpaceText(core || []);
  if (compact.length < 4) return null;
  const markerIndex = compact.findIndex((node) => nodeSurfaceMatches(node, ["咁", "噉"]));
  if (markerIndex <= 0 || markerIndex >= compact.length - 1) return null;

  const modifier = sourceLinkedReduplicatedMannerModifier(compact.slice(0, markerIndex));
  if (!modifier) return null;
  const predicate = independentlyTypedFollowingVP(compact.slice(markerIndex + 1));
  if (!predicate) return null;

  const marker = parserInactiveTokenClone(compact[markerIndex], {
    label: "how", pos: "adverbializer", syntax: "manner_adverbializer",
    slots: ["manner", "modifier", "how", "manner_adverbializer"],
    reason: "Overt 咁/噉 links the independently typed reduplicated manner constituent to the following independently typed VP in AA84.",
  });
  const children = [...modifier.children, marker, predicate];
  return construction("MannerAdverbialVP", "MannerVP", children, {
    note: "AA84 retained narrowly: source-linked reduplicated manner constituent + overt 咁/噉 + independently typed VP.",
    // Do not inherit the legacy MannerAdverbialVP template's optional subject.
    // The construction helper still propagates slots from the typed VP child.
    slots: cleanSlots(["manner_adverbial_vp", "manner", "modifier", "how", "vp", "action_vp", "predicate"]),
    trace: traceInfo("generative_template", {
      construction_type: "MannerAdverbialVP",
      template_family: "construction_template",
      template_subtype: "aa84_overt_gam_marked_reduplicated_manner",
      template: ["reduplicated_manner_part!", "reduplicated_manner_part!", "manner_adverbializer!", "vp!"],
      rule: "typed source-linked reduplicated manner constituent + overt 咁/噉 + independently typed VP",
      constraints: {
        modifier_profile: modifier.profile,
        marker_surface_in: ["咁", "噉"],
        overt_marker_required: true,
        bare_reduplication_route: false,
        following_vp_typing: "independent_required",
        following_vp_clause_time_material: "excluded",
      },
      assigned_slots: ["reduplicated_manner_part", "reduplicated_manner_part", "manner_adverbializer", "vp"],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "Implements the accepted #611/#629 AA84 boundary. Generic bare A+A+VP and raw same-surface equality do not license this construction.",
      not_claims: ["not_generic_bare_reduplication", "not_arbitrary_same_surface_repetition", "not_every_gam_is_manner_adverbializer"],
    }),
  });
}

function outerWrapper(type, label, prefixNode, predicate, particles, options) {
  const children = [prefixNode, predicate, ...particles];
  const assignedSlots = [options.prefixSlot, "predicate", ...particles.map(() => "particle")];
  return construction(type, label, children, {
    note: options.note,
    slots: cleanSlots(options.slots),
    trace: traceInfo("generative_template", {
      construction_type: type,
      template_family: "construction_template",
      template_subtype: options.templateSubtype,
      template: [`${options.prefixSlot}!`, "predicate!", "particle?"],
      rule: options.rule,
      assigned_slots: assignedSlots,
      surfaces: children.map((node) => flattenSurface(node)),
      reason: options.reason,
    }),
  });
}

function mannerAdverbialVPFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);

  const direct = markedMannerVPForCore(compact);
  if (direct && !particles.length) return direct;

  if (compact.length >= 5 && nodeCanFillSlot(compact[0], "subject")) {
    const predicate = markedMannerVPForCore(compact.slice(1));
    if (!predicate) return null;
    return outerWrapper("SubjectPredicateClause", "SubjPred", compact[0], predicate, particles, {
      prefixSlot: "subject",
      templateSubtype: "aa84_subject_wrapper",
      rule: "subject + AA84 overt-marked reduplicated manner VP + particle?",
      note: "Transparent clause wrapper around a narrow AA84 marked manner VP; subject/final-particle material remains outside AA84.",
      slots: ["subject_predicate_clause", "clause", "subject", "predicate"],
      reason: "Keeps clause-level subject and final-particle material outside the narrow AA84 VP while preserving all visible material.",
    });
  }

  if (compact.length >= 5 && nodeCanFillSlot(compact[0], "time")) {
    const predicate = markedMannerVPForCore(compact.slice(1));
    if (!predicate) return null;
    return outerWrapper("TemporalClause", "Time", compact[0], predicate, particles, {
      prefixSlot: "time",
      templateSubtype: "aa84_temporal_wrapper",
      rule: "time + AA84 overt-marked reduplicated manner VP + particle?",
      note: "Transparent temporal wrapper around a narrow AA84 marked manner VP; overt time remains outside AA84.",
      slots: ["temporal_clause", "time_clause", "clause", "time", "predicate"],
      reason: "Preserves the attested 琴日 + marked manner VP composition while keeping temporal material outside the narrow AA84 node.",
    });
  }

  return null;
}

  return {
    sourceLinkedDegreeMannerModifiedVPFallback,
    mannerAdverbialVPFallback
  };
};
