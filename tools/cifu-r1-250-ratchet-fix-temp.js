#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const reviewedPath = path.join(root, "src", "runtime-resources", "lexicon", "token-lexicon", "cifu-r1-250-reviewed.js");
const testPath = path.join(root, "tests", "tooling", "lexicon", "cifu-r1-250-reviewed-runtime.test.js");

let reviewed = fs.readFileSync(reviewedPath, "utf8");
for (const [rank, comment, surface] of [
  [140, 5275634464, "個人"],
  [249, 5275852412, "幾多"],
]) {
  const pattern = new RegExp(`\\n  reviewed\\(${rank}, ${comment}, "${surface}", \\{[\\s\\S]*?\\n  \\}\\),`, "u");
  if (!pattern.test(reviewed)) throw new Error(`Could not locate reviewed base entry for ${surface}`);
  reviewed = reviewed.replace(pattern, "");
}

if (!reviewed.includes('  "幾多": Object.freeze([')) {
  const marker = '  "等": Object.freeze([\n';
  if (!reviewed.includes(marker)) throw new Error("Could not locate 等 analysis insertion point");
  const addition = '  "幾多": Object.freeze([\n'
    + '    analysis(249, 5275852412, "幾多", "interrogative_quantifier", { label: "how", pos: "pronoun", jyutping: "gei2 do1", syntax: "interrogative_quantifier", gloss: "how much / how many", note: "Reviewed lexical analysis candidate; ordinary productive quantity structure remains available and is not forced atomic." }),\n'
    + '  ]),\n';
  reviewed = reviewed.replace(marker, addition + marker);
}
fs.writeFileSync(reviewedPath, reviewed);

let testSource = fs.readFileSync(testPath, "utf8");
testSource = testSource.replace('    ["幾多", ["gei2 do1", "pronoun"]],\n', "");

const analysisMarker = '  assert.ok(ids("咪").has("lex:咪:study_cram_verb"));\n';
if (!testSource.includes('ids("個人").has("lex:個人:individual_noun")')) {
  if (!testSource.includes(analysisMarker)) throw new Error("Could not locate analysis assertion insertion point");
  testSource = testSource.replace(
    analysisMarker,
    analysisMarker
      + '  assert.ok(ids("個人").has("lex:個人:individual_noun"), "個人 lexical noun analysis remains represented without forcing classifier contexts atomic");\n'
      + '  assert.ok(ids("幾多").has("lex:幾多:interrogative_quantifier"), "幾多 interrogative lexical analysis remains represented without forcing quantity structure atomic");\n',
  );
}

const mixedMarker = '  assert.deepEqual(tokenSurfaces("一樣"), ["一", "樣"], "literal bare 一樣 remains compositionally visible by default");\n';
if (!testSource.includes('tokenSurfaces("三個人")')) {
  if (!testSource.includes(mixedMarker)) throw new Error("Could not locate mixed-form assertion insertion point");
  testSource = testSource.replace(
    mixedMarker,
    mixedMarker
      + '  assert.deepEqual(tokenSurfaces("三個人"), ["三", "個", "人"], "reviewed 個人 analysis must not swallow productive numeral-classifier-person structure");\n'
      + '  assert.deepEqual(tokenSurfaces("幾多個字"), ["幾", "多", "個", "字"], "reviewed 幾多 analysis must not swallow productive quantity/classifier structure");\n',
  );
}
fs.writeFileSync(testPath, testSource);
