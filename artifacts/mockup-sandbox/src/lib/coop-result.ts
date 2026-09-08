/**
 * A caller-supplied record of an executable check.
 *
 * This module validates shape and conservative field syntax only. It never
 * runs `command`, reads `evidenceReference`, or verifies `packageDigest`.
 */
export type CoopResultStatus =
  | "pass"
  | "fail"
  | "inconclusive"
  | "not-run";

export interface CoopResultRecord {
  packageDigest: string;
  environment: string;
  command: string;
  result: CoopResultStatus;
  timestamp: string;
  evidenceReference: string;
}

export interface ValidatedCoopResult {
  record: CoopResultRecord;
  /** The result remains a caller assertion; this validator is not an executor. */
  trustBoundary: "caller-supplied; syntax-validated only; independently unverified";
}

const TRUST_BOUNDARY =
  "caller-supplied; syntax-validated only; independently unverified" as const;
const STATUSES: readonly CoopResultStatus[] = [
  "pass",
  "fail",
  "inconclusive",
  "not-run",
];
const FIELDS: readonly (keyof CoopResultRecord)[] = [
  "packageDigest",
  "environment",
  "command",
  "result",
  "timestamp",
  "evidenceReference",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredText(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Result record field "${field}" must be non-empty text.`);
  }
  return value;
}

/** Validate a caller-supplied result record without executing or authenticating it. */
export function validateCoopResult(value: unknown): ValidatedCoopResult {
  if (!isRecord(value)) throw new Error("Result record must be an object.");

  const unknownField = Object.keys(value).find(
    (field) => !FIELDS.includes(field as keyof CoopResultRecord),
  );
  if (unknownField) {
    throw new Error(`Result record contains unknown field "${unknownField}".`);
  }
  for (const field of FIELDS) {
    if (!(field in value)) throw new Error(`Result record is missing "${field}".`);
  }

  const packageDigest = requiredText(value.packageDigest, "packageDigest");
  if (!/^sha256:[a-f0-9]{64}$/.test(packageDigest)) {
    throw new Error("packageDigest must be a lowercase sha256:<64 hex> digest.");
  }
  const environment = requiredText(value.environment, "environment");
  const command = requiredText(value.command, "command");
  const result = requiredText(value.result, "result") as CoopResultStatus;
  if (!STATUSES.includes(result)) {
    throw new Error(`Result status must be one of: ${STATUSES.join(", ")}.`);
  }
  const timestamp = requiredText(value.timestamp, "timestamp");
  if (Number.isNaN(Date.parse(timestamp)) || timestamp !== new Date(timestamp).toISOString()) {
    throw new Error("timestamp must be a canonical ISO-8601 UTC timestamp.");
  }
  const evidenceReference = requiredText(
    value.evidenceReference,
    "evidenceReference",
  );

  return {
    record: {
      packageDigest,
      environment,
      command,
      result,
      timestamp,
      evidenceReference,
    },
    trustBoundary: TRUST_BOUNDARY,
  };
}
