"use strict";

module.exports = function createDetectors(dependencies = {}) {
  const {
    applyConstructionPatterns, cleanSlots, construction, flattenSurface, fullSpanSingleConstruction, isToken, locativePredicatePhraseFromNodes, nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles
  } = dependencies;

function spatialLocalizerPhraseFromNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length !== 2) return null;
  const [base, localizer] = compact;
  const baseLooksNominal = nodeCanFillSlot(base, "np") || nodeCanFillSlot(base, "head_noun") || nodeCanFillSlot(base, "object") || nodeCanFillSlot(base, "location");
  const localizerSyntax = String(localizer && localizer.syntax || "");
  if (!baseLooksNominal || !localizerSyntax.includes("spatial_localizer")) return null;
  const localizerChild = parserInactiveTokenClone(localizer, {
    label: "where",
    syntax: `${localizerSyntax} postnominal_spatial_localizer`,
    slots: ["location", "spatial_localizer", "locative_domain"],
    reason: "The postnominal localizer supplies the spatial relation for the visible nominal base.",
    active_affordance_match: { role: "where", slot: "spatial_localizer", source: "construction_override" },
    preserve_existing_affordances: true,
  });
  const children = [base, localizerChild];
  return construction("LocativePlacePhrase", "Location", children, {
    note: "Nominal location base plus postnominal spatial localizer.",
    slots: cleanSlots(["locative_phrase", "location", "goal", "locative_domain", "spatial_localizer", ...templateDerivedSlots("LocativePlacePhrase", children)]),
    trace: traceInfo("generative_template", {
      construction_type: "LocativePlacePhrase",
      template_family: "generative_template",
      template: ["location_base!", "spatial_localizer!"],
      assigned_slots: ["location_base", "spatial_localizer"],
      surfaces: children.map(flattenSurface),
      subspan: true,
      location_relation: "nominal_base_plus_postnominal_localizer",
      subject_status: "not_assigned",
      not_claims: ["not_temporal_modifier", "not_directional_motion", "not_forced_subject"],
    }),
  });
}

function existentialNPFromNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  if (compact.length === 1 && (nodeCanFillSlot(compact[0], "np") || nodeCanFillSlot(compact[0], "head_noun") || nodeCanFillSlot(compact[0], "object"))) return compact[0];
  const wrapped = applyConstructionPatterns(compact);
  const full = fullSpanSingleConstruction(wrapped, compact);
  if (full && (nodeCanFillSlot(full, "np") || nodeCanFillSlot(full, "head_noun") || nodeCanFillSlot(full, "object"))) return full;
  return null;
}

function locativeDomainPrefix(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  if (compact.length >= 2) {
    const phrase = spatialLocalizerPhraseFromNodes(compact.slice(0, 2));
    if (phrase) return { node: phrase, consumed: 2 };
  }
  const first = compact[0];
  if (nodeCanFillSlot(first, "location") || nodeCanFillSlot(first, "goal")) {
    const location = first.kind === "token" ? parserInactiveTokenClone(first, {
      label: "where",
      syntax: `${first.syntax || "place_or_goal"} locative_domain`,
      slots: ["location", "locative_domain"],
      reason: "The overt place expression establishes the spatial domain without being forced into grammatical subject or topic status.",
      active_affordance_match: { role: "where", slot: "locative_domain", source: "construction_override" },
      preserve_existing_affordances: true,
    }) : first;
    return { node: location, consumed: 1 };
  }
  return null;
}

function presentationalLocativeCodaFromNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  if (compact.length === 1 && isToken(compact[0], "喺度")) {
    const child = parserInactiveTokenClone(compact[0], {
      label: "where",
      pos: "location",
      syntax: "locative_deictic presentational_location_coda",
      slots: ["locative_phrase", "location", "presentational_coda"],
      reason: "After an introduced existential participant, 喺度 is a visible locative coda rather than progressive aspect.",
      active_affordance_match: { role: "where", slot: "presentational_coda", source: "construction_override" },
      preserve_existing_affordances: true,
    });
    return construction("LocativePlacePhrase", "Location", [child], {
      note: "Deictic locative coda inside an existential-presentational clause.",
      slots: cleanSlots(["locative_phrase", "location", "presentational_coda"]),
      trace: traceInfo("generative_template", {
        construction_type: "LocativePlacePhrase",
        template_family: "generative_template",
        template: ["presentational_location_coda!"],
        assigned_slots: ["presentational_coda"],
        surfaces: [flattenSurface(child)],
        subspan: true,
        predicate_subtype: "presentational_locative_coda",
        not_claims: ["not_progressive_aspect"],
      }),
    });
  }
  return locativePredicatePhraseFromNodes(compact);
}

function placementPerfectiveVPFromNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length < 4) return null;
  const [verb, aspect, ...themeNodes] = compact;
  if (!String(verb && verb.syntax || "").includes("positioning_verb")) return null;
  if (!nodeCanFillSlot(aspect, "perfective_aspect") && !isToken(aspect, "咗")) return null;
  const theme = existentialNPFromNodes(themeNodes);
  if (!theme) return null;
  const predicate = parserInactiveTokenClone(verb, {
    label: "doing",
    syntax: "positioning_action_predicate locative_inversion_predicate",
    slots: ["action_verb", "main_verb", "predicate", "positioning_predicate"],
    reason: "The visible positioning verb predicates the postverbal theme inside a locative-inversion frame.",
  });
  const children = [predicate, aspect, theme];
  return construction("PerfectiveVP", "PerfVP", children, {
    note: "Perfective positioning predicate with an overt postverbal theme.",
    slots: cleanSlots(["perfective_vp", "vp", "action_vp", "predicate", "perfective_aspect", "object", "theme", ...templateDerivedSlots("PerfectiveVP", children)]),
    trace: traceInfo("generative_template", {
      construction_type: "PerfectiveVP",
      template_family: "generative_template",
      template: ["positioning_predicate!", "perfective_aspect!", "theme!"],
      assigned_slots: ["positioning_predicate", "perfective_aspect", "theme"],
      surfaces: children.map(flattenSurface),
      subspan: true,
      event_subtype: "perfective_positioning",
      not_claims: ["not_objectless_perfective"],
    }),
  });
}

function nodeHasAnySlot(node, slots = []) {
  return slots.some((slot) => nodeCanFillSlot(node, slot));
}

function introducedParticipantAllowed(participant) {
  if (!participant) return false;
  const surface = flattenSurface(participant);
  if (!surface || /^啲/u.test(surface)) return false;
  if (["一日", "一次", "一段時間", "可能", "機會", "事"].includes(surface)) return false;
  if (nodeHasAnySlot(participant, ["time", "time_head", "locative_phrase", "location", "goal", "vp", "action_vp", "predicate"])) return false;
  const trace = participant.trace || {};
  if (trace.np_license_status && trace.construction_licensing_allowed === false) return false;
  return nodeHasAnySlot(participant, ["np", "head_noun", "object", "subject", "topic"]);
}

function presentationalPredicateSubtype(predicate) {
  if (!predicate) return "predicate";
  if (predicate.type === "LocativePlacePhrase") return "locative_predicate";
  if (predicate.type === "SubjectPredicateClause") return "subject_predicate";
  if (nodeCanFillSlot(predicate, "locative_predicate") || nodeCanFillSlot(predicate, "locative_phrase")) return "locative_predicate";
  if (nodeCanFillSlot(predicate, "modal_vp") || predicate.type === "ModalVP") return "modal_predicate";
  if (nodeCanFillSlot(predicate, "stative_predicate") || predicate.type === "StativePredicate" || predicate.type === "DegreeStativePredicate") return "property_predicate";
  if (nodeCanFillSlot(predicate, "perfective_vp") || predicate.type === "PerfectiveVP") return "perfective_verbal_predicate";
  if (nodeCanFillSlot(predicate, "copular_relation") || predicate.type === "CopularRelationFrame" || predicate.type === "CopularIdentificationFrame") return "copular_predicate";
  if (nodeCanFillSlot(predicate, "vp") || nodeCanFillSlot(predicate, "action_vp")) return "verbal_predicate";
  return "predicate";
}

function presentationalPredicateFromNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  const locative = presentationalLocativeCodaFromNodes(compact);
  if (locative) return { node: locative, assignedSlot: "np_linked_predicate", subtype: "locative_predicate" };
  const wrapped = applyConstructionPatterns(compact);
  const predicate = fullSpanSingleConstruction(wrapped, compact) || (compact.length === 1 ? compact[0] : null);
  if (!predicate) return null;
  if (!nodeHasAnySlot(predicate, ["predicate", "vp", "action_vp", "stative_predicate", "modal_vp", "perfective_vp", "locative_predicate", "locative_phrase"])) return null;
  if (nodeHasAnySlot(predicate, ["np", "head_noun", "object"]) && !nodeHasAnySlot(predicate, ["predicate", "vp", "action_vp", "stative_predicate", "modal_vp", "perfective_vp"])) return null;
  return { node: predicate, assignedSlot: "np_linked_predicate", subtype: presentationalPredicateSubtype(predicate) };
}

function positiveParticipantIntroductionConstruction(marker, participant, predicateInfo, particles = []) {
  if (!marker || !participant || !predicateInfo) return null;
  const predicate = parserInactiveTokenClone(marker, {
    label: "func",
    syntax: "positive_existential_participant_introduction_marker",
    slots: ["existential", "participant_introduction_marker", "presentational_predicate", "predicate"],
    reason: `${flattenSurface(marker)} introduces an overt indefinite participant before a linked predicate.`,
  });
  const children = [predicate, participant, predicateInfo.node, ...particles];
  return construction("ExistentialPresentationalClause", "Presentational", children, {
    note: "AA56 positive participant introduction: 有 + overt indefinite NP + overt NP-linked predicate. The legacy runtime label is retained as the compatibility surface for JauMarkedIndefiniteNPPredication.",
    slots: cleanSlots(["existential_presentational_clause", "existential_clause", "predicate", "existential", "participant_introduction_marker", "introduced_participant", "np_linked_predicate", "clause", ...templateDerivedSlots("ExistentialPresentationalClause", children)]),
    trace: traceInfo("generative_template", {
      construction_type: "ExistentialPresentationalClause",
      template_family: "generative_template",
      template: ["existential!", "introduced_participant!", `${predicateInfo.assignedSlot}!`, "particle?"],
      assigned_slots: ["existential", "introduced_participant", predicateInfo.assignedSlot, ...particles.map(() => "particle")],
      surfaces: children.map(flattenSurface),
      construction_uuid: "258c1d00-8a77-543c-a26f-2e66d3a37849",
      construction_code: "AA56",
      canonical_identity: "JauMarkedIndefiniteNPPredication",
      legacy_runtime_label: "ExistentialPresentationalClause",
      existential_subtype: "positive_indefinite_np_predication",
      predicate_subtype: predicateInfo.subtype,
      polarity: "positive",
      marker: "有",
      have_relation: "participant_introduction",
      subject_status: "impersonal",
      subjectless_type: "genuinely_subjectless_existential_presentational",
      hidden_subject_inserted: false,
      introduced_participant: "overt",
      predicate_relation: "linked_to_introduced_np",
      introduced_participant_surface: flattenSurface(participant),
      np_linked_predicate_surface: flattenSurface(predicateInfo.node),
      not_claims: ["not_negative_member", "not_possessive_have", "not_bare_existence", "not_hidden_subject", "not_mandatory_locative_coda", "not_unrestricted_any_np_any_predicate"],
    }),
  });
}

