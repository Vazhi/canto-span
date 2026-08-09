#!/usr/bin/env node
"use strict";

const { loadRuntimeApi } = require("../../lib/runtime-api");
const { auditArchitecture } = require("../../../tools/parser-architecture-audit");

const api = loadRuntimeApi();
const cases = [
  "係唔係每個學生都鍾意睇電視呀？",
  "係唔係每個學生都鍾意音樂呀？",
  "係唔係每個學生都鍾意咗個學生呀？",
  "係唔係每個學生都鍾意燒鵝定係燒鴨多啲呀？",
  "你鍾唔鍾意燒鵝定係燒鴨多啲呀？"
];

const targetRows = cases.map((source) => {
  const analysis = api.analyzeLine(source);
  return {
    source,
    top_constructions: api.diagnosticSummary(analysis).top_constructions || [],
    constructions: api.diagnosticFinalRows(analysis)
      .filter((row) => row.kind === "construction")
      .map((row) => ({
        construction: row.construction || row.internal_construction || "",
        surface: row.surface || row.display_surface || "",
        trace_kind: row.trace_detail?.kind || row.trace || "",
        template_family: row.trace_detail?.template_family || "",
        template_subtype: row.trace_detail?.template_subtype || "",
        matcher_variant_id: row.trace_detail?.matcher_variant_id || "",
        rule: row.trace_detail?.rule || "",
        template: row.trace_detail?.template || [],
        binding_status: row.trace_detail?.binding_contract_status || ""
      }))
  };
});

const audit = auditArchitecture();
console.log(JSON.stringify({
  schema: "ab33-outer-question-probe-v2",
  target_rows: targetRows,
  architecture: {
    status: audit.status,
    blocking_count: audit.blocking_count,
    unexplained_matcher_split_count: audit.unexplained_matcher_split_count,
    failure_groups: audit.failure_groups
  }
}, null, 2));
process.exit(1);
