"use strict";

module.exports = {
  coverage: "Coverage/test reminder: even when coverage is clean, inspect source coverage, duplicate sources, extraction warnings, semantic-review candidates, and top constructions before accepting behavior.",
  normalization: "Normalization reminder: even when normalization has no warnings, inspect raw_source, parser_shadow_source, normalization_trace, and review_suggestions to ensure learner-visible text was not silently replaced.",
  normalization_audit: "Normalization-audit reminder: even when the normalization audit passes, inspect raw source, parser shadow, trace counts, review-suggestion counts, unsafe-normalization counts, and raw-display preservation before accepting input behavior.",
  jyutping: "Jyutping reminder: even when pronunciation data passes, inspect token surfaces, syllable counts, and dictionary expectations for readings that may still be contextually wrong.",
  registry: "Registry reminder: even when registry labels pass, inspect learner roles, slot names, construction labels, and parser-decision trace labels for doctrinal fit.",
  learner_display: "Learner-display reminder: even when learner display passes, inspect role/slot visibility to ensure internal grammar metadata did not leak and learner-facing labels still fit the sentence.",
  learner_ui_hover: "Hover-gloss reminder: even when hover audit passes, inspect hover titles and glosses for generic wording, misleading translations, or raw/internal metadata leaks.",
  wrapper_coverage: "Wrapper-coverage reminder: even when wrapper coverage passes, inspect wrapper children, linkers, separators, and assigned-slot coverage for hidden holes or over-broad grouping.",
  label_transition: "Label-transition reminder: even when label transition passes, inspect trace kinds, template families, and construction names for broad-real-grammar fit and regression risk.",
  runtime_construction_registry: "Runtime-registry reminder: PASS means emitted construction labels are registered; it does not establish linguistic validity or promotion eligibility.",
};
