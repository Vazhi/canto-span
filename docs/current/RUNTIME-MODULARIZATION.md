---
title: Canto Span — Runtime Source and Generated Bundle
status: current
tags: [canto-span/runtime, canto-span/architecture]
related: "[[TESTING]] [[GOVERNANCE]]"
---

# Runtime source and generated bundle

Canto Span uses canonical source modules for development and a deterministic single-file bundle for Obsidian installation.

## Authority boundary

- `src/**` and `src/runtime-resources/**` are the canonical runtime inputs.
- `src/plugin-entry.js` is the build entrypoint that wires the canonical modules.
- `main.js` is a committed generated deployment artifact. Do not edit it directly.
- `tools/build-runtime.js` is the sole build contract for `main.js`.
- executable tests establish implementation behavior only; they do not establish linguistic status or evidence.
- [`GOVERNANCE.md`](GOVERNANCE.md) remains the sole owner of linguistic evidence and status policy; runtime architecture must not create a parallel evidence system.

Every generated `main.js` begins with a notice naming the canonical inputs and the build command.

## Deterministic evidence-to-runtime architecture

Canto Span's grammar runtime is deterministic. Grammar recognition must not depend on a network connection, an AI service, Python, PyCantonese, a live corpus, or a mutable cloud knowledge base. External tools may help discover and research candidate analyses during development, but accepted runtime behavior is checked-in, reviewable, reproducible source.

The intended development flow is:

```text
AI / search / corpus / bug / learner-material signal
                    ↓
             candidate hypothesis
                    ↓
 independent source review + corpus adjudication + native evidence where needed
                    ↓
 canonical identity / evidence / boundary decision
                    ↓
 separately authorized deterministic runtime specification
                    ↓
 matcher implementation + positive and negative tests + diagnostics
```

The arrows are gates, not automatic transitions. A parser result cannot validate the rule that produced it. Repeated AI answers, cache hits, token counts, corpus hit counts, generated probes, or successful tests cannot promote a candidate or broaden a construction. They may identify useful work, but evidentiary authority remains with the records and procedures in `GOVERNANCE.md` and `DEFINITION-OF-DONE.md`.

### AI-assisted discovery boundary

AI may be used during development to:

- propose candidate analyses or competing analyses;
- suggest search terms and possible scholarly sources;
- generate controlled probes for later review;
- identify likely collisions, unknown spans, or missing lexical coverage;
- summarize already inspected evidence for workflow purposes.

AI output itself is generated material, not independent linguistic evidence. A web-assisted search may locate an independently checkable source, but only the inspected source and its recorded locator can support a language claim. The system must not automatically turn an AI parse, AI research summary, or repeated model agreement into a runtime rule.

### No online self-learning

The runtime does not learn grammar from user input. In particular:

- seeing a sentence repeatedly does not strengthen a construction;
- knowing every token does not imply that the sentence has a licensed construction analysis;
- an unknown span may create a diagnostic or research candidate, but not an automatic rule;
- a corrected analysis must enter through the normal evidence, review, implementation, and test path;
- any future cache may store deterministic results for performance only and must be invalidated by the relevant runtime or grammar version; cache contents cannot become grammar authority.

This preserves the useful part of a progressively improving parser: the checked-in grammar can become broader and deeper over time, while each improvement remains auditable and offline after release.

## Declarative construction representation

Where a construction is regular enough to express declaratively, prefer a rule representation built from lexical anchors and independently typed grammatical slots rather than sentence memorization or surface-token coincidence.

A suitable rule specification may include:

- permanent `construction_code` and canonical-name reference;
- one or more fixed lexical or morphological anchors;
- typed slots such as NP, VP, predicate, particle, complement, or independently typed subtype;
- adjacency, ordering, optionality, repetition, and span constraints;
- lexical, argument-structure, or semantic restrictions only when independently supported and implementable;
- required composition with surrounding structures;
- explicit negative boundaries and collision classes;
- diagnostic metadata linking the runtime match to its identity and current status without treating that metadata as evidence.

Illustrative shape only:

```text
construction: <permanent code>
anchors:      [識]
slots:        [<independently typed verbal complement>]
constraints:  <evidence-approved adjacency / lexical / structural restrictions>
boundaries:   <explicit non-matches and competing analyses>
```

This example demonstrates the representation style; it does not by itself assert a complete `識 + V` construction, its meaning, productivity, or current runtime status.

Typed slots are important. A rule should not infer a construction merely because a following token has a convenient surface POS tag when the intended constituent requires a larger independently typed structure. Likewise, exact token equality, greedy segmentation, or lexical familiarity is not a substitute for constituent boundaries.

Hand-written detectors remain appropriate when discourse context, composition, ambiguity, or nonlocal constraints cannot be expressed cleanly in a declarative table. Declarative representation is a preferred implementation tool where it fits, not a requirement to flatten every construction into one schema.

## Future construction compiler

A future compiler may translate reviewed declarative runtime specifications into deterministic matcher tables or source modules. This is a design direction, not an implemented subsystem.

If introduced, the compiler must preserve these separations:

1. **Evidence records decide what is supported**, under `GOVERNANCE.md`.
2. **Identity records decide what construction is being referred to**.
3. **A separately reviewed runtime specification decides what behavior is authorized for implementation**.
4. **The compiler performs only deterministic translation and validation**.
5. **Executable tests establish implementation fidelity, not linguistic truth**.

