#!/usr/bin/env python3
"""Validate capability import records without fetching or modifying sources."""
from __future__ import annotations

import json
from pathlib import Path
import re
import sys


def audit(root: Path) -> list[str]:
    errors = []
    root = root.resolve()
    try:
        data = json.loads((root / "registry/capability-migrations.json").read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        return [f"Cannot read migration registry: {exc}"]
    if not isinstance(data, dict) or type(data.get("schemaVersion")) is not int or data.get("schemaVersion") != 1 or data.get("foundry") != "OKHP3/OverKill-Hill-FoundRy" or data.get("projectRoot") != "capabilities":
        return ["Migration registry must use version 1, OverKill FoundRy lineage and capabilities root"]
    if not isinstance(data.get("migrations"), list):
        return ["migrations must be a list"]
    seen = set()
    for index, item in enumerate(data["migrations"]):
        label = f"Migration {index + 1}"
        if not isinstance(item, dict):
            errors.append(f"{label}: expected an object")
            continue
        slug = item.get("slug")
        if not isinstance(slug, str) or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug) or len(slug) > 64:
            errors.append(f"{label}: slug must be lowercase kebab case, at most 64 characters")
            continue
        if slug in seen:
            errors.append(f"{label}: duplicate destination slug {slug}")
        seen.add(slug)
        label = slug
        for field in ("source", "owner", "source_revision"):
            if not isinstance(item.get(field), str) or not item[field].strip():
                errors.append(f"{label}: {field} must be recorded")
        if item.get("destination") != f"capabilities/{slug}":
            errors.append(f"{label}: destination must be capabilities/{slug}")
            continue
        status = item.get("status")
        if status not in ("planned", "imported", "converted", "validated"):
            errors.append(f"{label}: unsupported migration status")
        if item.get("import_method") not in ("git-subtree", "reviewed-snapshot", "local-move"):
            errors.append(f"{label}: record the intended import_method")
        # Planned entries do not require a destination to exist. Later stages do.
        if status in ("imported", "converted", "validated"):
            destination = (root / item["destination"]).resolve()
            if not destination.is_relative_to(root / "capabilities"):
                errors.append(f"{label}: destination escapes capabilities")
                continue
            for field in ("import_evidence", "source_review", "license_review"):
                if not isinstance(item.get(field), str) or not item[field].strip():
                    errors.append(f"{label}: {field} is required after import")
            for path in ("README.md", "capability.json", "origin/source.json"):
                if not (destination / path).is_file():
                    errors.append(f"{label}: missing {path}")
            if status in ("converted", "validated") and not list(destination.glob("skills/*/SKILL.md")):
                errors.append(f"{label}: converted projects require a named skill")
            if status == "validated" and (not isinstance(item.get("validation_evidence"), str) or not item["validation_evidence"].strip()):
                errors.append(f"{label}: validated requires validation_evidence")
    return errors


if __name__ == "__main__":
    failures = audit(Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[1])
    for failure in failures:
        print(f"FAIL {failure}")
    if failures:
        sys.exit(1)
    print("OK capability migration structure and evidence references (not behavioral validation)")
