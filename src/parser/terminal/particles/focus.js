"use strict";

module.exports = function createTerminalFocusParticles(dependencies = {}) {
  const {
    applyConstructionPatterns, construction, flattenSurface, fullSpanSingleConstruction,
    isToken, nodeCanFillSlot, parserInactiveTokenClone, templateDerivedSlots, traceInfo,
    withoutIgnorableSpaceText,
  } = dependencies;

function restrictiveFocusHostHasUnresolvedClassifierHeadFusion(host) {
  if (!host || host.kind !== "construction" || host.type !== "QuantifiedClassifierNP") return false;
  const missingSlots = Array.isArray(host.trace && host.trace.missing_argument_slots)
    ? host.trace.missing_argument_slots
    : [];
  if (!missingSlots.includes("nominal_head")) return false;
  return (host.children || []).some((child) => {
    if (!child || child.kind !== "token" || !String(child.syntax || "").includes("classifier")) return false;
    const originalRole = String(child.trace && child.trace.original_role || "");
    return originalRole && originalRole !== "measure_word";
  });
}

function restrictiveScalarHostForFinalParticle(nodes) {
  const compact = withoutIgnorableSpaceText(nodes || []);
  if (!compact.length) return null;
  const wrapped = applyConstructionPatterns(compact);
  const host = fullSpanSingleConstruction(wrapped, compact);
  if (host && [
    "QuantifiedClassifierNP",
    "QuantifiedPersonNP",
    "QuantifiedTimeNP",
    "QuantityNP",
    "ApproximateQuantity",
    "DiMarkedNP",
  ].includes(host.type)) {
    if (restrictiveFocusHostHasUnresolvedClassifierHeadFusion(host)) return null;
    return host;
  }
  if (compact.length === 1) {
    const only = compact[0];
    const syntax = String(only && only.syntax || "");
    if (nodeCanFillSlot(only, "quantity") || /quantity|scalar|amount|degree/.test(syntax)) return only;
  }
  return null;
}

function restrictiveFocusMarkerClone(node) {
  return parserInactiveTokenClone(node, {
    label: "how",
    pos: "adverb",
    syntax: "restrictive_focus_adverb scalar_limiter",
    slots: ["focus_adverb", "restriction_marker", "scalar_limiter", "degree"],
    jyutping: "dak1",
    note: "only / just; limits the following amount or scalar host",
    reason: "Before a visible quantity or scalar host and final 啫/咋, 得 is the restrictive focus marker 'only', not the acceptability predicate 'okay/can'.",
  });
}

function restrictiveFocusParticleClone(node) {
  const surface = flattenSurface(node);
  const isZe = surface === "啫";
  return parserInactiveTokenClone(node, {
    label: "particle",
    pos: "particle",
    syntax: isZe
      ? "sentence_final_particle restrictive_focus_particle minimizing_particle"
      : "sentence_final_particle restrictive_focus_particle exhaustive_limit_particle",
    slots: ["particle", "restrictive_focus_particle", "focus_scope_particle"],
    jyutping: isZe ? "ze1" : "zaa3",
    note: isZe ? "only / just; minimizes the visible amount" : "only / that's all; presents the visible amount as the limit",
    reason: isZe
      ? "Final 啫 marks restrictive/minimizing focus over the visible scalar host."
      : "Final 咋 marks restrictive/exhaustive limitation over the visible scalar host.",
  });
}

function restrictiveFocusParticleFallback(segment, terminalText = "", ordinaryWrapped = null) {
  const compact = withoutIgnorableSpaceText(segment || []);
  if (compact.length < 3 || !isToken(compact[0], "得")) return null;
  const finalNode = compact[compact.length - 1];
  if (!isToken(finalNode, "啫") && !isToken(finalNode, "咋")) return null;
  if (fullSpanSingleConstruction(ordinaryWrapped, compact)) return null;
  const host = restrictiveScalarHostForFinalParticle(compact.slice(1, -1));
  if (!host) return null;
  const marker = restrictiveFocusMarkerClone(compact[0]);
  const particle = restrictiveFocusParticleClone(finalNode);
  const children = [marker, host, particle];
  const particleSurface = flattenSurface(particle);
  const hostTrace = host && host.kind === "construction" ? (host.trace || {}) : {};
  const inheritedMissingSlots = Array.isArray(hostTrace.missing_argument_slots)
    ? hostTrace.missing_argument_slots.slice()
    : [];
  const inheritedContextRequired = hostTrace.context_requirement_status === "context_required"
    || inheritedMissingSlots.length > 0;
  const inheritedAntecedentStatus = inheritedContextRequired
    ? (hostTrace.antecedent_status || "not_observed")
    : "not_applicable";
  return construction("FocusParticleFrame", "Focus", children, {
    note: "Restrictive focus frame: 得 limits a visible quantity or scalar host, and final 啫/咋 marks minimization or an exhaustive limit.",
    slots: templateDerivedSlots("FocusParticleFrame", children),
    trace: traceInfo("generative_template", {
      construction_type: "FocusParticleFrame",
      template_family: "generative_template",
      template: ["restriction_marker!", "scalar_host!", "restrictive_focus_particle!"],
      assigned_slots: ["restriction_marker", "scalar_host", "restrictive_focus_particle"],
      surfaces: children.map((node) => flattenSurface(node)),
      focus_relation: "scalar_restriction",
      broad_particle_class: "RestrictiveFocusParticle",
      particle_subtype: particleSurface === "啫" ? "restrictive_minimizing_ze1" : "restrictive_exhaustive_limit_zaa3",
      restriction_marker_surface: "得",
      scalar_host_construction: host.kind === "construction" ? host.type : "scalar_token",
      scalar_host_surface: flattenSurface(host),
      punctuation_hint: /[？?]/u.test(String(terminalText || "")) ? "question_marked_surface" : "declarative_or_unmarked",
      context_requirement_status: inheritedContextRequired ? "context_required" : "context_not_required",
      missing_argument_slots: inheritedMissingSlots,
      missing_slot_details: inheritedMissingSlots.map((slot) => ({ slot, license_status: "unresolved" })),
      antecedent_status: inheritedAntecedentStatus,
      discourse_license_not_observed: inheritedContextRequired && inheritedAntecedentStatus !== "linked",
      not_claims: [
        "not_acceptability_predicate_dak1",
        "not_bare_particle",
        "not_unrestricted_np",
        "not_fabricated_quantity",
        ...(inheritedMissingSlots.includes("nominal_head") ? ["not_fabricated_nominal_head"] : []),
        "not_exact_pragmatic_force_beyond_restriction",
      ],
      reason: inheritedContextRequired
        ? "The reusable 得 + scalar/quantity host + 啫/咋 pattern expresses restrictive focus, but the particle frame does not resolve discourse-dependent slots inherited from the scalar host."
        : "The reusable 得 + scalar/quantity host + 啫/咋 pattern expresses restrictive focus. The construction reassigns 得 from acceptability to a scalar limiter only when both the host and final restrictive particle are overt.",
    }),
  });
}

  return { restrictiveFocusParticleFallback };
};
