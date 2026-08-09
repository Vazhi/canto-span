"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { buildRuntimeBytes, entry, root } = require("../build-runtime");

const DEFAULT_API_NAMES = Object.freeze([
  "analyzeLine",
  "diagnosticSummary",
  "diagnosticFinalRows",
  "normalizationAuditSummary",
  "registryAuditSummary",
  "learnerDisplayAuditSummary",
  "learnerUiHoverAuditSummary",
  "wrapperCoverageAuditSummary",
  "jyutpingAuditSummary",
  "CANTO_SPAN_RUNTIME_VERSION",
  "CONSTRUCTION_LABEL_REGISTRY",
]);

function obsidianStub() {
  class Plugin {}
  class PluginSettingTab {}
  class Setting {}
  class Notice {}
  return { Plugin, PluginSettingTab, Setting, Notice };
}

function evaluateRuntime(code, filename, apiNames) {
  const moduleRecord = { exports: {} };
  const context = {
    module: moduleRecord,
    exports: moduleRecord.exports,
    require: (id) => id === "obsidian" ? obsidianStub() : require(id),
    console,
    setTimeout,
    clearTimeout,
    Buffer,
  };
  const bindings = apiNames.map((name) => `${JSON.stringify(name)}: ${name}`).join(",\n  ");
  vm.runInNewContext(`${code}\nmodule.exports.__testApi = {\n  ${bindings}\n};`, context, { filename });
  return moduleRecord.exports.__testApi;
}

function normalizeDefaultApi(raw) {
  if (raw.CANTO_SPAN_RUNTIME_VERSION !== undefined) {
    raw.runtimeVersion = raw.CANTO_SPAN_RUNTIME_VERSION;
    delete raw.CANTO_SPAN_RUNTIME_VERSION;
  }
  if (raw.CONSTRUCTION_LABEL_REGISTRY !== undefined) {
    raw.labels = [...raw.CONSTRUCTION_LABEL_REGISTRY];
    delete raw.CONSTRUCTION_LABEL_REGISTRY;
  }
  return raw;
}

function loadRuntimeApi(options = {}) {
  const apiNames = options.apiNames || DEFAULT_API_NAMES;
  const code = buildRuntimeBytes({ logLevel: "silent" }).toString("utf8");
  const api = evaluateRuntime(code, `${path.join(root, entry)} [in-memory bundle]`, apiNames);
  return apiNames === DEFAULT_API_NAMES ? normalizeDefaultApi(api) : api;
}

function loadGeneratedRuntimeApi(mainPath = path.join(root, "main.js"), options = {}) {
  const apiNames = options.apiNames || DEFAULT_API_NAMES;
  const api = evaluateRuntime(fs.readFileSync(mainPath, "utf8"), mainPath, apiNames);
  return apiNames === DEFAULT_API_NAMES ? normalizeDefaultApi(api) : api;
}

function internalConstruction(row) {
  return row.internal_construction || row.construction || row.type || "";
}

function rowSurface(row) {
  return row.display_surface || row.surface || "";
}

module.exports = {
  DEFAULT_API_NAMES,
  internalConstruction,
  loadGeneratedRuntimeApi,
  loadRuntimeApi,
  rowSurface,
};
