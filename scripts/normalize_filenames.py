#!/usr/bin/env python3
"""Normalize filenames in a single directory (non-recursive by default).

Safety defaults:
- Dry-run by default (no renames unless --apply)
- Non-recursive by default (matches the original snippet's intent)
- Collision-safe: if the target name exists, appends "-2", "-3", ...

Designed for Windows/macOS/Linux.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path


INVALID_WINDOWS_BASENAMES = {
    "con",
    "prn",
    "aux",
    "nul",
    *(f"com{i}" for i in range(1, 10)),
    *(f"lpt{i}" for i in range(1, 10)),
}


@dataclass(frozen=True)
class RenamePlan:
    src: Path
    dst: Path


def clean_filename(name: str, *, keep_unicode: bool) -> str:
    # Preserve the extension; normalize only the stem.
    p = Path(name)
    stem = p.stem
    suffix = "".join(p.suffixes)

    stem = stem.replace(" ", "-")

    if keep_unicode:
        # Keep Unicode letters/digits/underscore/hyphen. Remove punctuation.
        # \w in Python is Unicode-aware by default.
        stem = re.sub(r"[^\w-]+", "", stem)
    else:
        # ASCII-only mode: strip anything outside [a-z0-9_-].
        stem = stem.encode("ascii", "ignore").decode("ascii")
        stem = re.sub(r"[^a-zA-Z0-9_-]+", "", stem)

    # Normalize runs of hyphens/underscores.
    stem = re.sub(r"-+", "-", stem)
    stem = re.sub(r"_+", "_", stem)

    stem = stem.strip("-_. ")
    stem = stem.lower()

    if not stem:
        stem = "untitled"

    # Windows disallows trailing dots/spaces; also avoid reserved basenames.
    stem = stem.rstrip(". ")
    if stem in INVALID_WINDOWS_BASENAMES:
        stem = f"{stem}-file"

    # Keep original suffix casing as-is; only normalize stem.
    return f"{stem}{suffix}"


def unique_destination(dst: Path) -> Path:
    if not dst.exists():
        return dst

    base = dst.stem
    suffix = "".join(dst.suffixes)
    parent = dst.parent

    for i in range(2, 10_000):
        candidate = parent / f"{base}-{i}{suffix}"
        if not candidate.exists():
            return candidate

    raise RuntimeError(f"Could not find a free filename for: {dst}")


def build_plan(
    directory: Path,
    *,
    recursive: bool,
    keep_unicode: bool,
    include_extensions: set[str] | None,
    exclude_extensions: set[str] | None,
) -> list[RenamePlan]:
    if not directory.exists() or not directory.is_dir():
        raise FileNotFoundError(f"Not a directory: {directory}")

    plans: list[RenamePlan] = []

    if recursive:
        paths = [p for p in directory.rglob("*") if p.is_file()]
    else:
        paths = [p for p in directory.iterdir() if p.is_file()]

    for src in sorted(paths):
        ext = src.suffix.lower()
        if include_extensions is not None and ext not in include_extensions:
            continue
        if exclude_extensions is not None and ext in exclude_extensions:
            continue

        new_name = clean_filename(src.name, keep_unicode=keep_unicode)
        dst = src.with_name(new_name)

        if src.name == dst.name:
            continue

        dst = unique_destination(dst)
        plans.append(RenamePlan(src=src, dst=dst))

    return plans


def apply_plan(plans: list[RenamePlan]) -> None:
    # Two-phase approach to reduce collision risks when swapping names.
    # Phase 1: rename each src to a temp name in same dir.
    temp_plans: list[tuple[Path, Path]] = []

    for plan in plans:
        tmp = plan.src.with_name(plan.src.name + ".__tmp_rename__")
        tmp = unique_destination(tmp)
        os.replace(plan.src, tmp)
        temp_plans.append((tmp, plan.dst))

    # Phase 2: rename temps to final.
    for tmp, dst in temp_plans:
        os.replace(tmp, dst)


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Normalize filenames in a directory.")
    parser.add_argument(
        "directory",
        nargs="?",
        default=str(Path.cwd()),
        help="Directory to process (default: current directory)",
    )
    parser.add_argument("--apply", action="store_true", help="Actually rename files")
    parser.add_argument(
        "--recursive",
        action="store_true",
        help="Process subfolders too (default: off)",
    )
    parser.add_argument(
        "--ascii-only",
        action="store_true",
        help="Strip non-ASCII characters (default: keep Unicode)",
    )
    parser.add_argument(
        "--include-ext",
        action="append",
        default=None,
        help="Only rename files with this extension (repeatable), e.g. --include-ext .md",
    )
    parser.add_argument(
        "--exclude-ext",
        action="append",
        default=None,
        help="Skip files with this extension (repeatable), e.g. --exclude-ext .pdf",
    )

    args = parser.parse_args(argv)

    directory = Path(args.directory).expanduser().resolve()
    keep_unicode = not args.ascii_only

    include_extensions = None
    if args.include_ext:
        include_extensions = {e.lower() if e.startswith(".") else f".{e.lower()}" for e in args.include_ext}

    exclude_extensions = None
    if args.exclude_ext:
        exclude_extensions = {e.lower() if e.startswith(".") else f".{e.lower()}" for e in args.exclude_ext}

    plans = build_plan(
        directory,
        recursive=args.recursive,
        keep_unicode=keep_unicode,
        include_extensions=include_extensions,
        exclude_extensions=exclude_extensions,
    )

    if not plans:
        print("No changes needed.")
        return 0

    for plan in plans:
        print(f"{plan.src.name} -> {plan.dst.name}")

    if not args.apply:
        print(f"\nDry-run: {len(plans)} rename(s) planned. Re-run with --apply to execute.")
        return 0

    apply_plan(plans)
    print(f"\nApplied: {len(plans)} rename(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
