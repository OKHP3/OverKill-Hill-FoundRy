import json, subprocess, sys, tempfile
from pathlib import Path

ROOT = Path(__file__).parents[1]
SCRIPT = ROOT / '.agents/skills/okhp3-chatgpt-project-migration/scripts/extract-conversations.py'

def run(inp, out, *extra):
    return subprocess.run([sys.executable, str(SCRIPT), '--input', str(inp), '--output', str(out), *extra], capture_output=True, text=True)

def test_allowlist_and_exact_bytes():
    with tempfile.TemporaryDirectory() as d:
        p, o = Path(d)/'conversations.json', Path(d)/'out'
        raw = b'\xef\xbb\xbf[ {"id":"keep", "title":"x"}, {"id":"drop","mapping":{"a":{}}}, {"id":"keep"} ]\n'
        p.write_bytes(raw); r = run(p, o, '--all')
        assert r.returncode == 0
        m = json.loads((o/'manifest.json').read_text()); assert m['complete']
        assert m['totals']['scanned'] == 3 and m['totals']['selected'] == 3
        assert m['duplicate_ids'] == ['keep']
        assert any((o/x['file']).read_bytes() == b'{"id":"keep"}' for x in m['records'])

def test_filter_missing_and_malformed_incomplete():
    with tempfile.TemporaryDirectory() as d:
        p, o, ids = Path(d)/'x.json', Path(d)/'out', Path(d)/'ids'
        p.write_text('[{"id":"a"}]', encoding='utf8'); ids.write_text('a\nmissing\n')
        r = run(p, o, '--ids', ids); assert r.returncode == 0
        m = json.loads((o/'manifest.json').read_text()); assert m['missing_ids'] == ['missing']
        bad, bo = Path(d)/'bad.json', Path(d)/'bad-out'; bad.write_text('[{"id":"a"}', encoding='utf8')
        r = run(bad, bo, '--all'); assert r.returncode != 0
        assert json.loads((bo/'manifest.json').read_text())['complete'] is False

def test_overwrite_and_oversize_guard():
    with tempfile.TemporaryDirectory() as d:
        p, o = Path(d)/'x.json', Path(d)/'out'; p.write_text('[{"id":"a"}]')
        assert run(p, o, '--all').returncode == 0
        assert run(p, o, '--all').returncode != 0
        q, qo = Path(d)/'q.json', Path(d)/'qout'; q.write_text('[{"id":"a","x":"12345"}]')
        assert run(q, qo, '--all', '--max-record-mb', '0.00001').returncode != 0
