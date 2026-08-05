# ISSUE-644 headless 嘅 ge3 and copular-wh disposition R1

Parent issue: #644  
Work claim: #645  
Date: 2026-08-06

## Decision

Retain the Week 18 item:

```text
你講嘅係邊個？
nei5 gong2 ge3 hai6 bin1 go3?
```

as a directly attested **headless `ge3` copular wh question**:

```text
[你講嘅] [係] [邊個]
[clause + ge3] COP wh-nominal
```

Independent scholarship supports:

1. overt-head `clause + 嘅 + noun` relative or noun-modifying clauses;
2. nominalizing, pronominal, and headless uses of `ge3` without an overt following noun;
3. a close declarative pseudocleft-like `[clause + 嘅] + 係 + nominal` profile;
4. a predicate analysis for the pre-copular headless constituent in that close declarative profile.

No inspected qualifying source directly analyzes the exact wh configuration `[你講嘅] + 係 + 邊個`. I002 is therefore **compatible with** the pseudocleft-like family, but pseudocleft membership is not itself established as the unique analysis. Ordinary identificational or specificational copular analyses remain unresolved alternatives.

Terminal disposition:

```text
HEADLESS_GE3_COPULAR_WH_ATTESTATION;
PSEUDOCLEFT_LIKE_ANALYSIS_COMPATIBLE_NOT_UNIQUELY_ESTABLISHED;
INTERNAL_CATEGORY_AND_HIDDEN_HEAD_UNRESOLVED
```

No hidden noun such as `人`, `嘢`, or `嗰個` is reconstructed. No parser, identity, status, source, corpus, survey, or release change is authorized.

## Profile dispositions

| Profile | Disposition | Reason |
|---|---|---|
| `clause + 嘅 + overt noun` | `SOURCE_SUPPORTED_OVERT_HEAD_NOUN_MODIFICATION` | Direct Cantonese relative-clause and noun-modifying-clause research supports the order. |
| `clause + 嘅` without an overt following noun | `SOURCE_SUPPORTED_HEADLESS_OR_NOMINALIZED_CONSTITUENT` | Nominalization scholarship recognizes headless and pronominal uses of `ge3`. |
| `[clause + 嘅] + 係 + overt nominal` | `SOURCE_SUPPORTED_CLOSE_PSEUDOCLEFT_LIKE_PROFILE` | Lam directly gives the close declarative profile and proposes a predicate analysis. |
| `[clause + 嘅] + 係 + 邊個` | `EXACT_SOURCE_ATTESTATION_COMPATIBLE_WITH_CLOSE_PROFILE` | Glossika attests the wh question; no inspected scholarly source analyzes this exact configuration. |
| pseudocleft membership of I002 | `NOT_UNIQUELY_ESTABLISHED` | Identificational, specificational, and pseudocleft-like analyses remain available. |
| deleted overt noun inside `你講嘅` | `NOT_RECONSTRUCTED` | The surface and sources do not identify one omitted lexical head. |
| possessive `NP + 嘅` | `SEPARATE_ADNOMINAL_OR_PRONOMINAL_PROFILE` | Shared form does not establish shared structure or meaning. |
| sentence-final assertion `嘅` | `SEPARATE_UTTERANCE_PARTICLE_PROFILE` | Mood/assertion use is independently distinguished from nominalizing or adnominal `ge3`. |
| classifier relative without `嘅` | `SEPARATE_RELATIVE_OR_NOUN_MODIFYING_PROFILE` | Cantonese has classifier relatives with different form and reference properties. |
| generic character-only `嘅` rule | `REJECTED` | `ge3` is polyfunctional and requires structural context. |
| one umbrella `GeConstruction` identity | `NOT_JUSTIFIED` | The evidence requires separate profiles. |

## Overt-head noun modification

Direct relative-clause research gives the order:

```text
modifying clause + 嘅 + head noun
```

Example:

```text
佢食嘅糖
keoi5 sik6 ge3 tong2
‘the candy or candies that she eats’
```

Broader noun-modifying-clause research cautions that the relation between the clause and noun may be grammatical or semantically and pragmatically inferred. The linker alone does not assign one universal role.

AA07 `GeMarkedNominalModifierNP` is limited to overt `modifier + 嘅 + noun`. I002 has no overt head after `嘅`, so AA07 identity and evidence cannot transfer.

## Headless or nominalized `ge3`

Nominalization scholarship traces `ge3` through genitive, pronominal, relative-marker, and nominalizer functions and recognizes headless constituents. Available analyses include:

- an understood or omitted nominal head;
- pronominal or light-head `ge3`, roughly ‘the one(s)’;
- a nominalizer creating a referential constituent;
- a headless relative-clause analysis.

