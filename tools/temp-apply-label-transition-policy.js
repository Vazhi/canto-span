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
  if (count !== 1) throw new Error(`${file}: expected one replacement anchor, found ${count}`);
  fs.writeFileSync(absolute, source.replace(from, to));
  return true;
}
function apply(file, from, to) {
  if (replaceOnce(file, from, to)) changed.push(file);
}

const oldMetadata = `const parserDecisionLabelPolicy = {
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
};`;

const newMetadata = `const parserDecisionLabelPolicy = {
  purpose: "classify_active_parser_implementations_without_assuming_one_universal_runtime_form",
  template_family_boundary: "use declarative templates where they cleanly express the reviewed definition; preserve governed specialized implementations where context, composition, ambiguity, or nonlocal constraints require them",
  construction_template: "reviewed_bounded_or_constrained_template_valid_as_first_class_runtime_architecture",
  generative_template: "reusable_slot_or_pos_pattern_template_for_compatible_reviewed_definitions",
  specialized_implementation: "governed_non_template_or_hand_written_logic_may_remain_first_class_when_it_encodes_required_structural_constraints",
  migration_debt: "only_trace_kinds_explicitly_classified_as_legacy_surface_specific_or_heuristic_are_actionable_migration_debt",
};

const labelTransitionKindPolicy = {
  generative_template: {
    bucket: "reusable_template",
    status: "accepted_reusable_template",
    priority: 99,
    debt: false,
    action: "Keep: reusable slot-template implementation.",
  },
  construction_template: {
    bucket: "bounded_template",
    status: "accepted_bounded_template",
    priority: 95,
    debt: false,
    action: "Keep: reviewed bounded or constrained template; boundedness alone is not migration debt.",
  },
  generative_or_heuristic_slot_rule: {
    bucket: "slot_heuristic",
    status: "migration_candidate",
    priority: 50,
    debt: true,
    action: "Review for migration when the structural heuristic can be expressed as a named reusable typed template.",
  },
  governed_discourse_wrapper: {
    bucket: "governed_structural_wrapper",
    status: "accepted_specialized_implementation",
    priority: 88,
    debt: false,
    action: "Keep: governed discourse/coordination wrapper over independently parsed clause-like children.",
  },
  predicate_heuristic: {
    bucket: "predicate_heuristic",
    status: "migration_candidate",
    priority: 45,
    debt: true,
    action: "Review stable predicate-shape heuristics for a reusable typed template or retire the fallback once covered.",
  },
  surface_specific_phrase_rule: {
    bucket: "surface_specific_rule",
    status: "migration_candidate",
    priority: 20,
    debt: true,
    action: "Replace recurrent surface-specific phrase code with a reusable typed matcher when the reviewed boundary supports it.",
  },
  legacy_surface_rule: {
    bucket: "legacy_surface_rule",
    status: "migration_candidate",
    priority: 10,
    debt: true,
    action: "Replace legacy fallback matching with a governed typed matcher or narrower reviewed rule.",
  },
  special_ambiguity_rule: {
    bucket: "special_ambiguity_rule",
    status: "accepted_guardrail",
    priority: 70,
    debt: false,
    action: "Keep: explicit ambiguity guard unless a demonstrably safer representation replaces it.",
  },
  protected_formula_table: {
    bucket: "protected_formula_table",
    status: "accepted_closed_table",
    priority: 80,
    debt: false,
    action: "Keep: intentionally closed protected formula table.",
  },
  phase4_controlled_grammar_promotion: {
    bucket: "controlled_transition_trace",
    status: "transition_review",
    priority: 35,
    debt: false,
    action: "Review as transition provenance; do not classify it as migration debt merely because it is not a generative template.",
  },
  construction_function: {
    bucket: "construction_function",
    status: "accepted_specialized_implementation",
    priority: 75,
    debt: false,
    action: "Keep when the hand-written implementation captures reviewed context, composition, ambiguity, or nonlocal constraints; migrate only on separate evidence that a typed template is a cleaner equivalent.",
  },
  source_linked_runtime_matcher: {
    bucket: "source_linked_runtime_matcher",
    status: "accepted_specialized_implementation",
    priority: 90,
    debt: false,
    action: "Keep: deterministic source-linked bounded matcher with separately reviewed constraints.",
  },
  construction_internal_parser_inactive_clone: {
    bucket: "internal_support_trace",
    status: "accepted_internal_support",
    priority: 98,
    debt: false,
    action: "Keep: internal parser-inactive structural support trace; not an independent migration target.",
  },
};`;

apply("src/runtime-resources/diagnostics/trace-metadata.js", oldMetadata, newMetadata);

apply(
  "src/plugin-entry.js",
  `  if (kind === "generative_template" && trace.template_family === "construction_template") {
    return {
      bucket: "construction_template_family",
      status: "migration_candidate",
      priority: 15,
      action: "Remove remaining surface/vocabulary constraints once generated slots can license this template.",
    };
  }
  if (kind === "generative_template" && trace.template_family === "generative_template") {
    return LABEL_TRANSITION_KIND_POLICY.generative_template;
  }
`,
  `  if (kind === "generative_template" && trace.template_family === "construction_template") {
    return LABEL_TRANSITION_KIND_POLICY.construction_template;
  }
  if (kind === "generative_template" && trace.template_family === "generative_template") {
    return LABEL_TRANSITION_KIND_POLICY.generative_template;
  }
`,
);

apply(
  "src/plugin-entry.js",
  `  const migrationStatuses = new Set(["migration_candidate", "transition_trace"]);
`,
  `  const migrationStatuses = new Set(["migration_candidate"]);
`,
);

apply(
  "src/plugin-entry.js",
  `    policy: "Diagnostic inventory for transitioning remaining construction labels/rules toward governed generative templates or accepted structural wrappers. PASS means every construction trace was classified; migration candidates may still remain.",
    construction_row_count: rows.length,
    already_generative_count: countByStatus.already_generative || 0,
    migration_candidate_count: migrationCandidates.length,
    reviewed_table_or_guardrail_count: (countByStatus.reviewed_table || 0) + (countByStatus.review_guardrail || 0) + (countByStatus.intentionally_opaque || 0) + (countByStatus.accepted_structural_wrapper || 0),
`,
  `    policy: "Diagnostic inventory separating accepted runtime architectures from actionable migration debt. Declarative templates are preferred where they cleanly fit; governed specialized implementations may remain first-class. PASS means every construction trace was classified; migration candidates may still remain.",
    construction_row_count: rows.length,
    accepted_template_count: (countByStatus.accepted_reusable_template || 0) + (countByStatus.accepted_bounded_template || 0),
    accepted_specialized_count: (countByStatus.accepted_specialized_implementation || 0) + (countByStatus.accepted_guardrail || 0) + (countByStatus.accepted_closed_table || 0) + (countByStatus.accepted_internal_support || 0),
    transition_review_count: countByStatus.transition_review || 0,
    already_generative_count: countByStatus.accepted_reusable_template || 0,
    migration_candidate_count: migrationCandidates.length,
    reviewed_table_or_guardrail_count: (countByStatus.accepted_specialized_implementation || 0) + (countByStatus.accepted_guardrail || 0) + (countByStatus.accepted_closed_table || 0),
`,
);

console.log(JSON.stringify({
  schema: "canto-span-temp-label-transition-policy-v1",
  changed_files: [...new Set(changed)],
  policy: "accepted template/specialized/internal architectures separated from explicit legacy/surface/heuristic migration debt",
}, null, 2));
