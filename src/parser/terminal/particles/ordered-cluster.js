"use strict";

const {
  descriptors: ORDERED_PARTICLE_CLUSTER_DESCRIPTORS,
  sequenceEvidence: ORDERED_PARTICLE_CLUSTER_SEQUENCE_EVIDENCE,
} = require("../../../runtime-resources/grammar/ordered-particle-clusters");

module.exports = function createOrderedParticleClusters(dependencies = {}) {
  const {
    construction, flattenSurface, hasSentencePunctuation, parserInactiveTokenClone,
    propositionLikeHostForScopedDiscourseParticle, templateDerivedSlots, traceInfo,
    withoutIgnorableSpaceText,
  } = dependencies;

function orderedParticleClusterDescriptor(node) {
  const surface = flattenSurface(node);
  const descriptor = ORDERED_PARTICLE_CLUSTER_DESCRIPTORS[surface];
  return descriptor ? { surface, ...descriptor } : null;
}

function orderedParticleClusterMemberClone(node, descriptor) {
  return parserInactiveTokenClone(node, {
    label: "particle",
    pos: "particle",
    syntax: descriptor.syntax,
    slots: descriptor.slots,
    jyutping: descriptor.jyutping,
    note: descriptor.note,
    reason: `Within a visible sentence-final particle cluster, ${descriptor.surface} occupies the broad ${descriptor.layer} layer. The parser preserves the written token and does not infer a narrower tone-specific subtype.`,
  });
}

function orderedParticleClusterTailInfo(segment, terminalText = "") {
  const compact = withoutIgnorableSpaceText(segment || []).slice();
  while (compact.length && compact[compact.length - 1].kind === "text" && hasSentencePunctuation(compact[compact.length - 1].text)) compact.pop();
  if (compact.length < 2) return null;

  let clusterStart = compact.length;
  const reversedDescriptors = [];
  while (clusterStart > 0) {
    const descriptor = orderedParticleClusterDescriptor(compact[clusterStart - 1]);
    if (!descriptor) break;
    reversedDescriptors.push(descriptor);
    clusterStart -= 1;
  }
  const descriptors = reversedDescriptors.reverse();
  if (descriptors.length < 2) return null;

  const visibleParticleSequence = descriptors.map((descriptor) => descriptor.surface);
  const sequenceKey = visibleParticleSequence.join("");
  const ranks = descriptors.map((descriptor) => descriptor.rank);
  const strictlyIncreasing = ranks.every((rank, index) => index === 0 || ranks[index - 1] < rank);
  const questionLayerIsOutermost = descriptors.every((descriptor, index) => descriptor.surface !== "咩" || index === descriptors.length - 1);
  const questionPunctuationCompatible = !descriptors.some((descriptor) => descriptor.surface === "咩")
    || /[？?]/u.test(String(terminalText || ""));
  const layerOrderCompatible = strictlyIncreasing && questionLayerIsOutermost && questionPunctuationCompatible;
  const sequenceEvidence = layerOrderCompatible
    ? (ORDERED_PARTICLE_CLUSTER_SEQUENCE_EVIDENCE[sequenceKey] || null)
    : null;
  const supportedOrder = Boolean(sequenceEvidence);
  const orderStatus = supportedOrder
    ? sequenceEvidence.status
    : (layerOrderCompatible
      ? "layer_order_compatible_unvalidated_review"
      : "unsupported_or_unvalidated_order_review");

  return {
    compact,
    clusterStart,
    descriptors,
    sequenceKey,
    sequenceEvidence,
    supportedOrder,
    layerOrderCompatible,
    orderStatus,
    visibleParticleSequence,
    particleSequenceJyutping: descriptors.map((descriptor) => descriptor.jyutping),
    particleScopeLayers: descriptors.map((descriptor) => descriptor.layer),
    particleScopeFunctions: descriptors.map((descriptor) => descriptor.broad_function),
    fusionStatus: descriptors.some((descriptor) => descriptor.fusion_status.startsWith("surface_fused"))
      ? "surface_fused_particle_preserved_no_internal_split"
      : "separate_visible_particles",
  };
}

function orderedParticleClusterInfo(segment, terminalText = "") {
  const tailInfo = orderedParticleClusterTailInfo(segment, terminalText);
  if (!tailInfo || tailInfo.clusterStart < 1) return null;
  const host = propositionLikeHostForScopedDiscourseParticle(tailInfo.compact.slice(0, tailInfo.clusterStart));
  if (!host) return null;
  return {
    ...tailInfo,
    host,
  };
}

function orderedParticleClusterFallback(segment, terminalText = "", clusterInfo = null) {
  const info = clusterInfo || orderedParticleClusterInfo(segment, terminalText);
  if (!info || !info.supportedOrder) return null;
  const {
    compact,
    clusterStart,
    descriptors,
    host,
    visibleParticleSequence,
    particleSequenceJyutping,
    particleScopeLayers,
    particleScopeFunctions,
    fusionStatus,
  } = info;

  const particles = descriptors.map((descriptor, index) => (
    orderedParticleClusterMemberClone(compact[clusterStart + index], descriptor)
  ));
  const outerDescriptor = descriptors[descriptors.length - 1];
  const isQuestionCluster = outerDescriptor.surface === "咩";
  const type = isQuestionCluster ? "PolarQuestionFrame" : "DiscourseParticleFrame";
  const label = isQuestionCluster ? "YesNo?" : "Particles";
  const children = [host, ...particles];
  return construction(type, label, children, {
    note: isQuestionCluster
      ? "Biased polar question containing an ordered sentence-final particle cluster."
      : "Statement with an ordered sentence-final particle cluster.",
    slots: templateDerivedSlots(type, children),
    trace: traceInfo("generative_template", {
      construction_type: type,
      template_family: "generative_template",
      template: ["scope_host!", "cluster_particle+!"],
      assigned_slots: ["scope_host", "particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      particle_cluster: true,
      particle_cluster_root: true,
      particle_cluster_member_count: descriptors.length,
      visible_particle_sequence: visibleParticleSequence,
      particle_sequence_jyutping: particleSequenceJyutping,
      particle_scope_layers: particleScopeLayers,
      particle_scope_functions: particleScopeFunctions,
      outer_particle_surface: outerDescriptor.surface,
      outer_scope_layer: outerDescriptor.layer,
      outer_scope_function: outerDescriptor.broad_function,
      scope_direction: "inside_to_outside",
      surface_order_preserved: true,
      cluster_order_status: info.orderStatus,
      cluster_evidence_grade: info.sequenceEvidence ? info.sequenceEvidence.evidence_grade : "",
      cluster_evidence_note: info.sequenceEvidence ? info.sequenceEvidence.evidence_note : "",
      fusion_status: fusionStatus,
      tone_certainty: "broad_written_form_readings_only",
      host_construction: host.type,
      host_surface: flattenSurface(host),
      learner_display_structure: "single_cluster_frame_with_direct_particle_children",
      punctuation_hint: /[？?]/u.test(String(terminalText || "")) ? "question_marked" : "declarative_or_unmarked",
      context_requirement_status: "context_not_required",
      missing_argument_slots: [],
      antecedent_status: "not_applicable",
      not_claims: [
        "not_unordered_particle_bag",
        "not_hidden_particle_reordering",
        "not_internal_split_of_fused_surface_particle",
        "not_exact_tone_specific_interpretation",
        "not_repeated_generic_stance_layers",
      ],
      reason: `This exact visible particle sequence has current evidence-backed support and follows the broad layer order. One learner-visible frame keeps the proposition host and every particle transparent, while ordered trace metadata records inside-to-outside scope without repeating a generic construction layer for each particle.`,
    }),
  });
}

  return {
    orderedParticleClusterFallback,
    orderedParticleClusterInfo,
    orderedParticleClusterTailInfo,
  };
};
