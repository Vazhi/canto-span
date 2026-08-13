#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const reviewedPath = path.join(root, "src", "runtime-resources", "lexicon", "token-lexicon", "cifu-r1-250-reviewed.js");
let reviewed = fs.readFileSync(reviewedPath, "utf8");
const reviewedPattern = /(analysis\(152,\s*5275707047,\s*"間",\s*)"[^"]+"/u;
if (!reviewedPattern.test(reviewed)) throw new Error("Could not locate rank-152 間 classifier analysis ID");
reviewed = reviewed.replace(reviewedPattern, '$1"classifier_gaan1"');
fs.writeFileSync(reviewedPath, reviewed);

const validatorPath = path.join(root, "src", "runtime-resources", "lexicon", "validate.js");
let validator = fs.readFileSync(validatorPath, "utf8");
const oldCardinality = '    if (!Array.isArray(rows) || rows.length < 2) throw new Error(`explicit lexical analyses for ${surface} must contain at least two analyses`);\n    multiAnalysisSurfaceCount += 1;\n';
const newCardinality = '    if (!Array.isArray(rows) || rows.length < 1) throw new Error(`explicit lexical analyses for ${surface} must contain at least one analysis`);\n'
  + '    if (rows.length === 1) {\n'
  + '      const baseEntry = defaultEntries[surface] || {};\n'
  + '      const neutralFrequencyCoverage = String(baseEntry.pos || "") === "lexical_item"\n'
  + '        && String(baseEntry.syntax || "").split(/\\s+/u).includes("lexical_item")\n'
  + '        && String(baseEntry.note || "").includes("Exact surface retained as neutral lexical coverage");\n'
  + '      if (!neutralFrequencyCoverage) {\n'
  + '        throw new Error(`single explicit lexical analysis for ${surface} requires a neutral frequency-coverage base entry`);\n'
  + '      }\n'
  + '    } else {\n'
  + '      multiAnalysisSurfaceCount += 1;\n'
  + '    }\n';
if (validator.includes(oldCardinality)) {
  validator = validator.replace(oldCardinality, newCardinality);
} else if (!validator.includes("single explicit lexical analysis for ${surface} requires a neutral frequency-coverage base entry")) {
  throw new Error("Could not locate lexical-analysis cardinality validation block");
}

const oldObjectCheck = '      if (!analysis || typeof analysis !== "object" || Array.isArray(analysis)) throw new Error(`lexical analysis for ${surface} must be an object`);\n      for (const key of ["id", "label", "pos", "jyutping", "syntax"]) assertNonEmptyString(analysis[key], `lexical analysis ${surface} ${key}`);\n';
const newObjectCheck = '      if (!analysis || typeof analysis !== "object" || Array.isArray(analysis)) throw new Error(`lexical analysis for ${surface} must be an object`);\n'
  + '      if (rows.length === 1 && (!analysis.provenance || analysis.provenance.kind !== "expert_lexical_adjudication")) {\n'
  + '        throw new Error(`single explicit lexical analysis for ${surface} requires expert lexical adjudication provenance`);\n'
  + '      }\n'
  + '      for (const key of ["id", "label", "pos", "jyutping", "syntax"]) assertNonEmptyString(analysis[key], `lexical analysis ${surface} ${key}`);\n';
if (validator.includes(oldObjectCheck)) {
  validator = validator.replace(oldObjectCheck, newObjectCheck);
} else if (!validator.includes("single explicit lexical analysis for ${surface} requires expert lexical adjudication provenance")) {
  throw new Error("Could not locate lexical-analysis object validation block");
}

fs.writeFileSync(validatorPath, validator);
