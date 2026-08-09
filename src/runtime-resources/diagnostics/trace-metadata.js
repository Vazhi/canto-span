"use strict";

const TRACE_TAXONOMY_SCHEMA = "canto-span-trace-taxonomy-v1";

const templateTracePassthroughKeys = [
  "retired_label_alias",
  "predicate_subtype",
  "clause_modifier_profile",
  "polarity",
  "existential_subtype",
  "abstract_object_domain",
  "semantic_domain",
  "scalar_domain",
  "np_subtype",
  "role_resolution_note",
  "not_learner_role",
  "not_question_role",
  "wrapper_policy",
  "wrapper_reason",
  "context_requirement_status",
  "missing_argument_slots",
  "antecedent_status",
  "discourse_license_not_observed",
  "fragment_subtype",
  "approximation_scope",
  "approximation_marker_surface",
  "object_semantics",
  "head_recovery_status",
  "not_claims",
  "passive_subtype",
  "reading_candidates",
  "participant_surface",
  "postmarker_participant_surface",
  "retained_patient_candidate_surface",
  "subject_status",
  "subjectless_type",
  "hidden_subject_inserted",
  "environmental_subtype",
  "location_relation",
  "have_relation",
  "locative_frame_subtype",
  "introduced_theme_surface",
  "introduced_participant_surface",
  "presentational_coda_surface",
  "perfective_profile",
  "overt_object_required",
  "aspect_marker_surface",
  "aspect_category",
  "independent_past_tense_licensing",
  "completion_or_result_licensing",
  "experiential_licensing",
  "hidden_object_insertion",
  "selectional_compatibility_bypass",
  "subject_insertion_capability",
  "template_subtype",
];

const parserDecisionTraceKindRegistry = [
  ["generative_template", "Pattern-based slot-template match over generated affordances. A generative_template trace may carry template_family=construction_template while the family is still bounded or not yet fully POS-general."],
  ["construction_template", "Temporary template-family classification for bounded or vocabulary/surface-constrained templates that should eventually be promoted to fully generative POS-targeting templates."],
  ["generative_or_heuristic_slot_rule", "Interim slot heuristic that should be audited for promotion to a constrained template when it recurs."],
  ["governed_discourse_wrapper", "Accepted structural wrapper for clause-linking or discourse/coordination sequences. It organizes already-parsed clause-like children and is intentionally not a phrase-internal generative template."],
  ["predicate_heuristic", "Interim predicate wrapper; acceptable only while a reusable predicate template is not yet available."],
  ["atomic_lexicon", "Atomic vocabulary lookup, not itself a construction template."],
  ["unknown_atomic", "Unknown or fallback token lane; should remain visible in diagnostics."],
  ["punctuation_or_plain_text", "Punctuation/plain text boundary trace."],
  ["protected_formula_table", "Closed-list protected formula table; intentionally not generalized as productive grammar."],
  ["surface_specific_phrase_rule", "Surface-specific parser island that should be replaced by a reusable template when recurrence justifies it."],
  ["legacy_surface_rule", "Older fallback rule retained for compatibility until promoted or retired."],
  ["special_ambiguity_rule", "Explicit ambiguity guard; may remain non-generative when safer than broad promotion."],
  ["phase4_controlled_grammar_promotion", "Controlled promotion lane where feature predicates are parser-active only in approved scopes."],
  ["construction_function", "Hand-coded construction function; audit target for future template extraction when structurally recurrent."],
  ["construction_internal_parser_inactive_clone", "Internal child clone used to expose parent construction structure without changing parser-active feature behavior."],
  ["source_linked_runtime_matcher", "Deterministic source-linked runtime matcher with separately reviewed bounded constraints. This is a registered non-template trace kind; taxonomy registration does not itself assign migration debt or linguistic status."],
];

const templateFamilyRegistry = [
  ["construction_template", "Temporary classification for bounded, constrained, or vocabulary/surface-anchored templates that are not yet fully POS-general."],
  ["generative_template", "Fully pattern-based template intended to apply to new vocabulary that exposes the same generated slots."],
];

