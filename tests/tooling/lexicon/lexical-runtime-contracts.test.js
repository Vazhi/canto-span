#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const { buildLexicalAnalysisIndex } = require("../../../src/runtime-resources/lexicon/lexical-analyses");
const compositionalLexicalPhrases = new Set(require("../../../src/runtime-resources/lexicon/compositional-lexical-phrases"));
const { loadRuntimeApi } = require("../../lib/runtime-api");

const tokenLexicon = Object.fromEntries(tokenEntries);
const analyses = buildLexicalAnalysisIndex(tokenEntries);
const api = loadRuntimeApi({ apiNames: ["analyzeLine", "diagnosticFinalRows", "LEARNER_SURFACE_GLOSSES"] });

const DEFAULT_READINGS = Object.freeze({
  "爸":"baa4","爸爸":"baa4 baa1","阿爸":"aa3 baa4","打算":"daa2 syun3","由於":"jau4 jyu1","喀":"haak1",
  "魚":"jyu2","飛":"fei1","小心":"siu2 sam1","全":"cyun4","處理":"cyu5 lei5","嘴":"zeoi2","簿":"bou2",
  "轉彎":"zyun3 waan1","直行":"zik6 haang4","行為":"hang4 wai4","會考":"wui6 haau2","收到":"sau1 dou2",
  "家姐":"gaa1 ze1","膠袋":"gaau1 doi2","重複":"cung4 fuk1","舖頭":"pou3 tau2","細路仔":"sai3 lou6 zai2",
  "琴晚":"kam4 maan5","遇到":"jyu6 dou2","響":"hoeng2","校":"haau6","判斷":"pun3 dyun3","兔仔":"tou3 zai2",
  "界定":"gaai3 deng6","傾計":"king1 gai2","撈":"lou1","時間":"si4 gaan3","嘛":"maa5","嚟講":"lai4 gong2",
  "好意思":"hou2 ji3 si1"
});

const EXACT_READING_SETS = Object.freeze({
  "喀":["haak1","haak3","kaa1","kaa3","kak1"],"囉":["lo1","lo4"],"魚":["jyu2","jyu4"],
  "直行":["zik6 haang4","zik6 hong4"],"車":["ce1","geoi1"],"網絡":["mong5 lok3","mong5 lok6"],
  "橋":["kiu4","kiu2"],"試":["si3","si5"],"新聞":["san1 man4","san1 man2"],"舖":["pou3","pou2"],
  "地下":["dei6 haa6","dei6 haa2"],"被":["bei6","pei5"],"處理":["cyu5 lei5","cyu2 lei5"],"兆":["siu6"],
  "唔好意思":["m4 hou2 ji3 si1","m4 hou2 ji3 si3"],"純粹":["seon4 seoi5","seon4 seoi6"],
  "咧":["le4","le5"],"嘅":["ge2","ge3"],"呀":["aa1","aa3"],"會":["wui2","wui5","wui6"],
  "行":["haang4","hang4","hong4","hang6"],"知":["zi1","zi3"],"難":["naan4","naan6"],"兩":["loeng2","loeng5"],
  "咋":["zaa3","zaa4"],"爸":["baa4","baa1"],"爸爸":["baa4 baa1","baa4 baa4","baa1 baa1"],
  "時間":["si4 gaan3","si4 gaan1"],"嘛":["maa5","maa3"],"簿":["bou2","bou6"],"粒":["nap1","lap1"],
  "超":["ciu1","ciu2"],"哎吔":["ai1 jaa1","ai1 jaa3","ai1 jaa5","ai1 jaak3","ai1 jaa6"],
  "嚟講":["lai4 gong2","lei4 gong2"],"好意思":["hou2 ji3 si1","hou2 ji3 si3"]
});

const REQUIRED_READINGS = Object.freeze({
  "樂":["lok6","ngok6","ngaau6"],"磅":["bong6","bong2"],"礦":["kwong3","kong3","gwong3"],
  "零":["ling4","leng4","leng2","leng1"],"拿":["naa4","laa4"],"著":["zyu3","zoek3","zoek6"],
  "寧願":["ning4 jyun2","ning4 jyun6"],"數":["sou2","sou3"],"文":["man4","man1","man6"],
  "和":["wo4","wo6","wu2"],"量":["loeng4","loeng6"],"傳":["cyun4","zyun6"]
});

