"use strict";

const reviewed = require("./cifu-r751-1000-reviewed");

const TYPED_DEFAULT_OVERRIDES = Object.freeze({
  "魚": Object.freeze({
    label: "what",
    pos: "noun",
    syntax: "object_np fish_noun",
    jyutping: "jyu2",
    note: "fish; free-noun reading jyu2. Bound/non-final jyu4 remains a separate reviewed analysis.",
    rank: 776,
  }),
  "飛": Object.freeze({
    label: "doing",
    pos: "verb",
    syntax: "verb motion_verb lexical_verb",
    jyutping: "fei1",
    note: "fly; colloquial dump-a-partner sense belongs to the same reviewed verb family. The stale ticket-noun default is superseded.",
    rank: 856,
  }),
  "小心": Object.freeze({
    label: "like",
    pos: "adjective",
    syntax: "stative_predicate careful_property",
    jyutping: "siu2 sam1",
    note: "careful; the reviewed verb/imperative take-care use remains a separate analysis.",
    rank: 934,
  }),
  "全": Object.freeze({
    label: "what",
    pos: "determiner",
    syntax: "quantifier determiner universal_quantifier",
    jyutping: "cyun4",
    note: "all / whole / entire; universal quantifier/determiner.",
    rank: 941,
  }),
});

function applyTypedDefaultOverrides(entries) {
  return entries.map(([surface, entry]) => {
    const correction = TYPED_DEFAULT_OVERRIDES[surface];
    if (!correction) return [surface, entry];
    return [surface, {
      ...entry,
      label: correction.label,
      pos: correction.pos,
      syntax: correction.syntax,
      jyutping: correction.jyutping,
      note: correction.note,
      provenance: {
        kind: "reviewed_typed_default_correction",
        source: reviewed.SOURCE,
        rank: correction.rank,
        prior_provenance: entry.provenance || null,
      },
    }];
  });
}

function applyRuntimePolicy(entries) {
  return applyTypedDefaultOverrides(reviewed.applyReviewedEntries(entries));
}

module.exports = Object.freeze({
  SOURCE: reviewed.SOURCE,
  CANDIDATE_ONLY_SURFACES: reviewed.CANDIDATE_ONLY_SURFACES,
  BLOCKED_ATOMIC_SURFACES: reviewed.BLOCKED_ATOMIC_SURFACES,
  RESEARCH_REQUIRED_SURFACES: reviewed.RESEARCH_REQUIRED_SURFACES,
  DEFAULT_READING_OVERRIDES: reviewed.DEFAULT_READING_OVERRIDES,
  TYPED_DEFAULT_OVERRIDES,
  applyRuntimePolicy,
});
