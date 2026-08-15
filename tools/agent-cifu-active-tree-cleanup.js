#!/usr/bin/env node
"use strict";

const fs = require("node:fs");

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

// Replace the contaminated pre-existing 嘴 default with the independently reviewed
// Cantonese noun analysis. Do not carry the superseded default's provenance forward.
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
        },
      };
    }
`;
if (!reviewed.includes('kind: "reviewed_typed_default_correction"')) {
  if (!reviewed.includes(correctionAnchor)) throw new Error("final-band reviewed default-correction anchor missing");
  reviewed = reviewed.replace(correctionAnchor, correction);
  write(reviewedPath, reviewed);
} else {
  reviewed = reviewed.replace(/\n\s*prior_provenance: next\.provenance \|\| null,/u, "");
  write(reviewedPath, reviewed);
}

// The imported Cifu file is immutable source evidence. Verify it, but never rewrite it.
const cifuPath = "data/lexical-frequency/cifu-spoken-top-2000.tsv";
const cifu = parseTsv(read(cifuPath));
if (cifu.rows.length !== 2000) throw new Error(`expected 2000 Cifu rows, got ${cifu.rows.length}`);
for (const field of ["rank", "word", "cifu_spoken_adult"]) {
  if (!cifu.header.includes(field)) throw new Error(`Cifu source missing required field ${field}`);
}

// Remove imported Cifu pronunciation candidates from the canonical Cantonese priority table.
const corePath = "data/lexical-frequency/common-spoken-cantonese-core-2000.tsv";
const core = parseTsv(read(corePath));
if (core.rows.length !== 2000) throw new Error(`expected 2000 common-core rows, got ${core.rows.length}`);
const coreHeader = core.header.filter((field) => field !== "cifu_candidate_jyutping");
writeTsv(corePath, coreHeader, core.rows);

const manifestPath = "data/lexical-frequency/common-spoken-cantonese-core-2000.manifest.json";
const manifest = JSON.parse(read(manifestPath));
manifest.limitations = (manifest.limitations || []).filter((line) => !/Cifu definitions\/Jyutping|Mandarin contamination/u.test(line));
const cleanLimitation = "The raw imported Cifu snapshot is preserved unchanged for source fidelity. Active lexical ingestion uses it only for rank, exact surface, and frequency; imported meanings, candidate readings, and rejected analyses have no Cantonese lexical authority.";
if (!manifest.limitations.includes(cleanLimitation)) manifest.limitations.push(cleanLimitation);
manifest.sources.cifu_secondary.role = "immutable secondary source snapshot; active use limited to rank/frequency discovery, not lexical authority";
write(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

// Remove imported source gloss/readings from active neutral runtime notes.
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

// Active ingestion no longer consumes Cifu candidate pronunciation or contamination history.
// Rank 801 ○ is a reviewed research hold: no Cantonese lexical POS or Jyutping is selected,
// so the runtime must not invent a pronunciation merely to satisfy ingestion coverage.
const registryPath = "src/runtime-resources/lexicon/lexical-ingestion-registry.js";
let registry = read(registryPath);
registry = registry.replace(/^\s*source_jyutping_column:.*\n/gmu, "");
registry = registry.replace(/^\s*source_jyutping_unknown_values:.*\n/gmu, "");
if (!registry.includes("pronunciation_hold_surfaces")) {
  const anchor = "    require_jyutping: true,\n";
  if (!registry.includes(anchor)) throw new Error("lexical-ingestion pronunciation hold anchor missing");
  registry = registry.replace(anchor, `${anchor}    pronunciation_hold_surfaces: surfaceSet(["○"]),\n`, 1);
}
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
if (!audit.includes("const pronunciationHolds = new Set(spec.pronunciation_hold_surfaces || []);")) {
  const removedAnchor = "  const removed = new Set(spec.removed_surfaces || []);\n";
  if (!audit.includes(removedAnchor)) throw new Error("audit pronunciation-hold set anchor missing");
  audit = audit.replace(removedAnchor, `${removedAnchor}  const pronunciationHolds = new Set(spec.pronunciation_hold_surfaces || []);\n`, 1);
}
if (!audit.includes("const reviewedPronunciationHolds = [];")) {
  const listAnchor = "  const sourceUnknownJyutping = [];\n";
  if (!audit.includes(listAnchor)) throw new Error("audit pronunciation-hold list anchor missing");
  audit = audit.replace(listAnchor, `${listAnchor}  const reviewedPronunciationHolds = [];\n`, 1);
}
if (!audit.includes("pronunciationHolds.has(surface)")) {
  const branchAnchor = "      } else if (!runtimeCoverage.covered && !sourceJyutpingKnown(spec, row)) {\n";
  if (!audit.includes(branchAnchor)) throw new Error("audit pronunciation-hold branch anchor missing");
  audit = audit.replace(branchAnchor,
    "      } else if (!runtimeCoverage.covered && pronunciationHolds.has(surface)) {\n" +
    "        reviewedPronunciationHolds.push({ rank, surface });\n" +
    branchAnchor,
    1,
  );
}
if (!audit.includes('code: "reviewed_pronunciation_hold"')) {
  const warningAnchor = "  if (sourceUnknownJyutping.length) {\n";
  if (!audit.includes(warningAnchor)) throw new Error("audit pronunciation-hold warning anchor missing");
  const warning = `  if (reviewedPronunciationHolds.length) {
    warnings.push({
      code: "reviewed_pronunciation_hold",
      count: reviewedPronunciationHolds.length,
      examples: reviewedPronunciationHolds.slice(0, 20),
      note: "Independent review explicitly leaves these source artifacts without a Cantonese lexical pronunciation. This is visible research debt, not a license to fabricate Jyutping.",
    });
  }
