#!/usr/bin/env python3
from __future__ import annotations
import csv, hashlib, json, re, sys, zipfile
from collections import Counter
from pathlib import Path

ROOT=Path(__file__).resolve().parent.parent
checks=[]
def check(name, cond, detail=''):
    checks.append({'name':name,'pass':bool(cond),'detail':detail})
def read_json(rel): return json.loads((ROOT/rel).read_text(encoding='utf-8'))
def read_tsv(rel):
    with (ROOT/rel).open(encoding='utf-8') as f:return list(csv.DictReader(f,delimiter='\t'))
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()

# Core files
required=[
'docs/research/CP024-P0-PRODUCTIVE-PROMOTION-PROGRAM-R1.md',
'docs/research/CP024-P0-PRODUCTIVE-ENDPOINT-FAMILY-LEDGER-R1.tsv',
'docs/research/CP024-P0-RUNTIME-LABEL-ENDPOINT-LEDGER-R1.tsv',
'docs/research/CP024-P0-PRODUCTIVE-ENDPOINT-SUMMARY-R1.json',
'docs/research/CP024-P0-OBSTACLE-REGISTER-R1.tsv',
'docs/research/CP024-P1-DEMO01-QUESTION-AND-SOURCE-FREEZE-R1.md',
'docs/research/CP024-P1-DEMO01-NATURAL-ATTESTATION-ADJUDICATION-R1.md',
'docs/research/CP024-P1-DEMO01-NATURAL-ATTESTATIONS-R1.tsv',
'docs/research/CP024-P1-DEMO01-IMPLEMENTATION-BLUEPRINT-R1.md',
'docs/research/CP024-P0-L45-VALENCY-DECOMPOSITION-FREEZE-R1.md',
'docs/research/CP024-P0-L45-CONSTRUCTOR-DEPENDENCY-MAP-R1.md',
'external-evaluator-handoff/cp024-p1-demo01/DEMO01-EVALUATOR-SPEC.md',
'test-data/CP024-P1-DEMO01-visible-research-packet.tsv',
'validation/cp024-p1-demo01/current-baseline-observation.json',
]
for rel in required:check(f'file exists: {rel}',(ROOT/rel).is_file())

summary=read_json('docs/research/CP024-P0-PRODUCTIVE-ENDPOINT-SUMMARY-R1.json')
family=read_tsv('docs/research/CP024-P0-PRODUCTIVE-ENDPOINT-FAMILY-LEDGER-R1.tsv')
labels=read_tsv('docs/research/CP024-P0-RUNTIME-LABEL-ENDPOINT-LEDGER-R1.tsv')
check('53 canonical family rows',len(family)==53,str(len(family)))
check('179 runtime label rows',len(labels)==179,str(len(labels)))
check('runtime labels unique',len({r['runtime_label'] for r in labels})==179)
check('productive target family count 40',sum(r['productive_target_denominator']=='YES' for r in family)==40)
endpoint_counts=Counter(r['required_endpoint'] for r in labels)
check('endpoint counts match summary',dict(endpoint_counts)==summary['label_endpoint_counts'],str(dict(endpoint_counts)))
check('two already supported',endpoint_counts['ALREADY_SUPPORTED_PRODUCTIVE']==2)
check('20 internal-only',endpoint_counts['INTERNAL_ONLY_NON_LICENSING']==20)
check('11 public umbrellas decompose',endpoint_counts['RETIRE_PUBLIC_UMBRELLA_AFTER_DECOMPOSITION']==11)
check('six bounded lexicalized',endpoint_counts['SUPPORTED_BOUNDED_LEXICALIZED']==6)
check('102 narrow subtype required',endpoint_counts['NARROW_SUPPORTED_PRODUCTIVE_SUBTYPE_REQUIRED']==102)
check('38 retire/merge/reclassify',endpoint_counts['RETIRE_MERGE_OR_RECLASSIFY']==38)

# Obstacles
obs=read_tsv('docs/research/CP024-P0-OBSTACLE-REGISTER-R1.tsv')
check('obstacle IDs unique',len(obs)==len({r['obstacle_id'] for r in obs}))
obsmap={r['obstacle_id']:r for r in obs}
check('natural attestation obstacle cleared',obsmap.get('OBS-03',{}).get('status')=='CLEARED_PASS')
check('prospective custody remains external/open',obsmap.get('OBS-04',{}).get('status')=='OPEN_EXTERNAL')
check('render is later external gate',obsmap.get('OBS-05',{}).get('status')=='OPEN_LATER')
check('native conflict not triggered',obsmap.get('OBS-06',{}).get('status')=='NOT_TRIGGERED_FOR_DEMO01')

# DEMO visible baseline
packet=read_tsv('test-data/CP024-P1-DEMO01-visible-research-packet.tsv')
baseline=read_json('validation/cp024-p1-demo01/current-baseline-observation.json')
check('visible packet 20 cases',len(packet)==20)
check('visible policies 9/8/3',Counter(r['candidate_policy'] for r in packet)==Counter({'REQUIRED':9,'FORBIDDEN':8,'UNRESOLVED':3}))
check('baseline total 20',baseline['counts']['total']==20)
check('baseline required 8/9 exact',baseline['counts']['required_exact']==8 and baseline['counts']['required']==9)
check('baseline required absent one',baseline['counts']['required_absent']==1)
check('baseline forbidden leakage two',baseline['counts']['forbidden_leakage']==2)
check('baseline root coverage 16',baseline['counts']['full_root_coverage']==16)
absent=[c for c in baseline['cases'] if c['section']=='required' and c['observation']!='EXACT_TARGET_PRESENT']
leaks=[c for c in baseline['cases'] if c['section']=='forbidden' and c.get('actual_target_surfaces')]
check('required absent is 呢隻貓',len(absent)==1 and absent[0]['surface']=='呢隻貓。')
check('leaks are headless 呢個/呢本',{c['surface'] for c in leaks}=={'呢個。','呢本。'})

