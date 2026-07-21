#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const migrationDate = "2026-07-21";
const grammarDir = path.join(root, "grammar");
const archiveDir = path.join(root, "archive", "registry-pre-obsidian-v0.5.184");
const snapshotFile = path.join(archiveDir, "full-construction-registry.json");

function readText(file) {
  return fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
}

function parseTsv(file) {
  const text = readText(file).trimEnd();
  if (!text) return [];
  const lines = text.split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.filter(Boolean).map((line) => {
    const values = line.split("\t");
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]));
  });
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function splitSemi(value) {
  return String(value || "").split(/[;,]/).map((x) => x.trim()).filter(Boolean);
}

function yamlScalar(value) {
  if (value === null || value === undefined || value === "") return "null";
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  return JSON.stringify(String(value));
}

function yamlArray(values) {
  return `[${values.map((x) => JSON.stringify(String(x))).join(", ")}]`;
}

function extractObjectLiteral(source, marker) {
  const markerAt = source.indexOf(marker);
  if (markerAt < 0) throw new Error(`Missing marker: ${marker}`);
  const start = source.indexOf("{", markerAt + marker.length);
  if (start < 0) throw new Error(`Missing object after marker: ${marker}`);
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error(`Unclosed object after marker: ${marker}`);
}

function chooseSourceRecord(existing, candidate, filename) {
  const score = (record, file) => {
    let n = 0;
    if (record.citation) n += 10;
    if (record.canonical_uri) n += 8;
    if (record.verified_locator) n += 6;
    if (/VERIFIED|REOPENED|PASS/.test(record.verification_state || record.access_status || record.verification_result || "")) n += 5;
    if (/R37/.test(file)) n += 20;
    if (/CP023-P1-PROG01-SOURCE-REGISTER-R3/.test(file)) n += 18;
    return n;
  };
  if (!existing) return { ...candidate, __file: filename };
  return score(candidate, filename) > score(existing, existing.__file || "")
    ? { ...candidate, __file: filename }
    : existing;
}

