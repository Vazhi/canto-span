#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { loadConstructionNotes } = require("./construction-notes-lib");
const { isVerifiedSourceState } = require("./promotion-gate-lib");

const root = path.resolve(__dirname, "..");
const packetDir = path.join(root, "review-packets/native-speaker/active-v1");
const statePath = path.join(packetDir, "active-review-state.json");
const specPath = path.join(packetDir, "form-specs.json");
const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
const specs = JSON.parse(fs.readFileSync(specPath, "utf8"));
const notes = loadConstructionNotes(root, "active");
const notesByConstruction = new Map(notes.map((note) => [note.frontmatter.construction, note]));
const formsById = new Map(specs.forms.map((form) => [form.form_id, form]));
const instrumentsById = new Map(specs.instruments.map((instrument) => [instrument.instrument_id, instrument]));
const checks = [];
const failures = [];

function check(name, pass, details = null) {
  const row = { name, pass: Boolean(pass) };
  if (details !== null) row.details = details;
  checks.push(row);
  if (!row.pass) failures.push(row);
}

function parseTsv(file) {
  const lines = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.filter(Boolean).map((line) => Object.fromEntries(line.split("\t").map((value, index) => [headers[index], value])));
}

function extractMarkdownItems(file, idPrefix) {
  const text = fs.readFileSync(file, "utf8");
  const regex = new RegExp(`## (${idPrefix}[^\\n]+)\\n\\n\\*\\*([^*]+)\\*\\*`, "g");
  return [...text.matchAll(regex)].map((match) => ({ item_id: match[1].trim(), sentence: match[2].trim() }));
}

check("review protocol version is v1", state.protocol_version === "v1" && specs.protocol_version === "v1");
check("protocol exceptions are explicit records", Array.isArray(state.protocol_exceptions));
check("second-speaker authorization is active-construction scoped", state.second_speaker_authorization.status === "authorized_for_active_construction_forms" && state.second_speaker_authorization.scope.length === 2);
check("privacy forbids email collection", specs.privacy.collect_email === false);
check("privacy forbids real-name collection", specs.privacy.collect_real_name === false);
check("three forms are specified", specs.forms.length === 3, { observed: specs.forms.length });
check("form ids are unique", formsById.size === specs.forms.length);
check("instrument ids are unique", instrumentsById.size === specs.instruments.length);

const stateConstructions = new Set(state.constructions.map((entry) => entry.construction));
const activeConstructions = new Set(notes.map((note) => note.frontmatter.construction));
check("active review state exactly covers active construction notes", stateConstructions.size === activeConstructions.size && [...stateConstructions].every((value) => activeConstructions.has(value)), { state: [...stateConstructions], active: [...activeConstructions] });

