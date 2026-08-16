"use strict";

// Neutral component-level Cantonese pronunciation coverage surfaced by the external
// “Most Common Cantonese Words (Frequency List)” Google Sheet. The bounded parser-gap
// audit exposed these CJK components without Jyutping; the source supplies one simple
// unambiguous Jyutping reading for each. No frequency, rank, gloss, POS, grammar
// category, or phrase atomicity is imported.
const SOURCE = "Most Common Cantonese Words (Frequency List)";
const SOURCE_URL = "https://docs.google.com/spreadsheets/d/1ArxEFo46PTrDyDDhWyu3wB0epxqTyd8WBaprnwTEPm4";
const RIME_REVISION = "259f0e48bba840c3a2e0d117539e96937f3d89bc";
const RIME_SOURCE = "Rime-Cantonese jyut6ping3.chars.dict.yaml";

const DISCOVERY_READINGS = Object.freeze({
  "世": "sai3",
  "並": "bing6",
  "主": "zyu2",
  "也": "jaa5",
  "仁": "jan4",
  "介": "gaai3",
  "付": "fu6",
  "伙": "fo2",
  "佑": "jau6",
  "倉": "cong1",
  "們": "mun4",
  "傷": "seung1",
  "兄": "hing1",
  "充": "cung1",
  "兒": "ji4",
  "內": "noi6",
  "准": "zeon2",
  "勸": "hyun3",
  "危": "ngai4",
  "友": "jau5",
  "反": "faan2",
  "叔": "suk1",
  "吩": "fan1",
  "吹": "ceoi1",
  "周": "zau1",
  "呼": "fu1",
  "咐": "fu3",
  "哈": "haa1",
  "唏": "hei1",
  "商": "soeng1",
  "啖": "daam6",
  "嗱": "naa4",
  "噚": "cam4",
  "器": "hei3",
  "回": "wui4",
  "執": "zap1",
  "基": "gei1",
  "堅": "gin1",
  "堯": "jiu4",
  "天": "tin1",
  "奇": "kei4",
  "奈": "noi6",
  "奮": "fan5",
  "妹": "mui6",
  "姑": "gu1",
  "娘": "noeng4",
  "婚": "fan1",
  "嫁": "ga3",
  "嫂": "sou2",
  "子": "zi2",
  "孝": "haau3",
  "客": "haak3",
  "容": "jung4",
  "密": "mat6",
  "察": "caat3",
  "寶": "bou2",
  "專": "zyun1",
  "尋": "cam4",
  "尬": "gaai3",
  "展": "zin2",
  "師": "si1",
  "幸": "hang6",
  "床": "cong4",
  "廈": "haa6",
  "廣": "gwong2",
  "弟": "dai6",
  "彩": "coi2",
  "律": "leot6",
  "德": "dak1",
  "志": "zi3",
  "忘": "mong4",
  "忠": "zung1",
  "急": "gap1",
  "息": "sik1",
  "愈": "jyu6",
  "慣": "gwaan3",
  "憎": "zang1",
  "戚": "cik1",
  "承": "sing4",
  "投": "tau4",
  "抖": "dau2",
  "抽": "cau1",
  "拒": "keoi5",
  "招": "ziu1",
  "持": "ci4",
  "推": "teoi1",
  "擇": "zaak6",
  "救": "gau3",
  "敗": "baai6",
  "敬": "ging3",
  "斬": "zaam2",
  "施": "si1",
  "既": "ge3",
  "李": "lei5",
  "栽": "zoi1",
  "桂": "gwai3",
  "梯": "tai1",
  "極": "gik6",
  "榮": "wing4",
  "欠": "him3",
  "款": "fun2",
  "歷": "lik6",
  "母": "mou5",
  "毒": "duk6",
  "氣": "hei3",
  "求": "kau4",
  "注": "zyu3",
  "派": "paai3",
  "流": "lau4",
  "淚": "leoi6",
  "湊": "cau3",
  "滿": "mun5",
  "潘": "pun1",
  "潮": "ciu4",
  "濕": "sap1",
  "火": "fo2",
  "爆": "baau3",
  "父": "fu6",
  "爸": "ba1",
  "爺": "je4",
  "猶": "jau4",
  "獨": "duk6",
  "珍": "zan1",
  "甘": "gam1",
  "畢": "bat1",
  "癲": "din1",
  "登": "dang1",
  "目": "muk6",
  "示": "si6",
  "福": "fuk1",
  "禮": "lai5",
  "秀": "sau3",
  "秒": "miu5",
  "秘": "bei3",
  "窮": "kung4",
  "章": "zoeng1",
  "篇": "pin1",
  "簡": "gaan2",
  "系": "hai6",
  "絕": "zyut6",
  "統": "tung2",
  "維": "wai4",
  "緒": "seoi5",
  "繩": "sing4",
  "耳": "ji5",
  "聞": "man4",
  "職": "zik1",
  "肚": "tou5",
  "肯": "hang2",
  "膊": "bok3",
  "膽": "daam2",
  "臉": "lim5",
  "般": "bun1",
  "良": "loeng4",
  "芝": "zi1",
  "藝": "ngai6",
  "虎": "fu2",
  "術": "seot6",
  "衝": "cung1",
  "表": "biu2",
  "裙": "kwan4",
  "裝": "zong1",
  "褲": "fu3",
  "襯": "can3",
  "言": "jin4",
  "討": "tou2",
  "記": "gei3",
  "詞": "ci4",
  "認": "jing6",
  "語": "jyu5",
  "誤": "ng6",
  "諒": "loeng6",
  "謝": "ze6",
  "警": "ging2",
  "議": "ji5",
  "豫": "jyu6",
  "貌": "maau6",
  "財": "coi4",
  "資": "zi1",
  "賊": "caak6",
  "賴": "laai6",
  "賽": "coi3",
  "趕": "gon2",
  "足": "zuk1",
  "距": "keoi5",
  "辦": "baan6",
  "辭": "ci4",
  "進": "zeon3",
  "逼": "bik1",
  "酒": "zau2",
  "野": "je5",
  "阻": "zo2",
  "際": "zai3",
  "隨": "ceoi4",
  "險": "him2",
  "離": "lei4",
  "雲": "wan4",
  "霜": "soeng1",
  "露": "lou6",
  "非": "fei1",
  "鞋": "haai4",
  "題": "tai4",
  "駛": "sai2",
  "鬆": "sung1",
  "黎": "lai4",
  "龍": "lung4",
  "圍": "wai4",
  "嗌": "aai3",
  "嚇": "haak3",
  "姨": "ji4",
  "安": "on1",
  "廚": "cyu4",
  "掛": "gwaa3",
  "玉": "juk6",
  "現": "jin6",
  "盒": "hap6",
  "紹": "siu6",
  "親": "can1",
  "觀": "gun1",
  "贏": "jeng4",
  "輕": "hing1",
  "造": "zou6",
  "馮": "fung4",
  "士": "si6",
  "契": "kai3",
  "強": "koeng4",
  "抱": "pou5",
  "搶": "coeng2",
  "散": "saan3",
  "枝": "zi1",
  "歉": "him3",
  "串": "cyun3",
  "仆": "puk1",
  "便": "bin6",
  "冚": "kam2",
  "利": "lei6",
  "參": "caam1",
  "吧": "baa1",
  "呆": "ngoi4",
  "命": "ming6",
  "哼": "hang1",
  "娜": "naa4",
  "惡": "ok3",
  "撚": "nan2",
  "斷": "dyun6",
  "朝": "ziu1",
  "王": "wong4",
  "硬": "ngaang6",
  "立": "laap6",
  "悉": "sik1",
  "惜": "sik1",
  "慮": "leoi6",
  "絡": "lok3",
  "蝕": "sit6",
  "觸": "zuk1",
  "訊": "seon3",
  "了": "liu5",
  "妮": "nei4",
  "妳": "nei5",
  "几": "gei2",
  "广": "gwong2",
  "无": "mou4",
  "爲": "wai4",
  "確": "kok3",
  "粵": "jyut6",
  "裡": "leoi5",
  "豆": "dau6",
  "隊": "deoi6",
  "青": "cing1",
  "麻": "maa4",
  "丫": "aa1",
  "唓": "ce1",
  "喔": "o1",
  "尷": "gaam1",
  "氛": "fan1",
  "瑩": "jing4",
  "痴": "ci1",
  "薛": "sit3",
  "訓": "fan3",
  "訝": "ngaa6",
  "輝": "fai1",
  "哂": "saai3", // recurrent vernacular corpus spelling of 晒 in exhaustive/completive contexts
  "跙": "zau2", // recurrent corpus spelling used with 走 “leave/go” syntax
  "咧": "le4" // default for independently supported le4/le5 particle analyses
});

