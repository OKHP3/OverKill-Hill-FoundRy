import assert from "node:assert/strict";
import test from "node:test";
import { fingerprintFiles, type FingerprintFile } from "./coop-fingerprint.ts";

const files: FingerprintFile[] = [
  { path: "docs/über.txt", content: "line one\nline two" },
  { path: "src/a|b.ts", content: "const value = 'x:y';" },
];

test("fingerprint is invariant to input ordering", async () => {
  const first = await fingerprintFiles(files);
  const second = await fingerprintFiles([...files].reverse());
  assert.equal(first, second);
  assert.match(first, /^[0-9a-f]{64}$/);
});

test("path and byte changes alter the fingerprint", async () => {
  const original = await fingerprintFiles(files);
  assert.notEqual(
    original,
    await fingerprintFiles([{ ...files[0], path: "docs/uber.txt" }, files[1]]),
  );
  assert.notEqual(
    original,
    await fingerprintFiles([{ ...files[0], content: "line one\r\nline two" }, files[1]]),
  );
  assert.notEqual(
    original,
    await fingerprintFiles([{ ...files[0], content: "line one\nline two 🔥" }, files[1]]),
  );
});

test("length framing keeps delimiter-like paths and content distinct", async () => {
  const first = await fingerprintFiles([{ path: "a|b", content: "c:d" }]);
  const second = await fingerprintFiles([{ path: "a", content: "b|c:d" }]);
  assert.notEqual(first, second);
});

test("duplicate paths are rejected", async () => {
  await assert.rejects(
    fingerprintFiles([
      { path: "same.txt", content: "one" },
      { path: "same.txt", content: "two" },
    ]),
    /Duplicate fingerprint path: same\.txt/,
  );
});
