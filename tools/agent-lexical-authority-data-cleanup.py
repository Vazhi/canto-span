#!/usr/bin/env python3
from pathlib import Path
import csv, io, json, re

ROOT = Path(__file__).resolve().parents[1]

def read(rel): return (ROOT / rel).read_text(encoding="utf-8")
def write(rel, text): (ROOT / rel).write_text(text, encoding="utf-8")
def require(cond, msg):
    if not cond: raise SystemExit(msg)

# 1. Freeze the already cross-validated Rime authority map. Future discovery
# edits must not auto-promote into accepted runtime readings.
rel = "src/runtime-resources/lexicon/token-lexicon/vernacular-component-coverage.js"
text = read(rel)
text = text.replace(
'''// Neutral component-level Cantonese pronunciation coverage surfaced by the external
// “Most Common Cantonese Words (Frequency List)” Google Sheet. The bounded parser-gap
// audit exposed these CJK components without Jyutping; the source supplies one simple
// unambiguous Jyutping reading for each. No frequency, rank, gloss, POS, grammar
// category, or phrase atomicity is imported.''',
'''// Component-level gaps were discovered with the external “Most Common Cantonese
// Words (Frequency List)” Google Sheet. Runtime readings below are a frozen accepted
// authority map cross-validated against the pinned Rime-Cantonese character dictionary;
// discovery-source values do not auto-promote when this file is edited.''')
require('const DISCOVERY_READINGS = Object.freeze({' in text, "discovery map anchor missing")
text = text.replace('const DISCOVERY_READINGS = Object.freeze({', 'const RIME_ACCEPTED_READINGS = Object.freeze({', 1)
# Normalize the two candidate transcription mismatches that Rime resolved.
text = text.replace('  "傷": "seung1",', '  "傷": "soeng1",', 1)
text = text.replace('  "嫁": "ga3",', '  "嫁": "gaa3",', 1)
# Remove rows that are not dictionary-character matches. 爸 stays candidate-only;
# the other four are independently reviewed orthographic substitutions.
for surface in ["既", "爸", "广", "哂", "跙"]:
    text, n = re.subn(rf'^  "{re.escape(surface)}": .*?\n', '', text, count=1, flags=re.M)
    require(n == 1, f"expected authority-map row for {surface}")
# Remove comments that belonged to removed variant rows if left standalone.
text = text.replace(' // recurrent vernacular corpus spelling of 晒 in exhaustive/completive contexts', '')
text = text.replace(' // recurrent corpus spelling used with 走 “leave/go” syntax', '')
# Remove the dynamic derivation/override block: accepted authority must be literal/frozen.
text, n = re.subn(r'''\nconst RIME_NORMALIZED_OVERRIDES = Object\.freeze\(\{.*?\}\);\n''', '\n', text, count=1, flags=re.S)
require(n == 1, "Rime override block missing")
text, n = re.subn(r'''\nconst RIME_ACCEPTED_READINGS = Object\.freeze\(Object\.fromEntries\(\n  Object\.entries\(DISCOVERY_READINGS\).*?\n\)\);\n''', '\n', text, count=1, flags=re.S)
require(n == 1, "dynamic accepted-reading derivation missing")
# DISCOVERY_READINGS is no longer a runtime/exported map; only unresolved candidates remain.
text = text.replace('  DISCOVERY_READINGS,\n', '')
write(rel, text)

# 2. Make neutral-fallback identity structural rather than prose-dependent. Reviewed
# promotions must continue to win after discovery notes are cleaned or rewritten.
rel = "src/runtime-resources/lexicon/token-lexicon/cifu-r1-250-reviewed.js"
text = read(rel)
old = '''function isNeutralFrequencyFallback(entry) {
  return Boolean(
    entry
      && entry.label === "lex"
      && entry.pos === "lexical_item"
      && entry.syntax === "lexical_item"
      && typeof entry.note === "string"
      && entry.note.includes("Exact surface retained as neutral lexical coverage")
  );
}'''
new = '''function isNeutralFrequencyFallback(entry) {
  return Boolean(
    entry
      && entry.label === "lex"
      && entry.pos === "lexical_item"
      && entry.syntax === "lexical_item"
  );
}'''
require(old in text, "neutral fallback detector anchor missing")
text = text.replace(old, new, 1)
write(rel, text)

