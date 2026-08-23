#!/usr/bin/env python3
"""Regression tests for the protected ReFolDec holdout evaluator."""
from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOOL = ROOT / "scripts" / "refoldec-holdout-evaluate.py"
PACKAGE = ROOT / "examples" / "release-candidates" / "skill"


def main() -> int:
    with tempfile.TemporaryDirectory(prefix="refoldec-holdout-") as directory:
        output = Path(directory) / "holdout.json"
        result = subprocess.run(
            [
                sys.executable,
                str(TOOL),
                "--package",
                str(PACKAGE),
                "--output",
                str(output),
                "--executed-at",
                "2026-08-22T00:00:00+00:00",
            ],
            cwd=ROOT,
            text=True,
            capture_output=True,
        )
        if result.returncode:
            print(result.stdout, result.stderr)
            return 1
        record = json.loads(output.read_text(encoding="utf-8"))
        if record["verdict"] != "inconclusive":
            print("FAIL instruction-only package must remain inconclusive")
            return 1
        if record["input"]["case_id"] != "unseen-holdout":
            print("FAIL evaluator selected the wrong case")
            return 1
        if any(item["result"] != "inconclusive" for item in record["output"]["results"]):
            print("FAIL unexecuted expectations were treated as observed behavior")
            return 1
        if record["output"]["blocking_failures"]:
            print("FAIL no blocking failure should be invented for an unavailable runtime")
            return 1
    print("OK ReFolDec holdout evaluator")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())