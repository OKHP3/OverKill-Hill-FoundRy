#!/usr/bin/env python3
"""Check Vite artifact fallbacks against their registered service contracts."""

from __future__ import annotations

import re
import sys
import tomllib
from dataclasses import dataclass
from pathlib import Path


CONTRACT_ENTRY_PATTERN = re.compile(
    r"""['"](?P<name>[^'"]+)['"]\s*:\s*\{\s*
        port:\s*(?P<port>\d+)\s*,\s*
        basePath:\s*(['"])(?P<base_path>.*?)\3\s*,\s*
    \}""",
    re.DOTALL | re.VERBOSE,
)
CONTRACT_RESOLVER_PATTERN = re.compile(
    r"""resolveArtifactBuildContract\s*\(\s*
        (['"])(?P<name>[^'"]+)\1""",
    re.DOTALL | re.VERBOSE,
)


@dataclass(frozen=True)
class BuildContract:
    port: int
    base_path: str


def parse_build_contracts(path: Path) -> dict[str, BuildContract]:
    source = path.read_text(encoding="utf-8")
    return {
        match.group("name"): BuildContract(
            port=int(match.group("port")),
            base_path=match.group("base_path"),
        )
        for match in CONTRACT_ENTRY_PATTERN.finditer(source)
    }


def format_value(value: object) -> str:
    return repr(value)


def check_artifacts(root: Path) -> list[str]:
    contract_path = root / "scripts/src/artifact-contract.ts"
    if not contract_path.is_file():
        return [f"artifact contract source is missing: {contract_path}"]

    contracts = parse_build_contracts(contract_path)
    errors: list[str] = []
    artifact_root = root / "artifacts"

    for vite_config in sorted(artifact_root.glob("*/vite.config.ts")):
        artifact = vite_config.parent.name
        manifest_path = vite_config.parent / ".replit-artifact/artifact.toml"
        contract = contracts.get(artifact)

        if contract is None:
            errors.append(
                f"{artifact} PORT/BASE_PATH: expected a fallback entry in "
                f"{contract_path.relative_to(root)}, but none was found"
            )
            continue

        vite_source = vite_config.read_text(encoding="utf-8")
        resolver = CONTRACT_RESOLVER_PATTERN.search(vite_source)
        if resolver is None or resolver.group("name") != artifact:
            resolved_name = (
                "none" if resolver is None else repr(resolver.group("name"))
            )
            errors.append(
                f"{artifact} PORT/BASE_PATH: expected vite.config.ts to resolve "
                f"the {artifact!r} fallback (found {resolved_name})"
            )

        if not manifest_path.is_file():
            errors.append(
                f"{artifact} PORT/BASE_PATH: expected registered service manifest "
                f"at {manifest_path.relative_to(root)}"
            )
            continue

        try:
            manifest = tomllib.loads(manifest_path.read_text(encoding="utf-8"))
        except tomllib.TOMLDecodeError as error:
            errors.append(
                f"{artifact} artifact.toml: expected valid TOML, but parsing failed: "
                f"{error}"
            )
            continue

        services = manifest.get("services")
        if not isinstance(services, list) or not services:
            errors.append(
                f"{artifact} PORT/BASE_PATH: expected a registered [[services]] "
                "entry in artifact.toml"
            )
            continue

        service = next(
            (candidate for candidate in services if isinstance(candidate, dict)),
            None,
        )
        if service is None:
            errors.append(
                f"{artifact} PORT/BASE_PATH: expected a valid [[services]] "
                "entry in artifact.toml"
            )
            continue

        registered_port = service.get("localPort")
        if registered_port != contract.port:
            errors.append(
                f"{artifact} PORT: expected {contract.port} from the Vite fallback, "
                f"but artifact.toml localPort is {format_value(registered_port)}"
            )

        service_env = service.get("env")
        if not isinstance(service_env, dict):
            service_env = {}

        registered_env_port = service_env.get("PORT")
        if registered_env_port != str(contract.port):
            errors.append(
                f"{artifact} PORT: expected {contract.port} in "
                f"artifact.toml [services.env].PORT, but found "
                f"{format_value(registered_env_port)}"
            )

        registered_base_path = service_env.get("BASE_PATH")
        if registered_base_path != contract.base_path:
            errors.append(
                f"{artifact} BASE_PATH: expected route {contract.base_path!r} "
                f"in artifact.toml [services.env].BASE_PATH, but found "
                f"{format_value(registered_base_path)}"
            )

        paths = service.get("paths")
        registered_service_path = (
            paths[0] if isinstance(paths, list) and paths else None
        )
        if registered_service_path != contract.base_path:
            errors.append(
                f"{artifact} BASE_PATH: expected route {contract.base_path!r} "
                f"in artifact.toml [services].paths[0], but found "
                f"{format_value(registered_service_path)}"
            )

        registered_preview_path = manifest.get("previewPath")
        if registered_preview_path != contract.base_path:
            errors.append(
                f"{artifact} BASE_PATH: expected route {contract.base_path!r} "
                f"in artifact.toml previewPath, but found "
                f"{format_value(registered_preview_path)}"
            )

    if not list(artifact_root.glob("*/vite.config.ts")):
        errors.append("artifacts PORT/BASE_PATH: expected at least one Vite artifact")

    return errors


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    errors = check_artifacts(root)
    if errors:
        print("Artifact build contract check failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("Artifact build contracts match Vite fallbacks and registered services.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())