#!/usr/bin/env python3
"""Regression tests for the dependency-free ReFolDec validator."""
from pathlib import Path
import importlib.util
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / "scripts" / "refoldec-validate.py"
CAPTURE_VALIDATOR = ROOT / "scripts" / "refoldec-capture-validate.py"


def run(path: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run([sys.executable, str(VALIDATOR), str(path)], cwd=ROOT, text=True, capture_output=True)


def main() -> int:
    valid = run(ROOT / "examples" / "refoldec-fixtures" / "valid")
    if valid.returncode != 0:
        print(valid.stdout, valid.stderr)
        return 1
    release_root = ROOT / "examples" / "release-candidates"
    spec = importlib.util.spec_from_file_location("release_validator", VALIDATOR)
    validator = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(validator)
    release_paths = []
    captures = []
    for candidate in sorted(release_root.rglob("*")):
        if candidate.suffix.lower() not in {".json", ".yaml", ".yml", ".md"}:
            continue
        if candidate.name in validator.PACKAGE_SUPPORT_FILES | {"holdout-evaluation.json"}:
            continue
        try:
            document = validator.load_document(candidate)
        except Exception as exc:
            print(f"FAIL release document {candidate}: {exc}")
            return 1
        (captures if "capture_id" in document else release_paths).append(candidate)
    for release_path in release_paths:
        release = run(release_path)
        if release.returncode != 0:
            print(release.stdout, release.stderr)
            return 1
    for capture_path in captures:
        capture = subprocess.run([sys.executable, str(CAPTURE_VALIDATOR), str(capture_path)],
                                 cwd=ROOT, text=True, capture_output=True)
        if capture.returncode != 0:
            print(capture.stdout, capture.stderr)
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
