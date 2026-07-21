"use strict";

const fs = require("fs");
const vm = require("vm");

function loadRuntimeApi(mainPath) {
  class Plugin {}
  class PluginSettingTab {}
  class Setting {}
  class Notice {}
  const moduleRecord = { exports: {} };
  const context = {
    module: moduleRecord,
    exports: moduleRecord.exports,
    require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id),
    console,
    setTimeout,
    clearTimeout,
    Buffer,
  };
  vm.runInNewContext(fs.readFileSync(mainPath, "utf8") + `
module.exports.__testApi = {
  analyzeLine, diagnosticSummary, diagnosticFinalRows,
  normalizationAuditSummary, registryAuditSummary, learnerDisplayAuditSummary,
  learnerUiHoverAuditSummary, wrapperCoverageAuditSummary, jyutpingAuditSummary,
  runtimeVersion: CANTO_SPAN_RUNTIME_VERSION,
  labels: [...CONSTRUCTION_LABEL_REGISTRY],
};`, context, { filename: mainPath });
  return moduleRecord.exports.__testApi;
}

function internalConstruction(row) {
  return row.internal_construction || row.construction || row.type || "";
}

function rowSurface(row) {
  return row.display_surface || row.surface || "";
}

module.exports = { loadRuntimeApi, internalConstruction, rowSurface };
