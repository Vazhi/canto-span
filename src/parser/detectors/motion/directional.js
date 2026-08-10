"use strict";

module.exports = function createDirectionalMotionDetectors(dependencies = {}) {
  const {
    categorySubspanFor, compositionPartClone, construction, constructionSlotsByType, firstToken,
    flattenSurface, isToken, nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots,
    token, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles,
  } = dependencies;

const DIRECTIONAL_MOTION_PATTERNS = [
  {
    surfaces: ["返", "上", "嚟"],
    type: "CompoundDirectionalMotionVP",
    label: "MotionVP",
    note: "Compound directional motion VP: 返 + 上 + 嚟 = come back up.",
    pattern: "return + upward_direction + deictic_come",
  },
  {
    surfaces: ["返", "上", "去"],
    type: "CompoundDirectionalMotionVP",
    label: "MotionVP",
    note: "Compound directional motion VP: 返 + 上 + 去 = go back up.",
    pattern: "return + upward_direction + deictic_go",
  },
  {
    surfaces: ["嚟"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Independent motion predicate: 嚟 = come.",
    pattern: "independent_deictic_come",
  },
  {
    surfaces: ["去"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Independent motion predicate: 去 = go.",
    pattern: "independent_deictic_go",
  },
];

const MULTIPART_DIRECTIONAL_LEFT = new Set(["返", "上", "落", "入", "出", "過"]);
const MULTIPART_DIRECTIONAL_RIGHT = new Set(["嚟", "去"]);
const POSTVERBAL_BLOCKING_SLOTS = ["object", "goal", "vp", "action_vp", "predicate", "action_verb", "main_verb"];

function significantNeighbor(nodes, index, direction) {
  let cursor = index + direction;
  while (cursor >= 0 && cursor < nodes.length) {
    const node = nodes[cursor];
    if (!(node && node.kind === "text" && /^\s*$/u.test(flattenSurface(node)))) return node;
    cursor += direction;
  }
  return null;
}

function independentMotionPatternAllowedAt(nodes, index, pattern) {
  if (pattern.type !== "DirectionalMotionVP" || pattern.surfaces.length !== 1) return true;
  const surface = pattern.surfaces[0];
  const previous = significantNeighbor(nodes, index, -1);
  const next = significantNeighbor(nodes, index, 1);
  const previousSurface = previous ? flattenSurface(previous) : "";
  const nextSurface = next ? flattenSurface(next) : "";

  // A directional component inside a visible multi-part form is not an
  // independently predicative AA49 node merely because the same lexeme can
  // occur independently elsewhere.
  if (surface === "落" && MULTIPART_DIRECTIONAL_RIGHT.has(nextSurface)) return false;
  if (MULTIPART_DIRECTIONAL_RIGHT.has(surface) && MULTIPART_DIRECTIONAL_LEFT.has(previousSurface)) return false;

  // Postverbal 去/嚟 after an already formed predicate/object belongs to the
  // directional-complement/caused-motion system, not AA49. Subject, time and
  // higher functional material are deliberately not blocked here so existing
  // outer composition can still own them around a narrow motion predicate.
  if (previous && POSTVERBAL_BLOCKING_SLOTS.some((slot) => nodeCanFillSlot(previous, slot))) return false;
  return true;
}

function directionalMotionPartClone(node, role) {
  const surface = flattenSurface(node);
  const syntaxBySurface = {
    "返": "return_motion_component",
    "落": "independent_downward_motion_predicate",
    "上": "movement_direction_up",
    "嚟": "independent_deictic_motion_predicate",
    "去": "independent_deictic_motion_predicate",
    "走": "independent_transition_motion_predicate",
  };
  const slotBySurface = {
    "返": "movement_verb",
    "落": "movement_verb",
    "上": "movement_direction",
    "嚟": "movement_verb",
    "去": "movement_verb",
    "走": "movement_verb",
  };
  return parserInactiveTokenClone(firstToken(node) || token(surface), {
    label: role || "doing",
    pos: role === "func" ? "function" : "verb",
    syntax: syntaxBySurface[surface] || "directional_motion_part",
    slots: [slotBySurface[surface] || "directional_motion_part"],
    reason: "Visible motion material is parser-inactive inside its owned motion construction; the parent exposes the relevant predicate affordance.",
  });
}

function makeDirectionalMotionVP(nodes, pattern) {
  const children = nodes.map((node) => directionalMotionPartClone(node, "doing"));
  const independent = pattern.type === "DirectionalMotionVP" && pattern.surfaces.length === 1;
  return construction(pattern.type, pattern.label, children, {
    slots: ["directional_motion_vp", "vp", "action_vp", "predicate", "movement_verb", "motion_predicate"],
    note: pattern.note,
    trace: traceInfo(independent ? "construction_template" : "generative_or_heuristic_slot_rule", {
      construction_type: pattern.type,
      template_family: independent ? "construction_template" : undefined,
      template: independent ? ["independent_motion_predicate!"] : undefined,
      assigned_slots: independent ? ["movement_verb"] : undefined,
      rule: independent ? "independently predicative single motion/path item" : "Cantonese directional motion compound",
      pattern: pattern.pattern,
      surfaces: pattern.surfaces,
      aa49_scope: independent ? "single_independent_motion_predicate" : undefined,
      not_claims: independent
        ? ["not_postverbal_directional_complement", "not_compound_directional", "not_manner_directional_sequence"]
        : undefined,
      reason: independent
        ? "AA49 represents a single lexical motion/path item in independently predicative position; shared directional vocabulary elsewhere does not inherit this identity."
        : "The multi-part directional form is represented by its separately controlled construction identity.",
    }),
  });
}

function directionalMotionTemplateFor(nodes, pattern) {
  const templated = categorySubspanFor(nodes, [pattern.type]);
  if (templated) return templated;
  return makeDirectionalMotionVP(nodes, pattern);
}

function negatedDirectionalMotionTemplateFor(negatorNode, vp) {
  const templated = categorySubspanFor([negatorNode, vp], ["NegatedDirectionalMotionVP"]);
  if (templated) return templated;
  return null;
}

function directionalPatternAt(nodes, index) {
  for (const pattern of DIRECTIONAL_MOTION_PATTERNS) {
    if (index + pattern.surfaces.length > nodes.length) continue;
    const window = nodes.slice(index, index + pattern.surfaces.length);
    if (window.some((node) => node && node.kind === "text")) continue;
    const surfaces = window.map((node) => flattenSurface(node));
    if (surfaces.every((surface, i) => surface === pattern.surfaces[i])
        && independentMotionPatternAllowedAt(nodes, index, pattern)) {
      return { pattern, length: pattern.surfaces.length };
    }
  }
  return null;
}

function wrapDirectionalMotionSubspans(nodes) {
  const result = [];
  let i = 0;
  while (i < nodes.length) {
    if (isToken(nodes[i], "唔")) {
      const negated = directionalPatternAt(nodes, i + 1);
      if (negated) {
        const vp = directionalMotionTemplateFor(nodes.slice(i + 1, i + 1 + negated.length), negated.pattern);
        const templatedNegatedVp = negatedDirectionalMotionTemplateFor(nodes[i], vp);
        result.push(templatedNegatedVp || construction("NegatedDirectionalMotionVP", "NegMotionVP", [parserInactiveTokenClone(nodes[i], {
          label: "func",
          pos: "function",
          syntax: "negator",
          slots: ["negator"],
          reason: "Negator is parser-inactive inside a negated directional-motion VP wrapper.",
        }), vp], {
          slots: ["negated_directional_motion_vp", "directional_motion_vp", "vp", "action_vp", "predicate", "movement_verb", "motion_predicate", "negator"],
          note: "Negated independent motion predicate.",
          trace: traceInfo("construction_template", {
            construction_type: "NegatedDirectionalMotionVP",
            template_family: "construction_template",
            template: ["negator!", "independent_motion_predicate!"],
            assigned_slots: ["negator", "motion_predicate"],
            surfaces: [flattenSurface(nodes[i]), flattenSurface(vp)],
            pattern: negated.pattern.pattern,
            reason: "Negation is an outer wrapper around the narrow independent motion predicate.",
          }),
        }));
        i += 1 + negated.length;
        continue;
      }
    }

    const match = directionalPatternAt(nodes, i);
    if (match) {
      result.push(directionalMotionTemplateFor(nodes.slice(i, i + match.length), match.pattern));
      i += match.length;
      continue;
    }

    result.push(nodes[i]);
    i += 1;
  }
  return result;
}

function independentMotionPredicateNode(sourceNode, profile) {
  const surface = flattenSurface(sourceNode);
  const movement = parserInactiveTokenClone(firstToken(sourceNode) || sourceNode, {
    label: "doing",
    pos: "verb",
    syntax: profile.syntax,
    slots: ["action_verb", "main_verb", "movement_verb", "predicate"],
    jyutping: profile.jyutping || "",
    note: profile.note,
    reason: profile.reason,
  });
  return construction("DirectionalMotionVP", "MotionVP", [movement], {
    slots: ["directional_motion_vp", "vp", "action_vp", "predicate", "movement_verb", "motion_predicate"],
    note: profile.note,
    trace: traceInfo("construction_template", {
      construction_type: "DirectionalMotionVP",
      template_family: "construction_template",
      template: ["independent_motion_predicate!"],
      assigned_slots: ["movement_verb"],
      surfaces: [surface],
      rule: "independently predicative single motion/path item",
      aa49_scope: "single_independent_motion_predicate",
      contextual_role_resolution: profile.contextual_role_resolution,
      not_claims: ["not_postverbal_directional_complement", "not_compound_directional", "not_manner_directional_sequence"],
    }),
  });
}

function transitionMotionPredicateFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (particles.length || !bareCore.length) return null;
  let cursor = 0;
  const subjectCandidate = bareCore[cursor];
  const hasFollowingTransition = isToken(bareCore[cursor + 1], "走");
  const subject = subjectCandidate && (nodeCanFillSlot(subjectCandidate, "subject") || (hasFollowingTransition && nodeCanFillSlot(subjectCandidate, "np")))
    ? bareCore[cursor++]
    : null;
  if (!isToken(bareCore[cursor], "走")) return null;
  const movementSource = bareCore[cursor++];
  const aspect = cursor < bareCore.length && ["咗", "過", "緊"].includes(flattenSurface(bareCore[cursor])) ? bareCore[cursor++] : null;
  if (cursor !== bareCore.length || !aspect) return null;

  const aa49 = independentMotionPredicateNode(movementSource, {
    syntax: "intransitive_motion_verb transition_motion_predicate",
    jyutping: "zau2",
    note: "One-word transition motion predicate headed by standalone 走.",
    reason: "At predicate onset, standalone 走 is an independent transition-motion verb rather than a postverbal directional result complement.",
    contextual_role_resolution: "standalone_motion_predicate_not_result_complement",
  });
  const motion = construction("PerfectiveVP", "PerfectiveVP", [aa49, aspect], {
    slots: ["perfective_vp", "vp", "action_vp", "predicate", "perfective_aspect", "directional_motion_vp", "movement_verb"],
    note: "Aspect-marked transition-motion predicate with a narrow independent-motion child.",
    trace: traceInfo("generative_template", {
      construction_type: "PerfectiveVP",
      template_family: "generative_template",
      template: ["directional_motion_vp!", "perfective_aspect!"],
      assigned_slots: ["motion_predicate", "perfective_aspect"],
      surfaces: [flattenSurface(aa49), flattenSurface(aspect)],
      contextual_role_resolution: "standalone_motion_predicate_not_result_complement",
      subspan: Boolean(subject),
    }),
  });
  if (!subject) return motion;
  const children = [subject, motion];
  return construction("SubjectPredicateClause", "SubjPred", children, {
    slots: templateDerivedSlots("SubjectPredicateClause", children),
    note: "Subject plus an aspect-marked independent transition-motion predicate.",
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!"],
      assigned_slots: ["subject", "predicate"],
      surfaces: children.map((node) => flattenSurface(node)),
      predicate_subtype: "transition_motion",
    }),
  });
}

function downwardMotionPredicateFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (particles.length || !bareCore.length) return null;
  let cursor = 0;
  const subject = nodeCanFillSlot(bareCore[cursor], "subject") ? bareCore[cursor++] : null;
  if (!isToken(bareCore[cursor], "落")) return null;
  const movementSource = bareCore[cursor++];
  if (!isToken(bareCore[cursor], "咗")) return null;
  const aspect = bareCore[cursor++];
  const goal = bareCore[cursor++];
  if (!goal || (!nodeCanFillSlot(goal, "location") && !nodeCanFillSlot(goal, "goal"))) return null;
  if (cursor !== bareCore.length) return null;

  const aa49 = independentMotionPredicateNode(movementSource, {
    syntax: "independent_downward_motion_predicate movement_verb",
    jyutping: "lok6",
    note: "Independent downward motion predicate headed by 落.",
    reason: "Before perfective aspect plus an overt location, 落 heads the motion event; environmental 落雨 and compound 落嚟 remain separately owned.",
    contextual_role_resolution: "independent_downward_predicate_before_aspect_and_goal",
  });
  const children = [aa49, aspect, goal];
  const motion = construction("MotionGoalVP", "MotionGoal", children, {
    slots: ["motion_goal_vp", "directional_motion_vp", "movement_verb", "goal", "location", "perfective_aspect", "predicate", "vp", "action_vp"],
    note: "Perfective downward motion to an overt location, with AA49 restricted to the lexical predicate 落.",
    trace: traceInfo("generative_template", {
      construction_type: "MotionGoalVP",
      template_family: "generative_template",
      template: ["directional_motion_vp!", "perfective_aspect!", "goal!"],
      assigned_slots: ["motion_predicate", "perfective_aspect", "goal"],
      surfaces: children.map((node) => flattenSurface(node)),
      constraints: { slot_must_not_have_slots: { goal: ["location_question", "wh_nominal"] } },
      aa49_child_scope: "single_independent_motion_predicate",
    }),
  });
  if (!subject) return motion;
  const clauseChildren = [subject, motion];
  return construction("SubjectPredicateClause", "SubjPred", clauseChildren, {
    slots: templateDerivedSlots("SubjectPredicateClause", clauseChildren),
    note: "Subject plus perfective downward motion to an overt location.",
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!"],
      assigned_slots: ["subject", "predicate"],
      surfaces: clauseChildren.map((node) => flattenSurface(node)),
      predicate_subtype: "downward_motion_goal",
    }),
  });
}

