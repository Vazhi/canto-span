#!/usr/bin/env python3
from pathlib import Path
import csv,json,hashlib,re,subprocess,sys
root=Path(__file__).resolve().parent.parent
out=root/'v0.5.183-PHASE1-DORMANT-LABEL-RETIREMENT-R1-VALIDATION.json'

def rows(rel):
 with (root/rel).open(encoding='utf-8') as f:return list(csv.DictReader(f,delimiter='\t'))
def sha(rel):return hashlib.sha256((root/rel).read_bytes()).hexdigest()
def load(rel):return json.loads((root/rel).read_text(encoding='utf-8'))
checks=[];fail=[]
def check(name,cond,detail=''):
 c={'name':name,'pass':bool(cond)}
 if detail!='':c['detail']=str(detail)
 checks.append(c)
 if not cond:fail.append(c)
status=rows('docs/research/CONSTRUCTION-STATUS-REGISTRY-v0.5.183-R2.tsv')
acc=rows('docs/research/ACTIVE-SOURCE-ACCOUNTING-v0.5.183-cp024-p1-demo01-r4.tsv')
leg=rows('test-data/grammar-legitimacy-audit.tsv')
prov=rows('test-data/grammar-claim-provenance-CP021B.tsv')
ret=rows('docs/research/RETIRED-CONSTRUCTION-ARCHIVE-v0.5.183-R1.tsv')
ra=rows('docs/research/DORMANT-LABEL-RETIREMENT-AUDIT-v0.5.183-R1.tsv')
stale=rows('docs/research/RUNTIME-STALE-GOVERNANCE-INVENTORY-v0.5.183-R1.tsv')
sets=[set(r[k] for r in x) for x,k in [(status,'runtime_label'),(acc,'runtime_label'),(leg,'pattern'),(prov,'runtime_label')]]
retset=set(r['runtime_label'] for r in ret)
check('active status registry has 171 rows',len(status)==171,len(status))
check('active source accounting has 171 rows',len(acc)==171,len(acc))
check('active legitimacy table has 171 rows',len(leg)==171,len(leg))
check('active claim provenance has 171 rows',len(prov)==171,len(prov))
check('all active label sets agree',all(s==sets[0] for s in sets[1:]))
check('retirement archive has 10 unique rows',len(ret)==10 and len(retset)==10,len(retset))
check('retirement audit has the same ten labels',set(r['runtime_label'] for r in ra)==retset)
check('retired labels absent from every active table',all(not(s&retset) for s in sets))
check('all retired labels had zero fixtures',all(r['accepted_fixture_count']=='0' for r in ret))
check('all retired labels had zero verified parser outputs',all(r['verified_current_parser_output_count']=='0' for r in ret))
check('all retired labels preserve a future research target',all(r['future_research_preserved_as'] for r in ret))
check('all retired labels preserve mapped source history',all(r['mapped_source_ids_preserved'] for r in ret))
from collections import Counter
counts=Counter(r['current_linguistic_status'] for r in status)
expected={'provisional_reaudit':2,'research_pending':58,'unsupported_generalization':87,'lexicalized_only':3,'parser_heuristic':21}
check('linguistic counts match Phase 1 authority',dict(counts)==expected,dict(counts))
check('supported_productive remains zero',counts.get('supported_productive',0)==0)
check('ordinary provisional remains zero',counts.get('provisional',0)==0)
check('stale runtime inventory has 33 rows',len(stale)==33,len(stale))
check('stale inventory has 23 status mismatches',sum(r['mismatch_type']=='STATUS_MISMATCH' for r in stale)==23)
check('stale inventory has 10 retired residues',sum(r['mismatch_type']=='RETIRED_LABEL_RESIDUE' for r in stale)==10)
source=load('validation/v0.5.183-phase1-dormant-label-retirement-r1/source-accounting-audit.json')
legit=load('validation/grammar-legitimacy-audit-v0.5.183-phase1-dormant-label-retirement-r1.json')
claim=load('validation/claim-provenance-audit-current.json')
absence=load('validation/v0.5.183-phase1-dormant-label-retirement-r1/retired-label-output-absence.json')
reg=load('validation/regression-suite.json')
demo=load('validation/v0.5.183-phase1-dormant-label-retirement-r1/demo01-visible.json')
check('source accounting audit passes',source['status']=='PASS')
check('grammar legitimacy audit passes',legit['status']=='PASS')
check('claim provenance audit passes',claim['strict_ready'] is True)
check('565 cases contain no retired-label output',absence['status']=='PASS' and absence['case_count']==565 and absence['retired_label_output_hits']==0,absence.get('case_count'))
check('inherited regression passes 543 of 543',reg['strict_ready'] is True and reg['passed']==543 and reg['failed']==0)
check('DEMO01 visible required exact is 9 of 9',demo['counts']['required_exact']==9 and demo['counts']['required']==9)
check('DEMO01 forbidden leakage is zero',demo['counts']['forbidden_leakage']==0)
hashes={x:sha(x) for x in ['main.js','manifest.json','styles.css']}
expected_hashes={'main.js':'e25b6f7142eafce66a172b68d8e409275f127cfe902e93bafaf7147152bfcbe9','manifest.json':'d7f5a9be248a4efd1839852e8a100a9968273050f0aa5953af2a35c3661801f5','styles.css':'5e97a27bb3925dbc63c0af00f72899c3c860c5b1a407e3f8ea832b8ff0dd409a'}
for k,v in hashes.items():check(f'{k} remains byte-identical',v==expected_hashes[k],v)
held=[p for p in root.rglob('*') if p.is_file() and ('HELDOUT-EXTERNAL' in p.name or 'DO-NOT-OPEN' in p.name or 'CUSTODY' in p.name.upper())]
check('sealed external heldout excluded from recovery tree',len(held)==0,[str(x) for x in held])
# all JSON parse
bad=[]
for p in root.rglob('*.json'):
 try:json.loads(p.read_text(encoding='utf-8'))
 except Exception as e:bad.append(f'{p.relative_to(root)}: {e}')
