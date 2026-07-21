#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const BUNDLED_CORPUS_PATH = path.resolve(
  __dirname,
  "../test-data/pre-intermediate-gold-corpus.tsv"
);
const DEFAULT_CORPUS_PATH = BUNDLED_CORPUS_PATH;

const CORPUS_EQUIVALENTS = new Map([
  ["NumberClassifierNP", ["QuantifiedClassifierNP"]],
  ["PluralMarkedNP", ["DiMarkedNP"]],
  ["PerfectiveAspectVP", ["PerfectiveVP"]],
  ["ExperientialAspectVP", ["ExperientialVP", "ExperientialClause"]],
  ["CompletionAspectVP", ["CompletionVP"]],
  ["DirectionalMotionVP", ["MotionGoalVP"]],
  ["Prohibitive", ["ProhibitiveImperative"]],
  ["UrgencyMarker", ["DegreeMannerAdverbial"]],
  ["CauseResultClauseSequence", ["ClauseLinkingSequence"]],
  ["ContrastClauseSequence", ["ClauseLinkingSequence"]],
  ["ConditionalClauseSequence", ["ClauseLinkingSequence"]],
  ["SequentialClauseSequence", ["ClauseLinkingSequence"]],
  ["OrderedClauseSequence", ["ClauseLinkingSequence"]],
  ["TemporalSubordinateClause", ["ClauseLinkingSequence"]],
  ["ReportedContentClause", ["ReportedSpeech"]],
  ["CognitionContentClause", ["CognitionContentFrame"]],
]);

