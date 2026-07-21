"use strict";

const ALLOWED_STATUSES = new Set([
  "supported_productive",
  "provisional",
  "provisional_reaudit",
  "research_pending",
  "unsupported_generalization",
  "parser_heuristic",
  "lexicalized_only",
]);

const INSTRUMENT_STATUSES = new Set([
  "not_started",
  "legacy_limited",
  "pilot_limited",
  "pilot_clean",
  "locked_clean",
  "closed_clean",
]);
const COVERAGE_STATES = new Set(["none", "partial", "complete"]);
const SCREEN_STATES = new Set(["not_started", "partial", "complete"]);
const ADJUDICATION_STATES = new Set([
  "not_started",
  "partial",
  "complete",
  "complete_historical_only",
  "complete_for_23_response_snapshot",
]);
const PROVISIONAL_ALLOWED_INSTRUMENTS = new Set(["pilot_clean", "locked_clean", "closed_clean"]);
const SUPPORTED_ALLOWED_INSTRUMENTS = new Set(["locked_clean", "closed_clean"]);
const PROVISIONAL_MINIMUM_ITEM_N = 10;
const SUPPORTED_MINIMUM_ITEM_N = 30;

const REQUIRED_FIELDS = [
  "source_count",
  "verified_source_count",
  "panel_response_count_total",
  "eligible_panel_response_count",
  "minimum_usable_judgments_per_critical_item",
  "critical_contrast_coverage",
  "survey_instrument_version",
  "survey_instrument_status",
  "survey_instrument_quality_resolved",
  "quality_screen_status",
  "panel_adjudication_status",
  "recruitment_channels",
  "respondent_role_neutral",
  "native_positive_contrasts_reviewed",
  "native_negative_contrasts_reviewed",
  "panel_evidence_model_version",
  "panel_review_state_file",
  "panel_policy_file",
  "negative_cases_drafted",
  "negative_tests_executable",
  "negative_tests_passing",
  "negative_boundary_inventory_complete",
  "corpus_evidence_used",
  "corpus_hits_reviewed",
  "corpus_candidate_hit_count",
  "corpus_genuine_hit_count",
  "corpus_false_positive_count",
  "corpus_ambiguous_hit_count",
  "corpus_unusable_hit_count",
  "code_document_reconciled",
  "code_document_review_date",
  "code_document_review_commit",
  "code_document_code_locations",
  "current_standard_reaudit_complete",
  "implementation_validation_separate",
  "independent_evidence_beyond_internal_tests",
  "promotion_gate_version",
];

