#!/usr/bin/env python3
"""Build an auditable common spoken Cantonese frequency core.

Primary evidence is direct word-token frequency in the frozen PyCantonese 5.0.0
HKCanCor and CantoMap corpora. The output is a frequency-priority candidate ledger,
not an automatic atomic-lexeme or POS decision.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import sys
import unicodedata
from collections import Counter
from pathlib import Path

PY_CANTONESE_VERSION = "5.0.0"
SCHEMA = "canto-span-common-spoken-cantonese-core-v1"
CORE_SIZE = 2000


def repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def contains_han(surface: str) -> bool:
    """Keep Cantonese/Chinese-script tokens; reject punctuation and Latin-only tokens."""
    for ch in surface:
        name = unicodedata.name(ch, "")
        if "CJK UNIFIED IDEOGRAPH" in name or "CJK COMPATIBILITY IDEOGRAPH" in name:
            return True
    return False


def load_cifu(path: Path):
    data = path.read_bytes()
    rows = list(csv.DictReader(io.StringIO(data.decode("utf-8")), delimiter="\t"))
    by_word = {row["word"]: row for row in rows}
    return by_word, sha256_bytes(data), len(rows)


def corpus_counts(corpus):
    words = [str(word).strip() for word in corpus.words()]
    counts = Counter(word for word in words if word and contains_han(word))
    return counts, len(words), sum(counts.values())


def build_outputs(cifu_path: Path):
    try:
        import pycantonese
    except ImportError as exc:
        raise RuntimeError("pycantonese is required for generation") from exc

    if pycantonese.__version__ != PY_CANTONESE_VERSION:
        raise RuntimeError(
            f"expected PyCantonese {PY_CANTONESE_VERSION}, got {pycantonese.__version__}"
        )

    hkcancor = pycantonese.hkcancor()
    cantomap = pycantonese.cantomap()
    hk_counts, hk_all_tokens, hk_han_tokens = corpus_counts(hkcancor)
    cm_counts, cm_all_tokens, cm_han_tokens = corpus_counts(cantomap)

    cifu, cifu_sha256, cifu_rows = load_cifu(cifu_path)

    candidates = []
    for surface in set(hk_counts) | set(cm_counts):
        hk_count = hk_counts.get(surface, 0)
        cm_count = cm_counts.get(surface, 0)
        hk_ppm = hk_count * 1_000_000.0 / hk_han_tokens
        cm_ppm = cm_count * 1_000_000.0 / cm_han_tokens
        # Equal corpus weight prevents HKCanCor/CantoMap size differences from deciding rank.
        combined_ppm = (hk_ppm + cm_ppm) / 2.0
        candidates.append(
            (
                surface,
                hk_count,
                cm_count,
                hk_ppm,
                cm_ppm,
                combined_ppm,
                int(hk_count > 0 and cm_count > 0),
            )
        )

    candidates.sort(
        key=lambda row: (-row[5], -row[6], -(row[1] + row[2]), row[0])
    )
    core = candidates[:CORE_SIZE]
    if len(core) != CORE_SIZE:
        raise RuntimeError(f"expected {CORE_SIZE} ranked surfaces, got {len(core)}")

    out = io.StringIO(newline="")
    fields = [
        "rank",
        "word",
        "hkcancor_count",
        "hkcancor_ppm",
        "cantomap_count",
        "cantomap_ppm",
        "combined_equal_corpus_ppm",
        "attested_both_spoken_corpora",
        "cifu_top2000",
        "cifu_rank",
        "cifu_spoken_adult",
        "cifu_candidate_jyutping",
        "lexical_priority_status",
    ]
    writer = csv.DictWriter(out, fieldnames=fields, delimiter="\t", lineterminator="\n")
    writer.writeheader()

    both = 0
    in_cifu = 0
    for rank, row in enumerate(core, start=1):
        surface, hk_count, cm_count, hk_ppm, cm_ppm, combined_ppm, both_flag = row
        both += both_flag
        cifu_row = cifu.get(surface)
        if cifu_row:
            in_cifu += 1
        writer.writerow(
            {
                "rank": rank,
                "word": surface,
                "hkcancor_count": hk_count,
                "hkcancor_ppm": f"{hk_ppm:.6f}",
                "cantomap_count": cm_count,
                "cantomap_ppm": f"{cm_ppm:.6f}",
                "combined_equal_corpus_ppm": f"{combined_ppm:.6f}",
                "attested_both_spoken_corpora": "true" if both_flag else "false",
                "cifu_top2000": "true" if cifu_row else "false",
                "cifu_rank": cifu_row["rank"] if cifu_row else "",
                "cifu_spoken_adult": cifu_row["cifu_spoken_adult"] if cifu_row else "",
                "cifu_candidate_jyutping": cifu_row["cifu_jyutping"] if cifu_row else "",
                "lexical_priority_status": "frequency_candidate",
            }
        )

    manifest = {
        "schema": SCHEMA,
        "purpose": (
            "Rank 2,000 contemporary spoken-Cantonese priority surfaces from direct "
            "HKCanCor and CantoMap token frequency. Frequency rank does not imply "
            "atomic lexicality, POS, sense inventory, or parser status."
        ),
        "core_size": CORE_SIZE,
        "ranking": {
            "filter": "surface contains at least one Han ideograph; punctuation/Latin-only tokens excluded",
            "hkcancor_ppm_denominator": "Han-containing word tokens",
            "cantomap_ppm_denominator": "Han-containing word tokens",
            "score": "arithmetic mean of HKCanCor ppm and CantoMap ppm (equal corpus weight)",
            "tie_break": "both-corpora attestation, then pooled raw count, then Unicode surface order",
        },
        "sources": {
            "pycantonese": {
                "version": PY_CANTONESE_VERSION,
                "hkcancor": {
                    "all_word_tokens": hk_all_tokens,
                    "han_word_tokens": hk_han_tokens,
                    "unique_han_surfaces": len(hk_counts),
                },
                "cantomap": {
                    "all_word_tokens": cm_all_tokens,
                    "han_word_tokens": cm_han_tokens,
                    "unique_han_surfaces": len(cm_counts),
                },
            },
            "cifu_secondary": {
                "path": str(cifu_path.relative_to(repo_root())),
                "rows": cifu_rows,
                "sha256": cifu_sha256,
                "role": "secondary rank/frequency and candidate-reading comparison only; not mandatory inclusion or lexical authority",
            },
        },
        "output": {
            "rows": CORE_SIZE,
            "attested_both_spoken_corpora": both,
            "also_in_old_cifu_top2000": in_cifu,
            "outside_old_cifu_top2000": CORE_SIZE - in_cifu,
        },
        "limitations": [
            "Corpus segmentation does not prove atomic lexicality, and atomicity is not a removal criterion in this task.",
            "Common compositional or constructional Cantonese surfaces remain valid priority evidence and are not deleted for being non-atomic.",
            "A surface outside this 2,000-item priority inventory is not absent from Cantonese; it is simply lower frequency under this ranking.",
            "Cifu definitions/Jyutping carry no independent lexical-semantic authority.",
            "Only positively identified Mandarin contamination is a removal/correction target; proper-name, domain, register, rarity, or regression status are not exclusion criteria.",
        ],
    }

    return out.getvalue(), json.dumps(manifest, ensure_ascii=False, indent=2, sort_keys=True) + "\n"


def compare_or_write(path: Path, content: str, check: bool) -> bool:
    if check:
        if not path.is_file():
            print(f"missing generated file: {path}", file=sys.stderr)
            return False
        if path.read_text(encoding="utf-8") != content:
            print(f"generated file is stale: {path}", file=sys.stderr)
            return False
        return True
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8", newline="")
    return True


def main() -> int:
    root = repo_root()
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--cifu",
        type=Path,
        default=root / "data/lexical-frequency/cifu-spoken-top-2000.tsv",
    )
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()

    ledger_path = root / "data/lexical-frequency/common-spoken-cantonese-core-2000.tsv"
    manifest_path = root / "data/lexical-frequency/common-spoken-cantonese-core-2000.manifest.json"
    ledger, manifest = build_outputs(args.cifu.resolve())
    ok = True
    ok &= compare_or_write(ledger_path, ledger, args.check)
    ok &= compare_or_write(manifest_path, manifest, args.check)
    if not ok:
        return 1
    print(f"common spoken Cantonese core {'verified' if args.check else 'generated'}: {ledger_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
