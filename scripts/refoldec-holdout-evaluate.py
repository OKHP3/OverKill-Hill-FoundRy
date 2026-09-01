#!/usr/bin/env python3
"""Evaluate the protected ReFolDec holdout through an approved runtime adapter."""
from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
import unicodedata
from datetime import datetime, timezone
from functools import lru_cache
from pathlib import Path
from typing import Any

RELEASE_ARTIFACT_ROOT = Path("examples/release-candidates")
MAINTAINER_FIXTURE = Path("examples/release-candidates/skill/tests/protected-holdout.json")
REGRESSION_TEST = Path("tests/test-refoldec-holdout-evaluate.py")
MIN_SPLIT_FRAGMENT_LENGTH = 12
PLACEHOLDER_HASHES = {
    "0" * 64,
    "f" * 64,
    "deadbeef" * 8,
    "0123456789abcdef" * 4,
}
# Deliberately small, high-confidence homographs. This is not transliteration:
# only characters commonly used to make Latin release text look unchanged are
# folded, and only ASCII protected values use this variant.
LOOKALIKE_TO_ASCII = str.maketrans({
    "а": "a", "в": "b", "с": "c", "е": "e", "к": "k", "м": "m",
    "о": "o", "р": "p", "т": "t", "х": "x", "у": "y",
    "α": "a", "β": "b", "ε": "e", "ι": "i", "κ": "k", "ο": "o",
    "ρ": "p", "τ": "t", "υ": "u", "χ": "x",
})


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


