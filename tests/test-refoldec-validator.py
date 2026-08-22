#!/usr/bin/env python3
"""Regression tests for the dependency-free ReFolDec validator."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / "scripts" / "refoldec-validate.py"


def run(path: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run([sys.executable, str(VALIDATOR), str(path)], cwd=ROOT, text=True, capture_output=True)


def main() -> int:
    valid = run(ROOT / "examples" / "refoldec-fixtures" / "valid")
    if valid.returncode != 0:
        print(valid.stdout, valid.stderr)
        return 1
    release = run(ROOT / "examples" / "release-candidates")
    if release.returncode != 0:
        print(release.stdout, release.stderr)
        return 1
    invalid_dir = ROOT / "examples" / "refoldec-fixtures" / "invalid"
    for fixture in sorted(invalid_dir.iterdir()):
        result = run(fixture)
        if result.returncode == 0:
            print(f"FAIL expected fixture to fail: {fixture}")
            return 1
        if "FAIL" not in result.stdout:
            print(f"FAIL fixture had no actionable error: {fixture}\n{result.stdout}")
            return 1
    print("OK ReFolDec validator fixtures")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())