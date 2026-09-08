#!/bin/bash
set -euo pipefail

# Post-merge runs while the workspace workflows may still be active. Keep
# dependency reconciliation non-interactive and bounded so pnpm does not try
# to self-manage its version or fan out excessive child/network work.
pnpm install \
  --frozen-lockfile \
  --ignore-scripts \
  --config.manage-package-manager-versions=false \
  --child-concurrency=1 \
  --network-concurrency=1

python3 scripts/foundry-sync.py
python3 scripts/normalize_filenames.py . --recursive
