"use strict";

const assert = require("assert");
const { detectConflicts } = require("../../../tools/lexical-discovery/conflicts");

describe("lexical discovery conflicts", () => {
  it("keeps source disagreement as evidence conflict", () => {
    const conflicts = detectConflicts([
      { surface: "食", source_id: "a", source_readings: ["sik6"], source_tags: ["V"] },
      { surface: "食", source_id: "b", source_readings: ["zi6"], source_tags: ["V"] },
    ]);
    assert.strictEqual(conflicts.length, 1);
    assert.deepStrictEqual(conflicts[0].dimensions, ["source_readings"]);
  });

  it("does not treat matching evidence as conflict", () => {
    assert.deepStrictEqual(detectConflicts([
      { surface: "食", source_id: "a", source_readings: ["sik6"] },
      { surface: "食", source_id: "b", source_readings: ["sik6"] },
    ]), []);
  });
});
