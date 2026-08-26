#!/usr/bin/env python3
"""Dry-run public graduation checklist; never changes the candidate.

The candidate is treated as a self-contained release shelf.  This audit is
deliberately conservative: it checks presence and references, but it does not
grant publication approval or change repository visibility.
"""
from __future__ import annotations
import hashlib
import json
import pathlib
import re
import sys
from typing import Any

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
PACKAGE_SUPPORT_JSON = {
    "release-manifest.json",
    "schema.json",
    "provenance.json",
    "review.json",
    "evals.json",
    "holdout-evaluation.json",
}
FORBIDDEN_REFERENCE_PATTERNS = (
    r"notion(?:\.so)?/[^\s)]+",
    r"github\.com/[^/\s]+/overkill-hill-foundry",
)


def _load_record(path: pathlib.Path, failures: list[str]) -> dict[str, Any] | None:
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        failures.append(
            f"GOV-PUBLIC-008 {path.name} is invalid JSON: {exc} "
            "(remediation: restore the release record as valid JSON)"
        )
        return None
    if not isinstance(payload, dict):
        failures.append(
            f"GOV-PUBLIC-008 {path.name} must contain a JSON object "
            "(remediation: restore the release record schema)"
        )
        return None
    return payload


def _record_conflict(
    failures: list[str],
    field: str,
    record: pathlib.Path,
    expected: Any,
    actual: Any,
    remediation: str,
) -> None:
    if actual != expected:
        failures.append(
            f"GOV-PUBLIC-015 {record.name}: {field} conflicts with the release "
            f"records (expected {expected!r}; found {actual!r}; "
            f"remediation: {remediation})"
        )


def _package_hash(package: pathlib.Path) -> str | None:
    if not package.is_dir():
        return None
    digest = hashlib.sha256()
    for path in sorted(path for path in package.rglob("*") if path.is_file()):
        digest.update(path.relative_to(package).as_posix().encode("utf-8"))
        digest.update(b"\0")
        digest.update(path.read_bytes())
        digest.update(b"\0")
    return digest.hexdigest()


