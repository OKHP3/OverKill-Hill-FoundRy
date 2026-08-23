#!/usr/bin/env python3
"""Validate ReFolDec artifacts without mutating them.

The validator intentionally uses only the Python standard library. JSON is
fully supported; YAML support covers the ordinary mappings, lists, and scalar
values used by ReFolDec files and front matter. Unsupported YAML is reported
as malformed rather than guessed.
"""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys
from typing import Any

ARTIFACT_TYPES = {"signal", "thought", "note", "concept", "outline", "process", "artifact", "system", "canon"}
MATURITY_STATES = {"raw", "captured", "structured", "modeled", "validated", "published", "canonical"}
VISIBILITIES = {"private", "public"}
SOURCE_ACCESS = {"public", "mixed", "private", "unknown"}
REQUIRED = ("id", "title", "artifact_type", "maturity_state", "source_context",
            "folded_outputs", "unfolded_primitives", "reuse_targets", "lineage",
            "publication", "freshness", "evidence")
ID_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
EVIDENCE_STATES = ("confirmed", "inferred", "unknown")
# Release shelves also contain support documents (provenance, evaluation
# records, and licenses) that are not ReFolDec artifact documents. Keep the
# validator strict for artifact-shaped files while allowing mixed packages.
PACKAGE_SUPPORT_FILES = {
    "README.md", "LICENSE", "ATTRIBUTION.md", "CHANGELOG.md",
    "equilibrium-decision.md", "release-checklist.md", "rollback-plan.md",
    "holdout-evaluation.md", "review.json",
    "specification.md", "schema.json", "release-manifest.json",
    "provenance.json", "evals.json", "maintenance.md", "process-map.md",
    "SKILL.md",
}


class ArtifactError(ValueError):
    pass


def scalar(value: str) -> Any:
    value = value.strip()
    if not value:
        return None
    if value in ("true", "false"):
        return value == "true"
    if value in ("null", "~"):
        return None
    if value.startswith(("\"", "'")):
        if value[0] == "'" and value[-1:] == "'":
            return value[1:-1].replace("''", "'")
        return json.loads(value)
    if value.startswith(("[", "{")):
        try:
            return json.loads(value)
        except json.JSONDecodeError as exc:
            if value.startswith("[") and value.endswith("]"):
                return [scalar(item) for item in value[1:-1].split(",") if item.strip()]
            raise ArtifactError(f"unsupported inline YAML value: {value}") from exc
    if re.fullmatch(r"-?\d+", value):
        return int(value)
    return value


def parse_simple_yaml(text: str) -> dict[str, Any]:
    """Parse the intentionally small YAML profile used by artifact metadata."""
    lines = [(len(line) - len(line.lstrip(" ")), line.strip())
             for line in text.splitlines()
             if line.strip() and not line.lstrip().startswith("#")]
    if not lines:
        raise ArtifactError("empty YAML document")
    if lines[0][0] != 0:
        raise ArtifactError("YAML document must start at column zero")

    def block(pos: int, indent: int) -> tuple[Any, int]:
        if pos >= len(lines) or lines[pos][0] < indent:
            return {}, pos
        is_list = lines[pos][0] == indent and lines[pos][1].startswith("- ")
        result: Any = [] if is_list else {}
        while pos < len(lines) and lines[pos][0] == indent:
            content = lines[pos][1]
            if is_list:
                if not content.startswith("- "):
                    raise ArtifactError("mixed YAML mapping and list")
                item = content[2:].strip()
                if ":" in item and not item.startswith(('"', "'")):
                    key, raw = item.split(":", 1)
                    entry: dict[str, Any] = {key.strip(): scalar(raw)}
                    pos += 1
                    if pos < len(lines) and lines[pos][0] > indent:
                        child, pos = block(pos, lines[pos][0])
                        if not isinstance(child, dict):
                            raise ArtifactError("list mapping continuation must be a mapping")
                        entry.update(child)
                    result.append(entry)
                else:
                    result.append(scalar(item))
                    pos += 1
            else:
                if content.startswith("- ") or ":" not in content:
                    raise ArtifactError(f"unsupported YAML line: {content}")
                key, raw = content.split(":", 1)
                key = key.strip()
                if not key or key in result:
                    raise ArtifactError(f"duplicate or empty YAML key: {key}")
                pos += 1
                if raw.strip():
                    result[key] = scalar(raw)
                elif pos < len(lines) and lines[pos][0] > indent:
                    result[key], pos = block(pos, lines[pos][0])
                else:
                    result[key] = {}
        return result, pos

    result, pos = block(0, 0)
    if pos != len(lines) or not isinstance(result, dict):
        raise ArtifactError("malformed YAML document")
    return result


