"use strict";

const { createLexicalDiscoveryRecord } = require("./record");

function splitLine(line, delimiter = "\t") {
  return line.split(delimiter).map((value) => value.trim());
}

function parseTsv(text, options = {}) {
  if (typeof text !== "string") throw new Error("TSV input must be a string");

  const lines = text.split(/\r?\n/).filter((line) => line.length > 0);
  if (!lines.length) return [];

  const headers = splitLine(lines[0]);
  return lines.slice(1).map((line, index) => {
    const values = splitLine(line);
    const row = {};
    headers.forEach((header, column) => {
      row[header] = values[column] || "";
    });

    return createLexicalDiscoveryRecord({
      source: {
        id: options.sourceId || "unknown-tsv-source",
        row: index + 2,
        path: options.path || null,
      },
      surface: row.surface || row.word || row.form || "",
      sourceReadings: row.jyutping ? [row.jyutping] : [],
      sourceTags: row.pos ? [row.pos] : [],
      frequency: row.rank ? { rank: Number(row.rank) } : {},
      raw: row,
    });
  });
}

module.exports = { parseTsv };
