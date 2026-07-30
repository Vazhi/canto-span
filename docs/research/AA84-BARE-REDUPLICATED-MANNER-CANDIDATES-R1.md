# AA84 bare reduplicated manner candidates — R1

## Scope and decision boundary

This is a findings-only review of the bare repeated-material path currently reachable through `MannerAdverbialVP`. It asks whether attested checked-in and frozen-corpus evidence supports a productive Cantonese construction equivalent to “any two identical stative nodes before a VP,” a narrower lexical or morphological profile, or only an internal heuristic.

This work changes no permanent UUID, construction identity, linguistic status, runtime behavior, fixture, corpus source, survey, panel, held-out, release, deployment, or merge state.

## Repository mismatch that triggered the review

The active fallback accepts two surface-identical nodes that both satisfy a broad `stative_predicate` test and precede an action, movement, or VP node. It does not require:

- a reviewed reduplicative lexeme;
- one morphological unit rather than speech repetition;
- Jyutping or tone evidence;
- a source-supported reduplication subtype;
- a demonstrated modifier–host relation;
- exclusion of temporal, distributive, quantity, event, name, sound-symbolic, or repair profiles.

The active construction note has one source-linked overt-`噉` example and one zero-weight bare reachability probe, `佢慢慢行`. Prior AA84 research established that bare reduplication, reduplication with `地／噉`, and property + `咁／噉` are distinct strategies and should not be treated as one surface template.

## Primary-source result

The focused primary-source ledger is `AA84-BARE-REDUPLICATION-PRIMARY-SOURCE-LEDGER-R1.tsv`.

The sources jointly establish the following limited claims:

1. Bare preverbal reduplicated manner adverbs are real in Cantonese. Wong et al. directly gives `慢慢行，唔好跑呀`, and two independent authoritative corpus coding systems classify bare `maan6maan2` as a manner adverb.
2. Bare and overt-`地／噉` strategies must remain distinct. The same source traditions separately code or exemplify bare `慢慢`, `乖乖地`, `麻麻地`, and `細細聲噉` types.
3. Cantonese reduplication is not predictable from spelling alone. Yip and Matthews explicitly warn that novel forms can be hit or miss; Chan and Lee document tonal and speaker variation in related reduplication patterns.
4. Some conventional AABB adverbs can be bare, but this does not create an unrestricted AA/AABB parser rule.
5. `噉 gam2` and `咁 gam3` must be separated by pronunciation and function rather than glyph identity.

The primary sources therefore support a bare manner domain but not the current generic surface-equality licensing condition.

## Deterministic corpus endpoint

Query: `HKCANCOR-AA84-BARE-REDUP-R1`.

The query retains:

- every lexical HKCanCor token whose complete written form consists of two identical halves; and
- every pair of exactly adjacent lexical tokens with identical written forms when an `ADJ`, `AUX`, or `VERB` cue appears within the next five lexical tokens.

It does **not** infer reduplication, tone change, manner, adverbial status, constituency, lexicalization, productivity, or construction membership.

Frozen distribution:

- 58 source files;
- 16,162 utterances;
- 153,656 words;
- 444 candidate rows;
- 300 internally repeated tokens;
- 144 adjacent identical-token rows;
- 347 rows with a broad local predicate cue;
- 97 deliberate no-host controls.

The full 444-row inventory remains checked in as provenance.

## Bounded expert packet

The R2 packet contains 167 rows:

- every declared manner/property anchor;
- every exact adjacent-adjective collision with the current runtime condition;
- capped internal `ADJ`, `ADV`, and `VERB` strata per written base and host status;
- capped temporal, distributive, quantity, event, name/kinship, and sound-symbolic anchors;
- one fixed control for each remaining repetition-mode/POS/host combination.

The packet is mechanically stratified, not a prevalence sample. Its proportions must not be interpreted as corpus frequencies.

All 167 rows have complete expert decisions and pass `verify-bare-redup-decisions-r2.py`.

## Direct positive corpus evidence

Eight rows are clear bare manner modifiers.

| Candidate | Source location | Surface / Jyutping | Overt host | Analysis |
|---|---|---|---|---|
| `aa84br-7a140f4b02ff1620f5b8` | `FC-009b_v.cha`, turn 12 | `慢慢` `maan6maan1` | `行` | gradual/process manner |
| `aa84br-8bba4d83e71013862755` | `FC-020_v.cha`, turn 274 | `慢慢` `maan6maan2` | `揾` | gradual search process |
| `aa84br-65949ba1d2e6ae5b08cf` | `FC-048_v2.cha`, turn 112 | `慢慢` `maan6maan2` | `歎` | unhurried enjoyment |
| `aa84br-bb8cc991d426236c1df0` | `FC-108a_v2.cha`, turn 192 | `好好` `hou2hou2` | `對` | manner ‘treat someone well’ |
| `aa84br-0bab6a1c370dc2bd3417` | `FC-108c_v2.cha`, turn 295 | `慢慢` `maan6maan2` | `來` | unhurried/gradual process |
| `aa84br-8dc9389d196feaa88861` | `FC-108c_v2.cha`, turn 296 | `慢慢` `maan6maan2` | `行` | gradual/slow walking |
| `aa84br-7bd78caf870eb7d82990` | `FC-R002a_v2.cha`, turn 164 | `慢慢` `maan6maan2` | `覺得` | gradual development of a mental state |
| `aa84br-56adeb32f815707a4137` | `FC-R007_v2.cha`, turn 42 | `慢慢` `maan6maan2` | `食` | slow/unhurried eating |

