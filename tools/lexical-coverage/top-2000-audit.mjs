#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const CifuPath = process.argv.find((arg) => arg.startsWith("--source="))?.slice("--source=".length);
const APPLY_R1 = process.argv.includes("--apply-r1");

if (!CifuPath) {
  throw new Error("Usage: node tools/lexical-coverage/top-2000-audit.mjs --source=/path/to/Cifu-v1.txt [--apply-r1]");
}

const CIFI_COMMIT = "8d5e4903e419193f903823880a7815712072cc80";
const TARGET_VERSION = "0.5.227";

const R1_ADDITIONS = Object.freeze({
  "src/runtime-resources/lexicon/token-lexicon/places-and-times.js": [
    ["中間", { label: "where", jyutping: "zung1 gaan1", syntax: "place_or_goal spatial_localizer", note: "middle / between; Cifu spoken top-2000 R1 lexical audit." }],
    ["下面", { label: "where", jyutping: "haa6 min6", syntax: "place_or_goal spatial_localizer", note: "below / underneath; Cifu spoken top-2000 R1 lexical audit." }],
    ["沙漠", { label: "where", jyutping: "saa1 mok6", syntax: "place_or_goal", note: "desert; Cifu spoken top-2000 R1 lexical audit." }],
    ["終點", { label: "where", jyutping: "zung1 dim2", syntax: "place_or_goal", note: "endpoint / destination / terminus; Cifu spoken top-2000 R1 lexical audit." }],
    ["山", { label: "where", jyutping: "saan1", syntax: "place_or_goal", note: "mountain / hill; Cifu spoken top-2000 R1 lexical audit." }],
    ["園", { label: "where", jyutping: "jyun4", syntax: "place_or_goal", note: "garden; Cifu spoken top-2000 R1 lexical audit." }],
    ["池", { label: "where", jyutping: "ci4", syntax: "place_or_goal", note: "pond / pool; Cifu spoken top-2000 R1 lexical audit." }],
    ["茅屋", { label: "where", jyutping: "maau4 uk1", syntax: "place_or_goal", note: "cottage / hut; Cifu spoken top-2000 R1 lexical audit." }],
    ["頭先", { label: "when", jyutping: "tau4 sin1", syntax: "temporal_adjunct", note: "just now / a moment ago; Cifu spoken top-2000 R1 lexical audit." }],
    ["右邊", { label: "where", jyutping: "jau6 bin1", syntax: "place_or_goal spatial_localizer", note: "right side; Cifu spoken top-2000 R1 lexical audit." }],
    ["一路", { label: "when", jyutping: "jat1 lou6", syntax: "temporal_adjunct", note: "continually / all along; Cifu spoken top-2000 R1 lexical audit." }],
    ["一直", { label: "when", jyutping: "jat1 zik6", syntax: "temporal_adjunct", note: "continuously / all along; Cifu spoken top-2000 R1 lexical audit." }],
    ["左邊", { label: "where", jyutping: "zo2 bin1", syntax: "place_or_goal spatial_localizer", note: "left side; Cifu spoken top-2000 R1 lexical audit." }],
    ["港", { label: "where", jyutping: "gong2", syntax: "place_or_goal", note: "port / harbor; Hong Kong abbreviation in context; Cifu spoken top-2000 R1 lexical audit." }],
    ["湖", { label: "where", jyutping: "wu4", syntax: "place_or_goal", note: "lake; Cifu spoken top-2000 R1 lexical audit." }],
    ["洞", { label: "where", jyutping: "dung6", syntax: "place_or_goal", note: "cave / hole; Cifu spoken top-2000 R1 lexical audit." }],
    ["點鐘", { label: "when", jyutping: "dim2 zung1", syntax: "time_np clock_time_unit", note: "o'clock / clock-hour expression; Cifu spoken top-2000 R1 lexical audit." }],
    ["廟", { label: "where", jyutping: "miu6", syntax: "place_or_goal place_np", note: "temple; Cifu spoken top-2000 R1 lexical audit." }],
  ],
  "src/runtime-resources/lexicon/token-lexicon/things.js": [
    ["線", { label: "what", jyutping: "sin3", syntax: "object_np", note: "line / string / wire; Cifu spoken top-2000 R1 lexical audit." }],
    ["樹", { label: "what", jyutping: "syu6", syntax: "object_np", note: "tree; Cifu spoken top-2000 R1 lexical audit." }],
    ["政府", { label: "what", jyutping: "zing3 fu2", syntax: "organization_np object_np", note: "government; Cifu spoken top-2000 R1 lexical audit." }],
    ["塔", { label: "what", jyutping: "taap3", syntax: "object_np", note: "tower / pagoda; Cifu spoken top-2000 R1 lexical audit." }],
    ["馬戲", { label: "what", jyutping: "maa5 hei3", syntax: "object_np", note: "circus; Cifu spoken top-2000 R1 lexical audit." }],
    ["角", { label: "what", jyutping: "gok3", syntax: "object_np", note: "angle / corner / horn; Cifu spoken top-2000 R1 lexical audit." }],
    ["韻", { label: "what", jyutping: "wan6", syntax: "object_np linguistic_term_np", note: "rhyme / rime; Cifu spoken top-2000 R1 lexical audit." }],
  ],
  "src/runtime-resources/lexicon/token-lexicon/verbs.js": [
    ["知道", { label: "doing", jyutping: "zi1 dou3", syntax: "cognition_verb", note: "know / be aware of; Cifu spoken top-2000 R1 lexical audit." }],
    ["繼續", { label: "doing", jyutping: "gai3 zuk6", syntax: "verb", note: "continue / proceed; Cifu spoken top-2000 R1 lexical audit." }],
    ["恨", { label: "doing", jyutping: "han6", syntax: "verb attitude_verb", note: "hate / regret / long for; Cifu spoken top-2000 R1 lexical audit." }],
    ["交叉", { label: "doing", jyutping: "gaau1 caa1", syntax: "verb", note: "cross / intersect; Cifu spoken top-2000 R1 lexical audit." }],
  ],
  "src/runtime-resources/lexicon/token-lexicon/statives.js": [
    ["香", { label: "like", jyutping: "hoeng1", syntax: "stative_predicate sensory_property", note: "fragrant / aromatic; Cifu spoken top-2000 R1 lexical audit." }],
    ["善", { label: "like", jyutping: "sin6", syntax: "stative_predicate evaluative_property", note: "good / benevolent; Cifu spoken top-2000 R1 lexical audit." }],
  ],
  "src/runtime-resources/lexicon/token-lexicon/function-words-and-particles.js": [
    ["其實", { label: "how", jyutping: "kei4 sat6", syntax: "discourse_adverb stance_adverb", note: "actually / in fact; Cifu spoken top-2000 R1 lexical audit." }],
    ["譬如", { label: "func", jyutping: "pei3 jyu4", syntax: "example_introducer discourse_marker", note: "for example / for instance / such as; Cifu spoken top-2000 R1 lexical audit." }],
    ["但", { label: "func", jyutping: "daan6", syntax: "connector_contrast", note: "but / however; Cifu spoken top-2000 R1 lexical audit." }],
    ["亦", { label: "how", jyutping: "jik6", syntax: "additive_adverb focus_adverb", note: "also / too; Cifu spoken top-2000 R1 lexical audit." }],
  ],
});