# 3. Remove candidate pronunciation comparison from the project-owned common-core
# priority table while preserving all rows/rank/corpus evidence.
rel = "data/lexical-frequency/common-spoken-cantonese-core-2000.tsv"
raw = read(rel)
rows = list(csv.reader(io.StringIO(raw), delimiter='\t'))
require(len(rows) == 2001, f"common-core row count changed: {len(rows)-1}")
header = rows[0]
require('cifu_candidate_jyutping' in header, "candidate Jyutping column missing")
idx = header.index('cifu_candidate_jyutping')
new_rows = [row[:idx] + row[idx+1:] for row in rows]
out = io.StringIO()
csv.writer(out, delimiter='\t', lineterminator='\n').writerows(new_rows)
write(rel, out.getvalue())

# 4. Clarify the common-core source role: Cifu is frequency corroboration, not
# pronunciation/lexical authority or a source of runtime exclusions.
rel = "data/lexical-frequency/common-spoken-cantonese-core-2000.manifest.json"
data = json.loads(read(rel))
data['limitations'] = [
    "Corpus segmentation does not prove atomic lexicality, and atomicity is not a removal criterion in this task.",
    "Common compositional or constructional Cantonese surfaces remain valid priority evidence and are not deleted for being non-atomic.",
    "A surface outside this 2,000-item priority inventory is not absent from Cantonese; it is simply lower frequency under this ranking.",
    "Cifu definitions and Jyutping carry no independent lexical-semantic or pronunciation authority.",
    "Unsupported facts from any discovery source are simply not admitted to canonical runtime state; source-specific rejection taxonomies are not maintained.",
]
data['sources']['cifu_secondary']['role'] = "secondary rank/frequency corroboration only; not lexical, pronunciation, grammar, or parser authority"
write(rel, json.dumps(data, ensure_ascii=False, indent=2, sort_keys=True) + '\n')

# 5. Neutralize legacy fallback notes. Preserve surface, default fields and readings
# already adjudicated by the reviewed-band stack; remove imported gloss/status/source-
# reading narrative from learner/runtime notes.
rel = "src/runtime-resources/lexicon/token-lexicon/frequency-gap-fill-r7.js"
text = read(rel)
count = 0
lines = []
for line in text.splitlines(True):
    if 'Exact surface retained as neutral lexical coverage' in line and 'note: "' in line:
        line, n = re.subn(r'note: ".*?"(?= \}\],?$)', 'note: "Neutral exact-surface coverage from legacy frequency discovery; lexical semantics, pronunciation authority, and grammar are governed by reviewed runtime sources."', line)
        count += n
    lines.append(line)
require(count > 0, "no legacy fallback notes were neutralized")
write(rel, ''.join(lines))

# 6. Remove migration/batch wording from durable lexical behavior tests.
rel = "tests/tooling/lexicon/vernacular-component-coverage.test.js"
text = read(rel)
renames = {
  'test("strong source split batch fills only the three audited missing readings"': 'test("high-frequency particle and lexical reading splits remain explicit"',
  'test("verified bundled-reading batch adds seven missing Cantonese readings without replacing defaults"': 'test("polyfunctional single-character readings preserve reviewed defaults and alternatives"',
  'test("source-attested spelling variants inherit the canonical lexical analysis"': 'test("reviewed spelling variants inherit the canonical lexical analysis"',
  'test("independent pronunciation-quality batch preserves spoken defaults and supported variants"': 'test("independently supported pronunciation variants preserve spoken defaults"',
}
for old, new in renames.items():
    require(old in text, f"test-title anchor missing: {old}")
    text = text.replace(old, new, 1)
write(rel, text)

print(f"lexical authority data cleanup applied; neutralized {count} fallback notes")
