#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

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
  vm.runInNewContext(
    fs.readFileSync(mainPath, "utf8") + `\nmodule.exports.__semanticAcceptanceApi = {
      analyzeLine,
      diagnosticSummary,
      diagnosticFinalRows,
      normalizationAuditSummary,
      registryAuditSummary,
      wrapperCoverageAuditSummary,
    };`,
    context,
    { filename: mainPath }
  );
  return moduleRecord.exports.__semanticAcceptanceApi;
}

const api = loadParserApi(path.resolve(__dirname, "../main.js"));
const failures = [];
const results = [];
const A1_MODE = process.argv.slice(2).includes("--a1");
const A1_FIXTURE_PATH = path.resolve(__dirname, "../test-data/a1-context-status-fixture.tsv");

function check(source, assertion) {
  const analysis = api.analyzeLine(source);
  const summary = api.diagnosticSummary(analysis);
  const rows = api.diagnosticFinalRows(analysis);
  const constructionRows = rows.filter((row) => row.kind === "construction");
  const topRows = constructionRows.filter((row) => row.depth === 0);
  const top = topRows.map((row) => row.construction);
  const helpers = {
    summary,
    rows,
    constructionRows,
    topRows,
    top,
    topHas: (type) => top.includes(type),
    child: (parent, surface) => rows.find((row) => row.parent === parent && (row.display_surface || row.surface) === surface),
    constructionChild: (parent, type) => constructionRows.find((row) => row.parent === parent && row.construction === type),
  };
  let error = "";
  try {
    assertion(helpers);
  } catch (caught) {
    error = caught && caught.message ? caught.message : String(caught);
    failures.push({ source, error, top, semantic_review_flags: summary.semantic_review_flags || [] });
  }
  results.push({ source, pass: !error, top, error });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parseTsv(tsv) {
  const lines = String(tsv || "").trim().split(/\r?\n/).map((line) => line.split("\t"));
  const header = lines.shift();
  const required = [
    "id",
    "finding_ids",
    "case_type",
    "context_mode",
    "context_turn_id",
    "context_source",
    "source",
    "expected_top",
    "forbidden_top",
    "expected_child",
    "expected_context_status",
    "expected_antecedent_status",
    "expected_missing_slots",
    "expected_selected_alternative",
    "expected_subject_status",
    "expected_null_subject",
    "expected_null_object",
    "expected_antecedent_span",
    "expected_particle",
    "evidence_url",
  ];
  const columns = Object.fromEntries(header.map((name, index) => [name, index]));
  for (const name of required) {
    if (columns[name] === undefined) throw new Error(`A1 fixture is missing required column: ${name}`);
  }
  return lines
    .filter((fields) => fields.some((field) => field.trim()))
    .map((fields) => Object.fromEntries(header.map((name, index) => [name, fields[index] || ""])));
}

function splitFixtureList(value) {
  return String(value || "").split("|").map((item) => item.trim()).filter(Boolean);
}

function terminalFreeSurface(source) {
  return String(source || "")
    .replace(/[\s\u3000]+/g, "")
    .replace(/[。！？?!]+$/u, "");
}

function sameStringSet(actual, expected) {
  const left = [...new Set(actual || [])].sort();
  const right = [...new Set(expected || [])].sort();
  return JSON.stringify(left) === JSON.stringify(right);
}

function compactTraceDetail(detail) {
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

function compactFinalRow(row) {
  return {
    kind: row.kind,
    depth: row.depth,
    parent: row.parent,
    construction: row.construction || "",
    role: row.role || "",
    display_surface: row.display_surface || row.surface || "",
    slots: row.slots || [],
    trace_detail: compactTraceDetail(row.trace_detail),
  };
}

function runA1Fixture() {
  const fixtureRows = parseTsv(fs.readFileSync(A1_FIXTURE_PATH, "utf8"));
  const a1Results = [];
  const a1Failures = [];

  for (const fixtureRow of fixtureRows) {
    let error = "";
    let analysis;
    let summary;
    let finalRows = [];
    let normalization = {};
    let registry = {};
    let wrapper = {};
    try {
      assert(/^https:\/\//.test(fixtureRow.evidence_url), `${fixtureRow.id} evidence_url must be HTTPS`);
      assert(["none", "explicit", "unmarked"].includes(fixtureRow.context_mode), `${fixtureRow.id} invalid context_mode`);
      if (fixtureRow.context_mode !== "none") {
        assert(fixtureRow.context_source, `${fixtureRow.id} context_source missing`);
        assert(fixtureRow.context_turn_id, `${fixtureRow.id} context_turn_id missing`);
      }
      const explicitContext = fixtureRow.context_mode === "explicit"
        ? { turns: [{ id: fixtureRow.context_turn_id, source: fixtureRow.context_source }] }
        : null;
      analysis = api.analyzeLine(fixtureRow.source, explicitContext);
      summary = api.diagnosticSummary(analysis);
      finalRows = api.diagnosticFinalRows(analysis);
      normalization = api.normalizationAuditSummary(analysis);
      registry = api.registryAuditSummary(analysis);
      wrapper = api.wrapperCoverageAuditSummary(analysis);

      const constructionRows = finalRows.filter((row) => row.kind === "construction");
      const topRows = constructionRows.filter((row) => row.depth === 0);
      const top = topRows.map((row) => row.construction);
      const childConstructions = constructionRows.filter((row) => row.depth > 0).map((row) => row.construction);
      const expectedTop = splitFixtureList(fixtureRow.expected_top);
      const forbiddenTop = splitFixtureList(fixtureRow.forbidden_top);
      const expectedChildren = splitFixtureList(fixtureRow.expected_child);
      const expectedMissing = splitFixtureList(fixtureRow.expected_missing_slots);
      const resolution = analysis.context_resolution || null;

      for (const type of expectedTop) assert(top.includes(type), `${fixtureRow.id} missing top ${type}; got ${top.join("+") || "NONE"}`);
      for (const type of forbiddenTop) assert(!top.includes(type), `${fixtureRow.id} forbidden top ${type}`);
      for (const type of expectedChildren) assert(childConstructions.includes(type), `${fixtureRow.id} missing transparent child ${type}`);

      if (fixtureRow.expected_context_status === "none") {
        assert(!resolution || !resolution.context_requirement_status, `${fixtureRow.id} unexpectedly has context status ${resolution && resolution.context_requirement_status}`);
      } else if (fixtureRow.expected_context_status) {
        assert(resolution, `${fixtureRow.id} context_resolution missing`);
        assert(resolution.context_requirement_status === fixtureRow.expected_context_status,
          `${fixtureRow.id} context status ${resolution.context_requirement_status || "NONE"}; expected ${fixtureRow.expected_context_status}`);
      }

      if (fixtureRow.expected_antecedent_status === "not_linked") {
        assert(!resolution || resolution.antecedent_status !== "linked", `${fixtureRow.id} incompatible response was linked`);
      } else if (fixtureRow.expected_antecedent_status) {
        assert(resolution && resolution.antecedent_status === fixtureRow.expected_antecedent_status,
          `${fixtureRow.id} antecedent status ${(resolution && resolution.antecedent_status) || "NONE"}; expected ${fixtureRow.expected_antecedent_status}`);
      }

      if (expectedMissing.length) {
        assert(resolution, `${fixtureRow.id} missing context resolution for typed slots`);
        assert(sameStringSet(resolution.missing_argument_slots || [], expectedMissing),
          `${fixtureRow.id} missing slots ${JSON.stringify(resolution.missing_argument_slots || [])}; expected ${JSON.stringify(expectedMissing)}`);
      }
      if (fixtureRow.expected_selected_alternative) {
        assert(resolution && resolution.selected_alternative === fixtureRow.expected_selected_alternative,
          `${fixtureRow.id} selected alternative ${(resolution && resolution.selected_alternative) || "NONE"}; expected ${fixtureRow.expected_selected_alternative}`);
      }
      if (fixtureRow.expected_subject_status) {
        assert(resolution && resolution.subject_status === fixtureRow.expected_subject_status,
          `${fixtureRow.id} subject status ${(resolution && resolution.subject_status) || "NONE"}; expected ${fixtureRow.expected_subject_status}`);
      }
      if (fixtureRow.expected_null_subject) {
        assert(resolution && resolution.null_subject === fixtureRow.expected_null_subject,
          `${fixtureRow.id} null_subject ${(resolution && resolution.null_subject) || "NONE"}; expected ${fixtureRow.expected_null_subject}`);
      }
      if (fixtureRow.expected_null_object) {
        assert(resolution && resolution.null_object === fixtureRow.expected_null_object,
          `${fixtureRow.id} null_object ${(resolution && resolution.null_object) || "NONE"}; expected ${fixtureRow.expected_null_object}`);
      }
      if (fixtureRow.expected_antecedent_span) {
        assert(resolution && resolution.antecedent_span === fixtureRow.expected_antecedent_span,
          `${fixtureRow.id} antecedent span ${(resolution && resolution.antecedent_span) || "NONE"}; expected ${fixtureRow.expected_antecedent_span}`);
      }
      if (fixtureRow.context_mode === "explicit") {
        assert(analysis.explicit_context && analysis.explicit_context.supplied, `${fixtureRow.id} explicit context not recorded`);
        assert(analysis.explicit_context.turns.length === 1, `${fixtureRow.id} unexpected explicit turn count`);
        assert(analysis.explicit_context.turns[0].id === fixtureRow.context_turn_id, `${fixtureRow.id} context turn id mismatch`);
        assert(analysis.explicit_context.turns[0].source === fixtureRow.context_source, `${fixtureRow.id} context source mismatch`);
        assert(analysis.explicit_context.turns[0].parser_shadow_source === fixtureRow.context_source, `${fixtureRow.id} context raw/shadow mismatch`);
      } else {
        assert(!analysis.explicit_context || !analysis.explicit_context.supplied, `${fixtureRow.id} unmarked context was treated as explicit`);
      }

      assert(analysis.source === fixtureRow.source, `${fixtureRow.id} raw source changed`);
      assert(analysis.parser_shadow_source === fixtureRow.source, `${fixtureRow.id} parser shadow unexpectedly changed`);
      const targetSurface = terminalFreeSurface(fixtureRow.source);
      const finalTokenSurface = finalRows
        .filter((row) => row.kind === "token")
        .map((row) => row.display_surface || row.surface || "")
        .join("");
      assert(finalTokenSurface === targetSurface,
        `${fixtureRow.id} final token display ${finalTokenSurface} does not preserve raw target ${targetSurface}`);
      for (const row of topRows) {
        assert(terminalFreeSurface(row.display_surface || row.surface) === targetSurface,
          `${fixtureRow.id} top ${row.construction} does not cover the full target span`);
      }
      if (fixtureRow.expected_particle) {
        const visibleParticles = finalRows
          .filter((row) => row.kind === "token" && (row.slots || []).includes("particle"))
          .map((row) => row.display_surface || row.surface);
        assert(visibleParticles.includes(fixtureRow.expected_particle), `${fixtureRow.id} response particle ${fixtureRow.expected_particle} not visible`);
      }

      for (const key of [
        "unsafe_normalization_count",
        "untraced_shadow_change_count",
        "applied_review_suggestion_count",
        "raw_display_replacement_count",
        "missing_shadow_repair_note_count",
      ]) assert((normalization[key] || 0) === 0, `${fixtureRow.id} normalization safety ${key}=${normalization[key]}`);
      for (const key of [
        "invalid_learner_role_count",
        "invalid_slot_name_count",
        "invalid_construction_label_count",
        "invalid_parser_decision_label_count",
      ]) assert((registry[key] || 0) === 0, `${fixtureRow.id} registry safety ${key}=${registry[key]}`);
      assert((wrapper.unaccounted_wrapper_token_count || 0) === 0,
        `${fixtureRow.id} wrapper holes=${wrapper.unaccounted_wrapper_token_count}`);
    } catch (caught) {
      error = caught && caught.message ? caught.message : String(caught);
      a1Failures.push({ id: fixtureRow.id, source: fixtureRow.source, error });
    }

    a1Results.push({
      id: fixtureRow.id,
      finding_ids: splitFixtureList(fixtureRow.finding_ids),
      case_type: fixtureRow.case_type,
      source: fixtureRow.source,
      context_mode: fixtureRow.context_mode,
      context_turn_id: fixtureRow.context_turn_id,
      context_source: fixtureRow.context_source,
      evidence_url: fixtureRow.evidence_url,
      pass: !error,
      error,
      top: summary ? summary.top_constructions || [] : [],
      context_resolution: analysis ? compactTraceDetail(analysis.context_resolution) || null : null,
      final_tree: finalRows.filter((row) => row.kind !== "text").map(compactFinalRow),
      safety: {
        normalization_status: normalization.status,
        registry_status: registry.status,
        wrapper_status: wrapper.status,
        wrapper_holes: wrapper.unaccounted_wrapper_token_count || 0,
      },
    });
  }

  const report = {
    schema: "canto-span-a1-context-status-fixture-current",
    fixture_path: A1_FIXTURE_PATH,
    total: a1Results.length,
    pass: a1Results.filter((row) => row.pass).length,
    fail: a1Failures.length,
    strict_ready: a1Failures.length === 0,
    evidence_urls: [...new Set(a1Results.map((row) => row.evidence_url))],
    results: a1Results,
    failures: a1Failures,
  };
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = a1Failures.length ? 1 : 0;
}

function assertLexicalGive(source, profile, firstSurface, secondSurface) {
  check(source, ({ topHas, topRows, child }) => {
    assert(topHas("LexicalGiveRelation"), "LexicalGiveRelation top missing");
    const top = topRows.find((row) => row.construction === "LexicalGiveRelation");
    assert(top.trace_detail && top.trace_detail.relation_profile === profile, `relation_profile should be ${profile}`);
    const first = child("LexicalGiveRelation", firstSurface);
    const second = child("LexicalGiveRelation", secondSurface);
    assert(first && second, "overt post-GIVE participants missing");
    if (profile === "theme_recipient_baseline") {
      assert((first.slots || []).includes("theme") && (first.slots || []).includes("object"), `${firstSurface} lacks baseline Theme/Object`);
      assert((second.slots || []).includes("recipient_candidate") && (second.slots || []).includes("goal_candidate"), `${secondSurface} lacks baseline candidate roles`);
      assert(!(second.slots || []).includes("recipient"), `${secondSurface} incorrectly asserts recipient`);
    } else {
      assert((first.slots || []).includes("post_give_participant_1"), `${firstSurface} lacks participant-1 slot`);
      assert((second.slots || []).includes("post_give_participant_2"), `${secondSurface} lacks participant-2 slot`);
      for (const row of [first, second]) {
        assert(["theme", "recipient", "recipient_candidate", "goal", "goal_candidate", "beneficiary"].every((slot) => !(row.slots || []).includes(slot)), `${row.surface} has an asserted semantic role`);
      }
      assert(top.trace_detail.semantic_role_assignment === "unresolved", "nonbaseline roles not unresolved");
      assert(top.trace_detail.weight_rule_used === false, "weight rule must remain disabled");
    }
  });
}

if (A1_MODE) {
  runA1Fixture();
} else {
  assertLexicalGive("给你水。", "nonbaseline_participant_order_unresolved", "你", "水");
  assertLexicalGive("畀本書佢。", "theme_recipient_baseline", "本書", "佢");
  assertLexicalGive("畀佢本書。", "nonbaseline_participant_order_unresolved", "佢", "本書");
  assertLexicalGive("我畀錢你。", "theme_recipient_baseline", "錢", "你");

for (const source of ["講大聲啲。", "講慢啲。", "行快啲。"]) {
  check(source, ({ topHas, constructionChild }) => {
    assert(topHas("VerbComplementVP"), "postverbal degree/manner complement should be VerbComplementVP");
    assert(!topHas("ReportedSpeech"), "postverbal degree/manner complement must not be ReportedSpeech");
    assert(constructionChild("VerbComplementVP", "DegreeMannerAdverbial"), "transparent DegreeMannerAdverbial child missing");
  });
}

check("佢話佢唔嚟。", ({ topHas }) => {
  assert(topHas("ReportedSpeech"), "true 話 reported speech regressed");
});

for (const source of ["可以呀。", "可以啊。"]) {
  check(source, ({ topHas, topRows }) => {
    assert(topHas("FormulaDiscourseUnit"), "contextual permission response should be FormulaDiscourseUnit");
    assert(!topHas("ModalVP"), "contextual permission response must not be a clean ModalVP");
    const formula = topRows.find((row) => row.construction === "FormulaDiscourseUnit");
    assert(formula.trace_detail && formula.trace_detail.formula_type === "permission_acceptability_response", "permission response formula_type mismatch");
  });
}

for (const source of ["我可以去。", "佢要飲水。"]) {
  check(source, ({ topHas }) => {
    assert(topHas("ModalVP"), "complete modal + VP clause regressed");
  });
}

check("我食一。", ({ topHas, summary }) => {
  assert(topHas("MalformedCandidate"), "我食一 should remain malformed");
  assert((summary.semantic_review_flags || []).includes("malformed_candidate_parse"), "我食一 review flag missing");
});

check("我食。", ({ topHas }) => {
  assert(!topHas("SubjectPredicateClause"), "我食 must not become a clean standalone SubjectPredicateClause");
});

check("不食飯。", ({ topHas }) => {
  assert(topHas("NeedsContext"), "Mandarin-drift negator row should remain NeedsContext");
});

const report = {
  schema: "canto-span-semantic-acceptance-current",
  total: results.length,
  pass: results.filter((row) => row.pass).length,
  fail: failures.length,
  strict_ready: failures.length === 0,
  results,
  failures,
};

  console.log(JSON.stringify(report, null, 2));
  process.exitCode = failures.length ? 1 : 0;
}
