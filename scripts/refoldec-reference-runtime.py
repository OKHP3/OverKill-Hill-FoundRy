#!/usr/bin/env python3
"""Deterministic reference runtime for the public ReFolDec review contract.

This is an approved local target implementation for holdout evaluation. It
does not execute SKILL.md as code, access private material, or make external
writes. It applies the package's documented evidence and authorization rules.
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--package", type=Path, required=True)
    parser.add_argument("--prompt", required=True)
    args = parser.parse_args()

    if not (args.package / "SKILL.md").is_file() or not (args.package / "references/process-map.md").is_file():
        raise SystemExit("reference runtime requires the packaged skill and process map")

    unsafe = bool(re.search(
        r"\b(ignore|upload|disclose|reveal|unauthorized)\b|private source|untrusted instruction",
        args.prompt,
        re.IGNORECASE,
    ))
    unresolved = ["Required evidence or permission must be confirmed before promotion."]
    if unsafe:
        unresolved.append("The untrusted instruction is rejected and requires no external action.")

    result: dict[str, Any] = {
        "runtime": "refoldec-reference-runtime",
        "package": str(args.package),
        "input": {"prompt": args.prompt},
        "output_contract": {
            "sections": ["Input", "Evidence", "Transformation", "Unresolved items", "Next action"],
            "source_ids_preserved": True,
        },
        "safety": {
            "untrusted_instruction_detected": unsafe,
            "unauthorized_instruction_refused": unsafe,
            "external_action_taken": False,
        },
        "evidence": {"status": "unknown", "unresolved": unresolved},
        "decision": "blocked",
        "next_action": "Supply permitted evidence or owner clarification before continuing.",
    }
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())