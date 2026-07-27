"use strict";

module.exports = function createMotionPurposeDetectors(dependencies = {}) {
  const {
    categorySubspanFor, compositionPartClone, construction, constructionSlotsByType, firstToken,
    flattenSurface, isParticle, isToken, nodeCanFillSlot, nodeSlots, parserInactiveTokenClone,
    token, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles,
  } = dependencies;

const SERIAL_PURPOSE_ACTION_VO_SURFACES = new Set(["摘芒果", "買嘢", "食飯"]);
const SERIAL_PURPOSE_ACTIONS_THAT_TAKE_EATING_PURPOSE = new Set(["摘芒果", "買嘢"]);

function isSerialPurposeActionVo(node) {
  return node && node.kind === "construction" && node.type === "ProductiveVO" && SERIAL_PURPOSE_ACTION_VO_SURFACES.has(flattenSurface(node));
}

function actionVoCanTakeEatingPurpose(node) {
  return node && SERIAL_PURPOSE_ACTIONS_THAT_TAKE_EATING_PURPOSE.has(flattenSurface(node));
}

function isEatingPurposeVerb(node) {
  return isToken(node, "食");
}

function isMotionPurposeCandidate(node) {
  if (!node || node.kind === "text") return false;
  const slots = nodeSlots(node);
  return slots.includes("directional_motion_vp") || slots.includes("negated_directional_motion_vp") || slots.includes("motion_predicate");
}

function serialPurposeVerbClone(node) {
  return parserInactiveTokenClone(firstToken(node) || token(flattenSurface(node)), {
    label: "doing",
    pos: "verb",
    syntax: "purpose_verb",
    slots: ["purpose_verb", "action_verb", "predicate"],
    reason: "食 is interpreted here as a purpose verb after a reviewed action/object VP, so it stays parser-inactive while the parent exposes the serial-purpose chain.",
  });
}

function serialPurposeParticleClone(node) {
  return parserInactiveTokenClone(firstToken(node) || token(flattenSurface(node)), {
    label: "particle",
    pos: "particle",
    syntax: "sentence_final_particle",
    slots: ["particle"],
    reason: "Final particle stays parser-inactive inside a motion/serial purpose-chain wrapper.",
  });
}

function serialChainKindForMatch(match) {
  return match && match.motion && !match.purpose ? "MotionPurposeChain" : "SerialVerbPurposeChain";
}

function serialChainLabelForKind(kind) {
  return kind === "MotionPurposeChain" ? "MotionPurpose" : "PurposeChain";
}

function serialChainSlotsForKind(kind) {
  return kind === "MotionPurposeChain"
    ? ["motion_purpose_chain", "motion_action_chain", "purpose_chain", "vp", "action_vp", "predicate"]
    : ["serial_verb_purpose_chain", "serial_action_chain", "purpose_chain", "vp", "action_vp", "predicate"];
}

function makeSerialVerbPurposeChain(match) {
  const children = [];
  if (match.motion) children.push(match.motion);
  children.push(match.action);
  if (match.purpose) children.push(serialPurposeVerbClone(match.purpose));
  if (match.particle) children.push(serialPurposeParticleClone(match.particle));
  const kind = serialChainKindForMatch(match);
  const isMotionOnly = kind === "MotionPurposeChain";
  return construction(kind, serialChainLabelForKind(kind), children, {
    slots: serialChainSlotsForKind(kind),
    note: isMotionOnly
      ? "Motion-purpose chain: directional motion plus a reviewed action VP, such as 返嚟食飯 or 落嚟摘芒果."
      : "Serial verb / purpose chain: reviewed action sequence with an explicit purpose 食, such as 摘芒果食, 落嚟摘芒果食, or 買嘢食.",
    trace: traceInfo("generative_template", {
      template_family: "generative_template",
      construction_type: kind,
      template: match.motion
        ? (match.purpose ? ["directional_motion_vp!", "productive_vo!", "purpose_verb!", "particle?"] : ["directional_motion_vp!", "productive_vo!", "particle?"])
        : ["productive_vo!", "purpose_verb!", "particle?"],
      assigned_slots: [
        ...(match.motion ? ["directional_motion_vp"] : []),
        "productive_vo",
        ...(match.purpose ? ["purpose_verb"] : []),
        ...(match.particle ? ["particle"] : []),
      ],
      rule: isMotionOnly
        ? "directional_motion_vp + productive_vo + optional final particle"
        : "directional_motion? + productive_vo + purpose_verb + optional final particle",
      pattern: match.motion
        ? (match.purpose ? "directional_motion_vp + productive_vo + purpose_verb" : "directional_motion_vp + productive_vo")
        : "productive_vo + purpose_verb",
      reason: isMotionOnly
        ? "Native speech can use motion plus an action VP as a purpose/action chain. This now uses the generative template transition lane while keeping the learner display precise."
        : "Native speech often chains an action/object VP with an explicit purpose verb. Keep the ProductiveVO transparent and keep the purpose verb parser-inactive inside the parent purpose-chain wrapper.",
      surfaces: children.map((node) => flattenSurface(node)),
    }),
  });
}

function serialVerbPurposeChainWithTrailingParticle(node, particleNode) {
  if (!node || node.kind !== "construction" || !["SerialVerbPurposeChain", "MotionPurposeChain"].includes(node.type) || !particleNode) return node;
  if ((node.children || []).some((child) => isParticle(child))) return node;
  return {
    ...node,
    children: [...(node.children || []), serialPurposeParticleClone(particleNode)],
    trace: {
      ...(node.trace || {}),
      attached_trailing_particle: flattenSurface(particleNode),
    },
  };
}

function serialPurposeParticleAt(nodes, index) {
  return isParticle(nodes[index]) && ["呀", "啊", "啦", "喇"].includes(flattenSurface(nodes[index])) ? nodes[index] : null;
}

function serialVerbPurposePatternAt(nodes, index) {
  let motion = null;
  let i = index;

  if (isMotionPurposeCandidate(nodes[i]) && isSerialPurposeActionVo(nodes[i + 1])) {
    motion = nodes[i];
    i += 1;
  }

  if (!isSerialPurposeActionVo(nodes[i])) return null;

  let purpose = null;
  let particleIndex = i + 1;
  if (actionVoCanTakeEatingPurpose(nodes[i]) && isEatingPurposeVerb(nodes[i + 1])) {
    purpose = nodes[i + 1];
    particleIndex = i + 2;
  }

  if (!motion && !purpose) return null;

  const particle = serialPurposeParticleAt(nodes, particleIndex);
  return {
    length: (motion ? 1 : 0) + 1 + (purpose ? 1 : 0) + (particle ? 1 : 0),
    motion,
    action: nodes[i],
    purpose,
    particle,
  };
}

function serialPurposeTemplateSubspanAt(nodes, index) {
  const allowedTypes = ["SerialVerbPurposeChain", "MotionPurposeChain"];
  const remaining = nodes.length - index;
  for (let length = Math.min(4, remaining); length >= 2; length -= 1) {
    const window = nodes.slice(index, index + length);
    if (window.some((node) => node.kind === "text")) continue;
    const candidate = categorySubspanFor(window, allowedTypes);
    if (candidate) return { node: candidate, length };
  }
  return null;
}

function wrapSerialPurposeTemplateSubspans(nodes) {
  const result = [];
  let i = 0;
  while (i < nodes.length) {
    const match = serialPurposeTemplateSubspanAt(nodes, i);
    if (match) {
      result.push(match.node);
      i += match.length;
      continue;
    }
    result.push(nodes[i]);
    i += 1;
  }
  return result;
}

function wrapSerialVerbPurposeSubspans(nodes) {
  const result = [];
  let i = 0;
  while (i < nodes.length) {
    const match = serialVerbPurposePatternAt(nodes, i);
    if (match) {
      result.push(makeSerialVerbPurposeChain(match));
      i += match.length;
      continue;
    }
    result.push(nodes[i]);
    i += 1;
  }
  return result;
}



function purposeLinkingMotionFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length !== 5 || !nodeCanFillSlot(compact[0], "action_verb") || !["嚟", "去"].includes(flattenSurface(compact[3])) || !nodeCanFillSlot(compact[4], "action_verb")) return null;
  const object = categorySubspanFor(compact.slice(1, 3), ["DiMarkedNP", "ClassifierObjectNP", "ModifiedNP", "NominalHeadSpan"]);
  if (!object) return null;
  const action = categorySubspanFor([compact[0], object], ["ProductiveVO", "TransitiveVP"]) || construction("ProductiveVO", "VO", [compact[0], object], { slots: ["productive_vo", "vp", "action_vp", "predicate", "object"], trace: traceInfo("generative_template", { construction_type: "ProductiveVO", template_family: "generative_template", template: ["action_verb!", "object!"], assigned_slots: ["action_verb", "object"], surfaces: [flattenSurface(compact[0]), flattenSurface(object)] }) });
  const linker = compositionPartClone(compact[3], { label: "func", syntax: "purpose_linking_motion_element", slots: ["purpose_linker"], reason: `${flattenSurface(compact[3])} links the overt acquisition/action event to the following purpose predicate.` });
  const purpose = compositionPartClone(compact[4], { label: "doing", syntax: "purpose_verb", slots: ["purpose_verb", "action_verb", "predicate"] });
  const children = [action, linker, purpose, ...particles];
  return construction("SerialVerbPurposeChain", "PurposeChain", children, {
    slots: constructionSlotsByType("SerialVerbPurposeChain", children),
    trace: traceInfo("generative_template", { construction_type: "SerialVerbPurposeChain", template_family: "generative_template", template: ["action_object_vp!", "purpose_linking_motion_element!", "purpose_verb!", "particle?"], assigned_slots: ["productive_vo", "purpose_linker", "purpose_verb", ...particles.map(() => "particle")], surfaces: children.map(flattenSurface), purpose_linker_surface: flattenSurface(compact[3]), not_claims: ["not_deictic_motion_vp", "not_hidden_object", "not_hidden_purpose"] }),
  });
}




  return {
    purposeLinkingMotionFallback,
    serialVerbPurposeChainWithTrailingParticle,
    wrapSerialPurposeTemplateSubspans,
    wrapSerialVerbPurposeSubspans,
  };
};