const R1_ADDITION_FORMS = Object.freeze(Object.values(R1_ADDITIONS).flat().map(([form]) => form));
if (new Set(R1_ADDITION_FORMS).size !== 35) throw new Error("R1 addition inventory must contain 35 unique forms");

const TOKEN_MODULES = Object.freeze([
  "people-and-address",
  "referents-and-boundaries",
  "things",
  "places-and-times",
  "verbs",
  "statives",
  "function-words-and-particles",
  "degree-and-formulas",
  "study-suite",
]);

const VERIFIED_VARIANTS = Object.freeze({
  // R1 deliberately does not infer broad Traditional/Simplified or colloquial spelling
  // equivalence. Add only explicit reviewed crosswalks here in later revisions.
});

function readCifu(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const header = lines[0].split("\t");
  const ix = Object.fromEntries(header.map((name, index) => [name, index]));
  for (const required of ["Word", "SpokenAdult", "JyutPing", "Definition", "Structure"]) {
    if (!(required in ix)) throw new Error(`Cifu column missing: ${required}`);
  }
  const byForm = new Map();
  for (const line of lines.slice(1)) {
    const cols = line.split("\t");
    const word = (cols[ix.Word] || "").trim();
    const spoken = Number.parseInt(cols[ix.SpokenAdult] || "0", 10);
    if (!word || !Number.isFinite(spoken) || spoken <= 0) continue;
    const record = {
      word,
      spoken,
      jyutping: (cols[ix.JyutPing] || "").trim(),
      definition: (cols[ix.Definition] || "").trim(),
      structure: (cols[ix.Structure] || "").trim(),
    };
    const prior = byForm.get(word);
    if (!prior || record.spoken > prior.spoken) byForm.set(word, record);
  }
  const ranked = [...byForm.values()]
    .sort((a, b) => b.spoken - a.spoken || a.word.localeCompare(b.word, "zh-Hant"))
    .slice(0, 2000)
    .map((record, index) => ({ ...record, rank: index + 1 }));
  if (ranked.length !== 2000) throw new Error(`Expected 2000 ranked forms, got ${ranked.length}`);
  return ranked;
}

