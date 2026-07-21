#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const auditPath = path.join(root, "test-data", "grammar-legitimacy-audit.json");
const sourcePath = path.join(root, "test-data", "grammar-legitimacy-source-register.tsv");
const outputPath = path.join(root, "validation", "grammar-legitimacy-audit-v0.5.183-cp024-p1-demo01-r1.json");
const audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));

function loadRuntime() {
  class Plugin {} class PluginSettingTab {} class Setting {} class Notice {}
  const moduleRecord = { exports: {} };
  const context = {
    module: moduleRecord,
    exports: moduleRecord.exports,
    require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id),
    console, setTimeout, clearTimeout, Buffer,
  };
  const mainPath = path.join(root, "main.js");
  vm.runInNewContext(fs.readFileSync(mainPath, "utf8") + `
module.exports.__legitimacyAuditApi = {
  runtimeVersion: CANTO_SPAN_RUNTIME_VERSION,
  freeze: GRAMMAR_LEGITIMACY_FREEZE,
  policyVersion: GRAMMAR_LEGITIMACY_POLICY_VERSION,
  registry: Array.from(CONSTRUCTION_LABEL_REGISTRY),
  legitimacyRegistry: GRAMMAR_LEGITIMACY_BY_CONSTRUCTION,
  grammarLegitimacyFor,
};`, context, { filename: mainPath });
  return moduleRecord.exports.__legitimacyAuditApi;
}

const api = loadRuntime();
const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail ? { detail } : {}) });
  if (!pass) failures.push({ name, detail });
}

const patterns = Array.isArray(audit.patterns) ? audit.patterns : [];
const byPattern = new Map(patterns.map((row) => [row.pattern, row]));
const runtimeLabels = [...api.registry].sort();
const auditLabels = patterns.map((row) => row.pattern).sort();
const embeddedLabels = Object.keys(api.legitimacyRegistry || {}).sort();
const allowedStatuses = new Set([
  "supported_productive",
  "supported_lexicalized",
  "provisional",
  "research_pending",
  "parser_heuristic",
  "lexicalized_only",
  "unsupported_generalization",
]);
const allowedClaimTypes = new Set([
  "cantonese_language_claim",
  "lexicalized_language_claim",
  "parser_representation_decision",
  "parser_heuristic",
]);
const requiredFields = [
  "pattern", "lane", "primary_claim_type", "status", "confidence", "action",
  "natural_attestation_status", "pattern_specific_external_source_count",
  "native_validation_scope", "negative_boundary_evidence", "held_out_performance",
  "alternative_analyses", "language_claim", "parser_representation_decision",
  "parser_heuristic", "audit_trigger", "audit_note",
  "native_naturalness_source_count", "native_naturalness_judgment_count",
  "native_naturalness_acceptable_count", "native_naturalness_rejected_count",
  "native_naturalness_conflict_sentence_ids", "native_analysis_validation_count",
  "native_naturalness_scope", "native_conflict_disposition",
];

check("runtime is CP024 candidate v0.5.183", api.runtimeVersion === "0.5.183", `runtime=${api.runtimeVersion}`);
check("legacy automatic grammar-acceptance guard remains active pending authority-origin candidate work", api.freeze === true);
check("policy version is 0.5.183", api.policyVersion === "0.5.183", `policy=${api.policyVersion}`);
check("audit schema is recognized", audit.schema === "canto-span-grammar-legitimacy-audit-v1", audit.schema || "missing");
check("audit declares freeze", audit.freeze_new_grammar_acceptance === true);
check("source register exists", fs.existsSync(sourcePath));
check("CP024 candidate registry contains 181 labels", runtimeLabels.length === 181, `runtime labels=${runtimeLabels.length}`);
check("CP024 audit has exactly 181 active rows", patterns.length === 181, `audit rows=${patterns.length}`);
check("audit rows are unique", byPattern.size === patterns.length, `unique=${byPattern.size}`);
check("audit exactly covers runtime registry", JSON.stringify(auditLabels) === JSON.stringify(runtimeLabels));
check("embedded runtime map exactly covers registry", JSON.stringify(embeddedLabels) === JSON.stringify(runtimeLabels));

for (const row of patterns) {
  const missing = requiredFields.filter((field) => row[field] === undefined || row[field] === null || row[field] === "");
  check(`required fields: ${row.pattern}`, missing.length === 0, missing.join(","));
  check(`known status: ${row.pattern}`, allowedStatuses.has(row.status), row.status);
  check(`known claim type: ${row.pattern}`, allowedClaimTypes.has(row.primary_claim_type), row.primary_claim_type);
  check(`fixture count is nonnegative: ${row.pattern}`, Number.isInteger(row.accepted_fixture_count) && row.accepted_fixture_count >= 0, String(row.accepted_fixture_count));
  check(`external-source count is nonnegative: ${row.pattern}`, Number.isInteger(row.pattern_specific_external_source_count) && row.pattern_specific_external_source_count >= 0, String(row.pattern_specific_external_source_count));
  check(`runtime and file status align: ${row.pattern}`, api.grammarLegitimacyFor(row.pattern).status === row.status, `${api.grammarLegitimacyFor(row.pattern).status} vs ${row.status}`);
}

