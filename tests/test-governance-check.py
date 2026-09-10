#!/usr/bin/env python3
"""Regression tests for governance-check.py ordering, propagation, and fail-fast behavior."""
from __future__ import annotations

import importlib.util
import os
import subprocess
import sys
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RUNNER = ROOT / "scripts" / "governance-check.py"
WORKFLOW = ROOT / ".github" / "workflows" / "governance.yml"
EXPECTED_FAILURE = 23
EXPECTED_CI_ENTRY_POINT = "python3 scripts/governance-check.py"
EXPECTED_CHECKS = (
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


def run_with_checks(
    runner, checks: tuple[tuple[str, tuple[str, ...]], ...]
) -> tuple[int, str]:
    original_checks = runner.CHECKS
    runner.CHECKS = checks
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


def successful_check_scripts(
    directory: Path, checks: tuple[tuple[str, tuple[str, ...]], ...], execution_log: Path
) -> tuple[tuple[str, tuple[str, ...]], ...]:
    """Create successful checks that record the order in which they run."""
    replacements = []
    for index, (name, _) in enumerate(checks):
        script = directory / f"successful-check-{index}.py"
        script.write_text(
            "from pathlib import Path\n"
            f"with Path({str(execution_log)!r}).open('a', encoding='utf-8') as output:\n"
            f"    output.write({name!r} + '\\n')\n",
            encoding="utf-8",
        )
        replacements.append((name, (str(script),)))
    return tuple(replacements)


def main() -> int:
    before = repository_snapshot()
    runner = load_runner()

    if runner.CHECKS != EXPECTED_CHECKS:
        print(
            "FAIL governance runner checks differ from the declared order or commands:\n"
            f"expected {EXPECTED_CHECKS!r}\n"
            f"got {runner.CHECKS!r}"
        )
        return 1

    workflow = WORKFLOW.read_text(encoding="utf-8")
    if workflow.count(f"run: {EXPECTED_CI_ENTRY_POINT}") != 1:
        print(
            "FAIL governance workflow does not use the unified entry point exactly once: "
            f"{EXPECTED_CI_ENTRY_POINT}"
        )
        return 1

    with tempfile.TemporaryDirectory(prefix="governance-check-") as directory:
        directory_path = Path(directory)
        execution_log = directory_path / "execution-order.log"
        successful_checks = successful_check_scripts(
            directory_path, EXPECTED_CHECKS, execution_log
        )
        status, output = run_with_checks(runner, successful_checks)
        recorded_order = execution_log.read_text(encoding="utf-8").splitlines()
        expected_order = [name for name, _ in EXPECTED_CHECKS]
        if status != 0:
            print(
                "FAIL governance runner rejected healthy checks: "
                f"expected 0, got {status}\n{output}"
            )
            return 1
        if recorded_order != expected_order:
            print(
                "FAIL governance runner executed healthy checks out of order:\n"
                f"expected {expected_order!r}\n"
                f"got {recorded_order!r}"
            )
            return 1

        failing_check = Path(directory) / "failing-check.py"
        failing_check.write_text(
            "import sys\n"
            f"print({ACTIONABLE_FAILURE!r}, file=sys.stderr, flush=True)\n"
            f"raise SystemExit({EXPECTED_FAILURE})\n",
            encoding="utf-8",
        )
        sentinel_marker = Path(directory) / "sentinel-ran"
        sentinel_check = Path(directory) / "sentinel-check.py"
        sentinel_check.write_text(
            f"from pathlib import Path\n"
            f"Path({str(sentinel_marker)!r}).write_text('ran', encoding='utf-8')\n",
            encoding="utf-8",
        )
        status, output = run_with_checks(
            runner,
            (
                ("Deliberately failing check", (str(failing_check),)),
                ("Sentinel check that must be skipped", (str(sentinel_check),)),
            ),
        )
        sentinel_ran = sentinel_marker.exists()

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
    if sentinel_ran:
        print("FAIL governance runner executed a check after the first failure")
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