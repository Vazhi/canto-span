#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const crypto = require("node:crypto");

function read(path) {
  return fs.readFileSync(path, "utf8").replace(/^\uFEFF/u, "");
}
function write(path, value) {
  fs.writeFileSync(path, value);
}
function parseTsv(text) {
  const lines = text.trimEnd().split(/\r?\n/u);
  const header = lines.shift().split("\t");
  return {
    header,
    rows: lines.map((line) => {
      const cells = line.split("\t");
      return Object.fromEntries(header.map((name, index) => [name, cells[index] === undefined ? "" : cells[index]]));
    }),
  };
}
function writeTsv(path, header, rows) {
  const lines = [header.join("\t")];
  for (const row of rows) lines.push(header.map((name) => row[name] === undefined ? "" : row[name]).join("\t"));
  write(path, `${lines.join("\n")}\n`);
}

const reviewedPath = "src/runtime-resources/lexicon/token-lexicon/cifu-r1751-2000-reviewed.js";
let reviewed = read(reviewedPath);
const correctionAnchor = "    const promotion = PROMOTIONS[surface]; let next = entry;\n";
const correction = `    const promotion = PROMOTIONS[surface]; let next = entry;
    if (surface === "嘴" && next) {
      next = {
        ...next,
        label: "what",
        pos: "noun",
        syntax: "common_noun",
        jyutping: "zeoi2",
        note: "Reviewed Cifu ranks 1751–2000 lexical selection: noun mouth / beak / spout",
        provenance: {
          kind: "reviewed_typed_default_correction",
          source: SOURCE,
          rank: 1995,
          pronunciation_status: "reviewed_explicit_reading",
          prior_provenance: next.provenance || null,
        },
      };
    }
`;
if (!reviewed.includes('kind: "reviewed_typed_default_correction"')) {
  if (!reviewed.includes(correctionAnchor)) throw new Error("final-band reviewed default-correction anchor missing");
  reviewed = reviewed.replace(correctionAnchor, correction);
  write(reviewedPath, reviewed);
}

const cifuPath = "data/lexical-frequency/cifu-spoken-top-2000.tsv";
const cifu = parseTsv(read(cifuPath));
if (cifu.rows.length !== 2000) throw new Error(`expected 2000 Cifu rows, got ${cifu.rows.length}`);
for (const field of ["rank", "word", "cifu_spoken_adult"]) {
  if (!cifu.header.includes(field)) throw new Error(`Cifu source missing required field ${field}`);
}
const activeCifuHeader = ["rank", "word", "cifu_spoken_adult"];
writeTsv(cifuPath, activeCifuHeader, cifu.rows);
const cifuSha = crypto.createHash("sha256").update(fs.readFileSync(cifuPath)).digest("hex");

const corePath = "data/lexical-frequency/common-spoken-cantonese-core-2000.tsv";
const core = parseTsv(read(corePath));
if (core.rows.length !== 2000) throw new Error(`expected 2000 common-core rows, got ${core.rows.length}`);
const coreHeader = core.header.filter((field) => field !== "cifu_candidate_jyutping");
writeTsv(corePath, coreHeader, core.rows);

