# Technology inventory

Generated: 2026-09-19T01:51:52+00:00 (UTC). Base commit: `ff28074495dadb1f6f78624000c5352a9dd7c7f9`.

Source-derived snapshot of the FoundRy workbench, supporting API/database packages, governance tools and delivery workflows. Manifests, lockfile and runtime configuration remain authoritative.

Coverage: 19 package manifests, 12 locked workspaces, 89 direct npm packages and 386 additional transitive package names.

npm current versions are exact lockfile resolutions, not proof of deployed/installed versions. The [JSON inventory](technology-inventory.json) includes every nested version, declaration, override, input hash and upstream source. Optional native packages may not be installed on all hosts. Direct rows compare direct resolutions; nested copies also appear in JSON.

npm compares the highest numbered published non-prerelease version and records the publisher's latest tag separately; these can differ. Node stable Current and LTS are distinct. Partial runtime/action pins float within their series; installed patch versions are unknown. Manual reference dates are preserved, never refreshed merely by running the audit.

See [the update plan](technology-update-plan.md) for migration order, unresolved managed versions and activation requirements.

## Runtimes, tools, standards and services

| Technology | In-place version / selector | Latest stable / reference | Status |
| --- | --- | --- | --- |
| [PyYAML](https://pypi.org/pypi/PyYAML/json) | 6.0.3 | 6.0.3 | current |
| [PostgreSQL](https://www.postgresql.org/support/versioning/) | Server version unknown; DATABASE_URL supplied externally | 18.6 | manual review |
| [Mermaid](https://registry.npmjs.org/mermaid) | GitHub-managed Markdown diagrams; renderer version unknown | 12.0.0 | manual review |
| [JavaScript / ECMAScript](https://ecma-international.org/publications-and-standards/standards/ecma-262/) | es2022 | ECMAScript 2026 (17th edition); compile target intentionally ES2022 (checked 2026-09-19) | managed / manual review |
| [Browser APIs / Web Storage](https://html.spec.whatwg.org/multipage/webstorage.html) | User browser; localStorage, Blob, File, DOM and download APIs | Browser-specific releases; no single project version | managed / manual review |
| [GitHub Actions / Pages / Dependabot](https://docs.github.com/en/pages) | GitHub-hosted services; no repository-selectable service version | Provider managed | managed / manual review |
| [GitHub hosted runner](https://github.com/actions/runner-images) | ubuntu-latest | Rolling GitHub runner image; exact image recorded in each Actions run | managed / manual review |
| [Replit / Nixpkgs](https://nixos.org/download/) | stable-25_05 | NixOS 26.05 upstream; Replit supported channel and installed package versions require host inspection (checked 2026-09-19) | managed / manual review |
| [Google Fonts](https://developers.google.com/fonts/docs/css2) | Google Fonts CSS2 API; fonts served dynamically | Provider managed; no pinned font binary release | managed / manual review |
| [pnpm](https://registry.npmjs.org/pnpm) | 10.34.5 | 12.5.1 | update available |
| [Node.js](https://nodejs.org/dist/index.json) | 22, 24 | v26.9.0; LTS v24.21.0 | update available |
| [Python](https://www.python.org/api/v2/downloads/release/?is_published=true&limit=1000) | 3.11, 3.12, 3.13, 3.14 | 3.14.7 | update available |
| [Bash](https://ftp.gnu.org/gnu/bash/) | Unpinned; GitHub runner and Replit supply shell | 5.3 | manual review |
| [CSS](https://www.w3.org/Style/CSS/current-work) | CSS modules and Tailwind-generated CSS; no single version | Module-specific W3C standards; no single CSS release | managed / manual review |
| [HTML](https://html.spec.whatwg.org/) | HTML5 doctype | WHATWG Living Standard (no numbered stable release) | managed / manual review |
| [JSON](https://www.rfc-editor.org/rfc/rfc8259) | JSON syntax | RFC 8259 (checked 2026-09-19) | managed / manual review |
| [JSON Schema](https://json-schema.org/specification) | 2020-12 | 2020-12 (checked 2026-09-19) | managed / manual review |
| [Markdown / GFM](https://github.github.com/gfm/) | GitHub-flavored Markdown; no pinned renderer | GFM 0.29-gfm / CommonMark 0.31.2 references; hosted renderer managed by GitHub (checked 2026-09-19) | managed / manual review |
| [OpenAPI](https://spec.openapis.org/oas/) | 3.1.0 | 3.2.1 | update available |
| [TOML](https://toml.io/en/) | No version directive; .replit parses with Python tomllib | 1.1.0 (checked 2026-09-19) | managed / manual review |
| [YAML](https://yaml.org/spec/1.2.2/) | No explicit YAML directive; parser-specific semantics | 1.2.2 (checked 2026-09-19) | managed / manual review |
| [Chromium](https://playwright.dev/docs/browsers) | Revision bundled with locked @playwright/test; GitHub installs it using playwright install | Track Playwright's tested bundled revision, not an independent browser upgrade | managed / manual review |
| [Git](https://www.kernel.org/pub/software/scm/git/) | Unpinned; host supplied | 2.55.0 | manual review |
| [Git for Windows](https://api.github.com/repos/git-for-windows/git/releases/latest) | 2.55.0.windows.5 (observed on audit host 2026-09-19; not a repo pin) | v2.55.0.windows.5 | manual review |
| [GitHub CLI](https://api.github.com/repos/cli/cli/releases/latest) | Unpinned in CI; 2.96.0 observed on audit host 2026-09-19 | v2.101.0 | manual review |

## GitHub Actions

| Technology | In-place version / selector | Latest stable / reference | Status |
| --- | --- | --- | --- |
| [actions/cache](https://api.github.com/repos/actions/cache/releases/latest) | v6 | v6.1.0 | current series |
| [actions/checkout](https://api.github.com/repos/actions/checkout/releases/latest) | v7 | v7.0.1 | current series |
| [actions/configure-pages](https://api.github.com/repos/actions/configure-pages/releases/latest) | v6 | v6.0.0 | current series |
| [actions/deploy-pages](https://api.github.com/repos/actions/deploy-pages/releases/latest) | v5 | v5.0.1 | current series |
| [actions/github-script](https://api.github.com/repos/actions/github-script/releases/latest) | v9 | v9.0.0 | current series |
| [actions/setup-node](https://api.github.com/repos/actions/setup-node/releases/latest) | v7 | v7.0.0 | current series |
| [actions/setup-python](https://api.github.com/repos/actions/setup-python/releases/latest) | v7 | v7.0.0 | current series |
| [actions/upload-artifact](https://api.github.com/repos/actions/upload-artifact/releases/latest) | v7 | v7.0.1 | current series |
| [actions/upload-pages-artifact](https://api.github.com/repos/actions/upload-pages-artifact/releases/latest) | v5 | v5.0.0 | current series |
| [dependabot/fetch-metadata](https://api.github.com/repos/dependabot/fetch-metadata/releases/latest) | v3 | v3.1.0 | current series |
| [pnpm/action-setup](https://api.github.com/repos/pnpm/action-setup/releases/latest) | v6 | v6.1.0 | current series |

## Direct application and development dependencies

| Technology | In-place version / selector | Latest stable / reference | Status |
| --- | --- | --- | --- |
| [@hookform/resolvers](https://registry.npmjs.org/@hookform%2Fresolvers) | 3.10.0 | 5.9.1 | update available |
| [@playwright/test](https://registry.npmjs.org/@playwright%2Ftest) | 1.63.0 | 1.63.0 | current |
| [@radix-ui/react-accordion](https://registry.npmjs.org/@radix-ui%2Freact-accordion) | 1.2.20 | 1.2.20 | current |
| [@radix-ui/react-alert-dialog](https://registry.npmjs.org/@radix-ui%2Freact-alert-dialog) | 1.1.23 | 1.1.23 | current |
| [@radix-ui/react-aspect-ratio](https://registry.npmjs.org/@radix-ui%2Freact-aspect-ratio) | 1.1.15 | 1.1.15 | current |
| [@radix-ui/react-avatar](https://registry.npmjs.org/@radix-ui%2Freact-avatar) | 1.2.6 | 1.2.6 | current |
| [@radix-ui/react-checkbox](https://registry.npmjs.org/@radix-ui%2Freact-checkbox) | 1.3.11 | 1.3.11 | current |
| [@radix-ui/react-collapsible](https://registry.npmjs.org/@radix-ui%2Freact-collapsible) | 1.1.20 | 1.1.20 | current |
| [@radix-ui/react-context-menu](https://registry.npmjs.org/@radix-ui%2Freact-context-menu) | 2.3.7 | 2.3.7 | current |
| [@radix-ui/react-dialog](https://registry.npmjs.org/@radix-ui%2Freact-dialog) | 1.1.23 | 1.1.23 | current |
| [@radix-ui/react-dropdown-menu](https://registry.npmjs.org/@radix-ui%2Freact-dropdown-menu) | 2.1.24 | 2.1.24 | current |
| [@radix-ui/react-hover-card](https://registry.npmjs.org/@radix-ui%2Freact-hover-card) | 1.1.23 | 1.1.23 | current |
| [@radix-ui/react-label](https://registry.npmjs.org/@radix-ui%2Freact-label) | 2.1.15 | 2.1.15 | current |
| [@radix-ui/react-menubar](https://registry.npmjs.org/@radix-ui%2Freact-menubar) | 1.1.24 | 1.1.24 | current |
| [@radix-ui/react-navigation-menu](https://registry.npmjs.org/@radix-ui%2Freact-navigation-menu) | 1.2.22 | 1.2.22 | current |
| [@radix-ui/react-popover](https://registry.npmjs.org/@radix-ui%2Freact-popover) | 1.1.23 | 1.1.23 | current |
| [@radix-ui/react-progress](https://registry.npmjs.org/@radix-ui%2Freact-progress) | 1.1.16 | 1.1.16 | current |
| [@radix-ui/react-radio-group](https://registry.npmjs.org/@radix-ui%2Freact-radio-group) | 1.4.7 | 1.4.7 | current |
| [@radix-ui/react-scroll-area](https://registry.npmjs.org/@radix-ui%2Freact-scroll-area) | 1.2.18 | 1.2.18 | current |
| [@radix-ui/react-select](https://registry.npmjs.org/@radix-ui%2Freact-select) | 2.3.7 | 2.3.7 | current |
| [@radix-ui/react-separator](https://registry.npmjs.org/@radix-ui%2Freact-separator) | 1.1.15 | 1.1.15 | current |
| [@radix-ui/react-slider](https://registry.npmjs.org/@radix-ui%2Freact-slider) | 1.4.7 | 1.4.7 | current |
| [@radix-ui/react-slot](https://registry.npmjs.org/@radix-ui%2Freact-slot) | 1.3.3 | 1.3.3 | current |
| [@radix-ui/react-switch](https://registry.npmjs.org/@radix-ui%2Freact-switch) | 1.3.7 | 1.3.7 | current |
| [@radix-ui/react-tabs](https://registry.npmjs.org/@radix-ui%2Freact-tabs) | 1.1.21 | 1.1.21 | current |
| [@radix-ui/react-toast](https://registry.npmjs.org/@radix-ui%2Freact-toast) | 1.2.23 | 1.2.23 | current |
| [@radix-ui/react-toggle](https://registry.npmjs.org/@radix-ui%2Freact-toggle) | 1.1.18 | 1.1.18 | current |
| [@radix-ui/react-toggle-group](https://registry.npmjs.org/@radix-ui%2Freact-toggle-group) | 1.1.19 | 1.1.19 | current |
| [@radix-ui/react-tooltip](https://registry.npmjs.org/@radix-ui%2Freact-tooltip) | 1.2.16 | 1.2.16 | current |
| [@replit/vite-plugin-cartographer](https://registry.npmjs.org/@replit%2Fvite-plugin-cartographer) | 0.6.1 | 0.6.1 | current |
| [@replit/vite-plugin-dev-banner](https://registry.npmjs.org/@replit%2Fvite-plugin-dev-banner) | 0.1.2 | 0.1.2 | current |
| [@replit/vite-plugin-runtime-error-modal](https://registry.npmjs.org/@replit%2Fvite-plugin-runtime-error-modal) | 0.0.6 | 0.0.6 | current |
| [@tailwindcss/typography](https://registry.npmjs.org/@tailwindcss%2Ftypography) | 0.5.20 | 0.5.20 | current |
| [@tailwindcss/vite](https://registry.npmjs.org/@tailwindcss%2Fvite) | 4.3.3 | 4.3.3 | current |
| [@tanstack/react-query](https://registry.npmjs.org/@tanstack%2Freact-query) | 5.102.8 | 5.103.1 | update available |
| [@types/cookie-parser](https://registry.npmjs.org/@types%2Fcookie-parser) | 1.4.10 | 1.4.10 | current |
| [@types/cors](https://registry.npmjs.org/@types%2Fcors) | 2.8.19 | 2.8.19 | current |
| [@types/express](https://registry.npmjs.org/@types%2Fexpress) | 5.0.6 | 5.0.6 | current |
| [@types/node](https://registry.npmjs.org/@types%2Fnode) | 25.9.6 | 26.6.2 | update available |
| [@types/pg](https://registry.npmjs.org/@types%2Fpg) | 8.23.1 | 8.23.1 | current |
| [@types/react](https://registry.npmjs.org/@types%2Freact) | 19.3.0 | 19.3.0 | current |
| [@types/react-dom](https://registry.npmjs.org/@types%2Freact-dom) | 19.3.0 | 19.3.0 | current |
| [@vitejs/plugin-react](https://registry.npmjs.org/@vitejs%2Fplugin-react) | 5.2.0 | 6.1.1 | update available |
| [chokidar](https://registry.npmjs.org/chokidar) | 4.0.3 | 5.0.0 | update available |
| [class-variance-authority](https://registry.npmjs.org/class-variance-authority) | 0.7.1 | 0.7.1 | current |
| [clsx](https://registry.npmjs.org/clsx) | 2.1.1 | 2.1.1 | current |
| [cmdk](https://registry.npmjs.org/cmdk) | 1.1.1 | 1.1.1 | current |
| [cookie-parser](https://registry.npmjs.org/cookie-parser) | 1.4.7 | 1.4.7 | current |
| [cors](https://registry.npmjs.org/cors) | 2.8.6 | 2.8.6 | current |
| [date-fns](https://registry.npmjs.org/date-fns) | 3.6.0 | 4.4.0 | update available |
| [drizzle-kit](https://registry.npmjs.org/drizzle-kit) | 0.31.10 | 0.31.10 | current |
| [drizzle-orm](https://registry.npmjs.org/drizzle-orm) | 0.45.2 | 0.45.2 | current |
| [drizzle-zod](https://registry.npmjs.org/drizzle-zod) | 0.8.3 | 0.8.3 | current |
| [embla-carousel-react](https://registry.npmjs.org/embla-carousel-react) | 8.6.0 | 8.6.0 | current |
| [esbuild](https://registry.npmjs.org/esbuild) | 0.27.3 | 0.28.2 | update available |
| [esbuild-plugin-pino](https://registry.npmjs.org/esbuild-plugin-pino) | 2.3.3 | 2.3.3 | current |
| [express](https://registry.npmjs.org/express) | 5.2.1 | 5.2.1 | current |
| [fast-glob](https://registry.npmjs.org/fast-glob) | 3.3.3 | 3.3.3 | current |
| [framer-motion](https://registry.npmjs.org/framer-motion) | 12.43.0 | 13.4.0 | update available |
| [input-otp](https://registry.npmjs.org/input-otp) | 1.5.0 | 1.5.0 | current |
| [lucide-react](https://registry.npmjs.org/lucide-react) | 0.577.0 | 1.47.0 | update available |
| [markdown-it](https://registry.npmjs.org/markdown-it) | 14.3.1 | 15.0.2 | update available |
| [marked](https://registry.npmjs.org/marked) | 15.0.12 | 18.0.13 | update available |
| [next-themes](https://registry.npmjs.org/next-themes) | 0.4.6 | 0.4.6 | current |
| [orval](https://registry.npmjs.org/orval) | 8.31.0 | 8.34.0 | update available |
| [pg](https://registry.npmjs.org/pg) | 8.23.0 | 8.23.0 | current |
| [pino](https://registry.npmjs.org/pino) | 9.14.0 | 10.3.1 | update available |
| [pino-http](https://registry.npmjs.org/pino-http) | 10.5.0 | 11.0.0 | update available |
| [pino-pretty](https://registry.npmjs.org/pino-pretty) | 13.1.3 | 13.1.3 | current |
| [prettier](https://registry.npmjs.org/prettier) | 3.9.6 | 3.9.8 | update available |
| [react](https://registry.npmjs.org/react) | 19.3.0 | 19.3.0 | current |
| [react-day-picker](https://registry.npmjs.org/react-day-picker) | 9.14.0 | 10.0.1 | update available |
| [react-dom](https://registry.npmjs.org/react-dom) | 19.3.0 | 19.3.0 | current |
| [react-hook-form](https://registry.npmjs.org/react-hook-form) | 7.87.0 | 7.88.0 | update available |
| [react-icons](https://registry.npmjs.org/react-icons) | 5.7.0 | 5.7.0 | current |
| [react-resizable-panels](https://registry.npmjs.org/react-resizable-panels) | 2.1.9 | 4.12.4 | update available |
| [recharts](https://registry.npmjs.org/recharts) | 2.15.4 | 3.10.1 | update available |
| [sonner](https://registry.npmjs.org/sonner) | 2.0.8 | 2.0.8 | current |
| [tailwind-merge](https://registry.npmjs.org/tailwind-merge) | 3.6.0 | 3.7.0 | update available |
| [tailwindcss](https://registry.npmjs.org/tailwindcss) | 4.3.3 | 4.3.3 | current |
| [tailwindcss-animate](https://registry.npmjs.org/tailwindcss-animate) | 1.0.7 | 1.0.7 | current |
| [thread-stream](https://registry.npmjs.org/thread-stream) | 3.2.0 | 4.2.0 | update available |
| [tsx](https://registry.npmjs.org/tsx) | 4.23.13 | 4.23.13 | current |
| [tw-animate-css](https://registry.npmjs.org/tw-animate-css) | 1.4.0 | 1.4.0 | current |
| [typescript](https://registry.npmjs.org/typescript) | 5.9.3 | 7.0.2 | update available |
| [vaul](https://registry.npmjs.org/vaul) | 1.1.2 | 1.1.2 | current |
| [vite](https://registry.npmjs.org/vite) | 7.3.6 | 8.3.0 | update available |
| [wouter](https://registry.npmjs.org/wouter) | 3.11.0 | 3.11.1 | update available |
| [zod](https://registry.npmjs.org/zod) | 3.25.76 | 4.6.5 | update available |

## Transitive lockfile dependencies

| Technology | In-place version / selector | Latest stable / reference | Status |
| --- | --- | --- | --- |
| [@babel/code-frame](https://registry.npmjs.org/@babel%2Fcode-frame) | 7.29.7 | 8.0.6 | update available |
| [@babel/compat-data](https://registry.npmjs.org/@babel%2Fcompat-data) | 7.29.7 | 8.0.5 | update available |
| [@babel/core](https://registry.npmjs.org/@babel%2Fcore) | 7.29.7 | 8.0.6 | update available |
| [@babel/generator](https://registry.npmjs.org/@babel%2Fgenerator) | 7.29.7 | 8.0.6 | update available |
| [@babel/helper-compilation-targets](https://registry.npmjs.org/@babel%2Fhelper-compilation-targets) | 7.29.7 | 8.0.6 | update available |
| [@babel/helper-globals](https://registry.npmjs.org/@babel%2Fhelper-globals) | 7.29.7 | 8.0.6 | update available |
| [@babel/helper-module-imports](https://registry.npmjs.org/@babel%2Fhelper-module-imports) | 7.29.7 | 8.0.0 | update available |
| [@babel/helper-module-transforms](https://registry.npmjs.org/@babel%2Fhelper-module-transforms) | 7.29.7 | 8.0.6 | update available |
| [@babel/helper-plugin-utils](https://registry.npmjs.org/@babel%2Fhelper-plugin-utils) | 7.29.7 | 8.0.1 | update available |
| [@babel/helper-string-parser](https://registry.npmjs.org/@babel%2Fhelper-string-parser) | 7.29.7 | 8.0.6 | update available |
| [@babel/helper-validator-identifier](https://registry.npmjs.org/@babel%2Fhelper-validator-identifier) | 7.29.7 | 8.0.6 | update available |
| [@babel/helper-validator-option](https://registry.npmjs.org/@babel%2Fhelper-validator-option) | 7.29.7 | 8.0.0 | update available |
| [@babel/helpers](https://registry.npmjs.org/@babel%2Fhelpers) | 7.29.7 | 8.0.5 | update available |
| [@babel/parser](https://registry.npmjs.org/@babel%2Fparser) | 7.29.7 | 8.0.6 | update available |
| [@babel/plugin-transform-react-jsx-self](https://registry.npmjs.org/@babel%2Fplugin-transform-react-jsx-self) | 7.29.7 | 7.29.7 | current |
| [@babel/plugin-transform-react-jsx-source](https://registry.npmjs.org/@babel%2Fplugin-transform-react-jsx-source) | 7.29.7 | 7.29.7 | current |
| [@babel/runtime](https://registry.npmjs.org/@babel%2Fruntime) | 7.29.7 | 8.0.5 | update available |
| [@babel/template](https://registry.npmjs.org/@babel%2Ftemplate) | 7.29.7 | 8.0.0 | update available |
| [@babel/traverse](https://registry.npmjs.org/@babel%2Ftraverse) | 7.29.7 | 8.0.6 | update available |
| [@babel/types](https://registry.npmjs.org/@babel%2Ftypes) | 7.29.7 | 8.0.6 | update available |
| [@commander-js/extra-typings](https://registry.npmjs.org/@commander-js%2Fextra-typings) | 15.0.0 | 15.0.0 | current |
| [@date-fns/tz](https://registry.npmjs.org/@date-fns%2Ftz) | 1.5.0 | 1.5.0 | current |
| [@drizzle-team/brocli](https://registry.npmjs.org/@drizzle-team%2Fbrocli) | 0.10.2 | 0.12.1 | update available |
| [@esbuild/darwin-arm64](https://registry.npmjs.org/@esbuild%2Fdarwin-arm64) | 0.27.3 | 0.28.2 | update available |
| [@esbuild/darwin-x64](https://registry.npmjs.org/@esbuild%2Fdarwin-x64) | 0.27.3 | 0.28.2 | update available |
| [@esbuild/linux-x64](https://registry.npmjs.org/@esbuild%2Flinux-x64) | 0.27.3 | 0.28.2 | update available |
| [@floating-ui/core](https://registry.npmjs.org/@floating-ui%2Fcore) | 1.8.0 | 1.8.0 | current |
| [@floating-ui/dom](https://registry.npmjs.org/@floating-ui%2Fdom) | 1.8.0 | 1.8.0 | current |
| [@floating-ui/react-dom](https://registry.npmjs.org/@floating-ui%2Freact-dom) | 2.1.9 | 2.1.9 | current |
| [@floating-ui/utils](https://registry.npmjs.org/@floating-ui%2Futils) | 0.2.12 | 0.2.12 | current |
| [@gerrit0/mini-shiki](https://registry.npmjs.org/@gerrit0%2Fmini-shiki) | 3.23.0 | 3.23.0 | current |
| [@jridgewell/gen-mapping](https://registry.npmjs.org/@jridgewell%2Fgen-mapping) | 0.3.13 | 0.3.13 | current |
| [@jridgewell/remapping](https://registry.npmjs.org/@jridgewell%2Fremapping) | 2.3.5 | 2.3.5 | current |
| [@jridgewell/resolve-uri](https://registry.npmjs.org/@jridgewell%2Fresolve-uri) | 3.1.2 | 3.1.2 | current |
| [@jridgewell/sourcemap-codec](https://registry.npmjs.org/@jridgewell%2Fsourcemap-codec) | 1.5.5 | 1.6.0 | update available |
| [@jridgewell/trace-mapping](https://registry.npmjs.org/@jridgewell%2Ftrace-mapping) | 0.3.31 | 0.3.31 | current |
| [@nodelib/fs.scandir](https://registry.npmjs.org/@nodelib%2Ffs.scandir) | 2.1.5 | 4.0.1 | update available |
| [@nodelib/fs.stat](https://registry.npmjs.org/@nodelib%2Ffs.stat) | 2.0.5 | 4.0.0 | update available |
| [@nodelib/fs.walk](https://registry.npmjs.org/@nodelib%2Ffs.walk) | 1.2.8 | 3.0.1 | update available |
| [@orval/angular](https://registry.npmjs.org/@orval%2Fangular) | 8.31.0 | 8.34.0 | update available |
| [@orval/axios](https://registry.npmjs.org/@orval%2Faxios) | 8.31.0 | 8.34.0 | update available |
| [@orval/core](https://registry.npmjs.org/@orval%2Fcore) | 8.31.0 | 8.34.0 | update available |
| [@orval/effect](https://registry.npmjs.org/@orval%2Feffect) | 8.31.0 | 8.34.0 | update available |
| [@orval/fetch](https://registry.npmjs.org/@orval%2Ffetch) | 8.31.0 | 8.34.0 | update available |
| [@orval/hono](https://registry.npmjs.org/@orval%2Fhono) | 8.31.0 | 8.34.0 | update available |
| [@orval/mcp](https://registry.npmjs.org/@orval%2Fmcp) | 8.31.0 | 8.34.0 | update available |
| [@orval/mock](https://registry.npmjs.org/@orval%2Fmock) | 8.31.0 | 8.34.0 | update available |
| [@orval/query](https://registry.npmjs.org/@orval%2Fquery) | 8.31.0 | 8.34.0 | update available |
| [@orval/solid-start](https://registry.npmjs.org/@orval%2Fsolid-start) | 8.31.0 | 8.34.0 | update available |
| [@orval/swr](https://registry.npmjs.org/@orval%2Fswr) | 8.31.0 | 8.34.0 | update available |
| [@orval/zod](https://registry.npmjs.org/@orval%2Fzod) | 8.31.0 | 8.34.0 | update available |
| [@pinojs/redact](https://registry.npmjs.org/@pinojs%2Fredact) | 0.4.0 | 0.4.0 | current |
| [@radix-ui/number](https://registry.npmjs.org/@radix-ui%2Fnumber) | 1.1.3 | 1.1.3 | current |
| [@radix-ui/primitive](https://registry.npmjs.org/@radix-ui%2Fprimitive) | 1.1.7 | 1.1.7 | current |
| [@radix-ui/react-arrow](https://registry.npmjs.org/@radix-ui%2Freact-arrow) | 1.1.15 | 1.1.15 | current |
| [@radix-ui/react-collection](https://registry.npmjs.org/@radix-ui%2Freact-collection) | 1.1.15 | 1.1.15 | current |
| [@radix-ui/react-compose-refs](https://registry.npmjs.org/@radix-ui%2Freact-compose-refs) | 1.1.3, 1.1.5 | 1.1.5 | update available |
| [@radix-ui/react-context](https://registry.npmjs.org/@radix-ui%2Freact-context) | 1.2.2 | 1.2.2 | current |
| [@radix-ui/react-direction](https://registry.npmjs.org/@radix-ui%2Freact-direction) | 1.1.4 | 1.1.4 | current |
| [@radix-ui/react-dismissable-layer](https://registry.npmjs.org/@radix-ui%2Freact-dismissable-layer) | 1.1.19 | 1.1.19 | current |
| [@radix-ui/react-focus-guards](https://registry.npmjs.org/@radix-ui%2Freact-focus-guards) | 1.1.6 | 1.1.6 | current |
| [@radix-ui/react-focus-scope](https://registry.npmjs.org/@radix-ui%2Freact-focus-scope) | 1.1.16 | 1.1.16 | current |
| [@radix-ui/react-id](https://registry.npmjs.org/@radix-ui%2Freact-id) | 1.1.2, 1.1.4 | 1.1.4 | update available |
| [@radix-ui/react-menu](https://registry.npmjs.org/@radix-ui%2Freact-menu) | 2.1.24 | 2.1.24 | current |
| [@radix-ui/react-popper](https://registry.npmjs.org/@radix-ui%2Freact-popper) | 1.3.7 | 1.3.7 | current |
| [@radix-ui/react-portal](https://registry.npmjs.org/@radix-ui%2Freact-portal) | 1.1.17 | 1.1.17 | current |
| [@radix-ui/react-presence](https://registry.npmjs.org/@radix-ui%2Freact-presence) | 1.1.10 | 1.1.10 | current |
| [@radix-ui/react-primitive](https://registry.npmjs.org/@radix-ui%2Freact-primitive) | 2.1.10, 2.1.6 | 2.1.10 | update available |
| [@radix-ui/react-roving-focus](https://registry.npmjs.org/@radix-ui%2Freact-roving-focus) | 1.1.19 | 1.1.19 | current |
| [@radix-ui/react-use-callback-ref](https://registry.npmjs.org/@radix-ui%2Freact-use-callback-ref) | 1.1.4 | 1.1.4 | current |
| [@radix-ui/react-use-controllable-state](https://registry.npmjs.org/@radix-ui%2Freact-use-controllable-state) | 1.2.6 | 1.2.6 | current |
| [@radix-ui/react-use-effect-event](https://registry.npmjs.org/@radix-ui%2Freact-use-effect-event) | 0.0.5 | 0.0.5 | current |
| [@radix-ui/react-use-is-hydrated](https://registry.npmjs.org/@radix-ui%2Freact-use-is-hydrated) | 0.1.3 | 0.1.3 | current |
| [@radix-ui/react-use-layout-effect](https://registry.npmjs.org/@radix-ui%2Freact-use-layout-effect) | 1.1.2, 1.1.4 | 1.1.4 | update available |
| [@radix-ui/react-use-previous](https://registry.npmjs.org/@radix-ui%2Freact-use-previous) | 1.1.4 | 1.1.4 | current |
| [@radix-ui/react-use-rect](https://registry.npmjs.org/@radix-ui%2Freact-use-rect) | 1.1.4 | 1.1.4 | current |
| [@radix-ui/react-use-size](https://registry.npmjs.org/@radix-ui%2Freact-use-size) | 1.1.4 | 1.1.4 | current |
| [@radix-ui/react-visually-hidden](https://registry.npmjs.org/@radix-ui%2Freact-visually-hidden) | 1.2.11 | 1.2.11 | current |
| [@radix-ui/rect](https://registry.npmjs.org/@radix-ui%2Frect) | 1.1.3 | 1.1.3 | current |
| [@rolldown/pluginutils](https://registry.npmjs.org/@rolldown%2Fpluginutils) | 1.0.0-rc.3 | 1.0.1 | manual review |
| [@rollup/rollup-darwin-arm64](https://registry.npmjs.org/@rollup%2Frollup-darwin-arm64) | 4.62.2 | 4.63.3 | update available |
| [@rollup/rollup-darwin-x64](https://registry.npmjs.org/@rollup%2Frollup-darwin-x64) | 4.62.2 | 4.63.3 | update available |
| [@rollup/rollup-linux-x64-gnu](https://registry.npmjs.org/@rollup%2Frollup-linux-x64-gnu) | 4.62.2 | 4.63.3 | update available |
| [@scalar/helpers](https://registry.npmjs.org/@scalar%2Fhelpers) | 0.10.0, 0.11.1 | 0.12.0 | update available |
| [@scalar/json-magic](https://registry.npmjs.org/@scalar%2Fjson-magic) | 0.12.20, 0.13.2 | 0.14.0 | update available |
| [@scalar/openapi-parser](https://registry.npmjs.org/@scalar%2Fopenapi-parser) | 0.28.16 | 0.29.3 | update available |
| [@scalar/openapi-types](https://registry.npmjs.org/@scalar%2Fopenapi-types) | 0.9.4, 0.9.5 | 0.9.6 | update available |
| [@scalar/openapi-upgrader](https://registry.npmjs.org/@scalar%2Fopenapi-upgrader) | 0.2.15 | 0.2.17 | update available |
| [@sec-ant/readable-stream](https://registry.npmjs.org/@sec-ant%2Freadable-stream) | 0.4.1 | 0.7.0 | update available |
| [@shikijs/engine-oniguruma](https://registry.npmjs.org/@shikijs%2Fengine-oniguruma) | 3.23.0 | 4.4.3 | update available |
| [@shikijs/langs](https://registry.npmjs.org/@shikijs%2Flangs) | 3.23.0 | 4.4.3 | update available |
| [@shikijs/themes](https://registry.npmjs.org/@shikijs%2Fthemes) | 3.23.0 | 4.4.3 | update available |
| [@shikijs/types](https://registry.npmjs.org/@shikijs%2Ftypes) | 3.23.0 | 4.4.3 | update available |
| [@shikijs/vscode-textmate](https://registry.npmjs.org/@shikijs%2Fvscode-textmate) | 10.0.2 | 10.0.2 | current |
| [@sindresorhus/merge-streams](https://registry.npmjs.org/@sindresorhus%2Fmerge-streams) | 4.0.0 | 4.0.0 | current |
| [@tabby_ai/hijri-converter](https://registry.npmjs.org/@tabby_ai%2Fhijri-converter) | 1.0.5 | 1.0.5 | current |
| [@tailwindcss/node](https://registry.npmjs.org/@tailwindcss%2Fnode) | 4.3.3 | 4.3.3 | current |
| [@tailwindcss/oxide](https://registry.npmjs.org/@tailwindcss%2Foxide) | 4.3.3 | 4.3.3 | current |
| [@tailwindcss/oxide-darwin-arm64](https://registry.npmjs.org/@tailwindcss%2Foxide-darwin-arm64) | 4.3.3 | 4.3.3 | current |
| [@tailwindcss/oxide-darwin-x64](https://registry.npmjs.org/@tailwindcss%2Foxide-darwin-x64) | 4.3.3 | 4.3.3 | current |
| [@tailwindcss/oxide-linux-x64-gnu](https://registry.npmjs.org/@tailwindcss%2Foxide-linux-x64-gnu) | 4.3.3 | 4.3.3 | current |
| [@tailwindcss/oxide-wasm32-wasi](https://registry.npmjs.org/@tailwindcss%2Foxide-wasm32-wasi) | 4.3.3 | 4.3.3 | current |
| [@tanstack/query-core](https://registry.npmjs.org/@tanstack%2Fquery-core) | 5.102.8 | 5.103.1 | update available |
| [@types/babel__core](https://registry.npmjs.org/@types%2Fbabel__core) | 7.20.5 | 7.20.5 | current |
| [@types/babel__generator](https://registry.npmjs.org/@types%2Fbabel__generator) | 7.27.0 | 7.27.0 | current |
| [@types/babel__template](https://registry.npmjs.org/@types%2Fbabel__template) | 7.4.4 | 7.4.4 | current |
| [@types/babel__traverse](https://registry.npmjs.org/@types%2Fbabel__traverse) | 7.28.0 | 7.28.0 | current |
| [@types/body-parser](https://registry.npmjs.org/@types%2Fbody-parser) | 1.19.6 | 1.19.6 | current |
| [@types/connect](https://registry.npmjs.org/@types%2Fconnect) | 3.4.38 | 3.4.38 | current |
| [@types/d3-array](https://registry.npmjs.org/@types%2Fd3-array) | 3.2.2 | 3.2.2 | current |
| [@types/d3-color](https://registry.npmjs.org/@types%2Fd3-color) | 3.1.3 | 3.1.3 | current |
| [@types/d3-ease](https://registry.npmjs.org/@types%2Fd3-ease) | 3.0.2 | 3.0.2 | current |
| [@types/d3-interpolate](https://registry.npmjs.org/@types%2Fd3-interpolate) | 3.0.4 | 3.0.4 | current |
| [@types/d3-path](https://registry.npmjs.org/@types%2Fd3-path) | 3.1.1 | 3.1.1 | current |
| [@types/d3-scale](https://registry.npmjs.org/@types%2Fd3-scale) | 4.0.9 | 4.0.9 | current |
| [@types/d3-shape](https://registry.npmjs.org/@types%2Fd3-shape) | 3.1.8 | 3.2.0 | update available |
| [@types/d3-time](https://registry.npmjs.org/@types%2Fd3-time) | 3.0.4 | 3.0.4 | current |
| [@types/d3-timer](https://registry.npmjs.org/@types%2Fd3-timer) | 3.0.2 | 3.0.2 | current |
| [@types/estree](https://registry.npmjs.org/@types%2Festree) | 1.0.9 | 1.0.9 | current |
| [@types/express-serve-static-core](https://registry.npmjs.org/@types%2Fexpress-serve-static-core) | 5.1.1 | 5.1.3 | update available |
| [@types/hast](https://registry.npmjs.org/@types%2Fhast) | 3.0.5 | 3.0.5 | current |
| [@types/http-errors](https://registry.npmjs.org/@types%2Fhttp-errors) | 2.0.5 | 2.0.5 | current |
| [@types/qs](https://registry.npmjs.org/@types%2Fqs) | 6.15.1 | 6.15.1 | current |
| [@types/range-parser](https://registry.npmjs.org/@types%2Frange-parser) | 1.2.7 | 1.2.7 | current |
| [@types/send](https://registry.npmjs.org/@types%2Fsend) | 1.2.1 | 1.2.1 | current |
| [@types/serve-static](https://registry.npmjs.org/@types%2Fserve-static) | 2.2.0 | 2.2.0 | current |
| [@types/unist](https://registry.npmjs.org/@types%2Funist) | 3.0.3 | 3.0.3 | current |
| [accepts](https://registry.npmjs.org/accepts) | 2.0.0 | 2.0.0 | current |
| [acorn](https://registry.npmjs.org/acorn) | 8.18.0 | 8.18.0 | current |
| [ajv](https://registry.npmjs.org/ajv) | 8.20.0 | 8.20.0 | current |
| [ajv-draft-04](https://registry.npmjs.org/ajv-draft-04) | 1.0.0 | 1.0.0 | current |
| [ajv-formats](https://registry.npmjs.org/ajv-formats) | 3.0.1 | 3.0.1 | current |
| [argparse](https://registry.npmjs.org/argparse) | 2.0.1 | 3.0.2 | update available |
| [aria-hidden](https://registry.npmjs.org/aria-hidden) | 1.2.6 | 1.2.6 | current |
| [atomic-sleep](https://registry.npmjs.org/atomic-sleep) | 1.0.0 | 1.0.0 | current |
| [balanced-match](https://registry.npmjs.org/balanced-match) | 4.0.4 | 4.0.4 | current |
| [baseline-browser-mapping](https://registry.npmjs.org/baseline-browser-mapping) | 2.10.38 | 2.11.25 | update available |
| [body-parser](https://registry.npmjs.org/body-parser) | 2.3.0 | 2.3.0 | current |
| [brace-expansion](https://registry.npmjs.org/brace-expansion) | 5.0.9 | 5.0.12 | update available |
| [braces](https://registry.npmjs.org/braces) | 3.0.3 | 3.0.3 | current |
| [browserslist](https://registry.npmjs.org/browserslist) | 4.28.2 | 4.29.0 | update available |
| [bytes](https://registry.npmjs.org/bytes) | 3.1.2 | 3.1.2 | current |
| [call-bind-apply-helpers](https://registry.npmjs.org/call-bind-apply-helpers) | 1.0.2 | 1.0.2 | current |
| [call-bound](https://registry.npmjs.org/call-bound) | 1.0.4 | 1.0.4 | current |
| [caniuse-lite](https://registry.npmjs.org/caniuse-lite) | 1.0.30001799 | 1.0.30001810 | update available |
| [colorette](https://registry.npmjs.org/colorette) | 2.0.20 | 2.0.20 | current |
| [commander](https://registry.npmjs.org/commander) | 15.0.0 | 15.0.0 | current |
| [compare-versions](https://registry.npmjs.org/compare-versions) | 6.1.1 | 6.1.1 | current |
| [content-disposition](https://registry.npmjs.org/content-disposition) | 1.1.0 | 3.0.0 | update available |
| [content-type](https://registry.npmjs.org/content-type) | 1.0.5, 2.0.0 | 3.1.1 | update available |
| [convert-source-map](https://registry.npmjs.org/convert-source-map) | 2.0.0 | 2.0.0 | current |
| [cookie](https://registry.npmjs.org/cookie) | 0.7.2 | 2.0.1 | update available |
| [cookie-signature](https://registry.npmjs.org/cookie-signature) | 1.0.6, 1.2.2 | 1.2.2 | update available |
| [cross-spawn](https://registry.npmjs.org/cross-spawn) | 7.0.6 | 7.0.6 | current |
| [cssesc](https://registry.npmjs.org/cssesc) | 3.0.0 | 3.0.0 | current |
| [csstype](https://registry.npmjs.org/csstype) | 3.2.3 | 3.2.3 | current |
| [d3-array](https://registry.npmjs.org/d3-array) | 3.2.4 | 3.2.4 | current |
| [d3-color](https://registry.npmjs.org/d3-color) | 3.1.0 | 3.1.0 | current |
| [d3-ease](https://registry.npmjs.org/d3-ease) | 3.0.1 | 3.0.1 | current |
| [d3-format](https://registry.npmjs.org/d3-format) | 3.1.2 | 3.1.2 | current |
| [d3-interpolate](https://registry.npmjs.org/d3-interpolate) | 3.0.1 | 3.0.1 | current |
| [d3-path](https://registry.npmjs.org/d3-path) | 3.1.0 | 3.1.0 | current |
| [d3-scale](https://registry.npmjs.org/d3-scale) | 4.0.2 | 4.0.2 | current |
| [d3-shape](https://registry.npmjs.org/d3-shape) | 3.2.0 | 3.2.0 | current |
| [d3-time](https://registry.npmjs.org/d3-time) | 3.1.0 | 3.1.0 | current |
| [d3-time-format](https://registry.npmjs.org/d3-time-format) | 4.1.0 | 4.1.0 | current |
| [d3-timer](https://registry.npmjs.org/d3-timer) | 3.0.1 | 3.0.1 | current |
| [date-fns-jalali](https://registry.npmjs.org/date-fns-jalali) | 4.1.0-0 | No stable release published | upstream prerelease only |
| [dateformat](https://registry.npmjs.org/dateformat) | 4.6.3 | 5.0.3 | update available |
| [debug](https://registry.npmjs.org/debug) | 4.4.3 | 4.4.3 | current |
| [decimal.js-light](https://registry.npmjs.org/decimal.js-light) | 2.5.1 | 2.5.1 | current |
| [depd](https://registry.npmjs.org/depd) | 2.0.0 | 2.0.0 | current |
| [detect-libc](https://registry.npmjs.org/detect-libc) | 2.1.2 | 2.1.2 | current |
| [detect-node-es](https://registry.npmjs.org/detect-node-es) | 1.1.0 | 1.1.0 | current |
| [dom-helpers](https://registry.npmjs.org/dom-helpers) | 5.2.1 | 6.0.1 | update available |
| [dunder-proto](https://registry.npmjs.org/dunder-proto) | 1.0.1 | 1.0.1 | current |
| [ee-first](https://registry.npmjs.org/ee-first) | 1.1.1 | 1.1.1 | current |
| [electron-to-chromium](https://registry.npmjs.org/electron-to-chromium) | 1.5.376 | 1.5.433 | update available |
| [embla-carousel](https://registry.npmjs.org/embla-carousel) | 8.6.0 | 8.6.0 | current |
| [embla-carousel-reactive-utils](https://registry.npmjs.org/embla-carousel-reactive-utils) | 8.6.0 | 8.6.0 | current |
| [encodeurl](https://registry.npmjs.org/encodeurl) | 2.0.0 | 2.0.0 | current |
| [end-of-stream](https://registry.npmjs.org/end-of-stream) | 1.4.5 | 1.4.5 | current |
| [enhanced-resolve](https://registry.npmjs.org/enhanced-resolve) | 5.24.5 | 5.25.1 | update available |
| [entities](https://registry.npmjs.org/entities) | 4.5.0 | 8.1.0 | update available |
| [es-define-property](https://registry.npmjs.org/es-define-property) | 1.0.1 | 1.0.1 | current |
| [es-errors](https://registry.npmjs.org/es-errors) | 1.3.0 | 1.3.0 | current |
| [es-object-atoms](https://registry.npmjs.org/es-object-atoms) | 1.1.2 | 1.1.2 | current |
| [escalade](https://registry.npmjs.org/escalade) | 3.2.0 | 3.2.0 | current |
| [escape-html](https://registry.npmjs.org/escape-html) | 1.0.3 | 1.0.3 | current |
| [esutils](https://registry.npmjs.org/esutils) | 2.0.3 | 2.0.3 | current |
| [etag](https://registry.npmjs.org/etag) | 1.8.1 | 1.8.1 | current |
| [eventemitter3](https://registry.npmjs.org/eventemitter3) | 4.0.7 | 5.0.4 | update available |
| [execa](https://registry.npmjs.org/execa) | 9.6.1 | 10.0.1 | update available |
| [fast-copy](https://registry.npmjs.org/fast-copy) | 4.0.3 | 4.1.1 | update available |
| [fast-deep-equal](https://registry.npmjs.org/fast-deep-equal) | 3.1.3 | 3.1.3 | current |
| [fast-equals](https://registry.npmjs.org/fast-equals) | 5.4.0 | 6.0.3 | update available |
| [fast-safe-stringify](https://registry.npmjs.org/fast-safe-stringify) | 2.1.1 | 2.1.1 | current |
| [fast-uri](https://registry.npmjs.org/fast-uri) | 3.1.7 | 4.2.1 | update available |
| [fastq](https://registry.npmjs.org/fastq) | 1.20.1 | 1.20.3 | update available |
| [fdir](https://registry.npmjs.org/fdir) | 6.5.0 | 6.5.0 | current |
| [figures](https://registry.npmjs.org/figures) | 6.1.0 | 6.1.0 | current |
| [fill-range](https://registry.npmjs.org/fill-range) | 7.1.1 | 7.1.1 | current |
| [finalhandler](https://registry.npmjs.org/finalhandler) | 2.1.1 | 2.1.1 | current |
| [find-up](https://registry.npmjs.org/find-up) | 8.0.0 | 8.0.0 | current |
| [forwarded](https://registry.npmjs.org/forwarded) | 0.2.0 | 0.2.0 | current |
| [fresh](https://registry.npmjs.org/fresh) | 2.0.0 | 2.0.0 | current |
| [fs-extra](https://registry.npmjs.org/fs-extra) | 11.4.0 | 11.4.0 | current |
| [fsevents](https://registry.npmjs.org/fsevents) | 2.3.3 | 2.3.3 | current |
| [function-bind](https://registry.npmjs.org/function-bind) | 1.1.2 | 1.1.2 | current |
| [gensync](https://registry.npmjs.org/gensync) | 1.0.0-beta.2 | 0.1.0 | manual review |
| [get-caller-file](https://registry.npmjs.org/get-caller-file) | 2.0.5 | 2.0.5 | current |
| [get-intrinsic](https://registry.npmjs.org/get-intrinsic) | 1.3.0 | 1.3.1 | update available |
| [get-nonce](https://registry.npmjs.org/get-nonce) | 1.0.1 | 1.0.1 | current |
| [get-proto](https://registry.npmjs.org/get-proto) | 1.0.1 | 1.0.1 | current |
| [get-stream](https://registry.npmjs.org/get-stream) | 9.0.1 | 9.0.1 | current |
| [get-tsconfig](https://registry.npmjs.org/get-tsconfig) | 4.14.3 | 4.14.3 | current |
| [glob-parent](https://registry.npmjs.org/glob-parent) | 5.1.2 | 6.0.2 | update available |
| [gopd](https://registry.npmjs.org/gopd) | 1.2.0 | 1.2.0 | current |
| [graceful-fs](https://registry.npmjs.org/graceful-fs) | 4.2.11 | 4.2.11 | current |
| [has-symbols](https://registry.npmjs.org/has-symbols) | 1.1.0 | 1.1.0 | current |
| [hasown](https://registry.npmjs.org/hasown) | 2.0.4 | 2.0.4 | current |
| [help-me](https://registry.npmjs.org/help-me) | 5.0.0 | 5.0.0 | current |
| [http-errors](https://registry.npmjs.org/http-errors) | 2.0.1 | 2.0.1 | current |
| [human-signals](https://registry.npmjs.org/human-signals) | 8.0.1 | 8.0.1 | current |
| [iconv-lite](https://registry.npmjs.org/iconv-lite) | 0.7.2 | 0.7.3 | update available |
| [inherits](https://registry.npmjs.org/inherits) | 2.0.4 | 2.0.4 | current |
| [internmap](https://registry.npmjs.org/internmap) | 2.0.3 | 2.0.3 | current |
| [ipaddr.js](https://registry.npmjs.org/ipaddr.js) | 1.9.1 | 2.5.0 | update available |
| [is-extglob](https://registry.npmjs.org/is-extglob) | 2.1.1 | 2.1.1 | current |
| [is-glob](https://registry.npmjs.org/is-glob) | 4.0.3 | 4.0.3 | current |
| [is-number](https://registry.npmjs.org/is-number) | 7.0.0 | 7.0.0 | current |
| [is-plain-obj](https://registry.npmjs.org/is-plain-obj) | 4.1.0 | 4.1.0 | current |
| [is-promise](https://registry.npmjs.org/is-promise) | 4.0.0 | 4.0.0 | current |
| [is-stream](https://registry.npmjs.org/is-stream) | 4.0.1 | 4.0.1 | current |
| [is-unicode-supported](https://registry.npmjs.org/is-unicode-supported) | 2.1.0 | 2.1.0 | current |
| [isexe](https://registry.npmjs.org/isexe) | 2.0.0 | 4.0.0 | update available |
| [jiti](https://registry.npmjs.org/jiti) | 2.7.0 | 2.7.0 | current |
| [joycon](https://registry.npmjs.org/joycon) | 3.1.1 | 3.1.1 | current |
| [js-tokens](https://registry.npmjs.org/js-tokens) | 4.0.0 | 10.0.0 | update available |
| [js-yaml](https://registry.npmjs.org/js-yaml) | 4.3.2 | 5.4.2 | update available |
| [jsesc](https://registry.npmjs.org/jsesc) | 3.1.0 | 3.1.0 | current |
| [json-schema-traverse](https://registry.npmjs.org/json-schema-traverse) | 1.0.0 | 1.0.0 | current |
| [json5](https://registry.npmjs.org/json5) | 2.2.3 | 2.2.3 | current |
| [jsonfile](https://registry.npmjs.org/jsonfile) | 6.2.1 | 6.2.1 | current |
| [jsonpointer](https://registry.npmjs.org/jsonpointer) | 5.0.1 | 5.0.1 | current |
| [leven](https://registry.npmjs.org/leven) | 4.1.0 | 4.1.0 | current |
| [lightningcss](https://registry.npmjs.org/lightningcss) | 1.32.0 | 1.33.0 | update available |
| [lightningcss-darwin-arm64](https://registry.npmjs.org/lightningcss-darwin-arm64) | 1.32.0 | 1.33.0 | update available |
| [lightningcss-darwin-x64](https://registry.npmjs.org/lightningcss-darwin-x64) | 1.32.0 | 1.33.0 | update available |
| [lightningcss-linux-x64-gnu](https://registry.npmjs.org/lightningcss-linux-x64-gnu) | 1.32.0 | 1.33.0 | update available |
| [linkify-it](https://registry.npmjs.org/linkify-it) | 5.0.2 | 6.1.0 | update available |
| [locate-path](https://registry.npmjs.org/locate-path) | 8.0.0 | 8.0.0 | current |
| [lodash](https://registry.npmjs.org/lodash) | 4.18.1 | 4.18.1 | current |
| [loose-envify](https://registry.npmjs.org/loose-envify) | 1.4.0 | 1.4.0 | current |
| [lru-cache](https://registry.npmjs.org/lru-cache) | 5.1.1 | 11.5.3 | update available |
| [lunr](https://registry.npmjs.org/lunr) | 2.3.9 | 2.3.9 | current |
| [magic-string](https://registry.npmjs.org/magic-string) | 0.30.21 | 1.4.1 | update available |
| [math-intrinsics](https://registry.npmjs.org/math-intrinsics) | 1.1.0 | 1.1.0 | current |
| [mdurl](https://registry.npmjs.org/mdurl) | 2.1.0 | 2.1.0 | current |
| [media-typer](https://registry.npmjs.org/media-typer) | 1.1.0 | 2.0.0 | update available |
| [merge-descriptors](https://registry.npmjs.org/merge-descriptors) | 2.0.0 | 2.0.0 | current |
| [merge2](https://registry.npmjs.org/merge2) | 1.4.1 | 1.4.1 | current |
| [micromatch](https://registry.npmjs.org/micromatch) | 4.0.8 | 4.0.8 | current |
| [mime-db](https://registry.npmjs.org/mime-db) | 1.54.0 | 1.54.0 | current |
| [mime-types](https://registry.npmjs.org/mime-types) | 3.0.2 | 3.0.2 | current |
| [minimatch](https://registry.npmjs.org/minimatch) | 10.2.6 | 10.2.6 | current |
| [minimist](https://registry.npmjs.org/minimist) | 1.2.8 | 1.2.8 | current |
| [modern-screenshot](https://registry.npmjs.org/modern-screenshot) | 4.7.0 | 4.7.0 | current |
| [motion-dom](https://registry.npmjs.org/motion-dom) | 12.43.0 | 13.3.0 | update available |
| [motion-utils](https://registry.npmjs.org/motion-utils) | 12.39.0 | 13.3.0 | update available |
| [ms](https://registry.npmjs.org/ms) | 2.1.3 | 2.1.3 | current |
| [nanoid](https://registry.npmjs.org/nanoid) | 3.3.14 | 6.0.1 | update available |
| [negotiator](https://registry.npmjs.org/negotiator) | 1.0.0 | 1.1.0 | update available |
| [node-releases](https://registry.npmjs.org/node-releases) | 2.0.48 | 2.0.56 | update available |
| [npm-run-path](https://registry.npmjs.org/npm-run-path) | 6.0.0 | 6.0.0 | current |
| [object-assign](https://registry.npmjs.org/object-assign) | 4.1.1 | 4.1.1 | current |
| [object-inspect](https://registry.npmjs.org/object-inspect) | 1.13.4 | 1.13.4 | current |
| [on-exit-leak-free](https://registry.npmjs.org/on-exit-leak-free) | 2.1.2 | 2.1.2 | current |
| [on-finished](https://registry.npmjs.org/on-finished) | 2.4.1 | 2.4.1 | current |
| [once](https://registry.npmjs.org/once) | 1.4.0 | 1.4.0 | current |
| [p-limit](https://registry.npmjs.org/p-limit) | 4.0.0 | 7.3.3 | update available |
| [p-locate](https://registry.npmjs.org/p-locate) | 6.0.0 | 7.0.0 | update available |
| [parse-ms](https://registry.npmjs.org/parse-ms) | 4.0.0 | 4.0.0 | current |
| [parseurl](https://registry.npmjs.org/parseurl) | 1.3.3 | 1.3.3 | current |
| [path-key](https://registry.npmjs.org/path-key) | 3.1.1, 4.0.0 | 4.0.0 | update available |
| [path-to-regexp](https://registry.npmjs.org/path-to-regexp) | 8.4.2 | 8.4.2 | current |
| [pathe](https://registry.npmjs.org/pathe) | 2.0.3 | 2.0.3 | current |
| [pg-cloudflare](https://registry.npmjs.org/pg-cloudflare) | 1.4.0 | 1.4.0 | current |
| [pg-connection-string](https://registry.npmjs.org/pg-connection-string) | 2.14.0 | 2.14.0 | current |
| [pg-int8](https://registry.npmjs.org/pg-int8) | 1.0.1 | 1.0.1 | current |
| [pg-pool](https://registry.npmjs.org/pg-pool) | 3.14.0 | 3.14.0 | current |
| [pg-protocol](https://registry.npmjs.org/pg-protocol) | 1.16.0 | 1.16.0 | current |
| [pg-types](https://registry.npmjs.org/pg-types) | 2.2.0 | 4.1.0 | update available |
| [pgpass](https://registry.npmjs.org/pgpass) | 1.0.5 | 1.0.6 | update available |
| [picocolors](https://registry.npmjs.org/picocolors) | 1.1.1 | 1.1.1 | current |
| [picomatch](https://registry.npmjs.org/picomatch) | 2.3.2, 4.0.4 | 4.0.7 | update available |
| [pino-abstract-transport](https://registry.npmjs.org/pino-abstract-transport) | 2.0.0, 3.0.0 | 3.0.0 | update available |
| [pino-std-serializers](https://registry.npmjs.org/pino-std-serializers) | 7.1.0 | 7.1.0 | current |
| [playwright](https://registry.npmjs.org/playwright) | 1.63.0 | 1.63.0 | current |
| [playwright-core](https://registry.npmjs.org/playwright-core) | 1.63.0 | 1.63.0 | current |
| [postcss](https://registry.npmjs.org/postcss) | 8.5.15 | 8.5.28 | update available |
| [postcss-selector-parser](https://registry.npmjs.org/postcss-selector-parser) | 6.0.10 | 7.1.6 | update available |
| [postgres-array](https://registry.npmjs.org/postgres-array) | 2.0.0 | 3.0.4 | update available |
| [postgres-bytea](https://registry.npmjs.org/postgres-bytea) | 1.0.1 | 3.0.0 | update available |
| [postgres-date](https://registry.npmjs.org/postgres-date) | 1.0.7 | 2.1.0 | update available |
| [postgres-interval](https://registry.npmjs.org/postgres-interval) | 1.2.0 | 4.1.0 | update available |
| [pretty-ms](https://registry.npmjs.org/pretty-ms) | 9.3.1 | 9.3.1 | current |
| [process-warning](https://registry.npmjs.org/process-warning) | 5.0.0 | 5.1.0 | update available |
| [prop-types](https://registry.npmjs.org/prop-types) | 15.8.1 | 15.8.1 | current |
| [proxy-addr](https://registry.npmjs.org/proxy-addr) | 2.0.7 | 2.0.8 | update available |
| [pump](https://registry.npmjs.org/pump) | 3.0.4 | 3.0.4 | current |
| [punycode.js](https://registry.npmjs.org/punycode.js) | 2.3.1 | 2.3.1 | current |
| [qs](https://registry.npmjs.org/qs) | 6.15.2 | 6.16.0 | update available |
| [queue-microtask](https://registry.npmjs.org/queue-microtask) | 1.2.3 | 1.2.3 | current |
| [quick-format-unescaped](https://registry.npmjs.org/quick-format-unescaped) | 4.0.4 | 4.0.4 | current |
| [range-parser](https://registry.npmjs.org/range-parser) | 1.2.1 | 1.3.0 | update available |
| [raw-body](https://registry.npmjs.org/raw-body) | 3.0.2 | 4.0.0 | update available |
| [react-is](https://registry.npmjs.org/react-is) | 16.13.1, 18.3.1 | 19.3.0 | update available |
| [react-refresh](https://registry.npmjs.org/react-refresh) | 0.18.0 | 0.19.0 | update available |
| [react-remove-scroll](https://registry.npmjs.org/react-remove-scroll) | 2.7.2 | 2.7.2 | current |
| [react-remove-scroll-bar](https://registry.npmjs.org/react-remove-scroll-bar) | 2.3.8 | 2.3.8 | current |
| [react-smooth](https://registry.npmjs.org/react-smooth) | 4.0.4 | 4.0.4 | current |
| [react-style-singleton](https://registry.npmjs.org/react-style-singleton) | 2.2.3 | 2.2.3 | current |
| [react-transition-group](https://registry.npmjs.org/react-transition-group) | 4.4.5 | 4.4.5 | current |
| [readdirp](https://registry.npmjs.org/readdirp) | 4.1.2, 5.1.1 | 5.1.1 | update available |
| [real-require](https://registry.npmjs.org/real-require) | 0.2.0 | 1.0.0 | update available |
| [recharts-scale](https://registry.npmjs.org/recharts-scale) | 0.4.5 | 0.4.5 | current |
| [regexparam](https://registry.npmjs.org/regexparam) | 3.0.0 | 3.0.0 | current |
| [remeda](https://registry.npmjs.org/remeda) | 2.48.0 | 2.50.0 | update available |
| [require-from-string](https://registry.npmjs.org/require-from-string) | 2.0.2 | 2.0.2 | current |
| [resolve-pkg-maps](https://registry.npmjs.org/resolve-pkg-maps) | 1.0.0 | 1.0.0 | current |
| [reusify](https://registry.npmjs.org/reusify) | 1.1.0 | 1.1.0 | current |
| [rollup](https://registry.npmjs.org/rollup) | 4.62.2 | 4.63.3 | update available |
| [router](https://registry.npmjs.org/router) | 2.2.0 | 2.2.0 | current |
| [run-parallel](https://registry.npmjs.org/run-parallel) | 1.2.0 | 1.2.0 | current |
| [safe-stable-stringify](https://registry.npmjs.org/safe-stable-stringify) | 2.5.0 | 2.5.0 | current |
| [safer-buffer](https://registry.npmjs.org/safer-buffer) | 2.1.2 | 2.1.2 | current |
| [scheduler](https://registry.npmjs.org/scheduler) | 0.28.0 | 0.28.0 | current |
| [secure-json-parse](https://registry.npmjs.org/secure-json-parse) | 4.1.0 | 4.1.0 | current |
| [semver](https://registry.npmjs.org/semver) | 6.3.1 | 7.8.5 | update available |
| [send](https://registry.npmjs.org/send) | 1.2.1 | 1.2.1 | current |
| [serve-static](https://registry.npmjs.org/serve-static) | 2.2.1 | 2.2.1 | current |
| [setprototypeof](https://registry.npmjs.org/setprototypeof) | 1.2.0 | 1.2.0 | current |
| [shebang-command](https://registry.npmjs.org/shebang-command) | 2.0.0 | 2.0.0 | current |
| [shebang-regex](https://registry.npmjs.org/shebang-regex) | 3.0.0 | 4.0.0 | update available |
| [side-channel](https://registry.npmjs.org/side-channel) | 1.1.1 | 1.1.1 | current |
| [side-channel-list](https://registry.npmjs.org/side-channel-list) | 1.0.1 | 1.0.1 | current |
| [side-channel-map](https://registry.npmjs.org/side-channel-map) | 1.0.1 | 1.0.1 | current |
| [side-channel-weakmap](https://registry.npmjs.org/side-channel-weakmap) | 1.0.2 | 1.0.2 | current |
| [signal-exit](https://registry.npmjs.org/signal-exit) | 4.1.0 | 4.1.0 | current |
| [sonic-boom](https://registry.npmjs.org/sonic-boom) | 4.2.1 | 5.0.1 | update available |
| [source-map-js](https://registry.npmjs.org/source-map-js) | 1.2.1 | 1.2.1 | current |
| [split2](https://registry.npmjs.org/split2) | 4.2.0 | 4.2.0 | current |
| [statuses](https://registry.npmjs.org/statuses) | 2.0.2 | 2.0.2 | current |
| [string-argv](https://registry.npmjs.org/string-argv) | 0.3.2 | 0.3.2 | current |
| [strip-final-newline](https://registry.npmjs.org/strip-final-newline) | 4.0.0 | 4.0.0 | current |
| [strip-json-comments](https://registry.npmjs.org/strip-json-comments) | 5.0.3 | 5.0.3 | current |
| [tapable](https://registry.npmjs.org/tapable) | 2.3.3 | 2.3.3 | current |
| [tiny-invariant](https://registry.npmjs.org/tiny-invariant) | 1.3.3 | 1.3.3 | current |
| [tinyglobby](https://registry.npmjs.org/tinyglobby) | 0.2.17 | 0.2.17 | current |
| [to-regex-range](https://registry.npmjs.org/to-regex-range) | 5.0.1 | 5.0.1 | current |
| [toidentifier](https://registry.npmjs.org/toidentifier) | 1.0.1 | 1.0.1 | current |
| [tslib](https://registry.npmjs.org/tslib) | 2.8.1 | 2.8.1 | current |
| [type-is](https://registry.npmjs.org/type-is) | 2.1.0 | 2.1.0 | current |
| [typedoc](https://registry.npmjs.org/typedoc) | 0.28.20 | 0.28.20 | current |
| [typedoc-plugin-coverage](https://registry.npmjs.org/typedoc-plugin-coverage) | 4.0.3 | 4.0.3 | current |
| [typedoc-plugin-markdown](https://registry.npmjs.org/typedoc-plugin-markdown) | 4.13.0 | 4.13.1 | update available |
| [uc.micro](https://registry.npmjs.org/uc.micro) | 2.1.0 | 3.0.0 | update available |
| [undici-types](https://registry.npmjs.org/undici-types) | 7.24.6 | 8.10.2 | update available |
| [unicorn-magic](https://registry.npmjs.org/unicorn-magic) | 0.3.0 | 0.4.0 | update available |
| [universalify](https://registry.npmjs.org/universalify) | 2.0.1 | 2.0.1 | current |
| [unpipe](https://registry.npmjs.org/unpipe) | 1.0.0 | 1.0.0 | current |
| [update-browserslist-db](https://registry.npmjs.org/update-browserslist-db) | 1.2.3 | 1.3.3 | update available |
| [use-callback-ref](https://registry.npmjs.org/use-callback-ref) | 1.3.3 | 1.3.3 | current |
| [use-sidecar](https://registry.npmjs.org/use-sidecar) | 1.1.3 | 1.1.3 | current |
| [use-sync-external-store](https://registry.npmjs.org/use-sync-external-store) | 1.7.0 | 1.7.0 | current |
| [util-deprecate](https://registry.npmjs.org/util-deprecate) | 1.0.2 | 1.0.2 | current |
| [vary](https://registry.npmjs.org/vary) | 1.1.2 | 1.1.2 | current |
| [victory-vendor](https://registry.npmjs.org/victory-vendor) | 36.9.2 | 37.3.6 | update available |
| [which](https://registry.npmjs.org/which) | 2.0.2 | 7.0.0 | update available |
| [wrappy](https://registry.npmjs.org/wrappy) | 1.0.2 | 1.0.2 | current |
| [xtend](https://registry.npmjs.org/xtend) | 4.0.2 | 4.0.2 | current |
| [yallist](https://registry.npmjs.org/yallist) | 3.1.1 | 5.0.0 | update available |
| [yaml](https://registry.npmjs.org/yaml) | 2.9.0 | 2.9.1 | update available |
| [yocto-queue](https://registry.npmjs.org/yocto-queue) | 1.2.2 | 1.2.2 | current |
| [yoctocolors](https://registry.npmjs.org/yoctocolors) | 2.2.0 | 2.2.0 | current |

## Local packages

Local source uses this repository's commit as its release identity.

| Package | Version | Manifest |
| --- | --- | --- |
| @bp-skill/as-is-process-capture | 0.1.0 | `.agents/skills/okhp3-as-is-process-capture/package.json` |
| @bp-skill/decision-model-authoring | 0.1.0 | `.agents/skills/okhp3-decision-model-authoring/package.json` |
| @bp-skill/elicitation-and-interview-facilitation | 0.1.0 | `.agents/skills/okhp3-elicitation-interviews/package.json` |
| @bp-skill/future-state-and-change-strategy | 0.1.0 | `.agents/skills/okhp3-future-state-strategy/package.json` |
| @bp-skill/publication-and-handoff-packaging | 0.1.0 | `.agents/skills/okhp3-handoff-packaging/package.json` |
| @bp-skill/process-gap-and-exception-analysis | 0.1.0 | `.agents/skills/okhp3-process-gap-analysis/package.json` |
| @bp-skill/process-intake-and-scope | 0.1.0 | `.agents/skills/okhp3-process-intake-and-scope/package.json` |
| @workspace/api-server | 0.0.0 | `artifacts/api-server/package.json` |
| @workspace/custom-gpt-creator | 0.0.0 | `artifacts/custom-gpt-creator/package.json` |
| @workspace/mockup-sandbox | 2.0.0 | `artifacts/mockup-sandbox/package.json` |
| @workspace/okh-capabilities | 0.0.0 | `artifacts/okh-capabilities/package.json` |
| @workspace/okh-foundry-landing | 0.0.0 | `artifacts/okh-foundry-landing/package.json` |
| @workspace/okh-identity-card | 0.0.0 | `artifacts/okh-identity-card/package.json` |
| @workspace/api-client-react | 0.0.0 | `lib/api-client-react/package.json` |
| @workspace/api-spec | 0.0.0 | `lib/api-spec/package.json` |
| @workspace/api-zod | 0.0.0 | `lib/api-zod/package.json` |
| @workspace/db | 0.0.0 | `lib/db/package.json` |
| workspace | 0.0.0 | `package.json` |
| @workspace/scripts | 0.0.0 | `scripts/package.json` |

## Managed native dependencies

Declared in `.replit`; exact installed and upstream-by-package versions remain unresolved. The Nix channel is a package-set selector, not an exact lock. Inspect the Replit runtime before migration.

`glib`, `nspr`, `nss`, `dbus`, `atk`, `at-spi2-atk`, `cups`, `xorg.libxcb`, `libxkbcommon`, `xorg.libX11`, `xorg.libXcomposite`, `xorg.libXdamage`, `xorg.libXext`, `xorg.libXfixes`, `xorg.libXrandr`, `mesa`, `cairo`, `pango`, `alsa-lib`, `libgbm`.

Source lookup failures: 0.
