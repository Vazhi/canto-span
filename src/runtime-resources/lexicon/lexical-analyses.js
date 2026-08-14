"use strict";

const EXPLICIT_ANALYSES = require("./token-lexicon/explicit-analyses");
const { buildExplicitAnalyses: buildR501750ExplicitAnalyses } = require("./token-lexicon/cifu-r501-750-reviewed");

function stableLegacyAnalysisId(surface) {
  return `lex:${String(surface || "")}:default`;
}

function normalizeSenseRows(value, fallbackGloss = "") {
  if (Array.isArray(value) && value.length) {
    return value.map((row) => {
      if (typeof row === "string") return Object.freeze({ gloss: row });
      return Object.freeze({ ...(row || {}) });
    });
  }
  return fallbackGloss ? [Object.freeze({ gloss: fallbackGloss })] : [];
}

function normalizeAnalysis(surface, baseEntry = {}, analysis = {}, index = 0) {
  const merged = { ...baseEntry, ...analysis };
  delete merged.analyses;
  const id = analysis.id || (index === 0 ? stableLegacyAnalysisId(surface) : `lex:${surface}:${index + 1}`);
  return Object.freeze({
    id,
    surface,
    label: merged.label || "neutral",
    pos: merged.pos || "",
    jyutping: merged.jyutping || "",
    syntax: merged.syntax || "lexical_candidate",
    senses: Object.freeze(normalizeSenseRows(analysis.senses, merged.note || "")),
    semantic: Object.freeze(Array.isArray(merged.semantic) ? [...merged.semantic] : []),
    verb_class: Object.freeze(Array.isArray(merged.verb_class) ? [...merged.verb_class] : []),
    particle_class: merged.particle_class || "",
    classifier_classes: Object.freeze(Array.isArray(merged.classifier_classes) ? [...merged.classifier_classes] : []),
    note: merged.note || "",
    review: merged.review || "",
    provenance: analysis.provenance || baseEntry.provenance || null,
  });
}

function lexicalAnalysesForEntry(surface, entry = {}, explicitAnalyses = EXPLICIT_ANALYSES) {
  const inline = Array.isArray(entry.analyses) && entry.analyses.length ? entry.analyses : null;
  const explicit = explicitAnalyses && Array.isArray(explicitAnalyses[surface]) && explicitAnalyses[surface].length
    ? explicitAnalyses[surface]
    : null;
  const source = inline || explicit;
  if (!source) return Object.freeze([normalizeAnalysis(surface, entry, entry, 0)]);
  return Object.freeze(source.map((analysis, index) => normalizeAnalysis(surface, entry, analysis, index)));
}

function effectiveExplicitAnalyses(entries, explicitAnalyses = EXPLICIT_ANALYSES) {
  if (explicitAnalyses !== EXPLICIT_ANALYSES) return explicitAnalyses;
  return Object.freeze({
    ...EXPLICIT_ANALYSES,
    ...buildR501750ExplicitAnalyses(entries),
  });
}

function buildLexicalAnalysisIndex(entries, explicitAnalyses = EXPLICIT_ANALYSES) {
  const entryRows = entries || [];
  const defaultEntries = Object.fromEntries(entryRows);
  const effectiveExplicit = effectiveExplicitAnalyses(entryRows, explicitAnalyses);
  const out = Object.create(null);
  for (const [surface, entry] of Object.entries(defaultEntries)) {
    out[surface] = lexicalAnalysesForEntry(surface, entry, effectiveExplicit);
  }
  return Object.freeze(out);
}

function lexicalAnalysisById(index, surface, analysisId) {
  const rows = index && index[surface] || [];
  return rows.find((row) => row.id === analysisId) || null;
}

module.exports = {
  EXPLICIT_ANALYSES,
  stableLegacyAnalysisId,
  normalizeAnalysis,
  lexicalAnalysesForEntry,
  effectiveExplicitAnalyses,
  buildLexicalAnalysisIndex,
  lexicalAnalysisById,
};
