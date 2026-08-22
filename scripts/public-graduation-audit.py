#!/usr/bin/env python3
"""Dry-run public graduation checklist; never changes the candidate.

The candidate is treated as a self-contained release shelf.  This audit is
deliberately conservative: it checks presence and references, but it does not
grant publication approval or change repository visibility.
"""
from __future__ import annotations
import json
import pathlib
import re
import sys

PRIVATE_MARKERS = ("private FoundRy", "private Notion", "employer confidential", "client confidential", "internal-only")
REQUIRED_FILES = (
    "README.md",
    "release-manifest.json",
    "specification.md",
    "schema.json",
    "LICENSE",
    "ATTRIBUTION.md",
    "provenance.json",
    "CHANGELOG.md",
    "equilibrium-decision.md",
    "release-checklist.md",
    "rollback-plan.md",
    "validator/refoldec-validate.py",
    "skill/SKILL.md",
    "skill/references/process-map.md",
    "skill/references/maintenance.md",
    "skill/tests/evals.json",
    "examples/public-process.json",
)
PACKAGE_SUPPORT_JSON = {"release-manifest.json", "schema.json", "provenance.json", "review.json", "evals.json"}
FORBIDDEN_REFERENCE_PATTERNS = (
    r"notion(?:\.so)?/[^\s)]+",
    r"github\.com/[^/\s]+/overkill-hill-foundry",
)

def main() -> int:
    candidate = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path("examples/release-candidates")
    if not candidate.exists():
        print(f"FAIL GOV-PUBLIC-001 candidate missing: {candidate} (remediation: pass a release candidate path)")
        return 1
    files = list(candidate.rglob("*")) if candidate.is_dir() else [candidate]
    root = candidate if candidate.is_dir() else candidate.parent
    failures: list[str] = []
    if candidate.is_dir():
        for required in REQUIRED_FILES:
            if not (candidate / required).is_file():
                failures.append(f"GOV-PUBLIC-009 missing required public package file {required} (remediation: assemble the complete release shelf)")
    text_files = [path for path in files if path.is_file() and path.suffix.lower() in {".md", ".json", ".yaml", ".yml", ".py"}]
    text = "\n".join(path.read_text(encoding="utf-8", errors="replace") for path in text_files)
    if any(marker.lower() in text.lower() for marker in PRIVATE_MARKERS):
        failures.append("GOV-PUBLIC-007 private-source separation failed (remediation: remove private/client/employer material from the candidate)")
    for pattern in FORBIDDEN_REFERENCE_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            failures.append(f"GOV-PUBLIC-010 restricted dependency/reference detected: {pattern} (remediation: replace it with self-contained public text)")
    json_files = [path for path in files if path.suffix.lower() == ".json"]
    for path in json_files:
        if path.name in PACKAGE_SUPPORT_JSON:
            continue
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
    manifest_path = candidate / "release-manifest.json"
    if manifest_path.is_file():
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            target = manifest.get("target_public_surface", {})
            if not target.get("name") or target.get("approval_status") not in {"pending-owner-approval", "approved"}:
                failures.append("GOV-PUBLIC-011 target_public_surface must name a separately owned surface and state approval status")
            if manifest.get("deployment", {}).get("automatic") is not False:
                failures.append("GOV-PUBLIC-012 deployment.automatic must be false (remediation: deploy only after the graduation gate)")
        except json.JSONDecodeError as exc:
            failures.append(f"GOV-PUBLIC-008 release-manifest.json is invalid JSON: {exc}")
    if failures:
        print("\n".join("FAIL " + failure for failure in failures))
        print("DRY RUN ONLY: no files were changed or published.")
        return 1
    print(f"OK public graduation checklist passed for {candidate}")
    print("DRY RUN ONLY: no files were changed or published.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())