/**
 * Diagnostic contract shared by the Playwright and standalone GitHub Markdown
 * checks.
 *
 * Behavior labels are defined here so failures from either runner use the same
 * wording. A rendered fragment includes up to 180 characters before the
 * marker and 260 characters after it. If the marker is absent, diagnostics
 * include the first 500 characters of the response instead.
 */
const rendererBehaviorDefinitions = [
  ["tableAndCodeRendering", "table and code rendering"],
  ["safeLinksRemainLinks", "safe links remain links"],
  [
    "relativeEvidenceLinksPreserveSectionAnchors",
    "relative evidence links preserve section anchors",
  ],
  [
    "nestedRepositoryRelativeEvidenceLinksPreserveNestedPaths",
    "nested repository-relative evidence links preserve nested paths",
  ],
  [
    "unsafeUrlProtocolsAreRemovedOrMadeNonExecutable",
    "unsafe URL protocols are removed or made non-executable",
  ],
  [
    "unsafeRawHtmlLinkAndImageDestinationsAreNonExecutable",
    "unsafe raw HTML link and image destinations are non-executable",
  ],
  [
    "safeRawHtmlLinkAndImageDestinationsRemainUsable",
    "safe raw HTML link and image destinations remain usable",
  ],
  ["safeInlineHtmlIsPreserved", "safe inline HTML is preserved"],
  ["executableRawHtmlIsEscaped", "executable raw HTML is escaped"],
  ["unsafeHtmlAttributesAreRemoved", "unsafe HTML attributes are removed"],
  ["listsAndAuditFindingsRender", "lists and audit findings render"],
];

/**
 * Deterministic behavior contract shared by the Playwright and standalone
 * runners. The runner labels remain the diagnostic API, while the keys are
 * stable IDs used to detect coverage drift.
 */
export const rendererBehaviorManifest = Object.freeze(
  rendererBehaviorDefinitions.map(([id, label]) => Object.freeze({ id, label })),
);

export const diagnosticBehaviorLabels = Object.freeze(
  Object.fromEntries(rendererBehaviorManifest.map(({ id, label }) => [id, label])),
);

const rendererBehaviorIdsByLabel = new Map(
  rendererBehaviorManifest.map(({ id, label }) => [label, id]),
);

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

export const createRendererBehaviorCoverage = (runner) => {
  const observedBehaviorIds = new Set();

  const coverageCheck = (rendered, behavior, marker, assertion) => {
    const behaviorId = rendererBehaviorIdsByLabel.get(behavior);
    if (!behaviorId) {
      throw new Error(
        `${runner} GitHub renderer behavior coverage drift: unknown behavior "${behavior}" is not in the shared manifest`,
      );
    }
    observedBehaviorIds.add(behaviorId);
    checkBehavior(rendered, behavior, marker, assertion);
  };

  const assertComplete = () => {
    const expectedBehaviorIds = new Set(rendererBehaviorManifest.map(({ id }) => id));
    const missingBehaviorIds = rendererBehaviorManifest
      .filter(({ id }) => !observedBehaviorIds.has(id))
      .map(({ id }) => id);
    const unexpectedBehaviorIds = [...observedBehaviorIds].filter(
      (id) => !expectedBehaviorIds.has(id),
    );

    if (missingBehaviorIds.length || unexpectedBehaviorIds.length) {
      const details = [
        missingBehaviorIds.length
          ? `missing: ${missingBehaviorIds.join(", ")}`
          : null,
        unexpectedBehaviorIds.length
          ? `unexpected: ${unexpectedBehaviorIds.join(", ")}`
          : null,
      ]
        .filter(Boolean)
        .join("; ");
      throw new Error(
        `${runner} GitHub renderer behavior coverage drift (${details}). Update both runners and the shared manifest together.`,
      );
    }
  };

  return Object.freeze({
    checkBehavior: coverageCheck,
    assertComplete,
  });
};