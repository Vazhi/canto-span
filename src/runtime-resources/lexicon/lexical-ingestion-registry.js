"use strict";

function surfaceSet(values = []) {
  return new Set(values || []);
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
for (const ingestion of lexicalIngestions) {
  for (const surface of collectBlockedAtomicSurfaces(ingestion.policy_modules)) blockedAtomicSurfaces.add(surface);
}

module.exports = Object.freeze({
  lexicalIngestions,
  blockedAtomicSurfaces,
  collectBlockedAtomicSurfaces,
});
