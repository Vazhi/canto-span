#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8")


def write(rel, text):
    (ROOT / rel).write_text(text, encoding="utf-8")


def require(condition, message):
    if not condition:
        raise SystemExit(message)

# 1. Separate discovery readings from accepted Cantonese authority.
rel = "src/runtime-resources/lexicon/token-lexicon/vernacular-component-coverage.js"
text = read(rel)
require('const READINGS = Object.freeze({' in text, "component reading object anchor missing")
text = text.replace('const READINGS = Object.freeze({', 'const DISCOVERY_READINGS = Object.freeze({', 1)
old_header = 'const DICTIONARY_VERIFIED_SURFACES = new Set(["丫", "唓", "喔", "尷", "氛", "瑩", "痴", "薛", "訓", "訝", "輝"]);\nconst DICTIONARY_SOURCE = "粵音資料集叢 / established Cantonese reading references";'
require(old_header in text, "old component authority header missing")
text = text.replace(old_header, '''const RIME_REVISION = "259f0e48bba840c3a2e0d117539e96937f3d89bc";
const RIME_SOURCE = "Rime-Cantonese jyut6ping3.chars.dict.yaml";''', 1)
new_tail = r'''const RIME_NORMALIZED_OVERRIDES = Object.freeze({
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
'''
pattern = re.compile(r'function applyVernacularComponentCoverage\(entries\) \{.*?module\.exports = Object\.freeze\(\{.*?\}\);\s*$', re.S)
require(pattern.search(text), "component tail anchor missing")
text = pattern.sub(new_tail, text)
write(rel, text)

# 2. Preserve the contextual 爸 reading split in explicit analyses.
rel = "src/runtime-resources/lexicon/token-lexicon/explicit-analyses.js"
text = read(rel)
anchor = 'const vernacularSourceAnalyses = Object.freeze({\n  "嘅": Object.freeze(['
require(anchor in text, "explicit-analysis insertion anchor missing")
if 'lex:爸:character_or_compound_baa1' not in text:
    dad = '''const vernacularSourceAnalyses = Object.freeze({
  "爸": Object.freeze([
    Object.freeze({
      id: "lex:爸:default",
      label: "who",
      pos: "noun",
      jyutping: "baa4",
      syntax: "kinship_person_np kinship_term",
      senses: Object.freeze([{ gloss: "dad / father; ordinary standalone Guangzhou reading" }]),
      provenance: Object.freeze({ kind: "reference_dictionary_cantonese_reading", source: "廣州話正音字典 via 粵音資料集叢" }),
    }),
    Object.freeze({
      id: "lex:爸:character_or_compound_baa1",
      label: "who",
      pos: "noun",
      jyutping: "baa1",
      syntax: "kinship_person_np kinship_term character_or_compound_reading",
      senses: Object.freeze([{ gloss: "father; character/compound reading, including 爸媽 contexts" }]),
      provenance: Object.freeze({ kind: "reference_dictionary_cantonese_reading", source: "廣州話正音字典 via 粵音資料集叢" }),
    }),
  ]),
  "嘅": Object.freeze(['''
    text = text.replace(anchor, dad, 1)
write(rel, text)

# 3. Make the Dad note reflect the evidence/candidate distinction.
rel = "src/runtime-resources/lexicon/token-lexicon/lexical-coverage-additions.js"
text = read(rel)
old = 'note: "dad / father; ordinary vernacular Cantonese reading baa4. The source Sheet\'s standalone ba1 value is not used as runtime authority.",'
new = 'note: "dad / father; ordinary standalone Guangzhou reading baa4. baa1 is independently supported as a character/compound reading; the Sheet\'s raw ba1 remains a discovery pronunciation candidate rather than runtime authority.",'
require(old in text, "Dad lexical note anchor missing")
text = text.replace(old, new, 1)
write(rel, text)

# 4. Do not materialize unsupported source-only 多少 as neutral runtime coverage.
rel = "src/runtime-resources/lexicon/token-lexicon/frequency-gap-fill-r7.js"
text = read(rel)
lines = text.splitlines(True)
kept = [line for line in lines if not re.search(r'^\s*\["多少",\s*\{', line)]
require(len(kept) == len(lines) - 1, "expected exactly one neutral 多少 fallback row")
write(rel, ''.join(kept))

