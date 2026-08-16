#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const { loadRuntimeApi } = require("./lib/runtime-api");
const entries = require("../src/runtime-resources/lexicon/token-lexicon");
const lexicon = Object.fromEntries(entries);
const api = loadRuntimeApi({ apiNames: ["analyzeLine"] });

const csvPath = process.argv[2];
if (!csvPath) throw new Error("usage: node tools/tmp-top2000-functional-lexical-audit.js SOURCE.csv");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i += 1; }
      else if (ch === '"') quoted = false;
      else cell += ch;
      continue;
    }
    if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(cell); cell = ""; }
    else if (ch === '\n') { row.push(cell.replace(/\r$/u, "")); rows.push(row); row = []; cell = ""; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const header = rows.shift() || [];
  return rows.map((values) => Object.fromEntries(header.map((key, i) => [key, values[i] || ""])));
}

function tombstone(surface) {
  const x = surface.toLowerCase();
  return x === "del" || /(^|[-\s?])del($|[-\s?])/u.test(x);
}

function isCjkChar(ch) {
  const cp = ch.codePointAt(0);
  return (cp >= 0x3400 && cp <= 0x4dbf) ||
    (cp >= 0x4e00 && cp <= 0x9fff) ||
    (cp >= 0xf900 && cp <= 0xfaff) ||
    (cp >= 0x20000 && cp <= 0x3134f);
}

function hasCjk(text) { return [...text].some(isCjkChar); }
function compact(text) { return String(text || "").normalize("NFC").replace(/\s+/gu, ""); }

function flattenTokens(nodes, out = []) {
  for (const node of nodes || []) {
    if (!node || typeof node !== "object") continue;
    if (node.kind === "token") out.push(node);
    if (Array.isArray(node.children)) flattenTokens(node.children, out);
  }
  return out;
}

function cleanPron(text) {
  return String(text || "").toLowerCase().replace(/[^a-z1-6]/gu, "");
}

const rows = parseCsv(fs.readFileSync(csvPath, "utf8").replace(/^\uFEFF/u, ""));
const seen = new Set();
const bounded = [];
for (const row of rows) {
  const surface = compact(row.Word);
  if (!surface || tombstone(surface) || seen.has(surface)) continue;
  seen.add(surface);
  bounded.push({
    rank: bounded.length + 1,
    surface,
    pronunciation: String(row.Pronunciation || "").trim(),
    meaning: String(row.Meaning || "").trim(),
    example: String(row.Sentence1 || "").trim(),
  });
  if (bounded.length === 2000) break;
}

const stats = {
  bounded: bounded.length,
  cjk_items: 0,
  exact: 0,
  compositional: 0,
  incomplete: 0,
  non_cjk: 0,
  clean_source_pronunciation_items: 0,
  clean_source_pronunciation_mismatches: 0,
};
const incomplete = [];
const mismatches = [];
const compositionalSamples = [];

for (const row of bounded) {
  if (!hasCjk(row.surface)) { stats.non_cjk += 1; continue; }
  stats.cjk_items += 1;
  if (lexicon[row.surface]) {
    stats.exact += 1;
    const sourceRaw = row.pronunciation;
    const cleanSourceEligible = sourceRaw && !/[|/,?]/u.test(sourceRaw);
    if (cleanSourceEligible) {
      const src = cleanPron(sourceRaw);
      const rt = cleanPron(lexicon[row.surface].jyutping || "");
      if (src && rt) {
        stats.clean_source_pronunciation_items += 1;
        if (src !== rt) {
          stats.clean_source_pronunciation_mismatches += 1;
          mismatches.push({ ...row, runtime: lexicon[row.surface].jyutping || "", mode: "exact" });
        }
      }
    }
    continue;
  }

  let result;
  let tokens = [];
  try {
    result = api.analyzeLine(row.surface);
    tokens = flattenTokens(result && result.tokens);
  } catch (error) {
    incomplete.push({ ...row, reason: `analyze_error:${error.message}` });
    stats.incomplete += 1;
    continue;
  }

  const joined = compact(tokens.map((token) => token.surface || "").join(""));
  const cjkTokens = tokens.filter((token) => hasCjk(token.surface || ""));
  const missingReading = cjkTokens.filter((token) => !cleanPron(token.jyutping || ""));
  const fullSurface = joined === row.surface;
  const complete = fullSurface && cjkTokens.length > 0 && missingReading.length === 0;

  if (!complete) {
    stats.incomplete += 1;
    incomplete.push({
      ...row,
      reason: !fullSurface ? "surface_not_reconstructed" : "missing_token_reading",
      joined,
      tokens: tokens.map((token) => ({ surface: token.surface || "", jyutping: token.jyutping || "", label: token.label || "", syntax: token.syntax || "" })),
    });
    continue;
  }

  stats.compositional += 1;
  if (compositionalSamples.length < 40) {
    compositionalSamples.push({ ...row, tokens: tokens.map((token) => `${token.surface}:${token.jyutping || ""}`) });
  }

  const sourceRaw = row.pronunciation;
  const cleanSourceEligible = sourceRaw && !/[|/,?]/u.test(sourceRaw);
  if (cleanSourceEligible) {
    const src = cleanPron(sourceRaw);
    const rt = cleanPron(cjkTokens.map((token) => token.jyutping || "").join(" "));
    if (src && rt) {
      stats.clean_source_pronunciation_items += 1;
      if (src !== rt) {
        stats.clean_source_pronunciation_mismatches += 1;
        mismatches.push({ ...row, runtime: cjkTokens.map((token) => `${token.surface}:${token.jyutping || ""}`).join(" + "), mode: "compositional" });
      }
    }
  }
}

console.log("FUNCTIONAL_TOP2000_SUMMARY", JSON.stringify(stats));
console.log("FUNCTIONAL_INCOMPLETE_COUNT", incomplete.length);
console.log("FUNCTIONAL_INCOMPLETE_JSON");
console.log(JSON.stringify(incomplete.slice(0, 160), null, 2));
console.log("CLEAN_PRONUNCIATION_MISMATCH_COUNT", mismatches.length);
console.log("CLEAN_PRONUNCIATION_MISMATCH_TOP160_JSON");
console.log(JSON.stringify(mismatches.slice(0, 160), null, 2));
console.log("COMPOSITIONAL_SAMPLE_JSON");
console.log(JSON.stringify(compositionalSamples, null, 2));
