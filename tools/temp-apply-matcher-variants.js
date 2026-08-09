#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const changed = [];

function replaceOnce(file, from, to) {
  const absolute = path.join(root, file);
  const source = fs.readFileSync(absolute, "utf8");
  if (source.includes(to)) return false;
  const count = source.split(from).length - 1;
  if (count !== 1) throw new Error(`${file}: expected one anchor, found ${count}`);
  fs.writeFileSync(absolute, source.replace(from, to));
  return true;
}
function apply(file, from, to) {
  if (replaceOnce(file, from, to)) changed.push(file);
}

const metadataInsert = `function reviewedDefinitionKey(constructionType, template, constraints) {
  return JSON.stringify(canonicalize({
    construction_type: String(constructionType || ""),
    template: Array.isArray(template) ? template : [],
    constraints: constraints && typeof constraints === "object" ? constraints : {},
  }));
}
`;

const variantRegistry = `function reviewedDefinitionKey(constructionType, template, constraints) {
  return JSON.stringify(canonicalize({
    construction_type: String(constructionType || ""),
    template: Array.isArray(template) ? template : [],
    constraints: constraints && typeof constraints === "object" ? constraints : {},
  }));
}

const MATCHER_VARIANT_SCHEMA = "canto-span-matcher-variant-v1";
const matcherVariantFamilyRegistry = new Set();
const matcherVariantDefinitionRegistry = new Map();
const matcherVariantIdToDefinitionKey = new Map();

function matcherVariantFamilyKey(spec = {}) {
  return JSON.stringify(canonicalize({
    trace_kind: String(spec.trace_kind || ""),
    construction_type: String(spec.construction_type || ""),
    template_family: String(spec.template_family || ""),
    template: Array.isArray(spec.template) ? spec.template : [],
    rule: String(spec.rule || ""),
  }));
}

function matcherVariantDefinitionKey(spec = {}) {
  return JSON.stringify(canonicalize({
    trace_kind: String(spec.trace_kind || ""),
    construction_type: String(spec.construction_type || ""),
    template_family: String(spec.template_family || ""),
    template: Array.isArray(spec.template) ? spec.template : [],
    constraints: spec.constraints && typeof spec.constraints === "object" ? spec.constraints : {},
    rule: String(spec.rule || ""),
  }));
}

function registerReviewedMatcherVariant(id, spec) {
  const variantId = String(id || "");
  if (!variantId) throw new Error("Matcher variant ID must be non-empty.");
  const familyKey = matcherVariantFamilyKey(spec);
  const definitionKey = matcherVariantDefinitionKey(spec);
  if (matcherVariantDefinitionRegistry.has(definitionKey) && matcherVariantDefinitionRegistry.get(definitionKey) !== variantId) {
    throw new Error(\`Matcher definition is already registered as \${matcherVariantDefinitionRegistry.get(definitionKey)}.\`);
  }
  if (matcherVariantIdToDefinitionKey.has(variantId) && matcherVariantIdToDefinitionKey.get(variantId) !== definitionKey) {
    throw new Error(\`Matcher variant \${variantId} maps to more than one controlled definition.\`);
  }
  matcherVariantFamilyRegistry.add(familyKey);
  matcherVariantDefinitionRegistry.set(definitionKey, variantId);
  matcherVariantIdToDefinitionKey.set(variantId, definitionKey);
}

function matcherVariantSpec(constructionType, trace, templateFamily) {
  return {
    trace_kind: String(trace.kind || ""),
    construction_type: String(constructionType || trace.construction_type || ""),
    template_family: String(templateFamily || trace.template_family || ""),
    template: Array.isArray(trace.template) ? trace.template : [],
    constraints: trace.constraints && typeof trace.constraints === "object" ? trace.constraints : {},
    rule: String(trace.rule || ""),
  };
}

function resolveMatcherVariant(constructionType, trace, templateFamily) {
  const spec = matcherVariantSpec(constructionType, trace, templateFamily);
  if (!matcherVariantFamilyRegistry.has(matcherVariantFamilyKey(spec))) {
    return {
      matcher_variant_applicability: "not_required",
      matcher_variant_id: "",
      matcher_variant_source: "not_required",
    };
  }
  const id = matcherVariantDefinitionRegistry.get(matcherVariantDefinitionKey(spec)) || "";
  return {
    matcher_variant_applicability: "required",
    matcher_variant_id: id,
    matcher_variant_source: id ? "reviewed_definition_registry" : "unregistered_definition",
  };
}

const opinionTemplate = ["subject?", "focus_adverb?", "stance_predicate!", "focus_adverb?", "reported_content!", "particle?"];
function opinionConstraints(surface) {
  return {
    visible_reviewed_content: true,
    stance_predicate_surfaces: [surface],
    focus_modifier_slot: "focus_adverb",
  };
}
registerReviewedMatcherVariant("OpinionStanceFrame.stance_geidak", {
  trace_kind: "generative_template", construction_type: "OpinionStanceFrame", template_family: "generative_template",
  template: opinionTemplate, constraints: opinionConstraints("覺得"), rule: "",
});
registerReviewedMatcherVariant("OpinionStanceFrame.stance_jiwai", {
  trace_kind: "generative_template", construction_type: "OpinionStanceFrame", template_family: "generative_template",
  template: opinionTemplate, constraints: opinionConstraints("以為"), rule: "",
});
registerReviewedMatcherVariant("OpinionStanceFrame.stance_soengseon", {
  trace_kind: "generative_template", construction_type: "OpinionStanceFrame", template_family: "generative_template",
  template: opinionTemplate, constraints: opinionConstraints("相信"), rule: "",
});

const subjectPredicateTemplate = ["subject!", "predicate!", "particle?"];
registerReviewedMatcherVariant("SubjectPredicateClause.predicate_allowlist_nonnegative", {
  trace_kind: "generative_template", construction_type: "SubjectPredicateClause", template_family: "generative_template",
  template: subjectPredicateTemplate,
  constraints: {
    predicate_must_have_any_slots: [
      "transitive_vp", "productive_vo", "progressive_vp", "perfective_vp", "completion_vp",
      "locative_posture_vp", "directional_motion_vp", "motion_goal_vp", "motion_purpose_chain", "serial_verb_purpose_chain",
    ],
    disallow_child_slots: ["negated_directional_motion_vp", "negated_vp"],
  },
  rule: "",
});
registerReviewedMatcherVariant("SubjectPredicateClause.predicate_unconstrained", {
  trace_kind: "generative_template", construction_type: "SubjectPredicateClause", template_family: "generative_template",
  template: subjectPredicateTemplate, constraints: {}, rule: "",
});
registerReviewedMatcherVariant("SubjectPredicateClause.predicate_allowlist_negative", {
  trace_kind: "generative_template", construction_type: "SubjectPredicateClause", template_family: "generative_template",
  template: subjectPredicateTemplate,
  constraints: { predicate_must_have_any_slots: ["negated_directional_motion_vp", "negated_vp"] },
  rule: "",
});

const demonstrativeTemplate = ["demonstrative!", "classifier!", "head_noun!"];
const demonstrativeGuard = {
  slot_must_not_have_slots: {
    demonstrative: ["quantity", "wh_determiner", "di_determiner"],
    classifier: ["quantity", "wh_determiner", "di_determiner"],
    head_noun: ["quantity", "classifier", "wh_determiner", "di_determiner"],
  },
};
registerReviewedMatcherVariant("DemonstrativeClassifierNP.slot_exclusion_guarded", {
  trace_kind: "generative_template", construction_type: "DemonstrativeClassifierNP", template_family: "generative_template",
  template: demonstrativeTemplate, constraints: demonstrativeGuard, rule: "",
});
registerReviewedMatcherVariant("DemonstrativeClassifierNP.slot_exclusion_unconstrained", {
  trace_kind: "generative_template", construction_type: "DemonstrativeClassifierNP", template_family: "generative_template",
  template: demonstrativeTemplate, constraints: {}, rule: "",
});

const headTemplate = ["head_noun!"];
const headGuard = {
  disallow_child_slots: [
    "demonstrative", "classifier", "quantity", "modifier", "nominal_linker", "vp", "action_vp", "predicate",
    "perfective_vp", "progressive_vp", "completion_vp", "result_complement_vp", "potential_result_vp",
    "negative_potential_complement", "transitive_vp", "productive_vo",
  ],
};
registerReviewedMatcherVariant("HeadNP.child_slot_exclusion_guarded", {
  trace_kind: "generative_template", construction_type: "HeadNP", template_family: "generative_template",
  template: headTemplate, constraints: headGuard, rule: "",
});
registerReviewedMatcherVariant("HeadNP.child_slot_exclusion_unconstrained", {
  trace_kind: "generative_template", construction_type: "HeadNP", template_family: "generative_template",
  template: headTemplate, constraints: {}, rule: "",
});

const transitiveTemplate = ["action_verb!", "object!"];
const transitiveGuard = {
  slot_must_not_be_bare_quantity_token: ["object"],
  slot_must_not_have_slots: { object: ["approximate_quantity"] },
};
registerReviewedMatcherVariant("TransitiveVP.object_shape_guarded", {
  trace_kind: "generative_template", construction_type: "TransitiveVP", template_family: "generative_template",
  template: transitiveTemplate, constraints: transitiveGuard, rule: "",
});
registerReviewedMatcherVariant("TransitiveVP.object_shape_unconstrained", {
  trace_kind: "generative_template", construction_type: "TransitiveVP", template_family: "generative_template",
  template: transitiveTemplate, constraints: {}, rule: "",
});
`;