for (const entry of state.constructions) {
  const note = notesByConstruction.get(entry.construction);
  check(`${entry.construction} has one active note`, Boolean(note));
  if (!note) continue;
  const fm = note.frontmatter;
  check(`${entry.construction} uses native review protocol v1`, fm.native_review_protocol_version === "v1");
  check(`${entry.construction} links canonical review state`, fm.native_review_state_file === "review-packets/native-speaker/active-v1/active-review-state.json");
  check(`${entry.construction} links canonical form specs`, fm.native_form_spec_file === "review-packets/native-speaker/active-v1/form-specs.json");
  check(`${entry.construction} source verification path matches state`, fm.source_verification_file === entry.source_verification_file);
  check(`${entry.construction} Speaker A state matches`, fm.speaker_a_state === entry.speaker_a.state, { note: fm.speaker_a_state, state: entry.speaker_a.state });
  check(`${entry.construction} Speaker B state matches`, fm.speaker_b_state === entry.speaker_b.state, { note: fm.speaker_b_state, state: entry.speaker_b.state });
  check(`${entry.construction} counted speaker count matches note`, Number(fm.independent_speaker_count) === Number(entry.counted_independent_speakers));
  check(`${entry.construction} legacy speaker count remains synchronized`, Number(fm.speaker_count) === Number(entry.counted_independent_speakers));
  const notePromotionEligible = Object.prototype.hasOwnProperty.call(fm, "promotion_eligible_independent_speaker_count")
    ? Number(fm.promotion_eligible_independent_speaker_count)
    : Number(fm.independent_speaker_count);
  const statePromotionEligible = Object.prototype.hasOwnProperty.call(entry, "promotion_eligible_independent_speakers")
    ? Number(entry.promotion_eligible_independent_speakers)
    : Number(entry.counted_independent_speakers);
  check(`${entry.construction} promotion-eligible speaker count matches note`, notePromotionEligible === statePromotionEligible, { note: notePromotionEligible, state: statePromotionEligible });

  const sourceFile = path.join(root, entry.source_verification_file);
  check(`${entry.construction} source verification file exists`, fs.existsSync(sourceFile));
  if (fs.existsSync(sourceFile)) {
    const sourceRows = parseTsv(sourceFile);
    const rowsById = new Map(sourceRows.map((row) => [row.source_id, row]));
    const counted = new Set(entry.counted_source_ids);
    const noteSources = new Set(fm.source_ids || []);
    check(`${entry.construction} counted source ids are unique`, counted.size === entry.counted_source_ids.length);
    check(`${entry.construction} counted source set equals note source set`, counted.size === noteSources.size && [...counted].every((value) => noteSources.has(value)), { counted: [...counted], note: [...noteSources] });
    check(`${entry.construction} source count matches counted set`, Number(fm.source_count) === counted.size && Number(fm.verified_source_count) === counted.size);
    for (const sourceId of counted) {
      const row = rowsById.get(sourceId);
      check(`${entry.construction} counted source ${sourceId} occurs in verification TSV`, Boolean(row));
      if (!row) continue;
      const verification = row.verification_result || row.access_status || "";
      const locator = row.access_and_locator || row.exact_locator || "";
      const claim = row.exact_claim_support || row.finding || "";
      const limitation = row.semantic_caution || row.limitation || "";
      check(`${entry.construction} counted source ${sourceId} is manually verified`, isVerifiedSourceState(verification), { verification });
      check(`${entry.construction} counted source ${sourceId} has exact locator`, Boolean(locator));
      check(`${entry.construction} counted source ${sourceId} has claim or finding`, Boolean(claim));
      check(`${entry.construction} counted source ${sourceId} has explicit limitation`, Boolean(limitation));
    }
  }

  for (const slotName of ["speaker_a", "speaker_b"]) {
    const slot = entry[slotName];
    if (["complete_counted", "pilot_panel_counted_exception", "legacy_panel_counted_exception"].includes(slot.state)) {
      check(`${entry.construction} ${slotName} raw record exists`, Boolean(slot.raw_record) && fs.existsSync(path.join(root, slot.raw_record)));
      check(`${entry.construction} ${slotName} result record exists`, Boolean(slot.result_record) && fs.existsSync(path.join(root, slot.result_record)));
      if (["pilot_panel_counted_exception", "legacy_panel_counted_exception"].includes(slot.state)) {
        check(`${entry.construction} ${slotName} pilot form remains traceable`, Boolean(slot.form_id) && formsById.has(slot.form_id));
        check(`${entry.construction} ${slotName} pilot count is positive`, Number(slot.counted_independent_speakers) > 0, slot.counted_independent_speakers);
        check(`${entry.construction} ${slotName} pilot does not satisfy clean promotion count`, Number(slot.promotion_eligible_independent_speakers) === 0, slot.promotion_eligible_independent_speakers);
      }
    } else {
      check(`${entry.construction} ${slotName} pending state has no result record`, slot.result_record === null);
      check(`${entry.construction} ${slotName} pending state has a form`, Boolean(slot.form_id) && formsById.has(slot.form_id));
    }
  }
}

const pfvException = (state.protocol_exceptions || []).find((entry) => entry.exception_id === "PFV01-LEGACY-PANEL-EXCEPTION-2026-07-21");
check("PFV legacy-panel exception is recorded", Boolean(pfvException));
if (pfvException) {
  check("PFV legacy-panel exception counts 10 panel responses", Number(pfvException.counted_native_panel_responses) === 10, pfvException.counted_native_panel_responses);
  check("PFV legacy-panel exception keeps promotion eligible count at zero", Number(pfvException.promotion_eligible_independent_speakers) === 0, pfvException.promotion_eligible_independent_speakers);
  check("PFV legacy-panel result record exists", fs.existsSync(path.join(root, pfvException.result_record)));
  check("PFV legacy-panel snapshot record exists", fs.existsSync(path.join(root, pfvException.snapshot_record)));
}

const rulException = (state.protocol_exceptions || []).find((entry) => entry.exception_id === "RUL01-PUBLIC-PILOT-EXCEPTION-2026-07-21");
check("RUL pilot exception is recorded", Boolean(rulException));
if (rulException) {
  check("RUL pilot exception counts 23 panel responses", Number(rulException.counted_native_panel_responses) === 23, rulException.counted_native_panel_responses);
  check("RUL pilot exception keeps promotion eligible count at zero", Number(rulException.promotion_eligible_independent_speakers) === 0, rulException.promotion_eligible_independent_speakers);
  check("RUL pilot result record exists", fs.existsSync(path.join(root, rulException.result_record)));
  check("RUL pilot snapshot record exists", fs.existsSync(path.join(root, rulException.snapshot_record)));
}

