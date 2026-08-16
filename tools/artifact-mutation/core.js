"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const COMPLETENESS_STATUSES = new Set([
  "complete",
  "unresolved",
  "intentional_hold",
  "not_applicable",
]);
const OPERATION_ACTIONS = new Set(["added", "updated", "already_present", "skipped"]);

function asErrors(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  if (Array.isArray(value.errors)) return value.errors.map(String);
  return [String(value)];
}

function stableCompare(left, right) {
  return JSON.stringify(left).localeCompare(JSON.stringify(right));
}

function sortedCopy(items) {
  return [...items].sort(stableCompare);
}

function validationEntry(phase, errors) {
  return { phase, status: errors.length ? "FAIL" : "PASS", errors: [...errors].sort() };
}

function runValidator(phase, validator, ...args) {
  if (typeof validator !== "function") return [];
  try {
    return asErrors(validator(...args));
  } catch (error) {
    return [`${phase} validator threw: ${error.message}`];
  }
}

function emptyGaps() {
  return { records: [], by_dimension: {}, systematic_omissions: [] };
}

function baseReport(adapterId, options, inputCount) {
  return {
    schema: "canto-span-artifact-mutation-report-v1",
    status: "FAIL",
    mode: options.write ? "write" : "dry-run",
    adapter: adapterId || null,
    target: options.target || null,
    input_count: inputCount,
    counts: { added: 0, updated: 0, already_present: 0, skipped: 0 },
    conflicts: [],
    gaps: emptyGaps(),
    affected_artifacts: [],
    planned_write_count: 0,
    writes_occurred: false,
    write_count: 0,
    validation_results: [],
    warnings: [],
    errors: [],
  };
}

function adapterContractErrors(adapter) {
  if (!adapter || typeof adapter !== "object") return ["adapter must be an object"];
  const errors = [];
  if (!adapter.id || typeof adapter.id !== "string") errors.push("adapter.id must be a non-empty string");
  for (const name of ["load", "normalize", "plan", "serialize"]) {
    if (typeof adapter[name] !== "function") errors.push(`adapter.${name} must be a function`);
  }
  if (adapter.completenessDimensions && typeof adapter.completenessDimensions !== "function") {
    errors.push("adapter.completenessDimensions must be a function when provided");
  }
  if (adapter.assessCompleteness && typeof adapter.assessCompleteness !== "function") {
    errors.push("adapter.assessCompleteness must be a function when provided");
  }
  return errors;
}

function normalizeDimensions(adapter, target) {
  if (!adapter.completenessDimensions) return [];
  const values = adapter.completenessDimensions({ target }) || [];
  if (!Array.isArray(values)) throw new Error("adapter.completenessDimensions must return an array");
  const dimensions = values.map((item) => typeof item === "string" ? item : item && item.name);
  if (dimensions.some((item) => !item || typeof item !== "string")) {
    throw new Error("completeness dimensions must be strings or objects with a string name");
  }
  if (new Set(dimensions).size !== dimensions.length) throw new Error("duplicate completeness dimension");
  return dimensions.sort();
}

function assessGaps(adapter, rawCandidates, normalizedCandidates, target, omissionThreshold) {
  const dimensions = normalizeDimensions(adapter, target);
  if (!dimensions.length) return emptyGaps();
  if (typeof adapter.assessCompleteness !== "function") {
    throw new Error("adapter declares completeness dimensions but has no assessCompleteness function");
  }

  const records = [];
  const byDimension = {};
  const omitted = {};
  for (const dimension of dimensions) {
    byDimension[dimension] = { complete: 0, unresolved: 0, intentional_hold: 0, not_applicable: 0 };
    omitted[dimension] = 0;
  }

  for (let index = 0; index < rawCandidates.length; index += 1) {
    const values = adapter.assessCompleteness({
      rawCandidate: rawCandidates[index],
      normalizedCandidate: normalizedCandidates[index],
      index,
      target,
    });
    if (!Array.isArray(values)) throw new Error(`assessCompleteness must return an array for input ${index}`);
    const assessments = new Map();
    for (const value of values) {
      if (!value || typeof value.dimension !== "string") throw new Error(`invalid completeness assessment at input ${index}`);
      if (assessments.has(value.dimension)) throw new Error(`duplicate completeness assessment ${value.dimension} at input ${index}`);
      assessments.set(value.dimension, value);
    }
    for (const dimension of dimensions) {
      const value = assessments.get(dimension);
      if (!value) throw new Error(`missing completeness assessment ${dimension} for input ${index}`);
      if (!COMPLETENESS_STATUSES.has(value.status)) {
        throw new Error(`invalid completeness status ${value.status} for ${dimension} at input ${index}`);
      }
      byDimension[dimension][value.status] += 1;
      if (value.provided === false) omitted[dimension] += 1;
      if (value.status !== "complete") {
        records.push({
          index,
          identity: value.identity == null ? null : String(value.identity),
          dimension,
          status: value.status,
          provided: value.provided === true ? true : value.provided === false ? false : null,
          detail: value.detail || null,
        });
      }
    }
  }

  const systematic = [];
  if (rawCandidates.length) {
    for (const dimension of dimensions) {
      const ratio = omitted[dimension] / rawCandidates.length;
      if (ratio >= omissionThreshold) {
        systematic.push({
          dimension,
          omitted_count: omitted[dimension],
          input_count: rawCandidates.length,
          ratio,
        });
      }
    }
  }
  return {
    records: sortedCopy(records),
    by_dimension: byDimension,
    systematic_omissions: sortedCopy(systematic),
  };
}

