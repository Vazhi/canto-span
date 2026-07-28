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
  const particleClusterInfo = orderedParticleClusterInfo(segment, terminalText);
  if (particleClusterInfo && !particleClusterInfo.supportedOrder) return ordinaryWrapped;
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
  return ordinaryWrapped;
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
      flush(node.text);
      rendered.push(node);
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
