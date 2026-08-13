#!/usr/bin/env python3
"""Build an expanded spoken-Cantonese lexical candidate pool for expert curation.

The pool ranks corpus-tokenized surfaces by direct spoken usage. It deliberately
extends beyond the final 2,000-item target so proper names, domain artifacts, and
productive/compositional surfaces can be excluded and backfilled.

POS, Jyutping, and corpus-concentration fields are curation signals only. They do
not automatically establish atomic lexicality, POS, sense, or parser status.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import sys
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

PY_CANTONESE_VERSION = "5.0.0"
SCHEMA = "canto-span-common-spoken-cantonese-candidate-pool-v1"
DEFAULT_POOL_SIZE = 5000


def repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def contains_han(surface: str) -> bool:
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


def load_invalid_atoms(root: Path) -> dict[str, dict[str, str]]:
    out: dict[str, dict[str, str]] = {}
    for ledger in sorted((root / "data/lexical-frequency").glob("r7-invalid-atomic-retirements*.tsv")):
        with ledger.open(encoding="utf-8", newline="") as fh:
            for row in csv.DictReader(fh, delimiter="\t"):
                if row.get("disposition") != "retire_invalid_atomic":
                    continue
                surface = row["surface"]
                existing = out.get(surface)
                if existing and existing.get("rank") != row.get("rank"):
                    raise RuntimeError(f"conflicting invalid-atom rank for {surface}")
                out.setdefault(surface, row)
    return out


def corpus_evidence(corpus):
    counts: Counter[str] = Counter()
    pos_counts: dict[str, Counter[str]] = defaultdict(Counter)
    jyutping_counts: dict[str, Counter[str]] = defaultdict(Counter)
    all_tokens = 0
    han_tokens = 0

    for token in corpus.tokens():
        all_tokens += 1
        surface = str(getattr(token, "word", "") or "").strip()
        if not surface or not contains_han(surface):
            continue
        han_tokens += 1
        counts[surface] += 1
        pos = str(getattr(token, "pos", "") or "").strip()
        if pos:
            pos_counts[surface][pos] += 1
        jyutping = str(getattr(token, "jyutping", "") or "").strip()
        if jyutping:
            jyutping_counts[surface][jyutping] += 1

    return {
        "counts": counts,
        "pos_counts": pos_counts,
        "jyutping_counts": jyutping_counts,
        "all_tokens": all_tokens,
        "han_tokens": han_tokens,
    }


def counter_summary(counter: Counter[str], limit: int = 8) -> str:
    if not counter:
        return ""
    return "|".join(f"{key}:{count}" for key, count in counter.most_common(limit))


def top_value(counter: Counter[str]) -> str:
    return counter.most_common(1)[0][0] if counter else ""


def share(counter: Counter[str], predicate) -> float:
    total = sum(counter.values())
    if not total:
        return 0.0
    selected = sum(count for key, count in counter.items() if predicate(key))
    return selected / total


def hkcancor_proper_like(tag: str) -> bool:
    """Conservative raw-tag signal only; expert review still decides proper-name status."""
    normalized = tag.strip().lower()
    return normalized in {"nr", "ns", "nt", "nz"} or normalized.startswith(("nr-", "ns-", "nt-", "nz-"))


def corpus_balance(hk_ppm: float, cm_ppm: float) -> float:
    high = max(hk_ppm, cm_ppm)
    if high <= 0.0:
        return 0.0
    return min(hk_ppm, cm_ppm) / high


def dominant_corpus(hk_ppm: float, cm_ppm: float) -> str:
    if hk_ppm == cm_ppm:
        return "balanced"
    return "hkcancor" if hk_ppm > cm_ppm else "cantomap"


def initial_signal(*, invalid_atomic: bool, hk_count: int, cm_count: int, balance: float, hk_proper_share: float) -> str:
    if invalid_atomic:
        return "known_nonatomic_or_invalid"
    if hk_proper_share >= 0.80 and hk_count >= 2:
        return "proper_name_review"
    if (hk_count == 0 or cm_count == 0) and balance == 0.0:
        return "single_corpus_review"
    if balance < 0.10:
        return "domain_concentration_review"
    return "general_lexicality_review"


def build_outputs(cifu_path: Path, pool_size: int):
    try:
        import pycantonese
    except ImportError as exc:
        raise RuntimeError("pycantonese is required for generation") from exc

    if pycantonese.__version__ != PY_CANTONESE_VERSION:
        raise RuntimeError(
            f"expected PyCantonese {PY_CANTONESE_VERSION}, got {pycantonese.__version__}"
        )

    root = repo_root()
    cifu, cifu_sha256, cifu_rows = load_cifu(cifu_path)
    invalid_atoms = load_invalid_atoms(root)
    hk = corpus_evidence(pycantonese.hkcancor())
    cm = corpus_evidence(pycantonese.cantomap())

    candidates = []
    for surface in set(hk["counts"]) | set(cm["counts"]):
        hk_count = hk["counts"].get(surface, 0)
        cm_count = cm["counts"].get(surface, 0)
        hk_ppm = hk_count * 1_000_000.0 / hk["han_tokens"]
        cm_ppm = cm_count * 1_000_000.0 / cm["han_tokens"]
        combined_ppm = (hk_ppm + cm_ppm) / 2.0
        both = int(hk_count > 0 and cm_count > 0)
        balance = corpus_balance(hk_ppm, cm_ppm)
        candidates.append(
            (surface, hk_count, cm_count, hk_ppm, cm_ppm, combined_ppm, both, balance)
        )

    candidates.sort(
        key=lambda row: (-row[5], -row[6], -(row[1] + row[2]), row[0])
    )
    pool = candidates[:pool_size]
    if len(pool) != pool_size:
        raise RuntimeError(f"expected {pool_size} ranked surfaces, got {len(pool)}")

    fields = [
        "candidate_rank",
        "word",
        "hkcancor_count",
        "hkcancor_ppm",
        "hkcancor_top_pos",
        "hkcancor_pos_counts",
        "hkcancor_proper_like_share",
        "hkcancor_jyutping_counts",
        "cantomap_count",
        "cantomap_ppm",
        "cantomap_top_pos",
        "cantomap_pos_counts",
        "cantomap_jyutping_counts",
        "combined_equal_corpus_ppm",
        "attested_both_spoken_corpora",
        "cross_corpus_balance",
        "dominant_corpus",
        "cifu_top2000",
        "cifu_rank",
        "cifu_spoken_adult",
        "cifu_candidate_jyutping",
        "known_invalid_atomic",
        "initial_curation_signal",
        "final_curation_status",
        "curation_note",
    ]
    out = io.StringIO(newline="")
    writer = csv.DictWriter(out, fieldnames=fields, delimiter="\t", lineterminator="\n")
    writer.writeheader()

    both_count = 0
    old_cifu_count = 0
    signal_counts: Counter[str] = Counter()
    known_invalid_in_pool = 0

    for rank, row in enumerate(pool, start=1):
        surface, hk_count, cm_count, hk_ppm, cm_ppm, combined_ppm, both, balance = row
        hk_pos = hk["pos_counts"].get(surface, Counter())
        cm_pos = cm["pos_counts"].get(surface, Counter())
        hk_jyut = hk["jyutping_counts"].get(surface, Counter())
        cm_jyut = cm["jyutping_counts"].get(surface, Counter())
        proper_share = share(hk_pos, hkcancor_proper_like)
        invalid = surface in invalid_atoms
        signal = initial_signal(
            invalid_atomic=invalid,
            hk_count=hk_count,
            cm_count=cm_count,
            balance=balance,
            hk_proper_share=proper_share,
        )
        cifu_row = cifu.get(surface)
        both_count += both
        old_cifu_count += int(cifu_row is not None)
        known_invalid_in_pool += int(invalid)
        signal_counts[signal] += 1
        writer.writerow(
            {
                "candidate_rank": rank,
                "word": surface,
                "hkcancor_count": hk_count,
                "hkcancor_ppm": f"{hk_ppm:.6f}",
                "hkcancor_top_pos": top_value(hk_pos),
                "hkcancor_pos_counts": counter_summary(hk_pos),
                "hkcancor_proper_like_share": f"{proper_share:.6f}",
                "hkcancor_jyutping_counts": counter_summary(hk_jyut),
                "cantomap_count": cm_count,
                "cantomap_ppm": f"{cm_ppm:.6f}",
                "cantomap_top_pos": top_value(cm_pos),
                "cantomap_pos_counts": counter_summary(cm_pos),
                "cantomap_jyutping_counts": counter_summary(cm_jyut),
                "combined_equal_corpus_ppm": f"{combined_ppm:.6f}",
                "attested_both_spoken_corpora": "true" if both else "false",
                "cross_corpus_balance": f"{balance:.6f}",
                "dominant_corpus": dominant_corpus(hk_ppm, cm_ppm),
                "cifu_top2000": "true" if cifu_row else "false",
                "cifu_rank": cifu_row["rank"] if cifu_row else "",
                "cifu_spoken_adult": cifu_row["cifu_spoken_adult"] if cifu_row else "",
                "cifu_candidate_jyutping": cifu_row["cifu_jyutping"] if cifu_row else "",
                "known_invalid_atomic": "true" if invalid else "false",
                "initial_curation_signal": signal,
                "final_curation_status": "unreviewed",
                "curation_note": "",
            }
        )

    manifest = {
        "schema": SCHEMA,
        "purpose": (
            "Expanded direct-spoken surface candidate pool for expert curation/backfill "
            "to exactly 2,000 genuine common Cantonese lexical items."
        ),
        "pool_size": pool_size,
        "final_lexical_target": 2000,
        "ranking": {
            "filter": "surface contains at least one Han ideograph; punctuation/Latin-only tokens excluded",
            "score": "arithmetic mean of HKCanCor ppm and CantoMap ppm (equal corpus weight)",
            "tie_break": "both-corpora attestation, pooled raw count, Unicode surface order",
            "cross_corpus_balance": "min(corpus ppm) / max(corpus ppm); 1 is balanced and 0 is single-corpus",
        },
        "signals": {
            "pos": "raw corpus POS distributions; curation signal only",
            "hkcancor_proper_like_share": "share of HKCanCor raw tags in conservative nr/ns/nt/nz proper-name families; review signal only",
            "domain_concentration_review": "cross-corpus balance below 0.10; not an automatic exclusion",
            "known_invalid_atomic": "surface appears in expert-adjudicated invalid-atom retirement ledgers; does not count as a lexical-core item",
        },
        "sources": {
            "pycantonese": {
                "version": PY_CANTONESE_VERSION,
                "hkcancor": {
                    "all_tokens": hk["all_tokens"],
                    "han_tokens": hk["han_tokens"],
                    "unique_han_surfaces": len(hk["counts"]),
                    "pos_role": "original HKCanCor annotation where present; evidence, not final ontology",
                },
                "cantomap": {
                    "all_tokens": cm["all_tokens"],
                    "han_tokens": cm["han_tokens"],
                    "unique_han_surfaces": len(cm["counts"]),
                    "pos_role": "PyCantonese conversion/tagging signal; lower evidentiary weight than direct HKCanCor annotation",
                },
            },
            "cifu_secondary": {
                "path": str(cifu_path.relative_to(root)),
                "rows": cifu_rows,
                "sha256": cifu_sha256,
                "role": "secondary historical rank/frequency and candidate-reading comparison only",
            },
            "invalid_atomic_ledgers": {
                "target_count": len(invalid_atoms),
                "role": "prior expert lexicality exclusions; frequency/regression not used as deletion criteria",
            },
        },
        "output": {
            "rows": pool_size,
            "attested_both_spoken_corpora": both_count,
            "also_in_old_cifu_top2000": old_cifu_count,
            "outside_old_cifu_top2000": pool_size - old_cifu_count,
            "known_invalid_atomic_surfaces_in_pool": known_invalid_in_pool,
            "initial_signal_counts": dict(sorted(signal_counts.items())),
        },
        "limitations": [
            "Corpus tokenization does not prove atomic lexicality.",
            "POS tags are evidence signals, not final Cantonese lexical categories.",
            "Proper-name and domain-concentration signals trigger review, not automatic exclusion.",
            "A valid rare/formal/archaic Cantonese lexeme may remain outside the final common 2,000 without being removed from the broader runtime lexicon.",
            "Cifu definitions/Jyutping and Rime weights do not determine final inclusion.",
            "Protected #796 ranks 1001-1250 require separate handling and are not directly adjudicated by this candidate generator.",
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
    parser.add_argument("--pool-size", type=int, default=DEFAULT_POOL_SIZE)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    if args.pool_size < 2000:
        parser.error("--pool-size must be at least 2000")

    ledger_path = root / f"data/lexical-frequency/common-spoken-cantonese-candidates-{args.pool_size}.tsv"
    manifest_path = root / f"data/lexical-frequency/common-spoken-cantonese-candidates-{args.pool_size}.manifest.json"
    ledger, manifest = build_outputs(args.cifu.resolve(), args.pool_size)
    ok = compare_or_write(ledger_path, ledger, args.check)
    ok &= compare_or_write(manifest_path, manifest, args.check)
    if not ok:
        return 1
    print(f"spoken Cantonese candidate pool {'verified' if args.check else 'generated'}: {ledger_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
