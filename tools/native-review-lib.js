"use strict";

const fs = require("fs");
const path = require("path");

const HEADERS = Object.freeze({
  reviewerCode: "評審代號",
  nativeScreen: "你係咪由細到大主要講廣東話？",
  background: "廣東話背景（長大地區／口音）",
  frequency: "而家使用廣東話嘅頻率",
  comments: "補充／較自然嘅講法（選填）",
  consent: "匿名使用回應同意",
  independence: "獨立完成聲明",
});

const CONSENT_VALUE = "我同意將匿名回應用於上述用途";
const INDEPENDENCE_VALUE = "我確認";

function loadFormSpec(root, formId) {
  const specPath = path.join(root, "review-packets/native-speaker/active-v1/form-specs.json");
  const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
  const form = spec.forms.find((entry) => entry.form_id === formId);
  if (!form) throw new Error(`Unknown form id: ${formId}`);
  const instrument = spec.instruments.find((entry) => entry.instrument_id === form.instrument_id);
  if (!instrument) throw new Error(`Missing instrument ${form.instrument_id}`);
  return { spec, form, instrument };
}

function displayQuestionTitle(index, sentence) {
  return `第 ${String(index + 1).padStart(2, "0")} 句：${sentence}`;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (quoted) throw new Error("Unterminated quoted CSV field");
  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows.filter((values) => values.some((value) => value !== ""));
}

function normalizeResponses(root, formId, csvText) {
  const { spec, form, instrument } = loadFormSpec(root, formId);
  const rows = parseCsv(csvText);
  if (rows.length < 1) throw new Error("CSV has no header row");
  const headers = rows[0];
  const index = new Map(headers.map((header, position) => [header, position]));
  const requiredHeaders = [HEADERS.reviewerCode, HEADERS.nativeScreen, HEADERS.background, HEADERS.frequency, HEADERS.comments, HEADERS.independence];
  if (form.consent_required) requiredHeaders.push(HEADERS.consent);
  const itemHeaders = instrument.items.map((item, itemIndex) => displayQuestionTitle(itemIndex, item.sentence));
  requiredHeaders.push(...itemHeaders);
  const missingHeaders = requiredHeaders.filter((header) => !index.has(header));
  if (missingHeaders.length) throw new Error(`Missing expected CSV headers: ${missingHeaders.join(" | ")}`);

  const responses = rows.slice(1).map((values, responseIndex) => {
    const value = (header) => String(values[index.get(header)] || "").trim();
    const judgments = instrument.items.map((item, itemIndex) => {
      const raw = value(itemHeaders[itemIndex]);
      let judgment = "invalid_or_missing";
      if (raw === spec.judgment_options[0]) judgment = "natural_or_acceptable";
      if (raw === spec.judgment_options[1]) judgment = "unnatural";
      return {
        display_number: itemIndex + 1,
        item_id: item.item_id,
        sentence: item.sentence,
        response: raw,
        judgment,
      };
    });
    const screening = {
      reviewer_code_present: Boolean(value(HEADERS.reviewerCode)),
      native_cantonese_confirmed: value(HEADERS.nativeScreen) === "係",
      background_present: Boolean(value(HEADERS.background)),
      usage_frequency_present: Boolean(value(HEADERS.frequency)),
      all_judgments_complete: judgments.every((entry) => entry.judgment !== "invalid_or_missing"),
      independence_confirmed: value(HEADERS.independence).includes(INDEPENDENCE_VALUE),
      consent_confirmed: !form.consent_required || value(HEADERS.consent).includes(CONSENT_VALUE),
    };
    const eligibleForManualAdjudication = Object.values(screening).every(Boolean);
    return {
      response_id: `${formId}-${String(responseIndex + 1).padStart(4, "0")}`,
      source_row_number: responseIndex + 2,
      timestamp_raw: String(values[0] || "").trim(),
      reviewer_code: value(HEADERS.reviewerCode),
      native_screen_raw: value(HEADERS.nativeScreen),
      cantonese_background: value(HEADERS.background),
      usage_frequency: value(HEADERS.frequency),
      comments: value(HEADERS.comments),
      consent_raw: form.consent_required ? value(HEADERS.consent) : "not_required_private_form",
      independence_raw: value(HEADERS.independence),
      screening,
      eligible_for_manual_adjudication: eligibleForManualAdjudication,
      duplicate_screening_required: eligibleForManualAdjudication,
      counted_as_independent_speaker: false,
      judgments,
    };
  });

  return {
    schema: "canto-span-normalized-native-review-responses-v1",
    protocol_version: spec.protocol_version,
    form_id: formId,
    instrument_id: instrument.instrument_id,
    construction: instrument.construction,
    audience: form.audience,
    reviewer_slot: form.reviewer_slot,
    response_count: responses.length,
    eligible_for_manual_adjudication_count: responses.filter((response) => response.eligible_for_manual_adjudication).length,
    counted_independent_speaker_count: 0,
    responses,
  };
}

function tsvEscape(value) {
  return String(value == null ? "" : value).replace(/[\t\r\n]+/g, " ");
}

function responsesToTsv(normalized) {
  const header = [
    "response_id", "source_row_number", "reviewer_code", "native_screen_raw", "cantonese_background",
    "usage_frequency", "eligible_for_manual_adjudication", "duplicate_screening_required",
    "counted_as_independent_speaker", "display_number", "item_id", "sentence", "judgment", "raw_response", "comments",
  ];
  const rows = [header.join("\t")];
  for (const response of normalized.responses) {
    for (const judgment of response.judgments) {
      rows.push([
        response.response_id, response.source_row_number, response.reviewer_code, response.native_screen_raw,
        response.cantonese_background, response.usage_frequency, response.eligible_for_manual_adjudication,
        response.duplicate_screening_required, response.counted_as_independent_speaker, judgment.display_number,
        judgment.item_id, judgment.sentence, judgment.judgment, judgment.response, response.comments,
      ].map(tsvEscape).join("\t"));
    }
  }
  return `${rows.join("\n")}\n`;
}

module.exports = {
  HEADERS,
  CONSENT_VALUE,
  INDEPENDENCE_VALUE,
  loadFormSpec,
  displayQuestionTitle,
  parseCsv,
  normalizeResponses,
  responsesToTsv,
};
