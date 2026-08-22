"use strict";

function stable(value) {
  return JSON.stringify(value, Object.keys(value).sort());
}

function identityFor(record) {
  return `${record.surface}\u0000${record.source_id}`;
}

function detectConflicts(records) {
  const grouped = new Map();
  for (const record of records) {
    const key = record.surface || "";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(record);
  }

  const conflicts = [];
  for (const [surface, items] of grouped) {
    const readings = new Set(items.flatMap((item) => item.source_readings || []).map(stable));
    const tags = new Set(items.flatMap((item) => item.source_tags || []).map(stable));
    if (readings.size > 1 || tags.size > 1) {
      conflicts.push({
        surface,
        records: items.map(identityFor).sort(),
        dimensions: [
          ...(readings.size > 1 ? ["source_readings"] : []),
          ...(tags.size > 1 ? ["source_tags"] : []),
        ],
      });
    }
  }
  return conflicts.sort((a, b) => a.surface.localeCompare(b.surface));
}

module.exports = { detectConflicts };
