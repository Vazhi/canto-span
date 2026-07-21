#!/usr/bin/env python3
from __future__ import annotations
import argparse, csv, hashlib, json, re, sys
from pathlib import Path

ROOT=Path(__file__).resolve().parent.parent
VAL=ROOT/'validation/v0.5.183-cp024-p1-demo01-r1'
EXPECTED_HELDOUT='7cda111ca194b6159a37c91b789984fdc0c35d6c35d643260810df0cdd5015c4'
checks=[]
def check(name,cond,detail=''):
    checks.append({'name':name,'pass':bool(cond),'detail':str(detail)})
def readj(path): return json.loads(Path(path).read_text(encoding='utf-8'))
def sha(path): return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def tsv(path):
    with Path(path).open(encoding='utf-8') as f:return list(csv.DictReader(f,delimiter='\t'))

ap=argparse.ArgumentParser()
ap.add_argument('--heldout',required=True)
args=ap.parse_args()
heldout=Path(args.heldout)

main=(ROOT/'main.js').read_text(encoding='utf-8')
manifest=readj(ROOT/'manifest.json')
audit=readj(ROOT/'test-data/grammar-legitimacy-audit.json')
patterns={r['pattern']:r for r in audit['patterns']}
visible=readj(VAL/'visible-candidate-gate.json')
reg=readj(VAL/'aggregate-regression.json')
top=readj(VAL/'lexicon-topology-gate.json')
leg=readj(VAL/'grammar-legitimacy.json')
claim=readj(VAL/'claim-provenance.json')
source=readj(VAL/'source-accounting-and-research-retention-audit.json')
semantic=readj(VAL/'semantic-acceptance-console.json')
preint=readj(VAL/'pre-intermediate-corpus.json')
native=readj(VAL/'native-naturalness.json')
conflict=readj(VAL/'native-conflict-console.json')
review=readj(VAL/'review-readiness.json')
docs=readj(VAL/'documentation-consistency.json')
colors=readj(VAL/'color-palette.json')
lock=readj(ROOT/'review-packets/cp024-p1-demo01/DEMO01-R1/packet-lock-manifest.json')

# Custody: raw hash only. Do not list/open/extract ZIP.
check('heldout file exists',heldout.is_file(),heldout)
heldout_hash=sha(heldout) if heldout.is_file() else ''
check('heldout raw SHA-256 matches external commitment',heldout_hash==EXPECTED_HELDOUT,heldout_hash)
check('lock records sealed unopened state',lock['prospective_heldout']['status']=='SEALED_EXTERNAL_VERIFIED_UNOPENED' and lock['prospective_heldout']['opened'] is False and lock['prospective_heldout']['listed'] is False and lock['prospective_heldout']['extracted'] is False)
check('lock checksum matches raw file',lock['prospective_heldout']['sha256']==heldout_hash)
for forbidden in ('heldout-cases.json','commitments.json','seal-manifest.json'):
    found=[str(p.relative_to(ROOT)) for p in ROOT.rglob(forbidden)]
    check(f'heldout content not extracted into project: {forbidden}',not found,found)
check('heldout ZIP not packaged inside project',not any(p.name=='CP024-P1-DEMO01-HELDOUT-EXTERNAL-1.zip' for p in ROOT.rglob('*.zip')))

# Runtime and exact design.
check('runtime version constant 0.5.183','const CANTO_SPAN_RUNTIME_VERSION = "0.5.183";' in main)
check('policy version 0.5.183','const GRAMMAR_LEGITIMACY_POLICY_VERSION = "0.5.183";' in main)
check('manifest version 0.5.183',manifest.get('version')=='0.5.183')
check('overt subtype registered','"OvertHeadDemonstrativeClassifierNP"' in main)
check('headless subtype registered','"HeadlessDemonstrativeClassifierNP"' in main)
check('compatibility alias points overt subtype to old public name','OvertHeadDemonstrativeClassifierNP: "DemonstrativeClassifierNP"' in main)
check('overt exact template present','type: "OvertHeadDemonstrativeClassifierNP"' in main and '["demonstrative!", "classifier!", "head_noun!"]' in main)
check('obsolete DemonstrativeHeadNP template absent',not re.search(r'type:\s*"DemonstrativeHeadNP"',main))
check('bounded cat lexicon exists','"貓"' in main and 'jyutping: "maau1"' in main)

