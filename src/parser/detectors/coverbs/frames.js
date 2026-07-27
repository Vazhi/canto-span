"use strict";

module.exports = function createCoverbDetectors(dependencies = {}) {
  const {
    bridgeFramePartClone,
    bridgeNPFromNodes,
    categorySubspanFor,
    construction,
    flattenSurface,
    isToken,
    locativeCoverbPhraseFromNodes,
    nodeCanFillSlot,
    nodeSlots,
    parserInactiveTokenClone,
    rawNodeHasSlot,
    templateDerivedSlots,
    traceInfo,
    withoutIgnorableSpaceText,
    withoutTrailingParticles,
  } = dependencies;

function predicateLikeForCoverbFrame(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []).filter((node) => node && node.kind !== "text");
  if (!compact.length) return null;
  const productiveVoPredicate = categorySubspanFor(compact, ["ProductiveVO"]);
  if (productiveVoPredicate) return [productiveVoPredicate];
  const reduplicatedPredicate = categorySubspanFor(compact, ["ReduplicatedVP"]);
  if (reduplicatedPredicate) return [reduplicatedPredicate];
  const last = compact[compact.length - 1];
  const lastIsPredicate = rawNodeHasSlot(last, "predicate")
    || rawNodeHasSlot(last, "vp")
    || rawNodeHasSlot(last, "action_verb")
    || rawNodeHasSlot(last, "main_verb")
    || rawNodeHasSlot(last, "movement_verb")
    || rawNodeHasSlot(last, "speech_verb");
  if (!lastIsPredicate) return null;
  if (compact.length === 1) return compact;
  if (compact.length === 2 && rawNodeHasSlot(compact[0], "manner")) return compact;
  return null;
}

function instrumentCoverbObjectFromNodes(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length !== 1) return null;
  const object = compact[0];
  if (!nodeCanFillSlot(object, "object") && !nodeCanFillSlot(object, "head_noun") && !nodeCanFillSlot(object, "np")) return null;
  if (object.kind === "token") {
    return bridgeFramePartClone(object, {
      label: object.label || "what",
      pos: object.features && object.features.pos ? object.features.pos : "noun",
      syntax: `${object.syntax || "object_np"} instrument_np coverb_object`,
      slots: ["coverb_object", "instrument", "object", "np"],
      reason: "The NP after 用 is the visible instrument object of a preverbal coverb phrase, not the main action object.",
    });
  }
  return object;
}

function comitativeCoverbObject(node) {
  if (!node) return null;
  if (!rawNodeHasSlot(node, "co_participant") && !rawNodeHasSlot(node, "np") && !rawNodeHasSlot(node, "subject")) return null;
  if (node.kind === "token") {
    return bridgeFramePartClone(node, {
      label: node.label || "who",
      pos: "np",
      syntax: `${node.syntax || "participant_np"} coverb_object co_participant`,
      slots: ["coverb_object", "co_participant", "np"],
      reason: "The NP after 同 is the object of a preverbal coverb phrase. Depending on the following predicate it may be an addressee/interpersonal participant or a true co-participant, not the clause subject.",
    });
  }
  return node;
}

function nominalModifierClone(node, reason) {
  if (!node || node.kind !== "token") return node;
  if (!isToken(node, "其他")) return node;
  return parserInactiveTokenClone(node, {
    label: "func",
    pos: "determiner",
    syntax: "nominal_modifier determiner_like_modifier modifier",
    slots: ["modifier"],
    reason: reason || "其他 is a determiner-like modifier inside a modified NP; the head noun carries the who/what role.",
    role_resolution_note: "其他 modifies the following head noun and should not learner-display as a head/object what role in 其他同事.",
  });
}

function comitativeCoverbObjectFromNodes(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length === 1) return comitativeCoverbObject(compact[0]);
  if (compact.length === 2 && rawNodeHasSlot(compact[0], "modifier") && (rawNodeHasSlot(compact[1], "co_participant") || rawNodeHasSlot(compact[1], "head_noun") || rawNodeHasSlot(compact[1], "subject"))) {
    const phraseChildren = [
      nominalModifierClone(compact[0], "其他 modifies 同事 inside the 同 coverb object NP; 同事 carries the participant/head role."),
      compact[1],
    ];
    const phrase = construction("ModifiedNP", "NP", phraseChildren, {
      primary: "co_participant",
      note: "Modified NP inside an interpersonal/comitative 同 coverb phrase.",
      slots: templateDerivedSlots("ModifiedNP", phraseChildren),
      trace: traceInfo("generative_template", {
        construction_type: "ModifiedNP",
        template_family: "generative_template",
        template: ["modifier!", "head_noun!"],
        assigned_slots: ["modifier", "head_noun"],
        surfaces: phraseChildren.map((node) => flattenSurface(node)),
        subspan: true,
        np_subtype: "modified_co_participant_np",
        reason: "其他 is contextualized as a modifier/determiner-like child of 同事, not as a learner-visible what/object role.",
      }),
    });
    return phrase;
  }
  return bridgeNPFromNodes(compact);
}

