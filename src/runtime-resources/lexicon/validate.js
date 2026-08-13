"use strict";

const tokenEntries = require("./token-lexicon");
const intentionalTokenOverrides = require("./token-lexicon/intentional-overrides");
const explicitLexicalAnalyses = require("./token-lexicon/explicit-analyses");
const { buildLexicalAnalysisIndex } = require("./lexical-analyses");
const productiveVoEntries = require("./productive-vo");
const verbObjectCompoundEntries = require("./verb-object-compounds");
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

function validateLexicalAnalyses() {
  const defaultEntries = Object.fromEntries(tokenEntries);
  const ids = new Set();
  let analysisCount = 0;
  let multiAnalysisSurfaceCount = 0;
  for (const [surface, rows] of Object.entries(explicitLexicalAnalyses)) {
    if (!defaultEntries[surface]) throw new Error(`explicit lexical analyses reference unknown surface ${JSON.stringify(surface)}`);
    if (!Array.isArray(rows) || rows.length < 1) throw new Error(`explicit lexical analyses for ${surface} must contain at least one analysis`);
    if (rows.length === 1) {
      const baseEntry = defaultEntries[surface] || {};
      const neutralFrequencyCoverage = String(baseEntry.pos || "") === "lexical_item"
        && String(baseEntry.syntax || "").split(/\s+/u).includes("lexical_item")
        && String(baseEntry.note || "").includes("Exact surface retained as neutral lexical coverage");
      if (!neutralFrequencyCoverage) {
        throw new Error(`single explicit lexical analysis for ${surface} requires a neutral frequency-coverage base entry`);
      }
    } else {
      multiAnalysisSurfaceCount += 1;
    }
    for (const analysis of rows) {
      if (!analysis || typeof analysis !== "object" || Array.isArray(analysis)) throw new Error(`lexical analysis for ${surface} must be an object`);
      if (rows.length === 1 && (!analysis.provenance || analysis.provenance.kind !== "expert_lexical_adjudication")) {
        throw new Error(`single explicit lexical analysis for ${surface} requires expert lexical adjudication provenance`);
      }
      for (const key of ["id", "label", "pos", "jyutping", "syntax"]) assertNonEmptyString(analysis[key], `lexical analysis ${surface} ${key}`);
      if (ids.has(analysis.id)) throw new Error(`duplicate lexical analysis id ${analysis.id}`);
      ids.add(analysis.id);
      if (analysis.senses !== undefined && (!Array.isArray(analysis.senses) || analysis.senses.some((sense) => !sense || typeof sense !== "object" || typeof sense.gloss !== "string" || !sense.gloss.trim()))) {
        throw new Error(`lexical analysis ${analysis.id} senses must contain objects with non-empty gloss`);
      }
      if (analysis.provenance !== undefined && analysis.provenance !== null && (typeof analysis.provenance !== "object" || Array.isArray(analysis.provenance))) {
        throw new Error(`lexical analysis ${analysis.id} provenance must be an object`);
      }
      analysisCount += 1;
    }
  }
  const index = buildLexicalAnalysisIndex(tokenEntries);
  if (Object.keys(index).length !== Object.keys(defaultEntries).length) throw new Error("lexical analysis index must preserve every unique token surface");
  const totalAnalyses = Object.values(index).reduce((sum, rows) => sum + rows.length, 0);
  return {
    indexed_surfaces: Object.keys(index).length,
    lexical_analyses: totalAnalyses,
    explicit_multi_analysis_surfaces: multiAnalysisSurfaceCount,
    explicit_analysis_records: analysisCount,
  };
}

function validateRuntimeLexicalResources() {
  const analysisSummary = validateLexicalAnalyses();
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
  const verbObjectCompoundCount = validateEntryTable("verb object compounds", verbObjectCompoundEntries, (surface, value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`verb object compound ${surface} must map to an object`);
    for (const key of ["verb", "object", "label", "type", "source_specification"]) assertNonEmptyString(value[key], `verb object compound ${surface} ${key}`);
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
    token_analysis_surfaces: analysisSummary.indexed_surfaces,
    token_lexical_analyses: analysisSummary.lexical_analyses,
    token_explicit_multi_analysis_surfaces: analysisSummary.explicit_multi_analysis_surfaces,
    token_explicit_analysis_records: analysisSummary.explicit_analysis_records,
    productive_vo_entries: productiveVoCount.entries,
    verb_object_compound_entries: verbObjectCompoundCount.entries,
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
