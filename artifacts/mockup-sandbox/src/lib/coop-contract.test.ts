import test from "node:test";
import assert from "node:assert/strict";
import { ContractParseError, parseContract } from "./coop-contract.ts";

const schema = {
  version: 1,
  fields: {
    name: { type: "string" as const, required: true },
    count: { type: "number" as const },
    enabled: { type: "boolean" as const, required: true },
    note: { type: "null" as const },
  },
};

test("parses declared primitive fields and preserves values", () => {
  assert.deepEqual(parseContract('{"version":1,"name":"demo","enabled":true,"count":2}', schema), {
    version: 1, name: "demo", enabled: true, count: 2,
  });
});

for (const [name, source, path] of [
  ["missing required field", '{"version":1,"enabled":true}', "$.name"],
  ["wrong primitive", '{"version":1,"name":"demo","enabled":"yes"}', "$.enabled"],
  ["unknown field", '{"version":1,"name":"demo","enabled":true,"extra":1}', "$.extra"],
  ["unknown version", '{"version":2,"name":"demo","enabled":true}', "$.version"],
] as const) {
  test(name, () => {
    assert.throws(() => parseContract(source, schema), (error: unknown) =>
      error instanceof ContractParseError && error.path === path);
  });
}

test("rejects duplicate JSON fields instead of accepting the last value", () => {
  assert.throws(() => parseContract('{"version":1,"name":"a","name":"b","enabled":true}', schema), /duplicate field/);
});

test("reports malformed JSON at the root path", () => {
  assert.throws(() => parseContract('{"version":1,', schema), /\$:/);
});
