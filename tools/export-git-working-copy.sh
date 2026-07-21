#!/usr/bin/env bash
set -euo pipefail

allow_dirty=false
output=""

while (($#)); do
  case "$1" in
    --allow-dirty)
      allow_dirty=true
      shift
      ;;
    -o|--output)
      [[ $# -ge 2 ]] || { echo "Missing output path" >&2; exit 2; }
      output=$2
      shift 2
      ;;
    *)
      echo "Usage: $0 [--allow-dirty] [-o OUTPUT.zip]" >&2
      exit 2
      ;;
  esac
done

repo=$(git rev-parse --show-toplevel 2>/dev/null) || {
  echo "Not inside a Git repository" >&2
  exit 1
}

cd "$repo"

if [[ "$allow_dirty" != true ]] && [[ -n $(git status --porcelain) ]]; then
  echo "Repository has uncommitted changes. Commit them first or use --allow-dirty." >&2
  git status --short >&2
  exit 1
fi

repo_name=$(basename "$repo")
short_commit=$(git rev-parse --short=12 HEAD)
if [[ -z "$output" ]]; then
  output="$(dirname "$repo")/${repo_name}-working-copy-${short_commit}.zip"
fi
output=$(realpath -m "$output")

case "$output" in
  "$repo"/*)
    echo "Output ZIP must be outside the repository to avoid recursive inclusion." >&2
    exit 1
    ;;
esac

rm -f "$output"
(
  cd "$(dirname "$repo")"
  zip -q -r "$output" "$repo_name" \
    -x "$repo_name/.git/objects/pack/*.keep" \
    -x "$repo_name/exports/*" \
    -x "$repo_name/*.zip"
)

unzip -tq "$output" >/dev/null
unzip -p "$output" "${repo_name}/.git/HEAD" >/dev/null 2>&1 || {
  echo "Export verification failed: .git/HEAD is missing" >&2
  exit 1
}

sha=$(sha256sum "$output" | awk '{print $1}')
size=$(stat -c '%s' "$output")
printf 'export=%s\ncommit=%s\nsha256=%s\nbytes=%s\n' "$output" "$(git rev-parse HEAD)" "$sha" "$size"