function normalizeWrites(writes) {
  if (!Array.isArray(writes)) throw new Error("adapter.serialize must return an array of writes");
  const seen = new Set();
  const normalized = writes.map((write, index) => {
    if (!write || typeof write.path !== "string" || !write.path) throw new Error(`write ${index} requires a path`);
    if (typeof write.content !== "string" && !Buffer.isBuffer(write.content)) {
      throw new Error(`write ${index} content must be a string or Buffer`);
    }
    const absolute = path.resolve(write.path);
    if (seen.has(absolute)) throw new Error(`duplicate write target: ${absolute}`);
    seen.add(absolute);
    return { path: absolute, content: write.content };
  });
  return normalized.sort((left, right) => left.path.localeCompare(right.path));
}

function safeUnlink(fsImpl, file, errors) {
  try {
    if (fsImpl.existsSync(file)) fsImpl.unlinkSync(file);
  } catch (error) {
    errors.push(`cleanup ${file}: ${error.message}`);
  }
}

function commitWrites(writes, options = {}) {
  const fsImpl = options.fsImpl || fs;
  const normalized = normalizeWrites(writes);
  if (!normalized.length) return { writeCount: 0, warnings: [] };

  const nonce = crypto.randomUUID();
  const entries = normalized.map((write, index) => ({
    ...write,
    temp: `${write.path}.artifact-mutation-${nonce}-${index}.tmp`,
    backup: `${write.path}.artifact-mutation-${nonce}-${index}.bak`,
    hadOriginal: false,
    committed: false,
  }));

  try {
    for (const entry of entries) {
      fsImpl.mkdirSync(path.dirname(entry.path), { recursive: true });
      fsImpl.writeFileSync(entry.temp, entry.content);
    }
    for (const entry of entries) {
      if (fsImpl.existsSync(entry.path)) {
        fsImpl.renameSync(entry.path, entry.backup);
        entry.hadOriginal = true;
      }
      fsImpl.renameSync(entry.temp, entry.path);
      entry.committed = true;
    }
  } catch (error) {
    const rollbackErrors = [];
    for (const entry of [...entries].reverse()) {
      if (entry.committed) safeUnlink(fsImpl, entry.path, rollbackErrors);
      if (entry.hadOriginal) {
        try {
          if (!fsImpl.existsSync(entry.backup)) {
            rollbackErrors.push(`restore ${entry.path}: backup missing at ${entry.backup}`);
          } else {
            fsImpl.renameSync(entry.backup, entry.path);
          }
        } catch (rollbackError) {
          rollbackErrors.push(`restore ${entry.path}: ${rollbackError.message}`);
        }
      }
      safeUnlink(fsImpl, entry.temp, rollbackErrors);
      if (!entry.hadOriginal) safeUnlink(fsImpl, entry.backup, rollbackErrors);
    }
    const wrapped = new Error(`artifact mutation commit failed: ${error.message}`);
    wrapped.code = "ARTIFACT_MUTATION_COMMIT_FAILED";
    wrapped.rollbackErrors = rollbackErrors;
    throw wrapped;
  }

  const warnings = [];
  for (const entry of entries) safeUnlink(fsImpl, entry.backup, warnings);
  return { writeCount: entries.length, warnings };
}

