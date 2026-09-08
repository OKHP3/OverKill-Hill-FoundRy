import json, subprocess, sys, tempfile, unittest
from pathlib import Path
ROOT = Path(__file__).parents[4]
SCRIPT = ROOT / '.agents/skills/okhp3-chatgpt-project-migration/scripts/extract-conversations.py'
class ExtractTests(unittest.TestCase):
 def execute(self, text, *args):
  d=tempfile.TemporaryDirectory(); p=Path(d.name)/'x.json'; o=Path(d.name)/'out'; p.write_text(text); r=subprocess.run([sys.executable,str(SCRIPT),'--input',str(p),'--output',str(o),*args],capture_output=True,text=True); return d,r,o
 def test_chunk_boundaries_and_nodes(self):
  d,r,o=self.execute('[{"conversation_id":"a","mapping":{"x":{}}}]','--all'); self.assertEqual(r.returncode,0); m=json.loads((o/'manifest.json').read_text()); self.assertEqual(m['totals']['mapping_nodes'],3); d.cleanup()
 def test_invalid_separator(self):
  d,r,o=self.execute('[{"id":"a"} {"id":"b"}]','--all'); self.assertNotEqual(r.returncode,0); self.assertFalse(json.loads((o/'manifest.json').read_text())['complete']); d.cleanup()
if __name__=='__main__': unittest.main()
