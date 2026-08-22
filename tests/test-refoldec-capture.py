#!/usr/bin/env python3
"""Regression tests for the ReFolDec process-capture contract."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / "scripts" / "refoldec-capture-validate.py"


def run(path: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run([sys.executable, str(VALIDATOR), str(path)], cwd=ROOT, text=True, capture_output=True)


def main() -> int:
    valid = run(ROOT / "examples" / "refoldec-capture")
    if valid.returncode != 0:
        print(valid.stdout, valid.stderr)
        return 1
    invalid = run(ROOT / "examples" / "refoldec-capture-invalid.json")
    if invalid.returncode == 0 or "FAIL" not in invalid.stdout:
        print("FAIL invalid capture fixture did not fail as expected", invalid.stdout)
        return 1
    print("OK ReFolDec capture fixtures")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())