const FORBIDDEN_READINGS = Object.freeze({
  "喀":["haak6"],"囉":["lo3"],"只":["zek3"],"行為":["hang6 wai4"],"拿":["laa2"],"收到":["sau1 dou3"],
  "家姐":["gaa1 ze2"],"捉":["zuk3"],"膠袋":["gaau1 doi6"],"舖頭":["pou3 tau4"],"壞":["waai2"],
  "掣":["cit3"],"溜":["lau1","liu1"],"判斷":["pun3 tyun5"],"界定":["gaai3 ding6"],"傾計":["king1 gai3"],
  "撈":["lou4"],"嘛":["maa4"],"個位":["go3 wai6"],"兆":["ziu6"]
});

const DEFAULT_FIELDS = Object.freeze({
  "唔係":{label:"func",syntax:"negated_copula"},"魚":{label:"what",pos:"noun",syntax:"object_np fish_noun"},
  "飛":{label:"doing",pos:"verb",syntax:"verb motion_verb lexical_verb"},"小心":{label:"like",pos:"adjective",syntax:"stative_predicate careful_property"},
  "全":{label:"what",pos:"determiner",syntax:"quantifier determiner universal_quantifier"},"好話":{label:"what",pos:"noun"},
  "廣告":{pos:"noun"},"附近":{syntax:"relative_place_expression"},"鐘頭":{pos:"noun"},"嘴":{pos:"noun"},
  "爸":{label:"who",pos:"noun"},"好意思":{pos:"adverb",syntax:"rhetorical_shame_or_nerve_adverb"},
  "嚟講":{pos:"function",syntax:"perspective_topic_frame_marker"}
});

const STABLE_ID_SETS = Object.freeze({
  "住":["lex:住:residence_verb","lex:住:durative_marker"],
  "咪":["lex:咪:prohibitive_marker","lex:咪:discourse_focus_marker","lex:咪:study_verb"],
  "定":["lex:定:decide_fix_verb","lex:定:alternative_connector","lex:定:steady_stative","lex:定:advance_adverb"],
  "唔係":["lex:唔係:default","lex:唔係:otherwise_conjunction"],
  "成":["lex:成:default","lex:成:success_completion_verb","lex:成:seng4_quantifier","lex:成:seng4_result_suffix","lex:成:tenth_measure"]
});

