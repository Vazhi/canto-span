"use strict";

const HIGH_CONFIDENCE_SIMPLIFIED_TO_TRADITIONAL = require("../../runtime-resources/normalization/simplified-to-traditional");
const FOLDED_PINYIN_FALLOUT_CANTONESE_LEXICAL_REPAIRS = require("../../runtime-resources/normalization/folded-pinyin-repairs");

function normalizeSurface(text) {
  return String(text || "").replace(/[\s\u3000，。！？、；：,.!?;:]/gu, "");
}

// v0.5.103 raw-first parser-shadow normalization. The learner-facing source
// must remain exactly what was typed. Only parser_shadow_source is normalized.
function foldedPinyinFalloutRepair(rawChars, index) {
  const raw = rawChars[index];
  const repair = FOLDED_PINYIN_FALLOUT_CANTONESE_LEXICAL_REPAIRS[raw] || null;
  if (!repair) return null;
  // Multi-character contraction such as 没有 → 冇 is not safe in this slice
  // because current raw-display alignment is one parser-shadow character per
  // raw character. Avoid creating the incorrect intermediate shadow 冇有.
  if (raw === "没" && rawChars[index + 1] === "有") return null;
  return repair;
}
function normalizeInputForParser(rawSource) {
  const rawText = String(rawSource || "");
  const rawChars = Array.from(rawText);
  const shadowChars = [];
  const normalizationTrace = [];
  const reviewSuggestions = [];

  rawChars.forEach((raw, index) => {
    const foldedRepair = foldedPinyinFalloutRepair(rawChars, index);
    const traditional = HIGH_CONFIDENCE_SIMPLIFIED_TO_TRADITIONAL[raw];
    const normalized = foldedRepair ? foldedRepair.normalized : (traditional || raw);
    shadowChars.push(normalized);
    if (normalized !== raw) {
      const isFoldedRepair = Boolean(foldedRepair);
      normalizationTrace.push({
        index,
        raw,
        normalized,
        type: isFoldedRepair ? "pinyin_fallout_cantonese_lexical_repair" : "simplified_to_traditional",
        confidence: isFoldedRepair ? foldedRepair.confidence : "high",
        source: isFoldedRepair ? foldedRepair.source : "character_form_map",
        status: isFoldedRepair ? "folded_parser_shadow_only" : "applied_parser_shadow_only",
        applied_to_parser_shadow: true,
        learner_display_replaced: false,
        one_to_one_character_mapping: true,
        note: isFoldedRepair ? foldedRepair.note : "High-confidence Simplified-to-Traditional parser-shadow character-form normalization."
      });
    }
  });

  const parserShadowSource = shadowChars.join("");
  return {
    raw_source: rawText,
    parser_shadow_source: parserShadowSource,
    normalization_trace: normalizationTrace,
    review_suggestions: reviewSuggestions,
    raw_first_display: true,
  };
}
function nodeParserSurface(node) {
  if (!node) return "";
  if (node.kind === "token") return node.surface || "";
  if (node.kind === "text") return node.text || "";
  if (node.kind === "construction") return (node.children || []).map(nodeParserSurface).join("");
  return "";
}
function nodeDisplaySurface(node) {
  if (!node) return "";
  if (node.kind === "token") return node.display_surface || node.surface || "";
  if (node.kind === "text") return node.display_text || node.text || "";
  if (node.kind === "construction") return (node.children || []).map(nodeDisplaySurface).join("");
  return "";
}
function annotateRawDisplaySurfaces(nodes, rawSource, parserShadowSource) {
  const rawChars = Array.from(String(rawSource || ""));
  const shadowChars = Array.from(String(parserShadowSource || ""));
  let cursor = 0;

  const annotate = (node) => {
    if (!node) return;
    if (node.kind === "construction") {
      for (const child of node.children || []) annotate(child);
      const displaySurface = nodeDisplaySurface(node);
      const parserSurface = nodeParserSurface(node);
      if (displaySurface && displaySurface !== parserSurface) node.display_surface = displaySurface;
      return;
    }

    const parserSurface = nodeParserSurface(node);
    const length = Array.from(parserSurface).length;
    const rawSlice = rawChars.slice(cursor, cursor + length).join("");
    const shadowSlice = shadowChars.slice(cursor, cursor + length).join("");
    if (length) cursor += length;

    if (node.kind === "token") {
      if (rawSlice && rawSlice !== node.surface) {
        node.display_surface = rawSlice;
        node.parser_surface = node.surface;
      }
      if (shadowSlice && shadowSlice !== parserSurface) node.shadow_alignment_warning = shadowSlice;
    } else if (node.kind === "text") {
      if (rawSlice && rawSlice !== node.text) node.display_text = rawSlice;
      if (shadowSlice && shadowSlice !== parserSurface) node.shadow_alignment_warning = shadowSlice;
    }
  };

  for (const node of nodes || []) annotate(node);
  return nodes;
}
function inputNormalizationHasFindings(inputNormalization) {
  return !!(inputNormalization && (
    (inputNormalization.normalization_trace || []).length ||
    (inputNormalization.review_suggestions || []).length ||
    inputNormalization.raw_source !== inputNormalization.parser_shadow_source
  ));
}

module.exports = {
  normalizeSurface,
  foldedPinyinFalloutRepair,
  normalizeInputForParser,
  nodeParserSurface,
  nodeDisplaySurface,
  annotateRawDisplaySurfaces,
  inputNormalizationHasFindings,
  HIGH_CONFIDENCE_SIMPLIFIED_TO_TRADITIONAL,
  FOLDED_PINYIN_FALLOUT_CANTONESE_LEXICAL_REPAIRS,
};
