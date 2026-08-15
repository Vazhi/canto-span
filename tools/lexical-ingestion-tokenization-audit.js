#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { auditArchitecture } = require("./parser-architecture-audit");
const { loadRuntimeApi } = require("./lib/runtime-api");
const tokenEntries = require("../src/runtime-resources/lexicon/token-lexicon");
const { buildLexicalAnalysisIndex } = require("../src/runtime-resources/lexicon/lexical-analyses");
const compositionalLexicalPhrases = new Set(require("../src/runtime-resources/lexicon/compositional-lexical-phrases"));
const {
  lexicalIngestions,
  neutralFrequencyCoverageEntry,
  collectBlockedAtomicSurfaces,
  blockedAtomicRuntimeDisposition,
} = require("../src/runtime-resources/lexicon/lexical-ingestion-registry");

const root = path.resolve(__dirname, "..");
const AUDIT_SCHEMA = "canto-span-lexical-ingestion-tokenization-audit-v1";

function readDelimitedRows(spec, relativePath = spec.source_file) {
  const file = path.join(root, relativePath);
  const text = fs.readFileSync(file, "utf8").replace(/^\uFEFF/u, "").trimEnd();
  if (!text) return [];
  const lines = text.split(/\r?\n/u);
  const delimiter = spec.delimiter || "\t";
  const header = lines.shift().split(delimiter);
  return lines.map((line) => {
    const cells = line.split(delimiter);
    return Object.fromEntries(header.map((name, column) => [name, cells[column] === undefined ? "" : cells[column]]));
  }).map((row, index) => ({ ...row, __source_row: index + 2 }));
}

function flattenTokens(nodes, out = []) {
  for (const node of nodes || []) {
    if (!node || typeof node !== "object") continue;
    if (node.kind === "token") out.push(node);
    if (Array.isArray(node.children)) flattenTokens(node.children, out);
  }
  return out;
}

function carrierSources(spec, surface) {
  const prefixes = Array.isArray(spec.carrier_prefixes) && spec.carrier_prefixes.length ? spec.carrier_prefixes : [""];
  const suffixes = Array.isArray(spec.carrier_suffixes) && spec.carrier_suffixes.length ? spec.carrier_suffixes : [""];
  return [...new Set(prefixes.flatMap((prefix) => suffixes.map((suffix) => `${prefix}${surface}${suffix}`)))];
}

function sourceJyutpingKnown(spec, row) {
  if (!spec.source_jyutping_column) return true;
  const raw = String(row[spec.source_jyutping_column] || "").trim();
  const unknown = new Set(spec.source_jyutping_unknown_values || ["", "-", "?", "*?"]);
  return !unknown.has(raw);
}

function runtimeJyutpingCoverage(entry = {}, analysisRows = []) {
  const defaultReading = String(entry.jyutping || "").trim();
  if (defaultReading) return { covered: true, mode: "default", readings: [defaultReading] };
  const readings = [...new Set((analysisRows || [])
    .map((row) => String(row.jyutping || "").trim())
    .filter(Boolean))];
  if (readings.length) return { covered: true, mode: "explicit_analysis", readings };
  return { covered: false, mode: "none", readings: [] };
}

function addFailure(failures, code, detail) {
  failures.push({ code, ...detail });
}

function bump(target, key) {
  target[key] = (target[key] || 0) + 1;
}

