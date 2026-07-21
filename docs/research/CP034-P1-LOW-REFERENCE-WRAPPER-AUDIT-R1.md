# CP034-P1 low-reference wrapper audit

## Scope

This checkpoint reviews five of the 53 labels that remained without direct standardized cases after v0.5.189:

- `Comment`
- `ComparativeStative`
- `DefinitionComplement`
- `DefinitionExplanatoryFrame`
- `TemporalAdverbialClause`

The work is implementation-only. It adds no linguistic evidence and does not promote any retained label.

## Results

### LOWREF-001 — ComparativeStative

`客氣啲。` reaches the residual `ComparativeStative` fallback. The probe protects current implementation reachability only. It does not establish that every stative plus `啲` sequence is comparative or that this fallback is the correct final analysis.

### LOWREF-002 — DefinitionExplanatoryFrame

`圖書館係乜嘢嚟㗎。` reaches the bounded `DefinitionExplanatoryFrame` wrapper.

### LOWREF-003 — DefinitionComplement

The same input exposes `乜嘢` as the internal `DefinitionComplement` child. That child remains explicitly non-licensing and internal.

### Comment

The late `wrapCore` fallback can construct a `Comment` child when called directly. However, complete parsing of every current topic-candidate surface followed by each of the 811 current lexicon terms produced zero final `Comment` outputs. This is evidence of likely shadowing, not a proof that no longer sequence can reach the constructor. The label remains active and untested pending a broader constructor-path audit.

### TemporalAdverbialClause

The label had no constructor at all. Its two effective code references were registry membership and a context-support list. It is retired as a constructorless dormant placeholder. The checked temporal-adverbial-clause source and research question remain preserved outside the active grammar table.

## Coverage consequence

- constructor-specific zero-weight probes added: 3;
- implementation-positive-only labels: 18;
- no-direct-case labels remaining: 49;
- active runtime labels / current notes: 169 / 169;
- retired labels: 12.

No recognized parser span or retained construction status changed.
