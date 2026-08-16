#!/usr/bin/env node
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const reviewed = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1251-1500-reviewed");
const { buildLexicalAnalysisIndex } = require("../../../src/runtime-resources/lexicon/lexical-analyses");
const root = path.resolve(__dirname, "../../..");
const tokenLexicon = Object.fromEntries(tokenEntries);
const analyses = buildLexicalAnalysisIndex(tokenEntries);
const dynamic = reviewed.buildExplicitAnalyses(tokenEntries);
function cifuRows(){const lines=fs.readFileSync(path.join(root,"data","lexical-frequency","cifu-spoken-top-2000.tsv"),"utf8").replace(/^\uFEFF/u,"").trimEnd().split(/\r?\n/u);const header=lines.shift().split("\t");const ix=Object.fromEntries(header.map((name,index)=>[name,index]));return lines.map((line)=>{const row=line.split("\t");return{rank:Number(row[ix.rank]),surface:row[ix.word]};});}
function bandSurfaces(){return cifuRows().filter((row)=>row.rank>=1251&&row.rank<=1500).map((row)=>row.surface);}
function ids(surface){return (analyses[surface]||[]).map((row)=>row.id);}
function readings(surface){return (analyses[surface]||[]).map((row)=>row.jyutping);}
function bandRows(surface){return (analyses[surface]||[]).slice(1).filter((row)=>row.provenance&&row.provenance.source===reviewed.SOURCE);}

test("ranks 1251-1500 authority classes are disjoint and cover the source band",()=>{
  const surfaces=bandSurfaces();assert.equal(surfaces.length,250);assert.equal(new Set(surfaces).size,250);
  const classes=[new Set(Object.keys(reviewed.PROMOTIONS)),new Set(reviewed.SOURCE_ONLY_SURFACES),new Set(Object.keys(reviewed.MULTI_SPECS)),new Set(Object.keys(reviewed.READING_SPECS)),new Set(reviewed.BLOCKED_ATOMIC_SURFACES)];
  const union=new Set();for(const set of classes)for(const surface of set){assert.ok(!union.has(surface),surface+": authority-class overlap");union.add(surface);}assert.deepEqual(union,new Set(surfaces));
  assert.ok(tokenLexicon["幾多"],"independently supported Cantonese quantity interrogative remains covered");
});

test("broad reviewed rows are typed without flattening richer existing defaults",()=>{for(const [surface,promotion] of Object.entries(reviewed.PROMOTIONS)){const entry=tokenLexicon[surface];assert.ok(entry,surface+": runtime entry exists");assert.ok(!reviewed.isNeutralLexicalEntry(entry),surface+": reviewed broad selection is typed");if(entry.provenance&&entry.provenance.source===reviewed.SOURCE&&entry.provenance.kind==="reviewed_lexical_promotion"){assert.equal(entry.label,promotion.label);assert.equal(entry.pos,promotion.pos);assert.equal(entry.syntax,promotion.syntax);}else{assert.notEqual(entry.pos,"lexical_item");assert.notEqual(entry.syntax,"lexical_item");}}});

test("source-only rows receive no band-specific typed fact",()=>{for(const surface of reviewed.SOURCE_ONLY_SURFACES){const entry=tokenLexicon[surface];if(entry)assert.ok(!(entry.provenance&&entry.provenance.source===reviewed.SOURCE),surface+": no band-specific default typing");assert.ok(!dynamic[surface],surface+": no reviewed alternative set");}});

test("blocked rows receive no band-specific atomic analysis",()=>{for(const surface of reviewed.BLOCKED_ATOMIC_SURFACES){assert.ok(!dynamic[surface],surface+": no reviewed atomic alternative set");const entry=tokenLexicon[surface];if(entry)assert.ok(!(entry.provenance&&entry.provenance.source===reviewed.SOURCE),surface+": not promoted by this band");}});

