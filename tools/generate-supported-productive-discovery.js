#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { evaluatePromotion, hasCurrentCodeReviewMetadata } = require("./promotion-gate-lib");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const writeMode = process.argv.includes("--write");
const registryPath = path.join(root, "data", "construction-identities.json");
const readinessPath = path.join(root, "data", "construction-candidate-readiness.json");
const retiredPath = path.join(root, "docs", "research", "RETIRED-CONSTRUCTION-ARCHIVE-v0.5.186-R1.tsv");
const snapshotPath = path.join(root, "archive", "registry-pre-obsidian-v0.5.184", "full-construction-registry.json");
const candidateReportPath = path.join(root, "docs", "research", "SUPPORTED-PRODUCTIVE-CANDIDATES.md");
const orphanReportPath = path.join(root, "docs", "research", "ORPHANED-CONSTRUCTION-EVIDENCE.md");
const familyReportPath = path.join(root, "docs", "research", "CONSTRUCTION-FAMILY-GAPS.md");
const sweepReportPath = path.join(root, "docs", "research", "FULL-REPO-SUPPORTED-PRODUCTIVE-SWEEP-R1.md");

const STATE_RANK = {
  supported_productive: 10,
  promotion_review: 9,
  heldout_ready: 8,
  evidence_ready: 7,
  boundary_ready: 6,
  behavior_aligned: 5,
  source_supported: 4,
  narrowing_candidate: 4,
  research_candidate: 3,
  lexicalized_review: 2,
  identity_only: 2,
  retired_evidence_rehome_candidate: 2,
  retired_research_gap: 1,
  retired_review: 1,
  excluded_nonlanguage: 0,
};

const GATE_ORDER = [
  "language_claim_defined",
  "independent_source_support",
  "source_scope_matches_claim",
  "runtime_research_alignment",
  "executable_positive_cases_present",
  "negative_boundaries_complete",
  "reviewed_corpus_evidence",
  "role_neutral_panel_threshold",
  "held_out_validation",
  "ontology_conflicts_resolved",
];

const GATE_WEIGHTS = {
  language_claim_defined: 5,
  independent_source_support: 20,
  source_scope_matches_claim: 10,
  runtime_research_alignment: 15,
  executable_positive_cases_present: 5,
  negative_boundaries_complete: 15,
  reviewed_corpus_evidence: 10,
  role_neutral_panel_threshold: 10,
  held_out_validation: 5,
  ontology_conflicts_resolved: 5,
};

function parseTsv(file) {
  const text = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd();
  if (!text) return [];
  const lines = text.split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.filter(Boolean).map((line) => {
    const values = line.split("\t");
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
  });
}

function splitSourceIds(value) {
  return String(value || "").split(/[;,]/).map((item) => item.trim()).filter((item) => item && item !== "NONE");
}

function gate(status, evidence, detail = "") {
  return { status, evidence, ...(detail ? { detail } : {}) };
}

function gateFraction(status) {
  if (status === "pass") return 1;
  if (status === "partial") return 0.5;
  return 0;
}

function plainClaimPresent(note) {
  return /## Plain-language claim\n\n\S/.test(note.body || note.text || "");
}

function heldOutState(note) {
  const text = String(note.text || note.body || "");
  const explicit = text.match(/Held[- ]out(?: evaluation| status)?:?\s*\*\*?([^\n*]+)\*\*?/i);
  const value = explicit ? explicit[1].trim() : "";
  if (/\b(PASS|PASSED|COMPLETE_AND_PASSING|ESTABLISHED_PASS)\b/i.test(value)) {
    return gate("pass", "explicit_held_out_pass", value);
  }
  if (value && !/NOT_ESTABLISHED|not_started|unknown/i.test(value)) {
    return gate("partial", "held_out_state_recorded", value);
  }
  return gate("not_started", "no_passing_held_out_record");
}