for (const form of specs.forms) {
  const instrument = instrumentsById.get(form.instrument_id);
  check(`${form.form_id} resolves its instrument`, Boolean(instrument));
  if (!instrument) continue;
  check(`${form.form_id} has at least ten judgment items`, instrument.items.length >= 10, { observed: instrument.items.length });
  check(`${form.form_id} instrument item ids are unique`, new Set(instrument.items.map((item) => item.item_id)).size === instrument.items.length);
  check(`${form.form_id} instrument sentences are unique`, new Set(instrument.items.map((item) => item.sentence)).size === instrument.items.length);
  const earlyPrefixes = new Set(instrument.items.slice(0, 6).map((item) => item.item_id.split("-")[1][0]));
  check(`${form.form_id} display order intermixes item classes`, earlyPrefixes.size >= 2, { prefixes: [...earlyPrefixes] });
  const visible = `${form.title}\n${form.description}`;
  check(`${form.form_id} visible heading hides parser labels`, !/(PostverbalZoPerfectiveVP|ResourceUseLaiFunctionRelation|PFV-|RUL-|target|boundary)/i.test(visible));
  if (form.audience === "public_social_media") {
    check(`${form.form_id} public form requires consent`, form.consent_required === true);
    check(`${form.form_id} public form is Speaker B`, form.reviewer_slot === "B");
  }
}

const rulA = formsById.get("RUL01-SPEAKER-A-PRIVATE-R1");
const rulB = formsById.get("RUL01-SPEAKER-B-PUBLIC-R1");
check("RUL Speaker A and B use the same instrument", rulA && rulB && rulA.instrument_id === rulB.instrument_id);

const pfvInstrument = instrumentsById.get(formsById.get("PFV01-SPEAKER-B-PUBLIC-R1").instrument_id);
const pfvHistorical = extractMarkdownItems(path.join(root, "docs/research/CP025-P1-PFV01-SPEAKER-A-RAW-R2.md"), "PFV-");
const pfvHistoricalMap = new Map(pfvHistorical.map((item) => [item.item_id, item.sentence]));
check("PFV Speaker B uses every completed Speaker A stimulus", pfvHistoricalMap.size === pfvInstrument.items.length && pfvInstrument.items.every((item) => pfvHistoricalMap.get(item.item_id) === item.sentence), { historical: pfvHistoricalMap.size, current: pfvInstrument.items.length });

const rulPublic = formsById.get("RUL01-SPEAKER-B-PUBLIC-R1");
check("RUL public form status records committed pilot snapshot", rulPublic?.status === "live_pilot_snapshot_23_committed_2026-07-21", rulPublic?.status);
const rulInstrument = instrumentsById.get(rulA.instrument_id);
check("RUL instrument is explicitly pilot limited", rulInstrument?.instrument_class === "pilot_binary_fixed_order_context_free_global_comment" && rulInstrument?.evidence_tier === "pilot_limited");
const rulHistorical = extractMarkdownItems(path.join(root, "docs/research/CP026-P1-RUL01-SPEAKER-A-FORM-R1.md"), "RUL-");
const rulHistoricalMap = new Map(rulHistorical.map((item) => [item.item_id, item.sentence]));
check("RUL generated forms preserve every drafted Speaker A stimulus", rulHistoricalMap.size === rulInstrument.items.length && rulInstrument.items.every((item) => rulHistoricalMap.get(item.item_id) === item.sentence), { historical: rulHistoricalMap.size, current: rulInstrument.items.length });

const socialPost = fs.readFileSync(path.join(packetDir, "SOCIAL-MEDIA-POST.md"), "utf8");
check("social post hides construction labels and sentences", !/(PostverbalZoPerfectiveVP|ResourceUseLaiFunctionRelation|PFV|RUL|我食咗|用嚟切)/i.test(socialPost));
check("social post asks respondents not to discuss answers", socialPost.includes("唔好喺留言公開討論題目"));

const generatorCheck = spawnSync(process.execPath, [path.join(root, "tools/build-native-review-form-script.js"), "--check"], { cwd: root, encoding: "utf8" });
check("generated Apps Script matches canonical form specs", generatorCheck.status === 0, { stdout: generatorCheck.stdout.trim(), stderr: generatorCheck.stderr.trim() });
const libTest = spawnSync(process.execPath, [path.join(root, "tools/test-native-review-lib.js")], { cwd: root, encoding: "utf8" });
check("native-review importer library tests pass", libTest.status === 0, { stdout: libTest.stdout.trim(), stderr: libTest.stderr.trim() });
const importerText = fs.readFileSync(path.join(root, "tools/native-review-lib.js"), "utf8");
check("normalizer never automatically counts speakers", importerText.includes("counted_as_independent_speaker: false") && importerText.includes("counted_independent_speaker_count: 0"));

const report = {
  schema: "canto-span-active-review-workflow-audit-v1",
  protocol_version: state.protocol_version,
  active_constructions: notes.length,
  forms: specs.forms.length,
  instruments: specs.instruments.length,
  check_count: checks.length,
  passed: checks.filter((row) => row.pass).length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const outDir = path.join(root, "validation", `v${manifest.version}`);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "active-review-workflow.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