function clearTokenModuleCache() {
  for (const name of TOKEN_MODULES) {
    const file = path.join(ROOT, "src/runtime-resources/lexicon/token-lexicon", `${name}.js`);
    try { delete require.cache[require.resolve(file)]; } catch {}
  }
}

function loadRuntimeLexicon() {
  clearTokenModuleCache();
  const direct = new Map();
  for (const name of TOKEN_MODULES) {
    const file = path.join(ROOT, "src/runtime-resources/lexicon/token-lexicon", `${name}.js`);
    for (const [form, meta = {}] of require(file)) {
      if (!direct.has(form)) direct.set(form, []);
      direct.get(form).push({ module: `${name}.js`, ...meta });
    }
  }
  const forms = [...direct.keys()].filter(Boolean).sort((a, b) => b.length - a.length || a.localeCompare(b, "zh-Hant"));
  return { direct, forms };
}

function segmentForm(surface, forms) {
  const memo = new Map();
  function go(index) {
    if (index === surface.length) return [];
    if (memo.has(index)) return memo.get(index);
    for (const form of forms) {
      if (!surface.startsWith(form, index)) continue;
      const rest = go(index + form.length);
      if (rest) return [form, ...rest];
    }
    memo.set(index, null);
    return null;
  }
  const result = go(0);
  return result && result.length > 1 ? result : null;
}

function normalizedReading(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function classify(ranked, runtime) {
  return ranked.map((record) => {
    let runtimeStatus = "missing";
    let auditNote = "";
    let runtimeModule = "";
    let runtimeJyutping = "";
    let runtimeMeta = "";
    const direct = runtime.direct.get(record.word);
    if (direct) {
      runtimeModule = [...new Set(direct.map((item) => item.module))].join(";");
      runtimeJyutping = [...new Set(direct.map((item) => item.jyutping).filter(Boolean))].join(";");
      runtimeMeta = [...new Set(direct.map((item) => [item.label, item.syntax].filter(Boolean).join(":")))].join(";");
      const cifuReading = normalizedReading(record.jyutping);
      const runtimeReading = normalizedReading(runtimeJyutping);
      runtimeStatus = cifuReading && runtimeReading && !(cifuReading.includes(runtimeReading) || runtimeReading.includes(cifuReading))
        ? "surface_covered_sense_uncertain"
        : "covered_main";
    } else if (VERIFIED_VARIANTS[record.word] && runtime.direct.has(VERIFIED_VARIANTS[record.word])) {
      runtimeStatus = "covered_variant";
      auditNote = `verified_variant_of=${VERIFIED_VARIANTS[record.word]}`;
    } else if ((record.jyutping || "").startsWith("*") || record.definition === "NO DEF") {
      runtimeStatus = "manual_review";
      auditNote = "cifu_generated_or_undefined";
    } else {
      const segments = segmentForm(record.word, runtime.forms);
      if (segments) {
        runtimeStatus = "handled_structurally";
        auditNote = `lexically_segmentable_as=${segments.join("+")};not_proof_of_construction_analysis`;
      }
    }
    return { ...record, runtimeStatus, auditNote, runtimeModule, runtimeJyutping, runtimeMeta };
  });
}

function summarize(rows) {
  const counts = {
    covered_main: 0,
    covered_variant: 0,
    handled_structurally: 0,
    surface_covered_sense_uncertain: 0,
    missing: 0,
    manual_review: 0,
  };
  for (const row of rows) counts[row.runtimeStatus] = (counts[row.runtimeStatus] || 0) + 1;
  return counts;
}

function applyR1Additions() {
  for (const [relativeFile, entries] of Object.entries(R1_ADDITIONS)) {
    const file = path.join(ROOT, relativeFile);
    let text = fs.readFileSync(file, "utf8");
    const lines = [];
    for (const [form, meta] of entries) {
      if (text.includes(`["${form}",`)) continue;
      lines.push(`  [${JSON.stringify(form)}, ${JSON.stringify(meta)}],`);
    }
    if (!lines.length) continue;
    if (!/\n\];\s*$/.test(text)) throw new Error(`Unexpected module ending: ${relativeFile}`);
    text = text.replace(/\n\];\s*$/, `\n\n  // v${TARGET_VERSION}: source-audited high-frequency lexical coverage.\n${lines.join("\n")}\n];\n`);
    fs.writeFileSync(file, text);
  }
}

