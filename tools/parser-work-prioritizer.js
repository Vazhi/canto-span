#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { buildExecutableCorpus } = require("./parser-architecture-audit");
const { enhanceCoverageRecord } = require("./parser-coverage-enhanced");
const { loadRuntimeApi } = require("./lib/runtime-api");

const PRIORITY_SCHEMA = "canto-span-parser-work-priority-v1";
const DEFAULT_LIMIT = 12;
const DEFAULT_SAMPLE_LIMIT = 4;

// These are development-priority weights only. They are deliberately small,
// explicit, capped, and never interpreted as linguistic confidence/evidence.
const GAP_STATUS_POINTS = Object.freeze({
  REVIEW_REQUIRED: 8,
  UNRESOLVED_STRUCTURE: 7,
  NO_CONSTRUCTION_COVERAGE: 6,
  COMPETING_STRUCTURE: 5,
  PARTIAL_STRUCTURE: 4,
  UNKNOWN_LEXICON: 0, // lexical gaps have their own queue
  COVERED: 0,
});
const GAP_STATUS_CAP = 5;
const ARCHITECTURE_DEBT_POINTS_PER_TRACE = 2;
const ARCHITECTURE_DEBT_CAP = 5;
const CANDIDATE_STATE_POINTS = Object.freeze({
  source_supported: 12,
  boundary_ready: 8,
  narrowing_candidate: 6,
  lexicalized_review: 2,
});
const MISSING_GATE_POINTS = Object.freeze({
  runtime_research_alignment: 30,
  negative_boundaries_complete: 24,
  source_scope_matches_claim: 18,
  independent_source_support: 16,
  language_claim_defined: 12,
  reviewed_corpus_evidence: 10,
  ontology_conflicts_resolved: 8,
  role_neutral_panel_threshold: 4,
  held_out_validation: 2,
});

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function readJson(root, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function readinessRecords(root) {
  const payload = readJson(root, "data/construction-candidate-readiness.json");
  return {
    schema: payload.schema || "",
    generated_on: payload.generated_on || "",
    records: (payload.records || []).filter((row) => row && row.lifecycle_state === "current"),
  };
}

function readinessLookup(records = []) {
  const byLabel = new Map();
  for (const row of records) {
    for (const key of unique([row.legacy_label, row.canonical_name, row.construction_code])) {
      if (!byLabel.has(key)) byLabel.set(key, row);
    }
  }
  return byLabel;
}

function actionClassForReadiness(row = {}) {
  if (row.candidate_state === "excluded_nonlanguage") return "excluded";
  if (row.candidate_state === "lexicalized_review") return "manual_review";
  const gate = row.nearest_missing_gate || "";
  if (gate === "runtime_research_alignment") return "runtime_implementation";
  if (gate === "negative_boundaries_complete") return "test_boundary_work";
  if ([
    "language_claim_defined",
    "independent_source_support",
    "source_scope_matches_claim",
    "reviewed_corpus_evidence",
  ].includes(gate)) return "research";
  if (["role_neutral_panel_threshold", "held_out_validation", "ontology_conflicts_resolved"].includes(gate)) {
    return "manual_review";
  }
  return "manual_review";
}

function labelsForCoverageRecord(record = {}) {
  return unique([
    ...(record.top_constructions || []),
    ...(record.construction_traces || []).flatMap((trace) => [trace.construction, trace.internal_construction]),
  ]);
}

function gapPointsForCounts(counts = {}) {
  let points = 0;
  const detail = {};
  for (const [status, weight] of Object.entries(GAP_STATUS_POINTS)) {
    const rawCount = Number(counts[status] || 0);
    if (!rawCount || !weight) continue;
    const cappedCount = Math.min(rawCount, GAP_STATUS_CAP);
    const statusPoints = cappedCount * weight;
    detail[status] = { raw_count: rawCount, capped_count: cappedCount, points_per_case: weight, points: statusPoints };
    points += statusPoints;
  }
  return { points, detail };
}

function debtPointsForCount(rawCount = 0) {
  const count = Number(rawCount || 0);
  const cappedCount = Math.min(count, ARCHITECTURE_DEBT_CAP);
  return {
    raw_count: count,
    capped_count: cappedCount,
    points_per_trace: ARCHITECTURE_DEBT_POINTS_PER_TRACE,
    points: cappedCount * ARCHITECTURE_DEBT_POINTS_PER_TRACE,
  };
}

function scoreCandidate(candidate) {
  const gap = gapPointsForCounts(candidate.coverage_gap_counts);
  const debt = debtPointsForCount(candidate.architecture_debt_trace_count);
  const statePoints = Number(CANDIDATE_STATE_POINTS[candidate.candidate_state] || 0);
  const gatePoints = Number(MISSING_GATE_POINTS[candidate.nearest_missing_gate] || 0);
  const total = gap.points + debt.points + statePoints + gatePoints;
  return {
    total,
    components: {
      coverage_gap_points: gap.points,
      coverage_gap_detail: gap.detail,
      architecture_debt_points: debt.points,
      architecture_debt_detail: debt,
      candidate_state_points: statePoints,
      candidate_state: candidate.candidate_state,
      missing_gate_points: gatePoints,
      nearest_missing_gate: candidate.nearest_missing_gate,
    },
  };
}

function unknownLexiconQueue(records = [], sampleLimit = DEFAULT_SAMPLE_LIMIT) {
  const grouped = new Map();
  for (const record of records) {
    for (const token of record.token_provenance || []) {
      if (token.lexical_status !== "unknown" || !token.surface) continue;
      if (!grouped.has(token.surface)) grouped.set(token.surface, { surface: token.surface, executable_case_count: 0, examples: [] });
      const item = grouped.get(token.surface);
      item.executable_case_count += 1;
      if (item.examples.length < sampleLimit && !item.examples.includes(record.source)) item.examples.push(record.source);
    }
  }
  return [...grouped.values()]
    .sort((a, b) => b.executable_case_count - a.executable_case_count || a.surface.localeCompare(b.surface))
    .map((item, index) => ({
      rank: index + 1,
      action_class: "lexicon_work",
      ...item,
      linguistic_confidence: null,
      evidence_weight: 0,
      reason: "Unknown token observed in the executable development corpus. Count is a test/development reach signal only, not lexical productivity or frequency evidence.",
    }));
}

function unmappedGapBuckets(records = [], lookup, sampleLimit = DEFAULT_SAMPLE_LIMIT) {
  const buckets = new Map();
  for (const record of records) {
    if (record.coverage_status === "COVERED") continue;
    const mapped = labelsForCoverageRecord(record).some((label) => lookup.has(label));
    if (mapped) continue;
    const status = record.coverage_status || "UNKNOWN";
    if (!buckets.has(status)) buckets.set(status, { coverage_status: status, count: 0, examples: [] });
    const bucket = buckets.get(status);
    bucket.count += 1;
    if (bucket.examples.length < sampleLimit) {
      bucket.examples.push({
        source: record.source,
        context_source: record.context_source || "",
        categories: record.categories || [],
        unwrapped_root_surfaces: record.unwrapped_root_surfaces || [],
      });
    }
  }
  return [...buckets.values()]
    .sort((a, b) => (GAP_STATUS_POINTS[b.coverage_status] || 0) - (GAP_STATUS_POINTS[a.coverage_status] || 0)
      || b.count - a.count || a.coverage_status.localeCompare(b.coverage_status))
    .map((bucket) => ({
      ...bucket,
      action_class: bucket.coverage_status === "UNKNOWN_LEXICON" ? "lexicon_work" : "manual_review",
      linguistic_confidence: null,
      evidence_weight: 0,
    }));
}

function buildPriorityReport(options = {}) {
  const coverageRecords = options.coverageRecords || [];
  const canonicalReadiness = options.readinessRecords || [];
  const debtRows = options.debtRows || [];
  const runtimeVersion = options.runtimeVersion || "";
  const sampleLimit = Number.isInteger(options.sampleLimit) ? options.sampleLimit : DEFAULT_SAMPLE_LIMIT;
  const limit = Number.isInteger(options.limit) ? options.limit : DEFAULT_LIMIT;
  const lookup = readinessLookup(canonicalReadiness);
  const candidates = new Map();

  function ensure(row) {
    if (!candidates.has(row.construction_uuid)) {
      candidates.set(row.construction_uuid, {
        construction_uuid: row.construction_uuid,
        construction_code: row.construction_code,
        canonical_name: row.canonical_name,
        legacy_label: row.legacy_label,
        linguistic_status: row.linguistic_status,
        candidate_state: row.candidate_state,
        canonical_readiness_score: row.readiness_score,
        nearest_missing_gate: row.nearest_missing_gate || "",
        canonical_next_best_action: row.next_best_action || "",
        action_class: actionClassForReadiness(row),
        coverage_gap_counts: {},
        gap_record_count: 0,
        architecture_debt_trace_count: 0,
        context_dependent_record_count: 0,
        examples: [],
      });
    }
    return candidates.get(row.construction_uuid);
  }

  for (const record of coverageRecords) {
    if (record.coverage_status === "COVERED") continue;
    const matchedReadiness = unique(labelsForCoverageRecord(record).map((label) => lookup.get(label)?.construction_uuid))
      .map((uuid) => canonicalReadiness.find((row) => row.construction_uuid === uuid))
      .filter(Boolean);
    for (const readiness of matchedReadiness) {
      if (readiness.candidate_state === "excluded_nonlanguage") continue;
      const candidate = ensure(readiness);
      const status = record.coverage_status || "UNKNOWN";
      candidate.coverage_gap_counts[status] = (candidate.coverage_gap_counts[status] || 0) + 1;
      candidate.gap_record_count += 1;
      if ((record.categories || []).includes("context_dependent_or_incomplete")) candidate.context_dependent_record_count += 1;
      if (candidate.examples.length < sampleLimit && !candidate.examples.includes(record.source)) candidate.examples.push(record.source);
    }
  }

  for (const debt of debtRows) {
    if (debt.transition_status !== "migration_candidate") continue;
    const readiness = lookup.get(debt.construction || "");
    if (!readiness || readiness.candidate_state === "excluded_nonlanguage") continue;
    const candidate = ensure(readiness);
    candidate.architecture_debt_trace_count += 1;
    if (candidate.examples.length < sampleLimit && debt.source && !candidate.examples.includes(debt.source)) candidate.examples.push(debt.source);
  }

  const ranked = [...candidates.values()]
    .map((candidate) => ({ ...candidate, score: scoreCandidate(candidate) }))
    .filter((candidate) => candidate.score.total > 0)
    .sort((a, b) => b.score.total - a.score.total || a.construction_code.localeCompare(b.construction_code))
    .map((candidate, index) => ({ rank: index + 1, ...candidate }))
    .slice(0, limit);

  const coverageStatusCounts = {};
  for (const record of coverageRecords) coverageStatusCounts[record.coverage_status] = (coverageStatusCounts[record.coverage_status] || 0) + 1;

  return {
    schema: PRIORITY_SCHEMA,
    runtime_version: runtimeVersion,
    policy: {
      purpose: "deterministic_development_work_prioritization_only",
      linguistic_confidence: null,
      evidence_weight: 0,
      frequency_is_linguistic_evidence: false,
      architecture_cleanliness_is_linguistic_evidence: false,
      test_count_is_linguistic_evidence: false,
      learner_value_factor: "not_available_in_canonical_inputs_and_not_invented",
      ranking_scope: "development sequencing; never promotion or grammaticality",
      gap_status_points: GAP_STATUS_POINTS,
      gap_status_cap: GAP_STATUS_CAP,
      architecture_debt_points_per_trace: ARCHITECTURE_DEBT_POINTS_PER_TRACE,
      architecture_debt_cap: ARCHITECTURE_DEBT_CAP,
      candidate_state_points: CANDIDATE_STATE_POINTS,
      missing_gate_points: MISSING_GATE_POINTS,
    },
    inputs: {
      executable_case_count: coverageRecords.length,
      readiness_record_count: canonicalReadiness.length,
      architecture_debt_row_count: debtRows.filter((row) => row.transition_status === "migration_candidate").length,
      coverage_status_counts: coverageStatusCounts,
    },
    ranked_construction_work: ranked,
    unknown_lexicon_work: unknownLexiconQueue(coverageRecords, sampleLimit).slice(0, limit),
    unmapped_gap_buckets: unmappedGapBuckets(coverageRecords, lookup, sampleLimit),
  };
}

function analyzePriorities(options = {}) {
  const root = options.root || path.resolve(__dirname, "..");
  const api = options.api || loadRuntimeApi({ apiNames: [
    "analyzeLine",
    "diagnosticSummary",
    "diagnosticFinalRows",
    "labelTransitionAuditRows",
    "CANTO_SPAN_RUNTIME_VERSION",
  ] });
  const corpus = options.corpus || buildExecutableCorpus(root);
  const coverageRecords = [];
  const debtRows = [];

  for (const item of corpus) {
    const analysis = api.analyzeLine(item.source, item.context_source || null);
    const record = enhanceCoverageRecord(api.diagnosticSummary(analysis), api.diagnosticFinalRows(analysis), { source: item.source });
    record.context_source = item.context_source || "";
    record.origins = item.origins || [];
    coverageRecords.push(record);
    for (const row of api.labelTransitionAuditRows(analysis)) debtRows.push({ ...row, source: item.source, context_source: item.context_source || "" });
  }

  const readiness = readinessRecords(root);
  return buildPriorityReport({
    coverageRecords,
    readinessRecords: readiness.records,
    debtRows,
    runtimeVersion: api.CANTO_SPAN_RUNTIME_VERSION || api.runtimeVersion || "",
    sampleLimit: options.sampleLimit,
    limit: options.limit,
  });
}

function formatHuman(report) {
  const lines = [
    `Parser work priorities (development-only) — runtime ${report.runtime_version || "unknown"}`,
    `Executable cases: ${report.inputs.executable_case_count}; ranked construction candidates: ${report.ranked_construction_work.length}`,
    "Frequency/test counts carry evidence weight 0. No learner-value factor is inferred.",
    "",
    "Ranked construction work:",
  ];
  if (!report.ranked_construction_work.length) lines.push("  (none)");
  for (const item of report.ranked_construction_work) {
    lines.push(`  ${item.rank}. ${item.construction_code} ${item.canonical_name} — ${item.action_class} — score ${item.score.total}`);
    lines.push(`     state=${item.candidate_state}; missing_gate=${item.nearest_missing_gate || "none"}; gaps=${JSON.stringify(item.coverage_gap_counts)}; debt=${item.architecture_debt_trace_count}`);
    if (item.canonical_next_best_action) lines.push(`     canonical next action: ${item.canonical_next_best_action}`);
    if (item.examples.length) lines.push(`     examples: ${item.examples.join(" | ")}`);
  }
  lines.push("", "Unknown lexicon work:");
  if (!report.unknown_lexicon_work.length) lines.push("  (none)");
  for (const item of report.unknown_lexicon_work) {
    lines.push(`  ${item.rank}. ${item.surface} — ${item.executable_case_count} executable cases`);
  }
  lines.push("", "Unmapped coverage-gap buckets:");
  if (!report.unmapped_gap_buckets.length) lines.push("  (none)");
  for (const bucket of report.unmapped_gap_buckets) lines.push(`  ${bucket.coverage_status}: ${bucket.count} (${bucket.action_class})`);
  return lines.join("\n");
}

function parseArgs(argv) {
  const out = { json: false, limit: DEFAULT_LIMIT, sampleLimit: DEFAULT_SAMPLE_LIMIT };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--json") out.json = true;
    else if (arg === "--limit") out.limit = Number(argv[++index]);
    else if (arg === "--samples") out.sampleLimit = Number(argv[++index]);
    else if (arg === "--help" || arg === "-h") out.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!Number.isInteger(out.limit) || out.limit < 1) throw new Error("--limit must be a positive integer.");
  if (!Number.isInteger(out.sampleLimit) || out.sampleLimit < 0) throw new Error("--samples must be a non-negative integer.");
  return out;
}

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log("Usage: node tools/parser-work-prioritizer.js [--json] [--limit N] [--samples N]");
    process.exit(0);
  }
  const report = analyzePriorities(args);
  console.log(args.json ? JSON.stringify(report, null, 2) : formatHuman(report));
}

module.exports = {
  PRIORITY_SCHEMA,
  GAP_STATUS_POINTS,
  CANDIDATE_STATE_POINTS,
  MISSING_GATE_POINTS,
  actionClassForReadiness,
  readinessLookup,
  gapPointsForCounts,
  debtPointsForCount,
  unknownLexiconQueue,
  unmappedGapBuckets,
  scoreCandidate,
  buildPriorityReport,
  analyzePriorities,
  formatHuman,
};
