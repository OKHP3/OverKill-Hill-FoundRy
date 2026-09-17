#!/usr/bin/env python3
"""Smoke-test registered browser artifact preview routes and entry assets."""

from __future__ import annotations

import os
import shlex
import signal
import socket
import subprocess
import sys
import time
import tomllib
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
ARTIFACTS = ROOT / "artifacts"
STARTUP_TIMEOUT_SECONDS = 45


class EntryAssetParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.assets: list[str] = []

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        values = dict(attrs)
        if tag == "script" and values.get("src"):
            self.assets.append(values["src"])
        elif tag == "link" and values.get("href") and values.get("rel") in {
            "icon",
            "stylesheet",
        }:
            self.assets.append(values["href"])


def available_port() -> int:
    with socket.socket() as listener:
        listener.bind(("127.0.0.1", 0))
        return listener.getsockname()[1]


def fetch(url: str) -> tuple[int, str, bytes]:
    request = Request(url, headers={"Accept": "text/html,*/*"})
    with urlopen(request, timeout=5) as response:
        return (
            response.status,
            response.headers.get_content_type(),
            response.read(),
        )


def is_within_base(path: str, base_path: str) -> bool:
    if base_path == "/":
        return path.startswith("/")
    normalized_base = base_path.rstrip("/")
    return path == normalized_base or path.startswith(f"{normalized_base}/")


def stop(process: subprocess.Popen[str]) -> None:
    if process.poll() is not None:
        return
    os.killpg(process.pid, signal.SIGTERM)
    try:
        process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        os.killpg(process.pid, signal.SIGKILL)
        process.wait()


def smoke_artifact(manifest_path: Path) -> list[str]:
    manifest = tomllib.loads(manifest_path.read_text())
    if manifest.get("kind") not in {"web", "design"}:
        return []

    artifact_name = manifest_path.parents[1].name
    preview_path = manifest["previewPath"]
    development = manifest["services"][0].get("development", {})
    command = development.get("run")
    if not command:
        return [f"{artifact_name}: registered browser artifact has no development run command"]

    port = available_port()
    origin = f"http://127.0.0.1:{port}"
    preview_url = f"{origin}{preview_path}"
    environment = os.environ.copy()
    environment.pop("REPL_ID", None)
    environment.update({"PORT": str(port), "BASE_PATH": preview_path, "CI": "1"})
    process = subprocess.Popen(
        shlex.split(command),
        cwd=ROOT,
        env=environment,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        start_new_session=True,
    )

    try:
        deadline = time.monotonic() + STARTUP_TIMEOUT_SECONDS
        last_error = "server did not respond"
        while time.monotonic() < deadline:
            if process.poll() is not None:
                output = process.stdout.read() if process.stdout else ""
                return [
                    f"{artifact_name}: server exited with {process.returncode}\n{output}"
                ]
            try:
                status, content_type, body = fetch(preview_url)
                break
            except (HTTPError, URLError, TimeoutError) as error:
                last_error = str(error)
                time.sleep(0.25)
        else:
            return [f"{artifact_name}: {preview_url} unavailable: {last_error}"]

        errors: list[str] = []
        if status != 200:
            errors.append(f"{artifact_name}: entry returned HTTP {status}")
        if content_type != "text/html":
            errors.append(
                f"{artifact_name}: entry returned {content_type!r}, expected 'text/html'"
            )

        parser = EntryAssetParser()
        parser.feed(body.decode("utf-8"))
        local_assets = [
            urljoin(preview_url, asset)
            for asset in parser.assets
            if urlparse(asset).scheme in {"", "http", "https"}
            and urlparse(urljoin(preview_url, asset)).netloc == f"127.0.0.1:{port}"
        ]
        if not local_assets:
            errors.append(f"{artifact_name}: entry document has no local entry assets")

        for asset_url in local_assets:
            asset_path = urlparse(asset_url).path
            if not is_within_base(asset_path, preview_path):
                errors.append(
                    f"{artifact_name}: asset {asset_path!r} escapes preview path "
                    f"{preview_path!r}"
                )
                continue
            try:
                asset_status, _, _ = fetch(asset_url)
                if asset_status != 200:
                    errors.append(
                        f"{artifact_name}: asset {asset_path!r} returned HTTP {asset_status}"
                    )
            except (HTTPError, URLError, TimeoutError) as error:
                errors.append(f"{artifact_name}: asset {asset_path!r} failed: {error}")

        if not errors:
            print(
                f"ok: {artifact_name} served {preview_path} "
                f"with {len(local_assets)} local asset(s)"
            )
        return errors
    finally:
        stop(process)


def main() -> int:
    errors: list[str] = []
    manifests = sorted(ARTIFACTS.glob("*/.replit-artifact/artifact.toml"))
    for manifest_path in manifests:
        errors.extend(smoke_artifact(manifest_path))

    if errors:
        print("Artifact route smoke check failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("All registered browser artifact preview routes passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())