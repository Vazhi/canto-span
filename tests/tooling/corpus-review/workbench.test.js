"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const {
  ALLOWED_CLASSIFICATIONS,
  buildSummary,
  extractLedger,
  mergeHumanReviews,
  readJson,
  renderTsv,
  sourceInventory,
  validateLedger,
  validateManifest,
  validateReproducible,
  writeJson,
} = require("../../../tools/corpus-review/lib.js");

function makeRoot(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "ab30-corpus-review-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}

function sourceEntry(sourcePath) {
  return {
    path: sourcePath,
    format: "text-lines",
    sourceType: "test_natural_text",
    inclusionReason: "Standalone tooling test input.",
  };
}

function manifestFor(paths, excludedSources = []) {
  return {
    schemaVersion: 1,
    permanentCode: "AB30",
    canonicalIdentity: "ZoMarkedPerfectiveObjectVP",
    legacyRuntimeLabel: "PostverbalZoPerfectiveVP",
    sources: paths.map(sourceEntry),
    excludedSources,
  };
}

function put(root, relativePath, value) {
  const absolutePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, value);
}

test("stable candidate IDs are deterministic for unchanged inputs", (t) => {
  const root = makeRoot(t);
  put(root, "corpus/a.txt", "甲食咗兩個包。\n");
  const manifest = manifestFor(["corpus/a.txt"]);
  const raw = JSON.stringify(manifest);
  const first = extractLedger(manifest, root, raw);
  const second = extractLedger(manifest, root, raw);

  assert.equal(first.candidates.length, 1);
  assert.deepEqual(
    first.candidates.map((candidate) => candidate.candidateId),
    second.candidates.map((candidate) => candidate.candidateId),
  );
  assert.equal(validateReproducible(first, manifest, root, raw), true);
});

test("duplicates share a group while every provenance location is preserved", (t) => {
  const root = makeRoot(t);
  const duplicate = "佢買咗兩本書。";
  put(root, "corpus/a.txt", `${duplicate}\n`);
  put(root, "corpus/b.txt", `${duplicate}\n`);
  const manifest = manifestFor(["corpus/a.txt", "corpus/b.txt"]);
  const ledger = extractLedger(manifest, root);

  assert.equal(ledger.candidates.length, 2);
  assert.equal(ledger.summary.uniqueCandidateTexts, 1);
  assert.equal(ledger.summary.duplicateGroups, 1);
  assert.equal(
    new Set(ledger.candidates.map((candidate) => candidate.duplicateGroupId)).size,
    1,
  );
  assert.deepEqual(
    new Set(ledger.candidates.map((candidate) => candidate.sourcePath)),
    new Set(["corpus/a.txt", "corpus/b.txt"]),
  );
  assert.ok(ledger.candidates.every((candidate) => candidate.recordId === "line:1"));
});

test("classification vocabulary is closed and optional review strings are validated", (t) => {
  const root = makeRoot(t);
  put(root, "corpus/a.txt", "佢寫咗封信。\n");
  const manifest = manifestFor(["corpus/a.txt"]);

  for (const classification of ALLOWED_CLASSIFICATIONS) {
    const ledger = extractLedger(manifest, root);
    ledger.candidates[0].review.classification = classification;
    ledger.summary = buildSummary(ledger.candidates, manifest);
    assert.equal(validateLedger(ledger, manifest), true);
  }

  const invalid = extractLedger(manifest, root);
  invalid.candidates[0].review.classification = "accepted";
  assert.throws(() => validateLedger(invalid, manifest), /Invalid classification/);
});

test("reruns preserve reviewed decisions and refuse to remove reviewed candidates", (t) => {
  const root = makeRoot(t);
  put(root, "corpus/a.txt", "佢睇咗套戲。\n");
  const manifest = manifestFor(["corpus/a.txt"]);
  const existing = extractLedger(manifest, root);
  existing.candidates[0].review = {
    classification: "genuine",
    reviewerNote: "Human-entered note",
    exclusionReason: "",
  };

  const rerun = mergeHumanReviews(extractLedger(manifest, root), existing);
  assert.deepEqual(rerun.candidates[0].review, existing.candidates[0].review);

  const noCandidates = extractLedger(manifestFor([]), root);
  assert.throws(
    () => mergeHumanReviews(noCandidates, existing),
    /Refusing to remove reviewed candidate/,
  );
});

test("malformed JSON and malformed UTF-8 inputs fail explicitly", (t) => {
  const root = makeRoot(t);
  put(root, "bad.json", "{not-json");
  assert.throws(() => readJson(path.join(root, "bad.json"), "manifest"), /Malformed manifest/);

  put(root, "corpus/bad.txt", Buffer.from([0xc3, 0x28]));
  const manifest = manifestFor(["corpus/bad.txt"]);
  assert.throws(() => extractLedger(manifest, root), /Malformed UTF-8 source/);
});

test("an empty allowlisted corpus produces a valid zero-total ledger", (t) => {
  const root = makeRoot(t);
  put(root, "corpus/empty.txt", "");
  const manifest = manifestFor(["corpus/empty.txt"]);
  const ledger = extractLedger(manifest, root);

  assert.equal(ledger.candidates.length, 0);
  assert.equal(ledger.summary.totalExtracted, 0);
  assert.equal(ledger.summary.uniqueCandidateTexts, 0);
  assert.equal(ledger.summary.duplicateGroups, 0);
  assert.equal(
    Object.values(ledger.summary.countsByReviewClassification).reduce(
      (sum, count) => sum + count,
      0,
    ),
    0,
  );
  assert.equal(validateLedger(ledger, manifest), true);
});

test("JSON and TSV renderings account for the same candidate total", (t) => {
  const root = makeRoot(t);
  put(root, "corpus/a.txt", "佢食咗飯。\n佢買咗書。\n");
  const manifest = manifestFor(["corpus/a.txt"]);
  const ledger = extractLedger(manifest, root);
  const jsonPath = path.join(root, "rendered.json");
  writeJson(jsonPath, ledger);
  const renderedJson = readJson(jsonPath, "rendered ledger");
  const tsv = renderTsv(ledger);
  const tsvDataRows = tsv.trimEnd().split("\n").length - 1;

  assert.equal(renderedJson.candidates.length, ledger.summary.totalExtracted);
  assert.equal(tsvDataRows, ledger.summary.totalExtracted);
});

test("known synthetic and project-internal sources cannot enter the allowlist", (t) => {
  const root = makeRoot(t);
  for (const prohibitedPath of [
    "tests/fixtures/parser.json",
    "tests/constructions/synthetic.json",
    "validation/run/diagnostics.json",
    "grammar/example.md",
    "docs/research/example.md",
  ]) {
    const manifest = manifestFor([prohibitedPath]);
    assert.throws(
      () => validateManifest(manifest, root, { checkFiles: false }),
      /is prohibited/,
    );
  }

  const excluded = [
    {
      path: "tests/fixtures/parser.json",
      reasonCode: "parser_fixture",
      reason: "Synthetic parser fixture.",
    },
  ];
  const inventoryManifest = manifestFor([], excluded);
  const inventory = sourceInventory(inventoryManifest, root);
  assert.equal(inventory.includedSources.length, 0);
  assert.deepEqual(inventory.excludedSources[0], {
    path: "tests/fixtures/parser.json",
    status: "excluded",
    reasonCode: "parser_fixture",
    reason: "Synthetic parser fixture.",
    exists: false,
  });
});