function parseArgs(argv) {
  const result = { corpusPath: DEFAULT_CORPUS_PATH, researchNotePath: "", area: "", json: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--json") {
      result.json = true;
    } else if (arg === "--research-note") {
      const notePath = argv[index + 1] || "";
      if (!notePath || notePath.startsWith("--")) throw new Error("--research-note requires an explicit markdown path");
      result.researchNotePath = path.resolve(notePath);
      index += 1;
    } else if (arg.startsWith("--research-note=")) {
      const notePath = arg.slice("--research-note=".length);
      if (!notePath) throw new Error("--research-note requires an explicit markdown path");
      result.researchNotePath = path.resolve(notePath);
    } else if (arg === "--area") {
      result.area = argv[index + 1] || "";
      index += 1;
    } else if (arg.startsWith("--area=")) {
      result.area = arg.slice("--area=".length);
    } else if (!arg.startsWith("--")) {
      result.corpusPath = path.resolve(arg);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return result;
}

function loadParserApi(mainPath) {
  class Plugin {}
  class PluginSettingTab {}
  class Setting {}
  class Notice {}

  const moduleRecord = { exports: {} };
  const context = {
    module: moduleRecord,
    exports: moduleRecord.exports,
    require: (id) => id === "obsidian"
      ? { Plugin, PluginSettingTab, Setting, Notice }
      : require(id),
    console,
    setTimeout,
    clearTimeout,
    Buffer,
  };
  const exportsSuffix = `
module.exports.__corpusApi = {
  analyzeLine,
  diagnosticSummary,
  diagnosticFinalRows,
  diagnosticJsonPayloadForNote,
  normalizationAuditSummary,
  registryAuditSummary,
  learnerDisplayAuditSummary,
  learnerUiHoverAuditSummary,
  wrapperCoverageAuditSummary,
  retiredAliases: Object.fromEntries(RETIRED_CONSTRUCTION_LABEL_ALIASES),
};`;
  vm.runInNewContext(
    fs.readFileSync(mainPath, "utf8") + exportsSuffix,
    context,
    { filename: mainPath }
  );
  return moduleRecord.exports.__corpusApi;
}

function parseTsv(tsv) {
  const lines = tsv.trim().split(/\r?\n/).map((line) => line.split("\t"));
  const header = lines.shift();
  const columns = Object.fromEntries(header.map((name, index) => [name, index]));
  const required = ["id", "area", "type", "priority", "source", "expected_top_construction", "expected_status"];
  for (const name of required) {
    if (columns[name] === undefined) throw new Error(`Corpus is missing required column: ${name}`);
  }
  return lines.map((fields) => Object.fromEntries(header.map((name, index) => [name, fields[index] || ""])));
}

function selectedFields(source, names) {
  return Object.fromEntries(names.map((name) => [name, (source && source[name]) || 0]));
}

function researchCoverageProjection(coverage) {
  return {
    status: coverage.status,
    canto_span_fence_openers_found: coverage.canto_span_fence_openers_found,
    canto_span_blocks_parsed: coverage.canto_span_blocks_parsed,
    source_lines_with_diagnostics: coverage.source_lines_with_diagnostics,
    generated_diagnostics: coverage.generated_diagnostics,
    unique_sources: coverage.unique_sources,
    duplicate_source_count: coverage.duplicate_source_count,
    duplicate_sources: coverage.duplicate_sources || [],
    extraction_warnings: coverage.extraction_warnings || [],
    diagnostic_errors: coverage.diagnostic_errors || [],
    normalization_audit_status: coverage.normalization_audit_status,
    normalization_audit: selectedFields(coverage.normalization_audit, [
      "normalization_trace_count",
      "parser_shadow_repair_count",
      "missing_shadow_repair_note_count",
      "review_suggestion_count",
      "folded_lexical_repair_count",
      "normalized_source_count",
      "unsafe_normalization_count",
      "applied_review_suggestion_count",
      "raw_display_replacement_count",
      "untraced_shadow_change_count",
    ]),
    registry_audit_status: coverage.registry_audit_status,
    registry_audit: selectedFields(coverage.registry_audit, [
      "invalid_learner_role_count",
      "invalid_slot_name_count",
      "invalid_construction_label_count",
      "invalid_parser_decision_label_count",
    ]),
    learner_display_audit_status: coverage.learner_display_audit_status,
    wrapper_coverage_audit_status: coverage.wrapper_coverage_audit_status,
    wrapper_coverage_audit: selectedFields(coverage.wrapper_coverage_audit, [
      "wrapper_row_count",
      "unaccounted_wrapper_token_count",
    ]),
  };
}

function researchTraceProjection(detail) {
  if (!detail) return undefined;
  const fields = [
    "kind",
    "surface",
    "construction_type",
    "template_family",
    "template",
    "assigned_slots",
    "surfaces",
    "reason",
    "formula_type",
    "fragment_subtype",
    "argument_order",
    "predicate_subtype",
    "role_overrides",
    "scope_host",
    "particle_subtype",
    "epistemic_scope",
    "context_requirement_status",
    "missing_argument_slots",
    "missing_slot_details",
    "antecedent_status",
    "context_turn_id",
    "question_id",
    "antecedent_span",
    "selected_alternative",
    "subject_status",
    "null_subject",
    "null_object",
    "null_object_link",
    "aspect",
    "complement_antecedent",
    "particle_contribution",
    "response_particle",
    "candidate_readings",
    "overt_head",
    "omission_analysis_candidates",
    "semantic_review_flags",
    "not_claims",
  ];
  return Object.fromEntries(fields
    .filter((name) => detail[name] !== undefined)
    .map((name) => [name, detail[name]]));
}

function researchFinalRowProjection(row) {
  return {
    kind: row.kind,
    depth: row.depth,
    parent: row.parent,
    construction: row.construction || "",
    role: row.role || "",
    syntax: row.syntax || "",
    display_surface: row.display_surface || row.surface || "",
    parser_surface: row.parser_surface || row.surface || "",
    slots: row.slots || [],
    trace_kind: row.trace_kind || "",
    trace_detail: researchTraceProjection(row.trace_detail),
  };
}

function researchAuditProjection(diagnostic) {
  return {
    normalization: selectedFields(diagnostic.normalization_audit, [
      "unsafe_normalization_count",
      "untraced_shadow_change_count",
      "applied_review_suggestion_count",
      "raw_display_replacement_count",
      "missing_shadow_repair_note_count",
    ]),
    registry: selectedFields(diagnostic.registry_audit, [
      "invalid_learner_role_count",
      "invalid_slot_name_count",
      "invalid_construction_label_count",
      "invalid_parser_decision_label_count",
    ]),
    wrapper: selectedFields(diagnostic.wrapper_coverage_audit, [
      "wrapper_row_count",
      "unaccounted_wrapper_token_count",
    ]),
  };
}

function researchNoteSemanticProjection(payload, notePath) {
  const coverage = researchCoverageProjection(payload.coverage || {});
  const diagnostics = (payload.diagnostics || []).map((diagnostic) => ({
    block_index: diagnostic.block_index,
    block_start_line: diagnostic.block_start_line,
    block_end_line: diagnostic.block_end_line,
    source_line_index: diagnostic.source_line_index,
    source: diagnostic.source,
    parser_shadow_source: diagnostic.parser_shadow_source,
    top_constructions: (diagnostic.summary && diagnostic.summary.top_constructions) || [],
    top_child_constructions: (diagnostic.summary && diagnostic.summary.top_child_constructions) || [],
    semantic_review_flags: (diagnostic.summary && diagnostic.summary.semantic_review_flags) || [],
    audits: researchAuditProjection(diagnostic),
    final_construction_tree: (diagnostic.final_construction_tree || []).map(researchFinalRowProjection),
  }));
  const complete = (payload.diagnostic_errors || []).length === 0
    && coverage.extraction_warnings.length === 0
    && coverage.duplicate_source_count === 0
    && coverage.generated_diagnostics === diagnostics.length
    && coverage.unique_sources === diagnostics.length;
  return {
    schema: "canto-span-research-note-semantic-projection-v1",
    generated_at: payload.generated_at,
    note_path: notePath,
    read_only: true,
    complete,
    coverage,
    diagnostic_errors: payload.diagnostic_errors || [],
    diagnostics,
    review_reminder: "Aggregate audit status is not semantic acceptance. Inspect changed top/final trees, child spans, roles, slots, trace detail, context status, and negative controls.",
  };
}

function terminalFreeSurface(source) {
  return String(source || "")
    .replace(/[\s\u3000]+/g, "")
    .replace(/[。！？?!]+$/u, "");
}

function constructionRowsFor(api, analysis) {
  return api.diagnosticFinalRows(analysis).filter((row) => row.kind === "construction");
}

function topConstructionCoversSource(rows, source) {
  const target = terminalFreeSurface(source);
  return rows.some((row) => row.depth === 0 && terminalFreeSurface(row.display_surface || row.surface) === target);
}

function rowHasAllSlots(row, slots) {
  const actual = new Set(row.slots || []);
  return slots.every((slot) => actual.has(slot));
}

function rowDisplaySurface(row) {
  return terminalFreeSurface((row && (row.display_surface || row.surface)) || "");
}

function semanticContractFailures(corpusRow, rows) {
  const failures = [];
  const topRows = rows.filter((row) => row.depth === 0);
  const topHas = (construction) => topRows.some((row) => row.construction === construction);
  const childRows = (parent, construction = "") => rows.filter((row) =>
    row.depth > 0
    && row.parent === parent
    && (!construction || row.construction === construction)
  );

  if (corpusRow.id === "PI-ACCEPT-001") {
    const top = topRows.find((row) => row.construction === "LexicalGiveRelation");
    const participant1 = rows.find((row) =>
      row.parent === "LexicalGiveRelation"
      && rowDisplaySurface(row) === "你"
    );
    const participant2 = rows.find((row) =>
      row.parent === "LexicalGiveRelation"
      && rowDisplaySurface(row) === "水"
    );
    if (!top) failures.push("lexical_give_top_missing");
    if (!participant1 || !rowHasAllSlots(participant1, ["post_give_participant_1"]) || rowHasAllSlots(participant1, ["theme"]) || rowHasAllSlots(participant1, ["recipient"])) {
      failures.push("lexical_give_participant_1_role_mismatch");
    }
    if (!participant2 || !rowHasAllSlots(participant2, ["post_give_participant_2"]) || rowHasAllSlots(participant2, ["theme"]) || rowHasAllSlots(participant2, ["recipient"])) {
      failures.push("lexical_give_participant_2_role_mismatch");
    }
    if (top && (!top.trace_detail || top.trace_detail.relation_profile !== "nonbaseline_participant_order_unresolved" || top.trace_detail.weight_rule_used !== false)) {
      failures.push("lexical_give_unresolved_profile_trace_mismatch");
    }
  }

  if (corpusRow.id === "PI-ADJ-006") {
    if (!topHas("VerbComplementVP")) failures.push("degree_manner_complement_top_mismatch");
    if (topHas("ReportedSpeech")) failures.push("degree_manner_misread_as_reported_speech");
    const degreeChild = childRows("VerbComplementVP", "DegreeMannerAdverbial");
    if (!degreeChild.length) failures.push("degree_manner_complement_child_missing");
  }

  if (corpusRow.id === "PI-PART-003") {
    const formula = topRows.find((row) =>
      row.construction === "FormulaDiscourseUnit"
      && row.trace_detail
      && row.trace_detail.formula_type === "permission_acceptability_response"
    );
    if (!formula) failures.push("permission_response_formula_missing");
    if (topHas("ModalVP")) failures.push("contextual_permission_response_promoted_as_clean_modal_vp");
  }

  if (corpusRow.id === "PI-PART-007") {
    if (!topHas("FragmentQuestion")) failures.push("accepted_fragment_question_top_missing");
    if (topHas("NeedsContext")) failures.push("accepted_fragment_question_wrapped_as_needs_context");
  }




  return failures;
}

function expectedConstructionMatch(expected, rows, retiredAliases) {
  const actualTypes = new Set(rows.map((row) => row.construction));
  if (actualTypes.has(expected)) return { matched: true, via: expected };

  const candidates = new Set(CORPUS_EQUIVALENTS.get(expected) || []);
  if (retiredAliases[expected]) candidates.add(retiredAliases[expected]);
  for (const candidate of candidates) {
    if (actualTypes.has(candidate)) return { matched: true, via: candidate };
  }

  if (expected === "DemonstrativeQuantityNP"
      && actualTypes.has("ModifiedNP")
      && actualTypes.has("DiMarkedNP")) {
    return { matched: true, via: "ModifiedNP+DiMarkedNP" };
  }
  if (expected === "TimeAdjunctClause") {
    const match = rows.find((row) => ["SubjectPredicateClause", "TemporalClause"].includes(row.construction)
      && rowHasAllSlots(row, ["time", "predicate"]));
    if (match) return { matched: true, via: `${match.construction}[time]` };
  }
  if (expected === "TimePlaceClause") {
    const clause = rows.find((row) => ["SubjectPredicateClause", "TemporalClause"].includes(row.construction)
      && rowHasAllSlots(row, ["time", "predicate"]));
    const placePredicate = rows.find((row) => rowHasAllSlots(row, ["location", "predicate"]));
    if (clause && placePredicate) return { matched: true, via: `${clause.construction}[time]+${placePredicate.construction}[location]` };
  }
  if (expected === "LocativeAdjunctClause"
      && actualTypes.has("CoverbFrame")
      && actualTypes.has("LocativePlacePhrase")) {
    return { matched: true, via: "CoverbFrame+LocativePlacePhrase" };
  }
  if (expected === "ComitativeClause") {
    const match = rows.find((row) => row.construction === "CoverbFrame" && rowHasAllSlots(row, ["co_participant", "predicate"]));
    if (match) return { matched: true, via: "CoverbFrame[co_participant]" };
  }
  if (expected === "InstrumentalClause") {
    const match = rows.find((row) => row.construction === "CoverbFrame" && rowHasAllSlots(row, ["instrument", "predicate"]));
    if (match) return { matched: true, via: "CoverbFrame[instrument]" };
  }
  if (expected === "FragmentAnswer") {
    const match = rows.find((row) => ["FormulaDiscourseUnit", "ModalVP"].includes(row.construction));
    if (match) return { matched: true, via: match.construction };
  }
  if (expected === "ParticleClause") {
    const match = rows.find((row) => row.depth === 0 && rowHasAllSlots(row, ["particle"]));
    if (match) return { matched: true, via: `${match.construction}[particle]` };
  }

  const formulaSubtypeByExpected = {
    ParticleQuestion: "confirmation_surprise_question",
    NegatedExistentialFragment: "negated_existential_fragment",
    AcceptabilityFragment: "acceptability_fragment",
    DiscourseAgreementFragment: "discourse_agreement_fragment",
  };
  const requiredFormulaSubtype = formulaSubtypeByExpected[expected];
  if (requiredFormulaSubtype) {
    const match = rows.find((row) => row.construction === "FormulaDiscourseUnit"
      && row.trace_detail
      && row.trace_detail.formula_type === requiredFormulaSubtype);
    if (match) return { matched: true, via: `FormulaDiscourseUnit[formula_type=${requiredFormulaSubtype}]` };
  }
  return { matched: false, via: "" };
}

function evaluateCorpus(api, corpusRows) {
  const results = [];
  const safety = {
    unsafe_normalization_count: 0,
    untraced_shadow_change_count: 0,
    applied_review_suggestion_count: 0,
    raw_display_replacement_count: 0,
    missing_shadow_repair_note_count: 0,
    invalid_learner_role_count: 0,
    invalid_slot_name_count: 0,
    invalid_construction_label_count: 0,
    invalid_parser_decision_label_count: 0,
    generic_hover_gloss_count: 0,
    wrapper_hole_count: 0,
  };

  for (const corpusRow of corpusRows) {
    const analysis = api.analyzeLine(corpusRow.source);
    const summary = api.diagnosticSummary(analysis);
    const finalRows = api.diagnosticFinalRows(analysis);
    const constructionRows = finalRows.filter((row) => row.kind === "construction");
    const match = expectedConstructionMatch(corpusRow.expected_top_construction, constructionRows, api.retiredAliases);
    const fullSpan = topConstructionCoversSource(constructionRows, corpusRow.source);
    const severeReviewFlags = (summary.semantic_review_flags || []).filter((flag) => flag !== "review_trace_present");
    const allowedReviewFlags = new Set(["PI-PART-006", "PI-PART-007", "PI-PART-008"].includes(corpusRow.id)
      ? ["needs_context_parse", "context_required_unresolved"]
      : []);
    const unexpectedReview = corpusRow.expected_status === "positive"
      && severeReviewFlags.some((flag) => !allowedReviewFlags.has(flag));
    const reasons = [];
    if (!match.matched) reasons.push("expected_construction_missing");
    if (!fullSpan) reasons.push("no_full_span_top_construction");
    if (unexpectedReview) reasons.push("unexpected_semantic_review");
    reasons.push(...semanticContractFailures(corpusRow, finalRows));

    const normalization = api.normalizationAuditSummary(analysis);
    const registry = api.registryAuditSummary(analysis);
    const hover = api.learnerUiHoverAuditSummary(analysis);
    const wrapper = api.wrapperCoverageAuditSummary(analysis);
    for (const key of [
      "unsafe_normalization_count",
      "untraced_shadow_change_count",
      "applied_review_suggestion_count",
      "raw_display_replacement_count",
      "missing_shadow_repair_note_count",
    ]) safety[key] += normalization[key] || 0;
    for (const key of [
      "invalid_learner_role_count",
      "invalid_slot_name_count",
      "invalid_construction_label_count",
      "invalid_parser_decision_label_count",
    ]) safety[key] += registry[key] || 0;
    safety.generic_hover_gloss_count += hover.missing_plain_learner_gloss_count || 0;
    safety.wrapper_hole_count += wrapper.unaccounted_wrapper_token_count || 0;

    results.push({
      ...corpusRow,
      pass: reasons.length === 0,
      reasons,
      matched_via: match.via,
      top_constructions: summary.top_constructions || [],
      construction_tree: constructionRows.map((row) => row.construction),
      semantic_review_flags: summary.semantic_review_flags || [],
    });
  }
  return { results, safety };
}

function summarize(results, safety) {
  const areas = {};
  for (const row of results) {
    const area = areas[row.area] || { total: 0, pass: 0, fail: 0 };
    area.total += 1;
    if (row.pass) area.pass += 1;
    else area.fail += 1;
    areas[row.area] = area;
  }
  const pass = results.filter((row) => row.pass).length;
  const positive = results.filter((row) => row.expected_status === "positive");
  const positivePass = positive.filter((row) => row.pass).length;
  const safetyFailureCount = Object.values(safety).reduce((sum, value) => sum + value, 0);
  return {
    total: results.length,
    pass,
    fail: results.length - pass,
    coverage_percent: results.length ? 100 : 0,
    positive_construction_percent: positive.length ? Number((positivePass * 100 / positive.length).toFixed(1)) : 0,
    strict_ready: pass === results.length && safetyFailureCount === 0,
    areas,
    safety,
  };
}

function printText(report, failures, corpusPath) {
  console.log(`Corpus: ${corpusPath}`);
  console.log(`Strict result: ${report.pass}/${report.total} pass; ${report.fail} fail`);
  console.log(`Positive construction correctness: ${report.positive_construction_percent}%`);
  console.log("Areas:");
  for (const [area, counts] of Object.entries(report.areas)) {
    console.log(`  ${area}: ${counts.pass}/${counts.total} pass`);
  }
  console.log(`Safety: ${JSON.stringify(report.safety)}`);
  if (failures.length) {
    console.log("Failures:");
    for (const row of failures) {
      console.log(`  ${row.id} [${row.area}] ${row.source} expected=${row.expected_top_construction} top=${row.top_constructions.join("+") || "NONE"} reasons=${row.reasons.join(",")}`);
    }
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const mainPath = path.resolve(__dirname, "..", "main.js");
  const api = loadParserApi(mainPath);
  if (options.researchNotePath) {
    if (options.area) throw new Error("--area cannot be combined with --research-note");
    const markdown = fs.readFileSync(options.researchNotePath, "utf8");
    const payload = api.diagnosticJsonPayloadForNote(markdown, options.researchNotePath);
    const projection = researchNoteSemanticProjection(payload, options.researchNotePath);
    console.log(JSON.stringify(projection, null, 2));
    if (!projection.complete) process.exitCode = 1;
    return;
  }
  let corpusRows = parseTsv(fs.readFileSync(options.corpusPath, "utf8"));
  if (options.area) corpusRows = corpusRows.filter((row) => row.area === options.area);
  const { results, safety } = evaluateCorpus(api, corpusRows);
  const report = summarize(results, safety);
  const failures = results.filter((row) => !row.pass);
  if (options.json) {
    console.log(JSON.stringify({ corpus_path: options.corpusPath, report, failures }, null, 2));
  } else {
    printText(report, failures, options.corpusPath);
  }
  if (!report.strict_ready) process.exitCode = 1;
}

main();
