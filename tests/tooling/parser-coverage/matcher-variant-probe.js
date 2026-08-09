#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi } = require("../../lib/runtime-api");
const { enhanceCoverageRecord, canonicalJson } = require("../../../tools/parser-coverage-enhanced");

const root = path.resolve(__dirname, "../../..");
const api = loadRuntimeApi({ apiNames: ["analyzeLine", "diagnosticSummary", "diagnosticFinalRows"] });

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

const groups = new Map();
const parseFailures = [];
let constructionRows = 0;

function publicDefinition(trace) {
  const definition = trace.matcher_definition || {};
  return {
    trace_kind: definition.trace_kind || "",
    construction_type: definition.construction_type || "",
    template_family: definition.template_family || "",
    template: definition.template || [],
    constraints: definition.constraints || {},
    rule: definition.rule || "",
    template_subtype: trace.template_subtype || "",
    structural_scope: trace.structural_scope || "",
  };
}

for (const item of corpus.values()) {
  try {
    const analysis = api.analyzeLine(item.source, item.context_source || null);
    const rows = api.diagnosticFinalRows(analysis);
    const record = enhanceCoverageRecord(api.diagnosticSummary(analysis), rows, { source: item.source });
    for (const trace of record.construction_traces || []) {
      constructionRows += 1;
      const construction = trace.construction || trace.internal_construction || "";
      const key = `${construction}\u0000${trace.rule_descriptor || ""}`;
      if (!groups.has(key)) groups.set(key, {
        construction,
        rule_descriptor: trace.rule_descriptor || "",
        occurrences: 0,
        fingerprints: new Map(),
      });
      const group = groups.get(key);
      group.occurrences += 1;
      const fp = trace.matcher_fingerprint || "";
      if (!group.fingerprints.has(fp)) group.fingerprints.set(fp, {
        matcher_id: trace.matcher_id || "",
        fingerprint: fp,
        count: 0,
        definition: publicDefinition(trace),
        examples: [],
      });
      const entry = group.fingerprints.get(fp);
      entry.count += 1;
      if (entry.examples.length < 4) entry.examples.push(item.source);
    }
  } catch (error) {
    parseFailures.push({ source: item.source, context_source: item.context_source, error: error.message || String(error) });
  }
}

const multiFingerprintSameRule = [...groups.values()]
  .filter((group) => group.fingerprints.size > 1)
  .map((group) => ({
    construction: group.construction,
    rule_descriptor: group.rule_descriptor,
    occurrences: group.occurrences,
    fingerprint_count: group.fingerprints.size,
    variants: [...group.fingerprints.values()].sort((a, b) => b.count - a.count || a.fingerprint.localeCompare(b.fingerprint)),
  }))
  .sort((a, b) => b.fingerprint_count - a.fingerprint_count || a.construction.localeCompare(b.construction));

const constructionVariants = new Map();
for (const group of groups.values()) {
  if (!constructionVariants.has(group.construction)) constructionVariants.set(group.construction, new Map());
  const target = constructionVariants.get(group.construction);
  for (const [fp, entry] of group.fingerprints) if (!target.has(fp)) target.set(fp, entry);
}
const multiDefinitionConstructions = [...constructionVariants.entries()]
  .filter(([, variants]) => variants.size > 1)
  .map(([construction, variants]) => ({
    construction,
    definition_count: variants.size,
    variants: [...variants.values()].sort((a, b) => b.count - a.count || a.fingerprint.localeCompare(b.fingerprint)),
  }))
  .sort((a, b) => b.definition_count - a.definition_count || a.construction.localeCompare(b.construction));

const definitionToConstructions = new Map();
for (const [construction, variants] of constructionVariants) {
  for (const entry of variants.values()) {
    const definitionKey = canonicalJson(entry.definition);
    if (!definitionToConstructions.has(definitionKey)) definitionToConstructions.set(definitionKey, new Set());
    definitionToConstructions.get(definitionKey).add(construction);
  }
}
const crossConstructionDefinitionCollisions = [...definitionToConstructions.entries()]
  .filter(([, constructions]) => constructions.size > 1)
  .map(([definition, constructions]) => ({ constructions: [...constructions].sort(), definition: JSON.parse(definition) }));

console.log(JSON.stringify({
  schema: "canto-span-matcher-variant-inventory-v1",
  runtime_version: api.runtimeVersion,
  corpus: {
    unique_source_context_pairs: corpus.size,
    analyzed: corpus.size - parseFailures.length,
    parse_failures: parseFailures.length,
    construction_rows: constructionRows,
  },
  same_visible_rule_multi_fingerprint_group_count: multiFingerprintSameRule.length,
  same_visible_rule_multi_fingerprint_groups: multiFingerprintSameRule,
  multi_definition_construction_count: multiDefinitionConstructions.length,
  multi_definition_constructions: multiDefinitionConstructions,
  cross_construction_definition_collision_count: crossConstructionDefinitionCollisions.length,
  cross_construction_definition_collisions: crossConstructionDefinitionCollisions,
  parse_failures: parseFailures.slice(0, 20),
  note: "Inventory only. Fingerprints and controlled definitions are implementation provenance, not linguistic evidence. This probe deliberately exits nonzero after printing results.",
}, null, 2));

process.exit(1);
