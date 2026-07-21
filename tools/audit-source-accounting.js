#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm");
const root=path.resolve(__dirname,"..");const outDir=path.join(root,"validation","v0.5.184");fs.mkdirSync(outDir,{recursive:true});
function parseTsv(file){const text=fs.readFileSync(file,"utf8").replace(/^\uFEFF/,"").trimEnd();if(!text)return[];const lines=text.split(/\r?\n/),h=lines[0].split("\t");return lines.slice(1).filter(Boolean).map(line=>{const v=line.split("\t"),r={};h.forEach((x,i)=>r[x]=v[i]??"");return r;});}
function loadRegistry(){class Plugin{}class PluginSettingTab{}class Setting{}class Notice{}const m={exports:{}},c={module:m,exports:m.exports,require:(id)=>id==="obsidian"?{Plugin,PluginSettingTab,Setting,Notice}:require(id),console,setTimeout,clearTimeout,Buffer};const f=path.join(root,"main.js");vm.runInNewContext(fs.readFileSync(f,"utf8")+`\nmodule.exports.__api={labels:[...CONSTRUCTION_LABEL_REGISTRY],legitimacy:grammarLegitimacyFor};`,c,{filename:f});return m.exports.__api;}
const api=loadRegistry();
const legitimacy=parseTsv(path.join(root,"test-data","grammar-legitimacy-audit.tsv"));
const accounting=parseTsv(path.join(root,"docs","research","ACTIVE-SOURCE-ACCOUNTING-v0.5.184-R1.tsv"));
const status=parseTsv(path.join(root,"docs","research","CONSTRUCTION-STATUS-REGISTRY-v0.5.184-R2.tsv"));
const retired=parseTsv(path.join(root,"docs","research","RETIRED-CONSTRUCTION-ARCHIVE-v0.5.183-R1.tsv"));
const ledger=parseTsv(path.join(root,"docs","research","CONSTRUCTION-EVIDENCE-REAUDIT-LEDGER-v0.5.184-R1.tsv"));
const active=new Set(status.map(r=>r.runtime_label)),retiredSet=new Set(retired.map(r=>r.runtime_label)),runtime=new Set(api.labels);
const byLeg=new Map(legitimacy.map(r=>[r.pattern,r])),byAcc=new Map(accounting.map(r=>[r.runtime_label,r])),byStatus=new Map(status.map(r=>[r.runtime_label,r]));
const checks=[],failures=[];function check(name,c,d=""){const pass=!!c;checks.push({name,pass,...(d?{detail:d}:{})});if(!pass)failures.push({name,detail:d});}
check("runtime registry has 171 labels",runtime.size===171,String(runtime.size));
check("active governance has 171 labels",active.size===171,String(active.size));
check("runtime exactly equals active governance",runtime.size===active.size&&[...runtime].every(x=>active.has(x)));
check("ten labels are archived as retired",retiredSet.size===10,String(retiredSet.size));
check("retired labels are absent from runtime",[...retiredSet].every(x=>!runtime.has(x)));
check("legitimacy has 171 active rows",legitimacy.length===171,String(legitimacy.length));
check("source accounting has 171 active rows",accounting.length===171,String(accounting.length));
check("legitimacy covers active governance",[...active].every(x=>byLeg.has(x)));
check("source accounting covers active governance",[...active].every(x=>byAcc.has(x)));
check("source accounting statuses match current governance",accounting.every(r=>byStatus.get(r.runtime_label)?.current_linguistic_status===r.legitimacy_status));
check("runtime statuses match current governance",status.every(r=>api.legitimacy(r.runtime_label).status===r.current_linguistic_status));
check("re-audit ledger remains 23 rows",ledger.length===23,String(ledger.length));
check("supported_productive remains zero",legitimacy.filter(r=>r.status==="supported_productive").length===0);
check("two rows remain provisional_reaudit",legitimacy.filter(r=>r.status==="provisional_reaudit").length===2);
check("ordinary provisional remains zero",legitimacy.filter(r=>r.status==="provisional").length===0);
check("no active row is promotion eligible",accounting.every(r=>String(r.productive_acceptance_eligible).toLowerCase()!=="true"));
const result={schema:"canto-span-source-accounting-audit-v4",checkpoint:"v0.5.184-np-subsystem-r1",runtime_registry_labels:runtime.size,active_governance_labels:active.size,retired_labels:retiredSet.size,total:checks.length,passed:checks.length-failures.length,failed:failures.length,status:failures.length?"FAIL":"PASS",checks,failures};
fs.writeFileSync(path.join(outDir,"source-accounting.json"),JSON.stringify(result,null,2)+"\n");console.log(JSON.stringify(result,null,2));if(failures.length)process.exit(1);
