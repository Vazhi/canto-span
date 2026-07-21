#!/usr/bin/env python3
from pathlib import Path
import json, csv, hashlib, sys

root=Path(__file__).resolve().parents[1]
json_path=root/'test-data/WECHAT-GX-TRAVEL-002-LEXICON-JYUTPING-VERIFICATION-R2.json'
tsv_path=root/'test-data/WECHAT-GX-TRAVEL-002-LEXICON-JYUTPING-VERIFICATION-R2.tsv'
src_path=root/'test-data/WECHAT-GX-TRAVEL-002-LEXICON-SOURCE-REGISTER-R2.tsv'
report_path=root/'docs/research/WECHAT-GX-TRAVEL-002-LEXICON-JYUTPING-VERIFICATION-R2.md'
output_path=root/'validation/v0.5.181/WECHAT-GX-TRAVEL-002-LEXICON-JYUTPING-VERIFICATION-AUDIT-R2.json'

checks=[]
def check(name, condition, detail=''):
    checks.append({'check':name,'status':'PASS' if condition else 'FAIL','detail':detail})

obj=json.loads(json_path.read_text(encoding='utf-8'))
with tsv_path.open(encoding='utf-8',newline='') as f: rows=list(csv.DictReader(f,delimiter='\t'))
with src_path.open(encoding='utf-8',newline='') as f: sources=list(csv.DictReader(f,delimiter='\t'))
source_ids={s['source_id'] for s in sources}

check('schema',obj.get('schema')=='canto-span-native-corpus-lexicon-jyutping-verification-r2')
check('candidate_count_39',obj.get('candidate_count')==39 and len(obj.get('rows',[]))==39 and len(rows)==39)
check('unique_candidates',len({r['candidate'] for r in rows})==39)
check('zero_promotion_weight',obj.get('productive_promotion_weight')==0 and all(str(r['productive_promotion_weight'])=='0' for r in rows))
check('runtime_behavior_unchanged',obj.get('runtime_behavior_changed') is False and all(r['runtime_change_in_current_candidate']=='none' for r in rows))
check('grammar_status_unchanged',obj.get('grammar_status_changed') is False)
check('candidate_scoring_unchanged',obj.get('candidate_scoring_changed') is False)
check('custody_unopened',obj.get('evaluator_custody_opened') is False)
check('all_source_ids_resolve',all(sid in source_ids for r in rows for sid in r['source_ids'].split(';') if sid),f'{len(source_ids)} registered source IDs')
check('proper_names_local_only',all(r['r2_disposition']=='CORPUS_LOCAL_ONLY' for r in rows if '[proper_name]' in r['candidate']))
check('proper_places_bounded',all(r['post_v0_5_181_installation_eligibility'] in ('ELIGIBLE_PROPER_NAME_ONLY','NO_NEW_ENTRY') for r in rows if r['lexical_category_r2']=='PROPER_PLACE'))
check('yisang_reading_corrected',any(r['candidate']=='姨甥' and r['r2_verified_jyutping']=='ji4 sang1' and r['jyutping_change']=='ji4 saang1 -> ji4 sang1' for r in rows))
check('yisang_gloss_blocked',any(r['candidate']=='姨甥' and r['post_v0_5_181_installation_eligibility']=='READING_ONLY_NOT_GLOSS_READY' for r in rows))
check('ganzyu_temporal_not_accompaniment',any(r['candidate']=='跟住' and r['r2_disposition']=='EXISTING_ENTRY_SENSE_GAP_ONLY' and 'accompaniment' in r['grammar_boundary'] for r in rows))
check('journey_noun_only',any(r['candidate']=='旅遊' and r['lexical_category_r2']=='ACTIVITY_NOUN' and 'noun' in r['bounded_sense_scope'] for r in rows))
check('yidaam_component_only',any(r['candidate']=='一啖' and r['r2_disposition']=='PATCH_COMPONENT_ONLY_AFTER_CURRENT_ACCEPTANCE' for r in rows))
check('m4gwaan_context_preserved',any(r['candidate']=='慣' and 'no hidden complement' in r['grammar_boundary'] for r in rows))
check('deferred_regional_count_7',sum(r['r2_disposition']=='DEFER_EXACT_SOURCE_OR_REGIONAL_SCOPE' for r in rows)==7)
check('deferred_polysemy_count_4',sum(r['r2_disposition']=='DEFER_POLYSEMY_OR_GRAMMAR_DEPENDENCY' for r in rows)==4)
check('bounded_patch_count_16',sum(r['r2_disposition'] in ('PATCH_READY_AFTER_CURRENT_ACCEPTANCE','PATCH_COMPONENT_ONLY_AFTER_CURRENT_ACCEPTANCE') for r in rows)==16)
check('report_exists',report_path.exists() and report_path.stat().st_size>1000)

expected_hashes={
 'main.js':'6cb8aef9a279ff9abef2a84c77dc470b5f4abcf0ae7306ca39f7f3a5fc44494e',
 'manifest.json':'63a5f17c633c89583cbfe64ac3262d41565ea8126c0f80668426a75d06891c57',
 'styles.css':'5e97a27bb3925dbc63c0af00f72899c3c860c5b1a407e3f8ea832b8ff0dd409a',
}
actual={name:hashlib.sha256((root/name).read_bytes()).hexdigest() for name in expected_hashes}
check('runtime_files_byte_identical',actual==expected_hashes,json.dumps(actual,sort_keys=True))

passed=sum(c['status']=='PASS' for c in checks)
result={
 'schema':'canto-span-lexicon-jyutping-verification-audit-r2',
 'corpus_id':'WECHAT-GX-TRAVEL-002',
 'candidate_runtime_version':'0.5.181',
 'status':'PASS' if passed==len(checks) else 'FAIL',
 'passed':passed,
 'total':len(checks),
 'runtime_hashes':actual,
 'checks':checks,
}
output_path.parent.mkdir(parents=True,exist_ok=True)
output_path.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'status':result['status'],'passed':passed,'total':len(checks),'output':str(output_path)},ensure_ascii=False))
sys.exit(0 if result['status']=='PASS' else 1)
