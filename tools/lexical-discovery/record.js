"use strict";

function requireString(value, field) {
  if (typeof value !== "string" || !value) {
    throw new Error(`${field} must be a non-empty string`);
  }
}

function normalizeDiscoveryRecord(input) {
  if (!input || typeof input !== "object") {
    throw new Error("discovery record must be an object");
  }

  requireString(input.source_id, "source_id");
  requireString(input.surface, "surface");

  return {
    schema: "canto-span-lexical-discovery-record-v1",
    source_id: input.source_id,
    source_row: input.source_row ?? null,
    surface: input.surface,
    source_readings: Array.isArray(input.source_readings) ? [...input.source_readings] : [],
    source_tags: Array.isArray(input.source_tags) ? [...input.source_tags] : [],
    frequency: input.frequency ?? null,
    normalization: {
      status: input.normalization?.status || "unresolved",
      notes: input.normalization?.notes || null,
    },
    authority: {
      status: "not_adjudicated",
    },
  };
}

module.exports = { normalizeDiscoveryRecord };
