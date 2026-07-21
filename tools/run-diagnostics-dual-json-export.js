#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function loadApi(mainPath) {
  class Plugin {}
  class PluginSettingTab {}
  class Setting {}
  class Notice {}
  const moduleRecord = { exports: {} };
  const context = {
    module: moduleRecord,
    exports: moduleRecord.exports,
    require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id),
    console,
    setTimeout,
    clearTimeout,
    Buffer,
  };
  vm.runInNewContext(
    fs.readFileSync(mainPath, "utf8") + `\nmodule.exports.__diagnosticExportApi = {
      diagnosticExportPathsForNotePath,
      diagnosticExportPayloadsForNote,
      diagnosticAcceptanceSummaryPayloadFromFull,
      diagnosticFullJsonPayloadForNote,
      runtimeVersion: CANTO_SPAN_RUNTIME_VERSION,
    };`,
    context,
    { filename: mainPath }
  );
  return moduleRecord.exports.__diagnosticExportApi;
}

const root = path.resolve(__dirname, "..");
const api = loadApi(path.join(root, "main.js"));
const manifestVersion = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8")).version;
const checks = [];
const failures = [];

function check(name, fn) {
  try {
    fn();
    checks.push({ name, pass: true });
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    checks.push({ name, pass: false, error: message });
    failures.push({ name, error: message });
  }
}

const markdown = [
  "# Diagnostics dual export test",
  "",
  "```canto-span",
  "一個人。",
  "三個字啊。",
  "@context: 呢句有幾多個字？",
  "四個字啊。",
  "我話貴。",
  "飲七杯度喇。",
  "```",
  "",
].join("\n");

const notePath = "Canto Span/_diagnostics/acceptance/dual-export-test.md";
const bundle = api.diagnosticExportPayloadsForNote(markdown, notePath);

check("runtime provenance", () => {
  assert(api.runtimeVersion === manifestVersion, `runtime ${api.runtimeVersion} != manifest ${manifestVersion}`);
});

check("two deterministic companion paths", () => {
  assert(bundle.paths.summaryPath.endsWith("dual-export-test.canto-span-acceptance-summary.json"), bundle.paths.summaryPath);
  assert(bundle.paths.fullPath.endsWith("dual-export-test.canto-span-full-diagnostics.json"), bundle.paths.fullPath);
  assert(bundle.paths.summaryPath !== bundle.paths.fullPath, "paths must differ");
});

check("summary and full share provenance", () => {
  assert(bundle.summary.export_id && bundle.summary.export_id === bundle.full.export_id, "export_id mismatch");
  assert(bundle.summary.generated_at === bundle.full.generated_at, "timestamp mismatch");
  assert(bundle.summary.companion_full_diagnostics_path === bundle.paths.fullPath, "summary full path mismatch");
  assert(bundle.full.companion_acceptance_summary_path === bundle.paths.summaryPath, "full summary path mismatch");
});

check("summary is row-complete", () => {
  assert(bundle.full.diagnostics.length === 5, `expected 5 full rows, got ${bundle.full.diagnostics.length}`);
  assert(bundle.summary.rows.length === bundle.full.diagnostics.length, "summary/full row count mismatch");
  assert(bundle.summary.diagnostic_row_count === bundle.full.diagnostics.length, "diagnostic_row_count mismatch");
  for (let i = 0; i < bundle.full.diagnostics.length; i += 1) {
    assert(bundle.summary.rows[i].diagnostic_index === bundle.full.diagnostics[i].diagnostic_index, `index mismatch ${i}`);
    assert(bundle.summary.rows[i].source === bundle.full.diagnostics[i].source, `source mismatch ${i}`);
  }
});

check("summary preserves compact structure, learner roles, syntax, and Jyutping", () => {
  const row = bundle.summary.rows.find((item) => item.source === "三個字啊。");
  assert(row, "missing 三個字 row");
  assert(row.top_constructions.length === 1 && row.top_constructions[0] === "QuantifiedTimeNP", `wrong top ${row.top_constructions}`);
  const zi = row.compact_final_construction_tree.find((item) => item.kind === "token" && item.surface === "字");
  assert(zi, "missing 字 compact token");
  assert(zi.role === "when", `wrong 字 role ${zi.role}`);
  assert(zi.jyutping === "zi6", `wrong 字 Jyutping ${zi.jyutping}`);
  assert(String(zi.syntax || "").includes("conventional_duration_unit"), `wrong 字 syntax ${zi.syntax}`);
  const construction = row.compact_final_construction_tree.find((item) => item.kind === "construction" && item.construction === "QuantifiedTimeNP");
  assert(construction && construction.trace_detail, "missing compact construction trace detail");
  assert(construction.trace_detail.selected_alternative === "conventional_clock_duration", "missing selected alternative");
  assert(construction.trace_detail.conventional_unit_value_minutes === 5, "missing unit value");
});

