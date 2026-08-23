#!/usr/bin/env python3
"""Evaluate the protected ReFolDec holdout without executing untrusted package code.

The current ReFolDec artifact is an instruction package, not an executable
runtime. This evaluator therefore has a deliberately narrow boundary: it
loads the exact protected case, verifies that it is still protected, records
the package contract available to an evaluator, and reports inconclusive when
no approved runtime adapter exists.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def load_json(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path} must contain an object")
    return value


def package_version(skill_path: Path) -> str:
    for line in (skill_path / "SKILL.md").read_text(encoding="utf-8").splitlines():
        if line.startswith("  version:"):
            return line.split(":", 1)[1].strip().strip('"')
    raise ValueError("SKILL.md does not declare a package version")


def package_name(skill_path: Path) -> str:
    for line in (skill_path / "SKILL.md").read_text(encoding="utf-8").splitlines():
        if line.startswith("name:"):
            return line.split(":", 1)[1].strip()
    raise ValueError("SKILL.md does not declare a package name")


def repository_revision(root: Path) -> str:
    result = subprocess.run(
        ["git", "rev-parse", "HEAD"], cwd=root, text=True, capture_output=True, check=True
    )
    return result.stdout.strip()


def package_hash(skill_path: Path) -> str:
    digest = hashlib.sha256()
    for path in sorted(path for path in skill_path.rglob("*") if path.is_file()):
        digest.update(path.relative_to(skill_path).as_posix().encode("utf-8"))
        digest.update(b"\0")
        digest.update(path.read_bytes())
        digest.update(b"\0")
    return digest.hexdigest()


def evaluate(package_path: Path, root: Path, executed_at: str | None) -> dict[str, Any]:
    evals_path = package_path / "tests" / "evals.json"
    evals = load_json(evals_path)
    if evals.get("holdout_seen") is not False:
        raise ValueError("refusing to evaluate a holdout marked as seen")
    if evals.get("release_holdout", {}).get("status") != "protected":
        raise ValueError("refusing to evaluate an unprotected release holdout")
    holdouts = [case for case in evals.get("evals", []) if case.get("partition") == "holdout"]
    if len(holdouts) != 1:
        raise ValueError("expected exactly one protected holdout case")
    case = holdouts[0]
    expectations = case.get("expectations", [])
    if not expectations:
        raise ValueError("protected holdout must declare expectations")
    name = package_name(package_path)
    version = package_version(package_path)

    runtime_available = False
    raw_output = ""
    limitation = (
        "No approved executable runtime adapter is present; the package contains "
        "portable instructions only, so no model or package behavior was executed."
    )
    results = [
        {
            "expectation": expectation,
            "result": "inconclusive",
            "observed_evidence": limitation,
        }
        for expectation in expectations
    ]
    return {
        "evaluation_id": f"{name}-{version}-{case['id']}-holdout",
        "package": {
            "name": name,
            "version": version,
            "path": str(package_path),
            "sha256": package_hash(package_path),
        },
        "evaluator": {
            "identity": "refoldec-holdout-evaluator",
            "boundary": "offline-contract-inspection-no-package-execution",
            "runtime_available": runtime_available,
        },
        "executed_at": executed_at or datetime.now(timezone.utc).isoformat(),
        "repository_revision": repository_revision(root),
        "input": {
            "case_id": case["id"],
            "partition": case["partition"],
            "risk": case.get("risk"),
            "prompt": case["prompt"],
            "expectations": expectations,
        },
        "output": {
            "raw_output": raw_output,
            "results": results,
            "failures": [],
            "blocking_failures": [],
        },
        "verdict": "inconclusive",
        "release_consequence": (
            "Retain defer-for-evidence; do not make behavioral, reliability, "
            "outcome, or production-readiness claims."
        ),
        "limitations": [limitation],
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--package", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--executed-at", help="UTC ISO-8601 timestamp for reproducible records")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    try:
        record = evaluate(args.package.resolve(), root, args.executed_at)
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    except (OSError, ValueError, subprocess.SubprocessError, json.JSONDecodeError) as exc:
        print(f"FAIL holdout evaluation: {exc}", file=sys.stderr)
        return 1
    print(f"OK holdout evaluation: {record['verdict']} ({record['input']['case_id']})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())