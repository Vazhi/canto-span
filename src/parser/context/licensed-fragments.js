"use strict";

module.exports = function createLicensedContextFragments(dependencies = {}) {
  const {
    PREDICATE_OMISSION_PROFILES,
    applyRoleOverrides,
    cleanSlots,
    construction,
    contextSupportsQuantifiedClassifierFragment,
    contextSupportsQuantifiedTimeFragment,
    conventionalZiContextDomain,
    conventionalZiDurationDescriptor,
    eventDomainDescriptorForContextTurn,
    existentialDomainDescriptorForContextTurn,
    existentialQuestionDescriptorForContextTurn,
    firstToken,
    flattenNodes,
    flattenSurface,
    hasSentencePunctuation,
    isToken,
    nodeCanFillSlot,
    normalizeSurface,
    opinionContextSupportsMissingSlot,
    parserInactiveTokenClone,
    positiveResponseDiscourseAntecedentDescriptor,
    predicateOmissionProfileForHead,
    predicateProfilesCompatible,
    quantifiedClassifierEllipsisDescriptor,
    questionDescriptorForContextTurn,
    templateDerivedSlots,
    tokenRowsForAnalysis,
    traceInfo,
    withoutIgnorableSpaceText,
  } = dependencies;

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

  return {
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
    typedContextDependentFragmentBoundary,
    saturatedCompletionBoundary,
    licensedContextOpinionStanceFrame,
    licensedContextConventionalCognitionStatement,
    licensedContextStancePredicateAnswer,
    contextualQuantifiedClassifierNPBoundary,
    conventionalZiDurationConstruction,
    contextualConventionalZiDurationBoundary,
    licensedContextQuantifiedTimeNP,
  };
};
