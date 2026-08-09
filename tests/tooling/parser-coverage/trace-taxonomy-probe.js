#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi } = require("../../lib/runtime-api");
const {
  parserDecisionTraceKindRegistry,
  templateFamilyRegistry,
} = require("../../../src/runtime-resources/diagnostics/trace-metadata");

const root = path.resolve(__dirname, "../../..");
const api = loadRuntimeApi({ apiNames: ["analyzeLine", "diagnosticFinalRows"] });

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

const corpus = new Map();
function add(source, contextSource, origin) {
  if (!source || typeof source !== "string") return;
  const context = contextSource || "";
  const key = `${context}\u0000${source}`;
  if (!corpus.has(key)) corpus.set(key, { source, context_source: context, origins: new Set() });
  corpus.get(key).origins.add(origin);
}

const regression = readJson("tests/fixtures/regression-snapshots.json");
for (const row of regression.cases || []) add(row.source, row.context_source, "regression");
const np = readJson("tests/fixtures/np-subsystem.json");
for (const row of np.cases || []) add(row.surface, "", "np");
const constructionDir = path.join(root, "tests", "constructions");
for (const file of fs.readdirSync(constructionDir).filter((name) => name.endsWith(".json")).sort()) {
  const spec = JSON.parse(fs.readFileSync(path.join(constructionDir, file), "utf8"));
  for (const group of ["snapshot_cases", "focused_cases", "implementation_probe_cases", "np_cases"]) {
    for (const row of spec[group] || []) add(row.source, row.context_source, `construction:${spec.construction}:${group}`);
  }
}

const registeredKinds = new Set(parserDecisionTraceKindRegistry.map(([kind]) => kind));
const registeredFamilies = new Set(templateFamilyRegistry.map(([family]) => family));
const templateTraceKinds = new Set(["generative_template", "construction_template"]);
const kindCounts = {};
const familyCounts = {};
const missingFamily = new Map();
const unregisteredKinds = new Map();
const unregisteredFamilies = new Map();
const parseFailures = [];
let constructionRows = 0;

function bump(target, key) {
  target[key] = (target[key] || 0) + 1;
}

function group(map, key, payload, source) {
  if (!map.has(key)) map.set(key, { ...payload, count: 0, examples: [] });
  const row = map.get(key);
  row.count += 1;
  if (source && !row.examples.includes(source) && row.examples.length < 8) row.examples.push(source);
}

for (const item of corpus.values()) {
  try {
    const rows = api.diagnosticFinalRows(api.analyzeLine(item.source, item.context_source || null));
    for (const row of rows || []) {
      if (!row || row.kind !== "construction") continue;
      constructionRows += 1;
      const detail = row.trace_detail || {};
      const kind = detail.kind || row.trace || "unspecified";
      const family = detail.template_family || "";
      const construction = row.construction || row.internal_construction || detail.construction_type || "";
      bump(kindCounts, kind);
      bump(familyCounts, family || "(missing)");

      if (!registeredKinds.has(kind)) {
        group(unregisteredKinds, kind, { trace_kind: kind }, item.source);
      }
      if (family && !registeredFamilies.has(family)) {
        group(unregisteredFamilies, family, {
          template_family: family,
          trace_kinds: new Set(),
          constructions: new Set(),
        }, item.source);
        unregisteredFamilies.get(family).trace_kinds.add(kind);
        unregisteredFamilies.get(family).constructions.add(construction);
      }
      if (templateTraceKinds.has(kind) && !family) {
        const signature = JSON.stringify({
          construction,
          kind,
          rule: detail.rule || "",
          template: Array.isArray(detail.template) ? detail.template : [],
          constraints: detail.constraints || {},
        });
        group(missingFamily, signature, {
          construction,
          trace_kind: kind,
          rule: detail.rule || "",
          template: Array.isArray(detail.template) ? detail.template : [],
          constraints: detail.constraints || {},
          assigned_slots: Array.isArray(detail.assigned_slots) ? detail.assigned_slots : [],
        }, item.source);
      }
    }
  } catch (error) {
    parseFailures.push({ source: item.source, error: error.message || String(error) });
  }
}

function serializeFamilyGroup(row) {
  return {
    template_family: row.template_family,
    count: row.count,
    trace_kinds: [...row.trace_kinds].sort(),
    constructions: [...row.constructions].sort(),
    examples: row.examples,
  };
}

const output = {
  schema: "canto-span-trace-taxonomy-inventory-v1",
  runtime_version: api.runtimeVersion,
  corpus: {
    unique_source_context_pairs: corpus.size,
    analyzed: corpus.size - parseFailures.length,
    parse_failures: parseFailures.length,
    construction_rows: constructionRows,
  },
  registry: {
    trace_kinds: [...registeredKinds].sort(),
    template_families: [...registeredFamilies].sort(),
  },
  observed: {
    trace_kind_counts: kindCounts,
    template_family_counts: familyCounts,
  },
  unregistered_trace_kinds: [...unregisteredKinds.values()].sort((a, b) => b.count - a.count),
  unregistered_template_families: [...unregisteredFamilies.values()].map(serializeFamilyGroup).sort((a, b) => b.count - a.count),
  template_traces_missing_family: [...missingFamily.values()].sort((a, b) => b.count - a.count || a.construction.localeCompare(b.construction)),
  parse_failures: parseFailures.slice(0, 20),
};

console.log(JSON.stringify(output, null, 2));
process.exit(1);