apply("src/runtime-resources/diagnostics/trace-metadata.js", metadataInsert, variantRegistry);

apply(
  "src/runtime-resources/diagnostics/trace-metadata.js",
  `  normalized.structural_scope = structuralScope.structural_scope;
  normalized.structural_scope_source = structuralScope.structural_scope_source;
  normalized.taxonomy_status = issues.length ? "invalid" : "valid";
`,
  `  normalized.structural_scope = structuralScope.structural_scope;
  normalized.structural_scope_source = structuralScope.structural_scope_source;

  const matcherVariant = resolveMatcherVariant(constructionType, normalized, templateFamily);
  normalized.matcher_variant_schema = MATCHER_VARIANT_SCHEMA;
  normalized.matcher_variant_applicability = matcherVariant.matcher_variant_applicability;
  normalized.matcher_variant_id = matcherVariant.matcher_variant_id;
  normalized.matcher_variant_source = matcherVariant.matcher_variant_source;
  if (matcherVariant.matcher_variant_applicability === "required" && !matcherVariant.matcher_variant_id) {
    issues.push(taxonomyIssue(
      "matcher_variant_unregistered",
      "A reviewed matcher-variant family contains a controlled definition with no authored variant ID.",
      { construction_type: constructionType },
    ));
  }
  normalized.taxonomy_status = issues.length ? "invalid" : "valid";
`,
);

