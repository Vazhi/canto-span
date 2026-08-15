#!/usr/bin/env bash
set -euo pipefail

curl -L --fail --retry 3 'https://docs.google.com/spreadsheets/d/1ArxEFo46PTrDyDDhWyu3wB0epxqTyd8WBaprnwTEPm4/export?format=csv&gid=1428902047' -o /tmp/canto-frequency.csv
python - <<'PY'
import csv, json, re, unicodedata
from collections import defaultdict
rows = list(csv.DictReader(open('/tmp/canto-frequency.csv', encoding='utf-8-sig', newline='')))
def tombstone(s):
    x=s.lower(); return x=='del' or re.search(r'(^|[-\s?])del($|[-\s?])', x) is not None
seen=set(); bounded=[]
for row in rows:
    s=unicodedata.normalize('NFC',(row.get('Word') or '').strip())
    if not s or tombstone(s) or s in seen: continue
    seen.add(s); bounded.append(s)
    if len(bounded)==2000: break
rank={s:i+1 for i,s in enumerate(bounded)}
simple=re.compile(r'^[a-z]+[1-6]$',re.I)
by=defaultdict(lambda: defaultdict(list))
for row in rows:
    s=unicodedata.normalize('NFC',(row.get('Word') or '').strip())
    if s not in rank or len(s)!=1: continue
    p=(row.get('Pronunciation') or '').strip().lower()
    if simple.fullmatch(p):
        by[s][p].append({'meaning':row.get('Meaning') or '', 'example':row.get('Sentence1') or ''})
strong=[]
for s, readings in by.items():
    if len(readings)>=2:
        strong.append({'rank':rank[s], 'surface':s, 'source_readings':sorted(readings), 'source_rows':readings})
strong.sort(key=lambda x:x['rank'])
open('/tmp/strong.json','w').write(json.dumps(strong,ensure_ascii=False))
print('strong_split_count',len(strong))
PY
node - <<'NODE'
const fs=require('node:fs');
const tokenEntries=require('./src/runtime-resources/lexicon/token-lexicon');
const {buildLexicalAnalysisIndex}=require('./src/runtime-resources/lexicon/lexical-analyses');
const index=buildLexicalAnalysisIndex(tokenEntries);
const strong=JSON.parse(fs.readFileSync('/tmp/strong.json','utf8'));
const out=strong.map(item=>{
  const runtime=[...new Set((index[item.surface]||[]).map(r=>r.jyutping).filter(Boolean))].sort();
  const missing=item.source_readings.filter(r=>!runtime.includes(r));
  return {...item,runtime_readings:runtime,missing_source_readings:missing};
});
console.log('STRONG_SPLIT_AUDIT_JSON');
console.log(JSON.stringify(out,null,2));
NODE

git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
git rm -f .github/workflows/agent-strong-split-audit.yml
git rm tools/tmp-audit-strong-reading-splits.sh
git commit -m 'Remove temporary strong reading split audit'
git push origin HEAD:agent/cifu-r1751-2000-runtime-reconcile
