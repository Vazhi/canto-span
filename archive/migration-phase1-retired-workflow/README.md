# Retired checkpoint and recovery workflow

These files were active before the Git migration. They are preserved unchanged for historical reference.

They are no longer current instructions:

- root checkpoint-state and progress files;
- the packaging manifest;
- the recovery-package policy;
- the combined runtime/recovery package builder and package-separation audit.

Git commits now record project state and diffs. A full working-copy export including `.git` is the recovery artifact. Minimal runtime ZIPs may still be built for plugin installation, but they are release artifacts rather than project-state containers.
