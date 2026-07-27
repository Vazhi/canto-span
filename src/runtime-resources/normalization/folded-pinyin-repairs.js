"use strict";

const FOLDED_PINYIN_FALLOUT_CANTONESE_LEXICAL_REPAIRS = {
  "给": {
    normalized: "畀",
    confidence: "high",
    source: "pinyin_simplified_typing_fallout",
    note: "Pinyin Simplified 给 is a common input fallback for Cantonese 畀; parser shadow may use 畀 while raw display stays 给."
  },
  "没": {
    normalized: "冇",
    confidence: "high",
    source: "pinyin_simplified_typing_fallout",
    note: "Pinyin Simplified 没 is a common input fallback for Cantonese 冇; parser shadow may use 冇 while raw display stays 没."
  },
};

module.exports = FOLDED_PINYIN_FALLOUT_CANTONESE_LEXICAL_REPAIRS;
