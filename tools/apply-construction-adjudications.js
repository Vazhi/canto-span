#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const registryPath = path.join(root, "data", "construction-identities.json");
const adjudicationPath = path.join(root, "data", "construction-adjudications.json");
const writeMode = process.argv.includes("--write");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function stableJson(value) {
  return JSON.stringify(value, null, 2) + "\n";
}

function uniqueStrings(values) {
  return [...new Set((values || []).filter((value) => typeof value === "string" && value.trim()))];
}

function validate(adjudications, registry) {
  const failures = [];
  if (adjudications.schema !== "canto-span-construction-adjudications-v1") {
    failures.push(`unexpected adjudication schema: ${String(adjudications.schema)}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(adjudications.adjudicated_on || ""))) {
    failures.push("adjudicated_on must use YYYY-MM-DD");
  }
  if (!Array.isArray(adjudications.records)) failures.push("records must be an array");

  const registryByUuid = new Map((registry.records || []).map((record) => [record.construction_uuid, record]));
  const seenUuids = new Set();
  const seenCodes = new Set();
  for (const decision of adjudications.records || []) {
    const prefix = decision.construction_code || decision.construction_uuid || "<unknown>";
    if (seenUuids.has(decision.construction_uuid)) failures.push(`${prefix}: duplicate adjudication UUID`);
    seenUuids.add(decision.construction_uuid);
    if (seenCodes.has(decision.construction_code)) failures.push(`${prefix}: duplicate adjudication code`);
    seenCodes.add(decision.construction_code);

    const record = registryByUuid.get(decision.construction_uuid);
    if (!record) {
      failures.push(`${prefix}: UUID not present in identity registry`);
      continue;
    }
    if (record.construction_code !== decision.construction_code) {
      failures.push(`${prefix}: code mismatch; registry has ${record.construction_code}`);
    }
    if (!(record.legacy_labels || []).includes(decision.legacy_label)) {
      failures.push(`${prefix}: legacy label ${decision.legacy_label} is not attached to the UUID`);
    }
    for (const field of [
      "approved_canonical_name", "claim_layer", "profile_description",
      "behavior_research_alignment", "terminology_alignment", "recommended_action",
      "status_recommendation", "rationale"
    ]) {
      if (typeof decision[field] !== "string" || !decision[field].trim()) {
        failures.push(`${prefix}: missing ${field}`);
      }
    }
    if (!Number.isInteger(decision.record_revision) || decision.record_revision < 2) {
      failures.push(`${prefix}: record_revision must be an integer >= 2`);
    }
    if (!decision.evidence_basis || !Array.isArray(decision.evidence_basis.source_ids) ||
        !Array.isArray(decision.evidence_basis.runtime_locations) ||
        typeof decision.evidence_basis.test_file !== "string") {
      failures.push(`${prefix}: invalid evidence_basis`);
    }
    if (!Array.isArray(decision.source_terms) || !Array.isArray(decision.unresolved_blockers)) {
      failures.push(`${prefix}: source_terms and unresolved_blockers must be arrays`);
    }
  }
  if (failures.length) {
    throw new Error(`Construction adjudication validation failed:\n- ${failures.join("\n- ")}`);
  }
}

function applyAdjudications(registry, adjudications) {
  const byUuid = new Map(registry.records.map((record) => [record.construction_uuid, record]));
  for (const decision of adjudications.records) {
    const record = byUuid.get(decision.construction_uuid);
    const priorCanonicalName = record.canonical_name;
    const automaticRiskFlags = record.label_review?.automatic_risk_flags || [];

    record.canonical_name = decision.approved_canonical_name;
    record.claim_layer = decision.claim_layer;
    record.family_name = decision.family_name ?? null;
    record.profile_name = decision.profile_name ?? null;
    record.profile_description = decision.profile_description;
    record.learner_label = decision.learner_label ?? null;
    record.source_terms = decision.source_terms;
    record.former_names = uniqueStrings([
      ...(record.former_names || []),
      ...(decision.former_names || []),
      ...(priorCanonicalName !== decision.approved_canonical_name ? [priorCanonicalName] : []),
    ]).sort();
    record.record_revision = decision.record_revision;
    record.label_review = {
      review_state: "complete",
      behavior_research_alignment: decision.behavior_research_alignment,
      terminology_alignment: decision.terminology_alignment,
      recommended_action: decision.recommended_action,
      automatic_risk_flags: automaticRiskFlags,
      review_notes: `Expert adjudication ${adjudications.adjudicated_on}. ${decision.rationale} Status recommendation: ${decision.status_recommendation}`,
    };
  }
  return registry;
}

for (const file of [registryPath, adjudicationPath]) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${path.relative(root, file)}`);
}

const currentRegistry = readJson(registryPath);
const adjudications = readJson(adjudicationPath);
validate(adjudications, currentRegistry);
const expectedRegistry = applyAdjudications(JSON.parse(JSON.stringify(currentRegistry)), adjudications);
const expectedText = stableJson(expectedRegistry);
const currentText = stableJson(currentRegistry);

if (writeMode) {
  fs.writeFileSync(registryPath, expectedText);
} else if (expectedText !== currentText) {
  throw new Error("Construction identity registry does not reflect the committed adjudication decisions. Run npm run adjudication:apply.");
}

console.log(JSON.stringify({
  schema: "canto-span-construction-adjudication-application-v1",
  mode: writeMode ? "write" : "check",
  adjudicated_records: adjudications.records.length,
  status: "PASS"
}, null, 2));