def load_document(path: pathlib.Path) -> dict[str, Any]:
    text = path.read_text(encoding="utf-8")
    if path.suffix.lower() == ".md":
        if not text.startswith("---"):
            raise ArtifactError("Markdown artifact needs YAML front matter")
        parts = text.split("---", 2)
        if len(parts) != 3:
            raise ArtifactError("unterminated YAML front matter")
        text = parts[1]
    try:
        data = json.loads(text) if path.suffix.lower() == ".json" else parse_simple_yaml(text)
    except (json.JSONDecodeError, UnicodeDecodeError, ArtifactError) as exc:
        raise ArtifactError(f"malformed document: {exc}") from exc
    if not isinstance(data, dict):
        raise ArtifactError("top-level document must be an object")
    return data


def as_string_list(value: Any, field: str, errors: list[str]) -> list[str]:
    if not isinstance(value, list) or any(not isinstance(item, str) for item in value):
        errors.append(f"{field} must be an array of strings")
        return []
    return value


def validate_one(data: dict[str, Any], path: pathlib.Path) -> tuple[list[str], list[str], dict[str, int]]:
    errors: list[str] = []
    warnings: list[str] = []
    report = {state: 0 for state in EVIDENCE_STATES}
    for field in REQUIRED:
        if field not in data:
            errors.append(f"missing required field: {field}")
    if not isinstance(data.get("id"), str) or not ID_RE.fullmatch(data.get("id", "")):
        errors.append("id must be a stable lowercase kebab-case identifier")
    for field in ("title", "source_context", "freshness"):
        if field in data and (not isinstance(data[field], str) or not data[field].strip()):
            errors.append(f"{field} must be a non-empty string")
    if data.get("artifact_type") not in ARTIFACT_TYPES:
        errors.append(f"artifact_type must be one of: {', '.join(sorted(ARTIFACT_TYPES))}")
    if data.get("maturity_state") not in MATURITY_STATES:
        errors.append(f"maturity_state must be one of: {', '.join(sorted(MATURITY_STATES))}")
    if data.get("freshness") not in {"current", "stale", "unknown"}:
        errors.append("freshness must be current, stale, or unknown")
    folded = as_string_list(data.get("folded_outputs", []), "folded_outputs", errors)
    primitives = as_string_list(data.get("unfolded_primitives", []), "unfolded_primitives", errors)
    as_string_list(data.get("reuse_targets", []), "reuse_targets", errors)
    lineage = data.get("lineage")
    if not isinstance(lineage, dict):
        errors.append("lineage must be an object")
        lineage = {}
    for field in ("source_ids", "folded_output_ids", "unfolded_primitive_ids"):
        as_string_list(lineage.get(field), f"lineage.{field}", errors)
    if lineage.get("folded_output_ids") != folded:
        errors.append("lineage.folded_output_ids must exactly match folded_outputs")
    if lineage.get("unfolded_primitive_ids") != primitives:
        errors.append("lineage.unfolded_primitive_ids must exactly match unfolded_primitives")
    publication = data.get("publication")
    if not isinstance(publication, dict):
        errors.append("publication must be an object")
        publication = {}
    visibility = publication.get("visibility")
    access = publication.get("source_access")
    if visibility not in VISIBILITIES:
        errors.append("publication.visibility must be private or public")
    if access not in SOURCE_ACCESS:
        errors.append("publication.source_access must be public, mixed, private, or unknown")
    if visibility == "public" and (access != "public" or publication.get("approved_surface") is not True):
        errors.append("public artifacts require public source access and approved_surface: true")
    if data.get("maturity_state") in {"published", "canonical"} and visibility != "public":
        errors.append("published/canonical artifacts must have public visibility")
    if data.get("freshness") == "stale":
        errors.append("stale artifacts cannot pass validation")
    evidence = data.get("evidence")
    if not isinstance(evidence, dict):
        errors.append("evidence must be an object with confirmed, inferred, and unknown arrays")
        evidence = {}
    seen: dict[str, str] = {}
    for state in EVIDENCE_STATES:
        fields = as_string_list(evidence.get(state), f"evidence.{state}", errors)
        report[state] = len(fields)
        for field in fields:
            if field in seen:
                errors.append(f"evidence field {field!r} is contradictory ({seen[field]} and {state})")
            seen[field] = state
    contradictions = data.get("contradictions", [])
    if not isinstance(contradictions, list) or any(not isinstance(item, str) for item in contradictions):
        errors.append("contradictions must be an array of strings")
    elif contradictions:
        errors.append("contradictions must be resolved before validation")
    if data.get("freshness") == "unknown":
        warnings.append("freshness is unknown")
    for field in REQUIRED:
        if field not in seen:
            warnings.append(f"provenance unknown: {field}")
    return errors, warnings, report


