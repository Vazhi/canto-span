"use strict";

module.exports = function createNeedsContextBoundaryDetectors(dependencies = {}) {
  const {
    cleanSlots,
    construction,
    firstToken,
    flattenDisplaySurface,
    flattenSurface,
    isModalToken,
    isToken,
    nodeCanFillSlot,
    nodeSlots,
    nodeSurfaceMatches,
    parserInactiveTokenClone,
    phase4CognitionActiveTokenClone,
    predicateOmissionProfileForHead,
    templateDerivedSlots,
    tokenSemanticDomains,
    traceInfo,
    withoutTrailingParticles,
  } = dependencies;

  function ambiguousNeedsContextCandidate(core) {
    if (!core || core.length !== 1) return null;
    const first = firstToken(core[0]);
    if (!first || first.syntax !== "ambiguous_needs_context") return null;
    const candidateAnalyses = (first.trace && first.trace.candidate_analyses) || [
      { construction: "NegatedStativePredicate", split: ["唔", "好食"], meaning_hint: "not tasty", parser_active: false },
      { construction: "ProhibitiveImperative", split: ["唔好", "食"], meaning_hint: "don't eat", parser_active: false },
    ];
    return construction("NeedsContext", "needs context", core, {
      note: "Ambiguous split: 唔 + 好食 or 唔好 + 食.",
      trace: traceInfo("special_ambiguity_rule", {
        surface: "唔好食",
        reason: "Needs context ambiguity.",
        candidate_analyses: candidateAnalyses,
      }),
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

  return {
    ambiguousNeedsContextCandidate,
    mandarinNegatorNeedsContextCandidate,
    incompleteProhibitiveNeedsContextCandidate,
    incompleteRestrictiveFocusBoundaryCandidate,
    predicateOmissionCandidate,
    incompleteModalNeedsContextCandidate,
    incompleteContextualPredicateCandidate,
    incompleteLocativeNeedsContextCandidate,
    mandarinReviewNeedsContextCandidate,
  };
};
