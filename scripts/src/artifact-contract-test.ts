import assert from 'node:assert/strict';
import test from 'node:test';

import { validateUniqueArtifactPorts } from './artifact-contract';

test('rejects a collision between a web artifact and the API server', () => {
  assert.throws(
    () =>
      validateUniqueArtifactPorts({
        'api-server': {
          port: 8080,
          basePath: '/api',
        },
        'web-artifact': {
          port: 8080,
          basePath: '/web/',
        },
      }),
    {
      message:
        'Artifact default port 8080 is assigned to both "api-server" and "web-artifact"',
    },
  );
});