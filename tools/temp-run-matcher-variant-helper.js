#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");

const helperPath = path.join(__dirname, "temp-apply-matcher-variants.js");
let source = fs.readFileSync(helperPath, "utf8");
const startMarker = 'apply(\n  "tools/parser-coverage-enhanced.js",\n  `    parts.push(';
const endMarker = '\nconst extraTests = `';
const start = source.indexOf(startMarker);
const end = source.indexOf(endMarker, start);
if (start < 0 || end < 0 || end <= start) {
  throw new Error("Unable to isolate the two nonessential human-formatting replacement blocks.");
}
source = source.slice(0, start) + source.slice(end);

const compiled = new Module(helperPath, module.parent);
compiled.filename = helperPath;
compiled.paths = module.paths;
compiled._compile(source, helperPath);
