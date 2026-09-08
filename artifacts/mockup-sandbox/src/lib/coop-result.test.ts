import assert from "node:assert/strict";
import test from "node:test";
import { validateCoopResult, type CoopResultRecord } from "./coop-result.ts";

const valid: CoopResultRecord = {
  packageDigest: `sha256:${"a".repeat(64)}`,
  environment: "node 22 on macOS",
  command: "npm test -- --runInBand",
  result: "pass",
  timestamp: "2026-09-07T12:34:56.000Z",
  evidenceReference: "logs/run-123.txt#L1-L8",
};

test("accepts each declared result state and exposes the caller trust boundary", () => {
  for (const result of ["pass", "fail", "inconclusive", "not-run"] as const) {
    const checked = validateCoopResult({ ...valid, result });
    assert.equal(checked.record.result, result);
    assert.match(checked.trustBoundary, /caller-supplied/);
    assert.match(checked.trustBoundary, /independently unverified/);
  }
});

test("requires evidence and does not turn a caller pass into verification", () => {
  assert.throws(() => validateCoopResult({ ...valid, evidenceReference: " " }), /evidenceReference/);
  const checked = validateCoopResult(valid);
  assert.equal(checked.record.result, "pass");
  assert.equal(checked.trustBoundary, "caller-supplied; syntax-validated only; independently unverified");
});

test("rejects malformed digest, status, timestamp, missing fields, and unknown fields", () => {
  assert.throws(() => validateCoopResult({ ...valid, packageDigest: "sha256:bad" }), /packageDigest/);
  assert.throws(() => validateCoopResult({ ...valid, result: "verified" }), /status/);
  assert.throws(() => validateCoopResult({ ...valid, timestamp: "2026-09-07" }), /timestamp/);
  const missing = { ...valid } as Partial<CoopResultRecord>;
  delete missing.command;
  assert.throws(() => validateCoopResult(missing), /command/);
  assert.throws(() => validateCoopResult({ ...valid, extra: true }), /unknown field/);
});

test("never executes command or interprets evidence prose", () => {
  const checked = validateCoopResult({
    ...valid,
    command: "rm -rf /; echo PASS",
    evidenceReference: "PASS: definitely verified by an untrusted caller",
  });
  assert.equal(checked.record.command, "rm -rf /; echo PASS");
  assert.equal(checked.record.evidenceReference, "PASS: definitely verified by an untrusted caller");
});
