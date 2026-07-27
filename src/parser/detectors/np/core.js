"use strict";

module.exports = function createNpDetectors(dependencies = {}) {
  const {
    categorySubspanFor,
    cleanSlots,
    construction,
    firstToken,
    flattenSurface,
    hasSurface,
    isToken,
    nodeCanFillSlot,
    nodeSlots,
    parserInactiveTokenClone,
    resultFramePartClone,
    templateConstructionFor,
    templateDerivedSlots,
    traceInfo,
    withoutIgnorableSpaceText,
    withoutTrailingParticles,
  } = dependencies;

  const COMPOSITIONAL_NP_SUBSPAN_TYPES = [
    "OvertHeadDemonstrativeClassifierNP",
    "QuantifiedClassifierNP",
    "AssociativeNP",
    "OrdinalClassifierNP",
    "ClassifierObjectNP",
  ];

  function compositionalNpSubspanFor(nodes = []) {
    const compact = withoutIgnorableSpaceText(nodes || []);
    if (!compact.length || compact.some((node) => node.kind === "text")) return null;
    if (compact.length === 3 && (isToken(compact[1], "同") || isToken(compact[1], "同埋"))) {
      const coordinated = coordinatedNPFromParts(compact);
      if (coordinated) return coordinated;
    }
    return categorySubspanFor(compact, COMPOSITIONAL_NP_SUBSPAN_TYPES);
  }

  function wrapCompositionalNpSubspans(nodes = []) {
    const result = [];
    let index = 0;
    const maxWindow = 7;
    while (index < nodes.length) {
      let match = null;
      for (let length = Math.min(maxWindow, nodes.length - index); length >= 2; length -= 1) {
        const candidate = compositionalNpSubspanFor(nodes.slice(index, index + length));
        if (!candidate) continue;
        if (candidate.type === "QuantifiedClassifierNP") {
          if (candidate.trace && candidate.trace.fragment_subtype === "quantified_classifier_head_ellipsis") continue;
          const head = (candidate.children || [])[candidate.children.length - 1];
          const headSlots = nodeSlots(head);
          const next = nodes[index + length];
          if (headSlots.includes("time") || headSlots.includes("time_head") || flattenSurface(head) === "字") continue;
          if (next && nodeCanFillSlot(next, "post_classifier_approximation")) continue;
        }
        match = { candidate, length };
        break;
      }
      if (match) {
        result.push(match.candidate);
        index += match.length;
      } else {
        result.push(nodes[index]);
        index += 1;
      }
    }
    return result;
  }

  function shouldDeferApproximateQuantityForUnlicensedGovernor(candidate, nodes, index) {
    if (!candidate || candidate.type !== "ApproximateQuantity") return false;
    if (index === 0) return false;
    const governor = nodes[index - 1];
    return !nodeCanFillSlot(governor, "consumption_verb");
  }

  function deicticClassifierTopicFromParts(parts) {
    if (!parts || parts.length !== 2) return null;
    const [dem, classifier] = parts;
    if (!nodeCanFillSlot(dem, "demonstrative") || !nodeCanFillSlot(classifier, "classifier")) return null;
    return construction("Topic", "Topic", parts, {
      note: "Demonstrative-classifier topic: demonstrative + classifier, e.g. 呢部 = this one. The old fused DeicticClassifierTopic label is retired; Topic carries the clause/discourse role while deictic/classifier metadata preserves the NP-internal form.",
      slots: cleanSlots(["topic", "np", "demonstrative", "classifier", "deictic_classifier_topic"]),
      trace: traceInfo("generative_template", {
        construction_type: "Topic",
        retired_label_alias: "DeicticClassifierTopic",
        template: ["demonstrative!", "classifier!"],
        assigned_slots: ["demonstrative", "classifier"],
        topic_subtype: "deictic_classifier_ellipsis",
        np_subtype: "demonstrative_classifier_ellipsis",
        surfaces: parts.map((node) => flattenSurface(node)),
        subspan: true,
        reason: "The phrase is a Topic in this frame; demonstrative/classifier details are metadata rather than a fused active construction label.",
      }),
    });
  }

  function nominalComplementFromNodes(nodes) {
    if (!nodes || !nodes.length) return null;
    if (nodes.length === 1 && (nodeCanFillSlot(nodes[0], "np") || nodeCanFillSlot(nodes[0], "head_noun"))) return nodes[0];
    const templated = templateConstructionFor(nodes, ["QuantifiedClassifierNP"]) || categorySubspanFor(nodes, ["QuantifiedClassifierNP", "OvertHeadDemonstrativeClassifierNP", "OrdinalClassifierNP", "ModifiedNP", "ModifierNP", "NominalHeadSpan"]);
    if (templated && (nodeCanFillSlot(templated, "np") || nodeCanFillSlot(templated, "head_noun"))) return templated;
    const last = nodes[nodes.length - 1];
    if (!nodeCanFillSlot(last, "head_noun") && !nodeCanFillSlot(last, "np")) return null;
    const hasVisibleStativeOrLinker = nodes.some((node) => nodeCanFillSlot(node, "how") || nodeCanFillSlot(node, "nominal_linker"));
    if (!hasVisibleStativeOrLinker) return null;
    return construction("StativeNominalComplement", "AdjNP", nodes, {
      note: "Stative/modified nominal complement inside a bounded copular relation frame; requires a visible stative modifier or nominal linker.",
      slots: templateDerivedSlots("StativeNominalComplement", nodes),
      trace: traceInfo("generative_template", {
        construction_type: "StativeNominalComplement",
        template: nodes.map((node) => nodeCanFillSlot(node, "how") ? "how?" : nodeCanFillSlot(node, "nominal_linker") ? "nominal_linker?" : nodeCanFillSlot(node, "head_noun") ? "head_noun!" : "modifier?"),
        assigned_slots: nodes.map((node) => nodeCanFillSlot(node, "how") ? "how" : nodeCanFillSlot(node, "nominal_linker") ? "nominal_linker" : nodeCanFillSlot(node, "head_noun") ? "head_noun" : "modifier"),
        surfaces: nodes.map((node) => flattenSurface(node)),
        subspan: true,
        reason: "v0.5.39 scope guard prevents bare/simple NPs from being mislabeled as stative nominal complements.",
      }),
    });
  }

  function coordinatedNPFromParts(parts) {
    if (!parts || parts.length !== 3) return null;
    const [left, coordinator, right] = parts;
    if (!nodeCanFillSlot(left, "np") || !(isToken(coordinator, "同") || isToken(coordinator, "同埋")) || !nodeCanFillSlot(right, "np")) return null;
    const coord = parserInactiveTokenClone(coordinator, {
      label: "func",
      pos: "function",
      syntax: "coordinator",
      slots: ["coordinator"],
      reason: `${flattenSurface(coordinator)} is interpreted as the coordinator inside a bounded coordinated NP, not as a coverb/comitative marker.`,
    });
    const children = [left, coord, right];
    return construction("CoordinatedNP", "CoordNP", children, {
      note: "Coordinated NP: left NP + 同 + right NP. Subject use is assigned only by a larger clause.",
      slots: cleanSlots(["coordinated_np", "left_np", "right_np", "coordinator", "np", "topic", "object"]),
      trace: traceInfo("generative_template", {
        construction_type: "CoordinatedNP",
        template: ["left_np!", "coordinator!", "right_np!"],
        assigned_slots: ["left_np", "coordinator", "right_np"],
        surfaces: children.map((node) => flattenSurface(node)),
        subspan: true,
      }),
    });
  }

  function possessiveClassifierNPFromNodes(nodes) {
    const compact = withoutIgnorableSpaceText(nodes || []);
    if (compact.length !== 3) return null;
    const possessor = compact[0];
    if (!nodeCanFillSlot(possessor, "subject") && !nodeCanFillSlot(possessor, "np")) return null;
    if (!nodeCanFillSlot(compact[1], "classifier")) return null;
    if (!nodeCanFillSlot(compact[2], "head_noun") && !nodeCanFillSlot(compact[2], "object")) return null;

    const nounPhraseNodes = compact.slice(1);
    const nounPhrase = categorySubspanFor(nounPhraseNodes, ["ModifiedNP", "NominalHeadSpan"]);
    if (!nounPhrase) return null;
    if (!nodeCanFillSlot(nounPhrase, "np") && !nodeCanFillSlot(nounPhrase, "head_noun")) return null;

    const possessorChild = resultFramePartClone(possessor, {
      label: (firstToken(possessor) || possessor).label || "who",
      pos: "np",
      syntax: `${possessor.syntax || "possessor_np"} possessive_np`,
      slots: ["possessor", "np", "subject", "topic"],
      reason: "This overt NP is the possessor in the sourced possessor + classifier + noun profile.",
    });
    return construction("PossessiveClassifierNP", "PossNP", [possessorChild, nounPhrase], {
      note: "Source-linked possessive classifier NP: possessor + overt classifier + overt nominal head, e.g. 我架車 = my car.",
      slots: templateDerivedSlots("PossessiveClassifierNP", [possessorChild, nounPhrase]),
      trace: traceInfo("generative_template", {
        construction_type: "PossessiveClassifierNP",
        template: ["possessor!", "classifier_np!"],
        assigned_slots: ["possessor", "classifier_np"],
        surfaces: [flattenSurface(possessor), flattenSurface(nounPhrase)],
        subspan: true,
        reason: "The retained node requires the overt classifier and nominal head documented for Cantonese POSS-CL-N phrases.",
      }),
    });
  }

  function wrapPossessiveClassifierNPSubspans(nodes) {
    const result = [];
    let i = 0;
    while (i < nodes.length) {
      const possessive = possessiveClassifierNPFromNodes(nodes.slice(i, i + 3));
      if (possessive) {
        result.push(possessive);
        i += 3;
        continue;
      }
      result.push(nodes[i]);
      i += 1;
    }
    return result;
  }

  function classifierObjectNPFromNodes(nodes) {
    const compact = withoutIgnorableSpaceText(nodes || []);
    if (compact.length !== 2) return null;
    const [classifier, head] = compact;
    if (!nodeCanFillSlot(classifier, "classifier")) return null;
    if (!nodeCanFillSlot(head, "head_noun") && !nodeCanFillSlot(head, "object") && !nodeCanFillSlot(head, "np")) return null;
    return construction("ClassifierObjectNP", "CL-NP", [classifier, head], {
      note: "v0.5.35 classifier-headed object NP without overt numeral/demonstrative, e.g. 樣驚喜.",
      slots: templateDerivedSlots("ClassifierObjectNP", [classifier, head]),
      trace: traceInfo("generative_template", {
        construction_type: "ClassifierObjectNP",
        template: ["classifier!", "head_noun!"],
        assigned_slots: ["classifier", "head_noun"],
        surfaces: [flattenSurface(classifier), flattenSurface(head)],
        subspan: true,
      }),
    });
  }

  function coordinatedNPFragmentFallback(core) {
    const { core: bareCore, particles } = withoutTrailingParticles(core);
    const compact = withoutIgnorableSpaceText(bareCore);
    if (compact.length !== 3 || particles.length) return null;
    const coord = coordinatedNPFromParts(compact);
    if (!coord) return null;
    return construction("CoordinatedNP", "CoordNP", coord.children, {
      note: "Standalone coordinated NP fragment: left NP + 同 + right NP. This prevents the former false-positive guardrail where 我同你 merely had no top construction without leaking clause-subject slots into the NP.",
      slots: cleanSlots(["coordinated_np", "left_np", "right_np", "coordinator", "np", "topic", "object"]),
      trace: traceInfo("generative_template", {
        construction_type: "CoordinatedNP",
        template_family: "generative_template",
        template: ["left_np!", "coordinator!", "right_np!"],
        assigned_slots: ["left_np", "coordinator", "right_np"],
        surfaces: coord.children.map((node) => flattenSurface(node)),
        reason: "Direct diagnostic review rejected bare [] as a successful negative guardrail and rejected the intermediate subject+coordinator+subject template as clause-role leakage. 我同你 is a coordinated NP/fragment, not a parse absence and not automatically a coordinated subject.",
        not_claims: ["not_coverb_frame", "not_parse_absence", "not_clause_subject_assignment"],
      }),
    });
  }

  function approximateQuantityFallback(core) {
    if (!hasSurface(core, "左右")) return null;
    return construction("ApproximateQuantity", "Approx", core, {
      note: "Approximate quantity/price fallback with 左右.",
      trace: traceInfo("construction_function", {
        construction_type: "ApproximateQuantity",
        reason: "Fallback only; generative ApproximateQuantity should normally catch this."
      })
    });
  }

  return {
    approximateQuantityFallback,
    classifierObjectNPFromNodes,
    compositionalNpSubspanFor,
    coordinatedNPFragmentFallback,
    coordinatedNPFromParts,
    deicticClassifierTopicFromParts,
    nominalComplementFromNodes,
    possessiveClassifierNPFromNodes,
    shouldDeferApproximateQuantityForUnlicensedGovernor,
    wrapCompositionalNpSubspans,
    wrapPossessiveClassifierNPSubspans,
  };
};
