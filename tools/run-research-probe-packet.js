#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const vm = require("vm");

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i].startsWith("--")) out[argv[i].slice(2)] = argv[i + 1], i += 1;
  }
  if (!out.packet || !out.output) throw new Error("Usage: run-research-probe-packet.js --packet FILE --output FILE");
  return out;
}
function parseTsv(text) {
  const lines = text.replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.filter(Boolean).map((line) => {
    const values = line.split("\t");
    return Object.fromEntries(headers.map((h, i) => [h, values[i] || ""]));
  });
}
function loadApi(mainPath) {
  class Plugin {} class PluginSettingTab {} class Setting {} class Notice {}
  const moduleShim = { exports: {} };
  const context = {
    module: moduleShim, exports: moduleShim.exports,
    require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id),
    console, setTimeout, clearTimeout, Buffer,
  };
  vm.runInNewContext(
    fs.readFileSync(mainPath, "utf8") + "\nmodule.exports.__researchApi={analyzeLine,diagnosticFinalRows,diagnosticSummary,rootSpanCoverageForDiagnostic,runtimeVersion:CANTO_SPAN_RUNTIME_VERSION,policyVersion:GRAMMAR_LEGITIMACY_POLICY_VERSION};",
    context, { filename: mainPath }
  );
  return moduleShim.exports.__researchApi;
}
function compact(row) {
  return {
    depth: row.depth, kind: row.kind, surface: row.surface,
    construction: row.construction || row.type || "",
    internal_construction: row.internal_construction || "",
    parent: row.parent || "", internal_parent: row.internal_parent || "",
    role: row.role || row.label || "", syntax: row.syntax || "", jyutping: row.jyutping || "",
  };
}

const args = parseArgs(process.argv.slice(2));
const root = path.resolve(__dirname, "..");
const packetPath = path.resolve(args.packet);
const outputPath = path.resolve(args.output);
const api = loadApi(path.join(root, "main.js"));
const packet = parseTsv(fs.readFileSync(packetPath, "utf8"));
const targetTypes = new Set(["ProgressiveVP", "ProgressiveTransitivePredicate"]);
const cases = packet.map((item) => {
  const analysis = api.analyzeLine(item.surface);
  const rows = api.diagnosticFinalRows(analysis);
  const constructions = rows.filter((r) => r.kind === "construction");
  const targetRows = constructions.filter((r) => targetTypes.has(r.internal_construction || r.construction || r.type));
  const actualTargetSurfaces = [...new Set(targetRows.map((r) => r.surface))];
  const expected = item.expected_target_surfaces ? item.expected_target_surfaces.split(";").filter(Boolean) : [];
  const exactMatches = expected.filter((surface) => actualTargetSurfaces.includes(surface));
  let observation = "OBSERVE_ONLY";
  if (item.candidate_policy === "REQUIRED") {
    observation = exactMatches.length === expected.length && expected.length > 0
      ? "EXACT_TARGET_PRESENT"
      : targetRows.length ? "TARGET_PRESENT_WRONG_OR_INCOMPLETE_SPAN" : "TARGET_ABSENT";
  } else if (item.candidate_policy === "FORBIDDEN") {
    observation = targetRows.length ? "BROAD_FAMILY_PRESENT_OUTSIDE_NARROW_TARGET" : "NARROW_TARGET_ABSENT";
  } else if (item.candidate_policy === "UNRESOLVED") {
    observation = targetRows.length ? "UNRESOLVED_ENVIRONMENT_CURRENTLY_PARSED" : "UNRESOLVED_ENVIRONMENT_CURRENTLY_UNPARSED";
  }
  return {
    ...item,
    observation,
    expected_target_surfaces: expected,
    actual_target_surfaces: actualTargetSurfaces,
    exact_target_match_count: exactMatches.length,
    root_coverage: api.rootSpanCoverageForDiagnostic(rows),
    semantic_summary: api.diagnosticSummary(analysis),
    rows: rows.map(compact),
  };
});
const required = cases.filter((c) => c.candidate_policy === "REQUIRED");
const forbidden = cases.filter((c) => c.candidate_policy === "FORBIDDEN");
const result = {
  schema: "canto-span-research-probe-observation-v1",
  checkpoint: path.basename(packetPath),
  runtime_version: api.runtimeVersion,
  policy_version: api.policyVersion,
  status: "OBSERVATION_ONLY_NOT_ACCEPTANCE_GATE",
  counts: {
    total: cases.length,
    required: required.length,
    required_exact: required.filter((c) => c.observation === "EXACT_TARGET_PRESENT").length,
    required_wrong_or_incomplete: required.filter((c) => c.observation === "TARGET_PRESENT_WRONG_OR_INCOMPLETE_SPAN").length,
    required_absent: required.filter((c) => c.observation === "TARGET_ABSENT").length,
    forbidden: forbidden.length,
    forbidden_with_broad_family_present: forbidden.filter((c) => c.observation === "BROAD_FAMILY_PRESENT_OUTSIDE_NARROW_TARGET").length,
    full_root_coverage: cases.filter((c) => c.root_coverage && c.root_coverage.status === "PASS").length,
  },
  warning: "A root-coverage PASS does not establish correct target span, lexical compatibility, or linguistic legitimacy.",
  cases,
};
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ status: result.status, counts: result.counts, output: outputPath }, null, 2));
