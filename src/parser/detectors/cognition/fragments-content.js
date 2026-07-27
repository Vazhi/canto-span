"use strict";

module.exports = function createCognitionDetectors(dependencies = {}) {
  const {
    aNotAQuestionFallback,
    applyConstructionPatterns,
    completionQuestionFallback,
    construction,
    desiderativeANotAQuestionFallback,
    flattenSurface,
    isToken,
    nodeCanFillSlot,
    nodeSurfaceMatches,
    optionalSubjectOffset,
    permissionANotAQuestionFallback,
    phase4CognitionActiveTokenClone,
    predicateOmissionProfileForHead,
    templateConstructionFor,
    templateDerivedSlots,
    token,
    traceInfo,
    withoutTrailingParticles,
    wrapCategorySubspans,
  } = dependencies;

function negativeCognitionFragmentFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);

  let negator = null;
  let predicate = null;

  if (bareCore.length === 2 && nodeCanFillSlot(bareCore[0], "negator") && nodeCanFillSlot(bareCore[1], "cognition_predicate")) {
    negator = bareCore[0];
    predicate = bareCore[1];
  } else if (bareCore.length === 1 && flattenSurface(bareCore[0]) === "唔知") {
    // Legacy safety path: even if an older lexicalized 唔知 token reaches this
    // fallback, expose the learner-facing negator separately so 唔 stays func.
    negator = token("唔");
    predicate = token("知");
  } else {
    return null;
  }

  if (!nodeCanFillSlot(negator, "negator")) return null;
  if (!nodeCanFillSlot(predicate, "cognition_predicate")) return null;

  const promoted = phase4CognitionActiveTokenClone(predicate, {
    label: predicate.label || "doing",
    syntax: `${predicate.syntax || "cognition_verb"} negative_cognition_predicate`,
    slots: ["negative_cognition_predicate", "negative_cognition_fragment"],
    reason: "Phase 4 controlled grammar promotion: 知 is parser-active only inside the reviewed 唔知 negative-cognition fragment; 唔 remains a learner-visible func negator.",
  });
  const children = [negator, promoted, ...particles];
  return construction("NegativeCognitionFragment", "NegCognition", children, {
    note: "Phase 4 controlled negative cognition fragment: 唔 + 知 as a stable short answer / learner fragment, with 唔 kept as func.",
    slots: templateDerivedSlots("NegativeCognitionFragment", children),
    trace: traceInfo("phase4_controlled_grammar_promotion", {
      rule: "negator + cognition_predicate + particle?",
      reason: "Promote only reviewed 唔知-style negative cognition fragments. The negator remains a learner-visible func token; this does not promote general cognition, speech, or stance domains.",
      surfaces: children.map((node) => flattenSurface(node)),
    })
  });
}

function cognitionStatementFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  if (bareCore.length !== 2) return null;
  const subject = bareCore[0];
  const predicate = bareCore[1];
  if (!nodeCanFillSlot(subject, "subject")) return null;
  if (!nodeCanFillSlot(predicate, "cognition_predicate")) return null;
  if (nodeCanFillSlot(predicate, "negative_cognition_predicate")) return null;
  if (nodeCanFillSlot(predicate, "stance_predicate")) return null;
  const promoted = phase4CognitionActiveTokenClone(predicate, {
    label: predicate.label || "doing",
    syntax: `${predicate.syntax || "cognition_verb"} cognition_statement_predicate`,
    slots: ["cognition_statement_clause"],
    reason: "Phase 4 controlled grammar promotion: bare subject + 知 is parser-active as a reviewed cognition statement, not a broad cognition-content frame.",
  });
  const children = [subject, promoted, ...particles];
  return construction("CognitionStatementClause", "Know", children, {
    note: "Phase 4 controlled cognition statement: subject + 知 + optional particle.",
    slots: templateDerivedSlots("CognitionStatementClause", children),
    trace: traceInfo("phase4_controlled_grammar_promotion", {
      rule: "subject + non_stance_cognition_predicate + particle?",
      reason: "Promote only reviewed bare cognition statements such as 我知 / 我知呀. Content frames still require visible clause-like content, and desiderative 我想知 remains separate.",
      predicate_omission_profile: "factive_cognition",
      omission_status: "conventional_bare_statement",
      complement_type: "proposition_or_interrogative_clause",
      conventionality_status: "conventional_bare_statement",
      polarity: "positive",
      speech_event_use: "not_applicable",
      not_claims: ["not_fabricated_content_clause", "not_forced_fragment_answer"],
      surfaces: children.map((node) => flattenSurface(node)),
    })
  });
}

