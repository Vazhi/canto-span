"use strict";

module.exports = function createModalPredicateDetectors(dependencies = {}) {
  const {
    categorySubspanFor, construction, coordinatedNPFromParts, firstToken, flattenSurface,
    isModalToken, nodeCanFillSlot, templateConstructionFor, templateDerivedSlots,
    traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles,
  } = dependencies;

  function isModalPredicateConstruction(node) {
    return node && node.kind === "construction" && node.type === "ModalVP";
  }

  function isPremodalClauseModifier(node) {
    if (!node) return false;
    if (node.kind === "text") return false;
    return nodeCanFillSlot(node, "time") || nodeCanFillSlot(node, "how") || nodeCanFillSlot(node, "manner");
  }

  function modalClauseTypeForLeadingNode(node) {
    if (!node) return "";
    if (nodeCanFillSlot(node, "location") || nodeCanFillSlot(node, "locative_phrase")) return "LocativeModalPredicateClause";
    if (nodeCanFillSlot(node, "subject") && !nodeCanFillSlot(node, "object")) return "SubjectModalPredicateClause";
    if (nodeCanFillSlot(node, "subject") && (firstToken(node) || {}).label === "who") return "SubjectModalPredicateClause";
    if (nodeCanFillSlot(node, "topic") || nodeCanFillSlot(node, "np") || nodeCanFillSlot(node, "head_noun")) return "TopicModalPredicateClause";
    return "";
  }

  function modalClauseLabelForType(type) {
    if (type === "LocativeModalPredicateClause") return "LocModal";
    if (type === "SubjectModalPredicateClause") return "SubjModal";
    if (type === "TopicModalPredicateClause") return "TopicModal";
    return "ModalClause";
  }

  function modalPredicateFromNodes(nodes) {
    if (!nodes || !nodes.length) return null;
    if (nodes.length === 1 && nodeCanFillSlot(nodes[0], "vp")) return nodes[0];
    const templated = categorySubspanFor(nodes, ["VerbComplementVP", "DirectionalMotionVP", "CompoundDirectionalMotionVP", "NegatedDirectionalMotionVP", "DegreeMannerAdverbial"])
      || templateConstructionFor(nodes, ["VerbComplementVP", "TransitiveVP", "ProductiveVO", "CompletionVP", "DirectionalMotionVP", "MotionPurposeChain", "SerialVerbPurposeChain"]);
    if (templated && nodeCanFillSlot(templated, "vp")) return templated;
    return null;
  }

  function modalVPFromNodes(nodes) {
    if (!nodes || !nodes.length) return null;
    const generated = templateConstructionFor(nodes, ["ModalVP"]);
    if (generated) return generated;
    const { core: bareCore, particles } = withoutTrailingParticles(nodes);
    if (!bareCore.length || !nodeCanFillSlot(bareCore[0], "modal")) return null;
    const modal = bareCore[0];
    const predicateNodes = bareCore.slice(1);
    if (!predicateNodes.length) return null;
    const predicate = modalPredicateFromNodes(predicateNodes);
    if (!predicate || !nodeCanFillSlot(predicate, "vp")) return null;
    const children = [modal, predicate, ...particles];
    return construction("ModalVP", "ModalVP", children, {
      note: "Broad modal VP: modal auxiliary plus VP/predicate complement. Matched by governed generated slots rather than the old modal-token heuristic.",
      slots: templateDerivedSlots("ModalVP", children),
      trace: traceInfo("generative_template", {
        construction_type: "ModalVP",
        template_family: "generative_template",
        template: ["modal!", "vp!", "particle?"],
        assigned_slots: ["modal", "vp", ...particles.map(() => "particle")],
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Promotes modal + VP/predicate material into the governed generative-template lane while preserving the predicate child span.",
      }),
    });
  }

  function modalClauseTemplateForType(type, modifiers) {
    const first = type === "LocativeModalPredicateClause" ? "location!" : type === "SubjectModalPredicateClause" ? "subject!" : "topic!";
    const middle = modifiers.map((node) => nodeCanFillSlot(node, "time") ? "time?" : nodeCanFillSlot(node, "how") ? "how?" : "manner?");
    return [first, ...middle, "modal_vp!"];
  }

  function modalPredicateClauseFromParts(beforeModal, modalSpan) {
    if (!isModalPredicateConstruction(modalSpan)) return null;
    if (!beforeModal.length) return null;
    if (beforeModal.some((node) => node.kind === "text")) return null;
    const leading = beforeModal[0];
    const modifiers = beforeModal.slice(1);
    if (modifiers.some((node) => !isPremodalClauseModifier(node))) return null;
    const type = modalClauseTypeForLeadingNode(leading);
    if (!type) return null;
    const children = [...beforeModal, modalSpan];
    return construction(type, modalClauseLabelForType(type), children, {
      note: "v0.5.31 subject/topic/location-preserving modal clause. The existing ModalVP is kept as the visible predicate child instead of becoming a separate top-level span.",
      slots: templateDerivedSlots(type, children),
      trace: traceInfo("generative_template", {
        construction_type: type,
        template_family: "generative_template",
        template: modalClauseTemplateForType(type, modifiers),
        assigned_slots: [type === "LocativeModalPredicateClause" ? "location" : type === "SubjectModalPredicateClause" ? "subject" : "topic", ...modifiers.map((node) => nodeCanFillSlot(node, "time") ? "time" : nodeCanFillSlot(node, "how") ? "how" : "manner"), "modal_vp"],
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Wraps a generated topic/subject/location prefix plus an existing ModalVP without changing the ModalVP internals.",
      }),
    });
  }

  function coordinatedSubjectModalPredicateClauseFallback(core) {
    const { core: bareCore, particles } = withoutTrailingParticles(core);
    const compact = withoutIgnorableSpaceText(bareCore);
    if (compact.length < 5) return null;
    const coord = coordinatedNPFromParts(compact.slice(0, 3));
    if (!coord) return null;
    const rest = compact.slice(3);
    const modalVP = modalVPFromNodes(rest);
    if (!modalVP || !nodeCanFillSlot(modalVP, "modal_vp")) return null;
    const children = [coord, modalVP, ...particles];
    return construction("CoordinatedSubjectModalPredicateClause", "CoordSubjModal", children, {
      note: "v0.5.35 coordinated-subject modal clause: coordinated subject + existing ModalVP child.",
      slots: templateDerivedSlots("CoordinatedSubjectModalPredicateClause", children),
      trace: traceInfo("generative_template", {
        construction_type: "CoordinatedSubjectModalPredicateClause",
        template_family: "generative_template",
        template: ["subject!", "modal_vp!", "particle?"],
        assigned_slots: ["subject", "modal_vp", ...particles.map(() => "particle")],
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Adds a subject-preserving wrapper for the reviewed coordinated-subject modal pattern while keeping the ModalVP internals unchanged.",
      }),
    });
  }

  function modalPredicateWrapCoreFallback(core) {
    const modalIndex = core.findIndex(isModalToken);
    if (modalIndex < 0 || modalIndex >= core.length - 1) return null;
    const before = core.slice(0, modalIndex);
    let modalSpan = modalVPFromNodes(core.slice(modalIndex));
    if (!modalSpan) {
      modalSpan = construction("ModalVP", "ModalVP", core.slice(modalIndex), {
        note: "Modal/desiderative construction wrapping following predicate.",
        trace: traceInfo("generative_or_heuristic_slot_rule", {
          rule: "modal token followed by predicate material",
          reason: "Fallback only; governed ModalVP should normally catch modal + VP material.",
        }),
      });
    }
    const modalClause = modalPredicateClauseFromParts(before, modalSpan);
    if (modalClause) return [modalClause];
    return [...before, modalSpan];
  }

  return {
    coordinatedSubjectModalPredicateClauseFallback,
    modalPredicateWrapCoreFallback,
    modalVPFromNodes,
  };
};
