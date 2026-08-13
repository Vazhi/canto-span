#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCE = process.argv.find((arg) => arg.startsWith("--source="))?.slice("--source=".length);
const CHECK_ONLY = process.argv.includes("--check");
const OUTPUT = path.join(ROOT, "data/lexical-frequency/cifu-spoken-top-2000.tsv");
const CIFU_COMMIT = "8d5e4903e419193f903823880a7815712072cc80";

if (!SOURCE) throw new Error("Usage: node tools/lexical-coverage/top-2000-audit.mjs --source=/path/to/Cifu-v1.txt [--check]");

const TOKEN_MODULES = Object.freeze([
  "people-and-address",
  "referents-and-boundaries",
  "things",
  "places-and-times",
  "verbs",
  "statives",
  "function-words-and-particles",
  "degree-and-formulas",
  "study-suite",
  "frequency-gap-fill-r7",
]);

const VERIFIED_VARIANTS = Object.freeze({});

function readCifu(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const header = lines[0].split("\t");
  const ix = Object.fromEntries(header.map((name, index) => [name, index]));
  for (const required of ["Word", "SpokenAdult", "JyutPing", "Definition", "Structure"]) {
    if (!(required in ix)) throw new Error(`Cifu column missing: ${required}`);
  }
  const bestBySurface = new Map();
  for (const line of lines.slice(1)) {
    const cols = line.split("\t");
    const word = (cols[ix.Word] || "").trim();
    const spoken = Number.parseInt(cols[ix.SpokenAdult] || "0", 10);
    if (!word || !Number.isFinite(spoken) || spoken <= 0) continue;
    const record = { word, spoken, jyutping: (cols[ix.JyutPing] || "").trim(), definition: (cols[ix.Definition] || "").trim(), structure: (cols[ix.Structure] || "").trim() };
    const prior = bestBySurface.get(word);
    if (!prior || record.spoken > prior.spoken) bestBySurface.set(word, record);
  }
  const ranked = [...bestBySurface.values()]
    .sort((a, b) => b.spoken - a.spoken || a.word.localeCompare(b.word, "zh-Hant"))
    .slice(0, 2000)
    .map((record, index) => ({ ...record, rank: index + 1 }));
  if (ranked.length !== 2000) throw new Error(`Expected 2000 historical Cifu ranked forms, got ${ranked.length}`);
  return ranked;
}

function loadRuntimeLexicon() {
  const direct = new Map();
  for (const name of TOKEN_MODULES) {
    const file = path.join(ROOT, "src/runtime-resources/lexicon/token-lexicon", `${name}.js`);
    delete require.cache[require.resolve(file)];
    for (const [surface, meta = {}] of require(file)) {
      if (!direct.has(surface)) direct.set(surface, []);
      direct.get(surface).push({ module: `${name}.js`, ...meta });
    }
  }
  const forms = [...direct.keys()].filter(Boolean).sort((a, b) => b.length - a.length || a.localeCompare(b, "zh-Hant"));
  return { direct, forms };
}

function segmentSurface(surface, forms) {
  const memo = new Map();
  function visit(index) {
    if (index === surface.length) return [];
    if (memo.has(index)) return memo.get(index);
    for (const form of forms) {
      if (!surface.startsWith(form, index)) continue;
      const rest = visit(index + form.length);
      if (rest) return [form, ...rest];
    }
    memo.set(index, null);
    return null;
  }
  const result = visit(0);
  return result && result.length > 1 ? result : null;
}

function normalizeReading(value) { return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, ""); }

