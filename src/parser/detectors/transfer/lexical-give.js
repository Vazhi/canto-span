"use strict";

module.exports = function createLexicalGiveDetectors(dependencies = {}) {
  const {
    bridgeFramePartClone,
    categorySubspanFor,
    classifierObjectNPFromNodes,
    cleanSlots,
    construction,
    firstToken,
    flattenSurface,
    isToken,
    nodeCanFillSlot,
    nodeSlots,
    traceInfo,
    withoutIgnorableSpaceText,
    withoutTrailingParticles,
  } = dependencies;

// CP021B uses one shared orthographic path for both common bei2 spellings.
// The marker's grammatical role is selected only inside a bounded relation.
function cp021bIsBei2Marker(node) {
  return isToken(node, "畀") || isToken(node, "俾");
}

const CP021B_REVIEWED_PERSON_SURFACES = new Set([
  "我", "你", "佢", "我哋", "你哋", "佢哋",
  "阿媽", "媽媽", "阿明", "張三", "細佬", "老師", "學生", "老闆",
]);

function cp021bNodeIsPersonEvidence(node) {
  const tok = firstToken(node) || node;
  const slots = nodeSlots(node);
  const surface = flattenSurface(node);
  return CP021B_REVIEWED_PERSON_SURFACES.has(surface)
    || Boolean(tok && tok.label === "who")
    || slots.includes("person_np")
    || slots.includes("proper_name")
    || slots.includes("named_address_term")
    || slots.includes("vocative_address_term");
}

function cp021bSpanIsPersonNP(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length || compact.some(cp021bIsBei2Marker)) return false;
  const surface = compact.map(flattenSurface).join("");
  if (CP021B_REVIEWED_PERSON_SURFACES.has(surface)) return true;
  return compact.every(cp021bNodeIsPersonEvidence);
}

function cp021bNodeIsThingEvidence(node) {
  const tok = firstToken(node) || node;
  const slots = nodeSlots(node);
  const syntax = String((tok && tok.syntax) || node.syntax || "");
  return Boolean(tok && (tok.label === "what" || tok.label === "measure_word"))
    || slots.includes("object")
    || slots.includes("head_noun")
    || slots.includes("classifier")
    || slots.includes("currency_unit")
    || /object_np|currency_unit|classifier/u.test(syntax);
}

function cp021bSpanIsThingNP(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length || compact.some(cp021bIsBei2Marker) || cp021bSpanIsPersonNP(compact)) return false;
  const last = compact[compact.length - 1];
  const hasThingEvidence = compact.some(cp021bNodeIsThingEvidence);
  const hasNominalHead = cp021bNodeIsThingEvidence(last)
    || nodeCanFillSlot(last, "np")
    || nodeCanFillSlot(last, "head_noun");
  return hasThingEvidence && hasNominalHead;
}

function cp021bArgumentSpan(nodes, options = {}) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  const slots = cleanSlots(options.slots || ["np"]);
  const role = options.role || "participant";
  const reason = options.reason || "The overt nominal span is preserved without inserting a hidden participant.";
  if (compact.length === 1 && compact[0].kind === "token") {
    const base = compact[0];
    return bridgeFramePartClone(base, {
      label: base.label || options.label || "neutral",
      pos: options.label === "who" ? "np" : "noun",
      syntax: `${base.syntax || "nominal"} cp021b_${role}`,
      slots,
      reason,
    });
  }
  if (compact.length === 1 && compact[0].kind === "construction") {
    return {
      ...compact[0],
      slots,
      parent_role_assignment: {
        construction_type: options.parent_type || "CP021BRelation",
        assigned_role: role,
        reason,
      },
    };
  }
  const typed = categorySubspanFor(compact, [
    "QuantityNP", "QuantifiedClassifierNP", "ClassifierObjectNP", "RelativeClauseNP", "ModifiedNP", "NominalHeadSpan",
  ]) || classifierObjectNPFromNodes(compact);
  if (typed && flattenSurface(typed) === compact.map(flattenSurface).join("")) {
    return {
      ...typed,
      slots,
      parent_role_assignment: {
        construction_type: options.parent_type || "CP021BRelation",
        assigned_role: role,
        reason,
      },
    };
  }
  const type = options.label === "who" ? "NominalHeadSpan" : "ModifiedNP";
  return construction(type, options.label === "who" ? "NP" : "ModNP", compact, {
    note: reason,
    slots,
    trace: traceInfo("generative_template", {
      construction_type: type,
      template_family: "construction_template",
      cp021b_design_family: "overt_nominal_span",
      assigned_slots: compact.map(() => "nominal_material"),
      surfaces: compact.map(flattenSurface),
      subspan: true,
      reason,
    }),
  });
}

