# Cifu lexical POS evidence contract

## Purpose

This note defines the mechanical evidence packet used to review lexical analyses for
Cifu SpokenAdult top-2,000 surfaces. It standardizes what Codex or another extraction
worker must preserve before ChatGPT performs linguistic adjudication.

This is an evidence-transport contract, not a POS theory and not a lexical decision
record. It changes no runtime entry, parser behavior, construction identity,
linguistic status, evidence sufficiency, or final POS analysis.

## Source boundary

The corpus side is frozen to the repository-verified PyCantonese **5.0.0** HKCanCor
distribution and the checked-in SHA-256 source manifest. The runtime side is the
current surface-to-analyses index produced by
`src/runtime-resources/lexicon/lexical-analyses.js` from the current token lexicon.
The Cifu side is `data/lexical-frequency/cifu-spoken-top-2000.tsv`.

PyCantonese documents two relevant POS representations:

- the original HKCanCor tagset, containing more than 100 corpus tags;
- Universal Dependencies v2 POS, a 17-tag projection produced by
  `pycantonese.pos_tagging.hkcancor_to_ud()`.

Canonical implementation/documentation references:

- <https://docs.pycantonese.org/stable/generated/pycantonese.pos_tagging.hkcancor_to_ud.html>
- <https://docs.pycantonese.org/stable/pos_tagging.html>
- <https://docs.pycantonese.org/stable/generated/pycantonese.pos_tag.html>

The packet must use the converter shipped by frozen PyCantonese 5.0.0 rather than a
project-maintained transcription of the mapping. This keeps the transformation
mechanical and reproducible.

## Three-layer model

Every adjudication keeps three layers distinct:

```text
raw HKCanCor corpus annotation
        ↓ mechanical PyCantonese 5.0.0 hkcancor_to_ud()
UD POS projection for navigation/readability
        ↓ expert review of forms, readings, context, and runtime analyses
Canto Span lexical analysis
```

The first two layers are corpus evidence and deterministic transformation. The third
is a linguistic/project decision.

### Raw HKCanCor tags are primary

Never replace, normalize away, or aggregate away the original HKCanCor tag. Raw tags
remain necessary because the UD projection is intentionally less granular. Distinct
HKCanCor categories may collapse to the same UD category, so UD cannot recover all
annotation distinctions.

### UD is a derived convenience layer

For every observed raw HKCanCor POS tag, derive the corresponding UD tag by calling
PyCantonese 5.0.0 `hkcancor_to_ud(raw_tag)`. An unrecognized raw tag follows
PyCantonese behavior and maps to `X`; do not invent a project-specific fallback.

Examples from the canonical converter include:

| Raw HKCanCor | Derived UD |
|---|---|
| `v` | `VERB` |
| `vu` | `AUX` |
| `a` | `ADJ` |
| `d` | `ADV` |
| `n` | `NOUN` |
| `r` | `PRON` |
| `p` | `ADP` |
| `m` | `NUM` |
| `q` | `NOUN` |
| `u` | `PART` |
| `y` / `y1` | `PART` |

This table is illustrative only. The executable PyCantonese 5.0.0 mapping is the
canonical conversion source.

### Canto Span analysis is independent

Neither a raw HKCanCor tag nor its UD projection automatically determines Canto Span
`label`, `pos`, `syntax`, senses, `verb_class`, `particle_class`, classifier classes,
lexical-analysis splitting, or parser behavior. Corpus counts are evidence about
attested annotation in context, not final lexical ontology.

## Required rank-band packet

Each 250-rank band under
`external-evidence/lexical-pos/cifu-top-2000/ranks-XXXX-YYYY/` must contain the same
four deterministic artifacts.

### `aggregate.tsv`

One row per Cifu rank, preserving at minimum:

- `rank`;
- `word`;
- Cifu Jyutping and definition fields;
- total HKCanCor matching-token count;
- observed raw POS/Jyutping bucket count;
- raw `hkcancor_pos_counts`;
- derived `hkcancor_ud_counts`;
- `hkcancor_jyutping_counts`.

