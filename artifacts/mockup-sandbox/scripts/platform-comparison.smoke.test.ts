import assert from "node:assert/strict";
import test from "node:test";
import {
  getPlatformComparisonText,
  getPlatformComparisonFact,
  getPlatformComparisonValue,
  getPlatformComparisonReviewSummary,
  getPlatformFactReviewStatus,
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
      const fact = getPlatformComparisonFact(platform, row.field);
      assert.ok(
        getPlatformComparisonValue(platform, row.field).trim(),
        `${row.label} must have a value for ${platform.name}`,
      );
      assert.ok(fact, `${row.label} must have a sourced fact for ${platform.name}`);
      assert.ok(fact.sources.length > 0, `${row.label} must cite a source for ${platform.name}`);
      assert.match(fact.lastReviewed, /^\d{4}-\d{2}-\d{2}$/);
      assert.match(fact.reviewBy, /^\d{4}-\d{2}-\d{2}$/);
    }
  }
});

test("malformed comparison data is reported instead of being silently accepted", () => {
  const issues = validatePlatformComparison(
    [{ id: "gpt", name: "Custom GPT" }],
    [{ label: "Best for", field: "bestFor" }],
  );

  assert.ok(issues.some(issue => issue.includes("missing a verdict")));
  assert.ok(issues.some(issue => issue.includes("missing a fact ledger")));
  assert.ok(issues.some(issue => issue.includes("missing a sourced fact")));
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

test("review status identifies current, upcoming, and overdue fact entries", () => {
  const fact = getPlatformComparisonFact(PLATFORMS[0], "models");
  assert.ok(fact);
  assert.equal(getPlatformFactReviewStatus(fact, "2026-08-20"), "current");
  assert.equal(getPlatformFactReviewStatus(fact, "2026-11-01"), "dueSoon");
  assert.equal(getPlatformFactReviewStatus(fact, "2026-11-19"), "overdue");

  const summary = getPlatformComparisonReviewSummary(
    PLATFORMS,
    PLATFORM_COMPARISON_ROWS,
    "2026-08-20",
  );
  assert.equal(summary.total, PLATFORMS.length * PLATFORM_COMPARISON_ROWS.length);
  assert.equal(summary.current, summary.total);
  assert.equal(summary.overdue, 0);
  assert.equal(summary.invalid, 0);
});

test("invalid dates and unsafe source URLs cannot be treated as current facts", () => {
  const malformedPlatform = {
    id: "invalid",
    name: "Invalid platform",
    facts: {
      bestFor: {
        value: "Broken review metadata",
        sources: [{ label: "Broken source", url: "javascript:alert(1)" }],
        lastReviewed: "2026-99-99",
        reviewBy: "2026-01-01",
      },
    },
  };
  const rows = [{ label: "Best for", field: "bestFor", verdict: "Validate facts." }];
  const fact = getPlatformComparisonFact(malformedPlatform, "bestFor");
  const issues = validatePlatformComparison([malformedPlatform], rows);

  assert.equal(getPlatformFactReviewStatus(fact, "2026-08-20"), "invalid");
  assert.ok(issues.some(issue => issue.includes("invalid review date")));
  assert.ok(issues.some(issue => issue.includes("invalid HTTPS source")));
});

test("missing or unsafe citations make otherwise dated facts invalid", () => {
  const validReviewDate = {
    lastReviewed: "2026-08-01",
    reviewBy: "2026-11-01",
  };
  const noSourcePlatform = {
    id: "no-source",
    name: "No source platform",
    facts: {
      bestFor: { value: "Uncited", sources: [], ...validReviewDate },
    },
  };
  const unsafeSourcePlatform = {
    id: "unsafe-source",
    name: "Unsafe source platform",
    facts: {
      bestFor: {
        value: "Unsafe citation",
        sources: [{ label: "Unsafe", url: "javascript:alert(1)" }],
        ...validReviewDate,
      },
    },
  };
  const rows = [{ label: "Best for", field: "bestFor", verdict: "Validate citations." }];

  assert.equal(
    getPlatformFactReviewStatus(
      getPlatformComparisonFact(noSourcePlatform, "bestFor"),
      "2026-08-20",
    ),
    "invalid",
  );
  assert.equal(
    getPlatformFactReviewStatus(
      getPlatformComparisonFact(unsafeSourcePlatform, "bestFor"),
      "2026-08-20",
    ),
    "invalid",
  );
  assert.equal(
    getPlatformComparisonReviewSummary([noSourcePlatform, unsafeSourcePlatform], rows, "2026-08-20").invalid,
    2,
  );
});

test("a future-dated review cannot be reported as current", () => {
  const futurePlatform = {
    id: "future",
    name: "Future review platform",
    facts: {
      bestFor: {
        value: "Future review",
        sources: [{ label: "Secure source", url: "https://example.com/source" }],
        lastReviewed: "2026-09-01",
        reviewBy: "2026-11-01",
      },
    },
  };

  assert.equal(
    getPlatformFactReviewStatus(
      getPlatformComparisonFact(futurePlatform, "bestFor"),
      "2026-08-20",
    ),
    "invalid",
  );
});