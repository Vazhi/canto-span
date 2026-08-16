"use strict";

const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const test = require("node:test");

const { commitWrites, runMutation } = require("../../../tools/artifact-mutation/core");
const { createJsonCollectionAdapter } = require("../../../tools/artifact-mutation/json-collection-adapter");

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "canto-span-artifact-mutation-"));
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

test("dry-run is deterministic and write mode commits one staged artifact", () => {
  const file = path.join(tempDir(), "records.json");
  writeJson(file, [{ id: "a", value: 1 }]);
  const adapter = createJsonCollectionAdapter({ file, keyField: "id", requiredFields: ["value"] });
  const candidates = [
    { operation: "add", record: { id: "b", value: 2 } },
    { operation: "replace", record: { id: "a", value: 3 } },
  ];

  const first = runMutation(adapter, candidates);
  assert.deepEqual(runMutation(adapter, candidates), first);
  assert.equal(first.status, "PASS");
  assert.deepEqual(first.counts, { added: 1, updated: 1, already_present: 0, skipped: 0 });
  assert.equal(first.writes_occurred, false);
  assert.deepEqual(readJson(file), [{ id: "a", value: 1 }]);

  const committed = runMutation(adapter, candidates, { write: true });
  assert.equal(committed.status, "PASS");
  assert.deepEqual(committed.counts, first.counts);
  assert.deepEqual(committed.gaps, first.gaps);
  assert.deepEqual(committed.affected_artifacts, first.affected_artifacts);
  assert.equal(committed.write_count, 1);
  assert.deepEqual(readJson(file), [{ id: "a", value: 3 }, { id: "b", value: 2 }]);
});

test("existing-state and within-batch conflicts prevent canonical writes", () => {
  const file = path.join(tempDir(), "records.json");
  const original = [{ id: "a", value: 1 }];
  writeJson(file, original);
  const adapter = createJsonCollectionAdapter({ file, keyField: "id", requiredFields: ["value"] });

  const existing = runMutation(adapter, [
    { operation: "add", record: { id: "a", value: 9 } },
  ], { write: true });
  assert.equal(existing.status, "FAIL");
  assert.equal(existing.conflicts[0].code, "existing_record_differs");
  assert.equal(existing.writes_occurred, false);
  assert.deepEqual(readJson(file), original);

  const batch = runMutation(adapter, [
    { operation: "add", record: { id: "b", value: 2 } },
    { operation: "add", record: { id: "b", value: 2 } },
  ], { write: true });
  assert.equal(batch.status, "FAIL");
  assert.equal(batch.conflicts[0].code, "duplicate_in_batch");
  assert.equal(batch.writes_occurred, false);
  assert.deepEqual(readJson(file), original);
});

test("required input and staged-result validation fail before write", () => {
  const file = path.join(tempDir(), "records.json");
  writeJson(file, []);
  const adapter = createJsonCollectionAdapter({ file, keyField: "id", requiredFields: ["value"] });
  const missing = runMutation(adapter, [
    { operation: "add", record: { id: "a" } },
  ], { write: true });
  assert.equal(missing.status, "FAIL");
  assert.match(missing.errors[0], /missing required field value/);
  assert.deepEqual(readJson(file), []);

  let serialized = false;
  const validatingAdapter = {
    id: "validation-test",
    load: () => ({ records: [] }),
    normalize: (candidate) => candidate,
    plan: ({ candidates }) => ({
      nextState: { records: candidates },
      operations: candidates.map((item) => ({ identity: item.id, action: "added" })),
      conflicts: [],
    }),
    validateResult: () => ["staged state rejected"],
    serialize: () => {
      serialized = true;
      return [{ path: file, content: "[]\n" }];
    },
  };
  const rejected = runMutation(validatingAdapter, [{ id: "a" }], { write: true });
  assert.equal(rejected.status, "FAIL");
  assert.equal(rejected.validation_results.at(-1).status, "FAIL");
  assert.equal(serialized, false);
  assert.deepEqual(readJson(file), []);
});

