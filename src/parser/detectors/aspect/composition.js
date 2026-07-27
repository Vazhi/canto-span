"use strict";

module.exports = function createAspectCompositionDetectors(dependencies = {}) {
  const {
    classifierObjectNPFromNodes, cleanSlots, compositionPartClone, construction,
    constructionSlotsByType, firstToken, flattenSurface, isToken, nodeCanFillSlot,
    nodeSlots, parserInactiveTokenClone, templateDerivedSlots, traceInfo, withoutIgnorableSpaceText, withoutTrailingParticles,
  } = dependencies;

function durativeAspectCompositionFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length !== 3 || !nodeCanFillSlot(compact[0], "action_verb") || flattenSurface(compact[1]) !== "住") return null;
  if (!nodeCanFillSlot(compact[2], "object") && !nodeCanFillSlot(compact[2], "head_noun") && !nodeCanFillSlot(compact[2], "np")) return null;
  const marker = parserInactiveTokenClone(firstToken(compact[1]) || token("住"), {
    label: "func", pos: "function", syntax: "durative_aspect", slots: ["durative_aspect", "aspect_marker"], jyutping: "zyu6",
    note: "住 marks the continuing wearing/resultant state, distinct from progressive 緊.",
    reason: "住 is interpreted as durative aspect only inside the licensed action + 住 + object pattern.",
  });
  const children = [compact[0], marker, compact[2], ...particles];
  return construction("DurativeVP", "DurativeVP", children, {
    slots: constructionSlotsByType("DurativeVP", children),
    trace: traceInfo("generative_template", {
      construction_type: "DurativeVP", template_family: "generative_template",
      template: ["action_verb!", "durative_aspect!", "object!", "particle?"],
      assigned_slots: ["action_verb", "durative_aspect", "object", ...particles.map(() => "particle")],
      surfaces: children.map(flattenSurface), aspect_type: "durative_continuing_state",
      not_claims: ["not_progressive_event", "not_global_住_lexicalization"],
    }),
  });
}

function perfectiveResultCompositionFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  let cursor = 0;
  const subject = compact[cursor] && nodeCanFillSlot(compact[cursor], "subject") ? compact[cursor++] : null;
  if (compact.length - cursor !== 4) return null;
  const [action, result, aspect, object] = compact.slice(cursor);
  if (!nodeCanFillSlot(action, "action_verb") || !nodeCanFillSlot(aspect, "perfective_aspect")) return null;
  if (!nodeCanFillSlot(object, "object") && !nodeCanFillSlot(object, "head_noun") && !nodeCanFillSlot(object, "np")) return null;
  const resultSurface = flattenSurface(result);
  if (!nodeCanFillSlot(result, "completion_marker") && resultSurface !== "好") return null;
  const innerType = resultSurface === "好" ? "ResultComplementVP" : "CompletionVP";
  const inner = construction(innerType, resultSurface === "好" ? "ResultVP" : "CompletionVP", [
    action,
    compositionPartClone(result, {
      label: resultSurface === "好" ? "how" : "func",
      syntax: resultSurface === "好" ? "result_state_complement" : "completion_result_complement",
      slots: resultSurface === "好" ? ["result_complement"] : ["completion_marker", "result_complement"],
      reason: `${resultSurface} is the overt result/phase complement formed with the action before perfective 咗 scopes over the complex predicate.`,
    }),
  ], {
    slots: cleanSlots([innerType === "CompletionVP" ? "completion_vp" : "result_complement_vp", "result_complement", "vp", "action_vp", "predicate"]),
    note: "Inner result/phase predicate formed before perfective aspect.",
    trace: traceInfo("generative_template", {
      construction_type: innerType,
      template_family: "generative_template",
      template: ["action_verb!", "result_or_phase_complement!"],
      assigned_slots: ["action_verb", "result_complement"],
      surfaces: [flattenSurface(action), resultSurface],
      aspect_scope_status: "inside_perfective_scope",
    }),
  });
  const perfective = construction("PerfectiveVP", "PerfectiveVP", [
    inner,
    compositionPartClone(aspect, { label: "func", syntax: "perfective_aspect", slots: ["perfective_aspect", "aspect_marker"] }),
    object,
    ...particles,
  ], {
    slots: cleanSlots(["perfective_vp", "vp", "action_vp", "predicate", "perfective_aspect", "object"]),
    note: "Perfective aspect scopes over an already formed result/phase predicate while surface order remains unchanged.",
    trace: traceInfo("generative_template", {
      construction_type: "PerfectiveVP",
      template_family: "generative_template",
      template: ["result_or_phase_vp!", "perfective_aspect!", "object!", "particle?"],
      assigned_slots: ["predicate", "perfective_aspect", "object", ...particles.map(() => "particle")],
      surfaces: [flattenSurface(inner), flattenSurface(aspect), flattenSurface(object), ...particles.map(flattenSurface)],
      aspect_scope_status: "perfective_over_result_complex",
      not_claims: ["not_flat_aspect_stack", "not_hidden_object"],
    }),
  });
  if (!subject) return perfective;
  const children = [subject, perfective];
  return construction("SubjectPredicateClause", "SubjPred", children, {
    slots: templateDerivedSlots("SubjectPredicateClause", children),
    trace: traceInfo("generative_template", { construction_type: "SubjectPredicateClause", template_family: "generative_template", template: ["subject!", "predicate!"], assigned_slots: ["subject", "predicate"], surfaces: children.map(flattenSurface) }),
  });
}

function restorativeRepetitiveComplementFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const compact = withoutIgnorableSpaceText(bareCore);
  if (compact.length < 3 || !nodeCanFillSlot(compact[0], "action_verb") || !isToken(compact[1], "返")) return null;
  const action = compact[0];
  const marker = (reading) => compositionPartClone(compact[1], {
    label: "func",
    syntax: reading === "restorative"
      ? "restorative_complement_marker"
      : "repetitive_resumptive_complement_marker",
    slots: reading === "restorative"
      ? ["verb_complement", "restorative_complement"]
      : ["verb_complement", "repetitive_complement"],
    reason: reading === "restorative"
      ? "返 marks restoration of a prior or expected state here; it is not literal return motion."
      : "返 marks repetition or resumption of the overt action here; it is not literal return motion.",
  });
  const thirdSurface = flattenSurface(compact[2]);
  if (thirdSurface === "好" && compact.length === 3) {
    const children = [action, marker("restorative"), compositionPartClone(compact[2], { label: "how", syntax: "restored_result_state", slots: ["result_complement"] }), ...particles];
    return construction("RestorativeComplementVP", "RestoreVP", children, { slots: constructionSlotsByType("RestorativeComplementVP", children), trace: traceInfo("generative_template", { construction_type: "RestorativeComplementVP", template_family: "generative_template", template: ["action_verb!", "restorative_complement!", "result_state!", "particle?"], assigned_slots: ["action_verb", "restorative_complement", "result_complement", ...particles.map(() => "particle")], surfaces: children.map(flattenSurface), return_reading: "restorative", not_claims: ["not_literal_return_motion", "not_generic_aspect"] }) });
  }
  if (compact.length === 3 && (nodeCanFillSlot(compact[2], "frequency_quantity") || /(^|\s)frequency_quantity(\s|$)/.test((firstToken(compact[2]) || {}).syntax || ""))) {
    const children = [action, marker("repetitive"), compact[2], ...particles];
    return construction("RepetitiveComplementVP", "RepeatVP", children, { slots: constructionSlotsByType("RepetitiveComplementVP", children), trace: traceInfo("generative_template", { construction_type: "RepetitiveComplementVP", template_family: "generative_template", template: ["action_verb!", "repetitive_complement!", "frequency_quantity!", "particle?"], assigned_slots: ["action_verb", "repetitive_complement", "frequency_quantity", ...particles.map(() => "particle")], surfaces: children.map(flattenSurface), return_reading: "repetitive_or_resumptive", not_claims: ["not_literal_return_motion", "not_generic_aspect"] }) });
  }
  if (compact.length === 4) {
    const object = classifierObjectNPFromNodes(compact.slice(2));
    if (object) {
      const actionSlots = new Set(nodeSlots(action));
      const actionSyntax = String((firstToken(action) || {}).syntax || "");
      const licensesResumptiveObjectReading = actionSlots.has("consumption_verb")
        || actionSyntax.includes("chain_select_perception")
        || actionSyntax.includes("chain_select_discourse_content");
      const reading = licensesResumptiveObjectReading ? "repetitive" : "underdetermined";
      const returnPart = reading === "repetitive"
        ? marker("repetitive")
        : compositionPartClone(compact[1], {
          label: "func",
          syntax: "return_or_resumptive_complement_marker",
          slots: ["verb_complement"],
          reason: "返 is a non-finite complement marker here. Available evidence does not force literal motion or a repetitive reading.",
        });
      const children = [action, returnPart, object, ...particles];
      const type = reading === "repetitive" ? "RepetitiveComplementVP" : "VerbComplementVP";
      const label = reading === "repetitive" ? "RepeatVP" : "VerbCompVP";
      return construction(type, label, children, {
        slots: constructionSlotsByType(type, children),
        trace: traceInfo("generative_template", {
          construction_type: type,
          template_family: "generative_template",
          template: ["action_verb!", reading === "repetitive" ? "repetitive_complement!" : "return_or_resumptive_complement!", "object!", "particle?"],
          assigned_slots: ["action_verb", reading === "repetitive" ? "repetitive_complement" : "verb_complement", "object", ...particles.map(() => "particle")],
          surfaces: children.map(flattenSurface),
          return_reading: reading === "repetitive" ? "repetitive_or_resumptive" : "context_underdetermined_return_or_resumptive",
          not_claims: reading === "repetitive"
            ? ["not_literal_return_motion", "not_generic_aspect"]
            : ["not_forced_literal_return_motion", "not_forced_repetitive_reading", "not_generic_aspect"],
        }),
      });
    }
  }
  return null;
}

