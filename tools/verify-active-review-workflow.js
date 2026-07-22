#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadConstructionNotes } = require("./construction-notes-lib");
const { isVerifiedSourceState } = require("./promotion-gate-lib");

const root = path.resolve(__dirname, "..");
const panelDir = path.join(root, "review-packets/native-panel/active-v2");
const statePath = path.join(panelDir, "panel-review-state.json");
const policyPath = path.join(panelDir, "panel-policy.json");
const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
const policy = JSON.parse(fs.readFileSync(policyPath, "utf8"));
const notes = loadConstructionNotes(root, "active");
const notesByConstruction = new Map(notes.map((note) => [note.frontmatter.construction, note]));
const checks = [];
const failures = [];

function check(name, pass, details = null) {
  const row = { name, pass: Boolean(pass) };
  if (details !== null) row.details = details;
  checks.push(row);
  if (!row.pass) failures.push(row);
}
function parseTsv(file) {
  const lines = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.filter(Boolean).map((line) => Object.fromEntries(line.split("\t").map((value, index) => [headers[index], value])));
}

check("panel protocol version is v2", state.protocol_version === "panel-v2" && policy.protocol_version === "panel-v2");
check("state links canonical policy", state.policy_file === "review-packets/native-panel/active-v2/panel-policy.json");
check("named reviewer roles removed", state.respondent_model.named_roles_removed === true);
check("same instrument required for all respondents", state.respondent_model.same_instrument_for_all_respondents === true && policy.respondent_policy.same_instrument_for_all_respondents === true);
check("user wife receives no special status", state.respondent_model.special_status_for_users_wife === false && policy.respondent_policy.special_weighting_for_user_relatives === false);
check("policy forbids privileged reviewer roles", policy.respondent_policy.privileged_or_named_reviewer_roles === false);
check("pilot threshold is 5 to 10", policy.evidence_thresholds.pilot_usable_judgments_per_item_min === 5 && policy.evidence_thresholds.pilot_usable_judgments_per_item_max === 10);
check("provisional threshold is 10 per critical item", policy.evidence_thresholds.provisional_minimum_usable_judgments_per_critical_item === 10);
check("supported threshold is 30 per critical item", policy.evidence_thresholds.supported_productive_minimum_usable_judgments_per_critical_item === 30);
check("public waves batch two to three focal constructions", policy.batching.focal_constructions_per_public_wave_min === 2 && policy.batching.focal_constructions_per_public_wave_max === 3);
check("historical v1 workflow remains traceable", fs.existsSync(path.join(root, state.supersedes)));
check("survey creation waits for user guidance prompt", state.survey_creation_control && state.survey_creation_control.user_prompt_required_before_instrument_creation === true && state.survey_creation_control.user_prompt_received === false);
check("current checkpoint created no survey instrument", state.survey_creation_control && state.survey_creation_control.survey_instrument_created_in_current_checkpoint === false);
check("RUL survey-readiness record exists", state.survey_creation_control && fs.existsSync(path.join(root, state.survey_creation_control.readiness_record)));
check("RUL contrast requirements exist", state.survey_creation_control && fs.existsSync(path.join(root, state.survey_creation_control.contrast_requirements_file)));

const stateConstructions = new Set(state.constructions.map((entry) => entry.construction));
const activeConstructions = new Set(notes.map((note) => note.frontmatter.construction));
check("panel state exactly covers active construction notes", stateConstructions.size === activeConstructions.size && [...stateConstructions].every((value) => activeConstructions.has(value)), { state: [...stateConstructions], active: [...activeConstructions] });

