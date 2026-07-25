#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");

function runNode(script, args = []) {
  execFileSync(process.execPath, [path.join(root, script), ...args], {
    cwd: root,
    stdio: "inherit",
  });
}

runNode("tools/apply-construction-adjudications.js", ["--write"]);
runNode("tools/generate-construction-identities.js", ["--write"]);
runNode("tools/build-construction-identity-lock.js", ["--write"]);
runNode("tools/generate-supported-productive-discovery.js", ["--write"]);

const raw = execFileSync("git", ["diff", "--name-only", "-z"], {
  cwd: root,
  encoding: "utf8",
});
const names = raw.split("\0").filter(Boolean).sort();
const files = {};
for (const name of names) {
  const absolute = path.join(root, name);
  if (fs.existsSync(absolute) && fs.statSync(absolute).isFile()) {
    files[name] = fs.readFileSync(absolute, "utf8");
  }
}

const payload = {
  schema: "canto-span-generated-output-archive-v1",
  source_commit: process.env.GITHUB_SHA || null,
  files,
};
const base64 = zlib.gzipSync(Buffer.from(JSON.stringify(payload), "utf8"), { level: 9 }).toString("base64");

console.log("BATCH12_CHANGED_FILES " + JSON.stringify(Object.keys(files)));
console.log("BATCH12_ARCHIVE_BEGIN");
for (let index = 0; index < base64.length; index += 4000) {
  console.log(`BATCH12_ARCHIVE_${String(index / 4000).padStart(4, "0")} ${base64.slice(index, index + 4000)}`);
}
console.log("BATCH12_ARCHIVE_END");

// This is a diagnostic generation run, not a verification pass.
process.exitCode = 1;