const templateTraceKinds = new Set(["generative_template", "construction_template"]);
const registeredTraceKinds = new Set(parserDecisionTraceKindRegistry.map(([kind]) => kind));
const registeredTemplateFamilies = new Set(templateFamilyRegistry.map(([family]) => family));

const legacyTemplateSubtypeFamilyMap = new Map([
  ["first_syllable_preference_a_not_a", {
    template_family: "construction_template",
    template_subtype: "first_syllable_preference_a_not_a",
  }],
  ["copular_a_not_a_bounded_complement", {
    template_family: "construction_template",
    template_subtype: "copular_a_not_a_bounded_complement",
  }],
]);

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
}

function reviewedDefinitionKey(constructionType, template, constraints) {
  return JSON.stringify(canonicalize({
    construction_type: String(constructionType || ""),
    template: Array.isArray(template) ? template : [],
    constraints: constraints && typeof constraints === "object" ? constraints : {},
  }));
}

const reviewedMissingTemplateFamilyDefaults = new Map();
function registerReviewedMissingFamily(constructionType, template, constraints, templateFamily) {
  reviewedMissingTemplateFamilyDefaults.set(
    reviewedDefinitionKey(constructionType, template, constraints),
    templateFamily,
  );
}

registerReviewedMissingFamily("FormulaDiscourseUnit", ["agreement_marker!", "particle!"], {}, "construction_template");
registerReviewedMissingFamily("ClassifierObjectNP", ["classifier!", "head_noun!"], {}, "generative_template");
registerReviewedMissingFamily("CopularIdentificationFrame", ["topic!", "copula!", "np!", "particle?"], {}, "generative_template");
registerReviewedMissingFamily("PossessiveClassifierNP", ["possessor!", "classifier_np!"], {}, "generative_template");
registerReviewedMissingFamily("PreferenceVP", ["subject!", "preference_predicate!", "vp!", "particle?"], {
  slot_surface_in: { preference_predicate: ["鍾意"] },
}, "construction_template");
registerReviewedMissingFamily("ChangeIntoPredicate", ["change_verb!", "result_complement!"], {}, "generative_template");
registerReviewedMissingFamily("CoordinatedNP", ["left_np!", "coordinator!", "right_np!"], {}, "generative_template");
registerReviewedMissingFamily("CopularRelationFrame", ["topic!", "copula!", "copular_complement!", "explanatory_linker!", "explanatory_particle!"], {
  required_copula: "係",
  required_lai_marker: "嚟",
  required_explanatory_particle: "㗎/架",
  complement_kind: "wh_definition_complement",
  formula_guard_reanalysis: "not_needed",
}, "construction_template");
registerReviewedMissingFamily("DegreeMannerModifiedVP", ["degree_manner_adverbial!", "directional_motion_vp!", "particle?"], {
  modifier_surface: "快啲",
  preserve_inner_directional_vp: true,
}, "construction_template");
registerReviewedMissingFamily("IntentionFrame", ["subject!", "intention_predicate!", "vp!", "particle?"], {
  slot_surface_in: { intention_predicate: ["諗住"] },
}, "construction_template");
registerReviewedMissingFamily("NamingClause", ["subject!", "naming_verb!", "name!", "particle?"], {}, "generative_template");
registerReviewedMissingFamily("PathPhrase", ["path_marker!", "location!"], {}, "generative_template");
registerReviewedMissingFamily("PoliteImperativeClause", ["politeness_formula!", "addressee!", "scalar_adjustment!", "particle?"], {}, "construction_template");
registerReviewedMissingFamily("PoliteImperativeClause", ["politeness_marker!", "subject!", "path_phrase!", "predicate!", "particle?"], {}, "construction_template");
registerReviewedMissingFamily("PriorityMarkerClause", ["subject!", "action_vp!", "priority_marker!", "particle!"], {
  surface_sequence: "你打電話先啦",
}, "construction_template");
registerReviewedMissingFamily("SubjectModalPredicateClause", ["subject!", "modal_vp!"], {}, "generative_template");

