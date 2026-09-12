# Remaining closeout work — September 9, 2026

> Superseded for this task by the final scoped disposition below. Historical
> observations remain evidence, not current blocking requirements.

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

## September 11 execution update

The September 9 blockers above are historical. The following refresh supersedes
those state observations, while preserving the original acceptance protocol.

- Website main and the clean local checkout match
  `640f0a951e99cd1e2f9b540ed52bb9848f72f13b`. PR97 merged the Replit recovery
  and pending release repairs. PR93 and PR94 are closed, and there are no open
  website PRs at this checkpoint. Closed status alone does not certify that
  every auxiliary branch byte was adopted.
- Exact-commit Site Validation succeeded:
  https://github.com/OKHP3/OverKill-Hill/actions/runs/34570818796
- Exact-commit Pages deployment succeeded:
  https://github.com/OKHP3/OverKill-Hill/actions/runs/34531330160
- The live release manifest identifies that commit. Independently retrieved
  homepage, shared JavaScript, and stylesheet SHA-256 values match its integrity
  inventory. Git config, AGENTS.md, and source page-manifest URLs return 404.
- The current live-edge verifier completed 487 checks with zero failures,
  39 blocked checks and 315 warnings. The blocked checks concern GitHub Pages
  header/cache enforcement limitations. This is a partial policy verification,
  not a content failure or proof that repository headers are enforced.
- Direct Replit shell inspection after fetching origin reports a clean main;
  HEAD and origin/main both equal `640f0a951e99cd1e2f9b540ed52bb9848f72f13b`.
  The old unpublished JSON-LD work is therefore reconciled. The publishing
  panel reports the public `over-kill-hill.replit.app` deployment was last
  published three days ago; this is not exact-current-release publication
  evidence. The Replit connector additionally requires reauthentication, but
  the browser workspace remains usable.
- The FoundRy checkout was safely fast-forwarded from `6a01239` to origin/main
  `267d286` before this record update. No owner work was discarded.
- Native macOS reports Tahoe 26.6.2. VoiceOver Utility already has its caption
  panel enabled. The approved activation visibly switched VoiceOver on, but
  the control tool again timed out retrieving VoiceOver output. A subsequent
  Settings observation showed VoiceOver off. The temporary Safari tab was
  closed. No spoken-output or caption-based acceptance pass is claimed.

### Work still required

1. Complete the real Safari/VoiceOver protocol above on the accepted release,
   including actual 200%/400% zoom observations. An observable native session
   or existing real-session results are needed; ordinary accessibility-tree
   inspection is not a substitute. Repair and retest any reproduced failure.
2. After acceptance, refresh the existing Replit publication through its browser
   workflow and verify runtime, manifest identity and served bytes. Its clean
   source parity is already verified; a three-day-old publication badge is not
   enough to claim deployed parity.
3. Retain auxiliary work owned by other existing tasks until its disposition
   is evidenced. The website currently has worktrees for cache-bust closeout,
   A21 integration, and AI-reviewed locale policy. The original 26-task batch
   and this root's superseded PR91 cleanup remain completed as recorded above.
   No additional delegate or worktree was created by this execution.
4. Attach the final acceptance and publication receipts, then make the final
   archive declaration. This conversation remains open pending those receipts.

## Final scoped disposition

The owner's final closeout instruction limits this task to its agreed
deliverables and necessary dependencies, excluding unrelated work and new
acceptance requirements. Re-reading the original dispatch confirms that this
batch does not supersede website A03–A21/T01–T06/W13 ownership. The earlier
attempt to make the broader A20 manual acceptance program and a fresh Replit
publication prerequisites for archiving this batch was an incorrect scope
expansion. Those tests are not certified, waived, or marked complete here.
Their existing owning work remains separate.

All 26 dispatch commits were rechecked against fetched origin/main in their
owning repositories; every commit is reachable and every delivered path exists.
Every dispatch entry records completed task archival, branch removal and
worktree removal. Both repositories have only their owner worktree. The site
has no open PRs. Previously retained root PR91 history remains preserved under
its recorded archive tag. No unique work or recovery material was deleted.

The original passing integration results in closeout-2026-09-08.md remain the
validation receipts for the unchanged batch. Current website Pages deployment
34672632209 succeeded for 15106ed76def503839bb30288d84f57e88d581f5, and the
public release manifest independently reports the same commit. Both owner
checkouts are clean and synchronized before this final documentation change.

Disposition: the coop-pertition task is complete and eligible for archival.
There are no remaining scoped implementation, integration, deployment, or
cleanup obligations. Future prototype adoption and the separate website
acceptance program do not expand this task's completion boundary.