function cp021bLexicalGiveSplit(argumentNodes) {
  const compact = withoutIgnorableSpaceText(argumentNodes || []);
  const candidates = [];
  for (let index = 1; index < compact.length; index += 1) {
    const first = compact.slice(0, index);
    const second = compact.slice(index);
    const firstPerson = cp021bSpanIsPersonNP(first);
    const secondPerson = cp021bSpanIsPersonNP(second);
    const firstThing = cp021bSpanIsThingNP(first);
    const secondThing = cp021bSpanIsThingNP(second);
    if (firstThing && !firstPerson && secondPerson) {
      candidates.push({ profile: "theme_recipient_baseline", first, second });
    }
    if (firstPerson && secondThing && !secondPerson) {
      candidates.push({ profile: "nonbaseline_participant_order_unresolved", first, second });
    }
  }
  return candidates.length === 1 ? candidates[0] : null;
}

function lexicalGiveRelationFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (particles.length) return null;
  const compact = withoutIgnorableSpaceText(bareCore);
  const markerIndexes = compact
    .map((node, index) => cp021bIsBei2Marker(node) ? index : -1)
    .filter((index) => index >= 0);
  if (markerIndexes.length !== 1) return null;
  const markerIndex = markerIndexes[0];
  const subjectNodes = compact.slice(0, markerIndex);
  if (subjectNodes.length && !cp021bSpanIsPersonNP(subjectNodes)) return null;

  const marker = compact[markerIndex];
  let argumentStart = markerIndex + 1;
  let aspect = null;
  if (compact[argumentStart] && isToken(compact[argumentStart], "咗")) {
    aspect = compact[argumentStart];
    argumentStart += 1;
  }
  const argumentNodes = compact.slice(argumentStart);
  if (argumentNodes.length < 2 || argumentNodes.some(cp021bIsBei2Marker)) return null;
  const split = cp021bLexicalGiveSplit(argumentNodes);
  if (!split) return null;

  const baseline = split.profile === "theme_recipient_baseline";
  const subject = subjectNodes.length
    ? cp021bArgumentSpan(subjectNodes, {
      parent_type: "LexicalGiveRelation",
      label: "who",
      role: "subject",
      slots: ["subject", "person_np", "np"],
      reason: "This independently person-denoting span is the overt material before lexical GIVE; no subject is inserted when it is absent.",
    })
    : null;
  const give = bridgeFramePartClone(marker, {
    label: "doing",
    pos: "verb",
    syntax: "lexical_give_predicate",
    slots: ["transfer_predicate", "action_verb", "main_verb", "predicate"],
    reason: "畀/俾 is the lexical giving predicate in this bounded CP021B profile, not a post-theme linker or passive/permissive marker.",
  });
  const aspectChild = aspect ? bridgeFramePartClone(aspect, {
    label: "func",
    pos: "aspect",
    syntax: "perfective_aspect",
    slots: ["perfective_aspect", "aspect_marker"],
    reason: "咗 is the overt perfective marker immediately after lexical GIVE.",
  }) : null;
  const firstArgument = cp021bArgumentSpan(split.first, baseline ? {
    parent_type: "LexicalGiveRelation",
    label: "what",
    role: "theme",
    slots: ["theme", "object", "np"],
    reason: "The uniquely split first nominal span has independent thing evidence and receives Theme/Object only in the reviewed theme-before-recipient profile.",
  } : {
    parent_type: "LexicalGiveRelation",
    label: "who",
    role: "post_give_participant_1",
    slots: ["post_give_participant_1", "person_np", "np"],
    reason: "The first visible participant is person-like, but its semantic role is unresolved in the nonbaseline order.",
  });
  const secondArgument = cp021bArgumentSpan(split.second, baseline ? {
    parent_type: "LexicalGiveRelation",
    label: "who",
    role: "recipient_candidate",
    slots: ["recipient_candidate", "goal_candidate", "person_np", "np"],
    reason: "Recipient-candidate status follows from the reviewed lexical-GIVE profile plus independent person evidence, not final position alone.",
  } : {
    parent_type: "LexicalGiveRelation",
    label: "what",
    role: "post_give_participant_2",
    slots: ["post_give_participant_2", "np"],
    reason: "The second visible participant is thing-like, but no Theme/Object role is exported in the nonbaseline order.",
  });
  const children = [subject, give, aspectChild, firstArgument, secondArgument].filter(Boolean);
  const semanticCode = baseline
    ? "cp021b_provisional_lexical_give_relation"
    : "lexical_give_argument_order_unresolved";
  const explanation = baseline
    ? "The thing given is followed by the person who receives it in this reviewed pattern."
    : "A giving meaning is visible, but this order needs context; the parser does not decide who receives what.";
  return construction("LexicalGiveRelation", "Give", children, {
    note: explanation,
    slots: cleanSlots([
      "lexical_give_relation", "give_relation", "vp", "action_vp", "predicate", "transfer_predicate",
      ...(subject ? ["subject"] : []),
      ...(baseline
        ? ["theme", "object", "recipient_candidate", "goal_candidate"]
        : ["post_give_participant_1", "post_give_participant_2"]),
    ]),
    trace: traceInfo("generative_template", {
      construction_type: "LexicalGiveRelation",
      template_family: "construction_template",
      cp021b_design_family: "frozen_lexical_give",
      template: ["subject?", "lexical_give_predicate!", "perfective_aspect?", "postverbal_nominal_1!", "postverbal_nominal_2!"],
      assigned_slots: [
        ...(subject ? ["subject"] : []),
        "transfer_predicate",
        ...(aspect ? ["perfective_aspect"] : []),
        ...(baseline ? ["theme", "recipient_candidate"] : ["post_give_participant_1", "post_give_participant_2"]),
      ],
      relation_profile: split.profile,
      marker_surface: flattenSurface(marker),
      aspect_surface: aspect ? flattenSurface(aspect) : "",
      overt_subject_surface: subjectNodes.map(flattenSurface).join(""),
      postverbal_argument_surfaces: [split.first.map(flattenSurface).join(""), split.second.map(flattenSurface).join("")],
      visible_order: baseline ? "thing_before_person" : "person_before_thing",
      semantic_role_assignment: baseline ? "theme_and_recipient_candidate_from_reviewed_profile" : "unresolved",
      orthographic_parity: "畀=俾",
      hidden_participants_inserted: false,
      weight_rule_used: false,
      semantic_review_flags: [semanticCode],
      learner_gloss_lines: ["give", explanation],
      not_claims: ["not_free_order_alternation", "not_benefactive_linker", "not_passive_or_permissive", "not_supported_productive"],
      surfaces: children.map(flattenSurface),
      reason: explanation,
    }),
  });
}

  return {
    cp021bArgumentSpan,
    cp021bIsBei2Marker,
    cp021bNodeIsPersonEvidence,
    cp021bSpanIsPersonNP,
    cp021bSpanIsThingNP,
    lexicalGiveRelationFallback,
  };
};