apply(
  "src/runtime-resources/diagnostics/trace-metadata.js",
  `  reviewedMissingTemplateFamilyDefaults,
  normalizeTraceTaxonomy,
`,
  `  reviewedMissingTemplateFamilyDefaults,
  MATCHER_VARIANT_SCHEMA,
  matcherVariantFamilyRegistry,
  matcherVariantDefinitionRegistry,
  matcherVariantIdToDefinitionKey,
  matcherVariantFamilyKey,
  matcherVariantDefinitionKey,
  registerReviewedMatcherVariant,
  resolveMatcherVariant,
  normalizeTraceTaxonomy,
`,
);

apply(
  "tools/parser-coverage-report.js",
  `      structural_scope: detail.structural_scope || "",
      structural_scope_source: detail.structural_scope_source || "",
      rule: detail.rule || "",
`,
  `      structural_scope: detail.structural_scope || "",
      structural_scope_source: detail.structural_scope_source || "",
      matcher_variant_schema: detail.matcher_variant_schema || "",
      matcher_variant_applicability: detail.matcher_variant_applicability || "",
      matcher_variant_id: detail.matcher_variant_id || "",
      matcher_variant_source: detail.matcher_variant_source || "",
      rule: detail.rule || "",
`,
);

apply(
  "tools/parser-coverage-report.js",
  `    if (trace.trace_kind === "generative_template" && !trace.template_family) {
`,
  `    if (trace.matcher_variant_applicability === "required" && !trace.matcher_variant_id) {
      findings.push(sanityFinding(
        "matcher_variant_required_missing",
        "error",
        "A reviewed matcher-variant family has no stable authored variant ID for this controlled definition.",
        { construction: trace.construction, surface: trace.surface },
      ));
    }

    if (trace.trace_kind === "generative_template" && !trace.template_family) {
`,
);

