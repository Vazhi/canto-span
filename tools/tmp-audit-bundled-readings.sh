#!/usr/bin/env bash
set -euo pipefail

curl -L --fail --retry 3 'https://docs.google.com/spreadsheets/d/1ArxEFo46PTrDyDDhWyu3wB0epxqTyd8WBaprnwTEPm4/export?format=csv&gid=1428902047' -o /tmp/canto-frequency.csv
python - <<'PY'
import csv, json, re, unicodedata
rows=list(csv.DictReader(open('/tmp/canto-frequency.csv',encoding='utf-8-sig',newline='')))
def tombstone(s):
    x=s.lower(); return x=='del' or re.search(r'(^|[-\s?])del($|[-\s?])',x) is not None
seen=set(); bounded=[]
for row in rows:
    s=unicodedata.normalize('NFC',(row.get('Word') or '').strip())
    if not s or tombstone(s) or s in seen: continue
    seen.add(s); bounded.append(s)
    if len(bounded)==2000: break
rank={s:i+1 for i,s in enumerate(bounded)}
pat=re.compile(r'[a-z]+[1-6]',re.I)
candidates={}
for row in rows:
    s=unicodedata.normalize('NFC',(row.get('Word') or '').strip())
    if s not in rank or rank[s]>500 or len(s)!=1: continue
    reads=[]
    for r in pat.findall((row.get('Pronunciation') or '').lower()):
        if r not in reads: reads.append(r)
    if len(reads)<2: continue
    candidates.setdefault(s,{
      'rank':rank[s], 'surface':s, 'source_readings':reads,
      'pronunciation_field':row.get('Pronunciation') or '',
      'meaning':row.get('Meaning') or '', 'example':row.get('Sentence1') or '', 'note':row.get('Note') or ''
    })
out=sorted(candidates.values(),key=lambda x:x['rank'])
open('/tmp/bundled.json','w').write(json.dumps(out,ensure_ascii=False))
print('bundled_candidate_count',len(out))
PY
node - <<'NODE'
const fs=require('node:fs');
const tokenEntries=require('./src/runtime-resources/lexicon/token-lexicon');
const {buildLexicalAnalysisIndex}=require('./src/runtime-resources/lexicon/lexical-analyses');
const index=buildLexicalAnalysisIndex(tokenEntries);
const candidates=JSON.parse(fs.readFileSync('/tmp/bundled.json','utf8'));
const deltas=candidates.map(item=>{
  const runtime=[...new Set((index[item.surface]||[]).map(r=>r.jyutping).filter(Boolean))].sort();
  return {...item,runtime_readings:runtime,missing_source_readings:item.source_readings.filter(r=>!runtime.includes(r))};
}).filter(item=>item.missing_source_readings.length);
console.log('BUNDLED_READING_DELTAS_JSON');
console.log(JSON.stringify(deltas,null,2));
console.log('delta_surface_count',deltas.length);
NODE

git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
git rm -f .github/workflows/agent-bundled-reading-audit.yml
git rm tools/tmp-audit-bundled-readings.sh
git commit -m 'Remove temporary bundled reading audit'
git push origin HEAD:agent/cifu-r1751-2000-runtime-reconcile