# Legitimacy state: no premature promotion.
overt=patterns['OvertHeadDemonstrativeClassifierNP']; headless=patterns['HeadlessDemonstrativeClassifierNP']; alias=patterns['DemonstrativeClassifierNP']; retired=patterns['DemonstrativeHeadNP']
check('audit has 181 candidate rows',len(audit['patterns'])==181)
check('overt subtype remains provisional',overt['status']=='provisional' and overt['productive_acceptance_eligible'] is False)
check('overt heldout state remains sealed/unopened',overt['held_out_performance']=='SEALED_EXTERNAL_PACKET_VERIFIED_UNOPENED')
check('headless remains research pending',headless['status']=='research_pending' and headless['productive_acceptance_eligible'] is False)
check('compatibility label is internal only',alias['primary_claim_type']=='parser_representation_decision' and alias['status']=='parser_heuristic')
check('DemonstrativeHeadNP is retired misanalysis',retired['action']=='retire_misanalysis_do_not_emit')
check('accepted productive count stays two',sum(r['status']=='supported_productive' for r in audit['patterns'])==2)

# Visible target and boundaries.
c=visible['counts']
check('visible gate is observation-only',visible['status']=='OBSERVATION_ONLY_NOT_ACCEPTANCE_GATE')
check('visible 9/9 exact',c['required']==9 and c['required_exact']==9 and c['required_absent']==0,c)
check('visible forbidden leakage 0/8',c['forbidden']==8 and c['forbidden_leakage']==0,c)
check('visible full root coverage 17/20',c['full_root_coverage']==17,c)
req=[x for x in visible['cases'] if x['section']=='required']
forbidden=[x for x in visible['cases'] if x['section']=='forbidden']
unresolved=[x for x in visible['cases'] if x['section']=='unresolved']
check('all required use internal overt subtype',all(x['target_internal_types']==['OvertHeadDemonstrativeClassifierNP'] for x in req))
check('all forbidden exclude overt subtype',all(not x['actual_target_surfaces'] for x in forbidden))
check('all unresolved exclude overt subtype',all(not x['actual_target_surfaces'] for x in unresolved))
headless_cases={x['surface']:x for x in forbidden if x['surface'] in {'呢個。','呢本。'}}
check('two headless examples use separate subtype',len(headless_cases)==2 and all('HeadlessDemonstrativeClassifierNP' in x['semantic_summary']['internal_top_constructions'] for x in headless_cases.values()))

# Regression and general gates.
check('aggregate inherited regression 543/543',reg['strict_ready'] and reg['total']==543 and reg['passed']==543 and reg['failed']==0)
check('exactly two focused transitions',reg['current_focused_exclusion_count']==2 and set(reg['current_focused_excluded_sources'])=={'呢本。','呢個係問題。'})
check('topology gate 543/543',top['strict_ready'] and top['total']==543 and top['passed']==543 and top['failed']==0)
check('semantic gate passes',semantic['strict_ready'] and semantic['fail']==0)
check('pre-intermediate corpus passes',preint['report']['strict_ready'] and not preint['failures'])
check('native naturalness audit passes',native['strict_ready'] and native['failed']==0)
check('native conflict burden passes',conflict['status']=='PASS' and conflict['failed']==0)
check('grammar legitimacy audit passes',leg['strict_ready'] and leg['failed']==0 and leg['fully_supported_productive_patterns']==2)
check('claim provenance passes',claim['strict_ready'] and claim['failed_checks']==0 and claim['summary']['externally_originated_claims']==6)
check('source accounting passes',source['status']=='PASS' and not source['failures'] and source['summary']['unaccounted_active_labels']==[])
check('candidate source counts exact',source['summary']['active_registry_labels']==181 and source['summary']['active_language_or_lexical_labels']==160 and source['summary']['externally_mapped_active_language_labels']==159 and source['summary']['active_internal_representation_or_heuristic_labels']==21)
check('review readiness audit passes',review['failed']==0)
check('documentation consistency passes',docs['status']=='PASS' and docs['broken_local_links']==0)
summary=colors['summaries'][0]
check('color gate has no hard failures',not summary['contrastFails'] and not summary['unmitigatedCvd'] and not summary['unmitigatedGray'] and not summary['themeLightPaletteOverride'])

