"use strict";

const roleColorSettings = require("./presentation/role-colors");
const learnerDisplay = require("./presentation/learner-display");
const learnerGlosses = require("./presentation/learner-glosses");
const diagnosticReminders = require("./presentation/diagnostic-reminders");
const registry = require("./constructions/runtime-label-registry");
const trace = require("./diagnostics/trace-metadata");
const predicateProfiles = require("./grammar/predicate-profiles");
const slotGenerationRules = require("./grammar/templates/slot-generation-rules");
const constructionTemplates = require("./grammar/templates/construction-templates");
const categorySpanTemplates = require("./grammar/templates/category-span-templates");
const slotAliases = require("./grammar/slot-aliases");
const classifierHeadRules = require("./grammar/classifier-head-rules");
const orderedParticleClusters = require("./grammar/ordered-particle-clusters");

function fail(message) { throw new Error(`declarative runtime resource validation failed: ${message}`); }
function assertArray(value, name) { if (!Array.isArray(value)) fail(`${name} must be an array`); }
function assertPlainObject(value, name) {
  if (!value || typeof value !== "object" || Array.isArray(value) || value instanceof Set || value instanceof Map) fail(`${name} must be a plain object`);
}
function assertUnique(values, name) {
  assertArray(values, name);
  const seen = new Set();
  for (const value of values) {
    if (typeof value !== "string" || !value) fail(`${name} contains a non-string or empty value`);
    if (seen.has(value)) fail(`${name} contains duplicate value ${value}`);
    seen.add(value);
  }
}
function assertUniquePairs(entries, name) {
  assertArray(entries, name);
  const keys = new Set();
  for (const entry of entries) {
    if (!Array.isArray(entry) || entry.length !== 2 || typeof entry[0] !== "string" || !entry[0]) fail(`${name} contains a malformed pair`);
    if (keys.has(entry[0])) fail(`${name} contains duplicate key ${entry[0]}`);
    keys.add(entry[0]);
  }
}
function assertUniqueBy(items, key, name) {
  assertArray(items, name);
  const seen = new Set();
  for (const item of items) {
    if (!item || typeof item !== "object" || Array.isArray(item)) fail(`${name} contains a non-object item`);
    const value = item[key];
    if (typeof value !== "string" || !value) fail(`${name} item is missing ${key}`);
    if (seen.has(value)) fail(`${name} contains duplicate ${key} ${value}`);
    seen.add(value);
  }
}

function validateRuntimeDeclarativeResources() {
  assertUniqueBy(roleColorSettings, "key", "roleColorSettings");
  for (const role of roleColorSettings) {
    if (typeof role.label !== "string" || !role.label || !Array.isArray(role.cssVars) || !role.cssVars.length || typeof role.defaultColor !== "string") fail(`roleColorSettings has malformed entry ${role.key}`);
  }
  assertUnique(learnerDisplay.learnerRoleLabels, "learnerRoleLabels");
  assertArray(learnerDisplay.slotNameDisallowedPrefixes, "slotNameDisallowedPrefixes");
  if (!learnerDisplay.slotNameDisallowedPrefixes.every((value) => value instanceof RegExp)) fail("slotNameDisallowedPrefixes must contain regular expressions");
  assertUnique(learnerDisplay.learnerDisplaySlotNames, "learnerDisplaySlotNames");
  assertPlainObject(learnerDisplay.learnerDisplaySlotLabels, "learnerDisplaySlotLabels");
  for (const [name, value] of Object.entries(learnerGlosses)) assertPlainObject(value, `learnerGlosses.${name}`);
  assertPlainObject(diagnosticReminders, "diagnosticReminders");

  assertUnique(registry.constructionLabelRegistry, "constructionLabelRegistry");
  assertUnique(registry.clauseSpanCompatibilityInputs, "clauseSpanCompatibilityInputs");
  assertUnique(registry.clauseRelationSubtypeRegistry, "clauseRelationSubtypeRegistry");
  assertUniquePairs(registry.retiredConstructionLabelRegistry, "retiredConstructionLabelRegistry");
  assertUniquePairs(registry.retiredConstructionLabelAliases, "retiredConstructionLabelAliases");
  assertPlainObject(registry.internalConstructionCompatibilityAliases, "internalConstructionCompatibilityAliases");
  assertPlainObject(registry.internalOnlyConstructionScopes, "internalOnlyConstructionScopes");
  assertPlainObject(registry.constructionLabelPolicy, "constructionLabelPolicy");

  assertUnique(trace.templateTracePassthroughKeys, "templateTracePassthroughKeys");
  assertUniquePairs(trace.parserDecisionTraceKindRegistry, "parserDecisionTraceKindRegistry");
  assertUniquePairs(trace.templateFamilyRegistry, "templateFamilyRegistry");
  assertPlainObject(trace.parserDecisionLabelPolicy, "parserDecisionLabelPolicy");
  assertPlainObject(trace.labelTransitionKindPolicy, "labelTransitionKindPolicy");

  assertPlainObject(predicateProfiles.environmentalEventPredicates, "environmentalEventPredicates");
  assertUniqueBy(predicateProfiles.predicateOmissionProfiles, "id", "predicateOmissionProfiles");
  assertArray(slotGenerationRules, "slotGenerationRules");
  for (const item of slotGenerationRules) {
    if (!item || typeof item !== "object" || typeof item.slot !== "string" || !item.slot || !item.when || typeof item.when !== "object") fail("slotGenerationRules contains a malformed rule");
  }
  assertArray(constructionTemplates, "constructionTemplates");
  assertArray(categorySpanTemplates, "categorySpanTemplates");
  for (const [name, list] of [["constructionTemplates", constructionTemplates], ["categorySpanTemplates", categorySpanTemplates]]) {
    for (const item of list) {
      if (!item || typeof item !== "object" || typeof item.type !== "string" || !Array.isArray(item.template)) fail(`${name} contains a malformed template`);
    }
  }
  assertPlainObject(slotAliases, "slotAliases");
  assertPlainObject(classifierHeadRules, "classifierHeadRules");
  assertPlainObject(orderedParticleClusters.sequenceEvidence, "orderedParticleClusters.sequenceEvidence");
  assertPlainObject(orderedParticleClusters.descriptors, "orderedParticleClusters.descriptors");

  return {
    role_colors: roleColorSettings.length,
    learner_roles: learnerDisplay.learnerRoleLabels.length,
    learner_display_slots: learnerDisplay.learnerDisplaySlotNames.length,
    construction_labels: registry.constructionLabelRegistry.length,
    retired_construction_labels: registry.retiredConstructionLabelRegistry.length,
    predicate_profiles: predicateProfiles.predicateOmissionProfiles.length,
    slot_generation_rules: slotGenerationRules.length,
    construction_templates: constructionTemplates.length,
    category_span_templates: categorySpanTemplates.length,
    classifier_heads: Object.keys(classifierHeadRules).length,
    ordered_particle_descriptors: Object.keys(orderedParticleClusters.descriptors).length,
    learner_glosses: Object.values(learnerGlosses).reduce((total, value) => total + Object.keys(value).length, 0),
  };
}

module.exports = { validateRuntimeDeclarativeResources };
