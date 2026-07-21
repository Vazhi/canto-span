#!/usr/bin/env python3
from pathlib import Path
import csv,json,hashlib,re,sys,collections
root=Path(__file__).resolve().parent.parent
out=root/'validation/cp025-p1-pfv01-reaudit-r1/CP025-P1-PFV01-R1-AUDIT.json'

def rows(rel):
    with (root/rel).open(encoding='utf-8',newline='') as f:return list(csv.DictReader(f,delimiter='\t'))
def load(rel):return json.loads((root/rel).read_text(encoding='utf-8'))
def sha(rel):return hashlib.sha256((root/rel).read_bytes()).hexdigest()
checks=[];fail=[]
def check(name,cond,detail=''):
    c={'name':name,'pass':bool(cond)}
    if detail!='':c['detail']=detail
    checks.append(c)
    if not cond:fail.append(c)
source=rows('docs/research/CP025-P1-PFV01-SOURCE-VERIFICATION-R1.tsv')
examples=rows('docs/research/CP025-P1-PFV01-EXAMPLE-ADJUDICATION-R1.tsv')
code=rows('docs/research/CP025-P1-PFV01-CODE-DOCUMENT-COMPARISON-R1.tsv')
leg=rows('test-data/grammar-legitimacy-audit.tsv')
status=rows('docs/research/CONSTRUCTION-STATUS-REGISTRY-v0.5.183-R3.tsv')
reaudit=rows('docs/research/CONSTRUCTION-EVIDENCE-REAUDIT-LEDGER-v0.5.183-R2.tsv')
speakerq=rows('docs/research/SECOND-SPEAKER-REVIEW-QUEUE-v0.5.183-R3.tsv')
account=rows('docs/research/ACTIVE-SOURCE-ACCOUNTING-v0.5.183-cp025-p1-pfv01-r1.tsv')
edges=rows('test-data/grammar-claim-source-edges-CP021A.tsv')
trg=lambda rs,key,col='pattern':next(r for r in rs if r[col]==key)
target=trg(leg,'PostverbalZoPerfectiveVP')
stat=trg(status,'PostverbalZoPerfectiveVP','runtime_label')
red=trg(reaudit,'PostverbalZoPerfectiveVP')
spq=trg(speakerq,'PostverbalZoPerfectiveVP')
acc=trg(account,'PostverbalZoPerfectiveVP','runtime_label')
check('four source rows recorded',len(source)==4,len(source))
check('all four sources reverified',all(r['bibliographic_identity']=='VERIFIED' and r['verification_result']=='PASS' for r in source))
check('source roles distinguish positive and boundary evidence',sum('POSITIVE' in r['current_role'] for r in source)==3 and sum('BOUNDARY_ONLY' in r['current_role'] for r in source)==1)
check('four exact source locators are present',all(r['access_and_locator'] for r in source))
check('fourteen examples manually classified',len(examples)==14,len(examples))
check('five published exact positives retained',sum(r['evidence_type']=='published_example' and r['use_after_reaudit']=='positive' for r in examples)==5)
check('two published boundary examples retained',sum(r['evidence_type']=='published_example' and r['use_after_reaudit']=='boundary' for r in examples)==2)
check('legacy six-hit aggregate is untraceable and unusable',any(r['example_id']=='LEGACY-CORPUS-AGGREGATE-6' and r['manual_classification']=='untraceable_aggregate_no_row_level_provenance' and r['use_after_reaudit']=='unusable' for r in examples))
prior=[r for r in examples if r['evidence_type']=='speaker_A_prior_screen']
check('six prior speaker rows reclassified',len(prior)==6,len(prior))
check('only one prior speaker row exactly matches target',sum(r['use_after_reaudit']=='positive' for r in prior)==1)
check('code-document comparison has 15 rows',len(code)==15,len(code))
check('every code-review row has exact code location',all(r['code_location'] for r in code))
check('code review records semantic overstatement',any(r['result']=='LINGUISTIC_OVERSTATEMENT' for r in code))
check('code review records broad runtime heuristic',any(r['result']=='OVERBROAD_RUNTIME_HEURISTIC' for r in code))
check('code review records source-linked implementation gaps',sum('IMPLEMENTATION' in r['result'] for r in code)>=3)
check('target remains provisional_reaudit',target['status']=='provisional_reaudit' and stat['current_linguistic_status']=='provisional_reaudit')
check('usable corpus evidence count is zero',target['external_corpus_clean_root_hit_count']=='0')
check('exact prior speaker count is one',target['native_naturalness_acceptable_count']=='1')
check('current source accounting records four sources',acc['mapped_external_source_count']=='4')
check('current source accounting does not claim Definition-of-Done closure',acc['productive_acceptance_eligible'].lower()=='false')
check('re-audit ledger blocks provisional and productive status',red['provisional_eligible']=='false' and red['supported_productive_eligible']=='false')
check('speaker queue requires two new controlled forms',spq['recorded_independent_speaker_count']=='0' and spq['speakers_needed_for_provisional']=='1' and spq['additional_speakers_needed_for_supported_productive']=='2')
edge_rows=[r for r in edges if r['runtime_label']=='PostverbalZoPerfectiveVP']
check('four controlled source edges remain',len(edge_rows)==4,len(edge_rows))
check('source-edge relationship vocabulary is controlled',all(r['relationship'] in {'supports','restricts','contradicts','attests_only'} for r in edge_rows))
vis=load('validation/cp025-p1-pfv01-reaudit-r1/PFV01-VISIBLE-CURRENT.json')
check('frozen-runtime visible audit passes its recorded baseline',vis['strict_ready'] is True and vis['failed']==0)
check('only two of six controlled positives instantiate target',vis['linguistic_positive_target_present_count']==2 and vis['linguistic_positive_target_absent_count']==4)
check('selectional anomaly still builds then blocks target',any(r['case_id']=='PFV-B07' and r['target_match_count']==1 and r['semantic_acceptance_status']=='BLOCKED' for r in vis['case_results']))
check('known lexical Jyutping gaps are explicit',set(x for r in vis['case_results'] for x in r.get('missing_jyutping_surfaces',[]))=={'篇','文','牌','子'})
internal=load('review-packets/cp025-p1-pfv01-speaker-review-r1/speaker-packet-internal.json')
ids=[r['case_id'] for r in internal['cases']]
check('speaker packet has six positives and eight boundaries',len(ids)==14 and sum(x.startswith('PFV-P') for x in ids)==6 and sum(x.startswith('PFV-B') for x in ids)==8)
for who in ['A','B']:
    text=(root/f'review-packets/cp025-p1-pfv01-speaker-review-r1/CP025-P1-PFV01-SPEAKER-{who}-FORM-R1.md').read_text(encoding='utf-8')
    check(f'Speaker {who} form contains all case IDs',all(x in text for x in ids))
    check(f'Speaker {who} form contains independence statement','without consulting the other reviewer' in text)
    check(f'Speaker {who} form hides parser labels','PostverbalZoPerfectiveVP' not in text and 'Expected:' not in text and 'internal_design_role' not in text)
