# Cognition-delimitative, speech-effect, and intention source map (CP021B-R31)

Date: 2026-07-19  
Scope: claim-level research mapping only; **no parser behavior, fixtures, manifest data, accepted version, or held-out file changed or opened**.

## Family selected

After verifying R30, fifteen unmapped language labels remained. `ProductiveVO` and `TransitiveVP` still dominate accepted-fixture reach but remain implementation umbrellas, not coherent research constructions. R31 maps five connected dormant Lane 08 labels:

- `CognitionDelimitedVP`
- `CognitionDelimitedObjectVP`
- `DitransitiveSpeechVP`
- `SpeechTransferClause`
- `IntentionFrame`

All five have zero top-level occurrences in the non-held-out 545-case accepted regression snapshot. They are mapped because their templates make explicit lexical-selection and wrapper claims that can now be tested against exact sources.

## Runtime extraction

### CognitionDelimitedVP

The runtime requires `cognition_predicate + 吓` and creates a cognition-specific node. The overt structure duplicates the already mapped general `DelimitedVP` family, while the semantic-class restriction is not independently established.

### CognitionDelimitedObjectVP

The runtime adds one required `object` after the cognition-delimitative node. Its slot-model example is `諗吓 + 音樂嘅嘢`; that example is internal design material and has no accepted fixture family.

### DitransitiveSpeechVP and SpeechTransferClause

The inner template is `speech_verb + recipient + cognition_predicate`, with `話你知` as the motivating surface. The outer clause adds only an optional subject and particle. Both labels are unexercised in accepted snapshots.

### IntentionFrame

The generative template permits an optional subject, any token assigned `intention_predicate`, a VP, and an optional particle. A fallback separately wraps any core containing `諗住`.

## Source-derived boundaries

### 1. Cognition + 下/吓 is attested, but the cognition-only wrapper is not independently motivated

Sio and Bond include `吓` in their outer-aspect inventory and impose lexical/aspectual compatibility restrictions. The uploaded coursebook directly gives `你諗下係唔係`, where the material following `諗下` is visibly a polar clause. This supports overt cognition plus delimitative marking and typed content, not a universal cognition-only VP node or a generic direct-object analysis.

### 2. The exact `諗吓音樂嘅嘢` template remains a gap

The runtime's music-content NP is not an external attestation. Existing sources establish the components and show a clausal-content alternative, but they do not prove the exact generic `CognitionDelimitedObjectVP` template. Component evidence is not combined-template evidence.

### 3. `話你知` is an attested communication-effect sequence

Yip and Matthews describe communication acts as combining `講/話` for the speaker's act with `聽/知` for the effect on the hearer and give exact `我唔話你知`. This supports a bounded lexical sequence with an overt recipient and overt effect predicate.

It does not establish unrestricted `speech_verb × recipient × cognition_predicate` productivity. Matthews's serial-verb diagnostics also require constructional unity and preserve competing analyses; adjacency alone does not prove either a canonical ditransitive or one settled serial-verb structure.

### 4. SpeechTransferClause is a transparent wrapper candidate

The exact surface can form an ordinary clause with a subject and negation. No independent marker distinguishes the outer `SpeechTransferClause` from ordinary clause composition around the sourced communication predicate. The inner sequence should be retained; the duplicate wrapper should be merged or retired unless it carries necessary provenance.

### 5. `諗住` has a sourced intention use and sourced polysemy

Kędzior gives exact `我諗住返屋企` and states that a small group of verbs change meaning with `住`; `諗住` can mean intend/plan. The uploaded coursebook separately glosses `諗住` as “想着；以為”. Thus token presence is insufficient: planning, maintained thought/attention, assumption, and ordinary continuous `V住` must remain distinguishable.

## Dispositions

| Label | Disposition | Parser-facing consequence |
|---|---|---|
| `CognitionDelimitedVP` | `SOURCE_LINKED_COGNITION_DELIMITATIVE_FORM_WITH_LEXEME_SELECTION_AND_ORDINARY_DELIMITATIVE_MERGE_REQUIRED` | Merge with ordinary delimitative composition plus lexeme-specific selection; retain overt 吓 and exact evidence. |
| `CognitionDelimitedObjectVP` | `SOURCE_LINKED_COGNITION_DELIMITATIVE_COMPLEMENT_TYPE_SPLIT_AND_EXACT_OBJECT_TEMPLATE_GAP` | Split NP, propositional, polar-clausal, and omitted content; keep the exact music-NP profile as a gap. |
| `DitransitiveSpeechVP` | `SOURCE_LINKED_COMMUNICATION_EFFECT_SERIAL_SEQUENCE_WITH_LEXICAL_PAIRING_AND_DITRANSITIVE_REALIGNMENT_REQUIRED` | Retain exact 話+recipient+知 and both verbal elements; prohibit unrestricted category cross-products and a forced English ditransitive analysis. |
| `SpeechTransferClause` | `SOURCE_LINKED_TRANSPARENT_SPEECH_EFFECT_CLAUSE_WRAPPER_MERGE_OR_RETIRE` | Merge or retire the outer wrapper while preserving ordinary clause structure around the communication sequence. |
| `IntentionFrame` | `SOURCE_LINKED_LEXICALIZED_NAM2ZYU6_INTENTION_WITH_CONTINUATIVE_POLYSEMY_AND_COMPLEMENT_NARROWING_REQUIRED` | Narrow to lexicalized 諗住 senses and typed complements; separate planning from other 諗住 and V住 readings. |

## Forbidden inferences

R31 does not authorize:

- treating every cognition predicate as compatible with `吓`;
- treating `吓` as establishing an object relation;
- treating every constituent after `諗吓` as an NP object;
- using the internal `音樂嘅嘢` example as linguistic authority;
- generating every speech verb with every recipient and cognition predicate;
- swallowing `知` into an English gloss or inserting unspoken reported content;
- presenting the formal analysis of `話你知` as settled;
- requiring a separate `SpeechTransferClause` wrapper merely because the full clause is attested;
- treating every `諗住` as future intention;
- treating the lexical intention use as ordinary productive continuous aspect;
- deleting overt `住` or inserting a hidden plan;
- changing parser behavior during the research freeze.

## Open evidence gaps

- direct corpus distribution and lexeme restrictions for cognition + `下/吓`;
- exact external attestation and discourse function of `諗吓音樂嘅嘢`;
- operational diagnostics among NP object, proposition, polar clause, and discourse-linked content after cognition predicates;
- modern corpus frequencies and prosody for `話你知` and related communication-effect sequences;
- lexical inventory and regional variation for `講/話 + recipient + 聽/知`;
- structural diagnostics distinguishing serial, complement, causative/effect, and other analyses;
- corpus diagnostics separating intention, assumption, maintained thought, and ordinary aspectual readings of `諗住`;
- independent native structural analysis; the project still has zero native expert analyses.

## Freeze result

This checkpoint changes research provenance only. Parser code, grammar templates, roles, glosses, fixtures, tests, manifest data, accepted behavior, and held-out files remain unchanged.
