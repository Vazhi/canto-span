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

const REQUIRED_FIELDS = [
  "source_count",
  "verified_source_count",
  "independent_speaker_count",
  "same_contrast_independent_speaker_count",
  "native_positive_contrasts_reviewed",
  "native_negative_contrasts_reviewed",
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

function asBoolean(value) {
  return value === true;
}

function isVerifiedSourceState(value) {
  return value === "PASS" ||
    value === "CURRENT_PAGE_REOPENED" ||
    value === "FULL_TEXT_REOPENED" ||
    value.startsWith("VERIFIED_") ||
    value.startsWith("MANUALLY_REVIEWED_");
}

function countSourceRecords(note) {
  return [...String(note.text || "").matchAll(/^###\s+SRC-[^\n]+$/gm)].length;
}

function countVerifiedSourceRecords(note) {
  return [...String(note.text || "").matchAll(/- Verification: `([^`]+)`/g)]
    .map((match) => match[1])
    .filter(isVerifiedSourceState)
    .length;
}

function promotionEligibleSpeakerCount(fm) {
  if (Object.prototype.hasOwnProperty.call(fm, "promotion_eligible_independent_speaker_count")) {
    return Number(fm.promotion_eligible_independent_speaker_count);
  }
  return Number(fm.independent_speaker_count);
}

function sameContrastSpeakerCount(fm) {
  return Number(fm.same_contrast_independent_speaker_count);
}

function corpusClassificationTotal(fm) {
  return [
    "corpus_genuine_hit_count",
    "corpus_false_positive_count",
    "corpus_ambiguous_hit_count",
    "corpus_unusable_hit_count",
  ].reduce((sum, field) => sum + Number(fm[field]), 0);
}

function hasPlainLanguageClaim(note) {
  return /## Plain-language claim\n\n\S/.test(note.body || note.text || "");
}

function hasCurrentCodeReviewMetadata(fm) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(fm.code_document_review_date || "")) &&
    /^[0-9a-f]{7,40}$/.test(String(fm.code_document_review_commit || "")) &&
    Array.isArray(fm.code_document_code_locations) &&
    fm.code_document_code_locations.length > 0 &&
    fm.code_document_code_locations.every((value) => typeof value === "string" && value.trim());
}

function evaluatePromotion(note) {
  const fm = note.frontmatter || note;
  const label = fm.construction || fm.title || "<unknown>";
  const status = fm.status;
  const blockers = [];

  if (!ALLOWED_STATUSES.has(status)) blockers.push(`unknown_status:${String(status)}`);
  for (const field of REQUIRED_FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(fm, field)) blockers.push(`missing_field:${field}`);
  }

  const numericFields = [
    "source_count",
    "verified_source_count",
    "independent_speaker_count",
    "same_contrast_independent_speaker_count",
    "corpus_candidate_hit_count",
    "corpus_genuine_hit_count",
    "corpus_false_positive_count",
    "corpus_ambiguous_hit_count",
    "corpus_unusable_hit_count",
  ];
  for (const field of numericFields) {
    if (!Number.isFinite(Number(fm[field])) || Number(fm[field]) < 0) blockers.push(`invalid_nonnegative_number:${field}`);
  }

  const eligibleSpeakerCount = promotionEligibleSpeakerCount(fm);
  const contrastSpeakerCount = sameContrastSpeakerCount(fm);
  if (eligibleSpeakerCount < 0) blockers.push("negative_promotion_eligible_independent_speaker_count");
  if (eligibleSpeakerCount > Number(fm.independent_speaker_count)) blockers.push("promotion_eligible_speakers_exceed_counted_speakers");
  if (contrastSpeakerCount > eligibleSpeakerCount) blockers.push("same_contrast_speakers_exceed_promotion_eligible_speakers");
  if (contrastSpeakerCount > 0 && (!asBoolean(fm.native_positive_contrasts_reviewed) || !asBoolean(fm.native_negative_contrasts_reviewed))) {
    blockers.push("same_contrast_speakers_without_positive_and_negative_review");
  }

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

  const provisionalRequirements = {
    ...common,
    verified_source: Number(fm.verified_source_count) >= 1,
    one_speaker_same_positive_negative_contrasts:
      contrastSpeakerCount >= 1 &&
      asBoolean(fm.native_positive_contrasts_reviewed) &&
      asBoolean(fm.native_negative_contrasts_reviewed),
    negative_cases_drafted: asBoolean(fm.negative_cases_drafted),
  };

  const supportedRequirements = {
    ...common,
    at_least_one_source: Number(fm.source_count) >= 1,
    every_cited_source_verified: Number(fm.verified_source_count) === Number(fm.source_count),
    two_speakers_same_positive_negative_contrasts:
      contrastSpeakerCount >= 2 &&
      asBoolean(fm.native_positive_contrasts_reviewed) &&
      asBoolean(fm.native_negative_contrasts_reviewed),
    negative_cases_drafted: asBoolean(fm.negative_cases_drafted),
    negative_boundary_inventory_complete: asBoolean(fm.negative_boundary_inventory_complete),
    negative_tests_executable: asBoolean(fm.negative_tests_executable),
    negative_tests_passing: asBoolean(fm.negative_tests_passing),
    corpus_hits_individually_classified_if_used:
      !asBoolean(fm.corpus_evidence_used) ||
      (asBoolean(fm.corpus_hits_reviewed) &&
       Number(fm.corpus_candidate_hit_count) >= 1 &&
       classifiedHits === Number(fm.corpus_candidate_hit_count)),
    code_document_reconciled: asBoolean(fm.code_document_reconciled),
    current_code_review_metadata: hasCurrentCodeReviewMetadata(fm),
    implementation_validation_separate: asBoolean(fm.implementation_validation_separate),
    current_standard_reaudit_complete: asBoolean(fm.current_standard_reaudit_complete),
  };

  let required = {};
  let gateClass = "quarantined";
  if (status === "supported_productive") {
    gateClass = "supported_productive";
    required = supportedRequirements;
  } else if (status === "provisional") {
    gateClass = "provisional";
    required = provisionalRequirements;
  }

  for (const [name, pass] of Object.entries(required)) {
    if (!pass) blockers.push(`requirement_failed:${name}`);
  }

  const eligible = blockers.length === 0 && (status === "supported_productive" || status === "provisional");
  return { construction: label, status, gate_class: gateClass, eligible, blockers, requirements: required };
}

module.exports = {
  ALLOWED_STATUSES,
  REQUIRED_FIELDS,
  evaluatePromotion,
  countSourceRecords,
  countVerifiedSourceRecords,
  isVerifiedSourceState,
  promotionEligibleSpeakerCount,
  sameContrastSpeakerCount,
  corpusClassificationTotal,
  hasCurrentCodeReviewMetadata,
};
