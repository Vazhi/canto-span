# Issue 744 — AB35 ProductiveVO behavior profiles R1

Date: 2026-08-10
Construction: AB35 `ProductiveVO`
Research disposition: mixed legacy family; do not broaden

## Behavior-first conclusion

The current public/runtime label `ProductiveVO` does not correspond to one source-supported Cantonese behavior.

The evidence requires at least this distinction:

1. **Ordinary transitive predicate–object relation** — lexical verbal predicate plus an independently typed NP object. This is the already re-audited AB78 behavior domain.
2. **Lexical verb–object compound / VO idiom** — a V–O-shaped lexical unit with mixed word/phrase behavior, potentially separable under lexically restricted conditions and often with a unitary/non-transparent meaning.
3. **Higher composition** — modal, aspectual, question, particle, locative, temporal, clause, serial, discourse, and other wrappers around a narrower predicate. These wrappers do not enlarge either (1) or (2).
4. **Developmental “productivity” evidence** — GACS type-based scoring from distinct exemplars. This measures evidence of a child’s abstract knowledge; it is not a construction identity.

Therefore the name `ProductiveVO` cannot be used as evidence that the current runtime whitelist is one productive grammar construction.

## Profiles

### Profile A — ordinary transparent V + NP object

**Examples relevant to the current runtime inventory**

- `飲水`
- `摘芒果`
- `買嘢`
- `食嘢`
- `寫名`
- transparent object-taking uses of `睇書`, `聽歌`, `食意粉`, etc., where the noun is an ordinary independently interpreted object.

**Evidence disposition:** source-compatible with ordinary transitive V–NP syntax; not independent evidence for AB35.

Alderete et al. explicitly distinguish transitive `[V (Asp) NP]` from V–O compounds. The semantic transparency of a surface is not itself sufficient to settle every lexical item, but AB35 cannot claim such surfaces merely because a whitelist calls them ProductiveVO.

### Profile B — `做功課`

Alderete et al. directly use `dzou22-gan35 guŋ55fo33` ‘doing homework’ as an ordinary `[V Asp NP]` VP example.

**Disposition:** ordinary transitive/compositional VP evidence, not evidence for a distinct ProductiveVO construction.

Current occurrences of `做功課` in the AB35 fixture are therefore implementation-composition cases that should later be rehomed under ordinary typed VP structure rather than retained as linguistic evidence for AB35.

### Profile C — source-backed lexical V–O compounds

Independently documented Cantonese examples include:

- `讀書` / `duk-sy` ‘study’ — Alderete et al. V–O compound;
- `飲茶` / `jam-tsaa` ‘have dim sum’ — Alderete et al. V–O compound with non-literal lexical semantics;
- `游水` / `jau-seoi` ‘swim’ — Bodomo et al. Cantonese VOC, including separated forms;
- `沖涼` / `cung loeng` ‘bathe’ — Bodomo et al. use the object-like component in topicalization diagnostics for a Cantonese VOC.

The current runtime whitelist contains `飲茶`, `游水`, and `沖涼`, but the standard AB35 fixture does not directly exercise these source-backed compound profiles.

**Disposition:** a genuine neighboring lexical/morphosyntactic domain exists, but the current AB35 identity/name has not established its exact membership, separability diagnostics, or runtime representation. Do not automatically rename AB35 to “VOCompound” in this research task; ontology follows a later accepted identity decision.

### Profile D — `食飯`

`食飯` is heavily represented in the current AB35 fixture. Chan & Cheung use `sik6faan6` in a Cantonese example meaning ‘eat/have a meal’, but the cited occurrence is not itself an explicit classification of `食飯` as a VO compound. The current attached sources do not establish the exact lexical-vs-ordinary-VP behavior needed to assign it confidently to Profile A or C for parser purposes.

**Disposition:** unresolved between ordinary transparent predicate–object behavior and a conventionalized activity/V–O-compound analysis. Current parser frequency and fixture repetition cannot settle this.

Later resolution should use item-specific diagnostics such as aspect/interruption, object modification/quantification, object replacement, topicalization, ability to take an additional object, and preservation/loss of the activity meaning.

### Profile E — `打電話`

The current AB35 fixture includes `打電話`, and the runtime whitelist marks it ProductiveVO. The reviewed primary sources establish the general distinction between ordinary V–NP phrases and V–O compounds but do not directly classify this lexical item in the current source package.

**Disposition:** lexical/activity candidate requiring item-specific evidence; not currently a licensed AB35 generalization.

### Profile F — `打籃球`

The runtime note records earlier independent attestation of `打籃球` as an embedded **activity VP** inside a permissive `畀` construction. That attestation established the existence of the activity VP in that environment, not its membership in a Cantonese V–O compound class and not a generic `打 + noun` rule.

**Disposition:** valid embedded activity VP behavior, but V–O-compound status unresolved. Do not infer a separate AB35 construction from the old runtime type.

### Profile G — higher composition around a V–O-shaped child

Current fixtures wrap AB35-labelled material inside:

- final-particle questions/statements;
- modal `要`;
- locative material `喺屋企`;
- reported speech `話`;
- `先…再…` and comma-linked sequencing;
- `有冇` question material;
- temporal relative/when material `…嘅時候`;
- motion/purpose chains;
- manner `慢慢噉`;
- permissive `畀`.

**Disposition:** these are composition tests. They provide zero independent evidence that the embedded surface belongs to AB35, and the outer material must remain owned by independently typed structures.

## Why “Productive” is specifically unsafe as an ontology term

The GACS source uses type-based scoring: four different exemplars are treated as practical evidence that a child has some abstract knowledge of an item. That is a developmental assessment methodology. It does not say that a lexical V–O pair is an unrestricted productive adult grammar rule, nor that all V–O-shaped activities instantiate one construction.

The runtime label therefore conflates at least three meanings of “productive”:

- a child producing multiple types in a sample;
- a grammar pattern permitting novel lexical combinations;
- a closed runtime whitelist of known surfaces.

Those are not equivalent.

## Naming/identity disposition

Do **not** preserve AB35 merely because the permanent name says `ProductiveVO`.

The evidence-based possibilities for later adjudication are:

- retire AB35 and route ordinary V–NP material through AB78 while separately researching lexical V–O compounds;
- narrow/reinterpret AB35 only if the permanent identity can truthfully denote an independently evidenced V–O-compound family;
- split the legacy runtime function if ordinary transitivity and lexical compounds require different deterministic representation.

This research task does not choose a new UUID/name/family and does not promote status.

## Required later behavioral boundaries

Before any retained V–O-compound runtime identity can be accepted, item-level tests should distinguish at least:

1. ordinary V + replaceable/modified/quantified NP object;
2. lexical V–O activity/idiom with unitary meaning;
3. accepted vs rejected separation by aspect/duration/frequency/object modifiers;
4. object topicalization or movement where independently supported;
5. loss or preservation of lexical meaning under separation;
6. ability/inability of the whole V–O unit to take an additional object;
7. ordinary transitive, serial, resultative, ditransitive, and clause-complement neighbors.

The literature explicitly warns that separability varies by lexical item. A future runtime must not replace the present whitelist with an unrestricted generative V+N rule.

## Research disposition

`MIXED_LEGACY_FAMILY_REQUIRES_REHOMING`

AB35 remains `research_pending` during this task. The next step after merge should be a separate accepted-specification/runtime audit that determines which current whitelist entries already have an independently typed ordinary AB78 route, which source-backed lexical compounds need preservation, and whether AB35 itself should be retired, narrowed, or replaced by a separately adjudicated identity.
