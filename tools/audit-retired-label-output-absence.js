#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm");
const root=path.resolve(__dirname,"..");
function parseTsv(file){const text=fs.readFileSync(file,"utf8").trimEnd();if(!text)return[];const lines=text.split(/\r?\n/),h=lines.shift().split("\t");return lines.filter(Boolean).map(line=>{const v=line.split("\t");return Object.fromEntries(h.map((k,i)=>[k,v[i]??""]));});}
class Plugin{}class PluginSettingTab{}class Setting{}class Notice{}const m={exports:{}},c={module:m,exports:m.exports,require:(id)=>id==="obsidian"?{Plugin,PluginSettingTab,Setting,Notice}:require(id),console,setTimeout,clearTimeout,Buffer};const main=path.join(root,"main.js");vm.runInNewContext(fs.readFileSync(main,"utf8")+`\nmodule.exports.__a={analyzeLine,diagnosticFinalRows,runtimeVersion:CANTO_SPAN_RUNTIME_VERSION,registry:[...CONSTRUCTION_LABEL_REGISTRY]};`,c,{filename:main});const api=m.exports.__a;
const retired=parseTsv(path.join(root,"docs","research","RETIRED-CONSTRUCTION-ARCHIVE-v0.5.183-R1.tsv"));const retiredSet=new Set(retired.map(r=>r.runtime_label));
const fixture=JSON.parse(fs.readFileSync(path.join(root,"tests","fixtures","regression-snapshots.json"),"utf8"));
const np=JSON.parse(fs.readFileSync(path.join(root,"tests","fixtures","np-subsystem.json"),"utf8"));
const cases=[];for(const x of fixture.cases||[])cases.push({set:"regression",id:x.id||x.source,source:x.source,context:x.context_source||null});for(const x of np.cases||[])cases.push({set:"np_subsystem",id:x.id||x.case_id||x.surface,source:x.surface,context:x.context_source||null});
const hits=[];let analyzed=0;for(const x of cases){if(!x.source)continue;const rows=api.diagnosticFinalRows(api.analyzeLine(x.source,x.context));analyzed++;for(const r of rows){for(const [field,value] of [["construction",r.construction],["internal_construction",r.internal_construction],["compatibility_alias",r.compatibility_alias]]){if(retiredSet.has(value))hits.push({set:x.set,id:x.id,source:x.source,field,label:value,surface:r.display_surface||r.surface||""});}}}
const registryResidue=[...retiredSet].filter(x=>api.registry.includes(x));
const result={schema:"canto-span-retired-label-output-absence-v2",checkpoint:"v0.5.185-standard-construction-tests",runtime_version:api.runtimeVersion,retired_labels:[...retiredSet].sort(),case_count:analyzed,active_registry_residue:registryResidue,retired_label_output_hits:hits.length,status:!hits.length&&!registryResidue.length?"PASS":"FAIL",hits};
const out=path.join(root,"validation",`v${api.runtimeVersion}`);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,"retired-label-output-absence.json"),JSON.stringify(result,null,2)+"\n");console.log(JSON.stringify(result,null,2));if(result.status!=="PASS")process.exit(1);