function auditIngestion(spec, options = {}) {
  const api = options.api || loadRuntimeApi({ apiNames: ["analyzeLine"] });
  const tokenLexicon = options.tokenLexicon || Object.fromEntries(tokenEntries);
  const analyses = options.analyses || buildLexicalAnalysisIndex(tokenEntries);
  const rows = readDelimitedRows(spec);
  const failures = [];
  const warnings = [];
  const surfaceColumn = spec.surface_column || "surface";
  const rankColumn = spec.rank_column || "rank";
  const removed = new Set(spec.removed_surfaces || []);
  const blocked = collectBlockedAtomicSurfaces(spec.policy_modules || []);
  const blockedDispositionCounts = {};
  const forceCompositional = new Set();
  const promotionOnlyBlocked = [];

  for (const surface of blocked) {
    const disposition = blockedAtomicRuntimeDisposition(surface, tokenLexicon, {
      blocked_surfaces: blocked,
      removed_surfaces: removed,
    });
    bump(blockedDispositionCounts, disposition);
    if (disposition === "force_compositional_neutral_fallback") forceCompositional.add(surface);
    else if (disposition.startsWith("promotion_only_")) promotionOnlyBlocked.push({ surface, disposition });
  }

  if (Number.isInteger(spec.expected_rows) && rows.length !== spec.expected_rows) {
    addFailure(failures, "unexpected_source_row_count", { expected: spec.expected_rows, actual: rows.length });
  }

  const rankedRows = rows.map((row) => ({
    row,
    surface: String(row[surfaceColumn] || ""),
    rank: Number(row[rankColumn]),
  }));
  const emptySurfaces = rankedRows.filter((item) => !item.surface);
  for (const item of emptySurfaces) addFailure(failures, "empty_source_surface", { source_row: item.row.__source_row });

  const surfaceCounts = new Map();
  const normalizedCounts = new Map();
  for (const item of rankedRows) {
    surfaceCounts.set(item.surface, (surfaceCounts.get(item.surface) || 0) + 1);
    const normalized = item.surface.normalize("NFC");
    if (!normalizedCounts.has(normalized)) normalizedCounts.set(normalized, new Set());
    normalizedCounts.get(normalized).add(item.surface);
  }
  for (const [surface, count] of surfaceCounts) {
    if (count > 1) addFailure(failures, "duplicate_source_surface", { surface, count });
  }
  for (const [normalized, forms] of normalizedCounts) {
    if (forms.size > 1) addFailure(failures, "unicode_normalization_collision", { normalized, forms: [...forms].sort() });
  }

  if (spec.require_contiguous_ranks) {
    const ranks = rankedRows.map((item) => item.rank);
    for (let index = 0; index < ranks.length; index += 1) {
      const expected = index + 1;
      if (ranks[index] !== expected) {
        addFailure(failures, "noncontiguous_rank", { source_row: rankedRows[index].row.__source_row, expected, actual: ranks[index] });
        break;
      }
    }
  }

  const missingRuntime = [];
  const unexpectedRemovedRuntime = [];
  const missingJyutping = [];
  const sourceUnknownJyutping = [];
  const analysisBackedJyutping = [];
  const neutralAtomic = [];
  const blockedAtomicLeaks = [];
  const duplicateAnalysisIds = [];
  const globalAnalysisIds = new Map();

  for (const { row, surface, rank } of rankedRows) {
    if (!surface) continue;
    const entry = tokenLexicon[surface];
    const surfaceAnalyses = analyses[surface] || [];
    if (removed.has(surface)) {
      if (entry || analyses[surface]) unexpectedRemovedRuntime.push({ rank, surface });
      continue;
    }
    if (spec.require_exact_runtime_coverage && !entry) {
      missingRuntime.push({ rank, surface });
      continue;
    }

    if (spec.require_jyutping && entry) {
      const runtimeCoverage = runtimeJyutpingCoverage(entry, surfaceAnalyses);
      if (runtimeCoverage.covered && runtimeCoverage.mode === "explicit_analysis") {
        analysisBackedJyutping.push({ rank, surface, readings: runtimeCoverage.readings });
      } else if (!runtimeCoverage.covered && !sourceJyutpingKnown(spec, row)) {
        sourceUnknownJyutping.push({ rank, surface, source_value: spec.source_jyutping_column ? row[spec.source_jyutping_column] : "" });
      } else if (!runtimeCoverage.covered) {
        missingJyutping.push({ rank, surface });
      }
    }

    const localIds = new Set();
    for (const analysis of surfaceAnalyses) {
      const id = String(analysis.id || "");
      if (!id || localIds.has(id)) duplicateAnalysisIds.push({ rank, surface, id });
      localIds.add(id);
      if (id) {
        if (globalAnalysisIds.has(id) && globalAnalysisIds.get(id) !== surface) {
          duplicateAnalysisIds.push({ rank, surface, id, first_surface: globalAnalysisIds.get(id) });
        } else {
          globalAnalysisIds.set(id, surface);
        }
      }
    }

    let bareAnalysis;
    try {
      bareAnalysis = api.analyzeLine(surface);
    } catch (error) {
      addFailure(failures, "bare_surface_parse_failure", { rank, surface, error: error.message || String(error) });
      continue;
    }
    const bareTokens = flattenTokens(bareAnalysis.tokens);
    if (neutralFrequencyCoverageEntry(entry) && bareTokens.some((token) => token.surface === surface)) {
      neutralAtomic.push({ rank, surface });
    }
  }

  for (const surface of forceCompositional) {
    if (!compositionalLexicalPhrases.has(surface)) {
      addFailure(failures, "neutral_blocked_surface_not_forced_compositional", { surface });
      continue;
    }
    for (const source of carrierSources(spec, surface)) {
      let analysis;
      try {
        analysis = api.analyzeLine(source);
      } catch (error) {
        addFailure(failures, "blocked_surface_carrier_parse_failure", { surface, source, error: error.message || String(error) });
        continue;
      }
      const tokens = flattenTokens(analysis.tokens);
      if (tokens.some((token) => token.surface === surface)) blockedAtomicLeaks.push({ surface, source });
    }
  }

  if (missingRuntime.length) addFailure(failures, "runtime_coverage_gap", { count: missingRuntime.length, examples: missingRuntime.slice(0, 12) });
  if (unexpectedRemovedRuntime.length) addFailure(failures, "removed_surface_still_runtime_reachable", { count: unexpectedRemovedRuntime.length, examples: unexpectedRemovedRuntime.slice(0, 12) });
  if (missingJyutping.length) addFailure(failures, "missing_ingested_jyutping", { count: missingJyutping.length, examples: missingJyutping.slice(0, 12) });
  if (duplicateAnalysisIds.length) addFailure(failures, "duplicate_or_empty_lexical_analysis_id", { count: duplicateAnalysisIds.length, examples: duplicateAnalysisIds.slice(0, 12) });
  if (blockedAtomicLeaks.length) addFailure(failures, "blocked_atomic_tokenization_leak", { count: blockedAtomicLeaks.length, examples: blockedAtomicLeaks.slice(0, 12) });

  if (spec.contamination_ledger) {
    const ledgerRows = readDelimitedRows(spec, spec.contamination_ledger);
    const ledgerRemoved = new Set(ledgerRows.filter((row) => row.action === "remove_runtime_surface").map((row) => row.surface));
    for (const surface of removed) {
      if (!ledgerRemoved.has(surface)) addFailure(failures, "removed_surface_missing_from_contamination_ledger", { surface });
    }
    for (const surface of ledgerRemoved) {
      if (!removed.has(surface)) addFailure(failures, "contamination_ledger_removal_not_in_runtime_policy", { surface });
    }
  }

  if (neutralAtomic.length) {
    warnings.push({
      code: "neutral_atomic_surface_inventory",
      count: neutralAtomic.length,
      examples: neutralAtomic.slice(0, 20),
      note: "Informational unless adjudication leaves a multi-character blocked_atomic row solely as neutral frequency fallback. Those rows are force-compositional and blocking.",
    });
  }
  if (promotionOnlyBlocked.length) {
    warnings.push({
      code: "blocked_promotion_only_inventory",
      count: promotionOnlyBlocked.length,
      examples: promotionOnlyBlocked.slice(0, 20),
      note: "blocked_atomic prevents this ingestion from promoting the source row; it does not override independent runtime authority or require decomposition of one-character forms.",
    });
  }
  if (sourceUnknownJyutping.length) {
    warnings.push({
      code: "source_pronunciation_unknown",
      count: sourceUnknownJyutping.length,
      examples: sourceUnknownJyutping.slice(0, 20),
      note: "The ingestion source itself supplies no usable pronunciation. This remains explicit research debt rather than a fabricated runtime reading.",
    });
  }
  if (analysisBackedJyutping.length) {
    warnings.push({
      code: "jyutping_covered_by_explicit_analysis",
      count: analysisBackedJyutping.length,
      examples: analysisBackedJyutping.slice(0, 20),
      note: "No single default reading is forced because reviewed lexical analyses carry the supported readings.",
    });
  }

  const architectureCorpus = rankedRows
    .filter((item) => item.surface)
    .map((item) => ({ source: item.surface, context_source: "", origins: [`lexical-ingestion:${spec.id}`] }));
  for (const surface of forceCompositional) {
    for (const source of carrierSources(spec, surface)) {
      if (source === surface) continue;
      architectureCorpus.push({ source, context_source: "", origins: [`lexical-ingestion:${spec.id}:blocked-carrier`] });
    }
  }
  const dedupedArchitectureCorpus = [...new Map(architectureCorpus.map((item) => [`${item.context_source}\u0000${item.source}`, item])).values()];
  const architecture = options.skipArchitecture ? null : auditArchitecture({ root, corpus: dedupedArchitectureCorpus });
  if (architecture && architecture.blocking_count) {
    addFailure(failures, "injected_architecture_gate_failure", {
      blocking_count: architecture.blocking_count,
      failure_groups: architecture.failure_groups,
    });
  }

  return {
    id: spec.id,
    source_file: spec.source_file,
    source_rows: rows.length,
    effective_runtime_expected: rows.length - removed.size,
    blocked_atomic_surfaces: blocked.size,
    blocked_runtime_disposition_counts: blockedDispositionCounts,
    forced_compositional_surfaces: forceCompositional.size,
    promotion_only_blocked_surfaces: promotionOnlyBlocked.length,
    removed_surfaces: [...removed].sort(),
    neutral_atomic_surface_count: neutralAtomic.length,
    neutral_atomic_examples: neutralAtomic.slice(0, 20),
    source_unknown_jyutping_count: sourceUnknownJyutping.length,
    architecture: architecture ? {
      status: architecture.status,
      analyzed: architecture.corpus.analyzed,
      blocking_count: architecture.blocking_count,
      construction_rows: architecture.corpus.construction_rows,
      semantic_bindings: architecture.corpus.semantic_bindings,
    } : null,
    failures,
    warnings,
    status: failures.length ? "FAIL" : "PASS",
  };
}

