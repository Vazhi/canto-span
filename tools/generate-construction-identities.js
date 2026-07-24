#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const registryPath = path.join(root, "data", "construction-identities.json");
const sweepPath = path.join(root, "data", "construction-label-sweep.json");
const reportPath = path.join(root, "docs", "research", "FULL-REPO-LABEL-SWEEP-BASELINE-R1.md");
const retiredPath = path.join(root, "docs", "research", "RETIRED-CONSTRUCTION-ARCHIVE-v0.5.186-R1.tsv");
const MIGRATION_NAMESPACE_UUID = "b7254734-8d7d-4882-95cb-bf7bb2230314";
const BOOTSTRAP_DATE = "2026-07-24";
const writeMode = process.argv.includes("--write");

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

function uuidBytes(uuid) {
  const normalized = uuid.replace(/-/g, "");
  if (!/^[0-9a-fA-F]{32}$/.test(normalized)) throw new Error(`Invalid UUID: ${uuid}`);
  return Buffer.from(normalized, "hex");
}

function formatUuid(bytes) {
  const hex = Buffer.from(bytes).toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function uuidV5(namespaceUuid, name) {
  const hash = crypto.createHash("sha1")
    .update(uuidBytes(namespaceUuid))
    .update(Buffer.from(name, "utf8"))
    .digest();
  hash[6] = (hash[6] & 0x0f) | 0x50;
  hash[8] = (hash[8] & 0x3f) | 0x80;
  return formatUuid(hash.subarray(0, 16));
}

function codeForOrdinal(ordinal) {
  if (!Number.isInteger(ordinal) || ordinal < 1) throw new Error(`Invalid ordinal: ${ordinal}`);
  const zero = ordinal - 1;
  const block = Math.floor(zero / 99);
  const number = (zero % 99) + 1;
  const first = Math.floor(block / 26);
  const second = block % 26;
  if (first >= 26) throw new Error("Construction code space exhausted");
  return `${String.fromCharCode(65 + first)}${String.fromCharCode(65 + second)}${String(number).padStart(2, "0")}`;
}

function plainLanguageClaim(note) {
  const match = note.body.match(/## Plain-language claim\s*\n\s*([\s\S]*?)(?:\n\s*\n|$)/);
  return match ? match[1].replace(/\s+/g, " ").trim() : `Current construction record for ${note.frontmatter.construction}.`;
}

function normalizeClaimLayer(raw, status) {
  if (status === "parser_heuristic") return "parser_representation";
  const value = String(raw || "").toLowerCase();
  if (value.includes("parser") || value.includes("internal")) return "parser_representation";
  if (value.includes("compatibility") || value.includes("alias")) return "compatibility_alias";
  if (value.includes("diagnostic")) return "diagnostic_state";
  if (value.includes("language")) return "language_construction";
  return "unresolved";
}

function automaticRiskFlags(name, status, lifecycleState, claimLayer) {
  const flags = [];
  if (/(Frame|Clause|Predicate|Fragment|Relation|Span|Graph|Edge|Unit)$/.test(name)) {
    flags.push("generic_head_requires_boundary_definition");
  }
  if (/(And|With|Then|Into)/.test(name)) flags.push("possible_bundled_or_cross_layer_name");
  const layerTokens = [
    "Progressive", "Perfective", "Experiential", "Modal", "Negative", "Negated",
    "Causative", "Result", "Directional", "Motion", "Purpose", "Place", "Locative",
    "Question", "Transfer", "Possessive", "Transformation", "Evaluation", "Stative",
    "Temporal", "Classifier", "Demonstrative", "Quantified", "Complement", "Topic"
  ];
  const layerCount = layerTokens.filter((token) => name.includes(token)).length;
  if (layerCount >= 3) flags.push("possible_multi_layer_construction_bundle");
  if (/(Scheduling|Cognition|Speech|Opinion|Preference|Identity|Naming|Evaluation|ResourceUse|TimeToAction)/.test(name)) {
    flags.push("semantic_domain_name_requires_structural_scope_check");
  }
  if (status === "unsupported_generalization") flags.push("unsupported_generalization_requires_source_runtime_reconciliation");
  if (status === "parser_heuristic" || claimLayer === "parser_representation") flags.push("internal_representation_name_review");
  if (lifecycleState === "retired") flags.push("retired_label_research_home_check");
  return [...new Set(flags)].sort();
}

function discoveredRecords() {
  const current = loadConstructionNotes(root).map((note) => {
    const fm = note.frontmatter;
    const name = String(fm.construction);
    const status = String(fm.status);
    const claimLayer = normalizeClaimLayer(fm.claim_layer, status);
    return {
      canonical_name: name,
      legacy_labels: [name],
      claim_layer: claimLayer,
      linguistic_status: status,
      lifecycle_state: "current",
      source_path: path.relative(root, note.file).replace(/\\/g, "/"),
      profile_description: plainLanguageClaim(note),
      automatic_risk_flags: automaticRiskFlags(name, status, "current", claimLayer),
    };
  });

  const retired = parseTsv(retiredPath).map((row) => {
    const name = row.runtime_label;
    const status = row.prior_linguistic_status || "retired";
    const claimLayer = normalizeClaimLayer("", status);
    return {
      canonical_name: name,
      legacy_labels: [name],
      claim_layer: claimLayer,
      linguistic_status: "retired",
      lifecycle_state: "retired",
      source_path: path.relative(root, retiredPath).replace(/\\/g, "/"),
      profile_description: row.reason || `Retired construction record for ${name}.`,
      automatic_risk_flags: automaticRiskFlags(name, status, "retired", claimLayer),
    };
  });

  const all = [...current, ...retired].sort((a, b) =>
    a.canonical_name < b.canonical_name ? -1 : a.canonical_name > b.canonical_name ? 1 : 0
  );
  const names = new Set();
  for (const record of all) {
    if (names.has(record.canonical_name)) throw new Error(`Duplicate current/retired label: ${record.canonical_name}`);
    names.add(record.canonical_name);
  }
  return all;
}

function loadExistingRegistry() {
  if (!fs.existsSync(registryPath)) return null;
  return JSON.parse(fs.readFileSync(registryPath, "utf8"));
}

function buildRegistry() {
  const discovered = discoveredRecords();
  const existing = loadExistingRegistry();
  const existingByLegacy = new Map();
  if (existing) {
    for (const record of existing.records || []) {
      for (const label of record.legacy_labels || []) existingByLegacy.set(label, record);
    }
  }

  const records = discovered.map((item, index) => {
    const prior = existingByLegacy.get(item.canonical_name);
    if (existing && !prior) {
      throw new Error(
        `Discovered label ${item.canonical_name} has no permanent identity. ` +
        "Allocate it explicitly before regenerating the registry."
      );
    }
    const constructionUuid = prior?.construction_uuid || uuidV5(
      MIGRATION_NAMESPACE_UUID,
      `canto-span-legacy-label:${item.canonical_name}`
    );
    const constructionCode = prior?.construction_code || codeForOrdinal(index + 1);
    const priorReview = prior?.label_review;
    return {
      construction_uuid: constructionUuid,
      construction_code: constructionCode,
      canonical_name: prior?.canonical_name || item.canonical_name,
      legacy_labels: [...new Set([...(prior?.legacy_labels || []), ...item.legacy_labels])].sort(),
      claim_layer: prior?.claim_layer || item.claim_layer,
      linguistic_status: item.linguistic_status,
      lifecycle_state: item.lifecycle_state,
      source_path: item.source_path,
      family_name: prior?.family_name ?? null,
      profile_name: prior?.profile_name ?? null,
      profile_description: prior?.profile_description || item.profile_description,
      learner_label: prior?.learner_label ?? null,
      source_terms: prior?.source_terms || [],
      former_names: prior?.former_names || [],
      predecessor_uuids: prior?.predecessor_uuids || [],
      successor_uuids: prior?.successor_uuids || [],
      record_revision: prior?.record_revision || 1,
      label_review: priorReview || {
        review_state: "pending",
        behavior_research_alignment: "not_reviewed",
        terminology_alignment: "not_reviewed",
        recommended_action: "not_reviewed",
        automatic_risk_flags: item.automatic_risk_flags,
        review_notes: "",
      },
    };
  });

  const uuidSet = new Set();
  const codeSet = new Set();
  for (const record of records) {
    if (uuidSet.has(record.construction_uuid)) throw new Error(`Duplicate UUID: ${record.construction_uuid}`);
    uuidSet.add(record.construction_uuid);
    if (record.construction_code !== null) {
      if (codeSet.has(record.construction_code)) throw new Error(`Duplicate code: ${record.construction_code}`);
      codeSet.add(record.construction_code);
    }
  }

  return {
    schema: "canto-span-construction-identity-registry-v1",
    migration_namespace_uuid: MIGRATION_NAMESPACE_UUID,
    bootstrap_date: BOOTSTRAP_DATE,
    record_count: records.length,
    current_record_count: records.filter((record) => record.lifecycle_state === "current").length,
    retired_record_count: records.filter((record) => record.lifecycle_state === "retired").length,
    records,
  };
}

function buildSweep(registry) {
  const records = registry.records.map((record) => ({
    construction_uuid: record.construction_uuid,
    construction_code: record.construction_code,
    canonical_name: record.canonical_name,
    lifecycle_state: record.lifecycle_state,
    claim_layer: record.claim_layer,
    linguistic_status: record.linguistic_status,
    source_path: record.source_path,
    review_state: record.label_review.review_state,
    behavior_research_alignment: record.label_review.behavior_research_alignment,
    terminology_alignment: record.label_review.terminology_alignment,
    recommended_action: record.label_review.recommended_action,
    automatic_risk_flags: record.label_review.automatic_risk_flags,
  }));
  const flagCounts = {};
  for (const record of records) {
    for (const flag of record.automatic_risk_flags) flagCounts[flag] = (flagCounts[flag] || 0) + 1;
  }
  return {
    schema: "canto-span-full-repo-label-sweep-v1",
    identity_registry_schema: registry.schema,
    record_count: records.length,
    pending_review_count: records.filter((record) => record.review_state !== "complete").length,
    automatic_flag_counts: Object.fromEntries(Object.entries(flagCounts).sort(([a], [b]) => a.localeCompare(b))),
    records,
  };
}

function buildReport(registry, sweep) {
  const flagged = sweep.records.filter((record) => record.automatic_risk_flags.length > 0);
  const flagRows = Object.entries(sweep.automatic_flag_counts)
    .map(([flag, count]) => `| \`${flag}\` | ${count} |`)
    .join("\n") || "| _none_ | 0 |";
  return `# Full-repository label sweep baseline R1\n\n` +
    `**Bootstrap date:** ${BOOTSTRAP_DATE}  \n` +
    `**Permanent records:** ${registry.record_count}  \n` +
    `**Current records:** ${registry.current_record_count}  \n` +
    `**Retired records:** ${registry.retired_record_count}  \n` +
    `**Records with automatic screening flags:** ${flagged.length}\n\n` +
    `This baseline assigns permanent identities and opens a review row for every current and retired label. ` +
    `It does **not** approve any label, linguistic analysis, implementation behavior, or retirement.\n\n` +
    `## Identity policy\n\n` +
    `- UUID is the immutable machine key.\n` +
    `- The short code is an immutable human reference.\n` +
    `- Canonical names may change after research.\n` +
    `- Learner labels may be shared by multiple UUIDs.\n` +
    `- Automatic flags identify review priorities only.\n\n` +
    `## Automatic screening summary\n\n` +
    `| Flag | Records |\n|---|---:|\n${flagRows}\n\n` +
    `## Required manual sweep\n\n` +
    `For each record, compare the actual runtime behavior with the strongest scope-matched research, then record ` +
    `terminology alignment and one disposition: retain, rename, narrow, split, merge, internalize, supersede, ` +
    `quarantine, keep retired, or reopen research. Source terminology must be stored as aliases rather than ` +
    `silently replacing identity.\n`;
}

function stableJson(value) {
  return JSON.stringify(value, null, 2) + "\n";
}

function writeOrCheck(file, content) {
  if (writeMode) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
    return;
  }
  if (!fs.existsSync(file)) throw new Error(`Missing generated file: ${path.relative(root, file)}`);
  const current = fs.readFileSync(file, "utf8");
  if (current !== content) throw new Error(`Generated file is stale: ${path.relative(root, file)}`);
}

const registry = buildRegistry();
const sweep = buildSweep(registry);
const report = buildReport(registry, sweep);
writeOrCheck(registryPath, stableJson(registry));
writeOrCheck(sweepPath, stableJson(sweep));
writeOrCheck(reportPath, report);
console.log(JSON.stringify({
  schema: "canto-span-construction-identity-generation-v1",
  mode: writeMode ? "write" : "check",
  records: registry.record_count,
  current: registry.current_record_count,
  retired: registry.retired_record_count,
  status: "PASS",
}, null, 2));
