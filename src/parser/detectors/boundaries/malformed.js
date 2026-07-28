"use strict";

const OVERT_OBJECT_SELECTION_REVIEW_TYPES = new Set(["PerfectiveVP", "PostverbalZoPerfectiveVP", "TransitiveVP", "CompletionVP", "ProductiveVO"]);

module.exports = function createMalformedBoundaryDetectors(dependencies = {}) {
  const {
    cleanSlots,
    construction,
    firstToken,
    flattenNodes,
    flattenSurface,
    isToken,
    nodeCanFillSlot,
    nodeSlots,
    parserInactiveTokenClone,
    productiveObjectHeadToken,
    tokenSemanticDomains,
    topicChainAntecedentCompatibility,
    traceInfo,
    withoutIgnorableSpaceText,
  } = dependencies;

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

  return {
    bareNumeralObjectMalformedCandidate,
    existentialQuestionWithVpMalformedCandidate,
    overtObjectSelectionReviewCandidate,
  };
};
