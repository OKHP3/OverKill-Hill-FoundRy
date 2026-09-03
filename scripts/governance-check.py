#!/usr/bin/env python3
"""Run the complete FoundRy governance validation sequence."""
from __future__ import annotations

import pathlib
import subprocess
import sys


ROOT = pathlib.Path(__file__).resolve().parents[1]

CHECKS = (
    (
        "Validate relay manifest",
        ("scripts/manifest-audit.py", str(ROOT)),
    ),
    (
        "Validate registry",
        ("scripts/registry-audit.py", str(ROOT)),
    ),
    (
        "Validate child scaffold and relay sync",
        ("scripts/foundry-sync.py", str(ROOT), "--strict"),
    ),
    (
        "Audit public release candidates (dry run)",
        ("scripts/public-graduation-audit.py", str(ROOT / "examples" / "release-candidates")),
    ),
    (
        "Test public graduation release-record consistency",
        ("tests/test-public-graduation-audit.py",),
    ),
)


def main() -> int:
    """Run each existing governance check and preserve its result."""
    for name, command in CHECKS:
        print(f"==> {name}", flush=True)
        result = subprocess.run(
            [sys.executable, str(ROOT / command[0]), *command[1:]],
            cwd=ROOT,
        )
        if result.returncode:
            return result.returncode
    print("Governance validation complete: all checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())