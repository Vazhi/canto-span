"use strict";

module.exports = function createPassivePermissiveDetectors(dependencies = {}) {
  const {
    bridgeFramePartClone,
    categorySubspanFor,
    cleanSlots,
    construction,
    cp021bNodeIsPersonEvidence,
    firstToken,
    flattenSurface,
    isToken,
    nodeCanFillSlot,
    nodeSlots,
    templateDerivedSlots,
    traceInfo,
    withoutIgnorableSpaceText,
    withoutTrailingParticles,
  } = dependencies;

function cp020NodeIsPersonEvidence(node) {
  const tok = firstToken(node) || node;
  const slots = nodeSlots(node);
  // 蚊 is globally also the colloquial currency unit, but immediately after
  // passive/permissive 畀/俾 and before an event predicate it is an animate
  // mosquito agent. Keep this override local to CP020 relation routing.
  const localAnimateAgent = flattenSurface(node) === "蚊";
  return localAnimateAgent
    || Boolean(tok && tok.label === "who")
    || slots.includes("person_np")
    || slots.includes("co_participant")
    || slots.includes("recipient")
    || slots.includes("stance_holder")
    || slots.includes("subject");
}

function cp020NodeIsObjectEvidence(node) {
  const tok = firstToken(node) || node;
  const slots = nodeSlots(node);
  return Boolean(tok && (tok.label === "what" || tok.label === "where" || tok.label === "measure_word"))
    || slots.includes("object")
    || slots.includes("head_noun")
    || slots.includes("classifier")
    || slots.includes("np");
}

function cp020NodeIsPredicateEvidence(node) {
  const slots = nodeSlots(node);
  return slots.includes("predicate")
    || slots.includes("action_verb")
    || slots.includes("main_verb")
    || slots.includes("movement_verb")
    || slots.includes("stative_predicate")
    || slots.includes("vp");
}

function cp020NodeIsBlockingPreMarkerMaterial(node) {
  const slots = nodeSlots(node);
  return slots.includes("action_verb")
    || slots.includes("main_verb")
    || slots.includes("predicate")
    || slots.includes("perfective_aspect")
    || slots.includes("progressive_aspect")
    || slots.includes("negator");
}

const CP020_PERMISSIVE_FAVORING_PREDICATE_SURFACES = new Set([
  "打籃球",
  "食蛋糕",
  "跌低",
]);

function cp020PredicateFavorsPermissive(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  const surface = compact.map(flattenSurface).join("");
  if (CP020_PERMISSIVE_FAVORING_PREDICATE_SURFACES.has(surface)) return true;
  return compact.some((node) => {
    const slots = nodeSlots(node);
    const nodeSurface = flattenSurface(node);
    return slots.includes("movement_verb")
      || slots.includes("motion_predicate")
      || slots.includes("motion_goal_vp")
      || nodeSurface === "去"
      || nodeSurface.startsWith("去旅行");
  });
}

function cp020TrailingObjectCandidateSpan(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  // A retained patient needs an overt NP boundary. Classifier-led material and
  // already typed NPs are strong cues. A final bare object noun is allowed only
  // when it is not also typed as a location, so 罰錢 can retain 錢 while 上牆 is
  // not misread as a retained patient.
  for (let i = 1; i < compact.length; i += 1) {
    const node = compact[i];
    const slots = nodeSlots(node);
    const tok = firstToken(node) || node;
    const syntax = String((tok && tok.syntax) || node.syntax || "");
    if (node.kind === "construction" && (slots.includes("np") || slots.includes("object"))) {
      return { start: i, end: i + 1 };
    }
    if (slots.includes("classifier")) {
      let end = i + 1;
      while (end < compact.length) {
        const next = compact[end];
        const nextTok = firstToken(next) || next;
        const nextSlots = nodeSlots(next);
        const nextSyntax = String((nextTok && nextTok.syntax) || next.syntax || "");
        if (next.kind === "text" || nodeCanFillSlot(next, "particle") || nodeCanFillSlot(next, "aspect_marker")
          || cp020NodeIsPredicateEvidence(next) || nextSlots.includes("location") || nextSlots.includes("time")
          || /location|direction|temporal/u.test(nextSyntax)
          || Boolean(nextTok && ["doing", "where", "when", "particle", "func"].includes(nextTok.label))) break;
        end += 1;
      }
      return { start: i, end: Math.max(i + 1, end) };
    }
    if (i === compact.length - 1 && tok && (tok.label === "what" || slots.includes("object"))
      && !slots.includes("location") && !/location/u.test(syntax)) {
      const previous = compact[i - 1];
      const previousSlots = previous ? nodeSlots(previous) : [];
      const previousSurface = previous ? flattenSurface(previous) : "";
      const start = previous && (previousSlots.includes("quantity") || previousSlots.includes("degree") || ["好多", "幾多", "少少"].includes(previousSurface))
        ? i - 1
        : i;
      return { start, end: i + 1 };
    }
  }
  return null;
}


function cp020ContextualPredicateLearnerChildren(nodes) {
  const children = (nodes || []).map((node) => node);
  const surfaceAt = (index) => index >= 0 && index < children.length ? flattenSurface(children[index]) : "";
  for (let i = 0; i < children.length - 1; i += 1) {
    if (surfaceAt(i) !== "上" || surfaceAt(i + 1) !== "牆") continue;
    children[i] = bridgeFramePartClone(children[i], {
      label: "func",
      pos: "directional_linker",
      syntax: "spatial_goal_linker movement_direction_up path_component",
      slots: ["movement_direction", "path_component"],
      note: "onto / up onto",
      reason: "In 貼上牆, 上 links the placement event to its spatial goal; it is not the temporal word 'previous'.",
      trace_detail: {
        learner_gloss_lines: ["onto / up onto", "Spatial direction toward the following goal, not time."],
      },
    });
    children[i + 1] = bridgeFramePartClone(children[i + 1], {
      label: "where",
      pos: "location",
      syntax: "spatial_goal location_np wall_location",
      slots: ["goal", "location", "np"],
      note: "wall / onto the wall",
      reason: "After spatial 上 in 貼上牆, 牆 is the placement goal rather than an ordinary object.",
      trace_detail: {
        learner_gloss_lines: ["wall / onto the wall", "The spatial goal of the placement event."],
      },
    });
    i += 1;
  }
  return children;
}

function passivePermissiveRelationFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.some((node) => node.kind === "text" && /[，,；;：:。！？?!]/u.test(String(node.text || node.surface || "")))) return null;
  const beiIndex = compact.findIndex((node, index) => index > 0 && (isToken(node, "畀") || isToken(node, "俾")));
  if (beiIndex <= 0 || beiIndex >= compact.length - 2) return null;

  let participantNodes = compact.slice(0, beiIndex);
  let modal = null;
  if (participantNodes.length >= 2 && nodeCanFillSlot(participantNodes[participantNodes.length - 1], "modal")) {
    modal = participantNodes[participantNodes.length - 1];
    participantNodes = participantNodes.slice(0, -1);
  }
  if (!participantNodes.length || participantNodes.length > 5) return null;
  if (participantNodes.some(cp020NodeIsBlockingPreMarkerMaterial)) return null;
  // The pre-marker span must be participant-like, not a matrix predicate such
  // as 鍾意. Unknown CJK can remain inside an NP-shaped span, but an overt
  // action/state/manner predicate before 畀 belongs to a larger construction.
  if (participantNodes.some((node) => {
    const tok = firstToken(node) || node;
    return Boolean(tok && ["doing", "like", "how", "when", "particle"].includes(tok.label));
  })) return null;
  if (!participantNodes.some((node) => cp020NodeIsPersonEvidence(node) || cp020NodeIsObjectEvidence(node))) return null;

  const post = compact.slice(beiIndex + 1);
  if (nodeCanFillSlot(post[0], "perfective_aspect") || nodeCanFillSlot(post[0], "progressive_aspect") || nodeCanFillSlot(post[0], "aspect_marker")) return null;
  let agentNodes = [];
  let predicateNodes = [];
  if (cp020NodeIsPersonEvidence(post[0])) {
    if (flattenSurface(post[0]) === "阿" && post.length >= 3) {
      agentNodes = post.slice(0, 2);
      predicateNodes = post.slice(2);
    } else {
      agentNodes = [post[0]];
      predicateNodes = post.slice(1);
    }
  } else {
    const predicateStart = post.findIndex((node, index) => index > 0 && cp020NodeIsPredicateEvidence(node));
    if (predicateStart <= 0) return null;
    agentNodes = post.slice(0, predicateStart);
    predicateNodes = post.slice(predicateStart);
  }
  if (!agentNodes.length || !predicateNodes.length) return null;
  // CP021B two-person GIVE boundary: a second person/pronoun is not an event
  // predicate and must never be absorbed as a passive/permissive reading.
  if (predicateNodes.every(cp021bNodeIsPersonEvidence)) return null;
  const agentIsClassifierPersonNP = agentNodes.length === 2
    && nodeCanFillSlot(agentNodes[0], "classifier")
    && cp020NodeIsPersonEvidence(agentNodes[1]);
  if (agentNodes.some((node, index) => {
    if (cp020NodeIsPersonEvidence(node)) return false;
    if (agentIsClassifierPersonNP && index === 0) return false;
    const tok = firstToken(node) || node;
    return nodeCanFillSlot(node, "classifier") || Boolean(tok && (tok.label === "what" || tok.label === "measure_word"));
  })) return null;
  if (agentNodes.some(cp020NodeIsPredicateEvidence)) return null;
  if (predicateNodes.every((node) => node.kind === "text" || nodeCanFillSlot(node, "particle"))) return null;
  // Do not swallow a right-dislocated vocative or repair after a sentence-final
  // particle. Leave the larger natural-corpus turn review-bearing instead.
  const internalParticleIndex = predicateNodes.findIndex((node, index) => index < predicateNodes.length - 1 && nodeCanFillSlot(node, "particle"));
  if (internalParticleIndex >= 0) return null;
  { const firstPred = predicateNodes[0]; const tok = firstToken(firstPred) || firstPred; const syntax = String((tok && tok.syntax) || firstPred.syntax || ""); if (!cp020NodeIsPredicateEvidence(firstPred) && (nodeCanFillSlot(firstPred, "classifier") || nodeCanFillSlot(firstPred, "object") || nodeCanFillSlot(firstPred, "demonstrative") || /determiner/u.test(syntax) || Boolean(tok && (tok.label === "what" || tok.label === "measure_word")))) return null; }

  const marker = bridgeFramePartClone(compact[beiIndex], {
    label: "func",
    pos: "function",
    syntax: "bei_passive_permissive_marker",
    slots: ["passive_marker", "bei_marker"],
    reason: "畀/俾 links the preceding participant with a following participant and predicate; the isolated surface may express passive voice or permissive 'let'.",
  });

  const participantHasPerson = participantNodes.some(cp020NodeIsPersonEvidence);
  const participantHasObjectShape = participantNodes.some((node) => {
    const tok = firstToken(node) || node;
    const slots = nodeSlots(node);
    return Boolean(tok && (tok.label === "what" || tok.label === "measure_word")) || slots.includes("classifier") || slots.includes("object");
  });
  const participantIsPersonOnly = participantHasPerson && !participantHasObjectShape;
  // Preserve a reviewed VP such as 打籃球 before looking for a retained patient.
  // Otherwise the lexical object inside the activity VP is incorrectly exposed
  // as an indirect-passive patient candidate.
  const groupedPredicate = categorySubspanFor(predicateNodes, ["ProductiveVO", "TransitiveVP"]);
  const predicateAnalysisNodes = groupedPredicate ? [groupedPredicate] : predicateNodes;
  const retainedSpan = cp020TrailingObjectCandidateSpan(predicateAnalysisNodes);
  const retainedSurface = retainedSpan
    ? predicateAnalysisNodes.slice(retainedSpan.start, retainedSpan.end).map(flattenSurface).join("")
    : "";
  const agentSurface = agentNodes.map(flattenSurface).join("");
  const participantSurface = participantNodes.map(flattenSurface).join("");

  const semanticReviewFlags = [];
  const readingCandidates = [];
  const permissiveFavored = participantIsPersonOnly && !retainedSurface && cp020PredicateFavorsPermissive(predicateAnalysisNodes);
  let passiveSubtype = "canonical_passive_candidate";
  let learnerLabel = "Passive";
  if (retainedSurface) {
    semanticReviewFlags.push("passive_permissive_surface_ambiguity", "retained_patient_role_requires_review");
    readingCandidates.push("indirect_passive_candidate", "permissive_let_allow");
    if (!participantIsPersonOnly) readingCandidates.push("canonical_passive_role_boundary");
    learnerLabel = "Passive / let";
    passiveSubtype = "retained_object_passive_permissive_ambiguity";
  } else if (permissiveFavored) {
    readingCandidates.push("permissive_let_allow");
    learnerLabel = "Let / allow";
    passiveSubtype = "permissive_candidate";
  } else if (participantIsPersonOnly) {
    semanticReviewFlags.push("passive_permissive_surface_ambiguity");
    readingCandidates.push("canonical_or_indirect_passive", "permissive_let_allow");
    learnerLabel = "Passive / let";
    passiveSubtype = "canonical_passive_permissive_ambiguity";
  } else {
    readingCandidates.push("canonical_passive");
  }
  const learnerGlossLines = learnerLabel === "Passive"
    ? ["passive relation", "The first participant is presented as undergoing the following event."]
    : learnerLabel === "Let / allow"
      ? ["let / allow relation", "The first participant allows the following participant to carry out the action."]
      : ["passive or let / allow relation", "The surface may describe something happening to the first participant or someone being allowed to act; context may decide."];

  const agentSpanIsKnownPersonExpression = agentNodes.map(flattenSurface).join("") === "阿媽";
  const agentChildren = agentNodes.map((node) => {
    const surface = flattenSurface(node);
    if (agentSpanIsKnownPersonExpression && surface === "阿") {
      return bridgeFramePartClone(node, {
        label: "func",
        pos: "prefix",
        syntax: "familiar_kinship_prefix bei_postmarker_participant_part",
        slots: ["postmarker_participant"],
        note: "familiar kinship/name prefix; part of 阿媽",
        trace_detail: { learner_gloss_lines: ["familiar kinship/name prefix", "Part of 阿媽; not the person referent by itself."] },
        reason: "Inside the overt post-畀/俾 participant 阿媽, 阿 is a familiar kinship/name prefix; 媽 carries the person reference.",
      });
    }
    if (cp020NodeIsPersonEvidence(node) || agentSpanIsKnownPersonExpression) {
      return bridgeFramePartClone(node, {
        label: "who",
        pos: "np",
        syntax: `${node.syntax || "agent_np"} bei_postmarker_participant`,
        slots: ["postmarker_participant", "person_np", "np", "subject"],
        note: agentSpanIsKnownPersonExpression ? "mum / mother" : node.note,
        trace_detail: agentSpanIsKnownPersonExpression ? { learner_gloss_lines: ["mum / mother", "The person-denoting head of 阿媽."] } : undefined,
        reason: "Overt post-畀/俾 participant in the passive/permissive relation; this participant may be a passive agent or the actor who is permitted to act.",
      });
    }
    return node;
  });
  const predicateChildren = groupedPredicate ? [groupedPredicate] : cp020ContextualPredicateLearnerChildren(predicateNodes);
  const children = [...participantNodes, ...(modal ? [modal] : []), marker, ...agentChildren, ...predicateChildren, ...particles];
  return construction("PassivePermissiveRelation", learnerLabel, children, {
    note: "Transparent 畀/俾 passive–permissive relation. The relation preserves canonical-passive, retained-object/indirect-passive, and permissive alternatives instead of presenting generic affectedness as Cantonese grammar.",
    slots: cleanSlots(["passive_permissive_relation", "bei_relation", "clause", "predicate", "vp", "pre_marker_participant", "postmarker_participant", ...(retainedSurface ? ["retained_patient_candidate", "object"] : []), ...templateDerivedSlots("PassivePermissiveRelation", children)]),
    trace: traceInfo("generative_template", {
      construction_type: "PassivePermissiveRelation",
      template_family: "generative_template",
      template: ["participant!", "modal?", "bei_marker!", "postmarker_participant!", "predicate_material!", "particle?"],
      assigned_slots: ["pre_marker_participant", ...(modal ? ["modal"] : []), "bei_marker", "postmarker_participant", "predicate", ...(retainedSurface ? ["retained_patient_candidate"] : []), ...particles.map(() => "particle")],
      passive_subtype: passiveSubtype,
      reading_candidates: readingCandidates,
      participant_surface: participantSurface,
      postmarker_participant_surface: agentSurface,
      retained_patient_candidate_surface: retainedSurface,
      semantic_review_flags: semanticReviewFlags,
      learner_gloss_lines: learnerGlossLines,
      not_claims: ["not_generic_affectedness_construction", "not_deterministic_passive_classifier", "not_generic_force_causative"],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "CP020 replaces the debunked AffectednessFrame with one transparent passive/permissive relation. Inanimate/full-patient shapes may support canonical passive; independently supported motion and bounded actor-oriented predicates may favor permissive let/allow; genuinely ambiguous animate and retained-object strings preserve competing readings.",
    }),
  });
}

  return {
    cp020NodeIsPersonEvidence,
    cp020NodeIsPredicateEvidence,
    passivePermissiveRelationFallback,
  };
};
