#!/usr/bin/env node
"use strict";

const path = require("path");
const assert = require("assert");
const {
  HEADERS,
  CONSENT_VALUE,
  INDEPENDENCE_VALUE,
  loadFormSpec,
  displayQuestionTitle,
  parseCsv,
  normalizeResponses,
  responsesToTsv,
} = require("./native-review-lib");

const root = path.resolve(__dirname, "..");
const formId = "PFV01-SPEAKER-B-PUBLIC-R1";
const { spec, instrument } = loadFormSpec(root, formId);
const quote = (value) => `"${String(value).replace(/"/g, '""')}"`;
const headers = [
  "Timestamp", HEADERS.reviewerCode, HEADERS.nativeScreen, HEADERS.background, HEADERS.frequency,
  ...instrument.items.map((item, index) => displayQuestionTitle(index, item.sentence)),
  HEADERS.comments, HEADERS.consent, HEADERS.independence,
];
const valid = [
  "2026/07/21 12:00:00", "HK4827", "係", "香港／廣府話", "每日",
  ...instrument.items.map((_, index) => spec.judgment_options[index === 3 ? 1 : 0]),
  "第 04 句唔自然，建議改寫。", CONSENT_VALUE, INDEPENDENCE_VALUE,
];
const invalid = [
  "2026/07/21 12:05:00", "X2", "唔係", "未提供", "間中",
  ...instrument.items.map(() => spec.judgment_options[0]),
  "", CONSENT_VALUE, INDEPENDENCE_VALUE,
];
const csv = [headers, valid, invalid].map((row) => row.map(quote).join(",")).join("\n") + "\n";

const parsed = parseCsv('"a","line 1\nline 2","c"\n');
assert.deepStrictEqual(parsed, [["a", "line 1\nline 2", "c"]]);
const normalized = normalizeResponses(root, formId, csv);
assert.strictEqual(normalized.response_count, 2);
assert.strictEqual(normalized.eligible_for_manual_adjudication_count, 1);
assert.strictEqual(normalized.counted_independent_speaker_count, 0);
assert.strictEqual(normalized.responses[0].eligible_for_manual_adjudication, true);
assert.strictEqual(normalized.responses[0].counted_as_independent_speaker, false);
assert.strictEqual(normalized.responses[1].eligible_for_manual_adjudication, false);
assert.strictEqual(normalized.responses[0].judgments[3].judgment, "unnatural");
assert(responsesToTsv(normalized).includes("PFV-B07"));
console.log(JSON.stringify({ schema: "canto-span-native-review-lib-tests-v1", total: 9, passed: 9, failed: 0, status: "PASS" }, null, 2));
