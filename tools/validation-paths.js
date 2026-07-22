"use strict";

const fs = require("fs");
const path = require("path");

function currentValidationDir(root) {
  const dir = path.join(root, "validation", "current");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function currentValidationPath(root, filename) {
  return path.join(currentValidationDir(root), filename);
}

module.exports = { currentValidationDir, currentValidationPath };
