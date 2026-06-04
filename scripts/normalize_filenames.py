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
import unicodedata
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

CHAR_SUBSTITUTIONS: dict[str, str] = {
    "\u2011": "-",   # NON-BREAKING HYPHEN → hyphen-minus
    "\u2010": "-",   # HYPHEN → hyphen-minus
    "\u2012": "-",   # FIGURE DASH → hyphen-minus
    "\u2013": "-",   # EN DASH → hyphen-minus
    "\u2014": "-",   # EM DASH → hyphen-minus
    "\u2015": "-",   # HORIZONTAL BAR → hyphen-minus
    "\u2212": "-",   # MINUS SIGN → hyphen-minus
    "\u1D67": "y",   # MODIFIER LETTER SMALL GAMMA (ᵧ) → y
    "\u00B3": "3",   # SUPERSCRIPT THREE (³) → 3
    "\u00B2": "2",   # SUPERSCRIPT TWO → 2
    "\u00B9": "1",   # SUPERSCRIPT ONE → 1
    "\u00B0": "deg", # DEGREE SIGN → deg
    "\u2019": "",    # RIGHT SINGLE QUOTATION MARK → remove
    "\u2018": "",    # LEFT SINGLE QUOTATION MARK → remove
    "\u201C": "",    # LEFT DOUBLE QUOTATION MARK → remove
    "\u201D": "",    # RIGHT DOUBLE QUOTATION MARK → remove
    "&": "and",      # AMPERSAND → and
}

KNOWN_EXTENSIONS = {
    ".md", ".txt", ".yaml", ".yml", ".json", ".toml", ".ini",
    ".py", ".js", ".ts", ".sh", ".bash",
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp",
    ".pdf", ".docx", ".xlsx", ".pptx", ".csv",
    ".html", ".css", ".xml",
    ".zip", ".tar", ".gz",
    ".mjs", ".cjs", ".d.ts", ".map",
}


def _is_emoji_or_symbol(char: str) -> bool:
    cp = ord(char)
    cat = unicodedata.category(char)
    if cat in ("So", "Sm", "Sc", "Sk"):
        return True
    if (
        0x1F300 <= cp <= 0x1FAFF
        or 0x2600 <= cp <= 0x27BF
        or 0xFE00 <= cp <= 0xFE0F
        or 0x1F1E0 <= cp <= 0x1F1FF
        or cp == 0x200D
        or cp == 0xFE0F
        or cp == 0x20E3
    ):
        return True
    return False


def preprocess_name(name: str) -> str:
    """Apply explicit character substitutions and strip emoji/symbols."""
    result = []
    for ch in name:
        if ch in CHAR_SUBSTITUTIONS:
            result.append(CHAR_SUBSTITUTIONS[ch])
        elif _is_emoji_or_symbol(ch):
            pass
        else:
            result.append(ch)
    return "".join(result)


def split_stem_ext(name: str) -> tuple[str, str]:
    """Split a filename into (stem, extension) using only a final *known* extension.

    For 'foo_v1.0.8.md'   → ('foo_v1.0.8', '.md')
    For 'foo_v5.5_'       → ('foo_v5.5_',  '')    [no known extension]
    For 'registry.schema.yaml' → ('registry.schema', '.yaml')
    """
    p = Path(name)
    suffix = p.suffix.lower()
    if suffix in KNOWN_EXTENSIONS:
        ext = p.suffix
        stem = name[: len(name) - len(ext)]
    else:
        ext = ""
        stem = name
    return stem, ext


def clean_filename(name: str, *, keep_unicode: bool) -> str:
    name = preprocess_name(name)

    stem, ext = split_stem_ext(name)

    stem = stem.replace(" ", "-")
    stem = stem.replace(".", "-")

    if keep_unicode:
        stem = re.sub(r"[^\w-]+", "", stem)
    else:
        stem = stem.encode("ascii", "ignore").decode("ascii")
        stem = re.sub(r"[^a-zA-Z0-9_-]+", "", stem)

    stem = re.sub(r"-+", "-", stem)
    stem = re.sub(r"_+", "_", stem)

    stem = stem.strip("-_. ")
    stem = stem.lower()

    if not stem:
        stem = "untitled"

    stem = stem.rstrip(". ")
    if stem in INVALID_WINDOWS_BASENAMES:
        stem = f"{stem}-file"

    return f"{stem}{ext}"


def unique_destination(dst: Path) -> Path:
    if not dst.exists():
        return dst

    _, ext = split_stem_ext(dst.name)
    base = dst.name[: len(dst.name) - len(ext)]
    parent = dst.parent

    for i in range(2, 10_000):
        candidate = parent / f"{base}-{i}{ext}"
        if not candidate.exists():
            return candidate

    raise RuntimeError(f"Could not find a free filename for: {dst}")


@dataclass(frozen=True)
class RenamePlan:
    src: Path
    dst: Path


def _should_exclude(path: Path, root: Path, exclude_paths: set[Path] | None, exclude_hidden: bool) -> bool:
    if exclude_hidden and path.name.startswith("."):
        return True
    if exclude_paths:
        if any(path == ep or ep in path.parents for ep in exclude_paths):
            return True
    return False


