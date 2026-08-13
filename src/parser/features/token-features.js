"use strict";

const SLOT_GENERATION_RULES = require("../../runtime-resources/grammar/templates/slot-generation-rules");

module.exports = function createTokenFeaturePrimitives(dependencies = {}) {
  const {
    normalizeLearnerLabel,
    cleanSlots,
  } = dependencies;

  function hasAny(value, wanted) {
    const values = Array.isArray(value) ? value : [value];
    return values.some((item) => wanted.includes(item));
  }
  function stringIncludesAny(value, needles) {
    const text = String(value || "");
    return needles.some((needle) => needle && text.includes(needle));
  }
  function contextualRoleAffordances(row = {}) {
    const slots = new Set(row.slots || []);
    const syntax = String(row.syntax || "");
    const role = row.role || row.label || "";
    const out = [];
    const add = (candidate) => {
      if (!candidate || !candidate.role) return;
      const key = `${candidate.role}||${candidate.slot || ""}||${candidate.source || ""}`;
      if (out.some((item) => `${item.role}||${item.slot || ""}||${item.source || ""}` === key)) return;
      out.push(candidate);
    };

    if (role && role !== "neutral") {
      add({
        role,
        source: "lexical_default",
        active_before_construction_wrapping: true,
        note: "Default learner role from the lexical entry before any construction-level contextual override.",
      });
    }

    if (slots.has("time") || slots.has("time_head") || slots.has("temporal_modifier") || syntax.includes("temporal")) {
      add({
        role: "when",
        slot: slots.has("temporal_modifier") ? "temporal_modifier" : (slots.has("time_head") ? "time_head" : "time"),
        source: "time_affordance",
        active_before_construction_wrapping: role === "when",
        note: "Time/temporal affordance retained for phrases such as 上個禮拜 / 上次.",
      });
    }

    if (slots.has("movement_direction") || slots.has("return_motion_verb") || slots.has("deictic_motion_marker") || slots.has("movement_verb") || syntax.includes("movement_direction")) {
      add({
        role: "doing",
        slot: slots.has("movement_direction") ? "movement_direction" : (slots.has("return_motion_verb") ? "return_motion_verb" : (slots.has("deictic_motion_marker") ? "deictic_motion_marker" : "movement_verb")),
        source: "motion_affordance",
        active_before_construction_wrapping: role === "doing",
        note: "Motion affordance retained for directional-motion contexts such as 上嚟 / 返上嚟.",
      });
    }

    if (slots.has("degree_manner_head") || syntax.includes("degree_manner_head")) {
      add({
        role: "how",
        slot: "degree_manner_head",
        source: "degree_manner_affordance",
        active_before_construction_wrapping: role === "how",
        note: "Degree/manner affordance retained for stative/adjective or manner + 啲 contexts.",
      });
    }

    if (slots.has("object") || slots.has("head_noun") || slots.has("np")) {
      add({
        role: "what",
        slot: slots.has("object") ? "object" : (slots.has("head_noun") ? "head_noun" : "np"),
        source: "nominal_affordance",
        active_before_construction_wrapping: role === "what",
        note: "Nominal/object affordance retained for NP or object contexts.",
      });
    }

    return out;
  }
  function inferTokenFeatures(surface, entry = {}, overrides = {}) {
    const rawLabel = overrides.label || entry.label || "neutral";
    const syntax = overrides.syntax || entry.syntax || "lexical_candidate";
    const label = normalizeLearnerLabel(rawLabel, surface, syntax);
    const syntaxParts = new Set(String(syntax).split(/[\s_]+/).filter(Boolean));
    const hasSyntaxPart = (part) => syntaxParts.has(part);
    const features = {
      surface,
      label,
      syntax,
      pos: overrides.pos || entry.pos || "",
      semantic: Array.isArray(entry.semantic) ? [...entry.semantic] : [],
      verb_class: Array.isArray(entry.verb_class) ? [...entry.verb_class] : [],
      particle_class: entry.particle_class || "",
    };

    if (!features.pos) {
      if (label === "who" || syntax.includes("person") || syntax.includes("pronoun")) features.pos = "np";
      else if (label === "where" || syntax.includes("place")) features.pos = "np";
      else if (label === "what" || syntax.includes("noun") || syntax.includes("np")) features.pos = "noun";
      else if (label === "doing") features.pos = "verb";
      else if (label === "stance" || syntax.includes("cognition")) features.pos = "verb";
      else if (label === "like" || syntax.includes("stative")) features.pos = "stative";
      else if (label === "measure_word") features.pos = "classifier";
      else if (label === "particle") features.pos = "particle";
      else if (label === "func") features.pos = "function";
      else if (label === "when") features.pos = "time";
      else if (label === "how" || label === "why") features.pos = "adverbial";
    }

    if (label === "where" || syntax.includes("place")) features.semantic.push("place");
    const foodNounSurfaces = ["飯", "薄餅", "意粉", "食物", "菜式"];
    const drinkLiquidSurfaces = ["水", "茶", "咖啡", "奶", "湯"];
    if (syntax.includes("food") || foodNounSurfaces.includes(surface)) features.semantic.push("food");
    if (syntax.includes("drink") || syntax.includes("liquid") || drinkLiquidSurfaces.includes(surface)) features.semantic.push("drink", "liquid");
    if (surface === "水" || syntax.includes("water")) features.semantic.push("water");
    if (syntax.includes("beverage") || ["茶", "咖啡", "奶"].includes(surface)) features.semantic.push("beverage");
    if (syntax.includes("price") || ["價", "價錢", "價位", "錢", "蚊"].includes(surface)) features.semantic.push("price");
    if (syntax.includes("abstract") || ["興趣", "問題", "消息", "主意"].includes(surface)) features.semantic.push("abstract");
    if (syntax.includes("cognition") || ["覺得", "諗", "知", "記得", "唔知"].includes(surface)) features.verb_class.push("cognition");
    if (label === "stance" || hasSyntaxPart("opinion") || hasSyntaxPart("stance") || ["覺得", "諗住", "記得", "唔知"].includes(surface)) features.verb_class.push("stance");
    if (["去", "返", "嚟", "落", "上"].includes(surface) || syntax.includes("movement_direction")) features.verb_class.push("movement");
    if (["講", "話"].includes(surface)) features.verb_class.push("speech");
    if (["鍾意"].includes(surface)) features.verb_class.push("preference");
    if (["好似"].includes(surface)) features.verb_class.push("seeming");

    features.semantic = [...new Set(features.semantic)];
    features.verb_class = [...new Set(features.verb_class)];
    return features;
  }
  function compactFeatureSummary(features = {}) {
    return {
      pos: features.pos || "",
      label: features.label || "",
      semantic: features.semantic || [],
      verb_class: features.verb_class || [],
      particle_class: features.particle_class || "",
    };
  }
  function featureList(...items) {
    return [...new Set(items.flat().filter(Boolean))].sort();
  }
  function syntaxHas(syntax, value) {
    return String(syntax || "").includes(value);
  }
  function featureBundleFor(surface, entry = {}, features = {}, slots = []) {
    const syntax = entry.syntax || features.syntax || "";
    const label = entry.label || features.label || "";
    const slotSet = new Set(slots || []);
    const semantic = new Set(features.semantic || []);
    const verbClass = new Set(features.verb_class || []);

    const isLexicalizedStative = syntaxHas(syntax, "lexicalized_stative") && !syntaxHas(syntax, "negative_lexicalized_stative");
    const isNegativeLexicalizedStative = syntaxHas(syntax, "negative_lexicalized_stative");
    const syntaxSuggestsOrdinaryStative =
      label === "like" &&
      syntaxHas(syntax, "stative") &&
      !isLexicalizedStative &&
      !isNegativeLexicalizedStative &&
      !syntaxHas(syntax, "sensory_stative_head") &&
      !syntaxHas(syntax, "degree_stative_predicate");
    const isOrdinaryStative = slotSet.has("ordinary_stative_predicate") || syntaxSuggestsOrdinaryStative;
    const isStative = slotSet.has("stative_predicate") || isLexicalizedStative || isNegativeLexicalizedStative || isOrdinaryStative;
    const isAction = slotSet.has("action_verb") || slotSet.has("main_verb");
    const isSpeech = slotSet.has("speech_verb") || verbClass.has("speech") || ["話", "講"].includes(surface);
    const isReportative = slotSet.has("reportative_source") || ["話", "聽講"].includes(surface);
    const isStance = (slotSet.has("stance_predicate") || verbClass.has("stance")) && !["話", "聽講"].includes(surface);
    const isCognition = slotSet.has("cognition_predicate") || verbClass.has("cognition");
    const isPhase4CognitionPromotion = syntaxHas(syntax, "phase4_cognition_promotion");
    const isPhase4NegativeCognitionFragment = isPhase4CognitionPromotion && slotSet.has("negative_cognition_fragment");
    const isPhase4CognitionContentPredicate = isPhase4CognitionPromotion && slotSet.has("non_stance_cognition_predicate");
    const isPhase4CognitionStatement = isPhase4CognitionPromotion && slotSet.has("cognition_statement_clause");
    const isPhase4DesiderativePromotion = syntaxHas(syntax, "phase4_desiderative_promotion");
    const isPhase4DesiderativeANotAQuestion = isPhase4DesiderativePromotion && slotSet.has("desiderative_a_not_a_question");
    const isPhase4OpinionStancePromotion = syntaxHas(syntax, "phase4_opinion_stance_promotion");
    const isPhase4OpinionStanceFrame = isPhase4OpinionStancePromotion && slotSet.has("opinion_stance_frame");
    const isPhase4ReportedSpeechPromotion = syntaxHas(syntax, "phase4_reported_speech_promotion");
    const isPhase4ReportedSpeechFrame = isPhase4ReportedSpeechPromotion && slotSet.has("reported_speech");
    const isPhase4PermissionPromotion = syntaxHas(syntax, "phase4_permission_promotion");
    const isPhase4PermissionANotAQuestion = isPhase4PermissionPromotion && slotSet.has("permission_a_not_a_question");
    const isDegree = slotSet.has("degree");
    const isParticle = label === "particle" || features.pos === "particle";
    const isFunction = label === "func" || label === "measure_word" || features.pos === "function" || features.pos === "quantifier";
    const isNominal = ["who", "what", "where"].includes(label) || ["noun", "np"].includes(features.pos);

    const domains = [];
    if (syntaxHas(syntax, "sensory_evaluation")) domains.push("sensory_evaluation");
    if (syntaxHas(syntax, "food_evaluation")) domains.push("food_evaluation");
    else if ((syntaxHas(syntax, "food") || semantic.has("food")) && isNominal) domains.push("food_item", "edible_item");
    else if (syntaxHas(syntax, "food")) domains.push("food_evaluation");
    if (syntaxHas(syntax, "drink") || syntaxHas(syntax, "drink_evaluation")) domains.push("drink_evaluation");
    if (syntaxHas(syntax, "sound") || syntaxHas(syntax, "sound_evaluation")) domains.push("sound_evaluation");
    if (syntaxHas(syntax, "visual") || syntaxHas(syntax, "visual_evaluation")) domains.push("visual_evaluation");
    if (syntaxHas(syntax, "taste") || syntaxHas(syntax, "taste_evaluation")) domains.push("taste_evaluation");
    if (syntaxHas(syntax, "distance") || ["遠", "近"].includes(surface)) domains.push("distance_property");
    if (syntaxHas(syntax, "price") || ["貴", "平", "價", "價錢", "價位", "錢", "蚊"].includes(surface)) domains.push("price_property");
    if (syntaxHas(syntax, "emotion") || ["開心", "難過"].includes(surface)) domains.push("emotion");
    if (isCognition || ["覺得", "諗", "知", "記得", "唔知"].includes(surface)) domains.push("cognition");
    if (isSpeech) domains.push("speech");
    if (verbClass.has("movement") || ["去", "返", "嚟", "落", "上"].includes(surface)) domains.push("motion");
    if (["食", "飲"].includes(surface)) domains.push("consumption");
    if (syntaxHas(syntax, "story_np") || syntaxHas(syntax, "information_content") || semantic.has("information_content")) domains.push("information_content", "readable_content");
    if (syntaxHas(syntax, "liquid") || semantic.has("liquid") || semantic.has("water") || semantic.has("beverage") || semantic.has("drink")) domains.push("liquid", "drinkable_item");
    if (label === "where" || syntaxHas(syntax, "place") || semantic.has("place")) domains.push("place");

    let lexicalizationType = "none";
    if (isNegativeLexicalizedStative) lexicalizationType = "negative_lexicalized_stative";
    else if (isLexicalizedStative) lexicalizationType = "lexicalized_stative";
    else if (entry.review === "protected_formula" || syntaxHas(syntax, "formula")) lexicalizationType = "protected_formula";
    else if (syntaxHas(syntax, "productive_vo")) lexicalizationType = "productive_vo";

    const predicateSubtypes = [];
    if (isAction && !isStative) predicateSubtypes.push("action_verb");
    if (isOrdinaryStative) predicateSubtypes.push("ordinary_stative");
    if (isLexicalizedStative) predicateSubtypes.push("lexicalized_stative");
    if (isNegativeLexicalizedStative) predicateSubtypes.push("negative_lexicalized_stative");
    if (isSpeech) predicateSubtypes.push("speech_predicate");
    if (isReportative) predicateSubtypes.push("reportative_source");
    if (isStance) predicateSubtypes.push("stance_predicate");
    if (isCognition) predicateSubtypes.push("cognition_predicate");
    if (verbClass.has("movement")) predicateSubtypes.push("motion_predicate");
    if (slotSet.has("desiderative_modal") || syntaxHas(syntax, "modal_desiderative")) predicateSubtypes.push("desiderative_modal");
    if (slotSet.has("permission_modal") || slotSet.has("permission_a_not_a_modal") || syntaxHas(syntax, "modal_permission")) predicateSubtypes.push("permission_modal");
    if (slotSet.has("prohibitive_marker") || syntaxHas(syntax, "prohibitive_marker")) predicateSubtypes.push("prohibitive_marker");

    let syntacticCategory = "UNKNOWN";
    if (isParticle) syntacticCategory = "PARTICLE";
    else if (isFunction || isDegree) syntacticCategory = "FUNCTION";
    else if (isNominal && !isStative) syntacticCategory = "N";
    else if (label === "doing" || label === "stance" || label === "like" || isStative || isSpeech || isCognition) syntacticCategory = "V";

    let morphologicalCategory = "unknown";
    if (syntacticCategory === "V") morphologicalCategory = "verb_like";
    else if (syntacticCategory === "N") morphologicalCategory = "nominal_like";
    else if (syntacticCategory === "PARTICLE") morphologicalCategory = "particle_like";
    else if (syntacticCategory === "FUNCTION") morphologicalCategory = "function_like";

    let gradability = "unknown";
    if (syntaxHas(syntax, "degreeable") || isStative || isOrdinaryStative) gradability = "gradable";
    else if (isAction || isSpeech || isCognition || isDegree || isFunction || isParticle) gradability = "non_gradable";

    let dynamicity = "unknown";
    if (surface === "覺得") dynamicity = "mixed";
    else if (isStative || isNegativeLexicalizedStative || isLexicalizedStative || isOrdinaryStative) dynamicity = "non_dynamic";
    else if (isAction || isSpeech || surface === "諗") dynamicity = "dynamic";
    else if (isCognition) dynamicity = "contextual";

    let temporalStability = "unknown";
    if (["遠", "近", "高", "矮", "大", "細"].includes(surface)) temporalStability = "permanent";
    else if (isAction || isSpeech || surface === "諗") temporalStability = "transient";
    else if (isStative || isCognition || surface === "覺得") temporalStability = "contextual";

    let polarityProfile = "neutral";
    if (isNegativeLexicalizedStative || syntaxHas(syntax, "negative")) polarityProfile = "negative";
    else if (isLexicalizedStative || syntaxHas(syntax, "positive")) polarityProfile = "positive";
    else if (["貴", "遠"].includes(surface)) polarityProfile = "contextual";

    const canHeadComment = slotSet.has("comment_predicate") || isStative || isOrdinaryStative;
    const canTakeDegreeModifier = syntaxHas(syntax, "degreeable") || isStative || isOrdinaryStative;
    const canHeadProductiveVO = slotSet.has("action_verb") && syntaxHas(syntax, "transitive_affordance");
    const canBeM4Negated = canHeadComment || label === "doing" ? (label === "doing" && !canHeadComment ? "contextual" : true) : "unknown";

    let confidence = "low";
    const sources = ["runtime_inference"];
    if (["好食", "難食", "遠", "食", "覺得", "諗", "知"].includes(surface)) {
      confidence = ["遠"].includes(surface) ? "medium" : "high";
      sources.unshift("manual_gold");
    }
    if (["好食", "好飲", "好睇", "好聽", "好味", "難食", "難飲", "難睇", "難聽"].includes(surface)) {
      if (!sources.includes("words_hk")) sources.push("words_hk");
      if (!sources.includes("jyutdictionary")) sources.push("jyutdictionary");
      confidence = "high";
    }
    if (["話", "聽講"].includes(surface)) {
      confidence = "medium";
      sources.unshift("manual_gold");
      sources.push("research_generalization");
    }

    const shorthandParts = [];
    if (gradability === "gradable") shorthandParts.push("+gradable");
    if (gradability === "non_gradable") shorthandParts.push("-gradable");
    if (dynamicity === "dynamic") shorthandParts.push("+dynamic");
    if (dynamicity === "non_dynamic") shorthandParts.push("-dynamic");
    if (isLexicalizedStative) shorthandParts.push("+lexicalized_stative");
    if (isNegativeLexicalizedStative) shorthandParts.push("+negative_lexicalized_stative");
    if (isOrdinaryStative) shorthandParts.push("+ordinary_stative");
    for (const subtype of predicateSubtypes) shorthandParts.push(`+${subtype}`);
    for (const domain of domains) shorthandParts.push(`+${domain}`);

    const parserActiveUses = [];
    if (lexicalizationType === "lexicalized_stative") parserActiveUses.push("lexicalization_type:lexicalized_stative");
    if (lexicalizationType === "negative_lexicalized_stative") parserActiveUses.push("lexicalization_type:negative_lexicalized_stative");
    if (predicateSubtypes.includes("ordinary_stative")) parserActiveUses.push("predicate_subtype:ordinary_stative");
    if (isStative && gradability === "gradable") parserActiveUses.push("core_dimensions:gradability");
    if (isStative && canHeadComment) parserActiveUses.push("construction_affordances:can_head_comment");
    if (isPhase4CognitionPromotion && isCognition) parserActiveUses.push("predicate_subtype:cognition_predicate");
    if (isPhase4CognitionContentPredicate && isCognition) parserActiveUses.push("construction_affordances:can_take_content_clause");
    if (isPhase4NegativeCognitionFragment && isCognition) parserActiveUses.push("construction_affordances:can_stand_as_negative_cognition_fragment");
    if (isPhase4CognitionStatement && isCognition) parserActiveUses.push("construction_affordances:can_stand_as_cognition_statement");
    if (isPhase4DesiderativePromotion && predicateSubtypes.includes("desiderative_modal")) parserActiveUses.push("predicate_subtype:desiderative_modal");
    if (isPhase4DesiderativeANotAQuestion && predicateSubtypes.includes("desiderative_modal")) parserActiveUses.push("construction_affordances:can_form_desiderative_a_not_a_question");
    if (isPhase4OpinionStancePromotion && predicateSubtypes.includes("stance_predicate")) parserActiveUses.push("predicate_subtype:stance_predicate");
    if (isPhase4OpinionStanceFrame && predicateSubtypes.includes("stance_predicate")) parserActiveUses.push("construction_affordances:can_head_opinion_frame");
    if (isPhase4ReportedSpeechPromotion && predicateSubtypes.includes("speech_predicate")) parserActiveUses.push("predicate_subtype:speech_predicate");
    if (isPhase4ReportedSpeechFrame && predicateSubtypes.includes("speech_predicate")) parserActiveUses.push("construction_affordances:can_introduce_reported_content");
    if (isPhase4PermissionPromotion && predicateSubtypes.includes("permission_modal")) parserActiveUses.push("predicate_subtype:permission_modal");
    if (isPhase4PermissionANotAQuestion && predicateSubtypes.includes("permission_modal")) parserActiveUses.push("construction_affordances:can_form_permission_a_not_a_question");
    if (canHeadProductiveVO) parserActiveUses.push("construction_affordances:can_head_productive_vo");

    const topicChainParserActive = parserActiveUses.includes("construction_affordances:can_head_productive_vo");
    const phase4CognitionParserActive = parserActiveUses.some((use) => use.includes("cognition_predicate") || use.includes("can_take_content_clause"));
    const phase4DesiderativeParserActive = parserActiveUses.some((use) => use.includes("desiderative_modal") || use.includes("desiderative_a_not_a"));
    const phase4OpinionStanceParserActive = parserActiveUses.some((use) => use.includes("stance_predicate") || use.includes("can_head_opinion_frame"));
    const phase4ReportedSpeechParserActive = parserActiveUses.some((use) => use.includes("speech_predicate") || use.includes("can_introduce_reported_content"));
    const phase4PermissionParserActive = parserActiveUses.some((use) => use.includes("permission_modal") || use.includes("can_form_permission_a_not_a_question"));
    const parserBehavior = phase4CognitionParserActive
      ? "phase4_controlled_cognition_logic_uses_feature_predicates"
      : (phase4DesiderativeParserActive
        ? "phase4_controlled_desiderative_a_not_a_logic_uses_feature_predicates"
        : (phase4OpinionStanceParserActive
          ? "phase4_controlled_opinion_stance_logic_uses_feature_predicates"
          : (phase4ReportedSpeechParserActive
            ? "phase4_controlled_reported_speech_logic_uses_feature_predicates"
            : (phase4PermissionParserActive
              ? "phase4_controlled_permission_a_not_a_logic_uses_feature_predicates"
              : (topicChainParserActive
                ? "a1_topic_chain_null_object_logic_uses_object_selecting_affordance"
                : (parserActiveUses.length ? "stative_logic_uses_feature_predicates" : "unchanged"))))));
    const bundleStatus = phase4CognitionParserActive
      ? "derived_runtime_helper_phase_4_controlled_cognition_parser_active"
      : (phase4DesiderativeParserActive
        ? "derived_runtime_helper_phase_4_controlled_desiderative_parser_active"
        : (phase4OpinionStanceParserActive
          ? "derived_runtime_helper_phase_4_controlled_opinion_stance_parser_active"
          : (phase4ReportedSpeechParserActive
            ? "derived_runtime_helper_phase_4_controlled_reported_speech_parser_active"
            : (phase4PermissionParserActive
              ? "derived_runtime_helper_phase_4_controlled_permission_parser_active"
              : (topicChainParserActive
                ? "derived_runtime_helper_a1_topic_chain_parser_active"
                : (parserActiveUses.length ? "derived_runtime_helper_phase_3_stative_parser_active" : "derived_runtime_helper_phase_3_parser_inactive"))))));

    return {
      status: bundleStatus,
      parser_behavior: parserBehavior,
      core_dimensions: {
        syntactic_category: syntacticCategory,
        morphological_category: morphologicalCategory,
        gradability,
        dynamicity,
        temporal_stability: temporalStability,
      },
      parser_features: {
        lexicalization_type: lexicalizationType,
        semantic_domain: featureList(domains),
        polarity_profile: polarityProfile,
        predicate_subtype: featureList(predicateSubtypes),
      },
      construction_affordances: {
        can_head_comment: canHeadComment,
        can_take_degree_modifier: canTakeDegreeModifier,
        can_be_m4_negated: canBeM4Negated,
        can_head_productive_vo: canHeadProductiveVO,
        can_license_following_vp: slotSet.has("prohibitive_marker") || surface === "唔好",
        can_introduce_reported_content: slotSet.has("reportative_source") || ["話", "聽講"].includes(surface),
        can_take_content_clause: isPhase4CognitionContentPredicate && isCognition,
        can_stand_as_negative_cognition_fragment: isPhase4NegativeCognitionFragment && isCognition,
        can_stand_as_cognition_statement: isPhase4CognitionStatement && isCognition,
        can_form_desiderative_a_not_a_question: isPhase4DesiderativeANotAQuestion && predicateSubtypes.includes("desiderative_modal"),
        can_form_permission_a_not_a_question: isPhase4PermissionANotAQuestion && predicateSubtypes.includes("permission_modal"),
        can_take_recipient: ["話", "畀"].includes(surface),
        can_head_opinion_frame: isPhase4OpinionStanceFrame || slotSet.has("stance_predicate") || ["覺得", "認為", "以為", "相信", "懷疑"].includes(surface),
      },
      evidence_controls: {
        feature_confidence: confidence,
        feature_source: featureList(sources),
        parser_active: Boolean(parserActiveUses.length),
        parser_active_scope: featureList(parserActiveUses),
      },
      diagnostic_shorthand: featureList(shorthandParts).join(" "),
    };
  }
  function getFeatureBundle(nodeOrBundle) {
    if (!nodeOrBundle) return null;
    if (nodeOrBundle.core_dimensions && nodeOrBundle.parser_features) return nodeOrBundle;
    return nodeOrBundle.feature_bundle || (nodeOrBundle.trace && nodeOrBundle.trace.feature_bundle) || null;
  }
  function getParserFeatures(nodeOrBundle) {
    const bundle = getFeatureBundle(nodeOrBundle);
    return (bundle && bundle.parser_features) || {};
  }
  function getConstructionAffordances(nodeOrBundle) {
    const bundle = getFeatureBundle(nodeOrBundle);
    return (bundle && bundle.construction_affordances) || {};
  }
  function getCoreDimensions(nodeOrBundle) {
    const bundle = getFeatureBundle(nodeOrBundle);
    return (bundle && bundle.core_dimensions) || {};
  }
  function getLexicalizationType(nodeOrBundle) {
    return getParserFeatures(nodeOrBundle).lexicalization_type || "none";
  }
  function hasPredicateSubtype(nodeOrBundle, subtype) {
    const subtypes = getParserFeatures(nodeOrBundle).predicate_subtype || [];
    return Array.isArray(subtypes) && subtypes.includes(subtype);
  }
  function isLexicalizedStative(nodeOrBundle) {
    return getLexicalizationType(nodeOrBundle) === "lexicalized_stative";
  }
  function isNegativeLexicalizedStative(nodeOrBundle) {
    return getLexicalizationType(nodeOrBundle) === "negative_lexicalized_stative";
  }
  function isOrdinaryStative(nodeOrBundle) {
    return hasPredicateSubtype(nodeOrBundle, "ordinary_stative");
  }
  function isStativePredicateByBundle(nodeOrBundle) {
    if (isLexicalizedStative(nodeOrBundle) || isNegativeLexicalizedStative(nodeOrBundle) || isOrdinaryStative(nodeOrBundle)) return true;
    const core = getCoreDimensions(nodeOrBundle);
    const affordances = getConstructionAffordances(nodeOrBundle);
    // v0.5.17: degree-stative lexical cleanup entries such as 好甜 carry
    // explicit stative/comment affordances in the feature bundle even when they
    // are not ordinary_stative predicates. Trust that controlled bundle signal so
    // demonstrative topics can combine consistently with safe stative comments.
    return core.syntactic_category === "V" && affordances.can_head_comment === true;
  }
  function isGradablePredicate(nodeOrBundle) {
    return isStativePredicateByBundle(nodeOrBundle) && getCoreDimensions(nodeOrBundle).gradability === "gradable";
  }
  function canHeadComment(nodeOrBundle) {
    const affordances = getConstructionAffordances(nodeOrBundle);
    return isStativePredicateByBundle(nodeOrBundle) && affordances.can_head_comment === true;
  }
  function bundleCanFillStativeSlot(node, slot) {
    if (!node || node.kind !== "token") return null;
    const bundle = getFeatureBundle(node);
    if (!bundle) return null;
    switch (slot) {
      case "lexicalized_stative_predicate":
        return isLexicalizedStative(bundle) || isNegativeLexicalizedStative(bundle);
      case "negative_lexicalized_stative_predicate":
        return isNegativeLexicalizedStative(bundle);
      case "negative_lexicalized_stative":
        return isNegativeLexicalizedStative(bundle);
      case "ordinary_stative_predicate":
      case "ordinary_degree_stative_predicate":
        return isOrdinaryStative(bundle);
      case "stative_predicate":
        return isStativePredicateByBundle(bundle);
      case "comment_predicate":
      case "comment":
        return canHeadComment(bundle);
      case "modifier":
        return isGradablePredicate(bundle);
      default:
        return null;
    }
  }
  function parserActiveStativeSlotsForBundle(bundle) {
    const slots = [];
    if (!bundle) return slots;
    if (isNegativeLexicalizedStative(bundle)) {
      slots.push("negative_lexicalized_stative_predicate", "negative_lexicalized_stative");
    }
    if (isLexicalizedStative(bundle) || isNegativeLexicalizedStative(bundle)) {
      slots.push("lexicalized_stative_predicate");
    }
    if (isOrdinaryStative(bundle)) {
      slots.push("ordinary_stative_predicate");
    }
    if (isStativePredicateByBundle(bundle)) {
      slots.push("stative_predicate");
    }
    if (isGradablePredicate(bundle)) {
      slots.push("modifier");
    }
    if (canHeadComment(bundle)) {
      slots.push("comment_predicate");
    }
    return featureList(slots);
  }
  function conditionMatches(features, condition = {}) {
    if (condition.surfaces && condition.surfaces.includes(features.surface)) return true;
    if (condition.labels && condition.labels.includes(features.label)) return true;
    if (condition.pos && condition.pos.includes(features.pos)) return true;
    if (condition.syntaxIncludes && stringIncludesAny(features.syntax, condition.syntaxIncludes)) return true;
    if (condition.semantic && hasAny(features.semantic, condition.semantic)) return true;
    if (condition.verbClass && hasAny(features.verb_class, condition.verbClass)) return true;
    return false;
  }
  function generateTokenSlots(features) {
    const slots = new Set();
    for (const rule of SLOT_GENERATION_RULES) {
      if (conditionMatches(features, rule.when)) slots.add(rule.slot);
    }

    // Feature-composition slots: these are derived from compact features, not stored per token.
    if (features.pos === "noun" || features.pos === "np") slots.add("np");
    if (features.pos === "verb") slots.add("predicate");
    if (features.label === "how") slots.add("how");
    if (features.label === "why") slots.add("why");
    if (features.label === "when") slots.add("time");
    if (features.syntax.includes("demonstrative_determiner")) slots.add("demonstrative");
    if (["呢個", "嗰個", "呢啲", "嗰啲"].includes(features.surface)) slots.add("demonstrative_pronoun");
    if (features.syntax.includes("wh_determiner")) slots.add("wh_determiner");
    if (features.syntax.includes("quantity") || features.syntax.includes("numeral")) slots.add("quantity");
    if (features.syntax.includes("di_determiner")) slots.add("di_determiner");
    if (features.syntax.includes("modifier") || features.syntax.includes("noun_modifier")) slots.add("modifier");
    if (features.syntax.includes("weekday") || features.syntax.includes("time_np")) slots.add("time_head");
    if (features.surface === "嘅") slots.add("nominal_linker");
    if (features.surface === "下" || features.surface === "上") slots.add("temporal_modifier");
    if (features.surface === "開" || features.syntax.includes("verb_in_modifier")) slots.add("verb_modifier");
    if (features.surface === "就係" || features.syntax.includes("focus_copula")) slots.add("identification_marker");
    if (features.surface === "未") {
      slots.add("question_marker");
      slots.add("negator");
    }
    if (features.surface === "得" || features.syntax.includes("acceptability_predicate")) {
      slots.add("acceptability_predicate");
    }
    if (features.surface === "唔好" || features.syntax.includes("prohibitive_marker")) {
      slots.add("prohibitive_marker");
    }
    if (features.surface === "過") slots.add("experiential_aspect");
    if (features.surface === "緊") slots.add("progressive_aspect");
    if (features.surface === "咗") slots.add("perfective_aspect");
    if (features.surface === "吓") slots.add("delimitative_aspect");
    const stativeBundle = featureBundleFor(features.surface, { label: features.label, syntax: features.syntax }, features, [...slots]);
    for (const slot of parserActiveStativeSlotsForBundle(stativeBundle)) slots.add(slot);
    if (features.surface === "好似") slots.add("seeming_marker");
    if (features.surface === "諗住") slots.add("intention_predicate");
    if (features.surface === "一齊") slots.add("manner");
    if (features.surface === "左右" || features.surface === "大概") slots.add("approximation");
    if (features.surface === "度") slots.add("post_classifier_approximation");
    if (["咁", "噉"].includes(features.surface)) slots.add("discourse_marker");
    if (features.surface === "都") slots.add("focus_adverb");
    if (features.surface === "啲") slots.add("quantity_modifier");
    if (features.surface === "鍾意") slots.add("preference_predicate");
    if (features.surface === "有冇") slots.add("existential_question");
    if (features.surface === "食") slots.add("purpose_verb");
    if (features.syntax.includes("verb_complement")) slots.add("verb_complement");
    if (features.syntax.includes("result_complement")) slots.add("result_complement");
    if (features.syntax.includes("directional_result_complement")) slots.add("directional_result_complement");
    return cleanSlots([...slots]);
  }

  return {
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
  };
};
