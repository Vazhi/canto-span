const fs = require('fs');
const vm = require('vm');

function load(file) {
  const code = fs.readFileSync(file, 'utf8');
  const moduleRecord = { exports: {} };
  const context = {
    module: moduleRecord,
    exports: moduleRecord.exports,
    require: (id) => {
      if (id === 'obsidian') {
        class Plugin {}
        class PluginSettingTab {}
        class Setting {}
        class Notice {}
        return { Plugin, PluginSettingTab, Setting, Notice };
      }
      return require(id);
    },
    console,
    setTimeout,
    clearTimeout,
    Buffer,
  };
  vm.runInNewContext(`${code}\nmodule.exports.__api={analyzeLine,diagnosticFinalRows};`, context, { filename: file });
  return moduleRecord.exports.__api;
}

function clean(value) {
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === 'object') {
    const output = {};
    for (const [key, item] of Object.entries(value)) {
      if (key === 'research_id') continue;
      output[key] = clean(item);
    }
    return output;
  }
  return value;
}

const before = load('/tmp/main.before.js');
const after = load('main.js');
const cases = [
  '我寧願去啲唔鍾意嘅公司度做嘢，都唔想渾渾噩噩噉又過多年。',
  '阿Tom寧願行十公里路，都唔肯俾錢買飛搭巴士。',
  '有啲人寧願退黨，都要補上空缺。',
  '與其搭的士，不如搭地鐵。',
  '每個人都去。',
];

for (const source of cases) {
  const oldRows = clean(before.diagnosticFinalRows(before.analyzeLine(source)));
  const newRows = clean(after.diagnosticFinalRows(after.analyzeLine(source)));
  if (JSON.stringify(oldRows) !== JSON.stringify(newRows)) {
    throw new Error(`behavior drift after removing research_id: ${source}`);
  }
}

const rows = after.diagnosticFinalRows(after.analyzeLine(cases[0]));
const relation = rows.find((row) =>
  (row.internal_construction || row.construction) === 'ClauseRelationGraph'
  && row.trace_detail?.relation_subtype === 'committed_preference'
);
if (!relation || relation.trace_detail.research_id !== 'PRQ2-035') {
  throw new Error('corrected PRQ2-035 trace metadata not found');
}
console.log('behavior equivalence and PRQ2-035 metadata: PASS');
