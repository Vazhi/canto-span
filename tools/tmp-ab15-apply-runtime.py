#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def replace_once(path, old, new):
    text = path.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected one replacement, found {count}")
    path.write_text(text.replace(old, new, 1), encoding="utf-8")


templates = ROOT / "src/runtime-resources/grammar/templates/category-span-templates.js"
text = templates.read_text(encoding="utf-8")
marker = '''  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative?", "classifier?", "modifier?", "verb_modifier?", "nominal_linker?", "modifier?", "head_noun!"],
'''

# Add only the missing transparent modifier-bearing compositions. Do not retype
# bare CL+N or quantified NPs and do not alter the existing AB15 template.
specific = '''  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative!", "classifier!", "verb_modifier!", "nominal_linker!", "modifier!", "head_noun!"],
    template_family: "generative_template",
    output_slots: ["modified_np", "np", "object", "topic", "demonstrative", "classifier", "verb_modifier", "modifier", "nominal_linker", "head_noun"],
    note: "Transparent demonstrative + classifier + verbal modifier + linker + nominal modifier + head noun. Preserves every overt component and remains outside AB15."
  },
  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative!", "classifier!", "modifier!", "nominal_linker!", "modifier!", "head_noun!"],
    template_family: "generative_template",
    output_slots: ["modified_np", "np", "object", "topic", "demonstrative", "classifier", "modifier", "nominal_linker", "head_noun"],
    note: "Transparent demonstrative + classifier + modifier + linker + nominal modifier + head noun. Preserves every overt component and remains outside AB15."
  },
  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative!", "classifier!", "verb_modifier!", "nominal_linker!", "head_noun!"],
    template_family: "generative_template",
    output_slots: ["modified_np", "np", "object", "topic", "demonstrative", "classifier", "verb_modifier", "nominal_linker", "head_noun"],
    note: "Transparent demonstrative + classifier + verbal modifier + linker + head noun. Preserves every overt component and remains outside AB15."
  },
  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative!", "classifier!", "modifier!", "nominal_linker!", "head_noun!"],
    template_family: "generative_template",
    output_slots: ["modified_np", "np", "object", "topic", "demonstrative", "classifier", "modifier", "nominal_linker", "head_noun"],
    note: "Transparent demonstrative + classifier + modifier + linker + head noun. Preserves every overt component and remains outside AB15."
  },
''' + marker
if marker not in text:
    raise SystemExit("ModifiedNP insertion point not found")
templates.write_text(text.replace(marker, specific, 1), encoding="utf-8")

plugin = ROOT / "src/plugin-entry.js"
replace_once(
    plugin,
    'const CANTO_SPAN_RUNTIME_VERSION = "0.5.217";\n',
    'const CANTO_SPAN_RUNTIME_VERSION = "0.5.218";\n// v0.5.218: closes AB15 structural boundaries with transparent modifier-bearing NP composition while preserving established bare and quantified NP behavior.\n',
)

for name in ["package.json", "package-lock.json", "manifest.json"]:
    path = ROOT / name
    data = json.loads(path.read_text(encoding="utf-8"))
    if name == "package-lock.json":
        data["version"] = "0.5.218"
        data["packages"][""]["version"] = "0.5.218"
    else:
        data["version"] = "0.5.218"
        if name == "manifest.json":
            data["description"] = "v0.5.218 closes AB15 structural boundaries and preserves transparent modifier-bearing noun phrases."
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

replace_once(ROOT / "docs/current/PROJECT-STATE.md", "| Runtime | v0.5.217 |", "| Runtime | v0.5.218 |")
