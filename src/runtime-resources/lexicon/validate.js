"use strict";

const tokenEntries = require("./token-lexicon");
const intentionalTokenOverrides = require("./token-lexicon/intentional-overrides");
const productiveVoEntries = require("./productive-vo");
const formulas = require("./formulas");
const compositionalLexicalPhrases = require("./compositional-lexical-phrases");
const {
  protectedAddressTerms,
  addressSuffixes,
  addressPrefixes,
  addressFollowers,
  commonSurnameCharacters,
} = require("./address-terms");
const jyutpingReviewEntries = require("../pronunciation/jyutping-review-expectations");
const unknownCjkJyutpingEntries = require("../pronunciation/unknown-cjk-jyutping-fallback");

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${label} must be a non-empty string`);
}

function validateUniqueList(name, values) {
  if (!Array.isArray(values)) throw new Error(`${name} must be an array`);
  const seen = new Set();
  for (const value of values) {
    assertNonEmptyString(value, `${name} entry`);
    if (seen.has(value)) throw new Error(`${name} contains duplicate entry ${JSON.stringify(value)}`);
    seen.add(value);
  }
  return values.length;
}

function validateEntryTable(name, entries, validateValue, intentionalOverrides = null) {
  if (!Array.isArray(entries)) throw new Error(`${name} must export an entry array`);
  const counts = new Map();
  for (const entry of entries) {
    if (!Array.isArray(entry) || entry.length !== 2) throw new Error(`${name} entries must be [surface, value] pairs`);
    const [surface, value] = entry;
    assertNonEmptyString(surface, `${name} surface`);
    counts.set(surface, (counts.get(surface) || 0) + 1);
    validateValue(surface, value);
  }
  const duplicateSurfaces = [...counts].filter(([, count]) => count > 1);
  if (!intentionalOverrides && duplicateSurfaces.length) {
    throw new Error(`${name} contains duplicate surface ${JSON.stringify(duplicateSurfaces[0][0])}`);
  }
  if (intentionalOverrides) {
    for (const [surface, count] of duplicateSurfaces) {
      const policy = intentionalOverrides[surface];
      if (!policy) throw new Error(`${name} contains undeclared duplicate surface ${JSON.stringify(surface)}`);
      if (policy.resolution !== "last-entry-wins" || policy.occurrences !== count) {
        throw new Error(`${name} override policy mismatch for ${JSON.stringify(surface)}`);
      }
      assertNonEmptyString(policy.reason, `${name} override ${surface} reason`);
    }
    for (const [surface, policy] of Object.entries(intentionalOverrides)) {
      if ((counts.get(surface) || 0) !== policy.occurrences || policy.occurrences < 2) {
        throw new Error(`${name} declared override ${JSON.stringify(surface)} does not match entry count`);
      }
    }
  }
  return { entries: entries.length, unique_surfaces: counts.size, intentional_overrides: duplicateSurfaces.length };
}

function validateRuntimeLexicalResources() {
  const tokenSummary = validateEntryTable("token lexicon", tokenEntries, (surface, value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`token ${surface} must map to an object`);
    assertNonEmptyString(value.label, `token ${surface} label`);
    assertNonEmptyString(value.syntax, `token ${surface} syntax`);
    if (value.jyutping !== undefined && typeof value.jyutping !== "string") throw new Error(`token ${surface} jyutping must be a string`);
    if (value.note !== undefined && typeof value.note !== "string") throw new Error(`token ${surface} note must be a string`);
    if (value.classifier_classes !== undefined && (!Array.isArray(value.classifier_classes) || value.classifier_classes.some((item) => typeof item !== "string" || !item))) {
      throw new Error(`token ${surface} classifier_classes must contain non-empty strings`);
    }
  }, intentionalTokenOverrides);
  const productiveVoCount = validateEntryTable("productive VO", productiveVoEntries, (surface, value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`productive VO ${surface} must map to an object`);
    for (const key of ["verb", "object", "label", "type"]) assertNonEmptyString(value[key], `productive VO ${surface} ${key}`);
  });
  const jyutpingReviewCount = validateEntryTable("Jyutping review expectations", jyutpingReviewEntries, (surface, value) => {
    if (!Array.isArray(value) || !value.length) throw new Error(`Jyutping review ${surface} must contain at least one reading`);
    value.forEach((reading) => assertNonEmptyString(reading, `Jyutping review ${surface} reading`));
  });
  const unknownCjkJyutpingCount = validateEntryTable("unknown CJK Jyutping fallback", unknownCjkJyutpingEntries, (surface, value) => {
    assertNonEmptyString(value, `unknown CJK Jyutping ${surface}`);
  });
  return {
    token_entries: tokenSummary.entries,
    token_unique_surfaces: tokenSummary.unique_surfaces,
    token_intentional_overrides: tokenSummary.intentional_overrides,
    productive_vo_entries: productiveVoCount.entries,
    jyutping_review_entries: jyutpingReviewCount.entries,
    unknown_cjk_jyutping_entries: unknownCjkJyutpingCount.entries,
    formulas: validateUniqueList("formulas", formulas),
    compositional_lexical_phrases: validateUniqueList("compositional lexical phrases", compositionalLexicalPhrases),
    protected_address_terms: validateUniqueList("protected address terms", protectedAddressTerms),
    address_suffixes: validateUniqueList("address suffixes", addressSuffixes),
    address_prefixes: validateUniqueList("address prefixes", addressPrefixes),
    address_followers: validateUniqueList("address followers", addressFollowers),
    common_surname_characters: validateUniqueList("common surname characters", commonSurnameCharacters),
  };
}

module.exports = { validateRuntimeLexicalResources };
