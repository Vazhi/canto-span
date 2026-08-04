# ISSUE-411 ModalVP / DesiderativeVP / PreferenceVP lexical-scope disposition R1

Parent issue: #411  
Work claim: #549  
Date: 2026-08-04

## Decision

Do not treat broad `ModalVP`, `DesiderativeVP`, and `PreferenceVP` as source-equivalent Cantonese construction identities.

The reviewed evidence and prior source map support a decomposition disposition:

1. broad runtime modal wrappers are parser conveniences, not linguistic evidence;
2. each modal/desiderative/preference lexeme needs its own lexical, polarity, complement, and scope profile;
3. no identity allocation, status migration, or runtime rewrite is justified by this issue alone.

This packet resolves #411 by recording the decomposition map and blocking broad implementation until lexeme-stratified evidence exists.

## Assumption-level research review

### Assumption A — `想`, `要`, `可以`, `會`, `識`, and `唔使` are not interchangeable modal auxiliaries

Supported.

Already reviewed project packets and standard Cantonese learning materials distinguish at least:

- `想`: desire / intention toward a VP, also separate from cognition “think” uses;
- `要`: desire/necessity and also main-verb / lexical uses;
- `可以`: permission or possibility;
- `會`: prediction, future, or ability depending on context;
- `識`: know-how / skill ability, distinct from recognizing a person or knowing a fact;
- `唔使`: lack of need / no obligation, not just the negation of `要`.

Therefore a cross-product `ModalVP` label cannot be treated as a single source-backed language construction.

### Assumption B — `DesiderativeVP` can remain `想`-only while distinct `要` uses are ignored

Not supported.

The issue correctly identifies that `想` and `要` must not be collapsed, but also that `DesiderativeVP` being `想`-only does not settle the desire/necessity `要` family. The terminal outcome must be a lexical-scope map, not a broad desiderative promotion.

### Assumption C — `PreferenceVP` is settled by detecting `鍾意`

Not supported.

`鍾意` can take different complement types, including NP and VP-like material in ordinary Cantonese. A preference identity must distinguish at least object preference, activity preference, clause/discourse preference, and alternative-choice composition. The #392 packet already keeps lexical preference ownership separate from alternative-choice and scalar layers.

### Assumption D — broad runtime coverage can be used as linguistic evidence

No.

The issue notes broad runtime occurrence counts. These are useful for prioritizing cleanup but have zero independent linguistic-evidence weight and cannot justify identity or status decisions.

## Decomposition disposition

### Modal family

Retain as parser/coverage area only until lexeme profiles are separately reviewed.

Required future profile splits include:

- permission/possibility `可以`;
- prediction/future/ability `會`;
- know-how `識`;
- obligation/necessity/desire `要`;
- no-need `唔使`;
- modal ellipsis and visible-predicate cases;
- A-not-A and suppletive polarity for each lexeme.

### Desiderative family

Retain `想 + VP` as a source-supported desiderative/intention profile, but do not allow it to absorb `要`, cognition `想`, or arbitrary serial VP chains.

Required future distinctions:

- `想` desire/intention;
- `想` cognition / thinking;
- `要` desire;
- `要` obligation/necessity;
- `要` main-verb “want / need / take” cases;
- complement span and scope in multi-VP sequences.

### Preference family

Retain `鍾意` as a lexical preference predicate family, not a single settled complement identity.

Required future distinctions:

- `鍾意 + NP`;
- `鍾意 + VP/activity`;
- `鍾意 + clause/discourse material`;
- `鍾意 A 定/定係 B 多啲` as preference plus alternative-choice composition;
- negation and A-not-A profiles;
- ellipsis and fragments.

## Terminal disposition

- Broad `ModalVP`: parser umbrella, not source-equivalent construction identity.
- `DesiderativeVP`: retain `想 + VP` narrowly; do not broaden to all desire/necessity uses.
- `PreferenceVP`: retain as lexical-predicate research family; complement profiles remain unresolved.
- New UUIDs: no, not from this issue.
- Runtime change: no.
- Status promotion: no.
- Current terminal state: decomposition / evidence blocker / no runtime action.

## Future work retained

Do not open a runtime issue yet. A later ready issue should be a non-runtime lexeme-stratified evidence packet that samples actual corpus/runtime examples by lexeme and classifies:

- auxiliary versus main-verb use;
- complement type;
- polarity and A-not-A behavior;
- ellipsis and fragment cases;
- scope in multi-VP sequences;
- false positives from parser-only umbrella labels.

Only after that packet should runtime narrowing or identity work be opened.

## Protected-state disposition

This packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- CantoWords `想`: `https://cantowords.com/dictionary/想`
- Open Cantonese `識` know-how modal: `https://opencantonese.org/books/cantonese-life-1/unit-1/lesson-4/4-6-the-modal-verb-sik1-to-know-how-to`
- CantoWords `得唔得` acceptability/permission evidence, relevant to modal boundaries: `https://cantowords.com/dictionary/得唔得`
- CantoneseLearning `或者` vs `定係`, showing lexical preference can compose with alternative choice: `https://www.cantoneselearning.com/lesson/comparison/or-in-cantonese`
