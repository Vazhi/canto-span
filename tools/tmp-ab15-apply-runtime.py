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
old = '''  {
    type: "OvertHeadDemonstrativeClassifierNP",
    label: "NP",
    template: ["demonstrative!", "classifier!", "head_noun!"],
    template_family: "generative_template",
    constraints: {
      slot_must_not_have_slots: {
        demonstrative: ["quantity", "wh_determiner", "di_determiner"],
        classifier: ["quantity", "wh_determiner", "di_determiner"],
        head_noun: ["quantity", "classifier", "wh_determiner", "di_determiner"]
      }
    },
    note: "Bounded overt-head Cantonese demonstrative + classifier + complete nominal head phrase. Requires all three visible components and inserts no hidden numeral or noun."
  },
'''
new = '''  {
    type: "OvertHeadDemonstrativeClassifierNP",
    label: "NP",
    template: ["demonstrative!", "classifier!", "head_noun!"],
    template_family: "generative_template",
    constraints: {
      slot_must_not_have_slots: {
        demonstrative: ["quantity", "wh_determiner", "di_determiner"],
        classifier: ["quantity", "wh_determiner", "di_determiner"],
        head_noun: ["quantity", "classifier", "wh_determiner", "di_determiner"]
      }
    },
    np_subtype: "demonstrative_classifier_overt_head_no_numeral",
    not_claims: ["not_hidden_numeral", "not_headless_np", "not_quantified_classifier_np", "not_modifier_bearing_np"],
    note: "Bounded overt-head Cantonese demonstrative + classifier + complete nominal head phrase. Requires all three visible components and inserts no hidden numeral or noun."
  },
  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative!", "quantified_classifier_np!"],
    template_family: "generative_template",
    output_slots: ["modified_np", "np", "object", "topic", "demonstrative", "quantity", "classifier", "head_noun"],
    np_subtype: "demonstrative_quantified_classifier_np",
    not_claims: ["not_AB15", "not_hidden_numeral", "not_erased_quantity"],
    note: "Transparent demonstrative plus an overt quantified-classifier NP sibling; preserves the numeral, classifier, and nominal head outside AB15."
  },
  {
    type: "ClassifierObjectNP",
    label: "CL-NP",
    template: ["classifier!", "head_noun!"],
    template_family: "generative_template",
    constraints: {
      slot_must_not_have_slots: {
        classifier: ["quantity", "demonstrative", "wh_determiner", "di_determiner"],
        head_noun: ["quantity", "classifier", "demonstrative", "wh_determiner", "di_determiner"]
      }
    },
    output_slots: ["classifier_object_np", "np", "object", "topic", "classifier", "head_noun"],
    np_subtype: "bare_classifier_noun_np",
    not_claims: ["not_AB15", "not_hidden_demonstrative", "not_hidden_numeral"],
    note: "Bare classifier plus overt noun sibling with no demonstrative or numeral insertion."
  },
'''
if old not in text:
    raise SystemExit("AB15 template block not found")
text = text.replace(old, new, 1)
marker = '''  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative?", "classifier?", "modifier?", "verb_modifier?", "nominal_linker?", "modifier?", "head_noun!"],
'''
specific = '''  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative!", "classifier!", "modifier!", "nominal_linker!", "modifier!", "head_noun!"],
    template_family: "generative_template",
    output_slots: ["modified_np", "np", "object", "topic", "demonstrative", "classifier", "modifier", "nominal_linker", "head_noun"],
    np_subtype: "demonstrative_classifier_modifier_np",
    not_claims: ["not_AB15", "not_erased_modifier", "not_erased_nominal_linker"],
    role_overrides: {
      nominal_linker: { label: "particle", syntax: "nominal_linker associative_linker", slots: ["nominal_linker"], note: "Nominal linker inside a transparent modified noun phrase." }
    },
    note: "Demonstrative + classifier + modifier + linker + nominal modifier + head noun; preserves every overt component."
  },
  {
    type: "ModifiedNP",
    label: "NP",
    template: ["demonstrative!", "classifier!", "modifier!", "nominal_linker!", "head_noun!"],
    template_family: "generative_template",
    output_slots: ["modified_np", "np", "object", "topic", "demonstrative", "classifier", "modifier", "nominal_linker", "head_noun"],
    np_subtype: "demonstrative_classifier_modifier_np",
    not_claims: ["not_AB15", "not_erased_modifier", "not_erased_nominal_linker"],
    role_overrides: {
      nominal_linker: { label: "particle", syntax: "nominal_linker associative_linker", slots: ["nominal_linker"], note: "Nominal linker inside a transparent modified noun phrase." }
    },
    note: "Demonstrative + classifier + modifier + linker + head noun; preserves every overt component."
  },
''' + marker
if marker not in text:
    raise SystemExit("ModifiedNP insertion point not found")
templates.write_text(text.replace(marker, specific, 1), encoding="utf-8")

plugin = ROOT / "src/plugin-entry.js"
replace_once(plugin, 'const CANTO_SPAN_RUNTIME_VERSION = "0.5.217";\n', 'const CANTO_SPAN_RUNTIME_VERSION = "0.5.218";\n// v0.5.218: separates AB15 from numeral-bearing, headless, bare-classifier, missing-classifier, and modifier-bearing siblings.\n')

for name in ["package.json", "package-lock.json", "manifest.json"]:
    path = ROOT / name
    data = json.loads(path.read_text(encoding="utf-8"))
    if name == "package-lock.json":
        data["version"] = "0.5.218"
        data["packages"][""]["version"] = "0.5.218"
    else:
        data["version"] = "0.5.218"
        if name == "manifest.json":
            data["description"] = "v0.5.218 separates AB15 from numeral-bearing, headless, bare-classifier, missing-classifier, and modifier-bearing NP profiles."
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
replace_once(ROOT / "docs/current/PROJECT-STATE.md", "| Runtime | v0.5.217 |", "| Runtime | v0.5.218 |")
