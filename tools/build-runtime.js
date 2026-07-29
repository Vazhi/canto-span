#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");
const { validateRuntimeLexicalResources } = require("../src/runtime-resources/lexicon/validate");
const { validateRuntimeDeclarativeResources } = require("../src/runtime-resources/validate-declarative");

const root = path.resolve(__dirname, "..");
const entry = "src/plugin-entry.js";
const output = "main.js";
const outputPath = path.join(root, output);
const generatedBanner = [
  "// GENERATED FILE — DO NOT EDIT DIRECTLY.",
  "// Canonical source: src/** and src/runtime-resources/**",
  "// Regenerate with: npm run build:runtime",
].join("\n");

const buildOptions = Object.freeze({
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
  outfile: output,
  logLevel: "warning",
  banner: { js: generatedBanner },
});

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function buildRuntimeBytes(overrides = {}) {
  const result = esbuild.buildSync({ ...buildOptions, ...overrides });
  if (!result.outputFiles || result.outputFiles.length !== 1) {
    throw new Error(`expected one generated runtime file, received ${result.outputFiles?.length || 0}`);
  }
  return Buffer.from(result.outputFiles[0].contents);
}

function validateRuntimeResources() {
  return {
    lexicalResources: validateRuntimeLexicalResources(),
    declarativeResources: validateRuntimeDeclarativeResources(),
  };
}

function buildSummary(status, bytes, resources, extra = {}) {
  return {
    status,
    entry,
    output,
    bytes: bytes.length,
    sha256: sha256(bytes),
    ...extra,
    lexical_resources: resources.lexicalResources,
    declarative_resources: resources.declarativeResources,
  };
}

function main() {
  const check = process.argv.includes("--check");
  const resources = validateRuntimeResources();
  const first = buildRuntimeBytes();

  if (check) {
    const second = buildRuntimeBytes();
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
    process.stdout.write(`${JSON.stringify(buildSummary("PASS", first, resources, {
      deterministic_builds: 2,
    }), null, 2)}\n`);
    return;
  }

  fs.writeFileSync(outputPath, first);
  process.stdout.write(`${JSON.stringify(buildSummary("BUILT", first, resources), null, 2)}\n`);
}

module.exports = {
  buildOptions,
  buildRuntimeBytes,
  entry,
  generatedBanner,
  output,
  outputPath,
  root,
  sha256,
};

if (require.main === module) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.stack || error.message || String(error)}\n`);
    process.exit(1);
  }
}
