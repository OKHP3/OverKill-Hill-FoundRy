#!/usr/bin/env python3
"""Regression test for governance-check.py failure propagation."""
from __future__ import annotations

import importlib.util
import os
import subprocess
import sys
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RUNNER = ROOT / "scripts" / "governance-check.py"
EXPECTED_FAILURE = 23
ACTIONABLE_FAILURE = (
    "FAIL GOV-RUNNER-TEST: dependency check rejected fixture "
    "(remediation: inspect the fixture)"
)


def load_runner():
    spec = importlib.util.spec_from_file_location("governance_check_under_test", RUNNER)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"could not load governance runner: {RUNNER}")
    runner = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(runner)
    return runner


def repository_snapshot() -> dict[str, bytes]:
    result = subprocess.run(
        ["git", "ls-files", "-z"],
        cwd=ROOT,
        check=True,
        capture_output=True,
    )
    paths = result.stdout.split(b"\0")
    return {
        relative.decode("utf-8"): (ROOT / relative.decode("utf-8")).read_bytes()
        for relative in paths
        if relative
    }


def run_with_failing_check(runner, failing_check: Path) -> tuple[int, str]:
    original_checks = runner.CHECKS
    runner.CHECKS = (("Deliberately failing check", (str(failing_check),)),)
    try:
        with tempfile.TemporaryFile() as output:
            saved_stdout = os.dup(sys.stdout.fileno())
            saved_stderr = os.dup(sys.stderr.fileno())
            try:
                sys.stdout.flush()
                sys.stderr.flush()
                os.dup2(output.fileno(), sys.stdout.fileno())
                os.dup2(output.fileno(), sys.stderr.fileno())
                status = runner.main()
                sys.stdout.flush()
                sys.stderr.flush()
            finally:
                os.dup2(saved_stdout, sys.stdout.fileno())
                os.dup2(saved_stderr, sys.stderr.fileno())
                os.close(saved_stdout)
                os.close(saved_stderr)
            output.seek(0)
            text = output.read().decode("utf-8")
    finally:
        runner.CHECKS = original_checks
    return status, text


def main() -> int:
    before = repository_snapshot()
    runner = load_runner()

    with tempfile.TemporaryDirectory(prefix="governance-check-") as directory:
        failing_check = Path(directory) / "failing-check.py"
        failing_check.write_text(
            f"print({ACTIONABLE_FAILURE!r}, flush=True)\n"
            f"raise SystemExit({EXPECTED_FAILURE})\n",
            encoding="utf-8",
        )
        status, output = run_with_failing_check(runner, failing_check)

    after = repository_snapshot()
    if status != EXPECTED_FAILURE:
        print(
            "FAIL governance runner did not preserve the failing check status: "
            f"expected {EXPECTED_FAILURE}, got {status}"
        )
        return 1
    if ACTIONABLE_FAILURE not in output:
        print(
            "FAIL governance runner swallowed the actionable failure output:\n"
            f"{output}"
        )
        return 1
    if before != after:
        changed = sorted(set(before) ^ set(after))
        changed.extend(
            path for path in before.keys() & after.keys() if before[path] != after[path]
        )
        print(
            "FAIL governance runner mutated repository files:\n"
            + "\n".join(sorted(changed))
        )
        return 1

    print("OK governance runner failure propagation")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())