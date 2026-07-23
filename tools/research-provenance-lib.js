"use strict";

const fs = require("fs");
const path = require("path");

const LEDGER_HEADERS_V1 = [
  "source_id",
  "verification",
  "citation_and_locator",
  "what_it_supports",
  "limit",
  "disposition",
];

const LEDGER_HEADERS_V2 = [
  "source_id",
  "evidence_grade",
  "verification",
  "citation_and_locator",
  "what_it_supports",
  "limit",
  "disposition",
];

const MAIN_FILE_RE = /^((?:UC-RQ|PRQ2)-\d{3})-(?!\d{3}-).+-(?:RESEARCH|DISPOSITION)-R1\.md$/;
const INDEX_ROW_RE = /^\|\s*((?:UC-RQ|PRQ2)-\d{3})\s*\|\s*\[[^\]]+\]\(([^)]+)\)\s*\|\s*$/;
const PROMOTION_RE = /(?:^|_)(?:PROMOTE|DEDICATED)(?:_|$)|SUPPORTED_PRODUCTIVE|(?:CORE|PRODUCTIVE)/i;
const DIRECT_EVIDENCE_RE = /(FULL_TEXT|PEER_REVIEWED|SCHOLARLY|DISSERTATION|THESIS|PROCEEDINGS|REFERENCE_GRAMMAR|BOOK_COMPANION|PRIMARY_(?:CORPUS|AUTHOR)|CORPUS_(?:ATTESTATION|CONTEXT)|CONTROLLED_JUDGMENT|EXPERIMENTAL)/i;
const RUNTIME_RE = /RUNTIME/i;

const HEADER_ALIASES = {
  source_id: ["source_id"],
  evidence_grade: ["evidence_grade"],
  verification: ["verification", "verification_status", "source_type"],
  citation_and_locator: ["citation_and_locator", "citation", "citation_or_title", "locator", "url_or_location"],
  what_it_supports: ["what_it_supports", "claim_supported", "claim_used"],
  limit: ["limit", "limitation", "limitations"],
  disposition: ["disposition"],
};

function read(file) {
  return fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
}

function parseTsv(text) {
  const lines = text.replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
  if (lines.length === 1 && lines[0] === "") return { headers: [], rows: [], malformedRows: [] };
  const headers = lines.shift().split("\t");
  const rows = [];
  const malformedRows = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].trim()) continue;
    const cells = lines[index].split("\t");
    if (cells.length !== headers.length) malformedRows.push(index + 2);
    rows.push(Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex] || ""])));
  }
  return { headers, rows, malformedRows };
}

function normalizeLedger(parsed) {
  const knownHeaders = new Set(Object.values(HEADER_ALIASES).flat());
  const unknownHeaders = parsed.headers.filter((header) => !knownHeaders.has(header));
  const hasRequiredGroups = ["source_id", "verification", "citation_and_locator", "what_it_supports", "limit"]
    .every((field) => HEADER_ALIASES[field].some((header) => parsed.headers.includes(header)));
  const rows = parsed.rows.map((raw) => {
    const normalized = {};
    for (const [field, aliases] of Object.entries(HEADER_ALIASES)) {
      normalized[field] = aliases.map((alias) => raw[alias] || "").filter(Boolean).join("; ");
    }
    return normalized;
  });
  const headerLine = parsed.headers.join("\t");
  const schemaVersion = headerLine === LEDGER_HEADERS_V2.join("\t")
    ? "v2"
    : headerLine === LEDGER_HEADERS_V1.join("\t")
      ? "v1"
      : hasRequiredGroups && unknownHeaders.length === 0
        ? "legacy"
        : "malformed";
  return {
    schemaVersion,
    canonical: schemaVersion === "v2",
    recognized: schemaVersion !== "malformed",
    hasEvidenceGradeColumn: parsed.headers.includes("evidence_grade"),
    unknownHeaders,
    rows,
  };
}

function parseIndex(text) {
  const entries = [];
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(INDEX_ROW_RE);
    if (match) entries.push({ id: match[1], main: match[2] });
  }
  return entries;
}

