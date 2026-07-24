#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const panel = path.join(root, "review-packets/native-panel/active-v2");
const corpus = path.join(root, "review-packets/corpus-review/AB30");
function check(ok, msg) { if (!ok) throw new Error(msg); }
function json(file) { return JSON.parse(fs.readFileSync(file, "utf8")); }
function tsv(file) {
  const lines = fs.readFileSync(file, "utf8").trimEnd().split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.filter(Boolean).map(line => Object.fromEntries(headers.map((h,i)=>[h,line.split("\t")[i]||""])));
}
const meta = json(path.join(panel, "followup-draft-v1-metadata.json"));
const items = tsv(path.join(panel, "followup-draft-v1-items.tsv"));
const crosswalk = tsv(path.join(panel, "followup-draft-v1-item-crosswalk.tsv"));
const responses = tsv(path.join(panel, "followup-draft-v1-response-template.tsv"));
const decisions = json(path.join(corpus, "review-decisions-r1.json"));
const ledger = json(path.join(corpus, "candidate-ledger.json"));
check(meta.instrument_status === "draft_followup" && meta.deployment_allowed === false, "follow-up must remain non-deployable draft");
check(meta.current_live_instrument.status === "collection_in_progress", "live pilot must remain in progress");
check(meta.primary_focal_constructions.map(x=>x.code).join(",") === "AB53,AB30", "primary codes must be AB53,AB30");
check(meta.primary_focal_constructions[0].canonical_name === "ResourceInitialJungLaiFunctionClause", "AB53 canonical name mismatch");
check(meta.primary_focal_constructions[1].canonical_name === "ZoMarkedPerfectiveObjectVP", "AB30 canonical name mismatch");
check(items.length === 24 && new Set(items.map(x=>x.canonical_item_id)).size === 24, "need 24 unique canonical items");
const focal = items.filter(x=>x.item_role === "focal");
const fillers = items.filter(x=>x.item_role === "filler");
check(focal.length === 16 && focal.every(x=>/^G0[6-9][A-D]01$/.test(x.canonical_item_id)), "focal IDs/count invalid");
check(fillers.length === 8 && fillers.every(x=>/^F01[1-8]$/.test(x.canonical_item_id)), "filler IDs/count invalid");
check(fillers.filter(x=>x.calibration_class === "natural_candidate").length === 4, "need four natural fillers");
check(fillers.filter(x=>x.calibration_class === "degraded_candidate").length === 4, "need four degraded fillers");
check(meta.participant_requirements.adult_18_or_older_required === true, "adult screen missing");
check(meta.participant_requirements.same_instrument_and_inclusion_criteria_for_all === true, "role-neutral panel rule missing");
check(meta.participant_requirements.privileged_reviewer_roles === false, "privileged reviewers forbidden");
check(meta.allocation.assignment_log_required === true && meta.allocation.reverse_order_only === false, "allocation controls invalid");
const ids = new Set(items.map(x=>x.canonical_item_id));
check(meta.variants.length === 2, "need two variants");
for (const v of meta.variants) check(v.item_order.length === 24 && new Set(v.item_order).size === 24 && v.item_order.every(id=>ids.has(id)), `variant ${v.variant_id} invalid`);
check(meta.variants[1].item_order.join("|") !== [...meta.variants[0].item_order].reverse().join("|"), "variant B is simple reverse");
check(crosswalk.length === 28 && new Set(crosswalk.map(x=>x.legacy_item_id)).size === 28, "crosswalk must cover 28 unique Codex aliases");
for (const row of crosswalk) for (const id of row.canonical_item_ids.split(";").filter(Boolean)) check(ids.has(id), `crosswalk unknown item ${id}`);
check(responses.length === 48, "response template must contain 48 variant rows");
check(decisions.packet_status === "current_candidate_packet_complete" && decisions.readiness_effect === "partial_only", "corpus decision status overclaims readiness");
check(decisions.source_ledger_tool_version === ledger.extractionToolVersion && decisions.source_manifest_hash === ledger.sourceManifestHash, "decision provenance mismatch");
check(decisions.decisions.length === ledger.candidates.length && decisions.decisions.length === 5, "decision count mismatch");
const allowed = new Set(["genuine","false_positive","ambiguous","unusable"]);
check(decisions.decisions.every(x=>allowed.has(x.classification)), "unreviewed or invalid corpus decision remains");
check(decisions.counts.genuine === 2 && decisions.counts.false_positive === 3 && decisions.counts.unreviewed === 0, "AB30 review totals mismatch");
console.log("PR21 repair verification passed: AB30 packet decisions, canonical IDs, crosswalk, variants, and screening controls are consistent.");
