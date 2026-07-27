"use strict";

module.exports = function createNodeShapePrimitives(dependencies = {}) {
  const { bundleCanFillStativeSlot } = dependencies;

  function traceInfo(kind, detail = {}) {
    return { kind, ...detail };
  }
  function traceKind(node) {
    return node && node.trace && node.trace.kind ? node.trace.kind : "unspecified";
  }
  function isSurfaceSpecificTrace(node) {
    const kind = traceKind(node);
    return [
      "surface_rule",
      "surface_specific_phrase_rule",
      "protected_formula_table",
      "legacy_surface_rule",
      "special_ambiguity_rule",
    ].includes(kind);
  }
  function sameNodeSequence(a, b) {
    return a.length === b.length && a.every((node, index) => node === b[index]);
  }
  function phraseMatch(length, node) {
    return { length, node };
  }
  function flattenSurface(node) {
    if (!node) return "";
    if (node.kind === "token") return node.surface;
    if (node.kind === "text") return node.text;
    if (node.kind === "construction") return node.children.map(flattenSurface).join("");
    return "";
  }
  function flattenDisplaySurface(node) {
    if (!node) return "";
    if (node.kind === "token") return node.display_surface || node.surface;
    if (node.kind === "text") return node.display_text || node.text;
    if (node.kind === "construction") return node.children.map(flattenDisplaySurface).join("");
    return "";
  }
  function firstToken(node) {
    if (!node) return null;
    if (node.kind === "token") return node;
    if (node.kind === "construction") {
      for (const child of node.children) {
        const found = firstToken(child);
        if (found) return found;
      }
    }
    return null;
  }
  function lastToken(node) {
    if (!node) return null;
    if (node.kind === "token") return node;
    if (node.kind === "construction") {
      for (let i = node.children.length - 1; i >= 0; i--) {
        const found = lastToken(node.children[i]);
        if (found) return found;
      }
    }
    return null;
  }
  function isToken(node, surface) {
    return node && node.kind === "token" && node.surface === surface;
  }
  function isVerbLike(node) {
    const t = firstToken(node);
    return Boolean(t && (t.label === "doing" || t.syntax.includes("verb")));
  }
  function isObjectLike(node) {
    const t = firstToken(node);
    return Boolean(t && ["what", "where", "who"].includes(t.label));
  }
  function isProductiveVo(node) {
    return node && node.kind === "construction" && node.type === "ProductiveVO";
  }
  function isModalToken(node) {
    return node && node.kind === "token" && ["想", "要", "可以", "會", "識", "使", "唔使", "可唔可以"].includes(node.surface);
  }
  function isParticle(node) {
    return node && node.kind === "token" && node.label === "particle";
  }
  function isStativeToken(node) {
    if (!node || node.kind !== "token") return false;
    const bundleDecision = bundleCanFillStativeSlot(node, "stative_predicate");
    if (bundleDecision !== null) return bundleDecision;
    return node.label === "like" || node.syntax.includes("stative");
  }
  function isTopicCandidate(node) {
    return node && node.kind === "token" && ["呢個", "嗰個", "呢啲", "嗰啲", "呢間", "嗰間", "呢間餐廳", "嗰間餐廳"].includes(node.surface);
  }
  function surfaceOf(node) {
    const t = firstToken(node);
    return t ? t.surface : flattenSurface(node);
  }
  function hasSurface(nodes, surface) {
    return nodes.some((node) => surfaceOf(node) === surface || flattenSurface(node) === surface);
  }
  function indexOfSurface(nodes, surface) {
    return nodes.findIndex((node) => surfaceOf(node) === surface || flattenSurface(node) === surface);
  }
  function hasConstruction(nodes, type) {
    return nodes.some((node) => node && node.kind === "construction" && node.type === type);
  }

  return {
    traceInfo,
    traceKind,
    isSurfaceSpecificTrace,
    sameNodeSequence,
    phraseMatch,
    flattenSurface,
    flattenDisplaySurface,
    firstToken,
    lastToken,
    isToken,
    isVerbLike,
    isObjectLike,
    isProductiveVo,
    isModalToken,
    isParticle,
    isStativeToken,
    isTopicCandidate,
    surfaceOf,
    hasSurface,
    indexOfSurface,
    hasConstruction,
  };
};
