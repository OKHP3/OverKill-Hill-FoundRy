#!/usr/bin/env python3
from __future__ import annotations
import datetime
import pathlib
import sys
from governance import GovernanceError, load_yaml, required_paths

ROOT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.')
REGISTRY = ROOT / 'registry' / 'index.yaml'

if not REGISTRY.exists():
    print('FAIL registry/index.yaml missing')
    raise SystemExit(1)

SCHEMA = ROOT / 'schemas' / 'registry-schema.yaml'
MANIFEST = ROOT / 'manifest.yaml'
try:
    registry = load_yaml(REGISTRY)
    schema = load_yaml(SCHEMA)
    manifest = load_yaml(MANIFEST)
except (GovernanceError, FileNotFoundError) as exc:
    print(f'FAIL GOV-REGISTRY-001 malformed registry or schema: {exc}')
    raise SystemExit(1)

failures: list[str] = []
if registry.get('schema_version') != schema.get('schema_version'):
    failures.append(f'GOV-REGISTRY-004 schema_version {registry.get("schema_version")!r} does not match schema {schema.get("schema_version")!r} (remediation: update the registry contract together)')
if registry.get('foundry') != manifest.get('repo', {}).get('name'):
    failures.append('GOV-REGISTRY-005 foundry must match manifest repo.name (remediation: correct the canonical repository identity)')
if registry.get('brand_domain') != manifest.get('brand_domain'):
    failures.append('GOV-REGISTRY-006 brand_domain must match manifest (remediation: preserve cross-document identity)')
for field in schema.get('required_fields', []):
    if field not in registry:
        failures.append(f'GOV-REGISTRY-002 missing {field} (remediation: add the required registry field)')
entries = registry.get('repositories', [])
if not isinstance(entries, list):
    failures.append('GOV-REGISTRY-003 repositories must be a list (remediation: use one mapping per repository)')
else:
    identities: set[str] = set()
    today = datetime.date.today()
    for index, entry in enumerate(entries, 1):
        prefix = f'GOV-REGISTRY-{index:03d}'
        if not isinstance(entry, dict):
            failures.append(f'{prefix} entry must be a mapping (remediation: add name/type/lifecycle fields)')
            continue
        for field in schema.get('required_entry_fields', []):
            if entry.get(field) in (None, '', {}):
                failures.append(f'{prefix} {entry.get("name", "<unnamed>")} missing {field} (remediation: assign an owner and review metadata)')
        name = entry.get('name')
        if name in identities:
            failures.append(f'{prefix} duplicate repository identity {name!r} (remediation: keep one canonical entry)')
        identities.add(name)
        for field, allowed in schema.get('allowed_values', {}).items():
            if entry.get(field) is not None and entry[field] not in allowed:
                failures.append(f'{prefix} {name}: {field}={entry[field]!r} is not allowed (remediation: choose one of {allowed})')
        reviewed = entry.get('last_reviewed')
        if entry.get('freshness_exemption'):
            if not isinstance(entry['freshness_exemption'], str) or len(entry['freshness_exemption'].strip()) < 10:
                failures.append(f'{prefix} {name}: freshness_exemption needs an actionable reason (remediation: explain the exception and its review boundary)')
            reviewed = None
        try:
            review_date = datetime.date.fromisoformat(str(reviewed))
            if (today - review_date).days > int(entry.get('review_interval_days', schema.get('freshness', {}).get('default_review_interval_days', 180))):
                failures.append(f'{prefix} {name}: review is stale ({reviewed}) (remediation: review the entry or declare an approved exemption)')
        except (TypeError, ValueError):
            if not entry.get('freshness_exemption'):
                failures.append(f'{prefix} {name}: last_reviewed must be ISO date, not {reviewed!r} (remediation: record YYYY-MM-DD)')
        if entry.get('external') is not True and entry.get('local_path') in (None, ''):
            failures.append(f'{prefix} {name}: local_path required unless external=true (remediation: add the checkout path or explicit external exemption)')
        local_path = entry.get('local_path')
        if local_path and entry.get('external') is not True:
            child_root = ROOT / local_path
            for required_file in schema.get('child_repository_contract', {}).get('required_files', ['AGENTS.md', 'README.md', 'CHANGELOG.md', 'LICENSE.md', 'manifest.yaml']):
                if not (child_root / required_file).is_file():
                    failures.append(f'{prefix} {name}: missing {local_path}/{required_file} (remediation: bring the child repository up to the scaffold contract)')
        if entry.get('parent_foundry') != 'OKHP3/OverKill-Hill-FoundRy':
            failures.append(f'{prefix} {name}: parent_foundry must preserve relay lineage (remediation: set the canonical parent)')
if failures:
    print('\n'.join('FAIL ' + item for item in failures))
    raise SystemExit(1)
print('OK registry schema, freshness, ownership, lineage, and identity validation')