def build_dir_plan(
    directory: Path,
    *,
    recursive: bool,
    keep_unicode: bool,
    exclude_paths: set[Path] | None = None,
    exclude_hidden: bool = False,
) -> list[RenamePlan]:
    """Build rename plans for directories only, deepest-first."""
    if not directory.exists() or not directory.is_dir():
        raise FileNotFoundError(f"Not a directory: {directory}")

    if recursive:
        all_paths = list(directory.rglob("*"))
    else:
        all_paths = list(directory.iterdir())

    all_paths = [
        p for p in all_paths
        if not _should_exclude(p, directory, exclude_paths, exclude_hidden)
    ]

    dir_paths = sorted(
        [p for p in all_paths if p.is_dir()],
        key=lambda p: len(p.parts),
        reverse=True,
    )

    plans: list[RenamePlan] = []
    for src in dir_paths:
        new_name = clean_filename(src.name, keep_unicode=keep_unicode)
        dst = src.with_name(new_name)
        if src.name == dst.name:
            continue
        dst = unique_destination(dst)
        plans.append(RenamePlan(src=src, dst=dst))

    return plans


def build_file_plan(
    directory: Path,
    *,
    recursive: bool,
    keep_unicode: bool,
    include_extensions: set[str] | None,
    exclude_extensions: set[str] | None,
    exclude_paths: set[Path] | None = None,
    exclude_hidden: bool = False,
) -> list[RenamePlan]:
    """Build rename plans for files only."""
    if not directory.exists() or not directory.is_dir():
        raise FileNotFoundError(f"Not a directory: {directory}")

    if recursive:
        all_paths = list(directory.rglob("*"))
    else:
        all_paths = list(directory.iterdir())

    all_paths = [
        p for p in all_paths
        if not _should_exclude(p, directory, exclude_paths, exclude_hidden)
    ]

    plans: list[RenamePlan] = []
    for src in sorted([p for p in all_paths if p.is_file()]):
        _, ext = split_stem_ext(src.name)
        if include_extensions is not None and ext.lower() not in include_extensions:
            continue
        if exclude_extensions is not None and ext.lower() in exclude_extensions:
            continue

        new_name = clean_filename(src.name, keep_unicode=keep_unicode)
        dst = src.with_name(new_name)

        if src.name == dst.name:
            continue

        dst = unique_destination(dst)
        plans.append(RenamePlan(src=src, dst=dst))

    return plans


def build_plan(
    directory: Path,
    *,
    recursive: bool,
    keep_unicode: bool,
    include_extensions: set[str] | None,
    exclude_extensions: set[str] | None,
    include_dirs: bool = False,
    exclude_paths: set[Path] | None = None,
    exclude_hidden: bool = False,
) -> list[RenamePlan]:
    """Build combined rename plan (dirs then files). For preview/dry-run only.
    Do NOT pass to apply_plan directly when include_dirs=True — use apply_dirs_then_files instead.
    """
    plans: list[RenamePlan] = []
    if include_dirs:
        plans.extend(build_dir_plan(
            directory,
            recursive=recursive,
            keep_unicode=keep_unicode,
            exclude_paths=exclude_paths,
            exclude_hidden=exclude_hidden,
        ))
    plans.extend(build_file_plan(
        directory,
        recursive=recursive,
        keep_unicode=keep_unicode,
        include_extensions=include_extensions,
        exclude_extensions=exclude_extensions,
        exclude_paths=exclude_paths,
        exclude_hidden=exclude_hidden,
    ))
    return plans


def apply_plan(plans: list[RenamePlan]) -> None:
    temp_plans: list[tuple[Path, Path]] = []

    for plan in plans:
        tmp = plan.src.with_name(plan.src.name + ".__tmp_rename__")
        tmp = unique_destination(tmp)
        os.replace(plan.src, tmp)
        temp_plans.append((tmp, plan.dst))

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
        "--include-dirs",
        action="store_true",
        help="Also normalize directory names (deepest first, before files)",
    )
    parser.add_argument(
        "--exclude-hidden",
        action="store_true",
        help="Skip files and directories whose names start with '.'",
    )
    parser.add_argument(
        "--exclude-path",
        action="append",
        default=None,
        dest="exclude_paths",
        help="Exclude a path from processing (repeatable), e.g. --exclude-path artifacts",
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

    exclude_paths: set[Path] | None = None
    if args.exclude_paths:
        exclude_paths = {(directory / ep).resolve() for ep in args.exclude_paths}

    plans = build_plan(
        directory,
        recursive=args.recursive,
        keep_unicode=keep_unicode,
        include_extensions=include_extensions,
        exclude_extensions=exclude_extensions,
        include_dirs=args.include_dirs,
        exclude_paths=exclude_paths,
        exclude_hidden=args.exclude_hidden,
    )

    if not plans:
        print("No changes needed.")
        return 0

    for plan in plans:
        print(f"{plan.src.name} -> {plan.dst.name}")

    if not args.apply:
        print(f"\nDry-run: {len(plans)} rename(s) planned. Re-run with --apply to execute.")
        return 0

    if args.include_dirs:
        dir_plans = build_dir_plan(
            directory,
            recursive=args.recursive,
            keep_unicode=keep_unicode,
            exclude_paths=exclude_paths,
            exclude_hidden=args.exclude_hidden,
        )
        if dir_plans:
            apply_plan(dir_plans)
            print(f"Directories renamed: {len(dir_plans)}.")

        file_plans = build_file_plan(
            directory,
            recursive=args.recursive,
            keep_unicode=keep_unicode,
            include_extensions=include_extensions,
            exclude_extensions=exclude_extensions,
            exclude_paths=exclude_paths,
            exclude_hidden=args.exclude_hidden,
        )
        if file_plans:
            apply_plan(file_plans)
            print(f"Files renamed: {len(file_plans)}.")

        total = len(dir_plans) + len(file_plans)
        print(f"\nApplied: {total} rename(s).")
    else:
        apply_plan(plans)
        print(f"\nApplied: {len(plans)} rename(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
