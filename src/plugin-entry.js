const {
  contextual: LEARNER_CONTEXTUAL_GLOSSES,
  surface: LEARNER_SURFACE_GLOSSES,
  construction: LEARNER_CONSTRUCTION_GLOSSES,
} = require("./runtime-resources/presentation/learner-glosses");
const createLearnerDisplay = require("./render/learner-display");
const createCantoSpanPlugin = require("./plugin/canto-span-plugin");

/*
 * Canto Span
 *
 * A small standalone Obsidian plugin that renders Cantonese learner-role tokens
 * inside parent construction spans. Parent spans such as ProductiveVO/VP,
 * ModalVP, A-not-A, CompletionQuestion, TopicComment, CognitionContentFrame, SubjectPredicateClause, OpinionStanceFrame, ReportedSpeech, and ProhibitiveImperative
 * never overwrite child learner roles.
 */

const CANTO_SPAN_RUNTIME_VERSION = "0.5.216";
// v0.5.216: records evidence and ontology dispositions for all 52 active unsupported/internal labels and adds invariant probes without changing parser recognition or linguistic status.
// v0.5.215: closes direct boundary coverage for every active language-facing label and corrects explanatory 嚟 plus dangling clause-linker overgeneration.
// v0.5.213-r5: retires SchedulingQuestion because the sourced 想 + 約 + object + 幾時 profile already composes as ClauseSpan + ModalVP, while the dedicated wrapper only covered an unsourced 覺得…好 cross-product.
// v0.5.213-r4: narrows OpinionQuestion to the source-linked overt subject + 覺得 + evaluated referent + 點樣 profile and removes its token-cooccurrence fallback.
// v0.5.213-r3: narrows AcceptabilityClause to overt action + 都得, source-links 轆咭都得 and 搵第二個都得, and excludes wh/free-choice tails from the action-feasibility node.
// v0.5.213-r2: realigns completion + 就 sequences to typed sequential ClauseRelationEdge structure and retires CompletionThenClause.
// v0.5.213-r1: retires ConditionResult after typed conditional ClauseRelationEdge coverage replaced its unsupported action + 就 + stative fallback.
// v0.5.213: source-links narrow copula-less 唔 + property predication and records the contrasting 唔係 + nominal predicate boundary without broadening other negators.
// v0.5.212: retires the conflated NegatedLexicalizedStative label while preserving lexical 難X, compositional 唔 + lexicalized property predicates, and prohibitive/ambiguous 唔好 profiles.
// v0.5.211: reconciles source-linked preverbal 未/冇 experiential negation while preserving final-未 questions and excluding general 唔/咪 negation.
// v0.5.210: narrows ScalarEvaluation to sourced negative 算 evaluation and removes the unrelated price-noun predication profile.
// v0.5.209: retires the unsupported 價位-triggered ScalarRangeFragment fallback while preserving ordinary nominal structure.
// v0.5.203: stores canonical construction notes in linguistic-status folders while workflow state remains frontmatter-only; parser behavior is unchanged.
// v0.5.202: retires the misleading ComparativeStative fallback and routes source-supported property + 啲 adjustment through DegreeMannerAdverbial.
// v0.5.201: groups the source-attested 唔該 + addressee + scalar-adjustment request as a transparent polite imperative while preserving its children.
// v0.5.200: preserves source-attested permissive/passive 畀 frames while grouping 打籃球 as an activity VP rather than a retained patient.
// v0.5.199: reconciles the source-attested repeated-manner + overt 咁/噉 pattern, preserves a nested VP, and removes stale release-pinned verification assumptions.
// v0.5.198: consolidates current verification profiles, validation outputs, and implementation reachability probes. Parser behavior and linguistic statuses remain unchanged.
// v0.5.196: audits all thirteen remaining no-direct labels; eleven receive zero-evidence reachability probes while Comment and PerfectiveResultPredicate remain constructor-shadowed. No recognized parser span or linguistic-status changes.
// v0.5.194: audits speech, transfer, naming, intention, and complement wrappers with six zero-evidence reachability probes. No recognized parser span or linguistic-status changes.
// v0.5.193: audits nominal wrappers, adds two zero-evidence direct probes plus one compatibility-alias probe, and retires constructorless DemonstrativeHeadNP. No recognized parser span or retained linguistic-status changes.
// v0.5.192: audits result/change-state wrappers, adds ten zero-evidence reachability probes, and records one shadowed specialized perfective wrapper. No recognized parser span or linguistic-status changes.
// v0.5.191: audits experiential and delimited wrappers with seven zero-evidence reachability probes and records unresolved routing gaps. No recognized parser span changes.
// v0.5.189: adds zero-evidence runtime reachability probes for 15 previously unexercised labels and preserves 53 unobserved labels for later code-specific review. Parser span behavior and linguistic status are unchanged.
// v0.5.188: freezes the RUL source/runtime contrast map and survey-readiness requirements without creating a survey instrument or changing parser span behavior. The next blocking input is the user prompt that will guide pilot-v1 creation.
// v0.5.187: replaces the fixed two-reviewer evidence model with a role-neutral panel gate based on usable adjudicated judgments per critical item. PFV returns to research_pending because its mixed legacy instruments do not satisfy the clean panel threshold. Parser span behavior is unchanged.
// v0.5.186: closes the bounded PFV/RUL re-audit milestone. TopicCommentClause is retired as an unused duplicate; PFV structural metadata is clarified without changing span recognition. Linguistic status remains owned by grammar notes and external validation tools.
// v0.5.185: removes authoring-time evidence, speaker, corpus, confidence, and linguistic-status metadata from the shipped runtime. main.js now retains parser logic and the active construction-label registry only; governance is owned by grammar/active/*.md and grammar/archived/*.md and external validation tools. Structural parser behavior is unchanged from v0.5.184.
// v0.5.178: CP022-I1A-I02 performs authorized internal clause-relation graph cleanup only: ClauseLinkingSequence, ClauseRelation, and ClauseRelationMember are represented internally as ClauseRelationGraph, ClauseRelationEdge, and ClauseRelationMemberSpan with compatibility aliases, explicit subtype provenance, and no independent semantic licensing. The global new-grammar freeze remains active outside EP-CP022-I1A-I02-D1.
// v0.5.177: CP022-I1A-I04 performs authorized internal nominal-wrapper cleanup only: ModifierPhrase is retired, HeadNP is internally renamed NominalHeadSpan, and bounded MeasureExpression/DefinitionComplement representation remains non-licensing. The global new-grammar freeze remains active outside EP-R37-I04.
// v0.5.176: CP021B-LX1 adds bounded study-suite lexical and Jyutping coverage with grammar construction behavior frozen.
// v0.5.175: CP021B implements the frozen lexical-GIVE and post-theme-participant designs, retires TransferDitransitiveVP/RecipientFrame, and preserves CP020 passive–permissive ownership.
// v0.5.173: CP020 replaces the rejected generic AffectednessFrame with one narrow transparent 畀/俾 passive–permissive relation, preserves canonical/retained-object/permission ambiguity, and keeps non-target transfer, beneficiary, fragments, negation, aspect, and A-not-A outside the replacement.
// v0.5.172: Revises CP019 after rendered review: direct function resources are not forced into public Topic structure, modal use/function readings require affordance review, target hovers are specific, and audited unknown CJK receive pronunciation-only coverage without lexical promotion.
// v0.5.170: Supplies pronunciation-only Jyutping for audited unknown CJK tokens and excludes non-CJK placeholders from missing-Jyutping warnings; grammar and unknown-token status remain unchanged.
// v0.5.167: Adds recursive semantic-acceptance blockers and retires four debunked LANE-01 bridge constructors; ordinary new grammar remains frozen.
// v0.5.166: Evidence-backed V完咗O correction preserves inner/outer aspect scope for multi-token objects while retaining native surface conflicts and the grammar freeze.
// v0.5.164 historical note: introduced the former embedded grammar-legitimacy audit, which was removed from the shipped runtime in v0.5.185.
// v0.5.161: Distinguishes genuinely impersonal environmental clauses from context-dependent omitted-subject predicates and adds transparent ambient location frames.
// v0.5.157: Accounts bare relational coverbs such as 對 separately from high-confidence topic-frame linkers, while formal 對於 remains an explicit overt topic-frame source.
// v0.5.155: Preserves resolved clause/question/VP structure beneath overt-object selection review instead of flattening the grammatical host.
// Runtime construction governance is deliberately minimal. Linguistic status,
// confidence, sources, speaker records, corpus counts, and promotion eligibility
// live in grammar/<linguistic-status>/*.md and are validated outside the shipped plugin.
const {
  runtimeConstructionRegistryVersion: RUNTIME_CONSTRUCTION_REGISTRY_VERSION,
  constructionLabelRegistry,
  clauseSpanCompatibilityInputs,
  clauseRelationSubtypeRegistry,
  retiredConstructionLabelRegistry,
  retiredConstructionLabelAliases,
  internalConstructionCompatibilityAliases,
  internalOnlyConstructionScopes,
  constructionLabelPolicy,
} = require("./runtime-resources/constructions/runtime-label-registry");
const CONSTRUCTION_LABEL_REGISTRY = new Set(constructionLabelRegistry);
const CLAUSE_SPAN_COMPATIBILITY_INPUTS = new Set(clauseSpanCompatibilityInputs);
const CLAUSE_RELATION_SUBTYPE_REGISTRY = new Set(clauseRelationSubtypeRegistry);
const RETIRED_CONSTRUCTION_LABEL_REGISTRY = new Map(retiredConstructionLabelRegistry);
const RETIRED_CONSTRUCTION_LABEL_ALIASES = new Map(retiredConstructionLabelAliases);
const INTERNAL_CONSTRUCTION_COMPATIBILITY_ALIASES = Object.freeze(internalConstructionCompatibilityAliases);
const INTERNAL_ONLY_CONSTRUCTION_SCOPES = Object.freeze(internalOnlyConstructionScopes);
const CONSTRUCTION_LABEL_POLICY = Object.freeze(constructionLabelPolicy);
const JYUTPING_REVIEW_EXPECTATIONS = Object.fromEntries(
  require("./runtime-resources/pronunciation/jyutping-review-expectations"),
);
const PRODUCTIVE_VO = Object.fromEntries(require("./runtime-resources/lexicon/productive-vo"));
const TOKEN_LEXICON = Object.fromEntries(require("./runtime-resources/lexicon/token-lexicon"));
const FORMULAS = require("./runtime-resources/lexicon/formulas");
const {
  protectedAddressTerms,
  addressSuffixes: ADDRESS_SUFFIXES,
  addressPrefixes: ADDRESS_PREFIXES,
  addressFollowers: ADDRESS_FOLLOWERS,
  commonSurnameCharacters,
} = require("./runtime-resources/lexicon/address-terms");
const PROTECTED_ADDRESS_TERMS = new Set(protectedAddressTerms);
const COMMON_SURNAME_CHARS = new Set(commonSurnameCharacters);
const COMPOSITIONAL_LEXICAL_PHRASES = new Set(
  require("./runtime-resources/lexicon/compositional-lexical-phrases"),
);
const UNKNOWN_CJK_JYUTPING_FALLBACK = Object.freeze(Object.fromEntries(
  require("./runtime-resources/pronunciation/unknown-cjk-jyutping-fallback"),
));

function runtimeConstructionStateFor(type) {
  const construction = String(type || "");
  const active = CONSTRUCTION_LABEL_REGISTRY.has(construction);
  return { construction, active, registry_missing: !active };
}




const {
  environmentalEventPredicates: ENVIRONMENTAL_EVENT_PREDICATES,
  predicateOmissionProfiles: PREDICATE_OMISSION_PROFILES,
} = require("./runtime-resources/grammar/predicate-profiles");
const PRODUCTIVE_TERMS = Object.keys(PRODUCTIVE_VO).sort((a, b) => b.length - a.length || a.localeCompare(b));
const PRODUCTIVE_VO_GENERATIVE_SURFACES = new Set(Object.keys(PRODUCTIVE_VO));


// These phrases may be useful lesson examples, but they are compositional.
// Do not let longest-match lexical lookup collapse them into one token.


function predicateOmissionProfileForHead(surface) {
  const value = String(surface || "");
  return PREDICATE_OMISSION_PROFILES.find((profile) => (profile.positive_heads || []).includes(value)) || null;
}

function predicateOmissionProfileForQuestionForm(surface) {
  const value = String(surface || "");
  return PREDICATE_OMISSION_PROFILES.find((profile) => (profile.question_forms || []).includes(value)) || null;
}

function predicateProfilesCompatible(questionProfile, responseProfile) {
  if (!questionProfile || !responseProfile) return false;
  if (questionProfile.id === responseProfile.id) return true;
  if (questionProfile.question_match_family === responseProfile.question_match_family) return true;
  if (responseProfile.id === "factive_cognition" && questionProfile.question_match_family === "epistemic_event_polar") return true;
  return false;
}


const {
  learnerRoleLabels,
  slotNameDisallowedPrefixes: SLOT_NAME_DISALLOWED_PREFIXES,
  learnerDisplaySlotNames,
  learnerDisplaySlotLabels: LEARNER_DISPLAY_SLOT_LABELS,
} = require("./runtime-resources/presentation/learner-display");
const LEARNER_ROLE_LABELS = new Set(learnerRoleLabels);
const LEARNER_DISPLAY_SLOT_NAMES = new Set(learnerDisplaySlotNames);




function internalConstructionTypeFor(type = "") {
  return CLAUSE_SPAN_COMPATIBILITY_INPUTS.has(type) ? "ClauseSpan" : type;
}

function clauseSpanProfileForCompatibilityType(type = "") {
  if (type === "SubjectModalPredicateClause") return "subject_modal";
  if (type === "LocativeModalPredicateClause") return "locative_modal";
  if (type === "TopicModalPredicateClause") return "topic_modal";
  if (type === "CoordinatedSubjectModalPredicateClause") return "coordinated_subject_modal";
  return "subject_predicate";
}


function diagnosticCompatibilityConstructionType(type = "") {
  return INTERNAL_CONSTRUCTION_COMPATIBILITY_ALIASES[type] || type;
}

function diagnosticCompatibilityTrace(trace, compatibilityAlias = "") {
  if (!trace || typeof trace !== "object") return trace;
  const out = { ...trace };
  for (const key of ["construction_type", "preserved_root_construction"]) {
    if (out[key]) {
      out[key] = compatibilityAlias && out[key] === "ClauseSpan"
        ? compatibilityAlias
        : diagnosticCompatibilityConstructionType(out[key]);
    }
  }
  for (const key of ["child_constructions", "top_constructions", "top_child_constructions"]) {
    if (Array.isArray(out[key])) out[key] = out[key].map(diagnosticCompatibilityConstructionType);
  }
  return out;
}




const {
  templateTracePassthroughKeys: TEMPLATE_TRACE_PASSTHROUGH_KEYS,
  parserDecisionTraceKindRegistry,
  templateFamilyRegistry,
  parserDecisionLabelPolicy,
  labelTransitionKindPolicy: LABEL_TRANSITION_KIND_POLICY,
} = require("./runtime-resources/diagnostics/trace-metadata");
const PARSER_DECISION_TRACE_KIND_REGISTRY = new Map(parserDecisionTraceKindRegistry);
const TEMPLATE_FAMILY_REGISTRY = new Map(templateFamilyRegistry);
const PARSER_DECISION_LABEL_POLICY = Object.freeze(parserDecisionLabelPolicy);



function templateFamilyForDefinition(template = {}) {
  if (template.template_family && TEMPLATE_FAMILY_REGISTRY.has(template.template_family)) return template.template_family;
  const constraints = template.constraints || {};
  const hasSurfaceConstraint = Boolean(
    constraints.slot_surface_in ||
    constraints.slot_surface_not_in ||
    constraints.first_node_must_have_surface
  );
  const hasChildOverride = Boolean(
    template.child_parser_inactive_overrides && Object.keys(template.child_parser_inactive_overrides).length
  );
  const note = String(template.note || "");
  const boundedLanguage = /\b(bounded|controlled|constrained|reviewed|closed-list|formula|protected|surface-specific)\b/i.test(note);
  return hasSurfaceConstraint || hasChildOverride || boundedLanguage ? "construction_template" : "generative_template";
}


// Registry-clean slots are still parser/internal labels. The learner-facing
// hover layer should expose only broad grammar hints and keep implementation or
// frame-specific slots such as stance_holder / opinion_topic / reported_content
// inside diagnostics.


function learnerDisplaySlotLabel(slot) {
  return LEARNER_DISPLAY_SLOT_LABELS[slot] || slot;
}

function learnerDisplaySlots(slots = []) {
  return cleanSlots(slots)
    .filter((slot) => LEARNER_DISPLAY_SLOT_NAMES.has(slot))
    .map(learnerDisplaySlotLabel);
}

function internalOnlySlots(slots = []) {
  return cleanSlots(slots)
    .filter((slot) => !LEARNER_DISPLAY_SLOT_NAMES.has(slot));
}

function normalizeLearnerLabel(label, surface = "", syntax = "") {
  if (LEARNER_ROLE_LABELS.has(label)) return label;
  if (label === "classifier") return "measure_word";
  if (label === "stance") {
    if (surface === "鍾意") return "like";
    if (syntax.includes("suggestion_marker") || syntax.includes("possibility") || syntax.includes("seeming") || syntax.includes("should")) return "func";
    return "doing";
  }
  return "neutral";
}

const {
  slotNameRegistryIssue,
  isCleanSlotName,
  cleanSlots,
} = require("./parser/slots/clean-slots");

function learnerRoleRegistryRows(analysis) {
  return flattenNodes(analysis.nodes)
    .filter((row) => row.kind === "token")
    .filter((row) => !LEARNER_ROLE_LABELS.has(row.role || ""))
    .map((row) => ({
      surface: row.surface,
      role: row.role || "",
      syntax: row.syntax || "",
      parent: row.parent || "",
      reason: "Token learner role is outside the controlled learner-role registry.",
    }));
}

function slotNameRegistryRows(analysis) {
  const rows = [];
  for (const row of flattenNodes(analysis.nodes)) {
    for (const slot of row.slots || []) {
      const issue = slotNameRegistryIssue(slot);
      if (!issue) continue;
      rows.push({
        surface: row.surface || "",
        kind: row.kind || "",
        construction: row.type || "",
        role: row.role || "",
        slot,
        issue,
        reason: issue === "implementation_phase_marker_in_slot"
          ? "Phase/custom implementation markers belong in trace or feature bundles, not slot names."
          : "Slot names must be lower snake_case registry labels, not construction names or display labels.",
      });
    }
  }
  return rows;
}

function constructionLabelRegistryRows(analysis) {
  return flattenNodes(analysis.nodes)
    .filter((row) => row.kind === "construction")
    .map((row) => {
      const construction = row.type || "";
      const retiredReason = RETIRED_CONSTRUCTION_LABEL_REGISTRY.get(construction);
      if (retiredReason) {
        return {
          surface: row.surface || "",
          construction,
          issue: "retired_or_over_specific_construction_label",
          reason: retiredReason,
          policy: CONSTRUCTION_LABEL_POLICY,
        };
      }
      if (!CONSTRUCTION_LABEL_REGISTRY.has(construction)) {
        return {
          surface: row.surface || "",
          construction,
          issue: "construction_label_outside_controlled_registry",
          reason: "Construction label is outside the controlled construction-label registry. New labels require grammar evidence first; explicit approval is required only for useful project-specific labels that lack external or recurring grammar justification.",
          policy: CONSTRUCTION_LABEL_POLICY,
        };
      }
      return null;
    })
    .filter(Boolean);
}

function parserDecisionLabelRegistryRows(analysis) {
  const rows = [];
  for (const row of flattenNodes(analysis.nodes)) {
    const trace = row.trace || {};
    const kind = trace.kind || "";
    if (kind && !PARSER_DECISION_TRACE_KIND_REGISTRY.has(kind)) {
      rows.push({
        surface: row.surface || "",
        kind: row.kind || "",
        construction: row.type || "",
        trace_kind: kind,
        issue: "parser_decision_trace_kind_outside_registry",
        reason: "Trace kind is used in parser diagnostics or parser decisions but is outside the controlled parser-decision trace registry.",
        policy: PARSER_DECISION_LABEL_POLICY,
      });
    }
    const templateFamily = trace.template_family || "";
    if (templateFamily && !TEMPLATE_FAMILY_REGISTRY.has(templateFamily)) {
      rows.push({
        surface: row.surface || "",
        kind: row.kind || "",
        construction: row.type || "",
        template_family: templateFamily,
        issue: "template_family_outside_registry",
        reason: "Template family must remain one of the controlled names while construction_template and generative_template are still distinct.",
        policy: PARSER_DECISION_LABEL_POLICY,
      });
    }
  }
  return rows;
}

function registryAuditSummary(analysis) {
  const invalidLearnerRoles = learnerRoleRegistryRows(analysis);
  const invalidSlotNames = slotNameRegistryRows(analysis);
  const invalidConstructionLabels = constructionLabelRegistryRows(analysis);
  const invalidParserDecisionLabels = parserDecisionLabelRegistryRows(analysis);
  return {
    status: invalidLearnerRoles.length || invalidSlotNames.length || invalidConstructionLabels.length || invalidParserDecisionLabels.length ? "WARN" : "PASS",
    learner_role_registry_status: invalidLearnerRoles.length ? "WARN" : "PASS",
    slot_name_registry_status: invalidSlotNames.length ? "WARN" : "PASS",
    construction_label_registry_status: invalidConstructionLabels.length ? "WARN" : "PASS",
    parser_decision_label_registry_status: invalidParserDecisionLabels.length ? "WARN" : "PASS",
    invalid_learner_role_count: invalidLearnerRoles.length,
    invalid_slot_name_count: invalidSlotNames.length,
    invalid_construction_label_count: invalidConstructionLabels.length,
    invalid_parser_decision_label_count: invalidParserDecisionLabels.length,
    invalid_learner_roles: invalidLearnerRoles,
    invalid_slot_names: invalidSlotNames,
    invalid_construction_labels: invalidConstructionLabels,
    invalid_parser_decision_labels: invalidParserDecisionLabels,
    parser_decision_label_policy: PARSER_DECISION_LABEL_POLICY,
  };
}

function learnerDisplayAuditRows(analysis) {
  return flattenNodes(analysis.nodes)
    .map((row) => {
      const hidden = internalOnlySlots(row.slots || []);
      return {
        surface: row.surface || "",
        kind: row.kind || "",
        construction: row.type || "",
        role: row.role || "",
        learner_display_slots: learnerDisplaySlots(row.slots || []),
        hidden_internal_slots: hidden,
      };
    })
    .filter((row) => row.hidden_internal_slots.length);
}

function learnerDisplayAuditSummary(analysis) {
  const rows = learnerDisplayAuditRows(analysis);
  const hiddenCounts = {};
  for (const row of rows) {
    for (const slot of row.hidden_internal_slots) hiddenCounts[slot] = (hiddenCounts[slot] || 0) + 1;
  }
  return {
    status: "PASS",
    learner_display_slot_status: "PASS",
    policy: "Parser/internal slots remain available in diagnostics. Hover titles may expose concise role/syntax metadata plus learner glosses, but raw slots and internal counts remain diagnostics-only.",
    nodes_with_hidden_internal_slots: rows.length,
    hidden_internal_slot_reference_count: Object.values(hiddenCounts).reduce((sum, count) => sum + count, 0),
    hidden_internal_slot_counts: hiddenCounts,
    sample_hidden_internal_slot_rows: rows.slice(0, 12),
  };
}



const SLOT_GENERATION_RULES = require("./runtime-resources/grammar/templates/slot-generation-rules");
const CONSTRUCTION_TEMPLATES = require("./runtime-resources/grammar/templates/construction-templates");
const CATEGORY_SPAN_TEMPLATES = require("./runtime-resources/grammar/templates/category-span-templates");
const SLOT_ALIASES = require("./runtime-resources/grammar/slot-aliases");
const PUNCT_RE = require("./parser/tokenization/punctuation");

const {
  normalizeSurface,
  foldedPinyinFalloutRepair,
  normalizeInputForParser,
  nodeParserSurface,
  nodeDisplaySurface,
  annotateRawDisplaySurfaces,
  inputNormalizationHasFindings,
} = require("./parser/normalization/normalize-input");

function normalizationReviewSuggestionsForAnalysis(analysis) {
  if (!analysis) return [];
  if (analysis.input_normalization && Array.isArray(analysis.input_normalization.review_suggestions)) {
    return analysis.input_normalization.review_suggestions;
  }
  return Array.isArray(analysis.normalization_review_suggestions)
    ? analysis.normalization_review_suggestions
    : [];
}

function normalizationReviewSuggestionDisplayRows(analysis) {
  return normalizationReviewSuggestionsForAnalysis(analysis).map((suggestion) => ({
    index: suggestion.index,
    length: suggestion.length || Array.from(String(suggestion.raw || "")).length || 1,
    raw: suggestion.raw,
    suggested: suggestion.suggested,
    display: suggestion.display || `${suggestion.raw} → ${suggestion.suggested}`,
    source: suggestion.source || "character",
    status: suggestion.status || "review_only_not_applied",
    applied_to_parser_shadow: suggestion.applied_to_parser_shadow === true,
    learner_display_replaced: suggestion.learner_display_replaced === true,
  }));
}

function foldedLexicalRepairTraceRowsForAnalysis(analysis) {
  if (!analysis) return [];
  const trace = analysis.input_normalization && Array.isArray(analysis.input_normalization.normalization_trace)
    ? analysis.input_normalization.normalization_trace
    : (Array.isArray(analysis.normalization_trace) ? analysis.normalization_trace : []);
  return trace.filter((item) => item.type === "pinyin_fallout_cantonese_lexical_repair");
}

function foldedLexicalRepairDisplayRows(analysis) {
  return foldedLexicalRepairTraceRowsForAnalysis(analysis).map((item) => ({
    index: item.index,
    length: 1,
    raw: item.raw,
    normalized: item.normalized,
    display: `${item.raw} → ${item.normalized}`,
    source: item.source || "pinyin_simplified_typing_fallout",
    status: item.status || "folded_parser_shadow_only",
    confidence: item.confidence || "high",
    applied_to_parser_shadow: item.applied_to_parser_shadow === true,
    learner_display_replaced: item.learner_display_replaced === true,
    one_to_one_character_mapping: item.one_to_one_character_mapping === true,
    note: item.note || "Folded pinyin-fallout lexical repair applied to parser shadow only."
  }));
}


function parserShadowRepairTraceRowsForAnalysis(analysis) {
  if (!analysis) return [];
  const trace = analysis.input_normalization && Array.isArray(analysis.input_normalization.normalization_trace)
    ? analysis.input_normalization.normalization_trace
    : (Array.isArray(analysis.normalization_trace) ? analysis.normalization_trace : []);
  return trace.filter((item) => item && item.applied_to_parser_shadow === true && item.raw !== item.normalized);
}

function parserShadowRepairKind(item) {
  if (!item) return "unknown";
  if (item.type === "pinyin_fallout_cantonese_lexical_repair") return "folded_lexical_repair";
  if (item.type === "simplified_to_traditional") return "character_form_normalization";
  return item.type || "unknown";
}

function parserShadowRepairDisplayRows(analysis) {
  return parserShadowRepairTraceRowsForAnalysis(analysis).map((item) => {
    const note = String(item.note || "").trim();
    return {
      index: item.index,
      length: item.length || 1,
      raw: item.raw,
      normalized: item.normalized,
      display: `${item.raw} → ${item.normalized}`,
      type: item.type || "unknown",
      repair_kind: parserShadowRepairKind(item),
      source: item.source || "unknown",
      status: item.status || "applied_parser_shadow_only",
      confidence: item.confidence || "unknown",
      applied_to_parser_shadow: item.applied_to_parser_shadow === true,
      learner_display_replaced: item.learner_display_replaced === true,
      one_to_one_character_mapping: item.one_to_one_character_mapping === true,
      note: note || null,
      note_coverage_status: note ? "PASS" : "WARN",
    };
  });
}

function parserShadowRepairTypeCounts(rows) {
  return (rows || []).reduce((acc, row) => {
    const key = row.repair_kind || row.type || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function parserShadowRepairNoteCoverageSummary(rows) {
  const repairs = rows || [];
  const missing = repairs.filter((row) => !row.note || row.note_coverage_status !== "PASS");
  return {
    status: missing.length ? "WARN" : "PASS",
    parser_shadow_repair_count: repairs.length,
    missing_shadow_repair_note_count: missing.length,
  };
}

function parserShadowRepairKindLabel(row) {
  const kind = row && (row.repair_kind || row.type);
  if (kind === "folded_lexical_repair") return "folded lexical";
  if (kind === "character_form_normalization") return "character form";
  return String(kind || "shadow repair").replace(/_/g, " ");
}

function safeClass(value) {
  return String(value || "neutral").replace(/[^a-z0-9_-]/gi, "-").toLowerCase();
}

const {
  hasAny,
  stringIncludesAny,
  contextualRoleAffordances,
  inferTokenFeatures,
  compactFeatureSummary,
  featureList,
  syntaxHas,
  featureBundleFor,
  getFeatureBundle,
  getParserFeatures,
  getConstructionAffordances,
  getCoreDimensions,
  getLexicalizationType,
  hasPredicateSubtype,
  isLexicalizedStative,
  isNegativeLexicalizedStative,
  isOrdinaryStative,
  isStativePredicateByBundle,
  isGradablePredicate,
  canHeadComment,
  bundleCanFillStativeSlot,
  parserActiveStativeSlotsForBundle,
  conditionMatches,
  generateTokenSlots,
} = require("./parser/features/token-features")({
  normalizeLearnerLabel,
  cleanSlots,
});

const {
  traceInfo,
  traceKind,
  isSurfaceSpecificTrace,
  sameNodeSequence,
  phraseMatch,
  flattenSurface,
  flattenDisplaySurface,
  firstToken,
  lastToken,
  isToken,
  isVerbLike,
  isObjectLike,
  isProductiveVo,
  isModalToken,
  isParticle,
  isStativeToken,
  isTopicCandidate,
  surfaceOf,
  hasSurface,
  indexOfSurface,
  hasConstruction,
} = require("./parser/nodes/node-shape")({
  bundleCanFillStativeSlot,
});

const {
  mergeUnique,
  constructionSlotsByType,
  nodeSlots,
  slotAlternatives,
  nodeCanFillSlot,
  isBareQuantityTokenObject,
  templateDerivedSlots,
} = require("./parser/slots/slot-primitives")({
  cleanSlots,
  bundleCanFillStativeSlot,
});

const {
  parseTemplateSlot,
  templateConstraintsPass,
  matchTemplate,
} = require("./parser/templates/template-matcher")({
  firstToken,
  flattenSurface,
  isBareQuantityTokenObject,
  nodeCanFillSlot,
  nodeCanLicenseEvidenceGatedObject,
  nodeSlots,
});

function attachSharedSubjectProvenanceToPurposePredicate(templateType, assignments, children) {
  if (templateType !== "SubjectPredicateClause") return children;
  const subjectIndex = assignments.findIndex((item) => item.slot === "subject");
  const predicateIndex = assignments.findIndex((item) => item.slot === "predicate");
  if (subjectIndex < 0 || predicateIndex < 0) return children;
  const subject = children[subjectIndex];
  const predicate = children[predicateIndex];
  if (!predicate || predicate.kind !== "construction" || !["SerialVerbPurposeChain", "MotionPurposeChain"].includes(predicate.type)) return children;
  if (predicate.trace && predicate.trace.shared_subject_provenance) return children;
  const enrichedPredicate = {
    ...predicate,
    trace: {
      ...(predicate.trace || traceInfo("generative_template", { construction_type: predicate.type })),
      shared_subject_provenance: {
        overt_subject_surface: flattenSurface(subject),
        licensed_members: (predicate.children || []).map((node) => flattenSurface(node)),
        hidden_subject_inserted: false,
      },
    },
  };
  return children.map((child, index) => index === predicateIndex ? enrichedPredicate : child);
}

function templateConstructionFor(nodes, allowedTypes = null) {
  for (const template of CONSTRUCTION_TEMPLATES) {
    if (allowedTypes && !allowedTypes.includes(template.type)) continue;
    const assignments = matchTemplate(nodes, template.template);
    if (assignments && templateConstraintsPass(assignments, template)) {
      let children = applyRoleOverrides(assignments, template);
      children = attachSharedSubjectProvenanceToPurposePredicate(template.type, assignments, children);
      const assignedSlots = assignments.map((item) => item.slot);
      const traceDetail = {
        construction_type: template.type,
        template_family: templateFamilyForDefinition(template),
        template: template.template,
        constraints: template.constraints || {},
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
      };
      for (const key of TEMPLATE_TRACE_PASSTHROUGH_KEYS) {
        if (Object.prototype.hasOwnProperty.call(template, key)) traceDetail[key] = template[key];
      }
      const wrapperCoverage = assignedSlotWrapperCoverage(template.type, children, assignedSlots);
      if (wrapperCoverage) traceDetail.wrapper_coverage = wrapperCoverage;
      return construction(template.type, template.label, children, {
        note: `${template.note} Matched by generated slot affordances: ${assignedSlots.join(" → ")}.`,
        slots: template.output_slots ? cleanSlots(template.output_slots) : templateDerivedSlots(template.type, children),
        trace: traceInfo("generative_template", traceDetail),
      });
    }
  }
  return null;
}

function applyRoleOverrides(assignments, template = {}) {
  const overrides = template.role_overrides || {};
  const inactiveOverrides = template.child_parser_inactive_overrides || {};
  return assignments.map((item) => {
    const inactiveOverride = inactiveOverrides[item.slot];
    if (inactiveOverride && item.node && item.node.kind === "token") {
      return parserInactiveTokenClone(item.node, {
        label: inactiveOverride.label || item.node.label,
        pos: inactiveOverride.pos || undefined,
        syntax: inactiveOverride.syntax || item.node.syntax,
        slots: inactiveOverride.slots || undefined,
        reason: inactiveOverride.reason || `Token is parser-inactive inside ${template.type}; the parent exposes the construction affordance.`,
      });
    }
    const override = overrides[item.slot];
    if (!override || !item.node || item.node.kind !== "token") return item.node;
    const overrideLabel = override.label || item.node.label;
    const overrideSyntax = override.syntax || item.node.syntax;
    const overrideEntry = { ...(TOKEN_LEXICON[item.node.surface] || {}), label: overrideLabel, syntax: overrideSyntax };
    const overrideFeatures = inferTokenFeatures(item.node.surface, overrideEntry, {
      label: overrideLabel,
      syntax: overrideSyntax,
    });
    const overrideSlots = override.slots ? cleanSlots(override.slots) : generateTokenSlots(overrideFeatures);
    const overrideFeatureBundle = featureBundleFor(item.node.surface, overrideEntry, overrideFeatures, overrideSlots);
    const traceDetail = {
      surface: item.node.surface,
      generated_slots: overrideSlots,
      feature_summary: compactFeatureSummary(overrideFeatures),
      feature_bundle: overrideFeatureBundle,
      contextual_role_override: template.type,
      original_role: item.node.label,
      contextual_role_affordance_resolution: {
        lexical_default_role: item.node.label || "",
        active_role: overrideLabel,
        candidate_affordances: contextualRoleAffordances({
          surface: item.node.surface,
          role: item.node.label || overrideLabel,
          label: item.node.label || overrideLabel,
          syntax: item.node.syntax || overrideSyntax,
          slots: item.node.slots || [],
          features: item.node.features || {},
        }),
        active_affordance_source: template.type,
        note: "Construction role override selects the active learner role without deleting other lexical affordances.",
      },
    };
    if (item.node.trace && item.node.trace.selection_decision) {
      traceDetail.selection_decision = item.node.trace.selection_decision;
    }
    const overrideJyutping = override.jyutping_by_surface && override.jyutping_by_surface[item.node.surface]
      ? override.jyutping_by_surface[item.node.surface]
      : (override.jyutping || item.node.jyutping);
    if (overrideJyutping && overrideJyutping !== item.node.jyutping) {
      traceDetail.contextual_jyutping_override = {
        lexical_default_jyutping: item.node.jyutping || "",
        active_jyutping: overrideJyutping,
        active_affordance_source: template.type,
        note: "Construction context selects the active pronunciation without deleting other lexical affordances.",
      };
    }
    return token(item.node.surface, {
      label: overrideLabel,
      syntax: overrideSyntax,
      slots: overrideSlots,
      jyutping: overrideJyutping,
      display_surface: item.node.display_surface || undefined,
      parser_surface: item.node.parser_surface || item.node.surface,
      note: override.note || item.node.note,
      review: item.node.review,
      trace: traceInfo("atomic_lexicon", traceDetail),
    });
  });
}

function conventionalEnvironmentalEventConstruction(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length !== 2 || compact.some((node) => node.kind === "construction" || node.kind === "text")) return null;
  const eventSurface = compact.map((node) => flattenSurface(node)).join("");
  const eventRule = ENVIRONMENTAL_EVENT_PREDICATES[eventSurface];
  if (!eventRule
      || flattenSurface(compact[0]) !== eventRule.head
      || flattenSurface(compact[1]) !== eventRule.phenomenon) return null;
  const head = parserInactiveTokenClone(compact[0], {
    label: "doing",
    syntax: "environmental_event_predicate",
    slots: ["environmental_event_head", "environmental_predicate", "predicate"],
    reason: `${eventRule.head} is licensed as an environmental event head only inside the conventional ${eventSurface} predicate.`,
    active_affordance_match: { role: "doing", slot: "environmental_event_head", source: "construction_override" },
    preserve_existing_affordances: true,
  });
  const phenomenon = parserInactiveTokenClone(compact[1], {
    label: "what",
    syntax: "weather_phenomenon environmental_phenomenon",
    slots: ["weather_phenomenon", "environmental_phenomenon"],
    reason: `${eventRule.phenomenon} is the visible weather-phenomenon component of ${eventSurface}, not an ordinary affected object.`,
    active_affordance_match: { role: "what", slot: "weather_phenomenon", source: "construction_override" },
    preserve_existing_affordances: true,
  });
  return construction("ImpersonalEnvironmentalClause", "Environment", [head, phenomenon], {
    slots: constructionSlotsByType("ImpersonalEnvironmentalClause", [head, phenomenon]),
    note: "Lexically licensed conventional environmental event predicate with transparent visible components.",
    trace: traceInfo("generative_template", {
      construction_type: "ImpersonalEnvironmentalClause",
      template_family: "construction_template",
      template: ["environmental_event_head!", "weather_phenomenon!"],
      assigned_slots: ["environmental_event_head", "weather_phenomenon"],
      surfaces: [eventRule.head, eventRule.phenomenon],
      subject_status: "impersonal",
      subjectless_type: "genuinely_subjectless_environmental",
      hidden_subject_inserted: false,
      environmental_subtype: eventRule.environmental_subtype,
      not_claims: ["not_productive_vo_object_relation", "not_null_referential_subject", "not_hidden_expletive_subject"],
    }),
  });
}

function categorySubspanFor(nodes, allowedTypes = null) {
  const conventionalEnvironmental = conventionalEnvironmentalEventConstruction(nodes);
  if (conventionalEnvironmental && (!allowedTypes || allowedTypes.includes("ImpersonalEnvironmentalClause"))) {
    return conventionalEnvironmental;
  }
  for (const template of CATEGORY_SPAN_TEMPLATES) {
    if (allowedTypes && !allowedTypes.includes(template.type)) continue;
    const assignments = matchTemplate(nodes, template.template);
    if (assignments && templateConstraintsPass(assignments, template)) {
      let children = applyRoleOverrides(assignments, template);
      children = attachSharedSubjectProvenanceToPurposePredicate(template.type, assignments, children);
      const assignedSlots = assignments.map((item) => item.slot);
      const traceDetail = {
        construction_type: template.type,
        template_family: templateFamilyForDefinition(template),
        template: template.template,
        constraints: template.constraints || {},
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        role_overrides: template.role_overrides || {},
        subspan: true,
      };
      for (const key of TEMPLATE_TRACE_PASSTHROUGH_KEYS) {
        if (Object.prototype.hasOwnProperty.call(template, key)) traceDetail[key] = template[key];
      }
      const wrapperCoverage = assignedSlotWrapperCoverage(template.type, children, assignedSlots);
      if (wrapperCoverage) traceDetail.wrapper_coverage = wrapperCoverage;
      return construction(template.type, template.label, children, {
        note: `${template.note} Matched by generated category slots: ${assignedSlots.join(" → ")}.`,
        slots: template.output_slots ? cleanSlots(template.output_slots) : templateDerivedSlots(template.type, children),
        trace: traceInfo("generative_template", traceDetail),
      });
    }
  }
  return null;
}







function shouldDeferPostverbalZoForFollowingComplement(candidate, nodes, index, length) {
  if (!candidate || candidate.type !== "PostverbalZoPerfectiveVP") return false;
  const next = nodes[index + length];
  if (!next) return false;
  return nodeCanFillSlot(next, "directional_motion_vp")
    || nodeCanFillSlot(next, "verb_complement")
    || nodeCanFillSlot(next, "result_complement")
    || nodeCanFillSlot(next, "directional_complement");
}

function shouldDeferActionStativeForDegreeMannerComplement(candidate, nodes, index, length) {
  if (!candidate || candidate.type !== "ActionStativeVP") return false;
  const next = nodes[index + length];
  if (!next) return false;
  return nodeCanFillSlot(next, "degree_particle") || flattenSurface(next) === "啲";
}



function shouldDeferTransitiveWhDeterminerObject(candidate, nodes, index, length) {
  if (!candidate || candidate.type !== "TransitiveVP") return false;
  const objectNode = candidate.children && candidate.children[1];
  if (!objectNode || !nodeCanFillSlot(objectNode, "direct_nominal_wh_determiner")) return false;
  const followingHead = nodes[index + length];
  if (!followingHead || !nodeCanFillSlot(followingHead, "head_noun")) return false;
  return true;
}

function shouldDeferCompletionForPerfectiveComposition(candidate, nodes, index, length) {
  if (!candidate || candidate.type !== "CompletionVP") return false;
  const assignedSlots = candidate.trace && Array.isArray(candidate.trace.assigned_slots)
    ? candidate.trace.assigned_slots
    : [];

  // V + 完 + 咗 + O is represented compositionally as an inner CompletionVP
  // under an outer PerfectiveVP. Do not let the generic category-subspan pass
  // flatten that scope relation before the dedicated composition fallback runs.
  if (assignedSlots.includes("perfective_aspect") && assignedSlots.includes("object")) return true;

  // When the object is still split (for example 啲 + 飯 or 本 + 書), defer the
  // shorter V + 完 span so the NP can first compose. A bare V + 完 + 咗 with
  // only a final particle is not deferred because it has no overt object.
  const followingAspect = nodes[index + length];
  if (!followingAspect || !nodeCanFillSlot(followingAspect, "perfective_aspect")) return false;
  return nodes.slice(index + length + 1).some((node) =>
    node && node.kind !== "text" && !nodeCanFillSlot(node, "particle")
  );
}

function wrapCategorySubspansOnce(nodes) {
  const result = [];
  let i = 0;
  const maxWindow = 7;
  while (i < nodes.length) {
    let matched = null;
    const remaining = nodes.length - i;
    for (let length = Math.min(maxWindow, remaining); length >= 2; length--) {
      const window = nodes.slice(i, i + length);
      if (window.some((node) => node.kind === "text")) continue;
      const candidate = categorySubspanFor(window);
      if (candidate) {
        if (shouldDeferPostverbalZoForFollowingComplement(candidate, nodes, i, length)) continue;
        if (shouldDeferTransitiveWhDeterminerObject(candidate, nodes, i, length)) continue;
        if (shouldDeferCompletionForPerfectiveComposition(candidate, nodes, i, length)) continue;
        if (shouldDeferApproximateQuantityForUnlicensedGovernor(candidate, nodes, i)) continue;
        if (shouldDeferActionStativeForDegreeMannerComplement(candidate, nodes, i, length)) continue;
        if (candidate.type === "QuantifiedClassifierNP"
          && candidate.trace
          && candidate.trace.fragment_subtype === "quantified_classifier_head_ellipsis"
          && i + length < nodes.length) continue;
        matched = { node: candidate, length };
        break;
      }
    }
    if (matched) {
      result.push(matched.node);
      i += matched.length;
    } else {
      result.push(nodes[i]);
      i += 1;
    }
  }
  return result;
}

function wrapCategorySubspans(nodes) {
  let current = nodes;
  for (let pass = 0; pass < 4; pass++) {
    const next = wrapCategorySubspansOnce(current);
    if (sameNodeSequence(current, next)) return next;
    current = next;
  }
  return current;
}

// Pronunciation-only fallback for CJK material that must remain semantically unknown.
// These readings improve learner display and Jyutping audit coverage without
// converting the token into a lexical entry or licensing any grammar.

const {
  pronunciationOnlyJyutpingForUnknown,
  token,
  textNode,
  construction,
  parserInactiveTokenClone,
  learnerDisplayOnlyTokenClone,
  contextualLearnerRoleOnlyTokenClone,
} = require("./parser/nodes/node-factories")({
  TOKEN_LEXICON,
  UNKNOWN_CJK_JYUTPING_FALLBACK,
  normalizeLearnerLabel,
  cleanSlots,
  contextualRoleAffordances,
  inferTokenFeatures,
  compactFeatureSummary,
  featureBundleFor,
  generateTokenSlots,
  traceInfo,
  traceKind,
  constructionSlotsByType,
  nodeParserSurface,
  nodeDisplaySurface,
  INTERNAL_CONSTRUCTION_COMPATIBILITY_ALIASES,
  INTERNAL_ONLY_CONSTRUCTION_SCOPES,
  internalConstructionTypeFor,
  clauseSpanProfileForCompatibilityType,
  npLicenseMetadata,
});

const createNpDetectors = require("./parser/detectors/np/core");
const {
  approximateQuantityFallback,
  classifierObjectNPFromNodes,
  compositionalNpSubspanFor,
  coordinatedNPFragmentFallback,
  coordinatedNPFromParts,
  deicticClassifierTopicFromParts,
  nominalComplementFromNodes,
  possessiveClassifierNPFromNodes,
  shouldDeferApproximateQuantityForUnlicensedGovernor,
  wrapCompositionalNpSubspans,
  wrapPossessiveClassifierNPSubspans,
} = createNpDetectors({
  categorySubspanFor,
  cleanSlots,
  construction,
  firstToken,
  flattenSurface,
  hasSurface,
  isToken,
  nodeCanFillSlot,
  nodeSlots,
  parserInactiveTokenClone,
  resultFramePartClone,
  templateConstructionFor,
  templateDerivedSlots,
  traceInfo,
  withoutIgnorableSpaceText,
  withoutTrailingParticles,
});

const {
  lexicalizedStativeRegistryKind,
  transparentClassifierObjectParts,
  shouldForceCompositional,
  ALL_LEXICON_TERMS,
  LEXICON_TERMS,
  LEXICALIZED_STATIVE_SELECTION_WEIGHT,
  lexicalCandidateScore,
  followingLexicalizedStativeAfterChoice,
  lexicalSelectionReason,
  lexicalSelectionDecision,
  selectionDecisionForSurface,
  selectLexiconTerm,
} = require("./parser/tokenization/lexical-selection")({
  TOKEN_LEXICON,
  PRODUCTIVE_VO,
  COMPOSITIONAL_LEXICAL_PHRASES,
  inferTokenFeatures,
  featureBundleFor,
  getLexicalizationType,
});

const COMPOSITIONAL_NP_TYPES = new Set([
  "NominalHeadSpan",
  "QuantifiedClassifierNP",
  "OvertHeadDemonstrativeClassifierNP",
  "DemonstrativeClassifierNP",
  "AssociativeNP",
  "CoordinatedNP",
]);
const PROVISIONAL_NP_TYPES = new Set([
  "HeadlessDemonstrativeClassifierNP",
]);

function nodeContainsUnknownNominalMaterial(node) {
  if (!node) return true;
  if (node.kind === "text") return true;
  if (node.kind === "token") {
    const traceKind = node.trace && node.trace.kind || "";
    const syntax = String(node.syntax || "");
    return traceKind === "unknown_atomic" || /(?:^|[ _-])unknown(?:[ _-]|$)/iu.test(syntax) || /unknown_cjk_or_text/iu.test(syntax);
  }
  return (node.children || []).some(nodeContainsUnknownNominalMaterial);
}

const LICENSED_CLASSIFIER_HEAD_RULES = require("./runtime-resources/grammar/classifier-head-rules");
function lexicalClassifierClassesForNode(node) {
  if (!node) return [];
  if (node.kind === "token") {
    const entry = TOKEN_LEXICON[node.surface] || {};
    return Array.isArray(entry.classifier_classes) ? entry.classifier_classes.slice() : [];
  }
  const classes = new Set();
  for (const child of node.children || []) {
    for (const value of lexicalClassifierClassesForNode(child)) classes.add(value);
  }
  return Array.from(classes);
}

function classifierHeadCompatibility(children = [], trace = {}) {
  const assigned = Array.isArray(trace.assigned_slots) ? trace.assigned_slots : [];
  const classifierIndex = assigned.indexOf("classifier");
  const headIndex = assigned.indexOf("head_noun");
  if (classifierIndex < 0 || headIndex < 0) return null;
  const classifier = children[classifierIndex];
  const head = children[headIndex];
  const classifierSurface = flattenSurface(classifier);
  const acceptedClasses = LICENSED_CLASSIFIER_HEAD_RULES[classifierSurface];
  const headClasses = lexicalClassifierClassesForNode(head);
  if (!acceptedClasses) {
    return {
      status: "unverified",
      classifier_surface: classifierSurface,
      head_surface: flattenSurface(head),
      observed_head_classes: headClasses,
      reason: "This classifier does not yet have a reviewed compatibility class in the bounded NP subsystem.",
    };
  }
  const matchedClasses = acceptedClasses.filter((value) => headClasses.includes(value));
  if (matchedClasses.length) {
    return {
      status: "verified_compatible",
      classifier_surface: classifierSurface,
      head_surface: flattenSurface(head),
      matched_head_classes: matchedClasses,
      reason: "Classifier and overt noun head match a reviewed lexical compatibility class.",
    };
  }
  if (!headClasses.length) {
    return {
      status: "unverified",
      classifier_surface: classifierSurface,
      head_surface: flattenSurface(head),
      expected_head_classes: acceptedClasses,
      reason: "The noun is known, but its classifier compatibility class has not yet been recorded.",
    };
  }
  return {
    status: "incompatible",
    classifier_surface: classifierSurface,
    head_surface: flattenSurface(head),
    expected_head_classes: acceptedClasses,
    observed_head_classes: headClasses,
    reason: "The overt noun head does not match the bounded compatibility class recorded for this classifier.",
  };
}

function npLicenseMetadata(type, children = [], trace = {}) {
  if (!COMPOSITIONAL_NP_TYPES.has(type) && !PROVISIONAL_NP_TYPES.has(type)) return null;
  const surface = children.map((child) => flattenSurface(child)).join("");
  const headlessQuantified = type === "QuantifiedClassifierNP"
    && (trace.fragment_subtype === "quantified_classifier_head_ellipsis"
      || trace.np_subtype === "quantified_classifier_head_ellipsis"
      || (Array.isArray(trace.missing_argument_slots) && trace.missing_argument_slots.includes("nominal_head")));
  if (PROVISIONAL_NP_TYPES.has(type) || headlessQuantified || nodeContainsUnknownNominalMaterial({ kind: "construction", children })) {
    return {
      np_license_status: "provisional_np_candidate",
      construction_licensing_allowed: false,
      np_license_reason: PROVISIONAL_NP_TYPES.has(type) || headlessQuantified
        ? "The NP lacks an overt nominal head; no hidden noun is reconstructed."
        : "At least one token is unknown or only pronunciation-backed.",
    };
  }
  if (type === "QuantifiedClassifierNP" || type === "OvertHeadDemonstrativeClassifierNP" || type === "DemonstrativeClassifierNP") {
    const compatibility = classifierHeadCompatibility(children, trace);
    if (compatibility && compatibility.status !== "verified_compatible") {
      return {
        np_license_status: "provisional_np_candidate",
        construction_licensing_allowed: false,
        classifier_head_compatibility_status: compatibility.status,
        classifier_head_compatibility: compatibility,
        np_license_reason: compatibility.reason,
      };
    }
    if (compatibility) trace = { ...trace, classifier_head_compatibility_status: compatibility.status, classifier_head_compatibility: compatibility };
  }
  if (type === "AssociativeNP" && /^啲/u.test(surface)) {
    return {
      np_license_status: "ambiguous_licensed_np",
      construction_licensing_allowed: true,
      np_attachment_ambiguity: ["啲 [A 嘅 N]", "[啲 A] 嘅 N"],
      np_license_reason: "The outer NP span is licensed, but internal 啲/嘅 attachment remains unresolved.",
    };
  }
  const compatibility = (type === "QuantifiedClassifierNP" || type === "OvertHeadDemonstrativeClassifierNP" || type === "DemonstrativeClassifierNP")
    ? classifierHeadCompatibility(children, trace)
    : null;
  return {
    np_license_status: "licensed_np",
    construction_licensing_allowed: true,
    classifier_head_compatibility_status: compatibility ? compatibility.status : undefined,
    classifier_head_compatibility: compatibility || undefined,
    np_license_reason: compatibility
      ? compatibility.reason
      : "All required overt components are sufficiently analyzed under a reusable NP rule.",
  };
}

function nodeNpLicenseStatus(node) {
  if (!node) return "invalid_or_incomplete_np";
  if (node.kind === "construction") {
    const trace = node.trace || {};
    if (trace.np_license_status) return trace.np_license_status;
    if (COMPOSITIONAL_NP_TYPES.has(node.type)) return nodeContainsUnknownNominalMaterial(node) ? "provisional_np_candidate" : "licensed_np";
    return "invalid_or_incomplete_np";
  }
  if (node.kind === "token") {
    if (nodeContainsUnknownNominalMaterial(node)) return "provisional_np_candidate";
    const slots = node.slots || [];
    if (slots.includes("head_noun") || slots.includes("np") || slots.includes("object")) return "licensed_np";
  }
  return "invalid_or_incomplete_np";
}

function nodeCanLicenseEvidenceGatedObject(node) {
  const status = nodeNpLicenseStatus(node);
  return status === "licensed_np" || status === "ambiguous_licensed_np";
}

function contextualReportedSpeechLearnerChildren(nodes) {
  const children = (nodes || []).map((node) => node);
  const surfaceAt = (index) => index >= 0 && index < children.length ? flattenSurface(children[index]) : "";

  for (let i = 0; i < children.length; i += 1) {
    const surface = surfaceAt(i);

    if (surface === "冇" && surfaceAt(i + 1) === "房") {
      children[i] = learnerDisplayOnlyTokenClone(children[i], {
        note: "not have / not own in this housing condition",
      });
      children[i + 1] = parserInactiveTokenClone(children[i + 1], {
        label: "what",
        pos: "noun",
        syntax: "possessed_housing_np residential_property_noun",
        slots: ["head_noun", "np", "object"],
        note: "house / home / residential property",
        reason: "After negated possession 冇 in this housing condition, 房 is the thing not possessed rather than a location adjunct.",
        active_affordance_match: "negated_possession_housing_object",
        trace_detail: {
          learner_gloss_lines: ["house / home / residential property", "The thing not owned or available in this housing condition."],
        },
      });
      continue;
    }

    if (surface === "冇" && surfaceAt(i + 1) === "所" && surfaceAt(i + 2) === "謂") {
      const note = "part of 冇所謂: it does not matter";
      children[i] = learnerDisplayOnlyTokenClone(children[i], { note });
      children[i + 1] = learnerDisplayOnlyTokenClone(children[i + 1], { note });
      children[i + 2] = learnerDisplayOnlyTokenClone(children[i + 2], { note });
      i += 2;
      continue;
    }

    if (surface === "阿" && surfaceAt(i + 1) === "媽") {
      children[i] = contextualLearnerRoleOnlyTokenClone(children[i], {
        label: "func",
        pos: "prefix",
        note: "familiar kinship/name prefix; part of 阿媽",
        reason: "Inside 阿媽, 阿 is a familiar kinship/name prefix rather than the person referent itself.",
        active_affordance_match: "kinship_prefix_part",
        trace_detail: {
          learner_gloss_lines: ["familiar kinship/name prefix", "Part of 阿媽; the person meaning is carried by 媽."],
        },
      });
      children[i + 1] = contextualLearnerRoleOnlyTokenClone(children[i + 1], {
        label: "who",
        pos: "noun",
        note: "mum / mother",
        reason: "Inside 阿媽, 媽 is the kinship noun that identifies the person.",
        active_affordance_match: "kinship_person_head",
        trace_detail: {
          learner_gloss_lines: ["mum / mother", "The person-denoting head of 阿媽."],
        },
      });
      i += 1;
      continue;
    }

    if (surface === "返" && surfaceAt(i + 1) === "工") {
      const note = "part of 返工: go to work / be at work";
      children[i] = learnerDisplayOnlyTokenClone(children[i], { note });
      children[i + 1] = learnerDisplayOnlyTokenClone(children[i + 1], { note });
      i += 1;
      continue;
    }

    if (surface === "收" && surfaceAt(i + 1) === "入") {
      const note = "part of 收入: income";
      children[i] = learnerDisplayOnlyTokenClone(children[i], { note });
      children[i + 1] = parserInactiveTokenClone(children[i + 1], {
        label: "neutral",
        pos: "noun",
        syntax: "lexical_expression_part income_expression",
        slots: [],
        note,
        reason: "Inside the observed word 收入, 入 is not being taught as an independent inward-motion verb.",
        active_affordance_match: "income_expression_part",
        trace_detail: {
          learner_gloss_lines: ["part of 收入: income", "Not an independent inward-movement word in this expression."],
        },
      });
      i += 1;
      continue;
    }

    if (surface === "超" && traceKind(children[i]) === "unknown_atomic") {
      children[i] = learnerDisplayOnlyTokenClone(children[i], {
        note: "exceed / go over a limit",
      });
      continue;
    }

    if (surface === "住" && traceKind(children[i]) === "unknown_atomic" && surfaceAt(i - 1) === "房") {
      children[i] = learnerDisplayOnlyTokenClone(children[i], {
        note: "likely live / stay here; exact grammatical use still needs review",
      });
    }
  }

  return children;
}

function contextualOpinionPlaceholderChildren(nodes) {
  return (nodes || []).map((node) => {
    if (!node || node.kind !== "token") return node;
    const surface = String(node.surface || "");
    if (traceKind(node) === "unknown_atomic" && /^[A-Z]$/.test(surface)) {
      return learnerDisplayOnlyTokenClone(node, {
        note: "placeholder for an unspecified word or phrase",
      });
    }
    return node;
  });
}

function phase4CognitionActiveTokenClone(node, overrides = {}) {
  if (!node || node.kind !== "token") return node;
  const surface = node.surface;
  const label = normalizeLearnerLabel(overrides.label || node.label || "doing", surface, overrides.syntax || node.syntax || "cognition_predicate");
  const baseSyntax = overrides.syntax || node.syntax || "cognition_predicate";
  const syntax = baseSyntax.includes("phase4_cognition_promotion")
    ? baseSyntax
    : `${baseSyntax} phase4_cognition_promotion`;
  const slots = cleanSlots(mergeUnique([
    ...(overrides.slots || []),
    "cognition_predicate",
    "predicate",
  ]));
  const entry = { ...(TOKEN_LEXICON[surface] || {}), label, syntax };
  const features = inferTokenFeatures(surface, entry, { label, syntax });
  const featureBundle = featureBundleFor(surface, entry, features, slots);
  return {
    ...node,
    label,
    role: label,
    syntax,
    slots,
    features,
    feature_bundle: featureBundle,
    trace: traceInfo("phase4_controlled_grammar_promotion", {
      surface,
      original_trace: traceKind(node),
      promotion: "controlled_cognition_predicate",
      reason: overrides.reason || "Phase 4 controlled grammar promotion: cognition predicate is parser-active only inside approved cognition constructions.",
      feature_bundle: featureBundle,
    }),
  };
}

function phase4DesiderativeActiveTokenClone(node, overrides = {}) {
  if (!node || node.kind !== "token") return node;
  const surface = node.surface;
  const label = normalizeLearnerLabel(overrides.label || node.label || "func", surface, overrides.syntax || node.syntax || "modal_desiderative");
  const baseSyntax = overrides.syntax || node.syntax || "modal_desiderative";
  const syntax = baseSyntax.includes("phase4_desiderative_promotion")
    ? baseSyntax
    : `${baseSyntax} phase4_desiderative_promotion`;
  const slots = cleanSlots(mergeUnique([
    ...(overrides.slots || []),
    "desiderative_modal",
    "modal",
  ]));
  const entry = { ...(TOKEN_LEXICON[surface] || {}), label, syntax };
  const features = inferTokenFeatures(surface, entry, { label, syntax });
  const featureBundle = featureBundleFor(surface, entry, features, slots);
  return {
    ...node,
    label,
    role: label,
    syntax,
    slots,
    features,
    feature_bundle: featureBundle,
    trace: traceInfo("phase4_controlled_grammar_promotion", {
      surface,
      original_trace: traceKind(node),
      promotion: "controlled_desiderative_a_not_a_modal",
      reason: overrides.reason || "Phase 4 controlled grammar promotion: desiderative modal is parser-active only inside approved 想唔想 + VP A-not-A questions.",
      feature_bundle: featureBundle,
    }),
  };
}

function phase4PermissionActiveTokenClone(node, overrides = {}) {
  if (!node || node.kind !== "token") return node;
  const surface = node.surface;
  const label = normalizeLearnerLabel(overrides.label || node.label || "func", surface, overrides.syntax || node.syntax || "modal_permission_or_ability");
  const baseSyntax = overrides.syntax || node.syntax || "modal_permission_or_ability";
  const syntax = baseSyntax.includes("phase4_permission_promotion")
    ? baseSyntax
    : `${baseSyntax} phase4_permission_promotion`;
  const slots = cleanSlots(mergeUnique([
    ...(overrides.slots || []),
    "permission_modal",
    "modal",
  ]));
  const entry = { ...(TOKEN_LEXICON[surface] || {}), label, syntax };
  const features = inferTokenFeatures(surface, entry, { label, syntax });
  const featureBundle = featureBundleFor(surface, entry, features, slots);
  return {
    ...node,
    label,
    role: label,
    syntax,
    slots,
    features,
    feature_bundle: featureBundle,
    trace: traceInfo("phase4_controlled_grammar_promotion", {
      surface,
      original_trace: traceKind(node),
      promotion: "controlled_permission_a_not_a_modal",
      reason: overrides.reason || "Phase 4 controlled grammar promotion: permission modal A-not-A is parser-active only inside approved 可唔可以 + VP questions.",
      feature_bundle: featureBundle,
    }),
  };
}

function productiveVoComponentTokens(surface) {
  const rule = PRODUCTIVE_VO[surface];
  if (!rule) return null;
  if (surface === "煮嘢食") {
    return [
      token("煮", { label: "doing", syntax: "verb" }),
      token("嘢食", { label: "what", jyutping: "je5 sik6", syntax: "food_noun object", note: "food / things to eat; phrase-local object token avoids changing general 嘢 + 食 analysis." }),
    ];
  }
  if (surface === "下棋") {
    return [
      token("下", { label: "doing", jyutping: "haa5", syntax: "verb", note: "play / make a move in a board game; phrase-specific reading in 下棋." }),
      token("棋", { label: "what", syntax: "object" }),
    ];
  }
  return [
    token(rule.verb, { label: "doing", syntax: "verb" }),
    token(rule.object, { label: "what", syntax: "object" }),
  ];
}

function transparentPhraseFromRest(rest) {
  if (rest.startsWith("嗰間新開嘅意大利餐廳")) {
    return phraseMatch("嗰間新開嘅意大利餐廳".length, construction("ModifiedNP", "NP", [
      construction("HeadlessDemonstrativeClassifierNP", "DemCL", [
        token("嗰", { label: "what", syntax: "demonstrative_determiner", note: "that" }),
        token("間", { label: "measure_word", syntax: "classifier_building_shop" }),
      ], { note: "Demonstrative + classifier: 嗰 + 間." }),
      token("新", { label: "like", syntax: "modifier", note: "Modifier material inside the typed nominal analysis; the retired ModifierPhrase wrapper is not emitted." }),
      token("開", { label: "doing", syntax: "verb_in_modifier", note: "Verb-like modifier material remains visible inside the typed nominal analysis." }),
      token("嘅", { label: "particle", syntax: "nominal_linker", note: "Nominal linker remains visible inside the typed nominal analysis." }),
      construction("NominalHeadSpan", "head", [
        token("意大利", { label: "what", syntax: "noun_modifier_or_place_name" }),
        token("餐廳", { label: "what", syntax: "restaurant_head_noun" }),
      ], { note: "Head noun phrase: Italian restaurant." }),
    ], { primary: "object", note: "Modified noun phrase. Parent span groups the NP; child tokens preserve internal structure.", trace: traceInfo("surface_specific_phrase_rule", { surface: "嗰間新開嘅意大利餐廳", reason: "Temporary transparent phrase rule; should become category/template based if it recurs." }) }));
  }

  if (rest.startsWith("呢間餐廳") || rest.startsWith("嗰間餐廳")) {
    const surface = rest.startsWith("呢間餐廳") ? "呢間餐廳" : "嗰間餐廳";
    const dem = surface.startsWith("呢") ? ["呢", "ni1", "this"] : ["嗰", "go2", "that"];
    return phraseMatch(surface.length, construction("OvertHeadDemonstrativeClassifierNP", "NP", [
      token(dem[0], { label: "what", jyutping: dem[1], syntax: "demonstrative_determiner", note: dem[2] }),
      token("間", { label: "measure_word", syntax: "classifier_building_shop" }),
      token("餐廳", { label: "what", syntax: "restaurant_head_noun" }),
    ], { primary: "object", note: "Demonstrative classifier noun phrase; internal determiner/classifier/head stay visible.", trace: traceInfo("surface_specific_phrase_rule", { surface, reason: "Transparent Dem+CL+N phrase rule." }) }));
  }

  if (rest.startsWith("邊間呀")) {
    return phraseMatch("邊間呀".length, construction("WhClassifierQuestion", "WhCL", [
      token("邊", { label: "what", syntax: "wh_determiner", note: "which" }),
      token("間", { label: "measure_word", syntax: "classifier_building_shop" }),
      token("呀", { label: "particle", syntax: "sentence_final_particle" }),
    ], { note: "Which-one fragment: 邊 + classifier + particle.", trace: traceInfo("surface_specific_phrase_rule", { surface: "邊間呀", reason: "Transparent wh-classifier fragment rule." }) }));
  }

  if (rest.startsWith("特別菜式")) {
    return phraseMatch("特別菜式".length, construction("ModifiedNP", "NP", [
      token("特別", { label: "like", syntax: "modifier" }),
      token("菜式", { label: "what", syntax: "food_head_noun" }),
    ], { primary: "object", note: "Modified noun phrase with modifier + head noun; food is lexical content, not the construction label.", trace: traceInfo("surface_specific_phrase_rule", { surface: "特別菜式", reason: "Transparent modifier + food noun phrase rule." }) }));
  }

  if (rest.startsWith("其他同事")) {
    return phraseMatch("其他同事".length, construction("ModifiedNP", "NP", [
      token("其他", { label: "func", pos: "determiner", syntax: "nominal_modifier determiner_like_modifier modifier", slots: ["modifier"], note: "other; modifier of the following person noun" }),
      token("同事", { label: "who", syntax: "person_head_noun" }),
    ], { primary: "subject", note: "Modified noun phrase with modifier + head noun; person/reference is lexical content, not the construction label.", trace: traceInfo("surface_specific_phrase_rule", { surface: "其他同事", reason: "Transparent modifier + person noun phrase rule." }) }));
  }

  if (rest.startsWith("下個星期五")) {
    return phraseMatch("下個星期五".length, construction("TimeNP", "Time", [
      token("下", { label: "when", syntax: "temporal_modifier_next" }),
      token("個", { label: "measure_word", syntax: "general_classifier" }),
      token("星期五", { label: "when", syntax: "weekday_np" }),
    ], { note: "Time noun phrase: next Friday.", trace: traceInfo("surface_specific_phrase_rule", { surface: "下個星期五", reason: "Transparent time NP rule." }) }));
  }

  return null;
}

function phase4OpinionStanceActiveTokenClone(node, overrides = {}) {
  if (!node || node.kind !== "token") return node;
  const surface = node.surface;
  const label = normalizeLearnerLabel(overrides.label || node.label || "doing", surface, overrides.syntax || node.syntax || "cognition_opinion_predicate");
  const baseSyntax = overrides.syntax || node.syntax || "cognition_opinion_predicate";
  const syntax = baseSyntax.includes("phase4_opinion_stance_promotion")
    ? baseSyntax
    : `${baseSyntax} phase4_opinion_stance_promotion`;
  const slots = cleanSlots(mergeUnique([
    ...(overrides.slots || []),
    "opinion_stance_frame",
    "stance_predicate",
    "cognition_predicate",
    "predicate",
  ]));
  const entry = { ...(TOKEN_LEXICON[surface] || {}), label, syntax };
  const features = inferTokenFeatures(surface, entry, { label, syntax });
  const featureBundle = featureBundleFor(surface, entry, features, slots);
  return {
    ...node,
    label,
    role: label,
    syntax,
    slots,
    features,
    feature_bundle: featureBundle,
    trace: traceInfo("phase4_controlled_grammar_promotion", {
      surface,
      original_trace: traceKind(node),
      promotion: "controlled_opinion_stance_predicate",
      reason: overrides.reason || "Phase 4 controlled grammar promotion: opinion stance predicate is parser-active only inside approved 覺得 + visible content frames.",
      feature_bundle: featureBundle,
    }),
  };
}

function phase4ReportedSpeechActiveTokenClone(node, overrides = {}) {
  if (!node || node.kind !== "token") return node;
  const surface = node.surface;
  const label = normalizeLearnerLabel(overrides.label || node.label || "doing", surface, overrides.syntax || node.syntax || "speech_reporting_verb");
  const baseSyntax = overrides.syntax || node.syntax || "speech_reporting_verb";
  const syntax = baseSyntax.includes("phase4_reported_speech_promotion")
    ? baseSyntax
    : `${baseSyntax} phase4_reported_speech_promotion`;
  const slots = cleanSlots(mergeUnique([
    ...(overrides.slots || []),
    "reported_speech",
    "speech_verb",
    "reportative_source",
    "predicate",
  ]));
  const entry = { ...(TOKEN_LEXICON[surface] || {}), label, syntax };
  const features = inferTokenFeatures(surface, entry, { label, syntax });
  const featureBundle = featureBundleFor(surface, entry, features, slots);
  return {
    ...node,
    label,
    role: label,
    syntax,
    slots,
    features,
    feature_bundle: featureBundle,
    trace: traceInfo("phase4_controlled_grammar_promotion", {
      surface,
      original_trace: traceKind(node),
      promotion: "controlled_reported_speech_predicate",
      reason: overrides.reason || "Phase 4 controlled grammar promotion: 話 is parser-active only inside approved ReportedSpeech frames with visible reviewed content.",
      feature_bundle: featureBundle,
    }),
  };
}

const DIRECTIONAL_MOTION_PATTERNS = [
  {
    surfaces: ["返", "上", "嚟"],
    type: "CompoundDirectionalMotionVP",
    label: "MotionVP",
    note: "Compound directional motion VP: 返 + 上 + 嚟 = come back up.",
    pattern: "return + upward_direction + deictic_come",
  },
  {
    surfaces: ["返", "上", "去"],
    type: "CompoundDirectionalMotionVP",
    label: "MotionVP",
    note: "Compound directional motion VP: 返 + 上 + 去 = go back up.",
    pattern: "return + upward_direction + deictic_go",
  },
  {
    surfaces: ["落", "嚟"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Directional motion VP: 落 + 嚟 = come down.",
    pattern: "down_direction + deictic_come",
  },
  {
    surfaces: ["返", "嚟"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Directional motion VP: 返 + 嚟 = come back.",
    pattern: "return + deictic_come",
  },
  {
    surfaces: ["返", "去"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Directional motion VP: 返 + 去 = go back / return there.",
    pattern: "return + deictic_go",
  },
  {
    surfaces: ["上", "嚟"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Directional motion VP: 上 + 嚟 = come up.",
    pattern: "upward_direction + deictic_come",
  },
  {
    surfaces: ["嚟"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Motion VP fragment: 嚟 = come.",
    pattern: "deictic_come",
  },
  {
    surfaces: ["去"],
    type: "DirectionalMotionVP",
    label: "MotionVP",
    note: "Motion VP fragment: 去 = go.",
    pattern: "deictic_go",
  },
];

function directionalMotionPartClone(node, role) {
  const surface = flattenSurface(node);
  const syntaxBySurface = {
    "返": "return_motion_component",
    "落": "movement_direction_down",
    "上": "movement_direction_up",
    "嚟": "deictic_motion_marker",
    "去": "deictic_motion_marker",
  };
  const slotBySurface = {
    "返": "movement_verb",
    "落": "movement_direction",
    "上": "movement_direction",
    "嚟": "deictic_motion_marker",
    "去": "deictic_motion_marker",
  };
  return parserInactiveTokenClone(firstToken(node) || token(surface), {
    label: role || "doing",
    pos: role === "func" ? "function" : "verb",
    syntax: syntaxBySurface[surface] || "directional_motion_part",
    slots: [slotBySurface[surface] || "directional_motion_part"],
    reason: "Token is parser-inactive inside a directional-motion VP candidate; the parent exposes the VP affordance.",
  });
}

function makeDirectionalMotionVP(nodes, pattern) {
  const children = nodes.map((node) => directionalMotionPartClone(node, "doing"));
  return construction(pattern.type, pattern.label, children, {
    slots: ["directional_motion_vp", "vp", "action_vp", "predicate", "movement_verb", "motion_predicate"],
    note: pattern.note,
    trace: traceInfo("generative_or_heuristic_slot_rule", {
      rule: "Cantonese directional motion compound",
      pattern: pattern.pattern,
      surfaces: pattern.surfaces,
      reason: "Native directional motion forms such as 落嚟 / 返嚟 / 上嚟 / 返上嚟 should surface as transparent VP candidates without making child feature bundles parser-active.",
    }),
  });
}

function directionalMotionTemplateFor(nodes, pattern) {
  const templated = categorySubspanFor(nodes, [pattern.type]);
  if (templated) return templated;
  return makeDirectionalMotionVP(nodes, pattern);
}

function negatedDirectionalMotionTemplateFor(negatorNode, vp) {
  const templated = categorySubspanFor([negatorNode, vp], ["NegatedDirectionalMotionVP"]);
  if (templated) return templated;
  return null;
}

function directionalPatternAt(nodes, index) {
  for (const pattern of DIRECTIONAL_MOTION_PATTERNS) {
    if (index + pattern.surfaces.length > nodes.length) continue;
    const window = nodes.slice(index, index + pattern.surfaces.length);
    if (window.some((node) => node && node.kind === "text")) continue;
    const surfaces = window.map((node) => flattenSurface(node));
    if (surfaces.every((surface, i) => surface === pattern.surfaces[i])) {
      return { pattern, length: pattern.surfaces.length };
    }
  }
  return null;
}

function wrapDirectionalMotionSubspans(nodes) {
  const result = [];
  let i = 0;
  while (i < nodes.length) {
    if (isToken(nodes[i], "唔")) {
      const negated = directionalPatternAt(nodes, i + 1);
      if (negated) {
        const vp = directionalMotionTemplateFor(nodes.slice(i + 1, i + 1 + negated.length), negated.pattern);
        const templatedNegatedVp = negatedDirectionalMotionTemplateFor(nodes[i], vp);
        result.push(templatedNegatedVp || construction("NegatedDirectionalMotionVP", "NegMotionVP", [parserInactiveTokenClone(nodes[i], {
          label: "func",
          pos: "function",
          syntax: "negator",
          slots: ["negator"],
          reason: "Negator is parser-inactive inside a negated directional-motion VP wrapper.",
        }), vp], {
          slots: ["negated_directional_motion_vp", "directional_motion_vp", "vp", "action_vp", "predicate", "movement_verb", "motion_predicate", "negator"],
          note: "Negated directional motion VP: 唔 + directional motion, e.g. 唔落嚟.",
          trace: traceInfo("generative_or_heuristic_slot_rule", {
            rule: "negator + Cantonese directional motion compound",
            pattern: negated.pattern.pattern,
            reason: "Native refusal/negative motion forms such as 唔落嚟 should expose one negated motion VP while child tokens stay parser-inactive.",
          }),
        }));
        i += 1 + negated.length;
        continue;
      }
    }

    const match = directionalPatternAt(nodes, i);
    if (match) {
      result.push(directionalMotionTemplateFor(nodes.slice(i, i + match.length), match.pattern));
      i += match.length;
      continue;
    }

    result.push(nodes[i]);
    i += 1;
  }
  return result;
}




const SERIAL_PURPOSE_ACTION_VO_SURFACES = new Set(["摘芒果", "買嘢", "食飯"]);
const SERIAL_PURPOSE_ACTIONS_THAT_TAKE_EATING_PURPOSE = new Set(["摘芒果", "買嘢"]);

function isSerialPurposeActionVo(node) {
  return node && node.kind === "construction" && node.type === "ProductiveVO" && SERIAL_PURPOSE_ACTION_VO_SURFACES.has(flattenSurface(node));
}

function actionVoCanTakeEatingPurpose(node) {
  return node && SERIAL_PURPOSE_ACTIONS_THAT_TAKE_EATING_PURPOSE.has(flattenSurface(node));
}

function isEatingPurposeVerb(node) {
  return isToken(node, "食");
}

function isMotionPurposeCandidate(node) {
  if (!node || node.kind === "text") return false;
  const slots = nodeSlots(node);
  return slots.includes("directional_motion_vp") || slots.includes("negated_directional_motion_vp") || slots.includes("motion_predicate");
}

function serialPurposeVerbClone(node) {
  return parserInactiveTokenClone(firstToken(node) || token(flattenSurface(node)), {
    label: "doing",
    pos: "verb",
    syntax: "purpose_verb",
    slots: ["purpose_verb", "action_verb", "predicate"],
    reason: "食 is interpreted here as a purpose verb after a reviewed action/object VP, so it stays parser-inactive while the parent exposes the serial-purpose chain.",
  });
}

function serialPurposeParticleClone(node) {
  return parserInactiveTokenClone(firstToken(node) || token(flattenSurface(node)), {
    label: "particle",
    pos: "particle",
    syntax: "sentence_final_particle",
    slots: ["particle"],
    reason: "Final particle stays parser-inactive inside a motion/serial purpose-chain wrapper.",
  });
}

function serialChainKindForMatch(match) {
  return match && match.motion && !match.purpose ? "MotionPurposeChain" : "SerialVerbPurposeChain";
}

function serialChainLabelForKind(kind) {
  return kind === "MotionPurposeChain" ? "MotionPurpose" : "PurposeChain";
}

function serialChainSlotsForKind(kind) {
  return kind === "MotionPurposeChain"
    ? ["motion_purpose_chain", "motion_action_chain", "purpose_chain", "vp", "action_vp", "predicate"]
    : ["serial_verb_purpose_chain", "serial_action_chain", "purpose_chain", "vp", "action_vp", "predicate"];
}

function makeSerialVerbPurposeChain(match) {
  const children = [];
  if (match.motion) children.push(match.motion);
  children.push(match.action);
  if (match.purpose) children.push(serialPurposeVerbClone(match.purpose));
  if (match.particle) children.push(serialPurposeParticleClone(match.particle));
  const kind = serialChainKindForMatch(match);
  const isMotionOnly = kind === "MotionPurposeChain";
  return construction(kind, serialChainLabelForKind(kind), children, {
    slots: serialChainSlotsForKind(kind),
    note: isMotionOnly
      ? "Motion-purpose chain: directional motion plus a reviewed action VP, such as 返嚟食飯 or 落嚟摘芒果."
      : "Serial verb / purpose chain: reviewed action sequence with an explicit purpose 食, such as 摘芒果食, 落嚟摘芒果食, or 買嘢食.",
    trace: traceInfo("generative_template", {
      template_family: "generative_template",
      construction_type: kind,
      template: match.motion
        ? (match.purpose ? ["directional_motion_vp!", "productive_vo!", "purpose_verb!", "particle?"] : ["directional_motion_vp!", "productive_vo!", "particle?"])
        : ["productive_vo!", "purpose_verb!", "particle?"],
      assigned_slots: [
        ...(match.motion ? ["directional_motion_vp"] : []),
        "productive_vo",
        ...(match.purpose ? ["purpose_verb"] : []),
        ...(match.particle ? ["particle"] : []),
      ],
      rule: isMotionOnly
        ? "directional_motion_vp + productive_vo + optional final particle"
        : "directional_motion? + productive_vo + purpose_verb + optional final particle",
      pattern: match.motion
        ? (match.purpose ? "directional_motion_vp + productive_vo + purpose_verb" : "directional_motion_vp + productive_vo")
        : "productive_vo + purpose_verb",
      reason: isMotionOnly
        ? "Native speech can use motion plus an action VP as a purpose/action chain. This now uses the generative template transition lane while keeping the learner display precise."
        : "Native speech often chains an action/object VP with an explicit purpose verb. Keep the ProductiveVO transparent and keep the purpose verb parser-inactive inside the parent purpose-chain wrapper.",
      surfaces: children.map((node) => flattenSurface(node)),
    }),
  });
}

function serialVerbPurposeChainWithTrailingParticle(node, particleNode) {
  if (!node || node.kind !== "construction" || !["SerialVerbPurposeChain", "MotionPurposeChain"].includes(node.type) || !particleNode) return node;
  if ((node.children || []).some((child) => isParticle(child))) return node;
  return {
    ...node,
    children: [...(node.children || []), serialPurposeParticleClone(particleNode)],
    trace: {
      ...(node.trace || {}),
      attached_trailing_particle: flattenSurface(particleNode),
    },
  };
}

function serialPurposeParticleAt(nodes, index) {
  return isParticle(nodes[index]) && ["呀", "啊", "啦", "喇"].includes(flattenSurface(nodes[index])) ? nodes[index] : null;
}

function serialVerbPurposePatternAt(nodes, index) {
  let motion = null;
  let i = index;

  if (isMotionPurposeCandidate(nodes[i]) && isSerialPurposeActionVo(nodes[i + 1])) {
    motion = nodes[i];
    i += 1;
  }

  if (!isSerialPurposeActionVo(nodes[i])) return null;

  let purpose = null;
  let particleIndex = i + 1;
  if (actionVoCanTakeEatingPurpose(nodes[i]) && isEatingPurposeVerb(nodes[i + 1])) {
    purpose = nodes[i + 1];
    particleIndex = i + 2;
  }

  if (!motion && !purpose) return null;

  const particle = serialPurposeParticleAt(nodes, particleIndex);
  return {
    length: (motion ? 1 : 0) + 1 + (purpose ? 1 : 0) + (particle ? 1 : 0),
    motion,
    action: nodes[i],
    purpose,
    particle,
  };
}

function serialPurposeTemplateSubspanAt(nodes, index) {
  const allowedTypes = ["SerialVerbPurposeChain", "MotionPurposeChain"];
  const remaining = nodes.length - index;
  for (let length = Math.min(4, remaining); length >= 2; length -= 1) {
    const window = nodes.slice(index, index + length);
    if (window.some((node) => node.kind === "text")) continue;
    const candidate = categorySubspanFor(window, allowedTypes);
    if (candidate) return { node: candidate, length };
  }
  return null;
}

function wrapSerialPurposeTemplateSubspans(nodes) {
  const result = [];
  let i = 0;
  while (i < nodes.length) {
    const match = serialPurposeTemplateSubspanAt(nodes, i);
    if (match) {
      result.push(match.node);
      i += match.length;
      continue;
    }
    result.push(nodes[i]);
    i += 1;
  }
  return result;
}

function wrapSerialVerbPurposeSubspans(nodes) {
  const result = [];
  let i = 0;
  while (i < nodes.length) {
    const match = serialVerbPurposePatternAt(nodes, i);
    if (match) {
      result.push(makeSerialVerbPurposeChain(match));
      i += match.length;
      continue;
    }
    result.push(nodes[i]);
    i += 1;
  }
  return result;
}


function agreementResponsePartClone(node, overrides = {}) {
  return parserInactiveTokenClone(node, {
    label: overrides.label || (isParticle(node) ? "particle" : "func"),
    pos: overrides.pos || (isParticle(node) ? "particle" : "function"),
    syntax: overrides.syntax || (isParticle(node) ? "sentence_final_particle" : "agreement_confirmation_marker"),
    slots: overrides.slots || (isParticle(node) ? ["particle"] : ["agreement_marker", "confirmation_marker"]),
    reason: overrides.reason || "Token is parser-inactive inside an agreement/confirmation response formula; the parent exposes the discourse-response function.",
  });
}

const AGREEMENT_RESPONSE_PARTICLES = new Set(["呀", "啊", "喇"]);

function makeAgreementResponseFormula(markerNode, particleNode) {
  const particleSurface = flattenSurface(particleNode);
  const children = [
    agreementResponsePartClone(markerNode, {
      label: "func",
      pos: "function",
      syntax: "agreement_confirmation_marker",
      slots: ["agreement_marker", "confirmation_marker"],
      reason: "係 is interpreted here only as an agreement/confirmation response marker, not as a broad copula-clause rule.",
    }),
    agreementResponsePartClone(particleNode, {
      label: "particle",
      pos: "particle",
      syntax: "sentence_final_particle acknowledgement_particle",
      slots: ["particle"],
      reason: `${particleSurface} stays parser-inactive inside the agreement/confirmation response formula.`,
    }),
  ];
  return construction("FormulaDiscourseUnit", "Formula", children, {
    slots: ["formula_discourse_unit", "formula", "discourse_response", "agreement_response", "confirmation_response"],
    note: "Agreement/confirmation response formula: 係 + an approved acknowledgement particle. The wrapper does not introduce a general copula-clause rule.",
    trace: traceInfo("generative_template", {
      construction_type: "FormulaDiscourseUnit",
      retired_label_alias: "AgreementResponseFormula",
      template: ["agreement_marker!", "particle!"],
      assigned_slots: ["agreement_marker", "particle"],
      rule: "agreement marker 係 + approved acknowledgement particle 呀/啊/喇",
      pattern: "agreement_marker + acknowledgement_particle",
      reason: "Short 係 + particle responses function as agreement/acknowledgement formulae. Keep both children visible and avoid broadening 係 into a general copula parser here.",
      surfaces: children.map((node) => flattenSurface(node)),
    }),
  });
}

function agreementResponsePatternAt(nodes, index) {
  if (!isToken(nodes[index], "係")) return null;
  if (!isParticle(nodes[index + 1])) return null;
  const particleSurface = flattenSurface(nodes[index + 1]);
  if (!AGREEMENT_RESPONSE_PARTICLES.has(particleSurface)) return null;
  return { length: 2, marker: nodes[index], particle: nodes[index + 1] };
}

function wrapAgreementResponseSubspans(nodes) {
  const result = [];
  let i = 0;
  while (i < nodes.length) {
    const match = agreementResponsePatternAt(nodes, i);
    if (match) {
      result.push(makeAgreementResponseFormula(match.marker, match.particle));
      i += match.length;
      continue;
    }
    result.push(nodes[i]);
    i += 1;
  }
  return result;
}








const createPriorityDetectors = require("./parser/detectors/discourse/priority");
const {
  priorityMarkerClauseWithTrailingParticle,
  sourceLinkedPriorityMarkerClauseFallback,
  wrapPriorityMarkerSubspans,
} = createPriorityDetectors({
  categorySubspanFor, cleanSlots, construction, flattenSurface, isParticle, isToken,
  isVerbLike, nodeCanFillSlot, nodeSlots, parserInactiveTokenClone, traceInfo,
  withoutIgnorableSpaceText, withoutTrailingParticles,
});

























const createBasicPredicateDetectors = require("./parser/detectors/predicates/basic");
const {
  scalarEvaluationFallback,
  wrapNegatedVPSubspans,
  wrapPredicate,
} = createBasicPredicateDetectors({
  categorySubspanFor, construction, flattenSurface, hasSurface, isStativeToken, isToken,
  nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots, traceInfo,
});

const createAcceptabilityDetectors = require("./parser/detectors/acceptability/clauses");
const { wrapPermissionAcceptabilitySubspans } = createAcceptabilityDetectors({
  cleanSlots, construction, firstToken, flattenSurface, isParticle, isToken, nodeSlots,
  parserInactiveTokenClone, templateDerivedSlots, token, traceInfo,
});

const createMannerAdjustmentDetectors = require("./parser/detectors/manner/adjustment");
const {
  mannerAdverbialVPFallback,
  sourceLinkedDegreeMannerModifiedVPFallback,
} = createMannerAdjustmentDetectors({
  applyConstructionPatterns, categorySubspanFor, cleanSlots, construction, flattenSurface,
  isToken, nodeCanFillSlot, nodeSurfaceMatches, parserInactiveTokenClone,
  templateDerivedSlots, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles,
});

const createImperativeDetectors = require("./parser/detectors/imperatives/clauses");
const {
  politePathImperativeFallback,
  politeRequestAdjustmentFallback,
  prohibitiveImperativeFallback,
} = createImperativeDetectors({
  categorySubspanFor, construction, directPredicateCapableNode, flattenSurface, isToken,
  mergeUnique, nodeCanFillSlot, parserInactiveTokenClone, pathPhraseFromParts,
  templateDerivedSlots, traceInfo, transparentDiscourseFormulaFallback,
  withoutIgnorableSpaceText, withoutTrailingParticles,
});

function isPlaceLike(node) {
  const t = firstToken(node);
  return Boolean(t && (t.label === "where" || t.syntax.includes("place")));
}

function isWhNode(node) {
  const t = firstToken(node);
  return Boolean(t && (t.syntax.includes("wh_") || t.surface === "點樣" || t.surface === "幾錢"));
}

const NEGATED_LEXICALIZED_STATIVE_SPLITS = [
  { surface: "唔好食", predicate: "好食", verb: "食", meaning_hint: "not tasty" },
  { surface: "唔好飲", predicate: "好飲", verb: "飲", meaning_hint: "not good to drink" },
  { surface: "唔好睇", predicate: "好睇", verb: "睇", meaning_hint: "not good to watch / not good-looking" },
  { surface: "唔好聽", predicate: "好聽", verb: "聽", meaning_hint: "not pleasant to hear" },
  { surface: "唔好味", predicate: "好味", verb: "味", meaning_hint: "not tasty / not delicious" },
];

const PROHIBITIVE_OBJECT_STARTERS = [
  "呢個", "嗰個", "呢啲", "嗰啲", "呢杯", "嗰杯", "呢套", "嗰套", "呢首", "嗰首", "呢件", "嗰件",
  "呢間", "嗰間", "一", "兩", "三", "杯", "套", "首", "件", "飯", "嘢", "水", "茶", "書", "歌", "戲", "湯", "意粉", "蘋果", "餐廳"
];

const createNpTokenSplits = require("./parser/detectors/np/token-splits");
const {
  quantifiedPersonNPFromFusedNode,
  transparentCupNounDemonstrativeNpFromRest,
  transparentDeicticClassifierTopicFromNode,
  transparentDemonstrativeClassifierSplitFromRest,
  transparentEllipticalDemonstrativeClassifierFromRest,
  transparentNominalDiDeterminerFromRest,
  transparentOneCountClassifierSplitFromRest,
  transparentQuantifiedPersonNpFromRest,
} = createNpTokenSplits({
  PUNCT_RE,
  cleanSlots,
  construction,
  flattenSurface,
  nodeCanFillSlot,
  phraseMatch,
  selectLexiconTerm,
  token,
  traceInfo,
});


















const createContextualLexiconOverrides = require("./parser/tokenization/contextual-overrides");
const createVocativeAddressDetector = require("./parser/detectors/address/vocative");

const {
  contextualLexiconOverrides,
  pushNegatedLexicalizedStativeSplit,
  pushSpecialNotGoodEat,
} = createContextualLexiconOverrides({
  PROHIBITIVE_OBJECT_STARTERS,
  TOKEN_LEXICON,
  generateTokenSlots,
  inferTokenFeatures,
  isTopicCandidate,
  normalizeSurface,
  selectLexiconTerm,
  selectionDecisionForSurface,
  token,
  traceInfo,
});

const { candidateNamedAddressFormFromRest } = createVocativeAddressDetector({
  ADDRESS_FOLLOWERS,
  ADDRESS_PREFIXES,
  ADDRESS_SUFFIXES,
  COMMON_SURNAME_CHARS,
  PROTECTED_ADDRESS_TERMS,
  PUNCT_RE,
  categorySubspanFor,
  construction,
  parserInactiveTokenClone,
  phraseMatch,
  token,
  traceInfo,
});

const { tokenizeLine } = require("./parser/tokenization/tokenize-line")({
  FORMULAS,
  NEGATED_LEXICALIZED_STATIVE_SPLITS,
  PRODUCTIVE_TERMS,
  candidateNamedAddressFormFromRest,
  construction,
  contextualLexiconOverrides,
  productiveVoComponentTokens,
  protectedConditionalMarkerToken,
  pushNegatedLexicalizedStativeSplit,
  pushSpecialNotGoodEat,
  selectLexiconTerm,
  textNode,
  token,
  traceInfo,
  transparentCupNounDemonstrativeNpFromRest,
  transparentDemonstrativeClassifierSplitFromRest,
  transparentEllipticalDemonstrativeClassifierFromRest,
  transparentNominalDiDeterminerFromRest,
  transparentOneCountClassifierSplitFromRest,
  transparentQuantifiedPersonNpFromRest,
});

function withoutTrailingParticles(nodes) {
  let end = nodes.length;
  while (end > 0 && isParticle(nodes[end - 1])) end--;
  return { core: nodes.slice(0, end), particles: nodes.slice(end) };
}

function applyConstructionPatterns(nodes) {
  if (!nodes.length) return nodes;
  const { core, particles } = withoutTrailingParticles(nodes);

  // Prefer a full generative match that includes sentence-final particles
  // when the construction template licenses particle?.
  if (particles.length) {
    const withParticles = wrapCore([...core, ...particles]);
    if (withParticles.length === 1 && withParticles[0].kind === "construction") return withParticles;
  }

  const wrapped = wrapCore(core);
  if (particles.length && wrapped.length) {
    const last = wrapped[wrapped.length - 1];
    if (last && last.kind === "construction" && last.type === "PriorityMarkerClause") {
      return [
        ...wrapped.slice(0, -1),
        priorityMarkerClauseWithTrailingParticle(last, particles[0]),
        ...particles.slice(1),
      ];
    }
    if (last && last.kind === "construction" && ["SerialVerbPurposeChain", "MotionPurposeChain"].includes(last.type)) {
      return [
        ...wrapped.slice(0, -1),
        serialVerbPurposeChainWithTrailingParticle(last, particles[0]),
        ...particles.slice(1),
      ];
    }
  }
  return [...wrapped, ...particles];
}

function optionalSubjectOffset(core) {
  if (!core.length) return 0;
  const slots = nodeSlots(core[0]);
  return slots.includes("subject") ? 1 : 0;
}

const createANotAQuestionDetectors = require("./parser/detectors/questions/a-not-a");
const {
  aNotAQuestionFallback,
  acceptabilityANotAQuestionFallback,
  copularANotAQuestionFallback,
  desiderativeANotAQuestionFallback,
  finalMePolarQuestionFallbackForPunctuation,
  inlineANotAQuestionFallback,
  permissionANotAQuestionFallback,
  polarQuestionFrameFallback,
} = createANotAQuestionDetectors({
  assignedSlotWrapperCoverage,
  applyConstructionPatterns,
  cleanSlots,
  construction,
  directPredicateCapableNode,
  firstToken,
  flattenSurface,
  fullSpanSingleConstruction,
  isExplicitWhQuestionConstruction,
  isParticle,
  isProtectedMeReactionFormula,
  isToken,
  isVerbLike,
  nodeCanFillSlot,
  optionalSubjectOffset,
  parserInactiveTokenClone,
  phase4DesiderativeActiveTokenClone,
  phase4PermissionActiveTokenClone,
  possessiveFragmentAnswerCandidate,
  propositionLikeHostForFinalMe,
  surfaceOf,
  templateDerivedSlots,
  token,
  traceInfo,
  withoutIgnorableSpaceText,
  withoutTrailingParticles,
  wrapCategorySubspans,
  yesNoQuestionMarkerClone,
});

const createWhScalarQuestionDetectors = require("./parser/detectors/questions/wh-scalar");
const {
  existentialWhQuestionFallback,
  locativeWhQuestionFallback,
  progressiveWhObjectQuestionFallback,
  scalarDimensionQuestionFallbackForPunctuation,
  scalarValueQuestionFallback,
  suggestionQuestionFallback,
} = createWhScalarQuestionDetectors({
  applyConstructionPatterns, construction, firstToken, flattenSurface, hasSurface,
  isToken, nodeCanFillSlot, surfaceOf, templateDerivedSlots, token, traceInfo,
  withoutIgnorableSpaceText, withoutTrailingParticles,
});

const createCompletionExperientialQuestionDetectors = require("./parser/detectors/questions/completion-experiential");
const {
  completionQuestionFallback,
  completionQuestionWithPerfectiveMarkerFallback,
  experientialQuestionBoundaryFallback,
  experientialYesNoQuestionFallback,
  interestDomainExistentialQuestionFallback,
} = createCompletionExperientialQuestionDetectors({
  construction, flattenSurface, hasConstruction, hasSurface, isParticle,
  isProductiveVo, isToken, nodeCanFillSlot, optionalSubjectOffset, traceInfo,
});

const createQuestionFallbacks = require("./parser/terminal/questions/question-fallbacks");
const { haveOrNotQuestionFallbackForPunctuation } = createQuestionFallbacks({
  applyConstructionPatterns, cleanSlots, construction, flattenNodes, flattenSurface,
  hasConstruction, isParticle, isToken, nodeCanFillSlot, parserInactiveTokenClone,
  templateDerivedSlots, traceInfo,
});

const createCognitionDetectors = require("./parser/detectors/cognition/fragments-content");
const {
  cognitionContentFrameFallback,
  cognitionStatementFallback,
  negativeCognitionFragmentFallback,
} = createCognitionDetectors({
  aNotAQuestionFallback, applyConstructionPatterns, completionQuestionFallback,
  construction, desiderativeANotAQuestionFallback, flattenSurface, isToken,
  nodeCanFillSlot, nodeSurfaceMatches, optionalSubjectOffset,
  permissionANotAQuestionFallback, phase4CognitionActiveTokenClone,
  predicateOmissionProfileForHead, templateConstructionFor, templateDerivedSlots,
  token, traceInfo, withoutTrailingParticles, wrapCategorySubspans,
});

const createModalPredicateDetectors = require("./parser/detectors/modality/modal-predicates");
const {
  coordinatedSubjectModalPredicateClauseFallback,
  modalPredicateWrapCoreFallback,
  modalVPFromNodes,
} = createModalPredicateDetectors({
  categorySubspanFor, construction, coordinatedNPFromParts, firstToken, flattenSurface,
  isModalToken, nodeCanFillSlot, templateConstructionFor, templateDerivedSlots,
  traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles,
});

const createIntentionPreferenceDetectors = require("./parser/detectors/modality/intention-preference");
const {
  desiderativeVPWrapCoreFallback,
  preferenceVPWrapCoreFallback,
  rawPreferenceTemplateFallback,
  sourceLinkedIntentionFrameFallback,
  sourceLinkedPreferenceVPFallback,
} = createIntentionPreferenceDetectors({
  categorySubspanFor, construction, flattenSurface, hasSurface, isToken,
  nodeCanFillSlot, templateConstructionFor, templateDerivedSlots, traceInfo,
  withoutIgnorableSpaceText, withoutTrailingParticles,
});

const createOpinionDetectors = require("./parser/detectors/opinion/stance");
const { opinionStanceFrameFallback } = createOpinionDetectors({
  applyConstructionPatterns, categorySubspanFor, cleanSlots, construction, copulaClone,
  firstToken, flattenSurface, isToken, modalVPFromNodes, nodeCanFillSlot, nodeSlots,
  nominalComplementFromNodes, parserInactiveTokenClone,
  phase4OpinionStanceActiveTokenClone, predicateOmissionProfileForHead,
  subjectStativePredicateClauseFallback, templateConstructionFor,
  templateDerivedSlots, traceInfo, withoutTrailingParticles, wrapCategorySubspans,
});

const createReportedSpeechDetectors = require("./parser/detectors/reported-speech/composition");
const { reportedSpeechFrameFallback } = createReportedSpeechDetectors({
  applyConstructionPatterns, construction, firstToken, flattenSurface, nodeCanFillSlot,
  optionalSubjectOffset, parserInactiveTokenClone, phase4ReportedSpeechActiveTokenClone,
  subjectStativePredicateClauseFallback, templateConstructionFor,
  templateDerivedSlots, traceInfo, withoutTrailingParticles, wrapCategorySubspans,
});



function transparentTopicContentFromNodes(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  if (compact.length === 1) return compact[0];
  return categorySubspanFor(compact, ["OvertHeadDemonstrativeClassifierNP", "QuantifiedClassifierNP", "QuantifiedPersonNP", "OrdinalClassifierNP", "DiMarkedNP", "ModifiedNP", "NominalHeadSpan", "CoordinatedNP"]);
}

function transitionMotionPredicateFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  // Final discourse particles must retain their accepted scoped DiscourseParticleFrame route.
  if (particles.length) return null;
  if (!bareCore.length) return null;
  let cursor = 0;
  const subject = nodeCanFillSlot(bareCore[cursor], "subject") ? bareCore[cursor++] : null;
  if (!isToken(bareCore[cursor], "走")) return null;
  const movementSource = bareCore[cursor++];
  const aspect = cursor < bareCore.length && ["咗", "過", "緊"].includes(flattenSurface(bareCore[cursor])) ? bareCore[cursor++] : null;
  if (cursor !== bareCore.length || !aspect) return null;

  const movement = parserInactiveTokenClone(movementSource, {
    label: "doing",
    pos: "verb",
    syntax: "intransitive_motion_verb transition_motion_predicate",
    slots: ["action_verb", "main_verb", "movement_verb", "predicate"],
    jyutping: "zau2",
    note: "leave / go away",
    reason: "At predicate onset, standalone 走 is an independent transition-motion verb rather than a postverbal directional result complement.",
  });
  const motion = aspect
    ? construction("PerfectiveVP", "PerfectiveVP", [movement, aspect], {
        slots: templateDerivedSlots("PerfectiveVP", [movement, aspect]),
        note: "Perfective transition-motion predicate.",
        trace: traceInfo("generative_template", {
          construction_type: "PerfectiveVP",
          template_family: "generative_template",
          template: ["transition_motion_verb!", "perfective_aspect!"],
          assigned_slots: ["transition_motion_verb", "perfective_aspect"],
          surfaces: ["走", flattenSurface(aspect)],
          contextual_role_resolution: "standalone_motion_predicate_not_result_complement",
          subspan: Boolean(subject),
        }),
      })
    : construction("DirectionalMotionVP", "MotionVP", [movement], {
        slots: templateDerivedSlots("DirectionalMotionVP", [movement]),
        note: "One-word transition motion predicate headed by standalone 走.",
        trace: traceInfo("generative_template", {
          construction_type: "DirectionalMotionVP",
          template_family: "generative_template",
          template: ["transition_motion_verb!"],
          assigned_slots: ["transition_motion_verb"],
          surfaces: ["走"],
          contextual_role_resolution: "standalone_motion_predicate_not_result_complement",
          subspan: Boolean(subject),
        }),
      });
  if (!subject) return motion;
  const children = [subject, motion, ...particles];
  return construction("SubjectPredicateClause", "SubjPred", children, {
    slots: templateDerivedSlots("SubjectPredicateClause", children),
    note: "Subject plus an independent transition-motion predicate.",
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!", "particle?"],
      assigned_slots: ["subject", "predicate", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      predicate_subtype: "transition_motion",
    }),
  });
}

function potentialResultVPFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (!bareCore.length) return null;
  let cursor = 0;
  const subject = nodeCanFillSlot(bareCore[cursor], "subject") ? bareCore[cursor++] : null;
  const action = bareCore[cursor++];
  if (!action || !isVerbLike(action) || !isToken(bareCore[cursor], "得")) return null;
  const markerSource = bareCore[cursor++];
  const resultNodes = bareCore.slice(cursor);
  if (!resultNodes.length) return null;
  if (!resultNodes.some((node) => nodeCanFillSlot(node, "result_complement") || nodeCanFillSlot(node, "completion_marker") || ["完", "到", "掂", "切"].includes(flattenSurface(node)))) return null;
  const resultHead = resultNodes[0];
  const objectSource = resultNodes.slice(1);
  let objectNode = null;
  if (objectSource.length === 1 && (nodeCanFillSlot(objectSource[0], "object") || nodeCanFillSlot(objectSource[0], "np") || nodeCanFillSlot(objectSource[0], "head_noun"))) {
    objectNode = objectSource[0].kind === "construction" ? objectSource[0] : (categorySubspanFor(objectSource, ["NominalHeadSpan"]) || objectSource[0]);
  } else if (objectSource.length > 1) {
    objectNode = classifierObjectNPFromNodes(objectSource) || categorySubspanFor(objectSource, ["OvertHeadDemonstrativeClassifierNP", "QuantifiedClassifierNP", "QuantifiedPersonNP", "OrdinalClassifierNP", "DiMarkedNP", "ModifiedNP", "NominalHeadSpan"]);
  }
  if (objectSource.length && !objectNode) return null;

  const marker = parserInactiveTokenClone(markerSource, {
    label: "func",
    pos: "function",
    syntax: "potential_marker",
    slots: ["potential_marker"],
    reason: "Between an action predicate and an overt result complement, 得 is the productive positive potential linker, not a standalone acceptability response.",
  });
  const children = [action, marker, resultHead, ...(objectNode ? [objectNode] : [])];
  const potential = construction("PotentialResultVP", "Potential", children, {
    slots: cleanSlots(["potential_result_vp", "potential_marker", "result_complement", "vp", "action_vp", "predicate"]),
    note: "Productive positive potential construction: action + 得 + overt result complement.",
    trace: traceInfo("generative_template", {
      construction_type: "PotentialResultVP",
      template_family: "generative_template",
      template: ["action_verb!", "potential_marker!", "result_complement!"],
      assigned_slots: ["action_verb", "potential_marker", "result_complement", ...(objectNode ? ["object"] : [])],
      surfaces: children.map((node) => flattenSurface(node)),
      potential_polarity: "positive",
      not_claims: ["not_acceptability_response", "not_hidden_result_complement"],
    }),
  });
  if (!subject) return potential;
  const clauseChildren = [subject, potential, ...particles];
  return construction("SubjectPredicateClause", "SubjPred", clauseChildren, {
    slots: templateDerivedSlots("SubjectPredicateClause", clauseChildren),
    note: "Subject plus a productive positive potential predicate.",
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!", "particle?"],
      assigned_slots: ["subject", "predicate", ...particles.map(() => "particle")],
      surfaces: clauseChildren.map((node) => flattenSurface(node)),
    }),
  });
}

function incompletePotentialResultCandidate(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  let cursor = 0;
  const subject = nodeCanFillSlot(bareCore[cursor], "subject") ? bareCore[cursor++] : null;
  const action = bareCore[cursor++];
  const marker = bareCore[cursor++];
  if (cursor !== bareCore.length || !action || !isVerbLike(action) || !isToken(marker, "得")) return null;
  const children = [...(subject ? [subject] : []), action, marker, ...particles];
  return construction("NeedsContext", "needs context", children, {
    slots: cleanSlots(["needs_context", "review_candidate", "predicate", "problem_span", subject ? "subject" : ""]),
    note: "Potential/acceptability boundary with no overt result complement.",
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "NeedsContext",
      predicate_omission_profile: "acceptability_possibility",
      omission_status: "potential_result_or_contextual_ellipsis_ambiguous",
      template: ["subject?", "action_verb!", "potential_marker_or_acceptability_predicate!", "particle?"],
      assigned_slots: [...(subject ? ["subject"] : []), "action_verb", "potential_marker_or_acceptability_predicate", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      missing_argument_slots: ["result_or_activity_domain"],
      missing_slot_details: [{ slot: "result_or_activity_domain", license_status: "unresolved" }],
      complement_type: "result_complement_or_contextual_activity",
      context_requirement_status: "context_required",
      antecedent_status: "not_observed",
      selected_alternative: "underdetermined",
      subject_status: subject ? "explicit" : "omitted_unlicensed",
      polarity: "positive",
      conventionality_status: "context_sensitive",
      speech_event_use: "not_applicable",
      semantic_review_flags: ["needs_context_parse", "acceptability_potential_boundary"],
      not_claims: ["not_clean_acceptability_response", "not_fabricated_result_complement", "not_sentence_specific_surface_rule"],
    }),
  });
}










function subjectStativePredicateClauseFallback(nodes) {
  const { core: bareCore, particles } = withoutTrailingParticles(nodes);
  if (bareCore.length !== 2) return null;
  const subject = bareCore[0];
  const predicate = bareCore[1];
  if (!nodeCanFillSlot(subject, "subject")) return null;
  if (!nodeCanFillSlot(predicate, "stative_predicate")) return null;
  if (nodeCanFillSlot(subject, "opinion_topic") && !nodeCanFillSlot(subject, "co_participant")) return null;
  const children = [subject, predicate, ...particles];
  return construction("SubjectPredicateClause", "SubjPred", children, {
    note: "Phase 4 controlled broad subject-predicate clause with stative predicate subtype. Keeps topic-comment evaluations and bare ambiguity cases separate.",
    slots: cleanSlots(["subject_predicate_clause", "subject", "predicate", "clause", "stative_predicate", "comment", "comment_predicate"]),
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      retired_label_alias: "SubjectStativePredicateClause",
      template_family: "generative_template",
      predicate_subtype: "stative",
      rule: "subject + stative_predicate + particle?",
      template: ["subject!", "stative_predicate!", "particle?"],
      assigned_slots: ["subject", "stative_predicate", ...particles.map(() => "particle")],
      reason: "Promote only simple subject-led stative clauses under the broad SubjectPredicateClause category. Topic/comment food evaluations remain TopicComment; bare 唔好食 remains NeedsContext.",
      surfaces: children.map((node) => flattenSurface(node)),
    })
  });
}









function isIgnorableSpaceText(node) {
  return node && node.kind === "text" && !hasSentencePunctuation(node.text) && !normalizeSurface(node.text);
}

function withoutIgnorableSpaceText(nodes) {
  return (nodes || []).filter((node) => !isIgnorableSpaceText(node));
}

function directNodeHasAnySlot(node, slots = []) {
  const actual = nodeSlots(node);
  return slots.some((slot) => actual.includes(slot));
}

function directPredicateCapableNode(node) {
  return directNodeHasAnySlot(node, ["predicate", "main_verb", "action_verb", "vp", "action_vp", "productive_vo", "directional_motion_vp", "modal_vp"]);
}

function nameTokenClone(node) {
  return parserInactiveTokenClone(node, {
    label: (firstToken(node) || node).label || "who",
    pos: "np",
    syntax: "proper_name name_np",
    slots: ["name", "head_noun", "np", "object", "topic"],
    reason: "The final NP is interpreted as the visible name in a bounded self-introduction frame.",
  });
}






const {
  protectedOpaqueFormulaPassthrough,
  repeatedNegatedExistentialResponseForPunctuation,
  boundedAcknowledgementRepetitionForPunctuation,
  transparentDiscourseFormulaFallback,
  leaveTakingFormulaFallback,
} = require("./parser/detectors/discourse/formula-responses")({
  cleanSlots,
  construction,
  flattenSurface,
  isClauseSequenceSeparator,
  isClauseSequenceTerminal,
  isParticle,
  isToken,
  mergeUnique,
  nodeCanFillSlot,
  nodeSlots,
  parserInactiveTokenClone,
  templateDerivedSlots,
  token,
  traceInfo,
  traceKind,
  withoutIgnorableSpaceText,
  withoutTrailingParticles,
});

function pathMarkerClone(node) {
  return parserInactiveTokenClone(node, {
    label: "func",
    pos: "function",
    syntax: "path_coverb path_marker",
    slots: ["path_marker"],
    reason: "沿住 is interpreted as the path marker inside a bounded polite path imperative.",
  });
}

function pathPhraseFromParts(marker, path) {
  const children = [pathMarkerClone(marker), path];
  return construction("PathPhrase", "Path", children, {
    note: "Path phrase: 沿住 + path/location.",
    slots: templateDerivedSlots("PathPhrase", children),
    trace: traceInfo("generative_template", {
      construction_type: "PathPhrase",
      template: ["path_marker!", "location!"],
      assigned_slots: ["path_marker", "location"],
      surfaces: children.map((node) => flattenSurface(node)),
      subspan: true,
    }),
  });
}





function yesNoQuestionMarkerClone(node) {
  return parserInactiveTokenClone(node, {
    label: "func",
    pos: "function",
    syntax: "yes_no_question_marker polar_question_marker",
    slots: ["yes_no_question_marker", "question_marker"],
    reason: "係咪 is interpreted as the yes/no question marker inside a bounded polar-question frame.",
  });
}




function copulaClone(node, syntax, extraSlots, reason) {
  return parserInactiveTokenClone(node, {
    label: "func",
    pos: "function",
    syntax,
    slots: ["copula", ...(extraSlots || [])],
    reason,
  });
}







function interiorExistentialFrameFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length < 6) return null;
  const yauIndex = compact.findIndex((node) => isToken(node, "有"));
  if (yauIndex < 0) return null;
  const locationIndex = compact.findIndex((node) => isToken(node, "入面") || isToken(node, "入邊"));
  if (locationIndex <= 0 || locationIndex >= yauIndex) return null;
  const topicNodes = compact.slice(0, locationIndex);
  const between = compact.slice(locationIndex + 1, yauIndex);
  if (between.length < 1 || between.length > 2) return null;
  const topic = categorySubspanFor(topicNodes, ["OvertHeadDemonstrativeClassifierNP", "OrdinalClassifierNP", "ModifiedNP", "NominalHeadSpan"]) || (topicNodes.length === 1 ? topicNodes[0] : null);
  if (!topic || !nodeCanFillSlot(topic, "topic")) return null;
  const wh = between[0];
  const focus = between.length === 2 ? between[1] : null;
  if (!nodeCanFillSlot(wh, "wh_object") && !nodeCanFillSlot(wh, "head_noun") && !nodeCanFillSlot(wh, "object")) return null;
  if (focus && !nodeCanFillSlot(focus, "focus_adverb") && !nodeCanFillSlot(focus, "how")) return null;
  const existential = parserInactiveTokenClone(compact[yauIndex], {
    label: "func",
    pos: "function",
    syntax: "existential interior_existential",
    slots: ["existential", "predicate"],
    reason: "有 is interpreted as the existential predicate inside a bounded interior-existential frame.",
  });
  const children = [topic, compact[locationIndex], wh, ...(focus ? [focus] : []), existential, ...particles];
  return construction("LocativeExistentialClause", "LocExist", children, {
    note: "v0.5.33 interior existential frame: topic + 入面/入邊 + 乜嘢 + 都 + 有.",
    slots: templateDerivedSlots("LocativeExistentialClause", children),
    trace: traceInfo("generative_template", {
      construction_type: "LocativeExistentialClause",
      template: ["topic!", "location!", "wh_object!", ...(focus ? ["focus_adverb?"] : []), "existential!", "particle?"],
      assigned_slots: ["topic", "location", "wh_object", ...(focus ? ["focus_adverb"] : []), "existential", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "Promotes the bounded corpus pattern for 'has everything inside' without creating broad 有 existential grammar.",
    }),
  });
}


function resultFramePartClone(node, overrides = {}) {
  const surface = overrides.surface || flattenSurface(node);
  const base = firstToken(node) || token(surface);
  return parserInactiveTokenClone(base, {
    label: overrides.label || base.label || "func",
    pos: overrides.pos || (overrides.label === "doing" ? "verb" : overrides.label === "particle" ? "particle" : overrides.label === "when" ? "adverbial" : "function"),
    syntax: overrides.syntax || base.syntax || "result_frame_part",
    slots: overrides.slots || [],
    reason: overrides.reason || "Token is parser-inactive inside a bounded v0.5.34 change/result frame; the parent exposes the result relation while child tokens stay visible.",
  });
}

function resultTopicFromNodes(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  if (compact.length === 1 && (nodeCanFillSlot(compact[0], "topic") || nodeCanFillSlot(compact[0], "subject") || nodeCanFillSlot(compact[0], "location") || nodeCanFillSlot(compact[0], "np") || nodeCanFillSlot(compact[0], "head_noun"))) return compact[0];
  const templated = categorySubspanFor(compact, ["OvertHeadDemonstrativeClassifierNP", "QuantifiedClassifierNP", "DiMarkedNP", "OrdinalClassifierNP", "NominalHeadSpan", "CoordinatedNP"]);
  if (templated && (nodeCanFillSlot(templated, "topic") || nodeCanFillSlot(templated, "subject") || nodeCanFillSlot(templated, "np") || nodeCanFillSlot(templated, "head_noun"))) return templated;
  return null;
}

function resultComplementFromNodes(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  const nominal = nominalComplementFromNodes(compact);
  if (nominal) return nominal;
  if (compact.length === 1 && (nodeCanFillSlot(compact[0], "object") || nodeCanFillSlot(compact[0], "np") || nodeCanFillSlot(compact[0], "head_noun") || nodeCanFillSlot(compact[0], "location"))) return compact[0];
  return null;
}





function makeChangeIntoPredicate(changeNode, complement) {
  const children = [
    resultFramePartClone(changeNode, {
      label: "doing",
      pos: "verb",
      syntax: "change_into_verb result_change_verb",
      slots: ["change_verb", "action_verb", "main_verb", "predicate"],
      reason: "變成 is the change-into predicate head inside a bounded change-result frame.",
    }),
    complement,
  ];
  return construction("ChangeIntoPredicate", "變成", children, {
    note: "Bounded change-into predicate: 變成 + result complement.",
    slots: templateDerivedSlots("ChangeIntoPredicate", children),
    trace: traceInfo("generative_template", {
      construction_type: "ChangeIntoPredicate",
      template: ["change_verb!", "result_complement!"],
      assigned_slots: ["change_verb", "result_complement"],
      surfaces: children.map((node) => flattenSurface(node)),
      subspan: true,
    }),
  });
}

function wrapChangeIntoPredicateSubspans(nodes) {
  const result = [];
  let i = 0;
  while (i < nodes.length) {
    if (isToken(nodes[i], "變成") && isToken(nodes[i + 1], "點")) {
      result.push(makeChangeIntoPredicate(nodes[i], nodes[i + 1]));
      i += 2;
      continue;
    }
    result.push(nodes[i]);
    i += 1;
  }
  return result;
}


function bridgeFramePartClone(node, overrides = {}) {
  const surface = overrides.surface || flattenSurface(node);
  const base = firstToken(node) || token(surface);
  return parserInactiveTokenClone(base, {
    label: overrides.label || base.label || "func",
    pos: overrides.pos || (overrides.label === "doing" ? "verb" : overrides.label === "particle" ? "particle" : overrides.label === "who" ? "np" : overrides.label === "what" ? "noun" : "function"),
    syntax: overrides.syntax || base.syntax || "bridge_frame_part",
    slots: overrides.slots || [],
    note: Object.prototype.hasOwnProperty.call(overrides, "note") ? overrides.note : base.note,
    trace_detail: overrides.trace_detail || undefined,
    reason: overrides.reason || "Token is parser-inactive inside a bounded v0.5.35 controlled clause-bridge frame; the parent exposes the clause relation while children remain visible.",
  });
}



function bridgeNPFromNodes(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  const classifierObject = classifierObjectNPFromNodes(compact);
  if (classifierObject) return classifierObject;
  return resultComplementFromNodes(compact) || resultTopicFromNodes(compact) || nominalComplementFromNodes(compact);
}

const createLegacyRecipientDetectors = require("./parser/detectors/transfer/legacy-recipient");
const {
  benefactiveRecipientVPFallback,
  recipientFrameFallback,
  transferDitransitiveVPFallback,
  transferPredicateFromNodes,
} = createLegacyRecipientDetectors({
  bridgeFramePartClone,
  bridgeNPFromNodes,
  categorySubspanFor,
  cleanSlots,
  construction,
  firstToken,
  flattenSurface,
  isToken,
  nodeCanFillSlot,
  nodeSlots,
  rawNodeHasSlot,
  templateDerivedSlots,
  traceInfo,
  withoutIgnorableSpaceText,
  withoutTrailingParticles,
});

const createLexicalGiveDetectors = require("./parser/detectors/transfer/lexical-give");
const {
  cp021bArgumentSpan,
  cp021bIsBei2Marker,
  cp021bNodeIsPersonEvidence,
  cp021bSpanIsPersonNP,
  cp021bSpanIsThingNP,
  lexicalGiveRelationFallback,
} = createLexicalGiveDetectors({
  bridgeFramePartClone,
  categorySubspanFor,
  classifierObjectNPFromNodes,
  cleanSlots,
  construction,
  firstToken,
  flattenSurface,
  isToken,
  nodeCanFillSlot,
  nodeSlots,
  traceInfo,
  withoutIgnorableSpaceText,
  withoutTrailingParticles,
});

const createPostThemeDetectors = require("./parser/detectors/transfer/post-theme");
const {
  CP021B_POST_THEME_PREDICATE_PROFILES,
  cp021bBoundaryReviewFallback,
  cp021bMakePostThemeRelation,
  postThemeParticipantRelationFallback,
} = createPostThemeDetectors({
  bridgeFramePartClone,
  cleanSlots,
  construction,
  cp020NodeIsPredicateEvidence: (...args) => cp020NodeIsPredicateEvidence(...args),
  cp021bArgumentSpan,
  cp021bIsBei2Marker,
  cp021bSpanIsPersonNP,
  cp021bSpanIsThingNP,
  firstToken,
  flattenSurface,
  isToken,
  traceInfo,
  withoutIgnorableSpaceText,
  withoutTrailingParticles,
});

const createPassivePermissiveDetectors = require("./parser/detectors/transfer/passive-permissive");
const {
  cp020NodeIsPersonEvidence,
  cp020NodeIsPredicateEvidence,
  passivePermissiveRelationFallback,
} = createPassivePermissiveDetectors({
  bridgeFramePartClone,
  categorySubspanFor,
  cleanSlots,
  construction,
  cp021bNodeIsPersonEvidence,
  firstToken,
  flattenSurface,
  isToken,
  nodeCanFillSlot,
  nodeSlots,
  templateDerivedSlots,
  traceInfo,
  withoutIgnorableSpaceText,
  withoutTrailingParticles,
});

function rawNodeHasSlot(node, slot) {
  return nodeSlots(node).includes(slot);
}



const createCoverbPlaceDetectors = require("./parser/detectors/locatives/coverb-place");
const {
  locativeCoverbPhraseFromNodes,
  locativePredicatePhraseFromNodes,
  subjectLocativePredicateClauseFallback,
} = createCoverbPlaceDetectors({
  bridgeFramePartClone,
  cleanSlots,
  construction,
  flattenSurface,
  isToken,
  nodeCanFillSlot,
  templateDerivedSlots,
  traceInfo,
  withoutIgnorableSpaceText,
  withoutTrailingParticles,
});

const createLocativePostureDetectors = require("./parser/detectors/locatives/posture");
const {
  locativePostureVPFallback,
} = createLocativePostureDetectors({
  bridgeFramePartClone,
  cleanSlots,
  construction,
  flattenSurface,
  isToken,
  nodeCanFillSlot,
  templateDerivedSlots,
  traceInfo,
  withoutIgnorableSpaceText,
  withoutTrailingParticles,
});

const createCoverbDetectors = require("./parser/detectors/coverbs/frames");
const {
  coverbFrameFallback,
} = createCoverbDetectors({
  bridgeFramePartClone,
  bridgeNPFromNodes,
  categorySubspanFor,
  construction,
  flattenSurface,
  isToken,
  locativeCoverbPhraseFromNodes,
  nodeCanFillSlot,
  nodeSlots,
  parserInactiveTokenClone,
  rawNodeHasSlot,
  templateDerivedSlots,
  traceInfo,
  withoutIgnorableSpaceText,
  withoutTrailingParticles,
});



function isBareQuantityNumeralNode(node) {
  const t = firstToken(node);
  if (!t) return false;
  const surface = flattenSurface(node);
  const syntax = t.syntax || "";
  const slots = nodeSlots(node);
  return ["一", "兩", "二", "三", "四", "五", "六", "七", "八", "九", "十"].includes(surface)
    && (syntax.includes("quantity") || syntax.includes("count_value") || slots.includes("quantity"));
}

function bareNumeralObjectMalformedCandidate(core) {
  const compact = withoutIgnorableSpaceText(core || []);
  if (compact.length < 2 || compact.length > 4) return null;

  const numeralNode = compact[compact.length - 1];
  if (!isBareQuantityNumeralNode(numeralNode)) return null;

  const prefix = compact.slice(0, -1);
  const hasSubject = prefix.length >= 2 && nodeCanFillSlot(prefix[0], "subject");
  const subjectNode = hasSubject ? prefix[0] : null;
  const governorNodes = hasSubject ? prefix.slice(1) : prefix;
  if (governorNodes.length < 1 || governorNodes.length > 2) return null;

  let spec = null;
  const firstGovernor = governorNodes[0];
  const secondGovernor = governorNodes[1] || null;

  if (governorNodes.length === 1 && nodeCanFillSlot(firstGovernor, "action_verb")) {
    spec = {
      malformedSubtype: "bare_numeral_object",
      governorType: "action_verb",
      problem: "Action verb followed by a bare numeral without classifier or object head.",
      expectedAfterNumeral: ["classifier", "object_head"],
      missingAfterNumeral: "missing_classifier_or_object_head",
      note: "Malformed or incomplete action-predicate + bare numeral object candidate. A classifier/object head is expected after the numeral.",
      semanticFlags: ["malformed_candidate_parse", "suspicious_bare_numeral_object"],
      notClaims: ["not_action_stative_vp", "not_complete_transitive_vp", "not_quantified_classifier_np", "not_full_xbar_tree"],
      slots: ["action_verb"],
      childSpecs: [{
        node: firstGovernor,
        label: "doing",
        syntax: "action_verb malformed_bare_numeral_predicate",
        slots: ["action_verb", "main_verb", "predicate"],
        assignedSlot: "action_verb",
        reason: "Visible action verb inside malformed predicate + bare numeral candidate."
      }]
    };
  } else if (governorNodes.length === 2
      && nodeCanFillSlot(firstGovernor, "action_verb")
      && nodeCanFillSlot(secondGovernor, "perfective_aspect")) {
    spec = {
      malformedSubtype: "perfective_bare_numeral_object",
      governorType: "perfective_action_predicate",
      problem: "Perfective action predicate followed by a bare numeral without classifier or object head.",
      expectedAfterNumeral: ["classifier", "object_head"],
      missingAfterNumeral: "missing_classifier_or_object_head",
      note: "Malformed or incomplete perfective action-predicate + bare numeral object candidate. Perfective aspect does not license a numeral as a complete object.",
      semanticFlags: ["malformed_candidate_parse", "suspicious_bare_numeral_object", "perfective_predicate_boundary"],
      notClaims: ["not_complete_perfective_vp", "not_complete_transitive_vp", "not_quantified_classifier_np", "not_context_licensed_fragment"],
      slots: ["action_verb", "perfective_aspect"],
      childSpecs: [
        {
          node: firstGovernor,
          label: "doing",
          syntax: "action_verb malformed_bare_numeral_predicate",
          slots: ["action_verb", "main_verb", "predicate"],
          assignedSlot: "action_verb",
          reason: "Visible action verb inside malformed perfective predicate + bare numeral candidate."
        },
        {
          node: secondGovernor,
          label: "func",
          syntax: "perfective_aspect malformed_bare_numeral_predicate",
          slots: ["perfective_aspect", "aspect_marker"],
          assignedSlot: "perfective_aspect",
          reason: "Visible perfective marker remains transparent inside the malformed candidate."
        }
      ]
    };
  } else if (governorNodes.length === 1 && nodeCanFillSlot(firstGovernor, "desiderative_modal")) {
    spec = {
      malformedSubtype: "desiderative_bare_numeral_complement",
      governorType: "desiderative_modal",
      problem: "Desiderative predicate followed by a bare numeral that does not form a valid content complement.",
      expectedAfterNumeral: ["classifier_and_nominal_head", "overt_np", "overt_vp", "content_clause"],
      missingAfterNumeral: "missing_desiderative_content_structure",
      note: "Malformed desiderative + bare numeral complement candidate. A bare numeral alone does not saturate the desired or cognitive content slot.",
      semanticFlags: ["malformed_candidate_parse", "suspicious_bare_numeral_complement", "desiderative_complement_boundary"],
      notClaims: ["not_complete_modal_vp", "not_stative_predicate_complement", "not_context_licensed_fragment", "not_quantified_classifier_np"],
      slots: ["modal", "desiderative_modal"],
      childSpecs: [{
        node: firstGovernor,
        label: "func",
        syntax: "desiderative_modal malformed_bare_numeral_governor",
        slots: ["modal", "desiderative_modal"],
        assignedSlot: "desiderative_modal",
        reason: "Visible desiderative head inside malformed desiderative + bare numeral candidate."
      }]
    };
  } else if (governorNodes.length === 1 && nodeCanFillSlot(firstGovernor, "locative_marker")) {
    spec = {
      malformedSubtype: "locative_bare_numeral_complement",
      governorType: "locative_marker",
      problem: "Locative marker followed by a bare numeral that does not form a location phrase.",
      expectedAfterNumeral: ["location_head", "overt_location_np", "place_phrase"],
      missingAfterNumeral: "missing_location_structure",
      note: "Malformed locative + bare numeral complement candidate. A bare numeral alone does not saturate the location slot.",
      semanticFlags: ["malformed_candidate_parse", "suspicious_bare_numeral_complement", "locative_complement_boundary"],
      notClaims: ["not_complete_locative_predicate", "not_location_np", "not_context_licensed_fragment", "not_quantified_classifier_np"],
      slots: ["locative_marker"],
      childSpecs: [{
        node: firstGovernor,
        label: "func",
        syntax: "locative_marker malformed_bare_numeral_governor",
        slots: ["locative_marker", "coverb_marker"],
        assignedSlot: "locative_marker",
        reason: "Visible locative marker inside malformed locative + bare numeral candidate."
      }]
    };
  }

  if (!spec) return null;

  const subjectSurface = subjectNode ? flattenSurface(subjectNode) : "";
  const numeralSurface = flattenSurface(numeralNode);
  const subjectChild = subjectNode ? parserInactiveTokenClone(firstToken(subjectNode), {
    label: "who",
    syntax: "subject malformed_candidate_subject",
    slots: ["subject"],
    reason: "Visible subject inside malformed governed-predicate + bare numeral candidate."
  }) : null;
  const governorChildren = spec.childSpecs.map((childSpec) => parserInactiveTokenClone(firstToken(childSpec.node), {
    label: childSpec.label,
    syntax: childSpec.syntax,
    slots: childSpec.slots,
    reason: childSpec.reason
  }));
  const numeralChild = parserInactiveTokenClone(firstToken(numeralNode), {
    label: "how",
    syntax: "bare_quantity missing_required_complement_structure",
    slots: ["quantity", "bare_numeral", "problem_span"],
    reason: "Visible bare numeral inside a malformed governed complement; required classifier, nominal head, location, VP, or content structure is absent."
  });
  const children = [...(subjectChild ? [subjectChild] : []), ...governorChildren, numeralChild];
  const template = [...(subjectChild ? ["subject?"] : []), ...spec.childSpecs.map((childSpec) => `${childSpec.assignedSlot}!`), "bare_quantity!"];
  const assignedSlots = [...(subjectChild ? ["subject"] : []), ...spec.childSpecs.map((childSpec) => childSpec.assignedSlot), "bare_quantity"];
  const surfaces = [...(subjectChild ? [subjectSurface] : []), ...governorNodes.map((node) => flattenSurface(node)), numeralSurface];

  return construction("MalformedCandidate", "Malformed", children, {
    slots: cleanSlots(["malformed_candidate", "needs_review", "predicate", "problem_span", "quantity", ...spec.slots, subjectChild ? "subject" : ""]),
    note: spec.note,
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "MalformedCandidate",
      malformed_family: "bare_numeral_complement",
      malformed_subtype: spec.malformedSubtype,
      governor_type: spec.governorType,
      template,
      assigned_slots: assignedSlots,
      surfaces,
      problem: spec.problem,
      missing_after_numeral: spec.missingAfterNumeral,
      expected_after_numeral: spec.expectedAfterNumeral,
      semantic_review_flags: spec.semanticFlags,
      not_claims: spec.notClaims,
      reason: "A1 malformed-boundary guard: a bare numeral cannot independently saturate object, desiderative-content, or location structure, and perfective aspect cannot rescue it."
    })
  });
}

function existentialQuestionWithVpMalformedCandidate(core) {
  if (!core || (core.length !== 2 && core.length !== 3)) return null;
  const hasSubject = core.length === 3 && nodeCanFillSlot(core[0], "subject");
  const existentialNode = hasSubject ? core[1] : core[0];
  const predicateNode = hasSubject ? core[2] : core[1];
  if (!isToken(existentialNode, "有冇")) return null;
  if (!predicateNode || !nodeCanFillSlot(predicateNode, "vp")) return null;

  const children = hasSubject ? [core[0], existentialNode, predicateNode] : [existentialNode, predicateNode];
  return construction("MalformedCandidate", "Malformed", children, {
    slots: cleanSlots(["malformed_candidate", "needs_review", "question_fragment", "existential_question", "problem_span", "predicate", hasSubject ? "subject" : ""]),
    note: "Malformed existential-question candidate: 有冇 expects an NP object/domain here, not a bare VP predicate.",
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "MalformedCandidate",
      malformed_subtype: "existential_question_with_vp",
      template: hasSubject ? ["subject?", "existential_question!", "vp!"] : ["existential_question!", "vp!"],
      assigned_slots: hasSubject ? ["subject", "existential_question", "vp"] : ["existential_question", "vp"],
      surfaces: children.map((node) => flattenSurface(node)),
      problem: "有冇 is followed by a VP predicate rather than a noun phrase object/domain.",
      expected_after_existential_question: ["np", "topic_or_object", "abstract_object"],
      semantic_review_flags: ["malformed_candidate_parse", "existential_question_vp_misuse"],
      not_claims: [
        "not_clean_existential_question",
        "not_productive_vo_question",
        "not_broad_mandarin_conversion"
      ],
      reason: "v0.5.110 pre-intermediate guardrail: prevent learner-error rows such as 我有冇食飯 from being accepted as clean ExistentialQuestion parses."
    })
  });
}

function mandarinNegatorNeedsContextCandidate(core) {
  if (!core || core.length < 2) return null;
  const first = firstToken(core[0]);
  if (!first || first.surface !== "不") return null;
  const rest = core.slice(1);
  if (!rest.some((node) => nodeCanFillSlot(node, "vp") || nodeCanFillSlot(node, "predicate"))) return null;
  return construction("NeedsContext", "needs context", core, {
    slots: ["needs_context", "review_candidate", "negator", "predicate"],
    note: "Needs review: 不 is a Mandarin/Standard Chinese negator here. Canto Span does not silently convert it to Cantonese 唔.",
    trace: traceInfo("special_ambiguity_rule", {
      surface: core.map((node) => flattenSurface(node)).join(""),
      reason: "Mandarin negator before a Cantonese VP is review-only; raw-first parser-shadow policy forbids silent 不→唔 conversion.",
      candidate_analyses: [
        { construction: "NegatedVP", split: ["不", rest.map((node) => flattenSurface(node)).join("")], status: "blocked_pending_review", parser_active: false },
        { construction: "NeedsContext", split: core.map((node) => flattenSurface(node)), status: "accepted_guardrail", parser_active: false }
      ],
      semantic_review_flags: ["needs_context_parse", "mandarin_negator_review"],
      not_claims: [
        "not_clean_productive_vo",
        "not_silent_mandarin_to_cantonese_conversion",
        "not_parser_shadow_repair"
      ]
    })
  });
}

function nodeSurfaceMatches(node, surfaces) {
  const t = firstToken(node);
  const values = [
    flattenSurface(node),
    flattenDisplaySurface(node),
    t && t.surface,
    t && t.display_surface,
  ].filter(Boolean);
  return values.some((value) => surfaces.includes(value));
}

function incompleteProhibitiveNeedsContextCandidate(core) {
  if (!core || !core.length) return null;
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (bareCore.length !== 1) return null;
  const node = bareCore[0];
  if (!nodeSurfaceMatches(node, ["唔好"])) return null;
  if (!nodeCanFillSlot(node, "prohibitive_marker")) return null;
  const children = [...bareCore, ...particles];
  return construction("NeedsContext", "needs context", children, {
    slots: ["needs_context", "review_candidate", "prohibitive_marker", "problem_span"],
    note: "Needs context: standalone 唔好 is an incomplete prohibitive/review fragment without the action or prior context.",
    trace: traceInfo("special_ambiguity_rule", {
      surface: flattenSurface(node),
      reason: "Standalone prohibitive marker needs a following VP or discourse context.",
      context_requirement_status: "context_required",
      missing_argument_slots: ["prohibited_action_or_evaluation_target"],
      missing_slot_details: [
        { slot: "prohibited_action", license_status: "unresolved", candidate_reading: "prohibitive_fragment" },
        { slot: "evaluation_target", license_status: "unresolved", candidate_reading: "negative_evaluation" },
      ],
      antecedent_status: "not_observed",
      discourse_license_not_observed: true,
      candidate_readings: ["prohibitive_fragment", "negative_evaluation"],
      overt_head: "唔好",
      particle_contribution: particles.map((child) => flattenSurface(child)),
      omission_analysis_candidates: ["argument_drop", "predicate_fragment"],
      semantic_review_flags: ["needs_context_parse", "incomplete_prohibitive_marker"],
      not_claims: ["not_clean_imperative", "not_complete_formula"]
    })
  });
}


function predicateOmissionParts(core) {
  if (!core || !core.length) return null;
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (!bareCore.length) return null;
  let cursor = 0;
  const subject = nodeCanFillSlot(bareCore[cursor], "subject") ? bareCore[cursor++] : null;
  const negator = isToken(bareCore[cursor], "唔") ? bareCore[cursor++] : null;
  if (cursor !== bareCore.length - 1) return null;
  const predicate = bareCore[cursor];
  const predicateSurface = flattenSurface(predicate);
  const profile = predicateOmissionProfileForHead(predicateSurface);
  if (!profile) return null;
  return {
    bareCore,
    particles,
    subject,
    negator,
    predicate,
    predicateSurface,
    profile,
    polarity: negator ? "negative" : "positive",
  };
}

function predicateOmissionTrace(parts, overrides = {}) {
  const { profile, predicateSurface, subject, negator, particles } = parts;
  const missingSlots = overrides.missing_argument_slots || [
    profile.missing_slot_type,
    ...(!subject && overrides.subject_optional !== true ? ["subject"] : []),
  ];
  return {
    predicate_omission_profile: profile.id,
    omission_status: overrides.omission_status || profile.isolated_status,
    missing_argument_slots: missingSlots,
    missing_slot_details: missingSlots.map((slot) => ({ slot, license_status: "unresolved" })),
    complement_type: profile.complement_type,
    context_requirement_status: overrides.context_requirement_status || "context_required",
    antecedent_status: overrides.antecedent_status || "not_observed",
    selected_alternative: parts.polarity,
    subject_status: subject ? "explicit" : "omitted_unlicensed",
    polarity: parts.polarity,
    conventionality_status: overrides.conventionality_status || profile.conventional_bare_status,
    speech_event_use: overrides.speech_event_use || "not_applicable",
    overt_head: predicateSurface,
    particle_contribution: particles.map((node) => flattenSurface(node)),
    discourse_license_not_observed: (overrides.antecedent_status || "not_observed") !== "linked",
    omission_analysis_candidates: overrides.omission_analysis_candidates || ["typed_predicate_ellipsis", "predicate_response_fragment"],
    semantic_review_flags: overrides.semantic_review_flags || ["needs_context_parse", "typed_predicate_omission"],
    not_claims: overrides.not_claims || [
      "not_fabricated_complement_token",
      "not_unrestricted_argument_deletion",
      "not_sentence_specific_surface_rule",
    ],
    ...overrides,
  };
}

function incompleteRestrictiveFocusBoundaryCandidate(core) {
  if (!core || !core.length) return null;
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (bareCore.length !== 1 || !isToken(bareCore[0], "得") || particles.length !== 1) return null;
  const particleSurface = flattenSurface(particles[0]);
  if (!["啫", "咋"].includes(particleSurface)) return null;
  const children = [bareCore[0], particles[0]];
  return construction("NeedsContext", "needs context", children, {
    slots: cleanSlots(["needs_context", "review_candidate", "predicate", "particle", "problem_span"]),
    note: "Needs context: 得 plus a restrictive particle is visible, but the scalar or quantity host required for a clean restrictive-focus reading is absent.",
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "NeedsContext",
      predicate_omission_profile: "acceptability_possibility",
      omission_status: "restrictive_scalar_host_or_acceptability_context_unresolved",
      template: ["acceptability_or_restriction_marker!", "restrictive_focus_particle!"],
      assigned_slots: ["predicate", "particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      missing_argument_slots: ["scalar_host"],
      missing_slot_details: [{ slot: "scalar_host", license_status: "unresolved" }],
      complement_type: "scalar_or_quantity_host_or_acceptability_domain",
      context_requirement_status: "context_required",
      antecedent_status: "not_observed",
      selected_alternative: "acceptability_response_or_restrictive_focus",
      polarity: "positive",
      conventionality_status: "context_sensitive",
      particle_contribution: [particleSurface],
      omission_analysis_candidates: ["restrictive_focus_with_omitted_scalar_host", "acceptability_response_with_focus_particle"],
      semantic_review_flags: ["needs_context_parse", "restrictive_focus_missing_scalar_host", "acceptability_focus_boundary"],
      not_claims: ["not_clean_focus_particle_frame", "not_fabricated_scalar_host", "not_productive_potential_result", "not_sentence_specific_surface_rule"],
      reason: "Bare 得啫/得咋 lacks the overt scalar host required by the productive restrictive FocusParticleFrame. Preserve both tokens under one review span instead of ignoring the particle or inventing the missing host.",
    }),
  });
}

function predicateOmissionCandidate(core) {
  const parts = predicateOmissionParts(core);
  if (!parts) return null;
  const { subject, negator, predicate, predicateSurface, profile, particles } = parts;
  const fullSurface = core.map((node) => flattenSurface(node)).join("");
  if (["可以呀", "可以啊", "得啦", "得喇"].includes(fullSurface)) return null;
  const directiveSpeechUse = profile.id === "speech_report_event" && subject && predicateSurface === "講" && particles.some((node) => ["啦", "喇"].includes(flattenSurface(node)));
  const conventionalCognitionUse = profile.id === "factive_cognition" && subject;
  // Preserve accepted scoped-particle and older fragment routes unless the particle is
  // integral to one of the two new broad analyses above.
  if (particles.length && !directiveSpeechUse && !conventionalCognitionUse) return null;

  if (profile.id === "factive_cognition" && !subject && negator) {
    // Preserve the accepted standalone 唔知 / 唔知呀 fragment route.
    return null;
  }

  if (profile.id === "factive_cognition" && subject && !negator) {
    return null;
  }

  if (profile.id === "factive_cognition" && subject) {
    const promoted = phase4CognitionActiveTokenClone(predicate, {
      label: predicate.label || "doing",
      syntax: `${predicate.syntax || "cognition_verb"} cognition_statement_predicate`,
      slots: ["cognition_statement_clause"],
      reason: "A1 typed omission profile: 知 is a conventional bare cognition statement with visible polarity and no fabricated proposition.",
    });
    const children = [subject, ...(negator ? [negator] : []), promoted, ...particles];
    return construction("CognitionStatementClause", "Know", children, {
      note: "Conventional bare cognition statement. The proposition may be supplied by discourse, but no hidden content clause is inserted.",
      slots: templateDerivedSlots("CognitionStatementClause", children),
      trace: traceInfo("generative_template", {
        construction_type: "CognitionStatementClause",
        template_family: "generative_template",
        template: ["subject!", "polarity?", "cognition_predicate!", "particle?"],
        assigned_slots: ["subject", ...(negator ? ["polarity"] : []), "cognition_predicate", ...particles.map(() => "particle")],
        surfaces: children.map((node) => flattenSurface(node)),
        ...predicateOmissionTrace(parts, {
          omission_status: "conventional_bare_statement",
          missing_argument_slots: [],
          context_requirement_status: "context_not_required",
          antecedent_status: "not_applicable",
          conventionality_status: "conventional_bare_statement",
          semantic_review_flags: [],
          omission_analysis_candidates: ["conventional_bare_cognition_statement", "optional_contextual_proposition_link"],
          not_claims: ["not_fabricated_content_clause", "not_forced_fragment_answer"],
        }),
        reason: "Knowledge predicates can stand as conventional statements with positive or negative polarity. Explicit context may later link the proposition without changing the visible construction.",
      }),
    });
  }

  if (directiveSpeechUse) {
    const speech = parserInactiveTokenClone(predicate, {
      label: predicate.label || "doing",
      pos: "verb",
      syntax: `${predicate.syntax || "speech_verb"} speech_event_predicate directive_speech_event`,
      slots: ["speech_verb", "action_verb", "main_verb", "predicate", "vp"],
      reason: "講 is used as an overt speech-event predicate under directive closure; content is optional rather than silently omitted.",
    });
    const children = [subject, speech, ...particles];
    return construction("SubjectPredicateClause", "SubjPred", children, {
      note: "Subject-led directive speech event with optional content.",
      slots: templateDerivedSlots("SubjectPredicateClause", children),
      trace: traceInfo("generative_template", {
        construction_type: "SubjectPredicateClause",
        template_family: "generative_template",
        template: ["subject!", "speech_event_predicate!", "directive_particle!"],
        assigned_slots: ["subject", "predicate", ...particles.map(() => "particle")],
        surfaces: children.map((node) => flattenSurface(node)),
        ...predicateOmissionTrace(parts, {
          omission_status: "speech_event_complete_without_content",
          missing_argument_slots: [],
          context_requirement_status: "context_not_required",
          antecedent_status: "not_applicable",
          conventionality_status: "conventional_directive_speech_event",
          speech_event_use: "imperative_or_directive",
          semantic_review_flags: [],
          omission_analysis_candidates: ["speech_event_use", "content_optional"],
          not_claims: ["not_fabricated_reported_content", "not_forced_reported_speech"],
        }),
        reason: "A directive such as 你講啦 can denote the speech event itself. The parser therefore does not force an omitted reported-content analysis.",
      }),
    });
  }

  const children = [
    ...(subject ? [subject] : []),
    ...(negator ? [negator] : []),
    predicate,
    ...particles,
  ];
  const ambiguity = profile.id === "acceptability_possibility"
    ? ["acceptability_response", "modal_possibility_predicate", "potential_or_resultative_boundary"]
    : profile.id === "speech_report_event"
      ? ["completed_speech_event", "omitted_reported_content"]
      : ["typed_predicate_ellipsis", "predicate_response_fragment"];
  const semanticFlags = profile.id === "speech_report_event"
    ? ["needs_context_parse", "speech_event_content_ambiguity"]
    : profile.id === "acceptability_possibility"
      ? ["needs_context_parse", "acceptability_potential_boundary"]
      : ["needs_context_parse", "typed_predicate_omission"];
  return construction("NeedsContext", "needs context", children, {
    slots: cleanSlots(["needs_context", "review_candidate", "predicate", "problem_span", subject ? "subject" : "", profile.parser_family === "modal" ? "modal" : ""]),
    note: "Needs context: a typed predicate is visible, but its complement/domain or discourse-response license is unresolved.",
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "NeedsContext",
      template: ["subject?", "polarity?", "typed_predicate!", "particle?"],
      assigned_slots: [...(subject ? ["subject"] : []), ...(negator ? ["polarity"] : []), "predicate", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      ...predicateOmissionTrace(parts, {
        omission_analysis_candidates: ambiguity,
        semantic_review_flags: semanticFlags,
        speech_event_use: profile.id === "speech_report_event" ? "ambiguous" : "not_applicable",
      }),
      reason: profile.id === "speech_report_event"
        ? "A bare speech predicate may denote a completed speech event or omit reported content. Keep both analyses available until context resolves the use."
        : profile.id === "acceptability_possibility"
          ? "Standalone 得 can be an acceptability/possibility response, while 得 also participates in potential/resultative grammar. Do not force one clean reading without context."
          : "The omission profile records the predicate family, polarity, and complement type. It does not invent the missing complement or rely on literal sentence matching.",
    }),
  });
}

function incompleteModalNeedsContextCandidate(core) {
  if (!core || !core.length) return null;
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (!bareCore.length || bareCore.length > 2) return null;
  const hasSubject = bareCore.length === 2 && nodeCanFillSlot(bareCore[0], "subject");
  const modalNode = hasSubject ? bareCore[1] : bareCore[0];
  if (!isModalToken(modalNode)) return null;
  const modalSurface = flattenSurface(modalNode);
  if (modalSurface.includes("唔")) return null;
  const fullSurface = core.map((node) => flattenSurface(node)).join("");
  if (["可以呀", "可以啊"].includes(fullSurface)) return null;
  const missingSlot = modalSurface === "想" ? "desired_or_cognitive_content" : "modal_or_volitional_complement";
  const missingSlots = [missingSlot, ...(!hasSubject ? ["subject"] : [])];
  const children = [...bareCore, ...particles];
  return construction("NeedsContext", "needs context", children, {
    slots: cleanSlots(["needs_context", "review_candidate", "modal", "desiderative_modal", "problem_span", hasSubject ? "subject" : ""]),
    note: "Needs context: the overt modal/desiderative predicate has no represented complement or licensed prior question.",
    trace: traceInfo("special_ambiguity_rule", {
      surface: fullSurface,
      template: hasSubject ? ["subject?", "modal!"] : ["modal!"],
      reason: "Incomplete modal/desiderative span; do not accept it as a clean predicate clause without an overt or explicitly licensed complement.",
      context_requirement_status: "context_required",
      missing_argument_slots: missingSlots,
      missing_slot_details: missingSlots.map((slot) => ({ slot, license_status: "unresolved" })),
      antecedent_status: "not_observed",
      discourse_license_not_observed: true,
      subject_status: hasSubject ? "explicit" : "omitted_unlicensed",
      overt_head: modalSurface,
      particle_contribution: particles.map((node) => flattenSurface(node)),
      omission_analysis_candidates: ["complement_ellipsis", "modal_response_fragment"],
      semantic_review_flags: ["needs_context_parse", "incomplete_modal_predicate"],
      not_claims: ["not_clean_modal_vp", "not_subject_predicate_clause"]
    })
  });
}

function tokenSemanticDomains(node) {
  const tokenNode = firstToken(node);
  const bundle = tokenNode && (tokenNode.feature_bundle || (tokenNode.trace && tokenNode.trace.feature_bundle));
  return bundle && bundle.parser_features && Array.isArray(bundle.parser_features.semantic_domain)
    ? bundle.parser_features.semantic_domain
    : [];
}

const OVERT_OBJECT_SELECTION_REVIEW_TYPES = new Set(["PerfectiveVP", "PostverbalZoPerfectiveVP", "TransitiveVP", "CompletionVP", "ProductiveVO"]);

function assignedConstructionChild(node, slotNames = []) {
  if (!node || node.kind !== "construction") return null;
  const trace = node.trace || {};
  const assignedSlots = Array.isArray(trace.assigned_slots) ? trace.assigned_slots : [];
  const wanted = new Set(slotNames || []);
  for (let index = 0; index < assignedSlots.length; index += 1) {
    if (wanted.has(assignedSlots[index])) return (node.children || [])[index] || null;
  }
  return null;
}

function nominalSelectionHeadToken(node) {
  const rows = flattenNodes([node]).filter((row) => row.kind === "token");
  const candidates = rows.filter((row) => {
    const slots = row.slots || [];
    if (["func", "particle", "measure_word"].includes(row.role || "")) return false;
    return slots.some((slot) => ["head_noun", "object", "np", "topic"].includes(slot));
  });
  return candidates.length ? candidates[candidates.length - 1] : null;
}

function overtObjectSelectionCompatibilityFinding(node) {
  if (!node || node.kind !== "construction" || !OVERT_OBJECT_SELECTION_REVIEW_TYPES.has(node.type)) return null;
  const predicateNode = assignedConstructionChild(node, ["action_verb", "consumption_verb", "main_verb"])
    || productiveObjectHeadToken(node);
  const objectNode = assignedConstructionChild(node, ["object", "theme"]);
  const predicateHead = firstToken(predicateNode);
  const objectHead = nominalSelectionHeadToken(objectNode);
  if (!predicateHead || !objectHead) return null;
  const objectDomains = tokenSemanticDomains(objectHead);
  const compatibility = topicChainAntecedentCompatibility({ semantic_domains: objectDomains }, predicateHead);
  if (compatibility.status !== "incompatible") return null;
  return {
    construction: node,
    predicate_head: predicateHead,
    object_node: objectNode,
    object_head: objectHead,
    compatibility,
  };
}

function overtObjectSelectionReviewCandidate(core = []) {
  if (core.length === 1 && core[0] && core[0].kind === "construction" && core[0].type === "NeedsContext") return null;
  let finding = null;
  const inspect = (node) => {
    if (!node || finding) return;
    if (node.kind === "construction" && OVERT_OBJECT_SELECTION_REVIEW_TYPES.has(node.type)) {
      finding = overtObjectSelectionCompatibilityFinding(node);
      // An overt-object construction represents the governing predicate-object relation.
      // Do not reinterpret nested VP material as a second independent object relation.
      return;
    }
    if (node.kind === "construction") {
      for (const child of node.children || []) inspect(child);
    }
  };
  for (const root of core || []) {
    inspect(root);
    if (finding) break;
  }
  if (!finding) return null;
  const predicateSurface = finding.predicate_head.surface || "";
  const objectSurface = flattenSurface(finding.object_node);
  const objectHeadSurface = finding.object_head.surface || objectSurface;
  const sourceSurface = (core || []).map((node) => flattenSurface(node)).join("");
  const preservedRootConstruction = core.length === 1 && core[0] && core[0].kind === "construction"
    ? core[0].type || ""
    : "";
  return construction("NeedsContext", "needs context", core, {
    slots: cleanSlots(["needs_context", "review_candidate", "clause", "predicate", "object"]),
    note: "Needs context: the overt object is structurally present, but its known semantic domain is incompatible with the predicate's high-confidence literal selection profile. A coerced or metonymic reading remains possible only with supporting context.",
    trace: traceInfo("special_ambiguity_rule", {
      surface: sourceSurface,
      rule: "high-confidence predicate selection profile + overt incompatible nominal object",
      reason: "The parser preserves the transparent VP but blocks a clean context-free clause because the overt object's known semantic domain does not satisfy the predicate's high-confidence selection profile. This is a review guard, not a claim that contextual coercion is impossible.",
      context_requirement_status: "context_required",
      missing_argument_slots: ["selectional_coercion_context"],
      missing_slot_details: [{ slot: "selectional_coercion_context", license_status: "unresolved" }],
      antecedent_status: "not_observed",
      discourse_license_not_observed: true,
      overt_predicate_surface: predicateSurface,
      overt_object_surface: objectSurface,
      overt_object_head_surface: objectHeadSurface,
      overt_object_semantic_domains: finding.compatibility.antecedent_domains || [],
      predicate_object_compatibility_status: finding.compatibility.status,
      predicate_object_compatibility_reason: finding.compatibility.reason,
      embedded_construction: finding.construction.type || "",
      preserved_root_construction: preservedRootConstruction,
      structural_preservation_status: preservedRootConstruction ? "preserved_as_review_child" : "transparent_material_preserved",
      candidate_analyses: [
        {
          analysis: "literal_predicate_object_relation",
          status: "selectionally_incompatible",
          predicate: predicateSurface,
          object: objectSurface,
        },
        {
          analysis: "coerced_or_metonymic_object_reading",
          status: "requires_supporting_context",
          predicate: predicateSurface,
          object: objectSurface,
        },
      ],
      semantic_review_flags: ["overt_object_selection_compatibility_review", "context_required_unresolved"],
      not_claims: [
        "not_clean_context_free_clause",
        "not_absolute_ungrammaticality",
        "not_hard_coded_surface_pair",
        "not_hidden_object_repair",
        "not_semantic_role_relabeling",
      ],
    }),
  });
}

function isContextuallyUnsaturatedPredicate(node) {
  if (!node) return false;
  const slots = nodeSlots(node);
  if (slots.includes("preference_predicate")) return true;
  if (slots.includes("stance_predicate")) return true;
  return nodeCanFillSlot(node, "action_verb") && tokenSemanticDomains(node).includes("consumption");
}

function incompleteContextualPredicateCandidate(core) {
  if (!core || !core.length) return null;
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (!bareCore.length) return null;
  let cursor = 0;
  const hasSubject = nodeCanFillSlot(bareCore[0], "subject");
  if (hasSubject) cursor += 1;
  let polarity = "positive";
  if (bareCore[cursor] && nodeSurfaceMatches(bareCore[cursor], ["唔", "未"])) {
    polarity = nodeSurfaceMatches(bareCore[cursor], ["未"]) ? "not_yet" : "negative";
    cursor += 1;
  }
  if (cursor !== bareCore.length - 1) return null;
  const predicate = bareCore[cursor];
  if (!isContextuallyUnsaturatedPredicate(predicate)) return null;
  const predicateSurface = flattenSurface(predicate);
  const predicateSlots = nodeSlots(predicate);
  const predicateFamily = predicateSlots.includes("preference_predicate")
    ? "preference"
    : predicateSlots.includes("stance_predicate")
      ? "cognition_or_opinion"
      : "consumption_or_activity";
  const missingSlot = predicateFamily === "preference"
    ? "preference_object_or_domain"
    : predicateFamily === "cognition_or_opinion"
      ? "content_clause"
      : "object_or_activity_domain";
  const missingSlots = [missingSlot, ...(!hasSubject ? ["subject"] : [])];
  const children = [...bareCore, ...particles];
  const reason = predicateFamily === "cognition_or_opinion"
    ? "A cognition/opinion predicate remains overt while its proposition-like content is absent; the parser records the missing content clause without fabricating it."
    : "A context-sensitive predicate remains overt while its object/domain is absent; the parser records the missing slot without fabricating its content.";
  const note = predicateFamily === "cognition_or_opinion"
    ? "Needs context: the overt cognition/opinion predicate is structurally valid, but its proposition-like content is not represented."
    : "Needs context: the overt predicate is structurally valid, but its object or activity domain is not represented.";
  const omissionCandidates = predicateFamily === "cognition_or_opinion"
    ? ["content_clause_ellipsis", "opinion_content_recovery"]
    : ["argument_drop", "predicate_repetition_answer"];
  const semanticFlags = predicateFamily === "cognition_or_opinion"
    ? ["needs_context_parse", "missing_cognition_or_opinion_content"]
    : ["needs_context_parse", "missing_predicate_domain"];
  const notClaims = predicateFamily === "cognition_or_opinion"
    ? ["not_clean_subject_predicate_clause", "not_fabricated_content_clause"]
    : ["not_clean_subject_predicate_clause", "not_fabricated_object_or_domain"];
  return construction("NeedsContext", "needs context", children, {
    slots: cleanSlots(["needs_context", "review_candidate", "predicate", "problem_span", hasSubject ? "subject" : ""]),
    note,
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "NeedsContext",
      template: hasSubject ? ["subject?", "polarity?", "predicate!", "particle?"] : ["polarity?", "predicate!", "particle?"],
      assigned_slots: [...(hasSubject ? ["subject"] : []), ...(polarity === "positive" ? [] : ["polarity"]), "predicate", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      predicate_family: predicateFamily,
      reason,
      context_requirement_status: "context_required",
      missing_argument_slots: missingSlots,
      missing_slot_details: missingSlots.map((slot) => ({ slot, license_status: "unresolved" })),
      antecedent_status: "not_observed",
      discourse_license_not_observed: true,
      subject_status: hasSubject ? "explicit" : "omitted_unlicensed",
      overt_head: predicateSurface,
      selected_alternative: polarity,
      particle_contribution: particles.map((node) => flattenSurface(node)),
      omission_analysis_candidates: omissionCandidates,
      semantic_review_flags: semanticFlags,
      not_claims: notClaims,
    }),
  });
}

function incompleteLocativeNeedsContextCandidate(core) {
  if (!core || !core.length) return null;
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (bareCore.length !== 1 && bareCore.length !== 2) return null;
  const hasSubject = bareCore.length === 2 && nodeCanFillSlot(bareCore[0], "subject");
  if (bareCore.length === 2 && !hasSubject) return null;
  const locativeNode = hasSubject ? bareCore[1] : bareCore[0];
  if (!nodeSurfaceMatches(locativeNode, ["喺"])) return null;
  if (!nodeCanFillSlot(locativeNode, "locative_marker") && !nodeCanFillSlot(locativeNode, "coverb_marker")) return null;
  const children = [...bareCore, ...particles];
  return construction("NeedsContext", "needs context", children, {
    slots: cleanSlots(["needs_context", "review_candidate", "locative_marker", "coverb_marker", "problem_span", hasSubject ? "subject" : ""]),
    note: "Needs context: 喺 needs a following location, progressive predicate, or prior discourse context.",
    trace: traceInfo("special_ambiguity_rule", {
      surface: children.map((node) => flattenSurface(node)).join(""),
      template: hasSubject ? ["subject?", "locative_marker!", "particle?"] : ["locative_marker!", "particle?"],
      reason: "Incomplete locative/coverb span; do not accept it as a clean clause without a complement.",
      context_requirement_status: "context_required",
      missing_argument_slots: ["location"],
      missing_slot_details: [{ slot: "location", license_status: "unresolved" }],
      antecedent_status: "not_observed",
      discourse_license_not_observed: true,
      subject_status: hasSubject ? "explicit" : "omitted_unlicensed",
      overt_head: flattenSurface(locativeNode),
      particle_contribution: particles.map((node) => flattenSurface(node)),
      omission_analysis_candidates: ["locative_complement_ellipsis", "deictic_location_recovery"],
      semantic_review_flags: ["needs_context_parse", "incomplete_locative_marker"],
      not_claims: ["not_clean_locative_clause", "not_coverb_frame"]
    })
  });
}

function possessiveFragmentAnswerCandidate(core) {
  if (!core || core.length !== 2) return null;
  const possessor = core[0];
  const linker = core[1];
  if (!nodeSurfaceMatches(linker, ["嘅"])) return null;
  if (!nodeCanFillSlot(possessor, "subject") && !nodeCanFillSlot(possessor, "np") && !nodeCanFillSlot(possessor, "topic")) return null;
  if (!nodeCanFillSlot(linker, "nominal_linker") && !nodeCanFillSlot(linker, "particle")) return null;
  return construction("FragmentAnswer", "fragment answer", core, {
    slots: ["fragment_answer", "possessive_fragment", "answer_fragment", "np", "subject", "nominal_linker"],
    note: "Possessive answer fragment: possessor + 嘅 is valid as a short answer whose head noun comes from context.",
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "FragmentAnswer",
      fragment_subtype: "possessive_answer",
      template: ["possessor!", "nominal_linker!"],
      assigned_slots: ["possessor", "nominal_linker"],
      surfaces: core.map((node) => flattenSurface(node)),
      reason: "Treat possessor + 嘅 as a context-dependent answer fragment, not a full clean NominalHeadSpan.",
      context_requirement_status: "context_required",
      missing_argument_slots: ["nominal_head"],
      missing_slot_details: [{ slot: "nominal_head", license_status: "unresolved" }],
      antecedent_status: "not_observed",
      discourse_license_not_observed: true,
      antecedent_required: true,
      overt_head: "嘅",
      omission_analysis_candidates: ["nominal_head_ellipsis"],
      semantic_review_flags: ["fragment_answer_parse", "context_dependent_possessive_fragment"],
      not_claims: ["not_full_np_without_context", "not_silent_head_noun_insertion"]
    })
  });
}

function mandarinReviewNeedsContextCandidate(core) {
  if (!core || !core.length) return null;
  const parserSurface = core.map((node) => flattenSurface(node)).join("");
  const displaySurface = core.map((node) => flattenDisplaySurface(node)).join("");
  const tokenSurfaces = core.flatMap((node) => {
    const t = firstToken(node);
    return [flattenSurface(node), flattenDisplaySurface(node), t && t.surface, t && t.display_surface].filter(Boolean);
  });
  const startsWithMeiYou = parserSurface.startsWith("没有") || displaySurface.startsWith("没有")
    || (core.length >= 2 && nodeSurfaceMatches(core[0], ["没"]) && nodeSurfaceMatches(core[1], ["有"]));
  const hasMandarinThirdPerson = tokenSurfaces.includes("他") || tokenSurfaces.includes("她") || tokenSurfaces.includes("它");
  const hasShi = tokenSurfaces.includes("是");
  const hasGeiTa = parserSurface.startsWith("给他") || displaySurface.startsWith("给他")
    || parserSurface.startsWith("畀他") || displaySurface.startsWith("畀他");
  if (!startsWithMeiYou && !hasMandarinThirdPerson && !hasShi && !hasGeiTa) return null;
  return construction("NeedsContext", "needs context", core, {
    slots: ["needs_context", "review_candidate", "problem_span"],
    note: "Needs review: this row contains Mandarin/Standard Chinese material that Canto Span should not silently translate into Cantonese.",
    trace: traceInfo("special_ambiguity_rule", {
      surface: parserSurface,
      display_surface: displaySurface,
      reason: "Raw-first parser-shadow policy: Mandarin/Standard Chinese review rows stay NeedsContext instead of becoming clean Cantonese parses.",
      semantic_review_flags: ["needs_context_parse", "mandarin_review_row"],
      triggers: cleanSlots([
        startsWithMeiYou ? "mandarin_meiyou" : "",
        hasMandarinThirdPerson ? "mandarin_third_person_pronoun" : "",
        hasShi ? "mandarin_copula_shi" : "",
        hasGeiTa ? "mandarin_gei_ta_transfer" : ""
      ]),
      not_claims: [
        "not_silent_mandarin_to_cantonese_conversion",
        "not_parser_shadow_repair",
        "not_clean_productive_vo"
      ]
    })
  });
}

function fragmentQuestionFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (!bareCore.length || bareCore.length > 2) return null;
  const marker = bareCore[bareCore.length - 1];
  if (!isToken(marker, "呢")) return null;
  const topic = bareCore.length === 2 ? bareCore[0] : null;
  if (topic && !nodeCanFillSlot(topic, "subject") && !nodeCanFillSlot(topic, "topic") && !nodeCanFillSlot(topic, "np")) return null;
  const markerChild = parserInactiveTokenClone(marker, {
    label: "func", pos: "function", syntax: "discourse_fragment_question",
    jyutping: "ne1",
    note: "what about…? / and…?",
    slots: ["question_fragment", "discourse_fragment"],
    reason: "Standalone 呢 is interpreted as a context-dependent 'what about...?' fragment question, not as a demonstrative determiner.",
  });
  const topicChildren = topic ? [parserInactiveTokenClone(topic, {
    label: (firstToken(topic) && firstToken(topic).label) || "who",
    pos: "np",
    syntax: "topic_return_fragment",
    slots: ["topic", "np"],
    reason: "The overt NP/pronoun is the visible topic returned to the prior discourse question.",
  })] : [];
  const children = [...topicChildren, markerChild, ...particles];
  return construction("FragmentQuestion", "FragmentQ", children, {
    note: "Context-dependent fragment question headed by standalone 呢.",
    slots: cleanSlots(["fragment_question", "question_fragment", "discourse_fragment", "clause", ...templateDerivedSlots("FragmentQuestion", children)]),
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "FragmentQuestion", template_family: "generative_template",
      template: ["topic_return?", "fragment_question_marker!", "particle?"], assigned_slots: [...topicChildren.map(() => "topic_return"), "fragment_question_marker", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "Standalone 呢 conventionally asks for a context-supplied topic or alternative.",
      context_requirement_status: "context_required",
      missing_argument_slots: [topic ? "contrast_set_or_predicate" : "topic_or_alternative"],
      missing_slot_details: [{ slot: topic ? "contrast_set_or_predicate" : "topic_or_alternative", license_status: "unresolved" }],
      antecedent_status: "not_observed",
      discourse_license_not_observed: true,
      antecedent_required: true,
      topic_return: true,
      topic_return_surface: topic ? flattenSurface(topic) : "",
      omission_analysis_candidates: ["fragment_question", "topic_return_ellipsis"],
      semantic_review_flags: ["needs_context_parse", "fragment_question_context_required"],
      not_claims: ["not_complete_polar_question", "not_demonstrative_np"],
    }),
  });
}



function sourceMotionClauseFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const offset = bareCore.length >= 4 && nodeCanFillSlot(bareCore[0], "subject") ? 1 : 0;
  if (bareCore.length - offset < 3) return null;
  const sourceMarker = bareCore[offset];
  const sourceLocation = bareCore[offset + 1];
  const motionCore = bareCore.slice(offset + 2);
  if (!nodeSurfaceMatches(sourceMarker, ["由"]) || !nodeCanFillSlot(sourceLocation, "location")) return null;

  const treeCanFillSlot = (node, slot) => {
    if (!node) return false;
    if (nodeCanFillSlot(node, slot)) return true;
    return node.kind === "construction" && (node.children || []).some((child) => treeCanFillSlot(child, slot));
  };
  const wrappedMotion = applyConstructionPatterns(motionCore);
  if (wrappedMotion.length !== 1) return null;
  let motionNode = wrappedMotion[0];

  // Conventional institutional destinations such as 返學 may be stored in the
  // inherited lexicon as a transparent V–O unit. Inside an overt source-motion
  // frame, reinterpret only the visible roles: 返 remains the motion verb and
  // 學 is the conventional destination/domain. No hidden school/place token is
  // inserted, and unrelated ProductiveVO compounds keep their accepted parse.
  if (motionNode.kind === "construction"
      && motionNode.type === "ProductiveVO"
      && flattenSurface(motionNode) === "返學"
      && (motionNode.children || []).length === 2) {
    const [movement, destination] = motionNode.children;
    const motionChildren = [
      motionEventPartClone(movement, {
        label: "doing",
        syntax: "conventional_motion_goal_verb",
        slots: ["movement_verb"],
        reason: "返 is the overt motion predicate in the conventional destination expression 返學.",
      }),
      motionEventPartClone(destination, {
        label: "where",
        syntax: "conventional_institutional_destination schooling_destination",
        slots: ["goal", "location", "np", "head_noun"],
        reason: "學 denotes the overt conventional schooling destination/domain after motion 返 in this source-motion frame; no hidden 學校 token is inserted.",
      }),
    ];
    motionNode = construction("MotionGoalVP", "MotionGoal", motionChildren, {
      slots: constructionSlotsByType("MotionGoalVP", motionChildren),
      trace: traceInfo("generative_template", {
        construction_type: "MotionGoalVP",
        template_family: "generative_template",
        template: ["movement_verb!", "conventional_institutional_destination!"],
        assigned_slots: ["movement_verb", "goal"],
        surfaces: motionChildren.map(flattenSurface),
        motion_goal_subtype: "conventional_institutional_destination",
        not_claims: ["not_productive_transitive_object", "not_hidden_school_location", "not_lexicalized_whole_clause"],
      }),
    });
  }

  if (!treeCanFillSlot(motionNode, "directional_motion_vp")
      && !treeCanFillSlot(motionNode, "movement_verb")) return null;
  const sourceChild = parserInactiveTokenClone(sourceMarker, {
    label: "func", pos: "function", syntax: "source_coverb source_marker",
    slots: ["source_marker", "coverb_marker"], reason: "由 introduces the source location of the motion event.",
  });
  const locationChild = parserInactiveTokenClone(sourceLocation, {
    label: "where", pos: "location", syntax: `${sourceLocation.syntax || "place_np"} source_location`,
    slots: ["source", "location", "np"], reason: "Place NP interpreted as the source of motion after 由.",
  });
  const children = [...bareCore.slice(0, offset), sourceChild, locationChild, motionNode, ...particles];
  return construction("SourceMotionClause", "SourceMotion", children, {
    note: "Source-motion clause: optional subject + 由 + source location + motion predicate.",
    slots: cleanSlots(["source_motion_clause", "source", "source_marker", "location", "movement_verb", "directional_motion_vp", "vp", "predicate", "clause", offset ? "subject" : "", ...templateDerivedSlots("SourceMotionClause", children)]),
    trace: traceInfo("generative_template", {
      construction_type: "SourceMotionClause", template_family: "generative_template",
      template: ["subject?", "source_marker!", "source_location!", "motion_predicate!", "particle?"],
      assigned_slots: [...bareCore.slice(0, offset).map(() => "subject"), "source_marker", "source_location", "motion_predicate", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "The source coverb phrase is attached to the motion predicate so the full clause span remains visible and the location keeps its where role.",
    }),
  });
}

function protectedConditionalMarkerToken() {
  return token("嘅話", {
    label: "func",
    pos: "function",
    jyutping: "ge3 waa6",
    syntax: "conditional_marker protected_formula",
    slots: ["conditional_marker"],
    note: "if / in the case that",
    review: "protected_formula",
    trace: traceInfo("protected_formula_table", {
      surface: "嘅話",
      formula_type: "conditional_marker",
      reason: "嘅話 is a conventional two-character conditional marker. It stays grouped for learner display while the preceding predicate and the full ConditionalClause remain productive and transparent.",
      not_claims: ["not_formula_discourse_unit", "not_reported_speech", "not_whole_clause_lexicalization"],
    }),
  });
}

function conditionalGeWaaClauseFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (bareCore.length < 2) return null;

  let predicateNodes = [];
  let markerChildren = [];
  const finalNode = bareCore[bareCore.length - 1];
  if (isToken(finalNode, "嘅話")) {
    predicateNodes = bareCore.slice(0, -1);
    markerChildren = [protectedConditionalMarkerToken()];
  } else if (bareCore.length >= 3) {
    const ge = bareCore[bareCore.length - 2];
    const waa = bareCore[bareCore.length - 1];
    if (!isToken(ge, "嘅") || !isToken(waa, "話")) return null;
    predicateNodes = bareCore.slice(0, -2);
    markerChildren = [protectedConditionalMarkerToken()];
  } else {
    return null;
  }

  if (predicateNodes.length !== 1) return null;
  const predicate = predicateNodes[0];
  const predicateSurface = flattenSurface(predicate);
  const predicateSlots = nodeSlots(predicate);
  const licensedPredicate = ["有", "冇", "得"].includes(predicateSurface)
    || predicateSlots.some((slot) => ["predicate", "vp", "action_vp", "stative_predicate", "existential", "negated_existential", "acceptability_predicate"].includes(slot));
  if (!licensedPredicate) return null;

  const predicateChild = predicate.kind === "token"
    ? parserInactiveTokenClone(predicate, {
      label: predicate.label || "func",
      pos: (predicate.features && predicate.features.pos) || "function",
      syntax: `${predicate.syntax || "predicate"} conditional_antecedent_predicate`,
      slots: cleanSlots([...(predicate.slots || []), "conditional_antecedent", "conditional_antecedent_predicate", "predicate"]),
      reason: "The predicate is the overt antecedent inside a predicate + 嘅話 conditional clause.",
    })
    : predicate;
  const children = [predicateChild, ...markerChildren, ...particles];
  return construction("ConditionalClause", "IfClause", children, {
    slots: cleanSlots(["conditional_clause", "condition_clause", "conditional_antecedent", "conditional_marker", "predicate", "clause"]),
    note: "Conditional antecedent clause formed by a productive predicate plus the protected marker 嘅話. A following result clause is required unless discourse supplies it.",
    trace: traceInfo("generative_template", {
      construction_type: "ConditionalClause",
      template_family: "generative_template",
      template: ["conditional_antecedent_predicate!", "protected_conditional_marker!", "particle?"],
      assigned_slots: ["conditional_antecedent_predicate", "conditional_marker", ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      conditional_marker_surface: "嘅話",
      conditional_marker_trace: "protected_formula_table",
      context_requirement_status: "context_required",
      missing_argument_slots: ["result_clause"],
      missing_slot_details: [{ slot: "result_clause", license_status: "unresolved" }],
      antecedent_status: "not_applicable",
      reason: "Predicate + 嘅話 is productive. The marker is protected as one learner-visible functional unit so its internal 話 cannot leak the unrelated speech-verb gloss.",
      not_claims: ["not_reported_speech", "not_sentence_final_particle_use", "not_complete_condition_result_without_result", "not_whole_clause_protected_formula"],
    }),
  });
}


function compositionPartClone(node, overrides = {}) {
  const surface = flattenSurface(node);
  const base = firstToken(node) || token(surface);
  return parserInactiveTokenClone(base, {
    label: overrides.label || base.label || "func",
    pos: overrides.pos || (overrides.label === "doing" ? "verb" : overrides.label === "what" ? "noun" : overrides.label === "measure_word" ? "classifier" : "function"),
    syntax: overrides.syntax || base.syntax || "composition_part",
    slots: overrides.slots || [],
    reason: overrides.reason || "Visible token is owned by a transparent aspect/result/directional composition; no hidden material is inserted.",
  });
}

function durativeAspectCompositionFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length !== 3 || !nodeCanFillSlot(compact[0], "action_verb") || flattenSurface(compact[1]) !== "住") return null;
  if (!nodeCanFillSlot(compact[2], "object") && !nodeCanFillSlot(compact[2], "head_noun") && !nodeCanFillSlot(compact[2], "np")) return null;
  const marker = parserInactiveTokenClone(firstToken(compact[1]) || token("住"), {
    label: "func", pos: "function", syntax: "durative_aspect", slots: ["durative_aspect", "aspect_marker"], jyutping: "zyu6",
    note: "住 marks the continuing wearing/resultant state, distinct from progressive 緊.",
    reason: "住 is interpreted as durative aspect only inside the licensed action + 住 + object pattern.",
  });
  const children = [compact[0], marker, compact[2], ...particles];
  return construction("DurativeVP", "DurativeVP", children, {
    slots: constructionSlotsByType("DurativeVP", children),
    trace: traceInfo("generative_template", {
      construction_type: "DurativeVP", template_family: "generative_template",
      template: ["action_verb!", "durative_aspect!", "object!", "particle?"],
      assigned_slots: ["action_verb", "durative_aspect", "object", ...particles.map(() => "particle")],
      surfaces: children.map(flattenSurface), aspect_type: "durative_continuing_state",
      not_claims: ["not_progressive_event", "not_global_住_lexicalization"],
    }),
  });
}

function perfectiveResultCompositionFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  let cursor = 0;
  const subject = compact[cursor] && nodeCanFillSlot(compact[cursor], "subject") ? compact[cursor++] : null;
  if (compact.length - cursor !== 4) return null;
  const [action, result, aspect, object] = compact.slice(cursor);
  if (!nodeCanFillSlot(action, "action_verb") || !nodeCanFillSlot(aspect, "perfective_aspect")) return null;
  if (!nodeCanFillSlot(object, "object") && !nodeCanFillSlot(object, "head_noun") && !nodeCanFillSlot(object, "np")) return null;
  const resultSurface = flattenSurface(result);
  if (!nodeCanFillSlot(result, "completion_marker") && resultSurface !== "好") return null;
  const innerType = resultSurface === "好" ? "ResultComplementVP" : "CompletionVP";
  const inner = construction(innerType, resultSurface === "好" ? "ResultVP" : "CompletionVP", [
    action,
    compositionPartClone(result, {
      label: resultSurface === "好" ? "how" : "func",
      syntax: resultSurface === "好" ? "result_state_complement" : "completion_result_complement",
      slots: resultSurface === "好" ? ["result_complement"] : ["completion_marker", "result_complement"],
      reason: `${resultSurface} is the overt result/phase complement formed with the action before perfective 咗 scopes over the complex predicate.`,
    }),
  ], {
    slots: cleanSlots([innerType === "CompletionVP" ? "completion_vp" : "result_complement_vp", "result_complement", "vp", "action_vp", "predicate"]),
    note: "Inner result/phase predicate formed before perfective aspect.",
    trace: traceInfo("generative_template", {
      construction_type: innerType,
      template_family: "generative_template",
      template: ["action_verb!", "result_or_phase_complement!"],
      assigned_slots: ["action_verb", "result_complement"],
      surfaces: [flattenSurface(action), resultSurface],
      aspect_scope_status: "inside_perfective_scope",
    }),
  });
  const perfective = construction("PerfectiveVP", "PerfectiveVP", [
    inner,
    compositionPartClone(aspect, { label: "func", syntax: "perfective_aspect", slots: ["perfective_aspect", "aspect_marker"] }),
    object,
    ...particles,
  ], {
    slots: cleanSlots(["perfective_vp", "vp", "action_vp", "predicate", "perfective_aspect", "object"]),
    note: "Perfective aspect scopes over an already formed result/phase predicate while surface order remains unchanged.",
    trace: traceInfo("generative_template", {
      construction_type: "PerfectiveVP",
      template_family: "generative_template",
      template: ["result_or_phase_vp!", "perfective_aspect!", "object!", "particle?"],
      assigned_slots: ["predicate", "perfective_aspect", "object", ...particles.map(() => "particle")],
      surfaces: [flattenSurface(inner), flattenSurface(aspect), flattenSurface(object), ...particles.map(flattenSurface)],
      aspect_scope_status: "perfective_over_result_complex",
      not_claims: ["not_flat_aspect_stack", "not_hidden_object"],
    }),
  });
  if (!subject) return perfective;
  const children = [subject, perfective];
  return construction("SubjectPredicateClause", "SubjPred", children, {
    slots: templateDerivedSlots("SubjectPredicateClause", children),
    trace: traceInfo("generative_template", { construction_type: "SubjectPredicateClause", template_family: "generative_template", template: ["subject!", "predicate!"], assigned_slots: ["subject", "predicate"], surfaces: children.map(flattenSurface) }),
  });
}

function directionalComplexPart(node, semanticSlot) {
  const surface = flattenSurface(node);
  const syntax = {
    "行": "main_motion_verb", "攞": "caused_motion_action", "入": "movement_direction_in", "出": "movement_direction_out",
    "返": "return_directional_complement", "過": "path_across_component", "嚟": "deictic_motion_marker_toward", "去": "deictic_motion_marker_away",
    "緊": "progressive_aspect", "咗": "perfective_aspect", "得": "potential_marker", "唔": "potential_negator",
  }[surface] || "directional_composition_part";
  const label = ["緊", "咗", "得", "唔"].includes(surface) ? "func" : "doing";
  return compositionPartClone(node, { label, syntax, slots: [semanticSlot], reason: `${surface} is overt and owned by the directional complex in source order.` });
}

function directionalCompositionFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  const surfaces = compact.map(flattenSurface);
  const finish = (type, label, nodes, detail = {}) => construction(type, label, [...nodes, ...particles], {
    slots: constructionSlotsByType(type, nodes),
    note: "Transparent Cantonese directional composition with path, potential/aspect, and final deixis represented in one predicate.",
    trace: traceInfo("generative_template", {
      construction_type: type,
      template_family: "generative_template",
      template: detail.template || [],
      assigned_slots: detail.assigned_slots || [],
      surfaces: nodes.map(flattenSurface),
      directional_subtype: detail.directional_subtype || "",
      deictic_position_status: "outermost_visible_deictic",
      not_claims: ["not_hidden_path", "not_hidden_subject", "not_reordered_surface"],
    }),
  });

  if (surfaces.length === 3 && surfaces[0] === "行" && ["入", "出"].includes(surfaces[1]) && ["嚟", "去"].includes(surfaces[2])) {
    return finish("DirectionalMotionVP", "MotionVP", [directionalComplexPart(compact[0], "movement_verb"), directionalComplexPart(compact[1], "movement_direction"), directionalComplexPart(compact[2], "deictic_motion_marker")], { template: ["movement_verb!", "movement_direction!", "deictic_motion_marker!"], assigned_slots: ["movement_verb", "movement_direction", "deictic_motion_marker"], directional_subtype: "self_motion_path_deictic" });
  }
  if (surfaces.join("") === "行返過嚟") {
    return finish("DirectionalMotionVP", "MotionVP", compact.map((n, i) => directionalComplexPart(n, ["movement_verb", "return_motion_verb", "path_component", "deictic_motion_marker"][i])), { template: ["movement_verb!", "return_motion_verb!", "path_component!", "deictic_motion_marker!"], assigned_slots: ["movement_verb", "return_motion_verb", "path_component", "deictic_motion_marker"], directional_subtype: "return_path_deictic" });
  }
  if (surfaces.length === 3 && ["入", "落", "上", "出"].includes(surfaces[0]) && surfaces[1] === "咗" && ["嚟", "去"].includes(surfaces[2])) {
    return finish("PerfectiveDirectionalVP", "PerfMotion", [directionalComplexPart(compact[0], "movement_direction"), directionalComplexPart(compact[1], "perfective_aspect"), directionalComplexPart(compact[2], "deictic_motion_marker")], { template: ["directional_head!", "perfective_aspect!", "deictic_motion_marker!"], assigned_slots: ["movement_direction", "perfective_aspect", "deictic_motion_marker"], directional_subtype: "perfective_directional" });
  }
  if (surfaces.length === 4 && surfaces[0] === "行" && surfaces[1] === "緊" && ["入", "出"].includes(surfaces[2]) && ["嚟", "去"].includes(surfaces[3])) {
    return finish("ProgressiveDirectionalVP", "ProgMotion", [directionalComplexPart(compact[0], "movement_verb"), directionalComplexPart(compact[1], "progressive_aspect"), directionalComplexPart(compact[2], "movement_direction"), directionalComplexPart(compact[3], "deictic_motion_marker")], { template: ["movement_verb!", "progressive_aspect!", "movement_direction!", "deictic_motion_marker!"], assigned_slots: ["movement_verb", "progressive_aspect", "movement_direction", "deictic_motion_marker"], directional_subtype: "progressive_path_deictic" });
  }
  if (surfaces.length === 4 && nodeCanFillSlot(compact[0], "action_verb") && ["得", "唔"].includes(surfaces[1]) && ["入", "出", "返"].includes(surfaces[2]) && ["嚟", "去"].includes(surfaces[3])) {
    const positive = surfaces[1] === "得";
    const type = positive ? "PotentialDirectionalVP" : "NegativePotentialDirectionalVP";
    return finish(type, positive ? "PotentialMotion" : "NegPotentialMotion", [directionalComplexPart(compact[0], surfaces[0] === "行" ? "movement_verb" : "action_verb"), directionalComplexPart(compact[1], positive ? "potential_marker" : "negator"), directionalComplexPart(compact[2], surfaces[2] === "返" ? "return_motion_verb" : "movement_direction"), directionalComplexPart(compact[3], "deictic_motion_marker")], { template: ["action_or_motion_verb!", positive ? "potential_marker!" : "potential_negator!", "directional_complement!", "deictic_motion_marker!"], assigned_slots: [surfaces[0] === "行" ? "movement_verb" : "action_verb", positive ? "potential_marker" : "negator", surfaces[2] === "返" ? "return_motion_verb" : "movement_direction", "deictic_motion_marker"], directional_subtype: positive ? "positive_potential_directional" : "negative_potential_directional" });
  }
  return null;
}

function restorativeRepetitiveComplementFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length < 3 || !nodeCanFillSlot(compact[0], "action_verb") || !isToken(compact[1], "返")) return null;
  const action = compact[0];
  const marker = (reading) => compositionPartClone(compact[1], {
    label: "func",
    syntax: reading === "restorative"
      ? "restorative_complement_marker"
      : "repetitive_resumptive_complement_marker",
    slots: reading === "restorative"
      ? ["verb_complement", "restorative_complement"]
      : ["verb_complement", "repetitive_complement"],
    reason: reading === "restorative"
      ? "返 marks restoration of a prior or expected state here; it is not literal return motion."
      : "返 marks repetition or resumption of the overt action here; it is not literal return motion.",
  });
  const thirdSurface = flattenSurface(compact[2]);
  if (thirdSurface === "好" && compact.length === 3) {
    const children = [action, marker("restorative"), compositionPartClone(compact[2], { label: "how", syntax: "restored_result_state", slots: ["result_complement"] }), ...particles];
    return construction("RestorativeComplementVP", "RestoreVP", children, { slots: constructionSlotsByType("RestorativeComplementVP", children), trace: traceInfo("generative_template", { construction_type: "RestorativeComplementVP", template_family: "generative_template", template: ["action_verb!", "restorative_complement!", "result_state!", "particle?"], assigned_slots: ["action_verb", "restorative_complement", "result_complement", ...particles.map(() => "particle")], surfaces: children.map(flattenSurface), return_reading: "restorative", not_claims: ["not_literal_return_motion", "not_generic_aspect"] }) });
  }
  if (compact.length === 3 && (nodeCanFillSlot(compact[2], "frequency_quantity") || /(^|\s)frequency_quantity(\s|$)/.test((firstToken(compact[2]) || {}).syntax || ""))) {
    const children = [action, marker("repetitive"), compact[2], ...particles];
    return construction("RepetitiveComplementVP", "RepeatVP", children, { slots: constructionSlotsByType("RepetitiveComplementVP", children), trace: traceInfo("generative_template", { construction_type: "RepetitiveComplementVP", template_family: "generative_template", template: ["action_verb!", "repetitive_complement!", "frequency_quantity!", "particle?"], assigned_slots: ["action_verb", "repetitive_complement", "frequency_quantity", ...particles.map(() => "particle")], surfaces: children.map(flattenSurface), return_reading: "repetitive_or_resumptive", not_claims: ["not_literal_return_motion", "not_generic_aspect"] }) });
  }
  if (compact.length === 4) {
    const object = classifierObjectNPFromNodes(compact.slice(2));
    if (object) {
      const actionSlots = new Set(nodeSlots(action));
      const actionSyntax = String((firstToken(action) || {}).syntax || "");
      const licensesResumptiveObjectReading = actionSlots.has("consumption_verb")
        || actionSyntax.includes("chain_select_perception")
        || actionSyntax.includes("chain_select_discourse_content");
      const reading = licensesResumptiveObjectReading ? "repetitive" : "underdetermined";
      const returnPart = reading === "repetitive"
        ? marker("repetitive")
        : compositionPartClone(compact[1], {
          label: "func",
          syntax: "return_or_resumptive_complement_marker",
          slots: ["verb_complement"],
          reason: "返 is a non-finite complement marker here. Available evidence does not force literal motion or a repetitive reading.",
        });
      const children = [action, returnPart, object, ...particles];
      const type = reading === "repetitive" ? "RepetitiveComplementVP" : "VerbComplementVP";
      const label = reading === "repetitive" ? "RepeatVP" : "VerbCompVP";
      return construction(type, label, children, {
        slots: constructionSlotsByType(type, children),
        trace: traceInfo("generative_template", {
          construction_type: type,
          template_family: "generative_template",
          template: ["action_verb!", reading === "repetitive" ? "repetitive_complement!" : "return_or_resumptive_complement!", "object!", "particle?"],
          assigned_slots: ["action_verb", reading === "repetitive" ? "repetitive_complement" : "verb_complement", "object", ...particles.map(() => "particle")],
          surfaces: children.map(flattenSurface),
          return_reading: reading === "repetitive" ? "repetitive_or_resumptive" : "context_underdetermined_return_or_resumptive",
          not_claims: reading === "repetitive"
            ? ["not_literal_return_motion", "not_generic_aspect"]
            : ["not_forced_literal_return_motion", "not_forced_repetitive_reading", "not_generic_aspect"],
        }),
      });
    }
  }
  return null;
}

function purposeLinkingMotionFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length !== 5 || !nodeCanFillSlot(compact[0], "action_verb") || !["嚟", "去"].includes(flattenSurface(compact[3])) || !nodeCanFillSlot(compact[4], "action_verb")) return null;
  const object = categorySubspanFor(compact.slice(1, 3), ["DiMarkedNP", "ClassifierObjectNP", "ModifiedNP", "NominalHeadSpan"]);
  if (!object) return null;
  const action = categorySubspanFor([compact[0], object], ["ProductiveVO", "TransitiveVP"]) || construction("ProductiveVO", "VO", [compact[0], object], { slots: ["productive_vo", "vp", "action_vp", "predicate", "object"], trace: traceInfo("generative_template", { construction_type: "ProductiveVO", template_family: "generative_template", template: ["action_verb!", "object!"], assigned_slots: ["action_verb", "object"], surfaces: [flattenSurface(compact[0]), flattenSurface(object)] }) });
  const linker = compositionPartClone(compact[3], { label: "func", syntax: "purpose_linking_motion_element", slots: ["purpose_linker"], reason: `${flattenSurface(compact[3])} links the overt acquisition/action event to the following purpose predicate.` });
  const purpose = compositionPartClone(compact[4], { label: "doing", syntax: "purpose_verb", slots: ["purpose_verb", "action_verb", "predicate"] });
  const children = [action, linker, purpose, ...particles];
  return construction("SerialVerbPurposeChain", "PurposeChain", children, {
    slots: constructionSlotsByType("SerialVerbPurposeChain", children),
    trace: traceInfo("generative_template", { construction_type: "SerialVerbPurposeChain", template_family: "generative_template", template: ["action_object_vp!", "purpose_linking_motion_element!", "purpose_verb!", "particle?"], assigned_slots: ["productive_vo", "purpose_linker", "purpose_verb", ...particles.map(() => "particle")], surfaces: children.map(flattenSurface), purpose_linker_surface: flattenSurface(compact[3]), not_claims: ["not_deictic_motion_vp", "not_hidden_object", "not_hidden_purpose"] }),
  });
}


function motionEventPartClone(node, { label = "doing", syntax = "motion_event_part", slots = [], reason = "Visible motion-event material is assigned by its position and event-semantic role." } = {}) {
  const surface = flattenSurface(node);
  const base = firstToken(node) || token(surface, { jyutping: "" });
  return parserInactiveTokenClone(base, {
    label,
    pos: label === "where" ? "location" : label === "when" ? "time" : label === "func" ? "function" : "verb",
    syntax,
    slots,
    reason,
  });
}

function motionSubjectPredicateClause(subject, predicate, particles = [], detail = {}) {
  if (!subject) return predicate;
  const children = [subject, predicate, ...particles];
  return construction("SubjectPredicateClause", "SubjPred", children, {
    slots: templateDerivedSlots("SubjectPredicateClause", children),
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!", "particle?"],
      assigned_slots: ["subject", "predicate", ...particles.map(() => "particle")],
      surfaces: children.map(flattenSurface),
      ...detail,
    }),
  });
}

function motionGoalNode(node, reason = "The postverbal place is the overt goal of the motion event, not an ordinary object.") {
  return motionEventPartClone(node, {
    label: "where",
    syntax: `${(firstToken(node) || {}).syntax || "place_or_goal"} motion_goal_location`,
    slots: ["goal", "location", "np", "head_noun"],
    reason,
  });
}

function motionOrderingReviewCandidate(children, subtype, problem, expectedRepairs = [], options = {}) {
  const family = options.family || "motion_event_ordering_or_attachment";
  const reviewFlag = options.review_flag || "motion_event_order_or_attachment_review";
  const missingSlot = options.missing_slot || "licensed_motion_event_order_or_attachment";
  const note = options.note || "Review-bearing motion-event ordering or attachment candidate. Visible learner text is preserved and no repair is inserted.";
  const notClaims = options.not_claims || ["not_hard_asterisk_judgment", "not_silent_reordering", "not_hidden_motion_component"];
  return construction("MalformedCandidate", "Malformed", children, {
    slots: cleanSlots(["malformed_candidate", "needs_review", "predicate", "problem_span"]),
    note,
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "MalformedCandidate",
      malformed_family: family,
      malformed_subtype: subtype,
      surfaces: children.map(flattenSurface),
      problem,
      expected_repairs: expectedRepairs,
      semantic_review_flags: ["malformed_candidate_parse", reviewFlag],
      context_requirement_status: "context_required",
      missing_argument_slots: [missingSlot],
      not_claims: notClaims,
    }),
  });
}

function motionEventSpatialFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length < 3) return null;
  const surfaces = compact.map(flattenSurface);
  let cursor = 0;
  const subject = compact[cursor] && nodeCanFillSlot(compact[cursor], "subject") ? compact[cursor++] : null;
  const rest = compact.slice(cursor);
  const rs = rest.map(flattenSurface);

  // Strong-order controls remain review-bearing rather than being silently repaired.
  if (subject && rs.length >= 4 && rs[0] === "喺" && nodeCanFillSlot(rest[1], "location") && nodeCanFillSlot(rest[2], "time")) {
    return motionOrderingReviewCandidate(
      [...compact, ...particles],
      "post_locative_time_order",
      "The temporal adjunct follows the low preverbal locative phrase before the main event.",
      ["subject_time_locative_predicate", "separate_discourse_or_native_review"],
      {
        family: "clause_adjunct_ordering_or_attachment",
        review_flag: "clause_adjunct_order_or_attachment_review",
        missing_slot: "licensed_clause_adjunct_order_or_attachment",
        note: "Review-bearing clause-adjunct ordering or attachment candidate. Visible learner text is preserved and no repair is inserted.",
        not_claims: ["not_hard_asterisk_judgment", "not_silent_reordering", "not_hidden_time_or_location"],
      }
    );
  }
  if (subject && rs.length === 3 && rs[0] === "行" && nodeCanFillSlot(rest[1], "location") && rs[2] === "去") {
    return motionOrderingReviewCandidate([...compact, ...particles], "goal_before_final_deictic", "The goal NP intervenes between the manner-motion verb and final 去 instead of following the directional predicate.", ["行去_goal", "separate_serial_event"]);
  }
  if (subject && rs.length === 3 && ["返", "行"].includes(rs[0]) && nodeCanFillSlot(rest[1], "location") && rs[2] === "到") {
    return motionOrderingReviewCandidate([...compact, ...particles], "goal_before_attainment_complement", "到 follows an already expressed goal NP instead of forming the motion-goal-attainment predicate before the goal.", ["motion_verb_到_goal"]);
  }
  if (subject && rs.length === 3 && rs[0] === "到" && rs[1] === "返" && nodeCanFillSlot(rest[2], "location")) {
    return motionOrderingReviewCandidate([...compact, ...particles], "arrival_return_order_conflict", "Main arrival 到 precedes return-motion 返 without a licensed compositional relation.", ["到咗_goal", "返到_goal", "返_goal"]);
  }
  if (subject && rs.length === 5 && ["上", "落", "入", "出"].includes(rs[0]) && nodeCanFillSlot(rest[1], "action_verb") && ["嚟", "去"].includes(rs[3]) && nodeCanFillSlot(rest[4], "action_verb")) {
    return motionOrderingReviewCandidate([...compact, ...particles], "unlicensed_motion_action_deictic_order", "A bare directional head is separated from its deictic element by an action-object event.", ["directional_complex_then_action_purpose", "separate_clause_or_native_review"]);
  }

  // Time + source + directed motion: subject + time + 由 + source + manner-motion + 去 + goal.
  if (subject && rs.length === 6 && nodeCanFillSlot(rest[0], "time") && rs[1] === "由" && nodeCanFillSlot(rest[2], "location") && rs[3] === "行" && rs[4] === "去" && nodeCanFillSlot(rest[5], "location")) {
    const directedChildren = [
      motionEventPartClone(rest[3], { label: "doing", syntax: "manner_motion_verb", slots: ["movement_verb", "manner_motion"], reason: "行 supplies the manner of self-motion." }),
      motionEventPartClone(rest[4], { label: "doing", syntax: "directional_path_element", slots: ["movement_direction", "path_component"], reason: "去 forms the postverbal directional component before the overt goal." }),
      motionGoalNode(rest[5]),
    ];
    const directed = construction("DirectedMannerMotionVP", "DirectedMotion", directedChildren, {
      slots: constructionSlotsByType("DirectedMannerMotionVP", directedChildren),
      trace: traceInfo("generative_template", { construction_type: "DirectedMannerMotionVP", template_family: "generative_template", template: ["manner_motion_verb!", "directional_element!", "goal!"], assigned_slots: ["movement_verb", "movement_direction", "goal"], surfaces: directedChildren.map(flattenSurface), not_claims: ["not_purpose_chain", "not_transitive_object"] }),
    });
    const sourceMarker = motionEventPartClone(rest[1], { label: "func", syntax: "source_coverb source_marker", slots: ["source_marker", "coverb_marker"], reason: "由 introduces the overt source of the motion event." });
    const source = motionEventPartClone(rest[2], { label: "where", syntax: "source_location", slots: ["source", "location", "np"], reason: "The place after 由 is the source, not the goal." });
    const children = [subject, rest[0], sourceMarker, source, directed, ...particles];
    return construction("SourceMotionClause", "SourceMotion", children, {
      slots: constructionSlotsByType("SourceMotionClause", children),
      trace: traceInfo("generative_template", { construction_type: "SourceMotionClause", template_family: "generative_template", template: ["subject!", "time?", "source_marker!", "source_location!", "directed_motion_vp!", "particle?"], assigned_slots: ["subject", "time", "source_marker", "source_location", "motion_predicate", ...particles.map(() => "particle")], surfaces: children.map(flattenSurface), spatial_order_status: "time_before_source_before_motion_goal" }),
    });
  }

  // Preverbal orientation/path phrase: 向 + orientation/location + manner-motion verb.
  if (subject && rs.length === 3 && rs[0] === "向" && rs[2] === "行") {
    const orientationSurface = rs[1];
    const orientation = orientationSurface === "前"
      ? token("前", { label: "where", pos: "location", jyutping: "cin4", syntax: "orientation_ground path_direction", slots: ["path", "orientation", "location"], note: "forward / front", trace: traceInfo("construction_internal_parser_inactive_clone", { reason: "前 receives a context-local orientation/path reading after 向; no global nominal lexicon entry is introduced." }) })
      : motionEventPartClone(rest[1], { label: "where", syntax: "orientation_ground path_goal", slots: ["path", "orientation", "location"], reason: "The NP after 向 is the orientation/path ground." });
    const pathChildren = [motionEventPartClone(rest[0], { label: "func", syntax: "orientation_coverb path_marker", slots: ["path_marker", "coverb_marker"], reason: "向 introduces a preverbal orientation/path phrase." }), orientation];
    const path = construction("PathPhrase", "Path", pathChildren, { slots: constructionSlotsByType("PathPhrase", pathChildren), trace: traceInfo("generative_template", { construction_type: "PathPhrase", template_family: "generative_template", template: ["path_marker!", "orientation_ground!"], assigned_slots: ["path_marker", "location"], surfaces: pathChildren.map(flattenSurface), subspan: true }) });
    const motion = motionEventPartClone(rest[2], { label: "doing", syntax: "manner_motion_verb", slots: ["movement_verb", "manner_motion", "predicate"], reason: "行 supplies the manner of motion under the preceding orientation phrase." });
    const predicate = construction("DirectedMannerMotionVP", "DirectedMotion", [path, motion], { slots: constructionSlotsByType("DirectedMannerMotionVP", [path, motion]), trace: traceInfo("generative_template", { construction_type: "DirectedMannerMotionVP", template_family: "generative_template", template: ["path_phrase!", "manner_motion_verb!"], assigned_slots: ["path_phrase", "movement_verb"], surfaces: [flattenSurface(path), flattenSurface(motion)], not_claims: ["not_postverbal_goal", "not_purpose_chain"] }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Manner motion + directional 去 + overt goal.
  if (subject && rs.length === 3 && rs[0] === "行" && rs[1] === "去" && nodeCanFillSlot(rest[2], "location")) {
    const children = [
      motionEventPartClone(rest[0], { label: "doing", syntax: "manner_motion_verb", slots: ["movement_verb", "manner_motion"], reason: "行 supplies manner of motion." }),
      motionEventPartClone(rest[1], { label: "doing", syntax: "directional_path_element", slots: ["movement_direction", "path_component"], reason: "去 is the postverbal directional element; it is not the purpose verb in this frame." }),
      motionGoalNode(rest[2]),
    ];
    const predicate = construction("DirectedMannerMotionVP", "DirectedMotion", children, { slots: constructionSlotsByType("DirectedMannerMotionVP", children), trace: traceInfo("generative_template", { construction_type: "DirectedMannerMotionVP", template_family: "generative_template", template: ["manner_motion_verb!", "directional_element!", "goal!"], assigned_slots: ["movement_verb", "movement_direction", "goal"], surfaces: children.map(flattenSurface), not_claims: ["not_purpose_chain", "not_transitive_object"] }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Manner motion + complex directional path/deixis.
  if (subject && rs.length === 3 && rs[0] === "行" && ["入", "出", "上", "落"].includes(rs[1]) && ["嚟", "去"].includes(rs[2])) {
    const children = [
      motionEventPartClone(rest[0], { label: "doing", syntax: "manner_motion_verb", slots: ["movement_verb", "manner_motion"] }),
      motionEventPartClone(rest[1], { label: "doing", syntax: "movement_direction", slots: ["movement_direction", "path_component"] }),
      motionEventPartClone(rest[2], { label: "doing", syntax: "deictic_motion_marker", slots: ["deictic_motion_marker"] }),
    ];
    const predicate = construction("DirectedMannerMotionVP", "DirectedMotion", children, { slots: constructionSlotsByType("DirectedMannerMotionVP", children), trace: traceInfo("generative_template", { construction_type: "DirectedMannerMotionVP", template_family: "generative_template", template: ["manner_motion_verb!", "movement_direction!", "deictic_motion_marker!"], assigned_slots: ["movement_verb", "movement_direction", "deictic_motion_marker"], surfaces: children.map(flattenSurface), deictic_position_status: "outermost_visible_deictic" }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Main directional verb + final deixis, preserving both overt pieces.
  if (subject && rs.length === 2 && ["上", "落", "入", "出", "返"].includes(rs[0]) && ["嚟", "去"].includes(rs[1])) {
    const children = [motionEventPartClone(rest[0], { label: "doing", syntax: "main_directional_verb", slots: ["movement_verb", "movement_direction"] }), motionEventPartClone(rest[1], { label: "doing", syntax: "deictic_motion_marker", slots: ["deictic_motion_marker"] })];
    const predicate = construction("DirectionalMotionVP", "MotionVP", children, { slots: constructionSlotsByType("DirectionalMotionVP", children), trace: traceInfo("generative_template", { construction_type: "DirectionalMotionVP", template_family: "generative_template", template: ["directional_head!", "deictic_motion_marker!"], assigned_slots: ["movement_direction", "deictic_motion_marker"], surfaces: children.map(flattenSurface), deictic_position_status: "outermost_visible_deictic" }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Motion goal-attainment: 返/行 + 到 + goal.
  if (subject && rs.length === 3 && ["返", "行"].includes(rs[0]) && rs[1] === "到" && nodeCanFillSlot(rest[2], "location")) {
    const children = [motionEventPartClone(rest[0], { label: "doing", syntax: "movement_verb", slots: ["movement_verb", "main_verb"] }), motionEventPartClone(rest[1], { label: "func", syntax: "goal_attainment_complement", slots: ["goal_attainment_complement", "result_marker"], reason: "到 marks successful arrival/attainment before the overt goal." }), motionGoalNode(rest[2])];
    const predicate = construction("GoalAttainmentMotionVP", "GoalAttainment", children, { slots: constructionSlotsByType("GoalAttainmentMotionVP", children), trace: traceInfo("generative_template", { construction_type: "GoalAttainmentMotionVP", template_family: "generative_template", template: ["movement_verb!", "goal_attainment_complement!", "goal!"], assigned_slots: ["movement_verb", "result_marker", "goal"], surfaces: children.map(flattenSurface), attainment_domain: "spatial_goal" }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Main arrival verb 到 + perfective + goal.
  if (subject && rs.length === 3 && rs[0] === "到" && rs[1] === "咗" && nodeCanFillSlot(rest[2], "location")) {
    const children = [motionEventPartClone(rest[0], { label: "doing", syntax: "arrival_motion_verb", slots: ["movement_verb", "main_verb", "predicate"], reason: "到 is the main arrival verb here, not a postverbal result marker." }), motionEventPartClone(rest[1], { label: "func", syntax: "perfective_aspect", slots: ["perfective_aspect", "aspect_marker"] }), motionGoalNode(rest[2])];
    const predicate = construction("MotionGoalVP", "MotionGoal", children, { slots: constructionSlotsByType("MotionGoalVP", children), trace: traceInfo("generative_template", { construction_type: "MotionGoalVP", template_family: "generative_template", template: ["arrival_motion_verb!", "perfective_aspect!", "goal!"], assigned_slots: ["movement_verb", "perfective_aspect", "goal"], surfaces: children.map(flattenSurface), arrival_verb_status: "main_verb_not_complement" }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Nonspatial attainment/result V到 and negative potential V唔到.
  if (subject && rs.length === 3 && nodeCanFillSlot(rest[0], "action_verb") && rs[1] === "到" && nodeCanFillSlot(rest[2], "object") && !nodeCanFillSlot(rest[2], "location")) {
    const children = [rest[0], motionEventPartClone(rest[1], { label: "func", syntax: "nonspatial_attainment_result_complement", slots: ["result_complement", "result_marker"], reason: "到 is a nonspatial attainment/result complement licensed by the action and object." }), rest[2]];
    const predicate = construction("ResultComplementVP", "ResultVP", children, { slots: constructionSlotsByType("ResultComplementVP", children), trace: traceInfo("generative_template", { construction_type: "ResultComplementVP", template_family: "generative_template", template: ["action_verb!", "attainment_result_complement!", "object!"], assigned_slots: ["action_verb", "result_complement", "object"], surfaces: children.map(flattenSurface), attainment_domain: "nonspatial", not_claims: ["not_motion_goal", "not_coverb"] }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }
  if (subject && rs.length === 4 && nodeCanFillSlot(rest[0], "action_verb") && rs[1] === "唔" && rs[2] === "到" && nodeCanFillSlot(rest[3], "object") && !nodeCanFillSlot(rest[3], "location")) {
    const children = [rest[0], motionEventPartClone(rest[1], { label: "func", syntax: "potential_negator", slots: ["negator"] }), motionEventPartClone(rest[2], { label: "func", syntax: "nonspatial_attainment_result_complement", slots: ["result_complement", "result_marker"] }), rest[3]];
    const predicate = construction("NegativePotentialComplement", "NegPotential", children, { slots: constructionSlotsByType("NegativePotentialComplement", children), trace: traceInfo("generative_template", { construction_type: "NegativePotentialComplement", template_family: "generative_template", template: ["action_verb!", "potential_negator!", "attainment_result_complement!", "object!"], assigned_slots: ["action_verb", "negator", "result_complement", "object"], surfaces: children.map(flattenSurface), attainment_domain: "nonspatial", not_claims: ["not_motion_goal", "not_hidden_result"] }) });
    return motionSubjectPredicateClause(subject, predicate, particles);
  }

  // Motion-purpose: motion-to-goal followed by an overt action/object VP.
  if (subject && rs.length === 4 && rs[0] === "去" && (nodeCanFillSlot(rest[1], "location") || /restaurant_np|place_or_goal/.test((firstToken(rest[1]) || {}).syntax || "")) && nodeCanFillSlot(rest[2], "action_verb") && nodeCanFillSlot(rest[3], "object")) {
    const motionChildren = [motionEventPartClone(rest[0], { label: "doing", syntax: "movement_verb", slots: ["movement_verb"] }), motionGoalNode(rest[1])];
    const motion = construction("MotionGoalVP", "MotionGoal", motionChildren, { slots: constructionSlotsByType("MotionGoalVP", motionChildren), trace: traceInfo("generative_template", { construction_type: "MotionGoalVP", template_family: "generative_template", template: ["movement_verb!", "goal!"], assigned_slots: ["movement_verb", "goal"], surfaces: motionChildren.map(flattenSurface), subspan: true }) });
    const purposeChildren = [rest[2], rest[3]];
    const purpose = construction("TransitiveVP", "VP", purposeChildren, { slots: constructionSlotsByType("TransitiveVP", purposeChildren), trace: traceInfo("generative_template", { construction_type: "TransitiveVP", template_family: "generative_template", template: ["action_verb!", "object!"], assigned_slots: ["action_verb", "object"], surfaces: purposeChildren.map(flattenSurface), subspan: true }) });
    const chainChildren = [motion, purpose];
    const chain = construction("MotionPurposeChain", "MotionPurpose", chainChildren, { slots: constructionSlotsByType("MotionPurposeChain", chainChildren), trace: traceInfo("generative_template", { construction_type: "MotionPurposeChain", template_family: "generative_template", template: ["motion_goal_vp!", "purpose_vp!"], assigned_slots: ["motion_goal_vp", "purpose_verb"], surfaces: chainChildren.map(flattenSurface), shared_subject_provenance: { overt_subject_surface: flattenSurface(subject), licensed_members: [flattenSurface(motion), flattenSurface(purpose)], hidden_subject_inserted: false } }) });
    return motionSubjectPredicateClause(subject, chain, particles);
  }

  // Motion + action-object + later purpose event.
  if (subject && rs.length === 6 && rs[0] === "去" && nodeCanFillSlot(rest[1], "location") && nodeCanFillSlot(rest[2], "action_verb") && nodeCanFillSlot(rest[3], "object") && nodeCanFillSlot(rest[4], "action_verb") && nodeCanFillSlot(rest[5], "object")) {
    const motionChildren = [motionEventPartClone(rest[0], { label: "doing", syntax: "movement_verb", slots: ["movement_verb"] }), motionGoalNode(rest[1])];
    const motion = construction("MotionGoalVP", "MotionGoal", motionChildren, { slots: constructionSlotsByType("MotionGoalVP", motionChildren), trace: traceInfo("generative_template", { construction_type: "MotionGoalVP", template_family: "generative_template", template: ["movement_verb!", "goal!"], assigned_slots: ["movement_verb", "goal"], surfaces: motionChildren.map(flattenSurface), subspan: true }) });
    const action1 = construction("TransitiveVP", "VP", [rest[2], rest[3]], { slots: constructionSlotsByType("TransitiveVP", [rest[2], rest[3]]), trace: traceInfo("generative_template", { construction_type: "TransitiveVP", template_family: "generative_template", template: ["action_verb!", "object!"], assigned_slots: ["action_verb", "object"], surfaces: [rs[2], rs[3]], subspan: true }) });
    const action2 = construction("TransitiveVP", "VP", [rest[4], rest[5]], { slots: constructionSlotsByType("TransitiveVP", [rest[4], rest[5]]), trace: traceInfo("generative_template", { construction_type: "TransitiveVP", template_family: "generative_template", template: ["action_verb!", "object!"], assigned_slots: ["action_verb", "object"], surfaces: [rs[4], rs[5]], subspan: true }) });
    const chainChildren = [motion, action1, action2];
    const chain = construction("SerialVerbPurposeChain", "PurposeChain", chainChildren, { slots: constructionSlotsByType("SerialVerbPurposeChain", chainChildren), trace: traceInfo("generative_template", { construction_type: "SerialVerbPurposeChain", template_family: "generative_template", template: ["motion_goal_vp!", "action_object_vp!", "purpose_vp!"], assigned_slots: ["motion_goal_vp", "action_vp", "purpose_verb"], surfaces: chainChildren.map(flattenSurface), shared_subject_provenance: { overt_subject_surface: flattenSurface(subject), licensed_members: chainChildren.map(flattenSurface), hidden_subject_inserted: false } }) });
    return motionSubjectPredicateClause(subject, chain, particles);
  }

  // Caused-motion/action + directional return + recipient-purpose frame.
  if (subject && rs.length === 7 && rs[0] === "攞" && nodeCanFillSlot(rest[1], "object") && rs[2] === "返" && rs[3] === "嚟" && rs[4] === "畀" && nodeCanFillSlot(rest[5], "subject") && nodeCanFillSlot(rest[6], "action_verb")) {
    const action = construction("TransitiveVP", "VP", [rest[0], rest[1]], {
      slots: constructionSlotsByType("TransitiveVP", [rest[0], rest[1]]),
      trace: traceInfo("generative_template", { construction_type: "TransitiveVP", template_family: "generative_template", template: ["action_verb!", "object!"], assigned_slots: ["action_verb", "object"], surfaces: [rs[0], rs[1]], subspan: true }),
    });
    const returnMotionChildren = [motionEventPartClone(rest[2], { label: "doing", syntax: "return_directional_complement", slots: ["return_motion_verb", "movement_direction"] }), motionEventPartClone(rest[3], { label: "doing", syntax: "deictic_motion_marker", slots: ["deictic_motion_marker"] })];
    const returnMotion = construction("DirectionalMotionVP", "MotionVP", returnMotionChildren, { slots: constructionSlotsByType("DirectionalMotionVP", returnMotionChildren), trace: traceInfo("generative_template", { construction_type: "DirectionalMotionVP", template_family: "generative_template", template: ["return_directional_complement!", "deictic_motion_marker!"], assigned_slots: ["return_motion_verb", "deictic_motion_marker"], surfaces: returnMotionChildren.map(flattenSurface), subspan: true }) });
    const causedMotionChildren = [action, returnMotion];
    const causedMotion = construction("VerbComplementVP", "VerbCompVP", causedMotionChildren, { slots: templateDerivedSlots("VerbComplementVP", causedMotionChildren), trace: traceInfo("generative_template", { construction_type: "VerbComplementVP", template_family: "generative_template", template: ["action_object_vp!", "directional_motion_vp!"], assigned_slots: ["action_vp", "directional_motion_vp"], surfaces: causedMotionChildren.map(flattenSurface), caused_motion_status: "overt_theme_plus_return_direction" }) });
    const relation = cp021bMakePostThemeRelation({
      upstreamVP: causedMotion,
      upstreamPredicateSurface: "攞",
      upstreamThemeSurface: flattenSurface(rest[1]),
      marker: rest[4],
      participantNodes: [rest[5]],
      followingPredicate: rest[6],
      profile: CP021B_POST_THEME_PREDICATE_PROFILES["攞"],
    });
    return motionSubjectPredicateClause(subject, relation, particles);
  }

  return null;
}

function incompatibleAspectCompositionMalformedCandidate(core) {
  if (!core || core.length < 3) return null;
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  let cursor = 0;
  const subject = bareCore[cursor] && nodeCanFillSlot(bareCore[cursor], "subject") ? bareCore[cursor++] : null;
  const action = bareCore[cursor++];
  if (!action || !nodeCanFillSlot(action, "action_verb")) return null;
  const firstMarker = bareCore[cursor++];
  const secondMarker = bareCore[cursor++];
  if (!firstMarker || !secondMarker) return null;

  let malformedSubtype = "";
  let problem = "";
  let expected = [];
  if (nodeCanFillSlot(firstMarker, "perfective_aspect") && nodeCanFillSlot(secondMarker, "progressive_aspect")) {
    malformedSubtype = "incompatible_perfective_progressive_stack";
    problem = "Perfective 咗 and progressive 緊 are stacked in an incompatible order on one predicate.";
    expected = ["one_licensed_aspect_layer", "separate_clause_or_repair"];
  } else if ((isToken(firstMarker, "得") || isToken(firstMarker, "唔")) && nodeCanFillSlot(secondMarker, "perfective_aspect")) {
    malformedSubtype = isToken(firstMarker, "得") ? "potential_marker_followed_by_perfective" : "potential_negator_followed_by_perfective";
    problem = "Potential 得/唔 is followed by perfective 咗 instead of an overt result complement.";
    expected = ["overt_result_complement_after_potential_marker", "ordinary_perfective_vp_without_potential_marker"];
  } else if (["嚟", "去"].includes(flattenSurface(firstMarker)) && ["入", "出", "返", "上", "落"].includes(flattenSurface(secondMarker))) {
    malformedSubtype = "deictic_marker_not_outermost";
    problem = "Final deictic 嚟/去 precedes a path or return component instead of occupying the outer edge of the directional complex.";
    expected = ["path_or_return_before_final_deictic_marker", "separate_clause_or_repair"];
  } else {
    return null;
  }

  const children = [...(subject ? [subject] : []), action, firstMarker, secondMarker, ...bareCore.slice(cursor), ...particles];
  return construction("MalformedCandidate", "Malformed", children, {
    slots: cleanSlots(["malformed_candidate", "needs_review", "predicate", "problem_span", "action_verb", subject ? "subject" : ""]),
    note: "Review-bearing incompatible aspect/potential composition; all visible material is preserved without repairing the learner input.",
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "MalformedCandidate",
      malformed_family: "aspect_result_potential_composition",
      malformed_subtype: malformedSubtype,
      template: ["subject?", "action_verb!", "incompatible_marker_1!", "incompatible_marker_2!", "remainder?", "particle?"],
      assigned_slots: [...(subject ? ["subject"] : []), "action_verb", "incompatible_marker_1", "incompatible_marker_2", ...(bareCore.slice(cursor).length ? ["remainder"] : []), ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      problem,
      expected_repairs: expected,
      semantic_review_flags: ["malformed_candidate_parse", "incompatible_aspect_or_potential_order"],
      not_claims: ["not_clean_aspect_stack", "not_hidden_result_complement", "not_silent_input_repair"],
      reason: "Aspect, potential, and result layers must compose in a licensed order; incompatible visible markers remain review-bearing."
    })
  });
}

function environmentalPredicateParts(core = []) {
  const compact = withoutIgnorableSpaceText(core || []);
  if (!compact.length) return null;

  const conventionalEnvironmental = conventionalEnvironmentalEventConstruction(compact);
  if (conventionalEnvironmental) {
    return {
      predicate: conventionalEnvironmental,
      environmental_subtype: (conventionalEnvironmental.trace || {}).environmental_subtype || "environmental_event",
    };
  }

  const event = categorySubspanFor(compact, ["ImpersonalEnvironmentalClause"]);
  if (event) {
    return {
      predicate: event,
      environmental_subtype: flattenSurface(event) === "落雨" ? "precipitation_event" : "wind_event",
    };
  }

  if (compact.length === 1 && nodeCanFillSlot(compact[0], "environmental_transition_predicate")) {
    const child = parserInactiveTokenClone(compact[0], {
      label: "doing",
      syntax: "environmental_transition_predicate impersonal_predicate",
      slots: ["environmental_transition_predicate", "environmental_predicate", "predicate"],
      reason: "天光 is a visible environmental transition predicate; no null referential or expletive subject is inserted.",
      active_affordance_match: { role: "doing", slot: "environmental_transition_predicate", source: "construction_override" },
      preserve_existing_affordances: true,
    });
    const predicate = construction("ImpersonalEnvironmentalClause", "Environment", [child], {
      slots: constructionSlotsByType("ImpersonalEnvironmentalClause", [child]),
      note: "Genuinely subjectless environmental transition clause.",
      trace: traceInfo("generative_template", {
        construction_type: "ImpersonalEnvironmentalClause",
        template_family: "generative_template",
        template: ["environmental_transition_predicate!"],
        assigned_slots: ["environmental_transition_predicate"],
        surfaces: [flattenSurface(child)],
        subject_status: "impersonal",
        subjectless_type: "genuinely_subjectless_environmental",
        hidden_subject_inserted: false,
        environmental_subtype: "daylight_transition",
        not_claims: ["not_null_referential_subject", "not_hidden_expletive_subject", "not_nominal_subject天"],
      }),
    });
    return { predicate, environmental_subtype: "daylight_transition" };
  }

  const ambient = categorySubspanFor(compact, ["DegreeStativePredicate"]);
  if (ambient && nodeCanFillSlot(ambient, "ambient_environmental_predicate")) {
    return { predicate: ambient, environmental_subtype: "ambient_temperature_property" };
  }
  return null;
}


function spatialLocalizerPhraseFromNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length !== 2) return null;
  const [base, localizer] = compact;
  const baseLooksNominal = nodeCanFillSlot(base, "np") || nodeCanFillSlot(base, "head_noun") || nodeCanFillSlot(base, "object") || nodeCanFillSlot(base, "location");
  const localizerSyntax = String(localizer && localizer.syntax || "");
  if (!baseLooksNominal || !localizerSyntax.includes("spatial_localizer")) return null;
  const localizerChild = parserInactiveTokenClone(localizer, {
    label: "where",
    syntax: `${localizerSyntax} postnominal_spatial_localizer`,
    slots: ["location", "spatial_localizer", "locative_domain"],
    reason: "The postnominal localizer supplies the spatial relation for the visible nominal base.",
    active_affordance_match: { role: "where", slot: "spatial_localizer", source: "construction_override" },
    preserve_existing_affordances: true,
  });
  const children = [base, localizerChild];
  return construction("LocativePlacePhrase", "Location", children, {
    note: "Nominal location base plus postnominal spatial localizer.",
    slots: cleanSlots(["locative_phrase", "location", "goal", "locative_domain", "spatial_localizer", ...templateDerivedSlots("LocativePlacePhrase", children)]),
    trace: traceInfo("generative_template", {
      construction_type: "LocativePlacePhrase",
      template_family: "generative_template",
      template: ["location_base!", "spatial_localizer!"],
      assigned_slots: ["location_base", "spatial_localizer"],
      surfaces: children.map(flattenSurface),
      subspan: true,
      location_relation: "nominal_base_plus_postnominal_localizer",
      subject_status: "not_assigned",
      not_claims: ["not_temporal_modifier", "not_directional_motion", "not_forced_subject"],
    }),
  });
}

function existentialNPFromNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  if (compact.length === 1 && (nodeCanFillSlot(compact[0], "np") || nodeCanFillSlot(compact[0], "head_noun") || nodeCanFillSlot(compact[0], "object"))) return compact[0];
  const wrapped = applyConstructionPatterns(compact);
  const full = fullSpanSingleConstruction(wrapped, compact);
  if (full && (nodeCanFillSlot(full, "np") || nodeCanFillSlot(full, "head_noun") || nodeCanFillSlot(full, "object"))) return full;
  return null;
}

function locativeDomainPrefix(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  if (compact.length >= 2) {
    const phrase = spatialLocalizerPhraseFromNodes(compact.slice(0, 2));
    if (phrase) return { node: phrase, consumed: 2 };
  }
  const first = compact[0];
  if (nodeCanFillSlot(first, "location") || nodeCanFillSlot(first, "goal")) {
    const location = first.kind === "token" ? parserInactiveTokenClone(first, {
      label: "where",
      syntax: `${first.syntax || "place_or_goal"} locative_domain`,
      slots: ["location", "locative_domain"],
      reason: "The overt place expression establishes the spatial domain without being forced into grammatical subject or topic status.",
      active_affordance_match: { role: "where", slot: "locative_domain", source: "construction_override" },
      preserve_existing_affordances: true,
    }) : first;
    return { node: location, consumed: 1 };
  }
  return null;
}

function presentationalLocativeCodaFromNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  if (compact.length === 1 && isToken(compact[0], "喺度")) {
    const child = parserInactiveTokenClone(compact[0], {
      label: "where",
      pos: "location",
      syntax: "locative_deictic presentational_location_coda",
      slots: ["locative_phrase", "location", "presentational_coda"],
      reason: "After an introduced existential participant, 喺度 is a visible locative coda rather than progressive aspect.",
      active_affordance_match: { role: "where", slot: "presentational_coda", source: "construction_override" },
      preserve_existing_affordances: true,
    });
    return construction("LocativePlacePhrase", "Location", [child], {
      note: "Deictic locative coda inside an existential-presentational clause.",
      slots: cleanSlots(["locative_phrase", "location", "presentational_coda"]),
      trace: traceInfo("generative_template", {
        construction_type: "LocativePlacePhrase",
        template_family: "generative_template",
        template: ["presentational_location_coda!"],
        assigned_slots: ["presentational_coda"],
        surfaces: [flattenSurface(child)],
        subspan: true,
        predicate_subtype: "presentational_locative_coda",
        not_claims: ["not_progressive_aspect"],
      }),
    });
  }
  return locativePredicatePhraseFromNodes(compact);
}

function placementPerfectiveVPFromNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length < 4) return null;
  const [verb, aspect, ...themeNodes] = compact;
  if (!String(verb && verb.syntax || "").includes("positioning_verb")) return null;
  if (!nodeCanFillSlot(aspect, "perfective_aspect") && !isToken(aspect, "咗")) return null;
  const theme = existentialNPFromNodes(themeNodes);
  if (!theme) return null;
  const predicate = parserInactiveTokenClone(verb, {
    label: "doing",
    syntax: "positioning_action_predicate locative_inversion_predicate",
    slots: ["action_verb", "main_verb", "predicate", "positioning_predicate"],
    reason: "The visible positioning verb predicates the postverbal theme inside a locative-inversion frame.",
  });
  const children = [predicate, aspect, theme];
  return construction("PerfectiveVP", "PerfVP", children, {
    note: "Perfective positioning predicate with an overt postverbal theme.",
    slots: cleanSlots(["perfective_vp", "vp", "action_vp", "predicate", "perfective_aspect", "object", "theme", ...templateDerivedSlots("PerfectiveVP", children)]),
    trace: traceInfo("generative_template", {
      construction_type: "PerfectiveVP",
      template_family: "generative_template",
      template: ["positioning_predicate!", "perfective_aspect!", "theme!"],
      assigned_slots: ["positioning_predicate", "perfective_aspect", "theme"],
      surfaces: children.map(flattenSurface),
      subspan: true,
      event_subtype: "perfective_positioning",
      not_claims: ["not_objectless_perfective"],
    }),
  });
}

function existentialLocationPresentationalFallback(core = []) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (!compact.length) return null;

  // Overt location/domain + 有/冇 + introduced NP.
  const existentialIndex = compact.findIndex((node) => isToken(node, "有") || isToken(node, "冇"));
  if (existentialIndex > 0 && existentialIndex < compact.length - 1) {
    const locationPrefix = locativeDomainPrefix(compact.slice(0, existentialIndex));
    if (locationPrefix && locationPrefix.consumed === existentialIndex) {
      const theme = existentialNPFromNodes(compact.slice(existentialIndex + 1));
      if (theme) {
        const marker = compact[existentialIndex];
        const negative = isToken(marker, "冇");
        const predicate = parserInactiveTokenClone(marker, {
          label: "func",
          syntax: negative ? "negated_locative_existential_predicate" : "locative_existential_predicate",
          slots: [negative ? "negated_existential" : "existential", "locative_existential_predicate", "predicate"],
          reason: `${flattenSurface(marker)} predicates nonexistence/existence inside the overt spatial domain.`,
        });
        const children = [locationPrefix.node, predicate, theme, ...particles];
        return construction("LocativeExistentialClause", "LocExist", children, {
          note: "Locative existential clause with overt spatial domain and introduced NP.",
          slots: cleanSlots(["locative_existential_clause", "existential_clause", "location", "locative_domain", "predicate", negative ? "negated_existential" : "existential", "introduced_theme", "clause", ...templateDerivedSlots("LocativeExistentialClause", children)]),
          trace: traceInfo("generative_template", {
            construction_type: "LocativeExistentialClause",
            template_family: "generative_template",
            template: ["locative_domain!", negative ? "negated_existential!" : "existential!", "introduced_theme!", "particle?"],
            assigned_slots: ["locative_domain", negative ? "negated_existential" : "existential", "introduced_theme", ...particles.map(() => "particle")],
            surfaces: children.map(flattenSurface),
            existential_subtype: "locative_existence",
            polarity: negative ? "negative" : "positive",
            have_relation: "existence",
            location_relation: "overt_spatial_domain_not_forced_subject_or_topic",
            subject_status: "impersonal",
            subjectless_type: "genuinely_subjectless_locative_existential",
            hidden_subject_inserted: false,
            introduced_theme_surface: flattenSurface(theme),
            not_claims: ["not_possessor_subject", "not_location_as_forced_subject", "not_location_as_forced_topic", "not_hidden_expletive_subject"],
          }),
        });
      }
    }
  }

  // 有/冇 + introduced NP + locative coda.
  if (existentialIndex === 0 && compact.length >= 3) {
    const codaIndex = compact.findIndex((node, index) => index > 0 && (isToken(node, "喺") || isToken(node, "喺度")));
    if (codaIndex > 1) {
      const participant = existentialNPFromNodes(compact.slice(1, codaIndex));
      const coda = presentationalLocativeCodaFromNodes(compact.slice(codaIndex));
      if (participant && coda) {
        const marker = compact[0];
        const negative = isToken(marker, "冇");
        const predicate = parserInactiveTokenClone(marker, {
          label: "func",
          syntax: negative ? "negated_existential_presentational_predicate" : "existential_presentational_predicate",
          slots: [negative ? "negated_existential" : "existential", "presentational_predicate", "predicate"],
          reason: `${flattenSurface(marker)} introduces the visible participant before its locative coda.`,
        });
        const children = [predicate, participant, coda, ...particles];
        return construction("ExistentialPresentationalClause", "Presentational", children, {
          note: "Existential-presentational clause: predicate + introduced participant + visible locative coda.",
          slots: cleanSlots(["existential_presentational_clause", "existential_clause", "predicate", negative ? "negated_existential" : "existential", "introduced_participant", "presentational_coda", "location", "clause", ...templateDerivedSlots("ExistentialPresentationalClause", children)]),
          trace: traceInfo("generative_template", {
            construction_type: "ExistentialPresentationalClause",
            template_family: "generative_template",
            template: [negative ? "negated_existential!" : "existential!", "introduced_participant!", "presentational_coda!", "particle?"],
            assigned_slots: [negative ? "negated_existential" : "existential", "introduced_participant", "presentational_coda", ...particles.map(() => "particle")],
            surfaces: children.map(flattenSurface),
            existential_subtype: "participant_presentation_with_locative_coda",
            polarity: negative ? "negative" : "positive",
            have_relation: "presentation",
            subject_status: "impersonal",
            subjectless_type: "genuinely_subjectless_existential_presentational",
            hidden_subject_inserted: false,
            introduced_participant_surface: flattenSurface(participant),
            presentational_coda_surface: flattenSurface(coda),
            not_claims: ["not_prenominal_relative_clause", "not_possessive_have", "not_hidden_subject", "not_progressive_aspect"],
          }),
        });
      }
    }
  }

  const locationPrefix = locativeDomainPrefix(compact);
  if (!locationPrefix || locationPrefix.consumed >= compact.length) return null;
  const remainder = compact.slice(locationPrefix.consumed);

  // Narrow locative inversion: location + positioning predicate + aspect + theme.
  const positioning = placementPerfectiveVPFromNodes(remainder);
  if (positioning) {
    const children = [locationPrefix.node, positioning, ...particles];
    return construction("LocativeFrameClause", "LocativeFrame", children, {
      note: "Narrow locative-inversion frame with overt location and postverbal theme; grammatical subjecthood of the location is not forced.",
      slots: cleanSlots(["locative_frame_clause", "location", "locative_domain", "predicate", "introduced_theme", "clause", ...templateDerivedSlots("LocativeFrameClause", children)]),
      trace: traceInfo("generative_template", {
        construction_type: "LocativeFrameClause",
        template_family: "generative_template",
        template: ["locative_domain!", "positioning_predicate!", "particle?"],
        assigned_slots: ["locative_domain", "positioning_predicate", ...particles.map(() => "particle")],
        surfaces: children.map(flattenSurface),
        locative_frame_subtype: "locative_inversion",
        location_relation: "locative_frame_subjecthood_underdetermined",
        subject_status: "underdetermined_location_relation",
        hidden_subject_inserted: false,
        not_claims: ["not_locative_existential_have", "not_location_as_automatically_subject", "not_location_as_automatically_topic", "not_hidden_subject"],
      }),
    });
  }

  // Location-framed property clause distinct from environmental temperature frames.
  const wrappedProperty = applyConstructionPatterns(remainder);
  const property = fullSpanSingleConstruction(wrappedProperty, remainder);
  if (property && ["DegreeStativePredicate", "StativePredicate", "NegatedStativePredicate"].includes(property.type)) {
    const children = [locationPrefix.node, property, ...particles];
    return construction("LocativeFrameClause", "LocativeFrame", children, {
      note: "Location-framed property clause. The overt place establishes the domain; its subject/topic status is not forced.",
      slots: cleanSlots(["locative_frame_clause", "location", "locative_domain", "predicate", "clause", ...templateDerivedSlots("LocativeFrameClause", children)]),
      trace: traceInfo("generative_template", {
        construction_type: "LocativeFrameClause",
        template_family: "generative_template",
        template: ["locative_domain!", "property_predicate!", "particle?"],
        assigned_slots: ["locative_domain", "property_predicate", ...particles.map(() => "particle")],
        surfaces: children.map(flattenSurface),
        locative_frame_subtype: "location_property",
        location_relation: "frame_or_topic_status_underdetermined",
        subject_status: "underdetermined_location_relation",
        hidden_subject_inserted: false,
        not_claims: ["not_environmental_temperature_clause", "not_location_as_automatically_subject", "not_location_as_automatically_topic", "not_hidden_subject"],
      }),
    });
  }

  return null;
}

function impersonalEnvironmentalClauseFallback(core = []) {
  const { core: bareCore, particles } = withoutTrailingParticles(core || []);
  if (!bareCore.length) return null;

  // Overt temporal framing remains a TemporalClause, with the genuinely
  // subjectless environmental predicate preserved as its child.
  if (bareCore.length >= 2 && nodeCanFillSlot(bareCore[0], "time")) {
    const environmental = environmentalPredicateParts(bareCore.slice(1));
    if (environmental) {
      const child = environmental.predicate.type === "ImpersonalEnvironmentalClause"
        ? environmental.predicate
        : construction("ImpersonalEnvironmentalClause", "Environment", [environmental.predicate], {
          slots: constructionSlotsByType("ImpersonalEnvironmentalClause", [environmental.predicate]),
          note: "Ambient environmental property licensed by an overt temporal frame.",
          trace: traceInfo("generative_template", {
            construction_type: "ImpersonalEnvironmentalClause",
            template_family: "generative_template",
            template: ["ambient_environmental_predicate!"],
            assigned_slots: ["ambient_environmental_predicate"],
            surfaces: [flattenSurface(environmental.predicate)],
            subject_status: "impersonal",
            subjectless_type: "genuinely_subjectless_environmental",
            hidden_subject_inserted: false,
            environmental_subtype: environmental.environmental_subtype,
            not_claims: ["not_null_referential_subject", "not_hidden_expletive_subject"],
          }),
        });
      const children = [bareCore[0], child, ...particles];
      return construction("TemporalClause", "Time", children, {
        slots: templateDerivedSlots("TemporalClause", children),
        note: "Time-framed environmental clause with no fabricated referential subject.",
        trace: traceInfo("generative_template", {
          construction_type: "TemporalClause",
          template_family: "generative_template",
          template: ["time!", "impersonal_environmental_clause!", "particle?"],
          assigned_slots: ["time", "impersonal_environmental_clause", ...particles.map(() => "particle")],
          surfaces: children.map(flattenSurface),
          clause_modifier_profile: "temporal_environmental_frame",
          subject_status: "impersonal",
          subjectless_type: "genuinely_subjectless_environmental",
          hidden_subject_inserted: false,
          not_claims: ["not_null_referential_subject", "not_hidden_expletive_subject"],
        }),
      });
    }
  }

  // Overt spatial localizers frame the ambient proposition. They are not
  // automatically promoted to grammatical subject or topic.
  if (bareCore.length >= 2 && (nodeCanFillSlot(bareCore[0], "ambient_location_frame") || nodeCanFillSlot(bareCore[0], "location"))) {
    const environmental = environmentalPredicateParts(bareCore.slice(1));
    if (environmental && environmental.environmental_subtype === "ambient_temperature_property") {
      const ambientClause = construction("ImpersonalEnvironmentalClause", "Environment", [environmental.predicate], {
        slots: constructionSlotsByType("ImpersonalEnvironmentalClause", [environmental.predicate]),
        note: "Ambient temperature proposition licensed by an overt spatial frame.",
        trace: traceInfo("generative_template", {
          construction_type: "ImpersonalEnvironmentalClause",
          template_family: "generative_template",
          template: ["ambient_environmental_predicate!"],
          assigned_slots: ["ambient_environmental_predicate"],
          surfaces: [flattenSurface(environmental.predicate)],
          subject_status: "impersonal",
          subjectless_type: "genuinely_subjectless_environmental",
          hidden_subject_inserted: false,
          environmental_subtype: environmental.environmental_subtype,
          not_claims: ["not_null_referential_subject", "not_hidden_expletive_subject"],
        }),
      });
      const location = parserInactiveTokenClone(bareCore[0], {
        label: "where",
        syntax: "ambient_location_frame spatial_localizer",
        slots: ["location", "ambient_location_frame"],
        reason: "The overt place expression frames the ambient proposition; its grammatical subject/topic status is not forced.",
        active_affordance_match: { role: "where", slot: "ambient_location_frame", source: "construction_override" },
        preserve_existing_affordances: true,
      });
      const children = [location, ambientClause, ...particles];
      return construction("LocativeFrameClause", "LocativeFrame", children, {
        slots: constructionSlotsByType("LocativeFrameClause", children),
        note: "Location-framed ambient clause. Location semantics are represented independently from grammatical subjecthood.",
        trace: traceInfo("generative_template", {
          construction_type: "LocativeFrameClause",
          template_family: "generative_template",
          template: ["ambient_location_frame!", "impersonal_environmental_clause!", "particle?"],
          assigned_slots: ["ambient_location_frame", "impersonal_environmental_clause", ...particles.map(() => "particle")],
          surfaces: children.map(flattenSurface),
          location_relation: "ambient_frame_not_forced_subject_or_topic",
          subject_status: "impersonal",
          subjectless_type: "location_framed_ambient",
          hidden_subject_inserted: false,
          not_claims: ["not_location_as_forced_subject", "not_location_as_forced_topic", "not_hidden_expletive_subject"],
        }),
      });
    }
  }

  const environmental = environmentalPredicateParts(bareCore);
  if (!environmental || environmental.environmental_subtype === "ambient_temperature_property") return null;
  const predicate = environmental.predicate;
  const children = [...(predicate.children || [predicate]), ...particles];
  return construction("ImpersonalEnvironmentalClause", "Environment", children, {
    slots: constructionSlotsByType("ImpersonalEnvironmentalClause", children),
    note: "Genuinely subjectless environmental clause; all visible predicate material remains transparent.",
    trace: traceInfo("generative_template", {
      construction_type: "ImpersonalEnvironmentalClause",
      template_family: predicate.trace && predicate.trace.template_family ? predicate.trace.template_family : "generative_template",
      template: predicate.trace && predicate.trace.template ? predicate.trace.template : ["environmental_predicate!", "particle?"],
      assigned_slots: predicate.trace && predicate.trace.assigned_slots ? [...predicate.trace.assigned_slots, ...particles.map(() => "particle")] : ["environmental_predicate", ...particles.map(() => "particle")],
      surfaces: children.map(flattenSurface),
      subject_status: "impersonal",
      subjectless_type: "genuinely_subjectless_environmental",
      hidden_subject_inserted: false,
      environmental_subtype: environmental.environmental_subtype,
      not_claims: ["not_productive_vo_object_relation", "not_null_referential_subject", "not_hidden_expletive_subject"],
    }),
  });
}


function nominalPredicateSubjectFromNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  if (compact.length === 1) {
    const only = compact[0];
    if (nodeCanFillSlot(only, "subject")
        || nodeCanFillSlot(only, "np")
        || nodeCanFillSlot(only, "head_noun")
        || nodeCanFillSlot(only, "location")) return only;
    return null;
  }
  const templated = categorySubspanFor(compact, [
    "OvertHeadDemonstrativeClassifierNP",
    "QuantifiedClassifierNP",
    "QuantifiedPersonNP",
    "DiMarkedNP",
    "OrdinalClassifierNP",
    "ClassifierObjectNP",
    "ModifiedNP",
    "NominalHeadSpan",
    "CoordinatedNP",
  ]);
  if (!templated) return null;
  if (!nodeCanFillSlot(templated, "subject")
      && !nodeCanFillSlot(templated, "np")
      && !nodeCanFillSlot(templated, "head_noun")
      && !nodeCanFillSlot(templated, "location")) return null;
  return templated;
}

function nominalPredicateTokens(node) {
  if (!node) return [];
  if (node.kind === "token") return [node];
  if (node.kind === "construction") return (node.children || []).flatMap(nominalPredicateTokens);
  return [];
}

function nominalPredicateSubjectClass(node) {
  const tokens = nominalPredicateTokens(node || {});
  if (tokens.some((item) => item.label === "who")) return "person";
  if (tokens.some((item) => item.label === "when")) return "time";
  if (nodeCanFillSlot(node, "location") || tokens.some((item) => item.label === "where")) return "location";
  const areaCompatibleSyntax = ["house_noun", "interior_location", "building_shop", "room_noun", "property_noun"];
  if (tokens.some((item) => stringIncludesAny(String(item.syntax || ""), areaCompatibleSyntax))) return "area_measurable_nominal";
  return "nominal";
}

function nominalPredicateQuantityClone(node, constructionType) {
  return parserInactiveTokenClone(node, {
    label: "how",
    pos: "numeral",
    syntax: "quantity count_value nominal_predicate_quantity",
    slots: ["quantity", "count_value"],
    reason: `The visible numeral contributes the measured value inside ${constructionType}, rather than acting as a property predicate.`,
    active_affordance_match: { role: "how", slot: "quantity", source: "construction_override" },
  });
}

function nominalPredicateUnitClone(node, domain) {
  const surface = flattenSurface(node);
  if (domain === "price") {
    return parserInactiveTokenClone(node, {
      label: "what",
      pos: "noun",
      syntax: "currency_unit nominal_measure_unit price_measure_unit",
      slots: ["currency_unit", "nominal_measure_unit", "measure_unit"],
      reason: `${surface} is the overt currency unit in a restricted price nominal predicate.`,
      active_affordance_match: { role: "what", slot: "currency_unit", source: "construction_override" },
    });
  }
  return parserInactiveTokenClone(node, {
    label: "measure_word",
    pos: "measure",
    syntax: domain === "age"
      ? "age_unit nominal_measure_unit"
      : domain === "area"
        ? "measure_unit area_measure_unit nominal_measure_unit"
        : "measure_unit length_measure_unit nominal_measure_unit",
    slots: domain === "age"
      ? ["age_unit", "nominal_measure_unit", "measure_unit"]
      : domain === "area"
        ? ["measure_unit", "area_measure_unit", "nominal_measure_unit"]
        : ["measure_unit", "length_measure_unit", "nominal_measure_unit"],
    reason: `${surface} is the overt ${domain} unit inside a restricted copula-less nominal predicate.`,
    active_affordance_match: {
      role: "measure_word",
      slot: domain === "age" ? "age_unit" : domain === "area" ? "area_measure_unit" : "length_measure_unit",
      source: "construction_override",
    },
  });
}

function nominalPredicateDimensionClone(node) {
  return parserInactiveTokenClone(node, {
    label: "like",
    pos: "stative",
    syntax: "stative_predicate scalar_dimension_predicate length_dimension_predicate",
    slots: ["dimension_predicate", "stative_predicate", "predicate"],
    reason: "The overt dimensional predicate identifies the measured dimension and remains distinct from the numeric value and unit.",
    active_affordance_match: { role: "like", slot: "dimension_predicate", source: "construction_override" },
  });
}

function nominalMeasurePredicateFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length < 3) return null;
  if (compact.some((node) => isToken(node, "係") || isToken(node, "喺"))) return null;

  let unitIndex = -1;
  let domain = "";
  for (let index = 1; index < compact.length; index++) {
    const node = compact[index];
    if (nodeCanFillSlot(node, "age_unit")) {
      unitIndex = index;
      domain = "age";
      break;
    }
    if (isToken(node, "蚊")) {
      unitIndex = index;
      domain = "price";
      break;
    }
    if (nodeCanFillSlot(node, "measure_unit")) {
      unitIndex = index;
      domain = nodeCanFillSlot(node, "area_measure_unit") ? "area_or_length" : "length";
      break;
    }
  }
  if (unitIndex < 1) return null;

  let quantityStart = unitIndex;
  while (quantityStart > 0 && nodeCanFillSlot(compact[quantityStart - 1], "quantity")) quantityStart--;
  if (quantityStart === unitIndex || quantityStart === 0) return null;
  const quantityNodes = compact.slice(quantityStart, unitIndex);
  if (!quantityNodes.every((node) => nodeCanFillSlot(node, "quantity"))) return null;

  const subjectNodes = compact.slice(0, quantityStart);
  const subject = nominalPredicateSubjectFromNodes(subjectNodes);
  if (!subject || flattenSurface(subject) !== subjectNodes.map(flattenSurface).join("")) return null;
  const subjectClass = nominalPredicateSubjectClass(subject);

  const afterUnit = compact.slice(unitIndex + 1);
  let dimension = null;
  if (afterUnit.length) {
    if (afterUnit.length !== 1 || !nodeCanFillSlot(afterUnit[0], "dimension_predicate")) return null;
    dimension = afterUnit[0];
  }

  if (domain === "age" && subjectClass !== "person") return null;
  if (domain === "price" && ["person", "time", "location"].includes(subjectClass)) return null;
  if (domain === "area_or_length") {
    if (dimension) domain = "length";
    else if (["location", "area_measurable_nominal"].includes(subjectClass)) domain = "area";
    else return null;
  }
  if (domain === "length" && !dimension) return null;
  if (domain === "area" && dimension) return null;
  if (domain === "price" && dimension) return null;
  if (domain === "age" && dimension) return null;

  const quantityChildren = quantityNodes.map((node) => nominalPredicateQuantityClone(node, "MeasureExpression"));
  const unit = nominalPredicateUnitClone(compact[unitIndex], domain);
  const dimensionChild = dimension ? nominalPredicateDimensionClone(dimension) : null;
  const measureChildren = [...quantityChildren, unit, ...(dimensionChild ? [dimensionChild] : [])];
  const measure = construction("MeasureExpression", "Measure", measureChildren, {
    slots: cleanSlots([
      "measure_expression", "nominal_predicate", "predicate", "quantity", "nominal_measure_unit",
      domain === "age" ? "age_unit" : "",
      domain === "price" ? "currency_unit" : "",
      domain === "area" ? "area_measure_unit" : "",
      domain === "length" ? "length_measure_unit" : "",
      dimensionChild ? "dimension_predicate" : "",
    ]),
    note: `Restricted ${domain} measure expression used as a copula-less nominal predicate.`,
    trace: traceInfo("generative_template", {
      construction_type: "MeasureExpression",
      internal_representation_scope: "overt_measure_child_span",
      independent_grammar_licensing: false,
      licensing_parent: "NominalPredicateClause",
      template_family: "generative_template",
      template: ["quantity+", `${domain}_unit!`, ...(dimensionChild ? ["dimension_predicate!"] : [])],
      assigned_slots: [...quantityChildren.map(() => "quantity"), `${domain}_unit`, ...(dimensionChild ? ["dimension_predicate"] : [])],
      surfaces: measureChildren.map(flattenSurface),
      measure_domain: domain,
      quantity_surface: quantityChildren.map(flattenSurface).join(""),
      unit_surface: flattenSurface(unit),
      dimension_surface: dimensionChild ? flattenSurface(dimensionChild) : "",
      subspan: true,
    }),
  });

  const children = [subject, measure, ...particles];
  return construction("NominalPredicateClause", "NomPred", children, {
    slots: cleanSlots(["nominal_predicate_clause", "subject", "predicate", "nominal_predicate", "measure_expression", "clause"]),
    note: `Restricted copula-less ${domain} nominal-predicate clause with an overt subject and overt measure expression.`,
    trace: traceInfo("generative_template", {
      construction_type: "NominalPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "measure_expression!", "particle?"],
      assigned_slots: ["subject", "measure_expression", ...particles.map(() => "particle")],
      surfaces: children.map(flattenSurface),
      nominal_predicate_type: domain,
      copula_status: "licensed_omission_in_restricted_measure_predication",
      subject_status: "overt",
      subject_surface: flattenSurface(subject),
      predicate_surface: flattenSurface(measure),
      hidden_subject_inserted: false,
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      not_claims: [
        "not_general_np_np_copula_omission",
        "not_topic_by_initial_position_alone",
        "not_hidden_copula_token",
        "not_hidden_subject",
      ],
    }),
  });
}



function postverbalZoPerfectiveFromRawNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length < 3) return null;
  const subjectOffset = nodeCanFillSlot(compact[0], "subject") ? 1 : 0;
  if (compact.length - subjectOffset < 3) return null;
  const action = compact[subjectOffset];
  const aspect = compact[subjectOffset + 1];
  if (!nodeCanFillSlot(action, "action_verb") || !nodeCanFillSlot(aspect, "perfective_aspect")) return null;
  const objectNodes = compact.slice(subjectOffset + 2);
  if (objectNodes.length < 2) return null;
  const objectNode = compositionalNpSubspanFor(objectNodes)
    || (objectNodes.length === 1 && nodeCanLicenseEvidenceGatedObject(objectNodes[0]) ? objectNodes[0] : null);
  if (!objectNode || !nodeCanLicenseEvidenceGatedObject(objectNode)) return null;
  const children = [action, aspect, objectNode];
  const perfective = construction("PostverbalZoPerfectiveVP", "PerfectiveVP", children, {
    slots: cleanSlots(["perfective_vp", "vp", "action_vp", "predicate", "action_verb", "perfective_aspect", "object", "np"]),
    note: "Compositional postverbal 咗 perfective with an overt licensed NP object. NP assembly is independent parser infrastructure and does not broaden the construction's linguistic status.",
    trace: traceInfo("generative_template", {
      construction_type: "PostverbalZoPerfectiveVP",
      template_family: "generative_template",
      template: ["action_verb!", "perfective_aspect!", "licensed_np_object!"],
      assigned_slots: ["action_verb", "perfective_aspect", "object"],
      surfaces: children.map((node) => flattenSurface(node)),
      object_np_license_status: nodeNpLicenseStatus(objectNode),
      object_np_construction: objectNode.kind === "construction" ? objectNode.type : "bare_nominal_token",
      hidden_object_inserted: false,
      evidence_scope_unchanged: true,
      reason: "v0.5.184 composes the complete postverbal object as a reusable NP before broad VP subspan wrapping can consume only its first token.",
    }),
  });
  if (!subjectOffset) return [perfective];
  const clause = templateConstructionFor([compact[0], perfective], ["SubjectPredicateClause"]);
  return clause ? [clause] : [compact[0], perfective];
}

function postverbalZoPerfectiveFromWrappedNodes(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length < 2) return null;
  for (let index = 0; index < compact.length - 1; index += 1) {
    const first = compact[index];
    const objectNode = compact[index + 1];
    if (!nodeCanLicenseEvidenceGatedObject(objectNode)) continue;
    let action = null;
    let aspect = null;
    if (first && first.kind === "construction" && first.type === "PerfectiveVP") {
      const children = withoutIgnorableSpaceText(first.children || []);
      if (children.length === 2 && nodeCanFillSlot(children[0], "action_verb") && nodeCanFillSlot(children[1], "perfective_aspect")) {
        [action, aspect] = children;
      }
    } else if (index + 2 < compact.length
        && nodeCanFillSlot(first, "action_verb")
        && nodeCanFillSlot(compact[index + 1], "perfective_aspect")
        && nodeCanLicenseEvidenceGatedObject(compact[index + 2])) {
      action = first;
      aspect = compact[index + 1];
    }
    if (!action || !aspect) continue;
    const actualObject = first && first.kind === "construction" ? objectNode : compact[index + 2];
    const consumed = first && first.kind === "construction" ? 2 : 3;
    if (index + consumed !== compact.length) continue;
    const children = [action, aspect, actualObject];
    const perfective = construction("PostverbalZoPerfectiveVP", "PerfectiveVP", children, {
      slots: cleanSlots(["perfective_vp", "vp", "action_vp", "predicate", "action_verb", "perfective_aspect", "object", "np"]),
      note: "Compositional postverbal 咗 perfective with an overt licensed NP object. NP assembly is independent parser infrastructure and does not broaden the construction's linguistic status.",
      trace: traceInfo("generative_template", {
        construction_type: "PostverbalZoPerfectiveVP",
        template_family: "generative_template",
        template: ["action_verb!", "perfective_aspect!", "licensed_np_object!"],
        assigned_slots: ["action_verb", "perfective_aspect", "object"],
        surfaces: children.map((node) => flattenSurface(node)),
        object_np_license_status: nodeNpLicenseStatus(actualObject),
        object_np_construction: actualObject.kind === "construction" ? actualObject.type : "bare_nominal_token",
        hidden_object_inserted: false,
        evidence_scope_unchanged: true,
        reason: "v0.5.184 recomposes V+咗 with a reusable licensed NP after NP-internal parsing, instead of enumerating complete object strings.",
      }),
    });
    return [...compact.slice(0, index), perfective, ...compact.slice(index + consumed)];
  }
  return null;
}

const createDefinitionCopularDetectors = require("./parser/detectors/definition/copular-relations");
const {
  copularExplanatoryCompositionFallback,
  copularIdentificationFrameFallback,
  isDefinitionCopulaNode,
} = createDefinitionCopularDetectors({
  construction,
  coordinatedNPFromParts,
  copulaClone,
  deicticClassifierTopicFromParts,
  firstToken,
  flattenSurface,
  isParticle,
  isToken,
  nodeCanFillSlot,
  nodeSlots,
  nominalComplementFromNodes,
  parserInactiveTokenClone,
  templateDerivedSlots,
  token,
  traceInfo,
  transparentDeicticClassifierTopicFromNode,
  transparentTopicContentFromNodes,
  withoutIgnorableSpaceText,
  withoutTrailingParticles,
});

const createIntendedFunctionDetectors = require("./parser/detectors/definition/intended-function");
const { intendedFunctionRelationFallback } = createIntendedFunctionDetectors({
  construction,
  firstToken,
  flattenSurface,
  isDefinitionCopulaNode,
  isModalToken,
  isToken,
  isVerbLike,
  nodeCanFillSlot,
  nodeSlots,
  parserInactiveTokenClone,
  traceInfo,
  transparentTopicContentFromNodes,
  withoutIgnorableSpaceText,
  withoutTrailingParticles,
});

const createNamingDetectors = require("./parser/detectors/naming/self-introduction");
const { namingSelfIntroductionFrameFallback } = createNamingDetectors({
  construction,
  firstToken,
  flattenSurface,
  isToken,
  nameTokenClone,
  nodeCanFillSlot,
  parserInactiveTokenClone,
  templateDerivedSlots,
  traceInfo,
  withoutIgnorableSpaceText,
  withoutTrailingParticles,
});

function wrapCore(core) {
  if (!core.length) return core;

  // Bare needs-context ambiguity: 唔好食.
  if (core.length === 1 && firstToken(core[0]) && firstToken(core[0]).syntax === "ambiguous_needs_context") {
    const candidateAnalyses = (firstToken(core[0]).trace && firstToken(core[0]).trace.candidate_analyses) || [
      { construction: "NegatedStativePredicate", split: ["唔", "好食"], meaning_hint: "not tasty", parser_active: false },
      { construction: "ProhibitiveImperative", split: ["唔好", "食"], meaning_hint: "don't eat", parser_active: false },
    ];
    return [construction("NeedsContext", "needs context", core, { note: "Ambiguous split: 唔 + 好食 or 唔好 + 食.", trace: traceInfo("special_ambiguity_rule", { surface: "唔好食", reason: "Needs context ambiguity.", candidate_analyses: candidateAnalyses }) })];
  }

  const fragmentQuestion = fragmentQuestionFallback(core);
  if (fragmentQuestion) return [fragmentQuestion];

  const conditionalClause = conditionalGeWaaClauseFallback(core);
  if (conditionalClause) return [conditionalClause];

  // Preserve frozen CP021B double-marker, 將, and fronting boundaries before
  // broad VP/relative-NP composition can invent an unrelated inner analysis.
  const earlyCp021bBoundaryReviewSpan = cp021bBoundaryReviewFallback(core);
  if (earlyCp021bBoundaryReviewSpan) return [earlyCp021bBoundaryReviewSpan];

  const environmentalClause = impersonalEnvironmentalClauseFallback(core);
  if (environmentalClause) return [environmentalClause];

  const existentialLocationPresentational = existentialLocationPresentationalFallback(core);
  if (existentialLocationPresentational) return [existentialLocationPresentational];

  const nominalMeasurePredicate = nominalMeasurePredicateFallback(core);
  if (nominalMeasurePredicate) return [nominalMeasurePredicate];

  const motionEventSpatial = motionEventSpatialFallback(core);
  if (motionEventSpatial) return [motionEventSpatial];

  const incompatibleAspectComposition = incompatibleAspectCompositionMalformedCandidate(core);
  if (incompatibleAspectComposition) return [incompatibleAspectComposition];

  const durativeAspectComposition = durativeAspectCompositionFallback(core);
  if (durativeAspectComposition) return [durativeAspectComposition];

  const perfectiveResultComposition = perfectiveResultCompositionFallback(core);
  if (perfectiveResultComposition) return [perfectiveResultComposition];

  const copularExplanatoryComposition = copularExplanatoryCompositionFallback(core);
  if (copularExplanatoryComposition) return [copularExplanatoryComposition];

  const directionalComposition = directionalCompositionFallback(core);
  if (directionalComposition) return [directionalComposition];

  const restorativeRepetitiveComposition = restorativeRepetitiveComplementFallback(core);
  if (restorativeRepetitiveComposition) return [restorativeRepetitiveComposition];

  const purposeLinkingMotion = purposeLinkingMotionFallback(core);
  if (purposeLinkingMotion) return [purposeLinkingMotion];

  const bareNumeralMalformed = bareNumeralObjectMalformedCandidate(core);
  if (bareNumeralMalformed) return [bareNumeralMalformed];

  const existentialVpMalformed = existentialQuestionWithVpMalformedCandidate(core);
  if (existentialVpMalformed) return [existentialVpMalformed];

  const mandarinNegatorNeedsContext = mandarinNegatorNeedsContextCandidate(core);
  if (mandarinNegatorNeedsContext) return [mandarinNegatorNeedsContext];

  const incompleteProhibitiveNeedsContext = incompleteProhibitiveNeedsContextCandidate(core);
  if (incompleteProhibitiveNeedsContext) return [incompleteProhibitiveNeedsContext];

  const incompleteRestrictiveFocusBoundary = incompleteRestrictiveFocusBoundaryCandidate(core);
  if (incompleteRestrictiveFocusBoundary) return [incompleteRestrictiveFocusBoundary];

  const typedPredicateOmission = predicateOmissionCandidate(core);
  if (typedPredicateOmission) return [typedPredicateOmission];

  const incompleteModalNeedsContext = incompleteModalNeedsContextCandidate(core);
  if (incompleteModalNeedsContext) return [incompleteModalNeedsContext];

  const incompleteContextualPredicate = incompleteContextualPredicateCandidate(core);
  if (incompleteContextualPredicate) return [incompleteContextualPredicate];

  const incompleteLocativeNeedsContext = incompleteLocativeNeedsContextCandidate(core);
  if (incompleteLocativeNeedsContext) return [incompleteLocativeNeedsContext];

  const possessiveFragmentAnswer = possessiveFragmentAnswerCandidate(core);
  if (possessiveFragmentAnswer) return [possessiveFragmentAnswer];

  const mandarinReviewNeedsContext = mandarinReviewNeedsContextCandidate(core);
  if (mandarinReviewNeedsContext) return [mandarinReviewNeedsContext];

  const copularANotAQuestion = copularANotAQuestionFallback(core);
  if (copularANotAQuestion) return [copularANotAQuestion];

  const rawDesiderativeANotAQuestion = desiderativeANotAQuestionFallback(core);
  if (rawDesiderativeANotAQuestion) return [rawDesiderativeANotAQuestion];

  const rawPermissionANotAQuestion = permissionANotAQuestionFallback(core);
  if (rawPermissionANotAQuestion) return [rawPermissionANotAQuestion];

  const templateANotAQuestion = templateConstructionFor(core, ["ANotAQuestion"]);
  if (templateANotAQuestion) return [templateANotAQuestion];

  const rawANotAQuestion = aNotAQuestionFallback(core);
  if (rawANotAQuestion) return [rawANotAQuestion];

  const potentialResultSpan = potentialResultVPFallback(core);
  if (potentialResultSpan) return [potentialResultSpan];

  const incompletePotentialResult = incompletePotentialResultCandidate(core);
  if (incompletePotentialResult) return [incompletePotentialResult];

  const transitionMotionSpan = transitionMotionPredicateFallback(core);
  if (transitionMotionSpan) return [transitionMotionSpan];

  const sourceLinkedDegreeMannerSpan = sourceLinkedDegreeMannerModifiedVPFallback(core);
  if (sourceLinkedDegreeMannerSpan) return [sourceLinkedDegreeMannerSpan];

  const sourceLinkedPrioritySpan = sourceLinkedPriorityMarkerClauseFallback(core);
  if (sourceLinkedPrioritySpan) return [sourceLinkedPrioritySpan];

  const sourceLinkedPreferenceSpan = sourceLinkedPreferenceVPFallback(core);
  if (sourceLinkedPreferenceSpan) return [sourceLinkedPreferenceSpan];

  // Preference needs a top-level pass before broad NP category wrapping.
  // Otherwise 鍾意 + VP can be mis-wrapped as ModifiedNP because the VP exports noun/object slots from its object child.
  const rawPreferenceSpan = rawPreferenceTemplateFallback(core);
  if (rawPreferenceSpan) return [rawPreferenceSpan];

  const negativeCognitionSpan = negativeCognitionFragmentFallback(core);
  if (negativeCognitionSpan) return [negativeCognitionSpan];

  const cognitionStatementSpan = cognitionStatementFallback(core);
  if (cognitionStatementSpan) return [cognitionStatementSpan];

  const cognitionContentSpan = cognitionContentFrameFallback(core);
  if (cognitionContentSpan) return [cognitionContentSpan];

  const opinionStanceSpan = opinionStanceFrameFallback(core);
  if (opinionStanceSpan) return [opinionStanceSpan];

  const reportedSpeechSpan = reportedSpeechFrameFallback(core);
  if (reportedSpeechSpan) return [reportedSpeechSpan];

  // The narrow intended-function relation must precede generic VP-complement
  // routing; otherwise 用嚟 is prematurely reanalysed as lexical 用 plus
  // directional 嚟, especially after classifier-led topics such as 部電腦.
  const intendedFunctionSpan = intendedFunctionRelationFallback(core);
  if (intendedFunctionSpan) return [intendedFunctionSpan];

  const sourceLinkedIntentionSpan = sourceLinkedIntentionFrameFallback(core);
  if (sourceLinkedIntentionSpan) return [sourceLinkedIntentionSpan];

  const namingSelfIntroductionSpan = namingSelfIntroductionFrameFallback(core);
  if (namingSelfIntroductionSpan) return [namingSelfIntroductionSpan];

  const politeRequestAdjustmentSpan = politeRequestAdjustmentFallback(core);
  if (politeRequestAdjustmentSpan) return [politeRequestAdjustmentSpan];

  const transparentDiscourseFormulaSpan = transparentDiscourseFormulaFallback(core);
  if (transparentDiscourseFormulaSpan) return [transparentDiscourseFormulaSpan];

  const leaveTakingFormulaSpan = leaveTakingFormulaFallback(core);
  if (leaveTakingFormulaSpan) return [leaveTakingFormulaSpan];

  const politePathImperativeSpan = politePathImperativeFallback(core);
  if (politePathImperativeSpan) return [politePathImperativeSpan];

  const polarQuestionSpan = polarQuestionFrameFallback(core);
  if (polarQuestionSpan) return [polarQuestionSpan];

  const interiorExistentialSpan = interiorExistentialFrameFallback(core);
  if (interiorExistentialSpan) return [interiorExistentialSpan];

  const copularIdentificationSpan = copularIdentificationFrameFallback(core);
  if (copularIdentificationSpan) return [copularIdentificationSpan];

  const passivePermissiveSpan = passivePermissiveRelationFallback(core);
  if (passivePermissiveSpan) return [passivePermissiveSpan];

  const lexicalGiveSpan = lexicalGiveRelationFallback(core);
  if (lexicalGiveSpan) return [lexicalGiveSpan];

  const postThemeParticipantSpan = postThemeParticipantRelationFallback(core);
  if (postThemeParticipantSpan) return [postThemeParticipantSpan];

  const mannerAdverbialSpan = mannerAdverbialVPFallback(core);
  if (mannerAdverbialSpan) return [mannerAdverbialSpan];

  const sourceMotionSpan = sourceMotionClauseFallback(core);
  if (sourceMotionSpan) return [sourceMotionSpan];

  const locativePostureSpan = locativePostureVPFallback(core);
  if (locativePostureSpan) return [locativePostureSpan];

  const subjectLocativePredicateSpan = subjectLocativePredicateClauseFallback(core);
  if (subjectLocativePredicateSpan) return [subjectLocativePredicateSpan];

  const coordinatedNPFragmentSpan = coordinatedNPFragmentFallback(core);
  if (coordinatedNPFragmentSpan) return [coordinatedNPFragmentSpan];

  const coverbFrameSpan = coverbFrameFallback(core);
  if (coverbFrameSpan) return [coverbFrameSpan];

  const coordinatedSubjectModalSpan = coordinatedSubjectModalPredicateClauseFallback(core);
  if (coordinatedSubjectModalSpan) return [coordinatedSubjectModalSpan];

  const rawCompositionalPostverbalZo = postverbalZoPerfectiveFromRawNodes(core);
  if (rawCompositionalPostverbalZo) return rawCompositionalPostverbalZo;

  core = wrapAgreementResponseSubspans(core);
  core = wrapDirectionalMotionSubspans(core);
  core = wrapSerialPurposeTemplateSubspans(core);
  core = wrapSerialVerbPurposeSubspans(core);
  core = wrapPriorityMarkerSubspans(core);
  core = wrapChangeIntoPredicateSubspans(core);
  core = wrapPossessiveClassifierNPSubspans(core);
  core = wrapPermissionAcceptabilitySubspans(core);
  core = wrapCategorySubspans(core);
  core = wrapNegatedVPSubspans(core);
  core = wrapCategorySubspans(core);
  core = wrapCategorySubspans(core);

  const recomposedPostverbalZo = postverbalZoPerfectiveFromWrappedNodes(core);
  if (recomposedPostverbalZo) core = recomposedPostverbalZo;

  // Retry result/phase + perfective composition after NP subspans have formed.
  // This is required for independently attested V + 完 + 咗 + multi-token NP
  // objects such as 啲飯 and 本書, which cannot match the raw four-node fallback.
  const postSubspanPerfectiveResultComposition = perfectiveResultCompositionFallback(core);
  if (postSubspanPerfectiveResultComposition) return [postSubspanPerfectiveResultComposition];

  const postSubspanExistentialVpMalformed = existentialQuestionWithVpMalformedCandidate(core);
  if (postSubspanExistentialVpMalformed) return [postSubspanExistentialVpMalformed];

  const postSubspanMandarinNegatorNeedsContext = mandarinNegatorNeedsContextCandidate(core);
  if (postSubspanMandarinNegatorNeedsContext) return [postSubspanMandarinNegatorNeedsContext];

  const postSubspanPossessiveFragmentAnswer = possessiveFragmentAnswerCandidate(core);
  if (postSubspanPossessiveFragmentAnswer) return [postSubspanPossessiveFragmentAnswer];

  const postSubspanMandarinReviewNeedsContext = mandarinReviewNeedsContextCandidate(core);
  if (postSubspanMandarinReviewNeedsContext) return [postSubspanMandarinReviewNeedsContext];

  const progressiveWhObjectSpan = progressiveWhObjectQuestionFallback(core);
  if (progressiveWhObjectSpan) return [progressiveWhObjectSpan];

  const subjectStativeSpan = subjectStativePredicateClauseFallback(core);
  if (subjectStativeSpan) return [subjectStativeSpan];

  const scalarValueQuestionSpan = scalarValueQuestionFallback(core);
  if (scalarValueQuestionSpan) return [scalarValueQuestionSpan];

  const protectedOpaqueFormulaSpan = protectedOpaqueFormulaPassthrough(core);
  if (protectedOpaqueFormulaSpan) return [protectedOpaqueFormulaSpan];

  // Preserve an already-resolved overt predicate-object construction before broad
  // category templates can rewrap it (for example, TransitiveVP as NominalHeadSpan).
  // Review decorates the resolved structure; it does not replace or flatten it.
  if (core.length === 1 && core[0].kind === "construction") {
    const reviewedResolvedConstruction = overtObjectSelectionReviewCandidate(core);
    if (reviewedResolvedConstruction) return [reviewedResolvedConstruction];
  }

  core = completionThenStandaloneWalkResolution(core);
  const generativeSpan = templateConstructionFor(core);
  if (generativeSpan) {
    const reviewedGenerativeSpan = overtObjectSelectionReviewCandidate([generativeSpan]);
    return [reviewedGenerativeSpan || generativeSpan];
  }

  const completionQuestion = completionQuestionFallback(core);
  if (completionQuestion) {
    const reviewedCompletionQuestion = overtObjectSelectionReviewCandidate([completionQuestion]);
    return [reviewedCompletionQuestion || completionQuestion];
  }

  if (core.length === 1 && core[0].kind === "construction") {
    const reviewedExistingConstruction = overtObjectSelectionReviewCandidate(core);
    return [reviewedExistingConstruction || core[0]];
  }

  // Opinion + seeming fallback: normally handled by OpinionStanceFrame template.
  if ((hasSurface(core, "覺得") || hasSurface(core, "我覺得")) && hasSurface(core, "好似")) {
    const opinionChildren = contextualOpinionPlaceholderChildren(core);
    return [construction("OpinionStanceFrame", "Opinion/Stance", opinionChildren, { note: "Opinion/seeming fallback: 覺得 + 好似 + predicate.", trace: traceInfo("legacy_surface_rule", { rule: "has 覺得/我覺得 and 好似", reason: "Fallback only; generative OpinionStanceFrame should normally catch this." }) })];
  }

  const experientialYesNoQuestion = experientialYesNoQuestionFallback(core);
  if (experientialYesNoQuestion) return [experientialYesNoQuestion];

  const interestDomainExistentialQuestion = interestDomainExistentialQuestionFallback(core);
  if (interestDomainExistentialQuestion) return [interestDomainExistentialQuestion];

  const locativeWhQuestion = locativeWhQuestionFallback(core);
  if (locativeWhQuestion) return [locativeWhQuestion];
  const completionThenRelation = completionThenClauseRelation(core);
  if (completionThenRelation) return [completionThenRelation];

  // Reported speech: NP 話 predicate/clause.
  const waaIndex = indexOfSurface(core, "話");
  if (waaIndex > 0 && waaIndex < core.length - 1) {
    const reportedChildren = contextualReportedSpeechLearnerChildren(core);
    return [construction("ReportedSpeech", "Reported", reportedChildren, { note: "Reported speech/thought: NP 話 + clause.", trace: traceInfo("legacy_surface_rule", { rule: "NP before 話 and material after", reason: "Surface speech verb fallback." }) })];
  }

  const experientialQuestionBoundary = experientialQuestionBoundaryFallback(core);
  if (experientialQuestionBoundary) return [experientialQuestionBoundary];

  const desiderativeSpan = desiderativeVPWrapCoreFallback(core);
  if (desiderativeSpan) return [desiderativeSpan];

  const scalarEvaluationSpan = scalarEvaluationFallback(core);
  if (scalarEvaluationSpan) return [scalarEvaluationSpan];
  // Scalar value question patterns. Price is domain metadata, not the construction label.
  if (hasSurface(core, "幾錢")) {
    const scalar = scalarValueQuestionFallback(core);
    if (scalar) return [scalar];
  }
  const approximateQuantitySpan = approximateQuantityFallback(core);
  if (approximateQuantitySpan) return [approximateQuantitySpan];

  const suggestionQuestion = suggestionQuestionFallback(core);
  if (suggestionQuestion) return [suggestionQuestion];
  const acceptabilityANotAQuestion = acceptabilityANotAQuestionFallback(core);
  if (acceptabilityANotAQuestion) return [acceptabilityANotAQuestion];

  const existentialWhQuestion = existentialWhQuestionFallback(core);
  if (existentialWhQuestion) return [existentialWhQuestion];

  // Preference fallback: normally handled by the PreferenceVP template before broad NP category wrapping.
  const preferenceFallbackSpan = preferenceVPWrapCoreFallback(core);
  if (preferenceFallbackSpan) return [preferenceFallbackSpan];

  // Temporal clause fallback: normally handled by the TemporalClause template.
  if (core.length >= 2 && firstToken(core[0]) && firstToken(core[0]).label === "when") {
    return [construction("TemporalClause", "Time", core, {
      note: "Time expression fallback frames the following predicate.",
      trace: traceInfo("construction_function", {
        construction_type: "TemporalClause",
        reason: "Fallback only; generative TemporalClause should normally catch this."
      })
    })];
  }

  // Topic-comment: 呢個 唔 好食 / 呢個 好食 / 呢個 好 開心
  if (isTopicCandidate(core[0]) && core.length >= 2) {
    const topic = construction("Topic", "topic", [core[0]], { primary: "topic", note: "Topic with secondary semantic role what." });
    const commentChildren = wrapPredicate(core.slice(1));
    return [construction("TopicComment", "TopicComment", [topic, ...commentChildren], {
      note: "Topic-comment construction with comment represented as predicate-role metadata rather than a redundant child wrapper.",
      slots: cleanSlots(["topic_comment", "topic", "comment", "comment_predicate", "predicate", "clause", ...templateDerivedSlots("TopicComment", [topic, ...commentChildren])]),
      trace: traceInfo("generative_or_heuristic_slot_rule", {
        rule: "topic candidate followed by typed comment predicate",
        reason: "Structural heuristic; the comment relation is carried by TopicComment slots rather than a standalone Comment construction.",
      }),
    })];
  }

  const prohibitiveImperativeSpan = prohibitiveImperativeFallback(core);
  if (prohibitiveImperativeSpan) return [prohibitiveImperativeSpan];

  const inlineANotAQuestion = inlineANotAQuestionFallback(core);
  if (inlineANotAQuestion) return [inlineANotAQuestion];

  const completionQuestionWithPerfectiveMarker = completionQuestionWithPerfectiveMarkerFallback(core);
  if (completionQuestionWithPerfectiveMarker) return [completionQuestionWithPerfectiveMarker];

  // Negative potential: V 唔 到 Obj?
  if (core.length >= 3 && isVerbLike(core[0]) && isToken(core[1], "唔") && isToken(core[2], "到")) {
    return [construction("NegativePotentialComplement", "NegPotential", core, { note: "Negative potential/result complement.", trace: traceInfo("generative_or_heuristic_slot_rule", { rule: "verb + 唔 + 到", reason: "Structural potential complement heuristic." }) })];
  }

  // Positive result/attainment: V 到 Obj?
  if (core.length >= 2 && isVerbLike(core[0]) && isToken(core[1], "到")) {
    return [construction("ResultComplement", "Result", core, { note: "Positive result/attainment complement.", trace: traceInfo("generative_or_heuristic_slot_rule", { rule: "verb + 到", reason: "Structural result complement heuristic." }) })];
  }

  // Modal + VP/predicate: NP? Modal Predicate.
  // v0.5.56: prefer governed generative ModalVP; retain the old slot heuristic only as a final fallback.
  const modalPredicateWrapSpan = modalPredicateWrapCoreFallback(core);
  if (modalPredicateWrapSpan) return modalPredicateWrapSpan;

  return wrapPredicate(core);
}



function hasSentencePunctuation(text) {
  return /[，。！？、；：,.!?;:]/u.test(String(text || ""));
}

function isClauseSequenceSeparator(node) {
  return node && node.kind === "text" && /[，,；;]/u.test(String(node.text || ""));
}

function isClauseSequenceTerminal(node) {
  return node && node.kind === "text" && /[。！？.!?]/u.test(String(node.text || ""));
}

function isClauseSequenceMeaningfulNode(node) {
  if (!node || node.kind !== "construction") return false;
  if (node.type === "ClauseSequence" || node.type === "ClauseRelationGraph") return false;
  return true;
}

const CLAUSE_LINKER_SURFACES = new Set(["之後", "之前", "然後", "跟住", "跟住就", "先", "再", "就", "咁", "噉", "所以", "因為", "雖然", "不過", "但係", "如果"]);

function isTopicFrameLinker(node) {
  return !!(node && node.kind === "token" && nodeSlots(node).includes("topic_frame_linker"));
}

function isRelationalCoverbLinker(node) {
  return !!(node && node.kind === "token" && nodeSlots(node).includes("relational_coverb_linker"));
}

function directWrapperItemSurface(node) {
  if (!node) return "";
  if (node.kind === "text") return node.text || "";
  return flattenSurface(node);
}

function clauseLinkingPivotIndex(children = [], separatorIndex = -1) {
  if (separatorIndex >= 0) return separatorIndex;
  const pivotSurfaces = new Set(["就", "所以", "但係", "不過", "之後", "之前", "然後", "跟住", "跟住就"]);
  for (let index = 1; index < children.length; index++) {
    const node = children[index];
    if (node && node.kind === "token" && pivotSurfaces.has(node.surface || "")) return index;
  }
  return -1;
}

function clauseLinkerRole(node, index, pivotIndex) {
  if (!node || node.kind !== "token") return "";
  const surface = node.surface || "";
  const slots = nodeSlots(node);
  const side = pivotIndex >= 0 && index > pivotIndex ? "pre_child" : "post_child";
  if (surface === "如果") return "condition_introducer";
  if (surface === "因為") return "reason_introducer";
  if (surface === "所以") return "result_linker";
  if (surface === "與其") return "disfavored_option_introducer";
  if (surface === "不如") return "preferred_option_introducer";
  if (surface === "但係" || surface === "不過") return "contrast_linker";
  if (slots.includes("topic_frame_linker")) return "topic_frame_linker";
  if (slots.includes("relational_coverb_linker")) return "relational_coverb_linker";
  if (surface === "之後" || surface === "之前" || slots.includes("time") || slots.includes("time_head")) return `${side}_temporal_linker`;
  if (surface === "先" || surface === "再" || surface === "然後" || surface === "跟住" || surface === "跟住就") return `${side}_sequence_linker`;
  if (slots.includes("subject")) return `${side}_clause_subject`;
  if (slots.includes("focus_adverb")) return `${side}_focus_adverb`;
  if (surface === "就" || slots.includes("result_marker")) return `${side}_sequence_linker`;
  if (CLAUSE_LINKER_SURFACES.has(surface) || slots.includes("discourse_marker")) return `${side}_discourse_linker`;
  return "";
}

function clauseLinkerInventory(children = []) {
  const separatorIndex = children.findIndex(isClauseSequenceSeparator);
  const pivotIndex = clauseLinkingPivotIndex(children, separatorIndex);
  return children
    .map((node, index) => {
      if (!node || node.kind !== "token") return null;
      const role = clauseLinkerRole(node, index, pivotIndex);
      return role ? { surface: node.surface || "", role } : null;
    })
    .filter(Boolean);
}

function clauseLinkingWrapperCoverage(children = []) {
  const separatorIndexes = children
    .map((node, index) => isClauseSequenceSeparator(node) ? index : -1)
    .filter((index) => index >= 0);
  const separatorIndex = separatorIndexes.length ? separatorIndexes[0] : -1;
  const pivotIndex = clauseLinkingPivotIndex(children, separatorIndex);
  const accountedChildren = [];
  const accountedLinkers = [];
  const accountedSeparators = [];
  const unaccountedTokens = [];

  children.forEach((node, index) => {
    const surface = directWrapperItemSurface(node);
    if (!node) return;
    if (node.kind === "construction") {
      const precededByTopicFrameLinker = index > 0 && isTopicFrameLinker(children[index - 1]);
      const precededByRelationalCoverbLinker = index > 0 && isRelationalCoverbLinker(children[index - 1]);
      accountedChildren.push({
        surface,
        construction: node.type,
        role: precededByTopicFrameLinker
          ? "topic_frame_domain"
          : (precededByRelationalCoverbLinker
            ? "relational_coverb_domain"
            : (index < pivotIndex || pivotIndex < 0 ? "left_clause_like" : "right_clause_like")),
      });
      return;
    }
    if (isClauseSequenceSeparator(node)) {
      accountedSeparators.push({ surface, role: "visible_separator" });
      return;
    }
    if (node.kind === "token") {
      const role = clauseLinkerRole(node, index, pivotIndex);
      if (role) {
        accountedLinkers.push({ surface, role, slots: learnerDisplaySlots(nodeSlots(node)) });
      } else {
        unaccountedTokens.push({ surface, kind: "token", index });
      }
      return;
    }
    if (node.kind === "text" && surface.trim()) {
      unaccountedTokens.push({ surface, kind: "text", index });
    }
  });

  return {
    status: unaccountedTokens.length ? "WARN" : "PASS",
    policy: "ClauseRelationGraph may group linked clause-like material, but it must not hide wrapper holes. Every direct item inside the wrapper must be accounted for as a child construction, linker material, or separator material.",
    accounted_children: accountedChildren,
    accounted_linkers: accountedLinkers,
    accounted_separators: accountedSeparators,
    unaccounted_tokens: unaccountedTokens,
    unaccounted_wrapper_token_count: unaccountedTokens.length,
  };
}


const ASSIGNED_SLOT_WRAPPER_COVERAGE_TYPES = new Set(["ModalANotAQuestion"]);

function wrapperSlotDisplayRole(type, slot) {
  if (type === "ModalANotAQuestion") {
    const roles = {
      subject: "subject",
      modal_a_not_a: "modal_a_not_a",
      modal_positive_arm: "positive_modal_arm",
      negator: "negator",
      modal_negative_arm: "negative_modal_arm",
      vp: "requested_action_vp",
      particle: "final_particle",
    };
    return roles[slot] || slot || "";
  }
  return slot || "";
}

function assignedSlotWrapperCoverage(type, children = [], assignedSlots = []) {
  if (!ASSIGNED_SLOT_WRAPPER_COVERAGE_TYPES.has(type)) return null;
  const accountedParts = [];
  const unaccountedTokens = [];
  children.forEach((node, index) => {
    const surface = directWrapperItemSurface(node);
    const slot = assignedSlots[index] || "";
    const role = wrapperSlotDisplayRole(type, slot);
    if (slot && role) {
      const part = {
        surface,
        role,
        assigned_slot: slot,
        kind: node && node.kind ? node.kind : "",
      };
      if (node && node.kind === "construction") part.construction = node.type || "";
      accountedParts.push(part);
      return;
    }
    if (node && node.kind === "text" && !String(surface || "").trim()) return;
    unaccountedTokens.push({ surface, kind: node && node.kind ? node.kind : "unknown", index });
  });
  return {
    status: unaccountedTokens.length ? "WARN" : "PASS",
    coverage_kind: "assigned_slot_wrapper",
    policy: "Greedy-looking parent wrappers may be collapsed in normal learner display only when every direct child is explicitly accounted for by an assigned slot. Collapse must not hide wrapper holes.",
    accounted_parts: accountedParts,
    unaccounted_tokens: unaccountedTokens,
    unaccounted_wrapper_token_count: unaccountedTokens.length,
  };
}

function wrapperCoverageForConstructionNode(node) {
  if (!node || node.kind !== "construction") return null;
  if (node.type === "ClauseRelationGraph") {
    return (node.trace && node.trace.wrapper_coverage) || clauseLinkingWrapperCoverage(node.children || []);
  }
  if (ASSIGNED_SLOT_WRAPPER_COVERAGE_TYPES.has(node.type)) {
    const trace = node.trace || {};
    return trace.wrapper_coverage || assignedSlotWrapperCoverage(node.type, node.children || [], trace.assigned_slots || []);
  }
  return null;
}


function meaningfulClauseConstructionCount(nodes = []) {
  return nodes.filter(isClauseSequenceMeaningfulNode).length;
}

function parsedClauseNodes(segment = []) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (!compact.length) return [];
  const parsed = applyConstructionPatterns(compact);
  if (parsed.length === 1 && parsed[0] && parsed[0].kind === "construction" && parsed[0].type === "NominalHeadSpan") {
    const productiveChild = (parsed[0].children || []).find((child) => child && child.kind === "construction" && child.type === "ProductiveVO" && nodeCanFillSlot(child, "vp"));
    if (productiveChild && flattenSurface(productiveChild) === flattenSurface(parsed[0])) return [productiveChild];
  }
  return parsed;
}

function buildGovernedClauseRelationGraph(children = [], detail = {}) {
  const compact = withoutIgnorableSpaceText(children || []);
  if (meaningfulClauseConstructionCount(compact) < 2) return null;
  const wrapperCoverage = clauseLinkingWrapperCoverage(compact);
  if (wrapperCoverage.unaccounted_wrapper_token_count > 0) return null;
  return construction("ClauseRelationGraph", "ClauseLink", compact, {
    note: detail.note || "Linked clauses. This governed discourse/coordination wrapper preserves all child constructions and explicitly accounts for linker/separator material; it does not replace or flatten the child clauses.",
    trace: traceInfo("governed_discourse_wrapper", {
      rule: detail.rule || "connector-governed clause-linking sequence",
      reason: detail.reason || "Connector-governed clause linking groups independently parsed clause-like children while keeping linkers and separators visible and accounted for.",
      graph_container_semantic_status: "neutral_container_only",
      independent_grammar_licensing: false,
      relation_semantics_source: "preexisting_child_constructions_and_linker_rules_only",
      child_constructions: compact
        .filter((node) => node && node.kind === "construction")
        .map((node) => node.type),
      linkers: clauseLinkerInventory(compact),
      separators: compact
        .filter(isClauseSequenceSeparator)
        .map((node) => node.text),
      wrapper_coverage: wrapperCoverage,
      ...(detail.trace_detail || {}),
    })
  });
}

function connectorLeadingClauseSegment(segment = []) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 2) return null;
  const first = compact[0];
  if (!first || first.kind !== "token" || !CLAUSE_LINKER_SURFACES.has(first.surface || "")) return null;
  if (!["但係", "不過", "所以", "然後", "跟住", "跟住就", "就", "咁", "噉"].includes(first.surface || "")) return null;
  const parsedRest = parsedClauseNodes(compact.slice(1));
  if (!parsedRest.length || meaningfulClauseConstructionCount(parsedRest) < 1) return null;
  return [first, ...parsedRest];
}

function connectorPairClauseLinkingSegment(segment = []) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 4) return null;
  const surfaceAt = (index) => compact[index] && compact[index].kind === "token" ? compact[index].surface || "" : "";
  const firstSurface = surfaceAt(0);

  const pairedPatterns = [
    {
      opener: "如果",
      pivot: "就",
      rule: "如果...就 condition-result clause-linking sequence",
      reason: "如果 introduces the condition and 就 introduces the result; both sides are parsed independently under a broad ClauseRelationGraph wrapper.",
      subtype: "condition_result",
    },
    {
      opener: "因為",
      pivot: "所以",
      rule: "因為...所以 reason-result clause-linking sequence",
      reason: "因為 introduces the reason and 所以 introduces the result; both sides are parsed independently under a broad ClauseRelationGraph wrapper.",
      subtype: "reason_result",
    },
  ];
  for (const pattern of pairedPatterns) {
    if (firstSurface !== pattern.opener) continue;
    const pivotIndex = compact.findIndex((node, index) => index > 1 && node && node.kind === "token" && (node.surface || "") === pattern.pivot);
    if (pivotIndex < 0) continue;
    const left = parsedClauseNodes(compact.slice(1, pivotIndex));
    const right = parsedClauseNodes(compact.slice(pivotIndex + 1));
    const wrapper = buildGovernedClauseRelationGraph([compact[0], ...left, compact[pivotIndex], ...right], {
      rule: pattern.rule,
      reason: pattern.reason,
      trace_detail: { clause_linking_subtype: pattern.subtype },
    });
    if (wrapper) return wrapper;
  }

  const temporalIndex = compact.findIndex((node, index) => index > 0 && node && node.kind === "token" && ["之後", "之前"].includes(node.surface || ""));
  if (temporalIndex > 0 && temporalIndex < compact.length - 1) {
    const left = parsedClauseNodes(compact.slice(0, temporalIndex));
    const right = parsedClauseNodes(compact.slice(temporalIndex + 1));
    const linker = compact[temporalIndex];
    const wrapper = buildGovernedClauseRelationGraph([...left, linker, ...right], {
      rule: `${linker.surface} temporal clause-linking sequence`,
      reason: `${linker.surface} links a preceding event/clause-like unit to a following event/clause-like unit; the wrapper keeps both children visible.`,
      trace_detail: { clause_linking_subtype: "temporal_sequence" },
    });
    if (wrapper) return wrapper;
  }

  const contrastIndex = compact.findIndex((node, index) => index > 0 && node && node.kind === "token" && ["但係", "不過"].includes(node.surface || ""));
  if (contrastIndex > 0 && contrastIndex < compact.length - 1) {
    const left = parsedClauseNodes(compact.slice(0, contrastIndex));
    const right = parsedClauseNodes(compact.slice(contrastIndex + 1));
    const linker = compact[contrastIndex];
    const wrapper = buildGovernedClauseRelationGraph([...left, linker, ...right], {
      rule: `${linker.surface} contrast clause-linking sequence`,
      reason: `${linker.surface} links two contrasting clause-like units; the wrapper keeps both child parses and the contrast marker visible.`,
      trace_detail: { clause_linking_subtype: "contrast" },
    });
    if (wrapper) return wrapper;
  }

  return null;
}

function connectorAwareClauseLinkingForTerminal(segment = []) {
  const pairWrapper = connectorPairClauseLinkingSegment(segment);
  if (pairWrapper) return [pairWrapper];
  const leading = connectorLeadingClauseSegment(segment);
  if (leading) return leading;
  return null;
}




function clauseRelationLeafNodes(node) {
  if (!node) return [];
  if (node.kind === "token" || node.kind === "text") return [node];
  if (node.kind === "construction") return (node.children || []).flatMap(clauseRelationLeafNodes);
  return [];
}

function clauseRelationSegmentNodes(segment = []) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (
    compact.length === 1 &&
    compact[0] &&
    compact[0].kind === "construction" &&
    ["RelativeClauseNP"].includes(compact[0].type)
  ) return compact.slice();
  return compact.flatMap(clauseRelationLeafNodes).filter((node) => !(node.kind === "text" && !String(node.text || "").trim()));
}

function clauseRelationSurfaceList(nodes = []) {
  return (nodes || []).map((node) => flattenSurface(node));
}

function clauseRelationSurfaceIndex(nodes = [], surfaces = [], start = 0) {
  const wanted = new Set(surfaces || []);
  for (let index = Math.max(0, start); index < nodes.length; index += 1) {
    if (wanted.has(flattenSurface(nodes[index]))) return index;
  }
  return -1;
}

function clauseRelationContainsSurface(nodes = [], surface = "") {
  return clauseRelationSurfaceIndex(nodes, [surface]) >= 0;
}

function clauseRelationActionVPFor(nodes = [], options = {}) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  const first = compact[0];
  const firstTok = firstToken(first);
  if (!firstTok || !nodeCanFillSlot(first, "action_verb")) return null;

  if (compact.length === 1) {
    return construction("IntransitiveVP", "VP", compact, {
      note: "Broad intransitive/action VP used as a visible clause-relation member.",
      trace: traceInfo("generative_template", {
        construction_type: "IntransitiveVP",
        template_family: "generative_template",
        template: ["action_verb!"],
        assigned_slots: ["action_verb"],
        relation_member_scope: true,
        reason: "A visible action predicate without an overt object is preserved as a VP member; no subject or object token is inserted.",
        not_claims: ["not_fabricated_subject", "not_fabricated_object"],
      }),
    });
  }

  const objectNodes = compact.slice(1);
  const objectParsed = applyConstructionPatterns(objectNodes);
  const objectLike = objectParsed.length === 1
    ? objectParsed[0]
    : (objectNodes.length === 1 ? objectNodes[0] : null);
  if (
    objectLike &&
    (nodeCanFillSlot(objectLike, "object") || nodeCanFillSlot(objectLike, "np") || nodeCanFillSlot(objectLike, "head_noun") || nodeCanFillSlot(objectLike, "subject"))
  ) {
    const children = [first, objectLike];
    return construction("TransitiveVP", "V+O", children, {
      note: "Transparent transitive VP used inside a clause relation.",
      trace: traceInfo("generative_template", {
        construction_type: "TransitiveVP",
        template_family: "generative_template",
        template: ["action_verb!", "object!"],
        assigned_slots: ["action_verb", "object"],
        relation_member_scope: true,
        reason: "The relation-member parser preserves an overt action verb and overt nominal object as one transparent VP.",
      }),
    });
  }
  return null;
}

function clauseRelationParsedChunk(nodes = [], options = {}) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return [];
  if (compact.length === 1 && compact[0] && compact[0].kind === "construction") return compact.slice();

  if (options.immediate_temporal_trigger && compact.some((node) => flattenSurface(node) === "見到")) {
    const immediatePredicate = clauseRelationActionVPFor(compact, options);
    if (immediatePredicate) return [immediatePredicate];
  }

  const parsed = applyConstructionPatterns(compact);
  if (parsed.some((node) => node && node.kind === "construction")) return parsed;

  if (nodeCanFillSlot(compact[0], "subject") && compact.length >= 2) {
    const subject = compact[0];
    const predicateNodes = compact.slice(1);
    let predicateChildren = applyConstructionPatterns(predicateNodes);
    if (!predicateChildren.some((node) => node && node.kind === "construction")) {
      const vp = clauseRelationActionVPFor(predicateNodes, options);
      if (vp) predicateChildren = [vp];
    }
    if (predicateChildren.some((node) => node && (node.kind === "construction" || nodeCanFillSlot(node, "predicate") || nodeCanFillSlot(node, "vp")))) {
      const children = [subject, ...predicateChildren];
      return [construction("SubjectPredicateClause", "Clause", children, {
        note: "Subject plus visible predicate material inside a typed clause relation.",
        trace: traceInfo("generative_template", {
          construction_type: "SubjectPredicateClause",
          template_family: "generative_template",
          template: ["subject!", "predicate!"],
          assigned_slots: ["subject", "predicate"],
          relation_member_scope: true,
          subject_status: "overt",
          reason: "The relation architecture groups an overt subject with its visible predicate while preserving every token and without inserting omitted material.",
        }),
      })];
    }
  }

  const vp = clauseRelationActionVPFor(compact, options);
  if (vp) return [vp];
  return parsed;
}

function clauseRelationLinkerClone(node, relationSubtype, side, semanticRole, relationId) {
  if (!node || node.kind !== "token") return node;
  const surface = flattenSurface(node);
  const label = surface === "一" ? "func" : (node.label || "func");
  return parserInactiveTokenClone(node, {
    label,
    pos: "function",
    syntax: `${node.syntax || "clause_relation_linker"} clause_relation_linker ${relationSubtype}_relation_linker`,
    slots: cleanSlots([...(node.slots || []), "clause_relation_linker", side === "left" ? "linker_left" : "linker_right"]),
    reason: `The overt linker ${surface} is owned by the local ${relationSubtype} clause relation on the ${side} side; no absent partner is inserted.`,
    trace_detail: {
      clause_relation_id: relationId,
      relation_subtype: relationSubtype,
      linker_side: side,
      linker_semantic_role: semanticRole,
      linker_ownership_status: "owned_by_local_clause_relation",
    },
  });
}

function clauseRelationMember(nodes = [], options = {}) {
  const raw = clauseRelationSegmentNodes(nodes);
  if (!raw.length) return null;
  const linkerSpecs = Array.isArray(options.linkers) ? options.linkers.slice().sort((a, b) => a.index - b.index) : [];
  const linkerByIndex = new Map(linkerSpecs.map((item) => [item.index, item]));
  const children = [];
  let chunk = [];
  const flushChunk = () => {
    if (!chunk.length) return;
    children.push(...clauseRelationParsedChunk(chunk, options));
    chunk = [];
  };

  raw.forEach((node, index) => {
    const spec = linkerByIndex.get(index);
    if (!spec) {
      if (node && node.kind === "token" && flattenSurface(node) === "仲" && !node.jyutping) {
        chunk.push(token("仲", {
          label: "how",
          jyutping: "zung6",
          syntax: "focus_adverb continuative_adverb",
          note: "still / furthermore; resolved locally inside a typed clause relation",
        }));
      } else {
        chunk.push(node);
      }
      return;
    }
    flushChunk();
    children.push(clauseRelationLinkerClone(node, options.relation_subtype, spec.side, spec.semantic_role, options.relation_id));
  });
  flushChunk();

  if (!children.length) return null;
  const firstClauseChild = children.find((child) => {
    if (!child) return false;
    if (child.kind === "token") return !(child.slots || []).includes("clause_relation_linker");
    return child.kind === "construction";
  }) || null;
  let overtSubject = null;
  if (firstClauseChild && firstClauseChild.kind === "token" && (firstClauseChild.slots || []).includes("subject")) {
    overtSubject = firstClauseChild;
  } else if (firstClauseChild && firstClauseChild.kind === "construction") {
    const subjectBearing = [
      "ClauseSpan",
      "NominalHeadSpan",
      "RelativeClauseNP",
      "OpinionStanceFrame",
      "CognitionContentFrame",
      "ReportedSpeech",
    ].includes(firstClauseChild.type);
    if (subjectBearing) {
      overtSubject = flattenNodes([firstClauseChild]).find((row) => row.kind === "token" && (row.slots || []).includes("subject")) || null;
    }
  }
  const childConstructions = children.filter((node) => node && node.kind === "construction").map((node) => node.type);
  return construction("ClauseRelationMemberSpan", options.role === "left" ? "Relation-L" : "Relation-R", children, {
    note: "Transparent source-order member of a typed clause relation. Linkers remain visible and carry explicit local ownership.",
    trace: traceInfo("generative_template", {
      construction_type: "ClauseRelationMemberSpan",
      template_family: "generative_template",
      template: ["clause_material!", "relation_linker?"],
      assigned_slots: [options.role === "left" ? "left_relation_member" : "right_relation_member"],
      relation_member_role: options.role,
      relation_subtype: options.relation_subtype,
      relation_subtype_provenance: "inherited_from_parent_clause_relation_edge",
      clause_relation_id: options.relation_id,
      independent_grammar_licensing: false,
      context_resolution_capability: false,
      overt_subject_surface: overtSubject ? overtSubject.surface : "",
      subject_status: overtSubject ? "overt" : "not_overt",
      child_constructions: childConstructions,
      source_surface: raw.map((node) => flattenSurface(node)).join(""),
      reason: "A relation member is grouped as one clause-like span while retaining source order, overt linkers, parsed predicate children, and visible subjects.",
      not_claims: ["not_fabricated_subject", "not_fabricated_clause", "not_hidden_linker"],
    }),
  });
}

function clauseRelationSubjectSurface(member) {
  if (!member || member.kind !== "construction") return "";
  const memberTrace = member.trace || {};
  return String(memberTrace.overt_subject_surface || "");
}

function clauseRelationSubjectLinkage(leftMember, rightMember, relationSubtype) {
  const left = clauseRelationSubjectSurface(leftMember);
  const right = clauseRelationSubjectSurface(rightMember);
  if (left && right) return { status: "overt_subject_on_both_members", inherited_surface: "" };
  if (left && !right && ["concessive", "committed_preference", "ordered_preference", "premise_response", "sequential", "asyndetic_sequence"].includes(relationSubtype)) {
    return { status: "shared_overt_subject_inherited_by_right_member", inherited_surface: left };
  }
  if (left && !right) return { status: "left_subject_overt_right_subject_unresolved", inherited_surface: "" };
  if (!left && right) return { status: "right_subject_overt_left_subject_unresolved", inherited_surface: "" };
  if (!left && !right) return { status: "no_overt_subject_unresolved", inherited_surface: "" };
  return { status: "overt_subject_on_both_members", inherited_surface: "" };
}

function clauseRelationPairStatus(leftLinkers = [], rightLinkers = [], licensedAsyndetic = false) {
  if (leftLinkers.length && rightLinkers.length) return "both_overt";
  if (leftLinkers.length) return "left_overt_right_absent";
  if (rightLinkers.length) return "left_absent_right_overt";
  return licensedAsyndetic ? "both_absent_licensed_asyndetic" : "not_applicable";
}

function clauseRelationSemanticTrace(subtype, sourceOrder, leftMember, rightMember) {
  const leftSurface = flattenSurface(leftMember);
  const rightSurface = flattenSurface(rightMember);
  if (subtype === "conditional") return {
    antecedent_clause: leftSurface,
    consequent_clause: rightSurface,
  };
  if (subtype === "causal") {
    const reasonOnLeft = sourceOrder !== "result_then_reason";
    return {
      reason_clause: reasonOnLeft ? leftSurface : rightSurface,
      result_clause: reasonOnLeft ? rightSurface : leftSurface,
      causal_source_order: sourceOrder,
    };
  }
  if (subtype === "concessive") return {
    concession_clause: leftSurface,
    counterexpectation_clause: rightSurface,
  };
  if (subtype === "committed_preference") return {
    chosen_option: leftSurface,
    rejected_option: rightSurface,
  };
  if (subtype === "ordered_preference") return {
    disfavored_option: leftSurface,
    preferred_option: rightSurface,
  };
  if (subtype === "premise_response") return {
    established_premise: leftSurface,
    response_clause: rightSurface,
  };
  if (["sequential", "asyndetic_sequence"].includes(subtype)) return {
    earlier_event: leftSurface,
    later_event: rightSurface,
  };
  if (subtype === "temporal_subordinate") return {
    temporal_subordinate: leftSurface,
    matrix_clause: rightSurface,
  };
  return {};
}

function buildClauseRelationEdge(spec = {}) {
  if (!CLAUSE_RELATION_SUBTYPE_REGISTRY.has(spec.relation_subtype)) return null;
  const relationId = `clause-relation:${spec.relation_subtype}:${clauseRelationSurfaceList(spec.left_nodes).join("")}:${clauseRelationSurfaceList(spec.right_nodes).join("")}`;
  const leftMember = clauseRelationMember(spec.left_nodes, {
    role: "left",
    relation_subtype: spec.relation_subtype,
    relation_id: relationId,
    linkers: spec.left_linkers || [],
    immediate_temporal_trigger: Boolean(spec.immediate_temporal_trigger),
  });
  const rightMember = clauseRelationMember(spec.right_nodes, {
    role: "right",
    relation_subtype: spec.relation_subtype,
    relation_id: relationId,
    linkers: spec.right_linkers || [],
  });
  if (!leftMember || !rightMember) return null;

  const subjectLinkage = clauseRelationSubjectLinkage(leftMember, rightMember, spec.relation_subtype);
  const pairStatus = clauseRelationPairStatus(spec.left_linkers || [], spec.right_linkers || [], Boolean(spec.licensed_asyndetic));
  const children = [leftMember, spec.separator, rightMember].filter(Boolean);
  const leftLinkerSurfaces = (spec.left_linkers || []).map((item) => flattenSurface(clauseRelationSegmentNodes(spec.left_nodes)[item.index]));
  const rightLinkerSurfaces = (spec.right_linkers || []).map((item) => flattenSurface(clauseRelationSegmentNodes(spec.right_nodes)[item.index]));

  return construction("ClauseRelationEdge", "ClauseRel", children, {
    note: "Typed local relation between two transparent clause-like members. The relation owns overt linkers and records optional-pair and shared-subject provenance without hidden tokens.",
    trace: traceInfo("generative_template", {
      construction_type: "ClauseRelationEdge",
      template_family: "generative_template",
      template: ["left_relation_member!", "separator?", "right_relation_member!"],
      assigned_slots: ["left_relation_member", ...(spec.separator ? ["separator"] : []), "right_relation_member"],
      clause_relation_id: relationId,
      relation_subtype: spec.relation_subtype,
      relation_subtype_provenance: spec.relation_subtype_provenance || "inherited_mapped_clause_relation_rule",
      relation_subtype_registry_status: "validated_against_clause_relation_subtype_registry",
      independent_grammar_licensing: false,
      relation_context_status: "context_not_required",
      source_order: spec.source_order || "left_then_right",
      linker_left: leftLinkerSurfaces,
      linker_right: rightLinkerSurfaces,
      linker_pair_status: pairStatus,
      linker_ownership_status: "all_overt_linkers_owned_once",
      subject_linkage_status: subjectLinkage.status,
      inherited_subject_surface: subjectLinkage.inherited_surface,
      ...clauseRelationSemanticTrace(spec.relation_subtype, spec.source_order || "left_then_right", leftMember, rightMember),
      immediate_temporal_trigger: Boolean(spec.immediate_temporal_trigger),
      asyndetic_license: spec.licensed_asyndetic ? spec.asyndetic_license || "licensed_by_event_order_and_visible_separator" : "not_applicable",
      surfaces: children.map((node) => flattenSurface(node)),
      reason: spec.reason || "Overt linker evidence or a constrained asyndetic event-order pattern licenses one local typed clause relation instead of a flat discourse wrapper.",
      not_claims: [
        "not_fabricated_linker",
        "not_fabricated_subject",
        "not_fabricated_clause",
        "not_punctuation_only_relation",
      ],
    }),
  });
}

function completionThenClauseRelation(nodes = []) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  const markerIndex = compact.findIndex((node) =>
    node &&
    node.kind === "token" &&
    flattenSurface(node) === "就"
  );
  if (markerIndex <= 0 || markerIndex >= compact.length - 1) return null;

  let leftNodes = compact.slice(0, markerIndex);
  let rightNodes = compact.slice(markerIndex);
  let rightLinkerIndex = 0;
  const preMarkerSubject = compact[markerIndex - 1];
  const completionBeforePreMarkerSubject = hasConstruction(
    compact.slice(0, markerIndex - 1),
    "CompletionVP"
  );
  if (
    preMarkerSubject &&
    nodeCanFillSlot(preMarkerSubject, "subject") &&
    completionBeforePreMarkerSubject
  ) {
    leftNodes = compact.slice(0, markerIndex - 1);
    rightNodes = [preMarkerSubject, ...compact.slice(markerIndex)];
    rightLinkerIndex = clauseRelationSegmentNodes([preMarkerSubject]).length;
  }
  if (!hasConstruction(leftNodes, "CompletionVP")) return null;
  if (!rightNodes.slice(1).some((node) => flattenSurface(node))) return null;

  return buildClauseRelationEdge({
    relation_subtype: "sequential",
    left_nodes: leftNodes,
    right_nodes: rightNodes,
    right_linkers: [{
      index: rightLinkerIndex,
      side: "right",
      semantic_role: "later_event_linker",
    }],
    source_order: "earlier_completion_then_later_event",
    relation_subtype_provenance: "source_linked_completion_sequence_rule",
    reason: "An overt CompletionVP before 就 and a nonempty later member license a sequential relation; each member retains its own visible subject and predicate structure.",
  });
}

function clauseRelationTimeHead(node) {
  const rows = flattenNodes([node]);
  return rows.some((row) => row.kind === "token" && ["時候", "時間"].includes(row.surface || ""));
}

function clauseRelationMarkerSpec(nodes, surface, side, semanticRole, start = 0) {
  const index = clauseRelationSurfaceIndex(nodes, [surface], start);
  return index >= 0 ? { index, side, semantic_role: semanticRole } : null;
}

function clauseRelationPrefixEmbedding(prefixNodes = [], relation = null) {
  const prefix = withoutIgnorableSpaceText(prefixNodes || []);
  if (!prefix.length || !relation) return null;
  return opinionStanceFrameFallback([...prefix, relation])
    || cognitionContentFrameFallback([...prefix, relation])
    || reportedSpeechFrameFallback([...prefix, relation]);
}

function hierarchicalClauseRelationEdgeFromChildren(children = []) {
  const segments = clauseSequenceSegments(children);
  if (segments.length !== 2) return null;
  const separator = children.find(isClauseSequenceSeparator) || null;
  const leftRaw = clauseRelationSegmentNodes(segments[0]);
  const rightRaw = clauseRelationSegmentNodes(segments[1]);
  if (!leftRaw.length || !rightRaw.length) return null;

  let prefix = [];
  let leftNodes = leftRaw.slice();
  let relationSubtype = "";
  let sourceOrder = "left_then_right";
  let licensedAsyndetic = false;
  let asyndeticLicense = "";
  let immediateTemporalTrigger = false;
  const leftLinkers = [];
  const rightLinkers = [];

  const leftIf = clauseRelationSurfaceIndex(leftNodes, ["如果"]);
  const leftZi = clauseRelationSurfaceIndex(leftNodes, ["只"]);
  const leftJiu = clauseRelationSurfaceIndex(leftNodes, ["要"]);
  const leftHave = clauseRelationSurfaceIndex(leftNodes, ["有"]);
  const leftNing = clauseRelationSurfaceIndex(leftNodes, ["寧"]);
  const leftJyun = clauseRelationSurfaceIndex(leftNodes, ["願"]);
  const leftGei = clauseRelationSurfaceIndex(leftNodes, ["既"]);
  const leftJin = clauseRelationSurfaceIndex(leftNodes, ["然"]);
  const leftBecause = clauseRelationSurfaceIndex(leftNodes, ["因為"]);
  const leftAlthough = clauseRelationSurfaceIndex(leftNodes, ["雖然"]);
  const rightBecause = clauseRelationSurfaceIndex(rightRaw, ["因為"]);
  const rightSo = clauseRelationSurfaceIndex(rightRaw, ["所以"]);
  const rightBut = clauseRelationSurfaceIndex(rightRaw, ["但係", "不過"]);
  const rightThen = clauseRelationSurfaceIndex(rightRaw, ["然後", "再"]);
  const leftFirst = clauseRelationSurfaceIndex(leftNodes, ["先"]);
  const rightConditional = clauseRelationSurfaceIndex(rightRaw, ["就"]);
  const rightNecessary = clauseRelationSurfaceIndex(rightRaw, ["先至", "先"]);
  const rightDou = clauseRelationSurfaceIndex(rightRaw, ["都"]);
  const rightM4 = clauseRelationSurfaceIndex(rightRaw, ["唔"]);
  const rightM4Hou2 = clauseRelationSurfaceIndex(rightRaw, ["唔好"]);
  const rightSoeng2 = clauseRelationSurfaceIndex(rightRaw, ["想"]);
  const rightHang2 = clauseRelationSurfaceIndex(rightRaw, ["肯"]);
  const rightGam2 = clauseRelationSurfaceIndex(rightRaw, ["噉", "咁"]);
  const rightBat1Jyu4 = clauseRelationSurfaceIndex(rightRaw, ["不如"]);
  const rightDang2 = clauseRelationSurfaceIndex(rightRaw, ["等"]);
  const rightNgo5AfterDang2 = rightDang2 >= 0
    ? clauseRelationSurfaceIndex(rightRaw, ["我"], rightDang2 + 1)
    : -1;
  const rejectionMarkerIndexes = rightM4Hou2 === rightDou + 1
    ? [rightDou, rightM4Hou2]
    : (
      rightM4 === rightDou + 1 && (rightSoeng2 === rightM4 + 1 || rightHang2 === rightM4 + 1)
        ? [rightDou, rightM4, rightSoeng2 === rightM4 + 1 ? rightSoeng2 : rightHang2]
        : []
    );
  const committedPreferenceProfile =
    leftNing >= 0 &&
    leftJyun === leftNing + 1 &&
    rejectionMarkerIndexes.length > 0 &&
    leftNodes.some((node, index) => index !== leftNing && index !== leftJyun && flattenSurface(node)) &&
    rightRaw.some((node, index) => !rejectionMarkerIndexes.includes(index) && flattenSurface(node));
  let premiseResponseMarkerIndexes = [];
  let premiseResponseMarkerProfile = "unmarked";
  if (rightConditional === 0) {
    premiseResponseMarkerIndexes = [rightConditional];
    premiseResponseMarkerProfile = "zau6";
  } else if (rightGam2 === 0) {
    premiseResponseMarkerIndexes = [rightGam2];
    premiseResponseMarkerProfile = "gam2";
  } else if (rightBat1Jyu4 === 0) {
    premiseResponseMarkerIndexes = [rightBat1Jyu4];
    premiseResponseMarkerProfile = "bat1jyu4";
  } else if (rightDang2 === 0 && rightNgo5AfterDang2 === 1) {
    premiseResponseMarkerIndexes = [rightDang2, rightNgo5AfterDang2];
    premiseResponseMarkerProfile = "dang2ngo5";
  }
  const premiseResponseProfile =
    leftGei === 0 &&
    leftJin === 1 &&
    leftNodes.some((node, index) => index !== leftGei && index !== leftJin && flattenSurface(node)) &&
    rightRaw.some((node, index) => !premiseResponseMarkerIndexes.includes(index) && flattenSurface(node));
  const necessaryConditionLeftContent = leftNodes
    .slice(leftHave + 1)
    .flatMap((node) => clauseRelationLeafNodes(node));
  const necessaryConditionHasPredicateOrFrame = necessaryConditionLeftContent.some((node) => {
    if (!node || node.kind !== "token") return false;
    const slots = nodeSlots(node);
    return slots.some((slot) => [
      "action_verb",
      "comment_predicate",
      "copula",
      "coverb_marker",
      "existential",
      "locative_marker",
      "main_verb",
      "modal",
      "negated_existential",
      "predicate",
      "stative_predicate",
    ].includes(slot));
  });
  const sufficientConditionProfile =
    leftZi === 0 &&
    leftJiu === leftZi + 1 &&
    rightConditional >= 0 &&
    leftNodes.some((node, index) => index !== leftZi && index !== leftJiu && flattenSurface(node)) &&
    rightRaw.some((node, index) => index !== rightConditional && flattenSurface(node));
  const necessaryResultPrefix = rightNecessary > 0
    ? parsedClauseNodes(rightRaw.slice(0, rightNecessary))
    : [];
  const necessaryResultPrefixNode = necessaryResultPrefix.length === 1
    ? necessaryResultPrefix[0]
    : null;
  const necessaryResultMarkerPositionLicensed =
    rightNecessary === 0 ||
    (
      necessaryResultPrefixNode &&
      (
        nodeCanFillSlot(necessaryResultPrefixNode, "subject") ||
        nodeCanFillSlot(necessaryResultPrefixNode, "np") ||
        nodeCanFillSlot(necessaryResultPrefixNode, "head_noun") ||
        nodeCanFillSlot(necessaryResultPrefixNode, "topic")
      )
    );
  const necessaryConditionProfile =
    leftZi >= 0 &&
    leftHave === leftZi + 1 &&
    rightNecessary >= 0 &&
    necessaryResultMarkerPositionLicensed &&
    necessaryConditionHasPredicateOrFrame &&
    leftNodes.some((node, index) => index !== leftZi && index !== leftHave && flattenSurface(node)) &&
    rightRaw.some((node, index) => index !== rightNecessary && flattenSurface(node));
  let relationProfile = "";
  let relationResearchId = "";
  let relationProfileScope = "";
  const leftImmediateOne = clauseRelationSurfaceIndex(leftNodes, ["一"]);
  const leftSurfaces = clauseRelationSurfaceList(leftNodes);
  const rightSurfaces = clauseRelationSurfaceList(rightRaw);
  const leftHasImmediatePredicate = leftSurfaces.includes("見到") || (leftSurfaces.includes("見") && leftSurfaces.includes("到"));
  const leftTemporalNominal = leftNodes.length === 1 && leftNodes[0].kind === "construction" && leftNodes[0].type === "RelativeClauseNP" && clauseRelationTimeHead(leftNodes[0]);

  if (premiseResponseProfile) {
    relationSubtype = "premise_response";
    relationProfile = "established_premise_response";
    relationResearchId = "PRQ2-009";
    relationProfileScope = "left_initial_gei3jin4_with_overt_premise_and_response";
    leftLinkers.push(
      { index: leftGei, side: "left", semantic_role: "established_premise_marker_component" },
      { index: leftJin, side: "left", semantic_role: "established_premise_marker_component" }
    );
    for (const index of premiseResponseMarkerIndexes) {
      rightLinkers.push({ index, side: "right", semantic_role: "response_marker_component" });
    }
  } else if (committedPreferenceProfile) {
    relationSubtype = "committed_preference";
    relationProfile = "rejection";
    relationResearchId = "PRQ2-015";
    relationProfileScope = "overt_ning4jyun6_and_negative_dou1_continuation_only";
    leftLinkers.push(
      { index: leftNing, side: "left", semantic_role: "chosen_option_marker_component" },
      { index: leftJyun, side: "left", semantic_role: "chosen_option_marker_component" }
    );
    for (const index of rejectionMarkerIndexes) {
      rightLinkers.push({ index, side: "right", semantic_role: "rejected_option_marker_component" });
    }
  } else if (leftTemporalNominal) {
    relationSubtype = "temporal_subordinate";
  } else if (leftBecause >= 0 || rightBecause >= 0 || rightSo >= 0) {
    relationSubtype = "causal";
    if (leftBecause >= 0) leftLinkers.push({ index: leftBecause, side: "left", semantic_role: "reason_introducer" });
    if (rightSo >= 0) rightLinkers.push({ index: rightSo, side: "right", semantic_role: "result_linker" });
    if (rightBecause >= 0) {
      rightLinkers.push({ index: rightBecause, side: "right", semantic_role: "reason_introducer" });
      sourceOrder = "result_then_reason";
    }
  } else if (leftAlthough >= 0 || rightBut >= 0) {
    relationSubtype = "concessive";
    if (leftAlthough >= 0) leftLinkers.push({ index: leftAlthough, side: "left", semantic_role: "concession_introducer" });
    if (rightBut >= 0) rightLinkers.push({ index: rightBut, side: "right", semantic_role: "counterexpectation_linker" });
  } else if (necessaryConditionProfile) {
    relationSubtype = "conditional";
    relationProfile = "necessary_condition";
    relationResearchId = "PRQ2-014";
    relationProfileScope = "overt_left_marker_with_predicate_or_frame_and_overt_right_linker_only";
    leftLinkers.push(
      { index: leftZi, side: "left", semantic_role: "necessary_condition_marker_component" },
      { index: leftHave, side: "left", semantic_role: "necessary_condition_marker_component" }
    );
    rightLinkers.push({ index: rightNecessary, side: "right", semantic_role: "necessary_result_linker" });
  } else if (sufficientConditionProfile) {
    relationSubtype = "conditional";
    relationProfile = "sufficient_condition";
    relationResearchId = "PRQ2-008";
    relationProfileScope = "left_initial_overt_marker_and_overt_right_linker_only";
    leftLinkers.push(
      { index: leftZi, side: "left", semantic_role: "sufficient_condition_marker_component" },
      { index: leftJiu, side: "left", semantic_role: "sufficient_condition_marker_component" }
    );
    rightLinkers.push({ index: rightConditional, side: "right", semantic_role: "consequent_linker" });
  } else if (leftImmediateOne >= 0 && leftHasImmediatePredicate) {
    relationSubtype = "temporal_subordinate";
    immediateTemporalTrigger = true;
    leftLinkers.push({ index: leftImmediateOne, side: "left", semantic_role: "immediate_temporal_trigger" });
    if (rightConditional >= 0) rightLinkers.push({ index: rightConditional, side: "right", semantic_role: "result_linker" });
  } else if (leftHasImmediatePredicate && rightConditional >= 0) {
    relationSubtype = "temporal_subordinate";
    immediateTemporalTrigger = true;
    rightLinkers.push({ index: rightConditional, side: "right", semantic_role: "result_linker" });
  } else if (leftIf >= 0 || rightConditional >= 0) {
    relationSubtype = "conditional";
    if (leftIf >= 0) {
      if (leftIf > 0) {
        prefix = leftNodes.slice(0, leftIf);
        leftNodes = leftNodes.slice(leftIf);
      }
      leftLinkers.push({ index: 0, side: "left", semantic_role: "condition_introducer" });
    }
    const adjustedRightConditional = clauseRelationSurfaceIndex(rightRaw, ["就"]);
    if (adjustedRightConditional >= 0) rightLinkers.push({ index: adjustedRightConditional, side: "right", semantic_role: "consequent_linker" });
  } else if (leftFirst >= 0 || rightThen >= 0 || leftSurfaces.includes("完")) {
    relationSubtype = leftFirst < 0 && rightThen < 0 ? "asyndetic_sequence" : "sequential";
    if (leftFirst >= 0) leftLinkers.push({ index: leftFirst, side: "left", semantic_role: "earlier_event_marker" });
    if (rightThen >= 0) rightLinkers.push({ index: rightThen, side: "right", semantic_role: "later_event_marker" });
    if (relationSubtype === "asyndetic_sequence") {
      licensedAsyndetic = true;
      asyndeticLicense = "left_completion_event_plus_following_event";
    } else if (leftFirst >= 0 && rightThen < 0) {
      licensedAsyndetic = true;
      asyndeticLicense = "overt_left_sequence_marker_with_omitted_right_marker";
    }
  }

  if (!relationSubtype) return null;
  if (immediateTemporalTrigger) {
    leftNodes = leftNodes.map((node) => node && node.kind === "token" ? token(flattenSurface(node)) : node);
  }
  const relation = buildClauseRelationEdge({
    relation_subtype: relationSubtype,
    left_nodes: leftNodes,
    right_nodes: rightRaw,
    left_linkers: leftLinkers,
    right_linkers: rightLinkers,
    separator,
    source_order: sourceOrder,
    licensed_asyndetic: licensedAsyndetic,
    asyndetic_license: asyndeticLicense,
    immediate_temporal_trigger: immediateTemporalTrigger,
    relation_subtype_provenance: "inherited_mapped_hierarchical_clause_relation_rule",
  });
  if (!relation) return null;
  if (relationProfile) {
    relation.trace = {
      ...(relation.trace || {}),
      relation_profile: relationProfile,
      research_id: relationResearchId,
      relation_profile_scope: relationProfileScope,
      ...(relationSubtype === "premise_response" ? {
        response_marker_profile: premiseResponseMarkerProfile,
      } : {}),
    };
  }

  if (prefix.length) {
    const embedded = clauseRelationPrefixEmbedding(prefix, relation);
    if (embedded) return { node: embedded, relation, embedded: true };
    return null;
  }

  const wrapperCoverage = {
    status: "PASS",
    policy: "A hierarchical ClauseRelationGraph accounts for its complete local ClauseRelationEdge child; the separator and overt linkers remain visible inside that typed relation.",
    accounted_children: [{ surface: flattenSurface(relation), construction: "ClauseRelationEdge", role: "local_typed_relation" }],
    accounted_linkers: [],
    accounted_separators: separator ? [{ surface: flattenSurface(separator), role: "nested_visible_separator" }] : [],
    unaccounted_tokens: [],
    unaccounted_wrapper_token_count: 0,
  };
  const wrapper = construction("ClauseRelationGraph", "ClauseLink", [relation], {
    note: "Outer discourse wrapper containing one local typed clause relation. It preserves the established wrapper boundary without flattening relation semantics.",
    trace: traceInfo("governed_discourse_wrapper", {
      rule: "hierarchical typed clause relation under discourse wrapper",
      reason: "The outer wrapper remains for discourse/root accounting, while ClauseRelationEdge represents the typed local relation.",
      child_constructions: ["ClauseRelationEdge"],
      local_relation_construction: "ClauseRelationEdge",
      graph_container_semantic_status: "neutral_container_only",
      independent_grammar_licensing: false,
      relation_semantics_source: "typed_child_edge_with_inherited_subtype_provenance",
      clause_linking_subtype: ["committed_preference", "premise_response"].includes(relationSubtype)
        ? relationSubtype
        : (relationProfile || relationSubtype),
      relation_subtype: relationSubtype,
      ...(relationProfile ? {
        relation_profile: relationProfile,
        research_id: relationResearchId,
        relation_profile_scope: relationProfileScope,
        ...(relationSubtype === "premise_response" ? {
          response_marker_profile: premiseResponseMarkerProfile,
        } : {}),
      } : {}),
      linkers: [...(relation.trace && relation.trace.linker_left || []), ...(relation.trace && relation.trace.linker_right || [])],
      separators: separator ? [flattenSurface(separator)] : [],
      wrapper_coverage: wrapperCoverage,
    }),
  });
  return { node: wrapper, relation, embedded: false };
}

function standaloneClauseRelationEdgeFragmentForTerminal(segment = [], terminalText = "") {
  if (!/[。！？.!?]/u.test(String(terminalText || ""))) return null;
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 2 || compact[0].kind !== "token") return null;
  const surface = flattenSurface(compact[0]);
  const subtypeBySurface = {
    "然後": "sequential",
    "再": "sequential",
    "但係": "concessive",
    "不過": "concessive",
    "所以": "causal",
    "因為": "causal",
    "如果": "conditional",
    "雖然": "concessive",
    "就": "conditional",
  };
  const relationSubtype = subtypeBySurface[surface];
  if (!relationSubtype) return null;
  const relationId = `clause-relation-fragment:${relationSubtype}:${compact.map((node) => flattenSurface(node)).join("")}`;
  const missingSide = ["因為", "如果", "雖然"].includes(surface) ? "right_relation_member" : "left_relation_member";
  const semanticRole = surface === "因為" ? "reason_introducer"
    : surface === "如果" ? "condition_introducer"
      : surface === "雖然" ? "concession_introducer"
        : surface === "所以" ? "result_linker"
          : ["但係", "不過"].includes(surface) ? "counterexpectation_linker"
            : ["然後", "再"].includes(surface) ? "later_event_marker"
              : "consequent_linker";
  const member = clauseRelationMember(compact, {
    role: missingSide === "left_relation_member" ? "right" : "left",
    relation_subtype: relationSubtype,
    relation_id: relationId,
    linkers: [{ index: 0, side: missingSide === "left_relation_member" ? "right" : "left", semantic_role: semanticRole }],
  });
  if (!member) return null;
  return construction("NeedsContext", "needs context", [member], {
    note: "Standalone relation fragment with an overt linker but no visible relation partner.",
    trace: traceInfo("special_ambiguity_rule", {
      fragment_subtype: "standalone_clause_relation_fragment",
      relation_subtype: relationSubtype,
      clause_relation_id: relationId,
      relation_context_status: "context_required",
      context_requirement_status: "context_required",
      antecedent_status: "not_observed",
      missing_argument_slots: [missingSide],
      missing_slot_details: [{ slot: missingSide, license_status: "unresolved" }],
      overt_linker_surface: surface,
      linker_ownership_status: "owned_by_incomplete_local_relation",
      discourse_license_not_observed: true,
      semantic_review_flags: ["standalone_relation_partner_missing", "context_required_unresolved"],
      reason: "The overt linker requires a prior or following relation partner that is absent from the visible sentence. The following clause/VP remains transparent and no partner is fabricated.",
      not_claims: ["not_ignored_linker", "not_fabricated_relation_partner", "not_clean_context_free_clause"],
    }),
  });
}

function relativeClauseGapPredicate(leftNodes = [], headSurface = "") {
  const compact = withoutIgnorableSpaceText(leftNodes || []);
  if (compact.length !== 2 || !nodeCanFillSlot(compact[0], "subject")) return null;
  const verb = compact[1];
  if (!nodeCanFillSlot(verb, "action_verb")) return null;
  const vp = construction("TransitiveVP", "V+O", [verb], {
    note: "Transitive predicate with an overt relative-clause head licensing the object gap; no hidden object token is inserted.",
    trace: traceInfo("generative_template", {
      construction_type: "TransitiveVP",
      template_family: "generative_template",
      template: ["action_verb!", "relative_object_gap!"],
      assigned_slots: ["action_verb"],
      relative_gap_status: "licensed_by_overt_head_noun",
      relative_head_surface: headSurface,
      missing_argument_slots: ["object"],
      reason: "The relative-clause head noun supplies the overt nominal domain for the visible transitive predicate. The parser records the dependency without inserting an object token.",
      not_claims: ["not_fabricated_object_token"],
    }),
  });
  return construction("SubjectPredicateClause", "Clause", [compact[0], vp], {
    note: "Relative modifier clause with overt subject and a head-licensed object gap.",
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!"],
      assigned_slots: ["subject", "predicate"],
      relative_gap_status: "licensed_by_overt_head_noun",
      relative_head_surface: headSurface,
      reason: "The overt subject and visible transitive predicate form the relative modifier clause; the following head noun licenses the object dependency.",
      not_claims: ["not_fabricated_object_token"],
    }),
  });
}

function relativeClauseNPForTerminal(segment = []) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.filter(cp021bIsBei2Marker).length >= 2) return null;
  const linkerIndex = clauseRelationSurfaceIndex(compact, ["嘅"]);
  if (linkerIndex <= 0 || linkerIndex >= compact.length - 1) return null;
  const head = compact[linkerIndex + 1];
  if (!(nodeCanFillSlot(head, "head_noun") || nodeCanFillSlot(head, "time") || nodeCanFillSlot(head, "time_head") || ["時候", "時間"].includes(flattenSurface(head)))) return null;

  const left = compact.slice(0, linkerIndex);
  const headSurface = flattenSurface(head);
  const temporalHead = ["時候", "時間"].includes(headSurface);
  const leftHasActionPredicate = left.some((node) => nodeCanFillSlot(node, "action_verb"));
  if (!temporalHead && !leftHasActionPredicate) return null;
  const leftFinal = left[left.length - 1] || null;
  const leftFinalLooksNominal = leftFinal
    && !nodeCanFillSlot(leftFinal, "action_verb")
    && (nodeCanFillSlot(leftFinal, "np") || nodeCanFillSlot(leftFinal, "head_noun") || nodeCanFillSlot(leftFinal, "location") || nodeCanFillSlot(leftFinal, "object"));
  if (!temporalHead && left.length >= 2 && leftFinalLooksNominal) return null;
  let modifierParsed = applyConstructionPatterns(left);
  let modifierClause = modifierParsed.length === 1 && modifierParsed[0].kind === "construction" ? modifierParsed[0] : null;
  if (!modifierClause) modifierClause = relativeClauseGapPredicate(left, headSurface);
  if (!modifierClause) {
    const chunk = clauseRelationParsedChunk(left, { relative_head_surface: headSurface });
    if (chunk.length === 1 && chunk[0].kind === "construction") modifierClause = chunk[0];
  }
  if (!modifierClause || !(nodeCanFillSlot(modifierClause, "clause") || nodeCanFillSlot(modifierClause, "predicate") || nodeCanFillSlot(modifierClause, "vp"))) return null;

  const linker = parserInactiveTokenClone(compact[linkerIndex], {
    label: "particle",
    pos: "particle",
    syntax: "nominal_linker relative_clause_linker",
    slots: cleanSlots([...(compact[linkerIndex].slots || []), "nominal_linker", "relative_clause_linker"]),
    reason: "嘅 links the visible modifier clause to its overt head noun inside a relative-clause NP.",
  });
  const relativeNP = construction("RelativeClauseNP", "RelNP", [modifierClause, linker, head], {
    note: "Relative-clause noun phrase with a visible modifier clause, overt 嘅 linker, and overt head noun.",
    trace: traceInfo("generative_template", {
      construction_type: "RelativeClauseNP",
      template_family: "generative_template",
      template: ["relative_clause!", "nominal_linker!", "head_noun!"],
      assigned_slots: ["relative_clause", "nominal_linker", "head_noun"],
      relation_subtype: "relative_nominal_modifier",
      relative_clause_construction: modifierClause.type,
      head_noun_surface: headSurface,
      temporal_head: ["時候", "時間"].includes(headSurface),
      reason: "The modifier clause attaches inside the NP before any matrix predicate or temporal-subordinate relation is built.",
      not_claims: ["not_flat_clause_sequence", "not_hidden_head_noun", "not_hidden_relative_gap_token"],
    }),
  });

  const tail = compact.slice(linkerIndex + 2);
  if (!tail.length) return relativeNP;
  const predicate = clauseRelationParsedChunk(tail);
  if (!predicate.length || !predicate.some((node) => node && (node.kind === "construction" || nodeCanFillSlot(node, "predicate") || nodeCanFillSlot(node, "vp")))) return null;
  return construction("SubjectPredicateClause", "Clause", [relativeNP, ...predicate], {
    note: "Matrix clause whose overt subject/topic is a relative-clause NP.",
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!"],
      assigned_slots: ["subject", "predicate"],
      relative_np_subject: true,
      reason: "The relative-clause NP is completed before attachment to the visible matrix predicate.",
    }),
  });
}

function clauseSequenceSegments(nodes = []) {
  const segments = [];
  let current = [];
  for (const node of nodes || []) {
    if (isClauseSequenceSeparator(node)) {
      if (withoutIgnorableSpaceText(current).length) segments.push(withoutIgnorableSpaceText(current));
      current = [];
    } else {
      current.push(node);
    }
  }
  if (withoutIgnorableSpaceText(current).length) segments.push(withoutIgnorableSpaceText(current));
  return segments;
}

function topicChainAntecedentDescriptor(segment = []) {
  const rows = flattenNodes(segment || []);
  const constructions = rows.filter((row) => row.kind === "construction");
  const npRows = constructions.filter((row) => {
    const type = String(row.type || "");
    return /NP$/u.test(type) || ["NominalHeadSpan", "ModifiedNP", "AssociativeNP", "PluralMarkedNP"].includes(type);
  });
  if (!npRows.length) return null;
  const onlyMeaningful = withoutIgnorableSpaceText(segment).filter((node) => !isClauseSequenceSeparator(node));
  const standaloneTopic = onlyMeaningful.length === 1
    && onlyMeaningful[0].kind === "construction"
    && npRows.some((row) => row.surface === flattenSurface(onlyMeaningful[0]));
  const topicFrameLinker = onlyMeaningful.length >= 2 && isTopicFrameLinker(onlyMeaningful[0])
    ? onlyMeaningful[0]
    : null;
  const relationalCoverbLinker = onlyMeaningful.length >= 2 && isRelationalCoverbLinker(onlyMeaningful[0])
    ? onlyMeaningful[0]
    : null;
  const candidate = standaloneTopic ? npRows[0] : npRows[npRows.length - 1];
  if (!candidate || !candidate.surface) return null;
  const semanticDomains = Array.from(new Set(
    rows.filter((row) => row.kind === "token").flatMap((row) => tokenSemanticDomains(row))
  ));
  return {
    surface: candidate.surface,
    construction: candidate.type || "",
    source: topicFrameLinker
      ? "overt_topic_frame"
      : (standaloneTopic ? "overt_initial_topic" : "prior_clause_nominal_domain"),
    semantic_domains: semanticDomains,
    topic_frame_linker_surface: topicFrameLinker ? topicFrameLinker.surface || "" : "",
    topic_frame_status: topicFrameLinker ? "overt_topic_frame_linked" : "not_applicable",
    relational_coverb_linker_surface: relationalCoverbLinker ? relationalCoverbLinker.surface || "" : "",
    relational_frame_status: relationalCoverbLinker ? "overt_relational_coverb_accounted" : "not_applicable",
  };
}

function visitConstructionNodes(node, visit, depth = 0) {
  if (!node) return;
  if (node.kind === "construction") {
    visit(node, depth);
    for (const child of node.children || []) visitConstructionNodes(child, visit, depth + 1);
  }
}

function productiveObjectHeadToken(node) {
  const rows = flattenNodes([node]);
  return rows.find((row) => row.kind === "token"
    && (row.slots || []).includes("action_verb")
    && getConstructionAffordances(row).can_head_productive_vo === true) || null;
}

function constructionHasOvertObject(node) {
  const rows = flattenNodes([node]);
  const head = productiveObjectHeadToken(node);
  if (!head) return false;
  const headIndex = rows.findIndex((row) => row.kind === "token" && row.surface === head.surface && row.depth === head.depth);
  return rows.slice(Math.max(0, headIndex + 1)).some((row) => {
    if (row.kind === "text") return false;
    const slots = row.slots || [];
    if (slots.includes("subject")) return false;
    return slots.some((slot) => ["object", "theme", "head_noun", "np"].includes(slot));
  });
}

function constructionContainsConstruction(root, target) {
  if (!root || root.kind !== "construction") return false;
  for (const child of root.children || []) {
    if (child === target) return true;
    if (child && child.kind === "construction" && constructionContainsConstruction(child, target)) return true;
  }
  return false;
}

function segmentHasOvertObjectAfterHead(segment = [], headSurface = "") {
  const rows = flattenNodes(segment || []);
  const headIndex = rows.findIndex((row) => row.kind === "token"
    && row.surface === headSurface
    && (row.slots || []).includes("action_verb"));
  if (headIndex < 0) return false;
  return rows.slice(headIndex + 1).some((row) => {
    if (row.kind === "text") return false;
    const slots = row.slots || [];
    if (slots.includes("subject") || slots.includes("particle")) return false;
    return slots.some((slot) => ["object", "theme", "head_noun", "np"].includes(slot));
  });
}

function topicChainGapCandidates(segment = []) {
  const candidates = [];
  for (const root of segment || []) {
    visitConstructionNodes(root, (node, depth) => {
      if (!nodeCanFillSlot(node, "vp") && !nodeCanFillSlot(node, "predicate")) return;
      const head = productiveObjectHeadToken(node);
      if (!head || constructionHasOvertObject(node) || segmentHasOvertObjectAfterHead(segment, head.surface)) return;
      candidates.push({ node, depth, head_surface: head.surface, surface: flattenSurface(node) });
    });
  }
  return candidates.filter((candidate) => !candidates.some((other) =>
    other !== candidate && constructionContainsConstruction(candidate.node, other.node)
  ));
}

function topicChainAntecedentCompatibility(antecedent, head) {
  const antecedentDomains = new Set((antecedent && antecedent.semantic_domains) || []);
  const syntax = String((head && head.syntax) || "");
  const result = (status, reason) => ({ status, reason, antecedent_domains: [...antecedentDomains] });
  if (syntax.includes("chain_select_perception")) {
    return result("compatible", "broad_perception_predicate_accepts_overt_nominal_topic");
  }
  if (syntax.includes("chain_select_discourse_content")) {
    return result("compatible", "discourse_content_predicate_accepts_overt_topic_domain");
  }
  if (syntax.includes("chain_select_edible")) {
    return antecedentDomains.has("food_item") || antecedentDomains.has("edible_item")
      ? result("compatible", "edible_topic_for_consumption_predicate")
      : (antecedentDomains.size
        ? result("incompatible", "known_antecedent_domain_is_not_edible")
        : result("unverified", "eating_predicate_requires_known_edible_topic"));
  }
  if (syntax.includes("chain_select_drinkable")) {
    return antecedentDomains.has("drinkable_item") || antecedentDomains.has("liquid")
      ? result("compatible", "drinkable_topic_for_consumption_predicate")
      : (antecedentDomains.size
        ? result("incompatible", "known_antecedent_domain_is_not_drinkable")
        : result("unverified", "drinking_predicate_requires_known_drinkable_topic"));
  }
  if (syntax.includes("chain_select_bookable_resource")) {
    return antecedentDomains.has("bookable_resource")
      ? result("compatible", "bookable_resource_topic_for_reservation_predicate")
      : result("unverified", "reservation_predicate_requires_known_bookable_resource_topic");
  }
  return result("unverified", "object_selecting_predicate_lacks_topic_chain_selection_profile");
}

function applyTopicChainNullObjectLinkage(children = []) {
  const segments = clauseSequenceSegments(children);
  if (segments.length < 2) return null;
  const antecedent = topicChainAntecedentDescriptor(segments[0]);
  if (!antecedent) return null;
  const candidates = [];
  for (const segment of segments.slice(1)) {
    for (const candidate of topicChainGapCandidates(segment)) {
      candidate.compatibility = topicChainAntecedentCompatibility(antecedent, productiveObjectHeadToken(candidate.node));
      candidates.push(candidate);
    }
  }
  if (!candidates.length) return null;
  const blocked = candidates.filter((candidate) => candidate.compatibility.status !== "compatible");
  const topicChainId = `topic-chain:${antecedent.surface}`;
  const topicFrameTrace = antecedent.topic_frame_linker_surface ? {
    topic_frame_status: antecedent.topic_frame_status,
    topic_frame_linker_surface: antecedent.topic_frame_linker_surface,
    topic_frame_domain_surface: antecedent.surface,
  } : {};
  const relationalFrameTrace = antecedent.relational_coverb_linker_surface ? {
    relational_frame_status: antecedent.relational_frame_status,
    relational_coverb_linker_surface: antecedent.relational_coverb_linker_surface,
    relational_coverb_domain_surface: antecedent.surface,
  } : {};
  if (blocked.length) {
    for (const candidate of candidates) {
      const trace = candidate.node.trace || {};
      candidate.node.trace = {
        ...trace,
        context_requirement_status: "context_required",
        missing_argument_slots: ["object_or_activity_domain"],
        missing_slot_details: [{ slot: "object_or_activity_domain", license_status: "unresolved" }],
        antecedent_status: candidate.compatibility.status === "incompatible" ? "incompatible" : "unverified",
        antecedent_span: antecedent.surface,
        discourse_license_not_observed: true,
        topic_chain_id: topicChainId,
        topic_chain_role: "unresolved_null_object_candidate",
        topic_antecedent_surface: antecedent.surface,
        topic_antecedent_source: antecedent.source,

        ...topicFrameTrace,
        ...relationalFrameTrace,
        topic_antecedent_semantic_domains: antecedent.semantic_domains || [],
        null_object: "unresolved",
        null_object_link: "not_licensed_antecedent_predicate_compatibility",
        antecedent_predicate_compatibility_status: candidate.compatibility.status,
        antecedent_predicate_compatibility_reason: candidate.compatibility.reason,
        semantic_review_flags: Array.from(new Set([...(trace.semantic_review_flags || []), "topic_chain_antecedent_predicate_compatibility_review", "context_required_unresolved"])),
        reason: "An overt topic is available, but the parser cannot license it as this predicate's omitted object unless their broad semantic domains are compatible. No hidden object is inserted.",
        not_claims: Array.from(new Set([...(trace.not_claims || []), "not_fabricated_object_token", "not_unrestricted_argument_deletion", "not_semantically_incompatible_topic_link"])),
      };
    }
    return {
      topic_chain_id: topicChainId,
      topic_chain_status: "antecedent_predicate_compatibility_review",
      topic_antecedent_surface: antecedent.surface,
      topic_antecedent_construction: antecedent.construction,
      topic_antecedent_source: antecedent.source,

      ...topicFrameTrace,
      ...relationalFrameTrace,
      topic_antecedent_semantic_domains: antecedent.semantic_domains || [],
      linked_null_object_count: 0,
      linked_predicate_surfaces: [],
      unresolved_predicate_surfaces: candidates.map((row) => row.surface),
      unresolved_predicate_heads: candidates.map((row) => row.head_surface),
      null_object_link: "not_licensed_antecedent_predicate_compatibility",
      context_requirement_status: "context_required",
      missing_argument_slots: ["object_or_activity_domain"],
      missing_slot_details: [{ slot: "object_or_activity_domain", license_status: "unresolved" }],
      antecedent_status: blocked.some((row) => row.compatibility.status === "incompatible") ? "incompatible" : "unverified",
      antecedent_span: antecedent.surface,
      discourse_license_not_observed: true,
      semantic_review_flags: ["topic_chain_antecedent_predicate_compatibility_review", "context_required_unresolved"],
      not_claims: ["not_fabricated_object_token", "not_implicit_topic_inference", "not_unrestricted_argument_deletion", "not_semantically_incompatible_topic_link"],
    };
  }
  for (const candidate of candidates) {
    const trace = candidate.node.trace || {};
    candidate.node.trace = {
      ...trace,
      context_requirement_status: "context_licensed",
      missing_argument_slots: ["object_or_activity_domain"],
      missing_slot_details: [{ slot: "object_or_activity_domain", license_status: "licensed", licensed_by: topicChainId }],
      antecedent_status: "linked",
      antecedent_span: antecedent.surface,
      discourse_license_not_observed: false,
      topic_chain_id: topicChainId,
      topic_chain_role: "null_object_target",
      topic_antecedent_surface: antecedent.surface,
      topic_antecedent_source: antecedent.source,

      ...topicFrameTrace,
      ...relationalFrameTrace,
      topic_antecedent_semantic_domains: antecedent.semantic_domains || [],
      null_object: "licensed",
      null_object_link: "licensed_to_overt_topic_chain",
      antecedent_predicate_compatibility_status: "compatible",
      antecedent_predicate_compatibility_reason: candidate.compatibility.reason,
      reason: "An overt nominal topic/domain in the first linked segment licenses this later object-selecting predicate's unspoken object. The visible predicate remains unchanged and no hidden noun token is inserted.",
      not_claims: Array.from(new Set([...(trace.not_claims || []), "not_fabricated_object_token", "not_context_free_object_drop", "not_unrestricted_argument_deletion"])),
    };
  }
  return {
    topic_chain_id: topicChainId,
    topic_chain_status: "licensed_overt_topic_chain",
    topic_antecedent_surface: antecedent.surface,
    topic_antecedent_construction: antecedent.construction,
    topic_antecedent_source: antecedent.source,

    ...topicFrameTrace,
    ...relationalFrameTrace,
    topic_antecedent_semantic_domains: antecedent.semantic_domains || [],
    linked_null_object_count: candidates.length,
    linked_predicate_surfaces: candidates.map((row) => row.surface),
    linked_predicate_heads: candidates.map((row) => row.head_surface),
    null_object_link: "licensed_to_overt_topic_chain",
    context_requirement_status: "context_licensed",
    missing_argument_slots: ["object_or_activity_domain"],
    missing_slot_details: [{ slot: "object_or_activity_domain", license_status: "licensed", licensed_by: topicChainId }],
    antecedent_status: "linked",
    antecedent_span: antecedent.surface,
    discourse_license_not_observed: false,
    not_claims: ["not_fabricated_object_token", "not_implicit_topic_inference", "not_unrestricted_argument_deletion"],
  };
}

function wrapClauseSequenceByPunctuation(nodes) {
  const hasSeparator = nodes.some(isClauseSequenceSeparator);
  if (!hasSeparator) return nodes;

  const finalOnly = nodes.length > 0 && isClauseSequenceTerminal(nodes[nodes.length - 1]) ? nodes[nodes.length - 1] : null;
  const children = finalOnly ? nodes.slice(0, -1) : nodes.slice();

  const separatorIndex = children.findIndex(isClauseSequenceSeparator);
  if (separatorIndex >= 0) {
    const linkerOnlySide = (side) => {
      const meaningfulSide = side.filter((node) => node && node.kind !== "text");
      return meaningfulSide.length === 1
        && CLAUSE_LINKER_SURFACES.has(flattenSurface(meaningfulSide[0]));
    };
    if (linkerOnlySide(children.slice(0, separatorIndex)) || linkerOnlySide(children.slice(separatorIndex + 1))) {
      return nodes;
    }
  }
  const orderedPreferenceOpenerIndex = children.findIndex((node, index) =>
    index < separatorIndex &&
    node &&
    node.kind === "token" &&
    (node.surface || "") === "與其"
  );
  const rightLeaves = separatorIndex >= 0
    ? clauseRelationSegmentNodes(children.slice(separatorIndex + 1))
    : [];
  if (orderedPreferenceOpenerIndex >= 0 && separatorIndex > orderedPreferenceOpenerIndex && rightLeaves.length > 1) {
    if (surfaceOf(rightLeaves[0]) === "不如") {
      const preferredMember = parsedClauseNodes(rightLeaves.slice(1));
      const disfavoredMember = children.slice(orderedPreferenceOpenerIndex + 1, separatorIndex);
      const prefix = children.slice(0, orderedPreferenceOpenerIndex);
      if (
        meaningfulClauseConstructionCount(disfavoredMember) >= 1 &&
        meaningfulClauseConstructionCount(preferredMember) >= 1
      ) {
        const leftNodes = [
          ...prefix,
          children[orderedPreferenceOpenerIndex],
          ...disfavoredMember,
        ];
        const rightNodes = [
          rightLeaves[0],
          ...preferredMember,
        ];
        const leftLinkerIndex = clauseRelationSegmentNodes(prefix).length;
        const relation = buildClauseRelationEdge({
          relation_subtype: "ordered_preference",
          left_nodes: leftNodes,
          right_nodes: rightNodes,
          left_linkers: [{
            index: leftLinkerIndex,
            side: "left",
            semantic_role: "disfavored_option_introducer",
          }],
          right_linkers: [{
            index: 0,
            side: "right",
            semantic_role: "preferred_option_introducer",
          }],
          separator: children[separatorIndex],
          source_order: "disfavored_then_preferred",
          relation_subtype_provenance: "inherited_mapped_hierarchical_clause_relation_rule",
          reason: "The overt 與其 and 不如 pair orders two nonempty alternatives; the typed edge retains both members, owns both markers, and records which option is disfavored and which is preferred.",
        });
        if (relation) {
          const wrapperCoverage = {
            status: "PASS",
            policy: "A hierarchical ClauseRelationGraph accounts for its complete local ClauseRelationEdge child; the separator and overt linkers remain visible inside that typed relation.",
            accounted_children: [{ surface: flattenSurface(relation), construction: "ClauseRelationEdge", role: "local_typed_relation" }],
            accounted_linkers: [],
            accounted_separators: [{ surface: flattenSurface(children[separatorIndex]), role: "nested_visible_separator" }],
            unaccounted_tokens: [],
            unaccounted_wrapper_token_count: 0,
          };
          const wrapper = construction("ClauseRelationGraph", "ClauseLink", [relation], {
            note: "Outer discourse wrapper containing the overt paired ordered-preference relation.",
            trace: traceInfo("governed_discourse_wrapper", {
              rule: "與其...不如 ordered-preference clause-linking sequence",
              reason: "The outer wrapper preserves discourse/root accounting while the typed child edge owns the paired markers and alternative-order semantics.",
              child_constructions: ["ClauseRelationEdge"],
              local_relation_construction: "ClauseRelationEdge",
              graph_container_semantic_status: "neutral_container_only",
              independent_grammar_licensing: false,
              relation_semantics_source: "typed_child_edge_with_inherited_subtype_provenance",
              relation_subtype: "ordered_preference",
              linkers: [...(relation.trace && relation.trace.linker_left || []), ...(relation.trace && relation.trace.linker_right || [])],
              separators: [flattenSurface(children[separatorIndex])],
              wrapper_coverage: wrapperCoverage,
              clause_linking_subtype: "ordered_preference",
              marker_profile: "jyu5kei4_bat1jyu4",
              research_id: "PRQ2-013",
            }),
          });
          return [wrapper, ...(finalOnly ? [finalOnly] : [])];
        }
      }
    }
  }

  const hierarchicalRelation = hierarchicalClauseRelationEdgeFromChildren(children);
  if (hierarchicalRelation && hierarchicalRelation.node) {
    return [hierarchicalRelation.node, ...(finalOnly ? [finalOnly] : [])];
  }

  const meaningful = children.filter(isClauseSequenceMeaningfulNode);
  if (meaningful.length < 2) return nodes;

  const conditionalChildIndex = children.findIndex((node) => node && node.kind === "construction" && node.type === "ConditionalClause");
  if (conditionalChildIndex >= 0) {
    const separatorAfterCondition = children.findIndex((node, index) => index > conditionalChildIndex && isClauseSequenceSeparator(node));
    const resultChild = children.find((node, index) => index > separatorAfterCondition && node && node.kind === "construction");
    if (separatorAfterCondition >= 0 && resultChild) {
      const conditional = children[conditionalChildIndex];
      conditional.trace = {
        ...(conditional.trace || {}),
        context_requirement_status: "context_licensed",
        missing_argument_slots: [],
        missing_slot_details: [{ slot: "result_clause", license_status: "licensed", licensed_by: "following_result_clause" }],
        result_clause_status: "overt_following_clause",
        result_construction: resultChild.type,
        not_claims: Array.from(new Set([...(conditional.trace && conditional.trace.not_claims || []), "not_standalone_incomplete_condition"])),
      };
    }
  }
  const wrapperCoverage = clauseLinkingWrapperCoverage(children);
  const topicChainTrace = applyTopicChainNullObjectLinkage(children);
  return [
    construction("ClauseRelationGraph", topicChainTrace && topicChainTrace.topic_chain_status === "licensed_overt_topic_chain" ? "TopicChain" : "ClauseLink", children, {
      note: topicChainTrace && topicChainTrace.topic_chain_status === "licensed_overt_topic_chain"
        ? "Topic chain: one overt recoverable topic supplies the understood object/domain of later linked predicates without hidden tokens."
        : "Linked clauses. This governed discourse/coordination wrapper preserves all child constructions and explicitly accounts for linker/separator material; it does not replace or flatten the child clauses.",
      trace: traceInfo("governed_discourse_wrapper", {
        rule: "comma-separated clause-linking sequence",
        reason: "Native speech often links short clauses or discourse units with comma-like punctuation. Add a parent wrapper only when at least two meaningful clause-like constructions are separated by visible punctuation; do not model this as a phrase-internal generative template, and do not hide unaccounted wrapper holes.",
        graph_container_semantic_status: "neutral_container_only",
        independent_grammar_licensing: false,
        relation_semantics_source: "none_or_preexisting_discourse_linkage_only",
        child_constructions: children
          .filter((node) => node && node.kind === "construction")
          .map((node) => node.type),
        linkers: clauseLinkerInventory(children),
        separators: children
          .filter(isClauseSequenceSeparator)
          .map((node) => node.text),
        ...(conditionalChildIndex >= 0 ? { clause_linking_subtype: "condition_result", condition_construction: "ConditionalClause" } : {}),
        ...(topicChainTrace ? { clause_linking_subtype: topicChainTrace.topic_chain_status === "licensed_overt_topic_chain" ? "topic_chain_null_object" : "topic_chain_compatibility_review", ...topicChainTrace } : {}),
        wrapper_coverage: wrapperCoverage,
      })
    }),
    ...(finalOnly ? [finalOnly] : []),
  ];
}

function clauseSequenceHasVisiblePunctuation(node) {
  if (!node || node.kind !== "construction" || (node.type !== "ClauseSequence" && node.type !== "ClauseRelationGraph")) return false;
  const traceSeparators = node.trace && Array.isArray(node.trace.separators) ? node.trace.separators : [];
  if (traceSeparators.length) return true;
  return (node.children || []).some(isClauseSequenceSeparator);
}

function shouldCollapseClauseSequenceForDisplay(node, options = {}) {
  // Kept for compatibility with older ClauseSequence diagnostics. v0.5.59 does not
  // collapse ClauseRelationGraph by default, because the parent wrapper is part
  // of the visual accounting for linker/separator material.
  if (!node || node.kind !== "construction" || node.type !== "ClauseSequence") return false;
  if (options && options.showDiagnostics) return false;
  return clauseSequenceHasVisiblePunctuation(node);
}

function shouldCollapseGreedyWrapperForDisplay(node, options = {}) {
  if (!node || node.kind !== "construction") return false;
  if (options && options.showDiagnostics) return false;
  return node.type === "ModalANotAQuestion";
}


function fullSpanSingleConstruction(nodes, sourceNodes) {
  if (!Array.isArray(nodes) || nodes.length !== 1) return null;
  const only = nodes[0];
  if (!only || only.kind !== "construction") return null;
  const expectedSurface = (sourceNodes || []).map((node) => flattenSurface(node)).join("");
  return flattenSurface(only) === expectedSurface ? only : null;
}

function isExplicitWhQuestionConstruction(node) {
  if (!node || node.kind !== "construction") return false;
  if ([
    "ProgressiveWhObjectQuestion",
    "ExistentialWhQuestion",
    "ScalarValueQuestion",
    "PlaceQuestion",
  ].includes(node.type)) return true;
  return (node.children || []).some(isExplicitWhQuestionConstruction);
}

function isProtectedMeReactionFormula(node) {
  return !!(node
    && node.kind === "construction"
    && node.type === "FormulaDiscourseUnit"
    && node.trace
    && node.trace.formula_type === "confirmation_surprise_question");
}

function propositionLikeHostForFinalMe(nodes) {
  if (!nodes || !nodes.length) return null;
  const wrapped = applyConstructionPatterns(nodes);
  const host = fullSpanSingleConstruction(wrapped, nodes);
  if (!host) return null;
  if (["NeedsContext", "MalformedCandidate", "FragmentQuestion", "FragmentAnswer", "NominalHeadSpan"].includes(host.type)) return null;
  const trace = host.trace || {};
  if (["context_required", "context_incompatible"].includes(trace.context_requirement_status)) return null;
  if (!nodeCanFillSlot(host, "predicate")
      && !nodeCanFillSlot(host, "clause")
      && !nodeCanFillSlot(host, "vp")
      && !nodeCanFillSlot(host, "modal_vp")) return null;
  return host;
}

function isQuestionLikeScopeHost(node) {
  if (!node || node.kind !== "construction") return false;
  if (/Question$/.test(String(node.type || ""))) return true;
  return [
    "question_fragment",
    "question_marker",
    "yes_no_question_marker",
    "wh_object",
    "wh_determiner",
    "identity_question",
    "location_question",
    "time_question",
  ].some((slot) => nodeCanFillSlot(node, slot));
}

function propositionLikeHostForScopedDiscourseParticle(nodes) {
  if (!nodes || !nodes.length) return null;
  const wrapped = applyConstructionPatterns(nodes);
  const host = fullSpanSingleConstruction(wrapped, nodes);
  if (!host) return null;
  if ([
    "NeedsContext",
    "MalformedCandidate",
    "FragmentQuestion",
    "FragmentAnswer",
    "ComplementEllipsisFragment",
    "NominalHeadSpan",
    "FormulaDiscourseUnit",
    "ClauseSequence",
    "ClauseRelationGraph",
  ].includes(host.type)) return null;
  if (isQuestionLikeScopeHost(host)) return null;
  const trace = host.trace || {};
  if (["context_required", "context_incompatible"].includes(trace.context_requirement_status)) return null;
  if (!nodeCanFillSlot(host, "predicate")
      && !nodeCanFillSlot(host, "clause")
      && !nodeCanFillSlot(host, "vp")
      && !nodeCanFillSlot(host, "modal_vp")) return null;
  return host;
}

function epistemicScopeParticleClone(node) {
  return parserInactiveTokenClone(node, {
    label: "particle",
    pos: "particle",
    syntax: "sentence_final_particle epistemic_uncertainty_particle",
    slots: ["particle", "epistemic_scope_particle", "discourse_scope_particle"],
    jyutping: "gwaa3",
    note: "probably / perhaps; marks uncertainty or probability over the preceding proposition",
    reason: "Final 啩 scopes epistemic uncertainty over a complete proposition-like host and does not supply a missing proposition.",
  });
}

function scopedEpistemicDiscourseParticleFallback(segment, terminalText = "") {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 2) return null;
  const finalNode = compact[compact.length - 1];
  if (!nodeCanFillSlot(finalNode, "epistemic_scope_particle")) return null;
  const host = propositionLikeHostForScopedDiscourseParticle(compact.slice(0, -1));
  if (!host) return null;
  const particle = epistemicScopeParticleClone(finalNode);
  const children = [host, particle];
  return construction("DiscourseParticleFrame", "Uncertain", children, {
    note: "Proposition-like host plus a sentence-final discourse particle carrying epistemic uncertainty or probability.",
    slots: templateDerivedSlots("DiscourseParticleFrame", children),
    trace: traceInfo("generative_template", {
      construction_type: "DiscourseParticleFrame",
      template_family: "generative_template",
      template: ["proposition_host!", "epistemic_scope_particle!"],
      assigned_slots: ["proposition_host", "epistemic_scope_particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      discourse_particle_family: "epistemic_stance",
      particle_subtype: "uncertainty_probability_gwaa3",
      epistemic_scope: "uncertainty_or_probability",
      proposition_host_construction: host.type,
      proposition_host_surface: flattenSurface(host),
      punctuation_hint: /[？?]/u.test(String(terminalText || "")) ? "question_marked" : "declarative_or_unmarked",
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      antecedent_status: "not_applicable",
      not_claims: [
        "not_fragment_licensor",
        "not_noun_host",
        "not_question_host",
        "not_fabricated_proposition",
        "not_tone_specific_beyond_gwaa3",
      ],
      reason: "A complete non-question proposition-like host licenses final 啩 as an epistemic uncertainty/probability particle. Bare particles, noun hosts, unresolved hosts, and question hosts remain outside this wrapper.",
    }),
  });
}

function evidentialScopeParticleClone(node) {
  return parserInactiveTokenClone(node, {
    label: "particle",
    pos: "particle",
    syntax: "sentence_final_particle evidential_noteworthiness_particle",
    slots: ["particle", "evidential_scope_particle", "discourse_scope_particle"],
    jyutping: "wo3",
    note: "reported / noteworthy / reminder stance; exact subtype depends on tone and context",
    reason: "Final 喎 scopes broad evidential/noteworthiness stance over a complete proposition-like host. Written form alone does not select an exact tone-specific subtype.",
  });
}

function scopedEvidentialDiscourseParticleFallback(segment, terminalText = "") {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 2 || !isToken(compact[compact.length - 1], "喎")) return null;
  const host = propositionLikeHostForScopedDiscourseParticle(compact.slice(0, -1));
  if (!host) return null;
  const particle = evidentialScopeParticleClone(compact[compact.length - 1]);
  const children = [host, particle];
  return construction("DiscourseParticleFrame", "Notice", children, {
    note: "Proposition-like host plus a sentence-final discourse particle carrying broad evidential or noteworthiness stance.",
    slots: templateDerivedSlots("DiscourseParticleFrame", children),
    trace: traceInfo("generative_template", {
      construction_type: "DiscourseParticleFrame",
      template_family: "generative_template",
      template: ["proposition_host!", "evidential_scope_particle!"],
      assigned_slots: ["proposition_host", "evidential_scope_particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      discourse_particle_family: "evidential_noteworthiness",
      broad_particle_class: "EvidentialDiscourseParticle",
      particle_subtype: "written_wo_family_underdetermined",
      evidential_subtype: "not_selected_without_tone_or_context",
      evidential_scope: "reportative_noteworthiness_reminder_or_counterexpectation",
      tone_source: "canonical_written_form_reading_only",
      tone_certainty: "underdetermined_from_character_alone",
      proposition_host_construction: host.type,
      proposition_host_surface: flattenSurface(host),
      punctuation_hint: /[？?]/u.test(String(terminalText || "")) ? "question_marked_surface_without_tone_inference" : "declarative_or_unmarked",
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      antecedent_status: "not_applicable",
      not_claims: [
        "not_fragment_licensor",
        "not_noun_host",
        "not_question_host",
        "not_fabricated_proposition",
        "not_exact_tone_inference",
        "not_exact_evidential_subtype",
      ],
      reason: "A complete non-question proposition-like host licenses final 喎 as a broad evidential/noteworthiness discourse particle. The written character and canonical wo3 display reading do not justify selecting a narrower tone-specific function.",
    }),
  });
}

function protectedFullSpanFormulaForParticleFallback(ordinaryWrapped, sourceNodes) {
  const top = fullSpanSingleConstruction(ordinaryWrapped, sourceNodes);
  return !!(top && top.type === "FormulaDiscourseUnit");
}

function directiveLikeHostForFinalLaa1(nodes) {
  if (!nodes || !nodes.length) return null;
  const wrapped = applyConstructionPatterns(nodes);
  const host = fullSpanSingleConstruction(wrapped, nodes);
  if (!host) return standaloneWalkHostForFinalLaaParticle(nodes);
  if (![
    "LexicalGiveRelation",
    "PostThemeParticipantRelation",
    "SubjectPredicateClause",
    "DirectionalMotionVP",
    "MotionGoalVP",
    "ProhibitiveImperative",
    "PriorityMarkerClause",
    "SerialVerbPurposeChain",
    "MotionPurposeChain",
  ].includes(host.type)) return null;
  if (isQuestionLikeScopeHost(host)) return null;
  const trace = host.trace || {};
  if (["context_required", "context_incompatible"].includes(trace.context_requirement_status)) return null;
  return host;
}


function standaloneWalkMotionVp(node, reason = "") {
  if (!isToken(node, "走")) return null;
  const movement = parserInactiveTokenClone(node, {
    label: "doing",
    pos: "verb",
    syntax: "intransitive_motion_verb transition_motion_predicate",
    slots: ["action_verb", "main_verb", "movement_verb", "predicate"],
    jyutping: "zau2",
    note: "leave / go away",
    reason: reason || "Standalone 走 is the independent movement predicate 'leave/go away', not a postverbal result complement.",
    active_affordance_match: "standalone_motion_predicate",
  });
  return construction("DirectionalMotionVP", "MotionVP", [movement], {
    slots: ["directional_motion_vp", "vp", "action_vp", "predicate", "movement_verb", "motion_predicate"],
    note: "One-word transition motion predicate headed by standalone 走.",
    trace: traceInfo("generative_template", {
      construction_type: "DirectionalMotionVP",
      template_family: "generative_template",
      template: ["transition_motion_verb!"],
      assigned_slots: ["transition_motion_verb"],
      surfaces: ["走"],
      contextual_role_resolution: "standalone_motion_predicate_not_result_complement",
      subspan: true,
      reason: reason || "Standalone 走 is an independent motion predicate announcing departure.",
    }),
  });
}


function locativeFragmentFromWrappedPlacePhrase(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length !== 1) return null;
  const only = compact[0];
  let phrase = null;
  if (only && only.kind === "construction" && only.type === "LocativePlacePhrase") {
    phrase = only;
  } else if (
    only
    && only.kind === "construction"
    && only.type === "NominalHeadSpan"
    && Array.isArray(only.children)
    && only.children.length === 1
    && only.children[0].kind === "construction"
    && only.children[0].type === "LocativePlacePhrase"
  ) {
    phrase = only.children[0];
  }
  if (!phrase) return null;
  if (hasSurface([phrase], "邊度") || nodeCanFillSlot(phrase, "location_question")) return null;
  const phraseChildren = withoutIgnorableSpaceText(phrase.children || []);
  if (!phraseChildren.length || !isToken(phraseChildren[0], "喺")) return null;
  return construction("LocativeFragment", "Location", [phrase], {
    slots: cleanSlots(["locative_fragment", "location", "clause"]),
    note: "Locative fragment: 喺 + overt place, with the located figure understood from discourse.",
    trace: traceInfo("generative_template", {
      construction_type: "LocativeFragment",
      template_family: "generative_template",
      template: ["locative_place_phrase!"],
      assigned_slots: ["locative_place_phrase"],
      surfaces: [flattenSurface(phrase)],
      fragment_subtype: "locative_answer_or_predicate_fragment",
      omitted_element_description: "located figure or subject understood from discourse",
      reason: "The location is overt; only the person or thing located there is understood from context.",
      not_claims: ["not_missing_location", "not_full_subject_predicate_clause"],
    }),
  });
}

function completionThenStandaloneWalkResolution(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  const completionIndex = compact.findIndex((node) => node && node.kind === "construction" && node.type === "CompletionVP");
  if (completionIndex < 0 || completionIndex > 1) return nodes;
  if (completionIndex === 1 && !nodeCanFillSlot(compact[0], "subject")) return nodes;
  if (!isToken(compact[completionIndex + 1], "就") || !isToken(compact[completionIndex + 2], "走")) return nodes;
  const trailing = compact.slice(completionIndex + 3);
  if (trailing.length > 1 || (trailing.length === 1 && !nodeCanFillSlot(trailing[0], "particle"))) return nodes;
  const target = compact[completionIndex + 2];
  const motion = standaloneWalkMotionVp(
    target,
    "After a completed VP plus 就, standalone 走 is the follow-up movement predicate 'leave/go away'; it is not the result complement of the earlier verb."
  );
  if (!motion) return nodes;
  return (nodes || []).map((node) => node === target ? motion : node);
}

function standaloneWalkHostForFinalLaaParticle(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (compact.length !== 2 || !nodeCanFillSlot(compact[0], "subject") || !isToken(compact[1], "走")) return null;
  const subject = compact[0];
  const motion = standaloneWalkMotionVp(
    compact[1],
    "Standalone 走 after an overt subject is the movement predicate 'leave/go away'; the final discourse particle contributes scope separately and does not determine the verb's category."
  );
  const children = [subject, motion];
  return construction("SubjectPredicateClause", "SubjPred", children, {
    slots: templateDerivedSlots("SubjectPredicateClause", children),
    note: "Subject plus an independent transition-motion predicate.",
    trace: traceInfo("generative_template", {
      construction_type: "SubjectPredicateClause",
      template_family: "generative_template",
      template: ["subject!", "predicate!"],
      assigned_slots: ["subject", "predicate"],
      surfaces: children.map((node) => flattenSurface(node)),
      predicate_subtype: "transition_motion",
      reason: "The subject and standalone movement predicate form a proposition host before final 啦 or 喇 adds its own discourse scope.",
    }),
  });
}

function changeStateHostForFinalLaa3(nodes) {
  const ordinary = propositionLikeHostForScopedDiscourseParticle(nodes);
  if (ordinary && ![
    "LexicalGiveRelation",
    "PostThemeParticipantRelation",
    "CoverbFrame",
    "FormulaDiscourseUnit",
    "AcceptabilityClause",
  ].includes(ordinary.type)) return ordinary;
  return standaloneWalkHostForFinalLaaParticle(nodes);
}

function directiveScopeParticleClone(node) {
  return parserInactiveTokenClone(node, {
    label: "particle",
    pos: "particle",
    syntax: "sentence_final_particle directive_closure_particle",
    slots: ["particle", "directive_scope_particle", "discourse_scope_particle"],
    jyutping: "laa1",
    note: "directive / suggestion / invitation / interpersonal closure",
    reason: "Final 啦 laa1 scopes directive, suggestion, invitation, or interpersonal closure over a licensed host and does not repair incomplete argument structure.",
  });
}

function scopedDirectiveClosureParticleFallback(segment, terminalText = "", ordinaryWrapped = null) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 2 || !isToken(compact[compact.length - 1], "啦")) return null;
  if (fullSpanSingleConstruction(ordinaryWrapped, compact)) return null;
  const host = directiveLikeHostForFinalLaa1(compact.slice(0, -1));
  if (!host) return null;
  const particle = directiveScopeParticleClone(compact[compact.length - 1]);
  const children = [host, particle];
  return construction("DiscourseParticleFrame", "Prompt", children, {
    note: "Licensed directive-like host plus final 啦 laa1 carrying directive/interpersonal closure scope.",
    slots: templateDerivedSlots("DiscourseParticleFrame", children),
    trace: traceInfo("generative_template", {
      construction_type: "DiscourseParticleFrame",
      template_family: "generative_template",
      template: ["directive_host!", "directive_scope_particle!"],
      assigned_slots: ["directive_host", "directive_scope_particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      discourse_particle_family: "directive_interpersonal_closure",
      broad_particle_class: "DirectiveClosureParticle",
      particle_subtype: "directive_suggestion_invitation_or_closure_laa1",
      tone_source: "canonical_written_form_reading",
      tone_certainty: "canonical_for_written_laa_character_but_real_spelling_varies",
      orthographic_uncertainty: "啦_and_喇_may_be_spelled_inconsistently_in_ordinary_writing",
      scope_host_construction: host.type,
      scope_host_surface: flattenSurface(host),
      punctuation_hint: /[？?]/u.test(String(terminalText || "")) ? "question_marked_surface" : "declarative_or_unmarked",
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      antecedent_status: "not_applicable",
      not_claims: ["not_fragment_licensor", "not_noun_host", "not_unresolved_host", "not_change_state_laa3", "not_exact_illocution_beyond_broad_family"],
      reason: "A licensed directive/clause host permits final 啦 as broad directive, suggestion, invitation, or interpersonal closure. Bare particles, nouns, and unresolved predicates remain outside the wrapper.",
    }),
  });
}

function changeStateScopeParticleClone(node) {
  return parserInactiveTokenClone(node, {
    label: "particle",
    pos: "particle",
    syntax: "sentence_final_particle change_state_current_relevance_particle",
    slots: ["particle", "change_state_scope_particle", "discourse_scope_particle"],
    jyutping: "laa3",
    note: "changed situation / current relevance / transition",
    reason: "Final 喇 laa3 scopes change of situation, current relevance, or transition over a proposition-like host and remains distinct from VP-internal perfective 咗.",
  });
}

function scopedChangeStateParticleFallback(segment, terminalText = "", ordinaryWrapped = null) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 2 || !isToken(compact[compact.length - 1], "喇")) return null;
  if (fullSpanSingleConstruction(ordinaryWrapped, compact)) return null;
  const host = changeStateHostForFinalLaa3(compact.slice(0, -1));
  if (!host) return null;
  const particle = changeStateScopeParticleClone(compact[compact.length - 1]);
  const children = [host, particle];
  return construction("DiscourseParticleFrame", "Change", children, {
    note: "Proposition-like host plus final 喇 laa3 carrying change-of-situation/current-relevance scope.",
    slots: templateDerivedSlots("DiscourseParticleFrame", children),
    trace: traceInfo("generative_template", {
      construction_type: "DiscourseParticleFrame",
      template_family: "generative_template",
      template: ["proposition_host!", "change_state_scope_particle!"],
      assigned_slots: ["proposition_host", "change_state_scope_particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      discourse_particle_family: "change_state_current_relevance",
      broad_particle_class: "ChangeStateDiscourseParticle",
      particle_subtype: "change_of_situation_current_relevance_laa3",
      aspect_relation: "sentence_final_particle_distinct_from_vp_internal_perfective_zo2",
      tone_source: "canonical_written_form_reading",
      tone_certainty: "canonical_for_written_laa_character_but_real_spelling_varies",
      orthographic_uncertainty: "啦_and_喇_may_be_spelled_inconsistently_in_ordinary_writing",
      proposition_host_construction: host.type,
      proposition_host_surface: flattenSurface(host),
      punctuation_hint: /[？?]/u.test(String(terminalText || "")) ? "question_marked_surface" : "declarative_or_unmarked",
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      antecedent_status: "not_applicable",
      not_claims: ["not_fragment_licensor", "not_noun_host", "not_unresolved_host", "not_directive_laa1", "not_perfective_aspect_marker"],
      reason: "A complete proposition-like host permits final 喇 as change-of-situation/current-relevance stance. It remains a separate discourse layer above any visible 咗 perfective event.",
    }),
  });
}


function restrictiveFocusHostHasUnresolvedClassifierHeadFusion(host) {
  if (!host || host.kind !== "construction" || host.type !== "QuantifiedClassifierNP") return false;
  const missingSlots = Array.isArray(host.trace && host.trace.missing_argument_slots)
    ? host.trace.missing_argument_slots
    : [];
  if (!missingSlots.includes("nominal_head")) return false;
  return (host.children || []).some((child) => {
    if (!child || child.kind !== "token" || !String(child.syntax || "").includes("classifier")) return false;
    const originalRole = String(child.trace && child.trace.original_role || "");
    return originalRole && originalRole !== "measure_word";
  });
}

function restrictiveScalarHostForFinalParticle(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  const wrapped = applyConstructionPatterns(compact);
  const host = fullSpanSingleConstruction(wrapped, compact);
  if (host && [
    "QuantifiedClassifierNP",
    "QuantifiedPersonNP",
    "QuantifiedTimeNP",
    "QuantityNP",
    "ApproximateQuantity",
    "DiMarkedNP",
  ].includes(host.type)) {
    if (restrictiveFocusHostHasUnresolvedClassifierHeadFusion(host)) return null;
    return host;
  }
  if (compact.length === 1) {
    const only = compact[0];
    const syntax = String(only && only.syntax || "");
    if (nodeCanFillSlot(only, "quantity") || /quantity|scalar|amount|degree/.test(syntax)) return only;
  }
  return null;
}

function restrictiveFocusMarkerClone(node) {
  return parserInactiveTokenClone(node, {
    label: "how",
    pos: "adverb",
    syntax: "restrictive_focus_adverb scalar_limiter",
    slots: ["focus_adverb", "restriction_marker", "scalar_limiter", "degree"],
    jyutping: "dak1",
    note: "only / just; limits the following amount or scalar host",
    reason: "Before a visible quantity or scalar host and final 啫/咋, 得 is the restrictive focus marker 'only', not the acceptability predicate 'okay/can'.",
  });
}

function restrictiveFocusParticleClone(node) {
  const surface = flattenSurface(node);
  const isZe = surface === "啫";
  return parserInactiveTokenClone(node, {
    label: "particle",
    pos: "particle",
    syntax: isZe
      ? "sentence_final_particle restrictive_focus_particle minimizing_particle"
      : "sentence_final_particle restrictive_focus_particle exhaustive_limit_particle",
    slots: ["particle", "restrictive_focus_particle", "focus_scope_particle"],
    jyutping: isZe ? "ze1" : "zaa3",
    note: isZe ? "only / just; minimizes the visible amount" : "only / that's all; presents the visible amount as the limit",
    reason: isZe
      ? "Final 啫 marks restrictive/minimizing focus over the visible scalar host."
      : "Final 咋 marks restrictive/exhaustive limitation over the visible scalar host.",
  });
}

function restrictiveFocusParticleFallback(segment, terminalText = "", ordinaryWrapped = null) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 3 || !isToken(compact[0], "得")) return null;
  const finalNode = compact[compact.length - 1];
  if (!isToken(finalNode, "啫") && !isToken(finalNode, "咋")) return null;
  if (fullSpanSingleConstruction(ordinaryWrapped, compact)) return null;
  const host = restrictiveScalarHostForFinalParticle(compact.slice(1, -1));
  if (!host) return null;
  const marker = restrictiveFocusMarkerClone(compact[0]);
  const particle = restrictiveFocusParticleClone(finalNode);
  const children = [marker, host, particle];
  const particleSurface = flattenSurface(particle);
  const hostTrace = host && host.kind === "construction" ? (host.trace || {}) : {};
  const inheritedMissingSlots = Array.isArray(hostTrace.missing_argument_slots)
    ? hostTrace.missing_argument_slots.slice()
    : [];
  const inheritedContextRequired = hostTrace.context_requirement_status === "context_required"
    || inheritedMissingSlots.length > 0;
  const inheritedAntecedentStatus = inheritedContextRequired
    ? (hostTrace.antecedent_status || "not_observed")
    : "not_applicable";
  return construction("FocusParticleFrame", "Focus", children, {
    note: "Restrictive focus frame: 得 limits a visible quantity or scalar host, and final 啫/咋 marks minimization or an exhaustive limit.",
    slots: templateDerivedSlots("FocusParticleFrame", children),
    trace: traceInfo("generative_template", {
      construction_type: "FocusParticleFrame",
      template_family: "generative_template",
      template: ["restriction_marker!", "scalar_host!", "restrictive_focus_particle!"],
      assigned_slots: ["restriction_marker", "scalar_host", "restrictive_focus_particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      focus_relation: "scalar_restriction",
      broad_particle_class: "RestrictiveFocusParticle",
      particle_subtype: particleSurface === "啫" ? "restrictive_minimizing_ze1" : "restrictive_exhaustive_limit_zaa3",
      restriction_marker_surface: "得",
      scalar_host_construction: host.kind === "construction" ? host.type : "scalar_token",
      scalar_host_surface: flattenSurface(host),
      punctuation_hint: /[？?]/u.test(String(terminalText || "")) ? "question_marked_surface" : "declarative_or_unmarked",
      context_requirement_status: inheritedContextRequired ? "context_required" : "context_not_required",
      missing_argument_slots: inheritedMissingSlots,
      missing_slot_details: inheritedMissingSlots.map((slot) => ({ slot, license_status: "unresolved" })),
      antecedent_status: inheritedAntecedentStatus,
      discourse_license_not_observed: inheritedContextRequired && inheritedAntecedentStatus !== "linked",
      not_claims: [
        "not_acceptability_predicate_dak1",
        "not_bare_particle",
        "not_unrestricted_np",
        "not_fabricated_quantity",
        ...(inheritedMissingSlots.includes("nominal_head") ? ["not_fabricated_nominal_head"] : []),
        "not_exact_pragmatic_force_beyond_restriction",
      ],
      reason: inheritedContextRequired
        ? "The reusable 得 + scalar/quantity host + 啫/咋 pattern expresses restrictive focus, but the particle frame does not resolve discourse-dependent slots inherited from the scalar host."
        : "The reusable 得 + scalar/quantity host + 啫/咋 pattern expresses restrictive focus. The construction reassigns 得 from acceptability to a scalar limiter only when both the host and final restrictive particle are overt.",
    }),
  });
}


const {
  sequenceEvidence: ORDERED_PARTICLE_CLUSTER_SEQUENCE_EVIDENCE,
  descriptors: ORDERED_PARTICLE_CLUSTER_DESCRIPTORS,
} = require("./runtime-resources/grammar/ordered-particle-clusters");

function orderedParticleClusterDescriptor(node) {
  const surface = flattenSurface(node);
  const descriptor = ORDERED_PARTICLE_CLUSTER_DESCRIPTORS[surface];
  return descriptor ? { surface, ...descriptor } : null;
}

function orderedParticleClusterMemberClone(node, descriptor) {
  return parserInactiveTokenClone(node, {
    label: "particle",
    pos: "particle",
    syntax: descriptor.syntax,
    slots: descriptor.slots,
    jyutping: descriptor.jyutping,
    note: descriptor.note,
    reason: `Within a visible sentence-final particle cluster, ${descriptor.surface} occupies the broad ${descriptor.layer} layer. The parser preserves the written token and does not infer a narrower tone-specific subtype.`,
  });
}

function orderedParticleClusterTailInfo(segment, terminalText = "") {
  const compact = withoutIgnorableSpaceText(segment || []).slice();
  while (compact.length && compact[compact.length - 1].kind === "text" && hasSentencePunctuation(compact[compact.length - 1].text)) compact.pop();
  if (compact.length < 2) return null;

  let clusterStart = compact.length;
  const reversedDescriptors = [];
  while (clusterStart > 0) {
    const descriptor = orderedParticleClusterDescriptor(compact[clusterStart - 1]);
    if (!descriptor) break;
    reversedDescriptors.push(descriptor);
    clusterStart -= 1;
  }
  const descriptors = reversedDescriptors.reverse();
  if (descriptors.length < 2) return null;

  const visibleParticleSequence = descriptors.map((descriptor) => descriptor.surface);
  const sequenceKey = visibleParticleSequence.join("");
  const ranks = descriptors.map((descriptor) => descriptor.rank);
  const strictlyIncreasing = ranks.every((rank, index) => index === 0 || ranks[index - 1] < rank);
  const questionLayerIsOutermost = descriptors.every((descriptor, index) => descriptor.surface !== "咩" || index === descriptors.length - 1);
  const questionPunctuationCompatible = !descriptors.some((descriptor) => descriptor.surface === "咩")
    || /[？?]/u.test(String(terminalText || ""));
  const layerOrderCompatible = strictlyIncreasing && questionLayerIsOutermost && questionPunctuationCompatible;
  const sequenceEvidence = layerOrderCompatible
    ? (ORDERED_PARTICLE_CLUSTER_SEQUENCE_EVIDENCE[sequenceKey] || null)
    : null;
  const supportedOrder = Boolean(sequenceEvidence);
  const orderStatus = supportedOrder
    ? sequenceEvidence.status
    : (layerOrderCompatible
      ? "layer_order_compatible_unvalidated_review"
      : "unsupported_or_unvalidated_order_review");

  return {
    compact,
    clusterStart,
    descriptors,
    sequenceKey,
    sequenceEvidence,
    supportedOrder,
    layerOrderCompatible,
    orderStatus,
    visibleParticleSequence,
    particleSequenceJyutping: descriptors.map((descriptor) => descriptor.jyutping),
    particleScopeLayers: descriptors.map((descriptor) => descriptor.layer),
    particleScopeFunctions: descriptors.map((descriptor) => descriptor.broad_function),
    fusionStatus: descriptors.some((descriptor) => descriptor.fusion_status.startsWith("surface_fused"))
      ? "surface_fused_particle_preserved_no_internal_split"
      : "separate_visible_particles",
  };
}

function orderedParticleClusterInfo(segment, terminalText = "") {
  const tailInfo = orderedParticleClusterTailInfo(segment, terminalText);
  if (!tailInfo || tailInfo.clusterStart < 1) return null;
  const host = propositionLikeHostForScopedDiscourseParticle(tailInfo.compact.slice(0, tailInfo.clusterStart));
  if (!host) return null;
  return {
    ...tailInfo,
    host,
  };
}

function orderedParticleClusterFallback(segment, terminalText = "", clusterInfo = null) {
  const info = clusterInfo || orderedParticleClusterInfo(segment, terminalText);
  if (!info || !info.supportedOrder) return null;
  const {
    compact,
    clusterStart,
    descriptors,
    host,
    visibleParticleSequence,
    particleSequenceJyutping,
    particleScopeLayers,
    particleScopeFunctions,
    fusionStatus,
  } = info;

  const particles = descriptors.map((descriptor, index) => (
    orderedParticleClusterMemberClone(compact[clusterStart + index], descriptor)
  ));
  const outerDescriptor = descriptors[descriptors.length - 1];
  const isQuestionCluster = outerDescriptor.surface === "咩";
  const type = isQuestionCluster ? "PolarQuestionFrame" : "DiscourseParticleFrame";
  const label = isQuestionCluster ? "YesNo?" : "Particles";
  const children = [host, ...particles];
  return construction(type, label, children, {
    note: isQuestionCluster
      ? "Biased polar question containing an ordered sentence-final particle cluster."
      : "Statement with an ordered sentence-final particle cluster.",
    slots: templateDerivedSlots(type, children),
    trace: traceInfo("generative_template", {
      construction_type: type,
      template_family: "generative_template",
      template: ["scope_host!", "cluster_particle+!"],
      assigned_slots: ["scope_host", "particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      particle_cluster: true,
      particle_cluster_root: true,
      particle_cluster_member_count: descriptors.length,
      visible_particle_sequence: visibleParticleSequence,
      particle_sequence_jyutping: particleSequenceJyutping,
      particle_scope_layers: particleScopeLayers,
      particle_scope_functions: particleScopeFunctions,
      outer_particle_surface: outerDescriptor.surface,
      outer_scope_layer: outerDescriptor.layer,
      outer_scope_function: outerDescriptor.broad_function,
      scope_direction: "inside_to_outside",
      surface_order_preserved: true,
      cluster_order_status: info.orderStatus,
      cluster_evidence_grade: info.sequenceEvidence ? info.sequenceEvidence.evidence_grade : "",
      cluster_evidence_note: info.sequenceEvidence ? info.sequenceEvidence.evidence_note : "",
      fusion_status: fusionStatus,
      tone_certainty: "broad_written_form_readings_only",
      host_construction: host.type,
      host_surface: flattenSurface(host),
      learner_display_structure: "single_cluster_frame_with_direct_particle_children",
      punctuation_hint: /[？?]/u.test(String(terminalText || "")) ? "question_marked" : "declarative_or_unmarked",
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      antecedent_status: "not_applicable",
      not_claims: [
        "not_unordered_particle_bag",
        "not_hidden_particle_reordering",
        "not_internal_split_of_fused_surface_particle",
        "not_exact_tone_specific_interpretation",
        "not_repeated_generic_stance_layers",
      ],
      reason: `This exact visible particle sequence has current evidence-backed support and follows the broad layer order. One learner-visible frame keeps the proposition host and every particle transparent, while ordered trace metadata records inside-to-outside scope without repeating a generic construction layer for each particle.`,
    }),
  });
}





function applyConstructionPatternsForTerminal(segment, terminalText = "") {
  const haveOrNotQuestion = haveOrNotQuestionFallbackForPunctuation(segment, terminalText);
  if (haveOrNotQuestion) return [haveOrNotQuestion];
  const scalarQuestion = scalarDimensionQuestionFallbackForPunctuation(segment, terminalText);
  if (scalarQuestion) return [scalarQuestion];
  const relationFragment = standaloneClauseRelationEdgeFragmentForTerminal(segment, terminalText);
  if (relationFragment) return [relationFragment];
  const relativeClauseNP = relativeClauseNPForTerminal(segment);
  if (relativeClauseNP) return [relativeClauseNP];
  const connectorLinked = connectorAwareClauseLinkingForTerminal(segment);
  if (connectorLinked) return connectorLinked;
  const ordinaryWrapped = applyConstructionPatterns(segment);
  const particleClusterInfo = orderedParticleClusterInfo(segment, terminalText);
  if (particleClusterInfo && !particleClusterInfo.supportedOrder) return ordinaryWrapped;
  const orderedParticleCluster = orderedParticleClusterFallback(segment, terminalText, particleClusterInfo);
  if (orderedParticleCluster) return [orderedParticleCluster];
  const restrictiveFocusParticle = restrictiveFocusParticleFallback(segment, terminalText, ordinaryWrapped);
  if (restrictiveFocusParticle) return [restrictiveFocusParticle];
  const scopedDirectiveParticle = scopedDirectiveClosureParticleFallback(segment, terminalText, ordinaryWrapped);
  if (scopedDirectiveParticle) return [scopedDirectiveParticle];
  const scopedChangeStateParticle = scopedChangeStateParticleFallback(segment, terminalText, ordinaryWrapped);
  if (scopedChangeStateParticle) return [scopedChangeStateParticle];
  const scopedEvidentialParticle = scopedEvidentialDiscourseParticleFallback(segment, terminalText);
  if (scopedEvidentialParticle) return [scopedEvidentialParticle];
  const scopedEpistemicParticle = scopedEpistemicDiscourseParticleFallback(segment, terminalText);
  if (scopedEpistemicParticle) return [scopedEpistemicParticle];
  const finalMePolarQuestion = finalMePolarQuestionFallbackForPunctuation(segment, terminalText, ordinaryWrapped);
  if (finalMePolarQuestion) return [finalMePolarQuestion];
  return ordinaryWrapped;
}

function applyConstructionPatternsByPunctuation(nodes) {
  const boundedAcknowledgementRepetition = boundedAcknowledgementRepetitionForPunctuation(nodes);
  if (boundedAcknowledgementRepetition) return boundedAcknowledgementRepetition;
  const repeatedNegatedExistentialResponse = repeatedNegatedExistentialResponseForPunctuation(nodes);
  if (repeatedNegatedExistentialResponse) return repeatedNegatedExistentialResponse;
  const rendered = [];
  let segment = [];
  const flush = (terminalText = "") => {
    if (segment.length) {
      rendered.push(...applyConstructionPatternsForTerminal(segment, terminalText));
      segment = [];
    }
  };

  for (const node of nodes) {
    if (node.kind === "text" && hasSentencePunctuation(node.text)) {
      flush(node.text);
      rendered.push(node);
    } else {
      segment.push(node);
    }
  }
  flush();
  return wrapClauseSequenceByPunctuation(rendered);
}

function explicitContextTurns(input) {
  if (!input) return [];
  const rawTurns = typeof input === "string"
    ? [{ source: input }]
    : Array.isArray(input)
      ? input
      : Array.isArray(input.turns)
        ? input.turns
        : input.source
          ? [input]
          : [];
  return rawTurns
    .map((turn) => typeof turn === "string" ? { source: turn } : (turn || {}))
    .filter((turn) => normalizeSurface(turn.source))
    .map((turn, index) => ({
      id: String(turn.id || `context-${index + 1}`),
      source: String(turn.source || ""),
      directive_line_index: Number.isInteger(turn.directive_line_index) ? turn.directive_line_index : null,
      target_source_line_index: Number.isInteger(turn.target_source_line_index) ? turn.target_source_line_index : null,
      raw_directive: turn.raw_directive ? String(turn.raw_directive) : "",
      directive_kind: turn.directive_kind ? String(turn.directive_kind) : "explicit_context_next_source",
    }));
}

function tokenRowsForAnalysis(analysis) {
  return flattenNodes((analysis && analysis.nodes) || []).filter((row) => row.kind === "token");
}

function questionDescriptorForContextTurn(turn) {
  const analysis = turn && turn.analysis;
  if (!analysis) return null;
  const tokens = tokenRowsForAnalysis(analysis);
  const surfaces = tokens.map((row) => row.surface);
  const topTypes = flattenNodes(analysis.nodes || [])
    .filter((row) => row.kind === "construction" && row.depth === 0)
    .map((row) => row.type);
  const questionMarked = /[？?]/u.test(turn.source) || topTypes.some((type) => String(type || "").includes("Question"));
  if (!questionMarked) return null;

  for (let index = 0; index < surfaces.length; index += 1) {
    const profile = predicateOmissionProfileForQuestionForm(surfaces[index]);
    if (!profile) continue;
    let spanEnd = surfaces.length;
    while (spanEnd > index + 1 && (tokens[spanEnd - 1].slots || []).includes("particle")) spanEnd -= 1;
    return {
      family: profile.parser_family === "modal" ? "modal_a_not_a" : "a_not_a",
      head_surface: (profile.positive_heads || [surfaces[index]])[0],
      positive_alternative: (profile.positive_heads || [surfaces[index]])[0],
      negative_alternative: `唔${(profile.positive_heads || [surfaces[index]])[0]}`,
      antecedent_span: surfaces.slice(index, spanEnd).join(""),
      question_domain_surface: surfaces.slice(index + 1, spanEnd).join(""),
      context_turn_id: turn.id,
      question_id: turn.id,
      raw_source: turn.source,
      predicate_omission_profile: profile.id,
      question_match_family: profile.question_match_family,
      complement_type: profile.complement_type,
    };
  }

  for (let index = 0; index < surfaces.length - 2; index += 1) {
    const first = surfaces[index];
    const negator = surfaces[index + 1];
    const second = surfaces[index + 2];
    if (negator !== "唔" || !first || !second) continue;
    if (first !== second && !first.startsWith(second) && !second.startsWith(first)) continue;
    const head = first.length >= second.length ? first : second;
    const firstRow = tokens[index];
    const secondRow = tokens[index + 2];
    const modal = (firstRow.slots || []).includes("modal") || (secondRow.slots || []).includes("modal");
    let spanEnd = surfaces.length;
    while (spanEnd > index + 3 && (tokens[spanEnd - 1].slots || []).includes("particle")) spanEnd -= 1;
    const profile = predicateOmissionProfileForHead(head);
    return {
      family: (profile && profile.parser_family === "modal") || modal ? "modal_a_not_a" : "a_not_a",
      head_surface: profile ? profile.positive_heads[0] : head,
      positive_alternative: profile ? profile.positive_heads[0] : head,
      negative_alternative: `唔${profile ? profile.positive_heads[0] : head}`,
      antecedent_span: surfaces.slice(index, spanEnd).join(""),
      question_domain_surface: surfaces.slice(index + 3, spanEnd).join(""),
      context_turn_id: turn.id,
      question_id: turn.id,
      raw_source: turn.source,
      predicate_omission_profile: profile ? profile.id : "",
      question_match_family: profile ? profile.question_match_family : "",
      complement_type: profile ? profile.complement_type : "",
    };
  }

  const finalMeiIndex = surfaces.lastIndexOf("未");
  if (topTypes.includes("CompletionQuestion") || finalMeiIndex > 0) {
    const beforeMei = finalMeiIndex > 0 ? tokens.slice(0, finalMeiIndex) : tokens;
    const predicate = beforeMei.find((row) => (row.slots || []).includes("action_verb") || (row.slots || []).includes("predicate"));
    if (predicate) {
      const startIndex = tokens.indexOf(predicate);
      const questionDomain = tokens
        .slice(startIndex + 1, finalMeiIndex >= 0 ? finalMeiIndex : tokens.length)
        .filter((row) => !["咗", "過", "緊"].includes(row.surface) && !(row.slots || []).includes("particle"))
        .map((row) => row.surface)
        .join("");
      return {
        family: "completion_question",
        head_surface: predicate.surface,
        positive_alternative: `${predicate.surface}咗`,
        negative_alternative: `未${predicate.surface}`,
        antecedent_span: surfaces.slice(startIndex, finalMeiIndex >= 0 ? finalMeiIndex + 1 : surfaces.length).join(""),
        question_domain_surface: questionDomain,
        context_turn_id: turn.id,
        question_id: turn.id,
        raw_source: turn.source,
      };
    }
  }
  return null;
}

function analyzedExplicitContext(input) {
  const turns = explicitContextTurns(input).map((turn) => {
    const analysis = analyzeLine(turn.source);
    return { ...turn, analysis };
  });
  return {
    turns,
    public: {
      supplied: turns.length > 0,
      turns: turns.map((turn) => ({
        id: turn.id,
        source: turn.source,
        directive_kind: turn.directive_kind,
        directive_line_index: turn.directive_line_index,
        target_source_line_index: turn.target_source_line_index,
        raw_directive: turn.raw_directive,
        parser_shadow_source: turn.analysis.parser_shadow_source,
        top_constructions: diagnosticSummary(turn.analysis).top_constructions || [],
      })),
    },
  };
}

function targetDescriptorForContext(nodes) {
  const rows = flattenNodes(nodes || []);
  const tokens = rows.filter((row) => row.kind === "token");
  const constructions = rows.filter((row) => row.kind === "construction");
  const top = constructions.find((row) => row.depth === 0);
  const topTrace = top && top.trace ? top.trace : {};
  const subject = tokens.find((row) => (row.slots || []).includes("subject"));
  const particles = tokens.filter((row) => (row.slots || []).includes("particle")).map((row) => row.surface);
  const polarity = tokens.some((row) => row.surface === "未")
    ? "not_yet"
    : tokens.some((row) => row.surface === "唔")
      ? "negative"
      : "positive";
  const candidate = tokens.find((row) => {
    const slots = row.slots || [];
    return slots.includes("preference_predicate")
      || slots.includes("modal")
      || slots.includes("cognition_predicate")
      || slots.includes("stance_predicate")
      || slots.includes("speech_verb")
      || slots.includes("acceptability_predicate")
      || slots.includes("action_verb")
      || slots.includes("stative_predicate");
  });
  if (!candidate) return null;
  const slots = candidate.slots || [];
  const profile = predicateOmissionProfileForHead(candidate.surface);
  const candidateIndex = tokens.indexOf(candidate);
  const complementTokens = tokens.slice(candidateIndex + 1).filter((row) => {
    const rowSlots = row.slots || [];
    return !rowSlots.includes("particle")
      && !["唔", "未", "咗", "過", "緊", "喇", "呀", "啊"].includes(row.surface);
  });
  const hasOvertObject = complementTokens.some((row) => {
    const rowSlots = row.slots || [];
    return rowSlots.some((slot) => ["object", "theme", "head_noun", "np"].includes(slot));
  });
  const hasOvertPredicateComplement = complementTokens.some((row) => {
    const rowSlots = row.slots || [];
    return rowSlots.some((slot) => ["predicate", "vp", "action_verb", "movement_verb", "stative_predicate"].includes(slot));
  });
  let predicateFamily = "predicate";
  let missingSlots = [];
  if (profile) {
    predicateFamily = profile.parser_family;
    if (!hasOvertObject && !hasOvertPredicateComplement && topTrace.omission_status !== "conventional_bare_statement") {
      missingSlots = [profile.missing_slot_type];
    }
  } else if (slots.includes("modal")) {
    predicateFamily = "modal";
    if (!hasOvertObject && !hasOvertPredicateComplement) {
      missingSlots = [candidate.surface === "想" ? "desired_or_cognitive_content" : "modal_or_volitional_complement"];
    }
  } else if (slots.includes("preference_predicate")) {
    predicateFamily = "preference";
    if (!hasOvertObject) missingSlots = ["preference_object_or_domain"];
  } else if (slots.includes("action_verb") && tokenSemanticDomains({ kind: "token", ...candidate }).includes("consumption")) {
    predicateFamily = "consumption";
    if (!hasOvertObject) missingSlots = ["object_or_activity_domain"];
  } else if (slots.includes("action_verb")) {
    predicateFamily = slots.includes("movement_verb") ? "motion" : "action";
    const objectSelecting = getConstructionAffordances(candidate).can_head_productive_vo === true;
    if (objectSelecting && !hasOvertObject) missingSlots = ["object_or_activity_domain"];
    if (!subject && constructions.some((row) => ["PerfectiveVP", "PostverbalZoPerfectiveVP"].includes(row.type))) {
      missingSlots = Array.from(new Set([...missingSlots, "subject"]));
    }
  } else if (slots.includes("stative_predicate")) {
    predicateFamily = "stative";
    if (!subject) missingSlots = ["subject_or_topic"];
  }
  if (Array.isArray(topTrace.missing_argument_slots) && topTrace.missing_argument_slots.length) {
    missingSlots = topTrace.missing_argument_slots.slice();
  }
  if (!subject && missingSlots.length && !missingSlots.includes("subject") && predicateFamily !== "stative") {
    missingSlots.push("subject");
  }
  return {
    head_surface: candidate.surface,
    predicate_family: predicateFamily,
    selected_alternative: polarity,
    subject_status: subject ? "explicit" : "omitted_unlicensed",
    missing_argument_slots: missingSlots,
    particle_contribution: particles,
    aspect: tokens.some((row) => row.surface === "咗") ? "overt_perfective" : "",
    top_type: top ? top.type : "",
    top_trace: topTrace,
    has_overt_object: hasOvertObject,
    has_perfective_structure: constructions.some((row) => ["PerfectiveVP", "PostverbalZoPerfectiveVP"].includes(row.type)),
    predicate_omission_profile: profile ? profile.id : (topTrace.predicate_omission_profile || ""),
    question_match_family: profile ? profile.question_match_family : (topTrace.question_match_family || ""),
    complement_type: profile ? profile.complement_type : (topTrace.complement_type || ""),
    conventionality_status: topTrace.conventionality_status || (profile ? profile.conventional_bare_status : ""),
    speech_event_use: topTrace.speech_event_use || "",
    legacy_context_metadata_active: slots.includes("preference_predicate") || slots.includes("modal") || slots.includes("action_verb") || slots.includes("stative_predicate"),
  };
}

function compatibleContextQuestion(target, contextTurns) {
  if (!target) return { descriptor: null, supplied: contextTurns.length > 0 };
  if (!contextTurns.length) return { descriptor: null, supplied: false, sawQuestion: false };
  const latestTurn = contextTurns[contextTurns.length - 1];
  const descriptor = questionDescriptorForContextTurn(latestTurn);
  if (!descriptor) return { descriptor: null, supplied: true, sawQuestion: false, stale_context_blocked: contextTurns.length > 1 };
  const questionProfile = descriptor.predicate_omission_profile
    ? PREDICATE_OMISSION_PROFILES.find((profile) => profile.id === descriptor.predicate_omission_profile)
    : predicateOmissionProfileForHead(descriptor.head_surface);
  const responseProfile = target.predicate_omission_profile
    ? PREDICATE_OMISSION_PROFILES.find((profile) => profile.id === target.predicate_omission_profile)
    : predicateOmissionProfileForHead(target.head_surface);
  if (questionProfile || responseProfile) {
    if (!predicateProfilesCompatible(questionProfile, responseProfile)) return { descriptor: null, supplied: true, sawQuestion: true };
  } else if (descriptor.head_surface !== target.head_surface) {
    return { descriptor: null, supplied: true, sawQuestion: true };
  }
  const completionTarget = target.has_perfective_structure || target.selected_alternative === "not_yet";
  if (descriptor.family === "completion_question" && !completionTarget) return { descriptor: null, supplied: true, sawQuestion: true };
  if (descriptor.family !== "completion_question" && completionTarget) return { descriptor: null, supplied: true, sawQuestion: true };
  if (descriptor.family === "modal_a_not_a" && target.predicate_family !== "modal") return { descriptor: null, supplied: true, sawQuestion: true };
  if (descriptor.family === "a_not_a" && target.predicate_family === "modal") return { descriptor: null, supplied: true, sawQuestion: true };
  return { descriptor, supplied: true, sawQuestion: true };
}

function splitTerminalContextNodes(nodes) {
  const structural = nodes.slice();
  const terminal = [];
  while (structural.length && structural[structural.length - 1].kind === "text" && hasSentencePunctuation(structural[structural.length - 1].text)) {
    terminal.unshift(structural.pop());
  }
  return { structural, terminal };
}

function contextRequiredTrace(detail = {}) {
  const missing = Array.isArray(detail.missing_argument_slots) ? detail.missing_argument_slots : [];
  return traceInfo("special_ambiguity_rule", {
    construction_type: "NeedsContext",
    reason: detail.reason || "The overt structure is valid, but an explicit compatible discourse antecedent is required.",
    context_requirement_status: detail.context_requirement_status || "context_required",
    missing_argument_slots: missing,
    missing_slot_details: missing.map((slot) => ({ slot, license_status: "unresolved" })),
    antecedent_status: detail.antecedent_status || "not_observed",
    discourse_license_not_observed: detail.antecedent_status !== "linked",
    ...detail,
  });
}

function needsContextAroundExisting(structural, detail = {}) {
  if (structural.length === 1 && structural[0].kind === "construction" && structural[0].type === "NeedsContext") {
    structural[0].trace = contextRequiredTrace({ ...(structural[0].trace || {}), ...detail });
    return structural[0];
  }
  return construction("NeedsContext", "needs context", structural, {
    slots: cleanSlots(["needs_context", "review_candidate", "problem_span"]),
    note: "Valid internal structure with an unresolved discourse-dependent slot.",
    trace: contextRequiredTrace(detail),
  });
}

function fragmentChildrenFromStructural(structural) {
  if (structural.length === 1 && structural[0].kind === "construction" && structural[0].type === "NeedsContext") {
    return structural[0].children || [];
  }
  return structural;
}

function licensedFragmentAnswer(structural, target, question) {
  const children = fragmentChildrenFromStructural(structural);
  const missing = target.missing_argument_slots || [];
  const selected = target.selected_alternative === "not_yet" ? "negative_not_yet" : target.selected_alternative;
  const objectDomainMissing = missing.some((slot) => slot.includes("object") || slot.includes("domain"));
  const overtQuestionDomain = Boolean(question.question_domain_surface);
  const fragmentType = target.predicate_family === "modal"
    ? "modal_response"
    : target.aspect
      ? "perfective_predicate_repetition_answer"
      : "predicate_repetition_answer";
  return construction("FragmentAnswer", "fragment answer", children, {
    slots: cleanSlots(["fragment_answer", "answer_fragment", "clause", target.subject_status === "explicit" ? "subject" : ""]),
    note: "Explicitly context-linked fragment answer. Overt target material remains visible; omitted slots link to the prior question without fabricated words.",
    trace: traceInfo("governed_discourse_wrapper", {
      construction_type: "FragmentAnswer",
      fragment_subtype: fragmentType,
      context_requirement_status: "context_licensed",
      missing_argument_slots: missing,
      missing_slot_details: missing.map((slot) => ({ slot, license_status: "licensed", licensed_by: question.context_turn_id })),
      antecedent_status: "linked",
      context_turn_id: question.context_turn_id,
      question_id: question.question_id,
      antecedent_span: question.antecedent_span,
      selected_alternative: selected,
      subject_status: target.subject_status === "explicit" ? "explicit" : "null_licensed",
      null_subject: target.subject_status === "explicit" ? "not_omitted" : "licensed",
      null_object: objectDomainMissing
        ? (overtQuestionDomain ? "licensed" : "underdetermined_object_or_activity_domain")
        : "not_applicable",
      null_object_link: objectDomainMissing
        ? (overtQuestionDomain ? "licensed_to_question_domain" : "question_licenses_activity_domain_without_overt_object_antecedent")
        : "not_applicable",
      aspect: target.aspect || "not_overt",
      complement_antecedent: target.predicate_family === "modal" ? "question_domain_unspecified" : "",
      complement_antecedent_span: target.predicate_family === "modal" ? question.antecedent_span : "",
      complement_type: target.predicate_family === "modal" ? "unspecified_np_vp_or_proposition" : "",
      particle_contribution: target.particle_contribution || [],
      overt_head: target.head_surface,
      predicate_omission_profile: target.predicate_omission_profile || "",
      omission_status: "context_licensed_ellipsis",
      complement_type: target.complement_type || (target.predicate_family === "modal" ? "unspecified_np_vp_or_proposition" : ""),
      polarity: target.selected_alternative || "positive",
      conventionality_status: target.conventionality_status || "",
      speech_event_use: target.speech_event_use || "not_applicable",
      question_match_family: question.question_match_family || "",
      omission_analysis_candidates: target.predicate_family === "modal"
        ? ["modal_complement_ellipsis", "predicate_repetition_answer"]
        : ["argument_drop", "predicate_repetition_answer"],
      not_claims: ["not_fabricated_antecedent", "not_synthetic_missing_child", "not_invariant_yes_no_response"],
    }),
  });
}

function licensedContextFragmentQuestion(structural, explicitContext) {
  if (!explicitContext || !explicitContext.turns || !explicitContext.turns.length) return null;
  if (structural.length !== 1 || structural[0].kind !== "construction") return null;
  const only = structural[0];
  const fragment = only.type === "FragmentQuestion"
    ? only
    : only.type === "NeedsContext"
      ? (only.children || []).find((child) => child && child.kind === "construction" && child.type === "FragmentQuestion")
      : null;
  if (!fragment) return null;
  const latestTurn = explicitContext.turns[explicitContext.turns.length - 1];
  if (!latestTurn || !normalizeSurface(latestTurn.source)) return null;
  const missing = (fragment.trace && fragment.trace.missing_argument_slots) || ["topic_or_alternative"];
  fragment.trace = {
    ...(fragment.trace || {}),
    context_requirement_status: "context_licensed",
    missing_argument_slots: missing,
    missing_slot_details: missing.map((slot) => ({ slot, license_status: "licensed", licensed_by: latestTurn.id })),
    antecedent_status: "linked",
    context_turn_id: latestTurn.id,
    antecedent_span: latestTurn.source,
    discourse_license_not_observed: false,
    not_claims: Array.from(new Set([...(fragment.trace && fragment.trace.not_claims || []), "not_fabricated_antecedent"])),
  };
  return fragment;
}

function existentialQuestionDescriptorForContextTurn(turn) {
  const analysis = turn && turn.analysis;
  if (!analysis) return null;
  const rows = flattenNodes(analysis.nodes || []);
  const constructions = rows.filter((row) => row.kind === "construction");
  const tokens = rows.filter((row) => row.kind === "token");
  const markerIndex = tokens.findIndex((row) => row.surface === "有冇" || (row.slots || []).includes("existential_question"));
  if (markerIndex < 0) return null;

  const haveOrNotConstruction = constructions.find((row) => {
    const detail = row.trace || {};
    return detail.question_family === "have_or_not"
      || ["ExistentialQuestion", "ExperientialYesNoQuestion", "ANotAQuestion"].includes(row.type);
  });
  const questionMarked = /[？?]/u.test(String(turn.source || ""));
  if (!questionMarked || !haveOrNotConstruction) return null;

  const domainTokens = tokens.slice(markerIndex + 1).filter((row) => !(row.slots || []).includes("particle"));
  const domainSurface = domainTokens.map((row) => row.surface).join("");
  const detail = haveOrNotConstruction.trace || {};
  return {
    family: "existential_question",
    question_subtype: detail.question_subtype || detail.existential_subtype || "have_or_not",
    head_surface: "冇",
    positive_alternative: "有",
    negative_alternative: "冇",
    antecedent_span: tokens.slice(markerIndex).map((row) => row.surface).join(""),
    question_domain_surface: domainSurface,
    question_domain_status: domainSurface ? "overt" : "elliptical_in_question",
    context_turn_id: turn.id,
    question_id: turn.id,
    raw_source: turn.source,
  };
}

function licensedContextNegatedExistentialFragment(structural, explicitContext) {
  if (!explicitContext || !explicitContext.turns || !explicitContext.turns.length) return null;
  if (structural.length !== 1 || structural[0].kind !== "construction" || structural[0].type !== "NegatedExistentialFragment") return null;
  const fragment = structural[0];
  const latestTurn = explicitContext.turns[explicitContext.turns.length - 1];
  const question = existentialQuestionDescriptorForContextTurn(latestTurn);
  if (!question) return null;
  const missing = (fragment.trace && fragment.trace.missing_argument_slots) || ["negative_response_domain"];
  fragment.trace = {
    ...(fragment.trace || {}),
    context_requirement_status: "context_licensed",
    missing_argument_slots: missing,
    missing_slot_details: missing.map((slot) => ({ slot, license_status: "licensed", licensed_by: latestTurn.id })),
    antecedent_status: "linked",
    context_turn_id: latestTurn.id,
    question_id: latestTurn.id,
    antecedent_span: question.antecedent_span,
    selected_alternative: "negative",
    question_subtype: question.question_subtype,
    question_domain_status: question.question_domain_status,
    response_domain_surface: question.question_domain_surface,
    discourse_license_not_observed: false,
    not_claims: Array.from(new Set([
      ...((fragment.trace && fragment.trace.not_claims) || []),
      "not_fabricated_domain",
      "not_syntactic_null_object_claim",
    ])),
  };
  return fragment;
}



function positiveResponseDiscourseAntecedentDescriptor(turn) {
  if (!turn || !turn.analysis) return null;
  const source = String(turn.source || "").trim();
  const normalized = normalizeSurface(source);
  if (!normalized) return null;

  const existentialQuestion = existentialQuestionDescriptorForContextTurn(turn);
  if (existentialQuestion) {
    return {
      family: "existential_or_possessive_question",
      antecedent_span: existentialQuestion.antecedent_span || source,
      domain_surface: existentialQuestion.question_domain_surface || "",
      domain_status: existentialQuestion.question_domain_status || "question_domain",
      context_turn_id: turn.id,
      question_id: turn.id,
      question_subtype: existentialQuestion.question_subtype || "",
      antecedent_parse_status: "typed_question_observed",
    };
  }

  const rows = flattenNodes(turn.analysis.nodes || []);
  const tokens = rows.filter((row) => row.kind === "token");
  const meaningful = tokens.filter((row) => !(row.slots || []).includes("particle"));
  const topConstructions = rows.filter((row) => row.kind === "construction" && row.depth === 0);
  const topIsDiscourseFormula = topConstructions.some((row) =>
    ["FormulaDiscourseUnit", "NegatedExistentialFragment"].includes(row.type)
      || (row.slots || []).includes("discourse_response")
  );
  const topIsProposition = topConstructions.some((row) => {
    if (["NeedsContext", "MalformedCandidate", "FragmentQuestion"].includes(row.type)) return false;
    if (/Question$/u.test(String(row.type || ""))) return false;
    const slots = row.slots || [];
    return slots.some((slot) => ["clause", "clause_like", "predicate", "vp", "action_vp"].includes(slot))
      || /(?:Clause|Frame|Sequence)$/u.test(String(row.type || ""));
  });
  const hasSubjectOrTopic = meaningful.some((row) => {
    const slots = row.slots || [];
    return slots.includes("subject") || slots.includes("topic");
  });
  const hasPredicate = meaningful.some((row) => {
    const slots = row.slots || [];
    return slots.some((slot) => [
      "predicate",
      "action_verb",
      "stative_predicate",
      "cognition_predicate",
      "speech_verb",
      "modal",
      "existential",
      "negated_existential",
    ].includes(slot)) || /(?:verb|predicate|stative)/u.test(String(row.syntax || ""));
  });
  const questionMarked = /[？?]/u.test(source)
    || topConstructions.some((row) => /Question$/u.test(String(row.type || "")));
  const standalonePredicateResponse = !questionMarked
    && meaningful.length > 0
    && meaningful.length <= 2
    && hasPredicate;
  const propositionLike = !questionMarked
    && (topIsProposition || (hasSubjectOrTopic && hasPredicate));

  if (!topIsDiscourseFormula && !standalonePredicateResponse && !propositionLike) return null;

  const existentialDomain = existentialDomainDescriptorForContextTurn(turn);
  const family = propositionLike
    ? "asserted_proposition_turn"
    : "discourse_response_turn";
  return {
    family,
    antecedent_span: source,
    domain_surface: existentialDomain ? existentialDomain.domain_surface : normalized,
    domain_status: existentialDomain ? "overt_existential_domain" : "discourse_proposition",
    context_turn_id: turn.id,
    question_id: "",
    question_subtype: "",
    antecedent_parse_status: topIsProposition
      ? "propositional_construction_observed"
      : propositionLike
        ? "subject_predicate_evidence_observed"
        : topIsDiscourseFormula
          ? "discourse_formula_observed"
          : "elliptical_predicate_response_observed",
  };
}

function contextualPositiveExistentialAcknowledgementRepetition(structural, explicitContext) {
  if (structural.length !== 1 || structural[0].kind !== "construction" || structural[0].type !== "FormulaDiscourseUnit") return null;
  const formula = structural[0];
  const trace = formula.trace || {};
  if (trace.formula_type !== "acknowledgement_repetition"
      || trace.acknowledgement_family !== "positive_existential") return null;
  if (!explicitContext || !explicitContext.turns || !explicitContext.turns.length) return formula;

  const latestTurn = explicitContext.turns[explicitContext.turns.length - 1];
  const descriptor = positiveResponseDiscourseAntecedentDescriptor(latestTurn);
  if (!descriptor) return formula;

  const missing = Array.isArray(trace.missing_argument_slots) && trace.missing_argument_slots.length
    ? trace.missing_argument_slots.slice()
    : ["positive_response_domain"];
  formula.trace = {
    ...trace,
    context_requirement_status: "context_licensed",
    missing_argument_slots: missing,
    missing_slot_details: missing.map((slot) => ({ slot, license_status: "licensed", licensed_by: latestTurn.id })),
    antecedent_status: "linked",
    context_turn_id: latestTurn.id,
    question_id: descriptor.question_id || "",
    antecedent_span: descriptor.antecedent_span,
    antecedent_family: descriptor.family,
    antecedent_parse_status: descriptor.antecedent_parse_status,
    selected_alternative: "positive",
    question_subtype: descriptor.question_subtype || "",
    response_domain_status: descriptor.domain_status,
    response_domain_surface: descriptor.domain_surface || "",
    discourse_license_not_observed: false,
    reason: "A structurally discourse-bearing preceding turn licenses the typed positive-response domain. The resolver uses broad question, proposition, and discourse-response categories; it does not require a memorized antecedent sentence or force semantic agreement with the previous polarity.",
    not_claims: Array.from(new Set([...(trace.not_claims || []), "not_fabricated_domain", "not_syntactic_null_object_claim"])),
  };
  return formula;
}

function existentialDomainDescriptorForContextTurn(turn) {
  const analysis = turn && turn.analysis;
  if (!analysis) return null;
  const tokens = tokenRowsForAnalysis(analysis);
  const markerIndex = tokens.findIndex((row) => row.surface === "有" || row.surface === "冇"
    || (row.slots || []).includes("existential") || (row.slots || []).includes("negated_existential"));
  if (markerIndex < 0) return null;
  const excluded = new Set(["我", "你", "佢", "我哋", "你哋", "佢哋", "連", "都", "又", "就", "有", "冇"]);
  const domainTokens = tokens.filter((row, index) => {
    if (index === markerIndex) return false;
    if (excluded.has(row.surface)) return false;
    const slots = row.slots || [];
    if (slots.includes("particle") || slots.includes("subject") || slots.includes("focus_adverb")) return false;
    return true;
  });
  const domainSurface = domainTokens.map((row) => row.surface).join("");
  if (!domainSurface) return null;
  return {
    family: "existential_domain_statement",
    domain_surface: domainSurface,
    antecedent_span: turn.source,
    context_turn_id: turn.id,
    raw_source: turn.source,
  };
}

function eventDomainDescriptorForContextTurn(turn, expectedHeadSurface = "") {
  const analysis = turn && turn.analysis;
  if (!analysis) return null;
  const tokens = tokenRowsForAnalysis(analysis);
  const headIndex = tokens.findIndex((row) => row.surface === expectedHeadSurface
    && (row.slots || []).includes("action_verb"));
  if (headIndex < 0) return null;
  const tail = tokens.slice(headIndex + 1);
  const totalityIndex = tail.findIndex((row) => row.surface === "晒" && (row.slots || []).includes("completion_marker"));
  if (totalityIndex < 0) return null;
  const between = tail.slice(0, totalityIndex);
  if (between.some((row) => {
    const slots = row.slots || [];
    return !slots.includes("negator")
      && !slots.includes("m4_negator")
      && !slots.includes("focus_adverb")
      && !slots.includes("particle");
  })) return null;
  const eventTokens = [tokens[headIndex], ...tail.slice(0, totalityIndex + 1)];
  return {
    family: "same_event_totality_domain_statement",
    event_head_surface: expectedHeadSurface,
    event_surface: eventTokens.map((row) => row.surface).join(""),
    antecedent_span: turn.source,
    context_turn_id: turn.id,
    raw_source: turn.source,
  };
}

function licensedContextHaveOrNotEventQuestion(structural, explicitContext) {
  if (!explicitContext || !explicitContext.turns || !explicitContext.turns.length) return null;
  if (structural.length !== 1 || structural[0].kind !== "construction") return null;
  const question = structural[0];
  if (!["ANotAQuestion", "ExperientialYesNoQuestion"].includes(question.type)) return null;
  if (!question.trace || question.trace.question_family !== "have_or_not") return null;
  if (question.trace.context_requirement_status !== "context_required") return null;
  const missing = question.trace.missing_argument_slots || [];
  if (!missing.includes("object_or_activity_domain")) return null;
  const expectedHeadSurface = String(question.trace.event_head_surface || "");
  if (!expectedHeadSurface) return null;
  const latestTurn = explicitContext.turns[explicitContext.turns.length - 1];
  const descriptor = eventDomainDescriptorForContextTurn(latestTurn, expectedHeadSurface);
  if (!descriptor) return null;
  question.trace = {
    ...question.trace,
    context_requirement_status: "context_licensed",
    missing_argument_slots: missing,
    missing_slot_details: missing.map((slot) => ({ slot, license_status: "licensed", licensed_by: latestTurn.id })),
    antecedent_status: "linked",
    context_turn_id: latestTurn.id,
    antecedent_span: descriptor.antecedent_span,
    event_domain_antecedent_surface: descriptor.event_surface,
    discourse_license_not_observed: false,
    not_claims: Array.from(new Set([...(question.trace.not_claims || []), "not_fabricated_event_domain", "not_syntactic_null_object_claim"])),
  };
  return question;
}

function licensedContextEllipticalExistentialQuestion(structural, explicitContext) {
  if (!explicitContext || !explicitContext.turns || !explicitContext.turns.length) return null;
  if (structural.length !== 1 || structural[0].kind !== "construction" || structural[0].type !== "ExistentialQuestion") return null;
  const question = structural[0];
  if (!question.trace || question.trace.existential_subtype !== "elliptical_domain") return null;
  const latestTurn = explicitContext.turns[explicitContext.turns.length - 1];
  const descriptor = existentialDomainDescriptorForContextTurn(latestTurn);
  if (!descriptor) return null;
  const missing = question.trace.missing_argument_slots || ["existential_domain"];
  question.trace = {
    ...question.trace,
    context_requirement_status: "context_licensed",
    missing_argument_slots: missing,
    missing_slot_details: missing.map((slot) => ({ slot, license_status: "licensed", licensed_by: latestTurn.id })),
    antecedent_status: "linked",
    context_turn_id: latestTurn.id,
    antecedent_span: descriptor.antecedent_span,
    existential_domain_surface: descriptor.domain_surface,
    discourse_license_not_observed: false,
    not_claims: Array.from(new Set([...(question.trace.not_claims || []), "not_fabricated_object"])),
  };
  return question;
}

function typedContextDependentFragmentBoundary(structural, explicitContext) {
  if (structural.length !== 1 || structural[0].kind !== "construction") return null;
  const fragment = structural[0];
  if (!["FragmentQuestion", "NegatedExistentialFragment"].includes(fragment.type)) return null;
  if (!fragment.trace || !fragment.trace.context_requirement_status) return null;
  if (explicitContext && explicitContext.turns && explicitContext.turns.length
      && fragment.trace.context_requirement_status === "context_required") {
    fragment.trace = {
      ...fragment.trace,
      context_requirement_status: "context_incompatible",
      antecedent_status: "incompatible",
      discourse_license_not_observed: true,
      reason: "Explicit context was supplied, but it does not provide the compatible discourse relation required by this typed fragment.",
      not_claims: Array.from(new Set([...(fragment.trace.not_claims || []), "not_fabricated_antecedent"])),
    };
  }
  return fragment;
}

function saturatedCompletionBoundary(structural) {
  if (!Array.isArray(structural) || structural.length !== 1) return null;
  const only = structural[0];
  if (!only || only.kind !== "construction") return null;

  const rows = flattenNodes(structural);
  const tokens = rows.filter((row) => row.kind === "token");
  const constructions = rows.filter((row) => row.kind === "construction");
  const hasOvertSubject = tokens.some((row) => (row.slots || []).includes("subject"));
  const hasOvertObject = tokens.some((row) => {
    const slots = row.slots || [];
    return !slots.includes("subject") && slots.some((slot) => ["object", "theme"].includes(slot));
  });

  if (only.type === "CompletionQuestion") {
    const questionMarker = tokens.find((row) => (row.slots || []).includes("question_marker") || row.surface === "未");
    if (!questionMarker) return null;
    const hasPerfectivePredicate = constructions.some((row) => ["PerfectiveVP", "PostverbalZoPerfectiveVP"].includes(row.type));
    return {
      boundary_type: "completion_question",
      completion_boundary_status: "constructionally_complete",
      activity_domain_status: hasOvertObject
        ? "overt_object"
        : hasPerfectivePredicate
          ? "unspecified_activity_reading_not_syntactic_null_object"
          : "constructionally_complete",
      reason: "A completion/not-yet question is a saturated polar-question construction; an objectless perfective predicate may denote the relevant activity without requiring an external antecedent.",
      not_claims: ["not_context_required", "not_fragment_answer", "not_syntactic_null_object_claim"],
    };
  }

  if (only.type === "ClauseSpan") {
    const perfective = constructions.find((row) => ["PerfectiveVP", "PostverbalZoPerfectiveVP"].includes(row.type));
    const changedStateParticle = tokens.find((row) => row.surface === "喇" && (row.slots || []).includes("particle"));
    if (!hasOvertSubject || !perfective || !changedStateParticle || hasOvertObject) return null;
    return {
      boundary_type: "perfective_changed_state_particle_clause",
      completion_boundary_status: "constructionally_complete",
      activity_domain_status: "unspecified_activity_reading_not_syntactic_null_object",
      particle_contribution: "changed_state_or_current_relevance_assertion",
      reason: "An overt-subject perfective predicate with changed-state particle 喇 forms a complete aspect-plus-particle clause; the activity reading is not treated as a missing syntactic object.",
      not_claims: ["not_context_required", "not_fragment_answer", "not_syntactic_null_object_claim"],
    };
  }

  return null;
}

function opinionContextSupportsMissingSlot(turn, slot) {
  if (!turn || !turn.analysis) return false;
  const rows = flattenNodes(turn.analysis.nodes || []);
  const tokens = rows.filter((row) => row.kind === "token");
  const constructions = rows.filter((row) => row.kind === "construction");
  if (slot === "existential_domain") {
    return tokens.some((row) => {
      const slots = row.slots || [];
      return ["有", "冇", "有冇"].includes(row.surface)
        || slots.includes("existential")
        || slots.includes("negated_existential")
        || slots.includes("existential_question");
    });
  }
  if (slot === "copular_complement") {
    const overtCopularFamily = tokens.some((row) => ["係", "唔係", "係咪"].includes(row.surface) || /(^|\s)(?:copula|negated_copula)(\s|$)/.test(String(row.syntax || "")))
      || constructions.some((row) => ["CopularRelationFrame", "CopularIdentificationFrame", "CopularANotAQuestion"].includes(row.type));
    if (overtCopularFamily) return true;
    // Bare 係/唔係 may anaphorically select an earlier proposition even when
    // that proposition is not itself copular. Require visible predicate/clause
    // structure so an arbitrary isolated noun does not license the ellipsis.
    return constructions.some((row) => {
      const slots = row.slots || [];
      return slots.includes("clause") || slots.includes("clause_like") || slots.includes("predicate") || slots.includes("vp");
    }) || tokens.some((row) => {
      const slots = row.slots || [];
      return slots.some((name) => ["predicate", "modal", "action_verb", "stative_predicate", "seeming_marker"].includes(name));
    });
  }
  return false;
}

function licensedContextOpinionStanceFrame(structural, explicitContext) {
  if (!structural || structural.length !== 1) return null;
  const frame = structural[0];
  if (!frame || frame.kind !== "construction" || frame.type !== "OpinionStanceFrame") return null;
  const trace = frame.trace || {};
  if (trace.context_requirement_status !== "context_required") return null;
  const turns = (explicitContext && explicitContext.turns) || [];
  if (!turns.length) return null;
  const latest = turns[turns.length - 1];
  const missing = Array.isArray(trace.missing_argument_slots) ? trace.missing_argument_slots.slice() : [];
  if (!missing.length || !missing.every((slot) => opinionContextSupportsMissingSlot(latest, slot))) return null;

  const linkedTrace = {
    ...trace,
    context_requirement_status: "context_licensed",
    missing_argument_slots: missing,
    missing_slot_details: missing.map((slot) => ({ slot, license_status: "licensed", licensed_by: latest.id })),
    antecedent_status: "linked",
    discourse_license_not_observed: false,
    context_turn_id: latest.id,
    antecedent_span: latest.source,
    reason: "Explicit preceding discourse contains a compatible existential or copular predicate family, licensing the typed omitted complement without inserting hidden words.",
    not_claims: Array.from(new Set([...(trace.not_claims || []), "not_fabricated_antecedent", "not_context_free_ellipsis"])),
  };
  frame.trace = linkedTrace;

  const visit = (node) => {
    if (!node || node.kind !== "construction") return;
    if (node.type === "ComplementEllipsisFragment" && node.trace && node.trace.context_requirement_status === "context_required") {
      node.trace = {
        ...node.trace,
        context_requirement_status: "context_licensed",
        missing_argument_slots: missing,
        missing_slot_details: missing.map((slot) => ({ slot, license_status: "licensed", licensed_by: latest.id })),
        antecedent_status: "linked",
        discourse_license_not_observed: false,
        context_turn_id: latest.id,
        antecedent_span: latest.source,
      };
    }
    for (const child of node.children || []) visit(child);
  };
  visit(frame);
  return frame;
}


function licensedContextConventionalCognitionStatement(structural, explicitContext) {
  if (!structural || structural.length !== 1) return null;
  const statement = structural[0];
  if (!statement || statement.kind !== "construction" || statement.type !== "CognitionStatementClause") return null;
  const trace = statement.trace || {};
  const statementTokens = flattenNodes([statement]).filter((row) => row.kind === "token");
  const cognitionHead = statementTokens.find((row) => row.surface === "知");
  if (!cognitionHead) return null;
  if (trace.predicate_omission_profile && trace.predicate_omission_profile !== "factive_cognition") return null;
  const turns = (explicitContext && explicitContext.turns) || [];
  if (!turns.length) return null;
  const latest = turns[turns.length - 1];
  const descriptor = questionDescriptorForContextTurn(latest);
  if (!descriptor) return null;
  const questionProfile = descriptor.predicate_omission_profile
    ? PREDICATE_OMISSION_PROFILES.find((profile) => profile.id === descriptor.predicate_omission_profile)
    : predicateOmissionProfileForHead(descriptor.head_surface);
  const responseProfile = PREDICATE_OMISSION_PROFILES.find((profile) => profile.id === "factive_cognition");
  if (!predicateProfilesCompatible(questionProfile, responseProfile)) return null;
  const missing = [responseProfile.missing_slot_type];
  statement.trace = {
    ...trace,
    omission_status: "context_licensed_ellipsis",
    context_requirement_status: "context_licensed",
    missing_argument_slots: missing,
    missing_slot_details: missing.map((slot) => ({ slot, license_status: "licensed", licensed_by: latest.id })),
    antecedent_status: "linked",
    discourse_license_not_observed: false,
    context_turn_id: latest.id,
    question_id: latest.id,
    antecedent_span: descriptor.antecedent_span || latest.source,
    question_match_family: descriptor.question_match_family || "",
    complement_type: responseProfile.complement_type,
    conventionality_status: "conventional_bare_statement_with_context_link",
    reason: "The conventional bare cognition statement remains a CognitionStatementClause, while explicit compatible polar context supplies its proposition/interrogative domain. No content token is inserted.",
    not_claims: Array.from(new Set([...(trace.not_claims || []), "not_fabricated_content_clause", "not_forced_fragment_answer", "not_literal_surface_equality_match"])),
  };
  return statement;
}

function licensedContextStancePredicateAnswer(structural, explicitContext) {
  if (!structural || structural.length !== 1) return null;
  const turns = (explicitContext && explicitContext.turns) || [];
  if (!turns.length) return null;
  const latest = turns[turns.length - 1];
  if (!latest || !latest.analysis) return null;
  const targetRows = flattenNodes(structural);
  const targetTokens = targetRows.filter((row) => row.kind === "token");
  const stance = targetTokens.find((row) => predicateOmissionProfileForHead(row.surface)?.parser_family === "stance");
  if (!stance) return null;
  const stanceProfile = predicateOmissionProfileForHead(stance.surface);
  const stanceIndex = targetTokens.indexOf(stance);
  const targetContent = targetTokens.slice(stanceIndex + 1).find((row) => {
    const slots = row.slots || [];
    return !slots.includes("particle") && row.surface !== "唔" && slots.some((slot) => ["stative_predicate", "predicate", "action_verb"].includes(slot));
  });
  if (!targetContent) return null;

  const questionTokens = tokenRowsForAnalysis(latest.analysis);
  const questionStanceIndex = questionTokens.findIndex((row) => row.surface === stance.surface);
  if (questionStanceIndex < 0) return null;
  let repeated = false;
  for (let i = questionStanceIndex + 1; i < questionTokens.length - 2; i += 1) {
    if (questionTokens[i].surface === targetContent.surface && questionTokens[i + 1].surface === "唔" && questionTokens[i + 2].surface === targetContent.surface) {
      repeated = true;
      break;
    }
  }
  if (!repeated) return null;

  const missing = ["embedded_content_subject_or_topic"];
  return construction("FragmentAnswer", "fragment answer", structural, {
    slots: cleanSlots(["fragment_answer", "answer_fragment", "clause", "subject"]),
    note: "Context-linked stance response with visible stance predicate and selected content alternative.",
    trace: traceInfo("governed_discourse_wrapper", {
      construction_type: "FragmentAnswer",
      fragment_subtype: "stance_predicate_content_answer",
      predicate_omission_profile: stanceProfile.id,
      omission_status: "context_licensed_ellipsis",
      context_requirement_status: "context_licensed",
      missing_argument_slots: missing,
      missing_slot_details: missing.map((slot) => ({ slot, license_status: "licensed", licensed_by: latest.id })),
      complement_type: stanceProfile.complement_type,
      antecedent_status: "linked",
      context_turn_id: latest.id,
      question_id: latest.id,
      antecedent_span: latest.source,
      selected_alternative: targetContent.surface,
      subject_status: "explicit",
      polarity: "positive",
      conventionality_status: "context_linked_response",
      speech_event_use: "not_applicable",
      overt_head: stance.surface,
      not_claims: ["not_fabricated_content_subject", "not_hidden_proposition", "not_literal_sentence_match"],
    }),
  });
}

function quantifiedClassifierEllipsisDescriptor(node) {
  if (!node || node.kind !== "construction" || node.type !== "QuantifiedClassifierNP") return null;
  const trace = node.trace || {};
  if (trace.fragment_subtype !== "quantified_classifier_head_ellipsis") return null;
  const rows = flattenNodes([node]);
  const classifier = rows.find((row) => row.kind === "token" && (row.slots || []).includes("classifier"));
  const quantity = rows.find((row) => row.kind === "token" && (row.slots || []).includes("quantity"));
  if (!classifier || !quantity) return null;
  return {
    classifier_surface: classifier.surface || flattenSurface(classifier),
    quantity_surface: quantity.surface || flattenSurface(quantity),
  };
}

function contextSupportsQuantifiedClassifierFragment(turn, phrase) {
  if (!turn || !turn.analysis) return false;
  const descriptor = quantifiedClassifierEllipsisDescriptor(phrase);
  if (!descriptor || !descriptor.classifier_surface) return false;
  const source = normalizeSurface(turn.source || "");
  if (!source) return false;
  const rows = flattenNodes(turn.analysis.nodes || []);
  const tokens = rows.filter((row) => row.kind === "token");
  const constructions = rows.filter((row) => row.kind === "construction");
  const sameClassifierTokenIndexes = tokens.reduce((indexes, row, index) => {
    const slots = row.slots || [];
    if (row.surface === descriptor.classifier_surface && slots.includes("classifier")) indexes.push(index);
    return indexes;
  }, []);
  const sameClassifierWithFollowingHead = sameClassifierTokenIndexes.some((classifierIndex) =>
    tokens.slice(classifierIndex + 1).some((row) => {
      const slots = row.slots || [];
      return slots.includes("head_noun") || (/noun|_np/.test(String(row.syntax || "")) && ["what", "who", "where"].includes(row.role || row.label));
    })
  );
  const compatibleNpConstruction = constructions.some((row) => [
    "QuantifiedClassifierNP", "OvertHeadDemonstrativeClassifierNP", "ClassifierObjectNP",
    "OrdinalClassifierNP", "WhClassifierQuestion"
  ].includes(row.type) && String(row.surface || "").includes(descriptor.classifier_surface));
  const sameClassifierQuestionCue = source.includes(`幾${descriptor.classifier_surface}`)
    || source.includes(`邊${descriptor.classifier_surface}`)
    || source.includes(`呢${descriptor.classifier_surface}`)
    || source.includes(`嗰${descriptor.classifier_surface}`);
  return sameClassifierQuestionCue || sameClassifierWithFollowingHead || compatibleNpConstruction;
}

function contextualQuantifiedClassifierNPBoundary(structural, explicitContext) {
  if (!structural || structural.length !== 1) return null;
  const phrase = structural[0];
  const descriptor = quantifiedClassifierEllipsisDescriptor(phrase);
  if (!descriptor) return null;
  const turns = (explicitContext && explicitContext.turns) || [];
  if (!turns.length) return phrase;
  const latest = turns[turns.length - 1];
  const missing = Array.isArray(phrase.trace && phrase.trace.missing_argument_slots)
    && phrase.trace.missing_argument_slots.length
    ? phrase.trace.missing_argument_slots.slice()
    : ["nominal_head"];
  if (contextSupportsQuantifiedClassifierFragment(latest, phrase)) {
    phrase.trace = {
      ...(phrase.trace || {}),
      context_requirement_status: "context_licensed",
      missing_argument_slots: missing,
      missing_slot_details: missing.map((slot) => ({ slot, license_status: "licensed", licensed_by: latest.id })),
      antecedent_status: "linked",
      discourse_license_not_observed: false,
      context_turn_id: latest.id,
      antecedent_span: latest.source,
      reason: "The immediately supplied discourse contains a compatible classifier and overt nominal domain, licensing the omitted noun head without inserting a hidden token.",
      not_claims: Array.from(new Set([...(phrase.trace && phrase.trace.not_claims || []), "not_fabricated_nominal_head", "not_context_free_head_recovery"])),
    };
  } else {
    phrase.trace = {
      ...(phrase.trace || {}),
      context_requirement_status: "context_incompatible",
      missing_argument_slots: missing,
      missing_slot_details: missing.map((slot) => ({ slot, license_status: "unresolved" })),
      antecedent_status: "incompatible",
      discourse_license_not_observed: true,
      context_turn_id: latest.id,
      antecedent_span: latest.source,
      reason: "Explicit context was supplied, but it does not provide a compatible classifier/nominal domain for the omitted head.",
      not_claims: Array.from(new Set([...(phrase.trace && phrase.trace.not_claims || []), "not_fabricated_nominal_head", "not_context_free_head_recovery"])),
    };
  }
  return phrase;
}

function conventionalZiDurationDescriptor(structural) {
  if (!Array.isArray(structural) || !structural.length || structural.length > 2) return null;
  const phrase = structural[0];
  if (!phrase || phrase.kind !== "construction" || phrase.type !== "QuantifiedClassifierNP") return null;
  const children = (phrase.children || []).filter((node) => node && node.kind === "token");
  if (children.length !== 3) return null;
  const quantity = children.find((node) => (node.slots || []).includes("quantity"));
  const classifier = children.find((node) => (node.slots || []).includes("classifier"));
  const head = children.find((node) => (node.slots || []).includes("head_noun"));
  if (!quantity || !classifier || !head) return null;
  if (classifier.surface !== "個" || head.surface !== "字") return null;
  const particle = structural.length === 2
    && structural[1]
    && structural[1].kind === "token"
    && (structural[1].slots || []).includes("particle")
    ? structural[1]
    : null;
  if (structural.length === 2 && !particle) return null;
  return { phrase, quantity, classifier, head, particle };
}

function conventionalZiContextDomain(turn) {
  if (!turn) return "";
  const source = normalizeSurface(turn.source || "");
  if (!source) return "";
  const durationCue = /(幾耐|幾多時間|時間|分鐘|鐘頭|點鐘|仲有幾耐|要等|等幾耐|等多|等咗|遲幾耐|早幾耐|車程|路程|先到|先返|先完|先得|過多耐|過幾耐)/.test(source);
  if (durationCue) return "duration";
  const literalCue = /(寫|讀|睇|句|文章|作文|標題|名字|個名|字數|文字|字符|字眼|詞語|單詞|幾多個字|幾個字)/.test(source);
  if (literalCue) return "literal_character_count";
  return "";
}

function conventionalZiDurationConstruction(descriptor, status = {}) {
  const template = {
    type: "QuantifiedTimeNP",
    role_overrides: {
      quantity: {
        label: "how",
        syntax: "quantity count_value numeral",
        slots: ["quantity"],
        note: "Visible numeral inside a conventional Cantonese clock-duration expression."
      },
      classifier: {
        label: "measure_word",
        syntax: "general_classifier classifier time_measure_classifier conventional_duration_measure",
        slots: ["classifier"],
        note: "Visible measure word inside the conventional duration expression."
      },
      time_head: {
        label: "when",
        syntax: "time_head temporal conventional_duration_unit five_minute_increment",
        slots: ["time", "time_head"],
        note: "In Cantonese clock-time expressions, 字 denotes a conventional five-minute interval."
      }
    }
  };
  const assignments = [
    { slot: "quantity", node: descriptor.quantity },
    { slot: "classifier", node: descriptor.classifier },
    { slot: "time_head", node: descriptor.head },
  ];
  if (descriptor.particle) assignments.push({ slot: "particle", node: descriptor.particle });
  const children = applyRoleOverrides(assignments, template);
  const assignedSlots = assignments.map((item) => item.slot);
  const missing = status.missing_argument_slots || ["discourse_relation"];
  const trace = traceInfo("generative_template", {
    construction_type: "QuantifiedTimeNP",
    template_family: "generative_template",
    template: ["quantity!", "classifier!", "time_head!", "particle?"],
    constraints: { conventional_time_head_surface: ["字"], classifier_surface: ["個"] },
    assigned_slots: assignedSlots,
    surfaces: children.map((node) => flattenSurface(node)),
    role_overrides: template.role_overrides,
    subspan: true,
    fragment_subtype: "conventional_clock_duration_fragment",
    ambiguity_set: ["conventional_clock_duration", "literal_character_count"],
    selected_alternative: "conventional_clock_duration",
    conventional_unit_value_minutes: 5,
    context_requirement_status: status.context_requirement_status || "context_required",
    missing_argument_slots: missing,
    missing_slot_details: missing.map((slot) => ({
      slot,
      license_status: status.context_requirement_status === "context_licensed" ? "licensed" : "unresolved",
      ...(status.context_turn_id && status.context_requirement_status === "context_licensed" ? { licensed_by: status.context_turn_id } : {}),
    })),
    antecedent_status: status.antecedent_status || "not_observed",
    discourse_license_not_observed: status.context_requirement_status !== "context_licensed",
    context_turn_id: status.context_turn_id || "",
    antecedent_span: status.antecedent_span || "",
    ambiguity_resolution_status: status.ambiguity_resolution_status || "conventional_default_context_needed",
    reason: status.reason || "The standalone numeral + 個 + 字 sequence selects the conventional Cantonese clock-duration reading by default, while compatible writing/text context may select the literal character-count NP; no minutes token is inserted.",
    not_claims: [
      "not_global_reanalysis_of_zi_as_time",
      "not_literal_character_count_in_this_reading",
      "not_fabricated_minute_token",
      "not_context_free_clause"
    ],
  });
  return construction("QuantifiedTimeNP", "Time", children, {
    slots: ["quantified_time_np", "time", "time_head", "quantity", "classifier", "particle", "np", "topic"],
    note: "Conventional Cantonese clock-duration NP. 字 contributes a five-minute interval only in this resolved construction; the visible tokens remain transparent.",
    trace,
  });
}

function contextualConventionalZiDurationBoundary(structural, explicitContext) {
  const descriptor = conventionalZiDurationDescriptor(structural);
  if (!descriptor) return null;
  const turns = (explicitContext && explicitContext.turns) || [];
  const latest = turns.length ? turns[turns.length - 1] : null;
  const domain = conventionalZiContextDomain(latest);

  if (domain === "literal_character_count") {
    const phrase = descriptor.phrase;
    phrase.trace = {
      ...(phrase.trace || {}),
      ambiguity_set: ["conventional_clock_duration", "literal_character_count"],
      selected_alternative: "literal_character_count",
      ambiguity_resolution_status: "context_resolved_literal",
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      missing_slot_details: [],
      antecedent_status: "not_applicable",
      discourse_license_not_observed: false,
      context_turn_id: latest && latest.id || "",
      antecedent_span: latest && latest.source || "",
      reason: "Compatible writing/text discourse selects the ordinary literal character-count QuantifiedClassifierNP; 字 remains a visible noun head and is not reanalysed as a time unit.",
      not_claims: Array.from(new Set([...(phrase.trace && phrase.trace.not_claims || []), "not_conventional_duration_reading", "not_hidden_time_unit"])),
    };
    return { nodes: structural, resolution: phrase.trace };
  }

  if (domain === "duration") {
    const time = conventionalZiDurationConstruction(descriptor, {
      context_requirement_status: "context_licensed",
      antecedent_status: "linked",
      context_turn_id: latest.id,
      antecedent_span: latest.source,
      ambiguity_resolution_status: "context_resolved_duration",
      reason: "Compatible duration/time discourse selects the conventional Cantonese clock-duration reading; each 字 denotes a five-minute interval without inserting an invisible 分鐘 token.",
    });
    return { nodes: [time], resolution: time.trace };
  }

  if (latest) {
    const time = conventionalZiDurationConstruction(descriptor, {
      context_requirement_status: "context_incompatible",
      antecedent_status: "incompatible",
      context_turn_id: latest.id,
      antecedent_span: latest.source,
      ambiguity_resolution_status: "context_incompatible_conventional_default",
      reason: "Explicit context was supplied, but it contains neither a duration/time cue nor a writing/text cue. The conventional duration candidate remains typed but unlicensed by that discourse.",
    });
    return { nodes: [time], resolution: time.trace };
  }

  const time = conventionalZiDurationConstruction(descriptor);
  return { nodes: [time], resolution: time.trace };
}

function contextSupportsQuantifiedTimeFragment(turn) {
  if (!turn || !turn.analysis) return false;
  const source = normalizeSurface(turn.source || "");
  if (!source) return false;
  const rows = flattenNodes(turn.analysis.nodes || []);
  const tokens = rows.filter((row) => row.kind === "token");
  const constructions = rows.filter((row) => row.kind === "construction");
  const hasTimeMaterial = tokens.some((row) => {
    const slots = row.slots || [];
    return slots.includes("time") || slots.includes("time_head") || slots.includes("temporal_modifier");
  });
  const hasTimeConstruction = constructions.some((row) => [
    "QuantifiedTimeNP", "TimeNP", "TemporalClause", "ScalarValueQuestion"
  ].includes(row.type));
  const durationOrRateCue = /(幾耐|幾多(?:年|月|日)|時間|年|月|日|禮拜|星期|半年|人工|月薪|年薪|萬|蚊|錢|價|好未)/.test(source);
  return hasTimeMaterial || hasTimeConstruction || durationOrRateCue;
}

function licensedContextQuantifiedTimeNP(structural, explicitContext) {
  if (!explicitContext || !explicitContext.turns || !explicitContext.turns.length) return null;
  if (structural.length !== 1 || structural[0].kind !== "construction" || structural[0].type !== "QuantifiedTimeNP") return null;
  const phrase = structural[0];
  const trace = phrase.trace || {};
  if (trace.context_requirement_status !== "context_required") return null;
  const latestTurn = explicitContext.turns[explicitContext.turns.length - 1];
  if (!latestTurn || !normalizeSurface(latestTurn.source) || !contextSupportsQuantifiedTimeFragment(latestTurn)) return null;
  const missing = Array.isArray(trace.missing_argument_slots) && trace.missing_argument_slots.length
    ? trace.missing_argument_slots.slice()
    : ["discourse_relation"];
  phrase.trace = {
    ...trace,
    context_requirement_status: "context_licensed",
    missing_argument_slots: missing,
    missing_slot_details: missing.map((slot) => ({ slot, license_status: "licensed", licensed_by: latestTurn.id })),
    antecedent_status: "linked",
    discourse_license_not_observed: false,
    context_turn_id: latestTurn.id,
    antecedent_span: latestTurn.source,
    reason: "A complete quantified time NP can stand as a fragment answer or duration/time specification when the immediately supplied discourse contains a compatible time, duration, quantity, or rate domain; no hidden clause or time unit is fabricated.",
    not_claims: Array.from(new Set([...(trace.not_claims || []), "not_fabricated_clause", "not_context_free_clause"])),
  };
  return phrase;
}

function sentenceContextGroups(nodes = []) {
  const groups = [];
  let current = [];
  for (const node of nodes || []) {
    current.push(node);
    if (node && node.kind === "text" && hasSentencePunctuation(node.text)) {
      if (withoutIgnorableSpaceText(current).length) groups.push(current);
      current = [];
    }
  }
  if (withoutIgnorableSpaceText(current).length) groups.push(current);
  return groups;
}

function applyExplicitContextContract(nodes, explicitContext) {
  const sentenceGroups = sentenceContextGroups(nodes || []);
  if (sentenceGroups.length > 1) {
    const noCrossSentenceContext = { turns: [], public: { supplied: false, turns: [] } };
    const applied = sentenceGroups.map((group) => applyExplicitContextContract(group, noCrossSentenceContext));
    const resolutions = applied.map((item) => item.resolution).filter(Boolean);
    const unresolved = resolutions.find((trace) => ["context_required", "context_incompatible"].includes(trace.context_requirement_status));
    return {
      nodes: applied.flatMap((item) => item.nodes || []),
      resolution: unresolved || resolutions[resolutions.length - 1] || null,
    };
  }
  const { structural, terminal } = splitTerminalContextNodes(nodes || []);
  if (!structural.length) return { nodes, resolution: null };
  const completionBoundary = saturatedCompletionBoundary(structural);
  if (completionBoundary) {
    const top = structural[0];
    top.trace = {
      ...(top.trace || {}),
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      antecedent_status: "not_applicable",
      completion_boundary_status: completionBoundary.completion_boundary_status,
      completion_boundary_type: completionBoundary.boundary_type,
      activity_domain_status: completionBoundary.activity_domain_status,
      ...(completionBoundary.particle_contribution ? { particle_contribution: completionBoundary.particle_contribution } : {}),
      completion_boundary_reason: completionBoundary.reason,
      not_claims: Array.from(new Set([...(top.trace && top.trace.not_claims || []), ...completionBoundary.not_claims])),
    };
    return { nodes: [...structural, ...terminal], resolution: null };
  }
  const licensedQuestionFragment = licensedContextFragmentQuestion(structural, explicitContext);
  if (licensedQuestionFragment) {
    return { nodes: [licensedQuestionFragment, ...terminal], resolution: licensedQuestionFragment.trace };
  }
  const licensedNegatedExistentialFragment = licensedContextNegatedExistentialFragment(structural, explicitContext);
  if (licensedNegatedExistentialFragment) {
    return { nodes: [licensedNegatedExistentialFragment, ...terminal], resolution: licensedNegatedExistentialFragment.trace };
  }
  const contextualPositiveExistentialRepetition = contextualPositiveExistentialAcknowledgementRepetition(structural, explicitContext);
  if (contextualPositiveExistentialRepetition) {
    return { nodes: [contextualPositiveExistentialRepetition, ...terminal], resolution: contextualPositiveExistentialRepetition.trace };
  }
  const typedFragmentBoundary = typedContextDependentFragmentBoundary(structural, explicitContext);
  if (typedFragmentBoundary) {
    return { nodes: [typedFragmentBoundary, ...terminal], resolution: typedFragmentBoundary.trace };
  }
  const licensedEllipticalExistentialQuestion = licensedContextEllipticalExistentialQuestion(structural, explicitContext);
  if (licensedEllipticalExistentialQuestion) {
    return { nodes: [licensedEllipticalExistentialQuestion, ...terminal], resolution: licensedEllipticalExistentialQuestion.trace };
  }
  const licensedHaveOrNotEventQuestion = licensedContextHaveOrNotEventQuestion(structural, explicitContext);
  if (licensedHaveOrNotEventQuestion) {
    return { nodes: [licensedHaveOrNotEventQuestion, ...terminal], resolution: licensedHaveOrNotEventQuestion.trace };
  }
  const licensedConventionalCognition = licensedContextConventionalCognitionStatement(structural, explicitContext);
  if (licensedConventionalCognition) {
    return { nodes: [licensedConventionalCognition, ...terminal], resolution: licensedConventionalCognition.trace };
  }
  const licensedStanceAnswer = licensedContextStancePredicateAnswer(structural, explicitContext);
  if (licensedStanceAnswer) {
    return { nodes: [licensedStanceAnswer, ...terminal], resolution: licensedStanceAnswer.trace };
  }
  const licensedOpinionStance = licensedContextOpinionStanceFrame(structural, explicitContext);
  if (licensedOpinionStance) {
    return { nodes: [licensedOpinionStance, ...terminal], resolution: licensedOpinionStance.trace };
  }
  const conventionalZiDurationBoundary = contextualConventionalZiDurationBoundary(structural, explicitContext);
  if (conventionalZiDurationBoundary) {
    return {
      nodes: [...conventionalZiDurationBoundary.nodes, ...terminal],
      resolution: conventionalZiDurationBoundary.resolution,
    };
  }
  const quantifiedClassifierBoundary = contextualQuantifiedClassifierNPBoundary(structural, explicitContext);
  if (quantifiedClassifierBoundary) {
    return { nodes: [quantifiedClassifierBoundary, ...terminal], resolution: quantifiedClassifierBoundary.trace };
  }
  const licensedQuantifiedTime = licensedContextQuantifiedTimeNP(structural, explicitContext);
  if (licensedQuantifiedTime) {
    return { nodes: [licensedQuantifiedTime, ...terminal], resolution: licensedQuantifiedTime.trace };
  }
  const target = targetDescriptorForContext(structural);
  const only = structural.length === 1 && structural[0].kind === "construction" ? structural[0] : null;
  if (only && only.type === "ClauseRelationGraph" && only.trace && only.trace.topic_chain_status) {
    return { nodes: [...structural, ...terminal], resolution: only.trace };
  }
  const targetTokens = flattenNodes(structural).filter((row) => row.kind === "token");
  const targetHasOvertObject = targetTokens.some((row) => {
    const slots = row.slots || [];
    return !slots.includes("subject") && slots.some((slot) => ["object", "theme", "head_noun"].includes(slot));
  });
  const targetNeedsObjectDomain = Boolean(target && (target.missing_argument_slots || []).some((slot) => slot.includes("object") || slot.includes("domain")));
  const unsaturatedPerfective = only
    && target
    && target.has_perfective_structure
    && (targetNeedsObjectDomain || target.subject_status !== "explicit")
    && !targetHasOvertObject;
  if (unsaturatedPerfective) {
    target.missing_argument_slots = Array.from(new Set([
      ...(target.missing_argument_slots || []),
      ...(target.subject_status === "explicit" ? [] : ["subject"]),
    ]));
  }
  const ineligibleMultiSpan = structural.some((node) => node.kind === "text" && hasSentencePunctuation(node.text))
    || (only && ["ClauseSequence", "ClauseRelationGraph"].includes(only.type));
  const contextMatch = ineligibleMultiSpan
    ? { descriptor: null, supplied: (explicitContext.turns || []).length > 0, sawQuestion: false }
    : compatibleContextQuestion(target, explicitContext.turns || []);

  if (target && contextMatch.descriptor && contextMatch.descriptor.question_domain_surface && !target.has_overt_object) {
    if (target.predicate_family === "action") {
      target.missing_argument_slots = Array.from(new Set([...(target.missing_argument_slots || []), "object_or_activity_domain"]));
    }
  }
  if (target && contextMatch.descriptor && target.subject_status !== "explicit" && target.predicate_family !== "stative") {
    target.missing_argument_slots = Array.from(new Set([...(target.missing_argument_slots || []), "subject"]));
  }

  if (target && target.missing_argument_slots.length && contextMatch.descriptor) {
    const fragment = licensedFragmentAnswer(structural, target, contextMatch.descriptor);
    return {
      nodes: [fragment, ...terminal],
      resolution: fragment.trace,
    };
  }

  const trace = only && only.trace ? only.trace : {};
  const traceRequiresContext = trace.context_requirement_status === "context_required";
  const shouldWrapExisting = traceRequiresContext
    && only
    && only.type !== "NeedsContext";
  const shouldWrapPerfective = Boolean(unsaturatedPerfective);

  if (shouldWrapExisting || shouldWrapPerfective) {
    const missing = traceRequiresContext ? trace.missing_argument_slots : target.missing_argument_slots;
    const status = contextMatch.supplied ? "context_incompatible" : "context_required";
    const wrapper = needsContextAroundExisting(structural, {
      context_requirement_status: status,
      missing_argument_slots: missing || [],
      antecedent_status: contextMatch.supplied ? "incompatible" : "not_observed",
      discourse_license_not_observed: true,
      overt_head: trace.overt_head !== undefined ? trace.overt_head : (target && target.legacy_context_metadata_active ? target.head_surface : null),
      subject_status: trace.subject_status !== undefined ? trace.subject_status : (target && target.legacy_context_metadata_active ? target.subject_status : null),
      particle_contribution: trace.particle_contribution !== undefined ? trace.particle_contribution : (target && target.legacy_context_metadata_active ? target.particle_contribution : null),
      aspect: trace.aspect !== undefined ? trace.aspect : (target && target.legacy_context_metadata_active ? target.aspect : null),
      embedded_construction: only.type,
      reason: contextMatch.supplied
        ? "Explicit context was supplied, but it does not contain a compatible question/antecedent for the target's missing slots."
        : "The internal construction is valid, but its omitted argument/domain requires explicit compatible context.",
      not_claims: ["not_fabricated_antecedent", "not_clean_context_free_clause"],
    });
    return { nodes: [wrapper, ...terminal], resolution: wrapper.trace };
  }

  if (only && only.type === "NeedsContext" && contextMatch.supplied && !contextMatch.descriptor) {
    only.trace = contextRequiredTrace({
      ...(only.trace || {}),
      context_requirement_status: "context_incompatible",
      antecedent_status: "incompatible",
      discourse_license_not_observed: true,
      reason: "Explicit context was supplied, but it does not license the target's typed missing slot.",
    });
    return { nodes: [...structural, ...terminal], resolution: only.trace };
  }

  return {
    nodes: [...structural, ...terminal],
    resolution: only && only.trace && only.trace.context_requirement_status ? only.trace : null,
  };
}

function analyzeLine(source, explicitContextInput = null) {
  const warnings = [];
  const explicitContext = analyzedExplicitContext(explicitContextInput);
  const input_normalization = normalizeInputForParser(source);
  const parserSource = input_normalization.parser_shadow_source;
  const normalized = normalizeSurface(parserSource);
  if (normalized === "唔好食") {
    warnings.push("Needs context: 唔好食 can mean 唔 + 好食 = not tasty, or 唔好 + 食 = don't eat.");
  }
  const tokens = annotateRawDisplaySurfaces(tokenizeLine(parserSource), source, parserSource);
  const initialNodes = annotateRawDisplaySurfaces(applyConstructionPatternsByPunctuation(tokens), source, parserSource);
  const contextApplied = applyExplicitContextContract(initialNodes, explicitContext);
  const nodes = annotateRawDisplaySurfaces(contextApplied.nodes, source, parserSource);
  return {
    source,
    parser_shadow_source: parserSource,
    input_normalization,
    normalization_trace: input_normalization.normalization_trace,
    normalization_review_suggestions: input_normalization.review_suggestions,
    warnings,
    tokens,
    nodes,
    explicit_context: explicitContext.public,
    context_resolution: contextApplied.resolution,
    diagnostics: true,
  };
}

function flattenNodes(nodes) {
  const out = [];
  const visit = (node, depth = 0, parent = "", parentCompatibilityAlias = "") => {
    if (!node) return;
    if (node.kind === "text") {
      out.push({ kind: "text", surface: node.text, display_surface: node.display_text || node.text, parser_surface: node.text, depth, parent, parent_compatibility_alias: parentCompatibilityAlias, trace: node.trace || {} });
      return;
    }
    if (node.kind === "token") {
      out.push({
        kind: "token",
        surface: node.surface,
        display_surface: node.display_surface || node.surface,
        parser_surface: node.parser_surface || node.surface,
        depth,
        parent,
        parent_compatibility_alias: parentCompatibilityAlias,
        role: node.label,
        syntax: node.syntax,
        slots: node.slots || [],
        jyutping: node.jyutping || "",
        features: node.features || {},
        feature_bundle: node.feature_bundle || (node.trace && node.trace.feature_bundle) || undefined,
        trace: node.trace || {},
      });
      return;
    }
    if (node.kind === "construction") {
      out.push({
        kind: "construction",
        surface: flattenSurface(node),
        display_surface: flattenDisplaySurface(node),
        parser_surface: flattenSurface(node),
        depth,
        parent,
        parent_compatibility_alias: parentCompatibilityAlias,
        type: node.type,
        compatibility_alias: node.compatibility_alias || "",
        internal_representation_scope: node.internal_representation_scope || "",
        internal_only: Boolean(node.internal_only),
        label: node.label,
        slots: node.slots || [],
        trace: node.trace || {},
      });
      for (const child of node.children || []) visit(child, depth + 1, node.type, node.compatibility_alias || INTERNAL_CONSTRUCTION_COMPATIBILITY_ALIASES[node.type] || "");
    }
  };
  for (const node of nodes || []) visit(node, 0, "");
  return out;
}

function traceCounts(rows) {
  const counts = {};
  for (const row of rows) {
    const kind = row.trace && row.trace.kind ? row.trace.kind : "unspecified";
    counts[kind] = (counts[kind] || 0) + 1;
  }
  return counts;
}

function templateFamilyCounts(rows) {
  const counts = {};
  for (const row of rows) {
    const family = row.trace && row.trace.template_family ? row.trace.template_family : "";
    if (!family) continue;
    counts[family] = (counts[family] || 0) + 1;
  }
  return counts;
}

function diagnosticLevel(kind) {
  if (kind === "generative_template") return "good";
  if (kind === "atomic_lexicon" || kind === "unknown_atomic") return "info";
  if (kind === "generative_or_heuristic_slot_rule" || kind === "predicate_heuristic") return "ok";
  if (kind === "governed_discourse_wrapper") return "allowed";
  if (kind === "protected_formula_table") return "allowed";
  if (kind === "surface_specific_phrase_rule" || kind === "legacy_surface_rule" || kind === "special_ambiguity_rule") return "review";
  return "info";
}



function labelTransitionTracePolicy(row) {
  const trace = row && row.trace ? row.trace : {};
  const kind = trace.kind || "unspecified";
  if (kind === "generative_template" && trace.template_family === "construction_template") {
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
  return LABEL_TRANSITION_KIND_POLICY[kind] || {
    bucket: "unclassified_trace_kind",
    status: "needs_registry_decision",
    priority: 5,
    action: "Classify this trace kind in the label-transition audit policy before promoting it.",
  };
}

function wrapperCoverageAuditRows(analysis) {
  const rows = [];
  const visit = (node, depth = 0, parent = "") => {
    if (!node) return;
    if (node.kind === "construction") {
      const trace = node.trace || {};
      const coverage = wrapperCoverageForConstructionNode(node);
      if (coverage) {
        const row = {
          surface: flattenSurface(node),
          construction: node.type,
          label: node.label,
          depth,
          parent,
          trace_kind: trace.kind || "unspecified",
          coverage_kind: coverage.coverage_kind || (node.type === "ClauseRelationGraph" ? "clause_linking_wrapper" : "assigned_slot_wrapper"),
          status: coverage.status || "PASS",
          policy: coverage.policy || "Wrapper coverage must explicitly account for every direct item inside the wrapper.",
          unaccounted_tokens: coverage.unaccounted_tokens || [],
          unaccounted_wrapper_token_count: coverage.unaccounted_wrapper_token_count || 0,
        };
        if (coverage.accounted_children) row.accounted_children = coverage.accounted_children;
        if (coverage.accounted_linkers) row.accounted_linkers = coverage.accounted_linkers;
        if (coverage.accounted_separators) row.accounted_separators = coverage.accounted_separators;
        if (coverage.accounted_parts) row.accounted_parts = coverage.accounted_parts;
        rows.push(row);
      }
      for (const child of node.children || []) visit(child, depth + 1, node.type);
    }
  };
  for (const node of analysis.nodes || []) visit(node, 0, "");
  return rows;
}

function wrapperCoverageAuditSummary(analysis) {
  const rows = wrapperCoverageAuditRows(analysis);
  const unaccountedWrapperTokenCount = rows.reduce((sum, row) => sum + (row.unaccounted_wrapper_token_count || 0), 0);
  const warningRows = rows.filter((row) => row.status === "WARN" || (row.unaccounted_wrapper_token_count || 0) > 0);
  return {
    status: warningRows.length ? "WARN" : "PASS",
    policy: "Wrapper coverage audit: ClauseRelationGraph must expose child/linker/separator coverage, and ModalANotAQuestion must expose direct assigned-slot coverage before it may be visually collapsed.",
    wrapper_row_count: rows.length,
    unaccounted_wrapper_token_count: unaccountedWrapperTokenCount,
    warning_rows: warningRows,
  };
}

function labelTransitionAuditRows(analysis) {
  const finalRows = flattenNodes(analysis.nodes).filter((row) => row.kind === "construction");
  return finalRows.map((row) => {
    const trace = row.trace || {};
    const policy = labelTransitionTracePolicy(row);
    const detail = {
      surface: row.surface,
      construction: row.type,
      label: row.label,
      depth: row.depth,
      parent: row.parent,
      trace_kind: trace.kind || "unspecified",
      template_family: trace.template_family || "",
      transition_bucket: policy.bucket,
      transition_status: policy.status,
      transition_priority: policy.priority,
      recommended_action: policy.action,
    };
    if (trace.rule) detail.rule = trace.rule;
    if (trace.reason) detail.reason = trace.reason;
    if (trace.surface) detail.trace_surface = trace.surface;
    if (trace.construction_type) detail.trace_construction_type = trace.construction_type;
    if (Array.isArray(trace.template)) detail.template = trace.template;
    if (trace.constraints && Object.keys(trace.constraints).length) detail.constraints = trace.constraints;
    if (Array.isArray(trace.assigned_slots)) detail.assigned_slots = trace.assigned_slots;
    if (trace.wrapper_coverage) detail.wrapper_coverage = trace.wrapper_coverage;
    return detail;
  });
}

function labelTransitionAuditSummary(analysis) {
  const rows = labelTransitionAuditRows(analysis);
  const countByBucket = {};
  const countByStatus = {};
  for (const row of rows) {
    countByBucket[row.transition_bucket] = (countByBucket[row.transition_bucket] || 0) + 1;
    countByStatus[row.transition_status] = (countByStatus[row.transition_status] || 0) + 1;
  }
  const migrationStatuses = new Set(["migration_candidate", "transition_trace"]);
  const migrationCandidates = rows
    .filter((row) => migrationStatuses.has(row.transition_status))
    .sort((a, b) => a.transition_priority - b.transition_priority || String(a.construction).localeCompare(String(b.construction)));
  const unknownRows = rows.filter((row) => row.transition_status === "needs_registry_decision");
  return {
    status: unknownRows.length ? "WARN" : "PASS",
    policy: "Diagnostic inventory for transitioning remaining construction labels/rules toward governed generative templates or accepted structural wrappers. PASS means every construction trace was classified; migration candidates may still remain.",
    construction_row_count: rows.length,
    already_generative_count: countByStatus.already_generative || 0,
    migration_candidate_count: migrationCandidates.length,
    reviewed_table_or_guardrail_count: (countByStatus.reviewed_table || 0) + (countByStatus.review_guardrail || 0) + (countByStatus.intentionally_opaque || 0) + (countByStatus.accepted_structural_wrapper || 0),
    needs_registry_decision_count: unknownRows.length,
    transition_bucket_counts: countByBucket,
    transition_status_counts: countByStatus,
    recommended_next_promotions: migrationCandidates.slice(0, 10),
    unclassified_trace_rows: unknownRows,
  };
}

function runtimeConstructionRegistryAuditRows(analysis) {
  return flattenNodes(analysis.nodes)
    .filter((row) => row.kind === "construction")
    .map((row) => ({
      surface: row.surface || flattenSurface(row),
      construction: row.type || "",
      label: row.label || "",
      depth: row.depth || 0,
      parent: row.parent || "",
      ...runtimeConstructionStateFor(row.type),
    }));
}

function runtimeConstructionRegistryAuditSummary(analysis) {
  const rows = runtimeConstructionRegistryAuditRows(analysis);
  const unregisteredRows = rows.filter((row) => row.registry_missing || !row.active);
  return {
    status: unregisteredRows.length ? "FAIL" : "PASS",
    registry_version: RUNTIME_CONSTRUCTION_REGISTRY_VERSION,
    policy: "Runtime audit only: every emitted construction label must be present in the active label registry. Linguistic status and evidence are validated from grammar/<linguistic-status>/*.md outside the plugin.",
    construction_row_count: rows.length,
    unique_construction_count: new Set(rows.map((row) => row.construction)).size,
    active_row_count: rows.length - unregisteredRows.length,
    unregistered_row_count: unregisteredRows.length,
    unregistered_rows: unregisteredRows,
  };
}

function nonPassRuntimeConstructionRegistryRows(analysis) {
  return runtimeConstructionRegistryAuditRows(analysis).filter((row) => row.registry_missing || !row.active);
}

function topChildConstructionsForDiagnostic(constructionRows) {
  const internalTopConstructions = constructionRows.filter((row) => row.depth === 0).map((row) => row.type);
  if (!internalTopConstructions.includes("ClauseSequence") && !internalTopConstructions.includes("ClauseRelationGraph")) return [];
  return constructionRows
    .filter((row) => row.depth === 1 && (row.parent === "ClauseSequence" || row.parent === "ClauseRelationGraph"))
    .map((row) => diagnosticCompatibilityConstructionType(row.type))
    .filter(Boolean);
}

function isIgnorableRootRemainderForDiagnostic(row) {
  if (!row) return true;
  if (row.kind === "text") {
    const surface = String(row.surface || row.text || "");
    return !surface.trim() || /^[\p{P}\p{S}\s]+$/u.test(surface);
  }
  if (row.kind !== "token") return false;
  const role = String(row.role || row.label || "");
  const syntax = String(row.syntax || "");
  return role === "particle"
    || /(^|\s)(?:sentence_final_(?:question_)?particle|discourse_particle|clause_final_particle)(\s|$)/.test(syntax);
}

function rootSpanCoverageForDiagnostic(finalRows) {
  const topLevelRows = (finalRows || []).filter((row) => row.depth === 0);
  const topLevelParticleRows = topLevelRows.filter((row) => {
    if (!row || row.kind !== "token") return false;
    const role = String(row.role || row.label || "");
    const syntax = String(row.syntax || "");
    return role === "particle"
      || /(^|\s)(?:sentence_final_(?:question_)?particle|discourse_particle|clause_final_particle)(\s|$)/.test(syntax);
  });
  const hasUnlicensedTopLevelParticleCluster = topLevelParticleRows.length >= 2;
  const meaningfulRows = topLevelRows.filter((row) => {
    if (hasUnlicensedTopLevelParticleCluster && topLevelParticleRows.includes(row)) return true;
    return !isIgnorableRootRemainderForDiagnostic(row);
  });
  const constructionRows = meaningfulRows.filter((row) => row.kind === "construction");
  const unwrappedRows = meaningfulRows.filter((row) => row.kind !== "construction");
  let status = "PASS";
  if (!constructionRows.length && unwrappedRows.length) status = "NO_TOP_CONSTRUCTION";
  else if (constructionRows.length && unwrappedRows.length) status = "PARTIAL";
  else if (constructionRows.length > 1) status = "MULTIPLE_ROOT_CONSTRUCTIONS";
  return {
    status,
    top_construction_count: constructionRows.length,
    top_construction_surfaces: constructionRows.map((row) => row.surface || ""),
    unwrapped_root_nonpunctuation_count: unwrappedRows.length,
    unwrapped_root_surfaces: unwrappedRows.map((row) => row.surface || row.text || ""),
    ignored_root_remainder_count: topLevelRows.length - meaningfulRows.length,
  };
}

function rootSpanCoverageFieldsFromDiagnosticSummary(summary) {
  const source = summary || {};
  return {
    root_span_coverage_status: source.root_span_coverage_status || "PASS",
    root_top_construction_count: source.root_top_construction_count || 0,
    root_top_construction_surfaces: source.root_top_construction_surfaces || [],
    unwrapped_root_nonpunctuation_count: source.unwrapped_root_nonpunctuation_count || 0,
    unwrapped_root_surfaces: source.unwrapped_root_surfaces || [],
    ignored_root_remainder_count: source.ignored_root_remainder_count || 0,
  };
}

function rootSpanCoverageObjectFromDiagnosticSummary(summary) {
  const fields = rootSpanCoverageFieldsFromDiagnosticSummary(summary);
  return {
    status: fields.root_span_coverage_status,
    top_construction_count: fields.root_top_construction_count,
    top_construction_surfaces: fields.root_top_construction_surfaces,
    unwrapped_root_nonpunctuation_count: fields.unwrapped_root_nonpunctuation_count,
    unwrapped_root_surfaces: fields.unwrapped_root_surfaces,
    ignored_root_remainder_count: fields.ignored_root_remainder_count,
  };
}


const CP018_RETIRED_CONSTRUCTION_TYPES = new Set([
  "ComitativeActionMotionVP",
  "ActionSourceFocusClause",
  "GoalDirectedActionPredicate",
  "ModalGoalBenefactivePurposeClause",
  "UseForPurposeFrame",
  "UseForPurposeVP",
  "UseForPurposePredicate",
]);

const CP018_DEBUNKED_SEMANTIC_CLAIM_TYPES = new Set([
  "RecipientFrame",
  "TransferDitransitiveVP",
  "AffectednessFrame",
]);

const CP018_FRAGMENT_CONSTRUCTION_TYPES = new Set([
  "ComplementEllipsisFragment",
  "FragmentAnswer",
  "FragmentQuestion",
  "NegativeCognitionFragment",
  "NegatedExistentialFragment",
]);

const CP018_RELATION_SENSITIVE_MARKERS = new Set(["用", "畀", "俾", "同", "陪", "跟", "喺", "由", "對"]);

function semanticGuardComparisonSurface(value) {
  return String(value || "")
    .replace(/[\s\u3000。！？?!，,、；;：:…—－（）()「」『』《》〈〉“”‘’"']/gu, "");
}

function semanticGuardNodePath(path, node) {
  const surface = flattenSurface(node);
  const label = node && node.kind === "construction" ? node.type : (node && node.kind === "token" ? node.surface : node && node.kind);
  return [...path, `${label || "node"}${surface ? `[${surface}]` : ""}`];
}

function semanticGuardUnknownToken(node) {
  if (!node || node.kind !== "token") return false;
  const traceKind = node.trace && node.trace.kind || "";
  const syntax = String(node.syntax || "");
  const review = String(node.review || "");
  return traceKind === "unknown_atomic"
    || /(^|[ _-])unknown([ _-]|$)/i.test(syntax)
    || /unknown_cjk_or_text/i.test(syntax)
    || /unknown/i.test(review);
}

function semanticGuardTypedCoverbProvenance(node) {
  const trace = node && node.trace || {};
  return Boolean(trace.coverb_subtype || trace.relation_subtype || trace.typed_relation || trace.relation_provenance);
}

function semanticGuardGenericRelationMarker(node) {
  if (!node || node.kind !== "construction" || node.type !== "TransitiveVP") return "";
  const first = (node.children || [])[0];
  const surface = flattenSurface(first);
  for (const marker of CP018_RELATION_SENSITIVE_MARKERS) {
    if (surface === marker || surface.startsWith(marker)) return marker;
  }
  return "";
}

function semanticGuardLeafTokens(nodes) {
  const leaves = [];
  const walkLeaves = (node) => {
    if (!node) return;
    if (node.kind === "token") {
      leaves.push(node);
      return;
    }
    if (node.kind === "construction") {
      for (const child of node.children || []) walkLeaves(child);
    }
  };
  for (const node of nodes || []) walkLeaves(node);
  return leaves;
}

function semanticAcceptanceGuardForAnalysis(analysis, finalRows) {
  const blockers = [];
  const reviewReasons = [];
  const seenBlockers = new Set();
  const seenReviews = new Set();
  const contextResolution = analysis && analysis.context_resolution || {};
  const explicitContext = analysis && analysis.explicit_context || { supplied: false };

  const addBlocker = (code, node, path, detail = {}) => {
    const key = `${code}|${(path || []).join(" > ")}|${detail.surface || ""}`;
    if (seenBlockers.has(key)) return;
    seenBlockers.add(key);
    blockers.push({
      code,
      path: (path || []).join(" > "),
      construction: node && node.kind === "construction" ? node.type : "",
      surface: node ? flattenSurface(node) : "",
      depth: Math.max(0, (path || []).length - 1),
      ...detail,
    });
  };
  const addReview = (code, node, path, detail = {}) => {
    const key = `${code}|${(path || []).join(" > ")}|${detail.surface || ""}`;
    if (seenReviews.has(key)) return;
    seenReviews.add(key);
    reviewReasons.push({
      code,
      path: (path || []).join(" > "),
      construction: node && node.kind === "construction" ? node.type : "",
      surface: node ? flattenSurface(node) : "",
      depth: Math.max(0, (path || []).length - 1),
      ...detail,
    });
  };

  const walk = (node, path = []) => {
    if (!node) return;
    const nextPath = semanticGuardNodePath(path, node);
    if (node.kind === "token") {
      if (semanticGuardUnknownToken(node)) {
        addBlocker("unknown_lexical_material", node, nextPath, {
          syntax: node.syntax || "",
          trace_kind: node.trace && node.trace.kind || "",
        });
      } else if (/(^|\s)borrowed_verb(\s|$)/.test(String(node.syntax || ""))) {
        addReview("borrowed_or_code_switched_predicate_requires_manual_review", node, nextPath, {
          syntax: node.syntax || "",
        });
      }
      return;
    }
    if (node.kind !== "construction") return;

    if (CP018_RETIRED_CONSTRUCTION_TYPES.has(node.type)) {
      addBlocker("retired_construction_reachable", node, nextPath);
    }
    if (CP018_DEBUNKED_SEMANTIC_CLAIM_TYPES.has(node.type)) {
      addBlocker("debunked_language_claim_in_parse", node, nextPath, {
        disposition: "scheduled_for_narrow_replacement_or_retirement",
      });
    }
    if (node.type === "LexicalGiveRelation") {
      const profile = node.trace && node.trace.relation_profile || "";
      addReview(profile === "theme_recipient_baseline"
        ? "cp021b_provisional_lexical_give_relation"
        : "lexical_give_argument_order_unresolved", node, nextPath, {
        relation_profile: profile,
        evidence_basis: "CP021B-PD1 frozen lexical-GIVE design",
      });
    }
    if (node.type === "PostThemeParticipantRelation") {
      addReview("post_theme_participant_role_context_dependent", node, nextPath, {
        upstream_predicate_profile: node.trace && node.trace.upstream_predicate_profile || "",
        evidence_basis: "CP021B-PD1 frozen post-theme participant design",
      });
    }
    if (node.type === "CoverbFrame") {
      if (semanticGuardTypedCoverbProvenance(node)) {
        addReview("internal_coverb_umbrella_requires_relation_review", node, nextPath, {
          relation_subtype: node.trace && (node.trace.coverb_subtype || node.trace.relation_subtype) || "",
        });
      } else {
        addBlocker("coverb_frame_missing_typed_relation_provenance", node, nextPath);
      }
    }
    if (node.type === "NeedsContext") addBlocker("needs_context_construction", node, nextPath);
    if (node.type === "MalformedCandidate") addBlocker("malformed_candidate_construction", node, nextPath);
    if (CP018_FRAGMENT_CONSTRUCTION_TYPES.has(node.type)) {
      const licensed = explicitContext.supplied
        || ["context_licensed", "context_resolved"].includes(contextResolution.context_requirement_status)
        || contextResolution.antecedent_status === "linked";
      if (!licensed) addBlocker("context_dependent_fragment_without_licensed_context", node, nextPath);
      else addReview("context_licensed_fragment_requires_manual_review", node, nextPath);
    }
    const relationMarker = semanticGuardGenericRelationMarker(node);
    if (relationMarker) {
      addBlocker("relation_sensitive_marker_in_generic_transitive_analysis", node, nextPath, {
        relation_marker: relationMarker,
      });
    }
    const traceKind = node.trace && node.trace.kind || "";
    if (traceKind === "legacy_surface_rule") {
      addReview("legacy_surface_rule_requires_semantic_review", node, nextPath, {
        trace_rule: node.trace && node.trace.rule || "",
        trace_reason: node.trace && node.trace.reason || "",
        disposition: "fallback_surface_analysis_not_semantically_validated",
      });
    }
    const traceFlags = node.trace && Array.isArray(node.trace.semantic_review_flags)
      ? node.trace.semantic_review_flags
      : [];
    if (traceFlags.length) {
      addReview("construction_trace_requires_semantic_review", node, nextPath, {
        trace_flags: traceFlags,
      });
    }
    for (const child of node.children || []) walk(child, nextPath);
  };

  for (const node of analysis && analysis.nodes || []) walk(node, []);

  const sourceSurface = semanticGuardComparisonSurface(analysis && analysis.parser_shadow_source || analysis && analysis.source || "");
  if (/用[嚟來]$/u.test(sourceSurface) && !sourceSurface.includes("用來用去")) {
    addBlocker("incomplete_intended_function_linker_fragment", null, ["ROOT"], {
      surface: sourceSurface,
      evidence_basis: "CP015/CP019 incomplete-linker boundary",
    });
  }
  if (/^用[嚟來].+/u.test(sourceSurface) && !sourceSurface.startsWith("用來用去")) {
    addBlocker("intended_function_topic_or_resource_missing", null, ["ROOT"], {
      surface: sourceSurface,
      evidence_basis: "CP019 bare-linker fragment boundary",
    });
  }
  if (/^(?:我|你|佢|我哋|你哋|佢哋)用[嚟來].+/u.test(sourceSurface)) {
    addBlocker("intended_function_resource_missing_with_overt_user", null, ["ROOT"], {
      surface: sourceSurface,
      evidence_basis: "CP019 user-versus-function-topic boundary",
    });
  }

  // CP020: a fully wrapped subject + 畀/俾 + predicate sequence must not become
  // semantically clean merely because a generic SubjectPredicateClause and
  // PerfectiveVP cover the surface.  Without an overt post-marker participant,
  // the passive agent is missing or unresolved; permissive and transfer readings
  // are likewise not licensed.  This is a semantic guard only and does not add a
  // grammar construction.
  const semanticLeafTokens = semanticGuardLeafTokens(analysis && analysis.nodes || []);
  const beiLeafIndex = semanticLeafTokens.findIndex((node, index) => index > 0 && ["畀", "俾"].includes(String(node && node.surface || "")));
  const hasPassivePermissiveRelation = (finalRows || []).some((row) => row && row.kind === "construction" && row.type === "PassivePermissiveRelation");
  if (beiLeafIndex > 0 && beiLeafIndex < semanticLeafTokens.length - 1 && !hasPassivePermissiveRelation) {
    const firstAfterBei = semanticLeafTokens[beiLeafIndex + 1];
    const firstAfterIsPerson = cp020NodeIsPersonEvidence(firstAfterBei);
    const firstAfterIsPredicate = cp020NodeIsPredicateEvidence(firstAfterBei);
    if (!firstAfterIsPerson && firstAfterIsPredicate) {
      addBlocker("passive_permissive_agent_missing_or_unresolved", null, ["ROOT"], {
        surface: sourceSurface,
        marker_surface: semanticLeafTokens[beiLeafIndex].surface || "",
        first_postmarker_surface: firstAfterBei && firstAfterBei.surface || "",
        evidence_basis: "CP014/CP020 agent-omitted passive-permissive boundary",
      });
    }
  }

  // CP021B non-emitting boundaries. These checks never create a participant or
  // relation node; they only make the frozen refusal disposition explicit.
  const cp021bBeiIndexes = semanticLeafTokens
    .map((node, index) => ["畀", "俾"].includes(String(node && node.surface || "")) ? index : -1)
    .filter((index) => index >= 0);
  const hasLexicalGiveRelation = (finalRows || []).some((row) => row && row.kind === "construction" && row.type === "LexicalGiveRelation");
  const hasPostThemeParticipantRelation = (finalRows || []).some((row) => row && row.kind === "construction" && row.type === "PostThemeParticipantRelation");
  if (!hasLexicalGiveRelation && !hasPostThemeParticipantRelation && cp021bBeiIndexes.length >= 2) {
    addReview("lexical_give_double_marker_heavy_theme_unfrozen", null, ["ROOT"], {
      surface: sourceSurface,
      evidence_basis: "CP021B-PD1 heavy-theme double-marker boundary",
    });
  }
  if (!hasLexicalGiveRelation && !hasPostThemeParticipantRelation && cp021bBeiIndexes.length && sourceSurface.includes("將")) {
    addReview("lexical_give_zoeng_restructure_outside_design", null, ["ROOT"], {
      surface: sourceSurface,
      evidence_basis: "CP021B-PD1 zoeng restructuring boundary",
    });
  }
  if (!hasLexicalGiveRelation && !hasPostThemeParticipantRelation && !hasPassivePermissiveRelation && cp021bBeiIndexes.length === 1) {
    const beiIndex = cp021bBeiIndexes[0];
    const beforeBei = semanticLeafTokens.slice(0, beiIndex);
    const afterBei = semanticLeafTokens.slice(beiIndex + 1)
      .filter((node) => !isToken(node, "咗") && !nodeCanFillSlot(node, "particle"));
    const twoPersonSplits = [];
    for (let index = 1; index < afterBei.length; index += 1) {
      if (cp021bSpanIsPersonNP(afterBei.slice(0, index)) && cp021bSpanIsPersonNP(afterBei.slice(index))) {
        twoPersonSplits.push(index);
      }
    }
    if (twoPersonSplits.length) {
      addBlocker("lexical_give_two_person_argument_roles_unresolved", null, ["ROOT"], {
        surface: sourceSurface,
        evidence_basis: "CP021B-PD1 two-person lexical-GIVE refusal",
      });
    } else if (!beforeBei.length && cp021bSpanIsPersonNP(afterBei)) {
      addBlocker("context_dependent_lexical_give_argument_omission", null, ["ROOT"], {
        surface: sourceSurface,
        omitted_local_arguments: ["subject", "theme"],
        evidence_basis: "CP021B-PD1 nonfull lexical-GIVE boundary",
      });
    } else if (cp021bSpanIsPersonNP(beforeBei) && cp021bSpanIsThingNP(afterBei)) {
      addBlocker("context_dependent_lexical_give_argument_omission", null, ["ROOT"], {
        surface: sourceSurface,
        omitted_local_arguments: ["recipient"],
        evidence_basis: "CP021B-PD1 nonfull lexical-GIVE boundary",
      });
    } else if (cp021bSpanIsPersonNP(afterBei)) {
      const frontedSplits = [];
      for (let index = 1; index < beforeBei.length; index += 1) {
        if (cp021bSpanIsThingNP(beforeBei.slice(0, index)) && cp021bSpanIsPersonNP(beforeBei.slice(index))) {
          frontedSplits.push(index);
        }
      }
      if (frontedSplits.length) {
        addReview("lexical_give_fronted_theme_outside_design", null, ["ROOT"], {
          surface: sourceSurface,
          evidence_basis: "CP021B-PD1 fronted-theme boundary",
        });
      }
    }
  }

  if (sourceSurface.includes("約埋")) {
    addReview("retired_invitation_bridge_surface_requires_reanalysis", null, ["ROOT"], {
      surface: sourceSurface,
      evidence_basis: "CP016 retired bridge family",
    });
  }
  if (sourceSurface.includes("掉落")) {
    addReview("retired_goal_bridge_surface_requires_lexical_path_review", null, ["ROOT"], {
      surface: sourceSurface,
      evidence_basis: "CP016 retired exact goal child",
    });
  }

  const expectedSurface = sourceSurface;
  const finalSurface = semanticGuardComparisonSurface((analysis && analysis.nodes || []).map(nodeParserSurface).join(""));
  if (expectedSurface !== finalSurface) {
    addBlocker("lexicon_or_surface_dropout", null, ["ROOT"], {
      expected_parser_surface: expectedSurface,
      final_parser_surface: finalSurface,
    });
  }

  const rootCoverage = rootSpanCoverageForDiagnostic(finalRows || []);
  if (rootCoverage.status === "PARTIAL") {
    addBlocker("partial_root_span_unwrapped_material", null, ["ROOT"], {
      unwrapped_root_surfaces: rootCoverage.unwrapped_root_surfaces || [],
    });
  } else if (rootCoverage.status === "NO_TOP_CONSTRUCTION") {
    addBlocker("no_top_construction", null, ["ROOT"]);
  }
  if ((rootCoverage.top_construction_count || 0) > 1) {
    addReview("multiple_top_constructions", null, ["ROOT"], {
      top_construction_surfaces: rootCoverage.top_construction_surfaces || [],
    });
  }
  const topConstructionNodes = (analysis && analysis.nodes || []).filter((node) => node && node.kind === "construction");
  if (topConstructionNodes.length === 1
      && /(?:NP|Nominal)$/.test(String(topConstructionNodes[0].type || ""))
      && !explicitContext.supplied) {
    addReview("standalone_nominal_requires_fragment_or_context_review", topConstructionNodes[0], ["ROOT", topConstructionNodes[0].type], {
      surface: flattenSurface(topConstructionNodes[0]),
    });
  }

  const topConstructionCount = topConstructionNodes.length;
  const outerWrapperBlocked = topConstructionCount > 0 && blockers.some((row) => row.depth > 0);
  if (outerWrapperBlocked) {
    addReview("outer_wrapper_contains_semantic_blocker", null, ["ROOT"], {
      blocker_count_below_root: blockers.filter((row) => row.depth > 0).length,
    });
  }

  const status = blockers.length
    ? "BLOCKED"
    : (reviewReasons.length ? "REVIEW_REQUIRED" : "MANUAL_REVIEW_ELIGIBLE");
  return {
    status,
    automatic_acceptance: false,
    blocker_count: blockers.length,
    review_reason_count: reviewReasons.length,
    outer_wrapper_blocked: outerWrapperBlocked,
    blockers,
    review_reasons: reviewReasons,
    policy: "A clean outer construction and full root coverage cannot establish semantic acceptance when any decisive descendant is unknown, dropped, malformed, context-dependent, retired, debunked, or lacks required typed relation provenance.",
  };
}

function diagnosticSummary(analysis) {
  const finalRows = flattenNodes(analysis.nodes);
  const constructionRows = finalRows.filter((row) => row.kind === "construction");
  const traceSummary = traceCounts(finalRows);
  const templateFamilySummary = templateFamilyCounts(constructionRows);
  const reviewRows = finalRows.filter((row) => diagnosticLevel(row.trace && row.trace.kind) === "review");
  const selectionRows = finalRows.filter((row) => row.trace && row.trace.selection_decision);
  const lexicalizedSelectionRows = selectionRows.filter((row) => row.trace.selection_decision.chosen_registry_kind);
  const featureBundleRows = finalRows.filter((row) => row.feature_bundle || (row.trace && row.trace.feature_bundle));
  const parserActiveFeatureBundleRows = featureBundleRows.filter((row) => {
    const bundle = row.feature_bundle || (row.trace && row.trace.feature_bundle) || {};
    return bundle.evidence_controls && bundle.evidence_controls.parser_active;
  });
  const internalTopConstructions = constructionRows.filter((row) => row.depth === 0).map((row) => row.type);
  const topConstructions = constructionRows.filter((row) => row.depth === 0).map((row) => row.compatibility_alias || diagnosticCompatibilityConstructionType(row.type));
  const topChildConstructions = topChildConstructionsForDiagnostic(constructionRows);
  const normalizationReviewSuggestionRows = normalizationReviewSuggestionDisplayRows(analysis);
  const parserShadowRepairRows = parserShadowRepairDisplayRows(analysis);
  const parserShadowRepairNoteCoverage = parserShadowRepairNoteCoverageSummary(parserShadowRepairRows);
  const foldedLexicalRepairRows = foldedLexicalRepairDisplayRows(analysis);
  const contextResolution = analysis.context_resolution || {};
  const explicitContext = analysis.explicit_context || { supplied: false, turns: [] };
  const rootSpanCoverage = rootSpanCoverageForDiagnostic(finalRows);
  const semanticAcceptance = semanticAcceptanceGuardForAnalysis(analysis, finalRows);
  const summary = {
    source: analysis.source,
    parser_shadow_source: analysis.parser_shadow_source || analysis.source,
    raw_first_display: true,
    normalization_trace: analysis.normalization_trace || [],
    parser_shadow_repairs: parserShadowRepairRows,
    parser_shadow_repair_count: parserShadowRepairRows.length,
    parser_shadow_repair_type_counts: parserShadowRepairTypeCounts(parserShadowRepairRows),
    parser_shadow_repair_note_coverage_status: parserShadowRepairNoteCoverage.status,
    missing_shadow_repair_note_count: parserShadowRepairNoteCoverage.missing_shadow_repair_note_count,
    folded_lexical_repairs: foldedLexicalRepairRows,
    folded_lexical_repair_count: foldedLexicalRepairRows.length,
    normalization_review_suggestions: analysis.normalization_review_suggestions || [],
    normalization_review_suggestion_display: normalizationReviewSuggestionRows,
    normalization_review_suggestion_display_count: normalizationReviewSuggestionRows.length,
    token_count: flattenNodes(analysis.tokens).filter((row) => row.kind === "token").length,
    final_node_count: finalRows.length,
    construction_count: constructionRows.length,
    top_constructions: topConstructions,
    internal_top_constructions: internalTopConstructions,
    top_child_constructions: topChildConstructions,
    top_child_construction_count: topChildConstructions.length,
    trace_summary: traceSummary,
    template_family_summary: templateFamilySummary,
    review_count: reviewRows.length,
    selection_decision_count: selectionRows.length,
    lexicalized_selection_count: lexicalizedSelectionRows.length,
    feature_bundle_count: featureBundleRows.length,
    parser_active_feature_bundle_count: parserActiveFeatureBundleRows.length,
    explicit_context_supplied: Boolean(explicitContext.supplied),
    explicit_context_turns: explicitContext.turns || [],
    context_requirement_status: contextResolution.context_requirement_status || "context_not_required",
    antecedent_status: contextResolution.antecedent_status || "not_applicable",
    missing_argument_slots: contextResolution.missing_argument_slots || [],
    context_turn_id: contextResolution.context_turn_id || "",
    question_id: contextResolution.question_id || "",
    antecedent_span: contextResolution.antecedent_span || "",
    selected_alternative: contextResolution.selected_alternative || "",
    root_span_coverage_status: rootSpanCoverage.status,
    root_top_construction_count: rootSpanCoverage.top_construction_count,
    root_top_construction_surfaces: rootSpanCoverage.top_construction_surfaces,
    unwrapped_root_nonpunctuation_count: rootSpanCoverage.unwrapped_root_nonpunctuation_count,
    unwrapped_root_surfaces: rootSpanCoverage.unwrapped_root_surfaces,
    ignored_root_remainder_count: rootSpanCoverage.ignored_root_remainder_count,
    semantic_acceptance: semanticAcceptance,
    semantic_acceptance_status: semanticAcceptance.status,
    semantic_acceptance_blocker_count: semanticAcceptance.blocker_count,
    semantic_acceptance_review_reason_count: semanticAcceptance.review_reason_count,
    semantic_acceptance_outer_wrapper_blocked: semanticAcceptance.outer_wrapper_blocked,
  };
  const topicChainRoot = constructionRows.find((row) => row.trace && row.trace.topic_chain_id && row.trace.topic_chain_status);
  if (topicChainRoot && topicChainRoot.trace) {
    summary.topic_chain_id = topicChainRoot.trace.topic_chain_id || "";
    summary.topic_chain_status = topicChainRoot.trace.topic_chain_status || "";
    summary.topic_antecedent_surface = topicChainRoot.trace.topic_antecedent_surface || "";
    summary.topic_antecedent_source = topicChainRoot.trace.topic_antecedent_source || "";
    summary.topic_antecedent_semantic_domains = topicChainRoot.trace.topic_antecedent_semantic_domains || [];
    summary.topic_frame_status = topicChainRoot.trace.topic_frame_status || "";
    summary.topic_frame_linker_surface = topicChainRoot.trace.topic_frame_linker_surface || "";
    summary.topic_frame_domain_surface = topicChainRoot.trace.topic_frame_domain_surface || "";
    summary.relational_frame_status = topicChainRoot.trace.relational_frame_status || "";
    summary.relational_coverb_linker_surface = topicChainRoot.trace.relational_coverb_linker_surface || "";
    summary.relational_coverb_domain_surface = topicChainRoot.trace.relational_coverb_domain_surface || "";
    summary.linked_null_object_count = topicChainRoot.trace.linked_null_object_count || 0;
    summary.linked_predicate_surfaces = topicChainRoot.trace.linked_predicate_surfaces || [];
    summary.unresolved_predicate_surfaces = topicChainRoot.trace.unresolved_predicate_surfaces || [];
    summary.null_object_link = topicChainRoot.trace.null_object_link || "";
  }
  const particleClusterRoot = constructionRows.find((row) => row.trace && row.trace.particle_cluster_root);
  if (particleClusterRoot && particleClusterRoot.trace) {
    summary.particle_cluster_order_status = particleClusterRoot.trace.cluster_order_status || "";
    summary.visible_particle_sequence = particleClusterRoot.trace.visible_particle_sequence || [];
    summary.particle_scope_layers = particleClusterRoot.trace.particle_scope_layers || [];
    summary.particle_scope_functions = particleClusterRoot.trace.particle_scope_functions || [];
    summary.particle_cluster_scope_direction = particleClusterRoot.trace.scope_direction || "";
    summary.particle_cluster_fusion_status = particleClusterRoot.trace.fusion_status || "";
  } else {
    const diagnosticClusterInfo = orderedParticleClusterInfo(analysis.tokens || [], analysis.source || "");
    const diagnosticTailInfo = diagnosticClusterInfo || orderedParticleClusterTailInfo(analysis.tokens || [], analysis.source || "");
    if (diagnosticClusterInfo && !diagnosticClusterInfo.supportedOrder) {
      summary.particle_cluster_order_status = diagnosticClusterInfo.orderStatus;
      summary.visible_particle_sequence = diagnosticClusterInfo.visibleParticleSequence;
      summary.particle_scope_layers = diagnosticClusterInfo.particleScopeLayers;
      summary.particle_scope_functions = diagnosticClusterInfo.particleScopeFunctions;
      summary.particle_cluster_scope_direction = diagnosticClusterInfo.layerOrderCompatible
        ? "surface_order_preserved_scope_not_evidence_licensed"
        : "surface_order_preserved_scope_not_licensed";
      summary.particle_cluster_fusion_status = diagnosticClusterInfo.fusionStatus;
    } else if (diagnosticTailInfo
      && (topConstructions.includes("ANotAQuestion") || topConstructions.includes("ExistentialWhQuestion"))) {
      summary.particle_cluster_order_status = "question_precedence_cluster_tail_review";
      summary.visible_particle_sequence = diagnosticTailInfo.visibleParticleSequence;
      summary.particle_scope_layers = diagnosticTailInfo.particleScopeLayers;
      summary.particle_scope_functions = diagnosticTailInfo.particleScopeFunctions;
      summary.particle_cluster_scope_direction = "surface_order_preserved_question_scope_not_resolved";
      summary.particle_cluster_fusion_status = diagnosticTailInfo.fusionStatus;
    }
  }
  const semanticReviewFlags = semanticReviewFlagsForSummary(summary);
  if (semanticReviewFlags.length) summary.semantic_review_flags = semanticReviewFlags;
  return summary;
}

function cjkCharacterCount(surface) {
  return Array.from(String(surface || "")).filter((char) => /\p{Script=Han}/u.test(char)).length;
}

function normalizeJyutpingValue(value) {
  return String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function jyutpingSyllableIssues(jyutping) {
  const syllables = splitJyutping(jyutping);
  return syllables.filter((syllable) => !/^[a-z]+[1-6]$/i.test(syllable));
}

function contextualJyutpingExpectationsForRow(row) {
  const surface = String((row && row.surface) || "");
  const syntax = String((row && row.syntax) || "");
  if (surface === "呢" && /(^|\s)(?:discourse_fragment_question|sentence_final_question_particle)(\s|$)/.test(syntax)) {
    return { readings: ["ne1", "le1"], source: "contextual_question_ne_expectation" };
  }
  if (surface === "呢" && /(^|\s)demonstrative_determiner(\s|$)/.test(syntax)) {
    return { readings: ["ni1"], source: "contextual_demonstrative_expectation" };
  }
  const readings = JYUTPING_REVIEW_EXPECTATIONS[surface] || null;
  return { readings, source: readings ? "review_expectation" : "token_lexicon_or_wrapper_child" };
}

function jyutpingAuditRowsForAnalysis(analysis) {
  const rows = flattenNodes(analysis.nodes).filter((row) => row.kind === "token");
  return rows.map((row) => {
    const surface = row.surface || "";
    const actual = normalizeJyutpingValue(row.jyutping || "");
    const contextualExpectation = contextualJyutpingExpectationsForRow(row);
    const expected = contextualExpectation.readings;
    const traceKind = row.trace && row.trace.kind ? row.trace.kind : "unspecified";
    const item = {
      surface,
      role: row.role,
      syntax: row.syntax,
      jyutping: actual || null,
      expected: expected || null,
      status: "ok",
      source: contextualExpectation.source,
      trace: traceKind,
    };

    if (!actual) {
      if (cjkCharacterCount(surface) === 0) {
        item.status = "not_applicable_non_cjk";
        item.source = "non_cjk_token";
        item.reason = "Jyutping is not required for a token with no CJK characters.";
        return item;
      }
      item.status = "missing_jyutping";
      item.source = traceKind === "unknown_atomic" ? "unknown_atomic" : "token_without_jyutping";
      item.reason = "Rendered CJK token has no Jyutping attached.";
      return item;
    }

    const invalidSyllables = jyutpingSyllableIssues(actual);
    if (invalidSyllables.length) {
      item.status = "invalid_jyutping_format";
      item.invalid_syllables = invalidSyllables;
      item.reason = "Jyutping syllables should end with tone numbers 1–6.";
      return item;
    }

    const syllableCount = splitJyutping(actual).length;
    const hanCount = cjkCharacterCount(surface);
    if (hanCount > 0 && syllableCount > 0 && syllableCount !== hanCount) {
      item.status = "jyutping_syllable_count_mismatch";
      item.han_character_count = hanCount;
      item.jyutping_syllable_count = syllableCount;
      item.reason = "Number of Jyutping syllables does not match number of Han characters in the rendered token.";
      return item;
    }

    if (expected && !expected.map(normalizeJyutpingValue).includes(actual)) {
      item.status = "dictionary_disagreement";
      item.reason = "Token Jyutping differs from the local review expectation table.";
      return item;
    }

    if (expected && expected.length > 1) {
      item.status = "ok_multi_pronunciation_allowed";
      item.reason = "One of multiple accepted review readings matched.";
      return item;
    }

    return item;
  });
}

function jyutpingAuditSummary(analysis) {
  const items = jyutpingAuditRowsForAnalysis(analysis);
  const countByStatus = {};
  for (const item of items) countByStatus[item.status] = (countByStatus[item.status] || 0) + 1;
  const needsReviewStatuses = new Set([
    "missing_jyutping",
    "invalid_jyutping_format",
    "jyutping_syllable_count_mismatch",
    "dictionary_disagreement",
  ]);
  const needsReview = items.filter((item) => needsReviewStatuses.has(item.status));
  return {
    status: needsReview.length ? "WARN" : "PASS",
    token_count: items.length,
    checked_count: items.filter((item) => item.status !== "missing_jyutping").length,
    missing_jyutping_count: countByStatus.missing_jyutping || 0,
    invalid_jyutping_format_count: countByStatus.invalid_jyutping_format || 0,
    syllable_count_mismatch_count: countByStatus.jyutping_syllable_count_mismatch || 0,
    dictionary_disagreement_count: countByStatus.dictionary_disagreement || 0,
    multi_pronunciation_allowed_count: countByStatus.ok_multi_pronunciation_allowed || 0,
    status_counts: countByStatus,
    items_needing_review: needsReview,
  };
}

const {
  cleanLearnerNote,
  learnerGlossFromLexicon,
  contextualLearnerGlossLinesForToken,
  learnerGlossLinesForToken,
  learnerGlossLinesForConstruction,
  compactLearnerHoverLines,
  learnerVisibleSyntax,
  learnerUiHoverTitleForToken,
  learnerUiHoverTitleForConstruction,
  learnerUiHoverTitleForConstructionLayer,
} = createLearnerDisplay({
  TOKEN_LEXICON,
  LEARNER_CONTEXTUAL_GLOSSES,
  LEARNER_SURFACE_GLOSSES,
  LEARNER_CONSTRUCTION_GLOSSES,
  diagnosticCompatibilityConstructionType,
  nodeDisplaySurface,
});

function learnerUiHoverLeakFlags(title) {
  const text = String(title || "");
  const checks = [
    ["exposes_raw_learner_slot_list", /(^|\n)learner slots:\s*/i],
    ["exposes_hidden_internal_slot_count", /internal slots hidden from learner display/i],
    ["exposes_raw_internal_slot_list", /(^|\n)slots:\s*[a-z_]+/i],
    ["exposes_parser_or_template_note", /\b(parser|diagnostic|template|construction context|role override|internal|slots?)\b/i],
    ["exposes_contextual_implementation_note", /\b(contextual|active affordance|without deleting|transparent time expression|motion affordance|time affordance|keeps? soeng|while keeping)\b/i],
  ];
  return checks.filter(([, pattern]) => pattern.test(text)).map(([flag]) => flag);
}

function learnerUiHoverLooksLikePlainGloss(title) {
  const lines = String(title || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  // A provisional heuristic: a learner-friendly hover should have a non-technical
  // explanation line beyond surface/Jyutping, not only key:value diagnostics.
  return lines.some((line) => (
    !/^[a-z_ ]+:/i.test(line) &&
    !/^[a-z]+[1-6](?:\s+[a-z]+[1-6])*$/i.test(line) &&
    /[A-Za-z]/.test(line) &&
    !/\b(parser|diagnostic|template|syntax|slot|construction|internal|contextual)\b/i.test(line)
  ));
}

function learnerUiHoverGenericGlossFlags(title) {
  const lines = String(title || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const flags = [];
  const generic = lines.filter((line) => /^(Cantonese word\.?|Cantonese text\.?|Cantonese phrase\.?)$/i.test(line));
  if (generic.length) flags.push("generic_learner_gloss");
  return flags;
}

function learnerUiHoverContextMismatchFlags(row) {
  if (!row || row.target_kind !== "token_title") return [];
  const surface = String(row.surface || "");
  const syntax = String(row.syntax || "");
  const title = String(row.current_default_hover_title || "");
  const flags = [];
  const conditionalMarker = /(^|\s)conditional_marker(\s|$)/.test(syntax);
  const reportedSpeech = /(^|\s)speech_reporting_verb(\s|$)/.test(syntax) && !conditionalMarker;
  if (conditionalMarker && ["嘅話", "話"].includes(surface)) {
    if (/\b(?:say|report)\b/i.test(title)) flags.push("conditional_marker_speech_gloss_leak");
    if (!/(?:\bif\b|in the case that)/i.test(title)) flags.push("conditional_marker_missing_conditional_gloss");
  }
  if (reportedSpeech && surface === "話") {
    if (/(?:in the case that|part of [“"']?if)/i.test(title)) flags.push("reported_speech_conditional_gloss_leak");
    if (!/\b(?:say|report)\b/i.test(title)) flags.push("reported_speech_missing_speech_gloss");
  }
  const conventionalDurationUnit = surface === "字"
    && /(^|\s)(?:conventional_duration_unit|five_minute_increment)(\s|$)/.test(syntax);
  if (conventionalDurationUnit) {
    if (/(?:characters?|writing)/i.test(title)) flags.push("conventional_duration_literal_gloss_leak");
    if (!/(?:five[- ]minute|5[- ]minute)/i.test(title)) flags.push("conventional_duration_missing_time_gloss");
  }
  const postClassifierApproximation = surface === "度"
    && /(^|\s)post_classifier_approximation_marker(\s|$)/.test(syntax);
  if (postClassifierApproximation) {
    if (/(?:locative|location|place|at here)/i.test(title)) flags.push("approximation_marker_locative_gloss_leak");
    if (!/(?:about|approximately|approximate)/i.test(title)) flags.push("approximation_marker_missing_approximation_gloss");
  }
  const finalQuestionParticle = surface === "呢" && /(^|\s)sentence_final_question_particle(\s|$)/.test(syntax);
  if (finalQuestionParticle) {
    if (/\bthis\b/i.test(title)) flags.push("question_particle_demonstrative_gloss_leak");
    if (!/(?:question particle|asks for an answer|what about|and what about)/i.test(title)) flags.push("question_particle_missing_question_gloss");
    if (/\bni1\b/i.test(title)) flags.push("question_particle_demonstrative_reading_leak");
  }
  return flags;
}

function learnerUiHoverAuditRows(analysis) {
  const rows = [];
  const pushRow = (row) => {
    row.leak_flags = mergeUnique([
      ...learnerUiHoverLeakFlags(row.current_default_hover_title),
      ...learnerUiHoverContextMismatchFlags(row),
    ]);
    row.has_plain_learner_gloss_line = learnerUiHoverLooksLikePlainGloss(row.current_default_hover_title);
    row.gloss_quality_flags = learnerUiHoverGenericGlossFlags(row.current_default_hover_title);
    rows.push(row);
  };
  for (const row of flattenNodes(analysis.nodes)) {
    if (row.kind === "token") {
      const title = learnerUiHoverTitleForToken(row);
      pushRow({
        surface: row.surface,
        target_kind: "token_title",
        parent: row.parent,
        role: row.role || row.label,
        syntax: row.syntax,
        jyutping: row.jyutping,
        learner_display_slots: learnerDisplaySlots(row.slots || []),
        current_default_hover_title: title,
        current_default_hover_lines: title.split(/\r?\n/),
      });
    }
    if (row.kind === "construction") {
      const title = learnerUiHoverTitleForConstruction(row);
      pushRow({
        surface: row.surface,
        target_kind: "construction_title",
        construction: row.type,
        label: row.label,
        learner_display_slots: learnerDisplaySlots(row.slots || []),
        current_default_hover_title: title,
        current_default_hover_lines: title.split(/\r?\n/),
      });
      const layerTitle = learnerUiHoverTitleForConstructionLayer(row);
      pushRow({
        surface: row.surface,
        target_kind: "construction_layer_title",
        construction: row.type,
        label: row.label,
        learner_display_slots: learnerDisplaySlots(row.slots || []),
        current_default_hover_title: layerTitle,
        current_default_hover_lines: layerTitle.split(/\r?\n/),
      });
    }
  }
  return rows;
}

function learnerUiHoverAuditSummary(analysis) {
  const rows = learnerUiHoverAuditRows(analysis);
  const flagCounts = {};
  for (const row of rows) {
    for (const flag of row.leak_flags || []) flagCounts[flag] = (flagCounts[flag] || 0) + 1;
    for (const flag of row.gloss_quality_flags || []) flagCounts[flag] = (flagCounts[flag] || 0) + 1;
  }
  const flaggedRows = rows.filter((row) => (row.leak_flags && row.leak_flags.length) || (row.gloss_quality_flags && row.gloss_quality_flags.length));
  const missingPlainGlossRows = rows.filter((row) => !row.has_plain_learner_gloss_line);
  return {
    status: flaggedRows.length || missingPlainGlossRows.length ? "WARN" : "PASS",
    policy: "Diagnostic-only mirror of the current default hover/title payload. PASS rows are silent in rendered diagnostics; WARN rows surface raw-slot leaks, missing English learner glosses, or generic fallback glosses such as Cantonese word/text/phrase.",
    hover_target_count: rows.length,
    flagged_hover_target_count: flaggedRows.length,
    missing_plain_learner_gloss_count: missingPlainGlossRows.length,
    leak_flag_counts: flagCounts,
    sample_flagged_hover_rows: flaggedRows.concat(missingPlainGlossRows).slice(0, 8),
  };
}

function diagnosticContextualRoleAffordances(row = {}) {
  if (!row || row.kind !== "token") return [];
  const trace = row.trace || {};
  const resolution = trace.contextual_role_affordance_resolution || {};
  const candidates = Array.isArray(resolution.candidate_affordances)
    ? resolution.candidate_affordances.map((item) => ({ ...item }))
    : [];
  const activeRole = resolution.active_role || row.role || row.label || "";
  const lexicalDefaultRole = resolution.lexical_default_role || "";

  if (!Object.keys(resolution).length) {
    return contextualRoleAffordances(row).map((item) => ({
      ...item,
      active_in_final_construction: item.role === activeRole,
    }));
  }

  // Unknown/neutral atomic material may have no ordinary learner affordance before
  // construction wrapping. Preserve that lexical-default provenance explicitly so
  // a legitimate construction override does not masquerade as a lexical default.
  if (lexicalDefaultRole
      && !candidates.some((item) => item.source === "lexical_default" && item.role === lexicalDefaultRole)) {
    candidates.unshift({
      role: lexicalDefaultRole,
      source: "lexical_default",
      active_before_construction_wrapping: true,
      active_in_final_construction: lexicalDefaultRole === activeRole,
      note: lexicalDefaultRole === "neutral"
        ? "No learner role was licensed before construction wrapping."
        : "Default learner role from the lexical entry before construction wrapping.",
    });
  }

  const activeMatch = resolution.active_affordance_match || null;
  let activeFound = false;
  for (const item of candidates) {
    if (activeMatch) {
      item.active_in_final_construction = item.role === (activeMatch.role || activeRole)
        && (!activeMatch.source || item.source === activeMatch.source)
        && (!activeMatch.slot || item.slot === activeMatch.slot);
    } else {
      item.active_in_final_construction = item.role === activeRole
        && (item.source !== "lexical_default" || activeRole === lexicalDefaultRole);
    }
    if (item.active_in_final_construction) activeFound = true;
  }
  if (activeRole && !activeFound) {
    const activeSource = activeMatch && activeMatch.source
      ? activeMatch.source
      : (activeRole === lexicalDefaultRole ? "lexical_default" : "construction_override");
    candidates.push({
      role: activeMatch && activeMatch.role ? activeMatch.role : activeRole,
      slot: activeMatch && activeMatch.slot ? activeMatch.slot : undefined,
      source: activeSource,
      active_before_construction_wrapping: activeSource === "lexical_default" && activeRole === lexicalDefaultRole,
      active_in_final_construction: true,
      activated_by: resolution.active_affordance_source || "",
      note: activeSource === "lexical_default"
        ? "Lexical default remains active in the final construction."
        : "Construction context activates this role/slot reading; competing lexical affordances remain visible but inactive.",
    });
  }
  return candidates;
}

function diagnosticTokenRows(analysis) {
  return flattenNodes(analysis.tokens).map((row) => ({
    surface: row.surface,
    display_surface: row.display_surface,
    parser_surface: row.parser_surface,
    kind: row.kind,
    role: row.role,
    syntax: row.syntax,
    jyutping: row.jyutping,
    slots: row.slots,
    learner_display_slots: learnerDisplaySlots(row.slots || []),
    internal_slots_hidden_from_learner_display: internalOnlySlots(row.slots || []),
    contextual_role_affordances: row.kind === "token" ? contextualRoleAffordances(row) : [],
    trace: row.trace && row.trace.kind,
    features: row.features ? compactFeatureSummary(row.features) : undefined,
    feature_bundle: row.feature_bundle || (row.trace && row.trace.feature_bundle),
    selection_decision: row.trace && row.trace.selection_decision,
  }));
}

function diagnosticFinalRows(analysis) {
  return flattenNodes(analysis.nodes).map((row) => ({
    depth: row.depth,
    parent: row.parent_compatibility_alias || diagnosticCompatibilityConstructionType(row.parent || ""),
    internal_parent: row.parent || "",
    surface: row.surface,
    display_surface: row.display_surface,
    parser_surface: row.parser_surface,
    kind: row.kind,
    construction: row.compatibility_alias || diagnosticCompatibilityConstructionType(row.type || ""),
    internal_construction: row.type || "",
    compatibility_alias: row.compatibility_alias || INTERNAL_CONSTRUCTION_COMPATIBILITY_ALIASES[row.type] || "",
    internal_representation_scope: row.internal_representation_scope || "",
    label: row.label,
    role: row.role,
    syntax: row.syntax,
    jyutping: row.jyutping,
    slots: row.slots,
    learner_display_slots: learnerDisplaySlots(row.slots || []),
    internal_slots_hidden_from_learner_display: internalOnlySlots(row.slots || []),
    contextual_role_affordances: row.kind === "token" ? diagnosticContextualRoleAffordances(row) : [],
    trace: row.trace && row.trace.kind,
    feature_bundle: row.feature_bundle || (row.trace && row.trace.feature_bundle),
    trace_detail: diagnosticCompatibilityTrace(row.trace, row.compatibility_alias || ""),
    internal_trace_detail: row.trace,
    runtime_registry: row.kind === "construction" ? runtimeConstructionStateFor(row.type) : null,
  }));
}

function diagnosticLegend() {
  return {
    generative_template: "Best signal: matched by the slot-template engine over generated affordances. During the transition, trace detail may show template_family=construction_template for bounded templates that are not yet fully POS-general.",
    construction_template: "Temporary template-family label: bounded or vocabulary/surface-anchored template retained until the grammar can be expressed as a fully generative POS/slot pattern.",
    generative_or_heuristic_slot_rule: "Acceptable interim: structural/slot heuristic, not a full memorized sentence.",
    governed_discourse_wrapper: "Accepted structural wrapper for clause-linking or discourse/coordination sequences. It groups already-parsed clause-like children and is intentionally not a phrase-internal generative template.",
    predicate_heuristic: "Acceptable interim: local predicate wrapper from token features.",
    atomic_lexicon: "Atomic vocabulary lookup. In v0.4.40, registry-backed lexicalized stative tokens may include selection_decision explaining why lexicalized vs compositional won.",
    selection_decision: "Diagnostic detail inside token trace: explains lexicalized-stative registry scoring, forced-compositional exclusions, and ordinary lookup decisions.",
    feature_bundle: "Derived internal feature bundle. Phase 3 permits parser-active use only for migrated stative predicates; non-stative bundles remain parser-inactive.",
    contextual_role_affordances: "Diagnostic-only list of possible context-sensitive roles carried by a token. Context may activate one role, such as doing/movement for 上 in 上嚟, without deleting another valid affordance, such as when/time for 上個禮拜.",
    protected_formula_table: "Allowed opacity: formula intentionally protected.",
    surface_specific_phrase_rule: "Review: useful transparent rule, but still surface-specific.",
    legacy_surface_rule: "Review: older fallback rule; consider replacing with slot template.",
    special_ambiguity_rule: "Review/expected: explicit ambiguity handling.",
    jyutping_audit: "Separate pronunciation-quality lane. WARN does not fail parser coverage; it exposes missing/invalid/disagreement Jyutping data for review.",
    registry_audit: "Separate label-hygiene lane. WARN means a token learner role, construction label, parser-decision trace kind/template-family label, or slot name escaped the controlled registry.",
    learner_display_audit: "Separate UI-label lane. Parser/internal slots stay in diagnostics, while hover titles expose concise role/syntax metadata plus learner glosses.",
    learner_ui_hover_audit: "Diagnostic-only mirror of current default hover/title strings. PASS rows are silent; WARN rows show learner-facing raw-slot leaks, missing English learner glosses, or generic fallback glosses.",
    wrapper_coverage_audit: "Diagnostic-only wrapper integrity lane. ClauseRelationGraph must expose child/linker/separator coverage; ModalANotAQuestion must expose direct assigned-slot coverage before normal display may collapse it.",
    label_transition_audit: "Diagnostic-only inventory of construction trace families. PASS rows are silent; WARN rows classify unknown trace kinds. Migration-candidate rows are review inventory, not automatic acceptance or failure.",
    runtime_construction_registry_audit: "Checks only that every emitted construction label is active in the shipped runtime registry. Linguistic status and evidence are authoring-time data outside the plugin.",
  };
}

function formatJsonBlock(value) {
  return JSON.stringify(value, null, 2);
}

function auditSummaryHasFindings(summary) {
  return !!(summary && summary.status && summary.status !== "PASS");
}

function appendDiagnosticSection(parts, title, value) {
  if (value === null || value === undefined) return;
  if (Array.isArray(value) && !value.length) return;
  if (typeof value === "object" && !Array.isArray(value) && !Object.keys(value).length) return;
  parts.push(title, formatJsonBlock(value));
}

const DIAGNOSTIC_REVIEW_REMINDERS = require("./runtime-resources/presentation/diagnostic-reminders");
function diagnosticReviewReminder(key) {
  return DIAGNOSTIC_REVIEW_REMINDERS[key] || "Diagnostic reminder: even when this lane passes, inspect the detailed diagnostics before accepting behavior.";
}

function withDiagnosticReviewReminder(summary, key) {
  if (!summary || typeof summary !== "object" || Array.isArray(summary)) return summary;
  return { ...summary, review_reminder: diagnosticReviewReminder(key) };
}

function diagnosticReviewReminderSummary(keys = Object.keys(DIAGNOSTIC_REVIEW_REMINDERS)) {
  const out = {};
  for (const key of keys) out[key] = diagnosticReviewReminder(key);
  return out;
}

function expectedNormalizationChangeCount(rawSource, parserShadowSource) {
  const rawChars = Array.from(String(rawSource || ""));
  const shadowChars = Array.from(String(parserShadowSource || ""));
  const length = Math.max(rawChars.length, shadowChars.length);
  let count = 0;
  for (let index = 0; index < length; index += 1) {
    if ((rawChars[index] || "") !== (shadowChars[index] || "")) count += 1;
  }
  return count;
}

function normalizationTraceMap(trace) {
  const map = new Map();
  for (const item of trace || []) {
    map.set(item.index, item);
  }
  return map;
}

function untracedNormalizationChangeCount(rawSource, parserShadowSource, trace) {
  const rawChars = Array.from(String(rawSource || ""));
  const shadowChars = Array.from(String(parserShadowSource || ""));
  const traceByIndex = normalizationTraceMap(trace || []);
  const length = Math.max(rawChars.length, shadowChars.length);
  let count = 0;
  for (let index = 0; index < length; index += 1) {
    const raw = rawChars[index] || "";
    const normalized = shadowChars[index] || "";
    if (raw === normalized) continue;
    const item = traceByIndex.get(index);
    if (!item || item.raw !== raw || item.normalized !== normalized || item.applied_to_parser_shadow !== true) count += 1;
  }
  return count;
}

function normalizationAuditSummary(analysis) {
  const input = analysis && analysis.input_normalization ? analysis.input_normalization : {};
  const rawSource = input.raw_source !== undefined ? input.raw_source : (analysis && analysis.source) || "";
  const parserShadowSource = input.parser_shadow_source !== undefined ? input.parser_shadow_source : (analysis && analysis.parser_shadow_source) || rawSource;
  const trace = Array.isArray(input.normalization_trace) ? input.normalization_trace : [];
  const reviewSuggestions = Array.isArray(input.review_suggestions)
    ? input.review_suggestions
    : (Array.isArray(analysis && analysis.normalization_review_suggestions) ? analysis.normalization_review_suggestions : []);
  const expectedChangeCount = expectedNormalizationChangeCount(rawSource, parserShadowSource);
  const untracedChangeCount = untracedNormalizationChangeCount(rawSource, parserShadowSource, trace);
  const allowedAppliedTraceTypes = new Set([
    "simplified_to_traditional",
    "pinyin_fallout_cantonese_lexical_repair",
  ]);
  const unsafeTraceRows = trace.filter((item) => item.applied_to_parser_shadow && (
    item.confidence !== "high" ||
    !allowedAppliedTraceTypes.has(item.type) ||
    item.learner_display_replaced === true ||
    (item.type === "pinyin_fallout_cantonese_lexical_repair" && item.one_to_one_character_mapping !== true)
  ));
  const parserShadowRepairRows = trace.filter((item) => item && item.applied_to_parser_shadow === true && item.raw !== item.normalized);
  const parserShadowRepairDisplay = parserShadowRepairDisplayRows(analysis);
  const parserShadowRepairNoteCoverage = parserShadowRepairNoteCoverageSummary(parserShadowRepairDisplay);
  const foldedLexicalRepairRows = trace.filter((item) => item.type === "pinyin_fallout_cantonese_lexical_repair");
  const appliedReviewSuggestionRows = reviewSuggestions.filter((item) => item.applied_to_parser_shadow || item.learner_display_replaced);
  const rawDisplayReplacementRows = trace.filter((item) => item.learner_display_replaced === true);
  const rawDisplayPreservationStatus = rawDisplayReplacementRows.length ? "WARN" : "PASS";
  const status = unsafeTraceRows.length || appliedReviewSuggestionRows.length || rawDisplayReplacementRows.length || untracedChangeCount || parserShadowRepairNoteCoverage.status !== "PASS" ? "WARN" : "PASS";
  const summary = {
    status,
    policy: "Normalization audit lane: parser-shadow normalization may apply high-confidence Simplified-to-Traditional character-form changes and narrow one-character pinyin-fallout Cantonese lexical repairs with visible trace. Raw learner-visible text must not be replaced. Every parser-shadow repair must be represented in parser_shadow_repairs with a note.",
    raw_source: rawSource,
    parser_shadow_source: parserShadowSource,
    parser_shadow_differs_from_raw: rawSource !== parserShadowSource,
    expected_normalization_change_count: expectedChangeCount,
    normalization_trace_count: trace.length,
    parser_shadow_repair_count: parserShadowRepairRows.length,
    parser_shadow_repair_type_counts: parserShadowRepairTypeCounts(parserShadowRepairDisplay),
    parser_shadow_repair_note_coverage_status: parserShadowRepairNoteCoverage.status,
    missing_shadow_repair_note_count: parserShadowRepairNoteCoverage.missing_shadow_repair_note_count,
    review_suggestion_count: reviewSuggestions.length,
    folded_lexical_repair_count: foldedLexicalRepairRows.length,
    untraced_shadow_change_count: untracedChangeCount,
    unsafe_normalization_count: unsafeTraceRows.length,
    applied_review_suggestion_count: appliedReviewSuggestionRows.length,
    raw_display_replacement_count: rawDisplayReplacementRows.length,
    raw_display_preservation_status: rawDisplayPreservationStatus,
    review_reminder: diagnosticReviewReminder("normalization_audit"),
  };
  if (parserShadowRepairNoteCoverage.status !== "PASS") summary.parser_shadow_repairs_missing_notes = parserShadowRepairDisplay.filter((row) => !row.note || row.note_coverage_status !== "PASS");
  if (unsafeTraceRows.length) summary.unsafe_normalization_rows = unsafeTraceRows;
  if (appliedReviewSuggestionRows.length) summary.applied_review_suggestion_rows = appliedReviewSuggestionRows;
  if (rawDisplayReplacementRows.length) summary.raw_display_replacement_rows = rawDisplayReplacementRows;
  return summary;
}

function nonPassAuditSummary(summary) {
  return auditSummaryHasFindings(summary) ? summary : null;
}

function nonPassWrapperCoverageRows(analysis) {
  return wrapperCoverageAuditRows(analysis).filter((row) => row.status && row.status !== "PASS");
}

function nonPassLabelTransitionRows(analysis) {
  return labelTransitionAuditRows(analysis).filter((row) => row.transition_status === "needs_registry_decision");
}

function normalizeDiagnosticSourceForReview(source) {
  return String(source || "").trim().replace(/[。！？!?，,、；;：:]+$/u, "");
}

function hasSuspiciousBareNumeralObjectSource(source) {
  const normalized = normalizeDiagnosticSourceForReview(source);
  return /^(食|飲|睇|講|買|寫|做|聽|攞|放|還|摘|試|諗|Book)[一二三四五六七八九十兩]+$/u.test(normalized);
}

function hasLexicalSemanticFeatureReviewSource(source) {
  // v0.5.101 removes the known 水=food/edible semantic leakage. Keep this
  // hook for future lexical-semantic review rules, but do not hard-code 飲水
  // once the water/liquid domain is represented directly.
  const normalized = normalizeDiagnosticSourceForReview(source);
  return false;
}

function semanticReviewFlagsForSummary(summary) {
  const flags = [];
  const top = summary && Array.isArray(summary.top_constructions) ? summary.top_constructions : [];
  const source = summary && summary.source ? summary.source : "";
  if (!top.length) flags.push("no_top_construction");
  if (top.length > 1) flags.push("multiple_top_constructions");
  if (top.includes("NeedsContext")) flags.push("needs_context_parse");
  if (top.includes("MalformedCandidate")) flags.push("malformed_candidate_parse");
  if (summary && summary.context_requirement_status === "context_required") flags.push("context_required_unresolved");
  if (summary && summary.context_requirement_status === "context_incompatible") flags.push("context_incompatible");
  if (summary && summary.topic_chain_status === "antecedent_predicate_compatibility_review") flags.push("topic_chain_antecedent_predicate_compatibility_review");
  if (summary && summary.root_span_coverage_status === "PARTIAL") flags.push("partial_root_span_unwrapped_material");
  if ((summary && summary.review_count) > 0) flags.push("review_trace_present");
  if (summary && [
    "unsupported_or_unvalidated_order_review",
    "layer_order_compatible_unvalidated_review",
    "question_precedence_cluster_tail_review",
  ].includes(summary.particle_cluster_order_status)) flags.push("particle_cluster_order_review");
  if (hasSuspiciousBareNumeralObjectSource(source)) flags.push("suspicious_bare_numeral_object");
  if (hasLexicalSemanticFeatureReviewSource(source)) flags.push("lexical_semantic_feature_review");
  return Array.from(new Set(flags));
}

function formatDiagnosticMarkdown(analysis) {
  const summary = diagnosticSummary(analysis);
  const parts = [
    "Summary",
    formatJsonBlock(summary),
  ];

  appendDiagnosticSection(parts, "Diagnostic review reminders", diagnosticReviewReminderSummary([
    "normalization",
    "normalization_audit",
    "jyutping",
    "registry",
    "learner_display",
    "learner_ui_hover",
    "wrapper_coverage",
    "label_transition",
    "runtime_construction_registry",
  ]));
  appendDiagnosticSection(parts, "Input normalization trace", inputNormalizationHasFindings(analysis.input_normalization) ? withDiagnosticReviewReminder(analysis.input_normalization, "normalization") : null);
  const parserShadowRepairRows = parserShadowRepairDisplayRows(analysis);
  appendDiagnosticSection(parts, "Parser-shadow repair inventory", parserShadowRepairRows.length ? {
    status: parserShadowRepairNoteCoverageSummary(parserShadowRepairRows).status,
    policy: "Comprehensive inventory of every raw → parser_shadow_source repair, including character-form normalization and folded lexical repairs. Raw learner-visible text is preserved.",
    parser_shadow_repair_count: parserShadowRepairRows.length,
    parser_shadow_repair_type_counts: parserShadowRepairTypeCounts(parserShadowRepairRows),
    missing_shadow_repair_note_count: parserShadowRepairNoteCoverageSummary(parserShadowRepairRows).missing_shadow_repair_note_count,
    repairs: parserShadowRepairRows,
    review_reminder: diagnosticReviewReminder("normalization"),
  } : null);
  const foldedRepairRows = foldedLexicalRepairDisplayRows(analysis);
  appendDiagnosticSection(parts, "Folded pinyin-fallout lexical repairs", foldedRepairRows.length ? {
    status: "PASS",
    policy: "Subset of parser-shadow repairs that are narrow one-character pinyin-fallout lexical repairs. See Parser-shadow repair inventory for all shadow repairs.",
    repairs: foldedRepairRows,
    review_reminder: diagnosticReviewReminder("normalization"),
  } : null);
  const reviewSuggestionRows = normalizationReviewSuggestionDisplayRows(analysis);
  appendDiagnosticSection(parts, "Review-only normalization suggestions", reviewSuggestionRows.length ? {
    status: "PASS",
    policy: "Compatibility lane only. Current v0.5.107 pinyin-fallout repairs should not depend on review-only suggestions.",
    suggestions: reviewSuggestionRows,
    review_reminder: diagnosticReviewReminder("normalization"),
  } : null);
  appendDiagnosticSection(parts, "Normalization audit findings", withDiagnosticReviewReminder(nonPassAuditSummary(normalizationAuditSummary(analysis)), "normalization_audit"));
  appendDiagnosticSection(parts, "Jyutping audit findings", withDiagnosticReviewReminder(nonPassAuditSummary(jyutpingAuditSummary(analysis)), "jyutping"));
  appendDiagnosticSection(parts, "Registry audit findings", withDiagnosticReviewReminder(nonPassAuditSummary(registryAuditSummary(analysis)), "registry"));
  appendDiagnosticSection(parts, "Learner display audit findings", withDiagnosticReviewReminder(nonPassAuditSummary(learnerDisplayAuditSummary(analysis)), "learner_display"));
  const hoverSummary = learnerUiHoverAuditSummary(analysis);
  appendDiagnosticSection(parts, "Learner UI hover audit findings", withDiagnosticReviewReminder(nonPassAuditSummary(hoverSummary), "learner_ui_hover"));
  if (auditSummaryHasFindings(hoverSummary)) {
    appendDiagnosticSection(parts, "Learner UI hover warning rows", learnerUiHoverAuditRows(analysis).filter((row) => (row.leak_flags || []).length || (row.gloss_quality_flags || []).length || !row.has_plain_learner_gloss_line));
  }
  const wrapperSummary = wrapperCoverageAuditSummary(analysis);
  appendDiagnosticSection(parts, "Wrapper coverage audit findings", withDiagnosticReviewReminder(nonPassAuditSummary(wrapperSummary), "wrapper_coverage"));
  if (auditSummaryHasFindings(wrapperSummary)) appendDiagnosticSection(parts, "Wrapper coverage warning rows", nonPassWrapperCoverageRows(analysis));
  const labelSummary = labelTransitionAuditSummary(analysis);
  appendDiagnosticSection(parts, "Label transition audit findings", withDiagnosticReviewReminder(nonPassAuditSummary(labelSummary), "label_transition"));
  if (auditSummaryHasFindings(labelSummary)) appendDiagnosticSection(parts, "Label transition warning rows", nonPassLabelTransitionRows(analysis));
  const runtimeRegistrySummary = runtimeConstructionRegistryAuditSummary(analysis);
  appendDiagnosticSection(parts, "Runtime construction registry audit", withDiagnosticReviewReminder(runtimeRegistrySummary, "runtime_construction_registry"));
  if (auditSummaryHasFindings(runtimeRegistrySummary)) appendDiagnosticSection(parts, "Runtime construction registry warning rows", nonPassRuntimeConstructionRegistryRows(analysis));
  appendDiagnosticSection(parts, "Tokenization before construction wrapping", diagnosticTokenRows(analysis));
  appendDiagnosticSection(parts, "Final construction tree", diagnosticFinalRows(analysis));
  appendDiagnosticSection(parts, "Legend", diagnosticLegend());
  appendDiagnosticSection(parts, "Diagnostic final review reminder", {
    reminder: "Final diagnostic reminder: regardless of PASS/WARN/FAIL state, inspect the summary, parser-shadow/raw-display fields, top constructions, learner roles, trace details, and semantic-review flags before accepting this parse."
  });
  return parts.join("\n");
}

function extractCantoSpanCodeBlocks(markdown) {
  const text = String(markdown || "");
  const lines = text.split(/\r?\n/);
  const blocks = [];
  let open = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!open) {
      const match = line.match(/^\s*(```+|~~~+)\s*canto-span(?:\s+[^`]*)?\s*$/);
      if (match) {
        open = {
          fence: match[1].startsWith("~") ? "~" : "`",
          length: match[1].length,
          startLine: index + 1,
          lines: [],
        };
      }
      continue;
    }

    const closePattern = open.fence === "~" ? /^\s*~~~+\s*$/ : /^\s*```+\s*$/;
    if (closePattern.test(line)) {
      blocks.push({
        source: open.lines.join("\n"),
        startLine: open.startLine,
        endLine: index + 1,
      });
      open = null;
      continue;
    }

    open.lines.push(line);
  }

  return blocks;
}

function countCantoSpanFenceOpeners(markdown) {
  return String(markdown || "")
    .split(/\r?\n/)
    .filter((line) => /^\s*(```+|~~~+)\s*canto-span(?:\s+[^`]*)?\s*$/.test(line))
    .length;
}

function collectCantoSpanDiagnosticEntries(markdown) {
  const blocks = extractCantoSpanCodeBlocks(markdown);
  const entries = [];
  const errors = [];
  const contextDirectives = [];
  const directiveWarnings = [];

  blocks.forEach((block, blockIndex) => {
    const options = parseBlockOptions(block.source);
    contextDirectives.push(...(options.context_directives || []).map((directive) => ({
      block_index: blockIndex + 1,
      block_start_line: block.startLine,
      ...directive,
    })));
    directiveWarnings.push(...(options.directive_warnings || []).map((warning) => ({
      block_index: blockIndex + 1,
      block_start_line: block.startLine,
      ...warning,
    })));
    options.entries.forEach((optionEntry) => {
      const line = optionEntry.line;
      if (!normalizeSurface(line)) return;
      try {
        entries.push({
          block_index: blockIndex + 1,
          block_start_line: block.startLine,
          source_line_index: optionEntry.source_line_index,
          source: line,
          context_directive: optionEntry.context_directive || null,
          explicit_context: optionEntry.context,
          analysis: analyzeLine(line, optionEntry.context),
        });
      } catch (error) {
        errors.push({
          block_index: blockIndex + 1,
          block_start_line: block.startLine,
          source_line_index: optionEntry.source_line_index,
          source: line,
          error: error && error.message ? error.message : String(error),
        });
      }
    });
  });

  return {
    blocks,
    entries,
    errors,
    context_directives: contextDirectives,
    directive_warnings: directiveWarnings,
  };
}

function noteDiagnosticCoverageSummary(markdown, collected) {
  const noteText = String(markdown || "");
  const expectedFenceOpeners = countCantoSpanFenceOpeners(noteText);
  const blocks = collected && collected.blocks ? collected.blocks : [];
  const entries = collected && collected.entries ? collected.entries : [];
  const errors = collected && collected.errors ? collected.errors : [];
  const contextDirectives = collected && collected.context_directives ? collected.context_directives : [];
  const directiveWarnings = collected && collected.directive_warnings ? collected.directive_warnings : [];
  const sourceCounts = new Map();
  entries.forEach((entry) => {
    sourceCounts.set(entry.source, (sourceCounts.get(entry.source) || 0) + 1);
  });
  const duplicateSources = Array.from(sourceCounts.entries())
    .filter(([, count]) => count > 1)
    .map(([source, count]) => ({ source, count }));
  const renderedSources = entries.map((entry) => {
    const parseSummary = diagnosticSummary(entry.analysis);
    const normalizationSummary = normalizationAuditSummary(entry.analysis);
    const jyutpingSummary = jyutpingAuditSummary(entry.analysis);
    const registrySummary = registryAuditSummary(entry.analysis);
    const runtimeRegistrySummary = runtimeConstructionRegistryAuditSummary(entry.analysis);
    return {
      block_index: entry.block_index,
      block_start_line: entry.block_start_line,
      source_line_index: entry.source_line_index,
      source: entry.source,
      context_directive: entry.context_directive || null,
      explicit_context: entry.analysis.explicit_context || { supplied: false, turns: [] },
      parser_shadow_source: entry.analysis.parser_shadow_source || entry.source,
      normalization_trace: entry.analysis.normalization_trace || [],
      parser_shadow_repairs: parserShadowRepairDisplayRows(entry.analysis),
      parser_shadow_repair_count: normalizationSummary.parser_shadow_repair_count,
      parser_shadow_repair_type_counts: normalizationSummary.parser_shadow_repair_type_counts,
      parser_shadow_repair_note_coverage_status: normalizationSummary.parser_shadow_repair_note_coverage_status,
      missing_shadow_repair_note_count: normalizationSummary.missing_shadow_repair_note_count,
      normalization_review_suggestions: entry.analysis.normalization_review_suggestions || [],
      normalization_review_suggestion_display: normalizationReviewSuggestionDisplayRows(entry.analysis),
      folded_lexical_repairs: foldedLexicalRepairDisplayRows(entry.analysis),
      folded_lexical_repair_count: normalizationSummary.folded_lexical_repair_count,
      normalization_audit_status: normalizationSummary.status,
      normalization_trace_count: normalizationSummary.normalization_trace_count,
      normalization_review_suggestion_count: normalizationSummary.review_suggestion_count,
      unsafe_normalization_count: normalizationSummary.unsafe_normalization_count,
      applied_review_suggestion_count: normalizationSummary.applied_review_suggestion_count,
      raw_display_replacement_count: normalizationSummary.raw_display_replacement_count,
      untraced_shadow_change_count: normalizationSummary.untraced_shadow_change_count,
      raw_display_preservation_status: normalizationSummary.raw_display_preservation_status,
      top_constructions: parseSummary.top_constructions,
      top_child_constructions: parseSummary.top_child_constructions,
      top_child_construction_count: parseSummary.top_child_construction_count,
      context_requirement_status: parseSummary.context_requirement_status,
      antecedent_status: parseSummary.antecedent_status,
      missing_argument_slots: parseSummary.missing_argument_slots,
      context_turn_id: parseSummary.context_turn_id,
      selected_alternative: parseSummary.selected_alternative,
      review_count: parseSummary.review_count,
      parser_active_feature_bundle_count: parseSummary.parser_active_feature_bundle_count,
      semantic_acceptance: parseSummary.semantic_acceptance || null,
      semantic_acceptance_status: parseSummary.semantic_acceptance_status || "REVIEW_REQUIRED",
      semantic_acceptance_blocker_count: parseSummary.semantic_acceptance_blocker_count || 0,
      semantic_acceptance_review_reason_count: parseSummary.semantic_acceptance_review_reason_count || 0,
      semantic_acceptance_outer_wrapper_blocked: Boolean(parseSummary.semantic_acceptance_outer_wrapper_blocked),
      semantic_review_flags: parseSummary.semantic_review_flags || [],
      ...rootSpanCoverageFieldsFromDiagnosticSummary(parseSummary),
      jyutping_audit_status: jyutpingSummary.status,
      missing_jyutping_count: jyutpingSummary.missing_jyutping_count,
      invalid_jyutping_format_count: jyutpingSummary.invalid_jyutping_format_count,
      syllable_count_mismatch_count: jyutpingSummary.syllable_count_mismatch_count,
      dictionary_disagreement_count: jyutpingSummary.dictionary_disagreement_count,
      registry_audit_status: registrySummary.status,
      invalid_learner_role_count: registrySummary.invalid_learner_role_count,
      invalid_slot_name_count: registrySummary.invalid_slot_name_count,
      invalid_construction_label_count: registrySummary.invalid_construction_label_count,
      parser_decision_label_registry_status: registrySummary.parser_decision_label_registry_status,
      invalid_parser_decision_label_count: registrySummary.invalid_parser_decision_label_count,
      learner_display_audit_status: learnerDisplayAuditSummary(entry.analysis).status,
      hidden_internal_slot_reference_count: learnerDisplayAuditSummary(entry.analysis).hidden_internal_slot_reference_count,
      learner_ui_hover_audit_status: learnerUiHoverAuditSummary(entry.analysis).status,
      learner_ui_flagged_hover_target_count: learnerUiHoverAuditSummary(entry.analysis).flagged_hover_target_count,
      learner_ui_missing_plain_gloss_count: learnerUiHoverAuditSummary(entry.analysis).missing_plain_learner_gloss_count,
      wrapper_coverage_audit_status: wrapperCoverageAuditSummary(entry.analysis).status,
      wrapper_coverage_row_count: wrapperCoverageAuditSummary(entry.analysis).wrapper_row_count,
      unaccounted_wrapper_token_count: wrapperCoverageAuditSummary(entry.analysis).unaccounted_wrapper_token_count,
      label_transition_audit_status: labelTransitionAuditSummary(entry.analysis).status,
      label_transition_migration_candidate_count: labelTransitionAuditSummary(entry.analysis).migration_candidate_count,
      label_transition_already_generative_count: labelTransitionAuditSummary(entry.analysis).already_generative_count,
      label_transition_needs_registry_decision_count: labelTransitionAuditSummary(entry.analysis).needs_registry_decision_count,
      runtime_construction_registry_audit_status: runtimeRegistrySummary.status,
      runtime_construction_registry_unique_construction_count: runtimeRegistrySummary.unique_construction_count,
      runtime_construction_registry_active_row_count: runtimeRegistrySummary.active_row_count,
      runtime_construction_registry_unregistered_row_count: runtimeRegistrySummary.unregistered_row_count,
    };
  });
  const normalizationAggregate = renderedSources.reduce((acc, row) => {
    acc.normalization_trace_count += row.normalization_trace_count || 0;
    acc.parser_shadow_repair_count += row.parser_shadow_repair_count || 0;
    acc.missing_shadow_repair_note_count += row.missing_shadow_repair_note_count || 0;
    Object.entries(row.parser_shadow_repair_type_counts || {}).forEach(([key, value]) => {
      acc.parser_shadow_repair_type_counts[key] = (acc.parser_shadow_repair_type_counts[key] || 0) + value;
    });
    acc.review_suggestion_count += row.normalization_review_suggestion_count || 0;
    acc.folded_lexical_repair_count += row.folded_lexical_repair_count || 0;
    acc.unsafe_normalization_count += row.unsafe_normalization_count || 0;
    acc.applied_review_suggestion_count += row.applied_review_suggestion_count || 0;
    acc.raw_display_replacement_count += row.raw_display_replacement_count || 0;
    acc.untraced_shadow_change_count += row.untraced_shadow_change_count || 0;
    if (row.parser_shadow_source && row.parser_shadow_source !== row.source) acc.normalized_source_count += 1;
    if (row.normalization_audit_status && row.normalization_audit_status !== "PASS") {
      acc.warning_rows.push({
        source: row.source,
        parser_shadow_source: row.parser_shadow_source,
        normalization_trace_count: row.normalization_trace_count || 0,
        parser_shadow_repair_count: row.parser_shadow_repair_count || 0,
        parser_shadow_repair_type_counts: row.parser_shadow_repair_type_counts || {},
        missing_shadow_repair_note_count: row.missing_shadow_repair_note_count || 0,
        review_suggestion_count: row.normalization_review_suggestion_count || 0,
        folded_lexical_repair_count: row.folded_lexical_repair_count || 0,
        unsafe_normalization_count: row.unsafe_normalization_count || 0,
        applied_review_suggestion_count: row.applied_review_suggestion_count || 0,
        raw_display_replacement_count: row.raw_display_replacement_count || 0,
        untraced_shadow_change_count: row.untraced_shadow_change_count || 0,
        raw_display_preservation_status: row.raw_display_preservation_status || "",
      });
    }
    return acc;
  }, {
    normalization_trace_count: 0,
    parser_shadow_repair_count: 0,
    parser_shadow_repair_type_counts: {},
    missing_shadow_repair_note_count: 0,
    review_suggestion_count: 0,
    folded_lexical_repair_count: 0,
    normalized_source_count: 0,
    unsafe_normalization_count: 0,
    applied_review_suggestion_count: 0,
    raw_display_replacement_count: 0,
    untraced_shadow_change_count: 0,
    warning_rows: [],
  });
  normalizationAggregate.parser_shadow_repair_note_coverage_status = normalizationAggregate.missing_shadow_repair_note_count ? "WARN" : "PASS";
  normalizationAggregate.raw_display_preservation_status = normalizationAggregate.raw_display_replacement_count ? "WARN" : "PASS";
  normalizationAggregate.status = normalizationAggregate.unsafe_normalization_count ||
    normalizationAggregate.applied_review_suggestion_count ||
    normalizationAggregate.raw_display_replacement_count ||
    normalizationAggregate.untraced_shadow_change_count ||
    normalizationAggregate.missing_shadow_repair_note_count ? "WARN" : "PASS";
  normalizationAggregate.policy = "Normalization audit lane: high-confidence Simplified-to-Traditional parser-shadow changes and narrow one-character pinyin-fallout Cantonese lexical repairs are allowed with trace; raw learner display must not be replaced. parser_shadow_repairs is the comprehensive shadow-repair inventory.";
  normalizationAggregate.review_reminder = diagnosticReviewReminder("normalization_audit");

  const jyutpingAggregate = renderedSources.reduce((acc, row) => {
    acc.missing_jyutping_count += row.missing_jyutping_count || 0;
    acc.invalid_jyutping_format_count += row.invalid_jyutping_format_count || 0;
    acc.syllable_count_mismatch_count += row.syllable_count_mismatch_count || 0;
    acc.dictionary_disagreement_count += row.dictionary_disagreement_count || 0;
    return acc;
  }, {
    missing_jyutping_count: 0,
    invalid_jyutping_format_count: 0,
    syllable_count_mismatch_count: 0,
    dictionary_disagreement_count: 0,
  });
  jyutpingAggregate.status = Object.values(jyutpingAggregate).some((value) => typeof value === "number" && value > 0) ? "WARN" : "PASS";
  const registryAggregate = renderedSources.reduce((acc, row) => {
    acc.invalid_learner_role_count += row.invalid_learner_role_count || 0;
    acc.invalid_slot_name_count += row.invalid_slot_name_count || 0;
    acc.invalid_construction_label_count += row.invalid_construction_label_count || 0;
    acc.invalid_parser_decision_label_count += row.invalid_parser_decision_label_count || 0;
    return acc;
  }, {
    invalid_learner_role_count: 0,
    invalid_slot_name_count: 0,
    invalid_construction_label_count: 0,
    invalid_parser_decision_label_count: 0,
  });
  registryAggregate.learner_role_registry_status = registryAggregate.invalid_learner_role_count ? "WARN" : "PASS";
  registryAggregate.slot_name_registry_status = registryAggregate.invalid_slot_name_count ? "WARN" : "PASS";
  registryAggregate.construction_label_registry_status = registryAggregate.invalid_construction_label_count ? "WARN" : "PASS";
  registryAggregate.parser_decision_label_registry_status = registryAggregate.invalid_parser_decision_label_count ? "WARN" : "PASS";
  registryAggregate.status = registryAggregate.invalid_learner_role_count || registryAggregate.invalid_slot_name_count || registryAggregate.invalid_construction_label_count || registryAggregate.invalid_parser_decision_label_count ? "WARN" : "PASS";
  const learnerDisplayAggregate = renderedSources.reduce((acc, row) => {
    acc.hidden_internal_slot_reference_count += row.hidden_internal_slot_reference_count || 0;
    return acc;
  }, { hidden_internal_slot_reference_count: 0 });
  learnerDisplayAggregate.status = "PASS";
  const learnerUiHoverAggregate = renderedSources.reduce((acc, row) => {
    acc.flagged_hover_target_count += row.learner_ui_flagged_hover_target_count || 0;
    acc.missing_plain_learner_gloss_count += row.learner_ui_missing_plain_gloss_count || 0;
    return acc;
  }, { flagged_hover_target_count: 0, missing_plain_learner_gloss_count: 0 });
  learnerUiHoverAggregate.status = learnerUiHoverAggregate.flagged_hover_target_count || learnerUiHoverAggregate.missing_plain_learner_gloss_count ? "WARN" : "PASS";
  const wrapperCoverageAggregate = renderedSources.reduce((acc, row) => {
    acc.wrapper_row_count += row.wrapper_coverage_row_count || 0;
    acc.unaccounted_wrapper_token_count += row.unaccounted_wrapper_token_count || 0;
    return acc;
  }, { wrapper_row_count: 0, unaccounted_wrapper_token_count: 0 });
  wrapperCoverageAggregate.status = wrapperCoverageAggregate.unaccounted_wrapper_token_count ? "WARN" : "PASS";
  const labelTransitionAggregate = entries.reduce((acc, entry) => {
    const summary = labelTransitionAuditSummary(entry.analysis);
    acc.migration_candidate_count += summary.migration_candidate_count || 0;
    acc.already_generative_count += summary.already_generative_count || 0;
    acc.reviewed_table_or_guardrail_count += summary.reviewed_table_or_guardrail_count || 0;
    acc.needs_registry_decision_count += summary.needs_registry_decision_count || 0;
    for (const [bucket, count] of Object.entries(summary.transition_bucket_counts || {})) {
      acc.transition_bucket_counts[bucket] = (acc.transition_bucket_counts[bucket] || 0) + count;
    }
    for (const [status, count] of Object.entries(summary.transition_status_counts || {})) {
      acc.transition_status_counts[status] = (acc.transition_status_counts[status] || 0) + count;
    }
    acc.recommended_next_promotions.push(...(summary.recommended_next_promotions || []).map((row) => ({
      source: entry.source,
      ...row,
    })));
    return acc;
  }, {
    migration_candidate_count: 0,
    already_generative_count: 0,
    reviewed_table_or_guardrail_count: 0,
    needs_registry_decision_count: 0,
    transition_bucket_counts: {},
    transition_status_counts: {},
    recommended_next_promotions: [],
  });
  labelTransitionAggregate.recommended_next_promotions = labelTransitionAggregate.recommended_next_promotions
    .sort((a, b) => a.transition_priority - b.transition_priority || String(a.construction).localeCompare(String(b.construction)))
    .slice(0, 12);
  labelTransitionAggregate.status = labelTransitionAggregate.needs_registry_decision_count ? "WARN" : "PASS";
  const runtimeConstructionRegistryAggregate = entries.reduce((acc, entry) => {
    const summary = runtimeConstructionRegistryAuditSummary(entry.analysis);
    acc.construction_row_count += summary.construction_row_count || 0;
    acc.active_row_count += summary.active_row_count || 0;
    acc.unregistered_row_count += summary.unregistered_row_count || 0;
    for (const row of summary.unregistered_rows || []) acc.unregistered_rows.push({ source: entry.source, ...row });
    for (const row of runtimeConstructionRegistryAuditRows(entry.analysis)) acc.constructions.add(row.construction);
    return acc;
  }, {
    construction_row_count: 0,
    active_row_count: 0,
    unregistered_row_count: 0,
    unregistered_rows: [],
    constructions: new Set(),
  });
  runtimeConstructionRegistryAggregate.unique_construction_count = runtimeConstructionRegistryAggregate.constructions.size;
  delete runtimeConstructionRegistryAggregate.constructions;
  runtimeConstructionRegistryAggregate.status = runtimeConstructionRegistryAggregate.unregistered_row_count ? "FAIL" : "PASS";
  runtimeConstructionRegistryAggregate.registry_version = RUNTIME_CONSTRUCTION_REGISTRY_VERSION;
  runtimeConstructionRegistryAggregate.policy = "Runtime audit only: emitted construction labels must be active. Linguistic status and evidence are validated from grammar/<linguistic-status>/*.md outside the plugin.";
  const semanticAcceptanceAggregate = renderedSources.reduce((acc, row) => {
    const status = row.semantic_acceptance_status || "REVIEW_REQUIRED";
    acc.status_counts[status] = (acc.status_counts[status] || 0) + 1;
    acc.blocker_count += row.semantic_acceptance_blocker_count || 0;
    acc.review_reason_count += row.semantic_acceptance_review_reason_count || 0;
    if (row.semantic_acceptance_outer_wrapper_blocked) acc.outer_wrapper_blocked_count += 1;
    const guard = row.semantic_acceptance || {};
    for (const blocker of guard.blockers || []) {
      if (blocker && blocker.code) acc.blocker_code_counts[blocker.code] = (acc.blocker_code_counts[blocker.code] || 0) + 1;
    }
    for (const reason of guard.review_reasons || []) {
      if (reason && reason.code) acc.review_code_counts[reason.code] = (acc.review_code_counts[reason.code] || 0) + 1;
    }
    return acc;
  }, {
    status_counts: {},
    blocker_count: 0,
    review_reason_count: 0,
    outer_wrapper_blocked_count: 0,
    blocker_code_counts: {},
    review_code_counts: {},
  });
  semanticAcceptanceAggregate.automatic_acceptance_count = 0;
  semanticAcceptanceAggregate.policy = "Semantic-acceptance status is an explicit review gate, not parser success. BLOCKED and REVIEW_REQUIRED rows cannot be accepted automatically; MANUAL_REVIEW_ELIGIBLE rows still require human semantic review.";

  return {
    runtime_version: CANTO_SPAN_RUNTIME_VERSION,
    status: runtimeConstructionRegistryAggregate.status === "FAIL" ? "FAIL" : (errors.length || directiveWarnings.length || expectedFenceOpeners !== blocks.length || normalizationAggregate.status === "WARN" || registryAggregate.status === "WARN" || wrapperCoverageAggregate.status === "WARN" ? "WARN" : "PASS"),
    normalization_audit_status: normalizationAggregate.status,
    normalization_audit: normalizationAggregate,
    jyutping_audit_status: jyutpingAggregate.status,
    jyutping_audit: jyutpingAggregate,
    registry_audit_status: registryAggregate.status,
    registry_audit: registryAggregate,
    learner_display_audit_status: learnerDisplayAggregate.status,
    learner_display_audit: learnerDisplayAggregate,
    learner_ui_hover_audit_status: learnerUiHoverAggregate.status,
    learner_ui_hover_audit: learnerUiHoverAggregate,
    wrapper_coverage_audit_status: wrapperCoverageAggregate.status,
    wrapper_coverage_audit: wrapperCoverageAggregate,
    label_transition_audit_status: labelTransitionAggregate.status,
    label_transition_audit: labelTransitionAggregate,
    runtime_construction_registry_audit_status: runtimeConstructionRegistryAggregate.status,
    runtime_construction_registry_audit: runtimeConstructionRegistryAggregate,
    semantic_acceptance_gate: semanticAcceptanceAggregate,
    canto_span_fence_openers_found: expectedFenceOpeners,
    canto_span_blocks_parsed: blocks.length,
    source_lines_with_diagnostics: entries.length,
    generated_diagnostics: entries.length,
    context_directive_count: contextDirectives.length,
    context_linked_source_count: entries.filter((entry) => Boolean(entry.context_directive)).length,
    context_directive_warnings: directiveWarnings,
    context_directives: contextDirectives,
    unique_sources: sourceCounts.size,
    duplicate_source_count: duplicateSources.length,
    duplicate_sources: duplicateSources,
    extraction_warnings: expectedFenceOpeners !== blocks.length
      ? [`Found ${expectedFenceOpeners} canto-span fence opener(s), but parsed ${blocks.length} closed block(s). Check for an unclosed fence.`]
      : [],
    diagnostic_errors: errors,
    rendered_sources: renderedSources,
  };
}

function coverageRenderedSourceDisplayRow(row) {
  const out = {
    block_index: row.block_index,
    block_start_line: row.block_start_line,
    source_line_index: row.source_line_index,
    source: row.source,
    context_directive: row.context_directive || null,
    explicit_context: row.explicit_context || { supplied: false, turns: [] },
    parser_shadow_source: row.parser_shadow_source,
    normalization_trace: row.normalization_trace || [],
    parser_shadow_repairs: row.parser_shadow_repairs || [],
    parser_shadow_repair_count: row.parser_shadow_repair_count || 0,
    parser_shadow_repair_type_counts: row.parser_shadow_repair_type_counts || {},
    parser_shadow_repair_note_coverage_status: row.parser_shadow_repair_note_coverage_status || "PASS",
    missing_shadow_repair_note_count: row.missing_shadow_repair_note_count || 0,
    normalization_review_suggestions: row.normalization_review_suggestions || [],
    normalization_review_suggestion_display: row.normalization_review_suggestion_display || [],
    folded_lexical_repairs: row.folded_lexical_repairs || [],
    folded_lexical_repair_count: row.folded_lexical_repair_count || 0,
    normalization_audit_status: row.normalization_audit_status,
    normalization_trace_count: row.normalization_trace_count || 0,
    normalization_review_suggestion_count: row.normalization_review_suggestion_count || 0,
    unsafe_normalization_count: row.unsafe_normalization_count || 0,
    applied_review_suggestion_count: row.applied_review_suggestion_count || 0,
    raw_display_replacement_count: row.raw_display_replacement_count || 0,
    untraced_shadow_change_count: row.untraced_shadow_change_count || 0,
    raw_display_preservation_status: row.raw_display_preservation_status || "",
    top_constructions: row.top_constructions,
    top_child_constructions: row.top_child_constructions,
    top_child_construction_count: row.top_child_construction_count,
    review_count: row.review_count,
    parser_active_feature_bundle_count: row.parser_active_feature_bundle_count,
    semantic_acceptance: row.semantic_acceptance || null,
    semantic_acceptance_status: row.semantic_acceptance_status || "REVIEW_REQUIRED",
    semantic_acceptance_blocker_count: row.semantic_acceptance_blocker_count || 0,
    semantic_acceptance_review_reason_count: row.semantic_acceptance_review_reason_count || 0,
    semantic_acceptance_outer_wrapper_blocked: Boolean(row.semantic_acceptance_outer_wrapper_blocked),
    runtime_construction_registry_audit_status: row.runtime_construction_registry_audit_status || "PASS",
    runtime_construction_registry_unique_construction_count: row.runtime_construction_registry_unique_construction_count || 0,
    runtime_construction_registry_active_row_count: row.runtime_construction_registry_active_row_count || 0,
    runtime_construction_registry_unregistered_row_count: row.runtime_construction_registry_unregistered_row_count || 0,
    ...rootSpanCoverageFieldsFromDiagnosticSummary(row),
  };
  const semanticFlags = semanticReviewFlagsForSummary(row);
  if (semanticFlags.length) out.semantic_review_flags = semanticFlags;
  const auditFindings = {};
  if (row.normalization_audit_status && row.normalization_audit_status !== "PASS") {
    auditFindings.normalization = {
      status: row.normalization_audit_status,
      normalization_trace_count: row.normalization_trace_count || 0,
      parser_shadow_repair_count: row.parser_shadow_repair_count || 0,
      parser_shadow_repair_type_counts: row.parser_shadow_repair_type_counts || {},
      missing_shadow_repair_note_count: row.missing_shadow_repair_note_count || 0,
      review_suggestion_count: row.normalization_review_suggestion_count || 0,
      unsafe_normalization_count: row.unsafe_normalization_count || 0,
      applied_review_suggestion_count: row.applied_review_suggestion_count || 0,
      raw_display_replacement_count: row.raw_display_replacement_count || 0,
      untraced_shadow_change_count: row.untraced_shadow_change_count || 0,
      raw_display_preservation_status: row.raw_display_preservation_status || "",
    };
  }
  if (row.jyutping_audit_status && row.jyutping_audit_status !== "PASS") {
    auditFindings.jyutping = {
      status: row.jyutping_audit_status,
      missing_jyutping_count: row.missing_jyutping_count,
      invalid_jyutping_format_count: row.invalid_jyutping_format_count,
      syllable_count_mismatch_count: row.syllable_count_mismatch_count,
      dictionary_disagreement_count: row.dictionary_disagreement_count,
    };
  }
  if (row.registry_audit_status && row.registry_audit_status !== "PASS") {
    auditFindings.registry = {
      status: row.registry_audit_status,
      invalid_learner_role_count: row.invalid_learner_role_count,
      invalid_slot_name_count: row.invalid_slot_name_count,
      invalid_construction_label_count: row.invalid_construction_label_count,
      invalid_parser_decision_label_count: row.invalid_parser_decision_label_count,
    };
  }
  if (row.learner_display_audit_status && row.learner_display_audit_status !== "PASS") {
    auditFindings.learner_display = { status: row.learner_display_audit_status };
  }
  if (row.learner_ui_hover_audit_status && row.learner_ui_hover_audit_status !== "PASS") {
    auditFindings.learner_ui_hover = {
      status: row.learner_ui_hover_audit_status,
      flagged_hover_target_count: row.learner_ui_flagged_hover_target_count,
      missing_plain_gloss_count: row.learner_ui_missing_plain_gloss_count,
    };
  }
  if (row.wrapper_coverage_audit_status && row.wrapper_coverage_audit_status !== "PASS") {
    auditFindings.wrapper_coverage = {
      status: row.wrapper_coverage_audit_status,
      wrapper_coverage_row_count: row.wrapper_coverage_row_count,
      unaccounted_wrapper_token_count: row.unaccounted_wrapper_token_count,
    };
  }
  if (row.label_transition_audit_status && row.label_transition_audit_status !== "PASS") {
    auditFindings.label_transition = {
      status: row.label_transition_audit_status,
      migration_candidate_count: row.label_transition_migration_candidate_count,
      needs_registry_decision_count: row.label_transition_needs_registry_decision_count,
    };
  }
  if (row.runtime_construction_registry_audit_status && row.runtime_construction_registry_audit_status !== "PASS") {
    auditFindings.runtime_construction_registry = {
      status: row.runtime_construction_registry_audit_status,
      unique_construction_count: row.runtime_construction_registry_unique_construction_count || 0,
      active_row_count: row.runtime_construction_registry_active_row_count || 0,
      unregistered_row_count: row.runtime_construction_registry_unregistered_row_count || 0,
    };
  }
  if (Object.keys(auditFindings).length) out.audit_findings = auditFindings;
  return out;
}

function diagnosticCoverageDisplaySummary(summary) {
  const renderedSources = (summary.rendered_sources || []).map(coverageRenderedSourceDisplayRow);
  const semanticReviewCandidates = renderedSources.filter((row) => row.semantic_review_flags && row.semantic_review_flags.length);
  const auditFindings = {};
  if (summary.normalization_audit_status && summary.normalization_audit_status !== "PASS") auditFindings.normalization = summary.normalization_audit;
  if (summary.jyutping_audit_status && summary.jyutping_audit_status !== "PASS") auditFindings.jyutping = summary.jyutping_audit;
  if (summary.registry_audit_status && summary.registry_audit_status !== "PASS") auditFindings.registry = summary.registry_audit;
  if (summary.learner_display_audit_status && summary.learner_display_audit_status !== "PASS") auditFindings.learner_display = summary.learner_display_audit;
  if (summary.learner_ui_hover_audit_status && summary.learner_ui_hover_audit_status !== "PASS") auditFindings.learner_ui_hover = summary.learner_ui_hover_audit;
  if (summary.wrapper_coverage_audit_status && summary.wrapper_coverage_audit_status !== "PASS") auditFindings.wrapper_coverage = summary.wrapper_coverage_audit;
  if (summary.label_transition_audit_status && summary.label_transition_audit_status !== "PASS") auditFindings.label_transition = summary.label_transition_audit;
  if (summary.runtime_construction_registry_audit_status && summary.runtime_construction_registry_audit_status !== "PASS") auditFindings.runtime_construction_registry = summary.runtime_construction_registry_audit;
  const noteWarnings = [];
  if (summary.duplicate_source_count) noteWarnings.push({ kind: "duplicate_sources", duplicate_source_count: summary.duplicate_source_count, duplicate_sources: summary.duplicate_sources || [] });
  if ((summary.extraction_warnings || []).length) noteWarnings.push({ kind: "extraction_warnings", warnings: summary.extraction_warnings });
  if ((summary.diagnostic_errors || []).length) noteWarnings.push({ kind: "diagnostic_errors", errors: summary.diagnostic_errors });
  if ((summary.context_directive_warnings || []).length) noteWarnings.push({ kind: "context_directive_warnings", warnings: summary.context_directive_warnings });
  const out = {
    runtime_version: summary.runtime_version || CANTO_SPAN_RUNTIME_VERSION,
    policy: "Audit-detail policy: detailed PASS payloads are omitted, but audit-specific review reminders always surface. This inventory is not semantic acceptance; review normalization audit status, top_constructions, semantic_review_candidates, learner roles, and hover/gloss findings before choosing a patch.",
    review_reminders: diagnosticReviewReminderSummary([
      "coverage",
      "normalization",
      "normalization_audit",
      "jyutping",
      "registry",
      "learner_display",
      "learner_ui_hover",
      "wrapper_coverage",
      "label_transition",
      "runtime_construction_registry",
    ]),
    canto_span_fence_openers_found: summary.canto_span_fence_openers_found,
    canto_span_blocks_parsed: summary.canto_span_blocks_parsed,
    source_lines_with_diagnostics: summary.source_lines_with_diagnostics,
    generated_diagnostics: summary.generated_diagnostics,
    context_directive_count: summary.context_directive_count || 0,
    context_linked_source_count: summary.context_linked_source_count || 0,
    context_directives: summary.context_directives || [],
    unique_sources: summary.unique_sources,
    rendered_sources: renderedSources,
  };
  if (Object.keys(auditFindings).length) out.actionable_audit_findings = auditFindings;
  if (noteWarnings.length) out.diagnostic_note_warnings = noteWarnings;
  if (semanticReviewCandidates.length) out.semantic_review_candidates = semanticReviewCandidates;
  out.final_review_reminder = "Final inventory reminder: regardless of PASS/WARN/FAIL state, inspect coverage counts, rendered sources, semantic-review candidates, parser-shadow normalization, top constructions, learner roles, and audit-specific reminders before accepting the note.";
  return out;
}

function formatDiagnosticCoverageMarkdown(summary) {
  return [
    "Diagnostic inventory",
    formatJsonBlock(diagnosticCoverageDisplaySummary(summary)),
  ].join("\n");
}

function formatDiagnosticMarkdownForBlockSource(source) {
  const options = parseBlockOptions(source);
  return options.entries
    .map((entry) => ({ line: entry.line, analysis: analyzeLine(entry.line, entry.context) }))
    .filter((entry) => normalizeSurface(entry.line))
    .map((entry) => formatDiagnosticMarkdown(entry.analysis))
    .join("\n\n---\n\n");
}

function formatDiagnosticMarkdownForNote(markdown) {
  const collected = collectCantoSpanDiagnosticEntries(markdown);
  const coverage = noteDiagnosticCoverageSummary(markdown, collected);
  const diagnostics = collected.entries.map((entry) => formatDiagnosticMarkdown(entry.analysis));
  const parts = [formatDiagnosticCoverageMarkdown(coverage)];
  if (diagnostics.length) parts.push(diagnostics.join("\n\n---\n\n"));
  return parts.join("\n\n---\n\n");
}

function diagnosticFullJsonPayloadForNote(markdown, notePath = "", metadata = {}) {
  const collected = collectCantoSpanDiagnosticEntries(markdown);
  const coverage = noteDiagnosticCoverageSummary(markdown, collected);
  return {
    schema: "canto-span-note-full-diagnostics-json-v1",
    artifact_kind: "full_diagnostics",
    runtime_version: CANTO_SPAN_RUNTIME_VERSION,
    generated_at: metadata.generated_at || new Date().toISOString(),
    export_id: metadata.export_id || "",
    note_path: notePath || "",
    companion_acceptance_summary_path: metadata.summary_path || "",
    coverage,
    diagnostic_errors: collected.errors || [],
    diagnostics: collected.entries.map((entry, diagnosticIndex) => {
      const analysis = entry.analysis;
      return {
        diagnostic_index: diagnosticIndex,
        block_index: entry.block_index,
        block_start_line: entry.block_start_line,
        block_end_line: entry.block_end_line,
        source_line_index: entry.source_line_index,
        source: entry.source,
        context_directive: entry.context_directive || null,
        explicit_context: analysis.explicit_context || { supplied: false, turns: [] },
        parser_shadow_source: analysis.parser_shadow_source || entry.source,
        summary: diagnosticSummary(analysis),
        normalization_audit: normalizationAuditSummary(analysis),
        parser_shadow_repairs: parserShadowRepairDisplayRows(analysis),
        folded_lexical_repairs: foldedLexicalRepairDisplayRows(analysis),
        normalization_review_suggestions: normalizationReviewSuggestionDisplayRows(analysis),
        jyutping_audit: jyutpingAuditSummary(analysis),
        registry_audit: registryAuditSummary(analysis),
        learner_display_audit: learnerDisplayAuditSummary(analysis),
        learner_ui_hover_audit: learnerUiHoverAuditSummary(analysis),
        learner_ui_hover_rows: learnerUiHoverAuditRows(analysis),
        wrapper_coverage_audit: wrapperCoverageAuditSummary(analysis),
        wrapper_coverage_warning_rows: nonPassWrapperCoverageRows(analysis),
        label_transition_audit: labelTransitionAuditSummary(analysis),
        label_transition_warning_rows: nonPassLabelTransitionRows(analysis),
        runtime_construction_registry_audit: runtimeConstructionRegistryAuditSummary(analysis),
        runtime_construction_registry_warning_rows: nonPassRuntimeConstructionRegistryRows(analysis),
        tokenization_before_construction_wrapping: diagnosticTokenRows(analysis),
        final_construction_tree: diagnosticFinalRows(analysis),
        legend: diagnosticLegend(),
        diagnostic_markdown: formatDiagnosticMarkdown(analysis),
      };
    }),
    final_review_reminder: "Full diagnostic artifact: use it whenever the acceptance summary marks a row for full review, and spot-check it whenever the compact structure or learner roles look suspicious.",
  };
}

// Backward-compatible internal alias. The Save diagnostics JSON action now writes
// this payload to the explicit full-diagnostics companion file.
function diagnosticJsonPayloadForNote(markdown, notePath = "", metadata = {}) {
  return diagnosticFullJsonPayloadForNote(markdown, notePath, metadata);
}

function compactRoleOverridesForAcceptance(roleOverrides) {
  const out = {};
  for (const [slot, value] of Object.entries(roleOverrides || {})) {
    const row = value || {};
    out[slot] = {
      label: row.label || "",
      syntax: row.syntax || "",
      slots: row.slots || [],
    };
  }
  return out;
}

function compactContextualAffordancesForAcceptance(affordances) {
  return (affordances || []).map((row) => ({
    role: row.role || "",
    slot: row.slot || "",
    source: row.source || "",
    active_before_construction_wrapping: Boolean(row.active_before_construction_wrapping),
    active_in_final_construction: Boolean(row.active_in_final_construction),
    activated_by: row.activated_by || "",
  }));
}

function compactTraceDetailForAcceptance(row) {
  const detail = (row && row.trace_detail) || {};
  if (!Object.keys(detail).length) return null;
  const out = {};
  const scalarKeys = [
    "kind",
    "construction_type",
    "template_family",
    "subspan",
    "np_subtype",
    "fragment_subtype",
    "context_requirement_status",
    "antecedent_status",
    "context_turn_id",
    "question_id",
    "antecedent_span",
    "selected_alternative",
    "ambiguity_resolution_status",
    "conventional_unit_value_minutes",
    "approximation_scope",
    "approximation_marker_surface",
    "object_semantics",
    "head_recovery_status",
    "contextual_role_override",
    "original_role",
    "particle_cluster",
    "particle_cluster_root",
    "particle_cluster_member_index",
    "particle_cluster_member_count",
    "current_particle_surface",
    "current_scope_layer",
    "current_scope_function",
    "scope_direction",
    "surface_order_preserved",
    "cluster_order_status",
    "cluster_evidence_grade",
    "cluster_evidence_note",
    "fusion_status",
    "tone_certainty",
    "outer_particle_surface",
    "outer_scope_layer",
    "outer_scope_function",
    "host_construction",
    "learner_display_structure",
    "host_surface",
    "punctuation_hint",
    "subject_status",
    "subjectless_type",
    "hidden_subject_inserted",
    "environmental_subtype",
    "location_relation",
    "existential_subtype",
    "polarity",
    "have_relation",
    "locative_frame_subtype",
    "introduced_theme_surface",
    "introduced_participant_surface",
    "presentational_coda_surface",
    "nominal_predicate_type",
    "copula_status",
    "subject_surface",
    "predicate_surface",
    "measure_domain",
    "quantity_surface",
    "unit_surface",
    "dimension_surface",
    "passive_subtype",
    "participant_surface",
    "postmarker_participant_surface",
    "retained_patient_candidate_surface",
    "reason",
  ];
  for (const key of scalarKeys) {
    if (detail[key] !== undefined && detail[key] !== "" && detail[key] !== null) out[key] = detail[key];
  }
  const arrayKeys = [
    "template",
    "assigned_slots",
    "surfaces",
    "missing_argument_slots",
    "missing_slot_details",
    "ambiguity_set",
    "not_claims",
    "reading_candidates",
    "semantic_review_flags",
    "learner_gloss_lines",
    "generated_slots",
    "visible_particle_sequence",
    "particle_sequence_jyutping",
    "particle_scope_layers",
    "particle_scope_functions",
  ];
  for (const key of arrayKeys) {
    if (Array.isArray(detail[key]) && detail[key].length) out[key] = detail[key];
  }
  if (detail.constraints && Object.keys(detail.constraints).length) out.constraints = detail.constraints;
  if (detail.role_overrides && Object.keys(detail.role_overrides).length) {
    out.role_overrides = compactRoleOverridesForAcceptance(detail.role_overrides);
  }
  const resolution = detail.contextual_role_affordance_resolution || {};
  if (Object.keys(resolution).length) {
    out.role_resolution = {
      lexical_default_role: resolution.lexical_default_role || "",
      active_role: resolution.active_role || "",
      active_affordance_source: resolution.active_affordance_source || "",
    };
  }
  const selection = detail.selection_decision || {};
  const excluded = selection.excluded_compositional_candidates || [];
  if (selection.chosen_registry_kind || excluded.length || selection.forced_compositional) {
    out.selection_decision = {
      rule: selection.rule || "",
      chosen: selection.chosen || "",
      chosen_registry_kind: selection.chosen_registry_kind || "",
      chosen_score: selection.chosen_score,
      forced_compositional: Boolean(selection.forced_compositional),
      excluded_compositional_candidates: excluded,
    };
  }
  return Object.keys(out).length ? out : null;
}

function compactFinalTreeForAcceptance(rows) {
  return (rows || []).map((row) => {
    const out = {
      depth: row.depth,
      parent: row.parent || "",
      surface: row.surface || "",
      kind: row.kind || "",
      trace: row.trace || "",
    };
    if (row.display_surface && row.display_surface !== row.surface) out.display_surface = row.display_surface;
    if (row.parser_surface && row.parser_surface !== row.surface) out.parser_surface = row.parser_surface;
    if (row.construction) out.construction = row.construction;
    if (row.label) out.label = row.label;
    if (row.role) out.role = row.role;
    if (row.syntax) out.syntax = row.syntax;
    if (row.jyutping) out.jyutping = row.jyutping;
    if ((row.slots || []).length) out.slots = row.slots;
    if ((row.learner_display_slots || []).length) out.learner_display_slots = row.learner_display_slots;
    if ((row.internal_slots_hidden_from_learner_display || []).length) {
      out.internal_slots_hidden_from_learner_display = row.internal_slots_hidden_from_learner_display;
    }
    const affordances = compactContextualAffordancesForAcceptance(row.contextual_role_affordances);
    if (affordances.length) out.contextual_role_affordances = affordances;
    const traceDetail = compactTraceDetailForAcceptance(row);
    if (traceDetail) out.trace_detail = traceDetail;
    if (row.runtime_registry) out.runtime_registry = { active: Boolean(row.runtime_registry.active) };
    return out;
  });
}

function auditStatusesForAcceptanceDiagnostic(diagnostic) {
  return {
    normalization: (diagnostic.normalization_audit && diagnostic.normalization_audit.status) || "PASS",
    jyutping: (diagnostic.jyutping_audit && diagnostic.jyutping_audit.status) || "PASS",
    registry: (diagnostic.registry_audit && diagnostic.registry_audit.status) || "PASS",
    learner_display: (diagnostic.learner_display_audit && diagnostic.learner_display_audit.status) || "PASS",
    learner_ui_hover: (diagnostic.learner_ui_hover_audit && diagnostic.learner_ui_hover_audit.status) || "PASS",
    wrapper_coverage: (diagnostic.wrapper_coverage_audit && diagnostic.wrapper_coverage_audit.status) || "PASS",
    label_transition: (diagnostic.label_transition_audit && diagnostic.label_transition_audit.status) || "PASS",
    runtime_construction_registry: (diagnostic.runtime_construction_registry_audit && diagnostic.runtime_construction_registry_audit.status) || "PASS",
  };
}

function fullReviewReasonsForAcceptanceDiagnostic(diagnostic, compactTree, auditStatuses) {
  const summary = diagnostic.summary || {};
  const reasons = [];
  const top = summary.top_constructions || [];
  const semanticFlags = summary.semantic_review_flags || [];
  if (summary.semantic_acceptance_status === "BLOCKED") reasons.push("semantic_acceptance_blocked");
  if (summary.semantic_acceptance_status === "REVIEW_REQUIRED") reasons.push("semantic_acceptance_review_required");
  if (summary.semantic_acceptance_outer_wrapper_blocked) reasons.push("outer_wrapper_contains_semantic_blocker");
  if (!top.length) reasons.push("no_top_construction");
  if (top.length > 1) reasons.push("multiple_top_constructions");
  if ((summary.top_child_construction_count || 0) > 0
      || (compactTree || []).some((row) => row.kind === "construction" && row.trace_detail && row.trace_detail.particle_cluster)) {
    reasons.push("nested_or_wrapper_structure");
  }
  if ((summary.review_count || 0) > 0) reasons.push("review_trace_present");
  if (semanticFlags.length) reasons.push(...semanticFlags.map((flag) => `semantic:${flag}`));
  if ((summary.missing_argument_slots || []).length) reasons.push("missing_argument_slots");
  if (summary.context_requirement_status && summary.context_requirement_status !== "context_not_required") {
    reasons.push(`context:${summary.context_requirement_status}`);
  }
  if (summary.selected_alternative) reasons.push("ambiguity_or_alternative_selected");
  if ((summary.parser_active_feature_bundle_count || 0) > 0) reasons.push("parser_active_feature_bundle");
  if ((summary.normalization_trace || []).length) reasons.push("normalization_trace_present");
  if ((summary.parser_shadow_repairs || []).length) reasons.push("parser_shadow_repairs_present");
  if ((summary.folded_lexical_repairs || []).length) reasons.push("folded_lexical_repairs_present");
  if ((summary.normalization_review_suggestions || []).length) reasons.push("normalization_review_suggestions_present");
  for (const [name, status] of Object.entries(auditStatuses || {})) {
    if (status !== "PASS") reasons.push(`audit:${name}:${status}`);
  }
  const reviewTraceKinds = new Set([
    "legacy_surface_rule",
    "surface_specific_phrase_rule",
    "special_ambiguity_rule",
    "protected_formula_table",
    "construction_template",
    "governed_discourse_wrapper",
  ]);
  for (const row of compactTree || []) {
    if (reviewTraceKinds.has(row.trace)) reasons.push(`trace:${row.trace}`);
    const detail = row.trace_detail || {};
    const roleResolution = detail.role_resolution || {};
    if (roleResolution.lexical_default_role && roleResolution.active_role && roleResolution.lexical_default_role !== roleResolution.active_role) {
      reasons.push("contextual_role_change");
    }
    if (roleResolution.lexical_default_role || roleResolution.active_role) {
      const affordances = row.contextual_role_affordances || [];
      const lexicalRows = affordances.filter((item) => item.source === "lexical_default");
      const activeRows = affordances.filter((item) => item.active_in_final_construction);
      const lexicalDefaultMissing = roleResolution.lexical_default_role
        && !lexicalRows.some((item) => item.role === roleResolution.lexical_default_role);
      const activeMislabelledAsLexical = roleResolution.active_role
        && roleResolution.active_role !== roleResolution.lexical_default_role
        && lexicalRows.some((item) => item.role === roleResolution.active_role);
      const activeProvenanceMissing = roleResolution.active_role
        && !activeRows.some((item) => item.role === roleResolution.active_role);
      if (lexicalDefaultMissing || activeMislabelledAsLexical || activeProvenanceMissing) {
        reasons.push("contextual_role_provenance_mismatch");
      }
    }
    if (detail.selection_decision) reasons.push("lexical_selection_decision");
  }
  return Array.from(new Set(reasons));
}

function acceptanceCoverageFromFull(fullPayload) {
  const coverage = fullPayload.coverage || {};
  return {
    status: coverage.status || "PASS",
    runtime_version: coverage.runtime_version || fullPayload.runtime_version || CANTO_SPAN_RUNTIME_VERSION,
    canto_span_fence_openers_found: coverage.canto_span_fence_openers_found || 0,
    canto_span_blocks_parsed: coverage.canto_span_blocks_parsed || 0,
    source_lines_with_diagnostics: coverage.source_lines_with_diagnostics || 0,
    generated_diagnostics: coverage.generated_diagnostics || 0,
    context_directive_count: coverage.context_directive_count || 0,
    context_linked_source_count: coverage.context_linked_source_count || 0,
    context_directives: coverage.context_directives || [],
    unique_sources: coverage.unique_sources || 0,
    duplicate_source_count: coverage.duplicate_source_count || 0,
    duplicate_sources: coverage.duplicate_sources || [],
    extraction_warnings: coverage.extraction_warnings || [],
    diagnostic_errors: coverage.diagnostic_errors || [],
    context_directive_warnings: coverage.context_directive_warnings || [],
    audit_statuses: {
      normalization: coverage.normalization_audit_status || "PASS",
      jyutping: coverage.jyutping_audit_status || "PASS",
      registry: coverage.registry_audit_status || "PASS",
      learner_display: coverage.learner_display_audit_status || "PASS",
      learner_ui_hover: coverage.learner_ui_hover_audit_status || "PASS",
      wrapper_coverage: coverage.wrapper_coverage_audit_status || "PASS",
      label_transition: coverage.label_transition_audit_status || "PASS",
      runtime_construction_registry: coverage.runtime_construction_registry_audit_status || "PASS",
    },
    audit_aggregates: {
      normalization: coverage.normalization_audit || {},
      jyutping: coverage.jyutping_audit || {},
      registry: coverage.registry_audit || {},
      learner_display: coverage.learner_display_audit || {},
      learner_ui_hover: coverage.learner_ui_hover_audit || {},
      wrapper_coverage: coverage.wrapper_coverage_audit || {},
      label_transition: coverage.label_transition_audit || {},
      runtime_construction_registry: coverage.runtime_construction_registry_audit || {},
      semantic_acceptance: coverage.semantic_acceptance_gate || {},
    },
  };
}

function diagnosticAcceptanceSummaryPayloadFromFull(fullPayload, metadata = {}) {
  const rows = (fullPayload.diagnostics || []).map((diagnostic, diagnosticIndex) => {
    const compactTree = compactFinalTreeForAcceptance(diagnostic.final_construction_tree || []);
    const auditStatuses = auditStatusesForAcceptanceDiagnostic(diagnostic);
    const reasons = fullReviewReasonsForAcceptanceDiagnostic(diagnostic, compactTree, auditStatuses);
    const summary = diagnostic.summary || {};
    return {
      diagnostic_index: diagnostic.diagnostic_index !== undefined ? diagnostic.diagnostic_index : diagnosticIndex,
      block_index: diagnostic.block_index,
      block_start_line: diagnostic.block_start_line,
      block_end_line: diagnostic.block_end_line,
      source_line_index: diagnostic.source_line_index,
      source: diagnostic.source,
      context_directive: diagnostic.context_directive || null,
      explicit_context: diagnostic.explicit_context || { supplied: false, turns: [] },
      parser_shadow_source: diagnostic.parser_shadow_source || diagnostic.source,
      raw_display_preservation_status: (diagnostic.normalization_audit && diagnostic.normalization_audit.raw_display_preservation_status) || "PASS",
      normalization_trace: summary.normalization_trace || [],
      parser_shadow_repairs: diagnostic.parser_shadow_repairs || [],
      folded_lexical_repairs: diagnostic.folded_lexical_repairs || [],
      normalization_review_suggestions: diagnostic.normalization_review_suggestions || [],
      top_constructions: summary.top_constructions || [],
      top_child_constructions: summary.top_child_constructions || [],
      trace_summary: summary.trace_summary || {},
      template_family_summary: summary.template_family_summary || {},
      review_count: summary.review_count || 0,
      parser_active_feature_bundle_count: summary.parser_active_feature_bundle_count || 0,
      context: {
        requirement_status: summary.context_requirement_status || "context_not_required",
        antecedent_status: summary.antecedent_status || "not_applicable",
        missing_argument_slots: summary.missing_argument_slots || [],
        context_turn_id: summary.context_turn_id || "",
        question_id: summary.question_id || "",
        antecedent_span: summary.antecedent_span || "",
        selected_alternative: summary.selected_alternative || "",
      },
      semantic_review_flags: summary.semantic_review_flags || [],
      semantic_acceptance: summary.semantic_acceptance || null,
      semantic_acceptance_status: summary.semantic_acceptance_status || "REVIEW_REQUIRED",
      semantic_acceptance_blocker_count: summary.semantic_acceptance_blocker_count || 0,
      semantic_acceptance_review_reason_count: summary.semantic_acceptance_review_reason_count || 0,
      semantic_acceptance_outer_wrapper_blocked: Boolean(summary.semantic_acceptance_outer_wrapper_blocked),
      topic_chain: summary.topic_chain_id ? {
        id: summary.topic_chain_id,
        status: summary.topic_chain_status || "",
        antecedent_surface: summary.topic_antecedent_surface || "",
        antecedent_source: summary.topic_antecedent_source || "",
        antecedent_semantic_domains: summary.topic_antecedent_semantic_domains || [],
        topic_frame_status: summary.topic_frame_status || "",
        topic_frame_linker_surface: summary.topic_frame_linker_surface || "",
        topic_frame_domain_surface: summary.topic_frame_domain_surface || "",
        relational_frame_status: summary.relational_frame_status || "",
        relational_coverb_linker_surface: summary.relational_coverb_linker_surface || "",
        relational_coverb_domain_surface: summary.relational_coverb_domain_surface || "",
        linked_null_object_count: summary.linked_null_object_count || 0,
        linked_predicate_surfaces: summary.linked_predicate_surfaces || [],
        unresolved_predicate_surfaces: summary.unresolved_predicate_surfaces || [],
        null_object_link: summary.null_object_link || "",
      } : null,
      particle_cluster: summary.particle_cluster_order_status ? {
        order_status: summary.particle_cluster_order_status,
        visible_sequence: summary.visible_particle_sequence || [],
        scope_layers: summary.particle_scope_layers || [],
        scope_functions: summary.particle_scope_functions || [],
        scope_direction: summary.particle_cluster_scope_direction || "",
        fusion_status: summary.particle_cluster_fusion_status || "",
      } : null,
      root_span_coverage: rootSpanCoverageObjectFromDiagnosticSummary(summary),
      audit_statuses: auditStatuses,
      compact_final_construction_tree: compactTree,
      full_review: {
        required: reasons.length > 0,
        reasons,
        full_diagnostics_path: metadata.full_path || fullPayload.companion_full_diagnostics_path || "",
        full_diagnostic_index: diagnostic.diagnostic_index !== undefined ? diagnostic.diagnostic_index : diagnosticIndex,
      },
    };
  });
  const rowsRequiringFullReview = rows
    .filter((row) => row.full_review.required)
    .map((row) => ({
      diagnostic_index: row.diagnostic_index,
      source: row.source,
      reasons: row.full_review.reasons,
    }));
  return {
    schema: "canto-span-note-acceptance-summary-json-v1",
    artifact_kind: "acceptance_summary",
    runtime_version: fullPayload.runtime_version || CANTO_SPAN_RUNTIME_VERSION,
    generated_at: fullPayload.generated_at || metadata.generated_at || new Date().toISOString(),
    export_id: fullPayload.export_id || metadata.export_id || "",
    note_path: fullPayload.note_path || "",
    companion_full_diagnostics_path: metadata.full_path || "",
    inspection_policy: {
      summary_is_not_semantic_acceptance: true,
      row_coverage_guarantee: "Every generated diagnostic has exactly one summary row with compact final structure, learner roles, Jyutping, context state, audit statuses, and a pointer into the full artifact.",
      required_process: [
        "Inspect every summary row, not only rows marked for full review.",
        "Open the matching full diagnostic whenever full_review.required is true.",
        "Open the matching full diagnostic whenever compact structure, role assignment, Jyutping, context linkage, doctrine fit, or runtime-label registration looks suspicious even if no trigger fired.",
        "Spot-check at least one row not marked for full review against the full artifact to verify compact/full alignment.",
        "Do not accept a patch solely because audits pass.",
        "Consult the matching grammar/<linguistic-status>/*.md note for linguistic status, sources, speaker scope, boundaries, and promotion eligibility; the runtime export intentionally omits these authoring records.",
        "Do not treat parser fixtures, generated probes, or corpus candidate hits as independent validation of a Cantonese grammar claim.",
      ],
      conservative_full_review_triggers: [
        "semantic review flag or review trace",
        "missing or incompatible context",
        "ambiguity selection",
        "normalization or parser-shadow activity",
        "non-PASS audit",
        "nested/wrapper structure",
        "contextual learner-role change",
        "review-oriented trace family",
        "parser-active feature bundle",
        "missing or multiple top constructions",
        "partial root span with unwrapped nonpunctuation material",
        "contextual-role provenance mismatch",
        "grammar legitimacy is provisional, pending, heuristic, lexicalized-only, or unsupported",
      ],
    },
    coverage: acceptanceCoverageFromFull(fullPayload),
    diagnostic_row_count: rows.length,
    full_review_required_count: rowsRequiringFullReview.length,
    rows_requiring_full_review: rowsRequiringFullReview,
    rows,
    final_review_reminder: "This summary is a loss-aware inspection index, not a replacement for the full diagnostics. Review all rows and drill into the companion full file whenever required or suspicious.",
  };
}

function diagnosticExportPathsForNotePath(notePath = "") {
  const path = String(notePath || "").trim();
  if (!path) return { summaryPath: "", fullPath: "" };
  const directory = path.includes("/") ? path.slice(0, path.lastIndexOf("/") + 1) : "";
  const filename = path.includes("/") ? path.slice(path.lastIndexOf("/") + 1) : path;
  const basename = filename.replace(/\.[^/.]+$/, "") || filename || "untitled";
  return {
    summaryPath: `${directory}${basename}.canto-span-acceptance-summary.json`,
    fullPath: `${directory}${basename}.canto-span-full-diagnostics.json`,
  };
}

function diagnosticJsonPathForNotePath(notePath = "") {
  return diagnosticExportPathsForNotePath(notePath).fullPath;
}

function diagnosticExportPayloadsForNote(markdown, notePath = "") {
  const paths = diagnosticExportPathsForNotePath(notePath);
  const generatedAt = new Date().toISOString();
  const exportId = `canto-span-${CANTO_SPAN_RUNTIME_VERSION}-${generatedAt}-${notePath || "untitled"}`;
  const full = diagnosticFullJsonPayloadForNote(markdown, notePath, {
    generated_at: generatedAt,
    export_id: exportId,
    summary_path: paths.summaryPath,
  });
  full.companion_acceptance_summary_path = paths.summaryPath;
  const summary = diagnosticAcceptanceSummaryPayloadFromFull(full, {
    generated_at: generatedAt,
    export_id: exportId,
    full_path: paths.fullPath,
  });
  return { paths, summary, full };
}

function formatDiagnosticJsonForNote(markdown, notePath = "") {
  return JSON.stringify(diagnosticFullJsonPayloadForNote(markdown, notePath), null, 2);
}

function formatNoteMarkdownWithDiagnostics(markdown, notePath = "") {
  const noteText = String(markdown || "");
  const diagnostics = formatDiagnosticMarkdownForNote(noteText);
  if (!diagnostics.trim()) return noteText;

  const header = [
    "# Canto Span note diagnostics",
    notePath ? `Note: ${notePath}` : "",
    "",
    diagnostics,
    "",
    "---",
    "",
    "# Original note",
    "",
  ].filter((line, index) => line || index !== 1).join("\n");

  return `${header}${noteText}`;
}

function splitJyutping(jyutping) {
  return String(jyutping || "").trim().split(/\s+/).filter(Boolean);
}


module.exports = createCantoSpanPlugin({
  CANTO_SPAN_RUNTIME_VERSION,
  analyzeLine,
  normalizeSurface,
  formatDiagnosticMarkdownForNote,
  diagnosticExportPayloadsForNote,
  formatNoteMarkdownWithDiagnostics,
  formatDiagnosticMarkdown,
  diagnosticSummary,
  jyutpingAuditSummary,
  foldedLexicalRepairDisplayRows,
  normalizationReviewSuggestionDisplayRows,
  learnerUiHoverAuditSummary,
  learnerUiHoverAuditRows,
  diagnosticTokenRows,
  diagnosticFinalRows,
  diagnosticLegend,
  safeClass,
  nodeDisplaySurface,
  learnerUiHoverTitleForToken,
  learnerUiHoverTitleForConstruction,
  learnerUiHoverTitleForConstructionLayer,
  shouldCollapseClauseSequenceForDisplay,
  shouldCollapseGreedyWrapperForDisplay,
  parserShadowRepairDisplayRows,
  parserShadowRepairKindLabel,
  splitJyutping,
});

<!-- v0.5.83: Promotes 聽到 / 聽唔到聲 result-potential complements from structural heuristics to named reusable generative templates. -->
<!-- v0.5.82-r2: Keeps contextual-token structural fixes and corrects 吓 learner hover gloss when active syntax is delimitative_aspect. -->
<!-- v0.5.81: Promotes 記得 + reviewed VP complement such as 記得Book枱 to VPComplementFrame before broad TransitiveVP wrapping. -->
<!-- v0.5.80: Adds MotionGoalVP for 去中環 as movement + goal-location, preserving experiential 去過中環 as experiential. -->
<!-- v0.5.66: Generalizes 都得 permission-specific output into broad AcceptabilityClause with permission as subtype metadata. -->
<!-- v0.5.68: Retires DeicticClassifierTopic into Topic with deictic-classifier metadata while preserving DemonstrativeClassifierNP. -->
<!-- v0.5.77: Adds quantity as a learner role, assigns numerals such as 一/兩/三 to quantity, and adds the neon quantity color #00FFD5. -->
<!-- v0.5.76: Contextualizes 其他 as a determiner-like modifier inside 其他同事 so ModifiedNP no longer learner-displays the modifier as what. -->
<!-- Historical v0.5.75 note: the later ComitativeActionMotionVP bridge was retired and removed in v0.5.167. -->
<!-- v0.5.74: Fixes semantic contract consistency after coverb cleanup: topic wrappers preserve demonstrative-classifier children and simple subject + TransitiveVP clauses keep the subject attached. -->
<!-- v0.5.73: Adds CoverbFrame for preverbal coverb phrases, refines coverb X-bar doctrine metadata, removes diagnostic false-positive guardrails, preserves subject locative predicates, and updates the doctrine-shift remaining patch plan. -->
<!-- v0.5.72: Adds TransferDitransitiveVP for true 畀 + theme + recipient transfer frames while preserving 煮飯畀我食 as SerialVerbPurposeChain. -->
<!-- v0.5.71: Promotes ordinal + classifier + head noun phrases such as 第二個故仔 to OrdinalClassifierNP while preserving higher clause labels. -->
<!-- v0.5.70: Adds phrase-tree doctrine regression pack; no parser-label expansion, only documentation/regression lock for classifier NP, contextual 嚟/咩, ordinal 第二個, and serial-purpose boundaries. -->
<!-- v0.5.69: Resolves contextual role notes for 咩/嚟/第二個 and final retired-label alias hygiene. -->
<!-- v0.5.64: Reclassifies 煮飯畀我食 under broad SerialVerbPurposeChain with a RecipientFrame child, retiring benefactive-specific active labels. -->
<!-- v0.5.63: Generalizes subject predicate subtype construction labels into SubjectPredicateClause while preserving subtype aliases and slot metadata. -->
<!-- v0.5.62: Generalizes modal subtype-specific A-not-A question construction labels into ModalANotAQuestion while preserving subtype aliases. -->
<!-- v0.5.61: Retires narrow construction-label aliases into broader grammar categories while preserving parser behavior and diagnostics. -->
<!-- v0.5.59: Adds wrapper coverage audit and display-bound fixes so ClauseRelationGraph cannot hide linker/separator holes. -->
<!-- v0.5.58: ClauseRelationGraph classifies comma-linked clause/discourse sequences as governed structural wrappers instead of fake phrase-internal generative templates. -->
<!-- v0.5.57: DiMarkedNP replaces the misleading PluralMarkedNP label for 啲 + noun phrases while preserving anti-overgeneration guards for standalone 啲 and bare numeral objects. -->
<!-- v0.5.56: ModalVP uses a governed modal + VP template and preserves VerbComplementVP under modal predicates such as 要還返去. -->
<!-- v0.5.55: VerbComplementVP prevents nested TransitiveVP for transparent verb-complement predicates such as 還返啲書. -->
<!-- v0.5.54: VPComplementFrame uses a broad VP-complement grammar label instead of a niche reminder/obligation label. -->
<!-- v0.5.53: the earlier PluralMarkedNP path used generated determiner + head_noun slots with no surface-constrained construction template; v0.5.57 renames the live label to DiMarkedNP. -->
<!-- v0.5.46: directional-motion VP templates use generated motion slots without template surface constraints. -->
<!-- v0.5.43: bare numeral object guard prevents premature TransitiveVP overwrap before classifier NP material. -->
<!-- v0.5.33: bounded time-to-action/copular/existential frame promotion. -->
<!-- v0.5.87: Separates protected opaque formulae from transparent discourse formulae so the core sweep closes without hiding useful children. -->
<!-- v0.5.86: Adds question-punctuation-sensitive ScalarValueQuestion handling for 幾遠 / 幾貴 / 幾高 / 幾耐 while preserving ordinary degree-stative statements. -->
<!-- Historical v0.5.88 note: 畀 paths were separated from a bridge label that was retired and removed in v0.5.167. -->

<!-- v0.5.89: Promotes SerialVerbPurposeChain and MotionPurposeChain transition traces to generative template status for the focused purpose-chain cleanup slice. -->

/*
<!-- v0.5.90: Promotes residual transition candidates for focused diagnostics: VocativeAddressTerm category templates, StativePredicate fragments, PriorityMarkerClause, and ResultStateClause now report generative_template transition status while preserving existing learner roles and guardrails. -->
*/
/*
<!-- v0.5.91: Adds connector-governed ClauseRelationGraph handling for 如果...就, 因為...所以, contrast linkers, and temporal 之後/之前 sequences while preserving wrapper coverage and accepted v0.5.88–v0.5.90 guardrails. -->
*/

<!-- v0.5.93: ProductiveVO legacy trace retirement removes the obsolete ProductiveVO table-trace diagnostic lane after ProductiveVO slot-template migration; reviewed VO entries now tokenize into visible children and wrap via constrained generative ProductiveVO templates. -->


<!-- v0.5.94: AspectualVP legacy trace retirement removes the obsolete aspectual reviewed-table diagnostic lane after ExperientialVP, ProgressiveVP, DelimitedVP, ReduplicatedVP, CompletionVP, and DitransitiveSpeechVP paths are covered by category templates or accepted wrapper behavior. -->
<!-- v0.5.95: Transparent NP token-trace cleanup normalizes demonstrative/classifier and 啲 determiner split tokens away from the broad generative_or_heuristic_slot_rule bucket while preserving generated NP templates. -->
<!-- v0.5.96: Silent-pass audit output omits PASS audit sections, surfaces only WARN/FAIL audit findings, flags generic learner gloss fallbacks, and keeps semantic review candidates separate from audit status. -->
<!-- v0.5.96-r2: Adds semantic-review safeguards for suspicious bare numerals, multiple top constructions, and known lexical semantic leakage so audit silence cannot hide malformed-looking parses. -->
<!-- v0.5.97: Splits one-count 一個 + head noun material before fused lexical lookup so 一個人 parses as transparent QuantifiedClassifierNP; quantity learner display uses how rather than like/stative. -->

<!-- v0.5.98: Adds instrument 用 + NP + action CoverbFrame handling so 用筆寫字 remains transparent and no longer falls through as NominalHeadSpan; preserves silent-pass diagnostics and quantified-classifier NP guardrails. -->
<!-- v0.5.99: Adds IdentityWhQuestion for 邊個嚟 so identity/explanatory 嚟 no longer overwraps as directional motion while motion 嚟 guardrails remain intact. -->

<!-- v0.5.108: Revives learner hover-gloss cleanup by replacing generic construction fallback glosses with plain learner-safe glosses for focused accepted constructions. -->
<!-- v0.5.109: Adds comprehensive parser-shadow repair diagnostics so folded lexical repairs and ordinary character-form normalization share one shadow-repair inventory with note coverage. -->
<!-- v0.5.109-r3: Compacts rendered parser-shadow repair chips; full notes remain available in hover/tooltips and copied diagnostics. -->
<!-- v0.5.110: Extends pre-intermediate learner-error guardrails for subject + verb + bare numeral, 有冇 + VP misuse, and Mandarin 不 + VP review rows. -->
<!-- v0.5.138: Unifies root-span coverage across per-row summaries, compact acceptance JSON, full diagnostics, coverage.rendered_sources, and the legacy rendered inventory; invariant tests require every copy to agree. -->
<!-- v0.5.139: Generalizes typed negative existential response fragments across approved particles, bare and repeated forms, overt-subject/focus variants, and compatible 有冇 discourse while preserving clause and action-negation boundaries. -->
<!-- v0.5.141: Expands the acknowledgement lexicon with transparent 嘞 and 噉 support, broad 得 + closure-particle formulae, and discourse-marked agreement responses such as 噉又係. -->
<!-- v0.5.137: Diagnostics flag partial root spans with unwrapped nonpunctuation material and preserve lexical-default versus construction-override provenance for contextual learner roles. -->
<!-- v0.5.136: Adds a transparent ApproximateQuantity object for numeral + classifier + 度, promotes 飲七杯度喇 to broad TransitiveVP, and makes contextual hover audits catch duration/approximation gloss leakage. -->
<!-- v0.5.135: Save diagnostics JSON now writes a compact acceptance-summary JSON plus a companion full-diagnostics JSON. The summary includes every row, compact final structure, learner roles/Jyutping, context state, conservative drill-down triggers, and explicit full-file pointers; it is not semantic acceptance by itself. -->
<!-- v0.5.122: Adds the A1 malformed bare-numeral complement guard across action, perfective, desiderative, and locative governors while preserving transparent children. -->
<!-- v0.5.123: Preserves complete CompletionQuestion and changed-state aspect-plus-particle boundaries without inventing syntactic null objects. -->
<!-- v0.5.124: Separates typed discourse-fragment construction labels from context-licensing status for 呢？ / 你呢？ / 冇呀。, prevents demonstrative-classifier remnants from becoming FragmentQuestion, and removes unrelated generic FragmentAnswer slots from 冇呀. -->
<!-- v0.5.125: Corrects construction-sensitive 呢 pronunciation and learner glosses: fragment-question 呢 uses ne1 with discourse meaning, while demonstrative 呢 remains ni1; the Jyutping audit now validates the contextual distinction. -->
<!-- v0.5.126: Expands the controlled construction-label registry with broad, research-backed categories from the accepted pre-intermediate research synthesis. This is registry-only and does not promote parser behavior. -->
<!-- v0.5.127: Adds transparent 大家 tokenization and a governed predicate + 嘅話 conditional clause, while allowing sequence/time modifiers before preverbal coverb frames and preserving reported-speech 話 outside conditional context. -->
<!-- v0.5.128: Protects 嘅話 as one learner-visible conditional-marker formula while keeping ConditionalClause productive; adds context-sensitive hover audit checks so conditional and reported-speech 話 glosses cannot leak across uses. -->
<!-- v0.5.129: Uses question punctuation to distinguish grammatical 有冇 + VP event questions from punctuation-free learner-error rows; preserves existential NP, availability, experiential, completion, and context-linked elliptical subtypes with transparent children. -->

<!-- v0.5.130: Replaces focused generic construction hover fallbacks with learner-safe glosses and promotes reviewed ReportedSpeech anchors to governed generative structure with transparent reported-content children. -->

<!-- v0.5.131: Folds the remaining StativePredicate hover cleanup into the HKCanCor OpinionStanceFrame complement-generalization lane. Opinion frames preserve pre/post 都, transparent modal/stative/copular content, and typed existential/copular complement ellipsis with explicit-context licensing. -->
<!-- v0.5.132: Adds productive quantified-time NP recognition for numeral + 年/日 and numeral + classifier + 月, with transparent quantity/classifier/time-unit roles, complete Jyutping, and explicit-context licensing for standalone duration/time fragments. -->
<!-- v0.5.133: Adds productive context-sensitive numeral + classifier head-ellipsis NPs such as 兩部 / 一個 under broad QuantifiedClassifierNP, preserving visible quantity/classifier roles and never fabricating the omitted nominal head. -->
<!-- v0.5.134: Resolves standalone numeral + 個 + 字 as a conventional Cantonese clock-duration QuantifiedTimeNP by default, while compatible writing/text context preserves the literal QuantifiedClassifierNP reading; 字 remains transparent and no hidden minute token is fabricated. -->

<!-- v0.5.142-r1: Adds proposition-host-sensitive sentence-final 咩 polar questions while preserving bare lexical/wh 咩, wh-object, wh-determiner, and protected 係咩 analyses. -->
<!-- v0.5.143: Adds a generative direct nominal 咩 + noun ModifiedNP boundary and defers premature V + 咩 attachment when a following noun head belongs inside the wh NP. -->
<!-- v0.5.144: Adds transparent final 啩 gwaa3 under a broad DiscourseParticleFrame over complete non-question proposition-like hosts, while preserving bare, nominal, unresolved, formula, and question boundaries. -->
<!-- v0.5.144-r1: Corrects stance/preference missing-slot leakage so 覺得 requests content_clause while 鍾意 retains preference_object_or_domain. -->
<!-- v0.5.145: Adds broad final 喎 evidential/noteworthiness scope under the existing DiscourseParticleFrame while keeping exact tone/subtype underdetermined and preserving bare, nominal, unresolved, formula, and question guards. -->
<!-- v0.5.147-r2: Preserves unresolved scalar-host context through FocusParticleFrame; adds a broad restrictive FocusParticleFrame for 得 + scalar/quantity host + 啫/咋, refuses unresolved fused classifier/head ellipsis hosts, and removes the generic NominalHeadSpan hover fallback as a directly related nonblocking cleanup. -->
<!-- v0.5.148: Adds trace-first ordered sentence-final particle clusters with visible inside-to-outside scope, preserved fused-token display, and review-bearing reversed or unvalidated orders. -->
<!-- v0.5.148-r3: Separates broad layer compatibility from sequence-level evidence, keeps unvalidated and question-tail clusters review-bearing, and preserves one transparent learner frame for validated sequences. -->
<!-- v0.5.146-r1: Keeps standalone 走 as an intransitive motion predicate across licensed final 啦 and 喇 hosts, removing particle-conditioned lexical-role leakage while preserving the v0.5.146 scope distinction. -->
<!-- v0.5.146: Separates final 啦 laa1 directive/interpersonal scope from 喇 laa3 change-state/current-relevance scope under broad DiscourseParticleFrame, while preserving formulas, incomplete hosts, nouns, questions, and VP-internal 咗. -->

<!-- v0.5.157: Accounts bare 對 as visible relational-coverb linker material without promoting it to overt_topic_frame; formal 對於 remains an explicit topic-frame linker. -->
<!-- v0.5.156: Accounts overt topic-frame linkers such as 關於 inside ClauseRelationGraph, preserves the visible topic NP, and records explicit topic-frame provenance for later licensed object/domain ellipsis without hidden tokens. -->
<!-- v0.5.150-r2: Completes W17 import and the first bounded corpus lexical slice (離題, 關於, OT, 夜), while preserving learner-role/internal-slot separation and transparent negative/large-number tokenization. No new grammar construction is promoted. -->

<!-- v0.5.158: Adds data-driven predicate-omission profiles, typed A-not-A response compatibility, compositional negative modal/cognition handling, visible cognition/stance/belief/speech content frames, and productive positive PotentialResultVP while preserving the accepted v0.5.157 baseline. -->
<!-- v0.5.159 accepted: Adds hierarchical recursive ClauseRelationEdge nodes with linker ownership, shared-subject provenance, temporal/relative boundaries, recursive content attachment, and review-bearing standalone linker fragments. -->
<!-- v0.5.160 candidate: Adds aspect/result/potential/directional composition and motion-event/spatial-role typing with full-span review controls and no hidden event material. -->
