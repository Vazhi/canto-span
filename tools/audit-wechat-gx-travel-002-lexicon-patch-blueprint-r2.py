#!/usr/bin/env python3
from pathlib import Path
import json,csv,hashlib,sys
root=Path(__file__).resolve().parents[1]
blue=root/'test-data/WECHAT-GX-TRAVEL-002-LEXICON-PATCH-BLUEPRINT-R2.json'
testp=root/'test-data/WECHAT-GX-TRAVEL-002-LEXICON-PATCH-TEST-MATRIX-R2.tsv'
verp=root/'test-data/WECHAT-GX-TRAVEL-002-LEXICON-JYUTPING-VERIFICATION-R2.json'
out=root/'validation/v0.5.181/WECHAT-GX-TRAVEL-002-LEXICON-PATCH-BLUEPRINT-AUDIT-R2.json'
b=json.loads(blue.read_text(encoding='utf-8')); v=json.loads(verp.read_text(encoding='utf-8'))
with testp.open(encoding='utf-8',newline='') as f: tests=list(csv.DictReader(f,delimiter='\t'))
checks=[]
def ck(n,c,d=''): checks.append({'check':n,'status':'PASS' if c else 'FAIL','detail':d})
rows=b['rows']; surfaces=[r['install_surface'] for r in rows]
ck('target_count_16',b['target_count']==16 and len(rows)==16)
ck('test_count_32',len(tests)==32)
ck('unversioned_until_acceptance',b['assigned_release_version'] is None and 'WAITING' in b['implementation_status'])
ck('runtime_unchanged',b['runtime_behavior_changed'] is False)
ck('custody_unopened',b['evaluator_custody_opened'] is False)
ck('zero_promotion_weight',b['productive_promotion_weight']==0)
ck('unique_install_surfaces',len(set(surfaces))==16)
ck('component_target_is_daam','啖' in surfaces and '一啖' not in surfaces)
ck('proper_places_bounded',all('proper_place' in r['proposed_syntax_tags'] for r in rows if r['install_surface'] in ('廣西','桂林','陽朔')))
ck('travel_noun_only',any(r['install_surface']=='旅遊' and 'activity_noun' in r['proposed_syntax_tags'] and 'verb' not in r['proposed_syntax_tags'] for r in rows))
ck('particle_scope_guard',any(r['install_surface']=='嘛' and 'no broad scope' in r['mandatory_guardrail'] for r in rows))
ck('cinkei_lexical_only',any(r['install_surface']=='千祈' and 'full prohibition' in r['mandatory_guardrail'] for r in rows))
ck('polysemy_guards',all(any(r['install_surface']==s and ('Preserve' in r['mandatory_guardrail'] or 'Keep' in r['mandatory_guardrail']) for r in rows) for s in ('揸','差唔多','阿妹')))
ck('gwaan_no_hidden_complement',any(r['install_surface']=='慣' and 'hidden complement' in r['mandatory_guardrail'] for r in rows))
ck('positive_and_boundary_per_target',all({t['probe_type'] for t in tests if t['candidate']==r['verification_candidate']}=={'positive_lexical_recognition','negative_or_boundary'} for r in rows))
ck('excluded_yisang','姨甥' not in surfaces)
ck('excluded_existing_guangzhou','廣州' not in surfaces)
ck('excluded_temporal_ganzyu','跟住' not in surfaces)
verified_installable={('啖' if r['candidate']=='一啖' else r['candidate']) for r in v['rows'] if r['r2_disposition'] in ('PATCH_READY_AFTER_CURRENT_ACCEPTANCE','PATCH_COMPONENT_ONLY_AFTER_CURRENT_ACCEPTANCE')}
ck('matches_verification_installable_set',set(surfaces)==verified_installable)
expected={'main.js':'6cb8aef9a279ff9abef2a84c77dc470b5f4abcf0ae7306ca39f7f3a5fc44494e','manifest.json':'63a5f17c633c89583cbfe64ac3262d41565ea8126c0f80668426a75d06891c57','styles.css':'5e97a27bb3925dbc63c0af00f72899c3c860c5b1a407e3f8ea832b8ff0dd409a'}
actual={n:hashlib.sha256((root/n).read_bytes()).hexdigest() for n in expected}
ck('runtime_byte_identical',actual==expected,str(actual))
passed=sum(x['status']=='PASS' for x in checks)
res={'schema':'canto-span-lexicon-patch-blueprint-audit-r2','status':'PASS' if passed==len(checks) else 'FAIL','passed':passed,'total':len(checks),'runtime_hashes':actual,'checks':checks}
out.write_text(json.dumps(res,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'status':res['status'],'passed':passed,'total':len(checks),'output':str(out)},ensure_ascii=False))
sys.exit(0 if res['status']=='PASS' else 1)