# inherited software gates
focused=load('validation/cp025-p1-pfv01-reaudit-r1/CURRENT-FOCUSED.json')
reg=load('validation/regression-suite.json')
sourceaudit=load('validation/cp025-p1-pfv01-reaudit-r1/SOURCE-ACCOUNTING-CONSOLE.json')
claim=load('validation/cp025-p1-pfv01-reaudit-r1/CLAIM-PROVENANCE-CONSOLE.json')
native=load('validation/cp025-p1-pfv01-reaudit-r1/NATIVE-NATURALNESS-CONSOLE.json')
doc=load('validation/cp025-p1-pfv01-reaudit-r1/DOCUMENTATION-CONSISTENCY-CONSOLE.json')
check('current focused suite passes',focused['status']=='PASS' and focused['failed']==0)
check('inherited regression passes 543 of 543',reg['strict_ready'] is True and reg['passed']==543 and reg['failed']==0)
check('source accounting audit passes',sourceaudit['status']=='PASS')
check('claim provenance audit passes',claim['strict_ready'] is True)
check('native evidence audit passes after stale assumptions corrected',native['strict_ready'] is True)
check('documentation consistency passes',doc['status']=='PASS' and doc['broken_local_links']==0)
expected={'main.js':'e25b6f7142eafce66a172b68d8e409275f127cfe902e93bafaf7147152bfcbe9','manifest.json':'d7f5a9be248a4efd1839852e8a100a9968273050f0aa5953af2a35c3661801f5','styles.css':'5e97a27bb3925dbc63c0af00f72899c3c860c5b1a407e3f8ea832b8ff0dd409a'}
hashes={k:sha(k) for k in expected}
for k in expected:check(f'{k} remains byte-identical',hashes[k]==expected[k],hashes[k])
held=[str(p.relative_to(root)) for p in root.rglob('*') if p.is_file() and ('HELDOUT-EXTERNAL' in p.name or 'DO-NOT-OPEN' in p.name or 'CUSTODY' in p.name.upper())]
check('sealed DEMO01 heldout remains excluded',not held,held)
# Current-doc authority links
project=(root/'docs/current/PROJECT-STATE.md').read_text(encoding='utf-8')
prov=(root/'docs/research/CURRENT-RESEARCH-PROVENANCE.md').read_text(encoding='utf-8')
check('project state points to R3 status registry','CONSTRUCTION-STATUS-REGISTRY-v0.5.183-R3.tsv' in project)
check('project state points to CP025 source accounting','ACTIVE-SOURCE-ACCOUNTING-v0.5.183-cp025-p1-pfv01-r1.tsv' in project)
check('current provenance reports 171 active labels','active labels: **171**' in prov)
# all JSON parse
bad=[]
for p in root.rglob('*.json'):
    try:json.loads(p.read_text(encoding='utf-8'))
    except Exception as e:bad.append(f'{p.relative_to(root)}: {e}')
check('all JSON files parse',not bad,bad)
result={'schema':'canto-span-cp025-p1-pfv01-reaudit-audit-v1','checkpoint':'CP025-P1-PFV01-R1','runtime_version':'0.5.183','parser_behavior_changed':False,'current_linguistic_status':'provisional_reaudit','linguistic_evidence':{'sources_reverified':4,'published_exact_positive_examples':5,'legacy_corpus_hits_with_evidence_weight':0,'qualifying_project_speaker_reviews':0},'implementation_evidence':{'controlled_positive_target_present':2,'controlled_positive_total':6,'boundary_target_absent':7,'selectional_anomaly_built_then_blocked':1,'regression_passed':543,'regression_total':543},'runtime_hashes':hashes,'total':len(checks),'passed':len(checks)-len(fail),'failed':len(fail),'status':'FAIL' if fail else 'PASS','checks':checks,'failures':fail}
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,ensure_ascii=False,indent=2))
if fail:sys.exit(1)
