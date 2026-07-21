#!/usr/bin/env python3
from pathlib import Path
import json,csv,hashlib,sys
root=Path(__file__).resolve().parents[1]
p=root/'test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.json'
t=root/'test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.tsv'
out=root/'validation/v0.5.181/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-AUDIT-R2.json'
o=json.loads(p.read_text(encoding='utf-8'))
with t.open(encoding='utf-8',newline='') as f: rows=list(csv.DictReader(f,delimiter='\t'))
checks=[]
def ck(n,c,d=''): checks.append({'check':n,'status':'PASS' if c else 'FAIL','detail':d})
ck('unit_count_16',o['unit_count']==16 and len(rows)==16)
ck('unique_units',len({r['unit_id'] for r in rows})==16)
ck('runtime_unchanged',o['runtime_behavior_changed'] is False and all(r['runtime_change_now']=='none' for r in rows))
ck('snapshots_unchanged',o['regression_snapshots_changed'] is False)
ck('custody_unopened',o['evaluator_custody_opened'] is False)
ck('zero_promotion_weight',o['promotion_weight']==0 and all(r['promotion_weight']=='0' for r in rows))
ready={r['unit_id'] for r in rows if r['eligible_for_current_v0_5_181_regression_absorption']=='yes'}
ck('ready_set_exact',ready=={'U010','U012','U017','U047'},str(sorted(ready)))
ck('duration_boundary',any(r['unit_id']=='U028' and 'v0.5.180 subtype evidence' in r['forbidden_assertions'] for r in rows))
ck('completion_boundary',any(r['unit_id']=='U033' and 'V完咗O' in r['forbidden_assertions'] and 'insert an object' in r['forbidden_assertions'] for r in rows))
ck('attainment_opportunity_split',all(any(r['unit_id']==u and ('must not merge' in r['forbidden_assertions'] or 'must not classify' in r['forbidden_assertions']) for r in rows) for u in ('U028','U045','U048')))
ck('proper_name_local',any(r['unit_id']=='U052' and 'globalize the proper name' in r['forbidden_assertions'] for r in rows))
ck('causal_fragment_no_hidden_main',any(r['unit_id']=='U047' and 'hidden main clause' in r['forbidden_assertions'] for r in rows))
ck('reported_speech_no_hidden_content',any(r['unit_id']=='U017' and 'reported content' in r['forbidden_assertions'] for r in rows))
ck('negative_response_no_hidden_complement',any(r['unit_id']=='U018' and 'hidden complement' in r['forbidden_assertions'] for r in rows))
ck('lexicon_not_grammar',all('lexical' not in r['required_positive_assertions'].lower() or 'must not' in r['forbidden_assertions'].lower() for r in rows))
expected={'main.js':'6cb8aef9a279ff9abef2a84c77dc470b5f4abcf0ae7306ca39f7f3a5fc44494e','manifest.json':'63a5f17c633c89583cbfe64ac3262d41565ea8126c0f80668426a75d06891c57','styles.css':'5e97a27bb3925dbc63c0af00f72899c3c860c5b1a407e3f8ea832b8ff0dd409a'}
actual={n:hashlib.sha256((root/n).read_bytes()).hexdigest() for n in expected}
ck('runtime_byte_identical',actual==expected,str(actual))
passed=sum(c['status']=='PASS' for c in checks)
res={'schema':'canto-span-regression-remediation-readiness-audit-r2','status':'PASS' if passed==len(checks) else 'FAIL','passed':passed,'total':len(checks),'runtime_hashes':actual,'checks':checks}
out.write_text(json.dumps(res,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'status':res['status'],'passed':passed,'total':len(checks),'output':str(out)},ensure_ascii=False))
sys.exit(0 if res['status']=='PASS' else 1)
