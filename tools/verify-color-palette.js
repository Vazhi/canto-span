#!/usr/bin/env node
/*
 * Canto Span perceptual color verifier.
 * No dependencies. Computes WCAG contrast, CIE L*a*b*, CIEDE2000, OKLCH,
 * full-severity Machado-style matrix simulations for protanopia,
 * deuteranopia, and tritanopia, plus grayscale/luminance conflicts.
 * v0.5.4 uses a brighter neon-forward palette; the previous elevated
 * half-brightness target is intentionally removed.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CSS_PATH = path.join(ROOT, "styles.css");
const css = fs.readFileSync(CSS_PATH, "utf8");

const ROLE_ORDER = ["who", "doing", "what", "where", "when", "why", "how", "like", "measure_word", "particle", "func"];
const LEGACY_ALIASES = { measure_word: "measure-word" };
const BACKGROUND = "#0B1020";
const REQUIRED_CONTRAST = 4.5;
const PREFERRED_CONTRAST = 5.0;
const DISTANCE_WARN_DE00 = 10;
const GRAYSCALE_WARN_LSTAR = 12;
const ACCESSIBILITY_MARKERS = {
  who: "left_bar_pink",
  doing: "solid_underline_red",
  what: "bottom_border_cyan",
  where: "low_highlight_blue",
  when: "dashed_underline_yellow",
  why: "top_border_violet",
  how: "double_underline_orange",
  like: "wavy_underline_green",
  measure_word: "dotted_underline_purple",
  particle: "dotted_overline_gray",
  func: "thin_outline_white",
};

function extractBlock(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(?:^|\\n)\\s*${escaped}\\s*\\{([\\s\\S]*?)\\}`, "gm");
  return [...css.matchAll(re)].map((m) => m[1]).join("\n");
}
function variableMap(block) {
  const map = {};
  for (const m of block.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/gi)) map[m[1]] = m[2].trim();
  return map;
}
function resolveVar(value, vars, depth = 0) {
  if (depth > 12) return value;
  const trimmed = String(value || "").trim();
  if (/^#[0-9a-f]{6}$/i.test(trimmed)) return trimmed.toUpperCase();
  const varMatch = trimmed.match(/^var\(--([^,\)]+)(?:,\s*([^\)]+))?\)$/);
  if (varMatch) {
    const key = varMatch[1];
    const fallback = varMatch[2];
    if (vars[key]) return resolveVar(vars[key], vars, depth + 1);
    if (fallback) return resolveVar(fallback, vars, depth + 1);
  }
  return trimmed;
}
function readPalette() {
  const vars = variableMap(extractBlock(".canto-study-block"));
  const out = {};
  for (const role of ROLE_ORDER) {
    const suffix = LEGACY_ALIASES[role] || role;
    out[role] = resolveVar(vars[`canto-color-${suffix}`], vars);
  }
  return out;
}
function hasThemeLightPaletteOverride() {
  const block = extractBlock(".theme-light .canto-study-block");
  return /--canto-color-/.test(block);
}
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}
function srgbToLinear(c) { return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }
function relativeLuminance(rgb) {
  const [r, g, b] = rgb.map(srgbToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrastRatio(fg, bg) {
  const a = relativeLuminance(hexToRgb(fg));
  const b = relativeLuminance(hexToRgb(bg));
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
function rgbToXyz(rgb) {
  const [r, g, b] = rgb.map(srgbToLinear);
  return [
    0.4124564 * r + 0.3575761 * g + 0.1804375 * b,
    0.2126729 * r + 0.7151522 * g + 0.0721750 * b,
    0.0193339 * r + 0.1191920 * g + 0.9503041 * b,
  ];
}
function xyzToLab([x, y, z]) {
  const ref = [0.95047, 1.0, 1.08883];
  const f = (t) => t > 216 / 24389 ? Math.cbrt(t) : ((24389 / 27) * t + 16) / 116;
  const fx = f(x / ref[0]);
  const fy = f(y / ref[1]);
  const fz = f(z / ref[2]);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}
function rgbToLab(rgb) { return xyzToLab(rgbToXyz(rgb)); }
function rgbToOklab(rgb) {
  const [r, g, b] = rgb.map(srgbToLinear);
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l_ = Math.cbrt(l); const m_ = Math.cbrt(m); const s_ = Math.cbrt(s);
  return [
    0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
  ];
}
function rgbToOklch(rgb) {
  const [L, a, b] = rgbToOklab(rgb);
  const C = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a) * 180 / Math.PI;
  if (h < 0) h += 360;
  return [L, C, h];
}
function ciede2000(lab1, lab2) {
  const [L1, a1, b1] = lab1; const [L2, a2, b2] = lab2;
  const avgL = (L1 + L2) / 2;
  const C1 = Math.sqrt(a1 * a1 + b1 * b1); const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  const avgC = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(avgC ** 7 / (avgC ** 7 + 25 ** 7)));
  const a1p = (1 + G) * a1; const a2p = (1 + G) * a2;
  const C1p = Math.sqrt(a1p * a1p + b1 * b1); const C2p = Math.sqrt(a2p * a2p + b2 * b2);
  const hp = (a, b) => {
    if (a === 0 && b === 0) return 0;
    const h = Math.atan2(b, a) * 180 / Math.PI;
    return h < 0 ? h + 360 : h;
  };
  const h1p = hp(a1p, b1); const h2p = hp(a2p, b2);
  const dLp = L2 - L1; const dCp = C2p - C1p;
  let dhp = 0;
  if (C1p * C2p !== 0) {
    let dh = h2p - h1p;
    if (dh > 180) dh -= 360;
    if (dh < -180) dh += 360;
    dhp = dh;
  }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp / 2) * Math.PI / 180);
  const avgLp = avgL; const avgCp = (C1p + C2p) / 2;
  let avghp;
  if (C1p * C2p === 0) avghp = h1p + h2p;
  else if (Math.abs(h1p - h2p) > 180) avghp = (h1p + h2p + (h1p + h2p < 360 ? 360 : -360)) / 2;
  else avghp = (h1p + h2p) / 2;
  const T = 1 - 0.17 * Math.cos((avghp - 30) * Math.PI / 180) + 0.24 * Math.cos(2 * avghp * Math.PI / 180) + 0.32 * Math.cos((3 * avghp + 6) * Math.PI / 180) - 0.20 * Math.cos((4 * avghp - 63) * Math.PI / 180);
  const dtheta = 30 * Math.exp(-(((avghp - 275) / 25) ** 2));
  const Rc = 2 * Math.sqrt(avgCp ** 7 / (avgCp ** 7 + 25 ** 7));
  const Sl = 1 + (0.015 * ((avgLp - 50) ** 2)) / Math.sqrt(20 + ((avgLp - 50) ** 2));
  const Sc = 1 + 0.045 * avgCp;
  const Sh = 1 + 0.015 * avgCp * T;
  const Rt = -Math.sin(2 * dtheta * Math.PI / 180) * Rc;
  return Math.sqrt((dLp / Sl) ** 2 + (dCp / Sc) ** 2 + (dHp / Sh) ** 2 + Rt * (dCp / Sc) * (dHp / Sh));
}
const CVD = {
  protanopia: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deuteranopia: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
  tritanopia: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]],
};
function simulate(rgb, mode) {
  if (!mode) return rgb;
  const m = CVD[mode];
  return m.map((row) => Math.max(0, Math.min(1, row[0] * rgb[0] + row[1] * rgb[1] + row[2] * rgb[2])));
}
function pairwise(palette) {
  const rows = [];
  for (let i = 0; i < ROLE_ORDER.length; i++) {
    for (let j = i + 1; j < ROLE_ORDER.length; j++) {
      const a = ROLE_ORDER[i], b = ROLE_ORDER[j];
      const rgbA = hexToRgb(palette[a]); const rgbB = hexToRgb(palette[b]);
      const normal = ciede2000(rgbToLab(rgbA), rgbToLab(rgbB));
      const protanopia = ciede2000(rgbToLab(simulate(rgbA, "protanopia")), rgbToLab(simulate(rgbB, "protanopia")));
      const deuteranopia = ciede2000(rgbToLab(simulate(rgbA, "deuteranopia")), rgbToLab(simulate(rgbB, "deuteranopia")));
      const tritanopia = ciede2000(rgbToLab(simulate(rgbA, "tritanopia")), rgbToLab(simulate(rgbB, "tritanopia")));
      const grayL = Math.abs(rgbToLab(rgbA)[0] - rgbToLab(rgbB)[0]);
      const minCvd = Math.min(protanopia, deuteranopia, tritanopia);
      const markerMitigated = ACCESSIBILITY_MARKERS[a] !== ACCESSIBILITY_MARKERS[b];
      rows.push({ a, b, normal, protanopia, deuteranopia, tritanopia, minCvd, grayL, markerMitigated });
    }
  }
  return rows;
}
function categoryRows(palette) {
  const pairs = pairwise(palette);
  return ROLE_ORDER.map((role) => {
    const rgb = hexToRgb(palette[role]);
    const lab = rgbToLab(rgb); const oklch = rgbToOklch(rgb);
    const nearest = pairs.filter((p) => p.a === role || p.b === role).sort((x, y) => x.normal - y.normal)[0];
    const nearestCvd = pairs.filter((p) => p.a === role || p.b === role).sort((x, y) => x.minCvd - y.minCvd)[0];
    const nearestGray = pairs.filter((p) => p.a === role || p.b === role).sort((x, y) => x.grayL - y.grayL)[0];
    const contrast = contrastRatio(palette[role], BACKGROUND);
    return {
      theme: "standard_dark_block",
      role,
      selector: `.canto-token.cs-${role}`,
      hex: palette[role],
      oklch: `oklch(${(oklch[0] * 100).toFixed(1)}% ${oklch[1].toFixed(3)} ${oklch[2].toFixed(1)})`,
      lab: `Lab(${lab[0].toFixed(1)} ${lab[1].toFixed(1)} ${lab[2].toFixed(1)})`,
      contrast: Number(contrast.toFixed(2)),
      contrastStatus: contrast >= REQUIRED_CONTRAST ? (contrast >= PREFERRED_CONTRAST ? "PASS_PREFERRED" : "PASS_MINIMUM") : "FAIL",
      nearestNormal: `${nearest.a === role ? nearest.b : nearest.a} ΔE00=${nearest.normal.toFixed(1)}`,
      nearestCvd: `${nearestCvd.a === role ? nearestCvd.b : nearestCvd.a} minCVD=${nearestCvd.minCvd.toFixed(1)}`,
      nearestGray: `${nearestGray.a === role ? nearestGray.b : nearestGray.a} ΔL*=${nearestGray.grayL.toFixed(1)}`,
      accessibilityMarker: ACCESSIBILITY_MARKERS[role],
    };
  });
}
function markdownTable(rows) {
  const header = "| theme | category | selector / variable | hex | OKLCH | Lab | contrast | nearest normal ΔE00 | CVD note | grayscale note | optional marker |\n|---|---|---|---|---|---|---:|---|---|---|---|";
  const body = rows.map((r) => `| ${r.theme} | ${r.role} | \`${r.selector}\` / \`--canto-color-${LEGACY_ALIASES[r.role] || r.role}\` | ${r.hex} | ${r.oklch} | ${r.lab} | ${r.contrast} ${r.contrastStatus} | ${r.nearestNormal} | ${r.nearestCvd} | ${r.nearestGray} | ${r.accessibilityMarker} |`).join("\n");
  return `${header}\n${body}`;
}
function summarize(palette) {
  const pairs = pairwise(palette);
  const normal = [...pairs].sort((a, b) => a.normal - b.normal)[0];
  const cvd = [...pairs].sort((a, b) => a.minCvd - b.minCvd)[0];
  const gray = [...pairs].sort((a, b) => a.grayL - b.grayL)[0];
  const contrastRows = categoryRows(palette);
  const contrastFails = contrastRows.filter((r) => r.contrastStatus === "FAIL");
  const contrastBelowPreferred = contrastRows.filter((r) => r.contrastStatus === "PASS_MINIMUM");
  const markerMitigatedCvd = pairs.filter((p) => p.minCvd < DISTANCE_WARN_DE00 && p.markerMitigated);
  const unmitigatedCvd = pairs.filter((p) => p.minCvd < DISTANCE_WARN_DE00 && !p.markerMitigated);
  const markerMitigatedGray = pairs.filter((p) => p.grayL < GRAYSCALE_WARN_LSTAR && p.markerMitigated);
  const unmitigatedGray = pairs.filter((p) => p.grayL < GRAYSCALE_WARN_LSTAR && !p.markerMitigated);
  return {
    theme: "standard_dark_block",
    background: BACKGROUND,
    minNormal: { pair: [normal.a, normal.b], deltaE00: Number(normal.normal.toFixed(2)) },
    minCvd: { pair: [cvd.a, cvd.b], deltaE00: Number(cvd.minCvd.toFixed(2)) },
    minGrayLstar: { pair: [gray.a, gray.b], deltaLstar: Number(gray.grayL.toFixed(2)) },
    contrastFails,
    contrastBelowPreferred,
    colorOnlyMode: "PASS_CONTRAST_WARN_CVD_GRAYSCALE_CONFLICTS",
    accessibilityMarkerMode: unmitigatedCvd.length || unmitigatedGray.length ? "FAIL_UNMITIGATED_CONFLICTS" : "PASS_WITH_OPTIONAL_NON_COLOR_MITIGATIONS",
    markerMitigatedCvdCount: markerMitigatedCvd.length,
    markerMitigatedGrayCount: markerMitigatedGray.length,
    unmitigatedCvd,
    unmitigatedGray,
    themeLightPaletteOverride: hasThemeLightPaletteOverride(),
  };
}
const palette = readPalette();
const rows = categoryRows(palette);
const summary = summarize(palette);
const report = {
  generatedAt: new Date().toISOString(),
  thresholds: { REQUIRED_CONTRAST, PREFERRED_CONTRAST, DISTANCE_WARN_DE00, GRAYSCALE_WARN_LSTAR },
  summaries: [summary],
  rows,
};

if (process.argv.includes("--json")) console.log(JSON.stringify(report, null, 2));
else if (process.argv.includes("--markdown")) console.log(markdownTable(rows));
else {
  console.log(JSON.stringify(report.summaries, null, 2));
  console.log("\nUse --markdown for the category table or --json for full data.");
}

if (
  summary.contrastFails.length ||
  summary.unmitigatedCvd.length ||
  summary.unmitigatedGray.length ||
  summary.themeLightPaletteOverride
) process.exitCode = 1;
