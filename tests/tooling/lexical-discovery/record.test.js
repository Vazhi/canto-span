"use strict";

const assert = require("assert");
const test = require("node:test");
const { normalizeDiscoveryRecord } = require("../../../tools/lexical-discovery/record");

test("discovery records preserve source evidence without authority promotion", () => {
  const record = normalizeDiscoveryRecord({
    source_id: "common-spoken-cantonese-core-2000",
    surface: "食",
    source_readings: ["sik6"],
    source_tags: ["VERB"],
  });

  assert.equal(record.source_id, "common-spoken-cantonese-core-2000");
  assert.equal(record.authority.status, "not_adjudicated");
  assert.deepEqual(record.source_readings, ["sik6"]);
});

test("discovery records require provenance and surface identity", () => {
  assert.throws(() => normalizeDiscoveryRecord({ surface: "食" }));
  assert.throws(() => normalizeDiscoveryRecord({ source_id: "x" }));
});
