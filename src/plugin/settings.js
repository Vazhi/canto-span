"use strict";

const BLOCK_CLASS = "canto-study-block canto-span-block";
const GLOBAL_COLOR_ACCESSIBILITY_CLASS = "canto-global-color-accessibility-enabled";
const GLOBAL_DIAGNOSTICS_CLASS = "canto-global-diagnostics-enabled";
const GLOBAL_DIAGNOSTICS_EXPANDED_CLASS = "canto-global-diagnostics-expanded";

const ROLE_COLOR_SETTINGS = require("../runtime-resources/presentation/role-colors");
const DEFAULT_ROLE_COLORS = Object.fromEntries(
  ROLE_COLOR_SETTINGS.map((role) => [role.key, role.defaultColor])
);

const DEFAULT_SETTINGS = {
  showDiagnostics: true,
  expandDiagnostics: false,
  showColorAccessibilityMarkers: false,
  roleColors: { ...DEFAULT_ROLE_COLORS },
};

function normalizeHexColor(value) {
  const raw = String(value || "").trim();
  const short = raw.match(/^#([0-9a-f]{3})$/i);
  if (short) {
    return `#${short[1].split("").map((ch) => ch + ch).join("")}`.toUpperCase();
  }
  const long = raw.match(/^#([0-9a-f]{6})$/i);
  return long ? `#${long[1]}`.toUpperCase() : "";
}

function getMergedRoleColors(settings) {
  const userColors = settings && settings.roleColors && typeof settings.roleColors === "object"
    ? settings.roleColors
    : {};
  const merged = { ...DEFAULT_ROLE_COLORS };
  for (const role of ROLE_COLOR_SETTINGS) {
    let normalized = normalizeHexColor(userColors[role.key]);
    merged[role.key] = normalized || role.defaultColor;
  }
  return merged;
}


module.exports = {
  BLOCK_CLASS,
  GLOBAL_COLOR_ACCESSIBILITY_CLASS,
  GLOBAL_DIAGNOSTICS_CLASS,
  GLOBAL_DIAGNOSTICS_EXPANDED_CLASS,
  ROLE_COLOR_SETTINGS,
  DEFAULT_ROLE_COLORS,
  DEFAULT_SETTINGS,
  normalizeHexColor,
  getMergedRoleColors,
};