function bumpRuntimeVersion() {
  for (const relative of ["package.json", "package-lock.json"]) {
    const file = path.join(ROOT, relative);
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    if (json.version === "0.5.226" || json.version === TARGET_VERSION) json.version = TARGET_VERSION;
    if (json.packages?.[""] && (json.packages[""].version === "0.5.226" || json.packages[""].version === TARGET_VERSION)) {
      json.packages[""].version = TARGET_VERSION;
    }
    fs.writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
  }

  const manifestFile = path.join(ROOT, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
  manifest.version = TARGET_VERSION;
  manifest.description = `v${TARGET_VERSION} adds 35 source-audited high-frequency Cantonese lexical entries from the Cifu spoken top-2000 audit without broadening grammar.`;
  fs.writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`);

  const pluginFile = path.join(ROOT, "src/plugin-entry.js");
  let plugin = fs.readFileSync(pluginFile, "utf8");
  plugin = plugin.replace('CANTO_SPAN_RUNTIME_VERSION = "0.5.226"', `CANTO_SPAN_RUNTIME_VERSION = "${TARGET_VERSION}"`);
  if (!plugin.includes(`// v${TARGET_VERSION}:`)) {
    plugin = plugin.replace("// v0.5.226:", `// v${TARGET_VERSION}: adds 35 source-audited high-frequency lexical entries from the Cifu spoken top-2000 audit without changing construction identity, status, or grammar scope.\n// v0.5.226:`);
  }
  fs.writeFileSync(pluginFile, plugin);

  const stateFile = path.join(ROOT, "docs/current/PROJECT-STATE.md");
  let state = fs.readFileSync(stateFile, "utf8");
  state = state.replace("| Runtime | v0.5.226 |", `| Runtime | v${TARGET_VERSION} |`);
  const consequence = `- v${TARGET_VERSION} adds 35 independently supported high-frequency lexical entries identified by the Cifu spoken top-2000 audit; compositional corpus strings and grammar-sensitive, variant, or sense-ambiguous forms remain explicit review buckets rather than being lexicalized merely to improve a coverage percentage, and no construction identity, linguistic status, evidence, survey, corpus, release, or deployment state is changed;`;
  if (!state.includes(consequence)) state = state.replace("Current consequences include:\n", `Current consequences include:\n\n${consequence}\n`);
  fs.writeFileSync(stateFile, state);
}

function cleanCell(value) {
  return String(value ?? "").replace(/\t/g, " ").replace(/\r?\n/g, " ").trimEnd();
}

function writeTsv(rows) {
  const header = [
    "rank", "word", "cifu_spoken_adult", "cifu_jyutping", "cifu_definition", "cifu_structure",
    "runtime_status", "audit_note", "runtime_module", "runtime_jyutping", "runtime_meta",
  ];
  const lines = [header.join("\t")];
  for (const row of rows) {
    const values = [
      row.rank, row.word, row.spoken, row.jyutping, row.definition, row.structure,
      row.runtimeStatus, row.auditNote, row.runtimeModule, row.runtimeJyutping, row.runtimeMeta || "-",
    ].map(cleanCell);
    if (values.length !== header.length) throw new Error("TSV column mismatch");
    lines.push(values.join("\t"));
  }
  const outDir = path.join(ROOT, "data/lexical-frequency");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "cifu-spoken-top-2000.tsv"), `${lines.join("\n")}\n`);
}

