#!/usr/bin/env python3
from pathlib import Path
import csv,json,hashlib,re,zipfile
from collections import Counter
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'validation/cp026-p1-rul01-reaudit-r1'; OUT.mkdir(parents=True,exist_ok=True)
checks=[]; failures=[]
def ck(name,cond,detail=''):
    cond=bool(cond); checks.append({'name':name,'pass':cond,**({'detail':str(detail)} if detail!='' else {})})
    if not cond: failures.append({'name':name,'detail':str(detail)})
def rows(rel):
    with open(ROOT/rel,encoding='utf-8',newline='') as f:return list(csv.DictReader(f,delimiter='\t'))
def sha(rel):return hashlib.sha256((ROOT/rel).read_bytes()).hexdigest()
expected={'main.js':'e25b6f7142eafce66a172b68d8e409275f127cfe902e93bafaf7147152bfcbe9','manifest.json':'d7f5a9be248a4efd1839852e8a100a9968273050f0aa5953af2a35c3661801f5','styles.css':'5e97a27bb3925dbc63c0af00f72899c3c860c5b1a407e3f8ea832b8ff0dd409a'}
for f,h in expected.items():ck(f'{f} byte-identical',sha(f)==h,sha(f))
status=rows('docs/research/CONSTRUCTION-STATUS-REGISTRY-v0.5.183-R4.tsv'); counts=Counter(r['current_linguistic_status'] for r in status)
ck('171 active labels',len(status)==171,len(status)); ck('status counts exact',counts==Counter({'unsupported_generalization':87,'research_pending':58,'parser_heuristic':21,'lexicalized_only':3,'provisional_reaudit':2}),dict(counts))
by={r['runtime_label']:r for r in status}; ck('PFV remains provisional_reaudit',by['PostverbalZoPerfectiveVP']['current_linguistic_status']=='provisional_reaudit'); ck('RUL remains provisional_reaudit',by['ResourceUseLaiFunctionRelation']['current_linguistic_status']=='provisional_reaudit')
src=rows('docs/research/CP026-P1-RUL01-SOURCE-VERIFICATION-R1.tsv'); ck('six source records',len(src)==6,len(src)); ck('five current evidence units',sum(r['access_status']!='METADATA_VERIFIED_FULL_TEXT_NOT_REOPENED' for r in src)==5); ck('Matthews has zero current weight',next(r for r in src if r['source_id']=='SRC-MATTHEWS-2006-SVC')['supports_exact_narrow_claim']=='not_counted_current_cycle')
ex=rows('docs/research/CP026-P1-RUL01-EXAMPLE-ADJUDICATION-R1.tsv'); ck('manual example rows present',len(ex)>=5,len(ex)); ck('one direct quote',sum(r['natural_attestation_weight']=='one_direct_quote' for r in ex)==1); ck('published illustration not counted natural',any(r['natural_attestation_weight']=='zero_as_natural_attestation' for r in ex)); ck('editorial narrative marked limited',any(r['natural_attestation_weight']=='limited_interview_derived_not_verbatim' for r in ex))
code=rows('docs/research/CP026-P1-RUL01-CODE-DOCUMENT-COMPARISON-R1.tsv'); ck('code-doc issues recorded',len(code)>=5,len(code)); ck('material overbreadth recorded',any(r['assessment']=='material_overbreadth' for r in code)); ck('stale metadata recorded',any('stale' in r['assessment'] for r in code))
probe=rows('docs/research/CP026-P1-RUL01-IMPLEMENTATION-PROBE-R1.tsv'); ck('22 probe cases',len(probe)==22,len(probe)); ck('probe target count 6',sum(int(r['resource_use_lai_count']) for r in probe)==6); ck('broad-only count 5',sum(int(r['resource_use_lai_count'])==0 and int(r['intended_function_count'])>0 for r in probe)==5); ck('no relation count 11',sum(int(r['resource_use_lai_count'])==0 and int(r['intended_function_count'])==0 for r in probe)==11)
pfv=rows('docs/research/CP025-P1-PFV01-SPEAKER-A-RESULT-R2.tsv'); ck('PFV Speaker A 14 cases',len(pfv)==14,len(pfv)); ck('all six PFV positives natural',sum(r['role']=='target_positive' and r['judgment']=='natural' for r in pfv)==6); ck('two PFV comparisons rejected',sum(r['judgment']=='unnatural' for r in pfv)==2)
q=rows('docs/research/SECOND-SPEAKER-REVIEW-QUEUE-v0.5.183-R4.tsv'); ck('23 speaker queue rows',len(q)==23,len(q)); ck('all second-speaker work frozen',all(r['second_speaker_work_state']=='FROZEN' for r in q)); ck('two-speaker requirement still blocks support',all(r['supported_productive_blocked_by_speaker_requirement']=='true' for r in q))
acc=rows('docs/research/ACTIVE-SOURCE-ACCOUNTING-v0.5.183-cp026-p1-rul01-r1.tsv'); ck('source accounting 171 rows',len(acc)==171,len(acc)); rr=next(r for r in acc if r['runtime_label']=='ResourceUseLaiFunctionRelation'); ck('RUL source accounting count 5',rr['mapped_external_source_count']=='5'); ck('RUL not promotion eligible',rr['productive_acceptance_eligible'].lower()!='true')
# Active markdown links
broken=[]
for p in list((ROOT/'docs/current').glob('*.md'))+[ROOT/'README.md',ROOT/'CHECKPOINT-STATE.md',ROOT/'HANDOFF.md']:
    text=p.read_text(encoding='utf-8')
    for target in re.findall(r'\[[^\]]*\]\(([^)]+)\)',text):
        if target.startswith(('http:','https:','#','mailto:')): continue
        target=target.split('#',1)[0]
        if not target: continue
        if not (p.parent/target).resolve().exists(): broken.append(f'{p.relative_to(ROOT)} -> {target}')
ck('active markdown links unbroken',not broken,broken[:10])
current='\n'.join(p.read_text(encoding='utf-8') for p in (ROOT/'docs/current').glob('*.md'))
ck('current docs use status registry R4','CONSTRUCTION-STATUS-REGISTRY-v0.5.183-R4.tsv' in current)
ck('current docs use reaudit ledger R3','CONSTRUCTION-EVIDENCE-REAUDIT-LEDGER-v0.5.183-R3.tsv' in current)
ck('current docs use speaker queue R4','SECOND-SPEAKER-REVIEW-QUEUE-v0.5.183-R4.tsv' in current)
ck('current docs use CP026 source accounting','ACTIVE-SOURCE-ACCOUNTING-v0.5.183-cp026-p1-rul01-r1.tsv' in current)
ck('old three-attestation claim only withdrawn','three independent natural attestations' not in current)
# heldout archive absent from project
held=list(ROOT.rglob('*HELDOUT*'))+list(ROOT.rglob('*heldout*'))
ck('no heldout archive in working tree',not any(p.suffix.lower()=='.zip' for p in held),[str(p) for p in held if p.suffix.lower()=='.zip'])
result={'schema':'canto-span-cp026-rul01-reaudit-validation-v1','checkpoint':'v0.5.183-cp026-p1-rul01-reaudit-r1','parser_behavior_changed':False,'supported_productive':0,'provisional_reaudit':2,'second_speaker_work_frozen':True,'total':len(checks),'passed':len(checks)-len(failures),'failed':len(failures),'status':'FAIL' if failures else 'PASS','checks':checks,'failures':failures}
(OUT/'v0.5.183-RUL01-REAUDIT-VALIDATION.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,ensure_ascii=False,indent=2))
raise SystemExit(1 if failures else 0)
