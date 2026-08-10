# Issue 724 — AB45 QuantifiedClassifierNP source inventory R1

Date: 2026-08-10
Construction: AB45 `QuantifiedClassifierNP`
Status effect: research clarification only; no runtime or linguistic-status promotion

## Research question

Which Cantonese quantity/classifier profiles are directly established by the three sources currently attached to AB45, and which superficially similar runtime profiles must remain separate or unresolved?

The audit distinguishes source-supported linguistic claims from runtime behavior. Passing fixtures, parser reach, generated examples, and test frequency have zero independent linguistic evidence weight.

## Source 1 — Bond & Sio 2024

Source ID: `SRC-BOND-SIO-2024-CLASSIFIERS`

Citation: Francis Bond & Joanna Ut-Seong Sio. 2024. “A Construction-based Approach to Cantonese Classifiers.” *Proceedings of the 31st International Conference on Head-Driven Phrase Structure Grammar*, 60–75. DOI `10.21248/hpsg.2024.4`.

Verification: official HPSG proceedings full text.

### Exact locators and supported propositions

1. pp. 61–62, Table 1 and example (1): the paper explicitly distinguishes four unmodified Cantonese NP schemata: `D-(X)-C-N`, `X-C-N`, `C-N`, and bare `N`.
2. p. 62, example (1b): `一個蘋果` is an explicit `X-C-N` example meaning ‘one apple’.
3. p. 62, Table 1 footnote: `X` may in principle be a numeral phrase or one of a small set of quantifiers, but the paper explicitly limits its own discussion to `X` being a numeral.
4. pp. 61 and 72: classifiers without an overt numeral are separately analyzed as having a default cardinality of one. This is a property of the paper’s `C-N` analysis, not evidence that any surface quantity expression lacking a noun is an `X-C-N` phrase.

### AB45 consequence

Bond & Sio directly support an overt **numeral + classifier + noun** Cantonese NP profile. They also establish that classifier-without-numeral `C-N` is a distinct profile. The paper does not directly establish wh-quantity forms, bare numerals, standard measure expressions, age/dimension expressions, or arbitrary headless numeral-classifier strings as the same construction.

The paper’s constituent analysis is useful evidence for structural differentiation, but Canto Span does not need to adopt its HPSG implementation as the uniquely correct internal parser tree.

## Source 2 — Lam, Lau & Lee 2024

Source ID: `SRC-LAM-LAU-LEE-2024-SEGMENTATION`

Citation: Charles Lam, Chaak-ming Lau & Jackson L. Lee. 2024. “Multi-Tiered Cantonese Word Segmentation.” *Proceedings of LREC-COLING 2024*, 11993–12002.

Verification: official ACL Anthology full text.

### Exact locators and supported propositions

1. p. 11997, §4.3: Cantonese is described as a numeral-classifier language in which English-style Numeral + Noun quantities are expressed as `Numeral + Classifier + Noun`.
2. p. 11997: explicit examples include `三本書` ‘three books’ and `兩個人` ‘two persons’.
3. p. 11997, example (1): `我有三本書，佢有 {*兩, OK 兩本}` shows nominal ellipsis. When ‘books’ is recoverable, `兩本` is licensed while bare `兩` is not.
4. p. 11997: demonstratives/determiners may precede a classifier with an optional intervening numeral; `哩兩個人` is given as ‘these two people’.

### AB45 consequence

Lam et al. directly support both:

- overt `Num-CL-N`; and
- a **contextually licensed headless `Num-CL-ØN` ellipsis profile**, where the omitted noun is recoverable and the classifier remains overt.

The ellipsis example is especially important because it directly distinguishes headless `Num-CL` from a bare numeral. It does not license treating every standalone numeral-classifier-like expression as the same profile without a recoverable nominal interpretation.

The demonstrative example supports composition around an overt quantified classifier NP, but the demonstrative is outer material rather than evidence that AB45 itself should absorb the whole demonstrative phrase.

The paper is primarily a segmentation study, so its morphological bracketing is not treated as decisive syntactic proof beyond the explicit contrasts it discusses.

## Source 3 — Xia 2025

Source ID: `SRC-XIA-2025-CLASSIFIERS`

Citation: Hengliang Xia. 2025. “Syntax of Classifiers and Measure Words in Three Chinese Languages.” *Proceedings of the 2025 Annual Conference of the Canadian Linguistic Association*.

Verification: official Canadian Linguistic Association proceedings full text.

### Exact locators and supported propositions

