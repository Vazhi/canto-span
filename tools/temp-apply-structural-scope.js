#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function replaceOnce(relativePath, from, to, label) {
  const filePath = path.join(root, relativePath);
  const original = fs.readFileSync(filePath, "utf8");
  if (!original.includes(from)) throw new Error(`${relativePath}: missing ${label}`);
  const updated = original.replace(from, to);
  fs.writeFileSync(filePath, updated);
}

replaceOnce(
  "src/runtime-resources/diagnostics/trace-metadata.js",
  `const templateTraceKinds = new Set(["generative_template", "construction_template"]);
const registeredTraceKinds = new Set(parserDecisionTraceKindRegistry.map(([kind]) => kind));
const registeredTemplateFamilies = new Set(templateFamilyRegistry.map(([family]) => family));`,
  `const templateTraceKinds = new Set(["generative_template", "construction_template"]);
const registeredTraceKinds = new Set(parserDecisionTraceKindRegistry.map(([kind]) => kind));
const registeredTemplateFamilies = new Set(templateFamilyRegistry.map(([family]) => family));

const structuralScopeRegistry = [
  ["clause", "Clause-sized construction or wrapper capable of binding a clause-level subject/topic."],
  ["vp", "Verb-phrase-sized construction that must not itself bind a clause-level subject/topic."],
  ["np", "Noun-phrase-sized construction."],
  ["phrase", "Other phrase-sized construction."],
  ["discourse", "Discourse or interclausal structural wrapper."],
  ["diagnostic", "Diagnostic/ambiguity/error-analysis construction rather than a direct constituent scope claim."],
  ["unspecified", "Structural scope not yet authored or derivable from controlled runtime metadata."],
];
const registeredStructuralScopes = new Set(structuralScopeRegistry.map(([scope]) => scope));
const clauseLevelStructuralSlots = new Set(["subject", "overt_subject", "topic"]);

function templateSlotName(item) {
  return String(item || "").replace(/[!?+*]+$/g, "");
}

function traceDeclaresClauseLevelSlot(trace = {}) {
  const assigned = Array.isArray(trace.assigned_slots) ? trace.assigned_slots : [];
  const authored = Array.isArray(trace.template) ? trace.template.map(templateSlotName) : [];
  return [...assigned, ...authored].some((slot) => clauseLevelStructuralSlots.has(slot));
}

function deriveStructuralScope(trace = {}) {
  const explicit = String(trace.structural_scope || "");
  if (explicit) return { structural_scope: explicit, structural_scope_source: "explicit" };
  if (traceDeclaresClauseLevelSlot(trace)) {
    return { structural_scope: "clause", structural_scope_source: "clause_level_slot" };
  }
  if (trace.kind === "governed_discourse_wrapper") {
    return { structural_scope: "discourse", structural_scope_source: "trace_kind" };
  }
  if (trace.kind === "special_ambiguity_rule") {
    return { structural_scope: "diagnostic", structural_scope_source: "trace_kind" };
  }
  return { structural_scope: "unspecified", structural_scope_source: "not_authored" };
}`,
  "structural scope registry insertion",
);

replaceOnce(
  "src/runtime-resources/diagnostics/trace-metadata.js",
  `  normalized.trace_taxonomy_schema = TRACE_TAXONOMY_SCHEMA;
  normalized.template_family = templateFamily;
  normalized.template_subtype = templateSubtype;
  normalized.template_family_source = templateFamilySource;
  normalized.taxonomy_status = issues.length ? "invalid" : "valid";`,
  `  const structuralScope = deriveStructuralScope(normalized);
  if (!registeredStructuralScopes.has(structuralScope.structural_scope)) {
    issues.push(taxonomyIssue(
      "unregistered_structural_scope",
      \`Structural scope \${structuralScope.structural_scope || "(missing)"} is not registered.\`,
      { structural_scope: structuralScope.structural_scope, construction_type: constructionType },
    ));
  }
  if (structuralScope.structural_scope === "vp" && traceDeclaresClauseLevelSlot(normalized)) {
    issues.push(taxonomyIssue(
      "vp_scope_binds_clause_level_slot",
      "A trace structurally categorized as VP declares or realizes a clause-level subject/topic slot.",
      { construction_type: constructionType },
    ));
  }

  normalized.trace_taxonomy_schema = TRACE_TAXONOMY_SCHEMA;
  normalized.template_family = templateFamily;
  normalized.template_subtype = templateSubtype;
  normalized.template_family_source = templateFamilySource;
  normalized.structural_scope = structuralScope.structural_scope;
  normalized.structural_scope_source = structuralScope.structural_scope_source;
  normalized.taxonomy_status = issues.length ? "invalid" : "valid";`,
  "scope normalization insertion",
);

