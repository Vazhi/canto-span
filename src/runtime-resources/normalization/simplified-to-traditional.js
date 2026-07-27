"use strict";

const HIGH_CONFIDENCE_SIMPLIFIED_TO_TRADITIONAL = {
  "书": "書",
  "饮": "飲",
  "饭": "飯",
  "听": "聽",
  "说": "說",
  "买": "買",
  "写": "寫",
  "还": "還",
  "个": "個",
  "过": "過",
  "门": "門",
  "车": "車",
  "风": "風",
  "后": "後",
  "开": "開",
  "来": "來",
  "边": "邊",
  "间": "間",
  "东": "東",
  "话": "話",
  "语": "語",
  "学": "學",
  "习": "習",
  "妈": "媽",
  "爷": "爺",
  "奶": "奶",

  // v0.5.104 reviewed high-confidence map hardening.
  // These are one-to-one character-form normalizations used by existing
  // accepted grammar paths. Do not add Cantonese lexical repairs here.
  "讲": "講",
  "紧": "緊",
  "笔": "筆",
  "环": "環",
  "厅": "廳",
  "们": "們",
  "对": "對",
  "点": "點",
  "见": "見",
  "长": "長",
  "气": "氣",
  "声": "聲",
};

// v0.5.107 folded pinyin-fallout lexical repairs.
// Scope is intentionally narrow: only one-character Simplified forms that are
// likely to appear from pinyin typing and that block ordinary Cantonese parser
// paths are folded into parser_shadow_source. Raw learner-visible text remains
// exactly as typed. Do not add broad Mandarin-to-Cantonese conversions here,
// especially characters that pinyin input already emits in Traditional form.

module.exports = HIGH_CONFIDENCE_SIMPLIFIED_TO_TRADITIONAL;
