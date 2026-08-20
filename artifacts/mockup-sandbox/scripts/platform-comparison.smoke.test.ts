import assert from "node:assert/strict";
import test from "node:test";
import {
  getPlatformComparisonText,
  getPlatformComparisonValue,
  PLATFORM_COMPARISON_LABEL_FALLBACK,
  PLATFORM_COMPARISON_ROWS,
  PLATFORM_COMPARISON_VALUE_FALLBACK,
  PLATFORM_COMPARISON_VERDICT_FALLBACK,
  PLATFORMS,
  validatePlatformComparison,
} from "../src/data/knowledge.ts";

test("every platform comparison row has a label, platform values, and a verdict", () => {
  assert.deepEqual(
    validatePlatformComparison(PLATFORMS, PLATFORM_COMPARISON_ROWS),
    [],
  );

  for (const row of PLATFORM_COMPARISON_ROWS) {
    assert.ok(row.label.trim(), "comparison rows must have labels");
    assert.ok(row.verdict.trim(), `${row.label} must have a verdict`);

    for (const platform of PLATFORMS) {
      assert.ok(
        getPlatformComparisonValue(platform, row.field).trim(),
        `${row.label} must have a value for ${platform.name}`,
      );
    }
  }
});

test("malformed comparison data is reported instead of being silently accepted", () => {
  const issues = validatePlatformComparison(
    [{ id: "gpt", name: "Custom GPT" }],
    [{ label: "Best for", field: "bestFor" }],
  );

  assert.ok(issues.some(issue => issue.includes("missing a verdict")));
  assert.ok(issues.some(issue => issue.includes("missing a value")));
  assert.equal(
    getPlatformComparisonValue({}, "bestFor"),
    PLATFORM_COMPARISON_VALUE_FALLBACK,
  );
  assert.equal(
    getPlatformComparisonText(undefined, PLATFORM_COMPARISON_LABEL_FALLBACK),
    PLATFORM_COMPARISON_LABEL_FALLBACK,
  );
  assert.equal(
    getPlatformComparisonText(undefined, PLATFORM_COMPARISON_VERDICT_FALLBACK),
    PLATFORM_COMPARISON_VERDICT_FALLBACK,
  );
});