function directionalComplexPart(node, semanticSlot) {
  const surface = flattenSurface(node);
  const syntax = {
    "行": "main_motion_verb", "攞": "caused_motion_action", "入": "movement_direction_in", "出": "movement_direction_out",
    "返": "return_directional_complement", "過": "path_across_component", "嚟": "deictic_motion_marker_toward", "去": "deictic_motion_marker_away",
    "緊": "progressive_aspect", "咗": "perfective_aspect", "得": "potential_marker", "唔": "potential_negator",
  }[surface] || "directional_composition_part";
  const label = ["緊", "咗", "得", "唔"].includes(surface) ? "func" : "doing";
  return compositionPartClone(node, { label, syntax, slots: [semanticSlot], reason: `${surface} is overt and owned by the directional complex in source order.` });
}

function directionalCompositionFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  const surfaces = compact.map(flattenSurface);
  const finish = (type, label, nodes, detail = {}) => construction(type, label, [...nodes, ...particles], {
    slots: constructionSlotsByType(type, nodes),
    note: "Transparent Cantonese directional composition with path, potential/aspect, and final deixis represented in one predicate.",
    trace: traceInfo("generative_template", {
      construction_type: type,
      template_family: "generative_template",
      template: detail.template || [],
      assigned_slots: detail.assigned_slots || [],
      surfaces: nodes.map(flattenSurface),
      directional_subtype: detail.directional_subtype || "",
      deictic_position_status: "outermost_visible_deictic",
      not_claims: ["not_hidden_path", "not_hidden_subject", "not_reordered_surface"],
    }),
  });

  if (surfaces.length === 3 && nodeCanFillSlot(compact[0], "action_verb") && surfaces[1] === "返" && ["嚟", "去"].includes(surfaces[2])) {
    const children = [
      directionalComplexPart(compact[0], "main_verb"),
      directionalComplexPart(compact[1], "verb_complement"),
      directionalComplexPart(compact[2], "deictic_motion_marker"),
    ];
    return construction("VerbComplementVP", "VerbCompVP", [...children, ...particles], {
      slots: ["verb_complement_vp", "verb_complement", "vp", "action_vp", "predicate", "main_verb", "return_motion_verb", "movement_direction", "deictic_motion_marker"],
      note: "Action predicate plus overt return-direction complement; directional material is not AA49.",
      trace: traceInfo("generative_template", {
        construction_type: "VerbComplementVP", template_family: "generative_template",
        template: ["action_verb!", "return_directional_complement!", "deictic_motion_marker!", "particle?"],
        assigned_slots: ["main_verb", "verb_complement", "deictic_motion_marker", ...particles.map(() => "particle")],
        surfaces: children.map(flattenSurface), directional_subtype: "postverbal_return_direction",
        not_claims: ["not_aa49_independent_motion_predicate"],
      }),
    });
  }

  if (surfaces.length === 3 && surfaces[0] === "行" && ["入", "出", "上", "落"].includes(surfaces[1]) && ["嚟", "去"].includes(surfaces[2])) {
    return finish("DirectedMannerMotionVP", "DirectedMotion", [directionalComplexPart(compact[0], "movement_verb"), directionalComplexPart(compact[1], "movement_direction"), directionalComplexPart(compact[2], "deictic_motion_marker")], { template: ["manner_motion_verb!", "movement_direction!", "deictic_motion_marker!"], assigned_slots: ["movement_verb", "movement_direction", "deictic_motion_marker"], directional_subtype: "self_motion_path_deictic" });
  }
  if (surfaces.join("") === "行返過嚟") {
    return finish("DirectedMannerMotionVP", "DirectedMotion", [
      directionalComplexPart(compact[0], "movement_verb"),
      directionalComplexPart(compact[1], "return_motion_verb"),
      directionalComplexPart(compact[2], "path_component"),
      directionalComplexPart(compact[3], "deictic_motion_marker"),
    ], {
      template: ["manner_motion_verb!", "return_motion_verb!", "path_component!", "deictic_motion_marker!"],
      assigned_slots: ["movement_verb", "return_motion_verb", "path_component", "deictic_motion_marker"],
      directional_subtype: "self_motion_complex_path_deictic",
    });
  }
  if (surfaces.length === 3 && ["入", "落", "上", "出"].includes(surfaces[0]) && surfaces[1] === "咗" && ["嚟", "去"].includes(surfaces[2])) {
    return finish("PerfectiveDirectionalVP", "PerfMotion", [directionalComplexPart(compact[0], "movement_direction"), directionalComplexPart(compact[1], "perfective_aspect"), directionalComplexPart(compact[2], "deictic_motion_marker")], { template: ["directional_head!", "perfective_aspect!", "deictic_motion_marker!"], assigned_slots: ["movement_direction", "perfective_aspect", "deictic_motion_marker"], directional_subtype: "perfective_directional" });
  }
  if (surfaces.length === 4 && surfaces[0] === "行" && surfaces[1] === "緊" && ["入", "出"].includes(surfaces[2]) && ["嚟", "去"].includes(surfaces[3])) {
    return finish("ProgressiveDirectionalVP", "ProgMotion", [directionalComplexPart(compact[0], "movement_verb"), directionalComplexPart(compact[1], "progressive_aspect"), directionalComplexPart(compact[2], "movement_direction"), directionalComplexPart(compact[3], "deictic_motion_marker")], { template: ["movement_verb!", "progressive_aspect!", "movement_direction!", "deictic_motion_marker!"], assigned_slots: ["movement_verb", "progressive_aspect", "movement_direction", "deictic_motion_marker"], directional_subtype: "progressive_path_deictic" });
  }
  if (surfaces.length === 4 && nodeCanFillSlot(compact[0], "action_verb") && ["得", "唔"].includes(surfaces[1]) && ["入", "出", "返"].includes(surfaces[2]) && ["嚟", "去"].includes(surfaces[3])) {
    const positive = surfaces[1] === "得";
    const type = positive ? "PotentialDirectionalVP" : "NegativePotentialDirectionalVP";
    return finish(type, positive ? "PotentialMotion" : "NegPotentialMotion", [directionalComplexPart(compact[0], surfaces[0] === "行" ? "movement_verb" : "action_verb"), directionalComplexPart(compact[1], positive ? "potential_marker" : "negator"), directionalComplexPart(compact[2], surfaces[2] === "返" ? "return_motion_verb" : "movement_direction"), directionalComplexPart(compact[3], "deictic_motion_marker")], { template: ["action_or_motion_verb!", positive ? "potential_marker!" : "potential_negator!", "directional_complement!", "deictic_motion_marker!"], assigned_slots: [surfaces[0] === "行" ? "movement_verb" : "action_verb", positive ? "potential_marker" : "negator", surfaces[2] === "返" ? "return_motion_verb" : "movement_direction", "deictic_motion_marker"], directional_subtype: positive ? "positive_potential_directional" : "negative_potential_directional" });
  }
  return null;
}

  return {
    directionalCompositionFallback,
    downwardMotionPredicateFallback,
    transitionMotionPredicateFallback,
    wrapDirectionalMotionSubspans,
  };
};
