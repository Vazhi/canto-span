"use strict";

const fs = require("fs");
const path = require("path");
const { isDeepStrictEqual } = require("util");

const EXPLICIT_GAP_STATUSES = new Set(["unresolved", "intentional_hold", "not_applicable"]);

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function usableValue(value) {
  return value !== null && value !== undefined && value !== "";
}

function primitiveIdentity(value) {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}

function createJsonCollectionAdapter(config = {}) {
  if (!config.file) throw new Error("json collection adapter requires file");
  if (!config.keyField) throw new Error("json collection adapter requires keyField");

  const file = path.resolve(config.file);
  const keyField = config.keyField;
  const collectionKey = config.collectionKey || null;
  const requiredFields = [...new Set([keyField, ...(config.requiredFields || [])])];
  const lifecycleDimensions = (config.lifecycleDimensions || []).map((dimension) => ({
    name: dimension.name,
    field: dimension.field || dimension.name,
    statusField: dimension.statusField || null,
    targets: Array.isArray(dimension.targets) ? [...dimension.targets] : null,
  }));
  const fsImpl = config.fsImpl || fs;

  for (const dimension of lifecycleDimensions) {
    if (!dimension.name || typeof dimension.name !== "string") {
      throw new Error("lifecycle dimension requires a string name");
    }
  }

  function recordsFromDocument(document) {
    const records = collectionKey ? document && document[collectionKey] : document;
    if (!Array.isArray(records)) {
      throw new Error(collectionKey ? `expected array at ${collectionKey}` : "expected root JSON array");
    }
    return records;
  }

  function identity(record) {
    const value = record && record[keyField];
    return primitiveIdentity(value) ? String(value) : null;
  }

  function validateRecord(record, context) {
    const errors = [];
    if (!record || typeof record !== "object" || Array.isArray(record)) {
      return [`${context} must be an object`];
    }
    for (const field of requiredFields) {
      if (!hasOwn(record, field) || !usableValue(record[field])) {
        errors.push(`${context} missing required field ${field}`);
      }
    }
    if (hasOwn(record, keyField) && !primitiveIdentity(record[keyField])) {
      errors.push(`${context} field ${keyField} must be a string, number, or boolean`);
    }
    return errors;
  }

  function applicableDimensions(target) {
    return lifecycleDimensions.filter((dimension) => !dimension.targets || !target || dimension.targets.includes(target));
  }

  function validateExplicitStatuses(record, context, target) {
    const errors = [];
    for (const dimension of applicableDimensions(target)) {
      if (!dimension.statusField || !hasOwn(record, dimension.statusField)) continue;
      const explicitStatus = record[dimension.statusField];
      if (!EXPLICIT_GAP_STATUSES.has(explicitStatus)) {
        errors.push(`${context} field ${dimension.statusField} has invalid lifecycle status ${String(explicitStatus)}`);
      }
    }
    return errors;
  }

  const adapter = {
    id: config.id || "json-collection",

    load() {
      const document = JSON.parse(fsImpl.readFileSync(file, "utf8"));
      return { document, records: recordsFromDocument(document) };
    },

    validateCurrent(current) {
      const errors = [];
      const seen = new Set();
      for (let index = 0; index < current.records.length; index += 1) {
        const record = current.records[index];
        errors.push(...validateRecord(record, `current record ${index}`));
        const key = identity(record);
        if (key !== null) {
          if (seen.has(key)) errors.push(`current collection has duplicate ${keyField}: ${key}`);
          seen.add(key);
        }
      }
      return errors;
    },

    normalize(candidate, context = {}) {
      if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
        throw new Error("candidate must be an object");
      }
      if (!hasOwn(candidate, "operation") || !["add", "replace"].includes(candidate.operation)) {
        throw new Error("candidate.operation must be add or replace");
      }
      if (!candidate.record || typeof candidate.record !== "object" || Array.isArray(candidate.record)) {
        throw new Error("candidate.record must be an object");
      }
      const record = JSON.parse(JSON.stringify(candidate.record));
      const label = `input ${context.index == null ? "?" : context.index} record`;
      const errors = [
        ...validateRecord(record, label),
        ...validateExplicitStatuses(record, label, context.target),
      ];
      if (errors.length) throw new Error(errors.join("; "));
      return { operation: candidate.operation, record };
    },

    completenessDimensions({ target } = {}) {
      return applicableDimensions(target).map((dimension) => dimension.name);
    },

    assessCompleteness({ rawCandidate, normalizedCandidate, target }) {
      const rawRecord = rawCandidate && rawCandidate.record && typeof rawCandidate.record === "object"
        ? rawCandidate.record
        : {};
      const key = identity(normalizedCandidate.record);
      return applicableDimensions(target).map((dimension) => {
        const fieldProvided = hasOwn(rawRecord, dimension.field) && usableValue(rawRecord[dimension.field]);
        if (fieldProvided) {
          return { identity: key, dimension: dimension.name, status: "complete", provided: true };
        }
        if (dimension.statusField && hasOwn(rawRecord, dimension.statusField)) {
          const explicitStatus = rawRecord[dimension.statusField];
          return { identity: key, dimension: dimension.name, status: explicitStatus, provided: true };
        }
        return { identity: key, dimension: dimension.name, status: "unresolved", provided: false };
      });
    },

    plan({ current, candidates }) {
      const operations = [];
      const conflicts = [];
      const nextRecords = current.records.map((record) => JSON.parse(JSON.stringify(record)));
      const currentIndex = new Map();
      for (let index = 0; index < nextRecords.length; index += 1) {
        currentIndex.set(identity(nextRecords[index]), index);
      }

      const seenBatch = new Map();
      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        const key = identity(candidate.record);
        if (seenBatch.has(key)) {
          conflicts.push({
            code: "duplicate_in_batch",
            identity: key,
            first_index: seenBatch.get(key),
            second_index: index,
          });
          operations.push({ identity: key, action: "skipped" });
          continue;
        }
        seenBatch.set(key, index);

        const existingIndex = currentIndex.has(key) ? currentIndex.get(key) : null;
        const existing = existingIndex === null ? null : nextRecords[existingIndex];
        if (candidate.operation === "add") {
          if (existing === null) {
            nextRecords.push(candidate.record);
            currentIndex.set(key, nextRecords.length - 1);
            operations.push({ identity: key, action: "added" });
          } else if (isDeepStrictEqual(existing, candidate.record)) {
            operations.push({ identity: key, action: "already_present" });
          } else {
            conflicts.push({ code: "existing_record_differs", identity: key, index });
            operations.push({ identity: key, action: "skipped" });
          }
          continue;
        }

        if (existing === null) {
          conflicts.push({ code: "replace_target_missing", identity: key, index });
          operations.push({ identity: key, action: "skipped" });
        } else if (isDeepStrictEqual(existing, candidate.record)) {
          operations.push({ identity: key, action: "already_present" });
        } else {
          nextRecords[existingIndex] = candidate.record;
          operations.push({ identity: key, action: "updated" });
        }
      }

      let nextDocument;
      if (collectionKey) {
        nextDocument = JSON.parse(JSON.stringify(current.document));
        nextDocument[collectionKey] = nextRecords;
      } else {
        nextDocument = nextRecords;
      }
      return {
        nextState: { document: nextDocument, records: nextRecords },
        operations,
        conflicts,
      };
    },

    validateResult(nextState) {
      return adapter.validateCurrent(nextState);
    },

    serialize(nextState) {
      return [{ path: file, content: `${JSON.stringify(nextState.document, null, 2)}\n` }];
    },
  };

  return adapter;
}

module.exports = { createJsonCollectionAdapter };