def audit_release_records(candidate: pathlib.Path, failures: list[str]) -> None:
    """Reconcile machine-readable and reader-facing release records.

    This is intentionally read-only.  The manifest is the structured anchor,
    while the provenance, holdout, README, and checklist must describe the
    same bounded release state.
    """
    manifest_path = candidate / "release-manifest.json"
    provenance_path = candidate / "provenance.json"
    holdout_path = candidate / "holdout-evaluation.json"
    readme_path = candidate / "README.md"
    checklist_path = candidate / "release-checklist.md"
    required_records = (
        manifest_path,
        provenance_path,
        holdout_path,
        readme_path,
        checklist_path,
    )
    if not all(path.is_file() for path in required_records):
        return

    manifest = _load_record(manifest_path, failures)
    provenance = _load_record(provenance_path, failures)
    holdout = _load_record(holdout_path, failures)
    if manifest is None or provenance is None or holdout is None:
        return

    evaluation = manifest.get("evaluation", {})
    provenance_reviews = provenance.get("reviews", {})
    provenance_holdout = provenance_reviews.get("holdout_evaluation", {})
    holdout_package = holdout.get("package", {})

    version = manifest.get("version")
    decision = manifest.get("release_decision")
    evaluation_status = evaluation.get("status")
    claims = manifest.get("claims")
    deployment = manifest.get("deployment", {})
    current_package_hash = holdout.get("current_package_sha256")
    evaluated_package_hash = holdout_package.get("sha256")
    evaluated_matches_current = evaluation.get("evaluated_package_matches_current")

    _record_conflict(
        failures, "version", provenance_path, version, provenance.get("version"),
        "copy the manifest release version into provenance.json",
    )
    _record_conflict(
        failures, "version", holdout_path, version, holdout_package.get("version"),
        "bind holdout-evaluation.json to the manifest release version",
    )
    _record_conflict(
        failures, "holdout evaluation status", provenance_path, evaluation_status,
        provenance_holdout.get("status"),
        "use the same historical/current status in provenance.json and the manifest",
    )
    _record_conflict(
        failures, "behavioral_claims_supported", provenance_path,
        evaluation.get("behavioral_claims_supported"),
        provenance_holdout.get("behavioral_claims_supported"),
        "retain the manifest's bounded claim flag in provenance.json",
    )
    _record_conflict(
        failures, "evaluated_package_matches_current", provenance_path,
        evaluated_matches_current,
        provenance_holdout.get("evaluated_package_matches_current"),
        "set provenance.json to false until the current package is evaluated",
    )
    _record_conflict(
        failures, "claims", provenance_path, claims, provenance.get("claims"),
        "make provenance.json claim flags exactly match the manifest",
    )
    _record_conflict(
        failures, "evaluated_package_matches_current", holdout_path,
        evaluated_matches_current,
        holdout.get("evaluated_package_matches_current"),
        "set holdout-evaluation.json to false for historical evidence",
    )

    if current_package_hash != _package_hash(candidate / "skill"):
        failures.append(
            f"GOV-PUBLIC-020 {holdout_path.name}: current-package hash does not "
            "match the package on the release shelf "
            "(remediation: recompute current_package_sha256 for the current "
            "skill package, or rerun the holdout before approval)"
        )
    if current_package_hash == evaluated_package_hash:
        failures.append(
            f"GOV-PUBLIC-021 {holdout_path.name}: historical evaluation is "
            "presented as current evidence because evaluated and current package "
            "hashes are identical (remediation: record a fresh current-package "
            "holdout, or keep the historical result marked as non-current)"
        )
    if evaluation_status == "historical-reference-runtime-pass-current-package-rerun-required":
        for record, value in (
            (manifest_path, evaluation.get("evaluated_package_matches_current")),
            (provenance_path, provenance_holdout.get("evaluated_package_matches_current")),
            (holdout_path, holdout.get("evaluated_package_matches_current")),
        ):
            if value is not False:
                failures.append(
                    f"GOV-PUBLIC-022 {record.name}: historical evaluation status "
                    "requires evaluated_package_matches_current=false "
                    "(remediation: rerun the protected holdout against the "
                    "current package before approval)"
                )

    for key, expected in (("automatic", False), ("mode", "manual"), ("enabled", False)):
        _record_conflict(
            failures, f"deployment.{key}", manifest_path, expected,
            deployment.get(key),
            "keep deployment manual and disabled until every graduation gate passes",
        )

    readme = readme_path.read_text(encoding="utf-8")
    checklist = checklist_path.read_text(encoding="utf-8")
    version_match = re.search(
        r"^#\s+ReFolDec\s+(?P<version>\S+)\s+release candidate\s*$",
        readme,
        re.MULTILINE,
    )
    _record_conflict(
        failures, "version", readme_path, version,
        version_match.group("version") if version_match else None,
        "update the README heading to the manifest release version",
    )
    for record, text, phrase, field, expected in (
        (
            readme_path,
            readme,
            f"| Equilibrium decision | `{decision}` |",
            "release decision",
            decision,
        ),
        (
            readme_path,
            readme,
            "Historical reference-runtime pass; current-package rerun required",
            "evaluation status",
            evaluation_status,
        ),
    ):
        if phrase not in text:
            failures.append(
                f"GOV-PUBLIC-015 {record.name}: {field} is not represented "
                f"consistently (expected {expected!r}; remediation: update the "
                f"reader-facing record to match release-manifest.json)"
            )
    if "Deployment is intentionally a separate action and is disabled" not in readme:
        failures.append(
            f"GOV-PUBLIC-015 {readme_path.name}: deployment boundary conflicts "
            "(remediation: state that deployment is separate, manual, and disabled)"
        )
    if "[ ] Protected holdout was reviewed" not in checklist:
        failures.append(
            f"GOV-PUBLIC-015 {checklist_path.name}: current-package holdout gate "
            "is not visibly open (remediation: keep the historical result "
            "unchecked until the current package is evaluated)"
        )
    if "[ ] Equilibrium decision is updated from defer" not in checklist:
        failures.append(
            f"GOV-PUBLIC-015 {checklist_path.name}: deferred release decision "
            "is not visibly preserved (remediation: keep the equilibrium gate "
            "unchecked until the decision is updated)"
        )
    if "[ ] Only after all gates pass: separately authorize deployment." not in checklist:
        failures.append(
            f"GOV-PUBLIC-015 {checklist_path.name}: deployment boundary conflicts "
            "(remediation: retain the unchecked separate deployment authorization)"
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
            if manifest.get("deployment", {}).get("mode") != "manual":
                failures.append("GOV-PUBLIC-013 deployment.mode must be manual (remediation: keep deployment as a separate explicit action)")
            if manifest.get("deployment", {}).get("enabled") is not False:
                failures.append("GOV-PUBLIC-014 deployment.enabled must be false (remediation: do not enable deployment before every gate passes)")
        except json.JSONDecodeError as exc:
            failures.append(f"GOV-PUBLIC-008 release-manifest.json is invalid JSON: {exc}")
    if candidate.is_dir():
        audit_release_records(candidate, failures)
    if failures:
        print("\n".join("FAIL " + failure for failure in failures))
        print("DRY RUN ONLY: no files were changed or published.")
        return 1
    print(f"OK public graduation checklist passed for {candidate}")
    print("DRY RUN ONLY: no files were changed or published.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
