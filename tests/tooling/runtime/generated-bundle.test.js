#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { generatedBanner, root } = require("../../../tools/build-runtime");
const { loadGeneratedRuntimeApi } = require("../../lib/runtime-api");

const mainPath = path.join(root, "main.js");

test("generated runtime is labeled, loadable, and self-contained", () => {
  const source = fs.readFileSync(mainPath, "utf8");
  assert(source.startsWith(generatedBanner), "main.js must identify itself as generated");

  const api = loadGeneratedRuntimeApi(mainPath);
  assert.match(api.runtimeVersion, /^0\.5\.\d+$/);
  assert(api.labels.length > 0, "generated runtime must expose construction labels");

  const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
  assert.equal(packageJson.version, api.runtimeVersion, "package.json version must match generated runtime");
  assert.equal(manifest.version, api.runtimeVersion, "manifest.json version must match generated runtime");

  const analysis = api.analyzeLine("你好。");
  const rows = api.diagnosticFinalRows(analysis);
  assert(Array.isArray(rows));
  assert(rows.length > 0, "generated runtime must execute under the Obsidian stub");
});
