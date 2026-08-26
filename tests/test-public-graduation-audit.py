#!/usr/bin/env python3
"""Regression tests for contradictory public graduation release records."""
from __future__ import annotations

import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUDIT = ROOT / "scripts" / "public-graduation-audit.py"
RELEASE = ROOT / "examples" / "release-candidates"


def run(candidate: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, str(AUDIT), str(candidate)],
        cwd=ROOT,
        text=True,
        capture_output=True,
    )


def edit_json(candidate: Path, name: str, edit) -> None:
    path = candidate / name
    payload = json.loads(path.read_text(encoding="utf-8"))
    edit(payload)
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def expect_failure(candidate: Path, *needles: str) -> bool:
    result = run(candidate)
    output = result.stdout + result.stderr
    if result.returncode == 0:
        print(f"FAIL contradictory release record was accepted: {needles}")
        return False
    if any(needle not in output for needle in needles):
        print(f"FAIL audit omitted actionable conflict {needles}:\n{output}")
        return False
    return True


def main() -> int:
    baseline = run(RELEASE)
    if baseline.returncode != 0:
        print(baseline.stdout, baseline.stderr)
        return 1

    with tempfile.TemporaryDirectory(prefix="public-graduation-audit-") as directory:
        candidate = Path(directory) / "release-candidates"
        shutil.copytree(RELEASE, candidate)

        edit_json(
            candidate,
            "provenance.json",
            lambda data: data["reviews"]["holdout_evaluation"].update(
                status="reference-runtime-pass"
            ),
        )
        if not expect_failure(
            candidate,
            "provenance.json",
            "holdout evaluation status",
            "remediation:",
        ):
            return 1

        shutil.rmtree(candidate)
        shutil.copytree(RELEASE, candidate)
        edit_json(
            candidate,
            "holdout-evaluation.json",
            lambda data: data.update(evaluated_package_matches_current=True),
        )
        if not expect_failure(
            candidate,
            "holdout-evaluation.json",
            "evaluated_package_matches_current",
            "rerun the protected holdout",
        ):
            return 1

        shutil.rmtree(candidate)
        shutil.copytree(RELEASE, candidate)
        edit_json(
            candidate,
            "release-manifest.json",
            lambda data: data["deployment"].update(automatic=True, enabled=True),
        )
        if not expect_failure(
            candidate,
            "release-manifest.json",
            "deployment.automatic",
            "deployment.enabled",
            "keep deployment manual and disabled",
        ):
            return 1

        shutil.rmtree(candidate)
        shutil.copytree(RELEASE, candidate)
        edit_json(
            candidate,
            "provenance.json",
            lambda data: data["claims"].update(canonical=True),
        )
        if not expect_failure(
            candidate,
            "provenance.json",
            "claims",
            "make provenance.json claim flags exactly match the manifest",
        ):
            return 1

        shutil.rmtree(candidate)
        shutil.copytree(RELEASE, candidate)
        readme = candidate / "README.md"
        readme.write_text(
            readme.read_text(encoding="utf-8").replace(
                "| Equilibrium decision | `defer-for-evidence` |",
                "| Equilibrium decision | `approve` |",
            ),
            encoding="utf-8",
        )
        if not expect_failure(
            candidate,
            "README.md",
            "release decision",
            "update the reader-facing record",
        ):
            return 1

        shutil.rmtree(candidate)
        shutil.copytree(RELEASE, candidate)
        edit_json(
            candidate,
            "holdout-evaluation.json",
            lambda data: data.update(current_package_sha256="0" * 64),
        )
        if not expect_failure(
            candidate,
            "holdout-evaluation.json",
            "current-package hash",
            "recompute current_package_sha256",
        ):
            return 1

        shutil.rmtree(candidate)
        shutil.copytree(RELEASE, candidate)
        edit_json(
            candidate,
            "release-manifest.json",
            lambda data: data.update(version="0.2.0"),
        )
        if not expect_failure(
            candidate,
            "provenance.json",
            "version",
            "copy the manifest release version",
        ):
            return 1

    print("OK public graduation release-record audit")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())