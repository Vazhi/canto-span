#!/usr/bin/env python3
from pathlib import Path

path = Path('docs/research/CIFU-LEXICAL-POS-EVIDENCE-CONTRACT.md')
text = path.read_text(encoding='utf-8')

anchor = (
    "The Cifu side is `data/lexical-frequency/cifu-spoken-top-2000.tsv`.\n\n"
    "PyCantonese documents two relevant POS representations:"
)
replacement = '''The Cifu side is `data/lexical-frequency/cifu-spoken-top-2000.tsv`.

### Cifu provenance firewall

Cifu's **SpokenAdult rank and exact written surface** are useful Cantonese discovery
and frequency evidence because that genre is built from Hong Kong Cantonese corpora.
They do not make the remaining Cifu metadata independent Cantonese lexical evidence.

Cifu's published methodology states that its Jyutping and English definitions were
automatically obtained from **yeDict**, which it describes as an adaptation of the
CEDICT Mandarin-English dictionary for Cantonese. Entries absent from yeDict receive
MaxMatch-reconstructed Jyutping; those reconstructed rows are marked with `*` in the
Cifu data. Therefore:

- Cifu definitions are search/navigation hints only and carry **zero independent
  Cantonese lexical-semantic or POS weight**;
- Cifu Jyutping is candidate pronunciation metadata only, with `*` reconstructed
  readings receiving especially low confidence;
- Cifu segmentation/ranking establishes a candidate surface boundary, not atomic
  lexicality;
- no Cifu gloss, reading, or headword status may rescue an analysis without HKCanCor
  context or an independent Cantonese source.

Primary methodology reference: Lai & Winterstein 2020, *Cifu: a Frequency Lexicon of
Hong Kong Cantonese*, especially §§2.1 and 5.2.1–5.2.3:
<https://aclanthology.org/2020.lrec-1.375.pdf>.

### Frozen Rime-Cantonese rescue layer

The canonical offline pronunciation/orthography rescue artifact is rooted at:

```text
external-evidence/lexical-pos/rime-cantonese/
```

The current snapshot pins `rime/rime-cantonese` commit
`c99b16e44d2df77a5cb8fb0867dd2bab7a112cb0` and mechanically intersects the Cifu
top-2,000 exact surfaces with the pinned Rime character, word, and phrase dictionaries.
Normal adjudication reads only the checked-in derivative; it never downloads or
executes Rime-Cantonese.

Rime-Cantonese may corroborate:

- exact Cantonese orthographic surface presence;
- LSHK Jyutping reading candidates;
- reading conflicts that require expert follow-up.

Rime-Cantonese has **zero independent authority** for lexical POS, lexical meaning,
sense inventory, atomic lexicality, construction identity/status, or linguistic
frequency. Its input-method weights are intentionally discarded. Absence from Rime
is not evidence against Cantonese.

The frozen generator and manifest verify the exact upstream Git blob identities and
record SHA-256 hashes. The upstream main dictionary data is CC BY 4.0; the separately
licensed `jyut6ping3.maps` data is not used by this derivative.

PyCantonese documents two relevant POS representations:'''

if anchor in text:
    text = text.replace(anchor, replacement, 1)
elif '### Frozen Rime-Cantonese rescue layer' not in text:
    raise SystemExit('source-boundary anchor missing')

old = '''After the packet is generated, ChatGPT reviews each surface against all available
layers:

1. Cifu form, Jyutping, definition, and rank;
2. current runtime analysis set;
3. raw HKCanCor tag/readings and token counts;
4. the locally stored UD projection as a readability aid;
5. concordance context for every observed raw-POS/Jyutping bucket;
6. additional external linguistic evidence when the corpus/runtime evidence does not
   resolve a lexical distinction.
'''
new = '''After the packet is generated, ChatGPT reviews each surface against all available
layers:

1. Cifu rank and exact surface as discovery/frequency candidates; Cifu Jyutping and
   definition remain low-trust navigation hints only;
2. current runtime analysis set;
3. raw HKCanCor tag/readings and token counts;
4. the locally stored UD projection as a readability aid;
5. concordance context for every observed raw-POS/Jyutping bucket;
6. the frozen Rime-Cantonese exact-surface/readings ledger as pronunciation and
   orthography corroboration only;
7. additional independent Cantonese lexical or linguistic evidence when the other
   layers do not resolve a lexical distinction.
'''

if old in text:
    text = text.replace(old, new, 1)
elif 'the frozen Rime-Cantonese exact-surface/readings ledger' not in text:
    raise SystemExit('adjudication-procedure anchor missing')

path.write_text(text, encoding='utf-8')
print(f'patched {path}')
