#!/usr/bin/env python3
"""One-shot v0.5.237 lexical reconciliation finalizer; remove in the same verified commit."""
from __future__ import annotations

import json
from pathlib import Path

VERSION_OLD = "0.5.236"
VERSION_NEW = "0.5.237"

# package.json
p = Path("package.json")
data = json.loads(p.read_text(encoding="utf-8"))
if data.get("version") not in {VERSION_OLD, VERSION_NEW}:
    raise RuntimeError(f"unexpected package version {data.get('version')}")
data["version"] = VERSION_NEW
p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

# package-lock.json
p = Path("package-lock.json")
data = json.loads(p.read_text(encoding="utf-8"))
if data.get("version") not in {VERSION_OLD, VERSION_NEW}:
    raise RuntimeError(f"unexpected package-lock version {data.get('version')}")
data["version"] = VERSION_NEW
root = data.setdefault("packages", {}).setdefault("", {})
if root.get("version") not in {VERSION_OLD, VERSION_NEW}:
    raise RuntimeError(f"unexpected package-lock root version {root.get('version')}")
root["version"] = VERSION_NEW
p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

# manifest.json
p = Path("manifest.json")
data = json.loads(p.read_text(encoding="utf-8"))
if data.get("version") not in {VERSION_OLD, VERSION_NEW}:
    raise RuntimeError(f"unexpected manifest version {data.get('version')}")
data["version"] = VERSION_NEW
data["description"] = (
    "v0.5.237 completes the final Cifu lexical reconciliation and the live top-2,000 "
    "vernacular functional-coverage audit, with independently verified readings and Cantonese-first evidence boundaries."
)
p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

# Runtime source version and release note.
p = Path("src/plugin-entry.js")
text = p.read_text(encoding="utf-8")
old_const = 'const CANTO_SPAN_RUNTIME_VERSION = "0.5.236";'
new_const = 'const CANTO_SPAN_RUNTIME_VERSION = "0.5.237";'
if old_const in text:
    text = text.replace(old_const, new_const, 1)
elif new_const not in text:
    raise RuntimeError("runtime version constant anchor missing")
release_note = (
    "// v0.5.237: completes reviewed Cifu ranks 1751–2000 and the external top-2,000 vernacular lexical reconciliation; "
    "all 1,972 in-scope CJK source items are functionally covered (1,407 exact + 565 compositional), with Standard Written Chinese 這 held outside Cantonese coverage and independently verified pronunciation/orthography refinements preserved.\n"
)
anchor = new_const + "\n"
if "// v0.5.237:" not in text:
    text = text.replace(anchor, anchor + release_note, 1)
p.write_text(text, encoding="utf-8")

# Canonical current state: version plus one bounded consequence paragraph.
p = Path("docs/current/PROJECT-STATE.md")
text = p.read_text(encoding="utf-8")
text = text.replace("| Runtime | v0.5.236 |", "| Runtime | v0.5.237 |", 1)
consequence = (
    "- v0.5.237 completes the final Cifu ranks 1751–2000 lexical reconciliation and the user-supplied live vernacular top-2,000 audit under the Cantonese-first source boundary: "
    "the external list contains 1,973 CJK-bearing items, of which 1,407 have exact runtime lexical entries and 565 are fully covered compositionally with readable Cantonese token analyses; "
    "the sole incomplete CJK source row is Standard Written Chinese `這`, which the source itself supplies without a Cantonese pronunciation, meaning, or example and remains an intentional non-ingestion; "
    "the audit also fills independently verified high-frequency lexical/orthographic gaps and preserves reading/function alternatives rather than flattening them, including spoken `爸爸 baa4 baa1`, `時間 si4 gaan3 / si4 gaan1`, `處理 cyu5 lei5 / cyu2 lei5`, and final-particle `嘛 maa5 / maa3`; "
    "construction identity/status, survey/native-panel state, corpus classifications, release-publication state, deployment state, and unrelated parser behavior remain unchanged;\n\n"
)
marker = "Current consequences include:\n\n"
if consequence not in text:
    if marker not in text:
        raise RuntimeError("PROJECT-STATE consequence anchor missing")
    text = text.replace(marker, marker + consequence, 1)
p.write_text(text, encoding="utf-8")

# Existing canonical lexical note: add one current audit section, not a new report.
p = Path("docs/research/LEXICAL-COVERAGE-TOP-2000.md")
text = p.read_text(encoding="utf-8")
section = '''\n## External vernacular top-2,000 functional audit — 2026-08-16\n\nThe user-supplied Google Sheet **Most Common Cantonese Words (Frequency List)** is now a bounded external discovery/pronunciation source in addition to the project-owned Cifu/HKCanCor/CantoMap inventories. It is not treated as a lexical whitelist or as sole authority for readings, senses, POS, or grammar.\n\nAfter normalizing the first 2,000 distinct non-tombstoned surfaces and checking the **effective runtime**, the final functional-coverage result is:\n\n- bounded source items: **2,000**;\n- CJK-bearing items: **1,973**;\n- exact runtime lexical coverage: **1,407**;\n- fully readable compositional runtime coverage: **565**;\n- in-scope Cantonese/CJK functional gaps: **0**;\n- intentional CJK hold: **1** — `這`, a Standard Written Chinese source row with no source pronunciation, meaning, or example;\n- non-CJK rows: **27**.\n\nThus the in-scope CJK set is **1,972 / 1,972 functionally covered**. Exact whole-string absence is not counted as a lexical failure when the runtime correctly decomposes the expression into readable Cantonese tokens. Productive strings such as negated VPs, pronoun clauses, classifier phrases, particle sequences, and transparent verb-object combinations remain compositional rather than being promoted merely to improve an exact-surface percentage.\n\nThe audit also exposed source errors and missing alternatives that were independently checked before runtime use. Representative corrections include `爸 baa4` rather than the Sheet's `ba1`, `簿 bou2` rather than `bou6`, ordinary spoken `爸爸 baa4 baa1` while preserving written `baa1 baa1`, `時間 si4 gaan3 / si4 gaan1`, `處理 cyu5 lei5 / cyu2 lei5`, and final-particle `嘛 maa5 / maa3`. Multi-reading and polyfunctional items remain explicit analyses rather than collapsed defaults.\n'''
if "## External vernacular top-2,000 functional audit — 2026-08-16" not in text:
    text = text.rstrip() + "\n" + section + "\n"
p.write_text(text, encoding="utf-8")