check('all JSON files parse',not bad,bad)
# markdown links
broken=[]
link_re=re.compile(r'\[[^\]]*\]\(([^)]+)\)')
for p in list((root/'docs/current').rglob('*.md'))+[root/'README.md',root/'HANDOFF.md',root/'CHECKPOINT-STATE.md']:
 if not p.exists():continue
 for target in link_re.findall(p.read_text(encoding='utf-8')):
  if target.startswith(('http:','https:','#','mailto:')):continue
  target=target.split('#',1)[0]
  if target and not (p.parent/target).resolve().exists():broken.append(f'{p.relative_to(root)} -> {target}')
check('current Markdown local links resolve',not broken,broken)
# no stale active references
current_text='\n'.join(p.read_text(encoding='utf-8') for p in (root/'docs/current').rglob('*.md'))
check('current docs use R2 status registry','CONSTRUCTION-STATUS-REGISTRY-v0.5.183-R1.tsv' not in current_text)
check('current docs use R4 source accounting','ACTIVE-SOURCE-ACCOUNTING-v0.5.183-cp024-p1-demo01-r3.tsv' not in current_text)
result={'schema':'canto-span-phase1-dormant-label-retirement-validation-v1','checkpoint':'v0.5.183-phase1-dormant-label-retirement-r1','parser_behavior_changed':False,'active_governance_labels':171,'runtime_registry_labels':181,'retired_this_checkpoint':10,'linguistic_status_counts':expected,'runtime_stale_governance_rows':33,'runtime_hashes':hashes,'total':len(checks),'passed':len(checks)-len(fail),'failed':len(fail),'status':'FAIL' if fail else 'PASS','checks':checks,'failures':fail}
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,ensure_ascii=False,indent=2))
if fail:sys.exit(1)