function panelGate(fm) {
  const requirements = {
    clean_instrument: ["locked_clean", "closed_clean"].includes(fm.survey_instrument_status),
    minimum_item_n_30: Number(fm.minimum_usable_judgments_per_critical_item) >= 30,
    role_neutral: fm.respondent_role_neutral === true,
    instrument_quality_resolved: fm.survey_instrument_quality_resolved === true,
    quality_screen_complete: fm.quality_screen_status === "complete",
    adjudication_complete: fm.panel_adjudication_status === "complete",
    critical_contrasts_complete: fm.critical_contrast_coverage === "complete",
    positive_contrasts_reviewed: fm.native_positive_contrasts_reviewed === true,
    negative_contrasts_reviewed: fm.native_negative_contrasts_reviewed === true,
  };
  if (Object.values(requirements).every(Boolean)) return gate("pass", "supported_productive_panel_gate", JSON.stringify(requirements));
  if (Number(fm.panel_response_count_total) > 0) return gate("partial", "panel_evidence_incomplete", JSON.stringify(requirements));
  return gate("not_started", "no_eligible_panel_evidence", JSON.stringify(requirements));
}

function corpusGate(fm) {
  const classified = ["corpus_genuine_hit_count", "corpus_false_positive_count", "corpus_ambiguous_hit_count", "corpus_unusable_hit_count"]
    .reduce((sum, field) => sum + Number(fm[field] || 0), 0);
  const reviewed = fm.corpus_hits_reviewed === true;
  const used = fm.corpus_evidence_used === true;
  const candidateCount = Number(fm.corpus_candidate_hit_count || 0);
  const genuineCount = Number(fm.corpus_genuine_hit_count || 0);
  if (used && reviewed && candidateCount > 0 && classified === candidateCount && genuineCount > 0) {
    return gate("pass", "reviewed_genuine_corpus_hits", `${genuineCount}/${candidateCount} genuine`);
  }
  if (used || candidateCount > 0) {
    return gate("partial", "corpus_evidence_incomplete", `used=${used}; reviewed=${reviewed}; classified=${classified}/${candidateCount}; genuine=${genuineCount}`);
  }
  return gate("not_started", "no_reviewed_corpus_evidence");
}

function ontologyGate(identity) {
  const review = identity.label_review || {};
  const behaviorOkay = ["exact", "runtime_narrower_defensible"].includes(review.behavior_research_alignment);
  const terminologyOkay = ["aligned", "neutral_descriptive_preferred"].includes(review.terminology_alignment);
  const actionOkay = !["not_reviewed", "split", "merge", "supersede"].includes(review.recommended_action);
  if (review.review_state === "complete" && behaviorOkay && terminologyOkay && actionOkay) {
    return gate("pass", "completed_identity_label_review");
  }
  if (review.review_state && review.review_state !== "pending") {
    return gate("partial", "identity_label_review_in_progress", JSON.stringify(review));
  }
  return gate("unresolved", "identity_label_review_pending");
}

function currentGates(note, identity) {
  const fm = note.frontmatter;
  const claimApplicable = identity.claim_layer === "language_construction";
  const verified = Number(fm.verified_source_count || 0);
  const cited = Number(fm.source_count || 0);
  const allVerified = cited > 0 && verified === cited;
  const independent = fm.independent_evidence_beyond_internal_tests === true;
  const sourceGate = allVerified && independent
    ? gate("pass", "all_cited_sources_verified_and_independent", `${verified}/${cited}`)
    : verified > 0
      ? gate("partial", "some_verified_source_support", `${verified}/${cited}; independent=${independent}`)
      : gate("fail", "no_verified_source_support", `${verified}/${cited}`);
  const scopeGate = fm.current_standard_reaudit_complete === true && allVerified
    ? gate("pass", "current_standard_reaudit_complete_with_verified_sources")
    : allVerified
      ? gate("partial", "verified_sources_but_scope_reaudit_incomplete")
      : gate("unresolved", "source_scope_not_closed");
  const runtimeGate = fm.code_document_reconciled === true && hasCurrentCodeReviewMetadata(fm)
    ? gate("pass", "code_document_reconciled_with_current_metadata")
    : fm.code_document_reconciled === true
      ? gate("partial", "code_document_reconciled_without_complete_current_metadata")
      : gate("unresolved", "runtime_research_alignment_not_reconciled");
  const positiveCount = Number(fm.standard_positive_test_count || 0);
  const positiveGate = positiveCount > 0
    ? gate("pass", "executable_positive_cases_present_implementation_only", String(positiveCount))
    : gate("fail", "no_standard_positive_cases");
  const boundariesPass = fm.negative_boundary_inventory_complete === true && fm.negative_cases_drafted === true &&
    fm.negative_tests_executable === true && fm.negative_tests_passing === true;
  const boundariesPartial = fm.negative_cases_drafted === true || fm.negative_tests_executable === true;
  const boundaryGate = boundariesPass
    ? gate("pass", "complete_executable_passing_negative_inventory")
    : boundariesPartial
      ? gate("partial", "negative_boundaries_incomplete")
      : gate("not_started", "negative_boundary_work_not_started");
  return {
    language_claim_defined: !claimApplicable ? gate("not_applicable", "non_language_claim_layer")
      : plainClaimPresent(note) ? gate("pass", "plain_language_claim_present") : gate("fail", "plain_language_claim_missing"),
    independent_source_support: sourceGate,
    source_scope_matches_claim: scopeGate,
    runtime_research_alignment: runtimeGate,
    executable_positive_cases_present: positiveGate,
    negative_boundaries_complete: boundaryGate,
    reviewed_corpus_evidence: corpusGate(fm),
    role_neutral_panel_threshold: panelGate(fm),
    held_out_validation: heldOutState(note),
    ontology_conflicts_resolved: ontologyGate(identity),
  };
}