# Natural attestations
atts=read_tsv('docs/research/CP024-P1-DEMO01-NATURAL-ATTESTATIONS-R1.tsv')
check('five natural attestation rows',len(atts)==5)
check('five distinct source files',len({r['source_file'] for r in atts})==5)
check('five distinct source hashes',len({r['source_file_sha256'] for r in atts})==5)
check('at least four participant records',len({(r['source_file'],r['participant']) for r in atts})>=4)
check('all exact manual adjudications',all(r['manual_adjudication']=='QUALIFIES_EXACT_OVERT_HEAD_D_CL_N' for r in atts))
check('both proximal and distal natural forms',{r['demonstrative'] for r in atts}>={'哩','嗰'})
check('at least three classifiers',len({r['classifier'] for r in atts})>=3)
check('at least four head strings',len({r['head_noun'] for r in atts})>=4)
check('source locators complete',all(r['source_file'] and r['turn_index_zero_based'] and r['utterance'] for r in atts))

# Lock integrity
lock=read_json('review-packets/cp024-p1-demo01/DEMO01-R1/packet-lock-manifest.json')
check('visible packet lock status',lock['status']=='VISIBLE_PACKET_LOCKED_PROSPECTIVE_CUSTODY_MISSING')
for item in lock['files']:
    p=ROOT/item['path'];check(f"locked hash: {item['path']}",p.is_file() and sha(p)==item['sha256'])
check('prospective heldout not selected',lock['prospective_heldout']['status']=='NOT_SELECTED')
check('external recovery separation required',lock['prospective_heldout']['must_be_external_to_recovery_tree'] is True)

# Valency decomposition inventories
verbs=read_tsv('docs/research/CP024-P0-L45-VERB-VALENCY-INVENTORY-R1.tsv')
deps=read_tsv('docs/research/CP024-P0-L45-CONSTRUCTOR-DEPENDENCY-MAP-R1.tsv')
refs=read_tsv('docs/research/CP024-P0-L45-CODE-REFERENCE-INVENTORY-R1.tsv')
seeds=read_tsv('docs/research/CP024-P0-L45-PRODUCTIVE-VO-SEED-INVENTORY-R1.tsv')
check('verb inventory nonempty',len(verbs)>=100,str(len(verbs)))
check('all verb inventory heuristic-only',all(r['evidence_status']=='RUNTIME_HEURISTIC_NOT_LINGUISTIC_EVIDENCE' for r in verbs))
check('constructor dependency map nonempty',len(deps)>=10,str(len(deps)))
check('code reference inventory nonempty',len(refs)>=20,str(len(refs)))
check('productive VO seed inventory 27',len(seeds)==27,str(len(seeds)))
check('all VO seeds non-evidence',all(r['evidence_status']=='RUNTIME_SEED_NOT_PRODUCTIVITY_EVIDENCE' for r in seeds))

# Current authority consistency
state=(ROOT/'docs/current/PROJECT-STATE.md').read_text(encoding='utf-8')
doctrine=(ROOT/'docs/current/DOCTRINE.md').read_text(encoding='utf-8')
check('project state active CP024',all(x in state for x in ['CP024-P0-R1','CP024-P1-DEMO01-R1','supported_productive`: **2']))
check('project state natural gate pass','5 manually adjudicated independent natural attestations' in state)
check('project state custody blocker','Independent prospective custody' in state)
check('doctrine completion rule','Productive-program completion rule' in doctrine and 'must not equate every runtime label' in doctrine)
check('no false all-label productivity claim','179 labels all marked productive' not in doctrine)

# Runtime identity against original plugin zip in enclosing full suite
plugin_zip=ROOT.parents[1]/'canto-span-plugin-v0.5.182.zip'
if plugin_zip.is_file():
    with zipfile.ZipFile(plugin_zip) as z:
        for name in ('main.js','manifest.json','styles.css'):
            b=z.read('canto-span/'+name)
            check(f'runtime identity {name}',hashlib.sha256(b).hexdigest()==sha(ROOT/name))
else:
    check('original plugin zip available for identity',False,str(plugin_zip))

fail=[c for c in checks if not c['pass']]
out={'schema':'canto-span-cp024-p0-p1-r1-audit-v1','checkpoint':'CP024-P0-P1-R1','status':'PASS' if not fail else 'FAIL','passed':len(checks)-len(fail),'failed':len(fail),'total':len(checks),'runtime_behavior_changed':False,'supported_productive_delta':0,'checks':checks,'failures':fail}
outpath=ROOT/'validation/cp024-p1-demo01/CP024-P0-P1-R1-RESEARCH-AUDIT.json'
outpath.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(out,ensure_ascii=False,indent=2))
sys.exit(1 if fail else 0)
