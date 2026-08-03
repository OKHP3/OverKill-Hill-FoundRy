#!/bin/bash
set -e

# Post-merge setup for OverKill-Hill-FoundRy
# Installs/updates dependencies after a task merge.

# Node/pnpm dependencies (if pnpm-lock.yaml exists)
if [ -f pnpm-lock.yaml ]; then
  pnpm install --frozen-lockfile
fi

# Python dependencies (if requirements.txt exists)
if [ -f requirements.txt ]; then
  pip install -r requirements.txt --quiet
fi

# Project sync and normalization
python3 scripts/foundry-sync.py
python3 scripts/normalize_filenames.py . --recursive

echo "Post-merge setup complete."
