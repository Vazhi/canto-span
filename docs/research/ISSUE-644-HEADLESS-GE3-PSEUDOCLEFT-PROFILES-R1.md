# ISSUE-644 headless 嘅 ge3 and pseudocleft-like profile disposition R1

Parent issue: #644  
Work claim: #645  
Date: 2026-08-06

## Decision

Retain the Week 18 item:

```text
你講嘅係邊個？
nei5 gong2 ge3 hai6 bin1 go3?
```

as a source-supported **headless `ge3` constituent inside a pseudocleft-like copular question**, with the exact internal theoretical analysis left open.

The visible structure is:

```text
[你講嘅] [係] [邊個]
[clause + ge3] COP wh-nominal
```

Independent scholarship supports all of the following relevant facts:

1. Cantonese has overt-head `clause + 嘅 + noun` relative or noun-modifying clauses.
2. `ge3` has nominalizing and pronominal/headless uses in which no overt noun follows it.
3. Cantonese has pseudocleft-like `[headless clause + ge3] + 係 + nominal` structures.
4. A recent peer-reviewed conference analysis argues that the pre-copular headless `ge3` constituent in that construction is a predicate in an inverted predicational copular clause.

These findings support the family and the visible span. They do not force the repository to choose among a deleted-head relative analysis, a light/pronominal nominalizer analysis, and the predicate analysis. They also do not directly adjudicate the exact wh-question variant with post-copular `邊個`.

Terminal disposition for I002:

```text
HEADLESS_GE3_PSEUDOCLEFT_LIKE_QUESTION_SUPPORTED;
EXACT_INTERNAL_ANALYSIS_AND_WH_CONFIGURATION_NOT_UNIQUELY_ESTABLISHED
```

No hidden noun such as `人`, `嘢`, or `嗰個` is reconstructed. No parser, identity, status, source, corpus, survey, or release change is authorized.

## Profile dispositions

| Profile | Disposition | Reason |
|---|---|---|
| `clause + 嘅 + overt noun` | `SOURCE_SUPPORTED_OVERT_HEAD_NOUN_MODIFICATION` | Direct Cantonese relative-clause and noun-modifying-clause research supports the order. |
| `clause + 嘅` with no overt following noun | `SOURCE_SUPPORTED_HEADLESS_OR_NOMINALIZED_CONSTITUENT` | Nominalization scholarship directly recognizes headless/pronominal uses of `ge3`. |
| `[clause + 嘅] + 係 + overt nominal` | `SOURCE_SUPPORTED_PSEUDOCLEFT_LIKE_PROFILE` | Lam gives the close pattern and analyzes the pre-copular constituent as a headless relative predicate. |
| `[clause + 嘅] + 係 + 邊個` | `CLOSE_PROFILE_SUPPORTED_EXACT_WH_VARIANT_NOT_DIRECTLY_ANALYZED` | I002 attests the exact string; direct pseudocleft scholarship uses a post-copular nominal rather than this wh form. |
| deleted overt noun inside `你講嘅` | `NOT_RECONSTRUCTED` | Multiple analyses are available; the surface does not identify one omitted lexical head. |
| possessive `NP + 嘅` | `SEPARATE_ADNOMINAL_OR_PRONOMINAL_PROFILE` | Possession and headless clause nominalization share form but not automatically structure or meaning. |
| sentence-final assertion `嘅` | `SEPARATE_UTTERANCE_PARTICLE_PROFILE` | Sentence-final mood/assertion use is independently distinguished from adnominal or nominalizing `ge3`. |
| classifier relative without `嘅` | `SEPARATE_RELATIVE_OR_NOUN_MODIFYING_PROFILE` | Cantonese has classifier relatives with different form and reference properties. |
| generic character-only `嘅` rule | `REJECTED` | The morpheme is polyfunctional; surrounding structure is required. |
| new umbrella `GeConstruction` identity | `NOT_JUSTIFIED` | The evidence requires several separate profiles rather than one token-based construction. |

## Overt-head noun modification

Direct relative-clause research describes Cantonese `ge3` relatives in the order:

```text
modifying clause + 嘅 + head noun
```

For example:

```text
佢食嘅糖
keoi5 sik6 ge3 tong2
‘the candy or candies that she eats’
```

Matthews and Yip’s broader noun-modifying-clause analysis cautions that the relationship between the modifying clause and the head may be grammatically determined or interpreted through semantic and pragmatic relations. The linker alone therefore does not supply one universal role.

The repository’s current AA07 `GeMarkedNominalModifierNP` is limited to overt `modifier + 嘅 + noun`. I002 lacks the overt head required by that identity. No AA07 identity or evidence transfer is authorized.

## Headless or nominalized `ge3`

Nominalization scholarship traces Cantonese `ge3` through pronominal, relative-marker, and nominalizer functions and explicitly recognizes headless-relative or nominalized constituents. This establishes that a clause ending in `嘅` can form a referential or nominalization-related constituent without an overt following noun.

The evidence does not require a deletion derivation. Analyses include:

- an omitted or understood nominal head;
- a pronominal or light-head `ge3` corresponding roughly to ‘the one(s)’;
- a nominalizer creating a referential constituent;
- a headless relative-clause analysis.