const RIME_NORMALIZED_OVERRIDES = Object.freeze({
  "傷": "soeng1",
  "嫁": "gaa3",
});

// Discovery-only readings are retained for adjudication but never become runtime
// authority merely because the source supplied them. 爸 ba1 is kept here because
// the source transcription may reflect a reduced realization; standard Jyutping
// references instead encode contextual baa4 / baa1 readings.
const DISCOVERY_READING_CANDIDATES = Object.freeze({
  "爸": Object.freeze({
    jyutping: "ba1",
    status: "unresolved_phonetic_candidate",
    source: SOURCE,
    url: SOURCE_URL,
    note: "Do not auto-promote: requires phonetic evidence distinguishing /a/ from /aa/ and contextual tone behavior.",
  }),
});

// These source spellings are not validated by the character's dictionary reading;
// they are accepted only as independently reviewed orthographic substitutions for
// an already-supported Cantonese form.
const ORTHOGRAPHIC_VARIANT_READINGS = Object.freeze({
  "既": Object.freeze({ jyutping: "ge3", canonical: "嘅", evidence: "vernacular orthographic substitute" }),
  "广": Object.freeze({ jyutping: "gwong2", canonical: "廣", evidence: "simplified orthographic form" }),
  "哂": Object.freeze({ jyutping: "saai3", canonical: "晒", evidence: "recurrent vernacular corpus spelling" }),
  "跙": Object.freeze({ jyutping: "zau2", canonical: "走", evidence: "recurrent vernacular corpus spelling with 走 syntax" }),
});

