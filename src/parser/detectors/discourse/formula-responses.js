"use strict";

module.exports = function createFormulaResponseFamily(dependencies = {}) {
  const {
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
  } = dependencies;

  function protectedOpaqueFormulaPassthrough(core) {
    if (!core || core.length !== 1) return null;
    const only = core[0];
    if (!only || only.kind !== "construction") return null;
    if (only.type !== "FormulaDiscourseUnit") return null;
    if (traceKind(only) !== "protected_formula_table") return null;
    return only;
  }

  function transparentFormulaPartClone(node, overrides = {}) {
    return parserInactiveTokenClone(node, {
      label: overrides.label || node.label || "func",
      pos: overrides.pos || (overrides.label === "particle" ? "particle" : "function"),
      syntax: overrides.syntax || node.syntax || "formula_part",
      slots: overrides.slots || [],
      reason: overrides.reason || "Token stays learner-visible inside a transparent discourse formula while the parent carries the formula/discourse function.",
    });
  }

  function makeTransparentDiscourseFormula(children, detail = {}) {
    const surface = children.map((node) => flattenSurface(node)).join("");
    const childSlots = cleanSlots(children.flatMap((node) => nodeSlots(node)));
    return construction("FormulaDiscourseUnit", "Formula", children, {
      note: detail.note || "Transparent discourse formula: parent keeps the formula/discourse function while child tokens stay learner-visible.",
      slots: mergeUnique(childSlots, ["formula_discourse_unit", "formula", "discourse_response", "clause"]),
      trace: traceInfo("governed_discourse_wrapper", {
        construction_type: "FormulaDiscourseUnit",
        formula_transparency: "transparent_children",
        formula_doctrine: "v0.5.87 separates protected opaque formulae from transparent discourse formulae.",
        formula_type: detail.formula_type || "transparent_discourse_formula",
        template: detail.template || [],
        assigned_slots: detail.assigned_slots || [],
        surfaces: children.map((node) => flattenSurface(node)),
        surface,
        reason: detail.reason || "Accepted doctrine: this common discourse formula is conventional as a parent unit, but its child tokens are useful and should remain visible to learners.",
        ...(detail.context_trace || {}),
      }),
    });
  }

  const NEGATED_EXISTENTIAL_RESPONSE_PARTICLES = new Set(["呀", "啊", "喇", "喎", "啫"]);

  function isNegatedExistentialResponseParticle(node) {
    return Boolean(node)
      && node.kind === "token"
      && isParticle(node)
      && NEGATED_EXISTENTIAL_RESPONSE_PARTICLES.has(flattenSurface(node));
  }

  function negatedExistentialSubjectClone(node) {
    return parserInactiveTokenClone(node, {
      label: node.label || "who",
      pos: node.pos || "pronoun",
      syntax: "subject_of_negated_existential_domain_ellipsis_fragment",
      slots: ["subject"],
      reason: "The overt subject remains visible inside a negative existential response whose possession/existence domain is discourse-dependent.",
    });
  }

  function negatedExistentialFocusClone(node) {
    return parserInactiveTokenClone(node, {
      label: node.label || "how",
      pos: node.pos || "adverbial",
      syntax: "focus_adverb negated_existential_response_modifier",
      slots: ["focus_adverb", "how"],
      reason: "The overt focus adverb remains visible and scopes over the negative existential response.",
    });
  }

  function negatedExistentialPredicateClone(node, repeated = false) {
    return parserInactiveTokenClone(node, {
      label: "func",
      pos: "function",
      syntax: repeated
        ? "negated_existential_predicate repeated_discourse_fragment"
        : "negated_existential_predicate discourse_fragment",
      slots: ["negated_existential", "predicate"],
      reason: repeated
        ? "Each visible 冇 repeats the same negative existential response; no missing domain words are inserted."
        : "冇 is the overt negative existential predicate in the short response fragment.",
    });
  }

  function negatedExistentialParticleClone(node) {
    const surface = flattenSurface(node);
    return parserInactiveTokenClone(node, {
      label: "particle",
      pos: "particle",
      syntax: "sentence_final_particle negative_existential_response_particle",
      slots: ["particle"],
      reason: `${surface} remains visible as the sentence-final particle contributing discourse stance to the negative response.`,
    });
  }

  function buildNegatedExistentialResponseFragment(children, detail = {}) {
    const subjectSurface = detail.subject_surface || "";
    const focusSurfaces = detail.focus_surfaces || [];
    const particleSurface = detail.response_particle || "";
    const repetitionCount = Number(detail.repetition_count || 1);
    const template = [
      ...(subjectSurface ? ["subject?"] : []),
      ...focusSurfaces.map(() => "focus_adverb?"),
      "negated_existential!",
      ...(repetitionCount > 1 ? ["separator!", "negated_existential!"] : []),
      ...(particleSurface ? ["particle?"] : []),
    ];
    const assignedSlots = [
      ...(subjectSurface ? ["subject"] : []),
      ...focusSurfaces.map(() => "focus_adverb"),
      "negated_existential",
      ...(repetitionCount > 1 ? ["separator", "negated_existential"] : []),
      ...(particleSurface ? ["particle"] : []),
    ];
    return construction("NegatedExistentialFragment", "negative existential fragment", children, {
      slots: cleanSlots([
        "negated_existential_fragment",
        "negated_existential",
        "answer_fragment",
        "discourse_response",
        "predicate",
        ...(subjectSurface ? ["subject"] : []),
        ...(focusSurfaces.length ? ["focus_adverb"] : []),
        ...(particleSurface ? ["particle"] : []),
      ]),
      note: "Typed negative existential response fragment. Visible subjects, focus adverbs, repetition, and particles remain transparent; the omitted possession/existence domain must come from discourse.",
      trace: traceInfo("governed_discourse_wrapper", {
        construction_type: "NegatedExistentialFragment",
        fragment_subtype: repetitionCount > 1
          ? "repeated_negated_existential_response"
          : subjectSurface
            ? "subject_bearing_negated_existential_response"
            : "negated_existential_response",
        template_family: "generative_template",
        template,
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        reason: repetitionCount > 1
          ? "Repeated 冇 forms one transparent emphatic negative response unit rather than two linked clauses. The omitted domain remains discourse-dependent."
          : "The visible material forms a bounded negative existential response. It is not promoted to a clean existential clause while its possession/existence domain is absent.",
        context_requirement_status: "context_required",
        missing_argument_slots: ["negative_response_domain"],
        missing_slot_details: [{ slot: "negative_response_domain", license_status: "unresolved" }],
        subject_status: subjectSurface ? "explicit" : "omitted",
        subject_surface: subjectSurface,
        focus_modifier_surfaces: focusSurfaces,
        response_particle: particleSurface,
        antecedent_status: "not_observed",
        discourse_license_not_observed: true,
        particle_contribution: particleSurface ? [particleSurface] : [],
        response_repetition_count: repetitionCount,
        repetition_separator_surfaces: detail.repetition_separator_surfaces || [],
        selected_alternative: "negative",
        omission_analysis_candidates: ["negative_existential_response_fragment", "domain_ellipsis"],
        not_claims: [
          "not_clean_existential_without_domain",
          "not_fabricated_domain",
          "not_generic_fragment_answer_slot_inheritance",
          "not_syntactic_null_object_claim",
          "not_action_predicate_negation",
        ],
      }),
    });
  }

  function negatedExistentialResponseFragmentFallback(core) {
    const compact = withoutIgnorableSpaceText(core || []);
    if (!compact.length) return null;
    const working = compact.slice();
    let particle = null;
    if (working.length && isNegatedExistentialResponseParticle(working[working.length - 1])) {
      particle = working.pop();
    }
    if (!working.length || !isToken(working[working.length - 1], "冇")) return null;
    const predicate = working.pop();
    let subject = null;
    const focus = [];
    if (working.length && nodeCanFillSlot(working[0], "subject")) subject = working.shift();
    while (working.length && nodeCanFillSlot(working[0], "focus_adverb")) focus.push(working.shift());
    if (working.length) return null;
    if (focus.length > 1) return null;

    const children = [
      ...(subject ? [negatedExistentialSubjectClone(subject)] : []),
      ...focus.map((node) => negatedExistentialFocusClone(node)),
      negatedExistentialPredicateClone(predicate),
      ...(particle ? [negatedExistentialParticleClone(particle)] : []),
    ];
    return buildNegatedExistentialResponseFragment(children, {
      subject_surface: subject ? flattenSurface(subject) : "",
      focus_surfaces: focus.map((node) => flattenSurface(node)),
      response_particle: particle ? flattenSurface(particle) : "",
    });
  }

  function repeatedNegatedExistentialResponseForPunctuation(nodes) {
    const working = (nodes || []).slice();
    const terminal = [];
    while (working.length && isClauseSequenceTerminal(working[working.length - 1])) terminal.unshift(working.pop());
    const compact = withoutIgnorableSpaceText(working);
    let particle = null;
    if (compact.length && isNegatedExistentialResponseParticle(compact[compact.length - 1])) particle = compact.pop();
    if (compact.length !== 3) return null;
    const [first, separator, second] = compact;
    if (!isToken(first, "冇") || !isClauseSequenceSeparator(separator) || !isToken(second, "冇")) return null;
    if (!terminal.length) return null;

    const children = [
      negatedExistentialPredicateClone(first, true),
      separator,
      negatedExistentialPredicateClone(second, true),
      ...(particle ? [negatedExistentialParticleClone(particle)] : []),
    ];
    const fragment = buildNegatedExistentialResponseFragment(children, {
      response_particle: particle ? flattenSurface(particle) : "",
      repetition_count: 2,
      repetition_separator_surfaces: [flattenSurface(separator)],
    });
    return [fragment, ...terminal];
  }


  const ACKNOWLEDGEMENT_REPETITION_PARTICLES = new Set(["呀", "啊", "喇", "啦", "喎", "啫"]);

  const ACKNOWLEDGEMENT_REPETITION_FAMILIES = [
    {
      key: "positive_existential",
      subtype: "positive_existential_acknowledgement_repetition",
      layouts: new Set(["contiguous", "comma_separated"]),
      pattern: [
        {
          surface: "有",
          required_slot: "existential",
          label: "func",
          pos: "function",
          syntax: "positive_existential_response repeated_formula_part",
          slots: ["positive_response", "existential", "formula_expression"],
          reason: "The visible 有 is the positive existential/possessive response predicate; its discourse domain is represented as a typed omitted slot rather than an inserted token.",
        },
      ],
    },
    {
      key: "agreement",
      subtype: "agreement_acknowledgement_repetition",
      layouts: new Set(["contiguous", "comma_separated"]),
      pattern: [
        {
          surface: "係",
          label: "func",
          pos: "function",
          syntax: "agreement_response_marker repeated_formula_part",
          slots: ["agreement_response", "confirmation_response", "formula_expression"],
          reason: "The visible 係 is an agreement/confirmation response marker, not an incomplete copular clause.",
        },
      ],
    },
    {
      key: "approval",
      subtype: "approval_acknowledgement_repetition",
      layouts: new Set(["comma_separated"]),
      pattern: [
        {
          surface: "好",
          label: "like",
          pos: "stative",
          syntax: "approval_response_stative repeated_formula_part",
          slots: ["approval_response", "stative_predicate", "formula_expression"],
          reason: "The visible 好 is an approval/acceptance response unit, not a degree modifier over an omitted adjective.",
        },
      ],
    },
    {
      key: "acceptability",
      subtype: "acceptability_acknowledgement_repetition",
      layouts: new Set(["comma_separated"]),
      pattern: [
        {
          surface: "得",
          label: "func",
          pos: "function",
          syntax: "acceptability_response_predicate repeated_formula_part",
          slots: ["acceptability_predicate", "formula_expression"],
          reason: "The visible 得 is the acceptability/closure response predicate inside the repeated formula.",
        },
      ],
    },
    {
      key: "cognition_acknowledgement",
      subtype: "cognition_acknowledgement_repetition",
      layouts: new Set(["contiguous", "comma_separated"]),
      pattern: [
        {
          surface: "我",
          required_slot: "subject",
          label: "who",
          pos: "pronoun",
          syntax: "subject_of_repeated_cognition_acknowledgement",
          slots: ["subject"],
          reason: "The visible 我 remains the overt experiencer in each repeated cognition acknowledgement unit.",
        },
        {
          surface: "知",
          required_slot: "cognition_predicate",
          label: "doing",
          pos: "verb",
          syntax: "cognition_acknowledgement_predicate repeated_formula_part",
          slots: ["cognition_predicate", "predicate"],
          reason: "The visible 知 remains a cognition predicate; repetition blocks a false predicate-plus-propositional-content analysis.",
        },
      ],
    },
  ];

  function acknowledgementRepetitionSeparator(node) {
    return Boolean(node) && node.kind === "text" && ["，", ","].includes(node.text || "");
  }

  function acknowledgementRepetitionParticle(node) {
    return Boolean(node)
      && node.kind === "token"
      && isParticle(node)
      && ACKNOWLEDGEMENT_REPETITION_PARTICLES.has(flattenSurface(node));
  }

  function acknowledgementPatternPartMatches(node, part) {
    if (!node || node.kind !== "token") return false;
    if (part.surface && flattenSurface(node) !== part.surface) return false;
    if (part.required_slot && !nodeCanFillSlot(node, part.required_slot)) return false;
    return true;
  }

  function acknowledgementRepetitionPartClone(node, part) {
    return parserInactiveTokenClone(node, {
      label: part.label,
      pos: part.pos,
      syntax: part.syntax,
      slots: part.slots,
      reason: part.reason,
    });
  }

  function acknowledgementRepetitionParticleClone(node) {
    const surface = flattenSurface(node);
    return parserInactiveTokenClone(node, {
      label: "particle",
      pos: "particle",
      syntax: "sentence_final_particle acknowledgement_repetition_particle",
      slots: ["particle"],
      reason: `${surface} remains visible as an optional discourse particle inside the repeated formula unit.`,
    });
  }

  function acknowledgementUnitDescriptor(segment) {
    let compact = withoutIgnorableSpaceText(segment || []);
    if (!compact.length || compact.some((node) => node.kind === "text")) return null;

    if (compact.length === 1
        && compact[0].kind === "construction"
        && compact[0].type === "FormulaDiscourseUnit"
        && traceKind(compact[0]) === "protected_formula_table") {
      const protectedSurface = flattenSurface(compact[0]);
      const particleSurface = Array.from(ACKNOWLEDGEMENT_REPETITION_PARTICLES)
        .sort((left, right) => right.length - left.length)
        .find((candidate) => protectedSurface.endsWith(candidate) && protectedSurface.length > candidate.length);
      if (particleSurface) {
        const baseSurface = protectedSurface.slice(0, -particleSurface.length);
        compact = [token(baseSurface), token(particleSurface)];
      }
    }

    const working = compact.slice();
    const particle = acknowledgementRepetitionParticle(working[working.length - 1]) ? working.pop() : null;
    const family = ACKNOWLEDGEMENT_REPETITION_FAMILIES.find((candidate) =>
      candidate.pattern.length === working.length
        && candidate.pattern.every((part, index) => acknowledgementPatternPartMatches(working[index], part))
    );
    if (!family) return null;

    const children = family.pattern.map((part, index) => acknowledgementRepetitionPartClone(working[index], part));
    if (particle) children.push(acknowledgementRepetitionParticleClone(particle));
    return {
      key: family.key,
      subtype: family.subtype,
      layouts: family.layouts,
      canonical_unit: family.pattern.map((part) => part.surface).join(""),
      surface: compact.map((node) => flattenSurface(node)).join(""),
      children,
    };
  }

  function sameAcknowledgementUnitFamily(units) {
    if (!units.length) return false;
    const first = units[0];
    return units.every((unit) => unit
      && unit.key === first.key
      && unit.canonical_unit === first.canonical_unit);
  }

  function commaSeparatedAcknowledgementUnits(core) {
    const segments = [];
    const separators = [];
    let segment = [];
    for (const node of core) {
      if (acknowledgementRepetitionSeparator(node)) {
        if (!segment.length) return null;
        segments.push(segment);
        separators.push(node);
        segment = [];
      } else {
        segment.push(node);
      }
    }
    if (!segment.length || !separators.length) return null;
    segments.push(segment);

    const units = segments.map(acknowledgementUnitDescriptor);
    if (units.length < 2 || units.length > 4 || !sameAcknowledgementUnitFamily(units)) return null;
    if (!units[0].layouts.has("comma_separated")) return null;
    return { units, separators, layout: "comma_separated" };
  }

  function contiguousAcknowledgementUnits(core) {
    const compact = withoutIgnorableSpaceText(core || []);
    if (!compact.length || compact.some((node) => node.kind === "text")) return null;

    for (let width = 1; width <= Math.floor(compact.length / 2); width += 1) {
      if (compact.length % width !== 0) continue;
      const count = compact.length / width;
      if (count < 2 || count > 4) continue;
      const units = [];
      for (let index = 0; index < count; index += 1) {
        units.push(acknowledgementUnitDescriptor(compact.slice(index * width, (index + 1) * width)));
      }
      if (!sameAcknowledgementUnitFamily(units)) continue;
      if (!units[0].layouts.has("contiguous")) continue;
      return { units, separators: [], layout: "contiguous" };
    }
    return null;
  }

  function acknowledgementAssignedSlot(node) {
    const slots = node.slots || [];
    for (const slot of [
      "particle",
      "subject",
      "cognition_predicate",
      "approval_response",
      "acceptability_predicate",
      "positive_response",
      "agreement_response",
    ]) {
      if (slots.includes(slot)) return slot;
    }
    return "formula_expression";
  }

  function buildAcknowledgementRepetitionFormula(match) {
    const children = [];
    const assignedSlots = [];
    const repeatedUnitSpans = [];
    match.units.forEach((unit, index) => {
      const start = children.length;
      for (const child of unit.children) {
        children.push(child);
        if (child.kind === "token") assignedSlots.push(acknowledgementAssignedSlot(child));
      }
      repeatedUnitSpans.push({
        surface: unit.surface,
        canonical_unit: unit.canonical_unit,
        child_start_index: start,
        child_end_index: children.length - 1,
      });
      if (index < match.separators.length) {
        children.push(match.separators[index]);
        assignedSlots.push("separator");
      }
    });

    const key = match.units[0].key;
    const contextTrace = key === "positive_existential"
      ? {
        context_requirement_status: "context_required",
        missing_argument_slots: ["positive_response_domain"],
        missing_slot_details: [{ slot: "positive_response_domain", license_status: "unresolved" }],
        antecedent_status: "not_observed",
        discourse_license_not_observed: true,
        selected_alternative: "positive",
        response_domain_surface: "",
        not_claims: [
          "not_fabricated_domain",
          "not_clean_existential_without_domain",
          "not_syntactic_null_object_claim",
          "not_arbitrary_repeated_token_rule",
        ],
      }
      : {
        context_requirement_status: "context_not_required",
        missing_argument_slots: [],
        missing_slot_details: [],
        antecedent_status: "not_applicable",
        discourse_license_not_observed: false,
        not_claims: ["not_arbitrary_repeated_token_rule"],
      };

    return construction("FormulaDiscourseUnit", "Formula", children, {
      slots: cleanSlots([
        "formula_discourse_unit",
        "formula",
        "formula_expression",
        "discourse_response",
        "acknowledgement_response",
        ...(key === "positive_existential" ? ["positive_response", "existential"] : []),
        ...(key === "agreement" ? ["agreement_response", "confirmation_response"] : []),
        ...(key === "approval" ? ["approval_response"] : []),
        ...(key === "acceptability" ? ["acceptability_predicate"] : []),
        ...(key === "cognition_acknowledgement" ? ["cognition_predicate", "subject"] : []),
        ...(match.separators.length ? ["separator"] : []),
        "clause",
      ]),
      note: "Bounded acknowledgement-repetition construction. A repeated formula unit may carry optional particles and visible separators; the grammar is defined by a shared formula family rather than by a memorized full sentence.",
      trace: traceInfo("governed_discourse_wrapper", {
        construction_type: "FormulaDiscourseUnit",
        formula_type: "acknowledgement_repetition",
        repetition_subtype: match.units[0].subtype,
        repetition_layout: match.layout,
        acknowledgement_family: key,
        approved_acknowledgement_inventory_key: key,
        canonical_repeated_unit: match.units[0].canonical_unit,
        repeated_unit_surfaces: match.units.map((unit) => unit.surface),
        repeated_unit_count: match.units.length,
        repeated_unit_spans: repeatedUnitSpans,
        repetition_separator_surfaces: match.separators.map((node) => flattenSurface(node)),
        template_family: "construction_template",
        template: match.units.flatMap((unit, index) => [
          "acknowledgement_unit!",
          ...(index < match.separators.length ? ["separator!"] : []),
        ]),
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        formula_transparency: "transparent_children",
        reason: "Two to four structurally equivalent units from an approved acknowledgement family perform one repeated discourse-response function. Optional particles do not change the family, and visible separators remain transparent children.",
        ...contextTrace,
      }),
    });
  }

  function boundedAcknowledgementRepetitionForPunctuation(nodes) {
    const working = (nodes || []).slice();
    const terminal = [];
    while (working.length && isClauseSequenceTerminal(working[working.length - 1])) terminal.unshift(working.pop());
    if (!terminal.length) return null;
    const core = withoutIgnorableSpaceText(working);
    if (!core.length) return null;
    const match = commaSeparatedAcknowledgementUnits(core) || contiguousAcknowledgementUnits(core);
    if (!match) return null;
    return [buildAcknowledgementRepetitionFormula(match), ...terminal];
  }

  function discourseMarkedAgreementResponseFallback(compact = []) {
    if (compact.length !== 3) return null;
    const [marker, additive, agreement] = compact;
    if (!["咁", "噉"].includes(flattenSurface(marker))) return null;
    if (!nodeCanFillSlot(marker, "discourse_marker")) return null;
    if (!isToken(additive, "又") || !nodeCanFillSlot(additive, "focus_adverb")) return null;
    if (!isToken(agreement, "係")) return null;

    const children = [
      transparentFormulaPartClone(marker, {
        label: "func",
        pos: "function",
        syntax: "discourse_marker demonstrative_manner",
        slots: ["discourse_marker", "formula_expression"],
        reason: `${flattenSurface(marker)} introduces the discourse-qualified acknowledgement and remains visible as the 'then / in that case' element.`,
      }),
      transparentFormulaPartClone(additive, {
        label: additive.label || "how",
        pos: "adverbial",
        syntax: "focus_adverb additive_agreement_modifier",
        slots: ["focus_adverb", "how"],
        reason: "又 remains visible as the additive/focus modifier 'also / again'.",
      }),
      transparentFormulaPartClone(agreement, {
        label: "func",
        pos: "function",
        syntax: "agreement_confirmation_marker",
        slots: ["agreement_response", "confirmation_response", "formula_expression"],
        reason: "係 supplies the agreement/confirmation response rather than an incomplete copular clause.",
      }),
    ];
    return makeTransparentDiscourseFormula(children, {
      formula_type: "discourse_marked_agreement_response",
      template: ["discourse_marker!", "focus_adverb!", "agreement_response!"],
      assigned_slots: ["discourse_marker", "focus_adverb", "agreement_response"],
      reason: "A discourse marker plus additive focus and 係 forms a transparent qualified acknowledgement such as 噉又係 / 咁又係. The pattern is structural and orthography-tolerant, not a memorized whole sentence.",
    });
  }

  function transparentDiscourseFormulaFallback(core) {
    if (!core || !core.length) return null;
    const compact = withoutIgnorableSpaceText(core);
    const surface = compact.map((node) => flattenSurface(node)).join("");

    const discourseMarkedAgreement = discourseMarkedAgreementResponseFallback(compact);
    if (discourseMarkedAgreement) return discourseMarkedAgreement;

    if (surface === "係咩" && compact.length === 2 && isToken(compact[0], "係") && isToken(compact[1], "咩")) {
      const children = [
        transparentFormulaPartClone(compact[0], {
          label: "func",
          pos: "function",
          syntax: "copula_confirmation_marker",
          slots: ["formula_expression"],
          reason: "係 is visible as the confirmation/copula element in the discourse formula 係咩.",
        }),
        transparentFormulaPartClone(compact[1], {
          label: "particle",
          pos: "particle",
          syntax: "surprise_question_particle sentence_final_particle",
          slots: ["particle"],
          reason: "咩 is visible as the surprise/question particle in 係咩, not as a wh-object here.",
        }),
      ];
      return makeTransparentDiscourseFormula(children, {
        formula_type: "confirmation_surprise_question",
        template: ["confirmation_marker!", "particle!"],
        assigned_slots: ["confirmation_marker", "particle"],
        reason: "係咩 is a conventional response formula meaning 'really? / is that so?', but 係 and 咩 are useful learner-visible pieces.",
      });
    }

    if (surface === "好呀" && compact.length === 2 && isToken(compact[0], "好") && isParticle(compact[1])) {
      const children = [
        transparentFormulaPartClone(compact[0], {
          label: "like",
          pos: "stative",
          syntax: "approval_response_stative",
          slots: ["stative_predicate", "formula_expression"],
          reason: "好 is visible as the approval/okay element in 好呀, not merely a degree marker here.",
        }),
        transparentFormulaPartClone(compact[1], {
          label: "particle",
          pos: "particle",
          syntax: "sentence_final_particle",
          slots: ["particle"],
          reason: "呀 stays visible as the sentence-final softening particle in 好呀.",
        }),
      ];
      return makeTransparentDiscourseFormula(children, {
        formula_type: "agreement_response",
        template: ["approval_response!", "particle!"],
        assigned_slots: ["approval_response", "particle"],
        reason: "好呀 is a conventional agreement response, but 好 + 呀 remains useful and transparent for learners.",
      });
    }

    if (surface === "放心啦" && compact.length === 2 && isToken(compact[0], "放心") && isParticle(compact[1])) {
      const children = [
        transparentFormulaPartClone(compact[0], {
          label: "like",
          pos: "stative",
          syntax: "reassurance_stative formula_expression",
          slots: ["stative_predicate", "formula_expression"],
          reason: "放心 is visible as a reusable reassurance expression meaning be at ease / don't worry.",
        }),
        transparentFormulaPartClone(compact[1], {
          label: "particle",
          pos: "particle",
          syntax: "sentence_final_particle",
          slots: ["particle"],
          reason: "啦 stays visible as the sentence-final reassurance/softening particle.",
        }),
      ];
      return makeTransparentDiscourseFormula(children, {
        formula_type: "reassurance_formula",
        template: ["reassurance_expression!", "particle!"],
        assigned_slots: ["reassurance_expression", "particle"],
        reason: "放心啦 is formulaic as reassurance, but 放心 and 啦 are useful learner-visible pieces.",
      });
    }

    if (surface === "到時見啦" && compact.length === 3 && isToken(compact[0], "到時") && isToken(compact[1], "見") && isParticle(compact[2])) {
      const children = [
        transparentFormulaPartClone(compact[0], {
          label: "when",
          pos: "time",
          syntax: "temporal_adjunct",
          slots: ["time"],
          reason: "到時 stays visible as the temporal expression 'then / when the time comes'.",
        }),
        transparentFormulaPartClone(compact[1], {
          label: "doing",
          pos: "verb",
          syntax: "leave_taking_verb",
          slots: ["action_verb", "predicate"],
          reason: "見 stays visible as the action verb 'see / meet' inside the leave-taking formula.",
        }),
        transparentFormulaPartClone(compact[2], {
          label: "particle",
          pos: "particle",
          syntax: "sentence_final_particle",
          slots: ["particle"],
          reason: "啦 stays visible as the sentence-final softening particle.",
        }),
      ];
      return makeTransparentDiscourseFormula(children, {
        formula_type: "transparent_leave_taking_formula",
        template: ["time!", "action_verb!", "particle!"],
        assigned_slots: ["time", "action_verb", "particle"],
        reason: "到時見啦 is conventional as 'see you then', but its time + see + particle structure is useful enough not to hide.",
      });
    }

    if (["可以呀", "可以啊"].includes(surface) && compact.length === 2 && isToken(compact[0], "可以") && isParticle(compact[1])) {
      const children = [
        transparentFormulaPartClone(compact[0], {
          label: "func",
          pos: "function",
          syntax: "permission_acceptability_response modal_response",
          slots: ["modal", "formula_expression", "permission_response"],
          reason: "可以 is interpreted as a context-dependent permission/acceptability response here, not as a complete standalone ModalVP with an unexpressed VP complement.",
        }),
        transparentFormulaPartClone(compact[1], {
          label: "particle",
          pos: "particle",
          syntax: "sentence_final_particle",
          slots: ["particle"],
          reason: "呀/啊 stays visible as the sentence-final response particle.",
        }),
      ];
      return makeTransparentDiscourseFormula(children, {
        formula_type: "permission_acceptability_response",
        template: ["permission_response!", "particle!"],
        assigned_slots: ["permission_response", "particle"],
        reason: "可以呀/可以啊 is a conventional context-dependent affirmative permission/acceptability response. The parent is a broad discourse formula while 可以 and the particle remain visible.",
      });
    }

    const negatedExistentialResponse = negatedExistentialResponseFragmentFallback(compact);
    if (negatedExistentialResponse) return negatedExistentialResponse;

    if (compact.length === 2
        && isToken(compact[0], "得")
        && isParticle(compact[1])
        && ["啦", "喇", "嘞"].includes(flattenSurface(compact[1]))) {
      const particleSurface = flattenSurface(compact[1]);
      const children = [
        transparentFormulaPartClone(compact[0], { label: "func", pos: "function", syntax: "acceptability_predicate discourse_fragment", slots: ["acceptability_predicate", "formula_expression"], reason: "得 supplies the okay/enough acceptability response." }),
        transparentFormulaPartClone(compact[1], { label: "particle", pos: "particle", syntax: "sentence_final_particle closure_particle", slots: ["particle"], reason: `${particleSurface} marks the response as settled, final, or softened.` }),
      ];
      return makeTransparentDiscourseFormula(children, {
        formula_type: "acceptability_fragment",
        template: ["acceptability_predicate!", "particle!"],
        assigned_slots: ["acceptability_predicate", "particle"],
        reason: `得 + ${particleSurface} is a conventional acceptability/closure response with transparent children. The construction is licensed by the broad predicate-plus-closure-particle pattern.`,
      });
    }

    if (surface === "係囉" && compact.length === 2 && isToken(compact[0], "係") && isParticle(compact[1])) {
      const children = [
        transparentFormulaPartClone(compact[0], { label: "func", pos: "function", syntax: "agreement_copula formula_expression", slots: ["agreement_response", "formula_expression"], reason: "係 supplies the agreement/confirmation element." }),
        transparentFormulaPartClone(compact[1], { label: "particle", pos: "particle", syntax: "agreement_particle sentence_final_particle", slots: ["particle"], reason: "囉 marks agreement or obviousness in the discourse response." }),
      ];
      return makeTransparentDiscourseFormula(children, { formula_type: "discourse_agreement_fragment", template: ["agreement_response!", "particle!"], assigned_slots: ["agreement_response", "particle"], reason: "係囉 is a conventional agreement response while 係 and 囉 remain learner-visible." });
    }

    return null;
  }

  function leaveTakingFormulaFallback(core) {
    const { core: bareCore, particles } = withoutTrailingParticles(core);
    const compact = withoutIgnorableSpaceText(bareCore);
    if (compact.length !== 1) return null;
    const formula = compact[0];
    if (!isToken(formula, "早唞")) return null;
    const formulaChild = parserInactiveTokenClone(formula, {
      label: "func",
      pos: "function",
      syntax: "leave_taking_formula formula_discourse_unit",
      slots: ["formula_expression", "leave_taking_formula"],
      reason: "早唞 is interpreted as a leave-taking/social formula here, with the sentence-final particle kept visible.",
    });
    const children = [formulaChild, ...particles];
    return construction("FormulaDiscourseUnit", "Formula", children, {
      note: "Transparent leave-taking formula. This keeps 早唞 and 啦 visible under the broad FormulaDiscourseUnit category instead of a subtype-specific construction label.",
      slots: mergeUnique(templateDerivedSlots("FormulaDiscourseUnit", children), ["formula_discourse_unit", "formula_expression", "formula", "particle", "clause"]),
      trace: traceInfo("generative_template", {
        construction_type: "FormulaDiscourseUnit",
        retired_label_alias: "LeaveTakingFormula",
        template: ["formula_expression!", "particle?"],
        assigned_slots: ["formula_expression", ...particles.map(() => "particle")],
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Promotes a common formula while preserving child tokens for learner display.",
      }),
    });
  }

  return {
    protectedOpaqueFormulaPassthrough,
    repeatedNegatedExistentialResponseForPunctuation,
    boundedAcknowledgementRepetitionForPunctuation,
    transparentDiscourseFormulaFallback,
    leaveTakingFormulaFallback,
  };
};
