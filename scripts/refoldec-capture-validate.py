#!/usr/bin/env python3
"""Validate ReFolDec process capture records without changing them."""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys
from typing import Any

ID_RE = re.compile(r"^(act|gw|evt)-[0-9]{3}$")
CONFIDENCE = {"high", "medium", "low", "unknown"}


def validate(data: dict[str, Any], path: pathlib.Path) -> list[str]:
    errors: list[str] = []
    required = [
        "capture_id", "process_id", "title", "capture_status", "source_context",
        "actors", "trigger", "inputs", "outputs", "steps", "decisions",
        "exceptions", "controls", "evidence", "ambiguities", "rejected_material",
        "transformations", "confirmation_gate", "recovery",
    ]
    for field in required:
        if field not in data:
            errors.append(f"missing required field {field}")
    if errors:
        return errors

    ids: set[str] = set()
    def add_id(value: Any, label: str) -> None:
        if not isinstance(value, str) or not value:
            errors.append(f"{label} must be a non-empty string")
        elif value in ids:
            errors.append(f"duplicate id {value!r}")
        else:
            ids.add(value)

    add_id(data["capture_id"], "capture_id")
    add_id(data["process_id"], "process_id")
    context = data["source_context"]
    if not isinstance(context, dict) or not context.get("source_ids") or not context.get("boundary"):
        errors.append("source_context must include boundary and at least one source_id")
    actor_ids: set[str] = set()
    for actor in data["actors"]:
        if not isinstance(actor, dict):
            errors.append("actors must contain mappings")
            continue
        add_id(actor.get("id"), "actor.id")
        actor_ids.add(actor.get("id", ""))
    if not any(a.get("role") == "initiator" for a in data["actors"] if isinstance(a, dict)):
        errors.append("at least one initiator actor is required")
    if not any(a.get("role") in {"performer", "approver"} for a in data["actors"] if isinstance(a, dict)):
        errors.append("at least one performer or approver actor is required")

    evidence_ids: set[str] = set()
    for evidence in data["evidence"]:
        if not isinstance(evidence, dict):
            errors.append("evidence must contain mappings")
            continue
        add_id(evidence.get("id"), "evidence.id")
        evidence_ids.add(evidence.get("id", ""))
        if evidence.get("status") == "rejected" and not evidence.get("notes"):
            errors.append(f"rejected evidence {evidence.get('id')!r} needs notes")

    def check_refs(item: dict[str, Any], label: str) -> None:
        if item.get("confidence") not in CONFIDENCE:
            errors.append(f"{label}.confidence must be one of {sorted(CONFIDENCE)}")
        for ref in item.get("evidence_refs", []):
            if ref not in evidence_ids:
                errors.append(f"{label} references missing evidence {ref!r}")

    step_ids: set[str] = set()
    if not data["steps"]:
        errors.append("at least one process step is required")
    for step in data["steps"]:
        if not isinstance(step, dict):
            errors.append("steps must contain mappings")
            continue
        step_id = step.get("id")
        if not isinstance(step_id, str) or not ID_RE.fullmatch(step_id):
            errors.append(f"step id {step_id!r} must match act|gw|evt-NNN")
        if step_id in step_ids:
            errors.append(f"duplicate step id {step_id!r}")
        step_ids.add(step_id)
        if step.get("actor_id") not in actor_ids:
            errors.append(f"step {step_id!r} references missing actor")
        check_refs(step, f"step {step_id}")

    for section in ("inputs", "outputs", "controls"):
        for item in data[section]:
            if not isinstance(item, dict):
                errors.append(f"{section} must contain mappings")
                continue
            add_id(item.get("id"), f"{section}.id")
            check_refs(item, f"{section} {item.get('id')}")
    for section in ("decisions", "exceptions"):
        for item in data[section]:
            if isinstance(item, dict):
                check_refs(item, f"{section} {item.get('id')}")

    transforms = data["transformations"]
    derived_ids: set[str] = set()
    for output in transforms.get("derived_outputs", []):
        if not isinstance(output, dict):
            errors.append("derived_outputs must contain mappings")
            continue
        output_id = output.get("id")
        if output_id in derived_ids:
            errors.append(f"duplicate derived output id {output_id!r}")
        derived_ids.add(output_id)
        if not output.get("source_ids"):
            errors.append(f"derived output {output_id!r} must retain source_ids")
    for operation in ("fold", "unfold", "refold"):
        record = transforms.get(operation, {})
        if record.get("status") == "complete":
            if not record.get("preserved_provenance"):
                errors.append(f"{operation} is complete but preserved_provenance is false")
            if not record.get("output_ids"):
                errors.append(f"{operation} is complete but has no output_ids")
    gate = data["confirmation_gate"]
    if gate.get("required") and gate.get("status") == "confirmed":
        if not gate.get("confirmed_by") or not gate.get("confirmed_at"):
            errors.append("confirmed gate requires confirmed_by and confirmed_at")
    if data["capture_status"] == "confirmed" and gate.get("status") != "confirmed":
        errors.append("confirmed capture requires a confirmed human gate")
    if data["capture_status"] in {"reviewed", "confirmed"} and not data["recovery"].get("next_action"):
        errors.append("reviewed captures require a recovery next_action")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("paths", nargs="+")
    args = parser.parse_args()
    failed = False
    for raw in args.paths:
        path = pathlib.Path(raw)
        candidates = sorted(path.rglob("*.json")) if path.is_dir() else [path]
        for candidate in candidates:
            try:
                data = json.loads(candidate.read_text())
                if not isinstance(data, dict):
                    raise ValueError("top-level value must be an object")
                errors = validate(data, candidate)
            except (OSError, json.JSONDecodeError, ValueError) as exc:
                errors = [str(exc)]
            if errors:
                failed = True
                for error in errors:
                    print(f"FAIL {candidate}: {error}")
            else:
                print(f"OK {candidate} (capture_id={data['capture_id']})")
    return int(failed)


if __name__ == "__main__":
    raise SystemExit(main())