# Central provenance records.
auth=tsv(ROOT/'test-data/grammar-authority-origin-CP021B.tsv')
edges=tsv(ROOT/'test-data/grammar-claim-source-edges-CP021A.tsv')
coverage=tsv(ROOT/'docs/research/PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R37.tsv')
check('overt authority origin present',any(r['runtime_label']=='OvertHeadDemonstrativeClassifierNP' and r['pattern_specific_external_source_count']=='5' for r in auth))
check('headless authority origin present',any(r['runtime_label']=='HeadlessDemonstrativeClassifierNP' and r['pattern_specific_external_source_count']=='1' for r in auth))
check('five overt claim-source edges present',sum(r['runtime_label']=='OvertHeadDemonstrativeClassifierNP' for r in edges)==5)
check('one headless claim-source edge present',sum(r['runtime_label']=='HeadlessDemonstrativeClassifierNP' for r in edges)==1)
check('coverage rows include both subtypes',{r['runtime_label'] for r in coverage}>={'OvertHeadDemonstrativeClassifierNP','HeadlessDemonstrativeClassifierNP'})

fail=[x for x in checks if not x['pass']]
freeze={
 'schema':'canto-span-render-candidate-freeze-v1','candidate':'v0.5.183-cp024-p1-demo01-r1','accepted_baseline':'v0.5.182',
 'status':'RENDER_PENDING_HELDOUT_SEALED_UNOPENED','created_at':'2026-07-20',
 'runtime_hashes':{n:sha(ROOT/n) for n in ('main.js','manifest.json','styles.css')},
 'packet_hashes':{
  'visible_packet':sha(ROOT/'test-data/CP024-P1-DEMO01-visible-research-packet.tsv'),
  'render_review':sha(ROOT/'CANTO-SPAN-v0.5.183-RENDER-REVIEW.md'),
  'packet_lock_manifest':sha(ROOT/'review-packets/cp024-p1-demo01/DEMO01-R1/packet-lock-manifest.json'),
  'external_heldout_raw_zip':heldout_hash,
 },
 'external_heldout':{'filename':heldout.name,'size_bytes':heldout.stat().st_size if heldout.is_file() else None,'opened':False,'listed':False,'extracted':False,'reuse_forbidden_after_consumption':True},
 'visible_counts':c,'regression':{'inherited_passed':reg['passed'],'inherited_total':reg['total'],'focused_exclusions':reg['current_focused_excluded_sources']},
 'supported_productive':2,
}
VAL.mkdir(parents=True,exist_ok=True)
(VAL/'render-candidate-freeze.json').write_text(json.dumps(freeze,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
out={'schema':'canto-span-cp024-p1-demo01-candidate-audit-v1','candidate':'v0.5.183-cp024-p1-demo01-r1','status':'PASS' if not fail else 'FAIL','total':len(checks),'passed':len(checks)-len(fail),'failed':len(fail),'runtime_behavior_changed':True,'promotion_performed':False,'supported_productive_delta':0,'heldout_opened':False,'checks':checks,'failures':fail,'freeze':freeze}
(VAL/'candidate-audit.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(out,ensure_ascii=False,indent=2))
sys.exit(1 if fail else 0)
