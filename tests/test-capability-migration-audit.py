"""Migration states must not imply nonexistent imports or converted products."""
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location("migration_audit", Path(__file__).resolve().parents[1] / "scripts/capability-migration-audit.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class MigrationAuditTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / "registry").mkdir()
        self.item = dict(slug="test-skill", source="https://github.com/example/source", source_revision="pinned-source-revision", owner="Builder", destination="capabilities/test-skill", status="planned", import_method="reviewed-snapshot")

    def check(self, items=None):
        data = dict(schemaVersion=1, foundry="OKHP3/OverKill-Hill-FoundRy", projectRoot="capabilities", migrations=items if items is not None else [self.item])
        (self.root / "registry/capability-migrations.json").write_text(json.dumps(data), encoding="utf-8")
        return module.audit(self.root)

    def test_plan_does_not_claim_an_import(self):
        self.assertEqual(self.check(), [])
        self.item["status"] = "imported"
        self.assertTrue(any("missing origin/source.json" in error for error in self.check()))

    def test_duplicate_or_escaping_destinations_fail(self):
        self.assertTrue(any("duplicate" in error for error in self.check([self.item, self.item])))
        self.item["destination"] = "../outside"
        self.assertTrue(any("destination" in error for error in self.check()))

    def test_conversion_and_validation_need_distinct_evidence(self):
        destination = self.root / self.item["destination"]
        for name in ("README.md", "capability.json", "origin/source.json"):
            path = destination / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("{}", encoding="utf-8")
        self.item.update(status="converted", import_evidence="docs/parity.md", source_review="docs/source-review.md", license_review="docs/license-review.md")
        self.assertTrue(any("named skill" in error for error in self.check()))
        skill = destination / "skills/test-skill/SKILL.md"
        skill.parent.mkdir(parents=True)
        skill.write_text("# Fixture skill", encoding="utf-8")
        self.assertEqual(self.check(), [])
        self.item["status"] = "validated"
        self.assertTrue(any("validation_evidence" in error for error in self.check()))

    def test_malformed_records_report_errors(self):
        for item in (None, {}, dict(self.item, slug=[]), dict(self.item, source_revision=None)):
            with self.subTest(item=item):
                self.assertTrue(self.check([item]))


if __name__ == "__main__":
    unittest.main()
