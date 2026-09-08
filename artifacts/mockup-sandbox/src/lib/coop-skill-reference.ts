/**
 * Experimental, pure parser for references into the public OKHP3/skillz tree.
 * This module does not fetch, resolve, or validate the referenced file.
 */

export type SkillReference = {
  /** The exact text supplied by the caller. */
  sourceText: string;
  /** Repository-relative path after the revision segment. */
  path: string;
  /** Branch or commit revision used by the URL. */
  revision: string;
  /** True only when revision is a complete 40-character Git commit SHA. */
  pinned: boolean;
};

const COMMIT_SHA = /^[0-9a-f]{40}$/i;
const CANONICAL_HOST = "github.com";
const CANONICAL_OWNER = "OKHP3";
const CANONICAL_REPOSITORY = "skillz";

function invalid(sourceText: string, reason: string): never {
  throw new Error(`Invalid Skillz reference${sourceText ? ` ${JSON.stringify(sourceText)}` : ""}: ${reason}`);
}

/** Parse one explicit canonical GitHub blob URL without performing network I/O. */
export function parseSkillReference(sourceText: string): SkillReference {
  if (typeof sourceText !== "string" || sourceText.length === 0) {
    invalid(String(sourceText), "reference must be a non-empty URL");
  }
  if (sourceText.trim() !== sourceText) {
    invalid(sourceText, "leading or trailing whitespace is not allowed");
  }

  let url: URL;
  try {
    url = new URL(sourceText);
  } catch {
    invalid(sourceText, "reference must be an absolute URL");
  }

  if (url.protocol !== "https:") invalid(sourceText, "HTTPS is required");
  if (url.username || url.password) invalid(sourceText, "userinfo is not allowed");
  // URL normalizes the default HTTPS port away, so inspect the authority too.
  if (url.hostname !== CANONICAL_HOST || url.port || /^https:\/\/github\.com:/i.test(sourceText)) {
    invalid(sourceText, "host must be github.com");
  }
  if (url.search || url.hash) invalid(sourceText, "query strings and fragments are not allowed");

  const segments = url.pathname.split("/").filter(Boolean);
  if (
    segments.length < 5 ||
    segments[0] !== CANONICAL_OWNER ||
    segments[1] !== CANONICAL_REPOSITORY ||
    segments[2] !== "blob"
  ) {
    invalid(sourceText, "reference must target OKHP3/skillz/blob");
  }

  const revision = segments[3];
  const path = segments.slice(4).join("/");
  if (!revision || !path) invalid(sourceText, "revision and file path are required");
  if (revision === "." || revision === ".." || path.split("/").some((part) => part === "." || part === "..")) {
    invalid(sourceText, "dot path segments are not allowed");
  }
  if (segments.some((segment) => segment.includes("%"))) {
    invalid(sourceText, "percent-encoded path segments are not allowed");
  }

  return {
    sourceText,
    path,
    revision,
    pinned: COMMIT_SHA.test(revision),
  };
}
