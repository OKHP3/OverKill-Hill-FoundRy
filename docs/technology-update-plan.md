# Technology tracking and update plan

Reviewed 2026-09-19 UTC (2026-09-18 in America/Chicago).

## Result and scope

The [complete inventory](technology-inventory.md) replaces the obsolete July
inventory that described this repository as documentation-only. The solution now
includes a React/TypeScript workbench, Vite, Tailwind, Radix UI, browser-local
storage, an Express API, PostgreSQL client/Drizzle packages, OpenAPI/Orval code
generation, Playwright, Python governance utilities, and GitHub/Replit delivery.
Declaring a package does not prove that a route exercises it, or that a database
is provisioned. The Pages deployment is the static creator application, not the
Express server or PostgreSQL service.

The snapshot covers all 19 checked-in package manifests, all 12 pnpm lockfile
importers, 89 direct npm dependencies, 386 other locked package names, 11 GitHub
Actions, runtimes, standards, and managed services: 511 entries. It includes the
seven standalone imported skill packages (which have no external dependencies).
Historical prose, generated starter examples and suggested tools inside imported
skill instructions are not claims that those tools are installed. Browser/IDE
products used to work on this repository are not application dependencies.

Each machine-readable row preserves the current version(s), declaring paths,
official upstream source and retrieval time. Lockfile resolutions take precedence
over ranges. For example, the API manifest declares esbuild 0.28.2, but the workspace
override and lockfile resolve 0.27.3. All 493 locked package/version entries are
represented, including multiple nested versions and optional native packages.

## Key findings