function deriveCounts(operations) {
  const counts = { added: 0, updated: 0, already_present: 0, skipped: 0 };
  for (const operation of operations) {
    if (!operation || !OPERATION_ACTIONS.has(operation.action)) {
      throw new Error(`invalid planned action: ${operation && operation.action}`);
    }
    counts[operation.action] += 1;
  }
  return counts;
}

function runMutation(adapter, candidates, options = {}) {
  const effective = {
    write: options.write === true,
    target: options.target || null,
    failOnGap: options.failOnGap === true,
    omissionThreshold: options.omissionThreshold == null ? 0.9 : Number(options.omissionThreshold),
    fsImpl: options.fsImpl || fs,
  };
  const input = Array.isArray(candidates) ? candidates : [];
  const report = baseReport(adapter && adapter.id, effective, input.length);

  if (!Array.isArray(candidates)) {
    report.errors.push("candidates must be an array");
    return report;
  }
  if (!(effective.omissionThreshold > 0 && effective.omissionThreshold <= 1)) {
    report.errors.push("omissionThreshold must be greater than 0 and at most 1");
    return report;
  }
  const contractErrors = adapterContractErrors(adapter);
  if (contractErrors.length) {
    report.errors.push(...contractErrors.sort());
    return report;
  }

  let current;
  try {
    current = adapter.load();
  } catch (error) {
    report.errors.push(`load failed: ${error.message}`);
    return report;
  }
  const currentErrors = runValidator("current", adapter.validateCurrent, current);
  report.validation_results.push(validationEntry("current", currentErrors));
  if (currentErrors.length) return report;

  const normalized = [];
  for (let index = 0; index < input.length; index += 1) {
    try {
      normalized.push(adapter.normalize(input[index], { index, target: effective.target }));
    } catch (error) {
      report.errors.push(`input ${index}: ${error.message}`);
    }
  }
  if (report.errors.length) return report;

  try {
    report.gaps = assessGaps(adapter, input, normalized, effective.target, effective.omissionThreshold);
  } catch (error) {
    report.errors.push(`completeness assessment failed: ${error.message}`);
    return report;
  }

  let plan;
  try {
    plan = adapter.plan({ current, candidates: normalized, rawCandidates: input, target: effective.target }) || {};
  } catch (error) {
    report.errors.push(`planning failed: ${error.message}`);
    return report;
  }
  report.errors.push(...asErrors(plan.errors).sort());
  report.conflicts = sortedCopy(Array.isArray(plan.conflicts) ? plan.conflicts : []);
  try {
    report.counts = deriveCounts(Array.isArray(plan.operations) ? plan.operations : []);
  } catch (error) {
    report.errors.push(`planning failed: ${error.message}`);
  }
  if (report.errors.length || report.conflicts.length) return report;
  if (!("nextState" in plan)) {
    report.errors.push("adapter.plan must return nextState");
    return report;
  }

  const resultErrors = runValidator("result", adapter.validateResult, plan.nextState, plan);
  report.validation_results.push(validationEntry("result", resultErrors));
  if (resultErrors.length) return report;

  let writes;
  try {
    writes = normalizeWrites(adapter.serialize(plan.nextState, plan));
  } catch (error) {
    report.errors.push(`serialization failed: ${error.message}`);
    return report;
  }
  report.affected_artifacts = writes.map((write) => write.path);
  report.planned_write_count = writes.length;

  const unresolved = report.gaps.records.filter((gap) => gap.status === "unresolved");
  if (effective.failOnGap && unresolved.length) {
    report.errors.push(`unresolved completeness gaps: ${unresolved.length}`);
    return report;
  }

  const changed = report.counts.added + report.counts.updated > 0;
  if (!effective.write || !changed || !writes.length) {
    report.status = "PASS";
    return report;
  }

  try {
    const committed = commitWrites(writes, { fsImpl: effective.fsImpl });
    report.writes_occurred = committed.writeCount > 0;
    report.write_count = committed.writeCount;
    report.warnings.push(...committed.warnings.sort());
    report.status = "PASS";
  } catch (error) {
    report.errors.push(error.message);
    if (Array.isArray(error.rollbackErrors)) {
      report.errors.push(...error.rollbackErrors.map((item) => `rollback: ${item}`).sort());
    }
  }
  return report;
}

module.exports = { COMPLETENESS_STATUSES, commitWrites, runMutation };
