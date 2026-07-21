#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  bash tools/create-progress-checkpoint.sh <checkpoint-id> [state-ledger]

Example:
  bash tools/create-progress-checkpoint.sh CP001-workflow-hardening

Environment:
  CANTO_CHECKPOINT_OUTPUT_DIR  Output directory; defaults to $HOME/Downloads
USAGE
}

if [[ $# -lt 1 || $# -gt 2 ]]; then
  usage >&2
  exit 2
fi

CHECKPOINT_ID="$1"
if [[ ! "$CHECKPOINT_ID" =~ ^CP[0-9]{3}-[a-z0-9][a-z0-9-]*$ ]]; then
  echo "ERROR: checkpoint ID must match CP000-lowercase-hyphenated-name" >&2
  exit 2
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
STATE_SOURCE="${2:-$PLUGIN_ROOT/docs/research/LEGITIMACY-WORK-LEDGER.md}"
OUTPUT_DIR="${CANTO_CHECKPOINT_OUTPUT_DIR:-$HOME/Downloads}"
ZIP_PATH="$OUTPUT_DIR/canto-span-progress-$CHECKPOINT_ID.zip"
HASH_PATH="$OUTPUT_DIR/canto-span-progress-$CHECKPOINT_ID.sha256"
STATE_PATH="$OUTPUT_DIR/CANTO-SPAN-STATE-$CHECKPOINT_ID.md"

for command in python3 zip sha256sum; do
  command -v "$command" >/dev/null 2>&1 || {
    echo "ERROR: required command not found: $command" >&2
    exit 1
  }
done

[[ -f "$PLUGIN_ROOT/manifest.json" ]] || {
  echo "ERROR: manifest.json not found under $PLUGIN_ROOT" >&2
  exit 1
}
[[ -f "$STATE_SOURCE" ]] || {
  echo "ERROR: state ledger not found: $STATE_SOURCE" >&2
  exit 1
}

mkdir -p "$OUTPUT_DIR"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$TMP/canto-span"

# Copy the resumable working tree while excluding non-distributable or regenerated material.
(
  cd "$PLUGIN_ROOT"
  tar \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='__pycache__' \
    --exclude='*.pyc' \
    --exclude='*.zip' \
    --exclude='*.canto-span-full-diagnostics.json' \
    --exclude='*.canto-span-acceptance-summary.json' \
    -cf - .
) | (cd "$TMP/canto-span" && tar -xf -)

cp "$STATE_SOURCE" "$STATE_PATH"
cp "$STATE_SOURCE" "$TMP/canto-span/CHECKPOINT-STATE.md"

python3 - "$PLUGIN_ROOT" "$TMP/canto-span" "$CHECKPOINT_ID" <<'PY'
import datetime as dt
import json
import sys
from pathlib import Path

source = Path(sys.argv[1])
destination = Path(sys.argv[2])
checkpoint_id = sys.argv[3]
manifest = json.loads((source / "manifest.json").read_text(encoding="utf-8"))
package_manifest = json.loads((source / "PACKAGE-MANIFEST.json").read_text(encoding="utf-8"))
metadata = {
    "schema": "canto-span-progress-checkpoint-v1",
    "checkpoint_id": checkpoint_id,
    "created_at_utc": dt.datetime.now(dt.timezone.utc).isoformat(),
    "runtime_manifest_version": manifest.get("version"),
    "accepted_parser_behavior": package_manifest.get("accepted_parser_behavior"),
    "accepted_governance_release": package_manifest.get("accepted_governance_release"),
    "active_candidate": package_manifest.get("active_candidate"),
    "new_grammar_acceptance": package_manifest.get("new_grammar_acceptance"),
    "checkpoint_status": "RESUMABLE_WORK_IN_PROGRESS_NOT_ACCEPTANCE",
    "state_ledger": "CHECKPOINT-STATE.md",
}
(destination / "PROGRESS-CHECKPOINT.json").write_text(
    json.dumps(metadata, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)
PY

rm -f "$ZIP_PATH" "$HASH_PATH"
(
  cd "$TMP"
  zip -q -9 -r "$ZIP_PATH" canto-span
)

(
  cd "$OUTPUT_DIR"
  sha256sum "$(basename "$ZIP_PATH")" > "$(basename "$HASH_PATH")"
)

python3 - "$ZIP_PATH" <<'PY'
import json
import sys
import zipfile

path = sys.argv[1]
with zipfile.ZipFile(path) as archive:
    names = archive.namelist()
    if not names or any(not name.startswith("canto-span/") for name in names):
        raise SystemExit("checkpoint ZIP does not have one canto-span/ root")
    manifest = json.loads(archive.read("canto-span/manifest.json"))
    metadata = json.loads(archive.read("canto-span/PROGRESS-CHECKPOINT.json"))
    if metadata.get("new_grammar_acceptance") != "FROZEN":
        raise SystemExit("checkpoint metadata does not preserve grammar freeze")
    print(json.dumps({
        "status": "PASS",
        "zip": path,
        "entries": len(names),
        "manifest_version": manifest.get("version"),
        "checkpoint_id": metadata.get("checkpoint_id"),
        "new_grammar_acceptance": metadata.get("new_grammar_acceptance"),
    }, indent=2))
PY

echo "State ledger: $STATE_PATH"
echo "SHA-256:     $HASH_PATH"