function buildSnapshot() {
  const current = path.join(root, "docs", "research");
  const frozenInputs = path.join(archiveDir, "input-files");
  const statusRows = parseTsv(path.join(frozenInputs, "CONSTRUCTION-STATUS-REGISTRY-v0.5.184-R2.tsv"));
  const accountingRows = parseTsv(path.join(frozenInputs, "ACTIVE-SOURCE-ACCOUNTING-v0.5.184-R1.tsv"));
  const reauditRows = parseTsv(path.join(frozenInputs, "CONSTRUCTION-EVIDENCE-REAUDIT-LEDGER-v0.5.184-R1.tsv"));
  const authorityRows = parseTsv(path.join(root, "test-data", "grammar-authority-origin-CP021B.tsv"));
  const claimRows = parseTsv(path.join(root, "test-data", "grammar-claim-provenance-CP021B.tsv"));
  const consolidationRows = parseTsv(path.join(current, "PARSER-CONSTRUCTION-CANONICAL-CONSOLIDATION-MATRIX-CP021B-R35.tsv"));

  const mainSource = readText(path.join(root, "main.js"));
  const embedded = JSON.parse(extractObjectLiteral(
    mainSource,
    "const GRAMMAR_LEGITIMACY_BY_CONSTRUCTION = Object.freeze("
  ));

  const sourceRecords = new Map();
  for (const file of walk(current).filter((f) => /SOURCE-REGISTER.*\.tsv$/i.test(path.basename(f)))) {
    const rows = parseTsv(file);
    if (!rows.length || !("source_id" in rows[0])) continue;
    for (const row of rows) {
      sourceRecords.set(row.source_id, chooseSourceRecord(sourceRecords.get(row.source_id), row, path.relative(root, file)));
    }
  }

  if (!sourceRecords.has("SRC-HKCANCOR-PYCANTONESE-CP024-DEMO01")) {
    sourceRecords.set("SRC-HKCANCOR-PYCANTONESE-CP024-DEMO01", {
      source_id: "SRC-HKCANCOR-PYCANTONESE-CP024-DEMO01",
      citation: "HKCanCor recordings preserved through the project PyCantonese 5.0.0 evidence distribution",
      publication_type: "annotated spoken Cantonese corpus",
      canonical_uri: "",
      verified_locator: "FC-020_v.cha turn 445; FC-026_v2.cha turn 234; FC-046_v2.cha turn 117; FC-108c_v2.cha turn 348; FC-R017_v.cha turn 225",
      verification_state: "MANUALLY_REVIEWED_FIVE_RECORDS",
      claim_scope: "Five overt demonstrative-classifier-noun spans from five recording files and participant records.",
      important_limit: "One corpus collection; incidental retrieval inventory; no frequency inference, arbitrary classifier-head compatibility, silent numeral, headless form, or unique syntactic theory.",
      __file: "archive/abandoned-demo01/v0.5.184/docs-research/CP024-P1-DEMO01-NATURAL-ATTESTATION-ADJUDICATION-R1.md",
    });
  }

  const exactLocators = new Map();
  for (const file of walk(current).filter((f) => /SOURCE-MATRIX.*\.tsv$/i.test(path.basename(f)))) {
    const rows = parseTsv(file);
    if (!rows.length || !("construction" in rows[0]) || !("source_id" in rows[0])) continue;
    for (const row of rows) {
      const key = `${row.construction}\u0000${row.source_id}`;
      const priority = /R37/.test(path.basename(file)) ? 100 : Number((path.basename(file).match(/R(\d+)/) || [])[1] || 0);
      const prior = exactLocators.get(key);
      if (!prior || priority >= prior.priority) exactLocators.set(key, { ...row, priority, file: path.relative(root, file) });
    }
  }

  const specialVerification = new Map();
  const specialFiles = [
    ["PostverbalZoPerfectiveVP", path.join(current, "CP025-P1-PFV01-SOURCE-VERIFICATION-R1.tsv")],
    ["ResourceUseLaiFunctionRelation", path.join(current, "CP026-P1-RUL01-SOURCE-VERIFICATION-R1.tsv")],
  ];
  for (const [label, file] of specialFiles) {
    if (!fs.existsSync(file)) continue;
    for (const row of parseTsv(file)) specialVerification.set(`${label}\u0000${row.source_id}`, { ...row, file: path.relative(root, file) });
  }

  const byStatus = new Map(statusRows.map((r) => [r.runtime_label, r]));
  const byAccounting = new Map(accountingRows.map((r) => [r.runtime_label, r]));
  const byReaudit = new Map(reauditRows.map((r) => [r.pattern, r]));
  const byAuthority = new Map(authorityRows.map((r) => [r.runtime_label, r]));
  const byClaim = new Map();
  for (const row of claimRows) {
    if (!byClaim.has(row.runtime_label)) byClaim.set(row.runtime_label, []);
    byClaim.get(row.runtime_label).push(row);
  }
  const byConsolidation = new Map(consolidationRows.map((r) => [r.runtime_label, r]));

  const testFiles = walk(path.join(root, "test-data"))
    .concat(walk(path.join(root, "review-packets")))
    .filter((f) => /\.(json|tsv|md|txt)$/i.test(f));
  const testTexts = testFiles.map((file) => [file, readText(file)]);

  const records = statusRows.map((status) => {
    const label = status.runtime_label;
    const accounting = byAccounting.get(label) || {};
    const sourceIds = splitSemi(accounting.mapped_external_source_ids);
    const sources = sourceIds.map((sourceId) => {
      const base = sourceRecords.get(sourceId) || {};
      const exact = exactLocators.get(`${label}\u0000${sourceId}`) || {};
      const special = specialVerification.get(`${label}\u0000${sourceId}`) || {};
      return {
        source_id: sourceId,
        citation: base.citation || special.citation || sourceId,
        publication_type: base.publication_type || special.source_role || "",
        uri: base.canonical_uri || "",
        locator: special.access_and_locator || special.exact_locator || exact.exact_locator || base.verified_locator || "",
        verification: special.verification_result || special.access_status || base.verification_state || "",
        supports: special.exact_claim_support || special.finding || exact.source_proposition || base.claim_scope || "",
        limitation: special.semantic_caution || special.limitation || exact.forbidden_inference || base.important_limit || "",
      };
    });
    const testReferences = testTexts
      .filter(([, text]) => text.includes(label))
      .map(([file]) => path.relative(root, file))
      .sort();
    return {
      runtime_label: label,
      status,
      embedded: embedded[label] || {},
      accounting,
      reaudit: byReaudit.get(label) || null,
      authority: byAuthority.get(label) || null,
      claims: byClaim.get(label) || [],
      consolidation: byConsolidation.get(label) || null,
      sources,
      test_references: testReferences,
    };
  });

  if (records.length !== 171) throw new Error(`Expected 171 active records, found ${records.length}`);
  fs.mkdirSync(archiveDir, { recursive: true });
  fs.writeFileSync(snapshotFile, JSON.stringify({
    schema: "canto-span-pre-obsidian-full-registry-v1",
    runtime_version: "v0.5.184",
    migrated_on: migrationDate,
    active_record_count: records.length,
    note: "Frozen full-schema migration source. Individual grammar notes became authoritative after this export.",
    records,
  }, null, 2) + "\n");
  return records;
}