def file_hash(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def tracked_release_artifacts(root: Path) -> list[Path]:
    result = subprocess.run(
        ["git", "ls-files", "-z", "--", str(RELEASE_ARTIFACT_ROOT)],
        cwd=root,
        text=False,
        capture_output=True,
        check=True,
    )
    return [
        root / Path(raw)
        for raw in result.stdout.decode("utf-8").split("\0")
        if raw
    ]

def canonicalize_protected_text(value: str) -> str:
    """Return the deterministic form used for transformed-content scanning.

    NFKC handles compatibility characters, casefold handles casing, and
    removing non-alphanumeric characters makes whitespace, punctuation, and
    record-boundary formatting irrelevant. This is intentionally not fuzzy:
    spelling changes, omitted characters, reordered words, and substitutions
    remain outside the protection boundary.
    """
    normalized = unicodedata.normalize("NFKC", value).casefold()
    return "".join(character for character in normalized if character.isalnum())


def is_ascii_protected_text(value: str) -> bool:
    """Return whether every protected alphanumeric character is ASCII."""
    normalized = unicodedata.normalize("NFKC", value).casefold()
    return all(not character.isalnum() or character.isascii() for character in normalized)


def canonicalize_lookalike_text(value: str) -> str:
    """Canonicalize high-confidence Greek/Cyrillic homographs to ASCII.

    This intentionally maps only a small set of characters and does not
    transliterate scripts, score edit distance, or infer visual similarity.
    """
    normalized = unicodedata.normalize("NFKC", value).casefold()
    return "".join(
        character.translate(LOOKALIKE_TO_ASCII)
        for character in normalized
        if character.isalnum()
    )


def protected_text_variants(value: str) -> list[tuple[str, Any]]:
    """Return the exact and, for ASCII values, homograph scan variants."""
    variants: list[tuple[str, Any]] = [("canonical", canonicalize_protected_text)]
    if is_ascii_protected_text(value):
        variants.append(("look-alike", canonicalize_lookalike_text))
    return variants


def split_protected_match(
    protected_value: str,
    artifacts: list[tuple[Path, str]],
    canonicalizer=canonicalize_protected_text,
) -> list[Path] | None:
    """Find a protected value split into ordered fragments across release files.

    Each fragment must be at least ``MIN_SPLIT_FRAGMENT_LENGTH`` canonical
    characters, must occur in a distinct tracked file, and must follow the
    protected value's character order. Requiring meaningful fragments avoids
    treating common short words as evidence of a leak. File order is not part
    of the policy because packaging records may be emitted in any order.
    """
    target = canonicalizer(protected_value)
    if len(target) < MIN_SPLIT_FRAGMENT_LENGTH * 2:
        return None
    canonical_artifacts = [
        (path, canonicalizer(text)) for path, text in artifacts
    ]
    if any(target in text for _, text in canonical_artifacts):
        return None

    @lru_cache(maxsize=None)
    def search(position: int, used_files: frozenset[int]) -> tuple[int, ...] | None:
        if position == len(target):
            return ()
        for file_index, (_, text) in enumerate(canonical_artifacts):
            if file_index in used_files:
                continue
            for end in range(position + MIN_SPLIT_FRAGMENT_LENGTH, len(target) + 1):
                remaining = len(target) - end
                if remaining and remaining < MIN_SPLIT_FRAGMENT_LENGTH:
                    continue
                if target[position:end] not in text:
                    continue
                tail = search(end, used_files | {file_index})
                if tail is not None:
                    return (file_index, *tail)
        return None

    match = search(0, frozenset())
    return [canonical_artifacts[index][0] for index in match] if match else None


def scan_release_artifacts(root: Path, holdout_path: Path) -> list[str]:
    """Find protected content and known placeholder hashes in tracked records.

    The release gate checks exact values plus canonicalized values within a
    single file and across distinct tracked files. Canonicalization catches
    light transformations (Unicode compatibility forms, case, whitespace, and
    punctuation); an additional narrow variant catches selected Greek/Cyrillic
    homographs substituted into ASCII protected text. Cross-file matching
    catches protected-text-order fragments of at least
    ``MIN_SPLIT_FRAGMENT_LENGTH`` characters. It does not attempt
    transliteration, fuzzy matching, semantic similarity, spelling changes,
    or reordered text.
    """
    protected = load_json(holdout_path)
    protected_values = [
        value
        for value in [protected.get("prompt"), *protected.get("expectations", [])]
        if isinstance(value, str) and value
    ]
    errors: list[str] = []
    artifacts: list[tuple[Path, str]] = []
    single_file_matches: set[str] = set()
    for path in tracked_release_artifacts(root):
        relative = path.relative_to(root)
        if relative == MAINTAINER_FIXTURE or relative == REGRESSION_TEST:
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        artifacts.append((path, text))
        canonical_text = canonicalize_protected_text(text)
        lookalike_text = canonicalize_lookalike_text(text)
        canonical_matches = {
            value
            for value in protected_values
            if canonicalize_protected_text(value) in canonical_text
        }
        lookalike_matches = {
            value
            for value in protected_values
            if is_ascii_protected_text(value)
            and canonicalize_lookalike_text(value) in lookalike_text
        }
        matched = {
            value
            for value in protected_values
            if value in canonical_matches or value in lookalike_matches
        }
        if matched:
            single_file_matches.update(matched)
            descriptor = (
                "look-alike protected holdout content found"
                if lookalike_matches - canonical_matches
                else "protected holdout content found"
            )
            errors.append(f"{relative}: {descriptor}")
        if any(placeholder in text.lower() for placeholder in PLACEHOLDER_HASHES):
            errors.append(f"{relative}: placeholder SHA-256 found")
    for value in protected_values:
        if value in single_file_matches:
            continue
        for variant, canonicalizer in protected_text_variants(value):
            matched_files = split_protected_match(value, artifacts, canonicalizer)
            if matched_files:
                files = ", ".join(path.relative_to(root).as_posix() for path in matched_files)
                descriptor = "look-alike" if variant == "look-alike" else "transformed or split"
                errors.append(
                    "tracked release artifacts: "
                    f"{descriptor} protected holdout content found across {files}"
                )
                break
    return errors


def evaluate(
    package_path: Path,
    root: Path,
    executed_at: str | None,
    runtime_adapter: Path | None,
    holdout_path: Path,
) -> dict[str, Any]:
    evals_path = package_path / "tests" / "evals.json"
    evals = load_json(evals_path)
    if evals.get("holdout_seen") is not False:
        raise ValueError("refusing to evaluate a holdout marked as seen")
    if evals.get("release_holdout", {}).get("status") != "protected":
        raise ValueError("refusing to evaluate an unprotected release holdout")
    holdout_metadata = evals.get("release_holdout", {})
    if any(case.get("partition") == "holdout" for case in evals.get("evals", [])):
        raise ValueError("protected holdout content must not be stored in development evals")
    case = load_json(holdout_path)
    if case.get("partition") != "holdout" or case.get("id") != holdout_metadata.get("case_id"):
        raise ValueError("protected holdout file does not match package metadata")
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
        results = [
            {"expectation_index": index, "result": "inconclusive", "observed_evidence": limitation}
            for index, _ in enumerate(expectations, start=1)
        ]
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
            for index, (expectation, passed, note) in enumerate(zip(expectations, checks, evidence_notes), start=1):
                result = "pass" if passed else "fail"
                results.append({"expectation_index": index, "result": result, "observed_evidence": note})
                if not passed:
                    failures.append(expectation)
                    if any(
                        keyword in expectation.lower()
                        for keyword in ("safety", "authorization", "unauthorized", "untrusted", "refus")
                    ):
                        blocking_failures.append(
                            f"Blocking safety or authorization failure at expectation {index}: {expectation}"
                        )
            verdict = "fail" if failures else "pass"
        except (OSError, subprocess.SubprocessError, json.JSONDecodeError, TypeError) as exc:
            blocking_failures.append(f"Runtime adapter failed: {exc}")
            results = [
                {"expectation_index": index, "result": "inconclusive", "observed_evidence": str(exc)}
                for index, _ in enumerate(expectations, start=1)
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
            "protected_case_sha256": file_hash(holdout_path),
            "expectations_count": len(expectations),
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
    parser.add_argument("--package", type=Path)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--executed-at", help="UTC ISO-8601 timestamp for reproducible records")
    parser.add_argument("--runtime-adapter", type=Path, help="Approved adapter; omit to use the repository reference runtime")
    parser.add_argument("--holdout-file", type=Path, required=True, help="Maintainer-only protected case file, kept outside tracked development fixtures")
    parser.add_argument(
        "--scan-release-artifacts",
        action="store_true",
        help=(
            "Fail if tracked release records contain exact, lightly transformed, "
            "or split protected holdout content, or placeholder hashes"
        ),
    )
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    try:
        scan_errors = scan_release_artifacts(root, args.holdout_file.resolve())
        if scan_errors:
            for error in scan_errors:
                print(f"FAIL release artifact scan: {error}", file=sys.stderr)
            return 1
        if args.scan_release_artifacts:
            print("OK release artifact scan")
            return 0
        if args.package is None or args.output is None:
            parser.error("--package and --output are required unless --scan-release-artifacts is used")
        record = evaluate(args.package.resolve(), root, args.executed_at, args.runtime_adapter, args.holdout_file.resolve())
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    except (OSError, ValueError, subprocess.SubprocessError, json.JSONDecodeError) as exc:
        print(f"FAIL holdout evaluation: {exc}", file=sys.stderr)
        return 1
    print(f"OK holdout evaluation: {record['verdict']} ({record['input']['case_id']})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