const REQUIRED_ANALYSES = Object.freeze([
  {surface:"唔係",id:"lex:唔係:otherwise_conjunction",pos:"conjunction"},
  {surface:"成",id:"lex:成:success_completion_verb",pos:"verb"},{surface:"成",id:"lex:成:seng4_result_suffix",syntax:"completion_result_suffix"},
  {surface:"成",id:"lex:成:tenth_measure",syntax:"fraction_measure"},{surface:"嘅",id:"lex:嘅:doubt_question_particle_ge2",pos:"particle",jyutping:"ge2"},
  {surface:"會",id:"lex:會:meeting_noun",pos:"noun",jyutping:"wui2"},{surface:"會",id:"lex:會:assemble_verb",pos:"verb",jyutping:"wui6"},
  {surface:"行",id:"lex:行:industry_noun_hong4",pos:"noun",jyutping:"hong4"},{surface:"行",id:"lex:行:row_classifier_hong4",pos:"classifier",jyutping:"hong4"},
  {surface:"行",id:"lex:行:conduct_bound_hang6",pos:"bound",jyutping:"hang6"},{surface:"知",id:"lex:知:knowledge_bound_zi3",pos:"bound",jyutping:"zi3"},
  {surface:"難",id:"lex:難:calamity_bound_naan6",pos:"bound",jyutping:"naan6"},{surface:"兩",id:"lex:兩:tael_measure_loeng2",pos:"classifier",jyutping:"loeng2"},
  {surface:"咋",id:"lex:咋:rhetorical_final_particle_zaa4",pos:"particle",jyutping:"zaa4"},{surface:"校",pos:"noun",jyutping:"haau6"},{surface:"校",pos:"verb",jyutping:"gaau3"},
  {surface:"文",pos:"noun",jyutping:"man4"},{surface:"文",pos:"classifier",jyutping:"man1"},{surface:"文",pos:"verb",jyutping:"man6"},
  {surface:"和",pos:"function",jyutping:"wo4"},{surface:"和",pos:"verb",jyutping:"wo6"},{surface:"和",pos:"verb",jyutping:"wu2"},
  {surface:"量",pos:"verb",jyutping:"loeng4"},{surface:"量",pos:"noun",jyutping:"loeng6"},{surface:"傳",pos:"verb",jyutping:"cyun4"},{surface:"傳",pos:"noun",jyutping:"zyun6"},
  {surface:"重複",pos:"verb",jyutping:"cung4 fuk1"},{surface:"重複",pos:"adverb",jyutping:"cung4 fuk1"},{surface:"根據",pos:"coverb"},{surface:"根據",pos:"noun"},{surface:"根據",pos:"verb"},
  {surface:"犯",pos:"verb",jyutping:"faan6"},{surface:"犯",pos:"noun",jyutping:"faan2"},{surface:"鋪",pos:"verb",jyutping:"pou1"},{surface:"鋪",pos:"noun",jyutping:"pou3"},{surface:"鋪",pos:"classifier",jyutping:"pou3"},
  {surface:"響",pos:"coverb",jyutping:"hoeng2",syntax:"locative_relation_coverb"},{surface:"及",pos:"function"},{surface:"及",pos:"bound"},
  {surface:"盡量",pos:"adverb"},{surface:"盡量",pos:"verb"},{surface:"超",pos:"adverb"},{surface:"超",pos:"verb"},{surface:"超",pos:"interjection"},{surface:"超",pos:"noun"}
]);

const FORBIDDEN_ANALYSES = Object.freeze([
  {surface:"在",syntax:"progressive_marker"},{surface:"校",pos:"classifier"},{surface:"嘴",pos:"classifier"},
  {surface:"重複",pos:"adjective"},{surface:"金",pos:"adjective"},{surface:"及",pos:"verb"}
]);

const VARIANT_PAIRS = Object.freeze([["我地","我哋"],["你地","你哋"],["佢地","佢哋"],["乜野","乜嘢"],["人地","人哋"],["中意","鍾意"],["呢道","呢度"],["嗰道","嗰度"]]);
const MWE_COMPONENTS = Object.freeze({"搞掂":["搞","掂"],"出聲":["出","聲"],"好笑":["好","笑"],"收埋":["收","埋"],"唔錯":["唔","錯"],"幾點":["幾","點"],"一刻":["一","刻"],"好食":["好","食"],"好聽":["好","聽"],"睇住":["睇","住"],"遇到":["遇","到"],"一號":["一","號"],"人話":["人","話"]});

const rows = (surface) => analyses[surface] || [];
const readings = (surface) => new Set(rows(surface).map((row) => row.jyutping).filter(Boolean));
const ids = (surface) => rows(surface).map((row) => row.id);
const matches = (row, spec) => ["id","pos","jyutping","syntax","label"].every((key) => spec[key] === undefined || row[key] === spec[key]);
const finalRows = (surface) => Array.from(api.diagnosticFinalRows(api.analyzeLine(surface)));
const tokenRows = (surface) => finalRows(surface).filter((row) => row.kind === "token");
const constructions = (surface) => finalRows(surface).filter((row) => row.kind === "construction").map((row) => row.internal_construction || row.construction || row.type || "");

test("reviewed runtime defaults remain stable independently of discovery source", () => {
  for (const [surface, expected] of Object.entries(DEFAULT_READINGS)) { assert.ok(tokenLexicon[surface], `${surface}: runtime default exists`); assert.equal(tokenLexicon[surface].jyutping, expected, `${surface}: default reading`); }
  for (const [surface, expected] of Object.entries(DEFAULT_FIELDS)) { assert.ok(tokenLexicon[surface], `${surface}: runtime default exists`); for (const [field, value] of Object.entries(expected)) assert.equal(tokenLexicon[surface][field], value, `${surface}: default ${field}`); }
});

