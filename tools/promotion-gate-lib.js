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
  "verified_source_count",
  "independent_speaker_count",
  "negative_cases_drafted",
  "negative_tests_executable",
  "negative_tests_passing",
  "corpus_evidence_used",
  "corpus_hits_reviewed",
  "code_document_reconciled",
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

function hasPlainLanguageClaim(note) {
  return /## Plain-language claim\n\n\S/.test(note.body || note.text || "");
}

function evaluatePromotion(note) {
  const fm = note.frontmatter || note;
  const label = fm.construction || fm.title || "<unknown>";
  const status = fm.status;
  const blockers = [];

  if (!ALLOWED_STATUSES.has(status)) {
    blockers.push(`unknown_status:${String(status)}`);
  }

  for (const field of REQUIRED_FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(fm, field)) {
      blockers.push(`missing_field:${field}`);
    }
  }

  const internalConsistency = [];
  if (Number(fm.verified_source_count) < 0) internalConsistency.push("negative_verified_source_count");
  if (Number(fm.independent_speaker_count) < 0) internalConsistency.push("negative_independent_speaker_count");
  const eligibleSpeakerCount = promotionEligibleSpeakerCount(fm);
  if (eligibleSpeakerCount < 0) internalConsistency.push("negative_promotion_eligible_independent_speaker_count");
  if (eligibleSpeakerCount > Number(fm.independent_speaker_count)) internalConsistency.push("promotion_eligible_speakers_exceed_counted_speakers");
  if (asBoolean(fm.negative_tests_passing) && !asBoolean(fm.negative_tests_executable)) {
    internalConsistency.push("passing_boundaries_without_executable_boundaries");
  }
  if (asBoolean(fm.negative_tests_executable) && !asBoolean(fm.negative_cases_drafted)) {
    internalConsistency.push("executable_boundaries_without_drafted_boundaries");
  }
  blockers.push(...internalConsistency);

  const common = {
    verified_source: Number(fm.verified_source_count) >= 1,
    plain_language_claim: hasPlainLanguageClaim(note),
    implementation_validation_separate: asBoolean(fm.implementation_validation_separate),
  };

  const provisionalRequirements = {
    ...common,
    independent_speaker: eligibleSpeakerCount >= 1,
    negative_cases_drafted: asBoolean(fm.negative_cases_drafted),
    independent_evidence_beyond_internal_tests: asBoolean(fm.independent_evidence_beyond_internal_tests),
  };

  const supportedRequirements = {
    ...common,
    two_independent_speakers: eligibleSpeakerCount >= 2,
    negative_cases_drafted: asBoolean(fm.negative_cases_drafted),
    negative_tests_executable: asBoolean(fm.negative_tests_executable),
    negative_tests_passing: asBoolean(fm.negative_tests_passing),
    corpus_hits_reviewed_if_used: !asBoolean(fm.corpus_evidence_used) || asBoolean(fm.corpus_hits_reviewed),
    code_document_reconciled: asBoolean(fm.code_document_reconciled),
    independent_evidence_beyond_internal_tests: asBoolean(fm.independent_evidence_beyond_internal_tests),
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
  return {
    construction: label,
    status,
    gate_class: gateClass,
    eligible,
    blockers,
    requirements: required,
  };
}

module.exports = {
  ALLOWED_STATUSES,
  REQUIRED_FIELDS,
  evaluatePromotion,
  countVerifiedSourceRecords,
  isVerifiedSourceState,
  promotionEligibleSpeakerCount,
};
