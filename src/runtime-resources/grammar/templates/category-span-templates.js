"use strict";

const PRODUCTIVE_VO = Object.fromEntries(require("../../lexicon/productive-vo"));
const UNIT_WORD_EVIDENCE = require("../unit-word-evidence.json");
const AB45_CLASSIFIER_TYPES = new Set(["general_classifier", "sortal_classifier", "honorific_classifier"]);
const AB45_CLASSIFIER_SURFACES = UNIT_WORD_EVIDENCE.noun_choice_rule_records
  .filter((rule) => {
    const sense = UNIT_WORD_EVIDENCE.unit_word_senses.find((entry) => entry.unit_word_sense_id === rule.unit_word_sense_id);
    return sense && AB45_CLASSIFIER_TYPES.has(sense.unit_word_type);
  })
  .map((rule) => rule.surface);

module.exports = [
  {
    type: "DegreeMannerAdverbial",
    label: "Adj+啲",
    template: ["degree_manner_head!", "degree_particle!"],
    template_family: "generative_template",
    role_overrides: {
      degree_manner_head: {
        label: "how",
        syntax: "degree_manner_head modifier",
        note: "Degree/manner head inside a productive stative/adjective or manner + 啲 phrase."
      },
      degree_particle: {
        label: "how",
        syntax: "degree_particle degree",
        note: "啲 functions as the degree particle inside the productive degree/manner phrase."
      }
    },
    output_slots: ["degree_manner_adverbial", "modifier", "degree", "predicate"],
    note: "Productive degree/manner + 啲 phrase over generated slots, covering stative/adjective heads such as 快/慢/貴/平 and manner heads such as 大聲/細聲/小心."
  },
  // Linguistic basis: vocative/address terms are a recognized discourse-pragmatic category;
  // Cantonese named address forms commonly use 阿-prefixes and kinship/title suffixes.
  {
    type: "VocativeAddressTerm",
    label: "Address",
    template: ["address_prefix!", "name_element!", "address_suffix!"],
    output_slots: ["vocative_address_term", "named_address_term", "address_term", "vocative"],
    note: "Category-based Cantonese named address/vocative term: familiar prefix + name element + address suffix, e.g. 阿霞姐."
  },
  {
    type: "VocativeAddressTerm",
    label: "Address",
    template: ["address_prefix!", "name_element!"],
    output_slots: ["vocative_address_term", "named_address_term", "address_term", "vocative"],
    note: "Category-based Cantonese familiar name/address term: familiar prefix + name element, e.g. 阿霞."
  },
  {
    type: "VocativeAddressTerm",
    label: "Address",
    template: ["surname_element!", "address_suffix!"],
    output_slots: ["vocative_address_term", "named_address_term", "address_term", "vocative"],
    note: "Category-based Cantonese surname/title address term: surname element + formal address suffix, e.g. 陳生 / 陳先生."
  },
  {
    type: "VocativeAddressTerm",
    label: "Address",
    template: ["name_element!", "address_suffix!"],
    output_slots: ["vocative_address_term", "named_address_term", "address_term", "vocative"],
    note: "Category-based Cantonese name/title address term: name element + familiar address suffix, e.g. 霞姐 / 明哥."
  },
  {
    type: "CompoundDirectionalMotionVP",
    label: "MotionVP",
    template: ["return_motion_verb!", "movement_direction!", "deictic_motion_marker!"],
    constraints: {
      slot_surface_in: {
        return_motion_verb: ["返"],
        movement_direction: ["上"],
        deictic_motion_marker: ["嚟", "去"]
      }
    },
    role_overrides: {
      return_motion_verb: { label: "doing", syntax: "return_motion_component", note: "返 functions as the return-motion component inside a directional-motion VP." },
      movement_direction: { label: "doing", syntax: "movement_direction_up", note: "上 functions as the upward-direction component inside a compound directional-motion VP." },
      deictic_motion_marker: { label: "doing", syntax: "deictic_motion_marker", note: "嚟/去 functions as doing/deictic motion inside a directional-motion VP; this contrasts with func uses in 係...嚟㗎 and 用嚟 frames." }
    },
    output_slots: ["directional_motion_vp", "vp", "action_vp", "predicate", "movement_verb", "motion_predicate"],
    note: "Slot-based compound directional motion VP: return-motion head + direction + deictic come, e.g. 返上嚟."
  },
  {
    type: "DirectionalMotionVP",
    label: "MotionVP",
    template: ["deictic_motion_marker!"],
    role_overrides: {
      deictic_motion_marker: { label: "doing", syntax: "deictic_motion_marker", note: "嚟 functions as a one-word doing/deictic motion VP; this contrasts with func uses in bounded explanatory/purpose frames." }
    },
    output_slots: ["directional_motion_vp", "vp", "action_vp", "predicate", "movement_verb", "motion_predicate"],
    note: "Narrow one-word deictic motion predicate. Multi-part directional material is excluded from AA49 and handled by separately accepted structures."
  },
  {
    type: "NegatedDirectionalMotionVP",
    label: "NegMotionVP",
    template: ["m4_negator!", "directional_motion_vp!"],
    template_family: "generative_template",
    constraints: { slot_surface_in: { m4_negator: ["唔", "冇"] } },
    role_overrides: {
      m4_negator: { label: "func", syntax: "negator", note: "唔 or aspect-sensitive 冇 negates the following directional-motion VP." }
    },
    output_slots: ["negated_directional_motion_vp", "directional_motion_vp", "vp", "action_vp", "predicate", "movement_verb", "motion_predicate", "negator"],
    note: "Slot-based negated directional motion VP: licensed negator + directional-motion VP, e.g. 唔落嚟 or 冇去."
  },
  {
    type: "LocativePlacePhrase",
    label: "Location",
    template: ["locative_marker!", "location!"],
    note: "Category-based locative place phrase: 喺 + place/location."
  },
  {
    type: "ExperientialMotionGoalVP",
    label: "ExpVP",
    template: ["movement_verb!", "experiential_aspect!", "goal!"],
    constraints: { slot_surface_in: { movement_verb: ["去"] } },
    note: "Source-linked experiential motion-goal VP: attested 去 + 過 + overt goal/location."
  },
  {
    type: "ExperientialVP",
    label: "ExpVP",
    template: ["action_verb!", "experiential_aspect!"],
    note: "Category-based experiential VP: action verb + 過."
  },
  {
    type: "ProgressiveVP",
    label: "ProgVP",
    template: ["action_verb!", "progressive_aspect!", "object!"],
    template_family: "generative_template",
    constraints: {
      slot_must_not_be_bare_quantity_token: ["object"],
      slot_must_not_have_slots: { object: ["wh_object", "question_marker", "yes_no_question_marker"] }
    },
    output_slots: ["progressive_vp", "vp", "action_vp", "predicate", "progressive_aspect", "object"],
    note: "Transparent progressive transitive VP: action verb + 緊 + overt non-interrogative object; wh objects remain owned by the question construction."
  },
  {
    type: "ProgressiveVP",
    label: "ProgVP",
    template: ["action_verb!", "progressive_aspect!"],
    note: "Category-based progressive VP: action verb + 緊."
  },
  {
    type: "DegreeModifiedLexicalStative",
    label: "DegreeLexicalStative",
    template: ["degree!", "lexicalized_stative_predicate!"],
    note: "Degree-modified lexicalized stative — degree word + dictionary-backed 好X stative predicate, e.g. 好 + 好食."
  },
  {
    type: "DegreeStativePredicate",
    label: "DegreeStative",
    template: ["degree!", "degree?", "ordinary_stative_predicate!"],
    note: "Ordinary degree-stative predicate: degree word + independently usable ordinary stative predicate, e.g. 好 + 遠 / 好 + 貴 / 好 + 正. Excludes registry-backed lexicalized 好X statives."
  },
  {
    type: "NegatedStativePredicate",
    label: "NegStative",
    template: ["negator!", "ordinary_stative_predicate!"],
    template_family: "generative_template",
    constraints: { slot_surface_in: { negator: ["唔"] } },
    note: "Controlled negated ordinary stative predicate: 唔 + independently usable ordinary stative, e.g. 唔忙. Excludes lexicalized 好X statives such as 好味."
  },
  {
    type: "NegatedStativePredicate",
    label: "NegStative",
    template: ["negator!", "lexicalized_stative_predicate!"],
    template_family: "generative_template",
    constraints: { slot_surface_in: { negator: ["唔"] } },
    note: "Controlled compositional negation of a dictionary-backed lexical property predicate: 唔 + 好X, e.g. 唔 + 好食. Lexical 難X and prohibitive 唔好 + verb remain separate."
  },
  {
    type: "TopicComment",
    label: "TopicComment",
    template: ["opinion_topic!", "comment_predicate!"],
    subspan_kind: "topic_comment_evaluation",
    constraints: {
      first_node_must_not_have_slots: ["subject", "co_participant", "stance_holder", "recipient"]
    },
    note: "Category-based topic-comment: topic/content NP + safe comment predicate family."
  },
  {
    type: "DelimitedVP",
    label: "V吓",
    template: ["action_verb!", "delimitative_aspect!"],
    role_overrides: {
      delimitative_aspect: {
        label: "func",
        syntax: "delimitative_aspect",
        slots: ["aspect_marker", "delimitative_aspect"],
        note: "吓 marks a light/delimitative action here, not an interjection."
      }
    },
    note: "Category-based delimitative VP: action verb + 吓."
  },
  {
    type: "ReduplicatedVP",
    label: "V一V",
    template: ["action_verb!", "action_verb!"],
    constraints: { same_surface: true },
    note: "Category-based verb reduplication: identical action verb repeated for a light/checking action."
  },
  {
    type: "ImpersonalEnvironmentalClause",
    label: "Environment",
    template: ["environmental_event_head!", "weather_phenomenon!"],
    template_family: "construction_template",
    constraints: { surface_sequence_in: ["落雨", "打風"] },
    role_overrides: {
      environmental_event_head: {
        label: "doing",
        syntax: "environmental_event_predicate",
        slots: ["environmental_event_head", "environmental_predicate", "predicate"],
        note: "Visible event head inside a conventional environmental predicate; no referential subject is inserted."
      },
      weather_phenomenon: {
        label: "what",
        syntax: "weather_phenomenon environmental_phenomenon",
        slots: ["weather_phenomenon", "environmental_phenomenon"],
        note: "Visible weather-phenomenon component; it is not analysed as an ordinary affected object."
      }
    },
    output_slots: ["impersonal_environmental_clause", "subjectless_clause", "environmental_predicate", "predicate", "clause", "weather_phenomenon"],
    subject_status: "impersonal",
    subjectless_type: "genuinely_subjectless_environmental",
    hidden_subject_inserted: false,
    not_claims: ["not_productive_vo_object_relation", "not_null_referential_subject", "not_hidden_expletive_subject"],
    note: "Conventional environmental event predicate such as 落雨 or 打風. The visible components remain transparent, but the clause has no referential subject or ordinary patient object."
  },
  {
    type: "ProductiveVO",
    label: "VP",
    template: ["action_verb!", "object!"],
    template_family: "generative_template",
    constraints: {
      surface_sequence_in: Object.keys(PRODUCTIVE_VO)
    },
    role_overrides: {
      action_verb: { label: "doing", syntax: "verb", note: "Action verb heading a productive verb-object VP." },
      object: { label: "what", syntax: "object", note: "Object noun inside a productive verb-object VP." }
    },
    output_slots: ["productive_vo", "vp", "action_vp", "predicate", "object"],
    note: "Slot-template ProductiveVO: generated action_verb + object pair, constrained to reviewed productive VO sequences while preserving visible children."
  },
  {
    type: "SerialVerbPurposeChain",
    label: "PurposeChain",
    template: ["directional_motion_vp!", "productive_vo!", "purpose_verb!", "particle?"],
    role_overrides: {
      purpose_verb: { label: "doing", syntax: "purpose_verb", note: "食 functions as the explicit purpose verb in a motion/action purpose chain." }
    },
    output_slots: ["serial_verb_purpose_chain", "serial_action_chain", "purpose_chain", "vp", "action_vp", "predicate"],
    note: "Category-based serial purpose chain: optional directional motion already grouped, ProductiveVO, and explicit purpose verb."
  },
  {
    type: "SerialVerbPurposeChain",
    label: "PurposeChain",
    template: ["productive_vo!", "purpose_verb!", "particle?"],
    role_overrides: {
      purpose_verb: { label: "doing", syntax: "purpose_verb", note: "食 functions as the explicit purpose verb after an action/object VP." }
    },
    output_slots: ["serial_verb_purpose_chain", "serial_action_chain", "purpose_chain", "vp", "action_vp", "predicate"],
    note: "Category-based serial purpose chain: ProductiveVO plus explicit purpose verb."
  },
  {
    type: "MotionPurposeChain",
    label: "MotionPurpose",
    template: ["directional_motion_vp!", "productive_vo!", "particle?"],
    output_slots: ["motion_purpose_chain", "motion_action_chain", "purpose_chain", "vp", "action_vp", "predicate"],
    note: "Category-based motion-purpose chain: directional motion plus an action/object VP such as 返嚟食飯 or 落嚟摘芒果."
  },
  {
    type: "ActionStativeVP",
    label: "VP",
    template: ["action_verb!", "stative_predicate!"],
    constraints: { slot_must_not_be_bare_quantity_token: ["stative_predicate"] },
    note: "Category-based action + stative/comparative predicate VP."
  },
  {
    type: "MotionGoalVP",
    label: "MotionGoal",
    template: ["directional_motion_vp!", "perfective_aspect!", "goal!"],
    template_family: "generative_template",
    constraints: {
      slot_must_not_have_slots: {
        goal: ["location_question", "wh_nominal"]
      }
    },
    role_overrides: {
      goal: {
        label: "where",
        syntax: "motion_goal_location place_or_goal",
        slots: ["goal", "location", "np", "topic", "head_noun"],
        note: "Place/location interpreted as the overt destination of a perfective motion event, not as an ordinary object."
      }
    },
    output_slots: ["motion_goal_vp", "directional_motion_vp", "movement_verb", "goal", "location", "perfective_aspect", "predicate", "vp", "action_vp"],
    note: "Broad perfective motion-goal VP: directional motion predicate + perfective aspect + overt destination, e.g. 去咗香港. Wh-place expressions remain in LocativeWhQuestion rather than entering this declarative path."
  },
  {
    type: "MotionGoalVP",
    label: "MotionGoal",
    template: ["movement_verb!", "perfective_aspect!", "goal!"],
    template_family: "generative_template",
    constraints: {
      slot_must_not_have_slots: {
        goal: ["location_question", "wh_nominal"]
      }
    },
    role_overrides: {
      movement_verb: {
        label: "doing",
        syntax: "motion_goal_verb movement_verb",
        slots: ["movement_verb", "action_verb", "main_verb", "predicate"],
        note: "Movement verb heading a perfective motion-to-destination predicate."
      },
      goal: {
        label: "where",
        syntax: "motion_goal_location place_or_goal",
        slots: ["goal", "location", "np", "topic", "head_noun"],
        note: "Place/location interpreted as the overt destination of a perfective motion event, not as an ordinary object."
      }
    },
    output_slots: ["motion_goal_vp", "movement_verb", "goal", "location", "perfective_aspect", "predicate", "vp", "action_vp"],
    note: "Broad perfective motion-goal VP: movement verb + perfective aspect + overt destination, e.g. 返咗屋企. Wh-place expressions remain in LocativeWhQuestion rather than entering this declarative path."
  },
  {
    type: "PostverbalZoPerfectiveVP",
    label: "PerfectiveVP",
    template: ["action_verb!", "perfective_aspect!", "object!"],
    constraints: {
      slot_must_not_be_bare_quantity_token: ["object"],
      slot_must_be_licensed_np: ["object"]
    },
    perfective_profile: "simple_postverbal_zo_overt_object",
    overt_object_required: true,
    aspect_marker_surface: "咗",
    aspect_category: "perfective_viewpoint",
    independent_past_tense_licensing: false,
    completion_or_result_licensing: false,
    completion_semantics_status: "not_decided_by_this_structural_node",
    experiential_licensing: false,
    hidden_object_insertion: false,
    selectional_compatibility_bypass: false,
    subject_insertion_capability: false,
    not_claims: ["not_past_tense_suffix", "not_separate_completion_or_result_node", "not_experiential", "not_hidden_object", "not_unrestricted_verb_object_compatibility"],
    note: "Source-linked structural subtype: an overt action predicate, postverbal 咗, and an overt licensed NP object. This node records perfective structure; it does not insert tense, hidden arguments, an experiential reading, or a separate completion/result node. Completion and current-relevance interpretations are not decided by this structural node, and predicate-object compatibility is reviewed separately."
  },
  {
    type: "PerfectiveVP",
    label: "PerfectiveVP",
    template: ["action_verb!", "perfective_aspect!", "particle?"],
    output_slots: ["perfective_vp", "completion_vp", "vp", "action_vp", "predicate", "perfective_aspect", "particle"],
    note: "Objectless perfective VP: action verb + 咗 + optional final particle. It may receive an activity reading or a context-linked object interpretation; the parent construction determines whether the full utterance is complete."
  },
  {
    type: "CompletionVP",
    label: "CompletionVP",
    template: ["action_verb!", "completion_marker!", "perfective_aspect!", "object!"],
    template_family: "generative_template",
    constraints: { slot_must_not_be_bare_quantity_token: ["object"] },
    output_slots: ["completion_vp", "perfective_vp", "vp", "action_vp", "predicate", "completion_marker", "perfective_aspect", "object"],
    note: "Completion-plus-perfective VP: action verb + result/completion marker + 咗 + overt object; the completion and viewpoint-aspect layers remain visible."
  },
  {
    type: "CompletionVP",
    label: "CompletionVP",
    template: ["action_verb!", "completion_marker!", "object!"],
    constraints: { slot_must_not_be_bare_quantity_token: ["object"] },
    note: "Category-based completion VP: action verb + completion marker + object."
  },
  {
    type: "CompletionVP",
    label: "CompletionVP",
    template: ["action_verb!", "completion_marker!"],
    template_family: "generative_template",
    constraints: { slot_surface_in: { completion_marker: ["完"] } },
    output_slots: ["completion_vp", "vp", "action_vp", "predicate", "completion_marker"],
    note: "Objectless completion predicate with overt 完; any omitted affected domain remains discourse-level rather than a fabricated object token."
  },
  {
    type: "ResultComplementVP",
    label: "ResultVP",
    template: ["action_verb!", "degree!", "perfective_aspect!", "object!"],
    template_family: "generative_template",
    constraints: {
      slot_surface_in: { degree: ["好"] },
      slot_must_not_be_bare_quantity_token: ["object"]
    },
    role_overrides: {
      degree: { label: "how", syntax: "result_state_complement", slots: ["result_complement"], note: "好 expresses the overt attained result state after the action verb." }
    },
    output_slots: ["result_complement_vp", "result_complement", "vp", "action_vp", "predicate", "perfective_aspect", "object"],
    note: "Transparent result-complement VP: action + overt result 好 + perfective 咗 + object."
  },
  {
    type: "ResultComplementVP",
    label: "ResultVP",
    template: ["action_verb!", "degree!", "object!"],
    template_family: "generative_template",
    constraints: {
      slot_surface_in: { degree: ["好"] },
      slot_must_not_be_bare_quantity_token: ["object"]
    },
    role_overrides: {
      degree: { label: "how", syntax: "result_state_complement", slots: ["result_complement"], note: "好 expresses the overt attained result state after the action verb." }
    },
    output_slots: ["result_complement_vp", "result_complement", "vp", "action_vp", "predicate", "object"],
    note: "Transparent result-complement VP: action + overt result 好 + object."
  },
  {
    type: "NegativePotentialComplement",
    label: "NegPotential",
    template: ["action_verb!", "m4_negator!", "completion_marker!", "classifier!", "head_noun!"],
    template_family: "generative_template",
    constraints: { slot_surface_in: { completion_marker: ["完"] } },
    role_overrides: {
      m4_negator: { label: "func", syntax: "negator potential_negator", slots: ["negator", "m4_negator"], note: "唔 negates the potential relation rather than the action itself." },
      completion_marker: { label: "func", syntax: "potential_result_complement", slots: ["result_complement", "completion_marker"], note: "完 is the overt result complement licensed by the negative potential pattern." },
      classifier: { label: "measure_word", syntax: "classifier", slots: ["classifier"], note: "Visible classifier inside the overt potential-construction object." },
      head_noun: { label: "what", syntax: "object head_noun", slots: ["object", "head_noun", "np"], note: "Overt object head inside the potential construction." }
    },
    output_slots: ["negative_potential_complement", "result_potential_complement", "result_complement", "vp", "action_vp", "predicate", "negator", "object", "classifier", "head_noun"],
    note: "Productive negative potential with result 完 and a transparent classifier-headed object."
  },
  {
    type: "NegativePotentialComplement",
    label: "NegPotential",
    template: ["action_verb!", "m4_negator!", "completion_marker!", "object?"],
    template_family: "generative_template",
    constraints: {
      slot_surface_in: { completion_marker: ["完"] },
      slot_must_not_be_bare_quantity_token: ["object"]
    },
    role_overrides: {
      m4_negator: { label: "func", syntax: "negator potential_negator", slots: ["negator", "m4_negator"], note: "唔 negates the potential relation rather than the action itself." },
      completion_marker: { label: "func", syntax: "potential_result_complement", slots: ["result_complement", "completion_marker"], note: "完 is the overt result complement licensed by the negative potential pattern." }
    },
    output_slots: ["negative_potential_complement", "result_potential_complement", "result_complement", "vp", "action_vp", "predicate", "negator", "object"],
    note: "Productive negative potential: action + 唔 + result 完 + optional overt object."
  },

  {
    type: "CompletionVP",
    label: "CompletionVP",
    template: ["action_verb!", "completion_marker!", "particle?"],
    constraints: { slot_surface_in: { completion_marker: ["晒"] } },
    output_slots: ["completion_vp", "vp", "action_vp", "predicate", "completion_marker", "particle"],
    completion_subtype: "totality_completion",
    note: "Objectless totality-completion VP: action verb + 晒, with the affected domain recoverable from the clause or discourse rather than fabricated as a null object."
  },
  {
    type: "DitransitiveSpeechVP",
    label: "tell",
    template: ["speech_verb!", "recipient!", "cognition_predicate!"],
    constraints: {
      slot_surface_in: {
        speech_verb: ["話"],
        cognition_predicate: ["知"]
      }
    },
    role_overrides: {
      speech_verb: { label: "doing", syntax: "speech_transfer_verb", note: "In this speech-transfer VP, 話 is the action tell/let know." }
    },
    note: "Category-based speech/transfer VP: tell someone know / let someone know."
  },
  {
    type: "VerbComplementVP",
    label: "VerbCompVP",
    template: ["action_verb!", "degree_manner_adverbial!"],
    template_family: "generative_template",
    role_overrides: {
      action_verb: {
        label: "doing",
        syntax: "main_verb",
        note: "Main verb inside a transparent verb-complement predicate."
      }
    },
    output_slots: ["verb_complement_vp", "verb_complement", "degree_manner_complement", "degree_manner_adverbial", "vp", "action_vp", "predicate", "main_verb"],
    note: "Broad verb-complement VP: main verb + postverbal degree/manner complement, e.g. 講大聲啲 or 行快啲. Keeps the degree/manner phrase transparent and prevents speech-reporting overgeneration."
  },
  {
    type: "VerbComplementVP",
    label: "VerbCompVP",
    template: ["action_verb!", "directional_motion_vp!"],
    template_family: "generative_template",
    role_overrides: {
      action_verb: {
        label: "doing",
        syntax: "main_verb",
        note: "Main verb inside a transparent verb-complement predicate."
      }
    },
    output_slots: ["verb_complement_vp", "verb_complement", "vp", "action_vp", "predicate", "main_verb", "directional_motion_vp"],
    note: "Broad verb-complement VP: main verb + directional complement phrase, e.g. 還返去. Keeps the directional complement transparent while exposing one predicate span."
  },
  {
    type: "VerbComplementVP",
    label: "VerbCompVP",
    template: ["action_verb!", "verb_complement!", "object!"],
    template_family: "generative_template",
    constraints: {
      slot_must_not_be_bare_quantity_token: ["object"],
      slot_must_not_have_slots: { object: ["vp", "action_vp", "predicate", "productive_vo"] }
    },
    role_overrides: {
      action_verb: {
        label: "doing",
        syntax: "main_verb",
        note: "Main verb inside a transparent verb-complement predicate."
      },
      verb_complement: {
        label: "doing",
        syntax: "verb_complement",
        slots: ["verb_complement", "predicate"],
        note: "Verbal complement after the main verb, kept transparent instead of wrapping as its own transitive VP."
      }
    },
    output_slots: ["verb_complement_vp", "verb_complement", "vp", "action_vp", "predicate", "main_verb", "object"],
    note: "Broad verb-complement VP: main verb + verbal complement + object. Keeps children transparent while preventing nested transitive VP analysis such as 還 [返啲書]."
  },
  {
    type: "MotionGoalVP",
    label: "MotionGoal",
    template: ["movement_verb!", "goal!"],
    template_family: "generative_template",
    role_overrides: {
      movement_verb: {
        label: "doing",
        syntax: "motion_goal_verb movement_verb",
        slots: ["movement_verb", "action_verb", "main_verb", "predicate"],
        note: "Movement verb heading a goal-directed motion VP."
      },
      goal: {
        label: "where",
        syntax: "motion_goal_location place_or_goal",
        slots: ["goal", "location", "np", "topic", "head_noun"],
        note: "Place/location interpreted as the goal of a movement verb, not as an ordinary object."
      }
    },
    output_slots: ["motion_goal_vp", "movement_verb", "goal", "location", "predicate", "vp", "action_vp"],
    note: "Category-based motion-goal VP: movement verb + place/location goal, e.g. 去中環 / 返屋企. Keeps the place as where/goal rather than ordinary transitive object."
  },
  {
    type: "TransitiveVP",
    label: "VP",
    template: ["consumption_verb!", "approximate_quantity!", "particle?"],
    template_family: "generative_template",
    role_overrides: {
      consumption_verb: {
        label: "doing",
        syntax: "main_verb action_verb consumption_verb",
        slots: ["action_verb", "main_verb", "predicate", "consumption_verb"],
        note: "Action verb governing a transparent approximate measured-quantity object."
      }
    },
    output_slots: ["transitive_vp", "vp", "action_vp", "predicate", "action_verb", "object", "approximate_quantity", "particle"],
    object_semantics: "approximate_measured_quantity_object",
    not_claims: ["not_bare_classifier_head_ellipsis", "not_fabricated_nominal_head", "not_exact_quantity"],
    note: "Broad transitive VP with a transparent approximate measured-quantity object and optional final particle."
  },
  {
    type: "TransitiveVP",
    label: "VP",
    template: ["action_verb!", "object!"],
    constraints: {
      slot_must_not_be_bare_quantity_token: ["object"],
      slot_must_not_have_slots: { object: ["approximate_quantity", "vp", "action_vp", "predicate", "productive_vo"] }
    },
    note: "Category-based transitive VP: action verb + nominal object; bare numeral tokens, approximate measured-quantity objects requiring a licensed predicate, and already typed VPs are not accepted through this generic object path."
  },
  {
    type: "DiMarkedNP",
    label: "NP",
    template: ["di_determiner!", "head_noun!"],
    template_family: "generative_template",
    role_overrides: {
      di_determiner: {
        label: "func",
        syntax: "di_determiner",
        slots: ["quantity", "di_determiner"],
        note: "啲 functions as a determiner/partitive classifier-like marker before a visible head noun."
      }
    },
    output_slots: ["di_marked_np", "np", "object", "topic", "quantity", "head_noun"],
    note: "Productive 啲-marked noun phrase over generated slots: 啲 determiner + head noun, e.g. 啲芒果 / 啲書; avoids claiming English-style plural morphology."
  },
  {
    type: "OvertHeadDemonstrativeClassifierNP",
    label: "NP",
    template: ["demonstrative!", "classifier!", "head_noun!"],
    template_family: "generative_template",
    constraints: {
      slot_must_not_have_slots: {
        demonstrative: ["quantity", "wh_determiner", "di_determiner"],
        classifier: ["quantity", "wh_determiner", "di_determiner"],
        head_noun: ["quantity", "classifier", "wh_determiner", "di_determiner"]
      }
    },
    note: "Bounded overt-head Cantonese demonstrative + classifier + complete nominal head phrase. Requires all three visible components and inserts no hidden numeral or noun."
  },
  {
    type: "QuantifiedTimeNP",
    label: "Time",
    template: ["quantity!", "classifier?", "time_head!", "particle?"],
    role_overrides: {
      quantity: {
        label: "how",
        syntax: "quantity count_value numeral",
        slots: ["quantity"],
        note: "Visible numeral inside a quantified time expression."
      },
      classifier: {
        label: "measure_word",
        syntax: "general_classifier classifier time_measure_classifier",
        slots: ["classifier"],
        note: "Visible measure word inside a quantified time expression."
      },
      time_head: {
        label: "when",
        syntax: "time_head temporal duration_unit",
        slots: ["time", "time_head"],
        note: "Time-unit head inside the quantified time expression."
      }
    },
    output_slots: ["quantified_time_np", "time", "time_head", "quantity", "classifier", "particle", "np", "topic"],
    context_requirement_status: "context_required",
    missing_argument_slots: ["discourse_relation"],
    antecedent_status: "not_observed",
    discourse_license_not_observed: true,
    fragment_subtype: "quantified_time_fragment",
    not_claims: ["not_general_quantity_np", "not_quantified_classifier_object_np", "not_context_free_clause"],
    note: "Productive numeral plus optional classifier plus time-unit phrase, with an optional final particle. As a standalone utterance it is a discourse-linked time or duration fragment."
  },
  {
    type: "QuantifiedTimeNP",
    label: "Time",
    template: ["distributive_quantifier!", "quantity?", "classifier?", "time_head!", "particle?"],
    role_overrides: {
      distributive_quantifier: {
        label: "func",
        syntax: "distributive_quantifier determiner",
        slots: ["distributive_quantifier"],
        note: "Every/each determiner before a time expression."
      },
      quantity: {
        label: "how",
        syntax: "quantity count_value numeral",
        slots: ["quantity"],
        note: "Visible numeral inside the quantified time expression."
      },
      classifier: {
        label: "measure_word",
        syntax: "general_classifier classifier time_measure_classifier",
        slots: ["classifier"],
        note: "Visible measure word inside the quantified time expression."
      },
      time_head: {
        label: "when",
        syntax: "time_head temporal duration_unit",
        slots: ["time", "time_head"],
        note: "Time-unit head inside the quantified time expression."
      }
    },
    output_slots: ["quantified_time_np", "time", "time_head", "quantity", "classifier", "distributive_quantifier", "particle", "np", "topic"],
    not_claims: ["not_general_quantity_np", "not_quantified_classifier_object_np"],
    note: "Productive every/each time-unit phrase. Distributive frequency expressions such as 每一日 are complete time NPs and do not require an external discourse relation."
  },
  {
    type: "ApproximateQuantity",
    label: "Approx",
    template: ["quantity!", "classifier!", "post_classifier_approximation!"],
    template_family: "generative_template",
    role_overrides: {
      quantity: {
        label: "how",
        syntax: "quantity count_value numeral",
        slots: ["quantity"],
        note: "Visible numeral inside an approximate measured-quantity expression."
      },
      classifier: {
        label: "measure_word",
        syntax: "classifier measured_quantity_classifier",
        slots: ["classifier"],
        note: "Visible measure word inside the approximate quantity expression."
      },
      post_classifier_approximation: {
        label: "how",
        syntax: "post_classifier_approximation_marker approximation_marker",
        slots: ["approximation", "modifier"],
        note: "about / approximately; scopes over the preceding numeral and measure word."
      }
    },
    output_slots: ["approximate_quantity", "quantified_object", "quantity", "classifier", "approximation", "object", "np", "topic"],
    approximation_scope: "quantity_classifier_measure",
    approximation_marker_surface: "度",
    object_semantics: "measured_quantity_object",
    head_recovery_status: "not_required_measure_phrase",
    not_claims: ["not_locative_postposition", "not_bare_classifier_head_ellipsis", "not_fabricated_nominal_head", "not_exact_quantity"],
    note: "Productive numeral + measure word + post-classifier approximation marker, e.g. 七杯度. The visible measure phrase functions as an approximate quantity without inventing a noun head."
  },
  {
    type: "QuantifiedClassifierNP",
    label: "NP",
    template_family: "generative_template",
    template: ["quantity!", "classifier!"],
    constraints: {
      slot_first_token_syntax_must_include_any: { quantity: ["numeral"] },
      slot_surface_in: { classifier: AB45_CLASSIFIER_SURFACES }
    },
    role_overrides: {
      quantity: {
        label: "how",
        syntax: "quantity count_value numeral",
        slots: ["quantity"],
        note: "Visible numeral before a classifier in a head-ellipsis noun phrase."
      },
      classifier: {
        label: "measure_word",
        syntax: "general_classifier classifier nominal_head_ellipsis",
        slots: ["classifier"],
        note: "Visible classifier whose noun head must be recovered from discourse rather than fabricated."
      }
    },
    output_slots: ["quantified_classifier_np", "classifier_np", "quantity", "classifier", "np", "topic", "object"],
    context_requirement_status: "context_required",
    missing_argument_slots: ["nominal_head"],
    antecedent_status: "not_observed",
    discourse_license_not_observed: true,
    fragment_subtype: "quantified_classifier_head_ellipsis",
    np_subtype: "quantified_classifier_head_ellipsis",
    not_claims: ["not_bare_numeral", "not_overt_head_noun", "not_fabricated_nominal_head", "not_quantified_time_np"],
    note: "Productive numeral plus classifier NP with an omitted nominal head, e.g. 兩部 / 一個. The broad QuantifiedClassifierNP label is retained while discourse status records the missing head."
  },
  {
    type: "QuantifiedClassifierNP",
    label: "NP",
    template_family: "generative_template",
    template: ["quantity!", "classifier!", "head_noun!"],
    constraints: {
      slot_first_token_syntax_must_include_any: { quantity: ["numeral"] },
      slot_surface_in: { classifier: AB45_CLASSIFIER_SURFACES }
    },
    role_overrides: {
      quantity: {
        label: "how",
        syntax: "quantity count_value numeral",
        slots: ["quantity"],
        note: "Numeral/quantity before a classifier; learner-facing role is how/quantity, not stative-like."
      },
      classifier: {
        label: "measure_word",
        syntax: "general_classifier classifier",
        slots: ["classifier"],
        note: "Visible classifier/measure word inside a quantified-classifier NP."
      },
      head_noun: {
        slots: ["head_noun", "np", "object", "topic", "subject"],
        note: "Head noun inside a quantified-classifier NP."
      }
    },
    output_slots: ["quantified_classifier_np", "classifier_np", "quantity", "classifier", "head_noun", "np", "object", "topic", "subject"],
    note: "Category-based quantity + classifier + head noun phrase. Numerals remain quantity material, not stative predicates."
  },

  {
    type: "QuantifiedPersonNP",
    label: "NP",
    template: ["quantity!", "head_noun!"],
    constraints: {
      slot_surface_in: { head_noun: ["人", "同事", "學生"] }
    },
    role_overrides: {
      quantity: {
        label: "how",
        syntax: "quantity_degree quantity",
        slots: ["quantity"],
        note: "好多 functions as the quantity component inside a transparent person NP."
      },
      head_noun: {
        label: "who",
        syntax: "person_head_noun head_noun",
        slots: ["head_noun", "np", "subject", "topic"],
        note: "人 is the person head noun inside the quantified subject NP."
      }
    },
    output_slots: ["np", "subject", "topic", "object", "head_noun", "quantity"],
    note: "Category-based quantified person noun phrase: quantity + person head noun, e.g. 好多 + 人."
  },
  {
    type: "OrdinalClassifierNP",
    label: "OrdCL",
    template: ["ordinal_modifier!", "classifier!"],
    constraints: {
      surface_sequence_in: ["第二隻"]
    },
    role_overrides: {
      ordinal_modifier: {
        label: "func",
        syntax: "ordinal_modifier sequence_modifier",
        slots: ["ordinal_modifier"],
        note: "Overt ordinal modifier 第二 in the source-attested headless 第二隻 profile."
      }
    },
    np_subtype: "headless_ordinal_classifier_np",
    output_slots: ["ordinal_classifier_np", "classifier_np", "np", "object", "topic", "ordinal_modifier", "classifier"],
    role_resolution_note: "Source-attested 第二隻 means the second one; the omitted referent remains context-supplied and no noun head is inserted.",
    not_learner_role: "how",
    not_question_role: "how_many",
    not_claims: ["not_headed_np", "not_inserted_nominal_head", "not_general_headless_classifier_productivity"],
    note: "Bounded headless ordinal + classifier NP for published 第二隻 'the second one'; preserves the overt classifier and inserts no hidden noun."
  },
  {
    type: "OrdinalClassifierNP",
    label: "OrdCL",
    template: ["ordinal_modifier!", "classifier!", "head_noun!"],
    role_overrides: {
      ordinal_modifier: {
        label: "func",
        syntax: "ordinal_modifier sequence_modifier",
        slots: ["ordinal_modifier"],
        note: "Ordinal/sequence modifier such as 第二; not a how/how-many question role."
      }
    },
    np_subtype: "ordinal_classifier_np",
    output_slots: ["ordinal_classifier_np", "classifier_np", "modified_np", "np", "object", "topic", "head_noun", "ordinal_modifier", "classifier"],
    role_resolution_note: "第二個-style phrases are ordinal/classifier noun phrases; 第二 does not create a how/how-many learner role.",
    not_learner_role: "how",
    not_question_role: "how_many",
    note: "Category-based ordinal modifier + classifier + head noun phrase, e.g. 第二個故仔. This is an ordinal NP, not a how/how-many question."
  },
  {
    type: "ModifiedNP",
    label: "NP",
    template: ["direct_nominal_wh_determiner!", "head_noun!"],
    template_family: "generative_template",
    constraints: {
      slot_must_not_have_slots: { head_noun: ["wh_determiner", "wh_nominal"] }
    },
    role_overrides: {
      direct_nominal_wh_determiner: {
        label: "what",
        syntax: "wh_determiner direct_nominal_wh_determiner",
        slots: ["direct_nominal_wh_determiner", "wh_determiner"],
        note: "咩 directly modifies the following noun as a what/what-kind-of determiner; it is not the noun head or a sentence-final polar particle here."
      }
    },
    output_slots: ["modified_np", "np", "object", "topic", "head_noun", "modifier", "wh_determiner", "direct_nominal_wh_determiner", "wh_object"],
    np_subtype: "direct_wh_determiner_np",
    role_resolution_note: "The determiner remains learner-visible as what, while the following noun supplies the nominal head and its own who/what/where role.",
    not_claims: ["not_sentence_final_polar_particle", "not_bare_wh_object", "not_classifier_ellipsis", "not_hidden_classifier"],
    note: "Productive direct wh-determiner noun phrase: a lexically licensed direct nominal wh determiner plus a visible noun head, e.g. 咩書 / 咩人 / 咩嘢."
  },
  {
    type: "WhClassifierQuestion",
    label: "WhCL",
    template: ["wh_determiner!", "classifier!", "particle?"],
    note: "Category-based wh-determiner + classifier question fragment."
  },
  {
    type: "QuantityNP",
    label: "QuantityNP",
    template: ["quantity!", "head_noun!"],
    role_overrides: {
      quantity: {
        label: "how",
        syntax: "quantity_degree quantity",
        slots: ["quantity"],
        note: "Quantity expression modifying a visible noun head."
      }
    },
    output_slots: ["quantity_np", "quantity", "head_noun", "np", "object", "topic", "subject"],
    note: "Transparent quantity noun phrase such as 好多嘢: quantity + head noun."
  },
  {
    type: "TimeNP",
    label: "Time",
    template: ["temporal_modifier!", "classifier?", "time_head!"],
    role_overrides: {
      temporal_modifier: {
        label: "when",
        syntax: "temporal_modifier",
        jyutping_by_surface: { "上": "soeng6", "下": "haa6" },
        slots: ["modifier", "time", "temporal_modifier"],
        note: "Temporal modifier inside a transparent time expression. 上 uses the temporal reading soeng6 here while keeping soeng5 for upward motion contexts."
      },
      classifier: {
        label: "measure_word",
        syntax: "general_classifier",
        slots: ["classifier"],
        note: "Classifier inside a transparent time expression."
      },
      time_head: {
        label: "when",
        syntax: "time_head temporal",
        slots: ["time", "time_head"],
        note: "Time head inside a transparent time expression."
      }
    },
    note: "Category-based transparent time noun phrase; exposes modifier/classifier/head roles instead of hiding them inside an atomic time token."
  },
  {
    type: "AssociativeNP",
    label: "NP",
    template: ["nominal_modifier!", "nominal_linker!", "head_noun!"],
    role_overrides: {
      nominal_linker: {
        label: "particle",
        syntax: "nominal_linker associative_linker",
        slots: ["nominal_linker"],
        note: "Nominal linker inside a transparent associative noun phrase."
      }
    },
    output_slots: ["associative_np", "modified_np", "np", "object", "topic", "head_noun", "modifier", "nominal_modifier", "nominal_linker"],
    note: "Category-based associative noun phrase: nominal modifier/content NP + 嘅 + head noun, e.g. 音樂嘅嘢. Uses nominal_modifier so noun modifiers are not blocked by stative/degree modifier checks."
  },
  {
    type: "ModifierNP",
    label: "NP",
    template: ["modifier!", "head_noun!"],
    note: "Category-based modifier + head noun phrase."
  },
  {
    type: "NominalHeadSpan",
    label: "NP",
    template: ["head_noun!"],
    note: "Internal neutral nominal-head span. It preserves overt nominal material without independently licensing definiteness, ellipsis, argument role, or standalone utterance status."
  },
  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative!", "classifier!", "verb_modifier!", "nominal_linker!", "modifier!", "head_noun!"],
    template_family: "generative_template",
    output_slots: ["modified_np", "np", "object", "topic", "demonstrative", "classifier", "verb_modifier", "modifier", "nominal_linker", "head_noun"],
    note: "Transparent demonstrative + classifier + verbal modifier + linker + nominal modifier + head noun. Preserves every overt component and remains outside AB15."
  },
  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative!", "classifier!", "modifier!", "nominal_linker!", "modifier!", "head_noun!"],
    template_family: "generative_template",
    output_slots: ["modified_np", "np", "object", "topic", "demonstrative", "classifier", "modifier", "nominal_linker", "head_noun"],
    note: "Transparent demonstrative + classifier + modifier + linker + nominal modifier + head noun. Preserves every overt component and remains outside AB15."
  },
  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative!", "classifier!", "verb_modifier!", "nominal_linker!", "head_noun!"],
    template_family: "generative_template",
    output_slots: ["modified_np", "np", "object", "topic", "demonstrative", "classifier", "verb_modifier", "nominal_linker", "head_noun"],
    note: "Transparent demonstrative + classifier + verbal modifier + linker + head noun. Preserves every overt component and remains outside AB15."
  },
  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative!", "classifier!", "modifier!", "nominal_linker!", "head_noun!"],
    template_family: "generative_template",
    output_slots: ["modified_np", "np", "object", "topic", "demonstrative", "classifier", "modifier", "nominal_linker", "head_noun"],
    note: "Transparent demonstrative + classifier + modifier + linker + head noun. Preserves every overt component and remains outside AB15."
  },
  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative?", "classifier?", "modifier?", "verb_modifier?", "nominal_linker?", "modifier?", "head_noun!"],
    role_overrides: {
      nominal_linker: {
        label: "particle",
        syntax: "nominal_linker associative_linker",
        slots: ["nominal_linker"],
        note: "Nominal linker inside a transparent modified/associative noun phrase."
      }
    },
    note: "Category-based modified noun phrase; no memorized full surface string."
  }
];
