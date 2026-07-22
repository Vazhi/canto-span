#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const { validateReleaseAudit } = require("./release-handoff-lib");
const root = path.resolve(__dirname, "..");
const cases = JSON.parse(fs.readFileSync(path.join(root, "test-data", "release-handoff-gate-v2.json"), "utf8"));
const baseAudit = {
  schema: "canto-span-release-handoff-audit-v2",
  release_id: "test",
  base_tree: "4ea31798f0d98edc9df1278c262b53d0a9df0a4a",
  handoff_sequence: 9,
  status_changes: [],
  changed_construction_audit: [],
  supported_productive_pending_reaudit: [],
  implementation_validation: "PASS implementation",
  linguistic_confidence: "No linguistic status changed",
  code_analysis_overclaim_review: true,
  overclaim_review_scope: "Reviewed code and release claims.",
  external_audit_ready: true
};
const baseRetirement = {schema:"canto-span-retirement-review-cadence-v1",last_full_review_sequence:3,current_handoff_sequence:9,hard_interval_max:20};
const results=[];
for (const item of cases) {
  const audit={...baseAudit,...(item.audit_overrides||{})};
  const retirement={...baseRetirement,...(item.retirement_overrides||{})};
  const result=validateReleaseAudit({audit,actualChanges:item.actual_changes,supportedPending:item.supported_pending,retirement});
  let pass;
  if (item.expected_failures) pass=JSON.stringify(result.failures)===JSON.stringify(item.expected_failures);
  else if (item.expected_failure) pass=result.failures.includes(item.expected_failure);
  else pass=result.failures.some((value)=>value.startsWith(item.expected_failure_prefix));
  results.push({name:item.name,pass,failures:result.failures});
}
const failed=results.filter((item)=>!item.pass).length;
const report={schema:"canto-span-release-handoff-gate-tests-v2",total:results.length,passed:results.length-failed,failed,status:failed?"FAIL":"PASS",results};
const manifest=JSON.parse(fs.readFileSync(path.join(root,"manifest.json"),"utf8"));
const outDir=path.join(root, "validation", "current"); fs.mkdirSync(outDir,{recursive:true});
fs.writeFileSync(path.join(outDir,"release-handoff-gate-tests.json"),JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify(report,null,2));
if(failed) process.exit(1);
