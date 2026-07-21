#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path");const root=path.resolve(__dirname,"..");
const checks=[],failures=[];function check(name,fn){try{const detail=fn();checks.push({name,pass:true,...(detail?{detail}:{})});}catch(e){const row={name,pass:false,error:e.message};checks.push(row);failures.push(row);}}
function read(rel){return fs.readFileSync(path.join(root,rel),"utf8");}function json(rel){return JSON.parse(read(rel));}
const evidence=read("test-data/native-speaker-naturalness-evidence-v1.tsv");
const dispositions=read("test-data/native-naturalness-conflict-dispositions.tsv");
const doctrine=read("docs/current/DOCTRINE.md");
const definition=read("docs/current/DEFINITION-OF-DONE.md");
const audit=json("test-data/grammar-legitimacy-audit.json");
const pfv=audit.patterns.find(x=>x.pattern==="PostverbalZoPerfectiveVP");
const rul=audit.patterns.find(x=>x.pattern==="ResourceUseLaiFunctionRelation");
check("two exact V完咗O native rejections retained",()=>{for(const x of ["食完咗飯。","我食完咗飯。"])if(!evidence.includes(x+"\t\tmarked_unnatural"))throw new Error(`missing rejection ${x}`);});
check("accepted completion contrasts retained",()=>{for(const x of ["我食完飯。","我食完飯喇。"])if(!evidence.includes(x+"\t\taccepted_unchecked"))throw new Error(`missing contrast ${x}`);});
check("higher-burden disposition remains recorded",()=>{if((dispositions.match(/quarantine_native_conflicted_V完咗O_family_higher_burden/g)||[]).length<2)throw new Error("higher-burden dispositions missing");});
check("dialect or register explanation is not assumed",()=>{for(const bad of ["Treat this as surface, lexical, discourse, register, or speaker variation","retain_as_native_surface_variation_conflict_after_external_attestation"])if(dispositions.includes(bad))throw new Error(`stale wording: ${bad}`);});
check("no construction is currently supported_productive",()=>{const xs=audit.patterns.filter(x=>x.status==="supported_productive");if(xs.length)throw new Error(xs.map(x=>x.pattern).join(","));});
check("PFV remains under re-audit despite implementation gains",()=>{if(pfv?.status!=="provisional_reaudit")throw new Error(pfv?.status||"missing");});
check("ResourceUse remains under re-audit",()=>{if(rul?.status!=="provisional_reaudit")throw new Error(rul?.status||"missing");});
check("native conflict cannot be overridden by publication attestation",()=>{if(!doctrine.includes("publication")&&!doctrine.includes("Publication"))throw new Error("doctrine lacks publication-attestation limitation");});
check("two independent speakers remain required",()=>{if(!definition.includes("Two independent native speakers"))throw new Error("Definition of Done lacks two-speaker requirement");});
check("second-speaker freeze is explicit and does not waive the gate",()=>{if(!doctrine.includes("Second-speaker work is currently frozen")||!doctrine.includes("Preserve every unmet requirement"))throw new Error("freeze rule missing");});
check("internal validation cannot substitute for linguistic evidence",()=>{if(!definition.includes("necessary but never sufficient"))throw new Error("separation rule missing");});
const out={schema:"canto-span-native-conflict-burden-audit-v3",checkpoint:"v0.5.184-np-subsystem-r1",status:failures.length?"FAIL":"PASS",total:checks.length,passed:checks.length-failures.length,failed:failures.length,policy:{publication_attestation_alone_sufficient:false,assumed_dialect_explanation:false,second_speaker_required:true,second_speaker_work_frozen_not_waived:true},checks,failures};
const outPath=path.join(root,"validation/v0.5.184/native-conflict-burden.json");fs.mkdirSync(path.dirname(outPath),{recursive:true});fs.writeFileSync(outPath,JSON.stringify(out,null,2)+"\n");console.log(JSON.stringify(out,null,2));if(failures.length)process.exit(1);