check("literal context remains visible in the summary", () => {
  const row = bundle.summary.rows.find((item) => item.source === "四個字啊。");
  assert(row, "missing 四個字 row");
  assert(row.top_constructions[0] === "QuantifiedClassifierNP", `wrong literal top ${row.top_constructions}`);
  assert(row.context.selected_alternative === "literal_character_count", `wrong literal alternative ${row.context.selected_alternative}`);
  const zi = row.compact_final_construction_tree.find((item) => item.kind === "token" && item.surface === "字");
  assert(zi && zi.role === "what", `wrong literal 字 role ${zi && zi.role}`);
});

check("runtime exports omit authoring evidence and retain active-label checks", () => {
  assert(bundle.full.coverage.status === "PASS", `parser coverage ${bundle.full.coverage.status}`);
  assert(bundle.full.coverage.runtime_construction_registry_audit_status === "PASS", `runtime registry ${bundle.full.coverage.runtime_construction_registry_audit_status}`);
  assert(bundle.summary.coverage.audit_statuses.runtime_construction_registry === "PASS", "summary runtime-registry lane missing");
  for (const row of bundle.summary.rows) {
    const constructions = row.compact_final_construction_tree.filter((item) => item.kind === "construction");
    assert(constructions.every((item) => item.runtime_registry && item.runtime_registry.active === true), `${row.source}: active runtime registry state missing`);
    assert(constructions.every((item) => !Object.prototype.hasOwnProperty.call(item, "grammar_legitimacy")), `${row.source}: authoring evidence leaked into runtime export`);
  }
  assert(bundle.summary.inspection_policy.required_process.some((line) => line.includes("grammar/active/*.md") && line.includes("grammar/archived/*.md")), "authoring-note inspection rule missing");
});

check("conservative full-review triggers cover risky rows", () => {
  const duration = bundle.summary.rows.find((item) => item.source === "三個字啊。");
  const unresolved = bundle.summary.rows.find((item) => item.source === "飲七杯度喇。");
  assert(duration.full_review.required, "duration ambiguity should require full review");
  assert(duration.full_review.reasons.includes("ambiguity_or_alternative_selected"), `duration reasons ${duration.full_review.reasons}`);
  assert(unresolved.full_review.required, "contextual-role row should require full review");
  assert(unresolved.full_review.reasons.includes("contextual_role_change"), `approximation reasons ${unresolved.full_review.reasons}`);
  assert(bundle.summary.full_review_required_count === bundle.summary.rows_requiring_full_review.length, "full-review count mismatch");
});

check("full artifact retains complete drill-down evidence", () => {
  const row = bundle.full.diagnostics.find((item) => item.source === "三個字啊。");
  assert(row, "missing full duration row");
  assert(Array.isArray(row.tokenization_before_construction_wrapping) && row.tokenization_before_construction_wrapping.length > 0, "missing tokenization");
  assert(Array.isArray(row.final_construction_tree) && row.final_construction_tree.length > 0, "missing full tree");
  assert(row.legend && Object.keys(row.legend).length > 0, "missing legend");
  assert(String(row.diagnostic_markdown || "").includes("Final construction tree"), "missing diagnostic markdown");
});

check("summary explicitly prohibits summary-only acceptance", () => {
  assert(bundle.summary.inspection_policy.summary_is_not_semantic_acceptance === true, "missing summary safety policy");
  assert(bundle.summary.inspection_policy.required_process.some((line) => line.includes("Inspect every summary row")), "missing all-row review rule");
  assert(bundle.summary.inspection_policy.required_process.some((line) => line.includes("full_review.required")), "missing drill-down rule");
  assert(bundle.summary.inspection_policy.required_process.some((line) => line.includes("Spot-check at least one row")), "missing clean-row spot-check rule");
});

const result = {
  runtime_version: api.runtimeVersion,
  status: failures.length ? "FAIL" : "PASS",
  checks,
  failures,
  summary_bytes: Buffer.byteLength(JSON.stringify(bundle.summary)),
  full_bytes: Buffer.byteLength(JSON.stringify(bundle.full)),
  summary_to_full_ratio: Number((Buffer.byteLength(JSON.stringify(bundle.summary)) / Buffer.byteLength(JSON.stringify(bundle.full))).toFixed(4)),
};

console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
