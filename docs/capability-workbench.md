# Build a capability in FoundRy

FoundRy is the OverKill region's browser-local workshop. It helps you author and
package the contract and source for a tool. The generated software output is a
runnable starter; implementing a bespoke system remains work for its builder.

## Run it locally

Use Node 22 or newer and pnpm 10.34.5, as pinned by `packageManager` in
`package.json`. CI reads that same pin.

```bash
pnpm install --frozen-lockfile
PORT=20017 BASE_PATH=/custom-gpt-creator/ pnpm --filter @workspace/custom-gpt-creator run dev
```

Open `http://localhost:20017/custom-gpt-creator/`. The workbench is the home view;
**Open Custom GPT studio** opens the original nine stations at `#creator`.
The browser Back button and **Capability workbench** link return to the workbench.
Existing GPT data retains the `cgpt-workspace` key and is never migrated into a
different target automatically.

## A complete authoring journey

1. Create a capability and name its owner, version, purpose and audience. Choose
   prompt, skill, workflow or software; use the separate studio for Custom GPTs.
2. Define inputs, outputs, constraints and observable acceptance criteria.
3. Write its method and components. Open Skillz and record relevant canonical
   package references, including a revision when reproducibility matters.
4. Record observed validation evidence and limitations. Review is a recorded
   human assertion, not a behavioral evaluation performed by FoundRy.
5. Inspect every generated file in Package and download the starter ZIP. Read its
   README for the target's next steps. For software, run the included starter and
   verify its behavior before extending it for your particular purpose.

Projects autosave locally. Duplicate creates a separate draft. Delete project asks for confirmation; export a backup before removing a project you may need again. Download a
workspace backup before clearing browser data or changing devices. Import
validates the file before offering explicit replacement of the current capability
workspace. Backups and exports can contain everything you typed; keep them in a
destination appropriate to your project.

## Scope and recovery

There is no login, remote database, provider key or paid model execution. Project
text is not sent to an AI service. External source links open only when selected.
The existing app loads fonts from Google Fonts; browser storage is specific to the
origin, so localhost, Pages and Replit do not share a workspace automatically.

If browser storage is unavailable, the application warns that edits remain in
memory. Download a backup before refreshing. If stored JSON is malformed, its
original value is preserved so recovery remains possible. Before an intentional edit replaces malformed data, the raw value is retained under a browser storage key beginning `okh-capability-workspace-recovery-`. Import accepts only the
known workspace version and validates project identities, field types and size.
A backup replacement affects capability projects only, not Custom GPT projects.

Exports preserve an OverKill scope. The universe diagram communicates ownership,
not a security boundary or authentication mechanism. FoundRy supplies the initial mentor pattern for the two sibling FoundRys, and
improvements can flow in either direction (see [mentoring model](foundry-mentoring-model.md)). Skillz is the shared catalog;
this application does not install, execute or publish a selected skill remotely.
Private source release still requires the repository's graduation checks.

## Architecture

- `artifacts/mockup-sandbox/src/pages/capability-workbench.tsx`: authoring interface.
- `artifacts/mockup-sandbox/src/lib/capability-workbench.ts`: workspace validation,
  local storage, structural assessment and portable target generators.
- `artifacts/mockup-sandbox/src/App.tsx`: workbench / creator switch and existing previews.
- `artifacts/custom-gpt-creator/`: existing deployment artifact, unchanged base-path contract.

The API/DB workspace packages are not part of this browser-local authoring path.
No new backend, duplicated Skillz catalog or sibling application dependency is introduced.

## Validation

Run the repository governance sequence, the core tests and the browser journeys:

```bash
python3 scripts/governance-check.py
python3 scripts/normalize_filenames.py . --recursive --ascii-only --include-dirs
node --experimental-strip-types --test artifacts/mockup-sandbox/src/lib/capability-workbench.test.ts
pnpm run typecheck
pnpm --filter @workspace/custom-gpt-creator exec playwright install chromium
pnpm --filter @workspace/custom-gpt-creator run test:e2e
PORT=20017 BASE_PATH=/OverKill-Hill-FoundRy/ NODE_ENV=production pnpm --filter @workspace/custom-gpt-creator run build
```

See the implementation plan for the dated acceptance record. Tests of the
workbench do not establish production quality of arbitrary user-authored outputs.