function taxonomyIssue(code, message, extra = {}) {
  return { code, severity: "error", message, ...extra };
}

function normalizeTraceTaxonomy(trace = {}, options = {}) {
  const normalized = { ...(trace || {}) };
  const constructionType = String(options.constructionType || normalized.construction_type || "");
  const kind = String(normalized.kind || "");
  const issues = [];
  const isTemplateTrace = templateTraceKinds.has(kind);
  let templateFamily = String(normalized.template_family || "");
  let templateSubtype = String(normalized.template_subtype || "");
  let templateFamilySource = templateFamily ? "explicit_controlled" : "not_set";

  if (!registeredTraceKinds.has(kind)) {
    issues.push(taxonomyIssue(
      "unregistered_trace_kind",
      `Trace kind ${kind || "(missing)"} is not registered in parserDecisionTraceKindRegistry.`,
      { trace_kind: kind },
    ));
  }

  if (templateFamily && legacyTemplateSubtypeFamilyMap.has(templateFamily)) {
    const legacyFamily = templateFamily;
    const mapping = legacyTemplateSubtypeFamilyMap.get(templateFamily);
    templateFamily = mapping.template_family;
    templateSubtype = templateSubtype || mapping.template_subtype;
    normalized.legacy_template_family = legacyFamily;
    templateFamilySource = "legacy_subtype_normalized";
  }

  if (isTemplateTrace) {
    normalized.template_family_applicability = "required";
    if (!templateFamily && kind === "construction_template") {
      templateFamily = "construction_template";
      templateFamilySource = "trace_kind_default";
    }
    if (!templateFamily && kind === "generative_template") {
      const reviewedFamily = reviewedMissingTemplateFamilyDefaults.get(reviewedDefinitionKey(
        constructionType,
        normalized.template,
        normalized.constraints,
      ));
      if (reviewedFamily) {
        templateFamily = reviewedFamily;
        templateFamilySource = "reviewed_definition_default";
      }
    }
    if (!templateFamily) {
      issues.push(taxonomyIssue(
        "template_family_missing",
        `Template trace ${kind || "(missing)"} requires a controlled template_family.`,
        { construction_type: constructionType },
      ));
    } else if (!registeredTemplateFamilies.has(templateFamily)) {
      issues.push(taxonomyIssue(
        "unregistered_template_family",
        `Template family ${templateFamily} is not registered in templateFamilyRegistry.`,
        { template_family: templateFamily, construction_type: constructionType },
      ));
    }
  } else {
    normalized.template_family_applicability = "not_applicable";
    if (templateFamily && !registeredTemplateFamilies.has(templateFamily)) {
      issues.push(taxonomyIssue(
        "unregistered_template_family",
        `Non-template trace carries unregistered template family ${templateFamily}.`,
        { template_family: templateFamily, construction_type: constructionType },
      ));
    }
    if (!templateFamily) templateFamilySource = "not_applicable";
  }

  normalized.trace_taxonomy_schema = TRACE_TAXONOMY_SCHEMA;
  normalized.template_family = templateFamily;
  normalized.template_subtype = templateSubtype;
  normalized.template_family_source = templateFamilySource;
  normalized.taxonomy_status = issues.length ? "invalid" : "valid";
  normalized.taxonomy_issues = issues;
  return normalized;
}

