#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NOTE = ROOT / "grammar/research_pending/OvertHeadDemonstrativeClassifierNP.md"
SPEC = ROOT / "tests/constructions/OvertHeadDemonstrativeClassifierNP.json"

spec = json.loads(SPEC.read_text(encoding="utf-8"))
coverage = spec["coverage"]
text = NOTE.read_text(encoding="utf-8")
front, separator, _body = text.partition("\n---\n")
if not separator or not front.startswith("---\n"):
    raise SystemExit("AB15 note frontmatter missing")

updates = {
    "title": '"AB15 DemonstrativeClassifierNounNP"',
    "status": '"research_pending"',
    "confidence": '"primary_source_supported_structural_boundaries_runtime_aligned"',
    "last_reviewed": '"2026-07-30"',
    "source_count": "7",
    "verified_source_count": "7",
    "negative_boundary_inventory_complete": "true",
    "code_document_reconciled": "true",
    "code_document_review_date": '"2026-07-30"',
    "current_standard_reaudit_complete": "true",
    "source_verification_file": '"docs/research/AB15-CLASSIFIER-NP-PRIMARY-SOURCE-LEDGER-R1.tsv"',
    "standard_positive_test_count": str(coverage["positive_case_count"]),
    "standard_boundary_test_count": str(coverage["boundary_case_count"]),
    "standard_implementation_probe_count": str(coverage["implementation_probe_count"]),
    "standard_executable_test_count": str(coverage["executable_case_count"]),
    "source_ids": '["SRC-BOND-SIO-2024-CLASSIFIERS", "SRC-CHENG-SYBESMA-2014-NP-STRUCTURE", "SRC-MATTHEWS-YIP-COMPREHENSIVE-CH6", "SRC-XIA-2025-CLASSIFIERS", "SRC-TSE-LI-LEUNG-2007-CLASSIFIER-ACQUISITION", "SRC-ERBAUGH-2013-CLASSIFIER-DISCOURSE", "SRC-NAGY-LO-2019-CANTONESE-CLASSIFIERS"]',
    "workflow_state": '"active"',
    "workflow_priority": "2",
    "workflow_reason": '"structural_source_audit_complete_panel_and_item_level_choice_evidence_pending"',
    "accepted_fixtures": str(coverage["positive_case_count"]),
}

lines = front.splitlines()
keys = {line.partition(":")[0] for line in lines if ":" in line}
insert_after = next(i for i, line in enumerate(lines) if line.startswith("construction:"))
identity_lines = [
    'construction_uuid: "4f6df953-62d1-5036-80b3-40bc8f02937e"',
    'construction_code: "AB15"',
    'canonical_name: "DemonstrativeClassifierNounNP"',
    'legacy_runtime_label: "OvertHeadDemonstrativeClassifierNP"',
]
for value in reversed(identity_lines):
    if value.partition(":")[0] not in keys:
        lines.insert(insert_after + 1, value)

seen = set()
for index, line in enumerate(lines):
    key, marker, _value = line.partition(":")
    if marker and key in updates:
        lines[index] = f"{key}: {updates[key]}"
        seen.add(key)

missing = [key for key in updates if key not in seen and key not in {line.partition(":")[0] for line in lines if ":" in line}]
if missing:
    gate_index = next((i for i, line in enumerate(lines) if line.startswith("promotion_gate_version:")), len(lines) - 1)
    for key in missing:
        gate_index += 1
        lines.insert(gate_index, f"{key}: {updates[key]}")

