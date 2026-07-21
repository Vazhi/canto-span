#!/usr/bin/env python3
"""Verify v0.5.184 runtime/recovery package separation."""
from __future__ import annotations
import argparse,hashlib,json,zipfile
from pathlib import Path
EXPECTED_RUNTIME={"canto-span/main.js","canto-span/manifest.json","canto-span/styles.css"}
FORBIDDEN_RUNTIME_PREFIXES=("canto-span/docs/","canto-span/test-data/","canto-span/tools/","canto-span/validation/","canto-span/archive/","canto-span/review-packets/","canto-span/render-review/","canto-span/external-evidence/")
FORBIDDEN_RECOVERY_TOKENS=("HELDOUT-EXTERNAL","CUSTODY","DO-NOT-OPEN","EVALUATOR-RESULTS")
def sha256(path:Path)->str:
 h=hashlib.sha256()
 with path.open('rb') as f:
  for b in iter(lambda:f.read(1024*1024),b''):h.update(b)
 return h.hexdigest()
def main():
 ap=argparse.ArgumentParser();ap.add_argument('runtime_zip');ap.add_argument('recovery_zip');ap.add_argument('--output');args=ap.parse_args()
 runtime=Path(args.runtime_zip);recovery=Path(args.recovery_zip);checks=[]
 def check(name,passed,detail=''):checks.append({'name':name,'pass':bool(passed),**({'detail':detail} if detail else {})})
 with zipfile.ZipFile(runtime) as z:
  names={n for n in z.namelist() if not n.endswith('/')}
  check('runtime contains exactly three required files',names==EXPECTED_RUNTIME,repr(sorted(names)))
  check('runtime contains no documentation or recovery paths',not any(n.startswith(FORBIDDEN_RUNTIME_PREFIXES) for n in names))
  check('runtime manifest is v0.5.184',json.loads(z.read('canto-span/manifest.json'))['version']=='0.5.184')
  check('runtime unzip test',z.testzip() is None)
 with zipfile.ZipFile(recovery) as z:
  names=[n for n in z.namelist() if not n.endswith('/')]
  check('recovery has one canto-span root',bool(names) and all(n.startswith('canto-span/') for n in names))
  for required in [
   'canto-span/docs/current/DOCTRINE.md','canto-span/docs/current/NOUN-PHRASE-SUBSYSTEM.md',
   'canto-span/docs/research/ACTIVE-SOURCE-ACCOUNTING-v0.5.184-R1.tsv',
   'canto-span/docs/research/CONSTRUCTION-STATUS-REGISTRY-v0.5.184-R2.tsv',
   'canto-span/test-data/np-subsystem-v0.5.184.json','canto-span/validation/v0.5.184/VALIDATION-SUMMARY.json']:
   check(f'recovery contains {required.removeprefix("canto-span/")}',required in names)
  check('recovery contains no sealed or private evaluator result',not any(any(t in n.upper() for t in FORBIDDEN_RECOVERY_TOKENS) for n in names))
  check('recovery contains no nested ZIPs',not any(n.lower().endswith('.zip') for n in names))
  check('recovery unzip test',z.testzip() is None)
 failures=[c for c in checks if not c['pass']]
 result={'schema':'canto-span-package-separation-audit-v2','checkpoint':'v0.5.184-np-subsystem-r1','status':'PASS' if not failures else 'FAIL','runtime_zip':runtime.name,'runtime_sha256':sha256(runtime),'recovery_zip':recovery.name,'recovery_sha256':sha256(recovery),'total':len(checks),'passed':len(checks)-len(failures),'failed':len(failures),'checks':checks,'failures':failures}
 text=json.dumps(result,indent=2)+'\n'
 if args.output:Path(args.output).write_text(text)
 print(text,end='')
 if failures:raise SystemExit(1)
if __name__=='__main__':main()
