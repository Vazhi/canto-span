#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const filePath = path.resolve(__dirname, "parser-coverage-report.js");
const original = fs.readFileSync(filePath, "utf8");
const oldText = `      if (hasStructuredBindings && trace.binding_contract_status === "complete") {
        const span = binding.relative_span || {};
        const invalidStructuredBinding = !binding.slot || span.status !== "unique"
          || !Number.isInteger(span.start) || !Number.isInteger(span.end)
          || span.start < 0 || span.end < span.start || span.end > trace.surface.length;`;
const newText = `      if (hasStructuredBindings && trace.binding_contract_status === "complete") {
        const span = binding.relative_span || {};
        const structuredDisplaySpan = trace.construction_provenance && trace.construction_provenance.display_span;
        const structuredSurfaceLength = structuredDisplaySpan && structuredDisplaySpan.status === "unique"
          ? Number(structuredDisplaySpan.end) - Number(structuredDisplaySpan.start)
          : String(trace.construction_provenance && trace.construction_provenance.display_surface || trace.surface || "").length;
        const invalidStructuredBinding = !binding.slot || span.status !== "unique"
          || !Number.isInteger(span.start) || !Number.isInteger(span.end)
          || span.start < 0 || span.end < span.start || span.end > structuredSurfaceLength;`;
if (!original.includes(oldText)) throw new Error("structured sanity bound marker not found");
const updated = original.replace(oldText, newText);
fs.writeFileSync(filePath, updated);
console.log(JSON.stringify({ schema: "canto-span-temp-structured-sanity-bound-fix-v1", changed: updated !== original }, null, 2));
