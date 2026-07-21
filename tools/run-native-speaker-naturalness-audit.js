#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const evidencePath = path.join(root, "test-data", "native-speaker-naturalness-evidence-v1.json");
const conflictPath = path.join(root, "test-data", "native-naturalness-conflict-dispositions.tsv");
const legitimacyPath = path.join(root, "test-data", "grammar-legitimacy-audit.json");
const outputPath = path.join(root, "validation", "v0.5.184", "native-speaker-naturalness.json");

const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const legitimacy = JSON.parse(fs.readFileSync(legitimacyPath, "utf8"));
const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail ? { detail } : {}) });
  if (!pass) failures.push({ name, detail });
}

const judgments = Array.isArray(evidence.judgments) ? evidence.judgments : [];
const summary = evidence.summary || {};
const byId = new Map(judgments.map((row) => [row.sentence_id, row]));
const roles = (role) => judgments.filter((row) => row.evidence_role === role);
const accepted = judgments.filter((row) => row.naturalness_status === "accepted_unchecked");
const rejected = judgments.filter((row) => row.naturalness_status === "marked_unnatural");
const conflictRows = fs.readFileSync(conflictPath, "utf8").trim().split(/\r?\n/).slice(1);
const patterns = legitimacy.patterns || [];

check("evidence schema is recognized", evidence.schema === "canto-span-native-speaker-naturalness-evidence-v1", evidence.schema || "missing");
check("governance runtime is 0.5.165", evidence.governance_runtime_version === "0.5.165", evidence.governance_runtime_version || "missing");
check("evidence scope is naturalness only", evidence.evidence_scope === "sentence_naturalness_only_not_parser_analysis_validation", evidence.evidence_scope || "missing");
check("raw completed forms are not packaged", evidence.raw_forms_included_in_package === false);
check("all seven source records are complete", Array.isArray(evidence.source_forms) && evidence.source_forms.length === 7 && evidence.source_forms.every((row) => row.batch_completed === true));
check("all source records have SHA-256", evidence.source_forms.every((row) => /^[0-9a-f]{64}$/.test(row.sha256 || "")));
check("136 judgments ingested", judgments.length === 136 && summary.total_judgments === 136, `rows=${judgments.length}`);
check("128 acceptable and 8 rejected", accepted.length === 128 && rejected.length === 8 && summary.acceptable_judgments === 128 && summary.rejected_judgments === 8, `acceptable=${accepted.length};rejected=${rejected.length}`);
check("accepted-pattern screening is 124 acceptable / 4 rejected", roles("accepted_pattern_screening").length === 128 && summary.accepted_pattern_screening_acceptable === 124 && summary.accepted_pattern_screening_rejected === 4);
check("follow-up is 2 acceptable / 1 rejected", roles("follow_up").length === 3 && summary.follow_up_acceptable === 2 && summary.follow_up_rejected === 1);
check("all three controls were rejected", roles("control").length === 3 && roles("control").every((row) => row.naturalness_status === "marked_unnatural"));
check("both repeat items are consistent", roles("repeat").length === 2 && summary.repeat_pairs_consistent === 2 && evidence.repeat_consistency.every((row) => row.consistent === true));
check("no optional correction was silently invented", summary.corrections_provided === 0 && judgments.every((row) => row.correction_provided === false));
check("89 labels have candidate naturalness mappings", summary.labels_with_candidate_mapping === 89 && evidence.label_candidate_mapping_summary.length === 89);
check("85 labels have acceptable surfaces", summary.labels_with_acceptable_surface_judgments === 85);
check("nine labels have at least one rejected mapped surface", summary.labels_with_rejected_surface_judgments === 9);
check("native analysis validation remains zero", summary.native_analysis_validated_labels === 0 && patterns.every((row) => row.native_analysis_validation_count === 0));
check("four accepted screening units are quarantined", summary.accepted_positive_fixture_conflict_units === 4);
check("five conflict-disposition rows recorded including follow-up", conflictRows.length === 5, `rows=${conflictRows.length}`);

