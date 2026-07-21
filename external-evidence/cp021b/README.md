# CP021B HKCanCor lexical discovery inventory

This directory contains a reproducible, parser-independent lexical retrieval from the HKCanCor files distributed with PyCantonese 5.0.0.

The primary query returns every utterance with a token exactly equal to `畀` or `俾`. A substring expansion is also exported so that a compound token cannot be silently lost. Every row remains `UNSCREENED_LEXICAL_CANDIDATE`; there is no transfer, beneficiary, recipient, passive, permissive, completeness, or parser annotation at this lifecycle event.

Each record preserves its source filename and SHA-256, zero-based turn index, participant metadata, token/POS/Jyutping arrays, and the immediately preceding and following turns. The full candidate inventory is retained to prevent favorable-example selection.

Source: [HKCanCor repository](https://github.com/fcbond/hkcancor), created by K. K. Luke and described by K. K. Luke and May L. Y. Wong (2015), *The Hong Kong Cantonese Corpus: Design and Uses*. The repository releases the transcriptions under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Recordings were collected from March 1997 to August 1998.

The PyCantonese distribution used here contains 58 files and 153,656 words, fewer than the approximately 230,000 words described by the repository. Consequently this inventory is a complete retrieval only for the named distribution, not a complete census of Hong Kong Cantonese or even every published HKCanCor transcription.

Reproduction command:

```sh
PYTHONPATH=/tmp/pycantonese-5 python query-hkcancor-cp021b.py --output-dir .
```