function mdCell(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function table(rows, limit) {
  return rows.slice(0, limit).map((row) =>
    `| ${row.rank} | ${mdCell(row.word)} | ${row.spoken} | ${mdCell(row.jyutping)} | ${mdCell(row.definition)} | ${mdCell(row.auditNote)} |`,
  ).join("\n");
}

function writeReport(beforeCounts, afterCounts, rows) {
  const missing = rows.filter((row) => row.runtimeStatus === "missing");
  const manual = rows.filter((row) => row.runtimeStatus === "manual_review");
  const structural = rows.filter((row) => row.runtimeStatus === "handled_structurally");
  const report = `# Top-2000 spoken Cantonese lexical coverage audit — R1\n\n` +
`## Method\n\n` +
`Frequency source: Lai & Winterstein's Cifu v1, pinned at \`${CIFI_COMMIT}\`, ranked by integer \`SpokenAdult\` frequency. The list keeps exactly the 2,000 highest-frequency unique non-empty forms with positive adult-spoken frequency. Cifu is a Hong Kong Cantonese frequency lexicon and includes separate adult-spoken, child-spoken, child-directed, and written frequency measures; this audit uses only the adult-spoken column. The result is therefore a reproducible Cifu spoken-adult ranking, not a claim that one universal Cantonese top-2000 list exists.\n\n` +
`Cifu supplies the ranking, Jyutping, definition, and structure fields. Wiktionary is used only as secondary lexical verification. R1 spot-checks independently corroborated 中間 \`zung1 gaan1\`, 頭先 \`tau4 sin1\`, 知道 \`zi1 dou3\`, 繼續 \`gai3 zuk6\`, 其實 \`kei4 sat6\`, 譬如 \`pei3 jyu4\`, 洞 \`dung6\`, and 點鐘 \`dim2 zung1\`.\n\n` +
`Coverage is surface-sensitive. \`covered_main\` means an exact token-lexicon surface exists with a compatible reading. \`covered_variant\` is reserved for explicit reviewed variant crosswalks and is not inferred automatically. \`handled_structurally\` means the Cifu surface can be fully segmented into existing runtime lexical tokens; it does **not** prove that the parser has the right construction analysis. \`surface_covered_sense_uncertain\` preserves direct surfaces whose reading correspondence is not clean. Cifu-generated/undefined forms remain \`manual_review\`. Everything else is a lexical-gap candidate, not an automatic bulk-import list.\n\n` +
`## Coverage before same-task R1 additions\n\n${Object.entries(beforeCounts).map(([name, count]) => `- \`${name}\`: **${count}**`).join("\n")}\n\n` +
`## Coverage after same-task R1 additions\n\n${Object.entries(afterCounts).map(([name, count]) => `- \`${name}\`: **${count}**`).join("\n")}\n\n` +
`## Same-task lexical additions (${R1_ADDITION_FORMS.length})\n\n${R1_ADDITION_FORMS.map((form) => `- \`${form}\``).join("\n")}\n\n` +
`These additions use existing broad lexical categories only. Frequency does not establish a construction, grammatical productivity, a preferred parse, or a status promotion. Grammar-sensitive particles, multi-reading forms, uncertain orthographic variants, and compositional corpus strings remain outside this batch even when frequent.\n\n` +
`## Highest-frequency remaining lexical-gap candidates\n\n| Rank | Form | Count | Jyutping | Cifu definition | Audit note |\n|---:|---|---:|---|---|---|\n${table(missing, 250)}\n\n` +
`## Highest-frequency manual-review forms\n\n| Rank | Form | Count | Jyutping | Cifu definition | Audit note |\n|---:|---|---:|---|---|---|\n${table(manual, 120)}\n\n` +
`## Highest-frequency structurally segmentable forms\n\n| Rank | Form | Count | Jyutping | Cifu definition | Audit note |\n|---:|---|---:|---|---|---|\n${table(structural, 120)}\n\n` +
`## Interpretation\n\nThe mismatch count is deliberately conservative. Frequent corpus tokens include classifier phrases, negated/result strings, directional compounds, discourse fragments, and other strings that should not be lexicalized merely to raise a percentage. Conversely, independently supportable standalone words are added in the same task when they fit an existing lexical category without inventing grammar. The TSV preserves every ranked form and its audit disposition for subsequent lexical review.\n`;
  fs.writeFileSync(path.join(ROOT, "docs/research/LEXICAL-COVERAGE-TOP-2000-R1.md"), report);
}

const ranked = readCifu(CifuPath);
const beforeRuntime = loadRuntimeLexicon();
const beforeRows = classify(ranked, beforeRuntime);
const beforeCounts = summarize(beforeRows);

if (APPLY_R1) {
  applyR1Additions();
  bumpRuntimeVersion();
}

const afterRuntime = loadRuntimeLexicon();
const afterRows = classify(ranked, afterRuntime);
const afterCounts = summarize(afterRows);
writeTsv(afterRows);
writeReport(beforeCounts, afterCounts, afterRows);

console.log(JSON.stringify({
  sourceCommit: CIFI_COMMIT,
  rankedForms: ranked.length,
  appliedR1: APPLY_R1,
  r1AdditionCount: R1_ADDITION_FORMS.length,
  beforeCounts,
  afterCounts,
  topRemainingMissing: afterRows.filter((row) => row.runtimeStatus === "missing").slice(0, 30).map((row) => [row.rank, row.word]),
}, null, 2));
