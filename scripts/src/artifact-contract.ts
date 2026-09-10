export type ArtifactBuildContract = Readonly<{
  port: number;
  basePath: string;
}>;

export type ArtifactBuildEnvironment = Readonly<{
  PORT?: string;
  BASE_PATH?: string;
}>;

export const artifactBuildContracts = {
  'custom-gpt-creator': {
    port: 20017,
    basePath: '/custom-gpt-creator/',
  },
  'mockup-sandbox': {
    port: 8081,
    basePath: '/__mockup',
  },
  'okh-capabilities': {
    port: 20633,
    basePath: '/okh-capabilities/',
  },
  'okh-foundry-landing': {
    port: 20360,
    basePath: '/',
  },
  'okh-identity-card': {
    port: 24910,
    basePath: '/okh-identity/',
  },
} as const satisfies Record<string, ArtifactBuildContract>;

export type ArtifactName = keyof typeof artifactBuildContracts;

export function resolveArtifactBuildContract(
  name: ArtifactName,
  environment: ArtifactBuildEnvironment = {},
): ArtifactBuildContract {
  const defaults = artifactBuildContracts[name];
  const rawPort = environment.PORT ?? String(defaults.port);
  const port = Number(rawPort);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }

  return {
    port,
    basePath: environment.BASE_PATH ?? defaults.basePath,
  };
}