function loadRecords() {
  if (!fs.existsSync(snapshotFile)) return buildSnapshot();
  const snapshot = JSON.parse(readText(snapshotFile));
  if (!Array.isArray(snapshot.records) || snapshot.records.length !== 171) {
    throw new Error(`Invalid frozen snapshot record count: ${snapshot.records?.length}`);
  }
  return snapshot.records;
}

function renderNote(record, familyMembers) {
  const { runtime_label: label, status, embedded, accounting, reaudit, authority, claims, consolidation, sources, test_references: tests } = record;
  const claim = status.claim_layer === "internal_representation"
    ? (embedded.parser_representation_decision || `Internal parser representation named ${label}.`)
    : (embedded.language_claim || `The exact Cantonese claim represented by ${label} remains to be established.`);
  const speakerCount = Number(embedded.native_naturalness_source_count || authority?.native_surface_review_count || 0);
  const speakerScope = embedded.native_validation_scope || embedded.native_naturalness_scope || "NOT_ESTABLISHED";
  const sourceIds = sources.map((s) => s.source_id);
  const lastReviewed = ["PostverbalZoPerfectiveVP", "ResourceUseLaiFunctionRelation"].includes(label) ? migrationDate : "unknown";
  const related = familyMembers.filter((x) => x !== label).sort();
  const claimRow = claims.find((r) => r.claim_layer === status.claim_layer) || claims[0] || {};

  const lines = [
    "---",
    `title: ${yamlScalar(label)}`,
    `type: ${yamlScalar("canto-span-construction")}`,
    `construction: ${yamlScalar(label)}`,
    `status: ${yamlScalar(status.current_linguistic_status)}`,
    `confidence: ${yamlScalar(status.linguistic_confidence_state)}`,
    `claim_layer: ${yamlScalar(status.claim_layer)}`,
    `lane: ${yamlScalar(embedded.lane || consolidation?.lane || "unknown")}`,
    `last_reviewed: ${yamlScalar(lastReviewed)}`,
    `last_status_migrated: ${yamlScalar(migrationDate)}`,
    `speaker_count: ${speakerCount}`,
    `source_count: ${sources.length}`,
    `source_ids: ${yamlArray(sourceIds)}`,
    `runtime_active: true`,
    `runtime_code_references: ${Number(status.runtime_code_reference_count || 0)}`,
    `accepted_fixtures: ${Number(status.accepted_fixture_count || 0)}`,
    `tags: ${yamlArray(["canto-span/grammar", `canto-span/status/${status.current_linguistic_status}`, `canto-span/lane/${String(embedded.lane || consolidation?.lane || "unknown").toLowerCase()}`])}`,
    "---",
    "",
    `# ${label}`,
    "",
    "## Plain-language claim",
    "",
    claim,
    "",
  ];

  if (status.claim_layer === "language") {
    lines.push("This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.", "");
  } else {
    lines.push("This is an internal parser representation. It does not independently license a Cantonese construction claim.", "");
  }

  lines.push("## Current status", "");
  lines.push(`- Linguistic status: \`${status.current_linguistic_status}\``);
  lines.push(`- Linguistic confidence: \`${status.linguistic_confidence_state}\``);
  lines.push(`- Current action: \`${embedded.action || claimRow.current_action || "not_recorded"}\``);
  lines.push(`- Productive acceptance eligible: **${String(status.productive_acceptance_eligible).toLowerCase() === "true" ? "yes" : "no"}**`);
  lines.push(`- Last linguistic review: ${lastReviewed === "unknown" ? "not recorded" : lastReviewed}`);
  lines.push("");

  lines.push("## Sources", "");
  if (!sources.length) {
    lines.push("No pattern-specific external source is currently mapped.", "");
  } else {
    for (const source of sources) {
      const citation = source.uri ? `[${source.citation}](${source.uri})` : source.citation;
      lines.push(`### ${source.source_id}`, "");
      lines.push(`- Citation: ${citation}`);
      lines.push(`- Locator: ${source.locator || "not recorded"}`);
      lines.push(`- Verification: \`${source.verification || "not recorded"}\``);
      lines.push(`- What it supports: ${source.supports || "The exact construction-specific support remains to be restated."}`);
      lines.push(`- Limit: ${source.limitation || "No construction-specific limitation was recorded in the migrated source table."}`);
      lines.push("");
    }
  }

  lines.push("## Native-speaker review", "");
  lines.push(`- Independent speaker records: **${speakerCount}**`);
  lines.push(`- Scope: \`${speakerScope}\``);
  lines.push(`- Surface judgments: ${Number(embedded.native_naturalness_judgment_count || 0)} total; ${Number(embedded.native_naturalness_acceptable_count || 0)} accepted; ${Number(embedded.native_naturalness_rejected_count || 0)} rejected.`);
  lines.push(`- Structural-analysis validations: ${Number(embedded.native_analysis_validation_count || 0)}.`);
  if (reaudit?.second_speaker_record) lines.push(`- Second-speaker state: \`${reaudit.second_speaker_record}\`.`);
  lines.push("");

  lines.push("## Negative and boundary cases", "");
  lines.push(`- Evidence state: \`${embedded.negative_boundary_evidence || reaudit?.negative_boundary_record || "none_recorded"}\``);
  if (tests.length) {
    lines.push("- Executable or review records containing this label:");
    for (const file of tests.slice(0, 20)) lines.push(`  - \`${file}\``);
    if (tests.length > 20) lines.push(`  - ${tests.length - 20} additional matching records are retained in the frozen full-schema snapshot.`);
  } else {
    lines.push("- No construction-specific executable test record was located by the migration script.");
  }
  lines.push("");

  lines.push("## Implementation state", "");
  lines.push(`- Lifecycle: \`${status.implementation_lifecycle}\``);
  lines.push(`- Visible/focused tests: \`${status.visible_or_focused_test_status}\``);
  lines.push(`- Render review: \`${status.render_review_status}\``);
  lines.push(`- Held-out evaluation: \`${status.held_out_status}\``);
  lines.push(`- Regression: \`${status.regression_status}\``);
  lines.push(`- Code–documentation comparison: \`${status.code_document_alignment_status}\``);
  lines.push("");

  lines.push("## Open questions and blockers", "");
  const blockers = [
    claimRow.promotion_blocker,
    reaudit?.provisional_blockers,
    reaudit?.productive_blockers,
    authority?.limitations,
    status.note,
  ].filter(Boolean);
  if (blockers.length) for (const blocker of [...new Set(blockers)]) lines.push(`- ${blocker}`);
  else lines.push("- No specific blocker was migrated; status remains controlling.");
  if (claimRow.next_research_form) lines.push(`- Research question: ${claimRow.next_research_form}`);
  if (reaudit?.next_action) lines.push(`- Next evidence action: ${reaudit.next_action}`);
  lines.push("");

  lines.push("## Related constructions", "");
  if (related.length) for (const other of related) lines.push(`- [[${other}]]`);
  else lines.push("No same-family active construction was identified in the canonical consolidation table.");
  lines.push("");

  lines.push("## Migration provenance", "");
  lines.push(`- Full pre-migration record: \`archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json\``);
  lines.push(`- Status migration date: ${migrationDate}.`);
  lines.push("- The frozen JSON preserves the former wide schema; this note is the active authoring record.", "");
  return lines.join("\n").replace(/\n+$/, "") + "\n";
}