function asBoolean(value) { return value === true; }
function isVerifiedSourceState(value) {
  return value === "PASS" || value === "CURRENT_PAGE_REOPENED" || value === "FULL_TEXT_REOPENED" ||
    String(value).startsWith("VERIFIED_") || String(value).startsWith("MANUALLY_REVIEWED_");
}
function countSourceRecords(note) { return [...String(note.text || "").matchAll(/^###\s+SRC-[^\n]+$/gm)].length; }
function countVerifiedSourceRecords(note) {
  return [...String(note.text || "").matchAll(/- Verification: `([^`]+)`/g)]
    .map((match) => match[1]).filter(isVerifiedSourceState).length;
}
function corpusClassificationTotal(fm) {
  return ["corpus_genuine_hit_count", "corpus_false_positive_count", "corpus_ambiguous_hit_count", "corpus_unusable_hit_count"]
    .reduce((sum, field) => sum + Number(fm[field]), 0);
}
function hasPlainLanguageClaim(note) { return /## Plain-language claim\n\n\S/.test(note.body || note.text || ""); }
function hasCurrentCodeReviewMetadata(fm) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(fm.code_document_review_date || "")) &&
    /^[0-9a-f]{7,40}$/.test(String(fm.code_document_review_commit || "")) &&
    Array.isArray(fm.code_document_code_locations) && fm.code_document_code_locations.length > 0 &&
    fm.code_document_code_locations.every((value) => typeof value === "string" && value.trim());
}
function cleanPanelRequirements(fm) {
  return {
    role_neutral_panel: asBoolean(fm.respondent_role_neutral),
    instrument_quality_resolved: asBoolean(fm.survey_instrument_quality_resolved),
    quality_screen_complete: fm.quality_screen_status === "complete",
    panel_adjudication_complete: fm.panel_adjudication_status === "complete",
    critical_contrast_coverage_complete: fm.critical_contrast_coverage === "complete",
    positive_and_negative_contrasts_reviewed:
      asBoolean(fm.native_positive_contrasts_reviewed) && asBoolean(fm.native_negative_contrasts_reviewed),
  };
}

function evaluatePromotion(note) {
  const fm = note.frontmatter || note;
  const label = fm.construction || fm.title || "<unknown>";
  const status = fm.status;
  const blockers = [];

  if (!ALLOWED_STATUSES.has(status)) blockers.push(`unknown_status:${String(status)}`);
  for (const field of REQUIRED_FIELDS) if (!Object.prototype.hasOwnProperty.call(fm, field)) blockers.push(`missing_field:${field}`);

  const numericFields = [
    "source_count", "verified_source_count", "panel_response_count_total", "eligible_panel_response_count",
    "minimum_usable_judgments_per_critical_item", "corpus_candidate_hit_count", "corpus_genuine_hit_count",
    "corpus_false_positive_count", "corpus_ambiguous_hit_count", "corpus_unusable_hit_count",
  ];
  for (const field of numericFields) {
    if (!Number.isFinite(Number(fm[field])) || Number(fm[field]) < 0) blockers.push(`invalid_nonnegative_number:${field}`);
  }

  if (!COVERAGE_STATES.has(fm.critical_contrast_coverage)) blockers.push(`invalid_critical_contrast_coverage:${String(fm.critical_contrast_coverage)}`);
  if (!INSTRUMENT_STATUSES.has(fm.survey_instrument_status)) blockers.push(`invalid_survey_instrument_status:${String(fm.survey_instrument_status)}`);
  if (!SCREEN_STATES.has(fm.quality_screen_status)) blockers.push(`invalid_quality_screen_status:${String(fm.quality_screen_status)}`);
  if (!ADJUDICATION_STATES.has(fm.panel_adjudication_status)) blockers.push(`invalid_panel_adjudication_status:${String(fm.panel_adjudication_status)}`);
  if (!Array.isArray(fm.recruitment_channels)) blockers.push("recruitment_channels_not_array");
  if (Number(fm.eligible_panel_response_count) > Number(fm.panel_response_count_total)) blockers.push("eligible_panel_responses_exceed_total");
  if (Number(fm.minimum_usable_judgments_per_critical_item) > Number(fm.eligible_panel_response_count)) blockers.push("minimum_item_n_exceeds_eligible_panel_responses");
  if (asBoolean(fm.survey_instrument_quality_resolved) && ["not_started", "legacy_limited", "pilot_limited"].includes(fm.survey_instrument_status)) {
    blockers.push("limited_instrument_marked_quality_resolved");
  }
  if (fm.panel_evidence_model_version !== "v2") blockers.push(`unsupported_panel_evidence_model_version:${String(fm.panel_evidence_model_version)}`);

  if (asBoolean(fm.negative_tests_passing) && !asBoolean(fm.negative_tests_executable)) blockers.push("passing_boundaries_without_executable_boundaries");
  if (asBoolean(fm.negative_tests_executable) && !asBoolean(fm.negative_cases_drafted)) blockers.push("executable_boundaries_without_drafted_boundaries");
  if (asBoolean(fm.negative_boundary_inventory_complete) && !asBoolean(fm.negative_tests_executable)) blockers.push("complete_boundary_inventory_without_executable_tests");

  const classifiedHits = corpusClassificationTotal(fm);
  if (asBoolean(fm.corpus_hits_reviewed) && classifiedHits !== Number(fm.corpus_candidate_hit_count)) {
    blockers.push(`corpus_classification_count_mismatch:${classifiedHits}!=${fm.corpus_candidate_hit_count}`);
  }
  if (asBoolean(fm.corpus_evidence_used) && Number(fm.corpus_candidate_hit_count) < 1) blockers.push("corpus_evidence_used_without_candidate_hits");

  const common = {
    plain_language_claim: hasPlainLanguageClaim(note),
    independent_evidence_beyond_internal_tests: asBoolean(fm.independent_evidence_beyond_internal_tests),
  };
  const panel = cleanPanelRequirements(fm);
  const provisionalRequirements = {
    ...common,
    verified_source: Number(fm.verified_source_count) >= 1,
    clean_panel_instrument: PROVISIONAL_ALLOWED_INSTRUMENTS.has(fm.survey_instrument_status),
    minimum_ten_usable_judgments_per_critical_item:
      Number(fm.minimum_usable_judgments_per_critical_item) >= PROVISIONAL_MINIMUM_ITEM_N,
    ...panel,
    negative_cases_drafted: asBoolean(fm.negative_cases_drafted),
  };
  const supportedRequirements = {
    ...common,
    at_least_one_source: Number(fm.source_count) >= 1,
    every_cited_source_verified: Number(fm.verified_source_count) === Number(fm.source_count),
    locked_clean_panel_instrument: SUPPORTED_ALLOWED_INSTRUMENTS.has(fm.survey_instrument_status),
    minimum_thirty_usable_judgments_per_critical_item:
      Number(fm.minimum_usable_judgments_per_critical_item) >= SUPPORTED_MINIMUM_ITEM_N,
    ...panel,
    negative_cases_drafted: asBoolean(fm.negative_cases_drafted),
    negative_boundary_inventory_complete: asBoolean(fm.negative_boundary_inventory_complete),
    negative_tests_executable: asBoolean(fm.negative_tests_executable),
    negative_tests_passing: asBoolean(fm.negative_tests_passing),
    corpus_hits_individually_classified_if_used:
      !asBoolean(fm.corpus_evidence_used) ||
      (asBoolean(fm.corpus_hits_reviewed) && Number(fm.corpus_candidate_hit_count) >= 1 && classifiedHits === Number(fm.corpus_candidate_hit_count)),
    code_document_reconciled: asBoolean(fm.code_document_reconciled),
    current_code_review_metadata: hasCurrentCodeReviewMetadata(fm),
    implementation_validation_separate: asBoolean(fm.implementation_validation_separate),
    current_standard_reaudit_complete: asBoolean(fm.current_standard_reaudit_complete),
  };

  let required = {};
  let gateClass = "quarantined";
  if (status === "supported_productive") { gateClass = "supported_productive"; required = supportedRequirements; }
  else if (status === "provisional") { gateClass = "provisional"; required = provisionalRequirements; }
  for (const [name, pass] of Object.entries(required)) if (!pass) blockers.push(`requirement_failed:${name}`);

  const eligible = blockers.length === 0 && (status === "supported_productive" || status === "provisional");
  return { construction: label, status, gate_class: gateClass, eligible, blockers, requirements: required };
}

module.exports = {
  ALLOWED_STATUSES,
  INSTRUMENT_STATUSES,
  REQUIRED_FIELDS,
  PROVISIONAL_MINIMUM_ITEM_N,
  SUPPORTED_MINIMUM_ITEM_N,
  evaluatePromotion,
  countSourceRecords,
  countVerifiedSourceRecords,
  isVerifiedSourceState,
  corpusClassificationTotal,
  hasCurrentCodeReviewMetadata,
};
