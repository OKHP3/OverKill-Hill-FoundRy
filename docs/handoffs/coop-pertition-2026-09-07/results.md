# Coop-pertition execution results

Recorded September 7, 2026 (America/Chicago); final collection continued into September 8 UTC.

All 26 requested tasks were dispatched to `gpt-5.6-luna` at low effort in waves
of at most three active subagents. Each produced a local commit in its own
branch/worktree. All changed-file scopes and clean worker checkouts were checked.
Actual per-task token usage was not exposed and is not estimated here.

## Review surfaces

- [FoundRy draft PR #25](https://github.com/OKHP3/OverKill-Hill-FoundRy/pull/25): 19 candidates, assembled at `c355d5a14e3e87fc3a382c68870cccff8f7eb9f4`.
- [Responsive reproduction F10](https://github.com/OKHP3/OverKill-Hill-FoundRy/tree/coop/f10): held separately at `82e10dbeb` (full SHA in the dispatch record).
- [Website draft PR #64](https://github.com/OKHP3/OverKill-Hill/pull/64): six candidates at `71fe05b06b3f0afc22e1ec949f91bf354186e533`.

These are review candidates, not merged or deployed improvements. Existing
application runtime, stores, dependencies, Replit configuration, and website
source/generated pages were not edited by the workers. The six existing Replit
assignments were not relaunched. Skillz remained context only. The website owner
checkout and its two existing untracked dispatch notes remain untouched.

## Validation and review

| Scope | Evidence | Boundary |
| --- | --- | --- |
| Combined FoundRy candidate | `pnpm run typecheck`: PASS; explicit Node run of all `src/lib/*.test.ts`: 57 PASS, 0 FAIL | Includes pure prototype tests; does not wire prototypes into the application |
| Every FoundRy task worktree | Complete governance and filename checks: PASS | Mechanical gates do not establish product outcomes |
| F09 and F11 browser candidates | 2 keyboard/dialog tests and 1 coexistence test passed independently | Bounded Chromium journeys; not broad accessibility certification |
| F10 responsive candidate | 4 FAIL: long-name horizontal overflow at 320/390px, light/dark | Later package assertions not reached; repair belongs to application owner |
| Website W01 default checks | 6 PASS, 2 proposed-parity checks skipped | Skipped future claims are not current passing behavior |
| Website W05 default checks | 4 PASS, 1 proposed-redirect check skipped | Opt-in automatic-redirect expectation fails; live hosting behavior is unknown |
| Website W02 | 2 bounded parent-embed harness tests passed | Does not establish external application export/download functionality |
| Website content candidates | Source/evidence and authoring-path review, clean diffs | Not applied, visually accepted, or published page copy |

The first combined typecheck found an ArrayBuffer typing defect in F14; its
owner corrected it without an unsafe cast and the combined check then passed.
Review also corrected F04's Node VM versus real-browser evidence wording,
W03's application-source selection, W04's canonical FAQ edit location, and W05's
classification of automatic redirect as a proposal rather than a proven defect.
These corrections illustrate the review boundary; small-model output was not
accepted solely on its self-reported completion.

Detailed worker receipts are linked below. Their contemporaneous statements
about unavailable typechecks or governance are preserved; the coordinator checks
above supplement them at the recorded candidate revisions. Raw local combined
logs and reproduction traces remain under `.cache/coop-pertition/`.

## Task receipts

| ID | Task | Commit | Receipt |
| --- | --- | --- | --- |
| F01 | Prompt package example | `7eb757f2a` | [f01.md](f01.md) |
| F02 | Agent Skill package example | `3779ca04a` | [f02.md](f02.md) |
| F03 | Workflow package example | `e6ddca0df` | [f03.md](f03.md) |
| F04 | Software starter example | `843fe55b6` | [f04.md](f04.md) |
| F05 | ZIP portability regression | `b5796d640` | [f05.md](f05.md) |
| F06 | Backup byte-boundary regression | `3e9f7299f` | [f06.md](f06.md) |
| F07 | Storage recovery regression | `a76f04628` | [f07.md](f07.md) |
| F08 | Evidence wording regression | `7449d6d5c` | [f08.md](f08.md) |
| F09 | Keyboard and dialog acceptance | `addc8a3ae` | [f09.md](f09.md) |
| F10 | Narrow viewport acceptance | `82e10dbeb` | [f10.md](f10.md) |
| F11 | Studio coexistence acceptance | `409439a90` | [f11.md](f11.md) |
| F12 | Structured contract parser prototype | `f82880eab` | [f12.md](f12.md) |
| F13 | Executable evidence record prototype | `f10d475f4` | [f13.md](f13.md) |
| F14 | Package fingerprint prototype | `b217df01b` | [f14.md](f14.md) |
| F15 | Project revision diff prototype | `5e40de7df` | [f15.md](f15.md) |
| F16 | Safe import merge planner | `dc6e353ee` | [f16.md](f16.md) |
| F17 | Backup migration design | `afa8c4a94` | [f17.md](f17.md) |
| F18 | Skillz reference parser prototype | `7ddfdb170` | [f18.md](f18.md) |
| F19 | External agent handoff generator | `b991a9439` | [f19.md](f19.md) |
| F20 | Current release evidence addendum | `1ed585c13` | [f20.md](f20.md) |
| W01 | FoundRy feature-page contract tests | `906f4f8bd` | [w01.md](w01.md) |
| W02 | FoundRy embed acceptance harness | `59f49ff50` | [w02.md](w02.md) |
| W03 | Feature-page metadata parity audit | `fcd60818e` | [w03.md](w03.md) |
| W04 | FoundRy recovery and export FAQ candidate | `1eb71235b` | [w04.md](w04.md) |
| W05 | FoundRy redirect and launch regression | `f43515720` | [w05.md](w05.md) |
| W06 | Feature journey challenger review | `b1c3b6e88` | [w06.md](w06.md) |

## Next integration actions

1. Obtain current Replit checkpoints before overlapping source changes. Existing
   website A21 retains shared website integration ownership; no acknowledgement
   from it is assumed merely because a coordination notice was sent.
2. Review the new pure APIs and example usefulness. Register accepted new core
   tests in the actual CI entry point: current `test:capability` names only the
   original test file; the 57-test run above used an explicit glob.
3. Resolve F10 with the current application owner, preserving its reproduction.
   The held branch is not a reason to waive responsive acceptance.
4. Apply accepted website copy to canonical `site-src/` sources with parent CSS;
   regenerate outputs and run the site's complete release gates. Decide whether
   automatic legacy-route redirection is desired before making it required.
5. Validate the final combined revisions, then merge/publish through the existing
   ownership and deployment process. Keep worker refs until their candidates are
   integrated or explicitly declined with a recovery path.