const manifestPath = "data/lexical-frequency/common-spoken-cantonese-core-2000.manifest.json";
const manifest = JSON.parse(read(manifestPath));
manifest.limitations = (manifest.limitations || []).filter((line) => !/Cifu definitions\/Jyutping|Mandarin contamination/u.test(line));
const cleanLimitation = "The active Cifu comparison source contributes rank, surface, and frequency only; imported lexical meanings, candidate readings, and historical runtime audit metadata are intentionally absent.";
if (!manifest.limitations.includes(cleanLimitation)) manifest.limitations.push(cleanLimitation);
manifest.sources.cifu_secondary.role = "secondary rank/frequency comparison only; not mandatory inclusion or lexical authority";
manifest.sources.cifu_secondary.sha256 = cifuSha;
write(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const gapPath = "src/runtime-resources/lexicon/token-lexicon/frequency-gap-fill-r7.js";
let gap = read(gapPath);
const gapPattern = /note: "Cifu SpokenAdult rank (\d+), frequency ([^;\"]+);.*?Exact surface retained as neutral lexical coverage; POS\/grammar-role verification is intentionally separate\."/gu;
let replacements = 0;
gap = gap.replace(gapPattern, (_whole, rank, frequency) => {
  replacements += 1;
  return `note: "Cifu SpokenAdult rank ${rank}, frequency ${frequency}. Exact surface retained as neutral lexical coverage; lexical meaning/category comes only from reviewed overlays or independent evidence."`;
});
if ((gap.includes("Source readings:") || gap.includes("prior audit status")) && replacements === 0) {
  throw new Error("frequency-gap cleanup matched zero entries while stale narrative remains");
}
if (gap.includes("Source readings:") || gap.includes("prior audit status")) throw new Error("frequency-gap imported source narrative remains");
write(gapPath, gap);

const registryPath = "src/runtime-resources/lexicon/lexical-ingestion-registry.js";
let registry = read(registryPath);
registry = registry.replace(/^\s*source_jyutping_column:.*\n/gmu, "");
registry = registry.replace(/^\s*source_jyutping_unknown_values:.*\n/gmu, "");
const oldLedger = '    contamination_ledger: "data/lexical-frequency/cifu-mandarin-contamination-runtime-audit.tsv",';
const newLedger = '    exclusion_ledger: "data/lexical-frequency/cifu-runtime-exclusions.tsv",';
if (registry.includes(oldLedger)) registry = registry.replace(oldLedger, newLedger);
else if (!registry.includes(newLedger)) throw new Error("lexical-ingestion exclusion-ledger anchor missing");
write(registryPath, registry);

const auditPath = "tools/lexical-ingestion-tokenization-audit.js";
let audit = read(auditPath);
audit = audit.replaceAll("spec.contamination_ledger", "spec.exclusion_ledger");
audit = audit.replaceAll("removed_surface_missing_from_contamination_ledger", "removed_surface_missing_from_exclusion_ledger");
audit = audit.replaceAll("contamination_ledger_removal_not_in_runtime_policy", "exclusion_ledger_removal_not_in_runtime_policy");
write(auditPath, audit);

const exclusionPath = "data/lexical-frequency/cifu-runtime-exclusions.tsv";
write(exclusionPath,
  "rank\tsurface\taction\tevidence\n" +
  "1404\t多少\tremove_runtime_surface\tIndependent Cantonese review excludes this whole surface; ordinary Cantonese quantity questions use 幾多.\n"
);

const retired = [
  "data/lexical-frequency/cifu-explicit-mandarin-contamination.tsv",
  "data/lexical-frequency/cifu-mandarin-contamination-runtime-audit.tsv",
  "data/lexical-frequency/cifu-mandarin-contamination-summary.json",
  "data/lexical-frequency/cifu-mandarin-oriented-adjudication.tsv",
];
for (const path of retired) fs.rmSync(path, { force: true });

const docsPath = "docs/research/LEXICAL-COVERAGE-TOP-2000.md";
let docs = read(docsPath);
docs = docs.replace("For disputed Cifu metadata, use independent Cantonese evidence such as:", "For lexical adjudication, use independent Cantonese evidence such as:");
const docsStart = docs.indexOf("## Mandarin-contamination ledgers");
const docsEnd = docs.indexOf("## Regression policy");
if (docsStart !== -1 && docsEnd > docsStart) {
  const replacement = `## Runtime exclusion policy

The active repository does not retain rejected source analyses as historical fallback authority. Cifu contributes rank, exact surface, and frequency only.

- Whole-surface exclusions live in \`data/lexical-frequency/cifu-runtime-exclusions.tsv\` as positive executable constraints.
- Rank 1404 \`多少\` is currently excluded from the effective runtime; ordinary Cantonese quantity questions use \`幾多\`.
- Retained surfaces receive only independently reviewed Cantonese analyses.
- A surface is never deleted merely because it is compositional, rare, formal, domain-specific, or regression-causing.
- When independent evidence changes a lexical judgment, update the reviewed authority and executable runtime state directly rather than preserving superseded source interpretations in active docs/data.

`;
  docs = `${docs.slice(0, docsStart)}${replacement}${docs.slice(docsEnd)}`;
} else if (!docs.includes("## Runtime exclusion policy")) {
  throw new Error("lexical coverage cleanup section anchors missing");
}
write(docsPath, docs);

console.log(JSON.stringify({
  cifu_rows: cifu.rows.length,
  cifu_active_columns: activeCifuHeader,
  common_core_rows: core.rows.length,
  frequency_gap_notes_cleaned_this_run: replacements,
  retired_contamination_artifacts: retired,
  exclusion_registry: exclusionPath,
  lexical_coverage_doc_cleaned: docsPath,
}, null, 2));