function incompatibleAspectCompositionMalformedCandidate(core) {
  if (!core || core.length < 3) return null;
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  let cursor = 0;
  const subject = bareCore[cursor] && nodeCanFillSlot(bareCore[cursor], "subject") ? bareCore[cursor++] : null;
  const action = bareCore[cursor++];
  if (!action || !nodeCanFillSlot(action, "action_verb")) return null;
  const firstMarker = bareCore[cursor++];
  const secondMarker = bareCore[cursor++];
  if (!firstMarker || !secondMarker) return null;

  let malformedSubtype = "";
  let problem = "";
  let expected = [];
  if (nodeCanFillSlot(firstMarker, "perfective_aspect") && nodeCanFillSlot(secondMarker, "progressive_aspect")) {
    malformedSubtype = "incompatible_perfective_progressive_stack";
    problem = "Perfective 咗 and progressive 緊 are stacked in an incompatible order on one predicate.";
    expected = ["one_licensed_aspect_layer", "separate_clause_or_repair"];
  } else if ((isToken(firstMarker, "得") || isToken(firstMarker, "唔")) && nodeCanFillSlot(secondMarker, "perfective_aspect")) {
    malformedSubtype = isToken(firstMarker, "得") ? "potential_marker_followed_by_perfective" : "potential_negator_followed_by_perfective";
    problem = "Potential 得/唔 is followed by perfective 咗 instead of an overt result complement.";
    expected = ["overt_result_complement_after_potential_marker", "ordinary_perfective_vp_without_potential_marker"];
  } else if (["嚟", "去"].includes(flattenSurface(firstMarker)) && ["入", "出", "返", "上", "落"].includes(flattenSurface(secondMarker))) {
    malformedSubtype = "deictic_marker_not_outermost";
    problem = "Final deictic 嚟/去 precedes a path or return component instead of occupying the outer edge of the directional complex.";
    expected = ["path_or_return_before_final_deictic_marker", "separate_clause_or_repair"];
  } else {
    return null;
  }

  const children = [...(subject ? [subject] : []), action, firstMarker, secondMarker, ...bareCore.slice(cursor), ...particles];
  return construction("MalformedCandidate", "Malformed", children, {
    slots: cleanSlots(["malformed_candidate", "needs_review", "predicate", "problem_span", "action_verb", subject ? "subject" : ""]),
    note: "Review-bearing incompatible aspect/potential composition; all visible material is preserved without repairing the learner input.",
    trace: traceInfo("special_ambiguity_rule", {
      construction_type: "MalformedCandidate",
      malformed_family: "aspect_result_potential_composition",
      malformed_subtype: malformedSubtype,
      template: ["subject?", "action_verb!", "incompatible_marker_1!", "incompatible_marker_2!", "remainder?", "particle?"],
      assigned_slots: [...(subject ? ["subject"] : []), "action_verb", "incompatible_marker_1", "incompatible_marker_2", ...(bareCore.slice(cursor).length ? ["remainder"] : []), ...particles.map(() => "particle")],
      surfaces: children.map((node) => flattenSurface(node)),
      problem,
      expected_repairs: expected,
      semantic_review_flags: ["malformed_candidate_parse", "incompatible_aspect_or_potential_order"],
      not_claims: ["not_clean_aspect_stack", "not_hidden_result_complement", "not_silent_input_repair"],
      reason: "Aspect, potential, and result layers must compose in a licensed order; incompatible visible markers remain review-bearing."
    })
  });
}

  return {
    durativeAspectCompositionFallback, perfectiveResultCompositionFallback,
    restorativeRepetitiveComplementFallback, incompatibleAspectCompositionMalformedCandidate,
  };
};