const productive = patterns.filter((row) => row.status === "supported_productive");
const invalidProductive = productive.filter((row) => {
  const min = audit.policy && audit.policy.productive_acceptance_minimum || {};
  return (row.independent_natural_example_count || 0) < (min.independent_natural_examples || 3)
    || (row.pattern_specific_external_source_count || 0) < (min.independent_sources_or_speakers || 2)
    || row.negative_boundary_evidence === "none_recorded"
    || row.held_out_performance === "NOT_ESTABLISHED"
    || row.alternative_analyses === "NOT_RECORDED";
});
check("no productive status bypasses minimum evidence", invalidProductive.length === 0, invalidProductive.map((row) => row.pattern).join(","));
check("exactly two narrow productive patterns are accepted", productive.length === 2 && productive.map((row) => row.pattern).sort().join(",") === "PostverbalZoPerfectiveVP,ResourceUseLaiFunctionRelation" && audit.summary.fully_supported_productive_patterns === 2, `productive=${productive.map((row) => row.pattern).join(",")}`);
check("v0.5.182 target accepted after render and heldout", byPattern.get("ResourceUseLaiFunctionRelation") && byPattern.get("ResourceUseLaiFunctionRelation").status === "supported_productive" && byPattern.get("ResourceUseLaiFunctionRelation").held_out_performance === "PROSPECTIVE_8_OF_8_PASS_CONSUMED");
check("DEMO01 remains provisional with sealed heldout unopened", byPattern.get("OvertHeadDemonstrativeClassifierNP") && byPattern.get("OvertHeadDemonstrativeClassifierNP").status === "provisional" && byPattern.get("OvertHeadDemonstrativeClassifierNP").held_out_performance === "SEALED_EXTERNAL_PACKET_VERIFIED_UNOPENED" && byPattern.get("OvertHeadDemonstrativeClassifierNP").productive_acceptance_eligible === false);
check("headless subtype remains separate and nonproductive", byPattern.get("HeadlessDemonstrativeClassifierNP") && byPattern.get("HeadlessDemonstrativeClassifierNP").status === "research_pending" && byPattern.get("HeadlessDemonstrativeClassifierNP").productive_acceptance_eligible === false);
check("existing fixture success is not counted as independent provenance", patterns.every((row) => row.natural_attestation_status !== "validated_from_parser_fixture"));
check("held-out evidence promotes only explicitly accepted subtypes", patterns.filter((row) => row.status.startsWith("supported_")).every((row) => (row.pattern === "PostverbalZoPerfectiveVP" && row.held_out_performance === "PROSPECTIVE_7_OF_7_PASS_CONSUMED") || (row.pattern === "ResourceUseLaiFunctionRelation" && row.held_out_performance === "PROSPECTIVE_8_OF_8_PASS_CONSUMED")));
check("ten authority-linked patterns carry pattern-specific evidence", patterns.filter((row) => row.pattern_specific_external_source_count > 0).map((row) => row.pattern).sort().join(",") === "CompletionVP,HeadlessDemonstrativeClassifierNP,IntendedFunctionRelation,LexicalGiveRelation,OvertHeadDemonstrativeClassifierNP,PassivePermissiveRelation,PerfectiveVP,PostThemeParticipantRelation,PostverbalZoPerfectiveVP,ResourceUseLaiFunctionRelation");
check("corpus hits alone do not promote any other pattern", patterns.filter((row) => row.external_corpus_candidate_hit_count > 0 && !["PostverbalZoPerfectiveVP","ResourceUseLaiFunctionRelation"].includes(row.pattern)).every((row) => !row.status.startsWith("supported_")));

check("native naturalness candidate mapping covers 89 labels", patterns.filter((row) => row.native_naturalness_judgment_count > 0).length === 89);
check("CP021B authority-origin relations remain provisional and nonproductive", ["LexicalGiveRelation", "PostThemeParticipantRelation"].every((label) => byPattern.get(label) && byPattern.get(label).status === "provisional" && byPattern.get(label).held_out_performance === "NOT_ESTABLISHED"));
check("native analysis validation remains zero", patterns.every((row) => row.native_analysis_validation_count === 0));
check("native naturalness alone does not promote any other pattern", patterns.filter((row) => row.native_naturalness_acceptable_count > 0 && !["PostverbalZoPerfectiveVP","ResourceUseLaiFunctionRelation"].includes(row.pattern)).every((row) => !row.status.startsWith("supported_")));
check("native-rejected mappings remain review-bearing", patterns.filter((row) => row.native_naturalness_rejected_count > 0).every((row) => row.native_conflict_disposition !== "none"));
check("audit summary records four accepted-positive conflict units", audit.summary.native_accepted_positive_fixture_conflict_units === 4);

const statusCounts = {};
const claimTypeCounts = {};
for (const row of patterns) {
  statusCounts[row.status] = (statusCounts[row.status] || 0) + 1;
  claimTypeCounts[row.primary_claim_type] = (claimTypeCounts[row.primary_claim_type] || 0) + 1;
}
check("status summary matches rows", JSON.stringify(statusCounts) === JSON.stringify(audit.summary.status_counts), JSON.stringify(statusCounts));
check("claim-type summary matches rows", JSON.stringify(claimTypeCounts) === JSON.stringify(audit.summary.claim_type_counts), JSON.stringify(claimTypeCounts));

const output = {
  schema: "canto-span-grammar-legitimacy-audit-result-v1",
  runtime_version: api.runtimeVersion,
  policy_version: api.policyVersion,
  freeze_new_grammar_acceptance: api.freeze,
  total_patterns: patterns.length,
  status_counts: statusCounts,
  claim_type_counts: claimTypeCounts,
  fully_supported_productive_patterns: productive.length,
  patterns_with_pattern_specific_external_sources: patterns.filter((row) => row.pattern_specific_external_source_count > 0).length,
  patterns_with_external_corpus_candidate_hits: patterns.filter((row) => row.external_corpus_candidate_hit_count > 0).length,
  total: checks.length,
  passed: checks.length - failures.length,
  failed: failures.length,
  strict_ready: failures.length === 0,
  checks,
  failures,
};
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify(output, null, 2));
if (failures.length) process.exit(1);
