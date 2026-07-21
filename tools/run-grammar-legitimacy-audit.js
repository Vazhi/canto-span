#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm");
const root=path.resolve(__dirname,"..");
function parseTsv(f){const t=fs.readFileSync(f,"utf8").trimEnd();if(!t)return[];const l=t.split(/\r?\n/),h=l.shift().split("\t");return l.filter(Boolean).map(x=>{const v=x.split("\t");return Object.fromEntries(h.map((k,i)=>[k,v[i]??""]));});}
function load(){class Plugin{}class PluginSettingTab{}class Setting{}class Notice{}const m={exports:{}},c={module:m,exports:m.exports,require:(id)=>id==="obsidian"?{Plugin,PluginSettingTab,Setting,Notice}:require(id),console,setTimeout,clearTimeout,Buffer};const f=path.join(root,"main.js");vm.runInNewContext(fs.readFileSync(f,"utf8")+`\nmodule.exports.__a={runtimeVersion:CANTO_SPAN_RUNTIME_VERSION,freeze:GRAMMAR_LEGITIMACY_FREEZE,registry:[...CONSTRUCTION_LABEL_REGISTRY],grammarLegitimacyFor};`,c,{filename:f});return m.exports.__a;}
const api=load();
const audit=JSON.parse(fs.readFileSync(path.join(root,"test-data","grammar-legitimacy-audit.json"),"utf8"));
const rows=audit.patterns||[];
const retired=parseTsv(path.join(root,"docs","research","RETIRED-CONSTRUCTION-ARCHIVE-v0.5.183-R1.tsv"));
const retiredSet=new Set(retired.map(r=>r.runtime_label));
const runtimeLabels=[...api.registry].sort(),auditLabels=rows.map(r=>r.pattern).sort();
const checks=[],failures=[];function check(name,c,d=""){const pass=!!c;checks.push({name,pass,...(d?{detail:d}:{})});if(!pass)failures.push({name,detail:d});}
check("runtime is v0.5.184",api.runtimeVersion==="0.5.184",api.runtimeVersion);
check("grammar freeze remains active",api.freeze===true);
check("runtime registry has 171 active labels",runtimeLabels.length===171,String(runtimeLabels.length));
check("active audit has 171 rows",rows.length===171,String(rows.length));
check("audit exactly covers active runtime registry",JSON.stringify(auditLabels)===JSON.stringify(runtimeLabels));
check("ten labels remain archived as retired",retiredSet.size===10,String(retiredSet.size));
check("retired labels are absent from active runtime",[...retiredSet].every(x=>!api.registry.includes(x)),[...retiredSet].filter(x=>api.registry.includes(x)).join(","));
const allowed=new Set(["supported_productive","supported_lexicalized","provisional_reaudit","provisional","research_pending","parser_heuristic","lexicalized_only","unsupported_generalization"]);
for(const r of rows)check(`known status: ${r.pattern}`,allowed.has(r.status),r.status);
const counts={};for(const r of rows)counts[r.status]=(counts[r.status]||0)+1;
check("supported_productive is zero",(counts.supported_productive||0)===0,JSON.stringify(counts));
check("two prior acceptances remain under re-audit",(counts.provisional_reaudit||0)===2,JSON.stringify(counts));
check("ordinary provisional is zero",(counts.provisional||0)===0,JSON.stringify(counts));
check("research_pending is 58",(counts.research_pending||0)===58,JSON.stringify(counts));
check("unsupported_generalization is 87",(counts.unsupported_generalization||0)===87,JSON.stringify(counts));
const runtimeStatusMismatches=rows.filter(r=>api.grammarLegitimacyFor(r.pattern).status!==r.status).map(r=>({pattern:r.pattern,runtime_status:api.grammarLegitimacyFor(r.pattern).status,governance_status:r.status}));
check("runtime and governance statuses are fully aligned",runtimeStatusMismatches.length===0,JSON.stringify(runtimeStatusMismatches));
check("PostverbalZoPerfectiveVP is provisional_reaudit",api.grammarLegitimacyFor("PostverbalZoPerfectiveVP").status==="provisional_reaudit",api.grammarLegitimacyFor("PostverbalZoPerfectiveVP").status);
check("ResourceUseLaiFunctionRelation is provisional_reaudit",api.grammarLegitimacyFor("ResourceUseLaiFunctionRelation").status==="provisional_reaudit",api.grammarLegitimacyFor("ResourceUseLaiFunctionRelation").status);
check("OvertHeadDemonstrativeClassifierNP remains research_pending",api.grammarLegitimacyFor("OvertHeadDemonstrativeClassifierNP").status==="research_pending",api.grammarLegitimacyFor("OvertHeadDemonstrativeClassifierNP").status);
const result={schema:"canto-span-grammar-legitimacy-audit-result-v4",checkpoint:"v0.5.184-np-subsystem-r1",runtime_version:api.runtimeVersion,parser_behavior_changed:true,status_counts:counts,runtime_status_mismatches:runtimeStatusMismatches,retired_labels:[...retiredSet].sort(),total:checks.length,passed:checks.length-failures.length,failed:failures.length,status:failures.length?"FAIL":"PASS",checks,failures};
const outDir=path.join(root,"validation","v0.5.184");fs.mkdirSync(outDir,{recursive:true});const out=path.join(outDir,"grammar-legitimacy.json");fs.writeFileSync(out,JSON.stringify(result,null,2)+"\n");console.log(JSON.stringify(result,null,2));if(failures.length)process.exit(1);