# 5. Replace historical/migration tests with recurring reviewed-band invariants.
write("tests/tooling/lexicon/cifu-r1251-1500-reviewed-runtime.test.js", r'''#!/usr/bin/env node
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
''')

write("tests/tooling/lexicon/cifu-r1751-2000-reviewed-runtime.test.js", r'''#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");const fs=require("node:fs");const path=require("node:path");const test=require("node:test");
const tokenEntries=require("../../../src/runtime-resources/lexicon/token-lexicon");const reviewed=require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1751-2000-reviewed");const {buildLexicalAnalysisIndex}=require("../../../src/runtime-resources/lexicon/lexical-analyses");
const root=path.resolve(__dirname,"../../..");const tokenLexicon=Object.fromEntries(tokenEntries);const analyses=buildLexicalAnalysisIndex(tokenEntries);const dynamic=reviewed.buildExplicitAnalyses(tokenEntries);
function cifuRows(){const lines=fs.readFileSync(path.join(root,"data","lexical-frequency","cifu-spoken-top-2000.tsv"),"utf8").replace(/^\uFEFF/u,"").trimEnd().split(/\r?\n/u);const header=lines.shift().split("\t");const ix=Object.fromEntries(header.map((n,i)=>[n,i]));return lines.map((line)=>{const row=line.split("\t");return{rank:Number(row[ix.rank]),surface:row[ix.word]};});}
function bandRowsFromCifu(){return cifuRows().filter((r)=>r.rank>=1751&&r.rank<=2000);}function bandRows(surface){return(analyses[surface]||[]).slice(1).filter((r)=>r.provenance&&r.provenance.source===reviewed.SOURCE);}function readings(surface){return(analyses[surface]||[]).map((r)=>r.jyutping);}

test("final-band authority classes are disjoint and cover the source band",()=>{const rows=bandRowsFromCifu();assert.equal(rows.length,250);assert.equal(new Set(rows.map((r)=>r.surface)).size,250);const sets=[new Set(Object.keys(reviewed.PROMOTIONS)),reviewed.MULTI_SURFACES,reviewed.READING_SPLIT_SURFACES,reviewed.BLOCKED_ATOMIC_SURFACES,reviewed.RESEARCH_REQUIRED_SURFACES];const union=new Set();for(const set of sets)for(const surface of set){assert.ok(!union.has(surface),surface+": class overlap");union.add(surface);}assert.deepEqual(union,new Set(rows.map((r)=>r.surface)));});

test("broad reviewed rows are typed without flattening richer defaults",()=>{for(const [surface,promotion] of Object.entries(reviewed.PROMOTIONS)){const entry=tokenLexicon[surface];assert.ok(entry,surface+": entry exists");assert.ok(!reviewed.isNeutralLexicalEntry(entry),surface+": broad reviewed row typed");if(entry.provenance&&entry.provenance.source===reviewed.SOURCE&&entry.provenance.kind==="reviewed_lexical_promotion"){assert.equal(entry.label,promotion.label);assert.equal(entry.pos,promotion.pos);assert.equal(entry.syntax,promotion.syntax);}}});

test("held and blocked rows receive no band-specific atomic fact",()=>{for(const surface of [...reviewed.RESEARCH_REQUIRED_SURFACES,...reviewed.BLOCKED_ATOMIC_SURFACES]){assert.ok(!dynamic[surface],surface+": no reviewed alternative set");const entry=tokenLexicon[surface];if(entry)assert.ok(!(entry.provenance&&entry.provenance.source===reviewed.SOURCE),surface+": no band default typing");}});

test("reviewed alternative surfaces preserve default first and stable nonempty IDs",()=>{assert.deepEqual(new Set(Object.keys(dynamic)),new Set(Object.keys(reviewed.ALTERNATIVE_SPECS)));const seen=new Set();for(const [surface,rows] of Object.entries(dynamic)){assert.ok(rows.length>=2,surface+": default plus alternatives");assert.equal(rows[0].id,"lex:"+surface+":default");for(const row of rows){assert.ok(row.jyutping,row.id+": nonempty Jyutping");assert.ok(!seen.has(row.id),row.id+": unique");seen.add(row.id);}}});

test("high-risk reading corrections replace rejected packet candidates",()=>{const expected={"拃":"zaa6","校":"haau6","梗":"gang2","第時":"dai6 si4","細妹":"sai3 mui2","黏":"nim4","出邊":"ceot1 bin6","全名":"cyun4 meng2","同樣":"tung4 joeng6","有份":"jau5 fan2","判斷":"pun3 dyun3","兔仔":"tou3 zai2","界定":"gaai3 deng6","紅籌":"hung4 cau2","孭":"me1","偈":"gai2","梳打":"so1 daa2","硬係":"ngaang2 hai6","傾計":"king1 gai2","嘴":"zeoi2","撈":"lou1"};for(const [surface,jyutping] of Object.entries(expected))assert.equal(tokenLexicon[surface].jyutping,jyutping,surface+": default reading");assert.ok(!readings("判斷").includes("pun3 tyun5"));assert.ok(!readings("兔仔").some((j)=>/zi2$/u.test(j)));assert.ok(!readings("界定").includes("gaai3 ding6"));assert.ok(!readings("傾計").includes("king1 gai3"));assert.ok(!readings("撈").includes("lou4"));});

test("critical polyfunctionality and reading splits survive as reviewed",()=>{const has=(surface,pos,jyutping)=>bandRows(surface).some((row)=>row.pos===pos&&(!jyutping||row.jyutping===jyutping));assert.ok(has("校","noun","haau6"));assert.ok(has("校","verb","gaau3"));assert.ok(has("文","noun","man4"));assert.ok(has("文","classifier","man1"));assert.ok(has("文","verb","man6"));assert.ok(has("和","function","wo4"));assert.ok(has("和","verb","wo6"));assert.ok(has("和","verb","wu2"));assert.ok(has("量","verb","loeng4"));assert.ok(has("量","noun","loeng6"));assert.ok(has("傳","verb","cyun4"));assert.ok(has("傳","noun","zyun6"));assert.ok(has("悶","adjective","mun6"));assert.ok(has("悶","verb","mun6"));assert.ok(has("旅遊","verb","leoi5 jau4"));assert.ok(has("旅遊","noun","leoi5 jau4"));assert.ok(has("撈","verb","lou1"));assert.ok(has("撈","verb","laau4"));assert.equal(tokenLexicon["嘴"].pos,"noun");assert.ok(!(analyses["嘴"]||[]).some((row)=>row.pos==="classifier"));});

test("unsupported imported analyses are absent for retained Cantonese surfaces",()=>{assert.notEqual(tokenLexicon["在"].syntax,"progressive_marker");assert.ok(!(analyses["校"]||[]).some((row)=>row.pos==="classifier"));assert.ok(!(analyses["嘴"]||[]).some((row)=>row.pos==="classifier"));});

test("earlier protected analyses survive final-band composition",()=>{assert.deepEqual((analyses["住"]||[]).map((r)=>r.id),["lex:住:residence_verb","lex:住:durative_marker"]);assert.ok((analyses["響"]||[]).some((r)=>r.pos==="coverb"));});
''')

