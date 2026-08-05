"use strict";

module.exports = function createApplyTerminalPatterns(dependencies = {}) {
  const {
    applyConstructionPatterns,
    boundedAcknowledgementRepetitionForPunctuation,
    connectorAwareClauseLinkingForTerminal,
    finalMePolarQuestionFallbackForPunctuation,
    hasSentencePunctuation,
    haveOrNotQuestionFallbackForPunctuation,
    orderedParticleClusterFallback,
    orderedParticleClusterInfo,
    relativeClauseNPForTerminal,
    repeatedNegatedExistentialResponseForPunctuation,
    restrictiveFocusParticleFallback,
    scalarDimensionQuestionFallbackForPunctuation,
    scopedChangeStateParticleFallback,
    scopedDirectiveClosureParticleFallback,
    scopedEpistemicDiscourseParticleFallback,
    scopedEvidentialDiscourseParticleFallback,
    standaloneClauseRelationEdgeFragmentForTerminal,
    wrapClauseSequenceByPunctuation,
  } = dependencies;

function terminalSurface(node) {
  if (!node) return "";
  if (node.kind === "token") return String(node.surface || node.parser_surface || "");
  if (node.kind === "text") return String(node.text || "");
  if (node.kind === "construction") return (node.children || []).map(terminalSurface).join("");
  return "";
}

function constructionTypePresent(nodes, expectedType) {
  return (nodes || []).some((node) => {
    if (!node || typeof node !== "object") return false;
    if (node.kind === "construction" && node.type === expectedType) return true;
    return constructionTypePresent(node.children, expectedType);
  });
}

function withCopularANotATerminalQuestionSurface(nodes, terminalText = "") {
  if (!/[？?]/u.test(String(terminalText || ""))) return nodes;
  if (!Array.isArray(nodes) || nodes.length !== 1) return nodes;
  const [node] = nodes;
  if (!node || node.kind !== "construction" || node.type !== "CopularANotAQuestion") return nodes;
  const punctuationNode = {
    kind: "text",
    text: terminalText,
    trace: { kind: "punctuation_or_plain_text", surface: terminalText },
  };
  return [{
    ...node,
    children: [...(node.children || []), punctuationNode],
    trace: {
      ...(node.trace || {}),
      terminal_question_punctuation_preserved: true,
    },
  }];
}

function locativeWhQuestionForTerminal(segment, terminalText = "", ordinaryWrapped = null) {
  if (!/[？?]/u.test(String(terminalText || "")) || !segment || !segment.length) return null;
  const surface = segment.map(terminalSurface).join("");
  if (!surface.includes("邊度")) return null;

  const wrapped = ordinaryWrapped || applyConstructionPatterns(segment);
  if (constructionTypePresent(wrapped, "LocativeWhQuestion")) return null;
  if (constructionTypePresent(wrapped, "NeedsContext")) return null;

  const bareSurface = surface.replace(/[呀啊㗎呢嚹喎啦唧吖嘛嘅啫囉掛]+$/u, "");
  const whIndex = bareSurface.indexOf("邊度");
  const prefix = bareSurface.slice(0, whIndex);
  if (/(?:知唔知|唔知|知道|問|諗緊)/u.test(prefix)) return null;
  if (/邊度都/u.test(bareSurface) || /邊度會/u.test(bareSurface) || /邊度.*得晒/u.test(bareSurface)) return null;

  const bareMotionGoalFragment = bareSurface === "去邊度";
  const independentlyTypedMotion = [
    "MotionGoalVP",
    "ExperientialMotionGoalVP",
    "MotionPurposeChain",
    "DirectionalMotionVP",
  ].some((type) => constructionTypePresent(wrapped, type));
  if (independentlyTypedMotion && !bareMotionGoalFragment) return null;

  const children = wrapped && wrapped.length ? wrapped : segment;
  const parserSurface = children.map(terminalSurface).join("");
  return {
    kind: "construction",
    type: "LocativeWhQuestion",
    compatibility_alias: "",
    internal_representation_scope: "",
    internal_only: false,
    label: "WhereQ",
    children,
    display_surface: parserSurface,
    parser_surface: parserSurface,
    primary: "",
    note: "Matrix locative wh-question licensed by overt 邊度 plus independently marked question force.",
    slots: ["question_fragment", "location_question", "location", "predicate", "vp", "clause"],
    trace: {
      kind: "terminal_question_force",
      construction_type: "LocativeWhQuestion",
      template_family: "punctuation_licensed_wrapper",
      overt_wh_place: "邊度",
      question_force_source: "terminal_question_punctuation",
      semantic_role_source: "overt_typed_children",
      wrapper_scope: "matrix_clause_or_fragment",
      rule: "matrix interrogative clause/fragment + overt 邊度",
      reason: "AA82 attested boundary packet R1 adds the compatibility wrapper only after ordinary typed composition and preserves embedded, rhetorical, indefinite, motion/aspect, and fragment boundaries.",
      surfaces: children.map(terminalSurface),
    },
  };
}

function applyConstructionPatternsForTerminal(segment, terminalText = "") {
  const haveOrNotQuestion = haveOrNotQuestionFallbackForPunctuation(segment, terminalText);
  if (haveOrNotQuestion) return [haveOrNotQuestion];
  const scalarQuestion = scalarDimensionQuestionFallbackForPunctuation(segment, terminalText);
  if (scalarQuestion) return [scalarQuestion];
  const relationFragment = standaloneClauseRelationEdgeFragmentForTerminal(segment, terminalText);
  if (relationFragment) return [relationFragment];
  const relativeClauseNP = relativeClauseNPForTerminal(segment);
  if (relativeClauseNP) return [relativeClauseNP];
  const connectorLinked = connectorAwareClauseLinkingForTerminal(segment);
  if (connectorLinked) return connectorLinked;
  const ordinaryWrapped = applyConstructionPatterns(segment);
  const terminalAwareOrdinaryWrapped = withCopularANotATerminalQuestionSurface(ordinaryWrapped, terminalText);
  const locativeWhQuestion = locativeWhQuestionForTerminal(segment, terminalText, ordinaryWrapped);
  if (locativeWhQuestion) return [locativeWhQuestion];
  const particleClusterInfo = orderedParticleClusterInfo(segment, terminalText);
  if (particleClusterInfo && !particleClusterInfo.supportedOrder) return terminalAwareOrdinaryWrapped;
  const orderedParticleCluster = orderedParticleClusterFallback(segment, terminalText, particleClusterInfo);
  if (orderedParticleCluster) return [orderedParticleCluster];
  const restrictiveFocusParticle = restrictiveFocusParticleFallback(segment, terminalText, ordinaryWrapped);
  if (restrictiveFocusParticle) return [restrictiveFocusParticle];
  const scopedDirectiveParticle = scopedDirectiveClosureParticleFallback(segment, terminalText, ordinaryWrapped);
  if (scopedDirectiveParticle) return [scopedDirectiveParticle];
  const scopedChangeStateParticle = scopedChangeStateParticleFallback(segment, terminalText, ordinaryWrapped);
  if (scopedChangeStateParticle) return [scopedChangeStateParticle];
  const scopedEvidentialParticle = scopedEvidentialDiscourseParticleFallback(segment, terminalText);
  if (scopedEvidentialParticle) return [scopedEvidentialParticle];
  const scopedEpistemicParticle = scopedEpistemicDiscourseParticleFallback(segment, terminalText);
  if (scopedEpistemicParticle) return [scopedEpistemicParticle];
  const finalMePolarQuestion = finalMePolarQuestionFallbackForPunctuation(segment, terminalText, ordinaryWrapped);
  if (finalMePolarQuestion) return [finalMePolarQuestion];
  return terminalAwareOrdinaryWrapped;
}

function applyConstructionPatternsByPunctuation(nodes) {
  const boundedAcknowledgementRepetition = boundedAcknowledgementRepetitionForPunctuation(nodes);
  if (boundedAcknowledgementRepetition) return boundedAcknowledgementRepetition;
  const repeatedNegatedExistentialResponse = repeatedNegatedExistentialResponseForPunctuation(nodes);
  if (repeatedNegatedExistentialResponse) return repeatedNegatedExistentialResponse;
  const rendered = [];
  let segment = [];
  const flush = (terminalText = "") => {
    if (segment.length) {
      rendered.push(...applyConstructionPatternsForTerminal(segment, terminalText));
      segment = [];
    }
  };

  for (const node of nodes) {
    if (node.kind === "text" && hasSentencePunctuation(node.text)) {
      const beforeFlushLength = rendered.length;
      flush(node.text);
      const terminalAbsorbed = rendered.length === beforeFlushLength + 1
        && rendered[beforeFlushLength]
        && rendered[beforeFlushLength].kind === "construction"
        && rendered[beforeFlushLength].trace
        && rendered[beforeFlushLength].trace.terminal_question_punctuation_preserved;
      if (!terminalAbsorbed) rendered.push(node);
    } else {
      segment.push(node);
    }
  }
  flush();
  return wrapClauseSequenceByPunctuation(rendered);
}

  return {
    applyConstructionPatternsByPunctuation,
    applyConstructionPatternsForTerminal,
  };
};
