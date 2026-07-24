# HKCanCor machine-readable corpus search — SV-RQ-008 to SV-RQ-010

## Scope

This checkpoint records a complete machine-readable search of the HKCanCor corpus bundled with PyCantonese 5.0.0.

Corpus inventory:

- 58 files;
- 16,162 utterances;
- 153,656 segmented words;
- conversational and radio Hong Kong Cantonese;
- token, Jyutping, POS, file, participant, and neighboring-utterance provenance retained.

The extractor is intentionally high recall. Raw candidates were triaged before interpretation.

## Evidence boundary

A corpus hit establishes occurrence in this corpus only. It does not establish unrestricted productivity, universal acceptability, regional scope, construction identity, parser coverage, or promotion readiness.

A zero result establishes non-attestation under the documented search only. It does not establish ungrammaticality.

## Result summary

| Question | Raw result | Reviewed interpretation |
|---|---:|---|
| `SV-RQ-008` — `V完咗O` | 0 | Not attested in this HKCanCor search. Scholarly examples and survey polarization therefore remain necessary evidence; HKCanCor cannot settle productivity. |
| `SV-RQ-009` — `V咗O` plus location/direction | 110 | 7 confirmed target attestations, 1 plausible pause-separated case, 16 related non-target profiles, and 86 false positives. |
| `SV-RQ-010` — `咗…喇` | 213 | 176 genuine laa-family particle candidates before endpoint deduplication; 165 unique closest-`咗` endpoints. Of these, 102 are tight surface candidates, 35 contain another predicate, and 28 are punctuation-separated. |

## SV-RQ-008 — `V完咗O`

No candidate was found for:

- separate tokens `V + 完 + 咗`;
- a combined `V完` token followed by `咗`;
- a single token containing `完咗`.

This is a meaningful negative corpus observation because the search covered every utterance and included segmentation fallbacks. It does **not** override direct scholarly examples such as `食完咗…`, nor does it turn the survey's mixed judgments into a categorical ban.

Revised interpretation:

> `V完咗O` is structurally and scholarly attested but absent from this approximately 153,000-word late-1990s Hong Kong conversational corpus.

The most likely next questions remain discourse conditioning, lexical distribution, speaker variation, and register.

## SV-RQ-009 — postobject location and direction

### Confirmed postobject location attestations

1. `跌咗條鎖匙喺地下度`
2. `接咗ABC三個字喺裏邊`

A third example, `買咗個辛辣麵啊，喺背囊啊`, is plausible but pause-separated and may involve right dislocation or an elliptical follow-up rather than one uninterrupted predicate.

### Confirmed postobject directional attestations

1. `send咗好多份信去`
2. `send咗成一百封信去`
3. `帶咗太多無謂嘅餅乾去`
4. `吸咗好多琉磺入肚`
5. `帶咗三部機去`

These establish that the survey's `V咗O + path/location` condition has natural-corpus analogues. They do not justify one undifferentiated extension rule:

- `喺` result locations;
- `去` directionals;
- `入肚` endpoint/result expressions;
- motion predicates without overt objects;
- control/causative clauses;
- purposive `嚟` chains

must remain separate research profiles.

### Useful non-target discoveries

The high-recall search also surfaced:

- `擺咗喺度…` and `柄咗喺個櫃底…` without overt post-`咗` objects;
- `接咗你呢一個job嚟做`;
- `賺咗啲錢嚟…`;
- `放咗工嚟做…`;
- object-control forms such as `叫咗佢出門口…`.

The purposive `嚟` hits should be transferred as corpus attestations to `SV-RQ-006`, not counted under `SV-RQ-009`.

## SV-RQ-010 — `咗…喇`

### Raw-candidate correction

The original extractor returned 213 candidates. Triage found:

- 37 lexical or wrong-particle matches, including items whose Jyutping only begins with `laa`, `aa`, or `ge`;
- 11 duplicate earlier-`咗` anchors pointing to a final particle already associated with a closer `咗`;
- 165 unique genuine laa-family endpoints.

The 165 unique endpoints divide into:

| Structural stratum | Count | Interpretation |
|---|---:|---|
| Tight surface candidate | 102 | No intervening punctuation or separately verb-tagged token between the closest `咗` and final particle. |
| Complex same-clause candidate | 35 | Another predicate intervenes; final-particle scope requires manual analysis. |
| Punctuation-separated candidate | 28 | Coordination, repair, or clause boundary may separate the perfective event from the final particle. |

Among the 102 tight candidates:

- 52 contain nominal-looking material between `咗` and the particle;
- 50 do not.

This directly refutes an analysis of `V咗喇` as necessarily involving object omission. HKCanCor contains both overt-object and no-overt-object surface profiles.

Representative overt-material examples include:

- `賣咗佢嘞`
- `食咗好多包嚹`
- `買咗九五年新版喇`
- `整咗一張大嘅人名表喇`
- `講咗自己經驗喇`
- `睇咗醫生嚹`
- `send咗好多份信去嚹`

Representative no-overt-object examples include:

- `多咗喇`
- `甩咗喇`
- `死咗嚹`
- `走咗嘞`
- `唔記得咗嚹`

The corpus therefore supports a layered analysis in which verbal/predicate `咗` and a final laa-family particle may coexist independently of overt-object realization. Exact semantic scope still requires contextual review and controlled judgments.

## Consequences for the private research track

### SV-RQ-008

Retain:

> structurally supported; scholarly attested; survey-polarized; not attested in searched HKCanCor.

Do not convert the zero result into a rejection rule.

### SV-RQ-009

Advance from source-only support to:

> directly corpus-attested for selected postobject result-location and directional profiles.

Do not merge `喺` result location, directional `去`, endpoint `入肚`, motion goals, and purposive `嚟` into one construction.

### SV-RQ-010

Advance from source-supported distinction to:

> densely corpus-attested layered surface profile, including both overt-object and no-overt-object cases.

The remaining research problem is particle semantics and scope, not whether `咗` and final `喇/嚹/嘞` co-occur.

## Reproducibility

The checked-in Python extractor regenerates the raw candidate files from `pycantonese.hkcancor()`.

Run:

```bash
python3 -m venv .venv-hkcancor
source .venv-hkcancor/bin/activate
python -m pip install "pycantonese==5.0.0"
python hkcancor_svrq_008_010_extract.py --output-dir hkcancor-svrq-008-010
```

The extraction metadata file records SHA-256 hashes for the uploaded archive, extractor, raw candidate ledger, and raw summary.

## Implementation boundary

No parser, construction identity, status, fixture, test, workflow, generated output, or release change is authorized by this corpus checkpoint.
