"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { TextDecoder } = require("node:util");

const EXTRACTION_TOOL_VERSION = "ab30-corpus-review/1.0.0";
const ALLOWED_CLASSIFICATIONS = Object.freeze([
  "unreviewed",
  "genuine",
  "false_positive",
  "ambiguous",
  "unusable",
]);
const CONSTRUCTION = Object.freeze({
  permanentCode: "AB30",
  canonicalIdentity: "ZoMarkedPerfectiveObjectVP",
  legacyRuntimeLabel: "PostverbalZoPerfectiveVP",
});
const EXTRACTION_REASON =
  "High-recall surface heuristic: a punctuation-bounded span has overt 咗, non-punctuation material before it, and letter/number material after it; reviewer validation required.";
const PROHIBITED_SOURCE_PATTERNS = Object.freeze([
  [/^tests\/fixtures\//, "parser fixture"],
  [/^tests\/constructions\//, "synthetic construction test"],
  [/^validation\//, "generated validation or diagnostic output"],
  [/^grammar\//, "grammar note"],
  [/^docs\//, "documentation or research example"],
  [/^data\/construction-/, "construction identity/status data"],
  [/adjudicat/i, "adjudication material"],
  [/survey/i, "survey material"],
  [/diagnostic/i, "generated diagnostic material"],
]);

function sha256(value) {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

function stableCandidateId(candidate) {
  const identity = [
    CONSTRUCTION.permanentCode,
    candidate.sourcePath,
    candidate.recordId,
    String(candidate.matchStart),
    candidate.contentHash || sha256(candidate.text),
  ].join("\0");
  return `ab30-${sha256(identity).slice(0, 20)}`;
}

function duplicateGroupId(text) {
  return `dup-${sha256(text).slice(0, 16)}`;
}

function readJson(filePath, label = "JSON") {
  let raw;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    throw new Error(`Cannot read ${label} ${filePath}: ${error.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Malformed ${label} ${filePath}: ${error.message}`);
  }
}

function writeTextAtomic(filePath, text) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.tmp-${process.pid}`;
  fs.writeFileSync(tempPath, text, "utf8");
  fs.renameSync(tempPath, filePath);
}

function writeJson(filePath, value) {
  writeTextAtomic(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function assertPlainObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
}

function normalizeRepoPath(value, label) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${label} must be a non-empty repository-relative path`);
  }
  const normalized = value.replaceAll("\\", "/");
  if (
    path.posix.isAbsolute(normalized) ||
    normalized === ".." ||
    normalized.startsWith("../") ||
    normalized.includes("/../") ||
    path.posix.normalize(normalized) !== normalized
  ) {
    throw new Error(`${label} must stay within the repository: ${value}`);
  }
  return normalized;
}

function resolveRepoPath(repoRoot, repoPath) {
  const normalized = normalizeRepoPath(repoPath, "source path");
  return path.join(repoRoot, ...normalized.split("/"));
}

function prohibitedReason(sourcePath) {
  for (const [pattern, reason] of PROHIBITED_SOURCE_PATTERNS) {
    if (pattern.test(sourcePath)) {
      return reason;
    }
  }
  return null;
}

function validateManifest(manifest, repoRoot, options = {}) {
  assertPlainObject(manifest, "Source allowlist");
  if (manifest.schemaVersion !== 1) {
    throw new Error("Source allowlist schemaVersion must be 1");
  }
  if (manifest.permanentCode !== CONSTRUCTION.permanentCode) {
    throw new Error(`Source allowlist permanentCode must be ${CONSTRUCTION.permanentCode}`);
  }
  if (!Array.isArray(manifest.sources) || !Array.isArray(manifest.excludedSources)) {
    throw new Error("Source allowlist must contain sources and excludedSources arrays");
  }

  const includedPaths = new Set();
  for (const [index, source] of manifest.sources.entries()) {
    assertPlainObject(source, `sources[${index}]`);
    source.path = normalizeRepoPath(source.path, `sources[${index}].path`);
    if (includedPaths.has(source.path)) {
      throw new Error(`Duplicate included source path: ${source.path}`);
    }
    includedPaths.add(source.path);
    const blocked = prohibitedReason(source.path);
    if (blocked) {
      throw new Error(`Included source ${source.path} is prohibited: ${blocked}`);
    }
    if (source.format !== "text-lines") {
      throw new Error(`Unsupported source format for ${source.path}: ${source.format}`);
    }
    if (typeof source.sourceType !== "string" || source.sourceType.length === 0) {
      throw new Error(`Included source ${source.path} requires sourceType`);
    }
    if (typeof source.inclusionReason !== "string" || source.inclusionReason.length === 0) {
      throw new Error(`Included source ${source.path} requires inclusionReason`);
    }
    if (options.checkFiles !== false) {
      const absolutePath = resolveRepoPath(repoRoot, source.path);
      if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
        throw new Error(`Included source is not traceable to a file: ${source.path}`);
      }
    }
  }

  const excludedPaths = new Set();
  for (const [index, source] of manifest.excludedSources.entries()) {
    assertPlainObject(source, `excludedSources[${index}]`);
    source.path = normalizeRepoPath(source.path, `excludedSources[${index}].path`);
    if (excludedPaths.has(source.path)) {
      throw new Error(`Duplicate excluded source path: ${source.path}`);
    }
    if (includedPaths.has(source.path)) {
      throw new Error(`Source cannot be both included and excluded: ${source.path}`);
    }
    excludedPaths.add(source.path);
    if (
      typeof source.reasonCode !== "string" ||
      source.reasonCode.length === 0 ||
      typeof source.reason !== "string" ||
      source.reason.length === 0
    ) {
      throw new Error(`Excluded source ${source.path} requires reasonCode and reason`);
    }
  }
  return manifest;
}

function readUtf8File(filePath, sourcePath) {
  const bytes = fs.readFileSync(filePath);
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch (error) {
    throw new Error(`Malformed UTF-8 source ${sourcePath}: ${error.message}`);
  }
}

function readTextLineRecords(repoRoot, source) {
  const absolutePath = resolveRepoPath(repoRoot, source.path);
  const raw = readUtf8File(absolutePath, source.path);
  const lines = raw.split(/\r\n|\n|\r/u);
  if (lines.at(-1) === "") {
    lines.pop();
  }
  return lines.map((text, index) => ({
    recordId: `line:${index + 1}`,
    text,
  }));
}

function hasSurfaceMaterial(value) {
  return /[\p{L}\p{N}]/u.test(value);
}

function extractSurfaceMatches(text) {
  const delimiters = /[，。！？!?；;：:\r\n]/u;
  const matches = [];
  let searchFrom = 0;
  while (true) {
    const markerIndex = text.indexOf("咗", searchFrom);
    if (markerIndex === -1) {
      break;
    }
    let start = markerIndex;
    while (start > 0 && !delimiters.test(text[start - 1])) {
      start -= 1;
    }
    let end = markerIndex + 1;
    while (end < text.length && !delimiters.test(text[end])) {
      end += 1;
    }
    while (start < markerIndex && /\s/u.test(text[start])) {
      start += 1;
    }
    while (end > markerIndex + 1 && /\s/u.test(text[end - 1])) {
      end -= 1;
    }
    const before = text.slice(start, markerIndex);
    const after = text.slice(markerIndex + 1, end);
    if (hasSurfaceMaterial(before) && hasSurfaceMaterial(after)) {
      matches.push({
        matchStart: start,
        matchEnd: end,
        matchedSurfaceSpan: text.slice(start, end),
      });
    }
    searchFrom = markerIndex + 1;
  }
  return matches;
}

function buildCandidate(source, records, recordIndex, match) {
  const record = records[recordIndex];
  const contentHash = sha256(record.text);
  const candidate = {
    candidateId: "",
    sourcePath: source.path,
    recordId: record.recordId,
    text: record.text,
    matchedSurfaceSpan: match.matchedSurfaceSpan,
    matchStart: match.matchStart,
    matchEnd: match.matchEnd,
    leftContext: record.text.slice(0, match.matchStart),
    rightContext: record.text.slice(match.matchEnd),
    previousRecordText: recordIndex > 0 ? records[recordIndex - 1].text : "",
    nextRecordText: recordIndex + 1 < records.length ? records[recordIndex + 1].text : "",
    sourceType: source.sourceType,
    contentHash,
    duplicateGroupId: duplicateGroupId(record.text),
    extractionReason: EXTRACTION_REASON,
    extractionToolVersion: EXTRACTION_TOOL_VERSION,
    review: {
      classification: "unreviewed",
      reviewerNote: "",
      exclusionReason: "",
    },
  };
  candidate.candidateId = stableCandidateId(candidate);
  return candidate;
}

function sourceInventory(manifest, repoRoot) {
  validateManifest(manifest, repoRoot);
  const includedSources = manifest.sources.map((source) => {
    const absolutePath = resolveRepoPath(repoRoot, source.path);
    return {
      path: source.path,
      status: "included",
      sourceType: source.sourceType,
      format: source.format,
      inclusionReason: source.inclusionReason,
      exists: true,
      contentHash: sha256(readUtf8File(absolutePath, source.path)),
    };
  });
  const excludedSources = manifest.excludedSources.map((source) => ({
    path: source.path,
    status: "excluded",
    reasonCode: source.reasonCode,
    reason: source.reason,
    exists: fs.existsSync(resolveRepoPath(repoRoot, source.path)),
  }));
  return {
    schemaVersion: 1,
    permanentCode: CONSTRUCTION.permanentCode,
    inventoryPolicy:
      "Only paths explicitly declared in source-allowlist.json are inventoried; no repository-wide evidence scan is performed.",
    includedSources,
    excludedSources,
  };
}

function emptyClassificationCounts() {
  return Object.fromEntries(ALLOWED_CLASSIFICATIONS.map((value) => [value, 0]));
}

function buildSummary(candidates, manifest) {
  const countsBySource = {};
  const countsByReviewClassification = emptyClassificationCounts();
  const groupCounts = new Map();
  for (const candidate of candidates) {
    countsBySource[candidate.sourcePath] = (countsBySource[candidate.sourcePath] || 0) + 1;
    countsByReviewClassification[candidate.review.classification] += 1;
    groupCounts.set(
      candidate.duplicateGroupId,
      (groupCounts.get(candidate.duplicateGroupId) || 0) + 1,
    );
  }
  const sortedSourceCounts = Object.fromEntries(
    Object.entries(countsBySource).sort(([left], [right]) => left.localeCompare(right)),
  );
  const excludedByReason = {};
  for (const excluded of manifest.excludedSources) {
    excludedByReason[excluded.reasonCode] = (excludedByReason[excluded.reasonCode] || 0) + 1;
  }
  return {
    totalExtracted: candidates.length,
    uniqueCandidateTexts: new Set(candidates.map((candidate) => candidate.text)).size,
    duplicateGroups: [...groupCounts.values()].filter((count) => count > 1).length,
    countsBySource: sortedSourceCounts,
    countsByReviewClassification,
    excludedSourceInventory: {
      total: manifest.excludedSources.length,
      countsByReason: Object.fromEntries(
        Object.entries(excludedByReason).sort(([left], [right]) => left.localeCompare(right)),
      ),
      sources: manifest.excludedSources.map((source) => ({
        path: source.path,
        reasonCode: source.reasonCode,
        reason: source.reason,
      })),
    },
  };
}

function extractLedger(manifest, repoRoot, manifestRaw = JSON.stringify(manifest)) {
  validateManifest(manifest, repoRoot);
  const candidates = [];
  for (const source of manifest.sources) {
    const records = readTextLineRecords(repoRoot, source);
    for (const [recordIndex, record] of records.entries()) {
      for (const match of extractSurfaceMatches(record.text)) {
        candidates.push(buildCandidate(source, records, recordIndex, match));
      }
    }
  }
  candidates.sort((left, right) => left.candidateId.localeCompare(right.candidateId));
  const ledger = {
    schemaVersion: 1,
    construction: { ...CONSTRUCTION },
    extractionToolVersion: EXTRACTION_TOOL_VERSION,
    sourceManifestHash: sha256(manifestRaw),
    disclaimer:
      "Extraction is mechanical candidate preparation, not linguistic validation, construction membership, acceptability, readiness, status, identity, promotion, runtime, or release evidence.",
    candidates,
    summary: {},
  };
  ledger.summary = buildSummary(candidates, manifest);
  return ledger;
}

function validateReview(review, candidateId) {
  assertPlainObject(review, `Review for ${candidateId}`);
  if (!ALLOWED_CLASSIFICATIONS.includes(review.classification)) {
    throw new Error(
      `Invalid classification for ${candidateId}: ${String(review.classification)}`,
    );
  }
  for (const field of ["reviewerNote", "exclusionReason"]) {
    if (typeof review[field] !== "string") {
      throw new Error(`${field} for ${candidateId} must be a string`);
    }
  }
}

function mergeHumanReviews(freshLedger, existingLedger) {
  assertPlainObject(existingLedger, "Existing ledger");
  if (!Array.isArray(existingLedger.candidates)) {
    throw new Error("Existing ledger candidates must be an array");
  }
  const existingById = new Map();
  for (const candidate of existingLedger.candidates) {
    if (existingById.has(candidate.candidateId)) {
      throw new Error(`Duplicate candidate ID in existing ledger: ${candidate.candidateId}`);
    }
    validateReview(candidate.review, candidate.candidateId);
    existingById.set(candidate.candidateId, candidate);
  }

  const freshIds = new Set(freshLedger.candidates.map((candidate) => candidate.candidateId));
  const removedReviewed = existingLedger.candidates.filter(
    (candidate) =>
      candidate.review.classification !== "unreviewed" && !freshIds.has(candidate.candidateId),
  );
  if (removedReviewed.length > 0) {
    throw new Error(
      `Refusing to remove reviewed candidate(s): ${removedReviewed
        .map((candidate) => candidate.candidateId)
        .join(", ")}`,
    );
  }

  for (const candidate of freshLedger.candidates) {
    const existing = existingById.get(candidate.candidateId);
    if (existing) {
      candidate.review = {
        classification: existing.review.classification,
        reviewerNote: existing.review.reviewerNote,
        exclusionReason: existing.review.exclusionReason,
      };
    }
  }
  return freshLedger;
}

function validateCandidate(candidate, manifestPaths) {
  assertPlainObject(candidate, "Candidate");
  const requiredStrings = [
    "candidateId",
    "sourcePath",
    "recordId",
    "text",
    "matchedSurfaceSpan",
    "sourceType",
    "contentHash",
    "duplicateGroupId",
    "extractionReason",
    "extractionToolVersion",
  ];
  for (const field of requiredStrings) {
    if (typeof candidate[field] !== "string" || candidate[field].length === 0) {
      throw new Error(`Candidate ${candidate.candidateId || "(unknown)"} requires ${field}`);
    }
  }
  if (!Number.isInteger(candidate.matchStart) || !Number.isInteger(candidate.matchEnd)) {
    throw new Error(`Candidate ${candidate.candidateId} has invalid match offsets`);
  }
  if (
    candidate.matchStart < 0 ||
    candidate.matchEnd <= candidate.matchStart ||
    candidate.text.slice(candidate.matchStart, candidate.matchEnd) !== candidate.matchedSurfaceSpan
  ) {
    throw new Error(`Candidate ${candidate.candidateId} has an untraceable matched span`);
  }
  if (!manifestPaths.has(candidate.sourcePath)) {
    throw new Error(`Candidate ${candidate.candidateId} has unallowlisted source provenance`);
  }
  if (candidate.contentHash !== sha256(candidate.text)) {
    throw new Error(`Candidate ${candidate.candidateId} has an invalid content hash`);
  }
  if (candidate.duplicateGroupId !== duplicateGroupId(candidate.text)) {
    throw new Error(`Candidate ${candidate.candidateId} has an invalid duplicate-group ID`);
  }
  if (candidate.candidateId !== stableCandidateId(candidate)) {
    throw new Error(`Candidate ${candidate.candidateId} has a non-deterministic stable ID`);
  }
  if (candidate.extractionToolVersion !== EXTRACTION_TOOL_VERSION) {
    throw new Error(`Candidate ${candidate.candidateId} has an unsupported tool version`);
  }
  for (const field of [
    "leftContext",
    "rightContext",
    "previousRecordText",
    "nextRecordText",
  ]) {
    if (typeof candidate[field] !== "string") {
      throw new Error(`Candidate ${candidate.candidateId} requires string ${field}`);
    }
  }
  validateReview(candidate.review, candidate.candidateId);
}

function validateSummary(ledger, manifest) {
  const expected = buildSummary(ledger.candidates, manifest);
  if (JSON.stringify(ledger.summary) !== JSON.stringify(expected)) {
    throw new Error("Ledger summary does not exactly account for every candidate");
  }
}

function validateLedger(ledger, manifest, options = {}) {
  assertPlainObject(ledger, "Ledger");
  if (ledger.schemaVersion !== 1) {
    throw new Error("Ledger schemaVersion must be 1");
  }
  if (
    !ledger.construction ||
    ledger.construction.permanentCode !== CONSTRUCTION.permanentCode ||
    ledger.construction.canonicalIdentity !== CONSTRUCTION.canonicalIdentity ||
    ledger.construction.legacyRuntimeLabel !== CONSTRUCTION.legacyRuntimeLabel
  ) {
    throw new Error("Ledger construction identity metadata does not match AB30");
  }
  if (!Array.isArray(ledger.candidates)) {
    throw new Error("Ledger candidates must be an array");
  }
  const manifestPaths = new Set(manifest.sources.map((source) => source.path));
  const seenIds = new Set();
  for (const candidate of ledger.candidates) {
    if (seenIds.has(candidate.candidateId)) {
      throw new Error(`Duplicate stable candidate ID: ${candidate.candidateId}`);
    }
    seenIds.add(candidate.candidateId);
    validateCandidate(candidate, manifestPaths);
  }
  if (options.skipSummary !== true) {
    validateSummary(ledger, manifest);
  }
  return true;
}

function validateReproducible(ledger, manifest, repoRoot, manifestRaw) {
  const fresh = extractLedger(manifest, repoRoot, manifestRaw);
  const actualIds = ledger.candidates.map((candidate) => candidate.candidateId).sort();
  const freshIds = fresh.candidates.map((candidate) => candidate.candidateId).sort();
  if (JSON.stringify(actualIds) !== JSON.stringify(freshIds)) {
    throw new Error("Extraction rerun changes candidate IDs for the current allowlisted inputs");
  }
  const freshById = new Map(fresh.candidates.map((candidate) => [candidate.candidateId, candidate]));
  for (const candidate of ledger.candidates) {
    const expected = freshById.get(candidate.candidateId);
    for (const field of [
      "sourcePath",
      "recordId",
      "text",
      "matchedSurfaceSpan",
      "matchStart",
      "matchEnd",
      "leftContext",
      "rightContext",
      "previousRecordText",
      "nextRecordText",
      "sourceType",
      "contentHash",
      "duplicateGroupId",
      "extractionReason",
      "extractionToolVersion",
    ]) {
      if (candidate[field] !== expected[field]) {
        throw new Error(
          `Candidate ${candidate.candidateId} no longer traces to the current source (${field})`,
        );
      }
    }
  }
  return true;
}

function tsvEscape(value) {
  const rendered = String(value);
  if (rendered.length === 0) {
    return "\"\"";
  }
  return rendered
    .replaceAll("\\", "\\\\")
    .replaceAll("\t", "\\t")
    .replaceAll("\r", "\\r")
    .replaceAll("\n", "\\n");
}

const TSV_COLUMNS = Object.freeze([
  ["candidate_id", (candidate) => candidate.candidateId],
  ["source_path", (candidate) => candidate.sourcePath],
  ["record_id", (candidate) => candidate.recordId],
  ["exact_text", (candidate) => candidate.text],
  ["matched_surface_span", (candidate) => candidate.matchedSurfaceSpan],
  ["match_start", (candidate) => candidate.matchStart],
  ["match_end", (candidate) => candidate.matchEnd],
  ["left_context", (candidate) => candidate.leftContext],
  ["right_context", (candidate) => candidate.rightContext],
  ["previous_record_text", (candidate) => candidate.previousRecordText],
  ["next_record_text", (candidate) => candidate.nextRecordText],
  ["source_type", (candidate) => candidate.sourceType],
  ["content_hash", (candidate) => candidate.contentHash],
  ["duplicate_group_id", (candidate) => candidate.duplicateGroupId],
  ["extraction_reason", (candidate) => candidate.extractionReason],
  ["extraction_tool_version", (candidate) => candidate.extractionToolVersion],
  ["classification", (candidate) => candidate.review.classification],
  ["reviewer_note", (candidate) => candidate.review.reviewerNote],
  ["exclusion_reason", (candidate) => candidate.review.exclusionReason],
]);

function renderTsv(ledger) {
  const rows = [TSV_COLUMNS.map(([name]) => name).join("\t")];
  for (const candidate of ledger.candidates) {
    rows.push(
      TSV_COLUMNS.map(([, getter]) => tsvEscape(getter(candidate))).join("\t"),
    );
  }
  return `${rows.join("\n")}\n`;
}

module.exports = {
  ALLOWED_CLASSIFICATIONS,
  CONSTRUCTION,
  EXTRACTION_REASON,
  EXTRACTION_TOOL_VERSION,
  buildSummary,
  duplicateGroupId,
  extractLedger,
  extractSurfaceMatches,
  mergeHumanReviews,
  readJson,
  renderTsv,
  sha256,
  sourceInventory,
  stableCandidateId,
  validateLedger,
  validateManifest,
  validateReproducible,
  writeJson,
  writeTextAtomic,
};