function readinessScore(gates, claimLayer) {
  if (claimLayer !== "language_construction") return 0;
  return Math.round(Object.entries(GATE_WEIGHTS).reduce(
    (sum, [name, weight]) => sum + weight * gateFraction(gates[name]?.status), 0
  ));
}

function firstMissingGate(gates) {
  return GATE_ORDER.find((name) => gates[name]?.status !== "pass") || null;
}

function nextActionFor(gateName, lifecycleState, linguisticStatus) {
  if (lifecycleState === "retired") return "rehome preserved evidence into a narrow current research record or confirm that the evidence is fully represented elsewhere";
  if (linguisticStatus === "parser_heuristic") return "decide whether the node is implementation-only or whether a separate language construction record is required";
  const actions = {
    language_claim_defined: "define a narrow falsifiable language claim before adding evidence",
    independent_source_support: "verify scope-matched independent sources and link them directly to the claim",
    source_scope_matches_claim: "complete source-scope reaudit and split any unsupported extensions",
    runtime_research_alignment: "compare exact runtime paths with the source-supported construction and reconcile code plus documentation",
    executable_positive_cases_present: "add executable positive implementation cases without treating them as independent linguistic evidence",
    negative_boundaries_complete: "complete and execute the negative-boundary inventory",
    reviewed_corpus_evidence: "review and classify diverse corpus candidates, including false positives and ambiguous hits",
    role_neutral_panel_threshold: "run or complete a locked role-neutral panel instrument with critical contrasts",
    held_out_validation: "run a held-out evaluation not used to design the matcher or boundary inventory",
    ontology_conflicts_resolved: "complete terminology, family, profile, collision, and learner-label review for the permanent UUID",
  };
  return actions[gateName] || "review the construction record manually";
}

function candidateState(record) {
  const { lifecycle_state: lifecycle, claim_layer: layer, linguistic_status: status, gates } = record;
  if (lifecycle === "retired") {
    if (record.preserved_source_ids.length > 0) return "retired_evidence_rehome_candidate";
    if (record.future_research_preserved_as) return "retired_research_gap";
    return "retired_review";
  }
  if (layer !== "language_construction" || status === "parser_heuristic") return "excluded_nonlanguage";
  if (status === "lexicalized_only") return "lexicalized_review";
  if (gates.language_claim_defined.status !== "pass") return "identity_only";
  if (status === "unsupported_generalization") {
    return ["pass", "partial"].includes(gates.independent_source_support.status)
      ? "narrowing_candidate" : "research_candidate";
  }
  let state = "research_candidate";
  if (gates.independent_source_support.status === "pass") state = "source_supported";
  if (state === "source_supported" && gates.source_scope_matches_claim.status === "pass" && gates.runtime_research_alignment.status === "pass") state = "behavior_aligned";
  if (state === "behavior_aligned" && gates.negative_boundaries_complete.status === "pass" && gates.executable_positive_cases_present.status === "pass") state = "boundary_ready";
  if (state === "boundary_ready" && gates.reviewed_corpus_evidence.status === "pass" && gates.role_neutral_panel_threshold.status === "pass") state = "evidence_ready";
  if (state === "evidence_ready" && gates.held_out_validation.status === "pass") state = "heldout_ready";
  if (state === "heldout_ready" && gates.ontology_conflicts_resolved.status === "pass" && record.supported_gate_eligible) state = "promotion_review";
  if (state === "promotion_review" && status === "supported_productive") state = "supported_productive";
  return state;
}

