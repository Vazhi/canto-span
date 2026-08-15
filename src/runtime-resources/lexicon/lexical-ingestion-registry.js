"use strict";

function surfaceSet(values = []) {
  return new Set(values || []);
}

function neutralFrequencyCoverageEntry(entry = {}) {
  return String(entry.pos || "") === "lexical_item"
    && String(entry.syntax || "").split(/\s+/u).includes("lexical_item")
    && String(entry.note || "").includes("Exact surface retained as neutral lexical coverage");
}

function collectBlockedAtomicSurfaces(policyModules = []) {
  const surfaces = new Set();
  for (const policy of policyModules) {
    if (!policy || typeof policy !== "object") continue;
    for (const [key, value] of Object.entries(policy)) {
      if (/blocked.*atomic/i.test(key)) {
        if (value instanceof Set || Array.isArray(value)) {
          for (const surface of value) surfaces.add(surface);
        } else if (value && typeof value === "object") {
          for (const surface of Object.keys(value)) surfaces.add(surface);
        }
      }
      if (value && typeof value === "object" && !(value instanceof Set) && !Array.isArray(value)) {
        for (const [surface, disposition] of Object.entries(value)) {
          if (disposition === "blocked_atomic") surfaces.add(surface);
          if (disposition && typeof disposition === "object" && disposition.status === "blocked_atomic") surfaces.add(surface);
        }
      }
    }
  }
  return surfaces;
}

const cifuPolicyModules = Object.freeze([
  require("./token-lexicon/cifu-r1-250-reviewed"),
  require("./token-lexicon/cifu-r251-500-reviewed"),
  require("./token-lexicon/cifu-r501-750-reviewed"),
  require("./token-lexicon/cifu-r751-1000-reviewed"),
  require("./token-lexicon/cifu-r1001-1250-reviewed"),
  require("./token-lexicon/cifu-r1251-1500-reviewed"),
]);

const lexicalIngestions = Object.freeze([
  Object.freeze({
    id: "cifu-spoken-top-2000",
    source_file: "data/lexical-frequency/cifu-spoken-top-2000.tsv",
    delimiter: "\t",
    surface_column: "word",
    rank_column: "rank",
    source_jyutping_column: "cifu_jyutping",
    source_jyutping_unknown_values: Object.freeze(["", "-", "?", "*?"]),
    expected_rows: 2000,
    require_contiguous_ranks: true,
    require_exact_runtime_coverage: true,
    require_jyutping: true,
    carrier_prefixes: Object.freeze(["", "我"]),
    carrier_suffixes: Object.freeze(["", "呀"]),
    policy_modules: cifuPolicyModules,
    removed_surfaces: surfaceSet(["多少"]),
    contamination_ledger: "data/lexical-frequency/cifu-mandarin-contamination-runtime-audit.tsv",
  }),
]);

const blockedAtomicSurfaces = new Set();
const removedIngestionSurfaces = new Set();
for (const ingestion of lexicalIngestions) {
  for (const surface of collectBlockedAtomicSurfaces(ingestion.policy_modules)) blockedAtomicSurfaces.add(surface);
  for (const surface of ingestion.removed_surfaces || []) removedIngestionSurfaces.add(surface);
}

function blockedAtomicRuntimeDisposition(surface, tokenLexicon = {}, options = {}) {
  const blocked = options.blocked_surfaces || blockedAtomicSurfaces;
  const removed = options.removed_surfaces || removedIngestionSurfaces;
  if (!blocked.has(surface)) return "not_blocked";
  if (removed.has(surface)) return "removed_from_runtime";

  const entry = tokenLexicon[surface];
  if (!entry) return "promotion_only_no_runtime_entry";
  if (Array.from(String(surface || "")).length <= 1) return "promotion_only_single_character";
  if (neutralFrequencyCoverageEntry(entry)) return "force_compositional_neutral_fallback";
  return "promotion_only_independent_runtime_authority";
}

function ingestionForcedCompositionalSurfaces(tokenLexicon = {}) {
  return new Set([...blockedAtomicSurfaces].filter(
    (surface) => blockedAtomicRuntimeDisposition(surface, tokenLexicon) === "force_compositional_neutral_fallback"
  ));
}

module.exports = Object.freeze({
  lexicalIngestions,
  blockedAtomicSurfaces,
  removedIngestionSurfaces,
  neutralFrequencyCoverageEntry,
  collectBlockedAtomicSurfaces,
  blockedAtomicRuntimeDisposition,
  ingestionForcedCompositionalSurfaces,
});
