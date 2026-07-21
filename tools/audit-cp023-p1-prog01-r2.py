#!/usr/bin/env python3
"""Audit the CP023-P1-PROG01-R2 research-only checkpoint."""
from __future__ import annotations
import csv, hashlib, json, sys
from pathlib import Path

ROOT=Path(__file__).resolve().parent.parent
EXPECTED_RUNTIME={
    'main.js':'86ff77131e12082885294eabe336bf95cbe0160469cd446a5c17b3e6c9a5b535',
    'manifest.json':'84c0a1a885e2f841f66e6e9ec5be67d2a5ec8e16df490bdaef0f0150590c2f46',
    'styles.css':'5e97a27bb3925dbc63c0af00f72899c3c860c5b1a407e3f8ea832b8ff0dd409a',
}
REQUIRED_FILES=[
    'docs/research/CP023-P1-PROG01-QUESTION-AND-SOURCE-FREEZE.md',
    'docs/research/CP023-P1-PROG01-CLAIM-SOURCE-EDGES.tsv',
    'docs/research/CP023-P1-PROG01-NATURAL-ATTESTATION-ADJUDICATION.md',
    'docs/research/CP023-P1-PROG01-REMEDIATION-BLUEPRINT-R2.md',
    'docs/research/CP023-P1-PROG01-REMEDIATION-DEPENDENCIES-R2.tsv',
    'docs/research/CP023-P1-PROG01-LEXICON-JYUTPING-VERIFICATION-R2.md',
    'docs/research/CP023-P1-PROG01-LEXICON-JYUTPING-R2.tsv',
    'docs/research/CP023-P1-PROG01-LEXICON-SOURCE-REGISTER-R2.tsv',
    'docs/research/CP023-P1-PROG01-R2-RESEARCH-CHECKPOINT.md',
    'test-data/CP023-P1-PROG01-visible-research-packet.tsv',
    'test-data/CP023-P1-PROG01-nominal-prerequisite-probes.tsv',
    'test-data/CP023-P1-PROG01-lexicon-baseline-probes.tsv',
    'validation/cp023-p1-prog01/current-baseline-observation.json',
    'validation/cp023-p1-prog01/lexicon-baseline-observation.json',
    'validation/cp023-p1-prog01/nominal-prerequisite-observation.json',
    'review-packets/cp023-p1-prog01/PROG01-R2/focused-research-packet.json',
]

def sha(p:Path)->str:
    return hashlib.sha256(p.read_bytes()).hexdigest()

def rows(path:Path):
    with path.open(newline='') as f: return list(csv.DictReader(f,delimiter='\t'))

checks=[]
def check(name,passed,detail=''):
    checks.append({'name':name,'pass':bool(passed),**({'detail':detail} if detail else {})})

for rel in REQUIRED_FILES:
    check(f'exists: {rel}',(ROOT/rel).is_file())

# JSON validity and package state.
for rel in ['PROGRESS-CHECKPOINT.json','PACKAGING-MANIFEST.json','review-packets/cp023-p1-prog01/PROG01-R2/focused-research-packet.json','validation/cp023-p1-prog01/current-baseline-observation.json','validation/cp023-p1-prog01/lexicon-baseline-observation.json','validation/cp023-p1-prog01/nominal-prerequisite-observation.json']:
    try:
        json.loads((ROOT/rel).read_text()); ok=True
    except Exception as e:
        ok=False; detail=str(e)
    check(f'valid JSON: {rel}',ok,detail if not ok else '')

progress=json.loads((ROOT/'PROGRESS-CHECKPOINT.json').read_text())
check('active research package is R2',progress.get('active_research_package')=='CP023-P1-PROG01-R2',repr(progress.get('active_research_package')))
check('no active implementation candidate',progress.get('active_candidate') is None)
check('supported_productive remains 2',progress.get('supported_productive')==2)
check('heldout remains unselected',progress.get('research',{}).get('heldout')=='NOT_SELECTED')
check('runtime behavior recorded unchanged',progress.get('research',{}).get('runtime_behavior_changed') is False)
check('錫條 pronunciation explicitly unresolved',progress.get('research',{}).get('exact_tin_bar_jyutping')=='UNRESOLVED')

r1=json.loads((ROOT/'validation/cp023-p1-prog01/current-baseline-observation.json').read_text())
check('R1 visible count 23',r1.get('counts',{}).get('total')==23)
check('R1 required exact 4',r1.get('counts',{}).get('required_exact')==4)
check('R1 required incomplete 7',r1.get('counts',{}).get('required_wrong_or_incomplete')==7)
check('R1 required absent 2',r1.get('counts',{}).get('required_absent')==2)
check('R1 forbidden broad leakage 3',r1.get('counts',{}).get('forbidden_with_broad_family_present')==3)

