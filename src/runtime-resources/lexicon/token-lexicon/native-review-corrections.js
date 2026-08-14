"use strict";

const { EXPLICIT_ANALYSES: REVIEWED_R1_250_ANALYSES } = require("./cifu-r1-250-reviewed");

const SOURCE = "Guangzhou-native project reviewer correction recorded on issue #849 comment 5289764400 (2026-08-14)";

const KAAK_SURFACE = "喀";
const KAAK_DEFAULT_JYUTPING = "haak1";

const EXPLICIT_ANALYSES = Object.freeze({
  [KAAK_SURFACE]: Object.freeze(
    REVIEWED_R1_250_ANALYSES[KAAK_SURFACE]
      .filter((row) => row.id !== "lex:喀:kak1_bound")
      .map((row, index) => index === 0
        ? Object.freeze({
          ...row,
          jyutping: KAAK_DEFAULT_JYUTPING,
          provenance: Object.freeze({
            kind: "native_speaker_pronunciation_correction",
            source: SOURCE,
            scope: "default_runtime_pronunciation_only",
          }),
        })
        : row)
  ),
});

function applyNativeReviewCorrections(entries) {
  if (!Array.isArray(entries)) throw new TypeError("native lexical corrections require an entry array");
  return entries.map(([surface, entry]) => {
    if (surface !== KAAK_SURFACE) return [surface, entry];
    return [surface, {
      ...entry,
      jyutping: KAAK_DEFAULT_JYUTPING,
      note: `${entry.note || ""} Native Guangzhou reviewer correction: default pronunciation haak1.`.trim(),
      provenance: {
        kind: "native_speaker_pronunciation_correction",
        source: SOURCE,
        scope: "default_runtime_pronunciation_only",
        prior_provenance: entry.provenance || null,
      },
    }];
  });
}

module.exports = Object.freeze({
  SOURCE,
  KAAK_SURFACE,
  KAAK_DEFAULT_JYUTPING,
  EXPLICIT_ANALYSES,
  applyNativeReviewCorrections,
});
