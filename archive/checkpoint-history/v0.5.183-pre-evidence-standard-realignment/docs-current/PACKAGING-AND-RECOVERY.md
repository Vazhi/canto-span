# Packaging and recovery

## Runtime ZIP

The runtime ZIP contains exactly:

- `canto-span/main.js`
- `canto-span/manifest.json`
- `canto-span/styles.css`

It contains no research, documentation, tests, fixtures, tools, validation, render material, checkpoints, archives, custody, or recovery manifests.

## Recovery ZIP

The recovery ZIP contains the runtime source plus current doctrine, state, evidence records, tests, tools, validation, accepted render records, public packets, and clearly classified historical recovery material. It contains no sealed evaluator custody, hidden surfaces, salts, or private evaluator results.

The recovery root should expose only current state pointers and the current acceptance record. Superseded pending, waiting, rejection-cycle, evidence-limited, and prior-release documents belong under `archive/`.

## Evaluator archives

Prospective custody remains outside both runtime and recovery packages until evaluation. Once opened, every case is consumed. Consumed evaluator material belongs in a separate, explicitly non-reusable results archive.

## Full download suite

A full user download may bundle the already-separated runtime ZIP, recovery ZIP, consumed evaluator-results ZIP, acceptance and render summaries, audits, a release manifest, and hashes. Bundling does not weaken the internal separation of those artifacts.

## Canonical v0.5.182 filenames

- `canto-span-plugin-v0.5.182.zip`
- `canto-span-recovery-v0.5.182.zip`
- `canto-span-evaluator-results-v0.5.182-consumed.zip`

Internal work-package codes may appear in evidence and historical records, but semantic versions are the primary user-facing package names.

## Checkpoint rule

After each substantial batch and before any evaluator opening or context-risk point, provide a downloadable recovery checkpoint and a concise state ledger. Runtime ZIPs remain minimal; research, provenance, validation, and recovery material stay in the recovery package.
