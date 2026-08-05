# ISSUE-626 返嚟 directional source inventory R1

Parent issue: #626  
Work claim: #627  
Date: 2026-08-05

## Scope

This inventory evaluates Week 18 route `W18-F09`, triggered by:

```text
我幫你買嘢返嚟啦。
```

It separates the general Cantonese directional profile from the sentence-specific question of mover and event attachment. Goods-motion, subject-return, and multi-event analyses are retained only as candidate hypotheses for later contextual testing.

## Linguistic sources

| Source ID | Source and locator | Evidence grade | Direct contribution | Limit |
|---|---|---|---|---|
| `SRC-YIU-2013-DIRECTIONALS` | Carine Yuk-man Yiu. 2013. “Directional Verbs in Cantonese: A Typological and Historical Study.” *Language and Linguistics* 14(3):511–569; especially pp. 516–519, 543–547, examples (108), (115), (123), and Figure 4. | `DIRECT_SCHOLARLY_CORE` | Identifies `faan1` ‘return’, `lai4` ‘come’, and `heoi3` ‘go’; treats `lai4/heoi3` as speaker-oriented deictic directionals; records `faan1 + lai4/heoi3`; distinguishes self-agentive from agentive motion; and gives `佢還咗本書翻嚟/去(圖書館)`, with co-event verb + theme object + compound directional + optional locative object. | The paper uses `翻` as its spelling for directional `faan1`. The close example uses `還` ‘return’, not `買` ‘buy’, so it does not decide the mover or attachment in `買嘢返嚟`. It does not establish reported-discourse or narrative shifted centers in the material reviewed here. |
| `SRC-CHOR-2018-DIRECTIONALS` | Winnie Chor. 2018. *Directional Particles in Cantonese: Form, Function, and Grammaticalization*. John Benjamins. DOI `10.1075/scld.9`; inherited verified locator pp. 42–45 / PDF pp. 59–63. | `DIRECT_SCHOLARLY_CORE` | Gives postverbal directional strings including `佢行返過嚟`, supporting `返` before path material and deictic `嚟` at the outer edge. | This is a three-part directional after a manner verb, not the exact two-part structure after `買嘢`. |
| `SRC-CHOR-2013-FAAN` | Winnie Chor. 2013. “From ‘Direction’ to ‘Positive Evaluation’: On the Grammaticalization, Subjectification and Intersubjectification of `faan1` ‘return’ in Cantonese.” *Language and Linguistics* 14(1):91–134. | `DIRECT_SCHOLARLY_CORE` | Traces `faan1` from motion meaning ‘return to the original location’ into resumptive, evaluative, and tone-softening uses. | It establishes polyfunctionality and collision risk, not the constituency of the Week 18 sentence. |
| `SRC-LAI-PANG-2023-RESULTATIVES` | Ryan Ka Yau Lai and Michelle Man-Long Pang. 2023. “Rethinking the Description and Typology of Cantonese Causative–Resultative Constructions.” *Languages* 8(2):151. DOI `10.3390/languages8020151`. | `DIRECT_SCHOLARLY_CORE` | Shows that directional material can contribute physical or extended result-state structure and documents `返` in larger directional combinations. | It does not establish that `買嘢返嚟` is one causative-resultative construction. |
| `SRC-GLOSSIKA-W18-F09` | Glossika Week 18: `我幫你買嘢返嚟啦。` | `ATTESTATION_ONLY` | Attests the exact sequence. | It supplies insufficient context to settle mover, speaker-oriented endpoint, constituency, or productivity. |
| `PROJECT-AA27-RUNTIME` | Current AA27 note `grammar/research_pending/CompoundDirectionalMotionVP.md` and identity `ReturnUpDeicticDirectionalVP`. | `RUNTIME_OBSERVATION_ONLY` | Shows that AA27 is narrowly retained for `返上嚟/返上去`, not all `返嚟` strings. | Runtime identity carries zero authority for assigning this route. |
| `PROJECT-AA47-RUNTIME` | Current AA47 note `grammar/research_pending/DirectedMannerMotionVP.md` and identity `MannerMotionDirectionalWrapper`. | `RUNTIME_OBSERVATION_ONLY` | Shows that the wrapper aggregates heterogeneous motion profiles. | It is not a settled linguistic owner for `買嘢返嚟`. |

