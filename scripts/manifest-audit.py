#!/usr/bin/env python3
"""Parse and validate a FoundRy manifest against its declared schema."""
from __future__ import annotations
import pathlib
import sys
from governance import GovernanceError, get, load_yaml, required_paths, schema_contract

def main() -> int:
    root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".")
    path = root / "manifest.yaml"
    schema_path = root / "schemas" / "repo-manifest-schema.yaml"
    if not schema_path.exists():
        print(f"FAIL schema missing: {schema_path} (remediation: restore the manifest schema)")
        return 1
    if not path.exists():
        print("FAIL GOV-MANIFEST-001 manifest.yaml missing (remediation: add a root manifest.yaml)")
        return 1
    try:
        manifest = load_yaml(path)
        schema = schema_contract(schema_path)
    except GovernanceError as exc:
        print(f"FAIL GOV-MANIFEST-002 malformed YAML: {exc}")
        return 1
    failures: list[str] = []
    required = schema.get("required_fields", [])
    if not isinstance(manifest, dict):
        failures.append("GOV-MANIFEST-003 root must be a mapping")
    else:
        for field in required_paths(manifest, required):
            failures.append(f"GOV-MANIFEST-004 missing {field} (remediation: add the required field)")
        for field, allowed in schema.get("allowed_values", {}).items():
            actual = get(manifest, field)
            if actual is not None and actual not in allowed:
                failures.append(f"GOV-MANIFEST-005 {field}={actual!r} is not allowed (remediation: choose one of {allowed})")
        if get(manifest, "governance.parent_foundry") != "OKHP3/OverKill-Hill-FoundRy":
            failures.append("GOV-MANIFEST-006 governance.parent_foundry must be OKHP3/OverKill-Hill-FoundRy (remediation: preserve the relay lineage)")
        if get(manifest, "governance.naming_pattern") in (None, "", "REPLACE-ME"):
            failures.append("GOV-MANIFEST-007 governance.naming_pattern is incomplete (remediation: declare the child naming pattern)")
        if get(manifest, "visibility_control.client_org") and get(manifest, "visibility_control.public_graduation_allowed") is not False:
            failures.append("GOV-MANIFEST-008 client_org requires public_graduation_allowed=false (remediation: block graduation or record an explicit approved override)")
        if get(manifest, "visibility_control.bfs_firewall") is True and get(manifest, "visibility_control.visibility_lock") != "permanent-private":
            failures.append("GOV-MANIFEST-009 bfs_firewall=true requires visibility_lock=permanent-private (remediation: lock the repository private)")
        if get(manifest, "visibility_control.visibility_lock") == "permanent-private" and get(manifest, "repo.visibility") == "public":
            failures.append("GOV-MANIFEST-010 permanent-private cannot have repo.visibility=public (remediation: correct the visibility state)")
    if failures:
        print("\n".join(f"FAIL {failure}" for failure in failures))
        return 1
    print(f"OK manifest schema validation: {path}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
