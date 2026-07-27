# Runtime modularization and wired-resource architecture

Status: **Stage 6 formula-response detector extraction implemented; pending merge**
Parent program: #161
Stage 6 intake: #167
Work claim: #184
Draft pull request: #185
Stage 5 parser primitives: #166 / PR #183
Stage 4 declarative resources: #165 / PR #181
Stage 3 lexical/Jyutping resources: #164 / PR #179
Stage 2 build pipeline: #163 / PR #177
Stage 1 architecture: #162 / PR #172

## Purpose

Canto Span currently ships and maintains one 23,645-line, 1,312,205-byte `main.js`. That file remains the required self-contained Obsidian deployment artifact, but it is too large to be the normal edit surface. In particular, file-level GitHub tools cannot reliably inspect or replace focused semantic regions without handling the complete bundle.

The accepted target is **source-first development in this repository**:

```text
small canonical JavaScript modules + wired runtime-resource files
                         ↓
                 deterministic build
                         ↓
              generated self-contained main.js
```

This architecture does not move resources to another repository and does not make the installed plugin read development files at runtime.

## Authority transition

Stage 2 (#163) establishes source-first ownership without changing runtime behavior:

- `src/plugin-entry.js` is the canonical executable source while later stages split it into smaller modules;
- `main.js` is the generated deployment artifact and must not be edited directly;
- `package-lock.json` pins the build dependency surface;
- `manifest.json` remains deployment metadata;
- `styles.css` remains the style artifact;
- executable tests continue to run against the generated bundle under the existing Obsidian stub.

After Stage 2 is accepted and merged, changes are made to source/resource files and then bundled. A generated file must never become a second canonical owner.

## Accepted source layout

```text
src/
├── plugin-entry.js
├── plugin/
│   ├── canto-span-plugin.js
│   ├── settings-tab.js
│   └── settings.js
├── parser/
│   ├── normalization/
│   ├── tokenization/
│   ├── features/
│   ├── slots/
│   ├── templates/
│   ├── nodes/
│   ├── detectors/
│   ├── clause-relations/
│   ├── topic-chain/
│   ├── terminal/
│   ├── orchestration/
│   ├── context/
│   └── analyze-line.js
├── diagnostics/
├── render/
└── runtime-resources/
    ├── lexicon/
    ├── pronunciation/
    ├── constructions/
    ├── templates/
    ├── presentation/
    └── diagnostics/
```

Directories may be refined by the bounded extraction issue that owns them, but dependency direction and authority boundaries below are fixed unless a later reviewed architecture change supersedes them.

## Dependency direction

Dependencies flow only downward:

1. **Runtime resources** depend on nothing executable.
2. **Parser primitives** may depend on runtime resources.
3. **Detector families** may depend on resources and parser primitives.
4. **Parser orchestration and context** may depend on detector families and lower layers.
5. **Diagnostics** may inspect parser outputs and lower-layer resources but may not control linguistic recognition silently.
6. **Rendering** may depend on parser outputs and diagnostics.
7. **Plugin integration** may depend on all lower layers and is the only layer that imports Obsidian APIs.

A lower layer may not import a higher layer. Shared helpers receive one canonical owner; they are not copied into multiple detector families. This prevents circular ownership and makes GitHub claims path-local.

## Bundle contract

Stage 2 uses **esbuild 0.28.1** because it supports a small deterministic CommonJS bundle, JavaScript and JSON imports, and an explicit external Obsidian API without requiring a custom concatenation system.

Required contract:

- entry: `src/plugin-entry.js`;
- output: `main.js`;
- format: CommonJS;
- bundle: enabled;
- `obsidian`: external;
- minification: disabled initially so generated diffs remain reviewable;
- no committed source map, cache, temporary metafile, timestamp, absolute path, random ordering, or environment-dependent banner;
- `main.js` remains self-contained except for the Obsidian API supplied by the host;
- resource files are imported at build time; the installed plugin does not read repository paths;
- two builds from identical inputs must have the same SHA-256 during Stage 2 validation.

Rejected alternatives:

- **Manual concatenation:** fragile ordering and scope, with no real module boundary.
- **Runtime filesystem loading:** makes installation depend on separately deployed resource files and risks mobile/path failures.
- **Webpack:** unnecessary configuration and dependency surface for this single bundle.
- **Rollup:** viable, but no material advantage over the smaller accepted esbuild setup for this project.

The exact esbuild target/platform flags may be selected in #163 only to preserve the existing Obsidian desktop-and-mobile contract; they may not reopen the bundler, module-format, external-API, or generated-output decisions.

## Stage 2 build workflow

Stage 2 deliberately begins with the complete accepted runtime in `src/plugin-entry.js`. This creates a real canonical source and generated-output boundary before any lexical, grammar, parser, rendering, or plugin family is extracted.

From a fresh checkout:

```bash
npm ci
npm run build:runtime
npm run verify:runtime-build
npm test
```

`build:runtime` bundles `src/plugin-entry.js` as unminified CommonJS for the Node-compatible Obsidian host, targets ES2020, leaves `obsidian` external, writes no source map, and emits `main.js`. `verify:runtime-build` performs two in-memory builds, requires byte-identical output, and requires the committed `main.js` to match that output.

The build command is permanent infrastructure, not a migration-only verifier. Temporary comparison workflows and artifacts used to establish this baseline are removed before PR readiness.

## Stage 3 lexical and pronunciation ownership

Existing runtime data is now maintained in file-local modules under:

- `src/runtime-resources/lexicon/token-lexicon/` for ordered token-entry fragments;
- `src/runtime-resources/lexicon/productive-vo.js` for reviewed productive verb-object entries;
- `src/runtime-resources/lexicon/formulas.js`, `address-terms.js`, and `compositional-lexical-phrases.js` for bounded lexical lookup controls;
- `src/runtime-resources/pronunciation/` for reviewed readings and pronunciation-only unknown-CJK fallback data.

The token fragments export ordered `[surface, value]` pairs. `src/plugin-entry.js` reconstructs the same objects and sets at build time, preserving insertion order and lookup precedence. `tools/build-runtime.js` validates duplicate surfaces, pair shape, required fields, and unique list values before every build. This is durable edit protection for the canonical resources, not a migration-only verifier.

`PREDICATE_OMISSION_PROFILES`, environmental predicate profiles, parser-derived term sorting, tokenization, and grammar inventories remain outside Stage 3.

## Stage 4 declarative grammar and presentation ownership

Shared passive runtime data is now maintained under:

- `src/runtime-resources/grammar/` for predicate profiles, slot rules, construction/category templates, slot aliases, classifier-head rules, and ordered-particle metadata;
- `src/runtime-resources/presentation/` for role colors, learner-role/slot display metadata, learner glosses, and diagnostic review reminders;
- `src/runtime-resources/constructions/` for runtime-only active/retired label collections, compatibility aliases/scopes, and label policy;
- `src/runtime-resources/diagnostics/` for passive trace labels, descriptions, template-family metadata, and transition policy.

These modules are build-time inputs only. They do not own construction UUIDs, canonical names, linguistic status, evidence, promotion readiness, corpus classifications, or survey state. `src/plugin-entry.js` reconstructs the same Sets, Maps, frozen objects, arrays, and object tables before bundling. The normal runtime build validates resource shape and undeclared duplicate registry keys without rejecting valid repeated slot or template families.

Normalization maps, parser primitives, tokenization, detector-family tables, rendering algorithms, and plugin lifecycle/settings code remain outside Stage 4.

## Stage 5 parser primitive ownership

Dependency-leaf parser infrastructure is now maintained under:

- `src/parser/normalization/` and `src/runtime-resources/normalization/` for parser-shadow normalization and its passive character/repair maps;
- `src/parser/features/` for token-feature inference and feature-bundle predicates;
- `src/parser/slots/` for controlled slot cleanup, construction-slot lookup, and slot compatibility primitives;
- `src/parser/templates/` for generic template-slot parsing, constraint checks, and ordered matching;
- `src/parser/nodes/` for node-shape helpers and token/construction factory primitives;
- `src/parser/tokenization/` for punctuation, lexical selection, and the dependency-injected tokenizer loop.

Construction-specific token split rules, detector families, category-template policy, NP licensing policy, rendering algorithms, diagnostics, and plugin lifecycle code remain outside these modules. Where the tokenizer or node factory needs such policy, `src/plugin-entry.js` injects the existing canonical helper rather than duplicating or relocating it.

## Stage 6 pilot detector-family ownership

The first construction-family pilot is the **discourse acknowledgement and negative-existential response family** under `src/parser/detectors/discourse/formula-responses.js`.

The module owns the selected fallback/detector block for `FormulaDiscourseUnit` and `NegatedExistentialFragment`: protected formula passthrough, transparent discourse formulas, bounded acknowledgement repetition, discourse-marked agreement, negative-existential response fragments, repeated negative responses, and leave-taking fallback. Cross-family helpers remain in their existing canonical modules and are supplied through one explicit dependency object.

The pilot does not own protected formula-table creation, `FragmentAnswer`, `FragmentQuestion`, polite/path imperative detection, clause relations, cognition, existential clauses, questions, motion, aspect, NP licensing, rendering, diagnostics, or plugin lifecycle code. Existing call order in `src/plugin-entry.js` is unchanged.

## Runtime-resource format rule

Use JSON only for plain serializable data whose order and values can be preserved without behavior. Use JavaScript modules when the resource contains:

- regular expressions;
- callbacks or predicates;
- `Set` or `Map` initialization;
- derived values;
- executable constructors;
- precedence-sensitive or order-sensitive definitions that cannot safely be represented as passive JSON.

Runtime resources may describe parser-consumed labels, aliases, templates, lexical entries, pronunciation data, or presentation text. They must not become a second identity, evidence, linguistic-status, panel, corpus, or governance registry.

## Baseline region inventory

The Stage 1 inventory was generated from `main.js` at commit `6a673164f6534319f683c12bef77c632e58495b4` and blob `d2863c809cc85cbc76f574e463b1ff884c11c24a`. It found 758 top-level declarations. The 16 contiguous regions below account for all 23,645 baseline lines.

Baseline line ranges and declaration anchors are migration locators, **not permanent invariants**. They must not receive an exact-line verifier.

| Region | Baseline lines | Lines | Share | Classification | Mutation | Proposed canonical destinations | First owning or scoping issue |
|---|---:|---:|---:|---|---|---|---|
| `bootstrap-settings` | 1–94 | 94 | 0.4% | `plugin_integration_and_declarative_resource` | medium | `src/runtime-version.js`<br>`src/runtime-resources/presentation/role-colors.json`<br>`src/plugin/settings.js` | #163 |
| `lexical-pronunciation-resources` | 95–1336 | 1,242 | 5.3% | `declarative_runtime_resource_and_lexical_selection` | high | `src/runtime-resources/lexicon/token-lexicon.json`<br>`src/runtime-resources/lexicon/jyutping-review-expectations.json`<br>`src/runtime-resources/lexicon/formulas.json`<br>`src/runtime-resources/lexicon/address-terms.json`<br>`src/runtime-resources/lexicon/compositional-phrases.json`<br>`src/runtime-resources/grammar/predicate-omission-profiles.json` | #164 |
| `construction-registries-audits` | 1337–2145 | 809 | 3.4% | `declarative_runtime_resource_and_diagnostic_code` | medium | `src/runtime-resources/constructions/active-labels.json`<br>`src/runtime-resources/constructions/retired-labels.json`<br>`src/runtime-resources/constructions/compatibility-aliases.json`<br>`src/runtime-resources/constructions/label-policy.json`<br>`src/runtime-resources/presentation/learner-slots.json`<br>`src/diagnostics/registry-audits.js`<br>`src/parser/lexical-selection.js` | #165 |
| `declarative-templates` | 2146–3650 | 1,505 | 6.4% | `declarative_runtime_resource` | medium | `src/runtime-resources/grammar/slot-generation-rules.js`<br>`src/runtime-resources/grammar/construction-templates.js`<br>`src/runtime-resources/grammar/category-span-templates.js` | #165 |
| `normalization` | 3651–4029 | 379 | 1.6% | `executable_parser_code_and_small_resources` | low | `src/runtime-resources/normalization/simplified-to-traditional.json`<br>`src/runtime-resources/normalization/folded-pinyin-repairs.json`<br>`src/parser/normalization/normalize-input.js`<br>`src/diagnostics/normalization-review.js` | #166 |
| `feature-slot-template-engine` | 4030–5292 | 1,263 | 5.3% | `executable_parser_infrastructure` | medium | `src/parser/features/infer-token-features.js`<br>`src/parser/features/feature-bundle.js`<br>`src/parser/slots/generate-token-slots.js`<br>`src/parser/templates/match-template.js`<br>`src/parser/templates/apply-template.js`<br>`src/parser/wrapping/category-subspans.js` | #166 |
| `node-np-factories` | 5293–6223 | 931 | 3.9% | `executable_parser_infrastructure_and_small_resources` | medium | `src/runtime-resources/lexicon/unknown-cjk-jyutping.json`<br>`src/parser/nodes/token.js`<br>`src/parser/nodes/construction.js`<br>`src/parser/np/classifier-compatibility.js`<br>`src/parser/np/licensing.js`<br>`src/parser/nodes/learner-clones.js`<br>`src/parser/wrapping/transparent-phrase.js` | #166 |
| `local-composition-wrappers` | 6224–7488 | 1,265 | 5.3% | `mixed_detector_families_and_declarative_resources` | medium | `src/parser/detectors/motion/directional.js`<br>`src/parser/detectors/motion/serial-purpose.js`<br>`src/parser/detectors/discourse/agreement.js`<br>`src/parser/detectors/discourse/priority.js`<br>`src/parser/detectors/acceptability.js`<br>`src/parser/detectors/np/transparent-classifier.js`<br>`src/parser/detectors/address/vocative.js`<br>`src/parser/tokenization/contextual-overrides.js` | #167 |
| `tokenizer` | 7489–7599 | 111 | 0.5% | `executable_parser_infrastructure` | medium | `src/parser/tokenization/tokenize-line.js` | #166 |
| `construction-detector-families` | 7600–14880 | 7,281 | 30.8% | `mixed_construction_detector_families` | high | `src/parser/detectors/questions/`<br>`src/parser/detectors/definition/`<br>`src/parser/detectors/cognition/`<br>`src/parser/detectors/reported-speech/`<br>`src/parser/detectors/modality/`<br>`src/parser/detectors/discourse/`<br>`src/parser/detectors/transfer/`<br>`src/parser/detectors/coverbs/`<br>`src/parser/detectors/boundaries/`<br>`src/parser/detectors/motion/`<br>`src/parser/detectors/aspect/`<br>`src/parser/detectors/existential/`<br>`src/parser/detectors/nominal-predication/` | #167 |
| `core-wrap-orchestration` | 14881–15440 | 560 | 2.4% | `executable_parser_orchestration` | high | `src/parser/orchestration/wrap-core.js`<br>`src/parser/orchestration/wrap-predicate.js` | #169 |
| `clause-relations-terminal-structure` | 15441–18338 | 2,898 | 12.3% | `mixed_parser_infrastructure_and_detector_families` | medium | `src/parser/clause-relations/`<br>`src/parser/detectors/relative-clauses/`<br>`src/parser/topic-chain/`<br>`src/parser/terminal/questions/`<br>`src/parser/terminal/particles/`<br>`src/parser/orchestration/apply-terminal-patterns.js` | #169 |
| `context-contract-analysis-entry` | 18339–19769 | 1,431 | 6.1% | `executable_context_resolution_and_public_parser_entry` | medium | `src/parser/context/turns.js`<br>`src/parser/context/descriptors.js`<br>`src/parser/context/licensed-fragments.js`<br>`src/parser/context/apply-context-contract.js`<br>`src/parser/analyze-line.js` | #169 |
| `diagnostics-audits-glosses` | 19770–22787 | 3,018 | 12.8% | `diagnostics_presentation_resources_and_note_tooling` | medium | `src/diagnostics/audits/`<br>`src/diagnostics/semantic-guard.js`<br>`src/diagnostics/summary.js`<br>`src/runtime-resources/presentation/learner-glosses.json`<br>`src/diagnostics/learner-hover.js`<br>`src/diagnostics/rows.js`<br>`src/diagnostics/note-coverage.js`<br>`src/diagnostics/exports.js` | #168 |
| `block-parsing-rendering` | 22788–23141 | 354 | 1.5% | `rendering_and_block_integration` | medium | `src/render/controls.js`<br>`src/render/block-options.js`<br>`src/render/jyutping.js`<br>`src/render/token.js`<br>`src/render/construction.js`<br>`src/render/node.js`<br>`src/render/role-colors.js` | #168 |
| `obsidian-plugin-integration` | 23142–23645 | 504 | 2.1% | `plugin_integration` | low | `src/plugin/CantoSpanPlugin.js`<br>`src/plugin/CantoSpanSettingTab.js`<br>`src/plugin-entry.js` | #168 |

### High-risk mixed regions

Three regions require additional decomposition rather than direct extraction:

- `construction-detector-families` contains 7,281 lines (30.8% of the bundle). It must never be migrated as one claim or PR. #167 extracts one representative low-coupling family; #169 then creates the remaining dependency-ordered family issues.
- `clause-relations-terminal-structure` combines reusable graph infrastructure with multiple detector families and terminal passes. Shared infrastructure must be separated before family-specific rules.
- `diagnostics-audits-glosses` mixes behavior inspection, learner presentation resources, semantic guardrails, and note/export tooling. Extraction must preserve the boundary between diagnostic reporting and parser licensing.

## Extraction sequence

1. **#163 — build/source skeleton.** Add the source entrypoint, deterministic build command, and only the minimum bootstrap/settings slice needed to prove the pipeline.
2. **#164 — lexical and Jyutping resources.** Wait until all overlapping runtime-lexicon work is merged or released.
3. **#165 — declarative grammar and presentation resources.** Extract passive tables without moving identity or linguistic authority.
4. **#166 — parser primitives.** Extract normalization, node factories, feature/slot/template infrastructure, and tokenizer dependency leaves.
5. **#167 — one detector-family pilot.** Select a low-coupling family only after the real module graph exists.
6. **#168 — rendering and plugin integration.** Isolate Obsidian imports and preserve the installed interface.
7. **#169 — remaining detector-family queue.** Create separate issues with exact labels, paths, tests, dependencies, and integration ownership.
8. **#170 — source-first workflow cleanup.** Rewire tests and CI, remove obsolete direct-edit instructions and migration scaffolding, and make the generated-bundle policy final.

Issues #164–#168 may overlap only when their canonical paths are disjoint and generated-output integration has an explicit integrator. `main.js` itself is an integration-owned output throughout the migration.

## Behavioral parity strategy

Each extraction is behavior-preserving unless a separate authorized task explicitly changes behavior. The existing test suite remains the primary parity gate:

- `tests/run-regression.js` protects full analysis signatures, tree structure, diagnostics, normalization, registry, learner display, hover, wrapper, and Jyutping outputs;
- `tests/run-np-subsystem.js` protects NP behavior;
- `tests/run-constructions.js` protects construction-specific positive and boundary behavior;
- `tests/lib/runtime-api.js` proves the generated CommonJS bundle exposes the expected runtime surface under an Obsidian stub;
- focused lexicon/tooling tests protect their owned data.

For each migration PR:

1. do not rewrite expected snapshots merely to accommodate extraction;
2. run `npm test`;
3. run only verification profiles relevant to changed canonical state;
4. build twice and compare SHA-256;
5. load the generated bundle through `tests/lib/runtime-api.js`;
6. review the generated diff for only the declared source movement;
7. remove temporary inventory, comparison, or migration scripts before readiness unless they independently satisfy the permanent anti-bloat rule.

No new permanent migration verifier is authorized by this architecture.

## Connector-oriented ownership rules

The modularization succeeds only when routine changes become file-local:

- one vocabulary or Jyutping change touches a bounded resource file;
- one detector-family change touches that family and its focused tests;
- one rendering change touches rendering or presentation resources;
- one settings change touches plugin settings files;
- unrelated corpus, research, survey, documentation, or governance work does not regenerate `main.js`.

Generated `main.js` may still be large. The improvement is that the GitHub connector edits small canonical inputs and reviews a deterministic output rather than reconstructing the bundle as the source of truth.

## Stage 6 behavior boundary

Stage 6 moves one bounded detector family into a canonical source module without changing detector order, precedence, spans, diagnostics, parser behavior, or rendering behavior. Runtime version `0.5.216`, manifest version `0.5.216`, parser results, rendered output, test expectations, construction identity, linguistic status, evidence, corpus classification, survey state, release state, and merge authorization remain unchanged.
