#!/bin/bash
set -e
pnpm install --frozen-lockfile
python3 scripts/foundry-sync.py
python3 scripts/normalize_filenames.py . --recursive
