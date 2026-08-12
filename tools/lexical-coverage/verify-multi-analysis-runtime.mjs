#!/usr/bin/env node
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const entries = require("../../src/runtime-resources/lexicon/token-lexicon");
const { EXPLICIT_ANALYSES, buildLexicalAnalysisIndex } = require("../../src/runtime-resources/lexicon/lexical-analyses");
const index = buildLexicalAnalysisIndex(entries);
const uniqueSurfaces = new Set(entries.map(([surface]) => surface));
if (Object.keys(index).length !== uniqueSurfaces.size) throw new Error(`analysis index surface mismatch: ${Object.keys(index).length} vs ${uniqueSurfaces.size}`);
const ids = new Set();
let analyses = 0;
for (const [surface, rows] of Object.entries(index)) {
  if (!Array.isArray(rows) || !rows.length) throw new Error(`no lexical analyses for ${surface}`);
  for (const row of rows) {
    analyses += 1;
    if (!row.id) throw new Error(`analysis without id for ${surface}`);
    if (ids.has(row.id)) throw new Error(`duplicate analysis id ${row.id}`);
    ids.add(row.id);
  }
}
for (const surface of ["住", "定", "咪"]) {
  if (!EXPLICIT_ANALYSES[surface] || index[surface].length < 2) throw new Error(`expected explicit ambiguity for ${surface}`);
}
console.log(JSON.stringify({ uniqueSurfaces: uniqueSurfaces.size, lexicalAnalyses: analyses, explicitMultiAnalysisSurfaces: Object.keys(EXPLICIT_ANALYSES).length }, null, 2));
