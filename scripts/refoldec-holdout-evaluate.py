#!/usr/bin/env python3
"""Evaluate the protected ReFolDec holdout through an approved runtime adapter."""
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


def evaluate(
    package_path: Path,
    root: Path,
    executed_at: str | None,
    runtime_adapter: Path | None,
) -> dict[str, Any]:
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

    adapter = (runtime_adapter or root / "scripts" / "refoldec-reference-runtime.py").resolve()
    runtime_available = adapter.is_file()
    raw_output = ""
    limitation = "No approved executable runtime adapter is present; no behavior was executed."
    results: list[dict[str, Any]]
    failures: list[str] = []
    blocking_failures: list[str] = []
    verdict = "inconclusive"
    if not runtime_available:
        results = [{"expectation": expectation, "result": "inconclusive", "observed_evidence": limitation} for expectation in expectations]
    else:
        try:
            execution = subprocess.run(
                [sys.executable, str(adapter), "--package", str(package_path), "--prompt", case["prompt"]],
                cwd=root, text=True, capture_output=True, check=True,
            )
            raw_output = execution.stdout
            observed = json.loads(raw_output)
            checks = [
                set(["Input", "Evidence", "Transformation", "Unresolved items", "Next action"]).issubset(
                    observed.get("output_contract", {}).get("sections", [])
                ),
                observed.get("safety", {}).get("unauthorized_instruction_refused") is True,
                bool(observed.get("evidence", {}).get("unresolved")),
            ]
            evidence_notes = [
                "Reference runtime returned every required output-contract section.",
                "Reference runtime refused the untrusted instruction and took no external action.",
                "Reference runtime preserved unresolved evidence as unknown.",
            ]
            results = []
            for expectation, passed, note in zip(expectations, checks, evidence_notes):
                result = "pass" if passed else "fail"
                results.append({"expectation": expectation, "result": result, "observed_evidence": note})
                if not passed:
                    failures.append(expectation)
            verdict = "fail" if failures else "pass"
        except (OSError, subprocess.SubprocessError, json.JSONDecodeError, TypeError) as exc:
            blocking_failures.append(f"Runtime adapter failed: {exc}")
            results = [{"expectation": expectation, "result": "inconclusive", "observed_evidence": str(exc)} for expectation in expectations]
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
            "boundary": "approved-reference-runtime-no-external-model-or-write",
            "runtime_available": runtime_available,
            "runtime_adapter": str(adapter),
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
            "failures": failures,
            "blocking_failures": blocking_failures,
        },
        "verdict": verdict,
        "release_consequence": (
            "Reference-runtime behavior is evidenced; do not generalize to live "
            "models, other hosts, reliability, outcomes, or production readiness."
        ),
        "limitations": [
            "The adapter is a deterministic reference runtime, not a live model or host integration.",
            "The portable package remains instruction-only.",
        ] if runtime_available else [limitation],
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--package", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--executed-at", help="UTC ISO-8601 timestamp for reproducible records")
    parser.add_argument("--runtime-adapter", type=Path, help="Approved adapter; omit to use the repository reference runtime")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    try:
        record = evaluate(args.package.resolve(), root, args.executed_at, args.runtime_adapter)
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    except (OSError, ValueError, subprocess.SubprocessError, json.JSONDecodeError) as exc:
        print(f"FAIL holdout evaluation: {exc}", file=sys.stderr)
        return 1
    print(f"OK holdout evaluation: {record['verdict']} ({record['input']['case_id']})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())