apply(
  "tools/parser-coverage-enhanced.js",
  `  const matcherCounts = {};
  const spanResolutionCounts = {};
  let unresolvedSlotSpanCount = 0;
`,
  `  const matcherCounts = {};
  const matcherVariantCounts = {};
  const matcherVariantFingerprints = new Map();
  const fingerprintVariants = new Map();
  const spanResolutionCounts = {};
  let unresolvedSlotSpanCount = 0;
  let requiredMatcherVariantMissingCount = 0;
`,
);

apply(
  "tools/parser-coverage-enhanced.js",
  `      if (trace.matcher_id) matcherCounts[trace.matcher_id] = (matcherCounts[trace.matcher_id] || 0) + 1;
      for (const binding of trace.slot_bindings || []) {
`,
  `      if (trace.matcher_id) matcherCounts[trace.matcher_id] = (matcherCounts[trace.matcher_id] || 0) + 1;
      if (trace.matcher_variant_applicability === "required" && !trace.matcher_variant_id) requiredMatcherVariantMissingCount += 1;
      if (trace.matcher_variant_id) {
        matcherVariantCounts[trace.matcher_variant_id] = (matcherVariantCounts[trace.matcher_variant_id] || 0) + 1;
        if (!matcherVariantFingerprints.has(trace.matcher_variant_id)) matcherVariantFingerprints.set(trace.matcher_variant_id, new Set());
        matcherVariantFingerprints.get(trace.matcher_variant_id).add(trace.matcher_fingerprint || "");
        if (!fingerprintVariants.has(trace.matcher_fingerprint || "")) fingerprintVariants.set(trace.matcher_fingerprint || "", new Set());
        fingerprintVariants.get(trace.matcher_fingerprint || "").add(trace.matcher_variant_id);
      }
      for (const binding of trace.slot_bindings || []) {
`,
);

apply(
  "tools/parser-coverage-enhanced.js",
  `  return {
    ...report,
    schema: ENHANCED_SCHEMA,
    matcher_counts: matcherCounts,
    slot_span_resolution_counts: spanResolutionCounts,
    unresolved_slot_span_count: unresolvedSlotSpanCount,
  };
`,
  `  const matcherVariantFingerprintConflicts = [...matcherVariantFingerprints.entries()]
    .filter(([, fingerprints]) => fingerprints.size > 1)
    .map(([matcher_variant_id, fingerprints]) => ({ matcher_variant_id, fingerprints: [...fingerprints].sort() }));
  const matcherFingerprintVariantConflicts = [...fingerprintVariants.entries()]
    .filter(([, variants]) => variants.size > 1)
    .map(([matcher_fingerprint, variants]) => ({ matcher_fingerprint, matcher_variant_ids: [...variants].sort() }));

  return {
    ...report,
    schema: ENHANCED_SCHEMA,
    matcher_counts: matcherCounts,
    matcher_variant_counts: matcherVariantCounts,
    matcher_variant_fingerprint_conflicts: matcherVariantFingerprintConflicts,
    matcher_fingerprint_variant_conflicts: matcherFingerprintVariantConflicts,
    required_matcher_variant_missing_count: requiredMatcherVariantMissingCount,
    matcher_variant_consistency_status: (
      !requiredMatcherVariantMissingCount && !matcherVariantFingerprintConflicts.length && !matcherFingerprintVariantConflicts.length
    ) ? "PASS" : "FAIL",
    slot_span_resolution_counts: spanResolutionCounts,
    unresolved_slot_span_count: unresolvedSlotSpanCount,
  };
`,
);

