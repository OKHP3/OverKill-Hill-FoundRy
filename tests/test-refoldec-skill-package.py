#!/usr/bin/env python3
"""Regression tests for ReFolDec-to-Agent-Skill packaging gates."""
from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOOL = ROOT / "scripts" / "refoldec-skill-package.py"
SOURCE = ROOT / "examples" / "refoldec-capture" / "process-documentation.json"
PROFILE = ROOT / "examples" / "refoldec-skill-profile.json"


def run(*args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run([sys.executable, str(TOOL), *args], cwd=ROOT, text=True, capture_output=True)


def main() -> int:
    with tempfile.TemporaryDirectory(prefix="refoldec-package-") as directory:
        root = Path(directory)
        capture = root / "capture.json"
        profile = root / "profile.json"
        package = root / "package"
        data = json.loads(SOURCE.read_text())
        data["capture_id"] = "public-confirmed-process-capture"
        data["source_context"]["access"] = "public"
        data["source_context"]["source_ids"] = ["public-process-source-001"]
        data["capture_status"] = "confirmed"
        data["confirmation_gate"] = {
            "required": True, "status": "confirmed", "scope": "Public process confirmation.",
            "confirmed_by": "process-owner", "confirmed_at": "2026-08-22"
        }
        data["ambiguities"] = []
        capture.write_text(json.dumps(data, indent=2) + "\n")
        profile_data = json.loads(PROFILE.read_text())
        profile_data["source_lineage"]["capture_id"] = data["capture_id"]
        profile_data["source_lineage"]["source_ids"] = data["source_context"]["source_ids"]
        profile_data["source_lineage"]["artifact_hash"] = hashlib.sha256(capture.read_bytes()).hexdigest()
        profile.write_text(json.dumps(profile_data, indent=2) + "\n")

        built = run("package", "--process", str(capture), "--profile", str(profile), "--output", str(package))
        if built.returncode:
            print(built.stdout, built.stderr)
            return 1
        checked = run("validate", str(package))
        if checked.returncode:
            print(checked.stdout, checked.stderr)
            return 1
        if not (package / "review.json").is_file() or not (package / "assets" / "README.md").is_file():
            print("FAIL generated package omitted review or assets record")
            return 1

        private_profile = dict(profile_data)
        private_profile["source_lineage"] = dict(profile_data["source_lineage"], source_access="private")
        private_path = root / "private-profile.json"
        private_path.write_text(json.dumps(private_profile))
        rejected = run("package", "--process", str(capture), "--profile", str(private_path), "--output", str(root / "private"))
        if rejected.returncode == 0 or "public source access" not in (rejected.stdout + rejected.stderr):
            print("FAIL private source release was accepted", rejected.stdout, rejected.stderr)
            return 1
    print("OK ReFolDec skill package fixtures")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())