function main() {
  const records = loadRecords();
  const active = new Set(records.map((r) => r.runtime_label));
  const familyMap = new Map();
  for (const record of records) {
    const family = record.consolidation?.canonical_family || `__${record.runtime_label}`;
    if (!familyMap.has(family)) familyMap.set(family, []);
    familyMap.get(family).push(record.runtime_label);
  }

  fs.rmSync(grammarDir, { recursive: true, force: true });
  fs.mkdirSync(grammarDir, { recursive: true });
  for (const record of records) {
    const family = record.consolidation?.canonical_family || `__${record.runtime_label}`;
    const file = path.join(grammarDir, `${record.runtime_label}.md`);
    fs.writeFileSync(file, renderNote(record, (familyMap.get(family) || []).filter((x) => active.has(x))));
  }

  const counts = {};
  for (const record of records) counts[record.status.current_linguistic_status] = (counts[record.status.current_linguistic_status] || 0) + 1;
  const index = [
    "---",
    "title: Canto Span — Grammar Index",
    "type: framework-note",
    "status: current",
    "tags: [canto-span/grammar, canto-span/index]",
    "---",
    "",
    "# Grammar index",
    "",
    `Active construction notes: **${records.length}**`,
    "",
    "## Status counts",
    "",
    ...Object.entries(counts).sort().map(([status, count]) => `- \`${status}\`: **${count}**`),
    "",
    "## Constructions",
    "",
    ...records.map((r) => `- [[${r.runtime_label}]] — \`${r.status.current_linguistic_status}\``),
    "",
  ].join("\n");
  fs.writeFileSync(path.join(root, "GRAMMAR-INDEX.md"), index.replace(/\n+$/, "") + "\n");

  console.log(JSON.stringify({ status: "PASS", construction_notes: records.length, counts, snapshot: path.relative(root, snapshotFile) }, null, 2));
}

main();
