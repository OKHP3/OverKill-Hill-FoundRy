"""Regression tests for artifact contract drift diagnostics."""

from __future__ import annotations

import sys
import tempfile
import unittest
from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path


SCRIPT_PATH = Path(__file__).with_name("check-artifact-contract.py")
SPEC = spec_from_file_location("check_artifact_contract", SCRIPT_PATH)
assert SPEC and SPEC.loader
check_artifact_contract = module_from_spec(SPEC)
sys.modules[SPEC.name] = check_artifact_contract
SPEC.loader.exec_module(check_artifact_contract)


class ArtifactContractDiagnosticTests(unittest.TestCase):
    def create_fixture_repository(
        self,
        *,
        local_port: int = 4100,
        env_port: str = "4100",
        base_path: str = "/example/",
    ) -> Path:
        temporary_directory = tempfile.TemporaryDirectory()
        self.addCleanup(temporary_directory.cleanup)
        repository = Path(temporary_directory.name)

        contract_directory = repository / "scripts/src"
        contract_directory.mkdir(parents=True)
        (contract_directory / "artifact-contract.ts").write_text(
            """
const contracts = {
  "example-artifact": {
    port: 4100,
    basePath: "/example/",
  },
};
""".strip(),
            encoding="utf-8",
        )

        artifact_directory = repository / "artifacts/example-artifact"
        manifest_directory = artifact_directory / ".replit-artifact"
        manifest_directory.mkdir(parents=True)
        (artifact_directory / "vite.config.ts").write_text(
            'resolveArtifactBuildContract("example-artifact");\n',
            encoding="utf-8",
        )
        (manifest_directory / "artifact.toml").write_text(
            f"""
previewPath = "{base_path}"

[[services]]
localPort = {local_port}
paths = ["{base_path}"]

[services.env]
PORT = "{env_port}"
BASE_PATH = "{base_path}"
""".lstrip(),
            encoding="utf-8",
        )
        return repository

    def test_wrong_port_names_artifact_variable_and_expected_value(self) -> None:
        repository = self.create_fixture_repository(
            local_port=4999,
            env_port="4999",
        )

        errors = check_artifact_contract.check_artifacts(repository)

        port_errors = [error for error in errors if " PORT:" in error]
        self.assertTrue(port_errors, errors)
        for error in port_errors:
            self.assertIn("example-artifact", error)
            self.assertIn("PORT", error)
            self.assertIn("expected 4100", error)

    def test_wrong_route_names_artifact_variable_and_expected_value(self) -> None:
        repository = self.create_fixture_repository(base_path="/wrong/")

        errors = check_artifact_contract.check_artifacts(repository)

        route_errors = [error for error in errors if " BASE_PATH:" in error]
        self.assertTrue(route_errors, errors)
        for error in route_errors:
            self.assertIn("example-artifact", error)
            self.assertIn("BASE_PATH", error)
            self.assertIn("expected route '/example/'", error)


if __name__ == "__main__":
    unittest.main()