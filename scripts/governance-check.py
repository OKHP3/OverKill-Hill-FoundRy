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


def unavailable_check(name: str, script_path: pathlib.Path) -> int:
    """Report a missing configured check with a repair path."""
    print(
        f"ERROR: governance check unavailable: {name} ({script_path})",
        file=sys.stderr,
        flush=True,
    )
    print(
        "Repair: restore the check script or update its path in "
        "scripts/governance-check.py.",
        file=sys.stderr,
        flush=True,
    )
    return 1


def main() -> int:
    """Run each existing governance check and preserve its result."""
    for name, command in CHECKS:
        print(f"==> {name}", flush=True)
        script_path = ROOT / command[0]
        if not script_path.is_file():
            return unavailable_check(name, script_path)
        try:
            result = subprocess.run(
                [sys.executable, str(script_path), *command[1:]],
                cwd=ROOT,
            )
        except FileNotFoundError:
            return unavailable_check(name, script_path)
        if result.returncode:
            return result.returncode
    print("Governance validation complete: all checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())