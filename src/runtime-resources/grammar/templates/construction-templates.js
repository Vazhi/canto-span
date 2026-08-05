"use strict";

module.exports = [
  {
    type: "OpinionQuestion",
    label: "OpinionQ",
    template: ["subject!", "stance_predicate!", "topic_or_object!", "evaluation_question!", "particle?"],
    constraints: {
      slot_surface_in: {
        stance_predicate: ["覺得"],
        evaluation_question: ["點樣"]
      }
    },
    predicate_subtype: "jyutgok_dimjoeng_evaluation_question",
    not_claims: ["not_all_stance_predicates", "not_all_question_complements", "not_subjectless", "not_referentless"],
    note: "Bounded source-linked evaluation question with an overt subject, 覺得, an overt evaluated referent, and 點樣. Other cognition-question complements remain independently structured."
  },
  {
    type: "NegativeCognitionFragment",
    label: "NegCognition",
    template: ["negative_cognition_predicate!", "particle?"],
    note: "Negative cognition fragment: 唔知 as a stable learner fragment / short answer."
  },
  {
    type: "ANotAQuestion",
    label: "A-not-A",
    template: ["subject?", "action_verb!", "m4_negator!", "action_verb!", "object?", "particle?"],
    constraints: { copied_first_token_surface_slots: ["action_verb"] },
    output_slots: ["question_fragment", "predicate", "vp", "action_vp", "negator", "object"],
    note: "Category-based A-not-A polar question: optional subject + verb + 唔 + copied verb/VO complement, preserving the copied verb and transparent VP/object child."
  },
  {
    type: "NegativePotentialComplement",
    label: "NegPotential",
    template: ["action_verb!", "m4_negator!", "result_complement_marker!", "object?"],
    role_overrides: {
      result_complement_marker: {
        label: "func",
        syntax: "result_potential_complement",
        note: "到 marks the result/attainment complement in a negative potential phrase."
      }
    },
    output_slots: ["negative_potential_complement", "result_potential_complement", "result_complement", "vp", "action_vp", "predicate", "negator", "object"],
    note: "Category-based negative potential/result complement: action verb + 唔 + 到 + optional object."
  },
  {
    type: "ResultComplement",
    label: "Result",
    template: ["action_verb!", "result_complement_marker!", "object?"],
    role_overrides: {
      result_complement_marker: {
        label: "func",
        syntax: "result_complement",
        note: "到 marks that the action reaches or attains a result."
      }
    },
    output_slots: ["result_complement", "result_attainment_complement", "vp", "action_vp", "predicate", "object"],
    note: "Category-based positive result/attainment complement: action verb + 到 + optional object."
  },
  {
    type: "CompletionQuestion",
    label: "V完未",
    template: ["subject?", "completion_vp!", "question_marker!", "particle?"],
    note: "Completion question: optional subject + completed VP + 未 + optional particle."
  },
  {
    type: "ProgressiveWhObjectQuestion",
    label: "ProgWhQ",
    template: ["subject?", "progressive_vp!", "wh_object!", "particle?"],
    role_overrides: {
      wh_object: {
        label: "what",
        syntax: "wh_object",
        slots: ["wh_object", "object"],
        note: "咩 is functioning as the object wh-word here, not as a sentence-final surprise particle."
      }
    },
    note: "Progressive what-object question: subject + progressive VP + wh object."
  },
  {
    type: "ExistentialQuestion",
    label: "Have?",
    template: ["subject?", "existential_question!", "topic_or_object!", "particle?"],
    constraints: { slot_must_not_have_slots: { topic_or_object: ["vp", "action_vp", "predicate", "productive_vo"] } },
    note: "Existential/possessive yes-no question: optional subject + 有冇 + possessed/existing NP."
  },
  {
    type: "NegatedExistentialClause",
    label: "NoHave",
    template: ["subject?", "negated_existential!", "topic_or_object!", "particle?"],
    note: "Negated existential/possessive clause: optional subject + 冇 + possessed/existing NP."
  },
  {
    type: "ExistentialWhQuestion",
    label: "有咩",
    template: ["subject?", "existential!", "wh_object!", "topic_or_object?", "particle?"],
    note: "Existential wh-question with 有 + wh object, optionally followed by a noun phrase."
  },
  {
    type: "ExistentialClause",
    label: "Have",
    template: ["subject?", "existential!", "topic_or_object!", "particle?"],
    note: "Existential/possessive clause: optional subject + 有 + possessed/existing NP."
  },
  {
    type: "SubjectPredicateClause",
    label: "SubjPred",
    template: ["subject!", "stative_predicate!", "particle?"],
    output_slots: ["subject_predicate_clause", "subject", "predicate", "clause", "stative_predicate", "comment", "comment_predicate"],
    retired_label_alias: "SubjectStativePredicateClause",
    template_family: "generative_template",
    predicate_subtype: "stative",
    note: "Subject-led predicate clause with stative predicate subtype: subject + stative predicate, separated from topic-comment evaluation."
  },
  {
    type: "TopicComment",
    label: "TopicComment",
    template: ["opinion_topic!", "comment_predicate!", "particle?"],
    constraints: {
      first_node_must_not_have_slots: ["subject", "co_participant", "stance_holder", "recipient"]
    },
    note: "Topic-comment clause: topic/content NP + safe comment predicate family."
  },
  {
    type: "ReportedSpeech",
    label: "Reported",
    template: ["subject?", "speech_verb!", "reported_content!", "particle?"],
    constraints: {
      slot_must_not_have_slots: {
        reported_content: ["degree_manner_adverbial"]
      }
    },
    note: "Reported speech/evaluation: speech-reporting verb plus reported content. A postverbal degree/manner complement such as 講大聲啲 is not reported content."
  },
  {
    type: "ExperientialClause",
    label: "ExpClause",
    template: ["subject?", "experiential_vp!", "particle?"],
    note: "Experiential clause with optional pro-drop subject and experiential VP anchor."
  },
  {
    type: "IntentionFrame",
    label: "Intention",
    template: ["subject!", "intention_predicate!", "vp!", "particle?"],
    constraints: { slot_surface_in: { intention_predicate: ["諗住"] } },
    note: "Source-linked lexical intention profile: 諗住 followed by a visible VP complement."
  },
  {
    type: "OpinionStanceFrame",
    label: "Opinion/Stance",
    template: ["subject?", "stance_predicate!", "stance_marker?", "opinion_topic?", "degree?", "stative_predicate!", "particle?"],
    note: "Opinion plus evaluation frame: optional subject + stance predicate + optional topic/content + stative predicate."
  },
  {
    type: "ExperientialQuestion",
    label: "Exp未",
    template: ["subject?", "experiential_vp!", "question_marker!", "particle?"],
    note: "Experiential question with final 未: experiential VP + question marker."
  },
  {
    type: "NegativeExperiential",
    label: "NegExp",
    template: ["subject?", "focus_adverb?", "negator!", "experiential_vp!", "particle?"],
    constraints: { slot_surface_in: { negator: ["未", "冇"] } },
    note: "Negative/not-yet experiential: preverbal 未/冇 + experiential VP."
  },
  {
    type: "ExperientialYesNoQuestion",
    label: "Exp?",
    template: ["subject?", "existential_question!", "experiential_vp!", "topic_or_object?", "particle?"],
    note: "Have-or-not experiential question."
  },
  {
    type: "ExistentialQuestion",
    label: "Have?",
    template: ["subject?", "interest_question_frame!", "vp?", "particle?"],
    output_slots: ["existential_question", "question_fragment", "possessive_question", "predicate", "object", "abstract_object"],
    retired_label_alias: "InterestQuestion",
    existential_subtype: "abstract_object",
    abstract_object_domain: "interest",
    note: "Existential question over the lexicalized abstract-object frame 有冇興趣. Interest is domain metadata, not the active construction label."
  },
  {
    type: "ExistentialQuestion",
    label: "Have?",
    template: ["subject?", "existential_question!", "abstract_object!", "vp?", "particle?"],
    constraints: { slot_must_not_have_slots: { abstract_object: ["vp", "action_vp", "predicate", "productive_vo"] } },
    output_slots: ["existential_question", "question_fragment", "possessive_question", "predicate", "object", "abstract_object"],
    retired_label_alias: "InterestQuestion",
    existential_subtype: "abstract_object",
    abstract_object_domain: "interest",
    note: "Existential question over an abstract object such as 興趣. Interest is domain metadata, not the active construction label."
  },
  {
    type: "DesiderativeVP",
    label: "WantVP",
    template: ["subject?", "degree?", "desiderative_modal!", "vp!", "particle?"],
    note: "Desire/wanting VP: optional subject and degree + specific desiderative modal + VP."
  },
  {
    type: "ModalANotAQuestion",
    label: "ModalQ",
    template: ["subject?", "modal!", "negator?", "modal!", "vp!", "particle?"],
    note: "Broad modal A-not-A question: optional subject + modal A-not-A material + VP. Subtype metadata distinguishes desiderative 想唔想 from permission 可唔可以."
  },
  {
    type: "LocativeWhQuestion",
    label: "WhereQ",
    template: ["subject?", "time?", "directional_motion_vp!", "perfective_aspect!", "location_question!", "particle?"],
    output_slots: ["question_fragment", "location_question", "subject", "time", "perfective_aspect", "directional_motion_vp", "predicate", "vp", "clause", "location"],
    note: "Motion locative wh-question: optional subject/time + directional motion VP + perfective aspect + location question."
  },
  {
    type: "LocativeWhQuestion",
    label: "WhereQ",
    template: ["locative_marker?", "location_question!", "particle?"],
    output_slots: ["question_fragment", "location_question", "location", "clause"],
    note: "Locative wh-question."
  },
  {
    type: "ScalarEvaluation",
    label: "ValueEval",
    template: ["negator!", "evaluation_marker!", "degree?", "stative_predicate!", "particle?"],
    output_slots: ["scalar_evaluation", "evaluation_clause", "predicate", "stative_predicate", "negator"],
    polarity_profile: "negative",
    note: "Negative lexical 算 evaluation with an overt property predicate; subject/topic and focus material remain visible when present."
  },
  {
    type: "ApproximateQuantity",
    label: "Approx",
    template: ["price_noun!", "approximation!", "particle?"],
    note: "Approximate price/quantity fragment: amount + approximation marker."
  },
  {
    type: "AcceptabilityClause",
    label: "Acceptability",
    template: ["subject?", "predicate!", "focus_adverb!", "acceptability_predicate!", "particle?"],
    output_slots: ["acceptability_clause", "acceptability", "focus_adverb", "acceptability_predicate", "predicate", "clause"],
    retired_label_alias: "PermissionAcceptabilityClause",
    acceptability_subtype: "action_feasibility",
    note: "Bounded declarative action-feasibility profile with an overt action predicate followed by 都得. Wh/free-choice 都得 requires separate analysis."
  },
  {
    type: "AcceptabilityANotA",
    label: "得唔得",
    template: ["time?", "acceptability_predicate!", "negator!", "acceptability_predicate!", "particle?"],
    note: "Acceptability A-not-A question: optional time/topic + 得唔得 + optional particle."
  },
  {
    type: "SuggestionQuestion",
    label: "Suggest",
    template: ["discourse_marker?", "suggestion_marker!", "vp!", "particle?"],
    note: "Suggestion construction headed by a suggestion marker."
  },
  {
    type: "ProhibitiveImperative",
    label: "Prohibitive",
    template: ["prohibitive_marker!", "vp!", "particle?"],
    note: "Prohibitive imperative: 唔好 + VP."
  },
  {
    type: "DegreeMannerModifiedVP",
    label: "DegMannerVP",
    template: ["degree_manner_adverbial!", "vp!", "particle?"],
    template_family: "generative_template",
    output_slots: ["degree_manner_modified_vp", "degree_manner_adverbial", "modifier", "degree", "vp", "action_vp", "predicate"],
    wrapper_policy: "transparent_modifier_wrapper",
    wrapper_reason: "v0.5.100 cleanup: attach productive degree/manner + 啲 phrases such as 快啲 to the following motion/action VP instead of leaving multi-root top constructions.",
    not_claims: [
      "not_standalone_degree_fragment",
      "not_motion_predicate_reanalysis",
      "not_serial_chain_collapse",
      "not_full_xbar_tree"
    ],
    note: "Broad transparent wrapper for degree/manner adverbial + following VP/action predicate. Keeps the inner motion or serial-purpose predicate visible while making the whole instruction one predicate span."
  },
  {
    type: "TemporalClause",
    label: "Time",
    template: ["time!", "locative_phrase!", "predicate!", "particle?"],
    constraints: {
      predicate_must_have_any_slots: ["serial_verb_purpose_chain"]
    },
    note: "Time/location clause: time + locative phrase + controlled predicate, preserving the accepted TemporalClause shape without fallback."
  },
  {
    type: "TemporalClause",
    label: "Time",
    template: ["time!", "subject?", "predicate!", "particle?"],
    note: "Time setting plus optional subject and predicate."
  },
  {
    type: "SubjectPredicateClause",
    label: "SubjPred",
    template: ["subject!", "time!", "predicate!", "particle?"],
    output_slots: ["subject_predicate_clause", "subject", "time", "predicate", "clause", "temporal_clause", "time_clause"],
    retired_label_alias: "SubjectTimePredicateClause",
    template_family: "generative_template",
    clause_modifier_profile: "time",
    note: "Subject-led predicate clause with time modifier: subject + time adverbial + predicate, preserving the predicate child."
  },
  {
    type: "SubjectPredicateClause",
    label: "SubjPred",
    template: ["subject!", "time!", "locative_phrase!", "predicate!", "particle?"],
    output_slots: ["subject_predicate_clause", "subject", "time", "location", "predicate", "clause", "temporal_clause", "time_clause"],
    retired_label_alias: "SubjectTimeLocationPredicateClause",
    template_family: "generative_template",
    clause_modifier_profile: "time_location",
    constraints: {
      predicate_must_have_any_slots: ["serial_verb_purpose_chain"]
    },
    note: "Subject-led predicate clause with time/location modifiers: subject + time adverbial + locative phrase + controlled predicate, preserving all child spans."
  },
  {
    type: "SubjectPredicateClause",
    label: "SubjPred",
    template: ["subject!", "predicate!", "particle?"],
    output_slots: ["subject_predicate_clause", "subject", "predicate", "clause", "negative_clause", "negated_predicate", "negator"],
    retired_label_alias: "SubjectNegatedPredicateClause",
    template_family: "generative_template",
    polarity: "negative",
    constraints: {
      predicate_must_have_any_slots: ["negated_directional_motion_vp", "negated_vp"]
    },
    note: "Subject-led predicate clause with negated predicate subtype: subject + negated predicate + optional particle, preserving the negated predicate child."
  },
  {
    type: "SubjectPredicateClause",
    label: "SubjPred",
    template: ["subject!", "predicate!", "particle?"],
    constraints: {
      predicate_must_have_any_slots: ["transitive_vp", "productive_vo", "progressive_vp", "perfective_vp", "completion_vp", "locative_posture_vp", "directional_motion_vp", "motion_goal_vp", "motion_purpose_chain", "serial_verb_purpose_chain"],
      disallow_child_slots: ["negated_directional_motion_vp", "negated_vp"]
    },
    note: "Subject-led predicate clause: subject + ordinary VP/aspect/locative-posture predicate + optional particle, preserving the predicate child while avoiding priority-marker and negated-motion diagnostics."
  },
  {
    type: "LocativeModalPredicateClause",
    label: "LocModal",
    template: ["location!", "time?", "how?", "modal_vp!", "particle?"],
    note: "Location/setting plus modal predicate clause: locative setting + optional frequency/certainty modifier + modal VP."
  },
  {
    type: "SubjectModalPredicateClause",
    label: "SubjModal",
    template: ["subject!", "time?", "how?", "modal_vp!", "particle?"],
    note: "Subject-preserving modal predicate clause: subject + optional time/certainty modifier + modal VP."
  },
  {
    type: "TopicModalPredicateClause",
    label: "TopicModal",
    template: ["topic!", "time?", "how?", "modal_vp!", "particle?"],
    constraints: {
      first_node_must_not_have_slots: ["subject", "co_participant", "stance_holder", "recipient", "location"]
    },
    note: "Topic-preserving modal predicate clause: topic NP + optional time/certainty modifier + modal VP."
  },
  {
    type: "NamingClause",
    label: "Called",
    template: ["subject!", "naming_verb!", "name!", "particle?"],
    constraints: { slot_surface_in: { naming_verb: ["叫"] } },
    note: "Source-linked personal naming clause: subject + 叫 + visible personal name."
  },
  {
    type: "FormulaDiscourseUnit",
    label: "Formula",
    template: ["formula_expression!", "particle?"],
    note: "Formula discourse unit: fixed social expression plus optional sentence-final particle. Former LeaveTakingFormula subtype is retired into this broad category."
  },
  {
    type: "PoliteImperativeClause",
    label: "PoliteImperative",
    template: ["politeness_marker!", "subject!", "time?", "path_phrase!", "predicate!", "particle?"],
    note: "Polite imperative clause: 請 + addressee + optional time + path phrase + motion/action predicate."
  },
  {
    type: "PolarQuestionFrame",
    label: "YesNo?",
    template: ["subject!", "yes_no_question_marker!", "predicate!", "particle?"],
    note: "Broad polar-question frame. Productive paths include subject + 係咪 + predicate and a complete proposition-like host plus a sentence-final polar particle."
  },
  {
    type: "CopularIdentificationFrame",
    label: "Ident",
    template: ["topic!", "copula!", "np!", "particle?"],
    note: "Copular identification frame: topic + 係 + nominal complement."
  },
  {
    type: "CoordinatedNP",
    label: "CoordNP",
    template: ["np!", "coordinator!", "np!"],
    output_slots: ["coordinated_np", "left_np", "right_np", "coordinator", "np", "topic", "object"],
    note: "Coordinated noun phrase joined by 同. Subject use is assigned by a larger clause, not by the NP itself."
  },
  {
    type: "NominalHeadSpan",
    label: "NP",
    template: ["head_noun!"],
    constraints: {
      disallow_child_slots: [
        "demonstrative", "classifier", "quantity", "modifier", "nominal_linker",
        "vp", "action_vp", "predicate", "perfective_vp", "progressive_vp",
        "completion_vp", "result_complement_vp", "potential_result_vp",
        "negative_potential_complement", "transitive_vp", "productive_vo"
      ]
    },
    note: "Internal neutral nominal-head span. It preserves overt nominal material but cannot by itself license definiteness, ellipsis, argument role, or standalone utterance status; excludes already structured classifier/modified NPs and predicate/VP children."
  },
  {
    type: "StativeNominalComplement",
    label: "AdjNP",
    template: ["how?", "how?", "nominal_linker?", "head_noun!"],
    constraints: {
      require_any_assigned_slots: ["how", "nominal_linker"],
      first_node_must_not_have_slots: ["quantity"]
    },
    note: "Stative/modified nominal complement such as 好好嘅朋友; requires a visible stative modifier or nominal linker, and excludes quantity-headed noun phrases."
  },
  {
    type: "CopularRelationFrame",
    label: "Relation",
    template: ["subject!", "copula!", "copular_complement!", "particle?"],
    note: "Copular relation/classification frame: subject + 係 + complement."
  },
  {
    type: "LocativeExistentialClause",
    label: "LocExist",
    template: ["topic!", "location!", "wh_object!", "focus_adverb?", "existential!", "particle?"],
    note: "Locative existential clause: topic + inside/location + wh/everything + 都 + 有."
  },
  {
    type: "ClassifierObjectNP",
    label: "CL-NP",
    template: ["classifier!", "head_noun!"],
    note: "Classifier-headed object NP without an overt numeral/demonstrative, e.g. 樣驚喜."
  },
  {
    type: "CoordinatedSubjectModalPredicateClause",
    label: "CoordSubjModal",
    template: ["subject!", "modal_vp!", "particle?"],
    note: "Coordinated-subject modal clause preserving an existing ModalVP child."
  },
  {
    type: "ClauseRelationGraph",
    label: "ClauseLink",
    template: ["clause_like!", "separator!", "clause_like!"],
    note: "Governed discourse/coordination wrapper over comma-linked clause-like constructions. Child constructions stay visible and unchanged; this is not a phrase-internal generative template."
  },
  {
    type: "ModalVP",
    label: "ModalVP",
    template: ["subject?", "time?", "negator?", "modal!", "manner?", "vp!", "particle?"],
    note: "Modal/desiderative construction matched by generated slot types."
  },
];