function annotateTraceTaxonomy(nodes = []) {
  const summary = {
    schema: TRACE_TAXONOMY_SCHEMA,
    construction_trace_count: 0,
    valid_count: 0,
    invalid_count: 0,
    issue_counts: {},
    issue_samples: [],
  };

  function visit(node) {
    if (!node || typeof node !== "object") return;
    if (node.kind === "construction") {
      node.trace = normalizeTraceTaxonomy(node.trace || {}, { constructionType: node.type || node.compatibility_alias || "" });
      summary.construction_trace_count += 1;
      if (node.trace.taxonomy_status === "valid") {
        summary.valid_count += 1;
      } else {
        summary.invalid_count += 1;
        for (const issue of node.trace.taxonomy_issues || []) {
          summary.issue_counts[issue.code] = (summary.issue_counts[issue.code] || 0) + 1;
          if (summary.issue_samples.length < 20) {
            summary.issue_samples.push({
              construction: node.compatibility_alias || node.type || "",
              internal_construction: node.type || "",
              ...issue,
            });
          }
        }
      }
    }
    for (const child of node.children || []) visit(child);
  }

  for (const node of nodes || []) visit(node);
  return summary;
}

const parserDecisionLabelPolicy = {
  purpose: "standardize_labels_used_by_active_parser_decisions",
  template_family_boundary: "preserve_construction_template_vs_generative_template_until_all_grammar_is_generative",
  construction_template: "bounded_or_vocabulary_anchored_template_not_yet_fully_pos_general",
  generative_template: "slot_or_pos_pattern_template_reusable_for_new_vocabulary",
  eventual_target: "all productive grammar should become generative_template once the parser can target POS/slots rather than individual vocabulary",
};

const labelTransitionKindPolicy = {
  generative_template: {
    bucket: "generative_template",
    status: "already_generative",
    priority: 99,
    action: "Keep: already matched by the slot-template engine.",
  },
  generative_or_heuristic_slot_rule: {
    bucket: "slot_heuristic",
    status: "migration_candidate",
    priority: 50,
    action: "Promote when the structural heuristic can be expressed as a named reusable slot template.",
  },
  governed_discourse_wrapper: {
    bucket: "governed_structural_wrapper",
    status: "accepted_structural_wrapper",
    priority: 88,
    action: "Keep: governed discourse/coordination wrapper over independently parsed clause-like children; not a phrase-internal generative template.",
  },
  predicate_heuristic: {
    bucket: "predicate_heuristic",
    status: "migration_candidate",
    priority: 45,
    action: "Promote stable predicate-shape wrappers into generated predicate templates, or retire fallbacks once covered.",
  },
  surface_specific_phrase_rule: {
    bucket: "surface_specific_rule",
    status: "migration_candidate",
    priority: 20,
    action: "Replace surface-specific phrase code with a reusable category/span template over generated slots.",
  },
  legacy_surface_rule: {
    bucket: "legacy_surface_rule",
    status: "migration_candidate",
    priority: 10,
    action: "Replace fallback surface matching with a governed generative template or a narrower slot rule.",
  },
  special_ambiguity_rule: {
    bucket: "special_ambiguity_rule",
    status: "review_guardrail",
    priority: 70,
    action: "Keep as explicit ambiguity guard unless a safer learner-error framework replaces it.",
  },
  protected_formula_table: {
    bucket: "protected_formula_table",
    status: "intentionally_opaque",
    priority: 80,
    action: "Keep opaque unless learner-visible internal roles are explicitly approved for this formula.",
  },
  phase4_controlled_grammar_promotion: {
    bucket: "controlled_promotion_trace",
    status: "transition_trace",
    priority: 35,
    action: "Review whether this promotion can be recoded as generative_template now that its slots are stable.",
  },
  construction_function: {
    bucket: "construction_function",
    status: "migration_candidate",
    priority: 30,
    action: "Move construction-function fallback into a governed template or classify it as intentionally non-template.",
  },
};

module.exports = {
  TRACE_TAXONOMY_SCHEMA,
  templateTracePassthroughKeys,
  parserDecisionTraceKindRegistry,
  templateFamilyRegistry,
  templateTraceKinds,
  legacyTemplateSubtypeFamilyMap,
  reviewedMissingTemplateFamilyDefaults,
  normalizeTraceTaxonomy,
  annotateTraceTaxonomy,
  parserDecisionLabelPolicy,
  labelTransitionKindPolicy,
};