# 6. Replace the migration-count component test with recurring authority invariants.
rel = "tests/tooling/lexicon/vernacular-component-coverage.test.js"
text = read(rel)
old_import = 'const { READINGS, applyVernacularComponentCoverage } = require("../../../src/runtime-resources/lexicon/token-lexicon/vernacular-component-coverage");'
new_import = '''const {
  ACCEPTED_READINGS,
  DISCOVERY_READING_CANDIDATES,
  ORTHOGRAPHIC_VARIANT_READINGS,
  RIME_SOURCE,
  RIME_REVISION,
  applyVernacularComponentCoverage,
} = require("../../../src/runtime-resources/lexicon/token-lexicon/vernacular-component-coverage");'''
require(old_import in text, "vernacular test import anchor missing")
text = text.replace(old_import, new_import, 1)
first = re.compile(r'test\("source-backed vernacular reading batch contains exactly 284 simple single-character readings", \(\) => \{.*?\n\}\);\n', re.S)
replacement = r'''test("accepted component readings are single-character Jyutping with explicit authority", () => {
  assert.ok(Object.keys(ACCEPTED_READINGS).length > 0);
  for (const [surface, jyutping] of Object.entries(ACCEPTED_READINGS)) {
    assert.equal(Array.from(surface).length, 1, `${surface}: single-character component`);
    assert.match(jyutping, /^[a-z]+[1-6]$/u, `${surface}: valid Jyutping`);
    assert.ok(tokenLexicon[surface], `${surface}: runtime entry exists`);
    assert.ok(tokenLexicon[surface].jyutping, `${surface}: runtime has a reading`);
  }
  assert.equal(ACCEPTED_READINGS["傷"], "soeng1");
  assert.equal(ACCEPTED_READINGS["嫁"], "gaa3");
});

test("accepted-reading overlay writes truthful authority provenance when filling a blank", () => {
  const sample = [["世", { label: "what", pos: "noun", syntax: "common_noun", jyutping: "", provenance: { kind: "older_semantic_source", source: "example" } }]];
  const out = Object.fromEntries(applyVernacularComponentCoverage(sample));
  assert.equal(out["世"].jyutping, "sai3");
  assert.equal(out["世"].provenance.kind, "pinned_cantonese_pronunciation_authority");
  assert.equal(out["世"].provenance.source, RIME_SOURCE);
  assert.equal(out["世"].provenance.revision, RIME_REVISION);
  assert.equal(out["世"].provenance.prior_provenance.kind, "older_semantic_source");
});

test("discovery-only pronunciation candidates never become accepted runtime readings", () => {
  assert.equal(DISCOVERY_READING_CANDIDATES["爸"].jyutping, "ba1");
  assert.equal(ACCEPTED_READINGS["爸"], undefined);
  const analyses = buildLexicalAnalysisIndex(tokenEntries);
  assert.equal(tokenLexicon["爸"].jyutping, "baa4");
  assert.deepEqual(new Set((analyses["爸"] || []).map((row) => row.jyutping)), new Set(["baa4", "baa1"]));
  assert.ok(!(analyses["爸"] || []).some((row) => row.jyutping === "ba1"));
});

test("orthographic substitutions are admitted as variants rather than character readings", () => {
  for (const surface of ["既", "广", "哂", "跙"]) {
    const variant = ORTHOGRAPHIC_VARIANT_READINGS[surface];
    assert.ok(variant, `${surface}: reviewed variant record`);
    assert.equal(ACCEPTED_READINGS[surface], variant.jyutping);
    assert.ok(variant.canonical, `${surface}: canonical mapping`);
  }
});
'''
require(first.search(text), "historical component-count test anchor missing")
text = first.sub(replacement, text, count=1)
text = text.replace('test("first whole-form batch adds four independently supported lexical defaults"', 'test("audited whole-form lexemes retain independently supported defaults"')
text = text.replace('test("verified top-2000 lexical batch fills common whole-form and component gaps"', 'test("common audited lexemes retain reviewed defaults"')
text = text.replace('test("corrected final lexical tail preserves only independently supported alternatives"', 'test("polyfunctional lexical tail preserves independently supported alternatives"')
text = text.replace('test("verified multi-character lexical batch preserves dictionary-level lexicalization"', 'test("multi-character lexemes preserve dictionary-level lexicalization"')
text = text.replace('test("好意思 closes the final in-scope functional top-2000 lexical gap"', 'test("好意思 remains an explicit rhetorical lexical expression"')
old_dad_assert = '  assert.notEqual(tokenLexicon["爸"].jyutping, "ba1", "爸: Sheet romanization does not override verified vernacular baa4");'
require(old_dad_assert in text, "Dad test assertion anchor missing")
text = text.replace(old_dad_assert, '  const dadReadings = new Set((buildLexicalAnalysisIndex(tokenEntries)["爸"] || []).map((row) => row.jyutping));\n  assert.deepEqual(dadReadings, new Set(["baa4", "baa1"]));\n  assert.ok(!dadReadings.has(DISCOVERY_READING_CANDIDATES["爸"].jyutping), "爸: discovery-only ba1 is not runtime authority");', 1)
write(rel, text)

# 7. One-time closure packet is not a permanent invariant.
(ROOT / "tests/tooling/lexicon/top2000-single-character-gap-closure.test.js").unlink(missing_ok=True)

# 8. Retire source-specific contamination ledgers from the active tree.
for rel in [
    "data/lexical-frequency/cifu-explicit-mandarin-contamination.tsv",
    "data/lexical-frequency/cifu-mandarin-contamination-runtime-audit.tsv",
    "data/lexical-frequency/cifu-mandarin-contamination-summary.json",
    "data/lexical-frequency/cifu-mandarin-oriented-adjudication.tsv",
]:
    (ROOT / rel).unlink(missing_ok=True)

print("systemic lexical ingestion repair applied")
