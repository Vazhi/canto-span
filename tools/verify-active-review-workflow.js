#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadConstructionNotes } = require("./construction-notes-lib");
const { isVerifiedSourceState } = require("./promotion-gate-lib");

const DEFAULT_ROOT = path.resolve(__dirname, "..");
const PANEL_STATE = "review-packets/native-panel/active-v2/panel-review-state.json";
const PANEL_POLICY = "review-packets/native-panel/active-v2/panel-policy.json";
const FOLLOWUP_METADATA = "review-packets/native-panel/active-v2/followup-draft-v1-metadata.json";
const AB30_DECISIONS = "review-packets/corpus-review/AB30/review-decisions-r1.json";
const AB30_LEDGER = "review-packets/corpus-review/AB30/candidate-ledger.json";
const CURRENT_NEXT_ACTION = "await_live_pilot_closure_and_item_audit_before_followup_revision";

function readJson(root, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function loadAcceptedAdjudications(root) {
  const records = [...readJson(root, "data/construction-adjudications.json").records];
  const batchDir = path.join(root, "data/construction-adjudication-batches");
  for (const name of fs.readdirSync(batchDir).filter((file) => file.endsWith(".json")).sort()) {
    records.push(...JSON.parse(fs.readFileSync(path.join(batchDir, name), "utf8")).records);
  }
  return records;
}

function parseTsv(file) {
  const lines = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.filter(Boolean).map((line) =>
    Object.fromEntries(line.split("\t").map((value, index) => [headers[index], value]))
  );
}

function permanentIdentityFailures(entry, identity, adjudication) {
  const failures = [];
  const required = [
    "construction_uuid",
    "construction_code",
    "canonical_name",
    "legacy_runtime_label",
  ];
  for (const field of required) {
    if (typeof entry?.[field] !== "string" || entry[field].length === 0) {
      failures.push(`missing ${field}`);
    }
  }
  if (Object.prototype.hasOwnProperty.call(entry || {}, "construction")) {
    failures.push("legacy-only construction field is forbidden");
  }
  if (!identity) {
    failures.push("no permanent identity resolves from legacy_runtime_label");
    return failures;
  }
  for (const field of ["construction_uuid", "construction_code", "canonical_name"]) {
    if (entry[field] !== identity[field]) failures.push(`${field} mismatches permanent identity`);
  }
  if (!identity.legacy_labels?.includes(entry.legacy_runtime_label)) {
    failures.push("legacy_runtime_label mismatches permanent identity");
  }
  if (entry.note_path !== identity.source_path) failures.push("note_path mismatches permanent identity");
  if (!adjudication) {
    failures.push("no accepted adjudication resolves from legacy_runtime_label");
    return failures;
  }
  const adjudicated = {
    construction_uuid: adjudication.construction_uuid,
    construction_code: adjudication.construction_code,
    canonical_name: adjudication.approved_canonical_name,
    legacy_runtime_label: adjudication.legacy_label,
  };
  for (const field of required) {
    if (entry[field] !== adjudicated[field]) failures.push(`${field} mismatches accepted adjudication`);
  }
  return failures;
}

function lifecycleFailures(state, metadata) {
  const failures = [];
  const lifecycle = state.instrument_lifecycle;
  if (Object.prototype.hasOwnProperty.call(state, "survey_creation_control")) {
    failures.push("stale survey_creation_control is forbidden");
  }
  if (!lifecycle) return [...failures, "instrument_lifecycle is missing"];
  if (lifecycle.metadata_file !== FOLLOWUP_METADATA) failures.push("follow-up metadata path mismatch");
  const current = lifecycle.current_live_instrument || {};
  const expectedCurrent = metadata.current_live_instrument || {};
  for (const field of ["instrument_id", "status", "closure_rule"]) {
    if (current[field] !== expectedCurrent[field]) failures.push(`current live instrument ${field} mismatch`);
  }
  const followup = lifecycle.followup_instrument || {};
  const expectedFollowup = {
    instrument_id: metadata.instrument_id,
    status: metadata.instrument_status,
    deployment_allowed: metadata.deployment_allowed,
  };
  for (const field of ["instrument_id", "status", "deployment_allowed"]) {
    if (followup[field] !== expectedFollowup[field]) failures.push(`follow-up instrument ${field} mismatch`);
  }
  if (followup.deployment_allowed !== false) failures.push("follow-up must remain non-deployable");
  if (expectedCurrent.status !== "collection_in_progress") failures.push("current pilot is not in collection");
  if (metadata.instrument_status !== "draft_followup") failures.push("follow-up metadata is not draft_followup");
  const staleState = JSON.stringify(state);
  if (/user_prompt_required|user_prompt_received|survey_instrument_created_in_current_checkpoint|await_user_prompt_then_create|after_user_prompt_for_mixed_pilot/.test(staleState)) {
    failures.push("stale survey-creation lifecycle field remains");
  }
  for (const entry of state.constructions || []) {
    if (entry.next_action !== CURRENT_NEXT_ACTION) {
      failures.push(`${entry.legacy_runtime_label || "unknown construction"} has stale next_action`);
    }
  }
  return failures;
}

function noteIdentityFailures(frontmatter, entry) {
  const failures = [];
  for (const field of [
    "construction_uuid",
    "construction_code",
    "canonical_name",
    "legacy_runtime_label",
  ]) {
    if (frontmatter[field] !== entry[field]) failures.push(`note ${field} mismatches panel state`);
  }
  if (frontmatter.construction !== entry.legacy_runtime_label) {
    failures.push("runtime construction field does not match compatibility alias");
  }
  if (frontmatter.title !== `${entry.construction_code} ${entry.canonical_name}`) {
    failures.push("note title does not use permanent code and canonical name");
  }
  return failures;
}

function noteLifecycleFailures(frontmatter, metadata) {
  const failures = [];
  const expected = {
    panel_lifecycle_metadata_file: FOLLOWUP_METADATA,
    current_panel_instrument_id: metadata.current_live_instrument.instrument_id,
    current_panel_instrument_status: metadata.current_live_instrument.status,
    followup_instrument_id: metadata.instrument_id,
    followup_instrument_status: metadata.instrument_status,
    followup_deployment_allowed: metadata.deployment_allowed,
  };
  for (const [field, value] of Object.entries(expected)) {
    if (frontmatter[field] !== value) failures.push(`${field} mismatches follow-up metadata`);
  }
  return failures;
}

function uncommittedResponseFailures(entry, snapshot) {
  const failures = [];
  if (Object.prototype.hasOwnProperty.call(entry, "reported_live_response_count_not_yet_snapshotted")) {
    failures.push("deprecated uncommitted-live-count field is forbidden");
  }
  if (!entry.uncommitted_live_response_report) return failures;
  const report = entry.uncommitted_live_response_report;
  if (report.accepted_as_evidence !== false) failures.push("uncommitted live responses must not be accepted as evidence");
  if (Number(report.reported_count) < Number(entry.panel_response_count_total)) {
    failures.push("uncommitted live report cannot reduce the committed response total");
  }
  if (!snapshot) {
    failures.push("committed response snapshot is missing");
    return failures;
  }
  if (Number(entry.panel_response_count_total) !== Number(snapshot.response_count)) {
    failures.push("committed response total mismatches accepted snapshot");
  }
  if (Number(entry.eligible_panel_response_count) !== Number(snapshot.screening?.native_cantonese_confirmed)) {
    failures.push("eligible response total mismatches accepted snapshot");
  }
  return failures;
}

function containsPartialOnlyReadinessOverclaim(text) {
  const statements = String(text).replace(/\s+/g, " ").split(/[.!?]/);
  return statements.some((statement) => {
    if (!/\bpartial_only\b/i.test(statement)) return false;
    if (!/\b(?:diverse-corpus|corpus readiness|corpus gate)\b/i.test(statement)) return false;
    const affirmative = /\b(?:satisfies|completes|meets|passes|satisfied|completed|met|passed)\b/i.test(statement);
    const negated = /\b(?:do(?:es)?\s+not|cannot|never)\s+(?:satisfy|complete|meet|pass)\b/i.test(statement);
    return affirmative && !negated;
  });
}

function ab30CorpusFailures(frontmatter, noteText, decisions, ledger) {
  const failures = [];
  const allowed = ["genuine", "false_positive", "ambiguous", "unusable"];
  const derivedCounts = {
    unreviewed: 0,
    genuine: 0,
    false_positive: 0,
    ambiguous: 0,
    unusable: 0,
  };
  for (const decision of decisions.decisions || []) {
    if (!allowed.includes(decision.classification)) {
      derivedCounts.unreviewed += 1;
    } else {
      derivedCounts[decision.classification] += 1;
    }
  }
  if (frontmatter.corpus_decision_ledger_file !== AB30_DECISIONS) failures.push("decision-ledger link mismatch");
  if (frontmatter.corpus_source_ledger_file !== AB30_LEDGER) failures.push("source-ledger link mismatch");
  if (decisions.source_ledger !== AB30_LEDGER) failures.push("accepted decision ledger points to wrong source ledger");
  if (decisions.source_ledger_tool_version !== ledger.extractionToolVersion) failures.push("source-ledger tool version mismatch");
  if (decisions.source_manifest_hash !== ledger.sourceManifestHash) failures.push("source-ledger manifest hash mismatch");
  const sourceCandidates = ledger.candidates || [];
  const decisionRows = decisions.decisions || [];
  if (decisionRows.length !== sourceCandidates.length) failures.push("reviewed packet count disagrees with source ledger");
  const sourceIdList = sourceCandidates.map((item) => item.candidateId);
  const decisionIdList = decisionRows.map((item) => item.candidate_id);
  const sourceIds = new Set(sourceIdList);
  const decisionIds = new Set(decisionIdList);
  if (sourceIds.size !== sourceIdList.length) failures.push("source-ledger candidate IDs are not unique");
  if (decisionIds.size !== decisionIdList.length) failures.push("accepted decision candidate_id values are not unique");
  if (
    sourceIds.size !== decisionIds.size ||
    [...sourceIds].some((candidateId) => !decisionIds.has(candidateId)) ||
    [...decisionIds].some((candidateId) => !sourceIds.has(candidateId))
  ) {
    failures.push("candidate-ID and decision-ID sets do not exactly match");
  }
  for (const [classification, count] of Object.entries(derivedCounts)) {
    if (Number(decisions.counts?.[classification]) !== count) {
      failures.push(`decision-ledger ${classification} count mismatch`);
    }
  }
  if (derivedCounts.unreviewed !== 0) failures.push("accepted packet contains unreviewed or invalid decisions");
  const noteCounts = {
    genuine: frontmatter.accepted_corpus_genuine_count,
    false_positive: frontmatter.accepted_corpus_false_positive_count,
    ambiguous: frontmatter.accepted_corpus_ambiguous_count,
    unusable: frontmatter.accepted_corpus_unusable_count,
  };
  if (Number(frontmatter.accepted_corpus_packet_reviewed_count) !== (decisions.decisions || []).length) {
    failures.push("note reviewed packet count mismatch");
  }
  for (const classification of allowed) {
    if (Number(noteCounts[classification]) !== derivedCounts[classification]) {
      failures.push(`note ${classification} count mismatch`);
    }
  }
  const readinessGateCounts = [
    "corpus_candidate_hit_count",
    "corpus_genuine_hit_count",
    "corpus_false_positive_count",
    "corpus_ambiguous_hit_count",
    "corpus_unusable_hit_count",
  ].reduce((sum, field) => sum + Number(frontmatter[field] || 0), 0);
  if (frontmatter.corpus_hits_reviewed !== false || frontmatter.corpus_evidence_used !== false || readinessGateCounts !== 0) {
    failures.push("partial_only packet must remain outside corpus readiness-gate fields");
  }
  if (decisions.packet_status !== "current_candidate_packet_complete") failures.push("accepted packet is not complete");
  if (decisions.readiness_effect !== "partial_only") failures.push("accepted readiness effect is not partial_only");
  if (frontmatter.corpus_readiness_effect !== decisions.readiness_effect) failures.push("note readiness effect mismatch");
  if (frontmatter.corpus_diverse_source_gate_satisfied !== false) {
    failures.push("partial_only must not satisfy the diverse-corpus gate");
  }
  const expectedIdentity = {
    permanentCode: frontmatter.construction_code,
    canonicalIdentity: frontmatter.canonical_name,
    legacyRuntimeLabel: frontmatter.legacy_runtime_label,
  };
  for (const [field, value] of Object.entries(expectedIdentity)) {
    if (decisions.construction?.[field] !== value) failures.push(`decision-ledger ${field} mismatch`);
    if (ledger.construction?.[field] !== value) failures.push(`source-ledger ${field} mismatch`);
  }
  if (!/\b5 reviewed\b/i.test(noteText) || !/\b2 genuine\b/i.test(noteText) || !/\b3 false positives\b/i.test(noteText)) {
    failures.push("note prose does not report the accepted AB30 packet counts");
  }
  if (!/do(?:es)?\s+(?:\*\*)?not(?:\*\*)?\s+satisfy the diverse-corpus gate/i.test(noteText)) {
    failures.push("note prose does not preserve the partial_only limitation");
  }
  if (containsPartialOnlyReadinessOverclaim(noteText)) failures.push("note overclaims partial_only corpus readiness");
  return failures;
}

function runAudit(root = DEFAULT_ROOT, { writeReport = true } = {}) {
  const state = readJson(root, PANEL_STATE);
  const policy = readJson(root, PANEL_POLICY);
  const metadata = readJson(root, FOLLOWUP_METADATA);
  const identities = readJson(root, "data/construction-identities.json");
  const adjudications = loadAcceptedAdjudications(root);
  const ab30Decisions = readJson(root, AB30_DECISIONS);
  const ab30Ledger = readJson(root, AB30_LEDGER);
  const notes = loadConstructionNotes(root, "active");
  const notesByConstruction = new Map(notes.map((note) => [note.frontmatter.construction, note]));
  const identitiesByLegacy = new Map(
    identities.records.flatMap((identity) =>
      (identity.legacy_labels || []).map((label) => [label, identity])
    )
  );
  const adjudicationsByLegacy = new Map(
    adjudications.map((adjudication) => [adjudication.legacy_label, adjudication])
  );
  const checks = [];
  const failures = [];

  function check(name, pass, details = null) {
    const row = { name, pass: Boolean(pass) };
    if (details !== null) row.details = details;
    checks.push(row);
    if (!row.pass) failures.push(row);
  }
  function checkFailures(prefix, rows) {
    check(prefix, rows.length === 0, rows);
  }

  check("panel protocol version is v2", state.protocol_version === "panel-v2" && policy.protocol_version === "panel-v2");
  check("state links canonical policy", state.policy_file === PANEL_POLICY);
  check("named reviewer roles removed", state.respondent_model.named_roles_removed === true);
  check("same instrument required for all respondents", state.respondent_model.same_instrument_for_all_respondents === true && policy.respondent_policy.same_instrument_for_all_respondents === true);
  check("user wife receives no special status", state.respondent_model.special_status_for_users_wife === false && policy.respondent_policy.special_weighting_for_user_relatives === false);
  check("policy forbids privileged reviewer roles", policy.respondent_policy.privileged_or_named_reviewer_roles === false);
  check("pilot threshold is 5 to 10", policy.evidence_thresholds.pilot_usable_judgments_per_item_min === 5 && policy.evidence_thresholds.pilot_usable_judgments_per_item_max === 10);
  check("provisional threshold is 10 per critical item", policy.evidence_thresholds.provisional_minimum_usable_judgments_per_critical_item === 10);
  check("supported threshold is 30 per critical item", policy.evidence_thresholds.supported_productive_minimum_usable_judgments_per_critical_item === 30);
  check("public waves batch two to three focal constructions", policy.batching.focal_constructions_per_public_wave_min === 2 && policy.batching.focal_constructions_per_public_wave_max === 3);
  check("historical v1 workflow remains traceable", fs.existsSync(path.join(root, state.supersedes)));
  checkFailures("instrument lifecycle matches current metadata", lifecycleFailures(state, metadata));

  const stateConstructions = new Set(state.constructions.map((entry) => entry.legacy_runtime_label));
  const activeConstructions = new Set(notes.map((note) => note.frontmatter.construction));
  check("panel state exactly covers active construction notes", stateConstructions.size === activeConstructions.size && [...stateConstructions].every((value) => activeConstructions.has(value)), { state: [...stateConstructions], active: [...activeConstructions] });

  for (const entry of state.constructions) {
    const label = entry.legacy_runtime_label || "<missing legacy_runtime_label>";
    const identity = identitiesByLegacy.get(label);
    const adjudication = adjudicationsByLegacy.get(label);
    checkFailures(`${label} has verified permanent identity tuple`, permanentIdentityFailures(entry, identity, adjudication));
    const note = notesByConstruction.get(label);
    check(`${label} has one active note`, Boolean(note));
    if (!note) continue;
    const fm = note.frontmatter;
    checkFailures(`${label} note identity matches panel state`, noteIdentityFailures(fm, entry));
    checkFailures(`${label} note lifecycle matches current metadata`, noteLifecycleFailures(fm, metadata));
    check(`${label} note path matches permanent identity`, path.relative(root, note.file) === entry.note_path, { note: path.relative(root, note.file), state: entry.note_path });
    check(`${label} uses panel evidence model v2`, fm.panel_evidence_model_version === "v2");
    check(`${label} links canonical panel state`, fm.panel_review_state_file === PANEL_STATE);
    check(`${label} links canonical panel policy`, fm.panel_policy_file === PANEL_POLICY);
    check(`${label} source verification path matches state`, fm.source_verification_file === entry.source_verification_file);
    check(`${label} total panel response count matches`, Number(fm.panel_response_count_total) === Number(entry.panel_response_count_total), { note: fm.panel_response_count_total, state: entry.panel_response_count_total });
    check(`${label} eligible panel response count matches`, Number(fm.eligible_panel_response_count) === Number(entry.eligible_panel_response_count), { note: fm.eligible_panel_response_count, state: entry.eligible_panel_response_count });
    check(`${label} minimum critical-item n matches`, Number(fm.minimum_usable_judgments_per_critical_item) === Number(entry.minimum_usable_judgments_per_critical_item));
    check(`${label} critical contrast coverage matches`, fm.critical_contrast_coverage === entry.critical_contrast_coverage);
    check(`${label} instrument version matches`, fm.survey_instrument_version === entry.survey_instrument_version);
    check(`${label} instrument status matches`, fm.survey_instrument_status === entry.survey_instrument_status);
    check(`${label} instrument quality state matches`, fm.survey_instrument_quality_resolved === entry.survey_instrument_quality_resolved);
    check(`${label} quality screen state matches`, fm.quality_screen_status === entry.quality_screen_status);
    check(`${label} panel adjudication state matches`, fm.panel_adjudication_status === entry.panel_adjudication_status);
    check(`${label} recruitment channels match`, JSON.stringify(fm.recruitment_channels) === JSON.stringify(entry.recruitment_channels));
    check(`${label} respondent role-neutral state matches`, fm.respondent_role_neutral === entry.respondent_role_neutral);
    check(`${label} disposition matches note`, fm.status === entry.current_disposition, { note: fm.status, state: entry.current_disposition });
    check(`${label} has no active named reviewer fields`, !Object.prototype.hasOwnProperty.call(fm, "speaker_a_state") && !Object.prototype.hasOwnProperty.call(fm, "speaker_b_state"));

    const sourceFile = path.join(root, entry.source_verification_file);
    check(`${label} source verification file exists`, fs.existsSync(sourceFile));
    if (fs.existsSync(sourceFile)) {
      const sourceRows = parseTsv(sourceFile);
      const rowsById = new Map(sourceRows.map((row) => [row.source_id, row]));
      const counted = new Set(entry.counted_source_ids);
      const noteSources = new Set(fm.source_ids || []);
      check(`${label} counted source ids are unique`, counted.size === entry.counted_source_ids.length);
      check(`${label} source set equals note source set`, counted.size === noteSources.size && [...counted].every((value) => noteSources.has(value)));
      for (const sourceId of counted) {
        const row = rowsById.get(sourceId);
        check(`${label} source ${sourceId} occurs in verification TSV`, Boolean(row));
        if (!row) continue;
        const verification = row.verification_result || row.access_status || "";
        const locator = row.access_and_locator || row.exact_locator || "";
        const claim = row.exact_claim_support || row.finding || "";
        const limitation = row.semantic_caution || row.limitation || "";
        check(`${label} source ${sourceId} is verified`, isVerifiedSourceState(verification), verification);
        check(`${label} source ${sourceId} has locator`, Boolean(locator));
        check(`${label} source ${sourceId} has claim`, Boolean(claim));
        check(`${label} source ${sourceId} has limitation`, Boolean(limitation));
      }
    }
    for (const record of entry.historical_records || []) {
      check(`${label} historical record exists: ${record}`, fs.existsSync(path.join(root, record)));
    }
    const snapshotPath = entry.committed_response_snapshot && path.join(root, entry.committed_response_snapshot);
    const snapshot = snapshotPath && fs.existsSync(snapshotPath)
      ? JSON.parse(fs.readFileSync(snapshotPath, "utf8"))
      : null;
    checkFailures(`${label} keeps uncommitted responses outside accepted evidence`, uncommittedResponseFailures(entry, snapshot));
  }

  const ab30Entry = state.constructions.find((entry) => entry.construction_code === "AB30");
  const ab30Note = ab30Entry && notesByConstruction.get(ab30Entry.legacy_runtime_label);
  checkFailures("AB30 note matches accepted corpus decision ledger", ab30Note
    ? ab30CorpusFailures(ab30Note.frontmatter, ab30Note.text, ab30Decisions, ab30Ledger)
    : ["AB30 active note missing"]);
  const activeTexts = notes.map((note) => note.text).join("\n");
  check("active notes contain no Speaker A/B state fields", !/^(speaker_a_state|speaker_b_state):/m.test(activeTexts));
  check("active notes contain no stale survey-creation control", !/await_user_prompt_then_create|after_user_prompt_for_mixed_pilot|survey_prompt_pending|awaiting_user_prompt_for_pilot/i.test(activeTexts));
  check("active notes contain no partial_only readiness overclaim", !containsPartialOnlyReadinessOverclaim(activeTexts));
  check("consolidated governance exists", fs.existsSync(path.join(root, "docs/current/GOVERNANCE.md")));

  const report = {
    schema: "canto-span-native-panel-workflow-audit-v2",
    protocol_version: state.protocol_version,
    active_constructions: notes.length,
    check_count: checks.length,
    passed: checks.filter((row) => row.pass).length,
    failed: failures.length,
    status: failures.length ? "FAIL" : "PASS",
    failures,
  };
  if (writeReport) {
    const outDir = path.join(root, "validation", "current");
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "active-review-workflow.json"), JSON.stringify(report, null, 2) + "\n");
  }
  return report;
}

if (require.main === module) {
  const report = runAudit();
  console.log(JSON.stringify(report, null, 2));
  if (report.failures.length) process.exit(1);
}

module.exports = {
  AB30_DECISIONS,
  AB30_LEDGER,
  CURRENT_NEXT_ACTION,
  FOLLOWUP_METADATA,
  ab30CorpusFailures,
  containsPartialOnlyReadinessOverclaim,
  lifecycleFailures,
  loadAcceptedAdjudications,
  noteIdentityFailures,
  noteLifecycleFailures,
  permanentIdentityFailures,
  runAudit,
  uncommittedResponseFailures,
};
