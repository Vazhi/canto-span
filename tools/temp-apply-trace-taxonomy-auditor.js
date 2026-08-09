#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const filePath = path.resolve(__dirname, "parser-coverage-report.js");
let text = fs.readFileSync(filePath, "utf8");

function replaceOnce(from, to, label) {
  if (!text.includes(from)) throw new Error(`missing ${label} marker`);
  text = text.replace(from, to);
}

replaceOnce(
  `      template_family: detail.template_family || "",
      rule: detail.rule || "",`,
  `      template_family: detail.template_family || "",
      template_family_applicability: detail.template_family_applicability || "",
      template_family_source: detail.template_family_source || "",
      template_subtype: detail.template_subtype || "",
      legacy_template_family: detail.legacy_template_family || "",
      trace_taxonomy_schema: detail.trace_taxonomy_schema || "",
      taxonomy_status: detail.taxonomy_status || "",
      taxonomy_issues: Array.isArray(detail.taxonomy_issues) ? detail.taxonomy_issues : [],
      rule: detail.rule || "",`,
  "construction taxonomy fields",
);

replaceOnce(
  `    if (trace.trace_kind === "generative_template" && !trace.template_family) {
      findings.push(sanityFinding(`,
  `    if (trace.trace_taxonomy_schema && trace.taxonomy_status === "invalid") {
      findings.push(sanityFinding(
        "trace_taxonomy_invalid",
        "error",
        "Runtime trace metadata violates the controlled trace taxonomy.",
        {
          construction: trace.construction,
          surface: trace.surface,
          trace_kind: trace.trace_kind,
          template_family: trace.template_family,
          taxonomy_issues: trace.taxonomy_issues,
        },
      ));
    }

    if (trace.trace_kind === "generative_template" && !trace.template_family) {
      findings.push(sanityFinding(`,
  "taxonomy sanity gate",
);

fs.writeFileSync(filePath, text);
console.log(JSON.stringify({ schema: "canto-span-temp-trace-taxonomy-auditor-patch-v1", changed: true }, null, 2));