body = '''
# AB15 DemonstrativeClassifierNounNP

## Canonical identity

- Construction UUID: `4f6df953-62d1-5036-80b3-40bc8f02937e`
- Permanent identity: `AB15 DemonstrativeClassifierNounNP`
- Legacy runtime label: `OvertHeadDemonstrativeClassifierNP`
- Linguistic status: `research_pending` (unchanged)

## Plain-language claim

Primary sources support a narrow no-numeral Cantonese noun-phrase profile with an overt demonstrative, an overt classifier, and an overt nominal head. The runtime may represent exactly those visible components as AB15. It must not insert a hidden numeral or noun, delete an overt numeral, absorb a modifier-bearing phrase into AB15, or infer item-level classifier compatibility from this structural template.

A source analysis assigning semantic cardinality one does not license an unpronounced numeral in the parser tree.

## Verified source audit

The proposition-level ledger is `docs/research/AB15-CLASSIFIER-NP-PRIMARY-SOURCE-LEDGER-R1.tsv`. The accepted synthesis is `docs/research/AB15-DEMONSTRATIVE-CLASSIFIER-NOUN-SCOPE-R1.md`.

Seven verified source records support the structural core and its limits:

- Bond and Sio distinguish D-(X)-C-N, X-C-N, and C-N profiles.
- Cheng and Sybesma state the unmarked Dem–Numeral–Classifier–Modifier–N order, permit numeral omission after a demonstrative, require an overt classifier in the ordinary headed profile, and treat noun ellipsis separately.
- Matthews and Yip directly attest multiple no-numeral Dem-CL-N examples.
- Xia supports a Cantonese classifier/measure distinction only at official abstract and repository-metadata level in the current review; full-PDF locators remain unavailable, so no individual lexeme is classified from that abstract.
- Tse, Erbaugh, and Nagy and Lo document general-classifier use, alternatives, and population or discourse variation. These findings rule out treating the bounded runtime compatibility table as a universal grammaticality table.

## Structural matrix

| Surface/profile | Runtime disposition |
|---|---|
| `呢本書`, `嗰間餐廳` | direct AB15: overt Dem + CL + N, no overt numeral |
| `呢三本書` | demonstrative plus an overt `QuantifiedClassifierNP` sibling; numeral preserved |
| `呢個` | headless demonstrative-classifier sibling; no hidden noun |
| `本書` | bare `ClassifierObjectNP` sibling; no hidden demonstrative or numeral |
| `三本書` | `QuantifiedClassifierNP` sibling |
| `呢書` | outside AB15; no hidden-classifier repair |
| `嗰間新開嘅意大利餐廳` | modifier-bearing `ModifiedNP`; demonstrative, classifier, modifier, `嘅`, nominal modifier, and head noun preserved |

Classifier versus measure-word typing and item-level classifier–noun choice remain separate evidence questions. Absence from the current compatibility table is not categorical ungrammaticality.

## Implementation state

- Direct AB15 records subtype `demonstrative_classifier_overt_head_no_numeral`.
- The numeral-bearing wrapper records subtype `demonstrative_quantified_classifier_np` and preserves its nested quantified-classifier structure.
- Bare classifier–noun material records subtype `bare_classifier_noun_np` rather than the generic modified-NP fallback.
- Modifier-bearing demonstrative-classifier NPs record subtype `demonstrative_classifier_modifier_np` and preserve every overt component.
- Missing-classifier strings remain outside AB15 with no repair.
- The twelve-rule unit-word evidence model and classifier-head compatibility arrays are unchanged.
- Parser tests establish implementation behavior only and add no independent linguistic evidence.

## Panel, corpus, and promotion limits

The single historical speaker record is not a clean role-neutral panel. The five older HKCanCor examples remain occurrence evidence, not a productivity estimate. No clean panel threshold, held-out gate, frequency claim, dialect-wide naturalness claim, or status promotion is established.

## Open questions

- Item-level classifier/measure and classifier–noun evidence remains with issue #334 or later accepted work.
- `呢啲魚`, `呢班人`, alternative classifiers, mensural profiles, and discourse-conditioned choices require separate item/profile analysis.
- Clean role-neutral panel evidence and held-out validation remain incomplete.
'''

NOTE.write_text("\n".join(lines) + "\n---\n" + body, encoding="utf-8")
