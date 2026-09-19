import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const pagesBasePath = '/OverKill-Hill-FoundRy/';
const localBasePath = '/custom-gpt-creator/';

test('builds GitHub Pages assets under the repository base path', async () => {
  const build = spawnSync('pnpm', ['run', 'build'], {
    cwd: new URL('..', import.meta.url),
    encoding: 'utf8',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: '5000',
      BASE_PATH: pagesBasePath,
    },
  });

  assert.equal(
    build.status,
    0,
    `Pages build failed:\n${build.stdout}\n${build.stderr}`,
  );

  const html = await readFile(
    new URL('../dist/public/index.html', import.meta.url),
    'utf8',
  );
  const assetReferences = [
    ...html.matchAll(/\b(?:href|src)="([^"]+)"/g),
  ].map((match) => match[1]);

  assert.ok(assetReferences.length > 0, 'Expected generated asset references');
  assert.ok(
    assetReferences.some((reference) => reference.startsWith(pagesBasePath)),
    `Expected an asset reference under ${pagesBasePath}`,
  );

  for (const reference of assetReferences) {
    assert.ok(
      !reference.startsWith(localBasePath),
      `Found local preview asset reference in Pages build: ${reference}`,
    );

    if (reference.startsWith('/')) {
      assert.ok(
        reference.startsWith(pagesBasePath),
        `Found root-relative asset outside the Pages base path: ${reference}`,
      );
    }
  }
});