function snapshotFamilies() {
  if (!fs.existsSync(snapshotPath)) return new Map();
  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  const map = new Map();
  for (const row of snapshot.records || []) {
    const family = row.consolidation?.canonical_family;
    const familyId = row.consolidation?.canonical_family_id;
    if (family || familyId) map.set(row.runtime_label, { family_id: familyId || null, family_name: family || null });
  }
  return map;
}

function buildReadiness() {
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const notes = loadConstructionNotes(root);
  const notesByLabel = new Map(notes.map((note) => [String(note.frontmatter.construction), note]));
  const retiredRows = parseTsv(retiredPath);
  const retiredByLabel = new Map(retiredRows.map((row) => [row.runtime_label, row]));
  const families = snapshotFamilies();
  const records = [];

  for (const identity of registry.records) {
    const legacyLabel = (identity.legacy_labels || []).find((label) => notesByLabel.has(label) || retiredByLabel.has(label));
    const note = legacyLabel ? notesByLabel.get(legacyLabel) : null;
    const retired = legacyLabel ? retiredByLabel.get(legacyLabel) : null;
    const discoveredFamily = identity.family_name ? { family_id: null, family_name: identity.family_name }
      : retired ? { family_id: retired.canonical_family_id || null, family_name: retired.canonical_family || null }
      : families.get(legacyLabel) || { family_id: null, family_name: null };

    if (note) {
      const gates = currentGates(note, identity);
      const evaluation = evaluatePromotion({ ...note, frontmatter: { ...note.frontmatter, status: "supported_productive" } });
      const record = {
        construction_uuid: identity.construction_uuid,
        construction_code: identity.construction_code,
        canonical_name: identity.canonical_name,
        legacy_label: legacyLabel,
        lifecycle_state: identity.lifecycle_state,
        claim_layer: identity.claim_layer,
        linguistic_status: note.frontmatter.status,
        family_id: discoveredFamily.family_id,
        family_name: discoveredFamily.family_name,
        profile_name: identity.profile_name,
        learner_label: identity.learner_label,
        source_ids: Array.isArray(note.frontmatter.source_ids) ? note.frontmatter.source_ids : [],
        preserved_source_ids: [],
        future_research_preserved_as: "",
        standard_positive_test_count: Number(note.frontmatter.standard_positive_test_count || 0),
        standard_boundary_test_count: Number(note.frontmatter.standard_boundary_test_count || 0),
        gates,
        supported_gate_eligible: evaluation.eligible,
        supported_gate_blockers: evaluation.blockers,
        discovery_hard_blockers: [],
        readiness_score: readinessScore(gates, identity.claim_layer),
        candidate_state: "",
        nearest_missing_gate: firstMissingGate(gates),
        next_best_action: "",
        automatic_risk_flags: identity.label_review?.automatic_risk_flags || [],
        source_path: identity.source_path,
      };
      if (gates.reviewed_corpus_evidence.status !== "pass") record.discovery_hard_blockers.push("discovery_gate:reviewed_corpus_evidence");
      if (gates.held_out_validation.status !== "pass") record.discovery_hard_blockers.push("discovery_gate:held_out_validation");
      if (gates.ontology_conflicts_resolved.status !== "pass") record.discovery_hard_blockers.push("discovery_gate:ontology_conflicts_resolved");
      record.candidate_state = candidateState(record);
      record.next_best_action = nextActionFor(record.nearest_missing_gate, record.lifecycle_state, record.linguistic_status);
      records.push(record);
      continue;
    }

    if (retired) {
      const sourceIds = splitSourceIds(retired.mapped_source_ids_preserved);
      const gates = Object.fromEntries(GATE_ORDER.map((name) => [name, gate("not_applicable", "retired_record_requires_rehome_review")]));
      const record = {
        construction_uuid: identity.construction_uuid,
        construction_code: identity.construction_code,
        canonical_name: identity.canonical_name,
        legacy_label: legacyLabel,
        lifecycle_state: "retired",
        claim_layer: identity.claim_layer,
        linguistic_status: "retired",
        family_id: discoveredFamily.family_id,
        family_name: discoveredFamily.family_name,
        profile_name: identity.profile_name,
        learner_label: identity.learner_label,
        source_ids: [],
        preserved_source_ids: sourceIds,
        future_research_preserved_as: retired.future_research_preserved_as || "",
        standard_positive_test_count: 0,
        standard_boundary_test_count: 0,
        gates,
        supported_gate_eligible: false,
        supported_gate_blockers: ["retired_record_not_directly_promotion_eligible"],
        discovery_hard_blockers: ["evidence_must_be_rehomed_to_a_narrow_current_UUID"],
        readiness_score: 0,
        candidate_state: "",
        nearest_missing_gate: null,
        next_best_action: "",
        automatic_risk_flags: identity.label_review?.automatic_risk_flags || [],
        source_path: identity.source_path,
        retirement_class: retired.retirement_class || "",
        retirement_reason: retired.reason || "",
      };
      record.candidate_state = candidateState(record);
      record.next_best_action = nextActionFor(null, "retired", "retired");
      records.push(record);
      continue;
    }

    throw new Error(`Identity has no current or retired source record: ${identity.construction_uuid}`);
  }

  records.sort((a, b) => {
    const stateDiff = (STATE_RANK[b.candidate_state] || 0) - (STATE_RANK[a.candidate_state] || 0);
    if (stateDiff) return stateDiff;
    if (b.readiness_score !== a.readiness_score) return b.readiness_score - a.readiness_score;
    return String(a.construction_code).localeCompare(String(b.construction_code));
  });

  const stateCounts = {};
  const missingGateCounts = {};
  for (const record of records) {
    stateCounts[record.candidate_state] = (stateCounts[record.candidate_state] || 0) + 1;
    if (record.nearest_missing_gate) missingGateCounts[record.nearest_missing_gate] = (missingGateCounts[record.nearest_missing_gate] || 0) + 1;
  }
  return {
    schema: "canto-span-supported-productive-discovery-v1",
    generated_on: "2026-07-24",
    identity_registry_schema: registry.schema,
    record_count: records.length,
    current_record_count: records.filter((record) => record.lifecycle_state === "current").length,
    retired_record_count: records.filter((record) => record.lifecycle_state === "retired").length,
    promotion_eligible_now_count: records.filter((record) => ["promotion_review", "supported_productive"].includes(record.candidate_state)).length,
    state_counts: Object.fromEntries(Object.entries(stateCounts).sort(([a], [b]) => a.localeCompare(b))),
    nearest_missing_gate_counts: Object.fromEntries(Object.entries(missingGateCounts).sort(([a], [b]) => a.localeCompare(b))),
    records,
  };
}

