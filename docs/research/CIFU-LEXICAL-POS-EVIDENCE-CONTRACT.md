# Cifu lexical POS evidence contract

## Purpose

This note defines the mechanical evidence packet used to review lexical analyses for
Cifu SpokenAdult top-2,000 surfaces. It standardizes what Codex or another extraction
worker must preserve before ChatGPT performs linguistic adjudication.

This is an evidence-transport contract, not a POS theory and not a lexical decision
record. It changes no runtime entry, parser behavior, construction identity,
linguistic status, evidence sufficiency, or final POS analysis.

A hard architecture requirement is that normal Canto Span/plugin operation and normal
lexical adjudication remain **fully offline**. PyCantonese is therefore a provenance
and generation dependency only. The plugin must never need to import, execute,
download, or query PyCantonese in order to interpret an HKCanCor tag.

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

PyCantonese 5.0.0 is the upstream authority used to **generate and verify** the
project's checked-in mapping. It is not a runtime or adjudication dependency.

## Checked-in offline HKCanCor → UD map

The canonical local projection artifact is:

```text
data/lexical-pos/hkcancor-to-ud-pycantonese-5.0.0.json
```

It is generated mechanically from frozen PyCantonese 5.0.0
`hkcancor_to_ud()` and checked into the repository. Normal readers use this local
JSON only.

The artifact must contain at least:

```json
{
  "schema": "canto-span-hkcancor-ud-map-v1",
  "source": {
    "project": "PyCantonese",
    "version": "5.0.0",
    "api": "pycantonese.pos_tagging.hkcancor_to_ud"
  },
  "unknown_tag_fallback": "X",
  "map": {
    "v": "VERB"
  }
}
```

The actual `map` contains the complete mapping returned by the frozen upstream API;
the one-entry object above illustrates shape only.

The separately scoped map-materialization issue #808 owns the canonical maintenance
tool and generated artifact:

```text
tools/corpus-review/export_hkcancor_ud_map.py
data/lexical-pos/hkcancor-to-ud-pycantonese-5.0.0.json
```

With a maintenance environment containing exactly PyCantonese 5.0.0, its generator
must support regeneration and deterministic check mode from the repository root:

```bash
python tools/corpus-review/export_hkcancor_ud_map.py
python tools/corpus-review/export_hkcancor_ud_map.py --check
```

The tool must reject any other PyCantonese version and verify the upstream unknown-tag
fallback. These commands are maintenance/corpus tooling; neither is bundled into or
required by the offline plugin.

### Offline invariant

After the map is checked in:

- plugin/runtime code must not call `hkcancor_to_ud()`;
- adjudication tooling must not call `hkcancor_to_ud()` merely to read a tag;
- no network lookup is permitted to interpret a corpus tag;
- local readers load the checked-in JSON and use `map[raw_tag]`;
- an unknown/unlisted raw tag receives the recorded `unknown_tag_fallback` (`X`) and
  should remain visibly traceable as a fallback rather than silently disappearing;
- regeneration is required only when the project deliberately changes the frozen
  upstream mapping/version.

This gives the plugin the simplified POS projection without making Python,
PyCantonese, package installation, or internet access part of normal operation.

## Three-layer model

Every adjudication keeps three layers distinct:

```text
raw HKCanCor corpus annotation
        ↓ checked-in local map generated from PyCantonese 5.0.0
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

For every observed raw HKCanCor POS tag, derive the corresponding UD tag from the
checked-in local map. Do not infer the UD tag from the surface, Cifu definition,
runtime analysis, or an improvised project table.

Examples from the upstream mapping include:

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

This table is illustrative only. The checked-in complete JSON map is the canonical
local conversion source after it has been generated and verified against frozen
PyCantonese 5.0.0.

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

`hkcancor_ud_counts` is computed token-for-token from the raw tags through the
checked-in local mapping. It is not guessed from the lexical surface and it must
account for the same matched tokens as the raw distribution.

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
- checked-in HKCanCor→UD map path and content SHA-256;
- runtime/Cifu input paths or revisions needed to reproduce the packet.

Recording the local map hash makes each evidence packet reproducible without requiring
a future PyCantonese call.

### `concordance-samples.jsonl`

Preserve deterministic review context for **every observed surface × raw HKCanCor POS
× Jyutping bucket**, not only surfaces already judged ambiguous or multi-tagged. Also
emit an explicit zero-hit row for each unattested Cifu surface.

For an observed bucket, preserve at minimum:

- rank and surface;
- raw HKCanCor POS;
- locally derived UD POS;
- Jyutping;
- bucket token count;
- deterministic context sufficient to locate and inspect at least one corpus
  occurrence;
- source/location provenance needed to recover the occurrence.

Sampling every observed bucket prevents a later adjudicator from having to request
new extraction merely because a low-frequency tag or reading was not anticipated as
ambiguous during generation.

## Map generation and verification

The map is generated once per deliberately adopted upstream version. Issue #808's
maintenance tool imports the frozen API and calls:

```python
from pycantonese.pos_tagging import hkcancor_to_ud

mapping = hkcancor_to_ud()
```

It then writes the complete mapping plus source metadata to the canonical checked-in
JSON path. In `--check` mode it regenerates in memory and fails if the committed
artifact differs.

Neither generator nor verifier belongs on the plugin's normal execution path.

The following invariants apply:

1. Upstream generation/verification is frozen to PyCantonese 5.0.0.
2. The complete mapping is persisted in the repository.
3. Normal plugin/adjudication reads are local and dependency-free.
4. HKCanCor source files are verified through the checked-in corpus manifest when
   corpus evidence itself is regenerated.
5. Raw corpus tags are preserved unchanged.
6. Raw and derived distributions account for the same matched tokens.
7. All observed raw-POS/Jyutping buckets receive deterministic context.
8. Zero-hit surfaces remain explicit rather than disappearing from the packet.
9. Evidence packets record the local map hash used for their projection.

## Adjudication procedure

After the packet is generated, ChatGPT reviews each surface against all available
layers:

1. Cifu form, Jyutping, definition, and rank;
2. current runtime analysis set;
3. raw HKCanCor tag/readings and token counts;
4. the locally stored UD projection as a readability aid;
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
Its scope includes source verification, counting, reading the checked-in local map,
deterministic sampling, rendering, and packet validation. A separately bounded map
maintenance task may use PyCantonese to generate/verify the static map.

The following remain reserved for ChatGPT linguistic adjudication unless a later
explicit issue changes ownership:

- deciding what POS/readings the lexical surface actually has;
- deciding whether corpus tags are analysis errors in a particular context;
- choosing or creating Canto Span lexical analyses;
- editing lexical entries or parser behavior;
- deciding evidence sufficiency or linguistic status.

The raw → UD projection is therefore safe to automate because the complete mapping is
checked in, versioned, auditable, and available offline while making no linguistic
decision.
