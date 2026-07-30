#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "../../..");
const model = require(path.join(root, "src/runtime-resources/grammar/unit-word-evidence.json"));
const derivedRules = require(path.join(root, "src/runtime-resources/grammar/classifier-head-rules.js"));
const schema = require(path.join(root, "schemas/unit-word-evidence.schema.json"));

const expectedRules = Object.freeze({
  "本": ["book"],
  "杯": ["liquid_measure"],
  "間": ["building_shop"],
  "隻": ["animal"],
  "個": ["person", "general_count"],
  "位": ["person"],
  "支": ["long_rigid"],
  "件": ["clothing"],
  "張": ["flat_object"],
  "架": ["vehicle"],
  "部": ["vehicle", "machine_device"],
  "碗": ["food_bowl"],
});

function sortedObject(value) {
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, values]) => [key, values.slice()]),
  );
}

function sourceIdsFromLedger() {
  const ledgerPath = path.join(root, model.source_ledger);
  const lines = fs.readFileSync(ledgerPath, "utf8").trim().split(/\r?\n/u);
  return new Set(lines.slice(1).map((line) => line.split("\t", 1)[0]));
}

test("unit-word evidence model has one stable v1 schema and exact rule inventory", () => {
  assert.equal(schema.$id, "https://canto-span.local/schemas/unit-word-evidence.schema.json");
  assert.equal(model.schema, "canto-span-unit-word-evidence-v1");
  assert.equal(model.version, 1);
  assert.deepEqual(model.construction_profiles, ["Dem-UNIT-N", "Num-UNIT-N"]);
  assert.equal(model.unit_word_senses.length, 12);
  assert.equal(model.noun_choice_rule_records.length, 12);
  assert.equal(new Set(model.unit_word_senses.map((entry) => entry.surface)).size, 12);
  assert.equal(new Set(model.unit_word_senses.map((entry) => entry.unit_word_sense_id)).size, 12);
  assert.equal(new Set(model.noun_choice_rule_records.map((entry) => entry.evidence_id)).size, 12);
  assert.deepEqual(sortedObject(derivedRules), sortedObject(expectedRules));
});

test("all migrated pair evidence remains unreviewed while legacy policy is preserved", () => {
  const sensesById = new Map(model.unit_word_senses.map((entry) => [entry.unit_word_sense_id, entry]));
  for (const record of model.noun_choice_rule_records) {
    const sense = sensesById.get(record.unit_word_sense_id);
    assert(sense, `Missing sense ${record.unit_word_sense_id}`);
    assert.equal(sense.surface, record.surface);
    assert.equal(record.pair_status, "unreviewed");
    assert.equal(record.legacy_status_on_match, "verified_compatible");
    assert.equal(record.legacy_status_on_missing_evidence, "unverified");
    assert.equal(record.legacy_status_on_class_mismatch, "incompatible");
    assert.equal(record.structural_np_status_on_complete_profile, "visible_profile_complete");
    assert.equal(record.downstream_argument_licensing_on_match, "allowed_by_bounded_runtime_rule");
    assert.equal(record.downstream_argument_licensing_otherwise, "blocked_by_conservative_policy");
  }
});

test("source category records use only verified ledger identifiers", () => {
  const ledgerIds = sourceIdsFromLedger();
  for (const sense of model.unit_word_senses) {
    assert.match(sense.jyutping, /^[a-z]+[1-6]( [a-z]+[1-6])*$/u);
    assert.equal(sense.source_scope, "category_and_construction_profile_not_pair_specific");
    assert.equal(sense.provenance_state, "source_category_supported_pair_unreviewed");
    assert.deepEqual(sense.construction_profiles, ["Dem-UNIT-N", "Num-UNIT-N"]);
    for (const sourceId of sense.source_ids) {
      assert(ledgerIds.has(sourceId), `Unknown source ID ${sourceId}`);
    }
  }
});

test("relation types remain differentiated without compatibility expansion", () => {
  const senses = Object.fromEntries(model.unit_word_senses.map((entry) => [entry.surface, entry]));
  assert.equal(senses["個"].unit_word_type, "general_classifier");
  assert.equal(senses["個"].semantic_unit_relation, "general_counting");
  assert.equal(senses["位"].unit_word_type, "honorific_classifier");
  assert.equal(senses["位"].semantic_unit_relation, "honorific_person_selection");
  for (const surface of ["杯", "碗"]) {
    assert.equal(senses[surface].unit_word_type, "container_measure");
    assert.equal(senses[surface].semantic_unit_relation, "container_content_measure");
  }
  for (const surface of ["隻", "架", "部", "本", "張", "支", "件", "間"]) {
    assert.equal(senses[surface].unit_word_type, "sortal_classifier");
    assert.equal(senses[surface].semantic_unit_relation, "sortal_selection");
  }
  for (const prohibited of ["枝", "對", "把", "條"]) {
    assert.equal(Object.hasOwn(derivedRules, prohibited), false, `Unexpected compatibility rule for ${prohibited}`);
  }
});

test("支 and source surface 枝 remain distinct and unresolved", () => {
  const unresolved = new Map(model.unresolved_surfaces.map((entry) => [entry.surface, entry]));
  assert(Object.hasOwn(derivedRules, "支"));
  assert.equal(Object.hasOwn(derivedRules, "枝"), false);
  assert.equal(unresolved.get("枝").status, "unresolved_source_surface_reconciliation");
  assert.equal(unresolved.get("枝").related_runtime_surface, "支");
  assert.equal(unresolved.get("枝").runtime_rule_created, false);
});