Canto Span should preserve the overt clause and `嘅` while remaining theory-neutral unless a later identity decision explicitly selects an analysis.

## Pseudocleft-like copular structure

Lam’s peer-reviewed 2025 conference abstract gives the close Cantonese pattern:

```text
Mary 今朝整嘅 係 呢個蛋糕
‘What Mary made this morning is this cake.’
```

The pre-copular constituent contains no overt nominal head or wh-pronoun. Lam calls it a headless relative clause but argues that it functions as a predicate, yielding an inverted predicational copular clause.

This directly supports a pseudocleft-like family with:

```text
[clause + 嘅] + 係 + nominal
```

I002 matches that surface organization but differs in two important respects:

1. the post-copular expression is interrogative `邊個`;
2. the source translation asks which referent the addressee is discussing.

The exact wh configuration is therefore compatible with, but not fully analyzed by, the close pseudocleft source. The packet records the family without promoting Lam’s predicate analysis into the only permitted parse.

## I002 interpretation

```text
你講嘅係邊個？
```

The source translation is:

```text
Which one are you talking about?
```

The visible `邊個` may ask for a person or contextually selected individual. This packet does not replace the source translation and does not infer a hidden noun from English.

Supported conclusions:

- `你講嘅` is a complete headless `ge3` constituent;
- it precedes copular `係`;
- `邊個` is the overt wh nominal;
- the full string belongs to the pseudocleft-like or specificational-copular neighborhood.

Unresolved conclusions:

- whether `你講嘅` is syntactically nominal or predicative in this exact question;
- whether an unpronounced lexical head is present;
- whether the copular clause is inverted predicational, specificational, identificational, or structurally ambiguous;
- which semantic role is understood inside `講` without discourse context;
- whether the source translation is person-specific or broadly individual-denoting in every context.

## Collision boundaries

Keep separate from the I002 profile:

- `你講嘅人` or `你講嘅嘢`, with an overt head noun;
- `你嘅`, as a possessive or pronominal possessive;
- `呢個係你嘅`, where possessive `你嘅` is post-copular;
- sentence-final assertion or explanatory `嘅`;
- `係…嘅` focus or assertion constructions;
- classifier relatives such as `佢食嗰粒糖`;
- demonstrative-classifier forms without overt nouns;
- fragment answers ending in `嘅` that require discourse;
- lexicalized compounds and quoted occurrences;
- contractions such as `㗎` with separate particle analysis.

## Repository consequence

Bounded inspection found:

- AA07 `GeMarkedNominalModifierNP` owns overt-head `modifier + 嘅 + noun` only and is currently an unsupported-generalization wrapper pending rename/decomposition;
- the broad `ModifiedNP` implementation aggregate is not an evidence-bearing owner for headless I002;
- no dedicated current identity was found for headless clause nominalization or the complete pseudocleft-like profile.

This is a representation gap, not evidence for immediate UUID allocation.

## Terminal outcome

- overt-head `ge3` noun modification: `SOURCE_SUPPORTED_SEPARATE_PROFILE`.
- headless `clause + ge3`: `SOURCE_SUPPORTED_WITH_COMPETING_ANALYSES`.
- pronominal/light-head interpretation: `SUPPORTED_ANALYSIS_OPTION`.
- nominalizer/headless-relative interpretation: `SUPPORTED_ANALYSIS_OPTION`.
- predicate analysis in pseudoclefts: `DIRECTLY_PROPOSED_FOR_CLOSE_PROFILE`.
- full `[clause + ge3] + 係 + nominal`: `SOURCE_SUPPORTED_PSEUDOCLEFT_LIKE_PROFILE`.
- exact `[你講嘅] + 係 + 邊個`: `SUPPORTED_ATTESTATION_IN_CLOSE_PROFILE; EXACT_PARSE_UNRESOLVED`.
- hidden noun reconstruction: `NOT_AUTHORIZED`.
- AA07 identity transfer: `NOT_AUTHORIZED`.
- new UUID, runtime, or status change: no.

## Next separately claimed action

Open one bounded parser-output audit for I002 and controlled contrasts. It should test whether current output preserves:

1. the full `你講嘅` span without inserting a noun;
2. copular `係` outside the headless constituent;
3. overt post-copular `邊個` as wh nominal material;
4. the distinction from overt-head `你講嘅人／嘢`;
5. the distinction from possessive `你嘅`;
6. the distinction from sentence-final `嘅` and `係…嘅`;
7. full punctuation and surface fidelity.

If the parser lacks a bounded constituent type, open a separate identity/composition issue. That issue should compare a theory-neutral `ClauseGe3WithoutOvertHead` identity against a broader pseudocleft construction, rather than silently extending AA07.

A contextual corpus task should later collect naturally occurring `[clause + 嘅] + 係 + wh/nominal` examples with discourse context before any productivity or interpretation claim.

## Protected-state confirmation

This packet changes no immutable source value, parser detector, runtime template, test, generated output, version, UUID, code, canonical name, linguistic status, readiness record, corpus classification, survey, panel result, held-out evidence, release, package, or deployment state.

It does not modify the active AB33 question-repair or AA84 manner implementation scopes.

## Source inventory

See `docs/research/ISSUE-644-HEADLESS-GE3-PSEUDOCLEFT-SOURCE-INVENTORY-R1.md`.
