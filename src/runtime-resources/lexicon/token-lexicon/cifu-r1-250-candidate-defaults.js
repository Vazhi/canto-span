"use strict";

const SOURCE = "GitHub issue #792 reviewed ranks 1–250 adjudication; mixed/compositional surfaces retain neutral defaults plus reviewed whole-form candidates";

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

function analysis(surface, key, label, pos, jyutping, syntax, gloss) {
  return Object.freeze({
    id: `lex:${surface}:${key}`,
    label,
    pos,
    jyutping,
    syntax,
    senses: Object.freeze([{ gloss }]),
    provenance: Object.freeze({ kind: "reviewed_lexical_analysis", source: SOURCE }),
  });
}

function neutralDefault(surface, jyutping) {
  return Object.freeze({
    id: `lex:${surface}:default`,
    label: "lex",
    pos: "lexical_item",
    jyutping,
    syntax: "lexical_item",
    senses: Object.freeze([{ gloss: "neutral exact-surface coverage; productive/component segmentation remains the default" }]),
    provenance: Object.freeze({
      kind: "reviewed_candidate_default_pronunciation",
      source: SOURCE,
      scope: "neutral_default_pronunciation_only",
    }),
  });
}

const CANDIDATE_ANALYSES = Object.freeze({
  "唔係": Object.freeze([
    analysis("唔係", "otherwise_conjunction", "func", "conjunction", "m4 hai6", "otherwise_conjunction", "otherwise / or else"),
  ]),
  "真係": Object.freeze([
    analysis("真係", "really_adverb", "how", "adverb", "zan1 hai6", "epistemic_degree_adverb", "really / genuinely / indeed"),
  ]),
  "咁樣": Object.freeze([
    analysis("咁樣", "manner_proform", "how", "pronoun", "gam2 joeng6", "manner_demonstrative_proform", "like that / in that way"),
  ]),
  "噉樣": Object.freeze([
    analysis("噉樣", "manner_proform", "how", "pronoun", "gam2 joeng6", "manner_demonstrative_proform", "like that / in that way"),
  ]),
  "個人": Object.freeze([
    analysis("個人", "noun", "who", "noun", "go3 jan4", "individual_person_noun", "individual / person"),
    analysis("個人", "personal_property", "like", "adjective", "go3 jan4", "personal_individual_modifier", "personal / individual"),
  ]),
  "哩個": Object.freeze([
    analysis("哩個", "pronoun", "who", "pronoun", "ni1 go3", "demonstrative_pronoun", "this / this one; orthographic alias of 呢個"),
    analysis("哩個", "determiner", "func", "determiner", "ni1 go3", "demonstrative_determiner", "this; demonstrative determiner alias of 呢個"),
  ]),
  "過去": Object.freeze([
    analysis("過去", "motion_verb", "doing", "verb", "gwo3 heoi3", "verb motion_pass_verb", "pass / go over"),
    analysis("過去", "past_noun", "when", "noun", "gwo3 heoi3", "past_time_np", "the past"),
    analysis("過去", "past_adverb", "when", "adverb", "gwo3 heoi3", "past_time_adverb", "formerly / in the past"),
  ]),
  "一樣": Object.freeze([
    analysis("一樣", "property", "like", "adjective", "jat1 joeng6", "equative_same_property", "same / alike"),
    analysis("一樣", "adverb", "how", "adverb", "jat1 joeng6", "equative_adverb", "in the same way / likewise"),
  ]),
  "唔見": Object.freeze([
    analysis("唔見", "missing_verb", "doing", "verb", "m4 gin3", "verb missing_lost_verb", "be missing / lost / disappear from view"),
  ]),
  "個位": Object.freeze([
    analysis("個位", "math_noun", "what", "noun", "go3 wai2", "mathematical_units_place_noun", "units / ones place"),
  ]),
  "都會": Object.freeze([
    analysis("都會", "metropolis_noun", "what", "noun", "dou1 wui6", "metropolis_city_noun", "metropolis / metropolitan area"),
  ]),
  "幾多": Object.freeze([
    analysis("幾多", "quantifier", "func", "quantifier", "gei2 do1", "wh_quantity_quantifier", "how much / how many"),
  ]),
});

const EXPLICIT_ANALYSES = Object.freeze(Object.fromEntries(
  Object.entries(DEFAULT_READINGS).map(([surface, jyutping]) => [
    surface,
    Object.freeze([neutralDefault(surface, jyutping), ...(CANDIDATE_ANALYSES[surface] || [])]),
  ])
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
  CANDIDATE_ANALYSES,
  EXPLICIT_ANALYSES,
  applyCandidateDefaultReadings,
});
