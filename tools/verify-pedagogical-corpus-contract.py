#!/usr/bin/env python3
from __future__ import annotations
import argparse
import csv
import json
from pathlib import Path
import sys

REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT))

from tools.pedagogical_corpus_contract import ContractError, verify_registry

def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-root", default=".")
    parser.add_argument("--registry", default="config/pedagogical-corpus-packages.json")
    args = parser.parse_args(argv)
    repo = Path(args.repo_root).resolve()
    registry = Path(args.registry)
    if not registry.is_absolute():
        registry = repo / registry
    try:
        report = verify_registry(repo, registry)
    except (ContractError, OSError, UnicodeDecodeError, csv.Error) as exc:
        sys.stderr.write(f"pedagogical corpus contract failed: {exc}\n")
        return 1
    sys.stdout.write(json.dumps(report, indent=2, ensure_ascii=False) + "\n")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
