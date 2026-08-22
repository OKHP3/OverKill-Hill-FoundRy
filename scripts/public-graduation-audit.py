#!/usr/bin/env python3
"""Dry-run public graduation checklist; never changes the candidate."""
from __future__ import annotations
import json
import pathlib
import re
import sys

PRIVATE_MARKERS = ("private FoundRy", "private Notion", "employer confidential", "client confidential", "internal-only")

def main() -> int:
    candidate = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path("examples/release-candidates")
    if not candidate.exists():
        print(f"FAIL GOV-PUBLIC-001 candidate missing: {candidate} (remediation: pass a release candidate path)")
        return 1
    files = list(candidate.rglob("*")) if candidate.is_dir() else [candidate]
    root = candidate if candidate.is_dir() else candidate.parent
    failures: list[str] = []
    text = "\n".join(path.read_text(encoding="utf-8", errors="replace") for path in files if path.is_file() and path.suffix.lower() in {".md", ".json", ".yaml", ".yml"})
    if any(marker.lower() in text.lower() for marker in PRIVATE_MARKERS):
        failures.append("GOV-PUBLIC-007 private-source separation failed (remediation: remove private/client/employer material from the candidate)")
    json_files = [path for path in files if path.suffix.lower() == ".json"]
    for path in json_files:
        try:
            payload = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            failures.append(f"GOV-PUBLIC-008 {path} is invalid JSON: {exc}")
            continue
        reviews = payload.get("publication", {}).get("reviews", {})
        publication = payload.get("publication", {})
        for key in ("manifest_complete", "readme_externalized"):
            if publication.get(key) is not True:
                failures.append(f"GOV-PUBLIC-002 {path.name}: {key} is not confirmed (remediation: complete the release metadata and reader-facing documentation)")
        if publication.get("visibility") != "public":
            failures.append(f"GOV-PUBLIC-003 {path.name}: publication.visibility must be public (remediation: do not graduate an unclassified candidate)")
        for key in ("pii_review", "source_review", "license_review"):
            if reviews.get(key) is not True:
                failures.append(f"GOV-PUBLIC-004 {path.name}: {key} is not confirmed (remediation: record true only after human review)")
        if publication.get("source_access") != "public":
            failures.append(f"GOV-PUBLIC-005 {path.name}: source_access must be public (remediation: separate private source material)")
    if failures:
        print("\n".join("FAIL " + failure for failure in failures))
        print("DRY RUN ONLY: no files were changed or published.")
        return 1
    print(f"OK public graduation checklist passed for {candidate}")
    print("DRY RUN ONLY: no files were changed or published.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())