def validate_paths(paths: list[pathlib.Path]) -> int:
    documents: dict[str, tuple[pathlib.Path, dict[str, Any]]] = {}
    failed = False
    totals = {state: 0 for state in EVIDENCE_STATES}
    for path in paths:
        try:
            data = load_document(path)
            errors, warnings, report = validate_one(data, path)
            for state in totals:
                totals[state] += report[state]
            artifact_id = data.get("id")
            if isinstance(artifact_id, str):
                if artifact_id in documents:
                    errors.append(f"duplicate artifact id also used by {documents[artifact_id][0]}")
                else:
                    documents[artifact_id] = (path, data)
            for message in warnings:
                print(f"WARN {path}: {message}")
            for message in errors:
                print(f"FAIL {path}: {message}")
            if errors:
                failed = True
            else:
                print(f"OK {path} (id={data['id']}; evidence confirmed={report['confirmed']}, inferred={report['inferred']}, unknown={report['unknown']})")
        except (OSError, ArtifactError) as exc:
            print(f"FAIL {path}: {exc}")
            failed = True
    for artifact_id, (path, data) in documents.items():
        for field in ("source_ids", "folded_output_ids", "unfolded_primitive_ids"):
            for ref in data.get("lineage", {}).get(field, []) if isinstance(data.get("lineage"), dict) else []:
                if ref not in documents:
                    print(f"FAIL {path}: lineage.{field} references missing artifact {ref!r}")
                    failed = True
        for ref in data.get("folded_outputs", []) if isinstance(data.get("folded_outputs"), list) else []:
            target = documents.get(ref)
            if target and artifact_id not in target[1].get("lineage", {}).get("source_ids", []):
                print(f"FAIL {path}: folded output {ref!r} does not point back via lineage.source_ids")
                failed = True
        for ref in data.get("unfolded_primitives", []) if isinstance(data.get("unfolded_primitives"), list) else []:
            target = documents.get(ref)
            if target and artifact_id not in target[1].get("lineage", {}).get("source_ids", []):
                print(f"FAIL {path}: unfolded primitive {ref!r} does not point back via lineage.source_ids")
                failed = True
    print(f"Evidence report: confirmed={totals['confirmed']}, inferred={totals['inferred']}, unknown={totals['unknown']}")
    return 1 if failed else 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate ReFolDec JSON, YAML, and Markdown front matter.")
    parser.add_argument("paths", nargs="+", help="Files or directories containing artifacts.")
    args = parser.parse_args()
    paths: list[pathlib.Path] = []
    for raw in args.paths:
        path = pathlib.Path(raw)
        if path.is_dir():
            paths.extend(sorted(
                p for p in path.rglob("*")
                if p.suffix.lower() in {".json", ".yaml", ".yml", ".md"}
                and p.name not in PACKAGE_SUPPORT_FILES
            ))
        elif path.is_file():
            paths.append(path)
        else:
            print(f"FAIL {path}: path does not exist")
            return 1
    return validate_paths(paths)


if __name__ == "__main__":
    raise SystemExit(main())