`;
  audit = audit.replace(warningAnchor, warning + warningAnchor, 1);
}
write(auditPath, audit);

// Correct the old overly broad identifier for 多少 without changing runtime behavior.
const quantityPolicyPath = "src/runtime-resources/lexicon/token-lexicon/cifu-r1251-1500-runtime-policy.js";
let quantityPolicy = read(quantityPolicyPath);
quantityPolicy = quantityPolicy.replace(
  "// Keep the generated Cifu source as provenance; remove positively identified\n// non-Cantonese whole surfaces only from the reviewed effective runtime layer.\nconst MANDARIN_ONLY_SURFACES = new Set([\"多少\"]);",
  "// Keep the generated Cifu source as immutable source evidence. Standalone 多少 in the\n// quantity-interrogative sense is Standard Written Chinese/Mandarin rather than ordinary\n// vernacular Cantonese; ordinary Cantonese uses 幾多.\nconst EXCLUDED_STANDARD_WRITTEN_SURFACES = new Set([\"多少\"]);",
);
quantityPolicy = quantityPolicy.replace("!MANDARIN_ONLY_SURFACES.has(surface)", "!EXCLUDED_STANDARD_WRITTEN_SURFACES.has(surface)");
quantityPolicy = quantityPolicy.replace("  MANDARIN_ONLY_SURFACES,", "  EXCLUDED_STANDARD_WRITTEN_SURFACES,");
if (quantityPolicy.includes("MANDARIN_ONLY_SURFACES")) throw new Error("stale 多少 Mandarin-only identifier remains");
write(quantityPolicyPath, quantityPolicy);

const quantityTestPath = "tests/tooling/lexicon/cifu-r1251-1500-reviewed-runtime.test.js";
let quantityTest = read(quantityTestPath);
quantityTest = quantityTest.replace("policy.MANDARIN_ONLY_SURFACES", "policy.EXCLUDED_STANDARD_WRITTEN_SURFACES");
quantityTest = quantityTest.replace(
  'test("ranks 1251-1500 retain every Cantonese surface while excluding positive contamination", () => {',
  'test("ranks 1251-1500 retain every Cantonese surface while excluding the reviewed non-vernacular quantity form", () => {',
);
quantityTest = quantityTest.replace(
  '"多少: positive non-Cantonese surface is absent from effective runtime"',
  '"多少: Standard Written Chinese/Mandarin quantity form is absent from the ordinary vernacular Cantonese runtime"',
);
write(quantityTestPath, quantityTest);

const ingestionTestPath = "tests/tooling/lexicon/lexical-ingestion-tokenization-audit.test.js";
let ingestionTest = read(ingestionTestPath);
if (!ingestionTest.includes("reviewed_pronunciation_hold")) {
  const testAnchor = '  assert.deepEqual(cifu.removed_surfaces, ["多少"]);\n';
  if (!ingestionTest.includes(testAnchor)) throw new Error("lexical-ingestion pronunciation hold test anchor missing");
  const addition = '  const pronunciationHold = cifu.warnings.find((item) => item.code === "reviewed_pronunciation_hold");\n' +
    '  assert.ok(pronunciationHold, "reviewed pronunciation hold remains visible");\n' +
    '  assert.deepEqual(pronunciationHold.examples.map((item) => item.surface), ["○"]);\n';
  ingestionTest = ingestionTest.replace(testAnchor, testAnchor + addition, 1);
}
write(ingestionTestPath, ingestionTest);

const exclusionPath = "data/lexical-frequency/cifu-runtime-exclusions.tsv";
write(exclusionPath,
  "rank\tsurface\taction\tevidence\n" +
  "1404\t多少\tremove_runtime_surface\tStandard Written Chinese/Mandarin quantity interrogative; not ordinary vernacular Cantonese. Ordinary Cantonese quantity questions use 幾多.\n"
);

// Superseded contamination ledgers are not canonical history. Git history is sufficient
// to explain their former existence; rejected analyses must not remain active data.
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

The raw imported Cifu source snapshot remains unchanged for reproducibility, but rejected source analyses have no active lexical authority and are not retained as canonical fallback history.

- Active Cifu ingestion uses rank, exact surface, and frequency only.
- Whole-surface exclusions live in \`data/lexical-frequency/cifu-runtime-exclusions.tsv\` as positive executable constraints.
- Rank 1404 \`多少\` is excluded in its Standard Written Chinese/Mandarin quantity-interrogative use; it is not an ordinary vernacular Cantonese equivalent of “how many/how much.” Ordinary Cantonese uses \`幾多\`.
- Retained surfaces receive only independently reviewed Cantonese analyses.
- Rank 801 \`○\` remains an explicit pronunciation/lexical research hold; no Jyutping is invented for this source artifact.
- A surface is never deleted merely because it is compositional, rare, formal, domain-specific, or regression-causing.
- When independent evidence changes a lexical judgment, update the reviewed authority and executable runtime state directly rather than preserving superseded source interpretations in active docs/data.

`;
  docs = `${docs.slice(0, docsStart)}${replacement}${docs.slice(docsEnd)}`;
} else if (!docs.includes("## Runtime exclusion policy")) {
  throw new Error("lexical coverage cleanup section anchors missing");
} else {
  docs = docs.replace(
    "- Rank 1404 `多少` is currently excluded from the effective runtime; ordinary Cantonese quantity questions use `幾多`.",
    "- Rank 1404 `多少` is excluded in its Standard Written Chinese/Mandarin quantity-interrogative use; it is not an ordinary vernacular Cantonese equivalent of “how many/how much.” Ordinary Cantonese uses `幾多`.",
  );
  if (!docs.includes("Rank 801 `○` remains an explicit pronunciation/lexical research hold")) {
    docs = docs.replace(
      "- Retained surfaces receive only independently reviewed Cantonese analyses.\n",
      "- Retained surfaces receive only independently reviewed Cantonese analyses.\n- Rank 801 `○` remains an explicit pronunciation/lexical research hold; no Jyutping is invented for this source artifact.\n",
      1,
    );
  }
}
write(docsPath, docs);

console.log(JSON.stringify({
  cifu_rows: cifu.rows.length,
  raw_cifu_source_preserved: true,
  common_core_rows: core.rows.length,
  frequency_gap_notes_cleaned_this_run: replacements,
  pronunciation_hold_surfaces: ["○"],
  quantity_interrogative_exclusion: "多少",
  retired_contamination_artifacts: retired,
  exclusion_registry: exclusionPath,
  lexical_coverage_doc_cleaned: docsPath,
}, null, 2));
