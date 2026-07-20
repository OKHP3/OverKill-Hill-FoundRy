#!/usr/bin/env python3
"""Report tracked technology versions and upstream stable releases.

Uses only Python's standard library so it can run in the existing Replit workflow
and in GitHub Actions without a dependency installation step.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
INVENTORY = ROOT / "technology-inventory.json"


def github_latest(url: str) -> str:
    request = Request(url, headers={"Accept": "application/vnd.github+json", "User-Agent": "foundry-technology-audit"})
    with urlopen(request, timeout=20) as response:
        releases = json.load(response)
    for release in releases:
        if not release.get("draft") and not release.get("prerelease"):
            return release.get("tag_name", "unknown")
    return "no stable release found"


def python_latest(url: str) -> str:
    request = Request(url, headers={"Accept": "application/json", "User-Agent": "foundry-technology-audit"})
    with urlopen(request, timeout=20) as response:
        releases = json.load(response)
    stable = [
        release for release in releases
        if release.get("name", "").startswith("Python 3.") and not release.get("pre_release")
    ]
    if not stable:
        return "no stable release found"
    def version_key(item: dict) -> tuple[int, ...]:
        match = re.search(r"Python (3(?:\.\d+){1,2})$", item["name"])
        return tuple(int(part) for part in match.group(1).split(".")) if match else (0,)

    release = max(stable, key=version_key)
    return release["name"].removeprefix("Python ")


def main() -> int:
    inventory = json.loads(INVENTORY.read_text(encoding="utf-8"))
    failures = 0
    print(f"Technology audit ({inventory['inventory_date']})")
    for item in inventory["technologies"]:
        latest = item.get("latest", "manual review")
        if item.get("latest_api_type") == "python-downloads":
            try:
                latest = python_latest(item["latest_api"])
            except Exception as error:
                latest = f"lookup failed: {error}"
                failures += 1
        elif item.get("latest_api"):
            try:
                latest = github_latest(item["latest_api"])
            except Exception as error:  # network errors should not hide the inventory
                latest = f"lookup failed: {error}"
                failures += 1
        marker = " [manual review]" if item.get("manual_review") else ""
        print(f"- {item['name']}: current={item['current']}; latest={latest}{marker}")
    if failures:
        print(f"\n{failures} upstream lookup(s) failed; rerun when network access is available.", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
