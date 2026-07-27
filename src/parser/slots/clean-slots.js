"use strict";

const {
  slotNameDisallowedPrefixes: SLOT_NAME_DISALLOWED_PREFIXES,
} = require("../../runtime-resources/presentation/learner-display");

function slotNameRegistryIssue(slot) {
  if (typeof slot !== "string") return "slot_not_string";
  if (!/^[a-z][a-z0-9_]*$/.test(slot)) return "slot_not_snake_case";
  if (SLOT_NAME_DISALLOWED_PREFIXES.some((pattern) => pattern.test(slot))) return "implementation_phase_marker_in_slot";
  return "";
}
function isCleanSlotName(slot) {
  return !slotNameRegistryIssue(slot);
}
function cleanSlots(slots = []) {
  return [...new Set((slots || []).filter(isCleanSlotName))].sort();
}

module.exports = {
  slotNameRegistryIssue,
  isCleanSlotName,
  cleanSlots,
};
