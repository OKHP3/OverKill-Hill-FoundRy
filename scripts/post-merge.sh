#!/bin/bash
set -e

python3 scripts/foundry-sync.py
python3 scripts/normalize_filenames.py . --recursive
