#!/usr/bin/env python3
"""Generate or verify the frozen offline HKCanCor-to-UD POS map."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

EXPECTED_PYCANTONESE_VERSION = "5.0.0"
REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_OUTPUT = (
    REPO_ROOT / "data/lexical-pos/hkcancor-to-ud-pycantonese-5.0.0.json"
)


def build_artifact() -> dict[str, Any]:
    import pycantonese
    from pycantonese.pos_tagging import hkcancor_to_ud

    if pycantonese.__version__ != EXPECTED_PYCANTONESE_VERSION:
        raise RuntimeError(
            "HKCanCor-to-UD map generation is frozen to PyCantonese "
            f"{EXPECTED_PYCANTONESE_VERSION}; got {pycantonese.__version__}"
        )

    mapping = hkcancor_to_ud()
    if not isinstance(mapping, dict) or not mapping:
        raise RuntimeError("PyCantonese returned an invalid HKCanCor-to-UD mapping")
    if hkcancor_to_ud("__CANTO_SPAN_UNKNOWN_TAG__") != "X":
        raise RuntimeError("PyCantonese unknown-tag fallback is no longer X")

    normalized = {str(key): str(value) for key, value in sorted(mapping.items())}
    return {
        "schema": "canto-span-hkcancor-ud-map-v1",
        "source": {
            "project": "PyCantonese",
            "version": EXPECTED_PYCANTONESE_VERSION,
            "api": "pycantonese.pos_tagging.hkcancor_to_ud",
            "repository_tag": "v5.0.0",
            "mapping_source": "src/pycantonese/pos_tagging/hkcancor_to_ud.py",
            "punctuation_source": "src/pycantonese/_punctuation_marks.py",
        },
        "unknown_tag_fallback": "X",
        "entry_count": len(normalized),
        "map": normalized,
    }


def render_artifact() -> str:
    return json.dumps(build_artifact(), ensure_ascii=False, indent=2) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(
        description=(
            "Generate the checked-in offline HKCanCor-to-UD map from frozen "
            "PyCantonese 5.0.0, or verify that the committed artifact is current."
        )
    )
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()

    expected = render_artifact()
    output = args.output
    if args.check:
        if not output.exists():
            raise SystemExit(f"missing generated artifact: {output}")
        actual = output.read_text(encoding="utf-8")
        if actual != expected:
            raise SystemExit(f"stale generated artifact: {output}")
        print(f"verified {output}")
        return

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(expected, encoding="utf-8")
    print(f"wrote {output}")


if __name__ == "__main__":
    main()