lex=json.loads((ROOT/'validation/cp023-p1-prog01/lexicon-baseline-observation.json').read_text())
check('lexicon baseline has 32 items',len(lex.get('items',[]))==32,str(len(lex.get('items',[]))))
lex_by={i.get('surface'):i for i in lex.get('items',[])}
for surface in ['數據','九巴','布甸','兒歌','樓','叉燒包','信','封信','着','錫條','錫線']:
    check(f'lexicon baseline contains {surface}',surface in lex_by)
check('叉燒包 baseline is not atomic',lex_by.get('叉燒包',{}).get('root_coverage',{}).get('status')!='PASS')
check('信 baseline lacks noun NP',lex_by.get('信',{}).get('root_coverage',{}).get('status')!='PASS')

nom=json.loads((ROOT/'validation/cp023-p1-prog01/nominal-prerequisite-observation.json').read_text())
check('nominal probe count 7',nom.get('counts',{}).get('total')==7)
check('nominal full root count 3',nom.get('counts',{}).get('full_root_coverage')==3)
nom_by={c.get('case_id'):c for c in nom.get('cases',[])}
check('associative NP baseline passes',nom_by.get('NOM-P01',{}).get('root_coverage',{}).get('status')=='PASS')
check('coordinate NP baseline has no top construction',nom_by.get('NOM-P04',{}).get('root_coverage',{}).get('status')=='NO_TOP_CONSTRUCTION')
check('progressive coordinate object is partial',nom_by.get('NOM-P05',{}).get('root_coverage',{}).get('status')=='PARTIAL')
# Verify wrong scope is explicitly present: DiMarkedNP 啲公司 plus ModifiedNP 嘅報告.
rows_p02=nom_by.get('NOM-P02',{}).get('rows',[])
check('啲 associative probe records premature DiMarkedNP',any(r.get('surface')=='啲公司' and r.get('internal_construction')=='DiMarkedNP' for r in rows_p02))
check('啲 associative probe records detached 嘅報告',any(r.get('surface')=='嘅報告' and r.get('internal_construction')=='ModifiedNP' for r in rows_p02))

lex_tsv=rows(ROOT/'docs/research/CP023-P1-PROG01-LEXICON-JYUTPING-R2.tsv')
check('lexicon verification table has 13 entries',len(lex_tsv)==13,str(len(lex_tsv)))
tinbar=[r for r in lex_tsv if r.get('surface')=='錫條']
check('錫條 row blocks hardcode',bool(tinbar) and tinbar[0].get('verification_state')=='UNRESOLVED' and 'BLOCK_HARDCODE' in tinbar[0].get('disposition',''))

deps=rows(ROOT/'docs/research/CP023-P1-PROG01-REMEDIATION-DEPENDENCIES-R2.tsv')
check('dependency matrix covers 21 cases',len(deps)==21,str(len(deps)))
check('dependency matrix separates nominal coordination',any(r.get('case_id')=='PROG-E03' and 'NOMINAL:COORDINATION' in r.get('dependency_streams','') for r in deps))
check('dependency matrix preserves perfective',any(r.get('case_id')=='PROG-P01' and 'PRESERVATION:PERFECTIVE' in r.get('dependency_streams','') for r in deps))

blueprint=(ROOT/'docs/research/CP023-P1-PROG01-REMEDIATION-BLUEPRINT-R2.md').read_text()
for phrase in ['predicate–aspect compatibility','Coordinated nominal object','Associative NP under `啲`','Custody therefore remains unselected','supported_productive` remains **2**']:
    check(f'blueprint contains: {phrase}',phrase in blueprint)

for name,want in EXPECTED_RUNTIME.items():
    got=sha(ROOT/name)
    check(f'runtime identity: {name}',got==want,f'{got} != {want}')

fails=[c for c in checks if not c['pass']]
result={
    'schema':'canto-span-cp023-p1-prog01-r2-audit-v1',
    'checkpoint':'CP023-P1-PROG01-R2',
    'accepted_runtime':'v0.5.182',
    'status':'PASS' if not fails else 'FAIL',
    'total':len(checks),'passed':len(checks)-len(fails),'failed':len(fails),
    'runtime_behavior_changed':False,
    'checks':checks,'failures':fails,
}
text=json.dumps(result,ensure_ascii=False,indent=2)+'\n'
print(text,end='')
if fails: sys.exit(1)
