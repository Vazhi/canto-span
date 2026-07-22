#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "test-data");
const validationDir = path.join(root, "validation");
const audit = JSON.parse(fs.readFileSync(path.join(dataDir, "grammar-legitimacy-audit.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const constructionNotes = loadConstructionNotes(root);
const notesByLabel = new Map(constructionNotes.map((note) => [note.frontmatter.construction, note]));

function parseTsv(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").trimEnd().split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.filter(Boolean).map((line, rowIndex) => {
    const values = line.split("\t");
    if (values.length !== headers.length) {
      throw new Error(`${path.basename(filePath)} row ${rowIndex + 2}: expected ${headers.length} columns, got ${values.length}`);
    }
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });
}

function tsvCell(value) {
  return String(value ?? "").replace(/[\t\r\n]+/g, " ").trim();
}

const sourceRegister = parseTsv(path.join(dataDir, "grammar-legitimacy-source-register.tsv"));
const locators = parseTsv(path.join(dataDir, "grammar-source-locators-CP021A.tsv"));
const edges = parseTsv(path.join(dataDir, "grammar-claim-source-edges-CP021A.tsv"));
const authorityOrigins = parseTsv(path.join(dataDir, "grammar-authority-origin-CP021B.tsv"));
const authorityByLabel = new Map(authorityOrigins.map((row) => [row.runtime_label, row]));
const sourceIds = new Set(sourceRegister.map((row) => row.source_id));
const locatorBySource = new Map(locators.map((row) => [row.source_id, row]));
const patternsByLabel = new Map(audit.patterns.map((row) => [row.pattern, row]));
const edgesByLabel = new Map();

for (const edge of edges) {
  const bucket = edgesByLabel.get(edge.runtime_label) || [];
  bucket.push(edge);
  edgesByLabel.set(edge.runtime_label, bucket);
}

function claimLayer(row) {
  if (row.primary_claim_type === "parser_representation_decision") return "representation";
  if (row.primary_claim_type === "parser_heuristic") return "heuristic";
  return "language";
}

const inventory = constructionNotes.map((note) => {
  const row = patternsByLabel.get(note.frontmatter.construction);
  if (!row) throw new Error(`Missing historical claim metadata for ${note.frontmatter.construction}`);
  const currentStatus = note.frontmatter.status;
  const currentActionMatch = note.body.match(/- Current action: `([^`]+)`/);
  const currentAction = currentActionMatch ? currentActionMatch[1] : "not_recorded";
  const layer = claimLayer(row);
  const labelEdges = edgesByLabel.get(row.pattern) || [];
  const authority = authorityByLabel.get(row.pattern) || null;
  const edgeIds = authority
    ? authority.claim_source_edge_ids.split(";").filter(Boolean).sort()
    : labelEdges.map((edge) => edge.edge_id).sort();
  const externalSourceIds = authority
    ? authority.independent_evidence_units.split(";").filter(Boolean).sort()
    : [...new Set(labelEdges.map((edge) => edge.source_id))].sort();
  const languageClaim = layer === "language";
  const originStatus = languageClaim
    ? (authority ? "external_evidence_originated" : (labelEdges.length ? "legacy_source_linked_posthoc" : "legacy_origin_not_proven"))
    : (layer === "representation" ? "internal_representation_only" : "internal_heuristic_only");
  const sourceLinkStatus = languageClaim
    ? (authority ? "authority_origin_scoped_edges_recorded" : (labelEdges.length ? "scoped_edges_recorded" : "no_pattern_specific_external_edge"))
    : "external_language_source_not_applicable_to_internal_claim";
  const acceptedAuthorityClaim = languageClaim && authority && currentStatus === "supported_productive";
  const requiredDisposition = languageClaim
    ? (acceptedAuthorityClaim
      ? "retain_narrow_supported_productive_scope_and_reaudit_on_conflict"
      : authority && currentStatus === "provisional_reaudit"
      ? "complete_current_reaudit_or_narrow_reclassify_retire"
      : authority && currentStatus === "research_pending"
      ? "remain_research_pending_until_current_provisional_checklist_passes"
      : authority
      ? "retain_bounded_nonproductive_authority_origin_record"
      : labelEdges.length
      ? "retain_current_nonproductive_status_pending_source_reconstruction"
      : "downgrade_or_quarantine_pending_authority_origin_research")
    : "retain_only_as_internal_engineering_claim_with_internal_provenance";

  return {
    claim_id: `GCLAIM::${row.pattern}::${layer}`,
    runtime_label: row.pattern,
    lane: note.frontmatter.lane || row.lane,
    claim_layer: layer,
    primary_claim_type: row.primary_claim_type,
    current_status: currentStatus,
    current_action: currentAction,
    origin_status: originStatus,
    source_link_status: sourceLinkStatus,
    external_source_ids: externalSourceIds,
    claim_source_edge_ids: edgeIds,
    edge_count: edgeIds.length,
    required_disposition: requiredDisposition,
    grammar_promotion_eligible: acceptedAuthorityClaim,
    promotion_blocker: acceptedAuthorityClaim
      ? ""
      : languageClaim
      ? (authority && currentStatus === "provisional_reaudit"
        ? "full current Definition of Done remains incomplete"
        : authority && currentStatus === "research_pending"
        ? "current provisional checklist remains incomplete"
        : authority
        ? "authority-origin evidence remains bounded and has not passed every productive-acceptance gate"
        : labelEdges.length
        ? "legacy claim was not demonstrably derived from the recorded sources; reconstruct the claim from screened propositions first"
        : "no explicit external claim-source edge")
      : "internal engineering claim cannot by itself establish Cantonese grammar",
    next_research_form: acceptedAuthorityClaim
      ? `Monitor contradictory evidence, native conflict, regional or register variation, and boundary leakage for ${row.pattern}.`
      : languageClaim
      ? `Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ${row.pattern}?`
      : "record implementation provenance and keep separate from Cantonese-language evidence",
  };
});

const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail ? { detail } : {}) });
  if (!pass) failures.push({ name, detail });
}

const allowedRelationships = new Set(["supports", "restricts", "contradicts", "attests_only"]);
const inventoryLabels = inventory.map((row) => row.runtime_label).sort();
const auditLabels = audit.patterns.map((row) => row.pattern).sort();
const noteLabels = constructionNotes.map((note) => note.frontmatter.construction).sort();
check("current governance has exactly 171 active labels", audit.patterns.length === 171, String(audit.patterns.length));
check("current provenance inventory has exactly 171 active claims", inventory.length === 171, String(inventory.length));
check("provenance inventory labels are unique", new Set(inventoryLabels).size === inventory.length);
check("provenance inventory exactly covers construction notes", JSON.stringify(inventoryLabels) === JSON.stringify(noteLabels));
check("historical claim metadata covers construction notes", JSON.stringify(noteLabels) === JSON.stringify(auditLabels));
check("claim-source edge identifiers are unique", new Set(edges.map((row) => row.edge_id)).size === edges.length);
check("source-register identifiers are unique", sourceIds.size === sourceRegister.length);
check("source-locator identifiers are unique", locatorBySource.size === locators.length);
check("CP021B authority-origin labels are unique", authorityByLabel.size === authorityOrigins.length);

for (const edge of edges) {
  check(`edge label exists: ${edge.edge_id}`, patternsByLabel.has(edge.runtime_label), edge.runtime_label);
  check(`edge source exists: ${edge.edge_id}`, sourceIds.has(edge.source_id), edge.source_id);
  check(`edge source has locator: ${edge.edge_id}`, locatorBySource.has(edge.source_id), edge.source_id);
  check(`edge relationship is controlled: ${edge.edge_id}`, allowedRelationships.has(edge.relationship), edge.relationship);
  check(`edge claim id maps to label: ${edge.edge_id}`, edge.claim_id.startsWith(`GCLAIM::${edge.runtime_label}::`), edge.claim_id);
  check(`edge exact locator is recorded: ${edge.edge_id}`, Boolean(edge.exact_locator));
  check(`edge proposition is recorded: ${edge.edge_id}`, Boolean(edge.extracted_proposition));
  check(`edge verification state is recorded: ${edge.edge_id}`, Boolean(edge.verification_state));
  check(`edge limitations are recorded: ${edge.edge_id}`, Boolean(edge.limitations));
}

const languageClaims = inventory.filter((row) => row.claim_layer === "language");
const internalClaims = inventory.filter((row) => row.claim_layer !== "language");
const linkedLanguageClaims = languageClaims.filter((row) => row.edge_count > 0);
const unlinkedLanguageClaims = languageClaims.filter((row) => row.edge_count === 0);
const legacyLinkedLanguageClaims = linkedLanguageClaims.filter((row) => row.origin_status === "legacy_source_linked_posthoc");
const authorityOriginClaims = linkedLanguageClaims.filter((row) => row.origin_status === "external_evidence_originated");
check("four legacy language claims retain explicit posthoc source edges", legacyLinkedLanguageClaims.length === 4, legacyLinkedLanguageClaims.map((row) => row.runtime_label).join(","));
check("six authority-origin claim records are preserved", authorityOriginClaims.map((row) => row.runtime_label).sort().join(",") === "HeadlessDemonstrativeClassifierNP,LexicalGiveRelation,OvertHeadDemonstrativeClassifierNP,PostThemeParticipantRelation,PostverbalZoPerfectiveVP,ResourceUseLaiFunctionRelation", authorityOriginClaims.map((row) => row.runtime_label).join(","));
check("authority-origin records match legitimacy source counts", authorityOrigins.every((origin) => patternsByLabel.has(origin.runtime_label) && Number(origin.pattern_specific_external_source_count) === patternsByLabel.get(origin.runtime_label).pattern_specific_external_source_count));
check("authority-origin records preserve zero native structural validation", authorityOrigins.every((origin) => Number(origin.native_analysis_validation_count) === 0));
check("all source-less language claims are assigned downgrade or quarantine", unlinkedLanguageClaims.every((row) => row.required_disposition === "downgrade_or_quarantine_pending_authority_origin_research"));
check("internal claims are not disguised as externally sourced language claims", internalClaims.every((row) => row.source_link_status === "external_language_source_not_applicable_to_internal_claim"));
check("no current language claim is promotion eligible", inventory.filter((row) => row.grammar_promotion_eligible).length === 0, inventory.filter((row) => row.grammar_promotion_eligible).map((row) => row.runtime_label).join(","));

const originStatusCounts = {};
const claimLayerCounts = {};
for (const row of inventory) {
  originStatusCounts[row.origin_status] = (originStatusCounts[row.origin_status] || 0) + 1;
  claimLayerCounts[row.claim_layer] = (claimLayerCounts[row.claim_layer] || 0) + 1;
}

const result = {
  schema: "canto-span-claim-provenance-audit-result-v1",
  batch_id: "v0.5.185-RUNTIME-METADATA-REDUCTION",
  runtime_version: manifest.version,
  authoring_registry_owner: "grammar/<linguistic-status>/*.md",
  policy: {
    external_authority_required_for_cantonese_language_claims: true,
    internal_behavior_may_open_only_a_neutral_research_question: true,
    source_counts_without_claim_source_edges_are_insufficient: true,
    regression_results_are_not_language_evidence: true,
    authority_is_evidence_not_parser_specification: true,
    definition_of_done: "docs/current/DEFINITION-OF-DONE.md controls current linguistic status",
    status_axes_separated: true,
  },
  summary: {
    total_claims: inventory.length,
    language_or_lexical_claims: languageClaims.length,
    internal_representation_or_heuristic_claims: internalClaims.length,
    legacy_language_claims_with_scoped_edges: legacyLinkedLanguageClaims.length,
    legacy_language_claims_without_edges: unlinkedLanguageClaims.length,
    externally_originated_claims: authorityOriginClaims.length,
    explicit_claim_source_edges: edges.length + authorityOriginClaims.reduce((sum, row) => sum + row.edge_count, 0),
    unique_sources_used_by_edges: new Set([...edges.map((row) => row.source_id), ...authorityOriginClaims.flatMap((row) => row.external_source_ids)]).size,
    origin_status_counts: originStatusCounts,
    claim_layer_counts: claimLayerCounts,
    grammar_promotion_eligible: inventory.filter((row) => row.grammar_promotion_eligible).length,
    current_supported_productive: inventory.filter((row) => row.current_status === "supported_productive").length,
    provisional_reaudit: inventory.filter((row) => row.current_status === "provisional_reaudit").length,
    ordinary_provisional: inventory.filter((row) => row.current_status === "provisional").length,
    research_pending: inventory.filter((row) => row.current_status === "research_pending").length,
  },
  total_checks: checks.length,
  passed_checks: checks.length - failures.length,
  failed_checks: failures.length,
  strict_ready: failures.length === 0,
  checks,
  failures,
};

fs.mkdirSync(validationDir, { recursive: true });
const currentDir = path.join(validationDir, "v0.5.185");
fs.mkdirSync(currentDir, { recursive: true });
fs.writeFileSync(path.join(currentDir, "claim-provenance.json"), JSON.stringify(result, null, 2) + "\n");
fs.writeFileSync(path.join(validationDir, "claim-provenance-audit-current.json"), JSON.stringify(result, null, 2) + "\n");

console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
