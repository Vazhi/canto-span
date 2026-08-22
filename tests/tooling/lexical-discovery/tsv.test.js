"use strict";

const assert = require("assert");
const { parseTsv } = require("../../../tools/lexical-discovery/tsv");

describe("lexical discovery TSV adapter", () => {
  it("converts source rows into discovery records without authority promotion", () => {
    const records = parseTsv("surface\tjyutping\tpos\trank\n食飯\tsik6 faan6\tverb\t1", {
      sourceId: "test-source",
      path: "test.tsv",
    });

    assert.strictEqual(records.length, 1);
    assert.strictEqual(records[0].surface, "食飯");
    assert.deepStrictEqual(records[0].authority, { status: "not_adjudicated" });
    assert.deepStrictEqual(records[0].source.readings, ["sik6 faan6"]);
  });
});