function tongCoverbSubtype(predicateNodes) {
  const surfaces = (predicateNodes || []).map((node) => flattenSurface(node));
  const hasTogetherMarker = surfaces.some((surface) => surface.includes("一齊"));
  if (hasTogetherMarker) return "comitative";
  const hasSpeechPredicate = (predicateNodes || []).some((node) => rawNodeHasSlot(node, "speech_verb") || ["講", "話"].includes(flattenSurface(node)));
  if (hasSpeechPredicate) return "co_participant_or_addressee";
  return "co_participant_or_interpersonal";
}

function tongCoverbDoctrineReason(subtype) {
  if (subtype === "comitative") {
    return "同 + co-participant modifies the following predicate; 一齊 supports a true comitative/together-with reading. CoverbFrame remains a learner structural frame and does not settle VP-adjunct versus PredP-adjunct X-bar attachment.";
  }
  if (subtype === "co_participant_or_addressee") {
    return "同 + NP before a speech predicate marks an interpersonal addressee/co-participant relation, not necessarily literal together-with comitative. CoverbFrame remains a learner structural frame and does not settle VP-adjunct versus PredP-adjunct X-bar attachment.";
  }
  return "同 + NP introduces a preverbal interpersonal/co-participant coverb relation to the following predicate. CoverbFrame remains a learner structural frame and does not settle VP-adjunct versus PredP-adjunct X-bar attachment.";
}

function coverbFrameFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length < 3 || compact.length > 7) return null;

  let subject = null;
  let markerIndex = 0;
  const preCoverbModifiers = [];
  if (compact.length >= 4 && nodeCanFillSlot(compact[0], "subject")) {
    subject = compact[0];
    markerIndex = 1;
  }
  while (markerIndex < compact.length) {
    const candidate = compact[markerIndex];
    if (isToken(candidate, "喺") || isToken(candidate, "同") || isToken(candidate, "用")) break;
    const candidateSurface = flattenSurface(candidate);
    const candidateSlots = nodeSlots(candidate);
    const modifierLike = ["再", "先", "又", "都"].includes(candidateSurface)
      || candidateSlots.some((slot) => ["time", "time_head", "manner", "how", "focus_adverb"].includes(slot));
    if (!modifierLike || preCoverbModifiers.length >= 2) break;
    preCoverbModifiers.push(candidate);
    markerIndex += 1;
  }

  const marker = compact[markerIndex];
  if (isToken(marker, "用")) {
    if (compact.length <= markerIndex + 2) return null;
    const instrument = instrumentCoverbObjectFromNodes(compact.slice(markerIndex + 1, markerIndex + 2));
    if (!instrument) return null;
    const predicateNodes = predicateLikeForCoverbFrame(compact.slice(markerIndex + 2));
    if (!predicateNodes) return null;
    const markerChild = bridgeFramePartClone(marker, {
      label: "func",
      pos: "function",
      syntax: "instrument_coverb coverb_marker",
      slots: ["coverb_marker", "instrument_marker"],
      reason: "用 introduces a preverbal instrument coverb phrase before the main predicate.",
    });
    const children = [...(subject ? [subject] : []), ...preCoverbModifiers, markerChild, instrument, ...predicateNodes, ...particles];
    return construction("CoverbFrame", "Coverb", children, {
      note: "Preverbal instrument coverb frame: optional subject + 用 instrument NP + main predicate. It keeps the instrument object distinct from the main action object.",
      slots: templateDerivedSlots("CoverbFrame", children),
      trace: traceInfo("generative_template", {
        construction_type: "CoverbFrame",
        template_family: "generative_template",
        template: [
          ...(subject ? ["subject?"] : []),
          ...preCoverbModifiers.map(() => "manner?"),
          "coverb_marker!",
          "coverb_object!",
          ...predicateNodes.map((node, index) => index === predicateNodes.length - 1 ? "predicate!" : "manner?"),
          "particle?"
        ],
        assigned_slots: [...(subject ? ["subject"] : []), ...preCoverbModifiers.map(() => "manner"), "coverb_marker", "coverb_object", ...predicateNodes.map((node, index) => index === predicateNodes.length - 1 ? "predicate" : "manner"), ...particles.map(() => "particle")],
        coverb_subtype: "instrument",
        boundary_guardrail: "instrument_object_not_main_action_object",
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "用 + NP is a preverbal instrument coverb phrase modifying the main predicate; it should not collapse into NominalHeadSpan or treat the instrument NP as the action object.",
        xbar_status: "surface_learner_frame_not_final_xbar_claim",
        compatible_attachment_analyses: ["vp_adjunct", "predp_adjunct"],
        not_claims: ["not_head_np", "not_transitive_vp_object_boundary", "not_full_xbar_tree"],
      }),
    });
  }

  if (isToken(marker, "喺")) {
    const locPhrase = locativeCoverbPhraseFromNodes(compact.slice(markerIndex, markerIndex + 2));
    if (!locPhrase) return null;
    const predicateNodes = predicateLikeForCoverbFrame(compact.slice(markerIndex + 2));
    if (!predicateNodes) return null;
    const children = [...(subject ? [subject] : []), ...preCoverbModifiers, locPhrase, ...predicateNodes, ...particles];
    return construction("CoverbFrame", "Coverb", children, {
      note: "Preverbal locative coverb frame: optional subject + 喺 location + main predicate. This is a learner structural frame compatible with VP-adjunct or PredP-adjunct analyses, not a full X-bar commitment.",
      slots: templateDerivedSlots("CoverbFrame", children),
      trace: traceInfo("generative_template", {
        construction_type: "CoverbFrame",
        template_family: "generative_template",
        template: [
          ...(subject ? ["subject?"] : []),
          ...preCoverbModifiers.map(() => "manner?"),
          "coverb_phrase!",
          ...predicateNodes.map((node, index) => index === predicateNodes.length - 1 ? "predicate!" : "manner?"),
          "particle?"
        ],
        assigned_slots: [...(subject ? ["subject"] : []), ...preCoverbModifiers.map(() => "manner"), "coverb_phrase", ...predicateNodes.map((node, index) => index === predicateNodes.length - 1 ? "predicate" : "manner"), ...particles.map(() => "particle")],
        coverb_subtype: "locative",
        boundary_guardrail: "preverbal_coverb_not_postverbal_transfer_or_serial_purpose",
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "喺 + location is a preverbal coverb phrase modifying the main predicate; it should not be collapsed into TransferDitransitiveVP, RecipientFrame, or SerialVerbPurposeChain. This parser frame does not claim to settle VP-adjunct versus PredP-adjunct X-bar attachment or coverb/control-verb edge cases.",
        xbar_status: "surface_learner_frame_not_final_xbar_claim",
        compatible_attachment_analyses: ["vp_adjunct", "predp_adjunct"],
        not_claims: ["not_ordinary_preposition", "not_transfer_ditransitive", "not_serial_purpose_chain", "not_full_xbar_tree"],
      }),
    });
  }

  if (isToken(marker, "同")) {
    if (compact.length <= markerIndex + 2) return null;
    let object = null;
    let predicateNodes = null;
    for (const objectLength of [2, 1]) {
      const objectStart = markerIndex + 1;
      const objectEnd = objectStart + objectLength;
      if (compact.length <= objectEnd) continue;
      const candidateObject = comitativeCoverbObjectFromNodes(compact.slice(objectStart, objectEnd));
      const candidatePredicate = predicateLikeForCoverbFrame(compact.slice(objectEnd));
      if (candidateObject && candidatePredicate) {
        object = candidateObject;
        predicateNodes = candidatePredicate;
        break;
      }
    }
    if (!object || !predicateNodes) return null;
    const coverbSubtype = tongCoverbSubtype(predicateNodes);
    const coverbReason = tongCoverbDoctrineReason(coverbSubtype);
    const markerChild = bridgeFramePartClone(marker, {
      label: "func",
      pos: "function",
      syntax: coverbSubtype === "comitative" ? "comitative_coverb coverb_marker" : "interpersonal_coverb coverb_marker",
      slots: ["coverb_marker", "comitative_marker"],
      reason: coverbSubtype === "comitative"
        ? "同 introduces a preverbal comitative coverb phrase before a together-with predicate."
        : "同 introduces a preverbal interpersonal/addressee coverb phrase before the main predicate.",
    });
    const children = [...(subject ? [subject] : []), ...preCoverbModifiers, markerChild, object, ...predicateNodes, ...particles];
    return construction("CoverbFrame", "Coverb", children, {
      note: "Preverbal 同 coverb frame: optional subject + 同 coverb object + main predicate. It may be addressee/interpersonal or truly comitative depending on the predicate, and is distinct from transfer ditransitives and serial-purpose chains.",
      slots: templateDerivedSlots("CoverbFrame", children),
      trace: traceInfo("generative_template", {
        construction_type: "CoverbFrame",
        template_family: "generative_template",
        template: [
          ...(subject ? ["subject?"] : []),
          ...preCoverbModifiers.map(() => "manner?"),
          "coverb_marker!",
          "coverb_object!",
          ...predicateNodes.map((node, index) => index === predicateNodes.length - 1 ? "predicate!" : "manner?"),
          "particle?"
        ],
        assigned_slots: [...(subject ? ["subject"] : []), ...preCoverbModifiers.map(() => "manner"), "coverb_marker", "coverb_object", ...predicateNodes.map((node, index) => index === predicateNodes.length - 1 ? "predicate" : "manner"), ...particles.map(() => "particle")],
        coverb_subtype: coverbSubtype,
        boundary_guardrail: "preverbal_coverb_not_postverbal_transfer_or_serial_purpose",
        surfaces: children.map((node) => flattenSurface(node)),
        reason: coverbReason,
        xbar_status: "surface_learner_frame_not_final_xbar_claim",
        compatible_attachment_analyses: ["vp_adjunct", "predp_adjunct"],
        not_claims: ["not_ordinary_preposition", "not_transfer_ditransitive", "not_serial_purpose_chain", "not_full_xbar_tree"],
      }),
    });
  }

  return null;
}

  return {
    coverbFrameFallback,
  };
};
