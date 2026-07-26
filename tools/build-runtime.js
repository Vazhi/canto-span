#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");
const { validateRuntimeLexicalResources } = require("../src/runtime-resources/lexicon/validate");

const root = path.resolve(__dirname, "..");
const entry = "src/plugin-entry.js";
const outputPath = path.join(root, "main.js");

const buildOptions = {
  absWorkingDir: root,
  entryPoints: [entry],
  bundle: true,
  platform: "node",
  format: "cjs",
  target: ["es2020"],
  external: ["obsidian"],
  legalComments: "inline",
  charset: "utf8",
  minify: false,
  sourcemap: false,
  treeShaking: true,
  write: false,
  outfile: "main.js",
  logLevel: "warning",
};

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

async function buildBytes() {
  const result = await esbuild.build(buildOptions);
  if (!result.outputFiles || result.outputFiles.length !== 1) {
    throw new Error(`expected one generated runtime file, received ${result.outputFiles?.length || 0}`);
  }
  return Buffer.from(result.outputFiles[0].contents);
}

async function main() {
  const check = process.argv.includes("--check");
  const lexicalResources = validateRuntimeLexicalResources();
  const first = await buildBytes();

  if (check) {
    const second = await buildBytes();
    if (!first.equals(second)) {
      throw new Error(`runtime build is nondeterministic: ${sha256(first)} != ${sha256(second)}`);
    }
    if (!fs.existsSync(outputPath)) {
      throw new Error("main.js is missing; run npm run build:runtime");
    }
    const committed = fs.readFileSync(outputPath);
    if (!first.equals(committed)) {
      throw new Error(
        `main.js is stale: generated ${sha256(first)} != committed ${sha256(committed)}; run npm run build:runtime`,
      );
    }
    process.stdout.write(`${JSON.stringify({
      status: "PASS",
      entry,
      output: "main.js",
      bytes: first.length,
      sha256: sha256(first),
      deterministic_builds: 2,
      lexical_resources: lexicalResources,
    }, null, 2)}\n`);
    return;
  }

  fs.writeFileSync(outputPath, first);
  process.stdout.write(`${JSON.stringify({
    status: "BUILT",
    entry,
    output: "main.js",
    bytes: first.length,
    sha256: sha256(first),
    lexical_resources: lexicalResources,
  }, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message || String(error)}\n`);
  process.exit(1);
});
