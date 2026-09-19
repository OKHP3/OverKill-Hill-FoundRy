/**
 * Diagnostic contract shared by the Playwright and standalone GitHub Markdown
 * checks.
 *
 * Behavior labels are defined here so failures from either runner use the same
 * wording. A rendered fragment includes up to 180 characters before the
 * marker and 260 characters after it. If the marker is absent, diagnostics
 * include the first 500 characters of the response instead.
 */
export const diagnosticBehaviorLabels = Object.freeze({
  tableAndCodeRendering: "table and code rendering",
  safeLinksRemainLinks: "safe links remain links",
  relativeEvidenceLinksPreserveSectionAnchors:
    "relative evidence links preserve section anchors",
  nestedRepositoryRelativeEvidenceLinksPreserveNestedPaths:
    "nested repository-relative evidence links preserve nested paths",
  unsafeUrlProtocolsAreRemovedOrMadeNonExecutable:
    "unsafe URL protocols are removed or made non-executable",
  unsafeRawHtmlLinkAndImageDestinationsAreNonExecutable:
    "unsafe raw HTML link and image destinations are non-executable",
  safeInlineHtmlIsPreserved: "safe inline HTML is preserved",
  executableRawHtmlIsEscaped: "executable raw HTML is escaped",
  unsafeHtmlAttributesAreRemoved: "unsafe HTML attributes are removed",
  listsAndAuditFindingsRender: "lists and audit findings render",
});

export const renderedFragment = (html, marker) => {
  const markerPosition = html.indexOf(marker);
  if (markerPosition === -1) {
    return `[marker "${marker}" not found]\n${html.slice(0, 500)}`;
  }

  const start = Math.max(0, markerPosition - 180);
  const end = Math.min(html.length, markerPosition + marker.length + 260);
  return html.slice(start, end);
};

export const checkBehavior = (rendered, behavior, marker, assertion) => {
  try {
    assertion();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `${behavior} failed: ${message}\nRendered fragment near "${marker}":\n${renderedFragment(rendered, marker)}`,
      { cause: error },
    );
  }
};