These rows establish:

- seven direct `慢慢 + predicate` attestations across six source files and seven host occurrences;
- one direct second-lexeme `好好 + 對` attestation;
- verbal, movement, consumption, enjoyment, search, and mental-process hosts;
- no overt `咁／噉／地` marker;
- a visible modifier–host relation rather than mere local token proximity.

Under HKCanCor tokenization, all eight positives are one internally repeated token. **None of the 50 adjacent-identical-token packet rows is a genuine manner example.** This directly undermines an unrestricted “two identical nodes + VP” runtime condition.

## Tone and tokenization boundary

The direct `慢慢` rows preserve both:

- `maan6maan1` — one row; and
- `maan6maan2` — six rows.

The source grammar directly reports `maan6-maan2`, while related morphophonological work documents tone and speaker variation in reduplication. The corpus variation must therefore remain visible. This review does not normalize the second copy to one tone, infer a productive tone rule, or treat written `慢慢` as sufficient phonological evidence.

## Complete decision distribution

| Classification | Rows |
|---|---:|
| genuine bare manner modifier | 8 |
| temporal/frequency expression | 17 |
| distributive expression | 21 |
| quantity/degree expression | 10 |
| event reduplication or progressive `-下` | 24 |
| property predication or attribution | 29 |
| lexicalized non-manner adverb | 2 |
| nominal, name, kin term, acronym, or placeholder | 27 |
| sound-symbolic or fixed lexeme | 16 |
| discourse repetition, hesitation, or repair | 9 |
| other lexical or structural profile | 3 |
| ambiguous boundary | 1 |
| **Total** | **167** |

Confidence: 166 high, 1 medium. The medium row is discourse-level `慢慢` with no recoverable overt local host; it is not counted as direct positive evidence.

## Major negative boundaries

### Temporal and frequency

`啱啱`, `日日`, `朝朝`, `晚晚`, `年年`, `次次`, `下下`, and `初初` locate or quantify events. Their preverbal position does not make them manner modifiers.

### Distributive and quantificational

`個個`, `人人`, `樣樣`, `份份`, `間間`, `度度`, `張張`, and related classifier forms distribute a predicate over a set. `少少`, `啲啲`, and `et1et1` express amount or degree.

### Event reduplication and `-下`

`食食下`, `行行下`, `睇睇下`, `做做下`, `玩玩下`, `聽聽下`, `試試`, `講講`, `睇睇`, and `等等佢` are eventive, delimitative, iterative, progressive, or repaired verbal profiles. They do not supply a property-derived manner constituent.

### Property and overt-marker profiles

`細細條`, `淡淡嘅無奈`, `麻麻`, `平平哋`, `杏杏哋`, `潺潺地`, `大大下`, and emphatic/property `好好` rows are property, attribution, overt-marker, change-state, or degree structures. They cannot be donated to the bare manner branch.

### Lexical, nominal, sound, and repair profiles

`明明` and `偏偏` are conventional sentential adverbs. Names and kin terms such as `爸爸`, `媽媽`, `哥哥`, `太太`, and `玲玲` are lexical nominals. `拜拜`, `卜卜聲`, `唥唥聲`, `Zip1Zip1聲`, and quoted nonlexical strings are fixed or sound-symbolic. Adjacent `唔唔`, `嗰嗰`, `好似好似`, and many `好好` sequences are hesitation, repair, emphasis, or separate syntactic words.

## Disposition

### Linguistic finding

A bare reduplicated manner domain is established, but the reviewed natural corpus evidence has a narrow center:

- `慢慢` is robustly attested as a lexical/morphological gradual-process modifier across multiple hosts and files.
- `好好對` establishes at least one additional bare AA manner lexeme.
- Primary sources independently support further conventional bare patterns, including AABB adverbs, while warning that productivity is not fully predictable.

The evidence does **not** justify an unrestricted productive rule over any repeated adjective, any identical written halves, or any two surface-identical nodes.

### Parser finding

The current bare fallback should not survive unchanged. A later separately authorized migration should:

1. separate bare reduplicated manner from `GamMarkedReduplicatedMannerVP` and overt `地／噉` profiles;
2. require an overt compatible host and a reviewed lexical/morphological reduplicative profile;
3. preserve one-token versus adjacent-token structure;
4. preserve attested Jyutping and avoid invented tone normalization;
5. exclude temporal, distributive, quantity, event-`下`, property, name/kinship, sound-symbolic, acronym, and repair profiles before manner assignment;
6. begin with a narrow verified lexical inventory rather than open-class written equality;
7. treat `慢慢` as implementation-ready evidence for a narrow subtype, while retaining `好好 + V` and broader source-described forms as separately testable lexical/productivity candidates.

A neutral provisional name for the bare child is `BareReduplicatedMannerAdverbVP`. This is a recommendation only; no identity or UUID is created here.

## Evidence readiness and next dependency

This findings package supports a later identity/parser specification, not immediate productive promotion. Before open-class broadening:

- controlled native contrasts should test verified forms against novel repeated adjectives;
- `好好 + V` host restrictions should be tested separately from degree/property `好好`;
- overt `地／噉` alternants must be contrasted rather than silently reconstructed;
- held-out corpus or panel cases must include temporal, distributive, event-`下`, property, and repair negatives;
- runtime tests must verify that adjacent identical tokens are not accepted solely by equality.

No further general HKCanCor reduplication census is justified by this question. The next project task should be selected from the live inventory after these findings are merged, rather than automatically extending AA84.
