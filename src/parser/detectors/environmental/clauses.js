"use strict";

module.exports = function createDetectors(dependencies = {}) {
  const {
    ENVIRONMENTAL_EVENT_PREDICATES, categorySubspanFor, construction, constructionSlotsByType, flattenSurface, nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles
  } = dependencies;

function conventionalEnvironmentalEventConstruction(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length !== 2 || compact.some((node) => node.kind === "construction" || node.kind === "text")) return null;
  const eventSurface = compact.map((node) => flattenSurface(node)).join("");
  const eventRule = ENVIRONMENTAL_EVENT_PREDICATES[eventSurface];
  if (!eventRule
      || flattenSurface(compact[0]) !== eventRule.head
      || flattenSurface(compact[1]) !== eventRule.phenomenon) return null;
  const head = parserInactiveTokenClone(compact[0], {
    label: "doing",
    syntax: "environmental_event_predicate",
    slots: ["environmental_event_head", "environmental_predicate", "predicate"],
    reason: `${eventRule.head} is licensed as an environmental event head only inside the conventional ${eventSurface} predicate.`,
    active_affordance_match: { role: "doing", slot: "environmental_event_head", source: "construction_override" },
    preserve_existing_affordances: true,
  });
  const phenomenon = parserInactiveTokenClone(compact[1], {
    label: "what",
    syntax: "weather_phenomenon environmental_phenomenon",
    slots: ["weather_phenomenon", "environmental_phenomenon"],
    reason: `${eventRule.phenomenon} is the visible weather-phenomenon component of ${eventSurface}, not an ordinary affected object.`,
    active_affordance_match: { role: "what", slot: "weather_phenomenon", source: "construction_override" },
    preserve_existing_affordances: true,
  });
  return construction("ImpersonalEnvironmentalClause", "Environment", [head, phenomenon], {
    slots: constructionSlotsByType("ImpersonalEnvironmentalClause", [head, phenomenon]),
    note: "Lexically licensed conventional environmental event predicate with transparent visible components.",
    trace: traceInfo("generative_template", {
      construction_type: "ImpersonalEnvironmentalClause",
      template_family: "construction_template",
      template: ["environmental_event_head!", "weather_phenomenon!"],
      assigned_slots: ["environmental_event_head", "weather_phenomenon"],
      surfaces: [eventRule.head, eventRule.phenomenon],
      subject_status: "impersonal",
      subjectless_type: "genuinely_subjectless_environmental",
      hidden_subject_inserted: false,
      environmental_subtype: eventRule.environmental_subtype,
      not_claims: ["not_productive_vo_object_relation", "not_null_referential_subject", "not_hidden_expletive_subject"],
    }),
  });
}

function environmentalPredicateParts(core = []) {
  const compact = withoutIgnorableSpaceText(core || []);
  if (!compact.length) return null;

  const conventionalEnvironmental = conventionalEnvironmentalEventConstruction(compact);
  if (conventionalEnvironmental) {
    return {
      predicate: conventionalEnvironmental,
      environmental_subtype: (conventionalEnvironmental.trace || {}).environmental_subtype || "environmental_event",
    };
  }

  const event = categorySubspanFor(compact, ["ImpersonalEnvironmentalClause"]);
  if (event) {
    return {
      predicate: event,
      environmental_subtype: flattenSurface(event) === "落雨" ? "precipitation_event" : "wind_event",
    };
  }

  if (compact.length === 1 && nodeCanFillSlot(compact[0], "environmental_transition_predicate")) {
    const child = parserInactiveTokenClone(compact[0], {
      label: "doing",
      syntax: "environmental_transition_predicate impersonal_predicate",
      slots: ["environmental_transition_predicate", "environmental_predicate", "predicate"],
      reason: "天光 is a visible environmental transition predicate; no null referential or expletive subject is inserted.",
      active_affordance_match: { role: "doing", slot: "environmental_transition_predicate", source: "construction_override" },
      preserve_existing_affordances: true,
    });
    const predicate = construction("ImpersonalEnvironmentalClause", "Environment", [child], {
      slots: constructionSlotsByType("ImpersonalEnvironmentalClause", [child]),
      note: "Genuinely subjectless environmental transition clause.",
      trace: traceInfo("generative_template", {
        construction_type: "ImpersonalEnvironmentalClause",
        template_family: "generative_template",
        template: ["environmental_transition_predicate!"],
        assigned_slots: ["environmental_transition_predicate"],
        surfaces: [flattenSurface(child)],
        subject_status: "impersonal",
        subjectless_type: "genuinely_subjectless_environmental",
        hidden_subject_inserted: false,
        environmental_subtype: "daylight_transition",
        not_claims: ["not_null_referential_subject", "not_hidden_expletive_subject", "not_nominal_subject天"],
      }),
    });
    return { predicate, environmental_subtype: "daylight_transition" };
  }

  const ambient = categorySubspanFor(compact, ["DegreeStativePredicate"]);
  if (ambient && nodeCanFillSlot(ambient, "ambient_environmental_predicate")) {
    return { predicate: ambient, environmental_subtype: "ambient_temperature_property" };
  }
  return null;
}