| Technology | Current repository version | Stable upstream at audit | Treatment |
| --- | --- | --- | --- |
| TypeScript | 5.9.3 | [7.0.2](https://registry.npmjs.org/typescript/latest) | Dedicated compiler migration |
| Vite | 7.3.6 | [8.3.0](https://registry.npmjs.org/vite/latest) | Migrate with React plugin and native build tools |
| Tailwind CSS | 4.3.3 | [4.3.3](https://registry.npmjs.org/tailwindcss/latest) | Current |
| React / React DOM | 19.3.0 | [19.3.0](https://registry.npmjs.org/react/latest) | Current; retain coordinated versions |
| pnpm | 10.34.5 | [12.5.1](https://registry.npmjs.org/pnpm) (latest tag: 12.4.2) | Major package-manager/lockfile migration |
| Node.js | CI 22; Replit 24 | [26.9.0 Current; 24.21.0 LTS](https://nodejs.org/dist/index.json) | Prefer LTS; align CI/Replit in a tested runtime PR |
| Python | CI 3.11/3.12/3.14; Replit 3.13 | [3.14.7](https://www.python.org/downloads/) | Align supported runtimes after host validation |
| Playwright | 1.63.0 | [1.63.0](https://registry.npmjs.org/@playwright%2Ftest/latest) | Current; browser revision follows Playwright |
| Express | 5.2.1 | [5.2.1](https://registry.npmjs.org/express/latest) | Current |
| Zod | 3.25.76 | [4.6.5](https://registry.npmjs.org/zod/latest) | Coordinate generated schemas, resolvers and Drizzle |
| PostgreSQL server | Unknown; external DATABASE_URL | [18.6](https://www.postgresql.org/support/versioning/) | Inspect provider; separate database migration |
| OpenAPI | 3.1.0 | [3.2.1](https://spec.openapis.org/oas/) | Review generator compatibility before schema migration |

The full snapshot finds 25 direct npm packages with newer stable releases. There
are 163 update/anomaly candidates across all entries, mostly transitive packages.
This is a freshness comparison, not a vulnerability count or evidence that every
latest transitive release is compatible. Two dependency trees already contain
prerelease versions: `date-fns-jalali` has no stable published version, while
`gensync` advertises a beta on its latest tag and has 0.1.0 as its last stable
release. Neither is silently classified as current or automatically downgraded.

The scanner compares the highest numbered published stable npm release, and
records the publisher's `latest` tag separately. These are not always the same:
pnpm's highest stable release is 12.5.1, while its latest tag points to 12.4.2.
Dependabot follows its own supported update channels and compatibility rules;
the broader audit also surfaces stable versions those rules may not select.

## Implemented tracking

1. **Dependabot owns package update proposals.** Weekly npm updates cover the
   pnpm workspace and catalogs. Patch/minor changes are grouped, with a three-day
   cooldown and five open npm PRs maximum. Major updates are no longer suppressed;
   they open separate review PRs. Actions and the new audit-only Python parser
   have separate weekly coverage. The existing one-day pnpm release-age policy
   and native-package exclusions remain in force.
2. **The technology audit owns coverage and upstream comparison.** It derives
   current versions from source every run, including transitive locks and runtime
   selectors. It queries npm, PyPI, release publishers and specification owners.
   No application dependency installation is needed. Unknown versions and failed
   lookups remain visible. Unsupported lockfile formats or missing manifest
   resolutions fail coverage instead of quietly omitting packages.
3. **PR and push checks run offline.** Scanner regression tests and source
   extraction do not depend on an external registry being available. New package,
   lockfile, runtime, workflow or policy changes trigger these checks. An upstream
   release elsewhere cannot block an unrelated PR.
4. **Weekly/manual runs check live releases.** Monday at 09:17 UTC and manual
   dispatch produce a summary plus complete JSON/Markdown artifacts retained for
   30 days. Exit 0 means no detected drift, 1 means update/anomaly candidates, and
   2 means failed source lookups. A scheduled drift result is intentionally an
   attention signal, not a failed application build. Reports upload even on a
   nonzero exit. GitHub notification delivery still follows account settings.
5. **Version policy remains in manifests/configuration.** The committed inventory
   is a dated baseline. Scheduled artifacts are the latest observations; rerun
   with `--output-dir docs` to refresh the baseline in a reviewed change. Never
   edit generated rows to change a dependency version. Supplemental standards and
   provider-owned services live in `technology-policy.json`, with explicit manual
   reference dates. Recheck these at least quarterly and when changing platforms.

GitHub documents [pnpm catalog support](https://github.blog/changelog/2025-02-04-dependabot-now-supports-pnpm-workspace-catalogs-ga/)
and [grouping, cooldowns and update limits](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference).
Its [supported ecosystem list](https://docs.github.com/en/code-security/reference/supply-chain-security/supported-ecosystems-and-repositories)
currently lists pnpm through v10. Therefore, retain the v10 package-manager pin
until a v12 migration proves updater support, lockfile compatibility, script
behavior and Replit operation. The audit detects package-manager drift even when
Dependabot does not propose a `packageManager` field update.

## Merge and activation boundary

These configuration changes become active after integration into the default
branch. A successful local audit or an open PR does not activate a schedule.

GitHub was inspected during this audit: `allow_auto_merge` is true, but `main`
is unprotected and there are no repository rulesets. The existing auto-merge
workflow consequently leaves updates for maintainer review. This change does not
alter repository security settings. Automatic proposal and automatic production
integration are separate capabilities.

For unattended patch/minor integration, first configure required successful
Typecheck, E2E and filename checks on `main` (and applicable governance checks),
then use GitHub's native auto-merge. Keep zero mandatory human approvals for the
solo owner if desired. Major runtime, compiler, package-manager and schema
migrations remain reviewed. Never replace the native queue with a direct merge
that can race pending CI. Until protections are configured, the owner reviews
and merges tested update PRs.

## Migration sequence

1. Integrate this tracking change. Inspect the first live report and Dependabot
   update log to confirm the default-branch schedule and catalog coverage.
2. Bring compatible patch/minor dependencies forward. Inspect pnpm overrides,
   especially esbuild, because changing a manifest alone can leave the old
   effective version in place. Transitive updates should flow through compatible
   parent upgrades, not a blanket override of every nested dependency.
3. Align CI and Replit on a supported Node LTS and stable Python. Broad selectors
   already receive patches on a fresh setup, but do not prove that a running Repl
   restarted onto them. Check both hosts and the generated artifacts.
4. Migrate pnpm separately, retaining a recovery commit and testing the frozen
   lockfile installation, native build approvals and package-manager guard. Adapt
   the audit if the lockfile format changes. Do not assume a globally installed
   pnpm version is the version used by this workspace.
5. Migrate TypeScript and Vite/React plugin in bounded PRs. Review compiler
   options, project references, custom Vite plugins, native binaries and exports.
6. Migrate Zod/resolvers/code generation and the remaining breaking UI/logger
   upgrades in coherent groups. Verify saved workspace loading, capability
   projects, Canvas previews and exports. Preserve existing browser storage keys.
7. Inspect actual PostgreSQL, Replit channel and native-library versions before
   proposing platform migrations. Review standards on compatibility grounds;
   an ECMAScript 2026 publication does not require changing the ES2022 target.

Each dependency/runtime PR must pass a frozen install, typecheck, full workspace
build, capability tests, browser E2E and complete governance validation. Codegen
changes must regenerate and review clients/schemas. After merge, confirm Pages
deployment and live behavior, then separately verify Replit's commit, clean
working tree, install and runtime. Revert the integration commit if acceptance
fails; never repair with a force push or an unreviewed production database change.

## Reproduce

Use Python 3.11 or later (stable 3.14 recommended). Windows can use `py -3` in
place of `python` below. A virtual environment is recommended.

```sh
python -m pip install -r scripts/requirements.txt
python tests/test-technology-audit.py
python scripts/technology-audit.py --offline
python scripts/technology-audit.py
python scripts/technology-audit.py --output-dir docs
python scripts/governance-check.py
```

The default output is ignored `.local/technology-audit/`. For higher GitHub API
rate limits, supply `GH_TOKEN` using the host's credential environment; do not put
tokens in files, reports or commands committed to the repository.

## Evidence and unresolved versions

| Claim | Tier | Evidence / next check |
| --- | --- | --- |
| Repository versions and published stable package releases | Confirmed snapshot | Generated input hashes, declarations, retrieval timestamps and source URLs in inventory JSON |
| Exact runtime/dependency versions on production Pages or Replit | Unknown | A lockfile is source evidence; inspect build/run records and the running host |
| Replit live access | Blocked this audit | Connector returned reauthentication required; committed `.replit` was inspected |
| PostgreSQL server version | Unknown | Query `SHOW server_version` through the authorized provider; do not print DATABASE_URL |
| Nix libraries and fonts | Provider managed / partially unknown | All declared native packages are listed; Replit package versions and Google font binary revisions are not pinned |
| Compiler/package major upgrades are compatible | Unknown | Run the migration-specific acceptance checks before integration |
| Local host tools | Confirmed observation, not repository policy | Node 24.11.1, pnpm 11.19.0, Python 3.14.0rc1, Git 2.55.0.windows.5, GitHub CLI 2.96.0; observed 2026-09-19 UTC |

The local default Python is a release candidate. The audit/tests passed there,
but stable Python in GitHub CI is the separate portable validation surface.
No workstation tools, application dependency pins, database, browser-local data
or Replit deployment were upgraded by this audit. The only new Python dependency
is the pinned parser used by the inventory itself.

Next action: review and integrate the tracking PR, then resolve the runtime and
package-manager migrations in the sequence above.
