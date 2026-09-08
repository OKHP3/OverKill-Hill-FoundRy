#!/usr/bin/env python3
"""Stream a UTF-8 conversation array into exact selected raw JSON records."""
import argparse
import hashlib
import json
import math
import sys
from pathlib import Path

CHUNK = 1024 * 1024


def _records(stream, limit=256 * 1024 * 1024):
    state, raw, depth, index = 'start', bytearray(), 0, 0
    quoted = escaped = False
    prefix = stream.read(3)
    while len(prefix) < 3:
        extra = stream.read(3 - len(prefix))
        if not extra:
            break
        prefix += extra
    chunk = b'' if prefix == b'\xef\xbb\xbf' else prefix
    while True:
        for b in chunk:
            if state == 'record':
                raw.append(b)
                if len(raw) > limit:
                    raise ValueError('record exceeds --max-record-mb')
                if quoted:
                    if escaped:
                        escaped = False
                    elif b == 92:
                        escaped = True
                    elif b == 34:
                        quoted = False
                elif b == 34:
                    quoted = True
                elif b in (123, 91):
                    depth += 1
                elif b in (125, 93):
                    depth -= 1
                    if depth == 0:
                        yield index, bytes(raw)
                        raw.clear()
                        index += 1
                        state = 'separator'
                continue
            if b in b' \t\r\n':
                continue
            if state == 'start' and b == 91:
                state = 'first'
            elif state in ('first', 'separator') and b == 93:
                state = 'end'
            elif state == 'separator' and b == 44:
                state = 'next'
            elif state in ('first', 'next') and b == 123:
                raw.append(b)
                depth = 1
                state = 'record'
            else:
                raise ValueError('invalid array separator, member, or trailing data')
        chunk = stream.read(CHUNK)
        if not chunk:
            break
    if state != 'end':
        raise ValueError('truncated or invalid JSON array')


def strict_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError('duplicate JSON object key')
        result[key] = value
    return result


def invalid_constant(value):
    raise ValueError('non-JSON numeric constant')


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--input', required=True, type=Path)
    ap.add_argument('--output', required=True, type=Path)
    select = ap.add_mutually_exclusive_group(required=True)
    select.add_argument('--ids', type=Path, help='One selected conversation ID per line')
    select.add_argument('--all', action='store_true', dest='all_records')
    ap.add_argument('--max-record-mb', type=float, default=256)
    args = ap.parse_args(argv)
    if not math.isfinite(args.max_record_mb) or args.max_record_mb <= 0:
        ap.error('--max-record-mb must be finite and positive')
    allow = None
    if args.ids:
        allow = {x.strip() for x in args.ids.read_text(encoding='utf-8-sig').splitlines() if x.strip()}
        if not allow:
            ap.error('IDs list is empty')
    if not args.input.is_file():
        ap.error('input file does not exist')
    try:
        args.output.mkdir(parents=True, exist_ok=False)
    except FileExistsError:
        ap.error('output directory already exists; refusing overwrite')
    records_dir = args.output / 'records'
    records_dir.mkdir()
    manifest = {'complete': False, 'source': str(args.input), 'records': [],
                'totals': {'scanned': 0, 'selected': 0, 'mapping_nodes': 0},
                'missing_ids': [], 'duplicate_ids': [], 'source_sha256': None,
                'source_hash_complete': False,
                'coverage_note': 'Complete means file scan only; assets and project coverage unverified.'}
    seen, source_hash, failure = set(), hashlib.sha256(), None
    try:
        with args.input.open('rb') as src:
            class Tee:
                def read(self, n):
                    data = src.read(n)
                    source_hash.update(data)
                    return data
            for n, raw in _records(Tee(), int(args.max_record_mb * 1024 * 1024)):
                obj = json.loads(raw.decode('utf-8'), object_pairs_hook=strict_object,
                                 parse_constant=invalid_constant)
                ident = obj.get('id') or obj.get('conversation_id')
                if not isinstance(ident, str) or not ident:
                    raise ValueError(f'record {n} has no string conversation ID')
                if obj.get('id') and obj.get('conversation_id') and obj['id'] != obj['conversation_id']:
                    raise ValueError(f'record {n} has conflicting conversation IDs')
                mapping = obj.get('mapping')
                if not isinstance(mapping, dict):
                    raise ValueError(f'record {n} has no mapping object')
                if ident in seen:
                    manifest['duplicate_ids'].append(ident)
                seen.add(ident)
                manifest['totals']['scanned'] += 1
                if args.all_records or ident in allow:
                    name = f'record-{n:08d}.json'
                    (records_dir / name).write_bytes(raw)
                    manifest['records'].append({'index': n, 'id': ident,
                        'file': f'records/{name}', 'sha256': hashlib.sha256(raw).hexdigest(),
                        'bytes': len(raw), 'mapping_nodes': len(mapping)})
                    manifest['totals']['selected'] += 1
                    manifest['totals']['mapping_nodes'] += len(mapping)
        manifest['source_sha256'] = source_hash.hexdigest()
        manifest['source_hash_complete'] = True
        manifest['complete'] = True
    except Exception as exc:
        failure = str(exc)
        manifest['error'] = failure
        manifest['source_prefix_sha256'] = source_hash.hexdigest()
    manifest['missing_ids'] = sorted(allow - seen) if allow is not None else []
    (args.output / 'manifest.json').write_text(
        json.dumps(manifest, indent=2, ensure_ascii=True) + '\n', encoding='utf-8')
    if failure:
        print(failure, file=sys.stderr)
        return 1
    print(json.dumps(manifest['totals']))
    return 0


if __name__ == '__main__':
    sys.exit(main())
