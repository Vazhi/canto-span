"use strict";

module.exports = function createReportedSpeechDetectors(dependencies = {}) {
  const {
    applyConstructionPatterns,
    construction,
    firstToken,
    flattenSurface,
    nodeCanFillSlot,
    optionalSubjectOffset,
    parserInactiveTokenClone,
    phase4ReportedSpeechActiveTokenClone,
    subjectStativePredicateClauseFallback,
    templateConstructionFor,
    templateDerivedSlots,
    traceInfo,
    withoutTrailingParticles,
    wrapCategorySubspans,
  } = dependencies;

function contentNodeForReportedSpeech(contentCore) {
  if (!contentCore.length) return null;
  if (contentCore.length === 1 && contentCore[0].kind === "construction" && contentCore[0].type === "ClauseRelationEdge") {
    return contentCore[0];
  }

  // Preserve accepted short reported predicates before standalone fragment wrapping.
  // In 佢話有 / 佢話冇, the visible predicate is reported content inside the
  // speech frame, not a standalone discourse-response fragment.
  if (contentCore.length === 1 && contentCore[0].kind === "token") {
    const contentToken = contentCore[0];
    if (
      ["有", "冇"].includes(flattenSurface(contentToken)) &&
      (nodeCanFillSlot(contentToken, "existential") || nodeCanFillSlot(contentToken, "negated_existential"))
    ) {
      return parserInactiveTokenClone(contentToken, {
        label: contentToken.label || contentToken.role || "func",
        syntax: `${contentToken.syntax || "predicate"} reported_content_predicate`,
        slots: [...(contentToken.slots || []), "reported_content", "predicate"],
        reason: "A visible short predicate is functioning as the reported content of 話; no standalone response-fragment reading or hidden clause is introduced.",
      });
    }
  }

  // Parse the reported span independently before trying narrower content templates.
  // This lets ordinary clauses such as 佢唔嚟 and 我食飯 remain transparent
  // SubjectPredicateClause children instead of falling through to a surface rule.
  const parsedContent = applyConstructionPatterns(contentCore);
  const wrappedContent = parsedContent.length === 1 ? parsedContent : wrapCategorySubspans(contentCore);

  const subjectStative = subjectStativePredicateClauseFallback(wrappedContent);
  if (subjectStative) return subjectStative;

  if (
    wrappedContent.length === 1 &&
    wrappedContent[0].kind === "construction" &&
    (
      nodeCanFillSlot(wrappedContent[0], "reported_content") ||
      nodeCanFillSlot(wrappedContent[0], "clause") ||
      nodeCanFillSlot(wrappedContent[0], "vp") ||
      nodeCanFillSlot(wrappedContent[0], "predicate")
    )
  ) {
    return wrappedContent[0];
  }

  // A short lexical predicate can itself be quoted or reported (e.g. 佢話有 / 佢話冇).
  // Keep the original learner role and reading, but expose its reported-content function
  // as a parser-inactive construction-internal clone.
  if (wrappedContent.length === 1 && wrappedContent[0].kind === "token") {
    const contentToken = wrappedContent[0];
    if (
      nodeCanFillSlot(contentToken, "predicate") ||
      nodeCanFillSlot(contentToken, "existential") ||
      nodeCanFillSlot(contentToken, "negated_existential") ||
      nodeCanFillSlot(contentToken, "vp") ||
      nodeCanFillSlot(contentToken, "clause")
    ) {
      return parserInactiveTokenClone(contentToken, {
        label: contentToken.label || contentToken.role || "func",
        syntax: `${contentToken.syntax || "predicate"} reported_content_predicate`,
        slots: [...(contentToken.slots || []), "reported_content", "predicate"],
        reason: "A visible short predicate is functioning as the reported content of 話; no hidden clause or lexicalized whole-sentence formula is introduced.",
      });
    }
  }

  const generatedContent = templateConstructionFor(wrappedContent, [
    "CognitionContentFrame",
    "OpinionStanceFrame",
    "ExistentialClause",
    "NegatedExistentialClause",
    "DesiderativeVP",
    "ModalVP",
    "CompletionQuestion"
  ]);
  if (generatedContent && (
    nodeCanFillSlot(generatedContent, "reported_content") ||
    nodeCanFillSlot(generatedContent, "clause") ||
    nodeCanFillSlot(generatedContent, "vp") ||
    nodeCanFillSlot(generatedContent, "predicate")
  )) return generatedContent;

  return null;
}

function reportedSpeechFrameFallback(core) {
  const { core: bareCore, particles } = withoutTrailingParticles(core);
  const offset = optionalSubjectOffset(bareCore);
  if (bareCore.length - offset < 2) return null;

  const speechVerb = bareCore[offset];
  const speechToken = firstToken(speechVerb);
  if (!speechToken || speechToken.surface !== "話") return null;
  if (!nodeCanFillSlot(speechVerb, "speech_verb")) return null;

  const contentNode = contentNodeForReportedSpeech(bareCore.slice(offset + 1));
  if (!contentNode) return null;

  const promotedSpeech = phase4ReportedSpeechActiveTokenClone(speechVerb, {
    label: speechVerb.label || "doing",
    syntax: `${speechToken.syntax || "speech_reporting_verb"} reported_speech_predicate`,
    slots: ["reported_speech"],
    reason: "Phase 4 controlled grammar promotion: 話 is parser-active only when it introduces a visible reviewed reported-content frame.",
  });

  const children = [
    ...bareCore.slice(0, offset),
    promotedSpeech,
    contentNode,
    ...particles,
  ];

  const assignedSlots = [
    ...bareCore.slice(0, offset).map(() => "subject"),
    "speech_verb",
    "reported_content",
    ...particles.map(() => "particle"),
  ];

  return construction("ReportedSpeech", "Reported", children, {
    note: "Reported speech frame: optional subject + speech-reporting verb + visible reviewed reported content.",
    slots: templateDerivedSlots("ReportedSpeech", children),
    trace: traceInfo("generative_template", {
      construction_type: "ReportedSpeech",
      template_family: "generative_template",
      template: ["subject?", "speech_verb!", "reported_content!", "particle?"],
      constraints: {
        visible_reviewed_content: true,
        speech_verb_surfaces: ["話"],
      },
      assigned_slots: assignedSlots,
      content_construction: contentNode.type,
      attached_particles: particles.map((node) => flattenSurface(node)),
      surfaces: children.map((node) => flattenSurface(node)),
      reason: "The frame is now reported as a named reusable generative template; the controlled parser-active speech predicate remains scoped to this approved construction.",
    })
  });
}

  return { reportedSpeechFrameFallback };
};
