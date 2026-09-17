#!/usr/bin/env python3
"""Regression tests for registered artifact port collisions."""
from __future__ import annotations

import importlib.util
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CHECKER = ROOT / "scripts" / "check-artifact-contract.py"


def load_checker():
    spec = importlib.util.spec_from_file_location(
        "artifact_contract_under_test", CHECKER
    )
    if spec is None or spec.loader is None:
        raise RuntimeError(f"could not load artifact contract checker: {CHECKER}")
    checker = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = checker
    spec.loader.exec_module(checker)
    return checker


class ArtifactContractTests(unittest.TestCase):
    def test_rejects_api_and_web_manifest_port_collision(self) -> None:
        checker = load_checker()

        with tempfile.TemporaryDirectory() as temporary_directory:
            root = Path(temporary_directory)
            contract_path = root / "scripts" / "src" / "artifact-contract.ts"
            contract_path.parent.mkdir(parents=True)
            contract_path.write_text(
                """export const artifactBuildContracts = {
  'api-server': {
    port: 8080,
    basePath: '/api',
  },
  'web-artifact': {
    port: 8080,
    basePath: '/web/',
  },
};
""",
                encoding="utf-8",
            )

            self.write_manifest(root, "api-server", 8080, "/api")
            self.write_manifest(root, "web-artifact", 8080, "/web/")
            (root / "artifacts" / "web-artifact" / "vite.config.ts").write_text(
                "resolveArtifactBuildContract('web-artifact');\n",
                encoding="utf-8",
            )

            errors = checker.check_artifacts(root)

        self.assertIn(
            "artifact preview port 8080 is assigned to both 'api-server' and "
            "'web-artifact' in registered service manifests",
            errors,
        )

    @staticmethod
    def write_manifest(root: Path, artifact: str, port: int, path: str) -> None:
        manifest_path = (
            root / "artifacts" / artifact / ".replit-artifact" / "artifact.toml"
        )
        manifest_path.parent.mkdir(parents=True)
        manifest_path.write_text(
            f"""kind = "web"
previewPath = "{path}"

[[services]]
localPort = {port}
paths = ["{path}"]

[services.env]
PORT = "{port}"
BASE_PATH = "{path}"
""",
            encoding="utf-8",
        )


if __name__ == "__main__":
    unittest.main()