for (const entry of state.constructions) {
  const note = notesByConstruction.get(entry.construction);
  check(`${entry.construction} has one active note`, Boolean(note));
  if (!note) continue;
  const fm = note.frontmatter;
  check(`${entry.construction} uses panel evidence model v2`, fm.panel_evidence_model_version === "v2");
  check(`${entry.construction} links canonical panel state`, fm.panel_review_state_file === "review-packets/native-panel/active-v2/panel-review-state.json");
  check(`${entry.construction} links canonical panel policy`, fm.panel_policy_file === "review-packets/native-panel/active-v2/panel-policy.json");
  check(`${entry.construction} source verification path matches state`, fm.source_verification_file === entry.source_verification_file);
  check(`${entry.construction} total panel response count matches`, Number(fm.panel_response_count_total) === Number(entry.panel_response_count_total), { note: fm.panel_response_count_total, state: entry.panel_response_count_total });
  check(`${entry.construction} eligible panel response count matches`, Number(fm.eligible_panel_response_count) === Number(entry.eligible_panel_response_count), { note: fm.eligible_panel_response_count, state: entry.eligible_panel_response_count });
  check(`${entry.construction} minimum critical-item n matches`, Number(fm.minimum_usable_judgments_per_critical_item) === Number(entry.minimum_usable_judgments_per_critical_item));
  check(`${entry.construction} critical contrast coverage matches`, fm.critical_contrast_coverage === entry.critical_contrast_coverage);
  check(`${entry.construction} instrument version matches`, fm.survey_instrument_version === entry.survey_instrument_version);
  check(`${entry.construction} instrument status matches`, fm.survey_instrument_status === entry.survey_instrument_status);
  check(`${entry.construction} instrument quality state matches`, fm.survey_instrument_quality_resolved === entry.survey_instrument_quality_resolved);
  check(`${entry.construction} quality screen state matches`, fm.quality_screen_status === entry.quality_screen_status);
  check(`${entry.construction} panel adjudication state matches`, fm.panel_adjudication_status === entry.panel_adjudication_status);
  check(`${entry.construction} recruitment channels match`, JSON.stringify(fm.recruitment_channels) === JSON.stringify(entry.recruitment_channels));
  check(`${entry.construction} respondent role-neutral state matches`, fm.respondent_role_neutral === entry.respondent_role_neutral);
  check(`${entry.construction} disposition matches note`, fm.status === entry.current_disposition, { note: fm.status, state: entry.current_disposition });
  check(`${entry.construction} has no active named reviewer fields`, !Object.prototype.hasOwnProperty.call(fm, "speaker_a_state") && !Object.prototype.hasOwnProperty.call(fm, "speaker_b_state"));

  const sourceFile = path.join(root, entry.source_verification_file);
  check(`${entry.construction} source verification file exists`, fs.existsSync(sourceFile));
  if (fs.existsSync(sourceFile)) {
    const sourceRows = parseTsv(sourceFile);
    const rowsById = new Map(sourceRows.map((row) => [row.source_id, row]));
    const counted = new Set(entry.counted_source_ids);
    const noteSources = new Set(fm.source_ids || []);
    check(`${entry.construction} counted source ids are unique`, counted.size === entry.counted_source_ids.length);
    check(`${entry.construction} source set equals note source set`, counted.size === noteSources.size && [...counted].every((value) => noteSources.has(value)));
    for (const sourceId of counted) {
      const row = rowsById.get(sourceId);
      check(`${entry.construction} source ${sourceId} occurs in verification TSV`, Boolean(row));
      if (!row) continue;
      const verification = row.verification_result || row.access_status || "";
      const locator = row.access_and_locator || row.exact_locator || "";
      const claim = row.exact_claim_support || row.finding || "";
      const limitation = row.semantic_caution || row.limitation || "";
      check(`${entry.construction} source ${sourceId} is verified`, isVerifiedSourceState(verification), verification);
      check(`${entry.construction} source ${sourceId} has locator`, Boolean(locator));
      check(`${entry.construction} source ${sourceId} has claim`, Boolean(claim));
      check(`${entry.construction} source ${sourceId} has limitation`, Boolean(limitation));
    }
  }
  for (const record of entry.historical_records || []) check(`${entry.construction} historical record exists: ${record}`, fs.existsSync(path.join(root, record)));
  if (Object.prototype.hasOwnProperty.call(entry, "reported_live_response_count_not_yet_snapshotted")) {
    check(`${entry.construction} uncommitted live count is not treated as committed evidence`, Number(entry.reported_live_response_count_not_yet_snapshotted) >= Number(entry.panel_response_count_total));
  }
}

const activeTexts = notes.map((note) => note.text).join("\n");
check("active notes contain no Speaker A/B state fields", !/^(speaker_a_state|speaker_b_state):/m.test(activeTexts));
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
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const outDir = path.join(root, "validation", "current");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "active-review-workflow.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
