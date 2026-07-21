#!/usr/bin/env node
'use strict';
const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');

function load() {
  class Plugin {}
  class PluginSettingTab {}
  class Setting {}
  class Notice {}
  const moduleObj = { exports: {} };
  const context = {
    module: moduleObj,
    exports: moduleObj.exports,
    require: (id) => id === 'obsidian' ? { Plugin, PluginSettingTab, Setting, Notice } : require(id),
    console, setTimeout, clearTimeout, Buffer,
  };
  const main = path.join(root, 'main.js');
  vm.runInNewContext(
    fs.readFileSync(main, 'utf8') + `\nmodule.exports.api={analyzeLine,diagnosticFinalRows,diagnosticSummary,rootSpanCoverageForDiagnostic,runtimeVersion:CANTO_SPAN_RUNTIME_VERSION,policyVersion:GRAMMAR_LEGITIMACY_POLICY_VERSION,registry:Array.from(CONSTRUCTION_LABEL_REGISTRY),aliases:INTERNAL_CONSTRUCTION_COMPATIBILITY_ALIASES,grammarLegitimacyFor};`,
    context,
    { filename: main },
  );
  return moduleObj.exports.api;
}

function inspect(api, sentence) {
  const analysis = api.analyzeLine(sentence);
  const rows = api.diagnosticFinalRows(analysis);
  return {
    rows,
    summary: api.diagnosticSummary(analysis),
    coverage: api.rootSpanCoverageForDiagnostic(rows),
    constructions: rows.filter((row) => row.kind === 'construction'),
    tokens: rows.filter((row) => row.kind === 'token'),
  };
}

function sha(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

const api = load();
const checks = [];
const failures = [];
function check(name, fn) {
  try {
    fn();
    checks.push({ name, pass: true });
  } catch (error) {
    checks.push({ name, pass: false, error: error.message });
    failures.push({ name, error: error.message });
  }
}

check('runtime exact', () => assert.strictEqual(api.runtimeVersion, '0.5.182'));
check('policy exact', () => assert.strictEqual(api.policyVersion, '0.5.182'));
check('registry 179 unique', () => {
  assert.strictEqual(api.registry.length, 179);
  assert.strictEqual(new Set(api.registry).size, 179);
});
check('target accepted narrowly', () => {
  assert.strictEqual(api.grammarLegitimacyFor('ResourceUseLaiFunctionRelation').status, 'supported_productive');
});
check('perfective accepted preserved', () => {
  assert.strictEqual(api.grammarLegitimacyFor('PostverbalZoPerfectiveVP').status, 'supported_productive');
});
check('alias preserved', () => {
  assert.strictEqual(api.aliases.ResourceUseLaiFunctionRelation, 'IntendedFunctionRelation');
});

for (const sentence of ['呢個杯用嚟飲水。', '嗰個杯用嚟飲水。', '呢隻杯用嚟飲水。', '嗰隻杯用嚟飲水。']) {
  check(`${sentence} cup noun`, () => {
    const result = inspect(api, sentence);
    const cup = result.tokens.find((token) => token.surface === '杯' && token.role === 'what' && String(token.syntax).includes('head_noun'));
    assert(cup, '杯 noun token missing');
    assert.strictEqual(cup.jyutping, 'bui1');
    assert.strictEqual(result.constructions.filter((row) => row.internal_construction === 'ResourceUseLaiFunctionRelation').length, 1);
  });
}

for (const sentence of ['呢隻杯我用嚟飲水。', '嗰隻杯佢用嚟飲水。', '呢支筆我用嚟寫字。']) {
  check(`${sentence} separate user excluded`, () => {
    const result = inspect(api, sentence);
    assert.strictEqual(result.constructions.filter((row) => row.internal_construction === 'ResourceUseLaiFunctionRelation').length, 0);
    assert(result.constructions.some((row) => row.internal_construction === 'IntendedFunctionRelation'));
    assert(result.tokens.some((token) => token.role === 'who'));
  });
}

check('written 來 loi4', () => {
  const result = inspect(api, '呢張紙用來寫字。');
  const lai = result.tokens.find((token) => token.surface === '來');
  assert(lai);
  assert.strictEqual(lai.jyutping, 'loi4');
});
check('modal boundary', () => {
  const result = inspect(api, '呢個可以用嚟切嘢。');
  assert.strictEqual(result.constructions.filter((row) => row.internal_construction === 'ResourceUseLaiFunctionRelation').length, 0);
  assert.strictEqual(result.summary.semantic_acceptance_status, 'REVIEW_REQUIRED');
});
check('actual-use boundary', () => {
  const result = inspect(api, '呢隻杯用嚟飲咗水。');
  assert.strictEqual(result.constructions.filter((row) => row.internal_construction === 'ResourceUseLaiFunctionRelation').length, 0);
  assert.strictEqual(result.summary.semantic_acceptance_status, 'REVIEW_REQUIRED');
});
check('instrumental boundary', () => {
  const result = inspect(api, '我用刀切嘢。');
  assert.strictEqual(result.constructions.filter((row) => row.internal_construction === 'ResourceUseLaiFunctionRelation').length, 0);
});
check('visible gate pass', () => {
  const result = JSON.parse(fs.readFileSync(path.join(root, 'validation/v0.5.182/visible-packet-gate.json')));
  assert(result.strict_ready && result.passed === 60);
});
check('packet lock pass', () => {
  const result = JSON.parse(fs.readFileSync(path.join(root, 'validation/v0.5.182/packet-lock-audit.json')));
  assert.strictEqual(result.status, 'PASS');
});
check('manifest version', () => {
  assert.strictEqual(JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'))).version, '0.5.182');
});
check('custody absent', () => {
  assert(!fs.existsSync(path.join(root, 'CANTO-SPAN-v0.5.182-EVALUATOR-CUSTODY-DO-NOT-OPEN.zip')));
});

const output = {
  schema: 'canto-span-v0.5.182-implementation-audit-v1',
  status: failures.length ? 'FAIL' : 'PASS',
  total: checks.length,
  passed: checks.length - failures.length,
  failed: failures.length,
  heldout_opened: true,
  heldout_status: 'CONSUMED',
  runtime_hashes: {
    'main.js': sha(path.join(root, 'main.js')),
    'manifest.json': sha(path.join(root, 'manifest.json')),
    'styles.css': sha(path.join(root, 'styles.css')),
  },
  checks,
  failures,
};
const outputPath = path.join(root, 'validation/v0.5.182/implementation-audit.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n');
console.log(JSON.stringify(output, null, 2));
if (failures.length) process.exit(1);
