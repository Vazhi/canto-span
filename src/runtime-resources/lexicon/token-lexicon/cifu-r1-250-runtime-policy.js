"use strict";

const reviewed = require("./cifu-r1-250-reviewed");
const candidateDefaults = require("./cifu-r1-250-candidate-defaults");

const SOURCE = "#792 runtime-default reconciliation after exact-head v0.5.230 validation";

// The adjudication source records lexical possibilities. Runtime default policy is
// narrower: adding a supported alternative must not silently replace an already
// valid typed default, and a genuinely polyfunctional form may need a neutral
// default so productive component structure remains available.
const PRESERVE_TYPED_DEFAULT_SURFACES = new Set(["唔係"]);
const NEUTRAL_POLYFUNCTIONAL_DEFAULT_SURFACES = new Set(["成"]);

const EFFECTIVE_PROMOTIONS = Object.freeze(Object.fromEntries(
  Object.entries(reviewed.PROMOTIONS).filter(([surface]) => !NEUTRAL_POLYFUNCTIONAL_DEFAULT_SURFACES.has(surface))
));

const EFFECTIVE_CANDIDATE_ONLY_SURFACES = new Set([
  ...[...reviewed.CANDIDATE_ONLY_SURFACES].filter((surface) => !PRESERVE_TYPED_DEFAULT_SURFACES.has(surface)),
  ...NEUTRAL_POLYFUNCTIONAL_DEFAULT_SURFACES,
]);

function freezeAnalysis(row, overrides = {}) {
  return Object.freeze({
    ...row,
    ...overrides,
    senses: Object.freeze((overrides.senses || row.senses || []).map((sense) => Object.freeze({ ...sense }))),
    provenance: Object.freeze({ ...(overrides.provenance || row.provenance || {}) }),
  });
}

function neutralDefault(surface, jyutping = "", note = "") {
  return Object.freeze({
    id: `lex:${surface}:default`,
    label: "lex",
    pos: "lexical_item",
    jyutping,
    syntax: "lexical_item",
    senses: Object.freeze([{ gloss: note || "neutral default retained while reviewed alternatives remain available" }]),
    provenance: Object.freeze({
      kind: "reviewed_runtime_default_policy",
      source: SOURCE,
      status: "neutral_default_preserved",
    }),
  });
}

const rawSingAnalyses = reviewed.EXPLICIT_ANALYSES["成"] || [];
const singAlternatives = rawSingAnalyses.map((row) => row.id === "lex:成:default"
  ? freezeAnalysis(row, {
      id: "lex:成:success_completion_verb",
      provenance: {
        ...(row.provenance || {}),
        runtime_default_status: "reviewed_alternative_not_global_default",
      },
    })
  : row);

const mHaiOtherwise = candidateDefaults.CANDIDATE_ANALYSES["唔係"] && candidateDefaults.CANDIDATE_ANALYSES["唔係"][0];

const EXPLICIT_ANALYSIS_OVERRIDES = Object.freeze({
  "唔係": Object.freeze([
    Object.freeze({
      id: "lex:唔係:default",
      label: "func",
      pos: "",
      jyutping: "m4 hai6",
      syntax: "negated_copula",
      senses: Object.freeze([{ gloss: "not be; ordinary negative-copular default remains compositionally available" }]),
      provenance: Object.freeze({
        kind: "existing_typed_runtime_default_preserved",
        source: "function-words-and-particles.js plus #792 final correction",
      }),
    }),
    ...(mHaiOtherwise ? [mHaiOtherwise] : []),
  ]),
  "成": Object.freeze([
    neutralDefault("成", "", "neutral exact-surface default; preserve 成個 and other productive composition while exposing reviewed lexical/function families"),
    ...singAlternatives,
  ]),
});

function applyRuntimePolicy(entries) {
  if (!Array.isArray(entries)) throw new TypeError("ranks 1–250 runtime policy requires an entry array");
  const baseline = new Map(entries);
  const adjudicated = reviewed.applyReviewedEntries(entries);

  return adjudicated.map(([surface, entry]) => {
    const prior = baseline.get(surface) || entry;

    if (PRESERVE_TYPED_DEFAULT_SURFACES.has(surface) && !reviewed.isNeutralFrequencyFallback(prior)) {
      return [surface, prior];
    }

    if (NEUTRAL_POLYFUNCTIONAL_DEFAULT_SURFACES.has(surface)) {
      return [surface, {
        ...prior,
        label: "lex",
        pos: "lexical_item",
        syntax: "lexical_item",
        note: `${prior.note || "Exact surface retained as neutral lexical coverage."} Reviewed #792 runtime policy: polyfunctional analyses remain alternatives and do not replace the neutral default.`,
        provenance: {
          kind: "reviewed_runtime_default_policy",
          source: SOURCE,
          status: "neutral_polyfunctional_default_preserved",
          prior_provenance: prior.provenance || null,
        },
      }];
    }

    return [surface, entry];
  });
}

module.exports = Object.freeze({
  SOURCE,
  PRESERVE_TYPED_DEFAULT_SURFACES,
  NEUTRAL_POLYFUNCTIONAL_DEFAULT_SURFACES,
  EFFECTIVE_PROMOTIONS,
  EFFECTIVE_CANDIDATE_ONLY_SURFACES,
  EXPLICIT_ANALYSIS_OVERRIDES,
  applyRuntimePolicy,
});