test("reviewed alternative surfaces preserve defaults and stable IDs",()=>{assert.deepEqual(new Set(Object.keys(dynamic)),new Set(Object.keys(reviewed.ALTERNATIVE_SPECS)));const seen=new Set();for(const [surface,rows] of Object.entries(dynamic)){const entry=tokenLexicon[surface];assert.ok(entry,surface+": runtime entry exists");assert.ok(rows.length>=2,surface+": default plus alternative(s)");assert.equal(rows[0].id,`lex:${surface}:default`);assert.equal(rows[0].label,entry.label||"neutral");assert.equal(rows[0].pos,entry.pos||"lexical_item");assert.equal(rows[0].syntax,entry.syntax||"lexical_candidate");assert.equal(rows[0].jyutping,entry.jyutping||"");assert.deepEqual(ids(surface),rows.map((row)=>row.id));for(const row of rows){assert.ok(row.jyutping,row.id+": non-empty Jyutping");assert.ok(!seen.has(row.id),row.id+": unique stable ID");seen.add(row.id);}}});

test("explicit reading corrections replace unsupported source candidates",()=>{const expected={"下邊":"haa6 bin1","收到":"sau1 dou2","下下":"haa5 haa5","上年":"soeng6 nin2","不斷":"bat1 dyun6","艾爾頓":"aai6 ji5 deon6","亞視":"aa3 si6","家姐":"gaa1 ze1","捉":"zuk1","膠袋":"gaau1 doi2"};for(const [surface,jyutping] of Object.entries(expected))assert.equal(tokenLexicon[surface].jyutping,jyutping,surface+": reviewed default reading");assert.ok(!readings("收到").some((row)=>row.includes("dou3")));assert.ok(!readings("家姐").some((row)=>row.includes("ze2")));assert.ok(!readings("捉").includes("zuk3"));assert.ok(!readings("膠袋").includes("gaau1 doi6"));});

test("implementation-critical polyfunctionality and reading splits survive",()=>{assert.ok(bandRows("公眾").some((row)=>row.pos==="noun"));assert.ok(bandRows("公眾").some((row)=>row.pos==="adjective"));assert.ok(bandRows("後生").some((row)=>row.pos==="adjective"));assert.ok(bandRows("後生").some((row)=>row.pos==="noun"));assert.ok(bandRows("花").some((row)=>row.pos==="noun"));assert.ok(bandRows("花").some((row)=>row.pos==="verb"));assert.ok(bandRows("花").some((row)=>row.pos==="adjective"));assert.ok(bandRows("花").some((row)=>row.pos==="bound"));assert.ok(bandRows("金").some((row)=>row.pos==="noun"));assert.ok(bandRows("金").some((row)=>row.pos==="bound"));assert.ok(!bandRows("金").some((row)=>row.pos==="adjective"));assert.ok(bandRows("迫").some((row)=>row.pos==="verb"&&row.jyutping==="bik1"));assert.ok(bandRows("迫").some((row)=>row.pos==="adjective"&&row.jyutping==="bik1"));assert.ok(bandRows("迫").some((row)=>row.pos==="verb"&&row.jyutping==="baak1"));assert.deepEqual(new Set(readings("唔好意思")),new Set(["m4 hou2 ji3 si1","m4 hou2 ji3 si3"]));assert.deepEqual(new Set(readings("純粹")),new Set(["seon4 seoi5","seon4 seoi6"]));assert.ok(readings("著").includes("zyu3"));assert.ok(readings("著").includes("zoek3"));assert.ok(readings("著").includes("zoek6"));assert.ok(readings("寧願").includes("ning4 jyun2"));assert.ok(readings("寧願").includes("ning4 jyun6"));assert.ok(readings("數").includes("sou2"));assert.ok(readings("數").includes("sou3"));});

test("earlier protected high-value analyses survive band composition",()=>{assert.deepEqual(ids("住"),["lex:住:residence_verb","lex:住:durative_marker"]);assert.deepEqual(ids("咪"),["lex:咪:prohibitive_marker","lex:咪:discourse_focus_marker","lex:咪:study_verb"]);assert.deepEqual(new Set(readings("魚")),new Set(["jyu2","jyu4"]));assert.deepEqual(new Set(readings("直行")),new Set(["zik6 haang4","zik6 hong4"]));assert.equal(analyses["喀"][0].jyutping,"haak1");});
