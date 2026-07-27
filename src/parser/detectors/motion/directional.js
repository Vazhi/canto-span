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
    surfaces: ["落", "嚟"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Directional motion VP: 落 + 嚟 = come down.",
    pattern: "down_direction + deictic_come",
  },
  {
    surfaces: ["返", "嚟"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Directional motion VP: 返 + 嚟 = come back.",
    pattern: "return + deictic_come",
  },
  {
    surfaces: ["返", "去"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Directional motion VP: 返 + 去 = go back / return there.",
    pattern: "return + deictic_go",
  },
  {
    surfaces: ["上", "嚟"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Directional motion VP: 上 + 嚟 = come up.",
    pattern: "upward_direction + deictic_come",
  },
  {
    surfaces: ["嚟"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Motion VP fragment: 嚟 = come.",
    pattern: "deictic_come",
  },
  {
    surfaces: ["去"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Motion VP fragment: 去 = go.",
    pattern: "deictic_go",
  },
];

function directionalMotionPartClone(node, role) {
  const surface = flattenSurface(node);
  const syntaxBySurface = {
    "返": "return_motion_component",
    "落": "movement_direction_down",
    "上": "movement_direction_up",
    "嚟": "deictic_motion_marker",
    "去": "deictic_motion_marker",
  };
  const slotBySurface = {
    "返": "movement_verb",
    "落": "movement_direction",
    "上": "movement_direction",
    "嚟": "deictic_motion_marker",
    "去": "deictic_motion_marker",
  };
  return parserInactiveTokenClone(firstToken(node) || token(surface), {
    label: role || "doing",
    pos: role === "func" ? "function" : "verb",
    syntax: syntaxBySurface[surface] || "directional_motion_part",
    slots: [slotBySurface[surface] || "directional_motion_part"],
    reason: "Token is parser-inactive inside a directional-motion VP candidate; the parent exposes the VP affordance.",
  });
}

function makeDirectionalMotionVP(nodes, pattern) {
  const children = nodes.map((node) => directionalMotionPartClone(node, "doing"));
  return construction(pattern.type, pattern.label, children, {
    slots: ["directional_motion_vp", "vp", "action_vp", "predicate", "movement_verb", "motion_predicate"],
    note: pattern.note,
    trace: traceInfo("generative_or_heuristic_slot_rule", {
      rule: "Cantonese directional motion compound",
      pattern: pattern.pattern,
      surfaces: pattern.surfaces,
      reason: "Native directional motion forms such as 落嚟 / 返嚟 / 上嚟 / 返上嚟 should surface as transparent VP candidates without making child feature bundles parser-active.",
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
    if (surfaces.every((surface, i) => surface === pattern.surfaces[i])) {
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
          note: "Negated directional motion VP: 唔 + directional motion, e.g. 唔落嚟.",
          trace: traceInfo("generative_or_heuristic_slot_rule", {
            rule: "negator + Cantonese directional motion compound",
            pattern: negated.pattern.pattern,
            reason: "Native refusal/negative motion forms such as 唔落嚟 should expose one negated motion VP while child tokens stay parser-inactive.",
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





function transitionMotionPredicateFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  // Final discourse particles must retain their accepted scoped DiscourseParticleFrame route.
  if (particles.length) return null;
  if (!bareCore.length) return null;
  let cursor = 0;
  const subject = nodeCanFillSlot(bareCore[cursor], "subject") ? bareCore[cursor++] : null;
  if (!isToken(bareCore[cursor], "走")) return null;
  const movementSource = bareCore[cursor++];
  const aspect = cursor < bareCore.length && ["咗", "過", "緊"].includes(flattenSurface(bareCore[cursor])) ? bareCore[cursor++] : null;
  if (cursor !== bareCore.length || !aspect) return null;

  const movement = parserInactiveTokenClone(movementSource, {
    label: "doing",
    pos: "verb",
    syntax: "intransitive_motion_verb transition_motion_predicate",
    slots: ["action_verb", "main_verb", "movement_verb", "predicate"],
    jyutping: "zau2",
    note: "leave / go away",
    reason: "At predicate onset, standalone 走 is an independent transition-motion verb rather than a postverbal directional result complement.",
  });
  const motion = aspect
    ? construction("PerfectiveVP", "PerfectiveVP", [movement, aspect], {
        slots: templateDerivedSlots("PerfectiveVP", [movement, aspect]),
        note: "Perfective transition-motion predicate.",
        trace: traceInfo("generative_template", {
          construction_type: "PerfectiveVP",
          template_family: "generative_template",
          template: ["transition_motion_verb!", "perfective_aspect!"],
          assigned_slots: ["transition_motion_verb", "perfective_aspect"],
          surfaces: ["走", flattenSurface(aspect)],
          contextual_role_resolution: "standalone_motion_predicate_not_result_complement",
          subspan: Boolean(subject),
        }),
      })
    : construction("DirectionalMotionVP", "MotionVP", [movement], {
        slots: templateDerivedSlots("DirectionalMotionVP", [movement]),
        note: "One-word transition motion predicate headed by standalone 走.",
        trace: traceInfo("generative_template", {
          construction_type: "DirectionalMotionVP",
          template_family: "generative_template",
          template: ["transition_motion_verb!"],
          assigned_slots: ["transition_motion_verb"],
          surfaces: ["走"],
          contextual_role_resolution: "standalone_motion_predicate_not_result_complement",
          subspan: Boolean(subject),
        }),
      });
  if (!subject) return motion;
  const children = [subject, motion, ...particles];
  return construction("SubjectPredicateClause", "SubjPred", children, {
    slots: templateDerivedSlots("SubjectPredicateClause", children),
    note: "Subject plus an independent transition-motion predicate.",
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!", "particle?"],
      assigned_slots: ["subject", "predicate", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      predicate_subtype: "transition_motion",
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

  if (surfaces.length === 3 && surfaces[0] === "行" && ["入", "出"].includes(surfaces[1]) && ["嚟", "去"].includes(surfaces[2])) {
    return finish("DirectionalMotionVP", "MotionVP", [directionalComplexPart(compact[0], "movement_verb"), directionalComplexPart(compact[1], "movement_direction"), directionalComplexPart(compact[2], "deictic_motion_marker")], { template: ["movement_verb!", "movement_direction!", "deictic_motion_marker!"], assigned_slots: ["movement_verb", "movement_direction", "deictic_motion_marker"], directional_subtype: "self_motion_path_deictic" });
  }
  if (surfaces.join("") === "行返過嚟") {
    return finish("DirectionalMotionVP", "MotionVP", compact.map((n, i) => directionalComplexPart(n, ["movement_verb", "return_motion_verb", "path_component", "deictic_motion_marker"][i])), { template: ["movement_verb!", "return_motion_verb!", "path_component!", "deictic_motion_marker!"], assigned_slots: ["movement_verb", "return_motion_verb", "path_component", "deictic_motion_marker"], directional_subtype: "return_path_deictic" });
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
    transitionMotionPredicateFallback,
    wrapDirectionalMotionSubspans,
  };
};
