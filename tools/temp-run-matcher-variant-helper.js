#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");

const root = path.join(__dirname, "..");
const metadataPath = path.join(root, "src", "runtime-resources", "diagnostics", "trace-metadata.js");
let metadata = fs.readFileSync(metadataPath, "utf8");

if (!metadata.includes('const MATCHER_VARIANT_SCHEMA = "canto-span-matcher-variant-v1";')) {
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
  source = source.replaceAll("OpinionStanceFrame.stance_geidak", "OpinionStanceFrame.stance_gokdak");

  const compiled = new Module(helperPath, module.parent);
  compiled.filename = helperPath;
  compiled.paths = module.paths;
  compiled._compile(source, helperPath);
  metadata = fs.readFileSync(metadataPath, "utf8");
}

metadata = metadata.replaceAll("OpinionStanceFrame.stance_geidak", "OpinionStanceFrame.stance_gokdak");
fs.writeFileSync(metadataPath, metadata);

const testPath = path.join(root, "tests", "tooling", "parser-coverage", "enhanced.test.js");
let tests = fs.readFileSync(testPath, "utf8");
tests = tests.replaceAll("OpinionStanceFrame.stance_geidak", "OpinionStanceFrame.stance_gokdak");
tests = tests.replace('"我以為佢走咗."', '"我以為佢走咗。"');
fs.writeFileSync(testPath, tests);

console.log(JSON.stringify({
  schema: "canto-span-temp-matcher-variant-wrapper-v2",
  migration_already_present: metadata.includes('const MATCHER_VARIANT_SCHEMA = "canto-span-matcher-variant-v1";'),
  normalized_unpublished_variant_id: "OpinionStanceFrame.stance_gokdak",
}, null, 2));
