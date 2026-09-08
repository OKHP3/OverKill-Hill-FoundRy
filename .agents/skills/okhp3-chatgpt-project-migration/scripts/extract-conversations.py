#!/usr/bin/env python3
"""Bounded-memory extractor for ChatGPT's top-level conversations array."""
import argparse, hashlib, json, sys
from pathlib import Path

CHUNK = 1024 * 1024

def _safe_name(n, ident):
    return f"record-{n:08d}-{hashlib.sha256(ident.encode('utf-8')).hexdigest()[:16]}.json"

def _mapping_nodes(value):
    if isinstance(value, dict):
        return 1 + sum(_mapping_nodes(v) for v in value.values())
    if isinstance(value, list):
        return sum(_mapping_nodes(v) for v in value)
    return 0

def _records(stream):
    """Yield exact bytes for each object in a top-level JSON array."""
    buf = bytearray(); started = False; depth = 0; in_string = False; escape = False
    done = False; index = 0; cursor = 0; member_start = None; need_value = True; need_comma = False
    while True:
        chunk = stream.read(CHUNK)
        if chunk: buf.extend(chunk)
        final = not chunk
        while cursor < len(buf):
            pos = cursor
            b = buf[pos]
            if not started:
                if b in b' \t\r\n':
                    cursor += 1; continue
                if b == 0xEF and bytes(buf[pos:pos+3]) == b'\xef\xbb\xbf':
                    cursor += 3; continue
                if b != ord('['): raise ValueError('top-level JSON value is not an array')
                started = True; cursor += 1; continue
            if done:
                if bytes(buf[pos:pos+1]).strip(): raise ValueError('trailing garbage after array')
                cursor += 1; continue
            if depth == 0 and not in_string:
                if b in b' \t\r\n': cursor += 1; continue
                if need_comma:
                    if b != ord(','): raise ValueError('missing comma between array members')
                    need_comma = False; need_value = True; cursor += 1; continue
                if b == ord(']'):
                    if not need_value and not need_comma: raise ValueError('invalid array state')
                    done = True; del buf[:pos+1]; pos = 0; continue
                if not need_value or b != ord('{'):
                    raise ValueError('array member is not a mapping object')
                member_start = pos; depth = 1; in_string = False; escape = False; need_value = False; cursor += 1; continue
            if in_string:
                if escape: escape = False
                elif b == ord('\\'): escape = True
                elif b == ord('"'): in_string = False
            elif b == ord('"'): in_string = True
            elif b == ord('{') or b == ord('['): depth += 1
            elif b == ord('}') or b == ord(']'):
                depth -= 1
                if depth == 0:
                    raw = bytes(buf[member_start:pos+1]); del buf[:pos+1]; cursor = 0
                    yield index, raw; index += 1; need_comma = True
                    continue
            cursor += 1
        if final:
            if not started or not done or depth or in_string:
                raise ValueError('truncated or invalid JSON array')
            return
        # retain only the current incomplete member; whitespace is harmless
        if len(buf) > 1024 * 1024 * 1024:
            raise ValueError('single record exceeds parser safety limit')

def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument('--input', required=True, type=Path)
    ap.add_argument('--output', required=True, type=Path)
    ap.add_argument('--ids', type=Path)
    ap.add_argument('--all', action='store_true', dest='all_records')
    ap.add_argument('--max-record-mb', type=float, default=256)
    args = ap.parse_args(argv)
    if bool(args.ids) == bool(args.all_records): ap.error('provide exactly one of --ids or --all')
    if args.output.exists(): raise SystemExit('output directory already exists; refusing overwrite')
    allow = None
    if args.ids:
        allow = {line.strip() for line in args.ids.read_text(encoding='utf-8-sig').splitlines() if line.strip()}
    args.output.mkdir(parents=True)
    records_dir = args.output / 'records'; records_dir.mkdir()
    manifest = {'complete': False, 'source': str(args.input), 'records': [], 'totals': {'scanned': 0, 'selected': 0, 'mapping_nodes': 0}, 'missing_ids': [], 'duplicate_ids': [], 'source_sha256': None, 'source_hash_complete': False}
    seen = set(); source_hash = hashlib.sha256(); status_error = None
    try:
        with args.input.open('rb') as src:
            class Tee:
                def read(self, n=-1):
                    b = src.read(n); source_hash.update(b); return b
            for n, raw in _records(Tee()):
                if len(raw) > args.max_record_mb * 1024 * 1024: raise ValueError(f'record {n} exceeds --max-record-mb')
                obj = json.loads(raw)
                ident = str(obj.get('id') or obj.get('conversation_id') or '') if isinstance(obj, dict) else ''
                if ident in seen and ident: manifest['duplicate_ids'].append(ident)
                if ident: seen.add(ident)
                manifest['totals']['scanned'] += 1; manifest['totals']['mapping_nodes'] += _mapping_nodes(obj)
                if args.all_records or ident in allow:
                    name = _safe_name(n, ident or f'index-{n}')
                    (records_dir / name).write_bytes(raw)
                    manifest['records'].append({'index': n, 'id': ident, 'file': f'records/{name}', 'sha256': hashlib.sha256(raw).hexdigest(), 'bytes': len(raw)})
                    manifest['totals']['selected'] += 1
        manifest['source_sha256'] = source_hash.hexdigest(); manifest['source_hash_complete'] = True; manifest['missing_ids'] = sorted(allow - seen) if allow is not None else []
        manifest['complete'] = True
    except Exception as exc:
        status_error = str(exc); manifest['error'] = status_error; manifest['source_sha256'] = source_hash.hexdigest()
    (args.output / 'manifest.json').write_text(json.dumps(manifest, indent=2, sort_keys=True) + '\n', encoding='utf-8')
    if status_error: print(status_error, file=sys.stderr); return 1
    return 0

if __name__ == '__main__': sys.exit(main())