function auditAllLexicalIngestions(options = {}) {
  const api = options.api || loadRuntimeApi({ apiNames: ["analyzeLine"] });
  const reports = lexicalIngestions.map((spec) => auditIngestion(spec, { ...options, api }));
  return {
    schema: AUDIT_SCHEMA,
    status: reports.some((report) => report.status !== "PASS") ? "FAIL" : "PASS",
    ingestion_count: reports.length,
    reports,
  };
}

function formatHuman(report) {
  const lines = [`Lexical ingestion tokenization audit: ${report.status}`];
  for (const item of report.reports) {
    lines.push(`${item.id}: ${item.status}; ${item.source_rows} source rows; ${item.blocked_atomic_surfaces} promotion-blocked; ${item.forced_compositional_surfaces} force-compositional; ${item.neutral_atomic_surface_count} neutral atomic informational`);
    if (item.architecture) lines.push(`  architecture: ${item.architecture.status}; ${item.architecture.analyzed} analyzed; ${item.architecture.blocking_count} blockers`);
    for (const failure of item.failures) lines.push(`  FAIL ${failure.code}: ${JSON.stringify(failure)}`);
  }
  return lines.join("\n");
}

if (require.main === module) {
  const report = auditAllLexicalIngestions();
  if (process.argv.includes("--json")) console.log(JSON.stringify(report, null, 2));
  else console.log(formatHuman(report));
  if (report.status !== "PASS") process.exit(1);
}

module.exports = {
  AUDIT_SCHEMA,
  readDelimitedRows,
  flattenTokens,
  carrierSources,
  sourceJyutpingKnown,
  runtimeJyutpingCoverage,
  auditIngestion,
  auditAllLexicalIngestions,
  formatHuman,
};
