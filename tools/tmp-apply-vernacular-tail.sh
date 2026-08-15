#!/usr/bin/env bash
set -euo pipefail

python - <<'PY'
from pathlib import Path

p = Path('src/runtime-resources/lexicon/token-lexicon/vernacular-component-coverage.js')
text = p.read_text()
anchor = '  "輝": "fai1"\n});'
replacement = '  "輝": "fai1",\n  "哂": "saai3", // recurrent vernacular corpus spelling of 晒 in exhaustive/completive contexts\n  "跙": "zau2", // recurrent corpus spelling used with 走 “leave/go” syntax\n  "咧": "le4" // default for independently supported le4/le5 particle analyses\n});'
if anchor not in text:
    raise SystemExit('reading-tail anchor missing')
text = text.replace(anchor, replacement, 1)
p.write_text(text)

p = Path('src/runtime-resources/lexicon/token-lexicon/explicit-analyses.js')
text = p.read_text()
anchor = '\n});\n\nconst reviewedR1250Polyanalyses'
block = '''
  "咧": Object.freeze([
    Object.freeze({
      id: "lex:咧:proposal_particle_le4",
      label: "func",
      pos: "particle",
      jyutping: "le4",
      syntax: "sentence_final_proposal_or_consent_particle",
      senses: Object.freeze([{ gloss: "sentence-final particle seeking consent / proposing a course of action" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: "Most Common Cantonese Words (Frequency List) + Cantonese dictionary cross-check" }),
    }),
    Object.freeze({
      id: "lex:咧:agreement_particle_le5",
      label: "func",
      pos: "particle",
      jyutping: "le5",
      syntax: "sentence_final_agreement_or_confirmation_particle",
      senses: Object.freeze([{ gloss: "sentence-final particle inviting agreement / confirming an observation" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: "Most Common Cantonese Words (Frequency List) + Cantonese dictionary cross-check" }),
    }),
  ]),
'''
if 'lex:咧:proposal_particle_le4' not in text:
    if anchor not in text:
        raise SystemExit('explicit-analysis anchor missing')
    text = text.replace(anchor, block + anchor, 1)
p.write_text(text)

p = Path('tests/tooling/lexicon/vernacular-component-coverage.test.js')
text = p.read_text()
text = text.replace('exactly 281 simple single-character readings', 'exactly 284 simple single-character readings')
text = text.replace('Object.keys(READINGS).length, 281', 'Object.keys(READINGS).length, 284')
if 'buildLexicalAnalysisIndex' not in text:
    text = text.replace(
        'const { READINGS, applyVernacularComponentCoverage } = require("../../../src/runtime-resources/lexicon/token-lexicon/vernacular-component-coverage");',
        'const { READINGS, applyVernacularComponentCoverage } = require("../../../src/runtime-resources/lexicon/token-lexicon/vernacular-component-coverage");\nconst { buildLexicalAnalysisIndex } = require("../../../src/runtime-resources/lexicon/lexical-analyses");'
    )
if '咧 preserves both supported Cantonese particle readings' not in text:
    text += '''\n\ntest("咧 preserves both supported Cantonese particle readings", () => {\n  const analyses = buildLexicalAnalysisIndex(require("../../../src/runtime-resources/lexicon/token-lexicon"));\n  assert.deepEqual(new Set((analyses["咧"] || []).map((row) => row.jyutping)), new Set(["le4", "le5"]));\n  assert.ok((analyses["咧"] || []).every((row) => row.pos === "particle"));\n});\n'''
p.write_text(text)
PY

npm ci
npm run build:runtime
node --test tests/tooling/lexicon/vernacular-component-coverage.test.js
npm run verify:runtime

curl -L --fail --retry 3 'https://docs.google.com/spreadsheets/d/1ArxEFo46PTrDyDDhWyu3wB0epxqTyd8WBaprnwTEPm4/export?format=csv&gid=1428902047' -o /tmp/canto-frequency.csv
python - <<'PY'
import csv, json, re, unicodedata
rows = list(csv.DictReader(open('/tmp/canto-frequency.csv', encoding='utf-8-sig', newline='')))
def tombstone(s):
    x = s.lower()
    return x == 'del' or re.search(r'(^|[-\s?])del($|[-\s?])', x) is not None
seen = set(); bounded = []
for row in rows:
    s = unicodedata.normalize('NFC', (row.get('Word') or '').strip())
    if not s or tombstone(s) or s in seen:
        continue
    seen.add(s); bounded.append(s)
    if len(bounded) == 2000:
        break
open('/tmp/bounded.json', 'w').write(json.dumps(bounded, ensure_ascii=False))
PY
node - <<'NODE'
const fs = require('node:fs');
const { loadRuntimeApi } = require('./tools/lib/runtime-api');
const api = loadRuntimeApi({ apiNames: ['analyzeLine'] });
const bounded = JSON.parse(fs.readFileSync('/tmp/bounded.json', 'utf8'));
function flatten(nodes, out = []) { for (const n of nodes || []) { if (!n || typeof n !== 'object') continue; if (n.kind === 'token') out.push(n); if (Array.isArray(n.children)) flatten(n.children, out); } return out; }
function cjk(s) { return [...String(s || '')].every(ch => /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff〇○]/u.test(ch)); }
const missing = new Set();
for (const surface of bounded) for (const token of flatten(api.analyzeLine(surface).tokens)) if (cjk(token.surface) && !String(token.jyutping || '').trim()) missing.add(token.surface);
const remaining = [...missing].sort();
console.log(JSON.stringify({ bounded_surfaces: bounded.length, unique_missing_reading_tokens: remaining.length, remaining_tokens: remaining }, null, 2));
if (remaining.length !== 1 || remaining[0] !== '這') throw new Error('unexpected bounded tail: ' + remaining.join(','));
NODE

git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
git rm -f .github/workflows/agent-lexical-batch7.yml
git rm -f .github/workflows/agent-tail-apply.yml
git rm tools/tmp-apply-vernacular-tail.sh
git add src/runtime-resources/lexicon/token-lexicon/vernacular-component-coverage.js src/runtime-resources/lexicon/token-lexicon/explicit-analyses.js tests/tooling/lexicon/vernacular-component-coverage.test.js main.js
git commit -m 'Resolve final vernacular lexical tail'
git push origin HEAD:agent/cifu-r1751-2000-runtime-reconcile
