"use strict";

module.exports = function createPriorityDetectors(dependencies = {}) {
  const {
    categorySubspanFor, cleanSlots, construction, flattenSurface, isParticle, isToken,
    isVerbLike, nodeCanFillSlot, nodeSlots, parserInactiveTokenClone, traceInfo,
    withoutIgnorableSpaceText, withoutTrailingParticles,
  } = dependencies;

  function isPriorityActionCandidate(node) {
    if (!node || node.kind === "text") return false;
    if (node.kind === "construction") {
      const slots = nodeSlots(node);
      return slots.includes("vp") || slots.includes("action_vp") || slots.includes("predicate") || slots.includes("directional_motion_vp") || slots.includes("productive_vo");
    }
    return isVerbLike(node);
  }

  function priorityMarkerTokenClone(node) {
    return parserInactiveTokenClone(node, {
      label: "how",
      pos: "adverbial",
      syntax: "priority_sequence_marker",
      slots: ["priority_marker", "sequence_marker", "how"],
      reason: "先 is being interpreted as a priority/sequence marker here, so it stays parser-inactive inside the parent clause wrapper.",
    });
  }

  function priorityParticleClone(node) {
    return parserInactiveTokenClone(node, {
      label: "particle",
      pos: "particle",
      syntax: "sentence_final_particle",
      slots: ["particle"],
      reason: "Final particle stays parser-inactive inside a priority-marker clause wrapper.",
    });
  }

  function makePriorityMarkerClause(actionNode, markerNode, particleNode = null) {
    const children = [actionNode, priorityMarkerTokenClone(markerNode)];
    if (particleNode) children.push(priorityParticleClone(particleNode));
    return construction("PriorityMarkerClause", "Priority先", children, {
      slots: ["priority_marker_clause", "sequence_priority_marker", "priority_marker", "vp", "action_vp", "predicate"],
      note: "Priority/sequence marker clause: action + 先 + optional final particle, e.g. 你食先啦 = you eat first.",
      trace: traceInfo("generative_template", {
        construction_type: "PriorityMarkerClause",
        template_family: "generative_template",
        template: particleNode ? ["action_vp!", "priority_marker!", "particle?"] : ["action_vp!", "priority_marker!"],
        assigned_slots: particleNode ? ["action_vp", "priority_marker", "particle"] : ["action_vp", "priority_marker"],
        pattern: particleNode ? "predicate + priority_marker + final_particle" : "predicate + priority_marker",
        reason: "Native speech uses 先 after an action predicate to mark priority/order ('do this first'); the action remains visible as the child predicate.",
        surfaces: children.map((node) => flattenSurface(node)),
      }),
    });
  }

  function priorityMarkerClauseWithTrailingParticle(node, particleNode) {
    if (!node || node.kind !== "construction" || node.type !== "PriorityMarkerClause" || !particleNode) return node;
    if ((node.children || []).some((child) => isParticle(child))) return node;
    return {
      ...node,
      children: [...(node.children || []), priorityParticleClone(particleNode)],
      trace: {
        ...(node.trace || {}),
        pattern: "predicate + priority_marker + final_particle",
        attached_trailing_particle: flattenSurface(particleNode),
      },
    };
  }

  function priorityMarkerPatternAt(nodes, index) {
    if (!isPriorityActionCandidate(nodes[index])) return null;
    if (!isToken(nodes[index + 1], "先")) return null;
    if (isParticle(nodes[index + 2]) && ["啦", "喇", "呀", "啊"].includes(flattenSurface(nodes[index + 2]))) {
      return { length: 3, particle: nodes[index + 2] };
    }
    return { length: 2, particle: null };
  }

  function wrapPriorityMarkerSubspans(nodes) {
    const result = [];
    let i = 0;
    while (i < nodes.length) {
      const match = priorityMarkerPatternAt(nodes, i);
      if (match) {
        result.push(makePriorityMarkerClause(nodes[i], nodes[i + 1], match.particle));
        i += match.length;
        continue;
      }
      result.push(nodes[i]);
      i += 1;
    }
    return result;
  }

  function sourceLinkedPriorityMarkerClauseFallback(core) {
    const { core: bareCore, particles } = withoutTrailingParticles(core);
    const compact = withoutIgnorableSpaceText(bareCore);
    if (compact.length < 3 || !nodeCanFillSlot(compact[0], "subject")) return null;
    const markerIndex = compact.findIndex((node, index) => index > 1 && isToken(node, "先"));
    if (markerIndex < 0 || markerIndex !== compact.length - 1) return null;
    const action = categorySubspanFor(compact.slice(1, markerIndex), ["ProductiveVO", "TransitiveVP"]);
    if (!action || flattenSurface(action) !== "打電話") return null;
    if (particles.length !== 1 || !isToken(particles[0], "啦")) return null;
    const children = [compact[0], action, priorityMarkerTokenClone(compact[markerIndex]), priorityParticleClone(particles[0])];
    return construction("PriorityMarkerClause", "Priority先", children, {
      note: "Source-linked postverbal 先 profile in 你打電話先啦.",
      slots: cleanSlots(["priority_marker_clause", "sequence_priority_marker", "priority_marker", "subject", "vp", "action_vp", "predicate"]),
      trace: traceInfo("generative_template", {
        construction_type: "PriorityMarkerClause",
        template: ["subject!", "action_vp!", "priority_marker!", "particle!"],
        constraints: { surface_sequence: "你打電話先啦" },
        assigned_slots: ["subject", "action_vp", "priority_marker", "particle"],
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Retains the exact attested action + postverbal 先 + 啦 profile while excluding preverbal and deferral uses.",
      }),
    });
  }

  return {
    priorityMarkerClauseWithTrailingParticle,
    sourceLinkedPriorityMarkerClauseFallback,
    wrapPriorityMarkerSubspans,
  };
};