A linguistic status change must not automatically compile or deploy a new matcher, and a compiled matcher must not automatically change linguistic status. `parser_heuristic` and internal-wrapper behavior may also use declarative machinery when useful without becoming productive Cantonese claims.

Compiler validation should reject unresolved references, unsupported slot types, contradictory constraints, missing required boundary cases, and nondeterministic output. Generated matcher code or tables should remain reproducible from checked-in inputs and should never be edited as an independent authority.

## Coverage and provenance diagnostics

Parser diagnostics should distinguish failure modes instead of using AI fallback to hide uncertainty. Useful categories include:

- matched known construction;
- known lexical material but unresolved construction coverage;
- unknown lexical span;
- multiple competing structural matches;
- incomplete or context-dependent material;
- internal parser wrapper or heuristic rather than a direct language-construction match.

Where practical, developer diagnostics should expose the permanent construction code, canonical identity, legacy runtime label when relevant, matched span, and the rule or detector that fired. They may link to status or provenance records for inspection, but a diagnostic display must not turn those records into runtime evidence.

Unknown coverage is useful research input. It should be logged or surfaced as a bounded candidate for later analysis rather than silently repaired with invented structure.

## External tooling boundary

PyCantonese is useful to the project as optional corpus tooling, including HKCanCor-oriented extraction and inspection. It is not the grammar engine and is not a runtime dependency. The checked-in JavaScript parser must remain usable without PyCantonese.

The same boundary applies to AI and web research tools: they can accelerate development and evidence discovery, but release-time grammar recognition remains deterministic and self-contained.

## Canonical edit paths

Use the smallest owner that matches the change:

| Change | Canonical path |
|---|---|
| parser entrypoint and line analysis | `src/parser/analyze-line.js` |
| detector ordering and wrappers | `src/parser/orchestration/**` |
| detector-family behavior | `src/parser/detectors/**` |
| tokenization, normalization, nodes, slots, templates, context, clause relations, or topic linkage | the matching directory under `src/parser/**` |
| vocabulary and productive lexical entries | `src/runtime-resources/lexicon/**` |
| Jyutping and pronunciation review data | `src/runtime-resources/pronunciation/**` |
| construction labels and declarative grammar tables | `src/runtime-resources/constructions/**` and `src/runtime-resources/grammar/**` |
| learner presentation resources | `src/runtime-resources/presentation/**` |
| rendering | `src/render/**` |
| plugin settings and lifecycle | `src/plugin/**` |
| final dependency wiring | `src/plugin-entry.js` |

Existing research records may cite historical `main.js` line ranges as provenance. New implementation work should cite canonical source paths and symbols. Updating historical evidence records solely to replace old line numbers is not required.

## Build contract

```bash
npm run build:runtime
```

The command validates runtime resources and bundles `src/plugin-entry.js` into unminified CommonJS targeting ES2020. The Obsidian API remains external because the host supplies it. No source map or runtime filesystem dependency is emitted.

```bash
npm run verify:runtime-build
```

This command:

1. builds the runtime twice in memory;
2. requires byte-identical output;
3. requires committed `main.js` to match the generated bytes;
4. reports the SHA-256 digest and resource counts.

A source change that affects the deployed plugin must regenerate and commit `main.js` in the same branch. Research, corpus, survey, governance, and unrelated documentation changes must not regenerate it.

## Test contract

```bash
npm test
```

The standard parser suite bundles the canonical source entrypoint in memory and executes that build under an Obsidian stub. It does not read committed `main.js`.

```bash
npm run test:generated-runtime
```

The generated-runtime smoke test is intentionally separate. It verifies that committed `main.js`:

- carries the generated-file notice;
- loads with only the host-provided Obsidian stub;
- exposes the expected runtime surface;
- executes a representative analysis.

Together, source-first tests protect behavior while deterministic-build verification and the smoke test protect the deployment artifact.

## CI policy

`.github/workflows/runtime-source-first.yml` runs only when runtime source, runtime tests, the build contract, dependency lockfiles, the generated bundle, or that workflow changes. It runs:

1. `npm run verify:runtime-build`;
2. `npm test`;
3. `npm run test:generated-runtime`.

Unrelated evidence, corpus, survey, general documentation, and governance changes do not pay this runtime CI cost. Other workflows retain their own narrowly defined inputs and purposes.

## Packaging policy

The installable Obsidian package remains minimal:

- `main.js`
- `manifest.json`
- `styles.css`

Source modules, research, provenance, validation reports, and recovery materials remain outside the runtime ZIP. The bundle is a deployment artifact, not a backup or project-state authority.

## Change checklist

For a runtime-source change:

1. edit the smallest canonical source owner;
2. update focused tests without rewriting accepted expectations unless behavior change is separately authorized;
3. run `npm test`;
4. run `npm run build:runtime`;
5. run `npm run verify:runtime-build`;
6. run `npm run test:generated-runtime`;
7. run only the additional verification profile relevant to the changed state;
8. review the `main.js` diff as generated output, not as hand-maintained source.

Temporary migration workflows, parity harnesses, encoded archives, and extraction recipes are not part of the permanent architecture.
