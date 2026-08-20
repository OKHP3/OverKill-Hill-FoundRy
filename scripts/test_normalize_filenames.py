"""Regression tests for the filename normalization audit."""

from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path


SCRIPT_PATH = Path(__file__).with_name("normalize_filenames.py")
SPEC = spec_from_file_location("normalize_filenames", SCRIPT_PATH)
assert SPEC and SPEC.loader
normalize_filenames = module_from_spec(SPEC)
sys.modules[SPEC.name] = normalize_filenames
SPEC.loader.exec_module(normalize_filenames)


class FilenameAuditTests(unittest.TestCase):
    def create_fixture_repository(self) -> Path:
        temporary_directory = tempfile.TemporaryDirectory()
        self.addCleanup(temporary_directory.cleanup)
        repository = Path(temporary_directory.name)
        subprocess.run(
            ["git", "init", "--quiet", str(repository)],
            check=True,
            capture_output=True,
        )
        (repository / ".gitignore").write_text(
            "__pycache__/\n*.py[cod]\nignored-output/\n",
            encoding="utf-8",
        )
        return repository

    def test_ignored_generated_paths_and_scoped_directories_are_not_planned(self) -> None:
        repository = self.create_fixture_repository()
        (repository / "__pycache__").mkdir()
        (repository / "__pycache__" / "Bad_Module.cpython-314.pyc").touch()
        (repository / "ignored-output").mkdir()
        (repository / "ignored-output" / "Bad File.txt").touch()
        (repository / "@types").mkdir()
        (repository / "Bad Directory").mkdir()

        plans = normalize_filenames.build_plan(
            repository,
            recursive=True,
            keep_unicode=False,
            include_dirs=True,
        )

        planned_sources = {plan.src.relative_to(repository).as_posix() for plan in plans}
        self.assertIn("Bad Directory", planned_sources)
        self.assertNotIn("__pycache__", planned_sources)
        self.assertNotIn("__pycache__/Bad_Module.cpython-314.pyc", planned_sources)
        self.assertNotIn("ignored-output", planned_sources)
        self.assertNotIn("ignored-output/Bad File.txt", planned_sources)
        self.assertNotIn("@types", planned_sources)

    def test_check_mode_matches_the_ci_contract(self) -> None:
        repository = self.create_fixture_repository()
        (repository / "__pycache__").mkdir()
        (repository / "__pycache__" / "Bad_Module.cpython-314.pyc").touch()
        (repository / "@types").mkdir()

        result = subprocess.run(
            [
                sys.executable,
                str(SCRIPT_PATH),
                str(repository),
                "--recursive",
                "--ascii-only",
                "--include-dirs",
                "--check",
            ],
            check=False,
            capture_output=True,
            text=True,
        )

        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(result.stdout, "No changes needed.\n")


if __name__ == "__main__":
    unittest.main()