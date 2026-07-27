"use strict";

module.exports = function createQuestionFallbacks(dependencies = {}) {
  const {
    applyConstructionPatterns, cleanSlots, construction, flattenNodes, flattenSurface,
    hasConstruction, isParticle, isToken, nodeCanFillSlot, parserInactiveTokenClone,
    templateDerivedSlots, traceInfo,
  } = dependencies;

function haveOrNotQuestionParticleClone(node) {
  const surface = flattenSurface(node);
  if (surface === "呢") {
    return parserInactiveTokenClone(node, {
      label: "particle",
      pos: "particle",
      syntax: "sentence_final_question_particle",
      jyutping: "ne1",
      slots: ["particle", "question_marker"],
      note: "question particle / asks for an answer",
      reason: "Question punctuation and final position resolve 呢 as a sentence-final question particle, not a demonstrative determiner or standalone fragment question.",
    });
  }
  return node;
}

const HAVE_OR_NOT_EVENT_VP_TYPES = new Set([
  "ActionStativeVP", "CompletionVP", "DelimitedVP", "DesiderativeVP", "DirectionalMotionVP",
  "ExperientialVP", "ModalVP", "MotionGoalVP", "NegativePotentialComplement", "NegatedVP",
  "PerfectiveVP", "ProductiveVO", "ProgressiveVP", "ReduplicatedVP", "ResultComplement",
  "TransitiveVP", "VerbComplementVP",
]);

function unwrapHaveOrNotEventVp(node) {
  if (!node || node.kind !== "construction") return null;
  if (HAVE_OR_NOT_EVENT_VP_TYPES.has(node.type)) return node;
  for (const child of node.children || []) {
    const candidate = unwrapHaveOrNotEventVp(child);
    if (candidate) return candidate;
  }
  return nodeCanFillSlot(node, "vp") && !nodeCanFillSlot(node, "np") ? node : null;
}

function parsedSingleQuestionComplement(nodes) {
  if (!nodes || !nodes.length) return null;
  const parsed = applyConstructionPatterns(nodes);
  if (parsed.length !== 1) return null;
  const only = parsed[0];
  if (!only) return null;
  if (only.kind === "construction") {
    const vp = unwrapHaveOrNotEventVp(only);
    if (vp) return vp;
  }
  if (nodeCanFillSlot(only, "vp") || nodeCanFillSlot(only, "predicate")) return only;
  return null;
}

function haveOrNotEventMarkerClone(node, subtype) {
  const experiential = subtype === "experiential";
  return parserInactiveTokenClone(node, {
    label: "func",
    pos: "function",
    syntax: experiential
      ? "have_or_not_experiential_question_marker"
      : "have_or_not_event_question_marker",
    slots: ["existential_question", "question_marker"],
    note: experiential ? "ever ... or not?" : "did ... or not?",
    reason: experiential
      ? "有冇 scopes over an experiential VP; it asks whether the experience occurred rather than whether an NP exists."
      : "有冇 scopes over a dynamic VP; it asks whether the event occurred rather than whether an NP exists.",
  });
}

function haveOrNotQuestionFallbackForPunctuation(segment, terminalText = "") {
  if (!/[？?]/u.test(String(terminalText || ""))) return null;
  if (!segment || !segment.length) return null;

  const markerIndexes = segment
    .map((node, index) => isToken(node, "有冇") ? index : -1)
    .filter((index) => index >= 0);
  if (markerIndexes.length !== 1) return null;
  const markerIndex = markerIndexes[0];
  const prefix = segment.slice(0, markerIndex);
  if (prefix.length > 2) return null;
  if (prefix.some((node) => !nodeCanFillSlot(node, "subject")
      && !nodeCanFillSlot(node, "topic")
      && !nodeCanFillSlot(node, "location")
      && !nodeCanFillSlot(node, "time"))) return null;

  const marker = segment[markerIndex];
  const after = segment.slice(markerIndex + 1);
  const particles = [];
  while (after.length) {
    const last = after[after.length - 1];
    if (isParticle(last) || flattenSurface(last) === "呢") {
      particles.unshift(haveOrNotQuestionParticleClone(after.pop()));
      continue;
    }
    break;
  }

  const prefixSubject = prefix.find((node) => nodeCanFillSlot(node, "subject")) || null;
  const prefixAssigned = prefix.map((node) => node === prefixSubject
    ? "subject"
    : nodeCanFillSlot(node, "time")
      ? "time"
      : nodeCanFillSlot(node, "location")
        ? "location"
        : "topic");

  if (!after.length) {
    const children = [...prefix, marker, ...particles];
    return construction("ExistentialQuestion", "Have?", children, {
      slots: cleanSlots(["existential_question", "question_fragment", "possessive_question", "predicate", ...templateDerivedSlots("ExistentialQuestion", children)]),
      note: "Elliptical 有冇 question whose possession/existence domain must be supplied by the immediately preceding discourse.",
      trace: traceInfo("generative_template", {
        construction_type: "ExistentialQuestion",
        template_family: "generative_template",
        template: [...prefixAssigned.map((slot) => `${slot}?`), "existential_question!", "particle?"],
        assigned_slots: [...prefixAssigned, "existential_question", ...particles.map(() => "particle")],
        surfaces: children.map((node) => flattenSurface(node)),
        question_family: "have_or_not",
        existential_subtype: "elliptical_domain",
        complement_type: "context_supplied_np_or_domain",
        context_requirement_status: "context_required",
        missing_argument_slots: ["existential_domain"],
        missing_slot_details: [{ slot: "existential_domain", license_status: "unresolved" }],
        antecedent_status: "not_observed",
        discourse_license_not_observed: true,
        not_claims: ["not_fabricated_object", "not_event_occurrence_question", "not_clean_context_free_question"],
        reason: "Question punctuation licenses the 有冇 question frame, but no overt possession/existence domain follows the marker.",
      }),
    });
  }

  let postMarkerSubject = null;
  let eventNodes = after;
  if (after.length >= 2 && nodeCanFillSlot(after[0], "subject")) {
    const candidate = parsedSingleQuestionComplement(after.slice(1));
    if (candidate) {
      postMarkerSubject = after[0];
      eventNodes = after.slice(1);
    }
  }

  const event = parsedSingleQuestionComplement(eventNodes);
  if (event) {
    const experiential = nodeCanFillSlot(event, "experiential_vp") || hasConstruction([event], "ExperientialVP");
    const markerChild = haveOrNotEventMarkerClone(marker, experiential ? "experiential" : "event");
    const children = [...prefix, markerChild, ...(postMarkerSubject ? [postMarkerSubject] : []), event, ...particles];
    const assignedSlots = [
      ...prefixAssigned,
      "existential_question",
      ...(postMarkerSubject ? ["event_subject"] : []),
      experiential ? "experiential_vp" : "vp",
      ...particles.map(() => "particle"),
    ];
    const type = experiential ? "ExperientialYesNoQuestion" : "ANotAQuestion";
    const firstPersonSubject = prefixSubject && flattenSurface(prefixSubject) === "我";
    const eventRows = flattenNodes([event]);
    const eventTokens = eventRows.filter((row) => row.kind === "token");
    const eventHead = eventTokens.find((row) => (row.slots || []).includes("action_verb")) || null;
    const eventHeadIndex = eventHead ? eventTokens.indexOf(eventHead) : -1;
    const eventHasOvertDomain = eventHeadIndex >= 0 && eventTokens.slice(eventHeadIndex + 1).some((row) => {
      const rowSlots = row.slots || [];
      return !rowSlots.includes("completion_marker")
        && !rowSlots.includes("particle")
        && rowSlots.some((slot) => ["object", "theme", "head_noun", "np"].includes(slot));
    });
    const objectlessTotalityCompletion = !experiential
      && event.type === "CompletionVP"
      && eventTokens.some((row) => row.surface === "晒" && (row.slots || []).includes("completion_marker"))
      && !eventHasOvertDomain;
    const eventMissingSlots = objectlessTotalityCompletion ? ["object_or_activity_domain"] : [];
    return construction(type, experiential ? "Exp?" : "A-not-A", children, {
      slots: templateDerivedSlots(type, children),
      note: experiential
        ? "有冇 scopes over a transparent experiential VP and asks whether the experience occurred."
        : "有冇 scopes over a transparent dynamic VP and asks whether the event occurred.",
      trace: traceInfo("generative_template", {
        construction_type: type,
        template_family: "generative_template",
        template: [
          ...prefixAssigned.map((slot) => `${slot}?`),
          "existential_question!",
          ...(postMarkerSubject ? ["event_subject!"] : []),
          experiential ? "experiential_vp!" : "vp!",
          "particle?",
        ],
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        question_family: "have_or_not",
        question_subtype: experiential ? "experiential_occurrence" : "event_occurrence",
        complement_type: experiential ? "experiential_vp" : "dynamic_vp",
        event_subject_position: postMarkerSubject ? "postmarker" : prefixSubject ? "premarker" : "omitted_or_generic",
        negation_type: "event_nonoccurrence_alternative",
        first_person_pragmatics: firstPersonSubject ? "review_bearing_but_grammatical" : "not_applicable",
        event_head_surface: eventHead ? eventHead.surface : "",
        event_surface: flattenSurface(event),
        event_domain_status: objectlessTotalityCompletion ? "discourse_recoverable_totality_domain" : eventHasOvertDomain ? "overt" : "unspecified_activity_reading",
        context_requirement_status: objectlessTotalityCompletion ? "context_required" : "context_not_required",
        missing_argument_slots: eventMissingSlots,
        missing_slot_details: eventMissingSlots.map((slot) => ({ slot, license_status: "unresolved" })),
        antecedent_status: objectlessTotalityCompletion ? "not_observed" : "not_applicable",
        discourse_license_not_observed: objectlessTotalityCompletion,
        not_claims: ["not_existential_np_question", "not_malformed_candidate", "not_fabricated_event_argument", ...(objectlessTotalityCompletion ? ["not_context_free_totality_domain"] : [])],
        reason: experiential
          ? "Question punctuation plus embedded experiential structure outranks the old malformed 有冇 + VP guard."
          : "Question punctuation distinguishes grammatical event-occurrence 有冇 + VP from the punctuation-free learner-error guardrail.",
      }),
    });
  }

  // Availability nominal: non-person NP + following action/purpose verb, e.g. 嘢食 / 書睇.
  if (after.length === 2
      && nodeCanFillSlot(after[0], "object")
      && !nodeCanFillSlot(after[0], "subject")
      && (nodeCanFillSlot(after[1], "action_verb") || nodeCanFillSlot(after[1], "purpose_verb"))) {
    const children = [...prefix, marker, ...after, ...particles];
    return construction("ExistentialQuestion", "Have?", children, {
      slots: templateDerivedSlots("ExistentialQuestion", children),
      note: "Existential/availability 有冇 question with a transparent nominal domain such as 嘢食 or 書睇.",
      trace: traceInfo("generative_template", {
        construction_type: "ExistentialQuestion",
        template_family: "generative_template",
        template: [...prefixAssigned.map((slot) => `${slot}?`), "existential_question!", "availability_head!", "availability_predicate!", "particle?"],
        assigned_slots: [...prefixAssigned, "existential_question", "availability_head", "availability_predicate", ...particles.map(() => "particle")],
        surfaces: children.map((node) => flattenSurface(node)),
        question_family: "have_or_not",
        existential_subtype: "availability",
        complement_type: "availability_np",
        availability_domain_surface: after.map((node) => flattenSurface(node)).join(""),
        context_requirement_status: "context_not_required",
        missing_argument_slots: [],
        not_claims: ["not_event_occurrence_question", "not_experiential_question", "not_opaque_whole_phrase_lexicalization"],
        reason: "A non-person nominal head followed by an action/purpose verb forms the available-item domain; 有冇 asks whether such an item is available.",
      }),
    });
  }

  if (after.length === 1 && (nodeCanFillSlot(after[0], "topic_or_object") || nodeCanFillSlot(after[0], "np") || nodeCanFillSlot(after[0], "subject"))) {
    const children = [...prefix, marker, after[0], ...particles];
    return construction("ExistentialQuestion", "Have?", children, {
      slots: templateDerivedSlots("ExistentialQuestion", children),
      note: "Existential/possessive 有冇 question with an overt NP domain.",
      trace: traceInfo("generative_template", {
        construction_type: "ExistentialQuestion",
        template_family: "generative_template",
        template: [...prefixAssigned.map((slot) => `${slot}?`), "existential_question!", "topic_or_object!", "particle?"],
        assigned_slots: [...prefixAssigned, "existential_question", "topic_or_object", ...particles.map(() => "particle")],
        surfaces: children.map((node) => flattenSurface(node)),
        question_family: "have_or_not",
        existential_subtype: prefix.some((node) => nodeCanFillSlot(node, "location")) ? "locative_existence" : "possession_or_existence",
        complement_type: "np",
        context_requirement_status: "context_not_required",
        missing_argument_slots: [],
        not_claims: ["not_event_occurrence_question", "not_malformed_candidate"],
        reason: "The complement after 有冇 is an overt NP rather than a VP.",
      }),
    });
  }

  return null;
}

  return { haveOrNotQuestionFallbackForPunctuation };
};
