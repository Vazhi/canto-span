"use strict";

module.exports = function createDefinitionCopularDetectors(dependencies = {}) {
  const {
    construction,
    coordinatedNPFromParts,
    copulaClone,
    deicticClassifierTopicFromParts,
    firstToken,
    flattenSurface,
    isParticle,
    isToken,
    nodeCanFillSlot,
    nodeSlots,
    nominalComplementFromNodes,
    parserInactiveTokenClone,
    templateDerivedSlots,
    token,
    traceInfo,
    transparentDeicticClassifierTopicFromNode,
    transparentTopicContentFromNodes,
    withoutIgnorableSpaceText,
    withoutTrailingParticles,
  } = dependencies;

function isDefinitionExplanatoryParticle(node) {
  return isParticle(node) && ["㗎", "架", "嘅", "啊", "呀", "啦"].includes(flattenSurface(node));
}

function isDefinitionExplanatoryParticleSequence(nodes) {
  if (!nodes.length) return false;
  if (!nodes.every(isDefinitionExplanatoryParticle)) return false;
  return nodes.some((node) => ["㗎", "架"].includes(flattenSurface(node)));
}

function isDefinitionCopulaNode(node) {
  return isToken(node, "係");
}

function isDefinitionFormulaCopulaWhNode(node) {
  return node && node.kind === "construction" && node.type === "FormulaDiscourseUnit" && flattenSurface(node) === "係咩";
}

function definitionExplanatoryComplementKind(nodes) {
  if (!nodes.length) return "";
  if (nodes.some((node) => ["咩", "乜嘢"].includes(flattenSurface(node)))) return "wh_definition_complement";
  const hasNominalAffordance = nodes.some((node) => {
    const slots = nodeSlots(node);
    return ["np", "object", "topic", "head_noun", "classifier", "quantity", "location"].some((slot) => slots.includes(slot));
  });
  if (hasNominalAffordance) return "np_definition_complement";
  const raw = nodes.map(flattenSurface).join("");
  if (/^[\p{Script=Han}A-Za-z0-9]+$/u.test(raw)) return "lexicon_gap_np_definition_complement";
  return "";
}

function containsPredicateLikeDefinitionComplement(nodes) {
  return nodes.some((node) => {
    const slots = nodeSlots(node);
    return ["vp", "action_vp", "predicate", "directional_motion_vp", "motion_predicate", "urgency_marker", "imperative_adverb"].some((slot) => slots.includes(slot));
  });
}

function definitionFrameCopulaToken(node) {
  const source = isToken(node, "係") ? node : token("係");
  return parserInactiveTokenClone(source, {
    label: "func",
    pos: "function",
    syntax: "definition_copula",
    slots: ["definition_copula", "copula"],
    reason: "係 is the copula inside a bounded 係...嚟㗎 definition/explanatory frame; it should not become a separate formula or predicate island here.",
  });
}

function definitionFrameWhToken(surface) {
  return token(surface, {
    label: "what",
    syntax: "wh_thing definition_wh_complement",
    note: `${surface} asks for the definition/identity inside a 係...嚟㗎 frame; learner role stays what, with wh/question syntax rather than a new wh-question role.`,
    trace: traceInfo("generative_template", {
      construction_type: "DefinitionExplanatoryFrame",
      surface,
      reason: "Contextual reanalysis of protected 係咩 only inside the bounded definition/explanatory frame.",
      role_resolution_note: "咩 remains learner role what; wh-definition/question behavior is encoded in syntax/slots, not a new learner role.",
    }),
  });
}

function definitionFrameLaiMarker(node) {
  return parserInactiveTokenClone(node, {
    label: "func",
    pos: "function",
    syntax: "definition_explanatory_lai_marker",
    slots: ["definition_lai_marker", "explanatory_linker"],
    reason: "嚟 is inside a bounded 係...嚟㗎 definition/explanatory frame, so it is the explanatory linker here, not a directional-motion VP.",
    role_resolution_note: "嚟 is func only in this bounded explanatory-linker context; motion contexts keep 嚟 as doing/deictic motion.",
  });
}

function definitionTopicFromNodes(topicNodes) {
  const compact = withoutIgnorableSpaceText(topicNodes || []);
  if (!compact.length) return null;
  if (compact.length === 1) {
    const split = transparentDeicticClassifierTopicFromNode(compact[0], "DefinitionExplanatoryFrame");
    if (split) return split;
  }
  const transparent = transparentTopicContentFromNodes(compact);
  if (transparent && nodeCanFillSlot(transparent, "topic")) {
    return construction("Topic", "Topic", [transparent], {
      slots: ["definition_topic", "topic", "np"],
      note: "Topic being defined or identified in a bounded 係...嚟㗎 frame, preserving transparent NP structure where available.",
      trace: traceInfo("generative_template", {
        construction_type: "Topic",
        template_family: "generative_template",
        template: ["topic!"],
        assigned_slots: ["topic"],
        surfaces: [flattenSurface(transparent)],
        reason: "Definition frame topic preserves transparent child structure instead of flattening the topic span.",
      }),
    });
  }
  return construction("Topic", "Topic", compact, {
    slots: ["definition_topic", "topic", "np"],
    note: "Topic being defined or identified in a bounded 係...嚟㗎 frame.",
    trace: traceInfo("generative_template", {
      construction_type: "DefinitionExplanatoryFrame",
      assigned_slot: "topic",
      surfaces: compact.map((node) => flattenSurface(node)),
    }),
  });
}

function copularExplanatoryCompositionFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (!bareCore.length || !isDefinitionExplanatoryParticleSequence(particles)) return null;

  const laiIndex = bareCore.findIndex((node) => isToken(node, "嚟"));
  if (laiIndex <= 0 || laiIndex !== bareCore.length - 1) return null;

  let copulaIndex = bareCore.findIndex(isDefinitionCopulaNode);
  let formulaCopulaWh = false;
  if (copulaIndex < 0) {
    copulaIndex = bareCore.findIndex(isDefinitionFormulaCopulaWhNode);
    formulaCopulaWh = copulaIndex >= 0;
  }
  if (copulaIndex <= 0 || copulaIndex >= laiIndex) return null;

  const topicNodes = bareCore.slice(0, copulaIndex);
  const copulaNode = bareCore[copulaIndex];
  const complementNodes = formulaCopulaWh
    ? [definitionFrameWhToken("咩")]
    : bareCore.slice(copulaIndex + 1, laiIndex);
  if (!topicNodes.length || !complementNodes.length) return null;
  if (!formulaCopulaWh && containsPredicateLikeDefinitionComplement(complementNodes)) return null;

  const complementKind = definitionExplanatoryComplementKind(complementNodes);
  if (!complementKind) return null;

  const topic = definitionTopicFromNodes(topicNodes);
  if (!topic) return null;
  const copula = definitionFrameCopulaToken(copulaNode);
  const complement = complementNodes.map((node) => parserInactiveTokenClone(firstToken(node) || node, {
    label: complementKind === "wh_definition_complement" ? "what" : ((firstToken(node) || node).label || "what"),
    pos: "np",
    syntax: `${(firstToken(node) || node).syntax || "nominal"} copular_complement`,
    slots: ["copular_complement", "object", "np", "topic_or_object"],
    reason: "The overt wh/NP material is the visible complement of 係; no dedicated definition-complement wrapper is introduced.",
  }));
  const lai = definitionFrameLaiMarker(bareCore[laiIndex]);
  const children = [topic, copula, ...complement, lai, ...particles];

  return construction("CopularRelationFrame", "Copular", children, {
    slots: ["copular_relation_frame", "copular_clause", "explanatory_clause", "topic", "object", "np", "predicate", "clause"],
    note: "Compositional copular/explanatory clause: topic + 係 + wh/NP complement + 嚟 + explanatory particle. The visible pieces remain transparent without reviving the retired dedicated wrapper.",
    trace: traceInfo("generative_template", {
      construction_type: "CopularRelationFrame",
      template: ["topic!", "copula!", "copular_complement!", "explanatory_linker!", "explanatory_particle!"],
      constraints: {
        required_copula: "係",
        required_lai_marker: "嚟",
        required_explanatory_particle: "㗎/架",
        complement_kind: complementKind,
        formula_guard_reanalysis: formulaCopulaWh ? "係咩 split only inside 係...嚟㗎" : "not_needed",
      },
      assigned_slots: ["topic", "copula", ...complement.map(() => "copular_complement"), "explanatory_linker", "explanatory_particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "Preserves the overt copular composition and prevents explanatory 嚟 from being mislabeled as literal DirectionalMotionVP.",
      not_claims: ["not_dedicated_definition_frame", "not_directional_motion_lai"],
    }),
  });
}

function copularIdentificationFrameFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  const copulaIndex = compact.findIndex((node) => isToken(node, "係"));
  if (copulaIndex <= 0 || copulaIndex >= compact.length - 1) return null;
  const before = compact.slice(0, copulaIndex);
  const after = compact.slice(copulaIndex + 1);
  if (after.some((node) => isToken(node, "嚟") || isToken(node, "用嚟"))) return null;
  let subjectOrTopic = null;
  let frameType = "CopularIdentificationFrame";
  let label = "Ident";
  if (before.length === 2) subjectOrTopic = deicticClassifierTopicFromParts(before);
  if (!subjectOrTopic && before.length === 3) {
    subjectOrTopic = coordinatedNPFromParts(before);
    if (subjectOrTopic) {
      frameType = "CopularRelationFrame";
      label = "Relation";
    }
  }
  if (!subjectOrTopic && before.length === 1 && (nodeCanFillSlot(before[0], "topic") || nodeCanFillSlot(before[0], "subject"))) subjectOrTopic = before[0];
  if (!subjectOrTopic) return null;
  const complement = nominalComplementFromNodes(after);
  if (!complement) return null;
  if (frameType === "CopularIdentificationFrame" && !nodeCanFillSlot(subjectOrTopic, "topic")) return null;
  if (frameType === "CopularRelationFrame" && !nodeCanFillSlot(subjectOrTopic, "subject")) return null;
  const copula = copulaClone(compact[copulaIndex], "copula identification_copula", ["identification_copula"], "係 is interpreted as the copula inside a bounded identification/relation frame, not as a broad fallback.");
  const children = [subjectOrTopic, copula, complement, ...particles];
  return construction(frameType, label, children, {
    note: frameType === "CopularRelationFrame"
      ? "v0.5.33 bounded copular relation frame: coordinated subject + 係 + visible nominal complement."
      : "v0.5.33 bounded copular identification frame: topic/deictic classifier + 係 + visible nominal complement.",
    slots: templateDerivedSlots(frameType, children),
    trace: traceInfo("generative_template", {
      construction_type: frameType,
      template: frameType === "CopularRelationFrame" ? ["subject!", "copula!", "copular_complement!", "particle?"] : ["topic!", "copula!", "np!", "particle?"],
      assigned_slots: frameType === "CopularRelationFrame" ? ["subject", "copula", "copular_complement", ...particles.map(() => "particle")] : ["topic", "copula", "np", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "Promotes only bounded active corpus copular identification/relation shapes, leaving definition/explanatory 係...嚟㗎 to its existing frame.",
    }),
  });
}

  return {
    copularExplanatoryCompositionFallback,
    copularIdentificationFrameFallback,
    isDefinitionCopulaNode,
  };
};