apply(
  "tools/parser-coverage-enhanced.js",
  `    parts.push(\`${indent}${trace.construction} [${trace.surface}] source=${formatSpan(trace.source_span)} matcher=${trace.matcher_id || "unavailable"}\`);
`,
  `    parts.push(\`${indent}${trace.construction} [${trace.surface}] source=${formatSpan(trace.source_span)} matcher=${trace.matcher_id || "unavailable"} variant=${trace.matcher_variant_id || "n/a"}\`);
`,
);

apply(
  "tools/parser-coverage-enhanced.js",
  `    "Matcher identities:",
    ...Object.entries(report.matcher_counts || {}).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 20).map(([id, count]) => \`  ${id}: ${count}\`),
    "",
    "Slot span resolution:",
`,
  `    "Matcher identities:",
    ...Object.entries(report.matcher_counts || {}).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 20).map(([id, count]) => \`  ${id}: ${count}\`),
    "",
    "Authored matcher variants:",
    ...Object.entries(report.matcher_variant_counts || {}).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([id, count]) => \`  ${id}: ${count}\`),
    \`  consistency: ${report.matcher_variant_consistency_status || "UNKNOWN"}\`,
    \`  required missing: ${report.required_matcher_variant_missing_count || 0}\`,
    "",
    "Slot span resolution:",
`,
);

const extraTests = `

test("reviewed same-visible-rule definitions expose stable authored matcher variants", () => {
  const records = recordsForSentences([
    "我都覺得好貴。",
    "我以為佢走咗。",
    "我相信如果佢去，我就去。",
    "因為落雨，所以我冇去。",
  ]);
  const stanceIds = records.slice(0, 3).map((record) => {
    const trace = record.construction_traces.find((item) => item.construction === "OpinionStanceFrame");
    assert(trace);
    assert.equal(trace.matcher_variant_applicability, "required");
    return trace.matcher_variant_id;
  });
  assert.deepEqual(new Set(stanceIds), new Set([
    "OpinionStanceFrame.stance_geidak",
    "OpinionStanceFrame.stance_jiwai",
    "OpinionStanceFrame.stance_soengseon",
  ]));
  const negative = records[3].construction_traces.find((item) => (
    item.construction === "SubjectPredicateClause" && item.matcher_variant_id === "SubjectPredicateClause.predicate_allowlist_negative"
  ));
  assert(negative);
});

test("reviewed matcher-variant families fail closed on a new unregistered constraint definition", () => {
  const normalized = normalizeTraceTaxonomy({
    kind: "generative_template",
    template_family: "generative_template",
    template: ["action_verb!", "object!"],
    constraints: { future_unreviewed_guard: true },
  }, { constructionType: "TransitiveVP" });
  assert.equal(normalized.matcher_variant_applicability, "required");
  assert.equal(normalized.matcher_variant_id, "");
  assert.equal(normalized.taxonomy_status, "invalid");
  assert(normalized.taxonomy_issues.some((issue) => issue.code === "matcher_variant_unregistered"));
});

test("matcher variant aggregation detects authored-ID to fingerprint conflicts", () => {
  const records = recordsForSentences(["我都覺得好貴。", "我以為佢走咗."]);
  const first = records[0].construction_traces.find((item) => item.matcher_variant_id);
  const second = records[1].construction_traces.find((item) => item.matcher_variant_id);
  assert(first && second);
  second.matcher_variant_id = first.matcher_variant_id;
  const report = aggregateCoverage(records);
  assert.equal(report.matcher_variant_consistency_status, "FAIL");
  assert(report.matcher_variant_fingerprint_conflicts.some((item) => item.matcher_variant_id === first.matcher_variant_id));
});
`;

const testFile = path.join(root, "tests", "tooling", "parser-coverage", "enhanced.test.js");
let testSource = fs.readFileSync(testFile, "utf8");
if (!testSource.includes('test("reviewed same-visible-rule definitions expose stable authored matcher variants"')) {
  testSource += extraTests;
  fs.writeFileSync(testFile, testSource);
  changed.push("tests/tooling/parser-coverage/enhanced.test.js");
}

console.log(JSON.stringify({
  schema: "canto-span-temp-matcher-variant-migration-v1",
  changed_files: [...new Set(changed)],
  reviewed_variant_family_count: 5,
  reviewed_variant_definition_count: 12,
}, null, 2));