test("throwing validators become machine-readable FAIL reports", () => {
  const file = path.join(tempDir(), "records.json");
  writeJson(file, []);

  const baseAdapter = {
    id: "throwing-validator-test",
    load: () => ({ records: [] }),
    normalize: (candidate) => candidate,
    plan: ({ candidates }) => ({
      nextState: { records: candidates },
      operations: candidates.map((item) => ({ identity: item.id, action: "added" })),
      conflicts: [],
    }),
    serialize: () => [{ path: file, content: "[]\n" }],
  };

  const currentFailure = runMutation({
    ...baseAdapter,
    validateCurrent: () => { throw new Error("current exploded"); },
  }, [{ id: "a" }], { write: true });
  assert.equal(currentFailure.status, "FAIL");
  assert.deepEqual(currentFailure.validation_results, [{
    phase: "current",
    status: "FAIL",
    errors: ["current validator threw: current exploded"],
  }]);
  assert.equal(currentFailure.writes_occurred, false);

  const resultFailure = runMutation({
    ...baseAdapter,
    validateResult: () => { throw new Error("result exploded"); },
  }, [{ id: "a" }], { write: true });
  assert.equal(resultFailure.status, "FAIL");
  assert.equal(resultFailure.validation_results.at(-1).status, "FAIL");
  assert.deepEqual(resultFailure.validation_results.at(-1).errors, ["result validator threw: result exploded"]);
  assert.equal(resultFailure.writes_occurred, false);
  assert.deepEqual(readJson(file), []);
});

test("lifecycle omissions remain explicit and target gap policy can block writes", () => {
  const file = path.join(tempDir(), "records.json");
  writeJson(file, []);
  const adapter = createJsonCollectionAdapter({
    file,
    keyField: "id",
    lifecycleDimensions: [
      { name: "evidence", field: "evidence", statusField: "evidence_status", targets: ["runtime"] },
    ],
  });
  const candidates = [
    { operation: "add", record: { id: "a", evidence: "present" } },
    { operation: "add", record: { id: "b", evidence_status: "intentional_hold" } },
    { operation: "add", record: { id: "c" } },
    { operation: "add", record: { id: "d" } },
  ];

  const audit = runMutation(adapter, candidates, { target: "runtime", omissionThreshold: 0.5 });
  assert.equal(audit.status, "PASS");
  assert.deepEqual(audit.gaps.by_dimension.evidence, {
    complete: 1,
    unresolved: 2,
    intentional_hold: 1,
    not_applicable: 0,
  });
  assert.deepEqual(audit.gaps.systematic_omissions, [{
    dimension: "evidence",
    omitted_count: 2,
    input_count: 4,
    ratio: 0.5,
  }]);

  const blocked = runMutation(adapter, candidates, {
    target: "runtime",
    omissionThreshold: 0.5,
    failOnGap: true,
    write: true,
  });
  assert.equal(blocked.status, "FAIL");
  assert.match(blocked.errors.at(-1), /unresolved completeness gaps: 2/);
  assert.equal(blocked.writes_occurred, false);
  assert.deepEqual(readJson(file), []);
});

test("invalid explicit lifecycle statuses fail normalization before write", () => {
  const file = path.join(tempDir(), "records.json");
  writeJson(file, []);
  const adapter = createJsonCollectionAdapter({
    file,
    keyField: "id",
    lifecycleDimensions: [
      { name: "evidence", field: "evidence", statusField: "evidence_status", targets: ["runtime"] },
    ],
  });

  const invalid = runMutation(adapter, [
    { operation: "add", record: { id: "a", evidence_status: "bogus" } },
  ], { target: "runtime", write: true });
  assert.equal(invalid.status, "FAIL");
  assert.match(invalid.errors[0], /evidence_status has invalid lifecycle status bogus/);
  assert.equal(invalid.writes_occurred, false);
  assert.deepEqual(readJson(file), []);
});

test("declared lifecycle statuses are validated independent of target and in current state", () => {
  const file = path.join(tempDir(), "records.json");
  const config = {
    file,
    keyField: "id",
    lifecycleDimensions: [
      { name: "evidence", field: "evidence", statusField: "evidence_status", targets: ["runtime"] },
    ],
  };

  writeJson(file, []);
  const adapter = createJsonCollectionAdapter(config);
  const wrongTarget = runMutation(adapter, [
    { operation: "add", record: { id: "a", evidence_status: "bogus" } },
  ], { target: "survey", write: true });
  assert.equal(wrongTarget.status, "FAIL");
  assert.match(wrongTarget.errors[0], /evidence_status has invalid lifecycle status bogus/);
  assert.deepEqual(readJson(file), []);

  writeJson(file, [{ id: "existing", evidence_status: "bogus" }]);
  const invalidCurrent = runMutation(createJsonCollectionAdapter(config), [], { target: "survey", write: true });
  assert.equal(invalidCurrent.status, "FAIL");
  assert.equal(invalidCurrent.validation_results[0].status, "FAIL");
  assert.match(invalidCurrent.validation_results[0].errors[0], /evidence_status has invalid lifecycle status bogus/);
});

