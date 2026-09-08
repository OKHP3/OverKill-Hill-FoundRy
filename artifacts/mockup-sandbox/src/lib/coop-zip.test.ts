import assert from "node:assert/strict";
import test from "node:test";
import {
  buildCapabilityFiles,
  buildCapabilityZip,
  newProject,
  type CapabilityProject,
} from "./capability-workbench.ts";

type ZipEntry = { path: string; bytes: Uint8Array; crc: number };

function project(overrides: Partial<CapabilityProject> = {}): CapabilityProject {
  return {
    ...newProject("software"),
    name: "ZIP portability 🔥 / ../ stays data",
    owner: "Renée 日本語",
    purpose: "Preserve UTF-8 content and empty fields",
    ...overrides,
  };
}

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Independent reader for the stored ZIP subset emitted by the workbench.
function readStoredZip(bytes: Uint8Array): ZipEntry[] {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const entries: ZipEntry[] = [];
  let cursor = 0;
  while (view.getUint32(cursor, true) === 0x04034b50) {
    assert.equal(view.getUint16(cursor + 8, true), 0, "only stored entries are expected");
    assert.equal(view.getUint16(cursor + 6, true) & 0x0800, 0x0800, "UTF-8 flag is required");
    const pathLength = view.getUint16(cursor + 26, true);
    const extraLength = view.getUint16(cursor + 28, true);
    const size = view.getUint32(cursor + 18, true);
    const pathStart = cursor + 30;
    const dataStart = pathStart + pathLength + extraLength;
    const path = decoder.decode(bytes.subarray(pathStart, pathStart + pathLength));
    const data = bytes.slice(dataStart, dataStart + size);
    assert.equal(view.getUint32(cursor + 14, true), crc32(data), `CRC for ${path}`);
    entries.push({ path, bytes: data, crc: crc32(data) });
    cursor = dataStart + size;
  }
  assert.equal(view.getUint32(cursor, true), 0x02014b50, "central directory follows local entries");
  return entries;
}

test("ZIP entries survive an independent reader with Unicode names/content and exact bytes", () => {
  const candidate = project();
  const sourceFiles = buildCapabilityFiles(candidate);
  const entries = readStoredZip(buildCapabilityZip(candidate));
  assert.deepEqual(entries.map((entry) => entry.path), sourceFiles.map((file) => file.path));
  for (const [index, file] of sourceFiles.entries()) {
    const expected = new TextEncoder().encode(file.content);
    assert.deepEqual(entries[index].bytes, expected, file.path);
    assert.equal(entries[index].crc, crc32(expected));
  }
  assert.match(new TextDecoder().decode(entries[0].bytes), /ZIP portability 🔥/);
});

test("empty project fields do not create truncated ZIP entries, and hostile names cannot become paths", () => {
  const generated = buildCapabilityZip(
    project({
      name: "../..\\unsafe / 名前",
      purpose: "",
      owner: "",
      evidence: "",
    }),
  );
  const entries = readStoredZip(generated);
  assert.ok(entries.length > 0);
  assert.ok(entries.every((entry) => entry.path.length > 0));
  assert.ok(entries.every((entry) => !entry.path.startsWith("/") && !entry.path.includes("\\")));
  assert.ok(entries.every((entry) => !entry.path.split("/").includes("..")));
  assert.ok(entries.some((entry) => entry.bytes.length === 0) === false, "generated package files are all deliberate documents");
});
