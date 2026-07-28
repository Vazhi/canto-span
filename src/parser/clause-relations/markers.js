"use strict";

module.exports = function createClauseRelationMarkers(dependencies = {}) {
  const { flattenSurface, isClauseSequenceSeparator, learnerDisplaySlots, nodeSlots } = dependencies;

const CLAUSE_LINKER_SURFACES = new Set(["之後", "之前", "然後", "跟住", "跟住就", "先", "再", "就", "咁", "噉", "所以", "因為", "雖然", "不過", "但係", "如果"]);
const ASSIGNED_SLOT_WRAPPER_COVERAGE_TYPES = new Set(["ModalANotAQuestion"]);

function isTopicFrameLinker(node) {
  return !!(node && node.kind === "token" && nodeSlots(node).includes("topic_frame_linker"));
}

function isRelationalCoverbLinker(node) {
  return !!(node && node.kind === "token" && nodeSlots(node).includes("relational_coverb_linker"));
}

function directWrapperItemSurface(node) {
  if (!node) return "";
  if (node.kind === "text") return node.text || "";
  return flattenSurface(node);
}

function clauseLinkingPivotIndex(children = [], separatorIndex = -1) {
  if (separatorIndex >= 0) return separatorIndex;
  const pivotSurfaces = new Set(["就", "所以", "但係", "不過", "之後", "之前", "然後", "跟住", "跟住就"]);
  for (let index = 1; index < children.length; index++) {
    const node = children[index];
    if (node && node.kind === "token" && pivotSurfaces.has(node.surface || "")) return index;
  }
  return -1;
}

function clauseLinkerRole(node, index, pivotIndex) {
  if (!node || node.kind !== "token") return "";
  const surface = node.surface || "";
  const slots = nodeSlots(node);
  const side = pivotIndex >= 0 && index > pivotIndex ? "pre_child" : "post_child";
  if (surface === "如果") return "condition_introducer";
  if (surface === "因為") return "reason_introducer";
  if (surface === "所以") return "result_linker";
  if (surface === "與其") return "disfavored_option_introducer";
  if (surface === "不如") return "preferred_option_introducer";
  if (surface === "但係" || surface === "不過") return "contrast_linker";
  if (slots.includes("topic_frame_linker")) return "topic_frame_linker";
  if (slots.includes("relational_coverb_linker")) return "relational_coverb_linker";
  if (surface === "之後" || surface === "之前" || slots.includes("time") || slots.includes("time_head")) return `${side}_temporal_linker`;
  if (surface === "先" || surface === "再" || surface === "然後" || surface === "跟住" || surface === "跟住就") return `${side}_sequence_linker`;
  if (slots.includes("subject")) return `${side}_clause_subject`;
  if (slots.includes("focus_adverb")) return `${side}_focus_adverb`;
  if (surface === "就" || slots.includes("result_marker")) return `${side}_sequence_linker`;
  if (CLAUSE_LINKER_SURFACES.has(surface) || slots.includes("discourse_marker")) return `${side}_discourse_linker`;
  return "";
}

function clauseLinkerInventory(children = []) {
  const separatorIndex = children.findIndex(isClauseSequenceSeparator);
  const pivotIndex = clauseLinkingPivotIndex(children, separatorIndex);
  return children
    .map((node, index) => {
      if (!node || node.kind !== "token") return null;
      const role = clauseLinkerRole(node, index, pivotIndex);
      return role ? { surface: node.surface || "", role } : null;
    })
    .filter(Boolean);
}

function clauseLinkingWrapperCoverage(children = []) {
  const separatorIndexes = children
    .map((node, index) => isClauseSequenceSeparator(node) ? index : -1)
    .filter((index) => index >= 0);
  const separatorIndex = separatorIndexes.length ? separatorIndexes[0] : -1;
  const pivotIndex = clauseLinkingPivotIndex(children, separatorIndex);
  const accountedChildren = [];
  const accountedLinkers = [];
  const accountedSeparators = [];
  const unaccountedTokens = [];

  children.forEach((node, index) => {
    const surface = directWrapperItemSurface(node);
    if (!node) return;
    if (node.kind === "construction") {
      const precededByTopicFrameLinker = index > 0 && isTopicFrameLinker(children[index - 1]);
      const precededByRelationalCoverbLinker = index > 0 && isRelationalCoverbLinker(children[index - 1]);
      accountedChildren.push({
        surface,
        construction: node.type,
        role: precededByTopicFrameLinker
          ? "topic_frame_domain"
          : (precededByRelationalCoverbLinker
            ? "relational_coverb_domain"
            : (index < pivotIndex || pivotIndex < 0 ? "left_clause_like" : "right_clause_like")),
      });
      return;
    }
    if (isClauseSequenceSeparator(node)) {
      accountedSeparators.push({ surface, role: "visible_separator" });
      return;
    }
    if (node.kind === "token") {
      const role = clauseLinkerRole(node, index, pivotIndex);
      if (role) {
        accountedLinkers.push({ surface, role, slots: learnerDisplaySlots(nodeSlots(node)) });
      } else {
        unaccountedTokens.push({ surface, kind: "token", index });
      }
      return;
    }
    if (node.kind === "text" && surface.trim()) {
      unaccountedTokens.push({ surface, kind: "text", index });
    }
  });

  return {
    status: unaccountedTokens.length ? "WARN" : "PASS",
    policy: "ClauseRelationGraph may group linked clause-like material, but it must not hide wrapper holes. Every direct item inside the wrapper must be accounted for as a child construction, linker material, or separator material.",
    accounted_children: accountedChildren,
    accounted_linkers: accountedLinkers,
    accounted_separators: accountedSeparators,
    unaccounted_tokens: unaccountedTokens,
    unaccounted_wrapper_token_count: unaccountedTokens.length,
  };
}

function wrapperSlotDisplayRole(type, slot) {
  if (type === "ModalANotAQuestion") {
    const roles = {
      subject: "subject",
      modal_a_not_a: "modal_a_not_a",
      modal_positive_arm: "positive_modal_arm",
      negator: "negator",
      modal_negative_arm: "negative_modal_arm",
      vp: "requested_action_vp",
      particle: "final_particle",
    };
    return roles[slot] || slot || "";
  }
  return slot || "";
}

function assignedSlotWrapperCoverage(type, children = [], assignedSlots = []) {
  if (!ASSIGNED_SLOT_WRAPPER_COVERAGE_TYPES.has(type)) return null;
  const accountedParts = [];
  const unaccountedTokens = [];
  children.forEach((node, index) => {
    const surface = directWrapperItemSurface(node);
    const slot = assignedSlots[index] || "";
    const role = wrapperSlotDisplayRole(type, slot);
    if (slot && role) {
      const part = {
        surface,
        role,
        assigned_slot: slot,
        kind: node && node.kind ? node.kind : "",
      };
      if (node && node.kind === "construction") part.construction = node.type || "";
      accountedParts.push(part);
      return;
    }
    if (node && node.kind === "text" && !String(surface || "").trim()) return;
    unaccountedTokens.push({ surface, kind: node && node.kind ? node.kind : "unknown", index });
  });
  return {
    status: unaccountedTokens.length ? "WARN" : "PASS",
    coverage_kind: "assigned_slot_wrapper",
    policy: "Greedy-looking parent wrappers may be collapsed in normal learner display only when every direct child is explicitly accounted for by an assigned slot. Collapse must not hide wrapper holes.",
    accounted_parts: accountedParts,
    unaccounted_tokens: unaccountedTokens,
    unaccounted_wrapper_token_count: unaccountedTokens.length,
  };
}

function wrapperCoverageForConstructionNode(node) {
  if (!node || node.kind !== "construction") return null;
  if (node.type === "ClauseRelationGraph") {
    return (node.trace && node.trace.wrapper_coverage) || clauseLinkingWrapperCoverage(node.children || []);
  }
  if (ASSIGNED_SLOT_WRAPPER_COVERAGE_TYPES.has(node.type)) {
    const trace = node.trace || {};
    return trace.wrapper_coverage || assignedSlotWrapperCoverage(node.type, node.children || [], trace.assigned_slots || []);
  }
  return null;
}

  return {
    CLAUSE_LINKER_SURFACES, isTopicFrameLinker, isRelationalCoverbLinker, directWrapperItemSurface,
    clauseLinkingPivotIndex, clauseLinkerRole, clauseLinkerInventory, clauseLinkingWrapperCoverage,
    wrapperSlotDisplayRole, assignedSlotWrapperCoverage, wrapperCoverageForConstructionNode,
  };
};