function classify(record, runtime) {
  const direct = runtime.direct.get(record.word);
  if (direct) {
    const runtimeModule = [...new Set(direct.map((item) => item.module))].join(";");
    const runtimeJyutping = [...new Set(direct.map((item) => item.jyutping).filter(Boolean))].join(";");
    const runtimeMeta = [...new Set(direct.map((item) => [item.label, item.syntax].filter(Boolean).join(":")))].join(";") || "-";
    const cifuReading = normalizeReading(record.jyutping);
    const runtimeReading = normalizeReading(runtimeJyutping);
    const status = cifuReading && runtimeReading && !(cifuReading.includes(runtimeReading) || runtimeReading.includes(cifuReading))
      ? "surface_covered_sense_uncertain"
      : "covered_main";
    return { ...record, status, note: "", runtimeModule, runtimeJyutping, runtimeMeta };
  }
  const variant = VERIFIED_VARIANTS[record.word];
  if (variant && runtime.direct.has(variant)) return { ...record, status: "covered_variant", note: `verified_variant_of=${variant}`, runtimeModule: "-", runtimeJyutping: "-", runtimeMeta: "-" };
  if ((record.jyutping || "").startsWith("*") || record.definition === "NO DEF") return { ...record, status: "manual_review", note: "cifu_generated_or_undefined", runtimeModule: "-", runtimeJyutping: "-", runtimeMeta: "-" };
  const segments = segmentSurface(record.word, runtime.forms);
  if (segments) return { ...record, status: "handled_structurally", note: `lexically_segmentable_as=${segments.join("+")};not_proof_of_construction_analysis`, runtimeModule: "-", runtimeJyutping: "-", runtimeMeta: "-" };
  return { ...record, status: "missing", note: "", runtimeModule: "-", runtimeJyutping: "-", runtimeMeta: "-" };
}

function clean(value) { return String(value ?? "-").replace(/\t/g, " ").replace(/\r?\n/g, " ").trimEnd() || "-"; }
function renderTsv(rows) {
  const header = ["rank", "word", "cifu_spoken_adult", "cifu_jyutping", "cifu_definition", "cifu_structure", "runtime_status", "audit_note", "runtime_module", "runtime_jyutping", "runtime_meta"];
  const lines = [header.join("\t")];
  for (const row of rows) lines.push([row.rank, row.word, row.spoken, row.jyutping, row.definition, row.structure, row.status, row.note, row.runtimeModule, row.runtimeJyutping, row.runtimeMeta].map(clean).join("\t"));
  return `${lines.join("\n")}\n`;
}

const ranked = readCifu(SOURCE);
const runtime = loadRuntimeLexicon();
const rows = ranked.map((record) => classify(record, runtime));
const output = renderTsv(rows);
if (CHECK_ONLY) {
  const existing = fs.readFileSync(OUTPUT, "utf8");
  if (existing !== output) throw new Error("Historical Cifu lexical audit drift: regenerate data/lexical-frequency/cifu-spoken-top-2000.tsv");
} else {
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, output);
}

const counts = {};
for (const row of rows) counts[row.status] = (counts[row.status] || 0) + 1;
const topSet = new Set(rows.map((row) => row.word));
const historicalExactSurfaceCoverage = rows.filter((row) => row.status === "covered_main" || row.status === "surface_covered_sense_uncertain").length;
const runtimeSurfacesOutsideHistoricalCifu2000 = [...runtime.direct.keys()].filter((surface) => !topSet.has(surface)).length;

console.log(JSON.stringify({
  source: "Cifu-v1 SpokenAdult (historical benchmark only)",
  sourceCommit: CIFU_COMMIT,
  rankedForms: rows.length,
  mode: CHECK_ONLY ? "check" : "write",
  counts,
  historicalExactSurfaceCoverage,
  mandatoryExactSurfaceTarget: false,
  currentPriorityTarget: "2,000 expert-curated common spoken Cantonese lexical items; compositional surfaces do not consume lexical-core slots",
  totalRuntimeUniqueSurfaces: runtime.direct.size,
  runtimeSurfacesOutsideHistoricalCifu2000,
  topHistoricalCifuMissing: rows.filter((row) => row.status === "missing").slice(0, 30).map((row) => [row.rank, row.word]),
}, null, 2));
