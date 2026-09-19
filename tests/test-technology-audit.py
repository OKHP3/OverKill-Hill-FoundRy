"""Regression coverage for false freshness, missed dependencies and release selection."""
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
import contextlib
import io
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("technology_audit", ROOT / "scripts/technology-audit.py")
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)


class Releases(unittest.TestCase):
    def test_numeric_order_and_prereleases(self):
        self.assertEqual(audit.latest_stable(["v9.9.9", "v10.0.0", "v11.0.0-rc.1"]), "v10.0.0")
        with self.assertRaises(ValueError):
            audit.latest_stable(["2.0.0-beta.1"])

    def test_partial_pins_and_multiple_versions(self):
        self.assertEqual(audit.compare(["v7"], "v7.2.1"), "current series")
        self.assertEqual(audit.compare(["3.13", "3.14"], "3.14.7"), "update available")
        self.assertEqual(audit.compare(["3.14.7"], "3.14.7"), "current")
        self.assertEqual(audit.compare(["8.0.0"], "7.5.0"), "ahead of upstream; investigate")
        self.assertEqual(audit.compare(["unknown"], "7.5.0"), "manual review")

    def test_failed_lookup_does_not_reuse_old_latest(self):
        row = {"name": "test", "lookup": "npm", "source": "https://registry.npmjs.org/test/latest", "current": ["1.0.0"], "latest": "1.2.0"}
        with patch.object(audit, "request_data", side_effect=OSError("offline")):
            result = audit.lookup(row)
        self.assertEqual(result["status"], "lookup failed")
        self.assertNotIn("latest", result)

    def test_npm_prerelease_channel_falls_back_to_stable(self):
        row = {"lookup": "npm", "source": "https://registry.npmjs.org/example/latest", "current": ["1.0.0"]}
        with patch.object(audit, "request_data", return_value={"dist-tags": {"latest": "2.0.0-beta.1"}, "versions": {"1.0.0": {}, "1.1.0": {}, "2.0.0-beta.1": {}}}):
            result = audit.lookup(row)
        self.assertEqual(result["latest"], "1.1.0")
        self.assertEqual(result["latest_tag"], "2.0.0-beta.1")

    def test_prerelease_only_is_explicit_not_current(self):
        row = {"lookup": "npm", "source": "https://registry.npmjs.org/example/latest", "current": ["1.0.0-beta.1"]}
        with patch.object(audit, "request_data", return_value={"dist-tags": {"latest": "1.0.0-beta.1"}, "versions": {"1.0.0-beta.1": {}}}):
            result = audit.lookup(row)
        self.assertEqual(result["status"], "upstream prerelease only")
        self.assertIn("retrieved_at", result)

    def test_backport_latest_tag_does_not_hide_stable_major(self):
        row = {"lookup": "npm", "source": "https://registry.npmjs.org/example", "current": ["2.0.0"]}
        with patch.object(audit, "request_data", return_value={"dist-tags": {"latest": "1.3.8"}, "versions": {"1.3.8": {}, "2.0.0": {}}}):
            result = audit.lookup(row)
        self.assertEqual(result["latest"], "2.0.0")
        self.assertEqual(result["latest_tag"], "1.3.8")
        self.assertEqual(result["status"], "current")

    def test_python_backport_does_not_win_over_newer_series(self):
        row = {"lookup": "python", "source": "https://www.python.org/api", "current": ["3.13"]}
        releases = [{"name": "Python 3.13.12", "pre_release": False}, {"name": "Python 3.14.7", "pre_release": False}, {"name": "Python 3.15.0rc1", "pre_release": True}]
        with patch.object(audit, "request_data", return_value=releases):
            self.assertEqual(audit.lookup(row)["latest"], "3.14.7")

    def test_node_current_and_lts_are_distinct(self):
        row = {"lookup": "node", "source": "https://nodejs.org/dist/index.json", "current": ["24"]}
        with patch.object(audit, "request_data", return_value=[{"version": "v26.9.0", "lts": False}, {"version": "v24.21.0", "lts": "Krypton"}]):
            result = audit.lookup(row)
        self.assertEqual(result["latest"], "v26.9.0")
        self.assertEqual(result["latest_lts"], "v24.21.0")
        self.assertEqual(result["latest_in_declared_series"], {"24": "v24.21.0"})

    def test_manual_reference_date_is_not_refreshed(self):
        row = {"name": "format", "reference_checked": "2020-01-01", "latest": "1.0", "current": ["unspecified"]}
        result = audit.lookup(row)
        self.assertEqual(result["reference_checked"], "2020-01-01")
        self.assertNotIn("retrieved_at", result)


