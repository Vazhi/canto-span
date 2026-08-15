"use strict";

const { blockedAtomicSurfaces } = require("./lexical-ingestion-registry");

const authoredCompositionalPhrases = [
  "唔開心", "唔鍾意",
  "一百萬", "二百萬", "三百萬", "四百萬", "五百萬", "六百萬", "七百萬", "八百萬", "九百萬",
  "一千萬", "二千萬", "三千萬", "四千萬", "五千萬", "六千萬", "七千萬", "八千萬", "九千萬", "一億",
  "我覺得", "我知", "我唔知", "唔知",
  "唔可以", "唔要", "唔使", "唔想", "唔得",
  "呢個", "嗰個", "呢啲", "嗰啲", "好多人",
  "呢間", "邊間", "嗰間", "呢間餐廳", "嗰間餐廳", "嗰間新開嘅意大利餐廳", "邊間呀",
  "意大利餐廳", "特別菜式", "其他同事", "上個禮拜", "下個星期五", "上次", "下次",
  "有冇興趣", "價錢中等", "中等價錢", "中價位", "中價", "都算", "唔算",
  "好好食", "好好飲", "好好睇", "好好聽", "好好味",
  "係咩", "好呀", "放心啦", "到時見啦", "得喇",
  "好貴", "好靚", "好正", "好出名", "好適合", "平啲",
  "聽過", "去過", "未去過", "講緊", "試吓", "睇睇", "Book完", "Book完枱", "話畀你知",
];

// Reviewed ingestion rows explicitly classified as blocked_atomic are parser
// policy, not one-off test fixtures: exact source coverage may remain for
// provenance/Jyutping, but longest-match lexical lookup must never collapse
// those surfaces into opaque whole tokens. Future ingestions opt in by adding
// their policy module to lexical-ingestion-registry.js.
module.exports = [...new Set([
  ...authoredCompositionalPhrases,
  ...blockedAtomicSurfaces,
])];