function positiveParticipantIntroductionFromNodes(nodes = [], particles = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length < 3 || !isToken(compact[0], "有")) return null;
  for (let split = 2; split < compact.length; split += 1) {
    const participant = existentialNPFromNodes(compact.slice(1, split));
    if (!introducedParticipantAllowed(participant)) continue;
    const predicateInfo = presentationalPredicateFromNodes(compact.slice(split));
    if (!predicateInfo) continue;
    return positiveParticipantIntroductionConstruction(compact[0], participant, predicateInfo, particles);
  }
  return null;
}

function existentialLocationPresentationalFallback(core = []) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (!compact.length) return null;

  // Overt location/domain + 有/冇 + introduced NP.
  const existentialIndex = compact.findIndex((node) => isToken(node, "有") || isToken(node, "冇"));
  if (existentialIndex > 0 && existentialIndex < compact.length - 1) {
    const locationPrefix = locativeDomainPrefix(compact.slice(0, existentialIndex));
    if (locationPrefix && locationPrefix.consumed === existentialIndex) {
      if (isToken(compact[existentialIndex], "有")) {
        const aa56Core = positiveParticipantIntroductionFromNodes(compact.slice(existentialIndex), []);
        if (aa56Core) {
          const children = [locationPrefix.node, aa56Core, ...particles];
          return construction("LocativeExistentialClause", "LocExist", children, {
            note: "Overt spatial-domain layer composed with an AA56 positive participant-introduction core.",
            slots: cleanSlots(["locative_existential_clause", "existential_clause", "location", "locative_domain", "predicate", "introduced_theme", "clause", ...templateDerivedSlots("LocativeExistentialClause", children)]),
            trace: traceInfo("generative_template", {
              construction_type: "LocativeExistentialClause",
              template_family: "generative_template",
              template: ["locative_domain!", "existential_presentational_clause!", "particle?"],
              assigned_slots: ["locative_domain", "existential_presentational_clause", ...particles.map(() => "particle")],
              surfaces: children.map(flattenSurface),
              existential_subtype: "locative_domain_plus_positive_participant_predication",
              polarity: "positive",
              have_relation: "existence_plus_participant_introduction",
              location_relation: "external_overt_spatial_domain_not_absorbed_into_aa56_core",
              subject_status: "impersonal",
              hidden_subject_inserted: false,
              not_claims: ["not_possessor_subject", "not_location_as_forced_subject", "not_location_as_forced_topic", "not_hidden_expletive_subject"],
            }),
          });
        }
      }
      const theme = existentialNPFromNodes(compact.slice(existentialIndex + 1));
      if (theme) {
        const marker = compact[existentialIndex];
        const negative = isToken(marker, "冇");
        const predicate = parserInactiveTokenClone(marker, {
          label: "func",
          syntax: negative ? "negated_locative_existential_predicate" : "locative_existential_predicate",
          slots: [negative ? "negated_existential" : "existential", "locative_existential_predicate", "predicate"],
          reason: `${flattenSurface(marker)} predicates nonexistence/existence inside the overt spatial domain.`,
        });
        const children = [locationPrefix.node, predicate, theme, ...particles];
        return construction("LocativeExistentialClause", "LocExist", children, {
          note: "Locative existential clause with overt spatial domain and introduced NP.",
          slots: cleanSlots(["locative_existential_clause", "existential_clause", "location", "locative_domain", "predicate", negative ? "negated_existential" : "existential", "introduced_theme", "clause", ...templateDerivedSlots("LocativeExistentialClause", children)]),
          trace: traceInfo("generative_template", {
            construction_type: "LocativeExistentialClause",
            template_family: "generative_template",
            template: ["locative_domain!", negative ? "negated_existential!" : "existential!", "introduced_theme!", "particle?"],
            assigned_slots: ["locative_domain", negative ? "negated_existential" : "existential", "introduced_theme", ...particles.map(() => "particle")],
            surfaces: children.map(flattenSurface),
            existential_subtype: "locative_existence",
            polarity: negative ? "negative" : "positive",
            have_relation: "existence",
            location_relation: "overt_spatial_domain_not_forced_subject_or_topic",
            subject_status: "impersonal",
            subjectless_type: "genuinely_subjectless_locative_existential",
            hidden_subject_inserted: false,
            introduced_theme_surface: flattenSurface(theme),
            not_claims: ["not_possessor_subject", "not_location_as_forced_subject", "not_location_as_forced_topic", "not_hidden_expletive_subject"],
          }),
        });
      }
    }
  }

  const positiveParticipantIntroduction = positiveParticipantIntroductionFromNodes(compact, particles);
  if (positiveParticipantIntroduction) return positiveParticipantIntroduction;

  const locationPrefix = locativeDomainPrefix(compact);
  if (!locationPrefix || locationPrefix.consumed >= compact.length) return null;
  const remainder = compact.slice(locationPrefix.consumed);

  // Narrow locative inversion: location + positioning predicate + aspect + theme.
  const positioning = placementPerfectiveVPFromNodes(remainder);
  if (positioning) {
    const children = [locationPrefix.node, positioning, ...particles];
    return construction("LocativeFrameClause", "LocativeFrame", children, {
      note: "Narrow locative-inversion frame with overt location and postverbal theme; grammatical subjecthood of the location is not forced.",
      slots: cleanSlots(["locative_frame_clause", "location", "locative_domain", "predicate", "introduced_theme", "clause", ...templateDerivedSlots("LocativeFrameClause", children)]),
      trace: traceInfo("generative_template", {
        construction_type: "LocativeFrameClause",
        template_family: "generative_template",
        template: ["locative_domain!", "positioning_predicate!", "particle?"],
        assigned_slots: ["locative_domain", "positioning_predicate", ...particles.map(() => "particle")],
        surfaces: children.map(flattenSurface),
        locative_frame_subtype: "locative_inversion",
        location_relation: "locative_frame_subjecthood_underdetermined",
        subject_status: "underdetermined_location_relation",
        hidden_subject_inserted: false,
        not_claims: ["not_locative_existential_have", "not_location_as_automatically_subject", "not_location_as_automatically_topic", "not_hidden_subject"],
      }),
    });
  }

  // Location-framed property clause distinct from environmental temperature frames.
  const wrappedProperty = applyConstructionPatterns(remainder);
  const property = fullSpanSingleConstruction(wrappedProperty, remainder);
  if (property && ["DegreeStativePredicate", "StativePredicate", "NegatedStativePredicate"].includes(property.type)) {
    const children = [locationPrefix.node, property, ...particles];
    return construction("LocativeFrameClause", "LocativeFrame", children, {
      note: "Location-framed property clause. The overt place establishes the domain; its subject/topic status is not forced.",
      slots: cleanSlots(["locative_frame_clause", "location", "locative_domain", "predicate", "clause", ...templateDerivedSlots("LocativeFrameClause", children)]),
      trace: traceInfo("generative_template", {
        construction_type: "LocativeFrameClause",
        template_family: "generative_template",
        template: ["locative_domain!", "property_predicate!", "particle?"],
        assigned_slots: ["locative_domain", "property_predicate", ...particles.map(() => "particle")],
        surfaces: children.map(flattenSurface),
        locative_frame_subtype: "location_property",
        location_relation: "frame_or_topic_status_underdetermined",
        subject_status: "underdetermined_location_relation",
        hidden_subject_inserted: false,
        not_claims: ["not_environmental_temperature_clause", "not_location_as_automatically_subject", "not_location_as_automatically_topic", "not_hidden_subject"],
      }),
    });
  }

  return null;
}

  return {
    spatialLocalizerPhraseFromNodes,
    existentialNPFromNodes,
    locativeDomainPrefix,
    presentationalLocativeCodaFromNodes,
    placementPerfectiveVPFromNodes,
    existentialLocationPresentationalFallback
  };
};