test("large batches load and stage each affected artifact once", () => {
  const file = path.join(tempDir(), "records.json");
  writeJson(file, []);
  let readCount = 0;
  let stagedWriteCount = 0;
  const countedFs = Object.create(fs);
  countedFs.readFileSync = (...args) => {
    readCount += 1;
    return fs.readFileSync(...args);
  };
  countedFs.writeFileSync = (...args) => {
    stagedWriteCount += 1;
    return fs.writeFileSync(...args);
  };
  const adapter = createJsonCollectionAdapter({ file, keyField: "id", fsImpl: countedFs });
  const candidates = Array.from({ length: 1000 }, (_, index) => ({
    operation: "add",
    record: { id: `r${index}`, value: index },
  }));

  const result = runMutation(adapter, candidates, { write: true, fsImpl: countedFs });
  assert.equal(result.status, "PASS");
  assert.equal(result.counts.added, 1000);
  assert.equal(readCount, 1);
  assert.equal(stagedWriteCount, 1);
  assert.equal(result.write_count, 1);
  assert.equal(readJson(file).length, 1000);
});

test("multi-file commit rolls back earlier replacements after a later rename failure", () => {
  const dir = tempDir();
  const first = path.join(dir, "first.txt");
  const second = path.join(dir, "second.txt");
  fs.writeFileSync(first, "old-first\n");
  fs.writeFileSync(second, "old-second\n");

  let renameCount = 0;
  let injected = false;
  const failingFs = Object.create(fs);
  failingFs.renameSync = (...args) => {
    renameCount += 1;
    if (!injected && renameCount === 4) {
      injected = true;
      throw new Error("injected rename failure");
    }
    return fs.renameSync(...args);
  };

  assert.throws(
    () => commitWrites([
      { path: first, content: "new-first\n" },
      { path: second, content: "new-second\n" },
    ], { fsImpl: failingFs }),
    /artifact mutation commit failed: injected rename failure/
  );
  assert.equal(fs.readFileSync(first, "utf8"), "old-first\n");
  assert.equal(fs.readFileSync(second, "utf8"), "old-second\n");
  assert.deepEqual(fs.readdirSync(dir).sort(), ["first.txt", "second.txt"]);
});

test("rollback preserves a backup when restoring that backup fails", () => {
  const dir = tempDir();
  const first = path.join(dir, "first.txt");
  const second = path.join(dir, "second.txt");
  fs.writeFileSync(first, "old-first\n");
  fs.writeFileSync(second, "old-second\n");

  let commitFailureInjected = false;
  let restoreFailureInjected = false;
  const failingFs = Object.create(fs);
  failingFs.renameSync = (source, destination) => {
    if (!commitFailureInjected && source.includes(".tmp") && destination === second) {
      commitFailureInjected = true;
      throw new Error("injected commit failure");
    }
    if (!restoreFailureInjected && source.includes(".bak") && destination === first) {
      restoreFailureInjected = true;
      throw new Error("injected restore failure");
    }
    return fs.renameSync(source, destination);
  };

  let failure;
  try {
    commitWrites([
      { path: first, content: "new-first\n" },
      { path: second, content: "new-second\n" },
    ], { fsImpl: failingFs });
    assert.fail("expected commitWrites to throw");
  } catch (error) {
    failure = error;
  }

  assert.match(failure.message, /artifact mutation commit failed: injected commit failure/);
  assert.ok(failure.rollbackErrors.some((item) => item.includes("restore") && item.includes("injected restore failure")));
  assert.equal(fs.readFileSync(second, "utf8"), "old-second\n");
  assert.equal(fs.existsSync(first), false);

  const backup = fs.readdirSync(dir).find((name) => name.startsWith("first.txt.artifact-mutation-") && name.endsWith(".bak"));
  assert.ok(backup, "failed restore must preserve the original backup");
  assert.equal(fs.readFileSync(path.join(dir, backup), "utf8"), "old-first\n");
});
