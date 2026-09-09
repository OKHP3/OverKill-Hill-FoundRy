# Remaining closeout work — September 9, 2026

The original F01–F20 and W01–W06 assignments are complete as contracted artifacts.
This does not close the broader website release and acceptance work subsequently
included in the conversation. A previous scoped archive-ready answer was too
broad when read as completion of every remaining gate. No new delegates are
required or authorized for this closeout.

## Completed and reverified

All 26 worker commits remain ancestors of their owning origin/main, and all
recorded delivered paths exist. The original dispatch register records completed
branch/worktree removal and task archival. The FoundRy checkout was clean and
matched origin/main before this documentation update. Website PR75 and PR76
remain merged; the selected Option B and A15 implementation are also merged.

The superseded PR91 ledger candidate is preserved in the website repository's
annotated GitHub tag `archive/coop-closeout-ledger-20260909`, resolving to
`cfc7fe98e66e854388d1b13378cd58f4bbfbe9fb`. Its clean worktree and local/remote
branch were removed after tag verification. This is preservation evidence, not
a claim that every byte of the superseded ledger was adopted on main.

## Remaining steps and completion tests

| Work | Exact next steps | Completion evidence |
| --- | --- | --- |
| Website release repair | Reconcile the existing PR89 and PR93 changes against refreshed main. Preserve both histories; compare source diffs rather than infer supersession from closed PR status. Fix CI discovery of sibling checkout HTML, affected fingerprint output, regional source records, and any remaining concrete check failures. Run the relevant regressions and full required validation; merge only the reviewed green candidate. | PR head, merge SHA, and successful required check URLs; all intended changes reachable from main. |
| Deployment | Build the release artifact from the final validated SHA; deploy through the existing Pages workflow. Retrieve the public release manifest, verify its commit, and check representative served-byte hashes and private-path 404 behavior. Repeat affected browser tests when served bytes change. | Successful exact-SHA Pages run; live manifest and payload comparison matching that SHA. |
| Replit parity | Record clean/dirty state, HEAD, origin/main, and unpublished commits. Preserve the unpublished commit on a recovery ref before reconciliation. Review it, merge without dropping owner work, complete validation, and refresh origin. Do not publish a failed candidate. | Clean Replit checkout with agreed main ancestry/parity; recorded runtime and publication checks. |
| Actual acceptance | Execute the protocol below using real Safari/VoiceOver; add Windows NVDA/Firefox and a physical phone when available, as specified by the original A20 plan. Record failures and fix/retest affected behavior. Keep AI translation review distinct from human/native review. | Device/browser/AT versions, tested release SHA, steps, observed results, and tester evidence; no simulated passes. |
| Lifecycle cleanup | Inventory remaining in-scope worktrees, branches, stashes and recovery refs. For each completed candidate, prove main ancestry or documented supersession plus a verified remote recovery ref. Remove only clean, finished worktrees and matching branches; retain active work. Recheck remote deletion and local main state. | Per-ref disposition and recovery location; no unexplained in-scope local-only work. |
| Final declaration | Update the closeout record with those receipts and distinguish completed deliverables from optional future proposals. Declare the broader conversation complete only after every required gate above has evidence. | One consistent final verdict tied to the final source and deployed SHA. |

## Observed blockers at this checkpoint

- Website main `f1ceacbe3414d95ccb1a42195eb7d5a92ea23403` did not yet have a
  successful final release. PR89 and PR93 were active repair paths. Their state
  changes rapidly and must be fetched again before merge or final reporting.
- The public manifest observed during this check reported
  `901717e1788ab9905da2b6586ecc0e567a3ee16b`, not current main.
- Direct Replit shell inspection showed clean main
  `922d2eb0b168e99ec69e574c72a41e74cd259df5`, one commit ahead and nine behind
  fetched `f1ceacbe`. The unpublished commit is “Reject conflicting dates across
  duplicate Article JSON-LD nodes.” Another existing task was operating that
  checkout, so this inspection did not mutate it or start another agent.
- Actual Windows NVDA/Firefox and physical-phone results are unavailable in
  this Mac session. The original A20 plan makes those environments conditional
  on availability, so their absence is a named limitation rather than an
  unconditional archive blocker. Safari/VoiceOver remains an explicit test.

## Executable manual acceptance protocol

Record the public manifest commit, date, OS, device, browser and AT versions
before starting. Use `/`, `/projects/`, `/contact/`, `/projects/found-ry/`, and
`/writings/murderbird/`. Do not submit contact messages or external forms.

1. In Safari with VoiceOver, and, when available, separately Firefox with NVDA, navigate from
   the top using the screen reader. Confirm the page title, main landmark,
   headings, image alternatives, link names and reading order are meaningful.
2. Reach navigation and status disclosures by keyboard. Expand/collapse them;
   confirm the spoken name and state change and that focus remains usable.
3. Open search with its keyboard shortcut, search for `FoundRy`, navigate
   results, then press Escape. Confirm result announcements and restored focus;
   open the FoundRy result and verify the destination.
4. At actual browser zoom levels of 200% and 400%, inspect the same routes.
   Confirm text and controls remain reachable, focus is visible, and no content
   or task is lost. Record the actual displayed zoom level, not an assumption
   from a shortcut count.
5. When a physical phone is available, test portrait and landscape, navigation, search,
   disclosures, scrolling and the embedded FoundRy launch/recovery controls.
   Confirm controls respond to touch and the viewport is not trapped or clipped.
6. For each failure, record route, exact steps, expected and actual behavior,
   and release SHA. Repair the source, rerun affected automated checks, deploy
   a validated replacement, and repeat the failed manual steps. Store only
   public-safe evidence; do not publish personal tester details or recordings
   without authorization.

## Additional native Safari observation

On the live release reporting `901717e1`, a real Safari session opened the
homepage and its Command-K search dialog, focused the search field, returned
four results for `FoundRy`, and dismissed the overlay with Escape. Page zoom
shortcuts were exercised and the enlarged hero visually inspected; the exact
zoom percentage was not verified, so this is not a 200%/400% acceptance pass.
The temporary tab was closed and zoom restored. No VoiceOver speech,
physical-phone behavior, human judgment, or new-main deployment is certified by
this bounded observation.

## Native Mac portability refresh

On September 9, the actual Mac host ran `tests/test-murderbird-review-boundary.py`
(3 tests, pass) and `tests/test-release-package.py` (12 tests, pass) with Python
3.14.5. HEAD was `a03e87d5e122f0b98f5643c50d2f81ca1a7b791d` both before and
after execution. This refresh closes the bounded native portability check on
that candidate. It does not replace the spoken AT or physical-device sessions.

## Original acceptance wording and VoiceOver attempt

The September 7 website advancement plan specifies: “Real Safari/VoiceOver and,
when available, NVDA/Firefox/phone sessions.” The conditional environments must
not be converted into new unconditional requirements. Its worker instruction
also requires naming every unavailable check and returning accept-with-limits
or reject with reproducible reasons.

During this run, macOS System Settings showed VoiceOver off initially. It was
temporarily enabled for the approved test and the switch visibly changed to on.
The native computer-control tool twice timed out while accessing VoiceOver's
output. Therefore no spoken-output or completed VoiceOver task pass is claimed.
VoiceOver was returned to off and that state was visibly verified. Completing
this requirement needs an observable Safari/VoiceOver session or existing
real-session results. The ordinary Safari search checks above remain valid
within their stated limits.
