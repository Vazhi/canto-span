"use strict";

module.exports = function createTemplateMatcher(dependencies = {}) {
  const {
    firstToken,
    flattenSurface,
    isBareQuantityTokenObject,
    nodeCanFillSlot,
    nodeCanLicenseEvidenceGatedObject,
    nodeSlots,
  } = dependencies;

  function parseTemplateSlot(spec) {
    const required = spec.endsWith("!");
    const optional = spec.endsWith("?");
    const slot = required || optional ? spec.slice(0, -1) : spec;
    return { slot, required: required || !optional, optional };
  }
  function templateConstraintsPass(assignments, templateDef = {}) {
    const constraints = templateDef.constraints || {};
    if (constraints.same_surface) {
      const surfaces = assignments.map((item) => flattenSurface(item.node));
      if (!surfaces.length) return false;
      if (new Set(surfaces).size !== 1) return false;
    }
    if (constraints.copied_first_token_surface_slots) {
      const copiedSlots = constraints.copied_first_token_surface_slots || [];
      for (const slot of copiedSlots) {
        const matchingAssignments = assignments.filter((item) => item.slot === slot);
        if (matchingAssignments.length < 2) return false;
        const firstSurfaces = matchingAssignments.map((item) => {
          const tok = firstToken(item.node);
          return tok ? tok.surface : flattenSurface(item.node);
        });
        if (!firstSurfaces[0] || firstSurfaces.some((surface) => surface !== firstSurfaces[0])) return false;
      }
    }
    if (constraints.disallow_child_slots) {
      const disallowed = constraints.disallow_child_slots || [];
      for (const item of assignments) {
        const slots = nodeSlots(item.node);
        if (disallowed.some((slot) => slots.includes(slot))) return false;
      }
    }
    if (constraints.first_node_must_not_have_slots) {
      const first = assignments[0] && assignments[0].node;
      const firstSlots = nodeSlots(first);
      const disallowed = constraints.first_node_must_not_have_slots || [];
      if (disallowed.some((slot) => firstSlots.includes(slot))) return false;
    }
    if (constraints.first_node_must_have_surface) {
      const first = assignments[0] && assignments[0].node;
      if (flattenSurface(first) !== constraints.first_node_must_have_surface) return false;
    }
    if (constraints.predicate_must_have_any_slots) {
      const allowed = constraints.predicate_must_have_any_slots || [];
      const predicateAssignments = assignments.filter((item) => item.slot === "predicate");
      if (!predicateAssignments.length) return false;
      if (!predicateAssignments.some((item) => {
        const slots = nodeSlots(item.node);
        return allowed.some((slot) => slots.includes(slot));
      })) return false;
    }
    if (constraints.require_any_assigned_slots) {
      const requiredSlots = constraints.require_any_assigned_slots || [];
      if (!assignments.some((item) => requiredSlots.includes(item.slot))) return false;
    }
    if (constraints.surface_sequence_in) {
      const surfaceSequence = assignments.map((item) => flattenSurface(item.node)).join("");
      const allowedSequences = constraints.surface_sequence_in || [];
      if (!allowedSequences.includes(surfaceSequence)) return false;
    }
    if (constraints.slot_first_token_syntax_must_include_any) {
      for (const [slot, requiredTerms] of Object.entries(constraints.slot_first_token_syntax_must_include_any || {})) {
        const required = requiredTerms || [];
        const matchingAssignments = assignments.filter((item) => item.slot === slot);
        if (!matchingAssignments.length) return false;
        if (matchingAssignments.some((item) => {
          const tok = firstToken(item.node);
          const syntax = String(tok && tok.syntax || "");
          return !required.some((term) => syntax.includes(term));
        })) return false;
      }
    }
    if (constraints.slot_surface_in) {
      for (const [slot, allowedSurfaces] of Object.entries(constraints.slot_surface_in || {})) {
        const allowed = allowedSurfaces || [];
        const matchingAssignments = assignments.filter((item) => item.slot === slot);
        if (!matchingAssignments.length) continue;
        if (!matchingAssignments.every((item) => allowed.includes(flattenSurface(item.node)))) return false;
      }
    }
    if (constraints.slot_surface_not_in) {
      for (const [slot, disallowedSurfaces] of Object.entries(constraints.slot_surface_not_in || {})) {
        const disallowed = disallowedSurfaces || [];
        const matchingAssignments = assignments.filter((item) => item.slot === slot);
        if (matchingAssignments.some((item) => disallowed.includes(flattenSurface(item.node)))) return false;
      }
    }
    if (constraints.slot_must_not_be_bare_quantity_token) {
      const guardedSlots = constraints.slot_must_not_be_bare_quantity_token || [];
      for (const slot of guardedSlots) {
        const matchingAssignments = assignments.filter((item) => item.slot === slot);
        if (matchingAssignments.some((item) => isBareQuantityTokenObject(item.node))) return false;
      }
    }
    if (constraints.slot_must_be_licensed_np) {
      const guardedSlots = constraints.slot_must_be_licensed_np || [];
      for (const slot of guardedSlots) {
        const matchingAssignments = assignments.filter((item) => item.slot === slot);
        if (!matchingAssignments.length || matchingAssignments.some((item) => !nodeCanLicenseEvidenceGatedObject(item.node))) return false;
      }
    }
    if (constraints.slot_must_have_any_slots) {
      for (const [slot, requiredSlots] of Object.entries(constraints.slot_must_have_any_slots || {})) {
        const required = requiredSlots || [];
        const matchingAssignments = assignments.filter((item) => item.slot === slot);
        if (!matchingAssignments.length) return false;
        if (matchingAssignments.some((item) => {
          const slots = nodeSlots(item.node);
          return !required.some((requiredSlot) => slots.includes(requiredSlot));
        })) return false;
      }
    }
    if (constraints.slot_must_not_have_slots) {
      for (const [slot, disallowedSlots] of Object.entries(constraints.slot_must_not_have_slots || {})) {
        const disallowed = disallowedSlots || [];
        const matchingAssignments = assignments.filter((item) => item.slot === slot);
        if (matchingAssignments.some((item) => {
          const slots = nodeSlots(item.node);
          return disallowed.some((disallowedSlot) => slots.includes(disallowedSlot));
        })) return false;
      }
    }
    return true;
  }
  function matchTemplate(nodes, template) {
    const specs = template.map(parseTemplateSlot);
    const memo = new Map();

    function step(i, j, assignments) {
      const key = `${i}:${j}`;
      if (memo.has(key)) return null;
      if (j === specs.length) return i === nodes.length ? assignments : null;
      const spec = specs[j];

      // Optional slot may be absent. Try present first so the render captures useful material.
      if (spec.optional && i < nodes.length && nodeCanFillSlot(nodes[i], spec.slot)) {
        const matched = step(i + 1, j + 1, [...assignments, { slot: spec.slot, node: nodes[i] }]);
        if (matched) return matched;
      }
      if (spec.optional) {
        const skipped = step(i, j + 1, assignments);
        if (skipped) return skipped;
      }

      if (i < nodes.length && nodeCanFillSlot(nodes[i], spec.slot)) {
        const matched = step(i + 1, j + 1, [...assignments, { slot: spec.slot, node: nodes[i] }]);
        if (matched) return matched;
      }

      memo.set(key, true);
      return null;
    }

    return step(0, 0, []);
  }

  return {
    parseTemplateSlot,
    templateConstraintsPass,
    matchTemplate,
  };
};
