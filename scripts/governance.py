#!/usr/bin/env python3
"""Dependency-free YAML and governance helpers for FoundRy audits.

This intentionally supports the small YAML subset used by the repository's
contracts: mappings, lists, quoted/unquoted scalars, and JSON-style inline
values. It is strict enough to reject malformed governance data and avoids a
runtime dependency in GitHub Actions.
"""
from __future__ import annotations

import ast
import json
import pathlib
import re
from typing import Any


class GovernanceError(ValueError):
    pass


def _scalar(value: str, line: int) -> Any:
    value = value.strip()
    if not value:
        return {}
    if value in {"null", "~"}:
        return None
    if value.lower() in {"true", "false"}:
        return value.lower() == "true"
    if value.startswith(("[", "{")):
        try:
            return json.loads(value)
        except json.JSONDecodeError:
            try:
                return ast.literal_eval(value)
            except (SyntaxError, ValueError) as exc:
                raise GovernanceError(f"line {line}: invalid inline value") from exc
    if (value.startswith('"') and value.endswith('"')) or (
        value.startswith("'") and value.endswith("'")
    ):
        return value[1:-1]
    if re.fullmatch(r"-?\d+", value):
        return int(value)
    if re.fullmatch(r"-?(?:\d+\.\d*|\d*\.\d+)", value):
        return float(value)
    return value


def load_yaml(path: pathlib.Path) -> Any:
    """Parse the repository's strict YAML subset, rejecting duplicate keys."""
    raw = path.read_text(encoding="utf-8")
    rows: list[tuple[int, str, int]] = []
    for number, original in enumerate(raw.splitlines(), 1):
        if "\t" in original:
            raise GovernanceError(f"{path}: line {number}: tabs are not allowed")
        line = original.split("#", 1)[0].rstrip()
        if not line.strip() or line.lstrip().startswith("---"):
            continue
        indent = len(line) - len(line.lstrip(" "))
        rows.append((indent, line.strip(), number))
    if not rows:
        return {}

    def parse_at(index: int, indent: int) -> tuple[Any, int]:
        if index >= len(rows) or rows[index][0] != indent:
            raise GovernanceError(f"{path}: unexpected indentation")
        is_list = rows[index][1].startswith("- ")
        result: Any = [] if is_list else {}
        seen: set[str] = set()
        while index < len(rows) and rows[index][0] == indent:
            _, text, number = rows[index]
            if is_list:
                if not text.startswith("- "):
                    raise GovernanceError(f"{path}: line {number}: mixed list and mapping")
                item = text[2:].strip()
                if not item:
                    if index + 1 >= len(rows) or rows[index + 1][0] <= indent:
                        raise GovernanceError(f"{path}: line {number}: empty list item")
                    value, index = parse_at(index + 1, rows[index + 1][0])
                elif ":" in item and not item.startswith(("[", "{")):
                    key, value_text = item.split(":", 1)
                    key = key.strip()
                    value: dict[str, Any] = {key: _scalar(value_text, number)} if value_text.strip() else {key: {}}
                    index += 1
                    if index < len(rows) and rows[index][0] > indent:
                        child, index = parse_at(index, rows[index][0])
                        if value[key] == {}:
                            value[key] = child
                        elif isinstance(child, dict):
                            value.update(child)
                        else:
                            raise GovernanceError(f"{path}: line {number}: invalid list mapping")
                else:
                    value, index = _scalar(item, number), index + 1
                result.append(value)
            else:
                if text.startswith("- ") or ":" not in text:
                    raise GovernanceError(f"{path}: line {number}: expected key: value")
                key, value_text = text.split(":", 1)
                key = key.strip()
                if not key or key in seen:
                    raise GovernanceError(f"{path}: line {number}: duplicate/empty key {key!r}")
                seen.add(key)
                value_text = value_text.strip()
                index += 1
                if value_text:
                    value = _scalar(value_text, number)
                elif index < len(rows) and rows[index][0] > indent:
                    value, index = parse_at(index, rows[index][0])
                else:
                    value = {}
                result[key] = value
        return result, index

    value, index = parse_at(0, rows[0][0])
    if index != len(rows):
        raise GovernanceError(f"{path}: unexpected indentation near line {rows[index][2]}")
    return value


def get(data: dict[str, Any], dotted: str) -> Any:
    current: Any = data
    for part in dotted.split("."):
        if not isinstance(current, dict) or part not in current:
            return None
        current = current[part]
    return current


def required_paths(data: dict[str, Any], paths: list[str]) -> list[str]:
    return [path for path in paths if get(data, path) in (None, "", {})]


def schema_contract(path: pathlib.Path) -> dict[str, Any]:
    value = load_yaml(path)
    if not isinstance(value, dict):
        raise GovernanceError(f"{path}: schema root must be a mapping")
    return value