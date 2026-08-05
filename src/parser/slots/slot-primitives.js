"use strict";

const SLOT_ALIASES = require("../../runtime-resources/grammar/slot-aliases");

module.exports = function createSlotPrimitives(dependencies = {}) {
  const {
    cleanSlots,
    bundleCanFillStativeSlot,
  } = dependencies;

  function mergeUnique(...lists) {
    return [...new Set(lists.flat().filter(Boolean))].sort();
  }
  function constructionSlotsByType(type, children = []) {
    const childSlots = children.flatMap(nodeSlots);
    const has = (slot) => childSlots.includes(slot);
    const slots = [];
    if (["ExperientialQuestion"].includes(type)) slots.push("experiential_question", "question_fragment", "experiential_vp");
    if (["ExperientialClause"].includes(type)) slots.push("experiential_clause", "experiential_vp", "predicate");
    if (["NegativeExperiential"].includes(type)) slots.push("negative_experiential", "experiential_vp", "predicate");
    if (["SourceMotionClause"].includes(type)) slots.push("source_motion_clause", "source", "source_marker", "location", "movement_verb", "directional_motion_vp", "vp", "predicate", "clause", "subject");
    if (["DirectedMannerMotionVP"].includes(type)) slots.push("directed_manner_motion_vp", "movement_verb", "manner_motion", "movement_direction", "path_component", "path_phrase", "deictic_motion_marker", "goal", "location", "predicate", "vp", "action_vp");
    if (["GoalAttainmentMotionVP"].includes(type)) slots.push("goal_attainment_motion_vp", "movement_verb", "goal_attainment_complement", "result_marker", "goal", "location", "predicate", "vp", "action_vp");
    if (["NegativeCognitionFragment"].includes(type)) slots.push("negative_cognition_fragment", "cognition_predicate", "negative_cognition_predicate", "predicate");
    if (["NegatedExistentialFragment"].includes(type)) slots.push("negated_existential_fragment", "negated_existential", "answer_fragment", "discourse_response", "predicate", "particle");
    if (["CognitionContentFrame"].includes(type)) slots.push("cognition_content_frame", "cognition_predicate", "reported_content", "content_clause", "predicate");
    if (["IntentionFrame"].includes(type)) slots.push("intention_frame", "vp", "predicate", "intention_predicate");
    if (["IntransitiveVP"].includes(type)) slots.push("intransitive_vp", "action_vp", "vp", "predicate", "action_verb");
    if (["DesiderativeVP"].includes(type)) slots.push("desiderative_vp", "vp", "predicate", "modal");
    if (["MalformedCandidate"].includes(type)) slots.push("malformed_candidate", "needs_review", "predicate", "problem_span", "action_verb", "quantity");
    if (["FragmentAnswer"].includes(type)) slots.push("fragment_answer", "possessive_fragment", "answer_fragment", "np", "subject");
    if (["ComplementEllipsisFragment"].includes(type)) slots.push("complement_ellipsis_fragment", "fragment_answer", "reported_content", "content_clause", "predicate", "clause");
    if (["DegreeMannerModifiedVP"].includes(type)) slots.push("degree_manner_modified_vp", "degree_manner_adverbial", "modifier", "degree", "vp", "action_vp", "predicate");
    if (["ANotAQuestion"].includes(type)) slots.push("question_fragment", "predicate", "vp", "action_vp", "negator");
    if (["ModalANotAQuestion"].includes(type)) {
      slots.push("modal_a_not_a_question", "question_fragment", "modal", "predicate", "vp");
      if (has("desiderative_a_not_a_question") || has("desiderative_modal")) slots.push("desiderative_modal");
      if (has("permission_a_not_a_question") || has("permission_a_not_a_modal") || has("permission_modal")) slots.push("permission_modal");
    }
    if (["ApproximateQuantity"].includes(type)) slots.push("approximate_quantity", "quantified_object", "quantity", "classifier", "approximation", "object", "np", "topic", "price_noun", "scalar_value_noun");
    if (["ScalarValueQuestion"].includes(type)) {
      slots.push("scalar_value_question", "scalar_dimension_question", "question_fragment", "scalar_wh_degree", "scalar_dimension_predicate", "predicate");
      if (has("price_question") || has("price_noun") || has("scalar_value_noun")) slots.push("price_question");
    }
    if (["ScalarEvaluation"].includes(type)) slots.push("scalar_evaluation", "evaluation_clause", "predicate", "stative_predicate", "comment", "comment_predicate", "negator", "evaluation_marker");
    if (["ClauseRelationEdge"].includes(type)) slots.push("clause_relation", "left_relation_member", "right_relation_member", "antecedent_clause", "consequent_clause", "reason_clause", "result_clause", "concession_clause", "counterexpectation_clause", "earlier_event", "later_event", "temporal_subordinate", "matrix_clause", "linker_left", "linker_right", "predicate", "clause", "clause_like", "reported_content", "content_clause");
    if (["ClauseRelationMemberSpan"].includes(type)) slots.push("clause_relation_member", "left_relation_member", "right_relation_member", "predicate", "clause", "clause_like");
    if (["ConditionalClause"].includes(type)) slots.push("conditional_clause", "condition_clause", "conditional_antecedent", "conditional_marker", "predicate", "clause");
    if (["AcceptabilityANotA"].includes(type)) slots.push("acceptability_question", "question_fragment", "acceptability_predicate");
    if (["CompletionQuestion"].includes(type)) slots.push("completion_question", "completion_vp", "question_fragment", "question_marker");
    if (["ProhibitiveImperative"].includes(type)) slots.push("prohibitive_marker", "imperative", "prohibitive_imperative", "predicate");
    if (["ReportedSpeech"].includes(type)) slots.push("reported_speech", "speech_verb", "reported_content");
    if (["OpinionStanceFrame"].includes(type)) slots.push("opinion_stance_frame", "stance_predicate", "reported_content", "predicate", "content_clause");
    if (["DiscourseParticleFrame"].includes(type)) {
      slots.push("discourse_particle_frame", "scope_host", "discourse_scope_particle", "particle", "predicate", "clause");
      if (has("epistemic_scope_particle")) slots.push("epistemic_stance", "epistemic_scope_particle");
      if (has("evidential_scope_particle")) slots.push("evidential_stance", "evidential_scope_particle");
      if (has("directive_scope_particle")) slots.push("directive_stance", "directive_scope_particle");
      if (has("change_state_scope_particle")) slots.push("change_state_stance", "change_state_scope_particle");
    }
    if (["FocusParticleFrame"].includes(type)) slots.push("focus_particle_frame", "restriction_marker", "scalar_host", "restrictive_focus_particle", "focus_adverb", "particle", "quantity", "degree", "np", "topic", "object");
    if (["IdentificationFragment"].includes(type)) slots.push("identification_fragment", "topic_or_object", "np");
    if (["DefinitionExplanatoryFrame"].includes(type)) slots.push("definition_explanatory_frame", "definition_frame", "identification_clause", "copular_clause", "explanatory_clause", "topic", "object", "np", "predicate", "clause");
    if (["DefinitionComplement"].includes(type)) slots.push("definition_complement", "object", "np", "topic_or_object");
    if (["IntendedFunctionRelation", "ResourceUseLaiFunctionRelation"].includes(type)) slots.push("intended_function_relation", "function_relation", "function_topic", "topic", "user_subject", "modal", "copula", "negator", "purpose_use_verb", "purpose_lai_marker", "purpose_predicate", "predicate", "vp", "action_vp", "clause");
    if (["LocativeWhQuestion"].includes(type)) slots.push("question_fragment", "location_question", "location", "predicate", "vp", "clause");
    if (["ProgressiveWhObjectQuestion"].includes(type)) slots.push("progressive_wh_object_question", "question_fragment", "progressive_vp", "wh_object", "predicate");
    if (["ExistentialClause"].includes(type)) slots.push("existential_clause", "possessive_clause", "predicate", "existential", "object");
    if (["NegatedExistentialClause"].includes(type)) slots.push("negated_existential_clause", "possessive_clause", "predicate", "negated_existential", "object");
    if (["ExistentialQuestion"].includes(type)) slots.push("existential_question", "question_fragment", "possessive_question", "predicate", "object");
    if (["TopicComment"].includes(type)) slots.push("topic_comment", "evaluation_clause", "reported_content", "predicate", "content_topic", "opinion_topic", "comment", "comment_predicate", "stative_predicate");
    if (["PostThemeParticipantRelation"].includes(type)) slots.push("post_theme_participant_relation", "post_theme_link_marker", "post_theme_participant", "person_np", "np", "predicate", "vp", "action_vp");
    if (["BenefactivePurposeVP"].includes(type)) slots.push("benefactive_purpose_vp", "benefactive_action_chain", "purpose_chain", "vp", "action_vp", "predicate", "recipient");
    if (["LocativePlacePhrase"].includes(type)) slots.push("locative_phrase", "location", "goal");
    if (["LocativePostureVP"].includes(type)) slots.push("locative_posture_vp", "posture_verb", "locative_phrase", "location", "vp", "action_vp", "predicate");
    if (["MannerAdverbialVP"].includes(type)) slots.push("manner_adverbial_vp", "manner", "modifier", "vp", "action_vp", "predicate", "subject");
    if (["ProductiveVO"].includes(type)) slots.push("vp", "productive_vo", "action_vp", "predicate", "object");
    if (["ResultComplement", "ResultComplementVP", "NegativePotentialComplement", "PotentialResultVP"].includes(type)) slots.push("vp", "action_vp", "predicate", "result_complement", "result_potential_complement");
    if (["ResultComplementVP"].includes(type)) slots.push("result_complement_vp");
    if (["PotentialResultVP"].includes(type)) slots.push("potential_result_vp", "potential_marker");
    if (["NegativePotentialComplement"].includes(type)) slots.push("negative_potential_complement", "negator");
    if (["ResultComplement"].includes(type)) slots.push("result_attainment_complement");
    if (["ExperientialVP", "ExperientialMotionGoalVP"].includes(type)) slots.push("vp", "experiential_vp", "action_vp", "predicate");
    if (["ExperientialMotionGoalVP"].includes(type)) slots.push("motion_goal_vp", "movement_verb", "goal", "location");
    if (["MotionGoalVP"].includes(type)) slots.push("motion_goal_vp", "movement_verb", "goal", "location", "predicate", "vp", "action_vp");
    if (["ProgressiveVP"].includes(type)) slots.push("vp", "progressive_vp", "action_vp", "predicate");
    if (["PerfectiveVP", "PostverbalZoPerfectiveVP"].includes(type)) slots.push("vp", "perfective_vp", "completion_vp", "action_vp", "predicate");
    if (["VerbComplementVP"].includes(type)) slots.push("verb_complement_vp", "verb_complement", "vp", "action_vp", "predicate", "main_verb", "object");
    if (["LexicalGiveRelation"].includes(type)) slots.push("lexical_give_relation", "give_relation", "vp", "action_vp", "predicate", "transfer_predicate");
    if (["PassivePermissiveRelation"].includes(type)) slots.push("passive_permissive_relation", "bei_relation", "clause", "predicate", "vp", "pre_marker_participant", "postmarker_participant", "retained_patient_candidate");
    if (["CoverbFrame"].includes(type)) slots.push("coverb_frame", "coverb_phrase", "coverb_marker", "coverb_object", "preverbal_modifier", "predicate", "vp", "clause");
    if (["DelimitedVP", "ReduplicatedVP", "CompletionVP", "DitransitiveSpeechVP", "TransitiveVP", "ActionStativeVP"].includes(type)) slots.push("vp", "action_vp", "predicate");
    if (["TransitiveVP"].includes(type)) slots.push("transitive_vp");
    if (["DirectionalMotionVP", "CompoundDirectionalMotionVP"].includes(type)) slots.push("vp", "action_vp", "predicate", "movement_verb", "motion_predicate", "directional_motion_vp");
    if (["NegatedDirectionalMotionVP"].includes(type)) slots.push("vp", "action_vp", "predicate", "movement_verb", "motion_predicate", "directional_motion_vp", "negated_directional_motion_vp", "negator");
    if (["NegatedVP"].includes(type)) slots.push("negated_vp", "vp", "action_vp", "predicate", "negator");
    if (["MotionPurposeChain"].includes(type)) slots.push("motion_purpose_chain", "motion_action_chain", "purpose_chain", "vp", "action_vp", "predicate");
    if (["CompletionVP"].includes(type)) slots.push("completion_vp");
    if (["DitransitiveSpeechVP"].includes(type)) slots.push("speech_transfer_vp", "reported_content");
    if (["OvertHeadDemonstrativeClassifierNP", "DemonstrativeClassifierNP", "QuantifiedClassifierNP", "QuantifiedPersonNP", "QuantifiedTimeNP", "QuantityNP", "DiMarkedNP", "OrdinalClassifierNP", "AssociativeNP", "ModifiedNP", "ModifierNP", "NominalHeadSpan"].includes(type)) slots.push("np", "topic", "object", "head_noun");
    if (["HeadlessDemonstrativeClassifierNP"].includes(type)) slots.push("np", "topic", "object", "demonstrative", "classifier");
    if (["QuantifiedTimeNP"].includes(type)) slots.push("quantified_time_np", "time", "time_head", "quantity", "distributive_quantifier");
    if (["QuantityNP"].includes(type)) slots.push("quantity_np", "quantity");
    if (["MeasureExpression"].includes(type)) slots.push("measure_expression", "nominal_predicate", "predicate", "quantity", "nominal_measure_unit", "age_unit", "currency_unit", "area_measure_unit", "length_measure_unit", "dimension_predicate");
    if (["NominalPredicateClause"].includes(type)) slots.push("nominal_predicate_clause", "subject", "predicate", "nominal_predicate", "measure_expression", "clause");
    if (["QuantifiedPersonNP"].includes(type)) slots.push("subject", "quantity");
    if (["AssociativeNP"].includes(type)) slots.push("associative_np", "modified_np", "nominal_linker", "modifier");
    if (["DiMarkedNP"].includes(type)) slots.push("di_marked_np", "di_determiner", "quantity");
    if (type === "WhClassifierQuestion") slots.push("wh_fragment", "question_fragment", "topic_or_object");
    if (type === "TimeNP") slots.push("time");
    if (["Topic"].includes(type)) slots.push("topic", "np", "definition_topic", "purpose_topic", "function_topic");
    if (["StativePredicate", "DegreeStativePredicate", "DegreeModifiedLexicalStative", "NegatedStativePredicate"].includes(type)) slots.push("stative_predicate", "predicate", "comment", "comment_predicate");
    if (["LexicalizedStativePredicate", "DegreeModifiedLexicalStative"].includes(type)) slots.push("lexicalized_stative_predicate", "stative_predicate", "predicate", "comment", "comment_predicate");
    if (["NegatedStativePredicate"].includes(type)) slots.push("negated_stative_predicate", "ordinary_stative_predicate", "negator");
    if (["DegreeStativePredicate"].includes(type)) slots.push("degree_stative_predicate", "ordinary_degree_stative_predicate", "ordinary_stative_predicate", "degree");
    if (["DegreeStativePredicate"].includes(type) && has("ambient_property_predicate")) slots.push("ambient_environmental_predicate");
    if (["ImpersonalEnvironmentalClause"].includes(type)) slots.push("impersonal_environmental_clause", "subjectless_clause", "environmental_predicate", "predicate", "clause", "weather_phenomenon");
    if (["LocativeFrameClause"].includes(type)) slots.push("locative_frame_clause", "ambient_frame_clause", "location", "environmental_predicate", "predicate", "clause");
    if (["ExistentialPresentationalClause"].includes(type)) slots.push("existential_presentational_clause", "existential_clause", "predicate", "existential", "negated_existential", "introduced_participant", "presentational_coda", "location", "clause");
    if (["DegreeModifiedLexicalStative"].includes(type)) slots.push("degree_modified_lexical_stative", "degree");
    if (["FormulaDiscourseUnit"].includes(type)) slots.push("formula_discourse_unit", "formula", "formula_expression", "discourse_response", "agreement_response", "confirmation_response", "particle", "clause");
    if (["FragmentQuestion"].includes(type)) slots.push("fragment_question", "question_fragment", "discourse_fragment", "clause");
    if (["TemporalClause"].includes(type)) slots.push("temporal_clause", "time_clause", "time", "predicate");
    if (["RelativeClauseNP"].includes(type)) slots.push("relative_clause_np", "relative_clause", "nominal_linker", "head_noun", "np", "subject", "topic", "object");
    if (["SubjectPredicateClause"].includes(type)) {
      slots.push("subject_predicate_clause", "subject", "predicate", "clause");
      if (has("time")) slots.push("temporal_clause", "time_clause", "time");
      if (has("location") || has("locative_phrase")) slots.push("location");
      if (has("stative_predicate")) slots.push("stative_predicate", "comment", "comment_predicate");
      if (has("negated_directional_motion_vp") || has("negator")) slots.push("negative_clause", "negated_predicate", "negator");
    }
    if (["ModalVP"].includes(type)) slots.push("modal_vp", "modal_predicate", "modal", "predicate", "vp");
    if (["JauDakMouDakAvailabilityPredicate"].includes(type)) slots.push("availability_predicate", "availability_opportunity", "modal_predicate", "predicate", "vp", "clause");
    if (["LocativeModalPredicateClause"].includes(type)) slots.push("locative_modal_predicate_clause", "modal_predicate_clause", "location", "modal_vp", "modal", "predicate", "clause");
    if (["SubjectModalPredicateClause"].includes(type)) slots.push("subject_modal_predicate_clause", "modal_predicate_clause", "subject", "modal_vp", "modal", "predicate", "clause");
    if (["TopicModalPredicateClause"].includes(type)) slots.push("topic_modal_predicate_clause", "modal_predicate_clause", "topic", "modal_vp", "modal", "predicate", "clause");
    if (["NamingClause"].includes(type)) slots.push("naming_clause", "naming_frame", "naming_frame", "subject", "naming_verb", "name", "np", "predicate", "clause");
    if (["PathPhrase"].includes(type)) slots.push("path_phrase", "path_marker", "location", "goal");
    if (["PoliteImperativeClause"].includes(type)) slots.push("polite_imperative_clause", "imperative", "politeness_marker", "subject", "time", "path_phrase", "location", "predicate", "clause");
    if (["PolarQuestionFrame"].includes(type)) slots.push("polar_question_frame", "yes_no_question", "question_fragment", "yes_no_question_marker", "subject", "predicate", "particle", "clause");
    if (["CopularIdentificationFrame"].includes(type)) slots.push("copular_identification_frame", "identification_clause", "copular_clause", "topic", "copula", "np", "object", "predicate", "clause");
    if (["CoordinatedNP"].includes(type)) slots.push("coordinated_np", "left_np", "right_np", "coordinator", "np", "topic", "object");
    if (["StativeNominalComplement"].includes(type)) slots.push("stative_nominal_complement", "copular_complement", "np", "predicate", "head_noun", "nominal_linker");
    if (["CopularRelationFrame"].includes(type)) slots.push("copular_relation_frame", "copular_clause", "subject", "copula", "copular_complement", "predicate", "clause");
    if (["CopularANotAQuestion"].includes(type)) slots.push("copular_a_not_a_question", "question_fragment", "subject", "copula", "negator", "copular_complement", "predicate", "clause");
    if (["LocativeExistentialClause"].includes(type)) slots.push("locative_existential_clause", "existential_clause", "location", "locative_domain", "introduced_theme", "existential", "negated_existential", "predicate", "clause");
    if (["OrdinalClassifierNP"].includes(type)) slots.push("ordinal_classifier_np", "classifier_np", "ordinal_modifier", "classifier", "head_noun", "np", "object", "topic");
    if (["PossessiveClassifierNP"].includes(type)) slots.push("possessive_classifier_np", "possessive_np", "possessor", "classifier", "head_noun", "np", "object", "topic");
    if (["ChangeIntoPredicate"].includes(type)) slots.push("change_into_predicate", "change_verb", "result_complement", "predicate", "vp", "action_vp");

    if (["ClassifierObjectNP"].includes(type)) slots.push("classifier_object_np", "np", "object", "topic", "classifier", "head_noun");
    if (["CoordinatedSubjectModalPredicateClause"].includes(type)) slots.push("coordinated_subject_modal_predicate_clause", "modal_predicate_clause", "subject", "coordinated_subject", "modal_vp", "modal", "predicate", "clause");


    if (["ClauseSequence", "ClauseRelationGraph"].includes(type)) slots.push("clause_linking_sequence", "clause_sequence", "multi_clause_sequence", "utterance_sequence", "discourse_sequence", "clause", "clause_like", "separator");
    if (["VocativeAddressTerm"].includes(type)) slots.push("vocative_address_term", "named_address_term", "address_term", "vocative");
    if (["UrgencyMarker"].includes(type)) slots.push("urgency_marker", "imperative_adverb", "how");
    if (["PriorityMarkerClause"].includes(type)) slots.push("priority_marker_clause", "sequence_priority_marker", "priority_marker", "vp", "action_vp", "predicate");
    if (["AcceptabilityClause"].includes(type)) slots.push("acceptability_clause", "acceptability", "focus_adverb", "acceptability_predicate", "predicate", "clause");
    if (["SerialVerbPurposeChain"].includes(type)) slots.push("serial_verb_purpose_chain", "serial_action_chain", "purpose_chain", "vp", "action_vp", "predicate");
    if (has("location")) slots.push("location", "goal");
    if (has("subject")) slots.push("subject");
    return cleanSlots(mergeUnique(childSlots, slots));
  }
  function nodeSlots(node) {
    if (!node) return [];
    if (node.kind === "token") return node.slots || [];
    if (node.kind === "construction") return node.slots || constructionSlotsByType(node.type, node.children || []);
    return [];
  }
  function slotAlternatives(slot) {
    return [slot, ...(SLOT_ALIASES[slot] || [])];
  }
  function nodeCanFillSlot(node, slot) {
    if (slot === "particle" && node && node.kind === "construction") return false;
    const alternatives = slotAlternatives(slot);

    // Phase 3: current stative parser checks read the controlled feature bundle first.
    // Slot fallback below remains transitional for constructions and non-migrated logic only.
    for (const candidate of alternatives) {
      const bundleDecision = bundleCanFillStativeSlot(node, candidate);
      if (bundleDecision !== null) return bundleDecision;
    }

    const slots = nodeSlots(node);
    return alternatives.some((candidate) => slots.includes(candidate));
  }
  function isBareQuantityTokenObject(node) {
    if (!node || node.kind !== "token") return false;
    const slots = nodeSlots(node);
    const syntax = String(node.syntax || "");
    return slots.includes("quantity")
      && slots.includes("object")
      && !slots.includes("classifier")
      && /(?:^|\s)numeral_quantity(?:\s|$)/.test(syntax);
  }
  function templateDerivedSlots(type, children) {
    return cleanSlots(mergeUnique(["construction_span"], constructionSlotsByType(type, children)));
  }

  return {
    mergeUnique,
    constructionSlotsByType,
    nodeSlots,
    slotAlternatives,
    nodeCanFillSlot,
    isBareQuantityTokenObject,
    templateDerivedSlots,
  };
};
