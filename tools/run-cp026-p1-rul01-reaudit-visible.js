#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm");
const root=path.resolve(__dirname,"..");
function load(){
 class Plugin{} class PluginSettingTab{} class Setting{} class Notice{}
 const m={exports:{}};
 const c={module:m,exports:m.exports,require:id=>id==="obsidian"?{Plugin,PluginSettingTab,Setting,Notice}:require(id),console,setTimeout,clearTimeout,Buffer};
 const main=path.join(root,"main.js");
 vm.runInNewContext(fs.readFileSync(main,"utf8")+`\nmodule.exports.api={analyzeLine,diagnosticFinalRows,diagnosticSummary,rootSpanCoverageForDiagnostic,runtimeVersion:CANTO_SPAN_RUNTIME_VERSION,freeze:GRAMMAR_LEGITIMACY_FREEZE,registry:Array.from(CONSTRUCTION_LABEL_REGISTRY),aliases:INTERNAL_CONSTRUCTION_COMPATIBILITY_ALIASES,grammarLegitimacyFor};`,c,{filename:main});
 return m.exports.api;
}
function inspect(api,s){
 const a=api.analyzeLine(s),rows=api.diagnosticFinalRows(a),summary=api.diagnosticSummary(a);
 return {rows,summary,coverage:api.rootSpanCoverageForDiagnostic(rows),constructions:rows.filter(r=>r.kind==="construction"),tokens:rows.filter(r=>r.kind==="token")};
}
const cases=[
 {id:"RUL-S01",surface:"呢個用嚟切嘢。",role:"published_exact_example"},
 {id:"RUL-S02",surface:"另一邊用來儲物。",role:"editorial_oral_history_example"},
 {id:"RUL-S03",surface:"呢間屋用嚟擺嘢。",role:"direct_quote_simple_subspan"},
 {id:"RUL-S04",surface:"呢間屋用嚟擺嘢、養豬養牛。",role:"direct_quote_full_coordinated_predicate"},
 {id:"RUL-B01",surface:"啲錢我用嚟買晒嗰堆嘢。",role:"separate_user_perfective_actual_use"},
 {id:"RUL-B02",surface:"呢個可以用嚟切嘢。",role:"modal_affordance"},
 {id:"RUL-B03",surface:"呢個係用嚟切嘢。",role:"copular_frame"},
 {id:"RUL-B04",surface:"呢個用咗嚟切嘢。",role:"aspect_interrupted_link"},
 {id:"RUL-B05",surface:"我用刀切嘢。",role:"ordinary_instrumental_use"},
 {id:"RUL-B06",surface:"我買刀嚟切嘢。",role:"general_purpose_lai"},
 {id:"RUL-B07",surface:"呢個唔用嚟切嘢。",role:"negated_use_lai"},
 {id:"RUL-B08",surface:"呢個用唔用嚟切嘢？",role:"a_not_a_use_lai"},
 {id:"RUL-B09",surface:"用來用去。",role:"reduplicated_lexical_sequence"},
 {id:"RUL-B10",surface:"我用嚟切嘢。",role:"person_user_without_resource"},
 {id:"RUL-B11",surface:"呢個用嚟。",role:"missing_predicate"},
 {id:"RUL-B12",surface:"呢個用嚟切咗嘢。",role:"perfective_predicate"},
 {id:"RUL-L01",surface:"香港用嚟切嘢。",role:"semantic_selection_probe_location"},
 {id:"RUL-L02",surface:"呢個問題用嚟切嘢。",role:"semantic_selection_probe_abstract_noun"},
 {id:"RUL-L03",surface:"快樂用嚟切嘢。",role:"semantic_selection_probe_abstract_state"},
 {id:"RUL-L04",surface:"我阿媽用嚟切嘢。",role:"semantic_selection_probe_person"},
 {id:"RUL-L05",surface:"呢個醫生用嚟切嘢。",role:"semantic_selection_probe_person_noun"},
 {id:"RUL-Q01",surface:"呢個用嚟做咩㗎？",role:"wh_function_question"}
];
const api=load();
const rows=cases.map(tc=>{
 const result=inspect(api,tc.surface);
 const exact=result.constructions.filter(r=>r.internal_construction==="ResourceUseLaiFunctionRelation");
 const broad=result.constructions.filter(r=>r.internal_construction==="IntendedFunctionRelation");
 const all=result.constructions.map(r=>({internal:r.internal_construction||r.type,public:r.construction||r.public_construction||"",surface:r.surface||"",note:r.note||""}));
 return {case_id:tc.id,surface:tc.surface,role:tc.role,resource_use_lai_count:exact.length,intended_function_count:broad.length,semantic_acceptance_status:result.summary.semantic_acceptance_status||"",root_coverage:result.coverage,missing_jyutping:result.tokens.filter(t=>!t.jyutping).map(t=>t.surface),constructions:all};
});
const payload={schema:"canto-span-cp026-p1-rul01-reaudit-visible-v1",checkpoint:"CP026-P1-RUL01-R1",runtime_version:api.runtimeVersion,parser_behavior_changed:false,current_runtime_embedded_status:api.grammarLegitimacyFor("ResourceUseLaiFunctionRelation").status,case_count:rows.length,exact_target_case_count:rows.filter(r=>r.resource_use_lai_count>0).length,broad_only_case_count:rows.filter(r=>r.resource_use_lai_count===0&&r.intended_function_count>0).length,no_relation_case_count:rows.filter(r=>r.resource_use_lai_count===0&&r.intended_function_count===0).length,case_results:rows};
const out=path.join(root,"validation/cp026-p1-rul01-reaudit-r1/RUL01-VISIBLE-CURRENT.json");fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(payload,null,2)+"\n");console.log(JSON.stringify(payload,null,2));