function impersonalEnvironmentalClauseFallback(core = []) {
  const { core: bareCore, particles } = withoutTrailingParticles(core || []);
  if (!bareCore.length) return null;

  // Overt temporal framing remains a TemporalClause, with the genuinely
  // subjectless environmental predicate preserved as its child.
  if (bareCore.length >= 2 && nodeCanFillSlot(bareCore[0], "time")) {
    const environmental = environmentalPredicateParts(bareCore.slice(1));
    if (environmental) {
      const child = environmental.predicate.type === "ImpersonalEnvironmentalClause"
        ? environmental.predicate
        : construction("ImpersonalEnvironmentalClause", "Environment", [environmental.predicate], {
          slots: constructionSlotsByType("ImpersonalEnvironmentalClause", [environmental.predicate]),
          note: "Ambient environmental property licensed by an overt temporal frame.",
          trace: traceInfo("generative_template", {
            construction_type: "ImpersonalEnvironmentalClause",
            template_family: "generative_template",
            template: ["ambient_environmental_predicate!"],
            assigned_slots: ["ambient_environmental_predicate"],
            surfaces: [flattenSurface(environmental.predicate)],
            subject_status: "impersonal",
            subjectless_type: "genuinely_subjectless_environmental",
            hidden_subject_inserted: false,
            environmental_subtype: environmental.environmental_subtype,
            not_claims: ["not_null_referential_subject", "not_hidden_expletive_subject"],
          }),
        });
      const children = [bareCore[0], child, ...particles];
      return construction("TemporalClause", "Time", children, {
        slots: templateDerivedSlots("TemporalClause", children),
        note: "Time-framed environmental clause with no fabricated referential subject.",
        trace: traceInfo("generative_template", {
          construction_type: "TemporalClause",
          template_family: "generative_template",
          template: ["time!", "impersonal_environmental_clause!", "particle?"],
          assigned_slots: ["time", "impersonal_environmental_clause", ...particles.map(() => "particle")],
          surfaces: children.map(flattenSurface),
          clause_modifier_profile: "temporal_environmental_frame",
          subject_status: "impersonal",
          subjectless_type: "genuinely_subjectless_environmental",
          hidden_subject_inserted: false,
          not_claims: ["not_null_referential_subject", "not_hidden_expletive_subject"],
        }),
      });
    }
  }

  // Overt spatial localizers frame the ambient proposition. They are not
  // automatically promoted to grammatical subject or topic.
  if (bareCore.length >= 2 && (nodeCanFillSlot(bareCore[0], "ambient_location_frame") || nodeCanFillSlot(bareCore[0], "location"))) {
    const environmental = environmentalPredicateParts(bareCore.slice(1));
    if (environmental && environmental.environmental_subtype === "ambient_temperature_property") {
      const ambientClause = construction("ImpersonalEnvironmentalClause", "Environment", [environmental.predicate], {
        slots: constructionSlotsByType("ImpersonalEnvironmentalClause", [environmental.predicate]),
        note: "Ambient temperature proposition licensed by an overt spatial frame.",
        trace: traceInfo("generative_template", {
          construction_type: "ImpersonalEnvironmentalClause",
          template_family: "generative_template",
          template: ["ambient_environmental_predicate!"],
          assigned_slots: ["ambient_environmental_predicate"],
          surfaces: [flattenSurface(environmental.predicate)],
          subject_status: "impersonal",
          subjectless_type: "genuinely_subjectless_environmental",
          hidden_subject_inserted: false,
          environmental_subtype: environmental.environmental_subtype,
          not_claims: ["not_null_referential_subject", "not_hidden_expletive_subject"],
        }),
      });
      const location = parserInactiveTokenClone(bareCore[0], {
        label: "where",
        syntax: "ambient_location_frame spatial_localizer",
        slots: ["location", "ambient_location_frame"],
        reason: "The overt place expression frames the ambient proposition; its grammatical subject/topic status is not forced.",
        active_affordance_match: { role: "where", slot: "ambient_location_frame", source: "construction_override" },
        preserve_existing_affordances: true,
      });
      const children = [location, ambientClause, ...particles];
      return construction("LocativeFrameClause", "LocativeFrame", children, {
        slots: constructionSlotsByType("LocativeFrameClause", children),
        note: "Location-framed ambient clause. Location semantics are represented independently from grammatical subjecthood.",
        trace: traceInfo("generative_template", {
          construction_type: "LocativeFrameClause",
          template_family: "generative_template",
          template: ["ambient_location_frame!", "impersonal_environmental_clause!", "particle?"],
          assigned_slots: ["ambient_location_frame", "impersonal_environmental_clause", ...particles.map(() => "particle")],
          surfaces: children.map(flattenSurface),
          location_relation: "ambient_frame_not_forced_subject_or_topic",
          subject_status: "impersonal",
          subjectless_type: "location_framed_ambient",
          hidden_subject_inserted: false,
          not_claims: ["not_location_as_forced_subject", "not_location_as_forced_topic", "not_hidden_expletive_subject"],
        }),
      });
    }
  }

  const environmental = environmentalPredicateParts(bareCore);
  if (!environmental || environmental.environmental_subtype === "ambient_temperature_property") return null;
  const predicate = environmental.predicate;
  const children = [...(predicate.children || [predicate]), ...particles];
  return construction("ImpersonalEnvironmentalClause", "Environment", children, {
    slots: constructionSlotsByType("ImpersonalEnvironmentalClause", children),
    note: "Genuinely subjectless environmental clause; all visible predicate material remains transparent.",
    trace: traceInfo("generative_template", {
      construction_type: "ImpersonalEnvironmentalClause",
      template_family: predicate.trace && predicate.trace.template_family ? predicate.trace.template_family : "generative_template",
      template: predicate.trace && predicate.trace.template ? predicate.trace.template : ["environmental_predicate!", "particle?"],
      assigned_slots: predicate.trace && predicate.trace.assigned_slots ? [...predicate.trace.assigned_slots, ...particles.map(() => "particle")] : ["environmental_predicate", ...particles.map(() => "particle")],
      surfaces: children.map(flattenSurface),
      subject_status: "impersonal",
      subjectless_type: "genuinely_subjectless_environmental",
      hidden_subject_inserted: false,
      environmental_subtype: environmental.environmental_subtype,
      not_claims: ["not_productive_vo_object_relation", "not_null_referential_subject", "not_hidden_expletive_subject"],
    }),
  });
}

  return {
    conventionalEnvironmentalEventConstruction,
    environmentalPredicateParts,
    impersonalEnvironmentalClauseFallback
  };
};