class SourceInventory(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.files = {
            "package.json": json.dumps({"name": "test", "packageManager": "pnpm@10.0.0", "devDependencies": {"@scope/tool": "catalog:", "build-tool": "9.0.0"}}),
            "pnpm-workspace.yaml": "catalog:\n  '@scope/tool': ^2.0.0\noverrides:\n  build-tool: 8.0.0\n",
            "pnpm-lock.yaml": "lockfileVersion: '9.0'\nimporters:\n  .:\n    devDependencies:\n      '@scope/tool':\n        version: 2.1.0(peer@1.0.0)\n      build-tool:\n        version: 8.0.0\npackages:\n  '@scope/tool@2.1.0': {}\n  build-tool@8.0.0: {}\n  nested@1.0.0: {}\n  nested@2.0.0: {}\n",
            ".replit": 'modules = ["nodejs-24", "python-base-3.13"]\n[nix]\nchannel = "stable-25_05"\npackages = ["glib"]\n',
            "tsconfig.base.json": '{"compilerOptions":{"target":"es2022"}}',
            "lib/api-spec/openapi.yaml": "openapi: 3.1.0\n",
            "docs/technology-policy.json": '{"technologies":[]}',
            "scripts/requirements.txt": "PyYAML==6.0.3\n",
            ".github/workflows/test.yml": 'on: [push]\njobs:\n  check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/setup-node@v7\n        with:\n          node-version: 22\n',
        }
        for path, content in self.files.items():
            target = self.root / path
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(content, encoding="utf-8")
        self.git = patch.object(audit.subprocess, "check_output", side_effect=lambda args, **kw: "abc123" if args[1] == "rev-parse" else ("\0".join(self.files) + "\0").encode())
        self.git.start()

    def tearDown(self):
        self.git.stop()
        self.temp.cleanup()

    def test_catalog_peer_suffix_override_transitives_and_runtime_split(self):
        result = audit.inventory(self.root)
        rows = {r["name"]: r for r in result["technologies"]}
        self.assertEqual(rows["@scope/tool"]["current"], ["2.1.0"])
        self.assertEqual(rows["@scope/tool"]["declarations"][0]["constraint"], "^2.0.0")
        self.assertEqual(rows["build-tool"]["current"], ["8.0.0"])
        self.assertEqual(rows["build-tool"]["declarations"][0]["declared"], "9.0.0")
        self.assertEqual(rows["nested"]["current"], ["1.0.0", "2.0.0"])
        self.assertEqual(rows["nested"]["kind"], "npm transitive")
        self.assertEqual(rows["Node.js"]["current"], ["22", "24"])
        self.assertEqual(rows["actions/setup-node"]["current"], ["v7"])

    def test_missing_lock_resolution_fails_coverage(self):
        (self.root / "package.json").write_text(json.dumps({"packageManager": "pnpm@10.0.0", "dependencies": {"new-package": "^1.0.0"}}))
        with self.assertRaisesRegex(ValueError, "Missing lockfile resolution"):
            audit.inventory(self.root)

    def test_new_lock_format_requires_scanner_review(self):
        (self.root / "pnpm-lock.yaml").write_text("lockfileVersion: '10.0'\n")
        with self.assertRaisesRegex(ValueError, "Unsupported lockfile format"):
            audit.inventory(self.root)


class CommandContract(unittest.TestCase):
    def run_command(self, rows, *flags):
        with tempfile.TemporaryDirectory() as directory:
            report = {"source_commit": "fixture", "local_packages": [], "workspace_importers": [], "technologies": rows}
            with patch.object(audit, "inventory", return_value=report), patch.object(audit, "lookup", side_effect=lambda r: r), patch.object(audit.sys, "argv", ["audit", "--output-dir", directory, *flags]), patch.dict(audit.os.environ, {"GITHUB_STEP_SUMMARY": ""}), contextlib.redirect_stdout(io.StringIO()) as output:
                code = audit.main()
            saved = json.loads((Path(directory) / "technology-inventory.json").read_text())
            self.assertTrue((Path(directory) / "technology-inventory.md").is_file())
            return code, saved, output.getvalue()

    def test_drift_only_fails_explicit_scheduled_mode(self):
        row = {"name": "test", "kind": "npm direct", "current": ["1.0.0"], "latest": "2.0.0", "source": "https://example.test", "status": "update available"}
        self.assertEqual(self.run_command([dict(row)])[0], 0)
        self.assertEqual(self.run_command([dict(row)], "--fail-on-updates")[0], 1)

    def test_lookup_failure_preserves_report_and_returns_two(self):
        row = {"name": "test", "kind": "npm direct", "current": ["1.0.0"], "source": "https://example.test", "status": "lookup failed", "error": "timeout"}
        code, saved, _ = self.run_command([row], "--fail-on-updates")
        self.assertEqual(code, 2)
        self.assertEqual(saved["technologies"][0]["status"], "lookup failed")

    def test_offline_report_cannot_claim_current(self):
        row = {"name": "test", "kind": "npm direct", "current": ["1.0.0"], "source": "https://example.test"}
        code, saved, output = self.run_command([row], "--offline")
        self.assertEqual(code, 0)
        self.assertEqual(saved["technologies"][0]["status"], "not checked (offline)")
        self.assertIn("NOT CHECKED", output)


if __name__ == "__main__":
    unittest.main()
