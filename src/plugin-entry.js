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

const CANTO_SPAN_RUNTIME_VERSION = "0.5.221";
// v0.5.221: narrows AA49 to independently predicative single motion/path items and removes AA49 ownership from compound, manner-directional, and postverbal directional-complement material.
// v0.5.220: narrows AA11 to exact adjacent 變成 + 點, records bounded VP scope/provenance, and closes neighboring wh/result boundaries.
// v0.5.219: narrows AA61 final-未 experiential questions to overt typed experiential domains and context-licenses only the source-backed 食過未 short profile.
// v0.5.218: closes AB15 structural boundaries with transparent modifier-bearing NP composition while preserving established bare and quantified NP behavior.
// v0.5.217: separates unit-word category, lexical evidence, visible NP structure, and downstream policy while preserving the exact twelve-rule acceptance outcomes.
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

let environmentalClauseDetectors = null;
function conventionalEnvironmentalEventConstruction(nodes = []) {
  return environmentalClauseDetectors.conventionalEnvironmentalEventConstruction(nodes);
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

const resultComplementModule = require("./parser/detectors/complements/result");
const resultFramePartClone = resultComplementModule.createResultFramePartClone({
  firstToken, flattenSurface, parserInactiveTokenClone, token,
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

const UNIT_WORD_EVIDENCE_MODEL = require("./runtime-resources/grammar/unit-word-evidence.json");
const LICENSED_CLASSIFIER_HEAD_RULES = require("./runtime-resources/grammar/classifier-head-rules");
const UNIT_WORD_SENSES_BY_ID = new Map(
  UNIT_WORD_EVIDENCE_MODEL.unit_word_senses.map((entry) => [entry.unit_word_sense_id, Object.freeze(entry)]),
);
const UNIT_WORD_RULES_BY_SURFACE = new Map(
  UNIT_WORD_EVIDENCE_MODEL.noun_choice_rule_records.map((entry) => [entry.surface, Object.freeze(entry)]),
);

function unitWordMetadataForSurface(surface) {
  const rule = UNIT_WORD_RULES_BY_SURFACE.get(String(surface || ""));
  if (!rule) return null;
  const sense = UNIT_WORD_SENSES_BY_ID.get(rule.unit_word_sense_id);
  if (!sense) return null;
  return {
    unit_word_evidence_model: UNIT_WORD_EVIDENCE_MODEL.schema,
    unit_word_evidence_version: UNIT_WORD_EVIDENCE_MODEL.version,
    unit_word_evidence_id: rule.evidence_id,
    unit_word_sense_id: sense.unit_word_sense_id,
    unit_word_type: sense.unit_word_type,
    semantic_unit_relation: sense.semantic_unit_relation,
    unit_word_provenance_state: sense.provenance_state,
    unit_word_source_scope: sense.source_scope,
    unit_word_construction_profiles: sense.construction_profiles.slice(),
    lexical_choice_status: rule.pair_status,
  };
}

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
  const unitWordMetadata = unitWordMetadataForSurface(classifierSurface);
  const evidenceMetadata = unitWordMetadata || {
    unit_word_evidence_model: UNIT_WORD_EVIDENCE_MODEL.schema,
    unit_word_evidence_version: UNIT_WORD_EVIDENCE_MODEL.version,
    lexical_choice_status: "unreviewed",
  };
  if (!acceptedClasses) {
    return {
      status: "unverified",
      classifier_surface: classifierSurface,
      head_surface: flattenSurface(head),
      observed_head_classes: headClasses,
      ...evidenceMetadata,
      downstream_argument_licensing: "blocked_by_conservative_policy",
      reason: "This unit word has no reviewed bounded runtime rule; its noun choice remains unreviewed and downstream consumption is blocked by conservative policy.",
    };
  }
  const matchedClasses = acceptedClasses.filter((value) => headClasses.includes(value));
  if (matchedClasses.length) {
    return {
      status: "verified_compatible",
      classifier_surface: classifierSurface,
      head_surface: flattenSurface(head),
      matched_head_classes: matchedClasses,
      ...evidenceMetadata,
      downstream_argument_licensing: "allowed_by_bounded_runtime_rule",
      reason: "The pair matches a bounded runtime class and may license downstream structure; pair-level linguistic evidence remains separately unreviewed.",
    };
  }
  if (!headClasses.length) {
    return {
      status: "unverified",
      classifier_surface: classifierSurface,
      head_surface: flattenSurface(head),
      expected_head_classes: acceptedClasses,
      ...evidenceMetadata,
      downstream_argument_licensing: "blocked_by_conservative_policy",
      reason: "The noun has no recorded compatibility class; the pair remains unreviewed and downstream consumption is blocked by conservative policy.",
    };
  }
  return {
    status: "incompatible",
    classifier_surface: classifierSurface,
    head_surface: flattenSurface(head),
    expected_head_classes: acceptedClasses,
    observed_head_classes: headClasses,
    ...evidenceMetadata,
    downstream_argument_licensing: "blocked_by_conservative_policy",
    reason: "The pair fails the bounded runtime class allowlist; this is a parser-policy control, not a categorical Cantonese grammaticality judgment.",
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
      structural_np_status: "structurally_incomplete_or_unknown",
      lexical_choice_status: "not_assessed",
      downstream_argument_licensing: "blocked_by_structural_or_unknown_material",
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
        structural_np_status: "visible_profile_complete",
        lexical_choice_status: compatibility.lexical_choice_status,
        downstream_argument_licensing: compatibility.downstream_argument_licensing,
        classifier_head_compatibility_status: compatibility.status,
        classifier_head_compatibility: compatibility,
        np_license_reason: compatibility.reason,
      };
    }
    if (compatibility) {
      trace = {
        ...trace,
        structural_np_status: "visible_profile_complete",
        lexical_choice_status: compatibility.lexical_choice_status,
        downstream_argument_licensing: compatibility.downstream_argument_licensing,
        classifier_head_compatibility_status: compatibility.status,
        classifier_head_compatibility: compatibility,
      };
    }
  }
  if (type === "AssociativeNP" && /^啲/u.test(surface)) {
    return {
      np_license_status: "ambiguous_licensed_np",
      construction_licensing_allowed: true,
      structural_np_status: "visible_profile_complete",
      lexical_choice_status: "not_applicable",
      downstream_argument_licensing: "allowed",
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
    structural_np_status: "visible_profile_complete",
    lexical_choice_status: compatibility ? compatibility.lexical_choice_status : "not_applicable",
    downstream_argument_licensing: compatibility ? compatibility.downstream_argument_licensing : "allowed",
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

const { wrapAgreementResponseSubspans } = require("./parser/detectors/discourse/protected-formulas")({
  construction, flattenSurface, isParticle, isToken, parserInactiveTokenClone, traceInfo,
});








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
} = createBasicPredicateDetectors({
  construction, flattenSurface, hasSurface, isToken, nodeCanFillSlot, parserInactiveTokenClone,
  templateDerivedSlots, traceInfo,
});
const { wrapPredicate } = require("./parser/orchestration/wrap-predicate")({
  categorySubspanFor, construction, isStativeToken, isToken, nodeCanFillSlot, traceInfo,
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

const {
  hasSentencePunctuation, isClauseSequenceSeparator, isClauseSequenceTerminal,
} = require("./parser/clause-relations/punctuation");

const createClauseRelationMarkers = require("./parser/clause-relations/markers");
const {
  CLAUSE_LINKER_SURFACES, isTopicFrameLinker, isRelationalCoverbLinker, directWrapperItemSurface,
  clauseLinkingPivotIndex, clauseLinkerRole, clauseLinkerInventory, clauseLinkingWrapperCoverage,
  wrapperSlotDisplayRole, assignedSlotWrapperCoverage, wrapperCoverageForConstructionNode,
} = createClauseRelationMarkers({
  flattenSurface, isClauseSequenceSeparator, learnerDisplaySlots, nodeSlots,
});

const createConditionalClauseRelations = require("./parser/clause-relations/conditional");
const { protectedConditionalMarkerToken, conditionalGeWaaClauseFallback } = createConditionalClauseRelations({
  cleanSlots, construction, flattenSurface, isToken, nodeSlots, parserInactiveTokenClone,
  token, traceInfo, withoutTrailingParticles,
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

let wrapCoreImplementation = null;
let applyConstructionPatternsImplementation = null;
let optionalSubjectOffsetImplementation = null;
let withoutTrailingParticlesImplementation = null;

function applyConstructionPatterns(...args) {
  if (!applyConstructionPatternsImplementation) throw new Error("applyConstructionPatterns implementation is not initialized.");
  return applyConstructionPatternsImplementation(...args);
}

function optionalSubjectOffset(...args) {
  if (!optionalSubjectOffsetImplementation) throw new Error("optionalSubjectOffset implementation is not initialized.");
  return optionalSubjectOffsetImplementation(...args);
}

function withoutTrailingParticles(...args) {
  if (!withoutTrailingParticlesImplementation) throw new Error("withoutTrailingParticles implementation is not initialized.");
  return withoutTrailingParticlesImplementation(...args);
}

const constructionPatternOrchestration = require("./parser/orchestration/apply-construction-patterns")({
  isParticle,
  nodeSlots,
  priorityMarkerClauseWithTrailingParticle: (...args) => priorityMarkerClauseWithTrailingParticle(...args),
  serialVerbPurposeChainWithTrailingParticle: (...args) => serialVerbPurposeChainWithTrailingParticle(...args),
  wrapCore: (...args) => {
    if (!wrapCoreImplementation) throw new Error("wrapCore implementation is not initialized.");
    return wrapCoreImplementation(...args);
  },
});
applyConstructionPatternsImplementation = constructionPatternOrchestration.applyConstructionPatterns;
optionalSubjectOffsetImplementation = constructionPatternOrchestration.optionalSubjectOffset;
withoutTrailingParticlesImplementation = constructionPatternOrchestration.withoutTrailingParticles;

const {
  possessiveFragmentAnswerCandidate,
  fragmentQuestionFallback,
} = require("./parser/detectors/boundaries/fragments")({
  cleanSlots, construction, firstToken, flattenSurface, isToken, nodeCanFillSlot,
  nodeSurfaceMatches, parserInactiveTokenClone, templateDerivedSlots, traceInfo,
  withoutTrailingParticles,
});

const createANotAQuestionDetectors = require("./parser/detectors/questions/a-not-a");
const {
  aNotAQuestionFallback,
  acceptabilityANotAQuestionFallback,
  copularANotAQuestionFallback,
  desiderativeANotAQuestionFallback,
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
  isParticle,
  isToken,
  isVerbLike,
  nodeCanFillSlot,
  optionalSubjectOffset,
  parserInactiveTokenClone,
  phase4DesiderativeActiveTokenClone,
  phase4PermissionActiveTokenClone,
  possessiveFragmentAnswerCandidate,
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
  construction, firstToken, flattenSurface, hasConstruction, hasSurface, isParticle,
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

const createAvailabilityDetectors = require("./parser/detectors/modality/availability");
const { availabilityPredicateWrapCoreFallback } = createAvailabilityDetectors({
  construction, constructionSlotsByType, flattenSurface, nodeCanFillSlot,
  parserInactiveTokenClone, templateConstructionFor, traceInfo,
  withoutIgnorableSpaceText, withoutTrailingParticles,
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
const { opinionSeemingFallback, opinionStanceFrameFallback } = createOpinionDetectors({
  applyConstructionPatterns, categorySubspanFor, cleanSlots, construction, contextualOpinionPlaceholderChildren, copulaClone,
  firstToken, flattenSurface, hasSurface, isToken, modalVPFromNodes, nodeCanFillSlot, nodeSlots,
  nominalComplementFromNodes, parserInactiveTokenClone,
  phase4OpinionStanceActiveTokenClone, predicateOmissionProfileForHead,
  subjectStativePredicateClauseFallback, templateConstructionFor,
  templateDerivedSlots, traceInfo, withoutTrailingParticles, wrapCategorySubspans,
});

const createReportedSpeechDetectors = require("./parser/detectors/reported-speech/composition");
const { reportedSpeechFrameFallback, reportedSpeechSurfaceFallback } = createReportedSpeechDetectors({
  applyConstructionPatterns, construction, contextualReportedSpeechLearnerChildren, firstToken, flattenSurface, indexOfSurface, nodeCanFillSlot,
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

const createPotentialResultDetectors = require("./parser/detectors/aspect/potential-result");
const { potentialResultComplementFallback, potentialResultVPFallback, incompletePotentialResultCandidate } = createPotentialResultDetectors({
  categorySubspanFor, classifierObjectNPFromNodes, cleanSlots, construction, flattenSurface,
  isToken, isVerbLike, nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots,
  traceInfo, withoutTrailingParticles,
});












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

let motionPathGoalSourceDetectors = null;
function pathPhraseFromParts(marker, path) {
  return motionPathGoalSourceDetectors.pathPhraseFromParts(marker, path);
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







const createExistentialClauseDetectors = require("./parser/detectors/existential/clauses");
const { interiorExistentialFrameFallback } = createExistentialClauseDetectors({
  categorySubspanFor, construction, flattenSurface, isToken, nodeCanFillSlot,
  parserInactiveTokenClone, templateDerivedSlots, traceInfo,
  withoutIgnorableSpaceText, withoutTrailingParticles,
});


const {
  resultTopicFromNodes, resultComplementFromNodes, makeChangeIntoPredicate,
  wrapChangeIntoPredicateSubspans,
} = resultComplementModule.createResultComplementDetectors({
  categorySubspanFor, construction, flattenSurface, isToken, nodeCanFillSlot,
  nominalComplementFromNodes, resultFramePartClone, templateDerivedSlots, traceInfo,
  withoutIgnorableSpaceText,
});











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



const createDirectionalMotionDetectors = require("./parser/detectors/motion/directional");
const {
  directionalCompositionFallback,
  downwardMotionPredicateFallback,
  transitionMotionPredicateFallback,
  wrapDirectionalMotionSubspans,
} = createDirectionalMotionDetectors({
  categorySubspanFor, compositionPartClone, construction, constructionSlotsByType, firstToken,
  flattenSurface, isToken, nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots,
  token, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles,
});

const createMotionPurposeDetectors = require("./parser/detectors/motion/purpose-chains");
const {
  purposeLinkingMotionFallback,
  serialVerbPurposeChainWithTrailingParticle,
  wrapSerialPurposeTemplateSubspans,
  wrapSerialVerbPurposeSubspans,
} = createMotionPurposeDetectors({
  categorySubspanFor, compositionPartClone, construction, constructionSlotsByType, firstToken,
  flattenSurface, isParticle, isToken, nodeCanFillSlot, nodeSlots, parserInactiveTokenClone,
  token, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles,
});

const createMotionOrderingReviewDetectors = require("./parser/detectors/motion/ordering-review");
const { motionOrderingReviewCandidate } = createMotionOrderingReviewDetectors({
  cleanSlots, construction, flattenSurface, traceInfo,
});

const createMotionPathGoalSourceDetectors = require("./parser/detectors/motion/path-goal-source");
motionPathGoalSourceDetectors = createMotionPathGoalSourceDetectors({
  applyConstructionPatterns, categorySubspanFor, cleanSlots, construction, constructionSlotsByType,
  CP021B_POST_THEME_PREDICATE_PROFILES, cp021bMakePostThemeRelation, firstToken, flattenSurface,
  motionOrderingReviewCandidate, nodeCanFillSlot, nodeSurfaceMatches, parserInactiveTokenClone,
  templateDerivedSlots, token, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles,
});
const { motionEventSpatialFallback, sourceMotionClauseFallback } = motionPathGoalSourceDetectors;


const {
  bareNumeralObjectMalformedCandidate,
  existentialQuestionWithVpMalformedCandidate,
  overtObjectSelectionReviewCandidate,
} = require("./parser/detectors/boundaries/malformed")({
  cleanSlots, construction, firstToken, flattenNodes, flattenSurface, isToken,
  nodeCanFillSlot, nodeSlots, parserInactiveTokenClone,
  productiveObjectHeadToken: (...args) => productiveObjectHeadToken(...args),
  tokenSemanticDomains,
  topicChainAntecedentCompatibility: (...args) => topicChainAntecedentCompatibility(...args),
  traceInfo,
  withoutIgnorableSpaceText,
});

const {
  ambiguousNeedsContextCandidate,
  mandarinNegatorNeedsContextCandidate,
  incompleteProhibitiveNeedsContextCandidate,
  incompleteRestrictiveFocusBoundaryCandidate,
  predicateOmissionCandidate,
  incompleteModalNeedsContextCandidate,
  incompleteContextualPredicateCandidate,
  incompleteLocativeNeedsContextCandidate,
  mandarinReviewNeedsContextCandidate,
} = require("./parser/detectors/boundaries/needs-context")({
  cleanSlots, construction, firstToken, flattenDisplaySurface, flattenSurface,
  isModalToken, isToken, nodeCanFillSlot, nodeSlots, nodeSurfaceMatches,
  parserInactiveTokenClone, phase4CognitionActiveTokenClone, predicateOmissionProfileForHead,
  templateDerivedSlots, tokenSemanticDomains, traceInfo, withoutTrailingParticles,
});
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

function tokenSemanticDomains(node) {
  const tokenNode = firstToken(node);
  const bundle = tokenNode && (tokenNode.feature_bundle || (tokenNode.trace && tokenNode.trace.feature_bundle));
  return bundle && bundle.parser_features && Array.isArray(bundle.parser_features.semantic_domain)
    ? bundle.parser_features.semantic_domain
    : [];
}

const createTopicChainLinkage = require("./parser/topic-chain/linkage");
const {
  applyTopicChainNullObjectLinkage,
  productiveObjectHeadToken,
  topicChainAntecedentCompatibility,
} = createTopicChainLinkage({
  clauseSequenceSegments: (...args) => clauseSequenceSegments(...args),
  flattenNodes,
  flattenSurface,
  getConstructionAffordances,
  isClauseSequenceSeparator,
  isRelationalCoverbLinker,
  isTopicFrameLinker,
  nodeCanFillSlot,
  tokenSemanticDomains,
  withoutIgnorableSpaceText,
});


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

const createAspectCompositionDetectors = require("./parser/detectors/aspect/composition");
const {
  durativeAspectCompositionFallback, perfectiveResultCompositionFallback,
  restorativeRepetitiveComplementFallback, incompatibleAspectCompositionMalformedCandidate,
} = createAspectCompositionDetectors({
  classifierObjectNPFromNodes, cleanSlots, compositionPartClone, construction,
  constructionSlotsByType, firstToken, flattenSurface, isToken, nodeCanFillSlot,
  nodeSlots, parserInactiveTokenClone, templateDerivedSlots, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles,
});





const createEnvironmentalClauseDetectors = require("./parser/detectors/environmental/clauses");
environmentalClauseDetectors = createEnvironmentalClauseDetectors({
  ENVIRONMENTAL_EVENT_PREDICATES,
  categorySubspanFor: (...args) => categorySubspanFor(...args),
  construction, constructionSlotsByType, firstToken, flattenSurface, nodeCanFillSlot,
  parserInactiveTokenClone, templateDerivedSlots, traceInfo,
  withoutIgnorableSpaceText, withoutTrailingParticles,
});
const { impersonalEnvironmentalClauseFallback, temporalClauseFallback } = environmentalClauseDetectors;

const createExistentialSpatialDetectors = require("./parser/detectors/existential/spatial");
const { existentialLocationPresentationalFallback } = createExistentialSpatialDetectors({
  applyConstructionPatterns, cleanSlots, construction, flattenSurface,
  fullSpanSingleConstruction, isToken, locativePredicatePhraseFromNodes,
  nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots, traceInfo,
  withoutIgnorableSpaceText, withoutTrailingParticles,
});

















const createNominalPredicationDetectors = require("./parser/detectors/nominal-predication/clauses");
const { nominalMeasurePredicateFallback } = createNominalPredicationDetectors({
  categorySubspanFor, cleanSlots, construction, flattenSurface, isToken,
  nodeCanFillSlot, parserInactiveTokenClone, stringIncludesAny, traceInfo,
  withoutIgnorableSpaceText, withoutTrailingParticles,
});















const createPostverbalZoDetectors = require("./parser/detectors/aspect/postverbal-zo");
const {
  postverbalZoPerfectiveFromRawNodes, postverbalZoPerfectiveFromWrappedNodes,
} = createPostverbalZoDetectors({
  cleanSlots, compositionalNpSubspanFor, construction, flattenSurface,
  nodeCanFillSlot, nodeCanLicenseEvidenceGatedObject, nodeNpLicenseStatus,
  templateConstructionFor, traceInfo, withoutIgnorableSpaceText,
});



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

const createClauseRelationGraph = require("./parser/clause-relations/graph");
const {
  connectorAwareClauseLinkingForTerminal,
  completionThenClauseRelation, standaloneClauseRelationEdgeFragmentForTerminal,
  clauseRelationSurfaceIndex, clauseRelationParsedChunk, clauseSequenceSegments,
  wrapClauseSequenceByPunctuation, shouldCollapseClauseSequenceForDisplay,
  shouldCollapseGreedyWrapperForDisplay,
} = createClauseRelationGraph({
  CLAUSE_LINKER_SURFACES, CLAUSE_RELATION_SUBTYPE_REGISTRY, applyConstructionPatterns, applyTopicChainNullObjectLinkage,
  clauseLinkerInventory, clauseLinkingWrapperCoverage, wrapperCoverageForConstructionNode,
  cleanSlots, cognitionContentFrameFallback, construction, firstToken, flattenNodes, flattenSurface,
  hasConstruction, isClauseSequenceSeparator, isClauseSequenceTerminal, learnerDisplaySlots,
  nodeCanFillSlot, nodeSlots, opinionStanceFrameFallback, parserInactiveTokenClone,
  reportedSpeechFrameFallback, surfaceOf, token, traceInfo, withoutIgnorableSpaceText,
});

const createRelativeClauseDetectors = require("./parser/detectors/relative-clauses/clauses");
const { relativeClauseNPForTerminal } = createRelativeClauseDetectors({
  applyConstructionPatterns,
  clauseRelationParsedChunk,
  clauseRelationSurfaceIndex,
  cleanSlots,
  construction,
  cp021bIsBei2Marker,
  flattenSurface,
  nodeCanFillSlot,
  parserInactiveTokenClone,
  traceInfo,
  withoutIgnorableSpaceText,
});







const { topicCommentFallback } = require("./parser/detectors/topic-comment")({
  cleanSlots, construction, isTopicCandidate, templateDerivedSlots, traceInfo, wrapPredicate,
});

function fullSpanSingleConstruction(nodes, sourceNodes) {
  if (!Array.isArray(nodes) || nodes.length !== 1) return null;
  const only = nodes[0];
  if (!only || only.kind !== "construction") return null;
  const expectedSurface = (sourceNodes || []).map((node) => flattenSurface(node)).join("");
  return flattenSurface(only) === expectedSurface ? only : null;
}

const createFinalParticleQuestions = require("./parser/terminal/questions/final-particles");
const { finalMePolarQuestionFallbackForPunctuation } = createFinalParticleQuestions({
  applyConstructionPatterns,
  construction,
  flattenSurface,
  fullSpanSingleConstruction,
  isToken,
  nodeCanFillSlot,
  parserInactiveTokenClone,
  templateDerivedSlots,
  traceInfo,
  withoutIgnorableSpaceText,
});

const createTerminalDiscourseParticles = require("./parser/terminal/particles/discourse");
const {
  completionThenStandaloneWalkResolution,
  propositionLikeHostForScopedDiscourseParticle,
  scopedChangeStateParticleFallback,
  scopedDirectiveClosureParticleFallback,
  scopedEpistemicDiscourseParticleFallback,
  scopedEvidentialDiscourseParticleFallback,
} = createTerminalDiscourseParticles({
  applyConstructionPatterns,
  cleanSlots,
  construction,
  flattenSurface,
  fullSpanSingleConstruction,
  hasSurface,
  isToken,
  nodeCanFillSlot,
  parserInactiveTokenClone,
  templateDerivedSlots,
  traceInfo,
  withoutIgnorableSpaceText,
});

const createTerminalFocusParticles = require("./parser/terminal/particles/focus");
const { restrictiveFocusParticleFallback } = createTerminalFocusParticles({
  applyConstructionPatterns,
  construction,
  flattenSurface,
  fullSpanSingleConstruction,
  isToken,
  nodeCanFillSlot,
  parserInactiveTokenClone,
  templateDerivedSlots,
  traceInfo,
  withoutIgnorableSpaceText,
});

const createOrderedParticleClusters = require("./parser/terminal/particles/ordered-cluster");
const {
  orderedParticleClusterFallback,
  orderedParticleClusterInfo,
  orderedParticleClusterTailInfo,
} = createOrderedParticleClusters({
  construction,
  flattenSurface,
  hasSentencePunctuation,
  parserInactiveTokenClone,
  propositionLikeHostForScopedDiscourseParticle,
  templateDerivedSlots,
  traceInfo,
  withoutIgnorableSpaceText,
});


const {
  sequenceEvidence: ORDERED_PARTICLE_CLUSTER_SEQUENCE_EVIDENCE,
  descriptors: ORDERED_PARTICLE_CLUSTER_DESCRIPTORS,
} = require("./runtime-resources/grammar/ordered-particle-clusters");

wrapCoreImplementation = require("./parser/orchestration/wrap-core")({
  aNotAQuestionFallback,
  acceptabilityANotAQuestionFallback,
  availabilityPredicateWrapCoreFallback,
  ambiguousNeedsContextCandidate,
  approximateQuantityFallback,
  bareNumeralObjectMalformedCandidate,
  completionQuestionFallback,
  completionQuestionWithPerfectiveMarkerFallback,
  completionThenClauseRelation,
  completionThenStandaloneWalkResolution,
  conditionalGeWaaClauseFallback,
  coordinatedNPFragmentFallback,
  coordinatedSubjectModalPredicateClauseFallback,
  copularANotAQuestionFallback,
  copularExplanatoryCompositionFallback,
  copularIdentificationFrameFallback,
  cognitionContentFrameFallback,
  cognitionStatementFallback,
  coverbFrameFallback,
  cp021bBoundaryReviewFallback,
  desiderativeANotAQuestionFallback,
  desiderativeVPWrapCoreFallback,
  directionalCompositionFallback,
  downwardMotionPredicateFallback,
  durativeAspectCompositionFallback,
  existentialLocationPresentationalFallback,
  existentialQuestionWithVpMalformedCandidate,
  existentialWhQuestionFallback,
  experientialQuestionBoundaryFallback,
  experientialYesNoQuestionFallback,
  fragmentQuestionFallback,
  hasSurface,
  impersonalEnvironmentalClauseFallback,
  inlineANotAQuestionFallback,
  incompatibleAspectCompositionMalformedCandidate,
  incompleteContextualPredicateCandidate,
  incompleteLocativeNeedsContextCandidate,
  incompleteModalNeedsContextCandidate,
  incompletePotentialResultCandidate,
  incompleteProhibitiveNeedsContextCandidate,
  incompleteRestrictiveFocusBoundaryCandidate,
  intendedFunctionRelationFallback,
  interiorExistentialFrameFallback,
  interestDomainExistentialQuestionFallback,
  leaveTakingFormulaFallback,
  lexicalGiveRelationFallback,
  locativePostureVPFallback,
  locativeWhQuestionFallback,
  mandarinNegatorNeedsContextCandidate,
  mandarinReviewNeedsContextCandidate,
  mannerAdverbialVPFallback,
  modalPredicateWrapCoreFallback,
  motionEventSpatialFallback,
  namingSelfIntroductionFrameFallback,
  negativeCognitionFragmentFallback,
  nominalMeasurePredicateFallback,
  opinionSeemingFallback,
  opinionStanceFrameFallback,
  overtObjectSelectionReviewCandidate,
  passivePermissiveRelationFallback,
  perfectiveResultCompositionFallback,
  permissionANotAQuestionFallback,
  politePathImperativeFallback,
  politeRequestAdjustmentFallback,
  polarQuestionFrameFallback,
  possessiveFragmentAnswerCandidate,
  postThemeParticipantRelationFallback,
  postverbalZoPerfectiveFromRawNodes,
  postverbalZoPerfectiveFromWrappedNodes,
  potentialResultComplementFallback,
  potentialResultVPFallback,
  predicateOmissionCandidate,
  preferenceVPWrapCoreFallback,
  progressiveWhObjectQuestionFallback,
  prohibitiveImperativeFallback,
  protectedOpaqueFormulaPassthrough,
  purposeLinkingMotionFallback,
  rawPreferenceTemplateFallback,
  reportedSpeechFrameFallback,
  reportedSpeechSurfaceFallback,
  restorativeRepetitiveComplementFallback,
  scalarEvaluationFallback,
  scalarValueQuestionFallback,
  sourceLinkedDegreeMannerModifiedVPFallback,
  sourceLinkedIntentionFrameFallback,
  sourceLinkedPreferenceVPFallback,
  sourceLinkedPriorityMarkerClauseFallback,
  sourceMotionClauseFallback,
  subjectLocativePredicateClauseFallback,
  subjectStativePredicateClauseFallback,
  suggestionQuestionFallback,
  templateConstructionFor,
  temporalClauseFallback,
  topicCommentFallback,
  transitionMotionPredicateFallback,
  transparentDiscourseFormulaFallback,
  wrapAgreementResponseSubspans,
  wrapCategorySubspans,
  wrapChangeIntoPredicateSubspans,
  wrapDirectionalMotionSubspans,
  wrapNegatedVPSubspans,
  wrapPermissionAcceptabilitySubspans,
  wrapPossessiveClassifierNPSubspans,
  wrapPredicate,
  wrapPriorityMarkerSubspans,
  wrapSerialPurposeTemplateSubspans,
  wrapSerialVerbPurposeSubspans,
}).wrapCore;

const {
  applyConstructionPatternsByPunctuation,
  applyConstructionPatternsForTerminal,
} = require("./parser/orchestration/apply-terminal-patterns")({
  applyConstructionPatterns,
  boundedAcknowledgementRepetitionForPunctuation,
  connectorAwareClauseLinkingForTerminal,
  finalMePolarQuestionFallbackForPunctuation,
  hasSentencePunctuation,
  haveOrNotQuestionFallbackForPunctuation,
  orderedParticleClusterFallback,
  orderedParticleClusterInfo,
  relativeClauseNPForTerminal,
  repeatedNegatedExistentialResponseForPunctuation,
  restrictiveFocusParticleFallback,
  scalarDimensionQuestionFallbackForPunctuation,
  scopedChangeStateParticleFallback,
  scopedDirectiveClosureParticleFallback,
  scopedEpistemicDiscourseParticleFallback,
  scopedEvidentialDiscourseParticleFallback,
  standaloneClauseRelationEdgeFragmentForTerminal,
  wrapClauseSequenceByPunctuation,
});

const contextDescriptors = require("./parser/context/descriptors")({
  firstToken, flattenNodes, flattenSurface, getConstructionAffordances, nodeCanFillSlot, normalizeSurface,
  PREDICATE_OMISSION_PROFILES, predicateOmissionProfileForHead, predicateOmissionProfileForQuestionForm,
  predicateProfilesCompatible, tokenSemanticDomains,
});
const {
  tokenRowsForAnalysis,
  questionDescriptorForContextTurn,
  targetDescriptorForContext,
  compatibleContextQuestion,
  existentialQuestionDescriptorForContextTurn,
  positiveResponseDiscourseAntecedentDescriptor,
  existentialDomainDescriptorForContextTurn,
  eventDomainDescriptorForContextTurn,
  opinionContextSupportsMissingSlot,
  quantifiedClassifierEllipsisDescriptor,
  contextSupportsQuantifiedClassifierFragment,
  conventionalZiDurationDescriptor,
  conventionalZiContextDomain,
  contextSupportsQuantifiedTimeFragment,
} = contextDescriptors;

let analyzeLineImplementation = null;
function analyzeLine(...args) {
  if (!analyzeLineImplementation) throw new Error("analyzeLine implementation is not initialized.");
  return analyzeLineImplementation(...args);
}

const {
  explicitContextTurns,
  analyzedExplicitContext,
} = require("./parser/context/turns")({
  analyzeLine,
  diagnosticSummary,
  normalizeSurface,
});

const licensedContextFragments = require("./parser/context/licensed-fragments")({
  PREDICATE_OMISSION_PROFILES, applyRoleOverrides, cleanSlots, construction, contextSupportsQuantifiedClassifierFragment,
  contextSupportsQuantifiedTimeFragment, conventionalZiContextDomain,
  conventionalZiDurationDescriptor, eventDomainDescriptorForContextTurn,
  existentialDomainDescriptorForContextTurn, existentialQuestionDescriptorForContextTurn,
  firstToken, flattenNodes, flattenSurface, hasSentencePunctuation, isToken,
  nodeCanFillSlot, normalizeSurface, opinionContextSupportsMissingSlot,
  parserInactiveTokenClone, positiveResponseDiscourseAntecedentDescriptor,
  predicateOmissionProfileForHead, predicateProfilesCompatible,
  quantifiedClassifierEllipsisDescriptor, questionDescriptorForContextTurn,
  templateDerivedSlots, tokenRowsForAnalysis, traceInfo, withoutIgnorableSpaceText,
});
const {
  splitTerminalContextNodes,
  contextRequiredTrace,
  needsContextAroundExisting,
  fragmentChildrenFromStructural,
  licensedFragmentAnswer,
  licensedContextFragmentQuestion,
  licensedContextNegatedExistentialFragment,
  contextualPositiveExistentialAcknowledgementRepetition,
  licensedContextHaveOrNotEventQuestion,
  licensedContextEllipticalExistentialQuestion,
  licensedContextShortExperientialQuestion,
  typedContextDependentFragmentBoundary,
  saturatedCompletionBoundary,
  licensedContextOpinionStanceFrame,
  licensedContextConventionalCognitionStatement,
  licensedContextStancePredicateAnswer,
  contextualQuantifiedClassifierNPBoundary,
  conventionalZiDurationConstruction,
  contextualConventionalZiDurationBoundary,
  licensedContextQuantifiedTimeNP,
} = licensedContextFragments;

const {
  sentenceContextGroups,
  applyExplicitContextContract,
} = require("./parser/context/apply-context-contract")({
  compatibleContextQuestion, contextRequiredTrace,
  contextualConventionalZiDurationBoundary,
  contextualPositiveExistentialAcknowledgementRepetition,
  contextualQuantifiedClassifierNPBoundary, flattenNodes, flattenSurface,
  hasSentencePunctuation, licensedContextConventionalCognitionStatement,
  licensedContextEllipticalExistentialQuestion, licensedContextFragmentQuestion,
  licensedContextHaveOrNotEventQuestion, licensedContextNegatedExistentialFragment,
  licensedContextOpinionStanceFrame, licensedContextQuantifiedTimeNP,
  licensedContextShortExperientialQuestion, licensedContextStancePredicateAnswer, licensedFragmentAnswer,
  needsContextAroundExisting, saturatedCompletionBoundary, splitTerminalContextNodes,
  targetDescriptorForContext, typedContextDependentFragmentBoundary,
  withoutIgnorableSpaceText,
});

analyzeLineImplementation = require("./parser/analyze-line")({
  analyzedExplicitContext,
  annotateRawDisplaySurfaces,
  applyConstructionPatternsByPunctuation,
  applyExplicitContextContract,
  normalizeInputForParser,
  normalizeSurface,
  tokenizeLine,
}).analyzeLine;

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
    return LABEL_TRANSITION_KIND_POLICY.construction_template;
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
  const migrationStatuses = new Set(["migration_candidate"]);
  const migrationCandidates = rows
    .filter((row) => migrationStatuses.has(row.transition_status))
    .sort((a, b) => a.transition_priority - b.transition_priority || String(a.construction).localeCompare(String(b.construction)));
  const unknownRows = rows.filter((row) => row.transition_status === "needs_registry_decision");
  return {
    status: unknownRows.length ? "WARN" : "PASS",
    policy: "Diagnostic inventory separating accepted runtime architectures from actionable migration debt. Declarative templates are preferred where they cleanly fit; governed specialized implementations may remain first-class. PASS means every construction trace was classified; migration candidates may still remain.",
    construction_row_count: rows.length,
    accepted_template_count: (countByStatus.accepted_reusable_template || 0) + (countByStatus.accepted_bounded_template || 0),
    accepted_specialized_count: (countByStatus.accepted_specialized_implementation || 0) + (countByStatus.accepted_guardrail || 0) + (countByStatus.accepted_closed_table || 0) + (countByStatus.accepted_internal_support || 0),
    transition_review_count: countByStatus.transition_review || 0,
    already_generative_count: countByStatus.accepted_reusable_template || 0,
    migration_candidate_count: migrationCandidates.length,
    reviewed_table_or_guardrail_count: (countByStatus.accepted_specialized_implementation || 0) + (countByStatus.accepted_guardrail || 0) + (countByStatus.accepted_closed_table || 0),
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