test("reviewed reading inventories preserve accepted alternatives and reject superseded candidates", () => {
  for (const [surface, expected] of Object.entries(EXACT_READING_SETS)) assert.deepEqual(readings(surface), new Set(expected), `${surface}: exact reviewed reading set`);
  for (const [surface, required] of Object.entries(REQUIRED_READINGS)) { const actual = readings(surface); for (const reading of required) assert.ok(actual.has(reading), `${surface}: required reading ${reading}`); }
  for (const [surface, forbidden] of Object.entries(FORBIDDEN_READINGS)) { const actual = readings(surface); for (const reading of forbidden) assert.ok(!actual.has(reading), `${surface}: forbidden reading ${reading}`); }
  assert.ok(![...readings("細路仔")].some((reading) => /zi2/u.test(reading)), "細路仔: superseded zi2 candidate absent");
  assert.ok(![...readings("兔仔")].some((reading) => /zi2$/u.test(reading)), "兔仔: superseded final zi2 candidate absent");
});

test("stable high-value analysis identities survive later lexical ingestion", () => { for (const [surface, expected] of Object.entries(STABLE_ID_SETS)) assert.deepEqual(ids(surface), expected, `${surface}: stable lexical analysis IDs`); });

test("polyfunctional lexical contracts retain required analyses without unsupported broadening", () => {
  for (const spec of REQUIRED_ANALYSES) assert.ok(rows(spec.surface).some((row) => matches(row, spec)), `${spec.surface}: missing required analysis ${JSON.stringify(spec)}`);
  for (const spec of FORBIDDEN_ANALYSES) assert.ok(!rows(spec.surface).some((row) => matches(row, spec)), `${spec.surface}: unsupported analysis leaked ${JSON.stringify(spec)}`);
});

test("reviewed spelling variants stay behaviorally aligned with canonical forms", () => {
  for (const [variant, canonical] of VARIANT_PAIRS) { assert.ok(tokenLexicon[variant] && tokenLexicon[canonical]); assert.equal(tokenLexicon[variant].jyutping, tokenLexicon[canonical].jyutping, `${variant}: reading matches ${canonical}`); assert.equal(tokenLexicon[variant].label, tokenLexicon[canonical].label, `${variant}: role matches ${canonical}`); assert.equal(tokenLexicon[variant].syntax, tokenLexicon[canonical].syntax, `${variant}: syntax matches ${canonical}`); }
});

test("lexicalized multiword entries coexist with independently usable components", () => { for (const [surface, components] of Object.entries(MWE_COMPONENTS)) { assert.ok(tokenLexicon[surface], `${surface}: whole lexical entry remains available`); for (const component of components) assert.ok(tokenLexicon[component], `${surface}: component ${component} remains available`); } });

test("representative tokenizer collision boundaries remain compositional where required", () => {
  assert.ok(!tokenLexicon["嘢食"], "嘢食 remains phrase-local rather than a global atomic token");
  assert.deepEqual(tokenRows("有冇嘢食啊？").map((row) => row.surface), ["有冇","嘢","食","啊"]);
  assert.ok(!constructions("下棋").includes("TemporalClause"), "下棋 is not misparsed as a temporal clause");
  assert.equal(tokenRows("下棋").find((row) => row.surface === "下").jyutping, "haa5");
  for (const surface of ["一百萬","一千萬"]) { assert.ok(tokenLexicon[surface]); assert.ok(compositionalLexicalPhrases.has(surface)); assert.ok(tokenRows(surface).length >= 3); }
});

test("learner gloss registry is structurally valid without depending on a teaching-source packet", () => {
  for (const [surface, glosses] of Object.entries(api.LEARNER_SURFACE_GLOSSES || {})) { assert.ok(Array.isArray(glosses) && glosses.length > 0, `${surface}: learner gloss list`); assert.ok(glosses.every((gloss) => typeof gloss === "string" && gloss.trim()), `${surface}: learner glosses are non-empty strings`); }
});
