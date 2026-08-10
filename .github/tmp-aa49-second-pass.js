"use strict";

const fs = require("fs");

const directionalPath = "src/parser/detectors/motion/directional.js";
let directional = fs.readFileSync(directionalPath, "utf8");
for (const block of [
`  {
    surfaces: ["落"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Independent motion/path predicate: 落 = descend / go down.",
    pattern: "independent_downward_motion",
  },
`,
`  {
    surfaces: ["走"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Independent transition-motion predicate: 走 = leave / go away.",
    pattern: "independent_transition_motion",
  },
`
]) {
  if (!directional.includes(block)) throw new Error("missing first-pass detector block");
  directional = directional.replace(block, "");
}

const start = directional.indexOf("function transitionMotionPredicateFallback(core) {");
const end = directional.indexOf("function directionalComplexPart(node, semanticSlot) {");
if (start < 0 || end < 0 || end <= start) throw new Error("cannot locate transition fallback");
const replacement = `function independentMotionPredicateNode(sourceNode, profile) {
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
  const subject = nodeCanFillSlot(bareCore[cursor], "subject") ? bareCore[cursor++] : null;
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

`;
directional = directional.slice(0, start) + replacement + directional.slice(end);
directional = directional.replace(
`  return {
    directionalCompositionFallback,
    transitionMotionPredicateFallback,
    wrapDirectionalMotionSubspans,
  };`,
`  return {
    directionalCompositionFallback,
    downwardMotionPredicateFallback,
    transitionMotionPredicateFallback,
    wrapDirectionalMotionSubspans,
  };`
);
fs.writeFileSync(directionalPath, directional);

const templatePath = "src/runtime-resources/grammar/templates/category-span-templates.js";
let templates = fs.readFileSync(templatePath, "utf8");
for (const block of [
`  {
    type: "DirectionalMotionVP",
    label: "MotionVP",
    template: ["movement_direction!", "deictic_motion_marker!"],
    role_overrides: {
      movement_direction: { label: "doing", syntax: "movement_direction", note: "Directional component inside a directional-motion VP." },
      deictic_motion_marker: { label: "doing", syntax: "deictic_motion_marker", note: "嚟/去 functions as doing/deictic motion inside a directional-motion VP; this contrasts with func uses in 係...嚟㗎 and 用嚟 frames." }
    },
    output_slots: ["directional_motion_vp", "vp", "action_vp", "predicate", "movement_verb", "motion_predicate"],
    note: "Slot-based directional motion VP: direction + deictic come, e.g. 落嚟 / 上嚟."
  },
`,
`  {
    type: "DirectionalMotionVP",
    label: "MotionVP",
    template: ["return_motion_verb!", "deictic_motion_marker!"],
    role_overrides: {
      return_motion_verb: { label: "doing", syntax: "return_motion_component", note: "返 functions as the return-motion component inside a directional-motion VP." },
      deictic_motion_marker: { label: "doing", syntax: "deictic_motion_marker", note: "嚟/去 functions as doing/deictic motion inside a directional-motion VP; this contrasts with func uses in 係...嚟㗎 and 用嚟 frames." }
    },
    output_slots: ["directional_motion_vp", "vp", "action_vp", "predicate", "movement_verb", "motion_predicate"],
    note: "Slot-based directional motion VP: return motion + deictic marker, e.g. 返嚟 / 返去."
  },
`
]) {
  if (!templates.includes(block)) throw new Error("missing obsolete category template");
  templates = templates.replace(block, "");
}
templates = templates.replace(
  'note: "Slot-based one-word directional/deictic motion VP: 嚟."',
  'note: "Narrow one-word deictic motion predicate. Multi-part directional material is excluded from AA49 and handled by separately accepted structures."'
);
fs.writeFileSync(templatePath, templates);

let plugin = fs.readFileSync("src/plugin-entry.js", "utf8");
plugin = plugin.replace(
`  directionalCompositionFallback,
  transitionMotionPredicateFallback,
  wrapDirectionalMotionSubspans,`,
`  directionalCompositionFallback,
  downwardMotionPredicateFallback,
  transitionMotionPredicateFallback,
  wrapDirectionalMotionSubspans,`
);
plugin = plugin.replace(
`  directionalCompositionFallback,
  durativeAspectCompositionFallback,`,
`  directionalCompositionFallback,
  downwardMotionPredicateFallback,
  durativeAspectCompositionFallback,`
);
fs.writeFileSync("src/plugin-entry.js", plugin);