const RIME_ACCEPTED_READINGS = Object.freeze(Object.fromEntries(
  Object.entries(DISCOVERY_READINGS)
    .filter(([surface]) => !Object.prototype.hasOwnProperty.call(DISCOVERY_READING_CANDIDATES, surface))
    .filter(([surface]) => !Object.prototype.hasOwnProperty.call(ORTHOGRAPHIC_VARIANT_READINGS, surface))
    .map(([surface, discoveryReading]) => [surface, RIME_NORMALIZED_OVERRIDES[surface] || discoveryReading])
));

const ACCEPTED_READINGS = Object.freeze({
  ...RIME_ACCEPTED_READINGS,
  ...Object.fromEntries(Object.entries(ORTHOGRAPHIC_VARIANT_READINGS).map(([surface, row]) => [surface, row.jyutping])),
});

function acceptedReadingRecord(surface) {
  if (Object.prototype.hasOwnProperty.call(ORTHOGRAPHIC_VARIANT_READINGS, surface)) {
    const row = ORTHOGRAPHIC_VARIANT_READINGS[surface];
    return {
      jyutping: row.jyutping,
      provenance: {
        kind: "independently_reviewed_orthographic_variant",
        source: SOURCE,
        url: SOURCE_URL,
        canonical_surface: row.canonical,
        evidence: row.evidence,
      },
    };
  }
  if (Object.prototype.hasOwnProperty.call(RIME_ACCEPTED_READINGS, surface)) {
    return {
      jyutping: RIME_ACCEPTED_READINGS[surface],
      provenance: {
        kind: "pinned_cantonese_pronunciation_authority",
        source: RIME_SOURCE,
        revision: RIME_REVISION,
      },
    };
  }
  return null;
}

function applyVernacularComponentCoverage(entries) {
  const seen = new Set();
  const out = entries.map(([surface, entry]) => {
    seen.add(surface);
    const authority = acceptedReadingRecord(surface);
    if (!authority || String(entry && entry.jyutping || "").trim()) return [surface, entry];
    const priorProvenance = entry && entry.provenance;
    return [surface, {
      ...entry,
      jyutping: authority.jyutping,
      note: [entry && entry.note, "Pronunciation filled from accepted Cantonese authority after external-source gap discovery."].filter(Boolean).join(" "),
      provenance: {
        ...authority.provenance,
        ...(priorProvenance ? { prior_provenance: priorProvenance } : {}),
      },
    }];
  });
  for (const surface of Object.keys(ACCEPTED_READINGS)) {
    if (seen.has(surface)) continue;
    const authority = acceptedReadingRecord(surface);
    if (!authority) continue;
    out.push([surface, {
      label: "lex",
      pos: "lexical_item",
      syntax: "lexical_item",
      jyutping: authority.jyutping,
      note: "Neutral component pronunciation coverage admitted from accepted Cantonese authority; no grammar/category promotion is implied.",
      provenance: authority.provenance,
    }]);
  }
  return out;
}

// READINGS remains a compatibility alias for accepted runtime readings only.
const READINGS = ACCEPTED_READINGS;

module.exports = Object.freeze({
  SOURCE,
  SOURCE_URL,
  RIME_SOURCE,
  RIME_REVISION,
  DISCOVERY_READINGS,
  DISCOVERY_READING_CANDIDATES,
  ORTHOGRAPHIC_VARIANT_READINGS,
  RIME_ACCEPTED_READINGS,
  ACCEPTED_READINGS,
  READINGS,
  acceptedReadingRecord,
  applyVernacularComponentCoverage,
});