check("V完咗O conflict is replicated with overt subject", byId.get("CS160-P0-03")?.naturalness_status === "marked_unnatural" && byId.get("CS160-FU1-01")?.naturalness_status === "marked_unnatural");
check("basic completion controls remain acceptable", byId.get("CS160-FU1-02")?.naturalness_status === "accepted_unchecked" && byId.get("CS160-FU1-03")?.naturalness_status === "accepted_unchecked");
check("preverbal negated completion conflict is explicit", byId.get("CS160-N031")?.naturalness_status === "marked_unnatural" && byId.get("CS160-N030")?.naturalness_status === "accepted_unchecked");
check("approximate quantity fixture is quarantined", byId.get("CS160-N013")?.naturalness_status === "marked_unnatural" && byId.get("CS160-N013")?.native_conflict?.disposition === "quarantine_approximate_quantity_fixture_pending_corpus_and_analysis_validation");
check("adapted temporal sentence rejection is not over-attributed", byId.get("CS160-N005")?.native_conflict?.disposition === "quarantine_adapted_surface_and_do_not_attribute_rejection_to_internal_labels_without_analysis");

const promotedPatterns = patterns.filter((row) => row.status === "supported_productive" || row.status === "supported_lexicalized");
check(
  "native-conflicted patterns were not promoted",
  patterns.filter((row) => row.native_naturalness_rejected_count > 0).every((row) => row.status !== "supported_productive" && row.status !== "supported_lexicalized")
);
check(
  "productive promotion is not attributed to native screening alone",
  promotedPatterns.every((row) =>
    row.native_analysis_validation_count === 0 &&
    row.pattern_specific_external_source_count >= 2 &&
    /PASS/.test(row.held_out_performance || "")
  )
);
check(
  "acceptable surface judgments remain separate from analysis validation",
  patterns.filter((row) => row.native_naturalness_acceptable_count > 0).every((row) => Number(row.native_analysis_validation_count || 0) === 0)
);
check("rejected target-mapped surfaces remain review-bearing", patterns.filter((row) => row.native_naturalness_rejected_count > 0 && String(row.native_naturalness_conflict_sentence_ids || "").trim()).every((row) => row.native_conflict_disposition !== "none"));
check("ApproximateQuantity remains unsupported", patterns.find((row) => row.pattern === "ApproximateQuantity")?.status === "unsupported_generalization");
check("NegatedVP remains unsupported", patterns.find((row) => row.pattern === "NegatedVP")?.status === "unsupported_generalization");
check("CompletionVP remains research pending", patterns.find((row) => row.pattern === "CompletionVP")?.status === "research_pending");
check("PerfectiveVP remains research pending, not validated", patterns.find((row) => row.pattern === "PerfectiveVP")?.status === "research_pending");
check("source register includes the one-speaker limitation", fs.readFileSync(path.join(root, "test-data", "grammar-legitimacy-source-register.tsv"), "utf8").includes("SRC-NATIVE-NS01-2026-07-14"));

const output = {
  schema: "canto-span-native-speaker-naturalness-audit-result-v2",
  runtime_version: require(path.join(root, "manifest.json")).version,
  evidence_scope: evidence.evidence_scope,
  total_judgments: judgments.length,
  acceptable_judgments: accepted.length,
  rejected_judgments: rejected.length,
  accepted_pattern_screening: {
    total: roles("accepted_pattern_screening").length,
    acceptable: summary.accepted_pattern_screening_acceptable,
    rejected: summary.accepted_pattern_screening_rejected,
  },
  follow_up: {
    total: roles("follow_up").length,
    acceptable: summary.follow_up_acceptable,
    rejected: summary.follow_up_rejected,
  },
  controls: { total: roles("control").length, correctly_rejected: summary.controls_correctly_rejected },
  repeats: { total: roles("repeat").length, consistent: summary.repeat_pairs_consistent },
  labels_with_candidate_mapping: summary.labels_with_candidate_mapping,
  labels_with_native_analysis_validation: summary.native_analysis_validated_labels,
  conflict_unit_count: summary.accepted_positive_fixture_conflict_units,
  total: checks.length,
  passed: checks.length - failures.length,
  failed: failures.length,
  strict_ready: failures.length === 0,
  checks,
  failures,
};
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify(output, null, 2));
if (failures.length) process.exit(1);
