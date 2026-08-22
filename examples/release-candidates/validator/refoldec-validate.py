#!/usr/bin/env python3
"""Small dependency-free preflight for the public ReFolDec artifact shape."""
import json
import re
import sys
from pathlib import Path

REQUIRED = {"id", "title", "artifact_type", "maturity_state", "source_context",
            "lineage", "publication", "freshness", "evidence"}
NAME = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")

def main() -> int:
    if len(sys.argv) != 2:
        print("usage: refoldec-validate.py ARTIFACT.json")
        return 2
    path = Path(sys.argv[1])
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"FAIL {path}: {exc}")
        return 1
    errors = []
    errors += [f"missing {key}" for key in sorted(REQUIRED - data.keys())]
    if "id" in data and not NAME.fullmatch(data["id"]):
        errors.append("id must be lowercase kebab-case")
    publication = data.get("publication", {})
    if data.get("maturity_state") in {"published", "canonical"} and publication.get("visibility") != "public":
        errors.append("published artifacts must be public")
    if data.get("freshness") == "stale":
        errors.append("stale artifacts are not valid")
    if errors:
        for error in errors:
            print(f"FAIL {path}: {error}")
        return 1
    print(f"OK {path}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())