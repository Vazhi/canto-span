# Tools

## Current entry points

- `../tests/run-all.js` / `npm test` — parser regression, NP subsystem, and per-construction assertions.
- `verify-current-state.js` — manifest-driven verification runner.
- `verify-repository.sh` — Git integrity plus the stable core verification profile.
- `verify-implementation-reachability.js` — validates the single zero-weight implementation-probe inventory.
- `build-construction-tests.js` — rebuilds standardized construction files from canonical fixtures and the consolidated probe inventory.
- `sync-construction-test-metadata.js` — synchronizes construction-note test counts after controlled test-inventory changes.
- `build-native-review-form-script.js`, `import-native-review-csv.js`, and `native-review-lib.js` — current native-panel utilities.
- `export-git-working-copy.sh` — exports the complete repository including `.git/`.

## Verification profiles

Profiles are defined in `../config/verification-profiles.json`.

```bash
npm run verify           # stable core checks
npm run verify:research  # panel and survey checks
npm run verify:release   # core plus promotion/release gates
npm run verify:all       # every current profile
```

Release-specific wrapper verifiers and version-specific acceptance scripts were removed from the active tool directory at v0.5.198. Their results remain recoverable from Git history and their research records remain under `docs/research/` and `docs/releases/`.

Current generated results are written only to `validation/current/`. New version-numbered validation directories must not be added.