replaceOnce(
  "src/runtime-resources/diagnostics/trace-metadata.js",
  `  templateFamilyRegistry,
  templateTraceKinds,
  legacyTemplateSubtypeFamilyMap,`,
  `  templateFamilyRegistry,
  templateTraceKinds,
  structuralScopeRegistry,
  clauseLevelStructuralSlots,
  traceDeclaresClauseLevelSlot,
  deriveStructuralScope,
  legacyTemplateSubtypeFamilyMap,`,
  "structural scope exports",
);

replaceOnce(
  "tools/parser-coverage-report.js",
  `      taxonomy_status: detail.taxonomy_status || "",
      taxonomy_issues: Array.isArray(detail.taxonomy_issues) ? detail.taxonomy_issues : [],
      rule: detail.rule || "",`,
  `      taxonomy_status: detail.taxonomy_status || "",
      taxonomy_issues: Array.isArray(detail.taxonomy_issues) ? detail.taxonomy_issues : [],
      structural_scope: detail.structural_scope || "",
      structural_scope_source: detail.structural_scope_source || "",
      rule: detail.rule || "",`,
  "coverage structural scope fields",
);

replaceOnce(
  "tools/parser-coverage-report.js",
  `    if (
      trace.depth === 0 &&
      /VP$/.test(trace.construction) &&
      trace.assigned_slots.some((slot) => slot === "subject" || slot === "overt_subject")
    ) {
      findings.push(sanityFinding(
        "root_vp_binds_subject",
        "warning",
        "A root construction named as a VP explicitly binds a subject slot; inspect whether the runtime label or span boundary is clause-sized.",
        {
          construction: trace.construction,
          surface: trace.surface,
          subject_bindings: trace.slot_bindings.filter((binding) => (
            binding.slot === "subject" || binding.slot === "overt_subject"
          )),
        },
      ));
    }`,
  `    if (
      trace.structural_scope === "vp" &&
      trace.assigned_slots.some((slot) => slot === "subject" || slot === "overt_subject" || slot === "topic")
    ) {
      findings.push(sanityFinding(
        "vp_scope_binds_clause_level_slot",
        "error",
        "A construction explicitly categorized as VP binds a clause-level subject/topic slot.",
        {
          construction: trace.construction,
          surface: trace.surface,
          structural_scope: trace.structural_scope,
          clause_level_bindings: trace.slot_bindings.filter((binding) => (
            binding.slot === "subject" || binding.slot === "overt_subject" || binding.slot === "topic"
          )),
        },
      ));
    }`,
  "replace suffix-based VP sanity check",
);

const enhancedPath = path.join(root, "tests", "tooling", "parser-coverage", "enhanced.test.js");
let enhanced = fs.readFileSync(enhancedPath, "utf8");
const append = `

test("subject-binding public VP identities expose clause structural scope without renaming", () => {
  const cases = [
    ["我要飲水。", "ModalVP"],
    ["我想睇電視。", "DesiderativeVP"],
    ["佢慢慢噉食飯。", "MannerAdverbialVP"],
    ["我鍾意食飯。", "PreferenceVP"],
  ];
  for (const [source, construction] of cases) {
    const [record] = recordsForSentences([source]);
    const trace = record.construction_traces.find((item) => item.construction === construction);
    assert(trace, \`missing \${construction} for \${source}\`);
    assert.equal(trace.structural_scope, "clause");
    assert.equal(trace.structural_scope_source, "clause_level_slot");
    assert(!record.sanity_findings.some((finding) => finding.code === "vp_scope_binds_clause_level_slot"));
  }
});

test("explicit VP scope with clause-level slot fails closed", () => {
  const normalized = normalizeTraceTaxonomy({
    kind: "generative_template",
    template_family: "generative_template",
    structural_scope: "vp",
    template: ["subject?", "modal!", "vp!"],
    constraints: {},
    assigned_slots: ["subject", "modal", "vp"],
  }, { constructionType: "SyntheticVP" });
  assert.equal(normalized.taxonomy_status, "invalid");
  assert(normalized.taxonomy_issues.some((issue) => issue.code === "vp_scope_binds_clause_level_slot"));
});
`;
if (!enhanced.includes('subject-binding public VP identities expose clause structural scope without renaming')) {
  enhanced += append;
  fs.writeFileSync(enhancedPath, enhanced);
}

console.log(JSON.stringify({ schema: "canto-span-temp-structural-scope-migration-v1", changed: true }, null, 2));