## Supported directional meanings

Yiu supports the following distinction:

- `返 faan1`: return/back orientation toward a prior or original location;
- `嚟 lai4`: movement toward the speaker;
- `去 heoi3`: movement away from the speaker.

Thus `返嚟` combines return with movement toward the speaker, while `返去` combines return with movement away from the speaker. An overt locative may specify the speaker's location more precisely. The reviewed material does not establish reported-discourse, narrative-perspective, or other shifted deictic centers; those possibilities require separate evidence.

## Event type and object order

Yiu distinguishes:

- **self-agentive motion**, where the subject is the moving theme; and
- **agentive/caused motion**, where an agent causes a theme object to change location.

The close agentive example is:

```text
佢還咗本書翻嚟/去(圖書館)。
```

The paper states the order as:

```text
co-event verb + theme object + compound directional + optional locative object
```

This directly supports `V + object + 返嚟` as a Cantonese order. It does not prove that every preceding verb supplies caused motion.

## Aspect and locative material

The close examples place perfective `咗` after the co-event verb and before the theme object. Yiu also permits optional locative material after the compound directional in the cited profile. These are supported orders, not a license for every aspect marker, locative class, or scope relation.

## The `買嘢返嚟` attachment gap

The Week 18 sequence matches the supported surface order:

```text
買 + 嘢 + 返嚟
```

The exact string is attested, but the reviewed sources do not establish its mover or event attachment. The following are candidate hypotheses for later corpus or panel testing only:

1. the purchased goods are the moving theme;
2. the subject purchases the goods and then returns;
3. the sequence receives an underspecified multi-event interpretation;
4. another context-dependent analysis applies.

None of these is a source-supported positive disposition in this packet. The sentence-level result is therefore:

```text
ATTACHMENT_NOT_ESTABLISHED_BY_CURRENT_SOURCES
```

## Orthography

Yiu uses `翻` for directional `faan1`; the project trigger uses `返`. Preserve quoted spelling, but do not create separate constructions from this variation. Orthographic identity also must not merge unrelated lexical or particle uses.

## Collision boundaries

Keep separate:

- independent motion predicate `返嚟` ‘come back’;
- self-agentive `V + 返嚟`;
- agentive `V + theme object + 返嚟`;
- three-part directionals such as `返過嚟` and `返上嚟`;
- resultative or metaphorical extensions;
- resumptive, restorative, evaluative, or tone-softening `返`;
- potential-directional structures;
- lexicalized expressions, fragments, repairs, quotations, and multi-clause sequences.

## Repository comparison

Current identities include:

- AA27 `ReturnUpDeicticDirectionalVP`, only for `返上嚟/返上去`;
- AA47 `MannerMotionDirectionalWrapper`, an implementation aggregate;
- AA49 `IndependentMotionPredicateVP`, for independent motion predicates;
- retired AA48 `DirectionalCausedMotionVP`.

None automatically owns `買嘢返嚟`. A retired label must not be revived merely because its name appears relevant.

## Evidence conclusion

Direct research supports `返嚟` as return plus speaker-oriented `嚟` and supports the order `V + theme object + 返嚟` in agentive motion. It does not determine the mover or event attachment in `買嘢返嚟`. Goods-motion, subject-return, and multi-event analyses remain candidate hypotheses only. The route therefore resolves the general directional grammar while assigning the exact sentence the terminal result `ATTACHMENT_NOT_ESTABLISHED_BY_CURRENT_SOURCES`. No runtime, status, or identity change is authorized.