function markdownTable(rows, headers) {
  const head = `| ${headers.map((item) => item.label).join(" | ")} |`;
  const divider = `|${headers.map(() => "---").join("|")}|`;
  const body = rows.map((row) => `| ${headers.map((item) => String(item.value(row) ?? "").replace(/\|/g, "\\|")).join(" | ")} |`).join("\n");
  return `${head}\n${divider}\n${body || `| ${headers.map(() => "").join(" | ")} |`}`;
}

function buildCandidateReport(readiness) {
  const direct = readiness.records.filter((record) => record.lifecycle_state === "current" &&
    record.claim_layer === "language_construction" &&
    !["unsupported_generalization", "lexicalized_only"].includes(record.linguistic_status)).slice(0, 40);
  const narrowing = readiness.records.filter((record) => record.candidate_state === "narrowing_candidate").slice(0, 40);
  const headers = [
    { label: "Code", value: (r) => `\`${r.construction_code}\`` },
    { label: "Canonical name", value: (r) => `\`${r.canonical_name}\`` },
    { label: "State", value: (r) => `\`${r.candidate_state}\`` },
    { label: "Score", value: (r) => r.readiness_score },
    { label: "Nearest missing gate", value: (r) => r.nearest_missing_gate ? `\`${r.nearest_missing_gate}\`` : "—" },
    { label: "Next action", value: (r) => r.next_best_action },
  ];
  return `# Supported-productive candidate discovery\n\nThis is a prioritization report, not a promotion decision. A score cannot override any hard gate.\n\n` +
    `**Records reviewed:** ${readiness.record_count}  \n**Promotion-ready now:** ${readiness.promotion_eligible_now_count}\n\n` +
    `## Direct candidates\n\n` + markdownTable(direct, headers) +
    `\n\n## Narrowing candidates\n\nThese broad current labels are not direct promotion candidates. Their source-backed overlap may justify one or more new narrow successor UUIDs after exact scope review.\n\n` +
    markdownTable(narrowing, headers) +
    `\n\nScores rank research efficiency only. Promotion requires every existing supported-productivity requirement plus reviewed corpus evidence, held-out validation, and completed ontology review.\n`;
}