1. p. 1: Mandarin, Cantonese, and Northern Wu are described as requiring a classifier when a numeral combines with a noun; the normal classifier-NP order is `Num-CL-N`.
2. pp. 1–2: Xia explicitly distinguishes **classifiers** from **measure words**, describing them as potentially different categories with different syntactic behavior. Measure words include container, group, partitive, and standard-measure types.
3. pp. 3–6 / Table 1: Cantonese classifier and measure-word distributions are compared and are not identical. This is direct evidence against silently treating every numeral + unit expression as one undifferentiated classifier construction.
4. p. 8, discussion following example (14): head nouns in `Num-CL-N` may be elided while classifiers may not; Xia states that Cantonese and Northern Wu do not differ from Mandarin in this diagnostic.
5. pp. 10–11: Xia proposes a right-branching `Num-[CL-N]` structure for Cantonese classifier NPs, while separately assigning Cantonese measure-word NPs to a different measure-phrase structure.

### AB45 consequence

Xia independently supports an overt Cantonese `Num-CL-N` core and the possibility of noun ellipsis with an overt classifier. More importantly for the current fixture audit, the paper directly warns against conflating classifiers with measure words.

Therefore, runtime cases such as age, length, conventional-unit, container-measure, or other numeral-unit expressions cannot inherit AB45’s classifier-NP evidence merely because the parser currently exposes a shared `classifier` or quantity slot. Their exact classification requires profile-specific evidence.

Xia’s Cantonese survey involved Hong Kong/Guangzhou Cantonese speakers, but this source remains one research contribution rather than a substitute for Canto Span’s independent native-panel requirements.

## Combined source-bounded profile

### Direct core: overt Num–CL–N

The strongest common source-supported AB45 profile is:

```text
numeral + classifier + overt nominal head
```

Examples directly or closely represented by the sources include:

- `一個蘋果`
- `三本書`
- `兩個人`

This supports the structural family represented by ordinary count-classifier examples such as `兩本書`, `三隻貓`, `兩個老師`, and other semantically compatible numeral-classifier-noun combinations when the classifier itself is independently established for that noun class.

### Separately supported profile: Num–CL–ØN under noun ellipsis

A head noun may be omitted when recoverable from context, but the classifier remains overt:

```text
Num + CL + ØN
```

Lam et al.’s `兩本` contrast and Xia’s ellipsis discussion support this profile. It must be distinguished from:

- a bare numeral;
- arbitrary context-free truncation;
- a lexical unit/measure expression with no omitted noun analysis.

Canto Span may eventually decide whether this profile shares one runtime identity with overt-head AB45 or deserves an explicit wrapper/subtype. This research task does not make that implementation decision.

### Outer demonstrative composition

`D-(Num)-CL-N` is independently attested. A demonstrative can therefore compose outside quantified classifier material, but this does not require AB45 itself to absorb the demonstrative span. Existing demonstrative/modified-NP identities should retain their own evidence and structural responsibility.

## Profiles not established as AB45 by these sources

### Wh quantity + classifier

The current sources do not directly establish `幾多 + CL + N` as the same `X-C-N` construction. Bond & Sio explicitly restrict their analysis to numeral `X`; Lam and Xia’s relevant classifier-NP discussion is likewise numeral-based.

Disposition: **unresolved AB45 boundary**, not negative evidence against wh quantity generally.

### Measure, age, and dimension expressions

Xia explicitly distinguishes classifiers from measure words and gives them different syntactic analyses. The current attached sources do not directly classify runtime examples such as `三歲`, `五百呎`, or predicate-like dimension/age strings as AB45 classifier NPs.

Disposition: **do not use AB45 classifier evidence for these profiles without separate source support**.

### Classifier–noun incompatibility controls

Examples such as `三本水` or `三杯書` may be useful implementation or compatibility controls, but their rejection can arise from classifier–noun selection rather than the Num–CL–N syntax itself.

Disposition: retain only as explicitly labeled compatibility controls; do not treat them as clean negative evidence for AB45 word order or constituency.

### Bare numeral

Lam et al. directly contrast bare `兩` with licensed `兩本` under ellipsis.

Disposition: bare numeral is outside the source-supported AB45 profile.

## Source-bounded research disposition

`RETAIN_NARROW_RESEARCH_PENDING`.

AB45 has a strong, independently documented Cantonese classifier-NP core, but the current runtime/test label covers more than that core. The next step is a fixture-scope audit separating overt Num–CL–N and contextual Num–CL ellipsis from measure/unit, wh-quantity, demonstrative-wrapper, and classifier-compatibility profiles.

No runtime, fixture expectation, construction identity, or linguistic-status change is authorized by this source inventory.
