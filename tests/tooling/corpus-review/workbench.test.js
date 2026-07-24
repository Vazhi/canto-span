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
  manifestHash,
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

test("duplicates use the extracted span while preserving distinct provenance", (t) => {
  const root = makeRoot(t);
  put(root, "corpus/a.txt", "A：今日落雨。佢買咗兩本書。跟住返屋企。\n");
  put(root, "corpus/b.txt", "B：尋日好熱。佢買咗兩本書。之後去食飯。\n");
  const manifest = manifestFor(["corpus/a.txt", "corpus/b.txt"]);
  const ledger = extractLedger(manifest, root);
  assert.equal(ledger.candidates.length, 2);
  assert.equal(ledger.summary.uniqueCandidateTexts, 1);
  assert.equal(ledger.summary.duplicateGroups, 1);
  assert.equal(new Set(ledger.candidates.map((item) => item.duplicateGroupId)).size, 1);
  assert.equal(new Set(ledger.candidates.map((item) => item.text)).size, 2);
  assert.deepEqual(
    new Set(ledger.candidates.map((candidate) => candidate.sourcePath)),
    new Set(["corpus/a.txt", "corpus/b.txt"]),
  );
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

test("reruns preserve reviews and refuse removal of classification-only reviews", (t) => {
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
  assert.throws(
    () => mergeHumanReviews(extractLedger(manifestFor([]), root), existing),
    /Refusing to remove reviewed candidate/,
  );
});

test("note-only and exclusion-only reviews also block candidate removal", (t) => {
  const root = makeRoot(t);
  put(root, "corpus/a.txt", "佢睇咗套戲。\n");
  const manifest = manifestFor(["corpus/a.txt"]);
  for (const review of [
    { classification: "unreviewed", reviewerNote: "Needs dialect check", exclusionReason: "" },
    { classification: "unreviewed", reviewerNote: "", exclusionReason: "Audio unclear" },
  ]) {
    const existing = extractLedger(manifest, root);
    existing.candidates[0].review = review;
    assert.throws(
      () => mergeHumanReviews(extractLedger(manifestFor([]), root), existing),
      /Refusing to remove reviewed candidate/,
    );
  }
});

test("manifest construction identity metadata is fully validated", (t) => {
  const root = makeRoot(t);
  const manifest = manifestFor([]);
  manifest.canonicalIdentity = "WrongIdentity";
  assert.throws(
    () => validateManifest(manifest, root, { checkFiles: false }),
    /canonicalIdentity/,
  );
});

test("ledger metadata tampering is rejected", (t) => {
  const root = makeRoot(t);
  put(root, "corpus/a.txt", "佢食咗飯。\n");
  const manifest = manifestFor(["corpus/a.txt"]);
  const cases = [
    ["extractionToolVersion", "old-tool", /extractionToolVersion/],
    ["sourceManifestHash", "0".repeat(64), /sourceManifestHash/],
    ["disclaimer", "This is evidence.", /disclaimer/],
  ];
  for (const [field, value, pattern] of cases) {
    const ledger = extractLedger(manifest, root);
    ledger[field] = value;
    assert.throws(() => validateLedger(ledger, manifest), pattern);
  }
  assert.equal(extractLedger(manifest, root).sourceManifestHash, manifestHash(manifest));
});

test("malformed JSON and malformed UTF-8 inputs fail explicitly", (t) => {
  const root = makeRoot(t);
  put(root, "bad.json", "{not-json");
  assert.throws(() => readJson(path.join(root, "bad.json"), "manifest"), /Malformed manifest/);
  put(root, "corpus/bad.txt", Buffer.from([0xc3, 0x28]));
  assert.throws(
    () => extractLedger(manifestFor(["corpus/bad.txt"]), root),
    /Malformed UTF-8 source/,
  );
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
  const tsvDataRows = renderTsv(ledger).trimEnd().split("\n").length - 1;
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
    assert.throws(
      () => validateManifest(manifestFor([prohibitedPath]), root, { checkFiles: false }),
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
  const inventory = sourceInventory(manifestFor([], excluded), root);
  assert.equal(inventory.includedSources.length, 0);
  assert.deepEqual(inventory.excludedSources[0], {
    path: "tests/fixtures/parser.json",
    status: "excluded",
    reasonCode: "parser_fixture",
    reason: "Synthetic parser fixture.",
    exists: false,
  });
});
