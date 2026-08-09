"use strict";

module.exports = function createANotAQuestionDetectors(dependencies = {}) {
  const {
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
  } = dependencies;

  function aNotAQuestionFallback(core) {
    const preferenceANotA = preferenceANotAQuestionFallback(core);
    if (preferenceANotA) return preferenceANotA;

    const offset = optionalSubjectOffset(core);
    if (core.length - offset < 3) return null;
    const first = core[offset];
    const negator = core[offset + 1];
    const second = core[offset + 2];
    const firstTok = firstToken(first);
    const secondTok = firstToken(second);
    if (!firstTok || !secondTok) return null;
    if (!isVerbLike(first) || !isToken(negator, "唔")) return null;
    if (firstTok.surface !== secondTok.surface) return null;
    return construction("ANotAQuestion", "A-not-A", core, {
      note: "A-not-A polar question construction with optional subject and following object/goal.",
      trace: traceInfo("generative_or_heuristic_slot_rule", {
        rule: "subject? + verb + 唔 + copied verb + complement?",
        reason: "Structural A-not-A heuristic runs before VP subspan wrapping so the copied verb remains visible."
      })
    });
  }

  function splitFinalQuestionMaterial(core, options = {}) {
    let questionCore = core;
    const punctuation = [];
    while (questionCore.length && isQuestionPunctuationText(questionCore[questionCore.length - 1])) {
      punctuation.unshift(questionCore[questionCore.length - 1]);
      questionCore = questionCore.slice(0, -1);
    }
    let particleStart = questionCore.length;
    while (
      particleStart > 0 &&
      isParticle(questionCore[particleStart - 1]) &&
      !(options.keepGeParticle && isToken(questionCore[particleStart - 1], "嘅"))
    ) {
      particleStart -= 1;
    }
    return {
      bareCore: questionCore.slice(0, particleStart),
      particles: questionCore.slice(particleStart),
      punctuation,
    };
  }

  function alternativeScalarQuestionTail(nodes) {
    const compact = withoutIgnorableSpaceText(nodes || []);
    if (compact.length < 4) return null;
    const connectorIndex = compact.findIndex((node) => isToken(node, "定係"));
    if (connectorIndex <= 0 || connectorIndex >= compact.length - 2) return null;
    if (surfaceOf(compact[compact.length - 1]) !== "多啲") return null;
    const left = compact.slice(0, connectorIndex);
    const right = compact.slice(connectorIndex + 1, -1);
    if (!left.length || !right.length) return null;
    if ([...left, ...right].some((node) => isParticle(node) || isQuestionPunctuationText(node))) return null;
    return {
      children: compact,
      assignedSlots: compact.map((node, index) => {
        if (index === connectorIndex) return "question_fragment";
        if (index === compact.length - 1) return "degree";
        return "predicate";
      }),
    };
  }

  function preferenceANotAQuestionFallback(core) {
    const { bareCore, particles } = splitFinalQuestionMaterial(core);
    const compact = withoutIgnorableSpaceText(bareCore);
    const offset = compact.length >= 5 && nodeCanFillSlot(compact[0], "subject") ? 1 : 0;
    if (compact.length - offset < 4) return null;
    const firstSyllable = compact[offset];
    const negator = compact[offset + 1];
    const preferencePredicate = compact[offset + 2];
    if (!isToken(firstSyllable, "鍾") || !isToken(negator, "唔") || !isToken(preferencePredicate, "鍾意")) return null;

    const complementCore = compact.slice(offset + 3);
    if (!complementCore.length) return null;
    const wrappedComplement = applyConstructionPatterns(complementCore);
    if (wrappedComplement.length === 1) {
      const complement = wrappedComplement[0];
      const complementSlot = nodeCanFillSlot(complement, "vp")
        ? "vp"
        : (nodeCanFillSlot(complement, "np") || nodeCanFillSlot(complement, "object") ? "object" : "");
      if (!complementSlot) return null;

      const children = [...compact.slice(0, offset), firstSyllable, negator, preferencePredicate, complement, ...particles];
      const assignedSlots = [
        ...compact.slice(0, offset).map(() => "subject"),
        "a_not_a_first_syllable",
        "negator",
        "preference_predicate",
        complementSlot,
        ...particles.map(() => "particle"),
      ];
      return construction("ANotAQuestion", "A-not-A", children, {
        note: "Bounded first-syllable preference A-not-A question: optional subject + 鍾唔鍾意 + overt typed NP/VP complement.",
        slots: cleanSlots(["question_fragment", "predicate", "negator", complementSlot, ...templateDerivedSlots("ANotAQuestion", children)]),
        trace: traceInfo("generative_template", {
          construction_type: "ANotAQuestion",
          template_family: "first_syllable_preference_a_not_a",
          template: ["subject?", "a_not_a_first_syllable!", "negator!", "preference_predicate!", `${complementSlot}!`, "particle?"],
          assigned_slots: assignedSlots,
          surfaces: children.map((node) => flattenSurface(node)),
          copied_surface_profile: "first_syllable_plus_full_preference_predicate",
          reason: "Preserves reviewed 鍾唔鍾意 + overt typed complement questions without reclassifying them as AB33 PreferenceVP.",
        }),
      });
    }

    const alternative = alternativeScalarQuestionTail(complementCore);
    if (!alternative) return null;
    const children = [
      ...compact.slice(0, offset),
      firstSyllable,
      negator,
      preferencePredicate,
      ...alternative.children,
      ...particles,
    ];
    const assignedSlots = [
      ...compact.slice(0, offset).map(() => "subject"),
      "a_not_a_first_syllable",
      "negator",
      "preference_predicate",
      ...alternative.assignedSlots,
      ...particles.map(() => "particle"),
    ];
    return construction("ANotAQuestion", "A-not-A", children, {
      note: "Bounded first-syllable preference A-not-A question with separately preserved alternative/scalar material.",
      slots: cleanSlots(["question_fragment", "predicate", "negator", "degree", ...templateDerivedSlots("ANotAQuestion", children)]),
      trace: traceInfo("construction_function", {
        construction_type: "ANotAQuestion",
        rule: "subject? + 鍾 + 唔 + 鍾意 + alternative material + 定係 + alternative material + 多啲 + particle?",
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Preserves the reviewed outer first-syllable A-not-A question while leaving alternative/scalar material transparent and outside AB33 PreferenceVP.",
      }),
    });
  }

  function desiderativeANotAQuestionFallback(core) {
    const { core: bareCore, particles } = withoutTrailingParticles(core);
    const offset = optionalSubjectOffset(bareCore);
    if (bareCore.length - offset < 4) return null;

    const firstModal = bareCore[offset];
    const negator = bareCore[offset + 1];
    const secondModal = bareCore[offset + 2];
    const firstTok = firstToken(firstModal);
    const secondTok = firstToken(secondModal);

    if (!firstTok || !secondTok) return null;
    if (!nodeCanFillSlot(firstModal, "desiderative_modal")) return null;
    if (!nodeCanFillSlot(secondModal, "desiderative_modal")) return null;
    if (firstTok.surface !== "想" || secondTok.surface !== "想") return null;
    if (!isToken(negator, "唔")) return null;

    const complementCore = bareCore.slice(offset + 3);
    if (!complementCore.length) return null;
    const wrappedComplement = wrapCategorySubspans(complementCore);
    if (wrappedComplement.length !== 1 || !nodeCanFillSlot(wrappedComplement[0], "vp")) return null;

    const promotedFirst = phase4DesiderativeActiveTokenClone(firstModal, {
      syntax: `${firstTok.syntax || "modal_desiderative"} desiderative_a_not_a_question`,
      slots: ["desiderative_a_not_a_question"],
      reason: "Phase 4 controlled grammar promotion: first 想 is parser-active only as the positive arm of an approved 想唔想 + VP question.",
    });
    const promotedSecond = phase4DesiderativeActiveTokenClone(secondModal, {
      syntax: `${secondTok.syntax || "modal_desiderative"} desiderative_a_not_a_question`,
      slots: ["desiderative_a_not_a_question"],
      reason: "Phase 4 controlled grammar promotion: second 想 is parser-active only as the copied negative arm of an approved 想唔想 + VP question.",
    });

    const children = [
      ...bareCore.slice(0, offset),
      promotedFirst,
      negator,
      promotedSecond,
      ...wrappedComplement,
      ...particles,
    ];

    const assignedSlots = [
      ...bareCore.slice(0, offset).map(() => "subject"),
      "modal_positive_arm",
      "negator",
      "modal_negative_arm",
      "vp",
      ...particles.map(() => "particle"),
    ];
    const traceDetail = {
      construction_type: "ModalANotAQuestion",
      retired_label_alias: "DesiderativeANotAQuestion",
      modal_subtype: "desiderative",
      template_family: "generative_template",
      template: ["subject?", "modal_positive_arm!", "negator!", "modal_negative_arm!", "vp!", "particle?"],
      assigned_slots: assignedSlots,
      rule: "subject? + 想 + 唔 + 想 + vp + particle?",
      reason: "Promote reviewed desiderative A-not-A questions under the broad ModalANotAQuestion category while preserving desiderative subtype metadata and the visible VP complement requirement.",
      surfaces: children.map((node) => flattenSurface(node)),
    };
    const wrapperCoverage = assignedSlotWrapperCoverage("ModalANotAQuestion", children, assignedSlots);
    if (wrapperCoverage) traceDetail.wrapper_coverage = wrapperCoverage;
    return construction("ModalANotAQuestion", "ModalQ", children, {
      note: "Broad modal A-not-A question with desiderative subtype: optional subject + 想唔想 + reviewed VP.",
      slots: templateDerivedSlots("ModalANotAQuestion", children),
      trace: traceInfo("generative_template", traceDetail)
    });
  }

  function permissionANotAQuestionFallback(core) {
    const { core: bareCore, particles } = withoutTrailingParticles(core);
    const offset = optionalSubjectOffset(bareCore);
    if (bareCore.length - offset < 2) return null;

    const modal = bareCore[offset];
    const modalToken = firstToken(modal);
    if (!modalToken || modalToken.surface !== "可唔可以") return null;
    if (!nodeCanFillSlot(modal, "modal")) return null;

    const complementCore = bareCore.slice(offset + 1);
    if (!complementCore.length) return null;
    let wrappedComplement = wrapCategorySubspans(complementCore);
    if (wrappedComplement.length !== 1
        && complementCore.length === 2
        && nodeCanFillSlot(complementCore[0], "action_verb")
        && (nodeCanFillSlot(complementCore[1], "recipient") || nodeCanFillSlot(complementCore[1], "subject"))) {
      const personObject = parserInactiveTokenClone(complementCore[1], {
        label: complementCore[1].label || "who",
        pos: "np",
        syntax: `${complementCore[1].syntax || "person_np"} person_object recipient`,
        slots: ["object", "recipient", "np"],
        reason: "The person after the action verb is its visible person-object/recipient inside the permission question VP.",
      });
      const vpChildren = [complementCore[0], personObject];
      wrappedComplement = [construction("TransitiveVP", "VP", vpChildren, {
        note: "Transitive VP with a person object, preserved inside a permission A-not-A question.",
        slots: templateDerivedSlots("TransitiveVP", vpChildren),
        trace: traceInfo("generative_template", {
          construction_type: "TransitiveVP",
          template_family: "generative_template",
          template: ["action_verb!", "person_object!"],
          assigned_slots: ["action_verb", "person_object"],
          surfaces: vpChildren.map((node) => flattenSurface(node)),
          reason: "Cantonese transitive verbs such as 幫 can take a person pronoun as their object; the person keeps the learner role who.",
        }),
      })];
    }
    if (wrappedComplement.length !== 1 || !nodeCanFillSlot(wrappedComplement[0], "vp")) return null;

    const promotedModal = phase4PermissionActiveTokenClone(modal, {
      syntax: `${modalToken.syntax || "modal_permission_or_ability"} modal_a_not_a_question permission_a_not_a_question`,
      slots: ["modal_a_not_a_question", "permission_a_not_a_question", "permission_a_not_a_modal"],
      reason: "Phase 4 controlled grammar promotion: 可唔可以 is parser-active only as an approved permission A-not-A modal with a visible VP complement.",
    });

    const children = [
      ...bareCore.slice(0, offset),
      promotedModal,
      ...wrappedComplement,
      ...particles,
    ];

    const assignedSlots = [
      ...bareCore.slice(0, offset).map(() => "subject"),
      "modal_a_not_a",
      "vp",
      ...particles.map(() => "particle"),
    ];
    const traceDetail = {
      construction_type: "ModalANotAQuestion",
      retired_label_alias: "PermissionANotAQuestion",
      modal_subtype: "permission",
      template_family: "generative_template",
      template: ["subject?", "modal_a_not_a!", "vp!", "particle?"],
      assigned_slots: assignedSlots,
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "Promotes reviewed permission A-not-A questions under the broad ModalANotAQuestion category while keeping the 可唔可以 modal token parser-active only in this approved scope.",
    };
    const wrapperCoverage = assignedSlotWrapperCoverage("ModalANotAQuestion", children, assignedSlots);
    if (wrapperCoverage) traceDetail.wrapper_coverage = wrapperCoverage;
    return construction("ModalANotAQuestion", "ModalQ", children, {
      note: "Broad modal A-not-A question with permission subtype: optional subject + 可唔可以 + reviewed VP.",
      slots: templateDerivedSlots("ModalANotAQuestion", children),
      trace: traceInfo("generative_template", traceDetail)
    });
  }

  function copularANotAComplementCandidate(complementCore) {
    const possessive = possessiveFragmentAnswerCandidate(complementCore);
    if (possessive) return { node: possessive, profile: "possessive_fragment" };

    const quantifiedPreferenceClause = copularANotAQuantifiedPreferenceClauseCandidate(complementCore);
    if (quantifiedPreferenceClause) return { node: quantifiedPreferenceClause, profile: "clausal_or_predicate" };

    const wrapped = applyConstructionPatterns(complementCore);
    if (wrapped.length === 1 && wrapped[0] && wrapped[0].kind === "construction") {
      const candidate = wrapped[0];
      const nominalTypes = new Set([
        "NominalHeadSpan", "OvertHeadDemonstrativeClassifierNP", "HeadlessDemonstrativeClassifierNP",
        "QuantifiedClassifierNP", "QuantifiedPersonNP", "DiMarkedNP", "OrdinalClassifierNP",
        "ClassifierObjectNP", "CoordinatedNP", "FragmentAnswer",
      ]);
      const blockedPredicateTypes = new Set([
        "ModifierNP", "ModifiedNP", "NominalHeadSpan", "OvertHeadDemonstrativeClassifierNP",
        "HeadlessDemonstrativeClassifierNP", "QuantifiedClassifierNP", "QuantifiedPersonNP",
        "DiMarkedNP", "OrdinalClassifierNP", "ClassifierObjectNP", "CoordinatedNP",
        "FragmentAnswer", "NeedsContext",
      ]);
      const predicateLike = !blockedPredicateTypes.has(candidate.type)
        && (nodeCanFillSlot(candidate, "predicate") || directPredicateCapableNode(candidate));
      if (predicateLike) return { node: candidate, profile: "clausal_or_predicate" };
      if (nominalTypes.has(candidate.type)) return { node: candidate, profile: "nominal" };
    }

    if (complementCore.length === 1
        && (nodeCanFillSlot(complementCore[0], "np") || nodeCanFillSlot(complementCore[0], "subject"))) {
      return { node: complementCore[0], profile: "nominal" };
    }
    return null;
  }

  function typedPreferencePredicateParts(nodes) {
    const compact = withoutIgnorableSpaceText(nodes || []);
    if (compact.length === 1 && compact[0] && compact[0].kind === "construction" && compact[0].type === "ModifierNP") {
      const modifierChildren = withoutIgnorableSpaceText(compact[0].children || []);
      if (modifierChildren.length !== 2 || !isToken(modifierChildren[0], "鍾意")) return null;
      const complement = modifierChildren[1];
      const complementSlot = nodeCanFillSlot(complement, "vp")
        ? "vp"
        : (nodeCanFillSlot(complement, "np") || nodeCanFillSlot(complement, "object") ? "object" : "");
      if (!complementSlot) return null;
      return {
        children: [modifierChildren[0], complement],
        assignedSlots: ["preference_predicate", complementSlot],
        profile: `typed_${complementSlot}`,
      };
    }

    if (compact.length === 2 && isToken(compact[0], "鍾意")) {
      const complementSlot = nodeCanFillSlot(compact[1], "vp")
        ? "vp"
        : (nodeCanFillSlot(compact[1], "np") || nodeCanFillSlot(compact[1], "object") ? "object" : "");
      if (complementSlot) {
        return {
          children: compact,
          assignedSlots: ["preference_predicate", complementSlot],
          profile: `typed_${complementSlot}`,
        };
      }
    }

    if (compact.length === 3
        && isToken(compact[0], "鍾意")
        && isToken(compact[1], "咗")
        && (nodeCanFillSlot(compact[2], "np") || nodeCanFillSlot(compact[2], "object"))) {
      return {
        children: compact,
        assignedSlots: ["preference_predicate", "perfective_aspect", "object"],
        profile: "perfective_np_object",
      };
    }

    if (compact.length >= 5 && isToken(compact[0], "鍾意")) {
      const alternative = alternativeScalarQuestionTail(compact.slice(1));
      if (alternative) {
        return {
          children: [compact[0], ...alternative.children],
          assignedSlots: ["preference_predicate", ...alternative.assignedSlots],
          profile: "alternative_scalar",
        };
      }
    }
    return null;
  }

  function copularANotAQuantifiedPreferenceClauseCandidate(complementCore) {
    const compact = withoutIgnorableSpaceText(applyConstructionPatterns(complementCore));
    if (compact.length < 4) return null;
    const [quantifier, subject, focus, ...predicateNodes] = compact;
    if (!isToken(quantifier, "每")) return null;
    if (!nodeCanFillSlot(subject, "subject")) return null;
    if (!isToken(focus, "都") || !nodeCanFillSlot(focus, "focus_adverb")) return null;

    const predicateParts = typedPreferencePredicateParts(predicateNodes);
    if (!predicateParts) return null;
    const children = [quantifier, subject, focus, ...predicateParts.children];
    const assignedSlots = ["distributive_quantifier", "subject", "focus_adverb", ...predicateParts.assignedSlots];
    return construction("SubjectPredicateClause", "SubjPred", children, {
      note: "Bounded copular A-not-A complement: 每 + overt subject + 都 + visible preference predicate material.",
      slots: cleanSlots([
        "subject_predicate_clause",
        "clause",
        "subject",
        "focus_adverb",
        "predicate",
        "preference_predicate",
        ...templateDerivedSlots("SubjectPredicateClause", children),
      ]),
      trace: traceInfo("generative_template", {
        construction_type: "SubjectPredicateClause",
        template_family: "copular_a_not_a_bounded_complement",
        template: assignedSlots.map((slot) => `${slot}!`),
        rule: ({
          typed_vp: "每 + subject + 都 + 鍾意 + typed VP",
          typed_object: "每 + subject + 都 + 鍾意 + typed NP",
          perfective_np_object: "每 + subject + 都 + 鍾意 + 咗 + typed NP",
          alternative_scalar: "每 + subject + 都 + 鍾意 + alternative material + 定係 + alternative material + 多啲",
        })[predicateParts.profile] || `每 + subject + 都 + 鍾意 + reviewed profile ${predicateParts.profile}`,
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Reconstructs the reviewed bounded copular-question complement from visible preference material without certifying an accidental ModifierNP or restoring broad AB33 PreferenceVP matching.",
      }),
    });
  }

  function isQuestionPunctuationText(node) {
    if (!node || node.kind !== "text") return false;
    return /^[?？]+$/.test(surfaceOf(node) || node.text || "");
  }

  function copularANotAQuestionFallback(core) {
    // 嘅 may close a possessive complement (你嘅), so do not strip it as a
    // sentence-final particle before complement analysis. Other final particles
    // remain outside the complement and visible at the question level.
    const { bareCore, particles, punctuation } = splitFinalQuestionMaterial(core, { keepGeParticle: true });
    const offset = bareCore.length >= 4 && nodeCanFillSlot(bareCore[0], "subject") && !isToken(bareCore[0], "係") ? 1 : 0;
    if (bareCore.length - offset < 3) return null;
    if (!isToken(bareCore[offset], "係")) return null;

    const fusedNegativeArm = isToken(bareCore[offset + 1], "唔係");
    const splitNegativeArm = isToken(bareCore[offset + 1], "唔") && isToken(bareCore[offset + 2], "係");
    if (!fusedNegativeArm && !splitNegativeArm) return null;
    const complementStart = offset + (fusedNegativeArm ? 2 : 3);
    const complementCore = bareCore.slice(complementStart);
    if (!complementCore.length) return null;

    const complementCandidate = copularANotAComplementCandidate(complementCore);
    if (!complementCandidate) return null;
    const complement = complementCandidate.node;
    const complementSlot = complementCandidate.profile === "clausal_or_predicate"
      ? "copular_predicate_complement"
      : "copular_nominal_complement";

    const positiveCopula = parserInactiveTokenClone(bareCore[offset], {
      label: "func", pos: "function", syntax: "copula copular_a_not_a_positive",
      slots: ["copula", "copular_positive_arm"], reason: "係 is the positive arm of a copular A-not-A question.",
    });
    const negator = fusedNegativeArm
      ? token("唔", {
          label: "func", pos: "function", syntax: "negator copular_a_not_a_negator",
          slots: ["negator", "m4_negator"], jyutping: "m4",
          note: "Visible negator split transparently from the lexical token 唔係 inside the copular A-not-A pattern.",
        })
      : parserInactiveTokenClone(bareCore[offset + 1], {
          label: "func", pos: "function", syntax: "negator copular_a_not_a_negator",
          slots: ["negator", "m4_negator"], reason: "唔 separates the positive and negative copular arms.",
        });
    const negativeCopula = fusedNegativeArm
      ? token("係", {
          label: "func", pos: "function", syntax: "copula copular_a_not_a_negative",
          slots: ["copula", "copular_negative_arm"], jyutping: "hai6",
          note: "Visible negative copular arm split transparently from the lexical token 唔係.",
        })
      : parserInactiveTokenClone(bareCore[offset + 2], {
          label: "func", pos: "function", syntax: "copula copular_a_not_a_negative",
          slots: ["copula", "copular_negative_arm"], reason: "係 is the copied negative arm of the copular A-not-A question.",
        });

    const children = [...bareCore.slice(0, offset), positiveCopula, negator, negativeCopula, complement, ...particles, ...punctuation];
    const assignedSlots = [
      ...bareCore.slice(0, offset).map(() => "subject"),
      "copula_positive_arm", "negator", "copula_negative_arm", complementSlot,
      ...particles.map(() => "particle"),
      ...punctuation.map(() => "question_punctuation"),
    ];
    return construction("CopularANotAQuestion", "CopularQ", children, {
      note: complementCandidate.profile === "clausal_or_predicate"
        ? "Copular A-not-A question: optional subject/topic + 係唔係 + overt predicate or clause complement."
        : "Copular A-not-A question: optional subject + 係唔係 + bounded nominal or possessive complement.",
      slots: cleanSlots(["copular_a_not_a_question", "question_fragment", "copula", "negator", "copular_complement", complementSlot, "predicate", "clause", offset ? "subject" : "", ...templateDerivedSlots("CopularANotAQuestion", children)]),
      trace: traceInfo("generative_template", {
        construction_type: "CopularANotAQuestion", template_family: "generative_template",
        template: ["subject_or_topic?", "copula_positive_arm!", "negator!", "copula_negative_arm!", `${complementSlot}!`, "particle?"],
        assigned_slots: assignedSlots, surfaces: children.map((node) => flattenSurface(node)),
        tokenization_path: fusedNegativeArm ? "positive_copula_plus_fused_negative_copula" : "three_token_copular_a_not_a",
        complement_profile: complementCandidate.profile,
        tag_profile: "terminal_hai6_m4_hai6_excluded",
        contracted_marker_profile: "hai6_mai6_remains_separate_polar_question_path",
        reason: "Preserve both copular arms and classify the overt following material as a typed predicate/clause or a bounded nominal/possessive complement; terminal 係唔係 tags are outside this node.",
      }),
    });
  }

  function polarQuestionFrameFallback(core) {
    const { core: bareCore, particles } = withoutTrailingParticles(core);
    const compact = withoutIgnorableSpaceText(bareCore);
    if (compact.length !== 3) return null;
    const [subject, marker, predicate] = compact;
    if (!nodeCanFillSlot(subject, "subject")) return null;
    if (!isToken(marker, "係咪")) return null;
    if (!directPredicateCapableNode(predicate)) return null;
    const children = [subject, yesNoQuestionMarkerClone(marker), predicate, ...particles];
    return construction("PolarQuestionFrame", "YesNo?", children, {
      note: "v0.5.32 bounded 係咪 polar question: subject + 係咪 + predicate + optional particle.",
      slots: templateDerivedSlots("PolarQuestionFrame", children),
      trace: traceInfo("generative_template", {
        construction_type: "PolarQuestionFrame",
        template: ["subject!", "yes_no_question_marker!", "predicate!", "particle?"],
        assigned_slots: ["subject", "yes_no_question_marker", "predicate", ...particles.map(() => "particle")],
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Promotes only the reviewed 係咪 + predicate yes/no question shape.",
      }),
    });
  }

  function acceptabilityANotAQuestionFallback(core) {
    // Narrow fallback for an utterance-final acceptability predicate. The three
    // forms must be adjacent, and only the independently attested postposed 先
    // may follow them.
    const acceptabilityANotAIndex = core.findIndex((node, index) =>
      surfaceOf(node) === "得" &&
      surfaceOf(core[index + 1]) === "唔" &&
      surfaceOf(core[index + 2]) === "得"
    );
    if (acceptabilityANotAIndex < 0) return null;
    const tail = core.slice(acceptabilityANotAIndex + 3).map(surfaceOf);
    if (tail.length !== 0 && !(tail.length === 1 && tail[0] === "先")) return null;
    return construction("AcceptabilityANotA", "得唔得", core, {
      note: "Terminal A-not-A acceptability predicate: 得唔得, optionally followed by 先.",
      trace: traceInfo("legacy_surface_rule", {
        rule: "terminal adjacent 得唔得 (先)",
        reason: "Narrow fallback for an overt terminal acceptability A-not-A sequence."
      })
    });
  }

  function inlineANotAQuestionFallback(core) {
    // Late A-not-A fallback: V 唔 V Obj, or V 唔 ProductiveVO with same V.
    if (core.length < 3 || !isVerbLike(core[0]) || !isToken(core[1], "唔")) return null;
    const first = firstToken(core[0]);
    const third = firstToken(core[2]);
    if (!first || !third || first.surface !== third.surface) return null;
    return construction("ANotAQuestion", "A-not-A", core, {
      note: "A-not-A polar question construction.",
      trace: traceInfo("generative_or_heuristic_slot_rule", {
        rule: "verb + 唔 + copied verb",
        reason: "Structural A-not-A heuristic."
      })
    });
  }

  return {
    aNotAQuestionFallback,
    acceptabilityANotAQuestionFallback,
    copularANotAQuestionFallback,
    desiderativeANotAQuestionFallback,
    inlineANotAQuestionFallback,
    permissionANotAQuestionFallback,
    polarQuestionFrameFallback,
  };
};
