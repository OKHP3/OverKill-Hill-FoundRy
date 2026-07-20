# Technology inventory

Inventory date: 2026-07-20

This repository is a documentation and governance relay, not a TypeScript, Vite, Tailwind, or JavaScript application. No `package.json`, JavaScript/TypeScript source, Vite configuration, Tailwind configuration, or frontend build is present. The executable surface is Python audit utilities and one Bash post-merge hook.

| Technology | In-place version or status | Latest stable reference | Evidence |
| --- | --- | --- | --- |
| Python | 3.12 declared by Replit; scripts use Python 3 standard library | 3.14.6 | [.replit](../.replit), [Python 3.14.6](https://www.python.org/downloads/release/python-3146/) |
| Bash | 5.3 observed locally; repository does not pin a Bash version | 5.3 | [scripts/post-merge.sh](../scripts/post-merge.sh), [GNU Bash manual](https://www.gnu.org/software/bash/manual/) |
| Nixpkgs/Replit channel | `stable-25_05` | Needs manual review; channel is not resolved to a package-set version by this repository | [.replit](../.replit), [Nix channels](https://wiki.nixos.org/wiki/Nix_channels) |
| Git | 2.55.0.windows.2 observed locally; repository does not pin Git | 2.55.0.windows.3 for Git for Windows | [Git for Windows releases](https://github.com/git-for-windows/git/releases) |
| Markdown | No single version; repository content follows GitHub/CommonMark-style Markdown | No single release version | [GitHub Flavored Markdown](https://github.github.com/gfm/) |
| YAML | YAML 1.2 family; no explicit directive in files | 1.2.2 | [YAML 1.2.2](https://yaml.org/spec/1.2.2/) |
| JSON | RFC 8259-compatible syntax; no version field | RFC 8259 | [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259) |
| JSON Schema | Draft 2020-12 explicitly declared | 2020-12 | [refoldec-artifact.schema.json](../schemas/refoldec-artifact.schema.json), [JSON Schema specification](https://json-schema.org/specification) |
| GitHub Actions | `actions/checkout@v5`, `actions/setup-python@v6` in the audit workflow | checkout v5; setup-python v6 | [workflow](../.github/workflows/technology-audit.yml), [checkout releases](https://github.com/actions/checkout/releases), [setup-python releases](https://github.com/actions/setup-python/releases) |

Not present: JavaScript, TypeScript, Node.js, npm, Vite, React, Vue, Tailwind CSS, Docker, or a Python package dependency set. GitHub Actions is also not currently used; the workflow added for this inventory is the first one.

## Update plan

1. `technology-inventory.json` is the machine-readable source of truth.
2. `scripts/technology-audit.py` checks GitHub-hosted releases for Python and Git for Windows and reports manual-review items such as the Replit Nix channel and standards.
3. `.github/workflows/technology-audit.yml` runs the audit weekly and on changes to the inventory or runtime configuration. If a lookup fails, the workflow fails visibly rather than silently claiming freshness.
4. `.github/dependabot.yml` keeps the GitHub Actions used by the audit workflow current.
5. A maintainer reviews proposed major runtime/channel changes before changing `.replit`; the audit intentionally reports drift and does not rewrite runtime configuration automatically.
