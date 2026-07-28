"use strict";

const AGREEMENT_RESPONSE_PARTICLES = new Set(["呀", "啊", "喇"]);

module.exports = function createProtectedFormulaDetectors(dependencies = {}) {
  const {
    construction,
    flattenSurface,
    isParticle,
    isToken,
    parserInactiveTokenClone,
    traceInfo,
  } = dependencies;

  function agreementResponsePartClone(node, overrides = {}) {
    return parserInactiveTokenClone(node, {
      label: overrides.label || (isParticle(node) ? "particle" : "func"),
      pos: overrides.pos || (isParticle(node) ? "particle" : "function"),
      syntax: overrides.syntax || (isParticle(node) ? "sentence_final_particle" : "agreement_confirmation_marker"),
      slots: overrides.slots || (isParticle(node) ? ["particle"] : ["agreement_marker", "confirmation_marker"]),
      reason: overrides.reason || "Token is parser-inactive inside an agreement/confirmation response formula; the parent exposes the discourse-response function.",
    });
  }

  function makeAgreementResponseFormula(markerNode, particleNode) {
    const particleSurface = flattenSurface(particleNode);
    const children = [
      agreementResponsePartClone(markerNode, {
        label: "func",
        pos: "function",
        syntax: "agreement_confirmation_marker",
        slots: ["agreement_marker", "confirmation_marker"],
        reason: "係 is interpreted here only as an agreement/confirmation response marker, not as a broad copula-clause rule.",
      }),
      agreementResponsePartClone(particleNode, {
        label: "particle",
        pos: "particle",
        syntax: "sentence_final_particle acknowledgement_particle",
        slots: ["particle"],
        reason: `${particleSurface} stays parser-inactive inside the agreement/confirmation response formula.`,
      }),
    ];
    return construction("FormulaDiscourseUnit", "Formula", children, {
      slots: ["formula_discourse_unit", "formula", "discourse_response", "agreement_response", "confirmation_response"],
      note: "Agreement/confirmation response formula: 係 + an approved acknowledgement particle. The wrapper does not introduce a general copula-clause rule.",
      trace: traceInfo("generative_template", {
        construction_type: "FormulaDiscourseUnit",
        retired_label_alias: "AgreementResponseFormula",
        template: ["agreement_marker!", "particle!"],
        assigned_slots: ["agreement_marker", "particle"],
        rule: "agreement marker 係 + approved acknowledgement particle 呀/啊/喇",
        pattern: "agreement_marker + acknowledgement_particle",
        reason: "Short 係 + particle responses function as agreement/acknowledgement formulae. Keep both children visible and avoid broadening 係 into a general copula parser here.",
        surfaces: children.map((node) => flattenSurface(node)),
      }),
    });
  }

  function agreementResponsePatternAt(nodes, index) {
    if (!isToken(nodes[index], "係")) return null;
    if (!isParticle(nodes[index + 1])) return null;
    const particleSurface = flattenSurface(nodes[index + 1]);
    if (!AGREEMENT_RESPONSE_PARTICLES.has(particleSurface)) return null;
    return { length: 2, marker: nodes[index], particle: nodes[index + 1] };
  }

  function wrapAgreementResponseSubspans(nodes) {
    const result = [];
    let i = 0;
    while (i < nodes.length) {
      const match = agreementResponsePatternAt(nodes, i);
      if (match) {
        result.push(makeAgreementResponseFormula(match.marker, match.particle));
        i += match.length;
        continue;
      }
      result.push(nodes[i]);
      i += 1;
    }
    return result;
  }

  return {
    wrapAgreementResponseSubspans,
  };
};
