import hashlib
import importlib.util
import io
import json
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts/extract-conversations.py'
spec = importlib.util.spec_from_file_location('extractor', SCRIPT)
extractor = importlib.util.module_from_spec(spec)
spec.loader.exec_module(extractor)


class ExtractTests(unittest.TestCase):
    def test_chunk_boundaries_and_bom(self):
        raw = json.dumps({'id': 'x', 'text': '\\"[}]é', 'mapping': {'a': None}}).encode()
        for size in (1, 2, 3, 17, 1024):
            with self.subTest(chunk=size):
                extractor.CHUNK = size
                self.assertEqual(list(extractor._records(io.BytesIO(b'\xef\xbb\xbf[ '+raw+b' ]'))), [(0, raw)])
        extractor.CHUNK = 1024 * 1024

    def test_invalid_arrays(self):
        for data in (b'', b'[{}', b'[{},]', b'[,{}]', b'[{}{}]', b'[{},,{}]', b'[]x', b'{}'):
            with self.subTest(data=data), self.assertRaises(ValueError):
                list(extractor._records(io.BytesIO(data)))

    def test_limit_before_complete_record(self):
        with self.assertRaises(ValueError):
            list(extractor._records(io.BytesIO(b'[{"x":"' + b'a'*100), limit=32))

    def test_large_record(self):
        raw = b'{"id":"x","mapping":{},"text":"' + b'a'*(2*1024*1024) + b'"}'
        self.assertEqual(list(extractor._records(io.BytesIO(b'['+raw+b']')))[0][1], raw)

    def test_filter_branches_hashes_and_overwrite(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            source, ids, out = root/'input.json', root/'ids.txt', root/'out'
            obj = {'id': 'keep', 'mapping': {'root': None, 'a': {'parent': 'root'},
                   'b': {'parent': 'root'}}, 'current_node': 'b'}
            raw = json.dumps(obj).encode()
            data = b'['+raw+b', {"conversation_id":"drop","mapping":{}} ,'+raw+b']'
            source.write_bytes(data)
            ids.write_text('keep\nmissing\n')
            args = ['--input', str(source), '--output', str(out), '--ids', str(ids)]
            self.assertEqual(extractor.main(args), 0)
            manifest = json.loads((out/'manifest.json').read_text())
            self.assertEqual(manifest['totals'], {'scanned': 3, 'selected': 2, 'mapping_nodes': 6})
            self.assertEqual(manifest['missing_ids'], ['missing'])
            self.assertEqual(manifest['duplicate_ids'], ['keep'])
            self.assertEqual(manifest['source_sha256'], hashlib.sha256(data).hexdigest())
            self.assertEqual((out/manifest['records'][0]['file']).read_bytes(), raw)
            self.assertEqual(source.read_bytes(), data)
            with self.assertRaises(SystemExit):
                extractor.main(args)

    def test_bad_records_incomplete(self):
        cases = [b'[{"id":"x","mapping":{}},]', b'[{"id":"x","id":"y","mapping":{}}]',
                 b'[{"id":"x","mapping":{},"n":NaN}]', b'[{"id":"x"}]', b'[{}]']
        with tempfile.TemporaryDirectory() as folder:
            for i, data in enumerate(cases):
                source, out = Path(folder)/f'{i}.json', Path(folder)/f'out-{i}'
                source.write_bytes(data)
                self.assertEqual(extractor.main(['--input',str(source),'--output',str(out),'--all']), 1)
                manifest = json.loads((out/'manifest.json').read_text())
                self.assertFalse(manifest['complete'])
                self.assertIsNone(manifest['source_sha256'])


if __name__ == '__main__':
    unittest.main()
