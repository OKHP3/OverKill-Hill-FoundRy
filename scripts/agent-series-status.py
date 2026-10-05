#!/usr/bin/env python3
"""Inspect the FoundRy dispatch ledger without spawning, editing, or inferring gates."""
import argparse
import json
from collections import Counter
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--series', default='docs/handoffs/2026-10-05-executable-series/tasks.json')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
path = root / args.series
ledger = json.loads(path.read_text(encoding='utf-8-sig'))
tasks = ledger['tasks']
ids = [t['id'] for t in tasks]
findings = [f for t in tasks for f in t['finding_ids']]
source = json.loads((root / ledger['source_review']).read_text(encoding='utf-8'))
expected = {f['id'] for f in source['follow_up']}
errors = []
if len(ids) != len(set(ids)):
    errors.append('Duplicate task IDs')
if len(findings) != len(set(findings)) or set(findings) != expected:
    errors.append('Review finding coverage is incomplete or duplicated')
if len(tasks) + ledger['reserved_new_task_slots'] > ledger['maximum_new_worker_threads']:
    errors.append('Planned workers exceed the owner ceiling')
if ledger['spawned_new_worker_threads'] > 30:
    errors.append('Spawned workers exceed the owner ceiling')
active = [t for t in tasks if t['status'] in ('dispatched', 'accepted', 'in-progress')]
if len(active) > ledger['concurrency_limit']:
    errors.append('Active writers exceed the series concurrency limit')
for t in tasks:
    if not 0 < t['goal_token_budget'] <= t['absolute_token_ceiling'] <= 2000000:
        errors.append(f"{t['id']}: invalid worker token ceiling")
    if not (path.parent / t['prompt']).is_file():
        errors.append(f"{t['id']}: missing launch prompt")
    if t['status'] in ('accepted', 'in-progress', 'ready-for-review', 'integrated', 'verified') and not (root / t['receipt']).is_file():
        errors.append(f"{t['id']}: accepted status has no published receipt in this checkout")
for i, left in enumerate(active):
    for right in active[i+1:]:
        # Wildcard/subtree scopes are not active in the initial wave. Treat any
        # equal or containing scope as a collision when future writers activate.
        for a in left['allowed_files']:
            for b in right['allowed_files']:
                aa, bb = a.removesuffix('/**'), b.removesuffix('/**')
                if aa == bb or aa.startswith(bb + '/') or bb.startswith(aa + '/'):
                    errors.append(f"File ownership collision: {left['id']} / {right['id']}: {a} / {b}")
ready = [t for t in tasks if t['status'] == 'ready' and t['thread_id'] is None]
capacity = max(0, ledger['concurrency_limit'] - len(active))
print(json.dumps(dict(
    validation='FAIL' if errors else 'PASS', errors=errors,
    source_finding_count=len(expected), mapped_finding_count=len(findings),
    planned_tasks=len(tasks), spawned_workers=ledger['spawned_new_worker_threads'],
    reserved_slots=ledger['reserved_new_task_slots'], active=[t['id'] for t in active],
    free_worker_slots=capacity, states=dict(Counter(t['status'] for t in tasks)),
    next_dispatch=[dict(id=t['id'], model=t['model'], effort=t['reasoning_effort'],
                        goal_token_budget=t['goal_token_budget'], prompt=str(path.parent / t['prompt']))
                   for t in ready[:capacity]],
    gate_policy='Queued, conditional and external-gate tasks require coordinator evidence review; this command never assumes a gate passed.'
), indent=2))
raise SystemExit(bool(errors))
