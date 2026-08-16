#!/usr/bin/env python3
from pathlib import Path

p = Path(__file__).resolve().parents[1] / "tools/lexical-ingestion-tokenization-audit.js"
text = p.read_text(encoding="utf-8")
old = '''    if (spec.require_functional_runtime_coverage) {
      if (!bareTokens.length) {
        functionalCoverageGaps.push({ rank, surface, reason: "no_runtime_tokens" });
      } else {
        const unreadable = bareTokens.filter((token) => !tokenHasRequiredReading(token));
        if (unreadable.length) {
          functionalCoverageGaps.push({
            rank,
            surface,
            reason: "unreadable_runtime_token",
            tokens: unreadable.slice(0, 8).map((token) => ({ surface: token.surface, jyutping: token.jyutping || "" })),
          });
        } else {
          functionalCoverageModes[entry ? "exact" : "compositional"] += 1;
        }
      }
    }
'''
new = '''    if (spec.require_functional_runtime_coverage) {
      const exactCoverage = entry ? runtimeJyutpingCoverage(entry, surfaceAnalyses) : { covered: false };
      if (entry && exactCoverage.covered) {
        // Exact lexical authority is already functionally readable. Productive
        // internal decomposition may expose lower-level components without their
        // own readings, but that does not make the exact lexical item unusable.
        functionalCoverageModes.exact += 1;
      } else if (!bareTokens.length) {
        functionalCoverageGaps.push({ rank, surface, reason: "no_runtime_tokens" });
      } else {
        const unreadable = bareTokens.filter((token) => !tokenHasRequiredReading(token));
        if (unreadable.length) {
          functionalCoverageGaps.push({
            rank,
            surface,
            reason: "unreadable_compositional_token",
            tokens: unreadable.slice(0, 8).map((token) => ({ surface: token.surface, jyutping: token.jyutping || "" })),
          });
        } else {
          functionalCoverageModes.compositional += 1;
        }
      }
    }
'''
if old not in text:
    raise SystemExit("functional coverage block anchor missing")
p.write_text(text.replace(old, new, 1), encoding="utf-8")
print("functional lexical audit semantics corrected")
