# Rime-Cantonese lexical rescue evidence

This directory stores a **small frozen offline derivative** of
[`rime/rime-cantonese`](https://github.com/rime/rime-cantonese) for Canto Span lexical
adjudication.

It is deliberately not a vendored copy of the full Rime dictionary.

## Evidence role

Rime-Cantonese is used as independent Cantonese evidence for:

- whether an exact written surface occurs in the pinned Rime lexicon;
- which LSHK Jyutping reading or readings Rime associates with that surface;
- orthographic and reading conflicts that deserve expert follow-up.

It is **not** an authority for:

- lexical POS;
- lexical meaning or sense inventory;
- atomic lexicality versus compositional/constructional analysis;
- construction identity or status;
- linguistic frequency.

Rime dictionary weights are intentionally discarded. Absence from the frozen Rime
snapshot is not evidence that a surface or reading is absent from Cantonese.

## Frozen upstream

The current snapshot is pinned to:

```text
repository: rime/rime-cantonese
commit: c99b16e44d2df77a5cb8fb0867dd2bab7a112cb0
commit date: 2026-07-02T11:05:50Z
```

The derivative reads only:

```text
jyut6ping3.chars.dict.yaml
jyut6ping3.words.dict.yaml
jyut6ping3.phrase.dict.yaml
```

The generator verifies each file against its pinned Git blob SHA before using it.
The manifest records SHA-256 hashes as well.

The upstream project states that its main dictionary data is released under
**Creative Commons Attribution 4.0 International (CC BY 4.0)**. Attribution and
source identity are preserved in the manifest and this note. The separately licensed
`jyut6ping3.maps` data is not used by this derivative.

## Generated artifact

For each of the 2,000 canonical Cifu SpokenAdult rank rows, the checked-in TSV records:

- rank and exact Cifu surface;
- Cifu Jyutping only as low-trust candidate metadata for comparison;
- whether the exact surface is present in the pinned Rime source files;
- all exact Rime Jyutping readings found for that surface;
- compact no-space readings for mechanical comparison convenience;
- which pinned Rime source file or files supplied the match.

Every Cifu rank remains present in the ledger, including explicit Rime-absent rows.

## Regeneration

With a local checkout containing the pinned upstream files:

```bash
python tools/lexical-coverage/export-rime-cantonese-top2000.py \
  --rime-dir /path/to/rime-cantonese

python tools/lexical-coverage/export-rime-cantonese-top2000.py \
  --rime-dir /path/to/rime-cantonese \
  --check
```

Normal Canto Span runtime and lexical adjudication consume only the checked-in
derivative and never download or execute Rime-Cantonese.
