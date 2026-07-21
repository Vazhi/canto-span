# Validation and packaging tools

## Current accepted baseline

The accepted runtime is **v0.5.182** and there is no active candidate.

Primary current entry points:

- `run-current-focused.js` — runs the consolidated accepted-baseline validation set.
- `audit-v0.5.182-acceptance.js` — verifies the accepted v0.5.182 release.
- `verify-documentation-consistency.js` — checks JSON validity and non-archive local Markdown links.
- `audit-package-separation.py` — checks runtime/recovery separation.
- `build-packages.py` — builds canonical runtime and recovery ZIPs.

General validation tools remain authoritative for regression, semantic acceptance, corpus evaluation, source accounting, claim provenance, native conflict, native naturalness, topology, documentation, and package separation.

Version-specific v0.5.180, v0.5.181, and CP021/CP022 scripts are retained to reproduce their recorded packets and releases. Their embedded status wording and counts are historical test expectations, not current project state.
## Active CP023 research tools

- `run-research-probe-packet.js` — records visible construction behavior without treating it as an acceptance gate.
- `run-lexicon-baseline-probes.js` — records reproducible token, Jyutping, construction, and root-coverage baselines for source vocabulary.
- `audit-cp023-p1-prog01-r2.py` — reproduces the R2 blueprint checkpoint.
- `audit-cp023-p1-prog01-r3.py` — verifies the R3 compatibility matrix, nominal designs, supersession record, state pointers, and runtime identity.

