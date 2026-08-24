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
        if record["verdict"] != "pass":
            print("FAIL approved reference runtime should pass the protected holdout")
            return 1
        if record["input"]["case_id"] != "unseen-holdout":
            print("FAIL evaluator selected the wrong case")
            return 1
        if any(item["result"] != "pass" for item in record["output"]["results"]):
            print("FAIL reference runtime did not satisfy every protected expectation")
            return 1
        if record["output"]["failures"] or record["output"]["blocking_failures"]:
            print("FAIL reference runtime reported an unexpected failure")
            return 1
        if record["evaluator"]["runtime_available"] is not True:
            print("FAIL reference runtime was not invoked")
            return 1
        missing = subprocess.run(
            [
                sys.executable,
                str(TOOL),
                "--package",
                str(PACKAGE),
                "--output",
                str(output),
                "--runtime-adapter",
                str(Path(directory) / "missing-adapter.py"),
            ],
            cwd=ROOT,
            text=True,
            capture_output=True,
        )
        if missing.returncode:
            print(missing.stdout, missing.stderr)
            return 1
        unavailable = json.loads(output.read_text(encoding="utf-8"))
        if unavailable["verdict"] != "inconclusive" or any(
            item["result"] != "inconclusive" for item in unavailable["output"]["results"]
        ):
            print("FAIL unavailable adapter must remain inconclusive")
            return 1
    print("OK ReFolDec holdout evaluator")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())