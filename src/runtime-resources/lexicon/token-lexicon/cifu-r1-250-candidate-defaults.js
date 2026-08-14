"use strict";

const { EXPLICIT_ANALYSES: REVIEWED_R1_250_ANALYSES } = require("./cifu-r1-250-reviewed");

const SOURCE = "GitHub issue #792 reviewed ranks 1–250 adjudication; representative readings limited to independently reviewed candidate forms";

const DEFAULT_READINGS = Object.freeze({
  "唔係": "m4 hai6",
  "真係": "zan1 hai6",
  "咁樣": "gam2 joeng6",
  "噉樣": "gam2 joeng6",
  "個人": "go3 jan4",
  "哩個": "ni1 go3",
  "過去": "gwo3 heoi3",
  "一樣": "jat1 joeng6",
  "唔見": "m4 gin3",
  "個位": "go3 wai2",
  "都會": "dou1 wui5",
  "幾多": "gei2 do1",
});

const EXPLICIT_ANALYSES = Object.freeze(Object.fromEntries(
  Object.entries(DEFAULT_READINGS).map(([surface, jyutping]) => {
    const rows = REVIEWED_R1_250_ANALYSES[surface];
    if (!rows || rows.length === 0) throw new Error(`${surface}: reviewed candidate analyses missing`);
    return [surface, Object.freeze(rows.map((row, index) => index === 0
      ? Object.freeze({
        ...row,
        jyutping,
        provenance: Object.freeze({
          kind: "reviewed_candidate_default_pronunciation",
          source: SOURCE,
          scope: "neutral_default_pronunciation_only",
        }),
      })
      : row))];
  })
));

function applyCandidateDefaultReadings(entries) {
  if (!Array.isArray(entries)) throw new TypeError("candidate default readings require an entry array");
  return entries.map(([surface, entry]) => {
    const jyutping = DEFAULT_READINGS[surface];
    if (!jyutping) return [surface, entry];
    return [surface, {
      ...entry,
      jyutping,
      provenance: {
        kind: "reviewed_candidate_default_pronunciation",
        source: SOURCE,
        scope: "neutral_default_pronunciation_only",
        prior_provenance: entry.provenance || null,
      },
    }];
  });
}

module.exports = Object.freeze({
  SOURCE,
  DEFAULT_READINGS,
  EXPLICIT_ANALYSES,
  applyCandidateDefaultReadings,
});