function cognitionContentFrameFallback(core) {
  let cursor = optionalSubjectOffset(core);
  const subjectNodes = core.slice(0, cursor);
  const negator = isToken(core[cursor], "唔") ? core[cursor++] : null;
  if (core.length - cursor < 2) return null;

  const cognition = core[cursor];
  if (!nodeCanFillSlot(cognition, "cognition_predicate")) return null;
  if (nodeCanFillSlot(cognition, "negative_cognition_predicate")) return null;
  if (nodeCanFillSlot(cognition, "stance_predicate")) return null;
  if (nodeCanFillSlot(cognition, "vp_complement_predicate") && !nodeSurfaceMatches(cognition, ["知"])) return null;

  const rawContent = core.slice(cursor + 1);
  const { core: contentCore, particles } = withoutTrailingParticles(rawContent);
  const directClauseRelationEdge = contentCore.length === 1
    && contentCore[0].kind === "construction"
    && contentCore[0].type === "ClauseRelationEdge"
    ? contentCore[0]
    : null;
  if (!directClauseRelationEdge && contentCore.length < 2) return null;

  // Preserve an embedded polar interrogative as one visible content construction
  // before ordinary VP/category wrapping can split its repeated predicate.
  const rawEmbeddedQuestion = directClauseRelationEdge ? null : (aNotAQuestionFallback(contentCore)
    || permissionANotAQuestionFallback(contentCore)
    || desiderativeANotAQuestionFallback(contentCore)
    || completionQuestionFallback(contentCore));
  const parsedContent = directClauseRelationEdge ? [directClauseRelationEdge] : (rawEmbeddedQuestion ? [rawEmbeddedQuestion] : applyConstructionPatterns(contentCore));
  const wrappedContent = parsedContent.length === 1 ? parsedContent : wrapCategorySubspans(contentCore);
  let contentNode = directClauseRelationEdge;

  if (!contentNode && (
    wrappedContent.length === 1 &&
    wrappedContent[0].kind === "construction" &&
    (nodeCanFillSlot(wrappedContent[0], "reported_content") || nodeCanFillSlot(wrappedContent[0], "clause") || nodeCanFillSlot(wrappedContent[0], "vp") || nodeCanFillSlot(wrappedContent[0], "predicate") || nodeCanFillSlot(wrappedContent[0], "question_fragment"))
  )) {
    contentNode = wrappedContent[0];
  } else if (!contentNode) {
    const generatedContent = templateConstructionFor(wrappedContent, [
      "ANotAQuestion",
      "OpinionStanceFrame",
      "ReportedSpeech",
      "ExistentialClause",
      "NegatedExistentialClause",
      "ExistentialQuestion",
      "DesiderativeVP",
      "ModalVP",
      "CompletionQuestion"
    ]);
    if (generatedContent && (nodeCanFillSlot(generatedContent, "reported_content") || nodeCanFillSlot(generatedContent, "clause") || nodeCanFillSlot(generatedContent, "vp") || nodeCanFillSlot(generatedContent, "predicate") || nodeCanFillSlot(generatedContent, "question_fragment"))) contentNode = generatedContent;
  }

  if (!contentNode) return null;

  const promotedCognition = phase4CognitionActiveTokenClone(cognition, {
    label: cognition.label || "doing",
    syntax: `${cognition.syntax || "cognition_verb"} non_stance_cognition_predicate`,
    slots: ["non_stance_cognition_predicate"],
    reason: "A1 broad cognition architecture: a 知-type predicate is parser-active when it licenses a visible declarative or interrogative content complement.",
  });
  const children = [...subjectNodes, ...(negator ? [negator] : []), promotedCognition, contentNode, ...particles];
  const profile = predicateOmissionProfileForHead(flattenSurface(cognition));
  return construction("CognitionContentFrame", "Know+Content", children, {
    note: "Cognition content frame with visible polarity and a transparent declarative or interrogative complement.",
    slots: templateDerivedSlots("CognitionContentFrame", children),
    trace: traceInfo("phase4_controlled_grammar_promotion", {
      rule: "subject? + polarity? + non_stance_cognition_predicate + content_clause + particle?",
      reason: "The content remains an overt child construction. Negative polarity composes outside the cognition head, and embedded A-not-A content is not flattened into multiple roots.",
      content_construction: contentNode.type,
      predicate_omission_profile: profile ? profile.id : "factive_cognition",
      omission_status: "overt_content_saturated",
      complement_type: contentNode.type && String(contentNode.type).includes("Question") ? "interrogative_clause" : "proposition",
      conventionality_status: "overt_content",
      polarity: negator ? "negative" : "positive",
      speech_event_use: "not_applicable",
      surfaces: children.map((node) => flattenSurface(node)),
      not_claims: ["not_hidden_content_clause", "not_stance_frame", "not_reported_speech"],
    })
  });
}


  return {
    cognitionContentFrameFallback,
    cognitionStatementFallback,
    negativeCognitionFragmentFallback,
  };
};