The evidence does not require a deletion derivation. Canto Span should preserve the overt clause and `嘅` without inserting lexical material or choosing a theory prematurely.

## Close pseudocleft-like profile

Lam’s peer-reviewed 2025 conference abstract gives:

```text
Mary 今朝整嘅 係 呢個蛋糕
‘What Mary made this morning is this cake.’
```

The pre-copular constituent has no overt nominal head or wh-pronoun. Lam calls it a headless relative and argues that it functions as a predicate in an inverted predicational copular clause.

This directly supports a close declarative family:

```text
[clause + 嘅] + 係 + nominal
```

I002 shares the surface organization but has post-copular interrogative `邊個`. The close source therefore supplies an analysis option, not a conclusive classification of I002.

## I002 interpretation

The source translation is:

```text
Which one are you talking about?
```

The visible facts are:

- `你講嘅` forms a headless `ge3` constituent;
- copular `係` follows it;
- `邊個` is the overt wh nominal;
- the complete string asks for identification of a contextually relevant referent.

Unresolved:

- whether `你講嘅` is nominal or predicative in this exact question;
- whether an unpronounced lexical head exists;
- whether the copular clause is pseudocleft-like, inverted predicational, specificational, identificational, or structurally ambiguous;
- which semantic role is understood inside `講` without discourse context;
- whether the source translation is person-specific in every context.

## Collision boundaries

Keep separate:

- `你講嘅人／嘢`, with an overt head noun;
- `你嘅`, as possessive or pronominal possessive;
- `呢個係你嘅`, with post-copular possessive material;
- sentence-final assertion or explanatory `嘅`;
- `係…嘅` focus or assertion constructions;
- classifier relatives such as `佢食嗰粒糖`;
- demonstrative-classifier forms without overt nouns;
- discourse fragments ending in `嘅`;
- lexicalized or quoted occurrences;
- contractions such as `㗎` requiring separate particle analysis.

## Repository consequence

Bounded inspection found:

- AA07 owns overt-head `modifier + 嘅 + noun` only and is already quarantined pending rename/decomposition;
- the broad `ModifiedNP` wrapper is not an evidence-bearing headless owner;
- no dedicated current identity was found for headless clause nominalization or the full copular-wh profile.

This is a possible representation gap, not evidence for immediate UUID allocation.

## Terminal outcome

- overt-head `ge3` noun modification: `SOURCE_SUPPORTED_SEPARATE_PROFILE`.
- headless `clause + ge3`: `SOURCE_SUPPORTED_WITH_COMPETING_ANALYSES`.
- pronominal/light-head analysis: `SUPPORTED_OPTION`.
- nominalizer/headless-relative analysis: `SUPPORTED_OPTION`.
- predicate analysis: `DIRECTLY_PROPOSED_FOR_CLOSE_DECLARATIVE_PROFILE`.
- close `[clause + ge3] + 係 + nominal`: `SOURCE_SUPPORTED_PSEUDOCLEFT_LIKE_PROFILE`.
- exact `[你講嘅] + 係 + 邊個`: `HEADLESS_GE3_COPULAR_WH_ATTESTATION`.
- pseudocleft analysis of I002: `COMPATIBLE_NOT_UNIQUELY_ESTABLISHED`.
- hidden noun reconstruction: `NOT_AUTHORIZED`.
- AA07 identity transfer: `NOT_AUTHORIZED`.
- new UUID, runtime, or status change: no.

## Next separately claimed action

Open one bounded parser-output audit for I002 and controlled contrasts. It should preserve:

1. the full `你講嘅` span without inserting a noun;
2. copular `係` outside that constituent;
3. post-copular `邊個` as wh nominal material;
4. overt-head `你講嘅人／嘢` as a separate profile;
5. possessive `你嘅` separately;
6. sentence-final `嘅` and `係…嘅` separately;
7. punctuation and full surface fidelity.

If a representation gap remains, a separate identity/composition issue should compare a theory-neutral `ClauseGe3WithoutOvertHead` constituent with full copular or pseudocleft structures. It must not extend AA07 through token presence.

A contextual corpus task should collect `[clause + 嘅] + 係 + wh/nominal` examples before any productivity or interpretation claim.

## Protected-state confirmation

This packet changes no immutable source value, parser detector, runtime template, test, generated output, version, UUID, code, canonical name, linguistic status, readiness record, corpus classification, survey, panel result, held-out evidence, release, package, or deployment state.

It does not modify active AB33 or AA84 scopes.

## Source inventory

See `docs/research/ISSUE-644-HEADLESS-GE3-PSEUDOCLEFT-SOURCE-INVENTORY-R1.md`.