function buildOrphanReport(readiness) {
  const retiredEvidence = readiness.records.filter((record) => record.candidate_state === "retired_evidence_rehome_candidate");
  const retiredResearch = readiness.records.filter((record) => record.candidate_state === "retired_research_gap");
  const internalWithSources = readiness.records.filter((record) => record.lifecycle_state === "current" && record.claim_layer !== "language_construction" && record.source_ids.length > 0);
  const retiredHeaders = [
    { label: "Code", value: (r) => `\`${r.construction_code}\`` },
    { label: "Retired label", value: (r) => `\`${r.canonical_name}\`` },
    { label: "Family", value: (r) => r.family_name || "unassigned" },
    { label: "Preserved sources", value: (r) => r.preserved_source_ids.join(", ") || "—" },
    { label: "Preserved research direction", value: (r) => r.future_research_preserved_as || "—" },
  ];
  return `# Orphaned construction evidence\n\nEvidence is "orphaned" here only in the governance sense: it is attached to a retired or non-language record and may need a narrow language-construction home. It is not automatically transferable.\n\n` +
    `## Retired records with preserved source links\n\n` + markdownTable(retiredEvidence, retiredHeaders) +
    `\n\n## Retired research directions without preserved source links\n\n` + markdownTable(retiredResearch, retiredHeaders) +
    `\n\n## Internal/non-language records carrying source links\n\n` +
    markdownTable(internalWithSources, [
      { label: "Code", value: (r) => `\`${r.construction_code}\`` },
      { label: "Record", value: (r) => `\`${r.canonical_name}\`` },
      { label: "Claim layer", value: (r) => `\`${r.claim_layer}\`` },
      { label: "Source IDs", value: (r) => r.source_ids.join(", ") },
      { label: "Required review", value: () => "separate implementation provenance from any language claim" },
    ]) + `\n`;
}

