#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const registryPath = path.join(root, "data", "construction-identities.json");
const adjudicationPath = path.join(root, "data", "construction-adjudications.json");
const batchDir = path.join(root, "data", "construction-adjudication-batches");
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

function adjudicationFiles() {
  const files = [adjudicationPath];
  if (fs.existsSync(batchDir)) {
    for (const name of fs.readdirSync(batchDir).filter((name) => name.endsWith(".json")).sort()) {
      files.push(path.join(batchDir, name));
    }
  }
  return files;
}

function validateDocuments(documents, registry) {
  const failures = [];
  const registryByUuid = new Map((registry.records || []).map((record) => [record.construction_uuid, record]));
  const seenUuids = new Set();
  const seenCodes = new Set();

  for (const { file, document } of documents) {
    const fileLabel = path.relative(root, file);
    if (document.schema !== "canto-span-construction-adjudications-v1") {
      failures.push(`${fileLabel}: unexpected adjudication schema: ${String(document.schema)}`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(document.adjudicated_on || ""))) {
      failures.push(`${fileLabel}: adjudicated_on must use YYYY-MM-DD`);
    }
    if (!Array.isArray(document.records)) {
      failures.push(`${fileLabel}: records must be an array`);
      continue;
    }

    for (const decision of document.records) {
      const prefix = `${fileLabel}:${decision.construction_code || decision.construction_uuid || "<unknown>"}`;
      if (seenUuids.has(decision.construction_uuid)) failures.push(`${prefix}: duplicate adjudication UUID across batches`);
      seenUuids.add(decision.construction_uuid);
      if (seenCodes.has(decision.construction_code)) failures.push(`${prefix}: duplicate adjudication code across batches`);
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
  }

  if (failures.length) {
    throw new Error(`Construction adjudication validation failed:\n- ${failures.join("\n- ")}`);
  }
}

function applyDecision(record, decision, adjudicatedOn) {
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
    review_notes: `Expert adjudication ${adjudicatedOn}. ${decision.rationale} Status recommendation: ${decision.status_recommendation}`,
  };
}

function applyAdjudications(registry, documents) {
  const byUuid = new Map(registry.records.map((record) => [record.construction_uuid, record]));
  for (const { document } of documents) {
    for (const decision of document.records) {
      applyDecision(byUuid.get(decision.construction_uuid), decision, document.adjudicated_on);
    }
  }
  return registry;
}

for (const file of [registryPath, adjudicationPath]) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${path.relative(root, file)}`);
}

const currentRegistry = readJson(registryPath);
const documents = adjudicationFiles().map((file) => ({ file, document: readJson(file) }));
validateDocuments(documents, currentRegistry);
const expectedRegistry = applyAdjudications(JSON.parse(JSON.stringify(currentRegistry)), documents);
const expectedText = stableJson(expectedRegistry);
const currentText = stableJson(currentRegistry);
const adjudicatedCount = documents.reduce((sum, item) => sum + item.document.records.length, 0);

if (writeMode) {
  fs.writeFileSync(registryPath, expectedText);
} else if (expectedText !== currentText) {
  throw new Error("Construction identity registry does not reflect the committed adjudication decisions. Run npm run adjudication:apply.");
}

console.log(JSON.stringify({
  schema: "canto-span-construction-adjudication-application-v1",
  mode: writeMode ? "write" : "check",
  adjudication_documents: documents.length,
  adjudicated_records: adjudicatedCount,
  status: "PASS"
}, null, 2));
