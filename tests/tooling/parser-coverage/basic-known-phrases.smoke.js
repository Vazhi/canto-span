#!/usr/bin/env node
"use strict";

const { recordsForSentences, aggregateCoverage } = require("../../../tools/parser-coverage-report");

const sentences = [
  "你好。",
  "我食飯。",
  "我食咗飯。",
  "我係老師。",
  "我有一本書。",
  "我唔食飯。",
  "我要飲水。",
  "你食唔食飯？",
  "佢喺屋企。",
  "我想睇電視。"
];

const records = recordsForSentences(sentences);
const report = aggregateCoverage(records, { sampleLimit: 10 });
console.log("CANTO_SPAN_BASIC_PHRASE_SMOKE_START");
console.log(JSON.stringify({ sentences, records, report }, null, 2));
console.log("CANTO_SPAN_BASIC_PHRASE_SMOKE_END");
process.exitCode = 1;