function buildFamilyReport(readiness) {
  const groups = new Map();
  for (const record of readiness.records) {
    const key = record.family_id || record.family_name || "UNASSIGNED";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  const gaps = [];
  for (const [key, members] of groups) {
    const current = members.filter((member) => member.lifecycle_state === "current");
    const retiredEvidence = members.filter((member) => member.lifecycle_state === "retired" && member.preserved_source_ids.length > 0);
    const sourceSupported = current.filter((member) => ["source_supported", "behavior_aligned", "boundary_ready", "evidence_ready", "heldout_ready", "promotion_review", "supported_productive"].includes(member.candidate_state));
    const unassignedProfiles = members.filter((member) => !member.profile_name);
    let gapType = "";
    let action = "";
    if (key === "UNASSIGNED") {
      gapType = "family_unassigned";
      action = "assign family only after behavior and source scope are reconciled";
    } else if (current.length === 0 && retiredEvidence.length > 0) {
      gapType = "retired_evidence_without_current_home";
      action = "decide whether a narrow successor UUID is required";
    } else if (sourceSupported.length > 0 && unassignedProfiles.length > 0) {
      gapType = "supported_family_without_profile_closure";
      action = "define source-bounded profiles and sibling exclusions";
    } else if (retiredEvidence.length > 0) {
      gapType = "preserved_retired_evidence_needs_family_reconciliation";
      action = "confirm whether active family members already cover the preserved evidence";
    } else {
      continue;
    }
    gaps.push({ family_key: key, family_name: members.find((member) => member.family_name)?.family_name || "unassigned", member_count: members.length,
      current_count: current.length, retired_evidence_count: retiredEvidence.length, source_supported_count: sourceSupported.length,
      gap_type: gapType, action, member_codes: members.map((member) => member.construction_code).join(", ") });
  }
  gaps.sort((a, b) => b.retired_evidence_count - a.retired_evidence_count || b.member_count - a.member_count || a.family_key.localeCompare(b.family_key));
  return `# Construction-family gaps\n\nFamily assignments in this report are inherited from existing consolidation records or the retired ledger. They remain reviewable metadata, not permanent identity.\n\n` +
    markdownTable(gaps, [
      { label: "Family", value: (r) => `${r.family_key} / ${r.family_name}` },
      { label: "Members", value: (r) => r.member_count },
      { label: "Current", value: (r) => r.current_count },
      { label: "Retired evidence", value: (r) => r.retired_evidence_count },
      { label: "Source-supported current", value: (r) => r.source_supported_count },
      { label: "Gap", value: (r) => `\`${r.gap_type}\`` },
      { label: "Action", value: (r) => r.action },
      { label: "Codes", value: (r) => r.member_codes },
    ]) + `\n`;
}

function buildSweepReport(readiness) {
  const stateRows = Object.entries(readiness.state_counts).map(([state, count]) => ({ state, count }));
  const gateRows = Object.entries(readiness.nearest_missing_gate_counts).map(([name, count]) => ({ name, count }));
  const narrowSignals = readiness.records.filter((record) =>
    (record.linguistic_status === "unsupported_generalization" && record.source_ids.length > 0) || record.candidate_state === "retired_evidence_rehome_candidate");
  return `# Full-repository supported-productive discovery sweep R1\n\n**Generated:** 2026-07-24  \n**Permanent UUID records:** ${readiness.record_count}  \n` +
    `**Current:** ${readiness.current_record_count}  \n**Retired:** ${readiness.retired_record_count}  \n**Promotion-ready now:** ${readiness.promotion_eligible_now_count}\n\n` +
    `The sweep evaluates every permanent identity. It separates construction identity, current naming quality, source support, runtime alignment, executable boundaries, corpus review, panel evidence, held-out validation, and ontology closure. No score or automatic flag authorizes promotion.\n\n## Candidate-state distribution\n\n` +
    markdownTable(stateRows, [{ label: "State", value: (r) => `\`${r.state}\`` }, { label: "Records", value: (r) => r.count }]) +
    `\n\n## Nearest missing gate\n\n` + markdownTable(gateRows, [{ label: "Gate", value: (r) => `\`${r.name}\`` }, { label: "Records", value: (r) => r.count }]) +
    `\n\n## Narrow-construction discovery signals\n\nThese rows may contain a supportable narrow construction even though the present broad label is unsupported or retired. Evidence must be reassigned only after source and runtime scope are compared.\n\n` +
    markdownTable(narrowSignals, [
      { label: "Code", value: (r) => `\`${r.construction_code}\`` },
      { label: "Current/retired label", value: (r) => `\`${r.canonical_name}\`` },
      { label: "State", value: (r) => `\`${r.candidate_state}\`` },
      { label: "Family", value: (r) => r.family_name || "unassigned" },
      { label: "Sources", value: (r) => [...r.source_ids, ...r.preserved_source_ids].join(", ") || "—" },
      { label: "Preserved direction", value: (r) => r.future_research_preserved_as || "source-bounded subtype review" },
    ]) + `\n`;
}

function stableJson(value) { return JSON.stringify(value, null, 2) + "\n"; }
function writeOrCheck(file, content) {
  if (writeMode) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
    return;
  }
  if (!fs.existsSync(file)) throw new Error(`Missing generated file: ${path.relative(root, file)}`);
  if (fs.readFileSync(file, "utf8") !== content) throw new Error(`Generated file is stale: ${path.relative(root, file)}`);
}

const readiness = buildReadiness();
writeOrCheck(readinessPath, stableJson(readiness));
writeOrCheck(candidateReportPath, buildCandidateReport(readiness));
writeOrCheck(orphanReportPath, buildOrphanReport(readiness));
writeOrCheck(familyReportPath, buildFamilyReport(readiness));
writeOrCheck(sweepReportPath, buildSweepReport(readiness));
console.log(JSON.stringify({ schema: "canto-span-supported-productive-discovery-generation-v1", mode: writeMode ? "write" : "check",
  records: readiness.record_count, current: readiness.current_record_count, retired: readiness.retired_record_count,
  promotion_ready_now: readiness.promotion_eligible_now_count, state_counts: readiness.state_counts, status: "PASS" }, null, 2));
