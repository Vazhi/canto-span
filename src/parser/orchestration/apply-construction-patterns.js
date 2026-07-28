"use strict";

module.exports = function createApplyConstructionPatterns(dependencies = {}) {
  const {
    isParticle,
    nodeSlots,
    priorityMarkerClauseWithTrailingParticle,
    serialVerbPurposeChainWithTrailingParticle,
    wrapCore,
  } = dependencies;

function withoutTrailingParticles(nodes) {
  let end = nodes.length;
  while (end > 0 && isParticle(nodes[end - 1])) end--;
  return { core: nodes.slice(0, end), particles: nodes.slice(end) };
}

function applyConstructionPatterns(nodes) {
  if (!nodes.length) return nodes;
  const { core, particles } = withoutTrailingParticles(nodes);

  // Prefer a full generative match that includes sentence-final particles
  // when the construction template licenses particle?.
  if (particles.length) {
    const withParticles = wrapCore([...core, ...particles]);
    if (withParticles.length === 1 && withParticles[0].kind === "construction") return withParticles;
  }

  const wrapped = wrapCore(core);
  if (particles.length && wrapped.length) {
    const last = wrapped[wrapped.length - 1];
    if (last && last.kind === "construction" && last.type === "PriorityMarkerClause") {
      return [
        ...wrapped.slice(0, -1),
        priorityMarkerClauseWithTrailingParticle(last, particles[0]),
        ...particles.slice(1),
      ];
    }
    if (last && last.kind === "construction" && ["SerialVerbPurposeChain", "MotionPurposeChain"].includes(last.type)) {
      return [
        ...wrapped.slice(0, -1),
        serialVerbPurposeChainWithTrailingParticle(last, particles[0]),
        ...particles.slice(1),
      ];
    }
  }
  return [...wrapped, ...particles];
}

function optionalSubjectOffset(core) {
  if (!core.length) return 0;
  const slots = nodeSlots(core[0]);
  return slots.includes("subject") ? 1 : 0;
}

  return {
    applyConstructionPatterns,
    optionalSubjectOffset,
    withoutTrailingParticles,
  };
};
