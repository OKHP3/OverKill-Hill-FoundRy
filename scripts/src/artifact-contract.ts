export type ArtifactBuildContract = Readonly<{
  port: number;
  basePath: string;
}>;

export type ArtifactBuildEnvironment = Readonly<{
  PORT?: string;
  BASE_PATH?: string;
}>;

export const artifactBuildContracts = {
  'api-server': {
    port: 8080,
    basePath: '/api',
  },
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

export function validateUniqueArtifactPorts(
  contracts: Readonly<Record<string, ArtifactBuildContract>>,
): void {
  const artifactByPort = new Map<number, string>();

  for (const [artifactName, contract] of Object.entries(contracts)) {
    const existingArtifact = artifactByPort.get(contract.port);

    if (existingArtifact !== undefined) {
      throw new Error(
        `Artifact default port ${contract.port} is assigned to both "${existingArtifact}" and "${artifactName}"`,
      );
    }

    artifactByPort.set(contract.port, artifactName);
  }
}

validateUniqueArtifactPorts(artifactBuildContracts);

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