`hkcancor_ud_counts` is computed token-for-token from the raw tag using
`hkcancor_to_ud()`. It is not computed by guessing from the surface or by converting
the already aggregated raw dictionary in a way that loses token accounting.

### `runtime-analyses.json`

Preserve every current normalized runtime analysis for each rank surface, including
stable analysis ID, surface, visible label, POS, Jyutping, syntax, senses, semantic
and class metadata, review/provenance fields, and all supported alternatives.

Do not choose one runtime analysis merely because it is first, most frequent, or
closest to a corpus tag.

### `summary.json`

Record enough accounting to verify the packet mechanically, including:

- 250 rank rows;
- HKCanCor-attested and zero-hit surface counts;
- total matching tokens;
- observed surface × raw POS × Jyutping bucket count;
- raw HKCanCor POS distribution;
- derived UD POS distribution;
- Jyutping distribution;
- runtime row/analysis counts and multi-analysis surfaces;
- frozen PyCantonese version and HKCanCor source-manifest identity;
- runtime/Cifu input paths or revisions needed to reproduce the packet.

### `concordance-samples.jsonl`

Preserve deterministic review context for **every observed surface × raw HKCanCor POS
× Jyutping bucket**, not only surfaces already judged ambiguous or multi-tagged. Also
emit an explicit zero-hit row for each unattested Cifu surface.

For an observed bucket, preserve at minimum:

- rank and surface;
- raw HKCanCor POS;
- mechanically derived UD POS;
- Jyutping;
- bucket token count;
- deterministic context sufficient to locate and inspect at least one corpus
  occurrence;
- source/location provenance needed to recover the occurrence.

Sampling every observed bucket prevents a later adjudicator from having to request
new extraction merely because a low-frequency tag or reading was not anticipated as
ambiguous during generation.

## Determinism and provenance

The packet must preserve the raw evidence before any projection. A reasonable
implementation pattern is:

```python
from pycantonese.pos_tagging import hkcancor_to_ud

raw_tag = tok.pos or "-"
ud_tag = hkcancor_to_ud(tok.pos) if tok.pos else "X"
```

The exact implementation may differ, but the following invariants do not:

1. PyCantonese is frozen to 5.0.0.
2. HKCanCor source files are verified through the checked-in manifest.
3. Raw tags are preserved unchanged.
4. UD values come only from the frozen converter.
5. Raw and derived distributions account for the same matched tokens.
6. All observed raw-POS/Jyutping buckets receive deterministic context.
7. Zero-hit surfaces remain explicit rather than disappearing from the packet.

## Adjudication procedure

After the packet is generated, ChatGPT reviews each surface against all available
layers:

1. Cifu form, Jyutping, definition, and rank;
2. current runtime analysis set;
3. raw HKCanCor tag/readings and token counts;
4. the UD projection as a readability aid;
5. concordance context for every observed raw-POS/Jyutping bucket;
6. additional external linguistic evidence when the corpus/runtime evidence does not
   resolve a lexical distinction.

Possible outcomes include retaining the current analysis, correcting an analysis,
adding a missing alternative, splitting a polyfunctional surface into multiple
stable analyses, or leaving the surface unresolved pending stronger evidence.

No frequency threshold automatically decides an outcome. A majority corpus tag does
not erase a genuine minority reading, and a corpus annotation error does not become a
runtime fact because it is frequent.

## Division of responsibility

Mechanical extraction may be Codex-owned when current workflow settings permit it.
Its scope includes source verification, counting, PyCantonese mapping, deterministic
sampling, rendering, and packet validation.

The following remain reserved for ChatGPT linguistic adjudication unless a later
explicit issue changes ownership:

- deciding what POS/readings the lexical surface actually has;
- deciding whether corpus tags are analysis errors in a particular context;
- choosing or creating Canto Span lexical analyses;
- editing lexical entries or parser behavior;
- deciding evidence sufficiency or linguistic status.

The raw → UD projection is therefore safe to automate precisely because it makes no
such decision.