function parseResearchId(text) {
  const frontmatter = text.match(/^research_id:\s*((?:UC-RQ|PRQ2)-\d{3})\s*$/m);
  if (frontmatter) return frontmatter[1];
  const identity = text.match(/^\s*-\s*Research ID:\s*`?((?:UC-RQ|PRQ2)-\d{3})`?\s*$/m);
  return identity ? identity[1] : "";
}

function parseHeadingId(text) {
  const match = text.match(/^#\s+((?:UC-RQ|PRQ2)-\d{3})\b/m);
  return match ? match[1] : "";
}

function derivePackage(mainName) {
  const match = mainName.match(/^(.*)-(RESEARCH|DISPOSITION)-R1\.md$/);
  if (!match) return null;
  return {
    stem: match[1],
    source: `${match[1]}-SOURCE-VERIFICATION-R1.tsv`,
    collision: `${match[1]}-COLLISION-AUDIT-R1.tsv`,
  };
}

function findCompanionReference(text, id, kind) {
  const extension = kind === "SOURCE-VERIFICATION" || kind === "COLLISION-AUDIT" ? "tsv" : "md";
  const pattern = new RegExp(`(${id}-[A-Z0-9-]+-${kind}-R1\\.${extension})`, "g");
  const matches = [...text.matchAll(pattern)].map((match) => match[1]);
  return [...new Set(matches)][0] || "";
}

function stableLocator(value) {
  const normalized = String(value || "").trim();
  return normalized.length >= 8 && !/^(?:none|n\/?a|unknown|tbd|unavailable|missing)$/i.test(normalized);
}

function issueWithBaseline(errors, warnings, issue, baselineSet) {
  if (baselineSet.has(issue.id)) warnings.push({ ...issue, baseline: true });
  else errors.push(issue);
}

function loadEvidenceGradeConfig(root) {
  const file = path.join(root, "config", "research-evidence-grades.json");
  if (!fs.existsSync(file)) {
    return {
      error: { type: "missing_evidence_grade_config", file: path.relative(root, file) },
      config: { grades: {}, canonical_ledger_headers: LEDGER_HEADERS_V2 },
    };
  }
  try {
    const config = JSON.parse(read(file));
    return { config };
  } catch (error) {
    return {
      error: { type: "malformed_evidence_grade_config", file: path.relative(root, file), message: error.message },
      config: { grades: {}, canonical_ledger_headers: LEDGER_HEADERS_V2 },
    };
  }
}

function validateEvidenceGradeConfig(config) {
  const errors = [];
  if (!config || typeof config !== "object") return [{ type: "invalid_evidence_grade_config" }];
  if (!Array.isArray(config.canonical_ledger_headers) || config.canonical_ledger_headers.join("\t") !== LEDGER_HEADERS_V2.join("\t")) {
    errors.push({ type: "evidence_grade_header_config_mismatch", expected: LEDGER_HEADERS_V2, found: config.canonical_ledger_headers || null });
  }
  const requiredGrades = [
    "DIRECT_SCHOLARLY_CORE",
    "REFERENCE_GRAMMAR_CORE",
    "PRIMARY_CORPUS_ATTESTATION",
    "CONTROLLED_JUDGMENT_EVIDENCE",
    "ATTESTATION_ONLY",
    "LEXICAL_OR_PRONUNCIATION_ONLY",
    "DISCOVERY_LEAD_ONLY",
    "RUNTIME_OBSERVATION_ONLY",
  ];
  for (const grade of requiredGrades) {
    if (!config.grades || !config.grades[grade]) errors.push({ type: "missing_required_evidence_grade", grade });
  }
  return errors;
}

function auditResearchProvenance(root, options = {}) {
  const researchDir = path.join(root, "docs", "research");
  const indexPath = path.join(researchDir, "CURRENT-RESEARCH-PROVENANCE.md");
  const baselinePath = options.baselinePath || path.join(root, "config", "research-provenance-baseline.json");
  const errors = [];
  const warnings = [];
  const packages = [];
  const knownWeak = new Set();
  const knownLegacyHeaders = new Set();
  const knownMissingCompanionLinks = new Set();
  const knownUngradedLedgers = new Set();
  const gradeStateById = new Map();
  let evidenceGatePrefixes = ["UC-RQ", "PRQ2"];

  const gradeConfigResult = loadEvidenceGradeConfig(root);
  if (gradeConfigResult.error) errors.push(gradeConfigResult.error);
  const evidenceConfig = gradeConfigResult.config;
  errors.push(...validateEvidenceGradeConfig(evidenceConfig));
  const allowedGrades = new Set(Object.keys(evidenceConfig.grades || {}));
  const coreQualifyingGrades = new Set(
    Object.entries(evidenceConfig.grades || {})
      .filter(([, value]) => value && value.core_promotion_qualifying)
      .map(([grade]) => grade)
  );

  if (fs.existsSync(baselinePath)) {
    const baseline = JSON.parse(read(baselinePath));
    for (const id of baseline.known_weak_core_ids || []) knownWeak.add(id);
    for (const id of baseline.known_legacy_ledger_ids || []) knownLegacyHeaders.add(id);
    for (const id of baseline.known_missing_companion_link_ids || []) knownMissingCompanionLinks.add(id);
    for (const id of baseline.known_ungraded_ledger_ids || []) knownUngradedLedgers.add(id);
    if (Array.isArray(baseline.evidence_gate_prefixes)) evidenceGatePrefixes = baseline.evidence_gate_prefixes;
  }

  if (!fs.existsSync(indexPath)) {
    errors.push({ type: "missing_index", file: path.relative(root, indexPath) });
    return { schema: "canto-span-research-provenance-v2", status: "FAIL", errors, warnings, packages };
  }

  const indexEntries = parseIndex(read(indexPath));
  const indexedById = new Map();
  const indexedByMain = new Map();
  for (const entry of indexEntries) {
    if (indexedById.has(entry.id)) errors.push({ type: "duplicate_index_id", id: entry.id, files: [indexedById.get(entry.id).main, entry.main] });
    indexedById.set(entry.id, entry);
    if (indexedByMain.has(entry.main)) errors.push({ type: "duplicate_index_file", file: entry.main, ids: [indexedByMain.get(entry.main), entry.id] });
    indexedByMain.set(entry.main, entry.id);
  }

  const discovered = fs.readdirSync(researchDir)
    .filter((name) => MAIN_FILE_RE.test(name))
    .map((name) => ({ name, id: name.match(MAIN_FILE_RE)[1] }));
  const discoveredById = new Map();
  for (const item of discovered) {
    if (!discoveredById.has(item.id)) discoveredById.set(item.id, []);
    discoveredById.get(item.id).push(item.name);
    if (!indexedByMain.has(item.name)) errors.push({ type: "unindexed_package", id: item.id, file: item.name });
  }
  for (const [id, names] of discoveredById.entries()) {
    if (names.length > 1) errors.push({ type: "duplicate_package_id", id, files: names.sort() });
  }

  for (const entry of indexEntries) {
    const mainPath = path.join(researchDir, entry.main);
    const item = {
      id: entry.id,
      main: entry.main,
      source: "",
      collision: "",
      ledger_schema: "unknown",
      evidence_grades: [],
      strongest_evidence: "NONE",
      known_weak_core: false,
    };
    packages.push(item);
    if (!fs.existsSync(mainPath)) {
      errors.push({ type: "missing_main_record", id: entry.id, file: entry.main });
      continue;
    }

    const derived = derivePackage(entry.main);
    if (!derived) {
      errors.push({ type: "unsupported_main_filename", id: entry.id, file: entry.main });
      continue;
    }
    const mainText = read(mainPath);
    const contentId = parseResearchId(mainText);
    const headingId = parseHeadingId(mainText);
    if (contentId !== entry.id) errors.push({ type: "main_content_id_mismatch", id: entry.id, file: entry.main, found: contentId || null });
    if (headingId !== entry.id) errors.push({ type: "heading_id_mismatch", id: entry.id, file: entry.main, found: headingId || null });

    const sourceReference = findCompanionReference(mainText, entry.id, "SOURCE-VERIFICATION");
    const collisionReference = findCompanionReference(mainText, entry.id, "COLLISION-AUDIT");
    item.source = sourceReference || derived.source;
    item.collision = collisionReference || derived.collision;

    if (!sourceReference && fs.existsSync(path.join(researchDir, item.source))) {
      issueWithBaseline(errors, warnings, { type: "missing_source_companion_link", id: entry.id, file: entry.main, expected: item.source }, knownMissingCompanionLinks);
    }
    if (!collisionReference && fs.existsSync(path.join(researchDir, item.collision))) {
      issueWithBaseline(errors, warnings, { type: "missing_collision_companion_link", id: entry.id, file: entry.main, expected: item.collision }, knownMissingCompanionLinks);
    }

    const sourcePath = path.join(researchDir, item.source);
    const collisionPath = path.join(researchDir, item.collision);
    if (!fs.existsSync(sourcePath)) errors.push({ type: "missing_source_ledger", id: entry.id, file: item.source });
    if (!fs.existsSync(collisionPath)) errors.push({ type: "missing_collision_audit", id: entry.id, file: item.collision });
    if (!fs.existsSync(sourcePath)) continue;

    const parsed = parseTsv(read(sourcePath));
    const ledger = normalizeLedger(parsed);
    item.ledger_schema = ledger.schemaVersion;
    if (ledger.schemaVersion === "legacy") {
      issueWithBaseline(
        errors,
        warnings,
        { type: "legacy_source_header", id: entry.id, file: item.source, found: parsed.headers },
        knownLegacyHeaders
      );
    } else if (ledger.schemaVersion === "malformed") {
      errors.push({ type: "malformed_source_header", id: entry.id, file: item.source, found: parsed.headers });
    }
    for (const line of parsed.malformedRows) errors.push({ type: "malformed_source_row", id: entry.id, file: item.source, line });

    if (!ledger.hasEvidenceGradeColumn) {
      gradeStateById.set(entry.id, "ungraded");
      issueWithBaseline(
        errors,
        warnings,
        { type: "missing_evidence_grade_column", id: entry.id, file: item.source },
        knownUngradedLedgers
      );
    } else {
      gradeStateById.set(entry.id, "graded");
    }

    let qualifyingDirect = 0;
    let promotionClaim = false;
    const gradesSeen = new Set();
    for (let rowIndex = 0; rowIndex < ledger.rows.length; rowIndex += 1) {
      const row = ledger.rows[rowIndex];
      const line = rowIndex + 2;
      if (!row.source_id) errors.push({ type: "missing_source_id", id: entry.id, file: item.source, line });
      if (!stableLocator(row.citation_and_locator)) errors.push({ type: "missing_stable_locator", id: entry.id, file: item.source, line, source_id: row.source_id || null });
      if (!String(row.limit || "").trim() || /^(?:none|n\/?a|unknown|tbd)$/i.test(String(row.limit).trim())) {
        errors.push({ type: "missing_source_limitation", id: entry.id, file: item.source, line, source_id: row.source_id || null });
      }

      const runtimeByMetadata = RUNTIME_RE.test(`${row.source_id} ${row.verification}`);
      const promotes = PROMOTION_RE.test(row.disposition || "");
      if (promotes) promotionClaim = true;

      if (ledger.hasEvidenceGradeColumn) {
        const grade = String(row.evidence_grade || "").trim();
        if (!grade) {
          errors.push({ type: "missing_evidence_grade", id: entry.id, file: item.source, line, source_id: row.source_id || null });
        } else if (!allowedGrades.has(grade)) {
          errors.push({ type: "invalid_evidence_grade", id: entry.id, file: item.source, line, source_id: row.source_id || null, grade });
        } else {
          gradesSeen.add(grade);
          if (coreQualifyingGrades.has(grade)) qualifyingDirect += 1;
          if (runtimeByMetadata && grade !== "RUNTIME_OBSERVATION_ONLY") {
            errors.push({ type: "runtime_evidence_grade_mismatch", id: entry.id, file: item.source, line, source_id: row.source_id, grade });
          }
          if (!runtimeByMetadata && grade === "RUNTIME_OBSERVATION_ONLY") {
            warnings.push({ type: "runtime_grade_without_runtime_marker", id: entry.id, file: item.source, line, source_id: row.source_id });
          }
          if (grade === "RUNTIME_OBSERVATION_ONLY" && promotes) {
            errors.push({ type: "runtime_presented_as_linguistic_evidence", id: entry.id, file: item.source, line, source_id: row.source_id });
          }
          if (grade === "DISCOVERY_LEAD_ONLY") {
            if (promotes || !/(LEAD|RECOVER|DISCOVER|BIBLIOGRAPH)/i.test(row.disposition || "")) {
              errors.push({ type: "discovery_lead_substantive_disposition", id: entry.id, file: item.source, line, source_id: row.source_id, disposition: row.disposition || "" });
            }
          }
          if (["ATTESTATION_ONLY", "LEXICAL_OR_PRONUNCIATION_ONLY", "PRIMARY_CORPUS_ATTESTATION"].includes(grade) && promotes) {
            warnings.push({ type: "nonqualifying_row_uses_promotion_disposition", id: entry.id, file: item.source, line, source_id: row.source_id, grade });
          }
        }
      } else {
        if (runtimeByMetadata && promotes) {
          errors.push({ type: "runtime_presented_as_linguistic_evidence", id: entry.id, file: item.source, line, source_id: row.source_id });
        }
        if (!runtimeByMetadata && DIRECT_EVIDENCE_RE.test(row.verification || "")) qualifyingDirect += 1;
      }
    }

    item.evidence_grades = [...gradesSeen].sort();
    item.strongest_evidence = gradesSeen.size
      ? [...gradesSeen].find((grade) => coreQualifyingGrades.has(grade)) || [...gradesSeen][0]
      : qualifyingDirect > 0
        ? "TRANSITIONAL_HEURISTIC_DIRECT"
        : "ATTESTATION_OR_RUNTIME_ONLY";
    item.known_weak_core = promotionClaim && qualifyingDirect === 0 && knownWeak.has(entry.id);
    const evidenceGateEnabled = evidenceGatePrefixes.some((prefix) => entry.id.startsWith(`${prefix}-`));
    if (evidenceGateEnabled && promotionClaim && qualifyingDirect === 0) {
      issueWithBaseline(errors, warnings, { type: "promotion_without_direct_evidence", id: entry.id, file: item.source }, knownWeak);
    }
  }

  for (const [kind, ids] of [
    ["weak_core", knownWeak],
    ["legacy_ledger", knownLegacyHeaders],
    ["missing_companion_link", knownMissingCompanionLinks],
  ]) {
    for (const id of ids) {
      if (!indexedById.has(id)) errors.push({ type: `stale_${kind}_baseline`, id });
    }
  }
  for (const id of knownUngradedLedgers) {
    if (!indexedById.has(id)) {
      errors.push({ type: "stale_ungraded_ledger_baseline", id });
    } else if (gradeStateById.get(id) === "graded") {
      errors.push({ type: "stale_ungraded_ledger_baseline", id });
    }
  }

  return {
    schema: "canto-span-research-provenance-v2",
    package_count: packages.length,
    graded_package_count: packages.filter((item) => item.ledger_schema === "v2").length,
    ungraded_package_count: warnings.filter((item) => item.type === "missing_evidence_grade_column").length,
    known_weak_core_count: warnings.filter((item) => item.type === "promotion_without_direct_evidence").length,
    known_legacy_header_count: warnings.filter((item) => item.type === "legacy_source_header").length,
    known_missing_companion_link_count: warnings.filter((item) => /companion_link$/.test(item.type)).length,
    error_count: errors.length,
    warning_count: warnings.length,
    status: errors.length ? "FAIL" : "PASS",
    packages,
    errors,
    warnings,
  };
}

module.exports = {
  LEDGER_HEADERS_V1,
  LEDGER_HEADERS_V2,
  auditResearchProvenance,
  derivePackage,
  findCompanionReference,
  loadEvidenceGradeConfig,
  normalizeLedger,
  parseIndex,
  parseResearchId,
  parseTsv,
  validateEvidenceGradeConfig,
};
