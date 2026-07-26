"use strict";

// Existing source duplicates are preserved explicitly so Object.fromEntries keeps
// first-insertion key order while the last listed value remains authoritative.
module.exports = {
  "錢": { occurrences: 2, resolution: "last-entry-wins", reason: "identical historical duplicate" },
  "千": { occurrences: 2, resolution: "last-entry-wins", reason: "later quantity-scale entry remains authoritative" },
  "笑": { occurrences: 2, resolution: "last-entry-wins", reason: "later action-verb feature bundle remains authoritative" },
  "放心": { occurrences: 2, resolution: "last-entry-wins", reason: "later reassurance-stative entry remains authoritative" },
};
