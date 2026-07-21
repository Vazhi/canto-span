#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const specPath = path.join(root, "review-packets/native-speaker/active-v1/form-specs.json");
const outputPath = path.join(root, "review-packets/native-speaker/active-v1/Code.gs");
const checkOnly = process.argv.includes("--check");

const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const instruments = new Map(spec.instruments.map((instrument) => [instrument.instrument_id, instrument]));
const forms = spec.forms.map((form) => {
  const instrument = instruments.get(form.instrument_id);
  if (!instrument) throw new Error(`Unknown instrument ${form.instrument_id}`);
  return {
    form_id: form.form_id,
    reviewer_slot: form.reviewer_slot,
    audience: form.audience,
    title: form.title,
    description: form.description,
    consent_required: form.consent_required,
    judgment_options: spec.judgment_options,
    items: instrument.items,
  };
});

const data = JSON.stringify({ protocol_version: spec.protocol_version, forms }, null, 2);
const generated = `// GENERATED FILE. Edit form-specs.json and run tools/build-native-review-form-script.js.\n` +
`const CANTO_SPAN_NATIVE_REVIEW = ${data};\n\n` +
`function createAllActiveNativeReviewForms() {\n` +
`  createForms_(CANTO_SPAN_NATIVE_REVIEW.forms);\n` +
`}\n\n` +
`function createPublicSpeakerBForms() {\n` +
`  createForms_(CANTO_SPAN_NATIVE_REVIEW.forms.filter(function (form) {\n` +
`    return form.reviewer_slot === "B" && form.audience === "public_social_media";\n` +
`  }));\n` +
`}\n\n` +
`function createPrivateSpeakerAForm() {\n` +
`  createForms_(CANTO_SPAN_NATIVE_REVIEW.forms.filter(function (form) {\n` +
`    return form.form_id === "RUL01-SPEAKER-A-PRIVATE-R1";\n` +
`  }));\n` +
`}\n\n` +
`function createForms_(forms) {\n` +
`  const results = forms.map(createOneForm_);\n` +
`  Logger.log(JSON.stringify(results, null, 2));\n` +
`}\n\n` +
`function createOneForm_(spec) {\n` +
`  const form = FormApp.create(spec.title);\n` +
`  form.setDescription(spec.description)\n` +
`      .setCollectEmail(false)\n` +
`      .setLimitOneResponsePerUser(false)\n` +
`      .setAllowResponseEdits(false)\n` +
`      .setShowLinkToRespondAgain(false)\n` +
`      .setProgressBar(true)\n` +
`      .setConfirmationMessage("多謝你獨立完成問卷。請唔好喺公開留言討論個別題目或者答案。");\n\n` +
`  form.addTextItem()\n` +
`      .setTitle("評審代號")\n` +
`      .setHelpText(spec.audience === "public_social_media"\n` +
`        ? "請自訂一個代號，唔好填真名、電話或者電郵；如果再次提交，請用返同一個代號。"\n` +
`        : "可以填 Speaker A 或另一個固定代號。")\n` +
`      .setRequired(true);\n\n` +
`  form.addMultipleChoiceItem()\n` +
`      .setTitle("你係咪由細到大主要講廣東話？")\n` +
`      .setChoiceValues(["係", "唔係", "唔肯定"])\n` +
`      .setRequired(true);\n\n` +
`  form.addTextItem()\n` +
`      .setTitle("廣東話背景（長大地區／口音）")\n` +
`      .setHelpText("例如：廣州、香港、新會、台山；可以補充屋企或者平時主要講邊種口音。")\n` +
`      .setRequired(true);\n\n` +
`  form.addMultipleChoiceItem()\n` +
`      .setTitle("而家使用廣東話嘅頻率")\n` +
`      .setChoiceValues(["每日", "每星期", "間中", "而家好少"])\n` +
`      .setRequired(true);\n\n` +
`  form.addPageBreakItem()\n` +
`      .setTitle("句子判斷")\n` +
`      .setHelpText("每句只揀一個答案。請按你平時講廣東話嘅直覺判斷。");\n\n` +
`  spec.items.forEach(function (item, index) {\n` +
`    const number = String(index + 1).padStart(2, "0");\n` +
`    form.addMultipleChoiceItem()\n` +
`        .setTitle("第 " + number + " 句：" + item.sentence)\n` +
`        .setChoiceValues(spec.judgment_options)\n` +
`        .setRequired(true);\n` +
`  });\n\n` +
`  form.addPageBreakItem().setTitle("補充同確認");\n` +
`  form.addParagraphTextItem()\n` +
`      .setTitle("補充／較自然嘅講法（選填）")\n` +
`      .setHelpText("如果有句子聽落唔自然，可以寫句子編號、較自然嘅講法，或者補充喺咩語境之下先自然。");\n\n` +
`  if (spec.consent_required) {\n` +
`    form.addCheckboxItem()\n` +
`        .setTitle("匿名使用回應同意")\n` +
`        .setHelpText("回應可能會用於廣東話語言研究、句子分析同 Canto Span 軟件改進；公開報告唔會列出姓名或者電郵。")\n` +
`        .setChoiceValues(["我同意將匿名回應用於上述用途"])\n` +
`        .setRequired(true);\n` +
`  }\n\n` +
`  form.addCheckboxItem()\n` +
`      .setTitle("獨立完成聲明")\n` +
`      .setHelpText("我交表之前冇同其他人商量答案，亦冇睇其他人嘅答案、留言、解析結果或者預設答案。")\n` +
`      .setChoiceValues(["我確認"])\n` +
`      .setRequired(true);\n\n` +
`  const spreadsheet = SpreadsheetApp.create(spec.title + " — 回應");\n` +
`  const mapSheet = spreadsheet.getSheets()[0];\n` +
`  mapSheet.setName("Item map");\n` +
`  mapSheet.getRange(1, 1, 1, 3).setValues([["display_number", "item_id", "sentence"]]);\n` +
`  const mapRows = spec.items.map(function (item, index) {\n` +
`    return [index + 1, item.item_id, item.sentence];\n` +
`  });\n` +
`  if (mapRows.length) mapSheet.getRange(2, 1, mapRows.length, 3).setValues(mapRows);\n` +
`  mapSheet.setFrozenRows(1);\n` +
`  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());\n\n` +
`  return {\n` +
`    form_id: spec.form_id,\n` +
`    edit_url: form.getEditUrl(),\n` +
`    public_url: form.getPublishedUrl(),\n` +
`    response_spreadsheet_url: spreadsheet.getUrl()\n` +
`  };\n` +
`}\n`;

if (checkOnly) {
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, "utf8") !== generated) {
    console.error(`FAIL: ${path.relative(root, outputPath)} is not synchronized with form-specs.json`);
    process.exit(1);
  }
  console.log(`PASS: ${path.relative(root, outputPath)} is synchronized`);
} else {
  fs.writeFileSync(outputPath, generated);
  console.log(`Wrote ${path.relative(root, outputPath)}`);
}
