#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const registryPath = path.join(root, "data", "construction-identities.json");
const lockPath = path.join(root, "data", "construction-identity-lock.json");
const writeMode = process.argv.includes("--write");

function stableJson(value) {
  return JSON.stringify(value, null, 2) + "\n";
}

if (!fs.existsSync(registryPath)) throw new Error("Missing data/construction-identities.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const existing = fs.existsSync(lockPath)
  ? JSON.parse(fs.readFileSync(lockPath, "utf8"))
  : { schema: "canto-span-construction-identity-lock-v1", entries: [] };

if (existing.schema !== "canto-span-construction-identity-lock-v1") {
  throw new Error(`Unexpected lock schema: ${existing.schema}`);
}

const registryByUuid = new Map(registry.records.map((record) => [record.construction_uuid, record]));
const existingByUuid = new Map();
for (const entry of existing.entries || []) {
  if (existingByUuid.has(entry.construction_uuid)) throw new Error(`Duplicate locked UUID: ${entry.construction_uuid}`);
  existingByUuid.set(entry.construction_uuid, entry);
  const current = registryByUuid.get(entry.construction_uuid);
  if (!current) throw new Error(`Locked identity disappeared from registry: ${entry.construction_uuid}`);
  if (entry.construction_code !== null && current.construction_code !== entry.construction_code) {
    throw new Error(
      `Permanent code changed for ${entry.construction_uuid}: ` +
      `${entry.construction_code} -> ${current.construction_code}`
    );
  }
  if (entry.construction_code === null && current.construction_code !== null) {
    entry.construction_code = current.construction_code;
    entry.code_locked_at = "2026-07-24";
  }
}

const entries = [];
for (const record of registry.records) {
  const prior = existingByUuid.get(record.construction_uuid);
  entries.push(prior || {
    construction_uuid: record.construction_uuid,
    construction_code: record.construction_code,
    initial_canonical_name: record.canonical_name,
    identity_locked_at: "2026-07-24",
    code_locked_at: record.construction_code === null ? null : "2026-07-24"
  });
}
entries.sort((a, b) => {
  const left = a.construction_code || `ZZZZ-${a.construction_uuid}`;
  const right = b.construction_code || `ZZZZ-${b.construction_uuid}`;
  return left < right ? -1 : left > right ? 1 : 0;
});

const output = {
  schema: "canto-span-construction-identity-lock-v1",
  entry_count: entries.length,
  entries
};
const content = stableJson(output);

if (writeMode) {
  fs.mkdirSync(path.dirname(lockPath), { recursive: true });
  fs.writeFileSync(lockPath, content);
} else {
  if (!fs.existsSync(lockPath)) throw new Error("Missing data/construction-identity-lock.json");
  const current = fs.readFileSync(lockPath, "utf8");
  if (current !== content) throw new Error("Construction identity lock is stale");
}

console.log(JSON.stringify({
  schema: "canto-span-construction-identity-lock-check-v1",
  mode: writeMode ? "write" : "check",
  entries: entries.length,
  status: "PASS"
}, null, 2));
